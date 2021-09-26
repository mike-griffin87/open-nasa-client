<template>
  <v-container>
    <v-row>
      <v-col class="d-flex"> <h1>Astronomy Photo of the Day</h1></v-col>
      <v-col cols="3">
        <v-menu
          ref="menu"
          v-model="menu"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="selectedDate"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="selectedDate" no-title scrollable>
          </v-date-picker>
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
          >
            <v-card-title>{{ potd.title }}</v-card-title>
          </v-img>
          <div v-if="potd.media_type === 'video'" class="embed-container">
            <iframe :src="potd.url" frameborder="0" allowfullscreen></iframe>
          </div>

          <v-card-subtitle class="pb-0"> {{ potd.copyright }} </v-card-subtitle>

          <v-card-text class="text--primary">
            <h2 v-if="potd.media_type === 'video'" class="mb-3">
              {{ potd.title }}
            </h2>
            <div
              v-if="potd.media_type === 'video' && potd.copyright"
              class="grey--text mb-4"
            >
              {{ potd.copyright }}
            </div>
            <div>{{ potd.explanation }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text> Share </v-btn>

            <v-btn color="orange" text> Explore </v-btn>
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
    };
  },
  methods: {
    ...mapActions("potd", ["fetchPotd"]),
  },
  computed: {
    ...mapGetters("potd", ["potd"]),
  },
  watch: {
    selectedDate: {
      handler() {
        this.fetching = true;
        this.fetchPotd(this.selectedDate);
        this.fetching = false;
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
