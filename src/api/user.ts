import http from './http'

export interface User {
  id?: number
  username: string
  password: string
  name: string
  college: string
  grade: string
  avatar: string
  bio: string
}

export async function getUsers() {
  const { data } = await http.get<User[]>('/users')
  return data
}

export async function createUser(payload: User) {
  const { data } = await http.post<User>('/users', payload)
  return data
}
