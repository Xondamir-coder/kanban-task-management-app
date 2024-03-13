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
	<TaskForm type="task" action="edit" />
	<TaskForm type="task" action="add" />
	<TaskDeleteModal />

	<!-- Overlay -->
	<Overlay />
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from './layouts/Header.vue';
import Sidebar from './layouts/Sidebar.vue';
import Overlay from './layouts/Overlay.vue';
import BoardAddModal from './components/Board/BoardAddModal.vue';
import BoardEditModal from './components/Board/BoardEditModal.vue';
import BoardErrorModal from './components/Board/BoardErrorModal.vue';
import BoardDeleteModal from './components/Board/BoardDeleteModal.vue';
import TaskViewModal from './components/Task/TaskViewModal.vue';
import TaskForm from './components/Task/TaskForm.vue';
import TaskDeleteModal from './components/Task/TaskDeleteModal.vue';
</script>
