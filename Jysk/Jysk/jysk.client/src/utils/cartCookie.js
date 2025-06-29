export function getCartItems() {
  const items = localStorage.getItem('cart');
  return items ? JSON.parse(items) : [];
}

export function saveCartItems(items) {
  localStorage.setItem('cart', JSON.stringify(items));
}

export function addToCart(product) {
  const cart = getCartItems();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    cart.push({...product});
  }
  console.log("Cart after add:", cart);
  saveCartItems(cart);
}

export function removeFromCart(id) {
  let items = getCartItems();
  if (items[id]) {
    if (items[id].quantity > 1) {
      items[id].quantity -= 1;
    } else {
      items.splice(id, 1);
    }
    saveCartItems(items);
  }
}
