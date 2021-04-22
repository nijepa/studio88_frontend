<template>
  <div class="lists__wrapper">
    <div class="user__form">
      <div class="camera">
        <video id="video" autoplay class="video"></video>

        <loading pic="loading1" v-if="loadingState" key="1" />

        <form
          method="post"
          @submit.prevent="savePicture(pic)"
          v-else
          class=""
          key="2"
        >
          <button
            id="snap"
            class="action_btn client__add for_mobile for__camera"
            @click.prevent="takePicture"
          >
            <svg
              x="0px"
              y="0px"
              width="40px"
              height="40px"
              viewBox="0 0 477.418 477.419"
              style="enable-background: new 0 0 477.418 477.419"
              xml:space="preserve"
              fill="var(--purple)"
            >
              <circle cx="249.209" cy="160.576" r="6.448" />
              <circle cx="220.959" cy="160.576" r="11.75" />
              <path
                d="M363.417,113.712H213.609c-21.324,0-38.611,17.287-38.611,38.61v286.485c0,21.325,17.287,38.612,38.611,38.612h149.808
                  c21.324,0,38.609-17.287,38.609-38.612V152.322C402.026,130.999,384.741,113.712,363.417,113.712z M245.959,182.826h-26.5
                  c-12.288,0-22.25-9.962-22.25-22.25c0-12.288,9.962-22.25,22.25-22.25h26.5c12.287,0,22.25,9.962,22.25,22.25
                  C268.209,172.864,258.247,182.826,245.959,182.826z"
              />
              <polygon
                points="116.076,110.817 177.572,102.86 183.627,43.549 221.85,95.55 260.706,74.693 253.958,95.618 271.01,95.618 
                  288.512,41.349 226.584,74.589 171.758,0 162.734,88.415 75.393,99.718 136.939,147.624 88.264,212.627 157.947,201.267 
                  157.947,184.823 125.383,190.132 159.479,144.601 		"
              />
            </svg>
            Slikaj
          </button>

          <canvas
            id="canvas"
            width="115px"
            height="150px"
            class="snap"
          ></canvas>

          <div class="modify_btns">
            <action-buttons @canceled="handleCancel" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import ActionButtons from "@/components/utils/ActionButtons.vue";
import Loading from "@/components/utils/Loading.vue";
import actionsNotify from "@/mixins/actionsNotify";

export default {
  name: "Camera",

  components: {
    Loading,
    ActionButtons,
  },

  mixins: [actionsNotify],

  data() {
    return {
      url: process.env.VUE_APP_CLOUDINARY,
      pic: null,
      clientInput: {
        picture: "",
      },
    };
  },

  computed: {
    ...mapGetters(["getOneClient", "getErrors", "loadingState"]),
  },

  methods: {
    ...mapActions([
      "fetchClients",
      "clientUpdate",
      "clearErrors",
      "setLoadingState",
    ]),

    handleCancel() {
      this.closeCamera();
    },

    takePicture() {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      const video = document.getElementById("video");

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Set image size, must use image.naturalWidth and image.naturalHeight -- not image.width and image.height.
      const imageWidth = video.clientWidth;
      const imageHeight = video.clientHeight;

      // Set scale to fit image to canvas,
      const scale = Math.min(
        canvasWidth / imageWidth,
        canvasHeight / imageHeight
      );

      // Set new image dimensions.
      const scaledWidth = imageWidth * scale;
      const scaledHeight = imageHeight * scale;

      // Draw image in center of canvas.
      context.drawImage(
        video,
        (canvasWidth - scaledWidth) / 2,
        (canvasHeight - scaledHeight) / 2,
        scaledWidth,
        scaledHeight
      );

      //context.drawImage(video, 0, 0, 350, 350);
      this.pic = canvas;
    },

    async savePicture(canvas) {
      this.setLoadingState(true);
      if (!canvas) {
        this.$toast.error(
          " ",
          "Prvo slikaj!",
          this.notificationSystem.options.error
        );
        this.setLoadingState(false);
        return;
      }
      // Converts canvas to an image
      let image = new Image();
      image.src = canvas.toDataURL("image/png");
      //return image;
      const unsignedUploadPreset = process.env.VUE_APP_UNSIGNED_UPLOAD_PRESET;
      const formData = new FormData();
      formData.append("file", image.src);
      formData.append("upload_preset", unsignedUploadPreset);

      await this.saveClientPhoto(formData);
      await this.updateClientPhoto();
      await this.fetchClients();

      await this.setLoadingState(false);
      this.closeCamera();
    },

    async saveClientPhoto(clientData) {
      await axios
        .post(this.url, clientData)
        .then((response) => {
          this.clientInput.picture = response.data.secure_url;
        })
        .catch((error) => {
          if (error.response) {
            console.log = error.response.data.error;
          } else {
            console.log = error;
          }
        });
    },

    async updateClientPhoto() {
      await this.clientUpdate(this.clientInput);
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
    },

    closeCamera() {
      this.setLoadingState(true);
      this.$router.push("/client");
    },
  },

  mounted() {
    const video = document.getElementById("video");
    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: { exact: "environment" } } })
        .then(function (stream) {
          //video.src = window.URL.createObjectURL(stream);
          video.srcObject = stream;
          video.play();
        });
    }
    this.clientInput = this.getOneClient;
    this.setLoadingState(false);
  },
};
</script>

<style>
.camera {
  display: grid;
}

.video {
  /* width: 100%; */
  width: 350px;
  /* height: 350px; */
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  object-fit: scale-down;
}

.for__camera {
  justify-self: center;
}

@media (max-width: 599px) {
  .video {
    width: 100%;
    margin: 0;
  }
}
</style>
