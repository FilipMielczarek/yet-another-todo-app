import { User } from 'firebase/auth'

export interface Todo {
  id?: string
  date: Date
  isFinished: boolean
  title: string
  author: string | User
}
