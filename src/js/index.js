import Bowerman from './characters/Bowerman';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Zombie from './characters/Zombie';

// Примеры создания персонажей
try {
  console.log('=== Создание персонажей ===\n');
  
  const bowman = new Bowerman('Леголас');
  console.log('Bowerman:', bowman);
  
  const swordsman = new Swordsman('Арагорн');
  console.log('Swordsman:', swordsman);
  
  const magician = new Magician('Гэндальф');
  console.log('Magician:', magician);
  
  const daemon = new Daemon('Азазель');
  console.log('Daemon:', daemon);
  
  const undead = new Undead('Лич');
  console.log('Undead:', undead);
  
  const zombie = new Zombie('Ходячий');
  console.log('Zombie:', zombie);
  
  console.log('\n=== Проверка валидации ===\n');
  
  // Ошибка: имя слишком короткое
  try {
    const invalidName = new Bowerman('A');
    console.log(invalidName);
  } catch (error) {
    console.error('Ошибка при создании с коротким именем:', error.message);
  }
  
  // Ошибка: имя слишком длинное
  try {
    const longName = new Bowerman('ОченьДлинноеИмя');
    console.log(longName);
  } catch (error) {
    console.error('Ошибка при создании с длинным именем:', error.message);
  }
  
  // Ошибка: имя не строка
  try {
    const notString = new Bowerman(123);
    console.log(notString);
  } catch (error) {
    console.error('Ошибка при создании с нестроковым именем:', error.message);
  }
  
} catch (error) {
  console.error('Ошибка:', error.message);
}

// Вывод информации для отображения на странице
const characters = [
  new Bowerman('Леголас'),
  new Swordsman('Арагорн'),
  new Magician('Гэндальф'),
  new Daemon('Азазель'),
  new Undead('Лич'),
  new Zombie('Ходячий')
];

// Создаем элемент для отображения в HTML
const app = document.getElementById('app');
if (app) {
  app.innerHTML = `
    <h1>Персонажи</h1>
    <div style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
      ${characters.map(char => `
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 15px; background: #f9f9f9;">
          <h3>${char.name} (${char.type})</h3>
          <p><strong>❤️ Здоровье:</strong> ${char.health}</p>
          <p><strong>⭐ Уровень:</strong> ${char.level}</p>
          <p><strong>⚔️ Атака:</strong> ${char.attack}</p>
          <p><strong>🛡️ Защита:</strong> ${char.defence}</p>
        </div>
      `).join('')}
    </div>
  `;
}