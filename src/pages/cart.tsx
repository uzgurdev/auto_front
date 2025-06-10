import { FormEvent, useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";

import CART from "../assets/images/cart.png";
import { Icon, Modal } from "components";

import "../assets/styles/animations.css";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Store } from "store";
import { UIActions } from "store/slices";
import { CartApi } from "modules";
import { StorageManager } from "utils";

export default function CartPage() {
  const { languages, cart } = useSelector((state: RootState) => state.ui);  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted] = useState(true);  const [{ isSubmitting }, setState] = useState({
    isSubmitting: false,
  });

  const inputs = useRef([
    {
      label: "Haridor ism-sharifi",
      name: "name",
      placeholder: "Ism familiyangizni kiriting",
      icon: "icon-person",
      type: "text",
    },
    {
      label: "Telefon raqam",
      name: "phone",
      placeholder: "Telefon raqamingizni kiriting",
      icon: "icon-phone-outline",
      type: "tel",
    },
    {
      label: "Telegram/WhatsApp username",
      name: "telegramUsername",
      placeholder: "Telegram/WhatsApp usernameingizni kiriting",
      icon: "icon-mail",
      type: "email",
    },
    {
      label: "Manzil",
      name: "location",
      placeholder: "Manzilingizni kiriting",
      icon: "icon-location",
      type: "text",
    },
  ]);  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await CartApi.CartApi.cart();
        console.log('Cart data:', response.data);
        // Store.dispatch(UIActions.setCart(response.data));
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCartItems();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ e, target: e.currentTarget });
    if (!isSubmitted) return;
    try {
      setState((prev) => ({ ...prev, isSubmitting: true }));
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      console.log({ formData, dataObj: data });
      const response = await CartApi.CartApi.submitOrder(data);
      Store.dispatch(UIActions.setCart([]));
      StorageManager.del("cart");

      console.log({ data: response.data });
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    Store.dispatch(
      UIActions.setProductsCountInCart({ id, count: newQuantity })
    );
  };

  const removeItem = (id: string) => {
    Store.dispatch(UIActions.setProductsCountInCart({ id, count: 0 }));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <h1 className="mb-8 text-text-secondary text-[28px] font-[400]">Savat</h1>
      {cart.length === 0 ? (
        <div className="text-center py-16 w-full">
          <img src={CART} alt="cart" className="mx-auto mb-[70px]" />
          <p className="text-text-secondary opacity-35 mt-2 text-[22px] font-[400]">
            <Link to={`/${languages}/products`} className="underline">
              Mahsulotlar
            </Link>
            sahifasiga qaytib o’zingizga <br /> kerakli mahsulotlarni qo’shing
          </p>
        </div>
      ) : (
        // <div className="grid grid-cols-[800px_400px] gap-8">
        <div className="grid  gap-8">
          <div className="">
            <div className="bg-white rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td className=" py-4 whitespace-nowrap">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-[150px] w-[150px]">
                            <img
                              src={item.image}
                              alt={item.name}
                              width={150}
                              height={150}
                              className="rounded-[15px] overflow-hidden object-cover w-[150px] h-[150px]"
                            />
                          </div>
                          <div className="ml-4 font-Poppins">
                            <p className="text-2xl font-[600] text-text-secondary">
                              {item.name}
                            </p>
                            <p className="text-lg font-medium text-text-secondary opacity-70">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end font-Poppins text-[24px]">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.count - 1)
                            }
                            className="bg-bg-secondary w-7 h-7 flex items-center justify-center rounded-[5px]"
                          >
                            <Minus
                              className="h-6 w-6"
                              color="var(--color-primary)"
                            />
                          </button>
                          <span className="mx-2 min-w-[10px] text-gray-700">
                            {item.count}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.count + 1)
                            }
                            className="bg-bg-secondary w-7 h-7 flex items-center justify-center rounded-[5px]"
                          >
                            <Plus
                              className="h-6 w-6"
                              color="var(--color-primary)"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 my-auto flex items-center justify-end whitespace-nowrap text-[24px] font-[500] font-Poppins h-full pt-[70px]">
                        <p className="min-h-full mt-1/2 text-2xl text-text-secondary">
                          ${item.price.toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Icon.Icon
                            icon="icon-bin"
                            size="sm"
                            iconSize="w-4 h-4"
                            color="var(--color-primary)"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between text-lg mt-4 border-b-[3px] border-dashed font-Poppins font-[500] text-7 pb-[20px]">
                <p className="text-[28px]">
                  Jami <br />
                  <span className="text-2xl text-text-secondary opacity-50">
                    {cart.length} ta mahsulot
                  </span>
                </p>
                <span className="text-[26px]">${total.toFixed(2)}</span>
              </div>
              <button
                className="w-full mt-6 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300 text-2xl outline-none"
                onClick={() => setIsModalOpen(true)}
              >
                Rasmiylashtirish
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal.Modal
          classes={!isSubmitted ? "grid place-items-center" : ""}
          onClose={() => setIsModalOpen(!isModalOpen)}
        >
          <p
            className={`modal font-Poppins font-normal text-2xl ${
              !isSubmitted && "text-center"
            }`}
          >
            {!isSubmitted
              ? "Buyurtmangiz rasmiylashtirildi"
              : "Rasmiylashtirish"}
          </p>
          {isSubmitted ? (
            <form
              action="submit"
              className="font-Poppins font-normal mt-5"
              onSubmit={handleSubmit}
            >
              {inputs.current.map((input) => (
                <div className="mt-[10px]">
                  <label htmlFor={input.name} className="text-sm">
                    {input.label}
                  </label>
                  <div className="input flex items-center justify-between shadow w-full h-[50px] py-4 px-5 rounded-[25px] mt-[10px]">
                    <input
                      type={input.type}
                      required
                      autoComplete="off"
                      name={input.name}
                      id={input.name}
                      placeholder={input.placeholder}
                      className="outline-none w-[90%]"
                    />
                    <Icon.Icon
                      icon={input.icon as Icon.IconType.IconNames}
                      size="sm"
                      iconSize="18px"
                      color="var(--color-text-muted)"
                    />
                  </div>
                </div>
              ))}              <button 
                className="submit mt-5 w-full bg-primary text-bg-primary h-[50px] rounded-full text-sm outline-none disabled:opacity-50" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Rasmiylashtirilmoqda..." : "Rasmiylashtirish"}
              </button>
            </form>
          ) : (
            <div className="relative w-52 h-52 m-auto">
              <div className="circle-bg circle-bg5"></div>
              <div className="circle-bg circle-bg4"></div>
              <div className="circle-bg circle-bg3"></div>
              <div className="circle-bg circle-bg2"></div>
              <div className="circle-bg"></div>

              <svg
                width="180"
                height="180"
                viewBox="0 0 180 180"
                fill="none"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[185px] h-w-[185px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="checkmark-check"
                  d="M30.9375 98.4375L70.3125 137.812L149.062 53.4375"
                  stroke="white"
                  stroke-width="13"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}

          {!isSubmitted && (
            <Link
              to={`/${languages}/products`}
              className="underline text-text-muted block"
            >
              Xaridni davom ettirish
            </Link>
          )}
        </Modal.Modal>
      )}
    </div>
  );
}
