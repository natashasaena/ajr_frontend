<template>
  <div class="hello">
    <!-- <v-toolbar color="#e8aa09" dark height="80" elevation="0">
      <img :src="images.logo" height="70" width="70" contain />
      <v-toolbar-title class="ms-2">Atma Jaya Rental</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text @click="home">Home</v-btn>
        <v-btn text @click="account"
          ><v-icon dark left> mdi-account </v-icon>Account</v-btn
        >
        <v-btn text @click="logout"
          ><v-icon dark left> mdi-logout</v-icon>Log Out</v-btn
        >
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
    </v-toolbar> -->

    <v-card max-width="400px" class="mx-auto mt-16">
      <template v-slot:[`item.foto`]="{ item }">
        <div class="p-2">
          <v-img :src="item.foto" height="50px" width="50px"></v-img>
        </div>
      </template>
      <v-toolbar flat color="#e8aa09" dark>
        <v-toolbar-title class="black--text">Profile</v-toolbar-title>
      </v-toolbar>

        <v-container class="mx-auto">
          <v-text-field
            v-model="nama"
            :rules="nameRules"
            label="Nama Admin"
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
            v-model="phone"
            :rules="phoneRules"
            label="Phone"
            outlined
            dense
            required
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
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-radio-group v-model="gender" row label="Gender">
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
          <v-text-field
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="password"
            :type="show3 ? 'text' : 'password'"
            :rules="passwordRules"
            label="Password"
            outlined
            dense
            @click:append="show3 = !show3"
            required
          ></v-text-field>
          <v-text-field
            v-model="status_pegawai"
            :rules="statusRules"
            label="Status Pegawai"
            outlined
            dense
            disabled
            required
          ></v-text-field>
          <v-file-input
            v-model="imageFoto"
            label="Foto"
            outlined
            dense
            @change="onFileChangeFoto"
          ></v-file-input>
          <h4>Preview</h4>
          <v-img
            :src="imageStoreURLFoto"
            style="border: 1px dashed #ccc; min-height: 10px"
            width="400px"
          />
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="#1c549c" text @click="cancel"> Cancel </v-btn> -->
          <v-btn color="#1c549c" text @click="dialogConfirmEdit = true">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>


    
    <v-dialog v-model="dialogConfirmEdit" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text>Anda Yakin ingin mengubah data ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal" text @click="dialogConfirmEdit = false">
            Cancel
          </v-btn>
          <v-btn color="teal" text @click="update"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="1000" bottom>{{
      error_message
    }}</v-snackbar>
  </div>
</template>

<script>
export default {
  name: "ProfilCS",
  data() {
    return {
      snackbar: false,
      imageFoto: undefined,
      imageUrlFoto: "",
      imageStoreURLFoto: "",
      show3: false,
      show: true,
      data: "",
      id_role: "",
      nama: "",
      nameRules: [(v) => !!v || "Nama tidak boleh kosong"],
      password: "",
      passwordRules: [(v) => !!v || "Password tidak boleh kosong"],
      email: "",
      emailRules: [(v) => !!v || "E-mail tidak boleh kosong"],
      phone: "",
      phoneRules: [(v) => !!v || "Telepon tidak boleh kosong"],
      address: "",
      addressRules: [(v) => !!v || "Alamat tidak boleh kosong"],
      date: "",
      dateRules: [(v) => !!v || "Tanggal Lahir tidak boleh kosong"],
      images: {
        logo: require("@/assets/logo.png"),
      },
      menu: false,
      dialogConfirmEdit: false,
      deleteId: "",
      editId: "",
    };
  },
  methods: {
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
    readData() {
      var url =
        this.$api + "/pegawai/show/" + localStorage.getItem("id_pegawai");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.id_role = response.data.data.id_role;
          this.nama = response.data.data.nama;
          this.address = response.data.data.alamat;
          this.date = response.data.data.tgl_lahir;
          this.gender = response.data.data.jenis_kelamin;
          this.email = response.data.data.email;
          this.password = response.data.data.password;
          this.phone = response.data.data.no_telp;
          this.status_pegawai = response.data.data.status_pegawai;
          this.imageStoreURLFoto = response.data.data.foto;
        });
    },
    update() {
      let newData = {
        id_role: this.id_role,
        nama: this.nama,
        alamat: this.address,
        no_telp: this.phone,
        tgl_lahir: this.date,
        jenis_kelamin: this.gender,
        email: this.email,
        status_pegawai: this.status_pegawai,
        password: this.password,
        foto: this.imageStoreURLFoto,
      };
      var url =
        this.$api + "/pegawai/update/" + localStorage.getItem("id_pegawai");
      this.load = true;
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.dialogConfirmEdit = false;
          this.load = false;
          this.readData();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    //delete data course
    deleteData() {
      var url =
        this.$api + "/pegawai/delete/" + localStorage.getItem("id_pegawai");
      this.load = true;
      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.readData(); //local data
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    createImageFoto(file) {
      const readerFoto = new FileReader();
      readerFoto.onloadend = (e) => {
        this.imageUrlFoto = e.target.result;
        this.getImageStorageURLFoto(this.imageUrlFoto);
      };

      readerFoto.readAsDataURL(file);
    },
    onFileChangeFoto(file) {
      if (!file) {
        return;
      }
      this.createImageFoto(file);
    },
    getImageStorageURLFoto(foto) {
      let newData = {
        imgB64: foto,
      };
      var url = this.$api + "/pegawai/storeimage";
      this.$http
        .post(url, newData)
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.imageStoreURLFoto = response.data.data;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });
    },

    home() {
      this.$router.push({
        name: "DashboardCS",
      });
    },
    account() {
      this.$router.push({
        name: "ProfilCS",
      });
    },
    logout() {},
  },
  mounted() {
    this.readData();
  },
};
</script>

<style>
.form-group {
  margin-top: 10px;
}
h3 {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.btn-space {
  margin-right: 5px;
  width: 100px;
}
.card {
  margin: 8 auto;
  float: none;
  margin-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}
.navbar {
  background: #e8aa09;
  top: 0;
  color: red !important;
  position: fixed;
  z-index: 100;
}
.testimoni {
  background-color: #e8aa09;
  display: inline-block;
  width: 100%;
  height: 100%;
}
body {
  background: #1c549c;
}
.v-application--wrap {
  background: #1c549c;
}
.formProfile{
    width:100;
}
</style>