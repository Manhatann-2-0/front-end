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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Phone,
  Mail,
  UserCircle,
  AlertTriangle,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  avatar?: string;
  status: "active" | "inactive";
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@orderhub.com",
    phone: "(11) 99999-1234",
    position: "Gerente",
    status: "active",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@orderhub.com",
    phone: "(11) 99999-5678",
    position: "Cozinheiro",
    status: "active",
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@orderhub.com",
    phone: "(11) 99999-9012",
    position: "Garçom",
    status: "active",
  },
  {
    id: "4",
    name: "Ana Lima",
    email: "ana.lima@orderhub.com",
    phone: "(11) 99999-3456",
    position: "Atendente",
    status: "inactive",
  },
  {
    id: "5",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@orderhub.com",
    phone: "(11) 99999-7890",
    position: "Auxiliar de Cozinha",
    status: "active",
  },
  {
    id: "6",
    name: "Beatriz Ferreira",
    email: "beatriz.ferreira@orderhub.com",
    phone: "(11) 99999-2468",
    position: "Supervisora",
    status: "active",
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getPositionColor = (position: string) => {
  const colors = {
    Gerente: "bg-purple-100 text-purple-800",
    Supervisora: "bg-purple-100 text-purple-800",
    Cozinheiro: "bg-blue-100 text-blue-800",
    "Auxiliar de Cozinha": "bg-blue-100 text-blue-800",
    Garçom: "bg-green-100 text-green-800",
    Atendente: "bg-yellow-100 text-yellow-800",
  };
  return colors[position as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export default function Employee() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const [editForm, setEditForm] = useState<Partial<Employee>>({});
  const [addForm, setAddForm] = useState<Partial<Employee>>({
    status: "active",
  });

  const positions = [
    "Gerente",
    "Supervisora",
    "Cozinheiro",
    "Auxiliar de Cozinha",
    "Garçom",
    "Atendente",
  ];

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id));
      setDeleteDialogOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditForm({ ...employee });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedEmployee && editForm) {
      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmployee.id ? { ...emp, ...editForm } : emp
        )
      );
      setEditDialogOpen(false);
      setSelectedEmployee(null);
      setEditForm({});
    }
  };

  const handleAdd = () => {
    setAddForm({ status: "active" });
    setAddDialogOpen(true);
  };

  const handleSaveAdd = () => {
    if (addForm.name && addForm.email && addForm.phone && addForm.position) {
      const newEmployee: Employee = {
        id: (employees.length + 1).toString(),
        name: addForm.name,
        email: addForm.email,
        phone: addForm.phone,
        position: addForm.position,
        status: addForm.status || "active",
      };
      setEmployees([...employees, newEmployee]);
      setAddDialogOpen(false);
      setAddForm({ status: "active" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-800">
            Gestão de Funcionários
          </h1>
          <p className="text-gray-600">Gerencie sua equipe de trabalho</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-purple-800 hover:bg-purple-900"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Funcionário
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Funcionários
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">
              {employees.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Funcionários Ativos
            </CardTitle>
            <UserCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {employees.filter((emp) => emp.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Cargos Diferentes
            </CardTitle>
            <Badge className="h-4 w-4 bg-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">
              {new Set(employees.map((emp) => emp.position)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-purple-800">
                Lista de Funcionários
              </CardTitle>
              <CardDescription>
                Gerencie informações dos seus funcionários
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar funcionário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-500 py-8"
                  >
                    Nenhum funcionário encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback className="bg-purple-100 text-purple-800 text-xs font-semibold">
                            {getInitials(employee.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{employee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{employee.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{employee.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPositionColor(employee.position)}>
                        {employee.position}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === "active" ? "default" : "secondary"
                        }
                        className={
                          employee.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {employee.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEdit(employee)}
                            className="cursor-pointer"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(employee)}
                            className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Deletar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary */}
      {filteredEmployees.length > 0 && (
        <div className="text-sm text-gray-500 text-center">
          Mostrando {filteredEmployees.length} de {employees.length}{" "}
          funcionários
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Tem certeza que deseja deletar o funcionário{" "}
              <span className="font-semibold text-gray-900">
                {selectedEmployee?.name}
              </span>
              ? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-gray-300"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Deletar Funcionário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-purple-800">
              Editar Funcionário
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Atualize as informações do funcionário abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-purple-700 font-medium">
                Nome
              </Label>
              <Input
                id="name"
                value={editForm.name || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="border-purple-200 focus:border-purple-600 focus:ring-purple-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-purple-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={editForm.email || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="border-purple-200 focus:border-purple-600 focus:ring-purple-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-purple-700 font-medium">
                Telefone
              </Label>
              <Input
                id="phone"
                value={editForm.phone || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                className="border-purple-200 focus:border-purple-600 focus:ring-purple-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position" className="text-purple-700 font-medium">
                Cargo
              </Label>
              <Select
                value={editForm.position || ""}
                onValueChange={(value) =>
                  setEditForm({ ...editForm, position: value })
                }
              >
                <SelectTrigger className="border-purple-200 focus:border-purple-600 focus:ring-purple-600">
                  <SelectValue placeholder="Selecione um cargo" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status" className="text-purple-700 font-medium">
                Status
              </Label>
              <Select
                value={editForm.status || ""}
                onValueChange={(value) =>
                  setEditForm({
                    ...editForm,
                    status: value as "active" | "inactive",
                  })
                }
              >
                <SelectTrigger className="border-purple-200 focus:border-purple-600 focus:ring-purple-600">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="border-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-purple-800 hover:bg-purple-900"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Employee Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-purple-800">
              Adicionar Novo Funcionário
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Preencha as informações do novo funcionário.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="add-name" className="text-purple-700 font-medium">
                Nome *
              </Label>
              <Input
                id="add-name"
                value={addForm.name || ""}
                onChange={(e) =>
                  setAddForm({ ...addForm, name: e.target.value })
                }
                placeholder="Digite o nome completo"
                className="border-purple-200 focus:border-purple-600 focus:ring-purple-600"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="add-email"
                className="text-purple-700 font-medium"
              >
                Email *
              </Label>
              <Input
                id="add-email"
                type="email"
                value={addForm.email || ""}
                onChange={(e) =>
                  setAddForm({ ...addForm, email: e.target.value })
                }
                placeholder="exemplo@orderhub.com"
                className="border-purple-200 focus:border-purple-600 focus:ring-purple-600"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="add-phone"
                className="text-purple-700 font-medium"
              >
                Telefone *
              </Label>
              <Input
                id="add-phone"
                value={addForm.phone || ""}
                onChange={(e) =>
                  setAddForm({ ...addForm, phone: e.target.value })
                }
                placeholder="(11) 99999-9999"
                className="border-purple-200 focus:border-purple-600 focus:ring-purple-600"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="add-position"
                className="text-purple-700 font-medium"
              >
                Cargo *
              </Label>
              <Select
                value={addForm.position || ""}
                onValueChange={(value) =>
                  setAddForm({ ...addForm, position: value })
                }
              >
                <SelectTrigger className="border-purple-200 focus:border-purple-600 focus:ring-purple-600">
                  <SelectValue placeholder="Selecione um cargo" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="add-status"
                className="text-purple-700 font-medium"
              >
                Status
              </Label>
              <Select
                value={addForm.status || "active"}
                onValueChange={(value) =>
                  setAddForm({
                    ...addForm,
                    status: value as "active" | "inactive",
                  })
                }
              >
                <SelectTrigger className="border-purple-200 focus:border-purple-600 focus:ring-purple-600">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setAddDialogOpen(false);
                setAddForm({ status: "active" });
              }}
              className="border-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveAdd}
              disabled={
                !addForm.name ||
                !addForm.email ||
                !addForm.phone ||
                !addForm.position
              }
              className="bg-purple-800 hover:bg-purple-900 disabled:bg-gray-400"
            >
              Adicionar Funcionário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
