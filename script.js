const envelope = document.querySelector('.envelope');
const heartSeal = document.querySelector('.heart-seal');
const music = document.getElementById('romanticMusic');
let timeoutId;
let particleInterval = null;

// Code gốc cho heart-seal
envelope.addEventListener('mouseover', () => {
    clearTimeout(timeoutId);
    heartSeal.style.opacity = 0;
});

envelope.addEventListener('mouseout', () => {
    timeoutId = setTimeout(() => {
        heartSeal.style.opacity = 1;
    }, 1500); 
});

heartSeal.style.transition = 'opacity 0.3s ease';

// Hàm tạo particle
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random giữa trái tim và hoa hồng
    if (Math.random() > 0.5) {
        particle.classList.add('heart');
    } else {
        particle.classList.add('flower');
    }
    
    // Random kích thước từ 10px đến 30px
    const size = Math.random() * 20 + 10;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random vị trí ngang
    particle.style.left = Math.random() * 100 + 'vw';
    
    // Random thời gian rơi từ 2s đến 4s
    const fallDuration = Math.random() * 2 + 2;
    particle.style.animation = `fall ${fallDuration}s linear`;
    
    document.body.appendChild(particle);
    
    // Xóa particle sau khi rơi xong
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

// Sự kiện click để mở/đóng thư, bật/tắt particle và nhạc
envelope.addEventListener('click', () => {
    if (envelope.classList.contains('opened')) {
        // Đóng thư, dừng particle và nhạc
        envelope.classList.remove('opened');
        clearInterval(particleInterval);
        particleInterval = null;
        music.pause();
        music.currentTime = 0; // Quay lại đầu khi dừng
    } else {
        // Mở thư, bắt đầu particle và nhạc
        envelope.classList.add('opened');
        if (!particleInterval) {
            particleInterval = setInterval(createParticle, 200); // Tạo particle mỗi 200ms
        }
        music.play();
    }
});

// Tắt nhạc và particle khi thoát khỏi trang
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        // Trang bị ẩn (thoát app/tab)
        if (particleInterval) {
            clearInterval(particleInterval);
            particleInterval = null;
        }
        music.pause();
        music.currentTime = 0; // Quay lại đầu
        envelope.classList.remove('opened'); // Đóng thư
    }
});