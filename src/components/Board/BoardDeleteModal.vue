<template>
	<Modal class="modal__delete" type="board" action="delete">
		<h2 class="modal__delete-heading heading-l">Delete this board?</h2>
		<p class="modal__delete-body body-l">
			Are you sure you want to delete the ‘{{ board.name }}’ board? This action will remove
			all columns and tasks and cannot be reversed.
		</p>
		<div class="modal__delete-btns">
			<button class="button-destructive" @click="deleteBoard">Delete</button>
			<button class="button-secondary" @click="toggleModal">Cancel</button>
		</div>
	</Modal>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { boards, getCurrentBoard, toggleModal } from '../../js/state';
import Modal from '../Modal.vue';

const router = useRouter();
const board = getCurrentBoard();

const deleteBoard = () => {
	const newBoards = boards.filter(b => b !== board.value);
	boards.splice(0, boards.length, ...newBoards);
	boards.length ? router.push(`/board/${boards.at(-1).id}`) : router.push('/');
	toggleModal();
};
</script>
