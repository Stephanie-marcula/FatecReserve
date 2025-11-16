import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft } from "lucide-react";
import logo from "../assets/logo.png";
import { toast } from "sonner";

interface SignUpScreenProps {
  onBack: () => void;
  onSignUpSuccess: () => void;
}

export function SignUpScreen({ onBack, onSignUpSuccess }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    ra: "",
    course: "",
    password: "",
    confirmPassword: "",
    userType: "student",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Email inválido");
      return;
    }

    // Mock registration success
    toast.success("Cadastro realizado com sucesso! Faça login para continuar.");
    setTimeout(() => {
      onSignUpSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-2xl">
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
          <h1 className="text-foreground mb-2">Criar Conta</h1>
          <p className="text-muted-foreground">
            Preencha os dados para se cadastrar no FatecReserve
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome Completo */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="fullName">Nome Completo *</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="border-border"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Institucional *</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.nome@fatec.sp.gov.br"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border-border"
                required
              />
            </div>

            {/* RA */}
            <div className="space-y-2">
              <Label htmlFor="ra">RA (Registro Acadêmico) *</Label>
              <Input
                id="ra"
                type="text"
                placeholder="Ex: 1234567890"
                value={formData.ra}
                onChange={(e) => setFormData({...formData, ra: e.target.value})}
                className="border-border"
                required
              />
            </div>

            {/* Curso */}
            <div className="space-y-2">
              <Label htmlFor="course">Curso *</Label>
              <Select 
                value={formData.course} 
                onValueChange={(value: string) => setFormData({...formData, course: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ads">Análise e Desenvolvimento de Sistemas</SelectItem>
                  <SelectItem value="ge">Gestão Empresarial</SelectItem>
                  <SelectItem value="logistica">Logística</SelectItem>
                  <SelectItem value="mecatronica">Mecatrônica Industrial</SelectItem>
                  <SelectItem value="automacao">Automação Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de Usuário */}
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuário *</Label>
              <Select 
                value={formData.userType} 
                onValueChange={(value: string) => setFormData({...formData, userType: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Aluno</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="coordinator">Coordenador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="password">Senha *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="border-border"
                required
                minLength={6}
              />
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="border-border"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Terms */}
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Ao criar uma conta, você concorda com os termos de uso do sistema 
              FatecReserve e com as políticas da FATEC Campinas.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
          >
            Criar Conta
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <button 
              onClick={onBack}
              className="text-primary hover:underline"
            >
              Faça login
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
