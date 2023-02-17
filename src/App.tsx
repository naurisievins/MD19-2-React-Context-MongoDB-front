import './App.css'
import Todo from './components/Todo/Todo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Todo />
      </div>
    </QueryClientProvider>

  )
}

export default App
