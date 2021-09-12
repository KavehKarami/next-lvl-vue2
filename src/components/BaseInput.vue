<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input :value="value" @input="updateInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
    },
    value: [String, Number],
  },

  methods: {
    updateInput(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
