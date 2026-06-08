const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const MESES_FULL = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

const HIERARQUIA = {
  secretaria: { secretario: 'Evânio Antônio de Araújo Júnior' },
  diretorias: [
    { id: 'dmape', sigla: 'DMAPE', nome: 'Diretoria de Monitoramento e Avaliação de Políticas Educacionais', diretor: 'Camila Porto Fasolo' },
    { id: 'dpg',   sigla: 'DPG',   nome: 'Diretoria de Governança e Integração de Dados',                   diretor: 'Daniel Lopes de Castro' },
    { id: 'diec',  sigla: 'DIEC',  nome: 'Diretoria de Inovação, Estratégia Digital e Conhecimento',        diretor: 'Fernando de Barros Filgueiras' },
  ],
  coordenacoes: [
    { id: 'cgiee',  sigla: 'CGIEE',  nome: 'Coord.-Geral de Informação Estratégica em Educação', diretoria_id: 'dmape', coordenador: 'Lucas Evencio Soares Dutra' },
    { id: 'cgmon',  sigla: 'CGMON',  nome: 'Coord.-Geral de Monitoramento',                      diretoria_id: 'dmape', coordenador: 'Andrei Zwetsch Cavalheiro' },
    { id: 'cgaval', sigla: 'CGAVAL', nome: 'Coord.-Geral de Avaliação',                           diretoria_id: 'dmape', coordenador: 'Giovanna Megumi Ishida Tedesco' },
    { id: 'cgied',  sigla: 'CGIED',  nome: 'Coord.-Geral de Integração Estratégica de Dados',    diretoria_id: 'dpg',   coordenador: 'Magno Peluso Torquette' },
  ],
};

