<template>
  <div class="">
    <div class="scrol">
      <img
        @click="animateToTop()"
        class="scrolling"
        src="@/assets/img/top.png"
        alt="top"
        id="scroll"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TopButton",

  methods: {
    animateToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },

  mounted() {
    document.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let scrollSpeed = window.pageYOffset / 2;
      let scrollObject = document.getElementById("scroll");
      if (scrollTop > 100) {
        document.querySelector(".scrol").style.display = "block";
        scrollObject.style.transform="rotate("+`${scrollSpeed}`+"deg)";
      }
      else document.querySelector(".scrol").style.display = "none";
    });
  },
  /* 
    destroyed() {
      window.removeEventListener('scroll');
    } */
};
</script>

<style>
.scrolling {
  width: 30px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  border-radius: 2em;
  transition: ease-in-out 0.3s all;
}

.scrolling:hover {
  background-color: var(--gold);
  transform: scale(1.1);
}
</style>
