firebase.initializeApp({
    apiKey: "AIzaSyBZlNGYCqIXpQSenj6gjk9Cz4HQ8rgg1VY",
    authDomain: "plp-apps-75c11.firebaseapp.com",
    projectId: "plp-apps-75c11",
    storageBucket: "plp-apps-75c11.appspot.com",
    messagingSenderId: "804276420403",
    appId: "1:804276420403:web:8863fec831c636042c4846"
  });
  
  const db = firebase.firestore();
  
  // Function to add a task
  function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
      db.collection("tasks").add({
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      taskInput.value = "";
      console.log("Task a dded.");
    }
  }
  
  // Function to render tasks
  function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${doc.data().task}</span>
      <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  }
  
  // Real-time listener for tasks
  db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          renderTasks(change.doc);
        }
      });
    });
  
  // Function to delete a task
  function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
    location.reload();
  }