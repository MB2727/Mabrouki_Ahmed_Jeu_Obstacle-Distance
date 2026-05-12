const mmm = new Audio("music/Drop Of A Hat - The Grey Room _ Density & Time.mp3");
console.log(mmm);

let button_play = document.getElementById("play_button");
console.log(button_play);
let divplay = document.getElementById("play");
console.log(divplay);
let currentdiv = divplay;
let currenthome = divplay;

button_play.addEventListener("click", () => {
    divplay.style.display = "none";
    currentdiv = document.getElementById("select_player");
    currenthome = currentdiv;
    currenthome.style.display = "block";
});

let info = document.getElementById("info");
let news = document.getElementById("news");
let support = document.getElementById("support");

info.addEventListener("click", (event) => {
    event.preventDefault();
    currentdiv.innerHTML = `
        <br><br>
        <p style="font-size:45px; color:black; font-weight:bold;text-align:center;">
            Ce jeu est principalement le projet de developpement web c est un jeu d'obstacles a eviter et un score 
            obtenue a partir de nombre d'obstacles evites et la distance ou le temps passe sans echouer.
        </p>
        <p style="font-size:45px; color:black; font-weight:bold;text-align:center;">
            L'idee est base principalement sur l'etat actuel du monde et de la guerre Iranienne.
            Le jeu est absolument pour s'amuser et n'a pas de cibles cachées. ENJOY THE GAME !
        </p>
    `;
});

news.addEventListener("click", (event) => {
    event.preventDefault();
    currentdiv.innerHTML = `
        <br><br>
        <p style="font-size:35px; color:black; font-weight:bold;text-align:center;">
            Donald Trump a qualifié de “complètement stupide” 
            la proposition de paix de l’Iran et a promis une “victoire complète” des États-Unis.
        </p>
        <p style="font-size:35px; color:black; font-weight:bold;text-align:center;">
            Le gouvernement iranien a, de son côté, affirmé que 
            le pays était prêt à “donner une leçon” en cas de nouvelle agression américaine.
        </p>
        <p style="font-size:35px; color:black; font-weight:bold;text-align:center;">
            Le PDG d’Aramco a assuré que la guerre au Moyen-Orient 
            avait déclenché “le plus grand choc énergétique” jamais connu.
        </p>
    `;
});

support.addEventListener("click", (event) => {
    event.preventDefault();
    currentdiv.innerHTML = `
        <br><br>
        <p style="font-size:35px; color:black; font-weight:bold;text-align:center;">
            Report any problem to this email : ahmedmabrouki301@gmail.com
        </p>
    `;
});

let players = document.getElementsByClassName("img_players");
console.log(players);
let player_selected = players[0];
console.log(player_selected);

for (let i = 0; i < players.length; i++) {
    players[i].addEventListener("click", () => {
        if (player_selected == players[i]) {
            players[i].style.transform = "scale(1.2)";
            document.getElementById("select_button").textContent = "Start";
        } else {
            players[i].style.transform = "scale(1.2)";
            player_selected.style.removeProperty("transform");
            player_selected = players[i];
            console.log(player_selected);
            document.getElementById("select_button").textContent = "Start";
        }
    });
    players[i].addEventListener("hover", () => {
        players[i].style.transform = "scale(1.2)";
    });
}
console.log(player_selected);

let music_status = document.getElementById("music_status");
let music = document.getElementById("music");

mmm.addEventListener('error', () => {
    console.error("Fichier audio introuvable ou corrompu");
    music_status.textContent = "ERROR";
});

mmm.addEventListener('ended', () => {
    mmm.currentTime = 0;
    mmm.play();
    music_status.textContent = "ON";
});

music.addEventListener("click", () => {
    if (music_status.textContent == "OFF") {
        mmm.play();
        music_status.textContent = "ON";
    } else if (music_status.textContent == "ON") {
        mmm.pause();
        music_status.textContent = "OFF";
    }
});


const gameArea = document.getElementById('gameArea');
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const gameScoreSpan = document.getElementById('gameScore');
const gameDistanceSpan = document.getElementById('gameDistance');
const restartBtn = document.getElementById('restartBtn');
const menuBtn = document.getElementById('menuBtn');
const selectBtn = document.getElementById('select_button');

let gameRunning = false;
let animationId = null;
let score = 0;
let distance = 0;
let frame = 0;


const player = {
    x: 150,
    y: 0,
    width: 50,
    height: 130,
    normalHeight: 130,
    yGround: 0,
    isJumping: false,
    isDucking: false,
    yVelocity: 0,
    gravity: 0.65,
    jumpPower: -18,
    duckHeight: 45,       
    minX: 20,
    maxX: 800
};

let obstacles = [];
let bonuses = [];

const OBSTACLE_VEHICLE = 'vehicle';
const OBSTACLE_BOMB = 'bomb';
const BONUS_OIL = 'oil';

