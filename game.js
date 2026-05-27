// Wave Defense Game - Team Tower Defense with Rainbow Sniper

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game State
const gameState = {
    health: 100,
    maxHealth: 100,
    gold: 100,
    score: 0,
    wave: 1,
    maxWave: 230,
    isWaveActive: false,
    selectedUnit: null,
    selectedCost: 0
};

// Game Objects
const units = [];
const enemies = [];
const projectiles = [];
const particles = [];

// Unit Definitions with Classes
const unitTypes = {
    archer: {
        class: 'Ranged',
        cost: 50,
        health: 30,
        damage: 15,
        range: 200,
        fireRate: 1,
        speed: 0,
        size: 8,
        emoji: '🏹',
        color: '#ffaa00'
    },
    knight: {
        class: 'Tank',
        cost: 80,
        health: 60,
        damage: 20,
        range: 50,
        fireRate: 0.8,
        speed: 0,
        size: 10,
        emoji: '⚔️',
        color: '#ff6666'
    },
    wizard: {
        class: 'Mage',
        cost: 120,
        health: 25,
        damage: 35,
        range: 250,
        fireRate: 0.5,
        speed: 0,
        size: 8,
        emoji: '🧙',
        color: '#6699ff'
    },
    sniper: {
        class: 'Sniper',
        cost: 100,
        health: 20,
        damage: 50,
        range: 400,
        fireRate: 0.3,
        speed: 0,
        size: 7,
        emoji: '🎯',
        color: '#ff00ff',
        specialAbility: 'piercing'
    },
    'rainbow-sniper': {
        class: 'Legend',
        cost: 250,
        health: 40,
        damage: 75,
        range: 450,
        fireRate: 0.5,
        speed: 0,
        size: 9,
        emoji: '🌈🎯',
        color: '#ff00ff',
        specialAbility: 'rainbow-burst'
    }
};

// Enemy Definitions
const enemyTypes = {
    goblin: {
        health: 20,
        damage: 5,
        speed: 2,
        size: 7,
        emoji: '👹',
        reward: 10
    },
    orc: {
        health: 40,
        damage: 10,
        speed: 1.5,
        size: 9,
        emoji: '👿',
        reward: 25
    },
    dragon: {
        health: 80,
        damage: 20,
        speed: 1,
        size: 12,
        emoji: '🐉',
        reward: 50
    }
};

// Unit Class
class Unit {
    constructor(x, y, type) {
        const config = unitTypes[type];
        this.x = x;
        this.y = y;
        this.type = type;
        this.class = config.class;
        this.health = config.health;
        this.maxHealth = config.health;
        this.damage = config.damage;
        this.range = config.range;
        this.fireRate = config.fireRate;
        this.lastShot = 0;
        this.size = config.size;
        this.color = config.color;
        this.emoji = config.emoji;
        this.target = null;
        this.specialAbility = config.specialAbility || null;
    }

    update() {
        // Find closest enemy in range
        let closestEnemy = null;
        let closestDist = this.range;

        enemies.forEach(enemy => {
            const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
            if (dist < closestDist) {
                closestDist = dist;
                closestEnemy = enemy;
            }
        });

        this.target = closestEnemy;

        // Shoot at target
        if (this.target && Date.now() - this.lastShot > 1000 / this.fireRate) {
            this.shoot();
            this.lastShot = Date.now();
        }
    }

    shoot() {
        if (!this.target) return;
        
        if (this.specialAbility === 'rainbow-burst') {
            // Rainbow Sniper shoots burst of 5 projectiles in a cone
            const angles = [-0.3, -0.15, 0, 0.15, 0.3];
            angles.forEach(angle => {
                const baseAngle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
                const newAngle = baseAngle + angle;
                const targetX = this.x + Math.cos(newAngle) * this.range;
                const targetY = this.y + Math.sin(newAngle) * this.range;
                
                const proj = new Projectile(
                    this.x,
                    this.y,
                    targetX,
                    targetY,
                    this.damage,
                    this.type,
                    this.specialAbility
                );
                projectiles.push(proj);
            });
        } else {
            const proj = new Projectile(
                this.x,
                this.y,
                this.target.x,
                this.target.y,
                this.damage,
                this.type,
                this.specialAbility
            );
            projectiles.push(proj);
        }
    }

