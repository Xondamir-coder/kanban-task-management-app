<template>
	<Modal type="task" :action="action">
		<form class="modal__task-form" @submit.prevent="submitForm" ref="form">
			<h1 class="heading-l capitalize">{{ heading }}</h1>
			<div class="modal__task-form_title">
				<label class="modal__task-form_label body-m" for="title">Title</label>
				<div class="text-field-container">
					<input
						class="text-field flex-grow-1"
						type="text"
						id="title"
						name="task-title"
						required
						:value="data.title"
						placeholder="e.g Take coffee break" />
					<label class="body-l text-field-label" for="title">Can't be empty</label>
				</div>
			</div>
			<div class="modal__task-form_desc">
				<label class="modal__task-form_label body-m" for="desc">Description</label>
				<textarea
					:value="data.description"
					class="text-field"
					name="task-desc"
					id="desc"
					cols="20"
					rows="3"
					placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."></textarea>
			</div>
			<div class="modal__task-form_cols">
				<label class="modal__task-form_label body-m" for="desc">Subtasks</label>
				<FormColumns :cols="data?.subtasks" @delete-col="removeSubtask" />
				<button class="button-secondary" type="button" @click="addSubtask">
					<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="#635FC7"
							d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
					</svg>
					add new subtask
				</button>
			</div>
			<div class="modal__task-form_date">
				<label class="modal__task-form_label body-m" for="date">Date</label>
				<div class="modal__task-form_date-container">
					<span class="modal__task-form_date-label">Start</span>
					<VueDatePicker v-model="startDate" class="date-picker"></VueDatePicker>
				</div>
				<div class="modal__task-form_date-container">
					<span class="modal__task-form_date-label">End</span>
					<VueDatePicker v-model="endDate" class="date-picker"></VueDatePicker>
				</div>
			</div>
			<button type="submit" class="modal__task-form_btn button-primary-s">
				Save Changes
			</button>
		</form>
	</Modal>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { getCurrentBoard, showModal, task, toggleModal } from '../../js/state';
import { getEmptyTask, getEmptyTaskCol } from '../../js/helpers';
import Modal from '../Modal.vue';
import FormColumns from '../FormColumns.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const board = getCurrentBoard();
const props = defineProps({
	action: String
});

const heading = computed(() => (props.action === 'add' ? 'add new task' : 'edit task'));
const data = ref();
const startDate = ref();
const endDate = ref();
const form = ref(null);

const populateColumns = () => {
	const formData = new FormData(form.value);
	const cols = Array.from(formData).filter(([key]) => key.includes('col'));
	data.value.title = formData.get('task-title');
	data.value.description = formData.get('task-desc');
	data.value.subtasks = cols.map(([_, val], i) => ({
		title: val,
		isCompleted: data.value.subtasks[i].isCompleted
	}));
};
const removeSubtask = title =>
	(data.value.subtasks = data.value.subtasks.filter(subtask => subtask.title !== title));
const addSubtask = () => {
	populateColumns();
	const emptyCol = getEmptyTaskCol();
	data.value.subtasks.push(emptyCol);
};
const watchTask = () => {
	if (!showModal.value.includes('task')) return;
	data.value =
		props.action === 'edit'
			? task.value && JSON.parse(JSON.stringify(task.value))
			: getEmptyTask();
	startDate.value = data.value?.startDate || '';
	endDate.value = data.value?.endDate || '';
};
const submitForm = () => {
	const boardData = { colIndex: -1, taskIndex: -1 };
	const formData = new FormData(form.value);
	data.value.title = formData.get('task-title');
	data.value.description = formData.get('task-desc');
	data.value.startDate = startDate.value;
	data.value.endDate = endDate.value;

	populateColumns();

	if (props.action === 'edit') {
		board.value.columns.forEach((col, index) => {
			const i = col.tasks.findIndex(t => t === task.value);
			if (i > -1) {
				boardData.taskIndex = i;
				boardData.colIndex = index;
			}
		});
		task.value = data.value;
		board.value.columns[boardData.colIndex].tasks[boardData.taskIndex] = task.value;
	}

	if (props.action === 'add') {
		const col = board.value.columns.find(col => col.name === data.value.status || col.name);
		task.value = data.value;
		col.tasks.push(task.value);
	}

	toggleModal();
};

watch(showModal, watchTask);
</script>

<style scoped>
form.modal__task-form {
	gap: 2rem;
	max-height: 80vh;
	overflow-y: auto;
	scrollbar-width: thin;
	padding-right: 2rem;
}
.modal__task-form,
.modal__task-form > * {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
}
.modal__task-form_label {
	color: var(--medium-grey);
}
.modal__task-form_desc {
	max-width: 100%;
}
.modal__task-form_btn {
	align-items: center;
}
.modal__task-form_date-container {
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 6rem 1fr;
	align-items: center;
}
.modal__task-form_date-label {
	font-size: 1.4rem;
}

.date-picker {
	--dp-font-size: 1.6rem;
	--dp-preview-font-size: 1.28rem;
	--dp-calendar-header-cell-padding: 0.8rem;
	--dp-time-font-size: 3.2rem;
}
</style>
