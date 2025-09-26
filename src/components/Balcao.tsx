import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Utensils,
  Coffee,
  Pizza,
  Sandwich,
  IceCream,
  X,
  Package,
  AlertTriangle,
  Clock,
  Search,
} from "lucide-react";
import Cart from "./Cart";
import { useSidebar } from "./ui/sidebar";

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

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Pizza Margherita",
    description: "Molho de tomate, mussarela e manjericão fresco",
    price: 28.9,
    category: "Pizza",
    stockQuantity: 15,
    isPerecivel: false,
    ingredients: [
      "Massa",
      "Molho de tomate",
      "Mussarela",
      "Manjericão",
      "Azeite",
    ],
    nutritionalInfo: { calories: 250, protein: 12, carbs: 30, fat: 8 },
  },
  {
    id: "2",
    name: "Hambúrguer Artesanal",
    description: "Pão brioche, carne 150g, queijo, alface e tomate",
    price: 22.5,
    category: "Sanduíche",
    stockQuantity: 8,
    isPerecivel: true,
    expirationDate: "2025-09-27",
    ingredients: [
      "Pão brioche",
      "Carne bovina 150g",
      "Queijo cheddar",
      "Alface",
      "Tomate",
    ],
    nutritionalInfo: { calories: 450, protein: 28, carbs: 35, fat: 22 },
  },
  {
    id: "3",
    name: "Lasanha à Bolonhesa",
    description: "Massa fresca, molho bolonhesa e queijo gratinado",
    price: 24.9,
    category: "Massas",
    stockQuantity: 12,
    isPerecivel: true,
    expirationDate: "2025-09-26",
    ingredients: [
      "Massa de lasanha",
      "Carne moída",
      "Molho de tomate",
      "Queijo",
      "Cebola",
    ],
    nutritionalInfo: { calories: 380, protein: 22, carbs: 28, fat: 18 },
  },
  {
    id: "4",
    name: "Salada Caesar",
    description: "Alface americana, croutons, parmesão e molho caesar",
    price: 18.9,
    category: "Saladas",
    stockQuantity: 5,
    isPerecivel: true,
    expirationDate: "2025-09-25",
    ingredients: [
      "Alface americana",
      "Croutons",
      "Parmesão",
      "Molho caesar",
      "Anchova",
    ],
    nutritionalInfo: { calories: 180, protein: 8, carbs: 12, fat: 12 },
  },
  {
    id: "5",
    name: "Espresso",
    description: "Café expresso tradicional",
    price: 4.5,
    category: "Bebidas",
    stockQuantity: 25,
    isPerecivel: false,
    ingredients: ["Café torrado", "Água"],
    nutritionalInfo: { calories: 2, protein: 0, carbs: 0, fat: 0 },
  },
  {
    id: "6",
    name: "Suco Natural",
    description: "Suco de laranja natural",
    price: 7.9,
    category: "Bebidas",
    stockQuantity: 3,
    isPerecivel: true,
    expirationDate: "2025-09-30",
    ingredients: ["Laranja", "Água", "Açúcar"],
    nutritionalInfo: { calories: 110, protein: 2, carbs: 26, fat: 0 },
  },
  {
    id: "7",
    name: "Sorvete Napolitano",
    description: "3 bolas de sorvete: chocolate, morango e baunilha",
    price: 12.9,
    category: "Sobremesas",
    stockQuantity: 20,
    isPerecivel: true,
    expirationDate: "2025-12-15",
    ingredients: [
      "Leite",
      "Açúcar",
      "Chocolate",
      "Morango",
      "Baunilha",
      "Creme",
    ],
    nutritionalInfo: { calories: 280, protein: 5, carbs: 35, fat: 14 },
  },
  {
    id: "8",
    name: "Pizza Calabresa",
    description: "Molho de tomate, mussarela, calabresa e cebola",
    price: 32.9,
    category: "Pizza",
    stockQuantity: 10,
    isPerecivel: false,
    ingredients: [
      "Massa",
      "Molho de tomate",
      "Mussarela",
      "Calabresa",
      "Cebola",
    ],
    nutritionalInfo: { calories: 320, protein: 18, carbs: 32, fat: 14 },
  },
];

const categories = [
  { name: "Todos", icon: Utensils },
  { name: "Pizza", icon: Pizza },
  { name: "Sanduíche", icon: Sandwich },
  { name: "Massas", icon: Utensils },
  { name: "Saladas", icon: Utensils },
  { name: "Bebidas", icon: Coffee },
  { name: "Sobremesas", icon: IceCream },
];

const getCategoryIcon = (category: string) => {
  const categoryData = categories.find((cat) => cat.name === category);
  return categoryData ? categoryData.icon : Utensils;
};

