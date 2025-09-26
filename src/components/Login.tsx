import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Header from "./Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/dashboard");
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 p-2 hover:bg-gray-200 rounded-full"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>

          <CardHeader className="space-y-1 text-center pt-12">
            <CardTitle className="text-4xl text-center text-black font-semibold ">
              Entrar
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 flex flex-col gap-4"
            >
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-transparent focus:border-purple-600 focus:ring-0 h-12 rounded-sm placeholder:text-purple-800"
                  style={{ backgroundColor: "#F0EFFF" }}
                ></Input>
              </div>

              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-transparent focus:border-purple-600 focus:ring-0 h-12 rounded-sm placeholder:text-purple-800"
                  style={{ backgroundColor: "#F0EFFF" }}
                />
              </div>

              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-xs text-gray-500  underline"
                  onClick={() => alert("Funcionalidade não implementada")}
                >
                  Esqueceu a senha?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-800 hover:bg-purple-900 h-12 "
                
              >
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
