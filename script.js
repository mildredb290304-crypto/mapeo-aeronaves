const aircraftContainer = document.getElementById('aircraftContainer');
const modal = document.getElementById('damageModal');
const damageList = document.getElementById('damageList');

let currentX = 0;
let currentY = 0;
let damages = [];

function identifyZone(pctX, pctY) {
    // AJUSTE BASADO EN LA IMAGEN DE 5 VISTAS (watermarked_img_7122908990626072591.png)
    // El eje Y se divide aproximadamente en: Superior (0-50%), Perfiles (50-75%), Frontal/Trasera (75-100%)

    // --- VISTA SUPERIOR (Parte superior de la imagen) ---
    if (pctY < 45) {
        if (pctY < 12 && pctX > 45 && pctX < 55) return 'NARIZ (V. SUPERIOR)';
        if (pctX < 40) return 'ALA IZQUIERDA';
        if (pctX > 60) return 'ALA DERECHA';
        if (pctY > 35) return 'EMPENAJE (COLA)';
        return 'FUSELAJE CENTRAL';
    }

    // --- VISTA PERFIL IZQUIERDO (Centro Izquierda) ---
    if (pctY >= 45 && pctY < 72 && pctX < 50) {
        if (pctX < 15) return 'NARIZ (PERFIL IZQ)';
        if (pctX > 35 && pctY > 55) return 'ESTABILIZADOR / COLA';
        return 'FUSELAJE (PERFIL IZQ)';
    }

    // --- VISTA PERFIL DERECHO (Centro Derecha) ---
    if (pctY >= 45 && pctY < 72 && pctX >= 50) {
        if (pctX > 85) return 'NARIZ (PERFIL DER)';
        if (pctX < 65) return 'ESTABILIZADOR / COLA';
        return 'FUSELAJE (PERFIL DER)';
    }

    // --- VISTA FRONTAL (Abajo Izquierda) ---
    if (pctY >= 72 && pctX < 50) {
        if (pctX > 22 && pctX < 28 && pctY > 80) return 'NARIZ (FRONTAL)';
        if (pctX < 20 || (pctX > 30 && pctX < 50)) return 'ALAS (FRONTAL)';
        return 'FUSELAJE / CABINA (FRONTAL)';
    }

    // --- VISTA TRASERA (Abajo Derecha) ---
    if (pctY >= 72 && pctX >= 50) {
        return 'SECCIÓN DE COLA (TRASERA)';
    }

    return 'ZONA NO DEFINIDA';
}

aircraftContainer.addEventListener('click', function(e) {
    const rect = aircraftContainer.getBoundingClientRect();

    // Calculamos la posición en píxeles para el marcador
    currentX = e.clientX - rect.left;
    currentY = e.clientY - rect.top;

    // Convertimos a porcentaje para la identificación de zona
    const pctX = (currentX / rect.width) * 100;
    const pctY = (currentY / rect.height) * 100;

    const zone = identifyZone(pctX, pctY);

    document.getElementById('partField').value = zone;
    modal.classList.remove('hidden');
});

// ... (Resto de tus funciones closeModal, saveDamage, renderDamages se mantienen igual)