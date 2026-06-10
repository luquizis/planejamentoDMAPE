// ============================================================
// SEGAPE — Módulo compartilhado de Dashboard para relatórios PDF
// Incluir em cada página DEPOIS de dados.js e db.js:
//   <script src="assets/dashboard.js"></script>
//
// Requer disponíveis no escopo global (vindos de dados.js):
//   FASES, STATUS_LABELS, TIPOS_PRODUTO, HIERARQUIA (opcional)
// Requer a função gerarPDF(titulo, html) (vinda de db.js/dados.js)
// ============================================================

const DASH_PCE = '-webkit-print-color-adjust:exact;print-color-adjust:exact';

// ---------- blocos visuais ----------
function dashKpi(n, l) {
  return `<div style="flex:1;min-width:105px;border:1px solid #ddd;border-radius:8px;padding:10px 8px;text-align:center;background:#FAFAF8;${DASH_PCE}">
    <div style="font-size:1.35rem;font-weight:800;color:#1B3A6B">${n}</div>
    <div style="font-size:.6rem;color:#666;text-transform:uppercase;letter-spacing:.04em">${l}</div></div>`;
}

function dashBarRow(label, val, max, cor, sufixo = '') {
  const w = max ? Math.max(2, Math.round(val / max * 100)) : 0;
  return `<div style="display:flex;align-items:center;gap:8px;margin:4px 0">
    <div style="width:190px;font-size:.72rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${label}</div>
    <div style="flex:1;background:#ECECE8;border-radius:4px;height:12px;${DASH_PCE}">
      <div style="width:${w}%;height:12px;border-radius:4px;background:${cor};${DASH_PCE}"></div></div>
    <div style="width:62px;font-size:.72rem;text-align:right;font-weight:600;color:#1B3A6B">${val}${sufixo}</div></div>`;
}

function dashChartBox(titulo, conteudo) {
  return `<div style="flex:1;min-width:300px;border:1px solid #ddd;border-radius:8px;padding:10px 12px">
    <div style="font-size:.7rem;font-weight:700;text-transform:uppercase;color:#5F5F5F;margin-bottom:6px;letter-spacing:.04em">${titulo}</div>${conteudo}</div>`;
}

// Converte [{label, valor, cor?}] em um gráfico de barras
function dashBarras(dados, { sufixo = '', corPadrao = '#2E5CA8' } = {}) {
  if (!dados || !dados.length) return '<div style="font-size:.72rem;color:#888">Sem dados</div>';
  const max = Math.max(1, ...dados.map(d => d.valor));
  return dados.map(d => dashBarRow(d.label, d.valor, max, d.cor || corPadrao, sufixo)).join('');
}

// ---------- agregadores ----------
// Agrupa ações por uma chave (string retornada por fnChave) somando qtd e horas
function dashAgruparAcoes(acoes, fnChave) {
  const mapa = {};
  (acoes || []).forEach(a => {
    const k = fnChave(a) || '—';
    if (!mapa[k]) mapa[k] = { qtd: 0, horas: 0, somaPct: 0 };
    mapa[k].qtd++; mapa[k].horas += (a.horas_estimadas || 0); mapa[k].somaPct += (a.percentual || 0);
  });
  return Object.entries(mapa).map(([label, v]) => ({
    label, qtd: v.qtd, horas: v.horas, pct: v.qtd ? Math.round(v.somaPct / v.qtd) : 0,
  })).sort((a, b) => b.horas - a.horas || b.qtd - a.qtd);
}

function dashCorAvanco(pct) {
  return pct >= 100 ? '#1D7A55' : (pct >= 50 ? '#5B8DD9' : '#C8922A');
}

// ---------- gráficos prontos por nível ----------
// Por produto (todos os níveis)
function dashGraficosPorProduto(produtos, acoes) {
  const porProd = produtos.map(p => {
    const ap = acoes.filter(a => a.produto_id === p.id);
    return { nome: p.nome, h: ap.reduce((s, a) => s + (a.horas_estimadas || 0), 0),
      pct: ap.length ? Math.round(ap.reduce((s, a) => s + (a.percentual || 0), 0) / ap.length) : 0 };
  });
  return [
    { titulo: 'Horas por produto',  dados: porProd.map(x => ({ label: x.nome, valor: x.h })), sufixo: 'h' },
    { titulo: 'Avanço por produto', dados: porProd.map(x => ({ label: x.nome, valor: x.pct, cor: dashCorAvanco(x.pct) })), sufixo: '%' },
  ];
}