// nivel: secretaria | diretoria | coordenacao | gerente | servidor | consultor | bolsista | terceirizado | estagiario
const EQUIPE = [
  // ── Secretário ──────────────────────────────────────────────────────────────
  { id: 'evanio',      nome: 'Evânio Antônio de Araújo Júnior',        area: 'SEGAPE',       vinculo: 'Secretário',    sala: '8º Andar, Sala 813', nivel: 'secretaria'   },

  // ── Diretores ───────────────────────────────────────────────────────────────
  { id: 'camila',      nome: 'Camila Porto Fasolo',                     area: 'DMAPE',        vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'diretoria'    },
  { id: 'daniel_c',    nome: 'Daniel Lopes de Castro',                  area: 'DPG',          vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'diretoria'    },
  { id: 'fernando',    nome: 'Fernando de Barros Filgueiras',           area: 'DIEC',         vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'diretoria'    },

  // ── Gabinete / Secretaria ────────────────────────────────────────────────────
  { id: 'oscar',       nome: 'Oscar Silva Neto',                        area: 'GAB',          vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'coordenacao'  },
  { id: 'valeria',     nome: 'Valéria da Costa Rodrigues de Lima',      area: 'GAB',          vinculo: 'Servidor',      sala: '9º Andar, Sala 931', nivel: 'coordenacao'  },
  { id: 'claudia_p',   nome: 'Cláudia Rezende Medeiros Passetto',       area: 'GAB',          vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'servidor'     },
  { id: 'andreia',     nome: 'Andréia da Silva Ferreira',               area: 'GAB',          vinculo: 'Terceirizado',  sala: '9º Andar, Sala 805', nivel: 'terceirizado' },
  { id: 'camylle',     nome: 'Camylle de Jesus Pereira Brito',          area: 'GAB',          vinculo: 'Terceirizado',  sala: '8º Andar, Sala 813', nivel: 'terceirizado' },

  // ── Coord.-Gerais ────────────────────────────────────────────────────────────
  { id: 'andrei',      nome: 'Andrei Zwetsch Cavalheiro',               area: 'DMAPE',        vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'coordenacao'  },
  { id: 'giovanna',    nome: 'Giovanna Megumi Ishida Tedesco',          area: 'DMAPE',        vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'coordenacao'  },
  { id: 'lucas',       nome: 'Lucas Evencio Soares Dutra',              area: 'DMAPE',        vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'coordenacao'  },

  // ── Gerentes de Projeto (GM) ─────────────────────────────────────────────────
  { id: 'luiz',        nome: 'Luiz Rogério Lopes Silva',                area: 'GM',           vinculo: 'Consultor',     sala: '8º Andar, Sala 813', nivel: 'gerente'      },
  { id: 'lidianne',    nome: 'Lidianne Salvatierra Paz Trigueiro',      area: 'GM',           vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'gerente'      },
  { id: 'cristiano',   nome: 'Cristiano de Santana Pereira',            area: 'GM',           vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'gerente'      },
  { id: 'ruy',         nome: 'Ruy de Deus e Mello Neto',                area: 'GM',           vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'gerente'      },
  { id: 'anderson',    nome: 'Anderson Gregório Marques Soares',        area: 'GM',           vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'gerente'      },
  { id: 'marco',       nome: 'Marco Aurélio Marques Ferreira',          area: 'GM',           vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'gerente'      },
  { id: 'augusto',     nome: 'Augusto Souza Cavalcante',                area: 'GM',           vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'gerente'      },
  { id: 'lucas_m',     nome: 'Lucas de Mattos Moura Fernandes',         area: 'GM / DMAPE',   vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'gerente'      },

  // ── Servidores / Analistas ───────────────────────────────────────────────────
  { id: 'thamires',    nome: 'Thamires Queiroga de Macedo',             area: 'DMAPE',        vinculo: 'Servidor',      sala: 'Anexo I, 3º Andar, Sala 312', nivel: 'servidor' },
  { id: 'claudiomar',  nome: 'Claudiomar Matias Rolim Filho',           area: 'DMAPE',        vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'servidor'     },
  { id: 'iara',        nome: 'Iara Christina Silva Barroca',            area: 'DIEC',         vinculo: 'Servidor',      sala: '4º Andar, Sala 418', nivel: 'servidor'     },
  { id: 'nathalia',    nome: 'Nathalia Marques Bontempo',               area: 'DIEC',         vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'servidor'     },
  { id: 'manuel',      nome: 'Manuel Ruas Pereira Coelho Bonduki',      area: 'DIEC',         vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'servidor'     },
  { id: 'ellen',       nome: 'Ellen Bruno de Souza',                    area: 'DPG',          vinculo: 'Servidor',      sala: '8º Andar, Sala 803', nivel: 'servidor'     },
  { id: 'samita',      nome: 'Samita Pessoa Fidélis',                   area: 'DPG',          vinculo: 'Servidor',      sala: 'Anexo I, 3º Andar, Sala 312', nivel: 'servidor' },
  { id: 'milton',      nome: 'Milton Pereira de França Netto',          area: 'DPG',          vinculo: 'Servidor',      sala: '8º Andar, Sala 813', nivel: 'servidor'     },
  { id: 'jannete',     nome: 'Jannete de Sousa de Figueiredo Alves',    area: 'SE/SAA',       vinculo: 'Servidor',      sala: 'Anexo I, 3º Andar, Sala 320', nivel: 'servidor' },
  { id: 'samira',      nome: 'Samira de Oliveira Machado',              area: 'CGMES/SERES',  vinculo: 'Servidor',      sala: '5º Andar, Sala 527', nivel: 'servidor'     },
  { id: 'sara',        nome: 'Sara Chaves Costa',                       area: 'CGDATA/SERES', vinculo: 'Servidor',      sala: '1º Andar, Sala 118', nivel: 'servidor'     },

  // ── Consultores ─────────────────────────────────────────────────────────────
  { id: 'thiago',      nome: 'Thiago Guimarães Cardoso',                area: 'SE/GAB/UNESCO',vinculo: 'Consultor',     sala: '7º Andar, Sala 703', nivel: 'consultor'    },
  { id: 'deborah',     nome: 'Deborah Piego',                           area: 'DMAPE',        vinculo: 'Consultor',     sala: '8º Andar, Sala 813', nivel: 'consultor'    },
  { id: 'wesla',       nome: 'Wesla de Souza Monteiro',                 area: 'GM/UNESCO',    vinculo: 'Consultor',     sala: '8º Andar, Sala 813', nivel: 'consultor'    },
  { id: 'arthur',      nome: 'Arthur Barbosa Magdaleno',                area: 'DMAPE',        vinculo: 'Consultor',     sala: '8º Andar, Sala 813', nivel: 'consultor'    },
  { id: 'luiz_f',      nome: 'Luiz Felipe Vieira Silva',                area: 'DMAPE',        vinculo: 'Consultor',     sala: '8º Andar, Sala 813', nivel: 'consultor'    },
  { id: 'juliana',     nome: 'Juliana Maria de Araújo',                 area: 'DMAPE',        vinculo: 'Consultor',     sala: '8º Andar, Sala 813', nivel: 'consultor'    },
  { id: 'denise',      nome: 'Denise Chaves Lopes Feres',               area: 'DMAPE',        vinculo: 'Consultor',     sala: '8º Andar, Sala 813', nivel: 'consultor'    },
  { id: 'eduardo',     nome: 'Eduardo Chagas Lustoza',                  area: 'DMAPE',        vinculo: 'Consultor',     sala: '8º Andar, Sala 813', nivel: 'consultor'    },

  // ── Terceirizados ────────────────────────────────────────────────────────────
  { id: 'jessica',     nome: 'Jessica Rodrigues da Silva',              area: 'DPG/G4F',      vinculo: 'Terceirizado',  sala: '8º Andar, Sala 813', nivel: 'terceirizado' },

  // ── Bolsistas ────────────────────────────────────────────────────────────────
  { id: 'silvana',     nome: 'Silvana Rosa Lisboa de Sá',               area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'ana_b',       nome: 'Ana Beatriz Pereira Sette',               area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'daniel_b',    nome: 'Daniel Santos Braga',                     area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'rogerio',     nome: 'Rogério Santos',                          area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'francisco',   nome: 'Francisco Mello Castro',                  area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'silvana2',    nome: 'Silvana Rosa Lisboa de Sá',               area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'alice',       nome: 'Alice de Oliveira Garcêz',                area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'rosimere',    nome: 'Rosimere Miranda Fortini',                area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'orlando',     nome: 'Orlando Rogério Campanini',               area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'karen',       nome: 'Karen Pereira Álvares',                   area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'david',       nome: 'David Diniz Kalichman',                   area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'thatyana',    nome: 'Thatyana de Faria Piola Seraphim',        area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'robson',      nome: 'Robson Bento Santos',                     area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },
  { id: 'alexandra',   nome: 'Alexandra Waltrick Russi',                area: 'GM',           vinculo: 'Bolsista',      sala: '8º Andar, Sala 813', nivel: 'bolsista'     },

  // ── Estagiários ─────────────────────────────────────────────────────────────
  { id: 'pedro_l',     nome: 'Pedro Lucas Vieira Aguiar',               area: 'DPG',          vinculo: 'Estagiário',    sala: '8º Andar, Sala 813', nivel: 'estagiario'   },
  { id: 'joao_v',      nome: 'João Victor de Oliveira Silva',           area: 'CGF/SPO',      vinculo: 'Estagiário',    sala: 'Anexo I, 1º Andar, Sala 139', nivel: 'estagiario' },
  { id: 'rafael_q',    nome: 'Rafael Queiroz da Trindade',              area: 'DPG',          vinculo: 'Estagiário',    sala: 'Anexo I, 3º Andar, Sala 312', nivel: 'estagiario' },
];

