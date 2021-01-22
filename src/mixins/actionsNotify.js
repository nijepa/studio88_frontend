export default
{
  data() {
    return {
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
            timeout: 0,
            close: false,
            overlay: true,
            toastOnce: true,
            id: "question",
            zindex: 999,
            position: "center",
            buttons: [
              [
                `<button><b>DA</b></button>`,
                (instance, toast) => {
                  instance.hide(
                  {
                    transitionOut: "fadeOut",
                    onClosing: async (instance, toast, closedBy) => {
                      console.info("closedBy: " + closedBy);
                      await this.delEx()
                    }
                  },
                  toast,
                  true
                );
                }
              ],
              [
                "<button>NE</button>",
                (instance, toast) => {
                  instance.hide(
                  {
                    transitionOut: "fadeOutUp",
                    onClosed: function(instance, toast, closedBy) {
                      console.info("closedBy: " + closedBy);
                    }
                  },
                  toast,
                  false
                );
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

  methods: {
    delClient() {
      this.$toast.question('Sigurna ?', 'Brisanje', this.notificationSystem.options.question)
    },
  }
}