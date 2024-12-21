import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/dien_vien';

export async function getAllDienVien() {
    return await axios.get(API_URL)
}
export async function getDienVienByPhimID(id) {
    return await axios.get(API_URL + `/${id}`)
}
export async function createDienVien(body) {
    return await axios.post(API_URL, body)
}
export async function updateDienVienByPhimID(id, body) {
    return await axios.patch(API_URL+`/${id}`, body)
}
export async function deleteDienVienByPhimID(id, body) {
    return await axios.delete(API_URL+`/${id}`, body)
}