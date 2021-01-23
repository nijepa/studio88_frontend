<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="schedule__wrapper" key="2">

      <form @submit.prevent="addSchedule()" method="post" class="user__form">

        <h3 v-if="!getOneSchedule._id" class="new_item">NOVI TERMIN/GRUPA</h3>

        <div class="input__group">

          <div class="input__field">
            <label for="name">Naziv</label>
            <input type="text" name="name" placeholder="ime termina (npr. I)" required
                    class="login_input user_input" v-model="scheduleInput.title">
          </div>

          <div class="input__field dani">
            <label for="day">Dani treninga</label>
            <div v-for="day in days" :key="day.id">
              <label for="dan" class="dan">{{day}}</label>
              <input id="dan" type="checkbox" class="dan_input"
                      v-model="scheduleInput.weekday" 
                      :value="day"/>
            </div>
          </div>

        </div>
        
        <div class="input__group">

          <div class="input__field">
            <label for="time">Vrijeme početka</label>
            <input type="time" name="time" placeholder="vreme održavanja termina (npr. 10:00:AM)"
                    class="login_input user_input" v-model="scheduleInput.startTime" required>
          </div>

          <div class="input__field">
            <label for="duration">Trajanje u minutima</label>
            <input type="number" name="duration" placeholder="trajanje termina u min. (npr. 60)"
                    class="login_input user_input" v-model="scheduleInput.duration" value="60">
          </div>

        </div>
        
        <div class="members__list">

          <div class="members__items">
            <label for="members">Vježbačice u grupi</label>
            <p v-for="member in scheduleInput.members" :key="member._id" name="member"
                class="login_input user_input members_input" @click="removeMember(member.client)">
                {{ scheduleInput.members.map(item => item.client._id).indexOf(member.client._id) + 1 }}
                {{ member.client.last_name }}, {{ member.client.first_name }} 
              <span class="members__span"> - {{ member.start_date | formatDate }}</span> 
            </p>
          </div>

          <div class="members__items">

            <div class="input__field clients__add_list">
              <label for="date_start">Datum pristupa</label>
              <datepicker v-model="selectedDate" 
                        placeholder="datum pristupa" 
                        class="login_input user_input"
                        :language="sr">
              </datepicker>
            </div>
            
            <div class="input__field ">
              <label for="">Dodaj vežbačicu</label>
              <p v-for="client in notClients" :key="client._id" name="clients"
                  class="login_input user_input members_input members__not" 
                  @click="addMember(client)">
                {{ client.last_name}}, {{ client.first_name}} 
                <span class="members__span"> - {{ client.mobile }}</span> 
              </p>
            </div>
            
          </div>
        </div>

        <hr>

        <div class="modify_btns">
          <action-buttons toForm='schedules' />

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
  import actionsNotify from '../mixins/actionsNotify';

  export default {
    name: 'Schedule',

    components: {
      Loading, 
      Datepicker, 
      ActionButtons
    },

    mixins: [actionsNotify],

    data() {
      return {
        enterClient: false,
        sr: sr,
        scheduleInput: {
          title: '',
          weekday: [],
          startTime: '',
          duration: 60,
          notes: '',
          members: []
        },
        days: [
            'Poneđeljak',
            'Utorak',
            'Srijeda',
            'Četvrtak',
            'Petak',
            'Subota'
        ],
        notClients: [],
        selectedDate: new Date().toISOString().slice(0,10),
        appeared: false,
      }
    },

    computed: {
      ...mapGetters([ 'getAllSchedules', 
                      'getOneSchedule',
                      'getAllClients',
                      'getErrors',
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'scheduleAdd', 
                      'scheduleUpdate', 
                      'scheduleDelete',
                      'fetchClients',
                      'formTypeChange',
                      'clearErrors',
                      'setLoadingState' ]),

      async addSchedule() {
        this.setLoadingState(true);
        if (this.getOneSchedule._id) {
          await this.scheduleUpdate(this.scheduleInput);
        } else {
          await this.scheduleAdd(this.scheduleInput);
        }
        this.setLoadingState(false);
        if (this.getErrors.length) {
          this.$toast.error('Greška! ' + this.getErrors, 'OK', this.notificationSystem.options.error)
          this.clearErrors();
        } else {
          this.$toast.success('Uspješno sačuvano!', 'OK', this.notificationSystem.options.success)
          this.formTypeChange('schedules');
        }
      },

      addMember(client) {
        let member = this.scheduleInput.members.find(x => x.client._id === client._id);
        if (!member ) {
          this.scheduleInput.members.push({'client':client, 'start_date':this.selectedDate});
          this.notClients.splice(this.notClients.findIndex(v => v._id === client._id), 1);
        }
      },

      removeMember(client) {
        this.scheduleInput.members.splice(this.mapMembers().findIndex(v => v._id === client._id), 1);
        this.notClients.push(client);
      },

      async delEx() {
        await this.scheduleDelete(this.getOneSchedule);
        this.formTypeChange('schedules');
      },

      mapMembers() {
        return this.scheduleInput.members.map(item => {
            let container = {};
            container = item.client;
            return container;
        });
      }
    },

    filters: {
      formatDate: function(value) {
        if (value) {
          moment.locale('sr');
          return moment(String(value)).format('DD MMM YYYY')
        }
      }
    },

    async created() {
      await this.fetchClients();
      if (this.getOneSchedule._id) {
        this.scheduleInput = this.getOneSchedule;
        this.notClients = this.getAllClients.filter((elem) => !this.mapMembers().find(({ _id }) => elem._id === _id));
      } else {
        this.notClients = this.getAllClients;
      }
      this.setLoadingState(false);
    },
  }
</script>

<style>
  .dani {
    margin-bottom: 1em;
  }

  .dan {
    font-size: 1.3em;
    color: var(--black);
    cursor: pointer;
  }

  .dan_input {
    cursor: pointer;
  }

  .members_input {
    grid-template-columns: auto 1fr;
    align-items: baseline;
  }

  .members__span {
    justify-self: end;
    font-size: .7em;
  }

  .members__not {
    font-size: 1em;
  }

  .clients__add_list {
    margin-top: 1em;
  }

  @media (max-width: 599px) {
    .input__group {
      grid-template-columns: auto !important;
      justify-content: left;
      
    }
    .members__list {
      display: grid !important;
      justify-content: center;
    }
  }
</style>