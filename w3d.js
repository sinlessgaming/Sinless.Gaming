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
var Yl="160";var jd=0,tu=1,Zd=2;var Ec=1,$d=2,es=3,ki=0,Fn=1,Rn=2;var gs=0,Qr=1,Qo=2,nu=3,iu=4,eA=5,Gs=100,tA=101,nA=102,su=103,ru=104,iA=200,sA=201,rA=202,aA=203,pl=204,ml=205,oA=206,cA=207,lA=208,hA=209,uA=210,fA=211,dA=212,AA=213,pA=214,mA=0,gA=1,_A=2,Go=3,bA=4,EA=5,xA=6,yA=7,Jl=0,vA=1,MA=2,_s=0,SA=1,CA=2,wA=3,xc=4,IA=5,TA=6,au="attached",BA="detached",Lf=300,qs=301,zr=302,gl=303,_l=304,yc=306,Ei=1e3,ri=1001,Na=1002,Ln=1003,Ho=1004;var Ia=1005;var dn=1006,jl=1007;var xi=1008;var Dn=1009,RA=1010,DA=1011,Zl=1012,Ff=1013,ps=1014,ai=1015,Qi=1016,Nf=1017,Uf=1018,Vs=1020,PA=1021,Cn=1023,LA=1024,FA=1025,Ws=1026,Vr=1027,nr=1028,Of=1029,ir=1030,kf=1031,Qf=1033,Ta=33776,Oc=33777,kc=33778,Ba=33779,zo=35840,ou=35841,Vo=35842,cu=35843,vc=36196,Wo=37492,Ko=37496,qo=37808,lu=37809,hu=37810,uu=37811,Ua=37812,fu=37813,du=37814,Au=37815,pu=37816,mu=37817,gu=37818,_u=37819,bu=37820,Eu=37821,Ra=36492,xu=36494,yu=36495,NA=36283,vu=36284,Mu=36285,Su=36286,$l=2200,UA=2201,OA=2202,Wr=2300,Xs=2301,Qc=2302,Nr=2400,Ur=2401,Xo=2402,eh=2500,kA=2501,Gf=0,Mc=1,Ja=2,Hf=3e3,Ks=3001,QA=3200,GA=3201,th=0,HA=1,ei="",Qt="srgb",wn="srgb-linear",ja="display-p3",sa="display-p3-linear",Yo="linear",hn="srgb",Jo="rec709",jo="p3";var pr=7680;var Cu=519,zA=512,VA=513,WA=514,zf=515,KA=516,qA=517,XA=518,YA=519,bl=35044;var wu="300 es",El=1035,ns=2e3,Zo=2001,is=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},Kn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Iu=1234567,Da=Math.PI/180,Kr=180/Math.PI;function Pi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kn[s&255]+Kn[s>>8&255]+Kn[s>>16&255]+Kn[s>>24&255]+"-"+Kn[e&255]+Kn[e>>8&255]+"-"+Kn[e>>16&15|64]+Kn[e>>24&255]+"-"+Kn[t&63|128]+Kn[t>>8&255]+"-"+Kn[t>>16&255]+Kn[t>>24&255]+Kn[n&255]+Kn[n>>8&255]+Kn[n>>16&255]+Kn[n>>24&255]).toLowerCase()}function Vn(s,e,t){return Math.max(e,Math.min(t,s))}function nh(s,e){return(s%e+e)%e}function JA(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function jA(s,e,t){return s!==e?(t-s)/(e-s):0}function Pa(s,e,t){return(1-t)*s+t*e}function ZA(s,e,t,n){return Pa(s,e,1-Math.exp(-t*n))}function $A(s,e=1){return e-Math.abs(nh(s,e*2)-e)}function ep(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function tp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function np(s,e){return s+Math.floor(Math.random()*(e-s+1))}function ip(s,e){return s+Math.random()*(e-s)}function sp(s){return s*(.5-Math.random())}function rp(s){s!==void 0&&(Iu=s);let e=Iu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ap(s){return s*Da}function op(s){return s*Kr}function xl(s){return(s&s-1)===0&&s!==0}function cp(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function $o(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function lp(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),f=a((e-n)/2),A=r((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*u,c*f,o*l);break;case"YZY":s.set(c*f,o*h,c*u,o*l);break;case"ZXZ":s.set(c*u,c*f,o*h,o*l);break;case"XZX":s.set(o*h,c*m,c*A,o*l);break;case"YXY":s.set(c*A,o*h,c*m,o*l);break;case"ZYZ":s.set(c*m,c*A,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Oi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function tn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Vf={DEG2RAD:Da,RAD2DEG:Kr,generateUUID:Pi,clamp:Vn,euclideanModulo:nh,mapLinear:JA,inverseLerp:jA,lerp:Pa,damp:ZA,pingpong:$A,smoothstep:ep,smootherstep:tp,randInt:np,randFloat:ip,randFloatSpread:sp,seededRandom:rp,degToRad:ap,radToDeg:op,isPowerOfTwo:xl,ceilPowerOfTwo:cp,floorPowerOfTwo:$o,setQuaternionFromProperEuler:lp,normalize:tn,denormalize:Oi},Je=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Vn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Lt=class s{constructor(e,t,n,i,r,a,o,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],A=n[5],m=n[8],b=i[0],p=i[3],d=i[6],y=i[1],E=i[4],R=i[7],U=i[2],P=i[5],N=i[8];return r[0]=a*b+o*y+c*U,r[3]=a*p+o*E+c*P,r[6]=a*d+o*R+c*N,r[1]=l*b+h*y+u*U,r[4]=l*p+h*E+u*P,r[7]=l*d+h*R+u*N,r[2]=f*b+A*y+m*U,r[5]=f*p+A*E+m*P,r[8]=f*d+A*R+m*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,f=o*c-h*r,A=l*r-a*c,m=t*u+n*f+i*A;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/m;return e[0]=u*b,e[1]=(i*l-h*n)*b,e[2]=(o*n-i*a)*b,e[3]=f*b,e[4]=(h*t-i*c)*b,e[5]=(i*r-o*t)*b,e[6]=A*b,e[7]=(n*c-l*t)*b,e[8]=(a*t-n*r)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Gc.makeScale(e,t)),this}rotate(e){return this.premultiply(Gc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Gc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Gc=new Lt;function Wf(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Oa(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function hp(){let s=Oa("canvas");return s.style.display="block",s}var Tu={};function La(s){s in Tu||(Tu[s]=!0,console.warn(s))}var Bu=new Lt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ru=new Lt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),co={[wn]:{transfer:Yo,primaries:Jo,toReference:s=>s,fromReference:s=>s},[Qt]:{transfer:hn,primaries:Jo,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[sa]:{transfer:Yo,primaries:jo,toReference:s=>s.applyMatrix3(Ru),fromReference:s=>s.applyMatrix3(Bu)},[ja]:{transfer:hn,primaries:jo,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Ru),fromReference:s=>s.applyMatrix3(Bu).convertLinearToSRGB()}},up=new Set([wn,sa]),Kt={enabled:!0,_workingColorSpace:wn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!up.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=co[e].toReference,i=co[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return co[s].primaries},getTransfer:function(s){return s===ei?Yo:co[s].transfer}};function Gr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Hc(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var mr,ec=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{mr===void 0&&(mr=Oa("canvas")),mr.width=e.width,mr.height=e.height;let n=mr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=mr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=Oa("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Gr(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Gr(t[n]/255)*255):t[n]=Gr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},fp=0,tc=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=Pi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(zc(i[a].image)):r.push(zc(i[a]))}else r=zc(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function zc(s){return typeof HTMLImageElement!="undefined"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&s instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&s instanceof ImageBitmap?ec.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var dp=0,zn=class s extends is{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=ri,i=ri,r=dn,a=xi,o=Cn,c=Dn,l=s.DEFAULT_ANISOTROPY,h=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Pi(),this.name="",this.source=new tc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Je(0,0),this.repeat=new Je(1,1),this.center=new Je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(La("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ks?Qt:ei),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ei:e.x=e.x-Math.floor(e.x);break;case ri:e.x=e.x<0?0:1;break;case Na:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ei:e.y=e.y-Math.floor(e.y);break;case ri:e.y=e.y<0?0:1;break;case Na:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return La("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Qt?Ks:Hf}set encoding(e){La("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ks?Qt:ei}};zn.DEFAULT_IMAGE=null;zn.DEFAULT_MAPPING=Lf;zn.DEFAULT_ANISOTROPY=1;var Rt=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],A=c[5],m=c[9],b=c[2],p=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-b)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+b)<.1&&Math.abs(m+p)<.1&&Math.abs(l+A+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(l+1)/2,R=(A+1)/2,U=(d+1)/2,P=(h+f)/4,N=(u+b)/4,j=(m+p)/4;return E>R&&E>U?E<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(E),i=P/n,r=N/n):R>U?R<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(R),n=P/i,r=j/i):U<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(U),n=N/r,i=j/r),this.set(n,i,r,t),this}let y=Math.sqrt((p-m)*(p-m)+(u-b)*(u-b)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(p-m)/y,this.y=(u-b)/y,this.z=(f-h)/y,this.w=Math.acos((l+A+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},yl=class extends is{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(La("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Ks?Qt:ei),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new zn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new tc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},oi=class extends yl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},nc=class extends zn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ka=class extends zn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Hn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],f=r[a+0],A=r[a+1],m=r[a+2],b=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=A,e[t+2]=m,e[t+3]=b;return}if(u!==b||c!==f||l!==A||h!==m){let p=1-o,d=c*f+l*A+h*m+u*b,y=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){let U=Math.sqrt(E),P=Math.atan2(U,d*y);p=Math.sin(p*P)/U,o=Math.sin(o*P)/U}let R=o*y;if(c=c*p+f*R,l=l*p+A*R,h=h*p+m*R,u=u*p+b*R,p===1-o){let U=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=U,l*=U,h*=U,u*=U}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[a],f=r[a+1],A=r[a+2],m=r[a+3];return e[t]=o*m+h*u+c*A-l*f,e[t+1]=c*m+h*f+l*u-o*A,e[t+2]=l*m+h*A+o*f-c*u,e[t+3]=h*m-o*u-c*f-l*A,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(r/2),f=c(n/2),A=c(i/2),m=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*A*m,this._y=l*A*u-f*h*m,this._z=l*h*m+f*A*u,this._w=l*h*u-f*A*m;break;case"YXZ":this._x=f*h*u+l*A*m,this._y=l*A*u-f*h*m,this._z=l*h*m-f*A*u,this._w=l*h*u+f*A*m;break;case"ZXY":this._x=f*h*u-l*A*m,this._y=l*A*u+f*h*m,this._z=l*h*m+f*A*u,this._w=l*h*u-f*A*m;break;case"ZYX":this._x=f*h*u-l*A*m,this._y=l*A*u+f*h*m,this._z=l*h*m-f*A*u,this._w=l*h*u+f*A*m;break;case"YZX":this._x=f*h*u+l*A*m,this._y=l*A*u+f*h*m,this._z=l*h*m-f*A*u,this._w=l*h*u-f*A*m;break;case"XZY":this._x=f*h*u-l*A*m,this._y=l*A*u-f*h*m,this._z=l*h*m+f*A*u,this._w=l*h*u+f*A*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+o+u;if(f>0){let A=.5/Math.sqrt(f+1);this._w=.25/A,this._x=(h-c)*A,this._y=(r-l)*A,this._z=(a-i)*A}else if(n>o&&n>u){let A=2*Math.sqrt(1+n-o-u);this._w=(h-c)/A,this._x=.25*A,this._y=(i+a)/A,this._z=(r+l)/A}else if(o>u){let A=2*Math.sqrt(1+o-n-u);this._w=(r-l)/A,this._x=(i+a)/A,this._y=.25*A,this._z=(c+h)/A}else{let A=2*Math.sqrt(1+u-n-o);this._w=(a-i)/A,this._x=(r+l)/A,this._y=(c+h)/A,this._z=.25*A}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Vn(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let A=1-t;return this._w=A*a+t*this._w,this._x=A*n+t*this._x,this._y=A*i+t*this._y,this._z=A*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Q=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Du.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Du.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=i+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Vc.copy(this).projectOnVector(e),this.sub(Vc)}reflect(e){return this.sub(Vc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Vn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Vc=new Q,Du=new Hn,yi=class{constructor(e=new Q(1/0,1/0,1/0),t=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Bi):Bi.fromBufferAttribute(r,a),Bi.applyMatrix4(e.matrixWorld),this.expandByPoint(Bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),lo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),lo.copy(n.boundingBox)),lo.applyMatrix4(e.matrixWorld),this.union(lo)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Bi),Bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_a),ho.subVectors(this.max,_a),gr.subVectors(e.a,_a),_r.subVectors(e.b,_a),br.subVectors(e.c,_a),hs.subVectors(_r,gr),us.subVectors(br,_r),Ns.subVectors(gr,br);let t=[0,-hs.z,hs.y,0,-us.z,us.y,0,-Ns.z,Ns.y,hs.z,0,-hs.x,us.z,0,-us.x,Ns.z,0,-Ns.x,-hs.y,hs.x,0,-us.y,us.x,0,-Ns.y,Ns.x,0];return!Wc(t,gr,_r,br,ho)||(t=[1,0,0,0,1,0,0,0,1],!Wc(t,gr,_r,br,ho))?!1:(uo.crossVectors(hs,us),t=[uo.x,uo.y,uo.z],Wc(t,gr,_r,br,ho))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Xi=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],Bi=new Q,lo=new yi,gr=new Q,_r=new Q,br=new Q,hs=new Q,us=new Q,Ns=new Q,_a=new Q,ho=new Q,uo=new Q,Us=new Q;function Wc(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Us.fromArray(s,r);let o=i.x*Math.abs(Us.x)+i.y*Math.abs(Us.y)+i.z*Math.abs(Us.z),c=e.dot(Us),l=t.dot(Us),h=n.dot(Us);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Ap=new yi,ba=new Q,Kc=new Q,vn=class{constructor(e=new Q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Ap.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ba.subVectors(e,this.center);let t=ba.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ba,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Kc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ba.copy(e.center).add(Kc)),this.expandByPoint(ba.copy(e.center).sub(Kc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Yi=new Q,qc=new Q,fo=new Q,fs=new Q,Xc=new Q,Ao=new Q,Yc=new Q,qr=class{constructor(e=new Q,t=new Q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yi.copy(this.origin).addScaledVector(this.direction,t),Yi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){qc.copy(e).add(t).multiplyScalar(.5),fo.copy(t).sub(e).normalize(),fs.copy(this.origin).sub(qc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(fo),o=fs.dot(this.direction),c=-fs.dot(fo),l=fs.lengthSq(),h=Math.abs(1-a*a),u,f,A,m;if(h>0)if(u=a*c-o,f=a*o-c,m=r*h,u>=0)if(f>=-m)if(f<=m){let b=1/h;u*=b,f*=b,A=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),A=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),A=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),A=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),A=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),A=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),A=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(qc).addScaledVector(fo,f),A}intersectSphere(e,t){Yi.subVectors(e.center,this.origin);let n=Yi.dot(this.direction),i=Yi.dot(Yi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Yi)!==null}intersectTriangle(e,t,n,i,r){Xc.subVectors(t,e),Ao.subVectors(n,e),Yc.crossVectors(Xc,Ao);let a=this.direction.dot(Yc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;fs.subVectors(this.origin,e);let c=o*this.direction.dot(Ao.crossVectors(fs,Ao));if(c<0)return null;let l=o*this.direction.dot(Xc.cross(fs));if(l<0||c+l>a)return null;let h=-o*fs.dot(Yc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ft=class s{constructor(e,t,n,i,r,a,o,c,l,h,u,f,A,m,b,p){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,u,f,A,m,b,p)}set(e,t,n,i,r,a,o,c,l,h,u,f,A,m,b,p){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=i,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=A,d[7]=m,d[11]=b,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Er.setFromMatrixColumn(e,0).length(),r=1/Er.setFromMatrixColumn(e,1).length(),a=1/Er.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=a*h,A=a*u,m=o*h,b=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=A+m*l,t[5]=f-b*l,t[9]=-o*c,t[2]=b-f*l,t[6]=m+A*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*h,A=c*u,m=l*h,b=l*u;t[0]=f+b*o,t[4]=m*o-A,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=A*o-m,t[6]=b+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*h,A=c*u,m=l*h,b=l*u;t[0]=f-b*o,t[4]=-a*u,t[8]=m+A*o,t[1]=A+m*o,t[5]=a*h,t[9]=b-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*h,A=a*u,m=o*h,b=o*u;t[0]=c*h,t[4]=m*l-A,t[8]=f*l+b,t[1]=c*u,t[5]=b*l+f,t[9]=A*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,A=a*l,m=o*c,b=o*l;t[0]=c*h,t[4]=b-f*u,t[8]=m*u+A,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=A*u+m,t[10]=f-b*u}else if(e.order==="XZY"){let f=a*c,A=a*l,m=o*c,b=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+b,t[5]=a*h,t[9]=A*u-m,t[2]=m*u-A,t[6]=o*h,t[10]=b*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pp,e,mp)}lookAt(e,t,n){let i=this.elements;return fi.subVectors(e,t),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),ds.crossVectors(n,fi),ds.lengthSq()===0&&(Math.abs(n.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),ds.crossVectors(n,fi)),ds.normalize(),po.crossVectors(fi,ds),i[0]=ds.x,i[4]=po.x,i[8]=fi.x,i[1]=ds.y,i[5]=po.y,i[9]=fi.y,i[2]=ds.z,i[6]=po.z,i[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],A=n[13],m=n[2],b=n[6],p=n[10],d=n[14],y=n[3],E=n[7],R=n[11],U=n[15],P=i[0],N=i[4],j=i[8],C=i[12],L=i[1],Z=i[5],ne=i[9],me=i[13],G=i[2],J=i[6],ae=i[10],he=i[14],fe=i[3],Ae=i[7],_e=i[11],ve=i[15];return r[0]=a*P+o*L+c*G+l*fe,r[4]=a*N+o*Z+c*J+l*Ae,r[8]=a*j+o*ne+c*ae+l*_e,r[12]=a*C+o*me+c*he+l*ve,r[1]=h*P+u*L+f*G+A*fe,r[5]=h*N+u*Z+f*J+A*Ae,r[9]=h*j+u*ne+f*ae+A*_e,r[13]=h*C+u*me+f*he+A*ve,r[2]=m*P+b*L+p*G+d*fe,r[6]=m*N+b*Z+p*J+d*Ae,r[10]=m*j+b*ne+p*ae+d*_e,r[14]=m*C+b*me+p*he+d*ve,r[3]=y*P+E*L+R*G+U*fe,r[7]=y*N+E*Z+R*J+U*Ae,r[11]=y*j+E*ne+R*ae+U*_e,r[15]=y*C+E*me+R*he+U*ve,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],A=e[14],m=e[3],b=e[7],p=e[11],d=e[15];return m*(+r*c*u-i*l*u-r*o*f+n*l*f+i*o*A-n*c*A)+b*(+t*c*A-t*l*f+r*a*f-i*a*A+i*l*h-r*c*h)+p*(+t*l*u-t*o*A-r*a*u+n*a*A+r*o*h-n*l*h)+d*(-i*o*h-t*c*u+t*o*f+i*a*u-n*a*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],A=e[11],m=e[12],b=e[13],p=e[14],d=e[15],y=u*p*l-b*f*l+b*c*A-o*p*A-u*c*d+o*f*d,E=m*f*l-h*p*l-m*c*A+a*p*A+h*c*d-a*f*d,R=h*b*l-m*u*l+m*o*A-a*b*A-h*o*d+a*u*d,U=m*u*c-h*b*c-m*o*f+a*b*f+h*o*p-a*u*p,P=t*y+n*E+i*R+r*U;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/P;return e[0]=y*N,e[1]=(b*f*r-u*p*r-b*i*A+n*p*A+u*i*d-n*f*d)*N,e[2]=(o*p*r-b*c*r+b*i*l-n*p*l-o*i*d+n*c*d)*N,e[3]=(u*c*r-o*f*r-u*i*l+n*f*l+o*i*A-n*c*A)*N,e[4]=E*N,e[5]=(h*p*r-m*f*r+m*i*A-t*p*A-h*i*d+t*f*d)*N,e[6]=(m*c*r-a*p*r-m*i*l+t*p*l+a*i*d-t*c*d)*N,e[7]=(a*f*r-h*c*r+h*i*l-t*f*l-a*i*A+t*c*A)*N,e[8]=R*N,e[9]=(m*u*r-h*b*r-m*n*A+t*b*A+h*n*d-t*u*d)*N,e[10]=(a*b*r-m*o*r+m*n*l-t*b*l-a*n*d+t*o*d)*N,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*A-t*o*A)*N,e[12]=U*N,e[13]=(h*b*i-m*u*i+m*n*f-t*b*f-h*n*p+t*u*p)*N,e[14]=(m*o*i-a*b*i-m*n*c+t*b*c+a*n*p-t*o*p)*N,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*f+t*o*f)*N,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,f=r*l,A=r*h,m=r*u,b=a*h,p=a*u,d=o*u,y=c*l,E=c*h,R=c*u,U=n.x,P=n.y,N=n.z;return i[0]=(1-(b+d))*U,i[1]=(A+R)*U,i[2]=(m-E)*U,i[3]=0,i[4]=(A-R)*P,i[5]=(1-(f+d))*P,i[6]=(p+y)*P,i[7]=0,i[8]=(m+E)*N,i[9]=(p-y)*N,i[10]=(1-(f+b))*N,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Er.set(i[0],i[1],i[2]).length(),a=Er.set(i[4],i[5],i[6]).length(),o=Er.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Ri.copy(this);let l=1/r,h=1/a,u=1/o;return Ri.elements[0]*=l,Ri.elements[1]*=l,Ri.elements[2]*=l,Ri.elements[4]*=h,Ri.elements[5]*=h,Ri.elements[6]*=h,Ri.elements[8]*=u,Ri.elements[9]*=u,Ri.elements[10]*=u,t.setFromRotationMatrix(Ri),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=ns){let c=this.elements,l=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),A,m;if(o===ns)A=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===Zo)A=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=A,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=ns){let c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(a-r),f=(t+e)*l,A=(n+i)*h,m,b;if(o===ns)m=(a+r)*u,b=-2*u;else if(o===Zo)m=r*u,b=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-A,c[2]=0,c[6]=0,c[10]=b,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Er=new Q,Ri=new ft,pp=new Q(0,0,0),mp=new Q(1,1,1),ds=new Q,po=new Q,fi=new Q,Pu=new ft,Lu=new Hn,Xr=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],f=i[6],A=i[10];switch(t){case"XYZ":this._y=Math.asin(Vn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,A),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Vn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,A),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Vn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,A),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Vn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,A),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Vn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,A));break;case"XZY":this._z=Math.asin(-Vn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,A),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Pu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Lu.setFromEuler(this),this.setFromQuaternion(Lu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xr.DEFAULT_ORDER="XYZ";var ic=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},gp=0,Fu=new Q,xr=new Hn,Ji=new ft,mo=new Q,Ea=new Q,_p=new Q,bp=new Hn,Nu=new Q(1,0,0),Uu=new Q(0,1,0),Ou=new Q(0,0,1),Ep={type:"added"},xp={type:"removed"},an=class s extends is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=Pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new Q,t=new Xr,n=new Hn,i=new Q(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ft},normalMatrix:{value:new Lt}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xr.setFromAxisAngle(e,t),this.quaternion.multiply(xr),this}rotateOnWorldAxis(e,t){return xr.setFromAxisAngle(e,t),this.quaternion.premultiply(xr),this}rotateX(e){return this.rotateOnAxis(Nu,e)}rotateY(e){return this.rotateOnAxis(Uu,e)}rotateZ(e){return this.rotateOnAxis(Ou,e)}translateOnAxis(e,t){return Fu.copy(e).applyQuaternion(this.quaternion),this.position.add(Fu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nu,e)}translateY(e){return this.translateOnAxis(Uu,e)}translateZ(e){return this.translateOnAxis(Ou,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ji.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?mo.copy(e):mo.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ea.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ji.lookAt(Ea,mo,this.up):Ji.lookAt(mo,Ea,this.up),this.quaternion.setFromRotationMatrix(Ji),i&&(Ji.extractRotation(i.matrixWorld),xr.setFromRotationMatrix(Ji),this.quaternion.premultiply(xr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Ep)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xp)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ji.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ji.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ji),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ea,e,_p),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ea,bp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,a=i.length;r<a;r++){let o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),A=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),A.length>0&&(n.animations=A),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};an.DEFAULT_UP=new Q(0,1,0);an.DEFAULT_MATRIX_AUTO_UPDATE=!0;an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Di=new Q,ji=new Q,Jc=new Q,Zi=new Q,yr=new Q,vr=new Q,ku=new Q,jc=new Q,Zc=new Q,$c=new Q,go=!1,zs=class s{constructor(e=new Q,t=new Q,n=new Q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Di.subVectors(e,t),i.cross(Di);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Di.subVectors(i,t),ji.subVectors(n,t),Jc.subVectors(e,t);let a=Di.dot(Di),o=Di.dot(ji),c=Di.dot(Jc),l=ji.dot(ji),h=ji.dot(Jc),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,A=(l*c-o*h)*f,m=(a*h-o*c)*f;return r.set(1-A-m,m,A)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Zi)===null?!1:Zi.x>=0&&Zi.y>=0&&Zi.x+Zi.y<=1}static getUV(e,t,n,i,r,a,o,c){return go===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),go=!0),this.getInterpolation(e,t,n,i,r,a,o,c)}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,Zi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zi.x),c.addScaledVector(a,Zi.y),c.addScaledVector(o,Zi.z),c)}static isFrontFacing(e,t,n,i){return Di.subVectors(n,t),ji.subVectors(e,t),Di.cross(ji).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Di.subVectors(this.c,this.b),ji.subVectors(this.a,this.b),Di.cross(ji).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return go===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),go=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;yr.subVectors(i,n),vr.subVectors(r,n),jc.subVectors(e,n);let c=yr.dot(jc),l=vr.dot(jc);if(c<=0&&l<=0)return t.copy(n);Zc.subVectors(e,i);let h=yr.dot(Zc),u=vr.dot(Zc);if(h>=0&&u<=h)return t.copy(i);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(yr,a);$c.subVectors(e,r);let A=yr.dot($c),m=vr.dot($c);if(m>=0&&A<=m)return t.copy(r);let b=A*l-c*m;if(b<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(vr,o);let p=h*m-A*u;if(p<=0&&u-h>=0&&A-m>=0)return ku.subVectors(r,i),o=(u-h)/(u-h+(A-m)),t.copy(i).addScaledVector(ku,o);let d=1/(p+b+f);return a=b*d,o=f*d,t.copy(n).addScaledVector(yr,a).addScaledVector(vr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},As={h:0,s:0,l:0},_o={h:0,s:0,l:0};function el(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Ve=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Kt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Kt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Kt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Kt.workingColorSpace){if(e=nh(e,1),t=Vn(t,0,1),n=Vn(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=el(a,r,e+1/3),this.g=el(a,r,e),this.b=el(a,r,e-1/3)}return Kt.toWorkingColorSpace(this,i),this}setStyle(e,t=Qt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){let n=Kf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gr(e.r),this.g=Gr(e.g),this.b=Gr(e.b),this}copyLinearToSRGB(e){return this.r=Hc(e.r),this.g=Hc(e.g),this.b=Hc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return Kt.fromWorkingColorSpace(qn.copy(this),e),Math.round(Vn(qn.r*255,0,255))*65536+Math.round(Vn(qn.g*255,0,255))*256+Math.round(Vn(qn.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Kt.workingColorSpace){Kt.fromWorkingColorSpace(qn.copy(this),t);let n=qn.r,i=qn.g,r=qn.b,a=Math.max(n,i,r),o=Math.min(n,i,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(qn.copy(this),t),e.r=qn.r,e.g=qn.g,e.b=qn.b,e}getStyle(e=Qt){Kt.fromWorkingColorSpace(qn.copy(this),e);let t=qn.r,n=qn.g,i=qn.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(As),this.setHSL(As.h+e,As.s+t,As.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(As),e.getHSL(_o);let n=Pa(As.h,_o.h,t),i=Pa(As.s,_o.s,t),r=Pa(As.l,_o.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qn=new Ve;Ve.NAMES=Kf;var yp=0,ti=class extends is{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=Pi(),this.name="",this.type="Material",this.blending=Qr,this.side=ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pl,this.blendDst=ml,this.blendEquation=Gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=Go,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pr,this.stencilZFail=pr,this.stencilZPass=pr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qr&&(n.blending=this.blending),this.side!==ki&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==pl&&(n.blendSrc=this.blendSrc),this.blendDst!==ml&&(n.blendDst=this.blendDst),this.blendEquation!==Gs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Go&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==pr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==pr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},An=class extends ti{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Jl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Bn=new Q,bo=new Je,Ft=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=bl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ai,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bo.fromBufferAttribute(this,t),bo.applyMatrix3(e),this.setXY(t,bo.x,bo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bn.fromBufferAttribute(this,t),Bn.applyMatrix3(e),this.setXYZ(t,Bn.x,Bn.y,Bn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bn.fromBufferAttribute(this,t),Bn.applyMatrix4(e),this.setXYZ(t,Bn.x,Bn.y,Bn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bn.fromBufferAttribute(this,t),Bn.applyNormalMatrix(e),this.setXYZ(t,Bn.x,Bn.y,Bn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bn.fromBufferAttribute(this,t),Bn.transformDirection(e),this.setXYZ(t,Bn.x,Bn.y,Bn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Oi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Oi(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Oi(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Oi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Oi(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array),r=tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==bl&&(e.usage=this.usage),e}};var Yr=class extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var sc=class extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ut=class extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}};var vp=0,bi=new ft,tl=new an,Mr=new Q,di=new yi,xa=new yi,Qn=new Q,nn=class s extends is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=Pi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wf(e)?sc:Yr)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bi.makeRotationFromQuaternion(e),this.applyMatrix4(bi),this}rotateX(e){return bi.makeRotationX(e),this.applyMatrix4(bi),this}rotateY(e){return bi.makeRotationY(e),this.applyMatrix4(bi),this}rotateZ(e){return bi.makeRotationZ(e),this.applyMatrix4(bi),this}translate(e,t,n){return bi.makeTranslation(e,t,n),this.applyMatrix4(bi),this}scale(e,t,n){return bi.makeScale(e,t,n),this.applyMatrix4(bi),this}lookAt(e){return tl.lookAt(e),tl.updateMatrix(),this.applyMatrix4(tl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ut(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];di.setFromBufferAttribute(r),this.morphTargetsRelative?(Qn.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(Qn),Qn.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(Qn)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new Q,1/0);return}if(e){let n=this.boundingSphere.center;if(di.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];xa.setFromBufferAttribute(o),this.morphTargetsRelative?(Qn.addVectors(di.min,xa.min),di.expandByPoint(Qn),Qn.addVectors(di.max,xa.max),di.expandByPoint(Qn)):(di.expandByPoint(xa.min),di.expandByPoint(xa.max))}di.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Qn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Qn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Qn.fromBufferAttribute(o,l),c&&(Mr.fromBufferAttribute(e,l),Qn.add(Mr)),i=Math.max(i,n.distanceToSquared(Qn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ft(new Float32Array(4*o),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let L=0;L<o;L++)l[L]=new Q,h[L]=new Q;let u=new Q,f=new Q,A=new Q,m=new Je,b=new Je,p=new Je,d=new Q,y=new Q;function E(L,Z,ne){u.fromArray(i,L*3),f.fromArray(i,Z*3),A.fromArray(i,ne*3),m.fromArray(a,L*2),b.fromArray(a,Z*2),p.fromArray(a,ne*2),f.sub(u),A.sub(u),b.sub(m),p.sub(m);let me=1/(b.x*p.y-p.x*b.y);isFinite(me)&&(d.copy(f).multiplyScalar(p.y).addScaledVector(A,-b.y).multiplyScalar(me),y.copy(A).multiplyScalar(b.x).addScaledVector(f,-p.x).multiplyScalar(me),l[L].add(d),l[Z].add(d),l[ne].add(d),h[L].add(y),h[Z].add(y),h[ne].add(y))}let R=this.groups;R.length===0&&(R=[{start:0,count:n.length}]);for(let L=0,Z=R.length;L<Z;++L){let ne=R[L],me=ne.start,G=ne.count;for(let J=me,ae=me+G;J<ae;J+=3)E(n[J+0],n[J+1],n[J+2])}let U=new Q,P=new Q,N=new Q,j=new Q;function C(L){N.fromArray(r,L*3),j.copy(N);let Z=l[L];U.copy(Z),U.sub(N.multiplyScalar(N.dot(Z))).normalize(),P.crossVectors(j,Z);let me=P.dot(h[L])<0?-1:1;c[L*4]=U.x,c[L*4+1]=U.y,c[L*4+2]=U.z,c[L*4+3]=me}for(let L=0,Z=R.length;L<Z;++L){let ne=R[L],me=ne.start,G=ne.count;for(let J=me,ae=me+G;J<ae;J+=3)C(n[J+0]),C(n[J+1]),C(n[J+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,A=n.count;f<A;f++)n.setXYZ(f,0,0,0);let i=new Q,r=new Q,a=new Q,o=new Q,c=new Q,l=new Q,h=new Q,u=new Q;if(e)for(let f=0,A=e.count;f<A;f+=3){let m=e.getX(f+0),b=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,b),a.fromBufferAttribute(t,p),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,A=t.count;f<A;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Qn.fromBufferAttribute(e,t),Qn.normalize(),e.setXYZ(t,Qn.x,Qn.y,Qn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),A=0,m=0;for(let b=0,p=c.length;b<p;b++){o.isInterleavedBufferAttribute?A=c[b]*o.data.stride+o.offset:A=c[b]*h;for(let d=0;d<h;d++)f[m++]=l[A++]}return new Ft(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],A=e(f,n);c.push(A)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let A=l[u];h.push(A.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,A=u.length;f<A;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qu=new ft,Os=new qr,Eo=new vn,Gu=new Q,Sr=new Q,Cr=new Q,wr=new Q,nl=new Q,xo=new Q,yo=new Je,vo=new Je,Mo=new Je,Hu=new Q,zu=new Q,Vu=new Q,So=new Q,Co=new Q,qe=class extends an{constructor(e=new nn,t=new An){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){xo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(nl.fromBufferAttribute(u,e),a?xo.addScaledVector(nl,h):xo.addScaledVector(nl.sub(t),h))}t.add(xo)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(r),Os.copy(e.ray).recast(e.near),!(Eo.containsPoint(Os.origin)===!1&&(Os.intersectSphere(Eo,Gu)===null||Os.origin.distanceToSquared(Gu)>(e.far-e.near)**2))&&(Qu.copy(r).invert(),Os.copy(e.ray).applyMatrix4(Qu),!(n.boundingBox!==null&&Os.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Os)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,A=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,b=f.length;m<b;m++){let p=f[m],d=a[p.materialIndex],y=Math.max(p.start,A.start),E=Math.min(o.count,Math.min(p.start+p.count,A.start+A.count));for(let R=y,U=E;R<U;R+=3){let P=o.getX(R),N=o.getX(R+1),j=o.getX(R+2);i=wo(this,d,e,n,l,h,u,P,N,j),i&&(i.faceIndex=Math.floor(R/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let m=Math.max(0,A.start),b=Math.min(o.count,A.start+A.count);for(let p=m,d=b;p<d;p+=3){let y=o.getX(p),E=o.getX(p+1),R=o.getX(p+2);i=wo(this,a,e,n,l,h,u,y,E,R),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,b=f.length;m<b;m++){let p=f[m],d=a[p.materialIndex],y=Math.max(p.start,A.start),E=Math.min(c.count,Math.min(p.start+p.count,A.start+A.count));for(let R=y,U=E;R<U;R+=3){let P=R,N=R+1,j=R+2;i=wo(this,d,e,n,l,h,u,P,N,j),i&&(i.faceIndex=Math.floor(R/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let m=Math.max(0,A.start),b=Math.min(c.count,A.start+A.count);for(let p=m,d=b;p<d;p+=3){let y=p,E=p+1,R=p+2;i=wo(this,a,e,n,l,h,u,y,E,R),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}};function Mp(s,e,t,n,i,r,a,o){let c;if(e.side===Fn?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===ki,o),c===null)return null;Co.copy(o),Co.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Co);return l<t.near||l>t.far?null:{distance:l,point:Co.clone(),object:s}}function wo(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,Sr),s.getVertexPosition(c,Cr),s.getVertexPosition(l,wr);let h=Mp(s,e,t,n,Sr,Cr,wr,So);if(h){i&&(yo.fromBufferAttribute(i,o),vo.fromBufferAttribute(i,c),Mo.fromBufferAttribute(i,l),h.uv=zs.getInterpolation(So,Sr,Cr,wr,yo,vo,Mo,new Je)),r&&(yo.fromBufferAttribute(r,o),vo.fromBufferAttribute(r,c),Mo.fromBufferAttribute(r,l),h.uv1=zs.getInterpolation(So,Sr,Cr,wr,yo,vo,Mo,new Je),h.uv2=h.uv1),a&&(Hu.fromBufferAttribute(a,o),zu.fromBufferAttribute(a,c),Vu.fromBufferAttribute(a,l),h.normal=zs.getInterpolation(So,Sr,Cr,wr,Hu,zu,Vu,new Q),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new Q,materialIndex:0};zs.getNormal(Sr,Cr,wr,u.normal),h.face=u}return h}var pn=class s extends nn{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,A=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Ut(l,3)),this.setAttribute("normal",new Ut(h,3)),this.setAttribute("uv",new Ut(u,2));function m(b,p,d,y,E,R,U,P,N,j,C){let L=R/N,Z=U/j,ne=R/2,me=U/2,G=P/2,J=N+1,ae=j+1,he=0,fe=0,Ae=new Q;for(let _e=0;_e<ae;_e++){let ve=_e*Z-me;for(let Qe=0;Qe<J;Qe++){let oe=Qe*L-ne;Ae[b]=oe*y,Ae[p]=ve*E,Ae[d]=G,l.push(Ae.x,Ae.y,Ae.z),Ae[b]=0,Ae[p]=0,Ae[d]=P>0?1:-1,h.push(Ae.x,Ae.y,Ae.z),u.push(Qe/N),u.push(1-_e/j),he+=1}}for(let _e=0;_e<j;_e++)for(let ve=0;ve<N;ve++){let Qe=f+ve+J*_e,oe=f+ve+J*(_e+1),ge=f+(ve+1)+J*(_e+1),I=f+(ve+1)+J*_e;c.push(Qe,oe,I),c.push(oe,ge,I),fe+=6}o.addGroup(A,fe,C),A+=fe,f+=he}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Jr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function $n(s){let e={};for(let t=0;t<s.length;t++){let n=Jr(s[t]);for(let i in n)e[i]=n[i]}return e}function Sp(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function qf(s){return s.getRenderTarget()===null?s.outputColorSpace:Kt.workingColorSpace}var Cp={clone:Jr,merge:$n},wp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ip=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xn=class extends ti{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wp,this.fragmentShader=Ip,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Jr(e.uniforms),this.uniformsGroups=Sp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},rc=class extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=ns}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},bn=class extends rc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Kr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Kr*2*Math.atan(Math.tan(Da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Da*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ir=-90,Tr=1,vl=class extends an{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new bn(Ir,Tr,e,t);i.layers=this.layers,this.add(i);let r=new bn(Ir,Tr,e,t);r.layers=this.layers,this.add(r);let a=new bn(Ir,Tr,e,t);a.layers=this.layers,this.add(a);let o=new bn(Ir,Tr,e,t);o.layers=this.layers,this.add(o);let c=new bn(Ir,Tr,e,t);c.layers=this.layers,this.add(c);let l=new bn(Ir,Tr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===ns)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Zo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),A=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,f,A),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ac=class extends zn{constructor(e,t,n,i,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:qs,super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ml=class extends oi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(La("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ks?Qt:ei),this.texture=new ac(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new pn(5,5,5),r=new Xn({name:"CubemapFromEquirect",uniforms:Jr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fn,blending:gs});r.uniforms.tEquirect.value=t;let a=new qe(i,r),o=t.minFilter;return t.minFilter===xi&&(t.minFilter=dn),new vl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}},il=new Q,Tp=new Q,Bp=new Lt,ts=class{constructor(e=new Q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=il.subVectors(n,t).cross(Tp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(il),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Bp.getNormalMatrix(e),i=this.coplanarPoint(il).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ks=new vn,Io=new Q,Qa=class{constructor(e=new ts,t=new ts,n=new ts,i=new ts,r=new ts,a=new ts){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ns){let n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],h=i[5],u=i[6],f=i[7],A=i[8],m=i[9],b=i[10],p=i[11],d=i[12],y=i[13],E=i[14],R=i[15];if(n[0].setComponents(c-r,f-l,p-A,R-d).normalize(),n[1].setComponents(c+r,f+l,p+A,R+d).normalize(),n[2].setComponents(c+a,f+h,p+m,R+y).normalize(),n[3].setComponents(c-a,f-h,p-m,R-y).normalize(),n[4].setComponents(c-o,f-u,p-b,R-E).normalize(),t===ns)n[5].setComponents(c+o,f+u,p+b,R+E).normalize();else if(t===Zo)n[5].setComponents(o,u,b,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ks.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ks.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ks)}intersectsSprite(e){return ks.center.set(0,0,0),ks.radius=.7071067811865476,ks.applyMatrix4(e.matrixWorld),this.intersectsSphere(ks)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Io.x=i.normal.x>0?e.max.x:e.min.x,Io.y=i.normal.y>0?e.max.y:e.min.y,Io.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Io)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Xf(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Rp(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,h){let u=l.array,f=l.usage,A=u.byteLength,m=s.createBuffer();s.bindBuffer(h,m),s.bufferData(h,u,f),l.onUploadCallback();let b;if(u instanceof Float32Array)b=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)b=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else b=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)b=s.SHORT;else if(u instanceof Uint32Array)b=s.UNSIGNED_INT;else if(u instanceof Int32Array)b=s.INT;else if(u instanceof Int8Array)b=s.BYTE;else if(u instanceof Uint8Array)b=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)b=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:b,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:A}}function r(l,h,u){let f=h.array,A=h._updateRange,m=h.updateRanges;if(s.bindBuffer(u,l),A.count===-1&&m.length===0&&s.bufferSubData(u,0,f),m.length!==0){for(let b=0,p=m.length;b<p;b++){let d=m[b];t?s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}A.count!==-1&&(t?s.bufferSubData(u,A.offset*f.BYTES_PER_ELEMENT,f,A.offset,A.count):s.bufferSubData(u,A.offset*f.BYTES_PER_ELEMENT,f.subarray(A.offset,A.offset+A.count)),A.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:a,remove:o,update:c}}var vi=class s extends nn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,f=t/c,A=[],m=[],b=[],p=[];for(let d=0;d<h;d++){let y=d*f-a;for(let E=0;E<l;E++){let R=E*u-r;m.push(R,-y,0),b.push(0,0,1),p.push(E/o),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let y=0;y<o;y++){let E=y+l*d,R=y+l*(d+1),U=y+1+l*(d+1),P=y+1+l*d;A.push(E,R,P),A.push(R,U,P)}this.setIndex(A),this.setAttribute("position",new Ut(m,3)),this.setAttribute("normal",new Ut(b,3)),this.setAttribute("uv",new Ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Dp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pp=`#ifdef USE_ALPHAHASH
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
#endif`,Lp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Np=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Up=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Op=`#ifdef USE_AOMAP
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
#endif`,kp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qp=`#ifdef USE_BATCHING
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
#endif`,Gp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Hp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wp=`#ifdef USE_IRIDESCENCE
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
#endif`,Kp=`#ifdef USE_BUMPMAP
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
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$p=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,em=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,tm=`#define PI 3.141592653589793
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
} // validated`,nm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,im=`vec3 transformedNormal = objectNormal;
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
#endif`,sm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,am=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,om=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cm="gl_FragColor = linearToOutputTexel( gl_FragColor );",lm=`
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
}`,hm=`#ifdef USE_ENVMAP
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
#endif`,um=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fm=`#ifdef USE_ENVMAP
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
#endif`,dm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Am=`#ifdef USE_ENVMAP
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
#endif`,pm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_m=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bm=`#ifdef USE_GRADIENTMAP
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
}`,Em=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,xm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ym=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mm=`uniform bool receiveShadow;
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
#endif`,Sm=`#ifdef USE_ENVMAP
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
#endif`,Cm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Im=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bm=`PhysicalMaterial material;
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
#endif`,Rm=`struct PhysicalMaterial {
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
}`,Dm=`
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
#endif`,Pm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Um=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Om=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,km=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Hm=`#if defined( USE_POINTS_UV )
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
#endif`,zm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wm=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Km=`#ifdef USE_MORPHNORMALS
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
#endif`,qm=`#ifdef USE_MORPHTARGETS
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
#endif`,Xm=`#ifdef USE_MORPHTARGETS
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
#endif`,Ym=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$m=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,eg=`#ifdef USE_NORMALMAP
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
#endif`,tg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ng=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ig=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ag=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,og=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ug=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ag=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,mg=`float getShadowMask() {
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
}`,gg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_g=`#ifdef USE_SKINNING
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
#endif`,bg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Eg=`#ifdef USE_SKINNING
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
#endif`,xg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sg=`#ifdef USE_TRANSMISSION
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
#endif`,Cg=`#ifdef USE_TRANSMISSION
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
#endif`,wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Rg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Dg=`uniform sampler2D t2D;
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
}`,Pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ng=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ug=`#include <common>
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
}`,Og=`#if DEPTH_PACKING == 3200
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
}`,kg=`#define DISTANCE
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
}`,Qg=`#define DISTANCE
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
}`,Gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zg=`uniform float scale;
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
}`,Vg=`uniform vec3 diffuse;
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
}`,Wg=`#include <common>
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
}`,Kg=`uniform vec3 diffuse;
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
}`,qg=`#define LAMBERT
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
}`,Xg=`#define LAMBERT
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
}`,Yg=`#define MATCAP
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
}`,Jg=`#define MATCAP
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
}`,jg=`#define NORMAL
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
}`,Zg=`#define NORMAL
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
}`,$g=`#define PHONG
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
}`,e0=`#define PHONG
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
}`,t0=`#define STANDARD
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
}`,n0=`#define STANDARD
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
}`,i0=`#define TOON
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
}`,s0=`#define TOON
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
}`,r0=`uniform float size;
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
}`,a0=`uniform vec3 diffuse;
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
}`,o0=`#include <common>
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
}`,c0=`uniform vec3 color;
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
}`,l0=`uniform float rotation;
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
}`,h0=`uniform vec3 diffuse;
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
}`,Pt={alphahash_fragment:Dp,alphahash_pars_fragment:Pp,alphamap_fragment:Lp,alphamap_pars_fragment:Fp,alphatest_fragment:Np,alphatest_pars_fragment:Up,aomap_fragment:Op,aomap_pars_fragment:kp,batching_pars_vertex:Qp,batching_vertex:Gp,begin_vertex:Hp,beginnormal_vertex:zp,bsdfs:Vp,iridescence_fragment:Wp,bumpmap_pars_fragment:Kp,clipping_planes_fragment:qp,clipping_planes_pars_fragment:Xp,clipping_planes_pars_vertex:Yp,clipping_planes_vertex:Jp,color_fragment:jp,color_pars_fragment:Zp,color_pars_vertex:$p,color_vertex:em,common:tm,cube_uv_reflection_fragment:nm,defaultnormal_vertex:im,displacementmap_pars_vertex:sm,displacementmap_vertex:rm,emissivemap_fragment:am,emissivemap_pars_fragment:om,colorspace_fragment:cm,colorspace_pars_fragment:lm,envmap_fragment:hm,envmap_common_pars_fragment:um,envmap_pars_fragment:fm,envmap_pars_vertex:dm,envmap_physical_pars_fragment:Sm,envmap_vertex:Am,fog_vertex:pm,fog_pars_vertex:mm,fog_fragment:gm,fog_pars_fragment:_m,gradientmap_pars_fragment:bm,lightmap_fragment:Em,lightmap_pars_fragment:xm,lights_lambert_fragment:ym,lights_lambert_pars_fragment:vm,lights_pars_begin:Mm,lights_toon_fragment:Cm,lights_toon_pars_fragment:wm,lights_phong_fragment:Im,lights_phong_pars_fragment:Tm,lights_physical_fragment:Bm,lights_physical_pars_fragment:Rm,lights_fragment_begin:Dm,lights_fragment_maps:Pm,lights_fragment_end:Lm,logdepthbuf_fragment:Fm,logdepthbuf_pars_fragment:Nm,logdepthbuf_pars_vertex:Um,logdepthbuf_vertex:Om,map_fragment:km,map_pars_fragment:Qm,map_particle_fragment:Gm,map_particle_pars_fragment:Hm,metalnessmap_fragment:zm,metalnessmap_pars_fragment:Vm,morphcolor_vertex:Wm,morphnormal_vertex:Km,morphtarget_pars_vertex:qm,morphtarget_vertex:Xm,normal_fragment_begin:Ym,normal_fragment_maps:Jm,normal_pars_fragment:jm,normal_pars_vertex:Zm,normal_vertex:$m,normalmap_pars_fragment:eg,clearcoat_normal_fragment_begin:tg,clearcoat_normal_fragment_maps:ng,clearcoat_pars_fragment:ig,iridescence_pars_fragment:sg,opaque_fragment:rg,packing:ag,premultiplied_alpha_fragment:og,project_vertex:cg,dithering_fragment:lg,dithering_pars_fragment:hg,roughnessmap_fragment:ug,roughnessmap_pars_fragment:fg,shadowmap_pars_fragment:dg,shadowmap_pars_vertex:Ag,shadowmap_vertex:pg,shadowmask_pars_fragment:mg,skinbase_vertex:gg,skinning_pars_vertex:_g,skinning_vertex:bg,skinnormal_vertex:Eg,specularmap_fragment:xg,specularmap_pars_fragment:yg,tonemapping_fragment:vg,tonemapping_pars_fragment:Mg,transmission_fragment:Sg,transmission_pars_fragment:Cg,uv_pars_fragment:wg,uv_pars_vertex:Ig,uv_vertex:Tg,worldpos_vertex:Bg,background_vert:Rg,background_frag:Dg,backgroundCube_vert:Pg,backgroundCube_frag:Lg,cube_vert:Fg,cube_frag:Ng,depth_vert:Ug,depth_frag:Og,distanceRGBA_vert:kg,distanceRGBA_frag:Qg,equirect_vert:Gg,equirect_frag:Hg,linedashed_vert:zg,linedashed_frag:Vg,meshbasic_vert:Wg,meshbasic_frag:Kg,meshlambert_vert:qg,meshlambert_frag:Xg,meshmatcap_vert:Yg,meshmatcap_frag:Jg,meshnormal_vert:jg,meshnormal_frag:Zg,meshphong_vert:$g,meshphong_frag:e0,meshphysical_vert:t0,meshphysical_frag:n0,meshtoon_vert:i0,meshtoon_frag:s0,points_vert:r0,points_frag:a0,shadow_vert:o0,shadow_frag:c0,sprite_vert:l0,sprite_frag:h0},Ue={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new Je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new Je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Ui={basic:{uniforms:$n([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:Pt.meshbasic_vert,fragmentShader:Pt.meshbasic_frag},lambert:{uniforms:$n([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Pt.meshlambert_vert,fragmentShader:Pt.meshlambert_frag},phong:{uniforms:$n([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:Pt.meshphong_vert,fragmentShader:Pt.meshphong_frag},standard:{uniforms:$n([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag},toon:{uniforms:$n([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Pt.meshtoon_vert,fragmentShader:Pt.meshtoon_frag},matcap:{uniforms:$n([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:Pt.meshmatcap_vert,fragmentShader:Pt.meshmatcap_frag},points:{uniforms:$n([Ue.points,Ue.fog]),vertexShader:Pt.points_vert,fragmentShader:Pt.points_frag},dashed:{uniforms:$n([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Pt.linedashed_vert,fragmentShader:Pt.linedashed_frag},depth:{uniforms:$n([Ue.common,Ue.displacementmap]),vertexShader:Pt.depth_vert,fragmentShader:Pt.depth_frag},normal:{uniforms:$n([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:Pt.meshnormal_vert,fragmentShader:Pt.meshnormal_frag},sprite:{uniforms:$n([Ue.sprite,Ue.fog]),vertexShader:Pt.sprite_vert,fragmentShader:Pt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Pt.background_vert,fragmentShader:Pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Pt.backgroundCube_vert,fragmentShader:Pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Pt.cube_vert,fragmentShader:Pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Pt.equirect_vert,fragmentShader:Pt.equirect_frag},distanceRGBA:{uniforms:$n([Ue.common,Ue.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Pt.distanceRGBA_vert,fragmentShader:Pt.distanceRGBA_frag},shadow:{uniforms:$n([Ue.lights,Ue.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Pt.shadow_vert,fragmentShader:Pt.shadow_frag}};Ui.physical={uniforms:$n([Ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new Je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new Je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new Je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag};var To={r:0,b:0,g:0};function u0(s,e,t,n,i,r,a){let o=new Ve(0),c=r===!0?0:1,l,h,u=null,f=0,A=null;function m(p,d){let y=!1,E=d.isScene===!0?d.background:null;E&&E.isTexture&&(E=(d.backgroundBlurriness>0?t:e).get(E)),E===null?b(o,c):E&&E.isColor&&(b(E,1),y=!0);let R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||y)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),E&&(E.isCubeTexture||E.mapping===yc)?(h===void 0&&(h=new qe(new pn(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:Jr(Ui.backgroundCube.uniforms),vertexShader:Ui.backgroundCube.vertexShader,fragmentShader:Ui.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(U,P,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=Kt.getTransfer(E.colorSpace)!==hn,(u!==E||f!==E.version||A!==s.toneMapping)&&(h.material.needsUpdate=!0,u=E,f=E.version,A=s.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new qe(new vi(2,2),new Xn({name:"BackgroundMaterial",uniforms:Jr(Ui.background.uniforms),vertexShader:Ui.background.vertexShader,fragmentShader:Ui.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(E.colorSpace)!==hn,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||f!==E.version||A!==s.toneMapping)&&(l.material.needsUpdate=!0,u=E,f=E.version,A=s.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function b(p,d){p.getRGB(To,qf(s)),n.buffers.color.setClear(To.r,To.g,To.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(p,d=1){o.set(p),c=d,b(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,b(o,c)},render:m}}function f0(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=p(null),l=c,h=!1;function u(G,J,ae,he,fe){let Ae=!1;if(a){let _e=b(he,ae,J);l!==_e&&(l=_e,A(l.object)),Ae=d(G,he,ae,fe),Ae&&y(G,he,ae,fe)}else{let _e=J.wireframe===!0;(l.geometry!==he.id||l.program!==ae.id||l.wireframe!==_e)&&(l.geometry=he.id,l.program=ae.id,l.wireframe=_e,Ae=!0)}fe!==null&&t.update(fe,s.ELEMENT_ARRAY_BUFFER),(Ae||h)&&(h=!1,j(G,J,ae,he),fe!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(fe).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function A(G){return n.isWebGL2?s.bindVertexArray(G):r.bindVertexArrayOES(G)}function m(G){return n.isWebGL2?s.deleteVertexArray(G):r.deleteVertexArrayOES(G)}function b(G,J,ae){let he=ae.wireframe===!0,fe=o[G.id];fe===void 0&&(fe={},o[G.id]=fe);let Ae=fe[J.id];Ae===void 0&&(Ae={},fe[J.id]=Ae);let _e=Ae[he];return _e===void 0&&(_e=p(f()),Ae[he]=_e),_e}function p(G){let J=[],ae=[],he=[];for(let fe=0;fe<i;fe++)J[fe]=0,ae[fe]=0,he[fe]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:J,enabledAttributes:ae,attributeDivisors:he,object:G,attributes:{},index:null}}function d(G,J,ae,he){let fe=l.attributes,Ae=J.attributes,_e=0,ve=ae.getAttributes();for(let Qe in ve)if(ve[Qe].location>=0){let ge=fe[Qe],I=Ae[Qe];if(I===void 0&&(Qe==="instanceMatrix"&&G.instanceMatrix&&(I=G.instanceMatrix),Qe==="instanceColor"&&G.instanceColor&&(I=G.instanceColor)),ge===void 0||ge.attribute!==I||I&&ge.data!==I.data)return!0;_e++}return l.attributesNum!==_e||l.index!==he}function y(G,J,ae,he){let fe={},Ae=J.attributes,_e=0,ve=ae.getAttributes();for(let Qe in ve)if(ve[Qe].location>=0){let ge=Ae[Qe];ge===void 0&&(Qe==="instanceMatrix"&&G.instanceMatrix&&(ge=G.instanceMatrix),Qe==="instanceColor"&&G.instanceColor&&(ge=G.instanceColor));let I={};I.attribute=ge,ge&&ge.data&&(I.data=ge.data),fe[Qe]=I,_e++}l.attributes=fe,l.attributesNum=_e,l.index=he}function E(){let G=l.newAttributes;for(let J=0,ae=G.length;J<ae;J++)G[J]=0}function R(G){U(G,0)}function U(G,J){let ae=l.newAttributes,he=l.enabledAttributes,fe=l.attributeDivisors;ae[G]=1,he[G]===0&&(s.enableVertexAttribArray(G),he[G]=1),fe[G]!==J&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](G,J),fe[G]=J)}function P(){let G=l.newAttributes,J=l.enabledAttributes;for(let ae=0,he=J.length;ae<he;ae++)J[ae]!==G[ae]&&(s.disableVertexAttribArray(ae),J[ae]=0)}function N(G,J,ae,he,fe,Ae,_e){_e===!0?s.vertexAttribIPointer(G,J,ae,fe,Ae):s.vertexAttribPointer(G,J,ae,he,fe,Ae)}function j(G,J,ae,he){if(n.isWebGL2===!1&&(G.isInstancedMesh||he.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;E();let fe=he.attributes,Ae=ae.getAttributes(),_e=J.defaultAttributeValues;for(let ve in Ae){let Qe=Ae[ve];if(Qe.location>=0){let oe=fe[ve];if(oe===void 0&&(ve==="instanceMatrix"&&G.instanceMatrix&&(oe=G.instanceMatrix),ve==="instanceColor"&&G.instanceColor&&(oe=G.instanceColor)),oe!==void 0){let ge=oe.normalized,I=oe.itemSize,H=t.get(oe);if(H===void 0)continue;let W=H.buffer,z=H.type,be=H.bytesPerElement,Y=n.isWebGL2===!0&&(z===s.INT||z===s.UNSIGNED_INT||oe.gpuType===Ff);if(oe.isInterleavedBufferAttribute){let ue=oe.data,O=ue.stride,ot=oe.offset;if(ue.isInstancedInterleavedBuffer){for(let Ie=0;Ie<Qe.locationSize;Ie++)U(Qe.location+Ie,ue.meshPerAttribute);G.isInstancedMesh!==!0&&he._maxInstanceCount===void 0&&(he._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Ie=0;Ie<Qe.locationSize;Ie++)R(Qe.location+Ie);s.bindBuffer(s.ARRAY_BUFFER,W);for(let Ie=0;Ie<Qe.locationSize;Ie++)N(Qe.location+Ie,I/Qe.locationSize,z,ge,O*be,(ot+I/Qe.locationSize*Ie)*be,Y)}else{if(oe.isInstancedBufferAttribute){for(let ue=0;ue<Qe.locationSize;ue++)U(Qe.location+ue,oe.meshPerAttribute);G.isInstancedMesh!==!0&&he._maxInstanceCount===void 0&&(he._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ue=0;ue<Qe.locationSize;ue++)R(Qe.location+ue);s.bindBuffer(s.ARRAY_BUFFER,W);for(let ue=0;ue<Qe.locationSize;ue++)N(Qe.location+ue,I/Qe.locationSize,z,ge,I*be,I/Qe.locationSize*ue*be,Y)}}else if(_e!==void 0){let ge=_e[ve];if(ge!==void 0)switch(ge.length){case 2:s.vertexAttrib2fv(Qe.location,ge);break;case 3:s.vertexAttrib3fv(Qe.location,ge);break;case 4:s.vertexAttrib4fv(Qe.location,ge);break;default:s.vertexAttrib1fv(Qe.location,ge)}}}}P()}function C(){ne();for(let G in o){let J=o[G];for(let ae in J){let he=J[ae];for(let fe in he)m(he[fe].object),delete he[fe];delete J[ae]}delete o[G]}}function L(G){if(o[G.id]===void 0)return;let J=o[G.id];for(let ae in J){let he=J[ae];for(let fe in he)m(he[fe].object),delete he[fe];delete J[ae]}delete o[G.id]}function Z(G){for(let J in o){let ae=o[J];if(ae[G.id]===void 0)continue;let he=ae[G.id];for(let fe in he)m(he[fe].object),delete he[fe];delete ae[G.id]}}function ne(){me(),h=!0,l!==c&&(l=c,A(l.object))}function me(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:ne,resetDefaultState:me,dispose:C,releaseStatesOfGeometry:L,releaseStatesOfProgram:Z,initAttributes:E,enableAttribute:R,disableUnusedAttributes:P}}function d0(s,e,t,n){let i=n.isWebGL2,r;function a(h){r=h}function o(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,f){if(f===0)return;let A,m;if(i)A=s,m="drawArraysInstanced";else if(A=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",A===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}A[m](r,h,u,f),t.update(u,r,f)}function l(h,u,f){if(f===0)return;let A=e.get("WEBGL_multi_draw");if(A===null)for(let m=0;m<f;m++)this.render(h[m],u[m]);else{A.multiDrawArraysWEBGL(r,h,0,u,0,f);let m=0;for(let b=0;b<f;b++)m+=u[b];t.update(m,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function A0(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let N=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(N){if(N==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext!="undefined"&&s.constructor.name==="WebGL2RenderingContext",o=t.precision!==void 0?t.precision:"highp",c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);let l=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),b=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),d=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=f>0,R=a||e.has("OES_texture_float"),U=E&&R,P=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:A,maxCubemapSize:m,maxAttributes:b,maxVertexUniforms:p,maxVaryings:d,maxFragmentUniforms:y,vertexTextures:E,floatFragmentTextures:R,floatVertexTextures:U,maxSamples:P}}function p0(s){let e=this,t=null,n=0,i=!1,r=!1,a=new ts,o=new Lt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let A=u.length!==0||f||n!==0||i;return i=f,n=u.length,A},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,A){let m=u.clippingPlanes,b=u.clipIntersection,p=u.clipShadows,d=s.get(u);if(!i||m===null||m.length===0||r&&!p)r?h(null):l();else{let y=r?0:n,E=y*4,R=d.clippingState||null;c.value=R,R=h(m,f,E,A);for(let U=0;U!==E;++U)R[U]=t[U];d.clippingState=R,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,A,m){let b=u!==null?u.length:0,p=null;if(b!==0){if(p=c.value,m!==!0||p===null){let d=A+b*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<d)&&(p=new Float32Array(d));for(let E=0,R=A;E!==b;++E,R+=4)a.copy(u[E]).applyMatrix4(y,o),a.normal.toArray(p,R),p[R+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,p}}function m0(s){let e=new WeakMap;function t(a,o){return o===gl?a.mapping=qs:o===_l&&(a.mapping=zr),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===gl||o===_l)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new Ml(c.height/2);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var bs=class extends rc{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Or=4,Wu=[.125,.215,.35,.446,.526,.582],Hs=20,sl=new bs,Ku=new Ve,rl=null,al=0,ol=0,Qs=(1+Math.sqrt(5))/2,Br=1/Qs,qu=[new Q(1,1,1),new Q(-1,1,1),new Q(1,1,-1),new Q(-1,1,-1),new Q(0,Qs,Br),new Q(0,Qs,-Br),new Q(Br,0,Qs),new Q(-Br,0,Qs),new Q(Qs,Br,0),new Q(-Qs,Br,0)],Ys=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){rl=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),ol=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ju(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(rl,al,ol),e.scissorTest=!1,Bo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qs||e.mapping===zr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rl=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),ol=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:Qi,format:Cn,colorSpace:wn,depthBuffer:!1},i=Xu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xu(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=g0(r)),this._blurMaterial=_0(r,e,t)}return i}_compileMaterial(e){let t=new qe(this._lodPlanes[0],e);this._renderer.compile(t,sl)}_sceneToCubeUV(e,t,n,i){let o=new bn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Ku),h.toneMapping=_s,h.autoClear=!1;let A=new An({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1}),m=new qe(new pn,A),b=!1,p=e.background;p?p.isColor&&(A.color.copy(p),e.background=null,b=!0):(A.color.copy(Ku),b=!0);for(let d=0;d<6;d++){let y=d%3;y===0?(o.up.set(0,c[d],0),o.lookAt(l[d],0,0)):y===1?(o.up.set(0,0,c[d]),o.lookAt(0,l[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,l[d]));let E=this._cubeSize;Bo(i,y*E,d>2?E:0,E,E),h.setRenderTarget(i),b&&h.render(m,o),h.render(e,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===qs||e.mapping===zr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ju()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yu());let r=i?this._cubemapMaterial:this._equirectMaterial,a=new qe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Bo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,sl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=qu[(i-1)%qu.length];this._blur(e,i-1,i,r,a)}t.autoClear=n}_blur(e,t,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new qe(this._lodPlanes[i],l),f=l.uniforms,A=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*A):2*Math.PI/(2*Hs-1),b=r/m,p=isFinite(r)?1+Math.floor(h*b):Hs;p>Hs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Hs}`);let d=[],y=0;for(let N=0;N<Hs;++N){let j=N/b,C=Math.exp(-j*j/2);d.push(C),N===0?y+=C:N<p&&(y+=2*C)}for(let N=0;N<d.length;N++)d[N]=d[N]/y;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:E}=this;f.dTheta.value=m,f.mipInt.value=E-n;let R=this._sizeLods[i],U=3*R*(i>E-Or?i-E+Or:0),P=4*(this._cubeSize-R);Bo(t,U,P,3*R,2*R),c.setRenderTarget(t),c.render(u,sl)}};function g0(s){let e=[],t=[],n=[],i=s,r=s-Or+1+Wu.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);t.push(o);let c=1/o;a>s-Or?c=Wu[a-s+Or-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],A=6,m=6,b=3,p=2,d=1,y=new Float32Array(b*m*A),E=new Float32Array(p*m*A),R=new Float32Array(d*m*A);for(let P=0;P<A;P++){let N=P%3*2/3-1,j=P>2?0:-1,C=[N,j,0,N+2/3,j,0,N+2/3,j+1,0,N,j,0,N+2/3,j+1,0,N,j+1,0];y.set(C,b*m*P),E.set(f,p*m*P);let L=[P,P,P,P,P,P];R.set(L,d*m*P)}let U=new nn;U.setAttribute("position",new Ft(y,b)),U.setAttribute("uv",new Ft(E,p)),U.setAttribute("faceIndex",new Ft(R,d)),e.push(U),i>Or&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Xu(s,e,t){let n=new oi(s,e,t);return n.texture.mapping=yc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bo(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function _0(s,e,t){let n=new Float32Array(Hs),i=new Q(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:Hs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ih(),fragmentShader:`

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
		`,blending:gs,depthTest:!1,depthWrite:!1})}function Yu(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ih(),fragmentShader:`

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
		`,blending:gs,depthTest:!1,depthWrite:!1})}function Ju(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ih(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gs,depthTest:!1,depthWrite:!1})}function ih(){return`

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
	`}function b0(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===gl||c===_l,h=c===qs||c===zr;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Ys(s)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{let u=o.image;if(l&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Ys(s));let f=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function i(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function E0(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function x0(s,e,t,n){let i={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);for(let m in f.morphAttributes){let b=f.morphAttributes[m];for(let p=0,d=b.length;p<d;p++)e.remove(b[p])}f.removeEventListener("dispose",a),delete i[f.id];let A=r.get(f);A&&(e.remove(A),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let m in f)e.update(f[m],s.ARRAY_BUFFER);let A=u.morphAttributes;for(let m in A){let b=A[m];for(let p=0,d=b.length;p<d;p++)e.update(b[p],s.ARRAY_BUFFER)}}function l(u){let f=[],A=u.index,m=u.attributes.position,b=0;if(A!==null){let y=A.array;b=A.version;for(let E=0,R=y.length;E<R;E+=3){let U=y[E+0],P=y[E+1],N=y[E+2];f.push(U,P,P,N,N,U)}}else if(m!==void 0){let y=m.array;b=m.version;for(let E=0,R=y.length/3-1;E<R;E+=3){let U=E+0,P=E+1,N=E+2;f.push(U,P,P,N,N,U)}}else return;let p=new(Wf(f)?sc:Yr)(f,1);p.version=b;let d=r.get(u);d&&e.remove(d),r.set(u,p)}function h(u){let f=r.get(u);if(f){let A=u.index;A!==null&&f.version<A.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function y0(s,e,t,n){let i=n.isWebGL2,r;function a(A){r=A}let o,c;function l(A){o=A.type,c=A.bytesPerElement}function h(A,m){s.drawElements(r,m,o,A*c),t.update(m,r,1)}function u(A,m,b){if(b===0)return;let p,d;if(i)p=s,d="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](r,m,o,A*c,b),t.update(m,r,b)}function f(A,m,b){if(b===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<b;d++)this.render(A[d]/c,m[d]);else{p.multiDrawElementsWEBGL(r,m,0,o,A,0,b);let d=0;for(let y=0;y<b;y++)d+=m[y];t.update(d,r,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function v0(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function M0(s,e){return s[0]-e[0]}function S0(s,e){return Math.abs(e[1])-Math.abs(s[1])}function C0(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,a=new Rt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,u){let f=l.morphTargetInfluences;if(e.isWebGL2===!0){let A=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,m=A!==void 0?A.length:0,b=r.get(h);if(b===void 0||b.count!==m){let G=function(){ne.dispose(),r.delete(h),h.removeEventListener("dispose",G)};b!==void 0&&b.texture.dispose();let y=h.morphAttributes.position!==void 0,E=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,U=h.morphAttributes.position||[],P=h.morphAttributes.normal||[],N=h.morphAttributes.color||[],j=0;y===!0&&(j=1),E===!0&&(j=2),R===!0&&(j=3);let C=h.attributes.position.count*j,L=1;C>e.maxTextureSize&&(L=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);let Z=new Float32Array(C*L*4*m),ne=new nc(Z,C,L,m);ne.type=ai,ne.needsUpdate=!0;let me=j*4;for(let J=0;J<m;J++){let ae=U[J],he=P[J],fe=N[J],Ae=C*L*4*J;for(let _e=0;_e<ae.count;_e++){let ve=_e*me;y===!0&&(a.fromBufferAttribute(ae,_e),Z[Ae+ve+0]=a.x,Z[Ae+ve+1]=a.y,Z[Ae+ve+2]=a.z,Z[Ae+ve+3]=0),E===!0&&(a.fromBufferAttribute(he,_e),Z[Ae+ve+4]=a.x,Z[Ae+ve+5]=a.y,Z[Ae+ve+6]=a.z,Z[Ae+ve+7]=0),R===!0&&(a.fromBufferAttribute(fe,_e),Z[Ae+ve+8]=a.x,Z[Ae+ve+9]=a.y,Z[Ae+ve+10]=a.z,Z[Ae+ve+11]=fe.itemSize===4?a.w:1)}}b={count:m,texture:ne,size:new Je(C,L)},r.set(h,b),h.addEventListener("dispose",G)}let p=0;for(let y=0;y<f.length;y++)p+=f[y];let d=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",d),u.getUniforms().setValue(s,"morphTargetInfluences",f),u.getUniforms().setValue(s,"morphTargetsTexture",b.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",b.size)}else{let A=f===void 0?0:f.length,m=n[h.id];if(m===void 0||m.length!==A){m=[];for(let E=0;E<A;E++)m[E]=[E,0];n[h.id]=m}for(let E=0;E<A;E++){let R=m[E];R[0]=E,R[1]=f[E]}m.sort(S0);for(let E=0;E<8;E++)E<A&&m[E][1]?(o[E][0]=m[E][0],o[E][1]=m[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort(M0);let b=h.morphAttributes.position,p=h.morphAttributes.normal,d=0;for(let E=0;E<8;E++){let R=o[E],U=R[0],P=R[1];U!==Number.MAX_SAFE_INTEGER&&P?(b&&h.getAttribute("morphTarget"+E)!==b[U]&&h.setAttribute("morphTarget"+E,b[U]),p&&h.getAttribute("morphNormal"+E)!==p[U]&&h.setAttribute("morphNormal"+E,p[U]),i[E]=P,d+=P):(b&&h.hasAttribute("morphTarget"+E)===!0&&h.deleteAttribute("morphTarget"+E),p&&h.hasAttribute("morphNormal"+E)===!0&&h.deleteAttribute("morphNormal"+E),i[E]=0)}let y=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(s,"morphTargetBaseInfluence",y),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function w0(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return u}function a(){i=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}var oc=class extends zn{constructor(e,t,n,i,r,a,o,c,l,h){if(h=h!==void 0?h:Ws,h!==Ws&&h!==Vr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ws&&(n=ps),n===void 0&&h===Vr&&(n=Vs),super(null,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ln,this.minFilter=c!==void 0?c:Ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Yf=new zn,Jf=new oc(1,1);Jf.compareFunction=zf;var jf=new nc,Zf=new ka,$f=new ac,ju=[],Zu=[],$u=new Float32Array(16),ef=new Float32Array(9),tf=new Float32Array(4);function ra(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=ju[i];if(r===void 0&&(r=new Float32Array(i),ju[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Nn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Un(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Sc(s,e){let t=Zu[e];t===void 0&&(t=new Int32Array(e),Zu[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function I0(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function T0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;s.uniform2fv(this.addr,e),Un(t,e)}}function B0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nn(t,e))return;s.uniform3fv(this.addr,e),Un(t,e)}}function R0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;s.uniform4fv(this.addr,e),Un(t,e)}}function D0(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Un(t,e)}else{if(Nn(t,n))return;tf.set(n),s.uniformMatrix2fv(this.addr,!1,tf),Un(t,n)}}function P0(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Un(t,e)}else{if(Nn(t,n))return;ef.set(n),s.uniformMatrix3fv(this.addr,!1,ef),Un(t,n)}}function L0(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Un(t,e)}else{if(Nn(t,n))return;$u.set(n),s.uniformMatrix4fv(this.addr,!1,$u),Un(t,n)}}function F0(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function N0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;s.uniform2iv(this.addr,e),Un(t,e)}}function U0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nn(t,e))return;s.uniform3iv(this.addr,e),Un(t,e)}}function O0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;s.uniform4iv(this.addr,e),Un(t,e)}}function k0(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Q0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;s.uniform2uiv(this.addr,e),Un(t,e)}}function G0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nn(t,e))return;s.uniform3uiv(this.addr,e),Un(t,e)}}function H0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;s.uniform4uiv(this.addr,e),Un(t,e)}}function z0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?Jf:Yf;t.setTexture2D(e||r,i)}function V0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Zf,i)}function W0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||$f,i)}function K0(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||jf,i)}function q0(s){switch(s){case 5126:return I0;case 35664:return T0;case 35665:return B0;case 35666:return R0;case 35674:return D0;case 35675:return P0;case 35676:return L0;case 5124:case 35670:return F0;case 35667:case 35671:return N0;case 35668:case 35672:return U0;case 35669:case 35673:return O0;case 5125:return k0;case 36294:return Q0;case 36295:return G0;case 36296:return H0;case 35678:case 36198:case 36298:case 36306:case 35682:return z0;case 35679:case 36299:case 36307:return V0;case 35680:case 36300:case 36308:case 36293:return W0;case 36289:case 36303:case 36311:case 36292:return K0}}function X0(s,e){s.uniform1fv(this.addr,e)}function Y0(s,e){let t=ra(e,this.size,2);s.uniform2fv(this.addr,t)}function J0(s,e){let t=ra(e,this.size,3);s.uniform3fv(this.addr,t)}function j0(s,e){let t=ra(e,this.size,4);s.uniform4fv(this.addr,t)}function Z0(s,e){let t=ra(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function $0(s,e){let t=ra(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function e_(s,e){let t=ra(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function t_(s,e){s.uniform1iv(this.addr,e)}function n_(s,e){s.uniform2iv(this.addr,e)}function i_(s,e){s.uniform3iv(this.addr,e)}function s_(s,e){s.uniform4iv(this.addr,e)}function r_(s,e){s.uniform1uiv(this.addr,e)}function a_(s,e){s.uniform2uiv(this.addr,e)}function o_(s,e){s.uniform3uiv(this.addr,e)}function c_(s,e){s.uniform4uiv(this.addr,e)}function l_(s,e,t){let n=this.cache,i=e.length,r=Sc(t,i);Nn(n,r)||(s.uniform1iv(this.addr,r),Un(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Yf,r[a])}function h_(s,e,t){let n=this.cache,i=e.length,r=Sc(t,i);Nn(n,r)||(s.uniform1iv(this.addr,r),Un(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Zf,r[a])}function u_(s,e,t){let n=this.cache,i=e.length,r=Sc(t,i);Nn(n,r)||(s.uniform1iv(this.addr,r),Un(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||$f,r[a])}function f_(s,e,t){let n=this.cache,i=e.length,r=Sc(t,i);Nn(n,r)||(s.uniform1iv(this.addr,r),Un(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||jf,r[a])}function d_(s){switch(s){case 5126:return X0;case 35664:return Y0;case 35665:return J0;case 35666:return j0;case 35674:return Z0;case 35675:return $0;case 35676:return e_;case 5124:case 35670:return t_;case 35667:case 35671:return n_;case 35668:case 35672:return i_;case 35669:case 35673:return s_;case 5125:return r_;case 36294:return a_;case 36295:return o_;case 36296:return c_;case 35678:case 36198:case 36298:case 36306:case 35682:return l_;case 35679:case 36299:case 36307:return h_;case 35680:case 36300:case 36308:case 36293:return u_;case 36289:case 36303:case 36311:case 36292:return f_}}var Sl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=q0(t.type)}},Cl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=d_(t.type)}},wl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},cl=/(\w+)(\])?(\[|\.)?/g;function nf(s,e){s.seq.push(e),s.map[e.id]=e}function A_(s,e,t){let n=s.name,i=n.length;for(cl.lastIndex=0;;){let r=cl.exec(n),a=cl.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){nf(t,l===void 0?new Sl(o,s,e):new Cl(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new wl(o),nf(t,u)),t=u}}}var Hr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);A_(r,a,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function sf(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var p_=37297,m_=0;function g_(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function __(s){let e=Kt.getPrimaries(Kt.workingColorSpace),t=Kt.getPrimaries(s),n;switch(e===t?n="":e===jo&&t===Jo?n="LinearDisplayP3ToLinearSRGB":e===Jo&&t===jo&&(n="LinearSRGBToLinearDisplayP3"),s){case wn:case sa:return[n,"LinearTransferOETF"];case Qt:case ja:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function rf(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+g_(s.getShaderSource(e),a)}else return i}function b_(s,e){let t=__(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function E_(s,e){let t;switch(e){case SA:t="Linear";break;case CA:t="Reinhard";break;case wA:t="OptimizedCineon";break;case xc:t="ACESFilmic";break;case TA:t="AgX";break;case IA:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function x_(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(kr).join(`
`)}function y_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(kr).join(`
`)}function v_(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function M_(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function kr(s){return s!==""}function af(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function of(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var S_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Il(s){return s.replace(S_,w_)}var C_=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function w_(s,e){let t=Pt[e];if(t===void 0){let n=C_.get(e);if(n!==void 0)t=Pt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Il(t)}var I_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cf(s){return s.replace(I_,T_)}function T_(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function lf(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function B_(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ec?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===$d?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===es&&(e="SHADOWMAP_TYPE_VSM"),e}function R_(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case qs:case zr:e="ENVMAP_TYPE_CUBE";break;case yc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function D_(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case zr:e="ENVMAP_MODE_REFRACTION";break}return e}function P_(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Jl:e="ENVMAP_BLENDING_MULTIPLY";break;case vA:e="ENVMAP_BLENDING_MIX";break;case MA:e="ENVMAP_BLENDING_ADD";break}return e}function L_(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function F_(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=B_(t),l=R_(t),h=D_(t),u=P_(t),f=L_(t),A=t.isWebGL2?"":x_(t),m=y_(t),b=v_(r),p=i.createProgram(),d,y,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(kr).join(`
`),d.length>0&&(d+=`
`),y=[A,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(kr).join(`
`),y.length>0&&(y+=`
`)):(d=[lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kr).join(`
`),y=[A,lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_s?"#define TONE_MAPPING":"",t.toneMapping!==_s?Pt.tonemapping_pars_fragment:"",t.toneMapping!==_s?E_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Pt.colorspace_pars_fragment,b_("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(kr).join(`
`)),a=Il(a),a=af(a,t),a=of(a,t),o=Il(o),o=af(o,t),o=of(o,t),a=cf(a),o=cf(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,d=[m,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===wu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);let R=E+d+a,U=E+y+o,P=sf(i,i.VERTEX_SHADER,R),N=sf(i,i.FRAGMENT_SHADER,U);i.attachShader(p,P),i.attachShader(p,N),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function j(ne){if(s.debug.checkShaderErrors){let me=i.getProgramInfoLog(p).trim(),G=i.getShaderInfoLog(P).trim(),J=i.getShaderInfoLog(N).trim(),ae=!0,he=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(ae=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,p,P,N);else{let fe=rf(i,P,"vertex"),Ae=rf(i,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Program Info Log: `+me+`
`+fe+`
`+Ae)}else me!==""?console.warn("THREE.WebGLProgram: Program Info Log:",me):(G===""||J==="")&&(he=!1);he&&(ne.diagnostics={runnable:ae,programLog:me,vertexShader:{log:G,prefix:d},fragmentShader:{log:J,prefix:y}})}i.deleteShader(P),i.deleteShader(N),C=new Hr(i,p),L=M_(i,p)}let C;this.getUniforms=function(){return C===void 0&&j(this),C};let L;this.getAttributes=function(){return L===void 0&&j(this),L};let Z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return Z===!1&&(Z=i.getProgramParameter(p,p_)),Z},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=m_++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=P,this.fragmentShader=N,this}var N_=0,Tl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Bl(e),t.set(e,n)),n}},Bl=class{constructor(e){this.id=N_++,this.code=e,this.usedTimes=0}};function U_(s,e,t,n,i,r,a){let o=new ic,c=new Tl,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,f=i.vertexTextures,A=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(C){return C===0?"uv":`uv${C}`}function p(C,L,Z,ne,me){let G=ne.fog,J=me.geometry,ae=C.isMeshStandardMaterial?ne.environment:null,he=(C.isMeshStandardMaterial?t:e).get(C.envMap||ae),fe=he&&he.mapping===yc?he.image.height:null,Ae=m[C.type];C.precision!==null&&(A=i.getMaxPrecision(C.precision),A!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",A,"instead."));let _e=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ve=_e!==void 0?_e.length:0,Qe=0;J.morphAttributes.position!==void 0&&(Qe=1),J.morphAttributes.normal!==void 0&&(Qe=2),J.morphAttributes.color!==void 0&&(Qe=3);let oe,ge,I,H;if(Ae){let Pn=Ui[Ae];oe=Pn.vertexShader,ge=Pn.fragmentShader}else oe=C.vertexShader,ge=C.fragmentShader,c.update(C),I=c.getVertexShaderID(C),H=c.getFragmentShaderID(C);let W=s.getRenderTarget(),z=me.isInstancedMesh===!0,be=me.isBatchedMesh===!0,Y=!!C.map,ue=!!C.matcap,O=!!he,ot=!!C.aoMap,Ie=!!C.lightMap,Ge=!!C.bumpMap,ze=!!C.normalMap,Mt=!!C.displacementMap,et=!!C.emissiveMap,D=!!C.metalnessMap,w=!!C.roughnessMap,ee=C.anisotropy>0,Ce=C.clearcoat>0,Me=C.iridescence>0,we=C.sheen>0,je=C.transmission>0,Fe=ee&&!!C.anisotropyMap,We=Ce&&!!C.clearcoatMap,it=Ce&&!!C.clearcoatNormalMap,gt=Ce&&!!C.clearcoatRoughnessMap,Ee=Me&&!!C.iridescenceMap,st=Me&&!!C.iridescenceThicknessMap,mt=we&&!!C.sheenColorMap,re=we&&!!C.sheenRoughnessMap,Ne=!!C.specularMap,Le=!!C.specularColorMap,bt=!!C.specularIntensityMap,Re=je&&!!C.transmissionMap,sn=je&&!!C.thicknessMap,Et=!!C.gradientMap,De=!!C.alphaMap,k=C.alphaTest>0,Pe=!!C.alphaHash,ke=!!C.extensions,ct=!!J.attributes.uv1,ht=!!J.attributes.uv2,qt=!!J.attributes.uv3,zt=_s;return C.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(zt=s.toneMapping),{isWebGL2:h,shaderID:Ae,shaderType:C.type,shaderName:C.name,vertexShader:oe,fragmentShader:ge,defines:C.defines,customVertexShaderID:I,customFragmentShaderID:H,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:A,batching:be,instancing:z,instancingColor:z&&me.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:W===null?s.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:wn,map:Y,matcap:ue,envMap:O,envMapMode:O&&he.mapping,envMapCubeUVHeight:fe,aoMap:ot,lightMap:Ie,bumpMap:Ge,normalMap:ze,displacementMap:f&&Mt,emissiveMap:et,normalMapObjectSpace:ze&&C.normalMapType===HA,normalMapTangentSpace:ze&&C.normalMapType===th,metalnessMap:D,roughnessMap:w,anisotropy:ee,anisotropyMap:Fe,clearcoat:Ce,clearcoatMap:We,clearcoatNormalMap:it,clearcoatRoughnessMap:gt,iridescence:Me,iridescenceMap:Ee,iridescenceThicknessMap:st,sheen:we,sheenColorMap:mt,sheenRoughnessMap:re,specularMap:Ne,specularColorMap:Le,specularIntensityMap:bt,transmission:je,transmissionMap:Re,thicknessMap:sn,gradientMap:Et,opaque:C.transparent===!1&&C.blending===Qr,alphaMap:De,alphaTest:k,alphaHash:Pe,combine:C.combine,mapUv:Y&&b(C.map.channel),aoMapUv:ot&&b(C.aoMap.channel),lightMapUv:Ie&&b(C.lightMap.channel),bumpMapUv:Ge&&b(C.bumpMap.channel),normalMapUv:ze&&b(C.normalMap.channel),displacementMapUv:Mt&&b(C.displacementMap.channel),emissiveMapUv:et&&b(C.emissiveMap.channel),metalnessMapUv:D&&b(C.metalnessMap.channel),roughnessMapUv:w&&b(C.roughnessMap.channel),anisotropyMapUv:Fe&&b(C.anisotropyMap.channel),clearcoatMapUv:We&&b(C.clearcoatMap.channel),clearcoatNormalMapUv:it&&b(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&b(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&b(C.iridescenceMap.channel),iridescenceThicknessMapUv:st&&b(C.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&b(C.sheenColorMap.channel),sheenRoughnessMapUv:re&&b(C.sheenRoughnessMap.channel),specularMapUv:Ne&&b(C.specularMap.channel),specularColorMapUv:Le&&b(C.specularColorMap.channel),specularIntensityMapUv:bt&&b(C.specularIntensityMap.channel),transmissionMapUv:Re&&b(C.transmissionMap.channel),thicknessMapUv:sn&&b(C.thicknessMap.channel),alphaMapUv:De&&b(C.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(ze||ee),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,vertexUv1s:ct,vertexUv2s:ht,vertexUv3s:qt,pointsUvs:me.isPoints===!0&&!!J.attributes.uv&&(Y||De),fog:!!G,useFog:C.fog===!0,fogExp2:G&&G.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:me.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Qe,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:C.dithering,shadowMapEnabled:s.shadowMap.enabled&&Z.length>0,shadowMapType:s.shadowMap.type,toneMapping:zt,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Y&&C.map.isVideoTexture===!0&&Kt.getTransfer(C.map.colorSpace)===hn,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Rn,flipSided:C.side===Fn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionDerivatives:ke&&C.extensions.derivatives===!0,extensionFragDepth:ke&&C.extensions.fragDepth===!0,extensionDrawBuffers:ke&&C.extensions.drawBuffers===!0,extensionShaderTextureLOD:ke&&C.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ke&&C.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()}}function d(C){let L=[];if(C.shaderID?L.push(C.shaderID):(L.push(C.customVertexShaderID),L.push(C.customFragmentShaderID)),C.defines!==void 0)for(let Z in C.defines)L.push(Z),L.push(C.defines[Z]);return C.isRawShaderMaterial===!1&&(y(L,C),E(L,C),L.push(s.outputColorSpace)),L.push(C.customProgramCacheKey),L.join()}function y(C,L){C.push(L.precision),C.push(L.outputColorSpace),C.push(L.envMapMode),C.push(L.envMapCubeUVHeight),C.push(L.mapUv),C.push(L.alphaMapUv),C.push(L.lightMapUv),C.push(L.aoMapUv),C.push(L.bumpMapUv),C.push(L.normalMapUv),C.push(L.displacementMapUv),C.push(L.emissiveMapUv),C.push(L.metalnessMapUv),C.push(L.roughnessMapUv),C.push(L.anisotropyMapUv),C.push(L.clearcoatMapUv),C.push(L.clearcoatNormalMapUv),C.push(L.clearcoatRoughnessMapUv),C.push(L.iridescenceMapUv),C.push(L.iridescenceThicknessMapUv),C.push(L.sheenColorMapUv),C.push(L.sheenRoughnessMapUv),C.push(L.specularMapUv),C.push(L.specularColorMapUv),C.push(L.specularIntensityMapUv),C.push(L.transmissionMapUv),C.push(L.thicknessMapUv),C.push(L.combine),C.push(L.fogExp2),C.push(L.sizeAttenuation),C.push(L.morphTargetsCount),C.push(L.morphAttributeCount),C.push(L.numDirLights),C.push(L.numPointLights),C.push(L.numSpotLights),C.push(L.numSpotLightMaps),C.push(L.numHemiLights),C.push(L.numRectAreaLights),C.push(L.numDirLightShadows),C.push(L.numPointLightShadows),C.push(L.numSpotLightShadows),C.push(L.numSpotLightShadowsWithMaps),C.push(L.numLightProbes),C.push(L.shadowMapType),C.push(L.toneMapping),C.push(L.numClippingPlanes),C.push(L.numClipIntersection),C.push(L.depthPacking)}function E(C,L){o.disableAll(),L.isWebGL2&&o.enable(0),L.supportsVertexTextures&&o.enable(1),L.instancing&&o.enable(2),L.instancingColor&&o.enable(3),L.matcap&&o.enable(4),L.envMap&&o.enable(5),L.normalMapObjectSpace&&o.enable(6),L.normalMapTangentSpace&&o.enable(7),L.clearcoat&&o.enable(8),L.iridescence&&o.enable(9),L.alphaTest&&o.enable(10),L.vertexColors&&o.enable(11),L.vertexAlphas&&o.enable(12),L.vertexUv1s&&o.enable(13),L.vertexUv2s&&o.enable(14),L.vertexUv3s&&o.enable(15),L.vertexTangents&&o.enable(16),L.anisotropy&&o.enable(17),L.alphaHash&&o.enable(18),L.batching&&o.enable(19),C.push(o.mask),o.disableAll(),L.fog&&o.enable(0),L.useFog&&o.enable(1),L.flatShading&&o.enable(2),L.logarithmicDepthBuffer&&o.enable(3),L.skinning&&o.enable(4),L.morphTargets&&o.enable(5),L.morphNormals&&o.enable(6),L.morphColors&&o.enable(7),L.premultipliedAlpha&&o.enable(8),L.shadowMapEnabled&&o.enable(9),L.useLegacyLights&&o.enable(10),L.doubleSided&&o.enable(11),L.flipSided&&o.enable(12),L.useDepthPacking&&o.enable(13),L.dithering&&o.enable(14),L.transmission&&o.enable(15),L.sheen&&o.enable(16),L.opaque&&o.enable(17),L.pointsUvs&&o.enable(18),L.decodeVideoTexture&&o.enable(19),C.push(o.mask)}function R(C){let L=m[C.type],Z;if(L){let ne=Ui[L];Z=Cp.clone(ne.uniforms)}else Z=C.uniforms;return Z}function U(C,L){let Z;for(let ne=0,me=l.length;ne<me;ne++){let G=l[ne];if(G.cacheKey===L){Z=G,++Z.usedTimes;break}}return Z===void 0&&(Z=new F_(s,L,C,r),l.push(Z)),Z}function P(C){if(--C.usedTimes===0){let L=l.indexOf(C);l[L]=l[l.length-1],l.pop(),C.destroy()}}function N(C){c.remove(C)}function j(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:R,acquireProgram:U,releaseProgram:P,releaseShaderCache:N,programs:l,dispose:j}}function O_(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function k_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function hf(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function uf(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,f,A,m,b,p){let d=s[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:A,groupOrder:m,renderOrder:u.renderOrder,z:b,group:p},s[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=A,d.groupOrder=m,d.renderOrder=u.renderOrder,d.z=b,d.group=p),e++,d}function o(u,f,A,m,b,p){let d=a(u,f,A,m,b,p);A.transmission>0?n.push(d):A.transparent===!0?i.push(d):t.push(d)}function c(u,f,A,m,b,p){let d=a(u,f,A,m,b,p);A.transmission>0?n.unshift(d):A.transparent===!0?i.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||k_),n.length>1&&n.sort(f||hf),i.length>1&&i.sort(f||hf)}function h(){for(let u=e,f=s.length;u<f;u++){let A=s[u];if(A.id===null)break;A.id=null,A.object=null,A.geometry=null,A.material=null,A.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:h,sort:l}}function Q_(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new uf,s.set(n,[a])):i>=r.length?(a=new uf,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function G_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Q,color:new Ve};break;case"SpotLight":t={position:new Q,direction:new Q,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Q,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Q,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return s[e.id]=t,t}}}function H_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var z_=0;function V_(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function W_(s,e){let t=new G_,n=H_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new Q);let r=new Q,a=new ft,o=new ft;function c(h,u){let f=0,A=0,m=0;for(let ne=0;ne<9;ne++)i.probe[ne].set(0,0,0);let b=0,p=0,d=0,y=0,E=0,R=0,U=0,P=0,N=0,j=0,C=0;h.sort(V_);let L=u===!0?Math.PI:1;for(let ne=0,me=h.length;ne<me;ne++){let G=h[ne],J=G.color,ae=G.intensity,he=G.distance,fe=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)f+=J.r*ae*L,A+=J.g*ae*L,m+=J.b*ae*L;else if(G.isLightProbe){for(let Ae=0;Ae<9;Ae++)i.probe[Ae].addScaledVector(G.sh.coefficients[Ae],ae);C++}else if(G.isDirectionalLight){let Ae=t.get(G);if(Ae.color.copy(G.color).multiplyScalar(G.intensity*L),G.castShadow){let _e=G.shadow,ve=n.get(G);ve.shadowBias=_e.bias,ve.shadowNormalBias=_e.normalBias,ve.shadowRadius=_e.radius,ve.shadowMapSize=_e.mapSize,i.directionalShadow[b]=ve,i.directionalShadowMap[b]=fe,i.directionalShadowMatrix[b]=G.shadow.matrix,R++}i.directional[b]=Ae,b++}else if(G.isSpotLight){let Ae=t.get(G);Ae.position.setFromMatrixPosition(G.matrixWorld),Ae.color.copy(J).multiplyScalar(ae*L),Ae.distance=he,Ae.coneCos=Math.cos(G.angle),Ae.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),Ae.decay=G.decay,i.spot[d]=Ae;let _e=G.shadow;if(G.map&&(i.spotLightMap[N]=G.map,N++,_e.updateMatrices(G),G.castShadow&&j++),i.spotLightMatrix[d]=_e.matrix,G.castShadow){let ve=n.get(G);ve.shadowBias=_e.bias,ve.shadowNormalBias=_e.normalBias,ve.shadowRadius=_e.radius,ve.shadowMapSize=_e.mapSize,i.spotShadow[d]=ve,i.spotShadowMap[d]=fe,P++}d++}else if(G.isRectAreaLight){let Ae=t.get(G);Ae.color.copy(J).multiplyScalar(ae),Ae.halfWidth.set(G.width*.5,0,0),Ae.halfHeight.set(0,G.height*.5,0),i.rectArea[y]=Ae,y++}else if(G.isPointLight){let Ae=t.get(G);if(Ae.color.copy(G.color).multiplyScalar(G.intensity*L),Ae.distance=G.distance,Ae.decay=G.decay,G.castShadow){let _e=G.shadow,ve=n.get(G);ve.shadowBias=_e.bias,ve.shadowNormalBias=_e.normalBias,ve.shadowRadius=_e.radius,ve.shadowMapSize=_e.mapSize,ve.shadowCameraNear=_e.camera.near,ve.shadowCameraFar=_e.camera.far,i.pointShadow[p]=ve,i.pointShadowMap[p]=fe,i.pointShadowMatrix[p]=G.shadow.matrix,U++}i.point[p]=Ae,p++}else if(G.isHemisphereLight){let Ae=t.get(G);Ae.skyColor.copy(G.color).multiplyScalar(ae*L),Ae.groundColor.copy(G.groundColor).multiplyScalar(ae*L),i.hemi[E]=Ae,E++}}y>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ue.LTC_FLOAT_1,i.rectAreaLTC2=Ue.LTC_FLOAT_2):(i.rectAreaLTC1=Ue.LTC_HALF_1,i.rectAreaLTC2=Ue.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ue.LTC_FLOAT_1,i.rectAreaLTC2=Ue.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=Ue.LTC_HALF_1,i.rectAreaLTC2=Ue.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=A,i.ambient[2]=m;let Z=i.hash;(Z.directionalLength!==b||Z.pointLength!==p||Z.spotLength!==d||Z.rectAreaLength!==y||Z.hemiLength!==E||Z.numDirectionalShadows!==R||Z.numPointShadows!==U||Z.numSpotShadows!==P||Z.numSpotMaps!==N||Z.numLightProbes!==C)&&(i.directional.length=b,i.spot.length=d,i.rectArea.length=y,i.point.length=p,i.hemi.length=E,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.pointShadow.length=U,i.pointShadowMap.length=U,i.spotShadow.length=P,i.spotShadowMap.length=P,i.directionalShadowMatrix.length=R,i.pointShadowMatrix.length=U,i.spotLightMatrix.length=P+N-j,i.spotLightMap.length=N,i.numSpotLightShadowsWithMaps=j,i.numLightProbes=C,Z.directionalLength=b,Z.pointLength=p,Z.spotLength=d,Z.rectAreaLength=y,Z.hemiLength=E,Z.numDirectionalShadows=R,Z.numPointShadows=U,Z.numSpotShadows=P,Z.numSpotMaps=N,Z.numLightProbes=C,i.version=z_++)}function l(h,u){let f=0,A=0,m=0,b=0,p=0,d=u.matrixWorldInverse;for(let y=0,E=h.length;y<E;y++){let R=h[y];if(R.isDirectionalLight){let U=i.directional[f];U.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),U.direction.sub(r),U.direction.transformDirection(d),f++}else if(R.isSpotLight){let U=i.spot[m];U.position.setFromMatrixPosition(R.matrixWorld),U.position.applyMatrix4(d),U.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),U.direction.sub(r),U.direction.transformDirection(d),m++}else if(R.isRectAreaLight){let U=i.rectArea[b];U.position.setFromMatrixPosition(R.matrixWorld),U.position.applyMatrix4(d),o.identity(),a.copy(R.matrixWorld),a.premultiply(d),o.extractRotation(a),U.halfWidth.set(R.width*.5,0,0),U.halfHeight.set(0,R.height*.5,0),U.halfWidth.applyMatrix4(o),U.halfHeight.applyMatrix4(o),b++}else if(R.isPointLight){let U=i.point[A];U.position.setFromMatrixPosition(R.matrixWorld),U.position.applyMatrix4(d),A++}else if(R.isHemisphereLight){let U=i.hemi[p];U.direction.setFromMatrixPosition(R.matrixWorld),U.direction.transformDirection(d),p++}}}return{setup:c,setupView:l,state:i}}function ff(s,e){let t=new W_(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function K_(s,e){let t=new WeakMap;function n(r,a=0){let o=t.get(r),c;return o===void 0?(c=new ff(s,e),t.set(r,[c])):a>=o.length?(c=new ff(s,e),o.push(c)):c=o[a],c}function i(){t=new WeakMap}return{get:n,dispose:i}}var Rl=class extends ti{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=QA,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Dl=class extends ti{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},q_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,X_=`uniform sampler2D shadow_pass;
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
}`;function Y_(s,e,t){let n=new Qa,i=new Je,r=new Je,a=new Rt,o=new Rl({depthPacking:GA}),c=new Dl,l={},h=t.maxTextureSize,u={[ki]:Fn,[Fn]:ki,[Rn]:Rn},f=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Je},radius:{value:4}},vertexShader:q_,fragmentShader:X_}),A=f.clone();A.defines.HORIZONTAL_PASS=1;let m=new nn;m.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new qe(m,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ec;let d=this.type;this.render=function(P,N,j){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||P.length===0)return;let C=s.getRenderTarget(),L=s.getActiveCubeFace(),Z=s.getActiveMipmapLevel(),ne=s.state;ne.setBlending(gs),ne.buffers.color.setClear(1,1,1,1),ne.buffers.depth.setTest(!0),ne.setScissorTest(!1);let me=d!==es&&this.type===es,G=d===es&&this.type!==es;for(let J=0,ae=P.length;J<ae;J++){let he=P[J],fe=he.shadow;if(fe===void 0){console.warn("THREE.WebGLShadowMap:",he,"has no shadow.");continue}if(fe.autoUpdate===!1&&fe.needsUpdate===!1)continue;i.copy(fe.mapSize);let Ae=fe.getFrameExtents();if(i.multiply(Ae),r.copy(fe.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Ae.x),i.x=r.x*Ae.x,fe.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Ae.y),i.y=r.y*Ae.y,fe.mapSize.y=r.y)),fe.map===null||me===!0||G===!0){let ve=this.type!==es?{minFilter:Ln,magFilter:Ln}:{};fe.map!==null&&fe.map.dispose(),fe.map=new oi(i.x,i.y,ve),fe.map.texture.name=he.name+".shadowMap",fe.camera.updateProjectionMatrix()}s.setRenderTarget(fe.map),s.clear();let _e=fe.getViewportCount();for(let ve=0;ve<_e;ve++){let Qe=fe.getViewport(ve);a.set(r.x*Qe.x,r.y*Qe.y,r.x*Qe.z,r.y*Qe.w),ne.viewport(a),fe.updateMatrices(he,ve),n=fe.getFrustum(),R(N,j,fe.camera,he,this.type)}fe.isPointLightShadow!==!0&&this.type===es&&y(fe,j),fe.needsUpdate=!1}d=this.type,p.needsUpdate=!1,s.setRenderTarget(C,L,Z)};function y(P,N){let j=e.update(b);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,A.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,A.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new oi(i.x,i.y)),f.uniforms.shadow_pass.value=P.map.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(N,null,j,f,b,null),A.uniforms.shadow_pass.value=P.mapPass.texture,A.uniforms.resolution.value=P.mapSize,A.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(N,null,j,A,b,null)}function E(P,N,j,C){let L=null,Z=j.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(Z!==void 0)L=Z;else if(L=j.isPointLight===!0?c:o,s.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){let ne=L.uuid,me=N.uuid,G=l[ne];G===void 0&&(G={},l[ne]=G);let J=G[me];J===void 0&&(J=L.clone(),G[me]=J,N.addEventListener("dispose",U)),L=J}if(L.visible=N.visible,L.wireframe=N.wireframe,C===es?L.side=N.shadowSide!==null?N.shadowSide:N.side:L.side=N.shadowSide!==null?N.shadowSide:u[N.side],L.alphaMap=N.alphaMap,L.alphaTest=N.alphaTest,L.map=N.map,L.clipShadows=N.clipShadows,L.clippingPlanes=N.clippingPlanes,L.clipIntersection=N.clipIntersection,L.displacementMap=N.displacementMap,L.displacementScale=N.displacementScale,L.displacementBias=N.displacementBias,L.wireframeLinewidth=N.wireframeLinewidth,L.linewidth=N.linewidth,j.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let ne=s.properties.get(L);ne.light=j}return L}function R(P,N,j,C,L){if(P.visible===!1)return;if(P.layers.test(N.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&L===es)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,P.matrixWorld);let me=e.update(P),G=P.material;if(Array.isArray(G)){let J=me.groups;for(let ae=0,he=J.length;ae<he;ae++){let fe=J[ae],Ae=G[fe.materialIndex];if(Ae&&Ae.visible){let _e=E(P,Ae,C,L);P.onBeforeShadow(s,P,N,j,me,_e,fe),s.renderBufferDirect(j,null,me,_e,P,fe),P.onAfterShadow(s,P,N,j,me,_e,fe)}}}else if(G.visible){let J=E(P,G,C,L);P.onBeforeShadow(s,P,N,j,me,J,null),s.renderBufferDirect(j,null,me,J,P,null),P.onAfterShadow(s,P,N,j,me,J,null)}}let ne=P.children;for(let me=0,G=ne.length;me<G;me++)R(ne[me],N,j,C,L)}function U(P){P.target.removeEventListener("dispose",U);for(let j in l){let C=l[j],L=P.target.uuid;L in C&&(C[L].dispose(),delete C[L])}}}function J_(s,e,t){let n=t.isWebGL2;function i(){let k=!1,Pe=new Rt,ke=null,ct=new Rt(0,0,0,0);return{setMask:function(ht){ke!==ht&&!k&&(s.colorMask(ht,ht,ht,ht),ke=ht)},setLocked:function(ht){k=ht},setClear:function(ht,qt,zt,Vt,Pn){Pn===!0&&(ht*=Vt,qt*=Vt,zt*=Vt),Pe.set(ht,qt,zt,Vt),ct.equals(Pe)===!1&&(s.clearColor(ht,qt,zt,Vt),ct.copy(Pe))},reset:function(){k=!1,ke=null,ct.set(-1,0,0,0)}}}function r(){let k=!1,Pe=null,ke=null,ct=null;return{setTest:function(ht){ht?be(s.DEPTH_TEST):Y(s.DEPTH_TEST)},setMask:function(ht){Pe!==ht&&!k&&(s.depthMask(ht),Pe=ht)},setFunc:function(ht){if(ke!==ht){switch(ht){case mA:s.depthFunc(s.NEVER);break;case gA:s.depthFunc(s.ALWAYS);break;case _A:s.depthFunc(s.LESS);break;case Go:s.depthFunc(s.LEQUAL);break;case bA:s.depthFunc(s.EQUAL);break;case EA:s.depthFunc(s.GEQUAL);break;case xA:s.depthFunc(s.GREATER);break;case yA:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ke=ht}},setLocked:function(ht){k=ht},setClear:function(ht){ct!==ht&&(s.clearDepth(ht),ct=ht)},reset:function(){k=!1,Pe=null,ke=null,ct=null}}}function a(){let k=!1,Pe=null,ke=null,ct=null,ht=null,qt=null,zt=null,Vt=null,Pn=null;return{setTest:function(Nt){k||(Nt?be(s.STENCIL_TEST):Y(s.STENCIL_TEST))},setMask:function(Nt){Pe!==Nt&&!k&&(s.stencilMask(Nt),Pe=Nt)},setFunc:function(Nt,un,ii){(ke!==Nt||ct!==un||ht!==ii)&&(s.stencilFunc(Nt,un,ii),ke=Nt,ct=un,ht=ii)},setOp:function(Nt,un,ii){(qt!==Nt||zt!==un||Vt!==ii)&&(s.stencilOp(Nt,un,ii),qt=Nt,zt=un,Vt=ii)},setLocked:function(Nt){k=Nt},setClear:function(Nt){Pn!==Nt&&(s.clearStencil(Nt),Pn=Nt)},reset:function(){k=!1,Pe=null,ke=null,ct=null,ht=null,qt=null,zt=null,Vt=null,Pn=null}}}let o=new i,c=new r,l=new a,h=new WeakMap,u=new WeakMap,f={},A={},m=new WeakMap,b=[],p=null,d=!1,y=null,E=null,R=null,U=null,P=null,N=null,j=null,C=new Ve(0,0,0),L=0,Z=!1,ne=null,me=null,G=null,J=null,ae=null,he=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),fe=!1,Ae=0,_e=s.getParameter(s.VERSION);_e.indexOf("WebGL")!==-1?(Ae=parseFloat(/^WebGL (\d)/.exec(_e)[1]),fe=Ae>=1):_e.indexOf("OpenGL ES")!==-1&&(Ae=parseFloat(/^OpenGL ES (\d)/.exec(_e)[1]),fe=Ae>=2);let ve=null,Qe={},oe=s.getParameter(s.SCISSOR_BOX),ge=s.getParameter(s.VIEWPORT),I=new Rt().fromArray(oe),H=new Rt().fromArray(ge);function W(k,Pe,ke,ct){let ht=new Uint8Array(4),qt=s.createTexture();s.bindTexture(k,qt),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let zt=0;zt<ke;zt++)n&&(k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY)?s.texImage3D(Pe,0,s.RGBA,1,1,ct,0,s.RGBA,s.UNSIGNED_BYTE,ht):s.texImage2D(Pe+zt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ht);return qt}let z={};z[s.TEXTURE_2D]=W(s.TEXTURE_2D,s.TEXTURE_2D,1),z[s.TEXTURE_CUBE_MAP]=W(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(z[s.TEXTURE_2D_ARRAY]=W(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),z[s.TEXTURE_3D]=W(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),be(s.DEPTH_TEST),c.setFunc(Go),et(!1),D(tu),be(s.CULL_FACE),ze(gs);function be(k){f[k]!==!0&&(s.enable(k),f[k]=!0)}function Y(k){f[k]!==!1&&(s.disable(k),f[k]=!1)}function ue(k,Pe){return A[k]!==Pe?(s.bindFramebuffer(k,Pe),A[k]=Pe,n&&(k===s.DRAW_FRAMEBUFFER&&(A[s.FRAMEBUFFER]=Pe),k===s.FRAMEBUFFER&&(A[s.DRAW_FRAMEBUFFER]=Pe)),!0):!1}function O(k,Pe){let ke=b,ct=!1;if(k)if(ke=m.get(Pe),ke===void 0&&(ke=[],m.set(Pe,ke)),k.isWebGLMultipleRenderTargets){let ht=k.texture;if(ke.length!==ht.length||ke[0]!==s.COLOR_ATTACHMENT0){for(let qt=0,zt=ht.length;qt<zt;qt++)ke[qt]=s.COLOR_ATTACHMENT0+qt;ke.length=ht.length,ct=!0}}else ke[0]!==s.COLOR_ATTACHMENT0&&(ke[0]=s.COLOR_ATTACHMENT0,ct=!0);else ke[0]!==s.BACK&&(ke[0]=s.BACK,ct=!0);ct&&(t.isWebGL2?s.drawBuffers(ke):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ke))}function ot(k){return p!==k?(s.useProgram(k),p=k,!0):!1}let Ie={[Gs]:s.FUNC_ADD,[tA]:s.FUNC_SUBTRACT,[nA]:s.FUNC_REVERSE_SUBTRACT};if(n)Ie[su]=s.MIN,Ie[ru]=s.MAX;else{let k=e.get("EXT_blend_minmax");k!==null&&(Ie[su]=k.MIN_EXT,Ie[ru]=k.MAX_EXT)}let Ge={[iA]:s.ZERO,[sA]:s.ONE,[rA]:s.SRC_COLOR,[pl]:s.SRC_ALPHA,[uA]:s.SRC_ALPHA_SATURATE,[lA]:s.DST_COLOR,[oA]:s.DST_ALPHA,[aA]:s.ONE_MINUS_SRC_COLOR,[ml]:s.ONE_MINUS_SRC_ALPHA,[hA]:s.ONE_MINUS_DST_COLOR,[cA]:s.ONE_MINUS_DST_ALPHA,[fA]:s.CONSTANT_COLOR,[dA]:s.ONE_MINUS_CONSTANT_COLOR,[AA]:s.CONSTANT_ALPHA,[pA]:s.ONE_MINUS_CONSTANT_ALPHA};function ze(k,Pe,ke,ct,ht,qt,zt,Vt,Pn,Nt){if(k===gs){d===!0&&(Y(s.BLEND),d=!1);return}if(d===!1&&(be(s.BLEND),d=!0),k!==eA){if(k!==y||Nt!==Z){if((E!==Gs||P!==Gs)&&(s.blendEquation(s.FUNC_ADD),E=Gs,P=Gs),Nt)switch(k){case Qr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qo:s.blendFunc(s.ONE,s.ONE);break;case nu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case iu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Qr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qo:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case nu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case iu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}R=null,U=null,N=null,j=null,C.set(0,0,0),L=0,y=k,Z=Nt}return}ht=ht||Pe,qt=qt||ke,zt=zt||ct,(Pe!==E||ht!==P)&&(s.blendEquationSeparate(Ie[Pe],Ie[ht]),E=Pe,P=ht),(ke!==R||ct!==U||qt!==N||zt!==j)&&(s.blendFuncSeparate(Ge[ke],Ge[ct],Ge[qt],Ge[zt]),R=ke,U=ct,N=qt,j=zt),(Vt.equals(C)===!1||Pn!==L)&&(s.blendColor(Vt.r,Vt.g,Vt.b,Pn),C.copy(Vt),L=Pn),y=k,Z=!1}function Mt(k,Pe){k.side===Rn?Y(s.CULL_FACE):be(s.CULL_FACE);let ke=k.side===Fn;Pe&&(ke=!ke),et(ke),k.blending===Qr&&k.transparent===!1?ze(gs):ze(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),c.setFunc(k.depthFunc),c.setTest(k.depthTest),c.setMask(k.depthWrite),o.setMask(k.colorWrite);let ct=k.stencilWrite;l.setTest(ct),ct&&(l.setMask(k.stencilWriteMask),l.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),l.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),ee(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?be(s.SAMPLE_ALPHA_TO_COVERAGE):Y(s.SAMPLE_ALPHA_TO_COVERAGE)}function et(k){ne!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),ne=k)}function D(k){k!==jd?(be(s.CULL_FACE),k!==me&&(k===tu?s.cullFace(s.BACK):k===Zd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Y(s.CULL_FACE),me=k}function w(k){k!==G&&(fe&&s.lineWidth(k),G=k)}function ee(k,Pe,ke){k?(be(s.POLYGON_OFFSET_FILL),(J!==Pe||ae!==ke)&&(s.polygonOffset(Pe,ke),J=Pe,ae=ke)):Y(s.POLYGON_OFFSET_FILL)}function Ce(k){k?be(s.SCISSOR_TEST):Y(s.SCISSOR_TEST)}function Me(k){k===void 0&&(k=s.TEXTURE0+he-1),ve!==k&&(s.activeTexture(k),ve=k)}function we(k,Pe,ke){ke===void 0&&(ve===null?ke=s.TEXTURE0+he-1:ke=ve);let ct=Qe[ke];ct===void 0&&(ct={type:void 0,texture:void 0},Qe[ke]=ct),(ct.type!==k||ct.texture!==Pe)&&(ve!==ke&&(s.activeTexture(ke),ve=ke),s.bindTexture(k,Pe||z[k]),ct.type=k,ct.texture=Pe)}function je(){let k=Qe[ve];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function Fe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function We(){try{s.compressedTexImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function it(){try{s.texSubImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function gt(){try{s.texSubImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ee(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function st(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function mt(){try{s.texStorage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{s.texStorage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ne(){try{s.texImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Le(){try{s.texImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function bt(k){I.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),I.copy(k))}function Re(k){H.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),H.copy(k))}function sn(k,Pe){let ke=u.get(Pe);ke===void 0&&(ke=new WeakMap,u.set(Pe,ke));let ct=ke.get(k);ct===void 0&&(ct=s.getUniformBlockIndex(Pe,k.name),ke.set(k,ct))}function Et(k,Pe){let ct=u.get(Pe).get(k);h.get(Pe)!==ct&&(s.uniformBlockBinding(Pe,ct,k.__bindingPointIndex),h.set(Pe,ct))}function De(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},ve=null,Qe={},A={},m=new WeakMap,b=[],p=null,d=!1,y=null,E=null,R=null,U=null,P=null,N=null,j=null,C=new Ve(0,0,0),L=0,Z=!1,ne=null,me=null,G=null,J=null,ae=null,I.set(0,0,s.canvas.width,s.canvas.height),H.set(0,0,s.canvas.width,s.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:be,disable:Y,bindFramebuffer:ue,drawBuffers:O,useProgram:ot,setBlending:ze,setMaterial:Mt,setFlipSided:et,setCullFace:D,setLineWidth:w,setPolygonOffset:ee,setScissorTest:Ce,activeTexture:Me,bindTexture:we,unbindTexture:je,compressedTexImage2D:Fe,compressedTexImage3D:We,texImage2D:Ne,texImage3D:Le,updateUBOMapping:sn,uniformBlockBinding:Et,texStorage2D:mt,texStorage3D:re,texSubImage2D:it,texSubImage3D:gt,compressedTexSubImage2D:Ee,compressedTexSubImage3D:st,scissor:bt,viewport:Re,reset:De}}function j_(s,e,t,n,i,r,a){let o=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,f=new WeakMap,A=!1;try{A=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(D,w){return A?new OffscreenCanvas(D,w):Oa("canvas")}function b(D,w,ee,Ce){let Me=1;if((D.width>Ce||D.height>Ce)&&(Me=Ce/Math.max(D.width,D.height)),Me<1||w===!0)if(typeof HTMLImageElement!="undefined"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&D instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&D instanceof ImageBitmap){let we=w?$o:Math.floor,je=we(Me*D.width),Fe=we(Me*D.height);u===void 0&&(u=m(je,Fe));let We=ee?m(je,Fe):u;return We.width=je,We.height=Fe,We.getContext("2d").drawImage(D,0,0,je,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+D.width+"x"+D.height+") to ("+je+"x"+Fe+")."),We}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+D.width+"x"+D.height+")."),D;return D}function p(D){return xl(D.width)&&xl(D.height)}function d(D){return o?!1:D.wrapS!==ri||D.wrapT!==ri||D.minFilter!==Ln&&D.minFilter!==dn}function y(D,w){return D.generateMipmaps&&w&&D.minFilter!==Ln&&D.minFilter!==dn}function E(D){s.generateMipmap(D)}function R(D,w,ee,Ce,Me=!1){if(o===!1)return w;if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let we=w;if(w===s.RED&&(ee===s.FLOAT&&(we=s.R32F),ee===s.HALF_FLOAT&&(we=s.R16F),ee===s.UNSIGNED_BYTE&&(we=s.R8)),w===s.RED_INTEGER&&(ee===s.UNSIGNED_BYTE&&(we=s.R8UI),ee===s.UNSIGNED_SHORT&&(we=s.R16UI),ee===s.UNSIGNED_INT&&(we=s.R32UI),ee===s.BYTE&&(we=s.R8I),ee===s.SHORT&&(we=s.R16I),ee===s.INT&&(we=s.R32I)),w===s.RG&&(ee===s.FLOAT&&(we=s.RG32F),ee===s.HALF_FLOAT&&(we=s.RG16F),ee===s.UNSIGNED_BYTE&&(we=s.RG8)),w===s.RGBA){let je=Me?Yo:Kt.getTransfer(Ce);ee===s.FLOAT&&(we=s.RGBA32F),ee===s.HALF_FLOAT&&(we=s.RGBA16F),ee===s.UNSIGNED_BYTE&&(we=je===hn?s.SRGB8_ALPHA8:s.RGBA8),ee===s.UNSIGNED_SHORT_4_4_4_4&&(we=s.RGBA4),ee===s.UNSIGNED_SHORT_5_5_5_1&&(we=s.RGB5_A1)}return(we===s.R16F||we===s.R32F||we===s.RG16F||we===s.RG32F||we===s.RGBA16F||we===s.RGBA32F)&&e.get("EXT_color_buffer_float"),we}function U(D,w,ee){return y(D,ee)===!0||D.isFramebufferTexture&&D.minFilter!==Ln&&D.minFilter!==dn?Math.log2(Math.max(w.width,w.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?w.mipmaps.length:1}function P(D){return D===Ln||D===Ho||D===Ia?s.NEAREST:s.LINEAR}function N(D){let w=D.target;w.removeEventListener("dispose",N),C(w),w.isVideoTexture&&h.delete(w)}function j(D){let w=D.target;w.removeEventListener("dispose",j),Z(w)}function C(D){let w=n.get(D);if(w.__webglInit===void 0)return;let ee=D.source,Ce=f.get(ee);if(Ce){let Me=Ce[w.__cacheKey];Me.usedTimes--,Me.usedTimes===0&&L(D),Object.keys(Ce).length===0&&f.delete(ee)}n.remove(D)}function L(D){let w=n.get(D);s.deleteTexture(w.__webglTexture);let ee=D.source,Ce=f.get(ee);delete Ce[w.__cacheKey],a.memory.textures--}function Z(D){let w=D.texture,ee=n.get(D),Ce=n.get(w);if(Ce.__webglTexture!==void 0&&(s.deleteTexture(Ce.__webglTexture),a.memory.textures--),D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let Me=0;Me<6;Me++){if(Array.isArray(ee.__webglFramebuffer[Me]))for(let we=0;we<ee.__webglFramebuffer[Me].length;we++)s.deleteFramebuffer(ee.__webglFramebuffer[Me][we]);else s.deleteFramebuffer(ee.__webglFramebuffer[Me]);ee.__webglDepthbuffer&&s.deleteRenderbuffer(ee.__webglDepthbuffer[Me])}else{if(Array.isArray(ee.__webglFramebuffer))for(let Me=0;Me<ee.__webglFramebuffer.length;Me++)s.deleteFramebuffer(ee.__webglFramebuffer[Me]);else s.deleteFramebuffer(ee.__webglFramebuffer);if(ee.__webglDepthbuffer&&s.deleteRenderbuffer(ee.__webglDepthbuffer),ee.__webglMultisampledFramebuffer&&s.deleteFramebuffer(ee.__webglMultisampledFramebuffer),ee.__webglColorRenderbuffer)for(let Me=0;Me<ee.__webglColorRenderbuffer.length;Me++)ee.__webglColorRenderbuffer[Me]&&s.deleteRenderbuffer(ee.__webglColorRenderbuffer[Me]);ee.__webglDepthRenderbuffer&&s.deleteRenderbuffer(ee.__webglDepthRenderbuffer)}if(D.isWebGLMultipleRenderTargets)for(let Me=0,we=w.length;Me<we;Me++){let je=n.get(w[Me]);je.__webglTexture&&(s.deleteTexture(je.__webglTexture),a.memory.textures--),n.remove(w[Me])}n.remove(w),n.remove(D)}let ne=0;function me(){ne=0}function G(){let D=ne;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),ne+=1,D}function J(D){let w=[];return w.push(D.wrapS),w.push(D.wrapT),w.push(D.wrapR||0),w.push(D.magFilter),w.push(D.minFilter),w.push(D.anisotropy),w.push(D.internalFormat),w.push(D.format),w.push(D.type),w.push(D.generateMipmaps),w.push(D.premultiplyAlpha),w.push(D.flipY),w.push(D.unpackAlignment),w.push(D.colorSpace),w.join()}function ae(D,w){let ee=n.get(D);if(D.isVideoTexture&&Mt(D),D.isRenderTargetTexture===!1&&D.version>0&&ee.__version!==D.version){let Ce=D.image;if(Ce===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Ce.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{I(ee,D,w);return}}t.bindTexture(s.TEXTURE_2D,ee.__webglTexture,s.TEXTURE0+w)}function he(D,w){let ee=n.get(D);if(D.version>0&&ee.__version!==D.version){I(ee,D,w);return}t.bindTexture(s.TEXTURE_2D_ARRAY,ee.__webglTexture,s.TEXTURE0+w)}function fe(D,w){let ee=n.get(D);if(D.version>0&&ee.__version!==D.version){I(ee,D,w);return}t.bindTexture(s.TEXTURE_3D,ee.__webglTexture,s.TEXTURE0+w)}function Ae(D,w){let ee=n.get(D);if(D.version>0&&ee.__version!==D.version){H(ee,D,w);return}t.bindTexture(s.TEXTURE_CUBE_MAP,ee.__webglTexture,s.TEXTURE0+w)}let _e={[Ei]:s.REPEAT,[ri]:s.CLAMP_TO_EDGE,[Na]:s.MIRRORED_REPEAT},ve={[Ln]:s.NEAREST,[Ho]:s.NEAREST_MIPMAP_NEAREST,[Ia]:s.NEAREST_MIPMAP_LINEAR,[dn]:s.LINEAR,[jl]:s.LINEAR_MIPMAP_NEAREST,[xi]:s.LINEAR_MIPMAP_LINEAR},Qe={[zA]:s.NEVER,[YA]:s.ALWAYS,[VA]:s.LESS,[zf]:s.LEQUAL,[WA]:s.EQUAL,[XA]:s.GEQUAL,[KA]:s.GREATER,[qA]:s.NOTEQUAL};function oe(D,w,ee){if(ee?(s.texParameteri(D,s.TEXTURE_WRAP_S,_e[w.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,_e[w.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,_e[w.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,ve[w.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,ve[w.minFilter])):(s.texParameteri(D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(w.wrapS!==ri||w.wrapT!==ri)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(D,s.TEXTURE_MAG_FILTER,P(w.magFilter)),s.texParameteri(D,s.TEXTURE_MIN_FILTER,P(w.minFilter)),w.minFilter!==Ln&&w.minFilter!==dn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),w.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,Qe[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let Ce=e.get("EXT_texture_filter_anisotropic");if(w.magFilter===Ln||w.minFilter!==Ia&&w.minFilter!==xi||w.type===ai&&e.has("OES_texture_float_linear")===!1||o===!1&&w.type===Qi&&e.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||n.get(w).__currentAnisotropy)&&(s.texParameterf(D,Ce.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy)}}function ge(D,w){let ee=!1;D.__webglInit===void 0&&(D.__webglInit=!0,w.addEventListener("dispose",N));let Ce=w.source,Me=f.get(Ce);Me===void 0&&(Me={},f.set(Ce,Me));let we=J(w);if(we!==D.__cacheKey){Me[we]===void 0&&(Me[we]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,ee=!0),Me[we].usedTimes++;let je=Me[D.__cacheKey];je!==void 0&&(Me[D.__cacheKey].usedTimes--,je.usedTimes===0&&L(w)),D.__cacheKey=we,D.__webglTexture=Me[we].texture}return ee}function I(D,w,ee){let Ce=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Ce=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Ce=s.TEXTURE_3D);let Me=ge(D,w),we=w.source;t.bindTexture(Ce,D.__webglTexture,s.TEXTURE0+ee);let je=n.get(we);if(we.version!==je.__version||Me===!0){t.activeTexture(s.TEXTURE0+ee);let Fe=Kt.getPrimaries(Kt.workingColorSpace),We=w.colorSpace===ei?null:Kt.getPrimaries(w.colorSpace),it=w.colorSpace===ei||Fe===We?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let gt=d(w)&&p(w.image)===!1,Ee=b(w.image,gt,!1,i.maxTextureSize);Ee=et(w,Ee);let st=p(Ee)||o,mt=r.convert(w.format,w.colorSpace),re=r.convert(w.type),Ne=R(w.internalFormat,mt,re,w.colorSpace,w.isVideoTexture);oe(Ce,w,st);let Le,bt=w.mipmaps,Re=o&&w.isVideoTexture!==!0&&Ne!==vc,sn=je.__version===void 0||Me===!0,Et=U(w,Ee,st);if(w.isDepthTexture)Ne=s.DEPTH_COMPONENT,o?w.type===ai?Ne=s.DEPTH_COMPONENT32F:w.type===ps?Ne=s.DEPTH_COMPONENT24:w.type===Vs?Ne=s.DEPTH24_STENCIL8:Ne=s.DEPTH_COMPONENT16:w.type===ai&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===Ws&&Ne===s.DEPTH_COMPONENT&&w.type!==Zl&&w.type!==ps&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=ps,re=r.convert(w.type)),w.format===Vr&&Ne===s.DEPTH_COMPONENT&&(Ne=s.DEPTH_STENCIL,w.type!==Vs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=Vs,re=r.convert(w.type))),sn&&(Re?t.texStorage2D(s.TEXTURE_2D,1,Ne,Ee.width,Ee.height):t.texImage2D(s.TEXTURE_2D,0,Ne,Ee.width,Ee.height,0,mt,re,null));else if(w.isDataTexture)if(bt.length>0&&st){Re&&sn&&t.texStorage2D(s.TEXTURE_2D,Et,Ne,bt[0].width,bt[0].height);for(let De=0,k=bt.length;De<k;De++)Le=bt[De],Re?t.texSubImage2D(s.TEXTURE_2D,De,0,0,Le.width,Le.height,mt,re,Le.data):t.texImage2D(s.TEXTURE_2D,De,Ne,Le.width,Le.height,0,mt,re,Le.data);w.generateMipmaps=!1}else Re?(sn&&t.texStorage2D(s.TEXTURE_2D,Et,Ne,Ee.width,Ee.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ee.width,Ee.height,mt,re,Ee.data)):t.texImage2D(s.TEXTURE_2D,0,Ne,Ee.width,Ee.height,0,mt,re,Ee.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Re&&sn&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Et,Ne,bt[0].width,bt[0].height,Ee.depth);for(let De=0,k=bt.length;De<k;De++)Le=bt[De],w.format!==Cn?mt!==null?Re?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,De,0,0,0,Le.width,Le.height,Ee.depth,mt,Le.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,De,Ne,Le.width,Le.height,Ee.depth,0,Le.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?t.texSubImage3D(s.TEXTURE_2D_ARRAY,De,0,0,0,Le.width,Le.height,Ee.depth,mt,re,Le.data):t.texImage3D(s.TEXTURE_2D_ARRAY,De,Ne,Le.width,Le.height,Ee.depth,0,mt,re,Le.data)}else{Re&&sn&&t.texStorage2D(s.TEXTURE_2D,Et,Ne,bt[0].width,bt[0].height);for(let De=0,k=bt.length;De<k;De++)Le=bt[De],w.format!==Cn?mt!==null?Re?t.compressedTexSubImage2D(s.TEXTURE_2D,De,0,0,Le.width,Le.height,mt,Le.data):t.compressedTexImage2D(s.TEXTURE_2D,De,Ne,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?t.texSubImage2D(s.TEXTURE_2D,De,0,0,Le.width,Le.height,mt,re,Le.data):t.texImage2D(s.TEXTURE_2D,De,Ne,Le.width,Le.height,0,mt,re,Le.data)}else if(w.isDataArrayTexture)Re?(sn&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Et,Ne,Ee.width,Ee.height,Ee.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Ee.width,Ee.height,Ee.depth,mt,re,Ee.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ne,Ee.width,Ee.height,Ee.depth,0,mt,re,Ee.data);else if(w.isData3DTexture)Re?(sn&&t.texStorage3D(s.TEXTURE_3D,Et,Ne,Ee.width,Ee.height,Ee.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Ee.width,Ee.height,Ee.depth,mt,re,Ee.data)):t.texImage3D(s.TEXTURE_3D,0,Ne,Ee.width,Ee.height,Ee.depth,0,mt,re,Ee.data);else if(w.isFramebufferTexture){if(sn)if(Re)t.texStorage2D(s.TEXTURE_2D,Et,Ne,Ee.width,Ee.height);else{let De=Ee.width,k=Ee.height;for(let Pe=0;Pe<Et;Pe++)t.texImage2D(s.TEXTURE_2D,Pe,Ne,De,k,0,mt,re,null),De>>=1,k>>=1}}else if(bt.length>0&&st){Re&&sn&&t.texStorage2D(s.TEXTURE_2D,Et,Ne,bt[0].width,bt[0].height);for(let De=0,k=bt.length;De<k;De++)Le=bt[De],Re?t.texSubImage2D(s.TEXTURE_2D,De,0,0,mt,re,Le):t.texImage2D(s.TEXTURE_2D,De,Ne,mt,re,Le);w.generateMipmaps=!1}else Re?(sn&&t.texStorage2D(s.TEXTURE_2D,Et,Ne,Ee.width,Ee.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,mt,re,Ee)):t.texImage2D(s.TEXTURE_2D,0,Ne,mt,re,Ee);y(w,st)&&E(Ce),je.__version=we.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function H(D,w,ee){if(w.image.length!==6)return;let Ce=ge(D,w),Me=w.source;t.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+ee);let we=n.get(Me);if(Me.version!==we.__version||Ce===!0){t.activeTexture(s.TEXTURE0+ee);let je=Kt.getPrimaries(Kt.workingColorSpace),Fe=w.colorSpace===ei?null:Kt.getPrimaries(w.colorSpace),We=w.colorSpace===ei||je===Fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let it=w.isCompressedTexture||w.image[0].isCompressedTexture,gt=w.image[0]&&w.image[0].isDataTexture,Ee=[];for(let De=0;De<6;De++)!it&&!gt?Ee[De]=b(w.image[De],!1,!0,i.maxCubemapSize):Ee[De]=gt?w.image[De].image:w.image[De],Ee[De]=et(w,Ee[De]);let st=Ee[0],mt=p(st)||o,re=r.convert(w.format,w.colorSpace),Ne=r.convert(w.type),Le=R(w.internalFormat,re,Ne,w.colorSpace),bt=o&&w.isVideoTexture!==!0,Re=we.__version===void 0||Ce===!0,sn=U(w,st,mt);oe(s.TEXTURE_CUBE_MAP,w,mt);let Et;if(it){bt&&Re&&t.texStorage2D(s.TEXTURE_CUBE_MAP,sn,Le,st.width,st.height);for(let De=0;De<6;De++){Et=Ee[De].mipmaps;for(let k=0;k<Et.length;k++){let Pe=Et[k];w.format!==Cn?re!==null?bt?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,k,0,0,Pe.width,Pe.height,re,Pe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,k,Le,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):bt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,k,0,0,Pe.width,Pe.height,re,Ne,Pe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,k,Le,Pe.width,Pe.height,0,re,Ne,Pe.data)}}}else{Et=w.mipmaps,bt&&Re&&(Et.length>0&&sn++,t.texStorage2D(s.TEXTURE_CUBE_MAP,sn,Le,Ee[0].width,Ee[0].height));for(let De=0;De<6;De++)if(gt){bt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,0,0,Ee[De].width,Ee[De].height,re,Ne,Ee[De].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,Le,Ee[De].width,Ee[De].height,0,re,Ne,Ee[De].data);for(let k=0;k<Et.length;k++){let ke=Et[k].image[De].image;bt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,k+1,0,0,ke.width,ke.height,re,Ne,ke.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,k+1,Le,ke.width,ke.height,0,re,Ne,ke.data)}}else{bt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,0,0,re,Ne,Ee[De]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,Le,re,Ne,Ee[De]);for(let k=0;k<Et.length;k++){let Pe=Et[k];bt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,k+1,0,0,re,Ne,Pe.image[De]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,k+1,Le,re,Ne,Pe.image[De])}}}y(w,mt)&&E(s.TEXTURE_CUBE_MAP),we.__version=Me.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function W(D,w,ee,Ce,Me,we){let je=r.convert(ee.format,ee.colorSpace),Fe=r.convert(ee.type),We=R(ee.internalFormat,je,Fe,ee.colorSpace);if(!n.get(w).__hasExternalTextures){let gt=Math.max(1,w.width>>we),Ee=Math.max(1,w.height>>we);Me===s.TEXTURE_3D||Me===s.TEXTURE_2D_ARRAY?t.texImage3D(Me,we,We,gt,Ee,w.depth,0,je,Fe,null):t.texImage2D(Me,we,We,gt,Ee,0,je,Fe,null)}t.bindFramebuffer(s.FRAMEBUFFER,D),ze(w)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Ce,Me,n.get(ee).__webglTexture,0,Ge(w)):(Me===s.TEXTURE_2D||Me>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Me<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Ce,Me,n.get(ee).__webglTexture,we),t.bindFramebuffer(s.FRAMEBUFFER,null)}function z(D,w,ee){if(s.bindRenderbuffer(s.RENDERBUFFER,D),w.depthBuffer&&!w.stencilBuffer){let Ce=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(ee||ze(w)){let Me=w.depthTexture;Me&&Me.isDepthTexture&&(Me.type===ai?Ce=s.DEPTH_COMPONENT32F:Me.type===ps&&(Ce=s.DEPTH_COMPONENT24));let we=Ge(w);ze(w)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,we,Ce,w.width,w.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,we,Ce,w.width,w.height)}else s.renderbufferStorage(s.RENDERBUFFER,Ce,w.width,w.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,D)}else if(w.depthBuffer&&w.stencilBuffer){let Ce=Ge(w);ee&&ze(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ce,s.DEPTH24_STENCIL8,w.width,w.height):ze(w)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ce,s.DEPTH24_STENCIL8,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,D)}else{let Ce=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let Me=0;Me<Ce.length;Me++){let we=Ce[Me],je=r.convert(we.format,we.colorSpace),Fe=r.convert(we.type),We=R(we.internalFormat,je,Fe,we.colorSpace),it=Ge(w);ee&&ze(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,it,We,w.width,w.height):ze(w)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,it,We,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,We,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function be(D,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,D),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),ae(w.depthTexture,0);let Ce=n.get(w.depthTexture).__webglTexture,Me=Ge(w);if(w.depthTexture.format===Ws)ze(w)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Ce,0,Me):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Ce,0);else if(w.depthTexture.format===Vr)ze(w)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Ce,0,Me):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Ce,0);else throw new Error("Unknown depthTexture format")}function Y(D){let w=n.get(D),ee=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!w.__autoAllocateDepthBuffer){if(ee)throw new Error("target.depthTexture not supported in Cube render targets");be(w.__webglFramebuffer,D)}else if(ee){w.__webglDepthbuffer=[];for(let Ce=0;Ce<6;Ce++)t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[Ce]),w.__webglDepthbuffer[Ce]=s.createRenderbuffer(),z(w.__webglDepthbuffer[Ce],D,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=s.createRenderbuffer(),z(w.__webglDepthbuffer,D,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function ue(D,w,ee){let Ce=n.get(D);w!==void 0&&W(Ce.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),ee!==void 0&&Y(D)}function O(D){let w=D.texture,ee=n.get(D),Ce=n.get(w);D.addEventListener("dispose",j),D.isWebGLMultipleRenderTargets!==!0&&(Ce.__webglTexture===void 0&&(Ce.__webglTexture=s.createTexture()),Ce.__version=w.version,a.memory.textures++);let Me=D.isWebGLCubeRenderTarget===!0,we=D.isWebGLMultipleRenderTargets===!0,je=p(D)||o;if(Me){ee.__webglFramebuffer=[];for(let Fe=0;Fe<6;Fe++)if(o&&w.mipmaps&&w.mipmaps.length>0){ee.__webglFramebuffer[Fe]=[];for(let We=0;We<w.mipmaps.length;We++)ee.__webglFramebuffer[Fe][We]=s.createFramebuffer()}else ee.__webglFramebuffer[Fe]=s.createFramebuffer()}else{if(o&&w.mipmaps&&w.mipmaps.length>0){ee.__webglFramebuffer=[];for(let Fe=0;Fe<w.mipmaps.length;Fe++)ee.__webglFramebuffer[Fe]=s.createFramebuffer()}else ee.__webglFramebuffer=s.createFramebuffer();if(we)if(i.drawBuffers){let Fe=D.texture;for(let We=0,it=Fe.length;We<it;We++){let gt=n.get(Fe[We]);gt.__webglTexture===void 0&&(gt.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&D.samples>0&&ze(D)===!1){let Fe=we?w:[w];ee.__webglMultisampledFramebuffer=s.createFramebuffer(),ee.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,ee.__webglMultisampledFramebuffer);for(let We=0;We<Fe.length;We++){let it=Fe[We];ee.__webglColorRenderbuffer[We]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,ee.__webglColorRenderbuffer[We]);let gt=r.convert(it.format,it.colorSpace),Ee=r.convert(it.type),st=R(it.internalFormat,gt,Ee,it.colorSpace,D.isXRRenderTarget===!0),mt=Ge(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,mt,st,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+We,s.RENDERBUFFER,ee.__webglColorRenderbuffer[We])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(ee.__webglDepthRenderbuffer=s.createRenderbuffer(),z(ee.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Me){t.bindTexture(s.TEXTURE_CUBE_MAP,Ce.__webglTexture),oe(s.TEXTURE_CUBE_MAP,w,je);for(let Fe=0;Fe<6;Fe++)if(o&&w.mipmaps&&w.mipmaps.length>0)for(let We=0;We<w.mipmaps.length;We++)W(ee.__webglFramebuffer[Fe][We],D,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,We);else W(ee.__webglFramebuffer[Fe],D,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,0);y(w,je)&&E(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){let Fe=D.texture;for(let We=0,it=Fe.length;We<it;We++){let gt=Fe[We],Ee=n.get(gt);t.bindTexture(s.TEXTURE_2D,Ee.__webglTexture),oe(s.TEXTURE_2D,gt,je),W(ee.__webglFramebuffer,D,gt,s.COLOR_ATTACHMENT0+We,s.TEXTURE_2D,0),y(gt,je)&&E(s.TEXTURE_2D)}t.unbindTexture()}else{let Fe=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(o?Fe=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Fe,Ce.__webglTexture),oe(Fe,w,je),o&&w.mipmaps&&w.mipmaps.length>0)for(let We=0;We<w.mipmaps.length;We++)W(ee.__webglFramebuffer[We],D,w,s.COLOR_ATTACHMENT0,Fe,We);else W(ee.__webglFramebuffer,D,w,s.COLOR_ATTACHMENT0,Fe,0);y(w,je)&&E(Fe),t.unbindTexture()}D.depthBuffer&&Y(D)}function ot(D){let w=p(D)||o,ee=D.isWebGLMultipleRenderTargets===!0?D.texture:[D.texture];for(let Ce=0,Me=ee.length;Ce<Me;Ce++){let we=ee[Ce];if(y(we,w)){let je=D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Fe=n.get(we).__webglTexture;t.bindTexture(je,Fe),E(je),t.unbindTexture()}}}function Ie(D){if(o&&D.samples>0&&ze(D)===!1){let w=D.isWebGLMultipleRenderTargets?D.texture:[D.texture],ee=D.width,Ce=D.height,Me=s.COLOR_BUFFER_BIT,we=[],je=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Fe=n.get(D),We=D.isWebGLMultipleRenderTargets===!0;if(We)for(let it=0;it<w.length;it++)t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+it,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+it,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let it=0;it<w.length;it++){we.push(s.COLOR_ATTACHMENT0+it),D.depthBuffer&&we.push(je);let gt=Fe.__ignoreDepthValues!==void 0?Fe.__ignoreDepthValues:!1;if(gt===!1&&(D.depthBuffer&&(Me|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&(Me|=s.STENCIL_BUFFER_BIT)),We&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Fe.__webglColorRenderbuffer[it]),gt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[je]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[je])),We){let Ee=n.get(w[it]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ee,0)}s.blitFramebuffer(0,0,ee,Ce,0,0,ee,Ce,Me,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,we)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),We)for(let it=0;it<w.length;it++){t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+it,s.RENDERBUFFER,Fe.__webglColorRenderbuffer[it]);let gt=n.get(w[it]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+it,s.TEXTURE_2D,gt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}}function Ge(D){return Math.min(i.maxSamples,D.samples)}function ze(D){let w=n.get(D);return o&&D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Mt(D){let w=a.render.frame;h.get(D)!==w&&(h.set(D,w),D.update())}function et(D,w){let ee=D.colorSpace,Ce=D.format,Me=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||D.format===El||ee!==wn&&ee!==ei&&(Kt.getTransfer(ee)===hn?o===!1?e.has("EXT_sRGB")===!0&&Ce===Cn?(D.format=El,D.minFilter=dn,D.generateMipmaps=!1):w=ec.sRGBToLinear(w):(Ce!==Cn||Me!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ee)),w}this.allocateTextureUnit=G,this.resetTextureUnits=me,this.setTexture2D=ae,this.setTexture2DArray=he,this.setTexture3D=fe,this.setTextureCube=Ae,this.rebindTextures=ue,this.setupRenderTarget=O,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=Y,this.setupFrameBufferTexture=W,this.useMultisampledRTT=ze}function Z_(s,e,t){let n=t.isWebGL2;function i(r,a=ei){let o,c=Kt.getTransfer(a);if(r===Dn)return s.UNSIGNED_BYTE;if(r===Nf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Uf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===RA)return s.BYTE;if(r===DA)return s.SHORT;if(r===Zl)return s.UNSIGNED_SHORT;if(r===Ff)return s.INT;if(r===ps)return s.UNSIGNED_INT;if(r===ai)return s.FLOAT;if(r===Qi)return n?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===PA)return s.ALPHA;if(r===Cn)return s.RGBA;if(r===LA)return s.LUMINANCE;if(r===FA)return s.LUMINANCE_ALPHA;if(r===Ws)return s.DEPTH_COMPONENT;if(r===Vr)return s.DEPTH_STENCIL;if(r===El)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===nr)return s.RED;if(r===Of)return s.RED_INTEGER;if(r===ir)return s.RG;if(r===kf)return s.RG_INTEGER;if(r===Qf)return s.RGBA_INTEGER;if(r===Ta||r===Oc||r===kc||r===Ba)if(c===hn)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Ta)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Oc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===kc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ba)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Ta)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Oc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===kc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ba)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===zo||r===ou||r===Vo||r===cu)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===zo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ou)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Vo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===cu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===vc)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Wo||r===Ko)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Wo)return c===hn?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Ko)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===qo||r===lu||r===hu||r===uu||r===Ua||r===fu||r===du||r===Au||r===pu||r===mu||r===gu||r===_u||r===bu||r===Eu)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===qo)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===lu)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===hu)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===uu)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ua)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===fu)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===du)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Au)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===pu)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===mu)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===gu)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===_u)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===bu)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Eu)return c===hn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ra||r===xu||r===yu)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Ra)return c===hn?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===xu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===yu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===NA||r===vu||r===Mu||r===Su)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Ra)return o.COMPRESSED_RED_RGTC1_EXT;if(r===vu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Mu)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Su)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Vs?n?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}var Pl=class extends bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Gn=class extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}},$_={type:"move"},Fa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let b of e.hand.values()){let p=t.getJointPose(b,n),d=this._getHandJoint(l,b);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),A=.02,m=.005;l.inputState.pinching&&f>A+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=A-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($_)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Gn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ll=class extends is{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,A=null,m=null,b=t.getContextAttributes(),p=null,d=null,y=[],E=[],R=new Je,U=null,P=new bn;P.layers.enable(1),P.viewport=new Rt;let N=new bn;N.layers.enable(2),N.viewport=new Rt;let j=[P,N],C=new Pl;C.layers.enable(1),C.layers.enable(2);let L=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let ge=y[oe];return ge===void 0&&(ge=new Fa,y[oe]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(oe){let ge=y[oe];return ge===void 0&&(ge=new Fa,y[oe]=ge),ge.getGripSpace()},this.getHand=function(oe){let ge=y[oe];return ge===void 0&&(ge=new Fa,y[oe]=ge),ge.getHandSpace()};function ne(oe){let ge=E.indexOf(oe.inputSource);if(ge===-1)return;let I=y[ge];I!==void 0&&(I.update(oe.inputSource,oe.frame,l||a),I.dispatchEvent({type:oe.type,data:oe.inputSource}))}function me(){i.removeEventListener("select",ne),i.removeEventListener("selectstart",ne),i.removeEventListener("selectend",ne),i.removeEventListener("squeeze",ne),i.removeEventListener("squeezestart",ne),i.removeEventListener("squeezeend",ne),i.removeEventListener("end",me),i.removeEventListener("inputsourceschange",G);for(let oe=0;oe<y.length;oe++){let ge=E[oe];ge!==null&&(E[oe]=null,y[oe].disconnect(ge))}L=null,Z=null,e.setRenderTarget(p),A=null,f=null,u=null,i=null,d=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(oe){r=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){o=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(oe){l=oe},this.getBaseLayer=function(){return f!==null?f:A},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(oe){if(i=oe,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",ne),i.addEventListener("selectstart",ne),i.addEventListener("selectend",ne),i.addEventListener("squeeze",ne),i.addEventListener("squeezestart",ne),i.addEventListener("squeezeend",ne),i.addEventListener("end",me),i.addEventListener("inputsourceschange",G),b.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(R),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let ge={antialias:i.renderState.layers===void 0?b.antialias:!0,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};A=new XRWebGLLayer(i,t,ge),i.updateRenderState({baseLayer:A}),e.setPixelRatio(1),e.setSize(A.framebufferWidth,A.framebufferHeight,!1),d=new oi(A.framebufferWidth,A.framebufferHeight,{format:Cn,type:Dn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil})}else{let ge=null,I=null,H=null;b.depth&&(H=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=b.stencil?Vr:Ws,I=b.stencil?Vs:ps);let W={colorFormat:t.RGBA8,depthFormat:H,scaleFactor:r};u=new XRWebGLBinding(i,t),f=u.createProjectionLayer(W),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),d=new oi(f.textureWidth,f.textureHeight,{format:Cn,type:Dn,depthTexture:new oc(f.textureWidth,f.textureHeight,I,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0});let z=e.properties.get(d);z.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Qe.setContext(i),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function G(oe){for(let ge=0;ge<oe.removed.length;ge++){let I=oe.removed[ge],H=E.indexOf(I);H>=0&&(E[H]=null,y[H].disconnect(I))}for(let ge=0;ge<oe.added.length;ge++){let I=oe.added[ge],H=E.indexOf(I);if(H===-1){for(let z=0;z<y.length;z++)if(z>=E.length){E.push(I),H=z;break}else if(E[z]===null){E[z]=I,H=z;break}if(H===-1)break}let W=y[H];W&&W.connect(I)}}let J=new Q,ae=new Q;function he(oe,ge,I){J.setFromMatrixPosition(ge.matrixWorld),ae.setFromMatrixPosition(I.matrixWorld);let H=J.distanceTo(ae),W=ge.projectionMatrix.elements,z=I.projectionMatrix.elements,be=W[14]/(W[10]-1),Y=W[14]/(W[10]+1),ue=(W[9]+1)/W[5],O=(W[9]-1)/W[5],ot=(W[8]-1)/W[0],Ie=(z[8]+1)/z[0],Ge=be*ot,ze=be*Ie,Mt=H/(-ot+Ie),et=Mt*-ot;ge.matrixWorld.decompose(oe.position,oe.quaternion,oe.scale),oe.translateX(et),oe.translateZ(Mt),oe.matrixWorld.compose(oe.position,oe.quaternion,oe.scale),oe.matrixWorldInverse.copy(oe.matrixWorld).invert();let D=be+Mt,w=Y+Mt,ee=Ge-et,Ce=ze+(H-et),Me=ue*Y/w*D,we=O*Y/w*D;oe.projectionMatrix.makePerspective(ee,Ce,Me,we,D,w),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert()}function fe(oe,ge){ge===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(ge.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(i===null)return;C.near=N.near=P.near=oe.near,C.far=N.far=P.far=oe.far,(L!==C.near||Z!==C.far)&&(i.updateRenderState({depthNear:C.near,depthFar:C.far}),L=C.near,Z=C.far);let ge=oe.parent,I=C.cameras;fe(C,ge);for(let H=0;H<I.length;H++)fe(I[H],ge);I.length===2?he(C,P,N):C.projectionMatrix.copy(P.projectionMatrix),Ae(oe,C,ge)};function Ae(oe,ge,I){I===null?oe.matrix.copy(ge.matrixWorld):(oe.matrix.copy(I.matrixWorld),oe.matrix.invert(),oe.matrix.multiply(ge.matrixWorld)),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.updateMatrixWorld(!0),oe.projectionMatrix.copy(ge.projectionMatrix),oe.projectionMatrixInverse.copy(ge.projectionMatrixInverse),oe.isPerspectiveCamera&&(oe.fov=Kr*2*Math.atan(1/oe.projectionMatrix.elements[5]),oe.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(f===null&&A===null))return c},this.setFoveation=function(oe){c=oe,f!==null&&(f.fixedFoveation=oe),A!==null&&A.fixedFoveation!==void 0&&(A.fixedFoveation=oe)};let _e=null;function ve(oe,ge){if(h=ge.getViewerPose(l||a),m=ge,h!==null){let I=h.views;A!==null&&(e.setRenderTargetFramebuffer(d,A.framebuffer),e.setRenderTarget(d));let H=!1;I.length!==C.cameras.length&&(C.cameras.length=0,H=!0);for(let W=0;W<I.length;W++){let z=I[W],be=null;if(A!==null)be=A.getViewport(z);else{let ue=u.getViewSubImage(f,z);be=ue.viewport,W===0&&(e.setRenderTargetTextures(d,ue.colorTexture,f.ignoreDepthValues?void 0:ue.depthStencilTexture),e.setRenderTarget(d))}let Y=j[W];Y===void 0&&(Y=new bn,Y.layers.enable(W),Y.viewport=new Rt,j[W]=Y),Y.matrix.fromArray(z.transform.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.projectionMatrix.fromArray(z.projectionMatrix),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert(),Y.viewport.set(be.x,be.y,be.width,be.height),W===0&&(C.matrix.copy(Y.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),H===!0&&C.cameras.push(Y)}}for(let I=0;I<y.length;I++){let H=E[I],W=y[I];H!==null&&W!==void 0&&W.update(H,ge,l||a)}_e&&_e(oe,ge),ge.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ge}),m=null}let Qe=new Xf;Qe.setAnimationLoop(ve),this.setAnimationLoop=function(oe){_e=oe},this.dispose=function(){}}};function eb(s,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,qf(s)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function i(p,d,y,E,R){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&A(p,d,R)):d.isMeshMatcapMaterial?(r(p,d),m(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),b(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?c(p,d,y,E):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Fn&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Fn&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let y=e.get(d).envMap;if(y&&(p.envMap.value=y,p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;let E=s._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*E,t(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,y,E){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*y,p.scale.value=E*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),e.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function A(p,d,y){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Fn&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,d){d.matcap&&(p.matcap.value=d.matcap)}function b(p,d){let y=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function tb(s,e,t,n){let i={},r={},a=[],o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(y,E){let R=E.program;n.uniformBlockBinding(y,R)}function l(y,E){let R=i[y.id];R===void 0&&(m(y),R=h(y),i[y.id]=R,y.addEventListener("dispose",p));let U=E.program;n.updateUBOMapping(y,U);let P=e.render.frame;r[y.id]!==P&&(f(y),r[y.id]=P)}function h(y){let E=u();y.__bindingPointIndex=E;let R=s.createBuffer(),U=y.__size,P=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,R),s.bufferData(s.UNIFORM_BUFFER,U,P),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,R),R}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let E=i[y.id],R=y.uniforms,U=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let P=0,N=R.length;P<N;P++){let j=Array.isArray(R[P])?R[P]:[R[P]];for(let C=0,L=j.length;C<L;C++){let Z=j[C];if(A(Z,P,C,U)===!0){let ne=Z.__offset,me=Array.isArray(Z.value)?Z.value:[Z.value],G=0;for(let J=0;J<me.length;J++){let ae=me[J],he=b(ae);typeof ae=="number"||typeof ae=="boolean"?(Z.__data[0]=ae,s.bufferSubData(s.UNIFORM_BUFFER,ne+G,Z.__data)):ae.isMatrix3?(Z.__data[0]=ae.elements[0],Z.__data[1]=ae.elements[1],Z.__data[2]=ae.elements[2],Z.__data[3]=0,Z.__data[4]=ae.elements[3],Z.__data[5]=ae.elements[4],Z.__data[6]=ae.elements[5],Z.__data[7]=0,Z.__data[8]=ae.elements[6],Z.__data[9]=ae.elements[7],Z.__data[10]=ae.elements[8],Z.__data[11]=0):(ae.toArray(Z.__data,G),G+=he.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ne,Z.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function A(y,E,R,U){let P=y.value,N=E+"_"+R;if(U[N]===void 0)return typeof P=="number"||typeof P=="boolean"?U[N]=P:U[N]=P.clone(),!0;{let j=U[N];if(typeof P=="number"||typeof P=="boolean"){if(j!==P)return U[N]=P,!0}else if(j.equals(P)===!1)return j.copy(P),!0}return!1}function m(y){let E=y.uniforms,R=0,U=16;for(let N=0,j=E.length;N<j;N++){let C=Array.isArray(E[N])?E[N]:[E[N]];for(let L=0,Z=C.length;L<Z;L++){let ne=C[L],me=Array.isArray(ne.value)?ne.value:[ne.value];for(let G=0,J=me.length;G<J;G++){let ae=me[G],he=b(ae),fe=R%U;fe!==0&&U-fe<he.boundary&&(R+=U-fe),ne.__data=new Float32Array(he.storage/Float32Array.BYTES_PER_ELEMENT),ne.__offset=R,R+=he.storage}}}let P=R%U;return P>0&&(R+=U-P),y.__size=R,y.__cache={},this}function b(y){let E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),E}function p(y){let E=y.target;E.removeEventListener("dispose",p);let R=a.indexOf(E.__bindingPointIndex);a.splice(R,1),s.deleteBuffer(i[E.id]),delete i[E.id],delete r[E.id]}function d(){for(let y in i)s.deleteBuffer(i[y]);a=[],i={},r={}}return{bind:c,update:l,dispose:d}}var jr=class{constructor(e={}){let{canvas:t=hp(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;let A=new Uint32Array(4),m=new Int32Array(4),b=null,p=null,d=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qt,this._useLegacyLights=!1,this.toneMapping=_s,this.toneMappingExposure=1;let E=this,R=!1,U=0,P=0,N=null,j=-1,C=null,L=new Rt,Z=new Rt,ne=null,me=new Ve(0),G=0,J=t.width,ae=t.height,he=1,fe=null,Ae=null,_e=new Rt(0,0,J,ae),ve=new Rt(0,0,J,ae),Qe=!1,oe=new Qa,ge=!1,I=!1,H=null,W=new ft,z=new Je,be=new Q,Y={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ue(){return N===null?he:1}let O=n;function ot(v,X){for(let se=0;se<v.length;se++){let ie=v[se],te=t.getContext(ie,X);if(te!==null)return te}return null}try{let v={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Yl}`),t.addEventListener("webglcontextlost",De,!1),t.addEventListener("webglcontextrestored",k,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),O===null){let X=["webgl2","webgl","experimental-webgl"];if(E.isWebGL1Renderer===!0&&X.shift(),O=ot(X,v),O===null)throw ot(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Ie,Ge,ze,Mt,et,D,w,ee,Ce,Me,we,je,Fe,We,it,gt,Ee,st,mt,re,Ne,Le,bt,Re;function sn(){Ie=new E0(O),Ge=new A0(O,Ie,e),Ie.init(Ge),Le=new Z_(O,Ie,Ge),ze=new J_(O,Ie,Ge),Mt=new v0(O),et=new O_,D=new j_(O,Ie,ze,et,Ge,Le,Mt),w=new m0(E),ee=new b0(E),Ce=new Rp(O,Ge),bt=new f0(O,Ie,Ce,Ge),Me=new x0(O,Ce,Mt,bt),we=new w0(O,Me,Ce,Mt),mt=new C0(O,Ge,D),gt=new p0(et),je=new U_(E,w,ee,Ie,Ge,bt,gt),Fe=new eb(E,et),We=new Q_,it=new K_(Ie,Ge),st=new u0(E,w,ee,ze,we,f,c),Ee=new Y_(E,we,Ge),Re=new tb(O,Mt,Ge,ze),re=new d0(O,Ie,Mt,Ge),Ne=new y0(O,Ie,Mt,Ge),Mt.programs=je.programs,E.capabilities=Ge,E.extensions=Ie,E.properties=et,E.renderLists=We,E.shadowMap=Ee,E.state=ze,E.info=Mt}sn();let Et=new Ll(E,O);this.xr=Et,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let v=Ie.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Ie.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(v){v!==void 0&&(he=v,this.setSize(J,ae,!1))},this.getSize=function(v){return v.set(J,ae)},this.setSize=function(v,X,se=!0){if(Et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=v,ae=X,t.width=Math.floor(v*he),t.height=Math.floor(X*he),se===!0&&(t.style.width=v+"px",t.style.height=X+"px"),this.setViewport(0,0,v,X)},this.getDrawingBufferSize=function(v){return v.set(J*he,ae*he).floor()},this.setDrawingBufferSize=function(v,X,se){J=v,ae=X,he=se,t.width=Math.floor(v*se),t.height=Math.floor(X*se),this.setViewport(0,0,v,X)},this.getCurrentViewport=function(v){return v.copy(L)},this.getViewport=function(v){return v.copy(_e)},this.setViewport=function(v,X,se,ie){v.isVector4?_e.set(v.x,v.y,v.z,v.w):_e.set(v,X,se,ie),ze.viewport(L.copy(_e).multiplyScalar(he).floor())},this.getScissor=function(v){return v.copy(ve)},this.setScissor=function(v,X,se,ie){v.isVector4?ve.set(v.x,v.y,v.z,v.w):ve.set(v,X,se,ie),ze.scissor(Z.copy(ve).multiplyScalar(he).floor())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(v){ze.setScissorTest(Qe=v)},this.setOpaqueSort=function(v){fe=v},this.setTransparentSort=function(v){Ae=v},this.getClearColor=function(v){return v.copy(st.getClearColor())},this.setClearColor=function(){st.setClearColor.apply(st,arguments)},this.getClearAlpha=function(){return st.getClearAlpha()},this.setClearAlpha=function(){st.setClearAlpha.apply(st,arguments)},this.clear=function(v=!0,X=!0,se=!0){let ie=0;if(v){let te=!1;if(N!==null){let Ke=N.texture.format;te=Ke===Qf||Ke===kf||Ke===Of}if(te){let Ke=N.texture.type,Ze=Ke===Dn||Ke===ps||Ke===Zl||Ke===Vs||Ke===Nf||Ke===Uf,rt=st.getClearColor(),ut=st.getClearAlpha(),St=rt.r,vt=rt.g,Ct=rt.b;Ze?(A[0]=St,A[1]=vt,A[2]=Ct,A[3]=ut,O.clearBufferuiv(O.COLOR,0,A)):(m[0]=St,m[1]=vt,m[2]=Ct,m[3]=ut,O.clearBufferiv(O.COLOR,0,m))}else ie|=O.COLOR_BUFFER_BIT}X&&(ie|=O.DEPTH_BUFFER_BIT),se&&(ie|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",De,!1),t.removeEventListener("webglcontextrestored",k,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),We.dispose(),it.dispose(),et.dispose(),w.dispose(),ee.dispose(),we.dispose(),bt.dispose(),Re.dispose(),je.dispose(),Et.dispose(),Et.removeEventListener("sessionstart",Pn),Et.removeEventListener("sessionend",Nt),H&&(H.dispose(),H=null),un.stop()};function De(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function k(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let v=Mt.autoReset,X=Ee.enabled,se=Ee.autoUpdate,ie=Ee.needsUpdate,te=Ee.type;sn(),Mt.autoReset=v,Ee.enabled=X,Ee.autoUpdate=se,Ee.needsUpdate=ie,Ee.type=te}function Pe(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function ke(v){let X=v.target;X.removeEventListener("dispose",ke),ct(X)}function ct(v){ht(v),et.remove(v)}function ht(v){let X=et.get(v).programs;X!==void 0&&(X.forEach(function(se){je.releaseProgram(se)}),v.isShaderMaterial&&je.releaseShaderCache(v))}this.renderBufferDirect=function(v,X,se,ie,te,Ke){X===null&&(X=Y);let Ze=te.isMesh&&te.matrixWorld.determinant()<0,rt=Pc(v,X,se,ie,te);ze.setMaterial(ie,Ze);let ut=se.index,St=1;if(ie.wireframe===!0){if(ut=Me.getWireframeAttribute(se),ut===void 0)return;St=2}let vt=se.drawRange,Ct=se.attributes.position,mn=vt.start*St,Yn=(vt.start+vt.count)*St;Ke!==null&&(mn=Math.max(mn,Ke.start*St),Yn=Math.min(Yn,(Ke.start+Ke.count)*St)),ut!==null?(mn=Math.max(mn,0),Yn=Math.min(Yn,ut.count)):Ct!=null&&(mn=Math.max(mn,0),Yn=Math.min(Yn,Ct.count));let $t=Yn-mn;if($t<0||$t===1/0)return;bt.setup(te,ie,rt,se,ut);let mi,on=re;if(ut!==null&&(mi=Ce.get(ut),on=Ne,on.setIndex(mi)),te.isMesh)ie.wireframe===!0?(ze.setLineWidth(ie.wireframeLinewidth*ue()),on.setMode(O.LINES)):on.setMode(O.TRIANGLES);else if(te.isLine){let Dt=ie.linewidth;Dt===void 0&&(Dt=1),ze.setLineWidth(Dt*ue()),te.isLineSegments?on.setMode(O.LINES):te.isLineLoop?on.setMode(O.LINE_LOOP):on.setMode(O.LINE_STRIP)}else te.isPoints?on.setMode(O.POINTS):te.isSprite&&on.setMode(O.TRIANGLES);if(te.isBatchedMesh)on.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else if(te.isInstancedMesh)on.renderInstances(mn,$t,te.count);else if(se.isInstancedBufferGeometry){let Dt=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Ds=Math.min(se.instanceCount,Dt);on.renderInstances(mn,$t,Ds)}else on.render(mn,$t)};function qt(v,X,se){v.transparent===!0&&v.side===Rn&&v.forceSinglePass===!1?(v.side=Fn,v.needsUpdate=!0,or(v,X,se),v.side=ki,v.needsUpdate=!0,or(v,X,se),v.side=Rn):or(v,X,se)}this.compile=function(v,X,se=null){se===null&&(se=v),p=it.get(se),p.init(),y.push(p),se.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(p.pushLight(te),te.castShadow&&p.pushShadow(te))}),v!==se&&v.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(p.pushLight(te),te.castShadow&&p.pushShadow(te))}),p.setupLights(E._useLegacyLights);let ie=new Set;return v.traverse(function(te){let Ke=te.material;if(Ke)if(Array.isArray(Ke))for(let Ze=0;Ze<Ke.length;Ze++){let rt=Ke[Ze];qt(rt,se,te),ie.add(rt)}else qt(Ke,se,te),ie.add(Ke)}),y.pop(),p=null,ie},this.compileAsync=function(v,X,se=null){let ie=this.compile(v,X,se);return new Promise(te=>{function Ke(){if(ie.forEach(function(Ze){et.get(Ze).currentProgram.isReady()&&ie.delete(Ze)}),ie.size===0){te(v);return}setTimeout(Ke,10)}Ie.get("KHR_parallel_shader_compile")!==null?Ke():setTimeout(Ke,10)})};let zt=null;function Vt(v){zt&&zt(v)}function Pn(){un.stop()}function Nt(){un.start()}let un=new Xf;un.setAnimationLoop(Vt),typeof self!="undefined"&&un.setContext(self),this.setAnimationLoop=function(v){zt=v,Et.setAnimationLoop(v),v===null?un.stop():un.start()},Et.addEventListener("sessionstart",Pn),Et.addEventListener("sessionend",Nt),this.render=function(v,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Et.enabled===!0&&Et.isPresenting===!0&&(Et.cameraAutoUpdate===!0&&Et.updateCamera(X),X=Et.getCamera()),v.isScene===!0&&v.onBeforeRender(E,v,X,N),p=it.get(v,y.length),p.init(),y.push(p),W.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),oe.setFromProjectionMatrix(W),I=this.localClippingEnabled,ge=gt.init(this.clippingPlanes,I),b=We.get(v,d.length),b.init(),d.push(b),ii(v,X,0,E.sortObjects),b.finish(),E.sortObjects===!0&&b.sort(fe,Ae),this.info.render.frame++,ge===!0&&gt.beginShadows();let se=p.state.shadowsArray;if(Ee.render(se,v,X),ge===!0&&gt.endShadows(),this.info.autoReset===!0&&this.info.reset(),st.render(b,v),p.setupLights(E._useLegacyLights),X.isArrayCamera){let ie=X.cameras;for(let te=0,Ke=ie.length;te<Ke;te++){let Ze=ie[te];no(b,v,Ze,Ze.viewport)}}else no(b,v,X);N!==null&&(D.updateMultisampleRenderTarget(N),D.updateRenderTargetMipmap(N)),v.isScene===!0&&v.onAfterRender(E,v,X),bt.resetDefaultState(),j=-1,C=null,y.pop(),y.length>0?p=y[y.length-1]:p=null,d.pop(),d.length>0?b=d[d.length-1]:b=null};function ii(v,X,se,ie){if(v.visible===!1)return;if(v.layers.test(X.layers)){if(v.isGroup)se=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(X);else if(v.isLight)p.pushLight(v),v.castShadow&&p.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||oe.intersectsSprite(v)){ie&&be.setFromMatrixPosition(v.matrixWorld).applyMatrix4(W);let Ze=we.update(v),rt=v.material;rt.visible&&b.push(v,Ze,rt,se,be.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||oe.intersectsObject(v))){let Ze=we.update(v),rt=v.material;if(ie&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),be.copy(v.boundingSphere.center)):(Ze.boundingSphere===null&&Ze.computeBoundingSphere(),be.copy(Ze.boundingSphere.center)),be.applyMatrix4(v.matrixWorld).applyMatrix4(W)),Array.isArray(rt)){let ut=Ze.groups;for(let St=0,vt=ut.length;St<vt;St++){let Ct=ut[St],mn=rt[Ct.materialIndex];mn&&mn.visible&&b.push(v,Ze,mn,se,be.z,Ct)}}else rt.visible&&b.push(v,Ze,rt,se,be.z,null)}}let Ke=v.children;for(let Ze=0,rt=Ke.length;Ze<rt;Ze++)ii(Ke[Ze],X,se,ie)}function no(v,X,se,ie){let te=v.opaque,Ke=v.transmissive,Ze=v.transparent;p.setupLightsView(se),ge===!0&&gt.setGlobalState(E.clippingPlanes,se),Ke.length>0&&la(te,Ke,X,se),ie&&ze.viewport(L.copy(ie)),te.length>0&&ar(te,X,se),Ke.length>0&&ar(Ke,X,se),Ze.length>0&&ar(Ze,X,se),ze.buffers.depth.setTest(!0),ze.buffers.depth.setMask(!0),ze.buffers.color.setMask(!0),ze.setPolygonOffset(!1)}function la(v,X,se,ie){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;let Ke=Ge.isWebGL2;H===null&&(H=new oi(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")?Qi:Dn,minFilter:xi,samples:Ke?4:0})),E.getDrawingBufferSize(z),Ke?H.setSize(z.x,z.y):H.setSize($o(z.x),$o(z.y));let Ze=E.getRenderTarget();E.setRenderTarget(H),E.getClearColor(me),G=E.getClearAlpha(),G<1&&E.setClearColor(16777215,.5),E.clear();let rt=E.toneMapping;E.toneMapping=_s,ar(v,se,ie),D.updateMultisampleRenderTarget(H),D.updateRenderTargetMipmap(H);let ut=!1;for(let St=0,vt=X.length;St<vt;St++){let Ct=X[St],mn=Ct.object,Yn=Ct.geometry,$t=Ct.material,mi=Ct.group;if($t.side===Rn&&mn.layers.test(ie.layers)){let on=$t.side;$t.side=Fn,$t.needsUpdate=!0,io(mn,se,ie,Yn,$t,mi),$t.side=on,$t.needsUpdate=!0,ut=!0}}ut===!0&&(D.updateMultisampleRenderTarget(H),D.updateRenderTargetMipmap(H)),E.setRenderTarget(Ze),E.setClearColor(me,G),E.toneMapping=rt}function ar(v,X,se){let ie=X.isScene===!0?X.overrideMaterial:null;for(let te=0,Ke=v.length;te<Ke;te++){let Ze=v[te],rt=Ze.object,ut=Ze.geometry,St=ie===null?Ze.material:ie,vt=Ze.group;rt.layers.test(se.layers)&&io(rt,X,se,ut,St,vt)}}function io(v,X,se,ie,te,Ke){v.onBeforeRender(E,X,se,ie,te,Ke),v.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),te.onBeforeRender(E,X,se,ie,v,Ke),te.transparent===!0&&te.side===Rn&&te.forceSinglePass===!1?(te.side=Fn,te.needsUpdate=!0,E.renderBufferDirect(se,X,ie,te,v,Ke),te.side=ki,te.needsUpdate=!0,E.renderBufferDirect(se,X,ie,te,v,Ke),te.side=Rn):E.renderBufferDirect(se,X,ie,te,v,Ke),v.onAfterRender(E,X,se,ie,te,Ke)}function or(v,X,se){X.isScene!==!0&&(X=Y);let ie=et.get(v),te=p.state.lights,Ke=p.state.shadowsArray,Ze=te.state.version,rt=je.getParameters(v,te.state,Ke,X,se),ut=je.getProgramCacheKey(rt),St=ie.programs;ie.environment=v.isMeshStandardMaterial?X.environment:null,ie.fog=X.fog,ie.envMap=(v.isMeshStandardMaterial?ee:w).get(v.envMap||ie.environment),St===void 0&&(v.addEventListener("dispose",ke),St=new Map,ie.programs=St);let vt=St.get(ut);if(vt!==void 0){if(ie.currentProgram===vt&&ie.lightsStateVersion===Ze)return Bs(v,rt),vt}else rt.uniforms=je.getUniforms(v),v.onBuild(se,rt,E),v.onBeforeCompile(rt,E),vt=je.acquireProgram(rt,ut),St.set(ut,vt),ie.uniforms=rt.uniforms;let Ct=ie.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Ct.clippingPlanes=gt.uniform),Bs(v,rt),ie.needsLights=Wn(v),ie.lightsStateVersion=Ze,ie.needsLights&&(Ct.ambientLightColor.value=te.state.ambient,Ct.lightProbe.value=te.state.probe,Ct.directionalLights.value=te.state.directional,Ct.directionalLightShadows.value=te.state.directionalShadow,Ct.spotLights.value=te.state.spot,Ct.spotLightShadows.value=te.state.spotShadow,Ct.rectAreaLights.value=te.state.rectArea,Ct.ltc_1.value=te.state.rectAreaLTC1,Ct.ltc_2.value=te.state.rectAreaLTC2,Ct.pointLights.value=te.state.point,Ct.pointLightShadows.value=te.state.pointShadow,Ct.hemisphereLights.value=te.state.hemi,Ct.directionalShadowMap.value=te.state.directionalShadowMap,Ct.directionalShadowMatrix.value=te.state.directionalShadowMatrix,Ct.spotShadowMap.value=te.state.spotShadowMap,Ct.spotLightMatrix.value=te.state.spotLightMatrix,Ct.spotLightMap.value=te.state.spotLightMap,Ct.pointShadowMap.value=te.state.pointShadowMap,Ct.pointShadowMatrix.value=te.state.pointShadowMatrix),ie.currentProgram=vt,ie.uniformsList=null,vt}function Vi(v){if(v.uniformsList===null){let X=v.currentProgram.getUniforms();v.uniformsList=Hr.seqWithValue(X.seq,v.uniforms)}return v.uniformsList}function Bs(v,X){let se=et.get(v);se.outputColorSpace=X.outputColorSpace,se.batching=X.batching,se.instancing=X.instancing,se.instancingColor=X.instancingColor,se.skinning=X.skinning,se.morphTargets=X.morphTargets,se.morphNormals=X.morphNormals,se.morphColors=X.morphColors,se.morphTargetsCount=X.morphTargetsCount,se.numClippingPlanes=X.numClippingPlanes,se.numIntersection=X.numClipIntersection,se.vertexAlphas=X.vertexAlphas,se.vertexTangents=X.vertexTangents,se.toneMapping=X.toneMapping}function Pc(v,X,se,ie,te){X.isScene!==!0&&(X=Y),D.resetTextureUnits();let Ke=X.fog,Ze=ie.isMeshStandardMaterial?X.environment:null,rt=N===null?E.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:wn,ut=(ie.isMeshStandardMaterial?ee:w).get(ie.envMap||Ze),St=ie.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,vt=!!se.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),Ct=!!se.morphAttributes.position,mn=!!se.morphAttributes.normal,Yn=!!se.morphAttributes.color,$t=_s;ie.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&($t=E.toneMapping);let mi=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,on=mi!==void 0?mi.length:0,Dt=et.get(ie),Ds=p.state.lights;if(ge===!0&&(I===!0||v!==C)){let kn=v===C&&ie.id===j;gt.setState(ie,v,kn)}let cn=!1;ie.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==Ds.state.version||Dt.outputColorSpace!==rt||te.isBatchedMesh&&Dt.batching===!1||!te.isBatchedMesh&&Dt.batching===!0||te.isInstancedMesh&&Dt.instancing===!1||!te.isInstancedMesh&&Dt.instancing===!0||te.isSkinnedMesh&&Dt.skinning===!1||!te.isSkinnedMesh&&Dt.skinning===!0||te.isInstancedMesh&&Dt.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&Dt.instancingColor===!1&&te.instanceColor!==null||Dt.envMap!==ut||ie.fog===!0&&Dt.fog!==Ke||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==gt.numPlanes||Dt.numIntersection!==gt.numIntersection)||Dt.vertexAlphas!==St||Dt.vertexTangents!==vt||Dt.morphTargets!==Ct||Dt.morphNormals!==mn||Dt.morphColors!==Yn||Dt.toneMapping!==$t||Ge.isWebGL2===!0&&Dt.morphTargetsCount!==on)&&(cn=!0):(cn=!0,Dt.__version=ie.version);let Wi=Dt.currentProgram;cn===!0&&(Wi=or(ie,X,te));let cr=!1,Ps=!1,lr=!1,On=Wi.getUniforms(),Ki=Dt.uniforms;if(ze.useProgram(Wi.program)&&(cr=!0,Ps=!0,lr=!0),ie.id!==j&&(j=ie.id,Ps=!0),cr||C!==v){On.setValue(O,"projectionMatrix",v.projectionMatrix),On.setValue(O,"viewMatrix",v.matrixWorldInverse);let kn=On.map.cameraPosition;kn!==void 0&&kn.setValue(O,be.setFromMatrixPosition(v.matrixWorld)),Ge.logarithmicDepthBuffer&&On.setValue(O,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&On.setValue(O,"isOrthographic",v.isOrthographicCamera===!0),C!==v&&(C=v,Ps=!0,lr=!0)}if(te.isSkinnedMesh){On.setOptional(O,te,"bindMatrix"),On.setOptional(O,te,"bindMatrixInverse");let kn=te.skeleton;kn&&(Ge.floatVertexTextures?(kn.boneTexture===null&&kn.computeBoneTexture(),On.setValue(O,"boneTexture",kn.boneTexture,D)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}te.isBatchedMesh&&(On.setOptional(O,te,"batchingTexture"),On.setValue(O,"batchingTexture",te._matricesTexture,D));let ha=se.morphAttributes;if((ha.position!==void 0||ha.normal!==void 0||ha.color!==void 0&&Ge.isWebGL2===!0)&&mt.update(te,se,Wi),(Ps||Dt.receiveShadow!==te.receiveShadow)&&(Dt.receiveShadow=te.receiveShadow,On.setValue(O,"receiveShadow",te.receiveShadow)),ie.isMeshGouraudMaterial&&ie.envMap!==null&&(Ki.envMap.value=ut,Ki.flipEnvMap.value=ut.isCubeTexture&&ut.isRenderTargetTexture===!1?-1:1),Ps&&(On.setValue(O,"toneMappingExposure",E.toneMappingExposure),Dt.needsLights&&Rs(Ki,lr),Ke&&ie.fog===!0&&Fe.refreshFogUniforms(Ki,Ke),Fe.refreshMaterialUniforms(Ki,ie,he,ae,H),Hr.upload(O,Vi(Dt),Ki,D)),ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(Hr.upload(O,Vi(Dt),Ki,D),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&On.setValue(O,"center",te.center),On.setValue(O,"modelViewMatrix",te.modelViewMatrix),On.setValue(O,"normalMatrix",te.normalMatrix),On.setValue(O,"modelMatrix",te.matrixWorld),ie.isShaderMaterial||ie.isRawShaderMaterial){let kn=ie.uniformsGroups;for(let ua=0,Lc=kn.length;ua<Lc;ua++)if(Ge.isWebGL2){let fa=kn[ua];Re.update(fa,Wi),Re.bind(fa,Wi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Wi}function Rs(v,X){v.ambientLightColor.needsUpdate=X,v.lightProbe.needsUpdate=X,v.directionalLights.needsUpdate=X,v.directionalLightShadows.needsUpdate=X,v.pointLights.needsUpdate=X,v.pointLightShadows.needsUpdate=X,v.spotLights.needsUpdate=X,v.spotLightShadows.needsUpdate=X,v.rectAreaLights.needsUpdate=X,v.hemisphereLights.needsUpdate=X}function Wn(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(v,X,se){et.get(v.texture).__webglTexture=X,et.get(v.depthTexture).__webglTexture=se;let ie=et.get(v);ie.__hasExternalTextures=!0,ie.__hasExternalTextures&&(ie.__autoAllocateDepthBuffer=se===void 0,ie.__autoAllocateDepthBuffer||Ie.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ie.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(v,X){let se=et.get(v);se.__webglFramebuffer=X,se.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(v,X=0,se=0){N=v,U=X,P=se;let ie=!0,te=null,Ke=!1,Ze=!1;if(v){let ut=et.get(v);ut.__useDefaultFramebuffer!==void 0?(ze.bindFramebuffer(O.FRAMEBUFFER,null),ie=!1):ut.__webglFramebuffer===void 0?D.setupRenderTarget(v):ut.__hasExternalTextures&&D.rebindTextures(v,et.get(v.texture).__webglTexture,et.get(v.depthTexture).__webglTexture);let St=v.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(Ze=!0);let vt=et.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(vt[X])?te=vt[X][se]:te=vt[X],Ke=!0):Ge.isWebGL2&&v.samples>0&&D.useMultisampledRTT(v)===!1?te=et.get(v).__webglMultisampledFramebuffer:Array.isArray(vt)?te=vt[se]:te=vt,L.copy(v.viewport),Z.copy(v.scissor),ne=v.scissorTest}else L.copy(_e).multiplyScalar(he).floor(),Z.copy(ve).multiplyScalar(he).floor(),ne=Qe;if(ze.bindFramebuffer(O.FRAMEBUFFER,te)&&Ge.drawBuffers&&ie&&ze.drawBuffers(v,te),ze.viewport(L),ze.scissor(Z),ze.setScissorTest(ne),Ke){let ut=et.get(v.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+X,ut.__webglTexture,se)}else if(Ze){let ut=et.get(v.texture),St=X||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,ut.__webglTexture,se||0,St)}j=-1},this.readRenderTargetPixels=function(v,X,se,ie,te,Ke,Ze){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let rt=et.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Ze!==void 0&&(rt=rt[Ze]),rt){ze.bindFramebuffer(O.FRAMEBUFFER,rt);try{let ut=v.texture,St=ut.format,vt=ut.type;if(St!==Cn&&Le.convert(St)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ct=vt===Qi&&(Ie.has("EXT_color_buffer_half_float")||Ge.isWebGL2&&Ie.has("EXT_color_buffer_float"));if(vt!==Dn&&Le.convert(vt)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(vt===ai&&(Ge.isWebGL2||Ie.has("OES_texture_float")||Ie.has("WEBGL_color_buffer_float")))&&!Ct){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=v.width-ie&&se>=0&&se<=v.height-te&&O.readPixels(X,se,ie,te,Le.convert(St),Le.convert(vt),Ke)}finally{let ut=N!==null?et.get(N).__webglFramebuffer:null;ze.bindFramebuffer(O.FRAMEBUFFER,ut)}}},this.copyFramebufferToTexture=function(v,X,se=0){let ie=Math.pow(2,-se),te=Math.floor(X.image.width*ie),Ke=Math.floor(X.image.height*ie);D.setTexture2D(X,0),O.copyTexSubImage2D(O.TEXTURE_2D,se,0,0,v.x,v.y,te,Ke),ze.unbindTexture()},this.copyTextureToTexture=function(v,X,se,ie=0){let te=X.image.width,Ke=X.image.height,Ze=Le.convert(se.format),rt=Le.convert(se.type);D.setTexture2D(se,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,se.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,se.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,se.unpackAlignment),X.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ie,v.x,v.y,te,Ke,Ze,rt,X.image.data):X.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ie,v.x,v.y,X.mipmaps[0].width,X.mipmaps[0].height,Ze,X.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,ie,v.x,v.y,Ze,rt,X.image),ie===0&&se.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),ze.unbindTexture()},this.copyTextureToTexture3D=function(v,X,se,ie,te=0){if(E.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Ke=v.max.x-v.min.x+1,Ze=v.max.y-v.min.y+1,rt=v.max.z-v.min.z+1,ut=Le.convert(ie.format),St=Le.convert(ie.type),vt;if(ie.isData3DTexture)D.setTexture3D(ie,0),vt=O.TEXTURE_3D;else if(ie.isDataArrayTexture||ie.isCompressedArrayTexture)D.setTexture2DArray(ie,0),vt=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,ie.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ie.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,ie.unpackAlignment);let Ct=O.getParameter(O.UNPACK_ROW_LENGTH),mn=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Yn=O.getParameter(O.UNPACK_SKIP_PIXELS),$t=O.getParameter(O.UNPACK_SKIP_ROWS),mi=O.getParameter(O.UNPACK_SKIP_IMAGES),on=se.isCompressedTexture?se.mipmaps[te]:se.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,on.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,on.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,v.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,v.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,v.min.z),se.isDataTexture||se.isData3DTexture?O.texSubImage3D(vt,te,X.x,X.y,X.z,Ke,Ze,rt,ut,St,on.data):se.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(vt,te,X.x,X.y,X.z,Ke,Ze,rt,ut,on.data)):O.texSubImage3D(vt,te,X.x,X.y,X.z,Ke,Ze,rt,ut,St,on),O.pixelStorei(O.UNPACK_ROW_LENGTH,Ct),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,mn),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Yn),O.pixelStorei(O.UNPACK_SKIP_ROWS,$t),O.pixelStorei(O.UNPACK_SKIP_IMAGES,mi),te===0&&ie.generateMipmaps&&O.generateMipmap(vt),ze.unbindTexture()},this.initTexture=function(v){v.isCubeTexture?D.setTextureCube(v,0):v.isData3DTexture?D.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?D.setTexture2DArray(v,0):D.setTexture2D(v,0),ze.unbindTexture()},this.resetState=function(){U=0,P=0,N=null,ze.reset(),bt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ns}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===ja?"display-p3":"srgb",t.unpackColorSpace=Kt.workingColorSpace===sa?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Qt?Ks:Hf}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ks?Qt:wn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Fl=class extends jr{};Fl.prototype.isWebGL1Renderer=!0;var cc=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ve(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Es=class extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},Zr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=bl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Pi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Zn=new Q,Js=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.applyMatrix4(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.applyNormalMatrix(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.transformDirection(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Oi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Oi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Oi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Oi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array),r=tn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ga=class extends ti{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Rr,ya=new Q,Dr=new Q,Pr=new Q,Lr=new Je,va=new Je,ed=new ft,Ro=new Q,Ma=new Q,Do=new Q,df=new Je,ll=new Je,Af=new Je,lc=class extends an{constructor(e=new Ga){if(super(),this.isSprite=!0,this.type="Sprite",Rr===void 0){Rr=new nn;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Zr(t,5);Rr.setIndex([0,1,2,0,2,3]),Rr.setAttribute("position",new Js(n,3,0,!1)),Rr.setAttribute("uv",new Js(n,2,3,!1))}this.geometry=Rr,this.material=e,this.center=new Je(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Dr.setFromMatrixScale(this.matrixWorld),ed.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Pr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Dr.multiplyScalar(-Pr.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;Po(Ro.set(-.5,-.5,0),Pr,a,Dr,i,r),Po(Ma.set(.5,-.5,0),Pr,a,Dr,i,r),Po(Do.set(.5,.5,0),Pr,a,Dr,i,r),df.set(0,0),ll.set(1,0),Af.set(1,1);let o=e.ray.intersectTriangle(Ro,Ma,Do,!1,ya);if(o===null&&(Po(Ma.set(-.5,.5,0),Pr,a,Dr,i,r),ll.set(0,1),o=e.ray.intersectTriangle(Ro,Do,Ma,!1,ya),o===null))return;let c=e.ray.origin.distanceTo(ya);c<e.near||c>e.far||t.push({distance:c,point:ya.clone(),uv:zs.getInterpolation(ya,Ro,Ma,Do,df,ll,Af,new Je),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Po(s,e,t,n,i,r){Lr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(va.x=r*Lr.x-i*Lr.y,va.y=i*Lr.x+r*Lr.y):va.copy(Lr),s.copy(e),s.x+=va.x,s.y+=va.y,s.applyMatrix4(ed)}var pf=new Q,mf=new Rt,gf=new Rt,nb=new Q,_f=new ft,Lo=new Q,hl=new vn,bf=new ft,ul=new qr,Gi=class extends qe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=au,this.bindMatrix=new ft,this.bindMatrixInverse=new ft,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new yi),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Lo),this.boundingBox.expandByPoint(Lo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new vn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Lo),this.boundingSphere.expandByPoint(Lo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hl.copy(this.boundingSphere),hl.applyMatrix4(i),e.ray.intersectsSphere(hl)!==!1&&(bf.copy(i).invert(),ul.copy(e.ray).applyMatrix4(bf),!(this.boundingBox!==null&&ul.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ul)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Rt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===au?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===BA?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;mf.fromBufferAttribute(i.attributes.skinIndex,e),gf.fromBufferAttribute(i.attributes.skinWeight,e),pf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=gf.getComponent(r);if(a!==0){let o=mf.getComponent(r);_f.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(nb.copy(pf).applyMatrix4(_f),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Ha=class extends an{constructor(){super(),this.isBone=!0,this.type="Bone"}},js=class extends zn{constructor(e=null,t=1,n=1,i,r,a,o,c,l=Ln,h=Ln,u,f){super(null,a,o,c,l,h,i,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ef=new ft,ib=new ft,Zs=class s{constructor(e=[],t=[]){this.uuid=Pi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ft)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ft;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:ib;Ef.multiplyMatrices(o,t[r]),Ef.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new js(t,e,e,Cn,ai);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Ha),this.bones.push(a),this.boneInverses.push(new ft().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Mi=class extends Ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Fr=new ft,xf=new ft,Fo=[],yf=new yi,sb=new ft,Sa=new qe,Ca=new vn,Ai=class extends qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Mi(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,sb)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new yi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fr),yf.copy(e.boundingBox).applyMatrix4(Fr),this.boundingBox.union(yf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fr),Ca.copy(e.boundingSphere).applyMatrix4(Fr),this.boundingSphere.union(Ca)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Sa.geometry=this.geometry,Sa.material=this.material,Sa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ca.copy(this.boundingSphere),Ca.applyMatrix4(n),e.ray.intersectsSphere(Ca)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Fr),xf.multiplyMatrices(n,Fr),Sa.matrixWorld=xf,Sa.raycast(e,Fo);for(let a=0,o=Fo.length;a<o;a++){let c=Fo[a];c.instanceId=r,c.object=this,t.push(c)}Fo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Mi(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var za=class extends ti{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},vf=new Q,Mf=new Q,Sf=new ft,fl=new qr,No=new vn,$r=class extends an{constructor(e=new nn,t=new za){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)vf.fromBufferAttribute(t,i-1),Mf.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=vf.distanceTo(Mf);e.setAttribute("lineDistance",new Ut(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),No.copy(n.boundingSphere),No.applyMatrix4(i),No.radius+=r,e.ray.intersectsSphere(No)===!1)return;Sf.copy(i).invert(),fl.copy(e.ray).applyMatrix4(Sf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new Q,h=new Q,u=new Q,f=new Q,A=this.isLineSegments?2:1,m=n.index,p=n.attributes.position;if(m!==null){let d=Math.max(0,a.start),y=Math.min(m.count,a.start+a.count);for(let E=d,R=y-1;E<R;E+=A){let U=m.getX(E),P=m.getX(E+1);if(l.fromBufferAttribute(p,U),h.fromBufferAttribute(p,P),fl.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let j=e.ray.origin.distanceTo(f);j<e.near||j>e.far||t.push({distance:j,point:u.clone().applyMatrix4(this.matrixWorld),index:E,face:null,faceIndex:null,object:this})}}else{let d=Math.max(0,a.start),y=Math.min(p.count,a.start+a.count);for(let E=d,R=y-1;E<R;E+=A){if(l.fromBufferAttribute(p,E),h.fromBufferAttribute(p,E+1),fl.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let P=e.ray.origin.distanceTo(f);P<e.near||P>e.far||t.push({distance:P,point:u.clone().applyMatrix4(this.matrixWorld),index:E,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}},Cf=new Q,wf=new Q,ea=class extends $r{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Cf.fromBufferAttribute(t,i),wf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Cf.distanceTo(wf);e.setAttribute("lineDistance",new Ut(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},hc=class extends $r{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Va=class extends ti{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},If=new ft,Nl=new qr,Uo=new vn,Oo=new Q,xs=class extends an{constructor(e=new nn,t=new Va){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Uo.copy(n.boundingSphere),Uo.applyMatrix4(i),Uo.radius+=r,e.ray.intersectsSphere(Uo)===!1)return;If.copy(i).invert(),Nl.copy(e.ray).applyMatrix4(If);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),A=Math.min(l.count,a.start+a.count);for(let m=f,b=A;m<b;m++){let p=l.getX(m);Oo.fromBufferAttribute(u,p),Tf(Oo,p,c,i,e,t,this)}}else{let f=Math.max(0,a.start),A=Math.min(u.count,a.start+a.count);for(let m=f,b=A;m<b;m++)Oo.fromBufferAttribute(u,m),Tf(Oo,m,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Tf(s,e,t,n,i,r,a){let o=Nl.distanceSqToPoint(s);if(o<t){let c=new Q;Nl.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}var $s=class extends zn{constructor(e,t,n,i,r,a,o,c,l,h,u,f){super(null,a,o,c,l,h,i,r,u,f),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},uc=class extends $s{constructor(e,t,n,i,r,a){super(e,t,n,r,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=ri}},fc=class extends $s{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,qs),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},er=class extends zn{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var dc=class s extends nn{constructor(e=[new Je(0,-.5),new Je(.5,0),new Je(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Vn(i,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],h=1/t,u=new Q,f=new Je,A=new Q,m=new Q,b=new Q,p=0,d=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:p=e[y+1].x-e[y].x,d=e[y+1].y-e[y].y,A.x=d*1,A.y=-p,A.z=d*0,b.copy(A),A.normalize(),c.push(A.x,A.y,A.z);break;case e.length-1:c.push(b.x,b.y,b.z);break;default:p=e[y+1].x-e[y].x,d=e[y+1].y-e[y].y,A.x=d*1,A.y=-p,A.z=d*0,m.copy(A),A.x+=b.x,A.y+=b.y,A.z+=b.z,A.normalize(),c.push(A.x,A.y,A.z),b.copy(m)}for(let y=0;y<=t;y++){let E=n+y*h*i,R=Math.sin(E),U=Math.cos(E);for(let P=0;P<=e.length-1;P++){u.x=e[P].x*R,u.y=e[P].y,u.z=e[P].x*U,a.push(u.x,u.y,u.z),f.x=y/t,f.y=P/(e.length-1),o.push(f.x,f.y);let N=c[3*P+0]*R,j=c[3*P+1],C=c[3*P+0]*U;l.push(N,j,C)}}for(let y=0;y<t;y++)for(let E=0;E<e.length-1;E++){let R=E+y*e.length,U=R,P=R+e.length,N=R+e.length+1,j=R+1;r.push(U,P,j),r.push(N,j,P)}this.setIndex(r),this.setAttribute("position",new Ut(a,3)),this.setAttribute("uv",new Ut(o,2)),this.setAttribute("normal",new Ut(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}};var Wa=class s extends nn{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new Q,h=new Je;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let A=n+u/t*i;l.x=e*Math.cos(A),l.y=e*Math.sin(A),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ut(a,3)),this.setAttribute("normal",new Ut(o,3)),this.setAttribute("uv",new Ut(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},pi=class s extends nn{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],f=[],A=[],m=0,b=[],p=n/2,d=0;y(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Ut(u,3)),this.setAttribute("normal",new Ut(f,3)),this.setAttribute("uv",new Ut(A,2));function y(){let R=new Q,U=new Q,P=0,N=(t-e)/n;for(let j=0;j<=r;j++){let C=[],L=j/r,Z=L*(t-e)+e;for(let ne=0;ne<=i;ne++){let me=ne/i,G=me*c+o,J=Math.sin(G),ae=Math.cos(G);U.x=Z*J,U.y=-L*n+p,U.z=Z*ae,u.push(U.x,U.y,U.z),R.set(J,N,ae).normalize(),f.push(R.x,R.y,R.z),A.push(me,1-L),C.push(m++)}b.push(C)}for(let j=0;j<i;j++)for(let C=0;C<r;C++){let L=b[C][j],Z=b[C+1][j],ne=b[C+1][j+1],me=b[C][j+1];h.push(L,Z,me),h.push(Z,ne,me),P+=6}l.addGroup(d,P,0),d+=P}function E(R){let U=m,P=new Je,N=new Q,j=0,C=R===!0?e:t,L=R===!0?1:-1;for(let ne=1;ne<=i;ne++)u.push(0,p*L,0),f.push(0,L,0),A.push(.5,.5),m++;let Z=m;for(let ne=0;ne<=i;ne++){let G=ne/i*c+o,J=Math.cos(G),ae=Math.sin(G);N.x=C*ae,N.y=p*L,N.z=C*J,u.push(N.x,N.y,N.z),f.push(0,L,0),P.x=J*.5+.5,P.y=ae*.5*L+.5,A.push(P.x,P.y),m++}for(let ne=0;ne<i;ne++){let me=U+ne,G=Z+ne;R===!0?h.push(G,G+1,me):h.push(G+1,G,me),j+=3}l.addGroup(d,j,R===!0?1:2),d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ka=class s extends pi{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var ys=class s extends nn{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new Q,f=new Q,A=[],m=[],b=[],p=[];for(let d=0;d<=n;d++){let y=[],E=d/n,R=0;d===0&&a===0?R=.5/t:d===n&&c===Math.PI&&(R=-.5/t);for(let U=0;U<=t;U++){let P=U/t;u.x=-e*Math.cos(i+P*r)*Math.sin(a+E*o),u.y=e*Math.cos(a+E*o),u.z=e*Math.sin(i+P*r)*Math.sin(a+E*o),m.push(u.x,u.y,u.z),f.copy(u).normalize(),b.push(f.x,f.y,f.z),p.push(P+R,1-E),y.push(l++)}h.push(y)}for(let d=0;d<n;d++)for(let y=0;y<t;y++){let E=h[d][y+1],R=h[d][y],U=h[d+1][y],P=h[d+1][y+1];(d!==0||a>0)&&A.push(E,R,P),(d!==n-1||c<Math.PI)&&A.push(R,U,P)}this.setIndex(A),this.setAttribute("position",new Ut(m,3)),this.setAttribute("normal",new Ut(b,3)),this.setAttribute("uv",new Ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var qa=class s extends nn{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new Q,u=new Q,f=new Q;for(let A=0;A<=n;A++)for(let m=0;m<=i;m++){let b=m/i*r,p=A/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(b),u.y=(e+t*Math.cos(p))*Math.sin(b),u.z=t*Math.sin(p),o.push(u.x,u.y,u.z),h.x=e*Math.cos(b),h.y=e*Math.sin(b),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(m/i),l.push(A/n)}for(let A=1;A<=n;A++)for(let m=1;m<=i;m++){let b=(i+1)*A+m-1,p=(i+1)*(A-1)+m-1,d=(i+1)*(A-1)+m,y=(i+1)*A+m;a.push(b,p,y),a.push(p,d,y)}this.setIndex(a),this.setAttribute("position",new Ut(o,3)),this.setAttribute("normal",new Ut(c,3)),this.setAttribute("uv",new Ut(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var jt=class extends ti{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=th,this.normalScale=new Je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Si=class extends jt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Je(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Vn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ci=class extends ti{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=th,this.normalScale=new Je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Jl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function ko(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function rb(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function ab(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Bf(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function td(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var vs=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ul=class extends vs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nr,endingEnd:Nr}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ur:r=e,o=2*t-n;break;case Xo:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ur:a=e,c=2*n-t;break;case Xo:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,A=this._weightNext,m=(n-t)/(i-t),b=m*m,p=b*m,d=-f*p+2*f*b-f*m,y=(1+f)*p+(-1.5-2*f)*b+(-.5+f)*m+1,E=(-1-A)*p+(1.5+A)*b+.5*m,R=A*p-A*b;for(let U=0;U!==o;++U)r[U]=d*a[h+U]+y*a[l+U]+E*a[c+U]+R*a[u+U];return r}},Ac=class extends vs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},Ol=class extends vs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},wi=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ko(t,this.TimeBufferType),this.values=ko(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ko(e.times,Array),values:ko(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ol(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ac(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ul(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Wr:t=this.InterpolantFactoryMethodDiscrete;break;case Xs:t=this.InterpolantFactoryMethodLinear;break;case Qc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Wr;case this.InterpolantFactoryMethodLinear:return Xs;case this.InterpolantFactoryMethodSmooth:return Qc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&rb(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Qc,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{let u=o*n,f=u-n,A=u+n;for(let m=0;m!==n;++m){let b=t[u+m];if(b!==t[f+m]||b!==t[A+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,f=a*n;for(let A=0;A!==n;++A)t[f+A]=t[u+A]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};wi.prototype.TimeBufferType=Float32Array;wi.prototype.ValueBufferType=Float32Array;wi.prototype.DefaultInterpolation=Xs;var Ms=class extends wi{};Ms.prototype.ValueTypeName="bool";Ms.prototype.ValueBufferType=Array;Ms.prototype.DefaultInterpolation=Wr;Ms.prototype.InterpolantFactoryMethodLinear=void 0;Ms.prototype.InterpolantFactoryMethodSmooth=void 0;var pc=class extends wi{};pc.prototype.ValueTypeName="color";var ss=class extends wi{};ss.prototype.ValueTypeName="number";var kl=class extends vs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Hn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Hi=class extends wi{InterpolantFactoryMethodLinear(e){return new kl(this.times,this.values,this.getValueSize(),e)}};Hi.prototype.ValueTypeName="quaternion";Hi.prototype.DefaultInterpolation=Xs;Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ss=class extends wi{};Ss.prototype.ValueTypeName="string";Ss.prototype.ValueBufferType=Array;Ss.prototype.DefaultInterpolation=Wr;Ss.prototype.InterpolantFactoryMethodLinear=void 0;Ss.prototype.InterpolantFactoryMethodSmooth=void 0;var rs=class extends wi{};rs.prototype.ValueTypeName="vector";var ta=class{constructor(e,t=-1,n,i=eh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Pi(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(cb(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(wi.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=ab(c);c=Bf(c,1,h),l=Bf(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new ss(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=i[u];f||(i[u]=f=[]),f.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,A,m,b){if(A.length!==0){let p=[],d=[];td(A,p,d,m),p.length!==0&&b.push(new u(f,p,d))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let A={},m;for(m=0;m<f.length;m++)if(f[m].morphTargets)for(let b=0;b<f[m].morphTargets.length;b++)A[f[m].morphTargets[b]]=-1;for(let b in A){let p=[],d=[];for(let y=0;y!==f[m].morphTargets.length;++y){let E=f[m];p.push(E.time),d.push(E.morphTarget===b?1:0)}i.push(new ss(".morphTargetInfluence["+b+"]",p,d))}c=A.length*a}else{let A=".bones["+t[u].name+"]";n(rs,A+".position",f,"pos",i),n(Hi,A+".quaternion",f,"rot",i),n(rs,A+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function ob(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ss;case"vector":case"vector2":case"vector3":case"vector4":return rs;case"color":return pc;case"quaternion":return Hi;case"bool":case"boolean":return Ms;case"string":return Ss}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function cb(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=ob(s.type);if(s.times===void 0){let t=[],n=[];td(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var ms={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},Ql=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let A=l[u],m=l[u+1];if(A.global&&(A.lastIndex=0),A.test(h))return m}return null}}},lb=new Ql,Li=class{constructor(e){this.manager=e!==void 0?e:lb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Li.DEFAULT_MATERIAL_NAME="__DEFAULT";var $i={},Gl=class extends Error{constructor(e,t){super(e),this.response=t}},as=class extends Li{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ms.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if($i[e]!==void 0){$i[e].push({onLoad:t,onProgress:n,onError:i});return}$i[e]=[],$i[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||l.body===void 0||l.body.getReader===void 0)return l;let h=$i[e],u=l.body.getReader(),f=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),A=f?parseInt(f):0,m=A!==0,b=0,p=new ReadableStream({start(d){y();function y(){u.read().then(({done:E,value:R})=>{if(E)d.close();else{b+=R.byteLength;let U=new ProgressEvent("progress",{lengthComputable:m,loaded:b,total:A});for(let P=0,N=h.length;P<N;P++){let j=h[P];j.onProgress&&j.onProgress(U)}d.enqueue(R),y()}})}}});return new Response(p)}else throw new Gl(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),f=u&&u[1]?u[1].toLowerCase():void 0,A=new TextDecoder(f);return l.arrayBuffer().then(m=>A.decode(m))}}}).then(l=>{ms.add(e,l);let h=$i[e];delete $i[e];for(let u=0,f=h.length;u<f;u++){let A=h[u];A.onLoad&&A.onLoad(l)}}).catch(l=>{let h=$i[e];if(h===void 0)throw this.manager.itemError(e),l;delete $i[e];for(let u=0,f=h.length;u<f;u++){let A=h[u];A.onError&&A.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Hl=class extends Li{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ms.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;let o=Oa("img");function c(){h(),ms.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}};var mc=class extends Li{constructor(e){super(e)}load(e,t,n,i){let r=new zn,a=new Hl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},tr=class extends an{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Xa=class extends tr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},dl=new ft,Rf=new Q,Df=new Q,Ya=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Je(512,512),this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qa,this._frameExtents=new Je(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Rf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Rf),Df.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Df),t.updateMatrixWorld(),dl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(dl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},zl=class extends Ya{constructor(){super(new bn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Kr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},gc=class extends tr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.target=new an,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new zl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Pf=new ft,wa=new Q,Al=new Q,Vl=class extends Ya{constructor(){super(new bn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Je(4,2),this._viewportCount=6,this._viewports=[new Rt(2,1,1,1),new Rt(0,1,1,1),new Rt(3,1,1,1),new Rt(1,1,1,1),new Rt(3,0,1,1),new Rt(1,0,1,1)],this._cubeDirections=[new Q(1,0,0),new Q(-1,0,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,1,0),new Q(0,-1,0)],this._cubeUps=[new Q(0,1,0),new Q(0,1,0),new Q(0,1,0),new Q(0,1,0),new Q(0,0,1),new Q(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),wa.setFromMatrixPosition(e.matrixWorld),n.position.copy(wa),Al.copy(n.position),Al.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Al),n.updateMatrixWorld(),i.makeTranslation(-wa.x,-wa.y,-wa.z),Pf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pf)}},na=class extends tr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Vl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Wl=class extends Ya{constructor(){super(new bs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Fi=class extends tr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.target=new an,this.shadow=new Wl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},_c=class extends tr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Cs=class{static decodeText(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var bc=class extends Li{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ms.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ms.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),ms.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ms.add(e,c),r.manager.itemStart(e)}};var Kl=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){Hn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let a=this._workIndex*r;Hn.multiplyQuaternionsFlat(e,a,e,t,e,n),Hn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){let a=1-i;for(let o=0;o!==r;++o){let c=t+o;e[c]=e[c]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*i}}},sh="\\[\\]\\.:\\/",hb=new RegExp("["+sh+"]","g"),rh="[^"+sh+"]",ub="[^"+sh.replace("\\.","")+"]",fb=/((?:WC+[\/:])*)/.source.replace("WC",rh),db=/(WCOD+)?/.source.replace("WCOD",ub),Ab=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rh),pb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rh),mb=new RegExp("^"+fb+db+Ab+pb+"$"),gb=["material","materials","bones","map"],ql=class{constructor(e,t,n){let i=n||rn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},rn=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(hb,"")}static parseTrackName(e){let t=mb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);gb.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};rn.Composite=ql;rn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};rn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};rn.prototype.GetterByBindingType=[rn.prototype._getValue_direct,rn.prototype._getValue_array,rn.prototype._getValue_arrayElement,rn.prototype._getValue_toArray];rn.prototype.SetterByBindingTypeAndVersioning=[[rn.prototype._setValue_direct,rn.prototype._setValue_direct_setNeedsUpdate,rn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rn.prototype._setValue_array,rn.prototype._setValue_array_setNeedsUpdate,rn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rn.prototype._setValue_arrayElement,rn.prototype._setValue_arrayElement_setNeedsUpdate,rn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rn.prototype._setValue_fromArray,rn.prototype._setValue_fromArray_setNeedsUpdate,rn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Xl=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,a=r.length,o=new Array(a),c={endingStart:Nr,endingEnd:Nr};for(let l=0;l!==a;++l){let h=r[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=UA,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case kA:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case eh:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,a=n===OA;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===$l){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){let o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=Ur,i.endingEnd=Ur):(e?i.endingStart=this.zeroSlopeAtStart?Ur:Nr:i.endingStart=Xo,t?i.endingEnd=this.zeroSlopeAtEnd?Ur:Nr:i.endingEnd=Xo)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}},_b=new Float32Array(1),ia=class extends is{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let f=i[u],A=f.name,m=h[A];if(m!==void 0)++m.referenceCount,a[u]=m;else{if(m=a[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,A));continue}let b=t&&t._propertyBindings[u].binding.parsedPath;m=new Kl(rn.create(n,A,b),f.ValueTypeName,f.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,A),a[u]=m}o[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Ac(new Float32Array(2),new Float32Array(2),1,_b),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,a=typeof e=="string"?ta.findByName(i,e):e,o=a!==null?a.uuid:e,c=this._actionsByClip[o],l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=eh),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;let h=new Xl(this,a,t,n);return this._bindAction(h,l),this._addInactiveAction(h,o,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?ta.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,r,a);let o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){let l=a[o];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yl}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yl);function Za(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new nn,l=0;for(let h=0;h<s.length;++h){let u=s[h],f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let A in u.attributes){if(!n.has(A))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+A+'" attribute exists among all geometries, or in none of them.'),null;r[A]===void 0&&(r[A]=[]),r[A].push(u.attributes[A]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let A in u.morphAttributes){if(!i.has(A))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[A]===void 0&&(a[A]=[]),a[A].push(u.morphAttributes[A])}if(e){let A;if(t)A=u.index.count;else if(u.attributes.position!==void 0)A=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,A,h),l+=A}}if(t){let h=0,u=[];for(let f=0;f<s.length;++f){let A=s[f].index;for(let m=0;m<A.count;++m)u.push(A.getX(m)+h);h+=s[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=id(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let A=[];for(let b=0;b<a[h].length;++b)A.push(a[h][b][f]);let m=id(A);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}return c}function id(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){let h=s[l];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}let a=new e(r),o=0;for(let l=0;l<s.length;++l)a.set(s[l].array,o),o+=s[l].array.length;let c=new Ft(a,t,n);return i!==void 0&&(c.gpuType=i),c}function ah(s,e){if(e===Gf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Ja||e===Mc){let t=s.getIndex();if(t===null){let a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===Ja)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var oa=class extends Li{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new dh(t)}),this.register(function(t){return new yh(t)}),this.register(function(t){return new vh(t)}),this.register(function(t){return new Mh(t)}),this.register(function(t){return new ph(t)}),this.register(function(t){return new mh(t)}),this.register(function(t){return new gh(t)}),this.register(function(t){return new _h(t)}),this.register(function(t){return new fh(t)}),this.register(function(t){return new bh(t)}),this.register(function(t){return new Ah(t)}),this.register(function(t){return new xh(t)}),this.register(function(t){return new Eh(t)}),this.register(function(t){return new hh(t)}),this.register(function(t){return new Sh(t)}),this.register(function(t){return new Ch(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Cs.extractUrlBase(e);a=Cs.resolveURL(l,this.path)}else a=Cs.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new as(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===cd){try{a[Ot.KHR_BINARY_GLTF]=new wh(e)}catch(u){i&&i(u);return}r=JSON.parse(a[Ot.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Lh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case Ot.KHR_MATERIALS_UNLIT:a[u]=new uh;break;case Ot.KHR_DRACO_MESH_COMPRESSION:a[u]=new Ih(r,this.dracoLoader);break;case Ot.KHR_TEXTURE_TRANSFORM:a[u]=new Th;break;case Ot.KHR_MESH_QUANTIZATION:a[u]=new Bh;break;default:f.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function bb(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var Ot={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},hh=class{constructor(e){this.parser=e,this.name=Ot.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ve(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],wn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Fi(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new na(h),l.distance=u;break;case"spot":l=new gc(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Is(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},uh=class{constructor(){this.name=Ot.KHR_MATERIALS_UNLIT}getMaterialType(){return An}extendParams(e,t,n){let i=[];e.color=new Ve(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],wn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Qt))}return Promise.all(i)}},fh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},dh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Je(o,o)}return Promise.all(r)}},Ah=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},ph=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ve(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],wn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Qt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},mh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},gh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ve().setRGB(o[0],o[1],o[2],wn),Promise.all(r)}},_h=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},bh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ve().setRGB(o[0],o[1],o[2],wn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Qt)),Promise.all(r)}},Eh=class{constructor(e){this.parser=e,this.name=Ot.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},xh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},yh=class{constructor(e){this.parser=e,this.name=Ot.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},vh=class{constructor(e){this.parser=e,this.name=Ot.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Mh=class{constructor(e){this.parser=e,this.name=Ot.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Sh=class{constructor(e){this.name=Ot.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,f,i.mode,i.filter).then(function(A){return A.buffer}):a.ready.then(function(){let A=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(A),h,u,f,i.mode,i.filter),A})})}else return null}},Ch=class{constructor(e){this.name=Ot.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==Ii.TRIANGLES&&l.mode!==Ii.TRIANGLE_STRIP&&l.mode!==Ii.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,A=[];for(let m of u){let b=new ft,p=new Q,d=new Hn,y=new Q(1,1,1),E=new Ai(m.geometry,m.material,f);for(let R=0;R<f;R++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,R),c.ROTATION&&d.fromBufferAttribute(c.ROTATION,R),c.SCALE&&y.fromBufferAttribute(c.SCALE,R),E.setMatrixAt(R,b.compose(p,d,y));for(let R in c)if(R==="_COLOR_0"){let U=c[R];E.instanceColor=new Mi(U.array,U.itemSize,U.normalized)}else R!=="TRANSLATION"&&R!=="ROTATION"&&R!=="SCALE"&&m.geometry.setAttribute(R,c[R]);an.prototype.copy.call(E,m),this.parser.assignFinalMaterial(E),A.push(E)}return h.isGroup?(h.clear(),h.add(...A),h):A[0]}))}},cd="glTF",$a=12,sd={JSON:1313821514,BIN:5130562},wh=class{constructor(e){this.name=Ot.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,$a),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==cd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-$a,r=new DataView(e,$a),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===sd.JSON){let l=new Uint8Array(e,$a+a,o);this.content=n.decode(l)}else if(c===sd.BIN){let l=$a+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Ih=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ot.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=Dh[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=Dh[h]||h.toLowerCase();if(a[h]!==void 0){let f=n.accessors[e.attributes[h]],A=aa[f.componentType];l[u]=A.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){i.decodeDracoFile(h,function(A){for(let m in A.attributes){let b=A.attributes[m],p=c[m];p!==void 0&&(b.normalized=p)}u(A)},o,l,wn,f)})})}},Th=class{constructor(){this.name=Ot.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Bh=class{constructor(){this.name=Ot.KHR_MESH_QUANTIZATION}},Cc=class extends vs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,f=u*u,A=f*u,m=e*l,b=m-l,p=-2*A+3*f,d=A-f,y=1-p,E=d-f+u;for(let R=0;R!==o;R++){let U=a[b+R+o],P=a[b+R+c]*h,N=a[m+R+o],j=a[m+R]*h;r[R]=y*U+E*P+p*N+d*j}return r}},Eb=new Hn,Rh=class extends Cc{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return Eb.fromArray(r).normalize().toArray(r),r}},Ii={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},aa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},rd={9728:Ln,9729:dn,9984:Ho,9985:jl,9986:Ia,9987:xi},ad={33071:ri,33648:Na,10497:Ei},oh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Dh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ws={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},xb={CUBICSPLINE:void 0,LINEAR:Xs,STEP:Wr},ch={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function yb(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new jt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ki})),s.DefaultMaterial}function sr(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Is(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function vb(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(f)}if(i){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function Mb(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Sb(s){let e,t=s.extensions&&s.extensions[Ot.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+lh(t.attributes):e=s.indices+":"+lh(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+lh(s.targets[n]);return e}function lh(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Ph(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Cb(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var wb=new ft,Lh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new bb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator!="undefined"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap=="undefined"||n||i&&r<98?this.textureLoader=new mc(this.options.manager):this.textureLoader=new bc(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new as(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return sr(r,o,i),Is(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ot.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(Cs.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=oh[i.type],o=aa[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Ft(l,a,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=oh[i.type],l=aa[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=i.byteOffset||0,A=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,b,p;if(A&&A!==u){let d=Math.floor(f/A),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+d+":"+i.count,E=t.cache.get(y);E||(b=new l(o,d*A,i.count*A/h),E=new Zr(b,A/h),t.cache.add(y,E)),p=new Js(E,c,f%A/h,m)}else o===null?b=new l(i.count*c):b=new l(o,f,i.count*c),p=new Ft(b,c,m);if(i.sparse!==void 0){let d=oh.SCALAR,y=aa[i.sparse.indices.componentType],E=i.sparse.indices.byteOffset||0,R=i.sparse.values.byteOffset||0,U=new y(a[1],E,i.sparse.count*d),P=new l(a[2],R,i.sparse.count*c);o!==null&&(p=new Ft(p.array.slice(),p.itemSize,p.normalized));for(let N=0,j=U.length;N<j;N++){let C=U[N];if(p.setX(C,P[N*c]),c>=2&&p.setY(C,P[N*c+1]),c>=3&&p.setZ(C,P[N*c+2]),c>=4&&p.setW(C,P[N*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return h.magFilter=rd[f.magFilter]||dn,h.minFilter=rd[f.minFilter]||xi,h.wrapS=ad[f.wrapS]||Ei,h.wrapT=ad[f.wrapT]||Ei,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,A){let m=f;t.isImageBitmapLoader===!0&&(m=function(b){let p=new zn(b);p.needsUpdate=!0,f(p)}),t.load(Cs.resolveURL(u,r.path),m,void 0,A)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),u.userData.mimeType=a.mimeType||Cb(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Ot.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Ot.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[Ot.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Va,ti.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new za,ti.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return jt}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[Ot.KHR_MATERIALS_UNLIT]){let u=i[Ot.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Ve(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],wn),o.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,Qt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Rn);let h=r.alphaMode||ch.OPAQUE;if(h===ch.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===ch.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==An&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Je(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==An&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==An){let u=r.emissiveFactor;o.emissive=new Ve().setRGB(u[0],u[1],u[2],wn)}return r.emissiveTexture!==void 0&&a!==An&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Qt)),Promise.all(l).then(function(){let u=new a(o);return r.name&&(u.name=r.name),Is(u,r),t.associations.set(u,{materials:e}),r.extensions&&sr(i,u,r),u})}createUniqueName(e){let t=rn.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Ot.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return od(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=Sb(l),u=i[h];if(u)a.push(u.promise);else{let f;l.extensions&&l.extensions[Ot.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=od(new nn,l,t),i[h]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?yb(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let A=0,m=h.length;A<m;A++){let b=h[A],p=a[A],d,y=l[A];if(p.mode===Ii.TRIANGLES||p.mode===Ii.TRIANGLE_STRIP||p.mode===Ii.TRIANGLE_FAN||p.mode===void 0)d=r.isSkinnedMesh===!0?new Gi(b,y):new qe(b,y),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),p.mode===Ii.TRIANGLE_STRIP?d.geometry=ah(d.geometry,Mc):p.mode===Ii.TRIANGLE_FAN&&(d.geometry=ah(d.geometry,Ja));else if(p.mode===Ii.LINES)d=new ea(b,y);else if(p.mode===Ii.LINE_STRIP)d=new $r(b,y);else if(p.mode===Ii.LINE_LOOP)d=new hc(b,y);else if(p.mode===Ii.POINTS)d=new xs(b,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(d.geometry.morphAttributes).length>0&&Mb(d,r),d.name=t.createUniqueName(r.name||"mesh_"+e),Is(d,r),p.extensions&&sr(i,d,p),t.assignFinalMaterial(d),u.push(d)}for(let A=0,m=u.length;A<m;A++)t.associations.set(u[A],{meshes:e,primitives:A});if(u.length===1)return r.extensions&&sr(i,u[0],r),u[0];let f=new Gn;r.extensions&&sr(i,f,r),t.associations.set(f,{meshes:e});for(let A=0,m=u.length;A<m;A++)f.add(u[A]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new bn(Vf.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new bs(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Is(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let f=new ft;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Zs(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,f=i.channels.length;u<f;u++){let A=i.channels[u],m=i.samplers[A.sampler],b=A.target,p=b.node,d=i.parameters!==void 0?i.parameters[m.input]:m.input,y=i.parameters!==void 0?i.parameters[m.output]:m.output;b.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",d)),c.push(this.getDependency("accessor",y)),l.push(m),h.push(b))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],A=u[1],m=u[2],b=u[3],p=u[4],d=[];for(let y=0,E=f.length;y<E;y++){let R=f[y],U=A[y],P=m[y],N=b[y],j=p[y];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();let C=n._createAnimationTracks(R,U,P,N,j);if(C)for(let L=0;L<C.length;L++)d.push(C[L])}return new ta(r,void 0,d)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(A){A.isSkinnedMesh&&A.bind(f,wb)});for(let A=0,m=u.length;A<m;A++)h.add(u[A]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Ha:l.length>1?h=new Gn:l.length===1?h=l[0]:h=new an,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Is(h,r),r.extensions&&sr(n,h,r),r.matrix!==void 0){let u=new ft;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Gn;n.name&&(r.name=i.createUniqueName(n.name)),Is(r,n),n.extensions&&sr(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,A]of i.associations)(f instanceof ti||f instanceof zn)&&u.set(f,A);return h.traverse(f=>{let A=i.associations.get(f);A!=null&&u.set(f,A)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,c=[];ws[r.path]===ws.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(o);let l;switch(ws[r.path]){case ws.weights:l=ss;break;case ws.rotation:l=Hi;break;case ws.position:case ws.scale:l=rs;break;default:switch(n.itemSize){case 1:l=ss;break;case 2:case 3:default:l=rs;break}break}let h=i.interpolation!==void 0?xb[i.interpolation]:Xs,u=this._getArrayFromAccessor(n);for(let f=0,A=c.length;f<A;f++){let m=new l(c[f]+"."+ws[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Ph(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Hi?Rh:Cc;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Ib(s,e,t){let n=e.attributes,i=new yi;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new Q(c[0],c[1],c[2]),new Q(l[0],l[1],l[2])),o.normalized){let h=Ph(aa[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new Q,c=new Q;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],A=f.min,m=f.max;if(A!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(A[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(A[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(A[2]),Math.abs(m[2]))),f.normalized){let b=Ph(aa[f.componentType]);c.multiplyScalar(b)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new vn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function od(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(let a in n){let o=Dh[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Kt.workingColorSpace!==wn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Kt.workingColorSpace}" not supported.`),Is(s,e),Ib(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?vb(s,e.targets,t):s})}var wc=function(){"use strict";var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:s,r,a=WebAssembly.instantiate(o(i),{}).then(function(d){r=d.instance,r.exports.__wasm_call_ctors()});function o(d){for(var y=new Uint8Array(d.length),E=0;E<d.length;++E){var R=d.charCodeAt(E);y[E]=R>96?R-97:R>64?R-39:R+4}for(var U=0,E=0;E<d.length;++E)y[U++]=y[E]<60?n[y[E]]:(y[E]-60)*64+y[++E];return y.buffer.slice(0,U)}function c(d,y,E,R,U,P){var N=r.exports.sbrk,j=E+3&-4,C=N(j*R),L=N(U.length),Z=new Uint8Array(r.exports.memory.buffer);Z.set(U,L);var ne=d(C,E,R,L,U.length);if(ne==0&&P&&P(C,j,R),y.set(Z.subarray(C,C+E*R)),N(C-N(0)),ne!=0)throw new Error("Malformed buffer data: "+ne)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],f=0;function A(d){var y={object:new Worker(d),pending:0,requests:{}};return y.object.onmessage=function(E){var R=E.data;y.pending-=R.count,y.requests[R.id][R.action](R.value),delete y.requests[R.id]},y}function m(d){for(var y="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+p.toString(),E=new Blob([y],{type:"text/javascript"}),R=URL.createObjectURL(E),U=0;U<d;++U)u[U]=A(R);URL.revokeObjectURL(R)}function b(d,y,E,R,U){for(var P=u[0],N=1;N<u.length;++N)u[N].pending<P.pending&&(P=u[N]);return new Promise(function(j,C){var L=new Uint8Array(E),Z=f++;P.pending+=d,P.requests[Z]={resolve:j,reject:C},P.object.postMessage({id:Z,count:d,size:y,source:L,mode:R,filter:U},[L.buffer])})}function p(d){a.then(function(){var y=d.data;try{var E=new Uint8Array(y.count*y.size);c(r.exports[y.mode],E,y.count,y.size,y.source,r.exports[y.filter]),self.postMessage({id:y.id,count:y.count,action:"resolve",value:E},[E.buffer])}catch(R){self.postMessage({id:y.id,count:y.count,action:"reject",value:R})}})}return{ready:a,supported:!0,useWorkers:function(d){m(d)},decodeVertexBuffer:function(d,y,E,R,U){c(r.exports.meshopt_decodeVertexBuffer,d,y,E,R,r.exports[l[U]])},decodeIndexBuffer:function(d,y,E,R){c(r.exports.meshopt_decodeIndexBuffer,d,y,E,R)},decodeIndexSequence:function(d,y,E,R){c(r.exports.meshopt_decodeIndexSequence,d,y,E,R)},decodeGltfBuffer:function(d,y,E,R,U,P){c(r.exports[h[U]],d,y,E,R,r.exports[l[P]])},decodeGltfBufferAsync:function(d,y,E,R,U){return u.length>0?b(d,y,E,h[R],l[U]):a.then(function(){var P=new Uint8Array(d*y);return c(r.exports[h[R]],P,d,y,E,r.exports[l[U]]),P})}}}();function ld(s){let e=new Map,t=new Map,n=s.clone();return hd(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function hd(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)hd(s.children[n],e.children[n],t)}var eo=class extends Es{constructor(e=null){super();let t=new pn;t.deleteAttribute("uv");let n=new jt({side:Fn}),i=new jt,r=5;e!==null&&e._useLegacyLights===!1&&(r=900);let a=new na(16777215,r,28,2);a.position.set(.418,16.199,.3),this.add(a);let o=new qe(t,n);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);let c=new qe(t,i);c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),this.add(c);let l=new qe(t,i);l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),this.add(l);let h=new qe(t,i);h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),this.add(h);let u=new qe(t,i);u.position.set(-2.017,.018,6.124),u.rotation.set(0,.333,0),u.scale.set(2.002,4.566,2.064),this.add(u);let f=new qe(t,i);f.position.set(2.291,-.756,-2.621),f.rotation.set(0,-.286,0),f.scale.set(1.546,1.552,1.496),this.add(f);let A=new qe(t,i);A.position.set(-2.193,-.369,-5.547),A.rotation.set(0,.516,0),A.scale.set(3.875,3.487,2.986),this.add(A);let m=new qe(t,ca(50));m.position.set(-16.116,14.37,8.208),m.scale.set(.1,2.428,2.739),this.add(m);let b=new qe(t,ca(50));b.position.set(-16.109,18.021,-8.207),b.scale.set(.1,2.425,2.751),this.add(b);let p=new qe(t,ca(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);let d=new qe(t,ca(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let y=new qe(t,ca(20));y.position.set(3.235,11.486,-12.541),y.scale.set(2.5,2,.1),this.add(y);let E=new qe(t,ca(100));E.position.set(0,20,0),E.scale.set(1,.1,1),this.add(E)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function ca(s){let e=new An;return e.color.setScalar(s),e}var Ic=class{constructor(e=4){this.pool=e,this.queue=[],this.workers=[],this.workersResolve=[],this.workerStatus=0}_initWorker(e){if(!this.workers[e]){let t=this.workerCreator();t.addEventListener("message",this._onMessage.bind(this,e)),this.workers[e]=t}}_getIdleWorker(){for(let e=0;e<this.pool;e++)if(!(this.workerStatus&1<<e))return e;return-1}_onMessage(e,t){let n=this.workersResolve[e];if(n&&n(t),this.queue.length){let{resolve:i,msg:r,transfer:a}=this.queue.shift();this.workersResolve[e]=i,this.workers[e].postMessage(r,a)}else this.workerStatus^=1<<e}setWorkerCreator(e){this.workerCreator=e}setWorkerLimit(e){this.pool=e}postMessage(e,t){return new Promise(n=>{let i=this._getIdleWorker();i!==-1?(this._initWorker(i),this.workerStatus|=1<<i,this.workersResolve[i]=n,this.workers[i].postMessage(e,t)):this.queue.push({resolve:n,msg:e,transfer:t})})}dispose(){this.workers.forEach(e=>e.terminate()),this.workersResolve.length=0,this.workers.length=0,this.queue.length=0,this.workerStatus=0}};var Fh=class{constructor(){this.vkFormat=0,this.typeSize=1,this.pixelWidth=0,this.pixelHeight=0,this.pixelDepth=0,this.layerCount=0,this.faceCount=1,this.supercompressionScheme=0,this.levels=[],this.dataFormatDescriptor=[{vendorId:0,descriptorType:0,descriptorBlockSize:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],this.keyValue={},this.globalData=null}},rr=class{constructor(e,t,n,i){this._dataView=new DataView(e.buffer,e.byteOffset+t,n),this._littleEndian=i,this._offset=0}_nextUint8(){let e=this._dataView.getUint8(this._offset);return this._offset+=1,e}_nextUint16(){let e=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,e}_nextUint32(){let e=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint64(){let e=this._dataView.getUint32(this._offset,this._littleEndian)+4294967296*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,e}_nextInt32(){let e=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,e}_skip(e){return this._offset+=e,this}_scan(e,t=0){let n=this._offset,i=0;for(;this._dataView.getUint8(this._offset)!==t&&i<e;)i++,this._offset++;return i<e&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+n,i)}},iE=new Uint8Array([0]),ni=[171,75,84,88,32,50,48,187,13,10,26,10];function ud(s){return typeof TextDecoder!="undefined"?new TextDecoder().decode(s):Buffer.from(s).toString("utf8")}function fd(s){let e=new Uint8Array(s.buffer,s.byteOffset,ni.length);if(e[0]!==ni[0]||e[1]!==ni[1]||e[2]!==ni[2]||e[3]!==ni[3]||e[4]!==ni[4]||e[5]!==ni[5]||e[6]!==ni[6]||e[7]!==ni[7]||e[8]!==ni[8]||e[9]!==ni[9]||e[10]!==ni[10]||e[11]!==ni[11])throw new Error("Missing KTX 2.0 identifier.");let t=new Fh,n=17*Uint32Array.BYTES_PER_ELEMENT,i=new rr(s,ni.length,n,!0);t.vkFormat=i._nextUint32(),t.typeSize=i._nextUint32(),t.pixelWidth=i._nextUint32(),t.pixelHeight=i._nextUint32(),t.pixelDepth=i._nextUint32(),t.layerCount=i._nextUint32(),t.faceCount=i._nextUint32();let r=i._nextUint32();t.supercompressionScheme=i._nextUint32();let a=i._nextUint32(),o=i._nextUint32(),c=i._nextUint32(),l=i._nextUint32(),h=i._nextUint64(),u=i._nextUint64(),f=new rr(s,ni.length+n,3*r*8,!0);for(let he=0;he<r;he++)t.levels.push({levelData:new Uint8Array(s.buffer,s.byteOffset+f._nextUint64(),f._nextUint64()),uncompressedByteLength:f._nextUint64()});let A=new rr(s,a,o,!0),m={vendorId:A._skip(4)._nextUint16(),descriptorType:A._nextUint16(),versionNumber:A._nextUint16(),descriptorBlockSize:A._nextUint16(),colorModel:A._nextUint8(),colorPrimaries:A._nextUint8(),transferFunction:A._nextUint8(),flags:A._nextUint8(),texelBlockDimension:[A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8()],bytesPlane:[A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8()],samples:[]},b=(m.descriptorBlockSize/4-6)/4;for(let he=0;he<b;he++){let fe={bitOffset:A._nextUint16(),bitLength:A._nextUint8(),channelType:A._nextUint8(),samplePosition:[A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8()],sampleLower:-1/0,sampleUpper:1/0};64&fe.channelType?(fe.sampleLower=A._nextInt32(),fe.sampleUpper=A._nextInt32()):(fe.sampleLower=A._nextUint32(),fe.sampleUpper=A._nextUint32()),m.samples[he]=fe}t.dataFormatDescriptor.length=0,t.dataFormatDescriptor.push(m);let p=new rr(s,c,l,!0);for(;p._offset<l;){let he=p._nextUint32(),fe=p._scan(he),Ae=ud(fe),_e=p._scan(he-fe.byteLength);t.keyValue[Ae]=Ae.match(/^ktx/i)?ud(_e):_e,p._offset%4&&p._skip(4-p._offset%4)}if(u<=0)return t;let d=new rr(s,h,u,!0),y=d._nextUint16(),E=d._nextUint16(),R=d._nextUint32(),U=d._nextUint32(),P=d._nextUint32(),N=d._nextUint32(),j=[];for(let he=0;he<r;he++)j.push({imageFlags:d._nextUint32(),rgbSliceByteOffset:d._nextUint32(),rgbSliceByteLength:d._nextUint32(),alphaSliceByteOffset:d._nextUint32(),alphaSliceByteLength:d._nextUint32()});let C=h+d._offset,L=C+R,Z=L+U,ne=Z+P,me=new Uint8Array(s.buffer,s.byteOffset+C,R),G=new Uint8Array(s.buffer,s.byteOffset+L,U),J=new Uint8Array(s.buffer,s.byteOffset+Z,P),ae=new Uint8Array(s.buffer,s.byteOffset+ne,N);return t.globalData={endpointCount:y,selectorCount:E,imageDescs:j,endpointsData:me,selectorsData:G,tablesData:J,extendedData:ae},t}var Nh,os,Oh,Uh={env:{emscripten_notify_memory_growth:function(s){Oh=new Uint8Array(os.exports.memory.buffer)}}},Tc=class{init(){return Nh||(Nh=typeof fetch!="undefined"?fetch("data:application/wasm;base64,"+dd).then(e=>e.arrayBuffer()).then(e=>WebAssembly.instantiate(e,Uh)).then(this._init):WebAssembly.instantiate(Buffer.from(dd,"base64"),Uh).then(this._init),Nh)}_init(e){os=e.instance,Uh.env.emscripten_notify_memory_growth(0)}decode(e,t=0){if(!os)throw new Error("ZSTDDecoder: Await .init() before decoding.");let n=e.byteLength,i=os.exports.malloc(n);Oh.set(e,i),t=t||Number(os.exports.ZSTD_findDecompressedSize(i,n));let r=os.exports.malloc(t),a=os.exports.ZSTD_decompress(r,t,i,n),o=Oh.slice(r,r+a);return os.exports.free(i),os.exports.free(r),o}},dd="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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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";var kh=new WeakMap,Qh=0,Gh,Ts=class s extends Li{constructor(e){super(e),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerPool=new Ic,this.workerSourceURL="",this.workerConfig=null,typeof MSC_TRANSCODER!="undefined"&&console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.')}setTranscoderPath(e){return this.transcoderPath=e,this}setWorkerLimit(e){return this.workerPool.setWorkerLimit(e),this}detectSupport(e){return e.isWebGPURenderer===!0?this.workerConfig={astcSupported:e.hasFeature("texture-compression-astc"),etc1Supported:!1,etc2Supported:e.hasFeature("texture-compression-etc2"),dxtSupported:e.hasFeature("texture-compression-bc"),bptcSupported:!1,pvrtcSupported:!1}:(this.workerConfig={astcSupported:e.extensions.has("WEBGL_compressed_texture_astc"),etc1Supported:e.extensions.has("WEBGL_compressed_texture_etc1"),etc2Supported:e.extensions.has("WEBGL_compressed_texture_etc"),dxtSupported:e.extensions.has("WEBGL_compressed_texture_s3tc"),bptcSupported:e.extensions.has("EXT_texture_compression_bptc"),pvrtcSupported:e.extensions.has("WEBGL_compressed_texture_pvrtc")||e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")},e.capabilities.isWebGL2&&(this.workerConfig.etc1Supported=!1)),this}init(){if(!this.transcoderPending){let e=new as(this.manager);e.setPath(this.transcoderPath),e.setWithCredentials(this.withCredentials);let t=e.loadAsync("basis_transcoder.js"),n=new as(this.manager);n.setPath(this.transcoderPath),n.setResponseType("arraybuffer"),n.setWithCredentials(this.withCredentials);let i=n.loadAsync("basis_transcoder.wasm");this.transcoderPending=Promise.all([t,i]).then(([r,a])=>{let o=s.BasisWorker.toString(),c=["/* constants */","let _EngineFormat = "+JSON.stringify(s.EngineFormat),"let _TranscoderFormat = "+JSON.stringify(s.TranscoderFormat),"let _BasisFormat = "+JSON.stringify(s.BasisFormat),"/* basis_transcoder.js */",r,"/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([c])),this.transcoderBinary=a,this.workerPool.setWorkerCreator(()=>{let l=new Worker(this.workerSourceURL),h=this.transcoderBinary.slice(0);return l.postMessage({type:"init",config:this.workerConfig,transcoderBinary:h},[h]),l})}),Qh>0&&console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."),Qh++}return this.transcoderPending}load(e,t,n,i){if(this.workerConfig===null)throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");let r=new as(this.manager);r.setResponseType("arraybuffer"),r.setWithCredentials(this.withCredentials),r.load(e,a=>{if(kh.has(a))return kh.get(a).promise.then(t).catch(i);this._createTexture(a).then(o=>t?t(o):null).catch(i)},n,i)}_createTextureFrom(e,t){let{faces:n,width:i,height:r,format:a,type:o,error:c,dfdFlags:l}=e;if(o==="error")return Promise.reject(c);let h;if(t.faceCount===6)h=new fc(n,a,Dn);else{let u=n[0].mipmaps;h=t.layerCount>1?new uc(u,i,r,t.layerCount,a,Dn):new $s(u,i,r,a,Dn)}return h.minFilter=n[0].mipmaps.length===1?dn:xi,h.magFilter=dn,h.generateMipmaps=!1,h.needsUpdate=!0,h.colorSpace=Bd(t),h.premultiplyAlpha=!!(l&1),h}async _createTexture(e,t={}){let n=fd(new Uint8Array(e));if(n.vkFormat!==0)return Ub(n);let i=t,r=this.init().then(()=>this.workerPool.postMessage({type:"transcode",buffer:e,taskConfig:i},[e])).then(a=>this._createTextureFrom(a.data,n));return kh.set(e,{promise:r}),r}dispose(){return this.workerPool.dispose(),this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),Qh--,this}};Ts.BasisFormat={ETC1S:0,UASTC_4x4:1};Ts.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16};Ts.EngineFormat={RGBAFormat:Cn,RGBA_ASTC_4x4_Format:qo,RGBA_BPTC_Format:Ra,RGBA_ETC2_EAC_Format:Ko,RGBA_PVRTC_4BPPV1_Format:Vo,RGBA_S3TC_DXT5_Format:Ba,RGB_ETC1_Format:vc,RGB_ETC2_Format:Wo,RGB_PVRTC_4BPPV1_Format:zo,RGB_S3TC_DXT1_Format:Ta};Ts.BasisWorker=function(){let s,e,t,n=_EngineFormat,i=_TranscoderFormat,r=_BasisFormat;self.addEventListener("message",function(m){let b=m.data;switch(b.type){case"init":s=b.config,a(b.transcoderBinary);break;case"transcode":e.then(()=>{try{let{faces:p,buffers:d,width:y,height:E,hasAlpha:R,format:U,dfdFlags:P}=o(b.buffer);self.postMessage({type:"transcode",id:b.id,faces:p,width:y,height:E,hasAlpha:R,format:U,dfdFlags:P},d)}catch(p){console.error(p),self.postMessage({type:"error",id:b.id,error:p.message})}});break}});function a(m){e=new Promise(b=>{t={wasmBinary:m,onRuntimeInitialized:b},BASIS(t)}).then(()=>{t.initializeBasis(),t.KTX2File===void 0&&console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.")})}function o(m){let b=new t.KTX2File(new Uint8Array(m));function p(){b.close(),b.delete()}if(!b.isValid())throw p(),new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");let d=b.isUASTC()?r.UASTC_4x4:r.ETC1S,y=b.getWidth(),E=b.getHeight(),R=b.getLayers()||1,U=b.getLevels(),P=b.getFaces(),N=b.getHasAlpha(),j=b.getDFDFlags(),{transcoderFormat:C,engineFormat:L}=u(d,y,E,N);if(!y||!E||!U)throw p(),new Error("THREE.KTX2Loader:	Invalid texture");if(!b.startTranscoding())throw p(),new Error("THREE.KTX2Loader: .startTranscoding failed");let Z=[],ne=[];for(let me=0;me<P;me++){let G=[];for(let J=0;J<U;J++){let ae=[],he,fe;for(let _e=0;_e<R;_e++){let ve=b.getImageLevelInfo(J,_e,me);me===0&&J===0&&_e===0&&(ve.origWidth%4!==0||ve.origHeight%4!==0)&&console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."),U>1?(he=ve.origWidth,fe=ve.origHeight):(he=ve.width,fe=ve.height);let Qe=new Uint8Array(b.getImageTranscodedSizeInBytes(J,_e,0,C));if(!b.transcodeImage(Qe,J,_e,me,C,0,-1,-1))throw p(),new Error("THREE.KTX2Loader: .transcodeImage failed.");ae.push(Qe)}let Ae=A(ae);G.push({data:Ae,width:he,height:fe}),ne.push(Ae.buffer)}Z.push({mipmaps:G,width:y,height:E,format:L})}return p(),{faces:Z,buffers:ne,width:y,height:E,hasAlpha:N,format:L,dfdFlags:j}}let c=[{if:"astcSupported",basisFormat:[r.UASTC_4x4],transcoderFormat:[i.ASTC_4x4,i.ASTC_4x4],engineFormat:[n.RGBA_ASTC_4x4_Format,n.RGBA_ASTC_4x4_Format],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:"bptcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.BC7_M5,i.BC7_M5],engineFormat:[n.RGBA_BPTC_Format,n.RGBA_BPTC_Format],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:"dxtSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.BC1,i.BC3],engineFormat:[n.RGB_S3TC_DXT1_Format,n.RGBA_S3TC_DXT5_Format],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:"etc2Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.ETC1,i.ETC2],engineFormat:[n.RGB_ETC2_Format,n.RGBA_ETC2_EAC_Format],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:"etc1Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.ETC1],engineFormat:[n.RGB_ETC1_Format],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:"pvrtcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.PVRTC1_4_RGB,i.PVRTC1_4_RGBA],engineFormat:[n.RGB_PVRTC_4BPPV1_Format,n.RGBA_PVRTC_4BPPV1_Format],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0}],l=c.sort(function(m,b){return m.priorityETC1S-b.priorityETC1S}),h=c.sort(function(m,b){return m.priorityUASTC-b.priorityUASTC});function u(m,b,p,d){let y,E,R=m===r.ETC1S?l:h;for(let U=0;U<R.length;U++){let P=R[U];if(s[P.if]&&P.basisFormat.includes(m)&&!(d&&P.transcoderFormat.length<2)&&!(P.needsPowerOfTwo&&!(f(b)&&f(p))))return y=P.transcoderFormat[d?1:0],E=P.engineFormat[d?1:0],{transcoderFormat:y,engineFormat:E}}return console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."),y=i.RGBA32,E=n.RGBAFormat,{transcoderFormat:y,engineFormat:E}}function f(m){return m<=2?!0:(m&m-1)===0&&m!==0}function A(m){if(m.length===1)return m[0];let b=0;for(let y=0;y<m.length;y++){let E=m[y];b+=E.byteLength}let p=new Uint8Array(b),d=0;for(let y=0;y<m.length;y++){let E=m[y];p.set(E,d),d+=E.byteLength}return p}};var Nb=new Set([Cn,ir,nr]),Hh={[109]:Cn,[97]:Cn,[37]:Cn,[43]:Cn,[103]:ir,[83]:ir,[16]:ir,[22]:ir,[100]:nr,[76]:nr,[15]:nr,[9]:nr,[166]:Ua,[165]:Ua},zh={[109]:ai,[97]:Qi,[37]:Dn,[43]:Dn,[103]:ai,[83]:Qi,[16]:Dn,[22]:Dn,[100]:ai,[76]:Qi,[15]:Dn,[9]:Dn,[166]:Dn,[165]:Dn};async function Ub(s){let{vkFormat:e}=s;if(Hh[e]===void 0)throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");let t;s.supercompressionScheme===2&&(Gh||(Gh=new Promise(async r=>{let a=new Tc;await a.init(),r(a)})),t=await Gh);let n=[];for(let r=0;r<s.levels.length;r++){let a=Math.max(1,s.pixelWidth>>r),o=Math.max(1,s.pixelHeight>>r),c=s.pixelDepth?Math.max(1,s.pixelDepth>>r):0,l=s.levels[r],h;if(s.supercompressionScheme===0)h=l.levelData;else if(s.supercompressionScheme===2)h=t.decode(l.levelData,l.uncompressedByteLength);else throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");let u;zh[e]===ai?u=new Float32Array(h.buffer,h.byteOffset,h.byteLength/Float32Array.BYTES_PER_ELEMENT):zh[e]===Qi?u=new Uint16Array(h.buffer,h.byteOffset,h.byteLength/Uint16Array.BYTES_PER_ELEMENT):u=h,n.push({data:u,width:a,height:o,depth:c})}let i;if(Nb.has(Hh[e]))i=s.pixelDepth===0?new js(n[0].data,s.pixelWidth,s.pixelHeight):new ka(n[0].data,s.pixelWidth,s.pixelHeight,s.pixelDepth);else{if(s.pixelDepth>0)throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");i=new $s(n,s.pixelWidth,s.pixelHeight)}return i.mipmaps=n,i.type=zh[e],i.format=Hh[e],i.colorSpace=Bd(s),i.needsUpdate=!0,Promise.resolve(i)}function Bd(s){let e=s.dataFormatDescriptor[0];return e.colorPrimaries===1?e.transferFunction===2?Qt:wn:e.colorPrimaries===10?e.transferFunction===2?ja:sa:e.colorPrimaries===0?ei:(console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${e.colorPrimaries}"`),ei)}var ci=Q,Vh=Hn,cs=(s,e,t)=>s<e?e:s>t?t:s,Bc=(s,e,t)=>{let n=cs((t-s)/(e-s),0,1);return n*n*(3-2*n)},Ob=1.9405,Rd={Pass:{dur:.6,contact:.18},Shoot:{dur:.85,contact:.22},Tackle:{dur:1.3,contact:.3},Celebrate_KneeSlide:{dur:2,hold:1,fade:.22},Celebrate_Jump:{dur:1.1,fade:.18,out:.22},Trophy_Lift:{dur:2,hold:1,fade:.3}},Dd={jump:"Celebrate_Jump",slide:"Celebrate_KneeSlide",trophy:"Trophy_Lift"},kb={af:[90.6,58.4,42],ca:[223.7,168.5,136.8],as:[199.2,155.4,129.5]},Qb={plain:0,stripes:1,hoops:2,halves:3,sash:4,pinstripes:5,chevron:6,gradient:7,checker:8,centre:9},Rc=["as","ca","lean","stocky","f_nose_w","f_nose_l","f_nose_hump","f_chin","f_chin_w","f_jaw","f_cheek","f_lips","f_head_sq","f_head_ov","f_brow"],Gb={shaved:["",0],buzz:["",.9],fade:["crop",1],crew:["crop",1],afro:["afro",1],top:["afro",1],twist:["afro",1],dread:["afro",1],locks:["afro",1],locksL:["afro",1],bleach:["afro",1],corn:["crop",1],hawk:["crop",1],under:["crop",1],curl:["afro",1]},Hb={shaved:["",0],buzz:["",.85],crew:["short",1],fade:["short",1],short:["short",1],part:["slick",1],quiff:["messy",1],slick:["slick",1],curl:["wavy",1],bun:["wavy",1],pony:["wavy",1],long:["wavy",1],hawk:["messy",1],under:["messy",1],bleach:["short",1]},zb=`attribute float _part; attribute vec2 aPrint; attribute vec2 aPat; attribute vec4 aZone; attribute vec4 _cloth; attribute vec4 _skin2; attribute vec4 _w2;
uniform vec4 uClothF; varying float vPart; varying vec2 vPrint; varying vec2 vPat; varying vec4 vZone; varying vec2 vUvA; varying vec3 vRest;
`,Vb=`uniform vec3 uTint, uHairC, uIris, uP1, uP2, uTrim, uSlv, uSho, uSoc, uSocT, uBoot, uBoot2, uGlove; uniform float uPat, uPatW, uSlvOn, uScalp, uErase, uGK, uBeard;
uniform sampler2D uPrint, uData, uKnit; varying float vPart; varying vec2 vPrint; varying vec2 vPat; varying vec4 vZone; varying vec2 vUvA; varying vec3 vRest;
uniform vec2 uMgr; uniform vec3 uTrou;
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
`;function Pd(s){let{scene:e,tier:t,ctx:n,F:i,url:r,used:a,SC:o,getR:c,cvs:l,blobTex:h,SKINS:u}=s,f={ok:!1,chars:[],byId:new Map,heroOk:!1},A=new oa;A.setMeshoptDecoder(wc);let m=null,b=I=>!/^fan/.test(String(I));f.isPlayer=b,f.glassAnchor=function(I){if(f._ga)return f._ga;let H=I.lod.match,W=H.geometry,z=W.attributes.position,be=W.attributes._part,Y=new ci,ue=new ci,O=0,ot=-9;for(let w=0;w<z.count;w++)Math.round(be.getX(w))===1&&(Y.fromBufferAttribute(z,w),ue.add(Y),O++,ot=Math.max(ot,Y.z));ue.multiplyScalar(1/Math.max(1,O)),ue.z=ot;let Ie=new ci(0,1,0).applyMatrix4(H.bindMatrix),Ge=new ci(0,-.986,0).applyMatrix4(H.bindMatrix),ze=(Ie.y-Ge.y)/1.8,Mt=ue.applyMatrix4(H.bindMatrix);Mt.z+=.012*ze;let et=H.skeleton.bones.indexOf(I.bones.Head),D=new ft().copy(H.skeleton.boneInverses[et]).multiply(new ft().compose(Mt,new Vh,new ci(ze,ze,ze)));return f._ga=D},f.makeLoose=function(){let I=N();e.remove(I.root),f.chars.splice(f.chars.indexOf(I),1);let H=s.chars.indexOf(I);return H>=0&&s.chars.splice(H,1),I.port=!0,I};let p={bones:null,lod:{},cards:{},skins:{},clips:{},knit:null},d=I=>{let H=I.geometry;for(let[W,z]of[["uv1","aPrint"],["uv2","aPat"],["color","aZone"]])H.attributes[W]&&(H.setAttribute(z,H.attributes[W]),H.deleteAttribute(W));return H.boundingSphere=new vn(new ci(0,0,0),4),{geo:H,inv:I.skeleton.boneInverses,bind:I.bindMatrix.clone(),names:I.skeleton.bones.map(W=>W.name),mat:I.material,dict:I.morphTargetDictionary}},y=I=>{let H=I.geometry,W=I.skeleton.bones.findIndex(z=>z.name==="Head");return H.boundingSphere=new vn(new ci(0,0,0),4),{geo:H,m:new ft().multiplyMatrices(I.skeleton.boneInverses[W],I.bindMatrix),map:I.material.map}};function E(){if(p.knit)return p.knit;let I=128,H=new Float32Array(I*I),W=8,z=I/W;for(let ue=0;ue<I;ue++)for(let O=0;O<I;O++){let ot=Math.floor(ue/z),Ie=ot%2*z/2,Ge=(O+Ie)%z-z/2,ze=ue%z-z/2,Mt=Math.hypot(Ge*.9,ze)/(z*.5);H[ue*I+O]=-Math.exp(-Math.pow(Mt/.42,2))*.9+(.5+.5*Math.cos(O/I*W*4*Math.PI+ue/I*2*Math.PI*W))*.25}let be=new Uint8Array(I*I*4);for(let ue=0;ue<I;ue++)for(let O=0;O<I;O++){let ot=(et,D)=>H[(D+I)%I*I+(et+I)%I],Ie=(ot(O+1,ue)-ot(O-1,ue))*1.1,Ge=(ot(O,ue-1)-ot(O,ue+1))*1.1,ze=Math.hypot(Ie,Ge,1),Mt=(ue*I+O)*4;be[Mt]=(-Ie/ze*.5+.5)*255,be[Mt+1]=(-Ge/ze*.5+.5)*255,be[Mt+2]=(1/ze*.5+.5)*255,be[Mt+3]=255}let Y=new js(be,I,I,Cn);return Y.wrapS=Y.wrapT=Ei,Y.generateMipmaps=!0,Y.minFilter=xi,Y.magFilter=dn,Y.needsUpdate=!0,p.knit=Y}f.ready=(async()=>{let I=c();if(!I)throw new Error("no renderer");m=new Ts().setTranscoderPath(n.base).detectSupport(I),A.setKTX2Loader(m);let[H,W]=await Promise.all([A.loadAsync(r("w3d-mh.glb")),A.loadAsync(r("w3d-mh-anims.glb"))]);H.scene.updateMatrixWorld(!0),H.scene.traverse(z=>{z.isSkinnedMesh&&/^P_/.test(z.name)?p.lod[z.name.slice(2)]=d(z):z.isSkinnedMesh&&/^C_/.test(z.name)?p.cards[z.name.slice(2)]=y(z):z.isMesh&&/^tex_/.test(z.name)&&(p.skins[z.name.slice(9)]=z.material.map),z.isBone&&z.name==="root"&&!p.bones&&(p.bones=z.parent&&!z.parent.isBone?z.parent:z)}),p.skins.af=p.lod.match.mat.map,p.normal=p.lod.match.mat.normalMap,p.data=p.lod.match.mat.aoMap;for(let z of W.animations)p.clips[z.name]=z;if(!p.lod.match||!p.lod.far||!p.clips.Idle_Loop)throw new Error("mh files incomplete");f.ok=!0;try{let z=new bn(40,1,.1,100);z.position.set(0,1,4),z.lookAt(0,1,0);let be=new oi(8,8);I.setRenderTarget(be),I.render(H.scene,z),I.setRenderTarget(null),be.dispose();let Y=N();for(let ue in Y.lod)Y.lod[ue].visible=!0;Y.hair.visible=!0,Y.root.visible=!0,I.compile(e,z);for(let ue in Y.lod)Y.lod[ue].visible=!1;Y.hair.visible=!1}catch(z){console.warn("3D mh warm",z)}return t==="high"&&A.loadAsync(r("w3d-mh-hero.glb")).then(z=>{z.scene.updateMatrixWorld(!0);let be={};z.scene.traverse(Y=>{Y.isSkinnedMesh&&Y.name==="P_hero"?p.lod.hero=d(Y):Y.isSkinnedMesh&&/^H_/.test(Y.name)?be[Y.name.slice(2)]=y(Y):Y.isMesh&&/^tex_/.test(Y.name)&&(p["h_"+Y.name.slice(9)]=Y.material.map)}),p.hcards=be,p.hskins={af:p.lod.hero.mat.map,ca:p.h_ca,as:p.h_as},p.hnormal=p.lod.hero.mat.normalMap;try{let Y=new bn(40,1,.1,100);Y.position.set(0,1,4),Y.lookAt(0,1,0);let ue=new oi(8,8);I.setRenderTarget(ue),I.render(z.scene,Y),I.setRenderTarget(null),ue.dispose()}catch{}f.heroOk=!!p.lod.hero}).catch(z=>console.warn("3D hero",z)),f})();function R(I){let H=p.lod[I].mat,W=new jt({map:H.map,normalMap:H.normalMap,normalScale:new Je(.6,.6),roughness:.6,metalness:0,envMapIntensity:.45}),z=()=>({value:new Ve}),be=W.userData.u={uTint:z(),uHairC:z(),uIris:z(),uP1:z(),uP2:z(),uTrim:z(),uSlv:z(),uSho:z(),uSoc:z(),uSocT:z(),uBoot:z(),uBoot2:z(),uGlove:z(),uBeard:{value:0},uPat:{value:0},uPatW:{value:.07},uSlvOn:{value:0},uScalp:{value:0},uErase:{value:0},uGK:{value:0},uMgr:{value:new Je},uTrou:z(),uPrint:{value:null},uData:{value:H.aoMap},uKnit:{value:E()},uClothF:{value:new Rt}};return W.onBeforeCompile=Y=>{Object.assign(Y.uniforms,be),Y.vertexShader=zb+Y.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vPart = _part; vPrint = aPrint; vPat = aPat; vZone = aZone; vUvA = uv; vRest = position;`).replace("#include <skinning_vertex>",`vec3 mhPre = transformed;
#include <skinning_vertex>
#ifdef USE_SKINNING
{ float cf = _cloth.z > 0.5 ? (_cloth.x < 1.5 ? (_cloth.y > 0.0 ? uClothF.x : uClothF.y) : (_cloth.y > 0.0 ? uClothF.z : uClothF.w)) : 0.0;
  if (cf > 0.001) { vec4 sv = bindMatrix * vec4(mhPre, 1.0); vec4 s2 = getBoneMatrix(_skin2.x) * sv * _w2.x + getBoneMatrix(_skin2.y) * sv * _w2.y + getBoneMatrix(_skin2.z) * sv * _w2.z;
    transformed = mix(transformed, (bindMatrixInverse * s2).xyz, cf); } }
#endif`),Y.fragmentShader=Vb+Y.fragmentShader.replace("#include <map_fragment>",`float mhRough = 0.6;
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
    /* G11: long sleeves + trousers painted on the skin (rest-pose regions: arm |x| 0.17-0.55 above y 0.27; legs y -0.06 \u2026 -0.88) */
    float ax = abs(vRest.x);
    if (uMgr.x > 0.5 && ax > 0.17 && vRest.y > 0.27 && vRest.y < 0.715 && !(ax > 0.53 && vRest.y < 0.3)) { col = uSlv; mhRough = 0.8; }
    if (uMgr.y > 0.5 && vRest.y < -0.06 && vRest.y > -0.88) { col = uTrou; mhRough = 0.85; }
  } else if (vPart < 1.5) {
    vec2 c1 = vec2(0.705, 0.296), c2 = vec2(0.290, 0.708); float r = min(distance(vUvA, c1), distance(vUvA, c2));
    float ir = 1.0 - smoothstep(0.098, 0.108, r), pu = 1.0 - smoothstep(0.034, 0.042, r);
    vec3 scl = mix(vec3(0.86, 0.84, 0.82), vec3(0.72, 0.6, 0.58), smoothstep(0.2, 0.32, r));
    vec3 irc = uIris * (0.65 + 0.6 * smoothstep(0.1, 0.05, r)) * (0.85 + 0.15 * sin(atan(vUvA.y - 0.5, vUvA.x - 0.5) * 40.0));
    col = mix(scl, irc, ir); col = mix(col, vec3(0.02), pu); col = mix(col, col * 0.55, smoothstep(0.09, 0.105, r) * ir); mhRough = 0.12;
  } else {
    float trim = smoothstep(0.5 - max(fwidth(vZone.r), 1e-3), 0.5 + max(fwidth(vZone.r), 1e-3), vZone.r), zb = smoothstep(0.45, 0.55, vZone.b);
    if (vPart < 2.5) { col = mix(uP1, uP2, mhPattern(vec2(vPat.x, 1.0 - vPat.y)) * (1.0 - zb * uSlvOn)); col = mix(col, uSlv, zb * uSlvOn); col = mix(col, uTrim, trim); mhRough = 0.8; }
    else if (vPart < 3.5) { col = uMgr.y > 0.5 ? uTrou : mix(uSho, uTrim, trim); mhRough = 0.82; }
    else if (vPart < 4.5) { col = uMgr.y > 0.5 ? uTrou : mix(uSoc, uSocT, trim); mhRough = 0.95; }
    else { col = mix(uBoot, uBoot2, max(trim, zb * 0.85)); mhRough = 0.4; }
    if (vPart < 3.5 && vPrint.x >= 0.0 && vPrint.x <= 1.0 && vPrint.y >= 0.0 && vPrint.y <= 1.0) { vec4 pr = texture2D(uPrint, vPrint); col = mix(col, pr.rgb / max(pr.a, 1e-3), pr.a); }
    col *= mix(1.0, vZone.g, 0.75);
  }
  diffuseColor.rgb = col; }`).replace("#include <roughnessmap_fragment>","float roughnessFactor = mhRough;").replace("#include <normal_fragment_maps>",`#ifdef USE_NORMALMAP_TANGENTSPACE
{ vec3 mapN = vec3(0.0, 0.0, 1.0);
  if (vPart < 0.5) { mapN = texture2D(normalMap, vNormalMapUv).xyz * 2.0 - 1.0; mapN.xy *= normalScale; }
  else if (vPart > 1.5 && vPart < 4.5) { mapN = texture2D(uKnit, vUvA * (vPart < 2.5 ? 90.0 : 70.0)).xyz * 2.0 - 1.0; mapN.xy *= 0.35; }
  normal = normalize(tbn * mapN); }
#endif`).replace("#include <aomap_fragment>","")},W.customProgramCacheKey=()=>"w3dmh2",W}function U(){let I=new jt({color:1709072,roughness:.62,metalness:0,alphaTest:.3,side:Rn,envMapIntensity:.3});return t!=="low"&&(I.alphaToCoverage=!0),I}let P=30;function N(){let I=new Gn,H=p.bones.clone(!0);I.add(H);let W={};H.traverse(ue=>{ue.isBone&&(W[ue.name]=ue)});let z={mh:!0,root:I,bones:W,mixer:new ia(I),act:{},w:{},id:null,lastN:-9,mod:new Map,ph:0,look:0,lookP:0,lean:0,lod:{},mats:{},FU:{uExpr:{value:new Rt}},pivots:[],ex:new Rt,cf:new Rt},be=ue=>{let O=p.lod[ue],ot=z.mats[ue]=R(ue),Ie=new Gi(O.geo,ot);return Ie.bind(new Zs(O.names.map(Ge=>W[Ge]),O.inv),O.bind),Ie.castShadow=ue!=="far"&&t!=="low",Ie.receiveShadow=!1,Ie.visible=!1,Ie.frustumCulled=!0,Ie.morphTargetInfluences=new Array(Rc.length).fill(0),Ie.morphTargetDictionary=O.dict,Ie.boundingSphere=new vn(new ci(0,.95,0),1.6),I.add(Ie),z.lod[ue]=Ie,Ie};be("match"),be("far"),z.hair=new qe(p.cards.none.geo,U()),z.hair.matrixAutoUpdate=!1,z.hair.morphTargetInfluences=new Array(Rc.length).fill(0),z.hair.castShadow=t==="high",W.Head.add(z.hair);let Y={idle:"Idle_Loop",walk:"Walk_Loop",jog:"Jog_Fwd_Loop",sprint:"Sprint_Loop",dance:"Dance_Loop",air:"Jump_Loop",crouch:"Crouch_Idle_Loop",talk:"Idle_Talking_Loop"};for(let ue in Y){let O=p.clips[Y[ue]];if(!O)continue;let ot=z.mixer.clipAction(O);ot.play(),ot.setEffectiveWeight(0),z.act[ue]=ot,z.w[ue]=0}z.one={};for(let ue of["Pass","Shoot","Tackle","Celebrate_KneeSlide","Celebrate_Jump","Trophy_Lift"]){let O=p.clips[ue];if(!O)continue;let ot=z.mixer.clipAction(O);ot.setLoop($l,1),ot.clampWhenFinished=!0,ot.play(),ot.setEffectiveWeight(0),z.one[ue]=ot}z.mixer.update(0);for(let ue of Object.values(z.one))ue.stop();return z.w.idle=1,z.shot=null,z.shotW=0,e.add(I),f.chars.push(z),s.chars.push(z),z}function j(I){if(I.lod.hero||!f.heroOk)return I.lod.hero;let H=p.lod.hero,W=I.mats.hero=R("hero"),z=new Gi(H.geo,W);return W.map=I.mats.match.map===p.skins.af?p.hskins.af:I.mats.match.map===p.skins.ca?p.hskins.ca:p.hskins.as,W.normalMap=p.hnormal,z.bind(new Zs(H.names.map(be=>I.bones[be]),H.inv),H.bind),z.castShadow=!0,z.visible=!1,z.morphTargetInfluences=I.lod.match.morphTargetInfluences.slice(),z.morphTargetDictionary=H.dict,z.boundingSphere=new vn(new ci(0,.95,0),1.6),I.root.add(z),I.lod.hero=z,I.hairH=new qe(p.hcards.none.geo,U()),I.hairH.matrixAutoUpdate=!1,I.hairH.morphTargetInfluences=I.hair.morphTargetInfluences,I.hairH.visible=!1,I.bones.Head.add(I.hairH),I.dk=null,z}f.getChar=function(I){let H=f.byId.get(I);if(H)return H;H=f.chars.filter(W=>W.lastN<i.n-1&&!W.port).sort((W,z)=>W.lastN-z.lastN)[0],!H&&f.chars.length<P&&(H=N()),H||(H=f.chars.filter(W=>!W.port).sort((W,z)=>W.lastN-z.lastN)[0]),H.id!=null&&f.byId.delete(H.id),H.id=I,f.byId.set(I,H),H.dk=null,H.lastN=-9,H.shot=null,H.shotW=0,H.celGap=0,H.celOut=!1;for(let W of Object.values(H.one))W.stop();return H};function C(I){let H=I>>>0||1;return()=>(H^=H<<13,H>>>=0,H^=H>>>17,H^=H<<5,H>>>=0,H/4294967296)}function L(I,H){let W=C(n.hash("mh4:"+I)),z=()=>W()*2-1,be=H.grp,Y=0,ue=0,O="ca";be==="af"||be==="af2"?(O="af",Y=W()*.15,ue=be==="af2"?W()*.35:W()*.15):be==="ea"?(O="as",Y=.75+W()*.25,ue=W()*.15):be==="eu"?(O="ca",ue=.8+W()*.2,Y=W()*.08):be==="mix"?(O=H.si<6?"af":"ca",ue=.3+W()*.5,Y=W()*.2):(O=H.si<6?"af":"ca",ue=.55+W()*.35,Y=W()*.25);let ot={as:Y,ca:ue,lean:H.arch==="lean"?.6+W()*.4:0,stocky:H.arch==="stocky"?.4+W()*.6:0};for(let Ge of Rc.slice(4))ot[Ge]=z()*(Ge==="f_brow"?.25:.7);let Ie=(O==="af"?Gb:Hb)[H.st]||(O==="af"?["crop",1]:["short",1]);return{w:ot,base:O,hair:Ie[0],scalp:Ie[1]}}f.lookOf=(I,H)=>L(String(I),H);let Z=t==="high"?512:t==="mid"?384:256,ne={back:{s0:-.2,s1:.2,z0:1.08,z1:1.62,u0:0,u1:1,v0:.4,v1:1},front:{s0:-.2,s1:.2,z0:1.15,z1:1.55,u0:0,u1:.5,v0:0,v1:.4},shorts:{s0:.03,s1:.23,z0:.74,z1:.94,u0:.5,u1:1,v0:0,v1:.4}},me=(I,H,W,z)=>{let be=(H.u1-H.u0)/(H.s1-H.s0)/1e3*W,Y=(H.u0-H.s0/(H.s1-H.s0)*(H.u1-H.u0))*W,ue=(H.v1-H.v0)/(H.z1-H.z0);I.setTransform(be,0,0,ue/1e3*z,Y,(1-H.v0+H.z0*ue)*z)},G=(I,H,W,z,be,Y)=>{I.font=`800 ${be*1.25}px "Arial Narrow", Arial, Helvetica, sans-serif`,I.textAlign="center",I.textBaseline="middle",I.lineJoin="round",I.lineWidth=Math.max(5,be*(be<100?.16:.08)),I.strokeStyle="#0b0f24",I.strokeText(H,W,-z),I.fillStyle="#ffffff",I.fillText(H,W,-z)};function J(I,H,W,z){let be=I.width,Y=I.height,ue=I.getContext("2d");if(ue.setTransform(1,0,0,1,0,0),ue.clearRect(0,0,be,Y),me(ue,ne.back,be,Y),H){ue.font='800 78px "Arial Narrow", Arial, sans-serif';let O=ue.measureText(H).width;ue.save(),ue.scale(Math.min(1,330/Math.max(1,O))*(O<200?1.1:1),1),G(ue,H,0,1530,62),ue.restore()}if(W!==""&&(ue.save(),ue.scale(.82,1),G(ue,W,0,1300,250),ue.restore()),me(ue,ne.front,be,Y),z)try{ue.save(),ue.scale(1,-1),ue.drawImage(z,49,1380,72,80),ue.restore()}catch{}me(ue,ne.shorts,be,Y),W!==""&&G(ue,W,125,815,70),ue.setTransform(1,0,0,1,0,0)}let ae=3;f.frameStart=()=>{ae=3},f.dress=function(I,H,W,z,be,Y,ue){let O=H.K,ot=H.key+(W?"g":"o")+z+":"+be+":"+ue+":"+(H.crestImg?1:0)+":"+(I.lod.hero?1:0);if(I.dk===ot&&!I.printWait)return;let Ie=I.dk!==ot;if(I.dk=ot,Ie){let Ge=I.mh4&&I.mhId===z?I.mh4:(I.mhId=z,I.mh4=L(z,Y)),ze=st=>new Ve(st),Mt=new Ve(u[Math.min(u.length-1,Y.si)]),et=kb[Ge.base],D=new Ve().setRGB(cs(Mt.r*255/et[0]*1.05,.4,2.2),cs(Mt.g*255/et[1]*1.05,.4,2.2),cs(Mt.b*255/et[2]*1.05,.4,2.2)),w=st=>Math.pow(st,2.2),ee=u[Math.min(u.length-1,Y.si)],Ce=[1,3,5].map(st=>parseInt(ee.slice(st,st+2),16)/255),Me=[0,1,2].map(st=>.45*et[st]/255+.55*Ce[st]),we=Ge.base==="af"?1.12:1;D.setRGB(cs(w(Me[0])/w(et[0]/255)*we,.45,1.8),cs(w(Me[1])/w(et[1]/255)*we,.45,1.8),cs(w(Me[2])/w(et[2]/255)*we,.45,1.8));let je=.07,Fe=2*Math.PI*.16,We=O.pat==="stripes"||O.pat==="pinstripes";for(let st of Object.keys(I.mats)){let mt=I.mats[st],re=mt.userData.u;mt.map=st==="hero"?p.hskins[Ge.base]:p.skins[Ge.base],re.uTint.value.copy(D),re.uHairC.value.set(Y.st==="bleach"?Y.tip:Y.hair),re.uBeard.value=Y.beard||0,re.uIris.value.set(Y.iris),re.uScalp.value=Ge.scalp,re.uErase.value=Ge.base==="af"&&!Ge.hair?1:0,re.uGK.value=W?1:0,re.uGlove.value.set("#f1f5f9");{let Ne=/^off4/.test(z),Le=Y.mgr?[Y.sleeves?1:0,Y.trou?1:0]:Ne?[1,1]:I.fanWear||[0,0];re.uMgr.value.set(Le[0],Le[1]),re.uTrou.value.set(Y.mgr||Ne?O.sho:I.fanTrou||"#1e293b")}W?(re.uP1.value.set(H.g),re.uP2.value.set(H.g),re.uTrim.value.set("#111827"),re.uSlv.value.set(H.g),re.uSlvOn.value=0,re.uPat.value=0,re.uSho.value.set("#111827"),re.uSoc.value.set(H.g),re.uSocT.value.set("#111827")):(re.uP1.value.set(O.c1),re.uP2.value.set(O.c2),re.uTrim.value.set(O.col),re.uSlv.value.set(O.slv),re.uSlvOn.value=O.slv&&O.slv.toLowerCase()!==String(O.c1).toLowerCase()?1:0,re.uPat.value=Qb[O.pat]||0,re.uPatW.value=We?Fe/Math.max(2,Math.round(Fe/je)):je,re.uSho.value.set(O.sho),re.uSoc.value.set(O.soc),re.uSocT.value.set(O.c2===O.soc?O.c1:O.c2)),re.uBoot.value.set(Y.boot),re.uBoot2.value.set(Y.boot2===Y.boot?"#f8fafc":Y.boot2)}let it=I.lod.match.morphTargetInfluences;Rc.forEach((st,mt)=>{it[mt]=Ge.w[st]||0});for(let st of["far","hero"])if(I.lod[st]){let mt=I.lod[st].morphTargetInfluences;for(let re=0;re<mt.length;re++)mt[re]=st==="far"&&re>=4?0:it[re]}let gt=I.hair.morphTargetInfluences;for(let st=0;st<gt.length;st++)gt[st]=it[st];let Ee=p.cards[Ge.hair||"none"]||p.cards.none;if(I.hair.geometry=Ee.geo,I.hair.matrix.copy(Ee.m),I.hair.material.map=Ee.map,I.hair.material.color.set(Y.st==="bleach"?Y.tip:Y.hair),I.hair.material.needsUpdate=!0,I.hairH){let st=p.hcards[Ge.hair||"none"]||p.hcards.none;I.hairH.geometry=st.geo,I.hairH.matrix.copy(st.m),I.hairH.material.map=st.map,I.hairH.material.color.set(Y.st==="bleach"?Y.tip:Y.hair),I.hairH.material.needsUpdate=!0}I.hgt=Math.min(1.92,Y.h+(W?.04:0))/Ob,I.style=Y,I.hstyle=Ge.hair||Y.st,I.printWait=!0}if(I.printWait&&ae>0){ae--,I.printWait=!1,I.pcv||(I.pcv=l(Z,Z,()=>{}),I.ptex=new er(I.pcv),I.ptex.colorSpace=Qt,I.ptex.flipY=!1,I.ptex.premultiplyAlpha=!0,I.ptex.anisotropy=t==="low"?1:4),J(I.pcv,ue,be==null||be===""?"":String(Math.max(0,Math.min(99,Math.floor(+be)||0))),W?null:H.crestImg),I.ptex.needsUpdate=!0;for(let Ge of Object.values(I.mats))Ge.userData.u.uPrint.value=I.ptex}},f.pre=function(I,H,W,z,be){if(I.noCloth=!!H.noCloth,H.mhClip){(!I.shot||I.shotName!==H.mhClip.name)&&f.play(I,H.mhClip.name),I.shot.timeScale=0,I.shot.time=H.mhClip.t,I.shotAge=1,I.shot.setEffectiveWeight(1),I.shotW=1;for(let Ie in I.act)I.act[Ie].setEffectiveWeight(0);return}z&&f.play(I,(H.kick||0)>.8?"Shoot":"Pass"),be&&f.play(I,"Tackle");let Y=H._cel,ue=Y&&(H._csp||0)<2.2?Dd[Y]:null;ue&&!z&&!be&&(I.shot?I.shotName!==ue&&he.has(I.shotName)&&(I.celOut=!0):(I.celGap=(I.celGap||0)-W,I.celGap<=0&&(f.play(I,ue),I.celGap=.2+(n.hash(String(I.id))>>>3)%9*.07))),I.shot&&he.has(I.shotName)&&!ue&&(I.celOut=!0);let O=0,ot=I.shot;if(ot){let Ie=Rd[I.shotName]||{},Ge=Ie.dur||ot.getClip().duration;I.shotT=ot.time,I.shotAge+=W;let ze=Ie.fade?Math.min(1,I.shotAge/Ie.fade):Math.min(1,I.shotAge/.06+.35),Mt=Ie.hold&&!I.celOut?1:cs((Ge-ot.time)/(Ie.out||.16),0,1);I.celOut&&(I.celOutW=Math.max(0,(I.celOutW==null?1:I.celOutW)-W/.3),Mt=Math.min(Mt,I.celOutW)),O=Math.min(ze,Mt),!Ie.hold&&ot.time>=Ge-.001||O<=.001?(ot.stop(),I.shot=null,O=0,I.celOut=!1,I.celOutW=null):ot.setEffectiveWeight(O)}if(I.shotW=O,O>0)for(let Ie in I.act)I.act[Ie].setEffectiveWeight(I.act[Ie].getEffectiveWeight()*(1-O))};let he=new Set(Object.values(Dd));f.play=function(I,H){let W=I.one[H];if(!W)return;I.shot&&I.shot!==W&&I.shot.stop(),I.celOut=!1,I.celOutW=null;let z=Rd[H]||{};W.reset(),W.timeScale=1,W.time=z.contact!=null?Math.max(0,z.contact-.02):0,W.setEffectiveWeight(1),W.play(),I.shot=W,I.shotName=H,I.shotAge=0};let fe=new ci,Ae=new ci,_e=new ci,ve=new Vh;f.post=function(I){if(I.cur==="far"||(I.dist||0)>26){if(I.cf.lengthSq()){I.cf.set(0,0,0,0);for(let z of Object.values(I.mats))z.userData.u.uClothF.value.set(0,0,0,0)}return}ve.copy(I.root.quaternion);let H=_e.set(0,-1,0).applyQuaternion(ve),W=(z,be)=>(I.bones[be].updateWorldMatrix(!0,!1),Ae.setFromMatrixPosition(I.bones[be].matrixWorld),fe.setFromMatrixPosition(I.bones[z].matrixWorld),Math.acos(cs(Ae.sub(fe).normalize().dot(H),-1,1)));I.cf.set(Bc(1.4,2.3,W("upperarm_l","lowerarm_l")),Bc(1.4,2.3,W("upperarm_r","lowerarm_r")),Bc(.45,1,W("thigh_l","calf_l")),Bc(.45,1,W("thigh_r","calf_r"))),I.noCloth&&I.cf.set(0,0,0,0);for(let z of Object.values(I.mats))z.userData.u.uClothF.value.copy(I.cf)};let Qe=-1,oe=new Set;f.lod=function(I,H){Qe!==i.n&&(Qe=i.n,oe.clear(),f.chars.filter(Y=>a.has(Y.root)&&(Y.dist||0)<6.5).sort((Y,ue)=>Y.dist-ue.dist).slice(0,2).forEach(Y=>oe.add(Y)));let W=I.dist||0,z=H>=2,be=t==="low"||W>(z?16:t==="high"?40:24)?"far":"match";t==="high"&&!z&&W<6.5&&f.heroOk&&(oe.has(I)||I.port)&&(j(I),I.lod.hero&&(be="hero"));for(let Y in I.lod)I.lod[Y].visible=Y===be;I.hair.visible=be==="match"||be==="far"&&W<9,I.hairH&&(I.hairH.visible=be==="hero"),be==="hero"&&(I.hair.visible=!1),I.cur=be};let ge=null;return f.blobs=function(){if(t!=="low")return;ge||(ge=new Ai(new vi(1,1).rotateX(-Math.PI/2),new An({map:h(),transparent:!0,depthWrite:!1,opacity:.5,polygonOffset:!0,polygonOffsetFactor:-3}),P),ge.frustumCulled=!1,e.add(ge));let I=new ft,H=new Vh,W=new ci,z=new ci,be=0;for(let Y of f.chars){if(!a.has(Y.root)||be>=P)continue;let ue=.75*(Y.root.scale.x/o),O=Y.root.position.y;I.compose(z.set(Y.root.position.x,.015,Y.root.position.z),H,W.set(ue*(1+O*.3),1,ue*(1+O*.3))),ge.setMatrixAt(be++,I)}ge.count=be,ge.instanceMatrix.needsUpdate=!0,be&&a.add(ge)},f.stats=()=>{let I=0,H=0;for(let W of f.chars)if(a.has(W.root)){for(let z in W.lod)W.lod[z].visible&&(I++,H+=W.lod[z].geometry.index.count/3);for(let z of[W.hair,W.hairH])z&&z.visible&&(I++,H+=z.geometry.index.count/3)}return{players:f.chars.filter(W=>a.has(W.root)).length,draws:I,tris:H,tier:t,hero:f.heroOk,lods:f.chars.filter(W=>a.has(W.root)).map(W=>W.cur)}},f}var $e=Q,zi=Hn,Mn=(s,e,t)=>s<e?e:s>t?t:s,At=(s,e,t)=>{let n=Mn((t-s)/(e-s),0,1);return n*n*(3-2*n)};var Dc=1.1,Wh=.15,Ld={idle:"Idle_Loop",walk:"Walk_Loop",jog:"Jog_Fwd_Loop",sprint:"Sprint_Loop",dance:"Dance_Loop",air:"Jump_Loop",crouch:"Crouch_Idle_Loop",talk:"Idle_Talking_Loop"},to=["#2f1b11","#3f2618","#4d2e1d","#5c3822","#70442a","#83512f","#966039","#a8724a","#b9835a","#c4916a","#cf9f7a","#d9ab86","#e0b590"],Wb={dark:"#2a1a10",brown:"#5a3518",hazel:"#7a5a2a",green:"#4e7a45",blue:"#4f7fb3",grey:"#7d8b96"},Kb=["#0a0a0c","#0a0a0c","#121010","#17110d","#24170f","#3a2414","#5a3a20","#7a5230","#a07a44","#c9a55a","#6b2f1a"];function qb(s){let e=s.tier||(s.weak?"low":"mid"),t=e==="low",n={high:{pr:1.75,sh:2048,crowd:5e3,near:36},mid:{pr:1.5,sh:1024,crowd:3e3,near:26},low:{pr:.9,sh:512,crowd:900,near:16}}[e]||{pr:1.5,sh:1024,crowd:3e3,near:26},i={},r=s.G3,a=null,o=null,c,l,h,u,f=null,A=!1,m=0,b=0,p=0,d={n:1,dt:.016,now:0},y=new Set,E=new oa;E.setMeshoptDecoder(wc);let R=x=>s.base+x+"?v="+s.v;function U(){if(a)return!A;o=document.createElement("canvas"),o.style.cssText="display:block;width:100%;height:100%;border-radius:0;box-shadow:none";try{a=new jr({canvas:o,antialias:!t,alpha:!0,powerPreference:"high-performance"})}catch{return a=null,!1}a.outputColorSpace=Qt,a.toneMapping=xc,a.toneMappingExposure=1.08,a.shadowMap.enabled=!0,a.shadowMap.type=Ec,c=new Es,c.fog=new cc(724260,.0026),l=new bn(40,1,.1,1e3);try{let S=new Ys(a);c.environment=S.fromScene(new eo,.04).texture,S.dispose()}catch{}h=new Xa(13097215,2112034,.7),c.add(h),u=new Fi(16774114,2.6),u.castShadow=!0;let x=n.sh;u.shadow.mapSize.set(x,x),e==="low"&&(u.castShadow=!1),u.shadow.bias=-5e-4,u.shadow.normalBias=.03,u.shadow.camera.near=1,u.shadow.camera.far=220,c.add(u),c.add(u.target);let M=new Fi(10467327,.6);return M.position.set(-40,30,-30),c.add(M),o.addEventListener("webglcontextlost",S=>{S.preventDefault(),A=!0}),o.addEventListener("webglcontextrestored",()=>{A=!1}),!0}i.ok=()=>!!(P&&a&&!A&&m<3);let P=null,N={},j=null,C=null,L="";i.mh=()=>C&&C.ok?C:null,i.mhInfo=()=>({ok:!!(C&&C.ok),err:L,hero:!!(C&&C.heroOk)});let Z=Promise.all([E.loadAsync(R("w3d-player.glb")),E.loadAsync(R("w3d-anims.glb"))]).then(async([x,M])=>{for(let _ of M.animations)N[_.name]=_;j=x.scene,j.updateMatrixWorld(!0),j.traverse(_=>{if(!_.isSkinnedMesh)return;let T=_.geometry,B=T.attributes.position,F=T.attributes.normal,g=B.count,q=new Float32Array(g*3),K=new Float32Array(g*3),$=new $e,Se=new $e;for(let de=0;de<g;de++)$.fromBufferAttribute(B,de),Se.fromBufferAttribute(F,de).multiplyScalar(.01).add($),_.applyBoneTransform(de,$),_.applyBoneTransform(de,Se),Se.sub($).normalize(),q[de*3]=$.x,q[de*3+1]=$.y,q[de*3+2]=$.z,K[de*3]=Se.x,K[de*3+1]=Se.y,K[de*3+2]=Se.z;{let de=T.attributes._shift;if(de)for(let V=0;V<g;V++)q[V*3]-=de.getX(V),q[V*3+1]-=de.getY(V),q[V*3+2]-=de.getZ(V)}T.setAttribute("aB",new Ft(q,3)),T.setAttribute("aBN",new Ft(K,3));{let de=new $e().fromBufferAttribute(B,0),V=new $e().fromBufferAttribute(B,g-1);T.userData.k=de.distanceTo(V)/Math.max(1e-6,Math.hypot(q[0]-q[g*3-3],q[1]-q[g*3-2],q[2]-q[g*3-1]))}T.boundingSphere=new vn(new $e(0,.9,0),1.6),_.frustumCulled=!0});let S=null;if(j.traverse(_=>{_.isSkinnedMesh&&_.name!=="Body_LO"&&/Superhero/i.test(_.material.name||"")&&(S=_)}),S){let _=S.geometry,T=_.attributes.position,B=_.attributes.normal,F=_.attributes.aB,g=_.attributes.aBN,q=_.index,K=new $e().fromBufferAttribute(T,0),$=new $e().fromBufferAttribute(T,1),Se=new $e().fromBufferAttribute(F,0),de=new $e().fromBufferAttribute(F,1),V=K.distanceTo($)/Math.max(1e-6,Se.distanceTo(de)),le=ye=>{let pe=F.getY(ye),at=g.getZ(ye),Bt=Math.abs(F.getX(ye));if(pe<1.585)return!1;let Gt=1.745+(1.6-1.745)*At(.25,-.6,at);return Bt>.07&&at>-.2&&(Gt=Math.max(Gt,1.735-(Bt-.07)*.6)),pe>Gt-.004},xe=ye=>{let pe=F.getY(ye),at=F.getZ(ye),Bt=Math.abs(F.getX(ye));return pe<1.555||pe>1.668||at<-.035||Bt>.088||Bt<.031&&Math.abs(pe-1.637)<.0095&&at>.07?!1:pe>1.648&&Bt<.045&&at>.09?pe<1.656&&Bt<.03:g.getY(ye)>-.92||pe>1.575},It=ye=>{let pe=F.getY(ye);return pe>1.728&&pe<1.758&&g.getY(ye)<.75},He=ye=>{let pe=[];for(let at=0;at<q.count;at+=3){let Bt=q.getX(at),Gt=q.getX(at+1),Sn=q.getX(at+2);ye(Bt)&&ye(Gt)&&ye(Sn)&&pe.push(Bt,Gt,Sn)}return pe},lt={hair:He(le),beard:He(ye=>xe(ye)&&g.getY(ye)>-.5),band:He(It)},Te=(ye,pe,at,Bt)=>{let Gt=lt[Bt||"hair"],Sn=new Map,In=[],ln=[],gi=[],ce=[],Be=[],Ye=[],kt=[],Xt=new $e,Yt=new $e,En=at?Gt.filter((Jt,en)=>{let xn=en-en%3;return[0,1,2].every(yt=>at(F.getX(Gt[xn+yt]),F.getY(Gt[xn+yt]),F.getZ(Gt[xn+yt])))}):Gt;for(let Jt of En){if(!Sn.has(Jt)){Sn.set(Jt,Sn.size),Xt.fromBufferAttribute(T,Jt),Yt.fromBufferAttribute(B,Jt).normalize();let en=pe(F.getX(Jt),F.getY(Jt),F.getZ(Jt),g.getZ(Jt)),xn=en*V;In.push(Xt.x+Yt.x*xn,Xt.y+Yt.y*xn,Xt.z+Yt.z*xn),ln.push(Yt.x,Yt.y,Yt.z),kt.push(en),Ye.push(F.getX(Jt)+g.getX(Jt)*en,F.getY(Jt)+g.getY(Jt)*en,F.getZ(Jt)+g.getZ(Jt)*en);for(let yt=0;yt<4;yt++)gi.push(_.attributes.skinIndex.getComponent(Jt,yt)),ce.push(_.attributes.skinWeight.getComponent(Jt,yt))}Be.push(Sn.get(Jt))}let _n=new nn;_n.setAttribute("position",new Ut(In,3)),_n.setAttribute("normal",new Ut(ln,3)),_n.setAttribute("skinIndex",new Yr(gi,4)),_n.setAttribute("skinWeight",new Ut(ce,4)),_n.setAttribute("aB",new Ut(Ye,3));{let Jt=kt.slice().sort((xn,yt)=>xn-yt),en=Math.max(1e-5,Jt[Math.floor(Jt.length*.7)]||1e-5);_n.setAttribute("aE",new Ut(kt.map(xn=>Math.min(1,xn/en)),1))}_n.setIndex(Be),_n.boundingSphere=new vn(new $e(0,.9,0),1.6),_n.userData.k=V;let si=new Gi(_n,new jt({color:1118481,roughness:.95}));si.name=ye,si.castShadow=!0,si.visible=!1,S.parent.add(si),si.bind(S.skeleton,S.bindMatrix)},pt=(ye,pe)=>{let at=Math.abs(ye),Bt=1.745+(1.6-1.745)*At(.25,-.6,pe);return at>.07&&pe>-.2&&(Bt=Math.max(Bt,1.735-(at-.07)*.6)),Bt},Tt=(ye,pe)=>(at,Bt,Gt,Sn)=>ye(at,Bt,Gt,Sn)*(.35+.65*At(0,pe||.03,Bt-pt(at,Sn)));Te("h_crew",()=>.007),Te("h_short",Tt(()=>.011,.02)),Te("h_afro",Tt((ye,pe,at)=>.03+.03*At(1.62,1.75,pe),.05)),Te("h_top",(ye,pe,at)=>.006+.034*At(1.73,1.8,pe)*(1-At(.06,.1,Math.abs(ye)))),Te("h_corn",()=>.0055),Te("h_hawk",(ye,pe)=>.004+.045*(1-At(.008,.026,Math.abs(ye)))*At(1.69,1.76,pe),ye=>Math.abs(ye)<.032),Te("h_under",(ye,pe)=>.006+.014*At(1.71,1.78,pe)*(1-At(.03,.055,Math.abs(ye))),(ye,pe)=>Math.abs(ye)<.062||pe>1.79),Te("h_curl",Tt((ye,pe)=>.016+.012*At(1.7,1.79,pe))),Te("h_quiff",Tt((ye,pe,at)=>.012+.032*At(0,.07,at)*At(1.735,1.78,pe),.02)),Te("h_part",Tt((ye,pe)=>.014+.006*At(1.75,1.8,pe),.02)),Te("h_slick",(ye,pe,at)=>.009+.006*At(.04,-.05,at)),Te("h_twist",Tt((ye,pe)=>.024+.012*At(1.72,1.79,pe),.04)),Te("h_dread",Tt((ye,pe)=>.026+.01*At(1.72,1.79,pe),.04));let Xe=(ye,pe)=>At(1.566,1.595,pe)*(1-At(.072,.088,Math.abs(ye)))*(1-At(1.648,1.665,pe)*At(.04,.06,Math.abs(ye)));Te("b_full",(ye,pe,at)=>(.004+.008*At(1.63,1.59,pe)*(1-.6*At(.04,.08,Math.abs(ye))))*Xe(ye,pe),null,"beard"),Te("b_short",(ye,pe)=>(.003+.003*At(1.62,1.585,pe))*Xe(ye,pe),null,"beard"),Te("b_goat",(ye,pe,at)=>(.004+.009*At(1.625,1.59,pe))*At(1.562,1.58,pe)*(1-At(.022,.032,Math.abs(ye))),(ye,pe,at)=>Math.abs(ye)<.034&&(pe<1.63||pe>1.64),"beard"),Te("g_band0",()=>.004,null,"band"),Te("g_band",()=>.017,null,"band"),Te("g_bandX",()=>.064,null,"band");let xt=(ye,pe,at)=>{let Bt=He(pe),Gt=new Map,Sn=[];for(let yt of Bt)Gt.has(yt)||(Gt.set(yt,Sn.length),Sn.push(yt));let In=Sn.length,ln=new Float32Array(In*3),gi=Array.from({length:In},()=>new Set),ce=new Map;for(let yt=0;yt<Bt.length;yt+=3){let _t=Gt.get(Bt[yt]),dt=Gt.get(Bt[yt+1]),yn=Gt.get(Bt[yt+2]);gi[_t].add(dt).add(yn),gi[dt].add(_t).add(yn),gi[yn].add(_t).add(dt);for(let[li,Tn]of[[_t,dt],[dt,yn],[yn,_t]]){let hi=li<Tn?li+":"+Tn:Tn+":"+li;ce.set(hi,(ce.get(hi)||0)+1)}}let Be=new Uint8Array(In);for(let[yt,_t]of ce)if(_t===1){let[dt,yn]=yt.split(":").map(Number);Be[dt]=Be[yn]=1}Sn.forEach((yt,_t)=>{let dt=F.getX(yt),yn=F.getY(yt),li=F.getZ(yt),Tn=at(dt,yn,li);ln[_t*3]=dt+g.getX(yt)*Tn,ln[_t*3+1]=yn+g.getY(yt)*Tn,ln[_t*3+2]=li+g.getZ(yt)*Tn});let Ye=new Float32Array(In*3);for(let yt=0;yt<(ye==="k_shirt"?24:12);yt++){for(let _t=0;_t<In;_t++){let dt=0,yn=0,li=0,Tn=0;for(let Ti of gi[_t])dt+=ln[Ti*3],yn+=ln[Ti*3+1],li+=ln[Ti*3+2],Tn++;let hi=Be[_t]?0:.55;Ye[_t*3]=ln[_t*3]+(Tn?(dt/Tn-ln[_t*3])*hi:0),Ye[_t*3+1]=ln[_t*3+1]+(Tn?(yn/Tn-ln[_t*3+1])*hi*.6:0),Ye[_t*3+2]=ln[_t*3+2]+(Tn?(li/Tn-ln[_t*3+2])*hi:0)}for(let _t=0;_t<In;_t++){let dt=Sn[_t],yn=Ye[_t*3]-F.getX(dt),li=Ye[_t*3+1]-F.getY(dt),Tn=Ye[_t*3+2]-F.getZ(dt),hi=yn*g.getX(dt)+li*g.getY(dt)+Tn*g.getZ(dt),Ti=at(F.getX(dt),F.getY(dt),F.getZ(dt))*.55;hi<Ti&&(Ye[_t*3]+=g.getX(dt)*(Ti-hi),Ye[_t*3+1]+=g.getY(dt)*(Ti-hi),Ye[_t*3+2]+=g.getZ(dt)*(Ti-hi))}ln.set(Ye)}let kt=new Float32Array(In*3),Xt=new Float32Array(In*3),Yt=new Float32Array(In*3),En=new Float32Array(In*3),_n=new Uint16Array(In*4),si=new Float32Array(In*4),Jt=new $e;Sn.forEach((yt,_t)=>{Jt.fromBufferAttribute(T,yt);for(let dt=0;dt<3;dt++){let yn=ln[_t*3+dt]-F.getComponent(yt,dt);Xt[_t*3+dt]=yn*V,kt[_t*3+dt]=Jt.getComponent(dt)+yn*V,Yt[_t*3+dt]=F.getComponent(yt,dt),En[_t*3+dt]=g.getComponent(yt,dt)}for(let dt=0;dt<4;dt++)_n[_t*4+dt]=_.attributes.skinIndex.getComponent(yt,dt),si[_t*4+dt]=_.attributes.skinWeight.getComponent(yt,dt)});let en=new nn;en.setAttribute("position",new Ft(kt,3)),en.setAttribute("aOff",new Ft(Xt,3)),en.setAttribute("aB",new Ft(Yt,3)),en.setAttribute("aBN",new Ft(En,3)),en.setAttribute("skinIndex",new Ft(_n,4)),en.setAttribute("skinWeight",new Ft(si,4)),en.setIndex(Bt.map(yt=>Gt.get(yt))),en.computeVertexNormals(),en.boundingSphere=new vn(new $e(0,.9,0),1.6),en.userData.k=V;let xn=new Gi(en,S.material);xn.name=ye,xn.castShadow=!0,xn.receiveShadow=!1,S.parent.add(xn),xn.bind(S.skeleton,S.bindMatrix)},wt=ye=>Math.abs(F.getX(ye))>.232&&F.getY(ye)>1.2,Zt=ye=>1.5+At(.075,.16,ye)*.1;xt("k_shirt",ye=>{let pe=F.getY(ye),at=Math.abs(F.getX(ye));return wt(ye)?at<.405:pe>.79&&pe<Zt(at)-.004&&!(at>.2&&pe<1.2&&g.getY(ye)<-.6)},(ye,pe,at)=>{let Bt=Math.abs(ye);return Bt>.232&&pe>1.2?.008+.015*At(.27,.4,Bt):(.012+.013*At(1,.82,pe)+.002*At(1.2,1.4,pe)*At(0,.08,at))*(1-.82*At(1.4,1.5,pe)*(1-At(.16,.22,Bt)))}),xt("k_shorts",ye=>{let pe=F.getY(ye);return!wt(ye)&&pe>.6&&pe<.9},(ye,pe)=>.016+.022*At(.74,.62,pe)+.004*At(.8,.88,pe)),xt("k_trou",ye=>{let pe=F.getY(ye);return!wt(ye)&&pe>.1&&pe<.95},(ye,pe)=>.013+.01*At(.45,.15,pe)+.013*At(.8,.92,pe))}{let _=j.getObjectByName("Head"),T=new an;_.add(T),_.matrixWorld.clone().invert().decompose(T.position,T.quaternion,T.scale);let B=()=>new jt({color:1118481,roughness:.9}),F=(K,$,Se)=>{if($.name=K,$.castShadow=!0,$.visible=!1,Se){let de=new an;de.name=K+"_pv",de.position.set(0,Se,-.06),$.position.y-=Se,$.position.z+=.06,de.add($),T.add(de)}else T.add($);return $},g=F("h_bun",new qe(new ys(.036,14,10),B()));g.position.set(0,1.79,-.085),g.scale.set(1,.9,1);{let K=new Gn,$=B(),Se=new qe(new ys(.03,12,8),$);Se.position.set(0,1.735,-.112),K.add(Se);let de=new qe(new pi(.022,.008,.16,8),$);de.position.set(0,1.655,-.13),de.rotation.x=-.25,K.add(de),F("h_pony",K,1.74)}let q=K=>{let $=[];for(let Se=0;Se<17;Se++){let de=-2.25+Se*4.5/16,V=.092,le=new pi(.011,.008,K*(.85+.3*(Se*7%5)/4),6);le.translate(0,-K/2,0),le.rotateX(.18+.08*Math.cos(de)),le.rotateY(de),le.translate(Math.sin(de)*-V*1,1.745,Math.cos(de)*-V-.005),$.push(le)}return Za($)};F("h_locksS",new qe(q(.11),B()),1.74),F("h_locksL",new qe(q(.21),B()),1.74);{let K=new pi(.1,.118,.2,20,1,!0,Math.PI*.62,Math.PI*.76);K.translate(0,1.66,-.012);let $=new qe(K,B());$.material.side=Rn,F("h_long",$,1.76)}}{let _=new zi,T=new zi,B=new $e(0,0,1);for(let F of["l","r"])for(let g of["index","middle","ring","pinky","thumb"])for(let q=1;q<=3;q++){let K=j.getObjectByName(g+"_0"+q+"_"+F);if(!K)continue;let $=(g==="thumb"?[.15,.25,.2]:[.45,.6,.4])[q-1]*(F==="l"?-1:1)*(g==="pinky"?1.15:1);j.updateMatrixWorld(!0),_.setFromAxisAngle(B,$),K.parent.getWorldQuaternion(T),K.quaternion.premultiply(T.clone().invert().multiply(_).multiply(T))}j.updateMatrixWorld(!0)}if(!U())throw new Error("no WebGL");if(P=x,s.mh!==!1)try{C=Pd({scene:c,tier:e,ctx:s,F:d,url:R,used:y,SC:Dc,getR:()=>a,cvs:ne,blobTex:on,SKINS:to,chars:W}),await C.ready}catch(_){console.warn("3D mh",_),C=null,L=String(_&&_.message||_).slice(0,120)}return i.ready=!0,i}),ne=(x,M,S)=>{let _=document.createElement("canvas");return _.width=x,_.height=M,S(_.getContext("2d"),x,M),_},me=(x,M,S)=>{let _=new er(x);return M!==!1&&(_.colorSpace=Qt),S&&(_.wrapS=_.wrapT=Ei),_.anisotropy=t?1:4,_},G=null,J=()=>G||(G=me(ne(640,96,x=>{x.fillStyle="#000",x.fillRect(0,0,640,96),x.font="900 80px Arial, Helvetica, sans-serif",x.textAlign="center",x.textBaseline="middle",x.lineJoin="round",x.globalCompositeOperation="lighter";for(let M=0;M<10;M++)x.strokeStyle="#0000ff",x.lineWidth=10,x.strokeText(String(M),M*64+35,56),x.fillStyle="#0000ff",x.fillText(String(M),M*64+35,56);x.globalCompositeOperation="source-over";for(let M=0;M<10;M++)x.strokeStyle="#00ff00",x.lineWidth=9,x.strokeText(String(M),M*64+32,52),x.fillStyle="#ffffff",x.fillText(String(M),M*64+32,52)}),!1)),ae=(x,M,S)=>ne(512,256,_=>{for(let T=0;T<2;T++){_.save(),_.translate(T*256,0),_.scale(4,4),_.beginPath(),_.rect(0,0,64,64),_.clip();let B=x.c2;_.fillStyle=M||x.c1,_.fillRect(0,0,64,64),_.fillStyle=B,M||({stripes:()=>{for(let g=4;g<64;g+=16)_.fillRect(g,0,7,64)},hoops:()=>{for(let g=10;g<64;g+=16)_.fillRect(0,g,64,7)},halves:()=>_.fillRect(32,0,32,64),sash:()=>{_.beginPath(),_.moveTo(0,10),_.lineTo(12,0),_.lineTo(64,52),_.lineTo(52,64),_.fill()},pinstripes:()=>{for(let g=3;g<64;g+=6)_.fillRect(g,0,1.2,64)},chevron:()=>{_.beginPath(),_.moveTo(0,6),_.lineTo(32,26),_.lineTo(64,6),_.lineTo(64,16),_.lineTo(32,36),_.lineTo(0,16),_.fill()},gradient:()=>{let g=_.createLinearGradient(0,0,0,64);g.addColorStop(0,x.c1),g.addColorStop(1,B),_.fillStyle=g,_.fillRect(0,0,64,64)},checker:()=>{for(let g=0;g<64;g+=12)for(let q=0;q<64;q+=12)(g+q)/12%2&&_.fillRect(g,q,12,12)},centre:()=>_.fillRect(26,0,12,64)}[x.pat]||(()=>{}))();let F=_.createLinearGradient(0,0,64,0);F.addColorStop(0,"rgba(0,0,0,.18)"),F.addColorStop(.5,"rgba(255,255,255,.05)"),F.addColorStop(1,"rgba(0,0,0,.18)"),_.fillStyle=F,_.fillRect(0,0,64,64),T||(_.fillStyle="rgba(255,255,255,.75)",_.fillRect(16,12,6,1.2),S&&_.drawImage(S,40,9,10,11.3)),_.restore()}}),he=new Map;i.team=function(x,M,S,_){let T=s.kitN(x),B=s.hx(M,"#facc15"),F=JSON.stringify([T,B,S||null,_||""]),g=he.get(F);if(g)return he.delete(F),he.set(F,g),g;let q=me(ae(T)),K=me(ae(T,B));if(g={_b3:1,key:F,K:T,g:B,tex:q,gtex:K},S)try{let $=s.crestSvg(S,_,46).replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" '),Se=new Image;Se.onload=()=>{g.dead||(g.crestImg=Se,g.tex.image=ae(T,null,Se),g.tex.needsUpdate=!0,g.gtex.image=ae(T,B,Se),g.gtex.needsUpdate=!0)},Se.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent($)}catch{}if(he.set(F,g),he.size>10){let[$,Se]=he.entries().next().value;he.delete($),Se.dead=1,Se.tex.dispose(),Se.gtex.dispose()}return g},i.freeTeam=function(){};let fe=x=>{let M=new Ve(x);return .3*M.r+.59*M.g+.11*M.b},Ae=`uniform vec4 uFace; uniform vec4 uFace2; uniform vec4 uFace3; uniform vec4 uExpr; uniform float uK;
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
  }`,_e=`uniform vec4 uBody;
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
  }`,ve=(x,M)=>{x.vertexShader=`attribute vec3 aB;
`+(M?`attribute vec3 aBN;
varying vec3 vB;
varying vec3 vBN;
`+_e+`
`:"")+Ae+`
`+x.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
`+(M?`vB = aB; vBN = aBN;
transformed += bodyDef(aB, aBN) * uK;
`:"")+"transformed += faceDef(aB) * uK;")},Qe=()=>({uFace:{value:new Rt},uFace2:{value:new Rt},uFace3:{value:new Rt},uExpr:{value:new Rt}});function oe(x,M,S,_,T){let B=new jt({map:x.map,roughness:.6,metalness:0,envMapIntensity:.45}),F=()=>({value:new Ve}),g=B.userData.u=Object.assign(_?Object.assign({},_):{uSkin:F(),uHair:F(),uSho:F(),uSoc:F(),uSlv:F(),uCol:F(),uBoot:F(),uBoot2:F(),uGlove:F(),uNumC:F(),uTape:F(),uShirt:{value:null},uDig:{value:J()},uName:{value:null},uNum:{value:new Je(-1,-1)},uGK:{value:0},uHairS:{value:1},uBeard:{value:0},uRed:{value:0},uBody:{value:new Rt(0,1,0,0)},uGear:{value:new Rt}},M,{uK:{value:S},uLayer:{value:T||0}});return _||(B.userData.base=g),T&&(B.side=Rn,B.roughness=.82),B.onBeforeCompile=q=>{Object.assign(q.uniforms,g),ve(q,!0),T===1&&(q.vertexShader=`attribute vec3 aOff;
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
#include <opaque_fragment>`)},B.customProgramCacheKey=()=>"w3dbody6_"+(T||0),B}function ge(x,M,S,_){let T=x.clone(),B=Object.assign({},M,{uK:{value:S},uIris:{value:new Ve}});return T.userData.u=B,T.onBeforeCompile=F=>{Object.assign(F.uniforms,B),ve(F,!1),_||(F.vertexShader=F.vertexShader.replace("transformed += faceDef(aB) * uK;","transformed += faceDef(aB) * uK; transformed.y += (1.713 - aB.y) * 0.35 * uK; transformed.z -= 0.0015 * uK;")),_&&(F.fragmentShader=`uniform vec3 uIris;
`+F.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ vec3 c = diffuseColor.rgb; float mx = max(c.r, max(c.g, c.b)), mn = min(c.r, min(c.g, c.b)), L = dot(c, vec3(0.3, 0.59, 0.11)); float ir = smoothstep(0.03, 0.09, mx - mn) * (1.0 - smoothstep(0.3, 0.5, L)); diffuseColor.rgb = mix(c, uIris * clamp(L / 0.12, 0.5, 1.6), ir); }`))},T.customProgramCacheKey=()=>_?"w3deye2":"w3dbrow3",T}function I(x,M,S){let _=new jt({color:1118481,roughness:.88,envMapIntensity:.35}),T=Object.assign({},x,{uK:{value:M||1},uStyle:{value:0},uTip:{value:new Rt(0,0,0,0)}});return _.userData.u=T,_.onBeforeCompile=B=>{Object.assign(B.uniforms,T),ve(B,!1),B.vertexShader=`attribute float aE;
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
          if (uTip.w > 0.5) diffuseColor.rgb = mix(diffuseColor.rgb, uTip.rgb * (0.8 + 0.3 * n), smoothstep(1.765, 1.79, p.y)); }`)},_.customProgramCacheKey=()=>"w3dhair4",_}function H(x,M,S,_){let T=new jt({map:x.map,normalMap:x.normalMap,normalScale:new Je(.8,.8),roughness:_?.8:.62,metalness:0,envMapIntensity:.3}),B=Object.assign({},M,{uK:{value:S||1},uCut:{value:0}});return T.userData.u=B,T.onBeforeCompile=F=>{Object.assign(F.uniforms,B),ve(F,!1),F.vertexShader=`varying vec3 vHB;
`+F.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vHB = aB;`),F.fragmentShader=`uniform float uCut; varying vec3 vHB;
`+F.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ float ax = abs(vHB.x); if (uCut > 1.5 && ax > (vHB.y > 1.642 ? 0.046 : 0.033)) discard; if (uCut > 0.5 && uCut < 1.5 && vHB.y > 1.62 && ax > 0.055) discard; float g = dot(diffuseColor.rgb, vec3(0.333)); diffuseColor.rgb = vec3(clamp(0.35 + g * 1.05, 0.0, 1.4)) * diffuse; }`)},T.customProgramCacheKey=()=>"w3dmhair2",T}let W=[],z=new Map,be=30;function Y(){let x=ld(j),M={root:x,bones:{},mixer:new ia(x),act:{},w:{},id:null,lastN:-9,mod:new Map,ph:0,ex:new Rt,look:0,lookP:0,lean:0};x.traverse(_=>{_.isBone&&(M.bones[_.name]=_)});let S=M.FU=Qe();M.mats=[],M.parts={},M.lockMat=new jt({color:1118481,roughness:.9}),M.bandMat=new jt({color:16777215,roughness:.7}),x.traverse(_=>{let T=_.geometry&&_.geometry.userData.k||1;_.isSkinnedMesh&&/^k_/.test(_.name)?((M.cloth=M.cloth||[]).push(_),_.userData.layer=_.name==="k_shirt"?1:_.name==="k_trou"?3:2):_.isSkinnedMesh&&_.material&&/Superhero/i.test(_.material.name||"")?(_.material=oe(_.material,S,T,M.bodyU),M.bodyU=M.bodyU||_.material.userData.u,M.mats.push(_.material),_.castShadow=!0,_.name==="Body_LO"?M.lo=_:(M.hi=_,M.mat=_.material)):_.isSkinnedMesh&&/^m_/.test(_.name)?(_.material=H(_.material,S,T,_.name==="m_beard"),_.name==="m_beard"?M.mBeard=_.material:(M.mHair=M.mHair||[]).push(_.material),M.parts[_.name]=_,_.castShadow=!0,_.visible=!1):_.isSkinnedMesh&&/Hair/i.test(_.material.name||"")?(_.material=ge(_.material,S,T,!1),M.browMat=_.material):_.isSkinnedMesh&&/Eye/i.test(_.material.name||"")?(_.material=ge(_.material,S,T,!0),M.eyeMat=_.material):/^h_(bun|pony|locks|long)/.test(_.name)?(_.traverse(B=>{B.isMesh&&(B.material=M.lockMat)}),M.parts[_.name]=_):_.isSkinnedMesh&&/^h_/.test(_.name)?(_.material=M.hairMat||(M.hairMat=I(S,T)),M.parts[_.name]=_):_.isSkinnedMesh&&/^b_/.test(_.name)?(_.material=M.beardMat||(M.beardMat=I(S,T)),M.parts[_.name]=_):_.isSkinnedMesh&&/^g_/.test(_.name)&&(_.material=M.bandMat,M.parts[_.name]=_)});for(let _ of M.cloth||[])_.material=oe(M.mat||_.material,S,_.geometry.userData.k||1,M.bodyU,_.userData.layer);M.hairMat=M.hairMat||I(S,1),M.beardMat=M.beardMat||I(S,1),M.pivots=Object.values(M.parts).map(_=>_.parent).filter(_=>_&&/_pv$/.test(_.name)),M.sw={x:0,z:0,vx:0,vz:0,px:0,pz:0};for(let _ in Ld){let T=N[Ld[_]];if(!T)continue;let B=M.mixer.clipAction(T);B.play(),B.setEffectiveWeight(0),M.act[_]=B,M.w[_]=0}return M.w.idle=1,c.add(x),W.push(M),M}function ue(x){let M=z.get(x);if(M)return M;let S=W.filter(_=>!_.mh);return M=S.filter(_=>_.lastN<d.n-1).sort((_,T)=>_.lastN-T.lastN)[0],!M&&S.length<be&&(M=Y()),M||(M=S.sort((_,T)=>_.lastN-T.lastN)[0]),M.id!=null&&z.delete(M.id),M.id=x,z.set(x,M),M.dk=null,M.lastN=-9,M}let O={gh:"af",ng:"af",ea:"af",za:"af2",ca:"af",fr:"mix",ar:"na",in:"sa",la:"lat",pt:"mix",es:"eu",it:"eu",tr:"na",cn:"ea",jp:"ea",kr:"ea",en:"eu",de:"eu",nl:"eu",ee:"eu"},ot={af:[0,5],af2:[0,9],mix:[0,12],na:[5,10],sa:[3,9],lat:[4,11],eu:[8,13],ea:[8,12]},Ie={af:["shaved","buzz","buzz","fade","fade","afro","top","twist","dread","locks","locksL","corn","corn","hawk","curl","crew","under","bleach"],straight:["shaved","buzz","crew","fade","short","short","part","quiff","slick","curl","bun","pony","long","hawk","under"],ea:["buzz","crew","short","part","quiff","slick","fade","under","bleach","short"]},Ge={crew:"m_buzz",short:"m_buzz",afro:"h_afro",top:"h_top",corn:"h_corn",hawk:"h_hawk",under:"h_under",curl:"h_curl",quiff:"h_quiff",part:"m_part",slick:"m_part",twist:"h_twist",dread:"h_dread",locks:"h_dread",locksL:"h_dread",bun:"m_buzz",pony:"h_slick",long:"m_long",bleach:"h_top"},ze={afro:1,top:1,twist:1,dread:1,locks:1,locksL:1,bleach:1},Mt={lean:{h:[1.78,1.9],b:[-.6,-.25]},balanced:{h:[1.74,1.88],b:[-.2,.25]},stocky:{h:[1.72,1.84],b:[.3,.7]}},et={face:[[-.16,.16],[-.006,.01],[-.22,.32],[-.0035,.004]],face2:[[-.005,.007],[-.05,.05],[-.004,.004],[-.007,.006]],face3:[[-.008,.008],[0,.004],[-.003,.003],[-.0055,.003]],h:[1.72,1.9],build:[-.6,.7]},D=x=>{for(let M of["face","face2","face3"])x[M]=x[M].map((S,_)=>Mn(S,et[M][_][0],et[M][_][1]));return x.h=Mn(x.h,et.h[0],et.h[1]),x.build=Mn(x.build,et.build[0],et.build[1]),x};i.SAFE=et,i.lookOf=x=>w(String(x));function w(x){return D(ee(x))}function ee(x){let M=Vt(s.hash("look4:"+x)>>>0),S=He=>He[Math.floor(M()*He.length)],_=()=>M()*2-1,T=null;try{let He=s.lookOf&&s.lookOf(x);T=He&&He.cult}catch{}let B=O[T]||S(["af","eu","lat","mix","na","ea"]),F=ot[B],g=F[0]+Math.floor(M()*(F[1]-F[0]+1)),q=g<6,K=g>9,$=B==="eu"&&M()<.22?S(["#a07a44","#c9a55a","#6b2f1a","#7a5230"]):S(q||B==="ea"?["#0a0a0c","#0a0a0c","#121010","#17110d"]:Kb.slice(0,8)),Se=S(q||B==="af2"&&g<6?Ie.af:B==="ea"?Ie.ea:Ie.straight),de=Wb[S(q?["dark","dark","dark","brown"]:K&&B!=="ea"?["brown","hazel","green","blue","blue","grey"]:["dark","brown","brown","hazel",B==="ea"?"dark":"green"])],V=B==="na"||B==="sa"?.75:B==="ea"?.35:.6,le=M()<V?S([1,1,2,2,3,4,5,6]):0,xe=B==="af"||B==="af2"?.1:0,It=B==="ea"?1:0;return{si:g,dark:q,light:K,grp:B,hair:$,st:Se,iris:de,beard:le,red:K?.4+M()*.6:M()*.3,face:[_()*.16,_()*.008+.002,_()*.22+xe,_()*.003+.001-It*.0015],face2:[_()*.005+It*.002,_()*.05,_()*.004,_()*.004+xe*.02-It*.003],face3:[_()*.008,M()*.0028+xe*.012,_()*.003,_()*.003-It*.0025],...(()=>{let He=M(),lt=He<.3?"lean":He<.75?"balanced":"stocky",Te=Mt[lt];return{arch:lt,h:Te.h[0]+M()*(Te.h[1]-Te.h[0]),build:Te.b[0]+M()*(Te.b[1]-Te.b[0])}})(),sock:S([0,0,0,1,1,1,2,3]),band:M()<.12,wrist:M()<.28?M()<.5?1:2:0,sleeves:M()<.1,untuck:M()<.72,tape:S(["#f8fafc","#f8fafc","#e2e8f0","#0b0f24"]),bandC:S(["#f8fafc","#0b0f24","#f8fafc",null]),boot:S(["#0b0f24","#0b0f24","#f8fafc","#22d3ee","#ff2d95","#facc15","#a3e635","#f97316","#a855f7"]),boot2:S(["#f8fafc","#0b0f24","#22d3ee","#ff2d95","#facc15"]),tip:S(["#e8d39a","#f2e6c4","#d9b26a"]),dance:M()<.3,left:M()<.25,sad:Math.floor(M()*3),cel:Math.floor(M()*4)}}let Ce=x=>Nc.get(x)||w(x),Me=x=>ne(512,64,M=>{if(M.fillStyle="#000",M.fillRect(0,0,512,64),!x)return;M.fillStyle="#fff",M.textAlign="center",M.textBaseline="middle",M.font="900 54px Arial Narrow, Arial, Helvetica, sans-serif",M.lineJoin="round";let S=M.measureText(x).width,_=Math.min(1.25,470/Math.max(1,S));M.save(),M.translate(258,37),M.scale(_,1),M.globalCompositeOperation="lighter",M.strokeStyle="#0000ff",M.lineWidth=9,M.strokeText(x,0,0),M.restore(),M.save(),M.translate(256,34),M.scale(_,1),M.strokeStyle="#00ff00",M.lineWidth=10,M.strokeText(x,0,0),M.fillStyle="#ffffff",M.fillText(x,0,0),M.restore()});function we(x,M,S,_,T){let B="";if(s.nameOf&&!/^(mgr|off4|ref|fan)/.test(String(_))){if(x.nmId!==_){x.nmId=_;try{x.nm=String(s.nameOf(_)||"").toUpperCase().slice(0,16)}catch{x.nm=""}}B=x.nm}let F=M.key+(S?"g":"o")+_+":"+T+":"+B;if(x.dk===F)return;x.dk=F;let g=x.bodyU,q=M.K,K=x.lk&&x.lkId===_?x.lk:(x.lkId=_,x.lk=Ce(_)),$=(xe,It)=>g[xe].value.set(It);$("uSkin",to[Math.min(to.length-1,K.si)]),$("uHair",K.hair),g.uRed.value=K.red,g.uGK.value=S?1:0,g.uShirt.value=S?M.gtex:M.tex,$("uSho",S?"#111827":q.sho),$("uSoc",S?M.g:q.soc),$("uSlv",S?M.g:q.slv),$("uCol",S?"#111827":q.col),$("uBoot",K.boot),$("uBoot2",K.boot2===K.boot?"#f8fafc":K.boot2),$("uGlove","#f8fafc"),$("uTape",K.tape===q.soc?"#f8fafc":K.tape),$("uNumC","#ffffff");let Se=Math.max(0,Math.min(99,Math.floor(+T)||0)),de=T==null||T==="";g.uNum.value.set(de?-1:Se>=10?Math.floor(Se/10):-1,de?-1:Se%10),x.nameTex||(x.nameTex=me(Me(""),!1),g.uName.value=x.nameTex),x.nameTxt!==B&&(x.nameTxt=B,x.nameTex.image=Me(B),x.nameTex.needsUpdate=!0),g.uBody.value.set(K.build,1,!S&&K.untuck?1:0,!S&&K.sleeves?1:0),g.uGear.value.set(K.sock,K.trou||0,S?0:K.wrist,B?1:0),x.hgt=Math.min(1.92,K.h+(S?.04:0))/1.81,x.FU.uFace.value.fromArray(K.face),x.FU.uFace2.value.fromArray(K.face2),x.FU.uFace3.value.fromArray(K.face3),x.eyeMat&&x.eyeMat.userData.u.uIris.value.set(K.iris);let V=x.hstyle=K.st;g.uHairS.value=V==="shaved"?0:V==="fade"?2:V==="hawk"||V==="under"?3:V==="buzz"?4:1;for(let xe in x.parts)x.parts[xe].visible=!1;let le=xe=>{x.parts[xe]&&(x.parts[xe].visible=!0)};le(Ge[V]),V==="bun"&&le("h_bun"),V==="pony"&&le("h_pony"),V==="locks"&&le("h_locksS"),V==="locksL"&&le("h_locksL"),x.hairMat.userData.u.uStyle.value=V==="corn"?1:V==="afro"||V==="curl"?2:V==="twist"||V==="dread"||V==="locks"||V==="locksL"?3:V==="part"?4:V==="slick"||V==="long"||V==="pony"?5:0,x.hairMat.userData.u.uTip.value.set(...new Ve(K.tip).toArray(),V==="bleach"?1:0);for(let xe of x.mHair||[])xe.color.set(K.hair);x.mBeard&&x.mBeard.color.set(K.hair).multiplyScalar(.9),x.hairMat.color.set(K.hair),x.lockMat.color.set(K.hair),x.beardMat.color.set(K.hair).multiplyScalar(.95),x.browMat&&x.browMat.color.set(K.hair).lerp(new Ve(to[Math.min(to.length-1,K.si)]),.25),g.uBeard.value=K.beard,x.beardMat.userData.u.uStyle.value=2,(K.beard===5||K.beard===2||K.beard===3||K.beard===6)&&(le("m_beard"),x.mBeard&&(x.mBeard.userData.u.uCut.value=K.beard===5?0:K.beard===2?1:2)),K.band&&!S&&(le(ze[V]?"g_bandX":Ge[V]?"g_band":"g_band0"),x.bandMat.color.set(K.bandC||q.c1)),x.style=K}let je=new $e,Fe=new $e,We=new $e,it=new zi,gt=new zi,Ee=new zi,st=new zi,mt=(x,M)=>{x.mod.has(M)||x.mod.set(M,M.quaternion.clone())};function re(x,M,S,_,T){let B=x.bones[M],F=x.bones[S];!B||!F||T<=.001||(mt(x,B),B.updateWorldMatrix(!0,!1),F.updateWorldMatrix(!1,!1),je.setFromMatrixPosition(B.matrixWorld),Fe.setFromMatrixPosition(F.matrixWorld).sub(je).normalize(),We.copy(_).normalize().applyQuaternion(x.root.quaternion),it.setFromUnitVectors(Fe,We),T<1&&it.copy(st.identity().slerp(it,T)),B.parent.getWorldQuaternion(Ee),gt.copy(Ee).invert().multiply(it).multiply(Ee),B.quaternion.premultiply(gt))}function Ne(x,M,S,_){let T=x.bones[M];!T||!_||(mt(x,T),T.updateWorldMatrix(!0,!1),We.copy(S).applyQuaternion(x.root.quaternion),it.setFromAxisAngle(We,_),T.parent.getWorldQuaternion(Ee),gt.copy(Ee).invert().multiply(it).multiply(Ee),T.quaternion.premultiply(gt))}let Le=new $e(1,0,0),bt=new $e(0,1,0),Re=(x,M,S)=>new $e(x,M,S),sn={wind:[Re(0,-.8,-.6),Re(0,-.15,-1)],hit:[Re(0,-.4,.92),Re(0,-.3,1)]};i.fig=function(x,M,S,_,T,B){if(!x||!x._b3||!P)return;B=B||{},S=String(S);let F=C&&C.ok&&C.isPlayer(S),g=F?C.getChar(S):ue(S),q=g.lastN<d.n-1;g.lastN=d.n,y.add(g.root);let K=B.num;if(K==null){if(g.numId!==S){g.numId=S;try{g.num=s.numOf(S)}catch{g.num=null}}K=g.num}if(F){let ce="";if(s.nameOf&&!/^(ref|off4|mgr)/.test(S)){if(g.nmId!==S){g.nmId=S;try{g.nm=String(s.nameOf(S)||"").toUpperCase().slice(0,16)}catch{g.nm=""}}ce=g.nm}g.lkId!==S&&(g.lkId=S,g.lk=Ce(S)),C.dress(g,x,M,S,K,g.lk,ce)}else we(g,x,M,S,K);g.gls&&(g.gls.visible=!!(g.style&&g.style.mgr&&g.style.gl));let $=d.dt;if(q){g.px=_,g.pz=T,g.spd=0,g.kickT=-1,g.pk=0;for(let ce in g.w)g.w[ce]=0;g.w.idle=1}{let ce=_-g.px,Be=T-g.pz;!q&&ce*ce+Be*Be>6.25&&(g.px=_,g.pz=T,g.spd=0)}let Se=_-g.px,de=T-g.pz,V=$>0?Math.sqrt(Se*Se+de*de)/$:0;g.px=_,g.pz=T,g.spd+=(Math.min(V,11)-g.spd)*Math.min(1,$*6);let le=Math.min(g.spd,(B.run==null?1:B.run)*6.5+.35),xe=B.dive||0,It=B.kick||0,He=xe||B.header?null:B.cel||(B.jump>.001?"jump":B.arms==="up"?"arms":null),lt=B.header&&B.jump||0,Te=!!He,pt=!Te&&!xe&&!B.hands&&(B.lean||0)>.2,Tt=0,Xe=0,xt=0;if(Te&&!g.mh&&He!=="arms"&&le<2.2){g.hopP==null&&(g.hopP=.95+s.hash(S)%5*.09,g.hopT=s.hash(S)%7*.13),g.hopT+=$;let ce=g.hopT%g.hopP;if(ce<.14)Tt=-.07*Math.sin(ce/.14*Math.PI/2),xt=ce/.14;else if(ce<.66){let Be=(ce-.14)/.52;Tt=1.32*Be*(1-Be),Xe=1}else if(ce<.78){let Be=(ce-.66)/.12;Tt=-.08*Math.sin(Be*Math.PI),xt=1-Be}}let wt=It>0&&g.pk<=0,Zt=!!B.slide&&!g.psl;g.psl=!!B.slide,It>0&&g.pk<=0&&(g.kickT=0),g.pk=It,g.kickT>=0&&(g.kickT+=$,g.kickT>.6&&(g.kickT=-1));let ye={idle:0,walk:0,jog:0,sprint:0,dance:0,air:0,crouch:0,talk:0};if(xe)ye.air=1;else if(Te&&He==="jump"&&g.style.dance&&le<1.5)ye.dance=1;else if(Xe||xt)ye.air=Xe,ye.crouch=xt*.6,ye.idle=1-Xe-xt*.6;else{let ce=1-At(.25,1,le);ye.walk=At(.25,1,le)*(1-At(1.8,3,le)),ye.jog=At(1.8,3,le)*(1-At(4.8,6.2,le)),ye.sprint=At(4.8,6.2,le),M&&!Te&&!pt&&ct&&ht>=d.n-1?(ye.crouch=ce*.6,ye.idle=ce*.4):ye.idle=ce}let pe=0,at=Math.min(1,$*(Xe||xt?16:7));for(let ce in g.act)g.w[ce]+=((ye[ce]||0)-g.w[ce])*at,g.w[ce]<.002&&(g.w[ce]=0),pe+=g.w[ce];pe<.01&&(g.w.idle=1,pe=1);for(let ce in g.act)g.act[ce].setEffectiveWeight(g.w[ce]/pe);{let ce=g.w.walk+g.w.jog+g.w.sprint,Be=ce>.01?(g.w.walk*2+g.w.jog*3.4+g.w.sprint*4.4)/ce:2,Ye=Mn(Math.max(le,.9)/Be,.55,1.75);g.ph=(g.ph+$*Ye)%1;let kt={walk:0,jog:0,sprint:.05};for(let Xt of["walk","jog","sprint"]){let Yt=g.act[Xt];Yt&&(Yt.timeScale=0,Yt.time=(g.ph+kt[Xt])%1*Yt.getClip().duration)}}g.mh&&(B._cel=Te&&!(He==="jump"&&g.style.dance)?He:null,B._csp=le,C.pre(g,B,$,wt&&!xe,Zt));for(let[ce,Be]of g.mod)ce.quaternion.copy(Be);g.mod.clear(),g.mixer.update($);let Bt=B.yaw==null?g.yaw||0:B.yaw;(q||g.yaw==null)&&(g.yaw=Bt);let Gt=Bt-g.yaw;for(;Gt>Math.PI;)Gt-=2*Math.PI;for(;Gt<-Math.PI;)Gt+=2*Math.PI;let Sn=1-Math.exp(-$*(xe||g.kickT>=0?18:11)),In=Gt*Sn;g.yaw+=In;let ln=g.yaw,gi=$>0?In/$:0;if(g.lean+=(Mn(-gi*le*.035,-.22,.22)-g.lean)*Math.min(1,$*6),g.root.position.set(_,(B.header?lt*.95:0)+Tt+Math.abs(xe)*.45+(B.y||0),T),g.root.rotation.set(At(4.5,7,le)*.05,ln,xe*1.25+(xe?0:g.lean),"YXZ"),g.root.scale.setScalar(Dc*(g.hgt||1)),g.root.updateMatrixWorld(!0),g.kickT>=0&&!xe&&!g.mh){let ce=g.kickT,Be=g.style.left,Ye=Be?"_l":"_r",kt=Be?"_r":"_l",Xt=ce<.3?1:1-(ce-.3)/.3,Yt=At(.14,.28,ce),En=sn.wind[0].clone().lerp(sn.hit[0],Yt),_n=sn.wind[1].clone().lerp(sn.hit[1],Yt);Ne(g,"spine_01",Le,-.18*Xt),re(g,"thigh"+Ye,"calf"+Ye,En,Xt),re(g,"calf"+Ye,"foot"+Ye,_n,Xt),re(g,"thigh"+kt,"calf"+kt,Re(0,-1,.12),Xt*.6),re(g,"upperarm"+kt,"lowerarm"+kt,Re(Be?-1:1,-.15,.35),Xt*.8),re(g,"upperarm"+Ye,"lowerarm"+Ye,Re(Be?1:-1,-.4,-.3),Xt*.6)}if(xe){let ce=Math.min(1,Math.abs(xe)*1.6);re(g,"upperarm_l","lowerarm_l",Re(.25,1,.2),ce),re(g,"lowerarm_l","hand_l",Re(.15,1,.25),ce),re(g,"upperarm_r","lowerarm_r",Re(-.25,1,.2),ce),re(g,"lowerarm_r","hand_r",Re(-.15,1,.25),ce),re(g,"thigh_l","calf_l",Re(.15,-1,0),ce),re(g,"thigh_r","calf_r",Re(-.15,-1,0),ce),re(g,"calf_l","foot_l",Re(.15,-1,0),ce),re(g,"calf_r","foot_r",Re(-.15,-1,0),ce)}{let ce=Te&&!xe&&!(He==="jump"&&g.style.dance&&le<1.5)?1-(g.mh&&g.shotW||0):0;g.armW=(g.armW||0)+(ce-(g.armW||0))*Math.min(1,$*7),q&&(g.armW=ce);let Be=!Te&&!xe&&(pt||B.hands)?1:0;Be&&(g.sadV=B.hands?1:g.style.sad||0),g.sadW=(g.sadW||0)+(Be-(g.sadW||0))*Math.min(1,$*5),q&&(g.sadW=Be)}if(!xe&&g.armW>.01){let ce=Math.sin(d.now/210+s.hash(S)%7),Be=g.armW,Ye=He==="arms"?Math.max(0,Math.sin(d.now/160+s.hash(S)%5))*.35:0;re(g,"upperarm_l","lowerarm_l",Re(.5,1,.1+ce*.1),Be),re(g,"lowerarm_l","hand_l",Re(.3,1-Ye,.1+Ye),Be),re(g,"upperarm_r","lowerarm_r",Re(-.5,1,.1-ce*.1),Be),re(g,"lowerarm_r","hand_r",Re(-.3,1-Ye,.1+Ye),Be),Ne(g,"Head",Le,-.25*Be)}else if(!xe&&g.sadW>.01){let ce=g.sadV||0,Be=g.sadW;if(ce===1){let Ye=Be*(B.hands?Math.min(1,B.hands*2):1);re(g,"upperarm_l","lowerarm_l",Re(.75,.75,.15),Ye),re(g,"lowerarm_l","hand_l",Re(-.9,.35,-.1),Ye),re(g,"upperarm_r","lowerarm_r",Re(-.75,.75,.15),Ye),re(g,"lowerarm_r","hand_r",Re(.9,.35,-.1),Ye),Ne(g,"Head",Le,(B.hands?-.15:.3)*Be),Ne(g,"spine_03",Le,(B.hands?-.08:.1)*Be)}else ce===2?(re(g,"upperarm_l","lowerarm_l",Re(.6,-.65,-.45),Be),re(g,"lowerarm_l","hand_l",Re(-.45,-.6,.25),Be),re(g,"upperarm_r","lowerarm_r",Re(-.6,-.65,-.45),Be),re(g,"lowerarm_r","hand_r",Re(.45,-.6,.25),Be),Ne(g,"Head",Le,.35*Be),Ne(g,"spine_02",Le,.12*Be)):(Ne(g,"spine_02",Le,.22*Be),Ne(g,"spine_03",Le,.12*Be),Ne(g,"Head",Le,.45*Be))}if(B.yell&&!xe&&!Te){let ce=Math.sin(d.now/140+s.hash(S)%5),Be=g.style.left?1:-1,Ye=Be>0?"_l":"_r",kt=Be>0?"_r":"_l";re(g,"upperarm"+Ye,"lowerarm"+Ye,Re(Be*.35,.35+ce*.2,1),1),re(g,"lowerarm"+Ye,"hand"+Ye,Re(Be*.2,.25+ce*.3,1),1),re(g,"upperarm"+kt,"lowerarm"+kt,Re(-Be*.8,-.35,.35),.8),Ne(g,"Head",Le,-.12)}if(B.throwIn!=null&&B.throwIn!==!1&&B.throwIn!==void 0){let ce=B.throwIn>.05?1-B.throwIn:0;for(let[Be,Ye]of[["_l",1],["_r",-1]])re(g,"upperarm"+Be,"lowerarm"+Be,Re(Ye*.15,1,-.35+ce*1.3),1),re(g,"lowerarm"+Be,"hand"+Be,Re(Ye*.05,.6-ce*.4,-1+ce*2),1);Ne(g,"spine_01",Le,-.25+ce*.45)}if(B.wall){for(let[ce,Be]of[["_l",1],["_r",-1]])re(g,"upperarm"+ce,"lowerarm"+ce,Re(Be*.2,-1,.35),1),re(g,"lowerarm"+ce,"hand"+ce,Re(-Be*.7,-.4,.6),1);Ne(g,"Head",Le,-.1)}if(B.slide&&!g.mh){g.root.position.y-=.58,g.root.updateMatrixWorld(!0),Ne(g,"spine_01",Le,-.85);let ce=g.style.left?"_l":"_r",Be=g.style.left?"_r":"_l";re(g,"thigh"+ce,"calf"+ce,Re(0,-.12,1),1),re(g,"calf"+ce,"foot"+ce,Re(0,-.1,1),1),re(g,"thigh"+Be,"calf"+Be,Re(0,-.35,.9),1),re(g,"calf"+Be,"foot"+Be,Re(0,-1,-.2),1),re(g,"upperarm_l","lowerarm_l",Re(.7,-.6,-.4),1),re(g,"upperarm_r","lowerarm_r",Re(-.7,-.6,-.4),1)}if(B.header&&(Ne(g,"spine_02",Le,.18),Ne(g,"Head",Le,.35),re(g,"upperarm_l","lowerarm_l",Re(.9,.2,.2),1),re(g,"upperarm_r","lowerarm_r",Re(-.9,.2,.2),1)),B.catch){Ne(g,"spine_01",Le,.25);for(let[ce,Be]of[["_l",1],["_r",-1]])re(g,"upperarm"+ce,"lowerarm"+ce,Re(Be*.25,-.15,1),1),re(g,"lowerarm"+ce,"hand"+ce,Re(-Be*.25,.25,1),1)}for(let ce of["_l","_r"]){let Be=g.bones["thigh"+ce],Ye=g.bones["calf"+ce],kt=g.bones["foot"+ce];if(!Be||!Ye||!kt)continue;Be.updateWorldMatrix(!0,!0),je.setFromMatrixPosition(Be.matrixWorld),Fe.setFromMatrixPosition(Ye.matrixWorld),We.setFromMatrixPosition(kt.matrixWorld);let Xt=Fe.clone().sub(je).normalize(),Yt=We.clone().sub(Fe).normalize(),En=Math.acos(Mn(Xt.dot(Yt),-1,1)),_n=new $e().crossVectors(Xt,Yt).dot(new $e(1,0,0).applyQuaternion(g.root.quaternion));_n<0&&En>.1?Ne(g,"calf"+ce,Le,En-.1):En>2.6&&Ne(g,"calf"+ce,Le,-(En-2.6)*Math.sign(_n||1))}{let ce=0,Be=0;if(ct&&ht>=d.n-1&&!xe&&!Te&&g.kickT<0){let kt=ct.x-_,Xt=ct.z-T,Yt=Math.sqrt(kt*kt+Xt*Xt);if(Yt>.3&&Yt<45){let En=Math.atan2(kt,Xt)-ln;for(;En>Math.PI;)En-=2*Math.PI;for(;En<-Math.PI;)En+=2*Math.PI;ce=Mn(En,-1.1,1.1),Be=Mn(Math.atan2(1.7-ct.y,Yt)*.6,-.2,.55)}}let Ye=Math.min(1,$*5);g.look+=(ce-g.look)*Ye,g.lookP+=(Be-g.lookP)*Ye,Ne(g,"neck_01",bt,g.look*.35),Ne(g,"Head",bt,g.look*.55),Ne(g,"Head",Le,g.lookP*(pt?0:1))}{let ce=g.ex,Be=B.fierce||B.wall||B.slide||B.header,Ye=B.yell?[.8,0,1,0]:B.hands?[0,0,.55,.9]:pt?[.2,0,0,1]:Te?g.w.dance>.5?[0,1,.15,0]:[.1,.45,.95,0]:Be?[1,0,.45,0]:xe||g.kickT>=0?[1,0,.35,0]:le>4.5?[.8,0,.1,0]:[.3,.06,0,0],kt=Math.min(1,$*4);ce.set(ce.x+(Ye[0]-ce.x)*kt,ce.y+(Ye[1]-ce.y)*kt,ce.z+(Ye[2]-ce.z)*kt,ce.w+(Ye[3]-ce.w)*kt),g.FU.uExpr.value.copy(ce)}if(e==="high"&&g.pivots.length&&$>0){let ce=g.sw,Be=(_-ce.px)/$,Ye=(T-ce.pz)/$;ce.px=_,ce.pz=T;let kt=Math.cos(g.yaw),Xt=Math.sin(g.yaw),Yt=Mn(Be*Xt+Ye*kt,-9,9),En=Mn(Be*kt-Ye*Xt,-9,9),_n=Mn(Yt*.07+(Xe||lt?-.25:0),-.6,.6),si=Mn(-En*.06+g.lean*.8,-.5,.5);ce.vx+=((_n-ce.x)*40-ce.vx*7)*$,ce.vz+=((si-ce.z)*40-ce.vz*7)*$,ce.x+=ce.vx*$,ce.z+=ce.vz*$,q&&(ce.x=ce.z=ce.vx=ce.vz=0);for(let Jt of g.pivots)Jt.rotation.x=ce.x,Jt.rotation.z=ce.z}g.mh&&C.post(g),g.dist=l.position.distanceTo(g.root.position)};let Et=null,De=null,k=null,Pe=null,ke=()=>Et||(Et=(()=>{let x=me(ne(256,128,S=>{S.fillStyle="#f8fafc",S.fillRect(0,0,256,128),S.fillStyle="#0b0f24",[[32,20],[96,20],[160,20],[224,20],[0,64],[64,64],[128,64],[192,64],[256,64],[32,108],[96,108],[160,108],[224,108]].forEach(([_,T])=>{S.beginPath();for(let B=0;B<5;B++){let F=-Math.PI/2+B*1.2566;S.lineTo(_+Math.cos(F)*14,T+Math.sin(F)*12)}S.fill()}),S.strokeStyle="rgba(15,23,42,.35)",S.lineWidth=1.2;for(let _=0;_<256;_+=32)S.beginPath(),S.moveTo(_,0),S.lineTo(_+16,128),S.stroke()})),M=new qe(new ys(Wh,24,16),new jt({map:x,roughness:.38,envMapIntensity:.8}));return M.castShadow=!0,c.add(M),M})()),ct=null,ht=-9;i.ball=function(x,M,S,_){if(!P)return;let T=ke();Ps(),y.add(T),ht=d.n,ct=ct||new $e,ct.set(x,Wh+(S||0)*1.6,M),T.position.set(x,Wh+(S||0)*1.6,M),T.rotation.set((_||0)*1.3,_||0,0)},i.trophy=function(x,M,S,_,T){if(!De){let B=new Gn,F=new jt({color:16106818,metalness:1,roughness:.2,envMapIntensity:1.6}),g=[[0,0],[.32,0],[.32,.08],[.12,.14],[.08,.42],[.14,.5],[.34,.62],[.42,.95],[.4,1.02],[0,1.02]].map(([$,Se])=>new Je($,Se)),q=new qe(new dc(g,40),F);q.material.side=Rn,B.add(q),[-1,1].forEach($=>{let Se=new qe(new qa(.17,.035,8,20,Math.PI*1.15),F);Se.position.set($*.42,.78,0),Se.rotation.z=$>0?-Math.PI*.55:Math.PI*1.55,B.add(Se)});let K=new qe(new pi(.36,.4,.22,24),new jt({color:724772,roughness:.4}));K.position.y=-.11,B.add(K),B.traverse($=>{$.isMesh&&($.castShadow=!0)}),De=B,c.add(B)}y.add(De),De.position.set(x,M*.86,S),De.rotation.set(0,_||0,0),De.scale.setScalar(T||1)},i.floor=function(){k||(k=new qe(new pi(1.15,1.2,.1,48),new jt({color:1976635,roughness:.55,metalness:.2})),k.position.y=-.05,k.receiveShadow=!0,c.add(k)),y.add(k)};let qt=600;i.particles=function(x,M){Pe||(Pe=new Ai(new pn(1,1,1),new An({toneMapped:!1}),qt),Pe.frustumCulled=!1,Pe.setColorAt(0,new Ve),c.add(Pe));let S=[],_=new ft,T=new zi,B=new Xr,F=new $e,g=new $e,q=new Ve;for(let K of x)if(K.vy-=9.8*M*(K.g==null?.25:K.g),K.x+=K.vx*M,K.y+=K.vy*M,K.z+=K.vz*M,K.life-=M,K.rot=(K.rot||0)+M*6,K.life>0&&K.y>0){S.push(K);let $=S.length-1;if($>=qt)continue;let Se=K.s||.25;_.compose(g.set(K.x,K.y,K.z),T.setFromEuler(B.set(K.rot*.7,K.rot,0)),F.set(Se,.02+Se*.1,Se*.6)),Pe.setMatrixAt($,_);let de=K.c;q.setRGB(de[0],de[1],de[2],Qt),Pe.setColorAt($,q)}return Pe.count=Math.min(qt,S.length),Pe.instanceMatrix.needsUpdate=!0,Pe.instanceColor&&(Pe.instanceColor.needsUpdate=!0),y.add(Pe),S};function zt(){let x=[],M=[],S=[],_=new Ve,T=(B,F,g,q,K,$)=>{[B,F,g,B,g,q].forEach(Se=>{x.push(Se[0],Se[1],Se[2]),M.push(K[0],K[1],K[2]),S.push($.r,$.g,$.b)})};return{box(B,F,g,q,K,$,Se){_.set(q);let de=B/2,V=F/2,le=g/2,xe=(It,He,lt)=>[K+It,$+He,Se+lt];T(xe(-de,-V,le),xe(de,-V,le),xe(de,V,le),xe(-de,V,le),[0,0,1],_),T(xe(de,-V,-le),xe(-de,-V,-le),xe(-de,V,-le),xe(de,V,-le),[0,0,-1],_),T(xe(de,-V,le),xe(de,-V,-le),xe(de,V,-le),xe(de,V,le),[1,0,0],_),T(xe(-de,-V,-le),xe(-de,-V,le),xe(-de,V,le),xe(-de,V,-le),[-1,0,0],_),T(xe(-de,V,le),xe(de,V,le),xe(de,V,-le),xe(-de,V,-le),[0,1,0],_),T(xe(-de,-V,-le),xe(de,-V,-le),xe(de,-V,le),xe(-de,-V,le),[0,-1,0],_)},geo(){let B=new nn;return B.setAttribute("position",new Ut(x,3)),B.setAttribute("normal",new Ut(M,3)),B.setAttribute("color",new Ut(S,3)),B}}}let Vt=x=>{let M=x>>>0||1;return()=>(M^=M<<13,M>>>=0,M^=M>>>17,M^=M<<5,M>>>=0,M/4294967296)},Pn=null,Nt=null,un=null,ii=null,no=()=>Pn||(Pn=(()=>{let M=me(ne(1920,1344,S=>{for(let F=-1;F<16;F++)S.fillStyle=F%2?"#2f8a3d":"#287d36",S.fillRect((7.5+F*7.5)*16,0,120,1344);let _=Vt(7);for(let F=0;F<26e3;F++){let g=_();S.fillStyle=g<.5?"rgba(0,0,0,.06)":"rgba(255,255,255,.05)",S.fillRect(_()*1920,_()*1344,2+_()*3,1+_()*2)}let T=F=>(F+60)*16,B=F=>(F+42)*16;S.strokeStyle="rgba(255,255,255,.92)",S.lineWidth=2.6,S.strokeRect(T(-52.5),B(-34),1680,1088),S.beginPath(),S.moveTo(T(0),B(-34)),S.lineTo(T(0),B(34)),S.stroke(),S.beginPath(),S.arc(T(0),B(0),146.4,0,7),S.stroke(),[-1,1].forEach(F=>{let g=F*52.5;S.strokeRect(Math.min(T(g),T(g-F*16.5)),B(-20.16),264,645.12),S.strokeRect(Math.min(T(g),T(g-F*5.5)),B(-9.16),88,293.12),S.beginPath(),S.arc(T(g-F*11),B(0),146.4,F>0?Math.PI-.93:-.93,F>0?Math.PI+.93:.93),S.stroke(),S.fillStyle="#fff",S.beginPath(),S.arc(T(g-F*11),B(0),3,0,7),S.fill(),[-34,34].forEach(q=>{S.beginPath(),S.arc(T(g),B(q),16,0,7),S.stroke()})}),S.fillStyle="#fff",S.beginPath(),S.arc(T(0),B(0),3.2,0,7),S.fill(),S.setLineDash([10,8]),S.lineWidth=2,S.strokeStyle="rgba(255,255,255,.7)",[-1,1].forEach(F=>{S.strokeRect(Math.min(T(F*4.5),T(F*14.5)),B(-37.6),160,41.6)}),S.setLineDash([])}));return M.anisotropy=t?2:8,M})()),la=(x,M)=>me(ne(1024,64,S=>{let _=S.createLinearGradient(0,0,1024,0);_.addColorStop(0,"#22d3ee"),_.addColorStop(.5,"#a855f7"),_.addColorStop(1,"#ff2d95"),S.fillStyle="#070b18",S.fillRect(0,0,1024,64),S.fillStyle=_,S.fillRect(0,0,1024,5),S.fillRect(0,59,1024,5),S.font="900 36px Arial, Helvetica, sans-serif",S.textBaseline="middle",["SINLESS GG","11 WONDERS","SINLESS GG","11 WONDERS"].forEach((T,B)=>{S.fillStyle=[x,"#ffffff",M,"#22d3ee"][B],S.fillText(T,20+B*256,34)})}),!0,!0),ar=()=>me(ne(64,64,x=>{x.clearRect(0,0,64,64),x.strokeStyle="rgba(255,255,255,.9)",x.lineWidth=3,x.strokeRect(0,0,64,64)}),!0,!0),io=()=>me(ne(64,64,x=>{let M=x.createRadialGradient(32,32,0,32,32,32);M.addColorStop(0,"rgba(255,250,230,1)"),M.addColorStop(.25,"rgba(255,240,200,.55)"),M.addColorStop(1,"rgba(255,240,200,0)"),x.fillStyle=M,x.fillRect(0,0,64,64)})),or=()=>Nt||(Nt=(()=>{let x=(S,_,T)=>({value:new Ve(S,_,T)}),M=new qe(new ys(460,32,16),new Xn({side:Fn,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new $e(.012,.016,.05)},uMid:{value:new $e(.06,.03,.16)},uHor:{value:new $e(.24,.1,.32)},uStars:{value:1},uCloud:{value:0},uSun:{value:new $e(0,1,0)},uSunC:x(0,0,0),uT:{value:0},uFlash:{value:0}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform vec3 uTop, uMid, uHor, uSun, uSunC; uniform float uStars, uCloud, uT, uFlash; varying vec3 vD; float h(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(mix(h(i), h(i + vec3(1,0,0)), f.x), mix(h(i + vec3(0,1,0)), h(i + vec3(1,1,0)), f.x), f.y), mix(mix(h(i + vec3(0,0,1)), h(i + vec3(1,0,1)), f.x), mix(h(i + vec3(0,1,1)), h(i + vec3(1,1,1)), f.x), f.y), f.z); }void main(){ float y = vD.y; vec3 c = mix(uHor, uMid, smoothstep(0.0, 0.18, y)); c = mix(c, uTop, smoothstep(0.18, 0.7, y)); vec3 q = floor(vD * 260.0); float s = step(0.9975, h(q)) * smoothstep(0.08, 0.4, y); c += vec3(s * 0.9 * uStars);float sd = max(dot(vD, normalize(uSun)), 0.0); c += uSunC * (pow(sd, 380.0) * 3.0 + pow(sd, 10.0) * 0.3) * (1.0 - uCloud * 0.85);if (uCloud > 0.01) { vec3 p = vD * 3.2 + vec3(uT * 0.012, 0.0, uT * 0.007); float cl = n3(p) * 0.6 + n3(p * 2.1) * 0.3 + n3(p * 4.3) * 0.1; float cov = smoothstep(1.0 - uCloud, 1.08 - uCloud * 0.5, cl) * smoothstep(-0.02, 0.16, y);vec3 cc = mix(uHor, vec3(dot(uMid, vec3(0.333))) * 1.25 + uSunC * 0.06, 0.6); c = mix(c, cc, cov * 0.9); } c += vec3(uFlash); gl_FragColor = vec4(c, 1.0); }"}));return M.frustumCulled=!1,M.renderOrder=-1,M})()),Vi=null,Bs=null;function Pc(){let x=new Gn;x.userData.keep=1;let M=me(ne(256,256,Xe=>{Xe.fillStyle="#3d5a2e",Xe.fillRect(0,0,256,256);let xt=Vt(4242);for(let wt=0;wt<2600;wt++){let Zt=xt();Xe.fillStyle=Zt<.5?"rgba(84,118,58,.45)":Zt<.8?"rgba(44,66,32,.45)":"rgba(110,128,70,.35)",Xe.fillRect(xt()*256,xt()*256,2+xt()*5,2+xt()*5)}}),!0,!0);M.repeat.set(70,70);let S=new qe(new Wa(900,48),new Ci({map:M,color:12108968}));S.rotation.x=-Math.PI/2,S.position.y=-.06,x.add(S);let _=me(ne(128,128,Xe=>{Xe.fillStyle="#7b8190",Xe.fillRect(0,0,128,128);let xt=Vt(77);for(let wt=0;wt<900;wt++)Xe.fillStyle=xt()<.5?"rgba(255,255,255,.06)":"rgba(0,0,0,.08)",Xe.fillRect(xt()*128,xt()*128,2,2);Xe.strokeStyle="rgba(30,35,45,.35)",Xe.lineWidth=2;for(let wt=0;wt<=128;wt+=32)Xe.beginPath(),Xe.moveTo(wt,0),Xe.lineTo(wt,128),Xe.moveTo(0,wt),Xe.lineTo(128,wt),Xe.stroke()}),!0,!0);_.repeat.set(36,28);let T=new qe(new vi(250,200),new Ci({map:_}));T.rotation.x=-Math.PI/2,T.position.y=-.045,T.receiveShadow=!0,x.add(T);let B=zt();B.box(.5,2.2,.5,"#4a3424",0,1.1,0);let F=new nn().copy(B.geo()),g=new Ka(2.6,5.5,7).translate(0,4.6,0),q=new Ka(1.9,4.2,7).translate(0,7,0),K=(Xe,xt)=>{let wt=new Ve(xt),Zt=Xe.attributes.position.count,ye=new Float32Array(Zt*3);for(let pe=0;pe<Zt;pe++)ye.set([wt.r,wt.g,wt.b],pe*3);return Xe.setAttribute("color",new Ft(ye,3)),Xe.toNonIndexed?Xe.toNonIndexed():Xe},$=[F.index?F.toNonIndexed():F,K(g.toNonIndexed(),"#2f5a2a"),K(q.toNonIndexed(),"#3b6b31")].map(Xe=>(Xe.deleteAttribute("uv"),Xe)),Se=Za($),de=Vt(9001),V=e==="low"?140:320;Bs=new Ai(Se,new Ci({vertexColors:!0}),V);let le=new ft,xe=new zi,It=new $e,He=new $e;for(let Xe=0;Xe<V;Xe++){let xt=de()*Math.PI*2,wt=150+Math.pow(de(),.7)*260,Zt=.8+de()*.9;He.set(Math.cos(xt)*wt*1.15,0,Math.sin(xt)*wt),xe.setFromAxisAngle(new $e(0,1,0),de()*6.3),It.set(Zt,Zt*(.85+de()*.4),Zt),le.compose(He,xe,It),Bs.setMatrixAt(Xe,le)}Bs.frustumCulled=!1,x.add(Bs);let lt=2048,Te=160,pt=ne(lt,Te,Xe=>{Xe.clearRect(0,0,lt,Te);let xt=Vt(31337);Xe.globalCompositeOperation="lighter",Xe.fillStyle="rgb(255,0,0)",Xe.beginPath(),Xe.moveTo(0,Te);for(let wt=0;wt<=lt;wt+=8){let Zt=wt/lt*Math.PI*2,ye=46+Math.sin(Zt*3)*16+Math.sin(Zt*7+1)*10+Math.sin(Zt*17+2)*4;Xe.lineTo(wt,Te-ye)}Xe.lineTo(lt,Te),Xe.fill();for(let wt=0;wt<lt;){let Zt=10+xt()*34,ye=Math.sin(wt/lt*Math.PI*4)>-.2,pe=ye?16+Math.pow(xt(),2.2)*92:6+xt()*14;if(Xe.fillStyle="rgb(0,255,0)",Xe.fillRect(wt,Te-pe,Zt,pe),ye&&pe>22){Xe.fillStyle="rgb(0,0,255)";for(let at=Te-pe+5;at<Te-6;at+=6)for(let Bt=wt+3;Bt<wt+Zt-3;Bt+=5)xt()<.33&&Xe.fillRect(Bt,at,2,3)}wt+=Zt+(xt()<.3?xt()*20:1)}}),Tt=new er(pt);return Tt.wrapS=Ei,Tt.minFilter=dn,Tt.generateMipmaps=!1,Vi=new qe(new pi(560,560,120,64,1,!0).translate(0,58,0),new Xn({side:Fn,transparent:!0,depthWrite:!1,fog:!1,uniforms:{uMap:{value:Tt},uHill:{value:new $e(.5,.56,.62)},uCity:{value:new $e(.36,.4,.48)},uHor:{value:new $e(.7,.75,.8)},uNight:{value:0}},vertexShader:"varying vec2 vU; varying float vY; void main(){ vU = uv; vY = position.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform sampler2D uMap; uniform vec3 uHill, uCity, uHor; uniform float uNight; varying vec2 vU; varying float vY; void main(){ vec4 t = texture2D(uMap, vec2(vU.x * 2.0, vU.y)); float a = max(t.r, t.g); if (a < 0.02) discard;vec3 c = mix(uHill, uCity, t.g); float haze = smoothstep(60.0, -2.0, vY); c = mix(c, uHor, 0.35 + 0.3 * haze); c += vec3(1.0, 0.82, 0.5) * t.b * uNight * 0.9; gl_FragColor = vec4(c, a); }"})),Vi.renderOrder=-1,Vi.frustumCulled=!1,x.add(Vi),x}let Rs=new Map;i.world=function(x,M,S){x=Mn(Math.floor(x)||1,1,5);let _=x+M+S,T=Rs.get(_);if(T)return T;let B=new Gn,F=zt(),g=Vt(s.hash("std:"+_)>>>0),q=[],K=[];B.add(or()),un||(un=Pc()),B.add(un);let $=new jt({map:no(),roughness:.94,metalness:0,envMapIntensity:.18}),Se=new qe(new vi(120,84),$);Se.rotation.x=-Math.PI/2,Se.receiveShadow=!0,B.add(Se);let de=[1,1,2,2,3][x-1],V=!0,le=!0,xe=7,It=["#26334d","#33415f"],He=(Oe,tt,nt,Ht,Wt)=>{for(let fn=0;fn<de;fn++){for(let Ar=0;Ar<xe;Ar++){let ga=nt+fn*(xe*.95+2.5)+Ar*.95,ro=.6+fn*(xe*.55+2.2)+Ar*.55,ao=Oe+ga*.4;tt==="x"?F.box(ao,.55,.95,It[Ar%2],0,ro-.27,Wt*ga):F.box(.95,.55,ao,It[Ar%2],Ht*ga,ro-.27,0);for(let oo=-ao/2+.5;oo<ao/2-.4;oo+=.72)q.push(tt==="x"?[oo,ro+.05,Wt*ga]:[Ht*ga,ro+.05,oo])}let _i=nt+fn*(xe*.95+2.5),ls=fn*(xe*.55+2.2),so=Oe+_i*.4,fr=ls+.6;tt==="x"?F.box(so,fr,.4,"#2a3550",0,fr/2,Wt*(_i-.65)):F.box(.4,fr,so,"#2a3550",Ht*(_i-.65),fr/2,0);let qi=_i+xe*.95+.4,ui=ls+.6+xe*.55+(fn<de-1?2.2:1.6),dr=Oe+qi*.4;fn===de-1?tt==="x"?(F.box(dr,ui,.8,"#3a4662",0,ui/2,Wt*qi),F.box(dr,.5,.9,Wt>0?"#22d3ee":"#a855f7",0,ui-.4,Wt*(qi-.05))):(F.box(.8,ui,dr,"#3a4662",Ht*qi,ui/2,0),F.box(.9,.5,dr,"#ff2d95",Ht*(qi-.05),ui-.4,0)):tt==="x"?F.box(dr,.5,2.5,"#2a3550",0,ui-1.9,Wt*(qi+.6)):F.box(2.5,.5,dr,"#2a3550",Ht*(qi+.6),ui-1.9,0)}};He(112,"x",42,0,1),He(112,"x",42,0,-1),V&&(He(80,"z",61,1,0),He(80,"z",61,-1,0));let lt=de*(xe*.55+2.2)+1.5,Te=42+de*(xe*.95+2.5);le&&[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([Oe,tt])=>{for(let nt=0;nt<de*3;nt++)F.box(9,lt*(nt+1)/(de*3),9,nt%2?"#323e5a":"#2a3550",Oe*(60+nt*2.4),lt*(nt+1)/(de*6),tt*(42+nt*2.4))});let pt=[],Tt=(Oe,tt,nt)=>{let Ht=zt();Oe(Ht);let Wt=new qe(Ht.geo(),new Ci({vertexColors:!0}));Wt.userData.side=tt,Wt.userData.axis=nt,B.add(Wt),pt.push(Wt)};x>=3&&[-1,1].forEach(Oe=>Tt(tt=>{let nt=Te-40+2,Ht=lt+3.2;tt.box(140,.5,nt,"#0b1122",0,Ht,Oe*(40+nt/2)),tt.box(140,.25,.5,Oe>0?"#22d3ee":"#ff2d95",0,Ht-.35,Oe*41);for(let Wt=-3;Wt<=3;Wt++)tt.box(.6,Ht,.6,"#334155",Wt*20,Ht/2,Oe*(Te+1.2))},Oe,"z")),x>=5&&[-1,1].forEach(Oe=>Tt(tt=>{let nt=Te-58+2,Ht=lt+3.2;tt.box(nt,.5,100,"#0b1122",Oe*(58+nt/2),Ht,0)},Oe,"x"));let Xe=x>=3?34:22;[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([Oe,tt])=>{F.box(.8,Xe,.8,"#475569",Oe*64,Xe/2,tt*(Te+2)),K.push([Oe*64,Xe+1.5,tt*(Te+2)])});let xt=new qe(F.geo(),new Ci({vertexColors:!0}));xt.receiveShadow=!1,B.add(xt),xt.userData.st=1;let wt=new An({color:16776168,toneMapped:!1}),Zt=new Ga({map:io(),blending:Qo,depthWrite:!1,fog:!1,transparent:!0}),ye=[];for(let Oe of K){let tt=new qe(new pn(5,3,.6),wt);tt.position.set(Oe[0],Oe[1],Oe[2]),tt.lookAt(0,0,0),B.add(tt);let nt=new lc(Zt.clone());nt.position.set(Oe[0],Oe[1],Oe[2]),nt.scale.set(26,26,1),B.add(nt),ye.push(nt)}if(x>=4){let Oe=new qe(new pn(18,8,.5),new An({map:la(M,S),toneMapped:!1}));Oe.position.set(0,lt+6,-Te-1),B.add(Oe)}let pe=[.35,.5,.65,.8,.95][x-1],at=Math.min(q.length*pe,n.crowd),Bt=at/Math.max(1,q.length),Gt=Oe=>V?Oe[0]>58:Oe[2]<-40&&Oe[0]>24,Sn=q.filter(Oe=>Oe[2]<-40&&!Gt(Oe)).length,In=Math.max(Bt,Math.min(.85,at*.55/Math.max(1,Sn))),ln=q.filter(Oe=>g()<(Oe[2]<-40&&!Gt(Oe)?In:Bt)),gi=ha(),ce=gi.userData.u,Be=Math.max(1,ln.length),Ye=new Ai(On(),gi,Be),kt=new ft,Xt=new Ve,Yt=["#facc15","#22d3ee","#a855f7","#ff2d95","#0f172a","#f97316","#e2e8f0"],En=new Float32Array(Be),_n=new Float32Array(Be),si=new Float32Array(Be*2),Jt=new Float32Array(Be*3),en=1e9,xn=-1e9,yt=1e9,_t=-1e9;ln.forEach(Oe=>{Oe[2]<-40&&!Gt(Oe)&&(en=Math.min(en,Oe[0]),xn=Math.max(xn,Oe[0]),yt=Math.min(yt,Oe[1]),_t=Math.max(_t,Oe[1]))}),ln.forEach((Oe,tt)=>{kt.makeRotationY(Oe[2]>40?Math.PI:Oe[2]<-40?0:Oe[0]>0?-Math.PI/2:Math.PI/2),kt.setPosition(Oe[0],Oe[1],Oe[2]),Ye.setMatrixAt(tt,kt);let nt=Gt(Oe),Ht=g();Xt.set(nt?Ht<.68?S:Ht<.82?"#ffffff":Yt[Math.floor(g()*7)]:Ht<.5?M:Ht<.64?"#ffffff":Ht<.76?"#1e293b":Yt[Math.floor(g()*7)]),Ye.setColorAt(tt,Xt),En[tt]=g(),_n[tt]=nt?1:0;let Wt=new Ve(nt?S:g()<.6?M:"#ffffff");Jt.set([Wt.r,Wt.g,Wt.b],tt*3),Oe[2]<-40&&!nt&&xn>en?si.set([(Oe[0]-en)/(xn-en),(Oe[1]-yt)/Math.max(.1,_t-yt)],tt*2):si.set([-1,-1],tt*2)});let dt=Ye.geometry=Ye.geometry.clone();dt.setAttribute("aSeed",new Mi(En,1)),dt.setAttribute("aSide",new Mi(_n,1)),dt.setAttribute("aUV",new Mi(si,2)),dt.setAttribute("aCol2",new Mi(Jt,3)),Ye.count=ln.length,Ye.frustumCulled=!1,B.add(Ye);let yn=Lc(Ye,ce,M,S);yn&&(B.add(yn),B.userData.fanRT=yn.userData.rt);let li=zd(B),Tn=la(M,S);Tn.repeat.set(6,1);let hi=new An({map:Tn,toneMapped:!1});[[112,.9,.2,0,38.5],[112,.9,.2,0,-40.4]].forEach(([Oe,tt,nt,Ht,Wt])=>{let fn=new qe(new pn(Oe,tt,nt),hi);fn.position.set(Ht,tt/2,Wt),B.add(fn)});let Ti=la(S,M);Ti.repeat.set(4,1);let Xd=new An({map:Ti,toneMapped:!1});[-57,57].forEach(Oe=>[-1,1].forEach(tt=>{let nt=new qe(new pn(.2,.9,30),Xd);nt.position.set(Oe,.45,tt*19),B.add(nt)}));let Zh=[],$h=[],eu=new jt({color:16317180,roughness:.35,envMapIntensity:.6}),Yd=ar(),Jd=new An({map:Yd,transparent:!0,opacity:.55,side:Rn,depthWrite:!1,alphaTest:.05}),Uc=(Oe,tt,nt)=>{let Ht=new vi(Oe,tt),Wt=Ht.attributes.uv;for(let fn=0;fn<Wt.count;fn++)Wt.setXY(fn,Wt.getX(fn)*Oe/.14,Wt.getY(fn)*tt/.14);return new qe(Ht,Jd)};if([-1,1].forEach(Oe=>{let tt=Oe*52.5,nt=(fn,_i,ls,so,fr,qi)=>{let ui=new qe(new pi(.06,.06,fn,10),eu);ui.position.set(_i,ls,so),ui.rotation.set(fr||0,0,qi||0),ui.castShadow=!0,B.add(ui)};nt(2.44,tt,1.22,3.66),nt(2.44,tt,1.22,-3.66),nt(7.44,tt,2.44,0,Math.PI/2),nt(2.44,tt+Oe*2.2,1.22,3.66),nt(2.44,tt+Oe*2.2,1.22,-3.66),nt(7.44,tt+Oe*2.2,2.44,0,Math.PI/2),nt(2.2,tt+Oe*1.1,2.44,3.66,0,Math.PI/2),nt(2.2,tt+Oe*1.1,2.44,-3.66,0,Math.PI/2);let Ht=Uc(7.32,2.44);Ht.rotation.y=Math.PI/2,Ht.position.set(tt+Oe*2.2,1.22,0),B.add(Ht),Zh.push([Ht,tt+Oe*2.2,Oe]);let Wt=Uc(2.2,7.32);Wt.rotation.x=-Math.PI/2,Wt.position.set(tt+Oe*1.1,2.44,0),B.add(Wt),[-1,1].forEach(fn=>{let _i=Uc(2.2,2.44);_i.position.set(tt+Oe*1.1,1.22,fn*3.66),B.add(_i)}),[-34,34].forEach(fn=>{let _i=new qe(new pi(.03,.03,1.5,6),eu);_i.position.set(tt,.75,fn),B.add(_i);let ls=new qe(new vi(.4,.28).translate(.2,0,0),new An({color:16723349,side:Rn}));ls.position.set(tt,1.36,fn),B.add(ls),$h.push(ls)})}),T={_b3:1,grp:B,crowd:Ye,cu:ce,lv:x,top:lt,far:Te,key:_,roofs:pt,lights:K,glows:ye,pitchM:$,nets:Zh,flags:$h,dug:li,stM:xt},B.visible=!1,c.add(B),Rs.set(_,T),Rs.size>2){let[Oe,tt]=Rs.entries().next().value;Rs.delete(Oe),c.remove(tt.grp),tt.grp.userData.fanRT&&tt.grp.userData.fanRT.dispose(),tt.grp.traverse(nt=>{nt===Nt||nt===un||nt===Se||nt===tt.crowd||nt.parent&&nt.parent.userData&&nt.parent.userData.keep||(nt.geometry&&nt!==Nt&&nt!==un&&nt.geometry.dispose(),nt.material&&nt.material.map&&nt.material.map!==Pn&&nt.material.map.dispose())})}return T},i.drawWorld=function(x,M){if(!x||!x._b3)return;y.add(x.grp);for(let B of x.roofs){let F=B.userData.axis==="z"?l.position.z:l.position.x;B.visible=!(F*B.userData.side>30&&l.position.y>6)}Nt&&Nt.parent!==x.grp&&x.grp.add(Nt),un&&un.parent!==x.grp&&x.grp.add(un),i._world=x,Fd(x,M);let S=Wn,_=d.now/1e3,T=v.wind;if(x.flags.forEach((B,F)=>{B.rotation.y=(S&&S.wx&&S.wx.dx<0?Math.PI:0)+Math.sin(_*(4+T*6)+F)*(.15+T*.5),B.scale.y=1-T*.25*Math.abs(Math.sin(_*9+F))}),x.nets.forEach(([B,F,g],q)=>{B.position.x=F+g*T*.12*(.6+.4*Math.sin(_*2.4+q))}),S&&S.mg&&Hd(x),S&&S.smoke&&e!=="low"){let B=Nd(),F=(Date.now()-S.smoke.t)/1e3;F<10&&(y.add(B),B.material.uniforms.uT.value=F,B.material.uniforms.uEnd.value=S.smoke.end)}S&&S.plinth&&(i._pl||(i._pl=new qe(new pi(.3,.42,1,24),new jt({color:724772,roughness:.3,metalness:.5})),i._pl.position.set(0,.5,0),i._pl.castShadow=!0,c.add(i._pl)),y.add(i._pl),i.ball(0,0,1/1.6,_*.6))};let Wn=null,v={up:0,gold:0,ov:0,wet:0,snow:0,fog:0,wind:0,flash:0,nf:6,init:0,dir:new $e(.35,1,.45).normalize(),exp:1.08,hemi:.75,fogK:1,glow:1,t:0},X={clear:0,cloudy:.55,rain:.78,storm:.95,fog:.72,snow:.7},se=()=>{try{return s.atmo?s.atmo():null}catch{return null}},ie=(x,M,S)=>[x[0]+(M[0]-x[0])*S,x[1]+(M[1]-x[1])*S,x[2]+(M[2]-x[2])*S],te={night:[[.012,.016,.05],[.06,.03,.16],[.24,.1,.32]],day:[[.17,.4,.8],[.42,.63,.9],[.8,.87,.95]],gold:[[.2,.25,.52],[.8,.46,.42],[1,.6,.3]],ovD:[[.46,.5,.55],[.56,.6,.64],[.68,.71,.74]],ovN:[[.025,.028,.04],[.05,.052,.07],[.11,.11,.14]]};function Ke(x,M){let S=Wn,_=S&&S.tod!=null?(S.tod%24+24)%24:21,T=S&&S.wx,B=T?T.k:"clear",F=At(5.8,7.4,_)*(1-At(18,19.6,_)),g=F*Math.max(At(15.6,17.8,_),1-At(6.8,8.6,_)),q={up:F,gold:g,ov:X[B]||0,wet:B==="rain"?1:B==="storm"?2:0,snow:B==="snow"?1:0,fog:B==="fog"?1:0,wind:T?Mn((T.w-3)/9,0,1):0},K=S&&S.key||"";K!==v.key&&(v.key=K,v.init=0);let $=v.init?Math.min(1,x*1.2):1;v.init=1;for(let pt in q)v[pt]+=(q[pt]-v[pt])*$;v.t+=x;let Se=Mn((_-6)/13,0,1)*Math.PI,de=new $e(-Math.cos(Se)*.9,.14+.95*Math.max(0,Math.sin(Se)),.55).normalize(),V=new $e(.35,1,.45).normalize();v.dir.copy(V).lerp(de,v.up).normalize();let le=ie(ie([1,.96,.9],[1,.97,.92],v.up),[1,.66,.4],v.gold);u.color.setRGB(le[0],le[1],le[2]),u.intensity=(2.45+.6*v.up-.3*v.gold)*(1-.55*v.ov*v.up)*(1-.15*v.ov*(1-v.up)),B==="storm"&&M&&(v.nf-=x,v.nf<=0&&(v.flash=1,v.nf=6+Math.random()*10)),v.flash=Math.max(0,v.flash-x*5),v.hemi=.75+.3*v.up+.25*v.ov*v.up+v.flash*2.2,h.color.setRGB(.78+.1*v.up,.85+.05*v.up,1),h.groundColor.setRGB(.13,.23+.06*v.up,.14),v.exp=1.08-.06*v.up+.05*v.ov*v.up,v.fogK=1+3.6*v.fog+.7*Math.min(1,v.wet)+.5*Math.max(0,v.wet-1)+.9*v.snow,v.glow=Mn(1-v.up+v.gold*.7+v.ov*.45,0,1);let xe=te,It=[0,1,2].map(pt=>ie(ie(xe.night[pt],xe.day[pt],v.up),xe.gold[pt],v.gold*(1-v.ov*.7))),He=[0,1,2].map(pt=>ie(xe.ovN[pt],xe.ovD[pt],v.up)),lt=[0,1,2].map(pt=>ie(It[pt],He[pt],v.ov*.85));v.snow>.01&&(lt[2]=ie(lt[2],[.85,.87,.9],v.snow*v.up*.4));let Te=Nt&&Nt.material.uniforms;Te&&(Te.uTop.value.fromArray(lt[0]),Te.uMid.value.fromArray(lt[1]),Te.uHor.value.fromArray(lt[2]),Te.uStars.value=(1-v.up)*(1-v.ov),Te.uCloud.value=Mn(v.ov+.12*v.up*(1-v.ov),0,1),Te.uSun.value.copy(de),Te.uSunC.value.setRGB(le[0]*v.up,le[1]*v.up,le[2]*v.up),Te.uT.value=v.t,Te.uFlash.value=v.flash*.35);{let pt=.62+.3*v.up;c.fog.color.setRGB(lt[2][0]*pt,lt[2][1]*pt,lt[2][2]*pt)}if(Vi){let pt=Vi.material.uniforms,Tt=.35+.5*v.up;pt.uHor.value.set(lt[2][0],lt[2][1],lt[2][2]),pt.uHill.value.set(lt[2][0]*.62*Tt+.03,lt[2][1]*.7*Tt+.04,lt[2][2]*.72*Tt+.05),pt.uCity.value.set(lt[1][0]*.4*Tt+.03,lt[1][1]*.42*Tt+.03,lt[1][2]*.5*Tt+.05),pt.uNight.value=(1-v.up)*(1-v.fog*.7)}if(i._world){let pt=i._world;for(let Tt of pt.glows||[])Tt.material.opacity=v.glow;if(pt.pitchM){let Tt=Math.min(1,v.wet),Xe=pt.pitchM;Xe.roughness=.94-.55*Tt-.1*v.snow,Xe.envMapIntensity=.18+.6*Tt;let xt=v.snow;Xe.color.setRGB(1-.18*Tt+.3*xt,1-.18*Tt+.3*xt,1-.16*Tt+.38*xt),Xe.emissive.setRGB(.42*xt,.45*xt,.5*xt)}if(pt.stM){let Tt=1+1.1*v.up*(1-.45*v.ov);pt.stM.material.color.setRGB(Tt,Tt,Tt*1.04)}}}let Ze=null,rt=null,ut=null,St={high:[5200,2600,700],mid:[3e3,1600,420],low:[1100,700,160]}[e]||[3e3,1600,420];function vt(){if(Ze)return Ze;let x=St[0],M=new Float32Array(x*6),S=new Float32Array(x*2),_=Vt(991);for(let F=0;F<x;F++){let g=_()*46-23,q=_()*26,K=_()*46-23;M.set([g,q,K,g,q,K],F*6),S[F*2]=0,S[F*2+1]=1}let T=new nn;T.setAttribute("position",new Ft(M,3)),T.setAttribute("aEnd",new Ft(S,1));let B=new Xn({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new $e},uW:{value:new $e},uT:{value:0},uA:{value:.3},uL:{value:.7}},vertexShader:"attribute float aEnd; uniform vec3 uC, uW; uniform float uT, uL; void main(){ vec3 p = position; float sp = 12.0 + fract(p.x * 7.13 + p.z * 3.1) * 5.0; p.y = mod(p.y - uT * sp, 26.0); p.x = mod(p.x + uW.x * uT + 23.0, 46.0) - 23.0; p.z = mod(p.z + uW.z * uT + 23.0, 46.0) - 23.0; vec3 w = vec3(p.x + uC.x, p.y, p.z + uC.z); w -= normalize(vec3(-uW.x, sp, -uW.z)) * uL * aEnd; gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0); }",fragmentShader:"uniform float uA; void main(){ gl_FragColor = vec4(0.78, 0.83, 0.9, uA); }"});return Ze=new ea(T,B),Ze.frustumCulled=!1,Ze.renderOrder=5,c.add(Ze),Ze}function Ct(){if(rt)return rt;let x=St[1],M=new Float32Array(x*3),S=Vt(773);for(let B=0;B<x;B++)M.set([S()*46-23,S()*26,S()*46-23],B*3);let _=new nn;_.setAttribute("position",new Ft(M,3));let T=new Xn({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new $e},uW:{value:new $e},uT:{value:0},uS:{value:1}},vertexShader:"uniform vec3 uC, uW; uniform float uT, uS; varying float vA; void main(){ vec3 p = position; float f = fract(p.x * 3.7 + p.z * 1.3); p.y = mod(p.y - uT * (0.9 + f * 0.7), 26.0); p.x = mod(p.x + uW.x * uT * 0.6 + sin(uT * 1.1 + f * 30.0) * 0.7 + 23.0, 46.0) - 23.0; p.z = mod(p.z + uW.z * uT * 0.6 + cos(uT * 0.9 + f * 20.0) * 0.6 + 23.0, 46.0) - 23.0; vec4 mv = viewMatrix * vec4(p.x + uC.x, p.y, p.z + uC.z, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = min(9.0, uS * (2.0 + f * 2.5) * 26.0 / max(1.0, -mv.z)); vA = 0.9; }",fragmentShader:"varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.15, length(d)); gl_FragColor = vec4(1.0, 1.0, 1.0, a * vA); }"});return rt=new xs(_,T),rt.frustumCulled=!1,rt.renderOrder=5,c.add(rt),rt}function mn(){if(ut)return ut;let x=St[2],M=new Float32Array(x*3),S=Vt(551);for(let B=0;B<x;B++)M.set([S()*40-20,.03,S()*40-20],B*3);let _=new nn;_.setAttribute("position",new Ft(M,3));let T=new Xn({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new $e},uT:{value:0},uA:{value:.6}},vertexShader:"uniform vec3 uC; uniform float uT; varying float vL; void main(){ vec3 p = position; float f = fract(p.x * 5.1 + p.z * 2.3); float ph = fract(uT * 1.6 + f); vL = ph; vec4 mv = viewMatrix * vec4(p.x + uC.x, 0.03, p.z + uC.z, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = (1.5 + ph * 7.0) * 30.0 / max(1.0, -mv.z); }",fragmentShader:"uniform float uA; varying float vL; void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d); float a = smoothstep(0.5, 0.38, r) * smoothstep(0.2, 0.36, r) * (1.0 - vL) * step(vL, 0.35) * 2.8; gl_FragColor = vec4(0.85, 0.9, 0.95, a * uA); }"});return ut=new xs(_,T),ut.frustumCulled=!1,ut.renderOrder=5,c.add(ut),ut}function Yn(x){if(!x)return;let M=Wn&&Wn.wx;if(!M)return;let S=new $e;l.getWorldDirection(S),S.y=0,S.lengthSq()<1e-4&&S.set(0,0,-1),S.normalize();let _=l.position.x+S.x*14,T=l.position.z+S.z*14,B=new $e((M.dx||0)*(M.w||0)*.55,0,(M.dy||0)*(M.w||0)*.55);if(v.wet>.05){let F=vt(),g=F.material.uniforms;y.add(F),g.uC.value.set(_,0,T),g.uW.value.copy(B),g.uT.value=v.t,g.uA.value=.18+.16*Math.min(2,v.wet),g.uL.value=.55+.25*Math.min(2,v.wet);let q=mn(),K=q.material.uniforms;y.add(q),K.uC.value.set(_,0,T),K.uT.value=v.t,K.uA.value=.35*Math.min(2,v.wet)}if(v.snow>.05){let F=Ct(),g=F.material.uniforms;y.add(F),g.uC.value.set(_,0,T),g.uW.value.copy(B),g.uT.value=v.t,g.uS.value=1}}let $t=null,mi=30*4,on=()=>me(ne(64,64,x=>{let M=x.createRadialGradient(32,32,0,32,32,32);M.addColorStop(0,"rgba(0,0,0,0.9)"),M.addColorStop(1,"rgba(0,0,0,0)"),x.fillStyle=M,x.fillRect(0,0,64,64)}));function Dt(x){if(!x||e==="low"||v.glow<.35||!i._world||!i._world.lights)return;if(!$t){let g=new An({map:on(),transparent:!0,depthWrite:!1,opacity:.2,polygonOffset:!0,polygonOffsetFactor:-2});$t=new Ai(new vi(1,1).rotateX(-Math.PI/2),g,mi),$t.frustumCulled=!1,c.add($t)}let M=i._world.lights,S=new ft,_=new zi,T=new $e,B=new $e,F=0;for(let g of W){if(!y.has(g.root)||F+M.length>mi)continue;let q=g.root.position.x,K=g.root.position.z;for(let $ of M){let Se=q-$[0],de=K-$[2],V=Math.sqrt(Se*Se+de*de)||1;Se/=V,de/=V;let le=Mn(55/V,.9,2.6);S.compose(B.set(q+Se*le*.55,.02,K+de*le*.55),_.setFromAxisAngle(bt,Math.atan2(Se,de)),T.set(.55,1,le)),$t.setMatrixAt(F++,S)}}$t.count=F,$t.instanceMatrix.needsUpdate=!0,$t.material.opacity=.2*v.glow,y.add($t)}let Ds=new Map,cn={lg:[["#22d3ee","#a855f7"],["#ff2d95","#22d3ee"],["#a855f7","#facc15"],["#14b8a6","#ff2d95"]],oc:[["#facc15","#ff2d95"],["#f97316","#a855f7"],["#22d3ee","#facc15"],["#ff2d95","#14b8a6"]],cl:[["#0b1f4d","#c0c0c0"],["#1e1b4b","#facc15"],["#0f172a","#22d3ee"],["#312e81","#e2e8f0"]],fr:[["#0b0f24","#0b0f24"],["#0b0f24","#22d3ee"],["#0b0f24","#ff2d95"],["#0b0f24","#a855f7"]],final:[["#d4af37","#0b0f24"],["#d4af37","#ffffff"],["#d4af37","#a855f7"],["#d4af37","#22d3ee"]]};function Wi(x,M,S){let _=x+M+(S?"s":"");if(Ds.has(_))return Ds.get(_);let T=(cn[x]||cn.fr)[M%4],B=S?"#f97316":x==="cl"?T[0]:x==="final"?"#d4af37":"#f8fafc",F=me(ne(512,256,g=>{if(g.fillStyle=B,g.fillRect(0,0,512,256),x==="fr"||S)g.fillStyle=S?"#1e1b4b":T[0],[[64,40],[192,40],[320,40],[448,40],[0,128],[128,128],[256,128],[384,128],[512,128],[64,216],[192,216],[320,216],[448,216]].forEach(([q,K])=>{g.beginPath();for(let $=0;$<5;$++){let Se=-Math.PI/2+$*1.2566;g.lineTo(q+Math.cos(Se)*28,K+Math.sin(Se)*24)}g.fill()}),T[1]!==T[0]&&!S&&(g.fillStyle=T[1],g.fillRect(0,122,512,12));else if(x==="cl"){g.fillStyle=T[1];for(let q=0;q<9;q++){let K=q%3*170+85+Math.floor(q/3)%2*40,$=Math.floor(q/3)*85+42;g.beginPath();for(let Se=0;Se<10;Se++){let de=Se%2?12:30,V=-Math.PI/2+Se*Math.PI/5;g.lineTo(K+Math.cos(V)*de,$+Math.sin(V)*de)}g.fill()}}else{let q=g.createLinearGradient(0,0,512,0);q.addColorStop(0,T[0]),q.addColorStop(1,T[1]),g.fillStyle=q;for(let K=0;K<6;K++){g.beginPath();let $=K*86+M%2*40;g.moveTo($,0),g.quadraticCurveTo($+70,128,$+10,256),g.lineTo($+34,256),g.quadraticCurveTo($+100,128,$+26,0),g.fill()}if(x==="final"){g.strokeStyle=T[1],g.lineWidth=4;for(let K=0;K<512;K+=64)g.beginPath(),g.moveTo(K,0),g.lineTo(K+32,256),g.stroke()}}g.strokeStyle="rgba(15,23,42,.35)",g.lineWidth=2;for(let q=0;q<512;q+=64)g.beginPath(),g.moveTo(q,0),g.lineTo(q+32,256),g.stroke()}));return Ds.set(_,F),F}let cr="";function Ps(){if(!Et)return;let x=Wn&&Wn.ball,M=x?x.kind:"fr",S=x&&x.d||0,_=!!(Wn&&Wn.wx&&Wn.wx.k==="snow"),T=M+S+_;T!==cr&&(cr=T,Et.material.map=Wi(M,S,_),Et.material.metalness=M==="final"&&!_?.55:0,Et.material.roughness=M==="final"&&!_?.25:.38,Et.material.needsUpdate=!0)}let lr=null,On=()=>lr||(lr=(()=>{let x=[],M=(S,_)=>{let T=(S.toNonIndexed,S),B=T.attributes.position.count;T.setAttribute("aPart",new Ft(new Float32Array(B).fill(_),1)),T.deleteAttribute("uv"),x.push(T)};return M(new pn(.34,.5,.26).translate(0,.25,.04),0),M(new pn(.42,.52,.25).translate(0,.76,0),1),M(new ys(.12,6,4).translate(0,1.16,.01),2),M(new pn(.11,.48,.12).translate(-.27,.74,0),3),M(new pn(.11,.48,.12).translate(.27,.74,0),4),M(new pn(.62,.17,.03).translate(0,1.5,.05),5),Za(x)})()),Ki=`
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
    #endif`;function ha(){let x=new Ci,M={uT:{value:0},uB:{value:0},uSt:{value:new Je},uAr:{value:new Je},uJp:{value:new Je},uHd:{value:new Je},uSc:{value:new Je},uWave:{value:new Je},uTifo:{value:0},uTifoTex:{value:null},uCards:{value:0}};return x.userData.u=M,x.onBeforeCompile=S=>{Object.assign(S.uniforms,M),S.vertexShader=`uniform float uT, uB, uTifo, uCards; uniform vec2 uSt, uAr, uJp, uHd, uSc, uWave; uniform sampler2D uTifoTex; attribute float aPart, aSeed, aSide; attribute vec2 aUV; attribute vec3 aCol2;
`+S.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
#ifdef USE_INSTANCING
`+Ki+`
#endif`)},x.customProgramCacheKey=()=>"w3dcrowd7",x}let kn=null;function ua(x,M){let S=t?8:16,_=t?4:8,T=S+_,B=t?48:e==="high"?80:64,F=B*2,g=4,q=new oi(T*B,g*F,{samples:t?0:4});q.texture.generateMipmaps=!1,q.texture.minFilter=dn;let K=new Es;K.add(new _c(16777215,1.1));let $=new Fi(16774374,1.9);$.position.set(.5,1.2,2),K.add($),K.environment=c.environment;let Se=new bs(-.5625,.5625,2.45,.2,-5,5);Se.position.set(0,0,2);let de=!!(C&&C.ok);de?ii||(ii=C.makeLoose()):kn||(kn=Y(),c.remove(kn.root),W.splice(W.indexOf(kn),1));let V=de?ii:kn;K.add(V.root);let le=Vt(s.hash("fans:"+x+M)>>>0),xe=Te=>Te[Math.floor(le()*Te.length)],It=[],He=["#1e293b","#334155","#f8fafc","#0b0f24","#475569","#a3a3a3","#1d4ed8","#15803d","#78350f"],lt={cc:a.getClearColor(new Ve),ca:a.getClearAlpha(),rt:a.getRenderTarget()};a.setClearColor(0,0);for(let Te=0;Te<T;Te++){let pt=Te>=S,Tt=pt?M:x,Xe=pt?x:M,xt=le()<.7,wt=s.kitN(xt?{c1:Tt,c2:le()<.5?"#f8fafc":Xe,pat:xe(["plain","plain","stripes","hoops","halves","sash"]),col:Xe,slv:Tt,sho:xe(He),soc:xe(He)}:(()=>{let pe=xe(He);return{c1:pe,c2:pe,pat:"plain",col:pe,slv:le()<.5?pe:xe(He),sho:xe(He),soc:xe(He)}})()),Zt={_b3:1,key:"fan"+Te+JSON.stringify(wt),K:wt,g:"#facc15",tex:me(ae(wt))};Zt.gtex=Zt.tex,It.push(Zt.tex);let ye="fan"+s.hash(x+M)%997+"x"+Te;if(de){V.fanWear=[le()<.35?1:0,1],V.fanTrou=xe(["#1e3a5f","#1e293b","#334155","#0b0f24","#3f3f46","#57534e"]),V.dk=null,C.dress(V,Zt,!1,ye,"",Ce(ye),"");for(let pe in V.lod)V.lod[pe].visible=pe==="match";V.hair.visible=!0,V.hairH&&(V.hairH.visible=!1),V.root.visible=!0}else{we(V,Zt,!1,ye,""),V.lo&&(V.lo.visible=!1),V.hi&&(V.hi.visible=!0),V.bodyU.uGear.value.y=1;for(let pe of V.cloth||[])pe.visible=pe.userData.layer!==2}for(let pe=0;pe<g;pe++){for(let[at,Bt]of V.mod)at.quaternion.copy(Bt);V.mod.clear();for(let at in V.act)V.act[at].setEffectiveWeight(at==="idle"?1:0);if(V.mixer.setTime(.4+Te*.37),V.root.position.set(0,0,0),V.root.rotation.set(0,(le()-.5)*.35,0),V.root.scale.setScalar(Dc*(V.hgt||1)),V.root.updateMatrixWorld(!0),V.FU.uExpr.value.set(pe===0?.3:0,pe===1||pe===3?1:0,pe===1?.6:0,pe===2?1:0),pe===1){let at=(le()-.5)*.3;re(V,"upperarm_l","lowerarm_l",Re(.45,1,.1+at),1),re(V,"lowerarm_l","hand_l",Re(.25,1,.15),1),re(V,"upperarm_r","lowerarm_r",Re(-.45,1,.1-at),1),re(V,"lowerarm_r","hand_r",Re(-.25,1,.15),1)}pe===2&&(re(V,"upperarm_l","lowerarm_l",Re(.75,.75,.15),1),re(V,"lowerarm_l","hand_l",Re(-.9,.35,-.1),1),re(V,"upperarm_r","lowerarm_r",Re(-.75,.75,.15),1),re(V,"lowerarm_r","hand_r",Re(.9,.35,-.1),1),Ne(V,"Head",Le,-.12)),pe===3&&(re(V,"upperarm_l","lowerarm_l",Re(.2,-.55,.8),1),re(V,"lowerarm_l","hand_l",Re(-.75,.35,.55),1),re(V,"upperarm_r","lowerarm_r",Re(-.2,-.55,.8),1),re(V,"lowerarm_r","hand_r",Re(.75,.35,.55),1)),V.root.updateMatrixWorld(!0),q.viewport.set(Te*B,pe*F,B,F),q.scissor.set(Te*B,pe*F,B,F),q.scissorTest=!0,a.setRenderTarget(q),a.clear(),a.render(K,Se)}}a.setRenderTarget(lt.rt),a.setClearColor(lt.cc,lt.ca),q.scissorTest=!1,K.remove(V.root);for(let[Te,pt]of V.mod)Te.quaternion.copy(pt);return V.mod.clear(),V.FU.uExpr.value.set(0,0,0,0),It.forEach(Te=>Te.dispose()),V.dk=null,{tex:q.texture,rt:q,nH:S,nA:_,N:T}}function Lc(x,M,S,_){let T;try{T=ua(S,_)}catch(K){return console.warn("3D fans",K),null}let B=new vi(.985,1.97).translate(0,.175+.985,0),F=new Ci({side:Rn,alphaTest:.5}),g=F.userData.u=Object.assign({},M,{uFan:{value:T.tex},uFanN:{value:new Q(T.nH,T.nA,T.N)}});F.onBeforeCompile=K=>{Object.assign(K.uniforms,g),K.vertexShader=`uniform float uT, uB, uTifo; uniform vec2 uSt, uAr, uJp, uHd, uSc, uWave; uniform vec3 uFanN; attribute float aSeed, aSide; attribute vec2 aUV; varying vec2 vFan;
`+K.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
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
        #endif`),K.fragmentShader=`uniform sampler2D uFan; varying vec2 vFan;
`+K.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ vec4 t = texture2D(uFan, vFan); if (t.a < 0.5) discard; diffuseColor.rgb = t.rgb / max(t.a, 0.5); }`)},F.customProgramCacheKey=()=>"w3dfans1";let q=new Ai(B,F,x.count);q.instanceMatrix.copy(x.instanceMatrix),q.count=x.count,q.frustumCulled=!1;for(let K of["aSeed","aSide","aUV"])B.setAttribute(K,x.geometry.attributes[K]);return M.uCards.value=1,q.userData.rt=T.rt,q}let fa=x=>{let M=ne(256,64,_=>{let T=_.createLinearGradient(0,0,256,64);T.addColorStop(0,x.c1),T.addColorStop(.5,x.c1),T.addColorStop(.5,x.c2),T.addColorStop(1,x.c2),_.fillStyle=T,_.fillRect(0,0,256,64),_.fillStyle="#ffffff";for(let B=0;B<12;B++)_.fillRect(B*22,0,6,6);_.font="900 40px Arial, Helvetica, sans-serif",_.textAlign="center",_.textBaseline="middle",_.lineWidth=6,_.strokeStyle="#0b0f24",_.strokeText(String(x.sh||"").slice(0,10),128,36),_.fillText(String(x.sh||"").slice(0,10),128,36)}),S=me(M);return S.minFilter=dn,S.generateMipmaps=!1,S},gn={st:[0,0],ar:[0,0],jp:[0,0],hd:[0,0],sc:[0,0],wave:0,wph:0,tifo:0,tkey:"",smoke:null};function Fd(x,M){let S=x.cu,_=Wn&&Wn.crowd||null,T=d.dt,B=Math.min(1,T*4.5);for(let F of["st","ar","jp","hd","sc"])for(let g=0;g<2;g++){let q=_&&_[F]?_[F][g]||0:F==="jp"?(M||0)*2:F==="st"?M>.05?1:.08:0;gn[F][g]+=(q-gn[F][g])*B}if(gn.wave+=((_&&_.wave||0)-gn.wave)*Math.min(1,T*1.5),gn.wph=(gn.wph+T*1.15)%(Math.PI*2),gn.tifo+=((_&&_.tifo?1:0)-gn.tifo)*Math.min(1,T*2.5),S.uSt.value.fromArray(gn.st),S.uAr.value.fromArray(gn.ar),S.uJp.value.fromArray(gn.jp),S.uHd.value.fromArray(gn.hd),S.uSc.value.fromArray(gn.sc),S.uWave.value.set(gn.wave,gn.wph),S.uTifo.value=gn.tifo>.5?1:0,S.uT.value=d.now/1e3,S.uB.value=0,_&&_.tifo){let F=JSON.stringify(_.tifo);F!==gn.tkey&&(gn.tkey=F,S.uTifoTex.value&&S.uTifoTex.value.dispose(),S.uTifoTex.value=fa(_.tifo))}S.uTifoTex.value||(S.uTifoTex.value=fa({c1:"#22d3ee",c2:"#a855f7",sh:""}))}let hr=null;function Nd(){if(hr)return hr;let x=e==="high"?260:160,M=new Float32Array(x*3),S=new Float32Array(x*3),_=Vt(4242),T=[[.13,.83,.93],[.66,.33,.97],[1,.18,.58]];for(let g=0;g<x;g++){let q=_()<.5?-1:1;M.set([q*(60+_()*4),1+_()*3,(_()-.5)*50],g*3),S.set(T[g%3],g*3)}let B=new nn;B.setAttribute("position",new Ft(M,3)),B.setAttribute("color",new Ft(S,3));let F=new Xn({transparent:!0,depthWrite:!1,uniforms:{uT:{value:0},uEnd:{value:0}},vertexShader:"attribute vec3 color; uniform float uT, uEnd; varying vec3 vC; varying float vA; void main(){ vec3 p = position; float f = fract(p.z * 0.37 + p.y * 1.7); float e = sign(p.x); float on = uEnd > 1.5 ? 1.0 : step(0.0, e * (uEnd - 0.5)); float life = clamp(uT / 9.0, 0.0, 1.0); float a = clamp(uT - f * 2.0, 0.0, 9.0);p.y += a * (1.3 + f); p.x -= e * a * 0.6; p.z += sin(a * 0.7 + f * 9.0) * 1.5; vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = (3.0 + a * 1.8) * 120.0 / max(1.0, -mv.z); vC = color; vA = on * smoothstep(0.0, 0.6, a) * (1.0 - life) * 0.45; }",fragmentShader:"varying vec3 vC; varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(vC, a * vA); }"});return hr=new xs(B,F),hr.frustumCulled=!1,c.add(hr),hr}let da=new Map,Kh=new Map,Ud=["shaved","buzz","crew","short","part","slick","quiff","curl","afro","dread","fade","top"],Od=["#0a0a0c","#24170f","#5a3a20","#a07a44","#c9a55a","#6b2f1a","#8a8f96","#d8dadd"];function qh(x,M){let S=x+JSON.stringify(M),_=da.get(S);return _||(_={...w("mgrface:"+(M.seed||x)),si:[0,2,4,5,7,9,11,12][M.sk||0],hair:Od[M.hc||0],st:Ud[M.hr||0],beard:[0,1,2,3,5][M.bd||0],build:[-.35,.1,.55][M.bu||0],h:1.8+((M.bu||0)===0?.02:0),arch:"balanced",sock:0,band:!1,wrist:0,sleeves:(M.fit|0)!==3,untuck:(M.fit|0)!==3,dance:!1,sad:1,cel:0,mgr:1,trou:(M.fit|0)===2?2:1,gl:M.gl||0,boot:(M.fit|0)===1?"#f8fafc":"#0b0f24",boot2:(M.fit|0)===1?"#94a3b8":"#111827",red:(M.ag||0)*.2},da.set(S,_),da.size>40&&da.delete(da.keys().next().value),_)}let kd=(x,M,S,_)=>ne(512,256,T=>{let B=(F,g)=>T.fillRect(F,0,g,256);if(T.fillStyle=x===1||x===3?S:M,B(0,512),x===0||x===2){if(T.fillStyle="#f8fafc",T.beginPath(),T.moveTo(100,0),T.lineTo(156,0),T.lineTo(128,120),T.fill(),x===0)T.fillStyle=S,T.beginPath(),T.moveTo(122,8),T.lineTo(134,8),T.lineTo(138,104),T.lineTo(128,116),T.lineTo(118,104),T.fill();else{T.fillStyle=S,T.fillRect(104,0,20,150),T.fillStyle=_;for(let F=0;F<150;F+=18)T.fillRect(104,F,20,6)}T.strokeStyle="rgba(0,0,0,.35)",T.lineWidth=5,T.beginPath(),T.moveTo(92,0),T.lineTo(124,130),T.moveTo(164,0),T.lineTo(132,130),T.stroke(),T.fillStyle="rgba(0,0,0,.45)",[150,190].forEach(F=>{T.beginPath(),T.arc(136,F,5,0,7),T.fill()}),T.fillStyle="rgba(0,0,0,.25)",T.fillRect(383,0,3,256)}else x===1?(T.fillStyle=_,T.fillRect(30,0,14,256),T.fillRect(212,0,14,256),T.fillRect(286,0,14,256),T.fillRect(468,0,14,256),T.fillStyle="#e2e8f0",T.fillRect(126,0,4,256)):(T.fillStyle=_,T.fillRect(118,0,20,70),T.fillStyle="#f8fafc",[20,42,62].forEach(F=>{T.beginPath(),T.arc(128,F,3,0,7),T.fill()}))});function Xh(x){let M=x.fit|0,S=x.c||"#0b1f4d",_=x.c1||"#22d3ee",T=x.c2||"#ffffff",B=[M,S,_,T].join(),F=Kh.get(B);if(F)return F;let g=M===1||M===3?_:S,q={c1:g,c2:T,pat:"plain",col:M===0?"#f8fafc":M===2?_:T,slv:g,sho:M===1&&_===S?"#0b0f24":S,soc:"#0b0f24"},K=me(kd(M,S,_,T));return F={_b3:1,key:"mgr"+B,K:q,g,tex:K,gtex:K},Kh.set(B,F),F}let Aa=null;function Yh(x,M){if(!Aa){let S=(()=>{let g=null;return j.traverse(q=>{q.isBone&&q.name==="Head"&&(g=q)}),g})();if(!S)return null;j.updateMatrixWorld(!0);let _=new ft().copy(S.matrixWorld).invert(),T=new $e(0,1.692,.104).applyMatrix4(_),B=new zi;S.getWorldQuaternion(B);let F=new $e;S.getWorldScale(F),Aa={pos:T,q:B.invert(),s:1/(F.x||1)}}if(!x.gls){let S=new Gn,_=new jt({color:724772,roughness:.35,metalness:.4}),T=new jt({color:1120295,roughness:.1,metalness:.6,transparent:!0,opacity:.85});[-1,1].forEach(F=>{let g=new qe(new qa(.019,.0035,6,14),_);g.position.set(F*.031,0,0),S.add(g);let q=new qe(new Wa(.018,12),T);q.position.set(F*.031,0,.001),q.userData.lens=1,S.add(q);let K=new qe(new pn(.003,.003,.085),_);K.position.set(F*.05,.002,-.044),S.add(K)});let B=new qe(new pn(.024,.003,.003),_);B.position.set(0,.004,0),S.add(B),x.mh&&C?(S.matrixAutoUpdate=!1,S.matrix.copy(C.glassAnchor(x))):(S.position.copy(Aa.pos),S.quaternion.copy(Aa.q),S.scale.setScalar(Aa.s)),x.bones.Head.add(S),x.gls=S}return x.gls.visible=M>0,x.gls.children.forEach(S=>{S.userData.lens&&(S.visible=M===2)}),x.gls}let Ni=null,Jh="";function Qd(x,M){let S=x+":"+M;return Ni||(Ni=new qe(new pn(.62,.36,.05),new An({toneMapped:!1})),c.add(Ni)),S!==Jh&&(Jh=S,Ni.material.map&&Ni.material.map.dispose(),Ni.material.map=me(ne(256,150,_=>{_.fillStyle="#05060f",_.fillRect(0,0,256,150),_.font="900 70px Arial, Helvetica, sans-serif",_.textAlign="center",_.textBaseline="middle",_.fillStyle="#ff2d95",_.fillText(String(x),66,80),_.fillStyle="#22d3ee",_.fillText(String(M),190,80),_.font="900 18px Arial",_.fillStyle="#e2e8f0",_.fillText("OUT",66,22),_.fillText("IN",190,22)})),Ni.material.needsUpdate=!0),Ni}let ur=null;function Gd(){if(ur)return ur;let x=Za([new pn(.44,.08,.42).translate(0,.44,.12),new pn(.44,.5,.06).translate(0,.7,-.08)].map(M=>(M.deleteAttribute("uv"),M)));return ur=new Ai(x,new Ci,12),ur.frustumCulled=!1,c.add(ur),ur}let Fc=-36.4;function Hd(x){let M=Wn;if(!M||!M.mg||!x.dug)return;let S=d.now/1e3,_=new Ve,T=new ft,B=Gd(),F=0;for(let $=0;$<2;$++){let Se=M.mc&&M.mc[$]&&M.mc[$].c1||($?"#ff2d95":"#22d3ee");for(let de=0;de<6;de++)T.makeRotationY(0),T.setPosition(($?1:-1)*(10.6+(de-2.5)*.95),0,-38.05),B.setMatrixAt(F,T),_.set(Se),B.setColorAt(F++,_)}B.count=F,B.instanceMatrix.needsUpdate=!0,B.instanceColor&&(B.instanceColor.needsUpdate=!0),y.add(B);for(let $=0;$<2;$++){let Se=M.mg[$];if(!Se)continue;let de=Xh(Se),V="mgr"+$+":"+s.hash(JSON.stringify(Se)),le=M.ma&&M.ma[$]||{};Nc.set(V,qh(V,Se));let xe=($?1:-1)*7.6,It=le.k&&le.k!=="idle",He=xe+Math.sin(S*.33+$*2.1)*1.7;It&&(He=le.x!=null?le.x:He),le.x=He;let lt=Math.cos(S*.33+$*2.1)*1.7*.33,Te={num:"",run:It?0:.25,yaw:It?0:Math.abs(lt)>.28?lt>0?Math.PI/2:-Math.PI/2:0};le.k==="shout"?Te.yell=1:le.k==="cheer"?Te.cel="jump":le.k==="despair"?Te.hands=1:le.k==="argue"?(Te.yell=1,Te.yaw=$?-Math.PI/2:Math.PI/2):le.k==="clap"&&(Te.arms="up"),i.fig(de,!1,V,He,Fc,Te);let pt=z.get(V);pt&&pt.bones.Head&&Yh(pt,Se.gl||0)}let g=M.rc||"#111827",q=i.team({c1:g,c2:"#0b0f24",pat:"plain",col:"#0b0f24",slv:g,sho:"#0b0f24",soc:"#0b0f24"},g),K=M.sub;if(i.fig(q,!1,"off4",0,Fc-.3,{num:"",run:0,yaw:0,arms:K?"up":""}),K){let $=Qd(K.out,K.inn);y.add($),$.position.set(0,2.42,Fc-.18),$.rotation.set(0,0,0)}}let Nc=new Map;i.mgrFig=function(x,M,S,_){if(!P||!x)return;let T="mgrp:"+s.hash(JSON.stringify(x));Nc.set(T,qh(T,x)),i.fig(Xh(x),!1,T,M,S,Object.assign({num:"",run:0},_||{}));let B=z.get(T);B&&B.bones.Head&&Yh(B,x.gl||0)};function zd(x){let M=zt();[-1,1].forEach(T=>{let B=T*10.6;M.box(6.8,1.75,.12,"#0f172a",B,.88,-38.75),M.box(.1,1.75,1.1,"#0f172a",B-3.4,.88,-38.2),M.box(.1,1.75,1.1,"#0f172a",B+3.4,.88,-38.2),M.box(6.4,.42,.5,"#334155",B,.21,-38.4)});let S=new qe(M.geo(),new Ci({vertexColors:!0}));x.add(S);let _=new jt({color:10467273,transparent:!0,opacity:.3,roughness:.1,metalness:.2,depthWrite:!1});return[-1,1].forEach(T=>{let B=new qe(new pn(6.9,.06,1.25),_);B.position.set(T*10.6,1.78,-38.2),x.add(B)}),!0}let Jn=0,pa=0,Ls=0,Vd=Jn,jh=x=>{u.shadow.mapSize.set(x,x),u.shadow.map&&(u.shadow.map.dispose(),u.shadow.map=null)},Fs=!1,Wd=x=>{x>.022&&!Fs?(pa++,Ls=0):(pa=Math.max(0,pa-1),x<.019||Fs?Ls++:Ls=Math.max(0,Ls-3)),pa>=90?(pa=0,Ls=0,Jn<4?(Jn++,Jn===2&&jh(512),Jn>=3&&(u.castShadow=!1)):Fs=!0):Ls>=720&&(Ls=0,Fs?Fs=!1:Jn>Vd&&(Jn===3?u.castShadow=e!=="low":Jn===2&&jh(n.sh),Jn--))};i.cap30=()=>Fs,i.tier=e,i.q=()=>Jn;let jn={e:null,a:null,f:40,v:null},Kd=new Je;function qd(x,M){let S=Math.min(.1,(M-b)/1e3);b=M,d.dt=S,d.now=M,d.n++,d.n>30&&Wd(S);let _=x.step(S,M);if(!_)return;let T=o.clientWidth||300,B=o.clientHeight||200,F=Math.min(window.devicePixelRatio||1,Jn>=4?.75:Jn?Math.min(1,n.pr):n.pr);a.getPixelRatio()!==F&&a.setPixelRatio(F);let g=a.getSize(Kd);(g.x!==T||g.y!==B)&&a.setSize(T,B,!1);{let le=new $e(_.eye[0],_.eye[1],_.eye[2]),xe=new $e(_.at[0],_.at[1],_.at[2]),It=!jn.e||x!==jn.v||jn.e.distanceTo(le)>9||jn.a.distanceTo(xe)>12,He=It?1:1-Math.exp(-S*14);It?(jn.e=le.clone(),jn.a=xe.clone(),jn.f=_.fov||40,jn.v=x):(jn.e.lerp(le,He),jn.a.lerp(xe,He),jn.f+=((_.fov||40)-jn.f)*He),l.fov=jn.f,l.aspect=T/B,l.near=.1,l.position.copy(jn.e),l.lookAt(jn.a),l.updateProjectionMatrix()}y.clear(),i._world=null,Wn=se(),C&&C.frameStart(),x.draw(),C&&C.ok&&C.blobs();let q=!!i._world;Ke(S,q),Yn(q),Dt(q);for(let le of c.children)le!==h&&le!==u&&le!==u.target&&!le.isLight&&(le.visible=y.has(le));c.fog.density=q?(_.fog==null?.0026:_.fog*.75)*v.fogK:0,a.toneMappingExposure=q?v.exp:1.08,q||(u.color.setRGB(1,.95,.89),u.intensity=2.6),q?a.setClearColor(329231,1):_.bg?a.setClearColor(new Ve().setRGB(_.bg[0],_.bg[1],_.bg[2],Qt),0):a.setClearColor(461592,0),h.intensity=q?v.hemi:1;let K=new $e(_.at[0],0,_.at[2]),$=l.position.distanceTo(K),Se=Mn($*.75,5,48);q?u.position.copy(K).addScaledVector(v.dir,70):u.position.set(K.x+26,60,K.z+34),u.target.position.copy(K);let de=u.shadow.camera;de.left=-Se,de.right=Se,de.top=Se,de.bottom=-Se,de.updateProjectionMatrix();let V=Jn>=2?16:n.near;for(let le of W){if(!y.has(le.root))continue;if(le.mh){C.lod(le,Jn);continue}let xe=(le.dist||0)>V;if(le.hi&&(le.hi.visible=!xe),le.lo&&(le.lo.visible=xe),le.cloth){let It=!!(le.style&&le.style.mgr);for(let He of le.cloth)He.visible=!xe&&(He.userData.layer===3?It:!(It&&He.userData.layer===2))}}a.render(c,l)}i.run=function(x,M){if(!P||!x||!U()||A)return!1;if(M._err=0,o.parentNode!==x&&x.appendChild(o),!f){b=performance.now();let S=()=>{if(r.be!=="b3"){f=null;return}let _=performance.now(),T=r.view;if(!T||!document.body.contains(o)||T.alive&&!T.alive()){f=null,T&&T.end&&T.end(),r.view===T&&(r.view=null);return}if(Fs&&_-p<31){f=requestAnimationFrame(S);return}p=_;try{qd(T,_)}catch(B){(i._errs=i._errs||[]).push(String(B&&B.stack||B).slice(0,300)),T._err++||console.warn("3D",B),T._err>5&&(r.view=null,m++)}f=requestAnimationFrame(S)};f=requestAnimationFrame(S)}return!0},i.stop=function(){o&&o.parentNode&&o.parentNode.removeChild(o)};let ma=null;return i.portrait=function(x,M,S,_,T,B){if(!P||!x||!x._b3)return null;T=T||720,B=B||900;let F=document.createElement("canvas");F.width=T,F.height=B;let g;try{g=new jr({canvas:F,antialias:!0,alpha:!0,preserveDrawingBuffer:!0})}catch{return null}try{g.outputColorSpace=Qt,g.toneMapping=xc,g.toneMappingExposure=1.05,g.setClearColor(0,0);let q=new Es;try{let He=new Ys(g);q.environment=He.fromScene(new eo,.04).texture,He.dispose()}catch{}let K=new Fi(16773600,2.6);K.position.set(-1.2,2.6,2.2),q.add(K);let $=new Fi(10475775,2.2);$.position.set(1.6,2.2,-1.8),q.add($);let Se=new Fi(14202110,1.1);Se.position.set(-1.8,1.6,-1.5),q.add(Se),q.add(new Xa(13358591,1777459,.55));let de=C&&C.ok&&C.isPlayer(String(S));de?C.port||(C.port=C.getChar("__port"),C.port.port=!0,C.byId.delete("__port")):ma||(ma=Y(),c.remove(ma.root),W.splice(W.indexOf(ma),1));let V=de?C.port:ma;if(q.add(V.root),V.dk=null,de){V.root.visible=!0;let He="";try{He=String(s.nameOf(String(S))||"").toUpperCase().slice(0,16)}catch{}V.lk=Ce(String(S)),V.lkId=String(S),C.frameStart(),C.dist=0,V.dist=0,C.lod(V,0),C.dress(V,x,M,String(S),_,V.lk,He),C.frameStart(),C.dress(V,x,M,String(S),_,V.lk,He)}else we(V,x,M,String(S),_);V.lo&&(V.lo.visible=!1),V.hi&&(V.hi.visible=!0);for(let He of V.cloth||[])He.visible=He.userData.layer!==3;for(let[He,lt]of V.mod)He.quaternion.copy(lt);V.mod.clear();for(let He in V.act)V.act[He].setEffectiveWeight(He==="idle"?1:0);V.mixer.setTime(.9),V.root.position.set(0,0,0),V.root.rotation.set(0,-.32,0),V.root.scale.setScalar(Dc*(V.hgt||1)),V.root.updateMatrixWorld(!0),Ne(V,"Head",bt,.18),Ne(V,"neck_01",bt,.08),V.FU.uExpr.value.set(.35,.15,0,0),V.root.updateMatrixWorld(!0);let le=new $e;V.bones.Head.getWorldPosition(le);let xe=new bn(24,T/B,.05,20);xe.position.set(le.x-.05,le.y+.26,le.z+1.75),xe.lookAt(le.x+.02,le.y-.06,le.z),g.render(q,xe),g.render(q,xe);let It=F.toDataURL("image/png");q.remove(V.root),de&&c.add(V.root);for(let[He,lt]of V.mod)He.quaternion.copy(lt);return V.mod.clear(),V.FU.uExpr.value.set(0,0,0,0),V.dk=null,It}catch(q){return console.warn("3D portrait",q),null}finally{try{g.dispose(),g.forceContextLoss()}catch{}}},i.shoulders=()=>{let x=new $e,M=new $e,S=new $e,_=j;_.updateMatrixWorld(!0),_.getObjectByName("upperarm_l").getWorldPosition(x),_.getObjectByName("upperarm_r").getWorldPosition(M),_.getObjectByName("Head").getWorldPosition(S);let T=_.getObjectByName("root")||_,B=new $e;return T.getWorldPosition(B),{w:x.distanceTo(M),ratio:x.distanceTo(M)/(S.y-B.y)}},i.poseCheck=function(){let x=[],M=(S,_)=>{let T=new $e;return S.bones[_].getWorldPosition(T),T};for(let S of W){if(S.lastN<d.n-1||!S.bones.Head)continue;let _=new $e(1,0,0).applyQuaternion(S.root.quaternion);for(let T of["l","r"]){let B=M(S,"upperarm_"+T),F=M(S,"lowerarm_"+T),g=M(S,"hand_"+T),q=M(S,"thigh_"+T),K=M(S,"calf_"+T),$=M(S,"foot_"+T),Se=F.clone().sub(B).normalize(),de=g.clone().sub(F).normalize(),V=Math.acos(Mn(Se.dot(de),-1,1))*57.3,le=K.clone().sub(q).normalize(),xe=$.clone().sub(K).normalize(),It=Math.acos(Mn(le.dot(xe),-1,1))*57.3,He=new $e().crossVectors(le,xe).dot(_);V>160&&x.push([S.id,"elbow_"+T,Math.round(V)]),It>150&&x.push([S.id,"knee_"+T,Math.round(It)]),He<0&&It>12&&x.push([S.id,"knee_back_"+T,Math.round(It)])}}return x},i.dbg=()=>({looks:W.filter(x=>x.lastN>=d.n-1).map(x=>x.mh?[x.id,x.hstyle,"#"+x.hair.material.color.getHexString(),"mh",x.cur]:[x.id,x.hstyle,"#"+x.hairMat.color.getHexString(),x.bodyU.uHairS.value,x.bodyU.uBeard.value]),mh:C&&C.ok?C.stats():null,q:Jn,cam:l.position.toArray().map(x=>+x.toFixed(1)),p0:W.filter(x=>x.lastN>=d.n-1).slice(0,3).map(x=>[x.id,x.root.position.toArray().map(M=>+M.toFixed(1)),x.root.visible,x.mh?x.cur:x.hi&&x.hi.visible,x.lo&&x.lo.visible,+(x.dist||0).toFixed(1)]),chars:W.length,used:W.filter(x=>x.lastN>=d.n-1).length,n:d.n,world:!!i._world,errs:i._errs||[]}),i.info=()=>a?{calls:a.info.render.calls,tris:a.info.render.triangles,geos:a.info.memory.geometries,tex:a.info.memory.textures,progs:(a.info.programs||[]).length}:null,i.at=()=>({up:v.up,gold:v.gold,ov:v.ov,wet:v.wet,snow:v.snow,fog:v.fog,wind:v.wind,glow:v.glow,crowd:{st:gn.st.slice(),jp:gn.jp.slice(),ar:gn.ar.slice(),wave:gn.wave,tifo:gn.tifo},ball:cr,mgr:W.filter(x=>x.lastN>=d.n-1&&/^mgr/.test(x.id)).length,board:!!(Ni&&y.has(Ni)),atm:!!Wn}),i.ready=!1,Z}window.W3D={load:qb,version:4};
