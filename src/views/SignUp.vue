<template>
  <div class="lists__wrapper">
    <transition name="fall" mode="out-in">
      <form
        @submit.prevent="userUpdate(signupInput)"
        action=""
        v-on:load="onAppeared"
        v-show="appeared"
        class="user__form"
      >
        <!--         <div class="input__field">
          <img :src="signupInput.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" 
                class="info__img">
        </div> -->
        <div class="input__field signup__field">
          <label for="username">User name</label>
          <input
            @focus="clearErrors"
            v-model="signupInput.username"
            class="login_input user_input"
            type="text"
            name="username"
            id="username"
            required
          />
        </div>

        <div class="input__field signup__field">
          <label for="first_name">First name</label>
          <input
            @focus="clearErrors"
            v-model="signupInput.first_name"
            class="login_input user_input"
            type="text"
            name="first_name"
            id="first_name"
          />
        </div>

        <div class="input__field signup__field">
          <label for="last_name">First name</label>
          <input
            @focus="clearErrors"
            v-model="signupInput.last_name"
            class="login_input user_input"
            type="text"
            name="last_name"
            id="last_name"
          />
        </div>

        <div class="input__field signup__field">
          <label for="email">E-mail</label>
          <input
            @focus="clearErrors"
            v-model="signupInput.email"
            class="login_input user_input"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div class="input__field signup__field">
          <label for="password">Password</label>
          <input
            @focus="clearErrors"
            v-model="signupInput.password"
            class="login_input user_input"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <div class="modify_btns">
          <action-buttons toForm="summaries" />
        </div>
      </form>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ActionButtons from '@/components/utils/ActionButtons.vue';

export default {
  name: 'Profile',

  components: {
    ActionButtons,
  },

  data() {
    return {
      signupInput: {
        _id: '',
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        user_about: '',
        picture: '',
      },
      user: {},
      appeared: false,
    };
  },

  computed: {
    ...mapGetters(['loggedUser', 'getSelectedUser', 'getErrors']),
  },

  methods: {
    ...mapActions(['signup', 'fetchSelectedUser', 'userUpdate', 'clearErrors']),

    selectFriends(selectedUser) {
      this.fetchSelectedUser(selectedUser);
      this.$router.push({ name: 'UsersFriends' });
    },

    nrOfFriends(friends) {
      return friends.filter((v) => v.status === 1).length;
    },

    onAppeared() {
      this.appeared = true;
    },
  },

  created() {
    if (
      this.getSelectedUser._id &&
      this.getSelectedUser._id !== this.loggedUser._id
    ) {
      this.signupInput = this.getSelectedUser;
    } else {
      this.signupInput = this.loggedUser;
    }
  },

  mounted() {
    this.onAppeared();
  },
};
</script>

<style>
.signup__field {
  margin: 0.5em;
}

.user__profile {
  display: grid;
  justify-content: center;
  justify-items: left;
}

.user__profile_selected {
  background-image: linear-gradient(to top, var(--orange) 5%, white);
  border-radius: 20px;
  padding: 1rem;
  margin: 0.5rem;
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.75);
  text-align: left;
  grid-template-columns: auto auto;
  align-items: center;
  justify-items: center;
  grid-column-gap: 1em;
}

.profile__group {
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  justify-items: center;
}

.personal__data {
  grid-template-columns: 1fr 3fr;
}

.info__input {
  font-size: 1.3em;
  justify-self: left;
  align-self: baseline;
  margin: 0.3em;
}

.info__input .info__label {
  font-size: 0.8em;
}

.info__label {
  color: var(--blue-dark);
  font-style: italic;
}

.info__img {
  justify-self: left;
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.info__friends {
  cursor: pointer;
  justify-self: left;
  color: var(--blue);
  align-self: baseline;
  font-size: 2em;
}

.info__friends:hover {
  color: black;
  text-decoration: underline;
}
</style>
