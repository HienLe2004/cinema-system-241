import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/phim';

export async function getAllPhim() {
    return await axios.get(API_URL)
}
export async function getPhimByID(id) {
    return await axios.get(API_URL+`/${id}`)
}
export async function createPhim(body) {
    return await axios.post(API_URL, body)
}
export async function updatePhimByID(body) {
    return await axios.patch(API_URL, body)
}
export async function deletePhimByID(id) {
    return await axios.delete(API_URL+`${id}`)
}