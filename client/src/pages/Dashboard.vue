<style scoped>

.title {
  padding: 70px;
}
.message {
  color:lightgray;
  font-size: 2em;
  font-style: italic;
  color:coral;
}
.message-below {
  margin-top: -10px;
  color:lightgrey;
  font-size: 1.5em;
}
.explanation {
  background-color: rgb(60, 141, 188);
  color: white;
  font-size: 1.5em;
  margin-top: 30px;
  padding: 30px;
}
</style>

<template>
  <div>
    <topbar></topbar>
    <div class="title" v-if="info"> 
      <h2 class="message">{{ info.message }}</h2>
      <h4 class="message message-below">{{ info.middleware }}</h4>
      <p class="explanation">
      <b>How it works:</b> The application send a client id token to the server, then the server returns a access-token which is 
      stored in the localstorge. After that, for each request the application send the access token stored in the request header 
      and a laravel middleware allows or not to access the API. 
      </p>
      <hr>
      <h2>User List (laravel route: '/users')</i></h2>
      <table class="table table-hover table-bordered table-striped">
        <th>ID</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <tbody>
          <tr v-for="user in info.users">
            <td>{{user.id}}</td>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

  import Axios from 'axios';
  import topbar from '../components/layout/topbar';

  export default {
  
    components: {
      topbar,
    },

    data() {
      return {
        info: '',
      };
    },

    created() {
      Axios.get('http://localhost:8000/api/users')
      .then((response) => {
        this.info = response.data;
      })
      .catch(() => {
        this.$router.push('/Login');
      });
    },

    methods: {

    },
  };
</script>
