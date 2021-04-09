<template>
  <transition name="slide" mode="out-in">
    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="lists__wrapper" key="2">
      <form @submit.prevent="addAttendance()" method="post" class="user__form">
        <h3 v-if="!getOneAttendance._id" class="new_item item__header">
          <svg
            version="1.1"
            x="0px"
            y="0px"
            fill="var(--gold)"
            width="30px"
            height="30px"
            viewBox="0 0 1000 1000"
            enable-background="new 0 0 30 30"
            xml:space="preserve"
          >
            <path
              d="M411.3,882.2c-2.8,0.2-4.7,0.5-6.6,0.5c-52.6,0.5-105.1-2.5-157.5-7.5c-38.2-3.7-76.3-7.4-114.2-12.5c-26-3.4-51.7-9.1-77.5-13.9c-11.8-2.2-17.8-10-21-21.2c-7-24.7-8.3-50-6.2-75.4c1.2-15.1,2.8-30.1,5-45.1c3.9-27,20.5-45.2,42.8-59.1c19.2-11.9,41-16.9,62.2-23.5c22.4-7,45.1-13.4,67-21.9c22.4-8.8,42.4-22,57.1-41.9c7.8-10.6,11.8-22.5,11.3-35.8c-0.3-9.4-0.9-18.9-1.9-28.4c-1.2-11.4-6.7-20.7-15.1-28.4c-5.6-5.1-11.1-10.6-17.3-15.1c-13.2-9.6-21.9-22.4-27.7-37.2c-4.2-10.5-7.5-21.3-11.6-31.9c-0.8-2.1-2.6-4.7-4.5-5.5c-11.1-4.5-19-12.7-24.3-22.7c-14.6-28-16.1-55.7,4.5-82.1c1.3-1.7,1.5-4.3,1.7-6.6c1.9-24.7,2.5-49.6,5.8-74.2c3.9-28.7,10.4-57.1,24.4-83c28.3-52.2,71.8-84.4,130-95.2C400.6,3,460.2,13.2,515.7,45.3c31.9,18.4,53.4,45.6,66.9,79.1c13.7,33.9,21,69.4,23.2,105.9c0.7,12.9,1.2,25.9,1.9,38.8c0.1,1.7,0.6,3.9,1.7,4.9c11.5,10.8,15.4,24.6,14.9,39.7c-0.6,16.3-2.6,32.4-12.4,46.4c-5.6,8-12.7,14-21.6,18c-2.1,1-4.3,3.3-5.1,5.5c-3.7,9.6-6.7,19.4-10.3,28.9c-0.8,2.1-2.9,4.3-5,5.1c-43.1,17.9-80.5,44.2-112.7,77.9c-45.6,47.7-75,103.8-85.9,169.1c-12.3,73.9,0.4,143.8,36,209.5C408.6,876.6,409.7,879,411.3,882.2z"
            />
            <path
              d="M695.8,437.1c-152.6,0-276.6,123.8-276.7,276.3C419,866.1,543.2,990.1,696.2,990c152.2-0.1,276.2-123.9,276.4-276.1C972.9,561.2,848.7,437.2,695.8,437.1z M878.3,634.1l-219,221.8c0.2-0.3,0.5-0.6,0.7-0.9c-7.2,7.8-13-0.6-12.7-0.3L503,711.4c-4.7-4.7-4.7-12.4,0-17.2l34.5-35.1c4.7-4.7,12.4-4.7,17.2,0l100,100l172.5-175.9c4.7-4.7,12.3-4.7,16.9,0l33.9,33.9c4.7,4.7,4.7,12.3,0,16.9H878.3z"
            />
          </svg>
          NOVA PRISUSTVA
        </h3>

        <div class="input__group">
          <div class="input__field att_date">
            <label for="datePicker"
              >Datum
              <tooltip
                v-if="!getOneAttendance._id"
                tip="Kad izabereš datum izlistaju se svi aktivni klijenti čije se grupe održavaju tog dana."
              />
            </label>
            <datepicker
              v-model="attendanceInput.attend_date"
              placeholder="datum upisa"
              class="login_input user_input"
              :language="sr"
              @input="selectDate()"
            >
            </datepicker>
            <h3 class="weekday">
              {{ attendanceInput.attend_date | formatDate }}
            </h3>
          </div>

          <div class="att_totals">
            <h4>Ukupno: {{ filteredClients.length }}</h4>
            <h4>Prisustvovalo: {{ presentClients() }}</h4>
          </div>
        </div>

        <div class="members__list">
          <div class="members__items">
            <search-bar
              :searchStr="search"
              :pageSizeNr="pageSize"
              @changed="setPageSize"
              @typed="searchClients"
            />

            <div class="">
              <div class="akcije">
                <tooltip
                  tip="Omogućava dodavanje vježbačica koje nisu u listi, kao i brisanje postojećih iz liste"
                />

                <button
                  @click.prevent="toggleActions()"
                  class="btn__auto btn__auto_toggle"
                >
                  {{ btn_title }}
                </button>

                <transition name="list" mode="out-in">
                  <form
                    v-if="actions"
                    @submit="handleFormSubmit"
                    class="form__auto"
                  >
                    <autocomplete
                      :search="searchClientsAdd"
                      :get-result-value="getResultValue"
                      @submit="handleSubmit"
                      ref="autocomplete"
                      placeholder="traži (ime) vježbačicu koja nije u listi"
                    ></autocomplete>
                    <button type="submit" class="btn__auto btn__auto_submit">
                      <svg
                        version="1.1"
                        id="Layer_1"
                        x="0px"
                        y="0px"
                        height="20px"
                        viewBox="0 0 300.003 300.003"
                        style="fill: var(--purple)"
                      >
                        <path
                          d="M150,0C67.159,0,0.001,67.159,0.001,150c0,82.838,67.157,150.003,149.997,150.003S300.002,232.838,300.002,150
                            C300.002,67.159,232.839,0,150,0z M213.281,166.501h-48.27v50.469c-0.003,8.463-6.863,15.323-15.328,15.323
                            c-8.468,0-15.328-6.86-15.328-15.328v-50.464H87.37c-8.466-0.003-15.323-6.863-15.328-15.328c0-8.463,6.863-15.326,15.328-15.328
                            l46.984,0.003V91.057c0-8.466,6.863-15.328,15.326-15.328c8.468,0,15.331,6.863,15.328,15.328l0.003,44.787l48.265,0.005
                            c8.466-0.005,15.331,6.86,15.328,15.328C228.607,159.643,221.742,166.501,213.281,166.501z"
                        />
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

              <div
                v-for="member in pageOfItems"
                :key="member._id"
                name="member"
                class="members_input att_members"
              >
                <div class="att_member">
                  {{
                    attendanceInput.members
                      .map((item) => item.client._id)
                      .indexOf(member.client._id) + 1
                  }}
                  {{ member.client.last_name }}, {{ member.client.first_name }}
                </div>
                <input
                  type="checkbox"
                  v-model="member.present"
                  class="login_input user_input payment__price check"
                />
                <input
                  type="text"
                  v-model="member.note"
                  class="login_input user_input payment__note"
                />

                <svg
                  v-if="actions"
                  @click="removeClient(member)"
                  class="btn_minus"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  height="20px"
                  viewBox="0 0 300.003 300.003"
                  style="fill: var(--purple)"
                  xml:space="preserve"
                >
                  <path
                    d="M150.001,0c-82.843,0-150,67.159-150,150c0,82.838,67.157,150.003,150,150.003c82.838,0,150-67.165,150-150.003
                        C300.001,67.159,232.838,0,150.001,0z M197.218,166.283H92.41c-8.416,0-15.238-6.821-15.238-15.238s6.821-15.238,15.238-15.238
                        H197.22c8.416,0,15.238,6.821,15.238,15.238S205.634,166.283,197.218,166.283z"
                  />
                </svg>
              </div>
            </div>
          </div>
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

        <div class="modify_btns">
          <action-buttons toForm="attendances" />
          <delete-button @clicked="delClient()" />
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import Datepicker from "vuejs-datepicker";
import { sr } from "vuejs-datepicker/dist/locale";
import Loading from "@/components/utils/Loading.vue";
import SearchBar from "@/components/utils/SearchBar.vue";
import ActionButtons from "@/components/utils/ActionButtons.vue";
import DeleteButton from "@/components/utils/DeleteButton.vue";
import Tooltip from "@/components/utils/Tooltip.vue";
import actionsNotify from "../mixins/actionsNotify";
import navigation from "../mixins/navigation";
import navigationSearch from "../mixins/navigationSearch";
import { customLabels, customStyles } from "@/components/utils/pageNav.js";
import Autocomplete from "@trevoreyre/autocomplete-vue";
//import '@trevoreyre/autocomplete-vue/dist/style.css';

