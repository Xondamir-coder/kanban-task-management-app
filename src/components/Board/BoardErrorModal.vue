<template>
	<Modal type="board" action="error">
		<div class="modal__error">
			<h1 class="heading-xl">Please select a board.</h1>
		</div>
	</Modal>
</template>

<script setup>
import Modal from '../Modal.vue';
</script>

<style scoped>
.modal__error {
	text-align: center;
	width: 90%;
	max-width: 40rem;
}
</style>
