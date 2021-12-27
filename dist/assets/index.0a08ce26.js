var re=Object.defineProperty,ne=Object.defineProperties;var oe=Object.getOwnPropertyDescriptors;var E=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var j=(e,t,n)=>t in e?re(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,y=(e,t)=>{for(var n in t||(t={}))A.call(t,n)&&j(e,n,t[n]);if(E)for(var n of E(t))I.call(t,n)&&j(e,n,t[n]);return e},F=(e,t)=>ne(e,oe(t));var _=(e,t)=>{var n={};for(var i in e)A.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&E)for(var i of E(e))t.indexOf(i)<0&&I.call(e,i)&&(n[i]=e[i]);return n};import{a as ie,r as u,j as r,s as c,C,p as ae,b as d,A as se,c as le,U as ce,R as V,d as de,i as q,u as P,L as S,e as O,f as x,V as B,B as pe,S as me,W as ue,g as ge,h as he}from"./vendor.8661a914.js";const fe=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}};fe();const be={register:e=>U.post("/players",e),authenticate:{app_login:e=>U.post("/authentication",e)}};var ye=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",geral:be});const M="@monkeynauts:token@",U=ie.create({baseURL:"http://54.197.157.79:5000/api"}),D={user:ye},H=u.exports.createContext({});function _e({children:e}){const[t,n]=u.exports.useState(null),[i,o]=u.exports.useState(""),[a,l]=u.exports.useState(!0);async function g(p){const m=await D.user.geral.authenticate.app_login(p),{token:f}=m.data;return localStorage.setItem(M,f),l(!0),o(f),m.data||void 0}async function h(p){const m=await D.user.geral.register(p),{player:f,token:$}=m.data;return localStorage.setItem(M,$),n(f),l(!0),o($),m.data||void 0}return r(H.Provider,{value:{signIn:g,register:h,token:i,tokenIsValid:a,user:t},children:e})}function N(){return u.exports.useContext(H)}function w(e){const[t,n]=u.exports.useState(e||!1);function i(){n(!0)}function o(){n(!1)}return{setState:n,state:t,changeToTrue:i,changeToFalse:o}}const s={background:{},colors:{primary_0:"#60b2ff",secondary_50:"#2697FF",tertiary_100:"#062043",gray_blue:"#51779A"},fonts:{primary:"#fff"},global:{input:"#0A3876",red_0:"#ef5858",white_0:"#fff"},gradients:{button:"linear-gradient(180deg, #003872 0%, #1470BD 100%)"}},xe={orbitron:"Orbitron"},we=c.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  .input_text {
    margin-bottom: 1.2rem;
    font-weight: bold;
    line-height: 1.5rem;
    letter-spacing: 0;
    text-align: left;

    color: #60B2FF;
  }

  ${e=>e.isError&&C`
    .input_error {
      color: ${s.global.red_0};
      margin-top: 0.6rem;
      font-size: 1rem;
    }
  `};
`,ke=c.div`
  background: ${s.colors.tertiary_100};
  border: 1px solid ${s.colors.gray_blue};

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.1rem;

  width: 100%;

  ${e=>e.isFocused&&C`
    border: 1px solid ${s.colors.secondary_50};
  `};

  ${e=>e.isError&&C`
    border: 1px solid ${s.global.red_0};
  `};

  input {
    background: ${s.colors.tertiary_100};
    padding: 1.4rem;
    width: 100%;
    letter-spacing: 1px;
    color: ${s.fonts.primary};
    caret-color: ${s.fonts.primary};

    &::placeholder {
      color: ${s.global.input};
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px ${s.colors.tertiary_100} inset;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${s.fonts.primary} !important;
    }
  }

  button.change_visible_password {
    padding: 0 1.6rem;
    display: flex;
    align-items: center;

    svg {
      width: 2.2rem;
      height: 2.2rem;
      color: #14A8FC;
    }
  }
