<template>
  <div class="hello">

    <div class="club__title">

      <img src="../assets/img/studio881.png" alt="" class="responsive">
<!--       <h1 class="club">{{ msg }} </h1>
      <p class="club__type">p i l a t e s</p> -->
      <div class="club__login">
        <transition name="slide-fade" mode="out-in">
          <p class="club__link" v-if="!loginForm" @click="toggleLoginForm" 
              href="#" target="_blank" rel="noopener">
            Log In
          </p>
          <log-in v-else></log-in>
        </transition>
      </div>
      
    </div>
  </div>
</template>

<script>
  import LogIn from '@/components/LogIn.vue';
  
  export default {
    name: "HelloWorld",

    props: {
      msg: String
    },

    components: {
      LogIn
    },

    data() {
      return {
        loginForm: false
      }
    },

    methods: {
      toggleLoginForm() {
        this.loginForm = true;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .responsive {
    width: 100%;
    height: auto;
  }

  .club__title {
    display: grid;
    justify-items: end;
    align-content: center;
  }

  .club {
    font-family: 'Baloo Tamma 2', cursive;
    font-size: 8em;
    font-weight: 800;
    margin-bottom: 0;
    line-height: .6;
  }

  .club__type {
    font-family: 'Itim', cursive;
    font-weight: 900;
    font-size: 4em;
    color: var(--purple-light);
    margin: 0;
    line-height: 1;
  }

  .club__login {
    display: grid;
    justify-self: baseline;
    height: 350px;
    margin-left: 2em;
  }

  .club__link {
    font-family: 'Baloo Tamma 2', cursive;
    color: var(--purple);
    justify-self: baseline;
    align-self: baseline;
    font-size: 1.5em;
    font-weight: 900;
    font-stretch: condensed;
    margin-top: 3em;
    padding: 0;
    text-decoration: underline;
    display: inline-block;
    line-height: 0.9;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: ease .8s all;
  }

  .club__link:hover {
    color: var(--purple-dark);
    text-decoration: none;
    border-bottom: 3px solid var(--purple-light);
    transform: scale(1.05);
  }

  h3 {
    margin: 40px 0 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: var(--purple-dark);
    
  }
  a:hover {
    color: var(--purple);
  }

  .slide-fade-enter-active, .slide-fade-leave-active  {
    transition: all .8s ease;
  }
  
/*  .slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}  */

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }

  @media (max-width: 550px) {
    .club {
      font-size: 5em;
    }
    .club__type {
      font-size: 2em;
    }
  }
</style>
