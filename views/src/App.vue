<template>
  <div id="app">
    <nav>
      <ul class="navLinks">
        <li class=" text-blue-400 hover:bg-blue-100">
          <router-link  to="/Home">Accueil</router-link>
        </li>
        <!-- <li>
          <router-link to="/Quiz">Quiz</router-link>
        </li>
        <li>
          <router-link to="/Modifier">Modifier</router-link>
        </li> -->
      </ul>
    </nav>
    <div id="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style>

  @import "./assets/styles.css";
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

  #body{
    text-align: center;
    padding: 0;
    margin: 80px 0;
    width: 100vw;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    overflow-x: auto;
  }

  .navLinks {
    list-style: none;
    position: fixed;
    text-align: center;
    top: 0;
    width: 100%;
    background-color: lightgray;
}

.navLinks li {
  float: center;
  display: inline-block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 1.5em;
  color: royalblue;
}
</style>