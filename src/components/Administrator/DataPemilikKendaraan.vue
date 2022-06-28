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
      <v-data-table :headers="headers" :items="pemilikmobils" :search="search">
        <template v-slot:[`item.img_url`]="{ item }">
          <!-- <v-icon aria-label="update" role="button" aria-hidden="false" color="green" small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                  <v-icon aria-label="delete" role="button" aria-hidden="false" color="red" small class="ml-2" @click="deleteItem(item)">mdi-delete </v-icon> -->
          <v-img :src="item.img_url" style="border: 1px dashed #ccc" />
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            aria-label="update"
            role="button"
            aria-hidden="false"
            color="green"
            small
            class="mr-2"
            @click="editItem(item)"
            >mdi-pencil</v-icon
          >
          <v-icon
            aria-label="delete"
            role="button"
            aria-hidden="false"
            color="red"
            small
            class="ml-2"
            @click="deleteItem(item.id_pemilik_mobil)"
            >mdi-delete
          </v-icon>
          <!-- <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
          <v-btn small @click="deleteHandler(item.id)">delete</v-btn> -->
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Pemilik Mobil</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="form.nama"
              label="Name"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="form.no_ktp"
              label="ID Card Number"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="form.alamat"
              label="Address"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="form.no_telp"
              label="Phone Number"
              outlined
              dense
              full-width
              required
            ></v-text-field>

            <!-- <v-select
              v-model="form.status_pemilik"
              label="Status"
              :items="status"
              item-text="title"
              outlined
              dense
              full-width
              required
            ></v-select> -->
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="cancel"> Cancel </v-btn>
          <v-btn color="black" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text>Anda Yakin ingin menghapus data ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal" text @click="dialogConfirm = false">
            Cancel
          </v-btn>
          <v-btn color="teal" text @click="deleteData"> Delete </v-btn>
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
  name: "DataPemilikKendaraan",
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
      dialogConfirmEdit: false,
      imageStoreURL: "",
      headers: [
        {
          text: " ID",
          align: "start",
          sortable: true,
          value: "id_pemilik_mobil",
        },
        { text: " Full Name", value: "nama" },
        { text: "ID Card", value: "no_ktp" },
        { text: "Address", value: "alamat" },
        { text: "Phone Number", value: "no_telp" },
        { text: "Status", value: "status_pemilik" },
        { text: "Actions", value: "actions" },
      ],
      pemilikmobil: new FormData(),
      pemilikmobils: [],
      form: {
        nama: null,
        no_ktp: null,
        alamat: null,
        no_telp: null,
        status_pemilik: null,
      },
      deleteId: " ",
      editId: " ",
    };
  },

  methods: {
    /* createImage(file) {
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
    }, */
    setForm() {
      if (this.inputType !== "Tambah") {
        this.dialogConfirmEdit = true;
        //this.update();
      } else {
        this.save();
      }
    },
    //Read Data Courses
    readData() {
      var url = this.$api + "/pemilikmobil";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.pemilikmobils = response.data.data;
        });
    },
    // Save data course
    save() {
      this.pemilikmobil.append("nama", this.form.nama);
      this.pemilikmobil.append("no_ktp", this.form.no_ktp);
      this.pemilikmobil.append("alamat", this.form.alamat);
      this.pemilikmobil.append("no_telp", this.form.no_telp);
      this.pemilikmobil.append("status_pemilik", this.form.status_pemilik);

      var url = this.$api + "/pemilikmobil/store";
      this.load = true;
      this.$http
        .post(url, this.pemilikmobil, {
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
        nama: this.form.nama,
        no_ktp: this.form.no_ktp,
        alamat: this.form.alamat,
        no_telp: this.form.no_telp,
        status_pemilik: this.form.status_pemilik,
      };
      var url = this.$api + "/pemilikmobil/update/" + this.editId;
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
      var url = this.$api + "/pemilikmobil/delete/" + this.deleteId;
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
    //untuk tampil dimodal
    editItem(item) {
      this.inputType = "Edit";
      this.editId = item.id_pemilik_mobil;
      this.form.nama = item.nama;
      this.form.alamat = item.alamat;
      this.form.no_ktp = item.no_ktp;
      this.form.no_telp = item.no_telp;
      this.form.status_pemilik = this.status_pemilik;
      this.dialog = true;
    },
    deleteItem(id_pemilik_mobil) {
      this.deleteId = id_pemilik_mobil;
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
      this.form = {
        nama: null,
        alamat: null,
        no_ktp: null,
        no_telp: null,
        status_pemilik: null,
      };
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