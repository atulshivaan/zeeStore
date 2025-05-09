import axios from "axios"


const axiosInstace =axios.create({
    baseURL:"http://localhost:4040",
    withCredentials:true

})

export default axiosInstace