<template>
  <div>
    <h1>Event Listing For {{ user.user.name }}</h1>
    <EventCard
      v-for="event in event.events.data"
      :key="event.id"
      :event="event"
    />

    <router-link
      v-if="page !== 1"
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
    >
      Prev Page
    </router-link>

    <span v-if="page !== 1 && !isLastPage"> | </span>

    <router-link
      v-if="!isLastPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page
    </router-link>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import EventCard from "@/components/EventCard.vue";

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;
  store.dispatch("event/fetchEvents", { page: currentPage }).then(() => {
    routeTo.params.page = currentPage;
    next();
  });
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
  },
  beforeRouteEnter: (routeTo, routeFrom, next) => {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate: (routeTo, routeFrom, next) => {
    getPageEvents(routeTo, next);
  },
  computed: {
    isLastPage() {
      let totalInPage = this.page * 3;
      let totalEvent = this.$store.state.event.events.count;
      if (totalInPage < totalEvent) return false;
      return true;
    },
    ...mapState(["event", "user"]),
  },
  // Second way to get events when query changes
  // watch: {
  //   page() {
  //     this.$store.dispatch("fetchEvents", { perPage: 3, page: this.page });
  //   },
  // },
};
</script>
