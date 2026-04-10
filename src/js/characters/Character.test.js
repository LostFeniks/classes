import Character from './Character';
import Bowerman from './Bowerman';
import Swordsman from './Swordsman';
import Magician from './Magician';
import Daemon from './Daemon';
import Undead from './Undead';
import Zombie from './Zombie';

describe('Character Class', () => {
  describe('Конструктор и валидация', () => {
    test('должен создавать персонажа с корректными параметрами', () => {
      const char = new Character('Hero', 'Bowman');
      expect(char.name).toBe('Hero');
      expect(char.type).toBe('Bowman');
      expect(char.health).toBe(100);
      expect(char.level).toBe(1);
      expect(char.attack).toBe(0);
      expect(char.defence).toBe(0);
    });

    test('должен выбрасывать ошибку при имени короче 2 символов', () => {
      expect(() => new Character('A', 'Bowman')).toThrow('Имя должно быть строкой длиной от 2 до 10 символов');
    });

    test('должен выбрасывать ошибку при имени длиннее 10 символов', () => {
      expect(() => new Character('VeryLongName', 'Bowman')).toThrow('Имя должно быть строкой длиной от 2 до 10 символов');
    });

    test('должен выбрасывать ошибку при нестроковом имени', () => {
      expect(() => new Character(123, 'Bowman')).toThrow('Имя должно быть строкой длиной от 2 до 10 символов');
    });

    test('должен выбрасывать ошибку при невалидном типе', () => {
      expect(() => new Character('Hero', 'InvalidType')).toThrow('Тип должен быть одним из: Bowman, Swordsman, Magician, Daemon, Undead, Zombie');
    });
  });

  describe('Метод levelUp', () => {
    let character;

    beforeEach(() => {
      character = new Character('Hero', 'Bowman');
      character.attack = 25;
      character.defence = 25;
    });

    test('должен повышать уровень, атаку, защиту и восстанавливать здоровье', () => {
      character.levelUp();

      expect(character.level).toBe(2);
      expect(character.attack).toBe(30);
      expect(character.defence).toBe(30);
      expect(character.health).toBe(100);
    });

    test('должен округлять значения атаки и защиты', () => {
      character.attack = 33;
      character.defence = 33;
      character.levelUp();

      expect(character.attack).toBe(40);
      expect(character.defence).toBe(40);
    });

    test('должен выбрасывать ошибку при попытке повысить уровень мертвого персонажа', () => {
      character.health = 0;

      expect(() => character.levelUp()).toThrow('Нельзя повысить левел умершего персонажа');
    });

    test('не должен менять характеристики мертвого персонажа при вызове levelUp', () => {
      character.health = 0;
      const originalLevel = character.level;
      const originalAttack = character.attack;
      const originalDefence = character.defence;

      try {
        character.levelUp();
      } catch (error) {
        // Ожидаем ошибку
      }

      expect(character.level).toBe(originalLevel);
      expect(character.attack).toBe(originalAttack);
      expect(character.defence).toBe(originalDefence);
      expect(character.health).toBe(0);
    });
  });

  describe('Метод damage', () => {
    let character;

    beforeEach(() => {
      character = new Character('Hero', 'Bowman');
      character.defence = 25;
      character.health = 100;
    });

    test('должен правильно рассчитывать урон с учетом защиты', () => {
      character.damage(50);
      expect(character.health).toBe(62.5);
    });

    test('здоровье не должно становиться меньше 0', () => {
      character.defence = 0;
      character.damage(200);
      expect(character.health).toBe(0);
    });

    test('при здоровье 0 урон не должен применяться', () => {
      character.health = 0;
      character.damage(50);
      expect(character.health).toBe(0);
    });

    test('при здоровье меньше 0 урон не должен применяться', () => {
      character.health = -10;
      character.damage(50);
      expect(character.health).toBe(-10);
    });

    test('защита 100% должна полностью блокировать урон', () => {
      character.defence = 100;
      character.damage(100);
      expect(character.health).toBe(100);
    });

    test('защита 0% не должна уменьшать урон', () => {
      character.defence = 0;
      character.damage(50);
      expect(character.health).toBe(50);
    });

    test('должен корректно работать с дробными значениями урона', () => {
      character.defence = 30;
      character.damage(33.3);
      expect(character.health).toBe(76.69);
    });
  });
});

