import styles from './Todo.module.scss'
import TaskList from '../TaskList/TaskList'
import AddTask from '../AddTask/AddTask'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { TodoContext } from '../../context/TodoContext'
import { Task } from '../../assets/types'

export default function Todo() {

  const [todos, setTodos] = useState<Task[]>([])

  const { isLoading, error, data } = useQuery({
    queryKey: ["todoItems"],
    queryFn: () =>
      axios.get('http://localhost:3004/tasks')
        .then(({ data }) => {
          setTodos(data)
          return data
        })
  })

  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        TODO list
      </div>
      <TodoContext.Provider value={{
        tasks: todos,
        setTasks: setTodos,
        loading: isLoading
      }}>
        <div>
          <AddTask />
          <TaskList />
        </div>
      </TodoContext.Provider>
    </div>
  )
}