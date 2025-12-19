import { Checkbox, IconButton, MD3Colors, Surface, Text, TextInput } from 'react-native-paper';
import styles from './styles';
import { View, TouchableOpacity } from 'react-native';
import { useDeleteTodo } from '@hooks/useDeleteTodo';
import { useUpdateTodo } from '@hooks/useUpdateTodo';
import { useState } from 'react';
import { Todo } from 'src/types/todo';

interface Props {
  item: Todo;
}

export default function TodoItem({ item }: Props) {
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.todo);

  const saveEdit = () => {
    if (text.trim() && text !== item.todo) {
      updateTodo.mutate({ id: item.id, updates: { todo: text } });
    }
    setIsEditing(false);
  };

  return (
    <Surface style={styles.surface}>
      <View style={styles.row}>
        <Checkbox
          status={item.completed ? 'checked' : 'unchecked'}
          onPress={() =>
            updateTodo.mutate({ id: item.id, updates: { completed: !item.completed } })
          }
        />

        {isEditing ? (
          <TextInput
            value={text}
            onChangeText={setText}
            onBlur={saveEdit}
            onSubmitEditing={saveEdit}
            style={{ flex: 1 }}
            autoFocus
            right={<TextInput.Icon icon="check" size={20} onPress={saveEdit} />}
          />
        ) : (
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setIsEditing(true)}>
            <Text>{item.todo}</Text>
          </TouchableOpacity>
        )}
      </View>

      <IconButton
        icon="delete"
        iconColor={MD3Colors.error50}
        size={20}
        style={{ margin: 0 }}
        onPress={() => deleteTodo.mutate(item.id)}
      />
    </Surface>
  );
}
