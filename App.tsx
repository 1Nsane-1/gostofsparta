import React, { useState, useEffect } from 'react';
import { WEAPONS, REALMS } from './constants';
import WeaponCard from './components/WeaponCard';
import RunicDivider from './components/RunicDivider';
import FeedbackForm from './components/FeedbackForm';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

interface RealmDetails {
  id: string;
  name: string;
  description: string;
  ruler: string;
  inhabitants: string[];
  keyFeatures: string[];
  significance: string;
}

interface WeaponDetails {
  id: string;
  name: string;
  description: string;
  element: 'ice' | 'fire' | 'wind';
  creator: string;
  specialAbilities: string[];
  history: string;
  notableUsers: string[];
  significance: string;
}

interface YggdrasilDetails {
  name: string;
  title: string;
  description: string;
  meaning: string;
  structure: string[];
  connections: string[];
  guardians: string[];
  significance: string;
  quote: string;
}

const REALM_DETAILS: Record<string, RealmDetails> = {
  midgard: {
    id: 'midgard',
    name: 'Мидгард',
    description: 'Мир смертных, скованный Фимбулвинтером.',
    ruler: 'Не управляется напрямую богами',
    inhabitants: ['Люди', 'Дварфы (иногда)', 'Животные'],
    keyFeatures: ['Земля смертных', 'Защищен стенами из ресниц Имира', 'Связан с другими мирами через Иггдрасиль'],
    significance: 'Центральный мир, где происходят многие события скандинавской мифологии'
  },
  alfheim: {
    id: 'alfheim',
    name: 'Альфхейм',
    description: 'Дом Светлых и Темных эльфов.',
    ruler: 'Фрейр (бог плодородия)',
    inhabitants: ['Светлые эльфы', 'Темные эльфы (Свартальфар)'],
    keyFeatures: ['Вечный свет', 'Великолепные дворцы', 'Источник светлой магии'],
    significance: 'Мир света и магии, часто конфликтует с Темными эльфами'
  },
  asgard: {
    id: 'asgard',
    name: 'Асгард',
    description: 'Укрепленное царство богов-асов.',
    ruler: 'Один (Верховный бог)',
    inhabitants: ['Боги-асы', 'Валькирии', 'Эйнхерии'],
    keyFeatures: ['Валгалла', 'Бифрёст (Радужный мост)', 'Чертоги богов', 'Трон Хлидскьяльв'],
    significance: 'Цитадель богов, защищенная стенами, построенными великаном'
  },
  jotunheim: {
    id: 'jotunheim',
    name: 'Йотунхейм',
    description: 'Земля Великанов, скрытая от Одина.',
    ruler: 'Утгарда-Локи (король великанов)',
    inhabitants: ['Йотуны (великаны)', 'Тролли', 'Другие древние существа'],
    keyFeatures: ['Горные крепости', 'Древние леса', 'Замерзшие пустоши', 'Скрытые проходы'],
    significance: 'Родина древних врагов асов, место многих легендарных сражений'
  },
  helheim: {
    id: 'helheim',
    name: 'Хельхейм',
    description: 'Ледяной подземный мир для умерших бесчестной смертью.',
    ruler: 'Хель (богиня смерти)',
    inhabitants: ['Умершие не в бою', 'Тени', 'Стражи загробного мира'],
    keyFeatures: ['Врата Хельгрин', 'Река Гьёлль', 'Чертоги Хель', 'Ледяные пустоши'],
    significance: 'Мир мертвых для тех, кто не умер в бою, правит Хель - дочь Локи'
  },
  muspelheim: {
    id: 'muspelheim',
    name: 'Муспельхейм',
    description: 'Первобытный мир огня и лавы.',
    ruler: 'Суртр (огненный великан)',
    inhabitants: ['Огненные великаны', 'Огненные демоны', 'Духи пламени'],
    keyFeatures: ['Вечный огонь', 'Лавовые реки', 'Пылающие горы', 'Огненные бури'],
    significance: 'Мир огня, который сыграет ключевую роль в Рагнарёке'
  }
};

