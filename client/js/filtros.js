export function InsertarFiltro(data,select)
{
    const nuevaSeccion = document.createElement("section");
    const titulo = document.createElement("h2");
    const divFiltros = document.createElement("div");

    nuevaSeccion.setAttribute("id", "filtros");
    
    nuevaSeccion.appendChild(titulo);
    titulo.textContent="Filtros"
    titulo.className = "row-12 m-0 p-2 text-center text-uppercase font-weight-bold";
    titulo.style.fontSize = "16px";
    titulo.style.fontWeight = "bold";
    titulo.style.backgroundColor= "red";
    
    divFiltros.className="col justify-content-center"

    let selecContenedor = crearDivSelect ("Filtrar por:",select);
    let reduce=crearReduce ("Promedio de miedo:","miedo",data);
    let checkbox=crearCheckboxes(obtenerEncabezados(data));

    aplicarEstiloBoostrap(selecContenedor);
    aplicarEstiloBoostrap(reduce);

    divFiltros.appendChild(selecContenedor);
    divFiltros.appendChild(reduce);
    nuevaSeccion.appendChild(divFiltros);
    nuevaSeccion.appendChild(checkbox);
    
    // nuevaSeccion.className="container-lg d-flex flex-column"
    nuevaSeccion.className="row d-flex justify-content-center bg-white text-dark";
    nuevaSeccion.style="min-width: 570px; max-width: 35vw;"
 
    // aplicarEstiloBoostrap(nuevaSeccion);
    console.log (nuevaSeccion);
    return nuevaSeccion;
}

function aplicarEstiloBoostrap(contenedor)
{
    contenedor.className = "col-auto d-flex flex-row align-items-center justify-content-center";
    const elementosHijos = contenedor.children;
    Array.from(elementosHijos).forEach(elemento => {
        if (elemento.tagName.toLowerCase() === "h3") {
            elemento.style.fontSize = "14px";
            elemento.style.fontWeight = "bold";
        }
        elemento.className="col-auto m-2 text-uppercase";
        // console.log(elemento);
    });
}


function crearDivSelect (titulo,select)
{
    const contenedor = document.createElement("div");
    const htitulo = document.createElement("h3");
    htitulo.textContent=titulo;
    contenedor.appendChild(htitulo);
    const opcion = document.createElement("option");
    opcion.value = "Ningun";
    opcion.text = "Ningun";
    opcion.selected = true;  
    select.insertBefore(opcion, select.firstChild);
    contenedor.appendChild(select);
    return contenedor;
}

function crearReduce(titulo,parametroASumar,data)
{
    const contenedor = document.createElement("div");
    const htitulo = document.createElement("h3");
    htitulo.textContent=titulo;
    contenedor.appendChild(htitulo);
    const sumaTotal = data.reduce((acumulador, objeto) => {
        const valorNumerico = parseFloat(objeto[parametroASumar]);
        return acumulador + valorNumerico;
    }, 0);
    const parrafo = document.createElement("p");
    parrafo.id="promedioReduce"
    parrafo.textContent = data.length > 0 ? sumaTotal / data.length : "No hay datos para calcular";
    contenedor.appendChild(parrafo);
    return contenedor;
}
function crearCheckboxes(arrayPalabras) {
    const contenedor = document.createElement("div");  
    contenedor.id = "contenedorCheckbox";
    const subtitulo = document.createElement("h3");
    subtitulo.textContent="Seleccione campos que desee ver";
    subtitulo.className="col-12 text-center text-uppercase font-weight-bold p-2 witdh:100% m-0"
    subtitulo.style.fontSize = "14px";
    subtitulo.style.fontWeight = "bold";
    subtitulo.style.backgroundColor= "#dddddd";
    contenedor.appendChild(subtitulo);

    arrayPalabras.forEach(palabra => {
        // Crear el contenedor div para cada checkbox y label
        const contenedorIndividual = document.createElement("div");
        contenedorIndividual.className="col-auto p-0";

        // Crear el elemento input (checkbox)
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "palabra";
        checkbox.value = palabra;
        checkbox.id = `${palabra}Filter`;
        checkbox.checked = true;

        // Crear la etiqueta (label) asociada al checkbox
        const label = document.createElement("label");
        label.textContent = palabra;
        label.htmlFor = `${palabra}Filter`; // Asociar el label al checkbox mediante el id

        // Agregar el checkbox y la etiqueta al contenedor div
        contenedorIndividual.appendChild(checkbox);
        contenedorIndividual.appendChild(label);

        // Agregar el contenedor div al contenedorDivs
        contenedor.appendChild(contenedorIndividual);
    });
    contenedor.className="row justify-content-center p-0";
    return contenedor;
}

function obtenerEncabezados(data) {
    if (data.length === 0) {
        console.error("El array de datos está vacío.");
        return [];
    }

    const primerObjeto = data[0];
    const encabezados = Object.keys(primerObjeto).filter(key => key !== "id");

    return encabezados;
  }

