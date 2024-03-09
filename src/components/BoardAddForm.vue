<template>
	<MyTransition>
		<form
			class="form centered"
			v-if="showAddBoardModal"
			ref="form"
			@submit.prevent="submitForm">
			<h1 class="heading-l">add new board</h1>
			<div class="form__name">
				<label class="form__label body-m" for="board__name">name</label>
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
			<div class="form__cols">
				<label class="form__label body-m">columns</label>
				<TransitionGroup name="list" tag="ul" class="form__list" role="list">
					<li class="form__item" v-for="(col, i) in newBoard.columns" :key="col">
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
			<button class="form__add button-secondary" type="button" @click="addColumn">
				<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
					<path
						fill="#635FC7"
						d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
				</svg>
				add new column
			</button>
			<button class="form__save button-primary-s" type="submit">create new board</button>
		</form>
	</MyTransition>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { boards, toggleAddBoardModal, showAddBoardModal } from '../js/state';
import { getEmptyCol, getEmptyBoard } from '../js/helpers';
import MyTransition from './MyTransition.vue';

const router = useRouter();
const form = ref(null);
const newBoard = ref(getEmptyBoard());

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
	const list = document.querySelector('.form__list');
	setTimeout(() => list.lastChild.firstChild.focus(), 50);
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

<style>
.form {
	padding: 3.2rem;
	background-color: var(--white);
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	gap: 1.8rem;
}
body.dark .form {
	background-color: var(--dark-grey);
}
.form__button-add {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
}
.form__name {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
}
.form__cols {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
.form__item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1.6rem;
	width: 100%;
}
.form__item input {
	flex-grow: 1;
}
.form__item button {
	background-color: transparent;
}
.form__list {
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	width: 75vw;
	max-width: 36rem;
	position: relative;
}
.form__list::before {
	content: 'No columns';
	position: absolute;
	opacity: 0;
	transform: translateX(-1rem);
	transition: opacity 0.5s ease, transform 0.5s ease;
}
.form__list:empty::before {
	opacity: 1;
	transform: translateX(0);
}
.form__label {
	text-transform: capitalize;
	color: var(--medium-grey);
}
body.dark .form__label {
	color: #fff;
}

/* Transition */
.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
}
.list-leave-active {
	position: absolute;
}
</style>
