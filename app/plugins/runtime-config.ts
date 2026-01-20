export default defineNuxtPlugin(async () => {
    // Initialize runtime config on app startup
    const runtimeConfig = useState<{
        cmsUrl: string;
        orderUrl: string;
        siteKey: string;
    } | null>('runtime-config', () => null);

    // Only fetch if not already cached
    if (!runtimeConfig.value) {
        try {
            const config = await $fetch<{
                cmsUrl: string;
                orderUrl: string;
                siteKey: string;
            }>('/api/config/runtime');
            runtimeConfig.value = config;
        } catch (error) {
            console.error('Failed to load runtime configuration:', error);
            // Set empty values as fallback
            runtimeConfig.value = {
                cmsUrl: '',
                orderUrl: '',
                siteKey: ''
            };
        }
    }
});
