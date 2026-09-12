# FCU Projetos Execução

Painel de consulta das 15 abas de **FCU - 13-09-2026(1).xlsx**, com logomarca Enel Brasil, filtros, indicadores, gráficos, tabela navegável, importação/exportação Excel e CSV e relógio de Brasília.

## Abrir agora

Extraia o ZIP inteiro e abra `index.html` no Chrome ou Edge. Mantenha todos os arquivos e a pasta `assets` juntos. A consulta abre com os dados carregados, sem instalação e sem necessidade de internet. O arquivo `LEIA-ME.html` contém o guia de uso e publicação.

## Publicar no GitHub Pages

1. Crie o repositório **FCU_Projetos_Execucao** na conta desejada. O título visível no painel preserva “Execução”.
2. Envie o **conteúdo** da pasta extraída para a raiz do repositório: `index.html`, `styles.css`, `app.js`, `excel.js`, `data.js`, `FCU_Base_Original.xlsx`, `LEIA-ME.html`, `README.md`, `.nojekyll` e a pasta `assets`. Não envie somente o ZIP.
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch **main**, pasta **/(root)** e clique em **Save**.
4. Aguarde a publicação. Para a conta Gilmar655 e esse nome, o endereço esperado será `https://gilmar655.github.io/FCU_Projetos_Execucao/`. Esse é um endereço previsto, não uma confirmação de publicação.

GitHub Pages gratuito utiliza repositório público. O conteúdo do site será acessível a quem possuir o link. Instruções oficiais: https://docs.github.com/articles/creating-project-pages-manually

**Estado desta entrega:** site e pacote preparados. O repositório não foi criado e o site não foi publicado por esta entrega, pois a integração GitHub disponível não possui operação de criação de repositórios nem configuração do Pages.

## Atualizar a consulta

- Clique em **Importar base** e selecione `.xlsx` ou `.csv`. Excel traz todas as abas; CSV traz uma única tabela. CSV aceita vírgula, ponto e vírgula ou tabulação, UTF-8 e fallback Windows-1252.
- A nova base substitui os dados da consulta local. Quando permitido, o navegador salva a importação em IndexedDB. Isso não altera automaticamente o GitHub ou a base dos outros usuários.
- Para compartilhar a atualização, escolha **Exportar dados → Base para publicar · data.js** e substitua o `data.js` na raiz do repositório. Atualize também o arquivo `FCU_Base_Original.xlsx` se quiser manter essa cópia auxiliar sincronizada. O botão Excel completo do painel utiliza o arquivo efetivamente carregado.
- Usuários com uma importação local podem escolher **Restaurar base incluída no site** para voltar à base publicada.
- A data de referência é lida do nome do arquivo quando segue `dd-mm-aaaa`; não é confundida com a data/hora da consulta. Datas brasileiras são interpretadas como dia/mês/ano.
- Importação: até 40 MB, 200 mil linhas e 2 mil colunas por aba; limite de 250 milhões de caracteres XML descompactados. Arquivos `.xls`, `.xlsb`, protegidos por senha e macros não são suportados. Salve esses arquivos como `.xlsx` primeiro.

## Definições e análise da base entregue

| Indicador | Valor | Critério |
|---|---:|---|
| Abas preservadas | 15 | Inclui capa, dashboard original e apoio originalmente oculto |
| Programações | 5.188 | Linhas da aba 02_Base_Tratada |
| Projetos distintos | 2.332 | Projeto_Tratado, sem contar novamente abas derivadas |
| Execução integral | 1.927 | Status_Programação_Tratado = Executado |
| Execução parcial | 843 | Status_Programação_Tratado = Executado Parcial |
| Canceladas | 1.827 | Status_Programação_Tratado = Cancelado |
| Em andamento | 264 | Status_Programação_Tratado = Em andamento |
| Programadas | 327 | Status_Programação_Tratado = Programado |
| Projetos críticos | 457 | Projetos distintos com Criticidade = Alta |
| Programações Conecta | 3.088 | Base tratada |
| Programações Start | 1.440 | Base tratada |
| Programações Engelmig | 660 | Base tratada |