const PRODUTOS_CATALOGO = [
  { id: 'painel_ed_basica',     nome: 'Painel Educação Básica',          tipo: 'painel_publico',          gerente_id: 'luiz',      coordenacao_id: 'cgmon',  descricao: 'Indicadores de matrícula, fluxo, infraestrutura e docentes da educação básica' },
  { id: 'painel_ept',           nome: 'Painel EPT',                       tipo: 'painel_publico',          gerente_id: 'cristiano', coordenacao_id: 'cgmon',  descricao: 'Indicadores da educação profissional e tecnológica' },
  { id: 'painel_ens_superior',  nome: 'Painel Ensino Superior',           tipo: 'painel_publico',          gerente_id: 'cristiano', coordenacao_id: 'cgmon',  descricao: 'Indicadores de acesso, permanência e conclusão no ensino superior' },
  { id: 'painel_equidade',      nome: 'Painel Equidade',                  tipo: 'painel_publico',          gerente_id: 'lidianne',  coordenacao_id: 'cgaval', descricao: 'Indicadores de equidade e políticas étnico-raciais (PNEERQ)' },
  { id: 'painel_alfabetizacao', nome: 'Painel Alfabetização',             tipo: 'painel_publico',          gerente_id: 'lidianne',  coordenacao_id: 'cgaval', descricao: 'Indicadores do programa Compromisso Nacional Criança Alfabetizada' },
  { id: 'painel_tempo_integral',nome: 'Painel Tempo Integral',            tipo: 'painel_publico',          gerente_id: 'ruy',       coordenacao_id: 'cgmon',  descricao: 'Indicadores do Programa Escola em Tempo Integral' },
  { id: 'painel_fundeb',        nome: 'Painel Fundeb',                    tipo: 'painel_publico',          gerente_id: 'ruy',       coordenacao_id: 'cgied',  descricao: 'Indicadores de financiamento via Fundeb' },
  { id: 'painel_financiamento', nome: 'Painel Financiamento da Educação', tipo: 'painel_publico',          gerente_id: 'ruy',       coordenacao_id: 'cgied',  descricao: 'Visão consolidada do financiamento educacional' },
  { id: 'painel_estrategico',   nome: 'Painel Estratégico SEGAPE',        tipo: 'painel_estrategico',      gerente_id: 'luiz',      coordenacao_id: 'cgiee',  descricao: 'Painel interno para gestores — indicadores estratégicos e metas' },
  { id: 'aqui_tem_mec',         nome: 'Aqui Tem MEC — Estados',           tipo: 'relatorio_personalizado', gerente_id: 'cristiano', coordenacao_id: 'cgmon',  descricao: 'Relatórios municipais com ações e investimentos do MEC' },
  { id: 'aqui_tem_equidade',    nome: 'Aqui Tem Equidade',                tipo: 'relatorio_personalizado', gerente_id: 'lidianne',  coordenacao_id: 'cgaval', descricao: 'Relatórios de políticas de equidade educacional' },
  { id: 'aqui_tem_superior',    nome: 'Aqui Tem Superior',                tipo: 'relatorio_personalizado', gerente_id: 'ruy',       coordenacao_id: 'cgmon',  descricao: 'Relatórios das universidades federais (CESUP)' },
  { id: 'indicadores_pne',      nome: 'Indicadores PNE 2026–2036',        tipo: 'painel_indicadores',      gerente_id: 'luiz',      coordenacao_id: 'cgiee',  descricao: 'Mapeamento e acompanhamento de metas do PNE' },
];

