
export const LocalService = {
    obtener(item:string) {
        return JSON.parse(localStorage.getItem(item))
    },
    actualizar(key:string,item: any) {
        localStorage.setItem(key,JSON.stringify(item))
    },
  };
  export default { LocalService };