`;function k(a){var l=a,{type:e,name:t,labelText:n,containerProps:i}=l,o=_(l,["type","name","labelText","containerProps"]);const g=u.exports.useRef(null),{fieldName:h,defaultValue:p,registerField:m,error:f,clearError:$}=ae(t),v=w(!1),T=w(!1);function R(){T.changeToTrue(),f&&$()}function z(b){b?v.changeToTrue():v.changeToFalse(),R()}return u.exports.useEffect(()=>{m({name:h,ref:g,getValue:b=>b.current.value,setValue:(b,te)=>{b.current.value=te},clearValue:b=>{b.current.value=""}})},[h,m]),d(we,F(y({},i),{isError:!!f,children:[r("span",{className:"input_text",children:n}),d(ke,{isFocused:T.state,isError:!!f,onClick:()=>T.changeToTrue(),children:[r("input",y({type:e==="password"&&v.state?"text":e,name:t,ref:g,defaultValue:p,onFocus:R,onBlur:()=>T.changeToFalse()},o)),e==="password"&&(v.state?r("button",{title:"Hide password",type:"button",onClick:()=>z(!1),className:"change_visible_password",children:r(se,{})}):r("button",{title:"Show password",type:"button",onClick:()=>z(!0),className:"change_visible_password",children:r(le,{})}))]}),r("span",{className:"input_error",children:f})]}))}var $e="/assets/button_background_1.73b5aca5.svg";const ve=c.button`
  background: url(${$e}) no-repeat center;
  background-size: contain;

  padding: 1.6rem;
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  line-height: 1.5rem;
  letter-spacing: 0.035em;
  text-align: center;
`;function K(i){var o=i,{text:e,loading:t}=o,n=_(o,["text","loading"]);return r(ve,F(y({},n),{children:t&&t.state?r(W,{size:t.size}):e}))}const Te=c.div`
  width: ${({size:e})=>`${e||1.4}rem`};
  height: ${({size:e})=>`${e||1.4}rem`};
`,Ee=ce`
  from {
    transform: rotate(0deg);
  }
  to { 
    transform: rotate(360deg);
  }
`,Fe=c.svg`
  width: 100%;
  height: 100%;
  
	border-radius: 50%;

	border: solid 4px ${s.global.white_0};
	border-right-color: transparent;
	border-bottom-color: transparent;

  transition: all 0.5s ease-in;
  animation: ${Ee} 1s linear infinite;
`;function W(n){var i=n,{type:e="circle"}=i,t=_(i,["type"]);const o={circle:r(Fe,y({},t))};return r(Te,F(y({},t),{children:o[e]}))}function L(i){var o=i,{isPrivate:e,ifAuthenticateNotAccess:t}=o,n=_(o,["isPrivate","ifAuthenticateNotAccess"]);const a=!0,{token:l}=N();return e&&a&&l?r(V,{to:e.redirect||"/login"}):t&&a&&l?r(V,{to:t.redirect||"/dashboard"}):r(de,y({},n))}function G(e){const t={};return e.inner.forEach(n=>{t[String(n.path)]=n.message}),t}var J="/assets/logo.2bbcb4f8.png",Q="/assets/background_1.0b131352.png",X="/assets/panel_character_attribute_1.302a8e7d.png",Y="/assets/panel_character_attribute_2.a15925e8.png",Z="/assets/panel_character_attribute_3.01325886.png";const Ce=c.div`
  background: url(${Q}) no-repeat center;
  background-size: cover;
  padding: 2.4rem 0;

  height: 100vh;
`,Se=c.div`
  padding: 0 1.4rem;
  margin: 0 1.4rem;

  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: url(${X}) no-repeat center center;

  @media(min-width: 960px) {
    background: url(${Y}) no-repeat center center;
  }

  @media(min-width: 1300px) {
    background: url(${Z}) no-repeat center center;
  }
