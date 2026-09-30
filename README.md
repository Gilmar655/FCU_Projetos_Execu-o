# Atualização FCU Projetos Execução — 30/09/2026

Pacote preparado para atualizar o repositório existente **Gilmar655/FCU_Projetos_Execu-o**.

## Base incorporada

- Arquivo fonte: `FCU -execução_30_09_2026(1).csv`
- Referência: **30/09/2026**
- Registros: **24,911**
- Colunas: **40**
- Projetos distintos: **10.093**
- Status SIGEO: Executado 10.873; ExecutadoParcial 2.797; Cancelado 7.262; LiberadoExecucao 3.168; LiberadoDocumentacao 602; PendenteAprovacao 209.
- Período encontrado em `Data_Programação`: **01/01/2026 a 09/12/2026**.

## Como publicar no GitHub Pages

1. Extraia este ZIP.
2. No repositório `Gilmar655/FCU_Projetos_Execu-o`, envie os arquivos deste pacote para a **raiz** do repositório e confirme a substituição de `index.html`, `data.js`, `README.md` e `LEIA-ME.html`.
3. **Mantenha os arquivos já existentes** `app.js`, `styles.css`, `excel.js`, `jszip.min.js`, `enel-brasil.png` e `JSZip-LICENSE.md`; envie também o novo `excel-patch.js` deste pacote.
4. O `index.html` deste pacote foi ajustado para carregar `jszip.min.js` e `enel-brasil.png` diretamente da raiz, de acordo com a estrutura atual do repositório.
5. Após o commit, aguarde o GitHub Pages atualizar e acesse: https://gilmar655.github.io/FCU_Projetos_Execu-o/

## Arquivos deste pacote

- `data.js` — base de 30/09/2026 incorporada ao site.
- `index.html` — página principal ajustada à estrutura atual do repositório.
- `excel-patch.js` — compatibilidade para importar CSV UTF-16/tabulado diretamente pelo painel.
- `FCU -execução_30_09_2026(1).csv` — cópia da base fonte.
- `.nojekyll` — evita processamento Jekyll desnecessário.
- `LEIA-ME.html` — instruções rápidas de publicação.
- `README.md` — este documento.

Observação: o CSV original está em **UTF-16 LE** e usa **tabulação** como separador. O `data.js` já foi gerado diretamente dessa base, portanto a publicação não depende da leitura do CSV pelo navegador.
