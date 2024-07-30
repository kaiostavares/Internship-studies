import axios from 'axios'
import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', {
  state: () => ({ todos: [] }),
  getters: {
  },
  actions: {
    storeTodos(payload) {
      this.todos = payload
    },
    async getTodos() {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await axios.get('http://localhost:3000/todos')
            this.storeTodos(response.data);
            resolve();
          } catch (error) {
            console.error("There was an error fetching the todos:", error)
            reject(error);
          }
        }, 1000);
      });
    },
    async addTodo(data){
      data.id = (this.todos.length + 1).toString()
      try {
        const response = await axios.post('http://localhost:3000/todos', data)
        this.todos.push(response.data)
      } catch (error) {
        console.error("There was an error adding the todo:", error)
      }
    },
    async updateTodo({id, data}){
      try {
        const response = await axios.put(`http://localhost:3000/todos/${id}`, data)
        const index = this.todos.findIndex(todo => todo.id === id)
        this.todos[index] = response.data
      } catch (error) {
        console.error("There was an error updating the todo:", error)
      }
    }
  }
})
