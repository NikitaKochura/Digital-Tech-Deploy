export const CATEGORIES = ["Клавиатуры", "Мыши", "Гарнитуры", "Коврики", "ПК", "Мониторы", "Аксессуары"];

// In production the Express server serves the frontend, so relative URLs work.
// In dev mode, Vite proxy handles /api -> localhost:3001.
const API_BASE = '';

export const getProducts = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
    return await res.json();
  } catch(err) {
    console.error("Failed to fetch products:", err);
    return []; // Return empty array, not undefined
  }
};

export const addProduct = async (product) => {
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error(`Save failed: ${res.status}`);
    return await res.json();
  } catch(err) {
    console.error("Add product error:", err);
    return null;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error(`Update failed: ${res.status}`);
    return await res.json();
  } catch(err) {
    console.error("Update product error:", err);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
    return await res.json();
  } catch(err) {
    console.error("Delete product error:", err);
    return null;
  }
};

// Legacy compat – keep saveProducts as alias but it should NOT be used
export const saveProducts = async (products) => {
  console.warn('saveProducts/sync is deprecated — use addProduct/updateProduct/deleteProduct instead');
  try {
    await fetch(`${API_BASE}/api/products/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    });
  } catch(err) { console.error("Sync error:", err); }
};
