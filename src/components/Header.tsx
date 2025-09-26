import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row  items-center ml-4 font-semibold">
      <Button
        variant={"ghost"}
        className="text-4xl p-0 h-auto hover:bg-transparent focus:ring-0 shadow-none border-none bg-transparent mt-1 cursor-pointer hover:text-purple-800"
        onClick={() => navigate("/")}
      >
        OrderHub
      </Button>{" "}
    </div>
  );
}
