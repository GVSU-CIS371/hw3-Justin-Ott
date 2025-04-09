import { defineStore } from "pinia";
import temperatures from "../data/temperatures.json";
import bases from "../data/bases.json";
import creamers from "../data/creamers.json"; // Should be JSON data, not components
import syrups from "../data/syrups.json"; // Should be JSON data, not components
import { BeverageType } from "../types/beverage";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: temperatures,
    currentTemp: temperatures[0],
    bases: bases,
    currentBase: bases[0],
    creamers: creamers,
    currentCreamer: creamers[0],
    syrups: syrups,
    currentSyrup: syrups[0],
    currentName: '',
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
  }),

  actions: {
    makeBeverage() {
      const newBeverage: BeverageType = {
        name: this.currentName,
        id: `${this.currentTemp}-${this.currentBase.id}-${this.currentCreamer.id}-${this.currentSyrup.id}`,
        temp: this.currentTemp,
        base: this.currentBase,
        syrup: this.currentSyrup,
        creamer: this.currentCreamer
      };
      
      this.currentBeverage = newBeverage;
      this.beverages.push(newBeverage);
    },
    
    showBeverage(beverage: BeverageType) {
      if (beverage) {
        this.currentBase = beverage.base;
        this.currentTemp = beverage.temp;
        this.currentSyrup = beverage.syrup;
        this.currentCreamer = beverage.creamer;
        this.currentName = beverage.name;
      }
    },
  },
  
  persist: true,
});