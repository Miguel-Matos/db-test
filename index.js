import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"

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
  if (snapshot.exists()) {
    let itemArr = Object.entries(snapshot.val());
    list.innerHTML = '';
  
    for (let i = 0; i < itemArr.length; i++) {
      let currentItem = itemArr[i];
      addItem(currentItem);
    }
  } else {
    list.innerHTML = '';
  }

})




function clear() {
  inputVal.value = '';
}


btn.addEventListener('click', () => {

  push(items, inputVal.value);

  clear()
})

function addItem(item) {
  let itemID = item[0]
  let li = document.createElement('li');
  li.textContent = item[1];

  li.addEventListener('click', () => {
    let ID = ref(database, `groceries/${itemID}`);
    remove(ID);
  })

  list.append(li);
}
