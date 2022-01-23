(()=>{"use strict";const t=new class{constructor({directed:t,showDistance:e}){this.board=new class{constructor(t,e,i,s){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.radius=i||20,this.fontSize=s||25,this.clientPosition={x:0,y:0},this.buttons=0,this.shift=!1,this.selector="",this.canvas.width=t||300,this.canvas.height=e||400,this.init()}init(){this.canvas.onmousemove=t=>{this.clientPosition={x:t.clientX-this.canvas.offsetLeft+window.scrollX,y:t.clientY-this.canvas.offsetTop+window.scrollY},this.buttons=t.buttons,this.shift=t.shiftKey},window.onresize=t=>{this.selector&&this.appendTo(this.selector)}}appendTo(t){this.selector=t;const e=document.querySelector(t);e.innerHTML="",e.append(this.canvas),this.canvas.width=e.offsetWidth,this.canvas.height=e.offsetHeight}drawCircle(t,e,i){this.context.beginPath(),this.context.arc(t,e,i,0,2*Math.PI),this.context.stroke(),this.context.fillStyle="#fff",this.context.fill(),this.context.fillStyle="#000"}drawNode(t,e,i,s){s&&(this.context.strokeStyle="#dc3545",this.context.lineWidth=5),this.drawCircle(t,e,this.radius),this.context.font=`${this.fontSize}px Arial`,this.context.textAlign="center",this.context.fillText(i,t,e+this.fontSize/2),this.context.strokeStyle="#000",this.context.lineWidth=1}drawLine(t,e,i,s){this.context.beginPath(),this.context.moveTo(t,e),this.context.lineTo(i,s),this.context.stroke()}drawDirected(t,e,i,s){const o=Math.atan2(e-s,t-i),n={x:i+this.radius*Math.cos(o),y:s+this.radius*Math.sin(o)},a=n.x+this.radius*Math.cos(o)*Math.pow(3,.5)/2,d=n.y+this.radius*Math.sin(o)*Math.pow(3,.5)/2,h={x:a+this.radius/2*Math.cos(o-Math.PI/2),y:d+this.radius/2*Math.sin(o-Math.PI/2)},r={x:a+this.radius/2*Math.cos(o+Math.PI/2),y:d+this.radius/2*Math.sin(o+Math.PI/2)};this.context.beginPath(),this.context.moveTo(n.x,n.y),this.context.lineTo(h.x,h.y),this.context.lineTo(r.x,r.y),this.context.lineTo(n.x,n.y),this.context.lineWidth=2,this.context.fillStyle="#fff",this.context.stroke(),this.context.fill(),this.context.lineWidth=1}drawDistance(t,e,i,s){const o={x:(t+i)/2,y:(e+s)/2},n=Math.sqrt(Math.pow(t-i,2)+Math.pow(e-s,2));this.context.fillStyle="#000",this.context.beginPath(),this.context.fillText(parseInt(n/100),o.x,o.y),this.context.textAlign="center",this.context.fillStyle="#fff"}clear(){this.context.fillStyle="#f4f8ff",this.context.fillRect(0,0,this.canvas.width,this.canvas.height),this.context.fill(),this.context.fillStyle="#000"}},this.nodes=[],this.edges=[],this.functions=[],this.target=null,this.directed=t,this.showDistance=e,this.init()}init(){this.board.canvas.ondblclick=t=>{this.target||this.addNode(this.nodes.length+1,this.board.clientPosition.x,this.board.clientPosition.y)},this.board.canvas.addEventListener("mousemove",(t=>{const{x:e,y:i}=this.board.clientPosition;document.body.style.cursor="unset",this.nodes.forEach((t=>{this.equalPoint(e,t.x)&&this.equalPoint(i,t.y)&&(this.target=this.target||t)})),this.target&&(this.board.buttons&&this.board.shift?document.body.style.cursor="move":document.body.style.cursor="pointer",this.board.shift||1===this.board.buttons||this.equalPoint(e,this.target.x)&&this.equalPoint(i,this.target,i)||(this.target=null))})),this.update()}update(){this.draw(),this.checkAddEdge(),this.updateNodes(),setTimeout((()=>{this.update()}),1e3/60)}addNode(t,e,i){const s={x:e||Math.floor(Math.random()*this.board.canvas.width),y:i||Math.floor(Math.random()*this.board.canvas.height),label:t,move:10};this.nodes.push(s)}addEdge(t,e){const i={from:t,to:e};this.edges.push(i),this.target=null}removeNode(t){this.nodes=this.nodes.filter((e=>e.label!==t))}removeEdge(t){const{from:e,to:i}=t;this.edges=this.edges.filter((t=>t.from!==e||t.to!==i))}draw(){this.board.clear(),this.drawEdges(),this.drawLine(),this.drawNodes()}drawNodes(){this.nodes.forEach((t=>{this.board.drawNode(t.x,t.y,t.label,this.target?.label===t.label)}))}updateNodes(){this.nodes=this.nodes.map((t=>this.board.buttons&&!this.board.shift&&this.target&&this.target.label===t.label?(this.target=this.toClientPosition(t),this.toClientPosition(t)):this.exchange(t)))}exchange(t){return t.move>=0?{...t,x:t.x+.1,y:t.y+.1,move:t.move-.1}:t.move>=-10?{...t,x:t.x-.1,y:t.y-.1,move:t.move-.1}:{...t,move:10}}toClientPosition(t){return{...t,x:this.board.clientPosition.x,y:this.board.clientPosition.y}}drawEdges(){this.edges.forEach((t=>this.drawEdge(t)))}drawLine(){if(!this.board.shift||1!==this.board.buttons||!this.target)return;const{x:t,y:e}=this.board.clientPosition;this.board.drawLine(this.target.x,this.target.y,t,e)}checkAddEdge(){if(!this.target)return;if(!this.board.shift)return;const{x:t,y:e}=this.board.clientPosition;this.nodes.forEach((i=>{this.target&&i.label!==this.target.label&&this.equalPoint(t,i.x)&&this.equalPoint(e,i.y)&&(this.addEdge(this.target.label,i.label),this.target=null)}))}drawEdge(t){let e=null,i=null;if(this.nodes.forEach((s=>{s.label==t.from&&(e=s),s.label==t.to&&(i=s)})),!e||!i)return this.removeEdge(t);this.board.drawLine(e.x,e.y,i.x,i.y),this.directed&&this.board.drawDirected(e.x,e.y,i.x,i.y),this.showDistance&&this.board.drawDistance(e.x,e.y,i.x,i.y)}exportMatrix(){const t=[],e=[];for(let t=0;t<=this.nodes.length;t++)e.push(0);for(let i=0;i<=this.nodes.length;i++)t.push([...e]);return this.edges.forEach((e=>{t[e.from][e.to]++,this.directed||t[e.to][e.from]++})),t}equalPoint(t,e){return Math.abs(t-e)<=this.board.radius}}({directed:!0,showDistance:!0});t.board.appendTo("#canvas");const e=document.getElementById("edges"),i=document.getElementById("guide"),s=document.getElementById("optionsComponent");function o(){e.innerHTML="",t.edges.forEach((i=>{const s=document.createElement("div");s.addEventListener("click",(()=>{t.removeEdge(i),s.remove()})),s.innerHTML=`<li class="edge list-group-item">\n            ${i.from} đến ${i.to}\n        </li>`,e.append(s)})),function(){const e=document.getElementById("matrix"),i=e.querySelector("thead"),s=document.createElement("tr"),o=t.exportMatrix();o.forEach(((t,e)=>s.innerHTML+=`<td>${e||"X"}</td>`)),i.innerHTML="",i.append(s);const n=e.querySelector("tbody");n.innerHTML="";for(let t=1;t<o.length;t++){const e=document.createElement("tr");for(let i=0;i<o.length;i++)e.innerHTML+=0===i?`<td>${t}</td>`:`<td class="${o[t][i]&&"table-primary"}">${o[t][i]}</td>`;n.append(e)}}()}o(),setInterval(o,1e3),document.getElementById("removeNodeButton").addEventListener("click",(()=>t.removeNode(t.nodes.length)));const n=document.getElementById("matrixNodeNode"),a=document.getElementById("optionTab").querySelectorAll("li");a.forEach(((t,o)=>{t.addEventListener("click",(d=>{a.forEach((t=>t.querySelector("a").classList.remove("active"))),t.querySelector("a").classList.add("active"),e.style.display="none",i.style.display="none",s.style.display="none",n.style.display="none",0===o&&(s.style.display="block"),1===o&&(e.style.display="block"),2===o&&(n.style.display="block"),3===o&&(i.style.display="block")}))})),window.addEventListener("mousedown",(t=>{const e=document.getElementById("optionsOverlay");if(!e)return;const i=t.clientX-e.offsetLeft,s=t.clientY-e.offsetTop;i<=e.offsetWidth&&i>=-e.offsetWidth&&s<=e.offsetHeight&&s>=-e.offsetHeight||e.remove()})),window.addEventListener("mousemove",(t=>{if(!t.buttons)return;const e=document.getElementById("optionsOverlay");if(!e)return;const i=t.clientX-e.offsetLeft,s=t.clientY-e.offsetTop;i<=e.offsetWidth&&i>=-100&&s<=e.offsetHeight&&s>=-100&&(e.style.left=t.clientX+"px",e.style.top=t.clientY+"px")})),window.addEventListener("contextmenu",(e=>{if(e.preventDefault(),document.getElementById("optionsOverlay")?.remove(),2===e.buttons){const i=document.createElement("div");i.id="optionsOverlay",i.className="btn-group-vertical",i.style=`width: 200px;position: fixed; left: ${e.clientX}px; top: ${e.clientY}px; background: #fff; z-index: 100;border: 1px #ddd solid;border-radius: 5px;box-shadow: 0 0 5px #00000020;`;const s=document.createElement("button");s.className="btn btn-light",s.innerHTML="Thêm đỉnh",s.onclick=e=>{const{x:i,y:s}=t.board.clientPosition;t.addNode(t.nodes.length+1,i,s)};const o=document.createElement("button");o.className="btn btn-light",o.innerHTML="Xóa đỉnh",o.onclick=e=>t.removeNode(t.nodes.length);const n=document.createElement("button");n.disabled=!0,n.className="btn btn-light",n.innerHTML="Duyệt theo chiều rộng";const a=document.createElement("button");a.disabled=!0,a.className="btn btn-light",a.innerHTML="Duyệt theo chiều sâu",i.append(s,o,n,a),document.body.append(i)}})),document.getElementById("directedToggle").addEventListener("click",(e=>{t.directed=!t.directed})),document.getElementById("showDistanceToggle").addEventListener("click",(e=>{t.showDistance=!t.showDistance}))})();