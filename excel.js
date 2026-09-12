/* Leitura e exportação Open XML local. JSZip é distribuído com sua licença. */
window.ExcelIO=(()=>{
 const xml=s=>new DOMParser().parseFromString(s,'application/xml'), nodes=(d,n)=>Array.from(d.getElementsByTagNameNS('*',n)), text=(d,n)=>nodes(d,n)[0]?.textContent||'', esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g,'');
 const col=n=>{let s='';for(n++;n;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s};
 const colIndex=s=>[...s.replace(/\d/g,'')].reduce((a,c)=>a*26+c.charCodeAt(0)-64,0)-1;
 function detectHeader(rows){let best=0,score=-1;rows.slice(0,20).forEach((r,i)=>{const filled=r.filter(v=>v!==null&&v!=='');const n=filled.filter(v=>typeof v==='string').length;const bonus=filled.some(v=>/^projeto$/i.test(v))?30:0;const z=n+bonus-(filled.length-n)*2;if(z>score){score=z;best=i}});return best}
 function csv(s){s=s.replace(/^\uFEFF/,'');const first=s.split(/\r?\n/)[0];const delim=[';',',','\t'].sort((a,b)=>first.split(b).length-first.split(a).length)[0];let rows=[],row=[],v='',quoted=false;for(let i=0;i<s.length;i++){const c=s[i];if(c==='"'){if(quoted&&s[i+1]==='"'){v+='"';i++}else quoted=!quoted}else if(c===delim&&!quoted){row.push(v);v=''}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&s[i+1]==='\n')i++;row.push(v);rows.push(row);row=[];v=''}else v+=c}if(v||row.length){row.push(v);rows.push(row)}if(quoted)throw Error('CSV contém aspas sem fechamento. Verifique o arquivo.');return rows}
 async function read(file){
  const bytes=await file.arrayBuffer();if(/\.csv$/i.test(file.name)){let s=new TextDecoder('utf-8').decode(bytes);if(s.includes('\ufffd'))s=new TextDecoder('windows-1252').decode(bytes);const rows=csv(s);return {sheets:[{name:file.name.replace(/\.csv$/i,''),rows,header:detectHeader(rows),formats:{},formulas:{}}],bytes:null}}
  const zip=await JSZip.loadAsync(bytes);let total=0;
  async function get(path){const f=zip.file(path);if(!f)throw Error('Excel inválido: falta '+path);const s=await f.async('string');total+=s.length;if(total>250000000)throw Error('Arquivo descompactado muito grande. Importe uma base menor.');const d=xml(s);if(nodes(d,'parsererror').length)throw Error('XML inválido no Excel.');return d}
  const wb=await get('xl/workbook.xml'),rels=await get('xl/_rels/workbook.xml.rels');const paths=Object.fromEntries(nodes(rels,'Relationship').map(r=>[r.getAttribute('Id'),r.getAttribute('Target')]));
  const epoch=nodes(wb,'workbookPr')[0]?.getAttribute('date1904')==='1';
  const strings=zip.file('xl/sharedStrings.xml')?nodes(await get('xl/sharedStrings.xml'),'si').map(s=>nodes(s,'t').map(x=>x.textContent).join('')):[];
  const styles=zip.file('xl/styles.xml')?await get('xl/styles.xml'):null;
  const builtin={9:'0%',10:'0.00%',14:'dd/mm/yyyy',15:'dd-mmm-yy',16:'dd-mmm',17:'mmm-yy',18:'h:mm AM/PM',19:'h:mm:ss AM/PM',20:'h:mm',21:'h:mm:ss',22:'dd/mm/yyyy h:mm',45:'mm:ss',46:'[h]:mm:ss',47:'mmss.0'};
  const formats={...builtin,...Object.fromEntries(styles?nodes(styles,'numFmt').map(n=>[n.getAttribute('numFmtId'),n.getAttribute('formatCode')]):[])};
  const xf=styles?Array.from(nodes(styles,'cellXfs')[0]?.children||[]).map(n=>formats[n.getAttribute('numFmtId')]||'General'):[];
  let sheets=[];
  for(const sh of nodes(wb,'sheet')){
   let path=paths[sh.getAttribute('r:id')||sh.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships','id')];if(!path)continue;
   path=path.startsWith('/')?path.slice(1):'xl/'+path;path=path.split('/').reduce((a,p)=>{if(p==='..')a.pop();else if(p!=='.')a.push(p);return a},[]).join('/');
   const doc=await get(path),rows=[],fm={},formulas={};let maxCol=0;
   for(const cell of nodes(doc,'c')){const ref=cell.getAttribute('r');if(!ref)continue;const ci=colIndex(ref),ri=Number(ref.match(/\d+/)[0])-1;if(ri>200000||ci>2000)throw Error('Planilha excede 200 mil linhas ou 2 mil colunas.');const type=cell.getAttribute('t'),raw=text(cell,'v'),fmt=xf[Number(cell.getAttribute('s')||0)]||'General';let v=null;
    if(type==='s')v=strings[Number(raw)]??'';else if(type==='inlineStr')v=nodes(cell,'t').map(n=>n.textContent).join('');else if(type==='b')v=raw==='1';else if(type==='str'||type==='e'||type==='d')v=raw;else if(raw!=='')v=Number(raw);
    const clean=fmt.replace(/"[^"]*"|\\.|\[[^\]]*\]/g,'');
    if(typeof v==='number'&&/[yd]/i.test(clean)&&!/%/.test(clean)){const serial=v+(!epoch&&v>0&&v<60?1:0);const d=new Date(Date.UTC(epoch?1904:1899,epoch?0:11,epoch?1:30)+serial*86400000);v=d.toISOString().replace('T00:00:00.000Z','').replace('.000Z','')}
    if(v!==null||nodes(cell,'f').length){rows[ri]??=[];rows[ri][ci]=v;maxCol=Math.max(maxCol,ci+1);if(fmt!=='General')fm[ref]=fmt;if(nodes(cell,'f').length)formulas[ref]='='+text(cell,'f')}
   }
   const complete=Array.from({length:rows.length},(_,i)=>Array.from({length:maxCol},(_,j)=>rows[i]?.[j]??null));
   sheets.push({name:sh.getAttribute('name'),rows:complete,header:detectHeader(complete),formats:fm,formulas,hidden:sh.getAttribute('state')==='hidden'});
  }
  return {sheets,bytes};
 }
 async function write(sheets){const z=new JSZip(),ns='http://schemas.openxmlformats.org/spreadsheetml/2006/main';
  z.file('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'+sheets.map((s,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')+'</Types>');
  z.file('_rels/.rels','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
  z.file('xl/workbook.xml',`<workbook xmlns="${ns}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((s,i)=>`<sheet name="${esc(s.name.slice(0,31).replace(/[\\/?*\[\]:]/g,'_'))}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')}</sheets></workbook>`);
  z.file('xl/_rels/workbook.xml.rels','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+sheets.map((s,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')+'</Relationships>');
  sheets.forEach((s,i)=>{const body=s.rows.map((row,r)=>`<row r="${r+1}">${row.map((v,c)=>v===null||v===undefined?'':typeof v==='number'&&Number.isFinite(v)?`<c r="${col(c)}${r+1}"><v>${v}</v></c>`:typeof v==='boolean'?`<c r="${col(c)}${r+1}" t="b"><v>${v?1:0}</v></c>`:`<c r="${col(c)}${r+1}" t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`).join('')}</row>`).join('');z.file(`xl/worksheets/sheet${i+1}.xml`,`<worksheet xmlns="${ns}"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetData>${body}</sheetData></worksheet>`)});
  return z.generateAsync({type:'blob',compression:'DEFLATE',mimeType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
 }
 return {read,write,csv,col,detectHeader};
})();
