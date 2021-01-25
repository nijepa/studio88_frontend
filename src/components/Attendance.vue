<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="schedule__wrapper" key="2">

      <form @submit.prevent="addAttendance()" method="post" class="user__form">

        <h3 v-if="!getOneAttendance._id" class="new_item">NOVA PRISUSTVA</h3>

        <div class="input__group ">
          <div class="input__field att_date">

            <label for="datePicker">Datum 
              <tooltip  v-if="!getOneAttendance._id" tip="Kad izabereš datum izlistaju se svi aktivni klijenti čije se grupe održavaju tog dana." />
      <!--         <div class="tooltip" v-if="!getOneAttendance._id">
                <svg version="1.1" id="Capa_1" x="0px" y="0px" width="15px"
                    viewBox="0 0 23.625 23.625" style="enable-background:new 0 0 23.625 23.625;" xml:space="preserve">
                  <g>
                    <path style="fill:var(--purple);" d="M11.812,0C5.289,0,0,5.289,0,11.812s5.289,11.813,11.812,11.813s11.813-5.29,11.813-11.813
                      S18.335,0,11.812,0z M14.271,18.307c-0.608,0.24-1.092,0.422-1.455,0.548c-0.362,0.126-0.783,0.189-1.262,0.189
                      c-0.736,0-1.309-0.18-1.717-0.539s-0.611-0.814-0.611-1.367c0-0.215,0.015-0.435,0.045-0.659c0.031-0.224,0.08-0.476,0.147-0.759
                      l0.761-2.688c0.067-0.258,0.125-0.503,0.171-0.731c0.046-0.23,0.068-0.441,0.068-0.633c0-0.342-0.071-0.582-0.212-0.717
                      c-0.143-0.135-0.412-0.201-0.813-0.201c-0.196,0-0.398,0.029-0.605,0.09c-0.205,0.063-0.383,0.12-0.529,0.176l0.201-0.828
                      c0.498-0.203,0.975-0.377,1.43-0.521c0.455-0.146,0.885-0.218,1.29-0.218c0.731,0,1.295,0.178,1.692,0.53
                      c0.395,0.353,0.594,0.812,0.594,1.376c0,0.117-0.014,0.323-0.041,0.617c-0.027,0.295-0.078,0.564-0.152,0.811l-0.757,2.68
                      c-0.062,0.215-0.117,0.461-0.167,0.736c-0.049,0.275-0.073,0.485-0.073,0.626c0,0.356,0.079,0.599,0.239,0.728
                      c0.158,0.129,0.435,0.194,0.827,0.194c0.185,0,0.392-0.033,0.626-0.097c0.232-0.064,0.4-0.121,0.506-0.17L14.271,18.307z
                      M14.137,7.429c-0.353,0.328-0.778,0.492-1.275,0.492c-0.496,0-0.924-0.164-1.28-0.492c-0.354-0.328-0.533-0.727-0.533-1.193
                      c0-0.465,0.18-0.865,0.533-1.196c0.356-0.332,0.784-0.497,1.28-0.497c0.497,0,0.923,0.165,1.275,0.497
                      c0.353,0.331,0.53,0.731,0.53,1.196C14.667,6.703,14.49,7.101,14.137,7.429z"/>
                  </g>
                </svg>
                <span class="tooltiptext">
                  Kad izabereš datum izlistaju se svi aktivni klijenti čije se grupe održavaju tog dana.
                </span>
              </div> -->
            </label>
            <datepicker v-model="attendanceInput.attend_date" 
                        placeholder="datum upisa" 
                        class="login_input user_input"
                        :language="sr"
                        @input="selectDate()">
            </datepicker>
            <h3 class="weekday">{{ attendanceInput.attend_date | formatDate }}</h3>
          </div>

          <div class="att_totals">
            <h4>Ukupno: {{ filteredClients.length }}</h4>
            <h4>Prisustvovalo: {{ presentClients() }}</h4>
          </div>
          
        </div>
        
        <div class="members__list">
          <div class="members__items">

          <search-bar :searchStr="search" 
                      :pageSizeNr="pageSize"
                      @changed="setPageSize"
                      @typed="searchClients" />
   <!--        <div class="clients__ss search_group">
            <div class="search__bar">
              <svg version="1.1" id="Layer_1" x="0px" y="0px" height="30px" viewBox="0 0 297.888 297.888">
                <g>
                  <path class="svg__parts" style="fill:var(--purple);" d="M218.971,187.618c8.659,8.658,8.659,22.695,0,31.354c-8.657,8.658-22.694,8.657-31.352,0
                    l-50.096-50.096c-8.657-8.658-8.659-22.695-0.001-31.353c8.659-8.659,22.696-8.658,31.355,0L218.971,187.618z"/>
                  <circle class="svg__parts" style="fill:var(--purple);" cx="100.697" cy="100.697" r="100.697"/>
                  <circle class="svg__parts" style="fill:var(--purple-light);" cx="100.697" cy="100.697" r="64.794"/>
                  <path class="svg__parts" style="fill:var(--purple);" d="M186.271,233.504c-13.044-13.042-13.044-34.191,0-47.234c13.043-13.044,34.19-13.043,47.234,0
                    l54.6,54.601c13.044,13.043,13.044,34.19,0,47.234c-13.042,13.043-34.19,13.043-47.234,0L186.271,233.504z"/>
                </g>
              </svg>
              <input type="text" name="search" id="search" @keyup="searchClients()"
                      v-model="search" class="login_input search_input" placeholder="traži (ime, prezime, tel.)">
            </div>

            <div class="page__size">
              <label for="days">Prikaži</label>
              <div class="login_input user_input nr_clients">
                <select name="days" id="days" class=""
                        v-model="pageSize" 
                        :value="pageSize" 
                        @change="setPageSize()">
                  <option :value="Number(10)">10</option>
                  <option :value="Number(20)">20</option>
                  <option :value="Number(50)">50</option>
                  <option :value="Number(1000)">sve</option>
                </select>
              </div>
              <label for="days">vježbačica</label>
            </div>
          </div> -->

            <div class="">
              <!-- <div v-if="getOneAttendance._id" class="akcije"> -->
              <div class="akcije">
                <tooltip tip="Omogućava dodavanje vježbačica koje nisu u listi, kao i brisanje postojećih iz liste" />
                <button @click.prevent="toggleActions()" class="btn__auto btn__auto_toggle">dodatne opcije</button>
                <transition name="fail" mode="out-in">
                <form v-if="actions" @submit="handleFormSubmit" class="form__auto">
                  <autocomplete :search="searchClientsAdd"
                                :get-result-value="getResultValue"
                                @submit="handleSubmit"
                                ref="autocomplete"
                                placeholder="traži (ime) vježbačicu koja nije u listi"
                  ></autocomplete>
                  <button type="submit" class="btn__auto btn__auto_submit">
                    <svg version="1.1" id="Layer_1" x="0px" y="0px" height="20px"
                          viewBox="0 0 300.003 300.003" style="fill:var(--purple)" >
                        <path d="M150,0C67.159,0,0.001,67.159,0.001,150c0,82.838,67.157,150.003,149.997,150.003S300.002,232.838,300.002,150
                          C300.002,67.159,232.839,0,150,0z M213.281,166.501h-48.27v50.469c-0.003,8.463-6.863,15.323-15.328,15.323
                          c-8.468,0-15.328-6.86-15.328-15.328v-50.464H87.37c-8.466-0.003-15.323-6.863-15.328-15.328c0-8.463,6.863-15.326,15.328-15.328
                          l46.984,0.003V91.057c0-8.466,6.863-15.328,15.326-15.328c8.468,0,15.331,6.863,15.328,15.328l0.003,44.787l48.265,0.005
                          c8.466-0.005,15.331,6.86,15.328,15.328C228.607,159.643,221.742,166.501,213.281,166.501z"/>
                    </svg>
                  </button>
                </form>
                </transition>
              </div>
              
              <div class="days__list attendance__list_header">
                <span>Vježbačica</span>
                <span>Prisutna</span>
                <span>Napomena</span>
              </div>

              <div v-for="member in pageOfItems" :key="member._id" name="member"
                  class="members_input att_members">
                <div class="att_member">
                  {{ attendanceInput.members.map(item => item.client._id).indexOf(member.client._id) + 1 }}
                  {{ member.client.last_name }}, {{ member.client.first_name }}
                </div>
                <input type="checkbox" v-model="member.present" class="login_input user_input payment__price check">
                <input type="text" v-model="member.note" class="login_input user_input payment__note">

                <svg v-if="actions" @click="removeClient(member)" 
                    class="btn_minus" version="1.1" id="Layer_1" x="0px" y="0px" height="20px"
                    viewBox="0 0 300.003 300.003" style="fill:var(--purple)" xml:space="preserve">
                      <path d="M150.001,0c-82.843,0-150,67.159-150,150c0,82.838,67.157,150.003,150,150.003c82.838,0,150-67.165,150-150.003
                        C300.001,67.159,232.838,0,150.001,0z M197.218,166.283H92.41c-8.416,0-15.238-6.821-15.238-15.238s6.821-15.238,15.238-15.238
                        H197.22c8.416,0,15.238,6.821,15.238,15.238S205.634,166.283,197.218,166.283z"/>
                </svg>

              </div>

            </div>
          </div>
        </div>

        <jw-pagination :items="filteredClients" @changePage="onChangePage" 
                        :initialPage="initialPage" :pageSize="pageSize" 
                        :labels="customLabels" :styles="customStyles"
                        class="pagine">
        </jw-pagination>

        <div class="modify_btns">
          <action-buttons toForm='attendances' />
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
  import Autocomplete from '@trevoreyre/autocomplete-vue';
  //import '@trevoreyre/autocomplete-vue/dist/style.css';

  export default {
    name: 'Attendance',

    components: {
      Loading, 
      Datepicker, 
      SearchBar,
      ActionButtons,
      DeleteButton,
      Tooltip,
      Autocomplete
    },

    mixins: [
      actionsNotify, 
      navigation, 
      navigationSearch
    ],

    data() {
      return {
        sr: sr,
        customLabels,
        customStyles,
        attendanceInput: {
          attend_date: new Date,
          notes: '',
          members: []
        },
        notClients: [],
        actions: false,
        input: '',
        foundClient: {
          _id: '',
          note: '',
          present: true
        }
      }
    },

    watch: {
      pageSize() { 
        this.searchClients();
      }
    },

    computed: {
      ...mapGetters([ 'getAllAttendances', 
                      'getOneAttendance',
                      'getAllClients',
                      'getAllSchedules',
                      'getClientsPageSize',
                      'getErrors',
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'attendanceAdd', 
                      'attendanceUpdate', 
                      'attendanceDelete',
                      'fetchClients',
                      'fetchSchedules',
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
        let mu = this.attendanceInput.members.filter(post => {
          return post.client.first_name.toLowerCase().includes(val.toLowerCase()) || 
                  post.client.last_name.toLowerCase().includes(val.toLowerCase()) || 
                  post.client.mobile.includes(val)
        });
        this.filteredClients = mu;
      },

      toggleActions() {
        this.actions = !this.actions;
      },

      searchClientsAdd(input) {
        this.input = input
        this.submitted = false
        //if (input.length < 1) { return [] }
          return this.notClients.filter(post => {
            return post.first_name.toLowerCase() 
              .startsWith(input.toLowerCase())
          })
      },

      getResultValue(result) {
        return result.last_name + ', ' + result.first_name + ' - ' + result.mobile
        //return result
      },

      handleSubmit(result) {
        this.submittedResult = result;
        this.foundClient.client = result;
        if (this.getOneAttendance._id) this.foundClient._id = this.getOneAttendance._id;
        console.log(result)
        //alert(`You selected ${result}`)
      },

      handleFormSubmit(event) {
        event.preventDefault()
        console.log(event)
        if (this.foundClient._id) {
          this.attendanceInput.members.unshift(this.foundClient);
          this.notClients.splice(this.notClients.findIndex(v => v._id === this.foundClient._id), 1);
          this.foundClient = {
            _id: '',
            note: '',
            present: true
          }
          this.input = '';
          this.value = ''
          this.$refs.autocomplete.value = ''
        }
      },

      removeClient(client) {
        //this.attendanceInput.members.splice(this.filteredClients.findIndex(v => v._id === client._id), 1);
        this.filteredClients.splice(this.filteredClients.findIndex(v => v._id === client._id), 1);
        this.notClients.push(client.client);
      },

      presentClients() {
        return this.filteredClients.filter(a => {
          return a.present === true
        }).length
      },

      async selectDate() {
        if (!this.getOneAttendance._id) {
          await this.fetchSchedules();
          const selDate = this.attendanceInput.attend_date.getDay();
          const cgDays = [
            'Neđelja', 
            'Poneđeljak', 
            'Utorak', 
            'Srijeda', 
            'Četvrtak', 
            'Petak', 
            'Subota'
          ];
          const cgDay = cgDays[selDate];
          const filteredSchedules = this.getAllSchedules.filter((a) => {
            return a.weekday.includes(cgDay)
          }).map(item => {
              let container = {};
              container = item.members;
              return container;
          })
          const merged = [].concat.apply([], filteredSchedules);
          this.attendanceInput.members = [];
          this.filteredClients = [];
          this.addAllmembers(merged);
        }
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

      addAllmembers(cli) {
        for (let i = 0; i < cli.filter(active => active.client.active !== false).length; i++) {
          this.attendanceInput.members.push({
            'client':this.getAllClients.filter(active => active.active !== false)[i], 
            'present':true, 
            'note': ''
          })
        }
        this.filteredClients = this.attendanceInput.members
        //this.notClients = [];
      },

      mapMembers() {
        return this.attendanceInput.members.map(item => {
            let container = {};
            container = item.client;
            return container;
        });
      },

      async delEx() {
        await this.attendanceDelete(this.getOneAttendance);
        this.formTypeChange('attendances');
      },

      async initClients() {
        if (this.getOneAttendance._id) {
          this.attendanceInput = this.getOneAttendance;
          this.notClients = this.getAllClients
            .filter((elem) => !this.mapMembers()
            .find(({ _id }) => elem._id === _id));
          this.filteredClients = this.attendanceInput.members;
        } else {
          await this.selectDate();
          this.notClients = this.getAllClients
            .filter((elem) => !this.mapMembers()
            .find(({ _id }) => elem._id === _id));
        }
        if (this.getClientsPageSize !== 10) this.pageSize = this.getClientsPageSize;
      }
    },

    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(value).format("dddd")
        }
      }
    },

    async mounted() {
      let currentYear = new Date();
      currentYear = moment().format("YYYY");
      this.year = currentYear;
      await this.fetchClients();
      await this.initClients();
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
      grid-template-columns: repeat(2 ,1fr) !important;
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
    .cient__name {
      font-size: 2em;
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
    justify-self: center;
    margin: 0 .5em;
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

  select {
    cursor: pointer;
  }

  .nr_clients {
    margin: 0 .2em;
    padding: 0;
  }

  .att_members {
    cursor: default;
  }

  .att_member {
    margin-left: .3em;
    font-size: 1.2em;
  }

  .check {
    cursor: pointer;
  }

  .att_totals {
    text-align: right;
    border-radius: .5em;
    /* border: 1px solid var(--gold); */
    padding: .2em .3em;
    justify-self: end;
    align-self: baseline;
    margin-top: .5em;
    color: var(--gold-light);
    background-color: var(--purple);
    /* grid-area: 3 / 1 / 4 / 3; */
  }

  .att_date {
    /* display: flex; */
    align-items: baseline;
  }

  .weekday {
    justify-self: left;
    margin-left: .5em;
  }

  .form__auto {
    display: flex;
    align-items: center;
  }

  .autocomplete-input {
    /* border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important; */
    background-color: #ddd;
    border: 2px solid transparent;
    padding: .3em;
    margin: 0;
  }

  .autocomplete-input:hover, .autocomplete-input:focus {
    background-color: white;
    border: 2px solid var(--black);
    border-radius: .3em;
    outline: none;
  }

  .autocomplete-result-list {
    background-color: var(--white);
    color: var(--purple-dark);
    padding: .3em;
    margin: 0;
    border-bottom-left-radius: .3em;
    border-bottom-right-radius: .3em;
    list-style: none;
    cursor: pointer;
  }

  .autocomplete-result-list li {
    padding: .3em;
    border-radius: .3em;
  }

  .btn__auto {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid #ddd;
    padding: 0 16px;
    line-height: 1;
    background: #ddd;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    font-weight: normal;
    letter-spacing: .5px;
    text-transform: uppercase;
    margin: .3em 0;
  }

  .btn__auto:hover {
    outline: none;
    border-color: #ccc;
    background: #ccc;
  }

  .btn__auto:hover svg {
    fill: var(--gold) !important;
  }

  .btn__auto_toggle {
    border-radius: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: .7em;
    margin-left: .2em;
  }

  .btn__auto_submit {
    padding: .4em;
  }

  .btn_minus {
    cursor: pointer;
    margin-right: .2em;
  }

  .btn_minus:hover {
    fill: var(--gold) !important;
  }


pre {
/*   position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  overflow: auto; */
  /* padding: 24px; */
}

.akcije {
  display: flex;
  align-items: center;
}

</style>