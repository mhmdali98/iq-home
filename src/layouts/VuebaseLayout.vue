<template>
  <v-app>
    <v-navigation-drawer
      v-if="this.$route.path !== '/log' && this.$route.path !== '/home' && this.$route.path !== '/booking'"
      width="250"
      class="blue-grey darken-4"
      dark
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
      app
      right
    >
      <v-list class="pa-0 pb-1">
        <v-list-item class="px-2">
          <!-- <v-list-item-action v-if="!miniVariant">
            <v-icon large color="orange">invert_colors</v-icon>
          </v-list-item-action>-->
          <v-list-item-content v-if="!miniVariant">
            <v-list-item-title>
              <h2>
                منصة
                <span>كورونا</span>
              </h2>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="pr-1">
            <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list subheader :class="{ 'list-border-bottom': miniVariant }">
        <v-list-item
          v-for="item in analyticsItems"
          :key="item.title"
          link
          exact
          :to="item.link"
          v-show="item.admin"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
    </v-navigation-drawer>
    <!-- side bar end here side bar end here side bar end here side bar end here side bar end here  -->

    <v-card
      flat
      tile
      v-if="this.$route.path !== '/log' && this.$route.path !== '/home'&& this.$route.path !== '/booking'"
    >
      <v-toolbar color="#55ab88" dark flat>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>
          <h4 style="color:#55ab88 ">{{username}}</h4>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="logout()">
          <v-icon large>mdi-power</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "VuebaseLayout",

  data() {
    return {
      appName: process.env.VUE_APP_APP_NAME,
      drawer: true,
      fixed: false,
      analyticsItems: [
        {
          icon: "dashboard",
          title: "الرئيسية",
          link: "/dashboard",
          admin: true
        },
        {
          icon: "mdi-virus",
          title: "الحالات",
          link: "/cases",
          admin: false
        },
        {
          icon: "mdi-bell-ring",
          title: "الاشعارت",
          link: "/notification",
          admin: false
        },
        {
          icon: "mdi-folder-multiple-image",
          title: "الفديوات",
          link: "/media",
          admin: false
        },
        {
          icon: "mdi-account-voice",
          title: "النصائح",
          link: "/tips",
          admin: false
        },
        {
          icon: "mdi-frequently-asked-questions ",
          title: " الأسئلة و الاجوبة",
          link: "/qna",
          admin: false
        },
        {
          icon: "mdi-alert-circle-check",
          title: "تصحيح المفاهيم",
          link: "/consept",
          admin: false
        },
        {
          icon: "mdi-source-repository-multiple",
          title: "المصادر",
          link: "/source",
          admin: false
        },
        {
          icon: "mdi-account-group ",
          title: "المستخدمين",
          link: "/users",
          admin: false
        },
        {
          icon: "mdi-city-variant ",
          title: "المحافظات",
          link: "/city",
          admin: false
        },
        {
          icon: "mdi-card-account-phone",
          title: "التواصل",
          link: "/contact",
          admin: false
        }
      ],

      miniVariant: false,
      right: true,
      rightDrawer: false,
      tabs: null,
      searching: false,
      search: ""
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    onBlur() {
      this.searching = false;
      this.search = "";
    },

    searchBegin() {
      this.searching = true;
      setTimeout(() => document.querySelector("#search").focus(), 50);
    },

    searchEnd() {
      this.searching = false;
      this.search = "";
      document.querySelector("#search").blur();
    }
  },
  computed: {
    username() {
      if (this.$store.state.policyNumber == "SUPERADMIN") {
        this.analyticsItems[1].admin = true;
        this.analyticsItems[2].admin = true;
        this.analyticsItems[3].admin = true;
        this.analyticsItems[4].admin = true;
        this.analyticsItems[5].admin = true;
        this.analyticsItems[6].admin = true;
        this.analyticsItems[7].admin = true;
        this.analyticsItems[8].admin = true;
        this.analyticsItems[9].admin = true;
        this.analyticsItems[10].admin = true;
      } else if (this.$store.state.policyNumber == "ADMIN") {
        this.analyticsItems[1].admin = true;
        this.analyticsItems[2].admin = true;
        this.analyticsItems[3].admin = true;
        this.analyticsItems[4].admin = true;
        this.analyticsItems[5].admin = true;
        this.analyticsItems[6].admin = true;
        this.analyticsItems[7].admin = false;
        this.analyticsItems[8].admin = false;
        this.analyticsItems[9].admin = false;
        this.analyticsItems[10].admin = false;
      }
      return this.$store.state.fullname;
    }
  },
  created() {
    if (this.$store.state.policyNumber == 1) {
      this.analyticsItems[1].admin = true;
      this.analyticsItems[2].admin = true;
    } else if (this.$store.state.policyNumber == 2) {
      this.analyticsItems[3].admin = true;
      this.analyticsItems[4].admin = true;
      this.analyticsItems[5].admin = true;
    } else {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../node_modules/vuetify/src/styles/settings/_variables.scss";

.bottom-menu {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.searching {
  overflow: hidden;
  width: 208px;
  padding-left: 8px;
  transition: $primary-transition;
}

.searching--closed {
  padding-left: 0;
  width: 0;
}

.searching > * {
  right: 8px;
}

.searching--closed > * {
  display: none;
}

.list-border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
h2 > span {
  color: #55ab88;
}
</style>
