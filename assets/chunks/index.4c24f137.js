import{q as p,G as u,v as s,z as y,A as m,x as c,H as a,B as d,_ as r,d as v,y as n,u as f,a as x,M as g,U as h,V as k}from"./framework.ae086846.js";const S={key:0,class:"Property"},b={key:1,class:"Type"},C=p({__name:"index",props:{columns:{default:[{key:"Property",title:"Property",dataIndex:"parameter"},{title:"Description",dataIndex:"description"},{key:"Type",title:"Type",dataIndex:"type"},{title:"Default",dataIndex:"default"}]},dataSource:null},setup(e){return(t,o)=>{const _=u("a-table");return s(),y(_,{dataSource:e.dataSource,columns:e.columns,pagination:!1,bordered:""},{bodyCell:m(({column:l,record:i})=>[l.key==="Property"?(s(),c("span",S,a(i.parameter),1)):d("",!0),l.key==="Type"?(s(),c("span",b,a(i.type),1)):d("",!0)]),_:1},8,["dataSource","columns"])}}});const w=r(C,[["__scopeId","data-v-a5390e8f"]]),I=p({__name:"index",props:{title:null,list:null},setup(e){const t=e,o=v(()=>JSON.stringify(t.list,null,2));return(_,l)=>(s(),c("div",null,[n("h3",null,a(e.title),1),n("pre",null,a(f(o)),1)]))}});const N=r(I,[["__scopeId","data-v-8fce440e"]]),$="/vue3-drag-utils/assets/code.f62f3458.svg",B=e=>(h("data-v-a85b3d02"),e=e(),k(),e),D={class:"Code-Display"},P=B(()=>n("img",{class:"icon",src:$},null,-1)),T=p({__name:"index",setup(e){const t=x(!1),o=()=>{t.value=!t.value};return(_,l)=>(s(),c("div",D,[n("div",{onClick:o,class:"btn-toggle"},[P,n("span",null,a(`${t.value?"Hide":"Show"} Code`),1)]),t.value?g(_.$slots,"default",{key:0},void 0,!0):d("",!0)]))}});const H=r(T,[["__scopeId","data-v-a85b3d02"]]);export{H as C,N as _,w as a};
