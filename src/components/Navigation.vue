<template>
  <transition name="rise" mode="out-in">

    <div class="" key="1">

      <div class="user__logged">
        <a @click="navClick('general')" href="#" class="profile__link">Profil</a> &#10022; 
        <a @click="navClick('signup')" href="#" class="user__link">{{loggedUser.name}}</a> &#10022;
        <a @click="logout(loggedUser)" href="#" class="user__logout">Log Out</a>
      </div>

      <div class="nav-mobile">
        <img v-if="!showMenu" src="../assets/img/studio881.png" alt="" class="logo-nav">

        <button @click="showMenu = !showMenu" class="nav-toggle">
          <svg v-if="!showMenu" width="44px" height="44px" viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20M4 12H20M4 17H20" stroke="var(--purple)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-if="showMenu" width="44px" height="44px" viewBox="0 0 24 24">
            <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
            <path stroke="var(--purple)" d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
          </svg>
        </button>
      </div>
      
      <transition name="rise" mode="in-out">
        <nav v-if="showMenu" >

          <button class="dashboard__btn" @click="navClick('home')" 
                  :class="activeLink === 'home' ? 'home__btn' : 'dashboard__btn_hover'">
            <img src="../assets/img/studio881.png" alt="" class="logo__small">
            <!-- <p>Početna</p>  -->
          </button>

          <button class="dashboard__btn" @click="navClick('clients')" 
                  :class="activeLink === 'clients' ? 'active__link' : 'dashboard__btn_hover'">
            <img src="../assets/img/1.png" alt="" class="nav__img">
            <p>Vježbačice</p> 
          </button>

          <button class="dashboard__btn" @click="navClick('schedules')"
                  :class="activeLink === 'schedules' ? 'active__link' : 'dashboard__btn_hover'">
            <img src="../assets/img/2.png" alt="" class="nav__img">
            <p>Termini</p>
          </button>

          <button class="dashboard__btn" @click="navClick('attendances')"
                  :class="activeLink === 'attendances' ? 'active__link' : 'dashboard__btn_hover'">
            <img src="../assets/img/3.png" alt="" class="nav__img">
            <p>Evidencija</p>
          </button>

          <button class="dashboard__btn" @click="navClick('payments')"
                  :class="activeLink === 'payments' ? 'active__link' : 'dashboard__btn_hover'">
            <img src="../assets/img/4.png" alt="" class="nav__img">
            <p>Plaćanja</p>
          </button>

          <button class="dashboard__btn" @click="navClick('expenses')"
                  :class="activeLink === 'expenses' ? 'active__link' : 'dashboard__btn_hover'">
            <img src="../assets/img/5.png" alt="" class="nav__img">
            <p>Troškovi</p>
          </button>

        </nav>
      </transition>
      <hr>

    </div>
  </transition>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Navigation',

    props: {
      method: { type: Function },
    },

    data() {
      return {
        showMenu: true,
        window: {
          width: 0
        },
        activeLink: 'home',
        menuItems: [{id: 'home', title: 'home'},
                    {id: 'signup', title: 'signup'},
                    {id: 'clients', title: 'clients'},
                    {id: 'schedules', title: 'schedules'},
                    {id: 'attendance', title: 'attendance'},
                    {id: 'payments', title: 'payments'},
                    {id: 'expenses', title: 'expenses'},
                    {id: 'general', title: 'general'}]
      }
    },
    
    computed: {
      ...mapGetters([ 'loggedUser',
                      'getGeneral',
                      'getFormType' ]),
    },

    methods: {
      ...mapActions([ 'initialState',
                      'logout',
                      'formTypeChange',
                      'fetchGenerals',
                      'setLoadingState' ]),

      navClick(type) {
        this.setLoadingState(true);
        this.activeLink = type;
        this.formTypeChange(type);
        if (this.window.width < 600) this.showMenu = false
      },

      toggleUser(type) {
        this.$emit('toggled-form', type);
      },

      handleResize() {
        this.window.width = window.innerWidth;
        (this.window.width < 600) ? this.showMenu = false : this.showMenu = true
      }
    },

    async created() {
      await this.fetchGenerals();
      let price;
      if (this.getGeneral) {
        price = this.getGeneral.prices[0].price_amount
      }
      this.initialState(price);
      this.navClick('home');
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },

    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    }
  }
</script>

<style>
  .active__link {
    color: var(--gold-light) !important; 
    background-image: linear-gradient(to bottom, white, var(--purple) 80%) !important;
    cursor: none !important;
    transform: scale(1.05);
  }
  
  button:focus {
    outline: none;
  }
  nav {
    display: grid;
    grid-template-columns: repeat(6, auto);
    justify-content: center;
  }

  .nav__img {
    max-width: 30px;
  }

  .nav__img_home {
    height: 50px;
  }

  .home__btn {
    display: block !important;
  }

  .dashboard__btn {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 1em;
    align-items: center;
    padding: .5em;
    margin-right: 1em;
    margin-top: 1em;
    cursor: pointer;
    color: var(--purple);
    font-family: 'Itim', cursive;
    font-variant: small-caps;
    font-size: 1.2em;
    font-weight: 800;
    background-image: linear-gradient(to bottom, white,  var(--purple-light) 80%);
    border: 2px solid transparent;
    border-radius: 1em;
    transition: ease .8s all;
  }

  .dashboard__btn_hover:hover {
    color: var(--purple-dark);
    border: 2px solid var(--purple-dark);
    transform: scale(.95);
  }

  hr {
    margin: .4em;
    border: 0;
    height: 2px;
    background-image: linear-gradient(to right, rgba(98, 18, 105, 0), rgba(116, 21, 153, 0.75), rgba(98, 19, 134, 0));
  }

  .user__logged {
    margin-top: 1em;
  }

  .user__logout {
    color: var(--red-dark);
  }

  .user__logout:hover {
    color: var(--red);
  }

  .logo__small {
    height: 70px;
  }

  .home__btn {
    color: white !important; 
    background-image: linear-gradient(to bottom, white,  var(--gold) ) !important;
    cursor: none !important;
    transform: scale(1.05);
  }

  .user__link {
    color: var(--gold);
  }

  .user__link:hover {
    color: var(--gold-light);
  }

  .profile__link {
    color: var(--purple);
  }

  .profile__link:hover {
    color: var(--purple-light);
  }

  .nav-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1em;
  }

  .nav-toggle {
    display: none;
    margin: 0 auto;
    padding: 0;
    transition: all .5s ease;
    background: transparent;
    /* width: 65px; */
    height: 75px;
    border: none;
    cursor: pointer;
  }

  .nav-toggle:hover {
    transform: rotate(90deg);
  }

  .nav-toggle:active {
    transform: rotate(90deg);
  }

  .logo-nav {
    width: 120px;
  }

  @media (max-width: 1078px) {
    nav {
      grid-template-columns: repeat(3, auto);
    }
  }

  @media (max-width: 728px) {
    .dash__wrapper {
      grid-template-columns: auto !important;
    }
  }

  @media (max-width: 599px) {
    nav {
      grid-template-columns: repeat(2, auto);
    }
    
    .nav-toggle {
      display: block;
    }
  }
</style>