import { useState } from "react";

/* ─── Brand ──────────────────────────────────────────────── */
const B = {
  navy:"#1B2B3A", navyMid:"#243445", navyLight:"#2E4160",
  gold:"#C8A96E", goldLight:"#DFC28F", goldPale:"#F5EDD9",
  cream:"#FAF8F4", muted:"#8A8378", border:"#D9D3C8",
  text:"#1B2B3A", textSoft:"#5A5248",
};
const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif";
const CONDITIONS = ["Poor","Fair","Average","Good","Very Good","Excellent"];

const emptyComp = () => ({
  address:"",beds:"",baths:"",sqft:"",salePrice:"",saleDate:"",
  garage:"",pool:false,lotSize:"",condition:"Average",daysOnMarket:""
});
const emptySub = {
  address:"",city:"",state:"UT",zip:"",beds:"",baths:"",sqft:"",
  yearBuilt:"",garage:"",pool:false,lotSize:"",condition:"Good",
  agentName:"",agentEmail:"",agentPhone:"",brokerageName:""
};

/* ─── Styles ─────────────────────────────────────────────── */
const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');
    .cr *{box-sizing:border-box;}
    .cr-input{width:100%;padding:9px 12px;border:1px solid ${B.border};border-radius:4px;background:#fff;color:${B.text};font-family:${SANS};font-size:13px;transition:border-color .15s;}
    .cr-input:focus{outline:none;border-color:${B.gold};box-shadow:0 0 0 3px ${B.goldPale};}
    .cr-select{width:100%;padding:9px 12px;border:1px solid ${B.border};border-radius:4px;background:#fff;color:${B.text};font-family:${SANS};font-size:13px;}
    .cr-primary{padding:11px 24px;border:none;border-radius:4px;background:${B.navy};color:#fff;font-family:${SANS};font-size:13px;font-weight:600;cursor:pointer;letter-spacing:.5px;transition:background .15s;}
    .cr-primary:hover{background:${B.navyLight};}
    .cr-primary:disabled{background:${B.muted};cursor:not-allowed;}
    .cr-ghost{padding:11px 20px;border:1px solid ${B.border};border-radius:4px;background:transparent;color:${B.textSoft};font-family:${SANS};font-size:13px;cursor:pointer;transition:all .15s;}
    .cr-ghost:hover{border-color:${B.navy};color:${B.navy};}
    .cr-gold{padding:12px 28px;border:none;border-radius:4px;background:${B.gold};color:${B.navy};font-family:${SANS};font-size:13px;font-weight:600;cursor:pointer;letter-spacing:.5px;transition:background .15s;}
    .cr-gold:hover{background:${B.goldLight};}
    .cr-gold:disabled{opacity:.5;cursor:not-allowed;}
    .cr-sm{padding:7px 14px;border:1px solid ${B.border};border-radius:4px;background:transparent;color:${B.textSoft};font-family:${SANS};font-size:12px;cursor:pointer;transition:all .15s;}
    .cr-sm:hover{border-color:${B.navy};color:${B.navy};}
    .mode-card{border:2px solid ${B.border};border-radius:10px;padding:1.4rem;cursor:pointer;transition:all .2s;background:#fff;}
    .mode-card:hover{border-color:${B.gold};box-shadow:0 2px 14px rgba(200,169,110,.15);}
    .mls-row{display:flex;gap:0;}
    .mls-row .cr-input{border-radius:4px 0 0 4px;border-right:none;}
    .mls-row button{border-radius:0 4px 4px 0;white-space:nowrap;}
    @keyframes cr-spin{to{transform:rotate(360deg);}}
    @keyframes cr-fade{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
    @keyframes sw-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
    @keyframes sp-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(3px)}75%{transform:translateX(-3px)}}
    @keyframes slash{0%{opacity:0;transform:rotate(-30deg) scale(.6)}50%{opacity:1;transform:rotate(10deg) scale(1.2)}100%{opacity:0;transform:rotate(40deg) scale(.7)}}
    @keyframes hp-drain{0%{width:80%}100%{width:8%}}
    .sw{animation:sw-bob .65s ease-in-out infinite}
    .sp{animation:sp-shake .45s ease-in-out infinite}
    .sl{animation:slash .75s ease-in-out infinite}
    .cr-fade{animation:cr-fade .3s ease both;}
    .cr-pulse{animation:cr-fade .4s ease both;}
  `}</style>
);

/* ─── Shared UI ──────────────────────────────────────────── */
function Logo() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="4" fill={B.navy}/>
        <path d="M10 26 L18 10 L26 26" stroke={B.gold} strokeWidth="2.2" strokeLinejoin="round" fill="none"/>
        <path d="M13.5 21.5 L22.5 21.5" stroke={B.gold} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <div>
        <div style={{fontFamily:SERIF,fontSize:16,fontWeight:600,color:B.navy,lineHeight:1}}>Summit</div>
        <div style={{fontFamily:SANS,fontSize:10,color:B.muted,letterSpacing:"1.5px",textTransform:"uppercase",marginTop:2}}>CMA Generator</div>
      </div>
    </div>
  );
}

function StepBar({steps,step}) {
  return (
    <div style={{display:"flex",gap:0,marginBottom:"2rem"}}>
      {steps.map((s,i)=>(
        <div key={s} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:"100%",height:3,background:i<=step?B.gold:B.border,transition:"background .3s"}}/>
          <div style={{marginTop:7,fontSize:10,fontWeight:i===step?600:400,color:i<=step?B.navy:B.muted,fontFamily:SANS,textAlign:"center",lineHeight:1.3}}>{s}</div>
        </div>
      ))}
    </div>
  );
}

function SHead({label}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,margin:"1.4rem 0 1rem"}}>
      <div style={{width:3,height:18,background:B.gold,borderRadius:2,flexShrink:0}}/>
      <div style={{fontFamily:SANS,fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"1.2px",color:B.muted}}>{label}</div>
    </div>
  );
}

function Field({label,children,flex}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:5,flex:flex||"1 1 100%"}}>
      <label style={{fontSize:11,fontWeight:600,color:B.muted,textTransform:"uppercase",letterSpacing:"0.8px",fontFamily:SANS}}>{label}</label>
      {children}
    </div>
  );
}

const Inp = ({value,onChange,placeholder,type="text",disabled}) => (
  <input className="cr-input" type={type} value={value}
    onChange={e=>onChange(e.target.value)} placeholder={placeholder}
    disabled={disabled} style={disabled?{background:B.cream,color:B.muted}:{}}/>
);
const Sel = ({value,onChange,options}) => (
  <select className="cr-select" value={value} onChange={e=>onChange(e.target.value)}>
    {options.map(o=><option key={o} value={o}>{o}</option>)}
  </select>
);

function InfoBox({title,children,type="gold"}) {
  const c={gold:{bg:B.goldPale,border:B.gold},blue:{bg:"#EBF1F8",border:"#A0B8D4"},green:{bg:"#EBF5EB",border:"#8FBF8F"}}[type]||{bg:B.goldPale,border:B.gold};
  return (
    <div style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:4,padding:"12px 16px",marginTop:10,marginBottom:4}}>
      {title&&<div style={{fontSize:11,fontWeight:600,color:B.navy,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:4,fontFamily:SANS}}>{title}</div>}
      <div style={{fontSize:12,color:B.textSoft,lineHeight:1.65,fontFamily:SANS}}>{children}</div>
    </div>
  );
}

function ErrBanner({msg}) {
  return msg?<div style={{background:"#FDF2F2",border:"1px solid #E8CCCC",color:"#7A2020",borderRadius:4,padding:"10px 14px",marginBottom:16,fontSize:13,fontFamily:SANS}}>{msg}</div>:null;
}

/* ─── Animated mini-scenes for the loader ───────────────── */
const SCENES = [

  // 1. Flappy bird
  {
    msg: "Flapping through the data pipes — we'll be through in a moment.",
    render: () => (
      <div style={{width:280,height:140,background:"#87CEEB",borderRadius:8,overflow:"hidden",position:"relative",border:`1px solid ${B.border}`}}>
        <style>{`
          @keyframes fb-bird{0%,100%{transform:translateY(0) rotate(-10deg)}50%{transform:translateY(-22px) rotate(15deg)}}
          @keyframes fb-pipe{0%{transform:translateX(0)}100%{transform:translateX(-320px)}}
          @keyframes fb-cloud{0%{transform:translateX(0)}100%{transform:translateX(-340px)}}
          @keyframes fb-bg{0%{transform:translateX(0)}100%{transform:translateX(-140px)}}
        `}</style>
        {/* Ground */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:28,background:"#8B6914",borderTop:"3px solid #5C4A1E"}}/>
        <div style={{position:"absolute",bottom:28,left:0,right:0,height:8,background:"#5DBB63"}}/>
        {/* Clouds */}
        {[40,160,240].map((x,i)=>(
          <div key={i} style={{position:"absolute",top:15+i*12,left:x,width:50,height:18,background:"rgba(255,255,255,0.9)",borderRadius:20,animation:`fb-cloud ${3+i*0.7}s linear infinite`,animationDelay:`${-i*1.1}s`}}/>
        ))}
        {/* Pipes */}
        {[0,1].map(i=>(
          <div key={i} style={{position:"absolute",left:320,top:0,animation:`fb-pipe ${2.2}s linear infinite`,animationDelay:`${-i*1.1}s`}}>
            <div style={{position:"absolute",top:0,left:0,width:40,height:52,background:"#3DA44D",border:"3px solid #2A7A38",borderRadius:"0 0 4px 4px"}}/>
            <div style={{position:"absolute",top:48,left:-4,width:48,height:10,background:"#3DA44D",border:"3px solid #2A7A38",borderRadius:4}}/>
            <div style={{position:"absolute",bottom:28,left:0,width:40,height:40,background:"#3DA44D",border:"3px solid #2A7A38",borderRadius:"4px 4px 0 0"}}/>
            <div style={{position:"absolute",bottom:64,left:-4,width:48,height:10,background:"#3DA44D",border:"3px solid #2A7A38",borderRadius:4}}/>
          </div>
        ))}
        {/* Bird */}
        <div style={{position:"absolute",top:55,left:60,width:28,height:22,animation:"fb-bird .55s ease-in-out infinite"}}>
          <div style={{width:28,height:22,background:"#FFD700",borderRadius:"50% 50% 50% 40%",position:"relative",border:"2px solid #DAA520"}}>
            <div style={{position:"absolute",top:5,right:4,width:7,height:7,background:"white",borderRadius:"50%"}}/>
            <div style={{position:"absolute",top:7,right:5,width:4,height:4,background:"#222",borderRadius:"50%"}}/>
            <div style={{position:"absolute",bottom:6,left:-5,width:10,height:6,background:"#FF8C00",borderRadius:"40% 0 0 40%",transform:"rotate(-10deg)"}}/>
            <div style={{position:"absolute",top:-4,right:2,width:14,height:8,background:"#FF6347",borderRadius:"50%",transformOrigin:"bottom right",animation:"fb-bird .55s ease-in-out infinite"}}/>
          </div>
        </div>
        <div style={{position:"absolute",bottom:6,left:0,right:0,textAlign:"center",fontSize:9,color:"#5C4A1E",fontFamily:"monospace",fontWeight:700,letterSpacing:1}}>FLAPPY DATA</div>
      </div>
    )
  },

  // 2. Flower growing
  {
    msg: "Growing your results from seed — nature takes a moment.",
    render: () => (
      <div style={{width:280,height:140,background:"linear-gradient(180deg,#87CEEB 0%,#87CEEB 65%,#7EC850 65%,#5DBB63 100%)",borderRadius:8,overflow:"hidden",position:"relative",border:`1px solid ${B.border}`}}>
        <style>{`
          @keyframes grow-stem{0%{height:0;opacity:0}100%{height:55px;opacity:1}}
          @keyframes grow-leaf{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}
          @keyframes bloom{0%{transform:scale(0) rotate(-20deg);opacity:0}70%{transform:scale(1.15) rotate(5deg);opacity:1}100%{transform:scale(1) rotate(0deg);opacity:1}}
          @keyframes petal-wave{0%,100%{transform:rotate(0deg)}50%{transform:rotate(8deg)}}
          @keyframes sun-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
          @keyframes float-bee{0%{transform:translate(0,0) rotate(0deg)}25%{transform:translate(18px,-12px) rotate(10deg)}50%{transform:translate(30px,5px) rotate(-5deg)}75%{transform:translate(12px,15px) rotate(8deg)}100%{transform:translate(0,0) rotate(0deg)}}
        `}</style>
        {/* Sun */}
        <div style={{position:"absolute",top:10,right:18,width:32,height:32}}>
          <div style={{position:"absolute",inset:6,background:"#FFD700",borderRadius:"50%",border:"2px solid #DAA520"}}/>
          <div style={{position:"absolute",inset:0,animation:"sun-spin 8s linear infinite"}}>
            {[0,45,90,135,180,225,270,315].map(deg=>(
              <div key={deg} style={{position:"absolute",top:"50%",left:"50%",width:3,height:8,background:"#FFD700",transformOrigin:"0 0",transform:`rotate(${deg}deg) translate(-50%,-130%)`}}/>
            ))}
          </div>
        </div>
        {/* Stem */}
        <div style={{position:"absolute",bottom:22,left:"50%",transform:"translateX(-50%)",width:5,background:"#3A7D1E",borderRadius:3,animationFillMode:"forwards",animation:"grow-stem 1.4s ease-out forwards",transformOrigin:"bottom"}}/>
        {/* Leaves */}
        <div style={{position:"absolute",bottom:52,left:"calc(50% - 22px)",width:20,height:10,background:"#5DBB63",borderRadius:"50% 0 50% 0",animation:"grow-leaf 0.5s 1s ease-out both",transformOrigin:"right"}}/>
        <div style={{position:"absolute",bottom:62,left:"calc(50% + 2px)",width:20,height:10,background:"#5DBB63",borderRadius:"0 50% 0 50%",animation:"grow-leaf 0.5s 1.3s ease-out both",transformOrigin:"left"}}/>
        {/* Flower head */}
        <div style={{position:"absolute",bottom:73,left:"50%",transform:"translateX(-50%)",animation:"bloom 0.8s 1.6s cubic-bezier(.34,1.56,.64,1) both"}}>
          {[0,60,120,180,240,300].map(deg=>(
            <div key={deg} style={{position:"absolute",width:14,height:14,background:"#FF69B4",borderRadius:"50%",top:"50%",left:"50%",transform:`rotate(${deg}deg) translateY(-14px) translate(-50%,-50%)`,animation:"petal-wave 2s ease-in-out infinite",animationDelay:`${deg/360}s`}}/>
          ))}
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:14,height:14,background:"#FFD700",borderRadius:"50%",border:"2px solid #DAA520",zIndex:2}}/>
        </div>
        {/* Bee */}
        <div style={{position:"absolute",bottom:88,left:"38%",animation:"float-bee 3.5s ease-in-out infinite",fontSize:16}}>🐝</div>
        {/* Ground dots */}
        {[-30,-10,10,30,50,70,90,110,130,150,170,190,210,230,250].map(x=>(
          <div key={x} style={{position:"absolute",bottom:18,left:x,width:8,height:8,background:"#4A9A2E",borderRadius:"50%"}}/>
        ))}
      </div>
    )
  },

  // 3. Maze solving
  {
    msg: "Navigating the maze of listing data — almost at the exit.",
    render: () => (
      <div style={{width:280,height:140,background:B.navy,borderRadius:8,overflow:"hidden",position:"relative",border:`1px solid ${B.border}`}}>
        <style>{`
          @keyframes maze-dot{
            0%{left:16px;top:16px}8%{left:16px;top:48px}16%{left:48px;top:48px}24%{left:48px;top:16px}32%{left:80px;top:16px}40%{left:80px;top:80px}48%{left:112px;top:80px}56%{left:112px;top:48px}64%{left:144px;top:48px}72%{left:144px;top:80px}80%{left:176px;top:80px}88%{left:176px;top:48px}100%{left:208px;top:48px}
          }
          @keyframes maze-trail{opacity:0;animation:maze-trail-show .3s forwards}
          @keyframes exit-pulse{0%,100%{box-shadow:0 0 4px #C8A96E}50%{box-shadow:0 0 14px #C8A96E,0 0 24px #C8A96E88}}
        `}</style>
        {/* Maze walls drawn as SVG */}
        <svg style={{position:"absolute",inset:0}} width="280" height="140" viewBox="0 0 280 140">
          <g stroke={B.gold} strokeWidth="2" strokeLinecap="square" fill="none" opacity="0.6">
            {/* Outer border */}
            <rect x="8" y="8" width="220" height="104" rx="2"/>
            {/* Internal walls */}
            <line x1="40" y1="8" x2="40" y2="72"/>
            <line x1="72" y1="40" x2="72" y2="112"/>
            <line x1="104" y1="8" x2="104" y2="56"/>
            <line x1="104" y1="72" x2="104" y2="112"/>
            <line x1="136" y1="24" x2="136" y2="64"/>
            <line x1="136" y1="80" x2="136" y2="112"/>
            <line x1="168" y1="8" x2="168" y2="56"/>
            <line x1="168" y1="72" x2="168" y2="112"/>
            <line x1="8" y1="40" x2="40" y2="40"/>
            <line x1="72" y1="40" x2="104" y2="40"/>
            <line x1="136" y1="24" x2="168" y2="24"/>
            <line x1="40" y1="72" x2="72" y2="72"/>
            <line x1="104" y1="72" x2="136" y2="72"/>
            <line x1="168" y1="56" x2="228" y2="56"/>
            <line x1="8" y1="88" x2="40" y2="88"/>
            <line x1="72" y1="88" x2="136" y2="88"/>
          </g>
          {/* EXIT label */}
          <text x="238" y="52" fill={B.gold} fontSize="8" fontFamily="monospace" fontWeight="bold">EXIT</text>
          <rect x="226" y="40" width="18" height="18" rx="2" fill="none" stroke={B.gold} strokeWidth="1.5" style={{animation:"exit-pulse 1.2s ease-in-out infinite"}}/>
          {/* DATA label */}
          <text x="230" y="90" fill={B.muted} fontSize="7" fontFamily="monospace">fetching</text>
          <text x="232" y="100" fill={B.muted} fontSize="7" fontFamily="monospace">data...</text>
        </svg>
        {/* Moving dot */}
        <div style={{position:"absolute",width:10,height:10,background:B.gold,borderRadius:"50%",boxShadow:`0 0 8px ${B.gold}`,animation:"maze-dot 4s steps(1) infinite",zIndex:2}}/>
      </div>
    )
  },

  // 4. Sketch coming to life
  {
    msg: "Sketching your results into existence — pen still moving.",
    render: () => (
      <div style={{width:280,height:140,background:"#FFFEF7",borderRadius:8,overflow:"hidden",position:"relative",border:"1.5px solid #D4C9A8"}}>
        <style>{`
          @keyframes draw-house{stroke-dashoffset:600;animation:draw-house-kf 3s ease-in-out infinite}
          @keyframes draw-house-kf{0%{stroke-dashoffset:600}70%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}
          @keyframes draw-tree{stroke-dashoffset:200;animation:draw-tree-kf 3s ease-in-out infinite}
          @keyframes draw-tree-kf{0%{stroke-dashoffset:200}30%{stroke-dashoffset:200}80%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}
          @keyframes draw-sun{stroke-dashoffset:150;animation:draw-sun-kf 3s ease-in-out infinite}
          @keyframes draw-sun-kf{0%{stroke-dashoffset:150}55%{stroke-dashoffset:150}90%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}
          @keyframes pen-move{0%{left:30px;top:85px}20%{left:90px;top:85px}25%{left:90px;top:40px}35%{left:140px;top:40px}40%{left:140px;top:85px}50%{left:200px;top:85px}60%{left:170px;top:50px}65%{left:230px;top:20px}80%{left:250px;top:20px}100%{left:250px;top:20px}}
          @keyframes pen-bob{0%,100%{transform:rotate(-30deg)}50%{transform:rotate(-20deg)}}
        `}</style>
        <svg style={{position:"absolute",inset:0}} width="280" height="140" viewBox="0 0 280 140">
          {/* Ruled lines */}
          {[40,60,80,100,120].map(y=>(
            <line key={y} x1="20" y1={y} x2="260" y2={y} stroke="#E8E0C8" strokeWidth="0.8"/>
          ))}
          {/* House */}
          <g stroke="#2A2A2A" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline strokeDasharray="600" style={{animation:"draw-house-kf 3s ease-in-out infinite"}} points="30,90 30,55 70,30 110,55 110,90 30,90"/>
            <polyline strokeDasharray="600" style={{animation:"draw-house-kf 3s ease-in-out infinite",animationDelay:".2s"}} points="50,90 50,68 70,68 70,90"/>
            <polyline strokeDasharray="600" style={{animation:"draw-house-kf 3s ease-in-out infinite",animationDelay:".5s"}} points="80,65 100,65 100,80 80,80 80,65"/>
          </g>
          {/* Tree */}
          <g stroke="#2A2A2A" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="145" y1="90" x2="145" y2="68" strokeDasharray="200" style={{animation:"draw-tree-kf 3s ease-in-out infinite"}}/>
            <circle cx="145" cy="55" r="16" strokeDasharray="200" style={{animation:"draw-tree-kf 3s ease-in-out infinite",animationDelay:".15s"}}/>
          </g>
          {/* Sun */}
          <g stroke="#2A2A2A" strokeWidth="1.5" fill="none">
            <circle cx="220" cy="30" r="12" strokeDasharray="150" style={{animation:"draw-sun-kf 3s ease-in-out infinite"}}/>
            {[0,45,90,135,180,225,270,315].map(a=>(
              <line key={a} strokeDasharray="150" style={{animation:"draw-sun-kf 3s ease-in-out infinite",animationDelay:".2s"}}
                x1={220+16*Math.cos(a*Math.PI/180)} y1={30+16*Math.sin(a*Math.PI/180)}
                x2={220+22*Math.cos(a*Math.PI/180)} y2={30+22*Math.sin(a*Math.PI/180)}/>
            ))}
          </g>
          {/* Ground */}
          <line x1="20" y1="90" x2="260" y2="90" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3"/>
        </svg>
        {/* Pen cursor */}
        <div style={{position:"absolute",fontSize:20,animation:"pen-move 3s ease-in-out infinite",transform:"rotate(-30deg)",pointerEvents:"none",zIndex:3}}>✏️</div>
      </div>
    )
  },

  // 5. Mario-style platformer
  {
    msg: "Running through level 1-1 to grab your listing data. Coins ahead.",
    render: () => (
      <div style={{width:280,height:140,background:"#5C94FC",borderRadius:8,overflow:"hidden",position:"relative",border:`1px solid ${B.border}`}}>
        <style>{`
          @keyframes mario-run{0%,100%{transform:translateY(0)}50%{transform:translateY(-28px)}}
          @keyframes mario-scroll{0%{transform:translateX(0)}100%{transform:translateX(-180px)}}
          @keyframes coin-spin{0%{transform:scaleX(1)}50%{transform:scaleX(0.1)}100%{transform:scaleX(1)}}
          @keyframes coin-float{0%,100%{transform:translateY(0) scaleX(1)}25%{transform:translateY(-8px) scaleX(0.2)}75%{transform:translateY(-4px) scaleX(1)}}
          @keyframes cloud-drift{0%{transform:translateX(0)}100%{transform:translateX(-300px)}}
          @keyframes block-bump{0%,80%,100%{transform:translateY(0)}90%{transform:translateY(-5px)}}
        `}</style>
        {/* Clouds */}
        {[[20,12],[120,20],[200,10]].map(([x,y],i)=>(
          <div key={i} style={{position:"absolute",top:y,left:x,animation:`cloud-drift ${6+i*2}s linear infinite`,animationDelay:`${-i*2}s`}}>
            <div style={{background:"white",borderRadius:20,padding:"4px 12px",display:"flex",gap:4,alignItems:"center"}}>
              <div style={{width:20,height:12,background:"white",borderRadius:"50%",marginTop:-8,boxShadow:"0 -6px 0 6px white"}}/>
              <div style={{width:28,height:14,background:"white",borderRadius:"50%",marginTop:-10,boxShadow:"0 -8px 0 8px white"}}/>
              <div style={{width:16,height:10,background:"white",borderRadius:"50%",marginTop:-6,boxShadow:"0 -5px 0 5px white"}}/>
            </div>
          </div>
        ))}
        {/* Scrolling world */}
        <div style={{position:"absolute",bottom:0,left:0,width:460,animation:"mario-scroll 4s linear infinite"}}>
          {/* Ground */}
          <div style={{position:"absolute",bottom:0,left:0,width:460,height:28,background:"#8B6914",borderTop:"3px solid #5C4A1E"}}/>
          <div style={{position:"absolute",bottom:28,left:0,width:460,height:6,background:"#5DBB63"}}/>
          {/* Platforms */}
          {[[120,55,3],[200,70,4],[300,50,3]].map(([x,h,w],i)=>(
            <div key={i} style={{position:"absolute",bottom:h,left:x,display:"flex"}}>
              {Array(w).fill(0).map((_,j)=>(
                <div key={j} style={{width:26,height:26,background:"#C8A000",border:"2px solid #8B6914",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,animation:i===1?"block-bump 2s ease infinite":"none",animationDelay:`${j*0.1}s`}}>?</div>
              ))}
            </div>
          ))}
          {/* Coins */}
          {[160,186,320,346].map((x,i)=>(
            <div key={i} style={{position:"absolute",bottom:100,left:x,width:16,height:16,background:"#FFD700",borderRadius:"50%",border:"2px solid #DAA520",animation:"coin-float 1s ease-in-out infinite",animationDelay:`${i*0.2}s`}}>
              <div style={{position:"absolute",inset:3,background:"#FFE55C",borderRadius:"50%"}}/>
            </div>
          ))}
          {/* Pipe */}
          <div style={{position:"absolute",bottom:28,left:380}}>
            <div style={{width:44,height:16,background:"#3DA44D",border:"2px solid #2A7A38",borderRadius:"4px 4px 0 0",marginLeft:-2}}/>
            <div style={{width:40,height:36,background:"#3DA44D",border:"2px solid #2A7A38"}}/>
          </div>
        </div>
        {/* Mario (stays in place, world scrolls) */}
        <div style={{position:"absolute",bottom:34,left:48,animation:"mario-run 0.7s ease-in-out infinite"}}>
          <div style={{fontSize:26,lineHeight:1}}>🏃</div>
        </div>
        {/* Score */}
        <div style={{position:"absolute",top:8,right:10,fontFamily:"monospace",fontSize:9,color:"white",fontWeight:"bold",textShadow:"1px 1px 0 #00008B"}}>
          <div>SCORE</div><div>004200</div>
        </div>
      </div>
    )
  },

  // 6. Typewriter / text appearing
  {
    msg: "Typing up your property report one keystroke at a time.",
    render: () => (
      <div style={{width:280,height:140,background:"#1a1a1a",borderRadius:8,overflow:"hidden",position:"relative",border:`1px solid ${B.border}`,fontFamily:"monospace"}}>
        <style>{`
          @keyframes type-line1{0%,5%{width:0}25%,100%{width:220px}}
          @keyframes type-line2{0%,28%{width:0}50%,100%{width:180px}}
          @keyframes type-line3{0%,52%{width:0}72%,100%{width:200px}}
          @keyframes type-line4{0%,74%{width:0}92%,100%{width:140px}}
          @keyframes cursor-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
          @keyframes line-appear{0%{opacity:0}1%{opacity:1}}
        `}</style>
        <div style={{padding:"14px 16px",color:"#33FF33"}}>
          <div style={{fontSize:8,color:"#666",marginBottom:8}}>CMA_GENERATOR v2.4 — FETCHING DATA</div>
          {[
            {text:"> Searching public records...",delay:"0s",dur:"type-line1"},
            {text:"> Found 6 comparable sales",delay:"0s",dur:"type-line2"},
            {text:"> Calculating price/sqft...",delay:"0s",dur:"type-line3"},
            {text:"> Generating report...",delay:"0s",dur:"type-line4"},
          ].map((l,i)=>(
            <div key={i} style={{height:18,overflow:"hidden",marginBottom:2,animation:`line-appear 3s ${i*0.5}s linear infinite`}}>
              <div style={{fontSize:10,whiteSpace:"nowrap",overflow:"hidden",color:i===3?"#FFD700":"#33FF33",width:0,animation:`${l.dur} 3s linear infinite`}}>
                {l.text}
              </div>
            </div>
          ))}
          <div style={{display:"flex",alignItems:"center",marginTop:4}}>
            <span style={{fontSize:10,color:"#33FF33"}}>{">"} </span>
            <div style={{width:7,height:12,background:"#33FF33",marginLeft:4,animation:"cursor-blink .7s step-end infinite"}}/>
          </div>
        </div>
        <div style={{position:"absolute",bottom:8,right:12,fontSize:8,color:"#444"}}>■ PROCESSING</div>
      </div>
    )
  },

  // 7. Fish tank / underwater
  {
    msg: "Diving deep into the database. The fish know where the comps are.",
    render: () => (
      <div style={{width:280,height:140,background:"linear-gradient(180deg,#006994 0%,#004B6B 100%)",borderRadius:8,overflow:"hidden",position:"relative",border:`1px solid ${B.border}`}}>
        <style>{`
          @keyframes fish1{0%{left:-30px;transform:scaleX(1)}50%{left:310px;transform:scaleX(1)}50.1%{left:310px;transform:scaleX(-1)}100%{left:-30px;transform:scaleX(-1)}}
          @keyframes fish2{0%{left:310px;transform:scaleX(-1)}50%{left:-30px;transform:scaleX(-1)}50.1%{left:-30px;transform:scaleX(1)}100%{left:310px;transform:scaleX(1)}}
          @keyframes bubble{0%{transform:translateY(0) translateX(0);opacity:.8}100%{transform:translateY(-120px) translateX(${Math.random()>0.5?10:-10}px);opacity:0}}
          @keyframes seaweed{0%,100%{transform:rotate(-8deg);transform-origin:bottom}50%{transform:rotate(8deg);transform-origin:bottom}}
          @keyframes light-ray{0%,100%{opacity:0.1}50%{opacity:0.25}}
        `}</style>
        {/* Light rays */}
        {[40,100,160,220].map((x,i)=>(
          <div key={i} style={{position:"absolute",top:0,left:x,width:20,height:140,background:"rgba(255,255,255,0.08)",transform:"skewX(-5deg)",animation:`light-ray ${2+i*0.4}s ease-in-out infinite`,animationDelay:`${i*0.5}s`}}/>
        ))}
        {/* Seaweed */}
        {[30,80,180,240].map((x,i)=>(
          <div key={i} style={{position:"absolute",bottom:0,left:x,width:10,height:35+i*5,background:"#2E8B57",borderRadius:"5px 5px 0 0",animation:`seaweed ${1.5+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.2}s`}}/>
        ))}
        {/* Sand bottom */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:22,background:"#C4A35A",borderRadius:"0 0 8px 8px"}}/>
        {/* Bubbles */}
        {[50,120,200,160,90].map((x,i)=>(
          <div key={i} style={{position:"absolute",bottom:25+i*3,left:x,width:6+i%3*2,height:6+i%3*2,border:"1.5px solid rgba(255,255,255,0.6)",borderRadius:"50%",animation:`bubble ${2+i*0.5}s ease-out infinite`,animationDelay:`${i*0.7}s`}}/>
        ))}
        {/* Fish */}
        <div style={{position:"absolute",top:35,fontSize:22,animation:"fish1 5s linear infinite"}}>🐠</div>
        <div style={{position:"absolute",top:70,fontSize:18,animation:"fish2 7s linear infinite",animationDelay:"-2s"}}>🐟</div>
        <div style={{position:"absolute",top:55,fontSize:14,animation:"fish1 9s linear infinite",animationDelay:"-4s"}}>🐡</div>
        {/* Treasure chest */}
        <div style={{position:"absolute",bottom:18,right:30,fontSize:20}}>🗃️</div>
        <div style={{position:"absolute",bottom:5,left:0,right:0,textAlign:"center",fontSize:8,color:"rgba(255,255,255,0.5)",fontFamily:"monospace",letterSpacing:1}}>DEEP DATA DIVE</div>
      </div>
    )
  },

  // 8. Clock / time ticking
  {
    msg: "The market doesn't sleep. Neither does this query.",
    render: () => (
      <div style={{width:280,height:140,background:B.cream,borderRadius:8,overflow:"hidden",position:"relative",border:`1px solid ${B.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}}>
        <style>{`
          @keyframes sec-hand{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
          @keyframes min-hand{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
          @keyframes tick-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
          @keyframes num-pop{0%,100%{color:${B.muted}}50%{color:${B.navy};font-weight:700}}
        `}</style>
        <div style={{position:"relative",width:90,height:90,animation:"tick-pulse 1s step-end infinite"}}>
          {/* Clock face */}
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="42" fill="white" stroke={B.navy} strokeWidth="3"/>
            <circle cx="45" cy="45" r="38" fill="none" stroke={B.border} strokeWidth="1"/>
            {/* Hour markers */}
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>(
              <line key={a}
                x1={45+35*Math.sin(a*Math.PI/180)} y1={45-35*Math.cos(a*Math.PI/180)}
                x2={45+(i%3===0?28:32)*Math.sin(a*Math.PI/180)} y2={45-(i%3===0?28:32)*Math.cos(a*Math.PI/180)}
                stroke={i%3===0?B.navy:B.border} strokeWidth={i%3===0?2.5:1.5} strokeLinecap="round"/>
            ))}
            {/* Hour hand */}
            <line x1="45" y1="45" x2="45" y2="24" stroke={B.navy} strokeWidth="4" strokeLinecap="round"
              style={{transformOrigin:"45px 45px",animation:"min-hand 43s linear infinite"}}/>
            {/* Minute hand */}
            <line x1="45" y1="45" x2="45" y2="17" stroke={B.navyLight} strokeWidth="2.5" strokeLinecap="round"
              style={{transformOrigin:"45px 45px",animation:"sec-hand 7s linear infinite"}}/>
            {/* Second hand */}
            <line x1="45" y1="52" x2="45" y2="13" stroke={B.gold} strokeWidth="1.5" strokeLinecap="round"
              style={{transformOrigin:"45px 45px",animation:"sec-hand 1s linear infinite"}}/>
            <circle cx="45" cy="45" r="3" fill={B.gold}/>
          </svg>
        </div>
        <div style={{fontSize:11,color:B.muted,fontFamily:"monospace",letterSpacing:1,textAlign:"center"}}>
          FETCHING MARKET DATA
        </div>
      </div>
    )
  },

  // 9. Space rocket launch
  {
    msg: "T-minus data retrieval. Rocket fueled with API calls.",
    render: () => (
      <div style={{width:280,height:140,background:"linear-gradient(180deg,#0a0a2a 0%,#1a1a4a 40%,#2a3a6a 70%,#4a6a9a 100%)",borderRadius:8,overflow:"hidden",position:"relative",border:`1px solid ${B.border}`}}>
        <style>{`
          @keyframes rocket-launch{0%{bottom:10px}100%{bottom:160px}}
          @keyframes flame{0%,100%{transform:scaleY(1) scaleX(1)}50%{transform:scaleY(1.3) scaleX(.8)}}
          @keyframes star-twinkle{0%,100%{opacity:1}50%{opacity:.2}}
          @keyframes smoke{0%{transform:translateY(0) scale(1);opacity:.6}100%{transform:translateY(30px) scale(3);opacity:0}}
          @keyframes exhaust{0%{height:20px}50%{height:35px}100%{height:20px}}
        `}</style>
        {/* Stars */}
        {Array(25).fill(0).map((_,i)=>(
          <div key={i} style={{position:"absolute",width:i%5===0?3:2,height:i%5===0?3:2,background:"white",borderRadius:"50%",top:`${(i*37)%90}%`,left:`${(i*61)%100}%`,animation:`star-twinkle ${1+i%3}s ease-in-out infinite`,animationDelay:`${(i*0.3)%2}s`}}/>
        ))}
        {/* Moon */}
        <div style={{position:"absolute",top:12,right:20,width:24,height:24,background:"#FFF9C4",borderRadius:"50%",boxShadow:"inset -6px 2px 0 0 #E8D44D"}}/>
        {/* Ground */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:20,background:"#2a3a2a"}}/>
        {/* Launch pad */}
        <div style={{position:"absolute",bottom:18,left:"45%",transform:"translateX(-50%)",width:40,height:6,background:"#555",borderRadius:2}}/>
        <div style={{position:"absolute",bottom:24,left:"47%",transform:"translateX(-50%)",width:4,height:10,background:"#444"}}/>
        {/* Rocket */}
        <div style={{position:"absolute",left:"calc(50% - 14px)",animation:"rocket-launch 3s ease-in infinite"}}>
          <div style={{width:28,height:50,position:"relative"}}>
            {/* Body */}
            <div style={{position:"absolute",bottom:0,left:4,width:20,height:34,background:"white",borderRadius:"4px 4px 0 0",border:"1.5px solid #ddd"}}/>
            {/* Nose */}
            <div style={{position:"absolute",bottom:30,left:4,width:0,height:0,borderLeft:"10px solid transparent",borderRight:"10px solid transparent",borderBottom:"18px solid #E53935"}}/>
            {/* Window */}
            <div style={{position:"absolute",bottom:18,left:9,width:10,height:10,background:"#5C94FC",borderRadius:"50%",border:"1.5px solid #ddd"}}/>
            {/* Fins */}
            <div style={{position:"absolute",bottom:0,left:-3,width:0,height:0,borderRight:"8px solid #C8A96E",borderTop:"12px solid transparent"}}/>
            <div style={{position:"absolute",bottom:0,right:-3,width:0,height:0,borderLeft:"8px solid #C8A96E",borderTop:"12px solid transparent"}}/>
            {/* Flame */}
            <div style={{position:"absolute",bottom:-16,left:8,width:12,height:20,background:"linear-gradient(#FFD700,#FF4500,transparent)",borderRadius:"0 0 50% 50%",animation:"flame .2s ease-in-out infinite"}}/>
            <div style={{position:"absolute",bottom:-24,left:6,width:16,height:20,background:"linear-gradient(#FF8C00,#FF4500,transparent)",borderRadius:"0 0 50% 50%",opacity:.6,animation:"flame .3s ease-in-out infinite",animationDelay:".1s"}}/>
          </div>
        </div>
        {/* Smoke */}
        {[0,1,2].map(i=>(
          <div key={i} style={{position:"absolute",bottom:22,left:`calc(50% - ${6-i*2}px)`,width:12+i*4,height:12,background:"rgba(200,200,200,0.4)",borderRadius:"50%",animation:`smoke 1.5s ease-out infinite`,animationDelay:`${i*0.3}s`}}/>
        ))}
        <div style={{position:"absolute",bottom:4,left:0,right:0,textAlign:"center",fontSize:8,color:"rgba(255,255,255,0.4)",fontFamily:"monospace",letterSpacing:2}}>DATA LAUNCH SEQUENCE</div>
      </div>
    )
  },

  // 10. Loading bar with personality
  {
    msg: "The progress bar is not lying to you. Probably.",
    render: () => (
      <div style={{width:280,height:140,background:B.navy,borderRadius:8,overflow:"hidden",position:"relative",border:`1px solid ${B.border}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:"0 24px"}}>
        <style>{`
          @keyframes bar-fill{0%{width:0%}20%{width:35%}21%{width:34%}40%{width:60%}41%{width:58%}65%{width:72%}66%{width:71%}80%{width:89%}100%{width:95%}}
          @keyframes bar-shimmer{0%{left:-100%}100%{left:200%}}
          @keyframes status-cycle{0%,19%{opacity:1} 20%,100%{opacity:0}}
          @keyframes blink-dots{0%{content:"."} 33%{content:".."} 66%{content:"..."} 100%{content:"."}}
          @keyframes bar-glow{0%,100%{box-shadow:0 0 6px ${B.gold}44}50%{box-shadow:0 0 18px ${B.gold}88}}
        `}</style>
        <div style={{fontFamily:"monospace",fontSize:11,color:B.gold,letterSpacing:2,textAlign:"center"}}>LOADING DATA</div>
        {/* Bar track */}
        <div style={{width:"100%",height:18,background:"rgba(255,255,255,0.08)",borderRadius:9,overflow:"hidden",border:`1px solid ${B.gold}44`,position:"relative",animation:"bar-glow 2s ease-in-out infinite"}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${B.gold}88,${B.gold},${B.goldLight})`,borderRadius:9,animation:"bar-fill 6s ease-in-out infinite",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,bottom:0,width:"60%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)",animation:"bar-shimmer 1.5s linear infinite"}}/>
          </div>
        </div>
        {/* Status messages that cycle */}
        <div style={{height:16,overflow:"hidden",position:"relative",width:"100%",textAlign:"center"}}>
          {["Pinging the server...","Found the listings!","Calculating...","Running comps...","Almost done!","Still calculating...","Definitely almost done"].map((s,i)=>(
            <div key={i} style={{position:"absolute",inset:0,fontSize:9,color:"rgba(200,169,110,0.7)",fontFamily:"monospace",letterSpacing:.5,display:"flex",alignItems:"center",justifyContent:"center",animation:`status-cycle 6s ${i*(6/7)}s linear infinite`}}>{s}</div>
          ))}
        </div>
      </div>
    )
  },

  // 11. Dog digging
  {
    msg: "Good boy is digging for your comparable sales. He found one!",
    render: () => (
      <div style={{width:280,height:140,background:"linear-gradient(180deg,#87CEEB 0%,#87CEEB 55%,#8B6914 55%,#7A5C0F 100%)",borderRadius:8,overflow:"hidden",position:"relative",border:`1px solid ${B.border}`}}>
        <style>{`
          @keyframes dog-dig{0%,100%{transform:rotate(-5deg) translateY(0)}50%{transform:rotate(5deg) translateY(3px)}}
          @keyframes dirt-fly1{0%{transform:translate(0,0) rotate(0deg);opacity:1}100%{transform:translate(-30px,-40px) rotate(-90deg);opacity:0}}
          @keyframes dirt-fly2{0%{transform:translate(0,0) rotate(0deg);opacity:1}100%{transform:translate(-20px,-55px) rotate(120deg);opacity:0}}
          @keyframes dirt-fly3{0%{transform:translate(0,0) rotate(0deg);opacity:1}100%{transform:translate(-45px,-30px) rotate(-45deg);opacity:0}}
          @keyframes bone-reveal{0%,60%{bottom:-10px;opacity:0}100%{bottom:10px;opacity:1}}
          @keyframes tail-wag{0%,100%{transform:rotate(30deg)}50%{transform:rotate(-20deg)}}
          @keyframes grass-wave{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
        `}</style>
        {/* Grass tufts */}
        {[20,60,200,240].map((x,i)=>(
          <div key={i} style={{position:"absolute",bottom:76,left:x,fontSize:14,animation:`grass-wave ${1+i*0.2}s ease-in-out infinite`,animationDelay:`${i*0.3}s`,transformOrigin:"bottom"}}>🌿</div>
        ))}
        {/* Hole in ground */}
        <div style={{position:"absolute",bottom:55,left:155,width:40,height:18,background:"rgba(0,0,0,0.5)",borderRadius:"50%",border:"2px solid #5C4A1E"}}/>
        {/* Bone appearing */}
        <div style={{position:"absolute",left:162,fontSize:16,animation:"bone-reveal 4s 2s ease-out infinite"}}>🦴</div>
        {/* Dog */}
        <div style={{position:"absolute",bottom:62,left:100,animation:"dog-dig .4s ease-in-out infinite"}}>
          <div style={{fontSize:32,lineHeight:1}}>🐕</div>
        </div>
        {/* Tail (separate for wagging) */}
        <div style={{position:"absolute",bottom:76,left:96,fontSize:14,transformOrigin:"bottom right",animation:"tail-wag .3s ease-in-out infinite"}}>〰</div>
        {/* Dirt flying */}
        {[0,1,2].map(i=>(
          <div key={i} style={{position:"absolute",bottom:70,left:130+i*5,width:8,height:8,background:"#8B6914",borderRadius:"30%",animation:[`dirt-fly1`,`dirt-fly2`,`dirt-fly3`][i]+` .8s ease-out infinite`,animationDelay:`${i*0.15}s`}}/>
        ))}
        {/* Cloud */}
        <div style={{position:"absolute",top:12,left:30,fontSize:22}}>☁️</div>
        <div style={{position:"absolute",top:8,left:160,fontSize:18}}>☁️</div>
        <div style={{position:"absolute",bottom:4,left:0,right:0,textAlign:"center",fontSize:8,color:"rgba(255,255,255,0.5)",fontFamily:"monospace",letterSpacing:1}}>RETRIEVING DATA...</div>
      </div>
    )
  },

  // 12. Pinball machine
  {
    msg: "Your query is bouncing around the database. Multiball activated.",
    render: () => (
      <div style={{width:280,height:140,background:"#0a0a1a",borderRadius:8,overflow:"hidden",position:"relative",border:`1px solid ${B.border}`}}>
        <style>{`
          @keyframes ball1{0%{left:50px;top:20px}15%{left:180px;top:40px}30%{left:220px;top:80px}45%{left:120px;top:100px}60%{left:40px;top:60px}75%{left:100px;top:20px}100%{left:50px;top:20px}}
          @keyframes ball2{0%{left:150px;top:60px}20%{left:240px;top:30px}40%{left:180px;top:100px}60%{left:60px;top:90px}80%{left:90px;top:40px}100%{left:150px;top:60px}}
          @keyframes bumper-flash{0%,100%{background:radial-gradient(circle,#FF6B6B,#CC0000);box-shadow:0 0 8px #FF000066}50%{background:radial-gradient(circle,#FF9999,#FF0000);box-shadow:0 0 20px #FF0000AA}}
          @keyframes flipper-l{0%,100%{transform:rotate(-20deg)}50%{transform:rotate(-45deg)}}
          @keyframes flipper-r{0%,100%{transform:rotate(20deg)}50%{transform:rotate(45deg)}}
          @keyframes score-tick{0%{content:"003200"}33%{content:"005400"}66%{content:"008700"}100%{content:"013500"}}
          @keyframes light-chase{0%,100%{opacity:1}50%{opacity:.2}}
        `}</style>
        {/* Playfield lights border */}
        {Array(14).fill(0).map((_,i)=>(
          <div key={i} style={{position:"absolute",width:6,height:6,borderRadius:"50%",background:["#FF6B6B","#FFD700","#6BFF6B","#6BB3FF"][i%4],top:i<7?2:132,left:i<7?i*38+10:(13-i)*38+10,animation:`light-chase ${0.5+i*0.1}s ease-in-out infinite`,animationDelay:`${i*0.1}s`}}/>
        ))}
        {/* Bumpers */}
        {[[80,35],[160,28],[120,65],[200,55]].map(([x,y],i)=>(
          <div key={i} style={{position:"absolute",left:x,top:y,width:22,height:22,borderRadius:"50%",background:"radial-gradient(circle,#FF6B6B,#CC0000)",boxShadow:"0 0 8px #FF000066",animation:"bumper-flash 1s ease-in-out infinite",animationDelay:`${i*0.25}s`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:"white",fontWeight:"bold",fontFamily:"monospace"}}>
            {100*i+100}
          </div>
        ))}
        {/* Rails */}
        <div style={{position:"absolute",left:20,top:10,width:3,height:110,background:"rgba(200,169,110,0.3)",borderRadius:2}}/>
        <div style={{position:"absolute",right:20,top:10,width:3,height:110,background:"rgba(200,169,110,0.3)",borderRadius:2}}/>
        {/* Flippers */}
        <div style={{position:"absolute",bottom:14,left:38,width:40,height:8,background:B.gold,borderRadius:"4px 0 0 4px",transformOrigin:"left center",animation:"flipper-l .6s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:14,right:38,width:40,height:8,background:B.gold,borderRadius:"0 4px 4px 0",transformOrigin:"right center",animation:"flipper-r .6s ease-in-out infinite",animationDelay:".3s"}}/>
        {/* Balls */}
        <div style={{position:"absolute",width:10,height:10,background:"silver",borderRadius:"50%",boxShadow:"0 0 4px white",animation:"ball1 2s ease-in-out infinite"}}/>
        <div style={{position:"absolute",width:8,height:8,background:"#FFD700",borderRadius:"50%",boxShadow:"0 0 6px #FFD700",animation:"ball2 2.7s ease-in-out infinite",animationDelay:"-1s"}}/>
        {/* Score */}
        <div style={{position:"absolute",top:6,right:30,fontFamily:"monospace",fontSize:9,color:B.gold,letterSpacing:1}}>013500</div>
      </div>
    )
  },

];

function Spinner({msg}) {
  const [scene] = useState(()=>SCENES[Math.floor(Math.random()*SCENES.length)]);
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"2rem 1rem",gap:14}}>
      {scene.render()}
      <p style={{fontSize:13,color:B.textSoft,textAlign:"center",fontFamily:SANS,maxWidth:300,lineHeight:1.65,margin:0}}>
        {msg||scene.msg}
      </p>
    </div>
  );
}

