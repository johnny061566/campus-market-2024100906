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

export async function getTrades() {
  const { data } = await http.get<TradeItem[]>('/trades')
  return data
}
