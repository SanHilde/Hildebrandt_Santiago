
import { Monstruo, crearMonstruoDesdeJSON } from './objetos.js';
import { getObjetos, getObjeto,postObjeto,deleteObjeto,updateObjeto } from './axios.js';
import {InsertarFiltro} from './filtros.js'
const URL = "http://localhost:3001/monstruos";
let tabla = document.getElementById("tabla");
let monstruoNuevo = null;
//let select = document.createElement("select");
//select.id = "filtroTipos";
//tabla.appendChild(select);

document.getElementById("btnCancelar").style.display = "none";
document.getElementById("btnEliminar").style.display = "none";
const loader = document.querySelector("#loader");
loader.classList.remove("oculto");

getObjetos(URL)
    .then(data => {
          loader.classList.add("oculto");
          // const labelTipo = document.getElementById("labelTipo");
          const mainElement = document.querySelector("main");
          const tipos = crearSelectTipo(data);
          const selectClonado = tipos.cloneNode(true);
          const seccion=InsertarFiltro(data,selectClonado);

          tabla = crearTablaDesdeJSON(data);
          
          labelTipo.htmlFor = "selectTipo";  // Asociar con el id del selec
          selectClonado.name = "Tipo";
          selectClonado.id = "filtroTipos";
          mainElement.appendChild(seccion);
          selectClonado.addEventListener("change", () => {
            PonerLoader();
            getObjetos(URL)
              .then(data => {
                AplicarFiltros(data);
                SacarLoader();
              })
              .catch(error => {
                console.error(error);
                SacarLoader();
              });
          });

          const contenedorCheckbox = document.getElementById('contenedorCheckbox');
          const checkboxes = contenedorCheckbox.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
              PonerLoader();
              AplicarFiltros(data);
              SacarLoader();
            });
          });
    })
    .catch(error => {
        console.error(error);
    });



function crearTablaDesdeJSON(data) {
      if (data.length === 0) {
      console.log('No hay datos para mostrar.');
      return;
    }
    const table = document.getElementById('tabla');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = thead.insertRow(0);
  
    for (const key in data[0]) {
        if(key!="id")
        {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }
    }
    table.appendChild(thead);
    table.appendChild(crearFilas(data,tbody,thead));
    // PonerLoader();
    return table;
  }

function crearSelectTipo(data) {
    let tiposUnicos = [];
    let select = document.getElementById("selectTipo");
    data.forEach(item => {
      const tipo = item.tipo;
      if (!tiposUnicos.includes(tipo)) {
        tiposUnicos.push(tipo);
        const opcion = document.createElement("option");
        opcion.value = tipo;
        opcion.text = tipo;
        select.appendChild(opcion);
      }
    });
    return select;
  }

function actualizarLocalStorage()
{
  localStorage.setItem("listaDeMonstruos",JSON.stringify(listaDeMonstruos));
}

function crearFilas(data, tbody, thead) {
    data.forEach(item => {
      const row = tbody.insertRow();
      const cells = thead.querySelectorAll("th");
  
      cells.forEach((headerCell, index) => {
        const column = headerCell.textContent;
        const cellData = item[column];
        const cell = row.insertCell(index);
        cell.textContent = cellData;
      });
  
      row.setAttribute("data-id", item.id);
    });
  
    return tbody;
  }

  
function cargarDatosEnFormulario(monstruoNuevoData)
  {
    // PonerLoader();
    monstruoNuevo = monstruoNuevoData;
    document.getElementById("txtNombre").value = monstruoNuevoData.nombre;
    document.getElementById("txtAlias").value = monstruoNuevoData.alias;
    document.getElementById("rangeMiedo").value = parseInt(monstruoNuevoData.miedo,10);
    document.getElementById("selectTipo").value = monstruoNuevoData.tipo;
    const radioButtons = document.querySelectorAll('input[type="radio"][name="defensa"]');
    radioButtons.forEach(radioButton => {
      if (radioButton.value === monstruoNuevoData.defensa) {
        radioButton.checked=true;
      }
    });
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="habilidad"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = monstruoNuevo.habilidad.includes(checkbox.value);
    });
    
  }

