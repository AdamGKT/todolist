import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '@api/todos';
import { QueryKeys } from '@constants/queryKeys';
import { TodosResponse } from 'src/types/todo';

export const useTodos = () =>
  useQuery<TodosResponse>({
    queryKey: QueryKeys.TODO_LIST,
    queryFn: fetchTodos,
    staleTime: Infinity, // Cause data come from fake API and won't change
  });