const imagePaths = {
    vehicle: 'img/land-mine-on-solid-full.svg',
    bomb: 'img/bomb-solid-full.svg',
    oil: 'img/gas-pump-solid-full.svg',
    jet: 'img/jet-fighter-solid-full.svg'
};

const gameImages = {};
function preloadGameImages() {
    for (let key in imagePaths) {
        const img = new Image();
        img.src = imagePaths[key];
        gameImages[key] = img;
    }
}
preloadGameImages();

let jetX = 1200;
let baseSpeed = 3.8;            
let currentSpeed = baseSpeed;
let lastSpawnFrame = 0;

let leftPressed = false;
let rightPressed = false;

function startGame() {
    gameRunning = true;
    score = 0;
    distance = 0;
    currentSpeed = baseSpeed;
    obstacles = [];
    bonuses = [];
    frame = 0;
    lastSpawnFrame = 0;
    jetX = gameCanvas.width;

    player.isJumping = false;
    player.isDucking = false;
    player.yVelocity = 0;
    player.height = player.normalHeight;
    player.x = 150;
    player.yGround = gameCanvas.height - 70;
    player.y = player.yGround - player.height;

    updateScoreDisplay();

    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(gameLoop);
}

function updateScoreDisplay() {
    gameScoreSpan.textContent = Math.floor(score);
    gameDistanceSpan.textContent = Math.floor(distance);
}

function drawPlayer() {
    let imgSrc = player_selected ? player_selected.src : 'img/khami.png';
    let img = new Image();
    img.src = imgSrc;
    let drawY = player.y;
    let drawHeight = player.height;
    if (player.isDucking) {
        drawY = player.y + (player.normalHeight - player.duckHeight);
        drawHeight = player.duckHeight;
    }
    if (img.complete) {
        ctx.drawImage(img, player.x, drawY, player.width, drawHeight);
    } else {
        ctx.fillStyle = 'green';
        ctx.fillRect(player.x, drawY, player.width, drawHeight);
    }
}

function drawObstacles() {
    for (let obs of obstacles) {
        let img = (obs.type === OBSTACLE_VEHICLE) ? gameImages.vehicle : gameImages.bomb;
        if (img.complete) {
            ctx.drawImage(img, obs.x, obs.y, obs.width, obs.height);
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        }
    }
}

function drawBonuses() {
    for (let bonus of bonuses) {
        let img = gameImages.oil;
        if (img.complete) {
            ctx.drawImage(img, bonus.x, bonus.y, bonus.width, bonus.height);
        } else {
            ctx.fillStyle = 'orange';
            ctx.fillRect(bonus.x, bonus.y, bonus.width, bonus.height);
        }
    }
}

function drawJet() {
    let img = gameImages.jet;
    if (!img.complete) return;
    ctx.save();
    ctx.translate(jetX + 30, 50 + 20);
    ctx.scale(-1, 1);
    ctx.drawImage(img, -30, -20, 60, 40);
    ctx.restore();
}

function updateGame() {
    if (!gameRunning) return;

    score += currentSpeed * 0.3;
    distance += currentSpeed * 0.15;
    updateScoreDisplay();

    
    if (player.isJumping) {
        player.yVelocity += player.gravity;
        player.y += player.yVelocity;
        if (player.y + player.height >= player.yGround) {
            player.y = player.yGround - player.height;
            player.isJumping = false;
            player.yVelocity = 0;
        }
    } else {
        if (player.y + player.height > player.yGround) {
            player.y = player.yGround - player.height;
        }
    }

   
    player.height = player.isDucking ? player.duckHeight : player.normalHeight;
    if (!player.isJumping) {
        player.y = player.yGround - player.height;
    }

   
    let move = 0;
    if (leftPressed && player.x > player.minX) move = -6;
    if (rightPressed && player.x < player.maxX) move = 6;
    player.x += move;

    
    for (let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].type !== OBSTACLE_BOMB) {
            obstacles[i].x -= currentSpeed;
        }
        
        if (obstacles[i].type === OBSTACLE_BOMB) {
            obstacles[i].y += obstacles[i].ySpeed;
        }
        if (obstacles[i].x + obstacles[i].width < 0 || obstacles[i].y > gameCanvas.height || obstacles[i].y + obstacles[i].height < 0) {
            obstacles.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < bonuses.length; i++) {
        bonuses[i].x -= currentSpeed;
        if (bonuses[i].x + bonuses[i].width < 0) {
            bonuses.splice(i, 1);
            i--;
        }
    }

    jetX -= currentSpeed * 0.7;
    if (jetX + 60 < 0) jetX = gameCanvas.width + 50;

   
    if (frame - lastSpawnFrame > 55) {
        lastSpawnFrame = frame;
        let rand = Math.random();
        if (rand < 0.35) { 
            const origW = 55, origH = 45;
            const newW = Math.floor(origW * 0.7);
            const newH = Math.floor(origH * 0.7);
            obstacles.push({
                x: gameCanvas.width,
                y: player.yGround - newH + 5,
                width: newW,
                height: newH,
                type: OBSTACLE_VEHICLE
            });
        } else if (rand < 0.6) { 
            const leftX = 80 + Math.random() * 500; 
            obstacles.push({
                x: leftX,
                y: 60 + Math.random() * 120, 
                width: 30,
                height: 30,
                type: OBSTACLE_BOMB,
                ySpeed: 4 + Math.random() * 4  
            });
        } else if (rand < 0.85) { 
            bonuses.push({
                x: gameCanvas.width,
                y: player.yGround - 45,
                width: 45,
                height: 45,
                type: BONUS_OIL
            });
        }
    }

    // Collisions obstacles
    for (let obs of obstacles) {
        let pLeft = player.x + 10;
        let pRight = player.x + player.width - 10;
        let pTop = player.y + 15;
        let pBottom = player.y + player.height - 10;

        let oLeft = obs.x + 8;
        let oRight = obs.x + obs.width - 8;
        let oTop = obs.y + 8;
        let oBottom = obs.y + obs.height - 8;

        if (pRight > oLeft && pLeft < oRight && pBottom > oTop && pTop < oBottom) {
            gameOver();
            return;
        }
    }

    // Collisions bonus
    for (let i = 0; i < bonuses.length; i++) {
        let b = bonuses[i];
        if (player.x < b.x + b.width && player.x + player.width > b.x &&
            player.y < b.y + b.height && player.y + player.height > b.y) {
            score += 50;
            updateScoreDisplay();
            bonuses.splice(i, 1);
            i--;
        }
    }

    frame++;
}

