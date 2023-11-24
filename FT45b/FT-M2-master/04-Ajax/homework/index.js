
const URL ="http://localhost:5000"
const image = $("#image")
image.hide() //ocultarla de principio

const verAmigos = $("#boton")
verAmigos.click(() => {
    image.show() 
    //solo se muestra mientras que la lista carga
    const lista = $("#lista")
    lista.empty() 
    //vaciar la lista cuando vuelvas a apretar el boton de buscar amigos
    const urlAmigos = `${URL}/amigos`
    $.get(urlAmigos, (arrAmigos) => {
        image.hide()
        for(const amigo of arrAmigos) {
            lista.append(`<li>${amigo.id} - ${amigo.name}</li>`)
            amigo.name
        }
    })
})
//Buscar un amigo
const botonBuscar = $("#search")
const inputBuscar = $("#input")

botonBuscar.click(() => {
    const input = inputBuscar.val()
    const amigo = $("#amigo")
    amigo.empty()
    //no hacer esto de abajo x si se agrega amigo o algo asi
    if(input > 6 || input < 1) return alert("No existe amigo con ese ID")
    const urlAmigoId = `${URL}/amigos/${input}`
    $.get(urlAmigoId, (objAmigo) => {
        $("#amigo").text(objAmigo.name)
    })
})

//Borrar un amigo
const botonBorrar = $("#delete")
const inputBorrar = $("#inputDelete")

botonBorrar.click(() => {
    const input = inputBorrar.val()
    if(input > 6 || input < 1) return alert("No existe amigo con ese ID")
    const urlAmigoId = `${URL}/amigos/${input}`
    $.ajax({
        url: urlAmigoId,
        type:"DELETE",
        success: () => {
            console.log("Amigo borrado")
        },
        error: () => {
            console.log("Error al borrar")
        }
    })
})
