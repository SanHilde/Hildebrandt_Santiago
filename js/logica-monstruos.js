 import {monstruos} from "./monstruos.js";
 localStorage.setItem("listaDeMonstruos",JSON.stringify(monstruos));
import { Monstruo, traerListaDeMonstruos } from './objetos.js';
// let listaDeMonstruos = JSON.parse(localStorage.getItem("listaDeMonstruos"));
let listaDeMonstruos = traerListaDeMonstruos();
let monstruoNuevo = null;
let tabla = crearTablaDesdeJSON(listaDeMonstruos);
obtenerTiposMonstruos(listaDeMonstruos);


document.getElementById("btnCancelar").style.display = "none";
document.getElementById("btnEliminar").style.display = "none";
const loader = document.querySelector("#loader");
PonerLoader();


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

function obtenerTiposMonstruos(data) {
    let tiposUnicos = [];
    const select = document.getElementById("selectTipo");
  
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
    PonerLoader();
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
    let bandera = 0;
    if(monstruoNuevo!=null)
    { 
      for (const indice in listaDeMonstruos) 
      {
        let monstruo = listaDeMonstruos[indice];
        if (monstruo.id == monstruoNuevo.id) {
            actualizarValores(monstruo,monstruoNuevo);
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
  function mostrarAlerta(titulo, mensaje, tipo) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: tipo,
        confirmButtonText: 'OK'
    });
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
  
function actualizarFilas()
  {
    const tbody = tabla.querySelector('tbody');
    const thead = tabla.querySelector('thead');

    if (tbody) 
    {
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
    }
    tabla.appendChild(crearFilas(listaDeMonstruos,tbody,thead));

  }


tabla.addEventListener('click', function(e) {
  PonerLoader();
  MostrarBotones("block", "Guardar");
  if (e.target.tagName === 'TD') {
    const cabeceras = tabla.querySelector('thead');
    const columnas = cabeceras.querySelectorAll('th');
    const fila = e.target.parentElement;
    const id = parseInt(fila.getAttribute("data-id"), 10);
    const celdas = fila.getElementsByTagName('td');
    const monstruoNuevo = new Monstruo(id, {}, "", 0, "", "","");
    for (let i = 0; i < celdas.length; i++) {
    const propiedad = columnas[i].textContent;
      if (propiedad) {
        if (propiedad === "miedo") {
          monstruoNuevo[propiedad] = parseInt(celdas[i].textContent, 10);
        } else {
          monstruoNuevo[propiedad] = celdas[i].textContent;
        }
      }
     }
    cargarDatosEnFormulario(monstruoNuevo);
  }
});


function PedirConfirmacion($titulo,$mensaje,$tipo)
{
  const resultado = window.confirm("¿Esta seguro que deseas continuar?");
  if (resultado) {
    mostrarAlerta($titulo,$mensaje,$tipo);
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
  tabla.style.display = 'none';
  setTimeout(function () {
    loader.classList.add("oculto");
    tabla.style.display= "table";
    },2000);
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


document.getElementById("btnGuardar").addEventListener("click", ()=>{
  if( ControlarCampos())
  {
    if(monstruoNuevo == null )
    {
      let ultimoId =-1;
      monstruoNuevo = new Monstruo ("-","-","-","-",0,"-","-");
      listaDeMonstruos.push(monstruoNuevo);
      for (const elemento of listaDeMonstruos) {
        if(ultimoId<elemento.id)
        {
          ultimoId = elemento.id;
        }      
      }
      monstruoNuevo.id= ultimoId+1;
    }
    let valorDelSpan = document.getElementById("btnGuardar").querySelector("span").textContent;
    let mensaje = "Monstruo actualizado";
    if (valorDelSpan == "Agregar")
    {
      mensaje = "Monstruo agregado";
    }
    console.log(document.getElementById("btnGuardar"));
      if(PedirConfirmacion("OK!", mensaje,"success"))
      {
        PonerLoader();
        guardarDatosDelFormulario();
        actualizarDatosDelFormulario();
        ReinciarFormular();
        actualizarLocalStorage();
      } 
    } else
    {
      alert('Por favor, completa todos los campos requeridos.');  
    } 
  });


document.getElementById("btnEliminar").addEventListener("click", ()=>{
    if(monstruoNuevo != null)
    {
      if(PedirConfirmacion("Atencion","Mounstruo eliminado","warning"))
      {
        PonerLoader();
        guardarDatosDelFormulario();
        eliminarDatosDelFormulario();
        ReinciarFormular();
        actualizarLocalStorage();
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
  }

  document.getElementById("btnCancelar").addEventListener("click", ()=>{
    PonerLoader();
  });

document.getElementById('modificar').addEventListener('submit', function(event) {
  event.preventDefault();
});


