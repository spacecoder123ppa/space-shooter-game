const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ship = { x: 220, y: 580, width: 40, height: 20 };
let bullets = [];
let enemies = [];

document.addEventListener("keydown", moveShip);
document.addEventListener("keydown", shoot);

function moveShip(e) {
  if (e.key === "ArrowLeft") ship.x -= 20;
  if (e.key === "ArrowRight") ship.x += 20;
}

function shoot(e) {
  if (e.code === "Space") {
    bullets.push({ x: ship.x + 18, y: ship.y });
  }
}

function createEnemies() {
  for (let i = 0; i < 5; i++) {
    enemies.push({ x: 60 * i + 30, y: 30, width: 30, height: 20 });
  }
}

function drawShip() {
  ctx.fillStyle = "white";
  ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

function drawBullets() {
  ctx.fillStyle = "red";
  bullets.forEach((b, i) => {
    b.y -= 5;
    ctx.fillRect(b.x, b.y, 4, 10);
    if (b.y < 0) bullets.splice(i, 1);
  });
}

function drawEnemies() {
  ctx.fillStyle = "green";
  enemies.forEach((e, ei) => {
    ctx.fillRect(e.x, e.y, e.width, e.height);
    bullets.forEach((b, bi) => {
      if (
        b.x < e.x + e.width &&
        b.x + 4 > e.x &&
        b.y < e.y + e.height &&
        b.y + 10 > e.y
      ) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
      }
    });
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  drawBullets();
  drawEnemies();
  requestAnimationFrame(gameLoop);
}

createEnemies();
gameLoop();
