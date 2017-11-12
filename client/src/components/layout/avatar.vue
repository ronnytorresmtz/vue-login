<style scoped>
 .gravatar {
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }
  .gravatar-margin {
    margin:10px;
  }
  .gravatar-border {
    border: solid 2px; 
    border-color: #e1ffff;
  }

  .cicle {
    margin: 10px;
    display: block;
    -moz-border-radius: 50%;
    border-radius: 50%;
   }

  .letter {
    text-align: center;
  }
    
 
</style>

<template>
  <span v-if="gravatar">
    <img class="gravatar gravatar-margin" :src="gravatarUrl">
  </span>
  <a v-else href="https://es.gravatar.com/"
    class="cicle letter" 
    :style="`height:${circleSize}; width:${circleSize}; line-height:${circleSize}; font-size:${letterSize}; background:${background}; color: ${color}`">
    {{ getFirstLetterFromEmail() }}
  </a>
</template>

<script>

  import md5 from 'crypto-js/md5';
  import Axios from 'axios';
  import { isValidEmail } from '../../lib/General';
  
  export default {

    props: ['email', 'circleSize', 'letterSize', 'background', 'color'],

    data() {
      return {
        gravatarUrl: '',
        gravatarEmail: '',
        gravatar: false,
      };
    },

    created() {
      this.getAvatar();
    },

    methods: {
      getAvatar() {
        this.gravatarEmail = this.email;
        if (isValidEmail(this.gravatarEmail)) {
          const hash = md5(this.gravatarEmail);
          this.gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${this.circleSize}&d=404`;
          Axios.get(this.gravatarUrl)
          .then(() => {
            this.gravatar = true;
          })
          .catch(() => {
            this.gravatar = false;
          });
          if (this.gravatarEmail === '') {
            this.gravatarEmail = '?';
          }
        }
      },

      getFirstLetterFromEmail() {
        return (this.gravatarEmail === null) ? '?' : this.gravatarEmail[0].toUpperCase();
      },

      isValidEmail(email) {
        const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test(email);
        // return email;
      },
    },

    watch: {
      email() {
        this.getAvatar();
      },
    },
  };
</script>
