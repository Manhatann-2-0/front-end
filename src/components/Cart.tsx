import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, ShoppingCart, Send, CheckCircle, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stockQuantity: number;
  isPerecivel?: boolean;
  expirationDate?: string;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface CartItem extends Product {
  quantity: number;
  individualDiscount?: number;
}

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onUpdateIndividualDiscount: (id: string, discountPercent: number) => void;
  onRemoveFromCart: (id: string) => void;
  onSendToTable: () => void;
  onFinalize: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Cart({
  cartItems,
  onUpdateQuantity,
  onUpdateIndividualDiscount,
  onRemoveFromCart,
  onSendToTable,
  onFinalize,
  isOpen,
  onToggle,
}: CartProps) {
  const [discount, setDiscount] = useState(0);

  const subtotalWithoutDiscounts = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const totalIndividualDiscounts = cartItems.reduce((sum, item) => {
    const itemPrice = item.price * item.quantity;
    const itemDiscount = (itemPrice * (item.individualDiscount || 0)) / 100;
    return sum + itemDiscount;
  }, 0);

  const subtotal = subtotalWithoutDiscounts - totalIndividualDiscounts;

  const discountAmount = (subtotal * discount) / 100;

  const totalDiscountsAmount = totalIndividualDiscounts + discountAmount;

  const total = subtotal - discountAmount;

  return (
    <>
      {!isOpen && (
        <div className="fixed top-4 right-4 z-50">
          <div className="relative">
            <Button
              onClick={onToggle}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg"
            >
              <ShoppingCart className="h-6 w-6" />
            </Button>
            {cartItems.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs bg-red-500 text-white border-2 border-white rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </Badge>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-purple-800">
                  Carrinho
                </h2>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800"
                >
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full p-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Carrinho vazio</p>
                  <p className="text-sm">Adicione produtos para começar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => {
                    const itemPrice = item.price * item.quantity;
                    const itemDiscountAmount =
                      (itemPrice * (item.individualDiscount || 0)) / 100;
                    const itemTotal = itemPrice - itemDiscountAmount;

                    return (
                      <Card key={item.id} className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 mr-3">
                            <h3 className="font-medium text-sm">{item.name}</h3>
                            <p className="text-purple-800 font-semibold">
                              R$ {item.price.toFixed(2)} x {item.quantity}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="h-6 w-6 p-0"
                              disabled={item.quantity >= item.stockQuantity}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Input
                            type="number"
                            placeholder="Desc %"
                            value={item.individualDiscount || 0}
                            onChange={(e) =>
                              onUpdateIndividualDiscount(
                                item.id,
                                Number(e.target.value)
                              )
                            }
                            className="w-20 h-6 text-xs"
                            min="0"
                            max="100"
                          />
                          <span className="text-xs text-gray-500">
                            % desconto
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <div>
                            {item.individualDiscount &&
                              item.individualDiscount > 0 && (
                                <div className="text-xs text-gray-500">
                                  Desconto: -R$ {itemDiscountAmount.toFixed(2)}
                                </div>
                              )}
                          </div>
                          <span className="font-medium text-purple-800">
                            R$ {itemTotal.toFixed(2)}
                          </span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 bg-white">
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal (sem descontos)</span>
                    <span>R$ {subtotalWithoutDiscounts.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Total de descontos</span>
                    <span>- R$ {totalDiscountsAmount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-purple-800">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <Input
                  type="number"
                  placeholder="Desconto geral (%)"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full"
                  min="0"
                  max="100"
                />

                <div className="flex gap-2">
                  <Button
                    onClick={onSendToTable}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Mesa
                  </Button>
                  <Button
                    onClick={onFinalize}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Finalizar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
