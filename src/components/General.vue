<template>

  <div class="schedule__wrapper">
    <transition-group name="fall">

      <form @submit.prevent="changeGeneral()" action="" key="1"
            v-on:load="onAppeared" v-show="appeared" class="user__form generals__form">
<!--         <div class="input__field">
          <img :src="signupInput.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" 
                class="info__img">
        </div> -->
        <div class="generals__container">
          <div class="input__field">
            <label for="title">Naziv firme</label>
            <input @focus="clearErrors" v-model="generalInput.general_title"
                    class="login_input user_input"
                    type="text" name="title" id="title" required>
          </div>

          <div class="input__field">
            <label for="address">Adresa</label>
            <input @focus="clearErrors" v-model="generalInput.general_address"
                    class="login_input user_input"
                    type="text" name="address" id="address">
          </div>

          <div class="input__field">
            <label for="site">Web site</label>
            <input @focus="clearErrors" v-model="generalInput.general_site"
                    class="login_input user_input"
                    type="text" name="site" id="site">
          </div>

          <div class="input__field">
            <label for="email">E-mail</label>
            <input @focus="clearErrors" v-model="generalInput.general_email"
                    class="login_input user_input"
                    type="email" name="email" id="email">
          </div>

          <div class="input__field">
            <label for="mobile">Mobilni</label>
            <input @focus="clearErrors" v-model="generalInput.general_mobile"
                    class="login_input user_input"
                    type="text" name="mobile" id="mobile">
          </div>

          <div class="input__field">
            <label for="instagram">Instagram</label>
            <input @focus="clearErrors" v-model="generalInput.general_instagram"
                    class="login_input user_input"
                    type="text" name="instagram" id="instagram">
          </div>

          <div class="input__field">
            <label for="facebook">Facebook</label>
            <input @focus="clearErrors" v-model="generalInput.general_facebook"
                    class="login_input user_input"
                    type="text" name="facebook" id="facebook">
          </div>

          <div class="input__field">
                <label for="datePicker">Datum osnivanja</label>
                <datepicker v-model="generalInput.general_date" 
                          placeholder="datum upisa" 
                          class="login_input user_input"
                          :language="sr">
                </datepicker>
                <!-- <input type="date" name="date_start" placeholder="datum upisa" required
                        class="login_input user_input memeber__date" id="datePicker" 
                        :value="generalInput.general_date && makeCorrectDate(generalInput.general_date)"
                        @input="generalInput.general_date = $event.target.valueAsDate"> -->
          </div>
        </div>

        <div class="prices">
          <h1>CIJENE</h1>
          <div class="action_btn save__btn price__btn" @click="addNewPrice()">
            <svg version="1.1" id="Layer_1" x="0px" y="0px" height="40px" 
                  viewBox="0 0 497.4 497.4" style="enable-background:new 0 0 497.4 497.4;" xml:space="preserve">
              <path style="fill:var(--purple);" d="M418.149,62.4l-168-9.6c-8-0.8-15.2,2.4-20.8,8L16.549,260c-10.4,10.4-16.8,35.2-6.4,46.4
                l183.2,183.2c10.4,10.4,28,10.4,39.2,0l212.8-212.8c5.6-5.6,8.8-12.8,8-20.8l-9.6-171.2C442.949,71.2,431.749,63.2,418.149,62.4z"/>
              <path style="fill:var(--purple);" d="M418.149,48.8l-168-9.6c-8-0.8-15.2,2.4-20.8,8L16.549,260c-10.4,10.4-10.4,28,0,39.2l176.8,176.8
                c10.4,10.4,28,10.4,39.2,0l212.8-212.8c5.6-5.6,8.8-12.8,8-20.8l-9.6-167.2C442.949,60.8,431.749,49.6,418.149,48.8z"/>
              <path style="fill:var(--purple);" d="M193.349,476c10.4,10.4,28,10.4,39.2,0l212.8-212.8c5.6-5.6,8.8-12.8,8-20.8l-9.6-167.2
                c-0.8-13.6-12-24.8-25.6-25.6l-168-10.4c-8-0.8-15.2,2.4-20.8,8"/>
              <path style="fill:var(--purple);" d="M407.749,129.6c0,24.8-20,58.4-45.6,58.4c-24.8,0-45.6-33.6-45.6-58.4s20-45.6,45.6-45.6
                C387.749,84,407.749,104.8,407.749,129.6z"/>
              <circle style="fill:var(--purple);" cx="362.949" cy="129.6" r="45.6"/>
              <path style="fill:var(--purple);" d="M330.949,97.6c17.6-17.6,46.4-17.6,64,0s17.6,46.4,0,64"/>
              <circle style="fill:#EBF0F2;" cx="362.949" cy="129.6" r="27.2"/>
              <path style="fill:#CADFE5;" d="M382.149,110.4c10.4,10.4,10.4,27.2,0,37.6s-27.2,10.4-37.6,0"/>
              <g>
                <path style="opacity:0.3;fill:var(--purple);enable-background:new    ;" d="M490.149,12.8c3.2-3.2,3.2-7.2,0-10.4l0,0
                  c-3.2-3.2-7.2-3.2-10.4,0l-122.4,122.4c-3.2,3.2-3.2,7.2,0,10.4l0,0c3.2,3.2,12.8,8.8,16,5.6L490.149,12.8z"/>
                <path style="fill:var(--purple);" d="M490.149,12.8c3.2-3.2,3.2-7.2,0-10.4l0,0c-3.2-3.2-7.2-3.2-10.4,0l-122.4,122.4
                  c-3.2,3.2-3.2,7.2,0,10.4l0,0c3.2,3.2,7.2,3.2,10.4,0L490.149,12.8z"/>
              </g>
              <path style="fill:var(--purple);" d="M357.349,135.2L357.349,135.2c3.2,3.2,7.2,3.2,10.4,0l122.4-122.4c3.2-3.2,3.2-7.2,0-10.4l0,0"/>
              <path style="fill:var(--purple-lighter);" d="M338.949,307.2c4.8,4.8,4.8,12,0,16.8l-117.6,117.6c-4.8,4.8-12,4.8-16.8,0L50.949,288
                c-4.8-4.8-4.8-12,0-16.8l117.6-117.6c4.8-4.8,12-4.8,16.8,0L338.949,307.2z"/>
              <path style="fill:var(--purple-light);" d="M338.949,307.2l-121.6-120.8l-20.8,248l8,8c4.8,4.8,12,4.8,16.8,0l117.6-117.6
                C343.749,319.2,343.749,312,338.949,307.2z"/>
            </svg>
            <p>Nova cijena</p> 
          </div>
          <!-- <transition name="fall"> -->
          <div v-for="price in generalInput.prices" :key="price.amount" >
            <div class="input__field">
              <label for="amount">Cijena</label>
              <input @focus="clearErrors" v-model="price.price_amount"
                      class="login_input user_input input__number"
                      type="number" name="amount" id="amount">
            </div>

            <div class="input__field">
              <label for="datePrice">Datum važenja</label>
              <datepicker v-model="price.price_date" 
                          placeholder="datum upisa" 
                          class="login_input user_input"
                          :language="sr">
              </datepicker>
              <!-- <input type="date" name="datePrice" 
                      class="login_input user_input memeber__date" id="datePrice" 
                      :value="price.price_date && makeCorrectDate(price.price_date)"
                      @input="price.price_date = $event.target.valueAsDate"> -->
            </div>

            <div class="input__field for__note">
              <label for="about">Napomena</label>
              <textarea @focus="clearErrors" v-model="price.note" class="login_input user_input"
                        name="about" id="about" rows="1" cols="15">
              </textarea>
            </div>
          </div>
          <!-- </transition> -->
        </div>

        <div class="modify_btns general__btns">
          <action-buttons toForm='home' />
        </div>

      </form>

    </transition-group>
  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import moment from 'moment';
  import Datepicker from 'vuejs-datepicker';
  import {sr} from 'vuejs-datepicker/dist/locale';
  import ActionButtons from '@/components/utils/ActionButtons.vue';

  export default {

    name: 'General',

    components: {
      Datepicker,
      ActionButtons
    },

    data() {
      return {
        sr: sr,
        generalInput: {
          general_email: '',
          general_site: '',
          general_title: '',
          general_address: '',
          general_mobile: '',
          general_date: '',
          general_instagram: '',
          general_facebook: '',
          logo: '',
          prices: []
        },
        general: {},
        selectedDate: new Date().toISOString().slice(0,10),
        appeared: false
      }
    },

    computed: {
      ...mapGetters([ 'getGeneral',
                      'getErrors' ]),
    },

    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('MM/DD/YYYY')
        }
      }
    },

    methods: {
      ...mapActions([ 'fetchGenerals',
                      'generalAdd',
                      'generalUpdate',
                      'createPrice',
                      'formTypeChange',
                      'clearErrors' ]),
      
      addNewPrice() {
        this.generalInput.prices.unshift({
          'price_amount': 0, 
          'price_date': this.selectedDate, 
          'note': ''
        })
      },

      changeGeneral() {
        if (this.getGeneral._id) {
          this.generalUpdate(this.generalInput);
        } else {
          this.generalAdd(this.generalInput);
        }
        this.formTypeChange('home');
      },

      savePrice() {
        const price = {
          price_date: this.price.price_date,
          price_amount: this.price.price_amount,
          note: this.price.note
        }
        this.createPrice(JSON.stringify(price));
      },

      makeCorrectDate(str) {
        return new Date(str).toISOString().split('T')[0]
      },
      
      onAppeared() {
        this.appeared = true;
      }
    },

    async created() {
      await this.fetchGenerals();
      if (this.getGeneral._id) {
        console.log('111')
        this.generalInput = this.getGeneral;
        this.price._id = this.getGeneral._id;
      } else {
        this.addNewPrice()
      }
    },

    mounted() {
      this.onAppeared();
    }
  }
</script>

<style>
  .generals__form {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto); 
  }

  .generals__container {
    padding: .5em;
  }
  
  .prices {
    border-left: 2px solid var(--purple);
    padding: .5em;
    display: grid;
    justify-content: left;
    justify-items: left;
    align-content: baseline;
  }

  .input__number {
    max-width: 5em;
  }

  .general__btns {
    grid-area: 2 / 1 / 3 / 3;
  }

  .price__btn {
    color: var(--purple);
    border-bottom: 2px solid var(--purple);
    margin-bottom: 1em;
  }

  .price__btn:hover {
    color: var(--purple-dark);
    border-bottom: 2px solid var(--purple-dark);
    background: var(--purple-light);
  }

  .for__note {
    margin-top: 1em
  }

  .general__btns {
    grid-area: 2 / 1 / 3 / 3;
  }

  @media (max-width: 599px) {
    .generals__form {
      display: block;
    }
    .prices {
      margin-top: 1em;
    }
  }
</style>