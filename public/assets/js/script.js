/**
 * Qodha Global Scripts
 * Digunakan di berbagai halaman untuk interaksi UI
 */

// 1. CAROUSEL HERO LOGIC
let heroProducts = [];
let heroCurrentIdx = 0;

function initHeroCarousel(data) {
    heroProducts = data;
    if(heroProducts.length === 0) return;
    
    // Render Dots
    const dotsContainer = document.getElementById('dotsContainer');
    if(dotsContainer) {
        dotsContainer.innerHTML = '';
        heroProducts.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-brand-gold w-6' : 'bg-gray-300'}`;
            dot.onclick = () => goToHeroProduct(idx);
            dotsContainer.appendChild(dot);
        });
    }

    updateHeroView();
}

function updateHeroView() {
    if(heroProducts.length === 0) return;
    const product = heroProducts[heroCurrentIdx];

    const els = {
        name: document.getElementById('productName'),
        desc: document.getElementById('productDesc'),
        img: document.getElementById('productImage'),
        price: document.getElementById('productPrice')
    };

    if(els.name) {
        // Animasi Fade Out
        els.name.style.opacity = '0';
        
        setTimeout(() => {
            els.name.textContent = product.name;
            els.desc.textContent = product.desc;
            els.img.src = product.image;
            if(els.price) els.price.textContent = product.price;
            
            // Animasi Fade In
            els.name.style.opacity = '1';
        }, 200);
    }

    // Update Dots
    const dots = document.querySelectorAll('#dotsContainer button');
    dots.forEach((dot, idx) => {
        if (idx === heroCurrentIdx) {
            dot.classList.remove('bg-gray-300', 'w-2');
            dot.classList.add('bg-brand-gold', 'w-6');
        } else {
            dot.classList.remove('bg-brand-gold', 'w-6');
            dot.classList.add('bg-gray-300', 'w-2');
        }
    });
}

// Navigasi Global
window.nextHeroProduct = function() {
    heroCurrentIdx = (heroCurrentIdx + 1) % heroProducts.length;
    updateHeroView();
}

window.prevHeroProduct = function() {
    heroCurrentIdx = (heroCurrentIdx - 1 + heroProducts.length) % heroProducts.length;
    updateHeroView();
}

window.goToHeroProduct = function(idx) {
    heroCurrentIdx = idx;
    updateHeroView();
}

// Auto Rotate
setInterval(window.nextHeroProduct, 5000);