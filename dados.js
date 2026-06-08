// ============================================================
// SEGAPE — Camada de Dados Compartilhada
// Todos os dados ficam em localStorage['segape_data']
// ============================================================

const STORAGE_KEY = 'segape_data';

const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const MESES_FULL = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const ANO_ATUAL = new Date().getFullYear();

const STATUS_LABELS = {
  planejado: { label: 'Planejado', cor: '#2E5CA8' },
  em_andamento: { label: 'Em andamento', cor: '#C8922A' },
  concluido: { label: 'Concluído', cor: '#1D7A55' },
  suspenso: { label: 'Suspenso', cor: '#888' },
  aprovado: { label: 'Aprovado', cor: '#1D7A55' },
  pendente_aprovacao: { label: 'Pendente aprovação', cor: '#C8922A' },
};

const PRIORIDADES = {
  alta: { label: 'Alta', cor: '#B34A2A' },
  media: { label: 'Média', cor: '#C8922A' },
  baixa: { label: 'Baixa', cor: '#2E5CA8' },
};

function getData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    return JSON.parse(raw);
  } catch(e) {
    return getDefaultData();
  }
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
    coordenacoes: [
      { id: 'coord_1', nome: 'Coordenação de Gestão de Pessoas', sigla: 'CGP' },
      { id: 'coord_2', nome: 'Coordenação de Desenvolvimento', sigla: 'CDO' },
      { id: 'coord_3', nome: 'Coordenação de Planejamento', sigla: 'CPL' },
    ],
    demandas_estrategicas: [],
    demandas_operacionais: [],
  };
}

// ---- DEMANDAS ESTRATÉGICAS (Coordenador cadastra) ----
function criarDemandaEstrategica({ titulo, descricao, coordenacao_id, prioridade, mes_inicio, mes_fim, responsavel }) {
  const data = getData();
  const nova = {
    id: 'est_' + Date.now(),
    tipo: 'estrategica',
    titulo,
    descricao: descricao || '',
    coordenacao_id,
    prioridade: prioridade || 'media',
    mes_inicio: parseInt(mes_inicio),
    mes_fim: parseInt(mes_fim),
    responsavel: responsavel || '',
    status: 'planejado',
    aprovacao_diretoria: 'pendente',
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
  };
  data.demandas_estrategicas.push(nova);
  saveData(data);
  return nova;
}

function atualizarDemandaEstrategica(id, campos) {
  const data = getData();
  const idx = data.demandas_estrategicas.findIndex(d => d.id === id);
  if (idx === -1) return null;
  data.demandas_estrategicas[idx] = { ...data.demandas_estrategicas[idx], ...campos, atualizado_em: new Date().toISOString() };
  saveData(data);
  return data.demandas_estrategicas[idx];
}

function removerDemandaEstrategica(id) {
  const data = getData();
  data.demandas_estrategicas = data.demandas_estrategicas.filter(d => d.id !== id);
  data.demandas_operacionais = data.demandas_operacionais.filter(d => d.demanda_estrategica_id !== id);
  saveData(data);
}

// ---- DEMANDAS OPERACIONAIS (Gerente cadastra) ----
function criarDemandaOperacional({ titulo, descricao, demanda_estrategica_id, coordenacao_id, responsavel, mes_inicio, mes_fim, prioridade, percentual }) {
  const data = getData();
  const nova = {
    id: 'ope_' + Date.now(),
    tipo: 'operacional',
    titulo,
    descricao: descricao || '',
    demanda_estrategica_id: demanda_estrategica_id || null,
    coordenacao_id,
    responsavel: responsavel || '',
    mes_inicio: parseInt(mes_inicio),
    mes_fim: parseInt(mes_fim),
    prioridade: prioridade || 'media',
    percentual: parseInt(percentual) || 0,
    status: 'planejado',
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
  };
  data.demandas_operacionais.push(nova);
  saveData(data);
  return nova;
}

function atualizarDemandaOperacional(id, campos) {
  const data = getData();
  const idx = data.demandas_operacionais.findIndex(d => d.id === id);
  if (idx === -1) return null;
  data.demandas_operacionais[idx] = { ...data.demandas_operacionais[idx], ...campos, atualizado_em: new Date().toISOString() };
  saveData(data);
  return data.demandas_operacionais[idx];
}

function removerDemandaOperacional(id) {
  const data = getData();
  data.demandas_operacionais = data.demandas_operacionais.filter(d => d.id !== id);
  saveData(data);
}

// ---- COORDENAÇÕES ----
function criarCoordenacao({ nome, sigla }) {
  const data = getData();
  const nova = { id: 'coord_' + Date.now(), nome, sigla };
  data.coordenacoes.push(nova);
  saveData(data);
  return nova;
}

// ---- EXPORT / IMPORT ----
function exportarJSON() {
  const data = getData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const ts = new Date().toISOString().slice(0,10);
  a.href = url;
  a.download = `segape_planejamento_${ts}.json`;
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
    } catch(err) {
      callback('Arquivo inválido');
    }
  };
  reader.readAsText(file);
}

// ---- HELPERS ----
function getNomeCoordenacao(id) {
  const data = getData();
  const c = data.coordenacoes.find(x => x.id === id);
  return c ? c.nome : '—';
}

function getSiglaCoordenacao(id) {
  const data = getData();
  const c = data.coordenacoes.find(x => x.id === id);
  return c ? c.sigla : '—';
}

function mesToNome(n) { return MESES[n - 1] || '?'; }
function mesFullNome(n) { return MESES_FULL[n - 1] || '?'; }

function statusBadgeHTML(status) {
  const s = STATUS_LABELS[status] || { label: status, cor: '#888' };
  return `<span style="display:inline-block;padding:2px 9px;border-radius:20px;font-size:0.72rem;font-weight:500;background:${s.cor}18;color:${s.cor};border:1px solid ${s.cor}40">${s.label}</span>`;
}

function prioridadeBadgeHTML(p) {
  const pr = PRIORIDADES[p] || { label: p, cor: '#888' };
  return `<span style="display:inline-block;padding:2px 9px;border-radius:20px;font-size:0.72rem;font-weight:500;background:${pr.cor}18;color:${pr.cor};border:1px solid ${pr.cor}40">${pr.label}</span>`;
}

// Gera barra de Gantt para um item (meses 1-12)
function ganttBarHTML(mes_inicio, mes_fim, cor) {
  const start = ((mes_inicio - 1) / 12) * 100;
  const width = ((mes_fim - mes_inicio + 1) / 12) * 100;
  return `<div style="position:relative;height:18px;background:#eee;border-radius:4px;overflow:hidden">
    <div style="position:absolute;left:${start}%;width:${width}%;height:100%;background:${cor};border-radius:4px;"></div>
  </div>`;
}

// Resumo estatístico
function calcularResumo() {
  const data = getData();
  const est = data.demandas_estrategicas;
  const ope = data.demandas_operacionais;
  return {
    total_estrategicas: est.length,
    aprovadas: est.filter(d => d.aprovacao_diretoria === 'aprovado').length,
    total_operacionais: ope.length,
    em_andamento: ope.filter(d => d.status === 'em_andamento').length,
    concluidas: ope.filter(d => d.status === 'concluido').length,
    media_percentual: ope.length ? Math.round(ope.reduce((s,d) => s + (d.percentual||0), 0) / ope.length) : 0,
  };
}
