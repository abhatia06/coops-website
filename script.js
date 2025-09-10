const starField = document.querySelector('.star-field');
const starCount = 500;
const onmedia = window.matchMedia('(max-width: 768px)');
let timer = 5000;
let timeoutID;


for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = (Math.random() * 100) + '%';
    star.style.left = (Math.random() * 100) + '%';
    star.style.zIndex = 0;
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    starField.appendChild(star);
}

const canvas = document.getElementById('shooting-stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = document.getElementById("background");
const grad = ctx.createLinearGradient(0,0, 280, 0);
grad.addColorStop(0, 'lightblue');
grad.addColorStop(1, 'darkblue');

starField.style.background = 'radial-gradient(circle at bottom, navy 0, black 100%)';

let shootingStars = [];

function spawnShootingStar() {
    console.log("CALLED");
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    const length = Math.random() * 80 + 50;
    shootingStars.push({ x, y, length, alpha: 1 });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      ctx.strokeStyle = 'rgba(255, 255, 255, ' + s.alpha + ')';
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + s.length, s.y + s.length * 0.3);
      ctx.stroke();

      s.x += 10;
      s.y += 3;
      s.alpha -= 0.02;

      if (s.alpha <= 0) {
        shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
}

setInterval(() => {
  if (Math.random() <= 0.3) spawnShootingStar();
}, 1500);

animate();

window.addEventListener('resize', () => {
    console.log('resized');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let currentindex = 0;
let imagelist = [];
for(let i = 1; i <= 9; i++) {
    const image = new Image();
    image.src = "images/image" + i + ".jpg";
    imagelist.push(image);
}

let imageslider = document.getElementById('imageslider');
for(let i = 0; i < imagelist.length; i++) {
    if(!onmedia.matches) {
        imagelist[i].style.objectFit = 'cover';
        imagelist[i].style.objectPosition = 'center';
        imagelist[i].style.width = '100%';
        imagelist[i].style.height = '100%';
        imagelist[i].classList.add('showcaseimage');
    }
    else {
        imagelist[i].style.width = '100%';
        imagelist[i].style.height = '100%';
        imagelist[i].style.objectFit = 'cover';
        imagelist[i].classList.add('showcaseimage');
        imageslider.style.height = '30%';
    }

    if (onmedia.matches) {
        document.body.style.height = window.innerHeight + 'px';
    }


    imageslider.appendChild(imagelist[i]);
    if(i != currentindex) {
        imagelist[i].classList.add('hide');
    }
}


let buttonR = document.getElementById('buttonright')
let buttonL = document.getElementById('buttonleft');

imageslider.appendChild(imagelist[currentindex]);

buttonR.addEventListener('click', () => {
    rotateright();
    resetTimerAndAutomaticCall();
});

buttonL.addEventListener('click', () => {
    rotateleft();
    resetTimerAndAutomaticCall();
})

document.addEventListener('DOMContentLoaded', () => {
    resetTimerAndAutomaticCall();
})

function rotateright() {
    imagelist[currentindex].classList.add('hide');
    currentindex++;
    if(currentindex >= imagelist.length) {
        currentindex = 0;
    }
    imagelist[currentindex].classList.remove('hide');
}

function rotateleft() {
    imagelist[currentindex].classList.add('hide');
    currentindex--;
    if(currentindex < 0) {
        currentindex = imagelist.length-1;  
    }
    imagelist[currentindex].classList.remove('hide');
}

function resetTimerAndAutomaticCall() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
        rotateright();
        resetTimerAndAutomaticCall();
    }, timer);
}


