<template>
  <div>
    <form @submit.prevent="updateTodo()">
      <div class="form-group">
        <label>Edit Todo</label>
        <input v-model="editTask" type="text" class="form-control" />
        <label for="todoTitle" class="form-text text-muted">
          <small>* Required</small>
        </label>
        <br />
      </div>
      <div class="form-group">
        <label>Edit Details</label>
        <input v-model="editDetails" type="text" class="form-control" />
        <label for="todoTitle" class="form-text text-muted">
          <small>* Required</small>
        </label>
        <br />
      </div>
    </form>
    <!-- linkto cancel  Edit -->
    <div v-if="emptySave === true" class="alert alert-danger" role="alert">please Enter todo !</div>
    <router-link to="/">
      <button type="summit" class="btn btn-warning">Cancel Edit</button>
    </router-link>&nbsp;
    <!-- linkto saveEdit-->
    <button type="summit" class="btn btn-primary" v-on:click="updateTodo()">Save Edit</button>
  </div>
</template>

<!--firebase config-->
<script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-firestore.js"></script>
<script>
import { db } from "../main"
export default {
  name: "Edit",
  data() {
    return {
      todos: [],
      newTask: "",
      newDetail: "",
      editTask: "",
      editDetails: "",
      editID: null,
      isEmpty: false,
      emptySave: false
    }
  },
  firestore() {
    return {
      todos: db.collection("todos")
    }
  },
  created: function() {
    this.getTodoEdit();
  },
  methods: {
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
          })
        })
      this.todos = todolist;
      console.log("back to Homepage from EditPage");
    },
    getTodoEdit() {
      this.editID = this.$route.params.id;
      this.editTask = this.$route.params.task;
      this.editDetails = this.$route.params.details;
    },
    editTodo(todo) {
      (this.editID = todo.id),
        (this.editTask = todo.task),
        (this.editDetails = todo.details),
        console.log("edited!!!!");
    },
    updateTodo() {
      if (
        this.editTask.trim().length === 0 &&
        this.editDetails.trim().length === 0
      ) {
        this.emptySave = true;
        console.log("emptySave");
        return null
      }
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
      this.editTask = "";
      this.editDetails = "";
      this.$router.push({ path: "/" });
    }
  }
}
</script>
