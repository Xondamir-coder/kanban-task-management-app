<template>
	<Modal type="board" action="add">
		<form class="modal__board" ref="form" @submit.prevent="submitForm">
			<h1 class="heading-l">Add New Board</h1>
			<div class="modal__board-name">
				<label class="modal__board-label body-m" for="board__name">name</label>
				<div class="text-field-container">
					<input
						class="text-field flex-grow-1"
						type="text"
						id="board__name"
						name="board-name"
						required
						placeholder="e.g Web design" />
					<label for="board__name" class="text-field-label body-l">Can't be empty</label>
				</div>
			</div>
			<div class="modal__board-cols">
				<label class="modal__board-label body-m">columns</label>
				<FormColumns :cols="newBoard.columns" @delete-col="removeColumn" />
			</div>
			<button class="modal__board-add_btn button-secondary" type="button" @click="addColumn">
				<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
					<path
						fill="#635FC7"
						d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
				</svg>
				add new column
			</button>
			<button class="modal__board-create_btn button-primary-s" type="submit">
				create new board
			</button>
		</form>
	</Modal>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { boards, showModal, toggleModal } from '../../js/state';
import { getEmptyBoardCol, getEmptyBoard } from '../../js/helpers';
import Modal from '../Modal.vue';
import FormColumns from '../FormColumns.vue';

const router = useRouter();
const form = ref(null);
const newBoard = ref(getEmptyBoard());

const submitForm = () => {
	const formData = new FormData(form.value);
	const cols = Array.from(formData).filter(([key]) => key.includes('col'));

	// assign newboard data
	newBoard.value.columns = cols.map(([_, val]) => ({ name: val, tasks: [] }));
	newBoard.value.name = formData.get('board-name');
	newBoard.value.id = boards.length;

	// add to the boards and route to it
	boards.push(newBoard.value);
	router.push(`/board/${newBoard.value.id}`);

	// Close modal and init newBoard.value
	newBoard.value = getEmptyBoard();
	toggleModal();
};
const addColumn = () => {
	populateColumns();

	// add empty col
	const emptyCol = getEmptyBoardCol();
	newBoard.value.columns.push(emptyCol);

	// focus the input
	const list = document.querySelector('.modal__board-list');
	setTimeout(() => list.lastChild.firstChild.firstChild.focus(), 50);
};
const populateColumns = () => {
	const formData = new FormData(form.value);
	const cols = Array.from(formData).filter(([key]) => key.includes('col'));
	newBoard.value.columns = cols.map(([_, val]) => ({ name: val, tasks: [] }));
};
const removeColumn = name => {
	const cols = newBoard.value.columns.filter(col => col.name !== name);
	newBoard.value.columns = cols;
};
</script>

<style scoped></style>
