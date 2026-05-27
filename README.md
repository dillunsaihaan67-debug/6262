# 🛡️ Wave Defense - Team Tower Defense Game

A fun, single-player tower defense game where you manage a team of units to defend against incoming waves of enemies!

## 🎮 Game Overview

**Wave Defense** is a strategic tower defense game where:
- You recruit different types of units (Archer, Knight, Wizard, Sniper, Rainbow Sniper)
- Each unit has unique stats and abilities
- Defend your base from increasingly difficult enemy waves
- Earn gold from defeating enemies to recruit more units
- Survive as many waves as possible!
- **Goal**: Reach Wave 230!

## 🕹️ How to Play

### Starting the Game
1. Open `index.html` in your web browser
2. You start with **100 HP** and **100 Gold**
3. Click "Next Wave →" to begin wave 1

### Recruiting Units
1. Click a unit button on the right panel:
   - **🏹 Archer** (50 gold): Long-range, medium damage
   - **⚔️ Knight** (80 gold): Short-range, high damage, tank
   - **🧙 Wizard** (120 gold): Long-range, highest single-target damage
   - **🎯 Sniper** (100 gold): Extreme range, piercing shots
   - **🌈🎯 Rainbow Sniper** (250 gold): LEGENDARY! Rainbow burst, multi-shot
2. Click on the game canvas to place your unit
3. Units automatically attack enemies in range

### Managing Waves
- Enemies spawn from the right and move left
- If enemies reach the left edge, they damage your base (-HP)
- Defeat all enemies to complete the wave
- Each wave has more enemies and gives more gold rewards
- Higher waves = higher difficulty and higher rewards

## 📊 Unit Types & Classes

| Unit | Class | Cost | HP | DMG | Range | Fire Rate | Special Ability |
|------|-------|------|----|----|-------|-----------|------------------|
| 🏹 Archer | Ranged | 50 | 30 | 15 | 200 | 1.0/s | - |
| ⚔️ Knight | Tank | 80 | 60 | 20 | 50 | 0.8/s | - |
| 🧙 Wizard | Mage | 120 | 25 | 35 | 250 | 0.5/s | - |
| 🎯 Sniper | Sniper | 100 | 20 | 50 | 400 | 0.3/s | 🔫 Piercing Shots |
| 🌈🎯 Rainbow Sniper | Legend | 250 | 40 | 75 | 450 | 0.5/s | 🌈 Rainbow Burst (5-shot cone) |

### Unit Classes
- **Tank** - High HP, close range, tank damage
- **Ranged** - Medium range, balanced stats
- **Mage** - High damage, good range
- **Sniper** - Extreme range, piercing projectiles
- **Legend** - The ULTIMATE unit! Multi-shot rainbow burst ability!

## 👾 Enemy Types

| Enemy | HP | DMG | Speed | Reward |
|-------|----|----|-------|--------|
| 👹 Goblin | 20 | 5 | Fast | 10 gold |
| 👿 Orc | 40 | 10 | Med | 25 gold |
| 🐉 Dragon | 80 | 20 | Slow | 50 gold |

## 🌈 Rainbow Sniper - The Legendary Unit

**The Ultimate Unit!** 🎯✨

### Stats:
- **Cost**: 250 gold (most expensive)
- **HP**: 40
- **Damage**: 75 (highest!)
- **Range**: 450 (longest range!)
- **Fire Rate**: 0.5/s (medium speed)

### Special Ability: Rainbow Burst
- Shoots **5 projectiles in a cone** pattern
- Each shot can **pierce through enemies**
- Rainbow colored projectiles with special effects
- Perfect for crowd control and massive damage

### Strategy:
- Save up for the Rainbow Sniper in later waves
- Position strategically to maximize the cone spread
- Combine with other units for unstoppable defense
- The Rainbow Sniper can turn the tide of tough waves!

## 🎯 Strategy Tips

1. **Early Game**: Use Archers to handle goblins efficiently
2. **Economy**: Farm gold efficiently - sometimes it's better to place fewer, stronger units
3. **Placement**: Place units with overlapping ranges for better coverage
4. **Wave Planning**: Save gold between waves if possible
5. **Balance**: Mix unit types for better defense (Wizards for damage, Knights for tank)
6. **Sniper Power**: Use Snipers against single tough enemies (Dragons)
7. **Rainbow Domination**: Save up for Rainbow Snipers in high waves - they're game changers!

## 🏆 Goal: Wave 230

Reach Wave 230 to win! The game gets progressively harder with:
- More enemies per wave
- Stronger enemy types as waves increase
- More strategic unit placement needed
- Greater rewards for defeating enemies

Can you reach the ultimate wave? 🚀

## 🛠️ Technical Details

- **Framework**: Vanilla JavaScript (no dependencies)
- **Graphics**: HTML5 Canvas
- **Game Loop**: 60 FPS with requestAnimationFrame
- **Collision Detection**: Distance-based

## 📁 File Structure

```
6262/
├── index.html      # Main HTML structure
├── style.css       # Styling and layout
├── game.js         # Game logic and engine
└── README.md       # This file
```

## 🚀 How to Run

### Local (No Server Needed)
1. Download all files
2. Open `index.html` in any modern web browser
3. Play!

### GitHub Pages
1. Visit your repository's GitHub Pages URL
2. The game runs directly in your browser

## 📚 Learning Concepts

This game demonstrates:
- **Game Development**: Game loops, update/draw pattern
- **Object-Oriented Programming**: Classes for Units, Enemies, Projectiles
- **Collision Detection**: Distance-based calculations
- **State Management**: Tracking game state (health, gold, wave)
- **Event Handling**: Canvas clicks and button interactions
- **DOM Manipulation**: Updating UI displays
- **Canvas Graphics**: Drawing shapes, text, and visual effects
- **Game Balancing**: Unit costs, damage, and progression

## 🎨 Future Enhancement Ideas

- [ ] More legendary units
- [ ] Tower upgrades and special abilities
- [ ] Multiple paths for enemies
- [ ] More unit types and enemies
- [ ] Sound effects and music
- [ ] Difficulty levels
- [ ] Leaderboard/high scores
- [ ] Pause/resume functionality
- [ ] Settings menu
- [ ] Unit combining/fusion
- [ ] Boss waves
- [ ] Power-ups and bonuses

## 🎯 Challenge Yourself!

- **Easy**: Reach Wave 50
- **Medium**: Reach Wave 100
- **Hard**: Reach Wave 150
- **Expert**: Reach Wave 230 🏆

---

**Enjoy playing Wave Defense! 🛡️🎮**

*Made with ❤️ in JavaScript*