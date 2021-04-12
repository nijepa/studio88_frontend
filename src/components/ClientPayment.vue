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
        id="Capa_1"
        x="0px"
        y="0px"
        width="30px"
        height="30px"
        viewBox="0 0 30 30"
        fill="var(--gold)"
        style="enable-background: new 0 0 30 30"
        xml:space="preserve"
      >
        <path
          d="M15,0C6.729,0,0,6.729,0,15c0,8.271,6.729,15,15,15c8.271,0,15-6.729,15-15C30,6.729,23.271,0,15,0z M15,27.777
          C7.956,27.777,2.223,22.046,2.223,15S7.956,2.223,15,2.223S27.777,7.954,27.777,15S22.044,27.777,15,27.777z"
        />
        <path
          d="M15,3.5C8.66,3.5,3.5,8.659,3.5,15S8.66,26.5,15,26.5S26.5,21.341,26.5,15S21.34,3.5,15,3.5z M19.145,10.677
          c-0.754-0.593-1.61-0.89-2.568-0.89c-0.741,0-1.395,0.239-1.957,0.718c-0.563,0.479-0.963,1.116-1.199,1.912h4.309v1.891h-4.611
          c-0.027,0.397-0.041,0.674-0.041,0.829c0,0.184,0.007,0.381,0.02,0.598h4.63v1.922h-4.328c0.506,1.699,1.514,2.548,3.024,2.548
          c0.95,0,1.856-0.304,2.72-0.911v2.488c-0.795,0.484-1.832,0.728-3.115,0.728c-1.516,0-2.753-0.42-3.71-1.259
          s-1.591-2.038-1.901-3.595H9.182v-1.923h0.971c-0.014-0.168-0.021-0.367-0.021-0.597c0-0.12,0.014-0.396,0.041-0.829H9.182v-1.891
          h1.285c0.37-1.558,1.072-2.768,2.103-3.63c1.032-0.863,2.316-1.295,3.853-1.295c1.126,0,2.032,0.186,2.72,0.557v2.629H19.145z"
        />
      </svg>
      {{ title }}
    </h3>
    <div class="input__att">
      <div class="input__field">
        <label for="name">Godina</label>
        <input
          type="number"
          name="name"
          placeholder="godina"
          class="login_input user_input"
          v-model="payment_year"
        />
      </div>
      <div class="input__field">
        <label for="days">Mjesec</label>
        <div class="login_input user_input">
          <select
            name="days"
            id="days"
            class=""
            required
            v-model="payment_month"
            :value="payment_month"
          >
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
        <datepicker
          v-model="payment_date"
          placeholder="datum prisustva"
          class="login_input user_input"
          :language="sr"
          :format="customFormatter"
        >
        </datepicker>
        <!-- <h3 class="weekday">{{ payment_date | formatDate }}</h3> -->
      </div>
      <div class="input__field">
        <label for="att">Plaćeno</label>
        <input
          type="number"
          v-model="attData.payment_amount"
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
import { mapGetters, mapActions } from "vuex";
import ActionButtons from "@/components/utils/ActionButtons.vue";
import DeleteButton from "@/components/utils/DeleteButton.vue";
import actionsNotify from "@/mixins/actionsNotify";
import findMonth from "@/mixins/findMonth";
import Datepicker from "vuejs-datepicker";
import { sr } from "vuejs-datepicker/dist/locale";
import dayjs from "dayjs";
import srb from "dayjs/locale/sr";

dayjs.locale(srb);

export default {
  name: "ClientPayment",

  props: ["client", "clientAtt"],

  components: {
    Datepicker,
    ActionButtons,
    DeleteButton,
  },

  mixins: [actionsNotify, findMonth],

  computed: {
    ...mapGetters(["getAllPayments", "getErrors"]),
  },

  data() {
    return {
      title: "Novo plaćanje",
      sr: sr,
      attData: {
        payment_amount: 35,
        note: "",
      },
      payment_year: dayjs(new Date()).format("YYYY"),
      payment_month: this.checkMonth(),
      payment_date: new Date().toISOString().slice(0, 10),
    };
  },

  methods: {
    ...mapActions([
      "fetchPayments",
      "clearErrors",
      "paymentAdd",
      "paymentUpdate",
      "paymentDelete",
    ]),

    customFormatter(date) {
      return dayjs(date).format("DD MMM YYYY");
    },

    handleCancel() {
      this.$emit("canceled", true);
    },

    async addAttendance() {
      const attends = this.getAllPayments.find(
        (el) =>
          el.payment_year === parseInt(this.payment_year) &&
          el.payment_month === this.payment_month
      );

      if (!attends) {
        let paymentInput = {
          payment_date: this.payment_date,
          payment_year: this.payment_year,
          payment_month: this.payment_month,
          notes: "",
          members: [
            {
              client: this.client._id,
              payment_date: this.payment_date,
              payment_amount: this.attData.payment_amount,
              note: this.attData.note,
            },
          ],
        };
        await this.paymentAdd(paymentInput);
      } else {
        const cli = attends.members.find(
          (x) => x.client._id === this.client._id
        );
        let paymentInput = {};
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
          paymentInput = attends;
        }
        await this.paymentUpdate(paymentInput);
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
      const attends = this.getAllPayments.find(
        (el) =>
          el.payment_year === parseInt(this.payment_year) &&
          el.payment_month === this.payment_month
      );
      attends.members.splice(
        attends.members.findIndex((v) => v.client._id === this.client._id),
        1
      );
      const paymentInput = attends;
      await this.paymentUpdate(paymentInput);
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
        this.attData.payment_amount = this.clientAtt.amount;
        this.payment_date = this.clientAtt.date;
        this.payment_year = this.clientAtt.year;
        this.payment_month = this.clientAtt.month;
        this.title = "Izmijeni plaćanje";
      }
    },
  },

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
.item__header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 0 !important;
  column-gap: 0.5em;
}
</style>
