// --- CONFIG & MAP ---
const mapWidth = 20;
const mapHeight = 20;
const tileSize = 32;

// 1: wall, 0: floor
const mapTiles = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
  1,0,0,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,
  1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,1,
  1,0,1,0,0,0,1,0,1,1,1,0,1,0,1,1,0,1,0,1,
  1,0,1,1,1,1,1,0,0,0,1,0,1,0,1,0,0,1,0,1,
  1,0,0,0,0,0,1,1,1,0,1,0,1,0,1,1,1,1,0,1,
  1,1,1,1,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,1,
  1,0,0,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,
  1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,1,0,1,
  1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,0,1,0,1,
  1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,1,0,1,
  1,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,1,
  1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

const initialEntities = [
  { id: 'e1', type: 'enemy', x: 5, y: 11, hp: 10, maxHp: 10, name: 'Goblin', defeated: false },
  { id: 'e2', type: 'enemy', x: 15, y: 4, hp: 15, maxHp: 15, name: 'Orc', defeated: false },
  { id: 'e3', type: 'enemy', x: 11, y: 14, hp: 8, maxHp: 8, name: 'Slime', defeated: false },
  { id: 'c1', type: 'chest', x: 17, y: 18, contains: [{ id: 'Gold', qty: 50 }, { id: 'Health Potion', qty: 2 }], opened: false },
  { id: 'd1', type: 'door', x: 9, y: 3, opened: false }
];

const COLORS = {
  FLOOR: "#2d3561",
  WALL: "#16213e",
  WALL_OUTLINE: "#0f1626",
  PLAYER: "#4ecdc4",
  NPC: "#ffe66d",
  ENEMY: "#ff6b6b",
  CHEST: "#f7b801",
  DOOR: "#8b4513",
  DOOR_OPEN: "#654321",
  UI_BG: "rgba(0, 0, 0, 0.8)",
  TEXT: "#ffffff"
};

const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

// --- STATE ---
let state = {
  screen: 'start',
  player: {
    x: 1, y: 1,
    px: 1 * tileSize, py: 1 * tileSize,
    stats: { hp: 20, maxHp: 20, str: 14, dex: 12, con: 14, xp: 0, level: 1 },
    inventory: [],
    coins: 0
  },
  camera: { px: 0, py: 0 },
  entities: JSON.parse(JSON.stringify(initialEntities)),
  messages: [],
  combatModal: null
};

// --- AUDIO ENGINE ---
let audioCtx = null;
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playSound(type) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;
  if (type === 'hit') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'chest') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(800, now + 0.1);
    osc.frequency.linearRampToValueAtTime(1200, now + 0.2);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'step') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(80, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.05);
  } else if (type === 'error') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, now);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  }
}

// --- SAVE / LOAD ---
function saveGame() {
  localStorage.setItem('amodule-dnd-save', JSON.stringify(state));
}
function loadGame() {
  const saved = localStorage.getItem('amodule-dnd-save');
  if (saved) {
    try {
      state = JSON.parse(saved);
      state.screen = 'game';
      return true;
    } catch(e) { console.error("Save corrupted"); }
  }
  return false;
}

// --- GAME LOGIC ---
function addMessage(msg) {
  state.messages.push(msg);
  if (state.messages.length > 5) state.messages.shift();
}

function rollD20() { return Math.floor(Math.random() * 20) + 1; }
function getModifier(score) { return Math.floor((score - 10) / 2); }

function tryMove(dx, dy) {
  if (state.combatModal) return;
  const nx = state.player.x + dx;
  const ny = state.player.y + dy;
  if (nx < 0 || nx >= mapWidth || ny < 0 || ny >= mapHeight) {
    playSound('error');
    return;
  }
  if (mapTiles[ny * mapWidth + nx] === 1) {
    playSound('error');
    return;
  }

  const entity = state.entities.find(e => e.x === nx && e.y === ny);
  if (entity) {
    if (entity.type === 'enemy' && !entity.defeated) { playSound('error'); return; }
    if (entity.type === 'door' && !entity.opened) { playSound('error'); return; }
    if (entity.type === 'chest' && !entity.opened) { playSound('error'); return; }
  }

  state.player.x = nx;
  state.player.y = ny;
  playSound('step');
  saveGame();
}

function interact() {
  if (state.combatModal) return;
  const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
  for (let [dx, dy] of dirs) {
    const tx = state.player.x + dx;
    const ty = state.player.y + dy;
    const entity = state.entities.find(e => e.x === tx && e.y === ty);
    if (entity) {
      if (entity.type === 'chest' && !entity.opened) {
        entity.opened = true;
        playSound('chest');
        let txt = "Opened chest!";
        entity.contains.forEach(item => {
          if (item.id === 'Gold') state.player.coins += item.qty;
          else {
            const ext = state.player.inventory.find(i => i.id === item.id);
            if (ext) ext.qty += item.qty;
            else state.player.inventory.push({...item});
          }
          txt += ` Found ${item.qty} ${item.id}.`;
        });
        addMessage(txt);
        saveGame();
        return;
      }
      if (entity.type === 'door' && !entity.opened) {
        entity.opened = true;
        playSound('chest');
        addMessage("Opened door.");
        saveGame();
        return;
      }
      if (entity.type === 'enemy' && !entity.defeated) {
        startCombat(entity);
        return;
      }
    }
  }
  addMessage("Nothing to interact with.");
}