/* ─── Comp Card with address lookup ─────────────────────── */
function CompCard({comp,idx,onChange,onRemove}) {
  const [looking,setLooking] = useState(false);
  const [lookErr,setLookErr] = useState(null);

  const lookupAddr = async () => {
    if (!comp.address.trim()) return;
    setLooking(true); setLookErr(null);
    try {
      const data = await fetchPropertyFromZillow(comp.address.trim());
      if (data.found) {
        if (data.beds) onChange("beds",data.beds);
        if (data.baths) onChange("baths",data.baths);
        if (data.sqft) onChange("sqft",data.sqft);
        if (data.yearBuilt) onChange("yearBuilt",data.yearBuilt);
        if (data.lotSize) onChange("lotSize",data.lotSize);
        if (data.garage) onChange("garage",data.garage);
        onChange("pool",data.pool||false);
        const price = data.listPrice||data.zestimate||"";
        if (price) onChange("salePrice",price);
      } else {
        setLookErr("Not found — enter details manually.");
      }
    } catch(e) { setLookErr("Lookup failed. Enter manually."); }
    finally { setLooking(false); }
  };

  return (
    <div style={{border:`1px solid ${B.border}`,borderRadius:6,padding:"1.1rem 1.2rem",marginBottom:"1rem",background:B.cream}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontFamily:SERIF,fontSize:14,color:B.navy}}>Comparable #{idx+1}</div>
        <button onClick={onRemove} style={{fontSize:11,color:B.muted,background:"none",border:"none",cursor:"pointer",fontFamily:SANS,textTransform:"uppercase"}}>Remove</button>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
        <Field label="Address">
          <div className="mls-row">
            <input className="cr-input" value={comp.address} onChange={e=>onChange("address",e.target.value)}
              placeholder="456 Oak Dr, Provo, UT 84601"
              style={{borderRadius:"4px 0 0 4px",borderRight:"none"}}/>
            <button onClick={lookupAddr} disabled={!comp.address.trim()||looking}
              style={{padding:"8px 12px",border:`1px solid ${B.border}`,borderLeft:"none",borderRadius:"0 4px 4px 0",background:B.navy,color:"#fff",fontSize:11,fontWeight:600,cursor:comp.address.trim()&&!looking?"pointer":"not-allowed",fontFamily:SANS,whiteSpace:"nowrap",opacity:comp.address.trim()&&!looking?1:0.5,transition:"opacity .15s"}}>
              {looking?"…":"Look Up"}
            </button>
          </div>
          {lookErr&&<div style={{fontSize:11,color:"#7A2020",marginTop:3}}>{lookErr}</div>}
        </Field>
        <Field label="Sale Price" flex="0 0 calc(50% - 5px)"><Inp value={comp.salePrice} onChange={v=>onChange("salePrice",v)} placeholder="$485,000"/></Field>
        <Field label="Sale Date" flex="0 0 calc(50% - 5px)"><Inp type="date" value={comp.saleDate} onChange={v=>onChange("saleDate",v)}/></Field>
        <Field label="Beds" flex="0 0 calc(33% - 7px)"><Inp value={comp.beds} onChange={v=>onChange("beds",v)} placeholder="4"/></Field>
        <Field label="Baths" flex="0 0 calc(33% - 7px)"><Inp value={comp.baths} onChange={v=>onChange("baths",v)} placeholder="2.5"/></Field>
        <Field label="Total Sq Ft" flex="0 0 calc(33% - 7px)"><Inp value={comp.sqft} onChange={v=>onChange("sqft",v)} placeholder="2,100"/></Field>
        <Field label="Lot Size (sq ft)" flex="0 0 calc(50% - 5px)"><Inp value={comp.lotSize} onChange={v=>onChange("lotSize",v)} placeholder="7,200"/></Field>
        <Field label="Days on Market" flex="0 0 calc(50% - 5px)"><Inp value={comp.daysOnMarket} onChange={v=>onChange("daysOnMarket",v)} placeholder="18"/></Field>
        <Field label="Condition" flex="0 0 calc(50% - 5px)"><Sel value={comp.condition} onChange={v=>onChange("condition",v)} options={CONDITIONS}/></Field>
        <Field label="Garage" flex="0 0 calc(50% - 5px)"><Inp value={comp.garage} onChange={v=>onChange("garage",v)} placeholder="2-car attached"/></Field>
        <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:6}}>
          <input type="checkbox" checked={comp.pool} onChange={e=>onChange("pool",e.target.checked)} id={`p${idx}`} style={{accentColor:B.gold,width:15,height:15}}/>
          <label htmlFor={`p${idx}`} style={{fontSize:13,color:B.textSoft,fontFamily:SANS}}>Pool</label>
        </div>
      </div>
    </div>
  );
}

