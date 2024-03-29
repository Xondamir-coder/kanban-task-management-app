# Frontend Mentor - Kanban task management web app solution

This is a solution to the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
    -   [Useful resources](#useful-resources)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

-   View the optimal layout for the app depending on their device's screen size
-   See hover states for all interactive elements on the page
-   Create, read, update, and delete boards and tasks
-   Receive form validations when trying to create/edit boards and tasks
-   Mark subtasks as complete and move tasks between columns
-   Hide/show the board sidebar
-   Toggle the theme between light/dark modes
-   **Bonus**: Allow users to drag and drop tasks to change their status and re-order them in a column
-   **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)
-   **Bonus**: Build this project as a full-stack application

### Screenshot

![](./screenshot.png)

### Links

-   Live Site URL: [Live Site](https://vue-kanban-app.netlify.app)

## My process

### Built with

-   Semantic HTML5 markup
-   CSS custom properties
-   Flexbox
-   CSS Grid
-   Mobile-first workflow
-   [Vue.js](https://vuejs.org/) - Javascript framework

### What I learned

Learned a lot about forms and validation

```css
.dropdown-checkbox:checked ~ .dropdown {
	opacity: 1;
	visibility: visible;
	transform: translateY(0);
}
```

### Continued development

In future I want to improve this project by adding more transition and animations. Also clean and resctucture the code a bit

### Useful resources

-   [MDN Docs](https://developer.mozilla.org/en-US/) - Helped me with form validation and HTML
-   [Vue Docs](https://vuejs.org/) - At times I was stuck with vue code I got help from Docs

## Author

-   LinkedIn - [LinkedIn](https://www.linkedin.com/in/xondamir-nazrullayev/)
-   Frontend Mentor - [@Xondamir-coder](https://www.frontendmentor.io/profile/Xondamir-coder)

## Acknowledgments

Quite the experience I've got from this project. Faced challenges with Vue component structure, state management (create my own state solution) and many more. I thank you frontendmentor for such a good challenge
