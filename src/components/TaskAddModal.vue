<template>
	<MyTransition>
		<form
			v-if="showModal === 'task-add'"
			class="modal modal__task-add"
			@submit.prevent=""></form>
	</MyTransition>
</template>

<script setup>
import MyTransition from './MyTransition.vue';
import { showModal } from '../js/state';
</script>

<style coped></style>
