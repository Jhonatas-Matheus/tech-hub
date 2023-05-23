import type { InternalAxiosRequestConfig } from "axios";


const setToken = (config: InternalAxiosRequestConfig) => {
    const currentToken = localStorage.getItem('@tech-hub:token')
    if(currentToken){
        config.headers.Authorization = `Bearer ${currentToken}`
    }
    return config
}

export default setToken