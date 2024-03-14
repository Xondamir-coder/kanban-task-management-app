'
<template>
	<main class="board" :class="!columns?.length ? 'board--empty' : 'board--full'">
		<section
			class="board__column"
			v-for="col in columns"
			:key="col"
			:data-col="col.name"
			@drop="dropTask"
			@dragover.prevent
			@dragenter.prevent>
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
			<TransitionGroup name="list" tag="ul" role="list" class="board__list">
				<li
					class="board__task"
					v-for="task in col.tasks"
					:key="task"
					@click="toggleView(task)"
					@dragstart="dragTask(task)"
					draggable="true">
					<h3 class="heading-m">{{ task.title }}</h3>
					<p class="board__task-completed body-m">
						{{ task.subtasks.filter(task => task.isCompleted).length }}
						of
						{{ task.subtasks.length }}
						subtasks
					</p>
				</li>
			</TransitionGroup>
		</section>
		<section
			class="board__column-add"
			v-if="columns?.length"
			@click="toggleModal('board-edit')">
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
			<button
				type="button"
				class="board__empty-btn button-primary-l"
				@click="toggleModal('board-edit')">
				<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
					<path
						fill="#FFF"
						d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
				</svg>
				add new column
			</button>
		</div>
	</main>
</template>

<script setup>
import { computed, ref } from 'vue';
import { getRandomColor } from '../js/helpers';
import { getCurrentBoard, task, toggleModal } from '../js/state';

const board = getCurrentBoard();
const columns = computed(() => board.value?.columns);
const draggedTask = ref();

const changeOvalColor = event => {
	const oval = event.target.nextElementSibling.firstElementChild;
	const color = event.target.value;
	oval.style.backgroundColor = color;
};
const toggleView = curTask => {
	task.value = curTask;
	toggleModal('task-view');
};
const dropTask = event => {
	console.log(event);
	const { target } = event;
	const parent = target.closest('.board__column');
	if (!parent) return;
	const colName = parent.dataset.col;

	// remove from current column
	board.value.columns.forEach(
		col => (col.tasks = col.tasks.filter(colTask => colTask !== draggedTask.value))
	);

	// add to new column
	board.value.columns.find(col => col.name === colName).tasks.push(draggedTask.value);
};
const dragTask = task => (draggedTask.value = task);
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
	border-radius: 1rem;
	background-color: rgb(222, 227, 237);
}
.board__column-add_btn {
	padding: 2rem;
	background-color: transparent;
	color: var(--medium-grey);
	display: flex;
	align-items: center;
	gap: 0.5rem;
	transition: color 0.3s;
}
.board__column-add_btn:hover svg path {
	transition: fill 0.3s;
}
.board__column-add_btn:hover {
	color: var(--main-purple);
}
.board__column-add_btn:hover svg path {
	fill: var(--main-purple);
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
	transition: box-shadow 0.5s, color 0.5s;
}
.board__task:hover {
	box-shadow: 0px 10px 40px 4px var(--main-purple-hover);
	color: var(--main-purple);
}
.board__task:hover .board__task-completed {
	color: var(--main-purple);
}
.board__task-completed {
	color: var(--medium-grey);
	transition: color 0.5s;
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
body.dark .board__column-add {
	background-color: rgba(93, 97, 139, 0.121);
}
</style>
'
