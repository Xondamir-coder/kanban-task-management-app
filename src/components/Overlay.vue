<template>
	<Transition name="fade">
		<div class="overlay" v-if="anyModalActive" @click="hideAllModals"></div>
	</Transition>
</template>

<script setup>
import { anyModalActive, hideAllModals } from '../js/state';
</script>

<style scoped>
.overlay {
	background-color: rgba(0, 0, 0, 0.5);
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
