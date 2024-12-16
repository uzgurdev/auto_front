import { useState } from "react";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Summer T-Shirt",
    price: 19.99,
    quantity: 2,
    image: "https://via.placeholder.com/250x220",
  },
  {
    id: 2,
    name: "Winter Jacket",
    price: 89.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mt-2">
            Looks like you haven't added any items to your cart yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-20 w-20">
                            <img
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="rounded-md"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-2 text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
