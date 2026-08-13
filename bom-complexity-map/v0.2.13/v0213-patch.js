/* Book of Mormon Complexity Map v0.2.13 — refinement pass */
(function(){
  icGeometry=function(f,limit){
    const [a,b]=icOrderedEndpoints(f),span=Math.abs(b[0]-a[0]),mid=(a[0]+b[0])/2;
    const h=cv.clientHeight,w=cv.clientWidth,norm=Math.max(0,Math.min(1,span/Math.max(1,w*.72)));
    const baseLift=46+span*.245;
    const lift=Math.min(h*.565,baseLift*(1+.20*Math.pow(norm,3)));
    const ctrl=[mid,Math.max(20,Math.min(a[1],b[1])-lift)];
    const resolved=f[4]<=limit;
    const progress=resolved?1:Math.max(.025,Math.min(.995,(limit-f[3])/Math.max(1,f[4]-f[3])));
    return{p0:[a[0],a[1]-3],p1:ctrl,p2:[b[0],b[1]-3],resolved,progress,span};
  };

  slPoetry=function(limit){
    if(SL.poetry<=.003)return;
    const pm=poetryModel(limit),rv=slPhase(.48,.98)*SL.poetry;if(rv<=0)return;
    for(let i=0;i<pm.by.length;i++){
      let entries=pm.by[i].map((v,t)=>[t,v]).filter(x=>x[1]>0);if(!entries.length)continue;
      entries.sort((a,b)=>b[1]-a[1]);
      const p=pts[i],spread=Math.min(showIC?15:18,entries.length*(showIC?1.22:1.42)),den=Math.max(1,entries.length-1);
      entries.forEach(([t,v],j)=>{
        const norm=Math.log1p(v)/Math.log1p(pm.maxLine),xoff=entries.length===1?0:-spread/2+spread*j/den;
        const len=(showIC?13:25)+norm*(showIC?92:154),fam=PTYPEFAM[t],color=PCOL[fam];
        const context=selectedIC?.50:1,alpha=rv*context*(showIC?.72:1),x=p[0]+xoff,y0=p[1]+4,y1=y0+len;
        ctx.save();ctx.lineCap='round';ctx.globalCompositeOperation='source-over';ctx.strokeStyle=color;ctx.shadowColor=color;
        ctx.globalAlpha=alpha*(.05+.03*norm);ctx.lineWidth=2.15+1.45*norm;ctx.shadowBlur=7+4*norm;ctx.beginPath();ctx.moveTo(x,y0);ctx.lineTo(x,y1);ctx.stroke();
        ctx.globalAlpha=alpha*(.43+.22*norm);ctx.lineWidth=.50+.44*norm;ctx.shadowBlur=2;ctx.stroke();
        ctx.fillStyle=color;ctx.globalAlpha=alpha*(.15+.10*norm);ctx.shadowBlur=7;ctx.beginPath();ctx.arc(x,y1,2.25+.95*norm,0,Math.PI*2);ctx.fill();
        ctx.globalAlpha=alpha*(.88+.10*norm);ctx.shadowBlur=3.1;ctx.beginPath();ctx.arc(x,y1,.86+.58*norm,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='rgba(255,255,255,.92)';ctx.globalAlpha=alpha*.72;ctx.shadowBlur=0;ctx.beginPath();ctx.arc(x,y1,.28+.15*norm,0,Math.PI*2);ctx.fill();
        ctx.restore();
      });
    }
  };

  const priorArc=slArc;
  slArc=function(g,color,state){
    priorArc(g,color,state);
    if(state!=='selected'&&state!=='hover')return;
    const s=g.resolved?null:splitQuad(g.p0,g.p1,g.p2,g.progress),end=g.resolved?g.p2:s[1];
    ctx.save();ctx.globalCompositeOperation='source-over';
    for(const p of [g.p0,end]){
      ctx.fillStyle=color;ctx.shadowColor=color;ctx.globalAlpha=state==='selected'?.34:.22;ctx.shadowBlur=13;ctx.beginPath();ctx.arc(p[0],p[1],3.1,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#F7FEFF';ctx.globalAlpha=state==='selected'?.96:.82;ctx.shadowBlur=4;ctx.beginPath();ctx.arc(p[0],p[1],1.05,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  };
  draw();
})();