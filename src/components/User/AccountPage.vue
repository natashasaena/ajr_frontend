<template>
  <div class="hello">
    <v-toolbar color="#e8aa09" dark height="80" elevation="0">
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
    </v-toolbar>

    <v-card max-width="700" class="mx-auto mt-5">
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
      <v-toolbar flat color="#e8aa09" dark>
        <v-toolbar-title>User Profile</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          <v-icon left> mdi-account </v-icon>
          Account
        </v-tab>
        <v-tab>
          <v-icon left> mdi-lock </v-icon>
          Riwayat
        </v-tab>
        <v-tab>
          <v-icon left> mdi-access-point </v-icon>
          Option 3
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-text-field
                v-model="id_customer"
                :rules="nameRules"
                label="ID Customer"
                outlined
                dense
                full-width
                disabled
                required
              ></v-text-field>
              <v-text-field
                v-model="fullname"
                :rules="nameRules"
                label="Full Name"
                outlined
                dense
                full-width
                required
              ></v-text-field>
              <v-text-field
                v-model="address"
                :rules="addressRules"
                label="Address"
                outlined
                dense
                full-width
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
                full-width
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
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
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
                full-width
                required
              ></v-text-field>
              <v-text-field
                :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="password"
                :type="show4 ? 'text' : 'password'"
                :rules="passwordRules"
                label="Password"
                outlined
                dense
                full-width
                @click:append="show4 = !show4"
                required
              ></v-text-field>
              <v-text-field
                v-model="status_customer"
                :rules="nameRules"
                label="Status Customer"
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
                :src="imageStoreURLSim"
                style="border: 1px dashed #ccc; min-height: 10px"
              />
              <h4>Preview</h4>
              <v-img
                :src="imageStoreURLIdentitas"
                style="border: 1px dashed #ccc; min-height: 10px"
              />
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-spacer></v-spacer>
              <!-- <v-btn color="#1c549c" text @click="cancel"> Cancel </v-btn> -->
              <v-btn color="#1c549c" text @click="dialogConfirmEdit = true"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
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
          <!-- <v-icon
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
            @click="deleteItem(item.id_transaksi)"
            >mdi-delete
          </v-icon> -->

          <v-btn
            v-if="show1"
            small
            color="#e8aa09"
            text-dark
            class="mr-4"
            @click="dialogReturnMobil(item)"
            >Return</v-btn
          >
          <v-btn
            v-if="show2"
            small
            aria-label="update"
            color="#e8aa09"
            text-dark
            class="mr-4"
            @click="editItem(item)"
            >Payment</v-btn
          >
          <v-btn
            v-if="show3"
            small
            color="#e8aa09"
            text-dark
            width="90px"
            class="mr-4"
            @click="editHandler(item)"
            >Receipt</v-btn
          >
          <v-btn
            small
            color="#e8aa09"
            text-dark
            width="90px"
            class="my-2"
            @click="rating(item)"
            :disabled="isValid"
            >Rating</v-btn
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
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis.
                Nam eget dui. Proin viverra, ligula sit amet ultrices semper,
                ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In
                dui magna, posuere eget, vestibulum et, tempor auctor, justo.
              </p>

              <p class="mb-0">
                Cras sagittis. Phasellus nec sem in justo pellentesque
                facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut,
                mi. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nam at tortor in tellus interdum sagittis.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
     <v-dialog v-model="dialog2" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <!--<span class="headline">{{ formTitle }} transaksi</span> -->
        </v-card-title>
        <v-card-text>
          <v-container>
            <div id="test">
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
                    <v-col cols="4"> </v-col>
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
            </div>
            <v-row no-gutters class="ms-3">
              <v-col cols="6" class="mb-10"> </v-col>
              <v-col cols="6" class="mb-10"> </v-col>
              <v-col cols="4"> </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#1c549c" text @click="dialog2 = false"> Cancel </v-btn>
          <v-btn color="#1c549c" text @click="createPDF"> Download </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog3" max-width="600px">
      <v-card>
        <v-card>
          <v-card-title class="text-h5">
            Beri Penilaian untuk Atma Jaya Rental</v-card-title
          >
          <v-card-text class="text-h7">
            Terima kasih telah menggunakan jasa Atma Jaya RentaL. Ayo beri
            penilaian untuk rental kami!
            <div class="text-center mt-12">
              <v-rating
                v-model="rating_rental"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                hover
                large
              ></v-rating>
              <v-textarea
                v-model="performa_rental"
                solo
                name="input-7-4"
                label="Berikan Ulasan untuk Rental Kami"
              ></v-textarea>
            </div>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>

        <v-card v-if="show">
          <v-card-title class="text-h5"> Beri Penilaian Driver</v-card-title>
          <v-card-text class="text-h7">
            Terima kasih telah menggunakan jasa driver Atma Jaya RentaL. Ayo
            beri penilaian untuk driver rental kami!
            <div class="text-center mt-12">
              <v-rating
                v-model="rating_driver"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                hover
                large
              ></v-rating>
            </div>
            <v-textarea
              class="text-center"
              v-model="performa_driver"
              solo
              label="Berikan Ulasan untuk Driver Rental Kami"
            ></v-textarea>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
        <v-card-actions class="justify-space-between">
          <v-btn text @click="dialog3 = false"> No Thanks </v-btn>
          <v-btn color="primary" text @click="rate"> Rate Now </v-btn>
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
     <v-snackbar v-model="snackbar" :color="color" timeout="1000" bottom>{{
        error_message
      }}</v-snackbar>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  name: "AccountPage",
  data() {
    return {
      dialog2: false,
      dialog3: false,
      snackbar: false,
      imageSim: undefined,
      imageIdentitas: undefined,
      imageUrlSim: "",
      imageUrlIdentitas: "",
      imageStoreURLSim: "",
      imageStoreURLIdentitas: "",
      show4: false,
      show1: false,
      show2: false,
      show3: true,
      show: true,
      data: "",
      fullname: "",
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
      headers: [
        {
          text: "ID Transaksi",
          align: "start",
          sortable: true,
          value: "id_transaksi",
        },
        //{ text: "ID Pegawai", value: "id_pegawai" },
        //{ text: "ID Driver", value: "id_driver" },
        //{ text: "ID Customer", value: "id_customer" },
        //{ text: "ID Mobil", value: "id_mobil" },
        //{ text: "Jenis Penyewaan", value: "jenis_penyewaan" },
        //{ text: "Tgl Transaksi", value: "tgl_transaksi" },
        //{ text: "Tgl Mulai Sewa", value: "tgl_mulai_sewa" },
        //{ text: "Tgl Selesai Sewa", value: "tgl_selesai" },
        //{ text: "Tgl Pengembalian", value: "tgl_pengembalian" },
        //{ text: "Sub Total", value: "sub_total" },
        //{ text: "Status Penyewaan", value: "status_penyewaan" },
        //{ text: "Tgl Pembayaran", value: "tgl_pembayaran" },
        //{ text: "Metode Pembayaran", value: "metode_pembayaran" },
        //{ text: "Total Diskon", value: "total_diskon" },
        //{ text: "Total Denda", value: "total_denda" },
        //{ text: "Total Bayar", value: "total_harga_bayar" },
        //{ text: "Bukti Pembayaran", value: "bukti_pembayaran" },
        { text: "Actions", value: "actions" },
      ],
       transaksi: new FormData(),
      transaksis: [],
      customers: [],
      drivers: [],
      pegawais: [],
      mobils: [],
      promos: [],
      menu: false,
      dialogConfirmEdit: false,
      deleteId: "",
      editId: "",
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
      html2canvas(document.getElementById("test"), {
        allowTaint: true,
        useCORS: true,
        scale: 10,
      }).then((canvas) => {
        //document.body.appendChild(canvas);
        doc.addImage(canvas.toDataURL("image/png"), "PNG", doc.margin.horiz, doc.margin.vert, 150, 150);
        doc.save("nota.pdf");
      });
    },
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.email = "";
      this.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    readData() {
      var url =
        this.$api + "/customer/show/" + localStorage.getItem("id_customer");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.id_customer = response.data.data.id_customer;
          this.fullname = response.data.data.nama;
          this.address = response.data.data.alamat;
          this.date = response.data.data.tgl_lahir;
          this.gender = response.data.data.jenis_kelamin;
          this.email = response.data.data.email;
          this.password = response.data.data.password;
          this.phone = response.data.data.no_telp;
          this.status_customer = response.data.data.status_customer;
          this.imageStoreURLSim= response.data.data.sim;
          this.imageStoreURLIdentitas = response.data.data.identitas;
        });
    },
     readData1() {
      var url =
        this.$api + "/customer/show/" + localStorage.getItem("id_customer");
      var urltransaksi =
        this.$api +
        "/transaksi/show/transaksi/berhasil/" +
        localStorage.getItem("id_customer");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.customers = response.data.data;
          return this.$http.get(urltransaksi, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
        })
        .then((response) => {
          this.transaksis = response.data.data;
          //this.metode_pembayaran = response.data.data.metode_pembayaran;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    editHandler(item) {
      this.inputType = "Edit";
      this.editId = item.id_transaksi;
      this.nama_customer = item.nama_customer;
      this.nama_driver = item.nama_driver;
      this.nama_mobil = item.nama_mobil;
      this.nama_pegawai = item.nama_pegawai;
      this.id_transaksi = item.id_transaksi;
      this.id_customer = item.id_customer;
      this.id_driver = item.id_driver;
      this.id_mobil = item.id_mobil;
      this.id_pegawai = item.id_pegawai;
      this.id_promo = item.id_promo;
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
      this.dialog2 = true;
    },
     rate() {
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
        rating_driver: this.rating_driver,
        performa_driver: this.performa_driver,
        rating_rental: this.rating_rental,
        performa_rental: this.performa_rental,
      };
      var url = this.$api + "/transaksi/rating/" + this.editId;
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
          //this.readData(); //local data
          this.readData1();
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
    update() {
      let newData = {
        nama: this.fullname,
        alamat: this.address,
        no_telp: this.phone,
        tgl_lahir: this.date,
        jenis_kelamin: this.gender,
        email: this.email,
        status_customer: this.status_customer,
        password: this.password,
        sim: this.imageStoreURLSim,
        identitas: this.imageStoreURLIdentitas,
      };
      var url =
        this.$api + "/customer/update/" + localStorage.getItem("id_customer");
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
        this.$api + "/customer/delete/" + localStorage.getItem("id_customer");
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
    rating(item) {
      this.inputType = "Edit";
      this.editId = item.id_transaksi;
      this.nama_customer = item.nama_customer;
      this.nama_driver = item.nama_driver;
      this.nama_mobil = item.nama_mobil;
      this.nama_pegawai = item.nama_pegawai;
      this.id_transaksi = item.id_transaksi;
      this.id_customer = item.id_customer;
      this.id_driver = item.id_driver;
      this.id_mobil = item.id_mobil;
      this.id_pegawai = item.id_pegawai;
      this.id_promo = item.id_promo;
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
      this.rating_driver = item.rating_driver;
      this.performa_driver = item.performa_driver;
      this.rating_rental = item.rating_rental;
      this.performa_rental = item.performa_rental;
      if (this.id_driver !== null) {
        this.dialog3 = true;
        this.show = true;
      } else {
        this.dialog3 = true;
        this.show = false;
      }
    },
    close() {
      this.dialog = false;
      this.dialog2 = false;
      this.dialog3 = false;
      this.inputType = "Pembayaran";
      this.dialogConfirm = false;
      this.readData();
    },
     cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialog2 = false;
      this.dialog3 = false;
      this.dialogConfirm = false;
      this.inputType = "Pembayaran";
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
    home() {
      this.$router.push({
        name: "UserPage",
      });
    },
    account() {
      this.$router.push({
        name: "AccountPage",
      });
    },
    logout() {
      this.$router.push({
        name: "HomePage",
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
    this.readData1();
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
  margin: 0 auto;
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
</style>