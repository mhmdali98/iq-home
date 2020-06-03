<template>
  <v-container>
    <!-- <v-toolbar dense flat color="grey lighten-4">
      <v-toolbar-title class="pl-2">الرئيسية</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>-->
    <v-row class>
      <v-col cols="12" md="3" sm="12">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="mx-auto" color="grey lighten-4" elevation="5">
            <v-card-title>
              <v-row align="start">
                <div class="pr-5">
                  <span class="display-2 font-weight-black">5</span>
                  <strong v-if="avg">عدد المستخدمين</strong>
                </div>
              </v-row>

              <v-spacer></v-spacer>

              <v-icon
                :color="checking ? 'red lighten-2' : '#55ab88'"
                class="mr-1"
                size="50"
                @click="takePulse"
              >mdi-account-group-outline</v-icon>
            </v-card-title>

            <v-sheet color="transparent">
              <v-sparkline
                padding="0"
                :fill="fill"
                :key="String(avg)"
                :smooth="16"
                :gradient="['#338664', '#55ab88', '#55ab88']"
                :line-width="5"
                :value="heartbeats"
                auto-draw
                stroke-linecap="round"
              ></v-sparkline>
            </v-sheet>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="mx-auto" color="grey lighten-4" elevation="5">
            <v-card-title>
              <v-row align="start">
                <div class="pr-5">
                  <span class="display-2 font-weight-black">32</span>
                  <strong v-if="avg">عدد المصادر</strong>
                </div>
              </v-row>

              <v-spacer></v-spacer>

              <v-icon
                :color="checking ? 'red lighten-2' : '#55ab88'"
                class="mr-12"
                size="50"
                @click="takePulse"
              >mdi-chart-bar-stacked</v-icon>
            </v-card-title>

            <v-sheet color="transparent">
              <v-sparkline
                padding="0"
                :fill="fill"
                :key="String(avg)"
                :smooth="16"
                :gradient="['#338664', '#55ab88', '#55ab88']"
                :line-width="5"
                :value="heartbeats2"
                auto-draw
                stroke-linecap="round"
              ></v-sparkline>
            </v-sheet>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="mx-auto" color="grey lighten-4" elevation="5">
            <v-card-title>
              <v-row align="start">
                <div class="pr-5">
                  <span class="display-2 font-weight-black">21</span>
                  <strong v-if="avg">عدد النصائح</strong>
                </div>
              </v-row>

              <v-spacer></v-spacer>

              <v-icon
                :color="checking ? 'red lighten-2' : '#55ab88'"
                class="mr-12"
                size="50"
                @click="takePulse"
              >mdi-charity</v-icon>
            </v-card-title>

            <v-sheet color="transparent">
              <v-sparkline
                padding="0"
                :fill="fill"
                :key="String(avg)"
                :smooth="16"
                :gradient="['#338664', '#55ab88', '#55ab88']"
                :line-width="5"
                :value="heartbeats3"
                auto-draw
                stroke-linecap="round"
              ></v-sparkline>
            </v-sheet>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="mx-auto" color="grey lighten-4" elevation="5">
            <v-card-title>
              <v-row align="start">
                <div class="pr-5">
                  <span class="display-2 font-weight-black">34</span>
                  <strong v-if="avg">عدد الاسئلة</strong>
                </div>
              </v-row>

              <v-spacer></v-spacer>

              <v-icon
                :color="checking ? 'red lighten-2' : '#55ab88'"
                class="mr-12"
                size="50"
                @click="takePulse"
              >mdi-book-account-outline</v-icon>
            </v-card-title>

            <v-sheet color="transparent">
              <v-sparkline
                padding="0"
                :fill="fill"
                :key="String(avg)"
                :smooth="16"
                :gradient="['#338664', '#55ab88', '#55ab88']"
                :line-width="5"
                :value="heartbeats2"
                auto-draw
                stroke-linecap="round"
              ></v-sparkline>
            </v-sheet>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class>
      <v-col cols="12" md="4" sm="12">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="mx-auto" max-width="400">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="blue-grey darken-4"
              elevation="12"
              max-width="calc(100% - 32px)"
            >
              <v-sparkline
                :labels="labels"
                :value="value"
                color="white"
                line-width="2"
                padding="16"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="title font-weight-light mb-2">عدد المصابين الكلي</div>
              <div class="subheading font-weight-light grey--text">6373</div>
              <v-divider class="my-2"></v-divider>
              <v-icon class="mr-2" small>mdi-clock</v-icon>
              <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
            </v-card-text>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="mx-auto" max-width="400">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="teal "
              elevation="12"
              max-width="calc(100% - 32px)"
            >
              <v-sparkline
                :labels="labels"
                :value="value2"
                color="white"
                line-width="2"
                padding="16"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="title font-weight-light mb-2">عدد المتعافين الكلي</div>
              <div class="subheading font-weight-light grey--text">3462</div>
              <v-divider class="my-2"></v-divider>
              <v-icon class="mr-2" small>mdi-clock</v-icon>
              <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
            </v-card-text>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="mx-auto" max-width="400">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="pink "
              elevation="12"
              max-width="calc(100% - 32px)"
            >
              <v-sparkline
                :labels="labels"
                :value="value3"
                color="white"
                line-width="2"
                padding="16"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="title font-weight-light mb-2">عدد المتوفين الكلي</div>
              <div class="subheading font-weight-light grey--text">208</div>
              <v-divider class="my-2"></v-divider>
              <v-icon class="mr-2" small>mdi-clock</v-icon>
              <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
            </v-card-text>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="pt-10" color="grey lighten-4" elevation="5">
            <ve-pie :colors="colors1" :data="chartData"></ve-pie>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col lg="6" md="6" sm="12">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="pt-10" color="grey lighten-4" elevation="5">
            <ve-line :colors="colors1" :data="chartData2"></ve-line>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
