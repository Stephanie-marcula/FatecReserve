import { Calendar, FileText, ClipboardList, Settings, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface DashboardProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  userRole: "student" | "coordinator" | "admin";
}

export function Dashboard({ onNavigate, onLogout, userRole }: DashboardProps) {
  const quickActions = [
    {
      title: "Nova Reserva",
      description: "Agendar laboratório ou equipamento",
      icon: Calendar,
      color: "bg-primary",
      action: () => onNavigate("reservations"),
    },
    {
      title: "Minhas Solicitações",
      description: "Ver status das reservas",
      icon: ClipboardList,
      color: "bg-secondary",
      action: () => onNavigate("reservations"),
    },
    {
      title: "Relatórios",
      description: "Visualizar estatísticas",
      icon: FileText,
      color: "bg-[#4CAF50]",
      action: () => onNavigate("reports"),
      adminOnly: true,
    },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground">FR</span>
            </div>
            <div>
              <h1 className="text-foreground">FatecReserve</h1>
              <p className="text-xs text-muted-foreground">
                {userRole === "admin" ? "Administrador" : userRole === "coordinator" ? "Coordenador" : "Estudante"}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={onLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-foreground mb-2">Bem-vindo ao FatecReserve</h2>
          <p className="text-muted-foreground">
            Gestão inteligente para um campus mais conectado
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            if (action.adminOnly && userRole === "student") return null;
            
            const Icon = action.icon;
            return (
              <Card 
                key={action.title}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={action.action}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{action.title}</CardTitle>
                    <div className={`${action.color} p-2 rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Approval Section for Coordinators/Admins */}
        {(userRole === "coordinator" || userRole === "admin") && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Ações Administrativas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => onNavigate("approval")}
                  className="w-full justify-start bg-secondary hover:bg-secondary/90"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Aprovar Solicitações
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div>
                    <p>Laboratório 3 - Informática</p>
                    <p className="text-sm text-muted-foreground">15/11/2025 às 14:00</p>
                  </div>
                  <span className="px-3 py-1 rounded text-sm bg-[#FFC107] text-white">
                    Pendente
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div>
                    <p>Laboratório 5 - Eletrônica</p>
                    <p className="text-sm text-muted-foreground">12/11/2025 às 10:00</p>
                  </div>
                  <span className="px-3 py-1 rounded text-sm bg-[#4CAF50] text-white">
                    Aprovado
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p>Sala de Reuniões 2</p>
                    <p className="text-sm text-muted-foreground">10/11/2025 às 16:00</p>
                  </div>
                  <span className="px-3 py-1 rounded text-sm bg-[#E53935] text-white">
                    Rejeitado
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
