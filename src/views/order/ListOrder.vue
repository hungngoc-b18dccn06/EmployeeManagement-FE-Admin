<script setup lang="ts">
    import List from "../../components/order/List.vue"
</script>

<template>
    <List>
        <template #main>
            <router-view />
        </template>
    </List>
</template>
<style lang="scss"></style>
