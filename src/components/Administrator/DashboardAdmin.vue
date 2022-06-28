<template>
  <div class="dashboard">
    <v-app-bar color="#e8aa09" height="72px" light app elevation="1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on"> </v-btn>
        </template>
      </v-menu>
      <v-btn text @click="account"
          ><v-icon dark left> mdi-account </v-icon>Account</v-btn
        >
      <v-btn text @click="logout">
        <span>Exit</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" class="white" app width="200px">
      <v-layout column align-center>
        <v-flex class="mt-3">
          <v-img
            class="mx-auto"
            :src="images.logo"
            max-height="100"
            max-width="100"
            contain
          >
          </v-img>
        </v-flex>
      </v-layout>

      <v-list flat>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div class="fullheight pa-5">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "DashboardAdmin",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Data Driver", to: "/dashboard/datadriver" },
        { title: "Data Customer", to: "/dashboard/datacustomer" },
        { title: "Data Mobil", to: "/dashboard/datamobil" },
        { title: "Data Pemilik Mobil", to: "/dashboard/datapemilikkendaraan" },
        { title: "Data Pegawai", to: "/dashboard/datapegawai" },
      ],
      images: {
        logo: require("@/assets/logo.png"),
      },
    };
  },

  methods: {
    logout() {
      this.$router.push({
        name: "HomePage",
      });
    },
      account() {
      this.$router.push({
        name: "ProfilAdmin",
      });
    },
  },
};
</script>

<style scoped>
.v-application--wrap {
  background: #1c549c;
}
h3 {
  text-align: center;
}
</style>