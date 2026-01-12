<template>
    <div>
        <!-- Top info bar -->
        <div class="border-b border-default py-1 bg-white">
            <NuxtMarquee :autoFill="true" :pauseOnHover="true" :speed="40" class="my-[2px]">
                <p class="max-[995px]:text-sm max-[995px]:mr-[20px] min-[995px]:py-[2px]">{{
                    headerData?.infoBar[0]?.infoBarText
                    }}</p>
                <LazyNuxtImg :src="headerData?.infoBar[0]?.infoBarImage.url"
                    :alt="headerData?.infoBar[0]?.infoBarImage.alt"
                    class="w-48 h-auto px-8 z-20 max-[995px]:hidden block" />
            </NuxtMarquee>
        </div>

        <!-- Header component -->
        <UHeader :title="headerData?.logo[0]?.mainLogoFile.alt">
            <!-- Logo -->
            <template #title>
                <div>
                    <HeaderNewLogo :url="headerData?.logo[0]?.mainLogoFile.url"
                        :alt="headerData?.logo[0]?.mainLogoFile.url" />
                </div>
            </template>

            <!-- Center nav -->
            <UNavigationMenu :items="centerItems" class="min-w-[400px] flex items-center justify-end" />

            <!-- Right buttons -->
            <template #right>
                <div class="hidden lg:block" v-for="button in rightSideButtons">
                    <UButton size="lg" :to="button.to ?? button.url" :label="button.label" :icon="button.icon"
                        variant="subtle" />
                </div>
                <HeaderNewCartIcon />
            </template>

            <!-- Mobile nav -->
            <template #body>
                <UNavigationMenu :items="mobileItems" orientation="vertical" class="-mx-2.5" />
            </template>
        </UHeader>
    </div>
</template>

<script setup lang="ts">

import type { NavigationMenuItem } from '@nuxt/ui';
import { useHeader } from "~/composables/Header/useHeader";
import { useNoStoreProductList, useProductList } from '~/composables/ProductList/useProductList';
export interface SourceLink {
    link: {
        type: string;
        url?: string;
        reference: string;
        label: string;
        isDisabled: boolean;
        isHidden: boolean;
        appearance: string;
        size: string;
        color: string;
        variant: string;
        icon: string;
    };
    id: string;
}

import type { Product } from '~/composables/Product/useProduct';
const { data: headerData } = useHeader();
const { data: productData } = useProductList();
const { data: noStoreProductData } = useNoStoreProductList();


const route = useRoute();

const centerLinks = computed(() => {
    const links = headerData.value?.headerLinks ?? [];
    return links.map((item: SourceLink) => ({
        label: item.link.label,
        to: `/${item.link.reference}`,
        active: route.path.startsWith(`/${item.link.reference}`)
    }))
});

const rightSideLinks = computed(() => {
    const links = headerData.value?.headerLinksRightSide ?? [];
    return links.map((item: SourceLink) => ({
        type: item.link.type,
        to: item.link.reference,
        label: item.link.label,
        isDisabled: item.link.isDisabled,
        isHidden: item.link.isHidden,
        appearance: item.link.appearance,
        size: item.link.label,
        color: item.link.color,
        variant: item.link.variant,
        icon: item.link.icon,
        url: item.link.url || ""
    }));
});

const servicesChildren = computed(() => {
    const services = productData.value?.docs ?? [];
    const servicesNoStore = noStoreProductData.value?.docs ?? [];
    const storeData = services.map((item: Product) => ({
        label: item.productInfo.productName,
        to: `/products/${item.id}?${Object.keys(item.productInfo).includes('basePrice') ? 'store=true' : 'form=true'}`,
    }));
    const noStoreData = servicesNoStore.map((item: Product) => ({
        label: item.productInfo.productName,
        to: `/products/${item.id}?${Object.keys(item.productInfo).includes('basePrice') ? 'store=true' : 'form=true'}`,
    }));

    return [
        ...storeData,
        ...noStoreData
    ];
})

/* Links in the center of the header */
const centerItems = computed<NavigationMenuItem[]>(() => [
    ...centerLinks.value,
    {
        label: 'Usługi',
        active: route.path.startsWith('/products'),
        children: [
            ...servicesChildren.value,
            {
                label: 'Praca Dyplomowa',
                to: '/products/thesis'
            }

        ]
    }])

/* Right side buttons (header CTA) */
const rightSideButtons = computed<NavigationMenuItem[]>(() => [
    ...rightSideLinks.value
]);

/* Mobile panel buttons (mobile CTA) */
const mobileButtons = computed(() => {
    const links = headerData.value?.headerLinksRightSide ?? []
    return links.map((item: SourceLink) => ({
        label: item.link.label,
        to: item.link.reference ?? item.link.url,
        icon: item.link.icon
    }));
}
);

/*  */
const mobileItems = computed<NavigationMenuItem[]>(() => [
    ...mobileButtons.value,
    ...centerItems.value.map(({ active, ...rest }) => rest),
])
</script>
