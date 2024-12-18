import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/danh_gia';

export async function getDanhGiaByMaP(id) {
    return await axios.get(API_URL + `/${id}`)
}
export async function createDanhGia(body) {
    return await axios.post(API_URL, body)
}
export async function deleteDanhGiaByMaP(id, body) {
    return await axios.delete(API_URL+`/${id}`,body)
}