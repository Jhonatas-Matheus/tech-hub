<script lang="ts">
import { AxiosError } from 'axios';
import FormBase from './FormBase.vue';
import api from '@/services/api';
export default{
    data(){
        return{
            email: '',
            password: ''
        }
    },
    components:{
        FormBase
    },
    methods: {
        async handleSubmit(){
            const data = {email: this.email, password: this.password}
            console.log(data)
            console.log('Formulário enviado.')
            try {
                const response = await api.post<{access_token:string}>('/auth', data)
                localStorage.setItem('@tech-hub:token', response.data.access_token)
                this.$router.push('/')
            } catch (error) {
                if(error instanceof AxiosError){
                    console.log(error.response?.data)
                }
            }
            this.email = ''
            this.password = ''
        }
    }
}
</script>

<template>
    <FormBase @submit.prevent="handleSubmit">
        <h2>Login Form</h2>
        <input type="text" placeholder="Digite o seu email" v-model="email">
        <input type="password" placeholder="Digite sua senha" v-model="password">
        <input type="submit" value="Login">
    </FormBase>
</template>

<style lang="sass">

</style>