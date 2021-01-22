<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="schedule__wrapper" key="2">
      <form @submit.prevent="addExpense()" method="post" class="user__form">

        <div class="input__group ">
          <div class="input__field">
            <label for="name">Godina</label>
            <input type="number" name="name" placeholder="godina" 
                    class="login_input user_input" v-model="expenseInput.expense_year">
          </div>

          <div class="input__field">
            <label for="days">Mjesec</label>
            <div class="login_input user_input ">
              <select name="days" id="days"  class="" required
                      v-model="expenseInput.expense_month" 
                      :value="expenseInput.expense_month" >
                <option value="Januar">Januar</option>
                <option value="Februar">Februar</option>
                <option value="Mart">Mart</option>
                <option value="April">April</option>
                <option value="Maj">Maj</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Avgust">Avgust</option>
                <option value="Septembar">Septembar</option>
                <option value="Oktobar">Oktobar</option>
                <option value="Novembar">Novembar</option>
                <option value="Decembar">Decembar</option>
              </select>
            </div>
          </div>

          <div class="input__field">
            <label for="title">Naziv troška</label>
            <input type="text" name="title" placeholder="naziv troška" required
                    class="login_input user_input" v-model="expenseInput.expense_title">
          </div>

          <div class="input__field">
            <label for="name">Datum</label>
            <datepicker v-model="expenseInput.expense_date" 
                        placeholder="datum pristupa" 
                        class="login_input user_input"
                        :language="sr">
            </datepicker>
          </div>

          <div class="input__field">
            <label for="price">Iznos</label>
            <input type="number" id="price" placeholder="iznos" value="0" required
                    class="login_input user_input" v-model="expenseInput.expense_amount">
          </div>

          <div class="input__field">
            <label for="notes">Napomene</label>
            <textarea name="notes" id="notes" cols="20" rows="5" placeholder="napomene"
                      class="login_input user_input" v-model="expenseInput.notes">
            </textarea>
          </div>
        </div>

        <action-buttons toForm='expenses' />

        <button type="submit" @click.prevent="delClient()"
                class="action_btn delete__btn">
          <svg version="1.1" id="Layer_1" x="0px" y="0px" height="25px" 
              viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <rect x="114.402" y="220.724" style="fill:#CEE8FA;" width="274.813" height="276.96"/>
            <g>
              <path style="fill:var(--red-dark);" d="M182.746,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313
                c7.905,0,14.313,6.409,14.313,14.313v91.604C197.06,415.895,190.652,422.305,182.746,422.305z"/>
              <path style="fill:var(--red-dark);" d="M251.808,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313
                c7.905,0,14.313,6.409,14.313,14.313v91.604C266.121,415.895,259.713,422.305,251.808,422.305z"/>
              <path style="fill:var(--red-dark);" d="M320.869,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313
                c7.905,0,14.313,6.409,14.313,14.313v91.604C335.182,415.895,328.774,422.305,320.869,422.305z"/>
              <path style="fill:var(--red-dark);" d="M434.571,135.961c-8.435-13.251-21.524-22.423-36.856-25.828
                c-7.712-1.722-15.362,3.152-17.076,10.869c-1.713,7.718,3.153,15.361,10.869,17.076c7.869,1.749,14.585,6.455,18.913,13.255
                c4.328,6.8,5.75,14.879,4.002,22.748l-7.423,33.418L99.603,139.224l7.423-33.42c3.608-16.243,19.754-26.519,36.002-22.917
                l145.2,32.249c7.713,1.713,15.361-3.153,17.076-10.869c1.713-7.718-3.153-15.361-10.869-17.076l-82.44-18.309l8.327-37.493
                l122.96,27.308l-11.431,51.467c-1.713,7.718,3.153,15.361,10.869,17.076c1.045,0.232,2.088,0.344,3.116,0.344
                c6.563,0,12.478-4.542,13.96-11.213l14.534-65.44c0.823-3.706,0.14-7.587-1.898-10.789c-2.038-3.202-5.266-5.463-8.972-6.286
                L212.555,0.342c-7.713-1.709-15.362,3.152-17.076,10.869l-11.43,51.466l-34.815-7.732C117.579,47.909,86.11,67.948,79.079,99.6
                l-10.526,47.391c-1.713,7.718,3.153,15.361,10.869,17.076l190.666,42.347H114.402c-7.905,0-14.313,6.409-14.313,14.313v276.96
                c0,7.904,6.408,14.313,14.313,14.313h274.81c7.905,0,14.313-6.409,14.313-14.313V236.049l11.243,2.498
                c1.026,0.229,2.067,0.341,3.103,0.341c2.701,0,5.37-0.764,7.686-2.239c3.202-2.038,5.463-5.266,6.288-8.972l10.526-47.391
                C445.776,164.954,443.006,149.212,434.571,135.961z M374.9,483.374H128.716V235.04H374.9V483.374z"/>
            </g>
          </svg>
          <p>Obriši</p>
        </button>

      </form>
    </div>
  </transition>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  import Datepicker from 'vuejs-datepicker';
  import {sr} from 'vuejs-datepicker/dist/locale';
  import Loading from '@/components/utils/Loading.vue';
  import ActionButtons from '@/components/utils/ActionButtons.vue';
  import actionsNotify from '../mixins/actionsNotify';

  export default {
    name: 'Expense',

    components: {
      Loading, 
      Datepicker, 
      ActionButtons
    },

    mixins: [actionsNotify],

    data() {
      return {
        sr: sr,
        expenseInput: {
          expense_date: new Date,
          expense_month: '',
          expense_year: moment(new Date).format('YYYY'),
          expense_amount: 0,
          notes: ''
        },
        year: 0,
        selectedDate: new Date,
        isClosed: false,
        appeared: false,
/*         notificationSystem: {
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
              timeout: 0,
              close: false,
              overlay: true,
              toastOnce: true,
              id: "question",
              zindex: 999,
              position: "center",
              buttons: [
                [
                  `<button><b>DA</b></button>`,
                  (instance, toast) => {
                    instance.hide(
                    {
                      transitionOut: "fadeOut",
                      onClosing: async (instance, toast, closedBy) => {
                        console.info("closedBy: " + closedBy);
                        await this.delEx()
                      }
                    },
                    toast,
                    true
                  );
                  }
                ],
                [
                  "<button>NE</button>",
                  (instance, toast) => {
                    instance.hide(
                    {
                      transitionOut: "fadeOutUp",
                      onClosed: function(instance, toast, closedBy) {
                        console.info("closedBy: " + closedBy);
                      }
                    },
                    toast,
                    false
                  );
                  }
                ]
              ],
              onClosing: function(instance, toast, closedBy) {
                console.info("Closing | closedBy: " + closedBy);
              },
              onClosed: function(instance, toast, closedBy) {
                console.info("Closed | closedBy: " + closedBy);
              }
            }
          }
        } */
      }
    },

    computed: {
      ...mapGetters([ 'getAllExpenses', 
                      'getOneExpense',
                      'getErrors',
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'expenseAdd', 
                      'expenseUpdate', 
                      'expenseDelete',
                      'fetchExpenses',
                      'formTypeChange',
                      'clearErrors',
                      'setLoadingState' ]),

      async addExpense() {
        this.setLoadingState(true);
        if (this.getOneExpense._id) {
          await this.expenseUpdate(this.expenseInput);
        } else {
          await this.expenseAdd(this.expenseInput);
        }
        this.setLoadingState(false);
        if (this.getErrors.length) {
          this.$toast.error('Greška! ' + this.getErrors, 'OK', this.notificationSystem.options.error);
          this.clearErrors();
        } else {
          this.$toast.success('Uspješno sačuvano!', 'OK', this.notificationSystem.options.success);
          this.formTypeChange('expenses');
        }
      },

/*       delClient() {
        this.$toast.question('Sigurna ?', 'Brisanje', this.notificationSystem.options.question)
      }, */

      async delEx() {
        await this.expenseDelete(this.getOneExpense);
        this.formTypeChange('expenses');
      }
    },

    async mounted() {
      let currentYear = new Date();
      currentYear = moment().format('YYYY');
      this.year = currentYear;
      if (this.getOneExpense._id) {
        this.expenseInput = this.getOneExpense;
      } 
      this.setLoadingState(false);
    },
  }
</script>

<style>
</style>