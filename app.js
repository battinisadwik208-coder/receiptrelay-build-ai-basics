const sample=`MOSS & MINT
Canvas Daypack  $68.00
Purchased 09/22/2026
Returns accepted within 30 days
Warranty: 1 year`;
const textEl=document.getElementById('receiptText');
const sampleBtn=document.getElementById('sampleBtn');
const analyzeBtn=document.getElementById('analyzeBtn');
const resetBtn=document.getElementById('resetBtn');
const emptyState=document.getElementById('emptyState');
const resultCard=document.getElementById('resultCard');
const merchantEl=document.getElementById('merchant');
const totalEl=document.getElementById('total');
const purchaseEl=document.getElementById('purchaseDate');
const listEl=document.getElementById('deadlineList');
const fillEl=document.getElementById('confidenceFill');
const confidenceEl=document.getElementById('confidenceText');
const dateRe=/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/;
function parseDate(match){let [,m,d,y]=match; if(y.length===2)y='20'+y; return new Date(Number(y),Number(m)-1,Number(d));}
function prettyDate(date){return date.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});}
function addDays(date,days){const d=new Date(date);d.setDate(d.getDate()+days);return d;}
function money(text){const matches=[...text.matchAll(/(?:₹|\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d{2})?/gi)];return matches.length?matches[matches.length-1][0].replace(/\s+/g,' '):'—';}
function parseReceipt(raw){const lines=raw.split(/\n+/).map(s=>s.trim()).filter(Boolean);const dateMatch=raw.match(dateRe);const purchase=dateMatch?parseDate(dateMatch):null;const merchant=lines.find((line,i)=>i<4&&!/(receipt|invoice|date|total|tax|purchase|return|warranty)/i.test(line))||'Receipt';const total=money(raw);const returnMatch=raw.match(/(?:return|refund)[^\d]{0,30}(\d{1,3})\s*day/i);const warrantyMatch=raw.match(/warranty[^\d]{0,20}(\d+)\s*(year|month|day)/i);const deadlines=[];if(purchase&&returnMatch)deadlines.push({icon:'↩',title:'Return window',detail:`Based on “${returnMatch[1]}-day return”`,date:addDays(purchase,Number(returnMatch[1]))});if(purchase&&warrantyMatch){const n=Number(warrantyMatch[1]);const unit=warrantyMatch[2].toLowerCase();const days=unit.startsWith('year')?n*365:unit.startsWith('month')?n*30:n;deadlines.push({icon:'◫',title:'Warranty checkpoint',detail:`Based on “${warrantyMatch[1]} ${warrantyMatch[2]} warranty”`,date:addDays(purchase,days)});}if(purchase&&!deadlines.length)deadlines.push({icon:'⌁',title:'Keep proof of purchase',detail:'No return or warranty window detected',date:null});let score=0;if(purchase)score+=35;if(total!=='—')score+=25;if(returnMatch)score+=25;if(warrantyMatch)score+=15;return{merchant,total,purchase,deadlines,score};}
function render(){const raw=textEl.value.trim();if(!raw){textEl.focus();return;}const r=parseReceipt(raw);merchantEl.textContent=r.merchant;totalEl.textContent=r.total;purchaseEl.textContent=r.purchase?prettyDate(r.purchase):'Not found';listEl.innerHTML=r.deadlines.map(x=>`<div class="deadline"><span class="deadline-icon">${x.icon}</span><div><strong>${x.title}</strong><small>${x.detail}</small></div><span class="deadline-date">${x.date?prettyDate(x.date):'Review receipt'}</span></div>`).join('');fillEl.style.width=`${r.score}%`;confidenceEl.textContent=`${r.score}%`;emptyState.classList.add('hidden');resultCard.classList.remove('hidden');resultCard.scrollIntoView({behavior:'smooth',block:'nearest'});}
sampleBtn.addEventListener('click',()=>{textEl.value=sample;textEl.focus();});analyzeBtn.addEventListener('click',render);resetBtn.addEventListener('click',()=>{textEl.value='';resultCard.classList.add('hidden');emptyState.classList.remove('hidden');textEl.focus();});textEl.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter')render();});