function guardarDatosDelFormulario() 
  {
    monstruoNuevo.nombre=document.getElementById("txtNombre").value ;
    monstruoNuevo.alias=document.getElementById("txtAlias").value ;
    monstruoNuevo.miedo=document.getElementById("rangeMiedo").value;
    monstruoNuevo.tipo=document.getElementById("selectTipo").value;
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="habilidad"]:checked');
    monstruoNuevo.habilidad = Array.from(checkboxes).map(checkbox => checkbox.value);
    const radioButtons = document.querySelectorAll('input[type="radio"][name="defensa"]');
    radioButtons.forEach(radioButton => {
      if (radioButton.checked==true) {
        monstruoNuevo.defensa= radioButton.value;
      }
    });
  }
function actualizarValores(monstruoDeLista,monstruoNuevo)
  {
    monstruoDeLista.nombre = monstruoNuevo.nombre;
    monstruoDeLista.alias = monstruoNuevo.alias;
    monstruoDeLista.miedo = monstruoNuevo.miedo;
    monstruoDeLista.tipo = monstruoNuevo.tipo;
    monstruoDeLista.defensa = monstruoNuevo.defensa;
    monstruoDeLista.id = monstruoNuevo.id;
    monstruoDeLista.habilidad = monstruoNuevo.habilidad;
  }

function actualizarDatosDelFormulario()
  {
    if(monstruoNuevo!=null)
    { 
      for (const indice in listaDeMonstruos) 
      {
        let monstruo = listaDeMonstruos[indice];
        if (monstruo.id == monstruoNuevo.id) {
            actualizarValores(monstruo,monstruoNuevo);
           break;
        }
      }
      if (bandera===1)
      {
        actualizarFilas();
        monstruoNuevo=null;
      } 
    }
  }
  function mostrarAlerta(titulo, mensaje, tipo) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: tipo,
        confirmButtonText: 'OK'
    });
    // let form=document.getElementById("modificar");
    // let alerta=crearMensajeAlerta(mensaje, tipo);
    // form.insertBefore(alerta, form.firstChildChild);
}

function eliminarDatosDelFormulario()
  {
    let bandera = 0;
    if(monstruoNuevo!=null)
    { 
      for (const indice in listaDeMonstruos) 
      {
        let monstruo = listaDeMonstruos[indice];
        if (monstruo.id == monstruoNuevo.id) 
        {
          listaDeMonstruos.splice(indice, 1);
          bandera = 1;
          break;
        }
      }
      if (bandera===1)
      {
        actualizarFilas();
        monstruoNuevo=null;
      } 
    }
  }
  function filtrarPorTipo(dataOriginal) {
    let dataFiltrada;
  
    let filtroTipos = document.getElementById("filtroTipos");
  
    if (filtroTipos.selectedIndex !== 0) {
      let valorSeleccionado = filtroTipos.options[filtroTipos.selectedIndex].value;
      dataFiltrada = dataOriginal.filter(objeto => objeto.tipo === valorSeleccionado);
      return dataFiltrada;
    } else {
      return dataOriginal;
    }
  }
  function filtrarPorCheckBox(dataOriginal) {
    const valoresDeseados = (contenedorDivs => {
      const contenedor = document.getElementById(contenedorDivs);
      const checkboxes = contenedor.querySelectorAll('input[type="checkbox"]:checked');
      const checkboxesSeleccionados = Array.from(checkboxes).map(checkbox => checkbox.value);
      return checkboxesSeleccionados;
    })("contenedorCheckbox");
  
    // Aplica map para obtener un nuevo array con los objetos modificados
    const nuevoArray = dataOriginal.map(objeto => {
      const nuevoObjeto = {};
  
      // Filtra solo los campos deseados y cópialos al nuevo objeto
      valoresDeseados.forEach(valor => {
        if (objeto.hasOwnProperty(valor)) {
          nuevoObjeto[valor] = objeto[valor];
        }
      });
      return nuevoObjeto;
    });
  
    return nuevoArray;
  }
  

  function AplicarFiltros(dataOriginal)
  {
    let nuevaData;
    eliminarTabla();
    nuevaData=filtrarPorTipo(dataOriginal);
    let parrafo = document.getElementById("promedioReduce");
    const sumaTotal = nuevaData.reduce((acumulador, objeto) => {
      const valorNumerico = parseFloat(objeto["miedo"]);
      return acumulador + valorNumerico;
    } , 0);
    parrafo.textContent = nuevaData.length > 0 ? sumaTotal / nuevaData.length : "No hay datos para calcular";
    
    tabla = crearTablaDesdeJSON(filtrarPorCheckBox(nuevaData));
  }

  function eliminarTabla() {
    const tbody = tabla.querySelector('tbody');
    const thead = tabla.querySelector('thead'); 
    
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  
    if (thead) {
      thead.removeChild(thead.firstChild);
    }
    if(tabla)
    {
      while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
      }
    }
  }
  
