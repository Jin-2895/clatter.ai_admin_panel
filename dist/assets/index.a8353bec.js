import{r as v,d as y,j as a,I as e,a9 as w,J as l,aa as N,ab as C,ac as O,ad as j}from"./index.c8bb1a37.js";function k(r,n){if(r==null)return{};var i=z(r,n),t,s;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);for(s=0;s<o.length;s++)t=o[s],!(n.indexOf(t)>=0)&&(!Object.prototype.propertyIsEnumerable.call(r,t)||(i[t]=r[t]))}return i}function z(r,n){if(r==null)return{};var i={},t=Object.keys(r),s,o;for(o=0;o<t.length;o++)s=t[o],!(n.indexOf(s)>=0)&&(i[s]=r[s]);return i}var d=v.exports.forwardRef(function(r,n){var i=r.color,t=i===void 0?"currentColor":i,s=r.size,o=s===void 0?24:s,p=k(r,["color","size"]);return y("svg",{ref:n,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...p,children:[a("polyline",{points:"21 8 21 21 3 21 3 8"}),a("rect",{x:"1",y:"3",width:"22",height:"5"}),a("line",{x1:"10",y1:"12",x2:"14",y2:"12"})]})});d.propTypes={color:e.exports.string,size:e.exports.oneOfType([e.exports.string,e.exports.number])};d.displayName="Archive";const R=d,S=r=>{const{open:n,size:i,title:t,width:s,children:o,closeBtn:p,className:g,toggleSidebar:c,bodyClassName:m,contentClassName:h,wrapperClassName:x,headerClassName:f,...u}=r,b=p||a(j,{className:"cursor-pointer",size:15,onClick:c});return y(w,{isOpen:n,toggle:c,contentClassName:l("overflow-hidden",{[h]:h}),modalClassName:l("modal-slide-in",{[x]:x}),className:l({[g]:g,"sidebar-lg":i==="lg","sidebar-sm":i==="sm"}),...s!==void 0?{style:{width:String(s)+"px"}}:{},...u,children:[a(N,{className:l({[f]:f}),toggle:c,close:b,tag:"div",children:a("h5",{className:"modal-title",children:a("span",{className:"align-middle",children:t})})}),a(C,{options:{wheelPropagation:!1},children:a(O,{className:l("flex-grow-1",{[m]:m}),children:o})})]})};S.propTypes={className:e.exports.string,bodyClassName:e.exports.string,open:e.exports.bool.isRequired,title:e.exports.string.isRequired,contentClassName:e.exports.string,wrapperClassName:e.exports.string,children:e.exports.any.isRequired,size:e.exports.oneOf(["sm","lg"]),toggleSidebar:e.exports.func.isRequired,width:e.exports.oneOfType([e.exports.number,e.exports.string])};export{R as A,S};