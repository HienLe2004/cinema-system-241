import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/the_loai';

export async function getAllTheLoai() {
    return await axios.get(API_URL)
}
export async function getTheLoaiByFilmID(filmID) {
    return await axios.get(API_URL + `/film/${filmID}`)
}