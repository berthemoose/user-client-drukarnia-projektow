<template>
    <div>
        <USlideover v-model:open="isOpen" side="bottom" :dismissible="false">
            <template #header>
                <div class="flex items-center gap-2">
                    <span class="text-2xl">🍪</span>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                        Ustawienia prywatności
                    </h3>
                </div>
            </template>


            <template #body>

                <UCard class="flex flex-col flex-1">
                    <div class="flex flex-col">
                        <p class="text-gray-600 dark:text-gray-300">
                            Wykorzystujemy pliki cookies oraz technologie podmiotów trzecich (w tym <strong>Google
                                Maps</strong>),
                            aby zapewnić poprawne działanie witryny. Bez Twojej zgody mapa dojazdu pozostanie
                            zablokowana.
                            Szczegóły znajdziesz w <NuxtLink to="/regulamin" class="underline text-primary-500">
                                Polityce
                                Prywatności</NuxtLink>.
                        </p>
                    </div>

                    <template #footer>
                        <div class="flex flex-col sm:flex-row gap-3 justify-end">
                            <UButton size="xl" variant="subtle" label="Tylko niezbędne" @click="handleDecline" block
                                class="sm:w-auto hover:cursor-pointer" />
                            <UButton size="xl" variant="solid" label="Wszystkie" @click="handleAccept" block
                                class="sm:w-auto hover:cursor-pointer" />
                        </div>
                    </template>
                </UCard>
            </template>
        </USlideover>
    </div>
</template>

<script setup lang="ts">
import { useCookieStore } from "../../stores/cookieStore"

const isOpen = ref(false)
const { cookieRep, acceptCookies, declineCookies } = useCookieStore();

onMounted(() => {
    if (!cookieRep) {
        isOpen.value = true
    } else if (cookieRep === 'accepted') {
        acceptCookies();
    }
})

const handleAccept = () => {
    acceptCookies();
    isOpen.value = false;
}

const handleDecline = () => {
    declineCookies();
    isOpen.value = false;
}
</script>