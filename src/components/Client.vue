<template>
  <div class="schedule__wrapper">
    <form @submit.prevent="addClient()" method="post" class="user__form">
      <div class="input__group">
        <div class="input__field">
          <label for="active">Aktivna</label>
          <input type="checkbox" name="active" placeholder="ime" checked="checked" id="active"
                  class="login_input user_input check_active" v-model="clientInput.active">
        </div>
        <div class="input__field">
          <label for="date_start">Datum upisa</label>
          <input type="date" name="date_start" placeholder="datum upisa"
                  class="login_input user_input" :value="clientInput.date_started && makeCorrectDate(clientInput.date_started)"
                  @input="clientInput.date_started = $event.target.valueAsDate">
        </div>
      </div>

      <div class="input__group">
        <div class="input__field">
          <label for="first_name">Ime</label>
          <input type="text" name="first_name" placeholder="ime" required id="first_name"
                  class="login_input user_input" v-model="clientInput.first_name">
        </div>
        <div class="input__field">
          <label for="last_name">Prezime</label>
          <input type="text" name="last_name" placeholder="prezime" required
                  class="login_input user_input" v-model="clientInput.last_name">
        </div>
      </div>

      <div class="input__group">
        <div class="input__field">
          <label for="email">E-mail</label>
          <input type="email" name="email" placeholder="e-mail" required
                  class="login_input user_input" v-model="clientInput.email">
        </div>
