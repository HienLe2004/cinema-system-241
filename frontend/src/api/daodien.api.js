import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/dao_dien';

export async function getAllDaoDien() {
    return await axios.get(API_URL)
}
export async function getDaoDienByPhimID(id) {
    return await axios.get(API_URL + `/${id}`)
}
export async function createDaoDien(body) {
    return await axios.post(API_URL, body)
}
export async function updateDaoDienByPhimID(id, body) {
    return await axios.patch(API_URL+`/${id}`, body)
}
export async function deleteDaoDienByPhimID(id, body) {
    return await axios.delete(API_URL+`/${id}`, body)
}