<template>
  <div class="loading">
    <!-- <img :src="getPngUrl()" alt="" class="loading"> -->
    <div class="loading__img" :class="spinners[Math.floor(Math.random() * 7)]"></div>
    <p class="loading__text">loading ...</p> 
  </div>
</template>

<script>
  export default {
    name: 'Loading',

    props: {
      pic: String
    },

    data() {
      return {
        spinners: [
          'nb-spinner',
          'reverse-spinner',
          'hm-spinner',
          'bt-spinner',
          'db-spinner',
          'triple-spinner',
          'cm-spinner'
        ]
      }
    },

    methods: {
/*       getPngUrl() {
        return require('../../assets/img/loading' + Math.floor(Math.random() * 5) + '.gif')
      }, */
    }
  }
</script>

<style>
/*   .loading__wrapper {
    display: grid;
    justify-content: center;
  } */

  .loading {
    height: 250px;
    width: 300px;
    margin: 0 auto;
    display: grid;
    justify-content: center;
    margin-top: 50px
  }

  .loading__text {
    text-align: center;
  }

/*   .loading__img {
    margin: 0 auto;
  } */

  .nb-spinner {
    width: 55px;
    height: 55px;
    margin: 0;
    background: transparent;
    border-top: 4px solid var(--gold);
    border-right: 4px solid transparent;
    border-radius: 50%;
    -webkit-animation: 1s spin linear infinite;
    animation: 1s spin linear infinite;
  }
      
  @-webkit-keyframes spin {
      from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
      }
      to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }
            
  @keyframes spin {
      from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
      }
      to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }

  .reverse-spinner {
    position: relative;
    height: 55px;
    width: 55px;
    border: 4px solid transparent;
    border-top-color: var(--gold);
    border-left-color: var(--gold);
    border-radius: 50%;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
  }

  .reverse-spinner::before {
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    content: "";
    border: 4px solid transparent;
    border-top-color: var(--purple);
    border-left-color: var(--purple);
    border-radius: 50%;
    -webkit-animation: spinBack 1s linear infinite;
    animation: spinBack 1s linear infinite;
  }

  @-webkit-keyframes spin {
      from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
  }

  @keyframes spin {
      from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
  }


  @-webkit-keyframes spinBack {
      from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
    }
    to {
          -webkit-transform: rotate(-720deg);
          transform: rotate(-720deg);
    }
  }

  @keyframes spinBack {
    from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
    }
    to {
          -webkit-transform: rotate(-720deg);
          transform: rotate(-720deg);
    }
  }

  .hm-spinner{
    height: 55px;
    width: 55px;
    border: 6px solid transparent;
    border-top-color: var(--gold);
    border-bottom-color: var(--gold);
    border-radius: 50%;
    position: relative;
    -webkit-animation: spin 3s linear infinite;
            animation: spin 3s linear infinite;
  }

  .hm-spinner::before{
    content: "";
    position: absolute;
    top: 20px;
    right: 20px;
    bottom: 20px;
    left: 20px;
    border: 6px solid transparent;
    border-top-color: var(--purple);
    border-bottom-color: var(--purple);
    border-radius: 50%;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
  }

  @-webkit-keyframes spin {
      from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
  }

  @keyframes spin {
      from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
  }

  .bt-spinner {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid var(--purple);
    border-top: 2px solid var(--gold);
    -webkit-animation: 1s spin linear infinite;
    animation: 1s spin linear infinite;
  }

  @-webkit-keyframes spin {
      from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
      }
      to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }
            
  @keyframes spin {
      from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
      }
      to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }   

  .db-spinner {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid var(--purple);
    border-top: 2px solid var(--gold);
    border-bottom: 2px solid var(--gold);
    -webkit-animation: 1s spin linear infinite;
    animation: 1s spin linear infinite;
  }

  @-webkit-keyframes spin {
      from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
      }
      to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }
            
  @keyframes spin {
      from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
      }
      to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }    

  .triple-spinner {
    display: block;
    position: relative;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top: 4px solid var(--gold);
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }

  .triple-spinner::before,
  .triple-spinner::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 4px solid transparent;
  }
  .triple-spinner::before {
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-top-color: var(--purple);
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3.5s linear infinite;
  }
  .triple-spinner::after {
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-top-color: var(--purple-light);
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.75s linear infinite;
  }

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  

  @keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .cm-spinner {
    height: 55px;
    width: 55px;
    border: 3px solid transparent;
    border-radius: 50%;
    border-top: 4px solid var(--gold);
    -webkit-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
    position: relative;
  }

  .cm-spinner::before,
  .cm-spinner::after {
    content: "";
    position: absolute;
    top: 6px;
    bottom: 6px;
    left: 6px;
    right: 6px;
    border-radius: 50%;
    border: 4px solid transparent;
  }

  .cm-spinner::before {
    border-top-color: var(--purple);
    -webkit-animation: 3s spin linear infinite;
    animation: 3s spin linear infinite;
  }

  .cm-spinner::after {
    border-top-color: var(--purple-light);
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
  }   
              
  @-webkit-keyframes spin {
      from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
      }
      to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }   
          
  @keyframes spin {
      from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
      }
      to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }

</style>