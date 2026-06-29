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
}

export async function getGroupBuys() {
  const { data } = await http.get<GroupBuyItem[]>('/groupBuys')
  return data
}
