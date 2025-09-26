import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-purple-600">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl text-center text-purple-700">
            Faça o seu login
          </CardTitle>
          <CardDescription className="text-purple-700 text-1xl">
            Digite suas credenciais para acessar sua conta
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-600 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-purple-600 focus:ring-purple-600 focus:border-purple-600"
              ></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-600 font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-purple-600 focus:ring-purple-600 focus:border-purple-600"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <div>
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700 underline"
              >
                Esqueceu sua senha?
              </a>
            </div>
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-purple-600 hover:text-purple-700 underline"
              >
                Voltar para a página inicial
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
