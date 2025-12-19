import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@api/todos';
import { QueryKeys } from '@constants/queryKeys';
import { Todo, TodosResponse } from 'src/types/todo';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Todo> }) => {
      try {
        const res = await updateTodo(id, updates);
        return res;
      } catch (err: any) {
        // Fake API returns 404 for local items so we handle it gracefully
        if (err.message.includes('404')) return { id, ...updates } as Todo;
        throw err;
      }
    },
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: QueryKeys.TODO_LIST });
      const previousData = queryClient.getQueryData<TodosResponse>(QueryKeys.TODO_LIST);

      if (previousData) {
        const updatedTodos = previousData.todos.map((t) =>
          t.id === id ? { ...t, ...updates } : t,
        );
        queryClient.setQueryData<TodosResponse>(QueryKeys.TODO_LIST, {
          ...previousData,
          todos: updatedTodos,
        });
      }

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData)
        queryClient.setQueryData(QueryKeys.TODO_LIST, context.previousData);
    },
  });
};
