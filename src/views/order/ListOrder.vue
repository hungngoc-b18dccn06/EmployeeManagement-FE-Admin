<script setup lang="ts">
    import ListOrder from "../../components/order/ListOrder.vue"
</script>

<template>
    <ListOrder>
        <template #main>
            <router-view />
        </template>
    </ListOrder>
</template>
<style lang="scss"></style>