    draw() {
        // Unit circle
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Rainbow effect for Rainbow Sniper
        if (this.type === 'rainbow-sniper') {
            ctx.strokeStyle = '#ff00ff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + 3, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + 6, 0, Math.PI * 2);
            ctx.stroke();
        } else {
            // Class indicator (border)
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + 2, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Health bar
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = healthPercent > 0.5 ? '#00ff00' : healthPercent > 0.25 ? '#ffff00' : '#ff0000';
        ctx.fillRect(this.x - this.size, this.y - this.size - 8, this.size * 2 * healthPercent, 3);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x - this.size, this.y - this.size - 8, this.size * 2, 3);

        // Range indicator when selected
        if (this.target) {
            ctx.strokeStyle = this.type === 'rainbow-sniper' ? 'rgba(255, 0, 255, 0.3)' : 'rgba(0, 255, 0, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Class label
        ctx.fillStyle = '#fff';
        ctx.font = '9px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.class, this.x, this.y - this.size - 14);
    }
}

// Enemy Class
class Enemy {
    constructor(type) {
        const config = enemyTypes[type];
        this.type = type;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - 60) + 30;
        this.health = config.health;
        this.maxHealth = config.health;
        this.damage = config.damage;
        this.speed = config.speed;
        this.size = config.size;
        this.reward = config.reward;
        this.emoji = config.emoji;
    }

    update() {
        this.x -= this.speed;
    }

    draw() {
        // Enemy circle
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Health bar
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = healthPercent > 0.5 ? '#00ff00' : '#ffff00';
        ctx.fillRect(this.x - this.size, this.y - this.size - 8, this.size * 2 * healthPercent, 3);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x - this.size, this.y - this.size - 8, this.size * 2, 3);
    }
}

// Projectile Class
class Projectile {
    constructor(x, y, targetX, targetY, damage, unitType, specialAbility = null) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.unitType = unitType;
        this.specialAbility = specialAbility;
        this.speed = unitType === 'rainbow-sniper' ? 9 : unitType === 'sniper' ? 8 : 5;
        const dist = Math.hypot(targetX - x, targetY - y);
        this.vx = ((targetX - x) / dist) * this.speed;
        this.vy = ((targetY - y) / dist) * this.speed;
        this.range = 300;
        this.distTraveled = 0;
        this.hitEnemies = [];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.distTraveled += this.speed;
    }

    draw() {
        if (this.unitType === 'rainbow-sniper') {
            // Rainbow colors
            const colors = ['#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff'];
            const colorIndex = Math.floor((this.distTraveled / 50) % colors.length);
            ctx.fillStyle = colors[colorIndex];
            ctx.shadowColor = colors[colorIndex];
            ctx.shadowBlur = 10;
        } else if (this.unitType === 'wizard') {
            ctx.fillStyle = '#6699ff';
        } else if (this.unitType === 'sniper') {
            ctx.fillStyle = '#ff00ff';
            ctx.globalAlpha = 0.8;
        } else {
            ctx.fillStyle = '#ffff00';
        }
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.unitType === 'rainbow-sniper' ? 5 : 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowColor = 'transparent';
    }
}

// Spawn enemies based on wave
function spawnWave(waveNum) {
    const enemyCount = 5 + waveNum * 2;
    const types = Object.keys(enemyTypes);
    
    for (let i = 0; i < enemyCount; i++) {
        setTimeout(() => {
            if (gameState.isWaveActive) {
                const typeIndex = Math.min(Math.floor(waveNum / 50), types.length - 1);
                enemies.push(new Enemy(types[typeIndex]));
            }
        }, i * 500);
    }
}

