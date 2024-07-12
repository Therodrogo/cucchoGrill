import axios from 'axios'
const url = "http://localhost:3000/api/"

/* const url ="https://nobasededatos-wacd334doa-uc.a.run.app/api/" */

/* const url ="http://34.134.15.112:3000/api/" */

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

    
    static async crearPedido(data) {
        try {
            const res = await axios.post(url + "nuevopedido", data)
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
            const res = await axios.get(url + "obtenerproductoid/" + id)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async obtenerPedidos(data) {
        try {
            const res = await axios.get(url + "obtenerpedidos" ,data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }


    static async actualizarVisibilidad(id) {
        try {
            const res = await axios.put(url + "actualizarVisibilidad/" + id)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async editarProducto(data) {
        try {
            const res = await axios.put(url + "actualizarProducto", data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async eliminarProducto(id) {
        try {
            const res = await axios.delete(url + "eliminarproducto/" + id);
            return res.data;
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un estado fuera del rango 2xx
                return error.response.data;
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                return { error: "No response received from server." };
            } else {
                // Algo pasó al hacer la solicitud
                return { error: error.message };
            }
        }
    }
    static async crearPromocion(data) {
        try {
            const res = await axios.post(url + "nuevapromocion", data);
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async obtenerPromociones() {
        try {
            const res = await axios.get(url + "obtenerpromociones");
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async obtenerPromocionId(id) {
        try {
            const res = await axios.get(url + "obtenerpromocionid/" + id);
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async actualizarVisibilidadPromocion(id) {
        try {
            const res = await axios.put(url + "actualizarvisibilidad/" + id);
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async editarPromocion(data) {
        try {
            const res = await axios.put(url + "actualizarpromocion", data);
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async eliminarPromocion(id) {
        try {
            const res = await axios.delete(url + "eliminarpromocion/" + id);
            return res.data;
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un estado fuera del rango 2xx
                return error.response.data;
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                return { error: "No response received from server." };
            } else {
                // Algo pasó al hacer la solicitud
                return { error: error.message };
            }
        }
    }



}