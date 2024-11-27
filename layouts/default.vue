<template>
    <header class="fixed left-0 top-0 w-full bg-white z-30">
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
                <button><i class="fa-light fa-search text-xl"></i></button>
            </div>
        </div>
    </header>

    <div class="pt-20">
        <slot></slot>
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
</script>