describe('Дочерние классы', () => {
  describe('Bowerman', () => {
    test('должен создаваться с правильными характеристиками', () => {
      const bowman = new Bowerman('Legolas');
      expect(bowman.name).toBe('Legolas');
      expect(bowman.type).toBe('Bowman');
      expect(bowman.attack).toBe(25);
      expect(bowman.defence).toBe(25);
      expect(bowman.health).toBe(100);
      expect(bowman.level).toBe(1);
    });

    test('должен корректно повышать уровень', () => {
      const bowman = new Bowerman('Legolas');
      bowman.levelUp();

      expect(bowman.level).toBe(2);
      expect(bowman.attack).toBe(30);
      expect(bowman.defence).toBe(30);
      expect(bowman.health).toBe(100);
    });

    test('должен корректно получать урон', () => {
      const bowman = new Bowerman('Legolas');
      bowman.damage(50);
      expect(bowman.health).toBe(62.5);
    });
  });

  describe('Swordsman', () => {
    test('должен создаваться с правильными характеристиками', () => {
      const swordsman = new Swordsman('Aragorn');
      expect(swordsman.name).toBe('Aragorn');
      expect(swordsman.type).toBe('Swordsman');
      expect(swordsman.attack).toBe(40);
      expect(swordsman.defence).toBe(10);
    });

    test('должен корректно повышать уровень', () => {
      const swordsman = new Swordsman('Aragorn');
      swordsman.levelUp();

      expect(swordsman.level).toBe(2);
      expect(swordsman.attack).toBe(48);
      expect(swordsman.defence).toBe(12);
    });

    test('должен корректно получать урон', () => {
      const swordsman = new Swordsman('Aragorn');
      swordsman.damage(50);
      expect(swordsman.health).toBe(55);
    });
  });

  describe('Magician', () => {
    test('должен создаваться с правильными характеристиками', () => {
      const magician = new Magician('Gandalf');
      expect(magician.name).toBe('Gandalf');
      expect(magician.type).toBe('Magician');
      expect(magician.attack).toBe(10);
      expect(magician.defence).toBe(40);
    });

    test('должен корректно повышать уровень', () => {
      const magician = new Magician('Gandalf');
      magician.levelUp();

      expect(magician.level).toBe(2);
      expect(magician.attack).toBe(12);
      expect(magician.defence).toBe(48);
    });

    test('должен корректно получать урон', () => {
      const magician = new Magician('Gandalf');
      magician.damage(50);
      expect(magician.health).toBe(70);
    });
  });

  describe('Daemon', () => {
    test('должен создаваться с правильными характеристиками', () => {
      const daemon = new Daemon('Azazel');
      expect(daemon.name).toBe('Azazel');
      expect(daemon.type).toBe('Daemon');
      expect(daemon.attack).toBe(10);
      expect(daemon.defence).toBe(40);
    });

    test('должен корректно повышать уровень', () => {
      const daemon = new Daemon('Azazel');
      daemon.levelUp();

      expect(daemon.level).toBe(2);
      expect(daemon.attack).toBe(12);
      expect(daemon.defence).toBe(48);
    });
  });

  describe('Undead', () => {
    test('должен создаваться с правильными характеристиками', () => {
      const undead = new Undead('Lich');
      expect(undead.name).toBe('Lich');
      expect(undead.type).toBe('Undead');
      expect(undead.attack).toBe(25);
      expect(undead.defence).toBe(25);
    });
  });

  describe('Zombie', () => {
    test('должен создаваться с правильными характеристиками', () => {
      const zombie = new Zombie('Walker');
      expect(zombie.name).toBe('Walker');
      expect(zombie.type).toBe('Zombie');
      expect(zombie.attack).toBe(40);
      expect(zombie.defence).toBe(10);
    });
  });
});

describe('Интеграционные тесты', () => {
  test('персонаж может получить урон и затем повысить уровень', () => {
    const bowman = new Bowerman('Legolas');
    bowman.damage(30);
    expect(bowman.health).toBe(77.5);

    bowman.levelUp();
    expect(bowman.level).toBe(2);
    expect(bowman.attack).toBe(30);
    expect(bowman.defence).toBe(30);
    expect(bowman.health).toBe(100);
  });

  test('персонаж не может повысить уровень после смерти', () => {
    const swordsman = new Swordsman('Aragorn');
    swordsman.damage(200);
    expect(swordsman.health).toBe(0);

    expect(() => swordsman.levelUp()).toThrow('Нельзя повысить левел умершего персонажа');
  });

  test('несколько ударов подряд', () => {
    const magician = new Magician('Gandalf');
    magician.damage(20);
    magician.damage(30);
    magician.damage(25);

    expect(magician.health).toBe(55);
  });

  test('точность вычислений с плавающей точкой', () => {
    const character = new Character('Hero', 'Bowman');
    character.defence = 33;
    character.damage(100);
    expect(character.health).toBe(33);
  });
});