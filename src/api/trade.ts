import http from './http'

export interface TradeItem {
  id: number
  title: string
  price: number
  category: string
  condition: string
  publisher: string
  publishedAt: string
  location: string
  image: string
  status: 'open' | 'closed' | 'done'
  description: string
}

export type CreateTradePayload = Omit<TradeItem, 'id'>

export async function getTrades() {
  const { data } = await http.get<TradeItem[]>('/trades')
  return data
}

export async function createTrade(payload: CreateTradePayload) {
  const { data } = await http.post<TradeItem>('/trades', payload)
  return data
}
