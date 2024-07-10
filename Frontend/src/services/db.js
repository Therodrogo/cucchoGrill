import axios from 'axios'
const url = "http://localhost:3000/api/"

/* const url ="https://nobasededatos-wacd334doa-uc.a.run.app/api/" */

export default class db {

    static async login(data) {
        try {
            const res = await axios.post(url + "login", data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async crearProducto(data) {
        try {
            const res = await axios.post(url + "nuevoproducto", data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async obtenerProductos(data) {
        try {
            const res = await axios.get(url + "obtenerproductos", data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async obtenerProductoId(id) {
        try {
            const res = await axios.get(url + "obtenerproductoid/"+ id)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async actualizarVisibilidad(id) {
        try {
            const res = await axios.put(url + "actualizarVisibilidad/"+ id)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async editarProducto(data) {
        try {
            const res = await axios.put(url + "actualizarProducto",data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    
}