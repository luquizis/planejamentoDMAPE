// ============================================================
// SEGAPE — Lista ampliada de colaboradores
// Incluir este arquivo DEPOIS de assets/dados.js:
//   <script src="assets/dados.js"></script>
//   <script src="assets/colaboradores_novos.js"></script>
// Os nomes são mesclados ao EQUIPE; o init() do gerente.html
// cadastra automaticamente apenas os que ainda não existem no banco.
// ============================================================

const NOVOS_COLABORADORES = [
  { nome: 'Ruy de Deus e Mello Neto',                         area: 'GM/SEGAPE',              vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Luiz Rogerio Lopes Silva',                         area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Lúcio Fernandes Dutra Santos',                     area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Joyner Machado de Souza',                          area: 'SE/GAB/MEC',             vinculo: 'Servidor',     sala: 'ED. SEDE, 7º Andar',                    nivel: 'servidor' },
  { nome: 'Nicole Estefany Aponte Cueto',                     area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Flávia Paola Felix Meira',                         area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Larissa Marques da Silva',                         area: 'GM/SEGAPE/MEC',          vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Felipe Michel Santos Araújo Braga',                area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Yuri Henrique Maracaipe de Sousa',                 area: 'DIEI/SEGAPE',            vinculo: 'Servidor',     sala: 'ED. ANEXO I, 3º Andar, Sala 312',       nivel: 'servidor' },
  { nome: 'Júlia Rodrigues Tarabal',                          area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Marcelo Contatto dos Santos',                      area: 'SE/GM/MEC',              vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Oeber Izidoro Pereira',                            area: 'DMAPE/SEGAPE/MEC',       vinculo: 'Consultor',    sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'consultor' },
  { nome: 'Marcos Ricardo dos Santos',                        area: 'DIEI/SEGAPE/MEC',        vinculo: 'Servidor',     sala: 'ED. SEDE, 7º Andar, Sala 700',          nivel: 'servidor' },
  { nome: 'Lucas Evencio Soares Dutra',                       area: 'DMAPE/SEGAPE',           vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Natalia De Carvalho',                              area: 'DGID/SEGAPE/MEC',        vinculo: 'Servidor',     sala: '',                                      nivel: 'servidor' },
  { nome: 'Marina Lobo Ferraz',                               area: 'DMAPE/SEGAPE/MEC',       vinculo: 'Terceirizado', sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'terceirizado' },
  { nome: 'Marcus Flavio Lenza',                              area: 'GAB/SEGAPE/MEC',         vinculo: 'Consultor',    sala: 'ED. SEDE, 7º Andar, Sala 705',          nivel: 'consultor' },
  { nome: 'Laís Miranda Nunes da Silva',                      area: 'GAB/SEGAPE/MEC',         vinculo: 'Terceirizado', sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'terceirizado' },
  { nome: 'Cácio Fabricio Gomes da Rocha',                    area: 'GM/SEGAPE/MEC',          vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Rodrigo Lofrano Alves Dos Santos',                 area: 'GAB/SEGAPE/MEC',         vinculo: 'Servidor',     sala: 'ED. SEDE, 5º Andar, Sala 508',          nivel: 'servidor' }, // Assessor
  { nome: 'Carlos Augusto Alves de Sousa Júnior',             area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Andreia Lopes de Sousa Castro',                    area: 'GAB/SEGAPE/MEC',         vinculo: 'Terceirizado', sala: 'ED. SEDE, 8º Andar, Sala 800',          nivel: 'terceirizado' },
  { nome: 'Giovanna Megumi Ishida Tedesco',                   area: 'DMAPE/SEGAPE/MEC',       vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Gabriel Santos da Silva',                          area: 'STIC/CGSA/DIGISYSTEM',   vinculo: 'Terceirizado', sala: 'ED. ANEXO II, 1º Andar, CGSA/STIC',     nivel: 'terceirizado' },
  { nome: 'Guilherme Viana Ferreira',                         area: 'DMAPE/SEGAPE/MEC',       vinculo: 'Consultor',    sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'consultor' },
  { nome: 'Rodrigo Lucas Mendes',                             area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Daniel Oliveira de Orange Lins da Fonseca e Silva',area: '',                       vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Ana Beatriz Pereira Sette',                        area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Samira De Oliveira Machado',                       area: 'CGMES/DIMES/SERES',      vinculo: 'Servidor',     sala: 'ED. SEDE, 5º Andar, Sala 527',          nivel: 'servidor' },
  { nome: 'Augusto Souza Cavalcante',                         area: 'GM/SEGAPE/MEC',          vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Thiago Guimaraes Cardoso',                         area: 'SE/GAB/UNESCO',          vinculo: 'Consultor',    sala: 'ED. SEDE, 7º Andar, Sala 703',          nivel: 'consultor' },
  { nome: 'Milton Pereira de Franca Netto',                   area: 'DPG/SEGAPE/MEC',         vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Nathalia Marques Bontempo',                        area: 'DIEI/SEGAPE/MEC',        vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Claudiomar Matias Rolim Filho',                    area: 'DMAPE/SEGAPE/MEC',       vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Daniel Santos Braga',                              area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Rogerio Santos',                                   area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Deborah Piego',                                    area: 'SE/DMAPE/SEGAPE',        vinculo: 'Consultor',    sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'consultor' },
  { nome: 'Wesla de Souza Monteiro',                          area: 'GM/SEGAPE/UNESCO',       vinculo: 'Consultor',    sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'consultor' },
  { nome: 'Sara Chaves Costa',                                area: 'CGDATA/DIMES/SERES/MEC', vinculo: 'Servidor',     sala: 'ED. SEDE, 1º Andar, Sala 118',          nivel: 'servidor' },
  { nome: 'Jessica Rodrigues da Silva',                       area: 'DPG/SEGAPE/G4F',         vinculo: 'Terceirizado', sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'terceirizado' },
  { nome: 'Marco Aurelio Marques Ferreira',                   area: 'GM/SEGAPE/MEC',          vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Arthur Barbosa Magdaleno',                         area: 'DMAPE/SEGAPE/MEC',       vinculo: 'Consultor',    sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'consultor' },
  { nome: 'Luiz Felipe Vieira Silva',                         area: 'DMAPE/SEGAPE/MEC',       vinculo: 'Consultor',    sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'consultor' },
  { nome: 'Andreia Da Silva Ferreira',                        area: 'GAB/SEGAPE/MEC',         vinculo: 'Terceirizado', sala: 'ED. SEDE, 9º Andar, Sala 805',          nivel: 'terceirizado' },
  { nome: 'Francisco Mello Castro',                           area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Juliana Maria de Araujo',                          area: 'DMAPE/SEGAPE/MEC',       vinculo: 'Consultor',    sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'consultor' },
  { nome: 'Silvana Rosa Lisboa de Sa',                        area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Alice de Oliveira Garcêz',                         area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Claudia Rezende Medeiros Passetto',                area: 'GAB/SEGAPE/MEC',         vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Ellen Bruno de Souza',                             area: 'DPG/SEGAPE/MEC',         vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 803',          nivel: 'servidor' },
  { nome: 'Jannete De Sousa De Figueiredo Alves',             area: 'SE/SAA/MEC',             vinculo: 'Servidor',     sala: 'ED. ANEXO I, 3º Andar, Sala 320',       nivel: 'servidor' },
  { nome: 'Rafael Queiroz Da Trindade',                       area: 'DPG/SEGAPE/MEC',         vinculo: 'Servidor',     sala: 'ED. ANEXO I, 3º Andar, Sala 312',       nivel: 'servidor' },
  { nome: 'Rosimere Miranda Fortini',                         area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Orlando Rogério Campanini',                        area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Karen Pereira Alvares',                            area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Thamires Queiroga De Macedo',                      area: 'DMAPE/SEGAPE/MEC',       vinculo: 'Servidor',     sala: 'ED. ANEXO I, 3º Andar, Sala 312',       nivel: 'servidor' },
  { nome: 'Iara Christina Silva Barroca',                     area: 'DIEI/SEGAPE/MEC',        vinculo: 'Servidor',     sala: 'ED. SEDE, 4º Andar, Sala 418',          nivel: 'servidor' },
  { nome: 'Camylle de Jesus Pereira Brito',                   area: 'GAB/SEGAPE/MEC',         vinculo: 'Terceirizado', sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'terceirizado' },
  { nome: 'Anderson Gregorio Marques Soares',                 area: 'GM/SEGAPE/MEC',          vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'David Diniz Kalichman',                            area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Thatyana de Faria Piola Seraphim',                 area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Joao Victor De Oliveira Silva',                    area: 'CGF/SPO/MEC',            vinculo: 'Servidor',     sala: 'ED. ANEXO I, 1º Andar, Sala 139',       nivel: 'servidor' },
  { nome: 'Samita Pessoa Fidelis',                            area: 'DPG/SEGAPE/MEC',         vinculo: 'Servidor',     sala: 'ED. ANEXO I, 3º Andar, Sala 312',       nivel: 'servidor' },
  { nome: 'Pedro Lucas Vieira Aguiar',                        area: 'DPG/SEGAPE/MEC',         vinculo: 'Estagiário',   sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'estagiario' },
  { nome: 'Robson Bento Santos',                              area: 'GM/SEGAPE/MEC',          vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Manuel Ruas Pereira Coelho Bonduki',               area: 'DIEI/SEGAPE/MEC',        vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Denise Chaves Lopes Feres',                        area: 'DMAPE/SEGAPE/MEC',       vinculo: 'Consultor',    sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'consultor' },
  { nome: 'Eduardo Chagas Lustoza',                           area: 'DMAPE/SEGAPE/MEC',       vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
  { nome: 'Alexandra Waltrick Russi',                         area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Vitoria Maria Silva Dos Santos',                   area: 'GM/SEGAPE/MEC',          vinculo: 'Bolsista',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'bolsista' },
  { nome: 'Lucas de Mattos Moura Fernandes',                  area: 'GM/DMAPE/SEGAPE',        vinculo: 'Servidor',     sala: 'ED. SEDE, 8º Andar, Sala 813',          nivel: 'servidor' },
];

// Mescla ao EQUIPE (sem duplicar nomes já existentes em dados.js)
if (typeof EQUIPE !== 'undefined' && Array.isArray(EQUIPE)) {
  const nomesEquipe = new Set(EQUIPE.map(e => (e.nome || '').trim().toLowerCase()));
  NOVOS_COLABORADORES.forEach(c => {
    if (!nomesEquipe.has(c.nome.trim().toLowerCase())) {
      EQUIPE.push(c);
      nomesEquipe.add(c.nome.trim().toLowerCase());
    }
  });
} else {
  // fallback: se dados.js não definir EQUIPE, cria a partir desta lista
  window.EQUIPE = [...NOVOS_COLABORADORES];
}
