<template>
  <div class="hello">
    <v-toolbar color="#e8aa09" dark height="80" elevation="0">
      <img :src="images.logo" height="70" width="70" contain />
      <v-toolbar-title class="ms-2">Atma Jaya Rental</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text @click="home">Home</v-btn>
        <v-btn text @click="order">Order</v-btn>
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

    <v-card class="ma-12">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <!-- <v-btn color="#e8aa09" text-dark @click="dialog = true"> Tambah </v-btn> -->
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
            v-if="show5"
            small
            color="#e8aa09"
            text-dark
            width="90px"
            class="my-2"
            @click="rating(item)"
            >Rating</v-btn
          >

          <v-btn
            v-if="show6"
            small
            color="#e8aa09"
            text-dark
            width="90px"
            class="my-2"
            @click="editDetail(item)"
            >Edit</v-btn
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
          <!--<span class="headline">{{ formTitle }} transaksi</span> -->
        </v-card-title>
        <v-card-text>
          <v-container>
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
                  <v-col cols="7">
                    <h6>Driver</h6>
                  </v-col>
                  <v-col cols="5">
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
            <v-row no-gutters class="ms-3">
              <v-col cols="6" class="mb-10"> </v-col>
              <v-col cols="6" class="mb-10"> </v-col>
              <v-col cols="4"> </v-col>
            </v-row>
            <!--  <v-autocomplete
              class="mx-14"
              v-model="id_promo"
              :items="promo_jenis"
              item-value="id_promo"
              item-text="jenis"
              label="Promo"
              outlined
              dense
              full-width
            /> -->
            <v-select
              class="mx-14"
              v-model="metode_pembayaran"
              :items="metode_bayar"
              item-value="metode"
              item-text="metode"
              label="Metode Pembayaran"
              outlined
              dense
              max-width="10px"
              required
            />
            <v-select
              class="mx-14"
              v-model="id_promo"
              :items="promos"
              item-value="id_promo"
              item-text="kode_promo"
              label="Promo"
              outlined
              dense
              max-width="10px"
              required
            />
            <v-file-input
              v-model="image"
              type="file"
              class="mx-14"
              label="Bukti Pembayaran"
              hint="Add a picture of youre license"
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
          <v-btn color="#1c549c" text @click="cancel"> Cancel </v-btn>
          <v-btn color="#1c549c" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
          <v-btn color="#1c549c" text @click="cancel"> Cancel </v-btn>
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
          <v-btn text @click="cancel"> Cancel </v-btn>
          <v-btn color="primary" text @click="rate"> Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog4" max-width="600px">
      <v-card>
        <v-card>
          <v-card-title class="text-h5"> Edit Detail Peminjaman</v-card-title>
          <v-card-text class="text-h7">
            <div class="text--center mt-12 mx-auto">
              <v-text-field
                class="mx-auto"
                v-model="id_transaksi"
                :rules="nameRules"
                label="ID Customer"
                outlined
                dense
                disabled
                required
              ></v-text-field>
              <v-select
                class="mx-auto"
                v-model="id_mobil"
                :items="mobils"
                :rules="mobilRules"
                label="Mobil"
                item-value="id_mobil"
                item-text="nama_mobil"
                outlined
                dense
                required
              ></v-select>
               <v-select
                v-if="show7"
                class="mx-auto"
                v-model="id_driver"
                :items="drivers"
                :rules="driverRules"
                label="Driver"
                item-value="id_driver"
                item-text="nama"
                outlined
                dense
                required
              ></v-select>
              <v-radio-group
                :rules="[(v) => !!v || 'Item is required']"
                v-model="jenis_penyewaan"
                row
                class="mx-16 ms-16"
              >
                <v-radio
                  class="mx-16 ms-16"
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
              <v-row no-gutters class="mx-auto">
                <v-col cols="5" class="ms-4">
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
                <v-col cols="5" class="ms-4">
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
                <v-col cols="5" class="ms-4">
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
                <v-col cols="5" class="ms-4">
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
            </div>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>

        <v-card-actions class="justify-space-between">
          <v-btn text @click="cancel"> No Thanks </v-btn>
          <v-btn color="primary" text @click="update"> Ok</v-btn>
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

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text>Anda Yakin ingin mengembalikan mobil?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#1c549c" text @click="dialogConfirm = false">
            Cancel
          </v-btn>
          <v-btn color="#1c549c" text @click="returnMobil"> Return </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
      error_message
    }}</v-snackbar>
  </div>
