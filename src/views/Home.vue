<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>NASA - Photo of the Day</h1>
      </v-col>
      <v-col cols="12">
        <v-card elevation="2" v-if="potd && !fetching" min-width="100%">
          <v-img
            v-if="potd.media_type === 'image'"
            contain
            width
            :aspect-ratio="16 / 9"
            :src="potd.url"
            :lazy-src="potd.hdurl"
          ></v-img>
          <div v-if="potd.media_type === 'video'" class="embed-container">
            <iframe :src="potd.url" frameborder="0" allowfullscreen></iframe>
          </div>
          <!-- <v-card-title>{{ potd.title }}</v-card-title> -->
          <v-card-text>
            <v-row>
              <v-col cols="7">
                <h2>{{ potd.title }}</h2>
                <div class="grey--text mb-4">{{ potd.copyright }}</div>
                {{ potd.explanation }}
              </v-col>
              <v-col cols="4" offset="1">
                <v-date-picker v-model="picker"></v-date-picker>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-skeleton-loader
          v-if="fetching"
          v-bind="attrs"
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      fetching: true,
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  methods: {
    ...mapActions("potd", ["fetchPotd"]),
  },
  computed: {
    ...mapGetters("potd", ["potd"]),
  },
  watch: {
    picker() {
      this.fetching = true;
      this.fetchPotd(this.picker);
      this.fetching = false;
    },
  },
  async created() {
    await this.fetchPotd();
    this.fetching = false;
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
