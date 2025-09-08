import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Camera, FileText, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    reporterName: '',
    reporterContact: '',
    urgency: ''
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Denúncia enviada com sucesso!",
      description: "Sua denúncia foi registrada e será analisada pela equipe responsável.",
    });

    // Reset form
    setFormData({
      type: '',
      location: '',
      description: '',
      reporterName: '',
      reporterContact: '',
      urgency: ''
    });
  };

  const reportTypes = [
    { value: 'deforestation', label: 'Desmatamento' },
    { value: 'burning', label: 'Queimadas' },
    { value: 'illegal_disposal', label: 'Descarte Irregular' },
    { value: 'water_pollution', label: 'Poluição da Água' },
    { value: 'air_pollution', label: 'Poluição do Ar' },
    { value: 'noise_pollution', label: 'Poluição Sonora' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'critical', label: 'Crítica' }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">Formulário de Denúncia Ambiental</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para registrar uma denúncia ambiental.
          Todas as informações são tratadas com confidencialidade.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de Denúncia */}
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Denúncia *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de denúncia" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Nível de Urgência */}
            <div className="space-y-2">
              <Label htmlFor="urgency">Nível de Urgência *</Label>
              <Select 
                value={formData.urgency} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a urgência" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          level.value === 'critical' ? 'bg-destructive' :
                          level.value === 'high' ? 'bg-warning' :
                          level.value === 'medium' ? 'bg-accent' :
                          'bg-muted-foreground'
                        }`} />
                        {level.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Localização */}
          <div className="space-y-2">
            <Label htmlFor="location">Localização *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Ex: Rua das Flores, 123, Centro, São Paulo - SP"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="pl-10"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Seja o mais específico possível sobre a localização do problema
            </p>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição Detalhada *</Label>
            <Textarea
              id="description"
              placeholder="Descreva o problema ambiental observado. Inclua detalhes como data/hora, extensão do dano, possíveis responsáveis, etc."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[120px]"
              required
            />
            <p className="text-xs text-muted-foreground">
              Mínimo de 50 caracteres. Quanto mais detalhes, melhor será a investigação.
            </p>
          </div>

          {/* Anexos */}
          <div className="space-y-2">
            <Label>Evidências (Opcional)</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                Arraste e solte fotos ou vídeos aqui, ou clique para selecionar
              </p>
              <Button type="button" variant="outline" size="sm">
                Selecionar Arquivos
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Formatos aceitos: JPG, PNG, MP4, MOV (máx. 10MB cada)
              </p>
            </div>
          </div>

          {/* Dados do Denunciante (Opcional) */}
          <div className="space-y-4 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <Label className="text-base font-medium">Dados do Denunciante (Opcional)</Label>
            </div>
            <p className="text-xs text-muted-foreground">
              Essas informações são opcionais e ajudam no contato para esclarecimentos.
              Sua identidade será mantida em sigilo conforme a lei.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reporterName">Nome Completo</Label>
                <Input
                  id="reporterName"
                  placeholder="Seu nome completo"
                  value={formData.reporterName}
                  onChange={(e) => setFormData(prev => ({ ...prev, reporterName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reporterContact">Telefone ou E-mail</Label>
                <Input
                  id="reporterContact"
                  placeholder="Telefone ou e-mail para contato"
                  value={formData.reporterContact}
                  onChange={(e) => setFormData(prev => ({ ...prev, reporterContact: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button type="submit" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Enviar Denúncia
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setFormData({
                type: '', location: '', description: '', 
                reporterName: '', reporterContact: '', urgency: ''
              })}
              className="flex-1 sm:flex-none"
            >
              Limpar Formulário
            </Button>
          </div>

          {/* Aviso Legal */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
            <p className="font-medium mb-2">Aviso Legal:</p>
            <p>
              Ao enviar esta denúncia, você declara que as informações fornecidas são verdadeiras.
              Denúncias falsas podem configurar crime e estão sujeitas às penalidades da lei.
              Este sistema está em conformidade com a Lei de Proteção de Dados (LGPD).
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportForm;