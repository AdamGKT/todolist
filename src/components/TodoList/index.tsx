import { FlatList, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTodos } from '@hooks/useTodos';
import TodoItem from '../TodoItem';

export default function TodoList() {
  const { data, isLoading, isError } = useTodos();

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>Error loading todos</Text>;

  return (
    <FlatList
      data={data?.todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TodoItem item={item} />}
    />
  );
}
