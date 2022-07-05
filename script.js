const submitBtn = document.querySelector('.submit');
const editBtn = document.querySelector('.edit');
const cardList = document.querySelector('.cards-container');
const cardText = document.querySelector('.input-text');
const cardId = document.querySelector('.card-id');

let tasks;
!localStorage.tasks ? tasks = [{text: "Try to make your fisrt task!", completed: false}] : tasks = JSON.parse(localStorage.getItem('tasks'));

let cardsListElems = [];

class Task {
	constructor(text) {
		this.text = text;
		this.completed = false;
	}
}

const createTemplate = (task, index) => {
	return `
		<li class="card${task.completed ? ' checked' : ''}" id="card-${index}">
			<h6 class="card-id">${index + 1}</h6>
			<p class="card-text" id="text-${index}">${task.completed ? '<s>' + task.text + '</s>' : task.text}</p>
			<div class="card-actions">
				<input onclick='completeTask(${index})' id="done-${index}" type="checkbox"${task.completed ? ' checked="checked"' : ''}class="done"></input>
				<button onclick='editTask(${index})'class="action" id="edit"><img class="icon" src="icons/edit.svg" alt="E"></button>
				<button onclick='deleteTask(${index})' class="action" id="delete"><img class="icon" src="icons/delete.svg" alt="D"></button>
			</div>
		</li>`
}

const fillCardList = () => {
	cardList.innerHTML = "";
	if(tasks.length > 0) {
		tasks.forEach((item, index) => {
			cardList.innerHTML += createTemplate(item, index);
		});
	}
}

const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = (index) => {
	tasks[index].completed = !tasks[index].completed
	updateLocal();
	fillCardList();
}

const deleteTask = (index) => {
	tasks.splice(index, 1);
	updateLocal();
	fillCardList();
}

const editTask = (index) => {
	const currentCard = document.querySelector(`#card-${index}`);
	const editable = document.querySelector(`#text-${index}`);
	if (currentCard.childNodes[3].classList == 'card-text') {
		editable.outerHTML = `<input type='text' class="current-input"></input>`;
		document.querySelector('.current-input').value = tasks[index].text
	}
	else {
		const newValue = document.querySelector('.current-input').value;
		tasks[index].text = newValue;
		updateLocal();
		fillCardList();
	}
}

fillCardList();

submitBtn.addEventListener('click' , () => {
	if(cardText.value) {
		submitBtn.classList.remove('red');
		tasks.push(new Task(cardText.value));
		cardText.value = '';
	}
	else {
		submitBtn.classList.add('red')
	}
	updateLocal();
	fillCardList();
})


