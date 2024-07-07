import axios from 'axios'
/* const url = "http://localhost:3000/api/" */

const url ="https://nobasededatos-wacd334doa-uc.a.run.app/api/"

export default class db {

    static async login(data) {
        try {
            const res = await axios.post(url + "login", data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

}