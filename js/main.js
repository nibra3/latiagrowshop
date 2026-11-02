// Counter animation
function animateCounter(el, target, duration, suffix = '') {
    let start = 0;
    const step = target / (duration / 16);
    const update = () => {
        start += step;
        if (start >= target) {
            el.textContent = '+' + target + suffix;
            return;
        }
        el.textContent = '+' + Math.floor(start) + suffix;
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const brandStrip = document.querySelector('.brand-strip');
let triggered = false;
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
        triggered = true;
        animateCounter(document.getElementById('stat-years'), 6, 1200);
        animateCounter(document.getElementById('stat-clients'), 2500, 2000);
        animateCounter(document.getElementById('stat-products'), 100, 1800);
    }
}, { threshold: 0.4 });
if (brandStrip) observer.observe(brandStrip);

// Duplicate marquee for infinite loop
const track = document.querySelector('.marquee-track');
if (track) {
    track.innerHTML += track.innerHTML;
}
