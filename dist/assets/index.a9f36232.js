var P=Object.defineProperty;var y=Object.getOwnPropertySymbols;var V=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var C=(u,o,e)=>o in u?P(u,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):u[o]=e,k=(u,o)=>{for(var e in o||(o={}))V.call(o,e)&&C(u,e,o[e]);if(y)for(var e of y(o))K.call(o,e)&&C(u,e,o[e]);return u};var h=(u,o,e)=>new Promise((f,m)=>{var d=r=>{try{a(e.next(r))}catch(g){m(g)}},p=r=>{try{a(e.throw(r))}catch(g){m(g)}},a=r=>r.done?f(r.value):Promise.resolve(r.value).then(d,p);a((e=e.apply(u,o)).next())});import{T as M,u as O,B as W}from"./useForm.6a7b0d23.js";import{h as x,R as G}from"./index.d3015976.js";import{s as T,d as J,G as L,e as D,V as Q,i as E,o as $,Q as j,K as t,J as n,u as s,b6 as z,b5 as F,N as H,a8 as X,T as Y,aa as Z,a9 as ee,am as ue,aW as te,aq as ne}from"./vendor.383f122a.js";import"./useDesignSetting.99238df7.js";import"./index.esm.52493e3c.js";function oe(u){return x.request({url:"User/addUser",method:"post",params:u},{isTransformResponse:!1})}function ae(u){return x.request({url:"User/index",method:"POST",params:u})}const le=[{title:"id",key:"id",width:50,align:"center"},{title:"\u540D\u79F0",key:"name",width:100,align:"center"},{title:"\u624B\u673A\u53F7",key:"tel",width:120,align:"center"},{title:"\u5F00\u59CB\u65E5\u671F",key:"create_date",width:160,align:"center",render(u,o){return T("span",u.created_at)}}],se=F(" \u6DFB\u52A0\u5458\u5DE5 "),re=F("\u5237\u65B0\u6570\u636E"),ie=F("\u53D6\u6D88"),de=F("\u786E\u5B9A"),De=J({setup(u){const o={name:{required:!0,trigger:["blur","input"],message:"\u8BF7\u8F93\u5165\u5458\u5DE5\u59D3\u540D"},tel:{required:!0,trigger:["blur","input"],message:"\u8BF7\u8F93\u5165\u5458\u5DE5\u624B\u673A\u53F7"},password:{required:!0,trigger:["blur","input"],message:"\u8BF7\u8F93\u5165\u5BC6\u7801"}};L();const e=D(null),f=Q(),m=D(),d=D(!1),p=D(!1),a=E({name:"",tel:"",password:""}),r=E({width:220,title:"\u64CD\u4F5C",key:"action",fixed:"right",align:"center",render(c){return T(M,{style:"button",actions:[]})}});O({gridProps:{cols:"1 s:1 m:2 l:3 xl:4 2xl:4"},labelWidth:80});function g(){d.value=!0}const R=c=>h(this,null,function*(){return yield ae(k({},c))});function U(c){console.log(c)}function b(){m.value.reload()}function A(c){c.preventDefault(),p.value=!0,e.value.validate(l=>h(this,null,function*(){if(l)f.error("\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F");else try{const{code:B,msg:_}=yield oe(a);B==G.SUCCESS?(d.value=!1,f.success(_),b()):f.info(_||"\u53D1\u8D27\u5931\u8D25")}finally{p.value=!1}p.value=!1}))}return(c,l)=>{const B=H,_=X,v=Y,w=Z,q=ee,S=ue,N=te,I=ne;return $(),j(I,{bordered:!1,class:"proCard"},{default:t(()=>[n(s(W),{title:"\u5458\u5DE5\u5217\u8868",titleTooltip:"\u5458\u5DE5\u5217\u8868",columns:s(le),request:R,"row-key":i=>i.id,ref_key:"actionRef",ref:m,bordered:!0,"single-line":!1,actionColumn:s(r),"onUpdate:checkedRowKeys":U,"scroll-x":1090},{tableTitle:t(()=>[n(_,{type:"primary",onClick:g},{icon:t(()=>[n(B,null,{default:t(()=>[n(s(z))]),_:1})]),default:t(()=>[se]),_:1})]),toolbar:t(()=>[n(_,{type:"primary",onClick:b},{default:t(()=>[re]),_:1})]),_:1},8,["columns","row-key","actionColumn"]),n(N,{show:d.value,"onUpdate:show":l[4]||(l[4]=i=>d.value=i),"show-icon":!1,preset:"dialog",title:"\u6DFB\u52A0\u5458\u5DE5"},{action:t(()=>[n(S,null,{default:t(()=>[n(_,{onClick:l[3]||(l[3]=()=>d.value=!1)},{default:t(()=>[ie]),_:1}),n(_,{type:"info",loading:p.value,onClick:A},{default:t(()=>[de]),_:1},8,["loading"])]),_:1})]),default:t(()=>[n(q,{model:s(a),rules:o,ref_key:"formRef",ref:e,"label-placement":"left","label-width":80,class:"py-4"},{default:t(()=>[n(w,{label:"\u5458\u5DE5\u59D3\u540D",path:"name"},{default:t(()=>[n(v,{placeholder:"\u8BF7\u8F93\u5165\u5458\u5DE5\u59D3\u540D",value:s(a).name,"onUpdate:value":l[0]||(l[0]=i=>s(a).name=i)},null,8,["value"])]),_:1}),n(w,{label:"\u5458\u5DE5\u624B\u673A\u53F7",path:"tel"},{default:t(()=>[n(v,{placeholder:"\u8BF7\u8F93\u5165\u5458\u5DE5\u624B\u673A\u53F7",value:s(a).tel,"onUpdate:value":l[1]||(l[1]=i=>s(a).tel=i)},null,8,["value"])]),_:1}),n(w,{label:"\u5BC6\u7801",path:"password"},{default:t(()=>[n(v,{placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",value:s(a).password,"onUpdate:value":l[2]||(l[2]=i=>s(a).password=i)},null,8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["show"])]),_:1})}}});export{De as default};
