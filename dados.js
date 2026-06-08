// ============================================================
// SEGAPE/MEC — Camada de Dados v3.0
// Estrutura: Secretário > Diretores > Coord-Gerais > Gerentes > Bolsistas
// Modelo: Produto (fixo) > Ação (planejada) > Executor (bolsista)
// ============================================================

const STORAGE_KEY = 'segape_data_v3';

const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const MESES_FULL = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const ANO_ATUAL = new Date().getFullYear();

// ============================================================
// HIERARQUIA INSTITUCIONAL
// ============================================================

const HIERARQUIA = {
  secretaria: {
    nome: 'SEGAPE/MEC',
    nome_completo: 'Secretaria de Gestão da Informação, Inovação e Avaliação de Políticas Educacionais',
    secretario: 'Evânio Antônio de Araújo Júnior',
  },
  diretorias: [
    { id: 'dmape', sigla: 'DMAPE', nome: 'Diretoria de Monitoramento e Avaliação de Políticas Educacionais', diretor: 'Camila Porto Fasolo' },
    { id: 'dpg',   sigla: 'DPG',   nome: 'Diretoria de Governança e Integração de Dados', diretor: 'Daniel Lopes de Castro' },
    { id: 'diec',  sigla: 'DIEC',  nome: 'Diretoria de Inovação, Estratégia Digital e Conhecimento', diretor: 'Fernando de Barros Filgueiras' },
  ],
  coordenacoes: [
    { id: 'cgiee', sigla: 'CGIEE', nome: 'Coord.-Geral de Informação Estratégica em Educação', diretoria_id: 'dmape', coordenador: 'Lucas Evencio Soares Dutra' },
    { id: 'cgmon', sigla: 'CGMON', nome: 'Coord.-Geral de Monitoramento', diretoria_id: 'dmape', coordenador: 'Andrei Zwetsch Cavalheiro' },
    { id: 'cgaval',sigla: 'CGAVAL',nome: 'Coord.-Geral de Avaliação', diretoria_id: 'dmape', coordenador: 'Giovanna Megumi Ishida Tedesco' },
    { id: 'cgied', sigla: 'CGIED', nome: 'Coord.-Geral de Integração Estratégica de Dados', diretoria_id: 'dpg', coordenador: 'Magno Peluso Torquette' },
  ],
};

// ============================================================
// EQUIPE COMPLETA COM VÍNCULOS
// ============================================================

const EQUIPE = [
  // Diretoria
  { id: 'camila',    nome: 'Camila Porto Fasolo',                  area: 'DMAPE', vinculo: 'Servidor',     papel: 'Diretora',                    nivel: 'diretoria' },
  // Coord-Gerais
  { id: 'andrei',    nome: 'Andrei Zwetsch Cavalheiro',             area: 'DMAPE', vinculo: 'Servidor',     papel: 'Coord.-Geral de Monitoramento', nivel: 'coordenacao' },
  { id: 'giovanna',  nome: 'Giovanna Megumi Ishida Tedesco',        area: 'DMAPE', vinculo: 'Servidor',     papel: 'Coord.-Geral de Avaliação',     nivel: 'coordenacao' },
  { id: 'lucas',     nome: 'Lucas Evencio Soares Dutra',            area: 'DMAPE', vinculo: 'Servidor',     papel: 'Coord.-Geral CGIEE',            nivel: 'coordenacao' },
  // Gerentes
  { id: 'luiz',      nome: 'Luiz Rogério Lopes Silva',              area: 'GM',    vinculo: 'Consultor',    papel: 'Gerente de Projeto',            nivel: 'gerente' },
  { id: 'lidianne',  nome: 'Lidianne Salvatierra Paz Trigueiro',    area: 'GM',    vinculo: 'Servidor',     papel: 'Analista / Gerente',            nivel: 'gerente' },
  { id: 'cristiano', nome: 'Cristiano de Santana Pereira',          area: 'GM',    vinculo: 'Servidor',     papel: 'Analista / Gerente',            nivel: 'gerente' },
  { id: 'ruy',       nome: 'Ruy de Deus e Mello Neto',              area: 'GM',    vinculo: 'Servidor',     papel: 'Analista / Gerente',            nivel: 'gerente' },
  // Analistas / Executores
  { id: 'denise',    nome: 'Denise Chaves Lopes Feres',             area: 'DMAPE', vinculo: 'Consultor',    papel: 'Analista',                      nivel: 'executor' },
  { id: 'juliana',   nome: 'Juliana Maria de Araújo',               area: 'DMAPE', vinculo: 'Consultor',    papel: 'Analista',                      nivel: 'executor' },
  { id: 'selma',     nome: 'Selma Teles do Nascimento',             area: 'DMAPE', vinculo: 'Servidor',     papel: 'Analista',                      nivel: 'executor' },
  { id: 'jessica',   nome: 'Jessica Rodrigues da Silva',            area: 'DPG',   vinculo: 'Terceirizado', papel: 'Analista',                      nivel: 'executor' },
  { id: 'leticia',   nome: 'Leticia Cortellazzi Garcia',            area: 'DMAPE', vinculo: 'Consultor',    papel: 'Analista',                      nivel: 'executor' },
  { id: 'mauricio',  nome: 'Mauricio Almeida Prado',                area: 'DMAPE', vinculo: 'Servidor',     papel: 'Analista',                      nivel: 'executor' },
  // Bolsistas
  { id: 'silvana',   nome: 'Silvana Rosa Lisboa de Sá',             area: 'GM',    vinculo: 'Bolsista',     papel: 'Apoio',                         nivel: 'bolsista' },
  { id: 'carlos',    nome: 'Carlos Augusto Alves de Sousa Júnior',  area: 'GM',    vinculo: 'Bolsista',     papel: 'Apoio',                         nivel: 'bolsista' },
];

