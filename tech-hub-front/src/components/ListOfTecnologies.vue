<template>
    <ul>
        <li v-for="user in users">{{user.name}}</li>
    </ul>
</template>

<script lang="ts">
import setToken from '@/interceptors/setTokenInterceptor'
import api from '@/services/api'
export interface IUser {
    _id:          string;
    name:         string;
    password:     string;
    email:        string;
    seniority:    string;
    age:          number;
    technologies: Technology[];
    __v:          number;
}

export interface Technology {
    _id:       string;
    name:      string;
    knowledge: string;
    user:      string;
    __v:       number;
}



export default{
    data(){
        return{
            users: [] as IUser[]
        }
    },
    methods: {
        async getData(){
            const interceptor = api.interceptors.request.use((config)=> setToken(config))
            const response = await api.get<IUser[]>('/user')
            this.users = response.data
            api.interceptors.request.eject(interceptor)
            console.log(response)
        }
    },

    mounted(){
        return this.getData()
    }

}

</script>