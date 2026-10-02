const fs=require('fs');
const file='frontend/src/i18n/messages.json';
const messages=JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));
const lines=fs.readFileSync(0,'utf8').replace(/^\uFEFF/,'').split(/\r?\n/);
for(const line of lines){if(!line.trim())continue;const i=line.indexOf('|');if(i<0)throw Error('Missing separator: '+line);messages[line.slice(0,i)]=line.slice(i+1);}
fs.writeFileSync(file,JSON.stringify(messages,null,2)+'\n');console.log(Object.keys(messages).length+' messages');
