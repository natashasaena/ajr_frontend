<template>
  <v-main class="list">
    <h3 class="text-h3" font-weight-medium mb-5></h3>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="#e8aa09" text-dark @click="dialog = true"> Tambah </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="customers" :search="search">
      <template v-slot:[`item.sim`]="{ item }">
        <div class="p-2">
          <v-img :src="item.sim" height="50px" width="50px"></v-img>
        </div>
      </template>
      <template v-slot:[`item.identitas`]="{ item }">
        <div class="p-2">
          <v-img :src="item.identitas" height="50px" width="50px"></v-img>
        </div>
      </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            aria-label="update"
            role="button"
            aria-hidden="false"
            color="green"
            small
            class="mr-1"
            @click="editItem(item)"
            >mdi-pencil</v-icon
          >
          <v-icon
            aria-label="delete"
            role="button"
            aria-hidden="false"
            color="red"
            small
            class="ml-1"
            @click="deleteItem(item.id_customer)"
            >mdi-delete
          </v-icon>
          <!-- <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
          <v-btn small @click="deleteHandler(item.id)">delete</v-btn> -->
        </template>
        <!--<template v-slot:[`item.priority`]="{ item }">
                  <v-icon role="button" @click="priorityItem(item)">mdi-information</v-icon>
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" v-if="item.priority == 'Penting'" class="red">
                    {{ item.note }}
                </td>
                <td :colspan="headers.length" v-if="item.priority == 'Tidak penting'" class="blue">
                    {{ item.note }}
                </td>
                <td :colspan="headers.length" v-if="item.priority == 'Biasa'" class="green">
                    {{ item.note }}
                </td>
              </template> -->
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} customer</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="id_customer"
              label="ID Customer"
              outlined
              dense
              full-width
              required
              disabled
            ></v-text-field>
            <v-text-field
              v-model="nama"
              label="Nama"
              outlined
              dense
              full-width
              required
              disabled
            ></v-text-field>
            <v-text-field
              v-model="alamat"
              label="Alamat"
              outlined
              dense
              full-width
              required
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
                  v-model="tgl_lahir"
                  label="Tanggal Lahir"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  disabled
                ></v-text-field>
              </template>
              <v-date-picker v-model="tgl_lahir" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(tgl_lahir)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-radio-group v-model="jenis_kelamin" disabled row label="Gender">
              <v-radio label="Male" value="Laki-laki"></v-radio>
              <v-radio label="Female" value="Perempuan"></v-radio>
            </v-radio-group>
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              dense
              full-width
              disabled
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              hint="Tanggal Lahir (YYYY-MM-DD)"
              persistent-hint
              outlined
              dense
              disabled
              full-width
            ></v-text-field>
            <v-text-field
            class="mt-5"
              v-model="no_telp"
              label="Telp"
              outlined
              dense
              full-width
              disabled
              required
              
            ></v-text-field>
            <v-file-input
                v-model="imageSim"
                label="Sim"
                outlined
                dense
                disabled
                @change="onFileChangeSim"
              ></v-file-input>
              <v-file-input
                v-model="imageIdentitas"
                label="Identitas"
                outlined
                required
                dense
                disabled
                @change="onFileChangeIdentitas"
              ></v-file-input>
              <h4>Preview</h4>
              <v-img
                :src="imageStoreURLSim"
                style="border: 1px dashed #ccc; min-height: 10px"
              />
              <h4>Preview</h4>
              <v-img
                :src="imageStoreURLIdentitas"
                style="border: 1px dashed #ccc; min-height: 10px"
              />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#1c549c" text @click="cancel"> Cancel </v-btn>
          <v-btn color="#1c549c" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text>Anda Yakin ingin menghapus customer ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#1c549c" text @click="dialogConfirm = false">
            Cancel
          </v-btn>
          <v-btn color="#1c549c" text @click="deleteData"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
      error_message
    }}</v-snackbar>
  </v-main>
</template>

