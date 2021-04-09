<template>
  <div class="d">

    <Loading pic="loading1" v-if="isLog" key="1" />
    
    <div v-else >
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
  import Loading from '@/components/utils/Loading.vue';

  export default {
    name: 'LogIn',

    components: {
      Loading
    },
    
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
            error: {
              position: "center"
            },
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