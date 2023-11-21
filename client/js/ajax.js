
// document.getElementById("btnGetObjeto").addEventListener("click", ()=>{
//     getObjeto();
// });

// document.getElementById("btnGetPersona").addEventListener("click", ()=>{
//     getPersona(2);   
// });

// document.getElementById("btnPostPersona").addEventListener("click", ()=>{
//     postPersona();
// });

// document.getElementById("btnDeletePersona").addEventListener("click", ()=>{
//     deletePersona(1);
// });

// document.getElementById("btnUpdatePersona").addEventListener("click", ()=>{
//     updatePersona();
// });

// const loader = document.querySelector("#loader");

// const URL = "http://localhost:3001/monstruos";
// export let data;

export function getObjetos(URL){
    return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            //loader.classList.remove("oculto");
            //setear evento ready state change
            xhr.onreadystatechange = ()=>{
                
                if(xhr.readyState == 4){

                    if(xhr.status >= 200 && xhr.status < 300)
                    {
                        const data = JSON.parse(xhr.responseText);
                        // console.log(data);
                        resolve(data);
                    }
                    else{
                        reject(`ERROR ${xhr.status}: ${xhr.statusText}`);
                    }
                    //loader.classList.add("oculto");
                }
        }

        //open peticion configura

        xhr.open("GET", URL, true);

        //enviar
        try{                    
            xhr.send();        
        }
        catch(error){
            console.log(error);
        }
    });
}
// const eventoCargaDatos = new CustomEvent('cargaDatosCompletada', { detail: { data } });
// document.dispatchEvent(eventoCargaDatos);
export function getObjeto(id, URL) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    // console.log(data);
                    resolve(data);
                } else {
                    console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
                    reject({ status: xhr.status, statusText: xhr.statusText });
                }
            }
        };

        xhr.open("GET", URL + `/${id}`, true);

        try {
            xhr.send();
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}


export function postObjeto(objeto, URL) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    // console.log(data);
                    resolve(data);
                } else {
                    console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
                    reject({ status: xhr.status, statusText: xhr.statusText });
                }
            }
        };

        xhr.open("POST", URL, true);

        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        try {
            xhr.send(JSON.stringify(objeto));
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}


export function deleteObjeto(id, URL) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    // console.log(data);
                    resolve(data);
                } else {
                    const error = new Error(`ERROR ${xhr.status}: ${xhr.statusText}`);
                    console.error(error);
                    reject(error);
                }
            }
        };

        //open peticion configura
        xhr.open("DELETE", URL + `/${id}`, true);

        //enviar
        try {
            xhr.send();
        } catch (error) {
            // console.log(error);
            reject(error);
        }
    });
}


export function updateObjeto(objeto, URL) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    // console.log(data);
                    resolve(data);
                } else {
                    const error = new Error(`ERROR ${xhr.status}: ${xhr.statusText}`);
                    console.error(error);
                    reject(error);
                }
            }
        };

        //open peticion configura
        xhr.open("PATCH", URL + `/${objeto.id}`, true);

        //seteo la cabecera
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        //enviar
        try {
            xhr.send(JSON.stringify(objeto));
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
