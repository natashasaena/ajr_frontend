<template>
  <div>
    <v-toolbar color="#e8aa09" dark height="80" elevation="0">
      <img :src="images.logo" height="70" width="70" contain />
      <v-toolbar-title class="ms-2">Atma Jaya Rental</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text @click="home">Home</v-btn>
        <v-btn text @click="login">SIGN IN</v-btn>
        <v-btn text @click="register">SIGN UP</v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile v-for="item in title" :key="item.icon">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <b-container fluid="sm" style="margin-top: 20vh">
      <b-card>
        <b-row>
          <b-col><p>Car Rental</p></b-col>
        </b-row>
        <b-row>
          <b-col mx="auto">
            <label for="start-date">Rental Start Date</label>
            <b-form-datepicker
              id="start-date"
              v-model="value1"
              class="mb-2"
            ></b-form-datepicker>
          </b-col>
          <b-col mx="auto">
            <label for="start-time">Start Time</label>
            <b-form-timepicker v-model="value2" locale="en"></b-form-timepicker>
          </b-col>
          <b-col mx="auto">
            <label for="end-date">Rental End Date</label>
            <b-form-datepicker
              id="end-date"
              v-model="value3"
              class="mb-2"
            ></b-form-datepicker>
          </b-col>
          <b-col mx="auto">
            <label for="end-time">End Time</label>
            <b-form-timepicker v-model="value4" locale="en"></b-form-timepicker>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>
<script>
export default {
  nama: "LoginPage",
  data() {
    return {
      mobils: [],
      load: false,
      form: {
        email: "",
        password: "",
      },
      emailRules: [(v) => !!v || "E-mail tidak boleh kosong"],
      show: true,

      images: {
        logo: require("@/assets/logo.png"),
      },
      title: [
        { icon: "home", title: "Home" },
        { icon: "info", title: "SIGN IN" },
        { icon: "warning", title: "SIGN OUT" },
      ],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  methods: {
    menuItems() {
      return this.menu;
    },
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    home() {
      this.$router.push({
        name: "HomePage",
      });
    },
    login() {
      this.$router.push({
        name: "LoginPage",
      });
    },
    register() {
      this.$router.push({
        name: "RegisterPage",
      });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>

<style>
.v-application--wrap {
  background: #1c549c;
}
body {
  background: #1c549c;
}
</style>