<!--         <div class="input__field">
          <label for="address">Adresa</label>
          <input type="text" name="address" placeholder="adresa"
                  class="login_input user_input" v-model="clientInput.address">
        </div>
        <div class="input__field">
          <label for="tel">Telefon</label>
          <input type="tel" name="tel" placeholder="telefon"
                  class="login_input user_input" v-model="clientInput.phone">
        </div> -->
        <div class="input__field">
          <label for="mobile">Mobilni</label>
          <input type="tel" name="mobile" placeholder="mobilni"
                  class="login_input user_input" v-model="clientInput.mobile">
        </div>
      </div>
      
      <div class="input__field">
        <label for="notes">Napomene</label>
        <textarea name="notes" id="notes" cols="20" rows="5" placeholder="napomene"
                  class="login_input user_input" v-model="clientInput.notes">fd
        </textarea>
      </div>

      <div class="input__btns">
        <div class="action_btns">
          <button type="submit" class="action_btn">
            <svg version="1.1" id="Layer_1" x="0px" y="0px" height="40px"
                  viewBox="0 0 408.759 408.759" style="enable-background:new 0 0 408.759 408.759;" xml:space="preserve">
              <g>
                <path style="fill:#8bdd6b;" d="M204.383,408.759c-58.121,0-113.674-24.867-152.417-68.225
                  C18.46,303.057,0.005,254.703,0.005,204.381C0.005,91.685,91.688,0,204.383,0c50.319,0,98.674,18.455,136.164,51.964
                  c43.346,38.762,68.207,94.316,68.207,152.417C408.755,317.076,317.074,408.759,204.383,408.759"/>
                <path style="fill:#35af05;" d="M377.755,204.379c0,18.08-2.77,35.52-7.909,51.901c-15.6,49.779-53.02,89.899-101.069,109.11
                  c-4.69,1.889-9.481,3.56-14.361,5.03c-10.5,3.16-21.419,5.35-32.65,6.47c-5.719,0.58-11.51,0.87-17.38,0.87
                  c-51.39,0-97.559-22.361-129.299-57.881c-0.26-0.29-0.521-0.591-0.79-0.881c-26.95-30.56-43.29-70.68-43.29-114.62
                  c0-95.749,77.621-173.38,173.379-173.38c43.951,0,84.071,16.35,114.631,43.29c0.29,0.27,0.589,0.53,0.879,0.79
                  c33.66,30.1,55.491,73.13,57.67,121.299v0.011C377.696,199.04,377.755,201.699,377.755,204.379"/>
                <path style="fill:#1c6300;" d="M74.34,319.046c3.509,3.976,7.2,7.791,11.056,11.43c-3.585-3.385-7.023-6.919-10.309-10.596
                  C74.84,319.605,74.594,319.321,74.34,319.046 M59.6,299.796c0.005,0.008,0.011,0.016,0.016,0.024
                  C59.611,299.813,59.604,299.802,59.6,299.796 M59.097,299.029c0.017,0.025,0.031,0.048,0.048,0.073
                  C59.128,299.078,59.113,299.054,59.097,299.029 M58.793,298.562c0.021,0.033,0.041,0.063,0.062,0.096
                  C58.834,298.626,58.813,298.593,58.793,298.562 M58.495,298.102c0.056,0.086,0.108,0.168,0.164,0.254
                  C58.605,298.272,58.549,298.186,58.495,298.102 M58.272,297.754c0.036,0.056,0.075,0.117,0.111,0.173
                  C58.346,297.869,58.31,297.813,58.272,297.754 M57.99,297.312c0.044,0.069,0.089,0.14,0.133,0.208
                  C58.078,297.451,58.034,297.381,57.99,297.312 M57.71,296.87c0.061,0.097,0.124,0.197,0.186,0.293
                  C57.834,297.067,57.771,296.967,57.71,296.87 M57.474,296.496c0.051,0.082,0.102,0.162,0.153,0.244
                  C57.576,296.659,57.524,296.576,57.474,296.496 M57.209,296.074c0.061,0.097,0.123,0.197,0.184,0.295
                  C57.333,296.271,57.27,296.171,57.209,296.074 M56.936,295.635c0.067,0.108,0.133,0.214,0.2,0.322
                  C57.069,295.849,57.003,295.743,56.936,295.635 M56.696,295.246c0.062,0.1,0.12,0.195,0.182,0.295
                  C56.817,295.443,56.756,295.344,56.696,295.246 M56.439,294.829c0.071,0.116,0.142,0.231,0.213,0.347
                  C56.582,295.061,56.51,294.944,56.439,294.829 M56.173,294.392c0.072,0.119,0.144,0.237,0.217,0.355
                  C56.318,294.63,56.244,294.51,56.173,294.392 M55.922,293.98c0.073,0.121,0.146,0.242,0.22,0.363
                  C56.069,294.221,55.996,294.102,55.922,293.98 M55.681,293.58c0.076,0.127,0.153,0.254,0.229,0.38
                  C55.834,293.834,55.757,293.706,55.681,293.58 M55.419,293.143c0.077,0.13,0.154,0.258,0.232,0.387
                  C55.574,293.402,55.496,293.272,55.419,293.143 M54.935,292.328c0.161,0.273,0.321,0.542,0.484,0.815
                  C55.257,292.872,55.096,292.599,54.935,292.328 M152.31,38.956C81.994,61.064,31.004,126.76,31.004,204.37
                  c0,32.099,8.717,62.156,23.919,87.936c-15.2-25.78-23.917-55.835-23.917-87.927C31.006,126.769,81.994,61.067,152.31,38.956"/>
                <path style="fill:#35af05;" d="M204.383,31.001c-18.142,0-35.638,2.787-52.073,7.955C81.994,61.067,31.006,126.769,31.006,204.379
                  c0,32.092,8.717,62.147,23.917,87.927c0.003,0.005,0.01,0.016,0.013,0.022c0.16,0.271,0.322,0.544,0.484,0.815v0.001
                  c0.077,0.129,0.155,0.259,0.232,0.387c0.009,0.016,0.02,0.034,0.03,0.05c0.076,0.126,0.153,0.254,0.229,0.38
                  c0.005,0.008,0.007,0.012,0.012,0.02c0.074,0.122,0.146,0.241,0.22,0.363c0.009,0.016,0.021,0.034,0.03,0.049
                  c0.071,0.117,0.145,0.238,0.217,0.355c0.016,0.026,0.034,0.056,0.05,0.082c0.071,0.115,0.142,0.232,0.213,0.347
                  c0.014,0.023,0.029,0.047,0.043,0.07c0.06,0.098,0.122,0.197,0.182,0.295c0.019,0.031,0.039,0.063,0.058,0.094
                  c0.067,0.108,0.133,0.214,0.2,0.322c0.024,0.038,0.049,0.079,0.073,0.117c0.061,0.097,0.123,0.197,0.184,0.295
                  c0.027,0.043,0.053,0.084,0.08,0.127c0.051,0.08,0.103,0.163,0.153,0.244c0.027,0.043,0.055,0.088,0.083,0.131
                  c0.061,0.097,0.124,0.197,0.186,0.293c0.032,0.051,0.062,0.097,0.094,0.148c0.044,0.069,0.088,0.139,0.133,0.208
                  c0.05,0.079,0.099,0.156,0.15,0.234c0.038,0.059,0.073,0.114,0.111,0.173c0.037,0.058,0.074,0.116,0.112,0.174
                  c0.054,0.084,0.109,0.17,0.164,0.254c0.044,0.068,0.089,0.138,0.134,0.206c0.02,0.031,0.042,0.065,0.062,0.096
                  c0.079,0.121,0.163,0.25,0.242,0.371c0.016,0.025,0.032,0.048,0.048,0.073c0.152,0.232,0.302,0.462,0.455,0.693
                  c0.004,0.006,0.012,0.018,0.016,0.024c4.462,6.754,9.386,13.178,14.724,19.226c0.254,0.275,0.5,0.559,0.747,0.834
                  c3.286,3.677,6.724,7.212,10.309,10.596c2.298,2.169,4.654,4.273,7.068,6.315c-25.53-30.2-40.919-69.241-40.919-111.881
                  c0-95.749,77.619-173.368,173.379-173.368c42.631,0,81.68,15.39,111.87,40.919C305.004,54.871,257.483,31.001,204.383,31.001"/>
                <path style="fill:#35af05;" d="M317.613,136.427L178.714,275.326l90.064,90.064c48.049-19.21,85.469-59.33,101.069-109.11
                  c5.139-16.381,7.909-33.821,7.909-51.901c0-2.679-0.059-5.339-0.19-7.989v-0.011l0,0l-50.069-50.069"/>
                <polyline style="fill:#FFFFFF;" points="188.597,285.205 102.651,199.26 118.207,183.704 188.597,254.094 311.936,130.754 
                  327.492,146.31 188.597,285.205 	"/>
              </g>
            </svg>
            <p>Sačuvaj</p> 
          </button>
          <button type="submit" @click.prevent="formTypeChange('clients')"
                  class="action_btn cancel__btn">
            <svg version="1.1" id="Layer_1" x="0px" y="0px" height="40px"
                  viewBox="0 0 408.759 408.759" style="enable-background:new 0 0 408.759 408.759;" xml:space="preserve">
              <g>
                <path style="fill:#e7c75b;" d="M204.385,408.759c-58.121,0-113.675-24.868-152.418-68.227
                  C18.46,303.057,0.005,254.703,0.005,204.379C0.005,91.683,91.689,0,204.385,0c50.317,0,98.674,18.453,136.163,51.964
                  c43.348,38.761,68.207,94.315,68.207,152.415C408.755,317.074,317.075,408.759,204.385,408.759"/>
                <path style="fill:#ffb515;" d="M377.759,204.379c0,9.08-0.7,17.999-2.05,26.7c-1.331,8.62-3.3,17.039-5.861,25.199
                  c-19.48,62.179-73.03,109.291-138.779,119.43c-3.08,0.48-6.181,0.87-9.3,1.18c-5.721,0.58-11.51,0.87-17.38,0.87
                  c-51.39,0-97.561-22.361-129.301-57.881c-0.26-0.29-0.519-0.589-0.79-0.879c-26.95-30.56-43.289-70.681-43.289-114.62
                  c0-95.751,77.619-173.381,173.38-173.381c43.95,0,84.069,16.35,114.629,43.29c0.29,0.27,0.591,0.53,0.881,0.79
                  C355.409,106.838,377.759,152.989,377.759,204.379"/>
                <path style="fill:#e29403;" d="M74.342,319.046c3.837,4.347,7.885,8.496,12.136,12.439c-3.973-3.689-7.776-7.564-11.389-11.607
                  C74.842,319.603,74.597,319.321,74.342,319.046 M65.406,308.053c0.011,0.014,0.021,0.027,0.031,0.042
                  C65.427,308.081,65.417,308.067,65.406,308.053 M65.054,307.58c0.032,0.044,0.066,0.089,0.099,0.133
                  C65.12,307.669,65.087,307.624,65.054,307.58 M64.725,307.135c0.068,0.092,0.139,0.188,0.207,0.28
                  C64.864,307.323,64.793,307.228,64.725,307.135 M64.441,306.749c0.073,0.1,0.142,0.193,0.215,0.293
                  C64.584,306.943,64.513,306.847,64.441,306.749 M64.143,306.34c0.09,0.124,0.176,0.241,0.267,0.365
                  C64.321,306.585,64.231,306.461,64.143,306.34 M163.56,35.832C87.503,54.187,31.004,122.679,31.004,204.37
                  c0,38.107,12.288,73.34,33.125,101.952c-20.836-28.615-33.12-63.843-33.12-101.943C31.009,122.689,87.503,54.189,163.56,35.832"/>
                <path style="fill:#ffb515;" d="M204.383,30.999c-14.062,0-27.731,1.673-40.823,4.833C87.503,54.189,31.009,122.689,31.009,204.379
                  c0,38.1,12.284,73.328,33.12,101.943c0.004,0.005,0.01,0.014,0.014,0.019c0.088,0.121,0.178,0.245,0.267,0.365
                  c0.009,0.012,0.023,0.031,0.032,0.043c0.072,0.099,0.143,0.194,0.215,0.293c0.023,0.031,0.046,0.063,0.069,0.094
                  c0.068,0.092,0.139,0.188,0.207,0.28c0.041,0.056,0.081,0.109,0.122,0.165c0.033,0.044,0.066,0.089,0.099,0.133
                  c0.084,0.114,0.169,0.227,0.254,0.341c0.01,0.014,0.021,0.028,0.031,0.042c2.82,3.771,5.792,7.425,8.904,10.951
                  c0.255,0.275,0.5,0.558,0.747,0.832c3.613,4.043,7.416,7.919,11.389,11.607c1.953,1.812,3.952,3.583,5.988,5.304
                  c-25.531-30.2-40.921-69.239-40.921-111.88c0-95.751,77.621-173.37,173.381-173.37c42.629,0,81.68,15.39,111.869,40.919
                  C305.004,54.869,257.484,30.999,204.383,30.999"/>
                <path style="fill:#ffb515;" d="M276.012,131.382L131.383,276.013l99.686,99.695c65.749-10.14,119.299-57.251,138.779-119.43
                  c2.561-8.16,4.53-16.579,5.861-25.199l-91.242-91.242"/>
                <polygon style="fill:#FFFFFF;" points="284.473,139.843 268.917,124.286 204.379,188.823 139.842,124.286 124.286,139.843 
                  188.823,204.379 124.286,268.916 139.842,284.472 204.379,219.936 268.917,284.472 284.473,268.916 219.936,204.379 	"/>
              </g>
            </svg>
            <p>Odustani</p>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Client',

    data() {
      return {
        enterClient: false,
        clientInput: {
          //_id: '',
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          mobile: '',
          address: '',
          date_started: '',
          notes: '',
          picture: '',
          active: ''
        },
        appeared: false,
        notificationSystem: {
        options: {
          show: {
            theme: "dark",
            icon: "icon-person",
            position: "topCenter",
            progressBarColor: "rgb(0, 255, 184)",
         /*    buttons: [
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
            position: "center"
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
            buttons: [
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
            }
          }
        }
      }
      }
    },

    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('YYYY-MM-DD')
        }
      }
    },

    computed: {
      ...mapGetters([ 'getAllClients', 
                      'getOneClient' ]),
    },

    methods: {
      ...mapActions([ 'clientAdd', 
                      'clientUpdate', 
                      'clientDelete',
                      'formTypeChange',
                      'clearErrors' ]),
      
      addClient() {
        try {
          if (this.getOneClient._id) {
            this.clientUpdate(this.clientInput);
          } else {
            this.clientAdd(this.clientInput);
          }
          this.$toast.success('Uspešno sačuvano!', 'OK', this.notificationSystem.options.success)
          this.formTypeChange('clients');
        } catch(error) {
          this.$toast.success('Greška!', 'OK', this.notificationSystem.options.error)
        }
        
      },

      makeCorrectDate(str) {
          return new Date(str).toISOString().split('T')[0]
      },
      
      onAppeared() {
        this.appeared = true;
      }
    },

    created() {
      if (this.getOneClient) {
        this.clientInput = this.getOneClient
      } 
    },

  }
</script>

<style>
  .user__form {
    display: grid;
    justify-content: center;
    justify-items: baseline;
    margin: 1em;
    padding: 1em;
    border: 2px solid var(--purple);
    border-radius: 1em;
  }

  .action_btns  {
    display: flex;
  }

  .action_btn {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 1em;
    align-items: center;
    background: white;
    /* padding: .5em; */
    margin-right: 1em;
    margin-top: 1em;
    cursor: pointer;
    color: var(--green);
    font-size: 1.2em;
    font-weight: 800;
    border: 2px solid transparent;
    border-bottom: 2px solid var(--green);
    transition: ease .8s all;
  }

  .action_btn:hover {
    color: var(--green-dark);
    border-bottom: 2px solid var(--green-dark);
    transform: scale(1.05);
  }

  .cancel__btn {
    color: var(--orange);
    border-bottom: 2px solid var(--orange);
  }

  .cancel__btn:hover {
    color: var(--orange-dark);
    border-bottom: 2px solid var(--orange-dark);
  }

  .user_input {
    font-size: 1.3em;
    padding: 0.3em;
  }

  .check_active {
    cursor: pointer;
  }

  .input__field {
    display: grid;
    justify-items: left;
    align-content: baseline;
  }

  .input__group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1em;
    justify-self: normal;
  }

  .input__btns {
    justify-self: center;
  }
/*   .user_input:hover, .user_input:focus {
    color: #4b515d;
    background: #fff;
    border-bottom: 1px solid var(--purple);
    box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.01), 0px 0px 8px rgba(0, 0, 0, 0.2);
  } */
</style>