"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const t=require("vue"),l=e=>(t.pushScopeId("data-v-c335c7e5"),e=e(),t.popScopeId(),e),r={class:"box"},d=l(()=>t.createElementVNode("div",null,"12313",-1)),u=t.defineComponent({__name:"draggable",setup(e){return(n,c)=>(t.openBlock(),t.createElementBlock("div",r,[d,t.renderSlot(n.$slots,"default",{},void 0,!0)]))}});const p=(e,n)=>{const c=e.__vccOpts||e;for(const[s,a]of n)c[s]=a;return c},_=p(u,[["__scopeId","data-v-c335c7e5"]]);_.install=e=>{e.component(_.__name,_)};const o=t.defineComponent({__name:"HButton",setup(e){return(n,c)=>(t.openBlock(),t.createElementBlock("div",null,"button"))}});o.install=e=>{e.component(o.__name,o)};const i=e=>{console.log("button1",e,o,o.__name),e.component("HButton",o)},m={install:i};exports.button=o;exports.default=m;exports.draggable=_;