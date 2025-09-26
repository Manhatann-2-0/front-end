import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";
import {
  Users,
  LogOut,
  ChartArea,
  Package,
  HandCoins,
  Store,
  Truck,
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const mockUser = {
  name: "Daniela Pool Rojas",
  displayName: "", 
  initials: "", 
};

// Gera nome e iniciais usando apenas os 2 primeiros nomes
const nameArray = mockUser.name.split(" ").slice(0, 2);
mockUser.displayName = nameArray.join(" ");
mockUser.initials = nameArray.map((n) => n[0]).join("");

const dashItens = [
  {
    title: "Dashboards",
    url: "/dashboard",
    icon: ChartArea,
  },
];

const manageItems = [
  {
    title: "Funcionários",
    url: "/",
    icon: Users,
  },

  {
    title: "Estoque",
    url: "/",
    icon: Package,
  },

  {
    title: "Caixa",
    url: "/",
    icon: HandCoins,
  },
];

const orderItems = [
  {
    title: "Balcão",
    url: "/",
    icon: Store,
  },
  {
    title: "Delivery",
    url: "/",
    icon: Truck,
  },
];


export default function SidebarInternal() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpar localStorage/sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Limpar cookies se necessário
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Redirecionar para a página inicial
    navigate("/");
  };

  return (
    <Sidebar className="border-r border-purple-200">
      <SidebarHeader className="border-b border-purple-200 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">OH</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-purple-800">OrderHub</h2>
            <p className="text-sm text-gray-600">Sistema de Pedidos</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-800 font-semibold">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashItens.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-purple-50 hover:text-purple-800 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-800"
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-800 font-semibold">
            Pedidos
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {orderItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-purple-50 hover:text-purple-800 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-800"
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-800 font-semibold">
            Gestão
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {manageItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-purple-50 hover:text-purple-800 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-800"
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

     
      </SidebarContent>

      <SidebarFooter className="border-t border-purple-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-800 font-medium text-xs">
              {mockUser.initials}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {mockUser.displayName}
            </p>
            <p className="text-xs text-gray-500">Usuário</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-purple-800 hover:bg-purple-50 hover:text-purple-800"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

// Componente wrapper para usar a sidebar
export function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <SidebarInternal />
        <main className="flex-1 flex flex-col">
          <div className="border-b border-purple-200 p-2">
            <SidebarTrigger className="text-purple-800 hover:bg-purple-50" />
          </div>
          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
