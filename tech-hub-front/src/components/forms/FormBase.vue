<template>
    <form>
        <slot></slot>
    </form>
</template>

<style scoped lang="scss">
    form{
        width: 90%;
        margin: auto;
        display: flex;
        background-color: #ffffff07;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        gap: 2rem;
        padding: 2rem 0;
    }
    form > h2 {
        color: mediumslateblue;
    }
    :slotted(input){
        width: 70%;
        padding: 1rem;
        border-radius: 10px;
        border: none;
        color: mediumslateblue;
        &:focus{
            outline: none;
        }
    }
    :slotted(input[type=submit]){
        padding: 1rem;
        background-color: mediumslateblue;
        color: #fff;
        font-weight: 600;
    }
</style>

<script lang="ts">
export default{
    // emits: ['submit']
}
</script>