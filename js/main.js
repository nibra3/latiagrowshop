// Duplicate marquee for infinite loop
const track = document.querySelector('.marquee-track');
if (track) {
    track.innerHTML += track.innerHTML;
}

// ── WHATSAPP ──
// Cuando tengan el número, cargalo acá: código de país + área + número, sin "+", espacios ni guiones.
// Ejemplo: '5491112345678'
const NUMERO_WA = '';
// Cómo se muestra en la sección de contacto. Ejemplo: '11 1234-5678'
const NUMERO_WA_VISIBLE = '';

(function () {
    const tieneNumero = /^\d{10,15}$/.test(NUMERO_WA);
    const urlWa = (texto) => 'https://wa.me/' + NUMERO_WA + '?text=' + encodeURIComponent(texto);

    // Número visible en la sección de contacto y botón flotante
    const waNumero = document.getElementById('wa-numero');
    const waFloat = document.getElementById('wa-float');
    if (tieneNumero) {
        if (waNumero) {
            waNumero.innerHTML = '';
            const a = document.createElement('a');
            a.href = urlWa('Hola! Quiero hacer una consulta.');
            a.target = '_blank';
            a.rel = 'noopener';
            a.className = 'contact-link';
            a.textContent = NUMERO_WA_VISIBLE || '+' + NUMERO_WA;
            waNumero.appendChild(a);
        }
        if (waFloat) {
            waFloat.href = urlWa('Hola! Quiero hacer una consulta.');
            waFloat.hidden = false;
        }
    }

    // Formulario → arma el mensaje y abre WhatsApp
    const form = document.getElementById('form-consulta');
    const nota = document.getElementById('form-nota');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        nota.classList.remove('form-nota--error');

        const nombre = form.nombre.value.trim();
        const mensaje = form.mensaje.value.trim();
        if (!nombre || !mensaje) {
            nota.textContent = 'Completá tu nombre y el mensaje para enviar la consulta.';
            nota.classList.add('form-nota--error');
            (!nombre ? form.nombre : form.mensaje).focus();
            return;
        }

        if (!tieneNumero) {
            nota.textContent = 'Todavía estamos configurando nuestro WhatsApp. Mientras tanto, escribinos por Instagram a @soldatiseplanta.';
            nota.classList.add('form-nota--error');
            return;
        }

        const lineas = [
            'Hola! Les escribo desde la web.',
            '',
            '*Nombre:* ' + (nombre + ' ' + form.apellido.value.trim()).trim()
        ];
        const email = form.email.value.trim();
        if (email) lineas.push('*Correo:* ' + email);
        const tema = form.tema.value;
        if (tema) lineas.push('*Temática:* ' + tema);
        lineas.push('', '*Consulta:*', mensaje);

        window.open(urlWa(lineas.join('\n')), '_blank', 'noopener');
        nota.textContent = '¡Listo! Se abrió WhatsApp con tu consulta. Solo te falta tocar enviar.';
        form.reset();
    });
})();

// ── LA DE DIOS: próxima fecha (último martes del mes) ──
(function () {
    const el = document.getElementById('ldd-proxima');
    if (!el) return;

    function ultimoMartes(anio, mes) {
        const d = new Date(anio, mes + 1, 0);           // último día del mes
        d.setDate(d.getDate() - ((d.getDay() - 2 + 7) % 7)); // retrocede hasta martes
        return d;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    let fecha = ultimoMartes(hoy.getFullYear(), hoy.getMonth());
    if (fecha < hoy) fecha = ultimoMartes(hoy.getFullYear(), hoy.getMonth() + 1);

    const texto = fecha.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
    el.textContent = (fecha.getTime() === hoy.getTime() ? 'Hoy · ' : 'Próxima: ') + texto;
    el.hidden = false;
})();
