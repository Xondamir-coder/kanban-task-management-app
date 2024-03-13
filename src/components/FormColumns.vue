<template>
	<TransitionGroup name="list" tag="ul" class="modal__board-list">
		<li class="modal__board-list_item" v-for="(col, i) in cols" :key="col">
			<div class="text-field-container width-100">
				<input
					class="text-field body-l flex-grow-1"
					type="text"
					required
					placeholder="e.g Todo"
					:value="col.name ? col.name : col.title"
					:name="`col ${i}`"
					:id="`input-${i}`"
					@input="checkInput" />
				<label :for="`input-${i}`" class="text-field-label body-l">Can't be empty</label>
			</div>
			<button type="button" @click="emitClick(col.name ? col.name : col.title)">
				<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
					<g fill="#828FA3" fill-rule="evenodd">
						<path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
						<path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
					</g>
				</svg>
			</button>
		</li>
	</TransitionGroup>
</template>

<script setup>
const props = defineProps({
	cols: Array,
});

const checkInput = event => {
	const { target } = event;
	if (!target.validity.valid)
		target.parentElement.nextElementSibling.firstElementChild.firstElementChild.setAttribute(
			'fill',
			'var(--red)'
		);
};
const emit = defineEmits(['delete-col']);
const emitClick = colName => emit('delete-col', colName);
</script>

<style>
.modal__board-list {
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	width: 75vw;
	max-width: 36rem;
	position: relative;
}
.modal__board-list::before {
	content: 'No columns';
	position: absolute;
	top: -5px;
	opacity: 0;
	transform: translateX(-1rem);
	transition: opacity 0.5s ease, transform 0.5s ease;
}
.modal__board-list:empty {
	height: 1rem;
}
.modal__board-list:empty::before {
	opacity: 1;
	transform: translateX(0);
}
.modal__board-list_item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1.6rem;
	width: 100%;
}
.modal__board-list_item input {
	flex-grow: 1;
}
.modal__board-list_item button {
	background-color: transparent;
}
</style>
