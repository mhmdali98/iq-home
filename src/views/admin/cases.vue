<template>
  <div>
    <v-toolbar dense flat color="grey lighten-4">
      <v-toolbar-title class="pl-2">الحالات</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="#55AB88" dark @click="detailsDialog = true">اضافة حالات</v-btn>
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
            <template v-slot:item.type="{ item }">
              <v-chip
                class="ma-2"
                color="amber darken-1"
                text-color="white"
                v-if="item.type == 'active'"
              >{{ item.type }}</v-chip>
              <v-chip
                class="ma-2"
                color="pink darken-1"
                text-color="white"
                v-if="item.type == 'deaths'"
              >{{ item.type }}</v-chip>
              <v-chip
                class="ma-2"
                color="teal"
                text-color="white"
                v-if="item.type == 'recovered'"
              >{{ item.type }}</v-chip>
            </template>
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
            <h3>اضافة حالات</h3>
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
              <v-select
                :items="caseOption"
                label="اختر نوع الحالات"
                outlined
                :rules="[v => !!v || 'يجب تحديد النوع']"
                required
                v-model="caseId"
              ></v-select>
              <v-text-field
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
                outlined
                label="عدد الحالات : "
                v-model="numCase"
              />
              <v-select
                :items="cityOption"
                label="اختر المحافظة"
                outlined
                :rules="[v => !!v || 'يجب تحديد المحافظة']"
                required
                v-model="cityId"
              ></v-select>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    outlined
                    v-model="date"
                    label="اختر التاريخ "
                    :rules="[(v) => !!v || 'يجب تحديد تاريخ الحجز']"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">الغاء</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">تم</v-btn>
                </v-date-picker>
              </v-dialog>
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
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      numCase: "",
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      cityId: "",
      cityOption: [],
      show1: false,
      caseId: "",
      caseOption: [
        { text: "active", value: "active" },
        { text: "recovered", value: "recovered" },
        { text: "deaths", value: "deaths" }
      ],
      search: "",
      loading2: false,
      detailsDialog: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { sortable: false },
        { text: "المحافظة", value: "city.nameAr" },
        { text: "الحالة", value: "type" },
        { text: "العدد", value: "total" },
        { text: "التاريخ", value: "caseDate" }
        // { text: "العمليات", value: "actions" }
      ],
      items: [],
      coontractCount: [],
      loading: false
    };
  },
  methods: {
    addLap() {
      if (this.numCase && this.caseId && this.cityId && this.date) {
        this.loading2 = true;
        const userData = {
          type: this.caseId,
          total: parseInt(this.numCase),
          city: {
            id: this.cityId
          },
          caseDate: this.date.toString() + "T00:00:00.483Z"
        };
        axios
          .post("case", userData, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
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
              title: "اسم التحليل موجود",
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
        .get("case", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            access_token: `Bearer ${localStorage.getItem("tokin")}`
          }
        })
        .then(res => {
          this.items = res.data;
          for (let i = 0; i < this.items.length; i++) {
            this.items[i].caseDate = this.items[i].caseDate.substring(0, 10);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getlab() {
      axios
        .get("city", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            access_token: `Bearer ${localStorage.getItem("tokin")}`
          }
        })
        .then(res => {
          this.cityOption = res.data;
          for (let i = 0; i < this.cityOption.length; i++) {
            this.cityOption[i].value = this.cityOption[i].id;
            this.cityOption[i].text = this.cityOption[i].nameAr;
          }
        })
        .catch(err => {});
    },
    delet(id) {
      Swal.fire({
        title: "هل انت متاكد من الحذف ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا"
      }).then(result => {
        if (result.value) {
          for (let i = 0; i < this.items.length; i++) {
            if (id == this.items[i].id) {
              this.items.splice(i, 1);
            }
          }
          Swal.fire({
            title: "تمت عملية الحذف بنجاح",
            icon: "success",
            confirmButtonText: "اغلاق"
          });
        }
      });
    },
    edit() {
      this.detailsDialog = true;
    }
  },
  created() {
    this.rnData();
    this.getlab();
  }
};
</script>
