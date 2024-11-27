<template>
    <div class="container py-6">
        <keep-alive>
            <div v-if="items" class="grid grid-cols-2 gap-x-3 gap-y-6">
                <div v-for="item in items" class="bg-white rounded-lg shadow-sm" @click="$router.push('/test1')">
                    <div class="pb-full relative">
                        <div class="absolute left-0 top-0 w-full h-full p-4">
                            <div
                                class="w-full h-full bg-center bg-contain bg-no-repeat"
                                :style="{'background-image':'url('+item.image+')'}"
                            ></div>
                        </div>
                    </div>

                    <div class="px-4 py-4 border-t border-slate-100">
                        <h4 class="text-base font-semibold tracking-tight">{{ item.name }}</h4>

                        <div class="grid grid-cols-2 gap-x-2 gap-y-2 mt-4">
                            <template v-for="(code) in ['gs25','cu','emart24','711']">
                                <div
                                    v-if="item.event[code].type"
                                    class="flex text-tnum p-1 text-xs justify-center items-center text-white font-semibold rounded-full"
                                    :class="{'bg-[#007cff]':code=='gs25','bg-[#652f8d]':code=='cu','bg-[#0f7e54]':code=='711','bg-[#ffb71b]':code=='emart24'}"
                                >
                                    <div
                                        :class="{'p-0.5':code=='cu'}"
                                        class="w-6 h-6 p-1.5 rounded-full bg-white flex items-center justify-center"
                                    >
                                        <img src="~assets/img/cvsLogo/gs25.png" v-if="code=='gs25'">
                                        <img src="https://static.wikia.nocookie.net/logopedia/images/5/59/CU_logo_2017.svg" v-if="code=='cu'">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtfl5V_ub1C5ss7m8NyKVyJN4ei9UCcSVXxA&s" v-if="code=='711'">
                                        <img src="~assets/img/cvsLogo/emart24.png" v-if="code=='emart24'">
                                    </div>

                                    <span class="flex-1 flex justify-center text-tnum text-white text-md font-semibold">
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
    </div>

</template>
<script setup>

import {onMounted} from "vue";

const items = ref(null)
const getItems = () => {
    fetch('/apis/item',{
            method:'GET',
        })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                items.value = data.dataset.items
            }else{
                alert(data.message)
            }
        })
}

onMounted(() => {
    getItems()
})
</script>