import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    toasts: []
  }),

  actions: {
    toast(message, type = 'info', timeout = 4000) {
      const id = Date.now()
      this.toasts.push({ id, message, type })
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== id)
      }, timeout)
    }
  }
})
