export type TaskData = {
  title: string
  content: string
}

export type MutationTaskCompletedProps = {
  id: string
  isDone: boolean
}

export type Task = {
  _id: string,
  title: string,
  content: string,
  date: string,
  isDone: boolean,
}

export type TodoContextType = {
  tasks?: Task[]
  setTasks?: Function
  loading: boolean
}