function startCombat(enemy) {
  state.combatModal = {
    enemyId: enemy.id,
    enemyName: enemy.name,
    enemyHp: enemy.hp,
    enemyMaxHp: enemy.maxHp,
    log: []
  };
  logCombat(`You encountered a ${enemy.name}!`);
}

function logCombat(msg) {
  if (state.combatModal) {
    state.combatModal.log.push(msg);
    if (state.combatModal.log.length > 6) state.combatModal.log.shift();
  }
}

function combatAttack() {
  if (!state.combatModal) return;
  
  const hitRoll = rollD20();
  const strMod = getModifier(state.player.stats.str);
  
  if (hitRoll === 1) {
    logCombat(`Critical miss!`);
  } else if (hitRoll === 20) {
    playSound('hit');
    const dmg = 8 + strMod * 2;
    state.combatModal.enemyHp -= dmg;
    logCombat(`CRITICAL HIT! You deal ${dmg} damage!`);
  } else {
    playSound('hit');
    const dmg = Math.max(1, Math.floor(Math.random() * 6) + 1 + strMod);
    state.combatModal.enemyHp -= dmg;
    logCombat(`You attack for ${dmg} damage.`);
  }

  if (state.combatModal.enemyHp <= 0) {
    playSound('chest');
    const enemy = state.entities.find(e => e.id === state.combatModal.enemyId);
    enemy.defeated = true;
    const xpGain = 25;
    state.player.stats.xp += xpGain;
    state.combatModal = null;
    addMessage(`Defeated ${enemy.name}! Gained ${xpGain} XP.`);
    saveGame();
    return;
  }

  setTimeout(() => {
    if (!state.combatModal) return;
    const eHitRoll = rollD20();
    if (eHitRoll > 10) {
      playSound('hit');
      const eDmg = Math.max(1, Math.floor(Math.random() * 4) + 1);
      state.player.stats.hp -= eDmg;
      logCombat(`${state.combatModal.enemyName} hits you for ${eDmg}!`);
      if (state.player.stats.hp <= 0) {
        logCombat("YOU HAVE DIED.");
        setTimeout(() => { localStorage.removeItem('amodule-dnd-save'); location.reload(); }, 2000);
      }
    } else {
      logCombat(`${state.combatModal.enemyName} missed!`);
    }
  }, 500);
}

function combatFlee() {
  if (!state.combatModal) return;
  const roll = rollD20();
  if (roll > 10) {
    addMessage("You successfully fled.");
    state.combatModal = null;
  } else {
    logCombat("Failed to flee!");
    setTimeout(() => {
      if (!state.combatModal) return;
      playSound('hit');
      const eDmg = Math.max(1, Math.floor(Math.random() * 4) + 1);
      state.player.stats.hp -= eDmg;
      logCombat(`The enemy hits you for ${eDmg} as you try to run!`);
      if (state.player.stats.hp <= 0) setTimeout(() => { localStorage.removeItem('amodule-dnd-save'); location.reload(); }, 2000);
    }, 500);
  }
}

// --- INPUT ---
window.addEventListener('keydown', (e) => {
  if (state.screen !== 'game') return;
  
  if (state.combatModal) {
    if (e.key === '1') combatAttack();
    if (e.key === '2') combatFlee();
    return;
  }

  if (e.key === 'w' || e.key === 'ArrowUp') tryMove(0, -1);
  if (e.key === 's' || e.key === 'ArrowDown') tryMove(0, 1);
  if (e.key === 'a' || e.key === 'ArrowLeft') tryMove(-1, 0);
  if (e.key === 'd' || e.key === 'ArrowRight') tryMove(1, 0);
  if (e.key === ' ') interact();
});

// --- RENDER ---
let canvas, ctx, width, height;

function drawMap() {
  const startX = Math.max(0, Math.floor(state.camera.px / tileSize));
  const startY = Math.max(0, Math.floor(state.camera.py / tileSize));
  const endX = Math.min(mapWidth, startX + Math.ceil(width / tileSize) + 1);
  const endY = Math.min(mapHeight, startY + Math.ceil(height / tileSize) + 1);

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const tile = mapTiles[y * mapWidth + x];
      const screenX = Math.floor(x * tileSize - state.camera.px);
      const screenY = Math.floor(y * tileSize - state.camera.py);
      
      if (tile === 0) {
        ctx.fillStyle = COLORS.FLOOR;
        ctx.fillRect(screenX, screenY, tileSize, tileSize);
      } else {
        ctx.fillStyle = COLORS.WALL;
        ctx.fillRect(screenX, screenY, tileSize, tileSize);
        ctx.strokeStyle = COLORS.WALL_OUTLINE;
        ctx.strokeRect(screenX, screenY, tileSize, tileSize);
      }
    }
  }
}

