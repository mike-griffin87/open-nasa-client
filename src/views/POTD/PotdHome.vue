<template>
  <div class="potd">
    <div class="right" v-if="potd">
      <div v-if="fetching" class="loading-container">
        <i class="fas fa-spinner"></i>
      </div>
      <div v-else>
        <img
          v-if="potd.media_type === 'image'"
          :src="potd.url"
          @click="lightboxVisible = true"
        />
        <div v-if="potd.media_type === 'video'" class="embed-container">
          <iframe :src="potd.url" frameborder="0" allowfullscreen></iframe>
        </div>

        <aside v-if="potd.copyright">{{ potd.copyright }}</aside>

        <vue-easy-lightbox
          :visible="lightboxVisible"
          :imgs="[{ title: potd.title, src: potd.hdurl || potd.url }]"
          @hide="lightboxVisible = false"
        >
        </vue-easy-lightbox>
      </div>
    </div>

    <div class="left">
      <h1>
        {{ potd.title }}
      </h1>
      <div>
        {{ potd.explanation }}
      </div>

      <div class="btn-group">
        <button text @click="changePotd('previous')">
          <i class="fas fa-chevron-left"></i>
        </button>

        <button @click="changePotd('next')" :disabled="todayIsSelected">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dayjs from "dayjs";
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  name: "Home",
  components: {
    VueEasyLightbox,
  },
  data() {
    return {
      fetching: true,
      menu: false,
      lightboxVisible: false,
      selectedDate: this.$route.params.date || dayjs().format("YYYY-MM-DD"),
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

      this.$router.push(`/potd/${newDate}`);
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
      async handler() {
        this.fetching = true;
        await this.fetchPotd(this.selectedDate);
        this.fetching = false;
        this.menu = false;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.potd {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "left right";
  overflow: hidden;
  align-items: center;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 100%;
    grid-template-areas: "right" "left";
  }

  .left {
    grid-area: left;
    padding: 3rem 4rem;
    position: relative;
    backdrop-filter: blur(10px);

    @media screen and (max-width: 1000px) {
      padding: 1rem 2rem;
    }
  }

  .right {
    grid-area: right;
    align-items: center;
    display: flex;
    position: relative;
    height: 75vh;
    max-height: 800px;

    > div {
      height: 100%;
      width: 100%;
      img {
        cursor: pointer;
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
      }
    }

    @media screen and (max-width: 1000px) {
      height: 440px;
    }

    aside {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      padding: 0.5rem 1rem;
      background: rgba(49, 49, 50, 0.75);
      border-radius: 0.5rem;
      font-size: 12px;

      &::before {
        content: "\00a9";
        margin-right: 0.25rem;
      }
    }

    .loading-container {
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .btn-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: auto;

    button {
      cursor: pointer;
      border: none;
      background: none;
      color: white;
      font-size: 2rem;
      padding: 0.5rem;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }

  h1 {
    font-size: 56px;
    background-image: linear-gradient(90deg,#702BFC,#F23BFF,#FF7076);
    background-clip: linear-gradient(90deg,#702BFC,#F23BFF,#FF7076);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    border-bottom: 5px solid var(--font-main-dark);
    margin-bottom: 2rem;
    padding-bottom: 2rem;

    @media screen and (max-width: 1000px) {
      font-size: 3rem;
    }
  }
}

.fa-spinner {
  animation: fa-spin 2s infinite linear;
  font-size: 5rem;
}

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
