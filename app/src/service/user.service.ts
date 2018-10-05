import axios from 'axios'
import { User } from './model/User'

const USERS_RESOURCE_ENDPOINT = process.env.REACT_APP_USERS_API

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('/', {
    baseURL: USERS_RESOURCE_ENDPOINT,
  })

  return data
}
