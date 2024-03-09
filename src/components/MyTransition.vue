<template>
	<Transition name="fade-slide">
		<slot></slot>
	</Transition>
</template>

<script setup></script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
	transition: opacity 0.5s ease, translate 0.5s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
	opacity: 0;
	translate: 0 -5rem;
}
</style>
