// import { defineStore } from 'pinia';
import axios from 'axios'
import type { JsonObject } from 'type-fest'

export const APIStore = defineStore({
  id: 'api-store',
  state: () => {
    return {
      // 開發
      // api: 'http://localhost:3666/',
      // ws: 'ws://localhost:3666',
      // 線上 https://parrot-api.2fishs.com/
      api: 'https://parrot-api.2fishs.com/'
      // ws: '',

      // api: 'https://parrot-api-55iv.onrender.com/'
      // userInfo: null as JsonObject | null,
      // tokenInfo: {
      //   token: '',
      //   refreshToken: ''
      // }
    }
  },
  actions: {
    // todo 計算機 food
    // * 每日攝取量計算 -> 推薦 2-8 種食物
    async apiRecommendFoods(data: JsonObject) {
      return await axios.post(`${this.api}food/recommendFoods`, data)
    },

    // * 每日鮮食計算
    async apiCalculatefood(data: JsonObject) {
      return await axios.post(`${this.api}food/calculatefood`, data)
    },

    // * 每日飼料計算
    async apiCalculatefeed(data: JsonObject) {
      return await axios.post(`${this.api}food/calculatefeed`, data)
    },

    // * 指定熱量需求 > 計算應攝取的食物量
    async apiCalculateParrotFoodIntake(data: JsonObject) {
      return await axios.post(`${this.api}food/calculateParrotFoodIntake`, data)
    },

    // * 指定熱量需求 > 計算應攝取的飼料量
    async apiCalculateParrotFeedIntake(data: JsonObject) {
      return await axios.post(`${this.api}food/calculateParrotFeedIntake`, data)
    },

    // todo 資料 info
    // * 取得所有鸚鵡資料
    async apiGetAllParrotInfo(data: JsonObject) {
      return await axios.get(`${this.api}info/parrots?size=${data.size}&keyword=${data.keyword}`)
    },

    // * 取得所有不可食用食物資料
    async apiGetAllPoisonousFoodInfo(data: JsonObject) {
      return await axios.get(`${this.api}info/poisonousFoods?keyword=${data.keyword}`)
    },

    // * 取得所有可食用食物資料
    async apiGetAllFreshFoodsInfo(data: JsonObject) {
      return await axios.get(`${this.api}info/freshFoods?keyword=${data.keyword}`)
    },

    // * 取得所有醫院資料
    async apiGetAllHospitalInfo(data: JsonObject) {
      return await axios.get(
        `${this.api}info/hospitals?region=${data.region}&keyword=${data.keyword}`
      )
    },

    // todo 表單回饋 feedback
    // * 新增回饋
    async apiAddFeedback(data: JsonObject) {
      return await axios.post(`${this.api}feedback/`, data)
    }
  },
  getters: {
    // getUserInfo: (state) => state.userInfo
  }
})
