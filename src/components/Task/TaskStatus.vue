<template>
	<div class="status">
		<h2 class="status__title">current status</h2>
		<input class="dropdown-checkbox" type="checkbox" id="dropdown-input" />
		<label class="dropdown-label body-l" for="dropdown-input">
			<span>{{ data.status || 'None' }}</span>
			<img src="../../assets/icon-chevron-down.svg" alt="down" />
		</label>
		<ul class="dropdown status_list" role="list" v-bind="$attrs">
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
const props = defineProps({
	data: Object,
});
defineOptions({
	inheritAttrs: false,
});

const taskStates = ['Todo', 'Doing', 'Done'];
const changeTaskStatus = newStatus => {
	const dropdown = event.target.closest('.dropdown');
	if (!dropdown) return;
	const checkbox = dropdown.previousElementSibling.previousElementSibling;
	checkbox.checked = !checkbox.checked;
	props.data.status = newStatus;
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
