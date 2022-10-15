import axios from 'axios';

const url = 'https://apicafe.h21iglesia.org/api/';

export const ApiService = {
    async obtener(key: string) {
    try {
        const response = await axios.get(url + key);
        console.log('response',response.data)
        return response.data 
    } catch (error) {
        console.error(error);
    }
    },
    actualizar(key:string,id:string,item: any) {
        axios.put(url+ key +'/'+ id ,item)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    crear(key:string ,item: object){
        axios.post(url+ key ,item)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  };
  export default { ApiService };