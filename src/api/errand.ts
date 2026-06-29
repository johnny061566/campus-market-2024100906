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
}

export async function getErrands() {
  const { data } = await http.get<ErrandItem[]>('/errands')
  return data
}
