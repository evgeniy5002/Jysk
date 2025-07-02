import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();
export function CheckoutProvider({ children }) {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", city: "",
    street: "", houseNumber: "", email: "", phone: ""
  });

  const [deliveryData, setDeliveryData] = useState({
    selectedDelivery: null,
    selectedBranch: null,
    postalCode: ""
  });

  const [paymentData, setPaymentData] = useState({ 
    method: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <CheckoutContext.Provider
      value={{
        formData, setFormData,
        acceptedTerms, setAcceptedTerms,
        deliveryData, setDeliveryData,
        paymentData, setPaymentData,
        totalAmount, setTotalAmount 
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}