const TIPOS_PRODUTO = {
  painel_publico:          { label: 'Painel Educadados',       cor: '#1D7A55' },
  painel_estrategico:      { label: 'Painel Estratégico',      cor: '#1B3A6B' },
  painel_indicadores:      { label: 'Painel de Indicadores',   cor: '#2E5CA8' },
  relatorio_personalizado: { label: 'Relatório Personalizado', cor: '#C8922A' },
};

const COMPLEXIDADE = {
  baixa:  { label: 'Baixa',   cor: '#1D7A55' },
  media:  { label: 'Média',   cor: '#C8922A' },
  alta:   { label: 'Alta',    cor: '#B34A2A' },
  critica:{ label: 'Crítica', cor: '#7B0A0A' },
};

const FASES = {
  planejamento: { label: 'Planejamento',            cor: '#2E5CA8', ordem: 1 },
  execucao:     { label: 'Execução',                cor: '#C8922A', ordem: 2 },
  revisao:      { label: 'Revisão técnica',         cor: '#B07B1A', ordem: 3 },
  validacao:    { label: 'Validação institucional', cor: '#5B8DD9', ordem: 4 },
  publicacao:   { label: 'Publicação',              cor: '#1D7A55', ordem: 5 },
};

const STATUS_LABELS = {
  planejado:    { label: 'Planejado',    cor: '#2E5CA8' },
  em_andamento: { label: 'Em andamento', cor: '#C8922A' },
  concluido:    { label: 'Concluído',    cor: '#1D7A55' },
  suspenso:     { label: 'Suspenso',     cor: '#888'    },
};

const PRIORIDADES = {
  alta:  { label: 'Alta',  cor: '#B34A2A' },
  media: { label: 'Média', cor: '#C8922A' },
  baixa: { label: 'Baixa', cor: '#2E5CA8' },
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function getProduto(id)             { return PRODUTOS_CATALOGO.find(p => p.id === id) || null; }
function getProdutosPorGerente(gid) { return PRODUTOS_CATALOGO.filter(p => p.gerente_id === gid); }
function getMembroEquipe(id)        { return EQUIPE.find(e => e.id === id) || null; }
function getGerentes()              { return EQUIPE.filter(e => e.nivel === 'gerente'); }
function getSiglaCoordenacao(id)    { const c = HIERARQUIA.coordenacoes.find(x => x.id === id); return c ? c.sigla : '—'; }
function mesToNome(n)               { return MESES[n - 1] || '?'; }

// Todos que podem ser executores de tarefas (exceto secretaria, diretoria, coordenação)
function getExecutores() {
  const niveis = ['gerente','servidor','consultor','bolsista','terceirizado','estagiario'];
  return EQUIPE.filter(e => niveis.includes(e.nivel))
               .sort((a,b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

// ── Badges ───────────────────────────────────────────────────────────────────
function badge(label, cor) {
  return `<span style="display:inline-block;padding:2px 9px;border-radius:20px;font-size:0.72rem;font-weight:500;background:${cor}18;color:${cor};border:1px solid ${cor}40">${label}</span>`;
}
function statusBadge(s)  { const x = STATUS_LABELS[s]  || {label:s, cor:'#888'}; return badge(x.label, x.cor); }
function faseBadge(f)    { const x = FASES[f]           || {label:f, cor:'#888'}; return badge(x.label, x.cor); }
function complexBadge(c) { const x = COMPLEXIDADE[c]    || {label:c, cor:'#888'}; return badge(x.label, x.cor); }
function tipoBadge(t)    { const x = TIPOS_PRODUTO[t]   || {label:t, cor:'#888'}; return badge(x.label, x.cor); }
function vincBadge(v) {
  const cores = {
    'Secretário':'#7B0A0A','Servidor':'#1B3A6B','Consultor':'#1D7A55',
    'Bolsista':'#C8922A','Terceirizado':'#7B3FA0','Estagiário':'#2E5CA8'
  };
  return badge(v, cores[v] || '#888');
}
