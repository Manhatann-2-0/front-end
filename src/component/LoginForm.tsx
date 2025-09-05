import React from "react";

const LoginForm: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <form className="bg-primary p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center mb-4 font-poppins">
          Login
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-poppins text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 font-poppins"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-poppins text-sm">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 font-poppins"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 rounded font-poppins transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
