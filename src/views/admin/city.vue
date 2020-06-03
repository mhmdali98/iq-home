<template>
  <div>
    <v-toolbar dense flat color="grey lighten-4">
      <v-toolbar-title class="pl-2">المحافظات</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="#55AB88" dark @click="detailsDialog = true">اضافة محافظة</v-btn>
    </v-toolbar>
    <v-container class="grey lighten-5">
      <v-row class="mx-1">
        <v-text-field
          v-model="search"
          outlined
          dense
          hide-details
          filled
          prepend-inner-icon="search"
          placeholder="اكتب للبحث"
        />
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-data-table
            :loading="loading"
            loading-text="جاري جلب المعلومات"
            class="mt-4"
            :headers="headers"
            :items="items"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            :search="search"
          >
            <template v-slot:item.actions="{ item }">
              <!-- <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn class="indigo--text" icon v-on="on" large>
                    <v-icon l @click="delet(item.id)" color="red">mdi-delete-outline</v-icon>
                  </v-btn>
                </template>
                <span>حذف</span>
              </v-tooltip>-->
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn class="indigo--text" icon v-on="on" large>
                    <v-icon l @click="edit(item.id)" color="green">mdi-pencil-outline</v-icon>
                  </v-btn>
                </template>
                <span>تعديل</span>
              </v-tooltip>
            </template>
            <template v-slot:no-data>
              <h3>لاتوجد بيانات لعرضها</h3>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="detailsDialog" width="400" persistent>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            <h3>اضافة محافظة</h3>
          </v-toolbar-title>
          <v-spacer />
          <v-btn @click="detailsDialog = false" icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <br />
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                outlined
                label="اسم المحافظة بالغة العربية : "
                class="mx-2"
                v-model="nameAr"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
              <v-text-field
                outlined
                label="اسم المحافظة بالغة الانكليزية : "
                class="mx-2"
                v-model="nameEn"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
              <v-text-field
                outlined
                label="عدد السكان : "
                class="mx-2"
                v-model="population"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
              <v-text-field
                outlined
                label="locationLat : "
                class="mx-2"
                v-model="locationLat"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
              <v-text-field
                outlined
                label="locationLon : "
                class="mx-2"
                v-model="locationLon"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
            </v-col>
          </v-row>
          <br />
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="detailsDialog = false">اغلاق</v-btn>
          <v-btn color="blue darken-1" text @click="addLap()" :loading="loading2">حفظ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="detailsDialog2" width="400" persistent>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            <h3>اضافة محافظة</h3>
          </v-toolbar-title>
          <v-spacer />
          <v-btn @click="detailsDialog2 = false" icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <br />
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                outlined
                label="اسم المحافظة بالغة العربية : "
                class="mx-2"
                v-model="nameAr"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
              <v-text-field
                outlined
                label="اسم المحافظة بالغة الانكليزية : "
                class="mx-2"
                v-model="nameEn"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
              <v-text-field
                outlined
                label="عدد السكان : "
                class="mx-2"
                v-model="population"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
              <v-text-field
                outlined
                label="locationLat : "
                class="mx-2"
                v-model="locationLat"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
              <v-text-field
                outlined
                label="locationLon : "
                class="mx-2"
                v-model="locationLon"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
            </v-col>
          </v-row>
          <br />
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="detailsDialog2 = false">اغلاق</v-btn>
          <v-btn color="blue darken-1" text @click="editInfo()" :loading="loading2">حفظ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      nameEn: "",
      nameAr: "",
      population: "",
      locationLat: "",
      locationLon: "",
      search: "",
      loading2: false,
      name: "",
      detailsDialog: false,
      detailsDialog2: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { sortable: false },
        { text: "الاسم بالعربي", value: "nameAr" },
        { text: "الاسم بالانجليزي", value: "nameEn" },
        { text: "عدد السكان", value: "population" },
        { text: "lat", value: "locationLat" },
        { text: "lon", value: "locationLon" },
        { text: "العمليات", value: "actions" }
      ],
      items: [],
      coontractCount: [],
      loading: false,
      editId: ""
    };
  },
  methods: {
    editInfo() {
      if (
        this.nameEn &&
        this.nameAr &&
        this.population &&
        this.locationLon &&
        this.locationLat
      ) {
        this.loading2 = true;
        const cityData = {
          id: this.editId,
          nameEn: this.nameEn,
          nameAr: this.nameAr,
          population: parseInt(this.population),
          locationLat: this.locationLat,
          locationLon: this.locationLon
        };
        axios
          .put("city", cityData, {
            headers: {
              access_token: `Bearer ${localStorage.getItem("tokin")}`
            }
          })
          .then(res => {
            this.rnData();
            this.loading2 = false;
            this.detailsDialog2 = false;
            Swal.fire({
              title: "تمت عملية التعديل بنجاح",
              icon: "success",
              confirmButtonText: "اغلاق"
            });
          })
          .catch(err => {
            this.loading2 = false;
            Swal.fire({
              title: "اسم المحافظة موجود",
              icon: "error",
              confirmButtonText: "اغلاق"
            });
          });
      } else {
        Swal.fire({
          title: "تاكد من ادخال المعلومات",
          icon: "error",
          confirmButtonText: "اغلاق"
        });
      }
    },
    addLap() {
      if (
        this.nameEn &&
        this.nameAr &&
        this.population &&
        this.locationLon &&
        this.locationLat
      ) {
        this.loading2 = true;
        const cityData = {
          nameEn: this.nameEn,
          nameAr: this.nameAr,
          population: parseInt(this.population),
          locationLat: this.locationLat,
          locationLon: this.locationLon
        };
        axios
          .post("city", cityData, {
            headers: {
              access_token: `Bearer ${localStorage.getItem("tokin")}`
            }
          })
          .then(res => {
            this.rnData();
            this.loading2 = false;
            this.detailsDialog = false;
            Swal.fire({
              title: "تمت عملية الاضافة بنجاح",
              icon: "success",
              confirmButtonText: "اغلاق"
            });
          })
          .catch(err => {
            this.loading2 = false;
            Swal.fire({
              title: "اسم المحافظة موجود",
              icon: "error",
              confirmButtonText: "اغلاق"
            });
          });
      } else {
        Swal.fire({
          title: "تاكد من ادخال المعلومات",
          icon: "error",
          confirmButtonText: "اغلاق"
        });
      }
    },
    rnData() {
      this.loading = true;
      axios
        .get("city", {
          headers: {
            access_token: `Bearer ${localStorage.getItem("tokin")}`
          }
        })
        .then(res => {
          this.loading = false;
          this.items = res.data;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    delet(id) {
      Swal.fire({
        title: "هل انت متاكد من حذف المختبر؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا"
      }).then(result => {
        if (result.value) {
          axios
            .delete("Lab/deleteLab?ID=" + id)
            .then(res => {
              this.rnData();
              Swal.fire({
                title: "تمت عملية الحذف بنجاح",
                icon: "success",
                confirmButtonText: "اغلاق"
              });
            })
            .catch(err => {
              Swal.fire({
                title: "فشلت عمليت الحذف",
                icon: "error",
                confirmButtonText: "اغلاق"
              });
            });
        }
      });
    },
    edit(id) {
      for (let i = 0; i < this.items.length; i++) {
        if (id == this.items[i].id) {
          this.nameEn = this.items[i].nameEn;
          this.nameAr = this.items[i].nameAr;
          this.population = this.items[i].population;
          this.locationLon = this.items[i].locationLon;
          this.locationLat = this.items[i].locationLat;
          this.editId = this.items[i].id;
        }
      }
      this.detailsDialog2 = true;
    }
  },
  created() {
    this.rnData();
  }
};
</script>
