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
export async function createSuatChieu(body) {
    return await axios.post(API_URL, body)
}
export async function updateSuatChieu(body) {
    return await axios.patch(API_URL, body)
}
export async function deleteSuatChieu(id, body) {
    return await axios.delete(API_URL+`/${id}`, body)
}