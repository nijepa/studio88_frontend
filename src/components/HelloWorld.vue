<template>
  <div class="hello">
    <div class="club__title">
      <img
        src="../assets/img/studio88.png"
        alt="studio 88"
        class="responsive"
        rel="preload"
      />
      <!--       <h1 class="club">{{ msg }} </h1>
      <p class="club__type">p i l a t e s</p> -->
      <div class="club__login">
        <transition name="slide-fade" mode="out-in">
          <p
            class="club__link"
            v-if="!loginForm"
            @click="toggleLoginForm"
            href="#"
            target="_blank"
            rel="noopener"
          >
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
  name: 'HelloWorld',

  props: {
    msg: String,
  },

  components: {
    LogIn,
  },

  data() {
    return {
      loginForm: false,
    };
  },

  methods: {
    toggleLoginForm() {
      this.loginForm = true;
    },
  },
};
</script>

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

/*   .club {
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
  } */

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
  transition: ease 0.8s all;
}

.club__link:hover {
  color: var(--purple-dark);
  text-decoration: none;
  border-bottom: 3px solid var(--purple-light);
  transform: scale(1.05);
}

/* .slide-fade-enter-active,
.slide-fade-leave-active {
  width: inherit;
  transition: all 0.5s ease;
}*/

/*  .slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}  */

/* .slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
} */

.slide-fade-enter-active {
  width: inherit;
  transition: all 0.4s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-in-out;
}

.slide-fade-enter {
  transform: translateX(-2em);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(2em);
  opacity: 0;
}

/*   @media (max-width: 550px) {
    .club {
      font-size: 5em;
    }
    .club__type {
      font-size: 2em;
    }
  } */
</style>
