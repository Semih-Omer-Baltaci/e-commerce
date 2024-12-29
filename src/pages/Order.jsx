// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import api from "@/api/axios";

import { clearCart } from "@/store/slices/cartSlice";

const cityOptions = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Adana",
  "Antakya",
];

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.cart);

  const [currentStep, setCurrentStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    id: null,
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
  });

  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [isCardFormOpen, setIsCardFormOpen] = useState(false);
  const [cardFormData, setCardFormData] = useState({
    id: null,
    card_no: "",
    expire_month: "",
    expire_year: "",
    name_on_card: "",
  });

  

   
  const fetchAllData = useCallback(async () => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    try {
      await Promise.all([getAddressList(), getCardList()]);
    } catch (err) {
      if (isMounted) {
        console.error("Error fetching data:", err);
        setError("Error fetching addresses or cards.");
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);  

  useEffect(() => {
    if (!user) return;
    fetchAllData();
  }, [fetchAllData, user]);

  const getAddressList = async () => {
    const res = await api.get("/user/address");
    setAddresses(res.data);
  };
  const getCardList = async () => {
    const res = await api.get("/user/card");
    setCards(res.data);
  };

  const handleAddAddress = () => {
    setAddressFormData({
      id: null,
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
    });
    setIsAddressFormOpen(true);
  };
  const handleEditAddress = (addr) => {
    setAddressFormData({
      id: addr.id,
      title: addr.title,
      name: addr.name,
      surname: addr.surname,
      phone: addr.phone,
      city: addr.city,
      district: addr.district,
      neighborhood: addr.neighborhood,
    });
    setIsAddressFormOpen(true);
  };
  const handleDeleteAddress = async (addressId) => {
    try {
      await api.delete(`/user/address/${addressId}`);
      toast.info("Address deleted");
      getAddressList();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Error deleting address");
    }
  };
  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
    toast.info(`Selected address ID: ${addressId}`);
  };
  const handleAddressChange = (e) => {
    setAddressFormData({ ...addressFormData, [e.target.name]: e.target.value });
  };
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      if (addressFormData.id) {
        await api.put("/user/address", addressFormData);
        toast.success("Address updated!");
      } else {
        await api.post("/user/address", addressFormData);
        toast.success("Address added!");
      }
      setIsAddressFormOpen(false);
      getAddressList();
    } catch (err) {
      toast.error("Error saving address");
      console.error(err);
    }
  };

  const handleAddCard = () => {
    setCardFormData({
      id: null,
      card_no: "",
      expire_month: "",
      expire_year: "",
      name_on_card: "",
    });
    setIsCardFormOpen(true);
  };
  const handleEditCard = (cd) => {
    setCardFormData({
      id: cd.id,
      card_no: cd.card_no,
      expire_month: cd.expire_month,
      expire_year: cd.expire_year,
      name_on_card: cd.name_on_card,
    });
    setIsCardFormOpen(true);
  };
  const handleDeleteCard = async (cardId) => {
    try {
      await api.delete(`/user/card/${cardId}`);
      toast.info("Card deleted");
      getCardList();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Error deleting card");
    }
  };
  const handleSelectCard = (cardId) => {
    setSelectedCardId(cardId);
    toast.info(`Selected card ID: ${cardId}`);
  };
  const handleCardChange = (e) => {
    setCardFormData({ ...cardFormData, [e.target.name]: e.target.value });
  };
  const handleCardSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{16}$/.test(cardFormData.card_no)) {
      toast.error("Card number must be 16 digits");
      return;
    }
    const month = parseInt(cardFormData.expire_month, 10);
    const year = parseInt(cardFormData.expire_year, 10);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based

    if (month < 1 || month > 12) {
      toast.error("Invalid expiry month! Must be 1–12.");
      return;
    }

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      toast.error("Card has expired!");
      return;
    }

    try {
      if (cardFormData.id) {
        await api.put("/user/card", cardFormData);
        toast.success("Card updated!");
      } else {
        await api.post("/user/card", cardFormData);
        toast.success("Card added!");
      }
      setIsCardFormOpen(false);
      getCardList();
    } catch (err) {
      toast.error("Error saving card");
      console.error(err);
    }
  };

  const cartTotal = cartItems.reduce((acc, it) => acc + it.product.price * it.count, 0);
  const buildProductsPayload = () =>
    cartItems.map((item) => ({
      product_id: item.product.id,
      count: item.count,
      detail: item.detail || "",
    }));

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      navigate("/shop");
      return;
    }

    if (!selectedAddressId) {
      toast.error("Please select an address first");
      setCurrentStep(1);
      return;
    }
    if (!selectedCardId) {
      toast.error("Please select a card first");
      setCurrentStep(2);
      return;
    }
    const chosenCard = cards.find((c) => c.id === selectedCardId);
    if (!chosenCard) {
      toast.error("Selected card not found");
      setCurrentStep(2);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        address_id: selectedAddressId,
        order_date: new Date().toISOString(),
        card_no: chosenCard.card_no,
        card_name: chosenCard.name_on_card,
        card_expire_month: chosenCard.expire_month,
        card_expire_year: chosenCard.expire_year,
        price: cartTotal,
        products: buildProductsPayload(),
      };
      
      const response = await api.post("/order", payload);
      dispatch(clearCart());
      if (response.data) {
        toast.success("Congrats! Your order has been placed.");
        navigate("/order-success");
      }
    } catch (err) {
      toast.error("Error placing order");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
       
     
        <div className="p-4">Loading address/card data...</div>
      
    );
  }
  if (error) {
    return (
       
      
        <div className="p-4">
          <p>{error}</p>
          <button onClick={fetchAllData} className="bg-blue-500 text-white px-3 py-1 rounded">
            Retry
          </button>
        </div>
      
    );
  }

  const steps = [
    { step: 1, label: "Shipping Address" },
    { step: 2, label: "Payment Method" },
    { step: 3, label: "Review & Place Order" },
  ];

  return (
    
      <div className="px-4 py-6 lg:px-12 font-monts">
        <div className="flex justify-around mb-6">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2
                ${currentStep === s.step ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}
              `}
              >
                {s.step}
              </div>
              <div className="text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <div className="bg-white shadow p-4 rounded mb-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">My Addresses</h2>
              <button
                onClick={handleAddAddress}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Address
              </button>
            </div>

            {addresses.length === 0 ? (
              <p>No addresses found.</p>
            ) : (
              <ul className="space-y-4">
                {addresses.map((addr) => (
                  <li
                    key={addr.id}
                    className="border p-4 rounded flex flex-col md:flex-row justify-between"
                  >
                    <div>
                      <p className="font-semibold">{addr.title}</p>
                      <p>{addr.name} {addr.surname}</p>
                      <p>Phone: {addr.phone}</p>
                      <p>{addr.city}, {addr.district}, {addr.neighborhood}</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2 mt-2 md:mt-0">
                      <button
                        onClick={() => handleSelectAddress(addr.id)}
                        className={`px-3 py-1 rounded text-sm ${selectedAddressId === addr.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                          }`}
                      >
                        {selectedAddressId === addr.id ? "Selected" : "Select"}
                      </button>
                      <button
                        onClick={() => handleEditAddress(addr)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded text-sm hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {isAddressFormOpen && (
              <form onSubmit={handleAddressSubmit} className="mt-4 bg-gray-50 p-4 rounded space-y-3">
                <h3 className="text-md font-semibold">
                  {addressFormData.id ? "Update Address" : "Add Address"}
                </h3>

                <div>
                  <label className="block text-sm font-semibold">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={addressFormData.title}
                    onChange={handleAddressChange}
                    className="border w-full p-1 rounded"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={addressFormData.name}
                      onChange={handleAddressChange}
                      className="border w-full p-1 rounded"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold">Surname</label>
                    <input
                      type="text"
                      name="surname"
                      value={addressFormData.surname}
                      onChange={handleAddressChange}
                      className="border w-full p-1 rounded"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={addressFormData.phone}
                    onChange={handleAddressChange}
                    className="border w-full p-1 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">City</label>
                  <select
                    name="city"
                    value={addressFormData.city}
                    onChange={handleAddressChange}
                    className="border w-full p-1 rounded"
                    required
                  >
                    <option value="">Select city</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold">District</label>
                  <input
                    type="text"
                    name="district"
                    value={addressFormData.district}
                    onChange={handleAddressChange}
                    className="border w-full p-1 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Neighborhood</label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={addressFormData.neighborhood}
                    onChange={handleAddressChange}
                    className="border w-full p-1 rounded"
                    required
                  />
                </div>

                <div className="mt-3">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    {addressFormData.id ? "Update" : "Add"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddressFormOpen(false)}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="text-right mt-6">
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!selectedAddressId}
                className={`px-4 py-2 rounded ${selectedAddressId
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Next Step &rarr;
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white shadow p-4 rounded mb-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Payment Method</h2>
              <button
                onClick={handleAddCard}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Card
              </button>
            </div>

            {cards.length === 0 ? (
              <p>No cards found.</p>
            ) : (
              <ul className="space-y-4">
                {cards.map((cd) => (
                  <li
                    key={cd.id}
                    className="border p-4 rounded flex flex-col md:flex-row justify-between"
                  >
                    <div>
                      <p className="font-semibold">
                        {cd.card_no
                          ? `**** **** **** ${cd.card_no.slice(-4)}`
                          : "No card #"
                        }
                      </p>
                      <p>Expires: {cd.expire_month}/{cd.expire_year}</p>
                      <p>{cd.name_on_card}</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2 mt-2 md:mt-0">
                      <button
                        onClick={() => handleSelectCard(cd.id)}
                        className={`px-3 py-1 rounded text-sm ${selectedCardId === cd.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                          }`}
                      >
                        {selectedCardId === cd.id ? "Selected" : "Select"}
                      </button>
                      <button
                        onClick={() => handleEditCard(cd)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded text-sm hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCard(cd.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {isCardFormOpen && (
              <form onSubmit={handleCardSubmit} className="mt-4 bg-gray-50 p-4 rounded space-y-3">
                <h3 className="text-md font-semibold">
                  {cardFormData.id ? "Update Card" : "Add Card"}
                </h3>

                <div>
                  <label className="block text-sm font-semibold">Card Number</label>
                  <input
                    type="text"
                    name="card_no"
                    value={cardFormData.card_no}
                    onChange={handleCardChange}
                    className="border w-full p-1 rounded"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <div>
                    <label className="block text-sm font-semibold">Expire Month (1-12)</label>
                    <input
                      type="number"
                      name="expire_month"
                      value={cardFormData.expire_month}
                      onChange={handleCardChange}
                      className="border p-1 rounded w-16"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Expire Year (20XX)</label>
                    <input
                      type="number"
                      name="expire_year"
                      value={cardFormData.expire_year}
                      onChange={handleCardChange}
                      className="border p-1 rounded w-16"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold">Name on Card</label>
                  <input
                    type="text"
                    name="name_on_card"
                    value={cardFormData.name_on_card}
                    onChange={handleCardChange}
                    className="border w-full p-1 rounded"
                    required
                  />
                </div>

                <div className="mt-3">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    {cardFormData.id ? "Update" : "Add"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCardFormOpen(false)}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!selectedCardId}
                className={`px-4 py-2 rounded ${selectedCardId
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Next Step &rarr;
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold mb-4">Review &amp; Place Order</h2>

            <div className="mb-4">
              <h3 className="font-semibold">Selected Address ID:</h3>
              <p>{selectedAddressId || "None"}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">Selected Card ID:</h3>
              <p>{selectedCardId || "None"}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Cart Items</h3>
              {cartItems.length === 0 ? (
                <p>Cart is empty.</p>
              ) : (
                <ul className="space-y-2">
                  {cartItems.map((item, i) => (
                    <li key={i} className="border-b pb-2 flex gap-3">
                      <img src={item.product.images[0]?.url} className="w-20 h-20 object-cover rounded" />
                      <div>
                        <p>{item.product.name} x {item.count}</p>
                        <p className="text-sm text-gray-500">
                          ₺{item.product.price} each → ₺{item.product.price * item.count}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2 font-bold">
                Total: ₺{cartTotal}
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                &larr; Back
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    
  );
}

export default Order;
