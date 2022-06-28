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
      <v-data-table :headers="headers" :items="drivers" :search="search">
        <template v-slot:[`item.sim`]="{ item }">
          <div class="p-2">
            <v-img :src="item.sim" height="100px" width="100px"></v-img>
          </div>
        </template>
        <template v-slot:[`item.surat_bebas_napza`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.surat_bebas_napza"
              height="100px"
              width="100px"
            ></v-img>
          </div>
        </template>
        <template v-slot:[`item.surat_kesehatan_jiwa`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.surat_kesehatan_jiwa"
              height="100px"
              width="100px"
            ></v-img>
          </div>
        </template>
        <template v-slot:[`item.skck`]="{ item }">
          <div class="p-2">
            <v-img :src="item.skck" height="100px" width="100px"></v-img>
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
            @click="deleteItem(item.id_driver)"
            >mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Driver</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="id_driver"
              label="ID Driver"
              outlined
              dense
              full-width
              disabled
            ></v-text-field>
            <v-text-field
              v-model="nama"
              label="Nama"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="alamat"
              label="Alamat"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <!-- <v-text-field
              v-model="status_driver"
              label="Status"
              outlined
              dense
              full-width
              required
              disabled
            ></v-text-field> -->
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
            <v-radio-group v-model="jenis_kelamin" row label="Gender">
              <v-radio label="Laki-laki" value="Laki-laki"></v-radio>
              <v-radio label="Perempuan" value="Perempuan"></v-radio>
            </v-radio-group>
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              dense
              full-width
              disabled
            ></v-text-field>
            <v-text-field
              v-model="no_telp"
              label="Telp"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-radio-group v-model="bahasa" row label="Bahasa">
              <v-radio label="Indonesia" value="Indonesia"></v-radio>
              <v-radio
                label="Indonesia & Inggris"
                value="Indonesia & Inggris"
              ></v-radio>
            </v-radio-group>

            <v-radio-group v-model="status" row label="Status">
              <v-radio label="Available" value="Available"></v-radio>
              <v-radio label="Not Available" value="Not Available"></v-radio>
            </v-radio-group>
            <v-text-field
              v-model="tarif"
              label="Tarif"
              outlined
              dense
              full-width
              required
            ></v-text-field>

            <v-file-input
              v-model="image"
              type="file"
              class="input"
              label="Add Driver License"
              hint="Add a picture of youre license"
              outlined
              dense
              @change="onFileChange"
            />
            <h4>Preview</h4>
            <v-img
              :src="imageUrl"
              style="border: 1px dashed #ccc; min-height: 250px"
            />

            <v-file-input
              v-model="image2"
              type="file"
              class="input mt-10"
              label="Add Driver License"
              hint="Add a picture of youre license"
              outlined
              dense
              @change="onFileChange2"
            />
            <h4>Preview</h4>
            <v-img
              :src="imageUrl2"
              style="border: 1px dashed #ccc; min-height: 250px"
            />
            <v-file-input
              v-model="image3"
              type="file"
              class="input mt-10"
              label="Add Driver License"
              hint="Add a picture of youre license"
              outlined
              dense
              @change="onFileChange3"
            />
            <h4>Preview</h4>
            <v-img
              :src="imageUrl3"
              style="border: 1px dashed #ccc; min-height: 250px"
            />
            <v-file-input
              v-model="image4"
              type="file"
              class="input mt-10"
              label="Add Driver License"
              hint="Add a picture of youre license"
              outlined
              dense
              @change="onFileChange4"
            />
            <h4>Preview</h4>
            <v-img
              :src="imageUrl4"
              style="border: 1px dashed #ccc; min-height: 250px"
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
        <v-card-text>Anda Yakin ingin menghapus driver ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#1c549c" text @click="dialogConfirm = false">
            Cancel
          </v-btn>
          <v-btn color="#1c549c" text @click="deleteData"> Delete </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
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
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
      error_message
    }}</v-snackbar>
  </v-main>
</template>

