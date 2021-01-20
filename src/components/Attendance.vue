<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="schedule__wrapper" key="2">

      <form @submit.prevent="addAttendance()" method="post" class="user__form">

        <div class="input__group ">
          <div class="input__field">
            <label for="datePicker">Datum</label>
            <datepicker v-model="attendanceInput.attend_date" 
                        placeholder="datum upisa" 
                        class="login_input user_input"
                        :language="sr">
            </datepicker>
          </div>
        </div>
        
        <div class="members__list">
          <div class="members__items">

            <div class="">
              <div class="days__list attendance__list_header">
                <span>Vježbačica</span>
                <span>Prisutna</span>
                <span>Napomena</span>
              </div>

              <div v-for="member in pageOfItems" :key="member._id" name="member"
                  class="members_input ">
                <div class="login_input user_input select__month">
                  {{ attendanceInput.members.map(item => item.client._id).indexOf(member.client._id) + 1 }}
                  {{ member.client.last_name }}, {{ member.client.first_name }}
                </div>
                <input type="checkbox" v-model="member.present" class="login_input user_input payment__price">
                <input type="text" v-model="member.note" class="login_input user_input payment__note">
              </div>

            </div>
          </div>
        </div>

        <jw-pagination :items="attendanceInput.members" @changePage="onChangePage" 
                        :initialPage="initialPage" :pageSize="pageSize" 
                        :labels="customLabels" :styles="customStyles"
                        class="pagine">
        </jw-pagination>

        <action-buttons toForm='attendances' />

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
  import { customLabels, customStyles } from '@/components/utils/pageNav.js';

  export default {
    name: 'Attendance',

    components: {
      Loading, 
      Datepicker, 
      ActionButtons
    },

    data() {
      return {
        sr: sr,
        pageOfItems: [],
        initialPage: 1,
        pageSize: 10,
        customLabels,
        customStyles,
        attendanceInput: {
          attend_date: new Date,
          notes: '',
          members: []
        },
        notClients: [],
        selectedDate: new Date,
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
            position: "center"
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
      ...mapGetters([ 'getAllAttendances', 
                      'getOneAttendance',
                      'getAllClients',
                      'getErrors',
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'attendanceAdd', 
                      'attendanceUpdate', 
                      'attendanceDelete',
                      'fetchClients',
                      'formTypeChange',
                      'clearErrors',
                      'setLoadingState' ]),

      onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
      },

      async addAttendance() {
        this.setLoadingState(true);
        if (this.getOneAttendance._id) {
          await this.attendanceUpdate(this.attendanceInput);
        } else {
          await this.attendanceAdd(this.attendanceInput);
        }
        this.setLoadingState(false);
        if (this.getErrors.length) {
          this.$toast.error('Greška! ' + this.getErrors, 'OK', this.notificationSystem.options.error);
          this.clearErrors();
        } else {
          this.$toast.success('Uspješno sačuvano!', 'OK', this.notificationSystem.options.success);
          this.formTypeChange('attendances');
        }
      },

      addAllmembers() {
        for (let i = 0; i < this.getAllClients.filter(active => active.active !== false).length; i++) {
          this.attendanceInput.members.push({
            'client':this.getAllClients.filter(active => active.active !== false)[i], 
            'present':true, 
            'note': ''
          })
        }
        this.notClients = [];
      },

      mapMembers() {
        return this.attendanceInput.members.map(item => {
            let container = {};
            container = item.client;
            return container;
        });
      }
    },

    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('MM/DD/YYYY')
        }
      }
    },

    async mounted() {
      let currentYear = new Date();
      currentYear = moment().format('YYYY');
      this.year = currentYear;
      await this.fetchClients();
      if (this.getOneAttendance._id) {
        this.attendanceInput = this.getOneAttendance;
        this.notClients = this.getAllClients.filter((elem) => !this.mapMembers().find(({ _id }) => elem._id === _id));
      } else {
        this.notClients = this.getAllClients.filter(active => active.active === true);
        this.addAllmembers()
      }
      this.setLoadingState(false);
    },
  }
</script>

<style>
  ::-webkit-input-placeholder { font-size: .8em; }
  ::-moz-placeholder { font-size: .8em; } /* firefox 19+ */
  :-ms-input-placeholder { font-size: .8em; } /* ie */
  input:-moz-placeholder { font-size: .8em; }

  @media only screen and (max-width: 599px) {
    .days__list {
      /* font-size: 80%; */
      grid-template-columns: repeat(2 ,auto) !important; 
    }
    .members_input  {
      grid-template-columns: repeat(2 ,auto) !important;
    }
    .expenses__header {
      grid-template-columns: repeat(3 ,auto) !important;
    }
    .expense__list {
      grid-template-columns: repeat(3 ,auto) !important;
    }
    .clients__list {
      grid-template-columns: repeat(2 ,auto) ;
    }
    .activities__list {
      /* grid-template-columns: repeat(2 ,auto) !important; */
    }
    .activities__wrapper {
      grid-template-columns: auto !important;
    }
    .attend__heading {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    .attend__list {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    .payment__heading {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }

  .schedule__wrapper {
    display: flex;
    justify-content: center;
  }

  .bloc {
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    height: 140px;
  }

  .bloc select {
    padding: 10px;
    margin: -5px -20px -5px -5px;
  }

  .day__select {
    border: none;
    height: 140px;
    font-family: 'Itim', cursive;
  }

  .attendance__list_header {
    grid-template-columns: repeat(3, auto);
  }

  .members__list {
    display: flex;
    text-align: left;
    align-items: baseline;
    font-size: 1em;
  }

  .members_input {
    cursor: pointer;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr repeat(3, auto);
    align-items: center;
    grid-column-gap: 1em;
  }

  .members__items .members_input:nth-child(odd) {
    background-color: var(--purple-lighter);
    border-radius: .5em;
  }

  .memeber__date {
    margin: 0;
  }

  .all__clients_btn {
    cursor: pointer;
    border: 2px solid var(--purple);
    border-radius: .5em;
    padding: .1em;
  }

  .input__payment {
    grid-template-columns: 1fr 1fr ;
  }

  .payment__list {
    justify-items: left;
  }

  .pagine {
    margin: .5em auto !important;
  }

</style>