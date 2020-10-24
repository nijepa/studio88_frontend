<template>
  <div class="login__wrapper">
    <label for="username">User name</label>
    <input type="text" name="username" class="login_input">
    <label for="pass">Password</label>
    <input type="password" name="pass" class="login_input">
    <button type="submit" @click="logIn" class="login_btn">Log In</button>
  </div>
</template>

<script>
  import router from '../router';
  export default {
    name: 'LogIn',
    
    methods: {
      logIn() {
        router.push("/dashboard")
      }
    }
  }
</script>

<style>
  .login__wrapper {
    display: grid;
    justify-items: baseline;
    margin-top: 3em;
  }

  .login_input {
    margin-bottom: 1em;
    background: #fff;
    color: var(--black);
    /* border-radius: 4px; */
    border: 1px solid transparent;
    border-bottom: 1px solid #d1d1d1;
    box-shadow: inset 1px 2px 8px rgba(0, 0, 0, 0.07);
    font-family: inherit;
    font-size: 1.2em;
    line-height: 1.45;
    outline: none;
    padding: 0.6em 1.45em 0.7em;
    -webkit-transition: .18s ease-out;
    -moz-transition: .18s ease-out;
    -o-transition: .18s ease-out;
    transition: .18s ease-out;
  }

  .login_input:hover, .login_input:focus {
    color: #4b515d;
    background: #fff;
    border-bottom: 1px solid var(--purple);
    box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.01), 0px 0px 8px rgba(0, 0, 0, 0.2);
  }

  .login_btn {
    background: white;
    padding: 1.2em;
    cursor: pointer;
    color: var(--purple);
    font-size: 1.2em;
    font-weight: 800;
    border: 2px solid transparent;
    border-bottom: 2px solid var(--purple);
    transition: ease .8s all;
  }

  .login_btn:hover {
    color: var(--purple-dark);
    border-bottom: 2px solid var(--purple-dark);
    transform: scale(1.05);
  }
</style>