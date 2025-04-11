import { defineStore } from "pinia";
import temperatures from "../data/temperatures.json";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
 } from "../types/beverage";
 import db from "../firebase.ts";
import { 
  collection, 
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: temperatures,
    currentTemp: temperatures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    currentName: '',
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
  }),

  actions: {
    init() {
    const baseCollection = collection(db, "bases");
      getDocs(baseCollection).then((qs) => {
      this.bases = qs.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        color: doc.data().color,
      }) as BaseBeverageType);

      this.currentBase = this.bases[0];
    });

    const creamerCollection = collection(db, "creamers");
    getDocs(creamerCollection).then((qs) => {
      this.creamers = qs.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        color: doc.data().color,
      }) as BaseBeverageType);

      this.currentCreamer = this.creamers[0];
    });

    const syrupCollection = collection(db, "syrups");
    getDocs(syrupCollection).then((qs) => {
      this.syrups = qs.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        color: doc.data().color,
      }) as BaseBeverageType);

      this.currentSyrup = this.syrups[0];
    });

    const beverageCollection = collection(db, "beverages");
    getDocs(beverageCollection).then((qs) => {
      this.beverages = qs.docs.map((doc) => {
      const data = doc.data();

      const matchedBase = this.bases.find(b => b.id.toLowerCase() === data.base.toLowerCase());
      const matchedCreamer = this.creamers.find(c => c.id.toLowerCase() === data.creamer.toLowerCase());
      const matchedSyrup = this.syrups.find(s => s.id.toLowerCase() === data.syrup.toLowerCase());
      console.log(doc.id)
      return {
        id: doc.id,
        name: doc.id,
        temp: data.temp ?? "unknown",
        base: matchedBase ?? { id: "unknown", name: data.base ?? "unknown", color: "#000" },
        creamer: matchedCreamer ?? { id: "unknown", name: data.creamer ?? "unknown", color: "#000" },
        syrup: matchedSyrup ?? { id: "unknown", name: data.syrup ?? "unknown", color: "#000" },
      };
    });
  });
  },

  async makeBeverage() {
    if (
      this.currentName && 
      this.currentTemp &&
      this.currentBase &&
      this.currentCreamer &&
      this.currentSyrup
    ) {
      const id = `${this.currentName.toLowerCase().replace(/\s+/g, '-')}`;
  
      const firebaseBeverage = {
        temp: this.currentTemp,
        base: this.currentBase.id,
        creamer: this.currentCreamer.id,
        syrup: this.currentSyrup.id,
      };
  
      try {
        await setDoc(doc(db, "beverages", id), firebaseBeverage);
  
        this.currentBeverage = {
          id,
          name: this.currentName, 
          temp: this.currentTemp,
          base: this.currentBase,
          creamer: this.currentCreamer,
          syrup: this.currentSyrup,
        };
  
        this.beverages.push(this.currentBeverage);
        console.log("Beverage saved to Firebase (without name field)");
  
        this.currentName = "";
      } catch (error) {
        console.error("Error saving beverage:", error);
      }
    }
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