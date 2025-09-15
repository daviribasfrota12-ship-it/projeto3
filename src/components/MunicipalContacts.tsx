import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Shield, AlertTriangle, Headphones } from 'lucide-react';
import { MunicipalContact, getDefaultContacts } from '@/data/municipalContacts';

interface MunicipalContactsProps {
  municipalData: MunicipalContact | null;
  className?: string;
}

const MunicipalContacts: React.FC<MunicipalContactsProps> = ({ municipalData, className }) => {
  const defaultContacts = getDefaultContacts();
  
  if (!municipalData) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Contatos de Emergência</CardTitle>
          </div>
          <CardDescription>
            Contatos gerais para denúncias ambientais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Shield className="h-4 w-4 text-primary" />
            <div>
              <p className="font-medium text-sm">Órgão Ambiental</p>
              <p className="text-sm text-muted-foreground">{defaultContacts.environmental}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <div>
              <p className="font-medium text-sm">Polícia Ambiental</p>
              <p className="text-sm text-muted-foreground">{defaultContacts.police}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <div>
              <p className="font-medium text-sm">Emergência</p>
              <p className="text-sm text-muted-foreground">{defaultContacts.emergency}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Headphones className="h-4 w-4 text-accent" />
            <div>
              <p className="font-medium text-sm">Defesa Civil</p>
              <p className="text-sm text-muted-foreground">{defaultContacts.defesaCivil}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Contatos - {municipalData.municipality}</CardTitle>
        </div>
        <CardDescription>
          Contatos específicos para {municipalData.municipality} - {municipalData.state}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <Shield className="h-4 w-4 text-primary" />
          <div>
            <p className="font-medium text-sm">Secretaria de Meio Ambiente</p>
            <p className="text-sm text-muted-foreground">{municipalData.contacts.environmental}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <div>
            <p className="font-medium text-sm">Polícia Ambiental</p>
            <p className="text-sm text-muted-foreground">{municipalData.contacts.police}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <div>
            <p className="font-medium text-sm">Emergência Ambiental</p>
            <p className="text-sm text-muted-foreground">{municipalData.contacts.emergency}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
          <Headphones className="h-4 w-4 text-accent" />
          <div>
            <p className="font-medium text-sm">Defesa Civil</p>
            <p className="text-sm text-muted-foreground">{municipalData.contacts.defesaCivil}</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-muted/30 border">
          <p className="text-xs text-muted-foreground">
            <strong>Dica:</strong> Para emergências ambientais graves (incêndios, vazamentos químicos), 
            ligue primeiro para a emergência ambiental ou bombeiros (193).
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MunicipalContacts;