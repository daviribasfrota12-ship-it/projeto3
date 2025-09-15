export interface MunicipalContact {
  municipality: string;
  state: string;
  contacts: {
    environmental: string;
    police: string;
    emergency: string;
    defesaCivil: string;
  };
  keywords: string[];
}

export const municipalContacts: MunicipalContact[] = [
  {
    municipality: "Cuiabá",
    state: "MT",
    contacts: {
      environmental: "(65) 3648-4500",
      police: "(65) 3648-1100", 
      emergency: "(65) 3648-9900",
      defesaCivil: "(65) 3617-1199"
    },
    keywords: ["cuiaba", "cuiabá", "mt", "mato grosso"]
  },
  {
    municipality: "Várzea Grande",
    state: "MT", 
    contacts: {
      environmental: "(65) 3688-8000",
      police: "(65) 3688-1190",
      emergency: "(65) 3688-9911", 
      defesaCivil: "(65) 3688-1199"
    },
    keywords: ["várzea grande", "varzea grande", "mt", "mato grosso"]
  },
  {
    municipality: "Rondonópolis",
    state: "MT",
    contacts: {
      environmental: "(66) 3411-4000",
      police: "(66) 3411-1190",
      emergency: "(66) 3411-9911",
      defesaCivil: "(66) 3411-1199" 
    },
    keywords: ["rondonópolis", "rondonopolis", "mt", "mato grosso"]
  },
  {
    municipality: "Sinop",
    state: "MT",
    contacts: {
      environmental: "(66) 3511-4000", 
      police: "(66) 3511-1190",
      emergency: "(66) 3511-9911",
      defesaCivil: "(66) 3511-1199"
    },
    keywords: ["sinop", "mt", "mato grosso"]
  },
  {
    municipality: "Tangará da Serra",
    state: "MT",
    contacts: {
      environmental: "(65) 3311-4000",
      police: "(65) 3311-1190", 
      emergency: "(65) 3311-9911",
      defesaCivil: "(65) 3311-1199"
    },
    keywords: ["tangará da serra", "tangara da serra", "mt", "mato grosso"]
  },
  {
    municipality: "Cáceres",
    state: "MT",
    contacts: {
      environmental: "(65) 3223-4000",
      police: "(65) 3223-1190",
      emergency: "(65) 3223-9911", 
      defesaCivil: "(65) 3223-1199"
    },
    keywords: ["cáceres", "caceres", "mt", "mato grosso"]
  },
  {
    municipality: "Barra do Garças",
    state: "MT",
    contacts: {
      environmental: "(66) 3401-4000",
      police: "(66) 3401-1190",
      emergency: "(66) 3401-9911",
      defesaCivil: "(66) 3401-1199"
    },
    keywords: ["barra do garças", "barra do garcas", "mt", "mato grosso"]
  },
  {
    municipality: "Pontes e Lacerda",
    state: "MT", 
    contacts: {
      environmental: "(65) 3266-4000",
      police: "(65) 3266-1190",
      emergency: "(65) 3266-9911",
      defesaCivil: "(65) 3266-1199"
    },
    keywords: ["pontes e lacerda", "pontes lacerda", "mt", "mato grosso"]
  },
  {
    municipality: "Lucas do Rio Verde",
    state: "MT",
    contacts: {
      environmental: "(65) 3549-4000",
      police: "(65) 3549-1190", 
      emergency: "(65) 3549-9911",
      defesaCivil: "(65) 3549-1199"
    },
    keywords: ["lucas do rio verde", "lucas rio verde", "mt", "mato grosso"]
  },
  {
    municipality: "Sorriso",
    state: "MT",
    contacts: {
      environmental: "(66) 3544-4000",
      police: "(66) 3544-1190",
      emergency: "(66) 3544-9911",
      defesaCivil: "(66) 3544-1199"
    },
    keywords: ["sorriso", "mt", "mato grosso"]
  }
];

export const detectMunicipality = (location: string): MunicipalContact | null => {
  if (!location) return null;
  
  const normalizedLocation = location.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove acentos
  
  for (const contact of municipalContacts) {
    for (const keyword of contact.keywords) {
      const normalizedKeyword = keyword.toLowerCase()
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "");
      
      if (normalizedLocation.includes(normalizedKeyword)) {
        return contact;
      }
    }
  }
  
  return null;
};

export const getDefaultContacts = () => ({
  environmental: "0800 61 8080 (IBAMA)",
  police: "190 (Polícia Ambiental)",
  emergency: "193 (Bombeiros)",
  defesaCivil: "199 (Defesa Civil)"
});