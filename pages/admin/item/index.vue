<template>
    <div class="container">

        <div>
            <div v-for="(item,itemIndex) in items" class="flex items-center py-2 border-b border-slate-200">
                <div class="w-16 rounded-lg overflow-hidden mr-4 border border-slate-200 bg-white">
                    <div
                        class="w-full pb-full bg-contain bg-center bg-no-repeat"
                        :style="{'background-image':'url('+item.image+')'}"
                    ></div>
                </div>
                <div class="flex-1 flex items-center">
                    <div class="input">
                        <div class="title !text-xs !mb-1">브랜드</div>
                        <input type="text" v-model="item.brand" class="!h-10 !text-sm !px-3 !flex-none w-36">
                    </div>

                    <div class="input">
                        <div class="title !text-xs !mb-1">브랜드</div>
                        <input type="text" v-model="item.name" class="!h-10 !text-sm !px-3">
                        <button class="btn !h-10" @click="doUpdate(itemIndex)">저장</button>
                        <button class="btn !h-10 btn-default" @click="openMerge(itemIndex)">병합</button>
                    </div>


                </div>
                <div class="">
                    <template v-for="(cvs) in [{code:'gs25',name:'GS25'},{code:'cu',name:'CU'},{code:'711',name:'7-11'},{code:'emart24',name:'이마트24'}]">
                        <div v-if="item.event[cvs.code].type" class="mr-4 last:mr-0">
                            {{ cvs.name }} :
                            {{ item.event[cvs.code].type }}
                        </div>
                    </template>
                </div>
            </div>
        </div>
        {{ items }}
    </div>

    <modal title="상품 병합" v-if="merge.modal" @close="merge.modal=false" :overflow="true">
        <div class="flex items-center">
            <div class="w-20 mr-4">
                <div
                    class="pb-full bg-contain bg-center bg-no-repeat"
                    :style="{'background-image':'url('+merge.data.from.image+')'}"
                ></div>
            </div>
            <div class="flex-1">
                <h4>{{ merge.data.from.name }}</h4>
            </div>
        </div>

        <div class="py-10 flex justify-center">
            <i class="fa-light fa-chevron-down text-xl"></i>
        </div>

        <div>
            <div class="input full">
                <input type="text" v-model="merge.search.keyword" @keyup.enter="searchMergeToItems">
                <button class="btn" @click="searchMergeToItems">검색</button>
            </div>

            <div>
                <ul>
                    <li v-for="(item) in merge.search.results" class="flex items-center">
                        <div class="w-14 mr-4">
                            <div
                                class="pb-full bg-contain bg-center bg-no-repeat"
                                :style="{'background-image':'url('+item.image+')'}"
                            ></div>
                        </div>
                        <div class="flex-1">
                            <div class="text-xs text-rose-500">{{ item.brand }}</div>
                            <h4>{{ item.name }}</h4>
                        </div>
                        <div>
                            <button class="btn btn-default" @click="doMerge(item.uuid)">병합</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </modal>
</template>
<script setup>

import qs from 'qs'
import {onMounted} from "vue";

const merge = reactive({
    modal:false,
    search:{
        keyword:'',
        results:null
    },
    data:{
        from:null,
        to:{

        }
    }
})

const openMerge = (itemIndex) => {
    const item = items.value[itemIndex]
    merge.data.from = item
    merge.modal = true
}

const searchMergeToItems = () => {
    if(!merge.search.keyword){
        alert('검색어를 입력하세요')
        return
    }

    const query = {
        searchs:{
            keyword:merge.search.keyword
        }
    }

    fetch('/apis/admin/item?'+qs.stringify(query),{
        method:'GET',
    })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                merge.search.results = data.dataset.items
            }
        })
}

const doMerge = (toId) => {
    if(!confirm('병합하시겠습니까?')) return
    fetch('/apis/admin/item/'+merge.data.from.uuid+'/merge-to/'+toId,{
            method:'POST',
        })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                alert('병합되었습니다')
                merge.modal = false
                getItems()
            }else{
                alert(data.message)
            }
        })
}

const items = ref(null)
const getItems = () => {
    fetch('/apis/admin/item',{
            method:'GET',
        })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                items.value = data.dataset.items
            }
        })
}

const doUpdate = (itemIndex) => {
    const item = items.value[itemIndex]

    fetch('/apis/admin/item/'+item.uuid,{
        method:'POST',
        body:JSON.stringify(item)
    })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                alert('저장되었습니다')
                getItems()
            }else{
                alert(data.message)
            }
        })
}

onMounted(()=> {
    getItems()
})
</script>