<script>
export default {
  name: "DataDriver",
  data() {
    return {
      image: undefined,
      image2: undefined,
      image3: undefined,
      image4: undefined,
      // to save image url
      imageUrl: "",
      imageUrl2: "",
      imageUrl3: "",
      imageUrl4: "",
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
      dialogConfirmEdit: false,
      nama: "",
      alamat: "",
      tgl_lahir: "",
      jenis_kelamin: "",
      email: "",
      no_telp: "",
      password: "",
      bahasa: "",
      status: "",
      rerata: null,
      tarif: "",

      imageStoreURL: "",
      imageStoreURL2: "",
      imageStoreURL3: "",
      imageStoreURL4: "",
      headers: [
        { text: "ID", align: "start", sortable: true, value: "id" },
        { text: "ID Driver", value: "id_driver" },
        { text: "Nama", value: "nama" },
        { text: "Alamat", value: "alamat" },
        { text: "Tanggal Lahir", value: "tgl_lahir" },
        { text: "Jenis Kelamin", value: "jenis_kelamin" },
        { text: "Email", value: "email" },
        { text: "Password", value: "password" },
        { text: "No Telp", value: "no_telp" },
        { text: "Bahasa", value: "bahasa" },
        { text: "Status Ketersediaan", value: "status_ketersediaan" },
        { text: "Tarif", value: "tarif_driver" },
        { text: "Rerata Rating", value: "rerata_rating" },
        { text: "Status Driver", value: "status_driver" },
        { text: "SIM", value: "sim" },
        { text: "Surat Bebas Napza", value: "surat_bebas_napza" },
        { text: "Surat Kesehatan Jiwa", value: "surat_kesehatan_jiwa" },
        { text: "SKCK", value: "skck" },
        { text: "Actions", value: "actions" },
      ],
      driver: new FormData(),
      drivers: [],
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
        //this.update();
        this.dialogConfirmEdit = true;
      } else {
        this.save();
      }
    },
    //Read Data Courses
    readData() {
      var url = this.$api + "/driver";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.drivers = response.data.data;
        });
    },
    // Save data course
    save() {
      this.driver.append("nama", this.nama);
      this.driver.append("alamat", this.alamat);
      this.driver.append("tgl_lahir", this.tgl_lahir);
      this.driver.append("jenis_kelamin", this.jenis_kelamin);
      this.driver.append("email", this.email);
      this.driver.append("no_telp", this.no_telp);
      this.driver.append("bahasa", this.bahasa);
      this.driver.append("status_ketersediaan", this.status);
      this.driver.append("password", this.password);
      this.driver.append("tarif_driver", this.tarif);
      this.driver.append("sim", this.imageStoreURL);
      this.driver.append("surat_bebas_napza", this.imageStoreURL2);
      this.driver.append("surat_kesehatan_jiwa", this.imageStoreURL3);
      this.driver.append("skck", this.imageStoreURL4);

      var url = this.$api + "/driver/store";
      this.load = true;
      this.$http
        .post(url, this.driver, {
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
        nama: this.nama,
        alamat: this.alamat,
        tgl_lahir: this.tgl_lahir,
        jenis_kelamin: this.jenis_kelamin,
        email: this.email,
        no_telp: this.no_telp,
        bahasa: this.bahasa,
        status_ketersediaan: this.status,
        tarif_driver: this.tarif,
        rerata_rating: this.rerata,
        status_driver: this.status_driver,
        password: this.password,
        sim: this.imageStoreURL,
        surat_bebas_napza: this.imageStoreURL2,
        surat_kesehatan_jiwa: this.imageStoreURL3,
        skck: this.imageStoreURL4,
      };
      var url = this.$api + "/driver/update/" + this.editId;
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
      var url = this.$api + "/driver/delete/" + this.deleteId;
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
      this.editId = item.id_driver;
      this.id_driver = item.id_driver;
      this.nama = item.nama;
      this.alamat = item.alamat;
      this.tgl_lahir = item.tgl_lahir;
      this.jenis_kelamin = item.jenis_kelamin;
      this.email = item.email;
      this.no_telp = item.no_telp;
      this.bahasa = item.bahasa;
      this.status = item.status_ketersediaan;
      this.rerata = item.rerata_rating;
      this.status_driver = item.status_driver;
      this.password = item.password;
      this.tarif = item.tarif_driver;
      this.imageStoreURL = item.sim;
      this.imageUrl = item.sim;
      this.imageStoreURL2 = item.surat_bebas_napza;
      this.imageUrl2 = item.surat_bebas_napza;
      this.imageStoreURL3 = item.surat_kesehatan_jiwa;
      this.imageUrl3 = item.surat_kesehatan_jiwa;
      this.imageStoreURL4 = item.skck;
      this.imageUrl4 = item.skck;
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
      this.dialogConfirmEdit = false;
      this.readData();
    },
    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.dialogConfirmEdit = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.id_driver = "";
      this.nama = "";
      this.alamat = "";
      this.tgl_lahir = "";
      this.jenis_kelamin = "";
      this.email = "";
      this.no_telp = "";
      this.password = "";
      this.bahasa = "";
      this.image = "";
      this.imageUrl = "";
      this.image2 = "";
      this.imageUrl2 = "";
      this.image3 = "";
      this.imageUrl3 = ""; 
      this.image4 = "";
      this.imageUrl4 = "";
      this.dialog = false;
    },
    getImageStorageURL(sim) {
      let newData = {
        imgB64: sim,
      };
      var url = this.$api + "/driver/storeimage";
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
    createImage2(file) {
      const reader2 = new FileReader();
      reader2.onloadend = (e) => {
        this.imageUrl2 = e.target.result;
        this.getImageStorageURL2(this.imageUrl2);
      };

      reader2.readAsDataURL(file);
    },
    onFileChange2(file) {
      if (!file) {
        return;
      }
      this.createImage2(file);
    },

    getImageStorageURL2(surat_bebas_napza) {
      let newData = {
        imgB64: surat_bebas_napza,
      };
      var url = this.$api + "/driver/storeimage";
      this.$http
        .post(url, newData)
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.imageStoreURL2 = response.data.data;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });
    },
     createImage3(file) {
      const reader3 = new FileReader();
      reader3.onloadend = (e) => {
        this.imageUrl3 = e.target.result;
        this.getImageStorageURL3(this.imageUrl3);
      };

      reader3.readAsDataURL(file);
    },
    onFileChange3(file) {
      if (!file) {
        return;
      }
      this.createImage3(file);
    },
    getImageStorageURL3(surat_kesehatan_jiwa) {
      let newData = {
        imgB64: surat_kesehatan_jiwa,
      };
      var url = this.$api + "/driver/storeimage";
      this.$http
        .post(url, newData)
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.imageStoreURL3 = response.data.data;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });
    },
    createImage4(file) {
      const reader4 = new FileReader();
      reader4.onloadend = (e) => {
        this.imageUrl4 = e.target.result;
        this.getImageStorageURL4(this.imageUrl4);
      };

      reader4.readAsDataURL(file);
    },
    onFileChange4(file) {
      if (!file) {
        return;
      }
      this.createImage4(file);
    },
    getImageStorageURL4(skck) {
      let newData = {
        imgB64: skck,
      };
      var url = this.$api + "/driver/storeimage";
      this.$http
        .post(url, newData)
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.imageStoreURL4 = response.data.data;
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