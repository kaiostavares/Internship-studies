import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', {
  state: () => ({ todos: [] }),
  getters: {
  },
  actions: {
    storeTodos(payload) {
      this.todos = payload
    },
  },
})
