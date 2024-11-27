<template>
    <header class="fixed left-0 top-0 w-full bg-white z-30 transition-all shadow-sm" :class="{'!bg-stone-800':headerTransition}">
        <div class="container h-20 flex items-center justify-between">
<!--            <h1 class="text-3xl flex flex-col">-->
<!--                <div class="flex"><strong>b</strong><span>uy</span> <strong>o</strong><span>ne</span></div>-->
<!--                <div class="flex"><strong>g</strong><span>et</span> <strong>o</strong><span>ne</span></div>-->
<!--            </h1>-->
            <h1 class="flex items-center" @click="$router.push('/')">
                <div class="w-20 h-14 bg-contain bg-center bg-no-repeat" :style="{'background-image':'url('+headerLogo+')'}"></div>
                <span class="!hidden">bogo</span>
            </h1>
            <div class="flex items-center">
                <button @click="openSearch=true"><i class="fa-light fa-search text-xl" :class="{'!text-white':headerTransition}"></i></button>
            </div>
        </div>
    </header>

    <div class="pt-20">
        <slot></slot>
    </div>

    <div class="fixed left-0 top-0 w-full h-full z-40  flex flex-col" v-if="openSearch">
        <div class="bg-white w-full relative z-20 border-b border-slate-200">
            <div class="flex items-center  container">
                <button @click="openSearch=false" class="h-20 mr-4 flex items-center justify-center bg-white"><i class="fa-light fa-times text-xl"></i></button>
                <input type="text" class="h-20 text-lg flex-1 !outline-none" placeholder="검색어를 입력하세요" v-model="searchs.keyword" @keyup.enter="doSearch">
                <button @click="doSearch" class="h-20 ml-4 flex items-center justify-center bg-white"><i class="fa-light fa-search text-xl"></i></button>
            </div>
        </div>


        <div class="bg-black bg-opacity-70 absolute left-0 top-0 w-full h-full" @click="openSearch=false"></div>
        <div class="flex-1 hidden">
            <dl>
                <dd>편의점</dd>
                <dt>
                    <label class="rachel sq">
                        <input type="checkbox">
                        <div><span>전체</span></div>
                    </label>
                    <label class="rachel sq">
                        <input type="checkbox">
                        <div><span>전체</span></div>
                    </label>
                    <label class="rachel sq">
                        <input type="checkbox">
                        <div><span>전체</span></div>
                    </label>
                </dt>
            </dl>
        </div>
    </div>
</template>
<style lang="less" scoped>
header{
    h1{
        font-feature-settings: "tnum";
        @apply leading-none;
        strong{
            @apply font-extrabold text-primary;
        }
        span{
            @apply font-thin block w-8 text-slate-400;
        }
    }
}
</style>
<script setup>
import headerLogo from '~/assets/img/logo-header.png'
import qs from 'qs'
import {onMounted, onUnmounted} from "vue";


const router = useRouter()
const route = useRoute()
const openSearch = ref(false)
const headerTransition = ref(false)
const query = route.query

const searchs = reactive({
    keyword:'',
})


const doSearch = () => {
    if(!searchs.keyword){
        alert('검색어를 입력하세요')
        return
    }

    openSearch.value = false
    if(window.location.pathname == '/search'){
        location.href='/search?' + qs.stringify(searchs)
    }else{
        router.push('/search?' + qs.stringify(searchs))
    }

}

const handleScroll = () => {
    const scrollTop = window.scrollY; // 현재 스크롤 위치
    const windowHeight = window.innerHeight; // 뷰포트 높이
    const documentHeight = document.documentElement.scrollHeight; // 전체 문서 높이

    headerTransition.value = (scrollTop > 0)
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>