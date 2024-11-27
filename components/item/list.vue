<template>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-3">
        <div v-for="item in props.items" class="bg-white rounded-lg shadow-sm">
            <div class="pb-card relative">
                <div class="absolute left-0 top-0 w-full h-full p-2">
                    <div
                        class="w-full h-full bg-center bg-contain bg-no-repeat"
                        :style="{'background-image':'url('+item.image+')'}"
                    ></div>
                </div>
            </div>

            <div class="px-3 py-2 border-t border-slate-100">
                <small class="text-rose-500 text-xs h-4 block">{{ item.brand }}</small>
                <h4 class="text-sm font-semibold tracking-tight h-10 leading-5 line-clamp-2">{{ item.name }}</h4>

                <div class="grid lg:flex grid-cols-2 gap-x-2 gap-y-2 mt-2">
                    <template v-for="(code) in ['gs25','cu','emart24','711']">
                        <div
                            v-if="item.event[code].type"
                            class="flex text-tnum p-1 text-xs justify-center items-center text-white font-semibold rounded-full"
                            :class="{'bg-[#007cff]':code=='gs25','bg-[#652f8d]':code=='cu','bg-[#0f7e54]':code=='711','bg-[#ffb71b]':code=='emart24'}"
                        >
                            <div

                                class="w-4 h-4 p-1 rounded-full bg-white flex items-center justify-center"
                                :class="{'!p-0':code=='cu'}"
                            >
                                <img src="~assets/img/cvsLogo/gs25.png" v-if="code=='gs25'">
                                <img src="https://static.wikia.nocookie.net/logopedia/images/5/59/CU_logo_2017.svg" v-if="code=='cu'" class="scale-75">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtfl5V_ub1C5ss7m8NyKVyJN4ei9UCcSVXxA&s" v-if="code=='711'">
                                <img src="~assets/img/cvsLogo/emart24.png" v-if="code=='emart24'">
                            </div>

                            <span class="flex-1 flex justify-center text-tnum text-white text-md font-semibold tracking-tighter md:px-2">
                                <template  v-if="item.event[code].type == '2to1'">2+1</template>
                                <template  v-if="item.event[code].type == '1to1'">1+1</template>
                            </span>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['items'])
</script>