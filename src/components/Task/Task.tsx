import styles from './Task.module.scss'
import { useTodoContext } from '../../context/TodoContext'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios'
import { MutationTaskCompletedProps } from '../../assets/types';

export default function Task() {

  const { tasks, loading } = useTodoContext();
  const queryClient = useQueryClient();

  // Mark task as completed mutation

  const mutationTaskCompleted = useMutation({
    mutationFn: ({ id, isDone }: MutationTaskCompletedProps) => axios.put(`http://localhost:3004/tasks/${id}`, { isDone }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoItems'] });
    },
    onError: () => {
      console.log('Error! Can\'t mark task as completed!')
    }
  })

  // Delete task mutation

  const mutationTaskDelete = useMutation({
    mutationFn: (id: string) => axios.delete(`http://localhost:3004/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoItems'] });
    },
    onError: () => {
      console.log('Error! Can\'t mark task as completed!')
    }
  })

  if (loading) {
    return <h3>Loading...</h3>
  }

  if (!loading && !tasks) {
    <h3>Error loading data!</h3>
  }

  return (
    <>
      {tasks && tasks.map(task => (
        <div className={styles.task_wrapper} key={task._id}>
          <div className={styles.wrapper_col}>
            <input type="checkbox"
              defaultChecked={task.isDone}
              onClick={() => mutationTaskCompleted.mutate({ id: task._id, isDone: task.isDone })}
            />
          </div>

          <div className={`${styles.wrapper_col} ${styles.wrapper_col_align}`}>
            <div className={styles.task_title}>
              <span style={task.isDone ?
                { textDecoration: 'line-through', color: 'rgba(128, 128, 128, 0.253)' } : {}}>
                {task.title}
              </span>
            </div>
            <div className={styles.task_content}>
              <span style={task.isDone ?
                { textDecoration: 'line-through', color: 'rgba(128, 128, 128, 0.253)' } : {}}>
                {task.content}
              </span>
            </div>
            <span className={styles.date}>{(task.date).slice(0, 10)}</span>
          </div>

          <div className={styles.wrapper_col}>
            <span className={styles.delete_ico}
              onClick={() => mutationTaskDelete.mutate(task._id)}>
              X
            </span>
          </div>
        </div>
      ))}
    </>
  )
}