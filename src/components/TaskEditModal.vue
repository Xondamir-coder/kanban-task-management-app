<template>
	<MyTransition>
		<form class="modal" v-if="showModal === 'task-edit'">hello</form>
	</MyTransition>
</template>

<script setup>
import { showModal } from '../js/state';
import MyTransition from './MyTransition.vue';
</script>
