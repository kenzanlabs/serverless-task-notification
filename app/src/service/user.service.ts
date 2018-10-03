import axios from 'axios'
import { User } from './model/User'

const USERS_RESOURCE_ENDPOINT =
  'https://w2srtgwf0m.execute-api.us-east-1.amazonaws.com/dev/users'

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('/', {
    baseURL: USERS_RESOURCE_ENDPOINT,
  })

  return data
}
