<template>
    <form @submit.prevent="addAttendance()" method="post" class="client__activity">
    <!-- <h3>{{ client.name }}</h3> -->
    <h3 class="new_item">{{ title }}</h3>
    <div class="input__att">
      <div class="input__field">
        <label for="name">Godina</label>
        <input type="number" name="name" placeholder="godina" 
                class="login_input user_input" v-model="payment_year">
      </div>
      <div class="input__field">
        <label for="days">Mjesec</label>
        <div class="login_input user_input ">
          <select name="days" id="days" class="" required
                  v-model="payment_month" 
                  :value="payment_month" >
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
        <label for="">Datuma</label>
        <datepicker v-model="payment_date" 
                    placeholder="datum prisustva" 
                    class="login_input user_input"
                    :language="sr"
                    :format="customFormatter">
        </datepicker>
        <!-- <h3 class="weekday">{{ payment_date | formatDate }}</h3> -->
      </div>
      <div class="input__field">
        <label for="att">Plaćeno</label>
        <input type="number" v-model="attData.payment_amount" id="att" class="login_input user_input">
      </div>
      <div class="input__field">
        <label for="napomena">Napomena</label>
        <input type="text" v-model="attData.note" id="napomena" class="login_input user_input" placeholder="Napomena">
      </div>
    </div>
    <div class="modify_btns">
      <action-buttons @canceled="handleCancel" />
      <delete-button @clicked="delClient()" />
    </div>
    </form>
</template>

<script>
  import moment from 'moment';
  import Datepicker from 'vuejs-datepicker';
  import {sr} from 'vuejs-datepicker/dist/locale';
  import ActionButtons from '@/components/utils/ActionButtons.vue';
  import DeleteButton from '@/components/utils/DeleteButton.vue';
  import { mapGetters, mapActions } from 'vuex';
  import actionsNotify from '../mixins/actionsNotify';

  export default {
    name: 'ClientPayment',

    props: ['client', 'clientAtt'],

    components: {
      Datepicker, 
      ActionButtons,
      DeleteButton
    },

    mixins: [
      actionsNotify
    ],

    computed: {
      ...mapGetters([ 'getAllPayments',
                      'getErrors' ]),
    },

    data() {
      return {
        title: 'Novo plaćanje',
        sr: sr,
        attData: {
          payment_amount: 0,
          note: ''
        },
        payment_year: moment(new Date).format('YYYY'),
        payment_month: '',
        payment_date: new Date().toISOString().slice(0,10)
      }
    },

    methods: {
      ...mapActions([ 
        'fetchPayments',
        'clearErrors',
        'paymentAdd', 
        'paymentUpdate', 
        'paymentDelete', 
      ]),

      customFormatter(date) {
        return moment(date).format('DD MMM YYYY');
      },

      handleCancel() {
        this.$emit('canceled', true)
      },

      async addAttendance() {
        const attends = this.getAllPayments
          .find(el => el.payment_year === parseInt(this.payment_year) && el.payment_month === this.payment_month)

        if (!attends) {
          let paymentInput = {
            payment_date: this.payment_date,
            payment_year: this.payment_year,
            payment_month: this.payment_month,
            notes: '',
            members: [
              {
                client: this.client._id,
                payment_date: this.payment_date,
                payment_amount: this.attData.payment_amount,
                note: this.attData.note
              }
            ]
          }
          await this.paymentAdd(paymentInput);
        } else {
          const cli = attends.members.find(x => x.client._id === this.client._id)
          let paymentInput = {}
          if (!cli) {
            paymentInput = {
              _id: attends._id,
              payment_date: attends.payment_date,
              payment_year: attends.payment_year,
              payment_month: attends.payment_month,
              notes: attends.notes,
              members: [
                ...attends.members,
                {
                  client: this.client._id,
                  payment_date: this.payment_date,
                  payment_amount: this.attData.payment_amount,
                  note: this.attData.note
                }
              ]
            }
          } else {
            this.attData.client = this.client
            Object.assign(attends.members[attends.members.findIndex(el => el.client._id === this.client._id)], this.attData)
            paymentInput = attends
          }
          await this.paymentUpdate(paymentInput);
        }
        if (this.getErrors.length) {
          this.$toast.error('Greška! ' + this.getErrors, 'OK', this.notificationSystem.options.error);
          this.clearErrors();
        } else {
          this.$toast.success('Uspješno sačuvano!', 'OK', this.notificationSystem.options.success);
        }
        this.$emit('canceled', true)
      },

      async delEx() {
        const attends = this.getAllPayments
          .find(el => el.payment_year === parseInt(this.payment_year) && el.payment_month === this.payment_month)
        attends.members.splice(attends.members.findIndex(v => v.client._id === this.client._id), 1);
        const paymentInput = attends
        await this.paymentUpdate(paymentInput);
        if (this.getErrors.length) {
          this.$toast.error('Greška! ' + this.getErrors, 'OK', this.notificationSystem.options.error);
          this.clearErrors();
        } else {
          this.$toast.success('Uspješno obrisano!', 'OK', this.notificationSystem.options.success);
        }
        this.$emit('canceled', true)
      },

      checkUpdate() {
        if (this.clientAtt.date) {
          this.attData = this.clientAtt
          this.attData.payment_amount = this.clientAtt.amount
          this.payment_date = this.clientAtt.date
          this.payment_year = this.clientAtt.year
          this.payment_month= this.clientAtt.month
          this.title = 'Izmijeni plaćanje'
        }
      }
    },

    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(value).format("dddd")
        }
      }
    },

    watch: { 
      clientAtt: function() { 
        this.checkUpdate()
      }
    },

    mounted() {
      this.checkUpdate()
    },
  }
</script>

<style>
</style>