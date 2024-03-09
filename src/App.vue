<template>
	<!-- Layout -->
	<Header :board="board" />
	<RouterView />
	<Sidebar />

	<!-- Modals/Forms -->
	<BoardAddForm />
	<BoardEditForm :board="board" />
	<BoardDeleteForm :board="board" />
	<BoardErrorModal />

	<!-- Overlay -->
	<Overlay />
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';
import { boards } from './js/state';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import BoardAddForm from './components/BoardAddForm.vue';
import BoardEditForm from './components/BoardEditForm.vue';
import BoardErrorModal from './components/BoardErrorModal.vue';
import BoardDeleteForm from './components/BoardDeleteForm.vue';
import Overlay from './components/Overlay.vue';

const route = useRoute();
const board = computed(() => boards.find(b => b.id === +route.params.id));
</script>
