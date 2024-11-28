<template>
    <NuxtLayout>
        <nuxt-page></nuxt-page>
    </NuxtLayout>
</template>
<script setup>
import { nextTick} from "vue";

const config = useRuntimeConfig()

useHead({
    link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ],
    script: [
        {
            src: "//wcs.naver.net/wcslog.js",
            type: "text/javascript",
            async: true,
        }
    ],
    meta: [
        {
            name: 'naver-site-verification',
            content: '344db43a91ba9a8f26372f58d58095d7559b9deb',
        },
    ],
})

useSeoMeta({
    title:'bogo - 편의점 행사상품 검색',
    ogTitle:'bogo - 편의점 행사상품 검색',
    description:'보고에서 편의점 1+1, 2+1 행사상품을 한눈에 확인하세요',
    ogDescription:'보고에서 편의점 1+1, 2+1 행사상품을 한눈에 확인하세요',
    ogImage:config.public.siteURL + '/og.jpg'
})

if(process.client){
    // google analytics
    const script2 = document.createElement('script');
    script2.src = 'https://www.googletagmanager.com/gtag/js?id=G-86SX998S27';
    document.head.appendChild(script2);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-86SX998S27');
}

</script>