Período das programações: 02/01/2026 a 18/10/2026. Referência declarada no arquivo: 13/09/2026. O painel inclui programações futuras; o relógio mostra a data real do dispositivo no fuso de Brasília.

O percentual **integral** é 1.927 / 5.188 = 37,14%. **Integral + parcial** corresponde a 2.770 / 5.188 = 53,39%, conceito utilizado na taxa de execução do dashboard original. Cancelamentos: 35,22%. Não confundir programações executadas com os 1.910 projetos com execução integral ou parcial no resumo original (1.679 integrais e 231 parciais).

Principais motivos de cancelamento: Programação / Pré-operação (771), Materiais (405), Clima (180), Recursos da empreiteira (135) e Segurança (122). Programação / Pré-operação responde por 42,20% dos cancelamentos.

Os resumos originais não são reescritos ou corrigidos: existem alertas de qualidade em 2.029 registros e UPs executadas maiores que planejadas em parte da base. Por isso, o painel não utiliza a realização agregada de UPs como indicador principal. Os valores permanecem consultáveis, assim como datas sentinela, campos vazios e registros repetidos do histórico.

## Consulta e exportação

- Indicadores e gráficos usam uma única aba principal, preferencialmente `02_Base_Tratada`. Em novas bases, a seleção considera os cabeçalhos de projeto, programação e situação; use os nomes de colunas do arquivo original.
- Filtros: contratada, polo, intervenção, situação da programação, criticidade, datas e busca global. Clique em uma contratada no gráfico ou em uma coluna mensal para filtrar.
- Todas as colunas ficam na tabela com rolagem horizontal. Clique no cabeçalho para ordenar e em um projeto para abrir o registro completo. Há paginação de 25, 50 ou 100 linhas e busca/filtro por qualquer coluna.
- Nas abas de registros, os filtros são aplicados às linhas. Resumos por projeto mostram os projetos presentes no recorte, mas preservam seus totais históricos. Abas de agregados, capa e dashboards exibem os valores originais; a legenda abaixo dos controles explica o escopo. Desmarque “Aplicar filtros do painel” para consultar a aba inteira.
- **Excel completo**: restitui os bytes do arquivo Excel carregado, preservando suas abas, fórmulas, estilos e gráficos. No caso de CSV, gera um Excel com seus valores.
- **Consulta atual (Excel ou CSV)**: exporta todas as linhas filtradas da aba, e todas as colunas, não apenas a página visível. São valores de consulta, sem gráficos, estilos ou recálculo de fórmulas. Percentuais e horários preservam a representação legível; datas ISO ficam inequívocas.
- Fórmulas do arquivo são lidas pelos resultados salvos no Excel; o site não recalcula fórmulas. Recalcule e salve o arquivo no Excel antes de importar. Strings potencialmente executáveis em CSV recebem um apóstrofo protetor na exportação.

## Arquivos e créditos

- `index.html`, `styles.css`, `app.js`: interface e consulta.
- `excel.js`: leitura de Open XML/CSV e exportação de valores em XLSX/CSV no navegador.
- `data.js`: todas as células, formatos e fórmulas de referência, além do Excel original incorporado para download. Abre também pelo protocolo `file://`.
- `assets/jszip.min.js` e `assets/JSZip-LICENSE.md`: biblioteca JSZip, distribuída com sua licença.
- Logomarca Enel Brasil: ativo do site oficial https://www.enel.com.br/content/dam/enel-br/marca-2025/logo_Brasil_white_rgb.png . A marca pertence à Enel; a interface é um painel de acompanhamento preparado a partir da base fornecida.

Nenhum serviço externo é necessário para consultar ou importar os dados. Sem chaves de API ou credenciais nos arquivos.

## Verificação da entrega

Conferidos os totais das 15 abas, os filtros por contratada/situação/projeto/período, datas brasileiras e horários. A leitura do Excel foi comparada localmente em 968.141 células com os valores originais, sem divergências de conteúdo exibido. A exportação de consulta foi reaberta e conferida com 660 registros e 50 colunas. Sintaxe JavaScript e referências locais verificadas. A prévia visual e o teste completo no navegador ficaram indisponíveis neste ambiente.