const exhale = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  data: () => ({
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
    value2: [342, 543, 355, 757, 789, 543, 567, 342],
    value3: [123, 432, 654, 876, 654, 234, 789, 546],
    dash: [],
    transition: "scale-transition",
    loading: false,
    checking: false,
    heartbeats: [],
    heartbeats2: [],
    heartbeats3: [],
    fill: true,
    chartData2: {
      columns: ["date", "اصابات", "شفاء"],
      rows: [
        {
          اصابات: 1,
          date: "05/05",
          شفاء: 1
        },
        {
          اصابات: 3,
          date: "05/10",
          شفاء: 2
        },
        {
          اصابات: 5,
          date: "05/15",
          شفاء: 6
        },
        {
          اصابات: 2,
          date: "05/20",
          شفاء: 4
        },
        {
          اصابات: 4,
          date: "05/25",
          شفاء: 5
        },
        {
          اصابات: 6,
          date: "05/30",
          شفاء: 2
        }
      ]
    },
    chartData: {
      columns: ["name", "number"],
      rows: [
        { name: "المصابين", number: 3590 },
        { name: "المتعافين", number: 3367 }
      ]
    },
    colors1: ["#E91E63", "#009688"]
  }),

  computed: {
    avg() {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0);
      const length = this.heartbeats.length;

      if (!sum && !length) return 0;

      return Math.ceil(sum / length);
    }
  },

  created() {
    this.takePulse(false);
    this.getDash();
  },

  methods: {
    getDash() {
      this.loading = true;
      axios
        .get("Lab/Dashboard")
        .then(res => {
          this.dash = res.data.result;
          this.chartData.rows[0].number = this.dash.done;
          this.chartData.rows[1].number = this.dash.notdone;

          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    heartbeat() {
      return Math.ceil(Math.random() * (120 - 80) + 80);
    },
    async takePulse(inhale = true) {
      this.checking = true;

      inhale && (await exhale(1000));

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat);
      this.heartbeats2 = Array.from({ length: 15 }, this.heartbeat);
      this.heartbeats3 = Array.from({ length: 10 }, this.heartbeat);

      this.checking = false;
    }
  }
};
</script>

<style lang="scss" scoped>
strong {
  font-size: 1rem;
}
</style>
