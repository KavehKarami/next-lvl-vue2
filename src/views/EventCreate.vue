<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <form @submit.prevent="submitEvent">
      <base-select
        label="Select a category"
        v-model="event.category"
        :options="categories"
      ></base-select>
      <h3>Name & describe your event</h3>

      <base-input
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
      />

      <base-input
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
      />

      <h3>Where is your event?</h3>
      <base-input
        label="Location"
        type="text"
        placeholder="Add a location"
        v-model="event.location"
      />

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <base-select
        label="Select a time"
        v-model="event.time"
        :options="times"
      ></base-select>

      <base-button @click="logger" type="submit" buttonClass="-fill-gradient">
        Submit
      </base-button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";

export default {
  components: {
    Datepicker,
  },

  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      incrementBy: 0,
      event: this.createFreshEvent(),
      times,
    };
  },
  computed: {
    // one way:
    /* userName() {
      return this.$store.state.user.name;
    }, */
    // another way:
    /* ...mapState({
      userID: (state) => state.user.id,
      categories: "categories",
    }), */

    // best way states:
    ...mapState(["user", "categories"]),
    // best way for getters:
    ...mapGetters(["findTodo"]),
    // ------------------------------------------------------
    catLength() {
      // one way:
      /* return this.$store.state.categories.length; */

      // another way:
      return this.$store.getters.categoryLength;
    },
    // getTodo() {
    //   return this.$store.getters.findTodo;
    // },
  },
  methods: {
    incrementCount() {
      // this.$store.commit("INCREMENT_COUNT", this.incrementBy);
      this.$store.dispatch("event/updateCount", this.incrementBy);
    },
    createFreshEvent() {
      const { user } = this.$store.state.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: [],
      };
    },
    logger() {
      console.log(1);
    },
    async submitEvent() {
      try {
        NProgress.start();
        await this.$store.dispatch("event/createEvent", this.event);
        this.$router.push({
          name: "event-show",
          params: { id: this.event.id },
        });
        this.event = this.createFreshEvent();
      } catch (err) {
        console.log(err);
        NProgress.end();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
