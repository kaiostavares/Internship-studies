<template>
  <div class="space-y-2">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    />
  </div>
</template>


<script>
import TodoItem from '@/components/TodoItem.vue';
import { useTodosStore } from '@/store';
export default {
  components: { TodoItem },
  computed:{
    todos(){
      return useTodosStore().todos;
    }
  }
}
</script>