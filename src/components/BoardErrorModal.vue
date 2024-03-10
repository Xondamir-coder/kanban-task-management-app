<template>
	<MyTransition>
		<div class="modal modal__error" v-if="showErrorBoardModal">
			<h1 class="heading-xl">Please select a board.</h1>
		</div>
	</MyTransition>
</template>

<script setup>
import { modals } from '../js/state';
import MyTransition from './MyTransition.vue';
const { showErrorBoardModal } = modals;
</script>

<style scoped>
.modal__error {
	text-align: center;
	width: 90%;
	max-width: 40rem;
}
h1 {
	text-transform: initial;
}
</style>
