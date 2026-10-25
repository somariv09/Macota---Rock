//Se define los valores predeterminados de la mascota
const felicidadConfi={
    felicidadInicio:30,
    felicidadPorCaricia:10,
    disminucionFelicidad:15000,
    perdidaFelicidad:2,
    timeMensajeF:5000,
}
const hambreConfi={
    hambreInicio:30,
    recuperacionHambre:15,
    disminucionHambre:10000,
    perdidaHambre:2,
    timeMensajeH:5000,
}

//Se define el estado inicial de la mascota
const estado={
    felicidad: felicidadConfi.felicidadInicio,
    hambre: hambreConfi.hambreInicio,
    enojado: false,
}

//Se obtienen los elementos del html por medio de su id.
const mascota = document.getElementById("mascota");
const barraFelicidad = document.getElementById("felicidad");
const valorFelicidad = document.getElementById("valorFelicidad");

const barraHambre = document.getElementById("hambre");
const valorHambre = document.getElementById("valorHambre");

const alerta = document.getElementById("alertas");
const notificacion = document.getElementById("mensajeAccion");

const btnAcariciar = document.getElementById("btnAcariciar");
const btnAlimentar = document.getElementById("btnAlimentar");

//La primera función sirve para actualizar las barras y el texto. Así como gestionar las alertas porque Rocky tiene hambre o le falta cariño-
function actualizarBarras(){
    barraFelicidad.value=estado.felicidad;
    valorFelicidad.textContent=estado.felicidad + "%";

    barraHambre.value=estado.hambre;
    valorHambre.textContent=estado.hambre + "%";

    //Activacion de las alertas si las barras de Rocky son menores al 25%
    let alertas=[];
    const necesitaCariño=estado.felicidad<25;
    const tieneHambre=estado.hambre<25;

    if(necesitaCariño){
        alertas.push("¡Necesito cariño!");
        controlarAnimacion("enojo");
        estado.enojado=true;
    }
    if(tieneHambre){
        alertas.push("¡Quiero comida!");
        controlarAnimacion("enojo");
        estado.enojado=true;
    }
    if(!tieneHambre&&!necesitaCariño){
        estado.enojado=false;
    }
    alerta.textContent=alertas.join("");
}

//Funcion para gestionar el tiempo de los mensajes en la pantalla.
let tiempoMensajes;

function mostrarMensaje(mensaje, duracion){
    notificacion.textContent=mensaje;

    //Al presionar por segunda vez esta linea evita que el temporizador anterior se asigne al siguiente mensaje.
    clearTimeout(tiempoMensajes);

    tiempoMensajes= setTimeout(() => {
        notificacion.textContent="";
    }, duracion);
}

//Funcion encragada de las animaciones, primero revisa y quita si esta activada una anteior, luego reinicia el spritesheet y activa el nuevo evento
//cuando termina lo quita.

function controlarAnimacion(animacion){
    mascota.classList.remove("comer", "afecto", "enojo");
    void mascota.offsetWidth;
    mascota.classList.add(animacion);
}

//Con este bloque nos permite quitar las animaciones cuando estas terminen
//Para que vuelva a la animación base.
mascota.addEventListener("animationend", (evento) => {
    if (
        evento.animationName === "animarComer" ||
        evento.animationName === "animarAfecto" ||
        evento.animationName === "animarEnojo"
    ) {
        mascota.classList.remove("comer", "afecto", "enojo");
    }
});

//Activacion de los botones.
btnAcariciar.addEventListener("click", ()=>{
    estado.felicidad=Math.min(100, estado.felicidad+felicidadConfi.felicidadPorCaricia);

    actualizarBarras();
    controlarAnimacion("afecto");
    mostrarMensaje("¡Estoy contento :3!", felicidadConfi.timeMensajeF);
});

btnAlimentar.addEventListener("click", ()=>{
    estado.hambre=Math.min(100, estado.hambre+hambreConfi.recuperacionHambre);

    actualizarBarras();
    controlarAnimacion("comer");
    mostrarMensaje("¡Que rico :3!", hambreConfi.timeMensajeH);
});

//Mostrar las barras en su estado por defecto cuando se carga la pagina.
actualizarBarras();

setInterval(() => {
    estado.felicidad=Math.max(0,estado.felicidad-felicidadConfi.perdidaFelicidad);
    actualizarBarras();
}, felicidadConfi.disminucionFelicidad);

setInterval(() => {
    estado.hambre=Math.max(0, estado.hambre-hambreConfi.perdidaHambre);
    actualizarBarras();
}, hambreConfi.disminucionHambre);