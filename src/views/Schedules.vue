<template>
  <!-- <transition name="slide" mode="out-in"> -->
  <loading pic="loading" v-if="loadingState" key="1" />

  <div v-else class="client__wrapper schedule_mobile" key="2">
    <button type="submit" @click="newSchedule()" class="action_btn client__add">
      <svg
        version="1.0"
        fill="var(--purple)"
        width="50px"
        height="50px"
        viewBox="0 0 1280.000000 640.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
          fill="var(--purple)"
          stroke="none"
        >
          <path
            d="M3153 6340 c-103 -14 -203 -69 -203 -110 0 -10 -24 -32 -58 -53 -123
          -76 -198 -184 -248 -358 -14 -52 -33 -106 -40 -120 -13 -27 -122 -121 -221
          -193 -31 -22 -53 -45 -53 -56 0 -10 27 -41 60 -70 33 -29 60 -59 60 -67 0 -8
          -10 -29 -22 -45 -18 -26 -20 -35 -10 -61 10 -25 8 -34 -8 -55 -15 -18 -20 -40
          -20 -86 0 -33 -5 -90 -11 -126 -12 -75 -3 -99 45 -125 38 -21 112 -18 268 10
          101 18 109 18 142 2 50 -23 71 -73 101 -237 14 -78 34 -163 44 -189 l18 -48
          -36 -44 c-36 -43 -33 -44 24 -6 l30 20 -30 -33 c-16 -18 -43 -41 -60 -52 l-30
          -19 30 7 c17 4 44 14 60 22 l30 15 -20 -23 -20 -23 22 11 c12 7 24 17 26 24 3
          7 6 8 6 2 1 -16 -36 -47 -104 -88 -33 -20 -56 -36 -52 -36 19 0 134 63 161 88
          l29 27 -13 -25 c-7 -14 -20 -31 -29 -38 -14 -12 -14 -13 4 -7 16 5 14 0 -9
          -24 -36 -38 -29 -39 24 -6 48 30 53 17 8 -20 -33 -26 -33 -26 -5 -15 16 5 38
          15 50 21 31 15 -26 -35 -82 -72 -58 -38 -49 -37 49 7 45 19 84 34 86 31 2 -2
          -11 -15 -31 -28 -37 -25 -49 -47 -16 -29 11 5 22 10 25 10 5 0 -26 -93 -67
          -200 -71 -183 -166 -384 -411 -863 -36 -70 -40 -87 -41 -151 0 -65 4 -80 39
          -148 l39 -75 -43 -64 c-24 -35 -98 -120 -165 -189 -77 -80 -146 -163 -190
          -228 -39 -60 -181 -326 -333 -625 -306 -604 -325 -639 -387 -696 -60 -55 -101
          -72 -203 -82 -45 -5 -194 -31 -330 -58 -266 -54 -390 -71 -526 -74 -47 -1 -86
          -4 -86 -8 0 -3 -14 -4 -30 -1 -37 5 -60 -12 -60 -45 0 -18 9 -28 38 -40 31
          -13 84 -16 322 -17 157 -1 297 2 313 7 20 6 27 4 27 -7 0 -35 29 -46 118 -46
          69 0 94 4 120 20 45 28 152 27 152 -1 0 -6 -19 -18 -43 -28 -37 -16 -78 -19
          -283 -22 -236 -4 -240 -5 -294 -31 -31 -15 -85 -34 -121 -43 -54 -12 -357 -55
          -594 -84 -27 -3 -59 -11 -70 -18 -19 -11 -19 -12 -1 -45 31 -57 76 -78 164
          -78 71 0 78 -2 87 -22 15 -34 99 -44 234 -29 58 7 113 12 121 12 8 0 96 -3
          195 -7 99 -4 307 -6 462 -6 282 0 323 5 323 36 0 8 24 32 53 55 60 46 105 98
          135 156 12 25 125 139 298 305 423 402 427 406 546 585 59 89 156 218 215 288
          169 200 210 256 245 333 l32 71 37 -57 c21 -32 54 -77 75 -99 59 -66 253 -208
          345 -252 120 -58 245 -144 469 -323 241 -193 347 -269 450 -322 83 -43 114
          -53 345 -104 452 -100 952 -270 1204 -408 107 -59 154 -80 226 -104 31 -10
          221 -13 885 -13 789 0 850 1 925 19 44 10 87 18 95 18 8 0 94 -3 190 -7 224
          -9 312 2 351 43 23 24 38 30 91 35 34 4 149 18 253 33 180 25 216 27 717 31
          511 5 910 -5 1058 -27 36 -5 126 -28 200 -50 269 -81 295 -84 660 -85 l325 0
          84 28 c149 49 353 53 471 8 37 -13 79 -20 127 -21 64 0 74 3 84 21 6 12 8 33
          4 48 -19 77 -25 121 -25 162 1 51 -25 94 -67 110 -13 5 -76 13 -141 19 -244
          22 -402 62 -511 128 -33 21 -112 81 -175 136 -201 173 -273 208 -386 189 -49
          -8 -59 -7 -91 14 -50 33 -133 49 -184 35 -23 -7 -73 -38 -115 -73 -100 -82
          -124 -93 -195 -93 -50 -1 -81 7 -185 51 -288 119 -699 241 -1005 298 -137 26
          -338 16 -585 -28 -327 -60 -347 -61 -501 -43 -234 27 -439 72 -556 122 -242
          103 -431 156 -833 235 -146 28 -292 61 -325 74 -143 53 -275 132 -387 230
          -135 120 -301 200 -475 230 -119 21 -323 19 -558 -6 -110 -11 -258 -21 -330
          -22 -113 -1 -141 3 -216 25 -93 28 -133 46 -194 88 -65 45 -85 69 -85 99 0 44
          -36 150 -99 294 -56 126 -60 144 -109 407 -57 304 -100 726 -87 844 7 58 8 59
          24 39 9 -11 21 -29 28 -39 14 -24 -11 94 -32 149 -19 47 -19 53 -1 38 12 -10
          15 -8 18 11 4 22 5 22 17 -6 18 -45 161 -234 161 -214 0 3 -13 34 -29 69 -16
          35 -32 74 -36 87 l-7 23 44 -22 43 -22 -64 68 c-72 77 -121 170 -121 229 0 58
          28 107 140 246 152 189 205 304 216 470 8 107 -13 233 -60 364 -19 53 -31 96
          -28 96 11 -1 67 -80 91 -127 12 -24 23 -43 25 -43 13 0 -32 144 -62 203 -10
          19 31 4 63 -24 40 -36 43 -33 15 21 -30 58 -78 109 -144 152 -57 36 -58 38
          -28 38 17 0 42 -4 56 -10 55 -20 23 3 -48 36 -89 41 -171 60 -290 70 -68 5
          -94 12 -108 26 -12 12 -26 17 -38 13 -15 -5 -26 8 -59 77 -151 308 -445 484
          -843 502 -56 3 -131 1 -165 -4z m1119 -873 c60 -94 61 -205 4 -324 -79 -164
          -257 -311 -445 -367 -71 -21 -71 -21 -71 12 0 25 6 29 78 55 151 53 256 145
          304 267 18 47 22 80 26 223 4 150 6 167 21 163 9 -3 23 -1 31 4 22 14 23 14
          52 -33z"
          />
        </g>
      </svg>
      <p>Novi termin</p>
    </button>

    <div class="schedule__card">
      <div
        v-for="schedule in getAllSchedules"
        :key="schedule._id"
        class="schedule__items"
        @click="selectSchedule(schedule)"
      >
        <div class="">
          <span class="item__desc">Grupa</span>
          <p class="client__item">{{ schedule.title }}</p>
        </div>

        <div class="">
          <span class="item__desc">Dani treninga</span>
          <div class="client__item">
            <p
              v-for="termin in schedule.weekday"
              :key="termin.id"
              class="week__day"
            >
              {{ termin }}
            </p>
          </div>
        </div>

        <div class="">
          <span class="item__desc">Vrijeme početka</span>
          <p class="client__item">{{ schedule.startTime }}</p>
        </div>

        <div class="">
          <span class="item__desc">Polaznice</span>
          <div class="client__item">
            <p
              v-for="polaznik in schedule.members"
              :key="polaznik.id"
              class="week__day"
            >
              {{
                schedule.members
                  .map((item) => item.client._id)
                  .indexOf(polaznik.client._id) + 1
              }}
              {{ polaznik.client.last_name }},
              {{ polaznik.client.first_name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loading from '@/components/utils/Loading.vue';

export default {
  name: 'Schedules',

  components: {
    Loading,
  },

  computed: {
    ...mapGetters(['getAllSchedules', 'loadingState']),
  },

  methods: {
    ...mapActions([
      'fetchSchedules',
      'fetchSchedule',
      'scheduleClear',
      'setLoadingState',
    ]),

    async newSchedule() {
      this.setLoadingState(true);
      this.$router.push('/schedule');
      await this.scheduleClear();
    },

    async selectSchedule(schedule) {
      this.setLoadingState(true);
      await this.fetchSchedule(schedule);
      this.$router.push('/schedule');
    },
  },

  async mounted() {
    if (!this.getAllSchedules.length) await this.fetchSchedules();
    this.setLoadingState(false);
  },
};
</script>

<style></style>
