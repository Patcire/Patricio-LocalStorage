
// Patricio 2º DAW-A IES RAFAEL ALBERTI

// Variables de elementos ya existentes
const lista_mensajes = document.querySelector('#lista-mensajes') //div
const mensaje = document.querySelector('#mensaje')
const boton_agregar = document.querySelector('.button')
let almacen_lista_mensajes = []
let id_botones = 'a' //para los botones de eliminar un solo mensaje



// Variables para boton borrar todos
const boton_borrar_todos = document.createElement("input")
boton_borrar_todos.setAttribute('type', 'button')
const caja_visualizacion = document.querySelector("#lista-mensajes").parentElement
caja_visualizacion.appendChild(boton_borrar_todos)
boton_borrar_todos.value='Borrar todos'
boton_borrar_todos.setAttribute('id', 'borrar-todos')
boton_borrar_todos.style.display='none'



// Funciones


const comprobar_input = (input_usuario) =>{
    if (input_usuario.trim().length === 0){
        alert("No se admiten mensajes vacíos")
        return false
    }
    else {
        return true
    }

}
const agregar_mensaje=()=>{

    if (comprobar_input(mensaje.value)){
        const nuevo_mensaje = document.createElement('p')

        nuevo_mensaje.textContent= mensaje.value
        almacen_lista_mensajes =[...almacen_lista_mensajes, mensaje.value]
        console.log(almacen_lista_mensajes)
        lista_mensajes.appendChild(nuevo_mensaje)
        lista_mensajes.appendChild(crear_boton_borrar_uno())
        vaciar_textarea()

        //como se agrega un elemento hacemos visible el botón borrar todos
        boton_borrar_todos.style.display='block'
        almacenar_local()
        console.log('mensajevalido')
    }


}


const vaciar_textarea = () =>{
    mensaje.value = ''
    console.log('limpiando')
}


const borrar_todos= () =>{
    while (lista_mensajes.firstChild){
        lista_mensajes.firstChild.remove()
    }
    almacen_lista_mensajes=[]

    boton_borrar_todos.style.display='none'
    id_botones='a'

}


const crear_boton_borrar_uno = () =>{

    const boton_eliminar_uno = document.createElement("input")
    boton_eliminar_uno.setAttribute('type', 'button')
    boton_eliminar_uno.classList.add('borrar-uno')
    boton_eliminar_uno.setAttribute('id', `${id_botones}`)
    boton_eliminar_uno.value = 'Eliminar mensaje'
    id_botones=id_botones+id_botones
    console.log(id_botones)
    return boton_eliminar_uno
}


const almacenar_local = () =>{
    if (almacen_lista_mensajes.length>0) {
        console.log('tiene elementos')
        const set_almacen_actualizado = new Set(almacen_storage)
        for (let i=0; i < almacen_lista_mensajes.length; i++){
            set_almacen_actualizado.add(almacen_lista_mensajes[i])
        }
        almacen_storage=[...set_almacen_actualizado]
    }
        localStorage.setItem('almacen', JSON.stringify(almacen_storage))

}

const recuperar_almacen = () =>{
    let almacen_recuperado

    // si ya existe entonces le asignamos la lista que recupera
    //esto es para evitar problemas la primera vez que se inicia la página

    if (localStorage.getItem('almacen')===null){
        almacen_recuperado =[]
    }
    else {
        almacen_recuperado=JSON.parse(localStorage.getItem('almacen'))


    }
    console.log("almacen recuperado")
    return almacen_recuperado

}

// variable para la lista del localstorage
let almacen_storage = recuperar_almacen()



// Eventos
boton_agregar.addEventListener("click", (e)=>{
    e.preventDefault()
    agregar_mensaje()
})



boton_borrar_todos.addEventListener('click', (e)=>{
    e.preventDefault()
    almacen_storage=[]
    localStorage.clear()
    borrar_todos()


})


// Borrar un único mensaje
lista_mensajes.addEventListener('click', (e)=> {
    e.preventDefault()
    const mensaje_a_borrar = document.querySelector(`#${(e.target.id)}`).previousSibling
    const storage_actualizado=almacen_storage.filter((dato) =>dato!==mensaje_a_borrar.textContent)
    almacen_lista_mensajes = [...(almacen_lista_mensajes.filter((mensajillo) =>mensajillo!==mensaje_a_borrar.textContent))]
    almacen_storage =[...storage_actualizado]
    console.log(almacen_storage)
    mensaje_a_borrar.remove()
    const boton = e.target
    boton.remove()
    almacenar_local()

})

window.addEventListener('beforeunload', ()=>{
    almacenar_local()
})

window.addEventListener('load', ()=>{
    console.log(almacen_storage)
    if (almacen_storage.length>0){
        // mostramos los mensajes almacenados
        for (let elemento in almacen_storage){
            console.log('cargando mensaje del local storage')
            const mensaje_a_cargar = document.createElement('p')
            mensaje_a_cargar.textContent= almacen_storage[elemento]
            lista_mensajes.appendChild(mensaje_a_cargar)
            lista_mensajes.appendChild(crear_boton_borrar_uno())
        }
        //también mostramos el botón borrar todos
        boton_borrar_todos.style.display='block'
    }

})



