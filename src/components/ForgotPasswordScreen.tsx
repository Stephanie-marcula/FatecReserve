import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import logo from "../assets/logo.png";
import { toast } from "sonner";

interface ForgotPasswordScreenProps {
  onBack: () => void;
}

export function ForgotPasswordScreen({ onBack }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes("@")) {
      toast.error("Por favor, insira um email válido");
      return;
    }

    // Mock sending reset email
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success("Email de recuperação enviado!");
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4CAF50] rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-foreground mb-2">Email Enviado!</h1>
            <p className="text-muted-foreground">
              Enviamos as instruções para redefinir sua senha para:
            </p>
            <p className="text-foreground mt-2">{email}</p>
          </div>

          <div className="bg-muted p-6 rounded-lg mb-6">
            <div className="flex items-start gap-3 text-left">
              <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="mb-2">
                  Verifique sua caixa de entrada e spam. O email pode levar 
                  alguns minutos para chegar.
                </p>
                <p className="text-sm text-muted-foreground">
                  Não recebeu? Verifique se o email está correto ou tente novamente.
                </p>
              </div>
            </div>
          </div>

          <Button 
            onClick={onBack}
            className="w-full bg-primary hover:bg-primary/90 mb-4"
          >
            Voltar para Login
          </Button>

          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="w-full"
          >
            Tentar Outro Email
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para login
        </Button>

        <div className="text-center mb-8">
          <img 
            src={logo} 
            alt="FatecReserve" 
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-foreground mb-2">Esqueci Minha Senha</h1>
          <p className="text-muted-foreground">
            Insira seu email institucional para receber as instruções de 
            recuperação de senha
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Institucional</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.nome@fatec.sp.gov.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-border"
              required
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Importante:</strong> Use o email institucional cadastrado 
              no sistema. Emails externos não são aceitos para recuperação de senha.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
          >
            Enviar Instruções
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Lembrou sua senha?{" "}
            <button 
              onClick={onBack}
              className="text-primary hover:underline"
            >
              Faça login
            </button>
          </p>
        </div>

        <div className="mt-8">
          <div className="border-t border-border pt-6">
            <h3 className="text-sm mb-3 text-foreground">Precisa de ajuda?</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Entre em contato com a secretaria da FATEC Campinas
              </p>
              <p>
                • Telefone: (19) 3756-5000
              </p>
              <p>
                • Email: secretaria@fatec.sp.gov.br
              </p>
            </div>
          </div>
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
