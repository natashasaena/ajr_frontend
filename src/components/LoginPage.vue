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
          <v-list-tile v-for="item in menu" :key="item.icon">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-container fluid fill-height>
      <v-flex xs12 sm6 offset-sm3>
        <v-card
          ><v-form v-model="valid" ref="form">
            <v-card-title primary-title class="justify-center">
              <div>
                <h3 class="headline mb-10 text-center">LOGIN</h3>
                <div>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    outlined
                    dense
                    full-width
                    required
                  ></v-text-field>
                  <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="password"
                    :type="show3 ? 'text' : 'password'"
                    :rules="passwordRules"
                    label="Password"
                    outlined
                    dense
                    full-width
                    @click:append="show3 = !show3"
                    required
                  ></v-text-field>
                </div>
              </div>
              </v-card-title >
              <v-card-actions class="text--secondary justify-center ">
              Anda Pegawai?<router-link :to="{ path: '/pegawai' }">Login</router-link>
            </v-card-actions>
            <v-card-actions class="justify-center">
              <v-btn flat color="orange" @click="submit">Submit</v-btn>
              <v-btn color="orange" @click="reset">Reset</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-container>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
      error_message
    }}</v-snackbar>
  </div>
</template>
<script>
export default {
  name: "LoginPage",
  data() {
    return {
      show3: false,
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      password: "",
      passwordRules: [(v) => !!v || "Password tidak boleh kosong"],
      email: "",
      emailRules: [(v) => !!v || "E-mail tidak boleh kosong"],
      images: {
        logo: require("@/assets/logo.png"),
      },
    };
  },
  methods: {
    menuItems() {
      return this.menu;
    },
    submit() {
      if (this.$refs.form.validate()) {
        // cek validasi data yang terkirim
        this.load = true;
        this.$http
          .post(this.$api + "/login/customer", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            //simpan data id user yang diinput
            localStorage.setItem("id_customer", response.data.user.id_customer);
            localStorage.setItem("token", response.data.access_token);
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = true;
            this.reset();
            this.$router.push({
              name: "UserPage",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
          });
      }
    },

    reset() {
      // event.preventDefault();
      // // Reset our form values
      // this.email = "";
      // this.password = "";
      // // Trick to reset/clear native browser form validation state
      // this.show = false;
      // this.$nextTick(() => {
      //   this.show = true;
      //});
      this.$refs.form.reset();
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
};
</script>

<style>
.v-application--wrap {
  background: #1c549c;
}
.v-text-field {
  width: 400px;
  justify-content: center;
}
</style>