/* ─── Subject property form ──────────────────────────────── */
function SubjectForm({sub,upd,showAgent=true}) {
  const [lotUnit,setLotUnit] = useState(
    sub.lotUnit||"sqft"
  );
  const switchUnit = (u) => {
    setLotUnit(u);
    upd("lotUnit",u);
    if (!sub.lotSize) return;
    const val = parseFloat(String(sub.lotSize).replace(/[^0-9.]/g,""));
    if (!val) return;
    if (u==="acres") upd("lotSize",(val/43560).toFixed(3));
    else upd("lotSize",Math.round(val*43560).toString());
  };
  return (
    <>
      <SHead label="Property Details"/>
      <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
        <Field label="Street Address"><Inp value={sub.address} onChange={v=>upd("address",v)} placeholder="742 Mountainview Blvd"/></Field>
        <Field label="City" flex="0 0 calc(50% - 5px)"><Inp value={sub.city} onChange={v=>upd("city",v)} placeholder="American Fork"/></Field>
        <Field label="State" flex="0 0 calc(25% - 8px)"><Inp value={sub.state} onChange={v=>upd("state",v)} placeholder="UT"/></Field>
        <Field label="ZIP" flex="0 0 calc(25% - 8px)"><Inp value={sub.zip} onChange={v=>upd("zip",v)} placeholder="84003"/></Field>
        <Field label="Beds" flex="0 0 calc(25% - 8px)"><Inp value={sub.beds} onChange={v=>upd("beds",v)} placeholder="4"/></Field>
        <Field label="Baths" flex="0 0 calc(25% - 8px)"><Inp value={sub.baths} onChange={v=>upd("baths",v)} placeholder="2.5"/></Field>
        <Field label="Total Sq Ft" flex="0 0 calc(25% - 8px)"><Inp value={sub.sqft} onChange={v=>upd("sqft",v)} placeholder="2,200"/></Field>
        <Field label="Year Built" flex="0 0 calc(25% - 8px)"><Inp value={sub.yearBuilt} onChange={v=>upd("yearBuilt",v)} placeholder="2003"/></Field>

        {/* Lot size with unit toggle */}
        <div style={{display:"flex",flexDirection:"column",gap:5,flex:"0 0 calc(50% - 5px)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <label style={{fontSize:11,fontWeight:600,color:B.muted,textTransform:"uppercase",letterSpacing:"0.8px",fontFamily:SANS}}>
              Lot Size
            </label>
            <div style={{display:"flex",border:`1px solid ${B.border}`,borderRadius:4,overflow:"hidden",height:22}}>
              {["sqft","acres"].map(u=>(
                <button key={u} onClick={()=>switchUnit(u)} style={{
                  padding:"0 8px",fontSize:10,fontWeight:600,letterSpacing:".3px",
                  border:"none",cursor:"pointer",fontFamily:SANS,
                  background:(lotUnit||"sqft")===u?B.navy:"transparent",
                  color:(lotUnit||"sqft")===u?"#fff":B.muted,
                  transition:"all .15s"
                }}>{u==="sqft"?"Sq Ft":"Acres"}</button>
              ))}
            </div>
          </div>
          <Inp value={sub.lotSize} onChange={v=>upd("lotSize",v)}
            placeholder={(lotUnit||"sqft")==="sqft"?"8,400":"0.21"}/>
        </div>

        <Field label="Garage" flex="0 0 calc(50% - 5px)"><Inp value={sub.garage} onChange={v=>upd("garage",v)} placeholder="2-car attached"/></Field>
        <Field label="Condition" flex="0 0 calc(50% - 5px)"><Sel value={sub.condition} onChange={v=>upd("condition",v)} options={CONDITIONS}/></Field>
        <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:18}}>
          <input type="checkbox" checked={sub.pool} onChange={e=>upd("pool",e.target.checked)} id="sp" style={{accentColor:B.gold,width:15,height:15}}/>
          <label htmlFor="sp" style={{fontSize:13,color:B.textSoft}}>Pool</label>
        </div>
      </div>
      {showAgent&&<>
        <SHead label="Agent Information"/>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          <Field label="Agent Name" flex="0 0 calc(50% - 5px)"><Inp value={sub.agentName} onChange={v=>upd("agentName",v)} placeholder="Bruce Tucker"/></Field>
          <Field label="Brokerage" flex="0 0 calc(50% - 5px)"><Inp value={sub.brokerageName} onChange={v=>upd("brokerageName",v)} placeholder="Berkshire Hathaway HomeServices Elite Real Estate"/></Field>
          <Field label="Email" flex="0 0 calc(50% - 5px)"><Inp value={sub.agentEmail} onChange={v=>upd("agentEmail",v)} placeholder="agent@bhhs.com"/></Field>
          <Field label="Phone" flex="0 0 calc(50% - 5px)"><Inp value={sub.agentPhone} onChange={v=>upd("agentPhone",v)} placeholder="(801) 555-0100"/></Field>
        </div>
      </>}
    </>
  );
}