// Update game
function update() {
    // Update units
    units.forEach(unit => unit.update());

    // Update enemies
    enemies.forEach((enemy, index) => {
        enemy.update();
        if (enemy.x < 0) {
            enemies.splice(index, 1);
            gameState.health -= enemy.damage;
            updateDisplay();
        }
    });

    // Update projectiles and check collisions
    projectiles.forEach((proj, projIndex) => {
        proj.update();
        if (proj.distTraveled > proj.range) {
            projectiles.splice(projIndex, 1);
            return;
        }

        enemies.forEach((enemy, enemyIndex) => {
            const dist = Math.hypot(enemy.x - proj.x, enemy.y - proj.y);
            if (dist < enemy.size + 3 && !proj.hitEnemies.includes(enemy)) {
                enemy.health -= proj.damage;
                createParticles(proj.x, proj.y);
                proj.hitEnemies.push(enemy);

                // Remove projectile if not piercing or rainbow burst
                if (!proj.specialAbility || (proj.specialAbility !== 'piercing' && proj.specialAbility !== 'rainbow-burst')) {
                    projectiles.splice(projIndex, 1);
                }

                if (enemy.health <= 0) {
                    gameState.gold += enemy.reward;
                    gameState.score += enemy.reward * gameState.wave;
                    enemies.splice(enemyIndex, 1);
                    updateDisplay();
                }
            }
        });
    });

    // Check if wave is complete
    if (gameState.isWaveActive && enemies.length === 0 && gameState.wave > 1) {
        gameState.isWaveActive = false;
        if (gameState.wave >= gameState.maxWave) {
            document.getElementById('waveStatus').textContent = '🎉 YOU WON! Max wave reached!';
        } else {
            document.getElementById('waveStatus').textContent = 'Wave complete! Next wave ready';
        }
    }

    // Check game over
    if (gameState.health <= 0) {
        gameOver();
    }
}

// Draw game
function draw() {
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // Draw units
    units.forEach(unit => unit.draw());

    // Draw enemies
    enemies.forEach(enemy => enemy.draw());

    // Draw projectiles
    projectiles.forEach(proj => proj.draw());

    // Draw particles
    particles.forEach((p, i) => {
        ctx.fillStyle = `rgba(255, 255, 0, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        if (p.life <= 0) particles.splice(i, 1);
    });

    // Draw UI info
    ctx.fillStyle = '#00ff00';
    ctx.font = '14px Arial';
    if (gameState.selectedUnit) {
        const unitClass = unitTypes[gameState.selectedUnit].class;
        ctx.fillText(`Selected: ${gameState.selectedUnit} [${unitClass}] (${gameState.selectedCost} gold)`, 10, 20);
    }
}

// Create particles on hit
function createParticles(x, y) {
    for (let i = 0; i < 5; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            size: Math.random() * 3 + 1,
            life: 1
        });
    }
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Canvas click handler
canvas.addEventListener('click', (e) => {
    if (!gameState.selectedUnit) return;
    if (gameState.gold < gameState.selectedCost) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    units.push(new Unit(x, y, gameState.selectedUnit));
    gameState.gold -= gameState.selectedCost;
    updateDisplay();
});

// Unit button handlers
document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        gameState.selectedUnit = btn.dataset.unit;
        gameState.selectedCost = parseInt(btn.dataset.cost);
    });
});

// Next wave button
document.getElementById('nextWaveBtn').addEventListener('click', () => {
    if (!gameState.isWaveActive && gameState.wave < gameState.maxWave) {
        gameState.isWaveActive = true;
        gameState.wave++;
        document.getElementById('waveStatus').textContent = 'Wave in progress...';
        spawnWave(gameState.wave);
        updateDisplay();
    } else if (gameState.wave >= gameState.maxWave && !gameState.isWaveActive) {
        document.getElementById('waveStatus').textContent = 'Max wave reached! You won!';
    }
});

// Update display
function updateDisplay() {
    document.getElementById('healthDisplay').textContent = Math.max(0, gameState.health);
    document.getElementById('goldDisplay').textContent = gameState.gold;
    document.getElementById('waveDisplay').textContent = gameState.wave + ' / ' + gameState.maxWave;
    document.getElementById('scoreDisplay').textContent = gameState.score;
}

// Game over
function gameOver() {
    gameState.isWaveActive = false;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
    ctx.font = '24px Arial';
    ctx.fillStyle = '#ffff00';
    ctx.fillText(`Final Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText(`Wave Reached: ${gameState.wave} / ${gameState.maxWave}`, canvas.width / 2, canvas.height / 2 + 60);
}

// Start game
updateDisplay();
spawnWave(1);
gameState.isWaveActive = true;
gameLoop();