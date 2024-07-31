// src/stores/dateStore.ts

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDateStore = defineStore('dateStore', () => {
    const currentDate = ref()

    const setDate = (newDate: string) => {
        currentDate.value = newDate;
    }
    const getDate = () => {
        return currentDate.value
    }

    return {
        currentDate,
        setDate,
        getDate
    };
});
