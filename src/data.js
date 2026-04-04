export const MOCK_PRODUCTS = [
  // KEYBOARDS
  {
    id: 1,
    name: "Digital Tech Pro 75%",
    category: "Клавиатуры",
    brand: "Digital Tech",
    price: 12990,
    inStock: true,
    images: ["/images/kb_pro_1775225523116.png", "/images/kb_tkl_1775225587207.png"],
    specs: { switches: "Gateron Milky Yellow Pro", format: "75%", material: "CNC Aluminum" },
    description: "Наш флагманский продукт. Идеально смазанная прямо с завода."
  },
  {
    id: 2,
    name: "Razer Huntsman Mini",
    category: "Клавиатуры",
    brand: "Razer",
    price: 11990,
    inStock: true,
    images: ["/images/razer_kb_1775229151175.png", "/images/kb_pro_1775225523116.png"],
    specs: { switches: "Razer Optical Analog", format: "60%", material: "Aluminum" },
    description: "Оптические переключатели для невероятной скорости."
  },
  {
    id: 3,
    name: "Logitech G915 TKL",
    category: "Клавиатуры",
    brand: "Logitech",
    price: 18990,
    inStock: true,
    images: ["/images/logitech_kb_1775229167209.png", "/images/kb_pro_1775225523116.png"],
    specs: { switches: "GL Tactile", format: "TKL", connection: "Lightspeed Wireless" },
    description: "Низкопрофильная механическая клавиатура турнирного уровня."
  },
  {
    id: 4,
    name: "HyperX Alloy Origins",
    category: "Клавиатуры",
    brand: "HyperX",
    price: 8990,
    inStock: true,
    images: ["/images/kb_tkl_1775225587207.png", "/images/kb_pro_1775225523116.png"],
    specs: { switches: "HyperX Red Linear", format: "100%", material: "Aircraft Aluminum" },
    description: "Компактная, прочная полноразмерная клавиатура."
  },
  {
    id: 5,
    name: "Digital Tech TKL Classic",
    category: "Клавиатуры",
    brand: "Digital Tech",
    price: 9490,
    inStock: true,
    images: ["/images/kb_tkl_1775225587207.png", "/images/kb_pro_1775225523116.png"],
    specs: { switches: "Kailh Box Red", format: "TKL (87%)" },
    description: "Классический форм-фактор TKL. Абсолютная надежность."
  },
  {
    id: 6,
    name: "Razer BlackWidow V4",
    category: "Клавиатуры",
    brand: "Razer",
    price: 15490,
    inStock: true,
    images: ["/images/razer_kb_1775229151175.png", "/images/kb_tkl_1775225587207.png"],
    specs: { switches: "Razer Green Tactile", format: "Full Size" },
    description: "Легендарная клавиатура получила масштабное обновление."
  },
  {
    id: 7,
    name: "Logitech Pro X 60",
    category: "Клавиатуры",
    brand: "Logitech",
    price: 14990,
    inStock: false,
    images: ["/images/logitech_kb_1775229167209.png", "/images/kb_tkl_1775225587207.png"],
    specs: { switches: "GX Brown", format: "60%" },
    description: "Компактное исполнение для максимальной свободы мыши."
  },
  {
    id: 8,
    name: "Digital Tech Silent 65%",
    category: "Клавиатуры",
    brand: "Digital Tech",
    price: 13500,
    inStock: true,
    images: ["/images/kb_pro_1775225523116.png", "/images/logitech_kb_1775229167209.png"],
    specs: { switches: "Gateron Silent Black", format: "65%" },
    description: "Абсолютно бесшумная работа для ночных сессий."
  },

  // MICE
  {
    id: 9,
    name: "Digital Tech M1 Prime",
    category: "Мыши",
    brand: "Digital Tech",
    price: 6490,
    inStock: true,
    images: ["/images/mouse_pro_1775225537096.png", "/images/dp_mouse_1775223742285.png"],
    specs: { sensor: "Pixart 3395", dpi: 26000, weight: "49g" },
    description: "Невесомая симметричная мышь с лучшим сенсором на рынке."
  },
  {
    id: 10,
    name: "Logitech G Pro X Superlight",
    category: "Мыши",
    brand: "Logitech",
    price: 12990,
    inStock: true,
    images: ["/images/mouse_pro_1775225537096.png", "/images/dp_mouse_1775223742285.png"],
    specs: { sensor: "HERO 25K", dpi: 25600, weight: "63g" },
    description: "Выбор профессионалов. Нулевое сопротивление."
  },
  {
    id: 11,
    name: "Razer DeathAdder V3",
    category: "Мыши",
    brand: "Razer",
    price: 14490,
    inStock: true,
    images: ["/images/mouse_pro_1775225537096.png", "/images/dp_mouse_1775223742285.png"],
    specs: { sensor: "Focus Pro 30K", dpi: 30000, weight: "59g" },
    description: "Иконичная эргономика с передовым сенсором."
  },
  {
    id: 12,
    name: "HyperX Pulsefire Haste",
    category: "Мыши",
    brand: "HyperX",
    price: 4990,
    inStock: true,
    images: ["/images/mouse_pro_1775225537096.png", "/images/dp_mouse_1775223742285.png"],
    specs: { sensor: "Pixart 3335", dpi: 16000, weight: "59g" },
    description: "Сверхлегкая сотовая конструкция."
  },
  {
    id: 13,
    name: "Digital Tech M2 Ergo",
    category: "Мыши",
    brand: "Digital Tech",
    price: 5990,
    inStock: false,
    images: ["/images/mouse_pro_1775225537096.png", "/images/dp_mouse_1775223742285.png"],
    specs: { sensor: "Pixart 3389", dpi: 16000, shape: "Ergonomic" },
    description: "Мышь для когтевого и ладонного хвата."
  },

  // HEADSETS
  {
    id: 14,
    name: "Digital Tech H-Zero",
    category: "Гарнитуры",
    brand: "Digital Tech",
    price: 8990,
    inStock: true,
    images: ["/images/headset_pro_1775225554646.png", "/images/dp_headset_1775223755680.png"],
    specs: { connection: "2.4 GHz + BT 5.3", drivers: "50mm Graphene" },
    description: "Беспроигрышное позиционирование звука."
  },
  {
    id: 15,
    name: "HyperX Cloud Alpha",
    category: "Гарнитуры",
    brand: "HyperX",
    price: 9990,
    inStock: true,
    images: ["/images/dp_headset_1775223755680.png", "/images/headset_pro_1775225554646.png"],
    specs: { connection: "Wired", drivers: "Dual Chamber" },
    description: "Культовая гарнитура с непревзойденным комфортом."
  },
  {
    id: 16,
    name: "Logitech G Pro X 2",
    category: "Гарнитуры",
    brand: "Logitech",
    price: 19990,
    inStock: true,
    images: ["/images/headset_pro_1775225554646.png", "/images/dp_headset_1775223755680.png"],
    specs: { connection: "Lightspeed Wireless", drivers: "50mm PRO-G Graphene" },
    description: "Новый стандарт звука в киберспорте."
  },
  {
    id: 17,
    name: "Razer BlackShark V2",
    category: "Гарнитуры",
    brand: "Razer",
    price: 8990,
    inStock: true,
    images: ["/images/dp_headset_1775223755680.png", "/images/headset_pro_1775225554646.png"],
    specs: { connection: "Wired USB", drivers: "TriForce Titanium 50mm" },
    description: "Шумоподавление и кристальный чистый микрофон."
  },

  // MOUSEPADS
  {
    id: 18,
    name: "Digital Tech Deskmat XXL",
    category: "Коврики",
    brand: "Digital Tech",
    price: 2990,
    inStock: true,
    images: ["/images/mousepad_pro_1775225571511.png"],
    specs: { size: "900x400x4 mm", surface: "Jacquard Speed + Control" },
    description: "Топографический паттерн."
  },
  {
    id: 19,
    name: "Razer Gigantus V2",
    category: "Коврики",
    brand: "Razer",
    price: 2490,
    inStock: true,
    images: ["/images/mousepad_pro_1775225571511.png"],
    specs: { size: "3XL", surface: "Textured cloth" },
    description: "Мягкий игровой коврик гигантских размеров."
  },
  {
    id: 20,
    name: "Logitech G840",
    category: "Коврики",
    brand: "Logitech",
    price: 3990,
    inStock: true,
    images: ["/images/mousepad_pro_1775225571511.png"],
    specs: { size: "900x400x3 mm", surface: "Performance" },
    description: "Максимальное пространство для маневров."
  },
  {
    id: 21,
    name: "HyperX Pulsefire Mat",
    category: "Коврики",
    brand: "HyperX",
    price: 2190,
    inStock: false,
    images: ["/images/mousepad_pro_1775225571511.png"],
    specs: { size: "L", surface: "Precision" },
    description: "Коврик с плотной прошивкой краев."
  },
  {
    id: 22,
    name: "Digital Tech Glasspad",
    category: "Коврики",
    brand: "Digital Tech",
    price: 7990,
    inStock: true,
    images: ["/images/mousepad_pro_1775225571511.png"],
    specs: { size: "500x400x3 mm", surface: "Tempered Glass" },
    description: "Стеклянный коврик для экстремального скольжения."
  },

  // PC AND MONITORS
  {
    id: 23,
    name: "Digital Tech Ultra Display 27\"",
    category: "Мониторы",
    brand: "Digital Tech",
    price: 35990,
    inStock: true,
    images: ["/images/dt_monitor_1775228621031.png"],
    specs: { resolution: "2560x1440", refresh: "240Hz", panel: "Fast IPS" },
    description: "Игровой монитор без рамок."
  },
  {
    id: 24,
    name: "Digital Tech Core Beast",
    category: "ПК",
    brand: "Digital Tech",
    price: 185000,
    inStock: true,
    images: ["/images/dt_pc_1775228638420.png"],
    specs: { cpu: "Ryzen 7 7800X3D", gpu: "RTX 4070 Ti Super", ram: "32GB DDR5" },
    description: "Мощная начинка в минималистичном корпусе."
  },

  // ACCESSORIES
  {
    id: 25,
    name: "Digital Tech Aviator Pro",
    category: "Аксессуары",
    brand: "Digital Tech",
    price: 3490,
    inStock: true,
    images: ["/images/dh_cable_1775225285044.png"],
    specs: { length: "1.5m", connector: "USB-C Aviator" },
    description: "Стильный пружинный кабель."
  },
  {
    id: 26,
    name: "Digital Tech C1 Controller",
    category: "Аксессуары",
    brand: "Digital Tech",
    price: 5990,
    inStock: true,
    images: ["/images/dt_controller_1775228657441.png"],
    specs: { connection: "BT/2.4G", layout: "Asymmetric" },
    description: "Беспроводной геймпад."
  }
];

export const CATEGORIES = ["Клавиатуры", "Мыши", "Гарнитуры", "Коврики", "ПК", "Мониторы", "Аксессуары"];

export const getProducts = () => {
  const stored = localStorage.getItem('dt_products_v2');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('dt_products_v2', JSON.stringify(MOCK_PRODUCTS));
  return MOCK_PRODUCTS;
};

export const saveProducts = (products) => localStorage.setItem('dt_products_v2', JSON.stringify(products));
