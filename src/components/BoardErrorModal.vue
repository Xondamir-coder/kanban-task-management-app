<template>
	<MyTransition>
		<div class="modal modal__error" v-if="showModal === 'board-error'">
			<h1 class="heading-xl">Please select a board.</h1>
		</div>
	</MyTransition>
</template>

<script setup>
import { showModal } from '../js/state';
import MyTransition from './MyTransition.vue';
</script>

<style scoped>
.modal__error {
	text-align: center;
	width: 90%;
	max-width: 40rem;
}
</style>
