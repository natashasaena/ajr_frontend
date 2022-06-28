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
        
        <v-switch
          v-model="periode"
          label="Periode Akan Selesai"
          class="mr-5"
          color="orange"
          @change="showPeriode"
        ></v-switch>
       
        <v-btn color="#e8aa09" text-dark @click="dialog = true"> Tambah </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="mobils" :search="search">
        <template v-slot:[`item.foto`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.foto"
              alt="-"
              height="100px"
              width="100px"
            ></v-img>
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
            @click="deleteItem(item.id_mobil)"
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
          <span class="headline">{{ formTitle }} Mobil</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="nama"
              label="Nama"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="tipe"
              label="Tipe"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-select
              v-model="jenis_transmisi"
              :items="transmisi_mobil"
              item-value="transmisi"
              item-text="transmisi"
              label="Transmisi"
              outlined
              dense
              full-width
              required
            />
            <v-text-field
              v-model="bahan"
              label="Bahan Bakar"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="warna"
              label="Warna "
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="volume"
              label="Volume Bagasi"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="fasilitas"
              label="Fasilitas"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="kapasitas"
              label="Kapasitas"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="id_pemilik"
              label="ID Pemilik"
              outlined
              dense
              full-width
              :disabled="disabledPemilikMobil"
            ></v-text-field>
            <v-text-field
              v-model="plat"
              label="Plat Nomor"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-text-field
              v-model="stnk"
              label="STNK"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-select
              v-model="kategori_aset"
              :items="kategori_mobil"
              item-value="kategori"
              item-text="kategori"
              label="Kategori"
              outlined
              dense
              full-width
              @change="kategori"
            />
            <v-text-field
              v-model="harga"
              label="Harga Sewa"
              outlined
              dense
              full-width
              required
            ></v-text-field>
            <v-radio-group v-model="status" row label="Status">
              <v-radio label="Available" value="Available"></v-radio>
              <v-radio label="Not Available" value="Not Available"></v-radio>
            </v-radio-group>

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
                  v-model="tgl_servis"
                  label="Tanggal Terakhir Servis"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="tgl_servis"
                @input="menu = false"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>

            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="periode_mulai"
                  label="Periode Kontak Mulai"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :disabled="disabledKontrakMulai"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="periode_mulai"
                no-title
                @input="menu2 = false"
                :disabled="disabledKontrakMulai"
                scrollable
              >
              </v-date-picker>
            </v-menu>

            <v-menu
              ref="menu3"
              v-model="menu3"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="periode_akhir"
                  label="Periode Kontrak Selesai"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :disabled="disabledKontrakAkhir"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="periode_akhir"
                @input="menu3 = false"
                no-title
                scrollable
                :disabled="disabledKontrakAkhir"
              >
              </v-date-picker>
            </v-menu>

            <v-file-input
              v-model="image"
              type="file"
              class="input"
              label="Add Image"
              hint="Add a picture of youre license"
              outlined
              full-width
              dense
              @change="onFileChange"
            />
            <h4>Preview</h4>
            <v-img
              :src="imageUrl"
              style="border: 1px dashed #ccc; min-height: 250px"
            />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal" text @click="cancel"> Cancel </v-btn>
          <v-btn color="teal" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Mobil</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-menu
              v-model="menu4"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="periode_mulai"
                  label="Periode Kontak Mulai"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="periode_mulai"
                no-title
                @input="menu4 = false"
                scrollable
              >
              </v-date-picker>
            </v-menu>

            <v-menu
              ref="menu5"
              v-model="menu5"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="periode_akhir"
                  label="Periode Kontak Selesai"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="periode_akhir"
                @input="menu5 = false"
                no-title
                scrollable
              >
              </v-date-picker>
            </v-menu>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal" text @click="cancel"> Cancel </v-btn>
          <v-btn color="teal" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text>Anda Yakin ingin menghapus Mobil ini?</v-card-text>
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
  name: "DataMobil",
  data() {
    return {
      kategori_aset: 1,
      jenis_transmisi: 1,
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
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
      dialog2: false,
      dialogConfirm: false,
      dialogConfirmEdit: false,
      id_pemilik: "",
      nama: "",
      tipe: "",
      bahan: "",
      warna: "",
      volume: "",
      fasilitas: "",
      kapasitas: "",
      plat: "",
      stnk: "",
      harga: "",
      status: "Available",
      tgl_servis: "",
      periode_mulai: "",
      periode_akhir: "",
      imageStoreURL: "",
      headers: [
        { text: "ID", align: "start", sortable: true, value: "id_mobil" },
        { text: "ID Pemilik", value: "id_pemilik_mobil" },
        { text: "Nama", value: "nama_mobil" },
        { text: "Tipe", value: "tipe_mobil" },
        { text: "Transmisi", value: "jenis_transmisi" },
        { text: "Bahan Bakar", value: "jenis_bahan_bakar" },
        { text: "Warna", value: "warna_mobil" },
        { text: "Volume Bagasi", value: "volume_bagasi" },
        { text: "Fasilitas", value: "fasilitas" },
        { text: "Kapasitas", value: "kapasitas" },
        { text: "Plat Nomor", value: "plat_nomor" },
        { text: "Nomor STNK", value: "nomor_stnk" },
        { text: "Kategori", value: "kategori_aset" },
        { text: "Harga Sewa", value: "harga_sewa" },
        { text: "Status", value: "status_sewa" },
        { text: "Servis", value: "tgl_terakhir_servis" },
        { text: "Kontrak Mulai", value: "periode_kontrak_mulai" },
        { text: "Kontrak Selesai", value: "periode_kontrak_akhir" },
        { text: "Status", value: "status_mobil" },
        { text: "Image", value: "foto" },
        { text: "Actions", value: "actions" },
      ],
      mobil: new FormData(),
      mobils: [],
      deleteId: "",
      editId: "",
      transmisi_mobil: [
        { id: 1, transmisi: "AT" },
        { id: 2, transmisi: "MT" },
        { id: 3, transmisi: "CVT" },
      ],
      kategori_mobil: [
        { id: 1, kategori: "Aset Mitra" },
        { id: 2, kategori: "Aset Perusahaan" },
      ],
      disabledPemilikMobil: false,
      disabledKontrakMulai: false,
      disabledKontrakAkhir: false,
      periode: false,
    };
  },

  methods: {
    on() {
      this.disabledPemilikMobil = false;
      this.disabledKontrakMulai = false;
      this.disabledKontrakAkhir = false;
      if (this.id_pemilik == null) {
        this.id_pemilik = "";
      }

      if (this.periode_mulai == null) {
        this.periode_mulai = "";
      }

      if (this.periode_akhir == null) {
        this.periode_akhir = "";
      }
    },

    off() {
      this.id_pemilik = null;
      this.periode_mulai = null;
      this.periode_akhir = null;
      this.disabledPemilikMobil = true;
      this.disabledKontrakMulai = true;
      this.disabledKontrakAkhir = true;
    },

    kategori() {
      if (this.kategori_aset == "Aset Perusahaan") {
        this.off();
      } else if (this.kategori_aset == "Aset Mitra"){
        this.on();
      }
    },
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
        this.dialogConfirmEdit = true;
        //this.update();
      } else {
        this.save();
      }
    },
    //Read Data Courses
    readData() {
      var url = this.$api + "/mobil";
      var urlpemilik = this.$api + "/pemilikmobil";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.mobils = response.data.data;
          return this.$http.get(urlpemilik, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
        })
        .then((response) => {
          this.pemilik_mobils = response.data.data;
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
      this.mobil.append("id_pemilik_mobil", this.id_pemilik);
      this.mobil.append("nama_mobil", this.nama);
      this.mobil.append("tipe_mobil", this.tipe);
      this.mobil.append("jenis_transmisi", this.jenis_transmisi);
      this.mobil.append("jenis_bahan_bakar", this.bahan);
      this.mobil.append("warna_mobil", this.warna);
      this.mobil.append("volume_bagasi", this.volume);
      this.mobil.append("fasilitas", this.fasilitas);
      this.mobil.append("kapasitas", this.kapasitas);
      this.mobil.append("plat_nomor", this.plat);
      this.mobil.append("nomor_stnk", this.stnk);
      this.mobil.append("kategori_aset", this.kategori_aset);
      this.mobil.append("harga_sewa", this.harga);
      this.mobil.append("status_sewa", this.status);
      this.mobil.append("tgl_terakhir_servis", this.tgl_servis);
      this.mobil.append("periode_kontrak_mulai", this.periode_mulai);
      this.mobil.append("periode_kontrak_akhir", this.periode_akhir);
      this.mobil.append("status_mobil", this.status_mobil);
      this.mobil.append("foto", this.imageStoreURL);

      var url = this.$api + "/mobil/store";
      this.load = true;
      this.$http
        .post(url, this.mobil, {
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
        id_pemilik_mobil: this.id_pemilik,
        nama_mobil: this.nama,
        tipe_mobil: this.tipe,
        jenis_transmisi: this.jenis_transmisi,
        jenis_bahan_bakar: this.bahan,
        warna_mobil: this.warna,
        volume_bagasi: this.volume,
        fasilitas: this.fasilitas,
        kapasitas: this.kapasitas,
        plat_nomor: this.plat,
        nomor_stnk: this.stnk,
        kategori_aset: this.kategori_aset,
        harga_sewa: this.harga,
        status_sewa: this.status,
        tgl_terakhir_servis: this.tgl_servis,
        periode_kontrak_mulai: this.periode_mulai,
        periode_kontrak_akhir: this.periode_akhir,
        foto: this.imageStoreURL,
      };
      var url = this.$api + "/mobil/update/" + this.editId;
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
      var url = this.$api + "/mobil/delete/" + this.deleteId;
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
      this.editId = item.id_mobil;
      this.id_pemilik = item.id_pemilik_mobil;
      this.nama = item.nama_mobil;
      this.tipe = item.tipe_mobil;
      this.jenis_transmisi = item.jenis_transmisi;
      this.bahan = item.jenis_bahan_bakar;
      this.warna = item.warna_mobil;
      this.volume = item.volume_bagasi;
      this.fasilitas = item.fasilitas;
      this.kapasitas = item.kapasitas;
      this.plat = item.plat_nomor;
      this.stnk = item.nomor_stnk;
      this.jenis_kelamin = item.jenis_kelamin;
      this.kategori_aset = item.kategori_aset;
      this.harga = item.harga_sewa;
      this.status = item.status_sewa;
      this.tgl_servis = item.tgl_terakhir_servis;
      this.periode_mulai = item.periode_kontrak_mulai;
      this.periode_akhir = item.periode_kontrak_akhir;
      this.imageStoreURL = item.foto;
      this.imageUrl = item.foto;
      this.kategori();
      if(this.periode){
          this.dialog2 = true;
      }else{
        this.dialog = true;
      }
      
    },
    deleteItem(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.dialog2 = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.dialogConfirmEdit = false;
      this.periode = false;
      this.on();
      this.readData();
    },
    cancel() {
      this.on();
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialog2 = false;
      this.dialogConfirm = false;
      this.dialogConfirmEdit = false,
      this.periode = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.id_pemilik = "";
      this.nama = "";
      this.tipe = "";
      this.jenis_transmisi = "";
      this.bahan = "";
      this.warna = "";
      this.volume = "";
      this.fasilitas = "";
      this.kapasitas = "";
      this.plat = "";
      this.stnk = "";
      this.jenis_kelamin = "";
      this.kategori_aset = "";
      this.harga = "";
      this.status = "";
      this.tgl_servis = "";
      this.periode_mulai = "";
      this.periode_akhir = "";
      this.image = "";
      this.imageUrl = "";
    },
    getImageStorageURL(foto) {
      let newData = {
        imgB64: foto,
      };
      var url = this.$api + "/mobil/storeimage";
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

    showPeriode() {
      if (this.periode == true) {
        var url1 = this.$api + "/mobil/tampilkontrakakanhabis";
        this.$http
          .get(url1, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.mobils = response.data.data;
          });
      } else {
        var url2 = this.$api + "/mobil";
        this.$http
          .get(url2, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.mobils = response.data.data;
          });
      }
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