function actualizarFilas()
  {
    // PonerLoader();
    const tbody = tabla.querySelector('tbody');
    const thead = tabla.querySelector('thead');

    if (tbody) 
    {
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
    }
    // tabla.appendChild(crearFilas(listaDeMonstruos,tbody,thead));
    getObjetos(URL)
    .then(data => {

          tabla.appendChild(crearFilas(data,tbody,thead));
          ReinciarFormular();
    })
    .catch(error => {
        console.error(error);
    });

  }


tabla.addEventListener('click', function(e) {
  PonerLoader();
  MostrarBotones("block", "Guardar");
  if (e.target.tagName === 'TD') {
    const fila = e.target.parentElement;
    const id = parseInt(fila.getAttribute("data-id"), 10);
    getObjeto(id,URL)
    .then(data => {
          const monstruoCreado = crearMonstruoDesdeJSON(data);
          cargarDatosEnFormulario(monstruoCreado);
          SacarLoader();
    })
    .catch(error => {
        console.error(error);
    });
  }  
});


function PedirConfirmacion()
{
  const resultado = window.confirm("¿Esta seguro que deseas continuar?");
  if (resultado) {
    return true;
  } else {
    return false;
  }
}

function MostrarBotones(visibildad,guardado)
{
  document.getElementById("btnCancelar").style.display = visibildad;
  document.getElementById("btnEliminar").style.display = visibildad;
  document.getElementById("btnGuardar").querySelector("span").textContent=guardado;
}
function PonerLoader()
{
  loader.classList.remove("oculto");
  tabla.classList.add("oculto");
  // let section = document.getElementById("filtros");
  // section.classList.add("oculto");
}
function SacarLoader()
{
  loader.classList.add("oculto");
  tabla.classList.remove("oculto");
  // let section = document.getElementById("filtros");
  // section.classList.remove("oculto");
}
function ControlarCampos() {
    const nombre = document.getElementById("txtNombre").value.trim();
    if (!nombre) {
        alert("Por favor, completa el campo 'Nombre'.");
        return false;
    }

    const alias = document.getElementById("txtAlias").value.trim();
    if (!alias) {
        alert("Por favor, completa el campo 'Alias'.");
        return false;
    }

    const radios = document.querySelectorAll('input[name="defensa"]:checked');
    if (radios.length === 0) {
        alert("Por favor, selecciona una opción en 'Defensa'.");
        return false;
    }

    const habilidades = document.querySelectorAll('input[name="habilidad"]:checked');
    if (habilidades.length === 0) {
        alert("Por favor, selecciona al menos una 'Habilidad'.");
        return false;
    }

    return true;
}
document.getElementById("btnGuardar").addEventListener("click", () => {
  if (ControlarCampos()) {
      let valorDelSpan = document.getElementById("btnGuardar").querySelector("span").textContent;
      let mensaje = "Monstruo actualizado";
      if (valorDelSpan == "Agregar") {
          mensaje = "Monstruo agregado";
      }
      PonerLoader();
      if (monstruoNuevo == null) {
          monstruoNuevo = new Monstruo("-", "-", "-", "-", 0, "-", "-");
          if (PedirConfirmacion()) {
            getObjetos(URL)
                .then(data => {     
                    const ultimoId = data.reduce((maxId, objeto) => {
                        return objeto.id > maxId ? objeto.id : maxId;
                    }, 0);
                    monstruoNuevo.id = ultimoId + 1;
                    return Promise.resolve();
                })
                .then(() => {     
                        guardarDatosDelFormulario();
                        postObjeto(monstruoNuevo, URL)
                            .then(() => {
                                // mostrarAlerta("OK!", mensaje, "success");
                                actualizarFilas();
                                monstruoNuevo = null;                           
                            })
                            .catch(error => {
                                console.error(error);
                                SacarLoader();
                            });
                })
                .catch(error => {
                    console.error(error);
                });
            }
      } else {
          if (PedirConfirmacion()) {
              guardarDatosDelFormulario();
              updateObjeto(monstruoNuevo, URL)
                  .then(() => {
                      // mostrarAlerta("OK!", mensaje, "success");
                      actualizarFilas();
                      monstruoNuevo = null;
                  })
                  .catch(error => {
                      console.error(error);
                      SacarLoader();
                  });
          }
      }
  } else {
      alert('Por favor, completa todos los campos requeridos.');
  }
});

