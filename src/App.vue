<template>
	<!-- Layout -->
	<Header />
	<RouterView />
	<Sidebar />

	<!-- Board Modals -->
	<BoardAddModal />
	<BoardEditModal />
	<BoardDeleteModal />
	<BoardErrorModal />

	<!-- Task Modals -->
	<TaskViewModal />
	<TaskAddModal />
	<TaskEditModal />

	<!-- Overlay -->
	<Overlay />
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Overlay from './components/Overlay.vue';
import BoardAddModal from './components/BoardAddModal.vue';
import BoardEditModal from './components/BoardEditModal.vue';
import BoardErrorModal from './components/BoardErrorModal.vue';
import BoardDeleteModal from './components/BoardDeleteModal.vue';
import TaskViewModal from './components/TaskViewModal.vue';
import TaskAddModal from './components/TaskAddModal.vue';
import TaskEditModal from './components/TaskEditModal.vue';
</script>
