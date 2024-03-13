<template>
	<div class="status">
		<h2 class="status__title">current status</h2>
		<input class="dropdown-checkbox" type="checkbox" id="dropdown-input" />
		<label class="dropdown-label body-l" for="dropdown-input">
			<span>{{ data.status || 'None' }}</span>
			<img src="../../assets/icon-chevron-down.svg" alt="down" />
		</label>
		<ul class="dropdown status_list" role="list">
			<li
				class="dropdown-item"
				v-for="state in taskStates"
				:key="state"
				@click="changeTaskStatus(state)">
				<p class="body-l">{{ state }}</p>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { getCurrentBoard } from '../../js/state';

const props = defineProps({
	data: Object,
});
defineOptions({
	inheritAttrs: false,
});

const board = getCurrentBoard();

const taskStates = computed(() => board.value.columns.map(col => col.name));
const changeTaskStatus = newStatus => {
	const dropdown = event.target.closest('.dropdown');
	if (!dropdown || newStatus === props.data.status) return;
	const checkbox = dropdown.previousElementSibling.previousElementSibling;
	checkbox.checked = !checkbox.checked;
	props.data.status = newStatus;
	board.value.columns.forEach(col => {
		col.tasks = col.tasks.filter(task => task !== props.data);
		if (col.name === props.data.status) col.tasks.push(props.data);
	});
};
</script>

<style scoped>
.status {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
}
.status__title {
	text-transform: capitalize;
	font-size: var(--font-size-heading-s);
}
</style>
