import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

import TodoList from '@components/TodoList';
import styles from './styles';
import AddTodoField from '@components/AddTodoField';

export default function TodoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <AddTodoField />
      <TodoList />
    </SafeAreaView>
  );
}
