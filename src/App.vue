<template>
  <div>
    <Beverage :isIced="beverageStore.currentTemp === 'Cold'" />
    <ul>
      <li>
        <template v-for="temp in beverageStore.temps" :key="temp.id">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="beverageStore.currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="base in beverageStore.bases" :key="base.id">
          <label>
            <input
              type="radio"
              name="Base Bev"
              :id="`r${base.id}`"
              :value="base"
              v-model="beverageStore.currentBase"
            />
            {{ base.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="creamer in beverageStore.creamers" :key="creamer.id">
          <label>
            <input
              type="radio"
              name="Creamer"
              :id="`r${creamer.id}`"
              :value="creamer"
              v-model="beverageStore.currentCreamer"
            />
            {{ creamer.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="syrup in beverageStore.syrups" :key="syrup.id">
          <label>
            <input
              type="radio"
              name="Syrup"
              :id="`r${syrup.id}`"
              :value="syrup"
              v-model="beverageStore.currentSyrup"
            />
            {{ syrup.name }}
          </label>
        </template>
      </li>
      <input type="text" placeholder="Beverage Name" v-model="beverageStore.currentName">
      <button @click="beverageStore.makeBeverage()">Make Beverage</button>
      <button @click="clearBeverages">Clear All Beverages</button>
    </ul>
    <div 
      v-for="beverage in beverageStore.beverages" 
      :key="beverage.id"
      @click="loadBeverage(beverage)"
      :style="{
        cursor: 'pointer',
        padding: '5px',
        margin: '3px',
        background: beverageStore.currentBeverage?.id === beverage.id 
          ? 'rgba(255,255,255,0.3)' 
          : 'rgba(255,255,255,0.1)'
      }"
    >
      {{ beverage.name }} - {{ beverage.temp }} {{ beverage.base.name }}
    </div>
  </div>

</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
import { watch } from 'vue';
import { BeverageType } from "./types/beverage";

const beverageStore = useBeverageStore();

const loadBeverage = (beverage: BeverageType) => {
  beverageStore.showBeverage(beverage);
};

const clearBeverages = () => {
  useBeverageStore().$patch({ beverages: [], currentBeverage: null });
};

// Debugging: Log when selections change
watch(
  () => beverageStore.currentBase,
  (newBase) => {
    console.log('Selected Base:', newBase);
  },
  { deep: true }
);

watch(
  () => beverageStore.currentSyrup,
  (newSyrup) => {
    console.log('Selected Syrup:', newSyrup);
  },
  { deep: true }
);

// Log initial state
console.log('INITIAL STATE:', {
  base: beverageStore.currentBase,
  syrup: beverageStore.currentSyrup,
  creamer: beverageStore.currentCreamer
});
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
</style>
