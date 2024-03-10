<template>
	<MyTransition>
		<div class="modal modal__board modal__board-delete" v-if="showDeleteBoardModal">
			<h2 class="modal__board-heading heading-l">Delete this board?</h2>
			<p class="body-l">
				Are you sure you want to delete the ‘{{ board.name }}’ board? This action will
				remove all columns and tasks and cannot be reversed.
			</p>
			<div class="modal__board-btns">
				<button class="button-destructive" @click="deleteBoard">Delete</button>
				<button class="button-secondary" @click="toggleDeleteBoardModal">Cancel</button>
			</div>
		</div>
	</MyTransition>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { boards, getCurrentBoard, modals, toggleDeleteBoardModal } from '../js/state';
import MyTransition from './MyTransition.vue';

const router = useRouter();
const board = getCurrentBoard();
const { showDeleteBoardModal } = modals;

const deleteBoard = () => {
	const newBoards = boards.filter(b => b !== board.value);
	boards.splice(0, boards.length, ...newBoards);
	boards.length ? router.push(`/board/${boards.at(-1).id}`) : router.push('/');
	toggleDeleteBoardModal();
};
</script>

<style scoped>
.modal__board-delete {
	width: 90%;
	max-width: 45rem;
}
.modal__board-btns {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
@media only screen and (max-width: 500px) {
	.modal__board-btns {
		gap: 1rem;
	}
}
</style>