export default {
  name: "Attendance",

  components: {
    Loading,
    Datepicker,
    SearchBar,
    ActionButtons,
    DeleteButton,
    Tooltip,
    Autocomplete,
  },

  mixins: [actionsNotify, navigation, navigationSearch],

  data() {
    return {
      sr: sr,
      customLabels,
      customStyles,
      attendanceInput: {
        attend_date: new Date(),
        notes: "",
        members: [],
      },
      notClients: [],
      actions: false,
      input: "",
      foundClient: {
        _id: "",
        note: "",
        present: true,
      },
      btn_title: "dodatne opcije",
    };
  },

  watch: {
    pageSize() {
      this.searchClients();
    },
  },

  computed: {
    ...mapGetters([
      "getAllAttendances",
      "getOneAttendance",
      "getAllClients",
      "getAllSchedules",
      "getClientsPageSize",
      "getErrors",
      "loadingState",
    ]),
  },

  methods: {
    ...mapActions([
      "attendanceAdd",
      "attendanceUpdate",
      "attendanceDelete",
      "fetchClients",
      "fetchSchedules",
      "fetchClientsPageSize",
      "formTypeChange",
      "clearErrors",
      "setLoadingState",
    ]),

    setPageSize(val) {
      this.pageSize = val;
      this.fetchClientsPageSize(val);
    },

    async searchClients(val = "") {
      await this.initClients();
      let mu = this.attendanceInput.members.filter((post) => {
        return (
          post.client.first_name.toLowerCase().includes(val.toLowerCase()) ||
          post.client.last_name.toLowerCase().includes(val.toLowerCase()) ||
          post.client.mobile.includes(val)
        );
      });
      this.filteredClients = mu;
    },

    toggleActions() {
      this.actions = !this.actions;
      this.btn_title === "dodatne opcije"
        ? (this.btn_title = "sakrij")
        : (this.btn_title = "dodatne opcije");
    },

    searchClientsAdd(input) {
      this.input = input;
      this.submitted = false;
      //if (input.length < 1) { return [] }
      return this.notClients.filter((post) => {
        return post.first_name.toLowerCase().startsWith(input.toLowerCase());
      });
    },

    getResultValue(result) {
      return (
        result.last_name + ", " + result.first_name + " - " + result.mobile
      );
      //return result
    },

    handleSubmit(result) {
      this.submittedResult = result;
      this.foundClient.client = result;
      //if (this.getOneAttendance._id) this.foundClient._id = this.getOneAttendance._id;
      this.foundClient._id = this.foundClient.client._id;
    },

    handleFormSubmit(event) {
      event.preventDefault();
      if (this.foundClient._id) {
        this.attendanceInput.members.unshift(this.foundClient);
        this.notClients.splice(
          this.notClients.findIndex((v) => v._id === this.foundClient._id),
          1
        );
        this.foundClient = {
          _id: "",
          note: "",
          present: true,
        };
        this.input = "";
        this.value = "";
        this.$refs.autocomplete.value = "";
      }
    },

    removeClient(client) {
      this.attendanceInput.members.splice(
        this.filteredClients.findIndex((v) => v._id === client._id),
        1
      );
      this.notClients.push(client.client);
    },

    presentClients() {
      return this.filteredClients.filter((a) => {
        return a.present === true;
      }).length;
    },

    async selectDate() {
      if (!this.getOneAttendance._id) {
        await this.fetchSchedules();
        const selDate = this.attendanceInput.attend_date.getDay();
        const cgDays = [
          "Neđelja",
          "Poneđeljak",
          "Utorak",
          "Srijeda",
          "Četvrtak",
          "Petak",
          "Subota",
        ];
        const cgDay = cgDays[selDate];
        const filteredSchedules = await this.getAllSchedules
          .filter((a) => {
            return a.weekday.includes(cgDay);
          })
          .map((item) => {
            let container = {};
            container = item.members;
            return container;
          });
        const merged = await [].concat.apply([], filteredSchedules);
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
        this.$toast.error(
          "Greška! " + this.getErrors,
          "OK",
          this.notificationSystem.options.error
        );
        this.clearErrors();
      } else {
        this.$toast.success(
          "Uspješno sačuvano!",
          "OK",
          this.notificationSystem.options.success
        );
        //this.formTypeChange("attendances");
        this.$router.push("/attendances");
      }
    },

    async addAllmembers(cli) {
      for (
        let i = 0;
        i < cli.filter((active) => active.client.active !== false).length;
        i++
      ) {
        this.attendanceInput.members.push({
          //'client':this.getAllClients.filter(active => active.active !== false)[i],
          client: cli[i].client,
          present: true,
          note: "",
          _id: cli[i]._id,
        });
      }
      this.attendanceInput.members.sort((a, b) =>
        a.client.last_name.toLowerCase() > b.client.last_name.toLowerCase()
          ? 1
          : -1
      );
      this.initClients();
    },

    mapMembers() {
      return this.attendanceInput.members.map((item) => {
        let container = {};
        container = item.client;
        return container;
      });
    },

    async delEx() {
      await this.attendanceDelete(this.getOneAttendance);
      //this.formTypeChange("attendances");
      this.$router.push("/attendances");
    },

    async initClients() {
      if (this.getOneAttendance._id) {
        this.attendanceInput = this.getOneAttendance;
        this.notClients = this.getAllClients.filter(
          (elem) => !this.mapMembers().find(({ _id }) => elem._id === _id)
        );
        this.filteredClients = this.attendanceInput.members;
      } else {
        this.notClients = await this.getAllClients.filter(
          (elem) => !this.mapMembers().find(({ _id }) => elem._id === _id)
        );
        this.filteredClients = this.attendanceInput.members;
      }
      if (this.getClientsPageSize !== 10)
        this.pageSize = this.getClientsPageSize;
    },
  },

  filters: {
    formatDate: function (value) {
      if (value) {
        return moment(value).format("dddd");
      }
    },
  },

  async mounted() {
    let currentYear = new Date();
    currentYear = moment().format("YYYY");
    this.year = currentYear;
    if (!this.getAllClients.length) await this.fetchClients();
    await this.initClients();
    if (!this.getOneAttendance._id) {
      await this.selectDate();
    }
    this.setLoadingState(false);
  },
};
</script>

<style>
.day__select {
  border: none;
  height: 140px;
  font-family: "Itim", cursive;
}

.attendance__list_header {
  grid-template-columns: repeat(3, auto);
}

.memeber__date {
  margin: 0;
}

.all__clients_btn {
  cursor: pointer;
  border: 2px solid var(--purple);
  border-radius: 0.5em;
  padding: 0.1em;
}

.input__payment {
  grid-template-columns: 1fr 1fr;
}

.att_date {
  align-items: baseline;
}
</style>