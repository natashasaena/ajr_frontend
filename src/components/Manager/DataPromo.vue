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
      <v-data-table :headers="headers" :items="promos" :search="search">
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
            @click="deleteItem(item.id_promo)"
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
          <span class="headline">{{ formTitle }} Promo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="kode_promo"
              label="Kode Promo"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-select
              v-model="jenis_promo"
              :items="promo_jenis"
              label="Jenis"
              outlined
              item-value="jenis"
              item-text="jenis"
              dense
              full-width
              required
            ></v-select>
            <!-- <v-text-field
              v-model="jenis_promo"
              label="Jenis Promo"
              outlined
              dense
              full-width
              required
            ></v-text-field> -->
            <v-textarea
              v-model="keterangan"
              label="Keterangan"
              outlined
              dense
              full-width
              required
            ></v-textarea>
            <v-text-field
              v-model="diskon"
              label="Diskon"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <!-- <v-select
              v-model="status"
              :items="status_promo"
              label="Status"
              outlined
              dense
              full-width
              required
            ></v-select>  -->
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
        <v-card-text>Anda Yakin ingin menghapus Promo ini?</v-card-text>
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
  name: "DataPromo",
  data() {
    return {
      kode_promo: "",
      jenis_promo: "",
      keterangan: "",
      diskon: "",
      status: "Aktif",
      deleteId: "",
      editId: "",
      status_promo: [" Aktif", " Tidak Aktif"],
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
        { text: "ID", align: "start", sortable: true, value: "id_promo"},
        { text: "Kode Promo", value: "kode_promo" },
        { text: "Jenis Promo", value: "jenis_promo" },
        { text: "Keterangan", value: "keterangan" },
        { text: "Diskon", value: "besar_diskon" },
        { text: "Status", value: "status_promo" },
        { text: "Actions", value: "actions" },
      ],
      promo: new FormData(),
      promos: [],
      promo_jenis: [
        { id_promo: 1, jenis: "Pelajar & Mahasiswa" },
        { id_promo: 2, jenis: "Weekend" },
        { id_promo: 3, jenis: "Mudik" },
        { id_promo: 4, jenis: "Ulang Tahun" },
      ]
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
        //this.update();
        this.dialogConfirmEdit = true;
      } else {
        this.save();
      }
    },
    //Read Data Courses
    readData() {
      var url = this.$api + "/promo";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.promos = response.data.data;
          //this.kode_promo = response.data.data.kode_promo;
          //this.jenis_promo = response.data.data.jenis_promo;
          //this.keterangan = response.data.data.keterangan;
          //this.diskon = response.data.data.besar_diskon;
          //this.status = response.data.data.status_promo
        });
    },
    // Save data course
    save() {
      this.promo.append("kode_promo", this.kode_promo);
      this.promo.append("jenis_promo", this.jenis_promo);
      this.promo.append("keterangan", this.keterangan);
      this.promo.append("besar_diskon", this.diskon);
      this.promo.append("status_promo", this.status);

      var url = this.$api + "/promo/store";
      this.load = true;
      this.$http
        .post(url, this.promo, {
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
        kode_promo: this.kode_promo,
        jenis_promo: this.jenis_promo,
        keterangan: this.keterangan,
        besar_diskon: this.diskon,
        status_promo: this.status,
      };
      var url = this.$api + "/promo/update/" + this.editId;
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
      var url = this.$api + "/promo/delete/" + this.deleteId;
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
      this.editId = item.id_promo;
      this.kode_promo = item.kode_promo;
      this.jenis_promo = item.jenis_promo;
      this.keterangan = item.keterangan;
      this.diskon = item.besar_diskon;
      this.status = item.status_promo;
      this.dialog = true;
    },
    deleteItem(id_promo) {
      this.deleteId = id_promo;
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
      this.kode_promo= '';
      this.jenis_promo= '';
      this.keterangan= '';
      this.diskon= '';
      this.kode_promo= '';
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
