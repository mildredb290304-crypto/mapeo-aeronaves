let tipoDanio = "";
let severidad = "";
let zonaActual = "";

let registros = [];

function iniciarSistema() {

  const matricula = document.getElementById("matricula").value;
  const fecha = document.getElementById("fecha").value;
  const tipo = document.getElementById("tipoAeronave").value;

  if (!matricula || !fecha || !tipo) {
    alert("Completa todos los campos");
    return;
  }

  document.getElementById("inicio").style.display = "none";
  document.getElementById("app").style.display = "block";
}

function cambiarVista(vista, boton) {

  document.querySelectorAll(".vista-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  boton.classList.add("active");

  const imagen = document.getElementById("imagenAeronave");

  if (vista === "superior") {
    imagen.src = "superior.png";
  }

  if (vista === "perfil") {
    imagen.src = "perfil.png";
  }

  if (vista === "frontal") {
    imagen.src = "frontal.png";
  }

  if (vista === "trasera") {
    imagen.src = "trasera.png";
  }
}

function seleccionarDanio(btn, tipo) {

  tipoDanio = tipo;

  document.querySelectorAll(".damage-btn").forEach(b => {
    b.classList.remove("active");
  });

  btn.classList.add("active");
}

function seleccionarSeveridad(btn, nivel) {

  severidad = nivel;

  document.querySelectorAll(".severity-btn").forEach(b => {
    b.classList.remove("active");
  });

  btn.classList.add("active");
}

function abrirModal(zona) {

  if (tipoDanio === "") {
    alert("Selecciona el tipo de daño");
    return;
  }

  if (severidad === "") {
    alert("Selecciona la severidad");
    return;
  }

  zonaActual = zona;

  document.getElementById("zonaSeleccionada").innerHTML =
    "Zona seleccionada: <b>" + zona + "</b>";

  document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {

  document.getElementById("modal").style.display = "none";
}

function guardarDanio() {

  const tamano = document.getElementById("tamano").value;
  const notas = document.getElementById("notas").value;

  const nuevoRegistro = {
    zona: zonaActual,
    tipo: tipoDanio,
    severidad: severidad,
    tamano: tamano,
    notas: notas,
    fecha: new Date().toLocaleString()
  };

  registros.push(nuevoRegistro);

  actualizarPanel();

  actualizarContadores();

  document.getElementById("tamano").value = "";
  document.getElementById("notas").value = "";

  cerrarModal();
}

function actualizarPanel() {

  const lista = document.getElementById("listaDanios");

  lista.innerHTML = "";

  registros.forEach(r => {

    lista.innerHTML += `
      <div class="reporte-item">
        <strong>${r.zona}</strong><br><br>

        Tipo:
        ${r.tipo}<br>

        Severidad:
        ${r.severidad}<br>

        Tamaño:
        ${r.tamano}<br><br>

        ${r.notas}<br><br>

        <small>${r.fecha}</small>
      </div>
    `;
  });
}

function actualizarContadores() {

  let contadores = {
    "Fuselaje": 0,
    "Ala Izq.": 0,
    "Ala Der.": 0,
    "Nariz": 0,
    "Cola": 0,
    "Motor": 0
  };

  registros.forEach(r => {

    if (contadores[r.zona] !== undefined) {
      contadores[r.zona]++;
    }
  });

  document.getElementById("contador-fuselaje").innerText =
    contadores["Fuselaje"];

  document.getElementById("contador-ala-izq").innerText =
    contadores["Ala Izq."];

  document.getElementById("contador-ala-der").innerText =
    contadores["Ala Der."];

  document.getElementById("contador-nariz").innerText =
    contadores["Nariz"];

  document.getElementById("contador-cola").innerText =
    contadores["Cola"];

  document.getElementById("contador-motor").innerText =
    contadores["Motor"];
}

document.getElementById("documentoInput")
.addEventListener("change", function () {

  const archivo = this.files[0];

  if (!archivo) return;

  document.getElementById("listaDocs").innerHTML += `
    <div class="doc-item">
      ${archivo.name}
    </div>
  `;
});

async function generarPDF() {

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text("REPORTE AEROSCAN", 20, 20);

  let y = 40;

  registros.forEach((r, index) => {

    doc.text(
      `${index + 1}. ${r.zona}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Tipo: ${r.tipo}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Severidad: ${r.severidad}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Tamaño: ${r.tamano}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Notas: ${r.notas}`,
      20,
      y
    );

    y += 20;
  });

  doc.save("Reporte_AeroScan.pdf");
}