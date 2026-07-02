import http from './http'

export interface LostFoundItem {
  id: number
  title: string
  type: 'lost' | 'found'
  itemName: string
  location: string
  time: string
  contact: string
  description: string
  status: 'open' | 'closed' | 'done'
  image?: string
}

export type CreateLostFoundPayload = Omit<LostFoundItem, 'id'>

export async function getLostFounds() {
  const { data } = await http.get<LostFoundItem[]>('/lostFounds')
  return data
}

export async function createLostFound(payload: CreateLostFoundPayload) {
  const { data } = await http.post<LostFoundItem>('/lostFounds', payload)
  return data
}
