// 할 일 목록을 저장할 배열
let tasks = [];

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let prioritySelect = document.getElementById("prioritySelect");
  let task = taskInput.value;
  let priority = prioritySelect.value;

  let timestamp = new Date().getTime();

  tasks.push({
    task: task,
    priority: priority,
    completed: false,
    timestamp: timestamp,
  });

  updateTaskList();

  taskInput.value = "";
}

function updateTaskList() {
  let taskListContainer = document.getElementById("taskList");
  taskListContainer.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let taskItem = document.createElement("div");
    taskItem.id = `taskItem_${i}`;
    taskItem.innerHTML = `
      <input type="checkbox" onchange="toggleCompletion(${i})" ${
      tasks[i].completed ? "checked" : ""
    }>
      <span>${tasks[i].task}</span>
      <span> &nbsp;&nbsp;우선순위: ${tasks[i].priority}</span>
      <span style="display:none;">입력 시간: ${tasks[i].timestamp}</span>
      <button onclick="editTask(${i})">수정</button>
    `;
    taskListContainer.appendChild(taskItem);
  }
}

function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
}

function filterList(filterType) {
  for (let i = 0; i < tasks.length; i++) {
    let listItem = document.getElementById(`taskItem_${i}`);

    if (
      (filterType === "completed" && tasks[i].completed) ||
      (filterType === "incompleted" && !tasks[i].completed) ||
      filterType === "all"
    ) {
      listItem.style.display = "block";
    } else {
      listItem.style.display = "none";
    }
  }
}

function editTask(index) {
  let newTask = prompt("수정할 내용을 입력하세요", tasks[index].task);

  let newPriority = prompt(
    "우선순위를 수정하시겠습니까\n 낮음, 보통, 높음, 매우 높음 중에 우선사항을 입력하세요 ",
    tasks[index].priority
  );

  while (
    newPriority !== null &&
    !["낮음", "보통", "높음", "매우 높음"].includes(newPriority)
  ) {
    alert("낮음, 보통, 높음, 매우 높음 중에 입력하세요. 다른건 안됨");

    newPriority = prompt(
      "우선순위를 수정하시겠습니까\n 낮음, 보통, 높음, 매우 높음 중에 우선사항을 입력하세요 ",
      tasks[index].priority
    );
  }

  if (newTask !== null && newPriority !== null) {
    tasks[index].task = newTask;
    tasks[index].priority = newPriority;
    updateTaskList();
  }
}

function sortList() {
  let sortType = document.getElementById("sortList").value;

  if (sortType === "최신순") {
    tasks.sort((a, b) => b.timestamp - a.timestamp);
  } else if (sortType === "오래된순") {
    tasks.sort((a, b) => a.timestamp - b.timestamp);
  } else if (sortType === "우선순위 낮은순") {
    tasks.sort((a, b) => {
      let priorityOrder = {
        낮음: 1,
        보통: 2,
        높음: 3,
        "아주 높음": 4,
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  } else if (sortType === "우선순위 높은순") {
    tasks.sort((a, b) => {
      let priorityOrder = {
        낮음: 1,
        보통: 2,
        높음: 3,
        "아주 높음": 4,
      };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  updateTaskList();
}
