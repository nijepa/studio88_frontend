<template>

  <div class="schedule__wrapper">
    <transition name="fall">

 <!--      <div v-if="getSelectedUser._id && this.getSelectedUser._id !== this.loggedUser._id"
            class="user__profile_selected" v-on:load="onAppeared" v-show="appeared">
        <div class="profile__group personal__data">
          <div class="">
          <p>
            <img :src="signupInput.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" 
                class="info__img">
          </p>
          </div>
          <div class="input__group">
            <div class="input__field">
              <span class="info__label">Username : </span>
              <p class="login_input user_input">{{ signupInput.username }}</p>
            </div>
            <div class="input__field">
              <span class="info__label">E-mail : </span>
              <p class="login_input user_input">{{ signupInput.email }}</p>
            </div>
            <div class="input__field">
              <span class="info__label">First name : </span>
              <p class="login_input user_input">{{ signupInput.first_name }}</p>
            </div>
            <div class="input__field">
              <span class="info__label">Last name : </span
              ><p class="login_input user_input">{{ signupInput.last_name }}</p>
            </div>
          </div>
        </div>
        
        <div class="profile__group">
          <div class="">
            <span class="info__label">About : </span>
            <p class="info__input" v-html="signupInput.user_about"></p>
          </div>
        </div>
      
      </div> -->

      <form @submit.prevent="userUpdate(signupInput)" action=""
            v-on:load="onAppeared" v-show="appeared" class="user__form">
<!--         <div class="input__field">
          <img :src="signupInput.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" 
                class="info__img">
        </div> -->
        <div class="input__field signup__field">
          <label for="username">User name</label>
          <input @focus="clearErrors" v-model="signupInput.username"
                  class="login_input user_input"
                  type="text" name="username" id="username" required>
        </div>

        <div class="input__field signup__field">
          <label for="first_name">First name</label>
          <input @focus="clearErrors" v-model="signupInput.first_name"
                  class="login_input user_input"
                  type="text" name="first_name" id="first_name">
        </div>

        <div class="input__field signup__field">
          <label for="last_name">First name</label>
          <input @focus="clearErrors" v-model="signupInput.last_name"
                  class="login_input user_input"
                  type="text" name="last_name" id="last_name">
        </div>

        <div class="input__field signup__field">
          <label for="email">E-mail</label>
          <input @focus="clearErrors" v-model="signupInput.email"
                  class="login_input user_input"
                  type="email" name="email" id="email">
        </div>

        <div class="input__field signup__field">
          <label for="password">Password</label>
          <input @focus="clearErrors" v-model="signupInput.password"
                  class="login_input user_input"
                  type="password" name="password" id="password">
        </div>
<!--         <div class="input__field">
          <label for="about">About</label> -->
     <!--      <ckeditor :editor="editor" v-model="signupInput.user_about" 
                    :config="{ placeholder:'pls enter content'}"
                    @focus="clearErrors" name="about" >
          </ckeditor> -->
<!--           <textarea @focus="clearErrors" v-model="signupInput.user_about"
                    name="about" id="about" rows="5" cols="30"></textarea> -->
        <!-- </div> -->

        <div class="modify_btns">
          <action-buttons toForm='home' />
        </div>

      </form>

    </transition>
  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import ActionButtons from '@/components/utils/ActionButtons.vue';
  //import CKEditor from '@ckeditor/ckeditor5-vue';
  //import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  export default {

    name: 'Profile',

    components: {
      ActionButtons
        //ckeditor:CKEditor.component
    },

    data() {
      return {
        //editor: ClassicEditor,
        signupInput: {
          _id: '',
          email: '',
          password: '',
          username: '',
          first_name: '',
          last_name: '',
          user_about: '',
          picture: ''
        },
        user: {},
        appeared: false
      }
    },

    computed: {
      ...mapGetters([ 'loggedUser',
                      'getSelectedUser',
                      'getErrors' ]),
    },

    methods: {
      ...mapActions([ 'signup',
                      'fetchSelectedUser',
                      'userUpdate',
                      'formTypeChange',
                      'clearErrors' ]),
      
      selectFriends(selectedUser) {
        this.fetchSelectedUser(selectedUser);
        this.$router.push({ name: 'UsersFriends' });
      },

      nrOfFriends(friends) {
        return friends.filter((v) => (v.status === 1)).length;
      },
      
      onAppeared() {
        this.appeared = true;
      }
    },

    created() {
      if (this.getSelectedUser._id && this.getSelectedUser._id !== this.loggedUser._id) {
        this.signupInput = this.getSelectedUser;
      } else {
        this.signupInput = this.loggedUser;
      }
    },

    mounted() {
      this.onAppeared();
    }
  }
</script>

<style>
  .signup__field {
    margin: .5em;
  }
  .user__profile {
    display: grid;
    justify-content: center;
    justify-items: left;
  }

  .user__profile_selected {
    background-image: linear-gradient(to top,var(--orange) 5%, white);
    border-radius: 20px;
    padding: 1rem;
    margin: .5rem;
    box-shadow: 0px 5px 4px 0px rgba(0,0,0,0.75);
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
    margin: .3em;
  }

  .info__input .info__label {
    font-size: .8em;
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

  .fall-enter-active {
    transition: all 1s ease-in-out;
  }

  .fall-enter, .fall-leave-to {
    transform: translateY(-2em);
    opacity: 0;
  }

  .rise-enter-active,
  .rise-leave-active {
    transition: all .5s ease-in-out;
  }

  .rise-enter, .rise-leave-to {
    transform: translateY(-2em);
    opacity: 0;
  }
</style>