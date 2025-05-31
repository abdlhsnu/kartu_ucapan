// Elemen DOM
const photoEl = document.getElementById('photo');
const effectBtn = document.getElementById('effect-btn');
const messageEl = document.getElementById('message-text');
const revealBtn = document.getElementById("reveal-button");
const greetingCard = document.getElementById("greeting-card");

// Inisialisasi
function init() {
    // Cek jika ada foto yang disimpan
    const savedPhoto = localStorage.getItem('savedPhoto');
    if (savedPhoto) {
        photoEl.src = savedPhoto;
    }

    // Event untuk upload foto
    photoEl.addEventListener('click', uploadPhoto);

    // Tombol efek
    effectBtn.addEventListener('click', () => {
        showEffects();
        createHearts();
        playHeartbeat();
    });

    // Tombol tampilkan kartu
    revealBtn.addEventListener("click", () => {
        greetingCard.style.display = "block";
        revealBtn.style.display = "none";
    });
}

// Upload foto
function uploadPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            photoEl.src = event.target.result;
            localStorage.setItem('savedPhoto', event.target.result);
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

// Efek detak jantung
function playHeartbeat() {
    const photoContainer = document.querySelector('.photo-container');
    photoContainer.classList.add('heartbeat');
    setTimeout(() => {
        photoContainer.classList.remove('heartbeat');
    }, 1000);
}

// Buat hati/love
function createHearts() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');

            const buttonRect = effectBtn.getBoundingClientRect();
            const x = buttonRect.left + buttonRect.width / 2 + (Math.random() - 0.5) * 50;
            const y = buttonRect.top + buttonRect.height / 2 + (Math.random() - 0.5) * 20;

            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            const size = Math.random() * 0.5 + 0.5;
            heart.style.transform = `scale(${size})`;

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, i * 200);
    }
}

// Efek spesial
function showEffects() {
    messageEl.textContent = "Selamat menikmati hari spesialmu! 💖";

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                `hsl(${Math.random() * 360}, 100%, 50%)`
            );
        }, i * 100);
    }

    for (let i = 0; i < 50; i++) {
        setTimeout(createPetal, i * 200);
    }
}

// Kembang api
function createFirework(x, y, color) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    firework.style.boxShadow = `0 0 10px 2px ${color}`;
    document.body.appendChild(firework);
    setTimeout(() => firework.remove(), 1000);
}

// Kelopak bunga
function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = ['🌸', '🌹', '🌺', '🌻', '🌼', '🌷'][Math.floor(Math.random() * 6)];
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.fontSize = `${Math.random() * 15 + 10}px`;
    petal.style.animationDuration = `${Math.random() * 3 + 3}s`;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 5000);
}

// Jalankan setelah DOM siap
document.addEventListener('DOMContentLoaded', init);