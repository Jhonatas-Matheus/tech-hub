<template>
    <div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default{

}
</script>

<style lang="scss" scoped>
div{
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
}
</style>