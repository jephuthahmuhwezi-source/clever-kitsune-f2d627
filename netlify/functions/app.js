avascriptconst USERS = {};
let WALLET = 0;
const PRICES = { love: 5000, football: 200, cards: 150, ludo: 150, bible: 0 };

const HTML = `<!DOCTYPE html><html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>HaquePlay</title><script src='https://cdn.tailwindcss.com'></script></head><body style='background:#0f0f0f;color:#fff;padding:15px;font-family:sans-serif'><div style='max-width:420px;margin:auto'><h1 style='color:#FFC107;text-align:center;font-size:28px;font-weight:900'>HaquePlay</h1><p style='text-align:center;font-size:11px;color:#999'>Real Money | MTN UGX 200,150,5000 | Bible FREE</p><div id='app' style='margin-top:15px'></div></div><script>
let cur=null,step='reg';
function R(){
 let a=document.getElementById('app');
 if(step==='reg'){a.innerHTML='<div style=\\'background:#1e1e1e;padding:18px;border-radius:14px\\'><h3>1 Registration - 1000 UGX Once</h3><input id=\\'n\\' placeholder=\\'Full Name\\' style=\\'width:100%;padding:12px;margin:6px 0;border-radius:8px;color:#000\\'><input id=\\'e\\' placeholder=\\'Email\\' style=\\'width:100%;padding:12px;margin:6px 0;border-radius:8px;color:#000\\'><input id=\\'p\\' placeholder=\\'Phone 07XXXXXXXX\\' style=\\'width:100%;padding:12px;margin:6px 0;border-radius:8px;color:#000\\'><label style=\\'font-size:12px\\'><input type=\\'checkbox\\' id=\\'t\\'> Accept Terms 18+</label><button onclick=\\'goReg()\\' style=\\'width:100%;background:#FFC107;color:#000;padding:12px;border-radius:10px;font-weight:bold;margin-top:10px\\'>Register Code 123456</button><div id=\\'rm\\' style=\\'font-size:12px;margin-top:8px\\'></div></div>';}
 if(step==='ver'){a.innerHTML='<div style=\\'background:#1e1e1e;padding:18px;border-radius:14px\\'><h3>2 Verify - Use 123456</h3><input id=\\'c\\' placeholder=\\'Code 123456\\' style=\\'width:100%;padding:12px;margin:6px 0;border-radius:8px;color:#000\\'><button onclick=\\'goVer()\\' style=\\'width:100%;background:#FFC107;color:#000;padding:12px;border-radius:10px;font-weight:bold\\'>Verify</button><div id=\\'vm\\' style=\\'font-size:12px;margin-top:8px\\'></div></div>';}
 if(step==='games'){a.innerHTML='<div style=\\'background:#1e1e1e;padding:18px;border-radius:14px\\'><h3>Welcome '+cur.name+' Balance: UGX '+(cur.balance||0)+'</h3><div style=\\'display:grid;gap:10px;margin-top:12px\\'><div style=\\'background:#2a2a2a;padding:12px;border-radius:10px;display:flex;justify-content:space-between;align-items:center\\'><div><b>Love Game</b><div style=\\'font-size:11px;color:#aaa\\'>5000 each Winner 9000</div></div><button onclick=\\'playG(\\'love\\')\\' style=\\'background:#FFC107;color:#000;padding:8px 14px;border-radius:8px;font-weight:bold\\'>Play 5k</button></div><div style=\\'background:#2a2a2a;padding:12px;border-radius:10px;display:flex;justify-content:space-between;align-items:center\\'><div><b>Football</b><div style=\\'font-size:11px;color:#aaa\\'>200 per game</div></div><button onclick=\\'playG(\\'football\\')\\' style=\\'background:#FFC107;color:#000;padding:8px 14px;border-radius:8px;font-weight:bold\\'>Play 200</button></div><div style=\\'background:#2a2a2a;padding:12px;border-radius:10px;display:flex;justify-content:space-between;align-items:center\\'><div><b>Cards</b><div style=\\'font-size:11px;color:#aaa\\'>150 per game</div></div><button onclick=\\'playG(\\'cards\\')\\' style=\\'background:#FFC107;color:#000;padding:8px 14px;border-radius:8px;font-weight:bold\\'>Play 150</button></div><div style=\\'background:#2a2a2a;padding:12px;border-radius:10px;display:flex;justify-content:space-between;align-items:center\\'><div><b>Ludo</b><div style=\\'font-size:11px;color:#aaa\\'>150 per game</div></div><button onclick=\\'playG(\\'ludo\\')\\' style=\\'background:#FFC107;color:#000;padding:8px 14px;border-radius:8px;font-weight:bold\\'>Play 150</button></div><div style=\\'background:#1a3a1a;padding:12px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;border:1px solid green\\'><div><b>Bible FREE</b><div style=\\'font-size:11px;color:#6f6\\'>Free Invite 3=500 10=2000</div></div><button onclick=\\'playG(\\'bible\\')\\' style=\\'background:green;color:#fff;padding:8px 14px;border-radius:8px;font-weight:bold\\'>FREE</button></div></div><div style=\\'margin-top:12px;background:#000;padding:10px;border-radius:8px;font-size:11px\\'><b>Invite Link:</b><div style=\\'color:#FFC107;word-break:break-all\\'>https://roaring-cucurucho-58192a.netlify.app/?ref='+cur.id+'</div>Invited: '+(cur.invites||0)+'</div><div id=\\'gm\\' style=\\'margin-top:10px;font-size:13px\\'></div></div>';}
}
async function goReg(){
 let name=document.getElementById('n').value;
 let email=document.getElementById('e').value;
 let phone=document.getElementById('p').value;
 if(!document.getElementById('t').checked){document.getElementById('rm').innerText='Accept terms';return;}
 document.getElementById('rm').innerText='Registering...';
 let res=await fetch('/.netlify/functions/app?action=register',{method:'POST',body:JSON.stringify({name,email,phone})});
 let d=await res.json();
 if(d.ok){cur=d.user;step='ver';R();}else{document.getElementById('rm').innerText=d.msg;}
}
async function goVer(){
 let code=document.getElementById('c').value;
 let res=await fetch('/.netlify/functions/app?action=verify',{method:'POST',body:JSON.stringify({email:cur.email,code})});
 let d=await res.json();
 if(d.ok){step='games';R();}else{document.getElementById('vm').innerText=d.msg+' Use 123456';}
}
async function playG(g){
 let el=document.getElementById('gm');el.innerText='Paying MTN '+g+'...';
 let res=await fetch('/.netlify/functions/app?action=pay',{method:'POST',body:JSON.stringify({userId:cur.id,game:g})});
 let d=await res.json();
 if(d.ok){el.innerText=d.msg+' Bal:'+d.balance;cur.balance=d.balance;}
 else{el.innerText=d.msg;}
}
R();
</script></body></html>`;

