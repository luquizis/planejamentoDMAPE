# SEGAPE — Sistema de Planejamento de Demandas

Ferramenta digital para planejamento de demandas com hierarquia de acesso por nível (Diretoria, Coordenação e Gerência).

## 🚀 Como publicar no GitHub Pages

### 1. Criar o repositório
1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"**
3. Nomeie como `segape-planejamento` (ou outro nome de sua preferência)
4. Deixe como **Public** (necessário para GitHub Pages gratuito)
5. Clique em **"Create repository"**

### 2. Fazer upload dos arquivos
1. No repositório criado, clique em **"uploading an existing file"**
2. Arraste todos os arquivos desta pasta:
   - `index.html`
   - `diretoria.html`
   - `coordenador.html`
   - `gerente.html`
   - Pasta `assets/` com `dados.js`
3. Clique em **"Commit changes"**

### 3. Ativar GitHub Pages
1. Vá em **Settings** → **Pages**
2. Em *Source*, selecione **"Deploy from a branch"**
3. Em *Branch*, selecione **"main"** e pasta **"/ (root)"**
4. Clique em **"Save"**
5. Aguarde ~2 minutos. A URL será: `https://SEU-USUARIO.github.io/segape-planejamento/`

---

## 📋 Estrutura da ferramenta

### Perfis de acesso

| Perfil | Arquivo | Permissões |
|--------|---------|-----------|
| Diretoria | `diretoria.html` | Visão completa, aprovação, exportação de relatório PDF |
| Coordenação | `coordenador.html` | Cadastro de demandas estratégicas, visualização de operacionais |
| Gerência | `gerente.html` | Cadastro de demandas operacionais, cronograma Gantt |

### Como funciona

- **Diretoria**: acessa o painel consolidado com gráficos, cronograma Gantt geral, tabela para aprovação das demandas estratégicas e visão read-only das operacionais. Exporta relatório em PDF.
- **Coordenação**: cadastra demandas estratégicas por coordenação, acompanha status de aprovação pela diretoria e visualiza as demandas operacionais vinculadas pelos gerentes.
- **Gerência**: cadastra demandas operacionais com detalhamento (responsável, percentual de avanço, vinculação à demanda estratégica), visualiza cronograma Gantt.

### Dados e compartilhamento

Os dados ficam salvos no **localStorage** do navegador de cada usuário.

Para compartilhar entre pessoas ou dispositivos:
1. Use **"Exportar JSON"** na tela de qualquer perfil
2. Envie o arquivo `.json` para os outros usuários
3. Na tela do destinatário, use **"Importar JSON"**

> ⚠️ Cada pessoa precisa importar o JSON atualizado para ter os dados mais recentes.

---

## 🗂️ Estrutura dos arquivos

```
segape-planejamento/
├── index.html          # Tela inicial (seleção de perfil)
├── diretoria.html      # Painel da Diretoria
├── coordenador.html    # Painel da Coordenação
├── gerente.html        # Painel da Gerência
├── assets/
│   └── dados.js        # Camada de dados compartilhada (localStorage)
└── README.md           # Este arquivo
```

---

## 🔧 Próximas evoluções sugeridas

- [ ] Autenticação por senha simples por perfil
- [ ] Notificação visual quando há demandas pendentes de aprovação
- [ ] Filtro por ano de planejamento
- [ ] Exportação em Excel (`.xlsx`)
- [ ] Modo de visualização por mês atual
- [ ] Campo de observações/comentários por demanda

---

*SEGAPE — Secretaria de Gestão de Pessoas · v1.0*
