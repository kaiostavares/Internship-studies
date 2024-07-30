<template>
  <div class="space-y-2">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    />
  </div>
</template>


<script setup>
import TodoItem from '@/components/TodoItem.vue';
import { useTodosStore } from '@/store';
import { computed } from 'vue';

const todos = computed(() => useTodosStore().todos);
</script>