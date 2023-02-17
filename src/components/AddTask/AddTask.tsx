import styles from './AddTask.module.scss'
import { useTodoContext } from '../../context/TodoContext'
import axios from 'axios'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useState } from 'react'
import { TaskData } from '../../assets/types';

export default function AddTask() {

  const initalTaskValues = {
    title: '',
    content: ''
  }
  const [taskData, setTaskData] = useState<TaskData>(initalTaskValues);
  const queryClient = useQueryClient();

  const mutationAddTask = useMutation({
    mutationFn: ({ title, content }: TaskData) => axios.post(`http://localhost:3004/tasks/`, { title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoItems'] });
    },
    onError: () => {
      console.log('Error! Can\'t add task!')
    }
  })

  return (
    <form className={styles.add_task_form}
      onSubmit={(e) => {
        e.preventDefault();
        mutationAddTask.mutate(taskData);
        setTaskData(initalTaskValues);
      }
      }>

      <label>
        Task title
        <input className={styles.add_task_input}
          required
          type='text'
          placeholder='Task title...'
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />
      </label>

      <label>
        Task content
        <input className={styles.add_task_input}
          required
          type='text'
          placeholder='Your task...'
          value={taskData.content}
          onChange={(e) => setTaskData({ ...taskData, content: e.target.value })}
        />
      </label>

      <button className={styles.add_task_btn}>Add</button>

    </form >
  )
}