`,Ne=c.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .app_logo {
    display: none;
    width: 24rem;
    margin-top: 6.4rem;
  }

  @media(min-width: 960px) {
    flex-direction: row;
    gap: 14rem;

    margin-bottom: 7.2rem;

    .app_logo {
      display: block;
      width: initial;
      margin-top: 9.2rem;
    }
  }
`,Le=c(q)`
  .page_title {
    line-height: 3rem;
    
    text-align: center;
    margin-top: 3.8rem;

    color: ${s.colors.primary_0};
    text-shadow: 0 0 1.2rem ${s.colors.primary_0};
  }

  .inputs {
    margin-top: 2.4rem;

    label:not(:first-child) {
      margin-top: 2.4rem;
    }
  }

  .button_submit {
    margin: 2.4rem 0;
  }

  footer {
    display: flex;
    align-items: center;
    flex-direction: column;

    .to_login, a {
      font-weight: 400;
      line-height: 1.4rem;
      letter-spacing: 0.035em;
    }

    .to_login {
      text-align: center;

      a {
        margin-left: 0.6rem;
        color: ${s.colors.primary_0};

        border-bottom: 1px solid transparent;

        &:hover {
          border-bottom: 1px solid ${s.colors.primary_0};
        }
      }
    }

    .forgot_password {
      margin-top: 1.6rem;
    }

    .app_name {
      margin: 2.8rem 0 3.8rem;

      font-weight: 700;
      line-height: 1.4rem;
      letter-spacing: 0.035em;

      color: ${s.colors.primary_0};

    }
  }

  @media(min-width: 960px) {
    .page_title {
      margin-bottom: 6.4rem;
    }
  }

  @media(min-width: 960px) {
    footer {
      .app_name {
        display: none;
      }
    }
  }
`;function ee(){const{signIn:e}=N(),t=u.exports.useRef(null),n=P(),i=w(!1);async function o(a){var l,g,h;i.changeToTrue();try{(l=t.current)==null||l.setErrors({}),await O().shape({email:x().required("This field is required").email("Enter a valid email address"),password:x().required("This field is required")}).validate(a,{abortEarly:!1}),await e(a),i.changeToFalse(),n.push("/dashboard")}catch(p){if(i.changeToFalse(),p instanceof B){const m=G(p);(g=t.current)==null||g.setErrors(m);return}(h=t.current)==null||h.setErrors({email:"E-mail/password incorrect"})}}return r(Ce,{children:r(Se,{children:d(Ne,{children:[r("img",{src:J,alt:"App Logo",className:"app_logo"}),d(Le,{ref:t,onSubmit:o,children:[r("h1",{className:"page_title",children:"Login"}),d("div",{className:"inputs",children:[r(k,{name:"email",labelText:"E-mail",placeholder:"E-mail...",type:"text"}),r(k,{name:"password",labelText:"Password",placeholder:"Password...",type:"password"})]}),r(K,{className:"button_submit",type:"submit",text:"Login",loading:{state:i.state}}),d("footer",{children:[d("span",{className:"to_login",children:["Don't have an account?",r(S,{to:"/register",children:"Sign up"})]}),r("span",{className:"forgot_password",children:r(S,{to:"/forgot",children:"Forgot Password"})}),r("span",{className:"app_name",children:"The Monkeynauts"})]})]})]})})})}const Re=c.div`
  background: url(${Q}) no-repeat center;
  background-size: cover;
  padding: 2.4rem 0;

  height: 100vh;
`,ze=c.div`
  padding: 0 1.4rem;
  margin: 0 1.4rem;

  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: url(${X}) no-repeat center center;

  @media(min-width: 960px) {
    background: url(${Y}) no-repeat center center;
  }

  @media(min-width: 1300px) {
    background: url(${Z}) no-repeat center center;
  }
`,Ae=c.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .app_logo {
    display: none;
    width: 24rem;
    margin-top: 6.4rem;
  }

  @media(min-width: 960px) {
    flex-direction: row;
    gap: 14rem;

    margin-bottom: 7.2rem;

    .app_logo {
      display: block;
      width: initial;
      margin-top: 9.2rem;
    }
  }
