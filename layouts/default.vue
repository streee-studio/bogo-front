<template>
    <header class="absolute left-0 top-0 w-full bg-white z-30" :class="{'!fixed':fixedHeader}">
        <div class="container h-14 flex items-center justify-between">
<!--            <h1 class="text-3xl flex flex-col">-->
<!--                <div class="flex"><strong>b</strong><span>uy</span> <strong>o</strong><span>ne</span></div>-->
<!--                <div class="flex"><strong>g</strong><span>et</span> <strong>o</strong><span>ne</span></div>-->
<!--            </h1>-->
            <h1 class="flex items-center" @click="$router.push('/')">
                <div class="w-14 h-6 bg-contain bg-center bg-no-repeat" :style="{'background-image':'url('+headerLogo+')'}"></div>
                <span class="!hidden">bogo</span>
            </h1>
            <div class="flex items-center">
<!--                <button @click="openSearch=true"><i class="fa-light fa-search text-xl" :class="{'!text-white':headerTransition}"></i></button>-->
            </div>
        </div>
    </header>

    <div class="pt-14 pb-14">
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

    <div class="fixed left-0 bottom-0 pb-14 pt-36 w-full flex flex-col justify-end bg-black bg-opacity-70 h-full z-30" v-if="searchPop">
        <div class="container rounded-t-2xl bg-white px-6 py-4 relative">
            <button class="flex items-center justify-center w-10 h-10 rounded-full bg-white absolute left-1/2 -translate-x-1/2 -top-14" @click="searchPop=false">
                <i class="fa-light fa-times text-xl text-slate-500"></i>
            </button>
            <div class="flex flex-col h-full">
                <div class="flex-1">
                    <div class="input full mb-14">
                        <div class="title">검색어</div>
                        <input type="text" v-model="searchs.keyword" @keyup.enter="doSearch" ref="searchPopInputKeyword">
                    </div>

                    <div class="input full mb-14">
                        <div class="title">편의점</div>
                        <div>
                            <label class="rachel sq">
                                <input type="checkbox" value="gs25" v-model="searchs.cvs">
                                <div><span>GS25</span></div>
                            </label>
                            <label class="rachel sq">
                                <input type="checkbox" value="cu" v-model="searchs.cvs">
                                <div><span>CU</span></div>
                            </label>
                            <label class="rachel sq">
                                <input type="checkbox" value="emart24" v-model="searchs.cvs">
                                <div><span>이마트24</span></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="mt-4">
                    <button class="btn btn-primary btn-submit btn-block" @click="doSearch">검색</button>
                </div>
            </div>
        </div>
    </div>

    <div class="fixed left-0 bottom-0 w-full h-14 z-[35]">
        <div class="container bg-white h-full flex items-center justify-center border-t border-slate-200 shadow-lg pb-safe-bottom">
            <button class="h-full w-24 flex flex-col justify-center items-center" @click="$router.push('/')">
                <i class="fa-light fa-home text-md mb-1"></i>
                <span class="text-xs text-slate-500">HOME</span>
            </button>
            <button class="h-full w-24 flex flex-col justify-center items-center" @click="openSearchPop">
                <i class="fa-light fa-search text-md mb-1"></i>
                <span class="text-xs text-slate-500">검색</span>
            </button>
            <button class="h-full w-24 flex flex-col justify-center items-center">
                <i class="fa-light fa-heart text-md mb-1"></i>
                <span class="text-xs text-slate-500">관심 상품</span>
            </button>
            <button class="h-full w-24 flex flex-col justify-center items-center" @click="$router.push('/mypage')">
                <i class="fa-light fa-user text-md mb-1"></i>
                <span class="text-xs text-slate-500">마이페이지</span>
            </button>
        </div>
    </div>

    <div class="fixed left-0 top-0 w-full h-full bg-black bg-opacity-70 z-40 flex items-center justify-center p-6" v-if="false">
        <div class="bg-white rounded-lg w-full px-6 py-12">
            <h3 class="text-2xl font-bold">로그인</h3>

            <button class="flex items-center justify-center h-12 bg-amber-500">카카오로 로그인</button>
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
import {onMounted, onUnmounted, watch, provide, inject} from "vue";


const router = useRouter()
const route = useRoute()
const openSearch = ref(false)
const headerTransition = ref(false)
const query = route.query
const fixedHeader = ref(false)
const searchPop = ref(false)
const searchPopInputKeyword = ref(null)



const toggleSearchPop = (open) => {
    console.log('=tsp : '+open)
    searchPop.value = open
}
provide('toggleSearchPop',toggleSearchPop)

const openSearchPop = () => {
    toggleSearchPop(true)
    setTimeout(() => {
        searchPopInputKeyword.value.focus()
    },10)
}

const searchs = reactive({
    keyword:'',
    cvs:[]
})

const injectedSearchGetItems = inject('searchGetItems')
const doSearch = () => {
    if(!searchs.keyword){
        alert('검색어를 입력하세요')
        return
    }

    if(window.location.pathname == '/search'){
        location.href='/search?' + qs.stringify(searchs)
    }else{
        router.push('/search?' + qs.stringify(searchs))
    }
    openSearch.value = false
}

const handleScroll = () => {
    const scrollTop = window.scrollY; // 현재 스크롤 위치
    const windowHeight = window.innerHeight; // 뷰포트 높이
    const documentHeight = document.documentElement.scrollHeight; // 전체 문서 높이

    headerTransition.value = (scrollTop > 0)
};

watch(
    () => route.fullPath, // fullPath를 감시
    (path) => {
        fixedHeader.value = (path == '/')
        console.log(path)
    }
)


onMounted(() => {
    window.addEventListener('scroll', handleScroll);

    console.log(window.location)
    if(window.location.pathname == '/'){
        fixedHeader.value = true
    }
    // console.log(window.location)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

if (process.client) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//wcs.naver.net/wcslog.js";
    script.onload = () => {
        if (!window.wcs_add) window.wcs_add = {};
        window.wcs_add["wa"] = "13fd646f5b16270";
        if (window.wcs) {
            window.wcs_do();
        }
    };
    document.head.appendChild(script);
}
</script>