function gameLoop() {
    if (!gameRunning) return;
    updateGame();
    draw();
    animationId = requestAnimationFrame(gameLoop);
}

function draw() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    player.yGround = gameCanvas.height - 70;
    ctx.fillStyle = '#5a3e1b';
    ctx.fillRect(0, player.yGround, gameCanvas.width, 12);
    ctx.fillStyle = '#8b5a2b';
    ctx.fillRect(0, player.yGround + 10, gameCanvas.width, 8);

    drawJet();
    drawObstacles();
    drawBonuses();
    drawPlayer();

    if (!gameRunning) {
        ctx.font = "bold 36px monospace";
        ctx.fillStyle = "darkred";
        ctx.fillText("GAME OVER", gameCanvas.width / 2 - 100, gameCanvas.height / 2 - 40);
        ctx.font = "24px monospace";
        ctx.fillStyle = "white";
        ctx.fillText("Click RESTART", gameCanvas.width / 2 - 70, gameCanvas.height / 2 + 20);
    }
}

function gameOver() {
    gameRunning = false;
    if (animationId) cancelAnimationFrame(animationId);
    document.getElementById('gameStatus').innerHTML = `Game Over! Score final: ${Math.floor(score)}`;
}

function handleKeyDown(e) {
    if (!gameRunning) return;
    const code = e.code;
    if (code === 'Space' || code === 'ArrowUp') {
        e.preventDefault();
        if (!player.isJumping && !player.isDucking) {
            player.isJumping = true;
            player.yVelocity = player.jumpPower;
        }
    } else if (code === 'ArrowDown') {
        e.preventDefault();
        if (!player.isJumping) player.isDucking = true;
    } else if (code === 'ArrowLeft' || code === 'KeyA') {
        leftPressed = true;
        e.preventDefault();
    } else if (code === 'ArrowRight' || code === 'KeyD') {
        rightPressed = true;
        e.preventDefault();
    }
}

function handleKeyUp(e) {
    const code = e.code;
    if (code === 'ArrowDown') {
        player.isDucking = false;
        if (!player.isJumping) player.y = player.yGround - player.height;
    } else if (code === 'ArrowLeft' || code === 'KeyA') {
        leftPressed = false;
    } else if (code === 'ArrowRight' || code === 'KeyD') {
        rightPressed = false;
    }
}

function handleCanvasClick() {
    if (!gameRunning) return;
    if (!player.isJumping && !player.isDucking) {
        player.isJumping = true;
        player.yVelocity = player.jumpPower;
    }
}

selectBtn.addEventListener('click', () => {
    if (player_selected) {
        document.getElementById('select_player').style.display = 'none';
        gameArea.style.display = 'block';
        player.yGround = gameCanvas.height - 70;
        player.y = player.yGround - player.height;
        startGame();
    } else {
        alert("Veuillez sélectionner un personnage.");
    }
});

restartBtn.addEventListener('click', () => {
    startGame();
    document.getElementById('gameStatus').innerHTML = '';
});

menuBtn.addEventListener('click', () => {
    gameRunning = false;
    if (animationId) cancelAnimationFrame(animationId);
    gameArea.style.display = 'none';
    document.getElementById('select_player').style.display = 'block';
    document.getElementById('gameStatus').innerHTML = '';
});

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
gameCanvas.addEventListener('click', handleCanvasClick);
