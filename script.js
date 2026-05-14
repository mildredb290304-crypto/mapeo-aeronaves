let selectedDamage = "";
let selectedSeverity = "";
let currentZone = "";
let reports = [];

function selectDamage(button, damage){

    selectedDamage = damage;

    document.querySelectorAll('.damage-btn').forEach(btn=>{
        btn.classList.remove('active');
    });

    button.classList.add('active');
}

function selectSeverity(button, severity){

    selectedSeverity = severity;

    document.querySelectorAll('.severity-btn').forEach(btn=>{
        btn.classList.remove('active');
    });

    button.classList.add('active');
}

function openModal(zone){

    if(selectedDamage === "" || selectedSeverity === ""){

        alert("Selecciona tipo de daño y severidad.");

        return;
    }

    currentZone = zone;

    document.getElementById("modal").style.display = "flex";

    document.getElementById("zoneInput").value = zone;
}

function closeModal(){

    document.getElementById("modal").style.display = "none";
}

function saveReport(){

    const size = document.getElementById("sizeInput").value;
    const notes = document.getElementById("notesInput").value;

    const report = {

        zone: currentZone,
        damage: selectedDamage,
        severity: selectedSeverity,
        size: size,
        notes: notes,
        date: new Date().toLocaleString()

    };

    reports.push(report);

    renderReports();

    closeModal();

    document.getElementById("sizeInput").value = "";
    document.getElementById("notesInput").value = "";
}

function renderReports(){

    const container = document.getElementById("reports");

    container.innerHTML = "";

    reports.forEach(report=>{

        container.innerHTML += `

        <div class="report-card">

        <h3>${report.zone}</h3>

        <p><strong>Daño:</strong> ${report.damage}</p>

        <p><strong>Severidad:</strong> ${report.severity}</p>

        <p><strong>Tamaño:</strong> ${report.size}</p>

        <p>${report.notes}</p>

        <small>${report.date}</small>

        </div>

        `;
    });
}

function generatePDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text("Reporte AeroScan", 20, 20);

    let y = 40;

    reports.forEach((r,index)=>{

        doc.text(`Reporte ${index+1}`,20,y);
        y += 10;

        doc.text(`Zona: ${r.zone}`,20,y);
        y += 10;

        doc.text(`Daño: ${r.damage}`,20,y);
        y += 10;

        doc.text(`Severidad: ${r.severity}`,20,y);
        y += 10;

        doc.text(`Tamaño: ${r.size}`,20,y);
        y += 10;

        doc.text(`Notas: ${r.notes}`,20,y);
        y += 15;

    });

    doc.save("Reporte_AeroScan.pdf");
}

function changeView(view){

    const img = document.getElementById("aircraftView");

    if(view === "superior"){
        img.src = "superior.png";
    }

    if(view === "izquierdo"){
        img.src = "izquierdo.png";
    }

    if(view === "derecho"){
        img.src = "derecho.png";
    }

    if(view === "frontal"){
        img.src = "frontal.png";
    }

    if(view === "trasera"){
        img.src = "trasera.png";
    }
}