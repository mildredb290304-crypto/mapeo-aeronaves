const aircraftContainer = document.getElementById('aircraftContainer');
const modal = document.getElementById('damageModal');
const damageList = document.getElementById('damageList');

let currentX = 0;
let currentY = 0;
let damages = [];

function identifyZone(x, y){

  if(x < 300) return 'ALA IZQUIERDA';
  if(x > 900) return 'ALA DERECHA';
  if(y < 200) return 'NARIZ';
  if(y > 700) return 'EMPENAJE';

  return 'FUSELAJE';
}

aircraftContainer.addEventListener('click', function(e){

  const rect = aircraftContainer.getBoundingClientRect();

  currentX = e.clientX - rect.left;
  currentY = e.clientY - rect.top;

  const zone = identifyZone(currentX, currentY);

  document.getElementById('partField').value = zone;

  modal.classList.remove('hidden');

});

function closeModal(){
  modal.classList.add('hidden');
}

function saveDamage(){

  const part = document.getElementById('partField').value;
  const size = document.getElementById('sizeField').value;
  const severity = document.getElementById('severityField').value;
  const notes = document.getElementById('notesField').value;

  const marker = document.createElement('div');
  marker.className = 'marker';

  marker.style.left = currentX + 'px';
  marker.style.top = currentY + 'px';

  if(severity === 'Leve') marker.style.background = 'yellow';
  if(severity === 'Moderado') marker.style.background = 'orange';
  if(severity === 'Severo') marker.style.background = 'red';
  if(severity === 'Crítico') marker.style.background = 'magenta';

  aircraftContainer.appendChild(marker);

  damages.push({part,size,severity,notes});

  renderDamages();

  closeModal();
}

function renderDamages(){

  damageList.innerHTML = '';

  let critical = 0;

  damages.forEach(d=>{

    if(d.severity === 'Crítico') critical++;

    const div = document.createElement('div');
    div.className = 'damage-card';

    div.innerHTML = `
      <strong>${d.part}</strong><br><br>
      Tamaño: ${d.size}<br>
      Nivel: ${d.severity}<br><br>
      ${d.notes}
    `;

    damageList.appendChild(div);

  });

  document.getElementById('damageCount').innerText = damages.length;
  document.getElementById('criticalCount').innerText = critical;
}
