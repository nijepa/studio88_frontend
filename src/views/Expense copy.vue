<template>
  <!-- <transition name="fall" mode="out-in"> -->

    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="lists__wrapper" key="2">
      <form @submit.prevent="addExpense()" method="post" class="user__form">
        <h3 v-if="!getOneExpense._id" class="new_item item__header">
          <svg width="30px" height="30px" viewBox="0 0 512 512">
            <path fill="var(--gold)" d="M268.383 22.168l-55.918 84.482 29.717 3.733c-9.22 30.13-11.095 50.878-8.885 92.12 14.138-2.23 25.56-3.025 40.586 1.39-9.877-36.84-8.844-49.427-4.88-89.768l32.622 2.277-33.242-94.234zm218.482 2.21l-108.36 30.03 20.915 25.975c-49.512 31.019-80.331 55.548-104.74 123.164 13.201-.152 28.098 2.921 44.174 9.004 5.728-44.666 33.74-76.14 79.302-108.918l19.983 24.816 48.726-104.07zm-463.574 2.31L89.17 129.173l19.084-28.711c35.554 32.44 58.145 76.33 57.308 107.43 18.568-8.696 29.927-9.527 49.735-3.778-8.105-31.203-43.577-108.722-91.639-129.103l16.57-26.037L23.292 26.687zm276.117 214.667c-5.28.12-10.21 2.415-16.937 9.594l-6.565 6.969-6.812-6.72c-7.387-7.28-13.216-9.29-19.125-9.03-5.908.26-12.855 3.367-20.625 9.656l-6.217 5.03-5.906-5.374c-8.9-8.052-16.485-10.439-23.75-10.064-5.288.274-10.775 2.266-16.25 5.75l40.966 73.69c15.454 9.451 47.034 13.006 68.75 2.062l39.594-73.344c-7.51-3.062-14.26-6.202-20.094-7.406-2.112-.437-4.07-.756-5.968-.813-.354-.01-.71-.008-1.06 0zm-89.97 96.188v.002c-18.035 12.742-32.516 34.717-38.125 66.904-5.435 31.196 3.129 52.266 18.283 66.625 15.155 14.36 37.902 21.736 61 21.436 23.1-.3 46.136-8.31 61.625-22.936 15.49-14.627 24.249-35.425 19.281-65.187-5.137-30.757-18.4-52.148-35.19-65.094-28.482 15.056-64.095 11.856-86.875-1.75z"/>
          </svg>
          NOVI TROŠAK
        </h3>

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

        <div class="modify_btns">
          <action-buttons toForm='expenses' />
          <delete-button @clicked="delClient()" />  
        </div>
        
      </form>
    </div>
  <!-- </transition> -->
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  import Datepicker from 'vuejs-datepicker';
  import {sr} from 'vuejs-datepicker/dist/locale';
  import Loading from '@/components/utils/Loading.vue';
  import ActionButtons from '@/components/utils/ActionButtons.vue';
  import DeleteButton from '@/components/utils/DeleteButton.vue';
  import actionsNotify from '../mixins/actionsNotify';
  import findMonth from '../mixins/findMonth';

  export default {
    name: 'Expense',

    components: {
      Loading, 
      Datepicker, 
      ActionButtons,
      DeleteButton
    },

    mixins: [
      actionsNotify,
      findMonth
    ],

    data() {
      return {
        sr: sr,
        expenseInput: {
          expense_date: new Date,
          expense_month: this.checkMonth(),
          expense_year: moment(new Date).format('YYYY'),
          expense_amount: 0,
          notes: ''
        },
        year: 0,
        selectedDate: new Date,
        isClosed: false,
        appeared: false,
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