const getExpirationStatus = (expirationDate?: string) => {
  if (!expirationDate) return null;

  const today = new Date();
  const expDate = new Date(expirationDate);
  const diffDays = Math.ceil(
    (expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0)
    return {
      status: "expired",
      text: "Vencido",
      color: "bg-red-100 text-red-800",
    };
  if (diffDays <= 2)
    return {
      status: "expiring",
      text: "Vence em breve",
      color: "bg-yellow-100 text-yellow-800",
    };
  if (diffDays <= 7)
    return {
      status: "warning",
      text: "Próximo ao vencimento",
      color: "bg-orange-100 text-orange-800",
    };

  return null;
};

const getStockBadgeColor = (quantity: number) => {
  if (quantity === 0) return "bg-red-100 text-red-800";
  if (quantity <= 5) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
};

export default function Balcao() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { setOpenMobile, setOpen, isMobile } = useSidebar();

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;

    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setIsCartOpen(true);
        if (isMobile) {
          setOpenMobile(false);
        } else {
          setOpen(false);
        }
        return updatedItems;
      }
      const newItems = [
        ...prevItems,
        { ...product, quantity: 1, individualDiscount: 0 },
      ];
      setIsCartOpen(true);
      if (isMobile) {
        setOpenMobile(false);
      } else {
        setOpen(false);
      }
      return newItems;
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const updateIndividualDiscount = (id: string, discountPercent: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, individualDiscount: discountPercent } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  const handleSendToTable = () => {
    console.log("Enviando para mesa:", cartItems);
    alert("Pedido enviado para a mesa!");
  };

  const handleFinalize = () => {
    console.log("Finalizando pedido:", cartItems);
    alert("Pedido finalizado!");
    setCartItems([]);
  };

  const toggleCart = () => {
    const newCartState = !isCartOpen;
    setIsCartOpen(newCartState);

    if (newCartState) {
      if (isMobile) {
        setOpenMobile(false);
      } else {
        setOpen(false);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <div className={`flex-1 p-2 sm:p-4 lg:p-6 ${isCartOpen ? "" : "w-full"}`}>
        <div className="mb-4 lg:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-800">
                Balcão
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Selecione os produtos para o pedido
              </p>
            </div>

            <div className="flex-shrink-0 w-full sm:w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Pesquisar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {searchTerm && (
            <p className="text-xs text-gray-500">
              {filteredProducts.length} produto(s) encontrado(s)
            </p>
          )}
        </div>

        <div className="mb-4 lg:mb-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-1 sm:gap-2 pb-2 sm:pb-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.name}
                    variant={
                      selectedCategory === category.name ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category.name)}
                    className={
                      selectedCategory === category.name
                        ? "bg-purple-800 hover:bg-purple-900 text-xs sm:text-sm whitespace-nowrap"
                        : "hover:bg-purple-50 hover:text-purple-800 text-xs sm:text-sm whitespace-nowrap"
                    }
                    size="sm"
                  >
                    <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-4">
            {filteredProducts.map((product) => {
              const IconComponent = getCategoryIcon(product.category);
              const expirationStatus = getExpirationStatus(
                product.expirationDate
              );
              const stockColor = getStockBadgeColor(product.stockQuantity);

              return (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="h-5 w-5 text-purple-600" />
                      <div className="flex gap-1">
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-800 text-xs"
                        >
                          {product.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge className={`text-xs ${stockColor}`}>
                        <Package className="h-3 w-3 mr-1" />
                        {product.stockQuantity} em estoque
                      </Badge>

                      {product.isPerecivel && expirationStatus && (
                        <Badge className={`text-xs ${expirationStatus.color}`}>
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {expirationStatus.text}
                        </Badge>
                      )}
                    </div>

                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-800">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        className="bg-purple-800 hover:bg-purple-900"
                        disabled={product.stockQuantity === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      <Cart
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onUpdateIndividualDiscount={updateIndividualDiscount}
        onRemoveFromCart={removeFromCart}
        onSendToTable={handleSendToTable}
        onFinalize={handleFinalize}
        isOpen={isCartOpen}
        onToggle={toggleCart}
      />

      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent className="max-w-lg">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-purple-800">
                  {selectedProduct.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedProduct.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-800">
                    R$ {selectedProduct.price.toFixed(2)}
                  </span>
                  <Badge className="bg-purple-100 text-purple-800">
                    {selectedProduct.category}
                  </Badge>
                </div>

                {selectedProduct.ingredients && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Ingredientes</h4>
                    <p className="text-sm text-gray-600">
                      {selectedProduct.ingredients.join(", ")}
                    </p>
                  </div>
                )}

                {selectedProduct.nutritionalInfo && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      Informação Nutricional
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedProduct.nutritionalInfo.calories} kcal •{" "}
                      {selectedProduct.nutritionalInfo.protein}g proteína •{" "}
                      {selectedProduct.nutritionalInfo.carbs}g carboidratos •{" "}
                      {selectedProduct.nutritionalInfo.fat}g gordura
                    </p>
                  </div>
                )}

                {selectedProduct.isPerecivel &&
                  selectedProduct.expirationDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>Validade: {selectedProduct.expirationDate}</span>
                    </div>
                  )}

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setProductDialogOpen(false)}
                  >
                    Fechar
                  </Button>
                  <Button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setProductDialogOpen(false);
                    }}
                    className="bg-purple-800 hover:bg-purple-900"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
