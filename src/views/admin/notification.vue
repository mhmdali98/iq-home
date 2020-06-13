<template>
  <div>
    <v-toolbar dense flat color="grey lighten-4">
      <v-toolbar-title class="pl-2">الاشعارات</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="#55AB88" dark @click="rest()">اضافة اشعار</v-btn>
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
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn class="indigo--text" icon v-on="on" large>
                    <v-icon l @click="delet(item.id)" color="red">mdi-delete-outline</v-icon>
                  </v-btn>
                </template>
                <span>حذف</span>
              </v-tooltip>
              <v-tooltip bottom v-if="item.status == 'WAITING'">
                <template v-slot:activator="{ on }">
                  <v-btn class="indigo--text" icon v-on="on" large>
                    <v-icon l @click="edit(item.id)" color="green">mdi-check-outline</v-icon>
                  </v-btn>
                </template>
                <span>تاكيد الاشعار</span>
              </v-tooltip>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                class="ma-2"
                color="amber darken-1"
                text-color="white"
                v-if="item.status == 'WAITING'"
              >{{ item.status }}</v-chip>
              <v-chip
                class="ma-2"
                color="teal darken-1"
                text-color="white"
                v-if="item.status != 'WAITING'"
              >{{ item.status }}</v-chip>
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
    <v-dialog v-model="detailsDialog" width="600" persistent>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            <h3>اضافة اشعار</h3>
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
                :items="typeOption"
                label="اختر نوع الاشعار"
                outlined
                :rules="[v => !!v || 'يجب تحديد النوع']"
                required
                v-model="typeID"
              ></v-select>
              <v-text-field
                outlined
                label=" عنوان الاشعار : "
                v-model="name"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
              <v-text-field
                outlined
                label=" المقال المختصر : "
                v-model="phone"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
              <v-textarea
                outlined
                name="input-7-4"
                v-model="details"
                label="اكتب المقال الكامل هنا ..."
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              ></v-textarea>
              <v-file-input
                v-model="file"
                label="اختار الصورة "
                outlined
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              ></v-file-input>
              <v-select
                :items="soursOption"
                label="اختر المصدر"
                outlined
                :rules="[v => !!v || 'يجب تحديد المصدر']"
                required
                v-model="soursID"
              ></v-select>

              <div v-for="(input, k) in sections" :key="k + 'a'">
                <v-card class="pa-5" outlined>
                  <h3 class="mb-2">سكشن رقم ({{ k + 1 }}) :</h3>
                  <v-file-input
                    v-model="input.file"
                    label="اختار الصورة"
                    outlined
                    :rules="[v => !!v || 'هذا الحقل مطلوب']"
                  ></v-file-input>
                  <v-textarea
                    outlined
                    name="input-7-4"
                    v-model="input.body"
                    label="اكتب المقال الكامل هنا ..."
                    :rules="[v => !!v || 'هذا الحقل مطلوب']"
                  ></v-textarea>
                  <v-row align="center">
                    <v-col cols="12" md="1" v-show="k == sections.length - 1">
                      <v-btn class="mx-2" fab dark small color="primary" @click="add(k)">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" md="1" v-show="k || (!k && sections.length > 1)">
                      <v-btn class="mx-2" fab dark small color="pink" @click="remove(k)">
                        <v-icon dark>mdi-minus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </v-col>
          </v-row>
          <br />
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="detailsDialog = false">اغلاق</v-btn>
          <v-btn color="blue darken-1" text @click="uploadImg()" :loading="loading2">حفظ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="detailsDialog2" width="400" persistent>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            <h3>تعديل المصدر</h3>
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
                label=" السؤال : "
                v-model="name"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />

              <v-text-field
                outlined
                label=" الجواب المختصر : "
                v-model="phone"
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              />
              <v-textarea
                outlined
                name="input-7-4"
                v-model="details"
                label="اكتب الجواب الكامل هنا ..."
                :rules="[v => !!v || 'هذا الحقل مطلوب']"
              ></v-textarea>
              <v-file-input v-model="file" label="تغيير صورة ال logo" outlined></v-file-input>
            </v-col>
          </v-row>
          <br />
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="detailsDialog2 = false">اغلاق</v-btn>
          <v-btn color="blue darken-1" text @click="uploadImg2()" :loading="loading2">حفظ</v-btn>
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
      sections: [
        {
          file: "",
          body: "",
          cover: ""
        }
      ],
      typeID: "",
      typeOption: [
        { text: "محلي", value: "LOCAL" },
        { text: "عالمي", value: "INTERNATIONAL" }
      ],
      soursID: "",
      soursOption: [],
      details: "",
      file: null,
      img_path: "",
      name: "",
      phone: "",
      fbLink: "",
      twLink: "",
      teleLink: "",
      search: "",
      loading2: false,
      detailsDialog: false,
      detailsDialog2: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { sortable: false },
        { text: "النوع", value: "type" },
        { text: "العنوان", value: "title" },
        // { text: "عنوان مصغر", value: "subtitle" },
        { text: "  الحالة ", value: "status" },
        { text: "العمليات", value: "actions" }
      ],
      items: [],
      coontractCount: [],
      loading: false,
      editId: "",
      details: ""
    };
  },
  methods: {
    add(index) {
      this.sections.push({
        file: "",
        body: "",
        cover: ""
      });
    },
    remove(index) {
      this.sections.splice(index, 1);
    },
    rest() {
      this.name = "";
      this.phone = "";
      this.details = "";
      this.file = "";
      this.detailsDialog = true;
    },
    uploadImg() {
      let formData = new FormData();
      formData.append("file", this.file);
      // console.log(formData);
      this.loading2 = true;
      axios
        .post("file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "multipart/form-data",
            access_token: `Bearer ${localStorage.getItem("tokin")}`
          }
        })
        .then(res => {
          //   console.log(res);
          this.img_path = res.data.url;
          this.uploadImg2();
        })
        .catch(err => {
          Swal.fire("خطا في رفع الصورة");
          this.loading2 = false;
        });
    },
    async uploadImg2() {
      for (let i = 0; i < this.sections.length; i++) {
        let formData = new FormData();
        formData.append("file", this.sections[i].file);
        // console.log(formData);
        await axios
          .post("file/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "multipart/form-data",
              access_token: `Bearer ${localStorage.getItem("tokin")}`
            }
          })
          .then(res => {
            //   console.log(res);
            this.sections[i].cover = res.data.url;
          })
          .catch(err => {
            // Swal.fire("خطا في رفع الصورة");
            this.loading2 = false;
          });

        let j = i;
        j++;
        if (this.sections.length == j) {
          // console.log(this.sections);
          this.addLap();
        }
      }
    },
    editInfo() {
      if (this.name && this.phone && this.img_path && this.details) {
        this.loading2 = true;
        const cityData = {
          id: this.editId,
          question: this.name,
          logo: this.img_path,
          shortAnswer: this.phone,
          answer: this.details
        };
        axios
          .put("qna", cityData, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
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
              title: "خطا في ارسال المعلومات",
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
      if (this.name && this.phone && this.img_path && this.details) {
        this.loading2 = true;
        const cityData = {
          type: this.typeID,
          title: this.name,
          subtitle: this.phone,
          body: this.details,
          cover: this.img_path,
          sections: this.sections,
          source: {
            id: this.soursID
          }
        };
        axios
          .post("notification", cityData, {
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
              title: "خطا في ارسال المعلومات",
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
        .get("notification/all/0/1000", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
    getSors() {
      axios
        .get("source", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            access_token: `Bearer ${localStorage.getItem("tokin")}`
          }
        })
        .then(res => {
          this.soursOption = res.data;
          for (let i = 0; i < this.soursOption.length; i++) {
            this.soursOption[i].value = this.soursOption[i].id;
            this.soursOption[i].text = this.soursOption[i].name;
          }
        })
        .catch(err => {});
    },
    delet(id) {
      Swal.fire({
        title: "هل انت متاكد من حذف الاشعار؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا"
      }).then(result => {
        if (result.value) {
          axios
            .delete("notification/" + id, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                access_token: `Bearer ${localStorage.getItem("tokin")}`
              }
            })
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
      Swal.fire({
        title: "هل انت متاكد من تاكيد الاشعار؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا"
      }).then(result => {
        if (result.value) {
          axios
            .post(
              "notification/push/" + id,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  access_token: `Bearer ${localStorage.getItem("tokin")}`
                }
              }
            )
            .then(res => {
              this.rnData();
              Swal.fire({
                title: "تمت عملية التاكيد بنجاح",
                icon: "success",
                confirmButtonText: "اغلاق"
              });
            })
            .catch(err => {
              Swal.fire({
                title: "فشلت عمليت التاكيد",
                icon: "error",
                confirmButtonText: "اغلاق"
              });
            });
        }
      });
    }
  },
  created() {
    this.rnData();
    this.getSors();
  }
};
</script>
