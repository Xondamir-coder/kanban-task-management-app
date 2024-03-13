<template>
	<MyTransition>
		<div class="modal" v-if="showModal === `${type}-${action}`">
			<slot></slot>
		</div>
	</MyTransition>
</template>

<script setup>
import { showModal } from '../js/state';
import MyTransition from './MyTransition.vue';
const props = defineProps({
	type: String,
	action: String,
});
</script>

<style>
.modal {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
	padding: 3.2rem;
	background-color: var(--white);
	border-radius: 5px;
	box-shadow: var(--purple-box-shadow);
}
body.dark .modal {
	background-color: var(--dark-grey);
	border-radius: 5px;
}
</style>