// ============================================================
// PRODUTOS FIXOS DA EDUCADADOS (catálogo institucional)
// Cada gerente é responsável por um ou mais produtos
// ============================================================

const PRODUTOS_CATALOGO = [
  // Painéis Públicos (Educadados)
  { id: 'painel_ed_basica',    nome: 'Painel Educação Básica',           tipo: 'painel_publico',      gerente_id: 'luiz',      coordenacao_id: 'cgmon', tema: 'acesso_oferta',    descricao: 'Indicadores de matrícula, fluxo, infraestrutura e docentes da educação básica' },
  { id: 'painel_ept',          nome: 'Painel EPT',                        tipo: 'painel_publico',      gerente_id: 'cristiano', coordenacao_id: 'cgmon', tema: 'ept',               descricao: 'Indicadores da educação profissional e tecnológica' },
  { id: 'painel_ens_superior', nome: 'Painel Ensino Superior',            tipo: 'painel_publico',      gerente_id: 'cristiano', coordenacao_id: 'cgmon', tema: 'ensino_superior',  descricao: 'Indicadores de acesso, permanência e conclusão no ensino superior' },
  { id: 'painel_equidade',     nome: 'Painel Equidade',                   tipo: 'painel_publico',      gerente_id: 'lidianne',  coordenacao_id: 'cgaval',tema: 'desigualdades',    descricao: 'Indicadores de equidade e políticas étnico-raciais (PNEERQ)' },
  { id: 'painel_alfabetizacao',nome: 'Painel Alfabetização',              tipo: 'painel_publico',      gerente_id: 'lidianne',  coordenacao_id: 'cgaval',tema: 'permanencia_fluxo',descricao: 'Indicadores do programa Compromisso Nacional Criança Alfabetizada' },
  { id: 'painel_tempo_integral',nome:'Painel Tempo Integral',             tipo: 'painel_publico',      gerente_id: 'ruy',       coordenacao_id: 'cgmon', tema: 'infraestrutura',   descricao: 'Indicadores do Programa Escola em Tempo Integral' },
  { id: 'painel_fundeb',       nome: 'Painel Fundeb',                     tipo: 'painel_publico',      gerente_id: 'ruy',       coordenacao_id: 'cgied', tema: 'financiamento',    descricao: 'Indicadores de financiamento via Fundeb' },
  { id: 'painel_financiamento',nome: 'Painel Financiamento da Educação',  tipo: 'painel_publico',      gerente_id: 'ruy',       coordenacao_id: 'cgied', tema: 'financiamento',    descricao: 'Visão consolidada do financiamento educacional' },
  // Painel Estratégico (interno)
  { id: 'painel_estrategico',  nome: 'Painel Estratégico SEGAPE',         tipo: 'painel_estrategico',  gerente_id: 'luiz',      coordenacao_id: 'cgiee', tema: 'governanca',       descricao: 'Painel interno para gestores — indicadores estratégicos e metas' },
  // Relatórios Personalizados
  { id: 'aqui_tem_mec',        nome: 'Aqui Tem MEC — Estados',            tipo: 'relatorio_personalizado', gerente_id: 'cristiano', coordenacao_id: 'cgmon', tema: 'acesso_oferta', descricao: 'Relatórios municipais com ações e investimentos do MEC' },
  { id: 'aqui_tem_equidade',   nome: 'Aqui Tem Equidade',                 tipo: 'relatorio_personalizado', gerente_id: 'lidianne',  coordenacao_id: 'cgaval',tema: 'desigualdades', descricao: 'Relatórios de políticas de equidade educacional' },
  { id: 'aqui_tem_superior',   nome: 'Aqui Tem Superior',                 tipo: 'relatorio_personalizado', gerente_id: 'ruy',       coordenacao_id: 'cgmon', tema: 'ensino_superior', descricao: 'Relatórios das universidades federais (CESUP)' },
  // Indicadores estratégicos / estudos
  { id: 'indicadores_pne',     nome: 'Indicadores PNE 2026–2036',         tipo: 'painel_indicadores',  gerente_id: 'luiz',      coordenacao_id: 'cgiee', tema: 'governanca',       descricao: 'Mapeamento e acompanhamento de metas do Plano Nacional de Educação' },
];

