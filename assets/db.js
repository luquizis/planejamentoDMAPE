// ============================================================
// SEGAPE — Camada Supabase
// ============================================================
const SUPA_URL = 'https://rufkmghrxgodddjiariv.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1ZmttZ2hyeGdvZGRkamlhcml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MzkyMzcsImV4cCI6MjA5NjUxNTIzN30.ssNe79fbtistq2JM9HbnNBv5ea_yC8uNoOe6a6YhJCM';

async function supaFetch(path, options = {}) {
  const res = await fetch(SUPA_URL + '/rest/v1/' + path, {
    ...options,
    headers: {
      'apikey': SUPA_KEY,
      'Authorization': 'Bearer ' + SUPA_KEY,
      'Content-Type': 'application/json',
      'Prefer': options.prefer || 'return=representation',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Supabase error ' + res.status + ': ' + err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : [];
}

// ---- CRUD de ações ----
async function dbListarAcoes(filtros = {}) {
  let qs = 'acoes?order=criado_em.asc';
  if (filtros.gerente_id)  qs += '&gerente_id=eq.' + filtros.gerente_id;
  if (filtros.produto_id)  qs += '&produto_id=eq.' + filtros.produto_id;
  return await supaFetch(qs);
}

async function dbCriarAcao(campos) {
  return await supaFetch('acoes', {
    method: 'POST',
    body: JSON.stringify(campos),
  });
}

async function dbAtualizarAcao(id, campos) {
  return await supaFetch('acoes?id=eq.' + id, {
    method: 'PATCH',
    body: JSON.stringify(campos),
  });
}

async function dbRemoverAcao(id) {
  return await supaFetch('acoes?id=eq.' + id, {
    method: 'DELETE',
    prefer: 'return=minimal',
  });
}

// ---- Realtime (escuta mudanças em tempo real) ----
function dbEscutar(callback) {
  const ws = new WebSocket(
    SUPA_URL.replace('https','wss') + '/realtime/v1/websocket?apikey=' + SUPA_KEY + '&vsn=1.0.0'
  );
  ws.onopen = () => {
    ws.send(JSON.stringify({topic:'realtime:public:acoes', event:'phx_join', payload:{}, ref:1}));
  };
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.event === 'INSERT' || msg.event === 'UPDATE' || msg.event === 'DELETE') {
      callback(msg.event, msg.payload?.record);
    }
  };
  ws.onerror = () => {};
  return ws;
}

// ---- PDF simples via window.print ----
function gerarPDF(titulo, htmlContent) {
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head>
    <meta charset="UTF-8">
    <title>${titulo}</title>
    <style>
      body{font-family:Arial,sans-serif;font-size:11px;margin:30px;color:#222}
      h1{font-size:16px;color:#1B3A6B;border-bottom:2px solid #C8922A;padding-bottom:6px;margin-bottom:4px}
      h2{font-size:12px;color:#1B3A6B;margin:18px 0 6px}
      .sub{color:#666;font-size:10px;margin-bottom:14px}
      table{width:100%;border-collapse:collapse;margin-bottom:16px;font-size:10px}
      th{background:#1B3A6B;color:white;padding:5px 8px;text-align:left}
      td{padding:4px 8px;border-bottom:1px solid #eee}
      tr:nth-child(even) td{background:#F9F9F7}
      .footer{margin-top:24px;padding-top:6px;border-top:1px solid #ddd;font-size:9px;color:#999}
      @media print{.no-print{display:none}}
    </style>
  </head><body>${htmlContent}<div class="footer">SEGAPE/MEC · Projeto UNESCO 914BRZ1161.1 · Gerado em ${new Date().toLocaleDateString('pt-BR')}</div></body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 400);
}
