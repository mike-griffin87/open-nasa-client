import Vue from "vue";
import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

import Archive from "./Archive";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();
let vuetify = new Vuetify();

Object.defineProperty(window, "open", {
  writable: true,
  value: jest.fn().mockImplementation(() => true),
});

const getters = {
  archive: jest.fn(() => [
    {
      date: "2021-10-03",
      explanation:
        'Sure, you can see the 2D rectangle of colors, but can you see deeper?  Counting color patches in the featured image, you might estimate that the most information that this 2D digital image can hold is about 60 (horizontal) x 50(vertical) x 256 (possible colors) = 768,000 bits.  However, the yet-unproven Holographic Principle states that,  counter-intuitively, the information in a 2D panel can include all of the information in a 3D room that can be enclosed by the panel.  The principle derives from the idea that the Planck length, the length scale where quantum mechanics begins to dominate classical gravity, is one side of an area that can hold only about one bit of information.  The limit was first postulated by physicist Gerard \'t Hooft in 1993.  It can arise from generalizations from seemingly distant speculation that the information held by a black hole is determined not by its enclosed volume but by the surface area of its event horizon.  The term "holographic" arises from a hologram analogy where three-dimension images are created by projecting light through a flat screen.  Beware, some people staring at the featured image may not think it encodes just 768,000 bits -- nor even 2563,000 bit permutations -- rather they might claim it  encodes a three-dimensional teapot.',
      hdurl:
        "https://apod.nasa.gov/apod/image/2110/teapotsirds_winfree_960.jpg",
      media_type: "image",
      service_version: "v1",
      title: "The Holographic Principle and a Teapot",
      url: "https://apod.nasa.gov/apod/image/2110/teapotsirds_winfree_960.jpg",
    },
    {
      date: "2021-10-02",
      explanation:
        'Sure, you can see the 2D rectangle of colors, but can you see deeper?  Counting color patches in the featured image, you might estimate that the most information that this 2D digital image can hold is about 60 (horizontal) x 50(vertical) x 256 (possible colors) = 768,000 bits.  However, the yet-unproven Holographic Principle states that,  counter-intuitively, the information in a 2D panel can include all of the information in a 3D room that can be enclosed by the panel.  The principle derives from the idea that the Planck length, the length scale where quantum mechanics begins to dominate classical gravity, is one side of an area that can hold only about one bit of information.  The limit was first postulated by physicist Gerard \'t Hooft in 1993.  It can arise from generalizations from seemingly distant speculation that the information held by a black hole is determined not by its enclosed volume but by the surface area of its event horizon.  The term "holographic" arises from a hologram analogy where three-dimension images are created by projecting light through a flat screen.  Beware, some people staring at the featured image may not think it encodes just 768,000 bits -- nor even 2563,000 bit permutations -- rather they might claim it  encodes a three-dimensional teapot.',
      hdurl:
        "https://apod.nasa.gov/apod/image/2110/teapotsirds_winfree_960.jpg",
      media_type: "image",
      service_version: "v1",
      title: "The Holographic Principle and a Teapot",
      url: "https://apod.nasa.gov/apod/image/2110/teapotsirds_winfree_960.jpg",
    },
  ]),
};

const actions = {
  fetchArchive: jest.fn(),
};

const store = new Vuex.Store({
  modules: {
    potd: {
      namespaced: true,
      getters,
      actions,
    },
  },
});

describe("Archive.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Archive, {
      localVue,
      store,
      router,
      vuetify,
      data() {
        return {
          fetching: false,
        };
      },
    });
  });

  it("should render new content on load more click", async () => {
    const loadMore = jest.spyOn(wrapper.vm, "loadMore");

    const loadMoreBtn = wrapper.find(".load-more-btn");

    await loadMoreBtn.trigger("click");

    expect(loadMore).toHaveBeenCalled();
  });
});
