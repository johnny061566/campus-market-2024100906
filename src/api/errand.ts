import http from './http'

export interface ErrandItem {
  id: number
  title: string
  taskType: string
  reward: number
  pickupLocation: string
  deliveryLocation: string
  deadline: string
  publisher: string
  status: 'open' | 'closed' | 'done'
  description: string
  image?: string
}

export type CreateErrandPayload = Omit<ErrandItem, 'id'>

export async function getErrands() {
  const { data } = await http.get<ErrandItem[]>('/errands')
  return data
}

export async function createErrand(payload: CreateErrandPayload) {
  const { data } = await http.post<ErrandItem>('/errands', payload)
  return data
}
