<template>
    <div>
        <header class="sticky top-0 z-50 h-[100px]">
            <HeaderNew />
        </header>
        <main>
            <slot />
        </main>
        <footer>
            <Footer />
        </footer>
            <CookieBanner />

    </div>
</template>

<script setup>
</script>
