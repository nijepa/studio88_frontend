<template>
    <form @submit.prevent="addAttendance()" method="post" class="client__activity">
    <!-- <h3>{{ client.name }}</h3> -->
    <h3 class="new_item">{{ title }}</h3>
    <div class="input__att">
      <div class="input__field">
        <label for="">Datuma</label>
        <datepicker v-model="attend_date" 
                    placeholder="datum prisustva" 
                    class="login_input user_input"
                    :language="sr"
                    :format="customFormatter">
        </datepicker>
        <h3 class="weekday">{{ attend_date | formatDate }}</h3>
      </div>
      <div class="input__field">
        <label for="att">Prisutna</label>
        <input type="checkbox" v-model="attData.present" id="att" class="login_input user_input">
      </div>
      <div class="input__field">
        <label for="napomena">Napomena</label>
        <input type="text" v-model="attData.note" id="napomena" class="login_input user_input" placeholder="Napomena">
      </div>
    </div>
    <div class="modify_btns">
      <action-buttons @canceled="handleCancel" />
      <delete-button v-if="clientAtt.date" @clicked="delClient()" />
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
    name: 'ClientAttendance',

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
      ...mapGetters([ 'getAllAttendances',
                      'getAllPayments',
                      'getErrors' ]),
    },

    data() {
      return {
        title: 'Novo prisustvo',
        sr: sr,
        attData: {
          present: false,
          note: ''
        },
        attend_date: new Date().toISOString().slice(0,10)
      }
    },

    methods: {
      ...mapActions([ 
        'fetchAttendances',
        'fetchPayments',
        'formTypeChange',
        'clearErrors',
        'attendanceAdd', 
        'attendanceUpdate', 
        'attendanceDelete', 
      ]),

      customFormatter(date) {
        return moment(date).format('DD MMM YYYY');
      },

      handleCancel() {
        this.$emit('canceled', true)
      },

      async addAttendance() {
        //await this.fetchAttendances()
        const attends = this.getAllAttendances
          .find(el => moment(el.attend_date).format('YYYY-MM-DD') === moment(this.attend_date).format('YYYY-MM-DD'))

        if (!attends) {
          let attendanceInput = {
            attend_date: this.attend_date,
            notes: '',
            members: [
              {
                client: this.client._id,
                present: this.attData.present,
                note: this.attData.note
              }
            ]
          }
          await this.attendanceAdd(attendanceInput);
        } else {
          const cli = attends.members.find(x => x.client._id === this.client._id)
          let attendanceInput = {}
          if (!cli) {
            attendanceInput = {
              _id: attends._id,
              attend_date: attends.attend_date,
              notes: attends.notes,
              members: [
                ...attends.members,
                {
                  client: this.client,
                  present: this.attData.present,
                  note: this.attData.note
                }
              ]
            }
          } else {
            this.attData.client = this.client
            Object.assign(attends.members[attends.members.findIndex(el => el.client._id === this.client._id)], this.attData)
            attendanceInput = attends
          }
          await this.attendanceUpdate(attendanceInput);
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
        const attends = this.getAllAttendances
          .find(el => moment(el.attend_date).format('YYYY-MM-DD') === moment(this.attend_date).format('YYYY-MM-DD'))
        attends.members.splice(attends.members.findIndex(v => v.client._id === this.client._id), 1);
        const attendanceInput = attends
        await this.attendanceUpdate(attendanceInput);
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
          this.attend_date = this.clientAtt.date
          this.title = 'Izmijeni prisustvo'
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
  .client__activity {
    display: grid;
    /* justify-content: center; */
    align-items: center;
    justify-self: stretch;
    margin: .5em;
    /* padding: .5em; */
    border-radius: 1em;
    border: 2px solid var(--purple-dark);
  }
  .input__att {
    display: grid;
    justify-self: stretch;
    justify-content: center;
    row-gap: 1em;
  }
</style>