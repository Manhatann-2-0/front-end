import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Activity,
  BarChart3,
} from "lucide-react";

// Dados mockados
const salesData = [
  { month: "Jan", revenue: 4500, orders: 124 },
  { month: "Fev", revenue: 5200, orders: 142 },
  { month: "Mar", revenue: 4800, orders: 138 },
  { month: "Abr", revenue: 6100, orders: 165 },
  { month: "Mai", revenue: 5900, orders: 158 },
  { month: "Jun", revenue: 7200, orders: 195 },
];

const topProducts = [
  { name: "Pizza Margherita", sales: 156, revenue: 2340 },
  { name: "Hambúrguer Clássico", sales: 134, revenue: 2010 },
  { name: "Lasanha Bolonhesa", sales: 98, revenue: 1960 },
  { name: "Salada Caesar", sales: 87, revenue: 1305 },
  { name: "Batata Frita", sales: 203, revenue: 1218 },
];

const recentOrders = [
  {
    id: "#1234",
    customer: "João Silva",
    total: 45.9,
    status: "completed",
    time: "2 min",
  },
  {
    id: "#1235",
    customer: "Maria Santos",
    total: 32.5,
    status: "preparing",
    time: "5 min",
  },
  {
    id: "#1236",
    customer: "Pedro Costa",
    total: 67.8,
    status: "pending",
    time: "8 min",
  },
  {
    id: "#1237",
    customer: "Ana Lima",
    total: 28.9,
    status: "completed",
    time: "12 min",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-800">Dashboard</h1>
          <p className="text-gray-600">Visão geral do seu negócio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-purple-800 hover:bg-purple-900">
            Novo Pedido
          </Button>
        </div>
      </div>

      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Receita Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">R$ 33.700</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% em relação ao mês passado
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pedidos
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">1,024</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% em relação ao mês passado
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Clientes Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">573</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2.1% em relação ao mês passado
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Produtos Vendidos
            </CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">2,847</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.3% em relação ao mês passado
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart de Vendas Mockado */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-purple-800">Receita Mensal</CardTitle>
            <CardDescription>
              Evolução da receita nos últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end justify-between gap-2 px-4">
              {salesData.map((data) => (
                <div
                  key={data.month}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="text-xs text-gray-600">
                    R$ {(data.revenue / 1000).toFixed(1)}k
                  </div>
                  <div
                    className="bg-purple-200 hover:bg-purple-300 transition-colors rounded-t w-12 min-h-[20px]"
                    style={{
                      height: `${(data.revenue / 7200) * 200}px`,
                    }}
                  />
                  <div className="text-xs font-medium text-gray-700">
                    {data.month}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">
                  Tendência positiva
                </span>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                +18.5% crescimento
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Produtos Mais Vendidos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-800">Top Produtos</CardTitle>
            <CardDescription>Produtos mais vendidos este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
                      <span className="text-sm font-medium text-purple-800">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        {product.sales} vendas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">R$ {product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pedidos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-800">Pedidos Recentes</CardTitle>
          <CardDescription>Últimos pedidos realizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.customer}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge
                    variant={
                      order.status === "completed"
                        ? "default"
                        : order.status === "preparing"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "preparing"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {order.status === "completed"
                      ? "Concluído"
                      : order.status === "preparing"
                      ? "Preparando"
                      : "Pendente"}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      R$ {order.total.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">há {order.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
