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
        <v-card>
          <v-card-title primary-title class="justify-center"
            ><template v-slot:[`item.sim`]="{ item }">
              <div class="p-2">
                <v-img :src="item.sim" height="50px" width="50px"></v-img>
              </div>
            </template>
            <template v-slot:[`item.identitas`]="{ item }">
              <div class="p-2">
                <v-img :src="item.identitas" height="50px" width="50px"></v-img>
              </div>
            </template>
            <v-form v-model="valid" ref="form">
              <h3 class="headline mb-10 text-center">REGISTER</h3>
              <div>
                <v-text-field
                  v-model="fullname"
                  :rules="nameRules"
                  label="Full Name"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="address"
                  :rules="addressRules"
                  label="Address"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  align-center
                  justify-center
                  v-model="phone"
                  :rules="phoneRules"
                  label="Phone"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  align-center
                  justify-center
                  v-model="password"
                  :rules="passwordRules"
                  label="Password Default Tgl Lahir"
                  outlined
                  dense
                  disabled
                ></v-text-field>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      :rules="dateRules"
                      label="Birh Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      @change="setPassword"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @change="setPassword"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
                <v-radio-group
                  v-model="gender"
                  row
                  label="Gender"
                  :rules="genderRules"
                >
                  <v-radio label="Male" value="Laki-laki"></v-radio>
                  <v-radio label="Female" value="Perempuan"></v-radio>
                </v-radio-group>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  outlined
                  dense
                  required
                ></v-text-field>
                <!-- <v-text-field
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  v-model="password"
                  :type="show3 ? 'text' : 'password'"
                  :rules="passwordRules"
                  label="Password"
                  outlined
                  dense
                  full-width
                  @click:append="show3 = !show3"
                ></v-text-field> -->
                <v-file-input
                  v-model="imageSim"
                  label="Sim"
                  outlined
                  dense
                  @change="onFileChangeSim"
                ></v-file-input>
                <v-file-input
                  v-model="imageIdentitas"
                  label="Identitas"
                  outlined
                  required
                  dense
                  @change="onFileChangeIdentitas"
                ></v-file-input>
                <h4>Preview</h4>
                <v-img
                  :src="imageUrlSim"
                  width="400px"
                  style="border: 1px dashed #ccc; min-height: 400px"
                />
                <h4>Preview</h4>
                <v-img
                  :src="imageUrlIdentitas"
                  width="400px"
                  style="border: 1px dashed #ccc; min-height: 400px"
                />
              </div>
            </v-form>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn flat color="orange" @click="submit">Submit</v-btn>
            <v-btn color="orange" @click="reset">Reset</v-btn>
          </v-card-actions>
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
  name: "RegisterPage",
  data() {
    return {
      imageSim: undefined,
      imageIdentitas: undefined,
      imageUrlSim: "",
      imageUrlIdentitas: "",
      imageStoreURLSim: "",
      imageStoreURLIdentitas: "",

      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      fullname: "",
      nameRules: [(v) => !!v || "Nama tidak boleh kosong"],
      email: "",
      emailRules: [(v) => !!v || "E-mail tidak boleh kosong"],
      phone: "",
      phoneRules: [(v) => !!v || "Telepon tidak boleh kosong"],
      address: "",
      addressRules: [(v) => !!v || "Alamat tidak boleh kosong"],
      date: "",
      dateRules: [(v) => !!v || "Tanggal Lahir tidak boleh kosong"],
      gender: "",
      genderRules: [(v) => !!v || "Gender tidak boleh kosong"],
      images: {
        logo: require("@/assets/logo.png"),
      },
      menu: false,
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
          .post(this.$api + "/register/customer", {
            nama: this.fullname,
            alamat: this.address,
            no_telp: this.phone,
            tgl_lahir: this.date,
            jenis_kelamin: this.gender,
            email: this.email,
            password: this.password,
            sim: this.imageStoreURLSim,
            identitas: this.imageStoreURLIdentitas,
          })
          .then((response) => {
            //simpan data id user yang diinput
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("token", response.data.access_token);
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.reset();
            this.$router.push({
              name: "LoginPage",
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
    createImageSim(file) {
      const readerSim = new FileReader();
      readerSim.onloadend = (e) => {
        this.imageUrlSim = e.target.result;
        this.getImageStorageURLSim(this.imageUrlSim);
      };

      readerSim.readAsDataURL(file);
    },
    onFileChangeSim(file) {
      if (!file) {
        return;
      }
      this.createImageSim(file);
    },
    getImageStorageURLSim(sim) {
      let newData = {
        imgB64: sim,
      };
      var url = this.$api + "/customer/storeimage";
      this.$http
        .post(url, newData)
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.imageStoreURLSim = response.data.data;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });
    },
    createImageIdentitas(file) {
      const readerIdentitas = new FileReader();
      readerIdentitas.onloadend = (e) => {
        this.imageUrlIdentitas = e.target.result;
        this.getImageStorageURLIdentitas(this.imageUrlIdentitas);
      };

      readerIdentitas.readAsDataURL(file);
    },
    onFileChangeIdentitas(file) {
      if (!file) {
        return;
      }
      this.createImageIdentitas(file);
    },
    getImageStorageURLIdentitas(identitas) {
      let newData = {
        imgB64: identitas,
      };
      var url = this.$api + "/customer/storeimage";
      this.$http
        .post(url, newData)
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.imageStoreURLIdentitas = response.data.data;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });
    },
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
.v-text-field {
  width: 400px;
  justify-content: center;
}
</style>