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
}

export async function getLostFounds() {
  const { data } = await http.get<LostFoundItem[]>('/lostFounds')
  return data
}
