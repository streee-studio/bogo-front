<template>
    <NuxtLayout>
        <nuxt-page></nuxt-page>
    </NuxtLayout>
</template>
<script setup>
useHead({
    link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
})

useSeoMeta({
    title:'bogo - 편의점 행사상품 정보',
    ogTitle:'bogo - 편의점 행사상품 정보',
    description:'편의점 1+1, 2+1 행사상품 정보를 한눈에 확인하세요',
    ogDescription:'편의점 1+1, 2+1 행사상품 정보를 한눈에 확인하세요',
    ogImage:'/og.jpg'
})
</script>