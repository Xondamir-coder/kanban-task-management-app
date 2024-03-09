<template>
	<main class="board">Hello from {{ boardId }}</main>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const boardId = computed(() => route.params.id);
</script>

<style scoped>
.board {
	border-top: 1px solid var(--lines-light);
	background-color: var(--medium-grey);
	transition: background-color 0.5s, border-color 0.5s;
}
body.dark .board {
	border-color: var(--lines-dark);
	background-color: var(--very-dark-grey);
}
</style>
