import { defineStore } from 'pinia'
import * as User from '../services/user.service'

export const useUserStore = defineStore('user', {
  state: () => ({ profile: null, list: [], loading: false }),
  actions: {
    async fetchProfile(id) {
      const { data } = await User.profile(id)
      this.profile = data.data || data
    },
    async updateProfile(id, payload) {
      const { data } = await User.updateProfile(id, payload)
      this.profile = data.data || data
      return data
    },
    async listUsers(params) {
      const { data } = await User.listUsers(params)
      this.list = data.data || data
    },
  },
})
