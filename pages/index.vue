<template>
    <div class="container py-6">
        <div v-if="items" class="">
            <item-list :items="items"></item-list>
        </div>

        <div class="flex justify-center py-12" v-if="isLoading">
            <i class="fa-solid fa-spin fa-spinner text-4xl"></i>
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