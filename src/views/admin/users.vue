<template>
  <div>
    <v-toolbar dense flat color="grey lighten-4">
      <v-toolbar-title class="pl-2">المستخدمين</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="#55AB88" dark @click="openAdd()">اضافة مستخدم</v-btn>
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
            <template v-slot:item.isDeleted="{ item }">
              <v-chip
                class="ma-2"
                color="green"
                text-color="white"
                v-if="!item.isDeleted"
              >{{item.isDeleted}}</v-chip>
              <v-chip
                class="ma-2"
                color="orange"
                text-color="white"
                v-if="item.isDeleted"
              >{{item.isDeleted}}</v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <!-- <v-tooltip bottom v-if="!item.isDeleted">
                <template v-slot:activator="{ on }">
                  <v-btn class="indigo--text" icon v-on="on" large>
                    <v-icon l @click="delet(item.id)" color="red">mdi-delete-outline</v-icon>
                  </v-btn>
                </template>
                <span>الغاء تفعيل</span>
              </v-tooltip>
              <v-tooltip bottom v-if="item.isDeleted">
                <template v-slot:activator="{ on }">
                  <v-btn class="indigo--text" icon v-on="on" large>
                    <v-icon l @click="delet(item.id)" color="warning">mdi-backup-restore</v-icon>
                  </v-btn>
                </template>
                <span>تفعيل</span>
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
            <h3>اضافة مستخدم</h3>
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
              <v-text-field outlined label="الاسم الكامل : " v-model="name" />
              <v-text-field
                outlined
                label="اسم الحساب : "
                v-model="username"
                :rules="userNameRules"
              />
              <v-text-field
                outlined
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                v-model="password"
                :rules="passwordRules"
                label="كلمة المرور"
                hint="6 رموز على الأقل"
                counter
                @click:append="show1 = !show1"
              />

              <v-select
                :items="roleOption"
                label="اختر الصلاحية"
                outlined
                :rules="[v => !!v || 'يجب تحديد الصلاحية']"
                required
                v-model="roleId"
              ></v-select>
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
            <h3>تعديل المستخدم</h3>
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
              <v-text-field outlined label="الاسم الكامل : " v-model="name" />
              <v-text-field
                outlined
                label="اسم الحساب : "
                v-model="username"
                :rules="userNameRules"
              />

              <v-select
                :items="roleOption"
                label="اختر الصلاحية"
                outlined
                :rules="[v => !!v || 'يجب تحديد الصلاحية']"
                required
                v-model="roleId"
              ></v-select>
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
      show1: false,
      numRules: [
        v => !!v || "رقم الهاتف مطلوب",
        v => (v || "").indexOf(" ") < 0 || "المسافات غير مسموحة",
        v => (v && v.length == 11) || "يجب ان يتكون رقم الهاتف من 11 رقم "
      ],
      userNameRules: [
        v => !!v || "إسم المستخدم مطلوب",
        v => (v || "").indexOf(" ") < 0 || "المسافات غير مسموحة",
        v =>
          v.match(/^[A-z-0-9]+$/) ||
          "يجب ان يكون اسم المستخدم باللغة الانكليزية",
        v => (v && v.length >= 3) || "يجب ان يكون اسم المستخدم 3 حروف على الاقل"
      ],
      passwordRules: [
        v => !!v || "كلمة المرور مطلوبه",
        v => (v || "").indexOf(" ") < 0 || "المسافات غير مسموحة",
        v => (v && v.length >= 6) || "يجب ان تكون كلمة المرور 6 رموز على الاقل"
      ],
      roleId: "",
      roleOption: [
        { text: "USER", value: "USER" },
        { text: "ADMIN", value: "ADMIN" },
        { text: "SUPERADMIN", value: "SUPERADMIN" }
      ],
      emailRules: [
        v => !!v || "البريد مطلوب",
        v => /.+@.+\..+/.test(v) || "البريد غير صحيح"
      ],
      search: "",
      loading2: false,
      name: "",
      username: "",
      password: "",
      detailsDialog: false,
      detailsDialog2: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { sortable: false },
        { text: "الاسم الكامل ", value: "name" },
        { text: "اسم المستخدم ", value: "username" },
        { text: " الصلاحية ", value: "role" },
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
      if (this.name && this.username && this.roleId) {
        this.loading2 = true;
        const userData = {
          id: this.editId,
          name: this.name,
          username: this.username,
          role: this.roleId,
          password: this.password
        };
        axios
          .put("user", userData, {
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
              title: "اسم المستخدم موجود",
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
    openAdd() {
      this.name = "";
      this.username = "";
      this.roleId = "";
      this.detailsDialog = true;
    },
    addLap() {
      if (this.name && this.username && this.password && this.roleId) {
        this.loading2 = true;
        const userData = {
          name: this.name,
          username: this.username,
          password: this.password,
          role: this.roleId
        };
        axios
          .post("user", userData, {
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
              title: "اسم المستخدم موجود",
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
        .get("user", {
          headers: { access_token: `Bearer ${localStorage.getItem("tokin")}` }
        })
        .then(res => {
          console.log(res);
          this.loading = false;
          this.items = res.data;
        })
        .catch(err => {
          this.loading = false;
        });
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
          axios
            .delete("Lab/deleteUser?ID=" + id)
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
          this.name = this.items[i].name;
          this.username = this.items[i].username;
          this.roleId = this.items[i].role;
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
