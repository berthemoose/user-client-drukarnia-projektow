<template>
  <!-- Loading State -->
  <div v-if="pending" class="fixed inset-0 z-50 flex items-center justify-center bg-white">
    <Loader :text="'Wczytywanie strony: Oferta'" :is-full-screen="true" />
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center py-12">
        <p class="text-red-500">Wystąpił błąd podczas ładowania danych.</p>
      </div>
    </div>
  </div>

  <!-- Content -->
  <div v-else class="bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Hero Section -->
        <div 
          class="text-center mb-16 transition-all duration-700 ease-out"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block">{{ oferta?.title || 'Nasza oferta' }}</span>
          </h1>
          <p
            v-if="oferta?.description"
            class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            {{ oferta?.description }}
          </p>
        </div>

        <!-- Services Overview -->
        <div 
          v-if="oferta?.cards?.length" 
          class="bg-gray-50 rounded-2xl p-8 mb-16 transition-all duration-700 ease-out delay-100"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Dynamic Service Cards -->
            <div
              v-for="(card, index) in oferta.cards"
              :key="index"
              class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <UIcon :name="card.icon || 'i-heroicons-cube-transparent'" class="h-6 w-6 text-primary-600" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                {{ card.header }}
              </h3>
              <p class="text-gray-600">
                {{ card.paragraph }}
              </p>
            </div>
          </div>
        </div>

        <!-- Team Section -->
        <div 
          v-if="zespol?.cards?.length" 
          class="mb-16 transition-all duration-700 ease-out delay-200"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900">{{ zespol?.title || 'Nasz zespół' }}</h2>
            <p v-if="zespol?.description" class="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
              {{ zespol.description }}
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Dynamic Team Members -->
            <div 
              v-for="(member, index) in zespol.cards" 
              :key="index"
              class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div class="h-64 bg-gray-100 overflow-hidden">
                <img 
                  v-if="member.photo" 
                  :src="typeof member.photo === 'string' ? member.photo : member.photo?.url" 
                  :alt="member.name"
                  class="w-full h-full object-cover"
                />
                <UIcon 
                  v-else
                  name="i-heroicons-user-circle" 
                  class="h-full w-full text-gray-400 p-8" 
                />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900">{{ member.name }}</h3>
                <p class="text-primary-600">{{ member.position }}</p>
                <p v-if="member.description" class="mt-2 text-gray-600">
                  {{ member.description }}
                </p>
                <div class="mt-4 space-y-2">
                  <a
                    v-if="member.email"
                    :href="`mailto:${member.email}`"
                    class="text-primary-600 hover:text-primary-500 flex items-center text-sm"
                  >
                    <UIcon name="i-heroicons-envelope" class="h-4 w-4 mr-2" />
                    {{ member.email }}
                  </a>
                  <a
                    v-if="member.phoneNumber"
                    :href="`tel:${member.phoneNumber.replace(/\s+/g, '')}`"
                    class="text-gray-600 hover:text-gray-500 flex items-center text-sm"
                  >
                    <UIcon name="i-heroicons-phone" class="h-4 w-4 mr-2" />
                    {{ member.phoneNumber }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div 
          class="bg-black rounded-2xl p-8 text-center text-white transition-all duration-700 ease-out delay-300"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <h2 class="text-3xl font-extrabold mb-4">
            {{ cta?.title }}
          </h2>
          <p class="text-xl mb-6 max-w-2xl mx-auto">
            {{ cta?.description }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              v-if="cta?.buttonEmail"
              :to="`mailto:${cta.buttonEmail}`"
              class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-8 transition-colors duration-200"
            >
              {{ cta.buttonLabel || 'Skontaktuj się z nami' }}
            </NuxtLink>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useContactPage } from '~/composables/useContactPage';
import Loader from '~/components/Loader.vue';

const { 
  data: contactData,
  oferta,
  zespol,
  cta,
  pending, 
  error
} = useContactPage();

const isVisible = ref(false);

// Trigger animation when data finishes loading
watch(pending, (newValue) => {
  if (!newValue && !error.value) {
    // Reset animation state first
    isVisible.value = false;
    // Then trigger animation after a brief delay
    setTimeout(() => {
      isVisible.value = true;
    }, 50);
  }
}, { immediate: true });

useHead({
  title: "Oferta | Kserofabryka - K2 Drukarnia Projektów",
  meta: [
    {
      name: "description",
      content:
        "Poznaj naszą ofertę i skontaktuj się z naszym zespołem sprzedażowym. Oferujemy profesjonalne usługi drukarskie i poligraficzne.",
    },
  ],
});
</script>
