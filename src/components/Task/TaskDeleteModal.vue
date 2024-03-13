<template>
	<Modal class="modal__delete" type="task" action="delete">
		<h2 class="modal__delete-heading heading-l">Delete this task?</h2>
		<p class="modal__delete-body body-l">
			Are you sure you want to delete the ‘{{ task.title }}’ task? This action will remove all
			columns and tasks and cannot be reversed.
		</p>
		<div class="modal__delete-btns">
			<button class="button-destructive" @click="deleteTask">Delete</button>
			<button class="button-secondary" @click="toggleModal">Cancel</button>
		</div>
	</Modal>
</template>

<script setup>
import { toggleModal, getCurrentBoard, task } from '../../js/state';
import Modal from '../Modal.vue';

const board = getCurrentBoard();

const deleteTask = () => {
	board.value.columns.forEach(
		col => (col.tasks = col.tasks.filter(colTask => colTask !== task.value))
	);
	toggleModal();
};
</script>
