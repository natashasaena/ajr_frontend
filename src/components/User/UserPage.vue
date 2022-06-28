<template>
  <div class="hello">
    <v-toolbar color="#e8aa09" dark height="80" elevation="0">
      <img :src="images.logo" height="70" width="70" contain />
      <v-toolbar-title class="ms-2">Atma Jaya Rental</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text>Home</v-btn>
        <v-btn text @click="order"
          >Order</v-btn
        >
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

    <v-container fluid> </v-container>
    <v-container fluid>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1"> </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2"> </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-12" color="grey lighten-1" height="">
              <v-form v-model="valid" ref="form">
                <v-container fluid
                  ><v-row>
                    <v-col
                      v-for="mobil in mobils"
                      :key="mobil.id_mobil"
                      cols="6"
                    >
                      <v-card height="620px" width="800px">
                        <v-img
                          :src="mobil.foto"
                          class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          height="300px"
                          width="700px"
                          cover
                        >
                        </v-img>

                        <v-card-title
                          class="text-h7"
                          v-text="mobil.nama_mobil"
                        ></v-card-title>
                        <v-card-text>
                          <v-row no-gutters>
                            <v-col cols="5">
                              <h6>Tipe</h6>
                            </v-col>
                            <v-col cols="4">
                              <h6>:{{ mobil.tipe_mobil }}</h6>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col cols="5">
                              <h6>Transmisi</h6>
                            </v-col>
                            <v-col cols="4">
                              <h6>:{{ mobil.jenis_transmisi }}</h6>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col cols="5">
                              <h6>Bahan Bakar</h6>
                            </v-col>
                            <v-col cols="4">
                              <h6>:{{ mobil.jenis_bahan_bakar }}</h6>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col cols="5">
                              <h6>Warna Mobil</h6>
                            </v-col>
                            <v-col cols="4">
                              <h6>:{{ mobil.warna_mobil }}</h6>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col cols="5">
                              <h6>Volume Bagasi</h6>
                            </v-col>
                            <v-col cols="4">
                              <h6>:{{ mobil.volume_bagasi }}</h6>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col cols="5">
                              <h6>Fasilitas</h6>
                            </v-col>
                            <v-col cols="7">
                              <h6>:{{ mobil.fasilitas }}</h6>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col cols="5">
                              <h6>Harga Sewa</h6>
                            </v-col>
                            <v-col cols="6">
                              <h6>: Rp.{{ mobil.harga_sewa }}</h6>
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-card-actions>
                          <v-row no-gutters class="mt-n3">
                            <v-col align="end">
                              <v-btn
                                color="#1c549c"
                                text
                                @click="bookingMobil(mobil)"
                              >
                                BOOKING
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>

            <!-- <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

            <v-btn text> Cancel </v-btn> -->
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12" color="grey lighten-1">
              <v-container fluid>
                <v-card fluid>
                  <v-radio-group
                    :rules="[(v) => !!v || 'Item is required']"
                    v-model="jenis_penyewaan"
                    row
                    class="ms-4"
                  >
                    <v-radio
                      @click="cek1()"
                      label="Driver"
                      value="Penyewaan Mobil + Driver"
                    ></v-radio>
                    <v-radio
                      @click="cek()"
                      label="Without Driver"
                      value="Penyewaan Mobil"
                    ></v-radio>
                  </v-radio-group>
                  <v-row no-gutters>
                    <v-col cols="3" class="ms-4">
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="tgl_mulai_sewa"
                            label="Rental Start Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="tgl_mulai_sewa"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="3" class="ms-4">
                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="waktu_sewa"
                            :rules="waktuSewaRules"
                            label="Picker in menu"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-model="waktu_sewa"
                          full-width
                          @click:minute="$refs.menu3.save(waktu_sewa)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="3" class="ms-4">
                      <v-menu
                        v-model="menu4"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="tgl_selesai"
                            label="Rental End Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="tgl_selesai"
                          @input="menu4 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="3" class="ms-4">
                      <v-menu
                        ref="menu"
                        v-model="menu5"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="waktu_selesai"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :rules="waktuSelesaiRules"
                            v-model="waktu_selesai"
                            label="Picker in menu"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu5"
                          v-model="waktu_selesai"
                          full-width
                          @click:minute="$refs.menu.save(waktu_selesai)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-btn color="primary" class="ms-10" v-if="show1" @click="bookingDriver2()"> Continue </v-btn>
                  <v-container fluid>
                    <v-row>
                      <v-col
                        v-for="driver in drivers"
                        :key="driver.nama"
                        cols="3"
                      >
                        <v-card
                          height="200px"
                          width="300px"
                          class="elevation-6"
                          color="grey lighten-3"
                          v-if="show"
                        >
                          <v-card-title
                            class="text-h7"
                            v-text="driver.nama"
                          ></v-card-title>

                          <v-card-text
                            ><v-row no-gutters>
                              <v-col cols="5">
                                <h6>Tarif</h6>
                              </v-col>
                              <v-col cols="4">
                                <h6>:{{ driver.tarif_driver }}</h6>
                              </v-col>
                            </v-row>
                            <v-row no-gutters>
                              <v-col cols="5">
                                <h6>Bahasa</h6>
                              </v-col>
                              <v-col cols="7">
                                <h6>:{{ driver.bahasa }}</h6>
                              </v-col>
                            </v-row>
                            <v-row no-gutters>
                              <v-col cols="5">
                                <h6>Rating</h6>
                              </v-col>
                              <v-col cols="4">
                                <h6>:{{ driver.rerata_rating }}</h6>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-row no-gutters class="mt-n4">
                              <v-col align="end">
                                <v-btn
                                  color="#1c549c"
                                  text
                                  @click="bookingDriver(driver)"
                                >
                                  BOOKING
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-container>
            </v-card>

          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12" height="200px">
              <v-col align="center">
                <v-icon
                  class="text-align: center;"
                  size="50px"
                  dark
                  color="primary"
                  >mdi-check-bold</v-icon
                ></v-col
              >
              <p id="ket">Pemesanan Berhasil</p>
            </v-card>
            <v-btn color="primary" @click="save()"> Continue </v-btn>

            <v-btn text> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
        error_message
      }}</v-snackbar>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      show1: false,
      show: true,
      valid: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      id_transaksi: "",
      id_pegawai: "",
      id_customer: "",
      id_driver: "",
      id_mobil: "",
      jenis_penyewaan: "",
      jenisPenyewaanRules: [(v) => !!v || "Jenis Penyewaan tidak boleh kosong"],
      tgl_mulai_sewa: "",
      tgl_selesai: "",
      temp_tgl_mulai_sewa: "",
      temp_tgl_selesai: "",

      waktu_sewa: "",
      waktuSewaRules: [(v) => !!v || "Waktu Sewa tidak boleh kosong"],
      waktu_selesai: "",
      waktuSelesaiRules: [(v) => !!v || "Waktu Selesai tidak boleh kosong"],
      tgl_pengembalian: "",
      e1: 1,
      form: {
        email: "",
        password: "",
        tgl_mulai_sewa: null,
        tgl_selesai: null,
      },

      images: {
        logo: require("@/assets/logo.png"),
      },
      value: "",
      transaksi: new FormData(),
      mobils: [],
      drivers: [],
      transaksis: [],
      customers: [],
      pegawais: [],
      promos: [],
      editId: "",
    };
  },
  methods: {
    setForm() {
      //if (this.inputType !== "Booking") {
      // this.update();
      //} else {
      this.save();
      //}
      this.e1 = 3;
    },
    readDataMobil() {
      var url = this.$api + "/mobil/cekKetersediaan";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.mobils = response.data.data;
        });
    },
    readDataDriver() {
      var url = this.$api + "/driver/showAvailable";
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
    readDataCustomer() {
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
          this.imageStoreURLSim = response.data.data.sim;
          this.imageStoreURLIdentitas = response.data.data.identitas;
        });
    },
    
    

    save() {
      //this.tgl_mulai_sewa= this.combineDateWithTime(new Date(this.tgl_mulai_sewa),new Date(this.waktu_sewa));
      //this.tgl_selesai= this.combineDateWithTime(new Date(this.tgl_selesai),new Date(this.waktu_selesai));
      this.readDataCustomer();

      if(this.tgl_mulai_sewa !== "") {
        this.temp_tgl_mulai_sewa = moment(
        this.tgl_mulai_sewa + " " + this.waktu_sewa + ":00",
        "YYYY-MM-DD hh:mm:ss"
      ).format("YYYY-MM-DD HH:mm:ss");
      }

      if(this.tgl_selesai !== "") {
        this.temp_tgl_selesai = moment(
        this.tgl_selesai + " " + this.waktu_selesai + ":00",
        "YYYY-MM-DD hh:mm:ss"
      ).format("YYYY-MM-DD HH:mm:ss");
      }


      this.transaksi.append("id_transaksi", this.id_transaksi);
      this.transaksi.append("id_customer", this.id_customer);
      this.transaksi.append("id_driver", this.id_driver);
      this.transaksi.append("id_pegawai", this.id_pegawai);
      this.transaksi.append("id_mobil", this.id_mobil);
      this.transaksi.append("status_penyewaan", this.status_penyewaan);
      this.transaksi.append("jenis_penyewaan", this.jenis_penyewaan);
      this.transaksi.append("tgl_transaksi", this.tgl_transaksi);
      this.transaksi.append(
        "tgl_mulai_sewa",
        this.temp_tgl_mulai_sewa.toString()
      );
      this.transaksi.append("tgl_selesai", this.temp_tgl_selesai.toString());
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
          //this.readData(); //local data
          this.resetForm();
          this.e1 = 3;
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
        id_transaksi: this.id_transaksi,
        id_customer: this.id_customer,
        id_driver: this.id_driver,
        id_pegawai: this.id_pegawai,
        id_mobil: this.id_mobil,
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
    bookingMobil(mobil) {
      this.id_mobil = mobil.id_mobil;
      this.e1 = 2;
    },
    bookingDriver(driver) {
      this.id_driver = driver.id_driver;
  // this.e1 = 3;   
      this.save();
    },
     bookingDriver2() {
     
  // this.e1 = 3;   
      this.save();
    },
    editItem(item) {
      this.inputType = "Edit";
      this.editId = item.id_transaksi;
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
      this.dialog = true;
    },
    cek1(){
      if(this.jenis_penyewaan == "Penyewaan Mobil + Driver"){
        this.show = true;
        this.show1 = false;
      }
    },
    cek(){
      if(this.jenis_penyewaan == "Penyewaan Mobil"){
        this.show = false;
        this.show1 = true; 
      }
    },
    close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      //this.readData();
    },
    cancel() {
      this.resetForm();
      //this.readData();
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
      (this.imageUrl = ""), (this.imageUrl = ""), (this.dialog = false);
    },
    home() {
      this.$router.push({
        name: "HomePage",
      });
    },
    logout() {
      this.$router.push({
        name: "HomePage",
      });
    },
    account() {
      this.$router.push({
        name: "AccountPage",
      });
    },
    order() {
      this.$router.push({
        name: "OrderPage",
      });
    },
  
  },

  mounted() {
    //this.readData();
    this.readDataMobil();
    this.readDataDriver();
    this.readDataCustomer();
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
  width: 50px;
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
  background-color: #1c549c;
}
.v-application--wrap {
  background: #1c549c;
}
#ket {
  font-size: 20px;
  text-align: center;
}
</style>