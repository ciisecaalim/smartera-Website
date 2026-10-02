// Explicit file list; dry-run by default. Back up each original before approved application.
const fs=require('fs'),path=require('path'),ts=require('../node_modules/typescript');
const root=path.resolve(__dirname,'../src'),apply=process.argv.includes('--apply');
const tags=new Set('a abbr article aside b blockquote button caption dd details div dt em fieldset figcaption figure footer h1 h2 h3 h4 h5 h6 header input label legend li main nav ol option p section select small span strong summary table tbody td textarea th thead time tr ul'.split(' '));
for(const relative of process.argv.slice(2).filter(p=>p!=='--apply')){
 const file=path.resolve(root,relative);
 if(!file.startsWith(root+path.sep)||/[\\/](academics|student|auth|i18n)[\\/]/.test(file)||!file.endsWith('.tsx'))throw Error('Outside allowed public component scope: '+file);
 const source=fs.readFileSync(file,'utf8');if(source.includes('@/i18n/elements')){console.log('Already connected:',relative);continue;}
 const sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true),edits=[],used=new Set();
 function visit(n){if((ts.isJsxOpeningElement(n)||ts.isJsxClosingElement(n)||ts.isJsxSelfClosingElement(n))&&tags.has(n.tagName.getText(sf))){const tag=n.tagName.getText(sf);used.add(tag);edits.push([n.tagName.getStart(sf),n.tagName.end,'L'+tag]);}ts.forEachChild(n,visit);}visit(sf);
 let result=source;for(const [start,end,text]of edits.sort((a,b)=>b[0]-a[0]))result=result.slice(0,start)+text+result.slice(end);
 const directive=/^(?:\uFEFF)?["']use client["'];?/.exec(result),at=directive?directive[0].length:0;
 if(used.size)result=result.slice(0,at)+'\nimport { '+[...used].sort().map(t=>t+' as L'+t).join(', ')+' } from "@/i18n/elements";\n'+result.slice(at);
 result=result.replace(/from ["']next\/link["']/g,'from "@/i18n/link"');
 const parsed=ts.createSourceFile(file,result,ts.ScriptTarget.Latest,true);if(parsed.parseDiagnostics.length)throw Error('Parse failed: '+relative);
 console.log(JSON.stringify({file:relative,tags:[...used],edits:edits.length,mode:apply?'apply':'preview'}));
 if(apply){const backup=path.resolve(__dirname,'../.backups/bilingual',relative);fs.mkdirSync(path.dirname(backup),{recursive:true});if(!fs.existsSync(backup))fs.writeFileSync(backup,source);fs.writeFileSync(file,result);}
}
