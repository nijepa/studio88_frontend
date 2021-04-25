<template>
  <!-- <transition name="fall" mode="out-in"> -->
  <loading pic="loading" v-if="loadingState" key="1" />

  <div v-else class="lists__wrapper" key="2">
    <form @submit.prevent="addSchedule()" method="post" class="user__form">
      <h3 v-if="!getOneSchedule._id" class="new_item item__header">
        <svg
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          width="30px"
          height="30px"
          fill="var(--gold)"
          viewBox="0 0 489.2 489.2"
          style="enable-background: new 0 0 489.2 489.2"
          xml:space="preserve"
        >
          <path
            d="M177.8,238.1c0,4.5-3.6,8.1-8.1,8.1h-30.4c-4.5,0-8.1-3.6-8.1-8.1v-30.4c0-4.5,3.6-8.1,8.1-8.1h30.4
              c4.5,0,8.1,3.6,8.1,8.1V238.1z M241.3,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4
              c4.5,0,8.1-3.6,8.1-8.1V207.8z M304.8,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4
              c4.5,0,8.1-3.6,8.1-8.1V207.8z M177.8,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4
              c4.5,0,8.1-3.6,8.1-8.1V269.6z M241.3,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4
              c4.5,0,8.1-3.6,8.1-8.1V269.6z M296.7,261.5h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1
              v-30.4C304.8,265.1,301.2,261.5,296.7,261.5z M106.1,323.3H75.8c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4
              c4.5,0,8.1-3.6,8.1-8.1v-30.4C114.3,326.9,110.6,323.3,106.1,323.3z M114.3,269.6c0-4.5-3.6-8.1-8.1-8.1H75.8
              c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1V269.6z M233.2,323.3h-30.4c-4.5,0-8.1,3.6-8.1,8.1
              v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C241.3,326.9,237.7,323.3,233.2,323.3z M169.7,323.3h-30.4
              c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C177.8,326.9,174.2,323.3,169.7,323.3z
              M360.2,246.3c4.5,0,8.1-3.6,8.1-8.1v-30.4c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1H360.2
              z M47.7,435.9h230.7c-3.7-11.6-5.8-24-5.9-36.8H47.7c-6,0-10.8-4.9-10.8-10.8V171h361.7v101.1c12.8,0.1,25.2,2,36.8,5.7V94.9
              c0-26.3-21.4-47.7-47.7-47.7h-53.4V17.8c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H163V17.8
              c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H47.7C21.4,47.3,0,68.7,0,95v293.3C0,414.5,21.4,435.9,47.7,435.9
              z M489.2,397.7c0,50.3-40.8,91.1-91.1,91.1S307,448,307,397.7s40.8-91.1,91.1-91.1S489.2,347.4,489.2,397.7z M444.1,374.1
              c0-2.9-1.1-5.7-3.2-7.7c-4.3-4.3-11.2-4.3-15.5,0L385.8,406l-15.2-15.2c-4.3-4.3-11.2-4.3-15.5,0c-2.1,2.1-3.2,4.8-3.2,7.7
              c0,2.9,1.1,5.7,3.2,7.7l22.9,22.9c4.3,4.3,11.2,4.3,15.5,0l47.3-47.3C443,379.8,444.1,377,444.1,374.1z"
          />
        </svg>
        NOVI TERMIN/GRUPA
      </h3>

      <div class="input__group">
        <div class="input__field">
          <label for="name">Naziv</label>
          <input
            type="text"
            name="name"
            placeholder="ime termina (npr. I)"
            required
            class="login_input user_input"
            v-model="scheduleInput.title"
          />
        </div>

        <div class="input__field dani">
          <div v-for="day in days" :key="day.id">
            <CheckboxCustom
              :checkClass="'dan'"
              :label="day"
              :modelValue="scheduleInput.weekday"
              :value="day"
              :checkId="'dan' + day"
              v-model="scheduleInput.weekday"
            />
          </div>
        </div>
      </div>

      <div class="input__group schedule__times">
        <div class="input__field">
          <label for="time">Vrijeme početka</label>
          <input
            type="time"
            name="time"
            placeholder="vreme održavanja termina (npr. 10:00:AM)"
            class="login_input user_input"
            v-model="scheduleInput.startTime"
            required
          />
        </div>

        <div class="input__field">
          <label for="duration">Trajanje u minutima</label>
          <input
            type="number"
            name="duration"
            placeholder="trajanje termina u min. (npr. 60)"
            class="login_input user_input"
            v-model="scheduleInput.duration"
            value="60"
          />
        </div>
      </div>

      <div class="members__list">
        <div class="members__items members__selected">
          <label for="members">Vježbačice u grupi</label>
          <p v-if="!scheduleInput.members.length" class="no__members">
            NEMA. Dodaj iz liste
          </p>
          <p
            v-else
            v-for="member in scheduleInput.members"
            :key="member._id"
            name="member"
            class="login_input user_input members_input"
            @click="removeMember(member.client)"
          >
            {{
              scheduleInput.members
                .map((item) => item.client._id)
                .indexOf(member.client._id) + 1
            }}
            {{ member.client.last_name }}, {{ member.client.first_name }}
            <span class="members__span">
              - {{ member.start_date | formatDate }}</span
            >
          </p>
        </div>

        <div class="members__items notclients__container">
          <div class="input__field clients__add_list">
            <label for="date_start">
              Datum pristupa
              <tooltip
                tip="Izaberi datum dodavanja vježbačice u grupu, zatim je dodaj iz liste"
              />
            </label>
            <datepicker
              v-model="selectedDate"
              placeholder="datum pristupa"
              class="login_input user_input"
              :language="sr"
            >
            </datepicker>
          </div>

          <div class="input__field notclients__list">
            <label for="">Dodaj vježbačicu</label>

            <search-bar
              :searchStr="search"
              :pageSizeNr="pageSize"
              @changed="setPageSize"
              @typed="searchItems"
              class="schedule__search"
            />

            <p
              v-for="client in pageOfItems"
              :key="client._id"
              name="clients"
              class="login_input user_input members_input members__not"
              @click="addMember(client)"
            >
              {{ client.last_name }}, {{ client.first_name }}
              <span class="members__span"> - {{ client.mobile }}</span>
            </p>
          </div>

          <jw-pagination
            :items="filteredClients"
            @changePage="onChangePage"
            :initialPage="initialPage"
            :pageSize="pageSize"
            :labels="customLabels"
            :styles="customStyles"
            class="pagine"
          >
          </jw-pagination>
        </div>
      </div>

      <hr />

      <div class="modify_btns">
        <action-buttons toForm="schedules" />
        <delete-button @clicked="delClient()" />
      </div>
    </form>
  </div>
  <!-- </transition> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loading from '@/components/utils/Loading.vue';
