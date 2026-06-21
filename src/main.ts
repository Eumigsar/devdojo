import Phaser from 'phaser';
import './style.css';

type Vocab = { id: string; hz: string; py: string; pt: string };
type Quest = { id: string; name: string; desc: string; xp: number; coins: number; words: string[]; target: string; sifu: string };
type Save = { xp: number; coins: number; idx: number; done: string[]; words: string[]; x: number; y: number };
type Npc = { id: string; name: string; role: string; hz: string; x: number; y: number; robe: number; aura: number; words: string[]; text: string };

const TILE_W = 96;
const TILE_H = 48;
const MAP_W = 26;
const MAP_H = 26;
const KEY = 'matsuri-isometric-rpg-v1';

const vocab: Vocab[] = [
  ['gongfu','功夫','gōngfu','kung fu'],['nihao','你好','nǐ hǎo','olá'],['shifu','师父','shīfu','sifu'],['quan','拳','quán','punho'],['da','打','dǎ','golpear'],['shou','手','shǒu','mão'],['jiao','脚','jiǎo','pé'],['qian','前','qián','frente'],['hou','后','hòu','trás'],['zuo','左','zuǒ','esquerda'],['you','右','yòu','direita'],['ti','踢','tī','chutar'],['dang','挡','dǎng','bloquear'],['zhuan','转','zhuǎn','girar'],['shu','书','shū','livro'],['cha','茶','chá','chá']
].map(([id,hz,py,pt])=>({id,hz,py,pt}));

const quests: Quest[] = [
  { id:'gate', name:'Os Tons do Portão', desc:'Clique/ande até Sifu Chen no salão central e pressione E.', xp:25, coins:8, words:['nihao','shifu'], target:'chen', sifu:'Muito bem. 你好 abre a porta; 师父 reconhece o mestre.' },
  { id:'punch', name:'O Primeiro Punho', desc:'Vá até Hua Lan no pátio marcial. Aprenda 拳, 打 e 手.', xp:35, coins:10, words:['quan','da','shou'], target:'hualan', sifu:'拳 quán é punho. 打 dǎ é golpear. 手 shǒu é a mão que aprende.' },
  { id:'stance', name:'Raiz no Pátio', desc:'Entre no círculo dourado das bases para treinar postura.', xp:40, coins:12, words:['jiao','qian','hou'], target:'stanceZone', sifu:'A raiz começa em 脚. 前 avança; 后 recua com consciência.' },
  { id:'library', name:'Biblioteca Viva', desc:'Visite Wen Bo. Cada palavra vira um pergaminho.', xp:30, coins:9, words:['shu'], target:'wenbo', sifu:'书 shū é livro. Sua biblioteca cresce com cada missão.' },
  { id:'tea', name:'Chá com Po Po', desc:'Encontre Po Po no jardim de chá.', xp:30, coins:9, words:['cha'], target:'popo', sifu:'茶 chá. Histórias também são saboreadas devagar.' },
  { id:'guard', name:'Defesa do Portão', desc:'Fale com Yun Daozhang no portão norte.', xp:45, coins:14, words:['dang','zhuan'], target:'yun', sifu:'挡 é bloquear; 转 é girar. Defesa é mudança de eixo.' }
];

const npcs: Npc[] = [
  { id:'chen', name:'Sifu Chen', role:'Mestre Principal', hz:'师', x:12, y:10, robe:0xd83a32, aura:0xe7c75a, words:['nihao','shifu'], text:'Discípula, o treino começa com respeito. Diga 你好 ao cruzar o portão.' },
  { id:'hualan', name:'Hua Lan', role:'Mestra dos Punhos', hz:'花', x:7, y:16, robe:0x8d63ff, aura:0xff78c5, words:['quan','da','shou'], text:'Punho sem intenção é vazio. Hoje seu corpo aprende 拳.' },
  { id:'wenbo', name:'Wen Bo', role:'Bibliotecário', hz:'文', x:18, y:9, robe:0x2d5f8d, aura:0x5bd0e8, words:['shu'], text:'Na biblioteca, cada palavra se materializa como pergaminho.' },
  { id:'popo', name:'Po Po', role:'Histórias e Chá', hz:'婆', x:19, y:17, robe:0xb98b2e, aura:0xe7c75a, words:['cha'], text:'Sente-se. 茶 é chá. Aprender também é aquecer o espírito.' },
  { id:'yun', name:'Yun Daozhang', role:'Sábio do Portão', hz:'云', x:12, y:5, robe:0x3fa99a, aura:0x3fa99a, words:['dang','zhuan'], text:'挡 bloqueia. 转 gira. O caminho muda quando seu eixo muda.' }
];

