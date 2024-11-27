import numeral from 'numeral'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('numeral', numeral)
})