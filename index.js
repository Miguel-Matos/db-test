import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"

const appSettings = {
  databaseURL: 'https://db-test-bdcbe-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const items = ref(database, 'groceries');

const inputVal = document.getElementById('input-field');

const btn = document.getElementById('add-button');

const list = document.getElementById("shopping-list");

onValue(items, function(snapshot) {
  let itemArr = Object.values(snapshot.val());
  list.innerHTML = '';

  for (let i = 0; i < itemArr.length; i++) {
    addItem(itemArr[i]);
  }
})

function clear() {
  inputVal.value = '';
}


btn.addEventListener('click', () => {

  push(items, inputVal.value);

  clear()
})

function addItem(itemValue) {
  list.innerHTML += `<li>${itemValue}</li>`;
}
