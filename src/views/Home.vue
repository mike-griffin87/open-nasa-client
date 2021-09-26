<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-center">
        <h1>Astronomy Photo of the Day</h1></v-col
      >
      <v-col cols="3">
        <v-menu
          ref="menu"
          v-model="menu"
          transition="scale-transition"
          offset-y
          min-width="auto"
          :close-on-content-click="false"
          :return-value.sync="date"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="selectedDate"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="selectedDate"
            no-title
            scrollable
            :max="todaysDate"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" v-if="potd">
        <v-card class="mx-auto">
          <v-img
            v-if="potd.media_type === 'image'"
            class="white--text align-end"
            height="400px"
            :src="potd.url"
            :lazy-src="potd.hdurl"
            @click="openInNewTab(potd.hdurl)"
          >
            <v-card-title>{{ potd.title }}</v-card-title>
          </v-img>
          <div v-if="potd.media_type === 'video'" class="embed-container">
            <iframe :src="potd.url" frameborder="0" allowfullscreen></iframe>
          </div>

          <v-card-subtitle class="pb-0"> {{ potd.copyright }} </v-card-subtitle>

          <v-card-text class="text--primary">
            <h2 v-if="potd.media_type === 'video'" class="my-3">
              {{ potd.title }}
            </h2>
            <div>{{ potd.explanation }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text @click="changePotd('previous')">
              Previous
            </v-btn>

            <v-btn
              color="orange"
              text
              @click="changePotd('next')"
              :disabled="todayIsSelected"
            >
              Next
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-skeleton-loader
          v-if="fetching"
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "Home",
  data() {
    return {
      fetching: true,
      menu: false,
      selectedDate: this.$route.query.date || dayjs().format("YYYY-MM-DD"),
      todaysDate: dayjs().format("YYYY-MM-DD"),
    };
  },
  methods: {
    ...mapActions("potd", ["fetchPotd"]),
    async changePotd(direction) {
      const date = dayjs(this.selectedDate);
      const nextDate = date.add(1, "day").format("YYYY-MM-DD");
      const newDate =
        direction === "next"
          ? this.isAfterToday(nextDate)
            ? this.selectedDate
            : nextDate
          : date.subtract(1, "day").format("YYYY-MM-DD");
      this.selectedDate = newDate;
    },
    isAfterToday(date) {
      return dayjs().isBefore(date);
    },
    openInNewTab(url) {
      window.open(url, "_blank");
    },
  },
  computed: {
    ...mapGetters("potd", ["potd"]),
    todayIsSelected() {
      return this.todaysDate === this.selectedDate;
    },
  },
  watch: {
    selectedDate: {
      handler() {
        this.fetching = true;
        this.fetchPotd(this.selectedDate);
        this.fetching = false;
        this.menu = false;
        if (this.$route.query.date !== this.selectedDate)
          this.$router.push({ query: { date: this.selectedDate } });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
