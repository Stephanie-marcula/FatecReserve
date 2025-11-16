import { ArrowLeft, Download, TrendingUp, Calendar, Users, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ReportsScreenProps {
  onBack: () => void;
}

export function ReportsScreen({ onBack }: ReportsScreenProps) {
  // Mock data for charts
  const monthlyData = [
    { month: "Jun", reservas: 45 },
    { month: "Jul", reservas: 52 },
    { month: "Ago", reservas: 48 },
    { month: "Set", reservas: 61 },
    { month: "Out", reservas: 58 },
    { month: "Nov", reservas: 67 },
  ];

  const statusData = [
    { name: "Aprovadas", value: 156, color: "#4CAF50" },
    { name: "Pendentes", value: 23, color: "#FFC107" },
    { name: "Rejeitadas", value: 12, color: "#E53935" },
  ];

  const spaceData = [
    { space: "Lab 1", reservas: 34 },
    { space: "Lab 2", reservas: 28 },
    { space: "Lab 3", reservas: 42 },
    { space: "Lab 4", reservas: 31 },
    { space: "Lab 5", reservas: 26 },
  ];

  const stats = [
    {
      title: "Total de Reservas",
      value: "191",
      icon: Calendar,
      color: "bg-primary",
      change: "+12%",
    },
    {
      title: "Taxa de Aprovação",
      value: "81.7%",
      icon: TrendingUp,
      color: "bg-[#4CAF50]",
      change: "+5.2%",
    },
    {
      title: "Usuários Ativos",
      value: "87",
      icon: Users,
      color: "bg-secondary",
      change: "+8",
    },
    {
      title: "Cancelamentos",
      value: "12",
      icon: AlertCircle,
      color: "bg-[#E53935]",
      change: "-3",
    },
  ];

  const handleExportPDF = () => {
    alert("Exportando relatório em PDF...");
  };

  const handleExportExcel = () => {
    alert("Exportando relatório em Excel...");
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-foreground">Relatórios</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleExportPDF}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar PDF
            </Button>
            <Button 
              onClick={handleExportExcel}
              className="bg-secondary hover:bg-secondary/90 gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar Excel
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">{stat.change}</span>
                  </div>
                  <p className="text-muted-foreground mb-1">{stat.title}</p>
                  <h2 className="text-foreground">{stat.value}</h2>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Reservations */}
          <Card>
            <CardHeader>
              <CardTitle>Reservas Mensais</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reservas" fill="#C8102E" name="Reservas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Space Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Uso por Espaço</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spaceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="space" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="reservas" fill="#003366" name="Reservas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Laboratórios Mais Utilizados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spaceData
                  .sort((a, b) => b.reservas - a.reservas)
                  .map((space, index) => (
                    <div key={space.space} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                          {index + 1}
                        </div>
                        <span>{space.space}</span>
                      </div>
                      <span className="text-muted-foreground">{space.reservas} reservas</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horários de Pico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span>08:00 - 10:00</span>
                  <span className="text-muted-foreground">32 reservas</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span>10:00 - 12:00</span>
                  <span className="text-muted-foreground">45 reservas</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span>14:00 - 16:00</span>
                  <span className="text-muted-foreground">51 reservas</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span>16:00 - 18:00</span>
                  <span className="text-muted-foreground">38 reservas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>19:00 - 21:00</span>
                  <span className="text-muted-foreground">25 reservas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