/* ─── Pricing summary cards ──────────────────────────────── */
function PricingCards({comps}) {
  const prices = comps.map(c=>parseFloat(String(c.salePrice).replace(/[^0-9.]/g,""))).filter(Boolean);
  if (!prices.length) return null;
  const mid = prices.reduce((a,b)=>a+b,0)/prices.length;
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const f = n=>n.toLocaleString("en-US",{maximumFractionDigits:0});
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
      {[{label:"Low of Range",val:`$${f(low*.95)}`},{label:"Recommended",val:`$${f(mid)}`,gold:true},{label:"High of Range",val:`$${f(high*1.05)}`}].map(s=>(
        <div key={s.label} style={{background:s.gold?B.navy:B.cream,border:s.gold?"none":`1px solid ${B.border}`,borderRadius:5,padding:"14px 12px",textAlign:"center"}}>
          <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"1px",color:s.gold?B.gold:B.muted,marginBottom:5}}>{s.label}</div>
          <div style={{fontFamily:SERIF,fontSize:17,color:s.gold?"#fff":B.navy}}>{s.val}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Parse JSON safely ──────────────────────────────────── */
function parseJSON(text) {
  const clean = (text||"").replace(/```json|```/g,"").trim();
  const match = clean.match(/\{[\s\S]*\}/);
  if (match) { try { return JSON.parse(match[0]); } catch(e) {} }
  try { return JSON.parse(clean); } catch(e) {}
  return null;
}

/* ─── Fetch property from listing URL or address ─────────── */
async function fetchPropertyFromZillow(addressOrUrl) {
  const isUrl = addressOrUrl.startsWith("http");
  const prompt = isUrl
    ? `Fetch this exact listing URL and extract all property details: ${addressOrUrl}

Return ONLY valid JSON:
{"address":"street only","city":"","state":"UT","zip":"","beds":"","baths":"","sqft":"livable sqft number string","yearBuilt":"","lotSize":"sqft string","garage":"","pool":false,"condition":"Good","zestimate":"number string","listPrice":"number string or empty","zillowUrl":"${addressOrUrl}","found":true,"note":""}`
    : `Search for this exact property and fetch its listing page: "${addressOrUrl}"

CRITICAL: Find the listing for EXACTLY this address — not a nearby property, not a neighbor.
Search: site:zillow.com "${addressOrUrl}" OR site:redfin.com "${addressOrUrl}"
Then fetch the matching page.

Return ONLY valid JSON:
{"address":"street only","city":"","state":"UT","zip":"","beds":"","baths":"","sqft":"livable sqft number string","yearBuilt":"","lotSize":"sqft convert acres to sqft","garage":"","pool":false,"condition":"Good","zestimate":"number string no commas","listPrice":"active price string or empty","zillowUrl":"url used","found":true or false,"note":"listing status"}`;

  const res = await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,
      tools:[{type:"web_search_20250305",name:"web_search"}],
      messages:[{role:"user",content:prompt}]})
  });
  const data = await res.json();
  const text = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");
  return parseJSON(text)||{found:false,note:"Could not find property."};
}

