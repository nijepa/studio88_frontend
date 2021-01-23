<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="schedule__wrapper" key="2">
      <form @submit.prevent="addExpense()" method="post" class="user__form">
        <h3 v-if="!getOneExpense._id" class="new_item">NOVI TROŠAK</h3>

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
  </transition>
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

  export default {
    name: 'Expense',

    components: {
      Loading, 
      Datepicker, 
      ActionButtons,
      DeleteButton
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
  .new_item {
    justify-self: stretch;
    margin: 0 0 .5em 0;
    padding: 0;
    color: var( --gold);
    border-top-left-radius: .7em;
    border-top-right-radius: .7em;
    border: 1px solid var(--purple-light);
    background: var(--purple-lightest);
  }

  .modify_btns {
    justify-self: stretch;
    margin: 0.5em 0 0 0;
    padding: .2em;
    border-bottom-left-radius: .9em;
    border-bottom-right-radius: .9em;
    border: 1px solid var(--purple-light);
    display: grid;
    background: var(--purple-lightest);
  }
</style>