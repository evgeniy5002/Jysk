import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import chair from '../assets/img/chair.png';
import '../styles/components/CartModal.scss';
import CartModalItem from './CartModalItem';
import { useCartModal } from './CartModalContext';

export default function CartModal() {

const { isCartModalOpen, closeCartModal } = useCartModal();
  const initialProducts = Array(4).fill({
    image: chair,
    name: 'BISTRUP Dining Chair, Olive/Door Oak',
    newPrice: '1 005',
    oldPrice: '1 437',
  });

  const [products, setProducts] = useState(initialProducts);
  const [shippingCost, setShippingCost] = useState(0);

  const handleRemove = (idToRemove) => {
    setProducts(products.filter((_, id) => id !== idToRemove));
  };
  useEffect(() => {
    if (isCartModalOpen) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
    return () => {
      document.body.classList.remove('body-no-scroll');
    };
  }, [isCartModalOpen]);

  const totalPrice = products.reduce((acc, item) => acc + Number(item.newPrice.replace(/\s/g, '')), 0);

  return (
    <>
      <div
        className={`cart-overlay ${isCartModalOpen ? 'visible' : ''}`}
        onClick={closeCartModal}
      />
      <div className={`filter-cart ${isCartModalOpen ? 'open' : ''}`}>
        <div className='scrollable-container'>
          {products.length > 0 ? (
            products.map((product, index) => (
              <CartModalItem
                key={index}
                product={product}
                onRemove={() => handleRemove(index)}
              />
            ))
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
            <button className='btn-checkout'>Checkout</button>
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
