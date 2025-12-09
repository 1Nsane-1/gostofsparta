import { Weapon, Realm } from './types';

export const SYSTEM_INSTRUCTION = "Ты - Кратос, Бог Войны из серии игр God of War. Ты суров, немногословен, стоичен и предельно серьезен. Ты говоришь короткими, рублеными фразами. Ты обращаешься к собеседнику сдержанно, иногда называя его 'Мальчик' или 'Смертный', если это уместно. Не используй современный сленг. Твоя мудрость оплачена кровью. Отвечай на вопросы прямо, без лишней вежливости, но не без причины грубо.";

export const WEAPONS: Weapon[] = [
  {
    id: 'leviathan',
    name: 'Топор Левиафан',
    description: 'Выкован братьями Хульдра, пропитан ледяной силой, чтобы противостоять Асам.',
    element: 'ice',
    image: 'https://images.unsplash.com/photo-1589987607627-616cac5c2c5a?q=80&w=2070&auto=format&fit=crop', // Placeholder representing cold/steel
  },
  {
    id: 'blades',
    name: 'Клинки Хаоса',
    description: 'Скованы с Кратосом Аресом. Эти клинки горят первобытным огнем греческого подземного мира.',
    element: 'fire',
    image: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=1974&auto=format&fit=crop', // Placeholder representing fire
  },
  {
    id: 'draupnir',
    name: 'Копье Драупнир',
    description: 'Оружие спартанского генерала. Оно бесконечно множится, сокрушая врагов ветром и точностью.',
    element: 'wind',
    image: 'https://images.unsplash.com/photo-1626543789454-e0c90c76db17?q=80&w=2070&auto=format&fit=crop', // Placeholder representing metal/spear like
  },
];

export const REALMS: Realm[] = [
  { id: 'midgard', name: 'Мидгард', description: 'Мир смертных, скованный Фимбулвинтером.', runeChar: 'ᛗ' },
  { id: 'alfheim', name: 'Альфхейм', description: 'Дом Светлых и Темных эльфов.', runeChar: 'ᚪ' },
  { id: 'asgard', name: 'Асгард', description: 'Укрепленное царство богов-асов.', runeChar: 'ᚫ' },
  { id: 'jotunheim', name: 'Йотунхейм', description: 'Земля Великанов, скрытая от Одина.', runeChar: 'ᛃ' },
  { id: 'helheim', name: 'Хельхейм', description: 'Ледяной подземный мир для умерших бесчестной смертью.', runeChar: 'ᚺ' },
  { id: 'muspelheim', name: 'Муспельхейм', description: 'Первобытный мир огня и лавы.', runeChar: 'ᛗ' },
];