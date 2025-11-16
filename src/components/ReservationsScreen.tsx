import { useState } from "react";
import { ArrowLeft, Plus, Calendar as CalendarIcon, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";

interface Reservation {
  id: number;
  space: string;
  date: string;
  time: string;
  status: "pending" | "approved" | "rejected";
  requestedBy?: string;
}

interface ReservationsScreenProps {
  onBack: () => void;
  userRole: "student" | "coordinator" | "admin";
}

export function ReservationsScreen({ onBack, userRole }: ReservationsScreenProps) {
  const [reservations, setReservations] = useState<Reservation[]>([
    { id: 1, space: "Laboratório 3 - Informática", date: "2025-11-15", time: "14:00", status: "pending", requestedBy: "João Silva" },
    { id: 2, space: "Laboratório 5 - Eletrônica", date: "2025-11-12", time: "10:00", status: "approved", requestedBy: "Maria Santos" },
    { id: 3, space: "Sala de Reuniões 2", date: "2025-11-10", time: "16:00", status: "rejected", requestedBy: "Pedro Costa" },
    { id: 4, space: "Laboratório 1 - Redes", date: "2025-11-20", time: "09:00", status: "pending", requestedBy: "Ana Lima" },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isNewReservationOpen, setIsNewReservationOpen] = useState(false);
  
  const [newReservation, setNewReservation] = useState({
    space: "",
    date: "",
    time: "",
    purpose: "",
  });

  const handleCreateReservation = () => {
    const reservation: Reservation = {
      id: reservations.length + 1,
      space: newReservation.space,
      date: newReservation.date,
      time: newReservation.time,
      status: "pending",
      requestedBy: "Você",
    };
    setReservations([...reservations, reservation]);
    setIsNewReservationOpen(false);
    setNewReservation({ space: "", date: "", time: "", purpose: "" });
  };

  const filteredReservations = reservations.filter((res) => 
    filterStatus === "all" || res.status === filterStatus
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-[#FFC107] hover:bg-[#FFC107]/90">Pendente</Badge>;
      case "approved":
        return <Badge className="bg-[#4CAF50] hover:bg-[#4CAF50]/90">Aprovado</Badge>;
      case "rejected":
        return <Badge className="bg-[#E53935] hover:bg-[#E53935]/90">Rejeitado</Badge>;
      default:
        return null;
    }
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
            <h1 className="text-foreground">Reservas</h1>
          </div>
          <Dialog open={isNewReservationOpen} onOpenChange={setIsNewReservationOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <Plus className="h-4 w-4" />
                Nova Reserva
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Reserva</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="space">Espaço</Label>
                    <Select 
                    value={newReservation.space} 
                    onValueChange={(value: string) => setNewReservation({...newReservation, space: value})}
                    >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o espaço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laboratório 1 - Redes">Laboratório 1 - Redes</SelectItem>
                      <SelectItem value="Laboratório 2 - Hardware">Laboratório 2 - Hardware</SelectItem>
                      <SelectItem value="Laboratório 3 - Informática">Laboratório 3 - Informática</SelectItem>
                      <SelectItem value="Laboratório 4 - Programação">Laboratório 4 - Programação</SelectItem>
                      <SelectItem value="Laboratório 5 - Eletrônica">Laboratório 5 - Eletrônica</SelectItem>
                      <SelectItem value="Sala de Reuniões 1">Sala de Reuniões 1</SelectItem>
                      <SelectItem value="Sala de Reuniões 2">Sala de Reuniões 2</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newReservation.date}
                    onChange={(e) => setNewReservation({...newReservation, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReservation.time}
                    onChange={(e) => setNewReservation({...newReservation, time: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Finalidade</Label>
                  <Input
                    id="purpose"
                    placeholder="Ex: Aula prática, projeto, estudo..."
                    value={newReservation.purpose}
                    onChange={(e) => setNewReservation({...newReservation, purpose: e.target.value})}
                  />
                </div>
                <Button 
                  onClick={handleCreateReservation}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!newReservation.space || !newReservation.date || !newReservation.time}
                >
                  Solicitar Reserva
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  className={filterStatus === "all" ? "bg-primary hover:bg-primary/90" : ""}
                >
                  Todas
                </Button>
                <Button 
                  variant={filterStatus === "pending" ? "default" : "outline"}
                  onClick={() => setFilterStatus("pending")}
                  className={filterStatus === "pending" ? "bg-[#FFC107] hover:bg-[#FFC107]/90" : ""}
                >
                  Pendentes
                </Button>
                <Button 
                  variant={filterStatus === "approved" ? "default" : "outline"}
                  onClick={() => setFilterStatus("approved")}
                  className={filterStatus === "approved" ? "bg-[#4CAF50] hover:bg-[#4CAF50]/90" : ""}
                >
                  Aprovadas
                </Button>
                <Button 
                  variant={filterStatus === "rejected" ? "default" : "outline"}
                  onClick={() => setFilterStatus("rejected")}
                  className={filterStatus === "rejected" ? "bg-[#E53935] hover:bg-[#E53935]/90" : ""}
                >
                  Rejeitadas
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservations List */}
        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      <h3 className="text-foreground">{reservation.space}</h3>
                    </div>
                    <div className="ml-8 space-y-1">
                      <p className="text-muted-foreground">
                        Data: {new Date(reservation.date).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-muted-foreground">
                        Horário: {reservation.time}
                      </p>
                      {reservation.requestedBy && (
                        <p className="text-muted-foreground">
                          Solicitante: {reservation.requestedBy}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(reservation.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReservations.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground">
                Nenhuma reserva encontrada com os filtros selecionados.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