// ============================================================
// TIPOS DE PRODUTO
// ============================================================

const TIPOS_PRODUTO = {
  painel_publico:          { label: 'Painel Educadados (público)',   cor: '#1D7A55' },
  painel_estrategico:      { label: 'Painel Estratégico (interno)',  cor: '#1B3A6B' },
  painel_indicadores:      { label: 'Painel de Indicadores',         cor: '#2E5CA8' },
  relatorio_personalizado: { label: 'Relatório Personalizado',       cor: '#C8922A' },
  estudo_tecnico:          { label: 'Estudo / Policy Paper',         cor: '#7B3FA0' },
};

// ============================================================
// TEMAS PRIORITÁRIOS (seção 15 do Produto 1)
// ============================================================

const TEMAS = {
  acesso_oferta:    { label: 'Acesso e oferta educacional',           cor: '#2E5CA8' },
  permanencia_fluxo:{ label: 'Permanência e fluxo escolar',           cor: '#1D7A55' },
  docentes:         { label: 'Formação e distribuição de docentes',   cor: '#C8922A' },
  infraestrutura:   { label: 'Infraestrutura e funcionamento',        cor: '#5B8DD9' },
  programas_federais:{ label: 'Programas federais',                   cor: '#B07B1A' },
  desigualdades:    { label: 'Desigualdades educacionais',            cor: '#B34A2A' },
  ensino_superior:  { label: 'Ensino Superior / Pós-graduação',       cor: '#6B3A8A' },
  ept:              { label: 'Educação Profissional e Tecnológica',   cor: '#1A6B5A' },
  financiamento:    { label: 'Financiamento da educação',             cor: '#7A5A1A' },
  governanca:       { label: 'Governança de dados / INDE / SNE',      cor: '#1B3A6B' },
};

// ============================================================
// COMPLEXIDADE DAS AÇÕES
// ============================================================

const COMPLEXIDADE = {
  baixa:  { label: 'Baixa',  cor: '#1D7A55', dias_estimados: 3  },
  media:  { label: 'Média',  cor: '#C8922A', dias_estimados: 7  },
  alta:   { label: 'Alta',   cor: '#B34A2A', dias_estimados: 15 },
  critica:{ label: 'Crítica',cor: '#7B0A0A', dias_estimados: 30 },
};

// ============================================================
// FASES DE UMA AÇÃO
// ============================================================

const FASES = {
  planejamento:   { label: 'Planejamento',            cor: '#2E5CA8', ordem: 1 },
  execucao:       { label: 'Execução',                cor: '#C8922A', ordem: 2 },
  revisao:        { label: 'Revisão técnica',         cor: '#B07B1A', ordem: 3 },
  validacao:      { label: 'Validação institucional', cor: '#5B8DD9', ordem: 4 },
  publicacao:     { label: 'Publicação',              cor: '#1D7A55', ordem: 5 },
};

const STATUS_LABELS = {
  planejado:          { label: 'Planejado',       cor: '#2E5CA8' },
  em_andamento:       { label: 'Em andamento',    cor: '#C8922A' },
  concluido:          { label: 'Concluído',       cor: '#1D7A55' },
  suspenso:           { label: 'Suspenso',        cor: '#888'    },
  aguardando_revisao: { label: 'Ag. revisão',     cor: '#5B8DD9' },
  aprovado:           { label: 'Aprovado',        cor: '#1D7A55' },
};

