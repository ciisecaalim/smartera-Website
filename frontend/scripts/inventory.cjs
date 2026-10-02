const fs=require('fs'),path=require('path'),ts=require('../node_modules/typescript');
const root=path.resolve(__dirname,'../src');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);}
const files=walk(root).filter(p=>/\.(tsx|ts)$/.test(p)&&!/[\\/](academics|auth|student|i18n)[\\/]/.test(p));
const strings=new Map();
for(const file of files){const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);function visit(n){let s;if(ts.isJsxText(n))s=n.text.replace(/\s+/g,' ').trim();else if(ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n)){if(ts.isImportDeclaration(n.parent)||ts.isExportDeclaration(n.parent))return;s=n.text;}
if(s&&/[a-zA-Z]{2}/.test(s)&&!s.includes('className')&&!/^(@|\.|\/|https?:|#[a-fA-F0-9]|--)/.test(s)&&!/(?:\b(?:flex|grid|rounded|border|text|bg|px|py|mt|mb|gap|w|h)-|=>|\{)/.test(s)&&s.length<1500){strings.set(s,[...(strings.get(s)||[]),path.relative(root,file)]);}ts.forEachChild(n,visit);}visit(source);}
fs.writeFileSync(path.join(__dirname,'../src/i18n/inventory.json'),JSON.stringify([...strings].map(([en,files])=>({en,files:[...new Set(files)]})),null,2));
console.log('Files',files.length,'candidate strings',strings.size);
console.log([...strings.keys()].slice(0,140).join('\n'));
