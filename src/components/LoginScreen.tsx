import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import logo from "../assets/logo.png";


interface LoginScreenProps {
  onLogin: (username: string, password: string) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
}

export function LoginScreen({ onLogin, onForgotPassword, onSignUp }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <img 
            src={logo} 
            alt="FatecReserve" 
            className="h-32 mx-auto mb-6"
          />
          <p className="text-muted-foreground">
            Sistema de Agendamento de Laboratórios – FATEC Campinas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-primary hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-border"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
          >
            Entrar
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Não possui uma conta?{" "}
            <button 
              onClick={onSignUp}
              className="text-primary hover:underline"
            >
              Cadastre-se
            </button>
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Desenvolvido por SmartReserve
          </p>
        </div>
      </div>
    </div>
  );
}