<script>
export default {
  name: "DataCustomer",
  data() {
    return {
      image: undefined,
      // to save image url
      imageUrl: "",
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      email: "",
      no_telp: "",
      password: "",
      imageStoreURL: "",
      headers: [
        { text: "ID Customer", align: "start", sortable: true, value: "id_customer" },
        { text: "Nama", value: "nama" },
        { text: "Alamat", value: "alamat" },
        { text: "Tanggal Lahir", value: "tgl_lahir" },
        { text: "Jenis Kelamin", value: "jenis_kelamin" },
        { text: "Email", value: "email" },
        { text: "No Telp", value: "no_telp" },
        { text: "Password", value: "password" },
        { text: "Status", value: "status_customer" },
        { text: "SIM", value: "sim" },
        { text: "Identitas", value: "identitas" },
        { text: "Actions", value: "actions" },
      ],
      customer: new FormData(),
      customers: [],
      deleteId: "",
      editId: "",
    };
  },

  methods: {
    createImage(file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        this.imageUrl = e.target.result;
        this.getImageStorageURL(this.imageUrl);
      };

      reader.readAsDataURL(file);
    },
    onFileChange(file) {
      if (!file) {
        return;
      }
      this.createImage(file);
    },
    setForm() {
      if (this.inputType !== "Tambah") {
        this.update();
      } else {
        this.save();
      }
    },
    //Read Data Courses
    readData() {
      var url = this.$api + "/customer";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.customers = response.data.data;
        });
    },
    // Save data course
    save() {
      this.customer.append("id_customer", this.id_customer);
      this.customer.append("nama", this.nama);
      this.customer.append("alamat", this.alamat);
      this.customer.append("tgl_lahir", this.tgl_lahir);
      this.customer.append("jenis_kelamin", this.jenis_kelamin);
      this.customer.append("email", this.email);
      this.customer.append("no_telp", this.no_telp);
      this.customer.append("password", this.password);
      this.customer.append("foto", this.imageStoreURL);

      var url = this.$api + "/customer/store";
      this.load = true;
      this.$http
        .post(url, this.customer, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.close();
          this.readData(); //local data
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    // update data course
    update() {
      let newData = {
        id_role: this.id_role,
        nama: this.nama,
        alamat: this.alamat,
        tgl_lahir: this.tgl_lahir,
        jenis_kelamin: this.jenis_kelamin,
        email: this.email,
        no_telp: this.no_telp,
        password: this.password,
        foto: this.imageStoreURL,
      };
      var url = this.$api + "/customer/update/" + this.editId;
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
          this.load = false;
          this.close();
          this.readData(); //local data
          this.resetForm();
          this.inputType = "Tambah";
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
      var url = this.$api + "/customer/delete/" + this.deleteId;
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
          this.close();
          this.readData(); //local data
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    editItem(item) {
      this.inputType = "Edit";
      this.editId = item.id_customer;
      this.id_customer = item.id_customer
      this.nama = item.nama;
      this.alamat = item.alamat;
      this.tgl_lahir = item.tgl_lahir;
      this.jenis_kelamin = item.jenis_kelamin;
      this.email = item.email;
      this.no_telp = item.no_telp;
      this.password = item.password;
      this.imageStoreURLSim = item.sim;
      this.imageUrlSim = item.sim;
      this.imageStoreURLIdentitas = item.identitas;
      this.imageUrlIdentitas = item.identitas;
      this.dialog = true;
    },
    deleteItem(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.readData();
    },
    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.id_role = "";
      this.nama = "";
      this.alamat = "";
      this.tgl_lahir = "";
      this.jenis_kelamin = "";
      this.email = "";
      this.no_telp = "";
      this.password = "";
      this.image = "";
      this.imageUrl = "",
      this.dialog = false;
    },
    getImageStorageURL(foto) {
      let newData = {
        imgB64: foto,
      };
      var url = this.$api + "/customer/storeimage";
      this.$http
        .post(url, newData)
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.imageStoreURL = response.data.data;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
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
  computed: {
    formTitle() {
      return this.inputType;
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
h3 {
  text-align: center;
}
</style>