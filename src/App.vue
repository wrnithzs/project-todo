<template>
  <div id="app">
    <img width="40%" height="20%" src="https://cdn.worldvectorlogo.com/logos/studio-ghibli-logo.svg">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link :to="{ name: 'TodoList' }" class="nav-link">
            Todo List
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Create' }" class="nav-link">
            Create
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
