const image = document.getElementById("aircraftImage");
const viewer = document.getElementById("viewer");

const modal = document.getElementById("modal");

const reportList = document.getElementById("reportList");

let selectedDamage = "";
let selectedSeverity = "";

let currentX = 0;
let currentY = 0;

const views = {
    superior: "superior.png",
    perfil: "perfil.png",
    frontal: "frontal.png",
    trasera: "trasera.png"
};

function changeView(view){

    image.src = views[view];

}

function selectDamage(type){

    selectedDamage = type;

    alert("Tipo de daño: " + type);

}

function selectSeverity(level){

    selectedSeverity = level;

    alert("Severidad: " + level);

}

image.addEventListener("click", function(e){

    const rect = image.getBoundingClientRect();

    currentX = e.clientX - rect.left;
    currentY = e.clientY - rect.top;

    document.getElementById("zoneInput").value = "";
    document.getElementById("sizeInput").value = "";
    document.getElementById("notesInput").value = "";

    modal.style.display = "flex";

});

function closeModal(){

    modal.style.display = "none";

}

function saveDamage(){

    const zone = document.getElementById("zoneInput").value;
    const size = document.getElementById("sizeInput").value;
    const notes = document.getElementById("notesInput").value;

    const point = document.createElement("div");

    point.className = "damage-point";

    point.style.left =
        (image.offsetLeft + currentX - 8) + "px";

    point.style.top =
        (image.offsetTop + currentY - 8) + "px";

    viewer.appendChild(point);

    const item = document.createElement("div");

    item.className = "report-item";

    item.innerHTML = `
        <h3>${zone}</h3>
        <p><b>Daño:</b> ${selectedDamage}</p>
        <p><b>Severidad:</b> ${selectedSeverity}</p>
        <p><b>Tamaño:</b> ${size}</p>
        <p>${notes}</p>
    `;

    reportList.prepend(item);

    closeModal();

}

function generatePDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text("Reporte AeroScan", 20, 20);

    doc.setFontSize(12);

    let y = 40;

    const reports =
        document.querySelectorAll(".report-item");

    reports.forEach(report => {

        doc.text(
            report.innerText,
            20,
            y
        );

        y += 40;

    });

    doc.save("Reporte_AeroScan.pdf");

}