<template>
	<div class="nav__container">
		<h2 class="nav__heading heading-s">All boards ({{ boards.length }})</h2>
		<ul class="nav__list" role="list">
			<li v-for="board in boards" @click="hideMenuModal">
				<RouterLink
					:to="`/board/${board.id}`"
					class="nav__link"
					active-class="nav__link-active">
					<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
							fill="#828FA3" />
					</svg>
					<h3 class="heading-m">{{ board.name }}</h3>
				</RouterLink>
			</li>
			<li>
				<button type="button" class="nav__item-add" @click="toggleModals">
					<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
							fill="#635FC7" />
					</svg>
					<h3 class="heading-m">
						<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
							<path
								fill="#635FC7"
								d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
						</svg>
						create new board
					</h3>
				</button>
			</li>
		</ul>
		<div class="nav__cta">
			<div class="nav__theme">
				<img src="../assets/icon-light-theme.svg" alt="light theme" />
				<input
					class="nav__theme-checkbox"
					type="checkbox"
					id="theme__toggle"
					:checked="theme === 'dark'"
					@change="toggleTheme" />
				<img src="../assets/icon-dark-theme.svg" alt="dark theme" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { theme, boards, toggleTheme, toggleAddBoardModal, hideMenuModal } from '../js/state';

const toggleModals = () => {
	hideMenuModal();
	toggleAddBoardModal();
};
</script>

<style scoped>
.nav__container {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
}
.nav__container > *:not(.nav__list) {
	margin-left: var(--sidebar-left-margin);
}
.nav__heading {
	text-transform: uppercase;
	margin-bottom: 1.9rem;
}
.nav__link {
	color: var(--medium-grey);
	text-decoration: none;
	border-top-right-radius: 2rem;
	border-bottom-right-radius: 2rem;
	transition: background-color 0.5s, color 0.5s;
}
.nav__link svg path {
	transition: fill 0.5s;
}
.nav__link-active {
	background-color: var(--main-purple);
	color: var(--white);
}
.nav__link-active svg path {
	fill: var(--white);
}
.nav__link,
.nav__item-add {
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: max-content;
	gap: 1.6rem;
	padding: 1.6rem var(--sidebar-left-margin);
}

.nav__cta {
	margin-top: auto;
	display: flex;
	flex-direction: column;
	gap: 3rem;
}
.nav__item-add {
	color: var(--main-purple);
	align-items: center;
	border-radius: 0;
	background-color: transparent;
}
.nav__item-add h3 {
	display: flex;
	gap: 0.5rem;
	align-items: center;
}
.nav__theme-checkbox {
	appearance: none;
	position: relative;
}
.nav__theme {
	background-color: var(--light-grey);
	padding: 1.5rem 0;
	border-radius: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
	transition: background-color 0.5s;
}
body.dark .nav__theme {
	background-color: var(--very-dark-grey);
}
.nav__theme-checkbox {
	width: 4rem;
	height: 2rem;
	background-color: var(--main-purple);
	border-radius: 1rem;
	cursor: pointer;
}
.nav__theme-checkbox:checked::before {
	transform: translateX(140%);
}
.nav__theme-checkbox::before {
	content: '';
	position: absolute;
	width: 1.4rem;
	height: 1.4rem;
	border-radius: 50%;
	top: 12%;
	left: 8%;
	background-color: var(--white);
	transition: transform 0.3s;
}

@media only screen and (max-width: 800px) {
	.nav__item-add h3 svg {
		display: none;
	}
}
</style>
