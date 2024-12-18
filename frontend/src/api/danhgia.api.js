import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/danh_gia';

export async function getDanhGiaByMaP(id) {
    return await axios.get(API_URL + `/${id}`)
}
export async function createDanhGiaByMaP(id, body) {
    return await axios.post(API_URL+`/${id}`, body)
}
export async function deleteDanhGiaByMaP(MaP, MaKH) {
    return await axios.delete(API_URL+`/${MaP}/${MaKH}`)
}
export async function updateDanhGiaByMaP(id, body) {
    return await axios.patch(API_URL+`/${id}`, body)
}