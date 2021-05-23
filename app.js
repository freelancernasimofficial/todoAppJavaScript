const titleInput = document.querySelector("input#title");
const descInput = document.querySelector("input#desc");
const addBtn = document.querySelector("button#addBtn");
const tableBody = document.querySelector("#tableBody");

document.querySelector("#cancel").addEventListener("click", function () {
  document.querySelector("#editForm input").value = "";
  document.querySelector("#editForm textarea").value = "";
  document.querySelector("#editForm").style.display = "none";
});

/* Check if todo exists or add one */

if (!localStorage.getItem("todo")) {
  let mkArray = new Array();
  localStorage.setItem("todo", JSON.stringify(mkArray));
}

const loopTodos = () => {
  //Empty table first

  tableBody.innerHTML = "";

  let currentItems = JSON.parse(localStorage.getItem("todo"));

  /* Loop through localStorage  */
  let serial = 1;
  currentItems.forEach((value, index) => {
    tableBody.innerHTML += `<tr id="singleTodo" data-itemid="${index}">
  <td>${serial}</td>
  <td>${value.title}</td>
  <td>${value.desc}</td>
  <td>
    <button id="editBtn" class="btn btn-edit">
      Edit
    </button>
    <button id="dltBtn" class="btn btn-dlt">
      Delete
    </button>
  </td>
</tr>`;
    serial++;
  });

  deleteTod();
  modifyTodo();

  if (currentItems.length === 0) {
    document.querySelector("table thead").setAttribute("style", "display:none");

    document.querySelector("#emptyMsg").innerHTML = "There is no todo";
  } else {
    document.querySelector("table thead").removeAttribute("style");

    document.querySelector("#emptyMsg").innerHTML = "";
  }
};

const addTodo = () => {
  addBtn.addEventListener("click", function () {
    let todoTitle = titleInput.value.trim();
    let todoDesc = descInput.value.trim();

    let newTodo = {
      title: todoTitle,
      desc: todoDesc,
    };

    // Get current Items
    let currentTodos = JSON.parse(localStorage.getItem("todo"));
    currentTodos.push(newTodo);

    localStorage.clear();
    //setItem again
    localStorage.setItem("todo", JSON.stringify(currentTodos));

    //empty input boxes
    titleInput.value = "";
    descInput.value = "";

    //loop table again
    loopTodos();
    modifyTodo();
  });
};

loopTodos();

function deleteTod() {
  /* Delete & Edit Button */
  const allTodos = document.querySelectorAll("#singleTodo");

  allTodos.forEach((todo) => {
    todo.querySelector("#dltBtn").addEventListener("click", function () {
      let currentItems = JSON.parse(localStorage.getItem("todo"));
      let clickedIndex = Number(todo.getAttribute("data-itemid"));
      let remainingItems = currentItems.filter((item, index) => {
        return index !== clickedIndex;
      });

      //clear the localstorage
      localStorage.clear();
      localStorage.setItem("todo", JSON.stringify(remainingItems));

      loopTodos();
    });
  });
}
deleteTod();

function modifyTodo() {
  /* Delete & Edit Button */
  const allTodos = document.querySelectorAll("#singleTodo");

  allTodos.forEach((todo) => {
    todo.querySelector("#editBtn").addEventListener("click", function () {
      let currentItems = JSON.parse(localStorage.getItem("todo"));
      let clickedIndex = Number(todo.getAttribute("data-itemid"));

      document.querySelector("#Edittitle").value =
        currentItems[clickedIndex].title;
      document.querySelector("#Editdesc").value =
        currentItems[clickedIndex].desc;

      document.querySelector("#editForm").style.display = "block";

      document.querySelector("#arrayIndex").value = clickedIndex;
    });
  });
}
modifyTodo();

function updateTodo() {
  document.querySelector("#update").addEventListener("click", function () {
    let currentItems = JSON.parse(localStorage.getItem("todo"));

    let editTitle = document.querySelector("#Edittitle").value;
    let editDesc = document.querySelector("#Editdesc").value;

    let editObj = {
      title: editTitle,
      desc: editDesc,
    };

    let updateIndex = Number(document.querySelector("#arrayIndex").value);

    currentItems[updateIndex] = editObj;

    localStorage.clear();

    localStorage.setItem("todo", JSON.stringify(currentItems));

    document.querySelector("#Edittitle").value = "";
    document.querySelector("#Editdesc").value = "";
    document.querySelector("#editForm").style.display = "none";

    loopTodos();
  });
}
updateTodo();

addTodo();