const zones = [
  { id:'stanceZone', name:'Área das Bases', x:6, y:13, r:1.4 },
  { id:'bamboo', name:'Floresta de Bambu', x:4, y:5, r:2.2 },
  { id:'teaTable', name:'Jardim de Chá', x:20, y:18, r:1.8 }
];

function iso(x:number,y:number){ return { x:(x-y)*TILE_W/2, y:(x+y)*TILE_H/2 }; }
function fresh():Save { return { xp:0, coins:0, idx:0, done:[], words:['gongfu'], x:12, y:14 }; }
function load():Save { try { return { ...fresh(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return fresh(); } }
let save = load();
function persist(){ localStorage.setItem(KEY, JSON.stringify(save)); }
function currentQuest(){ return quests[save.idx % quests.length]; }
function discover(ids:string[]){ ids.forEach(id=>{ if(!save.words.includes(id)) save.words.push(id); }); }

const el = {
  title: document.getElementById('quest-title')!, desc: document.getElementById('quest-desc')!, xp: document.getElementById('xp')!, coins: document.getElementById('coins')!, words: document.getElementById('words')!, area: document.getElementById('area')!, steps: document.getElementById('steps')!, codex: document.getElementById('codex')!, toast: document.getElementById('toast')!, dialog: document.getElementById('dialog')!, dPortrait: document.getElementById('dialog-portrait')!, dEye: document.getElementById('dialog-eye')!, dTitle: document.getElementById('dialog-title')!, dText: document.getElementById('dialog-text')!, dActions: document.getElementById('dialog-actions')!
};
function toast(text:string){ el.toast.textContent=text; el.toast.classList.add('show'); setTimeout(()=>el.toast.classList.remove('show'),2600); }
function renderUI(){
  const q=currentQuest(); el.title.textContent='Missão: '+q.name; el.desc.textContent=q.desc; el.xp.textContent=String(save.xp); el.coins.textContent=String(save.coins); el.words.textContent=String(save.words.length);
  el.steps.innerHTML = quests.map((q,i)=>`<div class="step ${save.done.includes(q.id)?'done':''} ${q.id===currentQuest().id?'active':''}"><div class="orb">${save.done.includes(q.id)?'✓':i+1}</div><div><strong>${q.name}</strong><small>${q.desc}</small></div><div class="reward">+${q.xp} XP</div></div>`).join('');
  el.codex.innerHTML = `<div class="codex-grid">${vocab.map(w=>{const ok=save.words.includes(w.id); return `<div class="word ${ok?'':'lock'}"><div class="hz">${ok?w.hz:'？'}</div><div class="py">${ok?w.py:'bloqueado'}</div><div class="pt">${ok?w.pt:'complete missões'}</div></div>`}).join('')}</div>`;
}
function openDialog(hz:string, eye:string, title:string, text:string, actions:Array<[string,()=>void]>){
  el.dPortrait.textContent=hz; el.dEye.textContent=eye; el.dTitle.textContent=title; el.dText.textContent=text; el.dActions.innerHTML='';
  actions.concat([['Fechar', closeDialog]]).forEach(([label, fn])=>{ const b=document.createElement('button'); b.textContent=label; b.className=label==='Treinar'?'primary':''; b.onclick=fn; el.dActions.appendChild(b); });
  el.dialog.classList.remove('hidden');
}
function closeDialog(){ el.dialog.classList.add('hidden'); }
function completeTarget(target:string){
  const q=currentQuest();
  if(q.target!==target){ toast('Interação descoberta, mas a missão atual pede outro objetivo.'); return false; }
  if(save.done.includes(q.id)){ toast('Essa missão já foi concluída.'); return true; }
  save.xp+=q.xp; save.coins+=q.coins; save.done.push(q.id); discover(q.words); persist(); renderUI(); toast(`Missão concluída: +${q.xp} XP, +${q.coins} moedas`); return true;
}

class MainScene extends Phaser.Scene{
  player!: Phaser.GameObjects.Container; marker!: Phaser.GameObjects.Arc; cursors!: Phaser.Types.Input.Keyboard.CursorKeys; keys!: Record<string, Phaser.Input.Keyboard.Key>; target: Phaser.Math.Vector2|null=null; npcSprites = new Map<string, Phaser.GameObjects.Container>(); zoneSprites = new Map<string, Phaser.GameObjects.Container>();
  constructor(){ super('main'); }
  create(){
    this.cameras.main.setBackgroundColor('#09070d');
    document.body.insertAdjacentHTML('beforeend','<div class="version">ISOMETRIC RPG V1 · estilo Albion/Tibia · Phaser 3</div>');
    this.createTextures(); this.drawWorld(); this.createEntities(); this.createPlayer(); this.createInput(); renderUI(); toast('RPG isométrico carregado. Caminhe até Sifu Chen e pressione E.');
  }
  createTextures(){
    const g=this.add.graphics();
    g.fillStyle(0x24223c,1); g.lineStyle(2,0x3b3457,.9); g.beginPath(); g.moveTo(48,0); g.lineTo(96,24); g.lineTo(48,48); g.lineTo(0,24); g.closePath(); g.fillPath(); g.strokePath(); g.generateTexture('tileStone',96,48); g.clear();
    g.fillStyle(0x1d3c34,1); g.lineStyle(2,0x3fa99a,.65); g.beginPath(); g.moveTo(48,0); g.lineTo(96,24); g.lineTo(48,48); g.lineTo(0,24); g.closePath(); g.fillPath(); g.strokePath(); g.generateTexture('tileGrass',96,48); g.destroy();
  }
  drawWorld(){
    const centerX=0, centerY=0;
    for(let y=0;y<MAP_H;y++) for(let x=0;x<MAP_W;x++){ const p=iso(x,y); const key=(x<7&&y<8)||x>19||y>20?'tileGrass':'tileStone'; this.add.image(centerX+p.x,centerY+p.y,key).setDepth(p.y); }
    this.add.text(iso(11,7).x-110, iso(11,7).y-170, '祭 学院', {fontFamily:'Georgia', fontSize:'34px', color:'#fff1d6'}).setDepth(10);
    this.building(10,7,5,4,'Salão Central',0xd83a32); this.building(17,7,4,3,'Biblioteca',0x2d5f8d); this.building(10,3,5,2,'Portão Norte',0x3fa99a); this.building(5,14,5,3,'Pátio Marcial',0x8d63ff); this.building(18,16,4,3,'Jardim de Chá',0xb98b2e);
    for(let i=0;i<35;i++){ const x=Phaser.Math.Between(2,7), y=Phaser.Math.Between(2,8), p=iso(x+Math.random(),y+Math.random()); this.bamboo(p.x,p.y); }
    zones.forEach(z=>{ const p=iso(z.x,z.y); const c=this.add.circle(p.x,p.y,55*z.r, z.id==='stanceZone'?0xe7c75a:0x3fa99a,.16).setStrokeStyle(2,0xe7c75a,.5).setDepth(p.y+1); this.add.text(p.x-55,p.y-72,z.name,{fontSize:'13px',color:'#fff1d6'}).setDepth(p.y+2); const cont=this.add.container(p.x,p.y,[c]).setSize(80,80); this.zoneSprites.set(z.id,cont); });
  }
  building(tx:number,ty:number,tw:number,th:number,label:string,color:number){ const p=iso(tx,ty); const base=this.add.graphics().setDepth(p.y+200); base.fillStyle(0x000000,.22); base.fillEllipse(p.x+tw*30,p.y+th*22+40,tw*80,45); base.fillStyle(0xfff1d6,.13); base.lineStyle(2,0xe7c75a,.38); base.fillRoundedRect(p.x-80,p.y-85,tw*70,th*55,10); base.strokeRoundedRect(p.x-80,p.y-85,tw*70,th*55,10); base.fillStyle(color,1); base.beginPath(); base.moveTo(p.x-120,p.y-90); base.lineTo(p.x+tw*35,p.y-165); base.lineTo(p.x+tw*70+40,p.y-90); base.lineTo(p.x+tw*45,p.y-75); base.lineTo(p.x+tw*25,p.y-80); base.closePath(); base.fillPath(); base.lineStyle(2,0xfff1d6,.45); base.strokePath(); base.fillStyle(0xe7c75a,1); base.fillRect(p.x-55,p.y-45,12,65); base.fillRect(p.x+tw*55-70,p.y-45,12,65); this.add.text(p.x-58,p.y-70,label,{fontSize:'14px', color:'#fff1d6', fontFamily:'Georgia'}).setDepth(p.y+250); }
  bamboo(x:number,y:number){ const g=this.add.graphics().setDepth(y); g.lineStyle(5,0x2f7957,.85); g.beginPath(); g.moveTo(x,y+25); g.lineTo(x+Phaser.Math.Between(-8,8),y-35); g.strokePath(); g.fillStyle(0x3fa99a,.6); g.fillEllipse(x+8,y-20,30,8, -0.5); }
  createEntities(){ npcs.forEach(n=>{ const p=iso(n.x,n.y); const c=this.npcContainer(n,p.x,p.y); this.npcSprites.set(n.id,c); }); }
  npcContainer(n:Npc,x:number,y:number){ const c=this.add.container(x,y).setDepth(y+500); const aura=this.add.circle(0,-26,58,n.aura,.16); const body=this.add.ellipse(0,8,42,58,n.robe); const head=this.add.circle(0,-38,25,0xf3d7c2); const hair=this.add.ellipse(0,-51,48,32,0x1b1028); const lEye=this.add.ellipse(-9,-39,8,11,0xffffff); const rEye=this.add.ellipse(9,-39,8,11,0xffffff); const lp=this.add.ellipse(-9,-38,4,7,0x24112f); const rp=this.add.ellipse(9,-38,4,7,0x24112f); const hz=this.add.text(0,7,n.hz,{fontFamily:'Georgia',fontSize:'20px',color:'#e7c75a'}).setOrigin(.5); const name=this.add.text(0,48,n.name,{fontSize:'11px',color:'#fff1d6'}).setOrigin(.5); c.add([aura,body,head,hair,lEye,rEye,lp,rp,hz,name]); this.tweens.add({targets:c,y:y-6,duration:1400,yoyo:true,repeat:-1,ease:'Sine.inOut'}); return c; }
  createPlayer(){ const p=iso(save.x,save.y); this.player=this.add.container(p.x,p.y).setDepth(p.y+800); const aura=this.add.circle(0,0,42,0x5bd0e8,.14); const body=this.add.ellipse(0,8,38,55,0x4f7cff); const head=this.add.circle(0,-35,24,0xf1d2b8); const hair=this.add.ellipse(0,-49,44,29,0x211328); const lEye=this.add.ellipse(-8,-37,7,10,0xffffff); const rEye=this.add.ellipse(8,-37,7,10,0xffffff); const lp=this.add.ellipse(-8,-36,4,7,0x1d255c); const rp=this.add.ellipse(8,-36,4,7,0x1d255c); const label=this.add.text(0,47,'Você',{fontSize:'12px',color:'#fff1d6'}).setOrigin(.5); this.player.add([aura,body,head,hair,lEye,rEye,lp,rp,label]); this.cameras.main.startFollow(this.player,true,.08,.08); this.cameras.main.setZoom(1); this.cameras.main.setBounds(-1500,-200,3000,1700); this.marker=this.add.circle(p.x,p.y,10,0xe7c75a,.7).setDepth(9999).setVisible(false); }
  createInput(){ this.cursors=this.input.keyboard!.createCursorKeys(); this.keys=this.input.keyboard!.addKeys('W,A,S,D,E') as Record<string,Phaser.Input.Keyboard.Key>; this.input.on('pointerdown',(pointer:Phaser.Input.Pointer)=>{ const wx=pointer.worldX, wy=pointer.worldY; const tx=(wy/(TILE_H/2)+wx/(TILE_W/2))/2; const ty=(wy/(TILE_H/2)-wx/(TILE_W/2))/2; this.target=new Phaser.Math.Vector2(Phaser.Math.Clamp(tx,1,MAP_W-2),Phaser.Math.Clamp(ty,1,MAP_H-2)); const pp=iso(this.target.x,this.target.y); this.marker.setPosition(pp.x,pp.y).setVisible(true); }); }
  update(_:number,dtMs:number){ const dt=dtMs/1000; let vx=0,vy=0; if(this.cursors.left.isDown||this.keys.A.isDown)vx--; if(this.cursors.right.isDown||this.keys.D.isDown)vx++; if(this.cursors.up.isDown||this.keys.W.isDown)vy--; if(this.cursors.down.isDown||this.keys.S.isDown)vy++; if(Phaser.Input.Keyboard.JustDown(this.keys.E)) this.interact(); if(vx||vy){ this.target=null; this.marker.setVisible(false); const len=Math.hypot(vx,vy)||1; save.x=Phaser.Math.Clamp(save.x+vx/len*3.4*dt,1,MAP_W-2); save.y=Phaser.Math.Clamp(save.y+vy/len*3.4*dt,1,MAP_H-2); }
    if(this.target){ const dx=this.target.x-save.x, dy=this.target.y-save.y, d=Math.hypot(dx,dy); if(d<.08){this.target=null; this.marker.setVisible(false);} else { save.x+=dx/d*3.2*dt; save.y+=dy/d*3.2*dt; } }
    const p=iso(save.x,save.y); this.player.setPosition(p.x,p.y); this.player.setDepth(p.y+800); el.area.textContent=this.areaName(); persist(); this.highlightNearest(); }
  areaName(){ if(save.y<6)return 'Portão'; if(save.x<9&&save.y>13)return 'Pátio'; if(save.x>16&&save.y<12)return 'Biblioteca'; if(save.x>17&&save.y>14)return 'Jardim'; return 'Salão'; }
  nearest(){ let best:{type:string,id:string,d:number,npc?:Npc,zone?:typeof zones[number]}|null=null; npcs.forEach(n=>{ const d=Math.hypot(save.x-n.x,save.y-n.y); if(d<1.35 && (!best||d<best.d)) best={type:'npc',id:n.id,d,npc:n}; }); zones.forEach(z=>{ const d=Math.hypot(save.x-z.x,save.y-z.y); if(d<z.r && (!best||d<best.d)) best={type:'zone',id:z.id,d,zone:z}; }); return best; }
  highlightNearest(){ this.npcSprites.forEach((c)=>c.setScale(1)); this.zoneSprites.forEach(c=>c.setScale(1)); const n=this.nearest(); if(!n)return; if(n.type==='npc')this.npcSprites.get(n.id)?.setScale(1.12); else this.zoneSprites.get(n.id)?.setScale(1.08); }
  interact(){ const item=this.nearest(); if(!item){ toast('Aproxime-se de um Sifu ou área brilhante.'); return; } if(item.type==='npc'&&item.npc){ const n=item.npc; const did=completeTarget(n.id); openDialog(n.hz,n.name,n.role,n.text+(did?'\n\nMissão reconhecida no caminho.':''), [['Treinar',()=>{completeTarget(n.id); closeDialog();}], ['Próxima missão',()=>{save.idx=(save.idx+1)%quests.length; persist(); renderUI(); closeDialog();}]]); } else if(item.zone){ const z=item.zone; const did=completeTarget(z.id); if(z.id==='bamboo') discover(['zuo','you']); persist(); renderUI(); openDialog('地',z.name,'Área de treino', did ? currentQuest().sifu : 'Esta área tem energia própria. Algumas missões vão pedir que você treine aqui.', [['Fechar', closeDialog]]); } }
}
function completeTarget(target:string){ const q=currentQuest(); if(q.target!==target){ toast('Não é o alvo da missão atual.'); return false; } if(save.done.includes(q.id)){ toast('Essa missão já foi concluída.'); return true; } save.xp+=q.xp; save.coins+=q.coins; save.done.push(q.id); discover(q.words); persist(); renderUI(); toast(`Missão concluída: +${q.xp} XP, +${q.coins} moedas`); return true; }

new Phaser.Game({ type: Phaser.AUTO, parent:'game-root', width: window.innerWidth, height: window.innerHeight, backgroundColor:'#09070d', scene: MainScene, scale:{mode:Phaser.Scale.RESIZE, autoCenter:Phaser.Scale.CENTER_BOTH} });