const WEAPON_DETAILS: Record<string, WeaponDetails> = {
  leviathan: {
    id: 'leviathan',
    name: 'Топор Левиафан',
    description: 'Выкован братьями Хульдра, пропитан ледяной силой, чтобы противостоять Асам.',
    element: 'ice',
    creator: 'Братья Хульдра (Синдри и Брокк)',
    specialAbilities: [
      'Возвращение к владельцу',
      'Замораживающий удар',
      'Ледяная аура',
      'Создание ледяных конструкций'
    ],
    history: 'Был выкован для Фрейи, но отдан Кратосу после смерти её сына Бальдра. Создан как оружие против Тора и других асов.',
    notableUsers: ['Кратос', 'Фрейя (первоначально)'],
    significance: 'Символ новой эры Кратоса, оружие отцовства и защиты'
  },
  blades: {
    id: 'blades',
    name: 'Клинки Хаоса',
    description: 'Скованы с Кратосом Аресом. Эти клинки горят первобытным огнем греческого подземного мира.',
    element: 'fire',
    creator: 'Арес (бог войны)',
    specialAbilities: [
      'Неразрывная связь с владельцем',
      'Огненные цепи',
      'Способность поджигать врагов',
      'Возвращающееся оружие'
    ],
    history: 'Были прикованы к рукам Кратоса самим Аресом. После предательства Ареса стали символом мести Кратоса. Захоронены вместе с Асфоделем, но возвращены в Рагнарёк.',
    notableUsers: ['Кратос', 'Арес (создатель)'],
    significance: 'Символ прошлого Кратоса, его гнева и желания мести'
  },
  draupnir: {
    id: 'draupnir',
    name: 'Копье Драупнир',
    description: 'Оружие спартанского генерала. Оно бесконечно множится, сокрушая врагов ветром и точностью.',
    element: 'wind',
    creator: 'Братья Хульдра (по заказу Кратоса)',
    specialAbilities: [
      'Бесконечное умножение',
      'Ветряные вихри',
      'Дистанционные атаки',
      'Создание копий из воздуха'
    ],
    history: 'Создано братьями Хульдра специально для Кратоса во время его путешествия по Свартальфхейму. Основано на оригинальном артефакте Драупнир, кольце Одина.',
    notableUsers: ['Кратос', 'Спартанские воины (стиль)'],
    significance: 'Символ наследия Кратоса как спартанского генерала и военной тактики'
  }
};

