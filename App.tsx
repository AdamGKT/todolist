import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoScreen from './src/screens/TodosScreen';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <TodoScreen />
      </QueryClientProvider>
    </PaperProvider>
  );
}
