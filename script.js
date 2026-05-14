const aircraftImage = document.getElementById('aircraftImage');
const modal = document.getElementById('modal');
const reportList = document.getElementById('reportList');

let reports = JSON.parse(localStorage.getItem('reports')) || [];

function changeView(view){

if(view === 'superior'){
aircraftImage.src = 'superior.png';
}

if(view === 'izquierdo'){
aircraftImage.src = 'perfil_izquierdo.png';
}

if(view === 'derecho'){
aircraftImage.src = 'perfil_derecho.png';
}

if(view === 'frontal'){
aircraftImage.src = 'frontal.png';
}

if(view === 'trasera'){
aircraftImage.src = 'trasera.png';
}

}

aircraftImage.addEventListener('click', ()=>{

modal.classList.remove('hidden');

});

function closeModal(){
modal.classList.add('hidden');
}

function saveDamage(){

const report = {
part: document.getElementById('part').value,
size: document.getElementById('size').value,
notes: document.getElementById('notes').value,
date: new Date().toLocaleString()
};

reports.push(report);

localStorage.setItem('reports', JSON.stringify(reports));

renderReports();

closeModal();

}

function renderReports(){

reportList.innerHTML = '';

reports.forEach(r=>{

const div = document.createElement('div');

div.innerHTML = `
<div style="
background:#0d1b2a;
padding:15px;
margin-bottom:10px;
border-radius:10px;
">
<strong>${r.part}</strong><br>
${r.size}<br>
${r.date}
</div>
`;

reportList.appendChild(div);

});

}

function generatePDF(){

window.print();

}

renderReports();