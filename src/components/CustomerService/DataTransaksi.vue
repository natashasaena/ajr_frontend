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
      <v-data-table :headers="headers" :items="transaksis" :search="search">
        <template v-slot:[`item.bukti_pembayaran`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.bukti_pembayaran"
              height="50px"
              width="50px"
            ></v-img>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
        <!--   <v-icon
            aria-label="update"
            role="button"
            aria-hidden="false"
            color="green"
            small
            class="mr-1"
            @click="editItem(item)"
            >mdi-pencil</v-icon
          > -->
          <!-- <v-icon
            aria-label="delete"
            role="button"
            aria-hidden="false"
            color="red"
            small
            class="ml-1"
            @click="deleteItem(item.id_transaksi)"
            >mdi-delete
          </v-icon> -->
          <!-- <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>-->
          <!-- <v-btn  aria-label="update" small @click="editItem(item)">Receipt</v-btn>  -->
           <v-btn
            small
            aria-label="update"
            color="#e8aa09"
             width="90px"
            text-dark
            class="my-2"
            @click="editItem(item)"
            >Status</v-btn
          >
          <v-btn
            small
            color="#e8aa09"
            text-dark
            width="90px"
            class="my-2"
            @click="notaItem(item)"
            >Receipt</v-btn
          >
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
          <span class="headline">{{ formTitle }} transaksi</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="id_transaksi"
              label="ID transaksi"
              outlined
              required
              disabled
            ></v-text-field>
            <v-text-field
              v-model="id_driver"
              label="ID Driver"
              outlined
              required
              disabled
            ></v-text-field>
            <v-text-field
              v-model="id_customer"
              label="ID Customer"
              outlined
              required
              disabled
            ></v-text-field>
            <v-text-field
              v-model="id_mobil"
              label="ID Mobil"
              outlined
              required
              disabled
            ></v-text-field>
            <v-text-field
              v-model="id_pegawai"
              label="ID Pegawai"
              outlined
              required
              disabled
            ></v-text-field>
            <v-select
              v-model="status_penyewaan"
              :items="status_transaksi"
              item-value="status"
              item-text="status"
              label="Status Penyewaan"
              outlined
              required
            />
           
            <v-file-input
              v-model="image"
              type="file"
              class="input"
              label="Bukti Pembayaran"
              hint="Add a picture of youre license"
              outlined
              disabled
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
          <v-btn color="#1c549c" text @click="cancel"> Cancel </v-btn>
          <v-btn color="#1c549c" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<v-dialog v-model="dialogNota" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <!--<span class="headline">{{ formTitle }} transaksi</span> -->
        </v-card-title>
        <v-card-text>
          <v-container>
            <div id="cetak">
            <v-card color="#afccf1" class="mx-14" width="400px" elevation="7">
              <v-card-title class="justify-center">
                Nota Pembayaran
              </v-card-title>
              <v-card-text>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6" class="mb-1">
                    <h6>{{ id_transaksi }}</h6>
                  </v-col>
                  <v-col cols="6" class="mb-1">
                    <h6>{{ tgl_transaksi }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>Customer</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ nama_customer }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>CS</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ nama_pegawai }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>Driver</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ nama_driver }}</h6>
                  </v-col>
                
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>Tgl Mulai</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ tgl_mulai_sewa }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>Tgl Selesai</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ tgl_selesai }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>Tgl Pengembalian</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ tgl_pengembalian }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>Item</strong></h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6" class="ms-2">
                    <h6>{{ nama_mobil }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6" class="ms-2">
                    <h6>{{ nama_driver }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>SubTotal</strong></h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ sub_total }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>Denda</strong></h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ total_denda }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>Promo</strong></h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ total_diskon }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6" class="mb-3">
                    <h6><strong>Total</strong></h6>
                  </v-col>
                  <v-col cols="6" class="mb-3">
                    <h6>{{ total_harga_bayar }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-row no-gutters class="ms-3">
              <v-col cols="6" class="mb-10"> </v-col>
              <v-col cols="6" class="mb-10"> </v-col>
              <v-col cols="4"> </v-col>
            </v-row>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#1c549c" text @click="cancel"> Cancel </v-btn>
          <v-btn color="#1c549c" text @click="createPDF"> Download </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text>Anda Yakin ingin menghapus transaksi ini?</v-card-text>
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  name: "DataTransaksi",
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
      id_transaksi: "",
      id_pegawai: "",
      id_customer: "",
      id_driver: "",
      id_mobil: "",
      id_promo:"",
      imageStoreURL: "",
      headers: [
        { text: "ID", align: "start", sortable: true ,value: "id_tr" },
        { text: "ID Transaksi", value: "id_transaksi" },
        { text: "ID Pegawai", value: "id_pegawai" },
        { text: "ID Driver", value: "id_driver" },
        { text: "ID Customer", value: "id_customer" },
        { text: "ID Mobil", value: "id_mobil" },
        { text: "Jenis Penyewaan", value: "jenis_penyewaan" },
        { text: "Tgl Transaksi", value: "tgl_transaksi" },
        { text: "Tgl Mulai Sewa", value: "tgl_mulai_sewa" },
        { text: "Tgl Selesai Sewa", value: "tgl_selesai" },
        { text: "Tgl Pengembalian", value: "tgl_pengembalian" },
        { text: "Sub Total", value: "sub_total" },
        { text: "Status Penyewaan", value: "status_penyewaan" },
        { text: "Tgl Pembayaran", value: "tgl_pembayaran" },
        { text: "Metode Pembayaran", value: "metode_pembayaran" },
        { text: "Total Diskon", value: "total_diskon" },
        { text: "Total Denda", value: "total_denda" },
        { text: "Total Bayar", value: "total_harga_bayar" },
        { text: "Bukti Pembayaran", value: "bukti_pembayaran" },
        { text: "Actions", value: "actions" },
      ],
      transaksi: new FormData(),
      transaksis: [],
      customers: [],
      drivers: [],
      pegawais: [],
      mobils: [],
      promos: [],
      deleteId: "",
      editId: "",
      status_transaksi: [
        { id: 1, status: "Belum Diverifikasi" },
        { id: 2, status: "Sedang Berjalan" },
        { id: 3, status: "Pembayaran Berhasil" },
        { id: 4, status: "Pembayaran Gagal" },
      ],
    };
  },

  methods: {
    createPDF() {
      window.html2canvas = html2canvas;
      var doc = new jsPDF("p", "mm", "a4");
      doc.margin = {
        horiz: 33,
        vert: 20,
      };
      html2canvas(document.getElementById("cetak"), {
        allowTaint: true,
        useCORS: true,
        scale: 10,
      }).then((canvas) => {
        //document.body.appendChild(canvas);
        doc.addImage(canvas.toDataURL("image/png"), "PNG", doc.margin.horiz, doc.margin.vert, 150, 150);
        doc.save("nota.pdf");
      });
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
    getImageStorageURL(bukti_pembayaran) {
      let newData = {
        imgB64: bukti_pembayaran,
      };
      var url = this.$api + "/transaksi/storeimage";
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
    setForm() {
      if (this.inputType !== "Tambah") {
        this.update();
      } else {
        this.save();
      }
    },
    //Read Data Courses
    readData() {
      var url = this.$api + "/transaksi";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.transaksis = response.data.data;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    rating(){

    },
    // Save data course
    save() {
      this.transaksi.append("id_transaksi", this.id_transaksi);
      this.transaksi.append("id_customer", this.id_customer);
      this.transaksi.append("id_driver", this.id_driver);
      this.transaksi.append("id_pegawai", this.id_pegawai);
      this.transaksi.append("id_mobil", this.id_mobil);
      this.transaksi.append("status_penyewaan", this.status_penyewaan);
      this.transaksi.append("jenis_penyewaan", this.jenis_penyewaan);
      this.transaksi.append("tgl_transaksi", this.tgl_transaksi);
      this.transaksi.append("tgl_mulai_sewa", this.tgl_mulai_sewa);
      this.transaksi.append("tgl_selesai", this.tgl_selesai);
      this.transaksi.append("tgl_pengembalian", this.tgl_pengembalian);
      this.transaksi.append("sub_total", this.sub_total);
      this.transaksi.append("tgl_pembayaran", this.tgl_pembayaran);
      this.transaksi.append("metode_pembayaran", this.metode_pembayaran);
      this.transaksi.append("total_diskon", this.total_diskon);
      this.transaksi.append("total_denda", this.total_denda);
      this.transaksi.append("total_harga_bayar", this.total_harga_bayar);

      this.transaksi.append("bukti_pembayaran", this.imageStoreURL);

      var url = this.$api + "/transaksi/store";
      this.load = true;
      this.$http
        .post(url, this.transaksi, {
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
        id_transaksi: this.id_transaksi,
        id_customer: this.id_customer,
        id_driver: this.id_driver,
        id_pegawai: this.id_pegawai,
        id_mobil: this.id_mobil,
        id_promo: this.id_promo,
        jenis_penyewaan: this.jenis_penyewaan,
        tgl_transaksi: this.tgl_transaksi,
        tgl_mulai_sewa: this.tgl_mulai_sewa,
        tgl_selesai: this.tgl_selesai,
        tgl_pengembalian: this.tgl_pengembalian,
        sub_total: this.sub_total,
        status_penyewaan: this.status_penyewaan,
        tgl_pembayaran: this.tgl_pembayaran,
        metode_pembayaran: this.metode_pembayaran,
        total_diskon: this.total_diskon,
        total_denda: this.total_denda,
        total_harga_bayar: this.total_harga_bayar,
        bukti_pembayaran: this.imageStoreURL,
       
      };
      var url = this.$api + "/transaksi/update/" + this.editId;
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
      var url = this.$api + "/transaksi/delete/" + this.deleteId;
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
      this.editId = item.id_transaksi;
      this.id_transaksi = item.id_transaksi;
      this.id_customer = item.id_customer;
      this.nama_pegawai = item.nama_pegawai;
      this.id_driver = item.id_driver;
      this.id_mobil = item.id_mobil;
      this.id_pegawai = item.id_pegawai;
      this.status_penyewaan = item.status_penyewaan;
      this.jenis_penyewaan = item.jenis_penyewaan;
      this.tgl_transaksi = item.tgl_transaksi;
      this.tgl_mulai_sewa = item.tgl_mulai_sewa;
      this.tgl_selesai = item.tgl_selesai;
      this.tgl_pengembalian = item.tgl_pengembalian;
      this.sub_total = item.sub_total;
      this.tgl_pembayaran = item.tgl_pembayaran;
      this.metode_pembayaran = item.metode_pembayaran;
      this.total_diskon = item.total_diskon;
      this.total_denda = item.total_denda;
      this.total_harga_bayar = item.total_harga_bayar;
      this.imageStoreURL = item.bukti_pembayaran;
      this.imageUrl = item.bukti_pembayaran;
      this.dialog = true;
    },
    notaItem(item){
      this.inputType = "Edit";
      this.editId = item.id_transaksi;
      this.nama_customer = item.nama_customer;
      this.nama_driver = item.nama_driver;
      this.nama_pegawai = item.nama_pegawai;
      this.nama_mobil = item.nama_mobil;
      this.id_transaksi = item.id_transaksi;
      this.id_customer = item.id_customer;
      this.id_driver = item.id_driver;
      this.id_mobil = item.id_mobil;
      this.id_pegawai = item.id_pegawai;
      this.status_penyewaan = item.status_penyewaan;
      this.jenis_penyewaan = item.jenis_penyewaan;
      this.tgl_transaksi = item.tgl_transaksi;
      this.tgl_mulai_sewa = item.tgl_mulai_sewa;
      this.tgl_selesai = item.tgl_selesai;
      this.tgl_pengembalian = item.tgl_pengembalian;
      this.sub_total = item.sub_total;
      this.tgl_pembayaran = item.tgl_pembayaran;
      this.metode_pembayaran = item.metode_pembayaran;
      this.total_diskon = item.total_diskon;
      this.total_denda = item.total_denda;
      this.total_harga_bayar = item.total_harga_bayar;
      this.imageStoreURL = item.bukti_pembayaran;
      this.imageUrl = item.bukti_pembayaran;
      this.dialogNota = true;
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
      this.dialogNota = false;
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
      (this.imageUrl = ""), (this.dialog = false);
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
.v-text-field {
  width: 400px;
  justify-content: center;
}
</style>
