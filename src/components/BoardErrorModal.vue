<template>
	<MyTransition>
		<div class="modal" v-if="showErrorBoardModal">
			<h1 class="heading-xl">Please select a board.</h1>
		</div>
	</MyTransition>
</template>

<script setup>
import { showErrorBoardModal } from '../js/state';
import MyTransition from './MyTransition.vue';
</script>

<style scoped>
h1 {
	text-transform: initial;
}
</style>
