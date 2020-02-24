<template>
 <div id="app" class="container">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          v-on:click="loadTodo(), showEdit = false, showCreate =false, showTodo =true"
        >Home</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          v-on:click="loadTodo(), showEdit = false,showCreate =false, showTodo =true"
        >Todo List</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          v-on:click=" showEdit = false, showCreate = true , showTodo = false"
        >Create</a>
      </li>
    </ul>
    <br />

    <!-- show todolist  -->
    <div v-if="showTodo">
      <div v-for="(todo, index) in todos" v-bind:key="todo.id" class="card mb-1">
        <div class="card-body">
          <h5 class="card-title">Todo {{index+1}}</h5>
          <p class="card-text">title: {{todo.task }}</p>
          <p class="card-text">details:{{todo.details}}</p>
          <div class="row">
            <div class="col-auto-mr-auto">
              <button
                v-on:click="editTodo(todo), showEdit = true, showTodo = false"
                type="button"
                class="btn btn-info"
              >Edit</button>&nbsp;
              <button
                v-on:click="removeTodo(todo.id)"
                type="button"
                class="btn btn-danger"
              >Delete</button>
            </div>
            <div class="col-auto">
              &nbsp;
              <button
                v-if="index !== 0"
                v-on:click="moveUp(index)"
                class="btn btn-outline-info"
              >Up</button>&nbsp;
              <button
                v-if="index !== todos.length-1"
                v-on:click="moveDown(index)"
                class="btn btn-outline-info"
              >Down</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create -->
    <div v-if="showCreate">
      <div v-if="emptySave" class="alert alert-danger" role="alert">please Enter todo !</div>
      <div class="form-group">
        <label>Input Todo</label>
        <input
          v-on:click="isEmpty = true, emptySave = false"
          type="text"
          v-model="newTask"
          class="form-control"
        />
        <br/>
        <label>Details</label>
        <input type="text" v-model="newDetail" class="form-control" />
      </div>
      <button
        v-on:click="loadTodo(), showCreate = false, showTodo = true"
        type="button"
        class="btn btn-warning"
      >Cancel</button>&nbsp;
      <button
        v-if="!isEmpty"
        v-on:click="showCreate = true, showTodo = false, emptySave = true"
        type="button"
        class="btn btn-primary"
      >Save</button>
      <button
        v-else
        type="button"
        class="btn btn-primary"
        v-on:click="addTodo(), showCreate = false, showTodo = true"
      >Save</button>
    </div>

    <!-- Edit -->
    <div v-if="showEdit">
      <div class="form-group">
        <label>Edit Todo</label>
        <input v-on:click="isEmpty = false" type="text" v-model="editTask" class="form-control" />
        <br />

        <label>Edit Details</label>
        <input type="text" v-model="editDetails" class="form-control" />
      </div>
      <button
        v-on:click="loadTodo(), showCreate = false , showTodo = true"
        type="button"
        class="btn btn-warning"
      >Cancel</button>&nbsp;
      <button
        v-if="isEmpty !== true"
        v-on:click="updateTodo(), showEdit = false , showTodo = true"
        type="button"
        class="btn btn-primary"
      >Save Edit</button>
    </div>
  </div>
</template>
<!--firebase config-->
<script src="https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>

<script>
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import { db } from '../main'

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
      if (this.newtask !== "" && this.newDetail !="") {
        db.collection("todos").add({
          task: this.newTask,
          details: this.newDetail
        })
      }

      else {
        return this.emptySave = true;
      }
      this.loadTodo();
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

<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
