import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/dao_dien';

export async function getAllDaoDien() {
    return await axios.get(API_URL)
}
export async function getDaoDienByFilmID(filmID) {
    return await axios.get(API_URL + `/film/${filmID}`)
}