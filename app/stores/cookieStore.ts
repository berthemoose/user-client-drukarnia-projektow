import { defineStore } from 'pinia'

export const useCookieStore = defineStore('cookie-consent', () => {


    const cookieRep = useCookie('user_consent_status', {
        maxAge: 60 * 60 * 24 * 365,
        default: () => null as 'accepted' | 'declined' | null
    })

    const marketingConsent = computed(() => cookieRep.value === 'accepted')


    const hasUserDecided = computed(() => cookieRep.value !== null && cookieRep.value !== undefined)

    function acceptCookies() {
        cookieRep.value = 'accepted'
    }

    function declineCookies() {
        cookieRep.value = 'declined'
    }

    return {
        cookieRep,
        marketingConsent,
        hasUserDecided,
        acceptCookies,
        declineCookies
    }
})