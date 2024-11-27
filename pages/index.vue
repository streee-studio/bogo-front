<template>
    <div class="container py-6">
        <keep-alive>
            <div v-if="items" class="grid grid-cols-2 gap-x-3 gap-y-3">
                <div v-for="item in items" class="bg-white rounded-lg shadow-sm" @click="$router.push('/test1')">
                    <div class="pb-card relative">
                        <div class="absolute left-0 top-0 w-full h-full p-2">
                            <div
                                class="w-full h-full bg-center bg-contain bg-no-repeat"
                                :style="{'background-image':'url('+item.image+')'}"
                            ></div>
                        </div>
                    </div>

                    <div class="px-3 py-2 border-t border-slate-100">
                        <h4 class="text-sm font-semibold tracking-tight h-10 leading-5 line-clamp-2">{{ item.name }}</h4>

                        <div class="grid grid-cols-2 gap-x-2 gap-y-2 mt-2">
                            <template v-for="(code) in ['gs25','cu','emart24','711']">
                                <div
                                    v-if="item.event[code].type"
                                    class="flex text-tnum p-1 text-xs justify-center items-center text-white font-semibold rounded-full"
                                    :class="{'bg-[#007cff]':code=='gs25','bg-[#652f8d]':code=='cu','bg-[#0f7e54]':code=='711','bg-[#ffb71b]':code=='emart24'}"
                                >
                                    <div

                                        class="w-4 h-4 p-1 rounded-full bg-white flex items-center justify-center"
                                        :style="{'padding:1px':code=='cu'}"
                                    >
                                        <img src="~assets/img/cvsLogo/gs25.png" v-if="code=='gs25'">
                                        <img src="https://static.wikia.nocookie.net/logopedia/images/5/59/CU_logo_2017.svg" v-if="code=='cu'">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtfl5V_ub1C5ss7m8NyKVyJN4ei9UCcSVXxA&s" v-if="code=='711'">
                                        <img src="~assets/img/cvsLogo/emart24.png" v-if="code=='emart24'">
                                    </div>

                                    <span class="flex-1 flex justify-center text-tnum text-white text-md font-semibold tracking-tighter">
                                        <template  v-if="item.event[code].type == '2to1'">2 + 1</template>
                                        <template  v-if="item.event[code].type == '1to1'">1 + 1</template>
                                    </span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </keep-alive>

        <div class="flex justify-center py-12">
            <i class="fa-light fa-spin fa-spinner text-4xl"></i>
        </div>

        <button class="btn btn-primary" @click="getItems">load</button>
    </div>

</template>
<script setup>

import {onMounted, onUnmounted} from "vue";

const items = ref([])
const page = ref(1)
const randomNumber = ref(null)

const isLoading = ref(false)
const getItems = () => {
    if(isLoading.value) return
    isLoading.value = true
    fetch('/apis/item?page='+page.value+((randomNumber.value) ? '&randomNumber='+randomNumber.value : ''),{
            method:'GET',
        })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                items.value = [...items.value, ...data.dataset.items]

                page.value += 1
                randomNumber.value = data.dataset.randomNumber
            }else{
                alert(data.message)
            }
            isLoading.value = false
        })
}

const handleScroll = () => {
    const scrollTop = window.scrollY; // 현재 스크롤 위치
    const windowHeight = window.innerHeight; // 뷰포트 높이
    const documentHeight = document.documentElement.scrollHeight; // 전체 문서 높이

    // 스크롤이 아래에서 200px 이내로 도달하면 실행
    if (!isLoading.value && scrollTop + windowHeight >= documentHeight - 200) {
        getItems();
    }
};

onMounted(() => {
    getItems()
    window.addEventListener('scroll', handleScroll);
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>