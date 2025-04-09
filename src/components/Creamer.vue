<template>
  <div 
    class="creamer" 
    :style="{ backgroundColor: 'transparent' }" 
  >
    <div v-if="beverageStore.currentCreamer.color !== 'transparent'" class="froth">
      <div 
        v-for="i in 5" 
        :key="i" 
        class="foam" 
        :style="{ backgroundColor: beverageStore.currentCreamer.color }" 
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBeverageStore } from "../stores/beverageStore";
const beverageStore = useBeverageStore();
</script>

<style lang="scss" scoped>
.creamer {
  position: absolute;
  width: 100%;
  height: 20%;
  top: 0;
  z-index: 220;
  animation: pour-tea 2s forwards;
}

.froth {
  overflow: hidden;
  transform: translateY(400%);
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 200;
  background-color: #c6c6c6; /* Ensure froth is transparent */
  animation: pour-tea 2s 2s forwards;
}

.foam {
  display: block;
  border-radius: 30px;
  height: 40px;
  width: 40px;
  position: absolute;
  /* Background color is now dynamically set in the template */
}

.foam:nth-child(1) {
  top: 0px;
  left: -3px;
}

.foam:nth-child(2) {
  top: 0px;
  left: 55px;
}

.foam:nth-child(3) {
  width: 30px;
  height: 30px;
  border-radius: 40px;
  top: 3px;
  left: 30px;
}

.foam:nth-child(4) {
  width: 30px;
  height: 30px;
  border-radius: 45px;
  top: 5px;
  right: -2px;
}

.foam:nth-child(5) {
  top: 2px;
  right: 10px;
}
</style>