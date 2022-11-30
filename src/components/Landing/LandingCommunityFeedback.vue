<template>
  <div class="bg-gray-200">
    <div class="container mx-auto px-4 space-y-10 pb-20">
      <div class="text-center text-2xl font-medium px-12">
        Una comunidad con miles de intercambio de ideas
      </div>
      <div
        class="grid grid-cols-1 grid-rows-5 justify-items-center md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2"
      >
        <div
          v-for="feed in feedbacks"
          :key="feed.name"
          class="w-80 text-sm mb-16 bg-white md:bg-transparent p-4"
        >
          <div class="flex items-center space-x-5">
            <div>
              <img
                :src="feed.avatar"
                class="h-14 w-14 object-cover rounded-full"
              />
            </div>
            <div>
              <p>{{ feed.name }}</p>
              <p>{{ feed.date }}</p>
            </div>
          </div>

          <div class="mt-5">
            {{ feed.feedback }}
          </div>

          <div class="mt-3">
            <div class="flex space-x-5">
              <button
                v-for="(label, index) in feed.labels"
                :key="index"
                class="border border-black rounded-xl px-2"
              >
                {{ label }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button
          class="bg-blue-700 hover:bg-blue-800 text-white text-sm px-4 py-2"
        >
          Visite nuestra comunidad
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar1 from '@/assets/img/avatar1.jpg';
import Avatar2 from '@/assets/img/avatar2.jpg';
import Avatar3 from '@/assets/img/avatar3.jpg';

let feedbacks = [
  {
    avatar: Avatar1,
    name: 'Marcos Fong',
    date: 'Agost 23',
    feedback:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate odit repudiandae quo obcaecati animi.',
    labels: ['Playas', 'Caribe', 'Airbnb', 'Taxi'],
  },
  {
    avatar: Avatar2,
    name: 'Ana Paula',
    date: 'Septiem 12',
    feedback:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate odit repudiandae quo obcaecati animi.',
    labels: ['Playas', 'Airbnb', 'Taxi'],
  },
  {
    avatar: Avatar3,
    name: 'Alicia McLean',
    date: 'Agost 23',
    feedback:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate odit repudiandae quo obcaecati animi.',
    labels: ['Playas', 'Caribe', 'Taxi'],
  },
  {
    avatar: Avatar2,
    name: 'Peter Jeather',
    date: 'Agost 23',
    feedback:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate odit repudiandae quo obcaecati animi.',
    labels: ['Playas', 'Caribe', 'Taxi'],
  },
  {
    avatar: Avatar1,
    name: 'Thalia Cante',
    date: 'Agost 23',
    feedback:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate odit repudiandae quo obcaecati animi.',
    labels: ['Playas', 'Caribe', 'Taxi'],
  },
];
</script>
