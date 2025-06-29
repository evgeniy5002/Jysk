import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import chair from '../assets/img/chair.png';
import '../styles/components/CartModal.scss';
import CartModalItem from './CartModalItem';
import { useCartModal } from './CartModalContext';
import { getCartItems, removeFromCart } from "../utils/cartCookie";


export default function CartModal() {
  const { isCartModalOpen, closeCartModal } = useCartModal();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    if (isCartModalOpen) {
      document.body.classList.add("body-no-scroll");
      const items = getCartItems();
      setProducts(items);
    } else {
      document.body.classList.remove("body-no-scroll");
    }
  }, [isCartModalOpen]);

  const totalPrice = products.reduce((acc, item) => acc + (item.newPrice * (item.quantity || 1)), 0);

  const handleRemove = (id) => {
    removeFromCart(id);
    setProducts(getCartItems());
  };
  const handleCheckoutClick = () => {
    closeCartModal();
    navigate('/cart');
  };
  
  return (
    <>
      <div
        className={`cart-overlay ${isCartModalOpen ? 'visible' : ''}`}
        onClick={closeCartModal}
      />
      <div className={`filter-cart ${isCartModalOpen ? 'open' : ''}`}>
        <div className='scrollable-container' key={products.length}>
          {products.length > 0 ? (
            products.flatMap((product, index) => 
              Array(product.quantity || 1).fill(null).map((_, i) => (
                <CartModalItem
                  key={`${index}-${i}`} 
                  product={product}
                  onRemove={() => handleRemove(index)}
                />
              ))
            )
          ) : (
           <div className='flex-center'>
            <p>Your cart is empty</p>
          </div>
          )}
        </div>
        <div className='buttons-container'>
          <div className='divider' />
          <div className='checkout-info'>
            <table>
              <tbody>
                <tr>
                  <td>Shipping:</td>
                  <td>{shippingCost} $</td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>{totalPrice} $</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='checkout-container'>
            <button 
              className='btn-checkout' 
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
            <button 
              className='btn-continue'
              onClick={closeCartModal}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
