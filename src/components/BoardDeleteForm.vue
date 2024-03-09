<template>
	<MyTransition>
		<div class="form header__delete centered" v-if="showDeleteBoardModal">
			<h2 class="header__delete-heading heading-l">Delete this board?</h2>
			<p class="body-l">
				Are you sure you want to delete the ‘{{ board.name }}’ board? This action will
				remove all columns and tasks and cannot be reversed.
			</p>
			<div class="header__delete-btns">
				<button class="button-destructive" @click="deleteBoard">Delete</button>
				<button class="button-secondary" @click="toggleDeleteBoardModal">Cancel</button>
			</div>
		</div>
	</MyTransition>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { boards, showDeleteBoardModal, toggleDeleteBoardModal } from '../js/state';
import MyTransition from './MyTransition.vue';

const router = useRouter();

const deleteBoard = () => {
	const newBoards = boards.filter(b => b !== props.board);
	boards.splice(0, boards.length, ...newBoards);
	router.push(`/board/${boards.at(-1).id}`);
	toggleDeleteBoardModal();
};

const props = defineProps({ board: Object });
</script>

<style scoped>
.header__delete {
	width: 100%;
	max-width: 45rem;
}
.header__delete-btns {
	display: flex;
	justify-content: space-around;
}
</style>