const PRIORIDADES = {
  alta:  { label: 'Alta',  cor: '#B34A2A' },
  media: { label: 'Média', cor: '#C8922A' },
  baixa: { label: 'Baixa', cor: '#2E5CA8' },
};

// ============================================================
// PERSISTÊNCIA
// ============================================================

function getData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    return JSON.parse(raw);
  } catch(e) { return getDefaultData(); }
}

function saveData(data) {
  data.ultima_atualizacao = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getDefaultData() {
  return {
    criado_em: new Date().toISOString(),
    ultima_atualizacao: new Date().toISOString(),
    ano_planejamento: ANO_ATUAL,
    // Ações planejadas pelos gerentes para cada produto
    acoes: [],
  };
}

// ============================================================
// AÇÕES (unidade central do sistema)
// Uma ação pertence a um produto, tem executor (bolsista/analista),
// estimativa de horas, complexidade, fase, prazo e % de avanço
// ============================================================

function criarAcao(campos) {
  const data = getData();
  const nova = {
    id: 'acao_' + crypto.randomUUID().slice(0,8),
    // Vinculação
    produto_id: campos.produto_id,
    gerente_id: campos.gerente_id,
    // Descrição
    titulo: campos.titulo,
    descricao: campos.descricao || '',
    // Executor
    executor_id: campos.executor_id || null,   // bolsista ou analista
    // Planejamento
    fase: campos.fase || 'planejamento',
    prioridade: campos.prioridade || 'media',
    complexidade: campos.complexidade || 'media',
    mes_inicio: parseInt(campos.mes_inicio),
    mes_fim: parseInt(campos.mes_fim),
    horas_estimadas: parseInt(campos.horas_estimadas) || 0,
    // Progresso
    percentual: parseInt(campos.percentual) || 0,
    status: campos.status || 'planejado',
    // Aprovação em cadeia
    aprovacao_coord: 'pendente',   // coordenador valida
    aprovacao_dir: 'pendente',     // diretor valida
    aprovacao_sec: 'pendente',     // secretário aprova
    // Metadados
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
  };
  data.acoes.push(nova);
  saveData(data);
  return nova;
}

function atualizarAcao(id, campos) {
  const data = getData();
  const idx = data.acoes.findIndex(d => d.id === id);
  if (idx === -1) return null;
  data.acoes[idx] = { ...data.acoes[idx], ...campos, atualizado_em: new Date().toISOString() };
  saveData(data);
  return data.acoes[idx];
}

function removerAcao(id) {
  const data = getData();
  data.acoes = data.acoes.filter(d => d.id !== id);
  saveData(data);
}

// ============================================================
// HELPERS DE LOOKUP
// ============================================================

function getProduto(id) {
  return PRODUTOS_CATALOGO.find(p => p.id === id) || null;
}
function getProdutosPorGerente(gerente_id) {
  return PRODUTOS_CATALOGO.filter(p => p.gerente_id === gerente_id);
}
function getMembroEquipe(id) {
  return EQUIPE.find(e => e.id === id) || null;
}
function getBolsistasEExecutores() {
  return EQUIPE.filter(e => e.nivel === 'bolsista' || e.nivel === 'executor');
}
function getGerentes() {
  return EQUIPE.filter(e => e.nivel === 'gerente');
}
function getNomeCoordenacao(id) {
  const c = HIERARQUIA.coordenacoes.find(x => x.id === id);
  return c ? c.nome : '—';
}
function getSiglaCoordenacao(id) {
  const c = HIERARQUIA.coordenacoes.find(x => x.id === id);
  return c ? c.sigla : '—';
}
function getNomeDiretoria(id) {
  const d = HIERARQUIA.diretorias.find(x => x.id === id);
  return d ? d.nome : '—';
}
function getSiglaDiretoria(id) {
  const d = HIERARQUIA.diretorias.find(x => x.id === id);
  return d ? d.sigla : '—';
}
function mesToNome(n) { return MESES[n - 1] || '?'; }
function mesFullNome(n) { return MESES_FULL[n - 1] || '?'; }

// ============================================================
// BADGE HELPERS
// ============================================================

function statusBadgeHTML(status) {
  const s = STATUS_LABELS[status] || { label: status, cor: '#888' };
  return `<span style="display:inline-block;padding:2px 9px;border-radius:20px;font-size:0.72rem;font-weight:500;background:${s.cor}18;color:${s.cor};border:1px solid ${s.cor}40">${s.label}</span>`;
}
function prioridadeBadgeHTML(p) {
  const pr = PRIORIDADES[p] || { label: p, cor: '#888' };
  return `<span style="display:inline-block;padding:2px 9px;border-radius:20px;font-size:0.72rem;font-weight:500;background:${pr.cor}18;color:${pr.cor};border:1px solid ${pr.cor}40">${pr.label}</span>`;
}
function faseBadgeHTML(f) {
  const fase = FASES[f] || { label: f, cor: '#888' };
  return `<span style="display:inline-block;padding:2px 9px;border-radius:20px;font-size:0.72rem;font-weight:500;background:${fase.cor}18;color:${fase.cor};border:1px solid ${fase.cor}40">${fase.label}</span>`;
}
function complexidadeBadgeHTML(c) {
  const cx = COMPLEXIDADE[c] || { label: c, cor: '#888' };
  return `<span style="display:inline-block;padding:2px 9px;border-radius:20px;font-size:0.72rem;font-weight:500;background:${cx.cor}18;color:${cx.cor};border:1px solid ${cx.cor}40">${cx.label}</span>`;
}
function tipoProdutoBadgeHTML(tipo) {
  const t = TIPOS_PRODUTO[tipo] || { label: tipo, cor: '#888' };
  return `<span style="display:inline-block;padding:2px 9px;border-radius:20px;font-size:0.72rem;font-weight:500;background:${t.cor}18;color:${t.cor};border:1px solid ${t.cor}40">${t.label}</span>`;
}
function vincBadgeHTML(vinculo) {
  const cores = { Servidor:'#1B3A6B', Consultor:'#1D7A55', Bolsista:'#C8922A', Terceirizado:'#7B3FA0' };
  const cor = cores[vinculo] || '#888';
  return `<span style="display:inline-block;padding:2px 9px;border-radius:20px;font-size:0.72rem;font-weight:500;background:${cor}18;color:${cor};border:1px solid ${cor}40">${vinculo}</span>`;
}

function ganttBarHTML(mes_inicio, mes_fim, cor) {
  const start = ((mes_inicio - 1) / 12) * 100;
  const width  = ((mes_fim - mes_inicio + 1) / 12) * 100;
  return `<div style="position:relative;height:18px;background:#eee;border-radius:4px;overflow:hidden">
    <div style="position:absolute;left:${start}%;width:${width}%;height:100%;background:${cor};border-radius:4px;"></div>
  </div>`;
}

// ============================================================
// RESUMO / MÉTRICAS
// ============================================================

function calcularResumo() {
  const data = getData();
  const acoes = data.acoes;
  const totalHoras = acoes.reduce((s, a) => s + (a.horas_estimadas || 0), 0);
  const mediaPercentual = acoes.length
    ? Math.round(acoes.reduce((s, a) => s + (a.percentual || 0), 0) / acoes.length) : 0;

  // por produto
  const porProduto = {};
  PRODUTOS_CATALOGO.forEach(p => {
    const ac = acoes.filter(a => a.produto_id === p.id);
    porProduto[p.id] = {
      total: ac.length,
      horas: ac.reduce((s,a) => s + (a.horas_estimadas||0), 0),
      concluidas: ac.filter(a => a.status === 'concluido').length,
      media_pct: ac.length ? Math.round(ac.reduce((s,a)=>s+(a.percentual||0),0)/ac.length) : 0,
    };
  });

  // por executor
  const porExecutor = {};
  EQUIPE.filter(e => e.nivel === 'bolsista' || e.nivel === 'executor').forEach(e => {
    const ac = acoes.filter(a => a.executor_id === e.id);
    porExecutor[e.id] = {
      total: ac.length,
      horas: ac.reduce((s,a) => s + (a.horas_estimadas||0), 0),
    };
  });

  return {
    total_acoes: acoes.length,
    total_horas: totalHoras,
    media_percentual: mediaPercentual,
    concluidas: acoes.filter(a => a.status === 'concluido').length,
    em_andamento: acoes.filter(a => a.status === 'em_andamento').length,
    por_produto: porProduto,
    por_executor: porExecutor,
  };
}

// ============================================================
// EXPORT / IMPORT
// ============================================================

function exportarJSON() {
  const data = getData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `segape_planejamento_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importarJSON(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      saveData(data);
      callback(null, data);
    } catch(err) { callback('Arquivo inválido'); }
  };
  reader.readAsText(file);
}
