// Create floating hearts background
function createFloatingHearts() {
    const heartBg = document.getElementById('heartBg');
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💓'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heartBg.appendChild(heart);
    }
}

createFloatingHearts();

// No button evasion logic
const noBtn = document.getElementById('noBtn');
const buttonContainer = document.getElementById('buttonContainer');
let noButtonPosition = { x: 0, y: 0 };

function moveNoButton() {
    // Add moving class to make it absolutely positioned
    if (!noBtn.classList.contains('moving')) {
        noBtn.classList.add('moving');
    }
    
    const containerRect = buttonContainer.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Random position within safe bounds
    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = containerRect.height - btnRect.height - 20;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
}

// Mouse move detection
noBtn.addEventListener('mouseenter', () => {
    moveNoButton();
});

// Touch detection for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Additional hover area detection
let hoverCheckInterval;
buttonContainer.addEventListener('mousemove', (e) => {
    const btnRect = noBtn.getBoundingClientRect();
    const distance = 80; // Detection radius
    
    const centerX = btnRect.left + btnRect.width / 2;
    const centerY = btnRect.top + btnRect.height / 2;
    
    const distanceFromBtn = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );
    
    if (distanceFromBtn < distance) {
        moveNoButton();
    }
});

// Yes button celebration
const yesBtn = document.getElementById('yesBtn');
const successOverlay = document.getElementById('successOverlay');

function createConfetti() {
    const colors = ['#FF1744', '#FF6B9D', '#FFB3C6', '#FFC0CB', '#FF69B4'];
    const shapes = ['❤️', '💕', '💖', '💗', '✨', '🎉'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random shape or color
            if (Math.random() > 0.5) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = '20px';
            } else {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            }
            
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3500);
        }, i * 30);
    }
}

yesBtn.addEventListener('click', () => {
    successOverlay.style.display = 'flex';
    createConfetti();
    
    // Add extra heartbeat animation
    document.querySelector('.success-content').style.animation = 'popIn 0.6s ease-out, heartbeat 1.5s ease-in-out infinite 0.6s';
});

// Close button functionality
const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', () => {
    successOverlay.style.display = 'none';
});

// Prevent No button from being clicked
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});