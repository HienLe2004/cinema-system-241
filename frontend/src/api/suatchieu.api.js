import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/suat_chieu';

export async function getAllSuatChieu() {
    return await axios.get(API_URL)
}
export async function getSuatChieuByMaP(id) {
    try{
        const data = await axios.get(API_URL+`/${id}`)
        return data
    }
    catch(err){
        return {data:{}}
    }
}