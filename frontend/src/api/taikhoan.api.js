import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/login';

export async function getTaiKhoan(body) {
    try{
        const data = await axios.post(API_URL,body)
        return data
    }
    catch(err){
        return {data:{success:false}}
    }
}