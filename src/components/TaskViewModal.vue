<template>
	<MyTransition>
		<div v-if="showModal === 'task-view'" class="modal modal__task-view">
			<div class="modal__task-view_head">
				<h1 class="heading-l">{{ task.title }}</h1>
				<button class="modal__task-view_btn" @click="toggleModal('task-edit')">
					<img src="../assets/icon-vertical-ellipsis.svg" alt="menu" />
				</button>
			</div>
			<p v-if="task.description" class="modal__task-view_desc body-l">
				{{ task.description }}
			</p>
			<div class="modal__task-view_subtasks">
				<h2 class="modal__task-view_num body-m">
					Subtasks ({{ numOfCompletedSubtasks }} of {{ task.subtasks.length }})
				</h2>
				<ul class="modal__task-view_list" role="list">
					<li
						class="modal__task-view_item"
						v-for="(subtask, i) in task.subtasks"
						:key="i">
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
			<div class="modal__task-view_status">
				<h2 class="modal__task-view_status-title">current status</h2>
				<input class="dropdown-checkbox" type="checkbox" id="dropdown-input" />
				<label class="dropdown-label body-l" for="dropdown-input">
					<span>{{ task.status || 'None' }}</span>
					<img src="../assets/icon-chevron-down.svg" alt="down" />
				</label>
				<ul class="dropdown modal__task-view_status_list" role="list">
					<li
						class="dropdown-item"
						v-for="state in taskStates"
						:key="state"
						@click="changeTaskStatus(state)">
						<p class="body-l">{{ state }}</p>
					</li>
				</ul>
			</div>
		</div>
	</MyTransition>
</template>

<script setup>
import { computed } from 'vue';
import { showModal, task, toggleModal } from '../js/state';
import MyTransition from './MyTransition.vue';

const taskStates = ['Todo', 'Doing', 'Done'];
const numOfCompletedSubtasks = computed(
	() => task.value.subtasks.filter(subtask => subtask.isCompleted).length
);

const changeSubtaskStatus = curSubtask => (curSubtask.isCompleted = !curSubtask.isCompleted);
const changeTaskStatus = newStatus => {
	const dropdown = event.target.closest('.dropdown');
	if (!dropdown) return;
	const checkbox = dropdown.previousElementSibling.previousElementSibling;
	checkbox.checked = !checkbox.checked;
	task.value.status = newStatus;
};
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
.modal__task-view_status {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
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
.modal__task-view_status-title {
	text-transform: capitalize;
	font-size: var(--font-size-heading-s);
}
body.dark .modal__task-view_num {
	color: var(--white);
}
body.dark .modal__task-view_item {
	background-color: var(--very-dark-grey);
}
</style>
