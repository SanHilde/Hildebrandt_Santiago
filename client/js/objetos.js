export function Personaje (id, nombre, tipo) 
{
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
}

export function Monstruo(id, nombre, alias, defensa, miedo, tipo,habilidad) 
{
    if (id === null || nombre === null || alias === null || defensa === null || miedo === null || tipo === null) {
        return null;
    }
    Personaje.call(this,id, nombre, tipo);
    // this.id = id;
    // this.nombre = nombre;
    this.alias = alias;
    this.defensa = defensa;
    // if (typeof miedo == 'number') {
    //     this.miedo = parseInt(miedo,10);
    // }
    
    if (typeof parseInt(miedo,10) === 'number') {
        this.miedo = parseInt(miedo,10);
    } else {
        throw new Error('El valor de "miedo" debe ser un número.');
    }
    this.habilidad=habilidad;
    Object.setPrototypeOf(Monstruo.prototype, Personaje.prototype);
    // this.tipo = tipo;
}

export function crearMonstruoDesdeJSON(objetoJSON) {
    // if (!objetoJSON.id || !objetoJSON.nombre || !objetoJSON.alias || !objetoJSON.defensa || !objetoJSON.miedo || !objetoJSON.tipo) {
    //     throw new Error('Faltan propiedades en el objeto JSON.');
    // }
    
    const monstruo = new Monstruo(
        objetoJSON.id,
        objetoJSON.nombre,
        objetoJSON.alias,
        objetoJSON.defensa,
        objetoJSON.miedo,
        objetoJSON.tipo,
        objetoJSON.habilidad
    );

    return monstruo;
}

export function traerListaDeMonstruos()
{
    let listaDeObjetos = JSON.parse(localStorage.getItem("listaDeMonstruos"));
    let listaDeMonstruos = [];
    listaDeObjetos.forEach(objeto => {       
        const monstruo=crearMonstruoDesdeJSON(objeto);
        listaDeMonstruos.push(monstruo);
    });
    return listaDeMonstruos;
    
}
