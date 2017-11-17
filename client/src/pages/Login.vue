<style scoped>
  a {
    cursor: pointer;
  }
  .error-email {
    color:red;
    font-size: 12px;
    font-style:italic;
  }
  .component-center {
      display: block;
      margin-top: 100px;
  }

  .panel-title {
    font-size: 18px;
  }

  .panel-dark {
    background-color: white;
    color: black;
    border-bottom: solid 1px #eee;
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

  <div class="container-fluid">
    
    <!--blue topbar-->
    <nav class="navbar navbar-default navbar-fixed-top" style="background:#3c8dbc" >
    <div class="brand">
      Brandname
    </div>
    </nav>
    <!--End blue topbar-->

    <!--message component-->
    <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <mypopup v-if="showPopUpMessage"> </mypopup>
    </transition>
    <!-- end message component-->
		
    <div class="row">
			<div class="col-sm-4"></div>
			<div class="col-sm-4">
        <div class="panel component-center"> 
          <div class="panel-heading panel-dark">
            <div class="panel-title">
              <h3>{{ ts['signIn'] }}</h3>
            </div>
          </div> 
          <div class="panel-body body-height"> 
            <!--display avatar-->
            <div class="row" align="center" style="margin-top:-50px">
              <myavatar 
                :email="username" 
                circleSize="80px" 
                letterSize="2em"
                background="black"
                color="white"
              >
              </myavatar>
            </div>
            <!--end display avatar-->

            <!-- Username and password inputs -->
            <div class="row">
              <div class="col-sm-12 text-left" style="padding-top:10px">
                  <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">
                      <i class="glyphicon glyphicon-envelope"></i>
                    </span>			
                    <input 
                      type="text" 
                      v-model="username"
                      name="username" 
                      id="username" 
                      class ="form-control"
                      :placeholder="ts['typeTheUsername']"
                      value=""
                    >
                    </input>
                  </div>
                  <br>
              </div>
              <div class="col-sm-12 text-left">
                  <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">
                      <i class="glyphicon glyphicon-lock" ></i>
                    </span>			
                    <input 
                      type="password" 
                      v-model="password"
                      name="password" 
                      id="password" 
                      class ="form-control"
                      :placeholder="ts['typeThePassword']"
                      value="">
                    </input>
                  </div>
                  <br>
              </div>
            </div>
            <!-- end Username and password inputs -->

            <!-- Remember me and forgot your password -->
            <div class="row">
            <div class="col-sm-6 text-left">
              <div class="control-group" >
                <input type="checkbox" v-model="rememberMe"></input>
                {{ ts['rememberMe'] }}
              </div>	
            </div>	
                      
            <div class="col-sm-6 text-right">
              <div class="control-group"  >
                <a @click="showEmailToSend">
                {{ ts['forgotYourPassword'] }}
                </a>	
              </div>
            </div>	
          </div>
          <hr>
          <!-- end Remember me and forgot your password -->

          <!-- Get your forgot password-->
           <div v-show="forgotYourPassword">
            <div class="row">
              <div class="col-sm-12 text-left">
                  <div class="alert alert-info">
                    <p><strong>{{ ts['getYourPassword'] }}</strong></p>
                    {{ ts['getYourPassMsg'] }}
							    </div>
                  <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">
                      <i class="glyphicon glyphicon-envelope" ></i>
                    </span>			
                    <input 
                      type="email" 
                      v-model="email"
                      name="email" 
                      id="email" 
                      class ="form-control"
                      :placeholder="ts['typeTheEmailAddress']"
                      value="">
                    </input>
                  </div>
                  <span v-show="emailErrMessage" class="error-email">{{ ts['typeTheEmailError'] }}</span>
                  <hr>
                  <div class="control-group" >
                      <div class="row">
                        <div class="col-sm-6" ></div>
                        <div class="col-sm-6" align="right">
                          <button 
                            class="btn btn-sm btn-primary"  
                            style="width: 100px"
                            :disabled="(email && !emailErrMessage) ? false : true"
                            @click="btnSendEmail"
                          >
                            {{ ts['send'] }} 
                          </button>
                        </div>			
                      </div>	
                  </div>	
              </div>
            </div>
          </div>
          <div class="control-group" v-show="!forgotYourPassword">
            <div class="row">
              <div class="col-sm-6" align="left">
                <button 
                  class="btn btn-sm btn-success"
                  @click="loginDemo"
                > 
                 {{ ts['loginUserDemo'] }} 
                </button>
              </div>

              <div class="col-sm-6" align="right">
                <button 
                class="btn btn-sm btn-primary"  
                style="width: 100px"
                :disabled="(username && password) ? false : true"
                @click="login"
                >
                <span v-if="loading" style="padding-right:5px">
                  <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                </span>
                {{ ts['signIn'] }}
                </button>
              </div>			
            </div>	
          </div>	
        <!-- End Get your forgot password-->
        
        </div> <!--end panel-body-->
      </div> <!--end panel-->
    </div> <!-- end col-sm-4-->
    <div class="col-sm-4"></div>
  </div> <!-- end row-->
</div> <!-- end container-->

</template>

<script>
  import client from '../../env';
  import store from '../store/Store';
  import mypopup from '../components/messages/Popup';
  import mylang from '../components/languages/Languages';
  import myavatar from '../components/layout/avatar';
  import { isValidEmail } from '../lib/General';

  export default {

    components: {
      myavatar,
      mypopup,
    },

    mixins: [mylang],

    mounted() {
      this.username = localStorage.getItem('rememberUserName');
      this.rememberMe = (this.username.length === 0) ? false : (this.username);
    },

    data() {
      return {
        moduleName: 'login',
        username: '',
        password: '',
        email: '',
        forgotYourPassword: false,
        emailErrMessage: true,
        rememberMe: false,
      };
    },

    computed: {
      loading() {
        return store.getters[`${this.moduleName}/getLoading`];
      },
      showPopUpMessage: {
        set() { },
        get() {
          return store.getters[`${this.moduleName}/getShowMessage`];
        },
      },
    },

    methods: {

      loginDemo() {
        this.username = 'demo123@gmail.com';
        this.password = 'demo123';
        this.login();
      },

      login() {
        const data = {
          client_id: client.client_id,
          client_secret: client.client_secret,
          grant_type: client.grant_type,
          username: this.username,
          password: this.password,
          rememberMe: this.rememberMe,
          url: '/Dashboard',
        };
        store.dispatch(`${this.moduleName}/checkLogIn`, data);
      },

      showEmailToSend() {
        this.forgotYourPassword = !this.forgotYourPassword;
      },

      btnSendEmail() {
        if (isValidEmail(this.email)) {
          store.dispatch(`${this.moduleName}/sendEmail`, this.email);
        }
      },
    },

    watch: {
      username() {
        this.forgotYourPassword = false;
      },
      password() {
        this.forgotYourPassword = false;
      },
      email() {
        this.emailErrMessage = (this.email) ? !isValidEmail(this.email) : true;
      },
    },
  };
</script>