const YGGDRASIL_DETAILS: YggdrasilDetails = {
  name: 'Иггдрасиль',
  title: 'Мировое Древо',
  description: 'Великий ясень, связывающий все девять миров скандинавской мифологии. Его ветви простираются в небеса, корни уходят в подземные миры, а ствол поддерживает вселенную.',
  meaning: 'Иггдрасиль в переводе означает "конь Игга" (Одина). Это символ вселенского порядка, взаимосвязи всех вещей и цикличности существования.',
  structure: [
    'Крона достигает небес и поддерживает Асгард',
    'Три главных корня ведут к Урду, Мимиру и Хвельгемиру',
    'Ствол проходит через все миры как центральная ось',
    'Ветви соединяют миры, позволяя путешествовать между ними'
  ],
  connections: [
    'Асгард — в кроне, дом богов',
    'Мидгард — на среднем уровне, мир людей',
    'Хельхейм — у корней, мир мертвых',
    'Йотунхейм — в восточной части',
    'Альфхейм — рядом с Асгардом',
    'Все девять миров соединены через древо'
  ],
  guardians: [
    'Нидхёгг — дракон, грызущий корни',
    'Орёл — сидящий на верхушке',
    'Ведьмина Белка Рататоск — бегает по стволу',
    'Четыре оленя — объедают листву'
  ],
  significance: 'Иггдрасиль — не просто дерево, это сама структура вселенной. Его здоровье отражает состояние миров. В Рагнарёк древо задрожит, но не падет полностью.',
  quote: '"Под тем древом, что не знает, сколь ветвей у него, скрыта мудрость веков." — Пророчество Вёльвы'
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRealm, setSelectedRealm] = useState<RealmDetails | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponDetails | null>(null);
  const [isRealmModalOpen, setIsRealmModalOpen] = useState(false);
  const [isWeaponModalOpen, setIsWeaponModalOpen] = useState(false);
  const [isYggdrasilModalOpen, setIsYggdrasilModalOpen] = useState(false);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  const navItems = [
    { label: 'Истоки', id: 'origins' },
    { label: 'История', id: 'history' },
    { label: 'Арсенал', id: 'arsenal' },
    { label: 'Миры', id: 'realms' },
    { label: 'Связь', id: 'feedback' },
  ];

  useEffect(() => {
    const createSnowflakes = () => {
      const flakes: Snowflake[] = [];
      const count = 60;
      
      for (let i = 0; i < count; i++) {
        flakes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 1 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          drift: Math.random() * 2 - 1,
        });
      }
      
      setSnowflakes(flakes);
    };

    createSnowflakes();

    const interval = setInterval(() => {
      setSnowflakes(prev => prev.map(flake => {
        let newY = flake.y + flake.speed;
        let newX = flake.x + flake.drift * 0.1;
        
        if (newY > 100) {
          newY = -5;
          newX = Math.random() * 100;
        }
        
        if (newX > 100) newX = 0;
        if (newX < 0) newX = 100;
        
        return {
          ...flake,
          x: newX,
          y: newY,
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleRealmClick = (realmId: string) => {
    const realm = REALM_DETAILS[realmId];
    if (realm) {
      setSelectedRealm(realm);
      setIsRealmModalOpen(true);
    }
  };

  const handleWeaponClick = (weaponId: string) => {
    const weapon = WEAPON_DETAILS[weaponId];
    if (weapon) {
      setSelectedWeapon(weapon);
      setIsWeaponModalOpen(true);
    }
  };

  const handleYggdrasilClick = () => {
    setIsYggdrasilModalOpen(true);
  };

  const closeRealmModal = () => {
    setIsRealmModalOpen(false);
    setSelectedRealm(null);
  };

  const closeWeaponModal = () => {
    setIsWeaponModalOpen(false);
    setSelectedWeapon(null);
  };

  const closeYggdrasilModal = () => {
    setIsYggdrasilModalOpen(false);
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'ice': return 'text-nordic-ice';
      case 'fire': return 'text-chaos-fire';
      case 'wind': return 'text-gold-mute';
      default: return 'text-stone-300';
    }
  };

  const getElementBg = (element: string) => {
    switch (element) {
      case 'ice': return 'bg-nordic-ice/10 border-nordic-ice/30';
      case 'fire': return 'bg-chaos-fire/10 border-chaos-fire/30';
      case 'wind': return 'bg-gold-mute/10 border-gold-mute/30';
      default: return 'bg-stone-800 border-stone-700';
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-300 font-sans selection:bg-spartan-red selection:text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {snowflakes.map(flake => (
          <div
            key={flake.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${flake.x}vw`,
              top: `${flake.y}vh`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              filter: 'blur(0.5px)',
              boxShadow: '0 0 2px rgba(165, 242, 243, 0.5)',
            }}
          />
        ))}
      </div>

      {isRealmModalOpen && selectedRealm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl border-4 border-stone-800 bg-stone-900 shadow-2xl">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-spartan-red z-10"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-spartan-red z-10"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-spartan-red z-10"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-spartan-red z-10"></div>

            <div className="bg-stone-800 p-4 border-b border-stone-700 flex justify-between items-center">
              <h3 className="text-xl font-serif text-stone-200 tracking-widest flex items-center gap-3">
                <span className="text-2xl">{REALMS.find(r => r.id === selectedRealm.id)?.runeChar || 'ᛗ'}</span>
                {selectedRealm.name}
              </h3>
              <button
                onClick={closeRealmModal}
                className="text-stone-400 hover:text-spartan-red text-2xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6 bg-stone-900/90">
              <div>
                <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Описание</h4>
                <p className="text-stone-300 font-sans leading-relaxed">{selectedRealm.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Правитель</h4>
                  <p className="text-stone-300 font-sans">{selectedRealm.ruler}</p>
                </div>

                <div>
                  <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Значение</h4>
                  <p className="text-stone-300 font-sans">{selectedRealm.significance}</p>
                </div>
              </div>

              <div>
                <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Обитатели</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRealm.inhabitants.map((inhabitant, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-stone-800 border border-stone-700 text-stone-300 text-sm font-sans"
                    >
                      {inhabitant}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Ключевые особенности</h4>
                <ul className="space-y-2">
                  {selectedRealm.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-stone-300 font-sans">
                      <span className="text-spartan-red mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-spartan-red pl-4 mt-6">
                <p className="text-stone-400 italic font-sans">
                  {selectedRealm.id === 'midgard' && '"Мир смертных, где решаются судьбы богов и людей."'}
                  {selectedRealm.id === 'asgard' && '"Высокие чертоги асов, откуда Один наблюдает за всеми мирами."'}
                  {selectedRealm.id === 'jotunheim' && '"Земля древних, где камень помнит имя каждого великана."'}
                  {selectedRealm.id === 'helheim' && '"Холодные врата, куда не проникает свет солнца."'}
                  {selectedRealm.id === 'muspelheim' && '"Первозданный огонь, который поглотит все в конце времен."'}
                  {selectedRealm.id === 'alfheim' && '"Свет, что никогда не гаснет, и тени, что никогда не исчезают."'}
                </p>
              </div>
            </div>

            <div className="bg-stone-800 p-4 border-t border-stone-700 flex justify-end">
              <button
                onClick={closeRealmModal}
                className="bg-spartan-red hover:bg-red-900 text-white font-serif px-6 py-2 tracking-widest border border-red-900 transition-all uppercase"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {isWeaponModalOpen && selectedWeapon && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl border-4 border-stone-800 bg-stone-900 shadow-2xl">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-spartan-red z-10"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-spartan-red z-10"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-spartan-red z-10"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-spartan-red z-10"></div>

            <div className="bg-stone-800 p-4 border-b border-stone-700 flex justify-between items-center">
              <h3 className="text-xl font-serif text-stone-200 tracking-widest flex items-center gap-3">
                <span className={`text-2xl ${getElementColor(selectedWeapon.element)}`}>
                  {selectedWeapon.element === 'ice' ? '❄️' : selectedWeapon.element === 'fire' ? '🔥' : '🌪️'}
                </span>
                {selectedWeapon.name}
              </h3>
              <button
                onClick={closeWeaponModal}
                className="text-stone-400 hover:text-spartan-red text-2xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6 bg-stone-900/90">
              <div>
                <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Описание</h4>
                <p className="text-stone-300 font-sans leading-relaxed">{selectedWeapon.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Создатель</h4>
                  <p className="text-stone-300 font-sans">{selectedWeapon.creator}</p>
                </div>

                <div>
                  <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Стихия</h4>
                  <span className={`px-3 py-1 text-sm font-sans border ${getElementBg(selectedWeapon.element)} ${getElementColor(selectedWeapon.element)}`}>
                    {selectedWeapon.element === 'ice' ? 'Лёд' : selectedWeapon.element === 'fire' ? 'Огонь' : 'Ветер'}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">История</h4>
                <p className="text-stone-300 font-sans leading-relaxed">{selectedWeapon.history}</p>
              </div>

              <div>
                <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Значение</h4>
                <p className="text-stone-300 font-sans">{selectedWeapon.significance}</p>
              </div>

              <div>
                <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Особые способности</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedWeapon.specialAbilities.map((ability, index) => (
                    <div 
                      key={index} 
                      className={`p-3 border ${getElementBg(selectedWeapon.element)}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={getElementColor(selectedWeapon.element)}>•</span>
                        <span className="text-stone-300 text-sm font-sans">{ability}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Известные владельцы</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedWeapon.notableUsers.map((user, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-stone-800 border border-stone-700 text-stone-300 text-sm font-sans"
                    >
                      {user}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`border-l-4 ${selectedWeapon.element === 'ice' ? 'border-nordic-ice' : selectedWeapon.element === 'fire' ? 'border-chaos-fire' : 'border-gold-mute'} pl-4 mt-6`}>
                <p className="text-stone-400 italic font-sans">
                  {selectedWeapon.id === 'leviathan' && '"Топор не подведет. Проверено в бою." - Кратос'}
                  {selectedWeapon.id === 'blades' && '"Эти цепи... они всегда со мной." - Кратос'}
                  {selectedWeapon.id === 'draupnir' && '"Спартанцы знали толк в копьях." - Кратос'}
                </p>
              </div>
            </div>

            <div className="bg-stone-800 p-4 border-t border-stone-700 flex justify-end">
              <button
                onClick={closeWeaponModal}
                className="bg-spartan-red hover:bg-red-900 text-white font-serif px-6 py-2 tracking-widest border border-red-900 transition-all uppercase"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {isYggdrasilModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl border-4 border-stone-800 bg-stone-900 shadow-2xl">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-spartan-red z-10"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-spartan-red z-10"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-spartan-red z-10"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-spartan-red z-10"></div>

            <div className="bg-stone-800 p-4 border-b border-stone-700 flex justify-between items-center">
              <h3 className="text-xl font-serif text-stone-200 tracking-widest flex items-center gap-3">
                <span className="text-2xl text-nordic-ice">🌳</span>
                {YGGDRASIL_DETAILS.name}
                <span className="text-sm text-stone-500 font-sans normal-case tracking-normal ml-3">
                  {YGGDRASIL_DETAILS.title}
                </span>
              </h3>
              <button
                onClick={closeYggdrasilModal}
                className="text-stone-400 hover:text-spartan-red text-2xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6 bg-stone-900/90">
              <div>
                <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Описание</h4>
                <p className="text-stone-300 font-sans leading-relaxed">{YGGDRASIL_DETAILS.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Значение имени</h4>
                  <p className="text-stone-300 font-sans">{YGGDRASIL_DETAILS.meaning}</p>
                </div>

                <div>
                  <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Значение</h4>
                  <p className="text-stone-300 font-sans">{YGGDRASIL_DETAILS.significance}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Структура</h4>
                  <ul className="space-y-2">
                    {YGGDRASIL_DETAILS.structure.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-stone-300 font-sans text-sm">
                        <span className="text-nordic-ice mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Соединяет миры</h4>
                  <div className="flex flex-wrap gap-2">
                    {YGGDRASIL_DETAILS.connections.map((connection, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-stone-800 border border-stone-700 text-stone-300 text-xs font-sans"
                      >
                        {connection}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-2">Хранители</h4>
                  <div className="space-y-2">
                    {YGGDRASIL_DETAILS.guardians.map((guardian, index) => (
                      <div key={index} className="flex items-center gap-2 text-stone-300 font-sans text-sm">
                        <span className="text-nordic-ice">▸</span>
                        <span>{guardian}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-stone-800 p-4 bg-stone-800/50 mt-4">
                <h4 className="text-spartan-red font-serif text-sm uppercase tracking-widest mb-3 text-center">Структура миров</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 border border-stone-700">
                    <div className="text-nordic-ice text-xs">ВЕРХ</div>
                    <div className="text-xs text-stone-400">Асгард</div>
                  </div>
                  <div className="p-2 border border-stone-700">
                    <div className="text-nordic-ice text-xs">СЕРЕДИНА</div>
                    <div className="text-xs text-stone-400">Мидгард</div>
                  </div>
                  <div className="p-2 border border-stone-700">
                    <div className="text-nordic-ice text-xs">НИЗ</div>
                    <div className="text-xs text-stone-400">Хельхейм</div>
                  </div>
                </div>
                <p className="text-center text-xs text-stone-500 mt-2">Все миры соединены через Иггдрасиль</p>
              </div>

              <div className="border-l-4 border-nordic-ice pl-4 mt-6">
                <p className="text-stone-400 italic font-sans">{YGGDRASIL_DETAILS.quote}</p>
              </div>

              <div className="p-4 bg-stone-800/30 border border-stone-700 rounded">
                <p className="text-stone-400 text-sm font-sans">
                  <span className="text-spartan-red font-serif">Примечание:</span> В God of War (2018) Иггдрасиль играет ключевую роль в путешествии Кратоса и Атрея. Древо и его хранители — важные элементы сюжета.
                </p>
              </div>
            </div>

            <div className="bg-stone-800 p-4 border-t border-stone-700 flex justify-end">
              <button
                onClick={closeYggdrasilModal}
                className="bg-spartan-red hover:bg-red-900 text-white font-serif px-6 py-2 tracking-widest border border-red-900 transition-all uppercase"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed top-0 w-full z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <span className="font-serif text-2xl font-bold tracking-widest text-stone-100">
                Ω ПРИЗРАК СПАРТЫ
              </span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-stone-400 hover:text-spartan-red hover:scale-110 px-3 py-2 text-sm font-medium tracking-widest uppercase transition-all duration-300 font-serif"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {mobileMenuOpen && (
           <div className="md:hidden bg-stone-900 border-b border-stone-800">
             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-stone-300 hover:text-spartan-red block px-3 py-2 text-base font-medium font-serif uppercase"
                  >
                    {item.label}
                  </a>
                ))}
             </div>
           </div>
        )}
      </nav>

      <section id="origins" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1542259681-d4198d89cb83?q=80&w=2069&auto=format&fit=crop" 
                alt="Nordic Landscape" 
                className="w-full h-full object-cover grayscale opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <p className="text-spartan-red font-serif tracking-[0.5em] text-lg mb-4 animate-[fadeIn_1s_ease-in]">
            ОТЕЦ. ВОИН. ЧУДОВИЩЕ. БОГ.
          </p>
          <h1 className="text-6xl md:text-9xl font-serif font-black text-stone-100 tracking-tighter mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            КРАТОС
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-stone-400 leading-relaxed font-sans border-l-4 border-spartan-red pl-6 text-left">
            "Цикл прервется здесь. Мы должны быть лучше." <br/>
            <span className="text-sm mt-2 block text-stone-600 uppercase tracking-widest">- Призрак Спарты</span>
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <RunicDivider />

        <section id="history" className="scroll-mt-24 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-200 mb-4">
              ИСТОРИЯ ПРИЗРАКА
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto">Путь от спартанского генерала до бога войны и отца.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="relative border-4 border-stone-800 overflow-hidden shadow-2xl transform rotate-1">
                <img 
                  src="/images/ded.png" 
                  alt="Кратос - Бог Войны" 
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop';
                    e.currentTarget.alt = 'Кратос - альтернативное изображение';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-2xl font-serif text-stone-100">КРАТОС</h3>
                  <p className="text-stone-400 text-sm">Бывший спартанский генерал, Бог Войны</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-spartan-red"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-spartan-red"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-spartan-red"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-spartan-red"></div>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-spartan-red pl-6 py-2">
                <h3 className="text-2xl font-serif text-stone-200 mb-2">Начало пути</h3>
                <p className="text-stone-400 font-sans leading-relaxed">
                  Кратос родился в Спарте и стал одним из её величайших генералов. В отчаянии, столкнувшись с неминуемым поражением, он призвал на помощь Ареса, бога войны, пообещав служить ему в обмен на победу.
                </p>
              </div>
              
              <div className="border-l-4 border-spartan-red pl-6 py-2">
                <h3 className="text-2xl font-serif text-stone-200 mb-2">Проклятие богов</h3>
                <p className="text-stone-400 font-sans leading-relaxed">
                  Арес обманул Кратоса, заставив его убить свою собственную семью. В наказание прах его жены и дочери навеки пристал к его коже, подарив ему прозвище «Призрак Спарты». Охваченный яростью, Кратос поклялся отомстить Аресу.
                </p>
              </div>
              
              <div className="border-l-4 border-spartan-red pl-6 py-2">
                <h3 className="text-2xl font-serif text-stone-200 mb-2">Бог Войны</h3>
                <p className="text-stone-400 font-sans leading-relaxed">
                  Убив Ареса, Кратос занял его место на Олимпе. Но правление богов принесло ему лишь пустоту и страдания. В конечном итоге он уничтожил весь греческий пантеон, включая Зевса, своего отца.
                </p>
              </div>
              
              <div className="border-l-4 border-spartan-red pl-6 py-2">
                <h3 className="text-2xl font-serif text-stone-200 mb-2">Новая жизнь в Скандинавии</h3>
                <p className="text-stone-400 font-sans leading-relaxed">
                  Сбежав из Греции, Кратос начал новую жизнь в Мидгарде. Он женился на великанше Лауфей и у них родился сын Атрей. После смерти Лауфей Кратос и Атрей отправились в путешествие, чтобы выполнить её последнюю волю — развеять её прах с высочайшей горы Йотунхейма.
                </p>
              </div>
              
              <div className="border-l-4 border-spartan-red pl-6 py-2">
                <h3 className="text-2xl font-serif text-stone-200 mb-2">Отец и учитель</h3>
                <p className="text-stone-400 font-sans leading-relaxed">
                  Через отношения с Атреем Кратос учится контролировать свой гнев и становится настоящим отцом. Их путешествие — это не только физическое странствие, но и путь искупления, где Кратос борется со своим прошлым, чтобы дать сыну лучшее будущее.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-stone-800">
            <h3 className="text-3xl font-serif text-stone-200 text-center mb-8">КЛЮЧЕВЫЕ СОБЫТИЯ</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-stone-800/50 p-6 border border-stone-700 hover:border-spartan-red transition-all duration-300">
                <div className="text-spartan-red font-serif text-lg mb-2">Спартанский генерал</div>
                <p className="text-stone-400 text-sm">Величайший воин Спарты до сделки с Аресом</p>
              </div>
              <div className="bg-stone-800/50 p-6 border border-stone-700 hover:border-spartan-red transition-all duration-300">
                <div className="text-spartan-red font-serif text-lg mb-2">Призрак Спарты</div>
                <p className="text-stone-400 text-sm">Проклятие, наложенное после смерти семьи</p>
              </div>
              <div className="bg-stone-800/50 p-6 border border-stone-700 hover:border-spartan-red transition-all duration-300">
                <div className="text-spartan-red font-serif text-lg mb-2">Бог Войны</div>
                <p className="text-stone-400 text-sm">Убийство Ареса и восхождение на Олимп</p>
              </div>
              <div className="bg-stone-800/50 p-6 border border-stone-700 hover:border-spartan-red transition-all duration-300">
                <div className="text-spartan-red font-serif text-lg mb-2">Падение Олимпа</div>
                <p className="text-stone-400 text-sm">Уничтожение греческого пантеона богов</p>
              </div>
              <div className="bg-stone-800/50 p-6 border border-stone-700 hover:border-spartan-red transition-all duration-300">
                <div className="text-spartan-red font-serif text-lg mb-2">Новое начало</div>
                <p className="text-stone-400 text-sm">Брак с Лауфей и рождение Атрея</p>
              </div>
              <div className="bg-stone-800/50 p-6 border border-stone-700 hover:border-spartan-red transition-all duration-300">
                <div className="text-spartan-red font-serif text-lg mb-2">Путешествие отца</div>
                <p className="text-stone-400 text-sm">Поход с Атреем для исполнения воли Лауфей</p>
              </div>
            </div>
          </div>
        </section>

        <RunicDivider />

        <section id="arsenal" className="scroll-mt-24 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-200 mb-4 tracking-tight">
              АРСЕНАЛ
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto">Орудия разрушения, выкованные войной и закаленные дисциплиной. Нажмите на любое оружие для подробностей.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WEAPONS.map((weapon) => (
              <div 
                key={weapon.id} 
                onClick={() => handleWeaponClick(weapon.id)}
                className="cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
              >
                <WeaponCard weapon={weapon} />
              </div>
            ))}
          </div>
        </section>

        <RunicDivider />

        <section id="realms" className="scroll-mt-24 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-200 mb-8">
                ДЕВЯТЬ МИРОВ
              </h2>
              <div className="space-y-6">
                {REALMS.map((realm) => (
                  <div 
                    key={realm.id} 
                    onClick={() => handleRealmClick(realm.id)}
                    className="group border-l-2 border-stone-800 hover:border-spartan-red pl-6 transition-all duration-300 cursor-pointer hover:bg-stone-800/30 p-3 -m-3 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif text-stone-300 group-hover:text-spartan-red">
                        {realm.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-stone-700 text-2xl group-hover:text-stone-500 transition-colors font-serif">
                          {realm.runeChar}
                        </span>
                        <span className="text-stone-600 group-hover:text-spartan-red opacity-0 group-hover:opacity-100 transition-all duration-300">
                          →
                        </span>
                      </div>
                    </div>
                    <p className="text-stone-500 text-sm mt-1">{realm.description}</p>
                    <div className="mt-2 text-xs text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Нажмите для подробностей
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div 
                onClick={handleYggdrasilClick}
                className="relative h-[500px] w-full border-4 border-stone-800 bg-stone-900 shadow-2xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src="/images/photo1.jpg" 
                  alt="Девять миров Иггдрасиля" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1968&auto=format&fit=crop';
                    e.currentTarget.alt = 'Изображение Иггдрасиля - альтернативное';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-spartan-red z-10"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-spartan-red z-10"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-spartan-red z-10"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-spartan-red z-10"></div>
                
                <div className="absolute bottom-4 right-4 bg-black/80 p-3 text-xs text-stone-300 font-serif tracking-widest border border-stone-700 backdrop-blur-sm group-hover:bg-spartan-red/80 group-hover:border-spartan-red transition-all duration-300">
                  ИГГДРАСИЛЬ
                  <span className="block text-[10px] text-stone-400 group-hover:text-stone-300 mt-1">
                    Нажмите для информации
                  </span>
                </div>
                
                <div className="absolute inset-0 bg-spartan-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 p-3 rounded-full border border-stone-600 backdrop-blur-sm">
                    <span className="text-white text-sm font-serif">ℹ️</span>
                  </div>
                </div>
              </div>
              
              <p className="text-stone-500 text-sm italic mt-4 text-center font-sans">
                Древо миров, связывающее все девять реальностей. Нажмите на фото или любой мир для подробностей.
              </p>
            </div>
          </div>
        </section>

        <RunicDivider />

        <section id="feedback" className="scroll-mt-24">
          <FeedbackForm />
        </section>
      </div>

      <footer className="bg-stone-950 border-t border-stone-900 py-12 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-4xl text-stone-800 font-serif mb-6">Ω</div>
          <p className="text-stone-600 text-sm">
            Фанатский трибьют. Не связано с Santa Monica Studio или Sony Interactive Entertainment.
          </p>
          <p className="text-stone-700 text-xs mt-2">
            История Кратоса — это путь от гнева к искуплению, от разрушения к созиданию.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;