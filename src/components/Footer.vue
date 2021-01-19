<template>
<transition name="rise" mode="out-in">
  <div class="footer" :key="1">
    <hr>
    <div class="footer_group">
      <span class="footer__text">Studio 88 @ 2021</span>
    </div>
    <a href="https://www.instagram.com/studio88pilates/" target="blank">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 333333 333333" shape-rendering="geometricPrecision" 
              text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" 
              clip-rule="evenodd" height="20px" class="footer__svg">
          <defs>
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="128982" y1="329187" x2="204352" y2="4148.82">
              <stop offset="0" stop-color="#f58529"/>
              <stop offset=".161" stop-color="#feda77"/>
              <stop offset=".431" stop-color="#dd2a7b"/>
              <stop offset=".741" stop-color="#8134af"/>
              <stop offset="1" stop-color="#515bd4"/>
            </linearGradient>
          </defs>
          <path d="M96206 1436h140927c52923 0 96200 42742 96200 94958v140546c0 52228-43278 94956-96198 94956l-140929-2C43283 331894 0 289166 0 236938V96392C0 44178 43283 1436 96206 1436zm69563 76009c51427 0 93159 41732 93159 93159 0 51433-41732 93159-93159 93159-51441 0-93167-41726-93167-93159 0-51427 41726-93159 93167-93159zm0 31467c34055 0 61694 27633 61694 61694s-27640 61700-61694 61700c-34067 0-61701-27639-61701-61700s27634-61694 61701-61694zm90128-44378c8354 0 15128 6774 15128 15120 0 8354-6774 15128-15128 15128-8348 0-15120-6774-15120-15128 0-8348 6774-15120 15120-15120zM107722 28430h117907c44273 0 80482 36029 80482 80059v118497c0 44028-36209 80051-80482 80051l-117907 2c-44273 0-80488-36023-80488-80051V108487c0-44028 36215-80057 80488-80057z" 
          fill="url(#a)"/>
        </svg>
    </a>
    <a href="https://www.facebook.com/jecabu2" target="blank">
      <svg version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" 
            viewBox="0 0 266.893 266.895" enable-background="new 0 0 266.893 266.895" xml:space="preserve">
        <path id="Blue_1_" fill="#3C5A99" d="M248.082,262.307c7.854,0,14.223-6.369,14.223-14.225V18.812  c0-7.857-6.368-14.224-14.223-14.224H18.812c-7.857,0-14.224,6.367-14.224,14.224v229.27c0,7.855,6.366,14.225,14.224,14.225  H248.082z"/>
        <path id="f" fill="#FFFFFF" d="M182.409,262.307v-99.803h33.499l5.016-38.895h-38.515V98.777c0-11.261,3.127-18.935,19.275-18.935  l20.596-0.009V45.045c-3.562-0.474-15.788-1.533-30.012-1.533c-29.695,0-50.025,18.126-50.025,51.413v28.684h-33.585v38.895h33.585  v99.803H182.409z"/>
      </svg>
    </a>
  </div>
</transition>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style>
  .footer {
    margin-bottom: 1em;
  }

  .footer_group {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer__text {
    font-family: 'Baloo Tamma 2', cursive;
    font-weight: 800;
    color: var(--purple);
    margin-right: 1em;
  }

  .footer__svg {
    margin-right: 1em;
  }
</style>