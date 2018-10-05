import axios from 'axios'
import * as urlJoin from 'url-join'
import { CreateTaskPayload, Task } from './model/Task'

const TASKS_RESOURCE_ENDPOINT =
  'https://7ino8k0y4l.execute-api.us-east-1.amazonaws.com/dev/tasks'

const tasks = axios.create({
  baseURL: TASKS_RESOURCE_ENDPOINT,
})

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await tasks.get('/')
  return data
}

export const deleteTask = async (taskId: string): Promise<void> => {
  await tasks.delete(urlJoin('/', taskId))
}

export const createTask = async (
  payload: CreateTaskPayload,
): Promise<string> => {
  const { data } = await tasks.post('/', payload)
  return data
}
