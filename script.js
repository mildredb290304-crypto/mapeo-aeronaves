const aircraftContainer = document.getElementById('aircraftContainer');
const modal = document.getElementById('damageModal');
const damageList = document.getElementById('damageList');

let currentX = 0;
let currentY = 0;
let damages = [];

function identifyZone(x, y){

  // AJUSTE MÁS PRECISO DE ZONAS

  // NARIZ
  if(y < 180 && x > 420 && x < 760){
    return 'NARIZ';
  }

  // ALA IZQUIERDA
  if(x < 420 && y > 220 && y < 520){
    return 'ALA IZQUIERDA';
  }

  // ALA DERECHA
  if(x > 760 && y > 220 && y < 520){
    return 'ALA DERECHA';
  }

  // EMPENAJE
  if(y > 620){
    return 'EMPENAJE';
  }

  // MOTORES
  if((x < 420 && y > 260 && y < 480) || (x > 760 && y > 260 && y < 480)){
    return 'MOTORES';
  }

  // CABINA
  if(y > 180 && y < 260 && x > 470 && x < 700){
    return 'CABINA';
  }

  // TREN DE ATERRIZAJE
  if(y > 500 && y < 650 && x > 420 && x < 760){
    return 'TREN DE ATERRIZAJE';
  }

  // FUSELAJE CENTRAL
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
