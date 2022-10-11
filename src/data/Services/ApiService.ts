import axios from 'axios';

export const ApiService = {
    obtener(key: string) {
        let datos : object
        axios.get('https://apicafe.h21iglesia.org/api/'+ key)
        .then(function (response) {
          datos = response.data
          console.log(response.data);
        })
        return datos
    },
    actualizar(key:string,id:string,item: any) {
        axios.put('https://apicafe.h21iglesia.org/api/'+ key +'/'+ id ,item)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    crear(key:string ,item: object){
        axios.post('https://apicafe.h21iglesia.org/api/'+ key ,item)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  };
  export default { ApiService };