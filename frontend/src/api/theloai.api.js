import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/the_loai';

export async function getAllTheLoai() {
    return await axios.get(API_URL)
}
export async function getTheLoaiByMaP(id) {
    return await axios.get(API_URL + `/${id}`)
}
export async function createTheLoai(body) {
    return await axios.post(API_URL, body)
}
export async function deleteTheLoaiByMaP(id, body) {
    return await axios.delete(API_URL+`/${id}`,body)
}