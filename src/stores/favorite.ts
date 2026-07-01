import { defineStore } from 'pinia'

export type FavoriteType = 'trade' | 'lostFound' | 'groupBuy' | 'errand'

export interface FavoriteItem {
  id: number
  type: FavoriteType
  title: string
  description: string
  tag: string
  location: string
}

export const favoriteTypeText: Record<FavoriteType, string> = {
  trade: '二手交易',
  lostFound: '失物招领',
  groupBuy: '拼单搭子',
  errand: '跑腿委托',
}

export const favoriteRouteMap: Record<FavoriteType, string> = {
  trade: '/trades',
  lostFound: '/lostFounds',
  groupBuy: '/groupBuys',
  errand: '/errands',
}

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: [] as FavoriteItem[],
  }),

  getters: {
    count: (state) => state.favorites.length,
  },

  actions: {
    isFavorite(type: FavoriteType, id: number) {
      return this.favorites.some((item) => item.type === type && item.id === id)
    },

    addFavorite(item: FavoriteItem) {
      if (!this.isFavorite(item.type, item.id)) {
        this.favorites.unshift(item)
      }
    },

    removeFavorite(type: FavoriteType, id: number) {
      this.favorites = this.favorites.filter((item) => item.type !== type || item.id !== id)
    },

    toggleFavorite(item: FavoriteItem) {
      if (this.isFavorite(item.type, item.id)) {
        this.removeFavorite(item.type, item.id)
        return false
      }

      this.addFavorite(item)
      return true
    },
  },
})
