<template>
  <div>
    <br/>
    <div class="card mb-1" v-for="(todo, index) in todos" v-bind:key="todo.id">
      <div class="card-body">
        <h5 class="card-title">Todo {{index+1}}</h5>
        <p class="card-text">title: {{todo.task }}</p>
        <p class="card-text">details:{{todo.details}}</p>
        <div class="row">
          <div class="col-auto-mr-auto">
            <router-link  :to="{name: 'Edit', params: { id: todo.id , task:todo.task , details:todo.details}}"
              class="btn btn-primary"
            >Edit</router-link>&nbsp;
            <button class="btn btn-danger" v-on:click="removeTodo(todo.id)">Delete</button>&nbsp;
          </div>
          <div class="col-auto">
            &nbsp;
            <button
              v-if="index !== 0"
              v-on:click="moveUp(index)"
              class="btn btn-outline-info"
            >Up</button>&nbsp;
            <button v-if="index !== todos.length-1"
              v-on:click="moveDown(index)"
              class="btn btn-outline-info"
            >Down</button>
            <router-view />
          </div>

        </div>
    </div>
</div>
</div>
</template>

<!--firebase config-->
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>
<script>
import { db } from "../main";

export default {
  data() {
    return {
          todos: [],
      newTask: "",
      newDetail: "",
      editTask: "",
      editDetails: "",
      editID: null,
      isEmpty: false,
      showTodo: true,
      showCreate: false,
      showEdit: false,
      emptySave: false
    }
  },
  firestore() {
    return {
      todos: db.collection("todos")
    };
  },
  methods: {
      addTodo() {
        // const todo = []
        if (this.newTask.trim().length === 0 && this.newDetail.trim().length === 0) {
        return (this.emptySave = true);
        }
        db.collection('todos').add({
            task: this.newTask,
            details: this.newDetail
       }).then(this.newTask = '', this.newDetail = '')
        console.log('saved !!')
      },
    loadTodo() {
      let todolist = [];
      db.collection("todos")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let todo = {
              id: doc.id,
              task: doc.data().task,
              details: doc.data().details
            };
            todolist.push(todo);
          });
        });
      this.todos = todolist;
    },
    removeTodo(collectionID) {
      db.collection("todos")
        .doc(collectionID)
        .delete()
        .then(function() {})
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
      this.loadTodo();
    },
    editTodo(todo) {
      (this.editID = todo.id),
        (this.editTask = todo.task),
        (this.editDetails = todo.details),
        console.log("edited!!!!");
    },
    updateTodo() {
      db.collection("todos")
        .doc(this.editID)
        .update({
          task: this.editTask,
          details: this.editDetails
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
      this.editID = null;
      this.editTask = " ";
      this.loadTodo();
    },
    moveUp(index) {
      if (index == 0) {
        return;
      }
      let todo = this.todos[index];
      this.todos.splice(index, 1);
      this.todos.splice(index - 1, 0, todo);
    },
    moveDown(index) {
      if (index == this.todos.length - 1) {
        return;
      }
      let todo = this.todos[index];
      this.todos.splice(index, 1);
      this.todos.splice(index + 1, 0, todo);
    }
  },
  mounted() {
    this.loadTodo();
  }
};
</script>

<style scope>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
