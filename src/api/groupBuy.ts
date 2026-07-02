import http from './http'

export interface GroupBuyItem {
  id: number
  title: string
  type: string
  targetCount: number
  currentCount: number
  deadline: string
  location: string
  publisher: string
  status: 'open' | 'closed' | 'done'
  description: string
  image?: string
}

export type CreateGroupBuyPayload = Omit<GroupBuyItem, 'id'>

export async function getGroupBuys() {
  const { data } = await http.get<GroupBuyItem[]>('/groupBuys')
  return data
}

export async function createGroupBuy(payload: CreateGroupBuyPayload) {
  const { data } = await http.post<GroupBuyItem>('/groupBuys', payload)
  return data
}