function drawEntities() {
  state.entities.forEach(ent => {
    if (ent.type === 'enemy' && ent.defeated) return;
    
    const screenX = Math.floor(ent.x * tileSize - state.camera.px);
    const screenY = Math.floor(ent.y * tileSize - state.camera.py);
    
    let color, symbol;
    if (ent.type === 'enemy') { color = COLORS.ENEMY; symbol = '!'; }
    if (ent.type === 'chest') { color = COLORS.CHEST; symbol = ent.opened ? '_' : '='; }
    if (ent.type === 'door') { color = ent.opened ? COLORS.DOOR_OPEN : COLORS.DOOR; symbol = ent.opened ? '/' : '+'; }

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(screenX + tileSize/2, screenY + tileSize/2, tileSize/2 - 4, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = COLORS.TEXT;
    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(symbol, screenX + tileSize/2, screenY + tileSize/2);
  });
}

function drawPlayer() {
  const screenX = Math.floor(state.player.px - state.camera.px);
  const screenY = Math.floor(state.player.py - state.camera.py);
  
  ctx.fillStyle = COLORS.PLAYER;
  ctx.beginPath();
  ctx.arc(screenX + tileSize/2, screenY + tileSize/2, tileSize/2 - 2, 0, Math.PI*2);
  ctx.fill();

  ctx.fillStyle = COLORS.TEXT;
  ctx.font = "bold 16px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("@", screenX + tileSize/2, screenY + tileSize/2 + 1);
}

function drawUI() {
  ctx.fillStyle = COLORS.UI_BG;
  ctx.fillRect(0, 0, width, 40);
  
  ctx.fillStyle = COLORS.TEXT;
  ctx.font = "14px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  
  const stats = state.player.stats;
  ctx.fillText(`HP: ${stats.hp}/${stats.maxHp}   |   STR: ${stats.str} DEX: ${stats.dex} CON: ${stats.con}   |   XP: ${stats.xp}   |   Coins: ${state.player.coins}`, 10, 20);

  ctx.fillStyle = COLORS.UI_BG;
  ctx.fillRect(0, height - 120, Math.min(width, 400), 120);
  state.messages.forEach((msg, i) => {
    ctx.fillText(msg, 10, height - 100 + i * 20);
  });
}

function drawCombatModal() {
  if (!state.combatModal) return;
  const cw = 400;
  const ch = 300;
  const cx = width / 2 - cw / 2;
  const cy = height / 2 - ch / 2;

  ctx.fillStyle = "rgba(0,0,0,0.9)";
  ctx.fillRect(cx, cy, cw, ch);
  ctx.strokeStyle = COLORS.TEXT;
  ctx.strokeRect(cx, cy, cw, ch);

  ctx.fillStyle = COLORS.TEXT;
  ctx.textAlign = "center";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText(`Combat: ${state.combatModal.enemyName}`, width/2, cy + 30);
  ctx.font = "16px sans-serif";
  ctx.fillText(`Enemy HP: ${state.combatModal.enemyHp} / ${state.combatModal.enemyMaxHp}`, width/2, cy + 60);

  ctx.textAlign = "left";
  ctx.font = "14px monospace";
  state.combatModal.log.forEach((log, i) => {
    ctx.fillText(log, cx + 20, cy + 100 + i * 20);
  });

  ctx.textAlign = "center";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText("[1] Attack      [2] Flee", width/2, cy + ch - 30);
}

function gameLoop() {
  if (state.screen === 'game') {
    state.player.px = lerp(state.player.px, state.player.x * tileSize, 0.2);
    state.player.py = lerp(state.player.py, state.player.y * tileSize, 0.2);

    const targetCamX = state.player.px - width / 2 + tileSize / 2;
    const targetCamY = state.player.py - height / 2 + tileSize / 2;
    state.camera.px = lerp(state.camera.px, targetCamX, 0.1);
    state.camera.py = lerp(state.camera.py, targetCamY, 0.1);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    drawMap();
    drawEntities();
    drawPlayer();
    drawUI();
    drawCombatModal();
  }

  requestAnimationFrame(gameLoop);
}

window.onload = () => {
  const startScreen = document.getElementById('start-screen');
  const gameScreen = document.getElementById('game-screen');
  const btnNewGame = document.getElementById('btn-new-game');
  const btnContinue = document.getElementById('btn-continue');

  if (localStorage.getItem('amodule-dnd-save')) {
    btnContinue.disabled = false;
  }

  btnNewGame.onclick = () => {
    initAudio();
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    state.screen = 'game';
    addMessage("Welcome to the dungeon.");
  };

  btnContinue.onclick = () => {
    if (loadGame()) {
      initAudio();
      startScreen.classList.add('hidden');
      gameScreen.classList.remove('hidden');
      addMessage("Game loaded.");
    }
  };

  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  
  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };
  window.addEventListener('resize', resize);
  resize();

  requestAnimationFrame(gameLoop);
};
