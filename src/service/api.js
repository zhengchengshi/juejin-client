import axios from 'axios'
const baseUrl = 'http://47.99.81.255:8082'
// const baseUrl = "http://localhost:8081"
const api = {
    get(url,data){
        if(data){
            return axios({
                method:'GET',
                url:baseUrl+url+'?'+data
            })

        }
        else{
            return axios({
                method:'GET',
                url:baseUrl+url
            })
        }
    },
    post(url,data){
        if(data){
            return axios({
                method:'post',
                url:baseUrl+url+'?'+data,
                data:data
            })

        }
        else{
            return axios({
                method:'post',
                url:baseUrl+url
            })
        }
        
    },
    put(url,data){
        if(data){
            return axios({
                method:'PUT',
                url:baseUrl+url+'?'+data,
                data:data
            })

        }
        else{
            return axios({
                method:'PUT',
                url:baseUrl+url
            })
        }
    }
}
export default api