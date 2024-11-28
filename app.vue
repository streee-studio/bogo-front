<template>
    <NuxtLayout>
        <nuxt-page></nuxt-page>
    </NuxtLayout>
</template>
<script setup>
const config = useRuntimeConfig()

useHead({
    link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ],
    script: [
        // {
        //     src: "https://wcs.naver.net/wcslog.js",
        //     type: "text/javascript",
        //     async: true,
        // }
    ],
})


useSeoMeta({
    title:'bogo - 편의점 행사상품 정보',
    ogTitle:'bogo - 편의점 행사상품 정보',
    description:'편의점 1+1, 2+1 행사상품 정보를 한눈에 확인하세요',
    ogDescription:'편의점 1+1, 2+1 행사상품 정보를 한눈에 확인하세요',
    ogImage:config.public.siteURL + '/og.jpg'
})

if(process.client){
    const script = document.createElement('script');
    script.src = 'https://wcs.naver.net/wcslog.js';
    // script.async = true; // 비동기로 로드할지 결정
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.src = 'https://www.googletagmanager.com/gtag/js?id=G-86SX998S27';
    // script.async = true; // 비동기로 로드할지 결정
    document.head.appendChild(script2);

    if(!wcs_add) var wcs_add = {};
    wcs_add["wa"] = "13fd646f5b16270";
    console.log(wcs_add)
    if(window.wcs) {
        wcs_do();
        console.log('wcs do')
    }else{
        console.log('no window wcs')
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-86SX998S27');
    // https://www.googletagmanager.com/gtag/js?id=G-86SX998S27
}

</script>