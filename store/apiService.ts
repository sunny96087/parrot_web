// import { defineStore } from 'pinia';
import axios from 'axios'
import type { JsonObject } from 'type-fest'

export const APIStore = defineStore({
  id: 'api-store',
  state: () => {
    return {
      // 開發
      api: 'http://localhost:3666/',
      ws: 'ws://localhost:3666',
      // 線上
      // api: '',
      // ws: '',
      userInfo: null as JsonObject | null,
      tokenInfo: {
        token: '',
        refreshToken: ''
      }
    }
  },
  actions: {
    // todo api
  },
  getters: {
    getUserInfo: (state) => state.userInfo
  }
})