`,Ie=c(q)`
  .page_title {
    line-height: 3rem;
    
    text-align: center;
    margin-top: 3.8rem;

    color: ${s.colors.primary_0};
    text-shadow: 0 0 1.2rem ${s.colors.primary_0};
  }

  .inputs {
    margin-top: 2.4rem;

    label:not(:first-child) {
      margin-top: 2.4rem;
    }
  }

  .button_submit {
    margin: 2.4rem 0;
  }

  footer {
    display: flex;
    align-items: center;
    flex-direction: column;

    .to_login, a {
      font-weight: 400;
      line-height: 1.4rem;
      letter-spacing: 0.035em;
    }

    .to_login {
      text-align: center;

      a {
        margin-left: 0.6rem;
        color: ${s.colors.primary_0};

        border-bottom: 1px solid transparent;

        &:hover {
          border-bottom: 1px solid ${s.colors.primary_0};
        }
      }
    }

    .app_name {
      margin: 2.8rem 0 3.8rem;

      font-weight: 700;
      line-height: 1.4rem;
      letter-spacing: 0.035em;

      color: ${s.colors.primary_0};

    }
  }

  @media(min-width: 960px) {
    .page_title {
      margin-bottom: 6.4rem;
    }
  }

  @media(min-width: 960px) {
    footer {
      .app_name {
        display: none;
      }
    }
  }
`;function je(){const{register:e}=N(),t=u.exports.useRef(null),n=P(),i=w(!1);async function o(a){var l,g,h;i.changeToTrue();try{(l=t.current)==null||l.setErrors({}),await O().shape({nickname:x().required("This field is required"),email:x().required("This field is required").email("Enter a valid email address"),password:x().required("This field is required")}).validate(a,{abortEarly:!1}),await e(a),i.changeToFalse(),n.push("/dashboard")}catch(p){if(i.changeToFalse(),p instanceof B){const m=G(p);(g=t.current)==null||g.setErrors(m);return}(h=t.current)==null||h.setErrors({nickname:"E-mail/Nickname invalid. Please change them"})}}return r(Re,{children:r(ze,{children:d(Ae,{children:[r("img",{src:J,alt:"App Logo",className:"app_logo"}),d(Ie,{ref:t,onSubmit:o,children:[r("h1",{className:"page_title",children:"Sign up"}),d("div",{className:"inputs",children:[r(k,{name:"nickname",labelText:"Nickname",placeholder:"Nickname...",type:"text"}),r(k,{name:"email",labelText:"E-mail",placeholder:"E-mail...",type:"text"}),r(k,{name:"password",labelText:"Password",placeholder:"Password...",type:"password"})]}),r(K,{className:"button_submit",type:"submit",text:"Sign up",loading:{state:i.state}}),d("footer",{children:[d("span",{className:"to_login",children:["Already have an account?",r(S,{to:"/login",children:"Login"})]}),r("span",{className:"app_name",children:"The Monkeynauts"})]})]})]})})})}function Ve(){return r(pe,{children:d(me,{children:[r(L,{component:ee,exact:!0,path:"/"}),r(L,{component:ee,path:"/login"}),r(L,{component:je,path:"/register"})]})})}const qe=ue`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${xe.orbitron}, sans-serif;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  :root {
    font-size: 62.5%;
  }

  input {
    border: none;
    outline: 0;
  }

  body, html, #root {
    min-height: 100vh;
    width: 100%;

    background: #010101;
  }

  h1, h2, h3, h4, h5, h6, a, p, span, label, button {
    color: ${s.fonts.primary};
  }

  @media(min-width: 280px) and (max-width: 1399px) {
    h1 {
      font-size: 2.4rem;
      font-weight: bold;
    }

    h2 {
      font-size: 1.2rem;
      font-weight: bold;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: bold;
    }

    p, span, a, label {
      font-size: 1.2rem;
    }
  }
  
  @media(min-width: 1400px) {
    h1 {
      font-size: 2.4rem;
      font-weight: bold;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: bold;
    }

    h3 {
      font-size: 1.4rem;
      font-weight: bold;
    }

    p, span, a, label {
      font-size: 1.4rem;
    }
  }
`,Pe=c.div`
  ${e=>e.isLoading&&C`
    display: flex;
    align-items: center;
    justify-content: center;
    
    height: 100vh;
  `};
`;function Oe(){const e=w(!0);return u.exports.useEffect(()=>{window.addEventListener("load",t=>{t&&e.changeToFalse()})},[e]),r(_e,{children:d(Pe,{isLoading:e.state,children:[e.state?r(W,{size:7.2}):r(Ve,{}),r(qe,{})]})})}ge.render(r(he.StrictMode,{children:r(Oe,{})}),document.getElementById("root"));
