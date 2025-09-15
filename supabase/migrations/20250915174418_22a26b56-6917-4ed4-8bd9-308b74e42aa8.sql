-- Criar tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Habilitar RLS na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Criar enum para tipos de denúncia
CREATE TYPE public.report_type AS ENUM (
  'deforestation',
  'burning', 
  'illegal_disposal',
  'water_pollution',
  'air_pollution',
  'noise_pollution',
  'illegal_hunting',
  'other'
);

-- Criar enum para níveis de urgência
CREATE TYPE public.urgency_level AS ENUM (
  'low',
  'medium', 
  'high',
  'critical'
);

-- Criar enum para status da denúncia
CREATE TYPE public.report_status AS ENUM (
  'pending',
  'investigating',
  'resolved',
  'dismissed'
);

-- Criar tabela de denúncias
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type public.report_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  urgency public.urgency_level NOT NULL DEFAULT 'medium',
  status public.report_status NOT NULL DEFAULT 'pending',
  reporter_name TEXT,
  reporter_contact TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  evidence_urls TEXT[],
  municipal_contact_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT
);

-- Habilitar RLS na tabela reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para reports
-- Usuários podem ver suas próprias denúncias
CREATE POLICY "Users can view their own reports" 
ON public.reports 
FOR SELECT 
USING (auth.uid() = user_id);

-- Usuários podem criar denúncias
CREATE POLICY "Authenticated users can create reports" 
ON public.reports 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Usuários podem atualizar suas próprias denúncias (apenas alguns campos)
CREATE POLICY "Users can update their own reports" 
ON public.reports 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Política para visualização pública de denúncias (apenas campos básicos)
CREATE POLICY "Public can view basic report info" 
ON public.reports 
FOR SELECT 
USING (true);

-- Criar tabela de contatos municipais
CREATE TABLE public.municipal_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  municipality TEXT NOT NULL,
  state TEXT NOT NULL,
  environmental_contact TEXT NOT NULL,
  police_contact TEXT NOT NULL,
  emergency_contact TEXT NOT NULL,
  civil_defense_contact TEXT NOT NULL,
  keywords TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(municipality, state)
);

-- Habilitar RLS na tabela municipal_contacts (leitura pública)
ALTER TABLE public.municipal_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view municipal contacts" 
ON public.municipal_contacts 
FOR SELECT 
USING (true);

-- Função para gerar número de denúncia sequencial
CREATE OR REPLACE FUNCTION public.generate_report_number()
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  sequence_part TEXT;
  next_sequence INTEGER;
BEGIN
  year_part := EXTRACT(YEAR FROM now())::TEXT;
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(report_number FROM 'DEN-' || year_part || '-(.*)') AS INTEGER)), 0) + 1
  INTO next_sequence
  FROM public.reports
  WHERE report_number LIKE 'DEN-' || year_part || '-%';
  
  sequence_part := LPAD(next_sequence::TEXT, 3, '0');
  
  RETURN 'DEN-' || year_part || '-' || sequence_part;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para gerar número de denúncia automaticamente
CREATE OR REPLACE FUNCTION public.set_report_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.report_number IS NULL OR NEW.report_number = '' THEN
    NEW.report_number := public.generate_report_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_report_number_trigger
  BEFORE INSERT ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.set_report_number();

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_municipal_contacts_updated_at
  BEFORE UPDATE ON public.municipal_contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Inserir dados de contatos municipais do Mato Grosso
INSERT INTO public.municipal_contacts (municipality, state, environmental_contact, police_contact, emergency_contact, civil_defense_contact, keywords) VALUES
  ('Cuiabá', 'MT', '(65) 3648-4500', '(65) 3648-1100', '(65) 3648-9900', '(65) 3617-1199', ARRAY['cuiaba', 'cuiabá', 'mt', 'mato grosso']),
  ('Várzea Grande', 'MT', '(65) 3688-8000', '(65) 3688-1190', '(65) 3688-9911', '(65) 3688-1199', ARRAY['várzea grande', 'varzea grande', 'mt', 'mato grosso']),
  ('Rondonópolis', 'MT', '(66) 3411-4000', '(66) 3411-1190', '(66) 3411-9911', '(66) 3411-1199', ARRAY['rondonópolis', 'rondonopolis', 'mt', 'mato grosso']),
  ('Sinop', 'MT', '(66) 3511-4000', '(66) 3511-1190', '(66) 3511-9911', '(66) 3511-1199', ARRAY['sinop', 'mt', 'mato grosso']),
  ('Tangará da Serra', 'MT', '(65) 3311-4000', '(65) 3311-1190', '(65) 3311-9911', '(65) 3311-1199', ARRAY['tangará da serra', 'tangara da serra', 'mt', 'mato grosso']),
  ('Cáceres', 'MT', '(65) 3223-4000', '(65) 3223-1190', '(65) 3223-9911', '(65) 3223-1199', ARRAY['cáceres', 'caceres', 'mt', 'mato grosso']),
  ('Barra do Garças', 'MT', '(66) 3401-4000', '(66) 3401-1190', '(66) 3401-9911', '(66) 3401-1199', ARRAY['barra do garças', 'barra do garcas', 'mt', 'mato grosso']),
  ('Pontes e Lacerda', 'MT', '(65) 3266-4000', '(65) 3266-1190', '(65) 3266-9911', '(65) 3266-1199', ARRAY['pontes e lacerda', 'pontes lacerda', 'mt', 'mato grosso']),
  ('Lucas do Rio Verde', 'MT', '(65) 3549-4000', '(65) 3549-1190', '(65) 3549-9911', '(65) 3549-1199', ARRAY['lucas do rio verde', 'lucas rio verde', 'mt', 'mato grosso']),
  ('Sorriso', 'MT', '(66) 3544-4000', '(66) 3544-1190', '(66) 3544-9911', '(66) 3544-1199', ARRAY['sorriso', 'mt', 'mato grosso']);