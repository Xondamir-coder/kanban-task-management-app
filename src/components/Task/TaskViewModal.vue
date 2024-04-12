<template>
	<Modal type="task" action="view" class="modal__task-view">
		<div class="modal__task-view_head">
			<h1 class="heading-l">{{ task.title }}</h1>
			<input class="menu-checkbox" type="checkbox" id="task__menu" />
			<div class="menu modal__task-view_menu">
				<button class="body-l" @click="toggleModal('task-edit')">
					<label for="task__menu">Edit Task</label>
				</button>
				<button class="body-l" @click="toggleModal('task-delete')">
					<label for="task__menu">Delete Task</label>
				</button>
			</div>
		</div>
		<p v-if="task.description" class="modal__task-view_desc body-l">
			{{ task.description }}
		</p>
		<div class="modal__task-view_subtasks" v-if="task.subtasks.length">
			<h2 class="modal__task-view_num body-m">
				Subtasks ({{ numOfCompletedSubtasks }} of {{ task.subtasks.length }})
			</h2>
			<ul class="modal__task-view_list" role="list">
				<li class="modal__task-view_item" v-for="(subtask, i) in task.subtasks" :key="i">
					<label class="checkbox-container" :for="`${subtask.title}-${i}`">
						<input
							class="checkbox"
							type="checkbox"
							name="checkbox"
							:id="`${subtask.title}-${i}`"
							:checked="subtask.isCompleted"
							@change="changeSubtaskStatus(subtask)" />
						<label :for="`${subtask.title}-${i}`" class="checkbox-label">{{
							subtask.title
						}}</label>
					</label>
				</li>
			</ul>
		</div>
		<div class="modal__task-view_date" v-if="task.date">
			<h2 class="modal__task-view_num body-m">Date</h2>
			<p>
				{{ date.toLocaleString() }} -
				<span :style="dateStyle">{{ deadline }}</span>
			</p>
		</div>
		<TaskStatus :data="task" />
	</Modal>
</template>

<script setup>
import { computed } from 'vue';
import { task, toggleModal } from '../../js/state';
import TaskStatus from './TaskStatus.vue';
import Modal from '../Modal.vue';

const numOfCompletedSubtasks = computed(
	() => task.value.subtasks.filter(subtask => subtask.isCompleted).length
);
const date = computed(() => new Date(task.value.date));
const daysLeft = computed(() => date.value.getDate() - new Date().getDate());
const deadline = computed(() => {
	const text =
		daysLeft.value === 0
			? 'The deadline has arrived'
			: daysLeft.value < 0
			? 'The deadline has passed'
			: `${daysLeft.value} days left till the deadline`;
	return text;
});
const dateStyle = computed(() => ({
	color: daysLeft.value < 0 ? 'var(--red)' : 'var(--main-purple)'
}));

const changeSubtaskStatus = curSubtask => (curSubtask.isCompleted = !curSubtask.isCompleted);
</script>

<style scoped>
.modal__task-view {
	width: 90%;
	max-width: 48rem;
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
}
.modal__task-view_subtasks {
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
}
.modal__task-view_list {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
}
.modal__task-view_item {
	background-color: var(--light-grey);
	padding: 1rem;
	border-radius: 0.5rem;
	transition: background-color 0.5s;
}
.modal__task-view_item:hover {
	background-color: #828fa33f;
}
.modal__task-view_head {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.modal__task-view_btn {
	background-color: transparent;
	padding-left: 2rem;
}
.modal__task-view_desc,
.modal__task-view_num {
	color: var(--medium-grey);
}
.modal__task-view_menu {
	top: 7rem;
	right: 3rem;
}
.modal__task-view_date {
	display: grid;
	row-gap: 0.5rem;
}
.modal__task-view_date p {
	font-size: 1.3rem;
}

body.dark .modal__task-view_menu {
	background-color: var(--very-dark-grey);
}
body.dark .modal__task-view_num {
	color: var(--white);
}
body.dark .modal__task-view_item {
	background-color: var(--very-dark-grey);
}
body.dark .modal__task-view_item:hover {
	background-color: var(--main-purple-hover);
}
</style>
