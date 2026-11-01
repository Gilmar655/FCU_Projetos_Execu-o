# FCU Projetos Execução — atualização de 31/10/2026

Site: https://gilmar655.github.io/FCU_Projetos_Execu-o/

## Dados publicados

- Fonte: `FCU - Ferramenta de Controle Unificado - 2026_.xlsx`.
- 27.690 registros de programação, 11.058 projetos e 40 colunas originais preservadas.
- Período disponível: 01/01/2026 a 13/12/2026, incluindo programações futuras.
- 4.809 projetos com localização; 6.249 sem localização suficiente nos arquivos fornecidos.
- 13.864 registros com links de localização: 11.859 pelas coordenadas da FCU e 2.005 pelo código exato do equipamento da base Buscape.

## Como consultar

O painel abre na aba **Resumo Projetos**, com uma linha por projeto e a coluna **Qtd Programações**. Clique no código do projeto para consultar todas as suas programações, em ordem cronológica, e abrir Maps ou Waze. O histórico da janela é completo e não é reduzido pelos filtros do painel. É possível exportar o histórico individual para Excel.

As abas da base completa e do histórico detalhado também estão disponíveis, com busca, filtros e paginação. O botão **Excel completo** baixa `FCU_Projetos_Atualizado_31_10_2026.xlsx`, com links clicáveis, contagens e atalhos internos para o histórico.

## Critérios e limites

A contagem considera cada registro de programação do arquivo FCU, incluindo cancelados, parciais, pendentes e futuros. A combinação projeto + ordem SIGEO + data + horário inicial/final + intervenção foi conferida: não há duplicatas dessa chave na base atual. Ordens vazias não são excluídas. A contagem não representa o número de execuções concluídas.

As 40 colunas de origem permanecem intactas. As coordenadas utilizadas nas novas colunas não substituem Latitude/Longitude originais. A primeira escolha é o par de coordenadas da FCU; quando ausente, o equipamento `local_inst` é procurado no cadastro Buscape. Não foram utilizadas coordenadas aproximadas pelo circuito nem pesquisas genéricas pelo número do projeto. Sem correspondência confiável, o projeto aparece como **Localização não encontrada**.

O arquivo `Equipamentos_Buscape_Links.xlsx` é uma apresentação com links da mesma base de equipamentos. A extração utiliza as coordenadas da base `Equipamentos_Buscape (1).xlsx`. O cadastro integral de equipamentos não é publicado no site: apenas os dados vinculados aos projetos são incluídos.

No Excel, o resumo calcula a quantidade com `COUNTIFS` sobre o bloco correspondente do histórico. A coluna de quantidade da base referencia o resumo. O histórico está organizado por projeto, data, horário e ordem. Para incorporar novos registros, regenere as três abas ou atualize também os blocos de histórico e as fórmulas; somente editar uma data não cria nova programação. Use os filtros de tabela para consultar e os links “Ver histórico” para ir ao bloco do projeto.

O “último status” é o status do registro com maior data de programação, que pode ser uma programação futura. A fonte não possui um horário de atualização do status.

## Atualização e publicação

`data.js` contém as três abas compactadas, sem depender de serviços externos. `app.js` monta os indicadores e o histórico. `excel.js` e `jszip.min.js` permitem importação e exportação local. A base importada no navegador vale apenas para aquele navegador até ser publicada no GitHub.

Ao publicar uma nova base, mantenha `data.js` e o Excel completo da mesma atualização, atualize a versão dos arquivos no `index.html` e verifique o GitHub Pages na branch `main`. A publicação atual inclui todas as programações da fonte de 31/10/2026, sem agregar bases antigas que poderiam repetir eventos. Os arquivos históricos anteriores no repositório não alimentam a consulta atual.
