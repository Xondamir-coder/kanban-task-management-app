<template>
	<MyTransition>
		<form v-if="showAddTaskModal" class="modal modal__task-add" @submit.prevent=""></form>
	</MyTransition>
</template>

<script setup>
import MyTransition from './MyTransition.vue';
import { modals } from '../js/state';
const { showAddTaskModal } = modals;
</script>

<style coped></style>