// Por gerente (nível Coordenação) — gerentes: lista [{id, nome}]
function dashGraficoPorGerente(acoes, gerentes) {
  const dados = dashAgruparAcoes(acoes, a => gerentes.find(g => g.id === a.gerente_id)?.nome || '—');
  return { titulo: 'Horas por gerente', dados: dados.map(d => ({ label: d.label, valor: d.horas })), sufixo: 'h' };
}

// Por coordenação (nível Diretoria) — usa HIERARQUIA.coordenacoes e produto.coordenacao_id
function dashGraficoPorCoordenacao(produtos, acoes) {
  const coordDe = id => {
    const p = produtos.find(x => x.id === id);
    if (!p || typeof HIERARQUIA === 'undefined') return '—';
    const c = HIERARQUIA.coordenacoes.find(c => c.id === p.coordenacao_id);
    return c ? c.sigla : '—';
  };
  const dados = dashAgruparAcoes(acoes, a => coordDe(a.produto_id));
  return { titulo: 'Horas por coordenação', dados: dados.map(d => ({ label: d.label, valor: d.horas })), sufixo: 'h' };
}

// Por diretoria (nível Secretaria) — requer HIERARQUIA.coordenacoes[].diretoria_id e HIERARQUIA.diretorias
function dashGraficoPorDiretoria(produtos, acoes) {
  const dirDe = id => {
    if (typeof HIERARQUIA === 'undefined') return '—';
    const p = produtos.find(x => x.id === id);
    const c = p && HIERARQUIA.coordenacoes.find(c => c.id === p.coordenacao_id);
    const d = c && (HIERARQUIA.diretorias || []).find(d => d.id === c.diretoria_id);
    return d ? d.sigla : (c ? c.sigla : '—');
  };
  const dados = dashAgruparAcoes(acoes, a => dirDe(a.produto_id));
  return { titulo: 'Horas por diretoria', dados: dados.map(d => ({ label: d.label, valor: d.horas })), sufixo: 'h' };
}

// ---------- dashboard completo ----------
// produtos: produtos do escopo | acoes: todas as ações do escopo
// graficosExtras: [{titulo, dados:[{label, valor, cor?}], sufixo}]
// kpisExtras: [{n, l}] adicionados após os KPIs padrão
function montarDashboard({ produtos = [], acoes = [], graficosExtras = [], kpisExtras = [] }) {
  const totalHoras = acoes.reduce((s, a) => s + (a.horas_estimadas || 0), 0);
  const concluidas = acoes.filter(a => a.status === 'concluido').length;
  const avancoMedio = acoes.length ? Math.round(acoes.reduce((s, a) => s + (a.percentual || 0), 0) / acoes.length) : 0;

  const kpis = [
    dashKpi(produtos.length, 'Produtos'),
    dashKpi(acoes.length, 'Ações'),
    dashKpi(totalHoras + 'h', 'Horas estimadas'),
    dashKpi(concluidas, 'Concluídas'),
    dashKpi(avancoMedio + '%', 'Avanço médio'),
    ...kpisExtras.map(k => dashKpi(k.n, k.l)),
  ].join('');

  const porStatus = dashAgruparAcoes(acoes, a => a.status);
  const barsStatus = dashBarras(porStatus.sort((a,b)=>b.qtd-a.qtd).map(d => ({
    label: (typeof STATUS_LABELS !== 'undefined' && STATUS_LABELS[d.label]?.label) || d.label,
    valor: d.qtd,
    cor: (typeof STATUS_LABELS !== 'undefined' && STATUS_LABELS[d.label]?.cor) || '#2E5CA8',
  })));

  const porFase = dashAgruparAcoes(acoes, a => a.fase);
  const barsFase = dashBarras(porFase.sort((a,b)=>b.qtd-a.qtd).map(d => ({
    label: (typeof FASES !== 'undefined' && FASES[d.label]?.label) || d.label,
    valor: d.qtd,
    cor: (typeof FASES !== 'undefined' && FASES[d.label]?.cor) || '#5B8DD9',
  })));

  const boxes = [
    dashChartBox('Ações por status', barsStatus),
    dashChartBox('Ações por fase', barsFase),
    ...graficosExtras.map(g => dashChartBox(g.titulo, dashBarras(g.dados, { sufixo: g.sufixo || '' }))),
  ];

  // monta em linhas de 2 caixas
  let linhas = '';
  for (let i = 0; i < boxes.length; i += 2) {
    linhas += `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:6px">${boxes[i]}${boxes[i+1]||''}</div>`;
  }

  return `<div style="display:flex;gap:8px;flex-wrap:wrap;margin:14px 0 10px">${kpis}</div>${linhas}`;
}

