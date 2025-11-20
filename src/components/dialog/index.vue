<template >
  <div
    class="dialog"
    v-show="props.value"
  >
    <div class="dialog-content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:value"]);

defineExpose({});
</script>
<style lang="scss">
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  animation: dialog-fade-in 0.4s ease-in-out;
}
@keyframes dialog-fade-in {
  0% {
    background-color: transparent;
  }
  100% {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.dialog-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 10px;
}
</style>