document.getElementById("btnEliminar").addEventListener("click", ()=>{
    if(monstruoNuevo != null)
    {
      if(PedirConfirmacion())
      {
        mostrarAlerta("Atencion","Mounstruo eliminado","warning");
        PonerLoader();
        guardarDatosDelFormulario();
        deleteObjeto(monstruoNuevo.id,URL)
        .then(() => {
          actualizarFilas();
        })
        .catch(error => {
            console.error(error);
        });
        monstruoNuevo=null;
      }
    }
  });

  function ReinciarFormular()
  {
    PonerLoader();
    MostrarBotones("none","Agregar");
    monstruoNuevo = new Monstruo ("","","","",50,"", "");
    cargarDatosEnFormulario(monstruoNuevo);
    monstruoNuevo=null;
    SacarLoader();
  }

  document.getElementById("btnCancelar").addEventListener("click", ()=>{
    ReinciarFormular();
  });

document.getElementById('modificar').addEventListener('submit', function(event) {
  event.preventDefault();
});


// function crearMensajeAlerta(mensaje, tipo) {
//   const divRow = document.createElement("div");
//   divRow.classList.add("row");

//   const divCol = document.createElement("div");
//   divCol.classList.add("col-md-6");

//   const divAlert = document.createElement("div");
//   divAlert.classList.add("alert", `alert-${tipo}`, "alert-dismissible", "mt-5");

//   const mensajeP = document.createElement("p");
//   mensajeP.id = "mensaje";
//   mensajeP.textContent = mensaje;

//   const closeButton = document.createElement("button");
//   closeButton.type = "button";
//   closeButton.classList.add("close");
//   closeButton.setAttribute("data-dismiss", "alert");

//   const closeSpan = document.createElement("span");
//   closeSpan.textContent = "x";

//   closeButton.appendChild(closeSpan);

//   divAlert.appendChild(mensajeP);
//   divAlert.appendChild(closeButton);

//   divCol.appendChild(divAlert);
//   divRow.appendChild(divCol);

//   return divRow;
// }

