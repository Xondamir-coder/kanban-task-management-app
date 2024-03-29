<template>
	<section ref="sidebar" class="sidebar">
		<RouterLink to="/" class="sidebar__logo">
			<img v-if="theme === 'light'" src="../assets/logo-dark.svg" alt="logo dark" />
			<img v-else src="../assets/logo-light.svg" alt="logo light" />
		</RouterLink>
		<NavMenu />
		<label class="sidebar__hide">
			<input
				class="sidebar__hide-checkbox"
				type="checkbox"
				id="checkbox__hide"
				@change="toggleSidebar" />
			<label class="heading-m" for="checkbox__hide">Hide Sidebar</label>
		</label>
	</section>
	<button
		ref="showSidebarBtn"
		class="sidebar__show-btn sidebar__show--hidden"
		@click="toggleSidebar">
		<img src="../assets/icon-show-sidebar.svg" alt="show sidebar" />
	</button>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { theme } from '../js/state';
import { toggleAppClosedClass } from '../js/helpers';
import NavMenu from '../components/NavMenu.vue';

const sidebar = ref(null);
const showSidebarBtn = ref(null);

const toggleSidebar = () => {
	const curWidth = sidebar.value.offsetWidth;
	sidebar.value.style.width = `${curWidth}px`;
	sidebar.value.classList.toggle('sidebar--closed');
	showSidebarBtn.value.classList.toggle('sidebar__show--hidden');
	toggleAppClosedClass();
};
</script>

<style scoped>
.sidebar {
	grid-area: sidebar;
	padding: 2.8rem 0;
	padding-right: var(--sidebar-left-margin);
	color: var(--medium-grey);
	height: 100dvh;
	display: flex;
	flex-direction: column;
	transition: background-color 0.5s, border-color 0.5s, transform 0.5s;
	border-right: 1px solid var(--lines-light);
}
body.dark .sidebar {
	background-color: var(--dark-grey);
	border-color: var(--lines-dark);
}
.sidebar--closed {
	transform: translateX(-30vw);
}
.sidebar__logo {
	align-self: flex-start;
	margin-bottom: 5.5rem;
	width: 100%;
	max-width: 15rem;
	margin-left: var(--sidebar-left-margin);
}
.sidebar__logo img {
	width: 100%;
	height: 100%;
}
.sidebar__show-btn {
	position: absolute;
	bottom: 3.2rem;
	left: 0;
	background-color: var(--main-purple);
	width: 5.8rem;
	padding: 2rem;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	transition-property: transform, opacity, background-color;
	transition-duration: 0.5s;
}
.sidebar__show-btn:hover {
	background-color: var(--main-purple-hover);
}
.sidebar__show--hidden {
	opacity: 0;
	transform: translateX(-120%);
}
.sidebar__hide {
	display: flex;
	align-items: center;
	gap: 1.5rem;
	margin-top: 1rem;
	padding: 1.6rem var(--sidebar-left-margin);
	border-top-right-radius: 2rem;
	border-bottom-right-radius: 2rem;
	transition-property: color, background-color;
	transition-duration: 0.5s;
}
.sidebar__hide > * {
	cursor: pointer;
}
.sidebar__hide label {
	flex-grow: 1;
}
.sidebar__hide:hover {
	color: var(--main-purple);
	background-color: var(--light-grey);
}
.sidebar__hide-checkbox {
	width: 1.6rem;
	height: 1.6rem;
}
.sidebar__hide-checkbox::before {
	content: url(../assets/icon-hide-sidebar.svg);
	width: 100%;
	height: 100%;
	position: absolute;
	inset: 0;
}

@media only screen and (max-width: 600px) {
	.sidebar {
		display: none;
	}
}
</style>
