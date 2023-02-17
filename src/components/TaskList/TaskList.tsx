import styles from './TaskList.module.scss'
import Task from '../Task/Task'

export default function TaskList() {

  return (
    <div className={styles.task_container}>
      <Task />
    </div>
  )
}