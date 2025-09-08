import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Leaf, Shield, Users, FileText, BarChart3, MapPin } from 'lucide-react';
import ReportForm from '@/components/ReportForm';
import ReportList from '@/components/ReportList';
import Dashboard from '@/components/Dashboard';
import heroImage from '@/assets/hero-environmental.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('nova-denuncia');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">EcoReport</h1>
                <p className="text-sm text-muted-foreground">Sistema de Denúncias Ambientais</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden md:flex">
                Versão Beta
              </Badge>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Suporte
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
        
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Proteja o
              <span className="block text-primary-glow">Meio Ambiente</span>
            </h1>
            
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
              Sistema integrado para registro, acompanhamento e resolução de denúncias ambientais.
              Sua voz faz a diferença na preservação do nosso planeta.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="min-w-[200px] bg-white text-primary hover:bg-white/90"
                onClick={() => setActiveTab('nova-denuncia')}
              >
                <FileText className="h-5 w-5 mr-2" />
                Nova Denúncia
              </Button>
              <Button
                size="lg"
                className="min-w-[200px] bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
                onClick={() => setActiveTab('denuncias')}
              >
                <Shield className="h-5 w-5 mr-2" />
                Ver Denúncias
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="p-3 rounded-full bg-white/20 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Denúncias Anônimas</h3>
                <p className="text-sm opacity-80">Sua identidade é protegida e opcional</p>
              </div>

              <div className="text-center">
                <div className="p-3 rounded-full bg-white/20 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Localização Precisa</h3>
                <p className="text-sm opacity-80">Registre a localização exata do problema</p>
              </div>

              <div className="text-center">
                <div className="p-3 rounded-full bg-white/20 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Acompanhamento</h3>
                <p className="text-sm opacity-80">Monitore o progresso da investigação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="nova-denuncia" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Nova Denúncia
            </TabsTrigger>
            <TabsTrigger value="denuncias" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Denúncias
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="nova-denuncia">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Registrar Nova Denúncia</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Ajude a proteger o meio ambiente registrando casos de crimes ambientais.
                  Todas as denúncias são tratadas com seriedade e investigadas pela equipe responsável.
                </p>
              </div>
              <ReportForm />
            </div>
          </TabsContent>

          <TabsContent value="denuncias">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Denúncias Registradas</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Acompanhe todas as denúncias ambientais registradas no sistema.
                  Use os filtros para encontrar casos específicos.
                </p>
              </div>
              <ReportList />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-bold">EcoReport</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema desenvolvido para facilitar o registro e acompanhamento
                de denúncias ambientais, conectando a comunidade aos órgãos responsáveis.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Tipos de Denúncia</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Desmatamento irregular</li>
                <li>• Queimadas criminosas</li>
                <li>• Descarte inadequado de resíduos</li>
                <li>• Poluição de rios e lagos</li>
                <li>• Caça e pesca ilegais</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contato de Emergência</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>IBAMA: 0800 61 8080</p>
                <p>Polícia Ambiental: 190</p>
                <p>Bombeiros: 193</p>
                <p>Defesa Civil: 199</p>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            <p>© 2024 EcoReport - Sistema de Denúncias Ambientais. Projeto Integrador - Engenharia de Software.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
