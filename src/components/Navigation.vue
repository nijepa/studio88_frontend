<template>
  <transition name="rise" mode="out-in">
    <div class="" key="1">
      <div class="user__logged">
        <router-link
          to="/general"
          tag="a"
          aria-label="General"
          class="profile__link"
          >Profil</router-link
        >
        &#10022;
        <router-link
          to="/signup"
          tag="a"
          aria-label="Sign Up"
          class="user__link"
          >{{ loggedUser.name }}</router-link
        >
        &#10022;
        <a
          @click="logout(loggedUser)"
          href="#"
          class="user__logout"
          aria-label="Log Out"
          >Log Out</a
        >
      </div>

      <div class="nav-mobile">
        <img
          v-if="!showMenu"
          src="../assets/img/studio881.png"
          alt="studio88"
          class="logo-nav"
        />

        <button
          @click="showMenu = !showMenu"
          class="nav-toggle"
          aria-label="nav toggle"
        >
          <svg
            v-if="!showMenu"
            width="44px"
            height="44px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="var(--purple)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg v-if="showMenu" width="44px" height="44px" viewBox="0 0 24 24">
            <rect
              width="24"
              height="24"
              transform="rotate(180 12 12)"
              opacity="0"
            />
            <path
              stroke="var(--purple)"
              d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
            />
          </svg>
        </button>
      </div>

      <transition name="rise" mode="in-out">
        <nav v-if="showMenu">
          <router-link
            to="/summaries"
            aria-label="Home"
            class="dashboard__btn"
            @click.native="navClick('home')"
            :class="
              activeLink === 'home' ? 'home__btn' : 'dashboard__btn_hover'
            "
          >
            <img
              src="../assets/img/studio881.png"
              alt="studio88 logo"
              class="logo__small"
              rel="preload"
            />
          </router-link>
          <router-link
            to="/clients"
            aria-label="Clients"
            class="dashboard__btn"
            @click.native="navClick('clients')"
            :class="
              activeLink === 'clients' ? 'active__link' : 'dashboard__btn_hover'
            "
          >
            <img src="../assets/img/1.png" alt="vježbačice" class="nav__img" />
            <p>Vježbačice</p>
          </router-link>
          <router-link
            to="/schedules"
            aria-label="Schedules"
            class="dashboard__btn"
            @click.native="navClick('schedules')"
            :class="
              activeLink === 'schedules'
                ? 'active__link'
                : 'dashboard__btn_hover'
            "
          >
            <img src="../assets/img/2.png" alt="termini" class="nav__img" />
            <p>Termini</p>
          </router-link>
          <router-link
            to="/attendances"
            aria-label="Attendances"
            class="dashboard__btn"
            @click.native="navClick('attendances')"
            :class="
              activeLink === 'attendances'
                ? 'active__link'
                : 'dashboard__btn_hover'
            "
          >
            <img src="../assets/img/3.png" alt="evidencije" class="nav__img" />
            <p>Evidencije</p>
          </router-link>
          <router-link
            to="/payments"
            aria-label="Payments"
            class="dashboard__btn"
            @click.native="navClick('payments')"
            :class="
              activeLink === 'payments'
                ? 'active__link'
                : 'dashboard__btn_hover'
            "
          >
            <img src="../assets/img/4.png" alt="plaćanja" class="nav__img" />
            <p>Plaćanja</p>
          </router-link>
          <router-link
            to="/expenses"
            aria-label="Expenses"
            class="dashboard__btn"
            @click.native="navClick('expenses')"
            :class="
              activeLink === 'expenses'
                ? 'active__link'
                : 'dashboard__btn_hover'
            "
          >
            <img src="../assets/img/5.png" alt="troškovi" class="nav__img" />
            <p>Troškovi</p>
          </router-link>
        </nav>
      </transition>
      <hr />
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navigation",

  props: {
    method: { type: Function },
  },

  data() {
    return {
      showMenu: true,
      window: {
        width: 0,
      },
      activeLink: "home",
      menuItems: [
        { id: "home", title: "home" },
        { id: "signup", title: "signup" },
        { id: "clients", title: "clients" },
        { id: "schedules", title: "schedules" },
        { id: "attendance", title: "attendance" },
        { id: "payments", title: "payments" },
        { id: "expenses", title: "expenses" },
        { id: "general", title: "general" },
      ],
    };
  },

  computed: {
    ...mapGetters([
      "loggedUser", 
      "getGeneral", 
      "getFormType"
    ]),
  },

  methods: {
    ...mapActions([
      "initialState",
      "logout",
      "fetchGenerals",
      "setLoadingState",
    ]),

    navClick(type) {
      //this.setLoadingState(true);
      this.activeLink = type;
      if (this.window.width < 600) this.showMenu = false;
    },

    toggleUser(type) {
      this.$emit("toggled-form", type);
    },

    handleResize() {
      this.window.width = window.innerWidth;
      this.window.width < 600
        ? (this.showMenu = false)
        : (this.showMenu = true);
    },
  },

  async created() {
    await this.fetchGenerals();
    let price;
    if (this.getGeneral) {
      price = this.getGeneral.prices[0].price_amount;
    }
    this.initialState(price);
    this.navClick("home");
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },

  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style>

</style>