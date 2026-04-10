import Bowerman from './characters/Bowerman';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Zombie from './characters/Zombie';

// Демонстрация работы методов
const bowman = new Bowerman('Леголас');
console.log('=== Начальное состояние ===');
console.log(bowman);

console.log('\n=== Применяем урон 50 ===');
bowman.damage(50);
console.log(`Здоровье после урона: ${bowman.health}`);

console.log('\n=== Повышаем уровень ===');
bowman.levelUp();
console.log(`Уровень: ${bowman.level}`);
console.log(`Атака: ${bowman.attack}`);
console.log(`Защита: ${bowman.defence}`);
console.log(`Здоровье: ${bowman.health}`);

console.log('\n=== Попытка повысить уровень мертвого персонажа ===');
const deadCharacter = new Swordsman('Мертвый');
deadCharacter.damage(1000);
console.log(`Здоровье: ${deadCharacter.health}`);

try {
  deadCharacter.levelUp();
} catch (error) {
  console.error(`Ошибка: ${error.message}`);
}

// Создаем всех персонажей
const characters = [
  new Bowerman('Леголас'),
  new Swordsman('Арагорн'),
  new Magician('Гэндальф'),
  new Daemon('Азазель'),
  new Undead('Лич'),
  new Zombie('Ходячий'),
];

// Применяем урон к каждому
characters.forEach((character) => {
  character.damage(30);
});

// Повышаем уровень всем живым
characters.forEach((character) => {
  if (character.health > 0) {
    character.levelUp();
  }
});

// Отображение в HTML
const app = document.getElementById('app');
if (app) {
  app.innerHTML = `
    <h1>Персонажи после боя и повышения уровня</h1>
    <div style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
      ${characters.map((character) => `
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 15px; background: ${character.health > 0 ? '#e8f5e9' : '#ffebee'}">
          <h3>${character.name} (${character.type})</h3>
          <p><strong>❤️ Здоровье:</strong> ${character.health > 0 ? character.health.toFixed(1) : character.health}</p>
          <p><strong>⭐ Уровень:</strong> ${character.level}</p>
          <p><strong>⚔️ Атака:</strong> ${character.attack}</p>
          <p><strong>🛡️ Защита:</strong> ${character.defence}</p>
          ${character.health === 0 ? '<p style="color: red;">💀 Мертв</p>' : ''}
        </div>
      `).join('')}
    </div>
    <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
      <h3>Информация о методах:</h3>
      <ul>
        <li><strong>levelUp()</strong> - повышает уровень на 1, увеличивает атаку и защиту на 20%, восстанавливает здоровье до 100</li>
        <li><strong>damage(points)</strong> - наносит урон с учетом защиты: health -= points * (1 - defence/100)</li>
        <li><strong>Внимание:</strong> Нельзя повысить уровень мертвого персонажа (health = 0)</li>
      </ul>
    </div>
  `;
}