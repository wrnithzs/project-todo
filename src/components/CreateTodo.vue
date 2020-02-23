<template>
    <!-- Create form -->
  <div><br>
    <div class="form-group">
      <label for="todoTitle" > Input todo </label><br>
      <input v-model="newTask" type="text" class="form-control">
      <label for="todoTitle" class="form-text text-muted"><small>* Required</small></label><br>
    </div>
    <div class="form-group">
      <label for="todoTitle"> Details todo </label><br>
      <input v-model="newDetail" type="text" class="form-control"><br>
    </div>
    <!-- linkto cancel -->
    <router-link to='/'>
    <button type="button" class="btn btn-warning" v-on:click="loadTodo()">
      Cancel </button>
    </router-link>&nbsp;
    <!-- linkto save -->
    <router-link to="/">
    <button type="button" class="btn btn-primary" v-on:click="addTodo()">
      Save </button>
    </router-link>
  </div>
</template>
<!--firebase config-->
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>
<script>
import { db } from "../main";
export default {
  name: 'Create',
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
        todos: db.collection('todos')
      }
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
