import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: 'https://db-test-bdcbe-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const items = ref(database, 'groceries');

const inputVal = document.getElementById('input-field');

const btn = document.getElementById('add-button');

const list = document.getElementById("shopping-list");
const li = document.createElement('li');


btn.addEventListener('click', () => {
  li.textContent = inputVal.value;
  list.appendChild(li);
  push(items, inputVal.value);

  inputVal.value = '';
})