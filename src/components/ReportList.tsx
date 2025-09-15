import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, User, Eye, Filter, Phone } from 'lucide-react';
import MunicipalContacts from './MunicipalContacts';
import { detectMunicipality } from '@/data/municipalContacts';

interface Report {
  id: string;
  type: string;
  location: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  reporterName: string;
  date: string;
  lastUpdate: string;
}

const mockReports: Report[] = [
  {
    id: 'DEN-2024-001',
    type: 'Desmatamento',
    location: 'Mata Atlântica, Região Sul - SP',
    description: 'Desmatamento irregular de área de preservação permanente próxima ao rio.',
    status: 'investigating',
    urgency: 'high',
    reporterName: 'Ana Silva',
    date: '2024-01-15',
    lastUpdate: '2024-01-18'
  },
  {
    id: 'DEN-2024-002',
    type: 'Queimadas',
    location: 'Cerrado, Fazenda Santa Rita - GO',
    description: 'Queimada descontrolada atingindo área de reserva legal.',
    status: 'pending',
    urgency: 'critical',
    reporterName: 'Anônimo',
    date: '2024-01-14',
    lastUpdate: '2024-01-14'
  },
  {
    id: 'DEN-2024-003',
    type: 'Descarte Irregular',
    location: 'Rio Tietê, Ponte Nova - SP',
    description: 'Descarte de resíduos industriais no rio.',
    status: 'resolved',
    urgency: 'medium',
    reporterName: 'João Santos',
    date: '2024-01-12',
    lastUpdate: '2024-01-16'
  },
  {
    id: 'DEN-2024-004',
    type: 'Poluição da Água',
    location: 'Lagoa dos Patos - RS',
    description: 'Morte de peixes devido à poluição por esgoto não tratado.',
    status: 'investigating',
    urgency: 'high',
    reporterName: 'Maria Oliveira',
    date: '2024-01-10',
    lastUpdate: '2024-01-15'
  },
  {
    id: 'DEN-2024-005',
    type: 'Poluição do Ar',
    location: 'Distrito Industrial - MG',
    description: 'Emissão excessiva de poluentes por indústria química.',
    status: 'pending',
    urgency: 'medium',
    reporterName: 'Anônimo',
    date: '2024-01-08',
    lastUpdate: '2024-01-08'
  },
  {
    id: 'DEN-2024-006',
    type: 'Caça Ilegal',
    location: 'Pantanal, Corumbá - MS',
    description: 'Caça de animais silvestres em área de preservação.',
    status: 'dismissed',
    urgency: 'low',
    reporterName: 'Pedro Costa',
    date: '2024-01-05',
    lastUpdate: '2024-01-12'
  }
];

const ReportList = () => {
  const [reports] = useState<Report[]>(mockReports);
  const [filteredReports, setFilteredReports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  // Filter reports based on search and filters
  React.useEffect(() => {
    let filtered = reports;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    // Urgency filter
    if (urgencyFilter !== 'all') {
      filtered = filtered.filter(report => report.urgency === urgencyFilter);
    }

    setFilteredReports(filtered);
  }, [searchTerm, statusFilter, urgencyFilter, reports]);

  const getStatusBadge = (status: Report['status']) => {
    const statusConfig = {
      pending: { label: 'Pendente', variant: 'secondary' as const },
      investigating: { label: 'Investigando', variant: 'default' as const },
      resolved: { label: 'Resolvida', variant: 'default' as const },
      dismissed: { label: 'Arquivada', variant: 'outline' as const }
    };
    
    return statusConfig[status];
  };

  const getUrgencyBadge = (urgency: Report['urgency']) => {
    const urgencyConfig = {
      low: { label: 'Baixa', color: 'bg-muted text-muted-foreground' },
      medium: { label: 'Média', color: 'bg-accent text-accent-foreground' },
      high: { label: 'Alta', color: 'bg-warning text-warning-foreground' },
      critical: { label: 'Crítica', color: 'bg-destructive text-destructive-foreground' }
    };
    
    return urgencyConfig[urgency];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <CardTitle>Filtros e Busca</CardTitle>
          </div>
          <CardDescription>
            Use os filtros abaixo para encontrar denúncias específicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <Input
                placeholder="Buscar por ID, tipo, localização..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="investigating">Investigando</SelectItem>
                  <SelectItem value="resolved">Resolvida</SelectItem>
                  <SelectItem value="dismissed">Arquivada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Urgência</label>
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as urgências</SelectItem>
                  <SelectItem value="critical">Crítica</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredReports.length} de {reports.length} denúncias
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setUrgencyFilter('all');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma denúncia encontrada</h3>
              <p className="text-muted-foreground text-center">
                Tente ajustar os filtros ou fazer uma nova busca.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredReports.map((report) => {
            const statusBadge = getStatusBadge(report.status);
            const urgencyBadge = getUrgencyBadge(report.urgency);

            return (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Left side - Main info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-semibold text-lg">{report.id}</h3>
                        <div className="flex gap-2">
                          <Badge variant={statusBadge.variant}>
                            {statusBadge.label}
                          </Badge>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyBadge.color}`}>
                            {urgencyBadge.label}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">{report.type}</span>
                        </div>

                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{report.location}</span>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {report.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{report.reporterName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Registrada em {formatDate(report.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Atualizada em {formatDate(report.lastUpdate)}</span>
                        </div>
                      </div>
                    </div>

                     {/* Right side - Actions */}
                     <div className="flex flex-row lg:flex-col gap-2">
                       <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                         <Eye className="h-4 w-4 mr-2" />
                         Ver Detalhes
                       </Button>
                       <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                         <Phone className="h-4 w-4 mr-2" />
                         Contatos
                       </Button>
                       {report.status === 'pending' && (
                         <Button size="sm" className="flex-1 lg:flex-none">
                           Investigar
                         </Button>
                       )}
                     </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {filteredReports.length > 0 && (
        <div className="text-center">
          <Button variant="outline">
            Carregar Mais Denúncias
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportList;