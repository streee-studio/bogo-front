<template>
    <div class="container py-6">
        <template v-if="items">
            <template v-if="items.length > 0">
                <item-list :items="items"></item-list>
            </template>
            <template v-else>
                <div class="bg-slate-200 bg-opacity-50 flex flex-col items-center justify-center py-10 rounded-lg">
                    <h4 class="text-lg font-thin text-slate-500">검색 결과가 없습니다</h4>
                </div>
            </template>
        </template>

        <button @click="tsp(true)">open</button>
        <button @click="tsp(false)">close</button>
    </div>
</template>
<script setup>
import qs from 'qs'

const route = useRoute()
const query = route.query

import {onMounted, onUnmounted, inject, provide} from "vue";

const items = ref([])
const page = ref(1)
const randomNumber = ref(null)
const isLoading = ref(false)
const tsp = inject('toggleSearchPop')

const getItems = () => {
    if(isLoading.value) return
    isLoading.value = true

    const q = {
        page:page.value,
        searchs:{
            keyword:query.keyword
        }
    }

    if(randomNumber.value) q.randomNumber = randomNumber.value

    fetch('/apis/item?'+qs.stringify(q),{
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
provide('searchGetItems',getItems)

const handleScroll = () => {
    const scrollTop = window.scrollY; // 현재 스크롤 위치
    const windowHeight = window.innerHeight; // 뷰포트 높이
    const documentHeight = document.documentElement.scrollHeight; // 전체 문서 높이

    // 스크롤이 아래에서 200px 이내로 도달하면 실행
    if (!isLoading.value && scrollTop + windowHeight >= documentHeight - 700) {
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