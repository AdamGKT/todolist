import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '@api/todos';
import { QueryKeys } from '@constants/queryKeys';
import { Todo, TodosResponse } from 'src/types/todo';

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo: string) => {
      await queryClient.cancelQueries({ queryKey: QueryKeys.TODO_LIST });
      const previousData = queryClient.getQueryData<TodosResponse>(QueryKeys.TODO_LIST);
      const optimisticTodo: Todo = {
        id: Date.now(),
        todo: newTodo,
        completed: false,
        userId: 1,
      };
      if (previousData) {
        queryClient.setQueryData<TodosResponse>(QueryKeys.TODO_LIST, {
          ...previousData,
          todos: [optimisticTodo, ...previousData.todos],
        });
      }

      return { previousData, optimisticTodo };
    },
    onError: (_err, _newTodo, context) => {
      console.log(JSON.stringify(_err, null, 4));
      if (context?.previousData)
        queryClient.setQueryData(QueryKeys.TODO_LIST, context.previousData);
    },
  });
};
