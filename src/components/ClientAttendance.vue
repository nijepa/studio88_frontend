<template>
  <form
    @submit.prevent="addAttendance()"
    method="post"
    class="client__activity"
  >
    <!-- <h3>{{ client.name }}</h3> -->
    <h3 class="new_item item__header">
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
      {{ title }}
    </h3>
    <div class="input__att">
      <div class="input__field">
        <label for="">Datuma</label>
        <datepicker
          v-model="attend_date"
          placeholder="datum prisustva"
          class="login_input user_input"
          :language="sr"
          :format="customFormatter"
        >
        </datepicker>
        <h3 class="weekday">{{ attend_date | formatDay }}</h3>
      </div>
      <div class="input__field">
        <label for="att">Prisutna</label>
        <input
          type="checkbox"
          v-model="attData.present"
          id="att"
          class="login_input user_input"
        />
      </div>
      <div class="input__field">
        <label for="napomena">Napomena</label>
        <input
          type="text"
          v-model="attData.note"
          id="napomena"
          class="login_input user_input"
          placeholder="Napomena"
        />
      </div>
    </div>
    <div class="modify_btns">
      <action-buttons @canceled="handleCancel" />
      <delete-button v-if="clientAtt.date" @clicked="delClient()" />
    </div>
  </form>
</template>

<script>
//import moment from "moment";
import Datepicker from "vuejs-datepicker";
import { sr } from "vuejs-datepicker/dist/locale";
import ActionButtons from "@/components/utils/ActionButtons.vue";
import DeleteButton from "@/components/utils/DeleteButton.vue";
import { mapGetters, mapActions } from "vuex";
import actionsNotify from "../mixins/actionsNotify";
import dayjs from "dayjs";
import srb from "dayjs/locale/sr";

dayjs.locale(srb);

export default {
  name: "ClientAttendance",

  props: ["client", "clientAtt"],

  components: {
    Datepicker,
    ActionButtons,
    DeleteButton,
  },

  mixins: [actionsNotify],

  computed: {
    ...mapGetters(["getAllAttendances", "getAllPayments", "getErrors"]),
  },

  data() {
    return {
      title: "Novo prisustvo",
      sr: sr,
      attData: {
        present: true,
        note: "",
      },
      attend_date: new Date().toISOString().slice(0, 10),
    };
  },

  methods: {
    ...mapActions([
      "fetchAttendances",
      "fetchPayments",
      "clearErrors",
      "attendanceAdd",
      "attendanceUpdate",
      "attendanceDelete",
    ]),

    customFormatter(date) {
      return dayjs(date).format("DD MMM YYYY");
    },

    handleCancel() {
      this.$emit("canceled", true);
    },

    async addAttendance() {
      //await this.fetchAttendances()
      const attends = this.getAllAttendances.find(
        (el) =>
          dayjs(el.attend_date).format("YYYY-MM-DD") ===
          dayjs(this.attend_date).format("YYYY-MM-DD")
      );

      if (!attends) {
        let attendanceInput = {
          attend_date: this.attend_date,
          notes: "",
          members: [
            {
              client: this.client._id,
              present: this.attData.present,
              note: this.attData.note,
            },
          ],
        };
        await this.attendanceAdd(attendanceInput);
      } else {
        const cli = attends.members.find(
          (x) => x.client._id === this.client._id
        );
        let attendanceInput = {};
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
                note: this.attData.note,
              },
            ],
          };
        } else {
          this.attData.client = this.client;
          Object.assign(
            attends.members[
              attends.members.findIndex(
                (el) => el.client._id === this.client._id
              )
            ],
            this.attData
          );
          attendanceInput = attends;
        }
        await this.attendanceUpdate(attendanceInput);
      }
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
      }
      this.$emit("canceled", true);
    },

    async delEx() {
      const attends = this.getAllAttendances.find(
        (el) =>
          this.$dayjs(el.attend_date).format("YYYY-MM-DD") ===
          this.$dayjs(this.attend_date).format("YYYY-MM-DD")
      );
      attends.members.splice(
        attends.members.findIndex((v) => v.client._id === this.client._id),
        1
      );
      const attendanceInput = attends;
      await this.attendanceUpdate(attendanceInput);
      if (this.getErrors.length) {
        this.$toast.error(
          "Greška! " + this.getErrors,
          "OK",
          this.notificationSystem.options.error
        );
        this.clearErrors();
      } else {
        this.$toast.success(
          "Uspješno obrisano!",
          "OK",
          this.notificationSystem.options.success
        );
      }
      this.$emit("canceled", true);
    },

    checkUpdate() {
      if (this.clientAtt.date) {
        this.attData = this.clientAtt;
        this.attend_date = this.clientAtt.date;
        this.title = "Izmijeni prisustvo";
      }
    },
  },

  /*   filters: {
    formatDate: function (value) {
      if (value) {
        return dayjs(value).format("dddd");
      }
    },
  }, */

  watch: {
    clientAtt: function () {
      this.checkUpdate();
    },
  },

  mounted() {
    this.checkUpdate();
  },
};
</script>

<style>
.client__activity {
  display: grid;
  /* justify-content: center; */
  align-items: center;
  justify-self: stretch;
  margin: 0.5em;
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

.new_item {
  text-transform: uppercase;
}
</style>