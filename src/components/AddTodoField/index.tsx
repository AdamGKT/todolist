import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useCallback, useState } from 'react';
import { useAddTodo } from '@hooks/useAddTodo';
import styles from './styles';

export default function AddTodoField() {
  const [todoText, setTodoText] = useState('');
  const addTodo = useAddTodo();

  const handleAddTodo = useCallback(() => {
    const trimmedText = todoText.trim();

    if (!trimmedText) return;

    addTodo.mutate(trimmedText);

    setTodoText('');
  }, [todoText, addTodo]);

  return (
    <View style={styles.input}>
      <TextInput
        mode="outlined"
        placeholder="Add a new todo"
        value={todoText}
        onChangeText={setTodoText}
        onSubmitEditing={handleAddTodo}
        right={<TextInput.Icon icon="plus" size={30} onPress={handleAddTodo} />}
      />
    </View>
  );
}
