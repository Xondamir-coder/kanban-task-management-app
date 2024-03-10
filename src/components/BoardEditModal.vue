<template>
	<MyTransition>
		<form
			class="modal modal__board"
			v-if="showEditBoardModal"
			@submit.prevent="submitForm"
			ref="form">
			<h1 class="heading-l">Edit Board</h1>
			<div class="modal__board-name">
				<label class="modal__board-label body-m" for="board__name">board name</label>
				<div class="text-field-container width-100">
					<input
						class="text-field flex-grow-1"
						type="text"
						id="board__name"
						name="board-name"
						required
						placeholder="e.g Web design"
						:value="board?.name" />
					<label for="board__name" class="text-field-label body-l">Can't be empty</label>
				</div>
			</div>
			<div class="modal__board-cols">
				<label class="modal__board-label body-m">board columns</label>
				<TransitionGroup name="list" tag="ul" class="modal__board-list">
					<li
						class="modal__board-list_item"
						v-for="(col, i) in boardCopy?.columns"
						:key="col">
						<div class="text-field-container width-100">
							<input
								class="text-field body-l flex-grow-1"
								type="text"
								required
								placeholder="e.g Todo"
								:value="col?.name"
								:name="`col ${i}`"
								:id="`input-${i}`" />
							<label :for="`input-${i}`" class="text-field-label body-l"
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
			<button
				class="model__board-delete_btn button-destructive"
				type="button"
				@click="toggleDeleteModal">
				delete board
			</button>
			<button class="model__board-save_btn button-primary-s" type="submit">
				save changes
			</button>
		</form>
	</MyTransition>
</template>

<script setup>
import { ref, watch } from 'vue';
import {
	modals,
	toggleDeleteBoardModal,
	toggleEditBoardModal,
	hideEditBoardModal,
	getCurrentBoard,
} from '../js/state';
import MyTransition from './MyTransition.vue';

const board = getCurrentBoard();
const form = ref(null);
const boardCopy = ref();
const { showEditBoardModal } = modals;
watch(
	showEditBoardModal,
	() => (boardCopy.value = board.value && JSON.parse(JSON.stringify(board.value)))
);

const toggleDeleteModal = () => {
	hideEditBoardModal();
	toggleDeleteBoardModal();
};
const removeColumn = name => {
	const cols = boardCopy.value.columns.filter(col => col.name !== name);
	boardCopy.value.columns = cols;
};
const addColumn = () => {
	populateColumns();

	// add empty col
	const emptyCol = { name: '', tasks: [] };
	boardCopy.value.columns.push(emptyCol);

	// focus the input
	const list = document.querySelector('.modal__board-list');
	setTimeout(() => list.lastChild.firstChild.firstChild.focus(), 50);
};
const populateColumns = () => {
	const formData = new FormData(form.value);
	const cols = Array.from(formData).filter(([key]) => key.includes('col'));
	boardCopy.value.columns = cols.map(([_, val]) => ({ name: val, tasks: [] }));
};
const submitForm = () => {
	const formData = new FormData(form.value);
	const newBoardName = formData.get('board-name');

	populateColumns();

	// change board
	board.value.name = newBoardName;
	board.value.columns = boardCopy.value.columns;

	toggleEditBoardModal();
};
</script>
