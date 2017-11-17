<style scoped>

.title {
  padding: 100px;
}
 
</style>

<template>
  <div>
    <topbar></topbar>
    <div class="title"> 
      <h1>You have permissions to access the application </h1>
    </div>
  </div>
</template>

<script>

  import topbar from '../components/layout/topbar';

  export default {
  
    components: {
      topbar,
    },

    data() {
      return {
      };
    },

    methods: {

    },
  };
</script>
