import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@api/todos';
import { QueryKeys } from '@constants/queryKeys';
import { TodosResponse } from 'src/types/todo';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      try {
        await deleteTodo(id);
        return id;
      } catch (err: any) {
        // Fake API returns 404 for local items so we handle it gracefully
        if (err.message.includes('404')) return id;
        throw err;
      }
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: QueryKeys.TODO_LIST });
      const previousData = queryClient.getQueryData<TodosResponse>(QueryKeys.TODO_LIST);

      if (previousData) {
        const filteredTodos = previousData.todos.filter((t) => t.id !== id);
        queryClient.setQueryData<TodosResponse>(QueryKeys.TODO_LIST, {
          ...previousData,
          todos: filteredTodos,
        });
      }

      return { previousData };
    },
    onError: (_err, _id, context) => {
      if (context?.previousData)
        queryClient.setQueryData(QueryKeys.TODO_LIST, context.previousData);
    },
  });
};
