<template>
	<main class="board" :class="!columns?.length ? 'board--empty' : 'board--full'">
		<section class="board__column" v-for="col in columns" :key="col">
			<h2 class="board__column-heading heading-s">
				<input
					class="board__column-color"
					type="color"
					name="color"
					id="color"
					@input="changeOvalColor" />
				<label for="color">
					<div
						class="board__column-oval"
						:style="`background-color: ${getRandomColor()}`"></div>
				</label>
				<span>{{ col.name }} ({{ col.tasks.length }})</span>
			</h2>
			<ul class="board__list" role="list">
				<li
					class="board__task"
					v-for="task in col.tasks"
					:key="task"
					@click="toggleView(task)">
					<h3 class="heading-m">{{ task.title }}</h3>
					<p class="board__task-completed body-m">
						{{ task.subtasks.filter(task => task.isCompleted).length }}
						of
						{{ task.subtasks.length }}
						subtasks
					</p>
				</li>
			</ul>
		</section>
		<section class="board__column-add" v-if="columns?.length">
			<button class="board__column-add_btn">
				<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
					<path
						fill="rgb(130, 143, 163)"
						d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
				</svg>
				<h1 class="heading-xl">new column</h1>
			</button>
		</section>
		<div class="board__empty" v-else-if="board">
			<h4 class="board__empty-heading heading-l">
				This board is empty. Create a new column to get started.
			</h4>
			<button type="button" class="board__empty-btn button-primary-l">
				<img src="../assets/icon-add-task-mobile.svg" alt="add" />
				add new column
			</button>
		</div>
	</main>
</template>

<script setup>
import { computed } from 'vue';
import { getRandomColor } from '../js/helpers';
import { getCurrentBoard, task, toggleViewTaskModal } from '../js/state';

const board = getCurrentBoard();
const columns = computed(() => board.value?.columns);

const changeOvalColor = event => {
	const oval = event.target.nextElementSibling.firstElementChild;
	const color = event.target.value;
	oval.style.backgroundColor = color;
};
const toggleView = curTask => {
	task.value = curTask;
	toggleViewTaskModal();
};
</script>

<style scoped>
.board {
	display: grid;
	border-top: 1px solid var(--lines-light);
	background-color: var(--light-grey);
	transition: background-color 0.5s, border-color 0.5s;
	padding: 2.4rem;
}
.board--full {
	grid-auto-flow: column;
	grid-auto-columns: 30rem;
	column-gap: 2.4rem;
	overflow: auto;
}
.board--empty {
	place-items: center;
}
.board__column {
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
}
.board__column-add {
	display: grid;
	place-items: center;
}
.board__column-add_btn {
	padding: 2rem;
	background-color: transparent;
	color: var(--medium-grey);
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
.board__column-color {
	display: none;
}
.board__column-oval {
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
}
.board__column-heading {
	display: flex;
	gap: 1.2rem;
	text-transform: uppercase;
	color: var(--medium-grey);
}
.board__list {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
.board__task {
	cursor: pointer;
	box-shadow: 0px 4px 6px 0px #364e7e14;
	background-color: var(--white);
	padding: 2.3rem 1.6rem;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
}
.board__task-completed {
	color: var(--medium-grey);
}
.board__empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2.5rem;
}
.board__empty-heading {
	text-transform: initial;
	color: var(--medium-grey);
}
.board__empty-btn {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 1.5rem 2.4rem;
}
body.dark .board {
	border-color: var(--lines-dark);
	background-color: var(--very-dark-grey);
}
body.dark .board__task {
	background-color: var(--dark-grey);
}
</style>
