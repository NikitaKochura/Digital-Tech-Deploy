export const CATEGORIES = ["Клавиатуры", "Мыши", "Гарнитуры", "Коврики", "ПК", "Мониторы", "Аксессуары"];

export const getProducts = async () => {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Backend offline');
    return await res.json();
  } catch(err) {
    console.error("Failed to fetch products:", err);
    return MOCK_PRODUCTS; // Fallback to hardcoded mock for safety
  }
};

export const saveProducts = async (products) => {
  try {
    await fetch('/api/products/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    });
  } catch(err) { console.error("Sync error:", err); }
};