const ADMIN = `<html><body style='background:#000;color:#fff;padding:20px'><h2 style='color:gold'>Admin Wallet</h2><input id='pwd' placeholder='HaquePlay2024!' style='padding:10px;width:100%'><button onclick='go()' style='background:gold;padding:10px;width:100%;margin-top:10px'>View</button><pre id='o' style='margin-top:15px;font-size:12px'></pre><script>async function go(){let p=document.getElementById('pwd').value;let r=await fetch('/.netlify/functions/app?action=admin&pwd='+p);let d=await r.json();document.getElementById('o').innerText=JSON.stringify(d,null,2);}</script></body></html>`;

exports.handler = async (event) => {
  try{
    const qs = event.queryStringParameters || {};
    const act = qs.action;
    const path = (event.path||'').toLowerCase();
    if(path.includes('admin')){return {statusCode:200,headers:{'Content-Type':'text/html'},body:ADMIN};}
    if(event.httpMethod==='POST'){
      let b={}; try{b=JSON.parse(event.body||'{}');}catch(e){}
      if(act==='register'){
        let id='U'+Date.now();
        USERS[b.email]={id:id,name:b.name,email:b.email,phone:b.phone,balance:0,invites:0,paidReg:false};
        return {statusCode:200,body:JSON.stringify({ok:true,user:USERS[b.email]})};
      }
      if(act==='verify'){
        let u=USERS[b.email];
        if(!u) return {statusCode:200,body:JSON.stringify({ok:false,msg:'No user'})};
        if(b.code==='123456'){return {statusCode:200,body:JSON.stringify({ok:true})}; }
        return {statusCode:200,body:JSON.stringify({ok:false,msg:'Wrong code'})};
      }
      if(act==='pay'){
        let user=Object.values(USERS).find(x=>x.id===b.userId);
        if(!user) return {statusCode:200,body:JSON.stringify({ok:false,msg:'No user'})};
        let price=PRICES[b.game]||0;
        if(!user.paidReg){user.paidReg=true;WALLET+=1000;}
        if(b.game==='bible'){return {statusCode:200,body:JSON.stringify({ok:true,msg:'Bible FREE started!',balance:user.balance})}; }
        if(b.game==='love'){
          WALLET+=price;
          let win=Math.random()>0.5;
          if(win){user.balance+=9000;return {statusCode:200,body:JSON.stringify({ok:true,msg:'Love WON 9000 UGX! Pot 10k',balance:user.balance})}; }
          else{return {statusCode:200,body:JSON.stringify({ok:true,msg:'Love Played 5k Waiting',balance:user.balance})}; }
        }
        WALLET+=price;
        let winAmt=b.game==='football'?360:270;
        if(Math.random()>0.5){user.balance+=winAmt;return {statusCode:200,body:JSON.stringify({ok:true,msg:b.game+' WON '+winAmt+' UGX',balance:user.balance})}; }
        else{return {statusCode:200,body:JSON.stringify({ok:true,msg:b.game+' Played '+price+' UGX Try again',balance:user.balance})}; }
      }
    }
    if(act==='admin'){
      if(qs.pwd!=='HaquePlay2024!') return {statusCode:200,body:JSON.stringify({ok:false,msg:'Wrong pwd'})};
      return {statusCode:200,body:JSON.stringify({wallet:WALLET,users:USERS})};
    }
    return {statusCode:200,headers:{'Content-Type':'text/html'},body:HTML};
  }catch(e){
    return {statusCode:200,headers:{'Content-Type':'text/html'},body:'Error: '+e.message+'<pre>'+e.stack+'</pre>'};
  }
};

