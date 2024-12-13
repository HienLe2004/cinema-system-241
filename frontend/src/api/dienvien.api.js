import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/dien_vien';

export async function getAllDienVien() {
    return await axios.get(API_URL)
}
export async function getDienVienByFilmID(filmID) {
    return await axios.get(API_URL + `/film/${filmID}`)
}