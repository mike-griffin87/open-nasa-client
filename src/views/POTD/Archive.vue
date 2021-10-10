<template>
  <div>
    <div>
      <div class="d-flex align-center">
        <h1>Astronomy Photo of the Day</h1>
      </div>
    </div>
    <div>
      <div dense>
        <div v-for="(item, i) in archive" :key="i" cols="12" md="6">
          <div>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <div class="text-h5" v-text="item.title"></div>

                <aside v-text="item.date"></aside>

                <div-actions>
                  <button
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    :href="`/?date=${item.date}`"
                  >
                    VIEW
                  </button>
                </div-actions>
              </div>

              <v-img :src="item.thumbnail_url || item.url"></v-img>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="d-flex justify-center">
          <button @click="loadMore" :disabled="fetching" class="load-more-btn">
            {{ fetching ? "FETCHING" : "LOAD MORE" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "Home",
  data() {
    return {
      fetching: true,
      toDate: dayjs().format("YYYY-MM-DD"),
      fromDate: dayjs(this.toDate).subtract(9, "day").format("YYYY-MM-DD"),
    };
  },
  methods: {
    ...mapActions("potd", ["fetchArchive"]),
    async loadMore() {
      this.fetching = true;
      this.toDate = dayjs(this.fromDate)
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      this.fromDate = dayjs(this.fromDate)
        .subtract(9, "day")
        .format("YYYY-MM-DD");
      try {
        await this.fetchArchive({
          from: this.fromDate,
          to: this.toDate,
        });
      } finally {
        this.fetching = false;
      }
    },
  },
  computed: {
    ...mapGetters("potd", ["archive"]),
  },
  async created() {
    this.fromDate = dayjs(this.toDate).subtract(9, "day").format("YYYY-MM-DD");
    await this.fetchArchive({
      from: this.fromDate,
      to: this.toDate,
    });
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
