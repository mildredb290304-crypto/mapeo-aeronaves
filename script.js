// ======================================
// AEROSCAN - SCRIPT COMPLETO FUNCIONAL
// ======================================

let vistaActual = "superior";
let tipoDanio = "";
let severidad = "";

const zonasContador = {
    "Fuselaje": 0,
    "Ala Izquierda": 0,
    "Ala Derecha": 0,
    "Nariz": 0,
    "Empenaje": 0,
    "Motores": 0,
    "Tren de aterrizaje": 0
};

const reportes = [];

const vistas = {
    superior: "superior.png",
    perfil: "perfil.png",
    frontal: "frontal.png",
    trasera: "trasera.png"
};

// ======================================
// INICIAR INSPECCIÓN
// ======================================

function iniciarInspeccion(){

    const matricula = document.getElementById("matricula").value;
    const fecha = document.getElementById("fecha").value;
    const aeronave = document.getElementById("tipoAeronave").value;

    if(matricula === "" || fecha === "" || aeronave === ""){

        alert("Completa todos los campos");
        return;
    }

    document.getElementById("pantallaInicio").style.display = "none";

    document.getElementById("appPrincipal").style.display = "grid";
}

// ======================================
// CAMBIAR VISTA
// ======================================

function cambiarVista(vista){

    vistaActual = vista;

    document.getElementById("imagenAvion").src = vistas[vista];

    document.querySelectorAll(".vista-btn").forEach(btn=>{
        btn.classList.remove("activo");
    });

    document.getElementById(`btn-${vista}`).classList.add("activo");
}

// ======================================
// SELECCIONAR TIPO DAÑO
// ======================================

function seleccionarDanio(btn,tipo){

    tipoDanio = tipo;

    document.querySelectorAll(".danio-btn").forEach(b=>{
        b.classList.remove("seleccionado");
    });

    btn.classList.add("seleccionado");
}

// ======================================
// SELECCIONAR SEVERIDAD
// ======================================

function seleccionarSeveridad(btn,nivel){

    severidad = nivel;

    document.querySelectorAll(".sev-btn").forEach(b=>{
        b.classList.remove("seleccionado");
    });

    btn.classList.add("seleccionado");
}

// ======================================
// CLICK EN AVIÓN
// ======================================

function registrarClick(){

    if(tipoDanio === ""){
        alert("Selecciona tipo de daño");
        return;
    }

    if(severidad === ""){
        alert("Selecciona severidad");
        return;
    }

    abrirModal();
}

// ======================================
// MODAL
// ======================================

function abrirModal(){

    document.getElementById("modalDanio").style.display = "flex";
}

function cerrarModal(){

    document.getElementById("modalDanio").style.display = "none";
}

// ======================================
// GUARDAR DAÑO
// ======================================

function guardarDanio(){

    const zona = document.getElementById("zona").value;
    const tamanio = document.getElementById("tamano").value;
    const notas = document.getElementById("notas").value;

    if(zona === ""){
        alert("Selecciona zona");
        return;
    }

    if(tamanio === ""){
        alert("Ingresa tamaño");
        return;
    }

    const daño = {

        matricula: document.getElementById("matricula").value,
        fecha: document.getElementById("fecha").value,
        aeronave: document.getElementById("tipoAeronave").value,

        vista: vistaActual,
        tipo: tipoDanio,
        severidad: severidad,
        zona: zona,
        tamanio: tamanio,
        notas: notas
    };

    reportes.push(daño);

    zonasContador[zona]++;

    actualizarContadores();

    mostrarReportes();

    cerrarModal();

    limpiarModal();

    alert("Daño registrado correctamente");
}

// ======================================
// LIMPIAR MODAL
// ======================================

function limpiarModal(){

    document.getElementById("zona").value = "";
    document.getElementById("tamano").value = "";
    document.getElementById("notas").value = "";
}

// ======================================
// CONTADORES
// ======================================

function actualizarContadores(){

    document.getElementById("countFuselaje").innerText =
        zonasContador["Fuselaje"];

    document.getElementById("countAlaIzq").innerText =
        zonasContador["Ala Izquierda"];

    document.getElementById("countAlaDer").innerText =
        zonasContador["Ala Derecha"];

    document.getElementById("countNariz").innerText =
        zonasContador["Nariz"];

    document.getElementById("countEmpenaje").innerText =
        zonasContador["Empenaje"];

    document.getElementById("countMotores").innerText =
        zonasContador["Motores"];

    document.getElementById("countTren").innerText =
        zonasContador["Tren de aterrizaje"];
}

// ======================================
// MOSTRAR REPORTES
// ======================================

function mostrarReportes(){

    const lista = document.getElementById("listaReportes");

    lista.innerHTML = "";

    reportes.forEach((r)=>{

        lista.innerHTML += `

        <div class="reporte-card">

            <h4>${r.zona}</h4>

            <p>${r.tipo}</p>

            <p>${r.severidad}</p>

            <p>${r.tamanio}</p>

        </div>
        `;
    });
}

// ======================================
// PDF
// ======================================

function generarPDF(){

    if(reportes.length === 0){

        alert("No hay daños registrados");
        return;
    }

    let contenido = `
AEROSCAN - REPORTE TÉCNICO

MATRÍCULA:
${document.getElementById("matricula").value}

FECHA:
${document.getElementById("fecha").value}

TIPO DE AERONAVE:
${document.getElementById("tipoAeronave").value}

`;

    reportes.forEach((r,index)=>{

        contenido += `

-------------------------
DAÑO ${index+1}

Vista: ${r.vista}
Zona: ${r.zona}
Tipo: ${r.tipo}
Severidad: ${r.severidad}
Tamaño: ${r.tamanio}
Notas: ${r.notas}

`;
    });

    const blob = new Blob([contenido], {type:"text/plain"});

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Reporte_AeroScan.txt";

    link.click();
}