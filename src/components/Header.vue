<template>
	<header class="header">
		<div class="header__logo-box">
			<img src="../assets/logo-mobile.svg" alt="logo mobile" />
			<label for="menu-btn" class="header__logo-label">
				<h1 class="heading-xl">{{ board?.name || 'Home' }}</h1>
			</label>
			<input
				type="checkbox"
				id="menu-btn"
				class="header__logo-checkbox"
				@change="toggleMenuModal" />
			<MyTransition>
				<NavMenu v-if="showMenuModal" class="header__list" />
			</MyTransition>
		</div>
		<div class="header__cta">
			<button class="header__cta-add button-primary-l">
				<img src="../assets/icon-add-task-mobile.svg" alt="" />
				<span>add new task</span>
			</button>
			<button class="header__cta-edit" @click="toggleEditModal">
				<img src="../assets/icon-vertical-ellipsis.svg" alt="edit board" />
			</button>
		</div>
	</header>
</template>

<script setup>
import {
	showMenuModal,
	toggleMenuModal,
	toggleEditBoardModal,
	toggleErrorBoardModal,
} from '../js/state';
import MyTransition from './MyTransition.vue';
import NavMenu from './NavMenu.vue';

const props = defineProps({ board: Object });

const toggleEditModal = () => (props.board ? toggleEditBoardModal() : toggleErrorBoardModal());
</script>

<style scoped>
.header {
	grid-area: header;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2.5rem 2rem;
	transition: background-color 0.5s;
	position: relative;
}
body.dark .header {
	background-color: var(--dark-grey);
}
.header__error {
	padding: 3.2rem;
	background-color: var(--white);
	border-radius: 5px;
}
.header__error-heading {
	text-transform: none;
}
body.dark .header__error {
	background-color: var(--dark-grey);
}
.header__cta {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
}
.header__cta .header__cta-add {
	padding: 1.5rem 2.4rem;
	display: flex;
	align-items: center;
	gap: 0.8rem;
}
.header__cta-edit {
	background-color: transparent;
	padding: 0 1.5rem;
}
.header__logo-label {
	pointer-events: none;
}
.header__logo-box {
	display: flex;
	gap: 1rem;
}
.header__logo-checkbox {
	display: none;
}
.header__logo-checkbox::before {
	content: url(../assets/icon-chevron-down.svg);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.header__logo-box img {
	display: none;
}
.header__delete {
	border-radius: 5px;
	width: 90%;
	max-width: 48rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
.header__delete-btns {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
body.dark .header__delete {
	background-color: var(--dark-grey);
	padding: 3rem;
}
.header__list {
	width: 100%;
	max-width: 30rem;
	position: absolute;
	top: 100%;
	right: 20%;
	z-index: 1;
	padding: 2rem;
	border-radius: 10px;
	background-color: var(--white);
}
body.dark .header__list {
	background-color: var(--dark-grey);
}

/* Transition */
.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
}
.list-leave-active {
	position: absolute;
}

@media only screen and (max-width: 600px) {
	.header__delete-btns {
		gap: 1.5rem;
	}
	.header__cta-add span {
		display: none;
	}
	.header__logo-box img {
		display: block;
	}
	.header__logo-checkbox {
		display: block;
	}
	.header__logo-label {
		pointer-events: all;
	}
}
</style>
