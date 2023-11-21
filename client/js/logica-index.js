// import {crearMonstruoDesdeJSON, traerListaDeMonstruos } from './objetos.js';
// let listaDeMonstruos = JSON.parse(localStorage.getItem("listaDeMonstruos"));
// let listaDeMonstruos = traerListaDeMonstruos();
// import { Monstruo, crearMonstruoDesdeJSON } from './objetos.js';
import { getObjetos} from './axios.js';
const URL = "http://localhost:3001/monstruos";
getObjetos(URL)
    .then(data => {
          CrearTarjetas(data);
    })
    .catch(error => {
        console.error(error);
    });

const contenedor = document.getElementById('tarjetas');

function CrearTarjetas(listaDeMonstruos)
{
    listaDeMonstruos.forEach(objeto => {
        const article = document.createElement('article');
        let color="red";
        const divStats = document.createElement('div');
        divStats.id="stats";  
        const divPerfil = document.createElement('div');
        const imagenPerfil=document.createElement('img');
        const nombre= document.createElement('h2');
        for (const parametro in objeto) {
                if (parametro !=="id")
                {   
                    const div = document.createElement('div'); 
                    const nuevoP = document.createElement('p');             
                    
                    if(parametro!=="nombre")
                    {
                        if (parametro==="defensa" || parametro==="alias" || parametro==="miedo" || parametro==="tipo")
                        {
                            const nuevaImg = document.createElement('img');
                            div.appendChild(nuevaImg);   
                            nuevaImg.src= `../asserts/icon/icono_${parametro}.svg`;
                            nuevaImg.alt= `icono ${parametro}`;
                            nuevoP.textContent = `${objeto[parametro]}`;
    
                        } else
                        {
                            nuevoP.textContent = `${parametro}: ${objeto[parametro]}`;
                        }
                        
                        div.appendChild(nuevoP);
                        divStats.appendChild(div);
                        
                    } else{
                        nombre.textContent = `${objeto[parametro]}`;
                    }
                    if(parametro==="tipo")
                    {
                        const tipo =`${objeto[parametro]}`;
                        switch(tipo)
                        {
                            case "Vampiro":
                                color = "red";
                                break;
                            case "Hombre Lobo":
                                color = "blue";
                                break;
                            case "Bruja":
                                color = "violet";
                                break;
                            case "Esqueleto":
                                color = "gray";
                                break;
                            case "Fantasma":
                                color = "white";
                                break;
                            case "Zombie":
                                color = "green";
                                break;
                            default:
                                color = "red";
                                break;                      
                        }                   
                        imagenPerfil.src= `../asserts/jpg/${tipo}_perfil.jpg`;
                        imagenPerfil.alt= `pefil ${tipo}`;
                        imagenPerfil.id = "perfilTarjetas"
                    }
                    article.appendChild(nombre);
                    article.appendChild(imagenPerfil);              
                    article.appendChild(divStats);
                }
            }
        article.setAttribute('data-color', color);
        const pLorem = document.createElement('p');
        pLorem.textContent = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, sint nostrum, nemo ad molestias commodi enim error dolorem quaerat nisi optio in accusantium esse sapiente? Hic eligendi a totam ex. Iure delectus tenetur molestiae aspernatur iste sint fugit eos soluta, quibusdam nam consequuntur accusamus error, est atque ea animi vero?";  
        article.appendChild(pLorem);
        contenedor.appendChild(article);
    });
    
}

