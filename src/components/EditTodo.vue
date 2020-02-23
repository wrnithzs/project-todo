<template>
  <div>
    <form v-on:submit.prevent="updateTodo">
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
        <br />
      </div>
      <button type="button" class="btn btn-warning" v-on:click="loadTodo()">Cancel Edit</button>&nbsp;
      <router-link to="/">
        <button type="button" class="btn btn-primary" v-on:click="updateTodo()">Save</button>
      </router-link>
    </form>
  </div>
</template>
<!--firebase config-->
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>

<script>
import { db } from '../main'
export default {
  name: 'Edit',
  data() {
    return {
      todos: [],
      newTask: '',
      newDetail: '',
      editTask: '',
      editDetails: '',
      editID: null,
      isEmpty: false,
      emptySave: false
  }
  },
  firestore() {
    return {
        todos: db.collection('todos')
      }
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
            }
            todolist.push(todo);
          })
        });
      this.todos = todolist;
    },
    editTodo(todo) {
      (this.editID = todo.id),
        (this.editTask = todo.task),
        (this.editDetails = todo.details),
        console.log("edited!!!!");
    },
    updateTodo() {
      db.collection('todos')
        .doc(this.editID)
        .update({
          task: this.editTask,
          details: this.editDetails
        })
        .then(function() {
          console.log('Document successfully updated!');
        })
        .catch(function(error) {
          console.error('Error updating document: ', error);
        });
      this.editID = null;
      this.editTask = '';
      this.loadTodo();
    }
  }
}
</script>
