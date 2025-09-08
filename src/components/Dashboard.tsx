import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp, CheckCircle, Clock, MapPin, Flame, TreePine, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const stats = {
    total: 156,
    pending: 23,
    investigating: 45,
    resolved: 78,
    dismissed: 10
  };

  const recentReports = [
    {
      id: 'DEN-2024-001',
      type: 'Desmatamento',
      location: 'Mata Atlântica - SP',
      urgency: 'high',
      status: 'investigating',
      icon: TreePine
    },
    {
      id: 'DEN-2024-002',
      type: 'Queimadas',
      location: 'Cerrado - GO',
      urgency: 'critical',
      status: 'pending',
      icon: Flame
    },
    {
      id: 'DEN-2024-003',
      type: 'Descarte Irregular',
      location: 'Rio Tietê - SP',
      urgency: 'medium',
      status: 'resolved',
      icon: Trash2
    }
  ];

  const typeStats = [
    { type: 'Desmatamento', count: 45, icon: TreePine, color: 'text-success' },
    { type: 'Queimadas', count: 38, icon: Flame, color: 'text-destructive' },
    { type: 'Descarte Irregular', count: 42, icon: Trash2, color: 'text-warning' },
    { type: 'Poluição', count: 31, icon: AlertTriangle, color: 'text-accent' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Denúncias</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              +12% desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando análise
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Investigação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.investigating}</div>
            <p className="text-xs text-muted-foreground">
              Sendo analisadas
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolvidas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground">
              +8 esta semana
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Denúncias Recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReports.map((report) => {
              const IconComponent = report.icon;
              return (
                <div key={report.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className={`p-2 rounded-full ${
                    report.urgency === 'critical' ? 'bg-destructive/10 text-destructive' :
                    report.urgency === 'high' ? 'bg-warning/10 text-warning' :
                    report.urgency === 'medium' ? 'bg-accent/10 text-accent' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{report.id}</p>
                      <Badge variant={
                        report.status === 'resolved' ? 'default' :
                        report.status === 'investigating' ? 'secondary' :
                        'outline'
                      }>
                        {report.status === 'resolved' ? 'Resolvida' :
                         report.status === 'investigating' ? 'Investigando' :
                         'Pendente'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{report.type}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {report.location}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Types Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Denúncia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {typeStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.type} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full bg-muted ${stat.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{stat.type}</span>
                  </div>
                  <Badge variant="outline">{stat.count}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">
              {Math.round((stats.resolved / stats.total) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Das denúncias registradas foram resolvidas com sucesso
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-4">
              <div 
                className="bg-success h-2 rounded-full" 
                style={{ width: `${(stats.resolved / stats.total) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              2.5 dias
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Tempo médio entre o registro e o início da investigação
            </p>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-success">15% mais rápido que o mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;