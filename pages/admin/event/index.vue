<template>
    <div class="container">
        <div class="flex">
            <div class="input">
                <div class="select">
                    <select v-model="dataset.cvs">

                        <option value="gs25">GS25</option>
                        <option value="cu">cu</option>
                        <option value="emart24">emart24</option>
                        <option value="711">7-11</option>
                    </select>
                </div>

                <button class="btn" @click="startScrap">스크랩</button>
            </div>

            {{ dataset.items.length }}
        </div>

        <div>
            <table class="table-v">
                <thead>
                <tr>
                    <th>제조사</th>
                    <th>상품명</th>
                    <th>등록상품명</th>
                    <th>가격</th>
                    <th>구분</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in dataset.items">
                    <td>
                        <div class="input full">
                            <input type="text" v-model="item.brand">
                        </div>
                    </td>
                    <td>
                        <div class="input full">
                            <input type="text" v-model="item.name">
                        </div>
                    </td>
                    <td>
                        <div class="input full">
                            <input type="text" v-model="item.prodName">
                        </div>
                    </td>
                    <td>
                        <div class="input full">
                            <input type="text" v-model="item.price">
                            <div class="addon">원</div>
                        </div>
                    </td>
                    <td>
                        {{ item.type }}
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="flex justify-center">
                <button class="btn btn-primary" @click="saveEvent">저장</button>
            </div>

        </div>
    </div>


    <div v-if="saves.pending" class="fixed left-0 top-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-30">
        <div class="text-white text-xl font-bold">
            {{ saves.page }} / {{ saves.totalPages }}

        </div>
    </div>
</template>
<script setup>
const dataset = reactive({
    cvs:'',
    items:[]
})

const page = ref(1)

const startScrap = () => {
    page.value = 1
    dataset.items = []
    scrapEvents()
}

const scrapEvents = () => {
    const url = ref(null)
    saves.page = null
    switch(dataset.cvs){
        case 'cu': url.value = '/api/scrap/cu'; break;
        case '711': url.value = '/api/scrap/seveneleven'; break;
        case 'gs25': url.value = '/api/scrap/gs25'; break;
        case 'emart24': url.value = '/api/scrap/emart24'; break;
    }

    if(!url.value){
        alert('편의점을 선택하세요')
        return
    }

    fetch(url.value + '?page='+page.value,{
        method:'GET',

    })
        .then(response => response.json())
        .then(data => {
            if(data.items.length > 0){
                dataset.items = [...dataset.items, ...data.items]

                page.value += 1

                // if(page.value > 3) return
                scrapEvents()
            }
        })
}

const saves = reactive({
    page:null,
    perPage:50,
    totalPages:0,
    dataset:[],
    pending:false,

})
const saveEvent = () => {
    if(!saves.page){
        saves.page = 1
        saves.totalPages = Math.ceil(dataset.items.length / saves.perPage)
        saves.pending = true
    }

    const items = dataset.items.slice((saves.page - 1)*saves.perPage,(saves.page - 1)*saves.perPage + saves.perPage)

    fetch('/apis/admin/event',{
            method:'POST',
            body:JSON.stringify({
                cvs:dataset.cvs,
                items:items,
                init:(saves.page == 1) ? true : false
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                saves.page++

                if(saves.page <= saves.totalPages){
                    saveEvent()
                }else{
                    alert('완료')
                    saves.pending = false
                }
            }else{
                alert(data.message)
            }
        })
}


</script>