import { customLabels, customStyles } from '@/components/utils/pageNav.js';
import SearchBar from '@/components/utils/SearchBar.vue';
import ActionButtons from '@/components/utils/ActionButtons.vue';
import DeleteButton from '@/components/utils/DeleteButton.vue';
import CheckboxCustom from '@/components/utils/CheckboxCustom.vue';
import Tooltip from '@/components/utils/Tooltip.vue';
import actionsNotify from '@/mixins/actionsNotify';
import navigation from '@/mixins/navigation';
import navigationSearch from '@/mixins/navigationSearch';
import searchClients from '@/mixins/searchClients';
import Datepicker from 'vuejs-datepicker';
import { sr } from 'vuejs-datepicker/dist/locale';
import dayjs from 'dayjs';
import srb from 'dayjs/locale/sr';

dayjs.locale(srb);

export default {
  name: 'Schedule',

  components: {
    Loading,
    Datepicker,
    SearchBar,
    ActionButtons,
    DeleteButton,
    Tooltip,
    CheckboxCustom,
  },

  mixins: [actionsNotify, navigation, navigationSearch, searchClients],

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
        members: [],
      },
      days: ['Poneđeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'],
      notClients: [],
      selectedDate: new Date().toISOString().slice(0, 10),
      appeared: false,
    };
  },

  computed: {
    ...mapGetters([
      'getAllSchedules',
      'getOneSchedule',
      'getAllClients',
      'getClientsPageSize',
      'getErrors',
      'loadingState',
    ]),
  },

  methods: {
    ...mapActions([
      'scheduleAdd',
      'scheduleUpdate',
      'scheduleDelete',
      'fetchClients',
      'fetchClientsPageSize',
      'fetchSchedules',
      'clearErrors',
      'setLoadingState',
    ]),

    async addSchedule() {
      this.setLoadingState(true);
      if (this.getOneSchedule._id) {
        await this.scheduleUpdate(this.scheduleInput);
      } else {
        await this.scheduleAdd(this.scheduleInput);
      }
      await this.fetchSchedules();
      this.setLoadingState(false);
      if (this.getErrors.length) {
        this.$toast.error(
          'Greška! ' + this.getErrors,
          'OK',
          this.notificationSystem.options.error
        );
        this.clearErrors();
      } else {
        this.$toast.success(
          'Uspješno sačuvano!',
          'OK',
          this.notificationSystem.options.success
        );
        this.$router.push('/schedules');
      }
    },

    addMember(client) {
      let member = this.scheduleInput.members.find(
        (x) => x.client._id === client._id
      );
      if (!member) {
        this.scheduleInput.members.push({
          client: client,
          start_date: this.selectedDate,
        });
        this.notClients.splice(
          this.notClients.findIndex((v) => v._id === client._id),
          1
        );
        /* this.filteredClients.splice(
          this.notClients.findIndex((v) => v._id === client._id),
          1
        ); */
      }
    },

    removeMember(client) {
      this.scheduleInput.members.splice(
        this.mapMembers().findIndex((v) => v._id === client._id),
        1
      );
      this.notClients.push(client);
    },

    async delEx() {
      await this.scheduleDelete(this.getOneSchedule);
      this.$toast.success(
        'Uspješno obrisano!',
        'OK',
        this.notificationSystem.options.success
      );
      this.$router.push('/schedules');
    },

    mapMembers() {
      return this.scheduleInput.members.map((item) => {
        let container = {};
        container = item.client;
        return container;
      });
    },

    async searchItems(val = '') {
      await this.initItems();
      let mu = this.notClients.filter((post) => {
        return (
          post.first_name.toLowerCase().includes(val.toLowerCase()) ||
          post.last_name.toLowerCase().includes(val.toLowerCase()) ||
          post.mobile.includes(val)
        );
      });
      this.filteredClients = mu;
    },

    async initItems() {
      if (this.getOneSchedule._id) {
        this.scheduleInput = this.getOneSchedule;
        this.notClients = this.getAllClients.filter(
          (elem) => !this.mapMembers().find(({ _id }) => elem._id === _id)
        );
      } else {
        this.notClients = this.getAllClients;
      }
      this.filteredClients = this.notClients;
      if (this.getClientsPageSize !== 10)
        this.pageSize = this.getClientsPageSize;
    },
  },

  async mounted() {
    if (!this.getAllClients.length) await this.fetchClients();
    await this.initItems();
    this.setLoadingState(false);
  },

  async destroyed() {
    await this.fetchClients();
  },
};
</script>

<style>
.schedule__times {
  margin: 0.5em 0;
}

.members__selected {
  min-width: 15em;
}

.no__members {
  color: var(--red);
}
</style>
