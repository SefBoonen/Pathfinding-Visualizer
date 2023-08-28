(()=>{"use strict";var t={273:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.AStarFrontier=void 0;const o=n(22),r=n(607);class s extends o.Frontier{constructor(t){super(),this.goal=t}remove(){if(!this.empty()){let t=-1,e=this.frontier[0],n=1/0;for(let o=this.frontier.length-1;o>=0;o--)(0,r.manhattanDistance)(this.frontier[o].state,this.goal)+this.countParents(this.frontier[o])<n&&(n=(0,r.manhattanDistance)(this.frontier[o].state,this.goal)+this.countParents(this.frontier[o]),e=this.frontier[o],t=o);return this.frontier.splice(t,1),e}}countParents(t){let e=0;for(;null!=t.parent;)e++,t=t.parent;return e}}e.AStarFrontier=s},22:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Frontier=void 0,e.Frontier=class{constructor(){this.frontier=[]}add(t){this.frontier.push(t)}containsState(t){for(let e=0;e<this.frontier.length;e++)if(JSON.stringify(this.frontier[e].state)==JSON.stringify(t))return!0;return!1}empty(){return 0==this.frontier.length}remove(){throw new Error("Remove method not implemented")}}},429:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.GreedyFrontier=void 0;const o=n(22),r=n(607);class s extends o.Frontier{constructor(t){super(),this.goal=t}remove(){if(!this.empty()){let t=-1,e=this.frontier[0],n=1/0;for(let o=0;o<this.frontier.length;o++)(0,r.manhattanDistance)(this.frontier[o].state,this.goal)<n&&(n=(0,r.manhattanDistance)(this.frontier[o].state,this.goal),e=this.frontier[o],t=o);return this.frontier.splice(t,1),e}}}e.GreedyFrontier=s},911:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.QueueFrontier=void 0;const o=n(22);class r extends o.Frontier{constructor(){super()}remove(){return this.frontier.length?this.frontier.shift():void 0}}e.QueueFrontier=r},802:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.StackFrontier=void 0;const o=n(22);class r extends o.Frontier{constructor(){super()}remove(){return this.frontier.length?this.frontier.pop():void 0}}e.StackFrontier=r},607:function(t,e,n){var o=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(r,s){function a(t){try{i(o.next(t))}catch(t){s(t)}}function l(t){try{i(o.throw(t))}catch(t){s(t)}}function i(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,l)}i((o=o.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.manhattanDistance=void 0;const r=n(561),s=n(429),a=n(911),l=n(802),i=n(273),d=document.getElementById("container"),c=document.getElementById("solve"),u=document.getElementById("pathfinding-algorithm"),m=document.getElementById("setgoal"),f=document.getElementById("setstart"),h=document.getElementById("addwalls"),g=document.getElementById("reset"),v=document.getElementById("mazegen"),y=document.getElementById("randomfill");if(!v)throw new Error("Maze generation button not found");if(!y)throw new Error("Randomfill button not found");if(!d)throw new Error("Container not found");if(!c)throw new Error("Solve button not found");if(!u)throw new Error("Pathfinding menu not found");if(!m)throw new Error("Set goal button not found");if(!f)throw new Error("Set start button not found");if(!h)throw new Error("Add walls button not found");if(!g)throw new Error("Reset button not found");const E=2*Math.ceil(Math.floor(window.innerHeight)/25/2)+1,p=2*Math.ceil(Math.floor(window.innerWidth/25)/2)+1;let N=[],w="",$=[E-2,p-2],I=[1,1],b=!1,B=!1,C=!1,x=!1,S=!1,M=!1;function F(t){let e=[];return t[1]-1>=0&&3!=N[t[0]][t[1]-1]&&e.push([t[0],t[1]-1]),t[1]+1<p&&3!=N[t[0]][t[1]+1]&&e.push([t[0],t[1]+1]),t[0]+1<E&&3!=N[t[0]+1][t[1]]&&e.push([t[0]+1,t[1]]),t[0]-1>=0&&3!=N[t[0]-1][t[1]]&&e.push([t[0]-1,t[1]]),j(e)}function L(t,e){for(let n=0;n<t.length;n++)if(JSON.stringify(t[n])==JSON.stringify(e))return!0;return!1}function _(t){return new Promise((e=>setTimeout(e,t)))}function k(t){c.disabled=t,f.disabled=t,m.disabled=t,u.disabled=t,b=!1,B=!1,m.className="",f.className=""}function O(){let t=document.querySelectorAll(".explored");for(let e=0;e<t.length;e++)t[e].classList.remove("explored");for(let t=0;t<N.length;t++)for(let e=0;e<N[t].length;e++)4==N[t][e]&&(N[t][e]=0)}function P(){N[I[0]][I[1]]=2,N[$[0]][$[1]]=1,document.getElementById(`C${I[0]}-${I[1]}`).className="startcell",document.getElementById(`C${$[0]}-${$[1]}`).className="finishcell"}function D(){let t=document.querySelectorAll(".explored");for(let e=0;e<t.length;e++)t[e].className="notfound"}function j(t){let e,n=t.length;for(;0!=n;)e=Math.floor(Math.random()*n),n--,[t[n],t[e]]=[t[e],t[n]];return t}function A(t){let e=[];return t[1]-2>=0&&(0!=N[t[0]][t[1]-2]&&1!=N[t[0]][t[1]-2]||e.push([t[0],t[1]-2])),t[1]+2<p&&(0!=N[t[0]][t[1]+2]&&1!=N[t[0]][t[1]+2]||e.push([t[0],t[1]+2])),t[0]+2<E&&(0!=N[t[0]+2][t[1]]&&1!=N[t[0]+2][t[1]]||e.push([t[0]+2,t[1]])),t[0]-2>=0&&(0!=N[t[0]-2][t[1]]&&1!=N[t[0]-2][t[1]]||e.push([t[0]-2,t[1]])),j(e)}document.addEventListener("contextmenu",(t=>{t.preventDefault()})),d.onmousedown=function(){return!1},d.addEventListener("mousedown",(t=>{const e=t.target.closest("td");if(!e)return;const n=[e.parentElement.rowIndex,e.cellIndex];1==t.buttons?(S=!0,C&&0==N[n[0]][n[1]]&&(N[n[0]][n[1]]=3,document.getElementById(`C${n[0]}-${n[1]}`).className="wall")):2==t.buttons&&(M=!0,3==N[n[0]][n[1]]&&C&&(document.getElementById(`C${n[0]}-${n[1]}`).className="",N[n[0]][n[1]]=0))})),document.addEventListener("mouseup",(t=>{0==t.button?S=!1:2==t.button&&(M=!1)})),d.addEventListener("mouseover",(t=>{const e=t.target.closest("td");if(!e)return;const n=[e.parentElement.rowIndex,e.cellIndex];C&&(S&&0==N[n[0]][n[1]]?(N[n[0]][n[1]]=3,document.getElementById(`C${n[0]}-${n[1]}`).className="wall"):M&&3==N[n[0]][n[1]]&&(document.getElementById(`C${n[0]}-${n[1]}`).className="",N[n[0]][n[1]]=0))})),d.addEventListener("click",(t=>{const e=t.target.closest("td");if(!e)return;const n=[e.parentElement.rowIndex,e.cellIndex];b&&0==N[n[0]][n[1]]?(document.getElementById(`C${$[0]}-${$[1]}`).className="",$=n,document.getElementById(`C${$[0]}-${$[1]}`).className="finishcell"):B&&0==N[n[0]][n[1]]&&(document.getElementById(`C${I[0]}-${I[1]}`).className="",I=n,document.getElementById(`C${I[0]}-${I[1]}`).className="startcell")})),v.addEventListener("click",(()=>{})),g.addEventListener("click",(()=>{x=!0,O(),P(),function(){let t=document.querySelectorAll(".notfound");for(let e=0;e<t.length;e++)t[e].classList.remove("notfound")}()})),f.addEventListener("click",(()=>{B?(f.style.backgroundColor="",B=!1):!b||B||C?b||B||!C?(f.className="activated-button",B=!0):(f.className="activated-button",B=!0,h.className="",C=!1):(f.className="activated-button",B=!0,m.className="",b=!1)})),m.addEventListener("click",(()=>{b?(m.className="",b=!1):!B||b||C?B||b||!C?(m.className="activated-button",b=!0):(m.className="activated-button",b=!0,h.className="",C=!1):(m.className="activated-button",b=!0,f.className="",B=!1)})),h.addEventListener("click",(()=>{C?(h.className="",C=!1):!B||b||C?B||!b||C?(h.className="activated-button",C=!0):(h.className="activated-button",C=!0,m.className="",b=!1):(h.className="activated-button",C=!0,f.className="",B=!1)})),document.addEventListener("DOMContentLoaded",(()=>{for(let t=0;t<E;t++){N.push([]),w+="<tr>";for(let e=0;e<p;e++)t==$[0]&&e==$[1]?N[t].push(1):(t==I[0]&&I[1],N[t].push(0)),w+=`<td id="C${[t+"-"+e]}"></td>`;w+="</tr>"}d.innerHTML=w,document.getElementById(`C${I[0]}-${I[1]}`).className="startcell",document.getElementById(`C${$[0]}-${$[1]}`).className="finishcell"})),c.addEventListener("click",(()=>{!function(){o(this,void 0,void 0,(function*(){k(!0);let t=new a.QueueFrontier;"bfs"==u.value?t=new a.QueueFrontier:"dfs"==u.value?t=new l.StackFrontier:"gbfs"==u.value?t=new s.GreedyFrontier($):"astar"==u.value&&(t=new i.AStarFrontier($)),t.add(new r.Nodes(I,null,null));let e=[],n=[];for(;;){if(x)return O(),P(),x=!1,void k(!1);if(t.empty())return D(),k(!1),null;let o=t.remove();if(JSON.stringify(o.state)==JSON.stringify($)){for(k(!1);null!=o.parent;)e.push(o.state),document.getElementById(`C${o.state[0]}-${o.state[1]}`).classList.add("found"),o=o.parent;return null}0==N[o.state[0]][o.state[1]]&&(N[o.state[0]][o.state[1]]=4,document.getElementById(`C${o.state[0]}-${o.state[1]}`).className="explored"),n.push(o.state);let s=F(o.state);yield _(0);for(let e=0;e<s.length;e++)if(!L(n,s[e])&&!t.containsState(s[e])){let n=new r.Nodes(s[e],o,o.state);t.add(n)}}}))}()})),v.addEventListener("click",(()=>{!function(){o(this,void 0,void 0,(function*(){for(let t=0;t<p;t++)N[0][t]=3,document.getElementById(`C0-${t}`).className="wall",N[E-1][t]=3,document.getElementById(`C${E-1}-${t}`).className="wall";for(let t=0;t<E;t++)N[t][0]=3,document.getElementById(`C${t}-0`).className="wall",N[t][p-1]=3,document.getElementById(`C${t}-${p-1}`).className="wall";for(let t=2;t<p-1;t+=2)for(let e=1;e<E-1;e++)N[e][t]=3,document.getElementById(`C${e}-${t}`).className="wall";for(let t=2;t<E-1;t+=2)for(let e=1;e<p-1;e++)N[t][e]=3,document.getElementById(`C${t}-${e}`).className="wall";k(!0);let t=new l.StackFrontier;t.add(new r.Nodes(I,null,I));let e=[];for(;;){if(x)return O(),P(),x=!1,void k(!1);if(t.empty())return D(),k(!1),null;let n=t.remove();null!=n.parent&&(n.action[0]-n.state[0]==2?(N[n.state[0]+1][n.state[1]]=0,document.getElementById(`C${n.state[0]+1}-${n.state[1]}`).className=""):n.action[0]-n.state[0]==-2?(N[n.state[0]-1][n.state[1]]=0,document.getElementById(`C${n.state[0]-1}-${n.state[1]}`).className=""):n.action[1]-n.state[1]==2?(N[n.state[0]][n.state[1]+1]=0,document.getElementById(`C${n.state[0]}-${n.state[1]+1}`).className=""):n.action[1]-n.state[1]==-2&&(N[n.state[0]][n.state[1]-1]=0,document.getElementById(`C${n.state[0]}-${n.state[1]-1}`).className="")),e.push(n.state);let o=A(n.state);yield _(0);for(let s=0;s<o.length;s++)if(!L(e,o[s])&&!t.containsState(o[s])){let e=new r.Nodes(o[s],n,n.state);t.add(e)}}}))}()})),y.addEventListener("click",(()=>{let t=[];for(let e=0;e<N.length;e++)for(let n=0;n<N[e].length;n++)0==N[e][n]&&t.push([e,n]);for(let e=0;e<Math.floor(E*p*.1);e++){let e=Math.floor(Math.random()*(t.length+1));N[t[e][0]][t[e][1]]=3,document.getElementById(`C${t[e][0]}-${t[e][1]}`).className="wall"}})),e.manhattanDistance=function(t,e){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}},561:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Nodes=void 0,e.Nodes=class{constructor(t,e,n){this.state=t,this.parent=e,this.action=n}}}},e={};!function n(o){var r=e[o];if(void 0!==r)return r.exports;var s=e[o]={exports:{}};return t[o].call(s.exports,s,s.exports,n),s.exports}(607)})();