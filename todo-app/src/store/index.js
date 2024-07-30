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
    getTodos(){
      return new Promise(resolve =>{
        setTimeout(() => {
          axios.get('http://localhost:3000/todos')
            .then((response)=>{
              this.storeTodos(response.data)
              resolve();
            })
        }, 1000);
      })
    },
    async addTodo(data){
      data.id = (this.todos.length + 1).toString()
      axios.post('http://localhost:3000/todos', data)
        .then(response =>{
          this.todos.push(response.data)
        })
    }
  },
})
