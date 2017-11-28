<style scoped>
  .topbar-icons {
    color:#e1ffff;
    padding-right:20px;
    cursor: pointer;
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
    <nav class="navbar navbar-default navbar-fixed-top" style="background:#3c8dbc" >
      <div class="container-fluid">
        <div class="row">
            <div class="col-xs-1">
              <i class="fa fa-bars fa-md"
                style="margin-top:20px; color: white; cursor:pointer"
                @click="expandCollapse">
              </i>
            </div>
            <div class="col-xs-9" align="right" style="padding-top:15px;">
                <i class="fa fa-bell-o fa-md topbar-icons" aria-hidden="true"> </i>
                <i class="fa fa-comment-o fa-md topbar-icons" aria-hidden="true"></i>
                <i class="fa fa-flag-o fa-md topbar-icons" aria-hidden="true"></i>
            </div>
            <div class="col-xs-1">
                <myavatar
                  :email="username"
                  circle-size="32px"
                  letter-size="1.5em"
                  background="white"
                  color="black"
                  >
                </myavatar>
            </div>
               <div class="col-xs-1" style="padding-top:15px">
                <span @click="logout">
                  <i class="fa fa-power-off fa-md topbar-icons"
                    aria-hidden="true"
                    :title="ts['logout']"
                  >
                  </i>
                </span>
            </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import { getValueInLocalStorage } from '../../lib/General';
  import store from '../../store/Store';
  import myavatar from '../../components/layout/avatar';
  import mylang from '../../components/languages/Languages';
  

  export default {

    mixins: [mylang],

    components: {
      myavatar,
      username: '',
    },

    created() {
      this.username = getValueInLocalStorage('username');
    },

    data() {
      return {
      };
    },

    computed: {
      showSidebar() {
        return store.getters.getShowSidebar;
      },
    },

    methods: {
      collapseSidebar() {
        store.commit('SHOW_SIDEBAR', false);
      },
      expandCollapse() {
        store.commit('SHOW_SIDEBAR', !this.showSidebar);
      },
      logout() {
        store.dispatch('login/logout');
      },
    },
  };
</script>
