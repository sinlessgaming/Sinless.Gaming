/* SINLESS GG 11 Wonders 3D. Player model + animations: Quaternius (CC0 1.0). Includes three.js r160:
The MIT License

Copyright © 2010-2023 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
var Vl="160";var Hd=0,Yh=1,zd=2;var fc=1,Vd=2,Zi=3,ki=0,Pn=1,Cn=2;var xs=0,Fr=1,Ro=2,Jh=3,jh=4,Wd=5,Gs=100,Kd=101,qd=102,Zh=103,$h=104,Xd=200,Yd=201,Jd=202,jd=203,hl=204,ul=205,Zd=206,$d=207,eA=208,tA=209,nA=210,iA=211,sA=212,rA=213,aA=214,oA=0,cA=1,lA=2,Do=3,hA=4,uA=5,fA=6,dA=7,Wl=0,AA=1,pA=2,ys=0,mA=1,gA=2,_A=3,dc=4,bA=5,EA=6,eu="attached",xA="detached",If=300,qs=301,Or=302,fl=303,dl=304,Ac=306,Bi=1e3,ni=1001,Ia=1002,Tn=1003,Lo=1004;var Ea=1005;var An=1006,Kl=1007;var Ai=1008;var wn=1009,yA=1010,vA=1011,ql=1012,Tf=1013,bs=1014,ii=1015,Qi=1016,Bf=1017,Rf=1018,Vs=1020,MA=1021,yn=1023,SA=1024,CA=1025,Ws=1026,kr=1027,tr=1028,Df=1029,nr=1030,Lf=1031,Pf=1033,xa=33776,Lc=33777,Pc=33778,ya=33779,Po=35840,tu=35841,Fo=35842,nu=35843,pc=36196,Uo=37492,No=37496,Oo=37808,iu=37809,su=37810,ru=37811,Ta=37812,au=37813,ou=37814,cu=37815,lu=37816,hu=37817,uu=37818,fu=37819,du=37820,Au=37821,va=36492,pu=36494,mu=36495,wA=36283,gu=36284,_u=36285,bu=36286,Xl=2200,IA=2201,TA=2202,Qr=2300,Xs=2301,Fc=2302,Rr=2400,Dr=2401,ko=2402,Yl=2500,BA=2501,Ff=0,mc=1,Qa=2,Uf=3e3,Ks=3001,RA=3200,DA=3201,Jl=0,LA=1,Yn="",kt="srgb",vn="srgb-linear",Ga="display-p3",ea="display-p3-linear",Qo="linear",an="srgb",Go="rec709",Ho="p3";var hr=7680;var Eu=519,PA=512,FA=513,UA=514,Nf=515,NA=516,OA=517,kA=518,QA=519,Al=35044;var xu="300 es",pl=1035,es=2e3,zo=2001,ts=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},Vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],yu=1234567,Ma=Math.PI/180,Gr=180/Math.PI;function Ti(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Vn[s&255]+Vn[s>>8&255]+Vn[s>>16&255]+Vn[s>>24&255]+"-"+Vn[e&255]+Vn[e>>8&255]+"-"+Vn[e>>16&15|64]+Vn[e>>24&255]+"-"+Vn[t&63|128]+Vn[t>>8&255]+"-"+Vn[t>>16&255]+Vn[t>>24&255]+Vn[n&255]+Vn[n>>8&255]+Vn[n>>16&255]+Vn[n>>24&255]).toLowerCase()}function Qn(s,e,t){return Math.max(e,Math.min(t,s))}function jl(s,e){return(s%e+e)%e}function GA(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function HA(s,e,t){return s!==e?(t-s)/(e-s):0}function Sa(s,e,t){return(1-t)*s+t*e}function zA(s,e,t,n){return Sa(s,e,1-Math.exp(-t*n))}function VA(s,e=1){return e-Math.abs(jl(s,e*2)-e)}function WA(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function KA(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function qA(s,e){return s+Math.floor(Math.random()*(e-s+1))}function XA(s,e){return s+Math.random()*(e-s)}function YA(s){return s*(.5-Math.random())}function JA(s){s!==void 0&&(yu=s);let e=yu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function jA(s){return s*Ma}function ZA(s){return s*Gr}function ml(s){return(s&s-1)===0&&s!==0}function $A(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Vo(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function ep(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),f=a((e-n)/2),A=r((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*u,c*f,o*l);break;case"YZY":s.set(c*f,o*h,c*u,o*l);break;case"ZXZ":s.set(c*u,c*f,o*h,o*l);break;case"XZX":s.set(o*h,c*m,c*A,o*l);break;case"YXY":s.set(c*A,o*h,c*m,o*l);break;case"ZYZ":s.set(c*m,c*A,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Oi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Jt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Of={DEG2RAD:Ma,RAD2DEG:Gr,generateUUID:Ti,clamp:Qn,euclideanModulo:jl,mapLinear:GA,inverseLerp:HA,lerp:Sa,damp:zA,pingpong:VA,smoothstep:WA,smootherstep:KA,randInt:qA,randFloat:XA,randFloatSpread:YA,seededRandom:JA,degToRad:jA,radToDeg:ZA,isPowerOfTwo:ml,ceilPowerOfTwo:$A,floorPowerOfTwo:Vo,setQuaternionFromProperEuler:ep,normalize:Jt,denormalize:Oi},Je=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Bt=class s{constructor(e,t,n,i,r,a,o,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],A=n[5],m=n[8],g=i[0],p=i[3],d=i[6],x=i[1],E=i[4],T=i[7],N=i[2],L=i[5],F=i[8];return r[0]=a*g+o*x+c*N,r[3]=a*p+o*E+c*L,r[6]=a*d+o*T+c*F,r[1]=l*g+h*x+u*N,r[4]=l*p+h*E+u*L,r[7]=l*d+h*T+u*F,r[2]=f*g+A*x+m*N,r[5]=f*p+A*E+m*L,r[8]=f*d+A*T+m*F,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,f=o*c-h*r,A=l*r-a*c,m=t*u+n*f+i*A;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/m;return e[0]=u*g,e[1]=(i*l-h*n)*g,e[2]=(o*n-i*a)*g,e[3]=f*g,e[4]=(h*t-i*c)*g,e[5]=(i*r-o*t)*g,e[6]=A*g,e[7]=(n*c-l*t)*g,e[8]=(a*t-n*r)*g,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Uc.makeScale(e,t)),this}rotate(e){return this.premultiply(Uc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Uc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Uc=new Bt;function kf(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Ba(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function tp(){let s=Ba("canvas");return s.style.display="block",s}var vu={};function Ca(s){s in vu||(vu[s]=!0,console.warn(s))}var Mu=new Bt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Su=new Bt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),$a={[vn]:{transfer:Qo,primaries:Go,toReference:s=>s,fromReference:s=>s},[kt]:{transfer:an,primaries:Go,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ea]:{transfer:Qo,primaries:Ho,toReference:s=>s.applyMatrix3(Su),fromReference:s=>s.applyMatrix3(Mu)},[Ga]:{transfer:an,primaries:Ho,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Su),fromReference:s=>s.applyMatrix3(Mu).convertLinearToSRGB()}},np=new Set([vn,ea]),Gt={enabled:!0,_workingColorSpace:vn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!np.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=$a[e].toReference,i=$a[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return $a[s].primaries},getTransfer:function(s){return s===Yn?Qo:$a[s].transfer}};function Ur(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Nc(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ur,Wo=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ur===void 0&&(ur=Ba("canvas")),ur.width=e.width,ur.height=e.height;let n=ur.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ur}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=Ba("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Ur(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ur(t[n]/255)*255):t[n]=Ur(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ip=0,Ko=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ip++}),this.uuid=Ti(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Oc(i[a].image)):r.push(Oc(i[a]))}else r=Oc(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Oc(s){return typeof HTMLImageElement!="undefined"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&s instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&s instanceof ImageBitmap?Wo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var sp=0,Un=class s extends ts{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=ni,i=ni,r=An,a=Ai,o=yn,c=wn,l=s.DEFAULT_ANISOTROPY,h=Yn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=Ti(),this.name="",this.source=new Ko(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Je(0,0),this.repeat=new Je(1,1),this.center=new Je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ca("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ks?kt:Yn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==If)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bi:e.x=e.x-Math.floor(e.x);break;case ni:e.x=e.x<0?0:1;break;case Ia:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bi:e.y=e.y-Math.floor(e.y);break;case ni:e.y=e.y<0?0:1;break;case Ia:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ca("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===kt?Ks:Uf}set encoding(e){Ca("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ks?kt:Yn}};Un.DEFAULT_IMAGE=null;Un.DEFAULT_MAPPING=If;Un.DEFAULT_ANISOTROPY=1;var Mt=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],A=c[5],m=c[9],g=c[2],p=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(m+p)<.1&&Math.abs(l+A+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(l+1)/2,T=(A+1)/2,N=(d+1)/2,L=(h+f)/4,F=(u+g)/4,J=(m+p)/4;return E>T&&E>N?E<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(E),i=L/n,r=F/n):T>N?T<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(T),n=L/i,r=J/i):N<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(N),n=F/r,i=J/r),this.set(n,i,r,t),this}let x=Math.sqrt((p-m)*(p-m)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(p-m)/x,this.y=(u-g)/x,this.z=(f-h)/x,this.w=Math.acos((l+A+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},gl=class extends ts{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(Ca("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Ks?kt:Yn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:An,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Un(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Ko(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},si=class extends gl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},qo=class extends Un{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ra=class extends Un{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Fn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],f=r[a+0],A=r[a+1],m=r[a+2],g=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=A,e[t+2]=m,e[t+3]=g;return}if(u!==g||c!==f||l!==A||h!==m){let p=1-o,d=c*f+l*A+h*m+u*g,x=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){let N=Math.sqrt(E),L=Math.atan2(N,d*x);p=Math.sin(p*L)/N,o=Math.sin(o*L)/N}let T=o*x;if(c=c*p+f*T,l=l*p+A*T,h=h*p+m*T,u=u*p+g*T,p===1-o){let N=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=N,l*=N,h*=N,u*=N}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[a],f=r[a+1],A=r[a+2],m=r[a+3];return e[t]=o*m+h*u+c*A-l*f,e[t+1]=c*m+h*f+l*u-o*A,e[t+2]=l*m+h*A+o*f-c*u,e[t+3]=h*m-o*u-c*f-l*A,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(r/2),f=c(n/2),A=c(i/2),m=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*A*m,this._y=l*A*u-f*h*m,this._z=l*h*m+f*A*u,this._w=l*h*u-f*A*m;break;case"YXZ":this._x=f*h*u+l*A*m,this._y=l*A*u-f*h*m,this._z=l*h*m-f*A*u,this._w=l*h*u+f*A*m;break;case"ZXY":this._x=f*h*u-l*A*m,this._y=l*A*u+f*h*m,this._z=l*h*m+f*A*u,this._w=l*h*u-f*A*m;break;case"ZYX":this._x=f*h*u-l*A*m,this._y=l*A*u+f*h*m,this._z=l*h*m-f*A*u,this._w=l*h*u+f*A*m;break;case"YZX":this._x=f*h*u+l*A*m,this._y=l*A*u+f*h*m,this._z=l*h*m-f*A*u,this._w=l*h*u-f*A*m;break;case"XZY":this._x=f*h*u-l*A*m,this._y=l*A*u-f*h*m,this._z=l*h*m+f*A*u,this._w=l*h*u+f*A*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+o+u;if(f>0){let A=.5/Math.sqrt(f+1);this._w=.25/A,this._x=(h-c)*A,this._y=(r-l)*A,this._z=(a-i)*A}else if(n>o&&n>u){let A=2*Math.sqrt(1+n-o-u);this._w=(h-c)/A,this._x=.25*A,this._y=(i+a)/A,this._z=(r+l)/A}else if(o>u){let A=2*Math.sqrt(1+o-n-u);this._w=(r-l)/A,this._x=(i+a)/A,this._y=.25*A,this._z=(c+h)/A}else{let A=2*Math.sqrt(1+u-n-o);this._w=(a-i)/A,this._x=(r+l)/A,this._y=(c+h)/A,this._z=.25*A}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qn(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let A=1-t;return this._w=A*a+t*this._w,this._x=A*n+t*this._x,this._y=A*i+t*this._y,this._z=A*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=i+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return kc.copy(this).projectOnVector(e),this.sub(kc)}reflect(e){return this.sub(kc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},kc=new k,Cu=new Fn,pi=class{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ci.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ci.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ci.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ci):Ci.fromBufferAttribute(r,a),Ci.applyMatrix4(e.matrixWorld),this.expandByPoint(Ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),eo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),eo.copy(n.boundingBox)),eo.applyMatrix4(e.matrixWorld),this.union(eo)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ci),Ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ha),to.subVectors(this.max,ha),fr.subVectors(e.a,ha),dr.subVectors(e.b,ha),Ar.subVectors(e.c,ha),As.subVectors(dr,fr),ps.subVectors(Ar,dr),Us.subVectors(fr,Ar);let t=[0,-As.z,As.y,0,-ps.z,ps.y,0,-Us.z,Us.y,As.z,0,-As.x,ps.z,0,-ps.x,Us.z,0,-Us.x,-As.y,As.x,0,-ps.y,ps.x,0,-Us.y,Us.x,0];return!Qc(t,fr,dr,Ar,to)||(t=[1,0,0,0,1,0,0,0,1],!Qc(t,fr,dr,Ar,to))?!1:(no.crossVectors(As,ps),t=[no.x,no.y,no.z],Qc(t,fr,dr,Ar,to))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Ki=[new k,new k,new k,new k,new k,new k,new k,new k],Ci=new k,eo=new pi,fr=new k,dr=new k,Ar=new k,As=new k,ps=new k,Us=new k,ha=new k,to=new k,no=new k,Ns=new k;function Qc(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ns.fromArray(s,r);let o=i.x*Math.abs(Ns.x)+i.y*Math.abs(Ns.y)+i.z*Math.abs(Ns.z),c=e.dot(Ns),l=t.dot(Ns),h=n.dot(Ns);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var rp=new pi,ua=new k,Gc=new k,bn=class{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):rp.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ua.subVectors(e,this.center);let t=ua.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ua,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ua.copy(e.center).add(Gc)),this.expandByPoint(ua.copy(e.center).sub(Gc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},qi=new k,Hc=new k,io=new k,ms=new k,zc=new k,so=new k,Vc=new k,Hr=class{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=qi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qi.copy(this.origin).addScaledVector(this.direction,t),qi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Hc.copy(e).add(t).multiplyScalar(.5),io.copy(t).sub(e).normalize(),ms.copy(this.origin).sub(Hc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(io),o=ms.dot(this.direction),c=-ms.dot(io),l=ms.lengthSq(),h=Math.abs(1-a*a),u,f,A,m;if(h>0)if(u=a*c-o,f=a*o-c,m=r*h,u>=0)if(f>=-m)if(f<=m){let g=1/h;u*=g,f*=g,A=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),A=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),A=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),A=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),A=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),A=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),A=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Hc).addScaledVector(io,f),A}intersectSphere(e,t){qi.subVectors(e.center,this.origin);let n=qi.dot(this.direction),i=qi.dot(qi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,qi)!==null}intersectTriangle(e,t,n,i,r){zc.subVectors(t,e),so.subVectors(n,e),Vc.crossVectors(zc,so);let a=this.direction.dot(Vc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ms.subVectors(this.origin,e);let c=o*this.direction.dot(so.crossVectors(ms,so));if(c<0)return null;let l=o*this.direction.dot(zc.cross(ms));if(l<0||c+l>a)return null;let h=-o*ms.dot(Vc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},dt=class s{constructor(e,t,n,i,r,a,o,c,l,h,u,f,A,m,g,p){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,u,f,A,m,g,p)}set(e,t,n,i,r,a,o,c,l,h,u,f,A,m,g,p){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=i,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=A,d[7]=m,d[11]=g,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/pr.setFromMatrixColumn(e,0).length(),r=1/pr.setFromMatrixColumn(e,1).length(),a=1/pr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=a*h,A=a*u,m=o*h,g=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=A+m*l,t[5]=f-g*l,t[9]=-o*c,t[2]=g-f*l,t[6]=m+A*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*h,A=c*u,m=l*h,g=l*u;t[0]=f+g*o,t[4]=m*o-A,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=A*o-m,t[6]=g+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*h,A=c*u,m=l*h,g=l*u;t[0]=f-g*o,t[4]=-a*u,t[8]=m+A*o,t[1]=A+m*o,t[5]=a*h,t[9]=g-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*h,A=a*u,m=o*h,g=o*u;t[0]=c*h,t[4]=m*l-A,t[8]=f*l+g,t[1]=c*u,t[5]=g*l+f,t[9]=A*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,A=a*l,m=o*c,g=o*l;t[0]=c*h,t[4]=g-f*u,t[8]=m*u+A,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=A*u+m,t[10]=f-g*u}else if(e.order==="XZY"){let f=a*c,A=a*l,m=o*c,g=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+g,t[5]=a*h,t[9]=A*u-m,t[2]=m*u-A,t[6]=o*h,t[10]=g*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ap,e,op)}lookAt(e,t,n){let i=this.elements;return oi.subVectors(e,t),oi.lengthSq()===0&&(oi.z=1),oi.normalize(),gs.crossVectors(n,oi),gs.lengthSq()===0&&(Math.abs(n.z)===1?oi.x+=1e-4:oi.z+=1e-4,oi.normalize(),gs.crossVectors(n,oi)),gs.normalize(),ro.crossVectors(oi,gs),i[0]=gs.x,i[4]=ro.x,i[8]=oi.x,i[1]=gs.y,i[5]=ro.y,i[9]=oi.y,i[2]=gs.z,i[6]=ro.z,i[10]=oi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],A=n[13],m=n[2],g=n[6],p=n[10],d=n[14],x=n[3],E=n[7],T=n[11],N=n[15],L=i[0],F=i[4],J=i[8],S=i[12],P=i[1],X=i[5],re=i[9],xe=i[13],G=i[2],Y=i[6],ce=i[10],pe=i[14],ue=i[3],Ae=i[7],me=i[11],ye=i[15];return r[0]=a*L+o*P+c*G+l*ue,r[4]=a*F+o*X+c*Y+l*Ae,r[8]=a*J+o*re+c*ce+l*me,r[12]=a*S+o*xe+c*pe+l*ye,r[1]=h*L+u*P+f*G+A*ue,r[5]=h*F+u*X+f*Y+A*Ae,r[9]=h*J+u*re+f*ce+A*me,r[13]=h*S+u*xe+f*pe+A*ye,r[2]=m*L+g*P+p*G+d*ue,r[6]=m*F+g*X+p*Y+d*Ae,r[10]=m*J+g*re+p*ce+d*me,r[14]=m*S+g*xe+p*pe+d*ye,r[3]=x*L+E*P+T*G+N*ue,r[7]=x*F+E*X+T*Y+N*Ae,r[11]=x*J+E*re+T*ce+N*me,r[15]=x*S+E*xe+T*pe+N*ye,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],A=e[14],m=e[3],g=e[7],p=e[11],d=e[15];return m*(+r*c*u-i*l*u-r*o*f+n*l*f+i*o*A-n*c*A)+g*(+t*c*A-t*l*f+r*a*f-i*a*A+i*l*h-r*c*h)+p*(+t*l*u-t*o*A-r*a*u+n*a*A+r*o*h-n*l*h)+d*(-i*o*h-t*c*u+t*o*f+i*a*u-n*a*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],A=e[11],m=e[12],g=e[13],p=e[14],d=e[15],x=u*p*l-g*f*l+g*c*A-o*p*A-u*c*d+o*f*d,E=m*f*l-h*p*l-m*c*A+a*p*A+h*c*d-a*f*d,T=h*g*l-m*u*l+m*o*A-a*g*A-h*o*d+a*u*d,N=m*u*c-h*g*c-m*o*f+a*g*f+h*o*p-a*u*p,L=t*x+n*E+i*T+r*N;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/L;return e[0]=x*F,e[1]=(g*f*r-u*p*r-g*i*A+n*p*A+u*i*d-n*f*d)*F,e[2]=(o*p*r-g*c*r+g*i*l-n*p*l-o*i*d+n*c*d)*F,e[3]=(u*c*r-o*f*r-u*i*l+n*f*l+o*i*A-n*c*A)*F,e[4]=E*F,e[5]=(h*p*r-m*f*r+m*i*A-t*p*A-h*i*d+t*f*d)*F,e[6]=(m*c*r-a*p*r-m*i*l+t*p*l+a*i*d-t*c*d)*F,e[7]=(a*f*r-h*c*r+h*i*l-t*f*l-a*i*A+t*c*A)*F,e[8]=T*F,e[9]=(m*u*r-h*g*r-m*n*A+t*g*A+h*n*d-t*u*d)*F,e[10]=(a*g*r-m*o*r+m*n*l-t*g*l-a*n*d+t*o*d)*F,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*A-t*o*A)*F,e[12]=N*F,e[13]=(h*g*i-m*u*i+m*n*f-t*g*f-h*n*p+t*u*p)*F,e[14]=(m*o*i-a*g*i-m*n*c+t*g*c+a*n*p-t*o*p)*F,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*f+t*o*f)*F,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,f=r*l,A=r*h,m=r*u,g=a*h,p=a*u,d=o*u,x=c*l,E=c*h,T=c*u,N=n.x,L=n.y,F=n.z;return i[0]=(1-(g+d))*N,i[1]=(A+T)*N,i[2]=(m-E)*N,i[3]=0,i[4]=(A-T)*L,i[5]=(1-(f+d))*L,i[6]=(p+x)*L,i[7]=0,i[8]=(m+E)*F,i[9]=(p-x)*F,i[10]=(1-(f+g))*F,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=pr.set(i[0],i[1],i[2]).length(),a=pr.set(i[4],i[5],i[6]).length(),o=pr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],wi.copy(this);let l=1/r,h=1/a,u=1/o;return wi.elements[0]*=l,wi.elements[1]*=l,wi.elements[2]*=l,wi.elements[4]*=h,wi.elements[5]*=h,wi.elements[6]*=h,wi.elements[8]*=u,wi.elements[9]*=u,wi.elements[10]*=u,t.setFromRotationMatrix(wi),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=es){let c=this.elements,l=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),A,m;if(o===es)A=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===zo)A=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=A,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=es){let c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(a-r),f=(t+e)*l,A=(n+i)*h,m,g;if(o===es)m=(a+r)*u,g=-2*u;else if(o===zo)m=r*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-A,c[2]=0,c[6]=0,c[10]=g,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},pr=new k,wi=new dt,ap=new k(0,0,0),op=new k(1,1,1),gs=new k,ro=new k,oi=new k,wu=new dt,Iu=new Fn,zr=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],f=i[6],A=i[10];switch(t){case"XYZ":this._y=Math.asin(Qn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,A),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,A),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,A),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,A),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Qn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,A));break;case"XZY":this._z=Math.asin(-Qn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,A),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Iu.setFromEuler(this),this.setFromQuaternion(Iu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zr.DEFAULT_ORDER="XYZ";var Xo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},cp=0,Tu=new k,mr=new Fn,Xi=new dt,ao=new k,fa=new k,lp=new k,hp=new Fn,Bu=new k(1,0,0),Ru=new k(0,1,0),Du=new k(0,0,1),up={type:"added"},fp={type:"removed"},nn=class s extends ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=Ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new k,t=new zr,n=new Fn,i=new k(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new dt},normalMatrix:{value:new Bt}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mr.setFromAxisAngle(e,t),this.quaternion.multiply(mr),this}rotateOnWorldAxis(e,t){return mr.setFromAxisAngle(e,t),this.quaternion.premultiply(mr),this}rotateX(e){return this.rotateOnAxis(Bu,e)}rotateY(e){return this.rotateOnAxis(Ru,e)}rotateZ(e){return this.rotateOnAxis(Du,e)}translateOnAxis(e,t){return Tu.copy(e).applyQuaternion(this.quaternion),this.position.add(Tu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Bu,e)}translateY(e){return this.translateOnAxis(Ru,e)}translateZ(e){return this.translateOnAxis(Du,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ao.copy(e):ao.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),fa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xi.lookAt(fa,ao,this.up):Xi.lookAt(ao,fa,this.up),this.quaternion.setFromRotationMatrix(Xi),i&&(Xi.extractRotation(i.matrixWorld),mr.setFromRotationMatrix(Xi),this.quaternion.premultiply(mr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(up)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(fp)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fa,e,lp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fa,hp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,a=i.length;r<a;r++){let o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),A=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),A.length>0&&(n.animations=A),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};nn.DEFAULT_UP=new k(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ii=new k,Yi=new k,Wc=new k,Ji=new k,gr=new k,_r=new k,Lu=new k,Kc=new k,qc=new k,Xc=new k,oo=!1,zs=class s{constructor(e=new k,t=new k,n=new k){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ii.subVectors(e,t),i.cross(Ii);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Ii.subVectors(i,t),Yi.subVectors(n,t),Wc.subVectors(e,t);let a=Ii.dot(Ii),o=Ii.dot(Yi),c=Ii.dot(Wc),l=Yi.dot(Yi),h=Yi.dot(Wc),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,A=(l*c-o*h)*f,m=(a*h-o*c)*f;return r.set(1-A-m,m,A)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ji)===null?!1:Ji.x>=0&&Ji.y>=0&&Ji.x+Ji.y<=1}static getUV(e,t,n,i,r,a,o,c){return oo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),oo=!0),this.getInterpolation(e,t,n,i,r,a,o,c)}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,Ji)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ji.x),c.addScaledVector(a,Ji.y),c.addScaledVector(o,Ji.z),c)}static isFrontFacing(e,t,n,i){return Ii.subVectors(n,t),Yi.subVectors(e,t),Ii.cross(Yi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ii.subVectors(this.c,this.b),Yi.subVectors(this.a,this.b),Ii.cross(Yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return oo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),oo=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;gr.subVectors(i,n),_r.subVectors(r,n),Kc.subVectors(e,n);let c=gr.dot(Kc),l=_r.dot(Kc);if(c<=0&&l<=0)return t.copy(n);qc.subVectors(e,i);let h=gr.dot(qc),u=_r.dot(qc);if(h>=0&&u<=h)return t.copy(i);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(gr,a);Xc.subVectors(e,r);let A=gr.dot(Xc),m=_r.dot(Xc);if(m>=0&&A<=m)return t.copy(r);let g=A*l-c*m;if(g<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(_r,o);let p=h*m-A*u;if(p<=0&&u-h>=0&&A-m>=0)return Lu.subVectors(r,i),o=(u-h)/(u-h+(A-m)),t.copy(i).addScaledVector(Lu,o);let d=1/(p+g+f);return a=g*d,o=f*d,t.copy(n).addScaledVector(gr,a).addScaledVector(_r,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_s={h:0,s:0,l:0},co={h:0,s:0,l:0};function Yc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Ge=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Gt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Gt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Gt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Gt.workingColorSpace){if(e=jl(e,1),t=Qn(t,0,1),n=Qn(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Yc(a,r,e+1/3),this.g=Yc(a,r,e),this.b=Yc(a,r,e-1/3)}return Gt.toWorkingColorSpace(this,i),this}setStyle(e,t=kt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){let n=Qf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ur(e.r),this.g=Ur(e.g),this.b=Ur(e.b),this}copyLinearToSRGB(e){return this.r=Nc(e.r),this.g=Nc(e.g),this.b=Nc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return Gt.fromWorkingColorSpace(Wn.copy(this),e),Math.round(Qn(Wn.r*255,0,255))*65536+Math.round(Qn(Wn.g*255,0,255))*256+Math.round(Qn(Wn.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Gt.workingColorSpace){Gt.fromWorkingColorSpace(Wn.copy(this),t);let n=Wn.r,i=Wn.g,r=Wn.b,a=Math.max(n,i,r),o=Math.min(n,i,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Gt.workingColorSpace){return Gt.fromWorkingColorSpace(Wn.copy(this),t),e.r=Wn.r,e.g=Wn.g,e.b=Wn.b,e}getStyle(e=kt){Gt.fromWorkingColorSpace(Wn.copy(this),e);let t=Wn.r,n=Wn.g,i=Wn.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(_s),this.setHSL(_s.h+e,_s.s+t,_s.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_s),e.getHSL(co);let n=Sa(_s.h,co.h,t),i=Sa(_s.s,co.s,t),r=Sa(_s.l,co.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Wn=new Ge;Ge.NAMES=Qf;var dp=0,Jn=class extends ts{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Ti(),this.name="",this.type="Material",this.blending=Fr,this.side=ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hl,this.blendDst=ul,this.blendEquation=Gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=Do,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Eu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hr,this.stencilZFail=hr,this.stencilZPass=hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fr&&(n.blending=this.blending),this.side!==ki&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==hl&&(n.blendSrc=this.blendSrc),this.blendDst!==ul&&(n.blendDst=this.blendDst),this.blendEquation!==Gs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Do&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Eu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==hr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==hr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},un=class extends Jn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Sn=new k,lo=new Je,Dt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Al,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)lo.fromBufferAttribute(this,t),lo.applyMatrix3(e),this.setXY(t,lo.x,lo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyMatrix3(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyMatrix4(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyNormalMatrix(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.transformDirection(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Oi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Oi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Oi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Oi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Oi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),i=Jt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),i=Jt(i,this.array),r=Jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Al&&(e.usage=this.usage),e}};var Vr=class extends Dt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Yo=class extends Dt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Lt=class extends Dt{constructor(e,t,n){super(new Float32Array(e),t,n)}};var Ap=0,di=new dt,Jc=new nn,br=new k,ci=new pi,da=new pi,Ln=new k,sn=class s extends ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ap++}),this.uuid=Ti(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kf(e)?Yo:Vr)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Bt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return di.makeRotationFromQuaternion(e),this.applyMatrix4(di),this}rotateX(e){return di.makeRotationX(e),this.applyMatrix4(di),this}rotateY(e){return di.makeRotationY(e),this.applyMatrix4(di),this}rotateZ(e){return di.makeRotationZ(e),this.applyMatrix4(di),this}translate(e,t,n){return di.makeTranslation(e,t,n),this.applyMatrix4(di),this}scale(e,t,n){return di.makeScale(e,t,n),this.applyMatrix4(di),this}lookAt(e){return Jc.lookAt(e),Jc.updateMatrix(),this.applyMatrix4(Jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(br).negate(),this.translate(br.x,br.y,br.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Lt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];ci.setFromBufferAttribute(r),this.morphTargetsRelative?(Ln.addVectors(this.boundingBox.min,ci.min),this.boundingBox.expandByPoint(Ln),Ln.addVectors(this.boundingBox.max,ci.max),this.boundingBox.expandByPoint(Ln)):(this.boundingBox.expandByPoint(ci.min),this.boundingBox.expandByPoint(ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new k,1/0);return}if(e){let n=this.boundingSphere.center;if(ci.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];da.setFromBufferAttribute(o),this.morphTargetsRelative?(Ln.addVectors(ci.min,da.min),ci.expandByPoint(Ln),Ln.addVectors(ci.max,da.max),ci.expandByPoint(Ln)):(ci.expandByPoint(da.min),ci.expandByPoint(da.max))}ci.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Ln.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Ln));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ln.fromBufferAttribute(o,l),c&&(br.fromBufferAttribute(e,l),Ln.add(br)),i=Math.max(i,n.distanceToSquared(Ln))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Dt(new Float32Array(4*o),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let P=0;P<o;P++)l[P]=new k,h[P]=new k;let u=new k,f=new k,A=new k,m=new Je,g=new Je,p=new Je,d=new k,x=new k;function E(P,X,re){u.fromArray(i,P*3),f.fromArray(i,X*3),A.fromArray(i,re*3),m.fromArray(a,P*2),g.fromArray(a,X*2),p.fromArray(a,re*2),f.sub(u),A.sub(u),g.sub(m),p.sub(m);let xe=1/(g.x*p.y-p.x*g.y);isFinite(xe)&&(d.copy(f).multiplyScalar(p.y).addScaledVector(A,-g.y).multiplyScalar(xe),x.copy(A).multiplyScalar(g.x).addScaledVector(f,-p.x).multiplyScalar(xe),l[P].add(d),l[X].add(d),l[re].add(d),h[P].add(x),h[X].add(x),h[re].add(x))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let P=0,X=T.length;P<X;++P){let re=T[P],xe=re.start,G=re.count;for(let Y=xe,ce=xe+G;Y<ce;Y+=3)E(n[Y+0],n[Y+1],n[Y+2])}let N=new k,L=new k,F=new k,J=new k;function S(P){F.fromArray(r,P*3),J.copy(F);let X=l[P];N.copy(X),N.sub(F.multiplyScalar(F.dot(X))).normalize(),L.crossVectors(J,X);let xe=L.dot(h[P])<0?-1:1;c[P*4]=N.x,c[P*4+1]=N.y,c[P*4+2]=N.z,c[P*4+3]=xe}for(let P=0,X=T.length;P<X;++P){let re=T[P],xe=re.start,G=re.count;for(let Y=xe,ce=xe+G;Y<ce;Y+=3)S(n[Y+0]),S(n[Y+1]),S(n[Y+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Dt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,A=n.count;f<A;f++)n.setXYZ(f,0,0,0);let i=new k,r=new k,a=new k,o=new k,c=new k,l=new k,h=new k,u=new k;if(e)for(let f=0,A=e.count;f<A;f+=3){let m=e.getX(f+0),g=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,A=t.count;f<A;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ln.fromBufferAttribute(e,t),Ln.normalize(),e.setXYZ(t,Ln.x,Ln.y,Ln.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),A=0,m=0;for(let g=0,p=c.length;g<p;g++){o.isInterleavedBufferAttribute?A=c[g]*o.data.stride+o.offset:A=c[g]*h;for(let d=0;d<h;d++)f[m++]=l[A++]}return new Dt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],A=e(f,n);c.push(A)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let A=l[u];h.push(A.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,A=u.length;f<A;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pu=new dt,Os=new Hr,ho=new bn,Fu=new k,Er=new k,xr=new k,yr=new k,jc=new k,uo=new k,fo=new Je,Ao=new Je,po=new Je,Uu=new k,Nu=new k,Ou=new k,mo=new k,go=new k,Ke=class extends nn{constructor(e=new sn,t=new un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){uo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(jc.fromBufferAttribute(u,e),a?uo.addScaledVector(jc,h):uo.addScaledVector(jc.sub(t),h))}t.add(uo)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere),ho.applyMatrix4(r),Os.copy(e.ray).recast(e.near),!(ho.containsPoint(Os.origin)===!1&&(Os.intersectSphere(ho,Fu)===null||Os.origin.distanceToSquared(Fu)>(e.far-e.near)**2))&&(Pu.copy(r).invert(),Os.copy(e.ray).applyMatrix4(Pu),!(n.boundingBox!==null&&Os.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Os)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,A=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,g=f.length;m<g;m++){let p=f[m],d=a[p.materialIndex],x=Math.max(p.start,A.start),E=Math.min(o.count,Math.min(p.start+p.count,A.start+A.count));for(let T=x,N=E;T<N;T+=3){let L=o.getX(T),F=o.getX(T+1),J=o.getX(T+2);i=_o(this,d,e,n,l,h,u,L,F,J),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let m=Math.max(0,A.start),g=Math.min(o.count,A.start+A.count);for(let p=m,d=g;p<d;p+=3){let x=o.getX(p),E=o.getX(p+1),T=o.getX(p+2);i=_o(this,a,e,n,l,h,u,x,E,T),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,g=f.length;m<g;m++){let p=f[m],d=a[p.materialIndex],x=Math.max(p.start,A.start),E=Math.min(c.count,Math.min(p.start+p.count,A.start+A.count));for(let T=x,N=E;T<N;T+=3){let L=T,F=T+1,J=T+2;i=_o(this,d,e,n,l,h,u,L,F,J),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let m=Math.max(0,A.start),g=Math.min(c.count,A.start+A.count);for(let p=m,d=g;p<d;p+=3){let x=p,E=p+1,T=p+2;i=_o(this,a,e,n,l,h,u,x,E,T),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}};function pp(s,e,t,n,i,r,a,o){let c;if(e.side===Pn?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===ki,o),c===null)return null;go.copy(o),go.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(go);return l<t.near||l>t.far?null:{distance:l,point:go.clone(),object:s}}function _o(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,Er),s.getVertexPosition(c,xr),s.getVertexPosition(l,yr);let h=pp(s,e,t,n,Er,xr,yr,mo);if(h){i&&(fo.fromBufferAttribute(i,o),Ao.fromBufferAttribute(i,c),po.fromBufferAttribute(i,l),h.uv=zs.getInterpolation(mo,Er,xr,yr,fo,Ao,po,new Je)),r&&(fo.fromBufferAttribute(r,o),Ao.fromBufferAttribute(r,c),po.fromBufferAttribute(r,l),h.uv1=zs.getInterpolation(mo,Er,xr,yr,fo,Ao,po,new Je),h.uv2=h.uv1),a&&(Uu.fromBufferAttribute(a,o),Nu.fromBufferAttribute(a,c),Ou.fromBufferAttribute(a,l),h.normal=zs.getInterpolation(mo,Er,xr,yr,Uu,Nu,Ou,new k),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new k,materialIndex:0};zs.getNormal(Er,xr,yr,u.normal),h.face=u}return h}var fn=class s extends sn{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,A=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Lt(l,3)),this.setAttribute("normal",new Lt(h,3)),this.setAttribute("uv",new Lt(u,2));function m(g,p,d,x,E,T,N,L,F,J,S){let P=T/F,X=N/J,re=T/2,xe=N/2,G=L/2,Y=F+1,ce=J+1,pe=0,ue=0,Ae=new k;for(let me=0;me<ce;me++){let ye=me*X-xe;for(let Ue=0;Ue<Y;Ue++){let oe=Ue*P-re;Ae[g]=oe*x,Ae[p]=ye*E,Ae[d]=G,l.push(Ae.x,Ae.y,Ae.z),Ae[g]=0,Ae[p]=0,Ae[d]=L>0?1:-1,h.push(Ae.x,Ae.y,Ae.z),u.push(Ue/F),u.push(1-me/J),pe+=1}}for(let me=0;me<J;me++)for(let ye=0;ye<F;ye++){let Ue=f+ye+Y*me,oe=f+ye+Y*(me+1),w=f+(ye+1)+Y*(me+1),H=f+(ye+1)+Y*me;c.push(Ue,oe,H),c.push(oe,w,H),ue+=6}o.addGroup(A,ue,S),A+=ue,f+=pe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Wr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Xn(s){let e={};for(let t=0;t<s.length;t++){let n=Wr(s[t]);for(let i in n)e[i]=n[i]}return e}function mp(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Gf(s){return s.getRenderTarget()===null?s.outputColorSpace:Gt.workingColorSpace}var gp={clone:Wr,merge:Xn},_p=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,jn=class extends Jn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_p,this.fragmentShader=bp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wr(e.uniforms),this.uniformsGroups=mp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Jo=class extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=es}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},pn=class extends Jo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Gr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ma*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gr*2*Math.atan(Math.tan(Ma*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ma*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},vr=-90,Mr=1,_l=class extends nn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new pn(vr,Mr,e,t);i.layers=this.layers,this.add(i);let r=new pn(vr,Mr,e,t);r.layers=this.layers,this.add(r);let a=new pn(vr,Mr,e,t);a.layers=this.layers,this.add(a);let o=new pn(vr,Mr,e,t);o.layers=this.layers,this.add(o);let c=new pn(vr,Mr,e,t);c.layers=this.layers,this.add(c);let l=new pn(vr,Mr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===es)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===zo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),A=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,f,A),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},jo=class extends Un{constructor(e,t,n,i,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:qs,super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},bl=class extends si{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Ca("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ks?kt:Yn),this.texture=new jo(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:An}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new fn(5,5,5),r=new jn({name:"CubemapFromEquirect",uniforms:Wr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pn,blending:xs});r.uniforms.tEquirect.value=t;let a=new Ke(i,r),o=t.minFilter;return t.minFilter===Ai&&(t.minFilter=An),new _l(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}},Zc=new k,Ep=new k,xp=new Bt,$i=class{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Zc.subVectors(n,t).cross(Ep.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Zc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||xp.getNormalMatrix(e),i=this.coplanarPoint(Zc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ks=new bn,bo=new k,Da=class{constructor(e=new $i,t=new $i,n=new $i,i=new $i,r=new $i,a=new $i){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=es){let n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],h=i[5],u=i[6],f=i[7],A=i[8],m=i[9],g=i[10],p=i[11],d=i[12],x=i[13],E=i[14],T=i[15];if(n[0].setComponents(c-r,f-l,p-A,T-d).normalize(),n[1].setComponents(c+r,f+l,p+A,T+d).normalize(),n[2].setComponents(c+a,f+h,p+m,T+x).normalize(),n[3].setComponents(c-a,f-h,p-m,T-x).normalize(),n[4].setComponents(c-o,f-u,p-g,T-E).normalize(),t===es)n[5].setComponents(c+o,f+u,p+g,T+E).normalize();else if(t===zo)n[5].setComponents(o,u,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ks.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ks.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ks)}intersectsSprite(e){return ks.center.set(0,0,0),ks.radius=.7071067811865476,ks.applyMatrix4(e.matrixWorld),this.intersectsSphere(ks)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(bo.x=i.normal.x>0?e.max.x:e.min.x,bo.y=i.normal.y>0?e.max.y:e.min.y,bo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(bo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Hf(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function yp(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,h){let u=l.array,f=l.usage,A=u.byteLength,m=s.createBuffer();s.bindBuffer(h,m),s.bufferData(h,u,f),l.onUploadCallback();let g;if(u instanceof Float32Array)g=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)g=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=s.SHORT;else if(u instanceof Uint32Array)g=s.UNSIGNED_INT;else if(u instanceof Int32Array)g=s.INT;else if(u instanceof Int8Array)g=s.BYTE;else if(u instanceof Uint8Array)g=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:A}}function r(l,h,u){let f=h.array,A=h._updateRange,m=h.updateRanges;if(s.bindBuffer(u,l),A.count===-1&&m.length===0&&s.bufferSubData(u,0,f),m.length!==0){for(let g=0,p=m.length;g<p;g++){let d=m[g];t?s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}A.count!==-1&&(t?s.bufferSubData(u,A.offset*f.BYTES_PER_ELEMENT,f,A.offset,A.count):s.bufferSubData(u,A.offset*f.BYTES_PER_ELEMENT,f.subarray(A.offset,A.offset+A.count)),A.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:a,remove:o,update:c}}var mi=class s extends sn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,f=t/c,A=[],m=[],g=[],p=[];for(let d=0;d<h;d++){let x=d*f-a;for(let E=0;E<l;E++){let T=E*u-r;m.push(T,-x,0),g.push(0,0,1),p.push(E/o),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let x=0;x<o;x++){let E=x+l*d,T=x+l*(d+1),N=x+1+l*(d+1),L=x+1+l*d;A.push(E,T,L),A.push(T,N,L)}this.setIndex(A),this.setAttribute("position",new Lt(m,3)),this.setAttribute("normal",new Lt(g,3)),this.setAttribute("uv",new Lt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},vp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Sp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wp=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ip=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rp=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Dp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Lp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Up=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Np=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Op=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Wp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Kp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Xp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$p="gl_FragColor = linearToOutputTexel( gl_FragColor );",em=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,tm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,im=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,am=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,om=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,um=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,fm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Am=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,mm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_m=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Em=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ym=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,vm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Im=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Tm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Bm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Dm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Lm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Um=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Om=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,km=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Qm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Hm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Km=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Zm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$m=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,eg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ng=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ig=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,rg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ag=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,og=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ug=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,fg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ag=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,mg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_g=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,xg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,yg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ig=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Tg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Bg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Rg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ug=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ng=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Og=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,zg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Vg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$g=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,e0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,t0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ct={alphahash_fragment:vp,alphahash_pars_fragment:Mp,alphamap_fragment:Sp,alphamap_pars_fragment:Cp,alphatest_fragment:wp,alphatest_pars_fragment:Ip,aomap_fragment:Tp,aomap_pars_fragment:Bp,batching_pars_vertex:Rp,batching_vertex:Dp,begin_vertex:Lp,beginnormal_vertex:Pp,bsdfs:Fp,iridescence_fragment:Up,bumpmap_pars_fragment:Np,clipping_planes_fragment:Op,clipping_planes_pars_fragment:kp,clipping_planes_pars_vertex:Qp,clipping_planes_vertex:Gp,color_fragment:Hp,color_pars_fragment:zp,color_pars_vertex:Vp,color_vertex:Wp,common:Kp,cube_uv_reflection_fragment:qp,defaultnormal_vertex:Xp,displacementmap_pars_vertex:Yp,displacementmap_vertex:Jp,emissivemap_fragment:jp,emissivemap_pars_fragment:Zp,colorspace_fragment:$p,colorspace_pars_fragment:em,envmap_fragment:tm,envmap_common_pars_fragment:nm,envmap_pars_fragment:im,envmap_pars_vertex:sm,envmap_physical_pars_fragment:mm,envmap_vertex:rm,fog_vertex:am,fog_pars_vertex:om,fog_fragment:cm,fog_pars_fragment:lm,gradientmap_pars_fragment:hm,lightmap_fragment:um,lightmap_pars_fragment:fm,lights_lambert_fragment:dm,lights_lambert_pars_fragment:Am,lights_pars_begin:pm,lights_toon_fragment:gm,lights_toon_pars_fragment:_m,lights_phong_fragment:bm,lights_phong_pars_fragment:Em,lights_physical_fragment:xm,lights_physical_pars_fragment:ym,lights_fragment_begin:vm,lights_fragment_maps:Mm,lights_fragment_end:Sm,logdepthbuf_fragment:Cm,logdepthbuf_pars_fragment:wm,logdepthbuf_pars_vertex:Im,logdepthbuf_vertex:Tm,map_fragment:Bm,map_pars_fragment:Rm,map_particle_fragment:Dm,map_particle_pars_fragment:Lm,metalnessmap_fragment:Pm,metalnessmap_pars_fragment:Fm,morphcolor_vertex:Um,morphnormal_vertex:Nm,morphtarget_pars_vertex:Om,morphtarget_vertex:km,normal_fragment_begin:Qm,normal_fragment_maps:Gm,normal_pars_fragment:Hm,normal_pars_vertex:zm,normal_vertex:Vm,normalmap_pars_fragment:Wm,clearcoat_normal_fragment_begin:Km,clearcoat_normal_fragment_maps:qm,clearcoat_pars_fragment:Xm,iridescence_pars_fragment:Ym,opaque_fragment:Jm,packing:jm,premultiplied_alpha_fragment:Zm,project_vertex:$m,dithering_fragment:eg,dithering_pars_fragment:tg,roughnessmap_fragment:ng,roughnessmap_pars_fragment:ig,shadowmap_pars_fragment:sg,shadowmap_pars_vertex:rg,shadowmap_vertex:ag,shadowmask_pars_fragment:og,skinbase_vertex:cg,skinning_pars_vertex:lg,skinning_vertex:hg,skinnormal_vertex:ug,specularmap_fragment:fg,specularmap_pars_fragment:dg,tonemapping_fragment:Ag,tonemapping_pars_fragment:pg,transmission_fragment:mg,transmission_pars_fragment:gg,uv_pars_fragment:_g,uv_pars_vertex:bg,uv_vertex:Eg,worldpos_vertex:xg,background_vert:yg,background_frag:vg,backgroundCube_vert:Mg,backgroundCube_frag:Sg,cube_vert:Cg,cube_frag:wg,depth_vert:Ig,depth_frag:Tg,distanceRGBA_vert:Bg,distanceRGBA_frag:Rg,equirect_vert:Dg,equirect_frag:Lg,linedashed_vert:Pg,linedashed_frag:Fg,meshbasic_vert:Ug,meshbasic_frag:Ng,meshlambert_vert:Og,meshlambert_frag:kg,meshmatcap_vert:Qg,meshmatcap_frag:Gg,meshnormal_vert:Hg,meshnormal_frag:zg,meshphong_vert:Vg,meshphong_frag:Wg,meshphysical_vert:Kg,meshphysical_frag:qg,meshtoon_vert:Xg,meshtoon_frag:Yg,points_vert:Jg,points_frag:jg,shadow_vert:Zg,shadow_frag:$g,sprite_vert:e0,sprite_frag:t0},Le={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new Je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new Je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},Ni={basic:{uniforms:Xn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.fog]),vertexShader:Ct.meshbasic_vert,fragmentShader:Ct.meshbasic_frag},lambert:{uniforms:Xn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ct.meshlambert_vert,fragmentShader:Ct.meshlambert_frag},phong:{uniforms:Xn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30}}]),vertexShader:Ct.meshphong_vert,fragmentShader:Ct.meshphong_frag},standard:{uniforms:Xn([Le.common,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.roughnessmap,Le.metalnessmap,Le.fog,Le.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ct.meshphysical_vert,fragmentShader:Ct.meshphysical_frag},toon:{uniforms:Xn([Le.common,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.gradientmap,Le.fog,Le.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ct.meshtoon_vert,fragmentShader:Ct.meshtoon_frag},matcap:{uniforms:Xn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,{matcap:{value:null}}]),vertexShader:Ct.meshmatcap_vert,fragmentShader:Ct.meshmatcap_frag},points:{uniforms:Xn([Le.points,Le.fog]),vertexShader:Ct.points_vert,fragmentShader:Ct.points_frag},dashed:{uniforms:Xn([Le.common,Le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ct.linedashed_vert,fragmentShader:Ct.linedashed_frag},depth:{uniforms:Xn([Le.common,Le.displacementmap]),vertexShader:Ct.depth_vert,fragmentShader:Ct.depth_frag},normal:{uniforms:Xn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,{opacity:{value:1}}]),vertexShader:Ct.meshnormal_vert,fragmentShader:Ct.meshnormal_frag},sprite:{uniforms:Xn([Le.sprite,Le.fog]),vertexShader:Ct.sprite_vert,fragmentShader:Ct.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ct.background_vert,fragmentShader:Ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ct.backgroundCube_vert,fragmentShader:Ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ct.cube_vert,fragmentShader:Ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ct.equirect_vert,fragmentShader:Ct.equirect_frag},distanceRGBA:{uniforms:Xn([Le.common,Le.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ct.distanceRGBA_vert,fragmentShader:Ct.distanceRGBA_frag},shadow:{uniforms:Xn([Le.lights,Le.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:Ct.shadow_vert,fragmentShader:Ct.shadow_frag}};Ni.physical={uniforms:Xn([Ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new Je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new Je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new Je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Ct.meshphysical_vert,fragmentShader:Ct.meshphysical_frag};var Eo={r:0,b:0,g:0};function n0(s,e,t,n,i,r,a){let o=new Ge(0),c=r===!0?0:1,l,h,u=null,f=0,A=null;function m(p,d){let x=!1,E=d.isScene===!0?d.background:null;E&&E.isTexture&&(E=(d.backgroundBlurriness>0?t:e).get(E)),E===null?g(o,c):E&&E.isColor&&(g(E,1),x=!0);let T=s.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),E&&(E.isCubeTexture||E.mapping===Ac)?(h===void 0&&(h=new Ke(new fn(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:Wr(Ni.backgroundCube.uniforms),vertexShader:Ni.backgroundCube.vertexShader,fragmentShader:Ni.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(N,L,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=Gt.getTransfer(E.colorSpace)!==an,(u!==E||f!==E.version||A!==s.toneMapping)&&(h.material.needsUpdate=!0,u=E,f=E.version,A=s.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new Ke(new mi(2,2),new jn({name:"BackgroundMaterial",uniforms:Wr(Ni.background.uniforms),vertexShader:Ni.background.vertexShader,fragmentShader:Ni.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,l.material.toneMapped=Gt.getTransfer(E.colorSpace)!==an,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||f!==E.version||A!==s.toneMapping)&&(l.material.needsUpdate=!0,u=E,f=E.version,A=s.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function g(p,d){p.getRGB(Eo,Gf(s)),n.buffers.color.setClear(Eo.r,Eo.g,Eo.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(p,d=1){o.set(p),c=d,g(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,g(o,c)},render:m}}function i0(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=p(null),l=c,h=!1;function u(G,Y,ce,pe,ue){let Ae=!1;if(a){let me=g(pe,ce,Y);l!==me&&(l=me,A(l.object)),Ae=d(G,pe,ce,ue),Ae&&x(G,pe,ce,ue)}else{let me=Y.wireframe===!0;(l.geometry!==pe.id||l.program!==ce.id||l.wireframe!==me)&&(l.geometry=pe.id,l.program=ce.id,l.wireframe=me,Ae=!0)}ue!==null&&t.update(ue,s.ELEMENT_ARRAY_BUFFER),(Ae||h)&&(h=!1,J(G,Y,ce,pe),ue!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(ue).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function A(G){return n.isWebGL2?s.bindVertexArray(G):r.bindVertexArrayOES(G)}function m(G){return n.isWebGL2?s.deleteVertexArray(G):r.deleteVertexArrayOES(G)}function g(G,Y,ce){let pe=ce.wireframe===!0,ue=o[G.id];ue===void 0&&(ue={},o[G.id]=ue);let Ae=ue[Y.id];Ae===void 0&&(Ae={},ue[Y.id]=Ae);let me=Ae[pe];return me===void 0&&(me=p(f()),Ae[pe]=me),me}function p(G){let Y=[],ce=[],pe=[];for(let ue=0;ue<i;ue++)Y[ue]=0,ce[ue]=0,pe[ue]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:ce,attributeDivisors:pe,object:G,attributes:{},index:null}}function d(G,Y,ce,pe){let ue=l.attributes,Ae=Y.attributes,me=0,ye=ce.getAttributes();for(let Ue in ye)if(ye[Ue].location>=0){let w=ue[Ue],H=Ae[Ue];if(H===void 0&&(Ue==="instanceMatrix"&&G.instanceMatrix&&(H=G.instanceMatrix),Ue==="instanceColor"&&G.instanceColor&&(H=G.instanceColor)),w===void 0||w.attribute!==H||H&&w.data!==H.data)return!0;me++}return l.attributesNum!==me||l.index!==pe}function x(G,Y,ce,pe){let ue={},Ae=Y.attributes,me=0,ye=ce.getAttributes();for(let Ue in ye)if(ye[Ue].location>=0){let w=Ae[Ue];w===void 0&&(Ue==="instanceMatrix"&&G.instanceMatrix&&(w=G.instanceMatrix),Ue==="instanceColor"&&G.instanceColor&&(w=G.instanceColor));let H={};H.attribute=w,w&&w.data&&(H.data=w.data),ue[Ue]=H,me++}l.attributes=ue,l.attributesNum=me,l.index=pe}function E(){let G=l.newAttributes;for(let Y=0,ce=G.length;Y<ce;Y++)G[Y]=0}function T(G){N(G,0)}function N(G,Y){let ce=l.newAttributes,pe=l.enabledAttributes,ue=l.attributeDivisors;ce[G]=1,pe[G]===0&&(s.enableVertexAttribArray(G),pe[G]=1),ue[G]!==Y&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](G,Y),ue[G]=Y)}function L(){let G=l.newAttributes,Y=l.enabledAttributes;for(let ce=0,pe=Y.length;ce<pe;ce++)Y[ce]!==G[ce]&&(s.disableVertexAttribArray(ce),Y[ce]=0)}function F(G,Y,ce,pe,ue,Ae,me){me===!0?s.vertexAttribIPointer(G,Y,ce,ue,Ae):s.vertexAttribPointer(G,Y,ce,pe,ue,Ae)}function J(G,Y,ce,pe){if(n.isWebGL2===!1&&(G.isInstancedMesh||pe.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;E();let ue=pe.attributes,Ae=ce.getAttributes(),me=Y.defaultAttributeValues;for(let ye in Ae){let Ue=Ae[ye];if(Ue.location>=0){let oe=ue[ye];if(oe===void 0&&(ye==="instanceMatrix"&&G.instanceMatrix&&(oe=G.instanceMatrix),ye==="instanceColor"&&G.instanceColor&&(oe=G.instanceColor)),oe!==void 0){let w=oe.normalized,H=oe.itemSize,V=t.get(oe);if(V===void 0)continue;let Q=V.buffer,_e=V.type,Z=V.bytesPerElement,ae=n.isWebGL2===!0&&(_e===s.INT||_e===s.UNSIGNED_INT||oe.gpuType===Tf);if(oe.isInterleavedBufferAttribute){let be=oe.data,W=be.stride,yt=oe.offset;if(be.isInstancedInterleavedBuffer){for(let Pe=0;Pe<Ue.locationSize;Pe++)N(Ue.location+Pe,be.meshPerAttribute);G.isInstancedMesh!==!0&&pe._maxInstanceCount===void 0&&(pe._maxInstanceCount=be.meshPerAttribute*be.count)}else for(let Pe=0;Pe<Ue.locationSize;Pe++)T(Ue.location+Pe);s.bindBuffer(s.ARRAY_BUFFER,Q);for(let Pe=0;Pe<Ue.locationSize;Pe++)F(Ue.location+Pe,H/Ue.locationSize,_e,w,W*Z,(yt+H/Ue.locationSize*Pe)*Z,ae)}else{if(oe.isInstancedBufferAttribute){for(let be=0;be<Ue.locationSize;be++)N(Ue.location+be,oe.meshPerAttribute);G.isInstancedMesh!==!0&&pe._maxInstanceCount===void 0&&(pe._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let be=0;be<Ue.locationSize;be++)T(Ue.location+be);s.bindBuffer(s.ARRAY_BUFFER,Q);for(let be=0;be<Ue.locationSize;be++)F(Ue.location+be,H/Ue.locationSize,_e,w,H*Z,H/Ue.locationSize*be*Z,ae)}}else if(me!==void 0){let w=me[ye];if(w!==void 0)switch(w.length){case 2:s.vertexAttrib2fv(Ue.location,w);break;case 3:s.vertexAttrib3fv(Ue.location,w);break;case 4:s.vertexAttrib4fv(Ue.location,w);break;default:s.vertexAttrib1fv(Ue.location,w)}}}}L()}function S(){re();for(let G in o){let Y=o[G];for(let ce in Y){let pe=Y[ce];for(let ue in pe)m(pe[ue].object),delete pe[ue];delete Y[ce]}delete o[G]}}function P(G){if(o[G.id]===void 0)return;let Y=o[G.id];for(let ce in Y){let pe=Y[ce];for(let ue in pe)m(pe[ue].object),delete pe[ue];delete Y[ce]}delete o[G.id]}function X(G){for(let Y in o){let ce=o[Y];if(ce[G.id]===void 0)continue;let pe=ce[G.id];for(let ue in pe)m(pe[ue].object),delete pe[ue];delete ce[G.id]}}function re(){xe(),h=!0,l!==c&&(l=c,A(l.object))}function xe(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:re,resetDefaultState:xe,dispose:S,releaseStatesOfGeometry:P,releaseStatesOfProgram:X,initAttributes:E,enableAttribute:T,disableUnusedAttributes:L}}function s0(s,e,t,n){let i=n.isWebGL2,r;function a(h){r=h}function o(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,f){if(f===0)return;let A,m;if(i)A=s,m="drawArraysInstanced";else if(A=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",A===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}A[m](r,h,u,f),t.update(u,r,f)}function l(h,u,f){if(f===0)return;let A=e.get("WEBGL_multi_draw");if(A===null)for(let m=0;m<f;m++)this.render(h[m],u[m]);else{A.multiDrawArraysWEBGL(r,h,0,u,0,f);let m=0;for(let g=0;g<f;g++)m+=u[g];t.update(m,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function r0(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let F=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(F){if(F==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext!="undefined"&&s.constructor.name==="WebGL2RenderingContext",o=t.precision!==void 0?t.precision:"highp",c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);let l=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),d=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=f>0,T=a||e.has("OES_texture_float"),N=E&&T,L=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:A,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:p,maxVaryings:d,maxFragmentUniforms:x,vertexTextures:E,floatFragmentTextures:T,floatVertexTextures:N,maxSamples:L}}function a0(s){let e=this,t=null,n=0,i=!1,r=!1,a=new $i,o=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let A=u.length!==0||f||n!==0||i;return i=f,n=u.length,A},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,A){let m=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,d=s.get(u);if(!i||m===null||m.length===0||r&&!p)r?h(null):l();else{let x=r?0:n,E=x*4,T=d.clippingState||null;c.value=T,T=h(m,f,E,A);for(let N=0;N!==E;++N)T[N]=t[N];d.clippingState=T,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,A,m){let g=u!==null?u.length:0,p=null;if(g!==0){if(p=c.value,m!==!0||p===null){let d=A+g*4,x=f.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<d)&&(p=new Float32Array(d));for(let E=0,T=A;E!==g;++E,T+=4)a.copy(u[E]).applyMatrix4(x,o),a.normal.toArray(p,T),p[T+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function o0(s){let e=new WeakMap;function t(a,o){return o===fl?a.mapping=qs:o===dl&&(a.mapping=Or),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===fl||o===dl)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new bl(c.height/2);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var vs=class extends Jo{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Lr=4,ku=[.125,.215,.35,.446,.526,.582],Hs=20,$c=new vs,Qu=new Ge,el=null,tl=0,nl=0,Qs=(1+Math.sqrt(5))/2,Sr=1/Qs,Gu=[new k(1,1,1),new k(-1,1,1),new k(1,1,-1),new k(-1,1,-1),new k(0,Qs,Sr),new k(0,Qs,-Sr),new k(Sr,0,Qs),new k(-Sr,0,Qs),new k(Qs,Sr,0),new k(-Qs,Sr,0)],Ys=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){el=this._renderer.getRenderTarget(),tl=this._renderer.getActiveCubeFace(),nl=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(el,tl,nl),e.scissorTest=!1,xo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qs||e.mapping===Or?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),el=this._renderer.getRenderTarget(),tl=this._renderer.getActiveCubeFace(),nl=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:An,minFilter:An,generateMipmaps:!1,type:Qi,format:yn,colorSpace:vn,depthBuffer:!1},i=Hu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hu(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=c0(r)),this._blurMaterial=l0(r,e,t)}return i}_compileMaterial(e){let t=new Ke(this._lodPlanes[0],e);this._renderer.compile(t,$c)}_sceneToCubeUV(e,t,n,i){let o=new pn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Qu),h.toneMapping=ys,h.autoClear=!1;let A=new un({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1}),m=new Ke(new fn,A),g=!1,p=e.background;p?p.isColor&&(A.color.copy(p),e.background=null,g=!0):(A.color.copy(Qu),g=!0);for(let d=0;d<6;d++){let x=d%3;x===0?(o.up.set(0,c[d],0),o.lookAt(l[d],0,0)):x===1?(o.up.set(0,0,c[d]),o.lookAt(0,l[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,l[d]));let E=this._cubeSize;xo(i,x*E,d>2?E:0,E,E),h.setRenderTarget(i),g&&h.render(m,o),h.render(e,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===qs||e.mapping===Or;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zu());let r=i?this._cubemapMaterial:this._equirectMaterial,a=new Ke(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;xo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,$c)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=Gu[(i-1)%Gu.length];this._blur(e,i-1,i,r,a)}t.autoClear=n}_blur(e,t,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ke(this._lodPlanes[i],l),f=l.uniforms,A=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*A):2*Math.PI/(2*Hs-1),g=r/m,p=isFinite(r)?1+Math.floor(h*g):Hs;p>Hs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Hs}`);let d=[],x=0;for(let F=0;F<Hs;++F){let J=F/g,S=Math.exp(-J*J/2);d.push(S),F===0?x+=S:F<p&&(x+=2*S)}for(let F=0;F<d.length;F++)d[F]=d[F]/x;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:E}=this;f.dTheta.value=m,f.mipInt.value=E-n;let T=this._sizeLods[i],N=3*T*(i>E-Lr?i-E+Lr:0),L=4*(this._cubeSize-T);xo(t,N,L,3*T,2*T),c.setRenderTarget(t),c.render(u,$c)}};function c0(s){let e=[],t=[],n=[],i=s,r=s-Lr+1+ku.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);t.push(o);let c=1/o;a>s-Lr?c=ku[a-s+Lr-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],A=6,m=6,g=3,p=2,d=1,x=new Float32Array(g*m*A),E=new Float32Array(p*m*A),T=new Float32Array(d*m*A);for(let L=0;L<A;L++){let F=L%3*2/3-1,J=L>2?0:-1,S=[F,J,0,F+2/3,J,0,F+2/3,J+1,0,F,J,0,F+2/3,J+1,0,F,J+1,0];x.set(S,g*m*L),E.set(f,p*m*L);let P=[L,L,L,L,L,L];T.set(P,d*m*L)}let N=new sn;N.setAttribute("position",new Dt(x,g)),N.setAttribute("uv",new Dt(E,p)),N.setAttribute("faceIndex",new Dt(T,d)),e.push(N),i>Lr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Hu(s,e,t){let n=new si(s,e,t);return n.texture.mapping=Ac,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xo(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function l0(s,e,t){let n=new Float32Array(Hs),i=new k(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:Hs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xs,depthTest:!1,depthWrite:!1})}function zu(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xs,depthTest:!1,depthWrite:!1})}function Vu(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xs,depthTest:!1,depthWrite:!1})}function Zl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function h0(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===fl||c===dl,h=c===qs||c===Or;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Ys(s)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{let u=o.image;if(l&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Ys(s));let f=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function i(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function u0(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function f0(s,e,t,n){let i={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);for(let m in f.morphAttributes){let g=f.morphAttributes[m];for(let p=0,d=g.length;p<d;p++)e.remove(g[p])}f.removeEventListener("dispose",a),delete i[f.id];let A=r.get(f);A&&(e.remove(A),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let m in f)e.update(f[m],s.ARRAY_BUFFER);let A=u.morphAttributes;for(let m in A){let g=A[m];for(let p=0,d=g.length;p<d;p++)e.update(g[p],s.ARRAY_BUFFER)}}function l(u){let f=[],A=u.index,m=u.attributes.position,g=0;if(A!==null){let x=A.array;g=A.version;for(let E=0,T=x.length;E<T;E+=3){let N=x[E+0],L=x[E+1],F=x[E+2];f.push(N,L,L,F,F,N)}}else if(m!==void 0){let x=m.array;g=m.version;for(let E=0,T=x.length/3-1;E<T;E+=3){let N=E+0,L=E+1,F=E+2;f.push(N,L,L,F,F,N)}}else return;let p=new(kf(f)?Yo:Vr)(f,1);p.version=g;let d=r.get(u);d&&e.remove(d),r.set(u,p)}function h(u){let f=r.get(u);if(f){let A=u.index;A!==null&&f.version<A.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function d0(s,e,t,n){let i=n.isWebGL2,r;function a(A){r=A}let o,c;function l(A){o=A.type,c=A.bytesPerElement}function h(A,m){s.drawElements(r,m,o,A*c),t.update(m,r,1)}function u(A,m,g){if(g===0)return;let p,d;if(i)p=s,d="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](r,m,o,A*c,g),t.update(m,r,g)}function f(A,m,g){if(g===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<g;d++)this.render(A[d]/c,m[d]);else{p.multiDrawElementsWEBGL(r,m,0,o,A,0,g);let d=0;for(let x=0;x<g;x++)d+=m[x];t.update(d,r,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function A0(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function p0(s,e){return s[0]-e[0]}function m0(s,e){return Math.abs(e[1])-Math.abs(s[1])}function g0(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,a=new Mt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,u){let f=l.morphTargetInfluences;if(e.isWebGL2===!0){let A=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,m=A!==void 0?A.length:0,g=r.get(h);if(g===void 0||g.count!==m){let G=function(){re.dispose(),r.delete(h),h.removeEventListener("dispose",G)};g!==void 0&&g.texture.dispose();let x=h.morphAttributes.position!==void 0,E=h.morphAttributes.normal!==void 0,T=h.morphAttributes.color!==void 0,N=h.morphAttributes.position||[],L=h.morphAttributes.normal||[],F=h.morphAttributes.color||[],J=0;x===!0&&(J=1),E===!0&&(J=2),T===!0&&(J=3);let S=h.attributes.position.count*J,P=1;S>e.maxTextureSize&&(P=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let X=new Float32Array(S*P*4*m),re=new qo(X,S,P,m);re.type=ii,re.needsUpdate=!0;let xe=J*4;for(let Y=0;Y<m;Y++){let ce=N[Y],pe=L[Y],ue=F[Y],Ae=S*P*4*Y;for(let me=0;me<ce.count;me++){let ye=me*xe;x===!0&&(a.fromBufferAttribute(ce,me),X[Ae+ye+0]=a.x,X[Ae+ye+1]=a.y,X[Ae+ye+2]=a.z,X[Ae+ye+3]=0),E===!0&&(a.fromBufferAttribute(pe,me),X[Ae+ye+4]=a.x,X[Ae+ye+5]=a.y,X[Ae+ye+6]=a.z,X[Ae+ye+7]=0),T===!0&&(a.fromBufferAttribute(ue,me),X[Ae+ye+8]=a.x,X[Ae+ye+9]=a.y,X[Ae+ye+10]=a.z,X[Ae+ye+11]=ue.itemSize===4?a.w:1)}}g={count:m,texture:re,size:new Je(S,P)},r.set(h,g),h.addEventListener("dispose",G)}let p=0;for(let x=0;x<f.length;x++)p+=f[x];let d=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",d),u.getUniforms().setValue(s,"morphTargetInfluences",f),u.getUniforms().setValue(s,"morphTargetsTexture",g.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}else{let A=f===void 0?0:f.length,m=n[h.id];if(m===void 0||m.length!==A){m=[];for(let E=0;E<A;E++)m[E]=[E,0];n[h.id]=m}for(let E=0;E<A;E++){let T=m[E];T[0]=E,T[1]=f[E]}m.sort(m0);for(let E=0;E<8;E++)E<A&&m[E][1]?(o[E][0]=m[E][0],o[E][1]=m[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort(p0);let g=h.morphAttributes.position,p=h.morphAttributes.normal,d=0;for(let E=0;E<8;E++){let T=o[E],N=T[0],L=T[1];N!==Number.MAX_SAFE_INTEGER&&L?(g&&h.getAttribute("morphTarget"+E)!==g[N]&&h.setAttribute("morphTarget"+E,g[N]),p&&h.getAttribute("morphNormal"+E)!==p[N]&&h.setAttribute("morphNormal"+E,p[N]),i[E]=L,d+=L):(g&&h.hasAttribute("morphTarget"+E)===!0&&h.deleteAttribute("morphTarget"+E),p&&h.hasAttribute("morphNormal"+E)===!0&&h.deleteAttribute("morphNormal"+E),i[E]=0)}let x=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(s,"morphTargetBaseInfluence",x),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function _0(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return u}function a(){i=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}var Zo=class extends Un{constructor(e,t,n,i,r,a,o,c,l,h){if(h=h!==void 0?h:Ws,h!==Ws&&h!==kr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ws&&(n=bs),n===void 0&&h===kr&&(n=Vs),super(null,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Tn,this.minFilter=c!==void 0?c:Tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},zf=new Un,Vf=new Zo(1,1);Vf.compareFunction=Nf;var Wf=new qo,Kf=new Ra,qf=new jo,Wu=[],Ku=[],qu=new Float32Array(16),Xu=new Float32Array(9),Yu=new Float32Array(4);function ta(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=Wu[i];if(r===void 0&&(r=new Float32Array(i),Wu[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Bn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Rn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function gc(s,e){let t=Ku[e];t===void 0&&(t=new Int32Array(e),Ku[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function b0(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function E0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bn(t,e))return;s.uniform2fv(this.addr,e),Rn(t,e)}}function x0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bn(t,e))return;s.uniform3fv(this.addr,e),Rn(t,e)}}function y0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bn(t,e))return;s.uniform4fv(this.addr,e),Rn(t,e)}}function v0(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Rn(t,e)}else{if(Bn(t,n))return;Yu.set(n),s.uniformMatrix2fv(this.addr,!1,Yu),Rn(t,n)}}function M0(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Rn(t,e)}else{if(Bn(t,n))return;Xu.set(n),s.uniformMatrix3fv(this.addr,!1,Xu),Rn(t,n)}}function S0(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Rn(t,e)}else{if(Bn(t,n))return;qu.set(n),s.uniformMatrix4fv(this.addr,!1,qu),Rn(t,n)}}function C0(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function w0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bn(t,e))return;s.uniform2iv(this.addr,e),Rn(t,e)}}function I0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bn(t,e))return;s.uniform3iv(this.addr,e),Rn(t,e)}}function T0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bn(t,e))return;s.uniform4iv(this.addr,e),Rn(t,e)}}function B0(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function R0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bn(t,e))return;s.uniform2uiv(this.addr,e),Rn(t,e)}}function D0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bn(t,e))return;s.uniform3uiv(this.addr,e),Rn(t,e)}}function L0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bn(t,e))return;s.uniform4uiv(this.addr,e),Rn(t,e)}}function P0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?Vf:zf;t.setTexture2D(e||r,i)}function F0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Kf,i)}function U0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||qf,i)}function N0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Wf,i)}function O0(s){switch(s){case 5126:return b0;case 35664:return E0;case 35665:return x0;case 35666:return y0;case 35674:return v0;case 35675:return M0;case 35676:return S0;case 5124:case 35670:return C0;case 35667:case 35671:return w0;case 35668:case 35672:return I0;case 35669:case 35673:return T0;case 5125:return B0;case 36294:return R0;case 36295:return D0;case 36296:return L0;case 35678:case 36198:case 36298:case 36306:case 35682:return P0;case 35679:case 36299:case 36307:return F0;case 35680:case 36300:case 36308:case 36293:return U0;case 36289:case 36303:case 36311:case 36292:return N0}}function k0(s,e){s.uniform1fv(this.addr,e)}function Q0(s,e){let t=ta(e,this.size,2);s.uniform2fv(this.addr,t)}function G0(s,e){let t=ta(e,this.size,3);s.uniform3fv(this.addr,t)}function H0(s,e){let t=ta(e,this.size,4);s.uniform4fv(this.addr,t)}function z0(s,e){let t=ta(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function V0(s,e){let t=ta(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function W0(s,e){let t=ta(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function K0(s,e){s.uniform1iv(this.addr,e)}function q0(s,e){s.uniform2iv(this.addr,e)}function X0(s,e){s.uniform3iv(this.addr,e)}function Y0(s,e){s.uniform4iv(this.addr,e)}function J0(s,e){s.uniform1uiv(this.addr,e)}function j0(s,e){s.uniform2uiv(this.addr,e)}function Z0(s,e){s.uniform3uiv(this.addr,e)}function $0(s,e){s.uniform4uiv(this.addr,e)}function e_(s,e,t){let n=this.cache,i=e.length,r=gc(t,i);Bn(n,r)||(s.uniform1iv(this.addr,r),Rn(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||zf,r[a])}function t_(s,e,t){let n=this.cache,i=e.length,r=gc(t,i);Bn(n,r)||(s.uniform1iv(this.addr,r),Rn(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Kf,r[a])}function n_(s,e,t){let n=this.cache,i=e.length,r=gc(t,i);Bn(n,r)||(s.uniform1iv(this.addr,r),Rn(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||qf,r[a])}function i_(s,e,t){let n=this.cache,i=e.length,r=gc(t,i);Bn(n,r)||(s.uniform1iv(this.addr,r),Rn(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Wf,r[a])}function s_(s){switch(s){case 5126:return k0;case 35664:return Q0;case 35665:return G0;case 35666:return H0;case 35674:return z0;case 35675:return V0;case 35676:return W0;case 5124:case 35670:return K0;case 35667:case 35671:return q0;case 35668:case 35672:return X0;case 35669:case 35673:return Y0;case 5125:return J0;case 36294:return j0;case 36295:return Z0;case 36296:return $0;case 35678:case 36198:case 36298:case 36306:case 35682:return e_;case 35679:case 36299:case 36307:return t_;case 35680:case 36300:case 36308:case 36293:return n_;case 36289:case 36303:case 36311:case 36292:return i_}}var El=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=O0(t.type)}},xl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=s_(t.type)}},yl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},il=/(\w+)(\])?(\[|\.)?/g;function Ju(s,e){s.seq.push(e),s.map[e.id]=e}function r_(s,e,t){let n=s.name,i=n.length;for(il.lastIndex=0;;){let r=il.exec(n),a=il.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Ju(t,l===void 0?new El(o,s,e):new xl(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new yl(o),Ju(t,u)),t=u}}}var Nr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);r_(r,a,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function ju(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var a_=37297,o_=0;function c_(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function l_(s){let e=Gt.getPrimaries(Gt.workingColorSpace),t=Gt.getPrimaries(s),n;switch(e===t?n="":e===Ho&&t===Go?n="LinearDisplayP3ToLinearSRGB":e===Go&&t===Ho&&(n="LinearSRGBToLinearDisplayP3"),s){case vn:case ea:return[n,"LinearTransferOETF"];case kt:case Ga:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Zu(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+c_(s.getShaderSource(e),a)}else return i}function h_(s,e){let t=l_(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function u_(s,e){let t;switch(e){case mA:t="Linear";break;case gA:t="Reinhard";break;case _A:t="OptimizedCineon";break;case dc:t="ACESFilmic";break;case EA:t="AgX";break;case bA:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function f_(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Pr).join(`
`)}function d_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Pr).join(`
`)}function A_(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function p_(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Pr(s){return s!==""}function $u(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ef(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var m_=/^[ \t]*#include +<([\w\d./]+)>/gm;function vl(s){return s.replace(m_,__)}var g_=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function __(s,e){let t=Ct[e];if(t===void 0){let n=g_.get(e);if(n!==void 0)t=Ct[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return vl(t)}var b_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tf(s){return s.replace(b_,E_)}function E_(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function nf(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function x_(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===fc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Vd?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Zi&&(e="SHADOWMAP_TYPE_VSM"),e}function y_(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case qs:case Or:e="ENVMAP_TYPE_CUBE";break;case Ac:e="ENVMAP_TYPE_CUBE_UV";break}return e}function v_(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Or:e="ENVMAP_MODE_REFRACTION";break}return e}function M_(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Wl:e="ENVMAP_BLENDING_MULTIPLY";break;case AA:e="ENVMAP_BLENDING_MIX";break;case pA:e="ENVMAP_BLENDING_ADD";break}return e}function S_(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function C_(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=x_(t),l=y_(t),h=v_(t),u=M_(t),f=S_(t),A=t.isWebGL2?"":f_(t),m=d_(t),g=A_(r),p=i.createProgram(),d,x,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Pr).join(`
`),d.length>0&&(d+=`
`),x=[A,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Pr).join(`
`),x.length>0&&(x+=`
`)):(d=[nf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pr).join(`
`),x=[A,nf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ys?"#define TONE_MAPPING":"",t.toneMapping!==ys?Ct.tonemapping_pars_fragment:"",t.toneMapping!==ys?u_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ct.colorspace_pars_fragment,h_("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pr).join(`
`)),a=vl(a),a=$u(a,t),a=ef(a,t),o=vl(o),o=$u(o,t),o=ef(o,t),a=tf(a),o=tf(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,d=[m,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===xu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);let T=E+d+a,N=E+x+o,L=ju(i,i.VERTEX_SHADER,T),F=ju(i,i.FRAGMENT_SHADER,N);i.attachShader(p,L),i.attachShader(p,F),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function J(re){if(s.debug.checkShaderErrors){let xe=i.getProgramInfoLog(p).trim(),G=i.getShaderInfoLog(L).trim(),Y=i.getShaderInfoLog(F).trim(),ce=!0,pe=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(ce=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,p,L,F);else{let ue=Zu(i,L,"vertex"),Ae=Zu(i,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Program Info Log: `+xe+`
`+ue+`
`+Ae)}else xe!==""?console.warn("THREE.WebGLProgram: Program Info Log:",xe):(G===""||Y==="")&&(pe=!1);pe&&(re.diagnostics={runnable:ce,programLog:xe,vertexShader:{log:G,prefix:d},fragmentShader:{log:Y,prefix:x}})}i.deleteShader(L),i.deleteShader(F),S=new Nr(i,p),P=p_(i,p)}let S;this.getUniforms=function(){return S===void 0&&J(this),S};let P;this.getAttributes=function(){return P===void 0&&J(this),P};let X=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return X===!1&&(X=i.getProgramParameter(p,a_)),X},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=o_++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=L,this.fragmentShader=F,this}var w_=0,Ml=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Sl(e),t.set(e,n)),n}},Sl=class{constructor(e){this.id=w_++,this.code=e,this.usedTimes=0}};function I_(s,e,t,n,i,r,a){let o=new Xo,c=new Ml,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,f=i.vertexTextures,A=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return S===0?"uv":`uv${S}`}function p(S,P,X,re,xe){let G=re.fog,Y=xe.geometry,ce=S.isMeshStandardMaterial?re.environment:null,pe=(S.isMeshStandardMaterial?t:e).get(S.envMap||ce),ue=pe&&pe.mapping===Ac?pe.image.height:null,Ae=m[S.type];S.precision!==null&&(A=i.getMaxPrecision(S.precision),A!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",A,"instead."));let me=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ye=me!==void 0?me.length:0,Ue=0;Y.morphAttributes.position!==void 0&&(Ue=1),Y.morphAttributes.normal!==void 0&&(Ue=2),Y.morphAttributes.color!==void 0&&(Ue=3);let oe,w,H,V;if(Ae){let rn=Ni[Ae];oe=rn.vertexShader,w=rn.fragmentShader}else oe=S.vertexShader,w=S.fragmentShader,c.update(S),H=c.getVertexShaderID(S),V=c.getFragmentShaderID(S);let Q=s.getRenderTarget(),_e=xe.isInstancedMesh===!0,Z=xe.isBatchedMesh===!0,ae=!!S.map,be=!!S.matcap,W=!!pe,yt=!!S.aoMap,Pe=!!S.lightMap,at=!!S.bumpMap,He=!!S.normalMap,vt=!!S.displacementMap,gt=!!S.emissiveMap,D=!!S.metalnessMap,C=!!S.roughnessMap,ee=S.anisotropy>0,Me=S.clearcoat>0,Ee=S.iridescence>0,Se=S.sheen>0,qe=S.transmission>0,De=ee&&!!S.anisotropyMap,Oe=Me&&!!S.clearcoatMap,et=Me&&!!S.clearcoatNormalMap,ot=Me&&!!S.clearcoatRoughnessMap,fe=Ee&&!!S.iridescenceMap,wt=Ee&&!!S.iridescenceThicknessMap,le=Se&&!!S.sheenColorMap,Ve=Se&&!!S.sheenRoughnessMap,ke=!!S.specularMap,We=!!S.specularColorMap,Ce=!!S.specularIntensityMap,Nt=qe&&!!S.transmissionMap,Ht=qe&&!!S.thicknessMap,bt=!!S.gradientMap,Te=!!S.alphaMap,O=S.alphaTest>0,Ne=!!S.alphaHash,Be=!!S.extensions,ct=!!Y.attributes.uv1,st=!!Y.attributes.uv2,zt=!!Y.attributes.uv3,Ft=ys;return S.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ft=s.toneMapping),{isWebGL2:h,shaderID:Ae,shaderType:S.type,shaderName:S.name,vertexShader:oe,fragmentShader:w,defines:S.defines,customVertexShaderID:H,customFragmentShaderID:V,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:A,batching:Z,instancing:_e,instancingColor:_e&&xe.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:Q===null?s.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:vn,map:ae,matcap:be,envMap:W,envMapMode:W&&pe.mapping,envMapCubeUVHeight:ue,aoMap:yt,lightMap:Pe,bumpMap:at,normalMap:He,displacementMap:f&&vt,emissiveMap:gt,normalMapObjectSpace:He&&S.normalMapType===LA,normalMapTangentSpace:He&&S.normalMapType===Jl,metalnessMap:D,roughnessMap:C,anisotropy:ee,anisotropyMap:De,clearcoat:Me,clearcoatMap:Oe,clearcoatNormalMap:et,clearcoatRoughnessMap:ot,iridescence:Ee,iridescenceMap:fe,iridescenceThicknessMap:wt,sheen:Se,sheenColorMap:le,sheenRoughnessMap:Ve,specularMap:ke,specularColorMap:We,specularIntensityMap:Ce,transmission:qe,transmissionMap:Nt,thicknessMap:Ht,gradientMap:bt,opaque:S.transparent===!1&&S.blending===Fr,alphaMap:Te,alphaTest:O,alphaHash:Ne,combine:S.combine,mapUv:ae&&g(S.map.channel),aoMapUv:yt&&g(S.aoMap.channel),lightMapUv:Pe&&g(S.lightMap.channel),bumpMapUv:at&&g(S.bumpMap.channel),normalMapUv:He&&g(S.normalMap.channel),displacementMapUv:vt&&g(S.displacementMap.channel),emissiveMapUv:gt&&g(S.emissiveMap.channel),metalnessMapUv:D&&g(S.metalnessMap.channel),roughnessMapUv:C&&g(S.roughnessMap.channel),anisotropyMapUv:De&&g(S.anisotropyMap.channel),clearcoatMapUv:Oe&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:et&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:wt&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:le&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&g(S.sheenRoughnessMap.channel),specularMapUv:ke&&g(S.specularMap.channel),specularColorMapUv:We&&g(S.specularColorMap.channel),specularIntensityMapUv:Ce&&g(S.specularIntensityMap.channel),transmissionMapUv:Nt&&g(S.transmissionMap.channel),thicknessMapUv:Ht&&g(S.thicknessMap.channel),alphaMapUv:Te&&g(S.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(He||ee),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,vertexUv1s:ct,vertexUv2s:st,vertexUv3s:zt,pointsUvs:xe.isPoints===!0&&!!Y.attributes.uv&&(ae||Te),fog:!!G,useFog:S.fog===!0,fogExp2:G&&G.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:xe.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Ue,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&X.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ft,useLegacyLights:s._useLegacyLights,decodeVideoTexture:ae&&S.map.isVideoTexture===!0&&Gt.getTransfer(S.map.colorSpace)===an,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Cn,flipSided:S.side===Pn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:Be&&S.extensions.derivatives===!0,extensionFragDepth:Be&&S.extensions.fragDepth===!0,extensionDrawBuffers:Be&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:Be&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Be&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function d(S){let P=[];if(S.shaderID?P.push(S.shaderID):(P.push(S.customVertexShaderID),P.push(S.customFragmentShaderID)),S.defines!==void 0)for(let X in S.defines)P.push(X),P.push(S.defines[X]);return S.isRawShaderMaterial===!1&&(x(P,S),E(P,S),P.push(s.outputColorSpace)),P.push(S.customProgramCacheKey),P.join()}function x(S,P){S.push(P.precision),S.push(P.outputColorSpace),S.push(P.envMapMode),S.push(P.envMapCubeUVHeight),S.push(P.mapUv),S.push(P.alphaMapUv),S.push(P.lightMapUv),S.push(P.aoMapUv),S.push(P.bumpMapUv),S.push(P.normalMapUv),S.push(P.displacementMapUv),S.push(P.emissiveMapUv),S.push(P.metalnessMapUv),S.push(P.roughnessMapUv),S.push(P.anisotropyMapUv),S.push(P.clearcoatMapUv),S.push(P.clearcoatNormalMapUv),S.push(P.clearcoatRoughnessMapUv),S.push(P.iridescenceMapUv),S.push(P.iridescenceThicknessMapUv),S.push(P.sheenColorMapUv),S.push(P.sheenRoughnessMapUv),S.push(P.specularMapUv),S.push(P.specularColorMapUv),S.push(P.specularIntensityMapUv),S.push(P.transmissionMapUv),S.push(P.thicknessMapUv),S.push(P.combine),S.push(P.fogExp2),S.push(P.sizeAttenuation),S.push(P.morphTargetsCount),S.push(P.morphAttributeCount),S.push(P.numDirLights),S.push(P.numPointLights),S.push(P.numSpotLights),S.push(P.numSpotLightMaps),S.push(P.numHemiLights),S.push(P.numRectAreaLights),S.push(P.numDirLightShadows),S.push(P.numPointLightShadows),S.push(P.numSpotLightShadows),S.push(P.numSpotLightShadowsWithMaps),S.push(P.numLightProbes),S.push(P.shadowMapType),S.push(P.toneMapping),S.push(P.numClippingPlanes),S.push(P.numClipIntersection),S.push(P.depthPacking)}function E(S,P){o.disableAll(),P.isWebGL2&&o.enable(0),P.supportsVertexTextures&&o.enable(1),P.instancing&&o.enable(2),P.instancingColor&&o.enable(3),P.matcap&&o.enable(4),P.envMap&&o.enable(5),P.normalMapObjectSpace&&o.enable(6),P.normalMapTangentSpace&&o.enable(7),P.clearcoat&&o.enable(8),P.iridescence&&o.enable(9),P.alphaTest&&o.enable(10),P.vertexColors&&o.enable(11),P.vertexAlphas&&o.enable(12),P.vertexUv1s&&o.enable(13),P.vertexUv2s&&o.enable(14),P.vertexUv3s&&o.enable(15),P.vertexTangents&&o.enable(16),P.anisotropy&&o.enable(17),P.alphaHash&&o.enable(18),P.batching&&o.enable(19),S.push(o.mask),o.disableAll(),P.fog&&o.enable(0),P.useFog&&o.enable(1),P.flatShading&&o.enable(2),P.logarithmicDepthBuffer&&o.enable(3),P.skinning&&o.enable(4),P.morphTargets&&o.enable(5),P.morphNormals&&o.enable(6),P.morphColors&&o.enable(7),P.premultipliedAlpha&&o.enable(8),P.shadowMapEnabled&&o.enable(9),P.useLegacyLights&&o.enable(10),P.doubleSided&&o.enable(11),P.flipSided&&o.enable(12),P.useDepthPacking&&o.enable(13),P.dithering&&o.enable(14),P.transmission&&o.enable(15),P.sheen&&o.enable(16),P.opaque&&o.enable(17),P.pointsUvs&&o.enable(18),P.decodeVideoTexture&&o.enable(19),S.push(o.mask)}function T(S){let P=m[S.type],X;if(P){let re=Ni[P];X=gp.clone(re.uniforms)}else X=S.uniforms;return X}function N(S,P){let X;for(let re=0,xe=l.length;re<xe;re++){let G=l[re];if(G.cacheKey===P){X=G,++X.usedTimes;break}}return X===void 0&&(X=new C_(s,P,S,r),l.push(X)),X}function L(S){if(--S.usedTimes===0){let P=l.indexOf(S);l[P]=l[l.length-1],l.pop(),S.destroy()}}function F(S){c.remove(S)}function J(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:T,acquireProgram:N,releaseProgram:L,releaseShaderCache:F,programs:l,dispose:J}}function T_(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function B_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function sf(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function rf(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,f,A,m,g,p){let d=s[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:A,groupOrder:m,renderOrder:u.renderOrder,z:g,group:p},s[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=A,d.groupOrder=m,d.renderOrder=u.renderOrder,d.z=g,d.group=p),e++,d}function o(u,f,A,m,g,p){let d=a(u,f,A,m,g,p);A.transmission>0?n.push(d):A.transparent===!0?i.push(d):t.push(d)}function c(u,f,A,m,g,p){let d=a(u,f,A,m,g,p);A.transmission>0?n.unshift(d):A.transparent===!0?i.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||B_),n.length>1&&n.sort(f||sf),i.length>1&&i.sort(f||sf)}function h(){for(let u=e,f=s.length;u<f;u++){let A=s[u];if(A.id===null)break;A.id=null,A.object=null,A.geometry=null,A.material=null,A.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:h,sort:l}}function R_(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new rf,s.set(n,[a])):i>=r.length?(a=new rf,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function D_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Ge};break;case"SpotLight":t={position:new k,direction:new k,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new k,halfWidth:new k,halfHeight:new k};break}return s[e.id]=t,t}}}function L_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var P_=0;function F_(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function U_(s,e){let t=new D_,n=L_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new k);let r=new k,a=new dt,o=new dt;function c(h,u){let f=0,A=0,m=0;for(let re=0;re<9;re++)i.probe[re].set(0,0,0);let g=0,p=0,d=0,x=0,E=0,T=0,N=0,L=0,F=0,J=0,S=0;h.sort(F_);let P=u===!0?Math.PI:1;for(let re=0,xe=h.length;re<xe;re++){let G=h[re],Y=G.color,ce=G.intensity,pe=G.distance,ue=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)f+=Y.r*ce*P,A+=Y.g*ce*P,m+=Y.b*ce*P;else if(G.isLightProbe){for(let Ae=0;Ae<9;Ae++)i.probe[Ae].addScaledVector(G.sh.coefficients[Ae],ce);S++}else if(G.isDirectionalLight){let Ae=t.get(G);if(Ae.color.copy(G.color).multiplyScalar(G.intensity*P),G.castShadow){let me=G.shadow,ye=n.get(G);ye.shadowBias=me.bias,ye.shadowNormalBias=me.normalBias,ye.shadowRadius=me.radius,ye.shadowMapSize=me.mapSize,i.directionalShadow[g]=ye,i.directionalShadowMap[g]=ue,i.directionalShadowMatrix[g]=G.shadow.matrix,T++}i.directional[g]=Ae,g++}else if(G.isSpotLight){let Ae=t.get(G);Ae.position.setFromMatrixPosition(G.matrixWorld),Ae.color.copy(Y).multiplyScalar(ce*P),Ae.distance=pe,Ae.coneCos=Math.cos(G.angle),Ae.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),Ae.decay=G.decay,i.spot[d]=Ae;let me=G.shadow;if(G.map&&(i.spotLightMap[F]=G.map,F++,me.updateMatrices(G),G.castShadow&&J++),i.spotLightMatrix[d]=me.matrix,G.castShadow){let ye=n.get(G);ye.shadowBias=me.bias,ye.shadowNormalBias=me.normalBias,ye.shadowRadius=me.radius,ye.shadowMapSize=me.mapSize,i.spotShadow[d]=ye,i.spotShadowMap[d]=ue,L++}d++}else if(G.isRectAreaLight){let Ae=t.get(G);Ae.color.copy(Y).multiplyScalar(ce),Ae.halfWidth.set(G.width*.5,0,0),Ae.halfHeight.set(0,G.height*.5,0),i.rectArea[x]=Ae,x++}else if(G.isPointLight){let Ae=t.get(G);if(Ae.color.copy(G.color).multiplyScalar(G.intensity*P),Ae.distance=G.distance,Ae.decay=G.decay,G.castShadow){let me=G.shadow,ye=n.get(G);ye.shadowBias=me.bias,ye.shadowNormalBias=me.normalBias,ye.shadowRadius=me.radius,ye.shadowMapSize=me.mapSize,ye.shadowCameraNear=me.camera.near,ye.shadowCameraFar=me.camera.far,i.pointShadow[p]=ye,i.pointShadowMap[p]=ue,i.pointShadowMatrix[p]=G.shadow.matrix,N++}i.point[p]=Ae,p++}else if(G.isHemisphereLight){let Ae=t.get(G);Ae.skyColor.copy(G.color).multiplyScalar(ce*P),Ae.groundColor.copy(G.groundColor).multiplyScalar(ce*P),i.hemi[E]=Ae,E++}}x>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Le.LTC_FLOAT_1,i.rectAreaLTC2=Le.LTC_FLOAT_2):(i.rectAreaLTC1=Le.LTC_HALF_1,i.rectAreaLTC2=Le.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Le.LTC_FLOAT_1,i.rectAreaLTC2=Le.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=Le.LTC_HALF_1,i.rectAreaLTC2=Le.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=A,i.ambient[2]=m;let X=i.hash;(X.directionalLength!==g||X.pointLength!==p||X.spotLength!==d||X.rectAreaLength!==x||X.hemiLength!==E||X.numDirectionalShadows!==T||X.numPointShadows!==N||X.numSpotShadows!==L||X.numSpotMaps!==F||X.numLightProbes!==S)&&(i.directional.length=g,i.spot.length=d,i.rectArea.length=x,i.point.length=p,i.hemi.length=E,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=N,i.pointShadowMap.length=N,i.spotShadow.length=L,i.spotShadowMap.length=L,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=N,i.spotLightMatrix.length=L+F-J,i.spotLightMap.length=F,i.numSpotLightShadowsWithMaps=J,i.numLightProbes=S,X.directionalLength=g,X.pointLength=p,X.spotLength=d,X.rectAreaLength=x,X.hemiLength=E,X.numDirectionalShadows=T,X.numPointShadows=N,X.numSpotShadows=L,X.numSpotMaps=F,X.numLightProbes=S,i.version=P_++)}function l(h,u){let f=0,A=0,m=0,g=0,p=0,d=u.matrixWorldInverse;for(let x=0,E=h.length;x<E;x++){let T=h[x];if(T.isDirectionalLight){let N=i.directional[f];N.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),N.direction.sub(r),N.direction.transformDirection(d),f++}else if(T.isSpotLight){let N=i.spot[m];N.position.setFromMatrixPosition(T.matrixWorld),N.position.applyMatrix4(d),N.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),N.direction.sub(r),N.direction.transformDirection(d),m++}else if(T.isRectAreaLight){let N=i.rectArea[g];N.position.setFromMatrixPosition(T.matrixWorld),N.position.applyMatrix4(d),o.identity(),a.copy(T.matrixWorld),a.premultiply(d),o.extractRotation(a),N.halfWidth.set(T.width*.5,0,0),N.halfHeight.set(0,T.height*.5,0),N.halfWidth.applyMatrix4(o),N.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){let N=i.point[A];N.position.setFromMatrixPosition(T.matrixWorld),N.position.applyMatrix4(d),A++}else if(T.isHemisphereLight){let N=i.hemi[p];N.direction.setFromMatrixPosition(T.matrixWorld),N.direction.transformDirection(d),p++}}}return{setup:c,setupView:l,state:i}}function af(s,e){let t=new U_(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function N_(s,e){let t=new WeakMap;function n(r,a=0){let o=t.get(r),c;return o===void 0?(c=new af(s,e),t.set(r,[c])):a>=o.length?(c=new af(s,e),o.push(c)):c=o[a],c}function i(){t=new WeakMap}return{get:n,dispose:i}}var Cl=class extends Jn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=RA,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},wl=class extends Jn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},O_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,k_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Q_(s,e,t){let n=new Da,i=new Je,r=new Je,a=new Mt,o=new Cl({depthPacking:DA}),c=new wl,l={},h=t.maxTextureSize,u={[ki]:Pn,[Pn]:ki,[Cn]:Cn},f=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Je},radius:{value:4}},vertexShader:O_,fragmentShader:k_}),A=f.clone();A.defines.HORIZONTAL_PASS=1;let m=new sn;m.setAttribute("position",new Dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new Ke(m,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fc;let d=this.type;this.render=function(L,F,J){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||L.length===0)return;let S=s.getRenderTarget(),P=s.getActiveCubeFace(),X=s.getActiveMipmapLevel(),re=s.state;re.setBlending(xs),re.buffers.color.setClear(1,1,1,1),re.buffers.depth.setTest(!0),re.setScissorTest(!1);let xe=d!==Zi&&this.type===Zi,G=d===Zi&&this.type!==Zi;for(let Y=0,ce=L.length;Y<ce;Y++){let pe=L[Y],ue=pe.shadow;if(ue===void 0){console.warn("THREE.WebGLShadowMap:",pe,"has no shadow.");continue}if(ue.autoUpdate===!1&&ue.needsUpdate===!1)continue;i.copy(ue.mapSize);let Ae=ue.getFrameExtents();if(i.multiply(Ae),r.copy(ue.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Ae.x),i.x=r.x*Ae.x,ue.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Ae.y),i.y=r.y*Ae.y,ue.mapSize.y=r.y)),ue.map===null||xe===!0||G===!0){let ye=this.type!==Zi?{minFilter:Tn,magFilter:Tn}:{};ue.map!==null&&ue.map.dispose(),ue.map=new si(i.x,i.y,ye),ue.map.texture.name=pe.name+".shadowMap",ue.camera.updateProjectionMatrix()}s.setRenderTarget(ue.map),s.clear();let me=ue.getViewportCount();for(let ye=0;ye<me;ye++){let Ue=ue.getViewport(ye);a.set(r.x*Ue.x,r.y*Ue.y,r.x*Ue.z,r.y*Ue.w),re.viewport(a),ue.updateMatrices(pe,ye),n=ue.getFrustum(),T(F,J,ue.camera,pe,this.type)}ue.isPointLightShadow!==!0&&this.type===Zi&&x(ue,J),ue.needsUpdate=!1}d=this.type,p.needsUpdate=!1,s.setRenderTarget(S,P,X)};function x(L,F){let J=e.update(g);f.defines.VSM_SAMPLES!==L.blurSamples&&(f.defines.VSM_SAMPLES=L.blurSamples,A.defines.VSM_SAMPLES=L.blurSamples,f.needsUpdate=!0,A.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new si(i.x,i.y)),f.uniforms.shadow_pass.value=L.map.texture,f.uniforms.resolution.value=L.mapSize,f.uniforms.radius.value=L.radius,s.setRenderTarget(L.mapPass),s.clear(),s.renderBufferDirect(F,null,J,f,g,null),A.uniforms.shadow_pass.value=L.mapPass.texture,A.uniforms.resolution.value=L.mapSize,A.uniforms.radius.value=L.radius,s.setRenderTarget(L.map),s.clear(),s.renderBufferDirect(F,null,J,A,g,null)}function E(L,F,J,S){let P=null,X=J.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(X!==void 0)P=X;else if(P=J.isPointLight===!0?c:o,s.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0){let re=P.uuid,xe=F.uuid,G=l[re];G===void 0&&(G={},l[re]=G);let Y=G[xe];Y===void 0&&(Y=P.clone(),G[xe]=Y,F.addEventListener("dispose",N)),P=Y}if(P.visible=F.visible,P.wireframe=F.wireframe,S===Zi?P.side=F.shadowSide!==null?F.shadowSide:F.side:P.side=F.shadowSide!==null?F.shadowSide:u[F.side],P.alphaMap=F.alphaMap,P.alphaTest=F.alphaTest,P.map=F.map,P.clipShadows=F.clipShadows,P.clippingPlanes=F.clippingPlanes,P.clipIntersection=F.clipIntersection,P.displacementMap=F.displacementMap,P.displacementScale=F.displacementScale,P.displacementBias=F.displacementBias,P.wireframeLinewidth=F.wireframeLinewidth,P.linewidth=F.linewidth,J.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let re=s.properties.get(P);re.light=J}return P}function T(L,F,J,S,P){if(L.visible===!1)return;if(L.layers.test(F.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&P===Zi)&&(!L.frustumCulled||n.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,L.matrixWorld);let xe=e.update(L),G=L.material;if(Array.isArray(G)){let Y=xe.groups;for(let ce=0,pe=Y.length;ce<pe;ce++){let ue=Y[ce],Ae=G[ue.materialIndex];if(Ae&&Ae.visible){let me=E(L,Ae,S,P);L.onBeforeShadow(s,L,F,J,xe,me,ue),s.renderBufferDirect(J,null,xe,me,L,ue),L.onAfterShadow(s,L,F,J,xe,me,ue)}}}else if(G.visible){let Y=E(L,G,S,P);L.onBeforeShadow(s,L,F,J,xe,Y,null),s.renderBufferDirect(J,null,xe,Y,L,null),L.onAfterShadow(s,L,F,J,xe,Y,null)}}let re=L.children;for(let xe=0,G=re.length;xe<G;xe++)T(re[xe],F,J,S,P)}function N(L){L.target.removeEventListener("dispose",N);for(let J in l){let S=l[J],P=L.target.uuid;P in S&&(S[P].dispose(),delete S[P])}}}function G_(s,e,t){let n=t.isWebGL2;function i(){let O=!1,Ne=new Mt,Be=null,ct=new Mt(0,0,0,0);return{setMask:function(st){Be!==st&&!O&&(s.colorMask(st,st,st,st),Be=st)},setLocked:function(st){O=st},setClear:function(st,zt,Ft,mn,rn){rn===!0&&(st*=mn,zt*=mn,Ft*=mn),Ne.set(st,zt,Ft,mn),ct.equals(Ne)===!1&&(s.clearColor(st,zt,Ft,mn),ct.copy(Ne))},reset:function(){O=!1,Be=null,ct.set(-1,0,0,0)}}}function r(){let O=!1,Ne=null,Be=null,ct=null;return{setTest:function(st){st?Z(s.DEPTH_TEST):ae(s.DEPTH_TEST)},setMask:function(st){Ne!==st&&!O&&(s.depthMask(st),Ne=st)},setFunc:function(st){if(Be!==st){switch(st){case oA:s.depthFunc(s.NEVER);break;case cA:s.depthFunc(s.ALWAYS);break;case lA:s.depthFunc(s.LESS);break;case Do:s.depthFunc(s.LEQUAL);break;case hA:s.depthFunc(s.EQUAL);break;case uA:s.depthFunc(s.GEQUAL);break;case fA:s.depthFunc(s.GREATER);break;case dA:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Be=st}},setLocked:function(st){O=st},setClear:function(st){ct!==st&&(s.clearDepth(st),ct=st)},reset:function(){O=!1,Ne=null,Be=null,ct=null}}}function a(){let O=!1,Ne=null,Be=null,ct=null,st=null,zt=null,Ft=null,mn=null,rn=null;return{setTest:function(It){O||(It?Z(s.STENCIL_TEST):ae(s.STENCIL_TEST))},setMask:function(It){Ne!==It&&!O&&(s.stencilMask(It),Ne=It)},setFunc:function(It,Nn,$n){(Be!==It||ct!==Nn||st!==$n)&&(s.stencilFunc(It,Nn,$n),Be=It,ct=Nn,st=$n)},setOp:function(It,Nn,$n){(zt!==It||Ft!==Nn||mn!==$n)&&(s.stencilOp(It,Nn,$n),zt=It,Ft=Nn,mn=$n)},setLocked:function(It){O=It},setClear:function(It){rn!==It&&(s.clearStencil(It),rn=It)},reset:function(){O=!1,Ne=null,Be=null,ct=null,st=null,zt=null,Ft=null,mn=null,rn=null}}}let o=new i,c=new r,l=new a,h=new WeakMap,u=new WeakMap,f={},A={},m=new WeakMap,g=[],p=null,d=!1,x=null,E=null,T=null,N=null,L=null,F=null,J=null,S=new Ge(0,0,0),P=0,X=!1,re=null,xe=null,G=null,Y=null,ce=null,pe=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ue=!1,Ae=0,me=s.getParameter(s.VERSION);me.indexOf("WebGL")!==-1?(Ae=parseFloat(/^WebGL (\d)/.exec(me)[1]),ue=Ae>=1):me.indexOf("OpenGL ES")!==-1&&(Ae=parseFloat(/^OpenGL ES (\d)/.exec(me)[1]),ue=Ae>=2);let ye=null,Ue={},oe=s.getParameter(s.SCISSOR_BOX),w=s.getParameter(s.VIEWPORT),H=new Mt().fromArray(oe),V=new Mt().fromArray(w);function Q(O,Ne,Be,ct){let st=new Uint8Array(4),zt=s.createTexture();s.bindTexture(O,zt),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ft=0;Ft<Be;Ft++)n&&(O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY)?s.texImage3D(Ne,0,s.RGBA,1,1,ct,0,s.RGBA,s.UNSIGNED_BYTE,st):s.texImage2D(Ne+Ft,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,st);return zt}let _e={};_e[s.TEXTURE_2D]=Q(s.TEXTURE_2D,s.TEXTURE_2D,1),_e[s.TEXTURE_CUBE_MAP]=Q(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(_e[s.TEXTURE_2D_ARRAY]=Q(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),_e[s.TEXTURE_3D]=Q(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Z(s.DEPTH_TEST),c.setFunc(Do),gt(!1),D(Yh),Z(s.CULL_FACE),He(xs);function Z(O){f[O]!==!0&&(s.enable(O),f[O]=!0)}function ae(O){f[O]!==!1&&(s.disable(O),f[O]=!1)}function be(O,Ne){return A[O]!==Ne?(s.bindFramebuffer(O,Ne),A[O]=Ne,n&&(O===s.DRAW_FRAMEBUFFER&&(A[s.FRAMEBUFFER]=Ne),O===s.FRAMEBUFFER&&(A[s.DRAW_FRAMEBUFFER]=Ne)),!0):!1}function W(O,Ne){let Be=g,ct=!1;if(O)if(Be=m.get(Ne),Be===void 0&&(Be=[],m.set(Ne,Be)),O.isWebGLMultipleRenderTargets){let st=O.texture;if(Be.length!==st.length||Be[0]!==s.COLOR_ATTACHMENT0){for(let zt=0,Ft=st.length;zt<Ft;zt++)Be[zt]=s.COLOR_ATTACHMENT0+zt;Be.length=st.length,ct=!0}}else Be[0]!==s.COLOR_ATTACHMENT0&&(Be[0]=s.COLOR_ATTACHMENT0,ct=!0);else Be[0]!==s.BACK&&(Be[0]=s.BACK,ct=!0);ct&&(t.isWebGL2?s.drawBuffers(Be):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Be))}function yt(O){return p!==O?(s.useProgram(O),p=O,!0):!1}let Pe={[Gs]:s.FUNC_ADD,[Kd]:s.FUNC_SUBTRACT,[qd]:s.FUNC_REVERSE_SUBTRACT};if(n)Pe[Zh]=s.MIN,Pe[$h]=s.MAX;else{let O=e.get("EXT_blend_minmax");O!==null&&(Pe[Zh]=O.MIN_EXT,Pe[$h]=O.MAX_EXT)}let at={[Xd]:s.ZERO,[Yd]:s.ONE,[Jd]:s.SRC_COLOR,[hl]:s.SRC_ALPHA,[nA]:s.SRC_ALPHA_SATURATE,[eA]:s.DST_COLOR,[Zd]:s.DST_ALPHA,[jd]:s.ONE_MINUS_SRC_COLOR,[ul]:s.ONE_MINUS_SRC_ALPHA,[tA]:s.ONE_MINUS_DST_COLOR,[$d]:s.ONE_MINUS_DST_ALPHA,[iA]:s.CONSTANT_COLOR,[sA]:s.ONE_MINUS_CONSTANT_COLOR,[rA]:s.CONSTANT_ALPHA,[aA]:s.ONE_MINUS_CONSTANT_ALPHA};function He(O,Ne,Be,ct,st,zt,Ft,mn,rn,It){if(O===xs){d===!0&&(ae(s.BLEND),d=!1);return}if(d===!1&&(Z(s.BLEND),d=!0),O!==Wd){if(O!==x||It!==X){if((E!==Gs||L!==Gs)&&(s.blendEquation(s.FUNC_ADD),E=Gs,L=Gs),It)switch(O){case Fr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ro:s.blendFunc(s.ONE,s.ONE);break;case Jh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case jh:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Fr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ro:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Jh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case jh:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}T=null,N=null,F=null,J=null,S.set(0,0,0),P=0,x=O,X=It}return}st=st||Ne,zt=zt||Be,Ft=Ft||ct,(Ne!==E||st!==L)&&(s.blendEquationSeparate(Pe[Ne],Pe[st]),E=Ne,L=st),(Be!==T||ct!==N||zt!==F||Ft!==J)&&(s.blendFuncSeparate(at[Be],at[ct],at[zt],at[Ft]),T=Be,N=ct,F=zt,J=Ft),(mn.equals(S)===!1||rn!==P)&&(s.blendColor(mn.r,mn.g,mn.b,rn),S.copy(mn),P=rn),x=O,X=!1}function vt(O,Ne){O.side===Cn?ae(s.CULL_FACE):Z(s.CULL_FACE);let Be=O.side===Pn;Ne&&(Be=!Be),gt(Be),O.blending===Fr&&O.transparent===!1?He(xs):He(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),c.setFunc(O.depthFunc),c.setTest(O.depthTest),c.setMask(O.depthWrite),o.setMask(O.colorWrite);let ct=O.stencilWrite;l.setTest(ct),ct&&(l.setMask(O.stencilWriteMask),l.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),l.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),ee(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Z(s.SAMPLE_ALPHA_TO_COVERAGE):ae(s.SAMPLE_ALPHA_TO_COVERAGE)}function gt(O){re!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),re=O)}function D(O){O!==Hd?(Z(s.CULL_FACE),O!==xe&&(O===Yh?s.cullFace(s.BACK):O===zd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ae(s.CULL_FACE),xe=O}function C(O){O!==G&&(ue&&s.lineWidth(O),G=O)}function ee(O,Ne,Be){O?(Z(s.POLYGON_OFFSET_FILL),(Y!==Ne||ce!==Be)&&(s.polygonOffset(Ne,Be),Y=Ne,ce=Be)):ae(s.POLYGON_OFFSET_FILL)}function Me(O){O?Z(s.SCISSOR_TEST):ae(s.SCISSOR_TEST)}function Ee(O){O===void 0&&(O=s.TEXTURE0+pe-1),ye!==O&&(s.activeTexture(O),ye=O)}function Se(O,Ne,Be){Be===void 0&&(ye===null?Be=s.TEXTURE0+pe-1:Be=ye);let ct=Ue[Be];ct===void 0&&(ct={type:void 0,texture:void 0},Ue[Be]=ct),(ct.type!==O||ct.texture!==Ne)&&(ye!==Be&&(s.activeTexture(Be),ye=Be),s.bindTexture(O,Ne||_e[O]),ct.type=O,ct.texture=Ne)}function qe(){let O=Ue[ye];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function De(){try{s.compressedTexImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Oe(){try{s.compressedTexImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function et(){try{s.texSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ot(){try{s.texSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function fe(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function wt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function le(){try{s.texStorage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ve(){try{s.texStorage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ke(){try{s.texImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function We(){try{s.texImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ce(O){H.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),H.copy(O))}function Nt(O){V.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),V.copy(O))}function Ht(O,Ne){let Be=u.get(Ne);Be===void 0&&(Be=new WeakMap,u.set(Ne,Be));let ct=Be.get(O);ct===void 0&&(ct=s.getUniformBlockIndex(Ne,O.name),Be.set(O,ct))}function bt(O,Ne){let ct=u.get(Ne).get(O);h.get(Ne)!==ct&&(s.uniformBlockBinding(Ne,ct,O.__bindingPointIndex),h.set(Ne,ct))}function Te(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},ye=null,Ue={},A={},m=new WeakMap,g=[],p=null,d=!1,x=null,E=null,T=null,N=null,L=null,F=null,J=null,S=new Ge(0,0,0),P=0,X=!1,re=null,xe=null,G=null,Y=null,ce=null,H.set(0,0,s.canvas.width,s.canvas.height),V.set(0,0,s.canvas.width,s.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:Z,disable:ae,bindFramebuffer:be,drawBuffers:W,useProgram:yt,setBlending:He,setMaterial:vt,setFlipSided:gt,setCullFace:D,setLineWidth:C,setPolygonOffset:ee,setScissorTest:Me,activeTexture:Ee,bindTexture:Se,unbindTexture:qe,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:ke,texImage3D:We,updateUBOMapping:Ht,uniformBlockBinding:bt,texStorage2D:le,texStorage3D:Ve,texSubImage2D:et,texSubImage3D:ot,compressedTexSubImage2D:fe,compressedTexSubImage3D:wt,scissor:Ce,viewport:Nt,reset:Te}}function H_(s,e,t,n,i,r,a){let o=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,f=new WeakMap,A=!1;try{A=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(D,C){return A?new OffscreenCanvas(D,C):Ba("canvas")}function g(D,C,ee,Me){let Ee=1;if((D.width>Me||D.height>Me)&&(Ee=Me/Math.max(D.width,D.height)),Ee<1||C===!0)if(typeof HTMLImageElement!="undefined"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&D instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&D instanceof ImageBitmap){let Se=C?Vo:Math.floor,qe=Se(Ee*D.width),De=Se(Ee*D.height);u===void 0&&(u=m(qe,De));let Oe=ee?m(qe,De):u;return Oe.width=qe,Oe.height=De,Oe.getContext("2d").drawImage(D,0,0,qe,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+D.width+"x"+D.height+") to ("+qe+"x"+De+")."),Oe}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+D.width+"x"+D.height+")."),D;return D}function p(D){return ml(D.width)&&ml(D.height)}function d(D){return o?!1:D.wrapS!==ni||D.wrapT!==ni||D.minFilter!==Tn&&D.minFilter!==An}function x(D,C){return D.generateMipmaps&&C&&D.minFilter!==Tn&&D.minFilter!==An}function E(D){s.generateMipmap(D)}function T(D,C,ee,Me,Ee=!1){if(o===!1)return C;if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Se=C;if(C===s.RED&&(ee===s.FLOAT&&(Se=s.R32F),ee===s.HALF_FLOAT&&(Se=s.R16F),ee===s.UNSIGNED_BYTE&&(Se=s.R8)),C===s.RED_INTEGER&&(ee===s.UNSIGNED_BYTE&&(Se=s.R8UI),ee===s.UNSIGNED_SHORT&&(Se=s.R16UI),ee===s.UNSIGNED_INT&&(Se=s.R32UI),ee===s.BYTE&&(Se=s.R8I),ee===s.SHORT&&(Se=s.R16I),ee===s.INT&&(Se=s.R32I)),C===s.RG&&(ee===s.FLOAT&&(Se=s.RG32F),ee===s.HALF_FLOAT&&(Se=s.RG16F),ee===s.UNSIGNED_BYTE&&(Se=s.RG8)),C===s.RGBA){let qe=Ee?Qo:Gt.getTransfer(Me);ee===s.FLOAT&&(Se=s.RGBA32F),ee===s.HALF_FLOAT&&(Se=s.RGBA16F),ee===s.UNSIGNED_BYTE&&(Se=qe===an?s.SRGB8_ALPHA8:s.RGBA8),ee===s.UNSIGNED_SHORT_4_4_4_4&&(Se=s.RGBA4),ee===s.UNSIGNED_SHORT_5_5_5_1&&(Se=s.RGB5_A1)}return(Se===s.R16F||Se===s.R32F||Se===s.RG16F||Se===s.RG32F||Se===s.RGBA16F||Se===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Se}function N(D,C,ee){return x(D,ee)===!0||D.isFramebufferTexture&&D.minFilter!==Tn&&D.minFilter!==An?Math.log2(Math.max(C.width,C.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?C.mipmaps.length:1}function L(D){return D===Tn||D===Lo||D===Ea?s.NEAREST:s.LINEAR}function F(D){let C=D.target;C.removeEventListener("dispose",F),S(C),C.isVideoTexture&&h.delete(C)}function J(D){let C=D.target;C.removeEventListener("dispose",J),X(C)}function S(D){let C=n.get(D);if(C.__webglInit===void 0)return;let ee=D.source,Me=f.get(ee);if(Me){let Ee=Me[C.__cacheKey];Ee.usedTimes--,Ee.usedTimes===0&&P(D),Object.keys(Me).length===0&&f.delete(ee)}n.remove(D)}function P(D){let C=n.get(D);s.deleteTexture(C.__webglTexture);let ee=D.source,Me=f.get(ee);delete Me[C.__cacheKey],a.memory.textures--}function X(D){let C=D.texture,ee=n.get(D),Me=n.get(C);if(Me.__webglTexture!==void 0&&(s.deleteTexture(Me.__webglTexture),a.memory.textures--),D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let Ee=0;Ee<6;Ee++){if(Array.isArray(ee.__webglFramebuffer[Ee]))for(let Se=0;Se<ee.__webglFramebuffer[Ee].length;Se++)s.deleteFramebuffer(ee.__webglFramebuffer[Ee][Se]);else s.deleteFramebuffer(ee.__webglFramebuffer[Ee]);ee.__webglDepthbuffer&&s.deleteRenderbuffer(ee.__webglDepthbuffer[Ee])}else{if(Array.isArray(ee.__webglFramebuffer))for(let Ee=0;Ee<ee.__webglFramebuffer.length;Ee++)s.deleteFramebuffer(ee.__webglFramebuffer[Ee]);else s.deleteFramebuffer(ee.__webglFramebuffer);if(ee.__webglDepthbuffer&&s.deleteRenderbuffer(ee.__webglDepthbuffer),ee.__webglMultisampledFramebuffer&&s.deleteFramebuffer(ee.__webglMultisampledFramebuffer),ee.__webglColorRenderbuffer)for(let Ee=0;Ee<ee.__webglColorRenderbuffer.length;Ee++)ee.__webglColorRenderbuffer[Ee]&&s.deleteRenderbuffer(ee.__webglColorRenderbuffer[Ee]);ee.__webglDepthRenderbuffer&&s.deleteRenderbuffer(ee.__webglDepthRenderbuffer)}if(D.isWebGLMultipleRenderTargets)for(let Ee=0,Se=C.length;Ee<Se;Ee++){let qe=n.get(C[Ee]);qe.__webglTexture&&(s.deleteTexture(qe.__webglTexture),a.memory.textures--),n.remove(C[Ee])}n.remove(C),n.remove(D)}let re=0;function xe(){re=0}function G(){let D=re;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),re+=1,D}function Y(D){let C=[];return C.push(D.wrapS),C.push(D.wrapT),C.push(D.wrapR||0),C.push(D.magFilter),C.push(D.minFilter),C.push(D.anisotropy),C.push(D.internalFormat),C.push(D.format),C.push(D.type),C.push(D.generateMipmaps),C.push(D.premultiplyAlpha),C.push(D.flipY),C.push(D.unpackAlignment),C.push(D.colorSpace),C.join()}function ce(D,C){let ee=n.get(D);if(D.isVideoTexture&&vt(D),D.isRenderTargetTexture===!1&&D.version>0&&ee.__version!==D.version){let Me=D.image;if(Me===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Me.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{H(ee,D,C);return}}t.bindTexture(s.TEXTURE_2D,ee.__webglTexture,s.TEXTURE0+C)}function pe(D,C){let ee=n.get(D);if(D.version>0&&ee.__version!==D.version){H(ee,D,C);return}t.bindTexture(s.TEXTURE_2D_ARRAY,ee.__webglTexture,s.TEXTURE0+C)}function ue(D,C){let ee=n.get(D);if(D.version>0&&ee.__version!==D.version){H(ee,D,C);return}t.bindTexture(s.TEXTURE_3D,ee.__webglTexture,s.TEXTURE0+C)}function Ae(D,C){let ee=n.get(D);if(D.version>0&&ee.__version!==D.version){V(ee,D,C);return}t.bindTexture(s.TEXTURE_CUBE_MAP,ee.__webglTexture,s.TEXTURE0+C)}let me={[Bi]:s.REPEAT,[ni]:s.CLAMP_TO_EDGE,[Ia]:s.MIRRORED_REPEAT},ye={[Tn]:s.NEAREST,[Lo]:s.NEAREST_MIPMAP_NEAREST,[Ea]:s.NEAREST_MIPMAP_LINEAR,[An]:s.LINEAR,[Kl]:s.LINEAR_MIPMAP_NEAREST,[Ai]:s.LINEAR_MIPMAP_LINEAR},Ue={[PA]:s.NEVER,[QA]:s.ALWAYS,[FA]:s.LESS,[Nf]:s.LEQUAL,[UA]:s.EQUAL,[kA]:s.GEQUAL,[NA]:s.GREATER,[OA]:s.NOTEQUAL};function oe(D,C,ee){if(ee?(s.texParameteri(D,s.TEXTURE_WRAP_S,me[C.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,me[C.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,me[C.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,ye[C.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,ye[C.minFilter])):(s.texParameteri(D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(C.wrapS!==ni||C.wrapT!==ni)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(D,s.TEXTURE_MAG_FILTER,L(C.magFilter)),s.texParameteri(D,s.TEXTURE_MIN_FILTER,L(C.minFilter)),C.minFilter!==Tn&&C.minFilter!==An&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),C.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,Ue[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let Me=e.get("EXT_texture_filter_anisotropic");if(C.magFilter===Tn||C.minFilter!==Ea&&C.minFilter!==Ai||C.type===ii&&e.has("OES_texture_float_linear")===!1||o===!1&&C.type===Qi&&e.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||n.get(C).__currentAnisotropy)&&(s.texParameterf(D,Me.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy)}}function w(D,C){let ee=!1;D.__webglInit===void 0&&(D.__webglInit=!0,C.addEventListener("dispose",F));let Me=C.source,Ee=f.get(Me);Ee===void 0&&(Ee={},f.set(Me,Ee));let Se=Y(C);if(Se!==D.__cacheKey){Ee[Se]===void 0&&(Ee[Se]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,ee=!0),Ee[Se].usedTimes++;let qe=Ee[D.__cacheKey];qe!==void 0&&(Ee[D.__cacheKey].usedTimes--,qe.usedTimes===0&&P(C)),D.__cacheKey=Se,D.__webglTexture=Ee[Se].texture}return ee}function H(D,C,ee){let Me=s.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(Me=s.TEXTURE_2D_ARRAY),C.isData3DTexture&&(Me=s.TEXTURE_3D);let Ee=w(D,C),Se=C.source;t.bindTexture(Me,D.__webglTexture,s.TEXTURE0+ee);let qe=n.get(Se);if(Se.version!==qe.__version||Ee===!0){t.activeTexture(s.TEXTURE0+ee);let De=Gt.getPrimaries(Gt.workingColorSpace),Oe=C.colorSpace===Yn?null:Gt.getPrimaries(C.colorSpace),et=C.colorSpace===Yn||De===Oe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let ot=d(C)&&p(C.image)===!1,fe=g(C.image,ot,!1,i.maxTextureSize);fe=gt(C,fe);let wt=p(fe)||o,le=r.convert(C.format,C.colorSpace),Ve=r.convert(C.type),ke=T(C.internalFormat,le,Ve,C.colorSpace,C.isVideoTexture);oe(Me,C,wt);let We,Ce=C.mipmaps,Nt=o&&C.isVideoTexture!==!0&&ke!==pc,Ht=qe.__version===void 0||Ee===!0,bt=N(C,fe,wt);if(C.isDepthTexture)ke=s.DEPTH_COMPONENT,o?C.type===ii?ke=s.DEPTH_COMPONENT32F:C.type===bs?ke=s.DEPTH_COMPONENT24:C.type===Vs?ke=s.DEPTH24_STENCIL8:ke=s.DEPTH_COMPONENT16:C.type===ii&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===Ws&&ke===s.DEPTH_COMPONENT&&C.type!==ql&&C.type!==bs&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=bs,Ve=r.convert(C.type)),C.format===kr&&ke===s.DEPTH_COMPONENT&&(ke=s.DEPTH_STENCIL,C.type!==Vs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=Vs,Ve=r.convert(C.type))),Ht&&(Nt?t.texStorage2D(s.TEXTURE_2D,1,ke,fe.width,fe.height):t.texImage2D(s.TEXTURE_2D,0,ke,fe.width,fe.height,0,le,Ve,null));else if(C.isDataTexture)if(Ce.length>0&&wt){Nt&&Ht&&t.texStorage2D(s.TEXTURE_2D,bt,ke,Ce[0].width,Ce[0].height);for(let Te=0,O=Ce.length;Te<O;Te++)We=Ce[Te],Nt?t.texSubImage2D(s.TEXTURE_2D,Te,0,0,We.width,We.height,le,Ve,We.data):t.texImage2D(s.TEXTURE_2D,Te,ke,We.width,We.height,0,le,Ve,We.data);C.generateMipmaps=!1}else Nt?(Ht&&t.texStorage2D(s.TEXTURE_2D,bt,ke,fe.width,fe.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,fe.width,fe.height,le,Ve,fe.data)):t.texImage2D(s.TEXTURE_2D,0,ke,fe.width,fe.height,0,le,Ve,fe.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Nt&&Ht&&t.texStorage3D(s.TEXTURE_2D_ARRAY,bt,ke,Ce[0].width,Ce[0].height,fe.depth);for(let Te=0,O=Ce.length;Te<O;Te++)We=Ce[Te],C.format!==yn?le!==null?Nt?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Te,0,0,0,We.width,We.height,fe.depth,le,We.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Te,ke,We.width,We.height,fe.depth,0,We.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?t.texSubImage3D(s.TEXTURE_2D_ARRAY,Te,0,0,0,We.width,We.height,fe.depth,le,Ve,We.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Te,ke,We.width,We.height,fe.depth,0,le,Ve,We.data)}else{Nt&&Ht&&t.texStorage2D(s.TEXTURE_2D,bt,ke,Ce[0].width,Ce[0].height);for(let Te=0,O=Ce.length;Te<O;Te++)We=Ce[Te],C.format!==yn?le!==null?Nt?t.compressedTexSubImage2D(s.TEXTURE_2D,Te,0,0,We.width,We.height,le,We.data):t.compressedTexImage2D(s.TEXTURE_2D,Te,ke,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?t.texSubImage2D(s.TEXTURE_2D,Te,0,0,We.width,We.height,le,Ve,We.data):t.texImage2D(s.TEXTURE_2D,Te,ke,We.width,We.height,0,le,Ve,We.data)}else if(C.isDataArrayTexture)Nt?(Ht&&t.texStorage3D(s.TEXTURE_2D_ARRAY,bt,ke,fe.width,fe.height,fe.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,le,Ve,fe.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,ke,fe.width,fe.height,fe.depth,0,le,Ve,fe.data);else if(C.isData3DTexture)Nt?(Ht&&t.texStorage3D(s.TEXTURE_3D,bt,ke,fe.width,fe.height,fe.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,le,Ve,fe.data)):t.texImage3D(s.TEXTURE_3D,0,ke,fe.width,fe.height,fe.depth,0,le,Ve,fe.data);else if(C.isFramebufferTexture){if(Ht)if(Nt)t.texStorage2D(s.TEXTURE_2D,bt,ke,fe.width,fe.height);else{let Te=fe.width,O=fe.height;for(let Ne=0;Ne<bt;Ne++)t.texImage2D(s.TEXTURE_2D,Ne,ke,Te,O,0,le,Ve,null),Te>>=1,O>>=1}}else if(Ce.length>0&&wt){Nt&&Ht&&t.texStorage2D(s.TEXTURE_2D,bt,ke,Ce[0].width,Ce[0].height);for(let Te=0,O=Ce.length;Te<O;Te++)We=Ce[Te],Nt?t.texSubImage2D(s.TEXTURE_2D,Te,0,0,le,Ve,We):t.texImage2D(s.TEXTURE_2D,Te,ke,le,Ve,We);C.generateMipmaps=!1}else Nt?(Ht&&t.texStorage2D(s.TEXTURE_2D,bt,ke,fe.width,fe.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,le,Ve,fe)):t.texImage2D(s.TEXTURE_2D,0,ke,le,Ve,fe);x(C,wt)&&E(Me),qe.__version=Se.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function V(D,C,ee){if(C.image.length!==6)return;let Me=w(D,C),Ee=C.source;t.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+ee);let Se=n.get(Ee);if(Ee.version!==Se.__version||Me===!0){t.activeTexture(s.TEXTURE0+ee);let qe=Gt.getPrimaries(Gt.workingColorSpace),De=C.colorSpace===Yn?null:Gt.getPrimaries(C.colorSpace),Oe=C.colorSpace===Yn||qe===De?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);let et=C.isCompressedTexture||C.image[0].isCompressedTexture,ot=C.image[0]&&C.image[0].isDataTexture,fe=[];for(let Te=0;Te<6;Te++)!et&&!ot?fe[Te]=g(C.image[Te],!1,!0,i.maxCubemapSize):fe[Te]=ot?C.image[Te].image:C.image[Te],fe[Te]=gt(C,fe[Te]);let wt=fe[0],le=p(wt)||o,Ve=r.convert(C.format,C.colorSpace),ke=r.convert(C.type),We=T(C.internalFormat,Ve,ke,C.colorSpace),Ce=o&&C.isVideoTexture!==!0,Nt=Se.__version===void 0||Me===!0,Ht=N(C,wt,le);oe(s.TEXTURE_CUBE_MAP,C,le);let bt;if(et){Ce&&Nt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ht,We,wt.width,wt.height);for(let Te=0;Te<6;Te++){bt=fe[Te].mipmaps;for(let O=0;O<bt.length;O++){let Ne=bt[O];C.format!==yn?Ve!==null?Ce?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,O,0,0,Ne.width,Ne.height,Ve,Ne.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,O,We,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ce?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,O,0,0,Ne.width,Ne.height,Ve,ke,Ne.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,O,We,Ne.width,Ne.height,0,Ve,ke,Ne.data)}}}else{bt=C.mipmaps,Ce&&Nt&&(bt.length>0&&Ht++,t.texStorage2D(s.TEXTURE_CUBE_MAP,Ht,We,fe[0].width,fe[0].height));for(let Te=0;Te<6;Te++)if(ot){Ce?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,fe[Te].width,fe[Te].height,Ve,ke,fe[Te].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,We,fe[Te].width,fe[Te].height,0,Ve,ke,fe[Te].data);for(let O=0;O<bt.length;O++){let Be=bt[O].image[Te].image;Ce?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,O+1,0,0,Be.width,Be.height,Ve,ke,Be.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,O+1,We,Be.width,Be.height,0,Ve,ke,Be.data)}}else{Ce?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,Ve,ke,fe[Te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,We,Ve,ke,fe[Te]);for(let O=0;O<bt.length;O++){let Ne=bt[O];Ce?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,O+1,0,0,Ve,ke,Ne.image[Te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,O+1,We,Ve,ke,Ne.image[Te])}}}x(C,le)&&E(s.TEXTURE_CUBE_MAP),Se.__version=Ee.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function Q(D,C,ee,Me,Ee,Se){let qe=r.convert(ee.format,ee.colorSpace),De=r.convert(ee.type),Oe=T(ee.internalFormat,qe,De,ee.colorSpace);if(!n.get(C).__hasExternalTextures){let ot=Math.max(1,C.width>>Se),fe=Math.max(1,C.height>>Se);Ee===s.TEXTURE_3D||Ee===s.TEXTURE_2D_ARRAY?t.texImage3D(Ee,Se,Oe,ot,fe,C.depth,0,qe,De,null):t.texImage2D(Ee,Se,Oe,ot,fe,0,qe,De,null)}t.bindFramebuffer(s.FRAMEBUFFER,D),He(C)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Me,Ee,n.get(ee).__webglTexture,0,at(C)):(Ee===s.TEXTURE_2D||Ee>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Ee<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Me,Ee,n.get(ee).__webglTexture,Se),t.bindFramebuffer(s.FRAMEBUFFER,null)}function _e(D,C,ee){if(s.bindRenderbuffer(s.RENDERBUFFER,D),C.depthBuffer&&!C.stencilBuffer){let Me=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(ee||He(C)){let Ee=C.depthTexture;Ee&&Ee.isDepthTexture&&(Ee.type===ii?Me=s.DEPTH_COMPONENT32F:Ee.type===bs&&(Me=s.DEPTH_COMPONENT24));let Se=at(C);He(C)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Se,Me,C.width,C.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,Se,Me,C.width,C.height)}else s.renderbufferStorage(s.RENDERBUFFER,Me,C.width,C.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,D)}else if(C.depthBuffer&&C.stencilBuffer){let Me=at(C);ee&&He(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Me,s.DEPTH24_STENCIL8,C.width,C.height):He(C)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Me,s.DEPTH24_STENCIL8,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,D)}else{let Me=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let Ee=0;Ee<Me.length;Ee++){let Se=Me[Ee],qe=r.convert(Se.format,Se.colorSpace),De=r.convert(Se.type),Oe=T(Se.internalFormat,qe,De,Se.colorSpace),et=at(C);ee&&He(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,et,Oe,C.width,C.height):He(C)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,et,Oe,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,Oe,C.width,C.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Z(D,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,D),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),ce(C.depthTexture,0);let Me=n.get(C.depthTexture).__webglTexture,Ee=at(C);if(C.depthTexture.format===Ws)He(C)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Me,0,Ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Me,0);else if(C.depthTexture.format===kr)He(C)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Me,0,Ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Me,0);else throw new Error("Unknown depthTexture format")}function ae(D){let C=n.get(D),ee=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!C.__autoAllocateDepthBuffer){if(ee)throw new Error("target.depthTexture not supported in Cube render targets");Z(C.__webglFramebuffer,D)}else if(ee){C.__webglDepthbuffer=[];for(let Me=0;Me<6;Me++)t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer[Me]),C.__webglDepthbuffer[Me]=s.createRenderbuffer(),_e(C.__webglDepthbuffer[Me],D,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=s.createRenderbuffer(),_e(C.__webglDepthbuffer,D,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function be(D,C,ee){let Me=n.get(D);C!==void 0&&Q(Me.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),ee!==void 0&&ae(D)}function W(D){let C=D.texture,ee=n.get(D),Me=n.get(C);D.addEventListener("dispose",J),D.isWebGLMultipleRenderTargets!==!0&&(Me.__webglTexture===void 0&&(Me.__webglTexture=s.createTexture()),Me.__version=C.version,a.memory.textures++);let Ee=D.isWebGLCubeRenderTarget===!0,Se=D.isWebGLMultipleRenderTargets===!0,qe=p(D)||o;if(Ee){ee.__webglFramebuffer=[];for(let De=0;De<6;De++)if(o&&C.mipmaps&&C.mipmaps.length>0){ee.__webglFramebuffer[De]=[];for(let Oe=0;Oe<C.mipmaps.length;Oe++)ee.__webglFramebuffer[De][Oe]=s.createFramebuffer()}else ee.__webglFramebuffer[De]=s.createFramebuffer()}else{if(o&&C.mipmaps&&C.mipmaps.length>0){ee.__webglFramebuffer=[];for(let De=0;De<C.mipmaps.length;De++)ee.__webglFramebuffer[De]=s.createFramebuffer()}else ee.__webglFramebuffer=s.createFramebuffer();if(Se)if(i.drawBuffers){let De=D.texture;for(let Oe=0,et=De.length;Oe<et;Oe++){let ot=n.get(De[Oe]);ot.__webglTexture===void 0&&(ot.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&D.samples>0&&He(D)===!1){let De=Se?C:[C];ee.__webglMultisampledFramebuffer=s.createFramebuffer(),ee.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,ee.__webglMultisampledFramebuffer);for(let Oe=0;Oe<De.length;Oe++){let et=De[Oe];ee.__webglColorRenderbuffer[Oe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,ee.__webglColorRenderbuffer[Oe]);let ot=r.convert(et.format,et.colorSpace),fe=r.convert(et.type),wt=T(et.internalFormat,ot,fe,et.colorSpace,D.isXRRenderTarget===!0),le=at(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,le,wt,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Oe,s.RENDERBUFFER,ee.__webglColorRenderbuffer[Oe])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(ee.__webglDepthRenderbuffer=s.createRenderbuffer(),_e(ee.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Ee){t.bindTexture(s.TEXTURE_CUBE_MAP,Me.__webglTexture),oe(s.TEXTURE_CUBE_MAP,C,qe);for(let De=0;De<6;De++)if(o&&C.mipmaps&&C.mipmaps.length>0)for(let Oe=0;Oe<C.mipmaps.length;Oe++)Q(ee.__webglFramebuffer[De][Oe],D,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+De,Oe);else Q(ee.__webglFramebuffer[De],D,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+De,0);x(C,qe)&&E(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){let De=D.texture;for(let Oe=0,et=De.length;Oe<et;Oe++){let ot=De[Oe],fe=n.get(ot);t.bindTexture(s.TEXTURE_2D,fe.__webglTexture),oe(s.TEXTURE_2D,ot,qe),Q(ee.__webglFramebuffer,D,ot,s.COLOR_ATTACHMENT0+Oe,s.TEXTURE_2D,0),x(ot,qe)&&E(s.TEXTURE_2D)}t.unbindTexture()}else{let De=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(o?De=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(De,Me.__webglTexture),oe(De,C,qe),o&&C.mipmaps&&C.mipmaps.length>0)for(let Oe=0;Oe<C.mipmaps.length;Oe++)Q(ee.__webglFramebuffer[Oe],D,C,s.COLOR_ATTACHMENT0,De,Oe);else Q(ee.__webglFramebuffer,D,C,s.COLOR_ATTACHMENT0,De,0);x(C,qe)&&E(De),t.unbindTexture()}D.depthBuffer&&ae(D)}function yt(D){let C=p(D)||o,ee=D.isWebGLMultipleRenderTargets===!0?D.texture:[D.texture];for(let Me=0,Ee=ee.length;Me<Ee;Me++){let Se=ee[Me];if(x(Se,C)){let qe=D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,De=n.get(Se).__webglTexture;t.bindTexture(qe,De),E(qe),t.unbindTexture()}}}function Pe(D){if(o&&D.samples>0&&He(D)===!1){let C=D.isWebGLMultipleRenderTargets?D.texture:[D.texture],ee=D.width,Me=D.height,Ee=s.COLOR_BUFFER_BIT,Se=[],qe=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,De=n.get(D),Oe=D.isWebGLMultipleRenderTargets===!0;if(Oe)for(let et=0;et<C.length;et++)t.bindFramebuffer(s.FRAMEBUFFER,De.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+et,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,De.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+et,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let et=0;et<C.length;et++){Se.push(s.COLOR_ATTACHMENT0+et),D.depthBuffer&&Se.push(qe);let ot=De.__ignoreDepthValues!==void 0?De.__ignoreDepthValues:!1;if(ot===!1&&(D.depthBuffer&&(Ee|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&(Ee|=s.STENCIL_BUFFER_BIT)),Oe&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,De.__webglColorRenderbuffer[et]),ot===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[qe]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[qe])),Oe){let fe=n.get(C[et]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,fe,0)}s.blitFramebuffer(0,0,ee,Me,0,0,ee,Me,Ee,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Se)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Oe)for(let et=0;et<C.length;et++){t.bindFramebuffer(s.FRAMEBUFFER,De.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+et,s.RENDERBUFFER,De.__webglColorRenderbuffer[et]);let ot=n.get(C[et]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,De.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+et,s.TEXTURE_2D,ot,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}}function at(D){return Math.min(i.maxSamples,D.samples)}function He(D){let C=n.get(D);return o&&D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function vt(D){let C=a.render.frame;h.get(D)!==C&&(h.set(D,C),D.update())}function gt(D,C){let ee=D.colorSpace,Me=D.format,Ee=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||D.format===pl||ee!==vn&&ee!==Yn&&(Gt.getTransfer(ee)===an?o===!1?e.has("EXT_sRGB")===!0&&Me===yn?(D.format=pl,D.minFilter=An,D.generateMipmaps=!1):C=Wo.sRGBToLinear(C):(Me!==yn||Ee!==wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ee)),C}this.allocateTextureUnit=G,this.resetTextureUnits=xe,this.setTexture2D=ce,this.setTexture2DArray=pe,this.setTexture3D=ue,this.setTextureCube=Ae,this.rebindTextures=be,this.setupRenderTarget=W,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=He}function z_(s,e,t){let n=t.isWebGL2;function i(r,a=Yn){let o,c=Gt.getTransfer(a);if(r===wn)return s.UNSIGNED_BYTE;if(r===Bf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Rf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===yA)return s.BYTE;if(r===vA)return s.SHORT;if(r===ql)return s.UNSIGNED_SHORT;if(r===Tf)return s.INT;if(r===bs)return s.UNSIGNED_INT;if(r===ii)return s.FLOAT;if(r===Qi)return n?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===MA)return s.ALPHA;if(r===yn)return s.RGBA;if(r===SA)return s.LUMINANCE;if(r===CA)return s.LUMINANCE_ALPHA;if(r===Ws)return s.DEPTH_COMPONENT;if(r===kr)return s.DEPTH_STENCIL;if(r===pl)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===tr)return s.RED;if(r===Df)return s.RED_INTEGER;if(r===nr)return s.RG;if(r===Lf)return s.RG_INTEGER;if(r===Pf)return s.RGBA_INTEGER;if(r===xa||r===Lc||r===Pc||r===ya)if(c===an)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===xa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Lc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Pc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ya)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===xa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Lc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Pc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ya)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Po||r===tu||r===Fo||r===nu)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Po)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===tu)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Fo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===nu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===pc)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Uo||r===No)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Uo)return c===an?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===No)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Oo||r===iu||r===su||r===ru||r===Ta||r===au||r===ou||r===cu||r===lu||r===hu||r===uu||r===fu||r===du||r===Au)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Oo)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===iu)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===su)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===ru)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ta)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===au)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ou)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===cu)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===lu)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===hu)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===uu)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===fu)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===du)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Au)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===va||r===pu||r===mu)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===va)return c===an?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===pu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===mu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===wA||r===gu||r===_u||r===bu)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===va)return o.COMPRESSED_RED_RGTC1_EXT;if(r===gu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===_u)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===bu)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Vs?n?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}var Il=class extends pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Gn=class extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}},V_={type:"move"},wa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let g of e.hand.values()){let p=t.getJointPose(g,n),d=this._getHandJoint(l,g);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),A=.02,m=.005;l.inputState.pinching&&f>A+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=A-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(V_)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Gn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Tl=class extends ts{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,A=null,m=null,g=t.getContextAttributes(),p=null,d=null,x=[],E=[],T=new Je,N=null,L=new pn;L.layers.enable(1),L.viewport=new Mt;let F=new pn;F.layers.enable(2),F.viewport=new Mt;let J=[L,F],S=new Il;S.layers.enable(1),S.layers.enable(2);let P=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let w=x[oe];return w===void 0&&(w=new wa,x[oe]=w),w.getTargetRaySpace()},this.getControllerGrip=function(oe){let w=x[oe];return w===void 0&&(w=new wa,x[oe]=w),w.getGripSpace()},this.getHand=function(oe){let w=x[oe];return w===void 0&&(w=new wa,x[oe]=w),w.getHandSpace()};function re(oe){let w=E.indexOf(oe.inputSource);if(w===-1)return;let H=x[w];H!==void 0&&(H.update(oe.inputSource,oe.frame,l||a),H.dispatchEvent({type:oe.type,data:oe.inputSource}))}function xe(){i.removeEventListener("select",re),i.removeEventListener("selectstart",re),i.removeEventListener("selectend",re),i.removeEventListener("squeeze",re),i.removeEventListener("squeezestart",re),i.removeEventListener("squeezeend",re),i.removeEventListener("end",xe),i.removeEventListener("inputsourceschange",G);for(let oe=0;oe<x.length;oe++){let w=E[oe];w!==null&&(E[oe]=null,x[oe].disconnect(w))}P=null,X=null,e.setRenderTarget(p),A=null,f=null,u=null,i=null,d=null,Ue.stop(),n.isPresenting=!1,e.setPixelRatio(N),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(oe){r=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){o=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(oe){l=oe},this.getBaseLayer=function(){return f!==null?f:A},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(oe){if(i=oe,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",re),i.addEventListener("selectstart",re),i.addEventListener("selectend",re),i.addEventListener("squeeze",re),i.addEventListener("squeezestart",re),i.addEventListener("squeezeend",re),i.addEventListener("end",xe),i.addEventListener("inputsourceschange",G),g.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(T),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let w={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};A=new XRWebGLLayer(i,t,w),i.updateRenderState({baseLayer:A}),e.setPixelRatio(1),e.setSize(A.framebufferWidth,A.framebufferHeight,!1),d=new si(A.framebufferWidth,A.framebufferHeight,{format:yn,type:wn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let w=null,H=null,V=null;g.depth&&(V=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,w=g.stencil?kr:Ws,H=g.stencil?Vs:bs);let Q={colorFormat:t.RGBA8,depthFormat:V,scaleFactor:r};u=new XRWebGLBinding(i,t),f=u.createProjectionLayer(Q),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),d=new si(f.textureWidth,f.textureHeight,{format:yn,type:wn,depthTexture:new Zo(f.textureWidth,f.textureHeight,H,void 0,void 0,void 0,void 0,void 0,void 0,w),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});let _e=e.properties.get(d);_e.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Ue.setContext(i),Ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function G(oe){for(let w=0;w<oe.removed.length;w++){let H=oe.removed[w],V=E.indexOf(H);V>=0&&(E[V]=null,x[V].disconnect(H))}for(let w=0;w<oe.added.length;w++){let H=oe.added[w],V=E.indexOf(H);if(V===-1){for(let _e=0;_e<x.length;_e++)if(_e>=E.length){E.push(H),V=_e;break}else if(E[_e]===null){E[_e]=H,V=_e;break}if(V===-1)break}let Q=x[V];Q&&Q.connect(H)}}let Y=new k,ce=new k;function pe(oe,w,H){Y.setFromMatrixPosition(w.matrixWorld),ce.setFromMatrixPosition(H.matrixWorld);let V=Y.distanceTo(ce),Q=w.projectionMatrix.elements,_e=H.projectionMatrix.elements,Z=Q[14]/(Q[10]-1),ae=Q[14]/(Q[10]+1),be=(Q[9]+1)/Q[5],W=(Q[9]-1)/Q[5],yt=(Q[8]-1)/Q[0],Pe=(_e[8]+1)/_e[0],at=Z*yt,He=Z*Pe,vt=V/(-yt+Pe),gt=vt*-yt;w.matrixWorld.decompose(oe.position,oe.quaternion,oe.scale),oe.translateX(gt),oe.translateZ(vt),oe.matrixWorld.compose(oe.position,oe.quaternion,oe.scale),oe.matrixWorldInverse.copy(oe.matrixWorld).invert();let D=Z+vt,C=ae+vt,ee=at-gt,Me=He+(V-gt),Ee=be*ae/C*D,Se=W*ae/C*D;oe.projectionMatrix.makePerspective(ee,Me,Ee,Se,D,C),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert()}function ue(oe,w){w===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(w.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(i===null)return;S.near=F.near=L.near=oe.near,S.far=F.far=L.far=oe.far,(P!==S.near||X!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),P=S.near,X=S.far);let w=oe.parent,H=S.cameras;ue(S,w);for(let V=0;V<H.length;V++)ue(H[V],w);H.length===2?pe(S,L,F):S.projectionMatrix.copy(L.projectionMatrix),Ae(oe,S,w)};function Ae(oe,w,H){H===null?oe.matrix.copy(w.matrixWorld):(oe.matrix.copy(H.matrixWorld),oe.matrix.invert(),oe.matrix.multiply(w.matrixWorld)),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.updateMatrixWorld(!0),oe.projectionMatrix.copy(w.projectionMatrix),oe.projectionMatrixInverse.copy(w.projectionMatrixInverse),oe.isPerspectiveCamera&&(oe.fov=Gr*2*Math.atan(1/oe.projectionMatrix.elements[5]),oe.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&A===null))return c},this.setFoveation=function(oe){c=oe,f!==null&&(f.fixedFoveation=oe),A!==null&&A.fixedFoveation!==void 0&&(A.fixedFoveation=oe)};let me=null;function ye(oe,w){if(h=w.getViewerPose(l||a),m=w,h!==null){let H=h.views;A!==null&&(e.setRenderTargetFramebuffer(d,A.framebuffer),e.setRenderTarget(d));let V=!1;H.length!==S.cameras.length&&(S.cameras.length=0,V=!0);for(let Q=0;Q<H.length;Q++){let _e=H[Q],Z=null;if(A!==null)Z=A.getViewport(_e);else{let be=u.getViewSubImage(f,_e);Z=be.viewport,Q===0&&(e.setRenderTargetTextures(d,be.colorTexture,f.ignoreDepthValues?void 0:be.depthStencilTexture),e.setRenderTarget(d))}let ae=J[Q];ae===void 0&&(ae=new pn,ae.layers.enable(Q),ae.viewport=new Mt,J[Q]=ae),ae.matrix.fromArray(_e.transform.matrix),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.projectionMatrix.fromArray(_e.projectionMatrix),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert(),ae.viewport.set(Z.x,Z.y,Z.width,Z.height),Q===0&&(S.matrix.copy(ae.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),V===!0&&S.cameras.push(ae)}}for(let H=0;H<x.length;H++){let V=E[H],Q=x[H];V!==null&&Q!==void 0&&Q.update(V,w,l||a)}me&&me(oe,w),w.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:w}),m=null}let Ue=new Hf;Ue.setAnimationLoop(ye),this.setAnimationLoop=function(oe){me=oe},this.dispose=function(){}}};function W_(s,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,Gf(s)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function i(p,d,x,E,T){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&A(p,d,T)):d.isMeshMatcapMaterial?(r(p,d),m(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),g(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?c(p,d,x,E):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Pn&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Pn&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let x=e.get(d).envMap;if(x&&(p.envMap.value=x,p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;let E=s._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*E,t(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,x,E){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*x,p.scale.value=E*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),e.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function A(p,d,x){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Pn&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,d){d.matcap&&(p.matcap.value=d.matcap)}function g(p,d){let x=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function K_(s,e,t,n){let i={},r={},a=[],o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(x,E){let T=E.program;n.uniformBlockBinding(x,T)}function l(x,E){let T=i[x.id];T===void 0&&(m(x),T=h(x),i[x.id]=T,x.addEventListener("dispose",p));let N=E.program;n.updateUBOMapping(x,N);let L=e.render.frame;r[x.id]!==L&&(f(x),r[x.id]=L)}function h(x){let E=u();x.__bindingPointIndex=E;let T=s.createBuffer(),N=x.__size,L=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,N,L),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,T),T}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){let E=i[x.id],T=x.uniforms,N=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let L=0,F=T.length;L<F;L++){let J=Array.isArray(T[L])?T[L]:[T[L]];for(let S=0,P=J.length;S<P;S++){let X=J[S];if(A(X,L,S,N)===!0){let re=X.__offset,xe=Array.isArray(X.value)?X.value:[X.value],G=0;for(let Y=0;Y<xe.length;Y++){let ce=xe[Y],pe=g(ce);typeof ce=="number"||typeof ce=="boolean"?(X.__data[0]=ce,s.bufferSubData(s.UNIFORM_BUFFER,re+G,X.__data)):ce.isMatrix3?(X.__data[0]=ce.elements[0],X.__data[1]=ce.elements[1],X.__data[2]=ce.elements[2],X.__data[3]=0,X.__data[4]=ce.elements[3],X.__data[5]=ce.elements[4],X.__data[6]=ce.elements[5],X.__data[7]=0,X.__data[8]=ce.elements[6],X.__data[9]=ce.elements[7],X.__data[10]=ce.elements[8],X.__data[11]=0):(ce.toArray(X.__data,G),G+=pe.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,re,X.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function A(x,E,T,N){let L=x.value,F=E+"_"+T;if(N[F]===void 0)return typeof L=="number"||typeof L=="boolean"?N[F]=L:N[F]=L.clone(),!0;{let J=N[F];if(typeof L=="number"||typeof L=="boolean"){if(J!==L)return N[F]=L,!0}else if(J.equals(L)===!1)return J.copy(L),!0}return!1}function m(x){let E=x.uniforms,T=0,N=16;for(let F=0,J=E.length;F<J;F++){let S=Array.isArray(E[F])?E[F]:[E[F]];for(let P=0,X=S.length;P<X;P++){let re=S[P],xe=Array.isArray(re.value)?re.value:[re.value];for(let G=0,Y=xe.length;G<Y;G++){let ce=xe[G],pe=g(ce),ue=T%N;ue!==0&&N-ue<pe.boundary&&(T+=N-ue),re.__data=new Float32Array(pe.storage/Float32Array.BYTES_PER_ELEMENT),re.__offset=T,T+=pe.storage}}}let L=T%N;return L>0&&(T+=N-L),x.__size=T,x.__cache={},this}function g(x){let E={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(E.boundary=4,E.storage=4):x.isVector2?(E.boundary=8,E.storage=8):x.isVector3||x.isColor?(E.boundary=16,E.storage=12):x.isVector4?(E.boundary=16,E.storage=16):x.isMatrix3?(E.boundary=48,E.storage=48):x.isMatrix4?(E.boundary=64,E.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),E}function p(x){let E=x.target;E.removeEventListener("dispose",p);let T=a.indexOf(E.__bindingPointIndex);a.splice(T,1),s.deleteBuffer(i[E.id]),delete i[E.id],delete r[E.id]}function d(){for(let x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:c,update:l,dispose:d}}var Kr=class{constructor(e={}){let{canvas:t=tp(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;let A=new Uint32Array(4),m=new Int32Array(4),g=null,p=null,d=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=kt,this._useLegacyLights=!1,this.toneMapping=ys,this.toneMappingExposure=1;let E=this,T=!1,N=0,L=0,F=null,J=-1,S=null,P=new Mt,X=new Mt,re=null,xe=new Ge(0),G=0,Y=t.width,ce=t.height,pe=1,ue=null,Ae=null,me=new Mt(0,0,Y,ce),ye=new Mt(0,0,Y,ce),Ue=!1,oe=new Da,w=!1,H=!1,V=null,Q=new dt,_e=new Je,Z=new k,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function be(){return F===null?pe:1}let W=n;function yt(R,K){for(let $=0;$<R.length;$++){let ne=R[$],te=t.getContext(ne,K);if(te!==null)return te}return null}try{let R={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vl}`),t.addEventListener("webglcontextlost",Te,!1),t.addEventListener("webglcontextrestored",O,!1),t.addEventListener("webglcontextcreationerror",Ne,!1),W===null){let K=["webgl2","webgl","experimental-webgl"];if(E.isWebGL1Renderer===!0&&K.shift(),W=yt(K,R),W===null)throw yt(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&W instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),W.getShaderPrecisionFormat===void 0&&(W.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Pe,at,He,vt,gt,D,C,ee,Me,Ee,Se,qe,De,Oe,et,ot,fe,wt,le,Ve,ke,We,Ce,Nt;function Ht(){Pe=new u0(W),at=new r0(W,Pe,e),Pe.init(at),We=new z_(W,Pe,at),He=new G_(W,Pe,at),vt=new A0(W),gt=new T_,D=new H_(W,Pe,He,gt,at,We,vt),C=new o0(E),ee=new h0(E),Me=new yp(W,at),Ce=new i0(W,Pe,Me,at),Ee=new f0(W,Me,vt,Ce),Se=new _0(W,Ee,Me,vt),le=new g0(W,at,D),ot=new a0(gt),qe=new I_(E,C,ee,Pe,at,Ce,ot),De=new W_(E,gt),Oe=new R_,et=new N_(Pe,at),wt=new n0(E,C,ee,He,Se,f,c),fe=new Q_(E,Se,at),Nt=new K_(W,vt,at,He),Ve=new s0(W,Pe,vt,at),ke=new d0(W,Pe,vt,at),vt.programs=qe.programs,E.capabilities=at,E.extensions=Pe,E.properties=gt,E.renderLists=Oe,E.shadowMap=fe,E.state=He,E.info=vt}Ht();let bt=new Tl(E,W);this.xr=bt,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let R=Pe.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=Pe.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(R){R!==void 0&&(pe=R,this.setSize(Y,ce,!1))},this.getSize=function(R){return R.set(Y,ce)},this.setSize=function(R,K,$=!0){if(bt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=R,ce=K,t.width=Math.floor(R*pe),t.height=Math.floor(K*pe),$===!0&&(t.style.width=R+"px",t.style.height=K+"px"),this.setViewport(0,0,R,K)},this.getDrawingBufferSize=function(R){return R.set(Y*pe,ce*pe).floor()},this.setDrawingBufferSize=function(R,K,$){Y=R,ce=K,pe=$,t.width=Math.floor(R*$),t.height=Math.floor(K*$),this.setViewport(0,0,R,K)},this.getCurrentViewport=function(R){return R.copy(P)},this.getViewport=function(R){return R.copy(me)},this.setViewport=function(R,K,$,ne){R.isVector4?me.set(R.x,R.y,R.z,R.w):me.set(R,K,$,ne),He.viewport(P.copy(me).multiplyScalar(pe).floor())},this.getScissor=function(R){return R.copy(ye)},this.setScissor=function(R,K,$,ne){R.isVector4?ye.set(R.x,R.y,R.z,R.w):ye.set(R,K,$,ne),He.scissor(X.copy(ye).multiplyScalar(pe).floor())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(R){He.setScissorTest(Ue=R)},this.setOpaqueSort=function(R){ue=R},this.setTransparentSort=function(R){Ae=R},this.getClearColor=function(R){return R.copy(wt.getClearColor())},this.setClearColor=function(){wt.setClearColor.apply(wt,arguments)},this.getClearAlpha=function(){return wt.getClearAlpha()},this.setClearAlpha=function(){wt.setClearAlpha.apply(wt,arguments)},this.clear=function(R=!0,K=!0,$=!0){let ne=0;if(R){let te=!1;if(F!==null){let ze=F.texture.format;te=ze===Pf||ze===Lf||ze===Df}if(te){let ze=F.texture.type,Ze=ze===wn||ze===bs||ze===ql||ze===Vs||ze===Bf||ze===Rf,lt=wt.getClearColor(),At=wt.getClearAlpha(),ft=lt.r,Et=lt.g,xt=lt.b;Ze?(A[0]=ft,A[1]=Et,A[2]=xt,A[3]=At,W.clearBufferuiv(W.COLOR,0,A)):(m[0]=ft,m[1]=Et,m[2]=xt,m[3]=At,W.clearBufferiv(W.COLOR,0,m))}else ne|=W.COLOR_BUFFER_BIT}K&&(ne|=W.DEPTH_BUFFER_BIT),$&&(ne|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",O,!1),t.removeEventListener("webglcontextcreationerror",Ne,!1),Oe.dispose(),et.dispose(),gt.dispose(),C.dispose(),ee.dispose(),Se.dispose(),Ce.dispose(),Nt.dispose(),qe.dispose(),bt.dispose(),bt.removeEventListener("sessionstart",rn),bt.removeEventListener("sessionend",It),V&&(V.dispose(),V=null),Nn.stop()};function Te(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let R=vt.autoReset,K=fe.enabled,$=fe.autoUpdate,ne=fe.needsUpdate,te=fe.type;Ht(),vt.autoReset=R,fe.enabled=K,fe.autoUpdate=$,fe.needsUpdate=ne,fe.type=te}function Ne(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Be(R){let K=R.target;K.removeEventListener("dispose",Be),ct(K)}function ct(R){st(R),gt.remove(R)}function st(R){let K=gt.get(R).programs;K!==void 0&&(K.forEach(function($){qe.releaseProgram($)}),R.isShaderMaterial&&qe.releaseShaderCache(R))}this.renderBufferDirect=function(R,K,$,ne,te,ze){K===null&&(K=ae);let Ze=te.isMesh&&te.matrixWorld.determinant()<0,lt=wc(R,K,$,ne,te);He.setMaterial(ne,Ze);let At=$.index,ft=1;if(ne.wireframe===!0){if(At=Ee.getWireframeAttribute($),At===void 0)return;ft=2}let Et=$.drawRange,xt=$.attributes.position,dn=Et.start*ft,On=(Et.start+Et.count)*ft;ze!==null&&(dn=Math.max(dn,ze.start*ft),On=Math.min(On,(ze.start+ze.count)*ft)),At!==null?(dn=Math.max(dn,0),On=Math.min(On,At.count)):xt!=null&&(dn=Math.max(dn,0),On=Math.min(On,xt.count));let xn=On-dn;if(xn<0||xn===1/0)return;Ce.setup(te,ne,lt,$,At);let yi,jt=Ve;if(At!==null&&(yi=Me.get(At),jt=ke,jt.setIndex(yi)),te.isMesh)ne.wireframe===!0?(He.setLineWidth(ne.wireframeLinewidth*be()),jt.setMode(W.LINES)):jt.setMode(W.TRIANGLES);else if(te.isLine){let St=ne.linewidth;St===void 0&&(St=1),He.setLineWidth(St*be()),te.isLineSegments?jt.setMode(W.LINES):te.isLineLoop?jt.setMode(W.LINE_LOOP):jt.setMode(W.LINE_STRIP)}else te.isPoints?jt.setMode(W.POINTS):te.isSprite&&jt.setMode(W.TRIANGLES);if(te.isBatchedMesh)jt.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else if(te.isInstancedMesh)jt.renderInstances(dn,xn,te.count);else if($.isInstancedBufferGeometry){let St=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,ar=Math.min($.instanceCount,St);jt.renderInstances(dn,xn,ar)}else jt.render(dn,xn)};function zt(R,K,$){R.transparent===!0&&R.side===Cn&&R.forceSinglePass===!1?(R.side=Pn,R.needsUpdate=!0,In(R,K,$),R.side=ki,R.needsUpdate=!0,In(R,K,$),R.side=Cn):In(R,K,$)}this.compile=function(R,K,$=null){$===null&&($=R),p=et.get($),p.init(),x.push(p),$.traverseVisible(function(te){te.isLight&&te.layers.test(K.layers)&&(p.pushLight(te),te.castShadow&&p.pushShadow(te))}),R!==$&&R.traverseVisible(function(te){te.isLight&&te.layers.test(K.layers)&&(p.pushLight(te),te.castShadow&&p.pushShadow(te))}),p.setupLights(E._useLegacyLights);let ne=new Set;return R.traverse(function(te){let ze=te.material;if(ze)if(Array.isArray(ze))for(let Ze=0;Ze<ze.length;Ze++){let lt=ze[Ze];zt(lt,$,te),ne.add(lt)}else zt(ze,$,te),ne.add(ze)}),x.pop(),p=null,ne},this.compileAsync=function(R,K,$=null){let ne=this.compile(R,K,$);return new Promise(te=>{function ze(){if(ne.forEach(function(Ze){gt.get(Ze).currentProgram.isReady()&&ne.delete(Ze)}),ne.size===0){te(R);return}setTimeout(ze,10)}Pe.get("KHR_parallel_shader_compile")!==null?ze():setTimeout(ze,10)})};let Ft=null;function mn(R){Ft&&Ft(R)}function rn(){Nn.stop()}function It(){Nn.start()}let Nn=new Hf;Nn.setAnimationLoop(mn),typeof self!="undefined"&&Nn.setContext(self),this.setAnimationLoop=function(R){Ft=R,bt.setAnimationLoop(R),R===null?Nn.stop():Nn.start()},bt.addEventListener("sessionstart",rn),bt.addEventListener("sessionend",It),this.render=function(R,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),bt.enabled===!0&&bt.isPresenting===!0&&(bt.cameraAutoUpdate===!0&&bt.updateCamera(K),K=bt.getCamera()),R.isScene===!0&&R.onBeforeRender(E,R,K,F),p=et.get(R,x.length),p.init(),x.push(p),Q.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),oe.setFromProjectionMatrix(Q),H=this.localClippingEnabled,w=ot.init(this.clippingPlanes,H),g=Oe.get(R,d.length),g.init(),d.push(g),$n(R,K,0,E.sortObjects),g.finish(),E.sortObjects===!0&&g.sort(ue,Ae),this.info.render.frame++,w===!0&&ot.beginShadows();let $=p.state.shadowsArray;if(fe.render($,R,K),w===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset(),wt.render(g,R),p.setupLights(E._useLegacyLights),K.isArrayCamera){let ne=K.cameras;for(let te=0,ze=ne.length;te<ze;te++){let Ze=ne[te];Wa(g,R,Ze,Ze.viewport)}}else Wa(g,R,K);F!==null&&(D.updateMultisampleRenderTarget(F),D.updateRenderTargetMipmap(F)),R.isScene===!0&&R.onAfterRender(E,R,K),Ce.resetDefaultState(),J=-1,S=null,x.pop(),x.length>0?p=x[x.length-1]:p=null,d.pop(),d.length>0?g=d[d.length-1]:g=null};function $n(R,K,$,ne){if(R.visible===!1)return;if(R.layers.test(K.layers)){if(R.isGroup)$=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(K);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||oe.intersectsSprite(R)){ne&&Z.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Q);let Ze=Se.update(R),lt=R.material;lt.visible&&g.push(R,Ze,lt,$,Z.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||oe.intersectsObject(R))){let Ze=Se.update(R),lt=R.material;if(ne&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Z.copy(R.boundingSphere.center)):(Ze.boundingSphere===null&&Ze.computeBoundingSphere(),Z.copy(Ze.boundingSphere.center)),Z.applyMatrix4(R.matrixWorld).applyMatrix4(Q)),Array.isArray(lt)){let At=Ze.groups;for(let ft=0,Et=At.length;ft<Et;ft++){let xt=At[ft],dn=lt[xt.materialIndex];dn&&dn.visible&&g.push(R,Ze,dn,$,Z.z,xt)}}else lt.visible&&g.push(R,Ze,lt,$,Z.z,null)}}let ze=R.children;for(let Ze=0,lt=ze.length;Ze<lt;Ze++)$n(ze[Ze],K,$,ne)}function Wa(R,K,$,ne){let te=R.opaque,ze=R.transmissive,Ze=R.transparent;p.setupLightsView($),w===!0&&ot.setGlobalState(E.clippingPlanes,$),ze.length>0&&Cc(te,ze,K,$),ne&&He.viewport(P.copy(ne)),te.length>0&&rr(te,K,$),ze.length>0&&rr(ze,K,$),Ze.length>0&&rr(Ze,K,$),He.buffers.depth.setTest(!0),He.buffers.depth.setMask(!0),He.buffers.color.setMask(!0),He.setPolygonOffset(!1)}function Cc(R,K,$,ne){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;let ze=at.isWebGL2;V===null&&(V=new si(1,1,{generateMipmaps:!0,type:Pe.has("EXT_color_buffer_half_float")?Qi:wn,minFilter:Ai,samples:ze?4:0})),E.getDrawingBufferSize(_e),ze?V.setSize(_e.x,_e.y):V.setSize(Vo(_e.x),Vo(_e.y));let Ze=E.getRenderTarget();E.setRenderTarget(V),E.getClearColor(xe),G=E.getClearAlpha(),G<1&&E.setClearColor(16777215,.5),E.clear();let lt=E.toneMapping;E.toneMapping=ys,rr(R,$,ne),D.updateMultisampleRenderTarget(V),D.updateRenderTargetMipmap(V);let At=!1;for(let ft=0,Et=K.length;ft<Et;ft++){let xt=K[ft],dn=xt.object,On=xt.geometry,xn=xt.material,yi=xt.group;if(xn.side===Cn&&dn.layers.test(ne.layers)){let jt=xn.side;xn.side=Pn,xn.needsUpdate=!0,hs(dn,$,ne,On,xn,yi),xn.side=jt,xn.needsUpdate=!0,At=!0}}At===!0&&(D.updateMultisampleRenderTarget(V),D.updateRenderTargetMipmap(V)),E.setRenderTarget(Ze),E.setClearColor(xe,G),E.toneMapping=lt}function rr(R,K,$){let ne=K.isScene===!0?K.overrideMaterial:null;for(let te=0,ze=R.length;te<ze;te++){let Ze=R[te],lt=Ze.object,At=Ze.geometry,ft=ne===null?Ze.material:ne,Et=Ze.group;lt.layers.test($.layers)&&hs(lt,K,$,At,ft,Et)}}function hs(R,K,$,ne,te,ze){R.onBeforeRender(E,K,$,ne,te,ze),R.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),te.onBeforeRender(E,K,$,ne,R,ze),te.transparent===!0&&te.side===Cn&&te.forceSinglePass===!1?(te.side=Pn,te.needsUpdate=!0,E.renderBufferDirect($,K,ne,te,R,ze),te.side=ki,te.needsUpdate=!0,E.renderBufferDirect($,K,ne,te,R,ze),te.side=Cn):E.renderBufferDirect($,K,ne,te,R,ze),R.onAfterRender(E,K,$,ne,te,ze)}function In(R,K,$){K.isScene!==!0&&(K=ae);let ne=gt.get(R),te=p.state.lights,ze=p.state.shadowsArray,Ze=te.state.version,lt=qe.getParameters(R,te.state,ze,K,$),At=qe.getProgramCacheKey(lt),ft=ne.programs;ne.environment=R.isMeshStandardMaterial?K.environment:null,ne.fog=K.fog,ne.envMap=(R.isMeshStandardMaterial?ee:C).get(R.envMap||ne.environment),ft===void 0&&(R.addEventListener("dispose",Be),ft=new Map,ne.programs=ft);let Et=ft.get(At);if(Et!==void 0){if(ne.currentProgram===Et&&ne.lightsStateVersion===Ze)return Ka(R,lt),Et}else lt.uniforms=qe.getUniforms(R),R.onBuild($,lt,E),R.onBeforeCompile(lt,E),Et=qe.acquireProgram(lt,At),ft.set(At,Et),ne.uniforms=lt.uniforms;let xt=ne.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(xt.clippingPlanes=ot.uniform),Ka(R,lt),ne.needsLights=Ic(R),ne.lightsStateVersion=Ze,ne.needsLights&&(xt.ambientLightColor.value=te.state.ambient,xt.lightProbe.value=te.state.probe,xt.directionalLights.value=te.state.directional,xt.directionalLightShadows.value=te.state.directionalShadow,xt.spotLights.value=te.state.spot,xt.spotLightShadows.value=te.state.spotShadow,xt.rectAreaLights.value=te.state.rectArea,xt.ltc_1.value=te.state.rectAreaLTC1,xt.ltc_2.value=te.state.rectAreaLTC2,xt.pointLights.value=te.state.point,xt.pointLightShadows.value=te.state.pointShadow,xt.hemisphereLights.value=te.state.hemi,xt.directionalShadowMap.value=te.state.directionalShadowMap,xt.directionalShadowMatrix.value=te.state.directionalShadowMatrix,xt.spotShadowMap.value=te.state.spotShadowMap,xt.spotLightMatrix.value=te.state.spotLightMatrix,xt.spotLightMap.value=te.state.spotLightMap,xt.pointShadowMap.value=te.state.pointShadowMap,xt.pointShadowMatrix.value=te.state.pointShadowMatrix),ne.currentProgram=Et,ne.uniformsList=null,Et}function we(R){if(R.uniformsList===null){let K=R.currentProgram.getUniforms();R.uniformsList=Nr.seqWithValue(K.seq,R.uniforms)}return R.uniformsList}function Ka(R,K){let $=gt.get(R);$.outputColorSpace=K.outputColorSpace,$.batching=K.batching,$.instancing=K.instancing,$.instancingColor=K.instancingColor,$.skinning=K.skinning,$.morphTargets=K.morphTargets,$.morphNormals=K.morphNormals,$.morphColors=K.morphColors,$.morphTargetsCount=K.morphTargetsCount,$.numClippingPlanes=K.numClippingPlanes,$.numIntersection=K.numClipIntersection,$.vertexAlphas=K.vertexAlphas,$.vertexTangents=K.vertexTangents,$.toneMapping=K.toneMapping}function wc(R,K,$,ne,te){K.isScene!==!0&&(K=ae),D.resetTextureUnits();let ze=K.fog,Ze=ne.isMeshStandardMaterial?K.environment:null,lt=F===null?E.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:vn,At=(ne.isMeshStandardMaterial?ee:C).get(ne.envMap||Ze),ft=ne.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Et=!!$.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),xt=!!$.morphAttributes.position,dn=!!$.morphAttributes.normal,On=!!$.morphAttributes.color,xn=ys;ne.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(xn=E.toneMapping);let yi=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,jt=yi!==void 0?yi.length:0,St=gt.get(ne),ar=p.state.lights;if(w===!0&&(H===!0||R!==S)){let ei=R===S&&ne.id===J;ot.setState(ne,R,ei)}let on=!1;ne.version===St.__version?(St.needsLights&&St.lightsStateVersion!==ar.state.version||St.outputColorSpace!==lt||te.isBatchedMesh&&St.batching===!1||!te.isBatchedMesh&&St.batching===!0||te.isInstancedMesh&&St.instancing===!1||!te.isInstancedMesh&&St.instancing===!0||te.isSkinnedMesh&&St.skinning===!1||!te.isSkinnedMesh&&St.skinning===!0||te.isInstancedMesh&&St.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&St.instancingColor===!1&&te.instanceColor!==null||St.envMap!==At||ne.fog===!0&&St.fog!==ze||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==ot.numPlanes||St.numIntersection!==ot.numIntersection)||St.vertexAlphas!==ft||St.vertexTangents!==Et||St.morphTargets!==xt||St.morphNormals!==dn||St.morphColors!==On||St.toneMapping!==xn||at.isWebGL2===!0&&St.morphTargetsCount!==jt)&&(on=!0):(on=!0,St.__version=ne.version);let Wi=St.currentProgram;on===!0&&(Wi=In(ne,K,te));let qa=!1,vi=!1,ra=!1,Dn=Wi.getUniforms(),Pi=St.uniforms;if(He.useProgram(Wi.program)&&(qa=!0,vi=!0,ra=!0),ne.id!==J&&(J=ne.id,vi=!0),qa||S!==R){Dn.setValue(W,"projectionMatrix",R.projectionMatrix),Dn.setValue(W,"viewMatrix",R.matrixWorldInverse);let ei=Dn.map.cameraPosition;ei!==void 0&&ei.setValue(W,Z.setFromMatrixPosition(R.matrixWorld)),at.logarithmicDepthBuffer&&Dn.setValue(W,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Dn.setValue(W,"isOrthographic",R.isOrthographicCamera===!0),S!==R&&(S=R,vi=!0,ra=!0)}if(te.isSkinnedMesh){Dn.setOptional(W,te,"bindMatrix"),Dn.setOptional(W,te,"bindMatrixInverse");let ei=te.skeleton;ei&&(at.floatVertexTextures?(ei.boneTexture===null&&ei.computeBoneTexture(),Dn.setValue(W,"boneTexture",ei.boneTexture,D)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}te.isBatchedMesh&&(Dn.setOptional(W,te,"batchingTexture"),Dn.setValue(W,"batchingTexture",te._matricesTexture,D));let Zt=$.morphAttributes;if((Zt.position!==void 0||Zt.normal!==void 0||Zt.color!==void 0&&at.isWebGL2===!0)&&le.update(te,$,Wi),(vi||St.receiveShadow!==te.receiveShadow)&&(St.receiveShadow=te.receiveShadow,Dn.setValue(W,"receiveShadow",te.receiveShadow)),ne.isMeshGouraudMaterial&&ne.envMap!==null&&(Pi.envMap.value=At,Pi.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),vi&&(Dn.setValue(W,"toneMappingExposure",E.toneMappingExposure),St.needsLights&&Vi(Pi,ra),ze&&ne.fog===!0&&De.refreshFogUniforms(Pi,ze),De.refreshMaterialUniforms(Pi,ne,pe,ce,V),Nr.upload(W,we(St),Pi,D)),ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(Nr.upload(W,we(St),Pi,D),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Dn.setValue(W,"center",te.center),Dn.setValue(W,"modelViewMatrix",te.modelViewMatrix),Dn.setValue(W,"normalMatrix",te.normalMatrix),Dn.setValue(W,"modelMatrix",te.matrixWorld),ne.isShaderMaterial||ne.isRawShaderMaterial){let ei=ne.uniformsGroups;for(let Fi=0,Tc=ei.length;Fi<Tc;Fi++)if(at.isWebGL2){let us=ei[Fi];Nt.update(us,Wi),Nt.bind(us,Wi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Wi}function Vi(R,K){R.ambientLightColor.needsUpdate=K,R.lightProbe.needsUpdate=K,R.directionalLights.needsUpdate=K,R.directionalLightShadows.needsUpdate=K,R.pointLights.needsUpdate=K,R.pointLightShadows.needsUpdate=K,R.spotLights.needsUpdate=K,R.spotLightShadows.needsUpdate=K,R.rectAreaLights.needsUpdate=K,R.hemisphereLights.needsUpdate=K}function Ic(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(R,K,$){gt.get(R.texture).__webglTexture=K,gt.get(R.depthTexture).__webglTexture=$;let ne=gt.get(R);ne.__hasExternalTextures=!0,ne.__hasExternalTextures&&(ne.__autoAllocateDepthBuffer=$===void 0,ne.__autoAllocateDepthBuffer||Pe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ne.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,K){let $=gt.get(R);$.__webglFramebuffer=K,$.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(R,K=0,$=0){F=R,N=K,L=$;let ne=!0,te=null,ze=!1,Ze=!1;if(R){let At=gt.get(R);At.__useDefaultFramebuffer!==void 0?(He.bindFramebuffer(W.FRAMEBUFFER,null),ne=!1):At.__webglFramebuffer===void 0?D.setupRenderTarget(R):At.__hasExternalTextures&&D.rebindTextures(R,gt.get(R.texture).__webglTexture,gt.get(R.depthTexture).__webglTexture);let ft=R.texture;(ft.isData3DTexture||ft.isDataArrayTexture||ft.isCompressedArrayTexture)&&(Ze=!0);let Et=gt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Et[K])?te=Et[K][$]:te=Et[K],ze=!0):at.isWebGL2&&R.samples>0&&D.useMultisampledRTT(R)===!1?te=gt.get(R).__webglMultisampledFramebuffer:Array.isArray(Et)?te=Et[$]:te=Et,P.copy(R.viewport),X.copy(R.scissor),re=R.scissorTest}else P.copy(me).multiplyScalar(pe).floor(),X.copy(ye).multiplyScalar(pe).floor(),re=Ue;if(He.bindFramebuffer(W.FRAMEBUFFER,te)&&at.drawBuffers&&ne&&He.drawBuffers(R,te),He.viewport(P),He.scissor(X),He.setScissorTest(re),ze){let At=gt.get(R.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+K,At.__webglTexture,$)}else if(Ze){let At=gt.get(R.texture),ft=K||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,At.__webglTexture,$||0,ft)}J=-1},this.readRenderTargetPixels=function(R,K,$,ne,te,ze,Ze){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let lt=gt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ze!==void 0&&(lt=lt[Ze]),lt){He.bindFramebuffer(W.FRAMEBUFFER,lt);try{let At=R.texture,ft=At.format,Et=At.type;if(ft!==yn&&We.convert(ft)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let xt=Et===Qi&&(Pe.has("EXT_color_buffer_half_float")||at.isWebGL2&&Pe.has("EXT_color_buffer_float"));if(Et!==wn&&We.convert(Et)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Et===ii&&(at.isWebGL2||Pe.has("OES_texture_float")||Pe.has("WEBGL_color_buffer_float")))&&!xt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=R.width-ne&&$>=0&&$<=R.height-te&&W.readPixels(K,$,ne,te,We.convert(ft),We.convert(Et),ze)}finally{let At=F!==null?gt.get(F).__webglFramebuffer:null;He.bindFramebuffer(W.FRAMEBUFFER,At)}}},this.copyFramebufferToTexture=function(R,K,$=0){let ne=Math.pow(2,-$),te=Math.floor(K.image.width*ne),ze=Math.floor(K.image.height*ne);D.setTexture2D(K,0),W.copyTexSubImage2D(W.TEXTURE_2D,$,0,0,R.x,R.y,te,ze),He.unbindTexture()},this.copyTextureToTexture=function(R,K,$,ne=0){let te=K.image.width,ze=K.image.height,Ze=We.convert($.format),lt=We.convert($.type);D.setTexture2D($,0),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,$.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,$.unpackAlignment),K.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,ne,R.x,R.y,te,ze,Ze,lt,K.image.data):K.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,ne,R.x,R.y,K.mipmaps[0].width,K.mipmaps[0].height,Ze,K.mipmaps[0].data):W.texSubImage2D(W.TEXTURE_2D,ne,R.x,R.y,Ze,lt,K.image),ne===0&&$.generateMipmaps&&W.generateMipmap(W.TEXTURE_2D),He.unbindTexture()},this.copyTextureToTexture3D=function(R,K,$,ne,te=0){if(E.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let ze=R.max.x-R.min.x+1,Ze=R.max.y-R.min.y+1,lt=R.max.z-R.min.z+1,At=We.convert(ne.format),ft=We.convert(ne.type),Et;if(ne.isData3DTexture)D.setTexture3D(ne,0),Et=W.TEXTURE_3D;else if(ne.isDataArrayTexture||ne.isCompressedArrayTexture)D.setTexture2DArray(ne,0),Et=W.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,ne.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ne.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,ne.unpackAlignment);let xt=W.getParameter(W.UNPACK_ROW_LENGTH),dn=W.getParameter(W.UNPACK_IMAGE_HEIGHT),On=W.getParameter(W.UNPACK_SKIP_PIXELS),xn=W.getParameter(W.UNPACK_SKIP_ROWS),yi=W.getParameter(W.UNPACK_SKIP_IMAGES),jt=$.isCompressedTexture?$.mipmaps[te]:$.image;W.pixelStorei(W.UNPACK_ROW_LENGTH,jt.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,jt.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,R.min.x),W.pixelStorei(W.UNPACK_SKIP_ROWS,R.min.y),W.pixelStorei(W.UNPACK_SKIP_IMAGES,R.min.z),$.isDataTexture||$.isData3DTexture?W.texSubImage3D(Et,te,K.x,K.y,K.z,ze,Ze,lt,At,ft,jt.data):$.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),W.compressedTexSubImage3D(Et,te,K.x,K.y,K.z,ze,Ze,lt,At,jt.data)):W.texSubImage3D(Et,te,K.x,K.y,K.z,ze,Ze,lt,At,ft,jt),W.pixelStorei(W.UNPACK_ROW_LENGTH,xt),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,dn),W.pixelStorei(W.UNPACK_SKIP_PIXELS,On),W.pixelStorei(W.UNPACK_SKIP_ROWS,xn),W.pixelStorei(W.UNPACK_SKIP_IMAGES,yi),te===0&&ne.generateMipmaps&&W.generateMipmap(Et),He.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?D.setTextureCube(R,0):R.isData3DTexture?D.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?D.setTexture2DArray(R,0):D.setTexture2D(R,0),He.unbindTexture()},this.resetState=function(){N=0,L=0,F=null,He.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return es}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===Ga?"display-p3":"srgb",t.unpackColorSpace=Gt.workingColorSpace===ea?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===kt?Ks:Uf}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ks?kt:vn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Bl=class extends Kr{};Bl.prototype.isWebGL1Renderer=!0;var $o=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ge(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Ms=class extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},qr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Al,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Ti()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ti()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ti()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},qn=new k,Js=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)qn.fromBufferAttribute(this,t),qn.applyMatrix4(e),this.setXYZ(t,qn.x,qn.y,qn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qn.fromBufferAttribute(this,t),qn.applyNormalMatrix(e),this.setXYZ(t,qn.x,qn.y,qn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qn.fromBufferAttribute(this,t),qn.transformDirection(e),this.setXYZ(t,qn.x,qn.y,qn.z);return this}setX(e,t){return this.normalized&&(t=Jt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Jt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Jt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Jt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Oi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Oi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Oi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Oi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),i=Jt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),i=Jt(i,this.array),r=Jt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Dt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},La=class extends Jn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ge(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Cr,Aa=new k,wr=new k,Ir=new k,Tr=new Je,pa=new Je,Xf=new dt,yo=new k,ma=new k,vo=new k,of=new Je,sl=new Je,cf=new Je,ec=class extends nn{constructor(e=new La){if(super(),this.isSprite=!0,this.type="Sprite",Cr===void 0){Cr=new sn;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new qr(t,5);Cr.setIndex([0,1,2,0,2,3]),Cr.setAttribute("position",new Js(n,3,0,!1)),Cr.setAttribute("uv",new Js(n,2,3,!1))}this.geometry=Cr,this.material=e,this.center=new Je(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),wr.setFromMatrixScale(this.matrixWorld),Xf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ir.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&wr.multiplyScalar(-Ir.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;Mo(yo.set(-.5,-.5,0),Ir,a,wr,i,r),Mo(ma.set(.5,-.5,0),Ir,a,wr,i,r),Mo(vo.set(.5,.5,0),Ir,a,wr,i,r),of.set(0,0),sl.set(1,0),cf.set(1,1);let o=e.ray.intersectTriangle(yo,ma,vo,!1,Aa);if(o===null&&(Mo(ma.set(-.5,.5,0),Ir,a,wr,i,r),sl.set(0,1),o=e.ray.intersectTriangle(yo,vo,ma,!1,Aa),o===null))return;let c=e.ray.origin.distanceTo(Aa);c<e.near||c>e.far||t.push({distance:c,point:Aa.clone(),uv:zs.getInterpolation(Aa,yo,ma,vo,of,sl,cf,new Je),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Mo(s,e,t,n,i,r){Tr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(pa.x=r*Tr.x-i*Tr.y,pa.y=i*Tr.x+r*Tr.y):pa.copy(Tr),s.copy(e),s.x+=pa.x,s.y+=pa.y,s.applyMatrix4(Xf)}var lf=new k,hf=new Mt,uf=new Mt,q_=new k,ff=new dt,So=new k,rl=new bn,df=new dt,al=new Hr,Gi=class extends Ke{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=eu,this.bindMatrix=new dt,this.bindMatrixInverse=new dt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new pi),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,So),this.boundingBox.expandByPoint(So)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new bn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,So),this.boundingSphere.expandByPoint(So)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rl.copy(this.boundingSphere),rl.applyMatrix4(i),e.ray.intersectsSphere(rl)!==!1&&(df.copy(i).invert(),al.copy(e.ray).applyMatrix4(df),!(this.boundingBox!==null&&al.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,al)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Mt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===eu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===xA?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;hf.fromBufferAttribute(i.attributes.skinIndex,e),uf.fromBufferAttribute(i.attributes.skinWeight,e),lf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=uf.getComponent(r);if(a!==0){let o=hf.getComponent(r);ff.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(q_.copy(lf).applyMatrix4(ff),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Pa=class extends nn{constructor(){super(),this.isBone=!0,this.type="Bone"}},js=class extends Un{constructor(e=null,t=1,n=1,i,r,a,o,c,l=Tn,h=Tn,u,f){super(null,a,o,c,l,h,i,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Af=new dt,X_=new dt,Zs=class s{constructor(e=[],t=[]){this.uuid=Ti(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new dt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new dt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:X_;Af.multiplyMatrices(o,t[r]),Af.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new js(t,e,e,yn,ii);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Pa),this.bones.push(a),this.boneInverses.push(new dt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},gi=class extends Dt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Br=new dt,pf=new dt,Co=[],mf=new pi,Y_=new dt,ga=new Ke,_a=new bn,_i=class extends Ke{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gi(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Y_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new pi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Br),mf.copy(e.boundingBox).applyMatrix4(Br),this.boundingBox.union(mf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Br),_a.copy(e.boundingSphere).applyMatrix4(Br),this.boundingSphere.union(_a)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(ga.geometry=this.geometry,ga.material=this.material,ga.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_a.copy(this.boundingSphere),_a.applyMatrix4(n),e.ray.intersectsSphere(_a)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Br),pf.multiplyMatrices(n,Br),ga.matrixWorld=pf,ga.raycast(e,Co);for(let a=0,o=Co.length;a<o;a++){let c=Co[a];c.instanceId=r,c.object=this,t.push(c)}Co.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new gi(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Fa=class extends Jn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},gf=new k,_f=new k,bf=new dt,ol=new Hr,wo=new bn,Xr=class extends nn{constructor(e=new sn,t=new Fa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)gf.fromBufferAttribute(t,i-1),_f.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=gf.distanceTo(_f);e.setAttribute("lineDistance",new Lt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wo.copy(n.boundingSphere),wo.applyMatrix4(i),wo.radius+=r,e.ray.intersectsSphere(wo)===!1)return;bf.copy(i).invert(),ol.copy(e.ray).applyMatrix4(bf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new k,h=new k,u=new k,f=new k,A=this.isLineSegments?2:1,m=n.index,p=n.attributes.position;if(m!==null){let d=Math.max(0,a.start),x=Math.min(m.count,a.start+a.count);for(let E=d,T=x-1;E<T;E+=A){let N=m.getX(E),L=m.getX(E+1);if(l.fromBufferAttribute(p,N),h.fromBufferAttribute(p,L),ol.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let J=e.ray.origin.distanceTo(f);J<e.near||J>e.far||t.push({distance:J,point:u.clone().applyMatrix4(this.matrixWorld),index:E,face:null,faceIndex:null,object:this})}}else{let d=Math.max(0,a.start),x=Math.min(p.count,a.start+a.count);for(let E=d,T=x-1;E<T;E+=A){if(l.fromBufferAttribute(p,E),h.fromBufferAttribute(p,E+1),ol.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let L=e.ray.origin.distanceTo(f);L<e.near||L>e.far||t.push({distance:L,point:u.clone().applyMatrix4(this.matrixWorld),index:E,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}},Ef=new k,xf=new k,Yr=class extends Xr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Ef.fromBufferAttribute(t,i),xf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ef.distanceTo(xf);e.setAttribute("lineDistance",new Lt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},tc=class extends Xr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Ua=class extends Jn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},yf=new dt,Rl=new Hr,Io=new bn,To=new k,Ss=class extends nn{constructor(e=new sn,t=new Ua){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(i),Io.radius+=r,e.ray.intersectsSphere(Io)===!1)return;yf.copy(i).invert(),Rl.copy(e.ray).applyMatrix4(yf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),A=Math.min(l.count,a.start+a.count);for(let m=f,g=A;m<g;m++){let p=l.getX(m);To.fromBufferAttribute(u,p),vf(To,p,c,i,e,t,this)}}else{let f=Math.max(0,a.start),A=Math.min(u.count,a.start+a.count);for(let m=f,g=A;m<g;m++)To.fromBufferAttribute(u,m),vf(To,m,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function vf(s,e,t,n,i,r,a){let o=Rl.distanceSqToPoint(s);if(o<t){let c=new k;Rl.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}var $s=class extends Un{constructor(e,t,n,i,r,a,o,c,l,h,u,f){super(null,a,o,c,l,h,i,r,u,f),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},nc=class extends $s{constructor(e,t,n,i,r,a){super(e,t,n,r,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=ni}},ic=class extends $s{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,qs),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},Jr=class extends Un{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var sc=class s extends sn{constructor(e=[new Je(0,-.5),new Je(.5,0),new Je(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Qn(i,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],h=1/t,u=new k,f=new Je,A=new k,m=new k,g=new k,p=0,d=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:p=e[x+1].x-e[x].x,d=e[x+1].y-e[x].y,A.x=d*1,A.y=-p,A.z=d*0,g.copy(A),A.normalize(),c.push(A.x,A.y,A.z);break;case e.length-1:c.push(g.x,g.y,g.z);break;default:p=e[x+1].x-e[x].x,d=e[x+1].y-e[x].y,A.x=d*1,A.y=-p,A.z=d*0,m.copy(A),A.x+=g.x,A.y+=g.y,A.z+=g.z,A.normalize(),c.push(A.x,A.y,A.z),g.copy(m)}for(let x=0;x<=t;x++){let E=n+x*h*i,T=Math.sin(E),N=Math.cos(E);for(let L=0;L<=e.length-1;L++){u.x=e[L].x*T,u.y=e[L].y,u.z=e[L].x*N,a.push(u.x,u.y,u.z),f.x=x/t,f.y=L/(e.length-1),o.push(f.x,f.y);let F=c[3*L+0]*T,J=c[3*L+1],S=c[3*L+0]*N;l.push(F,J,S)}}for(let x=0;x<t;x++)for(let E=0;E<e.length-1;E++){let T=E+x*e.length,N=T,L=T+e.length,F=T+e.length+1,J=T+1;r.push(N,L,J),r.push(F,J,L)}this.setIndex(r),this.setAttribute("position",new Lt(a,3)),this.setAttribute("uv",new Lt(o,2)),this.setAttribute("normal",new Lt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}};var rc=class s extends sn{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new k,h=new Je;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let A=n+u/t*i;l.x=e*Math.cos(A),l.y=e*Math.sin(A),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Lt(a,3)),this.setAttribute("normal",new Lt(o,3)),this.setAttribute("uv",new Lt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ri=class s extends sn{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],f=[],A=[],m=0,g=[],p=n/2,d=0;x(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Lt(u,3)),this.setAttribute("normal",new Lt(f,3)),this.setAttribute("uv",new Lt(A,2));function x(){let T=new k,N=new k,L=0,F=(t-e)/n;for(let J=0;J<=r;J++){let S=[],P=J/r,X=P*(t-e)+e;for(let re=0;re<=i;re++){let xe=re/i,G=xe*c+o,Y=Math.sin(G),ce=Math.cos(G);N.x=X*Y,N.y=-P*n+p,N.z=X*ce,u.push(N.x,N.y,N.z),T.set(Y,F,ce).normalize(),f.push(T.x,T.y,T.z),A.push(xe,1-P),S.push(m++)}g.push(S)}for(let J=0;J<i;J++)for(let S=0;S<r;S++){let P=g[S][J],X=g[S+1][J],re=g[S+1][J+1],xe=g[S][J+1];h.push(P,X,xe),h.push(X,re,xe),L+=6}l.addGroup(d,L,0),d+=L}function E(T){let N=m,L=new Je,F=new k,J=0,S=T===!0?e:t,P=T===!0?1:-1;for(let re=1;re<=i;re++)u.push(0,p*P,0),f.push(0,P,0),A.push(.5,.5),m++;let X=m;for(let re=0;re<=i;re++){let G=re/i*c+o,Y=Math.cos(G),ce=Math.sin(G);F.x=S*ce,F.y=p*P,F.z=S*Y,u.push(F.x,F.y,F.z),f.push(0,P,0),L.x=Y*.5+.5,L.y=ce*.5*P+.5,A.push(L.x,L.y),m++}for(let re=0;re<i;re++){let xe=N+re,G=X+re;T===!0?h.push(G,G+1,xe):h.push(G+1,G,xe),J+=3}l.addGroup(d,J,T===!0?1:2),d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var ns=class s extends sn{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new k,f=new k,A=[],m=[],g=[],p=[];for(let d=0;d<=n;d++){let x=[],E=d/n,T=0;d===0&&a===0?T=.5/t:d===n&&c===Math.PI&&(T=-.5/t);for(let N=0;N<=t;N++){let L=N/t;u.x=-e*Math.cos(i+L*r)*Math.sin(a+E*o),u.y=e*Math.cos(a+E*o),u.z=e*Math.sin(i+L*r)*Math.sin(a+E*o),m.push(u.x,u.y,u.z),f.copy(u).normalize(),g.push(f.x,f.y,f.z),p.push(L+T,1-E),x.push(l++)}h.push(x)}for(let d=0;d<n;d++)for(let x=0;x<t;x++){let E=h[d][x+1],T=h[d][x],N=h[d+1][x],L=h[d+1][x+1];(d!==0||a>0)&&A.push(E,T,L),(d!==n-1||c<Math.PI)&&A.push(T,N,L)}this.setIndex(A),this.setAttribute("position",new Lt(m,3)),this.setAttribute("normal",new Lt(g,3)),this.setAttribute("uv",new Lt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Na=class s extends sn{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new k,u=new k,f=new k;for(let A=0;A<=n;A++)for(let m=0;m<=i;m++){let g=m/i*r,p=A/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(g),u.y=(e+t*Math.cos(p))*Math.sin(g),u.z=t*Math.sin(p),o.push(u.x,u.y,u.z),h.x=e*Math.cos(g),h.y=e*Math.sin(g),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(m/i),l.push(A/n)}for(let A=1;A<=n;A++)for(let m=1;m<=i;m++){let g=(i+1)*A+m-1,p=(i+1)*(A-1)+m-1,d=(i+1)*(A-1)+m,x=(i+1)*A+m;a.push(g,p,x),a.push(p,d,x)}this.setIndex(a),this.setAttribute("position",new Lt(o,3)),this.setAttribute("normal",new Lt(c,3)),this.setAttribute("uv",new Lt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Vt=class extends Jn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jl,this.normalScale=new Je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},bi=class extends Vt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Je(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Hi=class extends Jn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jl,this.normalScale=new Je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Bo(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function J_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function j_(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Mf(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function Yf(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var Cs=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Dl=class extends Cs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Rr,endingEnd:Rr}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Dr:r=e,o=2*t-n;break;case ko:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Dr:a=e,c=2*n-t;break;case ko:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,A=this._weightNext,m=(n-t)/(i-t),g=m*m,p=g*m,d=-f*p+2*f*g-f*m,x=(1+f)*p+(-1.5-2*f)*g+(-.5+f)*m+1,E=(-1-A)*p+(1.5+A)*g+.5*m,T=A*p-A*g;for(let N=0;N!==o;++N)r[N]=d*a[h+N]+x*a[l+N]+E*a[c+N]+T*a[u+N];return r}},ac=class extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},Ll=class extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Ei=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Bo(t,this.TimeBufferType),this.values=Bo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Bo(e.times,Array),values:Bo(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ll(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ac(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Dl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Qr:t=this.InterpolantFactoryMethodDiscrete;break;case Xs:t=this.InterpolantFactoryMethodLinear;break;case Fc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Qr;case this.InterpolantFactoryMethodLinear:return Xs;case this.InterpolantFactoryMethodSmooth:return Fc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&J_(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Fc,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{let u=o*n,f=u-n,A=u+n;for(let m=0;m!==n;++m){let g=t[u+m];if(g!==t[f+m]||g!==t[A+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,f=a*n;for(let A=0;A!==n;++A)t[f+A]=t[u+A]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Ei.prototype.TimeBufferType=Float32Array;Ei.prototype.ValueBufferType=Float32Array;Ei.prototype.DefaultInterpolation=Xs;var ws=class extends Ei{};ws.prototype.ValueTypeName="bool";ws.prototype.ValueBufferType=Array;ws.prototype.DefaultInterpolation=Qr;ws.prototype.InterpolantFactoryMethodLinear=void 0;ws.prototype.InterpolantFactoryMethodSmooth=void 0;var oc=class extends Ei{};oc.prototype.ValueTypeName="color";var is=class extends Ei{};is.prototype.ValueTypeName="number";var Pl=class extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Fn.slerpFlat(r,0,a,l-o,a,l,c);return r}},zi=class extends Ei{InterpolantFactoryMethodLinear(e){return new Pl(this.times,this.values,this.getValueSize(),e)}};zi.prototype.ValueTypeName="quaternion";zi.prototype.DefaultInterpolation=Xs;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var Is=class extends Ei{};Is.prototype.ValueTypeName="string";Is.prototype.ValueBufferType=Array;Is.prototype.DefaultInterpolation=Qr;Is.prototype.InterpolantFactoryMethodLinear=void 0;Is.prototype.InterpolantFactoryMethodSmooth=void 0;var ss=class extends Ei{};ss.prototype.ValueTypeName="vector";var jr=class{constructor(e,t=-1,n,i=Yl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ti(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push($_(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Ei.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=j_(c);c=Mf(c,1,h),l=Mf(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new is(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=i[u];f||(i[u]=f=[]),f.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,A,m,g){if(A.length!==0){let p=[],d=[];Yf(A,p,d,m),p.length!==0&&g.push(new u(f,p,d))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let A={},m;for(m=0;m<f.length;m++)if(f[m].morphTargets)for(let g=0;g<f[m].morphTargets.length;g++)A[f[m].morphTargets[g]]=-1;for(let g in A){let p=[],d=[];for(let x=0;x!==f[m].morphTargets.length;++x){let E=f[m];p.push(E.time),d.push(E.morphTarget===g?1:0)}i.push(new is(".morphTargetInfluence["+g+"]",p,d))}c=A.length*a}else{let A=".bones["+t[u].name+"]";n(ss,A+".position",f,"pos",i),n(zi,A+".quaternion",f,"rot",i),n(ss,A+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Z_(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return is;case"vector":case"vector2":case"vector3":case"vector4":return ss;case"color":return oc;case"quaternion":return zi;case"bool":case"boolean":return ws;case"string":return Is}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function $_(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Z_(s.type);if(s.times===void 0){let t=[],n=[];Yf(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var Es={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},Fl=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let A=l[u],m=l[u+1];if(A.global&&(A.lastIndex=0),A.test(h))return m}return null}}},eb=new Fl,Di=class{constructor(e){this.manager=e!==void 0?e:eb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Di.DEFAULT_MATERIAL_NAME="__DEFAULT";var ji={},Ul=class extends Error{constructor(e,t){super(e),this.response=t}},rs=class extends Di{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Es.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ji[e]!==void 0){ji[e].push({onLoad:t,onProgress:n,onError:i});return}ji[e]=[],ji[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||l.body===void 0||l.body.getReader===void 0)return l;let h=ji[e],u=l.body.getReader(),f=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),A=f?parseInt(f):0,m=A!==0,g=0,p=new ReadableStream({start(d){x();function x(){u.read().then(({done:E,value:T})=>{if(E)d.close();else{g+=T.byteLength;let N=new ProgressEvent("progress",{lengthComputable:m,loaded:g,total:A});for(let L=0,F=h.length;L<F;L++){let J=h[L];J.onProgress&&J.onProgress(N)}d.enqueue(T),x()}})}}});return new Response(p)}else throw new Ul(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),f=u&&u[1]?u[1].toLowerCase():void 0,A=new TextDecoder(f);return l.arrayBuffer().then(m=>A.decode(m))}}}).then(l=>{Es.add(e,l);let h=ji[e];delete ji[e];for(let u=0,f=h.length;u<f;u++){let A=h[u];A.onLoad&&A.onLoad(l)}}).catch(l=>{let h=ji[e];if(h===void 0)throw this.manager.itemError(e),l;delete ji[e];for(let u=0,f=h.length;u<f;u++){let A=h[u];A.onError&&A.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Nl=class extends Di{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Es.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;let o=Ba("img");function c(){h(),Es.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}};var cc=class extends Di{constructor(e){super(e)}load(e,t,n,i){let r=new Un,a=new Nl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},er=class extends nn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Oa=class extends er{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ge(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},cl=new dt,Sf=new k,Cf=new k,ka=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Je(512,512),this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Da,this._frameExtents=new Je(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Sf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sf),Cf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cf),t.updateMatrixWorld(),cl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(cl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ol=class extends ka{constructor(){super(new pn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Gr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},lc=class extends er{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Ol}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},wf=new dt,ba=new k,ll=new k,kl=class extends ka{constructor(){super(new pn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Je(4,2),this._viewportCount=6,this._viewports=[new Mt(2,1,1,1),new Mt(0,1,1,1),new Mt(3,1,1,1),new Mt(1,1,1,1),new Mt(3,0,1,1),new Mt(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ba.setFromMatrixPosition(e.matrixWorld),n.position.copy(ba),ll.copy(n.position),ll.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ll),n.updateMatrixWorld(),i.makeTranslation(-ba.x,-ba.y,-ba.z),wf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wf)}},Zr=class extends er{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new kl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Ql=class extends ka{constructor(){super(new vs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Li=class extends er{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new Ql}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},hc=class extends er{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ts=class{static decodeText(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var uc=class extends Di{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Es.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Es.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Es.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Es.add(e,c),r.manager.itemStart(e)}};var Gl=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){Fn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let a=this._workIndex*r;Fn.multiplyQuaternionsFlat(e,a,e,t,e,n),Fn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){let a=1-i;for(let o=0;o!==r;++o){let c=t+o;e[c]=e[c]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*i}}},$l="\\[\\]\\.:\\/",tb=new RegExp("["+$l+"]","g"),eh="[^"+$l+"]",nb="[^"+$l.replace("\\.","")+"]",ib=/((?:WC+[\/:])*)/.source.replace("WC",eh),sb=/(WCOD+)?/.source.replace("WCOD",nb),rb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",eh),ab=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",eh),ob=new RegExp("^"+ib+sb+rb+ab+"$"),cb=["material","materials","bones","map"],Hl=class{constructor(e,t,n){let i=n||tn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},tn=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(tb,"")}static parseTrackName(e){let t=ob.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);cb.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};tn.Composite=Hl;tn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};tn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};tn.prototype.GetterByBindingType=[tn.prototype._getValue_direct,tn.prototype._getValue_array,tn.prototype._getValue_arrayElement,tn.prototype._getValue_toArray];tn.prototype.SetterByBindingTypeAndVersioning=[[tn.prototype._setValue_direct,tn.prototype._setValue_direct_setNeedsUpdate,tn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tn.prototype._setValue_array,tn.prototype._setValue_array_setNeedsUpdate,tn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tn.prototype._setValue_arrayElement,tn.prototype._setValue_arrayElement_setNeedsUpdate,tn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tn.prototype._setValue_fromArray,tn.prototype._setValue_fromArray_setNeedsUpdate,tn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zl=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,a=r.length,o=new Array(a),c={endingStart:Rr,endingEnd:Rr};for(let l=0;l!==a;++l){let h=r[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=IA,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case BA:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case Yl:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,a=n===TA;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===Xl){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){let o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=Dr,i.endingEnd=Dr):(e?i.endingStart=this.zeroSlopeAtStart?Dr:Rr:i.endingStart=ko,t?i.endingEnd=this.zeroSlopeAtEnd?Dr:Rr:i.endingEnd=ko)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}},lb=new Float32Array(1),$r=class extends ts{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let f=i[u],A=f.name,m=h[A];if(m!==void 0)++m.referenceCount,a[u]=m;else{if(m=a[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,A));continue}let g=t&&t._propertyBindings[u].binding.parsedPath;m=new Gl(tn.create(n,A,g),f.ValueTypeName,f.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,A),a[u]=m}o[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new ac(new Float32Array(2),new Float32Array(2),1,lb),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,a=typeof e=="string"?jr.findByName(i,e):e,o=a!==null?a.uuid:e,c=this._actionsByClip[o],l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Yl),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;let h=new zl(this,a,t,n);return this._bindAction(h,l),this._addInactiveAction(h,o,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?jr.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,r,a);let o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){let l=a[o];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vl}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vl);function _c(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new sn,l=0;for(let h=0;h<s.length;++h){let u=s[h],f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let A in u.attributes){if(!n.has(A))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+A+'" attribute exists among all geometries, or in none of them.'),null;r[A]===void 0&&(r[A]=[]),r[A].push(u.attributes[A]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let A in u.morphAttributes){if(!i.has(A))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[A]===void 0&&(a[A]=[]),a[A].push(u.morphAttributes[A])}if(e){let A;if(t)A=u.index.count;else if(u.attributes.position!==void 0)A=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,A,h),l+=A}}if(t){let h=0,u=[];for(let f=0;f<s.length;++f){let A=s[f].index;for(let m=0;m<A.count;++m)u.push(A.getX(m)+h);h+=s[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=jf(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let A=[];for(let g=0;g<a[h].length;++g)A.push(a[h][g][f]);let m=jf(A);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}return c}function jf(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){let h=s[l];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}let a=new e(r),o=0;for(let l=0;l<s.length;++l)a.set(s[l].array,o),o+=s[l].array.length;let c=new Dt(a,t,n);return i!==void 0&&(c.gpuType=i),c}function th(s,e){if(e===Ff)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Qa||e===mc){let t=s.getIndex();if(t===null){let a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===Qa)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var ia=class extends Di{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ch(t)}),this.register(function(t){return new gh(t)}),this.register(function(t){return new _h(t)}),this.register(function(t){return new bh(t)}),this.register(function(t){return new hh(t)}),this.register(function(t){return new uh(t)}),this.register(function(t){return new fh(t)}),this.register(function(t){return new dh(t)}),this.register(function(t){return new oh(t)}),this.register(function(t){return new Ah(t)}),this.register(function(t){return new lh(t)}),this.register(function(t){return new mh(t)}),this.register(function(t){return new ph(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new Eh(t)}),this.register(function(t){return new xh(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Ts.extractUrlBase(e);a=Ts.resolveURL(l,this.path)}else a=Ts.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new rs(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===nd){try{a[Pt.KHR_BINARY_GLTF]=new yh(e)}catch(u){i&&i(u);return}r=JSON.parse(a[Pt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Th(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case Pt.KHR_MATERIALS_UNLIT:a[u]=new ah;break;case Pt.KHR_DRACO_MESH_COMPRESSION:a[u]=new vh(r,this.dracoLoader);break;case Pt.KHR_TEXTURE_TRANSFORM:a[u]=new Mh;break;case Pt.KHR_MESH_QUANTIZATION:a[u]=new Sh;break;default:f.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function hb(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var Pt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},rh=class{constructor(e){this.parser=e,this.name=Pt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ge(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],vn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Li(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Zr(h),l.distance=u;break;case"spot":l=new lc(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Rs(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},ah=class{constructor(){this.name=Pt.KHR_MATERIALS_UNLIT}getMaterialType(){return un}extendParams(e,t,n){let i=[];e.color=new Ge(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],vn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,kt))}return Promise.all(i)}},oh=class{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},ch=class{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:bi}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Je(o,o)}return Promise.all(r)}},lh=class{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:bi}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},hh=class{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:bi}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ge(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],vn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,kt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},uh=class{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:bi}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},fh=class{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:bi}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ge().setRGB(o[0],o[1],o[2],vn),Promise.all(r)}},dh=class{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:bi}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Ah=class{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:bi}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ge().setRGB(o[0],o[1],o[2],vn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,kt)),Promise.all(r)}},ph=class{constructor(e){this.parser=e,this.name=Pt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:bi}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},mh=class{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:bi}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},gh=class{constructor(e){this.parser=e,this.name=Pt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},_h=class{constructor(e){this.parser=e,this.name=Pt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},bh=class{constructor(e){this.parser=e,this.name=Pt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Eh=class{constructor(e){this.name=Pt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,f,i.mode,i.filter).then(function(A){return A.buffer}):a.ready.then(function(){let A=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(A),h,u,f,i.mode,i.filter),A})})}else return null}},xh=class{constructor(e){this.name=Pt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==xi.TRIANGLES&&l.mode!==xi.TRIANGLE_STRIP&&l.mode!==xi.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,A=[];for(let m of u){let g=new dt,p=new k,d=new Fn,x=new k(1,1,1),E=new _i(m.geometry,m.material,f);for(let T=0;T<f;T++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,T),c.ROTATION&&d.fromBufferAttribute(c.ROTATION,T),c.SCALE&&x.fromBufferAttribute(c.SCALE,T),E.setMatrixAt(T,g.compose(p,d,x));for(let T in c)if(T==="_COLOR_0"){let N=c[T];E.instanceColor=new gi(N.array,N.itemSize,N.normalized)}else T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"&&m.geometry.setAttribute(T,c[T]);nn.prototype.copy.call(E,m),this.parser.assignFinalMaterial(E),A.push(E)}return h.isGroup?(h.clear(),h.add(...A),h):A[0]}))}},nd="glTF",Ha=12,Zf={JSON:1313821514,BIN:5130562},yh=class{constructor(e){this.name=Pt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Ha),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==nd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Ha,r=new DataView(e,Ha),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===Zf.JSON){let l=new Uint8Array(e,Ha+a,o);this.content=n.decode(l)}else if(c===Zf.BIN){let l=Ha+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},vh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Pt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=wh[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=wh[h]||h.toLowerCase();if(a[h]!==void 0){let f=n.accessors[e.attributes[h]],A=na[f.componentType];l[u]=A.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){i.decodeDracoFile(h,function(A){for(let m in A.attributes){let g=A.attributes[m],p=c[m];p!==void 0&&(g.normalized=p)}u(A)},o,l,vn,f)})})}},Mh=class{constructor(){this.name=Pt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Sh=class{constructor(){this.name=Pt.KHR_MESH_QUANTIZATION}},bc=class extends Cs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,f=u*u,A=f*u,m=e*l,g=m-l,p=-2*A+3*f,d=A-f,x=1-p,E=d-f+u;for(let T=0;T!==o;T++){let N=a[g+T+o],L=a[g+T+c]*h,F=a[m+T+o],J=a[m+T]*h;r[T]=x*N+E*L+p*F+d*J}return r}},ub=new Fn,Ch=class extends bc{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return ub.fromArray(r).normalize().toArray(r),r}},xi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},na={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},$f={9728:Tn,9729:An,9984:Lo,9985:Kl,9986:Ea,9987:Ai},ed={33071:ni,33648:Ia,10497:Bi},nh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},wh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Bs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},fb={CUBICSPLINE:void 0,LINEAR:Xs,STEP:Qr},ih={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function db(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Vt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ki})),s.DefaultMaterial}function ir(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Rs(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Ab(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(f)}if(i){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function pb(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function mb(s){let e,t=s.extensions&&s.extensions[Pt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+sh(t.attributes):e=s.indices+":"+sh(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+sh(s.targets[n]);return e}function sh(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Ih(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function gb(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var _b=new dt,Th=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new hb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator!="undefined"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap=="undefined"||n||i&&r<98?this.textureLoader=new cc(this.options.manager):this.textureLoader=new uc(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new rs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return ir(r,o,i),Rs(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Pt.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(Ts.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=nh[i.type],o=na[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Dt(l,a,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=nh[i.type],l=na[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=i.byteOffset||0,A=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,g,p;if(A&&A!==u){let d=Math.floor(f/A),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+d+":"+i.count,E=t.cache.get(x);E||(g=new l(o,d*A,i.count*A/h),E=new qr(g,A/h),t.cache.add(x,E)),p=new Js(E,c,f%A/h,m)}else o===null?g=new l(i.count*c):g=new l(o,f,i.count*c),p=new Dt(g,c,m);if(i.sparse!==void 0){let d=nh.SCALAR,x=na[i.sparse.indices.componentType],E=i.sparse.indices.byteOffset||0,T=i.sparse.values.byteOffset||0,N=new x(a[1],E,i.sparse.count*d),L=new l(a[2],T,i.sparse.count*c);o!==null&&(p=new Dt(p.array.slice(),p.itemSize,p.normalized));for(let F=0,J=N.length;F<J;F++){let S=N[F];if(p.setX(S,L[F*c]),c>=2&&p.setY(S,L[F*c+1]),c>=3&&p.setZ(S,L[F*c+2]),c>=4&&p.setW(S,L[F*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return h.magFilter=$f[f.magFilter]||An,h.minFilter=$f[f.minFilter]||Ai,h.wrapS=ed[f.wrapS]||Bi,h.wrapT=ed[f.wrapT]||Bi,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,A){let m=f;t.isImageBitmapLoader===!0&&(m=function(g){let p=new Un(g);p.needsUpdate=!0,f(p)}),t.load(Ts.resolveURL(u,r.path),m,void 0,A)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),u.userData.mimeType=a.mimeType||gb(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Pt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Pt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[Pt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Ua,Jn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Fa,Jn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Vt}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[Pt.KHR_MATERIALS_UNLIT]){let u=i[Pt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Ge(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],vn),o.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,kt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Cn);let h=r.alphaMode||ih.OPAQUE;if(h===ih.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===ih.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==un&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Je(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==un&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==un){let u=r.emissiveFactor;o.emissive=new Ge().setRGB(u[0],u[1],u[2],vn)}return r.emissiveTexture!==void 0&&a!==un&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,kt)),Promise.all(l).then(function(){let u=new a(o);return r.name&&(u.name=r.name),Rs(u,r),t.associations.set(u,{materials:e}),r.extensions&&ir(i,u,r),u})}createUniqueName(e){let t=tn.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Pt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return td(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=mb(l),u=i[h];if(u)a.push(u.promise);else{let f;l.extensions&&l.extensions[Pt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=td(new sn,l,t),i[h]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?db(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let A=0,m=h.length;A<m;A++){let g=h[A],p=a[A],d,x=l[A];if(p.mode===xi.TRIANGLES||p.mode===xi.TRIANGLE_STRIP||p.mode===xi.TRIANGLE_FAN||p.mode===void 0)d=r.isSkinnedMesh===!0?new Gi(g,x):new Ke(g,x),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),p.mode===xi.TRIANGLE_STRIP?d.geometry=th(d.geometry,mc):p.mode===xi.TRIANGLE_FAN&&(d.geometry=th(d.geometry,Qa));else if(p.mode===xi.LINES)d=new Yr(g,x);else if(p.mode===xi.LINE_STRIP)d=new Xr(g,x);else if(p.mode===xi.LINE_LOOP)d=new tc(g,x);else if(p.mode===xi.POINTS)d=new Ss(g,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(d.geometry.morphAttributes).length>0&&pb(d,r),d.name=t.createUniqueName(r.name||"mesh_"+e),Rs(d,r),p.extensions&&ir(i,d,p),t.assignFinalMaterial(d),u.push(d)}for(let A=0,m=u.length;A<m;A++)t.associations.set(u[A],{meshes:e,primitives:A});if(u.length===1)return r.extensions&&ir(i,u[0],r),u[0];let f=new Gn;r.extensions&&ir(i,f,r),t.associations.set(f,{meshes:e});for(let A=0,m=u.length;A<m;A++)f.add(u[A]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new pn(Of.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new vs(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Rs(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let f=new dt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Zs(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,f=i.channels.length;u<f;u++){let A=i.channels[u],m=i.samplers[A.sampler],g=A.target,p=g.node,d=i.parameters!==void 0?i.parameters[m.input]:m.input,x=i.parameters!==void 0?i.parameters[m.output]:m.output;g.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",d)),c.push(this.getDependency("accessor",x)),l.push(m),h.push(g))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],A=u[1],m=u[2],g=u[3],p=u[4],d=[];for(let x=0,E=f.length;x<E;x++){let T=f[x],N=A[x],L=m[x],F=g[x],J=p[x];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let S=n._createAnimationTracks(T,N,L,F,J);if(S)for(let P=0;P<S.length;P++)d.push(S[P])}return new jr(r,void 0,d)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(A){A.isSkinnedMesh&&A.bind(f,_b)});for(let A=0,m=u.length;A<m;A++)h.add(u[A]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Pa:l.length>1?h=new Gn:l.length===1?h=l[0]:h=new nn,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Rs(h,r),r.extensions&&ir(n,h,r),r.matrix!==void 0){let u=new dt;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Gn;n.name&&(r.name=i.createUniqueName(n.name)),Rs(r,n),n.extensions&&ir(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,A]of i.associations)(f instanceof Jn||f instanceof Un)&&u.set(f,A);return h.traverse(f=>{let A=i.associations.get(f);A!=null&&u.set(f,A)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,c=[];Bs[r.path]===Bs.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(o);let l;switch(Bs[r.path]){case Bs.weights:l=is;break;case Bs.rotation:l=zi;break;case Bs.position:case Bs.scale:l=ss;break;default:switch(n.itemSize){case 1:l=is;break;case 2:case 3:default:l=ss;break}break}let h=i.interpolation!==void 0?fb[i.interpolation]:Xs,u=this._getArrayFromAccessor(n);for(let f=0,A=c.length;f<A;f++){let m=new l(c[f]+"."+Bs[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Ih(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof zi?Ch:bc;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function bb(s,e,t){let n=e.attributes,i=new pi;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new k(c[0],c[1],c[2]),new k(l[0],l[1],l[2])),o.normalized){let h=Ih(na[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new k,c=new k;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],A=f.min,m=f.max;if(A!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(A[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(A[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(A[2]),Math.abs(m[2]))),f.normalized){let g=Ih(na[f.componentType]);c.multiplyScalar(g)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new bn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function td(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(let a in n){let o=wh[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Gt.workingColorSpace!==vn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Gt.workingColorSpace}" not supported.`),Rs(s,e),bb(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Ab(s,e.targets,t):s})}var Ec=function(){"use strict";var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:s,r,a=WebAssembly.instantiate(o(i),{}).then(function(d){r=d.instance,r.exports.__wasm_call_ctors()});function o(d){for(var x=new Uint8Array(d.length),E=0;E<d.length;++E){var T=d.charCodeAt(E);x[E]=T>96?T-97:T>64?T-39:T+4}for(var N=0,E=0;E<d.length;++E)x[N++]=x[E]<60?n[x[E]]:(x[E]-60)*64+x[++E];return x.buffer.slice(0,N)}function c(d,x,E,T,N,L){var F=r.exports.sbrk,J=E+3&-4,S=F(J*T),P=F(N.length),X=new Uint8Array(r.exports.memory.buffer);X.set(N,P);var re=d(S,E,T,P,N.length);if(re==0&&L&&L(S,J,T),x.set(X.subarray(S,S+E*T)),F(S-F(0)),re!=0)throw new Error("Malformed buffer data: "+re)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],f=0;function A(d){var x={object:new Worker(d),pending:0,requests:{}};return x.object.onmessage=function(E){var T=E.data;x.pending-=T.count,x.requests[T.id][T.action](T.value),delete x.requests[T.id]},x}function m(d){for(var x="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+p.toString(),E=new Blob([x],{type:"text/javascript"}),T=URL.createObjectURL(E),N=0;N<d;++N)u[N]=A(T);URL.revokeObjectURL(T)}function g(d,x,E,T,N){for(var L=u[0],F=1;F<u.length;++F)u[F].pending<L.pending&&(L=u[F]);return new Promise(function(J,S){var P=new Uint8Array(E),X=f++;L.pending+=d,L.requests[X]={resolve:J,reject:S},L.object.postMessage({id:X,count:d,size:x,source:P,mode:T,filter:N},[P.buffer])})}function p(d){a.then(function(){var x=d.data;try{var E=new Uint8Array(x.count*x.size);c(r.exports[x.mode],E,x.count,x.size,x.source,r.exports[x.filter]),self.postMessage({id:x.id,count:x.count,action:"resolve",value:E},[E.buffer])}catch(T){self.postMessage({id:x.id,count:x.count,action:"reject",value:T})}})}return{ready:a,supported:!0,useWorkers:function(d){m(d)},decodeVertexBuffer:function(d,x,E,T,N){c(r.exports.meshopt_decodeVertexBuffer,d,x,E,T,r.exports[l[N]])},decodeIndexBuffer:function(d,x,E,T){c(r.exports.meshopt_decodeIndexBuffer,d,x,E,T)},decodeIndexSequence:function(d,x,E,T){c(r.exports.meshopt_decodeIndexSequence,d,x,E,T)},decodeGltfBuffer:function(d,x,E,T,N,L){c(r.exports[h[N]],d,x,E,T,r.exports[l[L]])},decodeGltfBufferAsync:function(d,x,E,T,N){return u.length>0?g(d,x,E,h[T],l[N]):a.then(function(){var L=new Uint8Array(d*x);return c(r.exports[h[T]],L,d,x,E,r.exports[l[N]]),L})}}}();function id(s){let e=new Map,t=new Map,n=s.clone();return sd(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function sd(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)sd(s.children[n],e.children[n],t)}var za=class extends Ms{constructor(e=null){super();let t=new fn;t.deleteAttribute("uv");let n=new Vt({side:Pn}),i=new Vt,r=5;e!==null&&e._useLegacyLights===!1&&(r=900);let a=new Zr(16777215,r,28,2);a.position.set(.418,16.199,.3),this.add(a);let o=new Ke(t,n);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);let c=new Ke(t,i);c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),this.add(c);let l=new Ke(t,i);l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),this.add(l);let h=new Ke(t,i);h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),this.add(h);let u=new Ke(t,i);u.position.set(-2.017,.018,6.124),u.rotation.set(0,.333,0),u.scale.set(2.002,4.566,2.064),this.add(u);let f=new Ke(t,i);f.position.set(2.291,-.756,-2.621),f.rotation.set(0,-.286,0),f.scale.set(1.546,1.552,1.496),this.add(f);let A=new Ke(t,i);A.position.set(-2.193,-.369,-5.547),A.rotation.set(0,.516,0),A.scale.set(3.875,3.487,2.986),this.add(A);let m=new Ke(t,sa(50));m.position.set(-16.116,14.37,8.208),m.scale.set(.1,2.428,2.739),this.add(m);let g=new Ke(t,sa(50));g.position.set(-16.109,18.021,-8.207),g.scale.set(.1,2.425,2.751),this.add(g);let p=new Ke(t,sa(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);let d=new Ke(t,sa(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let x=new Ke(t,sa(20));x.position.set(3.235,11.486,-12.541),x.scale.set(2.5,2,.1),this.add(x);let E=new Ke(t,sa(100));E.position.set(0,20,0),E.scale.set(1,.1,1),this.add(E)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function sa(s){let e=new un;return e.color.setScalar(s),e}var xc=class{constructor(e=4){this.pool=e,this.queue=[],this.workers=[],this.workersResolve=[],this.workerStatus=0}_initWorker(e){if(!this.workers[e]){let t=this.workerCreator();t.addEventListener("message",this._onMessage.bind(this,e)),this.workers[e]=t}}_getIdleWorker(){for(let e=0;e<this.pool;e++)if(!(this.workerStatus&1<<e))return e;return-1}_onMessage(e,t){let n=this.workersResolve[e];if(n&&n(t),this.queue.length){let{resolve:i,msg:r,transfer:a}=this.queue.shift();this.workersResolve[e]=i,this.workers[e].postMessage(r,a)}else this.workerStatus^=1<<e}setWorkerCreator(e){this.workerCreator=e}setWorkerLimit(e){this.pool=e}postMessage(e,t){return new Promise(n=>{let i=this._getIdleWorker();i!==-1?(this._initWorker(i),this.workerStatus|=1<<i,this.workersResolve[i]=n,this.workers[i].postMessage(e,t)):this.queue.push({resolve:n,msg:e,transfer:t})})}dispose(){this.workers.forEach(e=>e.terminate()),this.workersResolve.length=0,this.workers.length=0,this.queue.length=0,this.workerStatus=0}};var Bh=class{constructor(){this.vkFormat=0,this.typeSize=1,this.pixelWidth=0,this.pixelHeight=0,this.pixelDepth=0,this.layerCount=0,this.faceCount=1,this.supercompressionScheme=0,this.levels=[],this.dataFormatDescriptor=[{vendorId:0,descriptorType:0,descriptorBlockSize:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],this.keyValue={},this.globalData=null}},sr=class{constructor(e,t,n,i){this._dataView=new DataView(e.buffer,e.byteOffset+t,n),this._littleEndian=i,this._offset=0}_nextUint8(){let e=this._dataView.getUint8(this._offset);return this._offset+=1,e}_nextUint16(){let e=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,e}_nextUint32(){let e=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint64(){let e=this._dataView.getUint32(this._offset,this._littleEndian)+4294967296*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,e}_nextInt32(){let e=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,e}_skip(e){return this._offset+=e,this}_scan(e,t=0){let n=this._offset,i=0;for(;this._dataView.getUint8(this._offset)!==t&&i<e;)i++,this._offset++;return i<e&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+n,i)}},Xb=new Uint8Array([0]),Zn=[171,75,84,88,32,50,48,187,13,10,26,10];function rd(s){return typeof TextDecoder!="undefined"?new TextDecoder().decode(s):Buffer.from(s).toString("utf8")}function ad(s){let e=new Uint8Array(s.buffer,s.byteOffset,Zn.length);if(e[0]!==Zn[0]||e[1]!==Zn[1]||e[2]!==Zn[2]||e[3]!==Zn[3]||e[4]!==Zn[4]||e[5]!==Zn[5]||e[6]!==Zn[6]||e[7]!==Zn[7]||e[8]!==Zn[8]||e[9]!==Zn[9]||e[10]!==Zn[10]||e[11]!==Zn[11])throw new Error("Missing KTX 2.0 identifier.");let t=new Bh,n=17*Uint32Array.BYTES_PER_ELEMENT,i=new sr(s,Zn.length,n,!0);t.vkFormat=i._nextUint32(),t.typeSize=i._nextUint32(),t.pixelWidth=i._nextUint32(),t.pixelHeight=i._nextUint32(),t.pixelDepth=i._nextUint32(),t.layerCount=i._nextUint32(),t.faceCount=i._nextUint32();let r=i._nextUint32();t.supercompressionScheme=i._nextUint32();let a=i._nextUint32(),o=i._nextUint32(),c=i._nextUint32(),l=i._nextUint32(),h=i._nextUint64(),u=i._nextUint64(),f=new sr(s,Zn.length+n,3*r*8,!0);for(let pe=0;pe<r;pe++)t.levels.push({levelData:new Uint8Array(s.buffer,s.byteOffset+f._nextUint64(),f._nextUint64()),uncompressedByteLength:f._nextUint64()});let A=new sr(s,a,o,!0),m={vendorId:A._skip(4)._nextUint16(),descriptorType:A._nextUint16(),versionNumber:A._nextUint16(),descriptorBlockSize:A._nextUint16(),colorModel:A._nextUint8(),colorPrimaries:A._nextUint8(),transferFunction:A._nextUint8(),flags:A._nextUint8(),texelBlockDimension:[A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8()],bytesPlane:[A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8()],samples:[]},g=(m.descriptorBlockSize/4-6)/4;for(let pe=0;pe<g;pe++){let ue={bitOffset:A._nextUint16(),bitLength:A._nextUint8(),channelType:A._nextUint8(),samplePosition:[A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8()],sampleLower:-1/0,sampleUpper:1/0};64&ue.channelType?(ue.sampleLower=A._nextInt32(),ue.sampleUpper=A._nextInt32()):(ue.sampleLower=A._nextUint32(),ue.sampleUpper=A._nextUint32()),m.samples[pe]=ue}t.dataFormatDescriptor.length=0,t.dataFormatDescriptor.push(m);let p=new sr(s,c,l,!0);for(;p._offset<l;){let pe=p._nextUint32(),ue=p._scan(pe),Ae=rd(ue),me=p._scan(pe-ue.byteLength);t.keyValue[Ae]=Ae.match(/^ktx/i)?rd(me):me,p._offset%4&&p._skip(4-p._offset%4)}if(u<=0)return t;let d=new sr(s,h,u,!0),x=d._nextUint16(),E=d._nextUint16(),T=d._nextUint32(),N=d._nextUint32(),L=d._nextUint32(),F=d._nextUint32(),J=[];for(let pe=0;pe<r;pe++)J.push({imageFlags:d._nextUint32(),rgbSliceByteOffset:d._nextUint32(),rgbSliceByteLength:d._nextUint32(),alphaSliceByteOffset:d._nextUint32(),alphaSliceByteLength:d._nextUint32()});let S=h+d._offset,P=S+T,X=P+N,re=X+L,xe=new Uint8Array(s.buffer,s.byteOffset+S,T),G=new Uint8Array(s.buffer,s.byteOffset+P,N),Y=new Uint8Array(s.buffer,s.byteOffset+X,L),ce=new Uint8Array(s.buffer,s.byteOffset+re,F);return t.globalData={endpointCount:x,selectorCount:E,imageDescs:J,endpointsData:xe,selectorsData:G,tablesData:Y,extendedData:ce},t}var Rh,as,Lh,Dh={env:{emscripten_notify_memory_growth:function(s){Lh=new Uint8Array(as.exports.memory.buffer)}}},yc=class{init(){return Rh||(Rh=typeof fetch!="undefined"?fetch("data:application/wasm;base64,"+od).then(e=>e.arrayBuffer()).then(e=>WebAssembly.instantiate(e,Dh)).then(this._init):WebAssembly.instantiate(Buffer.from(od,"base64"),Dh).then(this._init),Rh)}_init(e){as=e.instance,Dh.env.emscripten_notify_memory_growth(0)}decode(e,t=0){if(!as)throw new Error("ZSTDDecoder: Await .init() before decoding.");let n=e.byteLength,i=as.exports.malloc(n);Lh.set(e,i),t=t||Number(as.exports.ZSTD_findDecompressedSize(i,n));let r=as.exports.malloc(t),a=as.exports.ZSTD_decompress(r,t,i,n),o=Lh.slice(r,r+a);return as.exports.free(i),as.exports.free(r),o}},od="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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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";var Ph=new WeakMap,Fh=0,Uh,Ds=class s extends Di{constructor(e){super(e),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerPool=new xc,this.workerSourceURL="",this.workerConfig=null,typeof MSC_TRANSCODER!="undefined"&&console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.')}setTranscoderPath(e){return this.transcoderPath=e,this}setWorkerLimit(e){return this.workerPool.setWorkerLimit(e),this}detectSupport(e){return e.isWebGPURenderer===!0?this.workerConfig={astcSupported:e.hasFeature("texture-compression-astc"),etc1Supported:!1,etc2Supported:e.hasFeature("texture-compression-etc2"),dxtSupported:e.hasFeature("texture-compression-bc"),bptcSupported:!1,pvrtcSupported:!1}:(this.workerConfig={astcSupported:e.extensions.has("WEBGL_compressed_texture_astc"),etc1Supported:e.extensions.has("WEBGL_compressed_texture_etc1"),etc2Supported:e.extensions.has("WEBGL_compressed_texture_etc"),dxtSupported:e.extensions.has("WEBGL_compressed_texture_s3tc"),bptcSupported:e.extensions.has("EXT_texture_compression_bptc"),pvrtcSupported:e.extensions.has("WEBGL_compressed_texture_pvrtc")||e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")},e.capabilities.isWebGL2&&(this.workerConfig.etc1Supported=!1)),this}init(){if(!this.transcoderPending){let e=new rs(this.manager);e.setPath(this.transcoderPath),e.setWithCredentials(this.withCredentials);let t=e.loadAsync("basis_transcoder.js"),n=new rs(this.manager);n.setPath(this.transcoderPath),n.setResponseType("arraybuffer"),n.setWithCredentials(this.withCredentials);let i=n.loadAsync("basis_transcoder.wasm");this.transcoderPending=Promise.all([t,i]).then(([r,a])=>{let o=s.BasisWorker.toString(),c=["/* constants */","let _EngineFormat = "+JSON.stringify(s.EngineFormat),"let _TranscoderFormat = "+JSON.stringify(s.TranscoderFormat),"let _BasisFormat = "+JSON.stringify(s.BasisFormat),"/* basis_transcoder.js */",r,"/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([c])),this.transcoderBinary=a,this.workerPool.setWorkerCreator(()=>{let l=new Worker(this.workerSourceURL),h=this.transcoderBinary.slice(0);return l.postMessage({type:"init",config:this.workerConfig,transcoderBinary:h},[h]),l})}),Fh>0&&console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."),Fh++}return this.transcoderPending}load(e,t,n,i){if(this.workerConfig===null)throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");let r=new rs(this.manager);r.setResponseType("arraybuffer"),r.setWithCredentials(this.withCredentials),r.load(e,a=>{if(Ph.has(a))return Ph.get(a).promise.then(t).catch(i);this._createTexture(a).then(o=>t?t(o):null).catch(i)},n,i)}_createTextureFrom(e,t){let{faces:n,width:i,height:r,format:a,type:o,error:c,dfdFlags:l}=e;if(o==="error")return Promise.reject(c);let h;if(t.faceCount===6)h=new ic(n,a,wn);else{let u=n[0].mipmaps;h=t.layerCount>1?new nc(u,i,r,t.layerCount,a,wn):new $s(u,i,r,a,wn)}return h.minFilter=n[0].mipmaps.length===1?An:Ai,h.magFilter=An,h.generateMipmaps=!1,h.needsUpdate=!0,h.colorSpace=Md(t),h.premultiplyAlpha=!!(l&1),h}async _createTexture(e,t={}){let n=ad(new Uint8Array(e));if(n.vkFormat!==0)return Ib(n);let i=t,r=this.init().then(()=>this.workerPool.postMessage({type:"transcode",buffer:e,taskConfig:i},[e])).then(a=>this._createTextureFrom(a.data,n));return Ph.set(e,{promise:r}),r}dispose(){return this.workerPool.dispose(),this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),Fh--,this}};Ds.BasisFormat={ETC1S:0,UASTC_4x4:1};Ds.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16};Ds.EngineFormat={RGBAFormat:yn,RGBA_ASTC_4x4_Format:Oo,RGBA_BPTC_Format:va,RGBA_ETC2_EAC_Format:No,RGBA_PVRTC_4BPPV1_Format:Fo,RGBA_S3TC_DXT5_Format:ya,RGB_ETC1_Format:pc,RGB_ETC2_Format:Uo,RGB_PVRTC_4BPPV1_Format:Po,RGB_S3TC_DXT1_Format:xa};Ds.BasisWorker=function(){let s,e,t,n=_EngineFormat,i=_TranscoderFormat,r=_BasisFormat;self.addEventListener("message",function(m){let g=m.data;switch(g.type){case"init":s=g.config,a(g.transcoderBinary);break;case"transcode":e.then(()=>{try{let{faces:p,buffers:d,width:x,height:E,hasAlpha:T,format:N,dfdFlags:L}=o(g.buffer);self.postMessage({type:"transcode",id:g.id,faces:p,width:x,height:E,hasAlpha:T,format:N,dfdFlags:L},d)}catch(p){console.error(p),self.postMessage({type:"error",id:g.id,error:p.message})}});break}});function a(m){e=new Promise(g=>{t={wasmBinary:m,onRuntimeInitialized:g},BASIS(t)}).then(()=>{t.initializeBasis(),t.KTX2File===void 0&&console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.")})}function o(m){let g=new t.KTX2File(new Uint8Array(m));function p(){g.close(),g.delete()}if(!g.isValid())throw p(),new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");let d=g.isUASTC()?r.UASTC_4x4:r.ETC1S,x=g.getWidth(),E=g.getHeight(),T=g.getLayers()||1,N=g.getLevels(),L=g.getFaces(),F=g.getHasAlpha(),J=g.getDFDFlags(),{transcoderFormat:S,engineFormat:P}=u(d,x,E,F);if(!x||!E||!N)throw p(),new Error("THREE.KTX2Loader:	Invalid texture");if(!g.startTranscoding())throw p(),new Error("THREE.KTX2Loader: .startTranscoding failed");let X=[],re=[];for(let xe=0;xe<L;xe++){let G=[];for(let Y=0;Y<N;Y++){let ce=[],pe,ue;for(let me=0;me<T;me++){let ye=g.getImageLevelInfo(Y,me,xe);xe===0&&Y===0&&me===0&&(ye.origWidth%4!==0||ye.origHeight%4!==0)&&console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."),N>1?(pe=ye.origWidth,ue=ye.origHeight):(pe=ye.width,ue=ye.height);let Ue=new Uint8Array(g.getImageTranscodedSizeInBytes(Y,me,0,S));if(!g.transcodeImage(Ue,Y,me,xe,S,0,-1,-1))throw p(),new Error("THREE.KTX2Loader: .transcodeImage failed.");ce.push(Ue)}let Ae=A(ce);G.push({data:Ae,width:pe,height:ue}),re.push(Ae.buffer)}X.push({mipmaps:G,width:x,height:E,format:P})}return p(),{faces:X,buffers:re,width:x,height:E,hasAlpha:F,format:P,dfdFlags:J}}let c=[{if:"astcSupported",basisFormat:[r.UASTC_4x4],transcoderFormat:[i.ASTC_4x4,i.ASTC_4x4],engineFormat:[n.RGBA_ASTC_4x4_Format,n.RGBA_ASTC_4x4_Format],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:"bptcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.BC7_M5,i.BC7_M5],engineFormat:[n.RGBA_BPTC_Format,n.RGBA_BPTC_Format],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:"dxtSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.BC1,i.BC3],engineFormat:[n.RGB_S3TC_DXT1_Format,n.RGBA_S3TC_DXT5_Format],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:"etc2Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.ETC1,i.ETC2],engineFormat:[n.RGB_ETC2_Format,n.RGBA_ETC2_EAC_Format],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:"etc1Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.ETC1],engineFormat:[n.RGB_ETC1_Format],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:"pvrtcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.PVRTC1_4_RGB,i.PVRTC1_4_RGBA],engineFormat:[n.RGB_PVRTC_4BPPV1_Format,n.RGBA_PVRTC_4BPPV1_Format],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0}],l=c.sort(function(m,g){return m.priorityETC1S-g.priorityETC1S}),h=c.sort(function(m,g){return m.priorityUASTC-g.priorityUASTC});function u(m,g,p,d){let x,E,T=m===r.ETC1S?l:h;for(let N=0;N<T.length;N++){let L=T[N];if(s[L.if]&&L.basisFormat.includes(m)&&!(d&&L.transcoderFormat.length<2)&&!(L.needsPowerOfTwo&&!(f(g)&&f(p))))return x=L.transcoderFormat[d?1:0],E=L.engineFormat[d?1:0],{transcoderFormat:x,engineFormat:E}}return console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."),x=i.RGBA32,E=n.RGBAFormat,{transcoderFormat:x,engineFormat:E}}function f(m){return m<=2?!0:(m&m-1)===0&&m!==0}function A(m){if(m.length===1)return m[0];let g=0;for(let x=0;x<m.length;x++){let E=m[x];g+=E.byteLength}let p=new Uint8Array(g),d=0;for(let x=0;x<m.length;x++){let E=m[x];p.set(E,d),d+=E.byteLength}return p}};var wb=new Set([yn,nr,tr]),Nh={[109]:yn,[97]:yn,[37]:yn,[43]:yn,[103]:nr,[83]:nr,[16]:nr,[22]:nr,[100]:tr,[76]:tr,[15]:tr,[9]:tr,[166]:Ta,[165]:Ta},Oh={[109]:ii,[97]:Qi,[37]:wn,[43]:wn,[103]:ii,[83]:Qi,[16]:wn,[22]:wn,[100]:ii,[76]:Qi,[15]:wn,[9]:wn,[166]:wn,[165]:wn};async function Ib(s){let{vkFormat:e}=s;if(Nh[e]===void 0)throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");let t;s.supercompressionScheme===2&&(Uh||(Uh=new Promise(async r=>{let a=new yc;await a.init(),r(a)})),t=await Uh);let n=[];for(let r=0;r<s.levels.length;r++){let a=Math.max(1,s.pixelWidth>>r),o=Math.max(1,s.pixelHeight>>r),c=s.pixelDepth?Math.max(1,s.pixelDepth>>r):0,l=s.levels[r],h;if(s.supercompressionScheme===0)h=l.levelData;else if(s.supercompressionScheme===2)h=t.decode(l.levelData,l.uncompressedByteLength);else throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");let u;Oh[e]===ii?u=new Float32Array(h.buffer,h.byteOffset,h.byteLength/Float32Array.BYTES_PER_ELEMENT):Oh[e]===Qi?u=new Uint16Array(h.buffer,h.byteOffset,h.byteLength/Uint16Array.BYTES_PER_ELEMENT):u=h,n.push({data:u,width:a,height:o,depth:c})}let i;if(wb.has(Nh[e]))i=s.pixelDepth===0?new js(n[0].data,s.pixelWidth,s.pixelHeight):new Ra(n[0].data,s.pixelWidth,s.pixelHeight,s.pixelDepth);else{if(s.pixelDepth>0)throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");i=new $s(n,s.pixelWidth,s.pixelHeight)}return i.mipmaps=n,i.type=Oh[e],i.format=Nh[e],i.colorSpace=Md(s),i.needsUpdate=!0,Promise.resolve(i)}function Md(s){let e=s.dataFormatDescriptor[0];return e.colorPrimaries===1?e.transferFunction===2?kt:vn:e.colorPrimaries===10?e.transferFunction===2?Ga:ea:e.colorPrimaries===0?Yn:(console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${e.colorPrimaries}"`),Yn)}var os=k,Sd=Fn,cs=(s,e,t)=>s<e?e:s>t?t:s,vc=(s,e,t)=>{let n=cs((t-s)/(e-s),0,1);return n*n*(3-2*n)},Tb=1.9405,Cd={Pass:{dur:.6,contact:.18},Shoot:{dur:.85,contact:.22},Tackle:{dur:1.3,contact:.3},Celebrate_KneeSlide:{dur:2,hold:1},Celebrate_Jump:{dur:1.1}},Bb={af:[90.6,58.4,42],ca:[223.7,168.5,136.8],as:[199.2,155.4,129.5]},Rb={plain:0,stripes:1,hoops:2,halves:3,sash:4,pinstripes:5,chevron:6,gradient:7,checker:8,centre:9},Mc=["as","ca","lean","stocky","f_nose_w","f_nose_l","f_nose_hump","f_chin","f_chin_w","f_jaw","f_cheek","f_lips","f_head_sq","f_head_ov","f_brow"],Db={shaved:["",0],buzz:["",.9],fade:["crop",1],crew:["crop",1],afro:["afro",1],top:["afro",1],twist:["afro",1],dread:["afro",1],locks:["afro",1],locksL:["afro",1],bleach:["afro",1],corn:["crop",1],hawk:["crop",1],under:["crop",1],curl:["afro",1]},Lb={shaved:["",0],buzz:["",.85],crew:["short",1],fade:["short",1],short:["short",1],part:["slick",1],quiff:["messy",1],slick:["slick",1],curl:["wavy",1],bun:["wavy",1],pony:["wavy",1],long:["wavy",1],hawk:["messy",1],under:["messy",1],bleach:["short",1]},Pb=`attribute float _part; attribute vec2 aPrint; attribute vec2 aPat; attribute vec4 aZone; attribute vec4 _cloth; attribute vec4 _skin2; attribute vec4 _w2;
uniform vec4 uClothF; varying float vPart; varying vec2 vPrint; varying vec2 vPat; varying vec4 vZone; varying vec2 vUvA;
`,Fb=`uniform vec3 uTint, uHairC, uIris, uP1, uP2, uTrim, uSlv, uSho, uSoc, uSocT, uBoot, uBoot2, uGlove; uniform float uPat, uPatW, uSlvOn, uScalp, uErase, uGK, uBeard;
uniform sampler2D uPrint, uData, uKnit; varying float vPart; varying vec2 vPrint; varying vec2 vPat; varying vec4 vZone; varying vec2 vUvA;
float mhBand(float t){ float aa = clamp(fwidth(t) * 1.5, 1e-4, 0.25); float d = abs(fract(t) - 0.5) * 2.0; return smoothstep(0.5 - aa, 0.5 + aa, d); }
float mhPattern(vec2 p){
  if (uPat < 0.5) return 0.0;
  if (uPat < 1.5) return mhBand(p.x / uPatW);
  if (uPat < 2.5) return mhBand((p.y - 1.0) / uPatW);
  if (uPat < 3.5) { float aa = fwidth(p.x) * 1.5; return smoothstep(-aa, aa, p.x); }
  if (uPat < 4.5) { float d = p.x * 0.9 + (p.y - 1.30); float aa = fwidth(d) * 1.5; return 1.0 - smoothstep(uPatW - aa, uPatW + aa, abs(d)); }
  if (uPat < 5.5) { float t = p.x / uPatW; float aa = clamp(fwidth(t), 1e-4, 0.25); float d = abs(fract(t) - 0.5); return 1.0 - smoothstep(0.035 - aa, 0.035 + aa, d); }
  if (uPat < 6.5) { float d = p.y - 1.36 + abs(p.x) * 0.55; float aa = fwidth(d) * 1.5; return 1.0 - smoothstep(0.045 - aa, 0.045 + aa, abs(d)); }
  if (uPat < 7.5) return smoothstep(1.5, 0.95, p.y);
  if (uPat < 8.5) { float w = uPatW * 1.4; return mod(floor(p.x / w) + floor(p.y / w), 2.0); }
  float aa = fwidth(p.x) * 1.5; return 1.0 - smoothstep(0.05 - aa, 0.05 + aa, abs(p.x));
}
`;function wd(s){let{scene:e,tier:t,ctx:n,F:i,url:r,used:a,SC:o,getR:c,cvs:l,blobTex:h,SKINS:u}=s,f={ok:!1,chars:[],byId:new Map,heroOk:!1},A=new ia;A.setMeshoptDecoder(Ec);let m=null,g=w=>!/^(mgr|off4|ref|fan)/.test(String(w));f.isPlayer=g;let p={bones:null,lod:{},cards:{},skins:{},clips:{},knit:null},d=w=>{let H=w.geometry;for(let[V,Q]of[["uv1","aPrint"],["uv2","aPat"],["color","aZone"]])H.attributes[V]&&(H.setAttribute(Q,H.attributes[V]),H.deleteAttribute(V));return H.boundingSphere=new bn(new os(0,0,0),4),{geo:H,inv:w.skeleton.boneInverses,bind:w.bindMatrix.clone(),names:w.skeleton.bones.map(V=>V.name),mat:w.material,dict:w.morphTargetDictionary}},x=w=>{let H=w.geometry,V=w.skeleton.bones.findIndex(Q=>Q.name==="Head");return H.boundingSphere=new bn(new os(0,0,0),4),{geo:H,m:new dt().multiplyMatrices(w.skeleton.boneInverses[V],w.bindMatrix),map:w.material.map}};function E(){if(p.knit)return p.knit;let w=128,H=new Float32Array(w*w),V=8,Q=w/V;for(let ae=0;ae<w;ae++)for(let be=0;be<w;be++){let W=Math.floor(ae/Q),yt=W%2*Q/2,Pe=(be+yt)%Q-Q/2,at=ae%Q-Q/2,He=Math.hypot(Pe*.9,at)/(Q*.5);H[ae*w+be]=-Math.exp(-Math.pow(He/.42,2))*.9+(.5+.5*Math.cos(be/w*V*4*Math.PI+ae/w*2*Math.PI*V))*.25}let _e=new Uint8Array(w*w*4);for(let ae=0;ae<w;ae++)for(let be=0;be<w;be++){let W=(vt,gt)=>H[(gt+w)%w*w+(vt+w)%w],yt=(W(be+1,ae)-W(be-1,ae))*1.1,Pe=(W(be,ae-1)-W(be,ae+1))*1.1,at=Math.hypot(yt,Pe,1),He=(ae*w+be)*4;_e[He]=(-yt/at*.5+.5)*255,_e[He+1]=(-Pe/at*.5+.5)*255,_e[He+2]=(1/at*.5+.5)*255,_e[He+3]=255}let Z=new js(_e,w,w,yn);return Z.wrapS=Z.wrapT=Bi,Z.generateMipmaps=!0,Z.minFilter=Ai,Z.magFilter=An,Z.needsUpdate=!0,p.knit=Z}f.ready=(async()=>{let w=c();if(!w)throw new Error("no renderer");m=new Ds().setTranscoderPath(n.base).detectSupport(w),A.setKTX2Loader(m);let[H,V]=await Promise.all([A.loadAsync(r("w3d-mh.glb")),A.loadAsync(r("w3d-mh-anims.glb"))]);H.scene.updateMatrixWorld(!0),H.scene.traverse(Q=>{Q.isSkinnedMesh&&/^P_/.test(Q.name)?p.lod[Q.name.slice(2)]=d(Q):Q.isSkinnedMesh&&/^C_/.test(Q.name)?p.cards[Q.name.slice(2)]=x(Q):Q.isMesh&&/^tex_/.test(Q.name)&&(p.skins[Q.name.slice(9)]=Q.material.map),Q.isBone&&Q.name==="root"&&!p.bones&&(p.bones=Q.parent&&!Q.parent.isBone?Q.parent:Q)}),p.skins.af=p.lod.match.mat.map,p.normal=p.lod.match.mat.normalMap,p.data=p.lod.match.mat.aoMap;for(let Q of V.animations)p.clips[Q.name]=Q;if(!p.lod.match||!p.lod.far||!p.clips.Idle_Loop)throw new Error("mh files incomplete");f.ok=!0;try{let Q=new pn(40,1,.1,100);Q.position.set(0,1,4),Q.lookAt(0,1,0);let _e=new si(8,8);w.setRenderTarget(_e),w.render(H.scene,Q),w.setRenderTarget(null),_e.dispose();let Z=F();for(let ae in Z.lod)Z.lod[ae].visible=!0;Z.hair.visible=!0,Z.root.visible=!0,w.compile(e,Q);for(let ae in Z.lod)Z.lod[ae].visible=!1;Z.hair.visible=!1}catch(Q){console.warn("3D mh warm",Q)}return t==="high"&&A.loadAsync(r("w3d-mh-hero.glb")).then(Q=>{Q.scene.updateMatrixWorld(!0);let _e={};Q.scene.traverse(Z=>{Z.isSkinnedMesh&&Z.name==="P_hero"?p.lod.hero=d(Z):Z.isSkinnedMesh&&/^H_/.test(Z.name)?_e[Z.name.slice(2)]=x(Z):Z.isMesh&&/^tex_/.test(Z.name)&&(p["h_"+Z.name.slice(9)]=Z.material.map)}),p.hcards=_e,p.hskins={af:p.lod.hero.mat.map,ca:p.h_ca,as:p.h_as},p.hnormal=p.lod.hero.mat.normalMap;try{let Z=new pn(40,1,.1,100);Z.position.set(0,1,4),Z.lookAt(0,1,0);let ae=new si(8,8);w.setRenderTarget(ae),w.render(Q.scene,Z),w.setRenderTarget(null),ae.dispose()}catch{}f.heroOk=!!p.lod.hero}).catch(Q=>console.warn("3D hero",Q)),f})();function T(w){let H=p.lod[w].mat,V=new Vt({map:H.map,normalMap:H.normalMap,normalScale:new Je(.6,.6),roughness:.6,metalness:0,envMapIntensity:.45}),Q=()=>({value:new Ge}),_e=V.userData.u={uTint:Q(),uHairC:Q(),uIris:Q(),uP1:Q(),uP2:Q(),uTrim:Q(),uSlv:Q(),uSho:Q(),uSoc:Q(),uSocT:Q(),uBoot:Q(),uBoot2:Q(),uGlove:Q(),uBeard:{value:0},uPat:{value:0},uPatW:{value:.07},uSlvOn:{value:0},uScalp:{value:0},uErase:{value:0},uGK:{value:0},uPrint:{value:null},uData:{value:H.aoMap},uKnit:{value:E()},uClothF:{value:new Mt}};return V.onBeforeCompile=Z=>{Object.assign(Z.uniforms,_e),Z.vertexShader=Pb+Z.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vPart = _part; vPrint = aPrint; vPat = aPat; vZone = aZone; vUvA = uv;`).replace("#include <skinning_vertex>",`vec3 mhPre = transformed;
#include <skinning_vertex>
#ifdef USE_SKINNING
{ float cf = _cloth.z > 0.5 ? (_cloth.x < 1.5 ? (_cloth.y > 0.0 ? uClothF.x : uClothF.y) : (_cloth.y > 0.0 ? uClothF.z : uClothF.w)) : 0.0;
  if (cf > 0.001) { vec4 sv = bindMatrix * vec4(mhPre, 1.0); vec4 s2 = getBoneMatrix(_skin2.x) * sv * _w2.x + getBoneMatrix(_skin2.y) * sv * _w2.y + getBoneMatrix(_skin2.z) * sv * _w2.z;
    transformed = mix(transformed, (bindMatrixInverse * s2).xyz, cf); } }
#endif`),Z.fragmentShader=Fb+Z.fragmentShader.replace("#include <map_fragment>",`float mhRough = 0.6;
{ vec3 col;
  if (vPart < 0.5) {
    vec4 tx = texture2D(map, vUvA); vec4 dd = texture2D(uData, vUvA); col = tx.rgb * uTint; mhRough = clamp(dd.r * 1.05, 0.38, 0.75);
    vec3 avg = uTint * vec3(0.32);
    col = mix(col, mix(col, avg * 0.9, 0.85), dd.g * uErase);
    col = mix(col, uHairC * (0.55 + 0.45 * tx.g / max(0.05, tx.r)), dd.g * uScalp);
    if (uBeard > 0.5) { float n = fract(sin(dot(floor(vUvA * 900.0), vec2(127.1, 311.7))) * 43758.5453);
      float bm = uBeard < 1.5 ? dd.b * 0.4 : uBeard < 2.5 || uBeard > 4.5 && uBeard < 5.5 ? dd.b * (uBeard > 4.5 ? 0.95 : 0.78) : uBeard < 3.5 || uBeard > 5.5 ? dd.a * 0.9 : dd.b * 0.7 * (1.0 - dd.a * 0.8);
      col = mix(col, uHairC * (0.55 + 0.6 * n), clamp(bm * (0.65 + 0.5 * n), 0.0, 1.0)); mhRough = mix(mhRough, 0.8, bm); }
    if (uGK > 0.5 && vUvA.y > 0.80 && vUvA.x < 0.70) { col = uGlove; mhRough = 0.7; }
  } else if (vPart < 1.5) {
    vec2 c1 = vec2(0.705, 0.296), c2 = vec2(0.290, 0.708); float r = min(distance(vUvA, c1), distance(vUvA, c2));
    float ir = 1.0 - smoothstep(0.098, 0.108, r), pu = 1.0 - smoothstep(0.034, 0.042, r);
    vec3 scl = mix(vec3(0.86, 0.84, 0.82), vec3(0.72, 0.6, 0.58), smoothstep(0.2, 0.32, r));
    vec3 irc = uIris * (0.65 + 0.6 * smoothstep(0.1, 0.05, r)) * (0.85 + 0.15 * sin(atan(vUvA.y - 0.5, vUvA.x - 0.5) * 40.0));
    col = mix(scl, irc, ir); col = mix(col, vec3(0.02), pu); col = mix(col, col * 0.55, smoothstep(0.09, 0.105, r) * ir); mhRough = 0.12;
  } else {
    float trim = smoothstep(0.5 - max(fwidth(vZone.r), 1e-3), 0.5 + max(fwidth(vZone.r), 1e-3), vZone.r), zb = smoothstep(0.45, 0.55, vZone.b);
    if (vPart < 2.5) { col = mix(uP1, uP2, mhPattern(vec2(vPat.x, 1.0 - vPat.y)) * (1.0 - zb * uSlvOn)); col = mix(col, uSlv, zb * uSlvOn); col = mix(col, uTrim, trim); mhRough = 0.8; }
    else if (vPart < 3.5) { col = mix(uSho, uTrim, trim); mhRough = 0.82; }
    else if (vPart < 4.5) { col = mix(uSoc, uSocT, trim); mhRough = 0.95; }
    else { col = mix(uBoot, uBoot2, max(trim, zb * 0.85)); mhRough = 0.4; }
    if (vPart < 3.5 && vPrint.x >= 0.0 && vPrint.x <= 1.0 && vPrint.y >= 0.0 && vPrint.y <= 1.0) { vec4 pr = texture2D(uPrint, vPrint); col = mix(col, pr.rgb / max(pr.a, 1e-3), pr.a); }
    col *= mix(1.0, vZone.g, 0.75);
  }
  diffuseColor.rgb = col; }`).replace("#include <roughnessmap_fragment>","float roughnessFactor = mhRough;").replace("#include <normal_fragment_maps>",`#ifdef USE_NORMALMAP_TANGENTSPACE
{ vec3 mapN = vec3(0.0, 0.0, 1.0);
  if (vPart < 0.5) { mapN = texture2D(normalMap, vNormalMapUv).xyz * 2.0 - 1.0; mapN.xy *= normalScale; }
  else if (vPart > 1.5 && vPart < 4.5) { mapN = texture2D(uKnit, vUvA * (vPart < 2.5 ? 90.0 : 70.0)).xyz * 2.0 - 1.0; mapN.xy *= 0.35; }
  normal = normalize(tbn * mapN); }
#endif`).replace("#include <aomap_fragment>","")},V.customProgramCacheKey=()=>"w3dmh2",V}function N(){let w=new Vt({color:1709072,roughness:.62,metalness:0,alphaTest:.3,side:Cn,envMapIntensity:.3});return t!=="low"&&(w.alphaToCoverage=!0),w}let L=30;function F(){let w=new Gn,H=p.bones.clone(!0);w.add(H);let V={};H.traverse(ae=>{ae.isBone&&(V[ae.name]=ae)});let Q={mh:!0,root:w,bones:V,mixer:new $r(w),act:{},w:{},id:null,lastN:-9,mod:new Map,ph:0,look:0,lookP:0,lean:0,lod:{},mats:{},FU:{uExpr:{value:new Mt}},pivots:[],ex:new Mt,cf:new Mt},_e=ae=>{let be=p.lod[ae],W=Q.mats[ae]=T(ae),yt=new Gi(be.geo,W);return yt.bind(new Zs(be.names.map(Pe=>V[Pe]),be.inv),be.bind),yt.castShadow=ae!=="far"&&t!=="low",yt.receiveShadow=!1,yt.visible=!1,yt.frustumCulled=!0,yt.morphTargetInfluences=new Array(Mc.length).fill(0),yt.morphTargetDictionary=be.dict,yt.boundingSphere=new bn(new os(0,.95,0),1.6),w.add(yt),Q.lod[ae]=yt,yt};_e("match"),_e("far"),Q.hair=new Ke(p.cards.none.geo,N()),Q.hair.matrixAutoUpdate=!1,Q.hair.morphTargetInfluences=new Array(Mc.length).fill(0),Q.hair.castShadow=t==="high",V.Head.add(Q.hair);let Z={idle:"Idle_Loop",walk:"Walk_Loop",jog:"Jog_Fwd_Loop",sprint:"Sprint_Loop",dance:"Dance_Loop",air:"Jump_Loop",crouch:"Crouch_Idle_Loop",talk:"Idle_Talking_Loop"};for(let ae in Z){let be=p.clips[Z[ae]];if(!be)continue;let W=Q.mixer.clipAction(be);W.play(),W.setEffectiveWeight(0),Q.act[ae]=W,Q.w[ae]=0}Q.one={};for(let ae of["Pass","Shoot","Tackle","Celebrate_KneeSlide","Celebrate_Jump"]){let be=p.clips[ae];if(!be)continue;let W=Q.mixer.clipAction(be);W.setLoop(Xl,1),W.clampWhenFinished=!0,W.play(),W.setEffectiveWeight(0),Q.one[ae]=W}Q.mixer.update(0);for(let ae of Object.values(Q.one))ae.stop();return Q.w.idle=1,Q.shot=null,Q.shotW=0,e.add(w),f.chars.push(Q),s.chars.push(Q),Q}function J(w){if(w.lod.hero||!f.heroOk)return w.lod.hero;let H=p.lod.hero,V=w.mats.hero=T("hero"),Q=new Gi(H.geo,V);return V.map=w.mats.match.map===p.skins.af?p.hskins.af:w.mats.match.map===p.skins.ca?p.hskins.ca:p.hskins.as,V.normalMap=p.hnormal,Q.bind(new Zs(H.names.map(_e=>w.bones[_e]),H.inv),H.bind),Q.castShadow=!0,Q.visible=!1,Q.morphTargetInfluences=w.lod.match.morphTargetInfluences.slice(),Q.morphTargetDictionary=H.dict,Q.boundingSphere=new bn(new os(0,.95,0),1.6),w.root.add(Q),w.lod.hero=Q,w.hairH=new Ke(p.hcards.none.geo,N()),w.hairH.matrixAutoUpdate=!1,w.hairH.morphTargetInfluences=w.hair.morphTargetInfluences,w.hairH.visible=!1,w.bones.Head.add(w.hairH),w.dk=null,Q}f.getChar=function(w){let H=f.byId.get(w);if(H)return H;H=f.chars.filter(V=>V.lastN<i.n-1&&!V.port).sort((V,Q)=>V.lastN-Q.lastN)[0],!H&&f.chars.length<L&&(H=F()),H||(H=f.chars.filter(V=>!V.port).sort((V,Q)=>V.lastN-Q.lastN)[0]),H.id!=null&&f.byId.delete(H.id),H.id=w,f.byId.set(w,H),H.dk=null,H.lastN=-9,H.shot=null,H.shotW=0;for(let V of Object.values(H.one))V.stop();return H};function S(w){let H=w>>>0||1;return()=>(H^=H<<13,H>>>=0,H^=H>>>17,H^=H<<5,H>>>=0,H/4294967296)}function P(w,H){let V=S(n.hash("mh4:"+w)),Q=()=>V()*2-1,_e=H.grp,Z=0,ae=0,be="ca";_e==="af"||_e==="af2"?(be="af",Z=V()*.15,ae=_e==="af2"?V()*.35:V()*.15):_e==="ea"?(be="as",Z=.75+V()*.25,ae=V()*.15):_e==="eu"?(be="ca",ae=.8+V()*.2,Z=V()*.08):_e==="mix"?(be=H.si<6?"af":"ca",ae=.3+V()*.5,Z=V()*.2):(be=H.si<6?"af":"ca",ae=.55+V()*.35,Z=V()*.25);let W={as:Z,ca:ae,lean:H.arch==="lean"?.6+V()*.4:0,stocky:H.arch==="stocky"?.4+V()*.6:0};for(let Pe of Mc.slice(4))W[Pe]=Q()*(Pe==="f_brow"?.25:.7);let yt=(be==="af"?Db:Lb)[H.st]||(be==="af"?["crop",1]:["short",1]);return{w:W,base:be,hair:yt[0],scalp:yt[1]}}f.lookOf=(w,H)=>P(String(w),H);let X=t==="high"?512:t==="mid"?384:256,re={back:{s0:-.2,s1:.2,z0:1.08,z1:1.62,u0:0,u1:1,v0:.4,v1:1},front:{s0:-.2,s1:.2,z0:1.15,z1:1.55,u0:0,u1:.5,v0:0,v1:.4},shorts:{s0:.03,s1:.23,z0:.74,z1:.94,u0:.5,u1:1,v0:0,v1:.4}},xe=(w,H,V,Q)=>{let _e=(H.u1-H.u0)/(H.s1-H.s0)/1e3*V,Z=(H.u0-H.s0/(H.s1-H.s0)*(H.u1-H.u0))*V,ae=(H.v1-H.v0)/(H.z1-H.z0);w.setTransform(_e,0,0,ae/1e3*Q,Z,(1-H.v0+H.z0*ae)*Q)},G=(w,H,V,Q,_e,Z)=>{w.font=`800 ${_e*1.25}px "Arial Narrow", Arial, Helvetica, sans-serif`,w.textAlign="center",w.textBaseline="middle",w.lineJoin="round",w.lineWidth=Math.max(5,_e*(_e<100?.16:.08)),w.strokeStyle="#0b0f24",w.strokeText(H,V,-Q),w.fillStyle="#ffffff",w.fillText(H,V,-Q)};function Y(w,H,V,Q){let _e=w.width,Z=w.height,ae=w.getContext("2d");if(ae.setTransform(1,0,0,1,0,0),ae.clearRect(0,0,_e,Z),xe(ae,re.back,_e,Z),H){ae.font='800 78px "Arial Narrow", Arial, sans-serif';let be=ae.measureText(H).width;ae.save(),ae.scale(Math.min(1,330/Math.max(1,be))*(be<200?1.1:1),1),G(ae,H,0,1530,62),ae.restore()}if(V!==""&&(ae.save(),ae.scale(.82,1),G(ae,V,0,1300,250),ae.restore()),xe(ae,re.front,_e,Z),Q)try{ae.save(),ae.scale(1,-1),ae.drawImage(Q,49,1380,72,80),ae.restore()}catch{}xe(ae,re.shorts,_e,Z),V!==""&&G(ae,V,125,815,70),ae.setTransform(1,0,0,1,0,0)}let ce=3;f.frameStart=()=>{ce=3},f.dress=function(w,H,V,Q,_e,Z,ae){let be=H.K,W=H.key+(V?"g":"o")+Q+":"+_e+":"+ae+":"+(H.crestImg?1:0)+":"+(w.lod.hero?1:0);if(w.dk===W&&!w.printWait)return;let yt=w.dk!==W;if(w.dk=W,yt){let Pe=w.mh4&&w.mhId===Q?w.mh4:(w.mhId=Q,w.mh4=P(Q,Z)),at=fe=>new Ge(fe),He=new Ge(u[Math.min(u.length-1,Z.si)]),vt=Bb[Pe.base],gt=new Ge().setRGB(cs(He.r*255/vt[0]*1.05,.4,2.2),cs(He.g*255/vt[1]*1.05,.4,2.2),cs(He.b*255/vt[2]*1.05,.4,2.2)),D=fe=>Math.pow(fe,2.2),C=u[Math.min(u.length-1,Z.si)],ee=[1,3,5].map(fe=>parseInt(C.slice(fe,fe+2),16)/255),Me=[0,1,2].map(fe=>.45*vt[fe]/255+.55*ee[fe]),Ee=Pe.base==="af"?1.12:1;gt.setRGB(cs(D(Me[0])/D(vt[0]/255)*Ee,.45,1.8),cs(D(Me[1])/D(vt[1]/255)*Ee,.45,1.8),cs(D(Me[2])/D(vt[2]/255)*Ee,.45,1.8));let Se=.07,qe=2*Math.PI*.16,De=be.pat==="stripes"||be.pat==="pinstripes";for(let fe of Object.keys(w.mats)){let wt=w.mats[fe],le=wt.userData.u;wt.map=fe==="hero"?p.hskins[Pe.base]:p.skins[Pe.base],le.uTint.value.copy(gt),le.uHairC.value.set(Z.st==="bleach"?Z.tip:Z.hair),le.uBeard.value=Z.beard||0,le.uIris.value.set(Z.iris),le.uScalp.value=Pe.scalp,le.uErase.value=Pe.base==="af"&&!Pe.hair?1:0,le.uGK.value=V?1:0,le.uGlove.value.set("#f1f5f9"),V?(le.uP1.value.set(H.g),le.uP2.value.set(H.g),le.uTrim.value.set("#111827"),le.uSlv.value.set(H.g),le.uSlvOn.value=0,le.uPat.value=0,le.uSho.value.set("#111827"),le.uSoc.value.set(H.g),le.uSocT.value.set("#111827")):(le.uP1.value.set(be.c1),le.uP2.value.set(be.c2),le.uTrim.value.set(be.col),le.uSlv.value.set(be.slv),le.uSlvOn.value=be.slv&&be.slv.toLowerCase()!==String(be.c1).toLowerCase()?1:0,le.uPat.value=Rb[be.pat]||0,le.uPatW.value=De?qe/Math.max(2,Math.round(qe/Se)):Se,le.uSho.value.set(be.sho),le.uSoc.value.set(be.soc),le.uSocT.value.set(be.c2===be.soc?be.c1:be.c2)),le.uBoot.value.set(Z.boot),le.uBoot2.value.set(Z.boot2===Z.boot?"#f8fafc":Z.boot2)}let Oe=w.lod.match.morphTargetInfluences;Mc.forEach((fe,wt)=>{Oe[wt]=Pe.w[fe]||0});for(let fe of["far","hero"])if(w.lod[fe]){let wt=w.lod[fe].morphTargetInfluences;for(let le=0;le<wt.length;le++)wt[le]=fe==="far"&&le>=4?0:Oe[le]}let et=w.hair.morphTargetInfluences;for(let fe=0;fe<et.length;fe++)et[fe]=Oe[fe];let ot=p.cards[Pe.hair||"none"]||p.cards.none;if(w.hair.geometry=ot.geo,w.hair.matrix.copy(ot.m),w.hair.material.map=ot.map,w.hair.material.color.set(Z.st==="bleach"?Z.tip:Z.hair),w.hair.material.needsUpdate=!0,w.hairH){let fe=p.hcards[Pe.hair||"none"]||p.hcards.none;w.hairH.geometry=fe.geo,w.hairH.matrix.copy(fe.m),w.hairH.material.map=fe.map,w.hairH.material.color.set(Z.st==="bleach"?Z.tip:Z.hair),w.hairH.material.needsUpdate=!0}w.hgt=Math.min(1.92,Z.h+(V?.04:0))/Tb,w.style=Z,w.hstyle=Pe.hair||Z.st,w.printWait=!0}if(w.printWait&&ce>0){ce--,w.printWait=!1,w.pcv||(w.pcv=l(X,X,()=>{}),w.ptex=new Jr(w.pcv),w.ptex.colorSpace=kt,w.ptex.flipY=!1,w.ptex.premultiplyAlpha=!0,w.ptex.anisotropy=t==="low"?1:4),Y(w.pcv,ae,_e==null||_e===""?"":String(Math.max(0,Math.min(99,Math.floor(+_e)||0))),V?null:H.crestImg),w.ptex.needsUpdate=!0;for(let Pe of Object.values(w.mats))Pe.userData.u.uPrint.value=w.ptex}},f.pre=function(w,H,V,Q,_e){if(w.noCloth=!!H.noCloth,H.mhClip){(!w.shot||w.shotName!==H.mhClip.name)&&f.play(w,H.mhClip.name),w.shot.timeScale=0,w.shot.time=H.mhClip.t,w.shotAge=1,w.shot.setEffectiveWeight(1),w.shotW=1;for(let be in w.act)w.act[be].setEffectiveWeight(0);return}Q&&f.play(w,(H.kick||0)>.8?"Shoot":"Pass"),_e&&f.play(w,"Tackle");let Z=0,ae=w.shot;if(ae){let be=Cd[w.shotName]||{},W=be.dur||ae.getClip().duration;w.shotT=ae.time;let yt=Math.min(1,(w.shotAge+=V)/.06+.35),Pe=cs((W-ae.time)/.16,0,1);Z=Math.min(yt,Pe),ae.time>=W-.001||Z<=.001?(ae.stop(),w.shot=null,Z=0):ae.setEffectiveWeight(Z)}if(w.shotW=Z,Z>0)for(let be in w.act)w.act[be].setEffectiveWeight(w.act[be].getEffectiveWeight()*(1-Z))},f.play=function(w,H){let V=w.one[H];if(!V)return;w.shot&&w.shot!==V&&w.shot.stop();let Q=Cd[H]||{};V.reset(),V.time=Q.contact!=null?Math.max(0,Q.contact-.02):0,V.setEffectiveWeight(1),V.play(),w.shot=V,w.shotName=H,w.shotAge=0};let pe=new os,ue=new os,Ae=new os,me=new Sd;f.post=function(w){if(w.cur==="far"||(w.dist||0)>26){if(w.cf.lengthSq()){w.cf.set(0,0,0,0);for(let Q of Object.values(w.mats))Q.userData.u.uClothF.value.set(0,0,0,0)}return}me.copy(w.root.quaternion);let H=Ae.set(0,-1,0).applyQuaternion(me),V=(Q,_e)=>(w.bones[_e].updateWorldMatrix(!0,!1),ue.setFromMatrixPosition(w.bones[_e].matrixWorld),pe.setFromMatrixPosition(w.bones[Q].matrixWorld),Math.acos(cs(ue.sub(pe).normalize().dot(H),-1,1)));w.cf.set(vc(1.4,2.3,V("upperarm_l","lowerarm_l")),vc(1.4,2.3,V("upperarm_r","lowerarm_r")),vc(.45,1,V("thigh_l","calf_l")),vc(.45,1,V("thigh_r","calf_r"))),w.noCloth&&w.cf.set(0,0,0,0);for(let Q of Object.values(w.mats))Q.userData.u.uClothF.value.copy(w.cf)};let ye=-1,Ue=new Set;f.lod=function(w,H){ye!==i.n&&(ye=i.n,Ue.clear(),f.chars.filter(Z=>a.has(Z.root)&&(Z.dist||0)<6.5).sort((Z,ae)=>Z.dist-ae.dist).slice(0,2).forEach(Z=>Ue.add(Z)));let V=w.dist||0,Q=H>=2,_e=t==="low"||V>(Q?16:t==="high"?40:24)?"far":"match";t==="high"&&!Q&&V<6.5&&f.heroOk&&(Ue.has(w)||w.port)&&(J(w),w.lod.hero&&(_e="hero"));for(let Z in w.lod)w.lod[Z].visible=Z===_e;w.hair.visible=_e==="match"||_e==="far"&&V<9,w.hairH&&(w.hairH.visible=_e==="hero"),_e==="hero"&&(w.hair.visible=!1),w.cur=_e};let oe=null;return f.blobs=function(){if(t!=="low")return;oe||(oe=new _i(new mi(1,1).rotateX(-Math.PI/2),new un({map:h(),transparent:!0,depthWrite:!1,opacity:.5,polygonOffset:!0,polygonOffsetFactor:-3}),L),oe.frustumCulled=!1,e.add(oe));let w=new dt,H=new Sd,V=new os,Q=new os,_e=0;for(let Z of f.chars){if(!a.has(Z.root)||_e>=L)continue;let ae=.75*(Z.root.scale.x/o),be=Z.root.position.y;w.compose(Q.set(Z.root.position.x,.015,Z.root.position.z),H,V.set(ae*(1+be*.3),1,ae*(1+be*.3))),oe.setMatrixAt(_e++,w)}oe.count=_e,oe.instanceMatrix.needsUpdate=!0,_e&&a.add(oe)},f.stats=()=>{let w=0,H=0;for(let V of f.chars)if(a.has(V.root)){for(let Q in V.lod)V.lod[Q].visible&&(w++,H+=V.lod[Q].geometry.index.count/3);for(let Q of[V.hair,V.hairH])Q&&Q.visible&&(w++,H+=Q.geometry.index.count/3)}return{players:f.chars.filter(V=>a.has(V.root)).length,draws:w,tris:H,tier:t,hero:f.heroOk,lods:f.chars.filter(V=>a.has(V.root)).map(V=>V.cur)}},f}var nt=k,ls=Fn,En=(s,e,t)=>s<e?e:s>t?t:s,ut=(s,e,t)=>{let n=En((t-s)/(e-s),0,1);return n*n*(3-2*n)};var Sc=1.1,kh=.15,Id={idle:"Idle_Loop",walk:"Walk_Loop",jog:"Jog_Fwd_Loop",sprint:"Sprint_Loop",dance:"Dance_Loop",air:"Jump_Loop",crouch:"Crouch_Idle_Loop",talk:"Idle_Talking_Loop"},Va=["#2f1b11","#3f2618","#4d2e1d","#5c3822","#70442a","#83512f","#966039","#a8724a","#b9835a","#c4916a","#cf9f7a","#d9ab86","#e0b590"],Ub={dark:"#2a1a10",brown:"#5a3518",hazel:"#7a5a2a",green:"#4e7a45",blue:"#4f7fb3",grey:"#7d8b96"},Nb=["#0a0a0c","#0a0a0c","#121010","#17110d","#24170f","#3a2414","#5a3a20","#7a5230","#a07a44","#c9a55a","#6b2f1a"];function Ob(s){let e=s.tier||(s.weak?"low":"mid"),t=e==="low",n={high:{pr:1.75,sh:2048,crowd:5e3,near:36},mid:{pr:1.5,sh:1024,crowd:3e3,near:26},low:{pr:1,sh:512,crowd:1400,near:16}}[e]||{pr:1.5,sh:1024,crowd:3e3,near:26},i={},r=s.G3,a=null,o=null,c,l,h,u,f=null,A=!1,m=0,g=0,p=0,d={n:1,dt:.016,now:0},x=new Set,E=new ia;E.setMeshoptDecoder(Ec);let T=y=>s.base+y+"?v="+s.v;function N(){if(a)return!A;o=document.createElement("canvas"),o.style.cssText="display:block;width:100%;height:100%;border-radius:0;box-shadow:none";try{a=new Kr({canvas:o,antialias:!t,alpha:!0,powerPreference:"high-performance"})}catch{return a=null,!1}a.outputColorSpace=kt,a.toneMapping=dc,a.toneMappingExposure=1.08,a.shadowMap.enabled=!0,a.shadowMap.type=fc,c=new Ms,c.fog=new $o(724260,.0026),l=new pn(40,1,.1,1e3);try{let M=new Ys(a);c.environment=M.fromScene(new za,.04).texture,M.dispose()}catch{}h=new Oa(13097215,2112034,.7),c.add(h),u=new Li(16774114,2.6),u.castShadow=!0;let y=n.sh;u.shadow.mapSize.set(y,y),e==="low"&&(u.castShadow=!1),u.shadow.bias=-5e-4,u.shadow.normalBias=.03,u.shadow.camera.near=1,u.shadow.camera.far=220,c.add(u),c.add(u.target);let v=new Li(10467327,.6);return v.position.set(-40,30,-30),c.add(v),o.addEventListener("webglcontextlost",M=>{M.preventDefault(),A=!0}),o.addEventListener("webglcontextrestored",()=>{A=!1}),!0}i.ok=()=>!!(L&&a&&!A&&m<3);let L=null,F={},J=null,S=null;i.mh=()=>S&&S.ok?S:null;let P=Promise.all([E.loadAsync(T("w3d-player.glb")),E.loadAsync(T("w3d-anims.glb"))]).then(async([y,v])=>{for(let _ of v.animations)F[_.name]=_;J=y.scene,J.updateMatrixWorld(!0),J.traverse(_=>{if(!_.isSkinnedMesh)return;let I=_.geometry,B=I.attributes.position,U=I.attributes.normal,b=B.count,q=new Float32Array(b*3),z=new Float32Array(b*3),ie=new nt,ve=new nt;for(let j=0;j<b;j++)ie.fromBufferAttribute(B,j),ve.fromBufferAttribute(U,j).multiplyScalar(.01).add(ie),_.applyBoneTransform(j,ie),_.applyBoneTransform(j,ve),ve.sub(ie).normalize(),q[j*3]=ie.x,q[j*3+1]=ie.y,q[j*3+2]=ie.z,z[j*3]=ve.x,z[j*3+1]=ve.y,z[j*3+2]=ve.z;{let j=I.attributes._shift;if(j)for(let se=0;se<b;se++)q[se*3]-=j.getX(se),q[se*3+1]-=j.getY(se),q[se*3+2]-=j.getZ(se)}I.setAttribute("aB",new Dt(q,3)),I.setAttribute("aBN",new Dt(z,3));{let j=new nt().fromBufferAttribute(B,0),se=new nt().fromBufferAttribute(B,b-1);I.userData.k=j.distanceTo(se)/Math.max(1e-6,Math.hypot(q[0]-q[b*3-3],q[1]-q[b*3-2],q[2]-q[b*3-1]))}I.boundingSphere=new bn(new nt(0,.9,0),1.6),_.frustumCulled=!0});let M=null;if(J.traverse(_=>{_.isSkinnedMesh&&_.name!=="Body_LO"&&/Superhero/i.test(_.material.name||"")&&(M=_)}),M){let _=M.geometry,I=_.attributes.position,B=_.attributes.normal,U=_.attributes.aB,b=_.attributes.aBN,q=_.index,z=new nt().fromBufferAttribute(I,0),ie=new nt().fromBufferAttribute(I,1),ve=new nt().fromBufferAttribute(U,0),j=new nt().fromBufferAttribute(U,1),se=z.distanceTo(ie)/Math.max(1e-6,ve.distanceTo(j)),de=ge=>{let Ie=U.getY(ge),pt=b.getZ(ge),Rt=Math.abs(U.getX(ge));if(Ie<1.585)return!1;let Xt=1.745+(1.6-1.745)*ut(.25,-.6,pt);return Rt>.07&&pt>-.2&&(Xt=Math.max(Xt,1.735-(Rt-.07)*.6)),Ie>Xt-.004},Re=ge=>{let Ie=U.getY(ge),pt=U.getZ(ge),Rt=Math.abs(U.getX(ge));return Ie<1.555||Ie>1.668||pt<-.035||Rt>.088||Rt<.031&&Math.abs(Ie-1.637)<.0095&&pt>.07?!1:Ie>1.648&&Rt<.045&&pt>.09?Ie<1.656&&Rt<.03:b.getY(ge)>-.92||Ie>1.575},it=ge=>{let Ie=U.getY(ge);return Ie>1.728&&Ie<1.758&&b.getY(ge)<.75},Xe=ge=>{let Ie=[];for(let pt=0;pt<q.count;pt+=3){let Rt=q.getX(pt),Xt=q.getX(pt+1),he=q.getX(pt+2);ge(Rt)&&ge(Xt)&&ge(he)&&Ie.push(Rt,Xt,he)}return Ie},$e={hair:Xe(de),beard:Xe(ge=>Re(ge)&&b.getY(ge)>-.5),band:Xe(it)},Ye=(ge,Ie,pt,Rt)=>{let Xt=$e[Rt||"hair"],he=new Map,Qe=[],rt=[],Ut=[],Wt=[],Kt=[],Tt=[],kn=[],hi=new nt,Hn=new nt,Ps=pt?Xt.filter((en,Yt)=>{let gn=Yt-Yt%3;return[0,1,2].every(_t=>pt(U.getX(Xt[gn+_t]),U.getY(Xt[gn+_t]),U.getZ(Xt[gn+_t])))}):Xt;for(let en of Ps){if(!he.has(en)){he.set(en,he.size),hi.fromBufferAttribute(I,en),Hn.fromBufferAttribute(B,en).normalize();let Yt=Ie(U.getX(en),U.getY(en),U.getZ(en),b.getZ(en)),gn=Yt*se;Qe.push(hi.x+Hn.x*gn,hi.y+Hn.y*gn,hi.z+Hn.z*gn),rt.push(Hn.x,Hn.y,Hn.z),kn.push(Yt),Tt.push(U.getX(en)+b.getX(en)*Yt,U.getY(en)+b.getY(en)*Yt,U.getZ(en)+b.getZ(en)*Yt);for(let _t=0;_t<4;_t++)Ut.push(_.attributes.skinIndex.getComponent(en,_t)),Wt.push(_.attributes.skinWeight.getComponent(en,_t))}Kt.push(he.get(en))}let zn=new sn;zn.setAttribute("position",new Lt(Qe,3)),zn.setAttribute("normal",new Lt(rt,3)),zn.setAttribute("skinIndex",new Vr(Ut,4)),zn.setAttribute("skinWeight",new Lt(Wt,4)),zn.setAttribute("aB",new Lt(Tt,3));{let en=kn.slice().sort((gn,_t)=>gn-_t),Yt=Math.max(1e-5,en[Math.floor(en.length*.7)]||1e-5);zn.setAttribute("aE",new Lt(kn.map(gn=>Math.min(1,gn/Yt)),1))}zn.setIndex(Kt),zn.boundingSphere=new bn(new nt(0,.9,0),1.6),zn.userData.k=se;let ui=new Gi(zn,new Vt({color:1118481,roughness:.95}));ui.name=ge,ui.castShadow=!0,ui.visible=!1,M.parent.add(ui),ui.bind(M.skeleton,M.bindMatrix)},Ot=(ge,Ie)=>{let pt=Math.abs(ge),Rt=1.745+(1.6-1.745)*ut(.25,-.6,Ie);return pt>.07&&Ie>-.2&&(Rt=Math.max(Rt,1.735-(pt-.07)*.6)),Rt},$t=(ge,Ie)=>(pt,Rt,Xt,he)=>ge(pt,Rt,Xt,he)*(.35+.65*ut(0,Ie||.03,Rt-Ot(pt,he)));Ye("h_crew",()=>.007),Ye("h_short",$t(()=>.011,.02)),Ye("h_afro",$t((ge,Ie,pt)=>.03+.03*ut(1.62,1.75,Ie),.05)),Ye("h_top",(ge,Ie,pt)=>.006+.034*ut(1.73,1.8,Ie)*(1-ut(.06,.1,Math.abs(ge)))),Ye("h_corn",()=>.0055),Ye("h_hawk",(ge,Ie)=>.004+.045*(1-ut(.008,.026,Math.abs(ge)))*ut(1.69,1.76,Ie),ge=>Math.abs(ge)<.032),Ye("h_under",(ge,Ie)=>.006+.014*ut(1.71,1.78,Ie)*(1-ut(.03,.055,Math.abs(ge))),(ge,Ie)=>Math.abs(ge)<.062||Ie>1.79),Ye("h_curl",$t((ge,Ie)=>.016+.012*ut(1.7,1.79,Ie))),Ye("h_quiff",$t((ge,Ie,pt)=>.012+.032*ut(0,.07,pt)*ut(1.735,1.78,Ie),.02)),Ye("h_part",$t((ge,Ie)=>.014+.006*ut(1.75,1.8,Ie),.02)),Ye("h_slick",(ge,Ie,pt)=>.009+.006*ut(.04,-.05,pt)),Ye("h_twist",$t((ge,Ie)=>.024+.012*ut(1.72,1.79,Ie),.04)),Ye("h_dread",$t((ge,Ie)=>.026+.01*ut(1.72,1.79,Ie),.04));let cn=(ge,Ie)=>ut(1.566,1.595,Ie)*(1-ut(.072,.088,Math.abs(ge)))*(1-ut(1.648,1.665,Ie)*ut(.04,.06,Math.abs(ge)));Ye("b_full",(ge,Ie,pt)=>(.004+.008*ut(1.63,1.59,Ie)*(1-.6*ut(.04,.08,Math.abs(ge))))*cn(ge,Ie),null,"beard"),Ye("b_short",(ge,Ie)=>(.003+.003*ut(1.62,1.585,Ie))*cn(ge,Ie),null,"beard"),Ye("b_goat",(ge,Ie,pt)=>(.004+.009*ut(1.625,1.59,Ie))*ut(1.562,1.58,Ie)*(1-ut(.022,.032,Math.abs(ge))),(ge,Ie,pt)=>Math.abs(ge)<.034&&(Ie<1.63||Ie>1.64),"beard"),Ye("g_band0",()=>.004,null,"band"),Ye("g_band",()=>.017,null,"band"),Ye("g_bandX",()=>.064,null,"band");let ln=(ge,Ie,pt)=>{let Rt=Xe(Ie),Xt=new Map,he=[];for(let _t of Rt)Xt.has(_t)||(Xt.set(_t,he.length),he.push(_t));let Qe=he.length,rt=new Float32Array(Qe*3),Ut=Array.from({length:Qe},()=>new Set),Wt=new Map;for(let _t=0;_t<Rt.length;_t+=3){let mt=Xt.get(Rt[_t]),ht=Xt.get(Rt[_t+1]),_n=Xt.get(Rt[_t+2]);Ut[mt].add(ht).add(_n),Ut[ht].add(mt).add(_n),Ut[_n].add(mt).add(ht);for(let[ri,Mn]of[[mt,ht],[ht,_n],[_n,mt]]){let ai=ri<Mn?ri+":"+Mn:Mn+":"+ri;Wt.set(ai,(Wt.get(ai)||0)+1)}}let Kt=new Uint8Array(Qe);for(let[_t,mt]of Wt)if(mt===1){let[ht,_n]=_t.split(":").map(Number);Kt[ht]=Kt[_n]=1}he.forEach((_t,mt)=>{let ht=U.getX(_t),_n=U.getY(_t),ri=U.getZ(_t),Mn=pt(ht,_n,ri);rt[mt*3]=ht+b.getX(_t)*Mn,rt[mt*3+1]=_n+b.getY(_t)*Mn,rt[mt*3+2]=ri+b.getZ(_t)*Mn});let Tt=new Float32Array(Qe*3);for(let _t=0;_t<(ge==="k_shirt"?24:12);_t++){for(let mt=0;mt<Qe;mt++){let ht=0,_n=0,ri=0,Mn=0;for(let Mi of Ut[mt])ht+=rt[Mi*3],_n+=rt[Mi*3+1],ri+=rt[Mi*3+2],Mn++;let ai=Kt[mt]?0:.55;Tt[mt*3]=rt[mt*3]+(Mn?(ht/Mn-rt[mt*3])*ai:0),Tt[mt*3+1]=rt[mt*3+1]+(Mn?(_n/Mn-rt[mt*3+1])*ai*.6:0),Tt[mt*3+2]=rt[mt*3+2]+(Mn?(ri/Mn-rt[mt*3+2])*ai:0)}for(let mt=0;mt<Qe;mt++){let ht=he[mt],_n=Tt[mt*3]-U.getX(ht),ri=Tt[mt*3+1]-U.getY(ht),Mn=Tt[mt*3+2]-U.getZ(ht),ai=_n*b.getX(ht)+ri*b.getY(ht)+Mn*b.getZ(ht),Mi=pt(U.getX(ht),U.getY(ht),U.getZ(ht))*.55;ai<Mi&&(Tt[mt*3]+=b.getX(ht)*(Mi-ai),Tt[mt*3+1]+=b.getY(ht)*(Mi-ai),Tt[mt*3+2]+=b.getZ(ht)*(Mi-ai))}rt.set(Tt)}let kn=new Float32Array(Qe*3),hi=new Float32Array(Qe*3),Hn=new Float32Array(Qe*3),Ps=new Float32Array(Qe*3),zn=new Uint16Array(Qe*4),ui=new Float32Array(Qe*4),en=new nt;he.forEach((_t,mt)=>{en.fromBufferAttribute(I,_t);for(let ht=0;ht<3;ht++){let _n=rt[mt*3+ht]-U.getComponent(_t,ht);hi[mt*3+ht]=_n*se,kn[mt*3+ht]=en.getComponent(ht)+_n*se,Hn[mt*3+ht]=U.getComponent(_t,ht),Ps[mt*3+ht]=b.getComponent(_t,ht)}for(let ht=0;ht<4;ht++)zn[mt*4+ht]=_.attributes.skinIndex.getComponent(_t,ht),ui[mt*4+ht]=_.attributes.skinWeight.getComponent(_t,ht)});let Yt=new sn;Yt.setAttribute("position",new Dt(kn,3)),Yt.setAttribute("aOff",new Dt(hi,3)),Yt.setAttribute("aB",new Dt(Hn,3)),Yt.setAttribute("aBN",new Dt(Ps,3)),Yt.setAttribute("skinIndex",new Dt(zn,4)),Yt.setAttribute("skinWeight",new Dt(ui,4)),Yt.setIndex(Rt.map(_t=>Xt.get(_t))),Yt.computeVertexNormals(),Yt.boundingSphere=new bn(new nt(0,.9,0),1.6),Yt.userData.k=se;let gn=new Gi(Yt,M.material);gn.name=ge,gn.castShadow=!0,gn.receiveShadow=!1,M.parent.add(gn),gn.bind(M.skeleton,M.bindMatrix)},li=ge=>Math.abs(U.getX(ge))>.232&&U.getY(ge)>1.2,fs=ge=>1.5+ut(.075,.16,ge)*.1;ln("k_shirt",ge=>{let Ie=U.getY(ge),pt=Math.abs(U.getX(ge));return li(ge)?pt<.405:Ie>.79&&Ie<fs(pt)-.004&&!(pt>.2&&Ie<1.2&&b.getY(ge)<-.6)},(ge,Ie,pt)=>{let Rt=Math.abs(ge);return Rt>.232&&Ie>1.2?.008+.015*ut(.27,.4,Rt):(.012+.013*ut(1,.82,Ie)+.002*ut(1.2,1.4,Ie)*ut(0,.08,pt))*(1-.82*ut(1.4,1.5,Ie)*(1-ut(.16,.22,Rt)))}),ln("k_shorts",ge=>{let Ie=U.getY(ge);return!li(ge)&&Ie>.6&&Ie<.9},(ge,Ie)=>.016+.022*ut(.74,.62,Ie)+.004*ut(.8,.88,Ie)),ln("k_trou",ge=>{let Ie=U.getY(ge);return!li(ge)&&Ie>.1&&Ie<.95},(ge,Ie)=>.013+.01*ut(.45,.15,Ie)+.013*ut(.8,.92,Ie))}{let _=J.getObjectByName("Head"),I=new nn;_.add(I),_.matrixWorld.clone().invert().decompose(I.position,I.quaternion,I.scale);let B=()=>new Vt({color:1118481,roughness:.9}),U=(z,ie,ve)=>{if(ie.name=z,ie.castShadow=!0,ie.visible=!1,ve){let j=new nn;j.name=z+"_pv",j.position.set(0,ve,-.06),ie.position.y-=ve,ie.position.z+=.06,j.add(ie),I.add(j)}else I.add(ie);return ie},b=U("h_bun",new Ke(new ns(.036,14,10),B()));b.position.set(0,1.79,-.085),b.scale.set(1,.9,1);{let z=new Gn,ie=B(),ve=new Ke(new ns(.03,12,8),ie);ve.position.set(0,1.735,-.112),z.add(ve);let j=new Ke(new Ri(.022,.008,.16,8),ie);j.position.set(0,1.655,-.13),j.rotation.x=-.25,z.add(j),U("h_pony",z,1.74)}let q=z=>{let ie=[];for(let ve=0;ve<17;ve++){let j=-2.25+ve*4.5/16,se=.092,de=new Ri(.011,.008,z*(.85+.3*(ve*7%5)/4),6);de.translate(0,-z/2,0),de.rotateX(.18+.08*Math.cos(j)),de.rotateY(j),de.translate(Math.sin(j)*-se*1,1.745,Math.cos(j)*-se-.005),ie.push(de)}return _c(ie)};U("h_locksS",new Ke(q(.11),B()),1.74),U("h_locksL",new Ke(q(.21),B()),1.74);{let z=new Ri(.1,.118,.2,20,1,!0,Math.PI*.62,Math.PI*.76);z.translate(0,1.66,-.012);let ie=new Ke(z,B());ie.material.side=Cn,U("h_long",ie,1.76)}}{let _=new ls,I=new ls,B=new nt(0,0,1);for(let U of["l","r"])for(let b of["index","middle","ring","pinky","thumb"])for(let q=1;q<=3;q++){let z=J.getObjectByName(b+"_0"+q+"_"+U);if(!z)continue;let ie=(b==="thumb"?[.15,.25,.2]:[.45,.6,.4])[q-1]*(U==="l"?-1:1)*(b==="pinky"?1.15:1);J.updateMatrixWorld(!0),_.setFromAxisAngle(B,ie),z.parent.getWorldQuaternion(I),z.quaternion.premultiply(I.clone().invert().multiply(_).multiply(I))}J.updateMatrixWorld(!0)}if(!N())throw new Error("no WebGL");if(L=y,s.mh!==!1)try{S=wd({scene:c,tier:e,ctx:s,F:d,url:T,used:x,SC:Sc,getR:()=>a,cvs:X,blobTex:xt,SKINS:Va,chars:V}),await S.ready}catch(_){console.warn("3D mh",_),S=null}return i.ready=!0,i}),X=(y,v,M)=>{let _=document.createElement("canvas");return _.width=y,_.height=v,M(_.getContext("2d"),y,v),_},re=(y,v,M)=>{let _=new Jr(y);return v!==!1&&(_.colorSpace=kt),M&&(_.wrapS=_.wrapT=Bi),_.anisotropy=t?1:4,_},xe=null,G=()=>xe||(xe=re(X(640,96,y=>{y.fillStyle="#000",y.fillRect(0,0,640,96),y.font="900 80px Arial, Helvetica, sans-serif",y.textAlign="center",y.textBaseline="middle",y.lineJoin="round",y.globalCompositeOperation="lighter";for(let v=0;v<10;v++)y.strokeStyle="#0000ff",y.lineWidth=10,y.strokeText(String(v),v*64+35,56),y.fillStyle="#0000ff",y.fillText(String(v),v*64+35,56);y.globalCompositeOperation="source-over";for(let v=0;v<10;v++)y.strokeStyle="#00ff00",y.lineWidth=9,y.strokeText(String(v),v*64+32,52),y.fillStyle="#ffffff",y.fillText(String(v),v*64+32,52)}),!1)),Y=(y,v,M)=>X(512,256,_=>{for(let I=0;I<2;I++){_.save(),_.translate(I*256,0),_.scale(4,4),_.beginPath(),_.rect(0,0,64,64),_.clip();let B=y.c2;_.fillStyle=v||y.c1,_.fillRect(0,0,64,64),_.fillStyle=B,v||({stripes:()=>{for(let b=4;b<64;b+=16)_.fillRect(b,0,7,64)},hoops:()=>{for(let b=10;b<64;b+=16)_.fillRect(0,b,64,7)},halves:()=>_.fillRect(32,0,32,64),sash:()=>{_.beginPath(),_.moveTo(0,10),_.lineTo(12,0),_.lineTo(64,52),_.lineTo(52,64),_.fill()},pinstripes:()=>{for(let b=3;b<64;b+=6)_.fillRect(b,0,1.2,64)},chevron:()=>{_.beginPath(),_.moveTo(0,6),_.lineTo(32,26),_.lineTo(64,6),_.lineTo(64,16),_.lineTo(32,36),_.lineTo(0,16),_.fill()},gradient:()=>{let b=_.createLinearGradient(0,0,0,64);b.addColorStop(0,y.c1),b.addColorStop(1,B),_.fillStyle=b,_.fillRect(0,0,64,64)},checker:()=>{for(let b=0;b<64;b+=12)for(let q=0;q<64;q+=12)(b+q)/12%2&&_.fillRect(b,q,12,12)},centre:()=>_.fillRect(26,0,12,64)}[y.pat]||(()=>{}))();let U=_.createLinearGradient(0,0,64,0);U.addColorStop(0,"rgba(0,0,0,.18)"),U.addColorStop(.5,"rgba(255,255,255,.05)"),U.addColorStop(1,"rgba(0,0,0,.18)"),_.fillStyle=U,_.fillRect(0,0,64,64),I||(_.fillStyle="rgba(255,255,255,.75)",_.fillRect(16,12,6,1.2),M&&_.drawImage(M,40,9,10,11.3)),_.restore()}}),ce=new Map;i.team=function(y,v,M,_){let I=s.kitN(y),B=s.hx(v,"#facc15"),U=JSON.stringify([I,B,M||null,_||""]),b=ce.get(U);if(b)return ce.delete(U),ce.set(U,b),b;let q=re(Y(I)),z=re(Y(I,B));if(b={_b3:1,key:U,K:I,g:B,tex:q,gtex:z},M)try{let ie=s.crestSvg(M,_,46).replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" '),ve=new Image;ve.onload=()=>{b.dead||(b.crestImg=ve,b.tex.image=Y(I,null,ve),b.tex.needsUpdate=!0,b.gtex.image=Y(I,B,ve),b.gtex.needsUpdate=!0)},ve.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(ie)}catch{}if(ce.set(U,b),ce.size>10){let[ie,ve]=ce.entries().next().value;ce.delete(ie),ve.dead=1,ve.tex.dispose(),ve.gtex.dispose()}return b},i.freeTeam=function(){};let pe=y=>{let v=new Ge(y);return .3*v.r+.59*v.g+.11*v.b},ue=`uniform vec4 uFace; uniform vec4 uFace2; uniform vec4 uFace3; uniform vec4 uExpr; uniform float uK;
  vec3 faceDef(vec3 b) {
    if (b.y < 1.55) return vec3(0.0);
    vec3 o = vec3(0.0); float ax = abs(b.x), sx = sign(b.x), F = smoothstep(0.0, 0.06, b.z);
    float jaw = smoothstep(1.565, 1.6, b.y) * (1.0 - smoothstep(1.62, 1.69, b.y));
    o.x += b.x * uFace.x * jaw;
    float chin = smoothstep(0.03, 0.08, b.z) * (1.0 - smoothstep(1.597, 1.627, b.y)) * (1.0 - smoothstep(0.028, 0.05, ax));
    o.y -= uFace.y * chin; o.z += uFace.y * 0.6 * chin;
    float nd = length((b - vec3(0.0, 1.665, 0.112)) * vec3(1.0, 0.8, 1.0)), nose = 1.0 - smoothstep(0.01, 0.034, nd);
    o.x += b.x * uFace.z * nose; o.z += uFace2.w * nose;
    float brow = (1.0 - smoothstep(0.0, 0.016, abs(b.y - 1.722))) * F * (1.0 - smoothstep(0.045, 0.075, ax));
    o.z += uFace.w * brow;
    float cd = length(vec2(ax - 0.06, b.y - 1.685)), cheek = (1.0 - smoothstep(0.0, 0.03, cd)) * F;
    o.x += sx * uFace2.x * cheek;
    o.x += b.x * uFace2.y * smoothstep(1.6, 1.66, b.y);
    /* G4c: face length (chin down), lip fullness, nose length, nose bridge, cheekbones high/low, forehead */
    float low = 1.0 - smoothstep(1.6, 1.69, b.y); o.y -= uFace3.x * low * smoothstep(-0.04, 0.04, b.z);
    float lp = (1.0 - smoothstep(0.0, 0.012, abs(b.y - 1.637))) * (1.0 - smoothstep(0.022, 0.034, ax)) * smoothstep(0.075, 0.09, b.z); o.z += uFace3.y * lp;
    float nt = 1.0 - smoothstep(0.0, 0.018, length(vec2(b.x, b.y - 1.656))); o.y -= uFace3.z * nt * F;
    float br = (1.0 - smoothstep(0.0, 0.012, ax)) * smoothstep(1.668, 1.68, b.y) * (1.0 - smoothstep(1.7, 1.715, b.y)) * smoothstep(0.08, 0.1, b.z); o.z += uFace3.w * br;
    float fh = smoothstep(1.735, 1.78, b.y) * F * (1.0 - smoothstep(0.05, 0.08, ax)); o.z += uFace2.z * fh;
    /* expressions: x focus, y joy, z shout, w sad */
    float wb = (1.0 - smoothstep(0.006, 0.02, abs(b.y - 1.711))) * smoothstep(0.03, 0.07, b.z) * (1.0 - smoothstep(0.05, 0.075, ax)), inner = 1.0 - smoothstep(0.0, 0.035, ax);
    o.y += wb * (-uExpr.x * 0.0035 * (0.4 + inner) + uExpr.w * 0.004 * inner + uExpr.y * 0.0015 - uExpr.z * 0.002 * inner);
    o.x -= sx * wb * inner * (uExpr.x + uExpr.z * 0.6) * 0.002;
    float mc = (1.0 - smoothstep(0.0, 0.015, length(vec2(ax - 0.027, b.y - 1.638)))) * F;
    o.y += mc * (uExpr.y * 0.0045 - uExpr.w * 0.004); o.x += sx * mc * (uExpr.y * 0.003 + uExpr.z * 0.002);
    float cu = (1.0 - smoothstep(0.0, 0.025, length(vec2(ax - 0.045, b.y - 1.668)))) * F; o.y += cu * uExpr.y * 0.002;
    float jd = smoothstep(1.565, 1.59, b.y) * (1.0 - smoothstep(1.628, 1.642, b.y)) * smoothstep(-0.02, 0.04, b.z) * (1.0 - smoothstep(0.05, 0.075, ax));
    o.y -= jd * (uExpr.z * 0.011 + uExpr.y * 0.002); o.z -= jd * uExpr.z * 0.003;
    return o;
  }`,Ae=`uniform vec4 uBody;
  vec3 bodyDef(vec3 b, vec3 n) {
    if (b.y > 1.556) return vec3(0.0);
    float ax = abs(b.x), arm = step(0.232, ax) * step(1.2, b.y), na = 1.0 - arm;
    float torso = na * smoothstep(0.84, 0.95, b.y) * (1.0 - smoothstep(1.47, 1.55, b.y));
    float leg = na * (1.0 - smoothstep(0.86, 0.94, b.y)) * smoothstep(0.1, 0.16, b.y);
    float upper = arm * (1.0 - smoothstep(0.42, 0.62, ax));
    vec3 o = n * uBody.x * (0.011 * torso + 0.007 * upper + 0.008 * leg * (1.0 - smoothstep(0.5, 0.75, b.y) * 0.4));
    o.x += b.x * uBody.x * 0.045 * torso * smoothstep(1.2, 1.45, b.y);
    float shirt = na * smoothstep(uBody.z > 0.5 ? 0.77 : 0.85, 0.92, b.y) * (1.0 - smoothstep(1.46, 1.52, b.y));
    float slv = arm * (1.0 - smoothstep(uBody.w > 0.5 ? 0.6 : 0.37, uBody.w > 0.5 ? 0.63 : 0.405, ax));
    o += n * (0.004 * shirt + 0.003 * slv) * uBody.y;
    o += n * na * uBody.z * (1.0 - smoothstep(0.8, 0.9, b.y)) * smoothstep(0.765, 0.79, b.y) * 0.007;
    return o;
  }`,me=(y,v)=>{y.vertexShader=`attribute vec3 aB;
`+(v?`attribute vec3 aBN;
varying vec3 vB;
varying vec3 vBN;
`+Ae+`
`:"")+ue+`
`+y.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
`+(v?`vB = aB; vBN = aBN;
transformed += bodyDef(aB, aBN) * uK;
`:"")+"transformed += faceDef(aB) * uK;")},ye=()=>({uFace:{value:new Mt},uFace2:{value:new Mt},uFace3:{value:new Mt},uExpr:{value:new Mt}});function Ue(y,v,M,_,I){let B=new Vt({map:y.map,roughness:.6,metalness:0,envMapIntensity:.45}),U=()=>({value:new Ge}),b=B.userData.u=Object.assign(_?Object.assign({},_):{uSkin:U(),uHair:U(),uSho:U(),uSoc:U(),uSlv:U(),uCol:U(),uBoot:U(),uBoot2:U(),uGlove:U(),uNumC:U(),uTape:U(),uShirt:{value:null},uDig:{value:G()},uName:{value:null},uNum:{value:new Je(-1,-1)},uGK:{value:0},uHairS:{value:1},uBeard:{value:0},uRed:{value:0},uBody:{value:new Mt(0,1,0,0)},uGear:{value:new Mt}},v,{uK:{value:M},uLayer:{value:I||0}});return _||(B.userData.base=b),I&&(B.side=Cn,B.roughness=.82),B.onBeforeCompile=q=>{Object.assign(q.uniforms,b),me(q,!0),I===1&&(q.vertexShader=`attribute vec3 aOff;
uniform float uLayer;
`+q.vertexShader.replace("transformed += bodyDef(aB, aBN) * uK;","transformed += bodyDef(aB, aBN) * uK; transformed -= aOff * (1.0 - uBody.z) * (1.0 - smoothstep(0.83, 0.9, aB.y)) * 0.85;")),q.fragmentShader=`uniform float uLayer;
`+q.fragmentShader,q.fragmentShader=`uniform vec3 uSkin,uHair,uSho,uSoc,uSlv,uCol,uBoot,uBoot2,uGlove,uNumC,uTape;uniform sampler2D uShirt,uDig,uName;uniform vec2 uNum;uniform float uGK,uHairS,uBeard,uRed;uniform vec4 uExpr,uBody,uGear;varying vec3 vB;varying vec3 vBN;
float hz(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
`+q.fragmentShader.replace("#include <map_fragment>",`float wSkin = 0.0;
#include <map_fragment>
        { vec3 P = vB; vec3 N = normalize(vBN); float ax = abs(P.x); float L = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));
          float face = step(1.555, P.y);
          float sh = clamp(mix(1.0, L / 0.2, 0.5 + 0.2 * face), 0.62, 1.1);
          vec3 skin = uSkin * sh;
          float bz = face * (1.0 - smoothstep(1.645, 1.672, P.y)) * smoothstep(-0.03, 0.02, P.z);
          float lips = (1.0 - smoothstep(0.018, 0.03, ax)) * (1.0 - smoothstep(0.004, 0.009, abs(P.y - 1.638))) * step(0.08, P.z);
          if (uBeard < 0.5) skin = mix(skin, uSkin * mix(sh, 1.0, 0.55), bz);
          skin = mix(skin, skin * vec3(1.06, 0.93, 0.92), uRed * face * smoothstep(1.64, 1.7, P.y) * smoothstep(0.03, 0.09, ax));
          skin = mix(skin, skin * vec3(0.93, 0.8, 0.8), lips * 0.6);
          vec3 col = skin; vec3 numO = vec3(0.01, 0.012, 0.02);
          float hem = uBody.z > 0.5 ? 0.79 : 0.86; if (uLayer > 0.5 && uLayer < 1.5) { hem = 0.0; P.y = max(P.y, 0.795); } if (uLayer > 1.5 && uLayer < 2.5) P.y = clamp(P.y, 0.64, 0.855); if (uLayer > 2.5) P.y = min(P.y, 0.855);
          float sockTop = uGear.x < 0.5 ? 0.47 : uGear.x < 1.5 ? 0.515 : uGear.x < 2.5 ? 0.395 : 0.47;
          if (ax > 0.232 && P.y > 1.2) {
            if (ax < (uGK > 0.5 || uBody.w > 0.5 ? 0.63 : 0.40)) col = uSlv * (0.86 + 0.14 * N.y);
            if (ax > 0.39 && ax < 0.415 && uGK < 0.5 && uBody.w < 0.5) col = uCol;
            if (uBody.w > 0.5 && uGK < 0.5 && ax > 0.605 && ax < 0.63) col = uCol;
            if (uGear.z > 0.5 && ax > 0.598 && ax < 0.635 && (uGear.z < 1.5 || P.x > 0.0) && uGK < 0.5 && uBody.w < 0.5) col = uTape * (0.85 + 0.15 * N.y);
            if (uGK > 0.5 && ax > 0.655) col = uGlove;
          } else if (P.y > hem && P.y < 1.6) {
            float u = clamp((P.x + 0.27) / 0.54, 0.0, 1.0), v = clamp((1.56 - P.y) / 0.7, 0.0, 1.0);
            bool back = N.z < -0.2;
            col = texture2D(uShirt, vec2(back ? 0.5 + (1.0 - u) * 0.5 : u * 0.5, 1.0 - v)).rgb;
            if (P.y < 0.875) col *= 0.88 + 0.12 * smoothstep(hem, 0.875, P.y);
            float top = 1.5 + smoothstep(0.075, 0.16, ax) * 0.1;
            if (P.y > top - 0.024 && ax < 0.14) col = uCol;
            if (P.y > top) col = uLayer > 0.5 ? uCol : skin;
            if (back && uNum.y >= 0.0 && P.y > 1.08 && P.y < 1.35 && ax < 0.13) {
              float lu = (0.13 - P.x) / 0.26, lv = (1.35 - P.y) / 0.27; float idx = -1.0, du = 0.0;
              if (uNum.x >= 0.0) { idx = lu < 0.5 ? uNum.x : uNum.y; du = fract(lu * 2.0); } else if (lu > 0.25 && lu < 0.75) { idx = uNum.y; du = (lu - 0.25) * 2.0; }
              if (idx >= 0.0) { vec3 t = texture2D(uDig, vec2((idx + du * 0.9 + 0.05) / 10.0, 1.0 - lv)).rgb; col = mix(col, vec3(0.0), t.z * 0.45); col = mix(col, numO, t.y * 0.95); col = mix(col, uNumC, t.x); }
            }
            /* G4c: surname above the number */
            if (P.z < -0.01 && uGear.w > 0.5 && P.y > 1.358 && P.y < 1.458 && ax < 0.16) { vec3 t = texture2D(uName, vec2((0.16 - P.x) / 0.32, (P.y - 1.358) / 0.1)).rgb; col = mix(col, vec3(0.0), t.z * 0.45); col = mix(col, numO, t.y * 0.95); col = mix(col, uNumC, t.x); }
          } else if (uGear.y > 0.5 && P.y > 0.118 && P.y <= 0.86) { col = uSho * (0.86 + 0.14 * N.y) * (0.94 + 0.06 * smoothstep(0.0, 0.02, abs(P.x - sign(P.x) * 0.1))); if (uGear.y > 1.5 && P.y > 0.5) col = uSlv * (0.88 + 0.12 * N.y); if (uLayer > 2.5 && vB.y > 0.9) col = vec3(0.03, 0.03, 0.04); }
          else if (P.y > 0.635 && P.y <= 0.86) { col = uSho * (0.9 + 0.1 * N.y); if (P.y > 0.83) col *= 0.82; }
          else if (P.y > 0.118 && P.y < sockTop) { col = uSoc; if (P.y > sockTop - 0.035) col *= 0.8;
            if (uGear.x > 1.5 && uGear.x < 2.5) col *= 0.82 + 0.18 * abs(sin(P.y * 260.0 + P.x * 40.0));
            if (uGear.x > 2.5 && P.y > 0.37 && P.y < 0.405) col = uTape * (0.82 + 0.18 * hz(floor(P * 600.0))); }
          else if (P.y <= 0.118) { col = uBoot; if (P.y > 0.04 && P.y < 0.075 && abs(N.x) > 0.55 && P.z < 0.1) col = uBoot2; if (P.y < 0.022) col = vec3(0.9); }
          /* beards: 1 stubble, 2 short beard, 3 goatee, 4 chin strap, 5 full, 6 moustache + goatee */
          if (uBeard > 0.5 && bz > 0.02) { float n = hz(floor(P * 1400.0)), up = smoothstep(-0.95, -0.25, N.y) * smoothstep(1.578, 1.59, P.y) * (0.75 + 0.25 * hz(floor(P * 700.0))) * (1.0 - smoothstep(0.085, 0.095, ax)) * (1.0 - lips);
            float jl = 1.588 + 0.065 * smoothstep(0.02, 0.08, ax);
            float full = 1.0 - smoothstep(jl - 0.004, jl + 0.03 + 0.01 * smoothstep(0.03, 0.06, ax), P.y);
            float must = (1.0 - smoothstep(0.024, 0.034, ax)) * smoothstep(1.641, 1.645, P.y) * (1.0 - smoothstep(1.651, 1.656, P.y)) * smoothstep(0.08, 0.09, P.z);
            float chinZ = (1.0 - smoothstep(0.017, 0.028, ax)) * (1.0 - smoothstep(1.626, 1.633, P.y));
            float strap = 1.0 - smoothstep(jl + 0.004, jl + 0.013, P.y);
            up *= smoothstep(1.574, 1.594, P.y) + step(0.07, P.z) * (1.0 - smoothstep(0.03, 0.05, ax));
            float m = uBeard < 1.5 ? 0.3 * (1.0 - smoothstep(1.615, 1.652, P.y)) : uBeard < 2.5 || uBeard > 4.5 ? max(full, must) : uBeard < 3.5 ? max(must, chinZ) : strap;
            col = mix(col, uHair * (0.65 + 0.7 * n), clamp(m, 0.0, 1.0) * up * bz * (0.55 + 0.4 * n)); }
          /* open mouth when shouting */
          float mo = uExpr.z * (1.0 - smoothstep(0.012, 0.022, length(vec2(P.x / (0.7 + 0.5 * uExpr.z), (P.y - 1.636) * 2.2)))) * step(0.085, P.z);
          col = mix(col, vec3(0.09, 0.02, 0.02), clamp(mo * 1.6, 0.0, 1.0));
          col = mix(col, vec3(0.85), clamp(mo * 1.6, 0.0, 1.0) * step(1.6395, P.y) * step(P.y, 1.6425));
          /* hair painted on the scalp: 1 full, 2 fade (sides fade to skin), 3 mohawk (sides shaved), 4 buzz (skin shows through) */
          if (P.y > 1.58 && uHairS > 0.5) { float hl = mix(1.745, 1.6, smoothstep(0.25, -0.6, N.z)); if (ax > 0.07 && N.z > -0.2) hl = max(hl, 1.735 - (ax - 0.07) * 0.6);
            if (P.y > hl) { float n = hz(floor(P * 900.0)); vec3 hc = uHair * (0.75 + 0.5 * n); float a = 1.0;
              if (uHairS > 1.5 && uHairS < 2.5) a = mix(0.3, 1.0, clamp(smoothstep(1.7, 1.765, P.y) * (1.0 - smoothstep(0.072, 0.088, ax)) + smoothstep(1.78, 1.8, P.y), 0.0, 1.0));
              if (uHairS > 2.5 && uHairS < 3.5) a = mix(0.25, 1.0, 1.0 - smoothstep(0.02, 0.035, ax));
              if (uHairS > 3.5) a = 0.55 + 0.3 * n;
              col = mix(col, hc, a); } }
          if (uLayer > 0.5 && !gl_FrontFacing) col *= 0.45;
          wSkin = uLayer < 0.5 && distance(col, skin) < 0.002 ? 1.0 : 0.0;
          diffuseColor.rgb = col; }`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, 0.4 + 0.16 * hz(floor(vB * 2600.0)) + 0.1 * step(vB.y, 1.555), wSkin);`).replace("#include <opaque_fragment>",`{ float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.5); outgoingLight += wSkin * diffuseColor.rgb * vec3(1.0, 0.42, 0.3) * (0.1 * rim + 0.05) * (0.4 + totalEmissiveRadiance.r * 0.0 + dot(reflectedLight.directDiffuse + reflectedLight.indirectDiffuse, vec3(0.6))); }
#include <opaque_fragment>`)},B.customProgramCacheKey=()=>"w3dbody6_"+(I||0),B}function oe(y,v,M,_){let I=y.clone(),B=Object.assign({},v,{uK:{value:M},uIris:{value:new Ge}});return I.userData.u=B,I.onBeforeCompile=U=>{Object.assign(U.uniforms,B),me(U,!1),_||(U.vertexShader=U.vertexShader.replace("transformed += faceDef(aB) * uK;","transformed += faceDef(aB) * uK; transformed.y += (1.713 - aB.y) * 0.35 * uK; transformed.z -= 0.0015 * uK;")),_&&(U.fragmentShader=`uniform vec3 uIris;
`+U.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ vec3 c = diffuseColor.rgb; float mx = max(c.r, max(c.g, c.b)), mn = min(c.r, min(c.g, c.b)), L = dot(c, vec3(0.3, 0.59, 0.11)); float ir = smoothstep(0.03, 0.09, mx - mn) * (1.0 - smoothstep(0.3, 0.5, L)); diffuseColor.rgb = mix(c, uIris * clamp(L / 0.12, 0.5, 1.6), ir); }`))},I.customProgramCacheKey=()=>_?"w3deye2":"w3dbrow3",I}function w(y,v,M){let _=new Vt({color:1118481,roughness:.88,envMapIntensity:.35}),I=Object.assign({},y,{uK:{value:v||1},uStyle:{value:0},uTip:{value:new Mt(0,0,0,0)}});return _.userData.u=I,_.onBeforeCompile=B=>{Object.assign(B.uniforms,I),me(B,!1),B.vertexShader=`attribute float aE;
varying vec3 vHB;
varying float vE;
`+B.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vHB = aB; vE = aE;`),B.fragmentShader=`uniform float uStyle;uniform vec4 uTip;varying vec3 vHB;varying float vE;
float hz2(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
`+B.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
        { vec3 p = vHB; if (vE < 0.2 + 0.45 * hz2(floor(p * 1100.0))) discard; float n = hz2(floor(p * vec3(700.0, 260.0, 700.0)));
          float g = 0.72 + 0.45 * n;
          if (uStyle > 0.5 && uStyle < 1.5) { float r = abs(sin(p.x / 0.0085 * 3.14159)); g *= mix(0.45, 1.15, smoothstep(0.15, 0.6, r)); }
          else if (uStyle > 1.5 && uStyle < 2.5) { float c = hz2(floor(p * 160.0)); g *= 0.65 + 0.55 * c; }
          else if (uStyle > 2.5 && uStyle < 3.5) { vec2 q = vec2(atan(p.x, p.z) * 9.0, p.y * 70.0); float c = length(fract(q) - 0.5); g *= mix(1.15, 0.5, smoothstep(0.25, 0.5, c)); }
          else if (uStyle > 3.5 && uStyle < 4.5) { if (abs(p.x - 0.032) < 0.0035 && p.z > -0.02 && p.y > 1.73) g *= 0.35; float c = hz2(floor(p * vec3(900.0, 900.0, 120.0))); g *= 0.8 + 0.3 * c; }
          else if (uStyle > 4.5) { float c = hz2(floor(p * vec3(500.0, 500.0, 60.0))); g *= 0.75 + 0.5 * c; }
          diffuseColor.rgb *= g;
          if (uTip.w > 0.5) diffuseColor.rgb = mix(diffuseColor.rgb, uTip.rgb * (0.8 + 0.3 * n), smoothstep(1.765, 1.79, p.y)); }`)},_.customProgramCacheKey=()=>"w3dhair4",_}function H(y,v,M,_){let I=new Vt({map:y.map,normalMap:y.normalMap,normalScale:new Je(.8,.8),roughness:_?.8:.62,metalness:0,envMapIntensity:.3}),B=Object.assign({},v,{uK:{value:M||1},uCut:{value:0}});return I.userData.u=B,I.onBeforeCompile=U=>{Object.assign(U.uniforms,B),me(U,!1),U.vertexShader=`varying vec3 vHB;
`+U.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vHB = aB;`),U.fragmentShader=`uniform float uCut; varying vec3 vHB;
`+U.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ float ax = abs(vHB.x); if (uCut > 1.5 && ax > (vHB.y > 1.642 ? 0.046 : 0.033)) discard; if (uCut > 0.5 && uCut < 1.5 && vHB.y > 1.62 && ax > 0.055) discard; float g = dot(diffuseColor.rgb, vec3(0.333)); diffuseColor.rgb = vec3(clamp(0.35 + g * 1.05, 0.0, 1.4)) * diffuse; }`)},I.customProgramCacheKey=()=>"w3dmhair2",I}let V=[],Q=new Map,_e=30;function Z(){let y=id(J),v={root:y,bones:{},mixer:new $r(y),act:{},w:{},id:null,lastN:-9,mod:new Map,ph:0,ex:new Mt,look:0,lookP:0,lean:0};y.traverse(_=>{_.isBone&&(v.bones[_.name]=_)});let M=v.FU=ye();v.mats=[],v.parts={},v.lockMat=new Vt({color:1118481,roughness:.9}),v.bandMat=new Vt({color:16777215,roughness:.7}),y.traverse(_=>{let I=_.geometry&&_.geometry.userData.k||1;_.isSkinnedMesh&&/^k_/.test(_.name)?((v.cloth=v.cloth||[]).push(_),_.userData.layer=_.name==="k_shirt"?1:_.name==="k_trou"?3:2):_.isSkinnedMesh&&_.material&&/Superhero/i.test(_.material.name||"")?(_.material=Ue(_.material,M,I,v.bodyU),v.bodyU=v.bodyU||_.material.userData.u,v.mats.push(_.material),_.castShadow=!0,_.name==="Body_LO"?v.lo=_:(v.hi=_,v.mat=_.material)):_.isSkinnedMesh&&/^m_/.test(_.name)?(_.material=H(_.material,M,I,_.name==="m_beard"),_.name==="m_beard"?v.mBeard=_.material:(v.mHair=v.mHair||[]).push(_.material),v.parts[_.name]=_,_.castShadow=!0,_.visible=!1):_.isSkinnedMesh&&/Hair/i.test(_.material.name||"")?(_.material=oe(_.material,M,I,!1),v.browMat=_.material):_.isSkinnedMesh&&/Eye/i.test(_.material.name||"")?(_.material=oe(_.material,M,I,!0),v.eyeMat=_.material):/^h_(bun|pony|locks|long)/.test(_.name)?(_.traverse(B=>{B.isMesh&&(B.material=v.lockMat)}),v.parts[_.name]=_):_.isSkinnedMesh&&/^h_/.test(_.name)?(_.material=v.hairMat||(v.hairMat=w(M,I)),v.parts[_.name]=_):_.isSkinnedMesh&&/^b_/.test(_.name)?(_.material=v.beardMat||(v.beardMat=w(M,I)),v.parts[_.name]=_):_.isSkinnedMesh&&/^g_/.test(_.name)&&(_.material=v.bandMat,v.parts[_.name]=_)});for(let _ of v.cloth||[])_.material=Ue(v.mat||_.material,M,_.geometry.userData.k||1,v.bodyU,_.userData.layer);v.hairMat=v.hairMat||w(M,1),v.beardMat=v.beardMat||w(M,1),v.pivots=Object.values(v.parts).map(_=>_.parent).filter(_=>_&&/_pv$/.test(_.name)),v.sw={x:0,z:0,vx:0,vz:0,px:0,pz:0};for(let _ in Id){let I=F[Id[_]];if(!I)continue;let B=v.mixer.clipAction(I);B.play(),B.setEffectiveWeight(0),v.act[_]=B,v.w[_]=0}return v.w.idle=1,c.add(y),V.push(v),v}function ae(y){let v=Q.get(y);if(v)return v;let M=V.filter(_=>!_.mh);return v=M.filter(_=>_.lastN<d.n-1).sort((_,I)=>_.lastN-I.lastN)[0],!v&&M.length<_e&&(v=Z()),v||(v=M.sort((_,I)=>_.lastN-I.lastN)[0]),v.id!=null&&Q.delete(v.id),v.id=y,Q.set(y,v),v.dk=null,v.lastN=-9,v}let be={gh:"af",ng:"af",ea:"af",za:"af2",ca:"af",fr:"mix",ar:"na",in:"sa",la:"lat",pt:"mix",es:"eu",it:"eu",tr:"na",cn:"ea",jp:"ea",kr:"ea",en:"eu",de:"eu",nl:"eu",ee:"eu"},W={af:[0,5],af2:[0,9],mix:[0,12],na:[5,10],sa:[3,9],lat:[4,11],eu:[8,13],ea:[8,12]},yt={af:["shaved","buzz","buzz","fade","fade","afro","top","twist","dread","locks","locksL","corn","corn","hawk","curl","crew","under","bleach"],straight:["shaved","buzz","crew","fade","short","short","part","quiff","slick","curl","bun","pony","long","hawk","under"],ea:["buzz","crew","short","part","quiff","slick","fade","under","bleach","short"]},Pe={crew:"m_buzz",short:"m_buzz",afro:"h_afro",top:"h_top",corn:"h_corn",hawk:"h_hawk",under:"h_under",curl:"h_curl",quiff:"h_quiff",part:"m_part",slick:"m_part",twist:"h_twist",dread:"h_dread",locks:"h_dread",locksL:"h_dread",bun:"m_buzz",pony:"h_slick",long:"m_long",bleach:"h_top"},at={afro:1,top:1,twist:1,dread:1,locks:1,locksL:1,bleach:1},He={lean:{h:[1.78,1.9],b:[-.6,-.25]},balanced:{h:[1.74,1.88],b:[-.2,.25]},stocky:{h:[1.72,1.84],b:[.3,.7]}},vt={face:[[-.16,.16],[-.006,.01],[-.22,.32],[-.0035,.004]],face2:[[-.005,.007],[-.05,.05],[-.004,.004],[-.007,.006]],face3:[[-.008,.008],[0,.004],[-.003,.003],[-.0055,.003]],h:[1.72,1.9],build:[-.6,.7]},gt=y=>{for(let v of["face","face2","face3"])y[v]=y[v].map((M,_)=>En(M,vt[v][_][0],vt[v][_][1]));return y.h=En(y.h,vt.h[0],vt.h[1]),y.build=En(y.build,vt.build[0],vt.build[1]),y};i.SAFE=vt,i.lookOf=y=>D(String(y));function D(y){return gt(C(y))}function C(y){let v=Ft(s.hash("look4:"+y)>>>0),M=Xe=>Xe[Math.floor(v()*Xe.length)],_=()=>v()*2-1,I=null;try{let Xe=s.lookOf&&s.lookOf(y);I=Xe&&Xe.cult}catch{}let B=be[I]||M(["af","eu","lat","mix","na","ea"]),U=W[B],b=U[0]+Math.floor(v()*(U[1]-U[0]+1)),q=b<6,z=b>9,ie=B==="eu"&&v()<.22?M(["#a07a44","#c9a55a","#6b2f1a","#7a5230"]):M(q||B==="ea"?["#0a0a0c","#0a0a0c","#121010","#17110d"]:Nb.slice(0,8)),ve=M(q||B==="af2"&&b<6?yt.af:B==="ea"?yt.ea:yt.straight),j=Ub[M(q?["dark","dark","dark","brown"]:z&&B!=="ea"?["brown","hazel","green","blue","blue","grey"]:["dark","brown","brown","hazel",B==="ea"?"dark":"green"])],se=B==="na"||B==="sa"?.75:B==="ea"?.35:.6,de=v()<se?M([1,1,2,2,3,4,5,6]):0,Re=B==="af"||B==="af2"?.1:0,it=B==="ea"?1:0;return{si:b,dark:q,light:z,grp:B,hair:ie,st:ve,iris:j,beard:de,red:z?.4+v()*.6:v()*.3,face:[_()*.16,_()*.008+.002,_()*.22+Re,_()*.003+.001-it*.0015],face2:[_()*.005+it*.002,_()*.05,_()*.004,_()*.004+Re*.02-it*.003],face3:[_()*.008,v()*.0028+Re*.012,_()*.003,_()*.003-it*.0025],...(()=>{let Xe=v(),$e=Xe<.3?"lean":Xe<.75?"balanced":"stocky",Ye=He[$e];return{arch:$e,h:Ye.h[0]+v()*(Ye.h[1]-Ye.h[0]),build:Ye.b[0]+v()*(Ye.b[1]-Ye.b[0])}})(),sock:M([0,0,0,1,1,1,2,3]),band:v()<.12,wrist:v()<.28?v()<.5?1:2:0,sleeves:v()<.1,untuck:v()<.72,tape:M(["#f8fafc","#f8fafc","#e2e8f0","#0b0f24"]),bandC:M(["#f8fafc","#0b0f24","#f8fafc",null]),boot:M(["#0b0f24","#0b0f24","#f8fafc","#22d3ee","#ff2d95","#facc15","#a3e635","#f97316","#a855f7"]),boot2:M(["#f8fafc","#0b0f24","#22d3ee","#ff2d95","#facc15"]),tip:M(["#e8d39a","#f2e6c4","#d9b26a"]),dance:v()<.3,left:v()<.25,sad:Math.floor(v()*3),cel:Math.floor(v()*4)}}let ee=y=>Rc.get(y)||D(y),Me=y=>X(512,64,v=>{if(v.fillStyle="#000",v.fillRect(0,0,512,64),!y)return;v.fillStyle="#fff",v.textAlign="center",v.textBaseline="middle",v.font="900 54px Arial Narrow, Arial, Helvetica, sans-serif",v.lineJoin="round";let M=v.measureText(y).width,_=Math.min(1.25,470/Math.max(1,M));v.save(),v.translate(258,37),v.scale(_,1),v.globalCompositeOperation="lighter",v.strokeStyle="#0000ff",v.lineWidth=9,v.strokeText(y,0,0),v.restore(),v.save(),v.translate(256,34),v.scale(_,1),v.strokeStyle="#00ff00",v.lineWidth=10,v.strokeText(y,0,0),v.fillStyle="#ffffff",v.fillText(y,0,0),v.restore()});function Ee(y,v,M,_,I){let B="";if(s.nameOf&&!/^(mgr|off4|ref|fan)/.test(String(_))){if(y.nmId!==_){y.nmId=_;try{y.nm=String(s.nameOf(_)||"").toUpperCase().slice(0,16)}catch{y.nm=""}}B=y.nm}let U=v.key+(M?"g":"o")+_+":"+I+":"+B;if(y.dk===U)return;y.dk=U;let b=y.bodyU,q=v.K,z=y.lk&&y.lkId===_?y.lk:(y.lkId=_,y.lk=ee(_)),ie=(Re,it)=>b[Re].value.set(it);ie("uSkin",Va[Math.min(Va.length-1,z.si)]),ie("uHair",z.hair),b.uRed.value=z.red,b.uGK.value=M?1:0,b.uShirt.value=M?v.gtex:v.tex,ie("uSho",M?"#111827":q.sho),ie("uSoc",M?v.g:q.soc),ie("uSlv",M?v.g:q.slv),ie("uCol",M?"#111827":q.col),ie("uBoot",z.boot),ie("uBoot2",z.boot2===z.boot?"#f8fafc":z.boot2),ie("uGlove","#f8fafc"),ie("uTape",z.tape===q.soc?"#f8fafc":z.tape),ie("uNumC","#ffffff");let ve=Math.max(0,Math.min(99,Math.floor(+I)||0)),j=I==null||I==="";b.uNum.value.set(j?-1:ve>=10?Math.floor(ve/10):-1,j?-1:ve%10),y.nameTex||(y.nameTex=re(Me(""),!1),b.uName.value=y.nameTex),y.nameTxt!==B&&(y.nameTxt=B,y.nameTex.image=Me(B),y.nameTex.needsUpdate=!0),b.uBody.value.set(z.build,1,!M&&z.untuck?1:0,!M&&z.sleeves?1:0),b.uGear.value.set(z.sock,z.trou||0,M?0:z.wrist,B?1:0),y.hgt=Math.min(1.92,z.h+(M?.04:0))/1.81,y.FU.uFace.value.fromArray(z.face),y.FU.uFace2.value.fromArray(z.face2),y.FU.uFace3.value.fromArray(z.face3),y.eyeMat&&y.eyeMat.userData.u.uIris.value.set(z.iris);let se=y.hstyle=z.st;b.uHairS.value=se==="shaved"?0:se==="fade"?2:se==="hawk"||se==="under"?3:se==="buzz"?4:1;for(let Re in y.parts)y.parts[Re].visible=!1;let de=Re=>{y.parts[Re]&&(y.parts[Re].visible=!0)};de(Pe[se]),se==="bun"&&de("h_bun"),se==="pony"&&de("h_pony"),se==="locks"&&de("h_locksS"),se==="locksL"&&de("h_locksL"),y.hairMat.userData.u.uStyle.value=se==="corn"?1:se==="afro"||se==="curl"?2:se==="twist"||se==="dread"||se==="locks"||se==="locksL"?3:se==="part"?4:se==="slick"||se==="long"||se==="pony"?5:0,y.hairMat.userData.u.uTip.value.set(...new Ge(z.tip).toArray(),se==="bleach"?1:0);for(let Re of y.mHair||[])Re.color.set(z.hair);y.mBeard&&y.mBeard.color.set(z.hair).multiplyScalar(.9),y.hairMat.color.set(z.hair),y.lockMat.color.set(z.hair),y.beardMat.color.set(z.hair).multiplyScalar(.95),y.browMat&&y.browMat.color.set(z.hair).lerp(new Ge(Va[Math.min(Va.length-1,z.si)]),.25),b.uBeard.value=z.beard,y.beardMat.userData.u.uStyle.value=2,(z.beard===5||z.beard===2||z.beard===3||z.beard===6)&&(de("m_beard"),y.mBeard&&(y.mBeard.userData.u.uCut.value=z.beard===5?0:z.beard===2?1:2)),z.band&&!M&&(de(at[se]?"g_bandX":Pe[se]?"g_band":"g_band0"),y.bandMat.color.set(z.bandC||q.c1)),y.style=z}let Se=new nt,qe=new nt,De=new nt,Oe=new ls,et=new ls,ot=new ls,fe=new ls,wt=(y,v)=>{y.mod.has(v)||y.mod.set(v,v.quaternion.clone())};function le(y,v,M,_,I){let B=y.bones[v],U=y.bones[M];!B||!U||I<=.001||(wt(y,B),B.updateWorldMatrix(!0,!1),U.updateWorldMatrix(!1,!1),Se.setFromMatrixPosition(B.matrixWorld),qe.setFromMatrixPosition(U.matrixWorld).sub(Se).normalize(),De.copy(_).normalize().applyQuaternion(y.root.quaternion),Oe.setFromUnitVectors(qe,De),I<1&&Oe.copy(fe.identity().slerp(Oe,I)),B.parent.getWorldQuaternion(ot),et.copy(ot).invert().multiply(Oe).multiply(ot),B.quaternion.premultiply(et))}function Ve(y,v,M,_){let I=y.bones[v];!I||!_||(wt(y,I),I.updateWorldMatrix(!0,!1),De.copy(M).applyQuaternion(y.root.quaternion),Oe.setFromAxisAngle(De,_),I.parent.getWorldQuaternion(ot),et.copy(ot).invert().multiply(Oe).multiply(ot),I.quaternion.premultiply(et))}let ke=new nt(1,0,0),We=new nt(0,1,0),Ce=(y,v,M)=>new nt(y,v,M),Nt={wind:[Ce(0,-.8,-.6),Ce(0,-.15,-1)],hit:[Ce(0,-.4,.92),Ce(0,-.3,1)]};i.fig=function(y,v,M,_,I,B){if(!y||!y._b3||!L)return;B=B||{},M=String(M);let U=S&&S.ok&&S.isPlayer(M),b=U?S.getChar(M):ae(M),q=b.lastN<d.n-1;b.lastN=d.n,x.add(b.root);let z=B.num;if(z==null){if(b.numId!==M){b.numId=M;try{b.num=s.numOf(M)}catch{b.num=null}}z=b.num}if(U){let he="";if(s.nameOf){if(b.nmId!==M){b.nmId=M;try{b.nm=String(s.nameOf(M)||"").toUpperCase().slice(0,16)}catch{b.nm=""}}he=b.nm}b.lkId!==M&&(b.lkId=M,b.lk=ee(M)),S.dress(b,y,v,M,z,b.lk,he)}else Ee(b,y,v,M,z);b.gls&&(b.gls.visible=!!(b.style&&b.style.mgr&&b.style.gl));let ie=d.dt;if(q){b.px=_,b.pz=I,b.spd=0,b.kickT=-1,b.pk=0;for(let he in b.w)b.w[he]=0;b.w.idle=1}let ve=_-b.px,j=I-b.pz,se=ie>0?Math.sqrt(ve*ve+j*j)/ie:0;b.px=_,b.pz=I,b.spd+=(Math.min(se,11)-b.spd)*Math.min(1,ie*6);let de=Math.min(b.spd,(B.run==null?1:B.run)*6.5+.35),Re=B.jump||0,it=B.dive||0,Xe=B.kick||0,$e=!it&&!B.header&&(B.arms==="up"||Re>.001),Ye=!$e&&!it&&!B.hands&&(B.lean||0)>.2,Ot=Xe>0&&b.pk<=0,$t=!!B.slide&&!b.psl;b.psl=!!B.slide,Xe>0&&b.pk<=0&&(b.kickT=0),b.pk=Xe,b.kickT>=0&&(b.kickT+=ie,b.kickT>.6&&(b.kickT=-1));let cn={idle:0,walk:0,jog:0,sprint:0,dance:0,air:0,crouch:0,talk:0};if(it)cn.air=1;else if($e&&b.style.dance&&de<1.5)cn.dance=1;else if($e&&Re>.06)cn.air=1;else{let he=1-ut(.25,1,de);cn.walk=ut(.25,1,de)*(1-ut(1.8,3,de)),cn.jog=ut(1.8,3,de)*(1-ut(4.8,6.2,de)),cn.sprint=ut(4.8,6.2,de),v&&!$e&&!Ye&&Be&&ct>=d.n-1?(cn.crouch=he*.6,cn.idle=he*.4):cn.idle=he}let ln=0,li=Math.min(1,ie*7);for(let he in b.act)b.w[he]+=((cn[he]||0)-b.w[he])*li,b.w[he]<.002&&(b.w[he]=0),ln+=b.w[he];ln<.01&&(b.w.idle=1,ln=1);for(let he in b.act)b.act[he].setEffectiveWeight(b.w[he]/ln);{let he=b.w.walk+b.w.jog+b.w.sprint,Qe=he>.01?(b.w.walk*2+b.w.jog*3.4+b.w.sprint*4.4)/he:2,rt=En(Math.max(de,.9)/Qe,.55,1.75);b.ph=(b.ph+ie*rt)%1;let Ut={walk:0,jog:0,sprint:.05};for(let Wt of["walk","jog","sprint"]){let Kt=b.act[Wt];Kt&&(Kt.timeScale=0,Kt.time=(b.ph+Ut[Wt])%1*Kt.getClip().duration)}}b.mh&&S.pre(b,B,ie,Ot&&!it,$t);for(let[he,Qe]of b.mod)he.quaternion.copy(Qe);b.mod.clear(),b.mixer.update(ie);let fs=B.yaw==null?b.yaw||0:B.yaw;(q||b.yaw==null)&&(b.yaw=fs);let ge=fs-b.yaw;for(;ge>Math.PI;)ge-=2*Math.PI;for(;ge<-Math.PI;)ge+=2*Math.PI;let Ie=1-Math.exp(-ie*(it||b.kickT>=0?18:11)),pt=ge*Ie;b.yaw+=pt;let Rt=b.yaw,Xt=ie>0?pt/ie:0;if(b.lean+=(En(-Xt*de*.035,-.22,.22)-b.lean)*Math.min(1,ie*6),b.root.position.set(_,($e&&b.w.dance<.5||B.header?Re*.95:0)+Math.abs(it)*.45+(B.y||0),I),b.root.rotation.set(ut(4.5,7,de)*.05,Rt,it*1.25+(it?0:b.lean),"YXZ"),b.root.scale.setScalar(Sc*(b.hgt||1)),b.root.updateMatrixWorld(!0),b.kickT>=0&&!it&&!b.mh){let he=b.kickT,Qe=b.style.left,rt=Qe?"_l":"_r",Ut=Qe?"_r":"_l",Wt=he<.3?1:1-(he-.3)/.3,Kt=ut(.14,.28,he),Tt=Nt.wind[0].clone().lerp(Nt.hit[0],Kt),kn=Nt.wind[1].clone().lerp(Nt.hit[1],Kt);Ve(b,"spine_01",ke,-.18*Wt),le(b,"thigh"+rt,"calf"+rt,Tt,Wt),le(b,"calf"+rt,"foot"+rt,kn,Wt),le(b,"thigh"+Ut,"calf"+Ut,Ce(0,-1,.12),Wt*.6),le(b,"upperarm"+Ut,"lowerarm"+Ut,Ce(Qe?-1:1,-.15,.35),Wt*.8),le(b,"upperarm"+rt,"lowerarm"+rt,Ce(Qe?1:-1,-.4,-.3),Wt*.6)}if(it){let he=Math.min(1,Math.abs(it)*1.6);le(b,"upperarm_l","lowerarm_l",Ce(.25,1,.2),he),le(b,"lowerarm_l","hand_l",Ce(.15,1,.25),he),le(b,"upperarm_r","lowerarm_r",Ce(-.25,1,.2),he),le(b,"lowerarm_r","hand_r",Ce(-.15,1,.25),he),le(b,"thigh_l","calf_l",Ce(.15,-1,0),he),le(b,"thigh_r","calf_r",Ce(-.15,-1,0),he),le(b,"calf_l","foot_l",Ce(.15,-1,0),he),le(b,"calf_r","foot_r",Ce(-.15,-1,0),he)}else if($e&&!(b.style.dance&&de<1.5)){let he=Math.sin(d.now/210+s.hash(M)%7),Qe=1;le(b,"upperarm_l","lowerarm_l",Ce(.5,1,.1+he*.1),Qe),le(b,"lowerarm_l","hand_l",Ce(.3,1,.1),Qe),le(b,"upperarm_r","lowerarm_r",Ce(-.5,1,.1-he*.1),Qe),le(b,"lowerarm_r","hand_r",Ce(-.3,1,.1),Qe),Ve(b,"Head",ke,-.25)}else if(Ye||B.hands){let he=B.hands?1:b.style.sad||0;if(he===1){let Qe=B.hands?Math.min(1,B.hands*2):1;le(b,"upperarm_l","lowerarm_l",Ce(.75,.75,.15),Qe),le(b,"lowerarm_l","hand_l",Ce(-.9,.35,-.1),Qe),le(b,"upperarm_r","lowerarm_r",Ce(-.75,.75,.15),Qe),le(b,"lowerarm_r","hand_r",Ce(.9,.35,-.1),Qe),Ve(b,"Head",ke,B.hands?-.15:.3),Ve(b,"spine_03",ke,B.hands?-.08:.1)}else he===2?(le(b,"upperarm_l","lowerarm_l",Ce(.6,-.65,-.45),1),le(b,"lowerarm_l","hand_l",Ce(-.45,-.6,.25),1),le(b,"upperarm_r","lowerarm_r",Ce(-.6,-.65,-.45),1),le(b,"lowerarm_r","hand_r",Ce(.45,-.6,.25),1),Ve(b,"Head",ke,.35),Ve(b,"spine_02",ke,.12)):(Ve(b,"spine_02",ke,.22),Ve(b,"spine_03",ke,.12),Ve(b,"Head",ke,.45))}if(B.yell&&!it&&!$e){let he=Math.sin(d.now/140+s.hash(M)%5),Qe=b.style.left?1:-1,rt=Qe>0?"_l":"_r",Ut=Qe>0?"_r":"_l";le(b,"upperarm"+rt,"lowerarm"+rt,Ce(Qe*.35,.35+he*.2,1),1),le(b,"lowerarm"+rt,"hand"+rt,Ce(Qe*.2,.25+he*.3,1),1),le(b,"upperarm"+Ut,"lowerarm"+Ut,Ce(-Qe*.8,-.35,.35),.8),Ve(b,"Head",ke,-.12)}if(B.throwIn!=null&&B.throwIn!==!1&&B.throwIn!==void 0){let he=B.throwIn>.05?1-B.throwIn:0;for(let[Qe,rt]of[["_l",1],["_r",-1]])le(b,"upperarm"+Qe,"lowerarm"+Qe,Ce(rt*.15,1,-.35+he*1.3),1),le(b,"lowerarm"+Qe,"hand"+Qe,Ce(rt*.05,.6-he*.4,-1+he*2),1);Ve(b,"spine_01",ke,-.25+he*.45)}if(B.wall){for(let[he,Qe]of[["_l",1],["_r",-1]])le(b,"upperarm"+he,"lowerarm"+he,Ce(Qe*.2,-1,.35),1),le(b,"lowerarm"+he,"hand"+he,Ce(-Qe*.7,-.4,.6),1);Ve(b,"Head",ke,-.1)}if(B.slide&&!b.mh){b.root.position.y-=.58,b.root.updateMatrixWorld(!0),Ve(b,"spine_01",ke,-.85);let he=b.style.left?"_l":"_r",Qe=b.style.left?"_r":"_l";le(b,"thigh"+he,"calf"+he,Ce(0,-.12,1),1),le(b,"calf"+he,"foot"+he,Ce(0,-.1,1),1),le(b,"thigh"+Qe,"calf"+Qe,Ce(0,-.35,.9),1),le(b,"calf"+Qe,"foot"+Qe,Ce(0,-1,-.2),1),le(b,"upperarm_l","lowerarm_l",Ce(.7,-.6,-.4),1),le(b,"upperarm_r","lowerarm_r",Ce(-.7,-.6,-.4),1)}if(B.header&&(Ve(b,"spine_02",ke,.18),Ve(b,"Head",ke,.35),le(b,"upperarm_l","lowerarm_l",Ce(.9,.2,.2),1),le(b,"upperarm_r","lowerarm_r",Ce(-.9,.2,.2),1)),B.catch){Ve(b,"spine_01",ke,.25);for(let[he,Qe]of[["_l",1],["_r",-1]])le(b,"upperarm"+he,"lowerarm"+he,Ce(Qe*.25,-.15,1),1),le(b,"lowerarm"+he,"hand"+he,Ce(-Qe*.25,.25,1),1)}for(let he of["_l","_r"]){let Qe=b.bones["thigh"+he],rt=b.bones["calf"+he],Ut=b.bones["foot"+he];if(!Qe||!rt||!Ut)continue;Qe.updateWorldMatrix(!0,!0),Se.setFromMatrixPosition(Qe.matrixWorld),qe.setFromMatrixPosition(rt.matrixWorld),De.setFromMatrixPosition(Ut.matrixWorld);let Wt=qe.clone().sub(Se).normalize(),Kt=De.clone().sub(qe).normalize(),Tt=Math.acos(En(Wt.dot(Kt),-1,1)),kn=new nt().crossVectors(Wt,Kt).dot(new nt(1,0,0).applyQuaternion(b.root.quaternion));kn<0&&Tt>.1?Ve(b,"calf"+he,ke,Tt-.1):Tt>2.6&&Ve(b,"calf"+he,ke,-(Tt-2.6)*Math.sign(kn||1))}{let he=0,Qe=0;if(Be&&ct>=d.n-1&&!it&&!$e&&b.kickT<0){let Ut=Be.x-_,Wt=Be.z-I,Kt=Math.sqrt(Ut*Ut+Wt*Wt);if(Kt>.3&&Kt<45){let Tt=Math.atan2(Ut,Wt)-Rt;for(;Tt>Math.PI;)Tt-=2*Math.PI;for(;Tt<-Math.PI;)Tt+=2*Math.PI;he=En(Tt,-1.1,1.1),Qe=En(Math.atan2(1.7-Be.y,Kt)*.6,-.2,.55)}}let rt=Math.min(1,ie*5);b.look+=(he-b.look)*rt,b.lookP+=(Qe-b.lookP)*rt,Ve(b,"neck_01",We,b.look*.35),Ve(b,"Head",We,b.look*.55),Ve(b,"Head",ke,b.lookP*(Ye?0:1))}{let he=b.ex,Qe=B.fierce||B.wall||B.slide||B.header,rt=B.yell?[.8,0,1,0]:B.hands?[0,0,.55,.9]:Ye?[.2,0,0,1]:$e?b.w.dance>.5?[0,1,.15,0]:[.1,.45,.95,0]:Qe?[1,0,.45,0]:it||b.kickT>=0?[1,0,.35,0]:de>4.5?[.8,0,.1,0]:[.3,.06,0,0],Ut=Math.min(1,ie*4);he.set(he.x+(rt[0]-he.x)*Ut,he.y+(rt[1]-he.y)*Ut,he.z+(rt[2]-he.z)*Ut,he.w+(rt[3]-he.w)*Ut),b.FU.uExpr.value.copy(he)}if(e==="high"&&b.pivots.length&&ie>0){let he=b.sw,Qe=(_-he.px)/ie,rt=(I-he.pz)/ie;he.px=_,he.pz=I;let Ut=Math.cos(b.yaw),Wt=Math.sin(b.yaw),Kt=En(Qe*Wt+rt*Ut,-9,9),Tt=En(Qe*Ut-rt*Wt,-9,9),kn=En(Kt*.07+(Re?-.25:0),-.6,.6),hi=En(-Tt*.06+b.lean*.8,-.5,.5);he.vx+=((kn-he.x)*40-he.vx*7)*ie,he.vz+=((hi-he.z)*40-he.vz*7)*ie,he.x+=he.vx*ie,he.z+=he.vz*ie,q&&(he.x=he.z=he.vx=he.vz=0);for(let Hn of b.pivots)Hn.rotation.x=he.x,Hn.rotation.z=he.z}b.mh&&S.post(b),b.dist=l.position.distanceTo(b.root.position)};let Ht=null,bt=null,Te=null,O=null,Ne=()=>Ht||(Ht=(()=>{let y=re(X(256,128,M=>{M.fillStyle="#f8fafc",M.fillRect(0,0,256,128),M.fillStyle="#0b0f24",[[32,20],[96,20],[160,20],[224,20],[0,64],[64,64],[128,64],[192,64],[256,64],[32,108],[96,108],[160,108],[224,108]].forEach(([_,I])=>{M.beginPath();for(let B=0;B<5;B++){let U=-Math.PI/2+B*1.2566;M.lineTo(_+Math.cos(U)*14,I+Math.sin(U)*12)}M.fill()}),M.strokeStyle="rgba(15,23,42,.35)",M.lineWidth=1.2;for(let _=0;_<256;_+=32)M.beginPath(),M.moveTo(_,0),M.lineTo(_+16,128),M.stroke()})),v=new Ke(new ns(kh,24,16),new Vt({map:y,roughness:.38,envMapIntensity:.8}));return v.castShadow=!0,c.add(v),v})()),Be=null,ct=-9;i.ball=function(y,v,M,_){if(!L)return;let I=Ne();St(),x.add(I),ct=d.n,Be=Be||new nt,Be.set(y,kh+(M||0)*1.6,v),I.position.set(y,kh+(M||0)*1.6,v),I.rotation.set((_||0)*1.3,_||0,0)},i.trophy=function(y,v,M,_,I){if(!bt){let B=new Gn,U=new Vt({color:16106818,metalness:1,roughness:.2,envMapIntensity:1.6}),b=[[0,0],[.32,0],[.32,.08],[.12,.14],[.08,.42],[.14,.5],[.34,.62],[.42,.95],[.4,1.02],[0,1.02]].map(([ie,ve])=>new Je(ie,ve)),q=new Ke(new sc(b,40),U);q.material.side=Cn,B.add(q),[-1,1].forEach(ie=>{let ve=new Ke(new Na(.17,.035,8,20,Math.PI*1.15),U);ve.position.set(ie*.42,.78,0),ve.rotation.z=ie>0?-Math.PI*.55:Math.PI*1.55,B.add(ve)});let z=new Ke(new Ri(.36,.4,.22,24),new Vt({color:724772,roughness:.4}));z.position.y=-.11,B.add(z),B.traverse(ie=>{ie.isMesh&&(ie.castShadow=!0)}),bt=B,c.add(B)}x.add(bt),bt.position.set(y,v*.86,M),bt.rotation.set(0,_||0,0),bt.scale.setScalar(I||1)},i.floor=function(){Te||(Te=new Ke(new Ri(1.15,1.2,.1,48),new Vt({color:1976635,roughness:.55,metalness:.2})),Te.position.y=-.05,Te.receiveShadow=!0,c.add(Te)),x.add(Te)};let st=600;i.particles=function(y,v){O||(O=new _i(new fn(1,1,1),new un({toneMapped:!1}),st),O.frustumCulled=!1,O.setColorAt(0,new Ge),c.add(O));let M=[],_=new dt,I=new ls,B=new zr,U=new nt,b=new nt,q=new Ge;for(let z of y)if(z.vy-=9.8*v*(z.g==null?.25:z.g),z.x+=z.vx*v,z.y+=z.vy*v,z.z+=z.vz*v,z.life-=v,z.rot=(z.rot||0)+v*6,z.life>0&&z.y>0){M.push(z);let ie=M.length-1;if(ie>=st)continue;let ve=z.s||.25;_.compose(b.set(z.x,z.y,z.z),I.setFromEuler(B.set(z.rot*.7,z.rot,0)),U.set(ve,.02+ve*.1,ve*.6)),O.setMatrixAt(ie,_);let j=z.c;q.setRGB(j[0],j[1],j[2],kt),O.setColorAt(ie,q)}return O.count=Math.min(st,M.length),O.instanceMatrix.needsUpdate=!0,O.instanceColor&&(O.instanceColor.needsUpdate=!0),x.add(O),M};function zt(){let y=[],v=[],M=[],_=new Ge,I=(B,U,b,q,z,ie)=>{[B,U,b,B,b,q].forEach(ve=>{y.push(ve[0],ve[1],ve[2]),v.push(z[0],z[1],z[2]),M.push(ie.r,ie.g,ie.b)})};return{box(B,U,b,q,z,ie,ve){_.set(q);let j=B/2,se=U/2,de=b/2,Re=(it,Xe,$e)=>[z+it,ie+Xe,ve+$e];I(Re(-j,-se,de),Re(j,-se,de),Re(j,se,de),Re(-j,se,de),[0,0,1],_),I(Re(j,-se,-de),Re(-j,-se,-de),Re(-j,se,-de),Re(j,se,-de),[0,0,-1],_),I(Re(j,-se,de),Re(j,-se,-de),Re(j,se,-de),Re(j,se,de),[1,0,0],_),I(Re(-j,-se,-de),Re(-j,-se,de),Re(-j,se,de),Re(-j,se,-de),[-1,0,0],_),I(Re(-j,se,de),Re(j,se,de),Re(j,se,-de),Re(-j,se,-de),[0,1,0],_),I(Re(-j,-se,-de),Re(j,-se,-de),Re(j,-se,de),Re(-j,-se,de),[0,-1,0],_)},geo(){let B=new sn;return B.setAttribute("position",new Lt(y,3)),B.setAttribute("normal",new Lt(v,3)),B.setAttribute("color",new Lt(M,3)),B}}}let Ft=y=>{let v=y>>>0||1;return()=>(v^=v<<13,v>>>=0,v^=v>>>17,v^=v<<5,v>>>=0,v/4294967296)},mn=null,rn=null,It=null,Nn=()=>mn||(mn=(()=>{let v=re(X(1920,1344,M=>{for(let U=-1;U<16;U++)M.fillStyle=U%2?"#2f8a3d":"#287d36",M.fillRect((7.5+U*7.5)*16,0,120,1344);let _=Ft(7);for(let U=0;U<26e3;U++){let b=_();M.fillStyle=b<.5?"rgba(0,0,0,.06)":"rgba(255,255,255,.05)",M.fillRect(_()*1920,_()*1344,2+_()*3,1+_()*2)}let I=U=>(U+60)*16,B=U=>(U+42)*16;M.strokeStyle="rgba(255,255,255,.92)",M.lineWidth=2.6,M.strokeRect(I(-52.5),B(-34),1680,1088),M.beginPath(),M.moveTo(I(0),B(-34)),M.lineTo(I(0),B(34)),M.stroke(),M.beginPath(),M.arc(I(0),B(0),146.4,0,7),M.stroke(),[-1,1].forEach(U=>{let b=U*52.5;M.strokeRect(Math.min(I(b),I(b-U*16.5)),B(-20.16),264,645.12),M.strokeRect(Math.min(I(b),I(b-U*5.5)),B(-9.16),88,293.12),M.beginPath(),M.arc(I(b-U*11),B(0),146.4,U>0?Math.PI-.93:-.93,U>0?Math.PI+.93:.93),M.stroke(),M.fillStyle="#fff",M.beginPath(),M.arc(I(b-U*11),B(0),3,0,7),M.fill(),[-34,34].forEach(q=>{M.beginPath(),M.arc(I(b),B(q),16,0,7),M.stroke()})}),M.fillStyle="#fff",M.beginPath(),M.arc(I(0),B(0),3.2,0,7),M.fill(),M.setLineDash([10,8]),M.lineWidth=2,M.strokeStyle="rgba(255,255,255,.7)",[-1,1].forEach(U=>{M.strokeRect(Math.min(I(U*4.5),I(U*14.5)),B(-37.6),160,41.6)}),M.setLineDash([])}));return v.anisotropy=t?2:8,v})()),$n=(y,v)=>re(X(1024,64,M=>{let _=M.createLinearGradient(0,0,1024,0);_.addColorStop(0,"#22d3ee"),_.addColorStop(.5,"#a855f7"),_.addColorStop(1,"#ff2d95"),M.fillStyle="#070b18",M.fillRect(0,0,1024,64),M.fillStyle=_,M.fillRect(0,0,1024,5),M.fillRect(0,59,1024,5),M.font="900 36px Arial, Helvetica, sans-serif",M.textBaseline="middle",["SINLESS GG","11 WONDERS","SINLESS GG","11 WONDERS"].forEach((I,B)=>{M.fillStyle=[y,"#ffffff",v,"#22d3ee"][B],M.fillText(I,20+B*256,34)})}),!0,!0),Wa=()=>re(X(64,64,y=>{y.clearRect(0,0,64,64),y.strokeStyle="rgba(255,255,255,.9)",y.lineWidth=3,y.strokeRect(0,0,64,64)}),!0,!0),Cc=()=>re(X(64,64,y=>{let v=y.createRadialGradient(32,32,0,32,32,32);v.addColorStop(0,"rgba(255,250,230,1)"),v.addColorStop(.25,"rgba(255,240,200,.55)"),v.addColorStop(1,"rgba(255,240,200,0)"),y.fillStyle=v,y.fillRect(0,0,64,64)})),rr=()=>rn||(rn=(()=>{let y=(M,_,I)=>({value:new Ge(M,_,I)}),v=new Ke(new ns(460,32,16),new jn({side:Pn,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new nt(.012,.016,.05)},uMid:{value:new nt(.06,.03,.16)},uHor:{value:new nt(.24,.1,.32)},uStars:{value:1},uCloud:{value:0},uSun:{value:new nt(0,1,0)},uSunC:y(0,0,0),uT:{value:0},uFlash:{value:0}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform vec3 uTop, uMid, uHor, uSun, uSunC; uniform float uStars, uCloud, uT, uFlash; varying vec3 vD; float h(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(mix(h(i), h(i + vec3(1,0,0)), f.x), mix(h(i + vec3(0,1,0)), h(i + vec3(1,1,0)), f.x), f.y), mix(mix(h(i + vec3(0,0,1)), h(i + vec3(1,0,1)), f.x), mix(h(i + vec3(0,1,1)), h(i + vec3(1,1,1)), f.x), f.y), f.z); }void main(){ float y = vD.y; vec3 c = mix(uHor, uMid, smoothstep(0.0, 0.18, y)); c = mix(c, uTop, smoothstep(0.18, 0.7, y)); vec3 q = floor(vD * 260.0); float s = step(0.9975, h(q)) * smoothstep(0.08, 0.4, y); c += vec3(s * 0.9 * uStars);float sd = max(dot(vD, normalize(uSun)), 0.0); c += uSunC * (pow(sd, 380.0) * 3.0 + pow(sd, 10.0) * 0.3) * (1.0 - uCloud * 0.85);if (uCloud > 0.01) { vec3 p = vD * 3.2 + vec3(uT * 0.012, 0.0, uT * 0.007); float cl = n3(p) * 0.6 + n3(p * 2.1) * 0.3 + n3(p * 4.3) * 0.1; float cov = smoothstep(1.0 - uCloud, 1.08 - uCloud * 0.5, cl) * smoothstep(-0.02, 0.16, y);vec3 cc = mix(uHor, vec3(dot(uMid, vec3(0.333))) * 1.25 + uSunC * 0.06, 0.6); c = mix(c, cc, cov * 0.9); } c += vec3(uFlash); gl_FragColor = vec4(c, 1.0); }"}));return v.frustumCulled=!1,v.renderOrder=-1,v})()),hs=new Map;i.world=function(y,v,M){y=En(Math.floor(y)||1,1,5);let _=y+v+M,I=hs.get(_);if(I)return I;let B=new Gn,U=zt(),b=Ft(s.hash("std:"+_)>>>0),q=[],z=[];B.add(rr()),It||(It=new Ke(new mi(320,260),new Hi({color:793619})),It.rotation.x=-Math.PI/2,It.position.y=-.04,It.receiveShadow=!0),B.add(It);let ie=new Vt({map:Nn(),roughness:.94,metalness:0,envMapIntensity:.18}),ve=new Ke(new mi(120,84),ie);ve.rotation.x=-Math.PI/2,ve.receiveShadow=!0,B.add(ve);let j=[1,1,2,2,3][y-1],se=y>=2,de=y>=4,Re=7,it=["#1e293b","#2a3650"],Xe=(Fe,je,tt,Qt,qt)=>{for(let hn=0;hn<j;hn++){for(let lr=0;lr<Re;lr++){let la=tt+hn*(Re*.95+2.5)+lr*.95,Ja=.6+hn*(Re*.55+2.2)+lr*.55,ja=Fe+la*.4;je==="x"?U.box(ja,.55,.95,it[lr%2],0,Ja-.27,qt*la):U.box(.95,.55,ja,it[lr%2],Qt*la,Ja-.27,0);for(let Za=-ja/2+.5;Za<ja/2-.4;Za+=.72)q.push(je==="x"?[Za,Ja+.05,qt*la]:[Qt*la,Ja+.05,Za])}let fi=tt+hn*(Re*.95+2.5),ds=hn*(Re*.55+2.2),Xa=Fe+fi*.4,cr=ds+.6;je==="x"?U.box(Xa,cr,.4,"#141b2d",0,cr/2,qt*(fi-.65)):U.box(.4,cr,Xa,"#141b2d",Qt*(fi-.65),cr/2,0);let Fs=fi+Re*.95+.4,Si=ds+.6+Re*.55+(hn<j-1?2.2:1.6),Ya=Fe+Fs*.4;hn===j-1?je==="x"?U.box(Ya,Si,.8,"#10172a",0,Si/2,qt*Fs):U.box(.8,Si,Ya,"#10172a",Qt*Fs,Si/2,0):je==="x"?U.box(Ya,.5,2.5,"#0f172a",0,Si-1.9,qt*(Fs+.6)):U.box(2.5,.5,Ya,"#0f172a",Qt*(Fs+.6),Si-1.9,0)}};Xe(112,"x",42,0,1),Xe(112,"x",42,0,-1),se&&(Xe(80,"z",61,1,0),Xe(80,"z",61,-1,0));let $e=j*(Re*.55+2.2)+1.5,Ye=42+j*(Re*.95+2.5);de&&[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([Fe,je])=>{for(let tt=0;tt<j*3;tt++)U.box(9,$e*(tt+1)/(j*3),9,"#18213a",Fe*(60+tt*2.4),$e*(tt+1)/(j*6),je*(42+tt*2.4))});let Ot=[],$t=(Fe,je,tt)=>{let Qt=zt();Fe(Qt);let qt=new Ke(Qt.geo(),new Hi({vertexColors:!0}));qt.userData.side=je,qt.userData.axis=tt,B.add(qt),Ot.push(qt)};y>=3&&[-1,1].forEach(Fe=>$t(je=>{let tt=Ye-40+2,Qt=$e+3.2;je.box(140,.5,tt,"#0b1122",0,Qt,Fe*(40+tt/2)),je.box(140,.25,.5,Fe>0?"#22d3ee":"#ff2d95",0,Qt-.35,Fe*41);for(let qt=-3;qt<=3;qt++)je.box(.6,Qt,.6,"#334155",qt*20,Qt/2,Fe*(Ye+1.2))},Fe,"z")),y>=5&&[-1,1].forEach(Fe=>$t(je=>{let tt=Ye-58+2,Qt=$e+3.2;je.box(tt,.5,100,"#0b1122",Fe*(58+tt/2),Qt,0)},Fe,"x"));let cn=y>=3?34:22;[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([Fe,je])=>{y===1&&je<0||(U.box(.8,cn,.8,"#475569",Fe*64,cn/2,je*(Ye+2)),z.push([Fe*64,cn+1.5,je*(Ye+2)]))});let ln=new Ke(U.geo(),new Hi({vertexColors:!0}));ln.receiveShadow=!1,B.add(ln),ln.userData.st=1;let li=new un({color:16776168,toneMapped:!1}),fs=new La({map:Cc(),blending:Ro,depthWrite:!1,fog:!1,transparent:!0}),ge=[];for(let Fe of z){let je=new Ke(new fn(5,3,.6),li);je.position.set(Fe[0],Fe[1],Fe[2]),je.lookAt(0,0,0),B.add(je);let tt=new ec(fs.clone());tt.position.set(Fe[0],Fe[1],Fe[2]),tt.scale.set(26,26,1),B.add(tt),ge.push(tt)}if(y>=4){let Fe=new Ke(new fn(18,8,.5),new un({map:$n(v,M),toneMapped:!1}));Fe.position.set(0,$e+6,-Ye-1),B.add(Fe)}let Ie=[.35,.5,.65,.8,.95][y-1],pt=Math.min(q.length*Ie,n.crowd),Rt=pt/Math.max(1,q.length),Xt=Fe=>se?Fe[0]>58:Fe[2]<-40&&Fe[0]>24,he=q.filter(Fe=>Fe[2]<-40&&!Xt(Fe)).length,Qe=Math.max(Rt,Math.min(.85,pt*.55/Math.max(1,he))),rt=q.filter(Fe=>b()<(Fe[2]<-40&&!Xt(Fe)?Qe:Rt)),Ut=qa(),Wt=Ut.userData.u,Kt=Math.max(1,rt.length),Tt=new _i(on(),Ut,Kt),kn=new dt,hi=new Ge,Hn=["#facc15","#22d3ee","#a855f7","#ff2d95","#0f172a","#f97316","#e2e8f0"],Ps=new Float32Array(Kt),zn=new Float32Array(Kt),ui=new Float32Array(Kt*2),en=new Float32Array(Kt*3),Yt=1e9,gn=-1e9,_t=1e9,mt=-1e9;rt.forEach(Fe=>{Fe[2]<-40&&!Xt(Fe)&&(Yt=Math.min(Yt,Fe[0]),gn=Math.max(gn,Fe[0]),_t=Math.min(_t,Fe[1]),mt=Math.max(mt,Fe[1]))}),rt.forEach((Fe,je)=>{kn.makeRotationY(Fe[2]>40?Math.PI:Fe[2]<-40?0:Fe[0]>0?-Math.PI/2:Math.PI/2),kn.setPosition(Fe[0],Fe[1],Fe[2]),Tt.setMatrixAt(je,kn);let tt=Xt(Fe),Qt=b();hi.set(tt?Qt<.68?M:Qt<.82?"#ffffff":Hn[Math.floor(b()*7)]:Qt<.5?v:Qt<.64?"#ffffff":Qt<.76?"#1e293b":Hn[Math.floor(b()*7)]),Tt.setColorAt(je,hi),Ps[je]=b(),zn[je]=tt?1:0;let qt=new Ge(tt?M:b()<.6?v:"#ffffff");en.set([qt.r,qt.g,qt.b],je*3),Fe[2]<-40&&!tt&&gn>Yt?ui.set([(Fe[0]-Yt)/(gn-Yt),(Fe[1]-_t)/Math.max(.1,mt-_t)],je*2):ui.set([-1,-1],je*2)});let ht=Tt.geometry=Tt.geometry.clone();ht.setAttribute("aSeed",new gi(Ps,1)),ht.setAttribute("aSide",new gi(zn,1)),ht.setAttribute("aUV",new gi(ui,2)),ht.setAttribute("aCol2",new gi(en,3)),Tt.count=rt.length,Tt.frustumCulled=!1,B.add(Tt);let _n=Dn(Tt,Wt,v,M);_n&&(B.add(_n),B.userData.fanRT=_n.userData.rt);let ri=Fd(B),Mn=$n(v,M);Mn.repeat.set(6,1);let ai=new un({map:Mn,toneMapped:!1});[[112,.9,.2,0,38.5],[112,.9,.2,0,-40.4]].forEach(([Fe,je,tt,Qt,qt])=>{let hn=new Ke(new fn(Fe,je,tt),ai);hn.position.set(Qt,je/2,qt),B.add(hn)});let Mi=$n(M,v);Mi.repeat.set(4,1);let kd=new un({map:Mi,toneMapped:!1});[-57,57].forEach(Fe=>[-1,1].forEach(je=>{let tt=new Ke(new fn(.2,.9,30),kd);tt.position.set(Fe,.45,je*19),B.add(tt)}));let Kh=[],qh=[],Xh=new Vt({color:16317180,roughness:.35,envMapIntensity:.6}),Qd=Wa(),Gd=new un({map:Qd,transparent:!0,opacity:.55,side:Cn,depthWrite:!1,alphaTest:.05}),Dc=(Fe,je,tt)=>{let Qt=new mi(Fe,je),qt=Qt.attributes.uv;for(let hn=0;hn<qt.count;hn++)qt.setXY(hn,qt.getX(hn)*Fe/.14,qt.getY(hn)*je/.14);return new Ke(Qt,Gd)};if([-1,1].forEach(Fe=>{let je=Fe*52.5,tt=(hn,fi,ds,Xa,cr,Fs)=>{let Si=new Ke(new Ri(.06,.06,hn,10),Xh);Si.position.set(fi,ds,Xa),Si.rotation.set(cr||0,0,Fs||0),Si.castShadow=!0,B.add(Si)};tt(2.44,je,1.22,3.66),tt(2.44,je,1.22,-3.66),tt(7.44,je,2.44,0,Math.PI/2),tt(2.44,je+Fe*2.2,1.22,3.66),tt(2.44,je+Fe*2.2,1.22,-3.66),tt(7.44,je+Fe*2.2,2.44,0,Math.PI/2),tt(2.2,je+Fe*1.1,2.44,3.66,0,Math.PI/2),tt(2.2,je+Fe*1.1,2.44,-3.66,0,Math.PI/2);let Qt=Dc(7.32,2.44);Qt.rotation.y=Math.PI/2,Qt.position.set(je+Fe*2.2,1.22,0),B.add(Qt),Kh.push([Qt,je+Fe*2.2,Fe]);let qt=Dc(2.2,7.32);qt.rotation.x=-Math.PI/2,qt.position.set(je+Fe*1.1,2.44,0),B.add(qt),[-1,1].forEach(hn=>{let fi=Dc(2.2,2.44);fi.position.set(je+Fe*1.1,1.22,hn*3.66),B.add(fi)}),[-34,34].forEach(hn=>{let fi=new Ke(new Ri(.03,.03,1.5,6),Xh);fi.position.set(je,.75,hn),B.add(fi);let ds=new Ke(new mi(.4,.28).translate(.2,0,0),new un({color:16723349,side:Cn}));ds.position.set(je,1.36,hn),B.add(ds),qh.push(ds)})}),I={_b3:1,grp:B,crowd:Tt,cu:Wt,lv:y,top:$e,far:Ye,key:_,roofs:Ot,lights:z,glows:ge,pitchM:ie,nets:Kh,flags:qh,dug:ri,stM:ln},B.visible=!1,c.add(B),hs.set(_,I),hs.size>2){let[Fe,je]=hs.entries().next().value;hs.delete(Fe),c.remove(je.grp),je.grp.userData.fanRT&&je.grp.userData.fanRT.dispose(),je.grp.traverse(tt=>{tt===rn||tt===It||tt===ve||tt===je.crowd||(tt.geometry&&tt!==rn&&tt!==It&&tt.geometry.dispose(),tt.material&&tt.material.map&&tt.material.map!==mn&&tt.material.map.dispose())})}return I},i.drawWorld=function(y,v){if(!y||!y._b3)return;x.add(y.grp);for(let B of y.roofs){let U=B.userData.axis==="z"?l.position.z:l.position.x;B.visible=!(U*B.userData.side>30&&l.position.y>6)}rn&&rn.parent!==y.grp&&y.grp.add(rn),It&&It.parent!==y.grp&&y.grp.add(It),i._world=y,ei(y,v);let M=In,_=d.now/1e3,I=we.wind;if(y.flags.forEach((B,U)=>{B.rotation.y=(M&&M.wx&&M.wx.dx<0?Math.PI:0)+Math.sin(_*(4+I*6)+U)*(.15+I*.5),B.scale.y=1-I*.25*Math.abs(Math.sin(_*9+U))}),y.nets.forEach(([B,U,b],q)=>{B.position.x=U+b*I*.12*(.6+.4*Math.sin(_*2.4+q))}),M&&M.mg&&Pd(y),M&&M.smoke&&e!=="low"){let B=Tc(),U=(Date.now()-M.smoke.t)/1e3;U<10&&(x.add(B),B.material.uniforms.uT.value=U,B.material.uniforms.uEnd.value=M.smoke.end)}M&&M.plinth&&(i._pl||(i._pl=new Ke(new Ri(.3,.42,1,24),new Vt({color:724772,roughness:.3,metalness:.5})),i._pl.position.set(0,.5,0),i._pl.castShadow=!0,c.add(i._pl)),x.add(i._pl),i.ball(0,0,1/1.6,_*.6))};let In=null,we={up:0,gold:0,ov:0,wet:0,snow:0,fog:0,wind:0,flash:0,nf:6,init:0,dir:new nt(.35,1,.45).normalize(),exp:1.08,hemi:.75,fogK:1,glow:1,t:0},Ka={clear:0,cloudy:.55,rain:.78,storm:.95,fog:.72,snow:.7},wc=()=>{try{return s.atmo?s.atmo():null}catch{return null}},Vi=(y,v,M)=>[y[0]+(v[0]-y[0])*M,y[1]+(v[1]-y[1])*M,y[2]+(v[2]-y[2])*M],Ic={night:[[.012,.016,.05],[.06,.03,.16],[.24,.1,.32]],day:[[.17,.4,.8],[.42,.63,.9],[.8,.87,.95]],gold:[[.2,.25,.52],[.8,.46,.42],[1,.6,.3]],ovD:[[.46,.5,.55],[.56,.6,.64],[.68,.71,.74]],ovN:[[.025,.028,.04],[.05,.052,.07],[.11,.11,.14]]};function R(y,v){let M=In,_=M&&M.tod!=null?(M.tod%24+24)%24:21,I=M&&M.wx,B=I?I.k:"clear",U=ut(5.8,7.4,_)*(1-ut(18,19.6,_)),b=U*Math.max(ut(15.6,17.8,_),1-ut(6.8,8.6,_)),q={up:U,gold:b,ov:Ka[B]||0,wet:B==="rain"?1:B==="storm"?2:0,snow:B==="snow"?1:0,fog:B==="fog"?1:0,wind:I?En((I.w-3)/9,0,1):0},z=M&&M.key||"";z!==we.key&&(we.key=z,we.init=0);let ie=we.init?Math.min(1,y*1.2):1;we.init=1;for(let Ot in q)we[Ot]+=(q[Ot]-we[Ot])*ie;we.t+=y;let ve=En((_-6)/13,0,1)*Math.PI,j=new nt(-Math.cos(ve)*.9,.14+.95*Math.max(0,Math.sin(ve)),.55).normalize(),se=new nt(.35,1,.45).normalize();we.dir.copy(se).lerp(j,we.up).normalize();let de=Vi(Vi([1,.96,.9],[1,.97,.92],we.up),[1,.66,.4],we.gold);u.color.setRGB(de[0],de[1],de[2]),u.intensity=(2.45+.6*we.up-.3*we.gold)*(1-.55*we.ov*we.up)*(1-.15*we.ov*(1-we.up)),B==="storm"&&v&&(we.nf-=y,we.nf<=0&&(we.flash=1,we.nf=6+Math.random()*10)),we.flash=Math.max(0,we.flash-y*5),we.hemi=.75+.3*we.up+.25*we.ov*we.up+we.flash*2.2,h.color.setRGB(.78+.1*we.up,.85+.05*we.up,1),h.groundColor.setRGB(.13,.23+.06*we.up,.14),we.exp=1.08-.06*we.up+.05*we.ov*we.up,we.fogK=1+3.6*we.fog+.7*Math.min(1,we.wet)+.5*Math.max(0,we.wet-1)+.9*we.snow,we.glow=En(1-we.up+we.gold*.7+we.ov*.45,0,1);let Re=Ic,it=[0,1,2].map(Ot=>Vi(Vi(Re.night[Ot],Re.day[Ot],we.up),Re.gold[Ot],we.gold*(1-we.ov*.7))),Xe=[0,1,2].map(Ot=>Vi(Re.ovN[Ot],Re.ovD[Ot],we.up)),$e=[0,1,2].map(Ot=>Vi(it[Ot],Xe[Ot],we.ov*.85));we.snow>.01&&($e[2]=Vi($e[2],[.85,.87,.9],we.snow*we.up*.4));let Ye=rn&&rn.material.uniforms;if(Ye&&(Ye.uTop.value.fromArray($e[0]),Ye.uMid.value.fromArray($e[1]),Ye.uHor.value.fromArray($e[2]),Ye.uStars.value=(1-we.up)*(1-we.ov),Ye.uCloud.value=En(we.ov+.12*we.up*(1-we.ov),0,1),Ye.uSun.value.copy(j),Ye.uSunC.value.setRGB(de[0]*we.up,de[1]*we.up,de[2]*we.up),Ye.uT.value=we.t,Ye.uFlash.value=we.flash*.35),c.fog.color.setRGB($e[2][0]*.62,$e[2][1]*.62,$e[2][2]*.62),i._world){let Ot=i._world;for(let $t of Ot.glows||[])$t.material.opacity=we.glow;if(Ot.pitchM){let $t=Math.min(1,we.wet),cn=Ot.pitchM;cn.roughness=.94-.55*$t-.1*we.snow,cn.envMapIntensity=.18+.6*$t;let ln=we.snow;cn.color.setRGB(1-.18*$t+.3*ln,1-.18*$t+.3*ln,1-.16*$t+.38*ln),cn.emissive.setRGB(.42*ln,.45*ln,.5*ln)}if(Ot.stM){let $t=1+1.1*we.up*(1-.45*we.ov);Ot.stM.material.color.setRGB($t,$t,$t*1.04)}}}let K=null,$=null,ne=null,te={high:[5200,2600,700],mid:[3e3,1600,420],low:[1100,700,160]}[e]||[3e3,1600,420];function ze(){if(K)return K;let y=te[0],v=new Float32Array(y*6),M=new Float32Array(y*2),_=Ft(991);for(let U=0;U<y;U++){let b=_()*46-23,q=_()*26,z=_()*46-23;v.set([b,q,z,b,q,z],U*6),M[U*2]=0,M[U*2+1]=1}let I=new sn;I.setAttribute("position",new Dt(v,3)),I.setAttribute("aEnd",new Dt(M,1));let B=new jn({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new nt},uW:{value:new nt},uT:{value:0},uA:{value:.3},uL:{value:.7}},vertexShader:"attribute float aEnd; uniform vec3 uC, uW; uniform float uT, uL; void main(){ vec3 p = position; float sp = 12.0 + fract(p.x * 7.13 + p.z * 3.1) * 5.0; p.y = mod(p.y - uT * sp, 26.0); p.x = mod(p.x + uW.x * uT + 23.0, 46.0) - 23.0; p.z = mod(p.z + uW.z * uT + 23.0, 46.0) - 23.0; vec3 w = vec3(p.x + uC.x, p.y, p.z + uC.z); w -= normalize(vec3(-uW.x, sp, -uW.z)) * uL * aEnd; gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0); }",fragmentShader:"uniform float uA; void main(){ gl_FragColor = vec4(0.78, 0.83, 0.9, uA); }"});return K=new Yr(I,B),K.frustumCulled=!1,K.renderOrder=5,c.add(K),K}function Ze(){if($)return $;let y=te[1],v=new Float32Array(y*3),M=Ft(773);for(let B=0;B<y;B++)v.set([M()*46-23,M()*26,M()*46-23],B*3);let _=new sn;_.setAttribute("position",new Dt(v,3));let I=new jn({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new nt},uW:{value:new nt},uT:{value:0},uS:{value:1}},vertexShader:"uniform vec3 uC, uW; uniform float uT, uS; varying float vA; void main(){ vec3 p = position; float f = fract(p.x * 3.7 + p.z * 1.3); p.y = mod(p.y - uT * (0.9 + f * 0.7), 26.0); p.x = mod(p.x + uW.x * uT * 0.6 + sin(uT * 1.1 + f * 30.0) * 0.7 + 23.0, 46.0) - 23.0; p.z = mod(p.z + uW.z * uT * 0.6 + cos(uT * 0.9 + f * 20.0) * 0.6 + 23.0, 46.0) - 23.0; vec4 mv = viewMatrix * vec4(p.x + uC.x, p.y, p.z + uC.z, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = min(9.0, uS * (2.0 + f * 2.5) * 26.0 / max(1.0, -mv.z)); vA = 0.9; }",fragmentShader:"varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.15, length(d)); gl_FragColor = vec4(1.0, 1.0, 1.0, a * vA); }"});return $=new Ss(_,I),$.frustumCulled=!1,$.renderOrder=5,c.add($),$}function lt(){if(ne)return ne;let y=te[2],v=new Float32Array(y*3),M=Ft(551);for(let B=0;B<y;B++)v.set([M()*40-20,.03,M()*40-20],B*3);let _=new sn;_.setAttribute("position",new Dt(v,3));let I=new jn({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new nt},uT:{value:0},uA:{value:.6}},vertexShader:"uniform vec3 uC; uniform float uT; varying float vL; void main(){ vec3 p = position; float f = fract(p.x * 5.1 + p.z * 2.3); float ph = fract(uT * 1.6 + f); vL = ph; vec4 mv = viewMatrix * vec4(p.x + uC.x, 0.03, p.z + uC.z, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = (1.5 + ph * 7.0) * 30.0 / max(1.0, -mv.z); }",fragmentShader:"uniform float uA; varying float vL; void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d); float a = smoothstep(0.5, 0.38, r) * smoothstep(0.2, 0.36, r) * (1.0 - vL) * step(vL, 0.35) * 2.8; gl_FragColor = vec4(0.85, 0.9, 0.95, a * uA); }"});return ne=new Ss(_,I),ne.frustumCulled=!1,ne.renderOrder=5,c.add(ne),ne}function At(y){if(!y)return;let v=In&&In.wx;if(!v)return;let M=new nt;l.getWorldDirection(M),M.y=0,M.lengthSq()<1e-4&&M.set(0,0,-1),M.normalize();let _=l.position.x+M.x*14,I=l.position.z+M.z*14,B=new nt((v.dx||0)*(v.w||0)*.55,0,(v.dy||0)*(v.w||0)*.55);if(we.wet>.05){let U=ze(),b=U.material.uniforms;x.add(U),b.uC.value.set(_,0,I),b.uW.value.copy(B),b.uT.value=we.t,b.uA.value=.18+.16*Math.min(2,we.wet),b.uL.value=.55+.25*Math.min(2,we.wet);let q=lt(),z=q.material.uniforms;x.add(q),z.uC.value.set(_,0,I),z.uT.value=we.t,z.uA.value=.35*Math.min(2,we.wet)}if(we.snow>.05){let U=Ze(),b=U.material.uniforms;x.add(U),b.uC.value.set(_,0,I),b.uW.value.copy(B),b.uT.value=we.t,b.uS.value=1}}let ft=null,Et=30*4,xt=()=>re(X(64,64,y=>{let v=y.createRadialGradient(32,32,0,32,32,32);v.addColorStop(0,"rgba(0,0,0,0.9)"),v.addColorStop(1,"rgba(0,0,0,0)"),y.fillStyle=v,y.fillRect(0,0,64,64)}));function dn(y){if(!y||e==="low"||we.glow<.35||!i._world||!i._world.lights)return;if(!ft){let b=new un({map:xt(),transparent:!0,depthWrite:!1,opacity:.2,polygonOffset:!0,polygonOffsetFactor:-2});ft=new _i(new mi(1,1).rotateX(-Math.PI/2),b,Et),ft.frustumCulled=!1,c.add(ft)}let v=i._world.lights,M=new dt,_=new ls,I=new nt,B=new nt,U=0;for(let b of V){if(!x.has(b.root)||U+v.length>Et)continue;let q=b.root.position.x,z=b.root.position.z;for(let ie of v){let ve=q-ie[0],j=z-ie[2],se=Math.sqrt(ve*ve+j*j)||1;ve/=se,j/=se;let de=En(55/se,.9,2.6);M.compose(B.set(q+ve*de*.55,.02,z+j*de*.55),_.setFromAxisAngle(We,Math.atan2(ve,j)),I.set(.55,1,de)),ft.setMatrixAt(U++,M)}}ft.count=U,ft.instanceMatrix.needsUpdate=!0,ft.material.opacity=.2*we.glow,x.add(ft)}let On=new Map,xn={lg:[["#22d3ee","#a855f7"],["#ff2d95","#22d3ee"],["#a855f7","#facc15"],["#14b8a6","#ff2d95"]],oc:[["#facc15","#ff2d95"],["#f97316","#a855f7"],["#22d3ee","#facc15"],["#ff2d95","#14b8a6"]],cl:[["#0b1f4d","#c0c0c0"],["#1e1b4b","#facc15"],["#0f172a","#22d3ee"],["#312e81","#e2e8f0"]],fr:[["#0b0f24","#0b0f24"],["#0b0f24","#22d3ee"],["#0b0f24","#ff2d95"],["#0b0f24","#a855f7"]],final:[["#d4af37","#0b0f24"],["#d4af37","#ffffff"],["#d4af37","#a855f7"],["#d4af37","#22d3ee"]]};function yi(y,v,M){let _=y+v+(M?"s":"");if(On.has(_))return On.get(_);let I=(xn[y]||xn.fr)[v%4],B=M?"#f97316":y==="cl"?I[0]:y==="final"?"#d4af37":"#f8fafc",U=re(X(512,256,b=>{if(b.fillStyle=B,b.fillRect(0,0,512,256),y==="fr"||M)b.fillStyle=M?"#1e1b4b":I[0],[[64,40],[192,40],[320,40],[448,40],[0,128],[128,128],[256,128],[384,128],[512,128],[64,216],[192,216],[320,216],[448,216]].forEach(([q,z])=>{b.beginPath();for(let ie=0;ie<5;ie++){let ve=-Math.PI/2+ie*1.2566;b.lineTo(q+Math.cos(ve)*28,z+Math.sin(ve)*24)}b.fill()}),I[1]!==I[0]&&!M&&(b.fillStyle=I[1],b.fillRect(0,122,512,12));else if(y==="cl"){b.fillStyle=I[1];for(let q=0;q<9;q++){let z=q%3*170+85+Math.floor(q/3)%2*40,ie=Math.floor(q/3)*85+42;b.beginPath();for(let ve=0;ve<10;ve++){let j=ve%2?12:30,se=-Math.PI/2+ve*Math.PI/5;b.lineTo(z+Math.cos(se)*j,ie+Math.sin(se)*j)}b.fill()}}else{let q=b.createLinearGradient(0,0,512,0);q.addColorStop(0,I[0]),q.addColorStop(1,I[1]),b.fillStyle=q;for(let z=0;z<6;z++){b.beginPath();let ie=z*86+v%2*40;b.moveTo(ie,0),b.quadraticCurveTo(ie+70,128,ie+10,256),b.lineTo(ie+34,256),b.quadraticCurveTo(ie+100,128,ie+26,0),b.fill()}if(y==="final"){b.strokeStyle=I[1],b.lineWidth=4;for(let z=0;z<512;z+=64)b.beginPath(),b.moveTo(z,0),b.lineTo(z+32,256),b.stroke()}}b.strokeStyle="rgba(15,23,42,.35)",b.lineWidth=2;for(let q=0;q<512;q+=64)b.beginPath(),b.moveTo(q,0),b.lineTo(q+32,256),b.stroke()}));return On.set(_,U),U}let jt="";function St(){if(!Ht)return;let y=In&&In.ball,v=y?y.kind:"fr",M=y&&y.d||0,_=!!(In&&In.wx&&In.wx.k==="snow"),I=v+M+_;I!==jt&&(jt=I,Ht.material.map=yi(v,M,_),Ht.material.metalness=v==="final"&&!_?.55:0,Ht.material.roughness=v==="final"&&!_?.25:.38,Ht.material.needsUpdate=!0)}let ar=null,on=()=>ar||(ar=(()=>{let y=[],v=(M,_)=>{let I=(M.toNonIndexed,M),B=I.attributes.position.count;I.setAttribute("aPart",new Dt(new Float32Array(B).fill(_),1)),I.deleteAttribute("uv"),y.push(I)};return v(new fn(.34,.5,.26).translate(0,.25,.04),0),v(new fn(.42,.52,.25).translate(0,.76,0),1),v(new ns(.12,6,4).translate(0,1.16,.01),2),v(new fn(.11,.48,.12).translate(-.27,.74,0),3),v(new fn(.11,.48,.12).translate(.27,.74,0),4),v(new fn(.62,.17,.03).translate(0,1.5,.05),5),_c(y)})()),Wi=`
    float sd = aSide; float st = mix(uSt.x, uSt.y, sd), ar = mix(uAr.x, uAr.y, sd), jp = mix(uJp.x, uJp.y, sd), hd = mix(uHd.x, uHd.y, sd), sc = mix(uSc.x, uSc.y, sd);
    float me = fract(aSeed * 13.7); st = clamp(st + step(0.91, me) * 0.7 - step(me, 0.06) * st * 0.6, 0.0, 1.0);
    float ang = atan(instanceMatrix[3].z, instanceMatrix[3].x), wv = uWave.x * smoothstep(0.6, 0.0, abs(mod(ang - uWave.y + 3.14159, 6.28318) - 3.14159));
    st = max(st, wv); ar = max(ar, wv);
    float tifo = uTifo * step(0.0, aUV.x); bool holder = fract(aSeed * 7.31) < 0.3; float hold = max(tifo, holder ? sc : 0.0);
    if (tifo > 0.5) { st = 1.0; ar = 1.0; jp = 0.0; } if (hold > 0.5) ar = max(ar, 0.95);
    float sit = 1.0 - st, drop = sit * 0.3;
    if (aPart < 0.5) { transformed.y *= mix(1.0, 0.42, sit); transformed.z += sit * 0.2 * transformed.y; } else transformed.y -= drop;
    if (aPart > 2.5 && aPart < 4.5) { float s = aPart < 3.5 ? -1.0 : 1.0; vec3 piv = vec3(s * 0.27, 0.98 - drop, 0.0), q = transformed - piv;
      float a = -(ar * 2.85 + hd * 2.35 * (1.0 - ar)) - 0.25 * sin(uT * 7.0 + aSeed * 40.0) * ar * (1.0 - hold); float ca = cos(a), sa = sin(a); q = vec3(q.x, q.y * ca - q.z * sa, q.y * sa + q.z * ca);
      if (hd > 0.01 && ar < 0.5) { float b = s * 0.55 * hd; q = vec3(q.x * cos(b) - q.y * sin(b), q.x * sin(b) + q.y * cos(b), q.z); } transformed = q + piv; }
    if (aPart > 4.5) { if (hold < 0.5) transformed *= 0.0; else if (tifo > 0.5) { transformed.y = 1.2 + (transformed.y - 1.5) * 4.4; transformed.x *= 1.15; transformed.z += 0.14; } else transformed.y -= drop; }
    transformed.y += jp * st * abs(sin(uT * 8.5 + aSeed * 31.0)) * 0.32 + uB * abs(sin(uT * 9.0 + aSeed * 17.0));
    if (uCards > 0.5 && aPart < 4.5) transformed *= 0.0;
    #ifdef USE_INSTANCING_COLOR
    if (aPart < 0.5) vColor = mix(vec3(0.07, 0.08, 0.11), vec3(0.2, 0.22, 0.3), fract(aSeed * 3.1));
    else if (aPart > 1.5 && aPart < 2.5) vColor = mix(vec3(0.2, 0.12, 0.07), vec3(0.86, 0.67, 0.53), fract(aSeed * 5.3));
    else if (aPart > 4.5) vColor = tifo > 0.5 ? texture2D(uTifoTex, aUV).rgb : aCol2;
    #endif`;function qa(){let y=new Hi,v={uT:{value:0},uB:{value:0},uSt:{value:new Je},uAr:{value:new Je},uJp:{value:new Je},uHd:{value:new Je},uSc:{value:new Je},uWave:{value:new Je},uTifo:{value:0},uTifoTex:{value:null},uCards:{value:0}};return y.userData.u=v,y.onBeforeCompile=M=>{Object.assign(M.uniforms,v),M.vertexShader=`uniform float uT, uB, uTifo, uCards; uniform vec2 uSt, uAr, uJp, uHd, uSc, uWave; uniform sampler2D uTifoTex; attribute float aPart, aSeed, aSide; attribute vec2 aUV; attribute vec3 aCol2;
`+M.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
#ifdef USE_INSTANCING
`+Wi+`
#endif`)},y.customProgramCacheKey=()=>"w3dcrowd7",y}let vi=null;function ra(y,v){let M=t?8:16,_=t?4:8,I=M+_,B=t?48:e==="high"?80:64,U=B*2,b=4,q=new si(I*B,b*U,{samples:t?0:4});q.texture.generateMipmaps=!1,q.texture.minFilter=An;let z=new Ms;z.add(new hc(16777215,1.1));let ie=new Li(16774374,1.9);ie.position.set(.5,1.2,2),z.add(ie),z.environment=c.environment;let ve=new vs(-.5625,.5625,2.45,.2,-5,5);ve.position.set(0,0,2),vi||(vi=Z(),c.remove(vi.root),V.splice(V.indexOf(vi),1));let j=vi;z.add(j.root);let se=Ft(s.hash("fans:"+y+v)>>>0),de=$e=>$e[Math.floor(se()*$e.length)],Re=[],it=["#1e293b","#334155","#f8fafc","#0b0f24","#475569","#a3a3a3","#1d4ed8","#15803d","#78350f"],Xe={cc:a.getClearColor(new Ge),ca:a.getClearAlpha(),rt:a.getRenderTarget()};a.setClearColor(0,0);for(let $e=0;$e<I;$e++){let Ye=$e>=M,Ot=Ye?v:y,$t=Ye?y:v,cn=se()<.7,ln=s.kitN(cn?{c1:Ot,c2:se()<.5?"#f8fafc":$t,pat:de(["plain","plain","stripes","hoops","halves","sash"]),col:$t,slv:Ot,sho:de(it),soc:de(it)}:(()=>{let ge=de(it);return{c1:ge,c2:ge,pat:"plain",col:ge,slv:se()<.5?ge:de(it),sho:de(it),soc:de(it)}})()),li={_b3:1,key:"fan"+$e+JSON.stringify(ln),K:ln,g:"#facc15",tex:re(Y(ln))};li.gtex=li.tex,Re.push(li.tex);let fs="fan"+s.hash(y+v)%997+"x"+$e;Ee(j,li,!1,fs,""),j.lo&&(j.lo.visible=!1),j.hi&&(j.hi.visible=!0),j.bodyU.uGear.value.y=1;for(let ge of j.cloth||[])ge.visible=ge.userData.layer!==2;for(let ge=0;ge<b;ge++){for(let[Ie,pt]of j.mod)Ie.quaternion.copy(pt);j.mod.clear();for(let Ie in j.act)j.act[Ie].setEffectiveWeight(Ie==="idle"?1:0);if(j.mixer.setTime(.4+$e*.37),j.root.position.set(0,0,0),j.root.rotation.set(0,(se()-.5)*.35,0),j.root.scale.setScalar(Sc*(j.hgt||1)),j.root.updateMatrixWorld(!0),j.FU.uExpr.value.set(ge===0?.3:0,ge===1||ge===3?1:0,ge===1?.6:0,ge===2?1:0),ge===1){let Ie=(se()-.5)*.3;le(j,"upperarm_l","lowerarm_l",Ce(.45,1,.1+Ie),1),le(j,"lowerarm_l","hand_l",Ce(.25,1,.15),1),le(j,"upperarm_r","lowerarm_r",Ce(-.45,1,.1-Ie),1),le(j,"lowerarm_r","hand_r",Ce(-.25,1,.15),1)}ge===2&&(le(j,"upperarm_l","lowerarm_l",Ce(.75,.75,.15),1),le(j,"lowerarm_l","hand_l",Ce(-.9,.35,-.1),1),le(j,"upperarm_r","lowerarm_r",Ce(-.75,.75,.15),1),le(j,"lowerarm_r","hand_r",Ce(.9,.35,-.1),1),Ve(j,"Head",ke,-.12)),ge===3&&(le(j,"upperarm_l","lowerarm_l",Ce(.2,-.55,.8),1),le(j,"lowerarm_l","hand_l",Ce(-.75,.35,.55),1),le(j,"upperarm_r","lowerarm_r",Ce(-.2,-.55,.8),1),le(j,"lowerarm_r","hand_r",Ce(.75,.35,.55),1)),j.root.updateMatrixWorld(!0),q.viewport.set($e*B,ge*U,B,U),q.scissor.set($e*B,ge*U,B,U),q.scissorTest=!0,a.setRenderTarget(q),a.clear(),a.render(z,ve)}}a.setRenderTarget(Xe.rt),a.setClearColor(Xe.cc,Xe.ca),q.scissorTest=!1,z.remove(j.root);for(let[$e,Ye]of j.mod)$e.quaternion.copy(Ye);return j.mod.clear(),j.FU.uExpr.value.set(0,0,0,0),Re.forEach($e=>$e.dispose()),j.dk=null,{tex:q.texture,rt:q,nH:M,nA:_,N:I}}function Dn(y,v,M,_){let I;try{I=ra(M,_)}catch(z){return console.warn("3D fans",z),null}let B=new mi(.985,1.97).translate(0,.175+.985,0),U=new Hi({side:Cn,alphaTest:.5}),b=U.userData.u=Object.assign({},v,{uFan:{value:I.tex},uFanN:{value:new k(I.nH,I.nA,I.N)}});U.onBeforeCompile=z=>{Object.assign(z.uniforms,b),z.vertexShader=`uniform float uT, uB, uTifo; uniform vec2 uSt, uAr, uJp, uHd, uSc, uWave; uniform vec3 uFanN; attribute float aSeed, aSide; attribute vec2 aUV; varying vec2 vFan;
`+z.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        #ifdef USE_INSTANCING
        float sd = aSide; float st = mix(uSt.x, uSt.y, sd), ar = mix(uAr.x, uAr.y, sd), jp = mix(uJp.x, uJp.y, sd), hd = mix(uHd.x, uHd.y, sd), sc = mix(uSc.x, uSc.y, sd);
        float me = fract(aSeed * 13.7); st = clamp(st + step(0.91, me) * 0.7 - step(me, 0.06) * st * 0.6, 0.0, 1.0);
        float ang = atan(instanceMatrix[3].z, instanceMatrix[3].x), wv = uWave.x * smoothstep(0.6, 0.0, abs(mod(ang - uWave.y + 3.14159, 6.28318) - 3.14159));
        st = max(st, wv); ar = max(ar, wv); float tifo = uTifo * step(0.0, aUV.x); bool holder = fract(aSeed * 7.31) < 0.3; float hold = max(tifo, holder ? sc : 0.0);
        if (tifo > 0.5) { st = 1.0; ar = 1.0; jp = 0.0; } if (hold > 0.5) ar = max(ar, 0.95);
        float myAr = step(0.5, ar * (0.7 + 0.6 * fract(aSeed * 3.7))), myHd = step(0.45, hd * (0.7 + 0.6 * fract(aSeed * 5.9)));
        float pose = myAr > 0.5 ? 1.0 : myHd > 0.5 ? 2.0 : (st > 0.5 && sin(uT * 7.5 + aSeed * 50.0) > 0.2 ? 3.0 : 0.0);
        float who = sd > 0.5 ? uFanN.x + floor(fract(aSeed * 7.7) * uFanN.y) : floor(fract(aSeed * 7.7) * uFanN.x);
        vFan = vec2((who + uv.x) / uFanN.z, (pose + uv.y) / 4.0);
        transformed.y -= (1.0 - st) * 0.42;
        transformed.y += jp * st * abs(sin(uT * 8.5 + aSeed * 31.0)) * 0.32;
        #endif`),z.fragmentShader=`uniform sampler2D uFan; varying vec2 vFan;
`+z.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ vec4 t = texture2D(uFan, vFan); if (t.a < 0.5) discard; diffuseColor.rgb = t.rgb / max(t.a, 0.5); }`)},U.customProgramCacheKey=()=>"w3dfans1";let q=new _i(B,U,y.count);q.instanceMatrix.copy(y.instanceMatrix),q.count=y.count,q.frustumCulled=!1;for(let z of["aSeed","aSide","aUV"])B.setAttribute(z,y.geometry.attributes[z]);return v.uCards.value=1,q.userData.rt=I.rt,q}let Pi=y=>{let v=X(256,64,_=>{let I=_.createLinearGradient(0,0,256,64);I.addColorStop(0,y.c1),I.addColorStop(.5,y.c1),I.addColorStop(.5,y.c2),I.addColorStop(1,y.c2),_.fillStyle=I,_.fillRect(0,0,256,64),_.fillStyle="#ffffff";for(let B=0;B<12;B++)_.fillRect(B*22,0,6,6);_.font="900 40px Arial, Helvetica, sans-serif",_.textAlign="center",_.textBaseline="middle",_.lineWidth=6,_.strokeStyle="#0b0f24",_.strokeText(String(y.sh||"").slice(0,10),128,36),_.fillText(String(y.sh||"").slice(0,10),128,36)}),M=re(v);return M.minFilter=An,M.generateMipmaps=!1,M},Zt={st:[0,0],ar:[0,0],jp:[0,0],hd:[0,0],sc:[0,0],wave:0,wph:0,tifo:0,tkey:"",smoke:null};function ei(y,v){let M=y.cu,_=In&&In.crowd||null,I=d.dt,B=Math.min(1,I*4.5);for(let U of["st","ar","jp","hd","sc"])for(let b=0;b<2;b++){let q=_&&_[U]?_[U][b]||0:U==="jp"?(v||0)*2:U==="st"?v>.05?1:.08:0;Zt[U][b]+=(q-Zt[U][b])*B}if(Zt.wave+=((_&&_.wave||0)-Zt.wave)*Math.min(1,I*1.5),Zt.wph=(Zt.wph+I*1.15)%(Math.PI*2),Zt.tifo+=((_&&_.tifo?1:0)-Zt.tifo)*Math.min(1,I*2.5),M.uSt.value.fromArray(Zt.st),M.uAr.value.fromArray(Zt.ar),M.uJp.value.fromArray(Zt.jp),M.uHd.value.fromArray(Zt.hd),M.uSc.value.fromArray(Zt.sc),M.uWave.value.set(Zt.wave,Zt.wph),M.uTifo.value=Zt.tifo>.5?1:0,M.uT.value=d.now/1e3,M.uB.value=0,_&&_.tifo){let U=JSON.stringify(_.tifo);U!==Zt.tkey&&(Zt.tkey=U,M.uTifoTex.value&&M.uTifoTex.value.dispose(),M.uTifoTex.value=Pi(_.tifo))}M.uTifoTex.value||(M.uTifoTex.value=Pi({c1:"#22d3ee",c2:"#a855f7",sh:""}))}let Fi=null;function Tc(){if(Fi)return Fi;let y=e==="high"?260:160,v=new Float32Array(y*3),M=new Float32Array(y*3),_=Ft(4242),I=[[.13,.83,.93],[.66,.33,.97],[1,.18,.58]];for(let b=0;b<y;b++){let q=_()<.5?-1:1;v.set([q*(60+_()*4),1+_()*3,(_()-.5)*50],b*3),M.set(I[b%3],b*3)}let B=new sn;B.setAttribute("position",new Dt(v,3)),B.setAttribute("color",new Dt(M,3));let U=new jn({transparent:!0,depthWrite:!1,uniforms:{uT:{value:0},uEnd:{value:0}},vertexShader:"attribute vec3 color; uniform float uT, uEnd; varying vec3 vC; varying float vA; void main(){ vec3 p = position; float f = fract(p.z * 0.37 + p.y * 1.7); float e = sign(p.x); float on = uEnd > 1.5 ? 1.0 : step(0.0, e * (uEnd - 0.5)); float life = clamp(uT / 9.0, 0.0, 1.0); float a = clamp(uT - f * 2.0, 0.0, 9.0);p.y += a * (1.3 + f); p.x -= e * a * 0.6; p.z += sin(a * 0.7 + f * 9.0) * 1.5; vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = (3.0 + a * 1.8) * 120.0 / max(1.0, -mv.z); vC = color; vA = on * smoothstep(0.0, 0.6, a) * (1.0 - life) * 0.45; }",fragmentShader:"varying vec3 vC; varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(vC, a * vA); }"});return Fi=new Ss(B,U),Fi.frustumCulled=!1,c.add(Fi),Fi}let us=new Map,Qh=new Map,Td=["shaved","buzz","crew","short","part","slick","quiff","curl","afro","dread","fade","top"],Bd=["#0a0a0c","#24170f","#5a3a20","#a07a44","#c9a55a","#6b2f1a","#8a8f96","#d8dadd"];function Gh(y,v){let M=y+JSON.stringify(v),_=us.get(M);return _||(_={...D("mgrface:"+(v.seed||y)),si:[0,2,4,5,7,9,11,12][v.sk||0],hair:Bd[v.hc||0],st:Td[v.hr||0],beard:[0,1,2,3,5][v.bd||0],build:[-.35,.1,.55][v.bu||0],h:1.8+((v.bu||0)===0?.02:0),arch:"balanced",sock:0,band:!1,wrist:0,sleeves:(v.fit|0)!==3,untuck:(v.fit|0)!==3,dance:!1,sad:1,cel:0,mgr:1,trou:(v.fit|0)===2?2:1,gl:v.gl||0,boot:(v.fit|0)===1?"#f8fafc":"#0b0f24",boot2:(v.fit|0)===1?"#94a3b8":"#111827",red:(v.ag||0)*.2},us.set(M,_),us.size>40&&us.delete(us.keys().next().value),_)}let Rd=(y,v,M,_)=>X(512,256,I=>{let B=(U,b)=>I.fillRect(U,0,b,256);if(I.fillStyle=y===1||y===3?M:v,B(0,512),y===0||y===2){if(I.fillStyle="#f8fafc",I.beginPath(),I.moveTo(100,0),I.lineTo(156,0),I.lineTo(128,120),I.fill(),y===0)I.fillStyle=M,I.beginPath(),I.moveTo(122,8),I.lineTo(134,8),I.lineTo(138,104),I.lineTo(128,116),I.lineTo(118,104),I.fill();else{I.fillStyle=M,I.fillRect(104,0,20,150),I.fillStyle=_;for(let U=0;U<150;U+=18)I.fillRect(104,U,20,6)}I.strokeStyle="rgba(0,0,0,.35)",I.lineWidth=5,I.beginPath(),I.moveTo(92,0),I.lineTo(124,130),I.moveTo(164,0),I.lineTo(132,130),I.stroke(),I.fillStyle="rgba(0,0,0,.45)",[150,190].forEach(U=>{I.beginPath(),I.arc(136,U,5,0,7),I.fill()}),I.fillStyle="rgba(0,0,0,.25)",I.fillRect(383,0,3,256)}else y===1?(I.fillStyle=_,I.fillRect(30,0,14,256),I.fillRect(212,0,14,256),I.fillRect(286,0,14,256),I.fillRect(468,0,14,256),I.fillStyle="#e2e8f0",I.fillRect(126,0,4,256)):(I.fillStyle=_,I.fillRect(118,0,20,70),I.fillStyle="#f8fafc",[20,42,62].forEach(U=>{I.beginPath(),I.arc(128,U,3,0,7),I.fill()}))});function Hh(y){let v=y.fit|0,M=y.c||"#0b1f4d",_=y.c1||"#22d3ee",I=y.c2||"#ffffff",B=[v,M,_,I].join(),U=Qh.get(B);if(U)return U;let b=v===1||v===3?_:M,q={c1:b,c2:I,pat:"plain",col:v===0?"#f8fafc":v===2?_:I,slv:b,sho:v===1&&_===M?"#0b0f24":M,soc:"#0b0f24"},z=re(Rd(v,M,_,I));return U={_b3:1,key:"mgr"+B,K:q,g:b,tex:z,gtex:z},Qh.set(B,U),U}let aa=null;function zh(y,v){if(!aa){let M=(()=>{let b=null;return J.traverse(q=>{q.isBone&&q.name==="Head"&&(b=q)}),b})();if(!M)return null;J.updateMatrixWorld(!0);let _=new dt().copy(M.matrixWorld).invert(),I=new nt(0,1.692,.104).applyMatrix4(_),B=new ls;M.getWorldQuaternion(B);let U=new nt;M.getWorldScale(U),aa={pos:I,q:B.invert(),s:1/(U.x||1)}}if(!y.gls){let M=new Gn,_=new Vt({color:724772,roughness:.35,metalness:.4}),I=new Vt({color:1120295,roughness:.1,metalness:.6,transparent:!0,opacity:.85});[-1,1].forEach(U=>{let b=new Ke(new Na(.019,.0035,6,14),_);b.position.set(U*.031,0,0),M.add(b);let q=new Ke(new rc(.018,12),I);q.position.set(U*.031,0,.001),q.userData.lens=1,M.add(q);let z=new Ke(new fn(.003,.003,.085),_);z.position.set(U*.05,.002,-.044),M.add(z)});let B=new Ke(new fn(.024,.003,.003),_);B.position.set(0,.004,0),M.add(B),M.position.copy(aa.pos),M.quaternion.copy(aa.q),M.scale.setScalar(aa.s),y.bones.Head.add(M),y.gls=M}return y.gls.visible=v>0,y.gls.children.forEach(M=>{M.userData.lens&&(M.visible=v===2)}),y.gls}let Ui=null,Vh="";function Dd(y,v){let M=y+":"+v;return Ui||(Ui=new Ke(new fn(.62,.36,.05),new un({toneMapped:!1})),c.add(Ui)),M!==Vh&&(Vh=M,Ui.material.map&&Ui.material.map.dispose(),Ui.material.map=re(X(256,150,_=>{_.fillStyle="#05060f",_.fillRect(0,0,256,150),_.font="900 70px Arial, Helvetica, sans-serif",_.textAlign="center",_.textBaseline="middle",_.fillStyle="#ff2d95",_.fillText(String(y),66,80),_.fillStyle="#22d3ee",_.fillText(String(v),190,80),_.font="900 18px Arial",_.fillStyle="#e2e8f0",_.fillText("OUT",66,22),_.fillText("IN",190,22)})),Ui.material.needsUpdate=!0),Ui}let or=null;function Ld(){if(or)return or;let y=_c([new fn(.34,.22,.42).translate(0,.5,.12),new fn(.4,.5,.24).translate(0,.86,0),new ns(.12,6,4).translate(0,1.22,0)].map(v=>(v.deleteAttribute("uv"),v)));return or=new _i(y,new Hi,12),or.frustumCulled=!1,c.add(or),or}let Bc=-36.4;function Pd(y){let v=In;if(!v||!v.mg||!y.dug)return;let M=d.now/1e3,_=new Ge,I=new dt,B=Ld(),U=0;for(let ie=0;ie<2;ie++){let ve=v.mc&&v.mc[ie]&&v.mc[ie].c1||(ie?"#ff2d95":"#22d3ee");for(let j=0;j<6;j++)I.makeRotationY(0),I.setPosition((ie?1:-1)*(10.6+(j-2.5)*.95),0,-38.05),B.setMatrixAt(U,I),_.set(ve),B.setColorAt(U++,_)}B.count=U,B.instanceMatrix.needsUpdate=!0,B.instanceColor&&(B.instanceColor.needsUpdate=!0),x.add(B);for(let ie=0;ie<2;ie++){let ve=v.mg[ie];if(!ve)continue;let j=Hh(ve),se="mgr"+ie+":"+s.hash(JSON.stringify(ve)),de=v.ma&&v.ma[ie]||{};Rc.set(se,Gh(se,ve));let Re=(ie?1:-1)*7.6,it=de.k&&de.k!=="idle",Xe=Re+Math.sin(M*.33+ie*2.1)*1.7;it&&(Xe=de.x!=null?de.x:Xe),de.x=Xe;let $e=Math.cos(M*.33+ie*2.1)*1.7*.33,Ye={num:"",run:it?0:.25,yaw:it?0:Math.abs($e)>.28?$e>0?Math.PI/2:-Math.PI/2:0};de.k==="shout"?Ye.yell=1:de.k==="cheer"?(Ye.jump=Math.abs(Math.sin(M*6+ie))*.35,Ye.arms="up"):de.k==="despair"?Ye.hands=1:de.k==="argue"?(Ye.yell=1,Ye.yaw=ie?-Math.PI/2:Math.PI/2):de.k==="clap"&&(Ye.arms="up"),i.fig(j,!1,se,Xe,Bc,Ye);let Ot=Q.get(se);Ot&&Ot.bones.Head&&zh(Ot,ve.gl||0)}let b=v.rc||"#111827",q=i.team({c1:b,c2:"#0b0f24",pat:"plain",col:"#0b0f24",slv:b,sho:"#0b0f24",soc:"#0b0f24"},b),z=v.sub;if(i.fig(q,!1,"off4",0,Bc-.3,{num:"",run:0,yaw:0,arms:z?"up":""}),z){let ie=Dd(z.out,z.inn);x.add(ie),ie.position.set(0,2.42,Bc-.18),ie.rotation.set(0,0,0)}}let Rc=new Map;i.mgrFig=function(y,v,M,_){if(!L||!y)return;let I="mgrp:"+s.hash(JSON.stringify(y));Rc.set(I,Gh(I,y)),i.fig(Hh(y),!1,I,v,M,Object.assign({num:"",run:0},_||{}));let B=Q.get(I);B&&B.bones.Head&&zh(B,y.gl||0)};function Fd(y){let v=zt();[-1,1].forEach(I=>{let B=I*10.6;v.box(6.8,1.75,.12,"#0f172a",B,.88,-38.75),v.box(.1,1.75,1.1,"#0f172a",B-3.4,.88,-38.2),v.box(.1,1.75,1.1,"#0f172a",B+3.4,.88,-38.2),v.box(6.4,.42,.5,"#334155",B,.21,-38.4)});let M=new Ke(v.geo(),new Hi({vertexColors:!0}));y.add(M);let _=new Vt({color:10467273,transparent:!0,opacity:.3,roughness:.1,metalness:.2,depthWrite:!1});return[-1,1].forEach(I=>{let B=new Ke(new fn(6.9,.06,1.25),_);B.position.set(I*10.6,1.78,-38.2),y.add(B)}),!0}let ti=t?1:0,oa=0,Ls=0,Ud=ti,Wh=y=>{u.shadow.mapSize.set(y,y),u.shadow.map&&(u.shadow.map.dispose(),u.shadow.map=null)},Nd=y=>{y>.05?(oa++,Ls=0):(oa=Math.max(0,oa-2),y<.024?Ls++:Ls=Math.max(0,Ls-3)),oa>=75&&ti<3?(oa=0,Ls=0,ti++,ti===2&&Wh(512),ti>=3&&(u.castShadow=!1)):Ls>=720&&ti>Ud&&(Ls=0,ti>=3?u.castShadow=!0:ti===2&&Wh(n.sh),ti--)};i.tier=e,i.q=()=>ti;let Kn={e:null,a:null,f:40,v:null};function Od(y,v){let M=Math.min(.1,(v-g)/1e3);g=v,d.dt=M,d.now=v,d.n++,d.n>30&&Nd(M);let _=y.step(M,v);if(!_)return;let I=o.clientWidth||300,B=o.clientHeight||200,U=Math.min(window.devicePixelRatio||1,ti?1:n.pr);a.getPixelRatio()!==U&&a.setPixelRatio(U);let b=a.getSize(new Je);(b.x!==I||b.y!==B)&&a.setSize(I,B,!1);{let de=new nt(_.eye[0],_.eye[1],_.eye[2]),Re=new nt(_.at[0],_.at[1],_.at[2]),it=!Kn.e||y!==Kn.v||Kn.e.distanceTo(de)>9||Kn.a.distanceTo(Re)>12,Xe=it?1:1-Math.exp(-M*14);it?(Kn.e=de.clone(),Kn.a=Re.clone(),Kn.f=_.fov||40,Kn.v=y):(Kn.e.lerp(de,Xe),Kn.a.lerp(Re,Xe),Kn.f+=((_.fov||40)-Kn.f)*Xe),l.fov=Kn.f,l.aspect=I/B,l.near=.1,l.position.copy(Kn.e),l.lookAt(Kn.a),l.updateProjectionMatrix()}x.clear(),i._world=null,In=wc(),S&&S.frameStart(),y.draw(),S&&S.ok&&S.blobs();let q=!!i._world;R(M,q),At(q),dn(q);for(let de of c.children)de!==h&&de!==u&&de!==u.target&&!de.isLight&&(de.visible=x.has(de));c.fog.density=q?(_.fog==null?.0026:_.fog*.75)*we.fogK:0,a.toneMappingExposure=q?we.exp:1.08,q||(u.color.setRGB(1,.95,.89),u.intensity=2.6),q?a.setClearColor(329231,1):_.bg?a.setClearColor(new Ge().setRGB(_.bg[0],_.bg[1],_.bg[2],kt),0):a.setClearColor(461592,0),h.intensity=q?we.hemi:1;let z=new nt(_.at[0],0,_.at[2]),ie=l.position.distanceTo(z),ve=En(ie*.75,5,48);q?u.position.copy(z).addScaledVector(we.dir,70):u.position.set(z.x+26,60,z.z+34),u.target.position.copy(z);let j=u.shadow.camera;j.left=-ve,j.right=ve,j.top=ve,j.bottom=-ve,j.updateProjectionMatrix();let se=ti>=2?16:n.near;for(let de of V){if(!x.has(de.root))continue;if(de.mh){S.lod(de,ti);continue}let Re=(de.dist||0)>se;if(de.hi&&(de.hi.visible=!Re),de.lo&&(de.lo.visible=Re),de.cloth){let it=!!(de.style&&de.style.mgr);for(let Xe of de.cloth)Xe.visible=!Re&&(Xe.userData.layer===3?it:!(it&&Xe.userData.layer===2))}}a.render(c,l)}i.run=function(y,v){if(!L||!y||!N()||A)return!1;if(v._err=0,o.parentNode!==y&&y.appendChild(o),!f){g=performance.now();let M=()=>{if(r.be!=="b3"){f=null;return}let _=performance.now(),I=r.view;if(!I||!document.body.contains(o)||I.alive&&!I.alive()){f=null,I&&I.end&&I.end(),r.view===I&&(r.view=null);return}if(t&&_-p<31){f=requestAnimationFrame(M);return}p=_;try{Od(I,_)}catch(B){(i._errs=i._errs||[]).push(String(B&&B.stack||B).slice(0,300)),I._err++||console.warn("3D",B),I._err>5&&(r.view=null,m++)}f=requestAnimationFrame(M)};f=requestAnimationFrame(M)}return!0},i.stop=function(){o&&o.parentNode&&o.parentNode.removeChild(o)};let ca=null;return i.portrait=function(y,v,M,_,I,B){if(!L||!y||!y._b3)return null;I=I||720,B=B||900;let U=document.createElement("canvas");U.width=I,U.height=B;let b;try{b=new Kr({canvas:U,antialias:!0,alpha:!0,preserveDrawingBuffer:!0})}catch{return null}try{b.outputColorSpace=kt,b.toneMapping=dc,b.toneMappingExposure=1.05,b.setClearColor(0,0);let q=new Ms;try{let Xe=new Ys(b);q.environment=Xe.fromScene(new za,.04).texture,Xe.dispose()}catch{}let z=new Li(16773600,2.6);z.position.set(-1.2,2.6,2.2),q.add(z);let ie=new Li(10475775,2.2);ie.position.set(1.6,2.2,-1.8),q.add(ie);let ve=new Li(14202110,1.1);ve.position.set(-1.8,1.6,-1.5),q.add(ve),q.add(new Oa(13358591,1777459,.55));let j=S&&S.ok&&S.isPlayer(String(M));j?S.port||(S.port=S.getChar("__port"),S.port.port=!0,S.byId.delete("__port")):ca||(ca=Z(),c.remove(ca.root),V.splice(V.indexOf(ca),1));let se=j?S.port:ca;if(q.add(se.root),se.dk=null,j){se.root.visible=!0;let Xe="";try{Xe=String(s.nameOf(String(M))||"").toUpperCase().slice(0,16)}catch{}se.lk=ee(String(M)),se.lkId=String(M),S.frameStart(),S.dist=0,se.dist=0,S.lod(se,0),S.dress(se,y,v,String(M),_,se.lk,Xe),S.frameStart(),S.dress(se,y,v,String(M),_,se.lk,Xe)}else Ee(se,y,v,String(M),_);se.lo&&(se.lo.visible=!1),se.hi&&(se.hi.visible=!0);for(let Xe of se.cloth||[])Xe.visible=Xe.userData.layer!==3;for(let[Xe,$e]of se.mod)Xe.quaternion.copy($e);se.mod.clear();for(let Xe in se.act)se.act[Xe].setEffectiveWeight(Xe==="idle"?1:0);se.mixer.setTime(.9),se.root.position.set(0,0,0),se.root.rotation.set(0,-.32,0),se.root.scale.setScalar(Sc*(se.hgt||1)),se.root.updateMatrixWorld(!0),Ve(se,"Head",We,.18),Ve(se,"neck_01",We,.08),se.FU.uExpr.value.set(.35,.15,0,0),se.root.updateMatrixWorld(!0);let de=new nt;se.bones.Head.getWorldPosition(de);let Re=new pn(24,I/B,.05,20);Re.position.set(de.x-.05,de.y+.26,de.z+1.75),Re.lookAt(de.x+.02,de.y-.06,de.z),b.render(q,Re),b.render(q,Re);let it=U.toDataURL("image/png");q.remove(se.root),j&&c.add(se.root);for(let[Xe,$e]of se.mod)Xe.quaternion.copy($e);return se.mod.clear(),se.FU.uExpr.value.set(0,0,0,0),se.dk=null,it}catch(q){return console.warn("3D portrait",q),null}finally{try{b.dispose(),b.forceContextLoss()}catch{}}},i.shoulders=()=>{let y=new nt,v=new nt,M=new nt,_=J;_.updateMatrixWorld(!0),_.getObjectByName("upperarm_l").getWorldPosition(y),_.getObjectByName("upperarm_r").getWorldPosition(v),_.getObjectByName("Head").getWorldPosition(M);let I=_.getObjectByName("root")||_,B=new nt;return I.getWorldPosition(B),{w:y.distanceTo(v),ratio:y.distanceTo(v)/(M.y-B.y)}},i.poseCheck=function(){let y=[],v=(M,_)=>{let I=new nt;return M.bones[_].getWorldPosition(I),I};for(let M of V){if(M.lastN<d.n-1||!M.bones.Head)continue;let _=new nt(1,0,0).applyQuaternion(M.root.quaternion);for(let I of["l","r"]){let B=v(M,"upperarm_"+I),U=v(M,"lowerarm_"+I),b=v(M,"hand_"+I),q=v(M,"thigh_"+I),z=v(M,"calf_"+I),ie=v(M,"foot_"+I),ve=U.clone().sub(B).normalize(),j=b.clone().sub(U).normalize(),se=Math.acos(En(ve.dot(j),-1,1))*57.3,de=z.clone().sub(q).normalize(),Re=ie.clone().sub(z).normalize(),it=Math.acos(En(de.dot(Re),-1,1))*57.3,Xe=new nt().crossVectors(de,Re).dot(_);se>160&&y.push([M.id,"elbow_"+I,Math.round(se)]),it>150&&y.push([M.id,"knee_"+I,Math.round(it)]),Xe<0&&it>12&&y.push([M.id,"knee_back_"+I,Math.round(it)])}}return y},i.dbg=()=>({looks:V.filter(y=>y.lastN>=d.n-1).map(y=>y.mh?[y.id,y.hstyle,"#"+y.hair.material.color.getHexString(),"mh",y.cur]:[y.id,y.hstyle,"#"+y.hairMat.color.getHexString(),y.bodyU.uHairS.value,y.bodyU.uBeard.value]),mh:S&&S.ok?S.stats():null,q:ti,cam:l.position.toArray().map(y=>+y.toFixed(1)),p0:V.filter(y=>y.lastN>=d.n-1).slice(0,3).map(y=>[y.id,y.root.position.toArray().map(v=>+v.toFixed(1)),y.root.visible,y.mh?y.cur:y.hi&&y.hi.visible,y.lo&&y.lo.visible,+(y.dist||0).toFixed(1)]),chars:V.length,used:V.filter(y=>y.lastN>=d.n-1).length,n:d.n,world:!!i._world,errs:i._errs||[]}),i.info=()=>a?{calls:a.info.render.calls,tris:a.info.render.triangles,geos:a.info.memory.geometries,tex:a.info.memory.textures,progs:(a.info.programs||[]).length}:null,i.at=()=>({up:we.up,gold:we.gold,ov:we.ov,wet:we.wet,snow:we.snow,fog:we.fog,wind:we.wind,glow:we.glow,crowd:{st:Zt.st.slice(),jp:Zt.jp.slice(),ar:Zt.ar.slice(),wave:Zt.wave,tifo:Zt.tifo},ball:jt,mgr:V.filter(y=>y.lastN>=d.n-1&&/^mgr/.test(y.id)).length,board:!!(Ui&&x.has(Ui)),atm:!!In}),i.ready=!1,P}window.W3D={load:Ob,version:4};
