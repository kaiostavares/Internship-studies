import axios from 'axios'
import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', {
  state: () => ({ todos: [] }),
  getters: {
  },
  actions: {
    async getTodos() {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await axios.get('http://localhost:3000/todos')
            this.todos = response.data;
            resolve();
          } catch (error) {
            console.error("There was an error fetching the todos")
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
        console.error("There was an error adding the todo")
      }
    },
    async updateTodo({id, data}){
      try {
        const response = await axios.put(`http://localhost:3000/todos/${id}`, data)
        const index = this.todos.findIndex(todo => todo.id === id)
        this.todos[index] = response.data
      } catch (error) {
        console.error("There was an error updating the todo")
      }
    },
    async deleteTodo(id){
      try{
        await axios.delete(`http://localhost:3000/todos/${id}`)
        this.todos = this.todos.filter(todo => todo.id !== id)
      } catch (error) {
        console.error("There was an error deleting the todo")
      }
    }
  }
})