/* ─── Quick CMA: fetch subject + search comps ────────────── */
async function runQuickCMA(addressOrUrl) {
  const subjectData = await fetchPropertyFromZillow(addressOrUrl);
  if (!subjectData.found) throw new Error(subjectData.note||"Property not found. Try pasting the direct listing URL.");

  const city  = subjectData.city||"Utah";
  const beds  = subjectData.beds||"3";
  const baths = subjectData.baths||"2";
  const sqft  = subjectData.sqft||"2000";
  const zest  = subjectData.zestimate?`$${Number(subjectData.zestimate).toLocaleString()}`:"unknown";
  const today = new Date().toISOString().slice(0,10);
  const yearAgo = new Date(Date.now()-365*24*60*60*1000).toISOString().slice(0,10);

  const compsPrompt = `Today is ${today}. Find homes SOLD in ${city}, UT between ${yearAgo} and ${today}.

Subject: ${subjectData.address}, ${city}, UT — ${beds}bd/${baths}ba, ${sqft} sqft, estimated value ${zest}.

Search Redfin and public records for recently sold comparable homes. Only use 2024-2025 prices — do NOT use sales from 2021-2022.

Return ONLY valid JSON:
{"comps":[{"address":"full address city UT zip","salePrice":"sold price number string no commas","saleDate":"YYYY-MM-DD within last 12 months","beds":"","baths":"","sqft":"livable sqft string","lotSize":"sqft string","garage":"","pool":false,"condition":"Average","daysOnMarket":""}],"marketSummary":"2-3 sentences on ${city} UT market as of ${today}","confidence":"medium","confidenceNote":""}

Rules: 4-6 comps, size within 40% of ${sqft} sqft, dates between ${yearAgo} and ${today}, anchor pricing context to zestimate of ${zest}`;

  const compsRes = await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:4000,
      tools:[{type:"web_search_20250305",name:"web_search"}],
      messages:[{role:"user",content:compsPrompt}]})
  });
  const compsData = await compsRes.json();
  const compsText = (compsData.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");
  const compsResult = parseJSON(compsText)||{};

  return {subject:subjectData,comps:compsResult.comps||[],marketSummary:compsResult.marketSummary||"",confidence:compsResult.confidence||"medium",confidenceNote:compsResult.confidenceNote||""};
}

