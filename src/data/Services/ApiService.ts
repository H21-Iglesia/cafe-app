import axios from 'axios';

const url = 'https://api.cafe.h21iglesia.com/api/';

export const ApiService = {
    async obtener(key: string) {
    try {
        const response = await axios.get(url + key);
        return response.data 
    } catch (error) {
        console.error(error);
    }
    },
    actualizar(key:string,id:string,item:object) {
        axios.put(url+ key +'/'+ id ,item)
          .then(function (response) {
            return response
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    crear(key:string ,item: object){
        axios.post(url+ key ,item)
          .then(function (response) {
            return response
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    eliminar(key:string ,id: string){
      axios.delete(url+ key +'/'+ id)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };
  export default { ApiService };
