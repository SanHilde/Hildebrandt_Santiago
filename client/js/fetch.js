// document.getElementById("btnGetPersonas").addEventListener("click", ()=>{
//     getPersonas();
// });

// document.getElementById("btnGetPersona").addEventListener("click", ()=>{
//     getPersona(4);   
// });

// document.getElementById("btnPostPersona").addEventListener("click", ()=>{
//     postPersona();
// });

// document.getElementById("btnDeletePersona").addEventListener("click", ()=>{
//     deletePersona(24);
// });

// document.getElementById("btnUpdatePersona").addEventListener("click", ()=>{
//     updatePersona();
// });

// const loader = document.querySelector("#loader");

// const URL = "http://localhost:3000/personas";

export function getObjetos(URL) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(URL);
            if (!res.ok) {
                console.error(`Error ${res.status}: ${res.statusText}`);
                reject(res);
            }
            const data = await res.json();
            resolve(data);
        } catch (error) {
            console.error(`Error: ${error}`);
            reject(error);
        }
    });
}
export  function getObjeto(id, URL) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(URL + `/${id}`);
            if (!res.ok) {
                reject(res);
            }
            const data = await res.json();
            // console.log(data);
            resolve(data);
        } catch (res) {
            console.error(`Error ${res.status}: ${res.statusText}`);
            reject(res);
        }
    });
}

export function postObjeto(objeto, URL) {
    return new Promise((resolve, reject) => {
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(objeto),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                reject(response);
            })
            .then(data => {
                console.log(data);
                resolve(data);
            })
            .catch(response => {
                console.error(`Error ${response.status}: ${response.statusText}`);
                reject(response);
            });
    });
}

export function deleteObjeto(id, URL) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(URL + `/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw res;
            }
            const data = await res.json();
            console.log(data);
            resolve(data);
        }
        catch (res) {
            console.error(`Error ${res.status}: ${res.statusText}`);
            reject(res);
        }
    });
}


  export function updateObjeto(objeto, URL) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(URL + `/${objeto.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify(objeto),
            });
            if (!res.ok) {
                throw res;
            }
            const data = await res.json();
            console.log(data);
            resolve(data);
        }
        catch (res) {
            console.error(`Error ${res.status}: ${res.statusText}`);
            reject(res);
        }
    });
}
