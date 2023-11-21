// document.getElementById("btnGetPersonas").addEventListener("click", ()=>{
//     getPersonas();
// });

// document.getElementById("btnGetPersona").addEventListener("click", ()=>{
//     getPersona(3);   
// });

// document.getElementById("btnPostPersona").addEventListener("click", ()=>{
//     postPersona();
// });

// document.getElementById("btnDeletePersona").addEventListener("click", ()=>{
//     deletePersona(23);
// });

// document.getElementById("btnUpdatePersona").addEventListener("click", ()=>{
//     updatePersona();
// });

// const loader = document.querySelector("#loader");

// const URL = "http://localhost:3000/personas";

// import axios from '../../server/node_modules/axios';

// import axios from 'axios';

export function getObjetos(URL) {
    return new Promise((resolve, reject) => {
        axios.get(URL)
            .then(({ data }) => {
                resolve(data);
            })
            .catch(({ message }) => {
                console.error(message);
                reject(message);
            });
    });
}

export function getObjeto(id, URL) {
    return new Promise((resolve, reject) => {
        axios.get(URL + `/${id}`)
            .then(({ data }) => {
                // console.log(data);
                resolve(data);
            })
            .catch(({ message }) => {
                console.error(message);
                reject(message);
            });
    });
}


export function postObjeto(objeto, URL) {
    return new Promise((resolve, reject) => {
        axios.post(URL, objeto)
            .then(({ data }) => {
                // console.log(data);
                resolve(data);
            })
            .catch(({ message }) => {
                console.error(message);
                reject(message);
            })
    });
}


export function deleteObjeto(id, URL) {
    return new Promise((resolve, reject) => {
        axios.delete(URL + `/${id}`)
            .then(({ data }) => {
                // console.log(data);
                resolve(data);
            })
            .catch(({ message }) => {
                console.error(message);
                reject(message);
            });
    });
}

export function updateObjeto(objeto, URL) {
    return new Promise((resolve, reject) => {
        axios.put(URL + `/${objeto.id}`, objeto)
            .then(({ data }) => {
                // console.log(data);
                resolve(data);
            })
            .catch(({ message }) => {
                console.error(message);
                reject(message);
            });
    });
}
