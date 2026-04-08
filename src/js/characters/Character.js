export default class Character {
  constructor(name, type) {
    // Валидация имени
    if (typeof name !== 'string' || name.length < 2 || name.length > 10) {
      throw new Error('Имя должно быть строкой длиной от 2 до 10 символов');
    }

    // Валидация типа
    const validTypes = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
    if (!validTypes.includes(type)) {
      throw new Error(`Тип должен быть одним из: ${validTypes.join(', ')}`);
    }

    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    
    // Характеристики будут установлены в дочерних классах
    this.attack = 0;
    this.defence = 0;
  }
}