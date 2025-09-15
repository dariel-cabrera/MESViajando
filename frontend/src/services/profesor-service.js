import HttpService from "./htttp.service";

class  ProfesorService {
    getProfesor=async()=>{
        const url="getProfesor";
        return await HttpService.get(url);
    };


}

export default new ProfesorService();