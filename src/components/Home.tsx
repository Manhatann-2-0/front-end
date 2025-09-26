import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-purple-600">
          Bem vindo ao Order Hub!
        </h1>
        <p className="text-purple-700 text-4xl">
          Junte-se a nós e mude o futuro do seu negócio 🛒
        </p>
        <Button
          onClick={() => navigate("/login")}
          variant="default"
          className="bg-purple-500 text-2xl text-white hover:bg-purple-700"
        >
          Acesse sua conta
        </Button>
      </div>
    </div>
  );
}
