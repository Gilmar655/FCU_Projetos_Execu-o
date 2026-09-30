/* Compatibilidade adicional para CSV UTF-16 (ex.: exportações do Excel/SAP/SIGEO). */
(()=>{
  'use strict';
  if(!window.ExcelIO || typeof window.ExcelIO.read!=='function') return;
  const originalRead=window.ExcelIO.read;
  window.ExcelIO.read=async function(file){
    if(!/\.csv$/i.test(file.name)) return originalRead(file);
    const bytes=await file.arrayBuffer();
    const u8=new Uint8Array(bytes);
    let enc='utf-8';
    if(u8.length>=2 && u8[0]===0xFF && u8[1]===0xFE) enc='utf-16le';
    else if(u8.length>=2 && u8[0]===0xFE && u8[1]===0xFF) enc='utf-16be';
    let s=new TextDecoder(enc).decode(bytes);
    if(enc==='utf-8' && s.includes('\ufffd')) s=new TextDecoder('windows-1252').decode(bytes);
    const rows=window.ExcelIO.csv(s);
    return {sheets:[{name:file.name.replace(/\.csv$/i,''),rows,header:window.ExcelIO.detectHeader(rows),formats:{},formulas:{}}],bytes:null};
  };
})();
