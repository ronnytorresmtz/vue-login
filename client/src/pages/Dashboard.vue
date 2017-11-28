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
.spin {
  font-size: 2em;
}

.spin-centered {
  position: absolute;
  top: 45%;
  left: 45%;
}
 .brand {
    text-align: left !important;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 50px;
    line-height: 50px !important;
    /*background-color: #337ab7;*/
    line-height: 50px;
    display: block;
    text-align: center;
    color: #e1ffff;
    font-family: verdana;
  }

</style>

<template>
  <div>
    <h3 class="spin spin-centered" v-if="!info">
      <i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Loading...
    </h3>

     <!--blue topbar-->
    <nav class="navbar navbar-default navbar-fixed-top" style="background:#3c8dbc" >
    <div class="brand">
      Brandname
    </div>
    </nav>
    <!--End blue topbar-->

    <topbar v-if="info"></topbar>

    <div class="title" v-if="info"> 
      <h2 class="message">{{ info.message }}</h2>
      <h4 class="message message-below">{{ info.middleware }}</h4>
      <p class="explanation">
      <b>How it works:</b> The application send a client id token to the server, then the server returns a access-token which is 
      stored in the localstorge. After that, for each request the application send the access token stored in the request header 
      and a laravel middleware allows or not to access the API. 
      </p>
      <h3> Current User: {{ info.user.email }} </h3>
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
