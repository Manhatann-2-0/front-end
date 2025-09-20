import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-purple-600">
          Bem vindo ao Order Hub!
        </h1>
        <p className="text-purple-700 text-lg">
          Junte-se a nós e mude o futuro do seu negócio
        </p>
        <Button
          onClick={() => navigate("/login")}
          variant="outline"
          className="border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
        >
          Acesse sua conta
        </Button>
      </div>
    </div>
  );
}
