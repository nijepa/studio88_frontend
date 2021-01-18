<template>
  <div class="d">
    <div v-if="isLog" class="app-load" key="1">
      <img src="../assets/img/loading1.gif" alt="" class="loading">
      loading ...
    </div>
    <div v-else class="">
      <form @submit.prevent="logIn()" 
            method="post" class="login__wrapper">
        <label for="username">User name</label>
        <input type="text" name="username" class="login_input" required
                @focus="clearErrors" v-model="loginInput.email">

        <label for="pass">Password</label>
        <input type="password" name="pass" class="login_input" required
                @focus="clearErrors" v-model="loginInput.password">

        <button type="submit" class="login_btn">
          Log In
        </button>
      </form>
      <p class="err" v-if="getErrors.length != 0">{{ getErrors }}</p>
    </div>
    
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'LogIn',
    
    data() {
      return {
        type: 'login',  
        isLog: false,      
        loginInput: {
          email: '',
          password: ''
        },
        user: {},
        notificationSystem: {
          options: {
            show: {
              theme: "dark",
              icon: "icon-person",
              position: "topCenter",
              progressBarColor: "rgb(0, 255, 184)",
            },
            ballon: {
              balloon: true,
              position: "bottomCenter"
            },
            info: {
              position: "bottomLeft"
            },
            success: {
              position: "center"
            },
            warning: {
              position: "topLeft"
            },
            error: {
              position: "center"
            },
            question: {
              timeout: 20000,
              close: false,
              overlay: true,
              toastOnce: true,
              id: "question",
              zindex: 999,
              position: "center",
            }
          }
        }
      }
    },

    computed: {
      ...mapGetters([ 'getInputType', 
                      'loggedUser', 
                      'getErrors',
                      'isLogged' ]),
    },

    methods: {
      ...mapActions([ 'login', 
                      'logout',
                      'signType',
                      'clearErrors' ]),

      async logIn() {
        this.isLog = true;
        await this.login(this.loginInput);
        if (this.getErrors.length) {
          this.$toast.error('Greška! Pogrešan e-mail ili password ' + this.getErrors, 'OK', this.notificationSystem.options.error);
          this.clearErrors();
        } 
        this.isLog = false;
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

  .err {
    color: var(--red);
  }
</style>