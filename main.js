let input = document.querySelector("input[type='text']");
let submitBtn = document.querySelector("input[type='submit']");
let tasks = document.querySelector(".tasks");
let tasksArray = [];

submitBtn.addEventListener("click", () => {
  if (input.value != "") {
    const data = {
      task: input.value,
      completed: false,
      id: Date.now(),
    };
    tasksArray.push(data);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    input.value = "";
    tasks.innerHTML = "";
    tasksArray.forEach((task) => {
      let div = document.createElement("div");
      div.classList.add("task");
      div.id = task.id;
      div.textContent = task.task;
      let delBtn = document.createElement("span");
      delBtn.classList.add("delete");
      delBtn.textContent = "Delete";
      div.appendChild(delBtn);
      tasks.appendChild(div);
    });
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    tasksArray = [];
    document.querySelectorAll(".task").forEach((task) => {
      const data = {
        task: task.childNodes[0].textContent,
        completed: false,
        id: task.id,
      };
      tasksArray.push(data);
    });
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("completed");
    tasksArray = [];
    document.querySelectorAll(".task").forEach((task) => {
      const data = {
        task: task.childNodes[0].textContent,
        completed: task.classList.contains("completed"),
        id: task.id,
      };
      tasksArray.push(data);
    });
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  if (e.target.classList.contains("clear")) {
    tasksArray = [];
    localStorage.removeItem("tasks");
    tasks.innerHTML = "";
  }
});

window.addEventListener("load", () => {
  if (localStorage.getItem("tasks")) {
    tasksArray = JSON.parse(localStorage.getItem("tasks"));
    tasksArray.forEach((task) => {
      let div = document.createElement("div");
      div.classList.add("task");
      if (task.completed) {
        div.classList.add("completed");
      }
      div.id = task.id;
      div.textContent = task.task;
      let delBtn = document.createElement("span");
      delBtn.classList.add("delete");
      delBtn.textContent = "Delete";
      div.appendChild(delBtn);
      tasks.appendChild(div);
    });
  }
});
