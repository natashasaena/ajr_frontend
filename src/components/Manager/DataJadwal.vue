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
      <v-data-table :headers="headers" :items="detailjadwals" :search="search">
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
            @click="deleteItem(item)"
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
          <span class="headline">{{ formTitle }} Jadwal</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-autocomplete
              v-model="id_pegawai"
              :items="pegawais"
              item-value="id_pegawai"
              item-text="nama"
              label="Nama Pegawai"
              outlined
              dense
              full-width
            />
            <v-autocomplete
              v-model="hari"
              :items="hari_shift"
              label="hari"
              item-value="hari"
              item-text="hari"
              outlined
              dense
              full-width
              required
            ></v-autocomplete>
            <v-select
              v-model="shift"
              :items="id_shift"
              label="hari"
              item-value="shift"
              item-text="shift"
              outlined
              dense
              full-width
              required
            ></v-select>
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
        <v-card-text>Anda Yakin ingin menghapus jadwal ini?</v-card-text>
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
  name: "DataJadwal",
  data() {
    return {
      id_jadwal: "",
      id_pegawai: "",
      shift: "",
      diskon: "",
      status: "Aktif",
      deleteId: "",
      editId: "",
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
      dialogConfirmEdit: false,
      headers: [
        { text: "Nama", align: "start", sortable: true, value: "nama" },
        { text: "Shift", value: "shift" },
        { text: "Hari", value: "hari" },
        { text: "Actions", value: "actions" },
      ],
      detailjadwal: new FormData(),
      detailjadwals: [],
      pegawais: [],
      hari_shift: [
        { id: 1, hari: "Selasa" },
        { id: 2, hari: "Rabu" },
        { id: 3, hari: "Kamis" },
        { id: 1, hari: "Jumat" },
        { id: 2, hari: "Sabtu" },
        { id: 3, hari: "Minggu" },
      ],
      id_shift: [
        { id: 1, shift: 1 },
        { id: 2, shift: 2 },
      ],
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
      var url = this.$api + "/detailjadwal";
      var urlPeg = this.$api + "/pegawai";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.detailjadwals = response.data.data;
          return this.$http.get(urlPeg, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          //this.kode_jadwal = response.data.data.kode_jadwal;
          //this.jenis_jadwal = response.data.data.jenis_jadwal;
          //this.keterangan = response.data.data.keterangan;
          //this.diskon = response.data.data.besar_diskon;
          //this.status = response.data.data.status_jadwal
        })
        .then((response) => {
          this.pegawais = response.data.data;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    // Save data course
    save() {
      this.detailjadwal.append("id_pegawai", this.id_pegawai);

      var url = this.$api + "/jadwal/get/" + this.hari + "/" + this.shift;
      var url1 = this.$api + "/detailjadwal/store";
      this.load = true;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.detailjadwal.append("id_jadwal", response.data.data.id_jadwal);
          return this.$http.post(url1, this.detailjadwal, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
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
        id_pegawai: this.id_pegawai,
        id_jadwal: null,
      };
      var url = this.$api + "/jadwal/get/" + this.hari + "/" + this.shift;
      this.load = true;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          newData.id_jadwal = response.data.data.id_jadwal;
          var url1 =
            this.$api +
            "/detailjadwal/update/" +
            this.editId +
            "/" +
            this.idJadwalEdit;
          return this.$http.put(url1, newData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
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
      var url =
        this.$api +
        "/detailjadwal/delete/" +
        this.deleteId +
        "/" +
        this.idJadwalDelete;
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
      this.editId = item.id_pegawai;
      this.idJadwalEdit = item.id_jadwal;
      this.id_pegawai = item.id_pegawai;
      this.hari = item.hari;
      this.shift = item.shift;
      this.dialog = true;
    },
    deleteItem(item) {
      this.deleteId = item.id_pegawai;
      this.idJadwalDelete = item.id_jadwal;
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
      this.id_pegawai = "";
      this.hari = "";
      this.shift = "";
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
