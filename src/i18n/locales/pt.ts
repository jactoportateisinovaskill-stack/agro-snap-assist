export type Dict = {
  common: { back: string; continue: string; required: string; logout: string; language: string };
  region: {
    title: string; subtitle: string; label: string; placeholder: string; hint: string;
    cta: string; disabled: string; technician: string;
  };
  login: {
    title: string; subtitle: string; name: string; email: string; password: string;
    role: string; roleUser: string; roleManager: string; submit: string;
    regionLabel: string; changeRegion: string; noRegion: string;
  };
  nav: { insights: string; identify: string };
};

export const pt: Dict = {
  common: {
    back: "Voltar",
    continue: "Continuar",
    required: "Obrigatório",
    logout: "Sair",
    language: "Idioma",
  },
  region: {
    title: "Identifique qualquer peça agrícola em segundos.",
    subtitle: "Antes de começar, informe sua região de atendimento.",
    label: "Região de atendimento",
    placeholder: "Ex.: Mato Grosso, Argentina, Centro-Oeste",
    hint: "Essa informação influencia os equipamentos e materiais disponíveis.",
    cta: "Continuar para login",
    disabled: "Informe a região para continuar",
    technician: "Técnico",
  },
  login: {
    title: "Acesse sua conta",
    subtitle: "Entre para iniciar a identificação de peças.",
    name: "Nome",
    email: "E-mail",
    password: "Senha",
    role: "Perfil de acesso",
    roleUser: "Usuário",
    roleManager: "Gestor",
    submit: "Entrar",
    regionLabel: "Região selecionada",
    changeRegion: "Alterar",
    noRegion: "Selecione uma região antes de continuar",
  },
  nav: {
    insights: "Insights",
    identify: "Identificar peça",
  },
};
