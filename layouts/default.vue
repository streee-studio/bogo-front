<template>
    <header class="fixed left-0 top-0 w-full bg-white z-30">
        <div class="container h-20 flex items-center justify-between">
<!--            <h1 class="text-3xl flex flex-col">-->
<!--                <div class="flex"><strong>b</strong><span>uy</span> <strong>o</strong><span>ne</span></div>-->
<!--                <div class="flex"><strong>g</strong><span>et</span> <strong>o</strong><span>ne</span></div>-->
<!--            </h1>-->
            <h1 class="text-4xl font-thin text-primary">
                bogo
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