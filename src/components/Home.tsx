import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-purple-700">
          Bem vindo ao Order Hub!
        </h1>
        <p className="text-purple-700 text-4xl font-semibold">
          Junte-se a nós e mude o futuro do seu negócio 🛒
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate("/login")}
            variant="default"
            className="bg-purple-700 text-xl text-white hover:bg-purple-800 font-semibold px-8 py-3"
          >
            Acesse sua conta
          </Button>
          
        </div>
      </div>
    </div>
  );
}
