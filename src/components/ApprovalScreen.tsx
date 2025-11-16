import { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

interface PendingReservation {
  id: number;
  user: string;
  space: string;
  date: string;
  time: string;
  purpose: string;
  status: "pending" | "approved" | "rejected";
}

interface ApprovalScreenProps {
  onBack: () => void;
}

export function ApprovalScreen({ onBack }: ApprovalScreenProps) {
  const [reservations, setReservations] = useState<PendingReservation[]>([
    {
      id: 1,
      user: "João Silva",
      space: "Laboratório 3 - Informática",
      date: "2025-11-15",
      time: "14:00",
      purpose: "Aula prática de programação",
      status: "pending",
    },
    {
      id: 2,
      user: "Ana Lima",
      space: "Laboratório 1 - Redes",
      date: "2025-11-20",
      time: "09:00",
      purpose: "Projeto de configuração de redes",
      status: "pending",
    },
    {
      id: 3,
      user: "Carlos Souza",
      space: "Sala de Reuniões 1",
      date: "2025-11-18",
      time: "15:00",
      purpose: "Reunião de projeto TCC",
      status: "pending",
    },
  ]);

  const handleApprove = (id: number) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: "approved" as const } : res
    ));
    toast.success("Reserva aprovada com sucesso!");
  };

  const handleReject = (id: number) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: "rejected" as const } : res
    ));
    toast.error("Reserva rejeitada");
  };

  const pendingReservations = reservations.filter(res => res.status === "pending");

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-foreground">Aprovar Solicitações</h1>
          <Badge className="ml-2 bg-[#FFC107] hover:bg-[#FFC107]/90">
            {pendingReservations.length} pendentes
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Card>
          <CardContent className="p-0">
            {pendingReservations.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Espaço</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Finalidade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>{reservation.user}</TableCell>
                        <TableCell>{reservation.space}</TableCell>
                        <TableCell>
                          {new Date(reservation.date).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>{reservation.time}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {reservation.purpose}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApprove(reservation.id)}
                              className="bg-[#4CAF50] hover:bg-[#4CAF50]/90 gap-1"
                            >
                              <Check className="h-4 w-4" />
                              Aprovar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(reservation.id)}
                              className="bg-[#E53935] hover:bg-[#E53935]/90 gap-1"
                            >
                              <X className="h-4 w-4" />
                              Recusar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Não há solicitações pendentes no momento.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* History Section */}
        <div className="mt-8">
          <h2 className="text-foreground mb-4">Histórico de Decisões</h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Espaço</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations
                      .filter(res => res.status !== "pending")
                      .map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>{reservation.user}</TableCell>
                          <TableCell>{reservation.space}</TableCell>
                          <TableCell>
                            {new Date(reservation.date).toLocaleDateString("pt-BR")}
                          </TableCell>
                          <TableCell>
                            {reservation.status === "approved" ? (
                              <Badge className="bg-[#4CAF50] hover:bg-[#4CAF50]/90">
                                Aprovado
                              </Badge>
                            ) : (
                              <Badge className="bg-[#E53935] hover:bg-[#E53935]/90">
                                Rejeitado
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              {reservations.filter(res => res.status !== "pending").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Nenhuma decisão tomada ainda.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
