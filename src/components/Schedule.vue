<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="schedule__wrapper" key="2">

      <form @submit.prevent="addSchedule()" method="post" class="user__form">

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

        <action-buttons toForm='schedules' />

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

  export default {
    name: 'Schedule',

    components: {
      Loading, Datepicker, ActionButtons
    },

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
        notificationSystem: {
        options: {
          show: {
            theme: "dark",
            icon: "icon-person",
            position: "topCenter",
            progressBarColor: "rgb(0, 255, 184)",
            /* buttons: [
              [
                "<button>Ok</button>",
                function(instance, toast) {
                  alert("Hello world!");
                },
                true
              ],
              [
                "<button>Close</button>",
                function(instance, toast) {
                  instance.hide(
                    {
                      transitionOut: "fadeOutUp",
                      onClosing: function(instance, toast, closedBy) {
                        console.info("closedBy: " + closedBy);
                      }
                    },
                    toast,
                    "buttonName"
                  );
                }
              ]
            ],
            onOpening: function(instance, toast) {
              console.info("callback abriu!");
            },
            onClosing: function(instance, toast, closedBy) {
              console.info("closedBy: " + closedBy);
            } */
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
            position: "topRight"
          },
          question: {
            timeout: 20000,
            close: false,
            overlay: true,
            toastOnce: true,
            id: "question",
            zindex: 999,
            position: "center",
            /* buttons: [
              [
                "<button><b>YES</b></button>",
                function(instance, toast) {
                  instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                },
                true
              ],
              [
                "<button>NO</button>",
                function(instance, toast) {
                  instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                }
              ]
            ],
            onClosing: function(instance, toast, closedBy) {
              console.info("Closing | closedBy: " + closedBy);
            },
            onClosed: function(instance, toast, closedBy) {
              console.info("Closed | closedBy: " + closedBy);
            } */
          }
        }
      }
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

 /*  .members__items {
    margin-right: 1em;
  } */

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