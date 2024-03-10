<template>
	<MyTransition>
		<form
			class="modal modal__board"
			v-if="showAddBoardModal"
			ref="form"
			@submit.prevent="submitForm">
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
				<TransitionGroup name="list" tag="ul" class="modal__board-list" role="list">
					<li
						class="modal__board-list_item"
						v-for="(col, i) in newBoard.columns"
						:key="col">
						<div class="text-field-container width-100">
							<input
								class="text-field body-l"
								type="text"
								required
								name="col-0"
								placeholder="e.g Todo"
								:name="`col ${i}`"
								:value="col.name"
								:id="`input-${i}`" />
							<label class="text-field-label body-l" :for="`input-${i}`"
								>Can't be empty</label
							>
						</div>
						<button type="button" @click="removeColumn(col.name)">
							<img src="../assets/icon-cross.svg" alt="cross icon" />
						</button>
					</li>
				</TransitionGroup>
			</div>
			<button class="model__board-add_btn button-secondary" type="button" @click="addColumn">
				<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
					<path
						fill="#635FC7"
						d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
				</svg>
				add new column
			</button>
			<button class="model__board-create_btn button-primary-s" type="submit">
				create new board
			</button>
		</form>
	</MyTransition>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { boards, toggleAddBoardModal, modals } from '../js/state';
import { getEmptyCol, getEmptyBoard } from '../js/helpers';
import MyTransition from './MyTransition.vue';

const router = useRouter();
const form = ref(null);
const newBoard = ref(getEmptyBoard());
const { showAddBoardModal } = modals;

const toggleModal = () => {
	newBoard.value = getEmptyBoard();
	toggleAddBoardModal();
};
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
	toggleModal();
};
const addColumn = () => {
	populateColumns();

	// add empty col
	const emptyCol = getEmptyCol();
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