/* ─── AI Narrative (shared for both modes) ───────────────── */
async function runNarrative(sub, comps, marketSummary, notes, isAiComps) {
  const prices = comps.map(c=>parseFloat(String(c.salePrice).replace(/[^0-9.]/g,""))).filter(Boolean);
  const sqfts  = comps.map(c=>parseFloat(String(c.sqft).replace(/[^0-9.]/g,""))).filter(Boolean);
  const doms   = comps.map(c=>parseFloat(c.daysOnMarket)).filter(Boolean);
  const mid    = prices.length?prices.reduce((a,b)=>a+b,0)/prices.length:0;
  const low    = prices.length?Math.min(...prices):0;
  const high   = prices.length?Math.max(...prices):0;
  const avgPsf = prices.length&&sqfts.length?prices.reduce((a,b)=>a+b,0)/sqfts.reduce((a,b)=>a+b,0):0;
  const avgDom = doms.length?(doms.reduce((a,b)=>a+b,0)/doms.length).toFixed(0):"N/A";
  const f = n=>n.toLocaleString("en-US",{maximumFractionDigits:0});

  const hasEstimatedPrices = isAiComps && comps.some(c=>c._priceNote&&!c._priceConfirmed);

  const prompt = `You are a licensed real estate appraiser writing a professional CMA narrative.
${isAiComps?`NOTE: Comparable data was sourced from public listing records. Utah is a non-disclosure state — some comp prices are list prices or estimates rather than confirmed sold prices. Acknowledge this clearly where relevant.`:""}

SUBJECT: ${sub.address}, ${sub.city}, ${sub.state} ${sub.zip}
${sub.beds}bd/${sub.baths}ba | ${sub.sqft} sqft | Lot: ${sub.lotSize} sqft | Built: ${sub.yearBuilt}
Condition: ${sub.condition} | Garage: ${sub.garage} | Pool: ${sub.pool?"Yes":"No"}
Agent: ${sub.agentName||"N/A"} | Brokerage: ${sub.brokerageName||"N/A"}

${marketSummary?`MARKET CONTEXT: ${marketSummary}`:""}

COMPARABLE SALES (${comps.length}):
${comps.map((c,i)=>`Comp ${i+1}: ${c.address} | $${c.salePrice} (${c._priceNote||"price"}) | ${c.beds}bd/${c.baths}ba | ${c.sqft} sqft | Sold: ${c.saleDate||"recent"} | ${c.daysOnMarket||"N/A"} DOM | ${c.condition}`).join("\n")}

STATS: Avg $${f(mid)} | Avg $/sqft $${avgPsf.toFixed(0)} | Avg DOM ${avgDom}
${hasEstimatedPrices?"PRICE NOTE: Some comp prices are list prices or estimates due to Utah's non-disclosure law. Weight confirmed prices more heavily in your analysis.":""}
${notes?`AGENT NOTES: ${notes}`:""}

Write a full CMA narrative:

=== PROPERTY OVERVIEW ===
=== COMPARABLE ANALYSIS ===
=== PRICE PER SQUARE FOOT ANALYSIS ===
=== MARKET CONDITIONS ===
=== VALUE ADJUSTMENTS ===
=== RECOMMENDED LIST PRICE & RATIONALE ===
Recommended: $${f(mid)} | Range: $${f(low*.95)} to $${f(high*1.05)}
=== PUBLIC RECORD & AVM CONTEXT ===
Estimated AVM range based on comps and market data: [realistic range] | Note: AI-approximated, not live data.
=== AGENT STRATEGY NOTES ===
${isAiComps?`=== DATA DISCLAIMER ===\nComps sourced from public listing data. Utah non-disclosure state — sold prices may not be confirmed. Verify all comp prices against WFRMLS before formal client presentation.`:""}

Be specific. Use dollar amounts. Professional but readable.`;

  const res = await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:3000,messages:[{role:"user",content:prompt}]})
  });
  const data = await res.json();
  return data.content?.map(b=>b.text||"").join("")||"";
}

/* ─── MLS Lookup ─────────────────────────────────────────── */
async function fetchMLS(mlsNum) {
  const prompt = `Search for MLS listing #${mlsNum} in Utah on real estate sites (Redfin, Realtor.com, public records).
Find the exact listing and extract property details.
Return ONLY valid JSON: {"address":"street only","city":"","state":"UT","zip":"","beds":"","baths":"","sqft":"sqft string","yearBuilt":"","lotSize":"sqft string","garage":"","pool":false,"condition":"Good","listPrice":"price string","found":true or false,"source":"site used","note":""}`;

  const res = await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,
      tools:[{type:"web_search_20250305",name:"web_search"}],
      messages:[{role:"user",content:prompt}]})
  });
  const data = await res.json();
  const text = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");
  return parseJSON(text)||{found:false,note:"Could not parse results."};
}

