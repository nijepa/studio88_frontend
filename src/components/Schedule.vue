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

          <div class="members__items notclients__container">

            <div class="input__field clients__add_list">
              <label for="date_start">
                Datum pristupa
                <tooltip tip="Izaberi datum dodavanja vježbačice u grupu, zatim je dodaj iz liste" />
              </label>
              <datepicker v-model="selectedDate" 
                        placeholder="datum pristupa" 
                        class="login_input user_input"
                        :language="sr">
              </datepicker>
            </div>
            
            <div class="input__field notclients__list">
              <label for="">Dodaj vježbačicu</label>

              <search-bar :searchStr="search" 
                          :pageSizeNr="pageSize"
                          @changed="setPageSize"
                          @typed="searchClients"
                          class="schedule__search" />

              <p v-for="client in pageOfItems" :key="client._id" name="clients"
                  class="login_input user_input members_input members__not" 
                  @click="addMember(client)">
                {{ client.last_name}}, {{ client.first_name}} 
                <span class="members__span"> - {{ client.mobile }}</span> 
              </p>
            </div>

            <jw-pagination :items="filteredClients" @changePage="onChangePage" 
                          :initialPage="initialPage" :pageSize="pageSize" 
                          :labels="customLabels" :styles="customStyles"
                          class="pagine">
            </jw-pagination>
            
          </div>
        </div>

        <hr>

        <div class="modify_btns">
          <action-buttons toForm='schedules' />
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
  import SearchBar from '@/components/utils/SearchBar.vue';
  import ActionButtons from '@/components/utils/ActionButtons.vue';
  import DeleteButton from '@/components/utils/DeleteButton.vue';
  import Tooltip from '@/components/utils/Tooltip.vue';
  import actionsNotify from '../mixins/actionsNotify';
  import navigation from '../mixins/navigation';
  import navigationSearch from '../mixins/navigationSearch';
  import { customLabels, customStyles } from '@/components/utils/pageNav.js';

  export default {
    name: 'Schedule',

    components: {
      Loading, 
      Datepicker, 
      SearchBar,
      ActionButtons,
      DeleteButton,
      Tooltip
    },

    mixins: [
      actionsNotify,
      navigation,
      navigationSearch
    ],

    watch: {
      pageSize() { 
        this.searchClients();
      }
    },

    data() {
      return {
        enterClient: false,
        sr: sr,
        customLabels,
        customStyles,
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
                      'getClientsPageSize',
                      'getErrors',
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'scheduleAdd', 
                      'scheduleUpdate', 
                      'scheduleDelete',
                      'fetchClients',
                      'fetchClientsPageSize',
                      'formTypeChange',
                      'clearErrors',
                      'setLoadingState' ]),

      setPageSize(val) {
        this.pageSize = val;
        this.fetchClientsPageSize(val);
      },
        
      async searchClients(val = '') {
        await this.initClients();
        let mu = this.notClients.filter(post => {
          return post.first_name.toLowerCase().includes(val.toLowerCase()) || 
                  post.last_name.toLowerCase().includes(val.toLowerCase()) || 
                  post.mobile.includes(val)
        });
        this.filteredClients = mu;
      },

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
          this.filteredClients.splice(this.notClients.findIndex(v => v._id === client._id), 1);
        }
      },

      removeMember(client) {
        this.scheduleInput.members.splice(this.mapMembers().findIndex(v => v._id === client._id), 1);
        this.notClients.push(client);
        //this.filteredClients.push(client);
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
      },

      async initClients() {
        if (this.getOneSchedule._id) {
          this.scheduleInput = this.getOneSchedule;
          this.notClients = this.getAllClients
            .filter((elem) => !this.mapMembers().find(({ _id }) => elem._id === _id));
        } else {
          this.notClients = this.getAllClients;
        }
        this.filteredClients = this.notClients;
        if (this.getClientsPageSize !== 10) this.pageSize = this.getClientsPageSize;
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
      await this.initClients();
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

  .members__items .members__not:nth-child(even) {
    background-color: var(--gold-lighter) !important;
  }

  .clients__add_list {
    margin-top: 1em;
  }

  .schedule__search {
    display: grid;
    margin-bottom: .3em;
  }

  .notclients__container {
    margin-left: .5em;
  }

  .notclients__list {
    justify-items: stretch;
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