</template>
<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  name: "OrderPage",
  data() {
    return {
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      show6: true,
      show7: false,
      show5: false,
      show1: true,
      show2: true,
      show3: false,
      show: true,
      image: undefined,
      // to save image url
      imageUrl: "",
      inputType: "Pembayaran",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialogConfirm: false,
      dialogConfirmEdit: false,
      id_transaksi: "",
      id_promo: "",
      id_pegawai: "",
      id_customer: "",
      id_driver: "",
      id_mobil: "",
      nama_mobil: "",
      performa_driver: "",
      rating_driver: "",
      performa_rental: "",
      rating_rental: "",
      imageStoreURL: "",
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
        { text: "Tgl Mulai Sewa", value: "tgl_mulai_sewa" },
        { text: "Tgl Selesai Sewa", value: "tgl_selesai" },
        //{ text: "Tgl Pengembalian", value: "tgl_pengembalian" },
        //{ text: "Sub Total", value: "sub_total" },
        { text: "Status Penyewaan", value: "status_penyewaan" },
        //{ text: "Tgl Pembayaran", value: "tgl_pembayaran" },
        { text: "Metode Pembayaran", value: "metode_pembayaran" },
        //{ text: "Total Diskon", value: "total_diskon" },
        //{ text: "Total Denda", value: "total_denda" },
        //{ text: "Total Bayar", value: "total_harga_bayar" },
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
      returnId: "",
      metode_bayar: [
        { id: 1, metode: "Transfer" },
        { id: 2, metode: "Virtual Account" },
      ],
      metode_pembayaran: "",
      images: {
        logo: require("@/assets/logo.png"),
      },
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
        doc.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          doc.margin.horiz,
          doc.margin.vert,
          150,
          150
        );
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
      if (this.inputType !== "Pembayaran") {
        this.update();
      } else {
        this.returnMobil();
      }
    },
    //Read Data Courses
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
    readData() {
      var url =
        this.$api + "/customer/show/" + localStorage.getItem("id_customer");
      var urltransaksi =
        this.$api +
        "/transaksi/showbyidcustomer/" +
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
    readData1() {
      var url = this.$api + "/promoaktif";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.promos = response.data.data;
        });
    },
    // Save data course
    save() {
      this.transaksi.append("id_transaksi", this.id_transaksi);
      this.transaksi.append("id_customer", this.id_customer);
      this.transaksi.append("id_driver", this.id_driver);
      this.transaksi.append("id_pegawai", this.id_pegawai);
      this.transaksi.append("id_mobil", this.id_mobil);
      this.transaksi.append("id_promo", this.id_promo);
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
    dialogReturnMobil(item) {
      this.returnId = item.id_transaksi;
      this.dialogConfirm = true;
    },

    // update data course
    returnMobil() {
      var url = this.$api + "/transaksi/returnmobil/" + this.returnId;
      var url1 = this.$api + "/transaksi/hitung/" + this.returnId;
      this.load = true;
      this.$http
        .put(url, {
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
          this.readData();
          this.readData1(); //local data
          this.resetForm();

          //this.inputType = "Pembayaran";
          return this.$http.put(url1, {
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
          //this.inputType = "Pembayaran";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
          this.dialogConfirm = false;
        });
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
        rating_driver: this.rating_driver,
        performa_driver: this.performa_driver,
        rating_rental: this.rating_rental,
        performa_rental: this.performa_rental,
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
          this.inputType = "Pembayaran";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    editDetail(item) {
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
        this.dialog4 = true;
        this.show7 = true;
      } else {
        this.dialog4 = true;
        this.show7 = false;
      }
    },
   cek1(){
      if(this.jenis_penyewaan == "Penyewaan Mobil + Driver"){
        this.show7 = true;
      
      }
    },
    cek(){
      if(this.jenis_penyewaan == "Penyewaan Mobil"){
        this.show7 = false;
        
      }
    },
    editItem(item) {
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
      this.dialog = true;
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
    deleteItem(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.dialog2 = false;
      this.dialog3 = false;
      this.dialog4 = false;
      this.inputType = "Pembayaran";
      this.dialogConfirm = false;
      this.dialogConfirmEdit = false;
      this.readData();
    },
    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialog2 = false;
      this.dialog3 = false;
      this.dialog4 = false;
      this.dialogConfirm = false;
      this.dialogConfirmEdit = false;
      this.inputType = "Pembayaran";
    },
    resetForm() {
      this.performa_driver = "";
      this.rating_driver = "";
      this.performa_rental = "";
      this.rating_rental = "";
      this.id_role = "";
      this.nama = "";
      this.alamat = "";
      this.tgl_lahir = "";
      this.jenis_kelamin = "";
      this.email = "";
      (this.id_promo = ""), (this.no_telp = "");
      this.password = "";
      this.image = "";
      (this.imageUrl = ""), (this.imageUrl = ""), (this.dialog = false);
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
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.readData();
    this.readData1();
    this.readDataMobil();
    this.readDataDriver();
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
body {
  background-color: #1c549c;
}
.v-application--wrap {
  background: #1c549c;
}
</style>