/* ─── PDF Builder ────────────────────────────────────────── */
function buildHTML(sub,comps,report,isAiComps) {
  const vc=comps.filter(c=>c.address&&c.salePrice);
  const prices=vc.map(c=>parseFloat(String(c.salePrice).replace(/[^0-9.]/g,""))).filter(Boolean);
  const sqfts=vc.map(c=>parseFloat(String(c.sqft).replace(/[^0-9.]/g,""))).filter(Boolean);
  const doms=vc.map(c=>parseFloat(c.daysOnMarket)).filter(Boolean);
  const low=prices.length?Math.min(...prices):0;
  const high=prices.length?Math.max(...prices):0;
  const mid=prices.length?prices.reduce((a,b)=>a+b,0)/prices.length:0;
  const avgpsf=prices.length&&sqfts.length?prices.reduce((a,b)=>a+b,0)/sqfts.reduce((a,b)=>a+b,0):0;
  const avgdom=doms.length?(doms.reduce((a,b)=>a+b,0)/doms.length).toFixed(0):"N/A";
  const f=n=>n.toLocaleString("en-US",{maximumFractionDigits:0});
  const today=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>CMA — ${sub.address||"Property"}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600&family=Source+Sans+3:wght@300;400;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Source Sans 3',Arial,sans-serif;color:#1B2B3A;background:#fff;font-size:10.5pt;line-height:1.65;}
.cover{background:#1B2B3A;color:#fff;min-height:100vh;padding:1.6in 1in .7in;display:flex;flex-direction:column;justify-content:flex-end;page-break-after:always;}
.eyebrow{font-size:8pt;letter-spacing:2.5px;text-transform:uppercase;color:#C8A96E;margin-bottom:.22in;}
.badge{display:inline-block;padding:3px 12px;border-radius:20px;font-size:7.5pt;font-weight:600;letter-spacing:1px;text-transform:uppercase;background:rgba(200,169,110,.2);color:#C8A96E;border:1px solid rgba(200,169,110,.3);margin-bottom:.12in;}
h1{font-family:'Playfair Display',Georgia,serif;font-size:28pt;font-weight:600;line-height:1.15;margin-bottom:.1in;}
.cover-sub{font-size:12pt;font-weight:300;color:rgba(255,255,255,.6);margin-bottom:.3in;}
.cover-stats{display:flex;gap:.4in;margin-bottom:.35in;}
.csl{font-size:7.5pt;letter-spacing:1.5px;text-transform:uppercase;color:#C8A96E;display:block;margin-bottom:3px;}
.csv{font-size:19pt;font-weight:600;}
.cover hr{border:none;border-top:1px solid rgba(200,169,110,.35);margin-bottom:.18in;}
.cover-meta{font-size:8pt;color:rgba(255,255,255,.45);padding-bottom:.15in;}
.page{padding:.65in 1in;page-break-after:always;}
.page:last-child{page-break-after:auto;}
h2{font-family:'Playfair Display',Georgia,serif;font-size:19pt;color:#1B2B3A;margin-bottom:.14in;padding-bottom:7px;border-bottom:2px solid #C8A96E;}
h3{font-size:8pt;font-weight:600;text-transform:uppercase;letter-spacing:1.2px;color:#8A8378;margin:.18in 0 .07in;}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.13in;margin:.13in 0;}
.sc{background:#FAF8F4;border:1px solid #D9D3C8;border-radius:5px;padding:.13in;}
.sc .l{font-size:7.5pt;color:#8A8378;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;}
.sc .v{font-family:'Playfair Display',Georgia,serif;font-size:15pt;color:#1B2B3A;}
.rg{display:grid;grid-template-columns:1fr 1fr 1.5fr;gap:.13in;margin:.18in 0;}
.rc{background:#F2EFE9;border:1px solid #D9D3C8;border-radius:5px;padding:.16in;text-align:center;}
.rc .l{font-size:7pt;color:#8A8378;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;}
.rc .v{font-family:'Playfair Display',Georgia,serif;font-size:15pt;color:#1B2B3A;}
.rc .n{font-size:7pt;color:#8A8378;margin-top:4px;}
.rb{background:#1B2B3A;color:#fff;border-radius:6px;padding:.28in;text-align:center;}
.rb .l{font-size:8pt;letter-spacing:2px;text-transform:uppercase;color:#C8A96E;margin-bottom:5px;}
.rb .v{font-family:'Playfair Display',Georgia,serif;font-size:28pt;font-weight:600;line-height:1;}
.rb .n{font-size:8pt;color:rgba(255,255,255,.5);margin-top:5px;}
table{width:100%;border-collapse:collapse;font-size:9pt;margin:.08in 0;}
th{background:#1B2B3A;color:#C8A96E;padding:7px 10px;text-align:left;font-size:8pt;letter-spacing:.8px;text-transform:uppercase;font-weight:600;}
td{padding:7px 10px;border-bottom:1px solid #E8E4DC;vertical-align:top;}
tr:nth-child(even) td{background:#FAF8F4;}
.hb{background:#F5EDD9;border-left:3px solid #C8A96E;padding:.11in .14in;margin:.13in 0;border-radius:0 4px 4px 0;font-size:9.5pt;}
.disc{background:#F8F6F2;border:1px solid #E0D9CE;border-radius:4px;padding:.1in .13in;margin:.12in 0;font-size:8pt;color:#8A8378;font-style:italic;}
.footer{text-align:center;font-size:7.5pt;color:#B0A89E;border-top:1px solid #E8E4DC;padding-top:.1in;margin-top:.25in;}
pre{white-space:pre-wrap;font-family:'Source Sans 3',Arial,sans-serif;font-size:9.5pt;line-height:1.7;}
@media print{body{print-color-adjust:exact;-webkit-print-color-adjust:exact;}}
</style></head><body>
<div class="cover">
<div>
${isAiComps?'<div class="badge">AI-Sourced Comparables</div>':''}
<div class="eyebrow">Comparative Market Analysis</div>
<h1>${sub.address||"Subject Property"}</h1>
<div class="cover-sub">${[sub.city,sub.state,sub.zip].filter(Boolean).join(", ")||"Property Location"}</div>
<div class="cover-stats">
${sub.beds?`<div><span class="csl">Beds</span><span class="csv">${sub.beds}</span></div>`:""}
${sub.baths?`<div><span class="csl">Baths</span><span class="csv">${sub.baths}</span></div>`:""}
${sub.sqft?`<div><span class="csl">Sq Ft</span><span class="csv">${Number(sub.sqft).toLocaleString()}</span></div>`:""}
${sub.yearBuilt?`<div><span class="csl">Built</span><span class="csv">${sub.yearBuilt}</span></div>`:""}
</div>
<hr>
<div class="cover-meta">Prepared by ${sub.agentName||"Agent"} | ${sub.brokerageName||"Brokerage"}<br>${sub.agentEmail||""}${sub.agentPhone?" | "+sub.agentPhone:""}<br>${today} | ${isAiComps?"AI-researched comparables":vc.length+" comparable sales"}</div>
</div></div>
<div class="page">
<h2>Pricing Summary</h2>
${prices.length?`<div class="rg">
<div class="rc"><div class="l">Low of Range</div><div class="v">$${f(low*.95)}</div><div class="n">5% below low comp</div></div>
<div class="rc"><div class="l">High of Range</div><div class="v">$${f(high*1.05)}</div><div class="n">5% above high comp</div></div>
<div class="rb"><div class="l">Recommended List Price</div><div class="v">$${f(mid)}</div><div class="n">${vc.length} comps | ${avgdom} avg DOM</div></div>
</div>
<div class="hb">The recommended list price reflects comparable market data, condition and feature adjustments, and current absorption trends.</div>
<h3>Key Indicators</h3>
<div class="g3">
<div class="sc"><div class="l">Avg Sale Price</div><div class="v">$${f(mid)}</div></div>
<div class="sc"><div class="l">Avg $/Sq Ft</div><div class="v">${avgpsf?"$"+avgpsf.toFixed(0):"N/A"}</div></div>
<div class="sc"><div class="l">Avg Days on Market</div><div class="v">${avgdom}</div></div>
</div>`:"<p>Pricing data included in the analysis below.</p>"}
${isAiComps?'<div class="disc">AI Comparables CMA: Comparable data was researched from public sources. Verify key figures against live MLS records before formal client presentation.</div>':""}
${vc.length>0?`<h2 style="margin-top:.32in;">Comparable Sales</h2>
<table><thead><tr><th>Address</th><th>Sale Price</th><th>Total Sq Ft</th><th>$/Sq Ft</th><th>Bd/Ba</th><th>DOM</th><th>Condition</th></tr></thead><tbody>
${vc.map(c=>{const sp=parseFloat(String(c.salePrice).replace(/[^0-9.]/g,""))||0;const sf=parseFloat(String(c.sqft).replace(/[^0-9.]/g,""))||1;return`<tr><td>${c.address}</td><td>$${sp.toLocaleString("en-US",{maximumFractionDigits:0})}</td><td>${sf.toLocaleString()}</td><td>$${(sp/sf).toFixed(0)}</td><td>${c.beds}/${c.baths}</td><td>${c.daysOnMarket||"N/A"}</td><td>${c.condition}</td></tr>`;}).join("")}
</tbody></table>`:""}
</div>
<div class="page">
<h2>Market Analysis</h2>
<pre>${report||"Analysis not generated."}</pre>
<div class="footer">Prepared by ${sub.agentName||"your agent"} at ${sub.brokerageName||"your brokerage"} | AI-assisted CMA. ${isAiComps?"Comparable data AI-researched from public records — verify against MLS before client presentation. ":""}Not a formal appraisal. &copy; ${new Date().getFullYear()}</div>
</div>
</body></html>`;
}

/* ─── Parse MLS comps from uploaded PDF ─────────────────── */
async function parsePDFComps(base64Data) {
  const prompt = `This is a UtahRealEstate.com MLS Agent Full Report PDF. It contains multiple property listings. Each listing starts with "MLS#" followed by a number.

Extract EVERY listing. Do not skip any. This PDF format has these exact fields — read them carefully for each listing:

- MLS#: the number after "MLS#" at the top of each listing
- Sold Price: the dollar amount after "Sold Price:"
- Original List Price: dollar amount after "Original List Price:"
- DOM: number after "DOM:"
- Sold Date: date after "Sold Date:"
- Address: street address after "Address:"
- City line: contains city, state, zip e.g. "American Fork, UT 84003"
- Total Sq Ft: the "Tot" row in the square footage table — use the first number (total sqft)
- Beds: from the "Tot" row, the Bed Rms column
- Baths: from the "Tot" row — add Full (F) + Three-Quarter (T) baths, ignore Half (H)
- Year Built: after "Year Built:"
- Acres: after "Acres:" — convert to sqft by multiplying by 43560
- Garage: the number after "Garage:" (number of stalls)
- Pool?: "Yes" or "No" after "Pool?:"
- Style: after "Style:"
- Type: after "Type:"
- Concessions: dollar amount after "Concessions:"
- Sold Terms: after "Sold Terms:"

Return ONLY valid JSON with no markdown or explanation:
{
  "comps": [
    {
      "mlsNum": "MLS number as string",
      "address": "street address only e.g. 1031 S 950 W",
      "city": "city name only e.g. American Fork",
      "state": "UT",
      "zip": "zip code e.g. 84003",
      "salePrice": "sold price digits only no commas no dollar sign e.g. 775000",
      "listPrice": "original list price digits only no commas e.g. 799999",
      "saleDate": "YYYY-MM-DD",
      "beds": "total beds as string e.g. 5",
      "baths": "full + three-quarter baths as decimal e.g. 2 or 3.5",
      "sqft": "total sqft from Tot row no commas e.g. 3550",
      "lotSize": "acres converted to sqft rounded to nearest whole number e.g. 9148",
      "garage": "garage stalls as text e.g. 3-car",
      "pool": false,
      "daysOnMarket": "DOM as string e.g. 75",
      "yearBuilt": "year as string e.g. 2022",
      "condition": "Average",
      "style": "e.g. 2-Story",
      "concessions": "concession amount digits only e.g. 5000",
      "soldTerms": "e.g. Conventional"
    }
  ],
  "count": total number of listings extracted
}

IMPORTANT: Extract ALL listings. If this PDF has 5 listings, return 5 comps. If it has 10, return 10. Do not stop early.`;

  const res = await fetch("/api/claude", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-sonnet-4-20250514", max_tokens:6000,
      messages:[{
        role:"user",
        content:[
          {type:"document",source:{type:"base64",media_type:"application/pdf",data:base64Data}},
          {type:"text",text:prompt}
        ]
      }]
    })
  });
  const data = await res.json();
  const text = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");
  return parseJSON(text)||{comps:[],count:0};
}

/* ─── Main App ───────────────────────────────────────────── */
export default function App() {
  const [mode,setMode]   = useState("agent"); // always Full CMA

  // Full CMA mode state
  const [agStep,setAgS]  = useState(0); // 0=lookup, 1=subject, 2=comps, 3=notes, 4=report
  const [agSub,setAgSub] = useState(emptySub);
  const [agComps,setAgComps] = useState([emptyComp(),emptyComp(),emptyComp()]);
  const [agNotes,setAgNotes] = useState("");
  const [agLoading,setAgL]   = useState(false);
  const [agLoadMsg,setAgLM]  = useState("");
  const [agReport,setAgR]    = useState(null);
  const [agErr,setAgErr]     = useState(null);
  const [mlsNum,setMlsNum]   = useState("");
  const [mlsSt,setMlsSt]     = useState(null);
  const [mlsNote,setMlsNote] = useState("");
  const [mlsLd,setMlsLd]     = useState(false);
  const [pdfParsing,setPdfParsing] = useState(false);
  const [pdfErr,setPdfErr]   = useState(null);

  const [dlLoad,setDlLoad]   = useState(false);

  const updAgSub = (k,v) => setAgSub(p=>({...p,[k]:v}));
  const updAgComp = (i,k,v) => setAgComps(p=>p.map((c,x)=>x===i?{...c,[k]:v}:c));
  const agVc = agComps.filter(c=>c.address&&c.salePrice);

  const resetAg = () => { setAgS(0);setAgSub(emptySub);setAgComps([emptyComp(),emptyComp(),emptyComp()]);setAgNotes("");setAgR(null);setAgErr(null);setMlsNum("");setMlsSt(null); };

  /* Full CMA: MLS lookup */
  const doMlsLookup = async () => {
    setMlsLd(true); setMlsSt(null); setAgErr(null);
    try {
      const data = await fetchMLS(mlsNum.trim());
      if (data.found) {
        setAgSub(p=>({...p,address:data.address||p.address,city:data.city||p.city,state:"UT",zip:data.zip||p.zip,beds:data.beds||p.beds,baths:data.baths||p.baths,sqft:data.sqft||p.sqft,yearBuilt:data.yearBuilt||p.yearBuilt,lotSize:data.lotSize||p.lotSize,garage:data.garage||p.garage,pool:data.pool??p.pool,condition:data.condition||p.condition}));
        setMlsSt("found"); setMlsNote((data.source?"Found on "+data.source+". ":"")+(data.note||""));
      } else { setMlsSt("not_found"); setMlsNote(data.note||"Listing not found."); }
    } catch(e) { setMlsSt("not_found"); setMlsNote("Search error: "+e.message); }
    finally { setMlsLd(false); }
  };

  /* Agent Comps: generate report */
  const doAgReport = async () => {
    setAgL(true); setAgErr(null);
    setAgLM("Running AI market analysis — Galgotha doesn't stand a chance…");
    try {
      const report = await runNarrative(agSub, agVc, "", agNotes, false);
      setAgR(report); setAgS(4);
    } catch(e) { setAgErr("Analysis failed. Try again."); }
    finally { setAgL(false); }
  };

  const download = (sub,comps,report,isAi) => {
    setDlLoad(true);
    try {
      const html = buildHTML(sub,comps,report,isAi);
      const blob = new Blob([html],{type:"text/html"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href=url; a.download=`CMA_${(sub.address||"Report").replace(/\s+/g,"_")}_${new Date().toISOString().slice(0,10)}.html`;
      a.click(); URL.revokeObjectURL(url);
    } finally { setDlLoad(false); }
  };

  const confColor=c=>c==="high"?"#EBF5EB":c==="medium"?B.goldPale:"#FDF2F2";
  const confBorder=c=>c==="high"?"#8FBF8F":c==="medium"?B.gold:"#E8CCCC";
  const confText=c=>c==="high"?"#1A4A1A":c==="medium"?"#7A5C2A":"#7A2020";

  const Header = () => (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.6rem",paddingBottom:"1rem",borderBottom:`1px solid ${B.border}`}}>
      <Logo/>
      <div style={{fontSize:11,color:B.muted,letterSpacing:".3px"}}>Berkshire Hathaway HomeServices Elite Real Estate</div>
    </div>
  );

  /* ══════════════════════════════════════════════════
     FULL CMA
     Steps: 0=MLS lookup → 1=subject → 2=comps → 3=notes → 4=report
  ══════════════════════════════════════════════════ */
  const AG_STEPS = ["MLS Lookup","Subject Property","Comparables","Market Notes","Report"];
  return (
    <div className="cr" style={{maxWidth:740,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:SANS}}>
      <GS/>
      <Header/>
      <StepBar steps={AG_STEPS} step={agStep}/>
      <ErrBanner msg={agErr}/>

      {agLoading ? <Spinner msg={agLoadMsg}/> : (
        <div className="cr-fade">

          {/* STEP 0: MLS lookup */}
          {agStep===0&&(
            <div>
              <div style={{fontFamily:SERIF,fontSize:22,color:B.navy,marginBottom:6}}>Property Lookup</div>
              <p style={{fontSize:13,color:B.muted,marginBottom:"1.4rem",lineHeight:1.6}}>Enter a listing MLS number to auto-fill the subject property, or skip ahead to enter all details manually.</p>

              <Field label="MLS Listing Number">
                <div className="mls-row">
                  <input className="cr-input" value={mlsNum} onChange={e=>setMlsNum(e.target.value)}
                    placeholder="e.g. 2065432"
                    onKeyDown={e=>e.key==="Enter"&&mlsNum.trim()&&doMlsLookup()}
                    style={{borderRadius:"4px 0 0 4px",borderRight:"none"}}/>
                  <button className="cr-gold" onClick={doMlsLookup} disabled={!mlsNum.trim()||mlsLd}
                    style={{borderRadius:"0 4px 4px 0",padding:"9px 18px"}}>
                    {mlsLd?"Searching...":"Look Up Listing"}
                  </button>
                </div>
              </Field>
              <div style={{display:"flex",alignItems:"center",gap:7,marginTop:8,fontSize:11,color:B.muted}}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke={B.muted} strokeWidth="1"/><path d="M7 6v4M7 4.5v.5" stroke={B.muted} strokeWidth="1.2" strokeLinecap="round"/></svg>
                Searches public listing data. Works for active, pending, and recently sold listings.
              </div>

              {mlsLd&&<Spinner msg="Fetching listing data — Galgotha won't hold us long."/>}

              {mlsSt==="found"&&(
                <div className="cr-pulse">
                  <InfoBox title="Listing found — form autofilled" type="green">
                    {mlsNote&&<div style={{marginBottom:6}}>{mlsNote}</div>}
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 16px",marginTop:6}}>
                      {[["Address",agSub.address],["City",[agSub.city,agSub.state,agSub.zip].filter(Boolean).join(", ")],["Beds/Baths",`${agSub.beds}bd / ${agSub.baths}ba`],["Total Sq Ft",agSub.sqft?Number(agSub.sqft).toLocaleString():""]].map(([l,v])=>v?<div key={l}><span style={{color:B.muted,fontSize:11}}>{l}: </span><span style={{fontSize:12,fontWeight:600,color:B.navy}}>{v}</span></div>:null)}
                    </div>
                  </InfoBox>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:12}}>
                    <button className="cr-sm" onClick={()=>{setMlsSt(null);setMlsNum("");}}>Try different listing</button>
                    <button className="cr-primary" onClick={()=>setAgS(1)}>Review & Continue →</button>
                  </div>
                </div>
              )}

              {mlsSt==="not_found"&&(
                <div className="cr-pulse">
                  <InfoBox title="Not found" type="blue">{mlsNote} Try a different number or enter manually below.</InfoBox>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:12}}>
                    <button className="cr-sm" onClick={()=>{setMlsSt(null);setMlsNum("");}}>Try again</button>
                    <button className="cr-primary" onClick={()=>setAgS(1)}>Enter Manually →</button>
                  </div>
                </div>
              )}

              {!mlsSt&&<>
                <div style={{margin:"1.4rem 0 .8rem",borderTop:`1px solid ${B.border}`}}/>
                <div style={{background:B.cream,border:`1px solid ${B.border}`,borderRadius:6,padding:"1rem 1.2rem"}}>
                  <div style={{fontFamily:SANS,fontSize:12,fontWeight:600,color:B.navy,marginBottom:4}}>Don't have the MLS number handy?</div>
                  <div style={{fontSize:12,color:B.muted,marginBottom:12,lineHeight:1.55}}>Skip the lookup and fill in the subject property details manually on the next step.</div>
                  <button className="cr-ghost" style={{fontSize:12,padding:"8px 18px"}} onClick={()=>setAgS(1)}>
                    Enter Property Details Manually →
                  </button>
                </div>
              </>}
            </div>
          )}

          {/* STEP 1: Subject */}
          {agStep===1&&(
            <div>
              <div style={{fontFamily:SERIF,fontSize:22,color:B.navy,marginBottom:6}}>Subject Property</div>
              <p style={{fontSize:13,color:B.muted,marginBottom:"1rem"}}>Review and complete all property and agent details.</p>
              <SubjectForm sub={agSub} upd={updAgSub} showAgent={true}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:20}}>
                <button className="cr-ghost" onClick={()=>setAgS(0)}>← Back</button>
                <button className="cr-primary" onClick={()=>setAgS(2)} disabled={!agSub.address||!agSub.city}>Next: Comparables →</button>
              </div>
            </div>
          )}

          {/* STEP 2: Comps */}
          {agStep===2&&(
            <div>
              <div style={{fontFamily:SERIF,fontSize:22,color:B.navy,marginBottom:6}}>Comparable Sales</div>
              <p style={{fontSize:13,color:B.muted,marginBottom:"1.2rem"}}>Add 3 to 6 recently sold comps. Enter manually, use Look Up on each card, or upload an MLS comp report PDF to auto-import all listings.</p>

              {/* PDF Upload */}
              <div style={{background:B.cream,border:`1px solid ${B.border}`,borderRadius:6,padding:"1rem 1.2rem",marginBottom:16}}>
                <div style={{fontFamily:SANS,fontSize:12,fontWeight:600,color:B.navy,marginBottom:4}}>Import from MLS PDF Report</div>
                <div style={{fontSize:12,color:B.muted,marginBottom:10,lineHeight:1.55}}>Upload a UtahRealEstate.com comparable sales PDF — all listings will be extracted and added as comps automatically.</div>
                {pdfErr&&<div style={{fontSize:12,color:"#7A2020",background:"#FDF2F2",border:"1px solid #E8CCCC",borderRadius:4,padding:"8px 12px",marginBottom:8}}>{pdfErr}</div>}
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <label style={{
                    display:"inline-flex",alignItems:"center",gap:6,
                    padding:"8px 16px",borderRadius:4,border:`1px solid ${B.border}`,
                    background:"#fff",color:B.navy,fontSize:12,fontWeight:600,
                    cursor:pdfParsing?"not-allowed":"pointer",fontFamily:SANS,
                    opacity:pdfParsing?0.6:1,transition:"all .15s"
                  }}>
                    {pdfParsing?(
                      <><div style={{width:12,height:12,border:`2px solid ${B.border}`,borderTop:`2px solid ${B.gold}`,borderRadius:"50%",animation:"cr-spin .9s linear infinite"}}/> Parsing PDF…</>
                    ):(
                      <><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke={B.navy} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Upload PDF</>
                    )}
                    <input type="file" accept=".pdf" disabled={pdfParsing} style={{display:"none"}} onChange={async(e)=>{
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setPdfParsing(true); setPdfErr(null);
                      try {
                        const b64 = await new Promise((res,rej)=>{
                          const r = new FileReader();
                          r.onload=()=>res(r.result.split(",")[1]);
                          r.onerror=()=>rej(new Error("Read failed"));
                          r.readAsDataURL(file);
                        });
                        const result = await parsePDFComps(b64);
                        if (!result.comps?.length) throw new Error("No listings found in this PDF. Make sure it's a UtahRealEstate.com MLS report.");
                        const newComps = result.comps.map(c=>({
                          address:[c.address,c.city,c.state,c.zip].filter(Boolean).join(", "),
                          beds:c.beds||"",baths:c.baths||"",sqft:c.sqft||"",
                          salePrice:c.salePrice||"",saleDate:c.saleDate||"",
                          garage:c.garage||"",pool:c.pool||false,
                          lotSize:c.lotSize||"",condition:c.condition||"Average",
                          daysOnMarket:c.daysOnMarket||"",
                          _mlsNum:c.mlsNum||"",_listPrice:c.listPrice||""
                        }));
                        setAgComps(p=>{
                          const existing = p.filter(c=>c.address||c.salePrice);
                          return [...existing,...newComps].slice(0,7);
                        });
                      } catch(err) {
                        setPdfErr(err.message||"PDF parsing failed. Try again.");
                      } finally {
                        setPdfParsing(false);
                        e.target.value="";
                      }
                    }}/>
                  </label>
                  {pdfParsing&&<span style={{fontSize:12,color:B.muted}}>Reading listings…</span>}
                </div>
              </div>

              {agComps.map((c,i)=>(
                <div key={i}>
                  {c._mlsNum&&<div style={{fontSize:10,color:B.muted,marginBottom:4,fontFamily:SANS}}>MLS# {c._mlsNum}{c._listPrice?` · List: $${Number(c._listPrice).toLocaleString()}`:""}</div>}
                  <CompCard comp={c} idx={i} onChange={(k,v)=>updAgComp(i,k,v)} onRemove={()=>setAgComps(p=>p.filter((_,x)=>x!==i))}/>
                </div>
              ))}
              {agComps.length<7&&<button onClick={()=>setAgComps(p=>[...p,emptyComp()])} style={{width:"100%",padding:"11px",marginBottom:16,border:`1px dashed ${B.border}`,borderRadius:5,background:"transparent",color:B.muted,fontSize:13,cursor:"pointer",fontFamily:SANS}}>+ Add Comparable Manually</button>}
              <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
                <button className="cr-ghost" onClick={()=>setAgS(1)}>← Back</button>
                <button className="cr-primary" onClick={()=>setAgS(3)} disabled={agVc.length<1}>Next: Market Notes →</button>
              </div>
            </div>
          )}

          {/* STEP 3: Notes */}
          {agStep===3&&(
            <div>
              <div style={{fontFamily:SERIF,fontSize:22,color:B.navy,marginBottom:6}}>Market Notes</div>
              <p style={{fontSize:13,color:B.muted,marginBottom:"1.2rem"}}>Add any local context or conditions to sharpen the analysis.</p>
              <Field label="Market Notes (optional)">
                <textarea className="cr-input" value={agNotes} onChange={e=>setAgNotes(e.target.value)}
                  placeholder="e.g. Low inventory in this zip. Multiple offers common. HOA $140/mo. Active spring market."
                  rows={5} style={{resize:"vertical",fontFamily:SANS,lineHeight:1.6}}/>
              </Field>
              <InfoBox title="Ready to generate">
                AI will analyze {agVc.length} comparable{agVc.length!==1?"s":""}, calculate adjustments, and write a full professional narrative.
              </InfoBox>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:18}}>
                <button className="cr-ghost" onClick={()=>setAgS(2)}>← Back</button>
                <button className="cr-gold" onClick={doAgReport}>Generate Report</button>
              </div>
            </div>
          )}

          {/* STEP 4: Report */}
          {agStep===4&&(
            <div>
              <div style={{fontFamily:SERIF,fontSize:22,color:B.navy,marginBottom:6}}>Report Ready</div>
              <p style={{fontSize:13,color:B.muted,marginBottom:"1.2rem"}}>Download the report. Open in Chrome → Print → Save as PDF.</p>
              <PricingCards comps={agVc}/>
              <div style={{border:`1px solid ${B.border}`,borderRadius:6,padding:"1.2rem",background:B.cream,maxHeight:380,overflowY:"auto",marginBottom:14}}>
                <pre style={{fontSize:12,whiteSpace:"pre-wrap",color:B.text,fontFamily:SANS,lineHeight:1.7}}>{agReport}</pre>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:8}}>
                  <button className="cr-ghost" onClick={()=>{setAgS(3);setAgR(null);}}>Re-run</button>
                  <button className="cr-ghost" onClick={()=>{setAgS(2);}}>Edit Comps</button>
                    <button className="cr-ghost" onClick={()=>{resetAg();}}>Start Over</button>
                </div>
                <button className="cr-gold" onClick={()=>download(agSub,agVc,agReport,false)} disabled={dlLoad}>
                  {dlLoad?"Building...":"Download Report →"}
                </button>
              </div>
              <div style={{marginTop:12,fontSize:11,color:B.muted,lineHeight:1.6}}>Open in Chrome → Cmd+P / Ctrl+P → Save as PDF.</div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
