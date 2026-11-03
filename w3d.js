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
var xl="160";var qf=0,mh=1,jf=2;var Ho=1,Yf=2,Gi=3,Ci=0,Cn=1,Rn=2;var ls=0,_r=1,lo=2,gh=3,bh=4,Kf=5,Is=100,Jf=101,Zf=102,_h=103,xh=104,Qf=200,$f=201,ed=202,td=203,Oc=204,Bc=205,nd=206,id=207,sd=208,rd=209,ad=210,od=211,cd=212,ld=213,hd=214,ud=0,fd=1,dd=2,ho=3,pd=4,md=5,gd=6,bd=7,vl=0,_d=1,xd=2,hs=0,vd=1,yd=2,Md=3,Go=4,Sd=5,wd=6,vh="attached",Ed="detached",$u=300,yr=301,Mr=302,kc=303,zc=304,Vo=306,qi=1e3,ti=1001,la=1002,yn=1003,uo=1004;var sa=1005;var Tn=1006,yl=1007;var fs=1008;var us=1009,Ad=1010,Td=1011,Ml=1012,ef=1013,os=1014,Wi=1015,ha=1016,tf=1017,nf=1018,Us=1020,Rd=1021,oi=1023,Cd=1024,Pd=1025,Fs=1026,Sr=1027,Ld=1028,sf=1029,Id=1030,rf=1031,af=1033,ic=33776,sc=33777,rc=33778,ac=33779,yh=35840,Mh=35841,Sh=35842,wh=35843,of=36196,Eh=37492,Ah=37496,Th=37808,Rh=37809,Ch=37810,Ph=37811,Lh=37812,Ih=37813,Dh=37814,Nh=37815,Uh=37816,Fh=37817,Oh=37818,Bh=37819,kh=37820,zh=37821,oc=36492,Hh=36494,Gh=36495,Dd=36283,Vh=36284,Wh=36285,Xh=36286,Nd=2200,Ud=2201,Fd=2202,wr=2300,Bs=2301,cc=2302,pr=2400,mr=2401,fo=2402,Sl=2500,Od=2501,cf=0,Wo=1,ya=2,lf=3e3,Os=3001,Bd=3200,kd=3201,wl=0,zd=1,ci="",Ht="srgb",Mn="srgb-linear",El="display-p3",Xo="display-p3-linear",po="linear",an="srgb",mo="rec709",go="p3";var js=7680;var qh=519,Hd=512,Gd=513,Vd=514,hf=515,Wd=516,Xd=517,qd=518,jd=519,Hc=35044;var jh="300 es",Gc=1035,Xi=2e3,bo=2001,ji=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yh=1234567,ra=Math.PI/180,Er=180/Math.PI;function xi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bn[s&255]+Bn[s>>8&255]+Bn[s>>16&255]+Bn[s>>24&255]+"-"+Bn[e&255]+Bn[e>>8&255]+"-"+Bn[e>>16&15|64]+Bn[e>>24&255]+"-"+Bn[t&63|128]+Bn[t>>8&255]+"-"+Bn[t>>16&255]+Bn[t>>24&255]+Bn[n&255]+Bn[n>>8&255]+Bn[n>>16&255]+Bn[n>>24&255]).toLowerCase()}function Ln(s,e,t){return Math.max(e,Math.min(t,s))}function Al(s,e){return(s%e+e)%e}function Yd(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Kd(s,e,t){return s!==e?(t-s)/(e-s):0}function aa(s,e,t){return(1-t)*s+t*e}function Jd(s,e,t,n){return aa(s,e,1-Math.exp(-t*n))}function Zd(s,e=1){return e-Math.abs(Al(s,e*2)-e)}function Qd(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function $d(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function ep(s,e){return s+Math.floor(Math.random()*(e-s+1))}function tp(s,e){return s+Math.random()*(e-s)}function np(s){return s*(.5-Math.random())}function ip(s){s!==void 0&&(Yh=s);let e=Yh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function sp(s){return s*ra}function rp(s){return s*Er}function Vc(s){return(s&s-1)===0&&s!==0}function ap(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function _o(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function op(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),f=a((e-n)/2),p=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*u,c*f,o*l);break;case"YZY":s.set(c*f,o*h,c*u,o*l);break;case"ZXZ":s.set(c*u,c*f,o*h,o*l);break;case"XZX":s.set(o*h,c*g,c*p,o*l);break;case"YXY":s.set(c*p,o*h,c*g,o*l);break;case"ZYZ":s.set(c*g,c*p,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ri(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Xt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var uf={DEG2RAD:ra,RAD2DEG:Er,generateUUID:xi,clamp:Ln,euclideanModulo:Al,mapLinear:Yd,inverseLerp:Kd,lerp:aa,damp:Jd,pingpong:Zd,smoothstep:Qd,smootherstep:$d,randInt:ep,randFloat:tp,randFloatSpread:np,seededRandom:ip,degToRad:sp,radToDeg:rp,isPowerOfTwo:Vc,ceilPowerOfTwo:ap,floorPowerOfTwo:_o,setQuaternionFromProperEuler:op,normalize:Xt,denormalize:Ri},He=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ln(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Et=class s{constructor(e,t,n,i,r,a,o,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],x=i[0],m=i[3],d=i[6],S=i[1],v=i[4],P=i[7],F=i[2],D=i[5],N=i[8];return r[0]=a*x+o*S+c*F,r[3]=a*m+o*v+c*D,r[6]=a*d+o*P+c*N,r[1]=l*x+h*S+u*F,r[4]=l*m+h*v+u*D,r[7]=l*d+h*P+u*N,r[2]=f*x+p*S+g*F,r[5]=f*m+p*v+g*D,r[8]=f*d+p*P+g*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,f=o*c-h*r,p=l*r-a*c,g=t*u+n*f+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(i*l-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=f*x,e[4]=(h*t-i*c)*x,e[5]=(i*r-o*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(lc.makeScale(e,t)),this}rotate(e){return this.premultiply(lc.makeRotation(-e)),this}translate(e,t){return this.premultiply(lc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},lc=new Et;function ff(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ua(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function cp(){let s=ua("canvas");return s.style.display="block",s}var Kh={};function oa(s){s in Kh||(Kh[s]=!0,console.warn(s))}var Jh=new Et().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Zh=new Et().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ia={[Mn]:{transfer:po,primaries:mo,toReference:s=>s,fromReference:s=>s},[Ht]:{transfer:an,primaries:mo,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Xo]:{transfer:po,primaries:go,toReference:s=>s.applyMatrix3(Zh),fromReference:s=>s.applyMatrix3(Jh)},[El]:{transfer:an,primaries:go,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Zh),fromReference:s=>s.applyMatrix3(Jh).convertLinearToSRGB()}},lp=new Set([Mn,Xo]),Ot={enabled:!0,_workingColorSpace:Mn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!lp.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=Ia[e].toReference,i=Ia[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Ia[s].primaries},getTransfer:function(s){return s===ci?po:Ia[s].transfer}};function xr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function hc(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Ys,xo=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ys===void 0&&(Ys=ua("canvas")),Ys.width=e.width,Ys.height=e.height;let n=Ys.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ys}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=ua("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=xr(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(xr(t[n]/255)*255):t[n]=xr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},hp=0,vo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hp++}),this.uuid=xi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(uc(i[a].image)):r.push(uc(i[a]))}else r=uc(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function uc(s){return typeof HTMLImageElement!="undefined"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&s instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&s instanceof ImageBitmap?xo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var up=0,In=class s extends ji{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=ti,i=ti,r=Tn,a=fs,o=oi,c=us,l=s.DEFAULT_ANISOTROPY,h=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=xi(),this.name="",this.source=new vo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(oa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Os?Ht:ci),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$u)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qi:e.x=e.x-Math.floor(e.x);break;case ti:e.x=e.x<0?0:1;break;case la:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qi:e.y=e.y-Math.floor(e.y);break;case ti:e.y=e.y<0?0:1;break;case la:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return oa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ht?Os:lf}set encoding(e){oa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Os?Ht:ci}};In.DEFAULT_IMAGE=null;In.DEFAULT_MAPPING=$u;In.DEFAULT_ANISOTROPY=1;var Ct=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],p=c[5],g=c[9],x=c[2],m=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,P=(p+1)/2,F=(d+1)/2,D=(h+f)/4,N=(u+x)/4,Y=(g+m)/4;return v>P&&v>F?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=D/n,r=N/n):P>F?P<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(P),n=D/i,r=Y/i):F<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(F),n=N/r,i=Y/r),this.set(n,i,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-x)/S,this.z=(f-h)/S,this.w=Math.acos((l+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Wc=class extends ji{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(oa("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Os?Ht:ci),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new In(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new vo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},vi=class extends Wc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},yo=class extends In{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=yn,this.minFilter=yn,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xc=class extends In{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=yn,this.minFilter=yn,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var zn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],f=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=x;return}if(u!==x||c!==f||l!==p||h!==g){let m=1-o,d=c*f+l*p+h*g+u*x,S=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){let F=Math.sqrt(v),D=Math.atan2(F,d*S);m=Math.sin(m*D)/F,o=Math.sin(o*D)/F}let P=o*S;if(c=c*m+f*P,l=l*m+p*P,h=h*m+g*P,u=u*m+x*P,m===1-o){let F=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=F,l*=F,h*=F,u*=F}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*p-l*f,e[t+1]=c*g+h*f+l*u-o*p,e[t+2]=l*g+h*p+o*f-c*u,e[t+3]=h*g-o*u-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(r/2),f=c(n/2),p=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"YZX":this._x=f*h*u+l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u-f*p*g;break;case"XZY":this._x=f*h*u-l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+o+u;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-i)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+l)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(r-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ln(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=i+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fc.copy(this).projectOnVector(e),this.sub(fc)}reflect(e){return this.sub(fc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ln(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},fc=new B,Qh=new zn,li=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(gi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(gi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=gi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,gi):gi.fromBufferAttribute(r,a),gi.applyMatrix4(e.matrixWorld),this.expandByPoint(gi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Da.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Da.copy(n.boundingBox)),Da.applyMatrix4(e.matrixWorld),this.union(Da)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,gi),gi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yr),Na.subVectors(this.max,Yr),Ks.subVectors(e.a,Yr),Js.subVectors(e.b,Yr),Zs.subVectors(e.c,Yr),ns.subVectors(Js,Ks),is.subVectors(Zs,Js),Ts.subVectors(Ks,Zs);let t=[0,-ns.z,ns.y,0,-is.z,is.y,0,-Ts.z,Ts.y,ns.z,0,-ns.x,is.z,0,-is.x,Ts.z,0,-Ts.x,-ns.y,ns.x,0,-is.y,is.x,0,-Ts.y,Ts.x,0];return!dc(t,Ks,Js,Zs,Na)||(t=[1,0,0,0,1,0,0,0,1],!dc(t,Ks,Js,Zs,Na))?!1:(Ua.crossVectors(ns,is),t=[Ua.x,Ua.y,Ua.z],dc(t,Ks,Js,Zs,Na))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Fi=[new B,new B,new B,new B,new B,new B,new B,new B],gi=new B,Da=new li,Ks=new B,Js=new B,Zs=new B,ns=new B,is=new B,Ts=new B,Yr=new B,Na=new B,Ua=new B,Rs=new B;function dc(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Rs.fromArray(s,r);let o=i.x*Math.abs(Rs.x)+i.y*Math.abs(Rs.y)+i.z*Math.abs(Rs.z),c=e.dot(Rs),l=t.dot(Rs),h=n.dot(Rs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var fp=new li,Kr=new B,pc=new B,Dn=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):fp.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Kr.subVectors(e,this.center);let t=Kr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Kr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Kr.copy(e.center).add(pc)),this.expandByPoint(Kr.copy(e.center).sub(pc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Oi=new B,mc=new B,Fa=new B,ss=new B,gc=new B,Oa=new B,bc=new B,Ar=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Oi.copy(this.origin).addScaledVector(this.direction,t),Oi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){mc.copy(e).add(t).multiplyScalar(.5),Fa.copy(t).sub(e).normalize(),ss.copy(this.origin).sub(mc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Fa),o=ss.dot(this.direction),c=-ss.dot(Fa),l=ss.lengthSq(),h=Math.abs(1-a*a),u,f,p,g;if(h>0)if(u=a*c-o,f=a*o-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let x=1/h;u*=x,f*=x,p=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(mc).addScaledVector(Fa,f),p}intersectSphere(e,t){Oi.subVectors(e.center,this.origin);let n=Oi.dot(this.direction),i=Oi.dot(Oi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Oi)!==null}intersectTriangle(e,t,n,i,r){gc.subVectors(t,e),Oa.subVectors(n,e),bc.crossVectors(gc,Oa);let a=this.direction.dot(bc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ss.subVectors(this.origin,e);let c=o*this.direction.dot(Oa.crossVectors(ss,Oa));if(c<0)return null;let l=o*this.direction.dot(gc.cross(ss));if(l<0||c+l>a)return null;let h=-o*ss.dot(bc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},dt=class s{constructor(e,t,n,i,r,a,o,c,l,h,u,f,p,g,x,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,u,f,p,g,x,m)}set(e,t,n,i,r,a,o,c,l,h,u,f,p,g,x,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=i,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Qs.setFromMatrixColumn(e,0).length(),r=1/Qs.setFromMatrixColumn(e,1).length(),a=1/Qs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=a*h,p=a*u,g=o*h,x=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=f-x*l,t[9]=-o*c,t[2]=x-f*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*h,p=c*u,g=l*h,x=l*u;t[0]=f+x*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=x+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*h,p=c*u,g=l*h,x=l*u;t[0]=f-x*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=x-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*h,p=a*u,g=o*h,x=o*u;t[0]=c*h,t[4]=g*l-p,t[8]=f*l+x,t[1]=c*u,t[5]=x*l+f,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,p=a*l,g=o*c,x=o*l;t[0]=c*h,t[4]=x-f*u,t[8]=g*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*u+g,t[10]=f-x*u}else if(e.order==="XZY"){let f=a*c,p=a*l,g=o*c,x=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+x,t[5]=a*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*h,t[10]=x*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dp,e,pp)}lookAt(e,t,n){let i=this.elements;return $n.subVectors(e,t),$n.lengthSq()===0&&($n.z=1),$n.normalize(),rs.crossVectors(n,$n),rs.lengthSq()===0&&(Math.abs(n.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),rs.crossVectors(n,$n)),rs.normalize(),Ba.crossVectors($n,rs),i[0]=rs.x,i[4]=Ba.x,i[8]=$n.x,i[1]=rs.y,i[5]=Ba.y,i[9]=$n.y,i[2]=rs.z,i[6]=Ba.z,i[10]=$n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],x=n[6],m=n[10],d=n[14],S=n[3],v=n[7],P=n[11],F=n[15],D=i[0],N=i[4],Y=i[8],A=i[12],I=i[1],W=i[5],ie=i[9],Me=i[13],z=i[2],X=i[6],ne=i[10],le=i[14],oe=i[3],re=i[7],ge=i[11],ve=i[15];return r[0]=a*D+o*I+c*z+l*oe,r[4]=a*N+o*W+c*X+l*re,r[8]=a*Y+o*ie+c*ne+l*ge,r[12]=a*A+o*Me+c*le+l*ve,r[1]=h*D+u*I+f*z+p*oe,r[5]=h*N+u*W+f*X+p*re,r[9]=h*Y+u*ie+f*ne+p*ge,r[13]=h*A+u*Me+f*le+p*ve,r[2]=g*D+x*I+m*z+d*oe,r[6]=g*N+x*W+m*X+d*re,r[10]=g*Y+x*ie+m*ne+d*ge,r[14]=g*A+x*Me+m*le+d*ve,r[3]=S*D+v*I+P*z+F*oe,r[7]=S*N+v*W+P*X+F*re,r[11]=S*Y+v*ie+P*ne+F*ge,r[15]=S*A+v*Me+P*le+F*ve,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],p=e[14],g=e[3],x=e[7],m=e[11],d=e[15];return g*(+r*c*u-i*l*u-r*o*f+n*l*f+i*o*p-n*c*p)+x*(+t*c*p-t*l*f+r*a*f-i*a*p+i*l*h-r*c*h)+m*(+t*l*u-t*o*p-r*a*u+n*a*p+r*o*h-n*l*h)+d*(-i*o*h-t*c*u+t*o*f+i*a*u-n*a*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],p=e[11],g=e[12],x=e[13],m=e[14],d=e[15],S=u*m*l-x*f*l+x*c*p-o*m*p-u*c*d+o*f*d,v=g*f*l-h*m*l-g*c*p+a*m*p+h*c*d-a*f*d,P=h*x*l-g*u*l+g*o*p-a*x*p-h*o*d+a*u*d,F=g*u*c-h*x*c-g*o*f+a*x*f+h*o*m-a*u*m,D=t*S+n*v+i*P+r*F;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/D;return e[0]=S*N,e[1]=(x*f*r-u*m*r-x*i*p+n*m*p+u*i*d-n*f*d)*N,e[2]=(o*m*r-x*c*r+x*i*l-n*m*l-o*i*d+n*c*d)*N,e[3]=(u*c*r-o*f*r-u*i*l+n*f*l+o*i*p-n*c*p)*N,e[4]=v*N,e[5]=(h*m*r-g*f*r+g*i*p-t*m*p-h*i*d+t*f*d)*N,e[6]=(g*c*r-a*m*r-g*i*l+t*m*l+a*i*d-t*c*d)*N,e[7]=(a*f*r-h*c*r+h*i*l-t*f*l-a*i*p+t*c*p)*N,e[8]=P*N,e[9]=(g*u*r-h*x*r-g*n*p+t*x*p+h*n*d-t*u*d)*N,e[10]=(a*x*r-g*o*r+g*n*l-t*x*l-a*n*d+t*o*d)*N,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*p-t*o*p)*N,e[12]=F*N,e[13]=(h*x*i-g*u*i+g*n*f-t*x*f-h*n*m+t*u*m)*N,e[14]=(g*o*i-a*x*i-g*n*c+t*x*c+a*n*m-t*o*m)*N,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*f+t*o*f)*N,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,f=r*l,p=r*h,g=r*u,x=a*h,m=a*u,d=o*u,S=c*l,v=c*h,P=c*u,F=n.x,D=n.y,N=n.z;return i[0]=(1-(x+d))*F,i[1]=(p+P)*F,i[2]=(g-v)*F,i[3]=0,i[4]=(p-P)*D,i[5]=(1-(f+d))*D,i[6]=(m+S)*D,i[7]=0,i[8]=(g+v)*N,i[9]=(m-S)*N,i[10]=(1-(f+x))*N,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Qs.set(i[0],i[1],i[2]).length(),a=Qs.set(i[4],i[5],i[6]).length(),o=Qs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],bi.copy(this);let l=1/r,h=1/a,u=1/o;return bi.elements[0]*=l,bi.elements[1]*=l,bi.elements[2]*=l,bi.elements[4]*=h,bi.elements[5]*=h,bi.elements[6]*=h,bi.elements[8]*=u,bi.elements[9]*=u,bi.elements[10]*=u,t.setFromRotationMatrix(bi),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=Xi){let c=this.elements,l=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),p,g;if(o===Xi)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===bo)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Xi){let c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(a-r),f=(t+e)*l,p=(n+i)*h,g,x;if(o===Xi)g=(a+r)*u,x=-2*u;else if(o===bo)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Qs=new B,bi=new dt,dp=new B(0,0,0),pp=new B(1,1,1),rs=new B,Ba=new B,$n=new B,$h=new dt,eu=new zn,Tr=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],f=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(Ln(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ln(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ln(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ln(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ln(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ln(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $h.makeRotationFromQuaternion(e),this.setFromRotationMatrix($h,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return eu.setFromEuler(this),this.setFromQuaternion(eu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Tr.DEFAULT_ORDER="XYZ";var Mo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},mp=0,tu=new B,$s=new zn,Bi=new dt,ka=new B,Jr=new B,gp=new B,bp=new zn,nu=new B(1,0,0),iu=new B(0,1,0),su=new B(0,0,1),_p={type:"added"},xp={type:"removed"},Jt=class s extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mp++}),this.uuid=xi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new B,t=new Tr,n=new zn,i=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new dt},normalMatrix:{value:new Et}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $s.setFromAxisAngle(e,t),this.quaternion.multiply($s),this}rotateOnWorldAxis(e,t){return $s.setFromAxisAngle(e,t),this.quaternion.premultiply($s),this}rotateX(e){return this.rotateOnAxis(nu,e)}rotateY(e){return this.rotateOnAxis(iu,e)}rotateZ(e){return this.rotateOnAxis(su,e)}translateOnAxis(e,t){return tu.copy(e).applyQuaternion(this.quaternion),this.position.add(tu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nu,e)}translateY(e){return this.translateOnAxis(iu,e)}translateZ(e){return this.translateOnAxis(su,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ka.copy(e):ka.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Jr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bi.lookAt(Jr,ka,this.up):Bi.lookAt(ka,Jr,this.up),this.quaternion.setFromRotationMatrix(Bi),i&&(Bi.extractRotation(i.matrixWorld),$s.setFromRotationMatrix(Bi),this.quaternion.premultiply($s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(_p)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xp)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jr,e,gp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jr,bp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,a=i.length;r<a;r++){let o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Jt.DEFAULT_UP=new B(0,1,0);Jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var _i=new B,ki=new B,_c=new B,zi=new B,er=new B,tr=new B,ru=new B,xc=new B,vc=new B,yc=new B,za=!1,Ns=class s{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),_i.subVectors(e,t),i.cross(_i);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){_i.subVectors(i,t),ki.subVectors(n,t),_c.subVectors(e,t);let a=_i.dot(_i),o=_i.dot(ki),c=_i.dot(_c),l=ki.dot(ki),h=ki.dot(_c),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,p=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,zi)===null?!1:zi.x>=0&&zi.y>=0&&zi.x+zi.y<=1}static getUV(e,t,n,i,r,a,o,c){return za===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),za=!0),this.getInterpolation(e,t,n,i,r,a,o,c)}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,zi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,zi.x),c.addScaledVector(a,zi.y),c.addScaledVector(o,zi.z),c)}static isFrontFacing(e,t,n,i){return _i.subVectors(n,t),ki.subVectors(e,t),_i.cross(ki).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _i.subVectors(this.c,this.b),ki.subVectors(this.a,this.b),_i.cross(ki).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return za===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),za=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;er.subVectors(i,n),tr.subVectors(r,n),xc.subVectors(e,n);let c=er.dot(xc),l=tr.dot(xc);if(c<=0&&l<=0)return t.copy(n);vc.subVectors(e,i);let h=er.dot(vc),u=tr.dot(vc);if(h>=0&&u<=h)return t.copy(i);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(er,a);yc.subVectors(e,r);let p=er.dot(yc),g=tr.dot(yc);if(g>=0&&p<=g)return t.copy(r);let x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(tr,o);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return ru.subVectors(r,i),o=(u-h)/(u-h+(p-g)),t.copy(i).addScaledVector(ru,o);let d=1/(m+x+f);return a=x*d,o=f*d,t.copy(n).addScaledVector(er,a).addScaledVector(tr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},df={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},as={h:0,s:0,l:0},Ha={h:0,s:0,l:0};function Mc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Ue=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ot.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ot.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ot.workingColorSpace){if(e=Al(e,1),t=Ln(t,0,1),n=Ln(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Mc(a,r,e+1/3),this.g=Mc(a,r,e),this.b=Mc(a,r,e-1/3)}return Ot.toWorkingColorSpace(this,i),this}setStyle(e,t=Ht){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){let n=df[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xr(e.r),this.g=xr(e.g),this.b=xr(e.b),this}copyLinearToSRGB(e){return this.r=hc(e.r),this.g=hc(e.g),this.b=hc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return Ot.fromWorkingColorSpace(kn.copy(this),e),Math.round(Ln(kn.r*255,0,255))*65536+Math.round(Ln(kn.g*255,0,255))*256+Math.round(Ln(kn.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ot.workingColorSpace){Ot.fromWorkingColorSpace(kn.copy(this),t);let n=kn.r,i=kn.g,r=kn.b,a=Math.max(n,i,r),o=Math.min(n,i,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ot.workingColorSpace){return Ot.fromWorkingColorSpace(kn.copy(this),t),e.r=kn.r,e.g=kn.g,e.b=kn.b,e}getStyle(e=Ht){Ot.fromWorkingColorSpace(kn.copy(this),e);let t=kn.r,n=kn.g,i=kn.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(as),this.setHSL(as.h+e,as.s+t,as.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(as),e.getHSL(Ha);let n=aa(as.h,Ha.h,t),i=aa(as.s,Ha.s,t),r=aa(as.l,Ha.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},kn=new Ue;Ue.NAMES=df;var vp=0,Xn=class extends ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=xi(),this.name="",this.type="Material",this.blending=_r,this.side=Ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oc,this.blendDst=Bc,this.blendEquation=Is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=ho,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=js,this.stencilZFail=js,this.stencilZPass=js,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_r&&(n.blending=this.blending),this.side!==Ci&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Oc&&(n.blendSrc=this.blendSrc),this.blendDst!==Bc&&(n.blendDst=this.blendDst),this.blendEquation!==Is&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ho&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==js&&(n.stencilFail=this.stencilFail),this.stencilZFail!==js&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==js&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},fn=class extends Xn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=vl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var gn=new B,Ga=new He,Pt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Hc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Wi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ga.fromBufferAttribute(this,t),Ga.applyMatrix3(e),this.setXY(t,Ga.x,Ga.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix3(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix4(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyNormalMatrix(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.transformDirection(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ri(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ri(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ri(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ri(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ri(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),i=Xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),i=Xt(i,this.array),r=Xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hc&&(e.usage=this.usage),e}};var Rr=class extends Pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var So=class extends Pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Lt=class extends Pt{constructor(e,t,n){super(new Float32Array(e),t,n)}};var yp=0,ai=new dt,Sc=new Jt,nr=new B,ei=new li,Zr=new li,An=new B,Zt=class s extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=xi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ff(e)?So:Rr)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Et().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ai.makeRotationFromQuaternion(e),this.applyMatrix4(ai),this}rotateX(e){return ai.makeRotationX(e),this.applyMatrix4(ai),this}rotateY(e){return ai.makeRotationY(e),this.applyMatrix4(ai),this}rotateZ(e){return ai.makeRotationZ(e),this.applyMatrix4(ai),this}translate(e,t,n){return ai.makeTranslation(e,t,n),this.applyMatrix4(ai),this}scale(e,t,n){return ai.makeScale(e,t,n),this.applyMatrix4(ai),this}lookAt(e){return Sc.lookAt(e),Sc.updateMatrix(),this.applyMatrix4(Sc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nr).negate(),this.translate(nr.x,nr.y,nr.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Lt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];ei.setFromBufferAttribute(r),this.morphTargetsRelative?(An.addVectors(this.boundingBox.min,ei.min),this.boundingBox.expandByPoint(An),An.addVectors(this.boundingBox.max,ei.max),this.boundingBox.expandByPoint(An)):(this.boundingBox.expandByPoint(ei.min),this.boundingBox.expandByPoint(ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Dn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(ei.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Zr.setFromBufferAttribute(o),this.morphTargetsRelative?(An.addVectors(ei.min,Zr.min),ei.expandByPoint(An),An.addVectors(ei.max,Zr.max),ei.expandByPoint(An)):(ei.expandByPoint(Zr.min),ei.expandByPoint(Zr.max))}ei.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)An.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(An));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)An.fromBufferAttribute(o,l),c&&(nr.fromBufferAttribute(e,l),An.add(nr)),i=Math.max(i,n.distanceToSquared(An))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pt(new Float32Array(4*o),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let I=0;I<o;I++)l[I]=new B,h[I]=new B;let u=new B,f=new B,p=new B,g=new He,x=new He,m=new He,d=new B,S=new B;function v(I,W,ie){u.fromArray(i,I*3),f.fromArray(i,W*3),p.fromArray(i,ie*3),g.fromArray(a,I*2),x.fromArray(a,W*2),m.fromArray(a,ie*2),f.sub(u),p.sub(u),x.sub(g),m.sub(g);let Me=1/(x.x*m.y-m.x*x.y);isFinite(Me)&&(d.copy(f).multiplyScalar(m.y).addScaledVector(p,-x.y).multiplyScalar(Me),S.copy(p).multiplyScalar(x.x).addScaledVector(f,-m.x).multiplyScalar(Me),l[I].add(d),l[W].add(d),l[ie].add(d),h[I].add(S),h[W].add(S),h[ie].add(S))}let P=this.groups;P.length===0&&(P=[{start:0,count:n.length}]);for(let I=0,W=P.length;I<W;++I){let ie=P[I],Me=ie.start,z=ie.count;for(let X=Me,ne=Me+z;X<ne;X+=3)v(n[X+0],n[X+1],n[X+2])}let F=new B,D=new B,N=new B,Y=new B;function A(I){N.fromArray(r,I*3),Y.copy(N);let W=l[I];F.copy(W),F.sub(N.multiplyScalar(N.dot(W))).normalize(),D.crossVectors(Y,W);let Me=D.dot(h[I])<0?-1:1;c[I*4]=F.x,c[I*4+1]=F.y,c[I*4+2]=F.z,c[I*4+3]=Me}for(let I=0,W=P.length;I<W;++I){let ie=P[I],Me=ie.start,z=ie.count;for(let X=Me,ne=Me+z;X<ne;X+=3)A(n[X+0]),A(n[X+1]),A(n[X+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let i=new B,r=new B,a=new B,o=new B,c=new B,l=new B,h=new B,u=new B;if(e)for(let f=0,p=e.count;f<p;f+=3){let g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)An.fromBufferAttribute(e,t),An.normalize(),e.setXYZ(t,An.x,An.y,An.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),p=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?p=c[x]*o.data.stride+o.offset:p=c[x]*h;for(let d=0;d<h;d++)f[g++]=l[p++]}return new Pt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],p=e(f,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},au=new dt,Cs=new Ar,Va=new Dn,ou=new B,ir=new B,sr=new B,rr=new B,wc=new B,Wa=new B,Xa=new He,qa=new He,ja=new He,cu=new B,lu=new B,hu=new B,Ya=new B,Ka=new B,ze=class extends Jt{constructor(e=new Zt,t=new fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){Wa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(wc.fromBufferAttribute(u,e),a?Wa.addScaledVector(wc,h):Wa.addScaledVector(wc.sub(t),h))}t.add(Wa)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Va.copy(n.boundingSphere),Va.applyMatrix4(r),Cs.copy(e.ray).recast(e.near),!(Va.containsPoint(Cs.origin)===!1&&(Cs.intersectSphere(Va,ou)===null||Cs.origin.distanceToSquared(ou)>(e.far-e.near)**2))&&(au.copy(r).invert(),Cs.copy(e.ray).applyMatrix4(au),!(n.boundingBox!==null&&Cs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Cs)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){let m=f[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let P=S,F=v;P<F;P+=3){let D=o.getX(P),N=o.getX(P+1),Y=o.getX(P+2);i=Ja(this,d,e,n,l,h,u,D,N,Y),i&&(i.faceIndex=Math.floor(P/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){let S=o.getX(m),v=o.getX(m+1),P=o.getX(m+2);i=Ja(this,a,e,n,l,h,u,S,v,P),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){let m=f[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let P=S,F=v;P<F;P+=3){let D=P,N=P+1,Y=P+2;i=Ja(this,d,e,n,l,h,u,D,N,Y),i&&(i.faceIndex=Math.floor(P/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){let S=m,v=m+1,P=m+2;i=Ja(this,a,e,n,l,h,u,S,v,P),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function Mp(s,e,t,n,i,r,a,o){let c;if(e.side===Cn?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===Ci,o),c===null)return null;Ka.copy(o),Ka.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Ka);return l<t.near||l>t.far?null:{distance:l,point:Ka.clone(),object:s}}function Ja(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,ir),s.getVertexPosition(c,sr),s.getVertexPosition(l,rr);let h=Mp(s,e,t,n,ir,sr,rr,Ya);if(h){i&&(Xa.fromBufferAttribute(i,o),qa.fromBufferAttribute(i,c),ja.fromBufferAttribute(i,l),h.uv=Ns.getInterpolation(Ya,ir,sr,rr,Xa,qa,ja,new He)),r&&(Xa.fromBufferAttribute(r,o),qa.fromBufferAttribute(r,c),ja.fromBufferAttribute(r,l),h.uv1=Ns.getInterpolation(Ya,ir,sr,rr,Xa,qa,ja,new He),h.uv2=h.uv1),a&&(cu.fromBufferAttribute(a,o),lu.fromBufferAttribute(a,c),hu.fromBufferAttribute(a,l),h.normal=Ns.getInterpolation(Ya,ir,sr,rr,cu,lu,hu,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new B,materialIndex:0};Ns.getNormal(ir,sr,rr,u.normal),h.face=u}return h}var ln=class s extends Zt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Lt(l,3)),this.setAttribute("normal",new Lt(h,3)),this.setAttribute("uv",new Lt(u,2));function g(x,m,d,S,v,P,F,D,N,Y,A){let I=P/N,W=F/Y,ie=P/2,Me=F/2,z=D/2,X=N+1,ne=Y+1,le=0,oe=0,re=new B;for(let ge=0;ge<ne;ge++){let ve=ge*W-Me;for(let Ie=0;Ie<X;Ie++){let $=Ie*I-ie;re[x]=$*S,re[m]=ve*v,re[d]=z,l.push(re.x,re.y,re.z),re[x]=0,re[m]=0,re[d]=D>0?1:-1,h.push(re.x,re.y,re.z),u.push(Ie/N),u.push(1-ge/Y),le+=1}}for(let ge=0;ge<Y;ge++)for(let ve=0;ve<N;ve++){let Ie=f+ve+X*ge,$=f+ve+X*(ge+1),ue=f+(ve+1)+X*(ge+1),we=f+(ve+1)+X*ge;c.push(Ie,$,we),c.push($,ue,we),oe+=6}o.addGroup(p,oe,A),p+=oe,f+=le}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Cr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Vn(s){let e={};for(let t=0;t<s.length;t++){let n=Cr(s[t]);for(let i in n)e[i]=n[i]}return e}function Sp(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function pf(s){return s.getRenderTarget()===null?s.outputColorSpace:Ot.workingColorSpace}var wp={clone:Cr,merge:Vn},Ep=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ap=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qn=class extends Xn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ep,this.fragmentShader=Ap,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cr(e.uniforms),this.uniformsGroups=Sp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},wo=class extends Jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=Xi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},bn=class extends wo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Er*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ra*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Er*2*Math.atan(Math.tan(ra*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ra*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ar=-90,or=1,qc=class extends Jt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new bn(ar,or,e,t);i.layers=this.layers,this.add(i);let r=new bn(ar,or,e,t);r.layers=this.layers,this.add(r);let a=new bn(ar,or,e,t);a.layers=this.layers,this.add(a);let o=new bn(ar,or,e,t);o.layers=this.layers,this.add(o);let c=new bn(ar,or,e,t);c.layers=this.layers,this.add(c);let l=new bn(ar,or,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Xi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===bo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Eo=class extends In{constructor(e,t,n,i,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:yr,super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},jc=class extends vi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(oa("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Os?Ht:ci),this.texture=new Eo(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Tn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ln(5,5,5),r=new qn({name:"CubemapFromEquirect",uniforms:Cr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Cn,blending:ls});r.uniforms.tEquirect.value=t;let a=new ze(i,r),o=t.minFilter;return t.minFilter===fs&&(t.minFilter=Tn),new qc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}},Ec=new B,Tp=new B,Rp=new Et,Vi=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Ec.subVectors(n,t).cross(Tp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ec),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Rp.getNormalMatrix(e),i=this.coplanarPoint(Ec).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ps=new Dn,Za=new B,fa=class{constructor(e=new Vi,t=new Vi,n=new Vi,i=new Vi,r=new Vi,a=new Vi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Xi){let n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],h=i[5],u=i[6],f=i[7],p=i[8],g=i[9],x=i[10],m=i[11],d=i[12],S=i[13],v=i[14],P=i[15];if(n[0].setComponents(c-r,f-l,m-p,P-d).normalize(),n[1].setComponents(c+r,f+l,m+p,P+d).normalize(),n[2].setComponents(c+a,f+h,m+g,P+S).normalize(),n[3].setComponents(c-a,f-h,m-g,P-S).normalize(),n[4].setComponents(c-o,f-u,m-x,P-v).normalize(),t===Xi)n[5].setComponents(c+o,f+u,m+x,P+v).normalize();else if(t===bo)n[5].setComponents(o,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ps.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ps.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ps)}intersectsSprite(e){return Ps.center.set(0,0,0),Ps.radius=.7071067811865476,Ps.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ps)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Za.x=i.normal.x>0?e.max.x:e.min.x,Za.y=i.normal.y>0?e.max.y:e.min.y,Za.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Za)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function mf(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Cp(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,h){let u=l.array,f=l.usage,p=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,f),l.onUploadCallback();let x;if(u instanceof Float32Array)x=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)x=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)x=s.SHORT;else if(u instanceof Uint32Array)x=s.UNSIGNED_INT;else if(u instanceof Int32Array)x=s.INT;else if(u instanceof Int8Array)x=s.BYTE;else if(u instanceof Uint8Array)x=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)x=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:x,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,h,u){let f=h.array,p=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,l),p.count===-1&&g.length===0&&s.bufferSubData(u,0,f),g.length!==0){for(let x=0,m=g.length;x<m;x++){let d=g[x];t?s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}p.count!==-1&&(t?s.bufferSubData(u,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):s.bufferSubData(u,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:a,remove:o,update:c}}var Pi=class s extends Zt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,f=t/c,p=[],g=[],x=[],m=[];for(let d=0;d<h;d++){let S=d*f-a;for(let v=0;v<l;v++){let P=v*u-r;g.push(P,-S,0),x.push(0,0,1),m.push(v/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let S=0;S<o;S++){let v=S+l*d,P=S+l*(d+1),F=S+1+l*(d+1),D=S+1+l*d;p.push(v,P,D),p.push(P,F,D)}this.setIndex(p),this.setAttribute("position",new Lt(g,3)),this.setAttribute("normal",new Lt(x,3)),this.setAttribute("uv",new Lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Pp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lp=`#ifdef USE_ALPHAHASH
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
#endif`,Ip=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Np=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Up=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fp=`#ifdef USE_AOMAP
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
#endif`,Op=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bp=`#ifdef USE_BATCHING
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
#endif`,kp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,zp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Vp=`#ifdef USE_IRIDESCENCE
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
#endif`,Wp=`#ifdef USE_BUMPMAP
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
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Jp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Qp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,$p=`#define PI 3.141592653589793
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
} // validated`,em=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tm=`vec3 transformedNormal = objectNormal;
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
#endif`,nm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,im=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,am="gl_FragColor = linearToOutputTexel( gl_FragColor );",om=`
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
}`,cm=`#ifdef USE_ENVMAP
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
#endif`,lm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hm=`#ifdef USE_ENVMAP
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
#endif`,um=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fm=`#ifdef USE_ENVMAP
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
#endif`,dm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gm=`#ifdef USE_FOG
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
}`,_m=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,xm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ym=`varying vec3 vViewPosition;
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
#endif`,wm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Em=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Am=`BlinnPhongMaterial material;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rm=`PhysicalMaterial material;
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
#endif`,Cm=`struct PhysicalMaterial {
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
}`,Pm=`
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
#endif`,Lm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Im=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
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
#endif`,Fm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Om=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,km=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zm=`#if defined( USE_POINTS_UV )
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
#endif`,Hm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vm=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wm=`#ifdef USE_MORPHNORMALS
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
#endif`,Xm=`#ifdef USE_MORPHTARGETS
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
#endif`,qm=`#ifdef USE_MORPHTARGETS
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
#endif`,jm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ym=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qm=`#ifdef USE_NORMALMAP
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
#endif`,$m=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,e0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,t0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,n0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,i0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,s0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,r0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,a0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,o0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,c0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,l0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,h0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,u0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,f0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,d0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,p0=`float getShadowMask() {
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
}`,m0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,g0=`#ifdef USE_SKINNING
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
#endif`,b0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_0=`#ifdef USE_SKINNING
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
#endif`,x0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,v0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,y0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,M0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,S0=`#ifdef USE_TRANSMISSION
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
#endif`,w0=`#ifdef USE_TRANSMISSION
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
#endif`,E0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,A0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,R0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,C0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,P0=`uniform sampler2D t2D;
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
}`,L0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,D0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,N0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U0=`#include <common>
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
}`,F0=`#if DEPTH_PACKING == 3200
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
}`,O0=`#define DISTANCE
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
}`,B0=`#define DISTANCE
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
}`,k0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,z0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,H0=`uniform float scale;
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
}`,G0=`uniform vec3 diffuse;
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
}`,V0=`#include <common>
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
}`,W0=`uniform vec3 diffuse;
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
}`,X0=`#define LAMBERT
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
}`,q0=`#define LAMBERT
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
}`,j0=`#define MATCAP
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
}`,Y0=`#define MATCAP
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
}`,K0=`#define NORMAL
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
}`,J0=`#define NORMAL
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
}`,Z0=`#define PHONG
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
}`,Q0=`#define PHONG
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
}`,$0=`#define STANDARD
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
}`,eg=`#define STANDARD
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
}`,tg=`#define TOON
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
}`,ng=`#define TOON
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
}`,ig=`uniform float size;
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
}`,sg=`uniform vec3 diffuse;
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
}`,rg=`#include <common>
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
}`,ag=`uniform vec3 color;
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
}`,og=`uniform float rotation;
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
}`,cg=`uniform vec3 diffuse;
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
}`,St={alphahash_fragment:Pp,alphahash_pars_fragment:Lp,alphamap_fragment:Ip,alphamap_pars_fragment:Dp,alphatest_fragment:Np,alphatest_pars_fragment:Up,aomap_fragment:Fp,aomap_pars_fragment:Op,batching_pars_vertex:Bp,batching_vertex:kp,begin_vertex:zp,beginnormal_vertex:Hp,bsdfs:Gp,iridescence_fragment:Vp,bumpmap_pars_fragment:Wp,clipping_planes_fragment:Xp,clipping_planes_pars_fragment:qp,clipping_planes_pars_vertex:jp,clipping_planes_vertex:Yp,color_fragment:Kp,color_pars_fragment:Jp,color_pars_vertex:Zp,color_vertex:Qp,common:$p,cube_uv_reflection_fragment:em,defaultnormal_vertex:tm,displacementmap_pars_vertex:nm,displacementmap_vertex:im,emissivemap_fragment:sm,emissivemap_pars_fragment:rm,colorspace_fragment:am,colorspace_pars_fragment:om,envmap_fragment:cm,envmap_common_pars_fragment:lm,envmap_pars_fragment:hm,envmap_pars_vertex:um,envmap_physical_pars_fragment:Sm,envmap_vertex:fm,fog_vertex:dm,fog_pars_vertex:pm,fog_fragment:mm,fog_pars_fragment:gm,gradientmap_pars_fragment:bm,lightmap_fragment:_m,lightmap_pars_fragment:xm,lights_lambert_fragment:vm,lights_lambert_pars_fragment:ym,lights_pars_begin:Mm,lights_toon_fragment:wm,lights_toon_pars_fragment:Em,lights_phong_fragment:Am,lights_phong_pars_fragment:Tm,lights_physical_fragment:Rm,lights_physical_pars_fragment:Cm,lights_fragment_begin:Pm,lights_fragment_maps:Lm,lights_fragment_end:Im,logdepthbuf_fragment:Dm,logdepthbuf_pars_fragment:Nm,logdepthbuf_pars_vertex:Um,logdepthbuf_vertex:Fm,map_fragment:Om,map_pars_fragment:Bm,map_particle_fragment:km,map_particle_pars_fragment:zm,metalnessmap_fragment:Hm,metalnessmap_pars_fragment:Gm,morphcolor_vertex:Vm,morphnormal_vertex:Wm,morphtarget_pars_vertex:Xm,morphtarget_vertex:qm,normal_fragment_begin:jm,normal_fragment_maps:Ym,normal_pars_fragment:Km,normal_pars_vertex:Jm,normal_vertex:Zm,normalmap_pars_fragment:Qm,clearcoat_normal_fragment_begin:$m,clearcoat_normal_fragment_maps:e0,clearcoat_pars_fragment:t0,iridescence_pars_fragment:n0,opaque_fragment:i0,packing:s0,premultiplied_alpha_fragment:r0,project_vertex:a0,dithering_fragment:o0,dithering_pars_fragment:c0,roughnessmap_fragment:l0,roughnessmap_pars_fragment:h0,shadowmap_pars_fragment:u0,shadowmap_pars_vertex:f0,shadowmap_vertex:d0,shadowmask_pars_fragment:p0,skinbase_vertex:m0,skinning_pars_vertex:g0,skinning_vertex:b0,skinnormal_vertex:_0,specularmap_fragment:x0,specularmap_pars_fragment:v0,tonemapping_fragment:y0,tonemapping_pars_fragment:M0,transmission_fragment:S0,transmission_pars_fragment:w0,uv_pars_fragment:E0,uv_pars_vertex:A0,uv_vertex:T0,worldpos_vertex:R0,background_vert:C0,background_frag:P0,backgroundCube_vert:L0,backgroundCube_frag:I0,cube_vert:D0,cube_frag:N0,depth_vert:U0,depth_frag:F0,distanceRGBA_vert:O0,distanceRGBA_frag:B0,equirect_vert:k0,equirect_frag:z0,linedashed_vert:H0,linedashed_frag:G0,meshbasic_vert:V0,meshbasic_frag:W0,meshlambert_vert:X0,meshlambert_frag:q0,meshmatcap_vert:j0,meshmatcap_frag:Y0,meshnormal_vert:K0,meshnormal_frag:J0,meshphong_vert:Z0,meshphong_frag:Q0,meshphysical_vert:$0,meshphysical_frag:eg,meshtoon_vert:tg,meshtoon_frag:ng,points_vert:ig,points_frag:sg,shadow_vert:rg,shadow_frag:ag,sprite_vert:og,sprite_frag:cg},Te={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Et},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Et}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Et},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0},uvTransform:{value:new Et}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Et},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0}}},Ti={basic:{uniforms:Vn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:St.meshbasic_vert,fragmentShader:St.meshbasic_frag},lambert:{uniforms:Vn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new Ue(0)}}]),vertexShader:St.meshlambert_vert,fragmentShader:St.meshlambert_frag},phong:{uniforms:Vn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:St.meshphong_vert,fragmentShader:St.meshphong_frag},standard:{uniforms:Vn([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:St.meshphysical_vert,fragmentShader:St.meshphysical_frag},toon:{uniforms:Vn([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new Ue(0)}}]),vertexShader:St.meshtoon_vert,fragmentShader:St.meshtoon_frag},matcap:{uniforms:Vn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:St.meshmatcap_vert,fragmentShader:St.meshmatcap_frag},points:{uniforms:Vn([Te.points,Te.fog]),vertexShader:St.points_vert,fragmentShader:St.points_frag},dashed:{uniforms:Vn([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:St.linedashed_vert,fragmentShader:St.linedashed_frag},depth:{uniforms:Vn([Te.common,Te.displacementmap]),vertexShader:St.depth_vert,fragmentShader:St.depth_frag},normal:{uniforms:Vn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:St.meshnormal_vert,fragmentShader:St.meshnormal_frag},sprite:{uniforms:Vn([Te.sprite,Te.fog]),vertexShader:St.sprite_vert,fragmentShader:St.sprite_frag},background:{uniforms:{uvTransform:{value:new Et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:St.background_vert,fragmentShader:St.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:St.backgroundCube_vert,fragmentShader:St.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:St.cube_vert,fragmentShader:St.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:St.equirect_vert,fragmentShader:St.equirect_frag},distanceRGBA:{uniforms:Vn([Te.common,Te.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:St.distanceRGBA_vert,fragmentShader:St.distanceRGBA_frag},shadow:{uniforms:Vn([Te.lights,Te.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:St.shadow_vert,fragmentShader:St.shadow_frag}};Ti.physical={uniforms:Vn([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Et},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Et},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Et},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Et},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Et},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Et},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Et}}]),vertexShader:St.meshphysical_vert,fragmentShader:St.meshphysical_frag};var Qa={r:0,b:0,g:0};function lg(s,e,t,n,i,r,a){let o=new Ue(0),c=r===!0?0:1,l,h,u=null,f=0,p=null;function g(m,d){let S=!1,v=d.isScene===!0?d.background:null;v&&v.isTexture&&(v=(d.backgroundBlurriness>0?t:e).get(v)),v===null?x(o,c):v&&v.isColor&&(x(v,1),S=!0);let P=s.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||S)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Vo)?(h===void 0&&(h=new ze(new ln(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:Cr(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,D,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=Ot.getTransfer(v.colorSpace)!==an,(u!==v||f!==v.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,p=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ze(new Pi(2,2),new qn({name:"BackgroundMaterial",uniforms:Cr(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,l.material.toneMapped=Ot.getTransfer(v.colorSpace)!==an,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,p=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function x(m,d){m.getRGB(Qa,pf(s)),n.buffers.color.setClear(Qa.r,Qa.g,Qa.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(m,d=1){o.set(m),c=d,x(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,x(o,c)},render:g}}function hg(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=m(null),l=c,h=!1;function u(z,X,ne,le,oe){let re=!1;if(a){let ge=x(le,ne,X);l!==ge&&(l=ge,p(l.object)),re=d(z,le,ne,oe),re&&S(z,le,ne,oe)}else{let ge=X.wireframe===!0;(l.geometry!==le.id||l.program!==ne.id||l.wireframe!==ge)&&(l.geometry=le.id,l.program=ne.id,l.wireframe=ge,re=!0)}oe!==null&&t.update(oe,s.ELEMENT_ARRAY_BUFFER),(re||h)&&(h=!1,Y(z,X,ne,le),oe!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(oe).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function p(z){return n.isWebGL2?s.bindVertexArray(z):r.bindVertexArrayOES(z)}function g(z){return n.isWebGL2?s.deleteVertexArray(z):r.deleteVertexArrayOES(z)}function x(z,X,ne){let le=ne.wireframe===!0,oe=o[z.id];oe===void 0&&(oe={},o[z.id]=oe);let re=oe[X.id];re===void 0&&(re={},oe[X.id]=re);let ge=re[le];return ge===void 0&&(ge=m(f()),re[le]=ge),ge}function m(z){let X=[],ne=[],le=[];for(let oe=0;oe<i;oe++)X[oe]=0,ne[oe]=0,le[oe]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:ne,attributeDivisors:le,object:z,attributes:{},index:null}}function d(z,X,ne,le){let oe=l.attributes,re=X.attributes,ge=0,ve=ne.getAttributes();for(let Ie in ve)if(ve[Ie].location>=0){let ue=oe[Ie],we=re[Ie];if(we===void 0&&(Ie==="instanceMatrix"&&z.instanceMatrix&&(we=z.instanceMatrix),Ie==="instanceColor"&&z.instanceColor&&(we=z.instanceColor)),ue===void 0||ue.attribute!==we||we&&ue.data!==we.data)return!0;ge++}return l.attributesNum!==ge||l.index!==le}function S(z,X,ne,le){let oe={},re=X.attributes,ge=0,ve=ne.getAttributes();for(let Ie in ve)if(ve[Ie].location>=0){let ue=re[Ie];ue===void 0&&(Ie==="instanceMatrix"&&z.instanceMatrix&&(ue=z.instanceMatrix),Ie==="instanceColor"&&z.instanceColor&&(ue=z.instanceColor));let we={};we.attribute=ue,ue&&ue.data&&(we.data=ue.data),oe[Ie]=we,ge++}l.attributes=oe,l.attributesNum=ge,l.index=le}function v(){let z=l.newAttributes;for(let X=0,ne=z.length;X<ne;X++)z[X]=0}function P(z){F(z,0)}function F(z,X){let ne=l.newAttributes,le=l.enabledAttributes,oe=l.attributeDivisors;ne[z]=1,le[z]===0&&(s.enableVertexAttribArray(z),le[z]=1),oe[z]!==X&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](z,X),oe[z]=X)}function D(){let z=l.newAttributes,X=l.enabledAttributes;for(let ne=0,le=X.length;ne<le;ne++)X[ne]!==z[ne]&&(s.disableVertexAttribArray(ne),X[ne]=0)}function N(z,X,ne,le,oe,re,ge){ge===!0?s.vertexAttribIPointer(z,X,ne,oe,re):s.vertexAttribPointer(z,X,ne,le,oe,re)}function Y(z,X,ne,le){if(n.isWebGL2===!1&&(z.isInstancedMesh||le.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();let oe=le.attributes,re=ne.getAttributes(),ge=X.defaultAttributeValues;for(let ve in re){let Ie=re[ve];if(Ie.location>=0){let $=oe[ve];if($===void 0&&(ve==="instanceMatrix"&&z.instanceMatrix&&($=z.instanceMatrix),ve==="instanceColor"&&z.instanceColor&&($=z.instanceColor)),$!==void 0){let ue=$.normalized,we=$.itemSize,Ve=t.get($);if(Ve===void 0)continue;let je=Ve.buffer,ht=Ve.type,xt=Ve.bytesPerElement,at=n.isWebGL2===!0&&(ht===s.INT||ht===s.UNSIGNED_INT||$.gpuType===ef);if($.isInterleavedBufferAttribute){let Dt=$.data,K=Dt.stride,En=$.offset;if(Dt.isInstancedInterleavedBuffer){for(let tt=0;tt<Ie.locationSize;tt++)F(Ie.location+tt,Dt.meshPerAttribute);z.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=Dt.meshPerAttribute*Dt.count)}else for(let tt=0;tt<Ie.locationSize;tt++)P(Ie.location+tt);s.bindBuffer(s.ARRAY_BUFFER,je);for(let tt=0;tt<Ie.locationSize;tt++)N(Ie.location+tt,we/Ie.locationSize,ht,ue,K*xt,(En+we/Ie.locationSize*tt)*xt,at)}else{if($.isInstancedBufferAttribute){for(let Dt=0;Dt<Ie.locationSize;Dt++)F(Ie.location+Dt,$.meshPerAttribute);z.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Dt=0;Dt<Ie.locationSize;Dt++)P(Ie.location+Dt);s.bindBuffer(s.ARRAY_BUFFER,je);for(let Dt=0;Dt<Ie.locationSize;Dt++)N(Ie.location+Dt,we/Ie.locationSize,ht,ue,we*xt,we/Ie.locationSize*Dt*xt,at)}}else if(ge!==void 0){let ue=ge[ve];if(ue!==void 0)switch(ue.length){case 2:s.vertexAttrib2fv(Ie.location,ue);break;case 3:s.vertexAttrib3fv(Ie.location,ue);break;case 4:s.vertexAttrib4fv(Ie.location,ue);break;default:s.vertexAttrib1fv(Ie.location,ue)}}}}D()}function A(){ie();for(let z in o){let X=o[z];for(let ne in X){let le=X[ne];for(let oe in le)g(le[oe].object),delete le[oe];delete X[ne]}delete o[z]}}function I(z){if(o[z.id]===void 0)return;let X=o[z.id];for(let ne in X){let le=X[ne];for(let oe in le)g(le[oe].object),delete le[oe];delete X[ne]}delete o[z.id]}function W(z){for(let X in o){let ne=o[X];if(ne[z.id]===void 0)continue;let le=ne[z.id];for(let oe in le)g(le[oe].object),delete le[oe];delete ne[z.id]}}function ie(){Me(),h=!0,l!==c&&(l=c,p(l.object))}function Me(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:ie,resetDefaultState:Me,dispose:A,releaseStatesOfGeometry:I,releaseStatesOfProgram:W,initAttributes:v,enableAttribute:P,disableUnusedAttributes:D}}function ug(s,e,t,n){let i=n.isWebGL2,r;function a(h){r=h}function o(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,f){if(f===0)return;let p,g;if(i)p=s,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,u,f),t.update(u,r,f)}function l(h,u,f){if(f===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<f;g++)this.render(h[g],u[g]);else{p.multiDrawArraysWEBGL(r,h,0,u,0,f);let g=0;for(let x=0;x<f;x++)g+=u[x];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function fg(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let N=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(N){if(N==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext!="undefined"&&s.constructor.name==="WebGL2RenderingContext",o=t.precision!==void 0?t.precision:"highp",c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);let l=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),x=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),d=s.getParameter(s.MAX_VARYING_VECTORS),S=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,P=a||e.has("OES_texture_float"),F=v&&P,D=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:S,vertexTextures:v,floatFragmentTextures:P,floatVertexTextures:F,maxSamples:D}}function dg(s){let e=this,t=null,n=0,i=!1,r=!1,a=new Vi,o=new Et,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let p=u.length!==0||f||n!==0||i;return i=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,d=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{let S=r?0:n,v=S*4,P=d.clippingState||null;c.value=P,P=h(g,f,v,p);for(let F=0;F!==v;++F)P[F]=t[F];d.clippingState=P,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,p,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let d=p+x*4,S=f.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,P=p;v!==x;++v,P+=4)a.copy(u[v]).applyMatrix4(S,o),a.normal.toArray(m,P),m[P+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function pg(s){let e=new WeakMap;function t(a,o){return o===kc?a.mapping=yr:o===zc&&(a.mapping=Mr),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===kc||o===zc)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new jc(c.height/2);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var ds=class extends wo{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},gr=4,uu=[.125,.215,.35,.446,.526,.582],Ds=20,Ac=new ds,fu=new Ue,Tc=null,Rc=0,Cc=0,Ls=(1+Math.sqrt(5))/2,cr=1/Ls,du=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,Ls,cr),new B(0,Ls,-cr),new B(cr,0,Ls),new B(-cr,0,Ls),new B(Ls,cr,0),new B(-Ls,cr,0)],ks=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Tc=this._renderer.getRenderTarget(),Rc=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Tc,Rc,Cc),e.scissorTest=!1,$a(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===yr||e.mapping===Mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Tc=this._renderer.getRenderTarget(),Rc=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:ha,format:oi,colorSpace:Mn,depthBuffer:!1},i=pu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pu(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mg(r)),this._blurMaterial=gg(r,e,t)}return i}_compileMaterial(e){let t=new ze(this._lodPlanes[0],e);this._renderer.compile(t,Ac)}_sceneToCubeUV(e,t,n,i){let o=new bn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(fu),h.toneMapping=hs,h.autoClear=!1;let p=new fn({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1}),g=new ze(new ln,p),x=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(fu),x=!0);for(let d=0;d<6;d++){let S=d%3;S===0?(o.up.set(0,c[d],0),o.lookAt(l[d],0,0)):S===1?(o.up.set(0,0,c[d]),o.lookAt(0,l[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,l[d]));let v=this._cubeSize;$a(i,S*v,d>2?v:0,v,v),h.setRenderTarget(i),x&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===yr||e.mapping===Mr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=gu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mu());let r=i?this._cubemapMaterial:this._equirectMaterial,a=new ze(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;$a(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ac)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=du[(i-1)%du.length];this._blur(e,i-1,i,r,a)}t.autoClear=n}_blur(e,t,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ze(this._lodPlanes[i],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ds-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Ds;m>Ds&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ds}`);let d=[],S=0;for(let N=0;N<Ds;++N){let Y=N/x,A=Math.exp(-Y*Y/2);d.push(A),N===0?S+=A:N<m&&(S+=2*A)}for(let N=0;N<d.length;N++)d[N]=d[N]/S;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;let P=this._sizeLods[i],F=3*P*(i>v-gr?i-v+gr:0),D=4*(this._cubeSize-P);$a(t,F,D,3*P,2*P),c.setRenderTarget(t),c.render(u,Ac)}};function mg(s){let e=[],t=[],n=[],i=s,r=s-gr+1+uu.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);t.push(o);let c=1/o;a>s-gr?c=uu[a-s+gr-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,x=3,m=2,d=1,S=new Float32Array(x*g*p),v=new Float32Array(m*g*p),P=new Float32Array(d*g*p);for(let D=0;D<p;D++){let N=D%3*2/3-1,Y=D>2?0:-1,A=[N,Y,0,N+2/3,Y,0,N+2/3,Y+1,0,N,Y,0,N+2/3,Y+1,0,N,Y+1,0];S.set(A,x*g*D),v.set(f,m*g*D);let I=[D,D,D,D,D,D];P.set(I,d*g*D)}let F=new Zt;F.setAttribute("position",new Pt(S,x)),F.setAttribute("uv",new Pt(v,m)),F.setAttribute("faceIndex",new Pt(P,d)),e.push(F),i>gr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function pu(s,e,t){let n=new vi(s,e,t);return n.texture.mapping=Vo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $a(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function gg(s,e,t){let n=new Float32Array(Ds),i=new B(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:Ds,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Tl(),fragmentShader:`

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
		`,blending:ls,depthTest:!1,depthWrite:!1})}function mu(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tl(),fragmentShader:`

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
		`,blending:ls,depthTest:!1,depthWrite:!1})}function gu(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ls,depthTest:!1,depthWrite:!1})}function Tl(){return`

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
	`}function bg(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===kc||c===zc,h=c===yr||c===Mr;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new ks(s)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{let u=o.image;if(l&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new ks(s));let f=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function i(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function _g(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function xg(s,e,t,n){let i={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let x=f.morphAttributes[g];for(let m=0,d=x.length;m<d;m++)e.remove(x[m])}f.removeEventListener("dispose",a),delete i[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let g in f)e.update(f[g],s.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let x=p[g];for(let m=0,d=x.length;m<d;m++)e.update(x[m],s.ARRAY_BUFFER)}}function l(u){let f=[],p=u.index,g=u.attributes.position,x=0;if(p!==null){let S=p.array;x=p.version;for(let v=0,P=S.length;v<P;v+=3){let F=S[v+0],D=S[v+1],N=S[v+2];f.push(F,D,D,N,N,F)}}else if(g!==void 0){let S=g.array;x=g.version;for(let v=0,P=S.length/3-1;v<P;v+=3){let F=v+0,D=v+1,N=v+2;f.push(F,D,D,N,N,F)}}else return;let m=new(ff(f)?So:Rr)(f,1);m.version=x;let d=r.get(u);d&&e.remove(d),r.set(u,m)}function h(u){let f=r.get(u);if(f){let p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function vg(s,e,t,n){let i=n.isWebGL2,r;function a(p){r=p}let o,c;function l(p){o=p.type,c=p.bytesPerElement}function h(p,g){s.drawElements(r,g,o,p*c),t.update(g,r,1)}function u(p,g,x){if(x===0)return;let m,d;if(i)m=s,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](r,g,o,p*c,x),t.update(g,r,x)}function f(p,g,x){if(x===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<x;d++)this.render(p[d]/c,g[d]);else{m.multiDrawElementsWEBGL(r,g,0,o,p,0,x);let d=0;for(let S=0;S<x;S++)d+=g[S];t.update(d,r,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function yg(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Mg(s,e){return s[0]-e[0]}function Sg(s,e){return Math.abs(e[1])-Math.abs(s[1])}function wg(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,a=new Ct,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,u){let f=l.morphTargetInfluences;if(e.isWebGL2===!0){let p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=p!==void 0?p.length:0,x=r.get(h);if(x===void 0||x.count!==g){let z=function(){ie.dispose(),r.delete(h),h.removeEventListener("dispose",z)};x!==void 0&&x.texture.dispose();let S=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,P=h.morphAttributes.color!==void 0,F=h.morphAttributes.position||[],D=h.morphAttributes.normal||[],N=h.morphAttributes.color||[],Y=0;S===!0&&(Y=1),v===!0&&(Y=2),P===!0&&(Y=3);let A=h.attributes.position.count*Y,I=1;A>e.maxTextureSize&&(I=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);let W=new Float32Array(A*I*4*g),ie=new yo(W,A,I,g);ie.type=Wi,ie.needsUpdate=!0;let Me=Y*4;for(let X=0;X<g;X++){let ne=F[X],le=D[X],oe=N[X],re=A*I*4*X;for(let ge=0;ge<ne.count;ge++){let ve=ge*Me;S===!0&&(a.fromBufferAttribute(ne,ge),W[re+ve+0]=a.x,W[re+ve+1]=a.y,W[re+ve+2]=a.z,W[re+ve+3]=0),v===!0&&(a.fromBufferAttribute(le,ge),W[re+ve+4]=a.x,W[re+ve+5]=a.y,W[re+ve+6]=a.z,W[re+ve+7]=0),P===!0&&(a.fromBufferAttribute(oe,ge),W[re+ve+8]=a.x,W[re+ve+9]=a.y,W[re+ve+10]=a.z,W[re+ve+11]=oe.itemSize===4?a.w:1)}}x={count:g,texture:ie,size:new He(A,I)},r.set(h,x),h.addEventListener("dispose",z)}let m=0;for(let S=0;S<f.length;S++)m+=f[S];let d=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(s,"morphTargetBaseInfluence",d),u.getUniforms().setValue(s,"morphTargetInfluences",f),u.getUniforms().setValue(s,"morphTargetsTexture",x.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}else{let p=f===void 0?0:f.length,g=n[h.id];if(g===void 0||g.length!==p){g=[];for(let v=0;v<p;v++)g[v]=[v,0];n[h.id]=g}for(let v=0;v<p;v++){let P=g[v];P[0]=v,P[1]=f[v]}g.sort(Sg);for(let v=0;v<8;v++)v<p&&g[v][1]?(o[v][0]=g[v][0],o[v][1]=g[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(Mg);let x=h.morphAttributes.position,m=h.morphAttributes.normal,d=0;for(let v=0;v<8;v++){let P=o[v],F=P[0],D=P[1];F!==Number.MAX_SAFE_INTEGER&&D?(x&&h.getAttribute("morphTarget"+v)!==x[F]&&h.setAttribute("morphTarget"+v,x[F]),m&&h.getAttribute("morphNormal"+v)!==m[F]&&h.setAttribute("morphNormal"+v,m[F]),i[v]=D,d+=D):(x&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),m&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),i[v]=0)}let S=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(s,"morphTargetBaseInfluence",S),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function Eg(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return u}function a(){i=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}var Ao=class extends In{constructor(e,t,n,i,r,a,o,c,l,h){if(h=h!==void 0?h:Fs,h!==Fs&&h!==Sr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Fs&&(n=os),n===void 0&&h===Sr&&(n=Us),super(null,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:yn,this.minFilter=c!==void 0?c:yn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},gf=new In,bf=new Ao(1,1);bf.compareFunction=hf;var _f=new yo,xf=new Xc,vf=new Eo,bu=[],_u=[],xu=new Float32Array(16),vu=new Float32Array(9),yu=new Float32Array(4);function Fr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=bu[i];if(r===void 0&&(r=new Float32Array(i),bu[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Sn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function wn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function qo(s,e){let t=_u[e];t===void 0&&(t=new Int32Array(e),_u[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Ag(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Tg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Sn(t,e))return;s.uniform2fv(this.addr,e),wn(t,e)}}function Rg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Sn(t,e))return;s.uniform3fv(this.addr,e),wn(t,e)}}function Cg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Sn(t,e))return;s.uniform4fv(this.addr,e),wn(t,e)}}function Pg(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Sn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),wn(t,e)}else{if(Sn(t,n))return;yu.set(n),s.uniformMatrix2fv(this.addr,!1,yu),wn(t,n)}}function Lg(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Sn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),wn(t,e)}else{if(Sn(t,n))return;vu.set(n),s.uniformMatrix3fv(this.addr,!1,vu),wn(t,n)}}function Ig(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Sn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),wn(t,e)}else{if(Sn(t,n))return;xu.set(n),s.uniformMatrix4fv(this.addr,!1,xu),wn(t,n)}}function Dg(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Ng(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Sn(t,e))return;s.uniform2iv(this.addr,e),wn(t,e)}}function Ug(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Sn(t,e))return;s.uniform3iv(this.addr,e),wn(t,e)}}function Fg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Sn(t,e))return;s.uniform4iv(this.addr,e),wn(t,e)}}function Og(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Bg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Sn(t,e))return;s.uniform2uiv(this.addr,e),wn(t,e)}}function kg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Sn(t,e))return;s.uniform3uiv(this.addr,e),wn(t,e)}}function zg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Sn(t,e))return;s.uniform4uiv(this.addr,e),wn(t,e)}}function Hg(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?bf:gf;t.setTexture2D(e||r,i)}function Gg(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||xf,i)}function Vg(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||vf,i)}function Wg(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||_f,i)}function Xg(s){switch(s){case 5126:return Ag;case 35664:return Tg;case 35665:return Rg;case 35666:return Cg;case 35674:return Pg;case 35675:return Lg;case 35676:return Ig;case 5124:case 35670:return Dg;case 35667:case 35671:return Ng;case 35668:case 35672:return Ug;case 35669:case 35673:return Fg;case 5125:return Og;case 36294:return Bg;case 36295:return kg;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return Hg;case 35679:case 36299:case 36307:return Gg;case 35680:case 36300:case 36308:case 36293:return Vg;case 36289:case 36303:case 36311:case 36292:return Wg}}function qg(s,e){s.uniform1fv(this.addr,e)}function jg(s,e){let t=Fr(e,this.size,2);s.uniform2fv(this.addr,t)}function Yg(s,e){let t=Fr(e,this.size,3);s.uniform3fv(this.addr,t)}function Kg(s,e){let t=Fr(e,this.size,4);s.uniform4fv(this.addr,t)}function Jg(s,e){let t=Fr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Zg(s,e){let t=Fr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Qg(s,e){let t=Fr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function $g(s,e){s.uniform1iv(this.addr,e)}function eb(s,e){s.uniform2iv(this.addr,e)}function tb(s,e){s.uniform3iv(this.addr,e)}function nb(s,e){s.uniform4iv(this.addr,e)}function ib(s,e){s.uniform1uiv(this.addr,e)}function sb(s,e){s.uniform2uiv(this.addr,e)}function rb(s,e){s.uniform3uiv(this.addr,e)}function ab(s,e){s.uniform4uiv(this.addr,e)}function ob(s,e,t){let n=this.cache,i=e.length,r=qo(t,i);Sn(n,r)||(s.uniform1iv(this.addr,r),wn(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||gf,r[a])}function cb(s,e,t){let n=this.cache,i=e.length,r=qo(t,i);Sn(n,r)||(s.uniform1iv(this.addr,r),wn(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||xf,r[a])}function lb(s,e,t){let n=this.cache,i=e.length,r=qo(t,i);Sn(n,r)||(s.uniform1iv(this.addr,r),wn(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||vf,r[a])}function hb(s,e,t){let n=this.cache,i=e.length,r=qo(t,i);Sn(n,r)||(s.uniform1iv(this.addr,r),wn(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||_f,r[a])}function ub(s){switch(s){case 5126:return qg;case 35664:return jg;case 35665:return Yg;case 35666:return Kg;case 35674:return Jg;case 35675:return Zg;case 35676:return Qg;case 5124:case 35670:return $g;case 35667:case 35671:return eb;case 35668:case 35672:return tb;case 35669:case 35673:return nb;case 5125:return ib;case 36294:return sb;case 36295:return rb;case 36296:return ab;case 35678:case 36198:case 36298:case 36306:case 35682:return ob;case 35679:case 36299:case 36307:return cb;case 35680:case 36300:case 36308:case 36293:return lb;case 36289:case 36303:case 36311:case 36292:return hb}}var Yc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Xg(t.type)}},Kc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ub(t.type)}},Jc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},Pc=/(\w+)(\])?(\[|\.)?/g;function Mu(s,e){s.seq.push(e),s.map[e.id]=e}function fb(s,e,t){let n=s.name,i=n.length;for(Pc.lastIndex=0;;){let r=Pc.exec(n),a=Pc.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Mu(t,l===void 0?new Yc(o,s,e):new Kc(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Jc(o),Mu(t,u)),t=u}}}var vr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);fb(r,a,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Su(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var db=37297,pb=0;function mb(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function gb(s){let e=Ot.getPrimaries(Ot.workingColorSpace),t=Ot.getPrimaries(s),n;switch(e===t?n="":e===go&&t===mo?n="LinearDisplayP3ToLinearSRGB":e===mo&&t===go&&(n="LinearSRGBToLinearDisplayP3"),s){case Mn:case Xo:return[n,"LinearTransferOETF"];case Ht:case El:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function wu(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+mb(s.getShaderSource(e),a)}else return i}function bb(s,e){let t=gb(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function _b(s,e){let t;switch(e){case vd:t="Linear";break;case yd:t="Reinhard";break;case Md:t="OptimizedCineon";break;case Go:t="ACESFilmic";break;case wd:t="AgX";break;case Sd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function xb(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(br).join(`
`)}function vb(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(br).join(`
`)}function yb(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Mb(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function br(s){return s!==""}function Eu(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Au(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Sb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zc(s){return s.replace(Sb,Eb)}var wb=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Eb(s,e){let t=St[e];if(t===void 0){let n=wb.get(e);if(n!==void 0)t=St[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Zc(t)}var Ab=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tu(s){return s.replace(Ab,Tb)}function Tb(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ru(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Rb(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ho?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Yf?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Gi&&(e="SHADOWMAP_TYPE_VSM"),e}function Cb(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case yr:case Mr:e="ENVMAP_TYPE_CUBE";break;case Vo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Pb(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Mr:e="ENVMAP_MODE_REFRACTION";break}return e}function Lb(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case vl:e="ENVMAP_BLENDING_MULTIPLY";break;case _d:e="ENVMAP_BLENDING_MIX";break;case xd:e="ENVMAP_BLENDING_ADD";break}return e}function Ib(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Db(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Rb(t),l=Cb(t),h=Pb(t),u=Lb(t),f=Ib(t),p=t.isWebGL2?"":xb(t),g=vb(t),x=yb(r),m=i.createProgram(),d,S,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(br).join(`
`),d.length>0&&(d+=`
`),S=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(br).join(`
`),S.length>0&&(S+=`
`)):(d=[Ru(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(br).join(`
`),S=[p,Ru(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hs?"#define TONE_MAPPING":"",t.toneMapping!==hs?St.tonemapping_pars_fragment:"",t.toneMapping!==hs?_b("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",St.colorspace_pars_fragment,bb("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(br).join(`
`)),a=Zc(a),a=Eu(a,t),a=Au(a,t),o=Zc(o),o=Eu(o,t),o=Au(o,t),a=Tu(a),o=Tu(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===jh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);let P=v+d+a,F=v+S+o,D=Su(i,i.VERTEX_SHADER,P),N=Su(i,i.FRAGMENT_SHADER,F);i.attachShader(m,D),i.attachShader(m,N),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function Y(ie){if(s.debug.checkShaderErrors){let Me=i.getProgramInfoLog(m).trim(),z=i.getShaderInfoLog(D).trim(),X=i.getShaderInfoLog(N).trim(),ne=!0,le=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(ne=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,D,N);else{let oe=wu(i,D,"vertex"),re=wu(i,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+Me+`
`+oe+`
`+re)}else Me!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Me):(z===""||X==="")&&(le=!1);le&&(ie.diagnostics={runnable:ne,programLog:Me,vertexShader:{log:z,prefix:d},fragmentShader:{log:X,prefix:S}})}i.deleteShader(D),i.deleteShader(N),A=new vr(i,m),I=Mb(i,m)}let A;this.getUniforms=function(){return A===void 0&&Y(this),A};let I;this.getAttributes=function(){return I===void 0&&Y(this),I};let W=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=i.getProgramParameter(m,db)),W},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=pb++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=D,this.fragmentShader=N,this}var Nb=0,Qc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new $c(e),t.set(e,n)),n}},$c=class{constructor(e){this.id=Nb++,this.code=e,this.usedTimes=0}};function Ub(s,e,t,n,i,r,a){let o=new Mo,c=new Qc,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,f=i.vertexTextures,p=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(A){return A===0?"uv":`uv${A}`}function m(A,I,W,ie,Me){let z=ie.fog,X=Me.geometry,ne=A.isMeshStandardMaterial?ie.environment:null,le=(A.isMeshStandardMaterial?t:e).get(A.envMap||ne),oe=le&&le.mapping===Vo?le.image.height:null,re=g[A.type];A.precision!==null&&(p=i.getMaxPrecision(A.precision),p!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",p,"instead."));let ge=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ve=ge!==void 0?ge.length:0,Ie=0;X.morphAttributes.position!==void 0&&(Ie=1),X.morphAttributes.normal!==void 0&&(Ie=2),X.morphAttributes.color!==void 0&&(Ie=3);let $,ue,we,Ve;if(re){let qt=Ti[re];$=qt.vertexShader,ue=qt.fragmentShader}else $=A.vertexShader,ue=A.fragmentShader,c.update(A),we=c.getVertexShaderID(A),Ve=c.getFragmentShaderID(A);let je=s.getRenderTarget(),ht=Me.isInstancedMesh===!0,xt=Me.isBatchedMesh===!0,at=!!A.map,Dt=!!A.matcap,K=!!le,En=!!A.aoMap,tt=!!A.lightMap,pt=!!A.bumpMap,Fe=!!A.normalMap,en=!!A.displacementMap,bt=!!A.emissiveMap,L=!!A.metalnessMap,E=!!A.roughnessMap,J=A.anisotropy>0,be=A.clearcoat>0,he=A.iridescence>0,me=A.sheen>0,Be=A.transmission>0,Re=J&&!!A.anisotropyMap,Ne=be&&!!A.clearcoatMap,Qe=be&&!!A.clearcoatNormalMap,yt=be&&!!A.clearcoatRoughnessMap,fe=he&&!!A.iridescenceMap,Ee=he&&!!A.iridescenceThicknessMap,ke=me&&!!A.sheenColorMap,Oe=me&&!!A.sheenRoughnessMap,We=!!A.specularMap,se=!!A.specularColorMap,ut=!!A.specularIntensityMap,At=Be&&!!A.transmissionMap,kt=Be&&!!A.thicknessMap,ft=!!A.gradientMap,xe=!!A.alphaMap,O=A.alphaTest>0,Ae=!!A.alphaHash,Pe=!!A.extensions,nt=!!X.attributes.uv1,et=!!X.attributes.uv2,Nt=!!X.attributes.uv3,Bt=hs;return A.toneMapped&&(je===null||je.isXRRenderTarget===!0)&&(Bt=s.toneMapping),{isWebGL2:h,shaderID:re,shaderType:A.type,shaderName:A.name,vertexShader:$,fragmentShader:ue,defines:A.defines,customVertexShaderID:we,customFragmentShaderID:Ve,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:p,batching:xt,instancing:ht,instancingColor:ht&&Me.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:je===null?s.outputColorSpace:je.isXRRenderTarget===!0?je.texture.colorSpace:Mn,map:at,matcap:Dt,envMap:K,envMapMode:K&&le.mapping,envMapCubeUVHeight:oe,aoMap:En,lightMap:tt,bumpMap:pt,normalMap:Fe,displacementMap:f&&en,emissiveMap:bt,normalMapObjectSpace:Fe&&A.normalMapType===zd,normalMapTangentSpace:Fe&&A.normalMapType===wl,metalnessMap:L,roughnessMap:E,anisotropy:J,anisotropyMap:Re,clearcoat:be,clearcoatMap:Ne,clearcoatNormalMap:Qe,clearcoatRoughnessMap:yt,iridescence:he,iridescenceMap:fe,iridescenceThicknessMap:Ee,sheen:me,sheenColorMap:ke,sheenRoughnessMap:Oe,specularMap:We,specularColorMap:se,specularIntensityMap:ut,transmission:Be,transmissionMap:At,thicknessMap:kt,gradientMap:ft,opaque:A.transparent===!1&&A.blending===_r,alphaMap:xe,alphaTest:O,alphaHash:Ae,combine:A.combine,mapUv:at&&x(A.map.channel),aoMapUv:En&&x(A.aoMap.channel),lightMapUv:tt&&x(A.lightMap.channel),bumpMapUv:pt&&x(A.bumpMap.channel),normalMapUv:Fe&&x(A.normalMap.channel),displacementMapUv:en&&x(A.displacementMap.channel),emissiveMapUv:bt&&x(A.emissiveMap.channel),metalnessMapUv:L&&x(A.metalnessMap.channel),roughnessMapUv:E&&x(A.roughnessMap.channel),anisotropyMapUv:Re&&x(A.anisotropyMap.channel),clearcoatMapUv:Ne&&x(A.clearcoatMap.channel),clearcoatNormalMapUv:Qe&&x(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:yt&&x(A.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&x(A.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&x(A.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&x(A.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&x(A.sheenRoughnessMap.channel),specularMapUv:We&&x(A.specularMap.channel),specularColorMapUv:se&&x(A.specularColorMap.channel),specularIntensityMapUv:ut&&x(A.specularIntensityMap.channel),transmissionMapUv:At&&x(A.transmissionMap.channel),thicknessMapUv:kt&&x(A.thicknessMap.channel),alphaMapUv:xe&&x(A.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Fe||J),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,vertexUv1s:nt,vertexUv2s:et,vertexUv3s:Nt,pointsUvs:Me.isPoints===!0&&!!X.attributes.uv&&(at||xe),fog:!!z,useFog:A.fog===!0,fogExp2:z&&z.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Me.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Ie,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:A.dithering,shadowMapEnabled:s.shadowMap.enabled&&W.length>0,shadowMapType:s.shadowMap.type,toneMapping:Bt,useLegacyLights:s._useLegacyLights,decodeVideoTexture:at&&A.map.isVideoTexture===!0&&Ot.getTransfer(A.map.colorSpace)===an,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Rn,flipSided:A.side===Cn,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionDerivatives:Pe&&A.extensions.derivatives===!0,extensionFragDepth:Pe&&A.extensions.fragDepth===!0,extensionDrawBuffers:Pe&&A.extensions.drawBuffers===!0,extensionShaderTextureLOD:Pe&&A.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Pe&&A.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()}}function d(A){let I=[];if(A.shaderID?I.push(A.shaderID):(I.push(A.customVertexShaderID),I.push(A.customFragmentShaderID)),A.defines!==void 0)for(let W in A.defines)I.push(W),I.push(A.defines[W]);return A.isRawShaderMaterial===!1&&(S(I,A),v(I,A),I.push(s.outputColorSpace)),I.push(A.customProgramCacheKey),I.join()}function S(A,I){A.push(I.precision),A.push(I.outputColorSpace),A.push(I.envMapMode),A.push(I.envMapCubeUVHeight),A.push(I.mapUv),A.push(I.alphaMapUv),A.push(I.lightMapUv),A.push(I.aoMapUv),A.push(I.bumpMapUv),A.push(I.normalMapUv),A.push(I.displacementMapUv),A.push(I.emissiveMapUv),A.push(I.metalnessMapUv),A.push(I.roughnessMapUv),A.push(I.anisotropyMapUv),A.push(I.clearcoatMapUv),A.push(I.clearcoatNormalMapUv),A.push(I.clearcoatRoughnessMapUv),A.push(I.iridescenceMapUv),A.push(I.iridescenceThicknessMapUv),A.push(I.sheenColorMapUv),A.push(I.sheenRoughnessMapUv),A.push(I.specularMapUv),A.push(I.specularColorMapUv),A.push(I.specularIntensityMapUv),A.push(I.transmissionMapUv),A.push(I.thicknessMapUv),A.push(I.combine),A.push(I.fogExp2),A.push(I.sizeAttenuation),A.push(I.morphTargetsCount),A.push(I.morphAttributeCount),A.push(I.numDirLights),A.push(I.numPointLights),A.push(I.numSpotLights),A.push(I.numSpotLightMaps),A.push(I.numHemiLights),A.push(I.numRectAreaLights),A.push(I.numDirLightShadows),A.push(I.numPointLightShadows),A.push(I.numSpotLightShadows),A.push(I.numSpotLightShadowsWithMaps),A.push(I.numLightProbes),A.push(I.shadowMapType),A.push(I.toneMapping),A.push(I.numClippingPlanes),A.push(I.numClipIntersection),A.push(I.depthPacking)}function v(A,I){o.disableAll(),I.isWebGL2&&o.enable(0),I.supportsVertexTextures&&o.enable(1),I.instancing&&o.enable(2),I.instancingColor&&o.enable(3),I.matcap&&o.enable(4),I.envMap&&o.enable(5),I.normalMapObjectSpace&&o.enable(6),I.normalMapTangentSpace&&o.enable(7),I.clearcoat&&o.enable(8),I.iridescence&&o.enable(9),I.alphaTest&&o.enable(10),I.vertexColors&&o.enable(11),I.vertexAlphas&&o.enable(12),I.vertexUv1s&&o.enable(13),I.vertexUv2s&&o.enable(14),I.vertexUv3s&&o.enable(15),I.vertexTangents&&o.enable(16),I.anisotropy&&o.enable(17),I.alphaHash&&o.enable(18),I.batching&&o.enable(19),A.push(o.mask),o.disableAll(),I.fog&&o.enable(0),I.useFog&&o.enable(1),I.flatShading&&o.enable(2),I.logarithmicDepthBuffer&&o.enable(3),I.skinning&&o.enable(4),I.morphTargets&&o.enable(5),I.morphNormals&&o.enable(6),I.morphColors&&o.enable(7),I.premultipliedAlpha&&o.enable(8),I.shadowMapEnabled&&o.enable(9),I.useLegacyLights&&o.enable(10),I.doubleSided&&o.enable(11),I.flipSided&&o.enable(12),I.useDepthPacking&&o.enable(13),I.dithering&&o.enable(14),I.transmission&&o.enable(15),I.sheen&&o.enable(16),I.opaque&&o.enable(17),I.pointsUvs&&o.enable(18),I.decodeVideoTexture&&o.enable(19),A.push(o.mask)}function P(A){let I=g[A.type],W;if(I){let ie=Ti[I];W=wp.clone(ie.uniforms)}else W=A.uniforms;return W}function F(A,I){let W;for(let ie=0,Me=l.length;ie<Me;ie++){let z=l[ie];if(z.cacheKey===I){W=z,++W.usedTimes;break}}return W===void 0&&(W=new Db(s,I,A,r),l.push(W)),W}function D(A){if(--A.usedTimes===0){let I=l.indexOf(A);l[I]=l[l.length-1],l.pop(),A.destroy()}}function N(A){c.remove(A)}function Y(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:P,acquireProgram:F,releaseProgram:D,releaseShaderCache:N,programs:l,dispose:Y}}function Fb(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Ob(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Cu(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Pu(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,f,p,g,x,m){let d=s[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},s[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=x,d.group=m),e++,d}function o(u,f,p,g,x,m){let d=a(u,f,p,g,x,m);p.transmission>0?n.push(d):p.transparent===!0?i.push(d):t.push(d)}function c(u,f,p,g,x,m){let d=a(u,f,p,g,x,m);p.transmission>0?n.unshift(d):p.transparent===!0?i.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||Ob),n.length>1&&n.sort(f||Cu),i.length>1&&i.sort(f||Cu)}function h(){for(let u=e,f=s.length;u<f;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:h,sort:l}}function Bb(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new Pu,s.set(n,[a])):i>=r.length?(a=new Pu,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function kb(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Ue};break;case"SpotLight":t={position:new B,direction:new B,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new B,halfWidth:new B,halfHeight:new B};break}return s[e.id]=t,t}}}function zb(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Hb=0;function Gb(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Vb(s,e){let t=new kb,n=zb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new B);let r=new B,a=new dt,o=new dt;function c(h,u){let f=0,p=0,g=0;for(let ie=0;ie<9;ie++)i.probe[ie].set(0,0,0);let x=0,m=0,d=0,S=0,v=0,P=0,F=0,D=0,N=0,Y=0,A=0;h.sort(Gb);let I=u===!0?Math.PI:1;for(let ie=0,Me=h.length;ie<Me;ie++){let z=h[ie],X=z.color,ne=z.intensity,le=z.distance,oe=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)f+=X.r*ne*I,p+=X.g*ne*I,g+=X.b*ne*I;else if(z.isLightProbe){for(let re=0;re<9;re++)i.probe[re].addScaledVector(z.sh.coefficients[re],ne);A++}else if(z.isDirectionalLight){let re=t.get(z);if(re.color.copy(z.color).multiplyScalar(z.intensity*I),z.castShadow){let ge=z.shadow,ve=n.get(z);ve.shadowBias=ge.bias,ve.shadowNormalBias=ge.normalBias,ve.shadowRadius=ge.radius,ve.shadowMapSize=ge.mapSize,i.directionalShadow[x]=ve,i.directionalShadowMap[x]=oe,i.directionalShadowMatrix[x]=z.shadow.matrix,P++}i.directional[x]=re,x++}else if(z.isSpotLight){let re=t.get(z);re.position.setFromMatrixPosition(z.matrixWorld),re.color.copy(X).multiplyScalar(ne*I),re.distance=le,re.coneCos=Math.cos(z.angle),re.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),re.decay=z.decay,i.spot[d]=re;let ge=z.shadow;if(z.map&&(i.spotLightMap[N]=z.map,N++,ge.updateMatrices(z),z.castShadow&&Y++),i.spotLightMatrix[d]=ge.matrix,z.castShadow){let ve=n.get(z);ve.shadowBias=ge.bias,ve.shadowNormalBias=ge.normalBias,ve.shadowRadius=ge.radius,ve.shadowMapSize=ge.mapSize,i.spotShadow[d]=ve,i.spotShadowMap[d]=oe,D++}d++}else if(z.isRectAreaLight){let re=t.get(z);re.color.copy(X).multiplyScalar(ne),re.halfWidth.set(z.width*.5,0,0),re.halfHeight.set(0,z.height*.5,0),i.rectArea[S]=re,S++}else if(z.isPointLight){let re=t.get(z);if(re.color.copy(z.color).multiplyScalar(z.intensity*I),re.distance=z.distance,re.decay=z.decay,z.castShadow){let ge=z.shadow,ve=n.get(z);ve.shadowBias=ge.bias,ve.shadowNormalBias=ge.normalBias,ve.shadowRadius=ge.radius,ve.shadowMapSize=ge.mapSize,ve.shadowCameraNear=ge.camera.near,ve.shadowCameraFar=ge.camera.far,i.pointShadow[m]=ve,i.pointShadowMap[m]=oe,i.pointShadowMatrix[m]=z.shadow.matrix,F++}i.point[m]=re,m++}else if(z.isHemisphereLight){let re=t.get(z);re.skyColor.copy(z.color).multiplyScalar(ne*I),re.groundColor.copy(z.groundColor).multiplyScalar(ne*I),i.hemi[v]=re,v++}}S>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Te.LTC_FLOAT_1,i.rectAreaLTC2=Te.LTC_FLOAT_2):(i.rectAreaLTC1=Te.LTC_HALF_1,i.rectAreaLTC2=Te.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Te.LTC_FLOAT_1,i.rectAreaLTC2=Te.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=Te.LTC_HALF_1,i.rectAreaLTC2=Te.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=g;let W=i.hash;(W.directionalLength!==x||W.pointLength!==m||W.spotLength!==d||W.rectAreaLength!==S||W.hemiLength!==v||W.numDirectionalShadows!==P||W.numPointShadows!==F||W.numSpotShadows!==D||W.numSpotMaps!==N||W.numLightProbes!==A)&&(i.directional.length=x,i.spot.length=d,i.rectArea.length=S,i.point.length=m,i.hemi.length=v,i.directionalShadow.length=P,i.directionalShadowMap.length=P,i.pointShadow.length=F,i.pointShadowMap.length=F,i.spotShadow.length=D,i.spotShadowMap.length=D,i.directionalShadowMatrix.length=P,i.pointShadowMatrix.length=F,i.spotLightMatrix.length=D+N-Y,i.spotLightMap.length=N,i.numSpotLightShadowsWithMaps=Y,i.numLightProbes=A,W.directionalLength=x,W.pointLength=m,W.spotLength=d,W.rectAreaLength=S,W.hemiLength=v,W.numDirectionalShadows=P,W.numPointShadows=F,W.numSpotShadows=D,W.numSpotMaps=N,W.numLightProbes=A,i.version=Hb++)}function l(h,u){let f=0,p=0,g=0,x=0,m=0,d=u.matrixWorldInverse;for(let S=0,v=h.length;S<v;S++){let P=h[S];if(P.isDirectionalLight){let F=i.directional[f];F.direction.setFromMatrixPosition(P.matrixWorld),r.setFromMatrixPosition(P.target.matrixWorld),F.direction.sub(r),F.direction.transformDirection(d),f++}else if(P.isSpotLight){let F=i.spot[g];F.position.setFromMatrixPosition(P.matrixWorld),F.position.applyMatrix4(d),F.direction.setFromMatrixPosition(P.matrixWorld),r.setFromMatrixPosition(P.target.matrixWorld),F.direction.sub(r),F.direction.transformDirection(d),g++}else if(P.isRectAreaLight){let F=i.rectArea[x];F.position.setFromMatrixPosition(P.matrixWorld),F.position.applyMatrix4(d),o.identity(),a.copy(P.matrixWorld),a.premultiply(d),o.extractRotation(a),F.halfWidth.set(P.width*.5,0,0),F.halfHeight.set(0,P.height*.5,0),F.halfWidth.applyMatrix4(o),F.halfHeight.applyMatrix4(o),x++}else if(P.isPointLight){let F=i.point[p];F.position.setFromMatrixPosition(P.matrixWorld),F.position.applyMatrix4(d),p++}else if(P.isHemisphereLight){let F=i.hemi[m];F.direction.setFromMatrixPosition(P.matrixWorld),F.direction.transformDirection(d),m++}}}return{setup:c,setupView:l,state:i}}function Lu(s,e){let t=new Vb(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Wb(s,e){let t=new WeakMap;function n(r,a=0){let o=t.get(r),c;return o===void 0?(c=new Lu(s,e),t.set(r,[c])):a>=o.length?(c=new Lu(s,e),o.push(c)):c=o[a],c}function i(){t=new WeakMap}return{get:n,dispose:i}}var el=class extends Xn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},tl=class extends Xn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Xb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qb=`uniform sampler2D shadow_pass;
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
}`;function jb(s,e,t){let n=new fa,i=new He,r=new He,a=new Ct,o=new el({depthPacking:kd}),c=new tl,l={},h=t.maxTextureSize,u={[Ci]:Cn,[Cn]:Ci,[Rn]:Rn},f=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:Xb,fragmentShader:qb}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new Zt;g.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ze(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ho;let d=this.type;this.render=function(D,N,Y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||D.length===0)return;let A=s.getRenderTarget(),I=s.getActiveCubeFace(),W=s.getActiveMipmapLevel(),ie=s.state;ie.setBlending(ls),ie.buffers.color.setClear(1,1,1,1),ie.buffers.depth.setTest(!0),ie.setScissorTest(!1);let Me=d!==Gi&&this.type===Gi,z=d===Gi&&this.type!==Gi;for(let X=0,ne=D.length;X<ne;X++){let le=D[X],oe=le.shadow;if(oe===void 0){console.warn("THREE.WebGLShadowMap:",le,"has no shadow.");continue}if(oe.autoUpdate===!1&&oe.needsUpdate===!1)continue;i.copy(oe.mapSize);let re=oe.getFrameExtents();if(i.multiply(re),r.copy(oe.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/re.x),i.x=r.x*re.x,oe.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/re.y),i.y=r.y*re.y,oe.mapSize.y=r.y)),oe.map===null||Me===!0||z===!0){let ve=this.type!==Gi?{minFilter:yn,magFilter:yn}:{};oe.map!==null&&oe.map.dispose(),oe.map=new vi(i.x,i.y,ve),oe.map.texture.name=le.name+".shadowMap",oe.camera.updateProjectionMatrix()}s.setRenderTarget(oe.map),s.clear();let ge=oe.getViewportCount();for(let ve=0;ve<ge;ve++){let Ie=oe.getViewport(ve);a.set(r.x*Ie.x,r.y*Ie.y,r.x*Ie.z,r.y*Ie.w),ie.viewport(a),oe.updateMatrices(le,ve),n=oe.getFrustum(),P(N,Y,oe.camera,le,this.type)}oe.isPointLightShadow!==!0&&this.type===Gi&&S(oe,Y),oe.needsUpdate=!1}d=this.type,m.needsUpdate=!1,s.setRenderTarget(A,I,W)};function S(D,N){let Y=e.update(x);f.defines.VSM_SAMPLES!==D.blurSamples&&(f.defines.VSM_SAMPLES=D.blurSamples,p.defines.VSM_SAMPLES=D.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new vi(i.x,i.y)),f.uniforms.shadow_pass.value=D.map.texture,f.uniforms.resolution.value=D.mapSize,f.uniforms.radius.value=D.radius,s.setRenderTarget(D.mapPass),s.clear(),s.renderBufferDirect(N,null,Y,f,x,null),p.uniforms.shadow_pass.value=D.mapPass.texture,p.uniforms.resolution.value=D.mapSize,p.uniforms.radius.value=D.radius,s.setRenderTarget(D.map),s.clear(),s.renderBufferDirect(N,null,Y,p,x,null)}function v(D,N,Y,A){let I=null,W=Y.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(W!==void 0)I=W;else if(I=Y.isPointLight===!0?c:o,s.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){let ie=I.uuid,Me=N.uuid,z=l[ie];z===void 0&&(z={},l[ie]=z);let X=z[Me];X===void 0&&(X=I.clone(),z[Me]=X,N.addEventListener("dispose",F)),I=X}if(I.visible=N.visible,I.wireframe=N.wireframe,A===Gi?I.side=N.shadowSide!==null?N.shadowSide:N.side:I.side=N.shadowSide!==null?N.shadowSide:u[N.side],I.alphaMap=N.alphaMap,I.alphaTest=N.alphaTest,I.map=N.map,I.clipShadows=N.clipShadows,I.clippingPlanes=N.clippingPlanes,I.clipIntersection=N.clipIntersection,I.displacementMap=N.displacementMap,I.displacementScale=N.displacementScale,I.displacementBias=N.displacementBias,I.wireframeLinewidth=N.wireframeLinewidth,I.linewidth=N.linewidth,Y.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let ie=s.properties.get(I);ie.light=Y}return I}function P(D,N,Y,A,I){if(D.visible===!1)return;if(D.layers.test(N.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&I===Gi)&&(!D.frustumCulled||n.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,D.matrixWorld);let Me=e.update(D),z=D.material;if(Array.isArray(z)){let X=Me.groups;for(let ne=0,le=X.length;ne<le;ne++){let oe=X[ne],re=z[oe.materialIndex];if(re&&re.visible){let ge=v(D,re,A,I);D.onBeforeShadow(s,D,N,Y,Me,ge,oe),s.renderBufferDirect(Y,null,Me,ge,D,oe),D.onAfterShadow(s,D,N,Y,Me,ge,oe)}}}else if(z.visible){let X=v(D,z,A,I);D.onBeforeShadow(s,D,N,Y,Me,X,null),s.renderBufferDirect(Y,null,Me,X,D,null),D.onAfterShadow(s,D,N,Y,Me,X,null)}}let ie=D.children;for(let Me=0,z=ie.length;Me<z;Me++)P(ie[Me],N,Y,A,I)}function F(D){D.target.removeEventListener("dispose",F);for(let Y in l){let A=l[Y],I=D.target.uuid;I in A&&(A[I].dispose(),delete A[I])}}}function Yb(s,e,t){let n=t.isWebGL2;function i(){let O=!1,Ae=new Ct,Pe=null,nt=new Ct(0,0,0,0);return{setMask:function(et){Pe!==et&&!O&&(s.colorMask(et,et,et,et),Pe=et)},setLocked:function(et){O=et},setClear:function(et,Nt,Bt,Gt,qt){qt===!0&&(et*=Gt,Nt*=Gt,Bt*=Gt),Ae.set(et,Nt,Bt,Gt),nt.equals(Ae)===!1&&(s.clearColor(et,Nt,Bt,Gt),nt.copy(Ae))},reset:function(){O=!1,Pe=null,nt.set(-1,0,0,0)}}}function r(){let O=!1,Ae=null,Pe=null,nt=null;return{setTest:function(et){et?xt(s.DEPTH_TEST):at(s.DEPTH_TEST)},setMask:function(et){Ae!==et&&!O&&(s.depthMask(et),Ae=et)},setFunc:function(et){if(Pe!==et){switch(et){case ud:s.depthFunc(s.NEVER);break;case fd:s.depthFunc(s.ALWAYS);break;case dd:s.depthFunc(s.LESS);break;case ho:s.depthFunc(s.LEQUAL);break;case pd:s.depthFunc(s.EQUAL);break;case md:s.depthFunc(s.GEQUAL);break;case gd:s.depthFunc(s.GREATER);break;case bd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Pe=et}},setLocked:function(et){O=et},setClear:function(et){nt!==et&&(s.clearDepth(et),nt=et)},reset:function(){O=!1,Ae=null,Pe=null,nt=null}}}function a(){let O=!1,Ae=null,Pe=null,nt=null,et=null,Nt=null,Bt=null,Gt=null,qt=null;return{setTest:function(Vt){O||(Vt?xt(s.STENCIL_TEST):at(s.STENCIL_TEST))},setMask:function(Vt){Ae!==Vt&&!O&&(s.stencilMask(Vt),Ae=Vt)},setFunc:function(Vt,_n,ni){(Pe!==Vt||nt!==_n||et!==ni)&&(s.stencilFunc(Vt,_n,ni),Pe=Vt,nt=_n,et=ni)},setOp:function(Vt,_n,ni){(Nt!==Vt||Bt!==_n||Gt!==ni)&&(s.stencilOp(Vt,_n,ni),Nt=Vt,Bt=_n,Gt=ni)},setLocked:function(Vt){O=Vt},setClear:function(Vt){qt!==Vt&&(s.clearStencil(Vt),qt=Vt)},reset:function(){O=!1,Ae=null,Pe=null,nt=null,et=null,Nt=null,Bt=null,Gt=null,qt=null}}}let o=new i,c=new r,l=new a,h=new WeakMap,u=new WeakMap,f={},p={},g=new WeakMap,x=[],m=null,d=!1,S=null,v=null,P=null,F=null,D=null,N=null,Y=null,A=new Ue(0,0,0),I=0,W=!1,ie=null,Me=null,z=null,X=null,ne=null,le=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),oe=!1,re=0,ge=s.getParameter(s.VERSION);ge.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(ge)[1]),oe=re>=1):ge.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(ge)[1]),oe=re>=2);let ve=null,Ie={},$=s.getParameter(s.SCISSOR_BOX),ue=s.getParameter(s.VIEWPORT),we=new Ct().fromArray($),Ve=new Ct().fromArray(ue);function je(O,Ae,Pe,nt){let et=new Uint8Array(4),Nt=s.createTexture();s.bindTexture(O,Nt),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Bt=0;Bt<Pe;Bt++)n&&(O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY)?s.texImage3D(Ae,0,s.RGBA,1,1,nt,0,s.RGBA,s.UNSIGNED_BYTE,et):s.texImage2D(Ae+Bt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,et);return Nt}let ht={};ht[s.TEXTURE_2D]=je(s.TEXTURE_2D,s.TEXTURE_2D,1),ht[s.TEXTURE_CUBE_MAP]=je(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(ht[s.TEXTURE_2D_ARRAY]=je(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ht[s.TEXTURE_3D]=je(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),xt(s.DEPTH_TEST),c.setFunc(ho),bt(!1),L(mh),xt(s.CULL_FACE),Fe(ls);function xt(O){f[O]!==!0&&(s.enable(O),f[O]=!0)}function at(O){f[O]!==!1&&(s.disable(O),f[O]=!1)}function Dt(O,Ae){return p[O]!==Ae?(s.bindFramebuffer(O,Ae),p[O]=Ae,n&&(O===s.DRAW_FRAMEBUFFER&&(p[s.FRAMEBUFFER]=Ae),O===s.FRAMEBUFFER&&(p[s.DRAW_FRAMEBUFFER]=Ae)),!0):!1}function K(O,Ae){let Pe=x,nt=!1;if(O)if(Pe=g.get(Ae),Pe===void 0&&(Pe=[],g.set(Ae,Pe)),O.isWebGLMultipleRenderTargets){let et=O.texture;if(Pe.length!==et.length||Pe[0]!==s.COLOR_ATTACHMENT0){for(let Nt=0,Bt=et.length;Nt<Bt;Nt++)Pe[Nt]=s.COLOR_ATTACHMENT0+Nt;Pe.length=et.length,nt=!0}}else Pe[0]!==s.COLOR_ATTACHMENT0&&(Pe[0]=s.COLOR_ATTACHMENT0,nt=!0);else Pe[0]!==s.BACK&&(Pe[0]=s.BACK,nt=!0);nt&&(t.isWebGL2?s.drawBuffers(Pe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Pe))}function En(O){return m!==O?(s.useProgram(O),m=O,!0):!1}let tt={[Is]:s.FUNC_ADD,[Jf]:s.FUNC_SUBTRACT,[Zf]:s.FUNC_REVERSE_SUBTRACT};if(n)tt[_h]=s.MIN,tt[xh]=s.MAX;else{let O=e.get("EXT_blend_minmax");O!==null&&(tt[_h]=O.MIN_EXT,tt[xh]=O.MAX_EXT)}let pt={[Qf]:s.ZERO,[$f]:s.ONE,[ed]:s.SRC_COLOR,[Oc]:s.SRC_ALPHA,[ad]:s.SRC_ALPHA_SATURATE,[sd]:s.DST_COLOR,[nd]:s.DST_ALPHA,[td]:s.ONE_MINUS_SRC_COLOR,[Bc]:s.ONE_MINUS_SRC_ALPHA,[rd]:s.ONE_MINUS_DST_COLOR,[id]:s.ONE_MINUS_DST_ALPHA,[od]:s.CONSTANT_COLOR,[cd]:s.ONE_MINUS_CONSTANT_COLOR,[ld]:s.CONSTANT_ALPHA,[hd]:s.ONE_MINUS_CONSTANT_ALPHA};function Fe(O,Ae,Pe,nt,et,Nt,Bt,Gt,qt,Vt){if(O===ls){d===!0&&(at(s.BLEND),d=!1);return}if(d===!1&&(xt(s.BLEND),d=!0),O!==Kf){if(O!==S||Vt!==W){if((v!==Is||D!==Is)&&(s.blendEquation(s.FUNC_ADD),v=Is,D=Is),Vt)switch(O){case _r:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case lo:s.blendFunc(s.ONE,s.ONE);break;case gh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case bh:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case _r:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case lo:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case gh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case bh:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}P=null,F=null,N=null,Y=null,A.set(0,0,0),I=0,S=O,W=Vt}return}et=et||Ae,Nt=Nt||Pe,Bt=Bt||nt,(Ae!==v||et!==D)&&(s.blendEquationSeparate(tt[Ae],tt[et]),v=Ae,D=et),(Pe!==P||nt!==F||Nt!==N||Bt!==Y)&&(s.blendFuncSeparate(pt[Pe],pt[nt],pt[Nt],pt[Bt]),P=Pe,F=nt,N=Nt,Y=Bt),(Gt.equals(A)===!1||qt!==I)&&(s.blendColor(Gt.r,Gt.g,Gt.b,qt),A.copy(Gt),I=qt),S=O,W=!1}function en(O,Ae){O.side===Rn?at(s.CULL_FACE):xt(s.CULL_FACE);let Pe=O.side===Cn;Ae&&(Pe=!Pe),bt(Pe),O.blending===_r&&O.transparent===!1?Fe(ls):Fe(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),c.setFunc(O.depthFunc),c.setTest(O.depthTest),c.setMask(O.depthWrite),o.setMask(O.colorWrite);let nt=O.stencilWrite;l.setTest(nt),nt&&(l.setMask(O.stencilWriteMask),l.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),l.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),J(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?xt(s.SAMPLE_ALPHA_TO_COVERAGE):at(s.SAMPLE_ALPHA_TO_COVERAGE)}function bt(O){ie!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),ie=O)}function L(O){O!==qf?(xt(s.CULL_FACE),O!==Me&&(O===mh?s.cullFace(s.BACK):O===jf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):at(s.CULL_FACE),Me=O}function E(O){O!==z&&(oe&&s.lineWidth(O),z=O)}function J(O,Ae,Pe){O?(xt(s.POLYGON_OFFSET_FILL),(X!==Ae||ne!==Pe)&&(s.polygonOffset(Ae,Pe),X=Ae,ne=Pe)):at(s.POLYGON_OFFSET_FILL)}function be(O){O?xt(s.SCISSOR_TEST):at(s.SCISSOR_TEST)}function he(O){O===void 0&&(O=s.TEXTURE0+le-1),ve!==O&&(s.activeTexture(O),ve=O)}function me(O,Ae,Pe){Pe===void 0&&(ve===null?Pe=s.TEXTURE0+le-1:Pe=ve);let nt=Ie[Pe];nt===void 0&&(nt={type:void 0,texture:void 0},Ie[Pe]=nt),(nt.type!==O||nt.texture!==Ae)&&(ve!==Pe&&(s.activeTexture(Pe),ve=Pe),s.bindTexture(O,Ae||ht[O]),nt.type=O,nt.texture=Ae)}function Be(){let O=Ie[ve];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Re(){try{s.compressedTexImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ne(){try{s.compressedTexImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Qe(){try{s.texSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function yt(){try{s.texSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function fe(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ee(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ke(){try{s.texStorage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Oe(){try{s.texStorage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function We(){try{s.texImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function se(){try{s.texImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ut(O){we.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),we.copy(O))}function At(O){Ve.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),Ve.copy(O))}function kt(O,Ae){let Pe=u.get(Ae);Pe===void 0&&(Pe=new WeakMap,u.set(Ae,Pe));let nt=Pe.get(O);nt===void 0&&(nt=s.getUniformBlockIndex(Ae,O.name),Pe.set(O,nt))}function ft(O,Ae){let nt=u.get(Ae).get(O);h.get(Ae)!==nt&&(s.uniformBlockBinding(Ae,nt,O.__bindingPointIndex),h.set(Ae,nt))}function xe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},ve=null,Ie={},p={},g=new WeakMap,x=[],m=null,d=!1,S=null,v=null,P=null,F=null,D=null,N=null,Y=null,A=new Ue(0,0,0),I=0,W=!1,ie=null,Me=null,z=null,X=null,ne=null,we.set(0,0,s.canvas.width,s.canvas.height),Ve.set(0,0,s.canvas.width,s.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:xt,disable:at,bindFramebuffer:Dt,drawBuffers:K,useProgram:En,setBlending:Fe,setMaterial:en,setFlipSided:bt,setCullFace:L,setLineWidth:E,setPolygonOffset:J,setScissorTest:be,activeTexture:he,bindTexture:me,unbindTexture:Be,compressedTexImage2D:Re,compressedTexImage3D:Ne,texImage2D:We,texImage3D:se,updateUBOMapping:kt,uniformBlockBinding:ft,texStorage2D:ke,texStorage3D:Oe,texSubImage2D:Qe,texSubImage3D:yt,compressedTexSubImage2D:fe,compressedTexSubImage3D:Ee,scissor:ut,viewport:At,reset:xe}}function Kb(s,e,t,n,i,r,a){let o=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,E){return p?new OffscreenCanvas(L,E):ua("canvas")}function x(L,E,J,be){let he=1;if((L.width>be||L.height>be)&&(he=be/Math.max(L.width,L.height)),he<1||E===!0)if(typeof HTMLImageElement!="undefined"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&L instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&L instanceof ImageBitmap){let me=E?_o:Math.floor,Be=me(he*L.width),Re=me(he*L.height);u===void 0&&(u=g(Be,Re));let Ne=J?g(Be,Re):u;return Ne.width=Be,Ne.height=Re,Ne.getContext("2d").drawImage(L,0,0,Be,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+Be+"x"+Re+")."),Ne}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function m(L){return Vc(L.width)&&Vc(L.height)}function d(L){return o?!1:L.wrapS!==ti||L.wrapT!==ti||L.minFilter!==yn&&L.minFilter!==Tn}function S(L,E){return L.generateMipmaps&&E&&L.minFilter!==yn&&L.minFilter!==Tn}function v(L){s.generateMipmap(L)}function P(L,E,J,be,he=!1){if(o===!1)return E;if(L!==null){if(s[L]!==void 0)return s[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let me=E;if(E===s.RED&&(J===s.FLOAT&&(me=s.R32F),J===s.HALF_FLOAT&&(me=s.R16F),J===s.UNSIGNED_BYTE&&(me=s.R8)),E===s.RED_INTEGER&&(J===s.UNSIGNED_BYTE&&(me=s.R8UI),J===s.UNSIGNED_SHORT&&(me=s.R16UI),J===s.UNSIGNED_INT&&(me=s.R32UI),J===s.BYTE&&(me=s.R8I),J===s.SHORT&&(me=s.R16I),J===s.INT&&(me=s.R32I)),E===s.RG&&(J===s.FLOAT&&(me=s.RG32F),J===s.HALF_FLOAT&&(me=s.RG16F),J===s.UNSIGNED_BYTE&&(me=s.RG8)),E===s.RGBA){let Be=he?po:Ot.getTransfer(be);J===s.FLOAT&&(me=s.RGBA32F),J===s.HALF_FLOAT&&(me=s.RGBA16F),J===s.UNSIGNED_BYTE&&(me=Be===an?s.SRGB8_ALPHA8:s.RGBA8),J===s.UNSIGNED_SHORT_4_4_4_4&&(me=s.RGBA4),J===s.UNSIGNED_SHORT_5_5_5_1&&(me=s.RGB5_A1)}return(me===s.R16F||me===s.R32F||me===s.RG16F||me===s.RG32F||me===s.RGBA16F||me===s.RGBA32F)&&e.get("EXT_color_buffer_float"),me}function F(L,E,J){return S(L,J)===!0||L.isFramebufferTexture&&L.minFilter!==yn&&L.minFilter!==Tn?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function D(L){return L===yn||L===uo||L===sa?s.NEAREST:s.LINEAR}function N(L){let E=L.target;E.removeEventListener("dispose",N),A(E),E.isVideoTexture&&h.delete(E)}function Y(L){let E=L.target;E.removeEventListener("dispose",Y),W(E)}function A(L){let E=n.get(L);if(E.__webglInit===void 0)return;let J=L.source,be=f.get(J);if(be){let he=be[E.__cacheKey];he.usedTimes--,he.usedTimes===0&&I(L),Object.keys(be).length===0&&f.delete(J)}n.remove(L)}function I(L){let E=n.get(L);s.deleteTexture(E.__webglTexture);let J=L.source,be=f.get(J);delete be[E.__cacheKey],a.memory.textures--}function W(L){let E=L.texture,J=n.get(L),be=n.get(E);if(be.__webglTexture!==void 0&&(s.deleteTexture(be.__webglTexture),a.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let he=0;he<6;he++){if(Array.isArray(J.__webglFramebuffer[he]))for(let me=0;me<J.__webglFramebuffer[he].length;me++)s.deleteFramebuffer(J.__webglFramebuffer[he][me]);else s.deleteFramebuffer(J.__webglFramebuffer[he]);J.__webglDepthbuffer&&s.deleteRenderbuffer(J.__webglDepthbuffer[he])}else{if(Array.isArray(J.__webglFramebuffer))for(let he=0;he<J.__webglFramebuffer.length;he++)s.deleteFramebuffer(J.__webglFramebuffer[he]);else s.deleteFramebuffer(J.__webglFramebuffer);if(J.__webglDepthbuffer&&s.deleteRenderbuffer(J.__webglDepthbuffer),J.__webglMultisampledFramebuffer&&s.deleteFramebuffer(J.__webglMultisampledFramebuffer),J.__webglColorRenderbuffer)for(let he=0;he<J.__webglColorRenderbuffer.length;he++)J.__webglColorRenderbuffer[he]&&s.deleteRenderbuffer(J.__webglColorRenderbuffer[he]);J.__webglDepthRenderbuffer&&s.deleteRenderbuffer(J.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let he=0,me=E.length;he<me;he++){let Be=n.get(E[he]);Be.__webglTexture&&(s.deleteTexture(Be.__webglTexture),a.memory.textures--),n.remove(E[he])}n.remove(E),n.remove(L)}let ie=0;function Me(){ie=0}function z(){let L=ie;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),ie+=1,L}function X(L){let E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.colorSpace),E.join()}function ne(L,E){let J=n.get(L);if(L.isVideoTexture&&en(L),L.isRenderTargetTexture===!1&&L.version>0&&J.__version!==L.version){let be=L.image;if(be===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(be.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{we(J,L,E);return}}t.bindTexture(s.TEXTURE_2D,J.__webglTexture,s.TEXTURE0+E)}function le(L,E){let J=n.get(L);if(L.version>0&&J.__version!==L.version){we(J,L,E);return}t.bindTexture(s.TEXTURE_2D_ARRAY,J.__webglTexture,s.TEXTURE0+E)}function oe(L,E){let J=n.get(L);if(L.version>0&&J.__version!==L.version){we(J,L,E);return}t.bindTexture(s.TEXTURE_3D,J.__webglTexture,s.TEXTURE0+E)}function re(L,E){let J=n.get(L);if(L.version>0&&J.__version!==L.version){Ve(J,L,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture,s.TEXTURE0+E)}let ge={[qi]:s.REPEAT,[ti]:s.CLAMP_TO_EDGE,[la]:s.MIRRORED_REPEAT},ve={[yn]:s.NEAREST,[uo]:s.NEAREST_MIPMAP_NEAREST,[sa]:s.NEAREST_MIPMAP_LINEAR,[Tn]:s.LINEAR,[yl]:s.LINEAR_MIPMAP_NEAREST,[fs]:s.LINEAR_MIPMAP_LINEAR},Ie={[Hd]:s.NEVER,[jd]:s.ALWAYS,[Gd]:s.LESS,[hf]:s.LEQUAL,[Vd]:s.EQUAL,[qd]:s.GEQUAL,[Wd]:s.GREATER,[Xd]:s.NOTEQUAL};function $(L,E,J){if(J?(s.texParameteri(L,s.TEXTURE_WRAP_S,ge[E.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,ge[E.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,ge[E.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,ve[E.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,ve[E.minFilter])):(s.texParameteri(L,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(L,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(E.wrapS!==ti||E.wrapT!==ti)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(L,s.TEXTURE_MAG_FILTER,D(E.magFilter)),s.texParameteri(L,s.TEXTURE_MIN_FILTER,D(E.minFilter)),E.minFilter!==yn&&E.minFilter!==Tn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,Ie[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let be=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===yn||E.minFilter!==sa&&E.minFilter!==fs||E.type===Wi&&e.has("OES_texture_float_linear")===!1||o===!1&&E.type===ha&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||n.get(E).__currentAnisotropy)&&(s.texParameterf(L,be.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy)}}function ue(L,E){let J=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",N));let be=E.source,he=f.get(be);he===void 0&&(he={},f.set(be,he));let me=X(E);if(me!==L.__cacheKey){he[me]===void 0&&(he[me]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,J=!0),he[me].usedTimes++;let Be=he[L.__cacheKey];Be!==void 0&&(he[L.__cacheKey].usedTimes--,Be.usedTimes===0&&I(E)),L.__cacheKey=me,L.__webglTexture=he[me].texture}return J}function we(L,E,J){let be=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(be=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(be=s.TEXTURE_3D);let he=ue(L,E),me=E.source;t.bindTexture(be,L.__webglTexture,s.TEXTURE0+J);let Be=n.get(me);if(me.version!==Be.__version||he===!0){t.activeTexture(s.TEXTURE0+J);let Re=Ot.getPrimaries(Ot.workingColorSpace),Ne=E.colorSpace===ci?null:Ot.getPrimaries(E.colorSpace),Qe=E.colorSpace===ci||Re===Ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);let yt=d(E)&&m(E.image)===!1,fe=x(E.image,yt,!1,i.maxTextureSize);fe=bt(E,fe);let Ee=m(fe)||o,ke=r.convert(E.format,E.colorSpace),Oe=r.convert(E.type),We=P(E.internalFormat,ke,Oe,E.colorSpace,E.isVideoTexture);$(be,E,Ee);let se,ut=E.mipmaps,At=o&&E.isVideoTexture!==!0&&We!==of,kt=Be.__version===void 0||he===!0,ft=F(E,fe,Ee);if(E.isDepthTexture)We=s.DEPTH_COMPONENT,o?E.type===Wi?We=s.DEPTH_COMPONENT32F:E.type===os?We=s.DEPTH_COMPONENT24:E.type===Us?We=s.DEPTH24_STENCIL8:We=s.DEPTH_COMPONENT16:E.type===Wi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Fs&&We===s.DEPTH_COMPONENT&&E.type!==Ml&&E.type!==os&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=os,Oe=r.convert(E.type)),E.format===Sr&&We===s.DEPTH_COMPONENT&&(We=s.DEPTH_STENCIL,E.type!==Us&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=Us,Oe=r.convert(E.type))),kt&&(At?t.texStorage2D(s.TEXTURE_2D,1,We,fe.width,fe.height):t.texImage2D(s.TEXTURE_2D,0,We,fe.width,fe.height,0,ke,Oe,null));else if(E.isDataTexture)if(ut.length>0&&Ee){At&&kt&&t.texStorage2D(s.TEXTURE_2D,ft,We,ut[0].width,ut[0].height);for(let xe=0,O=ut.length;xe<O;xe++)se=ut[xe],At?t.texSubImage2D(s.TEXTURE_2D,xe,0,0,se.width,se.height,ke,Oe,se.data):t.texImage2D(s.TEXTURE_2D,xe,We,se.width,se.height,0,ke,Oe,se.data);E.generateMipmaps=!1}else At?(kt&&t.texStorage2D(s.TEXTURE_2D,ft,We,fe.width,fe.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,fe.width,fe.height,ke,Oe,fe.data)):t.texImage2D(s.TEXTURE_2D,0,We,fe.width,fe.height,0,ke,Oe,fe.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){At&&kt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ft,We,ut[0].width,ut[0].height,fe.depth);for(let xe=0,O=ut.length;xe<O;xe++)se=ut[xe],E.format!==oi?ke!==null?At?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,xe,0,0,0,se.width,se.height,fe.depth,ke,se.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,xe,We,se.width,se.height,fe.depth,0,se.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):At?t.texSubImage3D(s.TEXTURE_2D_ARRAY,xe,0,0,0,se.width,se.height,fe.depth,ke,Oe,se.data):t.texImage3D(s.TEXTURE_2D_ARRAY,xe,We,se.width,se.height,fe.depth,0,ke,Oe,se.data)}else{At&&kt&&t.texStorage2D(s.TEXTURE_2D,ft,We,ut[0].width,ut[0].height);for(let xe=0,O=ut.length;xe<O;xe++)se=ut[xe],E.format!==oi?ke!==null?At?t.compressedTexSubImage2D(s.TEXTURE_2D,xe,0,0,se.width,se.height,ke,se.data):t.compressedTexImage2D(s.TEXTURE_2D,xe,We,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):At?t.texSubImage2D(s.TEXTURE_2D,xe,0,0,se.width,se.height,ke,Oe,se.data):t.texImage2D(s.TEXTURE_2D,xe,We,se.width,se.height,0,ke,Oe,se.data)}else if(E.isDataArrayTexture)At?(kt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ft,We,fe.width,fe.height,fe.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,ke,Oe,fe.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,We,fe.width,fe.height,fe.depth,0,ke,Oe,fe.data);else if(E.isData3DTexture)At?(kt&&t.texStorage3D(s.TEXTURE_3D,ft,We,fe.width,fe.height,fe.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,ke,Oe,fe.data)):t.texImage3D(s.TEXTURE_3D,0,We,fe.width,fe.height,fe.depth,0,ke,Oe,fe.data);else if(E.isFramebufferTexture){if(kt)if(At)t.texStorage2D(s.TEXTURE_2D,ft,We,fe.width,fe.height);else{let xe=fe.width,O=fe.height;for(let Ae=0;Ae<ft;Ae++)t.texImage2D(s.TEXTURE_2D,Ae,We,xe,O,0,ke,Oe,null),xe>>=1,O>>=1}}else if(ut.length>0&&Ee){At&&kt&&t.texStorage2D(s.TEXTURE_2D,ft,We,ut[0].width,ut[0].height);for(let xe=0,O=ut.length;xe<O;xe++)se=ut[xe],At?t.texSubImage2D(s.TEXTURE_2D,xe,0,0,ke,Oe,se):t.texImage2D(s.TEXTURE_2D,xe,We,ke,Oe,se);E.generateMipmaps=!1}else At?(kt&&t.texStorage2D(s.TEXTURE_2D,ft,We,fe.width,fe.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,ke,Oe,fe)):t.texImage2D(s.TEXTURE_2D,0,We,ke,Oe,fe);S(E,Ee)&&v(be),Be.__version=me.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function Ve(L,E,J){if(E.image.length!==6)return;let be=ue(L,E),he=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+J);let me=n.get(he);if(he.version!==me.__version||be===!0){t.activeTexture(s.TEXTURE0+J);let Be=Ot.getPrimaries(Ot.workingColorSpace),Re=E.colorSpace===ci?null:Ot.getPrimaries(E.colorSpace),Ne=E.colorSpace===ci||Be===Re?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let Qe=E.isCompressedTexture||E.image[0].isCompressedTexture,yt=E.image[0]&&E.image[0].isDataTexture,fe=[];for(let xe=0;xe<6;xe++)!Qe&&!yt?fe[xe]=x(E.image[xe],!1,!0,i.maxCubemapSize):fe[xe]=yt?E.image[xe].image:E.image[xe],fe[xe]=bt(E,fe[xe]);let Ee=fe[0],ke=m(Ee)||o,Oe=r.convert(E.format,E.colorSpace),We=r.convert(E.type),se=P(E.internalFormat,Oe,We,E.colorSpace),ut=o&&E.isVideoTexture!==!0,At=me.__version===void 0||be===!0,kt=F(E,Ee,ke);$(s.TEXTURE_CUBE_MAP,E,ke);let ft;if(Qe){ut&&At&&t.texStorage2D(s.TEXTURE_CUBE_MAP,kt,se,Ee.width,Ee.height);for(let xe=0;xe<6;xe++){ft=fe[xe].mipmaps;for(let O=0;O<ft.length;O++){let Ae=ft[O];E.format!==oi?Oe!==null?ut?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,O,0,0,Ae.width,Ae.height,Oe,Ae.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,O,se,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ut?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,O,0,0,Ae.width,Ae.height,Oe,We,Ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,O,se,Ae.width,Ae.height,0,Oe,We,Ae.data)}}}else{ft=E.mipmaps,ut&&At&&(ft.length>0&&kt++,t.texStorage2D(s.TEXTURE_CUBE_MAP,kt,se,fe[0].width,fe[0].height));for(let xe=0;xe<6;xe++)if(yt){ut?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,fe[xe].width,fe[xe].height,Oe,We,fe[xe].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,se,fe[xe].width,fe[xe].height,0,Oe,We,fe[xe].data);for(let O=0;O<ft.length;O++){let Pe=ft[O].image[xe].image;ut?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,O+1,0,0,Pe.width,Pe.height,Oe,We,Pe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,O+1,se,Pe.width,Pe.height,0,Oe,We,Pe.data)}}else{ut?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Oe,We,fe[xe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,se,Oe,We,fe[xe]);for(let O=0;O<ft.length;O++){let Ae=ft[O];ut?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,O+1,0,0,Oe,We,Ae.image[xe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,O+1,se,Oe,We,Ae.image[xe])}}}S(E,ke)&&v(s.TEXTURE_CUBE_MAP),me.__version=he.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function je(L,E,J,be,he,me){let Be=r.convert(J.format,J.colorSpace),Re=r.convert(J.type),Ne=P(J.internalFormat,Be,Re,J.colorSpace);if(!n.get(E).__hasExternalTextures){let yt=Math.max(1,E.width>>me),fe=Math.max(1,E.height>>me);he===s.TEXTURE_3D||he===s.TEXTURE_2D_ARRAY?t.texImage3D(he,me,Ne,yt,fe,E.depth,0,Be,Re,null):t.texImage2D(he,me,Ne,yt,fe,0,Be,Re,null)}t.bindFramebuffer(s.FRAMEBUFFER,L),Fe(E)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,be,he,n.get(J).__webglTexture,0,pt(E)):(he===s.TEXTURE_2D||he>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&he<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,be,he,n.get(J).__webglTexture,me),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ht(L,E,J){if(s.bindRenderbuffer(s.RENDERBUFFER,L),E.depthBuffer&&!E.stencilBuffer){let be=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(J||Fe(E)){let he=E.depthTexture;he&&he.isDepthTexture&&(he.type===Wi?be=s.DEPTH_COMPONENT32F:he.type===os&&(be=s.DEPTH_COMPONENT24));let me=pt(E);Fe(E)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,me,be,E.width,E.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,me,be,E.width,E.height)}else s.renderbufferStorage(s.RENDERBUFFER,be,E.width,E.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,L)}else if(E.depthBuffer&&E.stencilBuffer){let be=pt(E);J&&Fe(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,be,s.DEPTH24_STENCIL8,E.width,E.height):Fe(E)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,be,s.DEPTH24_STENCIL8,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,L)}else{let be=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let he=0;he<be.length;he++){let me=be[he],Be=r.convert(me.format,me.colorSpace),Re=r.convert(me.type),Ne=P(me.internalFormat,Be,Re,me.colorSpace),Qe=pt(E);J&&Fe(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Qe,Ne,E.width,E.height):Fe(E)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Qe,Ne,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,Ne,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function xt(L,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),ne(E.depthTexture,0);let be=n.get(E.depthTexture).__webglTexture,he=pt(E);if(E.depthTexture.format===Fs)Fe(E)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,be,0,he):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,be,0);else if(E.depthTexture.format===Sr)Fe(E)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,be,0,he):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,be,0);else throw new Error("Unknown depthTexture format")}function at(L){let E=n.get(L),J=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!E.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");xt(E.__webglFramebuffer,L)}else if(J){E.__webglDepthbuffer=[];for(let be=0;be<6;be++)t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[be]),E.__webglDepthbuffer[be]=s.createRenderbuffer(),ht(E.__webglDepthbuffer[be],L,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=s.createRenderbuffer(),ht(E.__webglDepthbuffer,L,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Dt(L,E,J){let be=n.get(L);E!==void 0&&je(be.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),J!==void 0&&at(L)}function K(L){let E=L.texture,J=n.get(L),be=n.get(E);L.addEventListener("dispose",Y),L.isWebGLMultipleRenderTargets!==!0&&(be.__webglTexture===void 0&&(be.__webglTexture=s.createTexture()),be.__version=E.version,a.memory.textures++);let he=L.isWebGLCubeRenderTarget===!0,me=L.isWebGLMultipleRenderTargets===!0,Be=m(L)||o;if(he){J.__webglFramebuffer=[];for(let Re=0;Re<6;Re++)if(o&&E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer[Re]=[];for(let Ne=0;Ne<E.mipmaps.length;Ne++)J.__webglFramebuffer[Re][Ne]=s.createFramebuffer()}else J.__webglFramebuffer[Re]=s.createFramebuffer()}else{if(o&&E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer=[];for(let Re=0;Re<E.mipmaps.length;Re++)J.__webglFramebuffer[Re]=s.createFramebuffer()}else J.__webglFramebuffer=s.createFramebuffer();if(me)if(i.drawBuffers){let Re=L.texture;for(let Ne=0,Qe=Re.length;Ne<Qe;Ne++){let yt=n.get(Re[Ne]);yt.__webglTexture===void 0&&(yt.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&L.samples>0&&Fe(L)===!1){let Re=me?E:[E];J.__webglMultisampledFramebuffer=s.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Ne=0;Ne<Re.length;Ne++){let Qe=Re[Ne];J.__webglColorRenderbuffer[Ne]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,J.__webglColorRenderbuffer[Ne]);let yt=r.convert(Qe.format,Qe.colorSpace),fe=r.convert(Qe.type),Ee=P(Qe.internalFormat,yt,fe,Qe.colorSpace,L.isXRRenderTarget===!0),ke=pt(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,ke,Ee,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.RENDERBUFFER,J.__webglColorRenderbuffer[Ne])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&(J.__webglDepthRenderbuffer=s.createRenderbuffer(),ht(J.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(he){t.bindTexture(s.TEXTURE_CUBE_MAP,be.__webglTexture),$(s.TEXTURE_CUBE_MAP,E,Be);for(let Re=0;Re<6;Re++)if(o&&E.mipmaps&&E.mipmaps.length>0)for(let Ne=0;Ne<E.mipmaps.length;Ne++)je(J.__webglFramebuffer[Re][Ne],L,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ne);else je(J.__webglFramebuffer[Re],L,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0);S(E,Be)&&v(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){let Re=L.texture;for(let Ne=0,Qe=Re.length;Ne<Qe;Ne++){let yt=Re[Ne],fe=n.get(yt);t.bindTexture(s.TEXTURE_2D,fe.__webglTexture),$(s.TEXTURE_2D,yt,Be),je(J.__webglFramebuffer,L,yt,s.COLOR_ATTACHMENT0+Ne,s.TEXTURE_2D,0),S(yt,Be)&&v(s.TEXTURE_2D)}t.unbindTexture()}else{let Re=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(o?Re=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Re,be.__webglTexture),$(Re,E,Be),o&&E.mipmaps&&E.mipmaps.length>0)for(let Ne=0;Ne<E.mipmaps.length;Ne++)je(J.__webglFramebuffer[Ne],L,E,s.COLOR_ATTACHMENT0,Re,Ne);else je(J.__webglFramebuffer,L,E,s.COLOR_ATTACHMENT0,Re,0);S(E,Be)&&v(Re),t.unbindTexture()}L.depthBuffer&&at(L)}function En(L){let E=m(L)||o,J=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let be=0,he=J.length;be<he;be++){let me=J[be];if(S(me,E)){let Be=L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Re=n.get(me).__webglTexture;t.bindTexture(Be,Re),v(Be),t.unbindTexture()}}}function tt(L){if(o&&L.samples>0&&Fe(L)===!1){let E=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],J=L.width,be=L.height,he=s.COLOR_BUFFER_BIT,me=[],Be=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Re=n.get(L),Ne=L.isWebGLMultipleRenderTargets===!0;if(Ne)for(let Qe=0;Qe<E.length;Qe++)t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Qe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Qe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Qe=0;Qe<E.length;Qe++){me.push(s.COLOR_ATTACHMENT0+Qe),L.depthBuffer&&me.push(Be);let yt=Re.__ignoreDepthValues!==void 0?Re.__ignoreDepthValues:!1;if(yt===!1&&(L.depthBuffer&&(he|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&(he|=s.STENCIL_BUFFER_BIT)),Ne&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Re.__webglColorRenderbuffer[Qe]),yt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Be]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Be])),Ne){let fe=n.get(E[Qe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,fe,0)}s.blitFramebuffer(0,0,J,be,0,0,J,be,he,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,me)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ne)for(let Qe=0;Qe<E.length;Qe++){t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Qe,s.RENDERBUFFER,Re.__webglColorRenderbuffer[Qe]);let yt=n.get(E[Qe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Qe,s.TEXTURE_2D,yt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}}function pt(L){return Math.min(i.maxSamples,L.samples)}function Fe(L){let E=n.get(L);return o&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function en(L){let E=a.render.frame;h.get(L)!==E&&(h.set(L,E),L.update())}function bt(L,E){let J=L.colorSpace,be=L.format,he=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===Gc||J!==Mn&&J!==ci&&(Ot.getTransfer(J)===an?o===!1?e.has("EXT_sRGB")===!0&&be===oi?(L.format=Gc,L.minFilter=Tn,L.generateMipmaps=!1):E=xo.sRGBToLinear(E):(be!==oi||he!==us)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),E}this.allocateTextureUnit=z,this.resetTextureUnits=Me,this.setTexture2D=ne,this.setTexture2DArray=le,this.setTexture3D=oe,this.setTextureCube=re,this.rebindTextures=Dt,this.setupRenderTarget=K,this.updateRenderTargetMipmap=En,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=je,this.useMultisampledRTT=Fe}function Jb(s,e,t){let n=t.isWebGL2;function i(r,a=ci){let o,c=Ot.getTransfer(a);if(r===us)return s.UNSIGNED_BYTE;if(r===tf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===nf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Ad)return s.BYTE;if(r===Td)return s.SHORT;if(r===Ml)return s.UNSIGNED_SHORT;if(r===ef)return s.INT;if(r===os)return s.UNSIGNED_INT;if(r===Wi)return s.FLOAT;if(r===ha)return n?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Rd)return s.ALPHA;if(r===oi)return s.RGBA;if(r===Cd)return s.LUMINANCE;if(r===Pd)return s.LUMINANCE_ALPHA;if(r===Fs)return s.DEPTH_COMPONENT;if(r===Sr)return s.DEPTH_STENCIL;if(r===Gc)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Ld)return s.RED;if(r===sf)return s.RED_INTEGER;if(r===Id)return s.RG;if(r===rf)return s.RG_INTEGER;if(r===af)return s.RGBA_INTEGER;if(r===ic||r===sc||r===rc||r===ac)if(c===an)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===ic)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===sc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===rc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ac)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===ic)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===sc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===rc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ac)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===yh||r===Mh||r===Sh||r===wh)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===yh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Mh)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Sh)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===wh)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===of)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Eh||r===Ah)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Eh)return c===an?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Ah)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Th||r===Rh||r===Ch||r===Ph||r===Lh||r===Ih||r===Dh||r===Nh||r===Uh||r===Fh||r===Oh||r===Bh||r===kh||r===zh)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Th)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Rh)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ch)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ph)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Lh)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ih)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Dh)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Nh)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Uh)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Fh)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Oh)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Bh)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===kh)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===zh)return c===an?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===oc||r===Hh||r===Gh)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===oc)return c===an?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Hh)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Gh)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Dd||r===Vh||r===Wh||r===Xh)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===oc)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Vh)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Wh)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Xh)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Us?n?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}var nl=class extends bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Wn=class extends Jt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Zb={type:"move"},ca=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),d=this._getHandJoint(l,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Zb)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Wn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},il=class extends ji{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,p=null,g=null,x=t.getContextAttributes(),m=null,d=null,S=[],v=[],P=new He,F=null,D=new bn;D.layers.enable(1),D.viewport=new Ct;let N=new bn;N.layers.enable(2),N.viewport=new Ct;let Y=[D,N],A=new nl;A.layers.enable(1),A.layers.enable(2);let I=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ue=S[$];return ue===void 0&&(ue=new ca,S[$]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function($){let ue=S[$];return ue===void 0&&(ue=new ca,S[$]=ue),ue.getGripSpace()},this.getHand=function($){let ue=S[$];return ue===void 0&&(ue=new ca,S[$]=ue),ue.getHandSpace()};function ie($){let ue=v.indexOf($.inputSource);if(ue===-1)return;let we=S[ue];we!==void 0&&(we.update($.inputSource,$.frame,l||a),we.dispatchEvent({type:$.type,data:$.inputSource}))}function Me(){i.removeEventListener("select",ie),i.removeEventListener("selectstart",ie),i.removeEventListener("selectend",ie),i.removeEventListener("squeeze",ie),i.removeEventListener("squeezestart",ie),i.removeEventListener("squeezeend",ie),i.removeEventListener("end",Me),i.removeEventListener("inputsourceschange",z);for(let $=0;$<S.length;$++){let ue=v[$];ue!==null&&(v[$]=null,S[$].disconnect(ue))}I=null,W=null,e.setRenderTarget(m),p=null,f=null,u=null,i=null,d=null,Ie.stop(),n.isPresenting=!1,e.setPixelRatio(F),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",ie),i.addEventListener("selectstart",ie),i.addEventListener("selectend",ie),i.addEventListener("squeeze",ie),i.addEventListener("squeezestart",ie),i.addEventListener("squeezeend",ie),i.addEventListener("end",Me),i.addEventListener("inputsourceschange",z),x.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(P),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let ue={antialias:i.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,t,ue),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new vi(p.framebufferWidth,p.framebufferHeight,{format:oi,type:us,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let ue=null,we=null,Ve=null;x.depth&&(Ve=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=x.stencil?Sr:Fs,we=x.stencil?Us:os);let je={colorFormat:t.RGBA8,depthFormat:Ve,scaleFactor:r};u=new XRWebGLBinding(i,t),f=u.createProjectionLayer(je),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),d=new vi(f.textureWidth,f.textureHeight,{format:oi,type:us,depthTexture:new Ao(f.textureWidth,f.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});let ht=e.properties.get(d);ht.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Ie.setContext(i),Ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function z($){for(let ue=0;ue<$.removed.length;ue++){let we=$.removed[ue],Ve=v.indexOf(we);Ve>=0&&(v[Ve]=null,S[Ve].disconnect(we))}for(let ue=0;ue<$.added.length;ue++){let we=$.added[ue],Ve=v.indexOf(we);if(Ve===-1){for(let ht=0;ht<S.length;ht++)if(ht>=v.length){v.push(we),Ve=ht;break}else if(v[ht]===null){v[ht]=we,Ve=ht;break}if(Ve===-1)break}let je=S[Ve];je&&je.connect(we)}}let X=new B,ne=new B;function le($,ue,we){X.setFromMatrixPosition(ue.matrixWorld),ne.setFromMatrixPosition(we.matrixWorld);let Ve=X.distanceTo(ne),je=ue.projectionMatrix.elements,ht=we.projectionMatrix.elements,xt=je[14]/(je[10]-1),at=je[14]/(je[10]+1),Dt=(je[9]+1)/je[5],K=(je[9]-1)/je[5],En=(je[8]-1)/je[0],tt=(ht[8]+1)/ht[0],pt=xt*En,Fe=xt*tt,en=Ve/(-En+tt),bt=en*-En;ue.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(bt),$.translateZ(en),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();let L=xt+en,E=at+en,J=pt-bt,be=Fe+(Ve-bt),he=Dt*at/E*L,me=K*at/E*L;$.projectionMatrix.makePerspective(J,be,he,me,L,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function oe($,ue){ue===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ue.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;A.near=N.near=D.near=$.near,A.far=N.far=D.far=$.far,(I!==A.near||W!==A.far)&&(i.updateRenderState({depthNear:A.near,depthFar:A.far}),I=A.near,W=A.far);let ue=$.parent,we=A.cameras;oe(A,ue);for(let Ve=0;Ve<we.length;Ve++)oe(we[Ve],ue);we.length===2?le(A,D,N):A.projectionMatrix.copy(D.projectionMatrix),re($,A,ue)};function re($,ue,we){we===null?$.matrix.copy(ue.matrixWorld):($.matrix.copy(we.matrixWorld),$.matrix.invert(),$.matrix.multiply(ue.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ue.projectionMatrix),$.projectionMatrixInverse.copy(ue.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Er*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function($){c=$,f!==null&&(f.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)};let ge=null;function ve($,ue){if(h=ue.getViewerPose(l||a),g=ue,h!==null){let we=h.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let Ve=!1;we.length!==A.cameras.length&&(A.cameras.length=0,Ve=!0);for(let je=0;je<we.length;je++){let ht=we[je],xt=null;if(p!==null)xt=p.getViewport(ht);else{let Dt=u.getViewSubImage(f,ht);xt=Dt.viewport,je===0&&(e.setRenderTargetTextures(d,Dt.colorTexture,f.ignoreDepthValues?void 0:Dt.depthStencilTexture),e.setRenderTarget(d))}let at=Y[je];at===void 0&&(at=new bn,at.layers.enable(je),at.viewport=new Ct,Y[je]=at),at.matrix.fromArray(ht.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(ht.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(xt.x,xt.y,xt.width,xt.height),je===0&&(A.matrix.copy(at.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),Ve===!0&&A.cameras.push(at)}}for(let we=0;we<S.length;we++){let Ve=v[we],je=S[we];Ve!==null&&je!==void 0&&je.update(Ve,ue,l||a)}ge&&ge($,ue),ue.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ue}),g=null}let Ie=new mf;Ie.setAnimationLoop(ve),this.setAnimationLoop=function($){ge=$},this.dispose=function(){}}};function Qb(s,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,pf(s)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function i(m,d,S,v,P){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,P)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),x(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,S,v):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Cn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Cn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let S=e.get(d).envMap;if(S&&(m.envMap.value=S,m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;let v=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*v,t(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,S,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*S,m.scale.value=v*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,S){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Cn&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){let S=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function $b(s,e,t,n){let i={},r={},a=[],o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(S,v){let P=v.program;n.uniformBlockBinding(S,P)}function l(S,v){let P=i[S.id];P===void 0&&(g(S),P=h(S),i[S.id]=P,S.addEventListener("dispose",m));let F=v.program;n.updateUBOMapping(S,F);let D=e.render.frame;r[S.id]!==D&&(f(S),r[S.id]=D)}function h(S){let v=u();S.__bindingPointIndex=v;let P=s.createBuffer(),F=S.__size,D=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,P),s.bufferData(s.UNIFORM_BUFFER,F,D),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,P),P}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){let v=i[S.id],P=S.uniforms,F=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let D=0,N=P.length;D<N;D++){let Y=Array.isArray(P[D])?P[D]:[P[D]];for(let A=0,I=Y.length;A<I;A++){let W=Y[A];if(p(W,D,A,F)===!0){let ie=W.__offset,Me=Array.isArray(W.value)?W.value:[W.value],z=0;for(let X=0;X<Me.length;X++){let ne=Me[X],le=x(ne);typeof ne=="number"||typeof ne=="boolean"?(W.__data[0]=ne,s.bufferSubData(s.UNIFORM_BUFFER,ie+z,W.__data)):ne.isMatrix3?(W.__data[0]=ne.elements[0],W.__data[1]=ne.elements[1],W.__data[2]=ne.elements[2],W.__data[3]=0,W.__data[4]=ne.elements[3],W.__data[5]=ne.elements[4],W.__data[6]=ne.elements[5],W.__data[7]=0,W.__data[8]=ne.elements[6],W.__data[9]=ne.elements[7],W.__data[10]=ne.elements[8],W.__data[11]=0):(ne.toArray(W.__data,z),z+=le.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ie,W.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(S,v,P,F){let D=S.value,N=v+"_"+P;if(F[N]===void 0)return typeof D=="number"||typeof D=="boolean"?F[N]=D:F[N]=D.clone(),!0;{let Y=F[N];if(typeof D=="number"||typeof D=="boolean"){if(Y!==D)return F[N]=D,!0}else if(Y.equals(D)===!1)return Y.copy(D),!0}return!1}function g(S){let v=S.uniforms,P=0,F=16;for(let N=0,Y=v.length;N<Y;N++){let A=Array.isArray(v[N])?v[N]:[v[N]];for(let I=0,W=A.length;I<W;I++){let ie=A[I],Me=Array.isArray(ie.value)?ie.value:[ie.value];for(let z=0,X=Me.length;z<X;z++){let ne=Me[z],le=x(ne),oe=P%F;oe!==0&&F-oe<le.boundary&&(P+=F-oe),ie.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),ie.__offset=P,P+=le.storage}}}let D=P%F;return D>0&&(P+=F-D),S.__size=P,S.__cache={},this}function x(S){let v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=48,v.storage=48):S.isMatrix4?(v.boundary=64,v.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),v}function m(S){let v=S.target;v.removeEventListener("dispose",m);let P=a.indexOf(v.__bindingPointIndex);a.splice(P,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function d(){for(let S in i)s.deleteBuffer(i[S]);a=[],i={},r={}}return{bind:c,update:l,dispose:d}}var Pr=class{constructor(e={}){let{canvas:t=cp(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;let p=new Uint32Array(4),g=new Int32Array(4),x=null,m=null,d=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ht,this._useLegacyLights=!1,this.toneMapping=hs,this.toneMappingExposure=1;let v=this,P=!1,F=0,D=0,N=null,Y=-1,A=null,I=new Ct,W=new Ct,ie=null,Me=new Ue(0),z=0,X=t.width,ne=t.height,le=1,oe=null,re=null,ge=new Ct(0,0,X,ne),ve=new Ct(0,0,X,ne),Ie=!1,$=new fa,ue=!1,we=!1,Ve=null,je=new dt,ht=new He,xt=new B,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Dt(){return N===null?le:1}let K=n;function En(R,G){for(let j=0;j<R.length;j++){let Q=R[j],Z=t.getContext(Q,G);if(Z!==null)return Z}return null}try{let R={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xl}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",O,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),K===null){let G=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&G.shift(),K=En(G,R),K===null)throw En(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&K instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),K.getShaderPrecisionFormat===void 0&&(K.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let tt,pt,Fe,en,bt,L,E,J,be,he,me,Be,Re,Ne,Qe,yt,fe,Ee,ke,Oe,We,se,ut,At;function kt(){tt=new _g(K),pt=new fg(K,tt,e),tt.init(pt),se=new Jb(K,tt,pt),Fe=new Yb(K,tt,pt),en=new yg(K),bt=new Fb,L=new Kb(K,tt,Fe,bt,pt,se,en),E=new pg(v),J=new bg(v),be=new Cp(K,pt),ut=new hg(K,tt,be,pt),he=new xg(K,be,en,ut),me=new Eg(K,he,be,en),ke=new wg(K,pt,L),yt=new dg(bt),Be=new Ub(v,E,J,tt,pt,ut,yt),Re=new Qb(v,bt),Ne=new Bb,Qe=new Wb(tt,pt),Ee=new lg(v,E,J,Fe,me,f,c),fe=new jb(v,me,pt),At=new $b(K,en,pt,Fe),Oe=new ug(K,tt,en,pt),We=new vg(K,tt,en,pt),en.programs=Be.programs,v.capabilities=pt,v.extensions=tt,v.properties=bt,v.renderLists=Ne,v.shadowMap=fe,v.state=Fe,v.info=en}kt();let ft=new il(v,K);this.xr=ft,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){let R=tt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=tt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(R){R!==void 0&&(le=R,this.setSize(X,ne,!1))},this.getSize=function(R){return R.set(X,ne)},this.setSize=function(R,G,j=!0){if(ft.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=R,ne=G,t.width=Math.floor(R*le),t.height=Math.floor(G*le),j===!0&&(t.style.width=R+"px",t.style.height=G+"px"),this.setViewport(0,0,R,G)},this.getDrawingBufferSize=function(R){return R.set(X*le,ne*le).floor()},this.setDrawingBufferSize=function(R,G,j){X=R,ne=G,le=j,t.width=Math.floor(R*j),t.height=Math.floor(G*j),this.setViewport(0,0,R,G)},this.getCurrentViewport=function(R){return R.copy(I)},this.getViewport=function(R){return R.copy(ge)},this.setViewport=function(R,G,j,Q){R.isVector4?ge.set(R.x,R.y,R.z,R.w):ge.set(R,G,j,Q),Fe.viewport(I.copy(ge).multiplyScalar(le).floor())},this.getScissor=function(R){return R.copy(ve)},this.setScissor=function(R,G,j,Q){R.isVector4?ve.set(R.x,R.y,R.z,R.w):ve.set(R,G,j,Q),Fe.scissor(W.copy(ve).multiplyScalar(le).floor())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(R){Fe.setScissorTest(Ie=R)},this.setOpaqueSort=function(R){oe=R},this.setTransparentSort=function(R){re=R},this.getClearColor=function(R){return R.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor.apply(Ee,arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha.apply(Ee,arguments)},this.clear=function(R=!0,G=!0,j=!0){let Q=0;if(R){let Z=!1;if(N!==null){let De=N.texture.format;Z=De===af||De===rf||De===sf}if(Z){let De=N.texture.type,Xe=De===us||De===os||De===Ml||De===Us||De===tf||De===nf,it=Ee.getClearColor(),Ke=Ee.getClearAlpha(),vt=it.r,mt=it.g,_t=it.b;Xe?(p[0]=vt,p[1]=mt,p[2]=_t,p[3]=Ke,K.clearBufferuiv(K.COLOR,0,p)):(g[0]=vt,g[1]=mt,g[2]=_t,g[3]=Ke,K.clearBufferiv(K.COLOR,0,g))}else Q|=K.COLOR_BUFFER_BIT}G&&(Q|=K.DEPTH_BUFFER_BIT),j&&(Q|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",O,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),Ne.dispose(),Qe.dispose(),bt.dispose(),E.dispose(),J.dispose(),me.dispose(),ut.dispose(),At.dispose(),Be.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",qt),ft.removeEventListener("sessionend",Vt),Ve&&(Ve.dispose(),Ve=null),_n.stop()};function xe(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let R=en.autoReset,G=fe.enabled,j=fe.autoUpdate,Q=fe.needsUpdate,Z=fe.type;kt(),en.autoReset=R,fe.enabled=G,fe.autoUpdate=j,fe.needsUpdate=Q,fe.type=Z}function Ae(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Pe(R){let G=R.target;G.removeEventListener("dispose",Pe),nt(G)}function nt(R){et(R),bt.remove(R)}function et(R){let G=bt.get(R).programs;G!==void 0&&(G.forEach(function(j){Be.releaseProgram(j)}),R.isShaderMaterial&&Be.releaseShaderCache(R))}this.renderBufferDirect=function(R,G,j,Q,Z,De){G===null&&(G=at);let Xe=Z.isMesh&&Z.matrixWorld.determinant()<0,it=Ni(R,G,j,Q,Z);Fe.setMaterial(Q,Xe);let Ke=j.index,vt=1;if(Q.wireframe===!0){if(Ke=he.getWireframeAttribute(j),Ke===void 0)return;vt=2}let mt=j.drawRange,_t=j.attributes.position,tn=mt.start*vt,Nn=(mt.start+mt.count)*vt;De!==null&&(tn=Math.max(tn,De.start*vt),Nn=Math.min(Nn,(De.start+De.count)*vt)),Ke!==null?(tn=Math.max(tn,0),Nn=Math.min(Nn,Ke.count)):_t!=null&&(tn=Math.max(tn,0),Nn=Math.min(Nn,_t.count));let pn=Nn-tn;if(pn<0||pn===1/0)return;ut.setup(Z,Q,it,j,Ke);let Yn,nn=Oe;if(Ke!==null&&(Yn=be.get(Ke),nn=We,nn.setIndex(Yn)),Z.isMesh)Q.wireframe===!0?(Fe.setLineWidth(Q.wireframeLinewidth*Dt()),nn.setMode(K.LINES)):nn.setMode(K.TRIANGLES);else if(Z.isLine){let Mt=Q.linewidth;Mt===void 0&&(Mt=1),Fe.setLineWidth(Mt*Dt()),Z.isLineSegments?nn.setMode(K.LINES):Z.isLineLoop?nn.setMode(K.LINE_LOOP):nn.setMode(K.LINE_STRIP)}else Z.isPoints?nn.setMode(K.POINTS):Z.isSprite&&nn.setMode(K.TRIANGLES);if(Z.isBatchedMesh)nn.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else if(Z.isInstancedMesh)nn.renderInstances(tn,pn,Z.count);else if(j.isInstancedBufferGeometry){let Mt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,kr=Math.min(j.instanceCount,Mt);nn.renderInstances(tn,pn,kr)}else nn.render(tn,pn)};function Nt(R,G,j){R.transparent===!0&&R.side===Rn&&R.forceSinglePass===!1?(R.side=Cn,R.needsUpdate=!0,de(R,G,j),R.side=Ci,R.needsUpdate=!0,de(R,G,j),R.side=Rn):de(R,G,j)}this.compile=function(R,G,j=null){j===null&&(j=R),m=Qe.get(j),m.init(),S.push(m),j.traverseVisible(function(Z){Z.isLight&&Z.layers.test(G.layers)&&(m.pushLight(Z),Z.castShadow&&m.pushShadow(Z))}),R!==j&&R.traverseVisible(function(Z){Z.isLight&&Z.layers.test(G.layers)&&(m.pushLight(Z),Z.castShadow&&m.pushShadow(Z))}),m.setupLights(v._useLegacyLights);let Q=new Set;return R.traverse(function(Z){let De=Z.material;if(De)if(Array.isArray(De))for(let Xe=0;Xe<De.length;Xe++){let it=De[Xe];Nt(it,j,Z),Q.add(it)}else Nt(De,j,Z),Q.add(De)}),S.pop(),m=null,Q},this.compileAsync=function(R,G,j=null){let Q=this.compile(R,G,j);return new Promise(Z=>{function De(){if(Q.forEach(function(Xe){bt.get(Xe).currentProgram.isReady()&&Q.delete(Xe)}),Q.size===0){Z(R);return}setTimeout(De,10)}tt.get("KHR_parallel_shader_compile")!==null?De():setTimeout(De,10)})};let Bt=null;function Gt(R){Bt&&Bt(R)}function qt(){_n.stop()}function Vt(){_n.start()}let _n=new mf;_n.setAnimationLoop(Gt),typeof self!="undefined"&&_n.setContext(self),this.setAnimationLoop=function(R){Bt=R,ft.setAnimationLoop(R),R===null?_n.stop():_n.start()},ft.addEventListener("sessionstart",qt),ft.addEventListener("sessionend",Vt),this.render=function(R,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(G),G=ft.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,G,N),m=Qe.get(R,S.length),m.init(),S.push(m),je.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),$.setFromProjectionMatrix(je),we=this.localClippingEnabled,ue=yt.init(this.clippingPlanes,we),x=Ne.get(R,d.length),x.init(),d.push(x),ni(R,G,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(oe,re),this.info.render.frame++,ue===!0&&yt.beginShadows();let j=m.state.shadowsArray;if(fe.render(j,R,G),ue===!0&&yt.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ee.render(x,R),m.setupLights(v._useLegacyLights),G.isArrayCamera){let Q=G.cameras;for(let Z=0,De=Q.length;Z<De;Z++){let Xe=Q[Z];wa(x,R,Xe,Xe.viewport)}}else wa(x,R,G);N!==null&&(L.updateMultisampleRenderTarget(N),L.updateRenderTargetMipmap(N)),R.isScene===!0&&R.onAfterRender(v,R,G),ut.resetDefaultState(),Y=-1,A=null,S.pop(),S.length>0?m=S[S.length-1]:m=null,d.pop(),d.length>0?x=d[d.length-1]:x=null};function ni(R,G,j,Q){if(R.visible===!1)return;if(R.layers.test(G.layers)){if(R.isGroup)j=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(G);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||$.intersectsSprite(R)){Q&&xt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(je);let Xe=me.update(R),it=R.material;it.visible&&x.push(R,Xe,it,j,xt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||$.intersectsObject(R))){let Xe=me.update(R),it=R.material;if(Q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),xt.copy(R.boundingSphere.center)):(Xe.boundingSphere===null&&Xe.computeBoundingSphere(),xt.copy(Xe.boundingSphere.center)),xt.applyMatrix4(R.matrixWorld).applyMatrix4(je)),Array.isArray(it)){let Ke=Xe.groups;for(let vt=0,mt=Ke.length;vt<mt;vt++){let _t=Ke[vt],tn=it[_t.materialIndex];tn&&tn.visible&&x.push(R,Xe,tn,j,xt.z,_t)}}else it.visible&&x.push(R,Xe,it,j,xt.z,null)}}let De=R.children;for(let Xe=0,it=De.length;Xe<it;Xe++)ni(De[Xe],G,j,Q)}function wa(R,G,j,Q){let Z=R.opaque,De=R.transmissive,Xe=R.transparent;m.setupLightsView(j),ue===!0&&yt.setGlobalState(v.clippingPlanes,j),De.length>0&&Zo(Z,De,G,j),Q&&Fe.viewport(I.copy(Q)),Z.length>0&&Si(Z,G,j),De.length>0&&Si(De,G,j),Xe.length>0&&Si(Xe,G,j),Fe.buffers.depth.setTest(!0),Fe.buffers.depth.setMask(!0),Fe.buffers.color.setMask(!0),Fe.setPolygonOffset(!1)}function Zo(R,G,j,Q){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;let De=pt.isWebGL2;Ve===null&&(Ve=new vi(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")?ha:us,minFilter:fs,samples:De?4:0})),v.getDrawingBufferSize(ht),De?Ve.setSize(ht.x,ht.y):Ve.setSize(_o(ht.x),_o(ht.y));let Xe=v.getRenderTarget();v.setRenderTarget(Ve),v.getClearColor(Me),z=v.getClearAlpha(),z<1&&v.setClearColor(16777215,.5),v.clear();let it=v.toneMapping;v.toneMapping=hs,Si(R,j,Q),L.updateMultisampleRenderTarget(Ve),L.updateRenderTargetMipmap(Ve);let Ke=!1;for(let vt=0,mt=G.length;vt<mt;vt++){let _t=G[vt],tn=_t.object,Nn=_t.geometry,pn=_t.material,Yn=_t.group;if(pn.side===Rn&&tn.layers.test(Q.layers)){let nn=pn.side;pn.side=Cn,pn.needsUpdate=!0,Pn(tn,j,Q,Nn,pn,Yn),pn.side=nn,pn.needsUpdate=!0,Ke=!0}}Ke===!0&&(L.updateMultisampleRenderTarget(Ve),L.updateRenderTargetMipmap(Ve)),v.setRenderTarget(Xe),v.setClearColor(Me,z),v.toneMapping=it}function Si(R,G,j){let Q=G.isScene===!0?G.overrideMaterial:null;for(let Z=0,De=R.length;Z<De;Z++){let Xe=R[Z],it=Xe.object,Ke=Xe.geometry,vt=Q===null?Xe.material:Q,mt=Xe.group;it.layers.test(j.layers)&&Pn(it,G,j,Ke,vt,mt)}}function Pn(R,G,j,Q,Z,De){R.onBeforeRender(v,G,j,Q,Z,De),R.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Z.onBeforeRender(v,G,j,Q,R,De),Z.transparent===!0&&Z.side===Rn&&Z.forceSinglePass===!1?(Z.side=Cn,Z.needsUpdate=!0,v.renderBufferDirect(j,G,Q,Z,R,De),Z.side=Ci,Z.needsUpdate=!0,v.renderBufferDirect(j,G,Q,Z,R,De),Z.side=Rn):v.renderBufferDirect(j,G,Q,Z,R,De),R.onAfterRender(v,G,j,Q,Z,De)}function de(R,G,j){G.isScene!==!0&&(G=at);let Q=bt.get(R),Z=m.state.lights,De=m.state.shadowsArray,Xe=Z.state.version,it=Be.getParameters(R,Z.state,De,G,j),Ke=Be.getProgramCacheKey(it),vt=Q.programs;Q.environment=R.isMeshStandardMaterial?G.environment:null,Q.fog=G.fog,Q.envMap=(R.isMeshStandardMaterial?J:E).get(R.envMap||Q.environment),vt===void 0&&(R.addEventListener("dispose",Pe),vt=new Map,Q.programs=vt);let mt=vt.get(Ke);if(mt!==void 0){if(Q.currentProgram===mt&&Q.lightsStateVersion===Xe)return Aa(R,it),mt}else it.uniforms=Be.getUniforms(R),R.onBuild(j,it,v),R.onBeforeCompile(it,v),mt=Be.acquireProgram(it,Ke),vt.set(Ke,mt),Q.uniforms=it.uniforms;let _t=Q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(_t.clippingPlanes=yt.uniform),Aa(R,it),Q.needsLights=$o(R),Q.lightsStateVersion=Xe,Q.needsLights&&(_t.ambientLightColor.value=Z.state.ambient,_t.lightProbe.value=Z.state.probe,_t.directionalLights.value=Z.state.directional,_t.directionalLightShadows.value=Z.state.directionalShadow,_t.spotLights.value=Z.state.spot,_t.spotLightShadows.value=Z.state.spotShadow,_t.rectAreaLights.value=Z.state.rectArea,_t.ltc_1.value=Z.state.rectAreaLTC1,_t.ltc_2.value=Z.state.rectAreaLTC2,_t.pointLights.value=Z.state.point,_t.pointLightShadows.value=Z.state.pointShadow,_t.hemisphereLights.value=Z.state.hemi,_t.directionalShadowMap.value=Z.state.directionalShadowMap,_t.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,_t.spotShadowMap.value=Z.state.spotShadowMap,_t.spotLightMatrix.value=Z.state.spotLightMatrix,_t.spotLightMap.value=Z.state.spotLightMap,_t.pointShadowMap.value=Z.state.pointShadowMap,_t.pointShadowMatrix.value=Z.state.pointShadowMatrix),Q.currentProgram=mt,Q.uniformsList=null,mt}function Ea(R){if(R.uniformsList===null){let G=R.currentProgram.getUniforms();R.uniformsList=vr.seqWithValue(G.seq,R.uniforms)}return R.uniformsList}function Aa(R,G){let j=bt.get(R);j.outputColorSpace=G.outputColorSpace,j.batching=G.batching,j.instancing=G.instancing,j.instancingColor=G.instancingColor,j.skinning=G.skinning,j.morphTargets=G.morphTargets,j.morphNormals=G.morphNormals,j.morphColors=G.morphColors,j.morphTargetsCount=G.morphTargetsCount,j.numClippingPlanes=G.numClippingPlanes,j.numIntersection=G.numClipIntersection,j.vertexAlphas=G.vertexAlphas,j.vertexTangents=G.vertexTangents,j.toneMapping=G.toneMapping}function Ni(R,G,j,Q,Z){G.isScene!==!0&&(G=at),L.resetTextureUnits();let De=G.fog,Xe=Q.isMeshStandardMaterial?G.environment:null,it=N===null?v.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Mn,Ke=(Q.isMeshStandardMaterial?J:E).get(Q.envMap||Xe),vt=Q.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,mt=!!j.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),_t=!!j.morphAttributes.position,tn=!!j.morphAttributes.normal,Nn=!!j.morphAttributes.color,pn=hs;Q.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(pn=v.toneMapping);let Yn=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,nn=Yn!==void 0?Yn.length:0,Mt=bt.get(Q),kr=m.state.lights;if(ue===!0&&(we===!0||R!==A)){let vn=R===A&&Q.id===Y;yt.setState(Q,R,vn)}let on=!1;Q.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==kr.state.version||Mt.outputColorSpace!==it||Z.isBatchedMesh&&Mt.batching===!1||!Z.isBatchedMesh&&Mt.batching===!0||Z.isInstancedMesh&&Mt.instancing===!1||!Z.isInstancedMesh&&Mt.instancing===!0||Z.isSkinnedMesh&&Mt.skinning===!1||!Z.isSkinnedMesh&&Mt.skinning===!0||Z.isInstancedMesh&&Mt.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Mt.instancingColor===!1&&Z.instanceColor!==null||Mt.envMap!==Ke||Q.fog===!0&&Mt.fog!==De||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==yt.numPlanes||Mt.numIntersection!==yt.numIntersection)||Mt.vertexAlphas!==vt||Mt.vertexTangents!==mt||Mt.morphTargets!==_t||Mt.morphNormals!==tn||Mt.morphColors!==Nn||Mt.toneMapping!==pn||pt.isWebGL2===!0&&Mt.morphTargetsCount!==nn)&&(on=!0):(on=!0,Mt.__version=Q.version);let Ui=Mt.currentProgram;on===!0&&(Ui=de(Q,G,Z));let $i=!1,Ms=!1,zr=!1,xn=Ui.getUniforms(),Ut=Mt.uniforms;if(Fe.useProgram(Ui.program)&&($i=!0,Ms=!0,zr=!0),Q.id!==Y&&(Y=Q.id,Ms=!0),$i||A!==R){xn.setValue(K,"projectionMatrix",R.projectionMatrix),xn.setValue(K,"viewMatrix",R.matrixWorldInverse);let vn=xn.map.cameraPosition;vn!==void 0&&vn.setValue(K,xt.setFromMatrixPosition(R.matrixWorld)),pt.logarithmicDepthBuffer&&xn.setValue(K,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&xn.setValue(K,"isOrthographic",R.isOrthographicCamera===!0),A!==R&&(A=R,Ms=!0,zr=!0)}if(Z.isSkinnedMesh){xn.setOptional(K,Z,"bindMatrix"),xn.setOptional(K,Z,"bindMatrixInverse");let vn=Z.skeleton;vn&&(pt.floatVertexTextures?(vn.boneTexture===null&&vn.computeBoneTexture(),xn.setValue(K,"boneTexture",vn.boneTexture,L)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Z.isBatchedMesh&&(xn.setOptional(K,Z,"batchingTexture"),xn.setValue(K,"batchingTexture",Z._matricesTexture,L));let Hr=j.morphAttributes;if((Hr.position!==void 0||Hr.normal!==void 0||Hr.color!==void 0&&pt.isWebGL2===!0)&&ke.update(Z,j,Ui),(Ms||Mt.receiveShadow!==Z.receiveShadow)&&(Mt.receiveShadow=Z.receiveShadow,xn.setValue(K,"receiveShadow",Z.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(Ut.envMap.value=Ke,Ut.flipEnvMap.value=Ke.isCubeTexture&&Ke.isRenderTargetTexture===!1?-1:1),Ms&&(xn.setValue(K,"toneMappingExposure",v.toneMappingExposure),Mt.needsLights&&Qo(Ut,zr),De&&Q.fog===!0&&Re.refreshFogUniforms(Ut,De),Re.refreshMaterialUniforms(Ut,Q,le,ne,Ve),vr.upload(K,Ea(Mt),Ut,L)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(vr.upload(K,Ea(Mt),Ut,L),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&xn.setValue(K,"center",Z.center),xn.setValue(K,"modelViewMatrix",Z.modelViewMatrix),xn.setValue(K,"normalMatrix",Z.normalMatrix),xn.setValue(K,"modelMatrix",Z.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let vn=Q.uniformsGroups;for(let Gr=0,Ss=vn.length;Gr<Ss;Gr++)if(pt.isWebGL2){let Vr=vn[Gr];At.update(Vr,Ui),At.bind(Vr,Ui)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ui}function Qo(R,G){R.ambientLightColor.needsUpdate=G,R.lightProbe.needsUpdate=G,R.directionalLights.needsUpdate=G,R.directionalLightShadows.needsUpdate=G,R.pointLights.needsUpdate=G,R.pointLightShadows.needsUpdate=G,R.spotLights.needsUpdate=G,R.spotLightShadows.needsUpdate=G,R.rectAreaLights.needsUpdate=G,R.hemisphereLights.needsUpdate=G}function $o(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(R,G,j){bt.get(R.texture).__webglTexture=G,bt.get(R.depthTexture).__webglTexture=j;let Q=bt.get(R);Q.__hasExternalTextures=!0,Q.__hasExternalTextures&&(Q.__autoAllocateDepthBuffer=j===void 0,Q.__autoAllocateDepthBuffer||tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,G){let j=bt.get(R);j.__webglFramebuffer=G,j.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(R,G=0,j=0){N=R,F=G,D=j;let Q=!0,Z=null,De=!1,Xe=!1;if(R){let Ke=bt.get(R);Ke.__useDefaultFramebuffer!==void 0?(Fe.bindFramebuffer(K.FRAMEBUFFER,null),Q=!1):Ke.__webglFramebuffer===void 0?L.setupRenderTarget(R):Ke.__hasExternalTextures&&L.rebindTextures(R,bt.get(R.texture).__webglTexture,bt.get(R.depthTexture).__webglTexture);let vt=R.texture;(vt.isData3DTexture||vt.isDataArrayTexture||vt.isCompressedArrayTexture)&&(Xe=!0);let mt=bt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(mt[G])?Z=mt[G][j]:Z=mt[G],De=!0):pt.isWebGL2&&R.samples>0&&L.useMultisampledRTT(R)===!1?Z=bt.get(R).__webglMultisampledFramebuffer:Array.isArray(mt)?Z=mt[j]:Z=mt,I.copy(R.viewport),W.copy(R.scissor),ie=R.scissorTest}else I.copy(ge).multiplyScalar(le).floor(),W.copy(ve).multiplyScalar(le).floor(),ie=Ie;if(Fe.bindFramebuffer(K.FRAMEBUFFER,Z)&&pt.drawBuffers&&Q&&Fe.drawBuffers(R,Z),Fe.viewport(I),Fe.scissor(W),Fe.setScissorTest(ie),De){let Ke=bt.get(R.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ke.__webglTexture,j)}else if(Xe){let Ke=bt.get(R.texture),vt=G||0;K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,Ke.__webglTexture,j||0,vt)}Y=-1},this.readRenderTargetPixels=function(R,G,j,Q,Z,De,Xe){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let it=bt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Xe!==void 0&&(it=it[Xe]),it){Fe.bindFramebuffer(K.FRAMEBUFFER,it);try{let Ke=R.texture,vt=Ke.format,mt=Ke.type;if(vt!==oi&&se.convert(vt)!==K.getParameter(K.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let _t=mt===ha&&(tt.has("EXT_color_buffer_half_float")||pt.isWebGL2&&tt.has("EXT_color_buffer_float"));if(mt!==us&&se.convert(mt)!==K.getParameter(K.IMPLEMENTATION_COLOR_READ_TYPE)&&!(mt===Wi&&(pt.isWebGL2||tt.has("OES_texture_float")||tt.has("WEBGL_color_buffer_float")))&&!_t){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=R.width-Q&&j>=0&&j<=R.height-Z&&K.readPixels(G,j,Q,Z,se.convert(vt),se.convert(mt),De)}finally{let Ke=N!==null?bt.get(N).__webglFramebuffer:null;Fe.bindFramebuffer(K.FRAMEBUFFER,Ke)}}},this.copyFramebufferToTexture=function(R,G,j=0){let Q=Math.pow(2,-j),Z=Math.floor(G.image.width*Q),De=Math.floor(G.image.height*Q);L.setTexture2D(G,0),K.copyTexSubImage2D(K.TEXTURE_2D,j,0,0,R.x,R.y,Z,De),Fe.unbindTexture()},this.copyTextureToTexture=function(R,G,j,Q=0){let Z=G.image.width,De=G.image.height,Xe=se.convert(j.format),it=se.convert(j.type);L.setTexture2D(j,0),K.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,j.flipY),K.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),K.pixelStorei(K.UNPACK_ALIGNMENT,j.unpackAlignment),G.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,Q,R.x,R.y,Z,De,Xe,it,G.image.data):G.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,Q,R.x,R.y,G.mipmaps[0].width,G.mipmaps[0].height,Xe,G.mipmaps[0].data):K.texSubImage2D(K.TEXTURE_2D,Q,R.x,R.y,Xe,it,G.image),Q===0&&j.generateMipmaps&&K.generateMipmap(K.TEXTURE_2D),Fe.unbindTexture()},this.copyTextureToTexture3D=function(R,G,j,Q,Z=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let De=R.max.x-R.min.x+1,Xe=R.max.y-R.min.y+1,it=R.max.z-R.min.z+1,Ke=se.convert(Q.format),vt=se.convert(Q.type),mt;if(Q.isData3DTexture)L.setTexture3D(Q,0),mt=K.TEXTURE_3D;else if(Q.isDataArrayTexture||Q.isCompressedArrayTexture)L.setTexture2DArray(Q,0),mt=K.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}K.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,Q.flipY),K.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),K.pixelStorei(K.UNPACK_ALIGNMENT,Q.unpackAlignment);let _t=K.getParameter(K.UNPACK_ROW_LENGTH),tn=K.getParameter(K.UNPACK_IMAGE_HEIGHT),Nn=K.getParameter(K.UNPACK_SKIP_PIXELS),pn=K.getParameter(K.UNPACK_SKIP_ROWS),Yn=K.getParameter(K.UNPACK_SKIP_IMAGES),nn=j.isCompressedTexture?j.mipmaps[Z]:j.image;K.pixelStorei(K.UNPACK_ROW_LENGTH,nn.width),K.pixelStorei(K.UNPACK_IMAGE_HEIGHT,nn.height),K.pixelStorei(K.UNPACK_SKIP_PIXELS,R.min.x),K.pixelStorei(K.UNPACK_SKIP_ROWS,R.min.y),K.pixelStorei(K.UNPACK_SKIP_IMAGES,R.min.z),j.isDataTexture||j.isData3DTexture?K.texSubImage3D(mt,Z,G.x,G.y,G.z,De,Xe,it,Ke,vt,nn.data):j.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),K.compressedTexSubImage3D(mt,Z,G.x,G.y,G.z,De,Xe,it,Ke,nn.data)):K.texSubImage3D(mt,Z,G.x,G.y,G.z,De,Xe,it,Ke,vt,nn),K.pixelStorei(K.UNPACK_ROW_LENGTH,_t),K.pixelStorei(K.UNPACK_IMAGE_HEIGHT,tn),K.pixelStorei(K.UNPACK_SKIP_PIXELS,Nn),K.pixelStorei(K.UNPACK_SKIP_ROWS,pn),K.pixelStorei(K.UNPACK_SKIP_IMAGES,Yn),Z===0&&Q.generateMipmaps&&K.generateMipmap(mt),Fe.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?L.setTextureCube(R,0):R.isData3DTexture?L.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?L.setTexture2DArray(R,0):L.setTexture2D(R,0),Fe.unbindTexture()},this.resetState=function(){F=0,D=0,N=null,Fe.reset(),ut.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===El?"display-p3":"srgb",t.unpackColorSpace=Ot.workingColorSpace===Xo?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ht?Os:lf}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Os?Ht:Mn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},sl=class extends Pr{};sl.prototype.isWebGL1Renderer=!0;var To=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ue(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var ps=class extends Jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},Lr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Hc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=xi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Gn=new B,zs=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.applyMatrix4(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.applyNormalMatrix(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.transformDirection(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ri(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ri(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ri(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ri(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),i=Xt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),i=Xt(i,this.array),r=Xt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Pt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},da=class extends Xn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},lr,Qr=new B,hr=new B,ur=new B,fr=new He,$r=new He,yf=new dt,eo=new B,ea=new B,to=new B,Iu=new He,Lc=new He,Du=new He,Ro=class extends Jt{constructor(e=new da){if(super(),this.isSprite=!0,this.type="Sprite",lr===void 0){lr=new Zt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Lr(t,5);lr.setIndex([0,1,2,0,2,3]),lr.setAttribute("position",new zs(n,3,0,!1)),lr.setAttribute("uv",new zs(n,2,3,!1))}this.geometry=lr,this.material=e,this.center=new He(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hr.setFromMatrixScale(this.matrixWorld),yf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ur.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hr.multiplyScalar(-ur.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;no(eo.set(-.5,-.5,0),ur,a,hr,i,r),no(ea.set(.5,-.5,0),ur,a,hr,i,r),no(to.set(.5,.5,0),ur,a,hr,i,r),Iu.set(0,0),Lc.set(1,0),Du.set(1,1);let o=e.ray.intersectTriangle(eo,ea,to,!1,Qr);if(o===null&&(no(ea.set(-.5,.5,0),ur,a,hr,i,r),Lc.set(0,1),o=e.ray.intersectTriangle(eo,to,ea,!1,Qr),o===null))return;let c=e.ray.origin.distanceTo(Qr);c<e.near||c>e.far||t.push({distance:c,point:Qr.clone(),uv:Ns.getInterpolation(Qr,eo,ea,to,Iu,Lc,Du,new He),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function no(s,e,t,n,i,r){fr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?($r.x=r*fr.x-i*fr.y,$r.y=i*fr.x+r*fr.y):$r.copy(fr),s.copy(e),s.x+=$r.x,s.y+=$r.y,s.applyMatrix4(yf)}var Nu=new B,Uu=new Ct,Fu=new Ct,e_=new B,Ou=new dt,io=new B,Ic=new Dn,Bu=new dt,Dc=new Ar,Hs=class extends ze{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=vh,this.bindMatrix=new dt,this.bindMatrixInverse=new dt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new li),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,io),this.boundingBox.expandByPoint(io)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Dn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,io),this.boundingSphere.expandByPoint(io)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ic.copy(this.boundingSphere),Ic.applyMatrix4(i),e.ray.intersectsSphere(Ic)!==!1&&(Bu.copy(i).invert(),Dc.copy(e.ray).applyMatrix4(Bu),!(this.boundingBox!==null&&Dc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Dc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ct,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===vh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ed?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Uu.fromBufferAttribute(i.attributes.skinIndex,e),Fu.fromBufferAttribute(i.attributes.skinWeight,e),Nu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=Fu.getComponent(r);if(a!==0){let o=Uu.getComponent(r);Ou.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(e_.copy(Nu).applyMatrix4(Ou),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},pa=class extends Jt{constructor(){super(),this.isBone=!0,this.type="Bone"}},rl=class extends In{constructor(e=null,t=1,n=1,i,r,a,o,c,l=yn,h=yn,u,f){super(null,a,o,c,l,h,i,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ku=new dt,t_=new dt,Co=class s{constructor(e=[],t=[]){this.uuid=xi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new dt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new dt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:t_;ku.multiplyMatrices(o,t[r]),ku.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new rl(t,e,e,oi,Wi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new pa),this.bones.push(a),this.boneInverses.push(new dt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},hi=class extends Pt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},dr=new dt,zu=new dt,so=[],Hu=new li,n_=new dt,ta=new ze,na=new Dn,Li=class extends ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new hi(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,n_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new li),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,dr),Hu.copy(e.boundingBox).applyMatrix4(dr),this.boundingBox.union(Hu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Dn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,dr),na.copy(e.boundingSphere).applyMatrix4(dr),this.boundingSphere.union(na)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(ta.geometry=this.geometry,ta.material=this.material,ta.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),na.copy(this.boundingSphere),na.applyMatrix4(n),e.ray.intersectsSphere(na)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,dr),zu.multiplyMatrices(n,dr),ta.matrixWorld=zu,ta.raycast(e,so);for(let a=0,o=so.length;a<o;a++){let c=so[a];c.instanceId=r,c.object=this,t.push(c)}so.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new hi(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var ma=class extends Xn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Gu=new B,Vu=new B,Wu=new dt,Nc=new Ar,ro=new Dn,Ir=class extends Jt{constructor(e=new Zt,t=new ma){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Gu.fromBufferAttribute(t,i-1),Vu.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Gu.distanceTo(Vu);e.setAttribute("lineDistance",new Lt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ro.copy(n.boundingSphere),ro.applyMatrix4(i),ro.radius+=r,e.ray.intersectsSphere(ro)===!1)return;Wu.copy(i).invert(),Nc.copy(e.ray).applyMatrix4(Wu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new B,h=new B,u=new B,f=new B,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let d=Math.max(0,a.start),S=Math.min(g.count,a.start+a.count);for(let v=d,P=S-1;v<P;v+=p){let F=g.getX(v),D=g.getX(v+1);if(l.fromBufferAttribute(m,F),h.fromBufferAttribute(m,D),Nc.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let Y=e.ray.origin.distanceTo(f);Y<e.near||Y>e.far||t.push({distance:Y,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{let d=Math.max(0,a.start),S=Math.min(m.count,a.start+a.count);for(let v=d,P=S-1;v<P;v+=p){if(l.fromBufferAttribute(m,v),h.fromBufferAttribute(m,v+1),Nc.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let D=e.ray.origin.distanceTo(f);D<e.near||D>e.far||t.push({distance:D,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}},Xu=new B,qu=new B,Dr=class extends Ir{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Xu.fromBufferAttribute(t,i),qu.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Xu.distanceTo(qu);e.setAttribute("lineDistance",new Lt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Po=class extends Ir{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ga=class extends Xn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ju=new dt,al=new Ar,ao=new Dn,oo=new B,ms=class extends Jt{constructor(e=new Zt,t=new ga){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(i),ao.radius+=r,e.ray.intersectsSphere(ao)===!1)return;ju.copy(i).invert(),al.copy(e.ray).applyMatrix4(ju);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=f,x=p;g<x;g++){let m=l.getX(g);oo.fromBufferAttribute(u,m),Yu(oo,m,c,i,e,t,this)}}else{let f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=f,x=p;g<x;g++)oo.fromBufferAttribute(u,g),Yu(oo,g,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Yu(s,e,t,n,i,r,a){let o=al.distanceSqToPoint(s);if(o<t){let c=new B;al.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}var Lo=class extends In{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Io=class s extends Zt{constructor(e=[new He(0,-.5),new He(.5,0),new He(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Ln(i,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],h=1/t,u=new B,f=new He,p=new B,g=new B,x=new B,m=0,d=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:m=e[S+1].x-e[S].x,d=e[S+1].y-e[S].y,p.x=d*1,p.y=-m,p.z=d*0,x.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case e.length-1:c.push(x.x,x.y,x.z);break;default:m=e[S+1].x-e[S].x,d=e[S+1].y-e[S].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),c.push(p.x,p.y,p.z),x.copy(g)}for(let S=0;S<=t;S++){let v=n+S*h*i,P=Math.sin(v),F=Math.cos(v);for(let D=0;D<=e.length-1;D++){u.x=e[D].x*P,u.y=e[D].y,u.z=e[D].x*F,a.push(u.x,u.y,u.z),f.x=S/t,f.y=D/(e.length-1),o.push(f.x,f.y);let N=c[3*D+0]*P,Y=c[3*D+1],A=c[3*D+0]*F;l.push(N,Y,A)}}for(let S=0;S<t;S++)for(let v=0;v<e.length-1;v++){let P=v+S*e.length,F=P,D=P+e.length,N=P+e.length+1,Y=P+1;r.push(F,D,Y),r.push(N,Y,D)}this.setIndex(r),this.setAttribute("position",new Lt(a,3)),this.setAttribute("uv",new Lt(o,2)),this.setAttribute("normal",new Lt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}};var Do=class s extends Zt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new B,h=new He;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let p=n+u/t*i;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Lt(a,3)),this.setAttribute("normal",new Lt(o,3)),this.setAttribute("uv",new Lt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},yi=class s extends Zt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],f=[],p=[],g=0,x=[],m=n/2,d=0;S(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Lt(u,3)),this.setAttribute("normal",new Lt(f,3)),this.setAttribute("uv",new Lt(p,2));function S(){let P=new B,F=new B,D=0,N=(t-e)/n;for(let Y=0;Y<=r;Y++){let A=[],I=Y/r,W=I*(t-e)+e;for(let ie=0;ie<=i;ie++){let Me=ie/i,z=Me*c+o,X=Math.sin(z),ne=Math.cos(z);F.x=W*X,F.y=-I*n+m,F.z=W*ne,u.push(F.x,F.y,F.z),P.set(X,N,ne).normalize(),f.push(P.x,P.y,P.z),p.push(Me,1-I),A.push(g++)}x.push(A)}for(let Y=0;Y<i;Y++)for(let A=0;A<r;A++){let I=x[A][Y],W=x[A+1][Y],ie=x[A+1][Y+1],Me=x[A][Y+1];h.push(I,W,Me),h.push(W,ie,Me),D+=6}l.addGroup(d,D,0),d+=D}function v(P){let F=g,D=new He,N=new B,Y=0,A=P===!0?e:t,I=P===!0?1:-1;for(let ie=1;ie<=i;ie++)u.push(0,m*I,0),f.push(0,I,0),p.push(.5,.5),g++;let W=g;for(let ie=0;ie<=i;ie++){let z=ie/i*c+o,X=Math.cos(z),ne=Math.sin(z);N.x=A*ne,N.y=m*I,N.z=A*X,u.push(N.x,N.y,N.z),f.push(0,I,0),D.x=X*.5+.5,D.y=ne*.5*I+.5,p.push(D.x,D.y),g++}for(let ie=0;ie<i;ie++){let Me=F+ie,z=W+ie;P===!0?h.push(z,z+1,Me):h.push(z+1,z,Me),Y+=3}l.addGroup(d,Y,P===!0?1:2),d+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Yi=class s extends Zt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new B,f=new B,p=[],g=[],x=[],m=[];for(let d=0;d<=n;d++){let S=[],v=d/n,P=0;d===0&&a===0?P=.5/t:d===n&&c===Math.PI&&(P=-.5/t);for(let F=0;F<=t;F++){let D=F/t;u.x=-e*Math.cos(i+D*r)*Math.sin(a+v*o),u.y=e*Math.cos(a+v*o),u.z=e*Math.sin(i+D*r)*Math.sin(a+v*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),m.push(D+P,1-v),S.push(l++)}h.push(S)}for(let d=0;d<n;d++)for(let S=0;S<t;S++){let v=h[d][S+1],P=h[d][S],F=h[d+1][S],D=h[d+1][S+1];(d!==0||a>0)&&p.push(v,P,D),(d!==n-1||c<Math.PI)&&p.push(P,F,D)}this.setIndex(p),this.setAttribute("position",new Lt(g,3)),this.setAttribute("normal",new Lt(x,3)),this.setAttribute("uv",new Lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ba=class s extends Zt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new B,u=new B,f=new B;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){let x=g/i*r,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(x),u.y=(e+t*Math.cos(m))*Math.sin(x),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/i),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){let x=(i+1)*p+g-1,m=(i+1)*(p-1)+g-1,d=(i+1)*(p-1)+g,S=(i+1)*p+g;a.push(x,m,S),a.push(m,d,S)}this.setIndex(a),this.setAttribute("position",new Lt(o,3)),this.setAttribute("normal",new Lt(c,3)),this.setAttribute("uv",new Lt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Qt=class extends Xn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wl,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ui=class extends Qt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new He(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ln(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ii=class extends Xn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wl,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=vl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function co(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function i_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function s_(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ku(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function Mf(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var gs=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ol=class extends gs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:pr,endingEnd:pr}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case mr:r=e,o=2*t-n;break;case fo:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case mr:a=e,c=2*n-t;break;case fo:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(n-t)/(i-t),x=g*g,m=x*g,d=-f*m+2*f*x-f*g,S=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,v=(-1-p)*m+(1.5+p)*x+.5*g,P=p*m-p*x;for(let F=0;F!==o;++F)r[F]=d*a[h+F]+S*a[l+F]+v*a[c+F]+P*a[u+F];return r}},No=class extends gs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},cl=class extends gs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},fi=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=co(t,this.TimeBufferType),this.values=co(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:co(e.times,Array),values:co(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new cl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ol(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case wr:t=this.InterpolantFactoryMethodDiscrete;break;case Bs:t=this.InterpolantFactoryMethodLinear;break;case cc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return wr;case this.InterpolantFactoryMethodLinear:return Bs;case this.InterpolantFactoryMethodSmooth:return cc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&i_(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===cc,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{let u=o*n,f=u-n,p=u+n;for(let g=0;g!==n;++g){let x=t[u+g];if(x!==t[f+g]||x!==t[p+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,f=a*n;for(let p=0;p!==n;++p)t[f+p]=t[u+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};fi.prototype.TimeBufferType=Float32Array;fi.prototype.ValueBufferType=Float32Array;fi.prototype.DefaultInterpolation=Bs;var bs=class extends fi{};bs.prototype.ValueTypeName="bool";bs.prototype.ValueBufferType=Array;bs.prototype.DefaultInterpolation=wr;bs.prototype.InterpolantFactoryMethodLinear=void 0;bs.prototype.InterpolantFactoryMethodSmooth=void 0;var Uo=class extends fi{};Uo.prototype.ValueTypeName="color";var Ki=class extends fi{};Ki.prototype.ValueTypeName="number";var ll=class extends gs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)zn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Di=class extends fi{InterpolantFactoryMethodLinear(e){return new ll(this.times,this.values,this.getValueSize(),e)}};Di.prototype.ValueTypeName="quaternion";Di.prototype.DefaultInterpolation=Bs;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var _s=class extends fi{};_s.prototype.ValueTypeName="string";_s.prototype.ValueBufferType=Array;_s.prototype.DefaultInterpolation=wr;_s.prototype.InterpolantFactoryMethodLinear=void 0;_s.prototype.InterpolantFactoryMethodSmooth=void 0;var Ji=class extends fi{};Ji.prototype.ValueTypeName="vector";var Nr=class{constructor(e,t=-1,n,i=Sl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=xi(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(a_(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(fi.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=s_(c);c=Ku(c,1,h),l=Ku(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Ki(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=i[u];f||(i[u]=f=[]),f.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,p,g,x){if(p.length!==0){let m=[],d=[];Mf(p,m,d,g),m.length!==0&&x.push(new u(f,m,d))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let p={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let x=0;x<f[g].morphTargets.length;x++)p[f[g].morphTargets[x]]=-1;for(let x in p){let m=[],d=[];for(let S=0;S!==f[g].morphTargets.length;++S){let v=f[g];m.push(v.time),d.push(v.morphTarget===x?1:0)}i.push(new Ki(".morphTargetInfluence["+x+"]",m,d))}c=p.length*a}else{let p=".bones["+t[u].name+"]";n(Ji,p+".position",f,"pos",i),n(Di,p+".quaternion",f,"rot",i),n(Ji,p+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function r_(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ki;case"vector":case"vector2":case"vector3":case"vector4":return Ji;case"color":return Uo;case"quaternion":return Di;case"bool":case"boolean":return bs;case"string":return _s}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function a_(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=r_(s.type);if(s.times===void 0){let t=[],n=[];Mf(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var cs={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},hl=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},o_=new hl,Zi=class{constructor(e){this.manager=e!==void 0?e:o_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Zi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Hi={},ul=class extends Error{constructor(e,t){super(e),this.response=t}},_a=class extends Zi{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=cs.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Hi[e]!==void 0){Hi[e].push({onLoad:t,onProgress:n,onError:i});return}Hi[e]=[],Hi[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||l.body===void 0||l.body.getReader===void 0)return l;let h=Hi[e],u=l.body.getReader(),f=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),p=f?parseInt(f):0,g=p!==0,x=0,m=new ReadableStream({start(d){S();function S(){u.read().then(({done:v,value:P})=>{if(v)d.close();else{x+=P.byteLength;let F=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:p});for(let D=0,N=h.length;D<N;D++){let Y=h[D];Y.onProgress&&Y.onProgress(F)}d.enqueue(P),S()}})}}});return new Response(m)}else throw new ul(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),f=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(f);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{cs.add(e,l);let h=Hi[e];delete Hi[e];for(let u=0,f=h.length;u<f;u++){let p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{let h=Hi[e];if(h===void 0)throw this.manager.itemError(e),l;delete Hi[e];for(let u=0,f=h.length;u<f;u++){let p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var fl=class extends Zi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=cs.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;let o=ua("img");function c(){h(),cs.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}};var Fo=class extends Zi{constructor(e){super(e)}load(e,t,n,i){let r=new In,a=new fl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Gs=class extends Jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},xa=class extends Gs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Jt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Uc=new dt,Ju=new B,Zu=new B,va=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fa,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ju.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ju),Zu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zu),t.updateMatrixWorld(),Uc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Uc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},dl=class extends va{constructor(){super(new bn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Er*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Oo=class extends Gs{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Jt.DEFAULT_UP),this.updateMatrix(),this.target=new Jt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new dl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Qu=new dt,ia=new B,Fc=new B,pl=class extends va{constructor(){super(new bn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new He(4,2),this._viewportCount=6,this._viewports=[new Ct(2,1,1,1),new Ct(0,1,1,1),new Ct(3,1,1,1),new Ct(1,1,1,1),new Ct(3,0,1,1),new Ct(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ia.setFromMatrixPosition(e.matrixWorld),n.position.copy(ia),Fc.copy(n.position),Fc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Fc),n.updateMatrixWorld(),i.makeTranslation(-ia.x,-ia.y,-ia.z),Qu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qu)}},Ur=class extends Gs{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new pl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},ml=class extends va{constructor(){super(new ds(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Mi=class extends Gs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Jt.DEFAULT_UP),this.updateMatrix(),this.target=new Jt,this.shadow=new ml}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Bo=class extends Gs{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var xs=class{static decodeText(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var ko=class extends Zi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=cs.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return cs.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),cs.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});cs.add(e,c),r.manager.itemStart(e)}};var gl=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){zn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let a=this._workIndex*r;zn.multiplyQuaternionsFlat(e,a,e,t,e,n),zn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){let a=1-i;for(let o=0;o!==r;++o){let c=t+o;e[c]=e[c]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*i}}},Rl="\\[\\]\\.:\\/",c_=new RegExp("["+Rl+"]","g"),Cl="[^"+Rl+"]",l_="[^"+Rl.replace("\\.","")+"]",h_=/((?:WC+[\/:])*)/.source.replace("WC",Cl),u_=/(WCOD+)?/.source.replace("WCOD",l_),f_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Cl),d_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Cl),p_=new RegExp("^"+h_+u_+f_+d_+"$"),m_=["material","materials","bones","map"],bl=class{constructor(e,t,n){let i=n||Kt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Kt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(c_,"")}static parseTrackName(e){let t=p_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);m_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Kt.Composite=bl;Kt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Kt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Kt.prototype.GetterByBindingType=[Kt.prototype._getValue_direct,Kt.prototype._getValue_array,Kt.prototype._getValue_arrayElement,Kt.prototype._getValue_toArray];Kt.prototype.SetterByBindingTypeAndVersioning=[[Kt.prototype._setValue_direct,Kt.prototype._setValue_direct_setNeedsUpdate,Kt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Kt.prototype._setValue_array,Kt.prototype._setValue_array_setNeedsUpdate,Kt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Kt.prototype._setValue_arrayElement,Kt.prototype._setValue_arrayElement_setNeedsUpdate,Kt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Kt.prototype._setValue_fromArray,Kt.prototype._setValue_fromArray_setNeedsUpdate,Kt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var _l=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,a=r.length,o=new Array(a),c={endingStart:pr,endingEnd:pr};for(let l=0;l!==a;++l){let h=r[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Ud,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Od:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case Sl:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,a=n===Fd;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===Nd){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){let o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=mr,i.endingEnd=mr):(e?i.endingStart=this.zeroSlopeAtStart?mr:pr:i.endingStart=fo,t?i.endingEnd=this.zeroSlopeAtEnd?mr:pr:i.endingEnd=fo)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}},g_=new Float32Array(1),zo=class extends ji{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let f=i[u],p=f.name,g=h[p];if(g!==void 0)++g.referenceCount,a[u]=g;else{if(g=a[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,p));continue}let x=t&&t._propertyBindings[u].binding.parsedPath;g=new gl(Kt.create(n,p,x),f.ValueTypeName,f.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,p),a[u]=g}o[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new No(new Float32Array(2),new Float32Array(2),1,g_),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,a=typeof e=="string"?Nr.findByName(i,e):e,o=a!==null?a.uuid:e,c=this._actionsByClip[o],l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Sl),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;let h=new _l(this,a,t,n);return this._bindAction(h,l),this._addInactiveAction(h,o,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?Nr.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,r,a);let o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){let l=a[o];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xl}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xl);function jo(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new Zt,l=0;for(let h=0;h<s.length;++h){let u=s[h],f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(u.morphAttributes[p])}if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(t){let h=0,u=[];for(let f=0;f<s.length;++f){let p=s[f].index;for(let g=0;g<p.count;++g)u.push(p.getX(g)+h);h+=s[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Sf(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let p=[];for(let x=0;x<a[h].length;++x)p.push(a[h][x][f]);let g=Sf(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function Sf(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){let h=s[l];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}let a=new e(r),o=0;for(let l=0;l<s.length;++l)a.set(s[l].array,o),o+=s[l].array.length;let c=new Pt(a,t,n);return i!==void 0&&(c.gpuType=i),c}function Pl(s,e){if(e===cf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ya||e===Wo){let t=s.getIndex();if(t===null){let a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===ya)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var Yo=class extends Zi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ol(t)}),this.register(function(t){return new ql(t)}),this.register(function(t){return new jl(t)}),this.register(function(t){return new Yl(t)}),this.register(function(t){return new kl(t)}),this.register(function(t){return new zl(t)}),this.register(function(t){return new Hl(t)}),this.register(function(t){return new Gl(t)}),this.register(function(t){return new Fl(t)}),this.register(function(t){return new Vl(t)}),this.register(function(t){return new Bl(t)}),this.register(function(t){return new Xl(t)}),this.register(function(t){return new Wl(t)}),this.register(function(t){return new Nl(t)}),this.register(function(t){return new Kl(t)}),this.register(function(t){return new Jl(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=xs.extractUrlBase(e);a=xs.resolveURL(l,this.path)}else a=xs.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new _a(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Rf){try{a[It.KHR_BINARY_GLTF]=new Zl(e)}catch(u){i&&i(u);return}r=JSON.parse(a[It.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new sh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case It.KHR_MATERIALS_UNLIT:a[u]=new Ul;break;case It.KHR_DRACO_MESH_COMPRESSION:a[u]=new Ql(r,this.dracoLoader);break;case It.KHR_TEXTURE_TRANSFORM:a[u]=new $l;break;case It.KHR_MESH_QUANTIZATION:a[u]=new eh;break;default:f.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function __(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var It={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Nl=class{constructor(e){this.parser=e,this.name=It.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ue(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Mn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Mi(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ur(h),l.distance=u;break;case"spot":l=new Oo(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,ys(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Ul=class{constructor(){this.name=It.KHR_MATERIALS_UNLIT}getMaterialType(){return fn}extendParams(e,t,n){let i=[];e.color=new Ue(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Mn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Ht))}return Promise.all(i)}},Fl=class{constructor(e){this.parser=e,this.name=It.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Ol=class{constructor(e){this.parser=e,this.name=It.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new He(o,o)}return Promise.all(r)}},Bl=class{constructor(e){this.parser=e,this.name=It.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},kl=class{constructor(e){this.parser=e,this.name=It.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ue(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Mn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Ht)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},zl=class{constructor(e){this.parser=e,this.name=It.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},Hl=class{constructor(e){this.parser=e,this.name=It.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ue().setRGB(o[0],o[1],o[2],Mn),Promise.all(r)}},Gl=class{constructor(e){this.parser=e,this.name=It.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Vl=class{constructor(e){this.parser=e,this.name=It.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ue().setRGB(o[0],o[1],o[2],Mn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Ht)),Promise.all(r)}},Wl=class{constructor(e){this.parser=e,this.name=It.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},Xl=class{constructor(e){this.parser=e,this.name=It.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ui}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},ql=class{constructor(e){this.parser=e,this.name=It.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},jl=class{constructor(e){this.parser=e,this.name=It.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Yl=class{constructor(e){this.parser=e,this.name=It.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Kl=class{constructor(e){this.name=It.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,f,i.mode,i.filter).then(function(p){return p.buffer}):a.ready.then(function(){let p=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(p),h,u,f,i.mode,i.filter),p})})}else return null}},Jl=class{constructor(e){this.name=It.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==di.TRIANGLES&&l.mode!==di.TRIANGLE_STRIP&&l.mode!==di.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,p=[];for(let g of u){let x=new dt,m=new B,d=new zn,S=new B(1,1,1),v=new Li(g.geometry,g.material,f);for(let P=0;P<f;P++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,P),c.ROTATION&&d.fromBufferAttribute(c.ROTATION,P),c.SCALE&&S.fromBufferAttribute(c.SCALE,P),v.setMatrixAt(P,x.compose(m,d,S));for(let P in c)if(P==="_COLOR_0"){let F=c[P];v.instanceColor=new hi(F.array,F.itemSize,F.normalized)}else P!=="TRANSLATION"&&P!=="ROTATION"&&P!=="SCALE"&&g.geometry.setAttribute(P,c[P]);Jt.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),p.push(v)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},Rf="glTF",Ma=12,wf={JSON:1313821514,BIN:5130562},Zl=class{constructor(e){this.name=It.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Ma),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Rf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Ma,r=new DataView(e,Ma),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===wf.JSON){let l=new Uint8Array(e,Ma+a,o);this.content=n.decode(l)}else if(c===wf.BIN){let l=Ma+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Ql=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=It.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=nh[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=nh[h]||h.toLowerCase();if(a[h]!==void 0){let f=n.accessors[e.attributes[h]],p=Or[f.componentType];l[u]=p.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){i.decodeDracoFile(h,function(p){for(let g in p.attributes){let x=p.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}u(p)},o,l,Mn,f)})})}},$l=class{constructor(){this.name=It.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},eh=class{constructor(){this.name=It.KHR_MESH_QUANTIZATION}},Ko=class extends gs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,f=u*u,p=f*u,g=e*l,x=g-l,m=-2*p+3*f,d=p-f,S=1-m,v=d-f+u;for(let P=0;P!==o;P++){let F=a[x+P+o],D=a[x+P+c]*h,N=a[g+P+o],Y=a[g+P]*h;r[P]=S*F+v*D+m*N+d*Y}return r}},x_=new zn,th=class extends Ko{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return x_.fromArray(r).normalize().toArray(r),r}},di={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Or={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ef={9728:yn,9729:Tn,9984:uo,9985:yl,9986:sa,9987:fs},Af={33071:ti,33648:la,10497:qi},Ll={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},nh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},vs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},v_={CUBICSPLINE:void 0,LINEAR:Bs,STEP:wr},Il={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function y_(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Qt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ci})),s.DefaultMaterial}function Vs(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ys(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function M_(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(f)}if(i){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function S_(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function w_(s){let e,t=s.extensions&&s.extensions[It.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Dl(t.attributes):e=s.indices+":"+Dl(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Dl(s.targets[n]);return e}function Dl(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function ih(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function E_(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var A_=new dt,sh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new __,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator!="undefined"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap=="undefined"||n||i&&r<98?this.textureLoader=new Fo(this.options.manager):this.textureLoader=new ko(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new _a(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Vs(r,o,i),ys(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[It.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(xs.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Ll[i.type],o=Or[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Pt(l,a,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=Ll[i.type],l=Or[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,x,m;if(p&&p!==u){let d=Math.floor(f/p),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+d+":"+i.count,v=t.cache.get(S);v||(x=new l(o,d*p,i.count*p/h),v=new Lr(x,p/h),t.cache.add(S,v)),m=new zs(v,c,f%p/h,g)}else o===null?x=new l(i.count*c):x=new l(o,f,i.count*c),m=new Pt(x,c,g);if(i.sparse!==void 0){let d=Ll.SCALAR,S=Or[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,P=i.sparse.values.byteOffset||0,F=new S(a[1],v,i.sparse.count*d),D=new l(a[2],P,i.sparse.count*c);o!==null&&(m=new Pt(m.array.slice(),m.itemSize,m.normalized));for(let N=0,Y=F.length;N<Y;N++){let A=F[N];if(m.setX(A,D[N*c]),c>=2&&m.setY(A,D[N*c+1]),c>=3&&m.setZ(A,D[N*c+2]),c>=4&&m.setW(A,D[N*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return h.magFilter=Ef[f.magFilter]||Tn,h.minFilter=Ef[f.minFilter]||fs,h.wrapS=Af[f.wrapS]||qi,h.wrapT=Af[f.wrapT]||qi,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,p){let g=f;t.isImageBitmapLoader===!0&&(g=function(x){let m=new In(x);m.needsUpdate=!0,f(m)}),t.load(xs.resolveURL(u,r.path),g,void 0,p)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),u.userData.mimeType=a.mimeType||E_(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[It.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[It.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[It.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new ga,Xn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new ma,Xn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Qt}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[It.KHR_MATERIALS_UNLIT]){let u=i[It.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Ue(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],Mn),o.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,Ht)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Rn);let h=r.alphaMode||Il.OPAQUE;if(h===Il.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Il.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==fn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new He(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==fn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==fn){let u=r.emissiveFactor;o.emissive=new Ue().setRGB(u[0],u[1],u[2],Mn)}return r.emissiveTexture!==void 0&&a!==fn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Ht)),Promise.all(l).then(function(){let u=new a(o);return r.name&&(u.name=r.name),ys(u,r),t.associations.set(u,{materials:e}),r.extensions&&Vs(i,u,r),u})}createUniqueName(e){let t=Kt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[It.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Tf(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=w_(l),u=i[h];if(u)a.push(u.promise);else{let f;l.extensions&&l.extensions[It.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Tf(new Zt,l,t),i[h]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?y_(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){let x=h[p],m=a[p],d,S=l[p];if(m.mode===di.TRIANGLES||m.mode===di.TRIANGLE_STRIP||m.mode===di.TRIANGLE_FAN||m.mode===void 0)d=r.isSkinnedMesh===!0?new Hs(x,S):new ze(x,S),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),m.mode===di.TRIANGLE_STRIP?d.geometry=Pl(d.geometry,Wo):m.mode===di.TRIANGLE_FAN&&(d.geometry=Pl(d.geometry,ya));else if(m.mode===di.LINES)d=new Dr(x,S);else if(m.mode===di.LINE_STRIP)d=new Ir(x,S);else if(m.mode===di.LINE_LOOP)d=new Po(x,S);else if(m.mode===di.POINTS)d=new ms(x,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(d.geometry.morphAttributes).length>0&&S_(d,r),d.name=t.createUniqueName(r.name||"mesh_"+e),ys(d,r),m.extensions&&Vs(i,d,m),t.assignFinalMaterial(d),u.push(d)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&Vs(i,u[0],r),u[0];let f=new Wn;r.extensions&&Vs(i,f,r),t.associations.set(f,{meshes:e});for(let p=0,g=u.length;p<g;p++)f.add(u[p]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new bn(uf.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ds(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ys(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let f=new dt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Co(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,f=i.channels.length;u<f;u++){let p=i.channels[u],g=i.samplers[p.sampler],x=p.target,m=x.node,d=i.parameters!==void 0?i.parameters[g.input]:g.input,S=i.parameters!==void 0?i.parameters[g.output]:g.output;x.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",d)),c.push(this.getDependency("accessor",S)),l.push(g),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],p=u[1],g=u[2],x=u[3],m=u[4],d=[];for(let S=0,v=f.length;S<v;S++){let P=f[S],F=p[S],D=g[S],N=x[S],Y=m[S];if(P===void 0)continue;P.updateMatrix&&P.updateMatrix();let A=n._createAnimationTracks(P,F,D,N,Y);if(A)for(let I=0;I<A.length;I++)d.push(A[I])}return new Nr(r,void 0,d)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(f,A_)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new pa:l.length>1?h=new Wn:l.length===1?h=l[0]:h=new Jt,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),ys(h,r),r.extensions&&Vs(n,h,r),r.matrix!==void 0){let u=new dt;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Wn;n.name&&(r.name=i.createUniqueName(n.name)),ys(r,n),n.extensions&&Vs(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,p]of i.associations)(f instanceof Xn||f instanceof In)&&u.set(f,p);return h.traverse(f=>{let p=i.associations.get(f);p!=null&&u.set(f,p)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,c=[];vs[r.path]===vs.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(o);let l;switch(vs[r.path]){case vs.weights:l=Ki;break;case vs.rotation:l=Di;break;case vs.position:case vs.scale:l=Ji;break;default:switch(n.itemSize){case 1:l=Ki;break;case 2:case 3:default:l=Ji;break}break}let h=i.interpolation!==void 0?v_[i.interpolation]:Bs,u=this._getArrayFromAccessor(n);for(let f=0,p=c.length;f<p;f++){let g=new l(c[f]+"."+vs[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=ih(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Di?th:Ko;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function T_(s,e,t){let n=e.attributes,i=new li;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new B(c[0],c[1],c[2]),new B(l[0],l[1],l[2])),o.normalized){let h=ih(Or[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new B,c=new B;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],p=f.min,g=f.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),f.normalized){let x=ih(Or[f.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new Dn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Tf(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(let a in n){let o=nh[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Ot.workingColorSpace!==Mn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ot.workingColorSpace}" not supported.`),ys(s,e),T_(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?M_(s,e.targets,t):s})}var Cf=function(){"use strict";var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:s,r,a=WebAssembly.instantiate(o(i),{}).then(function(d){r=d.instance,r.exports.__wasm_call_ctors()});function o(d){for(var S=new Uint8Array(d.length),v=0;v<d.length;++v){var P=d.charCodeAt(v);S[v]=P>96?P-97:P>64?P-39:P+4}for(var F=0,v=0;v<d.length;++v)S[F++]=S[v]<60?n[S[v]]:(S[v]-60)*64+S[++v];return S.buffer.slice(0,F)}function c(d,S,v,P,F,D){var N=r.exports.sbrk,Y=v+3&-4,A=N(Y*P),I=N(F.length),W=new Uint8Array(r.exports.memory.buffer);W.set(F,I);var ie=d(A,v,P,I,F.length);if(ie==0&&D&&D(A,Y,P),S.set(W.subarray(A,A+v*P)),N(A-N(0)),ie!=0)throw new Error("Malformed buffer data: "+ie)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],f=0;function p(d){var S={object:new Worker(d),pending:0,requests:{}};return S.object.onmessage=function(v){var P=v.data;S.pending-=P.count,S.requests[P.id][P.action](P.value),delete S.requests[P.id]},S}function g(d){for(var S="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+m.toString(),v=new Blob([S],{type:"text/javascript"}),P=URL.createObjectURL(v),F=0;F<d;++F)u[F]=p(P);URL.revokeObjectURL(P)}function x(d,S,v,P,F){for(var D=u[0],N=1;N<u.length;++N)u[N].pending<D.pending&&(D=u[N]);return new Promise(function(Y,A){var I=new Uint8Array(v),W=f++;D.pending+=d,D.requests[W]={resolve:Y,reject:A},D.object.postMessage({id:W,count:d,size:S,source:I,mode:P,filter:F},[I.buffer])})}function m(d){a.then(function(){var S=d.data;try{var v=new Uint8Array(S.count*S.size);c(r.exports[S.mode],v,S.count,S.size,S.source,r.exports[S.filter]),self.postMessage({id:S.id,count:S.count,action:"resolve",value:v},[v.buffer])}catch(P){self.postMessage({id:S.id,count:S.count,action:"reject",value:P})}})}return{ready:a,supported:!0,useWorkers:function(d){g(d)},decodeVertexBuffer:function(d,S,v,P,F){c(r.exports.meshopt_decodeVertexBuffer,d,S,v,P,r.exports[l[F]])},decodeIndexBuffer:function(d,S,v,P){c(r.exports.meshopt_decodeIndexBuffer,d,S,v,P)},decodeIndexSequence:function(d,S,v,P){c(r.exports.meshopt_decodeIndexSequence,d,S,v,P)},decodeGltfBuffer:function(d,S,v,P,F,D){c(r.exports[h[F]],d,S,v,P,r.exports[l[D]])},decodeGltfBufferAsync:function(d,S,v,P,F){return u.length>0?x(d,S,v,h[P],l[F]):a.then(function(){var D=new Uint8Array(d*S);return c(r.exports[h[P]],D,d,S,v,r.exports[l[F]]),D})}}}();function Pf(s){let e=new Map,t=new Map,n=s.clone();return Lf(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Lf(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)Lf(s.children[n],e.children[n],t)}var Sa=class extends ps{constructor(e=null){super();let t=new ln;t.deleteAttribute("uv");let n=new Qt({side:Cn}),i=new Qt,r=5;e!==null&&e._useLegacyLights===!1&&(r=900);let a=new Ur(16777215,r,28,2);a.position.set(.418,16.199,.3),this.add(a);let o=new ze(t,n);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);let c=new ze(t,i);c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),this.add(c);let l=new ze(t,i);l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),this.add(l);let h=new ze(t,i);h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),this.add(h);let u=new ze(t,i);u.position.set(-2.017,.018,6.124),u.rotation.set(0,.333,0),u.scale.set(2.002,4.566,2.064),this.add(u);let f=new ze(t,i);f.position.set(2.291,-.756,-2.621),f.rotation.set(0,-.286,0),f.scale.set(1.546,1.552,1.496),this.add(f);let p=new ze(t,i);p.position.set(-2.193,-.369,-5.547),p.rotation.set(0,.516,0),p.scale.set(3.875,3.487,2.986),this.add(p);let g=new ze(t,Br(50));g.position.set(-16.116,14.37,8.208),g.scale.set(.1,2.428,2.739),this.add(g);let x=new ze(t,Br(50));x.position.set(-16.109,18.021,-8.207),x.scale.set(.1,2.425,2.751),this.add(x);let m=new ze(t,Br(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);let d=new ze(t,Br(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let S=new ze(t,Br(20));S.position.set(3.235,11.486,-12.541),S.scale.set(2.5,2,.1),this.add(S);let v=new ze(t,Br(100));v.position.set(0,20,0),v.scale.set(1,.1,1),this.add(v)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Br(s){let e=new fn;return e.color.setScalar(s),e}var Ze=B,Qi=zn,dn=(s,e,t)=>s<e?e:s>t?t:s,rt=(s,e,t)=>{let n=dn((t-s)/(e-s),0,1);return n*n*(3-2*n)};var rh=1.1,ah=.15,If={idle:"Idle_Loop",walk:"Walk_Loop",jog:"Jog_Fwd_Loop",sprint:"Sprint_Loop",dance:"Dance_Loop",air:"Jump_Loop",crouch:"Crouch_Idle_Loop",talk:"Idle_Talking_Loop"},Jo=["#2f1b11","#3f2618","#4d2e1d","#5c3822","#70442a","#83512f","#966039","#a8724a","#b9835a","#c4916a","#cf9f7a","#d9ab86","#e0b590"],C_={dark:"#2a1a10",brown:"#5a3518",hazel:"#7a5a2a",green:"#4e7a45",blue:"#4f7fb3",grey:"#7d8b96"},P_=["#0a0a0c","#0a0a0c","#121010","#17110d","#24170f","#3a2414","#5a3a20","#7a5230","#a07a44","#c9a55a","#6b2f1a"];function L_(s){let e=s.tier||(s.weak?"low":"mid"),t=e==="low",n={high:{pr:1.75,sh:2048,crowd:5e3,near:36},mid:{pr:1.5,sh:1024,crowd:3e3,near:26},low:{pr:1,sh:512,crowd:1400,near:16}}[e]||{pr:1.5,sh:1024,crowd:3e3,near:26},i={},r=s.G3,a=null,o=null,c,l,h,u,f=null,p=!1,g=0,x=0,m=0,d={n:1,dt:.016,now:0},S=new Set,v=new Yo;v.setMeshoptDecoder(Cf);let P=y=>s.base+y+"?v="+s.v;function F(){if(a)return!p;o=document.createElement("canvas"),o.style.cssText="display:block;width:100%;height:100%;border-radius:0;box-shadow:none";try{a=new Pr({canvas:o,antialias:!t,alpha:!0,powerPreference:"high-performance"})}catch{return a=null,!1}a.outputColorSpace=Ht,a.toneMapping=Go,a.toneMappingExposure=1.08,a.shadowMap.enabled=!0,a.shadowMap.type=Ho,c=new ps,c.fog=new To(724260,.0026),l=new bn(40,1,.1,1e3);try{let w=new ks(a);c.environment=w.fromScene(new Sa,.04).texture,w.dispose()}catch{}h=new xa(13097215,2112034,.7),c.add(h),u=new Mi(16774114,2.6),u.castShadow=!0;let y=n.sh;u.shadow.mapSize.set(y,y),e==="low"&&(u.castShadow=!1),u.shadow.bias=-5e-4,u.shadow.normalBias=.03,u.shadow.camera.near=1,u.shadow.camera.far=220,c.add(u),c.add(u.target);let M=new Mi(10467327,.6);return M.position.set(-40,30,-30),c.add(M),o.addEventListener("webglcontextlost",w=>{w.preventDefault(),p=!0}),o.addEventListener("webglcontextrestored",()=>{p=!1}),!0}i.ok=()=>!!(D&&a&&!p&&g<3);let D=null,N={},Y=null,A=Promise.all([v.loadAsync(P("w3d-player.glb")),v.loadAsync(P("w3d-anims.glb"))]).then(([y,M])=>{for(let b of M.animations)N[b.name]=b;Y=y.scene,Y.updateMatrixWorld(!0),Y.traverse(b=>{if(!b.isSkinnedMesh)return;let T=b.geometry,C=T.attributes.position,_=T.attributes.normal,U=C.count,V=new Float32Array(U*3),k=new Float32Array(U*3),ee=new Ze,pe=new Ze;for(let H=0;H<U;H++)ee.fromBufferAttribute(C,H),pe.fromBufferAttribute(_,H).multiplyScalar(.01).add(ee),b.applyBoneTransform(H,ee),b.applyBoneTransform(H,pe),pe.sub(ee).normalize(),V[H*3]=ee.x,V[H*3+1]=ee.y,V[H*3+2]=ee.z,k[H*3]=pe.x,k[H*3+1]=pe.y,k[H*3+2]=pe.z;{let H=T.attributes._shift;if(H)for(let te=0;te<U;te++)V[te*3]-=H.getX(te),V[te*3+1]-=H.getY(te),V[te*3+2]-=H.getZ(te)}T.setAttribute("aB",new Pt(V,3)),T.setAttribute("aBN",new Pt(k,3));{let H=new Ze().fromBufferAttribute(C,0),te=new Ze().fromBufferAttribute(C,U-1);T.userData.k=H.distanceTo(te)/Math.max(1e-6,Math.hypot(V[0]-V[U*3-3],V[1]-V[U*3-2],V[2]-V[U*3-1]))}T.boundingSphere=new Dn(new Ze(0,.9,0),1.6),b.frustumCulled=!0});let w=null;if(Y.traverse(b=>{b.isSkinnedMesh&&b.name!=="Body_LO"&&/Superhero/i.test(b.material.name||"")&&(w=b)}),w){let b=w.geometry,T=b.attributes.position,C=b.attributes.normal,_=b.attributes.aB,U=b.attributes.aBN,V=b.index,k=new Ze().fromBufferAttribute(T,0),ee=new Ze().fromBufferAttribute(T,1),pe=new Ze().fromBufferAttribute(_,0),H=new Ze().fromBufferAttribute(_,1),te=k.distanceTo(ee)/Math.max(1e-6,pe.distanceTo(H)),ae=ce=>{let _e=_.getY(ce),q=U.getZ(ce),Se=Math.abs(_.getX(ce));if(_e<1.585)return!1;let qe=1.745+(1.6-1.745)*rt(.25,-.6,q);return Se>.07&&q>-.2&&(qe=Math.max(qe,1.735-(Se-.07)*.6)),_e>qe-.004},ye=ce=>{let _e=_.getY(ce),q=_.getZ(ce),Se=Math.abs(_.getX(ce));return _e<1.555||_e>1.668||q<-.035||Se>.088||Se<.031&&Math.abs(_e-1.637)<.0095&&q>.07?!1:_e>1.648&&Se<.045&&q>.09?_e<1.656&&Se<.03:U.getY(ce)>-.92||_e>1.575},$e=ce=>{let _e=_.getY(ce);return _e>1.728&&_e<1.758&&U.getY(ce)<.75},Ye=ce=>{let _e=[];for(let q=0;q<V.count;q+=3){let Se=V.getX(q),qe=V.getX(q+1),gt=V.getX(q+2);ce(Se)&&ce(qe)&&ce(gt)&&_e.push(Se,qe,gt)}return _e},ct={hair:Ye(ae),beard:Ye(ce=>ye(ce)&&U.getY(ce)>-.5),band:Ye($e)},Le=(ce,_e,q,Se)=>{let qe=ct[Se||"hair"],gt=new Map,Tt=[],wt=[],rn=[],Fn=[],jn=[],$t=[],Ei=[],Ai=new Ze,Jn=new Ze,Es=q?qe.filter((Yt,Wt)=>{let hn=Wt-Wt%3;return[0,1,2].every(lt=>q(_.getX(qe[hn+lt]),_.getY(qe[hn+lt]),_.getZ(qe[hn+lt])))}):qe;for(let Yt of Es){if(!gt.has(Yt)){gt.set(Yt,gt.size),Ai.fromBufferAttribute(T,Yt),Jn.fromBufferAttribute(C,Yt).normalize();let Wt=_e(_.getX(Yt),_.getY(Yt),_.getZ(Yt),U.getZ(Yt)),hn=Wt*te;Tt.push(Ai.x+Jn.x*hn,Ai.y+Jn.y*hn,Ai.z+Jn.z*hn),wt.push(Jn.x,Jn.y,Jn.z),Ei.push(Wt),$t.push(_.getX(Yt)+U.getX(Yt)*Wt,_.getY(Yt)+U.getY(Yt)*Wt,_.getZ(Yt)+U.getZ(Yt)*Wt);for(let lt=0;lt<4;lt++)rn.push(b.attributes.skinIndex.getComponent(Yt,lt)),Fn.push(b.attributes.skinWeight.getComponent(Yt,lt))}jn.push(gt.get(Yt))}let On=new Zt;On.setAttribute("position",new Lt(Tt,3)),On.setAttribute("normal",new Lt(wt,3)),On.setAttribute("skinIndex",new Rr(rn,4)),On.setAttribute("skinWeight",new Lt(Fn,4)),On.setAttribute("aB",new Lt($t,3));{let Yt=Ei.slice().sort((hn,lt)=>hn-lt),Wt=Math.max(1e-5,Yt[Math.floor(Yt.length*.7)]||1e-5);On.setAttribute("aE",new Lt(Ei.map(hn=>Math.min(1,hn/Wt)),1))}On.setIndex(jn),On.boundingSphere=new Dn(new Ze(0,.9,0),1.6),On.userData.k=te;let si=new Hs(On,new Qt({color:1118481,roughness:.95}));si.name=ce,si.castShadow=!0,si.visible=!1,w.parent.add(si),si.bind(w.skeleton,w.bindMatrix)},Rt=(ce,_e)=>{let q=Math.abs(ce),Se=1.745+(1.6-1.745)*rt(.25,-.6,_e);return q>.07&&_e>-.2&&(Se=Math.max(Se,1.735-(q-.07)*.6)),Se},jt=(ce,_e)=>(q,Se,qe,gt)=>ce(q,Se,qe,gt)*(.35+.65*rt(0,_e||.03,Se-Rt(q,gt)));Le("h_crew",()=>.007),Le("h_short",jt(()=>.011,.02)),Le("h_afro",jt((ce,_e,q)=>.03+.03*rt(1.62,1.75,_e),.05)),Le("h_top",(ce,_e,q)=>.006+.034*rt(1.73,1.8,_e)*(1-rt(.06,.1,Math.abs(ce)))),Le("h_corn",()=>.0055),Le("h_hawk",(ce,_e)=>.004+.045*(1-rt(.008,.026,Math.abs(ce)))*rt(1.69,1.76,_e),ce=>Math.abs(ce)<.032),Le("h_under",(ce,_e)=>.006+.014*rt(1.71,1.78,_e)*(1-rt(.03,.055,Math.abs(ce))),(ce,_e)=>Math.abs(ce)<.062||_e>1.79),Le("h_curl",jt((ce,_e)=>.016+.012*rt(1.7,1.79,_e))),Le("h_quiff",jt((ce,_e,q)=>.012+.032*rt(0,.07,q)*rt(1.735,1.78,_e),.02)),Le("h_part",jt((ce,_e)=>.014+.006*rt(1.75,1.8,_e),.02)),Le("h_slick",(ce,_e,q)=>.009+.006*rt(.04,-.05,q)),Le("h_twist",jt((ce,_e)=>.024+.012*rt(1.72,1.79,_e),.04)),Le("h_dread",jt((ce,_e)=>.026+.01*rt(1.72,1.79,_e),.04));let Un=(ce,_e)=>rt(1.566,1.595,_e)*(1-rt(.072,.088,Math.abs(ce)))*(1-rt(1.648,1.665,_e)*rt(.04,.06,Math.abs(ce)));Le("b_full",(ce,_e,q)=>(.004+.008*rt(1.63,1.59,_e)*(1-.6*rt(.04,.08,Math.abs(ce))))*Un(ce,_e),null,"beard"),Le("b_short",(ce,_e)=>(.003+.003*rt(1.62,1.585,_e))*Un(ce,_e),null,"beard"),Le("b_goat",(ce,_e,q)=>(.004+.009*rt(1.625,1.59,_e))*rt(1.562,1.58,_e)*(1-rt(.022,.032,Math.abs(ce))),(ce,_e,q)=>Math.abs(ce)<.034&&(_e<1.63||_e>1.64),"beard"),Le("g_band0",()=>.004,null,"band"),Le("g_band",()=>.017,null,"band"),Le("g_bandX",()=>.064,null,"band");let sn=(ce,_e,q)=>{let Se=Ye(_e),qe=new Map,gt=[];for(let lt of Se)qe.has(lt)||(qe.set(lt,gt.length),gt.push(lt));let Tt=gt.length,wt=new Float32Array(Tt*3),rn=Array.from({length:Tt},()=>new Set),Fn=new Map;for(let lt=0;lt<Se.length;lt+=3){let ot=qe.get(Se[lt]),st=qe.get(Se[lt+1]),un=qe.get(Se[lt+2]);rn[ot].add(st).add(un),rn[st].add(ot).add(un),rn[un].add(ot).add(st);for(let[Zn,mn]of[[ot,st],[st,un],[un,ot]]){let Qn=Zn<mn?Zn+":"+mn:mn+":"+Zn;Fn.set(Qn,(Fn.get(Qn)||0)+1)}}let jn=new Uint8Array(Tt);for(let[lt,ot]of Fn)if(ot===1){let[st,un]=lt.split(":").map(Number);jn[st]=jn[un]=1}gt.forEach((lt,ot)=>{let st=_.getX(lt),un=_.getY(lt),Zn=_.getZ(lt),mn=q(st,un,Zn);wt[ot*3]=st+U.getX(lt)*mn,wt[ot*3+1]=un+U.getY(lt)*mn,wt[ot*3+2]=Zn+U.getZ(lt)*mn});let $t=new Float32Array(Tt*3);for(let lt=0;lt<(ce==="k_shirt"?24:12);lt++){for(let ot=0;ot<Tt;ot++){let st=0,un=0,Zn=0,mn=0;for(let pi of rn[ot])st+=wt[pi*3],un+=wt[pi*3+1],Zn+=wt[pi*3+2],mn++;let Qn=jn[ot]?0:.55;$t[ot*3]=wt[ot*3]+(mn?(st/mn-wt[ot*3])*Qn:0),$t[ot*3+1]=wt[ot*3+1]+(mn?(un/mn-wt[ot*3+1])*Qn*.6:0),$t[ot*3+2]=wt[ot*3+2]+(mn?(Zn/mn-wt[ot*3+2])*Qn:0)}for(let ot=0;ot<Tt;ot++){let st=gt[ot],un=$t[ot*3]-_.getX(st),Zn=$t[ot*3+1]-_.getY(st),mn=$t[ot*3+2]-_.getZ(st),Qn=un*U.getX(st)+Zn*U.getY(st)+mn*U.getZ(st),pi=q(_.getX(st),_.getY(st),_.getZ(st))*.55;Qn<pi&&($t[ot*3]+=U.getX(st)*(pi-Qn),$t[ot*3+1]+=U.getY(st)*(pi-Qn),$t[ot*3+2]+=U.getZ(st)*(pi-Qn))}wt.set($t)}let Ei=new Float32Array(Tt*3),Ai=new Float32Array(Tt*3),Jn=new Float32Array(Tt*3),Es=new Float32Array(Tt*3),On=new Uint16Array(Tt*4),si=new Float32Array(Tt*4),Yt=new Ze;gt.forEach((lt,ot)=>{Yt.fromBufferAttribute(T,lt);for(let st=0;st<3;st++){let un=wt[ot*3+st]-_.getComponent(lt,st);Ai[ot*3+st]=un*te,Ei[ot*3+st]=Yt.getComponent(st)+un*te,Jn[ot*3+st]=_.getComponent(lt,st),Es[ot*3+st]=U.getComponent(lt,st)}for(let st=0;st<4;st++)On[ot*4+st]=b.attributes.skinIndex.getComponent(lt,st),si[ot*4+st]=b.attributes.skinWeight.getComponent(lt,st)});let Wt=new Zt;Wt.setAttribute("position",new Pt(Ei,3)),Wt.setAttribute("aOff",new Pt(Ai,3)),Wt.setAttribute("aB",new Pt(Jn,3)),Wt.setAttribute("aBN",new Pt(Es,3)),Wt.setAttribute("skinIndex",new Pt(On,4)),Wt.setAttribute("skinWeight",new Pt(si,4)),Wt.setIndex(Se.map(lt=>qe.get(lt))),Wt.computeVertexNormals(),Wt.boundingSphere=new Dn(new Ze(0,.9,0),1.6),Wt.userData.k=te;let hn=new Hs(Wt,w.material);hn.name=ce,hn.castShadow=!0,hn.receiveShadow=!1,w.parent.add(hn),hn.bind(w.skeleton,w.bindMatrix)},ii=ce=>Math.abs(_.getX(ce))>.232&&_.getY(ce)>1.2,es=ce=>1.5+rt(.075,.16,ce)*.1;sn("k_shirt",ce=>{let _e=_.getY(ce),q=Math.abs(_.getX(ce));return ii(ce)?q<.405:_e>.79&&_e<es(q)-.004&&!(q>.2&&_e<1.2&&U.getY(ce)<-.6)},(ce,_e,q)=>{let Se=Math.abs(ce);return Se>.232&&_e>1.2?.008+.015*rt(.27,.4,Se):(.012+.013*rt(1,.82,_e)+.002*rt(1.2,1.4,_e)*rt(0,.08,q))*(1-.82*rt(1.4,1.5,_e)*(1-rt(.16,.22,Se)))}),sn("k_shorts",ce=>{let _e=_.getY(ce);return!ii(ce)&&_e>.6&&_e<.9},(ce,_e)=>.016+.022*rt(.74,.62,_e)+.004*rt(.8,.88,_e)),sn("k_trou",ce=>{let _e=_.getY(ce);return!ii(ce)&&_e>.1&&_e<.95},(ce,_e)=>.013+.01*rt(.45,.15,_e)+.013*rt(.8,.92,_e))}{let b=Y.getObjectByName("Head"),T=new Jt;b.add(T),b.matrixWorld.clone().invert().decompose(T.position,T.quaternion,T.scale);let C=()=>new Qt({color:1118481,roughness:.9}),_=(k,ee,pe)=>{if(ee.name=k,ee.castShadow=!0,ee.visible=!1,pe){let H=new Jt;H.name=k+"_pv",H.position.set(0,pe,-.06),ee.position.y-=pe,ee.position.z+=.06,H.add(ee),T.add(H)}else T.add(ee);return ee},U=_("h_bun",new ze(new Yi(.036,14,10),C()));U.position.set(0,1.79,-.085),U.scale.set(1,.9,1);{let k=new Wn,ee=C(),pe=new ze(new Yi(.03,12,8),ee);pe.position.set(0,1.735,-.112),k.add(pe);let H=new ze(new yi(.022,.008,.16,8),ee);H.position.set(0,1.655,-.13),H.rotation.x=-.25,k.add(H),_("h_pony",k,1.74)}let V=k=>{let ee=[];for(let pe=0;pe<17;pe++){let H=-2.25+pe*4.5/16,te=.092,ae=new yi(.011,.008,k*(.85+.3*(pe*7%5)/4),6);ae.translate(0,-k/2,0),ae.rotateX(.18+.08*Math.cos(H)),ae.rotateY(H),ae.translate(Math.sin(H)*-te*1,1.745,Math.cos(H)*-te-.005),ee.push(ae)}return jo(ee)};_("h_locksS",new ze(V(.11),C()),1.74),_("h_locksL",new ze(V(.21),C()),1.74);{let k=new yi(.1,.118,.2,20,1,!0,Math.PI*.62,Math.PI*.76);k.translate(0,1.66,-.012);let ee=new ze(k,C());ee.material.side=Rn,_("h_long",ee,1.76)}}{let b=new Qi,T=new Qi,C=new Ze(0,0,1);for(let _ of["l","r"])for(let U of["index","middle","ring","pinky","thumb"])for(let V=1;V<=3;V++){let k=Y.getObjectByName(U+"_0"+V+"_"+_);if(!k)continue;let ee=(U==="thumb"?[.15,.25,.2]:[.45,.6,.4])[V-1]*(_==="l"?-1:1)*(U==="pinky"?1.15:1);Y.updateMatrixWorld(!0),b.setFromAxisAngle(C,ee),k.parent.getWorldQuaternion(T),k.quaternion.premultiply(T.clone().invert().multiply(b).multiply(T))}Y.updateMatrixWorld(!0)}if(!F())throw new Error("no WebGL");return D=y,i.ready=!0,i}),I=(y,M,w)=>{let b=document.createElement("canvas");return b.width=y,b.height=M,w(b.getContext("2d"),y,M),b},W=(y,M,w)=>{let b=new Lo(y);return M!==!1&&(b.colorSpace=Ht),w&&(b.wrapS=b.wrapT=qi),b.anisotropy=t?1:4,b},ie=null,Me=()=>ie||(ie=W(I(640,96,y=>{y.fillStyle="#000",y.fillRect(0,0,640,96),y.font="900 80px Arial, Helvetica, sans-serif",y.textAlign="center",y.textBaseline="middle",y.lineJoin="round",y.globalCompositeOperation="lighter";for(let M=0;M<10;M++)y.strokeStyle="#0000ff",y.lineWidth=10,y.strokeText(String(M),M*64+35,56),y.fillStyle="#0000ff",y.fillText(String(M),M*64+35,56);y.globalCompositeOperation="source-over";for(let M=0;M<10;M++)y.strokeStyle="#00ff00",y.lineWidth=9,y.strokeText(String(M),M*64+32,52),y.fillStyle="#ffffff",y.fillText(String(M),M*64+32,52)}),!1)),z=(y,M,w)=>I(512,256,b=>{for(let T=0;T<2;T++){b.save(),b.translate(T*256,0),b.scale(4,4),b.beginPath(),b.rect(0,0,64,64),b.clip();let C=y.c2;b.fillStyle=M||y.c1,b.fillRect(0,0,64,64),b.fillStyle=C,M||({stripes:()=>{for(let U=4;U<64;U+=16)b.fillRect(U,0,7,64)},hoops:()=>{for(let U=10;U<64;U+=16)b.fillRect(0,U,64,7)},halves:()=>b.fillRect(32,0,32,64),sash:()=>{b.beginPath(),b.moveTo(0,10),b.lineTo(12,0),b.lineTo(64,52),b.lineTo(52,64),b.fill()},pinstripes:()=>{for(let U=3;U<64;U+=6)b.fillRect(U,0,1.2,64)},chevron:()=>{b.beginPath(),b.moveTo(0,6),b.lineTo(32,26),b.lineTo(64,6),b.lineTo(64,16),b.lineTo(32,36),b.lineTo(0,16),b.fill()},gradient:()=>{let U=b.createLinearGradient(0,0,0,64);U.addColorStop(0,y.c1),U.addColorStop(1,C),b.fillStyle=U,b.fillRect(0,0,64,64)},checker:()=>{for(let U=0;U<64;U+=12)for(let V=0;V<64;V+=12)(U+V)/12%2&&b.fillRect(U,V,12,12)},centre:()=>b.fillRect(26,0,12,64)}[y.pat]||(()=>{}))();let _=b.createLinearGradient(0,0,64,0);_.addColorStop(0,"rgba(0,0,0,.18)"),_.addColorStop(.5,"rgba(255,255,255,.05)"),_.addColorStop(1,"rgba(0,0,0,.18)"),b.fillStyle=_,b.fillRect(0,0,64,64),T||(b.fillStyle="rgba(255,255,255,.75)",b.fillRect(16,12,6,1.2),w&&b.drawImage(w,40,9,10,11.3)),b.restore()}}),X=new Map;i.team=function(y,M,w,b){let T=s.kitN(y),C=s.hx(M,"#facc15"),_=JSON.stringify([T,C,w||null,b||""]),U=X.get(_);if(U)return X.delete(_),X.set(_,U),U;let V=W(z(T)),k=W(z(T,C));if(U={_b3:1,key:_,K:T,g:C,tex:V,gtex:k},w)try{let ee=s.crestSvg(w,b,46).replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" '),pe=new Image;pe.onload=()=>{U.dead||(U.tex.image=z(T,null,pe),U.tex.needsUpdate=!0,U.gtex.image=z(T,C,pe),U.gtex.needsUpdate=!0)},pe.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(ee)}catch{}if(X.set(_,U),X.size>10){let[ee,pe]=X.entries().next().value;X.delete(ee),pe.dead=1,pe.tex.dispose(),pe.gtex.dispose()}return U},i.freeTeam=function(){};let ne=y=>{let M=new Ue(y);return .3*M.r+.59*M.g+.11*M.b},le=`uniform vec4 uFace; uniform vec4 uFace2; uniform vec4 uFace3; uniform vec4 uExpr; uniform float uK;
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
  }`,oe=`uniform vec4 uBody;
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
  }`,re=(y,M)=>{y.vertexShader=`attribute vec3 aB;
`+(M?`attribute vec3 aBN;
varying vec3 vB;
varying vec3 vBN;
`+oe+`
`:"")+le+`
`+y.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
`+(M?`vB = aB; vBN = aBN;
transformed += bodyDef(aB, aBN) * uK;
`:"")+"transformed += faceDef(aB) * uK;")},ge=()=>({uFace:{value:new Ct},uFace2:{value:new Ct},uFace3:{value:new Ct},uExpr:{value:new Ct}});function ve(y,M,w,b,T){let C=new Qt({map:y.map,roughness:.6,metalness:0,envMapIntensity:.45}),_=()=>({value:new Ue}),U=C.userData.u=Object.assign(b?Object.assign({},b):{uSkin:_(),uHair:_(),uSho:_(),uSoc:_(),uSlv:_(),uCol:_(),uBoot:_(),uBoot2:_(),uGlove:_(),uNumC:_(),uTape:_(),uShirt:{value:null},uDig:{value:Me()},uName:{value:null},uNum:{value:new He(-1,-1)},uGK:{value:0},uHairS:{value:1},uBeard:{value:0},uRed:{value:0},uBody:{value:new Ct(0,1,0,0)},uGear:{value:new Ct}},M,{uK:{value:w},uLayer:{value:T||0}});return b||(C.userData.base=U),T&&(C.side=Rn,C.roughness=.82),C.onBeforeCompile=V=>{Object.assign(V.uniforms,U),re(V,!0),T===1&&(V.vertexShader=`attribute vec3 aOff;
uniform float uLayer;
`+V.vertexShader.replace("transformed += bodyDef(aB, aBN) * uK;","transformed += bodyDef(aB, aBN) * uK; transformed -= aOff * (1.0 - uBody.z) * (1.0 - smoothstep(0.83, 0.9, aB.y)) * 0.85;")),V.fragmentShader=`uniform float uLayer;
`+V.fragmentShader,V.fragmentShader=`uniform vec3 uSkin,uHair,uSho,uSoc,uSlv,uCol,uBoot,uBoot2,uGlove,uNumC,uTape;uniform sampler2D uShirt,uDig,uName;uniform vec2 uNum;uniform float uGK,uHairS,uBeard,uRed;uniform vec4 uExpr,uBody,uGear;varying vec3 vB;varying vec3 vBN;
float hz(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
`+V.fragmentShader.replace("#include <map_fragment>",`float wSkin = 0.0;
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
#include <opaque_fragment>`)},C.customProgramCacheKey=()=>"w3dbody6_"+(T||0),C}function Ie(y,M,w,b){let T=y.clone(),C=Object.assign({},M,{uK:{value:w},uIris:{value:new Ue}});return T.userData.u=C,T.onBeforeCompile=_=>{Object.assign(_.uniforms,C),re(_,!1),b||(_.vertexShader=_.vertexShader.replace("transformed += faceDef(aB) * uK;","transformed += faceDef(aB) * uK; transformed.y += (1.713 - aB.y) * 0.35 * uK; transformed.z -= 0.0015 * uK;")),b&&(_.fragmentShader=`uniform vec3 uIris;
`+_.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ vec3 c = diffuseColor.rgb; float mx = max(c.r, max(c.g, c.b)), mn = min(c.r, min(c.g, c.b)), L = dot(c, vec3(0.3, 0.59, 0.11)); float ir = smoothstep(0.03, 0.09, mx - mn) * (1.0 - smoothstep(0.3, 0.5, L)); diffuseColor.rgb = mix(c, uIris * clamp(L / 0.12, 0.5, 1.6), ir); }`))},T.customProgramCacheKey=()=>b?"w3deye2":"w3dbrow3",T}function $(y,M,w){let b=new Qt({color:1118481,roughness:.88,envMapIntensity:.35}),T=Object.assign({},y,{uK:{value:M||1},uStyle:{value:0},uTip:{value:new Ct(0,0,0,0)}});return b.userData.u=T,b.onBeforeCompile=C=>{Object.assign(C.uniforms,T),re(C,!1),C.vertexShader=`attribute float aE;
varying vec3 vHB;
varying float vE;
`+C.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vHB = aB; vE = aE;`),C.fragmentShader=`uniform float uStyle;uniform vec4 uTip;varying vec3 vHB;varying float vE;
float hz2(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
`+C.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
        { vec3 p = vHB; if (vE < 0.2 + 0.45 * hz2(floor(p * 1100.0))) discard; float n = hz2(floor(p * vec3(700.0, 260.0, 700.0)));
          float g = 0.72 + 0.45 * n;
          if (uStyle > 0.5 && uStyle < 1.5) { float r = abs(sin(p.x / 0.0085 * 3.14159)); g *= mix(0.45, 1.15, smoothstep(0.15, 0.6, r)); }
          else if (uStyle > 1.5 && uStyle < 2.5) { float c = hz2(floor(p * 160.0)); g *= 0.65 + 0.55 * c; }
          else if (uStyle > 2.5 && uStyle < 3.5) { vec2 q = vec2(atan(p.x, p.z) * 9.0, p.y * 70.0); float c = length(fract(q) - 0.5); g *= mix(1.15, 0.5, smoothstep(0.25, 0.5, c)); }
          else if (uStyle > 3.5 && uStyle < 4.5) { if (abs(p.x - 0.032) < 0.0035 && p.z > -0.02 && p.y > 1.73) g *= 0.35; float c = hz2(floor(p * vec3(900.0, 900.0, 120.0))); g *= 0.8 + 0.3 * c; }
          else if (uStyle > 4.5) { float c = hz2(floor(p * vec3(500.0, 500.0, 60.0))); g *= 0.75 + 0.5 * c; }
          diffuseColor.rgb *= g;
          if (uTip.w > 0.5) diffuseColor.rgb = mix(diffuseColor.rgb, uTip.rgb * (0.8 + 0.3 * n), smoothstep(1.765, 1.79, p.y)); }`)},b.customProgramCacheKey=()=>"w3dhair4",b}function ue(y,M,w,b){let T=new Qt({map:y.map,normalMap:y.normalMap,normalScale:new He(.8,.8),roughness:b?.8:.62,metalness:0,envMapIntensity:.3}),C=Object.assign({},M,{uK:{value:w||1},uCut:{value:0}});return T.userData.u=C,T.onBeforeCompile=_=>{Object.assign(_.uniforms,C),re(_,!1),_.vertexShader=`varying vec3 vHB;
`+_.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vHB = aB;`),_.fragmentShader=`uniform float uCut; varying vec3 vHB;
`+_.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ float ax = abs(vHB.x); if (uCut > 1.5 && ax > (vHB.y > 1.642 ? 0.046 : 0.033)) discard; if (uCut > 0.5 && uCut < 1.5 && vHB.y > 1.62 && ax > 0.055) discard; float g = dot(diffuseColor.rgb, vec3(0.333)); diffuseColor.rgb = vec3(clamp(0.35 + g * 1.05, 0.0, 1.4)) * diffuse; }`)},T.customProgramCacheKey=()=>"w3dmhair2",T}let we=[],Ve=new Map,je=30;function ht(){let y=Pf(Y),M={root:y,bones:{},mixer:new zo(y),act:{},w:{},id:null,lastN:-9,mod:new Map,ph:0,ex:new Ct,look:0,lookP:0,lean:0};y.traverse(b=>{b.isBone&&(M.bones[b.name]=b)});let w=M.FU=ge();M.mats=[],M.parts={},M.lockMat=new Qt({color:1118481,roughness:.9}),M.bandMat=new Qt({color:16777215,roughness:.7}),y.traverse(b=>{let T=b.geometry&&b.geometry.userData.k||1;b.isSkinnedMesh&&/^k_/.test(b.name)?((M.cloth=M.cloth||[]).push(b),b.userData.layer=b.name==="k_shirt"?1:b.name==="k_trou"?3:2):b.isSkinnedMesh&&b.material&&/Superhero/i.test(b.material.name||"")?(b.material=ve(b.material,w,T,M.bodyU),M.bodyU=M.bodyU||b.material.userData.u,M.mats.push(b.material),b.castShadow=!0,b.name==="Body_LO"?M.lo=b:(M.hi=b,M.mat=b.material)):b.isSkinnedMesh&&/^m_/.test(b.name)?(b.material=ue(b.material,w,T,b.name==="m_beard"),b.name==="m_beard"?M.mBeard=b.material:(M.mHair=M.mHair||[]).push(b.material),M.parts[b.name]=b,b.castShadow=!0,b.visible=!1):b.isSkinnedMesh&&/Hair/i.test(b.material.name||"")?(b.material=Ie(b.material,w,T,!1),M.browMat=b.material):b.isSkinnedMesh&&/Eye/i.test(b.material.name||"")?(b.material=Ie(b.material,w,T,!0),M.eyeMat=b.material):/^h_(bun|pony|locks|long)/.test(b.name)?(b.traverse(C=>{C.isMesh&&(C.material=M.lockMat)}),M.parts[b.name]=b):b.isSkinnedMesh&&/^h_/.test(b.name)?(b.material=M.hairMat||(M.hairMat=$(w,T)),M.parts[b.name]=b):b.isSkinnedMesh&&/^b_/.test(b.name)?(b.material=M.beardMat||(M.beardMat=$(w,T)),M.parts[b.name]=b):b.isSkinnedMesh&&/^g_/.test(b.name)&&(b.material=M.bandMat,M.parts[b.name]=b)});for(let b of M.cloth||[])b.material=ve(M.mat||b.material,w,b.geometry.userData.k||1,M.bodyU,b.userData.layer);M.hairMat=M.hairMat||$(w,1),M.beardMat=M.beardMat||$(w,1),M.pivots=Object.values(M.parts).map(b=>b.parent).filter(b=>b&&/_pv$/.test(b.name)),M.sw={x:0,z:0,vx:0,vz:0,px:0,pz:0};for(let b in If){let T=N[If[b]];if(!T)continue;let C=M.mixer.clipAction(T);C.play(),C.setEffectiveWeight(0),M.act[b]=C,M.w[b]=0}return M.w.idle=1,c.add(y),we.push(M),M}function xt(y){let M=Ve.get(y);return M||(M=we.filter(w=>w.lastN<d.n-1).sort((w,b)=>w.lastN-b.lastN)[0],!M&&we.length<je&&(M=ht()),M||(M=we.slice().sort((w,b)=>w.lastN-b.lastN)[0]),M.id!=null&&Ve.delete(M.id),M.id=y,Ve.set(y,M),M.dk=null,M.lastN=-9,M)}let at={gh:"af",ng:"af",ea:"af",za:"af2",ca:"af",fr:"mix",ar:"na",in:"sa",la:"lat",pt:"mix",es:"eu",it:"eu",tr:"na",cn:"ea",jp:"ea",kr:"ea",en:"eu",de:"eu",nl:"eu",ee:"eu"},Dt={af:[0,5],af2:[0,9],mix:[0,12],na:[5,10],sa:[3,9],lat:[4,11],eu:[8,13],ea:[8,12]},K={af:["shaved","buzz","buzz","fade","fade","afro","top","twist","dread","locks","locksL","corn","corn","hawk","curl","crew","under","bleach"],straight:["shaved","buzz","crew","fade","short","short","part","quiff","slick","curl","bun","pony","long","hawk","under"],ea:["buzz","crew","short","part","quiff","slick","fade","under","bleach","short"]},En={crew:"m_buzz",short:"m_buzz",afro:"h_afro",top:"h_top",corn:"h_corn",hawk:"h_hawk",under:"h_under",curl:"h_curl",quiff:"h_quiff",part:"m_part",slick:"m_part",twist:"h_twist",dread:"h_dread",locks:"h_dread",locksL:"h_dread",bun:"m_buzz",pony:"h_slick",long:"m_long",bleach:"h_top"},tt={afro:1,top:1,twist:1,dread:1,locks:1,locksL:1,bleach:1},pt={lean:{h:[1.78,1.9],b:[-.6,-.25]},balanced:{h:[1.74,1.88],b:[-.2,.25]},stocky:{h:[1.72,1.84],b:[.3,.7]}},Fe={face:[[-.16,.16],[-.006,.01],[-.22,.32],[-.0035,.004]],face2:[[-.005,.007],[-.05,.05],[-.004,.004],[-.007,.006]],face3:[[-.008,.008],[0,.004],[-.003,.003],[-.0055,.003]],h:[1.72,1.9],build:[-.6,.7]},en=y=>{for(let M of["face","face2","face3"])y[M]=y[M].map((w,b)=>dn(w,Fe[M][b][0],Fe[M][b][1]));return y.h=dn(y.h,Fe.h[0],Fe.h[1]),y.build=dn(y.build,Fe.build[0],Fe.build[1]),y};i.SAFE=Fe,i.lookOf=y=>bt(String(y));function bt(y){return en(L(y))}function L(y){let M=Nt(s.hash("look4:"+y)>>>0),w=Ye=>Ye[Math.floor(M()*Ye.length)],b=()=>M()*2-1,T=null;try{let Ye=s.lookOf&&s.lookOf(y);T=Ye&&Ye.cult}catch{}let C=at[T]||w(["af","eu","lat","mix","na","ea"]),_=Dt[C],U=_[0]+Math.floor(M()*(_[1]-_[0]+1)),V=U<6,k=U>9,ee=C==="eu"&&M()<.22?w(["#a07a44","#c9a55a","#6b2f1a","#7a5230"]):w(V||C==="ea"?["#0a0a0c","#0a0a0c","#121010","#17110d"]:P_.slice(0,8)),pe=w(V||C==="af2"&&U<6?K.af:C==="ea"?K.ea:K.straight),H=C_[w(V?["dark","dark","dark","brown"]:k&&C!=="ea"?["brown","hazel","green","blue","blue","grey"]:["dark","brown","brown","hazel",C==="ea"?"dark":"green"])],te=C==="na"||C==="sa"?.75:C==="ea"?.35:.6,ae=M()<te?w([1,1,2,2,3,4,5,6]):0,ye=C==="af"||C==="af2"?.1:0,$e=C==="ea"?1:0;return{si:U,dark:V,light:k,grp:C,hair:ee,st:pe,iris:H,beard:ae,red:k?.4+M()*.6:M()*.3,face:[b()*.16,b()*.008+.002,b()*.22+ye,b()*.003+.001-$e*.0015],face2:[b()*.005+$e*.002,b()*.05,b()*.004,b()*.004+ye*.02-$e*.003],face3:[b()*.008,M()*.0028+ye*.012,b()*.003,b()*.003-$e*.0025],...(()=>{let Ye=M(),ct=Ye<.3?"lean":Ye<.75?"balanced":"stocky",Le=pt[ct];return{arch:ct,h:Le.h[0]+M()*(Le.h[1]-Le.h[0]),build:Le.b[0]+M()*(Le.b[1]-Le.b[0])}})(),sock:w([0,0,0,1,1,1,2,3]),band:M()<.12,wrist:M()<.28?M()<.5?1:2:0,sleeves:M()<.1,untuck:M()<.72,tape:w(["#f8fafc","#f8fafc","#e2e8f0","#0b0f24"]),bandC:w(["#f8fafc","#0b0f24","#f8fafc",null]),boot:w(["#0b0f24","#0b0f24","#f8fafc","#22d3ee","#ff2d95","#facc15","#a3e635","#f97316","#a855f7"]),boot2:w(["#f8fafc","#0b0f24","#22d3ee","#ff2d95","#facc15"]),tip:w(["#e8d39a","#f2e6c4","#d9b26a"]),dance:M()<.3,left:M()<.25,sad:Math.floor(M()*3),cel:Math.floor(M()*4)}}let E=y=>tc.get(y)||bt(y),J=y=>I(512,64,M=>{if(M.fillStyle="#000",M.fillRect(0,0,512,64),!y)return;M.fillStyle="#fff",M.textAlign="center",M.textBaseline="middle",M.font="900 54px Arial Narrow, Arial, Helvetica, sans-serif",M.lineJoin="round";let w=M.measureText(y).width,b=Math.min(1.25,470/Math.max(1,w));M.save(),M.translate(258,37),M.scale(b,1),M.globalCompositeOperation="lighter",M.strokeStyle="#0000ff",M.lineWidth=9,M.strokeText(y,0,0),M.restore(),M.save(),M.translate(256,34),M.scale(b,1),M.strokeStyle="#00ff00",M.lineWidth=10,M.strokeText(y,0,0),M.fillStyle="#ffffff",M.fillText(y,0,0),M.restore()});function be(y,M,w,b,T){let C="";if(s.nameOf&&!/^(mgr|off4|ref|fan)/.test(String(b))){if(y.nmId!==b){y.nmId=b;try{y.nm=String(s.nameOf(b)||"").toUpperCase().slice(0,16)}catch{y.nm=""}}C=y.nm}let _=M.key+(w?"g":"o")+b+":"+T+":"+C;if(y.dk===_)return;y.dk=_;let U=y.bodyU,V=M.K,k=y.lk&&y.lkId===b?y.lk:(y.lkId=b,y.lk=E(b)),ee=(ye,$e)=>U[ye].value.set($e);ee("uSkin",Jo[Math.min(Jo.length-1,k.si)]),ee("uHair",k.hair),U.uRed.value=k.red,U.uGK.value=w?1:0,U.uShirt.value=w?M.gtex:M.tex,ee("uSho",w?"#111827":V.sho),ee("uSoc",w?M.g:V.soc),ee("uSlv",w?M.g:V.slv),ee("uCol",w?"#111827":V.col),ee("uBoot",k.boot),ee("uBoot2",k.boot2===k.boot?"#f8fafc":k.boot2),ee("uGlove","#f8fafc"),ee("uTape",k.tape===V.soc?"#f8fafc":k.tape),ee("uNumC","#ffffff");let pe=Math.max(0,Math.min(99,Math.floor(+T)||0)),H=T==null||T==="";U.uNum.value.set(H?-1:pe>=10?Math.floor(pe/10):-1,H?-1:pe%10),y.nameTex||(y.nameTex=W(J(""),!1),U.uName.value=y.nameTex),y.nameTxt!==C&&(y.nameTxt=C,y.nameTex.image=J(C),y.nameTex.needsUpdate=!0),U.uBody.value.set(k.build,1,!w&&k.untuck?1:0,!w&&k.sleeves?1:0),U.uGear.value.set(k.sock,k.trou||0,w?0:k.wrist,C?1:0),y.hgt=Math.min(1.92,k.h+(w?.04:0))/1.81,y.FU.uFace.value.fromArray(k.face),y.FU.uFace2.value.fromArray(k.face2),y.FU.uFace3.value.fromArray(k.face3),y.eyeMat&&y.eyeMat.userData.u.uIris.value.set(k.iris);let te=y.hstyle=k.st;U.uHairS.value=te==="shaved"?0:te==="fade"?2:te==="hawk"||te==="under"?3:te==="buzz"?4:1;for(let ye in y.parts)y.parts[ye].visible=!1;let ae=ye=>{y.parts[ye]&&(y.parts[ye].visible=!0)};ae(En[te]),te==="bun"&&ae("h_bun"),te==="pony"&&ae("h_pony"),te==="locks"&&ae("h_locksS"),te==="locksL"&&ae("h_locksL"),y.hairMat.userData.u.uStyle.value=te==="corn"?1:te==="afro"||te==="curl"?2:te==="twist"||te==="dread"||te==="locks"||te==="locksL"?3:te==="part"?4:te==="slick"||te==="long"||te==="pony"?5:0,y.hairMat.userData.u.uTip.value.set(...new Ue(k.tip).toArray(),te==="bleach"?1:0);for(let ye of y.mHair||[])ye.color.set(k.hair);y.mBeard&&y.mBeard.color.set(k.hair).multiplyScalar(.9),y.hairMat.color.set(k.hair),y.lockMat.color.set(k.hair),y.beardMat.color.set(k.hair).multiplyScalar(.95),y.browMat&&y.browMat.color.set(k.hair).lerp(new Ue(Jo[Math.min(Jo.length-1,k.si)]),.25),U.uBeard.value=k.beard,y.beardMat.userData.u.uStyle.value=2,(k.beard===5||k.beard===2||k.beard===3||k.beard===6)&&(ae("m_beard"),y.mBeard&&(y.mBeard.userData.u.uCut.value=k.beard===5?0:k.beard===2?1:2)),k.band&&!w&&(ae(tt[te]?"g_bandX":En[te]?"g_band":"g_band0"),y.bandMat.color.set(k.bandC||V.c1)),y.style=k}let he=new Ze,me=new Ze,Be=new Ze,Re=new Qi,Ne=new Qi,Qe=new Qi,yt=new Qi,fe=(y,M)=>{y.mod.has(M)||y.mod.set(M,M.quaternion.clone())};function Ee(y,M,w,b,T){let C=y.bones[M],_=y.bones[w];!C||!_||T<=.001||(fe(y,C),C.updateWorldMatrix(!0,!1),_.updateWorldMatrix(!1,!1),he.setFromMatrixPosition(C.matrixWorld),me.setFromMatrixPosition(_.matrixWorld).sub(he).normalize(),Be.copy(b).normalize().applyQuaternion(y.root.quaternion),Re.setFromUnitVectors(me,Be),T<1&&Re.copy(yt.identity().slerp(Re,T)),C.parent.getWorldQuaternion(Qe),Ne.copy(Qe).invert().multiply(Re).multiply(Qe),C.quaternion.premultiply(Ne))}function ke(y,M,w,b){let T=y.bones[M];!T||!b||(fe(y,T),T.updateWorldMatrix(!0,!1),Be.copy(w).applyQuaternion(y.root.quaternion),Re.setFromAxisAngle(Be,b),T.parent.getWorldQuaternion(Qe),Ne.copy(Qe).invert().multiply(Re).multiply(Qe),T.quaternion.premultiply(Ne))}let Oe=new Ze(1,0,0),We=new Ze(0,1,0),se=(y,M,w)=>new Ze(y,M,w),ut={wind:[se(0,-.8,-.6),se(0,-.15,-1)],hit:[se(0,-.4,.92),se(0,-.3,1)]};i.fig=function(y,M,w,b,T,C){if(!y||!y._b3||!D)return;C=C||{},w=String(w);let _=xt(w),U=_.lastN<d.n-1;_.lastN=d.n,S.add(_.root);let V=C.num;if(V==null){if(_.numId!==w){_.numId=w;try{_.num=s.numOf(w)}catch{_.num=null}}V=_.num}be(_,y,M,w,V),_.gls&&(_.gls.visible=!!(_.style&&_.style.mgr&&_.style.gl));let k=d.dt;if(U){_.px=b,_.pz=T,_.spd=0,_.kickT=-1,_.pk=0;for(let q in _.w)_.w[q]=0;_.w.idle=1}let ee=b-_.px,pe=T-_.pz,H=k>0?Math.sqrt(ee*ee+pe*pe)/k:0;_.px=b,_.pz=T,_.spd+=(Math.min(H,11)-_.spd)*Math.min(1,k*6);let te=Math.min(_.spd,(C.run==null?1:C.run)*6.5+.35),ae=C.jump||0,ye=C.dive||0,$e=C.kick||0,Ye=!ye&&!C.header&&(C.arms==="up"||ae>.001),ct=!Ye&&!ye&&!C.hands&&(C.lean||0)>.2;$e>0&&_.pk<=0&&(_.kickT=0),_.pk=$e,_.kickT>=0&&(_.kickT+=k,_.kickT>.6&&(_.kickT=-1));let Le={idle:0,walk:0,jog:0,sprint:0,dance:0,air:0,crouch:0,talk:0};if(ye)Le.air=1;else if(Ye&&_.style.dance&&te<1.5)Le.dance=1;else if(Ye&&ae>.06)Le.air=1;else{let q=1-rt(.25,1,te);Le.walk=rt(.25,1,te)*(1-rt(1.8,3,te)),Le.jog=rt(1.8,3,te)*(1-rt(4.8,6.2,te)),Le.sprint=rt(4.8,6.2,te),M&&!Ye&&!ct&&Ae&&Pe>=d.n-1?(Le.crouch=q*.6,Le.idle=q*.4):Le.idle=q}let Rt=0,jt=Math.min(1,k*7);for(let q in _.act)_.w[q]+=((Le[q]||0)-_.w[q])*jt,_.w[q]<.002&&(_.w[q]=0),Rt+=_.w[q];Rt<.01&&(_.w.idle=1,Rt=1);for(let q in _.act)_.act[q].setEffectiveWeight(_.w[q]/Rt);{let q=_.w.walk+_.w.jog+_.w.sprint,Se=q>.01?(_.w.walk*2+_.w.jog*3.4+_.w.sprint*4.4)/q:2,qe=dn(Math.max(te,.9)/Se,.55,1.75);_.ph=(_.ph+k*qe)%1;let gt={walk:0,jog:0,sprint:.05};for(let Tt of["walk","jog","sprint"]){let wt=_.act[Tt];wt&&(wt.timeScale=0,wt.time=(_.ph+gt[Tt])%1*wt.getClip().duration)}}for(let[q,Se]of _.mod)q.quaternion.copy(Se);_.mod.clear(),_.mixer.update(k);let Un=C.yaw==null?_.yaw||0:C.yaw;(U||_.yaw==null)&&(_.yaw=Un);let sn=Un-_.yaw;for(;sn>Math.PI;)sn-=2*Math.PI;for(;sn<-Math.PI;)sn+=2*Math.PI;let ii=1-Math.exp(-k*(ye||_.kickT>=0?18:11)),es=sn*ii;_.yaw+=es;let ce=_.yaw,_e=k>0?es/k:0;if(_.lean+=(dn(-_e*te*.035,-.22,.22)-_.lean)*Math.min(1,k*6),_.root.position.set(b,(Ye&&_.w.dance<.5||C.header?ae*.95:0)+Math.abs(ye)*.45+(C.y||0),T),_.root.rotation.set(rt(4.5,7,te)*.05,ce,ye*1.25+(ye?0:_.lean),"YXZ"),_.root.scale.setScalar(rh*(_.hgt||1)),_.root.updateMatrixWorld(!0),_.kickT>=0&&!ye){let q=_.kickT,Se=_.style.left,qe=Se?"_l":"_r",gt=Se?"_r":"_l",Tt=q<.3?1:1-(q-.3)/.3,wt=rt(.14,.28,q),rn=ut.wind[0].clone().lerp(ut.hit[0],wt),Fn=ut.wind[1].clone().lerp(ut.hit[1],wt);ke(_,"spine_01",Oe,-.18*Tt),Ee(_,"thigh"+qe,"calf"+qe,rn,Tt),Ee(_,"calf"+qe,"foot"+qe,Fn,Tt),Ee(_,"thigh"+gt,"calf"+gt,se(0,-1,.12),Tt*.6),Ee(_,"upperarm"+gt,"lowerarm"+gt,se(Se?-1:1,-.15,.35),Tt*.8),Ee(_,"upperarm"+qe,"lowerarm"+qe,se(Se?1:-1,-.4,-.3),Tt*.6)}if(ye){let q=Math.min(1,Math.abs(ye)*1.6);Ee(_,"upperarm_l","lowerarm_l",se(.25,1,.2),q),Ee(_,"lowerarm_l","hand_l",se(.15,1,.25),q),Ee(_,"upperarm_r","lowerarm_r",se(-.25,1,.2),q),Ee(_,"lowerarm_r","hand_r",se(-.15,1,.25),q),Ee(_,"thigh_l","calf_l",se(.15,-1,0),q),Ee(_,"thigh_r","calf_r",se(-.15,-1,0),q),Ee(_,"calf_l","foot_l",se(.15,-1,0),q),Ee(_,"calf_r","foot_r",se(-.15,-1,0),q)}else if(Ye&&!(_.style.dance&&te<1.5)){let q=Math.sin(d.now/210+s.hash(w)%7),Se=1;Ee(_,"upperarm_l","lowerarm_l",se(.5,1,.1+q*.1),Se),Ee(_,"lowerarm_l","hand_l",se(.3,1,.1),Se),Ee(_,"upperarm_r","lowerarm_r",se(-.5,1,.1-q*.1),Se),Ee(_,"lowerarm_r","hand_r",se(-.3,1,.1),Se),ke(_,"Head",Oe,-.25)}else if(ct||C.hands){let q=C.hands?1:_.style.sad||0;if(q===1){let Se=C.hands?Math.min(1,C.hands*2):1;Ee(_,"upperarm_l","lowerarm_l",se(.75,.75,.15),Se),Ee(_,"lowerarm_l","hand_l",se(-.9,.35,-.1),Se),Ee(_,"upperarm_r","lowerarm_r",se(-.75,.75,.15),Se),Ee(_,"lowerarm_r","hand_r",se(.9,.35,-.1),Se),ke(_,"Head",Oe,C.hands?-.15:.3),ke(_,"spine_03",Oe,C.hands?-.08:.1)}else q===2?(Ee(_,"upperarm_l","lowerarm_l",se(.6,-.65,-.45),1),Ee(_,"lowerarm_l","hand_l",se(-.45,-.6,.25),1),Ee(_,"upperarm_r","lowerarm_r",se(-.6,-.65,-.45),1),Ee(_,"lowerarm_r","hand_r",se(.45,-.6,.25),1),ke(_,"Head",Oe,.35),ke(_,"spine_02",Oe,.12)):(ke(_,"spine_02",Oe,.22),ke(_,"spine_03",Oe,.12),ke(_,"Head",Oe,.45))}if(C.yell&&!ye&&!Ye){let q=Math.sin(d.now/140+s.hash(w)%5),Se=_.style.left?1:-1,qe=Se>0?"_l":"_r",gt=Se>0?"_r":"_l";Ee(_,"upperarm"+qe,"lowerarm"+qe,se(Se*.35,.35+q*.2,1),1),Ee(_,"lowerarm"+qe,"hand"+qe,se(Se*.2,.25+q*.3,1),1),Ee(_,"upperarm"+gt,"lowerarm"+gt,se(-Se*.8,-.35,.35),.8),ke(_,"Head",Oe,-.12)}if(C.throwIn!=null&&C.throwIn!==!1&&C.throwIn!==void 0){let q=C.throwIn>.05?1-C.throwIn:0;for(let[Se,qe]of[["_l",1],["_r",-1]])Ee(_,"upperarm"+Se,"lowerarm"+Se,se(qe*.15,1,-.35+q*1.3),1),Ee(_,"lowerarm"+Se,"hand"+Se,se(qe*.05,.6-q*.4,-1+q*2),1);ke(_,"spine_01",Oe,-.25+q*.45)}if(C.wall){for(let[q,Se]of[["_l",1],["_r",-1]])Ee(_,"upperarm"+q,"lowerarm"+q,se(Se*.2,-1,.35),1),Ee(_,"lowerarm"+q,"hand"+q,se(-Se*.7,-.4,.6),1);ke(_,"Head",Oe,-.1)}if(C.slide){_.root.position.y-=.58,_.root.updateMatrixWorld(!0),ke(_,"spine_01",Oe,-.85);let q=_.style.left?"_l":"_r",Se=_.style.left?"_r":"_l";Ee(_,"thigh"+q,"calf"+q,se(0,-.12,1),1),Ee(_,"calf"+q,"foot"+q,se(0,-.1,1),1),Ee(_,"thigh"+Se,"calf"+Se,se(0,-.35,.9),1),Ee(_,"calf"+Se,"foot"+Se,se(0,-1,-.2),1),Ee(_,"upperarm_l","lowerarm_l",se(.7,-.6,-.4),1),Ee(_,"upperarm_r","lowerarm_r",se(-.7,-.6,-.4),1)}if(C.header&&(ke(_,"spine_02",Oe,.18),ke(_,"Head",Oe,.35),Ee(_,"upperarm_l","lowerarm_l",se(.9,.2,.2),1),Ee(_,"upperarm_r","lowerarm_r",se(-.9,.2,.2),1)),C.catch){ke(_,"spine_01",Oe,.25);for(let[q,Se]of[["_l",1],["_r",-1]])Ee(_,"upperarm"+q,"lowerarm"+q,se(Se*.25,-.15,1),1),Ee(_,"lowerarm"+q,"hand"+q,se(-Se*.25,.25,1),1)}for(let q of["_l","_r"]){let Se=_.bones["thigh"+q],qe=_.bones["calf"+q],gt=_.bones["foot"+q];if(!Se||!qe||!gt)continue;Se.updateWorldMatrix(!0,!0),he.setFromMatrixPosition(Se.matrixWorld),me.setFromMatrixPosition(qe.matrixWorld),Be.setFromMatrixPosition(gt.matrixWorld);let Tt=me.clone().sub(he).normalize(),wt=Be.clone().sub(me).normalize(),rn=Math.acos(dn(Tt.dot(wt),-1,1)),Fn=new Ze().crossVectors(Tt,wt).dot(new Ze(1,0,0).applyQuaternion(_.root.quaternion));Fn<0&&rn>.1?ke(_,"calf"+q,Oe,rn-.1):rn>2.6&&ke(_,"calf"+q,Oe,-(rn-2.6)*Math.sign(Fn||1))}{let q=0,Se=0;if(Ae&&Pe>=d.n-1&&!ye&&!Ye&&_.kickT<0){let gt=Ae.x-b,Tt=Ae.z-T,wt=Math.sqrt(gt*gt+Tt*Tt);if(wt>.3&&wt<45){let rn=Math.atan2(gt,Tt)-ce;for(;rn>Math.PI;)rn-=2*Math.PI;for(;rn<-Math.PI;)rn+=2*Math.PI;q=dn(rn,-1.1,1.1),Se=dn(Math.atan2(1.7-Ae.y,wt)*.6,-.2,.55)}}let qe=Math.min(1,k*5);_.look+=(q-_.look)*qe,_.lookP+=(Se-_.lookP)*qe,ke(_,"neck_01",We,_.look*.35),ke(_,"Head",We,_.look*.55),ke(_,"Head",Oe,_.lookP*(ct?0:1))}{let q=_.ex,Se=C.fierce||C.wall||C.slide||C.header,qe=C.yell?[.8,0,1,0]:C.hands?[0,0,.55,.9]:ct?[.2,0,0,1]:Ye?_.w.dance>.5?[0,1,.15,0]:[.1,.45,.95,0]:Se?[1,0,.45,0]:ye||_.kickT>=0?[1,0,.35,0]:te>4.5?[.8,0,.1,0]:[.3,.06,0,0],gt=Math.min(1,k*4);q.set(q.x+(qe[0]-q.x)*gt,q.y+(qe[1]-q.y)*gt,q.z+(qe[2]-q.z)*gt,q.w+(qe[3]-q.w)*gt),_.FU.uExpr.value.copy(q)}if(e==="high"&&_.pivots.length&&k>0){let q=_.sw,Se=(b-q.px)/k,qe=(T-q.pz)/k;q.px=b,q.pz=T;let gt=Math.cos(_.yaw),Tt=Math.sin(_.yaw),wt=dn(Se*Tt+qe*gt,-9,9),rn=dn(Se*gt-qe*Tt,-9,9),Fn=dn(wt*.07+(ae?-.25:0),-.6,.6),jn=dn(-rn*.06+_.lean*.8,-.5,.5);q.vx+=((Fn-q.x)*40-q.vx*7)*k,q.vz+=((jn-q.z)*40-q.vz*7)*k,q.x+=q.vx*k,q.z+=q.vz*k,U&&(q.x=q.z=q.vx=q.vz=0);for(let $t of _.pivots)$t.rotation.x=q.x,$t.rotation.z=q.z}_.dist=l.position.distanceTo(_.root.position)};let At=null,kt=null,ft=null,xe=null,O=()=>At||(At=(()=>{let y=W(I(256,128,w=>{w.fillStyle="#f8fafc",w.fillRect(0,0,256,128),w.fillStyle="#0b0f24",[[32,20],[96,20],[160,20],[224,20],[0,64],[64,64],[128,64],[192,64],[256,64],[32,108],[96,108],[160,108],[224,108]].forEach(([b,T])=>{w.beginPath();for(let C=0;C<5;C++){let _=-Math.PI/2+C*1.2566;w.lineTo(b+Math.cos(_)*14,T+Math.sin(_)*12)}w.fill()}),w.strokeStyle="rgba(15,23,42,.35)",w.lineWidth=1.2;for(let b=0;b<256;b+=32)w.beginPath(),w.moveTo(b,0),w.lineTo(b+16,128),w.stroke()})),M=new ze(new Yi(ah,24,16),new Qt({map:y,roughness:.38,envMapIntensity:.8}));return M.castShadow=!0,c.add(M),M})()),Ae=null,Pe=-9;i.ball=function(y,M,w,b){if(!D)return;let T=O();nn(),S.add(T),Pe=d.n,Ae=Ae||new Ze,Ae.set(y,ah+(w||0)*1.6,M),T.position.set(y,ah+(w||0)*1.6,M),T.rotation.set((b||0)*1.3,b||0,0)},i.trophy=function(y,M,w,b,T){if(!kt){let C=new Wn,_=new Qt({color:16106818,metalness:1,roughness:.2,envMapIntensity:1.6}),U=[[0,0],[.32,0],[.32,.08],[.12,.14],[.08,.42],[.14,.5],[.34,.62],[.42,.95],[.4,1.02],[0,1.02]].map(([ee,pe])=>new He(ee,pe)),V=new ze(new Io(U,40),_);V.material.side=Rn,C.add(V),[-1,1].forEach(ee=>{let pe=new ze(new ba(.17,.035,8,20,Math.PI*1.15),_);pe.position.set(ee*.42,.78,0),pe.rotation.z=ee>0?-Math.PI*.55:Math.PI*1.55,C.add(pe)});let k=new ze(new yi(.36,.4,.22,24),new Qt({color:724772,roughness:.4}));k.position.y=-.11,C.add(k),C.traverse(ee=>{ee.isMesh&&(ee.castShadow=!0)}),kt=C,c.add(C)}S.add(kt),kt.position.set(y,M*.86,w),kt.rotation.set(0,b||0,0),kt.scale.setScalar(T||1)},i.floor=function(){ft||(ft=new ze(new yi(1.15,1.2,.1,48),new Qt({color:1976635,roughness:.55,metalness:.2})),ft.position.y=-.05,ft.receiveShadow=!0,c.add(ft)),S.add(ft)};let nt=600;i.particles=function(y,M){xe||(xe=new Li(new ln(1,1,1),new fn({toneMapped:!1}),nt),xe.frustumCulled=!1,xe.setColorAt(0,new Ue),c.add(xe));let w=[],b=new dt,T=new Qi,C=new Tr,_=new Ze,U=new Ze,V=new Ue;for(let k of y)if(k.vy-=9.8*M*(k.g==null?.25:k.g),k.x+=k.vx*M,k.y+=k.vy*M,k.z+=k.vz*M,k.life-=M,k.rot=(k.rot||0)+M*6,k.life>0&&k.y>0){w.push(k);let ee=w.length-1;if(ee>=nt)continue;let pe=k.s||.25;b.compose(U.set(k.x,k.y,k.z),T.setFromEuler(C.set(k.rot*.7,k.rot,0)),_.set(pe,.02+pe*.1,pe*.6)),xe.setMatrixAt(ee,b);let H=k.c;V.setRGB(H[0],H[1],H[2],Ht),xe.setColorAt(ee,V)}return xe.count=Math.min(nt,w.length),xe.instanceMatrix.needsUpdate=!0,xe.instanceColor&&(xe.instanceColor.needsUpdate=!0),S.add(xe),w};function et(){let y=[],M=[],w=[],b=new Ue,T=(C,_,U,V,k,ee)=>{[C,_,U,C,U,V].forEach(pe=>{y.push(pe[0],pe[1],pe[2]),M.push(k[0],k[1],k[2]),w.push(ee.r,ee.g,ee.b)})};return{box(C,_,U,V,k,ee,pe){b.set(V);let H=C/2,te=_/2,ae=U/2,ye=($e,Ye,ct)=>[k+$e,ee+Ye,pe+ct];T(ye(-H,-te,ae),ye(H,-te,ae),ye(H,te,ae),ye(-H,te,ae),[0,0,1],b),T(ye(H,-te,-ae),ye(-H,-te,-ae),ye(-H,te,-ae),ye(H,te,-ae),[0,0,-1],b),T(ye(H,-te,ae),ye(H,-te,-ae),ye(H,te,-ae),ye(H,te,ae),[1,0,0],b),T(ye(-H,-te,-ae),ye(-H,-te,ae),ye(-H,te,ae),ye(-H,te,-ae),[-1,0,0],b),T(ye(-H,te,ae),ye(H,te,ae),ye(H,te,-ae),ye(-H,te,-ae),[0,1,0],b),T(ye(-H,-te,-ae),ye(H,-te,-ae),ye(H,-te,ae),ye(-H,-te,ae),[0,-1,0],b)},geo(){let C=new Zt;return C.setAttribute("position",new Lt(y,3)),C.setAttribute("normal",new Lt(M,3)),C.setAttribute("color",new Lt(w,3)),C}}}let Nt=y=>{let M=y>>>0||1;return()=>(M^=M<<13,M>>>=0,M^=M>>>17,M^=M<<5,M>>>=0,M/4294967296)},Bt=null,Gt=null,qt=null,Vt=()=>Bt||(Bt=(()=>{let M=W(I(1920,1344,w=>{for(let _=-1;_<16;_++)w.fillStyle=_%2?"#2f8a3d":"#287d36",w.fillRect((7.5+_*7.5)*16,0,120,1344);let b=Nt(7);for(let _=0;_<26e3;_++){let U=b();w.fillStyle=U<.5?"rgba(0,0,0,.06)":"rgba(255,255,255,.05)",w.fillRect(b()*1920,b()*1344,2+b()*3,1+b()*2)}let T=_=>(_+60)*16,C=_=>(_+42)*16;w.strokeStyle="rgba(255,255,255,.92)",w.lineWidth=2.6,w.strokeRect(T(-52.5),C(-34),1680,1088),w.beginPath(),w.moveTo(T(0),C(-34)),w.lineTo(T(0),C(34)),w.stroke(),w.beginPath(),w.arc(T(0),C(0),146.4,0,7),w.stroke(),[-1,1].forEach(_=>{let U=_*52.5;w.strokeRect(Math.min(T(U),T(U-_*16.5)),C(-20.16),264,645.12),w.strokeRect(Math.min(T(U),T(U-_*5.5)),C(-9.16),88,293.12),w.beginPath(),w.arc(T(U-_*11),C(0),146.4,_>0?Math.PI-.93:-.93,_>0?Math.PI+.93:.93),w.stroke(),w.fillStyle="#fff",w.beginPath(),w.arc(T(U-_*11),C(0),3,0,7),w.fill(),[-34,34].forEach(V=>{w.beginPath(),w.arc(T(U),C(V),16,0,7),w.stroke()})}),w.fillStyle="#fff",w.beginPath(),w.arc(T(0),C(0),3.2,0,7),w.fill(),w.setLineDash([10,8]),w.lineWidth=2,w.strokeStyle="rgba(255,255,255,.7)",[-1,1].forEach(_=>{w.strokeRect(Math.min(T(_*4.5),T(_*14.5)),C(-37.6),160,41.6)}),w.setLineDash([])}));return M.anisotropy=t?2:8,M})()),_n=(y,M)=>W(I(1024,64,w=>{let b=w.createLinearGradient(0,0,1024,0);b.addColorStop(0,"#22d3ee"),b.addColorStop(.5,"#a855f7"),b.addColorStop(1,"#ff2d95"),w.fillStyle="#070b18",w.fillRect(0,0,1024,64),w.fillStyle=b,w.fillRect(0,0,1024,5),w.fillRect(0,59,1024,5),w.font="900 36px Arial, Helvetica, sans-serif",w.textBaseline="middle",["SINLESS GG","11 WONDERS","SINLESS GG","11 WONDERS"].forEach((T,C)=>{w.fillStyle=[y,"#ffffff",M,"#22d3ee"][C],w.fillText(T,20+C*256,34)})}),!0,!0),ni=()=>W(I(64,64,y=>{y.clearRect(0,0,64,64),y.strokeStyle="rgba(255,255,255,.9)",y.lineWidth=3,y.strokeRect(0,0,64,64)}),!0,!0),wa=()=>W(I(64,64,y=>{let M=y.createRadialGradient(32,32,0,32,32,32);M.addColorStop(0,"rgba(255,250,230,1)"),M.addColorStop(.25,"rgba(255,240,200,.55)"),M.addColorStop(1,"rgba(255,240,200,0)"),y.fillStyle=M,y.fillRect(0,0,64,64)})),Zo=()=>Gt||(Gt=(()=>{let y=(w,b,T)=>({value:new Ue(w,b,T)}),M=new ze(new Yi(460,32,16),new qn({side:Cn,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new Ze(.012,.016,.05)},uMid:{value:new Ze(.06,.03,.16)},uHor:{value:new Ze(.24,.1,.32)},uStars:{value:1},uCloud:{value:0},uSun:{value:new Ze(0,1,0)},uSunC:y(0,0,0),uT:{value:0},uFlash:{value:0}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform vec3 uTop, uMid, uHor, uSun, uSunC; uniform float uStars, uCloud, uT, uFlash; varying vec3 vD; float h(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(mix(h(i), h(i + vec3(1,0,0)), f.x), mix(h(i + vec3(0,1,0)), h(i + vec3(1,1,0)), f.x), f.y), mix(mix(h(i + vec3(0,0,1)), h(i + vec3(1,0,1)), f.x), mix(h(i + vec3(0,1,1)), h(i + vec3(1,1,1)), f.x), f.y), f.z); }void main(){ float y = vD.y; vec3 c = mix(uHor, uMid, smoothstep(0.0, 0.18, y)); c = mix(c, uTop, smoothstep(0.18, 0.7, y)); vec3 q = floor(vD * 260.0); float s = step(0.9975, h(q)) * smoothstep(0.08, 0.4, y); c += vec3(s * 0.9 * uStars);float sd = max(dot(vD, normalize(uSun)), 0.0); c += uSunC * (pow(sd, 380.0) * 3.0 + pow(sd, 10.0) * 0.3) * (1.0 - uCloud * 0.85);if (uCloud > 0.01) { vec3 p = vD * 3.2 + vec3(uT * 0.012, 0.0, uT * 0.007); float cl = n3(p) * 0.6 + n3(p * 2.1) * 0.3 + n3(p * 4.3) * 0.1; float cov = smoothstep(1.0 - uCloud, 1.08 - uCloud * 0.5, cl) * smoothstep(-0.02, 0.16, y);vec3 cc = mix(uHor, vec3(dot(uMid, vec3(0.333))) * 1.25 + uSunC * 0.06, 0.6); c = mix(c, cc, cov * 0.9); } c += vec3(uFlash); gl_FragColor = vec4(c, 1.0); }"}));return M.frustumCulled=!1,M.renderOrder=-1,M})()),Si=new Map;i.world=function(y,M,w){y=dn(Math.floor(y)||1,1,5);let b=y+M+w,T=Si.get(b);if(T)return T;let C=new Wn,_=et(),U=Nt(s.hash("std:"+b)>>>0),V=[],k=[];C.add(Zo()),qt||(qt=new ze(new Pi(320,260),new Ii({color:793619})),qt.rotation.x=-Math.PI/2,qt.position.y=-.04,qt.receiveShadow=!0),C.add(qt);let ee=new Qt({map:Vt(),roughness:.94,metalness:0,envMapIntensity:.18}),pe=new ze(new Pi(120,84),ee);pe.rotation.x=-Math.PI/2,pe.receiveShadow=!0,C.add(pe);let H=[1,1,2,2,3][y-1],te=y>=2,ae=y>=4,ye=7,$e=["#1e293b","#2a3650"],Ye=(Ce,Ge,Je,Ft,zt)=>{for(let cn=0;cn<H;cn++){for(let qs=0;qs<ye;qs++){let jr=Je+cn*(ye*.95+2.5)+qs*.95,Ca=.6+cn*(ye*.55+2.2)+qs*.55,Pa=Ce+jr*.4;Ge==="x"?_.box(Pa,.55,.95,$e[qs%2],0,Ca-.27,zt*jr):_.box(.95,.55,Pa,$e[qs%2],Ft*jr,Ca-.27,0);for(let La=-Pa/2+.5;La<Pa/2-.4;La+=.72)V.push(Ge==="x"?[La,Ca+.05,zt*jr]:[Ft*jr,Ca+.05,La])}let ri=Je+cn*(ye*.95+2.5),ts=cn*(ye*.55+2.2),Ta=Ce+ri*.4,Xs=ts+.6;Ge==="x"?_.box(Ta,Xs,.4,"#141b2d",0,Xs/2,zt*(ri-.65)):_.box(.4,Xs,Ta,"#141b2d",Ft*(ri-.65),Xs/2,0);let As=ri+ye*.95+.4,mi=ts+.6+ye*.55+(cn<H-1?2.2:1.6),Ra=Ce+As*.4;cn===H-1?Ge==="x"?_.box(Ra,mi,.8,"#10172a",0,mi/2,zt*As):_.box(.8,mi,Ra,"#10172a",Ft*As,mi/2,0):Ge==="x"?_.box(Ra,.5,2.5,"#0f172a",0,mi-1.9,zt*(As+.6)):_.box(2.5,.5,Ra,"#0f172a",Ft*(As+.6),mi-1.9,0)}};Ye(112,"x",42,0,1),Ye(112,"x",42,0,-1),te&&(Ye(80,"z",61,1,0),Ye(80,"z",61,-1,0));let ct=H*(ye*.55+2.2)+1.5,Le=42+H*(ye*.95+2.5);ae&&[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([Ce,Ge])=>{for(let Je=0;Je<H*3;Je++)_.box(9,ct*(Je+1)/(H*3),9,"#18213a",Ce*(60+Je*2.4),ct*(Je+1)/(H*6),Ge*(42+Je*2.4))});let Rt=[],jt=(Ce,Ge,Je)=>{let Ft=et();Ce(Ft);let zt=new ze(Ft.geo(),new Ii({vertexColors:!0}));zt.userData.side=Ge,zt.userData.axis=Je,C.add(zt),Rt.push(zt)};y>=3&&[-1,1].forEach(Ce=>jt(Ge=>{let Je=Le-40+2,Ft=ct+3.2;Ge.box(140,.5,Je,"#0b1122",0,Ft,Ce*(40+Je/2)),Ge.box(140,.25,.5,Ce>0?"#22d3ee":"#ff2d95",0,Ft-.35,Ce*41);for(let zt=-3;zt<=3;zt++)Ge.box(.6,Ft,.6,"#334155",zt*20,Ft/2,Ce*(Le+1.2))},Ce,"z")),y>=5&&[-1,1].forEach(Ce=>jt(Ge=>{let Je=Le-58+2,Ft=ct+3.2;Ge.box(Je,.5,100,"#0b1122",Ce*(58+Je/2),Ft,0)},Ce,"x"));let Un=y>=3?34:22;[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([Ce,Ge])=>{y===1&&Ge<0||(_.box(.8,Un,.8,"#475569",Ce*64,Un/2,Ge*(Le+2)),k.push([Ce*64,Un+1.5,Ge*(Le+2)]))});let sn=new ze(_.geo(),new Ii({vertexColors:!0}));sn.receiveShadow=!1,C.add(sn),sn.userData.st=1;let ii=new fn({color:16776168,toneMapped:!1}),es=new da({map:wa(),blending:lo,depthWrite:!1,fog:!1,transparent:!0}),ce=[];for(let Ce of k){let Ge=new ze(new ln(5,3,.6),ii);Ge.position.set(Ce[0],Ce[1],Ce[2]),Ge.lookAt(0,0,0),C.add(Ge);let Je=new Ro(es.clone());Je.position.set(Ce[0],Ce[1],Ce[2]),Je.scale.set(26,26,1),C.add(Je),ce.push(Je)}if(y>=4){let Ce=new ze(new ln(18,8,.5),new fn({map:_n(M,w),toneMapped:!1}));Ce.position.set(0,ct+6,-Le-1),C.add(Ce)}let _e=[.35,.5,.65,.8,.95][y-1],q=Math.min(V.length*_e,n.crowd),Se=q/Math.max(1,V.length),qe=Ce=>te?Ce[0]>58:Ce[2]<-40&&Ce[0]>24,gt=V.filter(Ce=>Ce[2]<-40&&!qe(Ce)).length,Tt=Math.max(Se,Math.min(.85,q*.55/Math.max(1,gt))),wt=V.filter(Ce=>U()<(Ce[2]<-40&&!qe(Ce)?Tt:Se)),rn=Ui(),Fn=rn.userData.u,jn=Math.max(1,wt.length),$t=new Li(kr(),rn,jn),Ei=new dt,Ai=new Ue,Jn=["#facc15","#22d3ee","#a855f7","#ff2d95","#0f172a","#f97316","#e2e8f0"],Es=new Float32Array(jn),On=new Float32Array(jn),si=new Float32Array(jn*2),Yt=new Float32Array(jn*3),Wt=1e9,hn=-1e9,lt=1e9,ot=-1e9;wt.forEach(Ce=>{Ce[2]<-40&&!qe(Ce)&&(Wt=Math.min(Wt,Ce[0]),hn=Math.max(hn,Ce[0]),lt=Math.min(lt,Ce[1]),ot=Math.max(ot,Ce[1]))}),wt.forEach((Ce,Ge)=>{Ei.makeRotationY(Ce[2]>40?Math.PI:Ce[2]<-40?0:Ce[0]>0?-Math.PI/2:Math.PI/2),Ei.setPosition(Ce[0],Ce[1],Ce[2]),$t.setMatrixAt(Ge,Ei);let Je=qe(Ce),Ft=U();Ai.set(Je?Ft<.68?w:Ft<.82?"#ffffff":Jn[Math.floor(U()*7)]:Ft<.5?M:Ft<.64?"#ffffff":Ft<.76?"#1e293b":Jn[Math.floor(U()*7)]),$t.setColorAt(Ge,Ai),Es[Ge]=U(),On[Ge]=Je?1:0;let zt=new Ue(Je?w:U()<.6?M:"#ffffff");Yt.set([zt.r,zt.g,zt.b],Ge*3),Ce[2]<-40&&!Je&&hn>Wt?si.set([(Ce[0]-Wt)/(hn-Wt),(Ce[1]-lt)/Math.max(.1,ot-lt)],Ge*2):si.set([-1,-1],Ge*2)});let st=$t.geometry=$t.geometry.clone();st.setAttribute("aSeed",new hi(Es,1)),st.setAttribute("aSide",new hi(On,1)),st.setAttribute("aUV",new hi(si,2)),st.setAttribute("aCol2",new hi(Yt,3)),$t.count=wt.length,$t.frustumCulled=!1,C.add($t);let un=zr($t,Fn,M,w);un&&(C.add(un),C.userData.fanRT=un.userData.rt);let Zn=kf(C),mn=_n(M,w);mn.repeat.set(6,1);let Qn=new fn({map:mn,toneMapped:!1});[[112,.9,.2,0,38.5],[112,.9,.2,0,-40.4]].forEach(([Ce,Ge,Je,Ft,zt])=>{let cn=new ze(new ln(Ce,Ge,Je),Qn);cn.position.set(Ft,Ge/2,zt),C.add(cn)});let pi=_n(w,M);pi.repeat.set(4,1);let Vf=new fn({map:pi,toneMapped:!1});[-57,57].forEach(Ce=>[-1,1].forEach(Ge=>{let Je=new ze(new ln(.2,.9,30),Vf);Je.position.set(Ce,.45,Ge*19),C.add(Je)}));let fh=[],dh=[],ph=new Qt({color:16317180,roughness:.35,envMapIntensity:.6}),Wf=ni(),Xf=new fn({map:Wf,transparent:!0,opacity:.55,side:Rn,depthWrite:!1,alphaTest:.05}),nc=(Ce,Ge,Je)=>{let Ft=new Pi(Ce,Ge),zt=Ft.attributes.uv;for(let cn=0;cn<zt.count;cn++)zt.setXY(cn,zt.getX(cn)*Ce/.14,zt.getY(cn)*Ge/.14);return new ze(Ft,Xf)};if([-1,1].forEach(Ce=>{let Ge=Ce*52.5,Je=(cn,ri,ts,Ta,Xs,As)=>{let mi=new ze(new yi(.06,.06,cn,10),ph);mi.position.set(ri,ts,Ta),mi.rotation.set(Xs||0,0,As||0),mi.castShadow=!0,C.add(mi)};Je(2.44,Ge,1.22,3.66),Je(2.44,Ge,1.22,-3.66),Je(7.44,Ge,2.44,0,Math.PI/2),Je(2.44,Ge+Ce*2.2,1.22,3.66),Je(2.44,Ge+Ce*2.2,1.22,-3.66),Je(7.44,Ge+Ce*2.2,2.44,0,Math.PI/2),Je(2.2,Ge+Ce*1.1,2.44,3.66,0,Math.PI/2),Je(2.2,Ge+Ce*1.1,2.44,-3.66,0,Math.PI/2);let Ft=nc(7.32,2.44);Ft.rotation.y=Math.PI/2,Ft.position.set(Ge+Ce*2.2,1.22,0),C.add(Ft),fh.push([Ft,Ge+Ce*2.2,Ce]);let zt=nc(2.2,7.32);zt.rotation.x=-Math.PI/2,zt.position.set(Ge+Ce*1.1,2.44,0),C.add(zt),[-1,1].forEach(cn=>{let ri=nc(2.2,2.44);ri.position.set(Ge+Ce*1.1,1.22,cn*3.66),C.add(ri)}),[-34,34].forEach(cn=>{let ri=new ze(new yi(.03,.03,1.5,6),ph);ri.position.set(Ge,.75,cn),C.add(ri);let ts=new ze(new Pi(.4,.28).translate(.2,0,0),new fn({color:16723349,side:Rn}));ts.position.set(Ge,1.36,cn),C.add(ts),dh.push(ts)})}),T={_b3:1,grp:C,crowd:$t,cu:Fn,lv:y,top:ct,far:Le,key:b,roofs:Rt,lights:k,glows:ce,pitchM:ee,nets:fh,flags:dh,dug:Zn,stM:sn},C.visible=!1,c.add(C),Si.set(b,T),Si.size>2){let[Ce,Ge]=Si.entries().next().value;Si.delete(Ce),c.remove(Ge.grp),Ge.grp.userData.fanRT&&Ge.grp.userData.fanRT.dispose(),Ge.grp.traverse(Je=>{Je===Gt||Je===qt||Je===pe||Je===Ge.crowd||(Je.geometry&&Je!==Gt&&Je!==qt&&Je.geometry.dispose(),Je.material&&Je.material.map&&Je.material.map!==Bt&&Je.material.map.dispose())})}return T},i.drawWorld=function(y,M){if(!y||!y._b3)return;S.add(y.grp);for(let C of y.roofs){let _=C.userData.axis==="z"?l.position.z:l.position.x;C.visible=!(_*C.userData.side>30&&l.position.y>6)}Gt&&Gt.parent!==y.grp&&y.grp.add(Gt),qt&&qt.parent!==y.grp&&y.grp.add(qt),i._world=y,Hr(y,M);let w=Pn,b=d.now/1e3,T=de.wind;if(y.flags.forEach((C,_)=>{C.rotation.y=(w&&w.wx&&w.wx.dx<0?Math.PI:0)+Math.sin(b*(4+T*6)+_)*(.15+T*.5),C.scale.y=1-T*.25*Math.abs(Math.sin(b*9+_))}),y.nets.forEach(([C,_,U],V)=>{C.position.x=_+U*T*.12*(.6+.4*Math.sin(b*2.4+V))}),w&&w.mg&&Bf(y),w&&w.smoke&&e!=="low"){let C=Gr(),_=(Date.now()-w.smoke.t)/1e3;_<10&&(S.add(C),C.material.uniforms.uT.value=_,C.material.uniforms.uEnd.value=w.smoke.end)}w&&w.plinth&&(i._pl||(i._pl=new ze(new yi(.3,.42,1,24),new Qt({color:724772,roughness:.3,metalness:.5})),i._pl.position.set(0,.5,0),i._pl.castShadow=!0,c.add(i._pl)),S.add(i._pl),i.ball(0,0,1/1.6,b*.6))};let Pn=null,de={up:0,gold:0,ov:0,wet:0,snow:0,fog:0,wind:0,flash:0,nf:6,init:0,dir:new Ze(.35,1,.45).normalize(),exp:1.08,hemi:.75,fogK:1,glow:1,t:0},Ea={clear:0,cloudy:.55,rain:.78,storm:.95,fog:.72,snow:.7},Aa=()=>{try{return s.atmo?s.atmo():null}catch{return null}},Ni=(y,M,w)=>[y[0]+(M[0]-y[0])*w,y[1]+(M[1]-y[1])*w,y[2]+(M[2]-y[2])*w],Qo={night:[[.012,.016,.05],[.06,.03,.16],[.24,.1,.32]],day:[[.17,.4,.8],[.42,.63,.9],[.8,.87,.95]],gold:[[.2,.25,.52],[.8,.46,.42],[1,.6,.3]],ovD:[[.46,.5,.55],[.56,.6,.64],[.68,.71,.74]],ovN:[[.025,.028,.04],[.05,.052,.07],[.11,.11,.14]]};function $o(y,M){let w=Pn,b=w&&w.tod!=null?(w.tod%24+24)%24:21,T=w&&w.wx,C=T?T.k:"clear",_=rt(5.8,7.4,b)*(1-rt(18,19.6,b)),U=_*Math.max(rt(15.6,17.8,b),1-rt(6.8,8.6,b)),V={up:_,gold:U,ov:Ea[C]||0,wet:C==="rain"?1:C==="storm"?2:0,snow:C==="snow"?1:0,fog:C==="fog"?1:0,wind:T?dn((T.w-3)/9,0,1):0},k=w&&w.key||"";k!==de.key&&(de.key=k,de.init=0);let ee=de.init?Math.min(1,y*1.2):1;de.init=1;for(let Rt in V)de[Rt]+=(V[Rt]-de[Rt])*ee;de.t+=y;let pe=dn((b-6)/13,0,1)*Math.PI,H=new Ze(-Math.cos(pe)*.9,.14+.95*Math.max(0,Math.sin(pe)),.55).normalize(),te=new Ze(.35,1,.45).normalize();de.dir.copy(te).lerp(H,de.up).normalize();let ae=Ni(Ni([1,.96,.9],[1,.97,.92],de.up),[1,.66,.4],de.gold);u.color.setRGB(ae[0],ae[1],ae[2]),u.intensity=(2.45+.6*de.up-.3*de.gold)*(1-.55*de.ov*de.up)*(1-.15*de.ov*(1-de.up)),C==="storm"&&M&&(de.nf-=y,de.nf<=0&&(de.flash=1,de.nf=6+Math.random()*10)),de.flash=Math.max(0,de.flash-y*5),de.hemi=.75+.3*de.up+.25*de.ov*de.up+de.flash*2.2,h.color.setRGB(.78+.1*de.up,.85+.05*de.up,1),h.groundColor.setRGB(.13,.23+.06*de.up,.14),de.exp=1.08-.06*de.up+.05*de.ov*de.up,de.fogK=1+3.6*de.fog+.7*Math.min(1,de.wet)+.5*Math.max(0,de.wet-1)+.9*de.snow,de.glow=dn(1-de.up+de.gold*.7+de.ov*.45,0,1);let ye=Qo,$e=[0,1,2].map(Rt=>Ni(Ni(ye.night[Rt],ye.day[Rt],de.up),ye.gold[Rt],de.gold*(1-de.ov*.7))),Ye=[0,1,2].map(Rt=>Ni(ye.ovN[Rt],ye.ovD[Rt],de.up)),ct=[0,1,2].map(Rt=>Ni($e[Rt],Ye[Rt],de.ov*.85));de.snow>.01&&(ct[2]=Ni(ct[2],[.85,.87,.9],de.snow*de.up*.4));let Le=Gt&&Gt.material.uniforms;if(Le&&(Le.uTop.value.fromArray(ct[0]),Le.uMid.value.fromArray(ct[1]),Le.uHor.value.fromArray(ct[2]),Le.uStars.value=(1-de.up)*(1-de.ov),Le.uCloud.value=dn(de.ov+.12*de.up*(1-de.ov),0,1),Le.uSun.value.copy(H),Le.uSunC.value.setRGB(ae[0]*de.up,ae[1]*de.up,ae[2]*de.up),Le.uT.value=de.t,Le.uFlash.value=de.flash*.35),c.fog.color.setRGB(ct[2][0]*.62,ct[2][1]*.62,ct[2][2]*.62),i._world){let Rt=i._world;for(let jt of Rt.glows||[])jt.material.opacity=de.glow;if(Rt.pitchM){let jt=Math.min(1,de.wet),Un=Rt.pitchM;Un.roughness=.94-.55*jt-.1*de.snow,Un.envMapIntensity=.18+.6*jt;let sn=de.snow;Un.color.setRGB(1-.18*jt+.3*sn,1-.18*jt+.3*sn,1-.16*jt+.38*sn),Un.emissive.setRGB(.42*sn,.45*sn,.5*sn)}if(Rt.stM){let jt=1+1.1*de.up*(1-.45*de.ov);Rt.stM.material.color.setRGB(jt,jt,jt*1.04)}}}let R=null,G=null,j=null,Q={high:[5200,2600,700],mid:[3e3,1600,420],low:[1100,700,160]}[e]||[3e3,1600,420];function Z(){if(R)return R;let y=Q[0],M=new Float32Array(y*6),w=new Float32Array(y*2),b=Nt(991);for(let _=0;_<y;_++){let U=b()*46-23,V=b()*26,k=b()*46-23;M.set([U,V,k,U,V,k],_*6),w[_*2]=0,w[_*2+1]=1}let T=new Zt;T.setAttribute("position",new Pt(M,3)),T.setAttribute("aEnd",new Pt(w,1));let C=new qn({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new Ze},uW:{value:new Ze},uT:{value:0},uA:{value:.3},uL:{value:.7}},vertexShader:"attribute float aEnd; uniform vec3 uC, uW; uniform float uT, uL; void main(){ vec3 p = position; float sp = 12.0 + fract(p.x * 7.13 + p.z * 3.1) * 5.0; p.y = mod(p.y - uT * sp, 26.0); p.x = mod(p.x + uW.x * uT + 23.0, 46.0) - 23.0; p.z = mod(p.z + uW.z * uT + 23.0, 46.0) - 23.0; vec3 w = vec3(p.x + uC.x, p.y, p.z + uC.z); w -= normalize(vec3(-uW.x, sp, -uW.z)) * uL * aEnd; gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0); }",fragmentShader:"uniform float uA; void main(){ gl_FragColor = vec4(0.78, 0.83, 0.9, uA); }"});return R=new Dr(T,C),R.frustumCulled=!1,R.renderOrder=5,c.add(R),R}function De(){if(G)return G;let y=Q[1],M=new Float32Array(y*3),w=Nt(773);for(let C=0;C<y;C++)M.set([w()*46-23,w()*26,w()*46-23],C*3);let b=new Zt;b.setAttribute("position",new Pt(M,3));let T=new qn({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new Ze},uW:{value:new Ze},uT:{value:0},uS:{value:1}},vertexShader:"uniform vec3 uC, uW; uniform float uT, uS; varying float vA; void main(){ vec3 p = position; float f = fract(p.x * 3.7 + p.z * 1.3); p.y = mod(p.y - uT * (0.9 + f * 0.7), 26.0); p.x = mod(p.x + uW.x * uT * 0.6 + sin(uT * 1.1 + f * 30.0) * 0.7 + 23.0, 46.0) - 23.0; p.z = mod(p.z + uW.z * uT * 0.6 + cos(uT * 0.9 + f * 20.0) * 0.6 + 23.0, 46.0) - 23.0; vec4 mv = viewMatrix * vec4(p.x + uC.x, p.y, p.z + uC.z, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = min(9.0, uS * (2.0 + f * 2.5) * 26.0 / max(1.0, -mv.z)); vA = 0.9; }",fragmentShader:"varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.15, length(d)); gl_FragColor = vec4(1.0, 1.0, 1.0, a * vA); }"});return G=new ms(b,T),G.frustumCulled=!1,G.renderOrder=5,c.add(G),G}function Xe(){if(j)return j;let y=Q[2],M=new Float32Array(y*3),w=Nt(551);for(let C=0;C<y;C++)M.set([w()*40-20,.03,w()*40-20],C*3);let b=new Zt;b.setAttribute("position",new Pt(M,3));let T=new qn({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new Ze},uT:{value:0},uA:{value:.6}},vertexShader:"uniform vec3 uC; uniform float uT; varying float vL; void main(){ vec3 p = position; float f = fract(p.x * 5.1 + p.z * 2.3); float ph = fract(uT * 1.6 + f); vL = ph; vec4 mv = viewMatrix * vec4(p.x + uC.x, 0.03, p.z + uC.z, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = (1.5 + ph * 7.0) * 30.0 / max(1.0, -mv.z); }",fragmentShader:"uniform float uA; varying float vL; void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d); float a = smoothstep(0.5, 0.38, r) * smoothstep(0.2, 0.36, r) * (1.0 - vL) * step(vL, 0.35) * 2.8; gl_FragColor = vec4(0.85, 0.9, 0.95, a * uA); }"});return j=new ms(b,T),j.frustumCulled=!1,j.renderOrder=5,c.add(j),j}function it(y){if(!y)return;let M=Pn&&Pn.wx;if(!M)return;let w=new Ze;l.getWorldDirection(w),w.y=0,w.lengthSq()<1e-4&&w.set(0,0,-1),w.normalize();let b=l.position.x+w.x*14,T=l.position.z+w.z*14,C=new Ze((M.dx||0)*(M.w||0)*.55,0,(M.dy||0)*(M.w||0)*.55);if(de.wet>.05){let _=Z(),U=_.material.uniforms;S.add(_),U.uC.value.set(b,0,T),U.uW.value.copy(C),U.uT.value=de.t,U.uA.value=.18+.16*Math.min(2,de.wet),U.uL.value=.55+.25*Math.min(2,de.wet);let V=Xe(),k=V.material.uniforms;S.add(V),k.uC.value.set(b,0,T),k.uT.value=de.t,k.uA.value=.35*Math.min(2,de.wet)}if(de.snow>.05){let _=De(),U=_.material.uniforms;S.add(_),U.uC.value.set(b,0,T),U.uW.value.copy(C),U.uT.value=de.t,U.uS.value=1}}let Ke=null,vt=30*4,mt=()=>W(I(64,64,y=>{let M=y.createRadialGradient(32,32,0,32,32,32);M.addColorStop(0,"rgba(0,0,0,0.9)"),M.addColorStop(1,"rgba(0,0,0,0)"),y.fillStyle=M,y.fillRect(0,0,64,64)}));function _t(y){if(!y||e==="low"||de.glow<.35||!i._world||!i._world.lights)return;if(!Ke){let U=new fn({map:mt(),transparent:!0,depthWrite:!1,opacity:.2,polygonOffset:!0,polygonOffsetFactor:-2});Ke=new Li(new Pi(1,1).rotateX(-Math.PI/2),U,vt),Ke.frustumCulled=!1,c.add(Ke)}let M=i._world.lights,w=new dt,b=new Qi,T=new Ze,C=new Ze,_=0;for(let U of we){if(!S.has(U.root)||_+M.length>vt)continue;let V=U.root.position.x,k=U.root.position.z;for(let ee of M){let pe=V-ee[0],H=k-ee[2],te=Math.sqrt(pe*pe+H*H)||1;pe/=te,H/=te;let ae=dn(55/te,.9,2.6);w.compose(C.set(V+pe*ae*.55,.02,k+H*ae*.55),b.setFromAxisAngle(We,Math.atan2(pe,H)),T.set(.55,1,ae)),Ke.setMatrixAt(_++,w)}}Ke.count=_,Ke.instanceMatrix.needsUpdate=!0,Ke.material.opacity=.2*de.glow,S.add(Ke)}let tn=new Map,Nn={lg:[["#22d3ee","#a855f7"],["#ff2d95","#22d3ee"],["#a855f7","#facc15"],["#14b8a6","#ff2d95"]],oc:[["#facc15","#ff2d95"],["#f97316","#a855f7"],["#22d3ee","#facc15"],["#ff2d95","#14b8a6"]],cl:[["#0b1f4d","#c0c0c0"],["#1e1b4b","#facc15"],["#0f172a","#22d3ee"],["#312e81","#e2e8f0"]],fr:[["#0b0f24","#0b0f24"],["#0b0f24","#22d3ee"],["#0b0f24","#ff2d95"],["#0b0f24","#a855f7"]],final:[["#d4af37","#0b0f24"],["#d4af37","#ffffff"],["#d4af37","#a855f7"],["#d4af37","#22d3ee"]]};function pn(y,M,w){let b=y+M+(w?"s":"");if(tn.has(b))return tn.get(b);let T=(Nn[y]||Nn.fr)[M%4],C=w?"#f97316":y==="cl"?T[0]:y==="final"?"#d4af37":"#f8fafc",_=W(I(512,256,U=>{if(U.fillStyle=C,U.fillRect(0,0,512,256),y==="fr"||w)U.fillStyle=w?"#1e1b4b":T[0],[[64,40],[192,40],[320,40],[448,40],[0,128],[128,128],[256,128],[384,128],[512,128],[64,216],[192,216],[320,216],[448,216]].forEach(([V,k])=>{U.beginPath();for(let ee=0;ee<5;ee++){let pe=-Math.PI/2+ee*1.2566;U.lineTo(V+Math.cos(pe)*28,k+Math.sin(pe)*24)}U.fill()}),T[1]!==T[0]&&!w&&(U.fillStyle=T[1],U.fillRect(0,122,512,12));else if(y==="cl"){U.fillStyle=T[1];for(let V=0;V<9;V++){let k=V%3*170+85+Math.floor(V/3)%2*40,ee=Math.floor(V/3)*85+42;U.beginPath();for(let pe=0;pe<10;pe++){let H=pe%2?12:30,te=-Math.PI/2+pe*Math.PI/5;U.lineTo(k+Math.cos(te)*H,ee+Math.sin(te)*H)}U.fill()}}else{let V=U.createLinearGradient(0,0,512,0);V.addColorStop(0,T[0]),V.addColorStop(1,T[1]),U.fillStyle=V;for(let k=0;k<6;k++){U.beginPath();let ee=k*86+M%2*40;U.moveTo(ee,0),U.quadraticCurveTo(ee+70,128,ee+10,256),U.lineTo(ee+34,256),U.quadraticCurveTo(ee+100,128,ee+26,0),U.fill()}if(y==="final"){U.strokeStyle=T[1],U.lineWidth=4;for(let k=0;k<512;k+=64)U.beginPath(),U.moveTo(k,0),U.lineTo(k+32,256),U.stroke()}}U.strokeStyle="rgba(15,23,42,.35)",U.lineWidth=2;for(let V=0;V<512;V+=64)U.beginPath(),U.moveTo(V,0),U.lineTo(V+32,256),U.stroke()}));return tn.set(b,_),_}let Yn="";function nn(){if(!At)return;let y=Pn&&Pn.ball,M=y?y.kind:"fr",w=y&&y.d||0,b=!!(Pn&&Pn.wx&&Pn.wx.k==="snow"),T=M+w+b;T!==Yn&&(Yn=T,At.material.map=pn(M,w,b),At.material.metalness=M==="final"&&!b?.55:0,At.material.roughness=M==="final"&&!b?.25:.38,At.material.needsUpdate=!0)}let Mt=null,kr=()=>Mt||(Mt=(()=>{let y=[],M=(w,b)=>{let T=(w.toNonIndexed,w),C=T.attributes.position.count;T.setAttribute("aPart",new Pt(new Float32Array(C).fill(b),1)),T.deleteAttribute("uv"),y.push(T)};return M(new ln(.34,.5,.26).translate(0,.25,.04),0),M(new ln(.42,.52,.25).translate(0,.76,0),1),M(new Yi(.12,6,4).translate(0,1.16,.01),2),M(new ln(.11,.48,.12).translate(-.27,.74,0),3),M(new ln(.11,.48,.12).translate(.27,.74,0),4),M(new ln(.62,.17,.03).translate(0,1.5,.05),5),jo(y)})()),on=`
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
    #endif`;function Ui(){let y=new Ii,M={uT:{value:0},uB:{value:0},uSt:{value:new He},uAr:{value:new He},uJp:{value:new He},uHd:{value:new He},uSc:{value:new He},uWave:{value:new He},uTifo:{value:0},uTifoTex:{value:null},uCards:{value:0}};return y.userData.u=M,y.onBeforeCompile=w=>{Object.assign(w.uniforms,M),w.vertexShader=`uniform float uT, uB, uTifo, uCards; uniform vec2 uSt, uAr, uJp, uHd, uSc, uWave; uniform sampler2D uTifoTex; attribute float aPart, aSeed, aSide; attribute vec2 aUV; attribute vec3 aCol2;
`+w.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
#ifdef USE_INSTANCING
`+on+`
#endif`)},y.customProgramCacheKey=()=>"w3dcrowd7",y}let $i=null;function Ms(y,M){let w=t?8:16,b=t?4:8,T=w+b,C=t?48:e==="high"?80:64,_=C*2,U=4,V=new vi(T*C,U*_,{samples:t?0:4});V.texture.generateMipmaps=!1,V.texture.minFilter=Tn;let k=new ps;k.add(new Bo(16777215,1.1));let ee=new Mi(16774374,1.9);ee.position.set(.5,1.2,2),k.add(ee),k.environment=c.environment;let pe=new ds(-.5625,.5625,2.45,.2,-5,5);pe.position.set(0,0,2),$i||($i=ht(),c.remove($i.root),we.splice(we.indexOf($i),1));let H=$i;k.add(H.root);let te=Nt(s.hash("fans:"+y+M)>>>0),ae=ct=>ct[Math.floor(te()*ct.length)],ye=[],$e=["#1e293b","#334155","#f8fafc","#0b0f24","#475569","#a3a3a3","#1d4ed8","#15803d","#78350f"],Ye={cc:a.getClearColor(new Ue),ca:a.getClearAlpha(),rt:a.getRenderTarget()};a.setClearColor(0,0);for(let ct=0;ct<T;ct++){let Le=ct>=w,Rt=Le?M:y,jt=Le?y:M,Un=te()<.7,sn=s.kitN(Un?{c1:Rt,c2:te()<.5?"#f8fafc":jt,pat:ae(["plain","plain","stripes","hoops","halves","sash"]),col:jt,slv:Rt,sho:ae($e),soc:ae($e)}:(()=>{let ce=ae($e);return{c1:ce,c2:ce,pat:"plain",col:ce,slv:te()<.5?ce:ae($e),sho:ae($e),soc:ae($e)}})()),ii={_b3:1,key:"fan"+ct+JSON.stringify(sn),K:sn,g:"#facc15",tex:W(z(sn))};ii.gtex=ii.tex,ye.push(ii.tex);let es="fan"+s.hash(y+M)%997+"x"+ct;be(H,ii,!1,es,""),H.lo&&(H.lo.visible=!1),H.hi&&(H.hi.visible=!0),H.bodyU.uGear.value.y=1;for(let ce of H.cloth||[])ce.visible=ce.userData.layer!==2;for(let ce=0;ce<U;ce++){for(let[_e,q]of H.mod)_e.quaternion.copy(q);H.mod.clear();for(let _e in H.act)H.act[_e].setEffectiveWeight(_e==="idle"?1:0);if(H.mixer.setTime(.4+ct*.37),H.root.position.set(0,0,0),H.root.rotation.set(0,(te()-.5)*.35,0),H.root.scale.setScalar(rh*(H.hgt||1)),H.root.updateMatrixWorld(!0),H.FU.uExpr.value.set(ce===0?.3:0,ce===1||ce===3?1:0,ce===1?.6:0,ce===2?1:0),ce===1){let _e=(te()-.5)*.3;Ee(H,"upperarm_l","lowerarm_l",se(.45,1,.1+_e),1),Ee(H,"lowerarm_l","hand_l",se(.25,1,.15),1),Ee(H,"upperarm_r","lowerarm_r",se(-.45,1,.1-_e),1),Ee(H,"lowerarm_r","hand_r",se(-.25,1,.15),1)}ce===2&&(Ee(H,"upperarm_l","lowerarm_l",se(.75,.75,.15),1),Ee(H,"lowerarm_l","hand_l",se(-.9,.35,-.1),1),Ee(H,"upperarm_r","lowerarm_r",se(-.75,.75,.15),1),Ee(H,"lowerarm_r","hand_r",se(.9,.35,-.1),1),ke(H,"Head",Oe,-.12)),ce===3&&(Ee(H,"upperarm_l","lowerarm_l",se(.2,-.55,.8),1),Ee(H,"lowerarm_l","hand_l",se(-.75,.35,.55),1),Ee(H,"upperarm_r","lowerarm_r",se(-.2,-.55,.8),1),Ee(H,"lowerarm_r","hand_r",se(.75,.35,.55),1)),H.root.updateMatrixWorld(!0),V.viewport.set(ct*C,ce*_,C,_),V.scissor.set(ct*C,ce*_,C,_),V.scissorTest=!0,a.setRenderTarget(V),a.clear(),a.render(k,pe)}}a.setRenderTarget(Ye.rt),a.setClearColor(Ye.cc,Ye.ca),V.scissorTest=!1,k.remove(H.root);for(let[ct,Le]of H.mod)ct.quaternion.copy(Le);return H.mod.clear(),H.FU.uExpr.value.set(0,0,0,0),ye.forEach(ct=>ct.dispose()),H.dk=null,{tex:V.texture,rt:V,nH:w,nA:b,N:T}}function zr(y,M,w,b){let T;try{T=Ms(w,b)}catch(k){return console.warn("3D fans",k),null}let C=new Pi(.985,1.97).translate(0,.175+.985,0),_=new Ii({side:Rn,alphaTest:.5}),U=_.userData.u=Object.assign({},M,{uFan:{value:T.tex},uFanN:{value:new B(T.nH,T.nA,T.N)}});_.onBeforeCompile=k=>{Object.assign(k.uniforms,U),k.vertexShader=`uniform float uT, uB, uTifo; uniform vec2 uSt, uAr, uJp, uHd, uSc, uWave; uniform vec3 uFanN; attribute float aSeed, aSide; attribute vec2 aUV; varying vec2 vFan;
`+k.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
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
        #endif`),k.fragmentShader=`uniform sampler2D uFan; varying vec2 vFan;
`+k.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ vec4 t = texture2D(uFan, vFan); if (t.a < 0.5) discard; diffuseColor.rgb = t.rgb / max(t.a, 0.5); }`)},_.customProgramCacheKey=()=>"w3dfans1";let V=new Li(C,_,y.count);V.instanceMatrix.copy(y.instanceMatrix),V.count=y.count,V.frustumCulled=!1;for(let k of["aSeed","aSide","aUV"])C.setAttribute(k,y.geometry.attributes[k]);return M.uCards.value=1,V.userData.rt=T.rt,V}let xn=y=>{let M=I(256,64,b=>{let T=b.createLinearGradient(0,0,256,64);T.addColorStop(0,y.c1),T.addColorStop(.5,y.c1),T.addColorStop(.5,y.c2),T.addColorStop(1,y.c2),b.fillStyle=T,b.fillRect(0,0,256,64),b.fillStyle="#ffffff";for(let C=0;C<12;C++)b.fillRect(C*22,0,6,6);b.font="900 40px Arial, Helvetica, sans-serif",b.textAlign="center",b.textBaseline="middle",b.lineWidth=6,b.strokeStyle="#0b0f24",b.strokeText(String(y.sh||"").slice(0,10),128,36),b.fillText(String(y.sh||"").slice(0,10),128,36)}),w=W(M);return w.minFilter=Tn,w.generateMipmaps=!1,w},Ut={st:[0,0],ar:[0,0],jp:[0,0],hd:[0,0],sc:[0,0],wave:0,wph:0,tifo:0,tkey:"",smoke:null};function Hr(y,M){let w=y.cu,b=Pn&&Pn.crowd||null,T=d.dt,C=Math.min(1,T*4.5);for(let _ of["st","ar","jp","hd","sc"])for(let U=0;U<2;U++){let V=b&&b[_]?b[_][U]||0:_==="jp"?(M||0)*2:_==="st"?M>.05?1:.08:0;Ut[_][U]+=(V-Ut[_][U])*C}if(Ut.wave+=((b&&b.wave||0)-Ut.wave)*Math.min(1,T*1.5),Ut.wph=(Ut.wph+T*1.15)%(Math.PI*2),Ut.tifo+=((b&&b.tifo?1:0)-Ut.tifo)*Math.min(1,T*2.5),w.uSt.value.fromArray(Ut.st),w.uAr.value.fromArray(Ut.ar),w.uJp.value.fromArray(Ut.jp),w.uHd.value.fromArray(Ut.hd),w.uSc.value.fromArray(Ut.sc),w.uWave.value.set(Ut.wave,Ut.wph),w.uTifo.value=Ut.tifo>.5?1:0,w.uT.value=d.now/1e3,w.uB.value=0,b&&b.tifo){let _=JSON.stringify(b.tifo);_!==Ut.tkey&&(Ut.tkey=_,w.uTifoTex.value&&w.uTifoTex.value.dispose(),w.uTifoTex.value=xn(b.tifo))}w.uTifoTex.value||(w.uTifoTex.value=xn({c1:"#22d3ee",c2:"#a855f7",sh:""}))}let vn=null;function Gr(){if(vn)return vn;let y=e==="high"?260:160,M=new Float32Array(y*3),w=new Float32Array(y*3),b=Nt(4242),T=[[.13,.83,.93],[.66,.33,.97],[1,.18,.58]];for(let U=0;U<y;U++){let V=b()<.5?-1:1;M.set([V*(60+b()*4),1+b()*3,(b()-.5)*50],U*3),w.set(T[U%3],U*3)}let C=new Zt;C.setAttribute("position",new Pt(M,3)),C.setAttribute("color",new Pt(w,3));let _=new qn({transparent:!0,depthWrite:!1,uniforms:{uT:{value:0},uEnd:{value:0}},vertexShader:"attribute vec3 color; uniform float uT, uEnd; varying vec3 vC; varying float vA; void main(){ vec3 p = position; float f = fract(p.z * 0.37 + p.y * 1.7); float e = sign(p.x); float on = uEnd > 1.5 ? 1.0 : step(0.0, e * (uEnd - 0.5)); float life = clamp(uT / 9.0, 0.0, 1.0); float a = clamp(uT - f * 2.0, 0.0, 9.0);p.y += a * (1.3 + f); p.x -= e * a * 0.6; p.z += sin(a * 0.7 + f * 9.0) * 1.5; vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = (3.0 + a * 1.8) * 120.0 / max(1.0, -mv.z); vC = color; vA = on * smoothstep(0.0, 0.6, a) * (1.0 - life) * 0.45; }",fragmentShader:"varying vec3 vC; varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(vC, a * vA); }"});return vn=new ms(C,_),vn.frustumCulled=!1,c.add(vn),vn}let Ss=new Map,Vr=new Map,Df=["shaved","buzz","crew","short","part","slick","quiff","curl","afro","dread","fade","top"],Nf=["#0a0a0c","#24170f","#5a3a20","#a07a44","#c9a55a","#6b2f1a","#8a8f96","#d8dadd"];function oh(y,M){let w=y+JSON.stringify(M),b=Ss.get(w);return b||(b={...bt("mgrface:"+(M.seed||y)),si:[0,2,4,5,7,9,11,12][M.sk||0],hair:Nf[M.hc||0],st:Df[M.hr||0],beard:[0,1,2,3,5][M.bd||0],build:[-.35,.1,.55][M.bu||0],h:1.8+((M.bu||0)===0?.02:0),arch:"balanced",sock:0,band:!1,wrist:0,sleeves:(M.fit|0)!==3,untuck:(M.fit|0)!==3,dance:!1,sad:1,cel:0,mgr:1,trou:(M.fit|0)===2?2:1,gl:M.gl||0,boot:(M.fit|0)===1?"#f8fafc":"#0b0f24",boot2:(M.fit|0)===1?"#94a3b8":"#111827",red:(M.ag||0)*.2},Ss.set(w,b),Ss.size>40&&Ss.delete(Ss.keys().next().value),b)}let Uf=(y,M,w,b)=>I(512,256,T=>{let C=(_,U)=>T.fillRect(_,0,U,256);if(T.fillStyle=y===1||y===3?w:M,C(0,512),y===0||y===2){if(T.fillStyle="#f8fafc",T.beginPath(),T.moveTo(100,0),T.lineTo(156,0),T.lineTo(128,120),T.fill(),y===0)T.fillStyle=w,T.beginPath(),T.moveTo(122,8),T.lineTo(134,8),T.lineTo(138,104),T.lineTo(128,116),T.lineTo(118,104),T.fill();else{T.fillStyle=w,T.fillRect(104,0,20,150),T.fillStyle=b;for(let _=0;_<150;_+=18)T.fillRect(104,_,20,6)}T.strokeStyle="rgba(0,0,0,.35)",T.lineWidth=5,T.beginPath(),T.moveTo(92,0),T.lineTo(124,130),T.moveTo(164,0),T.lineTo(132,130),T.stroke(),T.fillStyle="rgba(0,0,0,.45)",[150,190].forEach(_=>{T.beginPath(),T.arc(136,_,5,0,7),T.fill()}),T.fillStyle="rgba(0,0,0,.25)",T.fillRect(383,0,3,256)}else y===1?(T.fillStyle=b,T.fillRect(30,0,14,256),T.fillRect(212,0,14,256),T.fillRect(286,0,14,256),T.fillRect(468,0,14,256),T.fillStyle="#e2e8f0",T.fillRect(126,0,4,256)):(T.fillStyle=b,T.fillRect(118,0,20,70),T.fillStyle="#f8fafc",[20,42,62].forEach(_=>{T.beginPath(),T.arc(128,_,3,0,7),T.fill()}))});function ch(y){let M=y.fit|0,w=y.c||"#0b1f4d",b=y.c1||"#22d3ee",T=y.c2||"#ffffff",C=[M,w,b,T].join(),_=Vr.get(C);if(_)return _;let U=M===1||M===3?b:w,V={c1:U,c2:T,pat:"plain",col:M===0?"#f8fafc":M===2?b:T,slv:U,sho:M===1&&b===w?"#0b0f24":w,soc:"#0b0f24"},k=W(Uf(M,w,b,T));return _={_b3:1,key:"mgr"+C,K:V,g:U,tex:k,gtex:k},Vr.set(C,_),_}let Wr=null;function lh(y,M){if(!Wr){let w=(()=>{let U=null;return Y.traverse(V=>{V.isBone&&V.name==="Head"&&(U=V)}),U})();if(!w)return null;Y.updateMatrixWorld(!0);let b=new dt().copy(w.matrixWorld).invert(),T=new Ze(0,1.692,.104).applyMatrix4(b),C=new Qi;w.getWorldQuaternion(C);let _=new Ze;w.getWorldScale(_),Wr={pos:T,q:C.invert(),s:1/(_.x||1)}}if(!y.gls){let w=new Wn,b=new Qt({color:724772,roughness:.35,metalness:.4}),T=new Qt({color:1120295,roughness:.1,metalness:.6,transparent:!0,opacity:.85});[-1,1].forEach(_=>{let U=new ze(new ba(.019,.0035,6,14),b);U.position.set(_*.031,0,0),w.add(U);let V=new ze(new Do(.018,12),T);V.position.set(_*.031,0,.001),V.userData.lens=1,w.add(V);let k=new ze(new ln(.003,.003,.085),b);k.position.set(_*.05,.002,-.044),w.add(k)});let C=new ze(new ln(.024,.003,.003),b);C.position.set(0,.004,0),w.add(C),w.position.copy(Wr.pos),w.quaternion.copy(Wr.q),w.scale.setScalar(Wr.s),y.bones.Head.add(w),y.gls=w}return y.gls.visible=M>0,y.gls.children.forEach(w=>{w.userData.lens&&(w.visible=M===2)}),y.gls}let wi=null,hh="";function Ff(y,M){let w=y+":"+M;return wi||(wi=new ze(new ln(.62,.36,.05),new fn({toneMapped:!1})),c.add(wi)),w!==hh&&(hh=w,wi.material.map&&wi.material.map.dispose(),wi.material.map=W(I(256,150,b=>{b.fillStyle="#05060f",b.fillRect(0,0,256,150),b.font="900 70px Arial, Helvetica, sans-serif",b.textAlign="center",b.textBaseline="middle",b.fillStyle="#ff2d95",b.fillText(String(y),66,80),b.fillStyle="#22d3ee",b.fillText(String(M),190,80),b.font="900 18px Arial",b.fillStyle="#e2e8f0",b.fillText("OUT",66,22),b.fillText("IN",190,22)})),wi.material.needsUpdate=!0),wi}let Ws=null;function Of(){if(Ws)return Ws;let y=jo([new ln(.34,.22,.42).translate(0,.5,.12),new ln(.4,.5,.24).translate(0,.86,0),new Yi(.12,6,4).translate(0,1.22,0)].map(M=>(M.deleteAttribute("uv"),M)));return Ws=new Li(y,new Ii,12),Ws.frustumCulled=!1,c.add(Ws),Ws}let ec=-36.4;function Bf(y){let M=Pn;if(!M||!M.mg||!y.dug)return;let w=d.now/1e3,b=new Ue,T=new dt,C=Of(),_=0;for(let ee=0;ee<2;ee++){let pe=M.mc&&M.mc[ee]&&M.mc[ee].c1||(ee?"#ff2d95":"#22d3ee");for(let H=0;H<6;H++)T.makeRotationY(0),T.setPosition((ee?1:-1)*(10.6+(H-2.5)*.95),0,-38.05),C.setMatrixAt(_,T),b.set(pe),C.setColorAt(_++,b)}C.count=_,C.instanceMatrix.needsUpdate=!0,C.instanceColor&&(C.instanceColor.needsUpdate=!0),S.add(C);for(let ee=0;ee<2;ee++){let pe=M.mg[ee];if(!pe)continue;let H=ch(pe),te="mgr"+ee+":"+s.hash(JSON.stringify(pe)),ae=M.ma&&M.ma[ee]||{};tc.set(te,oh(te,pe));let ye=(ee?1:-1)*7.6,$e=ae.k&&ae.k!=="idle",Ye=ye+Math.sin(w*.33+ee*2.1)*1.7;$e&&(Ye=ae.x!=null?ae.x:Ye),ae.x=Ye;let ct=Math.cos(w*.33+ee*2.1)*1.7*.33,Le={num:"",run:$e?0:.25,yaw:$e?0:Math.abs(ct)>.28?ct>0?Math.PI/2:-Math.PI/2:0};ae.k==="shout"?Le.yell=1:ae.k==="cheer"?(Le.jump=Math.abs(Math.sin(w*6+ee))*.35,Le.arms="up"):ae.k==="despair"?Le.hands=1:ae.k==="argue"?(Le.yell=1,Le.yaw=ee?-Math.PI/2:Math.PI/2):ae.k==="clap"&&(Le.arms="up"),i.fig(H,!1,te,Ye,ec,Le);let Rt=Ve.get(te);Rt&&Rt.bones.Head&&lh(Rt,pe.gl||0)}let U=M.rc||"#111827",V=i.team({c1:U,c2:"#0b0f24",pat:"plain",col:"#0b0f24",slv:U,sho:"#0b0f24",soc:"#0b0f24"},U),k=M.sub;if(i.fig(V,!1,"off4",0,ec-.3,{num:"",run:0,yaw:0,arms:k?"up":""}),k){let ee=Ff(k.out,k.inn);S.add(ee),ee.position.set(0,2.42,ec-.18),ee.rotation.set(0,0,0)}}let tc=new Map;i.mgrFig=function(y,M,w,b){if(!D||!y)return;let T="mgrp:"+s.hash(JSON.stringify(y));tc.set(T,oh(T,y)),i.fig(ch(y),!1,T,M,w,Object.assign({num:"",run:0},b||{}));let C=Ve.get(T);C&&C.bones.Head&&lh(C,y.gl||0)};function kf(y){let M=et();[-1,1].forEach(T=>{let C=T*10.6;M.box(6.8,1.75,.12,"#0f172a",C,.88,-38.75),M.box(.1,1.75,1.1,"#0f172a",C-3.4,.88,-38.2),M.box(.1,1.75,1.1,"#0f172a",C+3.4,.88,-38.2),M.box(6.4,.42,.5,"#334155",C,.21,-38.4)});let w=new ze(M.geo(),new Ii({vertexColors:!0}));y.add(w);let b=new Qt({color:10467273,transparent:!0,opacity:.3,roughness:.1,metalness:.2,depthWrite:!1});return[-1,1].forEach(T=>{let C=new ze(new ln(6.9,.06,1.25),b);C.position.set(T*10.6,1.78,-38.2),y.add(C)}),!0}let Kn=t?1:0,Xr=0,ws=0,zf=Kn,uh=y=>{u.shadow.mapSize.set(y,y),u.shadow.map&&(u.shadow.map.dispose(),u.shadow.map=null)},Hf=y=>{y>.05?(Xr++,ws=0):(Xr=Math.max(0,Xr-2),y<.024?ws++:ws=Math.max(0,ws-3)),Xr>=75&&Kn<3?(Xr=0,ws=0,Kn++,Kn===2&&uh(512),Kn>=3&&(u.castShadow=!1)):ws>=720&&Kn>zf&&(ws=0,Kn>=3?u.castShadow=!0:Kn===2&&uh(n.sh),Kn--)};i.tier=e,i.q=()=>Kn;let Hn={e:null,a:null,f:40,v:null};function Gf(y,M){let w=Math.min(.1,(M-x)/1e3);x=M,d.dt=w,d.now=M,d.n++,d.n>30&&Hf(w);let b=y.step(w,M);if(!b)return;let T=o.clientWidth||300,C=o.clientHeight||200,_=Math.min(window.devicePixelRatio||1,Kn?1:n.pr);a.getPixelRatio()!==_&&a.setPixelRatio(_);let U=a.getSize(new He);(U.x!==T||U.y!==C)&&a.setSize(T,C,!1);{let ae=new Ze(b.eye[0],b.eye[1],b.eye[2]),ye=new Ze(b.at[0],b.at[1],b.at[2]),$e=!Hn.e||y!==Hn.v||Hn.e.distanceTo(ae)>9||Hn.a.distanceTo(ye)>12,Ye=$e?1:1-Math.exp(-w*14);$e?(Hn.e=ae.clone(),Hn.a=ye.clone(),Hn.f=b.fov||40,Hn.v=y):(Hn.e.lerp(ae,Ye),Hn.a.lerp(ye,Ye),Hn.f+=((b.fov||40)-Hn.f)*Ye),l.fov=Hn.f,l.aspect=T/C,l.near=.1,l.position.copy(Hn.e),l.lookAt(Hn.a),l.updateProjectionMatrix()}S.clear(),i._world=null,Pn=Aa(),y.draw();let V=!!i._world;$o(w,V),it(V),_t(V);for(let ae of c.children)ae!==h&&ae!==u&&ae!==u.target&&!ae.isLight&&(ae.visible=S.has(ae));c.fog.density=V?(b.fog==null?.0026:b.fog*.75)*de.fogK:0,a.toneMappingExposure=V?de.exp:1.08,V||(u.color.setRGB(1,.95,.89),u.intensity=2.6),V?a.setClearColor(329231,1):b.bg?a.setClearColor(new Ue().setRGB(b.bg[0],b.bg[1],b.bg[2],Ht),0):a.setClearColor(461592,0),h.intensity=V?de.hemi:1;let k=new Ze(b.at[0],0,b.at[2]),ee=l.position.distanceTo(k),pe=dn(ee*.75,5,48);V?u.position.copy(k).addScaledVector(de.dir,70):u.position.set(k.x+26,60,k.z+34),u.target.position.copy(k);let H=u.shadow.camera;H.left=-pe,H.right=pe,H.top=pe,H.bottom=-pe,H.updateProjectionMatrix();let te=Kn>=2?16:n.near;for(let ae of we){if(!S.has(ae.root))continue;let ye=(ae.dist||0)>te;if(ae.hi&&(ae.hi.visible=!ye),ae.lo&&(ae.lo.visible=ye),ae.cloth){let $e=!!(ae.style&&ae.style.mgr);for(let Ye of ae.cloth)Ye.visible=!ye&&(Ye.userData.layer===3?$e:!($e&&Ye.userData.layer===2))}}a.render(c,l)}i.run=function(y,M){if(!D||!y||!F()||p)return!1;if(M._err=0,o.parentNode!==y&&y.appendChild(o),!f){x=performance.now();let w=()=>{if(r.be!=="b3"){f=null;return}let b=performance.now(),T=r.view;if(!T||!document.body.contains(o)||T.alive&&!T.alive()){f=null,T&&T.end&&T.end(),r.view===T&&(r.view=null);return}if(t&&b-m<31){f=requestAnimationFrame(w);return}m=b;try{Gf(T,b)}catch(C){(i._errs=i._errs||[]).push(String(C&&C.stack||C).slice(0,300)),T._err++||console.warn("3D",C),T._err>5&&(r.view=null,g++)}f=requestAnimationFrame(w)};f=requestAnimationFrame(w)}return!0},i.stop=function(){o&&o.parentNode&&o.parentNode.removeChild(o)};let qr=null;return i.portrait=function(y,M,w,b,T,C){if(!D||!y||!y._b3)return null;T=T||720,C=C||900;let _=document.createElement("canvas");_.width=T,_.height=C;let U;try{U=new Pr({canvas:_,antialias:!0,alpha:!0,preserveDrawingBuffer:!0})}catch{return null}try{U.outputColorSpace=Ht,U.toneMapping=Go,U.toneMappingExposure=1.05,U.setClearColor(0,0);let V=new ps;try{let $e=new ks(U);V.environment=$e.fromScene(new Sa,.04).texture,$e.dispose()}catch{}let k=new Mi(16773600,2.6);k.position.set(-1.2,2.6,2.2),V.add(k);let ee=new Mi(10475775,2.2);ee.position.set(1.6,2.2,-1.8),V.add(ee);let pe=new Mi(14202110,1.1);pe.position.set(-1.8,1.6,-1.5),V.add(pe),V.add(new xa(13358591,1777459,.55)),qr||(qr=ht(),c.remove(qr.root),we.splice(we.indexOf(qr),1));let H=qr;V.add(H.root),H.dk=null,be(H,y,M,String(w),b),H.lo&&(H.lo.visible=!1),H.hi&&(H.hi.visible=!0);for(let $e of H.cloth||[])$e.visible=$e.userData.layer!==3;for(let[$e,Ye]of H.mod)$e.quaternion.copy(Ye);H.mod.clear();for(let $e in H.act)H.act[$e].setEffectiveWeight($e==="idle"?1:0);H.mixer.setTime(.9),H.root.position.set(0,0,0),H.root.rotation.set(0,-.32,0),H.root.scale.setScalar(rh*(H.hgt||1)),H.root.updateMatrixWorld(!0),ke(H,"Head",We,.18),ke(H,"neck_01",We,.08),H.FU.uExpr.value.set(.35,.15,0,0),H.root.updateMatrixWorld(!0);let te=new Ze;H.bones.Head.getWorldPosition(te);let ae=new bn(24,T/C,.05,20);ae.position.set(te.x-.05,te.y+.26,te.z+1.75),ae.lookAt(te.x+.02,te.y-.06,te.z),U.render(V,ae),U.render(V,ae);let ye=_.toDataURL("image/png");V.remove(H.root);for(let[$e,Ye]of H.mod)$e.quaternion.copy(Ye);return H.mod.clear(),H.FU.uExpr.value.set(0,0,0,0),H.dk=null,ye}catch(V){return console.warn("3D portrait",V),null}finally{try{U.dispose(),U.forceContextLoss()}catch{}}},i.shoulders=()=>{let y=new Ze,M=new Ze,w=new Ze,b=Y;b.updateMatrixWorld(!0),b.getObjectByName("upperarm_l").getWorldPosition(y),b.getObjectByName("upperarm_r").getWorldPosition(M),b.getObjectByName("Head").getWorldPosition(w);let T=b.getObjectByName("root")||b,C=new Ze;return T.getWorldPosition(C),{w:y.distanceTo(M),ratio:y.distanceTo(M)/(w.y-C.y)}},i.poseCheck=function(){let y=[],M=(w,b)=>{let T=new Ze;return w.bones[b].getWorldPosition(T),T};for(let w of we){if(w.lastN<d.n-1||!w.bones.Head)continue;let b=new Ze(1,0,0).applyQuaternion(w.root.quaternion);for(let T of["l","r"]){let C=M(w,"upperarm_"+T),_=M(w,"lowerarm_"+T),U=M(w,"hand_"+T),V=M(w,"thigh_"+T),k=M(w,"calf_"+T),ee=M(w,"foot_"+T),pe=_.clone().sub(C).normalize(),H=U.clone().sub(_).normalize(),te=Math.acos(dn(pe.dot(H),-1,1))*57.3,ae=k.clone().sub(V).normalize(),ye=ee.clone().sub(k).normalize(),$e=Math.acos(dn(ae.dot(ye),-1,1))*57.3,Ye=new Ze().crossVectors(ae,ye).dot(b);te>160&&y.push([w.id,"elbow_"+T,Math.round(te)]),$e>150&&y.push([w.id,"knee_"+T,Math.round($e)]),Ye<0&&$e>12&&y.push([w.id,"knee_back_"+T,Math.round($e)])}}return y},i.dbg=()=>({looks:we.filter(y=>y.lastN>=d.n-1).map(y=>[y.id,y.hstyle,"#"+y.hairMat.color.getHexString(),y.bodyU.uHairS.value,y.bodyU.uBeard.value]),q:Kn,cam:l.position.toArray().map(y=>+y.toFixed(1)),p0:we.filter(y=>y.lastN>=d.n-1).slice(0,3).map(y=>[y.id,y.root.position.toArray().map(M=>+M.toFixed(1)),y.root.visible,y.hi&&y.hi.visible,y.lo&&y.lo.visible,+(y.dist||0).toFixed(1)]),chars:we.length,used:we.filter(y=>y.lastN>=d.n-1).length,n:d.n,world:!!i._world,errs:i._errs||[]}),i.at=()=>({up:de.up,gold:de.gold,ov:de.ov,wet:de.wet,snow:de.snow,fog:de.fog,wind:de.wind,glow:de.glow,crowd:{st:Ut.st.slice(),jp:Ut.jp.slice(),ar:Ut.ar.slice(),wave:Ut.wave,tifo:Ut.tifo},ball:Yn,mgr:we.filter(y=>y.lastN>=d.n-1&&/^mgr/.test(y.id)).length,board:!!(wi&&S.has(wi)),atm:!!Pn}),i.ready=!1,A}window.W3D={load:L_,version:4};
