<template>
  <div>
    <form @submit.prevent="addTodo()">
      <div class="form-group">
        <label for="todoTitle">Input todo</label>
        <br />
        <input v-model="newTask" type="text" class="form-control" />
        <label for="todoTitle" class="form-text text-muted">
          <small>* Required</small>
        </label>
        <br />
      </div>
      <div class="form-group">
        <label for="todoTitle">Details todo</label>
        <br />
        <input v-model="newDetail" type="text" class="form-control" />
        <label for="todoTitle" class="form-text text-muted">
          <small>* Required</small>
        </label>
        <br />
      </div>
    </form>
    <div v-if="emptySave === true" class="alert alert-danger" role="alert">Please Enter todo !</div>
    <router-link to="/">
      <button type="summit" class="btn btn-warning">Cancel</button>
    </router-link>&nbsp;
    <button type="summit" class="btn btn-primary" v-on:click="addTodo()">Save</button>
  </div>
</template>

<script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-firestore.js"></script>

<script>
import { db } from "../main"
export default {
  name: "Create",
  data() {
    return {
      todos: [],
      newTask: "",
      newDetail: "",
      editTask: "",
      editDetails: "",
      editID: null,
      emptySave: false
    }
  },
  firestore() {
    return {
      todos: db.collection("todos")
    }
  },
  methods: {
    addTodo() {
      if (
        this.newTask.trim().length === 0 &&
        this.newDetail.trim().length === 0
      ) {
        this.emptySave = true;
        console.log("emptySave");
        return null
      }
      db.collection("todos").add({
        task: this.newTask,
        details: this.newDetail
      })
      this.$router.push({ path: "/" });
      console.log("create success");
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
            console.log(querySnapshot.size);
          })
        })
      this.todos = todolist;
      console.log("back to HomePage");
    }
  }
}
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
