<template>
  <div class="container mx-auto p-2 md:w-4/5 lg:w-2/4">
    <div class="flex justify-between items-center mb-4">
      <button @click="prevDays" class="text-gray-500 hover:text-black transition-transform transform hover:scale-110">
        <i class="fas fa-chevron-left text-2xl"></i>
      </button>
      <div class="flex items-center mx-auto">
        <input type="date" v-model="selectedDateString" @change="onDateChange" class="bg-gray-700 p-3 text-gray-50 rounded-lg hover:bg-gray-600 transition-colors">
      </div>
      <button @click="nextDays" class="text-gray-500 hover:text-black transition-transform transform hover:scale-110">
        <i class="fas fa-chevron-right text-2xl"></i>
      </button>
    </div>
    <div class="flex justify-between mt-4 transition-all duration-500" :class="transitionClass">
      <div v-for="day in visibleDays" :key="day.date" class="text-center flex-1">
        <div class="py-1 text-lg text-gray-50">
          {{ day.weekday }}
        </div>
        <div
            :class="[
            'py-2',
            'cursor-pointer',
            'transition-colors',
            'duration-300',
            day.isCurrentMonth ? 'text-black' : 'text-gray-400',
            day.isToday ? 'text-black' : 'text-gray-50',
            isSelected(day.date) ? 'bg-blue-500 text-white rounded-full' : ''
          ]"
            @click="selectDate(day.date)"
        >
          {{ day.date.getDate() }}
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { format, startOfWeek, addDays, subDays, isToday, isSameMonth, isSameDay } from 'date-fns'
import {useDateStore} from "../stores/dateStore.ts";



const dateStore = useDateStore()
const selectedDate = ref(new Date());
const startDate = ref(subDays(selectedDate.value, 3));
const transitionClass = ref('');

const days = computed(() => {
  const start = subDays(selectedDate.value, 3);
  const end = addDays(selectedDate.value, 3);
  const date = new Date(start);
  const daysArray = [];

  while (date <= end) {
    daysArray.push({
      date: new Date(date),
      weekday: format(date, 'EEE'), // 'EEE' gives us the abbreviated weekday
      isToday: isToday(date),
      isCurrentMonth: isSameMonth(date, selectedDate.value),
    });
    date.setDate(date.getDate() + 1);
  }

  return daysArray;
});

const visibleDays = computed(() => {
  return days.value;
});

const month = computed(() => format(selectedDate.value, 'MM'));
const year = computed(() => format(selectedDate.value, 'yyyy'));

const prevDays = () => {
  transitionClass.value = 'slide-right';
  setTimeout(() => {
    selectedDate.value = subDays(selectedDate.value, 7);
    startDate.value = subDays(selectedDate.value, 3);
    transitionClass.value = '';
  }, 300);
};

const nextDays = () => {
  transitionClass.value = 'slide-left';
  setTimeout(() => {
    selectedDate.value = addDays(selectedDate.value, 7);
    startDate.value = subDays(selectedDate.value, 3);
    transitionClass.value = '';
  }, 300);
};

const selectDate = (date: Date) => {
  selectedDate.value = date;
  startDate.value = subDays(date, 3);
};

const isSelected = (date: Date) => {
  return isSameDay(date, selectedDate.value);
};

const selectedDateString = computed({
  get: () => format(selectedDate.value, 'yyyy-MM-dd'),
  set: (value: string) => {
    const date = new Date(value);
    selectedDate.value = date;
    startDate.value = subDays(date, 3);
  }
});

const onDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedDateString.value = target.value;
};

watch(selectedDateString,(nv) => {
  dateStore.setDate(nv)
})
</script>

<style scoped>
.container {
  max-width: 100%;
}
.flex-1 {
  flex: 1;
}
.transition-all {
  transition: all 0.5s ease;
}
.slide-left {
  transform: translateX(-100%);
}
.slide-right {
  transform: translateX(100%);
}
</style>