// ---------- seções detalhadas por produto ----------
function montarSecoesProdutos(produtos, acoes, colaboradores, { rotuloVazio = 'Nenhuma ação cadastrada' } = {}) {
  return produtos.map(p => {
    const acoesProd = acoes.filter(a => a.produto_id === p.id);
    const tipo = (typeof TIPOS_PRODUTO !== 'undefined' && TIPOS_PRODUTO[p.tipo]) || { label: p.tipo };
    const hProd = acoesProd.reduce((s, a) => s + (a.horas_estimadas || 0), 0);
    const fmt = d => { if (!d) return '—'; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}`; };
    const linhas = acoesProd.length
      ? acoesProd.map(a => {
          const colabs = (a.executores_ids || []).map(id => (colaboradores || []).find(c => c.id === id)?.nome.split(' ').slice(0, 2).join(' ')).filter(Boolean);
          return `<tr>
            <td>${a.titulo}${a.observacao ? '<br><small style="color:#C8922A">Obs: ' + a.observacao + '</small>' : ''}</td>
            <td>${colabs.join(', ') || '—'}</td>
            <td>${(typeof FASES !== 'undefined' && FASES[a.fase]?.label) || a.fase}</td>
            <td>${(typeof COMPLEXIDADE !== 'undefined' && COMPLEXIDADE[a.complexidade]?.label) || a.complexidade}</td>
            <td>${fmt(a.data_inicio)} → ${fmt(a.data_fim)}</td>
            <td>${a.horas_estimadas || 0}h</td>
            <td>${a.percentual || 0}%</td>
            <td>${(typeof STATUS_LABELS !== 'undefined' && STATUS_LABELS[a.status]?.label) || a.status}</td>
          </tr>`;
        }).join('')
      : `<tr><td colspan="8" style="color:#888">${rotuloVazio}</td></tr>`;
    return `
      <h2 style="margin-top:1.4rem">${p.nome} <small style="font-weight:normal;color:#666">· ${tipo.label} · ${acoesProd.length} ação(ões) · ${hProd}h</small></h2>
      ${p.descricao ? `<p class="sub">${p.descricao}</p>` : ''}
      <table><thead><tr><th>Ação</th><th>Colaboradores</th><th>Fase</th><th>Cx</th><th>Período</th><th>Horas</th><th>Avanço</th><th>Status</th></tr></thead>
      <tbody>${linhas}</tbody></table>`;
  }).join('');
}

// ---------- panorama temporal ----------
const DASH_MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

// Retorna {mi, mf} (meses 1-12) da ação no ano de referência, ou null se não toca o ano
function dashSpanMeses(a, ano) {
  let mi = null, mf = null;
  if (a.data_inicio) {
    const [y, m] = a.data_inicio.split('-').map(Number);
    if (y > ano) return null;          // começa só no ano seguinte
    mi = (y < ano) ? 1 : m;
  }
  if (a.data_fim) {
    const [y, m] = a.data_fim.split('-').map(Number);
    if (y < ano) return null;          // terminou em ano anterior
    mf = (y > ano) ? 12 : m;
  }
  if (mi == null) mi = a.mes_inicio || mf;
  if (mf == null) mf = a.mes_fim || mi;
  if (mi == null || mf == null) return null;
  if (mf < mi) { const t = mi; mi = mf; mf = t; }
  return { mi: Math.max(1, mi), mf: Math.min(12, mf) };
}

// Panorama do mês atual até dezembro: carga mensal + linha do tempo dos produtos
function montarPanoramaTemporal({ produtos = [], acoes = [], deMes = null, ateMes = 12 }) {
  const ano = new Date().getFullYear();
  const mesAtual = new Date().getMonth() + 1;
  const inicio = deMes || mesAtual;
  const meses = [];
  for (let m = inicio; m <= ateMes; m++) meses.push(m);
  if (!meses.length) return '';

  // Horas (distribuídas pela duração) e ações ativas por mês
  const horasMes = {}, acoesMes = {};
  acoes.forEach(a => {
    const s = dashSpanMeses(a, ano);
    if (!s) return;
    const dur = s.mf - s.mi + 1;
    for (let m = s.mi; m <= s.mf; m++) {
      if (m < inicio || m > ateMes) continue;
      acoesMes[m] = (acoesMes[m] || 0) + 1;
      horasMes[m] = (horasMes[m] || 0) + (a.horas_estimadas || 0) / dur;
    }
  });
  const dadosHoras = meses.map(m => ({ label: DASH_MESES[m-1] + '/' + String(ano).slice(2), valor: Math.round(horasMes[m] || 0) }));
  const dadosAcoes = meses.map(m => ({ label: DASH_MESES[m-1] + '/' + String(ano).slice(2), valor: acoesMes[m] || 0 }));

  // Linha do tempo dos produtos (mini-Gantt): nº de ações ativas por mês
  const cab = meses.map(m => `<th style="border:1px solid #E2E2DE;padding:3px 2px;font-size:.6rem;background:${m===mesAtual?'#FDF3DF':'#F0F2F6'};color:#5F5F5F;${DASH_PCE}">${DASH_MESES[m-1]}</th>`).join('');
  const linhas = produtos.map(p => {
    const ap = acoes.filter(a => a.produto_id === p.id);
    const cor = (typeof TIPOS_PRODUTO !== 'undefined' && TIPOS_PRODUTO[p.tipo]?.cor) || '#2E5CA8';
    const cells = meses.map(m => {
      const n = ap.filter(a => { const s = dashSpanMeses(a, ano); return s && m >= s.mi && m <= s.mf; }).length;
      return `<td style="border:1px solid #E2E2DE;height:18px;min-width:26px;text-align:center;font-size:.62rem;font-weight:600;color:${n?'#fff':'#bbb'};background:${n?cor:'#FAFAF8'};${DASH_PCE}">${n||''}</td>`;
    }).join('');
    return `<tr><td style="border:1px solid #E2E2DE;padding:3px 8px;font-size:.72rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px">${p.nome}</td>${cells}</tr>`;
  }).join('');

  return `
    <h2 style="margin-top:1.2rem">Panorama temporal — ${DASH_MESES[inicio-1]} a Dez/${ano}</h2>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:6px">
      ${dashChartBox('Horas planejadas por mês', dashBarras(dadosHoras, { sufixo: 'h' }))}
      ${dashChartBox('Ações ativas por mês', dashBarras(dadosAcoes, { corPadrao: '#5B8DD9' }))}
    </div>
    <div style="border:1px solid #ddd;border-radius:8px;padding:10px 12px;margin-bottom:6px">
      <div style="font-size:.7rem;font-weight:700;text-transform:uppercase;color:#5F5F5F;margin-bottom:6px;letter-spacing:.04em">Linha do tempo dos produtos <span style="font-weight:400;text-transform:none">(nº de ações ativas por mês · mês atual destacado)</span></div>
      <table style="border-collapse:collapse;width:100%"><thead><tr><th style="border:1px solid #E2E2DE;padding:3px 8px;font-size:.6rem;background:#F0F2F6;color:#5F5F5F;text-align:left;${DASH_PCE}">Produto</th>${cab}</tr></thead>
      <tbody>${linhas || `<tr><td colspan="${meses.length+1}" style="border:1px solid #E2E2DE;padding:6px;font-size:.72rem;color:#888">Nenhum produto</td></tr>`}</tbody></table>
    </div>`;
}

// ---------- relatório consolidado (qualquer nível) ----------
// Uso: gerarRelatorioConsolidado({ titulo, subtitulo, produtos, acoes, colaboradores, graficosExtras, kpisExtras, incluirDetalhes, incluirPanorama, htmlExtra })
function gerarRelatorioConsolidado({ titulo, subtitulo = '', produtos = [], acoes = [], colaboradores = [], graficosExtras = [], kpisExtras = [], incluirDetalhes = true, incluirPanorama = true, htmlExtra = '' }) {
  const fmtHoje = (() => { const d = new Date(); return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`; })();
  const dashboard = montarDashboard({ produtos, acoes, graficosExtras, kpisExtras });
  const panorama = incluirPanorama ? montarPanoramaTemporal({ produtos, acoes }) : '';
  const detalhes = incluirDetalhes ? montarSecoesProdutos(produtos, acoes, colaboradores) : '';
  gerarPDF(titulo, `
    <h1>${titulo}</h1>
    <p class="sub">${subtitulo ? subtitulo + ' · ' : ''}Gerado em ${fmtHoje}</p>
    ${dashboard}
    ${panorama}
    ${htmlExtra}
    ${detalhes}`);
}
