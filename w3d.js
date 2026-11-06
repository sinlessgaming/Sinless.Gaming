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
var ih="160";var mA=0,Au=1,gA=2;var Sc=1,_A=2,ss=3,qi=0,Fn=1,Sn=2;var vs=0,Gr=1,Wo=2,pu=3,mu=4,bA=5,Ks=100,EA=101,xA=102,gu=103,_u=104,yA=200,vA=201,MA=202,SA=203,Ml=204,Sl=205,CA=206,wA=207,IA=208,TA=209,RA=210,BA=211,DA=212,LA=213,PA=214,FA=0,NA=1,UA=2,Ko=3,OA=4,kA=5,QA=6,GA=7,sh=0,HA=1,zA=2,Ms=0,VA=1,WA=2,KA=3,Cc=4,qA=5,XA=6,bu="attached",YA="detached",qf=300,Zs=301,Vr=302,Ga=303,Cl=304,wc=306,ai=1e3,Gn=1001,Ha=1002,Ln=1003,qo=1004;var La=1005;var qt=1006,rh=1007;var Zn=1008;var Bn=1009,JA=1010,jA=1011,ah=1012,Xf=1013,xs=1014,zn=1015,oi=1016,Yf=1017,Jf=1018,Ys=1020,ZA=1021,Cn=1023,$A=1024,ep=1025,Js=1026,Wr=1027,rr=1028,jf=1029,ar=1030,Zf=1031,$f=1033,Pa=33776,qc=33777,Xc=33778,Fa=33779,Xo=35840,Eu=35841,Yo=35842,xu=35843,Ic=36196,Jo=37492,jo=37496,Zo=37808,yu=37809,vu=37810,Mu=37811,za=37812,Su=37813,Cu=37814,wu=37815,Iu=37816,Tu=37817,Ru=37818,Bu=37819,Du=37820,Lu=37821,Na=36492,Pu=36494,Fu=36495,tp=36283,Nu=36284,Uu=36285,Ou=36286,Tc=2200,np=2201,ip=2202,Kr=2300,$s=2301,Yc=2302,Ur=2400,Or=2401,$o=2402,oh=2500,sp=2501,ed=0,Rc=1,to=2,td=3e3,js=3001,rp=3200,ap=3201,ch=0,op=1,Hn="",Pt="srgb",bn="srgb-linear",no="display-p3",aa="display-p3-linear",ec="linear",mn="srgb",tc="rec709",nc="p3";var mr=7680;var ku=519,cp=512,lp=513,hp=514,nd=515,up=516,fp=517,dp=518,Ap=519,wl=35044;var Qu="300 es",Il=1035,os=2e3,ic=2001,cs=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},Jn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gu=1234567,Ua=Math.PI/180,qr=180/Math.PI;function Gi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jn[s&255]+Jn[s>>8&255]+Jn[s>>16&255]+Jn[s>>24&255]+"-"+Jn[e&255]+Jn[e>>8&255]+"-"+Jn[e>>16&15|64]+Jn[e>>24&255]+"-"+Jn[t&63|128]+Jn[t>>8&255]+"-"+Jn[t>>16&255]+Jn[t>>24&255]+Jn[n&255]+Jn[n>>8&255]+Jn[n>>16&255]+Jn[n>>24&255]).toLowerCase()}function Qn(s,e,t){return Math.max(e,Math.min(t,s))}function lh(s,e){return(s%e+e)%e}function pp(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function mp(s,e,t){return s!==e?(t-s)/(e-s):0}function Oa(s,e,t){return(1-t)*s+t*e}function gp(s,e,t,n){return Oa(s,e,1-Math.exp(-t*n))}function _p(s,e=1){return e-Math.abs(lh(s,e*2)-e)}function bp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Ep(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function xp(s,e){return s+Math.floor(Math.random()*(e-s+1))}function yp(s,e){return s+Math.random()*(e-s)}function vp(s){return s*(.5-Math.random())}function Mp(s){s!==void 0&&(Gu=s);let e=Gu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Sp(s){return s*Ua}function Cp(s){return s*qr}function Tl(s){return(s&s-1)===0&&s!==0}function wp(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function sc(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ip(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),f=a((e-n)/2),A=r((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*u,c*f,o*l);break;case"YZY":s.set(c*f,o*h,c*u,o*l);break;case"ZXZ":s.set(c*u,c*f,o*h,o*l);break;case"XZX":s.set(o*h,c*m,c*A,o*l);break;case"YXY":s.set(c*A,o*h,c*m,o*l);break;case"ZYZ":s.set(c*m,c*A,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ki(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function sn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var id={DEG2RAD:Ua,RAD2DEG:qr,generateUUID:Gi,clamp:Qn,euclideanModulo:lh,mapLinear:pp,inverseLerp:mp,lerp:Oa,damp:gp,pingpong:_p,smoothstep:bp,smootherstep:Ep,randInt:xp,randFloat:yp,randFloatSpread:vp,seededRandom:Mp,degToRad:Sp,radToDeg:Cp,isPowerOfTwo:Tl,ceilPowerOfTwo:wp,floorPowerOfTwo:sc,setQuaternionFromProperEuler:Ip,normalize:sn,denormalize:Ki},Ze=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Lt=class s{constructor(e,t,n,i,r,a,o,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],A=n[5],m=n[8],b=i[0],p=i[3],d=i[6],M=i[1],y=i[4],B=i[7],O=i[2],P=i[5],N=i[8];return r[0]=a*b+o*M+c*O,r[3]=a*p+o*y+c*P,r[6]=a*d+o*B+c*N,r[1]=l*b+h*M+u*O,r[4]=l*p+h*y+u*P,r[7]=l*d+h*B+u*N,r[2]=f*b+A*M+m*O,r[5]=f*p+A*y+m*P,r[8]=f*d+A*B+m*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,f=o*c-h*r,A=l*r-a*c,m=t*u+n*f+i*A;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/m;return e[0]=u*b,e[1]=(i*l-h*n)*b,e[2]=(o*n-i*a)*b,e[3]=f*b,e[4]=(h*t-i*c)*b,e[5]=(i*r-o*t)*b,e[6]=A*b,e[7]=(n*c-l*t)*b,e[8]=(a*t-n*r)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Jc.makeScale(e,t)),this}rotate(e){return this.premultiply(Jc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Jc=new Lt;function sd(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Va(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Tp(){let s=Va("canvas");return s.style.display="block",s}var Hu={};function ka(s){s in Hu||(Hu[s]=!0,console.warn(s))}var zu=new Lt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Vu=new Lt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ao={[bn]:{transfer:ec,primaries:tc,toReference:s=>s,fromReference:s=>s},[Pt]:{transfer:mn,primaries:tc,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[aa]:{transfer:ec,primaries:nc,toReference:s=>s.applyMatrix3(Vu),fromReference:s=>s.applyMatrix3(zu)},[no]:{transfer:mn,primaries:nc,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Vu),fromReference:s=>s.applyMatrix3(zu).convertLinearToSRGB()}},Rp=new Set([bn,aa]),jt={enabled:!0,_workingColorSpace:bn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Rp.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=Ao[e].toReference,i=Ao[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Ao[s].primaries},getTransfer:function(s){return s===Hn?ec:Ao[s].transfer}};function Hr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function jc(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var gr,rc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{gr===void 0&&(gr=Va("canvas")),gr.width=e.width,gr.height=e.height;let n=gr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=gr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=Va("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Hr(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Hr(t[n]/255)*255):t[n]=Hr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Bp=0,ac=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Gi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Zc(i[a].image)):r.push(Zc(i[a]))}else r=Zc(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Zc(s){return typeof HTMLImageElement!="undefined"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&s instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&s instanceof ImageBitmap?rc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Dp=0,Wn=class s extends cs{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Gn,i=Gn,r=qt,a=Zn,o=Cn,c=Bn,l=s.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Dp++}),this.uuid=Gi(),this.name="",this.source=new ac(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ka("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===js?Pt:Hn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==qf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ai:e.x=e.x-Math.floor(e.x);break;case Gn:e.x=e.x<0?0:1;break;case Ha:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ai:e.y=e.y-Math.floor(e.y);break;case Gn:e.y=e.y<0?0:1;break;case Ha:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ka("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Pt?js:td}set encoding(e){ka("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===js?Pt:Hn}};Wn.DEFAULT_IMAGE=null;Wn.DEFAULT_MAPPING=qf;Wn.DEFAULT_ANISOTROPY=1;var Rt=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],A=c[5],m=c[9],b=c[2],p=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-b)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+b)<.1&&Math.abs(m+p)<.1&&Math.abs(l+A+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,B=(A+1)/2,O=(d+1)/2,P=(h+f)/4,N=(u+b)/4,H=(m+p)/4;return y>B&&y>O?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=P/n,r=N/n):B>O?B<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(B),n=P/i,r=H/i):O<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(O),n=N/r,i=H/r),this.set(n,i,r,t),this}let M=Math.sqrt((p-m)*(p-m)+(u-b)*(u-b)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(p-m)/M,this.y=(u-b)/M,this.z=(f-h)/M,this.w=Math.acos((l+A+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Rl=class extends cs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(ka("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===js?Pt:Hn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Wn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new ac(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ai=class extends Rl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},oc=class extends Wn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Wa=class extends Wn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Vn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],f=r[a+0],A=r[a+1],m=r[a+2],b=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=A,e[t+2]=m,e[t+3]=b;return}if(u!==b||c!==f||l!==A||h!==m){let p=1-o,d=c*f+l*A+h*m+u*b,M=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){let O=Math.sqrt(y),P=Math.atan2(O,d*M);p=Math.sin(p*P)/O,o=Math.sin(o*P)/O}let B=o*M;if(c=c*p+f*B,l=l*p+A*B,h=h*p+m*B,u=u*p+b*B,p===1-o){let O=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=O,l*=O,h*=O,u*=O}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[a],f=r[a+1],A=r[a+2],m=r[a+3];return e[t]=o*m+h*u+c*A-l*f,e[t+1]=c*m+h*f+l*u-o*A,e[t+2]=l*m+h*A+o*f-c*u,e[t+3]=h*m-o*u-c*f-l*A,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(r/2),f=c(n/2),A=c(i/2),m=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*A*m,this._y=l*A*u-f*h*m,this._z=l*h*m+f*A*u,this._w=l*h*u-f*A*m;break;case"YXZ":this._x=f*h*u+l*A*m,this._y=l*A*u-f*h*m,this._z=l*h*m-f*A*u,this._w=l*h*u+f*A*m;break;case"ZXY":this._x=f*h*u-l*A*m,this._y=l*A*u+f*h*m,this._z=l*h*m+f*A*u,this._w=l*h*u-f*A*m;break;case"ZYX":this._x=f*h*u-l*A*m,this._y=l*A*u+f*h*m,this._z=l*h*m-f*A*u,this._w=l*h*u+f*A*m;break;case"YZX":this._x=f*h*u+l*A*m,this._y=l*A*u+f*h*m,this._z=l*h*m-f*A*u,this._w=l*h*u-f*A*m;break;case"XZY":this._x=f*h*u-l*A*m,this._y=l*A*u-f*h*m,this._z=l*h*m+f*A*u,this._w=l*h*u+f*A*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+o+u;if(f>0){let A=.5/Math.sqrt(f+1);this._w=.25/A,this._x=(h-c)*A,this._y=(r-l)*A,this._z=(a-i)*A}else if(n>o&&n>u){let A=2*Math.sqrt(1+n-o-u);this._w=(h-c)/A,this._x=.25*A,this._y=(i+a)/A,this._z=(r+l)/A}else if(o>u){let A=2*Math.sqrt(1+o-n-u);this._w=(r-l)/A,this._x=(i+a)/A,this._y=.25*A,this._z=(c+h)/A}else{let A=2*Math.sqrt(1+u-n-o);this._w=(a-i)/A,this._x=(r+l)/A,this._y=(c+h)/A,this._z=.25*A}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qn(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let A=1-t;return this._w=A*a+t*this._w,this._x=A*n+t*this._x,this._y=A*i+t*this._y,this._z=A*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},G=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=i+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return $c.copy(this).projectOnVector(e),this.sub($c)}reflect(e){return this.sub($c.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},$c=new G,Wu=new Vn,Ii=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Oi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Oi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Oi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Oi):Oi.fromBufferAttribute(r,a),Oi.applyMatrix4(e.matrixWorld),this.expandByPoint(Oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),po.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),po.copy(n.boundingBox)),po.applyMatrix4(e.matrixWorld),this.union(po)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Oi),Oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(va),mo.subVectors(this.max,va),_r.subVectors(e.a,va),br.subVectors(e.b,va),Er.subVectors(e.c,va),ms.subVectors(br,_r),gs.subVectors(Er,br),Gs.subVectors(_r,Er);let t=[0,-ms.z,ms.y,0,-gs.z,gs.y,0,-Gs.z,Gs.y,ms.z,0,-ms.x,gs.z,0,-gs.x,Gs.z,0,-Gs.x,-ms.y,ms.x,0,-gs.y,gs.x,0,-Gs.y,Gs.x,0];return!el(t,_r,br,Er,mo)||(t=[1,0,0,0,1,0,0,0,1],!el(t,_r,br,Er,mo))?!1:(go.crossVectors(ms,gs),t=[go.x,go.y,go.z],el(t,_r,br,Er,mo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Zi=[new G,new G,new G,new G,new G,new G,new G,new G],Oi=new G,po=new Ii,_r=new G,br=new G,Er=new G,ms=new G,gs=new G,Gs=new G,va=new G,mo=new G,go=new G,Hs=new G;function el(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Hs.fromArray(s,r);let o=i.x*Math.abs(Hs.x)+i.y*Math.abs(Hs.y)+i.z*Math.abs(Hs.z),c=e.dot(Hs),l=t.dot(Hs),h=n.dot(Hs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Lp=new Ii,Ma=new G,tl=new G,yn=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Lp.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ma.subVectors(e,this.center);let t=Ma.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ma,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(tl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ma.copy(e.center).add(tl)),this.expandByPoint(Ma.copy(e.center).sub(tl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},$i=new G,nl=new G,_o=new G,_s=new G,il=new G,bo=new G,sl=new G,Xr=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=$i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($i.copy(this.origin).addScaledVector(this.direction,t),$i.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){nl.copy(e).add(t).multiplyScalar(.5),_o.copy(t).sub(e).normalize(),_s.copy(this.origin).sub(nl);let r=e.distanceTo(t)*.5,a=-this.direction.dot(_o),o=_s.dot(this.direction),c=-_s.dot(_o),l=_s.lengthSq(),h=Math.abs(1-a*a),u,f,A,m;if(h>0)if(u=a*c-o,f=a*o-c,m=r*h,u>=0)if(f>=-m)if(f<=m){let b=1/h;u*=b,f*=b,A=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),A=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),A=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),A=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),A=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),A=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),A=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(nl).addScaledVector(_o,f),A}intersectSphere(e,t){$i.subVectors(e.center,this.origin);let n=$i.dot(this.direction),i=$i.dot($i)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,$i)!==null}intersectTriangle(e,t,n,i,r){il.subVectors(t,e),bo.subVectors(n,e),sl.crossVectors(il,bo);let a=this.direction.dot(sl),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_s.subVectors(this.origin,e);let c=o*this.direction.dot(bo.crossVectors(_s,bo));if(c<0)return null;let l=o*this.direction.dot(il.cross(_s));if(l<0||c+l>a)return null;let h=-o*_s.dot(sl);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ct=class s{constructor(e,t,n,i,r,a,o,c,l,h,u,f,A,m,b,p){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,u,f,A,m,b,p)}set(e,t,n,i,r,a,o,c,l,h,u,f,A,m,b,p){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=i,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=A,d[7]=m,d[11]=b,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/xr.setFromMatrixColumn(e,0).length(),r=1/xr.setFromMatrixColumn(e,1).length(),a=1/xr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=a*h,A=a*u,m=o*h,b=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=A+m*l,t[5]=f-b*l,t[9]=-o*c,t[2]=b-f*l,t[6]=m+A*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*h,A=c*u,m=l*h,b=l*u;t[0]=f+b*o,t[4]=m*o-A,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=A*o-m,t[6]=b+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*h,A=c*u,m=l*h,b=l*u;t[0]=f-b*o,t[4]=-a*u,t[8]=m+A*o,t[1]=A+m*o,t[5]=a*h,t[9]=b-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*h,A=a*u,m=o*h,b=o*u;t[0]=c*h,t[4]=m*l-A,t[8]=f*l+b,t[1]=c*u,t[5]=b*l+f,t[9]=A*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,A=a*l,m=o*c,b=o*l;t[0]=c*h,t[4]=b-f*u,t[8]=m*u+A,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=A*u+m,t[10]=f-b*u}else if(e.order==="XZY"){let f=a*c,A=a*l,m=o*c,b=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+b,t[5]=a*h,t[9]=A*u-m,t[2]=m*u-A,t[6]=o*h,t[10]=b*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Pp,e,Fp)}lookAt(e,t,n){let i=this.elements;return xi.subVectors(e,t),xi.lengthSq()===0&&(xi.z=1),xi.normalize(),bs.crossVectors(n,xi),bs.lengthSq()===0&&(Math.abs(n.z)===1?xi.x+=1e-4:xi.z+=1e-4,xi.normalize(),bs.crossVectors(n,xi)),bs.normalize(),Eo.crossVectors(xi,bs),i[0]=bs.x,i[4]=Eo.x,i[8]=xi.x,i[1]=bs.y,i[5]=Eo.y,i[9]=xi.y,i[2]=bs.z,i[6]=Eo.z,i[10]=xi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],A=n[13],m=n[2],b=n[6],p=n[10],d=n[14],M=n[3],y=n[7],B=n[11],O=n[15],P=i[0],N=i[4],H=i[8],v=i[12],D=i[1],J=i[5],Z=i[9],ue=i[13],k=i[2],Y=i[6],$=i[10],fe=i[14],Ae=i[3],pe=i[7],be=i[11],Me=i[15];return r[0]=a*P+o*D+c*k+l*Ae,r[4]=a*N+o*J+c*Y+l*pe,r[8]=a*H+o*Z+c*$+l*be,r[12]=a*v+o*ue+c*fe+l*Me,r[1]=h*P+u*D+f*k+A*Ae,r[5]=h*N+u*J+f*Y+A*pe,r[9]=h*H+u*Z+f*$+A*be,r[13]=h*v+u*ue+f*fe+A*Me,r[2]=m*P+b*D+p*k+d*Ae,r[6]=m*N+b*J+p*Y+d*pe,r[10]=m*H+b*Z+p*$+d*be,r[14]=m*v+b*ue+p*fe+d*Me,r[3]=M*P+y*D+B*k+O*Ae,r[7]=M*N+y*J+B*Y+O*pe,r[11]=M*H+y*Z+B*$+O*be,r[15]=M*v+y*ue+B*fe+O*Me,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],A=e[14],m=e[3],b=e[7],p=e[11],d=e[15];return m*(+r*c*u-i*l*u-r*o*f+n*l*f+i*o*A-n*c*A)+b*(+t*c*A-t*l*f+r*a*f-i*a*A+i*l*h-r*c*h)+p*(+t*l*u-t*o*A-r*a*u+n*a*A+r*o*h-n*l*h)+d*(-i*o*h-t*c*u+t*o*f+i*a*u-n*a*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],A=e[11],m=e[12],b=e[13],p=e[14],d=e[15],M=u*p*l-b*f*l+b*c*A-o*p*A-u*c*d+o*f*d,y=m*f*l-h*p*l-m*c*A+a*p*A+h*c*d-a*f*d,B=h*b*l-m*u*l+m*o*A-a*b*A-h*o*d+a*u*d,O=m*u*c-h*b*c-m*o*f+a*b*f+h*o*p-a*u*p,P=t*M+n*y+i*B+r*O;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/P;return e[0]=M*N,e[1]=(b*f*r-u*p*r-b*i*A+n*p*A+u*i*d-n*f*d)*N,e[2]=(o*p*r-b*c*r+b*i*l-n*p*l-o*i*d+n*c*d)*N,e[3]=(u*c*r-o*f*r-u*i*l+n*f*l+o*i*A-n*c*A)*N,e[4]=y*N,e[5]=(h*p*r-m*f*r+m*i*A-t*p*A-h*i*d+t*f*d)*N,e[6]=(m*c*r-a*p*r-m*i*l+t*p*l+a*i*d-t*c*d)*N,e[7]=(a*f*r-h*c*r+h*i*l-t*f*l-a*i*A+t*c*A)*N,e[8]=B*N,e[9]=(m*u*r-h*b*r-m*n*A+t*b*A+h*n*d-t*u*d)*N,e[10]=(a*b*r-m*o*r+m*n*l-t*b*l-a*n*d+t*o*d)*N,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*A-t*o*A)*N,e[12]=O*N,e[13]=(h*b*i-m*u*i+m*n*f-t*b*f-h*n*p+t*u*p)*N,e[14]=(m*o*i-a*b*i-m*n*c+t*b*c+a*n*p-t*o*p)*N,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*f+t*o*f)*N,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,f=r*l,A=r*h,m=r*u,b=a*h,p=a*u,d=o*u,M=c*l,y=c*h,B=c*u,O=n.x,P=n.y,N=n.z;return i[0]=(1-(b+d))*O,i[1]=(A+B)*O,i[2]=(m-y)*O,i[3]=0,i[4]=(A-B)*P,i[5]=(1-(f+d))*P,i[6]=(p+M)*P,i[7]=0,i[8]=(m+y)*N,i[9]=(p-M)*N,i[10]=(1-(f+b))*N,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=xr.set(i[0],i[1],i[2]).length(),a=xr.set(i[4],i[5],i[6]).length(),o=xr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],ki.copy(this);let l=1/r,h=1/a,u=1/o;return ki.elements[0]*=l,ki.elements[1]*=l,ki.elements[2]*=l,ki.elements[4]*=h,ki.elements[5]*=h,ki.elements[6]*=h,ki.elements[8]*=u,ki.elements[9]*=u,ki.elements[10]*=u,t.setFromRotationMatrix(ki),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=os){let c=this.elements,l=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),A,m;if(o===os)A=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===ic)A=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=A,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=os){let c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(a-r),f=(t+e)*l,A=(n+i)*h,m,b;if(o===os)m=(a+r)*u,b=-2*u;else if(o===ic)m=r*u,b=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-A,c[2]=0,c[6]=0,c[10]=b,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},xr=new G,ki=new ct,Pp=new G(0,0,0),Fp=new G(1,1,1),bs=new G,Eo=new G,xi=new G,Ku=new ct,qu=new Vn,Yr=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],f=i[6],A=i[10];switch(t){case"XYZ":this._y=Math.asin(Qn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,A),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,A),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,A),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,A),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Qn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,A));break;case"XZY":this._z=Math.asin(-Qn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,A),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ku.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ku,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return qu.setFromEuler(this),this.setFromQuaternion(qu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yr.DEFAULT_ORDER="XYZ";var cc=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Np=0,Xu=new G,yr=new Vn,es=new ct,xo=new G,Sa=new G,Up=new G,Op=new Vn,Yu=new G(1,0,0),Ju=new G(0,1,0),ju=new G(0,0,1),kp={type:"added"},Qp={type:"removed"},ln=class s extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=Gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new G,t=new Yr,n=new Vn,i=new G(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ct},normalMatrix:{value:new Lt}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yr.setFromAxisAngle(e,t),this.quaternion.multiply(yr),this}rotateOnWorldAxis(e,t){return yr.setFromAxisAngle(e,t),this.quaternion.premultiply(yr),this}rotateX(e){return this.rotateOnAxis(Yu,e)}rotateY(e){return this.rotateOnAxis(Ju,e)}rotateZ(e){return this.rotateOnAxis(ju,e)}translateOnAxis(e,t){return Xu.copy(e).applyQuaternion(this.quaternion),this.position.add(Xu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yu,e)}translateY(e){return this.translateOnAxis(Ju,e)}translateZ(e){return this.translateOnAxis(ju,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(es.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xo.copy(e):xo.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Sa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?es.lookAt(Sa,xo,this.up):es.lookAt(xo,Sa,this.up),this.quaternion.setFromRotationMatrix(es),i&&(es.extractRotation(i.matrixWorld),yr.setFromRotationMatrix(es),this.quaternion.premultiply(yr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(kp)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qp)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),es.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),es.multiply(e.parent.matrixWorld)),e.applyMatrix4(es),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sa,e,Up),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sa,Op,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,a=i.length;r<a;r++){let o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),A=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),A.length>0&&(n.animations=A),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};ln.DEFAULT_UP=new G(0,1,0);ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Qi=new G,ts=new G,rl=new G,ns=new G,vr=new G,Mr=new G,Zu=new G,al=new G,ol=new G,cl=new G,yo=!1,Xs=class s{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Qi.subVectors(e,t),i.cross(Qi);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Qi.subVectors(i,t),ts.subVectors(n,t),rl.subVectors(e,t);let a=Qi.dot(Qi),o=Qi.dot(ts),c=Qi.dot(rl),l=ts.dot(ts),h=ts.dot(rl),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,A=(l*c-o*h)*f,m=(a*h-o*c)*f;return r.set(1-A-m,m,A)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ns)===null?!1:ns.x>=0&&ns.y>=0&&ns.x+ns.y<=1}static getUV(e,t,n,i,r,a,o,c){return yo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),yo=!0),this.getInterpolation(e,t,n,i,r,a,o,c)}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,ns)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ns.x),c.addScaledVector(a,ns.y),c.addScaledVector(o,ns.z),c)}static isFrontFacing(e,t,n,i){return Qi.subVectors(n,t),ts.subVectors(e,t),Qi.cross(ts).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qi.subVectors(this.c,this.b),ts.subVectors(this.a,this.b),Qi.cross(ts).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return yo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),yo=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;vr.subVectors(i,n),Mr.subVectors(r,n),al.subVectors(e,n);let c=vr.dot(al),l=Mr.dot(al);if(c<=0&&l<=0)return t.copy(n);ol.subVectors(e,i);let h=vr.dot(ol),u=Mr.dot(ol);if(h>=0&&u<=h)return t.copy(i);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(vr,a);cl.subVectors(e,r);let A=vr.dot(cl),m=Mr.dot(cl);if(m>=0&&A<=m)return t.copy(r);let b=A*l-c*m;if(b<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Mr,o);let p=h*m-A*u;if(p<=0&&u-h>=0&&A-m>=0)return Zu.subVectors(r,i),o=(u-h)/(u-h+(A-m)),t.copy(i).addScaledVector(Zu,o);let d=1/(p+b+f);return a=b*d,o=f*d,t.copy(n).addScaledVector(vr,a).addScaledVector(Mr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},rd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Es={h:0,s:0,l:0},vo={h:0,s:0,l:0};function ll(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var We=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,jt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=jt.workingColorSpace){return this.r=e,this.g=t,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=jt.workingColorSpace){if(e=lh(e,1),t=Qn(t,0,1),n=Qn(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ll(a,r,e+1/3),this.g=ll(a,r,e),this.b=ll(a,r,e-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(e,t=Pt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pt){let n=rd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hr(e.r),this.g=Hr(e.g),this.b=Hr(e.b),this}copyLinearToSRGB(e){return this.r=jc(e.r),this.g=jc(e.g),this.b=jc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pt){return jt.fromWorkingColorSpace(jn.copy(this),e),Math.round(Qn(jn.r*255,0,255))*65536+Math.round(Qn(jn.g*255,0,255))*256+Math.round(Qn(jn.b*255,0,255))}getHexString(e=Pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=jt.workingColorSpace){jt.fromWorkingColorSpace(jn.copy(this),t);let n=jn.r,i=jn.g,r=jn.b,a=Math.max(n,i,r),o=Math.min(n,i,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=jt.workingColorSpace){return jt.fromWorkingColorSpace(jn.copy(this),t),e.r=jn.r,e.g=jn.g,e.b=jn.b,e}getStyle(e=Pt){jt.fromWorkingColorSpace(jn.copy(this),e);let t=jn.r,n=jn.g,i=jn.b;return e!==Pt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Es),this.setHSL(Es.h+e,Es.s+t,Es.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Es),e.getHSL(vo);let n=Oa(Es.h,vo.h,t),i=Oa(Es.s,vo.s,t),r=Oa(Es.l,vo.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},jn=new We;We.NAMES=rd;var Gp=0,ci=class extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=Gi(),this.name="",this.type="Material",this.blending=Gr,this.side=qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ml,this.blendDst=Sl,this.blendEquation=Ks,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=Ko,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ku,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mr,this.stencilZFail=mr,this.stencilZPass=mr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gr&&(n.blending=this.blending),this.side!==qi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ml&&(n.blendSrc=this.blendSrc),this.blendDst!==Sl&&(n.blendDst=this.blendDst),this.blendEquation!==Ks&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ko&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ku&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},rn=class extends ci{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=sh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},as=Hp();function Hp(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,i[c]=-l-1,i[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,i[c]=13,i[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}let r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(l&8388608);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:a,offsetTable:o}}function zp(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=Qn(s,-65504,65504),as.floatView[0]=s;let e=as.uint32View[0],t=e>>23&511;return as.baseTable[t]+((e&8388607)>>as.shiftTable[t])}function Vp(s){let e=s>>10;return as.uint32View[0]=as.mantissaTable[as.offsetTable[e]+(s&1023)]+as.exponentTable[e],as.floatView[0]}var io={toHalfFloat:zp,fromHalfFloat:Vp},Rn=new G,Mo=new Ze,Ft=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=wl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Mo.fromBufferAttribute(this,t),Mo.applyMatrix3(e),this.setXY(t,Mo.x,Mo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rn.fromBufferAttribute(this,t),Rn.applyMatrix3(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rn.fromBufferAttribute(this,t),Rn.applyMatrix4(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rn.fromBufferAttribute(this,t),Rn.applyNormalMatrix(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rn.fromBufferAttribute(this,t),Rn.transformDirection(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ki(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=sn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),i=sn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),i=sn(i,this.array),r=sn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wl&&(e.usage=this.usage),e}};var Jr=class extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var lc=class extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ut=class extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}};var Wp=0,wi=new ct,hl=new ln,Sr=new G,yi=new Ii,Ca=new Ii,kn=new G,an=class s extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wp++}),this.uuid=Gi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(sd(e)?lc:Jr)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return wi.makeRotationFromQuaternion(e),this.applyMatrix4(wi),this}rotateX(e){return wi.makeRotationX(e),this.applyMatrix4(wi),this}rotateY(e){return wi.makeRotationY(e),this.applyMatrix4(wi),this}rotateZ(e){return wi.makeRotationZ(e),this.applyMatrix4(wi),this}translate(e,t,n){return wi.makeTranslation(e,t,n),this.applyMatrix4(wi),this}scale(e,t,n){return wi.makeScale(e,t,n),this.applyMatrix4(wi),this}lookAt(e){return hl.lookAt(e),hl.updateMatrix(),this.applyMatrix4(hl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Sr).negate(),this.translate(Sr.x,Sr.y,Sr.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ut(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ii);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];yi.setFromBufferAttribute(r),this.morphTargetsRelative?(kn.addVectors(this.boundingBox.min,yi.min),this.boundingBox.expandByPoint(kn),kn.addVectors(this.boundingBox.max,yi.max),this.boundingBox.expandByPoint(kn)):(this.boundingBox.expandByPoint(yi.min),this.boundingBox.expandByPoint(yi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new G,1/0);return}if(e){let n=this.boundingSphere.center;if(yi.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ca.setFromBufferAttribute(o),this.morphTargetsRelative?(kn.addVectors(yi.min,Ca.min),yi.expandByPoint(kn),kn.addVectors(yi.max,Ca.max),yi.expandByPoint(kn)):(yi.expandByPoint(Ca.min),yi.expandByPoint(Ca.max))}yi.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)kn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(kn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)kn.fromBufferAttribute(o,l),c&&(Sr.fromBufferAttribute(e,l),kn.add(Sr)),i=Math.max(i,n.distanceToSquared(kn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ft(new Float32Array(4*o),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let D=0;D<o;D++)l[D]=new G,h[D]=new G;let u=new G,f=new G,A=new G,m=new Ze,b=new Ze,p=new Ze,d=new G,M=new G;function y(D,J,Z){u.fromArray(i,D*3),f.fromArray(i,J*3),A.fromArray(i,Z*3),m.fromArray(a,D*2),b.fromArray(a,J*2),p.fromArray(a,Z*2),f.sub(u),A.sub(u),b.sub(m),p.sub(m);let ue=1/(b.x*p.y-p.x*b.y);isFinite(ue)&&(d.copy(f).multiplyScalar(p.y).addScaledVector(A,-b.y).multiplyScalar(ue),M.copy(A).multiplyScalar(b.x).addScaledVector(f,-p.x).multiplyScalar(ue),l[D].add(d),l[J].add(d),l[Z].add(d),h[D].add(M),h[J].add(M),h[Z].add(M))}let B=this.groups;B.length===0&&(B=[{start:0,count:n.length}]);for(let D=0,J=B.length;D<J;++D){let Z=B[D],ue=Z.start,k=Z.count;for(let Y=ue,$=ue+k;Y<$;Y+=3)y(n[Y+0],n[Y+1],n[Y+2])}let O=new G,P=new G,N=new G,H=new G;function v(D){N.fromArray(r,D*3),H.copy(N);let J=l[D];O.copy(J),O.sub(N.multiplyScalar(N.dot(J))).normalize(),P.crossVectors(H,J);let ue=P.dot(h[D])<0?-1:1;c[D*4]=O.x,c[D*4+1]=O.y,c[D*4+2]=O.z,c[D*4+3]=ue}for(let D=0,J=B.length;D<J;++D){let Z=B[D],ue=Z.start,k=Z.count;for(let Y=ue,$=ue+k;Y<$;Y+=3)v(n[Y+0]),v(n[Y+1]),v(n[Y+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,A=n.count;f<A;f++)n.setXYZ(f,0,0,0);let i=new G,r=new G,a=new G,o=new G,c=new G,l=new G,h=new G,u=new G;if(e)for(let f=0,A=e.count;f<A;f+=3){let m=e.getX(f+0),b=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,b),a.fromBufferAttribute(t,p),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,A=t.count;f<A;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kn.fromBufferAttribute(e,t),kn.normalize(),e.setXYZ(t,kn.x,kn.y,kn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),A=0,m=0;for(let b=0,p=c.length;b<p;b++){o.isInterleavedBufferAttribute?A=c[b]*o.data.stride+o.offset:A=c[b]*h;for(let d=0;d<h;d++)f[m++]=l[A++]}return new Ft(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],A=e(f,n);c.push(A)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let A=l[u];h.push(A.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,A=u.length;f<A;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},$u=new ct,zs=new Xr,So=new yn,ef=new G,Cr=new G,wr=new G,Ir=new G,ul=new G,Co=new G,wo=new Ze,Io=new Ze,To=new Ze,tf=new G,nf=new G,sf=new G,Ro=new G,Bo=new G,ze=class extends ln{constructor(e=new an,t=new rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){Co.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(ul.fromBufferAttribute(u,e),a?Co.addScaledVector(ul,h):Co.addScaledVector(ul.sub(t),h))}t.add(Co)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),So.copy(n.boundingSphere),So.applyMatrix4(r),zs.copy(e.ray).recast(e.near),!(So.containsPoint(zs.origin)===!1&&(zs.intersectSphere(So,ef)===null||zs.origin.distanceToSquared(ef)>(e.far-e.near)**2))&&($u.copy(r).invert(),zs.copy(e.ray).applyMatrix4($u),!(n.boundingBox!==null&&zs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zs)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,A=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,b=f.length;m<b;m++){let p=f[m],d=a[p.materialIndex],M=Math.max(p.start,A.start),y=Math.min(o.count,Math.min(p.start+p.count,A.start+A.count));for(let B=M,O=y;B<O;B+=3){let P=o.getX(B),N=o.getX(B+1),H=o.getX(B+2);i=Do(this,d,e,n,l,h,u,P,N,H),i&&(i.faceIndex=Math.floor(B/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let m=Math.max(0,A.start),b=Math.min(o.count,A.start+A.count);for(let p=m,d=b;p<d;p+=3){let M=o.getX(p),y=o.getX(p+1),B=o.getX(p+2);i=Do(this,a,e,n,l,h,u,M,y,B),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,b=f.length;m<b;m++){let p=f[m],d=a[p.materialIndex],M=Math.max(p.start,A.start),y=Math.min(c.count,Math.min(p.start+p.count,A.start+A.count));for(let B=M,O=y;B<O;B+=3){let P=B,N=B+1,H=B+2;i=Do(this,d,e,n,l,h,u,P,N,H),i&&(i.faceIndex=Math.floor(B/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let m=Math.max(0,A.start),b=Math.min(c.count,A.start+A.count);for(let p=m,d=b;p<d;p+=3){let M=p,y=p+1,B=p+2;i=Do(this,a,e,n,l,h,u,M,y,B),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}};function Kp(s,e,t,n,i,r,a,o){let c;if(e.side===Fn?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===qi,o),c===null)return null;Bo.copy(o),Bo.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Bo);return l<t.near||l>t.far?null:{distance:l,point:Bo.clone(),object:s}}function Do(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,Cr),s.getVertexPosition(c,wr),s.getVertexPosition(l,Ir);let h=Kp(s,e,t,n,Cr,wr,Ir,Ro);if(h){i&&(wo.fromBufferAttribute(i,o),Io.fromBufferAttribute(i,c),To.fromBufferAttribute(i,l),h.uv=Xs.getInterpolation(Ro,Cr,wr,Ir,wo,Io,To,new Ze)),r&&(wo.fromBufferAttribute(r,o),Io.fromBufferAttribute(r,c),To.fromBufferAttribute(r,l),h.uv1=Xs.getInterpolation(Ro,Cr,wr,Ir,wo,Io,To,new Ze),h.uv2=h.uv1),a&&(tf.fromBufferAttribute(a,o),nf.fromBufferAttribute(a,c),sf.fromBufferAttribute(a,l),h.normal=Xs.getInterpolation(Ro,Cr,wr,Ir,tf,nf,sf,new G),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new G,materialIndex:0};Xs.getNormal(Cr,wr,Ir,u.normal),h.face=u}return h}var un=class s extends an{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,A=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Ut(l,3)),this.setAttribute("normal",new Ut(h,3)),this.setAttribute("uv",new Ut(u,2));function m(b,p,d,M,y,B,O,P,N,H,v){let D=B/N,J=O/H,Z=B/2,ue=O/2,k=P/2,Y=N+1,$=H+1,fe=0,Ae=0,pe=new G;for(let be=0;be<$;be++){let Me=be*J-ue;for(let Le=0;Le<Y;Le++){let ce=Le*D-Z;pe[b]=ce*M,pe[p]=Me*y,pe[d]=k,l.push(pe.x,pe.y,pe.z),pe[b]=0,pe[p]=0,pe[d]=P>0?1:-1,h.push(pe.x,pe.y,pe.z),u.push(Le/N),u.push(1-be/H),fe+=1}}for(let be=0;be<H;be++)for(let Me=0;Me<N;Me++){let Le=f+Me+Y*be,ce=f+Me+Y*(be+1),ve=f+(Me+1)+Y*(be+1),Ve=f+(Me+1)+Y*be;c.push(Le,ce,Ve),c.push(ce,ve,Ve),Ae+=6}o.addGroup(A,Ae,v),A+=Ae,f+=fe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function jr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function ri(s){let e={};for(let t=0;t<s.length;t++){let n=jr(s[t]);for(let i in n)e[i]=n[i]}return e}function qp(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function ad(s){return s.getRenderTarget()===null?s.outputColorSpace:jt.workingColorSpace}var Xp={clone:jr,merge:ri},Yp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$n=class extends ci{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yp,this.fragmentShader=Jp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=jr(e.uniforms),this.uniformsGroups=qp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},hc=class extends ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=os}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},_n=class extends hc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=qr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ua*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qr*2*Math.atan(Math.tan(Ua*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ua*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Tr=-90,Rr=1,Bl=class extends ln{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new _n(Tr,Rr,e,t);i.layers=this.layers,this.add(i);let r=new _n(Tr,Rr,e,t);r.layers=this.layers,this.add(r);let a=new _n(Tr,Rr,e,t);a.layers=this.layers,this.add(a);let o=new _n(Tr,Rr,e,t);o.layers=this.layers,this.add(o);let c=new _n(Tr,Rr,e,t);c.layers=this.layers,this.add(c);let l=new _n(Tr,Rr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===os)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ic)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),A=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,f,A),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},uc=class extends Wn{constructor(e,t,n,i,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Zs,super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dl=class extends Ai{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(ka("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===js?Pt:Hn),this.texture=new uc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:qt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new un(5,5,5),r=new $n({name:"CubemapFromEquirect",uniforms:jr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fn,blending:vs});r.uniforms.tEquirect.value=t;let a=new ze(i,r),o=t.minFilter;return t.minFilter===Zn&&(t.minFilter=qt),new Bl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}},fl=new G,jp=new G,Zp=new Lt,rs=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=fl.subVectors(n,t).cross(jp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(fl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Zp.getNormalMatrix(e),i=this.coplanarPoint(fl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Vs=new yn,Lo=new G,Ka=class{constructor(e=new rs,t=new rs,n=new rs,i=new rs,r=new rs,a=new rs){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=os){let n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],h=i[5],u=i[6],f=i[7],A=i[8],m=i[9],b=i[10],p=i[11],d=i[12],M=i[13],y=i[14],B=i[15];if(n[0].setComponents(c-r,f-l,p-A,B-d).normalize(),n[1].setComponents(c+r,f+l,p+A,B+d).normalize(),n[2].setComponents(c+a,f+h,p+m,B+M).normalize(),n[3].setComponents(c-a,f-h,p-m,B-M).normalize(),n[4].setComponents(c-o,f-u,p-b,B-y).normalize(),t===os)n[5].setComponents(c+o,f+u,p+b,B+y).normalize();else if(t===ic)n[5].setComponents(o,u,b,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vs)}intersectsSprite(e){return Vs.center.set(0,0,0),Vs.radius=.7071067811865476,Vs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vs)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Lo.x=i.normal.x>0?e.max.x:e.min.x,Lo.y=i.normal.y>0?e.max.y:e.min.y,Lo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Lo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function od(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function $p(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,h){let u=l.array,f=l.usage,A=u.byteLength,m=s.createBuffer();s.bindBuffer(h,m),s.bufferData(h,u,f),l.onUploadCallback();let b;if(u instanceof Float32Array)b=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)b=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else b=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)b=s.SHORT;else if(u instanceof Uint32Array)b=s.UNSIGNED_INT;else if(u instanceof Int32Array)b=s.INT;else if(u instanceof Int8Array)b=s.BYTE;else if(u instanceof Uint8Array)b=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)b=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:b,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:A}}function r(l,h,u){let f=h.array,A=h._updateRange,m=h.updateRanges;if(s.bindBuffer(u,l),A.count===-1&&m.length===0&&s.bufferSubData(u,0,f),m.length!==0){for(let b=0,p=m.length;b<p;b++){let d=m[b];t?s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}A.count!==-1&&(t?s.bufferSubData(u,A.offset*f.BYTES_PER_ELEMENT,f,A.offset,A.count):s.bufferSubData(u,A.offset*f.BYTES_PER_ELEMENT,f.subarray(A.offset,A.offset+A.count)),A.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:a,remove:o,update:c}}var ei=class s extends an{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,f=t/c,A=[],m=[],b=[],p=[];for(let d=0;d<h;d++){let M=d*f-a;for(let y=0;y<l;y++){let B=y*u-r;m.push(B,-M,0),b.push(0,0,1),p.push(y/o),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let M=0;M<o;M++){let y=M+l*d,B=M+l*(d+1),O=M+1+l*(d+1),P=M+1+l*d;A.push(y,B,P),A.push(B,O,P)}this.setIndex(A),this.setAttribute("position",new Ut(m,3)),this.setAttribute("normal",new Ut(b,3)),this.setAttribute("uv",new Ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},em=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tm=`#ifdef USE_ALPHAHASH
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
#endif`,nm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,im=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,rm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,am=`#ifdef USE_AOMAP
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
#endif`,om=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cm=`#ifdef USE_BATCHING
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
#endif`,lm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,hm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,um=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dm=`#ifdef USE_IRIDESCENCE
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
#endif`,Am=`#ifdef USE_BUMPMAP
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
#endif`,pm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Em=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ym=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,vm=`#define PI 3.141592653589793
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
} // validated`,Mm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Sm=`vec3 transformedNormal = objectNormal;
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
#endif`,Cm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Im=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bm=`
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
}`,Dm=`#ifdef USE_ENVMAP
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
#endif`,Lm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pm=`#ifdef USE_ENVMAP
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
#endif`,Fm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Nm=`#ifdef USE_ENVMAP
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
#endif`,Um=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Om=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,km=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gm=`#ifdef USE_GRADIENTMAP
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
}`,Hm=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,zm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Km=`uniform bool receiveShadow;
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
#endif`,qm=`#ifdef USE_ENVMAP
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
#endif`,Xm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ym=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zm=`PhysicalMaterial material;
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
#endif`,$m=`struct PhysicalMaterial {
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
}`,eg=`
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
#endif`,tg=`#if defined( RE_IndirectDiffuse )
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
#endif`,ng=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ig=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ag=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,og=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hg=`#if defined( USE_POINTS_UV )
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
#endif`,ug=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ag=`#ifdef USE_MORPHNORMALS
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
#endif`,pg=`#ifdef USE_MORPHTARGETS
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
#endif`,mg=`#ifdef USE_MORPHTARGETS
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
#endif`,gg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_g=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yg=`#ifdef USE_NORMALMAP
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
#endif`,vg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ig=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ng=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ug=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Og=`float getShadowMask() {
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
}`,kg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qg=`#ifdef USE_SKINNING
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
#endif`,Gg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hg=`#ifdef USE_SKINNING
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
#endif`,zg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qg=`#ifdef USE_TRANSMISSION
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
#endif`,Xg=`#ifdef USE_TRANSMISSION
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
#endif`,Yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,$g=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,e0=`uniform sampler2D t2D;
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
}`,t0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,i0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,s0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r0=`#include <common>
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
}`,a0=`#if DEPTH_PACKING == 3200
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
}`,o0=`#define DISTANCE
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
}`,c0=`#define DISTANCE
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
}`,l0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,h0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u0=`uniform float scale;
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
}`,f0=`uniform vec3 diffuse;
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
}`,d0=`#include <common>
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
}`,A0=`uniform vec3 diffuse;
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
}`,p0=`#define LAMBERT
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
}`,m0=`#define LAMBERT
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
}`,g0=`#define MATCAP
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
}`,_0=`#define MATCAP
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
}`,b0=`#define NORMAL
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
}`,E0=`#define NORMAL
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
}`,x0=`#define PHONG
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
}`,y0=`#define PHONG
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
}`,v0=`#define STANDARD
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
}`,M0=`#define STANDARD
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
}`,S0=`#define TOON
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
}`,C0=`#define TOON
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
}`,w0=`uniform float size;
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
}`,I0=`uniform vec3 diffuse;
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
}`,T0=`#include <common>
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
}`,R0=`uniform vec3 color;
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
}`,B0=`uniform float rotation;
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
}`,D0=`uniform vec3 diffuse;
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
}`,Bt={alphahash_fragment:em,alphahash_pars_fragment:tm,alphamap_fragment:nm,alphamap_pars_fragment:im,alphatest_fragment:sm,alphatest_pars_fragment:rm,aomap_fragment:am,aomap_pars_fragment:om,batching_pars_vertex:cm,batching_vertex:lm,begin_vertex:hm,beginnormal_vertex:um,bsdfs:fm,iridescence_fragment:dm,bumpmap_pars_fragment:Am,clipping_planes_fragment:pm,clipping_planes_pars_fragment:mm,clipping_planes_pars_vertex:gm,clipping_planes_vertex:_m,color_fragment:bm,color_pars_fragment:Em,color_pars_vertex:xm,color_vertex:ym,common:vm,cube_uv_reflection_fragment:Mm,defaultnormal_vertex:Sm,displacementmap_pars_vertex:Cm,displacementmap_vertex:wm,emissivemap_fragment:Im,emissivemap_pars_fragment:Tm,colorspace_fragment:Rm,colorspace_pars_fragment:Bm,envmap_fragment:Dm,envmap_common_pars_fragment:Lm,envmap_pars_fragment:Pm,envmap_pars_vertex:Fm,envmap_physical_pars_fragment:qm,envmap_vertex:Nm,fog_vertex:Um,fog_pars_vertex:Om,fog_fragment:km,fog_pars_fragment:Qm,gradientmap_pars_fragment:Gm,lightmap_fragment:Hm,lightmap_pars_fragment:zm,lights_lambert_fragment:Vm,lights_lambert_pars_fragment:Wm,lights_pars_begin:Km,lights_toon_fragment:Xm,lights_toon_pars_fragment:Ym,lights_phong_fragment:Jm,lights_phong_pars_fragment:jm,lights_physical_fragment:Zm,lights_physical_pars_fragment:$m,lights_fragment_begin:eg,lights_fragment_maps:tg,lights_fragment_end:ng,logdepthbuf_fragment:ig,logdepthbuf_pars_fragment:sg,logdepthbuf_pars_vertex:rg,logdepthbuf_vertex:ag,map_fragment:og,map_pars_fragment:cg,map_particle_fragment:lg,map_particle_pars_fragment:hg,metalnessmap_fragment:ug,metalnessmap_pars_fragment:fg,morphcolor_vertex:dg,morphnormal_vertex:Ag,morphtarget_pars_vertex:pg,morphtarget_vertex:mg,normal_fragment_begin:gg,normal_fragment_maps:_g,normal_pars_fragment:bg,normal_pars_vertex:Eg,normal_vertex:xg,normalmap_pars_fragment:yg,clearcoat_normal_fragment_begin:vg,clearcoat_normal_fragment_maps:Mg,clearcoat_pars_fragment:Sg,iridescence_pars_fragment:Cg,opaque_fragment:wg,packing:Ig,premultiplied_alpha_fragment:Tg,project_vertex:Rg,dithering_fragment:Bg,dithering_pars_fragment:Dg,roughnessmap_fragment:Lg,roughnessmap_pars_fragment:Pg,shadowmap_pars_fragment:Fg,shadowmap_pars_vertex:Ng,shadowmap_vertex:Ug,shadowmask_pars_fragment:Og,skinbase_vertex:kg,skinning_pars_vertex:Qg,skinning_vertex:Gg,skinnormal_vertex:Hg,specularmap_fragment:zg,specularmap_pars_fragment:Vg,tonemapping_fragment:Wg,tonemapping_pars_fragment:Kg,transmission_fragment:qg,transmission_pars_fragment:Xg,uv_pars_fragment:Yg,uv_pars_vertex:Jg,uv_vertex:jg,worldpos_vertex:Zg,background_vert:$g,background_frag:e0,backgroundCube_vert:t0,backgroundCube_frag:n0,cube_vert:i0,cube_frag:s0,depth_vert:r0,depth_frag:a0,distanceRGBA_vert:o0,distanceRGBA_frag:c0,equirect_vert:l0,equirect_frag:h0,linedashed_vert:u0,linedashed_frag:f0,meshbasic_vert:d0,meshbasic_frag:A0,meshlambert_vert:p0,meshlambert_frag:m0,meshmatcap_vert:g0,meshmatcap_frag:_0,meshnormal_vert:b0,meshnormal_frag:E0,meshphong_vert:x0,meshphong_frag:y0,meshphysical_vert:v0,meshphysical_frag:M0,meshtoon_vert:S0,meshtoon_frag:C0,points_vert:w0,points_frag:I0,shadow_vert:T0,shadow_frag:R0,sprite_vert:B0,sprite_frag:D0},ke={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Wi={basic:{uniforms:ri([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:ri([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new We(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:ri([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:ri([ke.common,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.roughnessmap,ke.metalnessmap,ke.fog,ke.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:ri([ke.common,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.gradientmap,ke.fog,ke.lights,{emissive:{value:new We(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:ri([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:ri([ke.points,ke.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:ri([ke.common,ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:ri([ke.common,ke.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:ri([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:ri([ke.sprite,ke.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:ri([ke.common,ke.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:ri([ke.lights,ke.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};Wi.physical={uniforms:ri([Wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};var Po={r:0,b:0,g:0};function L0(s,e,t,n,i,r,a){let o=new We(0),c=r===!0?0:1,l,h,u=null,f=0,A=null;function m(p,d){let M=!1,y=d.isScene===!0?d.background:null;y&&y.isTexture&&(y=(d.backgroundBlurriness>0?t:e).get(y)),y===null?b(o,c):y&&y.isColor&&(b(y,1),M=!0);let B=s.xr.getEnvironmentBlendMode();B==="additive"?n.buffers.color.setClear(0,0,0,1,a):B==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),y&&(y.isCubeTexture||y.mapping===wc)?(h===void 0&&(h=new ze(new un(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:jr(Wi.backgroundCube.uniforms),vertexShader:Wi.backgroundCube.vertexShader,fragmentShader:Wi.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(O,P,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=jt.getTransfer(y.colorSpace)!==mn,(u!==y||f!==y.version||A!==s.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,A=s.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ze(new ei(2,2),new $n({name:"BackgroundMaterial",uniforms:jr(Wi.background.uniforms),vertexShader:Wi.background.vertexShader,fragmentShader:Wi.background.fragmentShader,side:qi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,l.material.toneMapped=jt.getTransfer(y.colorSpace)!==mn,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||A!==s.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,A=s.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function b(p,d){p.getRGB(Po,ad(s)),n.buffers.color.setClear(Po.r,Po.g,Po.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(p,d=1){o.set(p),c=d,b(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,b(o,c)},render:m}}function P0(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=p(null),l=c,h=!1;function u(k,Y,$,fe,Ae){let pe=!1;if(a){let be=b(fe,$,Y);l!==be&&(l=be,A(l.object)),pe=d(k,fe,$,Ae),pe&&M(k,fe,$,Ae)}else{let be=Y.wireframe===!0;(l.geometry!==fe.id||l.program!==$.id||l.wireframe!==be)&&(l.geometry=fe.id,l.program=$.id,l.wireframe=be,pe=!0)}Ae!==null&&t.update(Ae,s.ELEMENT_ARRAY_BUFFER),(pe||h)&&(h=!1,H(k,Y,$,fe),Ae!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(Ae).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function A(k){return n.isWebGL2?s.bindVertexArray(k):r.bindVertexArrayOES(k)}function m(k){return n.isWebGL2?s.deleteVertexArray(k):r.deleteVertexArrayOES(k)}function b(k,Y,$){let fe=$.wireframe===!0,Ae=o[k.id];Ae===void 0&&(Ae={},o[k.id]=Ae);let pe=Ae[Y.id];pe===void 0&&(pe={},Ae[Y.id]=pe);let be=pe[fe];return be===void 0&&(be=p(f()),pe[fe]=be),be}function p(k){let Y=[],$=[],fe=[];for(let Ae=0;Ae<i;Ae++)Y[Ae]=0,$[Ae]=0,fe[Ae]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:$,attributeDivisors:fe,object:k,attributes:{},index:null}}function d(k,Y,$,fe){let Ae=l.attributes,pe=Y.attributes,be=0,Me=$.getAttributes();for(let Le in Me)if(Me[Le].location>=0){let ve=Ae[Le],Ve=pe[Le];if(Ve===void 0&&(Le==="instanceMatrix"&&k.instanceMatrix&&(Ve=k.instanceMatrix),Le==="instanceColor"&&k.instanceColor&&(Ve=k.instanceColor)),ve===void 0||ve.attribute!==Ve||Ve&&ve.data!==Ve.data)return!0;be++}return l.attributesNum!==be||l.index!==fe}function M(k,Y,$,fe){let Ae={},pe=Y.attributes,be=0,Me=$.getAttributes();for(let Le in Me)if(Me[Le].location>=0){let ve=pe[Le];ve===void 0&&(Le==="instanceMatrix"&&k.instanceMatrix&&(ve=k.instanceMatrix),Le==="instanceColor"&&k.instanceColor&&(ve=k.instanceColor));let Ve={};Ve.attribute=ve,ve&&ve.data&&(Ve.data=ve.data),Ae[Le]=Ve,be++}l.attributes=Ae,l.attributesNum=be,l.index=fe}function y(){let k=l.newAttributes;for(let Y=0,$=k.length;Y<$;Y++)k[Y]=0}function B(k){O(k,0)}function O(k,Y){let $=l.newAttributes,fe=l.enabledAttributes,Ae=l.attributeDivisors;$[k]=1,fe[k]===0&&(s.enableVertexAttribArray(k),fe[k]=1),Ae[k]!==Y&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](k,Y),Ae[k]=Y)}function P(){let k=l.newAttributes,Y=l.enabledAttributes;for(let $=0,fe=Y.length;$<fe;$++)Y[$]!==k[$]&&(s.disableVertexAttribArray($),Y[$]=0)}function N(k,Y,$,fe,Ae,pe,be){be===!0?s.vertexAttribIPointer(k,Y,$,Ae,pe):s.vertexAttribPointer(k,Y,$,fe,Ae,pe)}function H(k,Y,$,fe){if(n.isWebGL2===!1&&(k.isInstancedMesh||fe.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();let Ae=fe.attributes,pe=$.getAttributes(),be=Y.defaultAttributeValues;for(let Me in pe){let Le=pe[Me];if(Le.location>=0){let ce=Ae[Me];if(ce===void 0&&(Me==="instanceMatrix"&&k.instanceMatrix&&(ce=k.instanceMatrix),Me==="instanceColor"&&k.instanceColor&&(ce=k.instanceColor)),ce!==void 0){let ve=ce.normalized,Ve=ce.itemSize,nt=t.get(ce);if(nt===void 0)continue;let qe=nt.buffer,dt=nt.type,vt=nt.bytesPerElement,at=n.isWebGL2===!0&&(dt===s.INT||dt===s.UNSIGNED_INT||ce.gpuType===Xf);if(ce.isInterleavedBufferAttribute){let Dt=ce.data,ee=Dt.stride,R=ce.offset;if(Dt.isInstancedInterleavedBuffer){for(let Q=0;Q<Le.locationSize;Q++)O(Le.location+Q,Dt.meshPerAttribute);k.isInstancedMesh!==!0&&fe._maxInstanceCount===void 0&&(fe._maxInstanceCount=Dt.meshPerAttribute*Dt.count)}else for(let Q=0;Q<Le.locationSize;Q++)B(Le.location+Q);s.bindBuffer(s.ARRAY_BUFFER,qe);for(let Q=0;Q<Le.locationSize;Q++)N(Le.location+Q,Ve/Le.locationSize,dt,ve,ee*vt,(R+Ve/Le.locationSize*Q)*vt,at)}else{if(ce.isInstancedBufferAttribute){for(let Dt=0;Dt<Le.locationSize;Dt++)O(Le.location+Dt,ce.meshPerAttribute);k.isInstancedMesh!==!0&&fe._maxInstanceCount===void 0&&(fe._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Dt=0;Dt<Le.locationSize;Dt++)B(Le.location+Dt);s.bindBuffer(s.ARRAY_BUFFER,qe);for(let Dt=0;Dt<Le.locationSize;Dt++)N(Le.location+Dt,Ve/Le.locationSize,dt,ve,Ve*vt,Ve/Le.locationSize*Dt*vt,at)}}else if(be!==void 0){let ve=be[Me];if(ve!==void 0)switch(ve.length){case 2:s.vertexAttrib2fv(Le.location,ve);break;case 3:s.vertexAttrib3fv(Le.location,ve);break;case 4:s.vertexAttrib4fv(Le.location,ve);break;default:s.vertexAttrib1fv(Le.location,ve)}}}}P()}function v(){Z();for(let k in o){let Y=o[k];for(let $ in Y){let fe=Y[$];for(let Ae in fe)m(fe[Ae].object),delete fe[Ae];delete Y[$]}delete o[k]}}function D(k){if(o[k.id]===void 0)return;let Y=o[k.id];for(let $ in Y){let fe=Y[$];for(let Ae in fe)m(fe[Ae].object),delete fe[Ae];delete Y[$]}delete o[k.id]}function J(k){for(let Y in o){let $=o[Y];if($[k.id]===void 0)continue;let fe=$[k.id];for(let Ae in fe)m(fe[Ae].object),delete fe[Ae];delete $[k.id]}}function Z(){ue(),h=!0,l!==c&&(l=c,A(l.object))}function ue(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:Z,resetDefaultState:ue,dispose:v,releaseStatesOfGeometry:D,releaseStatesOfProgram:J,initAttributes:y,enableAttribute:B,disableUnusedAttributes:P}}function F0(s,e,t,n){let i=n.isWebGL2,r;function a(h){r=h}function o(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,f){if(f===0)return;let A,m;if(i)A=s,m="drawArraysInstanced";else if(A=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",A===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}A[m](r,h,u,f),t.update(u,r,f)}function l(h,u,f){if(f===0)return;let A=e.get("WEBGL_multi_draw");if(A===null)for(let m=0;m<f;m++)this.render(h[m],u[m]);else{A.multiDrawArraysWEBGL(r,h,0,u,0,f);let m=0;for(let b=0;b<f;b++)m+=u[b];t.update(m,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function N0(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let N=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(N){if(N==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext!="undefined"&&s.constructor.name==="WebGL2RenderingContext",o=t.precision!==void 0?t.precision:"highp",c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);let l=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),b=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),d=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,B=a||e.has("OES_texture_float"),O=y&&B,P=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:A,maxCubemapSize:m,maxAttributes:b,maxVertexUniforms:p,maxVaryings:d,maxFragmentUniforms:M,vertexTextures:y,floatFragmentTextures:B,floatVertexTextures:O,maxSamples:P}}function U0(s){let e=this,t=null,n=0,i=!1,r=!1,a=new rs,o=new Lt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let A=u.length!==0||f||n!==0||i;return i=f,n=u.length,A},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,A){let m=u.clippingPlanes,b=u.clipIntersection,p=u.clipShadows,d=s.get(u);if(!i||m===null||m.length===0||r&&!p)r?h(null):l();else{let M=r?0:n,y=M*4,B=d.clippingState||null;c.value=B,B=h(m,f,y,A);for(let O=0;O!==y;++O)B[O]=t[O];d.clippingState=B,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,A,m){let b=u!==null?u.length:0,p=null;if(b!==0){if(p=c.value,m!==!0||p===null){let d=A+b*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<d)&&(p=new Float32Array(d));for(let y=0,B=A;y!==b;++y,B+=4)a.copy(u[y]).applyMatrix4(M,o),a.normal.toArray(p,B),p[B+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,p}}function O0(s){let e=new WeakMap;function t(a,o){return o===Ga?a.mapping=Zs:o===Cl&&(a.mapping=Vr),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Ga||o===Cl)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new Dl(c.height/2);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Ss=class extends hc{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},kr=4,rf=[.125,.215,.35,.446,.526,.582],qs=20,dl=new Ss,af=new We,Al=null,pl=0,ml=0,Ws=(1+Math.sqrt(5))/2,Br=1/Ws,of=[new G(1,1,1),new G(-1,1,1),new G(1,1,-1),new G(-1,1,-1),new G(0,Ws,Br),new G(0,Ws,-Br),new G(Br,0,Ws),new G(-Br,0,Ws),new G(Ws,Br,0),new G(-Ws,Br,0)],Cs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Al=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Al,pl,ml),e.scissorTest=!1,Fo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Zs||e.mapping===Vr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Al=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:qt,minFilter:qt,generateMipmaps:!1,type:oi,format:Cn,colorSpace:bn,depthBuffer:!1},i=cf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cf(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=k0(r)),this._blurMaterial=Q0(r,e,t)}return i}_compileMaterial(e){let t=new ze(this._lodPlanes[0],e);this._renderer.compile(t,dl)}_sceneToCubeUV(e,t,n,i){let o=new _n(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(af),h.toneMapping=Ms,h.autoClear=!1;let A=new rn({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1}),m=new ze(new un,A),b=!1,p=e.background;p?p.isColor&&(A.color.copy(p),e.background=null,b=!0):(A.color.copy(af),b=!0);for(let d=0;d<6;d++){let M=d%3;M===0?(o.up.set(0,c[d],0),o.lookAt(l[d],0,0)):M===1?(o.up.set(0,0,c[d]),o.lookAt(0,l[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,l[d]));let y=this._cubeSize;Fo(i,M*y,d>2?y:0,y,y),h.setRenderTarget(i),b&&h.render(m,o),h.render(e,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Zs||e.mapping===Vr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=hf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lf());let r=i?this._cubemapMaterial:this._equirectMaterial,a=new ze(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Fo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,dl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=of[(i-1)%of.length];this._blur(e,i-1,i,r,a)}t.autoClear=n}_blur(e,t,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ze(this._lodPlanes[i],l),f=l.uniforms,A=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*A):2*Math.PI/(2*qs-1),b=r/m,p=isFinite(r)?1+Math.floor(h*b):qs;p>qs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${qs}`);let d=[],M=0;for(let N=0;N<qs;++N){let H=N/b,v=Math.exp(-H*H/2);d.push(v),N===0?M+=v:N<p&&(M+=2*v)}for(let N=0;N<d.length;N++)d[N]=d[N]/M;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:y}=this;f.dTheta.value=m,f.mipInt.value=y-n;let B=this._sizeLods[i],O=3*B*(i>y-kr?i-y+kr:0),P=4*(this._cubeSize-B);Fo(t,O,P,3*B,2*B),c.setRenderTarget(t),c.render(u,dl)}};function k0(s){let e=[],t=[],n=[],i=s,r=s-kr+1+rf.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);t.push(o);let c=1/o;a>s-kr?c=rf[a-s+kr-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],A=6,m=6,b=3,p=2,d=1,M=new Float32Array(b*m*A),y=new Float32Array(p*m*A),B=new Float32Array(d*m*A);for(let P=0;P<A;P++){let N=P%3*2/3-1,H=P>2?0:-1,v=[N,H,0,N+2/3,H,0,N+2/3,H+1,0,N,H,0,N+2/3,H+1,0,N,H+1,0];M.set(v,b*m*P),y.set(f,p*m*P);let D=[P,P,P,P,P,P];B.set(D,d*m*P)}let O=new an;O.setAttribute("position",new Ft(M,b)),O.setAttribute("uv",new Ft(y,p)),O.setAttribute("faceIndex",new Ft(B,d)),e.push(O),i>kr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function cf(s,e,t){let n=new Ai(s,e,t);return n.texture.mapping=wc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fo(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Q0(s,e,t){let n=new Float32Array(qs),i=new G(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:qs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:hh(),fragmentShader:`

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
		`,blending:vs,depthTest:!1,depthWrite:!1})}function lf(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hh(),fragmentShader:`

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
		`,blending:vs,depthTest:!1,depthWrite:!1})}function hf(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vs,depthTest:!1,depthWrite:!1})}function hh(){return`

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
	`}function G0(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===Ga||c===Cl,h=c===Zs||c===Vr;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Cs(s)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{let u=o.image;if(l&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Cs(s));let f=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function i(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function H0(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function z0(s,e,t,n){let i={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);for(let m in f.morphAttributes){let b=f.morphAttributes[m];for(let p=0,d=b.length;p<d;p++)e.remove(b[p])}f.removeEventListener("dispose",a),delete i[f.id];let A=r.get(f);A&&(e.remove(A),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let m in f)e.update(f[m],s.ARRAY_BUFFER);let A=u.morphAttributes;for(let m in A){let b=A[m];for(let p=0,d=b.length;p<d;p++)e.update(b[p],s.ARRAY_BUFFER)}}function l(u){let f=[],A=u.index,m=u.attributes.position,b=0;if(A!==null){let M=A.array;b=A.version;for(let y=0,B=M.length;y<B;y+=3){let O=M[y+0],P=M[y+1],N=M[y+2];f.push(O,P,P,N,N,O)}}else if(m!==void 0){let M=m.array;b=m.version;for(let y=0,B=M.length/3-1;y<B;y+=3){let O=y+0,P=y+1,N=y+2;f.push(O,P,P,N,N,O)}}else return;let p=new(sd(f)?lc:Jr)(f,1);p.version=b;let d=r.get(u);d&&e.remove(d),r.set(u,p)}function h(u){let f=r.get(u);if(f){let A=u.index;A!==null&&f.version<A.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function V0(s,e,t,n){let i=n.isWebGL2,r;function a(A){r=A}let o,c;function l(A){o=A.type,c=A.bytesPerElement}function h(A,m){s.drawElements(r,m,o,A*c),t.update(m,r,1)}function u(A,m,b){if(b===0)return;let p,d;if(i)p=s,d="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](r,m,o,A*c,b),t.update(m,r,b)}function f(A,m,b){if(b===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<b;d++)this.render(A[d]/c,m[d]);else{p.multiDrawElementsWEBGL(r,m,0,o,A,0,b);let d=0;for(let M=0;M<b;M++)d+=m[M];t.update(d,r,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function W0(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function K0(s,e){return s[0]-e[0]}function q0(s,e){return Math.abs(e[1])-Math.abs(s[1])}function X0(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,a=new Rt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,u){let f=l.morphTargetInfluences;if(e.isWebGL2===!0){let A=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,m=A!==void 0?A.length:0,b=r.get(h);if(b===void 0||b.count!==m){let k=function(){Z.dispose(),r.delete(h),h.removeEventListener("dispose",k)};b!==void 0&&b.texture.dispose();let M=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,B=h.morphAttributes.color!==void 0,O=h.morphAttributes.position||[],P=h.morphAttributes.normal||[],N=h.morphAttributes.color||[],H=0;M===!0&&(H=1),y===!0&&(H=2),B===!0&&(H=3);let v=h.attributes.position.count*H,D=1;v>e.maxTextureSize&&(D=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let J=new Float32Array(v*D*4*m),Z=new oc(J,v,D,m);Z.type=zn,Z.needsUpdate=!0;let ue=H*4;for(let Y=0;Y<m;Y++){let $=O[Y],fe=P[Y],Ae=N[Y],pe=v*D*4*Y;for(let be=0;be<$.count;be++){let Me=be*ue;M===!0&&(a.fromBufferAttribute($,be),J[pe+Me+0]=a.x,J[pe+Me+1]=a.y,J[pe+Me+2]=a.z,J[pe+Me+3]=0),y===!0&&(a.fromBufferAttribute(fe,be),J[pe+Me+4]=a.x,J[pe+Me+5]=a.y,J[pe+Me+6]=a.z,J[pe+Me+7]=0),B===!0&&(a.fromBufferAttribute(Ae,be),J[pe+Me+8]=a.x,J[pe+Me+9]=a.y,J[pe+Me+10]=a.z,J[pe+Me+11]=Ae.itemSize===4?a.w:1)}}b={count:m,texture:Z,size:new Ze(v,D)},r.set(h,b),h.addEventListener("dispose",k)}let p=0;for(let M=0;M<f.length;M++)p+=f[M];let d=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",d),u.getUniforms().setValue(s,"morphTargetInfluences",f),u.getUniforms().setValue(s,"morphTargetsTexture",b.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",b.size)}else{let A=f===void 0?0:f.length,m=n[h.id];if(m===void 0||m.length!==A){m=[];for(let y=0;y<A;y++)m[y]=[y,0];n[h.id]=m}for(let y=0;y<A;y++){let B=m[y];B[0]=y,B[1]=f[y]}m.sort(q0);for(let y=0;y<8;y++)y<A&&m[y][1]?(o[y][0]=m[y][0],o[y][1]=m[y][1]):(o[y][0]=Number.MAX_SAFE_INTEGER,o[y][1]=0);o.sort(K0);let b=h.morphAttributes.position,p=h.morphAttributes.normal,d=0;for(let y=0;y<8;y++){let B=o[y],O=B[0],P=B[1];O!==Number.MAX_SAFE_INTEGER&&P?(b&&h.getAttribute("morphTarget"+y)!==b[O]&&h.setAttribute("morphTarget"+y,b[O]),p&&h.getAttribute("morphNormal"+y)!==p[O]&&h.setAttribute("morphNormal"+y,p[O]),i[y]=P,d+=P):(b&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),p&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),i[y]=0)}let M=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(s,"morphTargetBaseInfluence",M),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function Y0(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return u}function a(){i=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}var fc=class extends Wn{constructor(e,t,n,i,r,a,o,c,l,h){if(h=h!==void 0?h:Js,h!==Js&&h!==Wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Js&&(n=xs),n===void 0&&h===Wr&&(n=Ys),super(null,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ln,this.minFilter=c!==void 0?c:Ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},cd=new Wn,ld=new fc(1,1);ld.compareFunction=nd;var hd=new oc,ud=new Wa,fd=new uc,uf=[],ff=[],df=new Float32Array(16),Af=new Float32Array(9),pf=new Float32Array(4);function oa(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=uf[i];if(r===void 0&&(r=new Float32Array(i),uf[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Nn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Un(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Bc(s,e){let t=ff[e];t===void 0&&(t=new Int32Array(e),ff[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function J0(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function j0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;s.uniform2fv(this.addr,e),Un(t,e)}}function Z0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nn(t,e))return;s.uniform3fv(this.addr,e),Un(t,e)}}function $0(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;s.uniform4fv(this.addr,e),Un(t,e)}}function e_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Un(t,e)}else{if(Nn(t,n))return;pf.set(n),s.uniformMatrix2fv(this.addr,!1,pf),Un(t,n)}}function t_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Un(t,e)}else{if(Nn(t,n))return;Af.set(n),s.uniformMatrix3fv(this.addr,!1,Af),Un(t,n)}}function n_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Un(t,e)}else{if(Nn(t,n))return;df.set(n),s.uniformMatrix4fv(this.addr,!1,df),Un(t,n)}}function i_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function s_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;s.uniform2iv(this.addr,e),Un(t,e)}}function r_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nn(t,e))return;s.uniform3iv(this.addr,e),Un(t,e)}}function a_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;s.uniform4iv(this.addr,e),Un(t,e)}}function o_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function c_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;s.uniform2uiv(this.addr,e),Un(t,e)}}function l_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nn(t,e))return;s.uniform3uiv(this.addr,e),Un(t,e)}}function h_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;s.uniform4uiv(this.addr,e),Un(t,e)}}function u_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?ld:cd;t.setTexture2D(e||r,i)}function f_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ud,i)}function d_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||fd,i)}function A_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||hd,i)}function p_(s){switch(s){case 5126:return J0;case 35664:return j0;case 35665:return Z0;case 35666:return $0;case 35674:return e_;case 35675:return t_;case 35676:return n_;case 5124:case 35670:return i_;case 35667:case 35671:return s_;case 35668:case 35672:return r_;case 35669:case 35673:return a_;case 5125:return o_;case 36294:return c_;case 36295:return l_;case 36296:return h_;case 35678:case 36198:case 36298:case 36306:case 35682:return u_;case 35679:case 36299:case 36307:return f_;case 35680:case 36300:case 36308:case 36293:return d_;case 36289:case 36303:case 36311:case 36292:return A_}}function m_(s,e){s.uniform1fv(this.addr,e)}function g_(s,e){let t=oa(e,this.size,2);s.uniform2fv(this.addr,t)}function __(s,e){let t=oa(e,this.size,3);s.uniform3fv(this.addr,t)}function b_(s,e){let t=oa(e,this.size,4);s.uniform4fv(this.addr,t)}function E_(s,e){let t=oa(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function x_(s,e){let t=oa(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function y_(s,e){let t=oa(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function v_(s,e){s.uniform1iv(this.addr,e)}function M_(s,e){s.uniform2iv(this.addr,e)}function S_(s,e){s.uniform3iv(this.addr,e)}function C_(s,e){s.uniform4iv(this.addr,e)}function w_(s,e){s.uniform1uiv(this.addr,e)}function I_(s,e){s.uniform2uiv(this.addr,e)}function T_(s,e){s.uniform3uiv(this.addr,e)}function R_(s,e){s.uniform4uiv(this.addr,e)}function B_(s,e,t){let n=this.cache,i=e.length,r=Bc(t,i);Nn(n,r)||(s.uniform1iv(this.addr,r),Un(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||cd,r[a])}function D_(s,e,t){let n=this.cache,i=e.length,r=Bc(t,i);Nn(n,r)||(s.uniform1iv(this.addr,r),Un(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||ud,r[a])}function L_(s,e,t){let n=this.cache,i=e.length,r=Bc(t,i);Nn(n,r)||(s.uniform1iv(this.addr,r),Un(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||fd,r[a])}function P_(s,e,t){let n=this.cache,i=e.length,r=Bc(t,i);Nn(n,r)||(s.uniform1iv(this.addr,r),Un(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||hd,r[a])}function F_(s){switch(s){case 5126:return m_;case 35664:return g_;case 35665:return __;case 35666:return b_;case 35674:return E_;case 35675:return x_;case 35676:return y_;case 5124:case 35670:return v_;case 35667:case 35671:return M_;case 35668:case 35672:return S_;case 35669:case 35673:return C_;case 5125:return w_;case 36294:return I_;case 36295:return T_;case 36296:return R_;case 35678:case 36198:case 36298:case 36306:case 35682:return B_;case 35679:case 36299:case 36307:return D_;case 35680:case 36300:case 36308:case 36293:return L_;case 36289:case 36303:case 36311:case 36292:return P_}}var Ll=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=p_(t.type)}},Pl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=F_(t.type)}},Fl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},gl=/(\w+)(\])?(\[|\.)?/g;function mf(s,e){s.seq.push(e),s.map[e.id]=e}function N_(s,e,t){let n=s.name,i=n.length;for(gl.lastIndex=0;;){let r=gl.exec(n),a=gl.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){mf(t,l===void 0?new Ll(o,s,e):new Pl(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Fl(o),mf(t,u)),t=u}}}var zr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);N_(r,a,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function gf(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var U_=37297,O_=0;function k_(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Q_(s){let e=jt.getPrimaries(jt.workingColorSpace),t=jt.getPrimaries(s),n;switch(e===t?n="":e===nc&&t===tc?n="LinearDisplayP3ToLinearSRGB":e===tc&&t===nc&&(n="LinearSRGBToLinearDisplayP3"),s){case bn:case aa:return[n,"LinearTransferOETF"];case Pt:case no:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function _f(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+k_(s.getShaderSource(e),a)}else return i}function G_(s,e){let t=Q_(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function H_(s,e){let t;switch(e){case VA:t="Linear";break;case WA:t="Reinhard";break;case KA:t="OptimizedCineon";break;case Cc:t="ACESFilmic";break;case XA:t="AgX";break;case qA:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function z_(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Qr).join(`
`)}function V_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Qr).join(`
`)}function W_(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function K_(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Qr(s){return s!==""}function bf(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ef(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var q_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nl(s){return s.replace(q_,Y_)}var X_=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Y_(s,e){let t=Bt[e];if(t===void 0){let n=X_.get(e);if(n!==void 0)t=Bt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Nl(t)}var J_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xf(s){return s.replace(J_,j_)}function j_(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function yf(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Z_(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Sc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===_A?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ss&&(e="SHADOWMAP_TYPE_VSM"),e}function $_(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Zs:case Vr:e="ENVMAP_TYPE_CUBE";break;case wc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function eb(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Vr:e="ENVMAP_MODE_REFRACTION";break}return e}function tb(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case sh:e="ENVMAP_BLENDING_MULTIPLY";break;case HA:e="ENVMAP_BLENDING_MIX";break;case zA:e="ENVMAP_BLENDING_ADD";break}return e}function nb(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function ib(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Z_(t),l=$_(t),h=eb(t),u=tb(t),f=nb(t),A=t.isWebGL2?"":z_(t),m=V_(t),b=W_(r),p=i.createProgram(),d,M,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Qr).join(`
`),d.length>0&&(d+=`
`),M=[A,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Qr).join(`
`),M.length>0&&(M+=`
`)):(d=[yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qr).join(`
`),M=[A,yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ms?"#define TONE_MAPPING":"",t.toneMapping!==Ms?Bt.tonemapping_pars_fragment:"",t.toneMapping!==Ms?H_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,G_("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qr).join(`
`)),a=Nl(a),a=bf(a,t),a=Ef(a,t),o=Nl(o),o=bf(o,t),o=Ef(o,t),a=xf(a),o=xf(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=[m,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Qu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);let B=y+d+a,O=y+M+o,P=gf(i,i.VERTEX_SHADER,B),N=gf(i,i.FRAGMENT_SHADER,O);i.attachShader(p,P),i.attachShader(p,N),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function H(Z){if(s.debug.checkShaderErrors){let ue=i.getProgramInfoLog(p).trim(),k=i.getShaderInfoLog(P).trim(),Y=i.getShaderInfoLog(N).trim(),$=!0,fe=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if($=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,p,P,N);else{let Ae=_f(i,P,"vertex"),pe=_f(i,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Program Info Log: `+ue+`
`+Ae+`
`+pe)}else ue!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ue):(k===""||Y==="")&&(fe=!1);fe&&(Z.diagnostics={runnable:$,programLog:ue,vertexShader:{log:k,prefix:d},fragmentShader:{log:Y,prefix:M}})}i.deleteShader(P),i.deleteShader(N),v=new zr(i,p),D=K_(i,p)}let v;this.getUniforms=function(){return v===void 0&&H(this),v};let D;this.getAttributes=function(){return D===void 0&&H(this),D};let J=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return J===!1&&(J=i.getProgramParameter(p,U_)),J},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=O_++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=P,this.fragmentShader=N,this}var sb=0,Ul=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ol(e),t.set(e,n)),n}},Ol=class{constructor(e){this.id=sb++,this.code=e,this.usedTimes=0}};function rb(s,e,t,n,i,r,a){let o=new cc,c=new Ul,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,f=i.vertexTextures,A=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(v){return v===0?"uv":`uv${v}`}function p(v,D,J,Z,ue){let k=Z.fog,Y=ue.geometry,$=v.isMeshStandardMaterial?Z.environment:null,fe=(v.isMeshStandardMaterial?t:e).get(v.envMap||$),Ae=fe&&fe.mapping===wc?fe.image.height:null,pe=m[v.type];v.precision!==null&&(A=i.getMaxPrecision(v.precision),A!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",A,"instead."));let be=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Me=be!==void 0?be.length:0,Le=0;Y.morphAttributes.position!==void 0&&(Le=1),Y.morphAttributes.normal!==void 0&&(Le=2),Y.morphAttributes.color!==void 0&&(Le=3);let ce,ve,Ve,nt;if(pe){let Kn=Wi[pe];ce=Kn.vertexShader,ve=Kn.fragmentShader}else ce=v.vertexShader,ve=v.fragmentShader,c.update(v),Ve=c.getVertexShaderID(v),nt=c.getFragmentShaderID(v);let qe=s.getRenderTarget(),dt=ue.isInstancedMesh===!0,vt=ue.isBatchedMesh===!0,at=!!v.map,Dt=!!v.matcap,ee=!!fe,R=!!v.aoMap,Q=!!v.lightMap,q=!!v.bumpMap,V=!!v.normalMap,le=!!v.displacementMap,ie=!!v.emissiveMap,w=!!v.metalnessMap,x=!!v.roughnessMap,K=v.anisotropy>0,de=v.clearcoat>0,me=v.iridescence>0,xe=v.sheen>0,Ne=v.transmission>0,Re=K&&!!v.anisotropyMap,Oe=de&&!!v.clearcoatMap,je=de&&!!v.clearcoatNormalMap,Et=de&&!!v.clearcoatRoughnessMap,Ce=me&&!!v.iridescenceMap,Ht=me&&!!v.iridescenceThicknessMap,Mt=xe&&!!v.sheenColorMap,Ee=xe&&!!v.sheenRoughnessMap,Ue=!!v.specularMap,Pe=!!v.specularColorMap,lt=!!v.specularIntensityMap,Te=Ne&&!!v.transmissionMap,Xt=Ne&&!!v.thicknessMap,Ye=!!v.gradientMap,Be=!!v.alphaMap,U=v.alphaTest>0,Qe=!!v.alphaHash,Ge=!!v.extensions,ot=!!Y.attributes.uv1,it=!!Y.attributes.uv2,Vt=!!Y.attributes.uv3,Wt=Ms;return v.toneMapped&&(qe===null||qe.isXRRenderTarget===!0)&&(Wt=s.toneMapping),{isWebGL2:h,shaderID:pe,shaderType:v.type,shaderName:v.name,vertexShader:ce,fragmentShader:ve,defines:v.defines,customVertexShaderID:Ve,customFragmentShaderID:nt,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:A,batching:vt,instancing:dt,instancingColor:dt&&ue.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:qe===null?s.outputColorSpace:qe.isXRRenderTarget===!0?qe.texture.colorSpace:bn,map:at,matcap:Dt,envMap:ee,envMapMode:ee&&fe.mapping,envMapCubeUVHeight:Ae,aoMap:R,lightMap:Q,bumpMap:q,normalMap:V,displacementMap:f&&le,emissiveMap:ie,normalMapObjectSpace:V&&v.normalMapType===op,normalMapTangentSpace:V&&v.normalMapType===ch,metalnessMap:w,roughnessMap:x,anisotropy:K,anisotropyMap:Re,clearcoat:de,clearcoatMap:Oe,clearcoatNormalMap:je,clearcoatRoughnessMap:Et,iridescence:me,iridescenceMap:Ce,iridescenceThicknessMap:Ht,sheen:xe,sheenColorMap:Mt,sheenRoughnessMap:Ee,specularMap:Ue,specularColorMap:Pe,specularIntensityMap:lt,transmission:Ne,transmissionMap:Te,thicknessMap:Xt,gradientMap:Ye,opaque:v.transparent===!1&&v.blending===Gr,alphaMap:Be,alphaTest:U,alphaHash:Qe,combine:v.combine,mapUv:at&&b(v.map.channel),aoMapUv:R&&b(v.aoMap.channel),lightMapUv:Q&&b(v.lightMap.channel),bumpMapUv:q&&b(v.bumpMap.channel),normalMapUv:V&&b(v.normalMap.channel),displacementMapUv:le&&b(v.displacementMap.channel),emissiveMapUv:ie&&b(v.emissiveMap.channel),metalnessMapUv:w&&b(v.metalnessMap.channel),roughnessMapUv:x&&b(v.roughnessMap.channel),anisotropyMapUv:Re&&b(v.anisotropyMap.channel),clearcoatMapUv:Oe&&b(v.clearcoatMap.channel),clearcoatNormalMapUv:je&&b(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&b(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&b(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ht&&b(v.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&b(v.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&b(v.sheenRoughnessMap.channel),specularMapUv:Ue&&b(v.specularMap.channel),specularColorMapUv:Pe&&b(v.specularColorMap.channel),specularIntensityMapUv:lt&&b(v.specularIntensityMap.channel),transmissionMapUv:Te&&b(v.transmissionMap.channel),thicknessMapUv:Xt&&b(v.thicknessMap.channel),alphaMapUv:Be&&b(v.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(V||K),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,vertexUv1s:ot,vertexUv2s:it,vertexUv3s:Vt,pointsUvs:ue.isPoints===!0&&!!Y.attributes.uv&&(at||Be),fog:!!k,useFog:v.fog===!0,fogExp2:k&&k.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ue.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Le,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&J.length>0,shadowMapType:s.shadowMap.type,toneMapping:Wt,useLegacyLights:s._useLegacyLights,decodeVideoTexture:at&&v.map.isVideoTexture===!0&&jt.getTransfer(v.map.colorSpace)===mn,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Sn,flipSided:v.side===Fn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:Ge&&v.extensions.derivatives===!0,extensionFragDepth:Ge&&v.extensions.fragDepth===!0,extensionDrawBuffers:Ge&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ge&&v.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ge&&v.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()}}function d(v){let D=[];if(v.shaderID?D.push(v.shaderID):(D.push(v.customVertexShaderID),D.push(v.customFragmentShaderID)),v.defines!==void 0)for(let J in v.defines)D.push(J),D.push(v.defines[J]);return v.isRawShaderMaterial===!1&&(M(D,v),y(D,v),D.push(s.outputColorSpace)),D.push(v.customProgramCacheKey),D.join()}function M(v,D){v.push(D.precision),v.push(D.outputColorSpace),v.push(D.envMapMode),v.push(D.envMapCubeUVHeight),v.push(D.mapUv),v.push(D.alphaMapUv),v.push(D.lightMapUv),v.push(D.aoMapUv),v.push(D.bumpMapUv),v.push(D.normalMapUv),v.push(D.displacementMapUv),v.push(D.emissiveMapUv),v.push(D.metalnessMapUv),v.push(D.roughnessMapUv),v.push(D.anisotropyMapUv),v.push(D.clearcoatMapUv),v.push(D.clearcoatNormalMapUv),v.push(D.clearcoatRoughnessMapUv),v.push(D.iridescenceMapUv),v.push(D.iridescenceThicknessMapUv),v.push(D.sheenColorMapUv),v.push(D.sheenRoughnessMapUv),v.push(D.specularMapUv),v.push(D.specularColorMapUv),v.push(D.specularIntensityMapUv),v.push(D.transmissionMapUv),v.push(D.thicknessMapUv),v.push(D.combine),v.push(D.fogExp2),v.push(D.sizeAttenuation),v.push(D.morphTargetsCount),v.push(D.morphAttributeCount),v.push(D.numDirLights),v.push(D.numPointLights),v.push(D.numSpotLights),v.push(D.numSpotLightMaps),v.push(D.numHemiLights),v.push(D.numRectAreaLights),v.push(D.numDirLightShadows),v.push(D.numPointLightShadows),v.push(D.numSpotLightShadows),v.push(D.numSpotLightShadowsWithMaps),v.push(D.numLightProbes),v.push(D.shadowMapType),v.push(D.toneMapping),v.push(D.numClippingPlanes),v.push(D.numClipIntersection),v.push(D.depthPacking)}function y(v,D){o.disableAll(),D.isWebGL2&&o.enable(0),D.supportsVertexTextures&&o.enable(1),D.instancing&&o.enable(2),D.instancingColor&&o.enable(3),D.matcap&&o.enable(4),D.envMap&&o.enable(5),D.normalMapObjectSpace&&o.enable(6),D.normalMapTangentSpace&&o.enable(7),D.clearcoat&&o.enable(8),D.iridescence&&o.enable(9),D.alphaTest&&o.enable(10),D.vertexColors&&o.enable(11),D.vertexAlphas&&o.enable(12),D.vertexUv1s&&o.enable(13),D.vertexUv2s&&o.enable(14),D.vertexUv3s&&o.enable(15),D.vertexTangents&&o.enable(16),D.anisotropy&&o.enable(17),D.alphaHash&&o.enable(18),D.batching&&o.enable(19),v.push(o.mask),o.disableAll(),D.fog&&o.enable(0),D.useFog&&o.enable(1),D.flatShading&&o.enable(2),D.logarithmicDepthBuffer&&o.enable(3),D.skinning&&o.enable(4),D.morphTargets&&o.enable(5),D.morphNormals&&o.enable(6),D.morphColors&&o.enable(7),D.premultipliedAlpha&&o.enable(8),D.shadowMapEnabled&&o.enable(9),D.useLegacyLights&&o.enable(10),D.doubleSided&&o.enable(11),D.flipSided&&o.enable(12),D.useDepthPacking&&o.enable(13),D.dithering&&o.enable(14),D.transmission&&o.enable(15),D.sheen&&o.enable(16),D.opaque&&o.enable(17),D.pointsUvs&&o.enable(18),D.decodeVideoTexture&&o.enable(19),v.push(o.mask)}function B(v){let D=m[v.type],J;if(D){let Z=Wi[D];J=Xp.clone(Z.uniforms)}else J=v.uniforms;return J}function O(v,D){let J;for(let Z=0,ue=l.length;Z<ue;Z++){let k=l[Z];if(k.cacheKey===D){J=k,++J.usedTimes;break}}return J===void 0&&(J=new ib(s,D,v,r),l.push(J)),J}function P(v){if(--v.usedTimes===0){let D=l.indexOf(v);l[D]=l[l.length-1],l.pop(),v.destroy()}}function N(v){c.remove(v)}function H(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:B,acquireProgram:O,releaseProgram:P,releaseShaderCache:N,programs:l,dispose:H}}function ab(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function ob(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function vf(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Mf(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,f,A,m,b,p){let d=s[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:A,groupOrder:m,renderOrder:u.renderOrder,z:b,group:p},s[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=A,d.groupOrder=m,d.renderOrder=u.renderOrder,d.z=b,d.group=p),e++,d}function o(u,f,A,m,b,p){let d=a(u,f,A,m,b,p);A.transmission>0?n.push(d):A.transparent===!0?i.push(d):t.push(d)}function c(u,f,A,m,b,p){let d=a(u,f,A,m,b,p);A.transmission>0?n.unshift(d):A.transparent===!0?i.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||ob),n.length>1&&n.sort(f||vf),i.length>1&&i.sort(f||vf)}function h(){for(let u=e,f=s.length;u<f;u++){let A=s[u];if(A.id===null)break;A.id=null,A.object=null,A.geometry=null,A.material=null,A.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:h,sort:l}}function cb(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new Mf,s.set(n,[a])):i>=r.length?(a=new Mf,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function lb(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new We};break;case"SpotLight":t={position:new G,direction:new G,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new G,halfWidth:new G,halfHeight:new G};break}return s[e.id]=t,t}}}function hb(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var ub=0;function fb(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function db(s,e){let t=new lb,n=hb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new G);let r=new G,a=new ct,o=new ct;function c(h,u){let f=0,A=0,m=0;for(let Z=0;Z<9;Z++)i.probe[Z].set(0,0,0);let b=0,p=0,d=0,M=0,y=0,B=0,O=0,P=0,N=0,H=0,v=0;h.sort(fb);let D=u===!0?Math.PI:1;for(let Z=0,ue=h.length;Z<ue;Z++){let k=h[Z],Y=k.color,$=k.intensity,fe=k.distance,Ae=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)f+=Y.r*$*D,A+=Y.g*$*D,m+=Y.b*$*D;else if(k.isLightProbe){for(let pe=0;pe<9;pe++)i.probe[pe].addScaledVector(k.sh.coefficients[pe],$);v++}else if(k.isDirectionalLight){let pe=t.get(k);if(pe.color.copy(k.color).multiplyScalar(k.intensity*D),k.castShadow){let be=k.shadow,Me=n.get(k);Me.shadowBias=be.bias,Me.shadowNormalBias=be.normalBias,Me.shadowRadius=be.radius,Me.shadowMapSize=be.mapSize,i.directionalShadow[b]=Me,i.directionalShadowMap[b]=Ae,i.directionalShadowMatrix[b]=k.shadow.matrix,B++}i.directional[b]=pe,b++}else if(k.isSpotLight){let pe=t.get(k);pe.position.setFromMatrixPosition(k.matrixWorld),pe.color.copy(Y).multiplyScalar($*D),pe.distance=fe,pe.coneCos=Math.cos(k.angle),pe.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),pe.decay=k.decay,i.spot[d]=pe;let be=k.shadow;if(k.map&&(i.spotLightMap[N]=k.map,N++,be.updateMatrices(k),k.castShadow&&H++),i.spotLightMatrix[d]=be.matrix,k.castShadow){let Me=n.get(k);Me.shadowBias=be.bias,Me.shadowNormalBias=be.normalBias,Me.shadowRadius=be.radius,Me.shadowMapSize=be.mapSize,i.spotShadow[d]=Me,i.spotShadowMap[d]=Ae,P++}d++}else if(k.isRectAreaLight){let pe=t.get(k);pe.color.copy(Y).multiplyScalar($),pe.halfWidth.set(k.width*.5,0,0),pe.halfHeight.set(0,k.height*.5,0),i.rectArea[M]=pe,M++}else if(k.isPointLight){let pe=t.get(k);if(pe.color.copy(k.color).multiplyScalar(k.intensity*D),pe.distance=k.distance,pe.decay=k.decay,k.castShadow){let be=k.shadow,Me=n.get(k);Me.shadowBias=be.bias,Me.shadowNormalBias=be.normalBias,Me.shadowRadius=be.radius,Me.shadowMapSize=be.mapSize,Me.shadowCameraNear=be.camera.near,Me.shadowCameraFar=be.camera.far,i.pointShadow[p]=Me,i.pointShadowMap[p]=Ae,i.pointShadowMatrix[p]=k.shadow.matrix,O++}i.point[p]=pe,p++}else if(k.isHemisphereLight){let pe=t.get(k);pe.skyColor.copy(k.color).multiplyScalar($*D),pe.groundColor.copy(k.groundColor).multiplyScalar($*D),i.hemi[y]=pe,y++}}M>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ke.LTC_FLOAT_1,i.rectAreaLTC2=ke.LTC_FLOAT_2):(i.rectAreaLTC1=ke.LTC_HALF_1,i.rectAreaLTC2=ke.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ke.LTC_FLOAT_1,i.rectAreaLTC2=ke.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ke.LTC_HALF_1,i.rectAreaLTC2=ke.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=A,i.ambient[2]=m;let J=i.hash;(J.directionalLength!==b||J.pointLength!==p||J.spotLength!==d||J.rectAreaLength!==M||J.hemiLength!==y||J.numDirectionalShadows!==B||J.numPointShadows!==O||J.numSpotShadows!==P||J.numSpotMaps!==N||J.numLightProbes!==v)&&(i.directional.length=b,i.spot.length=d,i.rectArea.length=M,i.point.length=p,i.hemi.length=y,i.directionalShadow.length=B,i.directionalShadowMap.length=B,i.pointShadow.length=O,i.pointShadowMap.length=O,i.spotShadow.length=P,i.spotShadowMap.length=P,i.directionalShadowMatrix.length=B,i.pointShadowMatrix.length=O,i.spotLightMatrix.length=P+N-H,i.spotLightMap.length=N,i.numSpotLightShadowsWithMaps=H,i.numLightProbes=v,J.directionalLength=b,J.pointLength=p,J.spotLength=d,J.rectAreaLength=M,J.hemiLength=y,J.numDirectionalShadows=B,J.numPointShadows=O,J.numSpotShadows=P,J.numSpotMaps=N,J.numLightProbes=v,i.version=ub++)}function l(h,u){let f=0,A=0,m=0,b=0,p=0,d=u.matrixWorldInverse;for(let M=0,y=h.length;M<y;M++){let B=h[M];if(B.isDirectionalLight){let O=i.directional[f];O.direction.setFromMatrixPosition(B.matrixWorld),r.setFromMatrixPosition(B.target.matrixWorld),O.direction.sub(r),O.direction.transformDirection(d),f++}else if(B.isSpotLight){let O=i.spot[m];O.position.setFromMatrixPosition(B.matrixWorld),O.position.applyMatrix4(d),O.direction.setFromMatrixPosition(B.matrixWorld),r.setFromMatrixPosition(B.target.matrixWorld),O.direction.sub(r),O.direction.transformDirection(d),m++}else if(B.isRectAreaLight){let O=i.rectArea[b];O.position.setFromMatrixPosition(B.matrixWorld),O.position.applyMatrix4(d),o.identity(),a.copy(B.matrixWorld),a.premultiply(d),o.extractRotation(a),O.halfWidth.set(B.width*.5,0,0),O.halfHeight.set(0,B.height*.5,0),O.halfWidth.applyMatrix4(o),O.halfHeight.applyMatrix4(o),b++}else if(B.isPointLight){let O=i.point[A];O.position.setFromMatrixPosition(B.matrixWorld),O.position.applyMatrix4(d),A++}else if(B.isHemisphereLight){let O=i.hemi[p];O.direction.setFromMatrixPosition(B.matrixWorld),O.direction.transformDirection(d),p++}}}return{setup:c,setupView:l,state:i}}function Sf(s,e){let t=new db(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Ab(s,e){let t=new WeakMap;function n(r,a=0){let o=t.get(r),c;return o===void 0?(c=new Sf(s,e),t.set(r,[c])):a>=o.length?(c=new Sf(s,e),o.push(c)):c=o[a],c}function i(){t=new WeakMap}return{get:n,dispose:i}}var kl=class extends ci{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ql=class extends ci{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},pb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mb=`uniform sampler2D shadow_pass;
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
}`;function gb(s,e,t){let n=new Ka,i=new Ze,r=new Ze,a=new Rt,o=new kl({depthPacking:ap}),c=new Ql,l={},h=t.maxTextureSize,u={[qi]:Fn,[Fn]:qi,[Sn]:Sn},f=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:pb,fragmentShader:mb}),A=f.clone();A.defines.HORIZONTAL_PASS=1;let m=new an;m.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new ze(m,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sc;let d=this.type;this.render=function(P,N,H){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||P.length===0)return;let v=s.getRenderTarget(),D=s.getActiveCubeFace(),J=s.getActiveMipmapLevel(),Z=s.state;Z.setBlending(vs),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);let ue=d!==ss&&this.type===ss,k=d===ss&&this.type!==ss;for(let Y=0,$=P.length;Y<$;Y++){let fe=P[Y],Ae=fe.shadow;if(Ae===void 0){console.warn("THREE.WebGLShadowMap:",fe,"has no shadow.");continue}if(Ae.autoUpdate===!1&&Ae.needsUpdate===!1)continue;i.copy(Ae.mapSize);let pe=Ae.getFrameExtents();if(i.multiply(pe),r.copy(Ae.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/pe.x),i.x=r.x*pe.x,Ae.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/pe.y),i.y=r.y*pe.y,Ae.mapSize.y=r.y)),Ae.map===null||ue===!0||k===!0){let Me=this.type!==ss?{minFilter:Ln,magFilter:Ln}:{};Ae.map!==null&&Ae.map.dispose(),Ae.map=new Ai(i.x,i.y,Me),Ae.map.texture.name=fe.name+".shadowMap",Ae.camera.updateProjectionMatrix()}s.setRenderTarget(Ae.map),s.clear();let be=Ae.getViewportCount();for(let Me=0;Me<be;Me++){let Le=Ae.getViewport(Me);a.set(r.x*Le.x,r.y*Le.y,r.x*Le.z,r.y*Le.w),Z.viewport(a),Ae.updateMatrices(fe,Me),n=Ae.getFrustum(),B(N,H,Ae.camera,fe,this.type)}Ae.isPointLightShadow!==!0&&this.type===ss&&M(Ae,H),Ae.needsUpdate=!1}d=this.type,p.needsUpdate=!1,s.setRenderTarget(v,D,J)};function M(P,N){let H=e.update(b);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,A.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,A.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Ai(i.x,i.y)),f.uniforms.shadow_pass.value=P.map.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(N,null,H,f,b,null),A.uniforms.shadow_pass.value=P.mapPass.texture,A.uniforms.resolution.value=P.mapSize,A.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(N,null,H,A,b,null)}function y(P,N,H,v){let D=null,J=H.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(J!==void 0)D=J;else if(D=H.isPointLight===!0?c:o,s.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){let Z=D.uuid,ue=N.uuid,k=l[Z];k===void 0&&(k={},l[Z]=k);let Y=k[ue];Y===void 0&&(Y=D.clone(),k[ue]=Y,N.addEventListener("dispose",O)),D=Y}if(D.visible=N.visible,D.wireframe=N.wireframe,v===ss?D.side=N.shadowSide!==null?N.shadowSide:N.side:D.side=N.shadowSide!==null?N.shadowSide:u[N.side],D.alphaMap=N.alphaMap,D.alphaTest=N.alphaTest,D.map=N.map,D.clipShadows=N.clipShadows,D.clippingPlanes=N.clippingPlanes,D.clipIntersection=N.clipIntersection,D.displacementMap=N.displacementMap,D.displacementScale=N.displacementScale,D.displacementBias=N.displacementBias,D.wireframeLinewidth=N.wireframeLinewidth,D.linewidth=N.linewidth,H.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let Z=s.properties.get(D);Z.light=H}return D}function B(P,N,H,v,D){if(P.visible===!1)return;if(P.layers.test(N.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&D===ss)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,P.matrixWorld);let ue=e.update(P),k=P.material;if(Array.isArray(k)){let Y=ue.groups;for(let $=0,fe=Y.length;$<fe;$++){let Ae=Y[$],pe=k[Ae.materialIndex];if(pe&&pe.visible){let be=y(P,pe,v,D);P.onBeforeShadow(s,P,N,H,ue,be,Ae),s.renderBufferDirect(H,null,ue,be,P,Ae),P.onAfterShadow(s,P,N,H,ue,be,Ae)}}}else if(k.visible){let Y=y(P,k,v,D);P.onBeforeShadow(s,P,N,H,ue,Y,null),s.renderBufferDirect(H,null,ue,Y,P,null),P.onAfterShadow(s,P,N,H,ue,Y,null)}}let Z=P.children;for(let ue=0,k=Z.length;ue<k;ue++)B(Z[ue],N,H,v,D)}function O(P){P.target.removeEventListener("dispose",O);for(let H in l){let v=l[H],D=P.target.uuid;D in v&&(v[D].dispose(),delete v[D])}}}function _b(s,e,t){let n=t.isWebGL2;function i(){let U=!1,Qe=new Rt,Ge=null,ot=new Rt(0,0,0,0);return{setMask:function(it){Ge!==it&&!U&&(s.colorMask(it,it,it,it),Ge=it)},setLocked:function(it){U=it},setClear:function(it,Vt,Wt,Yt,Kn){Kn===!0&&(it*=Yt,Vt*=Yt,Wt*=Yt),Qe.set(it,Vt,Wt,Yt),ot.equals(Qe)===!1&&(s.clearColor(it,Vt,Wt,Yt),ot.copy(Qe))},reset:function(){U=!1,Ge=null,ot.set(-1,0,0,0)}}}function r(){let U=!1,Qe=null,Ge=null,ot=null;return{setTest:function(it){it?vt(s.DEPTH_TEST):at(s.DEPTH_TEST)},setMask:function(it){Qe!==it&&!U&&(s.depthMask(it),Qe=it)},setFunc:function(it){if(Ge!==it){switch(it){case FA:s.depthFunc(s.NEVER);break;case NA:s.depthFunc(s.ALWAYS);break;case UA:s.depthFunc(s.LESS);break;case Ko:s.depthFunc(s.LEQUAL);break;case OA:s.depthFunc(s.EQUAL);break;case kA:s.depthFunc(s.GEQUAL);break;case QA:s.depthFunc(s.GREATER);break;case GA:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ge=it}},setLocked:function(it){U=it},setClear:function(it){ot!==it&&(s.clearDepth(it),ot=it)},reset:function(){U=!1,Qe=null,Ge=null,ot=null}}}function a(){let U=!1,Qe=null,Ge=null,ot=null,it=null,Vt=null,Wt=null,Yt=null,Kn=null;return{setTest:function(Qt){U||(Qt?vt(s.STENCIL_TEST):at(s.STENCIL_TEST))},setMask:function(Qt){Qe!==Qt&&!U&&(s.stencilMask(Qt),Qe=Qt)},setFunc:function(Qt,Dn,ui){(Ge!==Qt||ot!==Dn||it!==ui)&&(s.stencilFunc(Qt,Dn,ui),Ge=Qt,ot=Dn,it=ui)},setOp:function(Qt,Dn,ui){(Vt!==Qt||Wt!==Dn||Yt!==ui)&&(s.stencilOp(Qt,Dn,ui),Vt=Qt,Wt=Dn,Yt=ui)},setLocked:function(Qt){U=Qt},setClear:function(Qt){Kn!==Qt&&(s.clearStencil(Qt),Kn=Qt)},reset:function(){U=!1,Qe=null,Ge=null,ot=null,it=null,Vt=null,Wt=null,Yt=null,Kn=null}}}let o=new i,c=new r,l=new a,h=new WeakMap,u=new WeakMap,f={},A={},m=new WeakMap,b=[],p=null,d=!1,M=null,y=null,B=null,O=null,P=null,N=null,H=null,v=new We(0,0,0),D=0,J=!1,Z=null,ue=null,k=null,Y=null,$=null,fe=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Ae=!1,pe=0,be=s.getParameter(s.VERSION);be.indexOf("WebGL")!==-1?(pe=parseFloat(/^WebGL (\d)/.exec(be)[1]),Ae=pe>=1):be.indexOf("OpenGL ES")!==-1&&(pe=parseFloat(/^OpenGL ES (\d)/.exec(be)[1]),Ae=pe>=2);let Me=null,Le={},ce=s.getParameter(s.SCISSOR_BOX),ve=s.getParameter(s.VIEWPORT),Ve=new Rt().fromArray(ce),nt=new Rt().fromArray(ve);function qe(U,Qe,Ge,ot){let it=new Uint8Array(4),Vt=s.createTexture();s.bindTexture(U,Vt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Wt=0;Wt<Ge;Wt++)n&&(U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY)?s.texImage3D(Qe,0,s.RGBA,1,1,ot,0,s.RGBA,s.UNSIGNED_BYTE,it):s.texImage2D(Qe+Wt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,it);return Vt}let dt={};dt[s.TEXTURE_2D]=qe(s.TEXTURE_2D,s.TEXTURE_2D,1),dt[s.TEXTURE_CUBE_MAP]=qe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(dt[s.TEXTURE_2D_ARRAY]=qe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),dt[s.TEXTURE_3D]=qe(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),vt(s.DEPTH_TEST),c.setFunc(Ko),ie(!1),w(Au),vt(s.CULL_FACE),V(vs);function vt(U){f[U]!==!0&&(s.enable(U),f[U]=!0)}function at(U){f[U]!==!1&&(s.disable(U),f[U]=!1)}function Dt(U,Qe){return A[U]!==Qe?(s.bindFramebuffer(U,Qe),A[U]=Qe,n&&(U===s.DRAW_FRAMEBUFFER&&(A[s.FRAMEBUFFER]=Qe),U===s.FRAMEBUFFER&&(A[s.DRAW_FRAMEBUFFER]=Qe)),!0):!1}function ee(U,Qe){let Ge=b,ot=!1;if(U)if(Ge=m.get(Qe),Ge===void 0&&(Ge=[],m.set(Qe,Ge)),U.isWebGLMultipleRenderTargets){let it=U.texture;if(Ge.length!==it.length||Ge[0]!==s.COLOR_ATTACHMENT0){for(let Vt=0,Wt=it.length;Vt<Wt;Vt++)Ge[Vt]=s.COLOR_ATTACHMENT0+Vt;Ge.length=it.length,ot=!0}}else Ge[0]!==s.COLOR_ATTACHMENT0&&(Ge[0]=s.COLOR_ATTACHMENT0,ot=!0);else Ge[0]!==s.BACK&&(Ge[0]=s.BACK,ot=!0);ot&&(t.isWebGL2?s.drawBuffers(Ge):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ge))}function R(U){return p!==U?(s.useProgram(U),p=U,!0):!1}let Q={[Ks]:s.FUNC_ADD,[EA]:s.FUNC_SUBTRACT,[xA]:s.FUNC_REVERSE_SUBTRACT};if(n)Q[gu]=s.MIN,Q[_u]=s.MAX;else{let U=e.get("EXT_blend_minmax");U!==null&&(Q[gu]=U.MIN_EXT,Q[_u]=U.MAX_EXT)}let q={[yA]:s.ZERO,[vA]:s.ONE,[MA]:s.SRC_COLOR,[Ml]:s.SRC_ALPHA,[RA]:s.SRC_ALPHA_SATURATE,[IA]:s.DST_COLOR,[CA]:s.DST_ALPHA,[SA]:s.ONE_MINUS_SRC_COLOR,[Sl]:s.ONE_MINUS_SRC_ALPHA,[TA]:s.ONE_MINUS_DST_COLOR,[wA]:s.ONE_MINUS_DST_ALPHA,[BA]:s.CONSTANT_COLOR,[DA]:s.ONE_MINUS_CONSTANT_COLOR,[LA]:s.CONSTANT_ALPHA,[PA]:s.ONE_MINUS_CONSTANT_ALPHA};function V(U,Qe,Ge,ot,it,Vt,Wt,Yt,Kn,Qt){if(U===vs){d===!0&&(at(s.BLEND),d=!1);return}if(d===!1&&(vt(s.BLEND),d=!0),U!==bA){if(U!==M||Qt!==J){if((y!==Ks||P!==Ks)&&(s.blendEquation(s.FUNC_ADD),y=Ks,P=Ks),Qt)switch(U){case Gr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Wo:s.blendFunc(s.ONE,s.ONE);break;case pu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case mu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Gr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Wo:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case pu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case mu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}B=null,O=null,N=null,H=null,v.set(0,0,0),D=0,M=U,J=Qt}return}it=it||Qe,Vt=Vt||Ge,Wt=Wt||ot,(Qe!==y||it!==P)&&(s.blendEquationSeparate(Q[Qe],Q[it]),y=Qe,P=it),(Ge!==B||ot!==O||Vt!==N||Wt!==H)&&(s.blendFuncSeparate(q[Ge],q[ot],q[Vt],q[Wt]),B=Ge,O=ot,N=Vt,H=Wt),(Yt.equals(v)===!1||Kn!==D)&&(s.blendColor(Yt.r,Yt.g,Yt.b,Kn),v.copy(Yt),D=Kn),M=U,J=!1}function le(U,Qe){U.side===Sn?at(s.CULL_FACE):vt(s.CULL_FACE);let Ge=U.side===Fn;Qe&&(Ge=!Ge),ie(Ge),U.blending===Gr&&U.transparent===!1?V(vs):V(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),c.setFunc(U.depthFunc),c.setTest(U.depthTest),c.setMask(U.depthWrite),o.setMask(U.colorWrite);let ot=U.stencilWrite;l.setTest(ot),ot&&(l.setMask(U.stencilWriteMask),l.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),l.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),K(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?vt(s.SAMPLE_ALPHA_TO_COVERAGE):at(s.SAMPLE_ALPHA_TO_COVERAGE)}function ie(U){Z!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),Z=U)}function w(U){U!==mA?(vt(s.CULL_FACE),U!==ue&&(U===Au?s.cullFace(s.BACK):U===gA?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):at(s.CULL_FACE),ue=U}function x(U){U!==k&&(Ae&&s.lineWidth(U),k=U)}function K(U,Qe,Ge){U?(vt(s.POLYGON_OFFSET_FILL),(Y!==Qe||$!==Ge)&&(s.polygonOffset(Qe,Ge),Y=Qe,$=Ge)):at(s.POLYGON_OFFSET_FILL)}function de(U){U?vt(s.SCISSOR_TEST):at(s.SCISSOR_TEST)}function me(U){U===void 0&&(U=s.TEXTURE0+fe-1),Me!==U&&(s.activeTexture(U),Me=U)}function xe(U,Qe,Ge){Ge===void 0&&(Me===null?Ge=s.TEXTURE0+fe-1:Ge=Me);let ot=Le[Ge];ot===void 0&&(ot={type:void 0,texture:void 0},Le[Ge]=ot),(ot.type!==U||ot.texture!==Qe)&&(Me!==Ge&&(s.activeTexture(Ge),Me=Ge),s.bindTexture(U,Qe||dt[U]),ot.type=U,ot.texture=Qe)}function Ne(){let U=Le[Me];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Re(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Oe(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function je(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ht(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ee(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ue(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pe(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function lt(U){Ve.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),Ve.copy(U))}function Te(U){nt.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),nt.copy(U))}function Xt(U,Qe){let Ge=u.get(Qe);Ge===void 0&&(Ge=new WeakMap,u.set(Qe,Ge));let ot=Ge.get(U);ot===void 0&&(ot=s.getUniformBlockIndex(Qe,U.name),Ge.set(U,ot))}function Ye(U,Qe){let ot=u.get(Qe).get(U);h.get(Qe)!==ot&&(s.uniformBlockBinding(Qe,ot,U.__bindingPointIndex),h.set(Qe,ot))}function Be(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},Me=null,Le={},A={},m=new WeakMap,b=[],p=null,d=!1,M=null,y=null,B=null,O=null,P=null,N=null,H=null,v=new We(0,0,0),D=0,J=!1,Z=null,ue=null,k=null,Y=null,$=null,Ve.set(0,0,s.canvas.width,s.canvas.height),nt.set(0,0,s.canvas.width,s.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:vt,disable:at,bindFramebuffer:Dt,drawBuffers:ee,useProgram:R,setBlending:V,setMaterial:le,setFlipSided:ie,setCullFace:w,setLineWidth:x,setPolygonOffset:K,setScissorTest:de,activeTexture:me,bindTexture:xe,unbindTexture:Ne,compressedTexImage2D:Re,compressedTexImage3D:Oe,texImage2D:Ue,texImage3D:Pe,updateUBOMapping:Xt,uniformBlockBinding:Ye,texStorage2D:Mt,texStorage3D:Ee,texSubImage2D:je,texSubImage3D:Et,compressedTexSubImage2D:Ce,compressedTexSubImage3D:Ht,scissor:lt,viewport:Te,reset:Be}}function bb(s,e,t,n,i,r,a){let o=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,f=new WeakMap,A=!1;try{A=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(w,x){return A?new OffscreenCanvas(w,x):Va("canvas")}function b(w,x,K,de){let me=1;if((w.width>de||w.height>de)&&(me=de/Math.max(w.width,w.height)),me<1||x===!0)if(typeof HTMLImageElement!="undefined"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&w instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&w instanceof ImageBitmap){let xe=x?sc:Math.floor,Ne=xe(me*w.width),Re=xe(me*w.height);u===void 0&&(u=m(Ne,Re));let Oe=K?m(Ne,Re):u;return Oe.width=Ne,Oe.height=Re,Oe.getContext("2d").drawImage(w,0,0,Ne,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+Ne+"x"+Re+")."),Oe}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function p(w){return Tl(w.width)&&Tl(w.height)}function d(w){return o?!1:w.wrapS!==Gn||w.wrapT!==Gn||w.minFilter!==Ln&&w.minFilter!==qt}function M(w,x){return w.generateMipmaps&&x&&w.minFilter!==Ln&&w.minFilter!==qt}function y(w){s.generateMipmap(w)}function B(w,x,K,de,me=!1){if(o===!1)return x;if(w!==null){if(s[w]!==void 0)return s[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let xe=x;if(x===s.RED&&(K===s.FLOAT&&(xe=s.R32F),K===s.HALF_FLOAT&&(xe=s.R16F),K===s.UNSIGNED_BYTE&&(xe=s.R8)),x===s.RED_INTEGER&&(K===s.UNSIGNED_BYTE&&(xe=s.R8UI),K===s.UNSIGNED_SHORT&&(xe=s.R16UI),K===s.UNSIGNED_INT&&(xe=s.R32UI),K===s.BYTE&&(xe=s.R8I),K===s.SHORT&&(xe=s.R16I),K===s.INT&&(xe=s.R32I)),x===s.RG&&(K===s.FLOAT&&(xe=s.RG32F),K===s.HALF_FLOAT&&(xe=s.RG16F),K===s.UNSIGNED_BYTE&&(xe=s.RG8)),x===s.RGBA){let Ne=me?ec:jt.getTransfer(de);K===s.FLOAT&&(xe=s.RGBA32F),K===s.HALF_FLOAT&&(xe=s.RGBA16F),K===s.UNSIGNED_BYTE&&(xe=Ne===mn?s.SRGB8_ALPHA8:s.RGBA8),K===s.UNSIGNED_SHORT_4_4_4_4&&(xe=s.RGBA4),K===s.UNSIGNED_SHORT_5_5_5_1&&(xe=s.RGB5_A1)}return(xe===s.R16F||xe===s.R32F||xe===s.RG16F||xe===s.RG32F||xe===s.RGBA16F||xe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),xe}function O(w,x,K){return M(w,K)===!0||w.isFramebufferTexture&&w.minFilter!==Ln&&w.minFilter!==qt?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function P(w){return w===Ln||w===qo||w===La?s.NEAREST:s.LINEAR}function N(w){let x=w.target;x.removeEventListener("dispose",N),v(x),x.isVideoTexture&&h.delete(x)}function H(w){let x=w.target;x.removeEventListener("dispose",H),J(x)}function v(w){let x=n.get(w);if(x.__webglInit===void 0)return;let K=w.source,de=f.get(K);if(de){let me=de[x.__cacheKey];me.usedTimes--,me.usedTimes===0&&D(w),Object.keys(de).length===0&&f.delete(K)}n.remove(w)}function D(w){let x=n.get(w);s.deleteTexture(x.__webglTexture);let K=w.source,de=f.get(K);delete de[x.__cacheKey],a.memory.textures--}function J(w){let x=w.texture,K=n.get(w),de=n.get(x);if(de.__webglTexture!==void 0&&(s.deleteTexture(de.__webglTexture),a.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let me=0;me<6;me++){if(Array.isArray(K.__webglFramebuffer[me]))for(let xe=0;xe<K.__webglFramebuffer[me].length;xe++)s.deleteFramebuffer(K.__webglFramebuffer[me][xe]);else s.deleteFramebuffer(K.__webglFramebuffer[me]);K.__webglDepthbuffer&&s.deleteRenderbuffer(K.__webglDepthbuffer[me])}else{if(Array.isArray(K.__webglFramebuffer))for(let me=0;me<K.__webglFramebuffer.length;me++)s.deleteFramebuffer(K.__webglFramebuffer[me]);else s.deleteFramebuffer(K.__webglFramebuffer);if(K.__webglDepthbuffer&&s.deleteRenderbuffer(K.__webglDepthbuffer),K.__webglMultisampledFramebuffer&&s.deleteFramebuffer(K.__webglMultisampledFramebuffer),K.__webglColorRenderbuffer)for(let me=0;me<K.__webglColorRenderbuffer.length;me++)K.__webglColorRenderbuffer[me]&&s.deleteRenderbuffer(K.__webglColorRenderbuffer[me]);K.__webglDepthRenderbuffer&&s.deleteRenderbuffer(K.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let me=0,xe=x.length;me<xe;me++){let Ne=n.get(x[me]);Ne.__webglTexture&&(s.deleteTexture(Ne.__webglTexture),a.memory.textures--),n.remove(x[me])}n.remove(x),n.remove(w)}let Z=0;function ue(){Z=0}function k(){let w=Z;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),Z+=1,w}function Y(w){let x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function $(w,x){let K=n.get(w);if(w.isVideoTexture&&le(w),w.isRenderTargetTexture===!1&&w.version>0&&K.__version!==w.version){let de=w.image;if(de===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(de.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ve(K,w,x);return}}t.bindTexture(s.TEXTURE_2D,K.__webglTexture,s.TEXTURE0+x)}function fe(w,x){let K=n.get(w);if(w.version>0&&K.__version!==w.version){Ve(K,w,x);return}t.bindTexture(s.TEXTURE_2D_ARRAY,K.__webglTexture,s.TEXTURE0+x)}function Ae(w,x){let K=n.get(w);if(w.version>0&&K.__version!==w.version){Ve(K,w,x);return}t.bindTexture(s.TEXTURE_3D,K.__webglTexture,s.TEXTURE0+x)}function pe(w,x){let K=n.get(w);if(w.version>0&&K.__version!==w.version){nt(K,w,x);return}t.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture,s.TEXTURE0+x)}let be={[ai]:s.REPEAT,[Gn]:s.CLAMP_TO_EDGE,[Ha]:s.MIRRORED_REPEAT},Me={[Ln]:s.NEAREST,[qo]:s.NEAREST_MIPMAP_NEAREST,[La]:s.NEAREST_MIPMAP_LINEAR,[qt]:s.LINEAR,[rh]:s.LINEAR_MIPMAP_NEAREST,[Zn]:s.LINEAR_MIPMAP_LINEAR},Le={[cp]:s.NEVER,[Ap]:s.ALWAYS,[lp]:s.LESS,[nd]:s.LEQUAL,[hp]:s.EQUAL,[dp]:s.GEQUAL,[up]:s.GREATER,[fp]:s.NOTEQUAL};function ce(w,x,K){if(K?(s.texParameteri(w,s.TEXTURE_WRAP_S,be[x.wrapS]),s.texParameteri(w,s.TEXTURE_WRAP_T,be[x.wrapT]),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,be[x.wrapR]),s.texParameteri(w,s.TEXTURE_MAG_FILTER,Me[x.magFilter]),s.texParameteri(w,s.TEXTURE_MIN_FILTER,Me[x.minFilter])):(s.texParameteri(w,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(w,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(x.wrapS!==Gn||x.wrapT!==Gn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(w,s.TEXTURE_MAG_FILTER,P(x.magFilter)),s.texParameteri(w,s.TEXTURE_MIN_FILTER,P(x.minFilter)),x.minFilter!==Ln&&x.minFilter!==qt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(s.texParameteri(w,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(w,s.TEXTURE_COMPARE_FUNC,Le[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let de=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===Ln||x.minFilter!==La&&x.minFilter!==Zn||x.type===zn&&e.has("OES_texture_float_linear")===!1||o===!1&&x.type===oi&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||n.get(x).__currentAnisotropy)&&(s.texParameterf(w,de.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy)}}function ve(w,x){let K=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",N));let de=x.source,me=f.get(de);me===void 0&&(me={},f.set(de,me));let xe=Y(x);if(xe!==w.__cacheKey){me[xe]===void 0&&(me[xe]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,K=!0),me[xe].usedTimes++;let Ne=me[w.__cacheKey];Ne!==void 0&&(me[w.__cacheKey].usedTimes--,Ne.usedTimes===0&&D(x)),w.__cacheKey=xe,w.__webglTexture=me[xe].texture}return K}function Ve(w,x,K){let de=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(de=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(de=s.TEXTURE_3D);let me=ve(w,x),xe=x.source;t.bindTexture(de,w.__webglTexture,s.TEXTURE0+K);let Ne=n.get(xe);if(xe.version!==Ne.__version||me===!0){t.activeTexture(s.TEXTURE0+K);let Re=jt.getPrimaries(jt.workingColorSpace),Oe=x.colorSpace===Hn?null:jt.getPrimaries(x.colorSpace),je=x.colorSpace===Hn||Re===Oe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,je);let Et=d(x)&&p(x.image)===!1,Ce=b(x.image,Et,!1,i.maxTextureSize);Ce=ie(x,Ce);let Ht=p(Ce)||o,Mt=r.convert(x.format,x.colorSpace),Ee=r.convert(x.type),Ue=B(x.internalFormat,Mt,Ee,x.colorSpace,x.isVideoTexture);ce(de,x,Ht);let Pe,lt=x.mipmaps,Te=o&&x.isVideoTexture!==!0&&Ue!==Ic,Xt=Ne.__version===void 0||me===!0,Ye=O(x,Ce,Ht);if(x.isDepthTexture)Ue=s.DEPTH_COMPONENT,o?x.type===zn?Ue=s.DEPTH_COMPONENT32F:x.type===xs?Ue=s.DEPTH_COMPONENT24:x.type===Ys?Ue=s.DEPTH24_STENCIL8:Ue=s.DEPTH_COMPONENT16:x.type===zn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===Js&&Ue===s.DEPTH_COMPONENT&&x.type!==ah&&x.type!==xs&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=xs,Ee=r.convert(x.type)),x.format===Wr&&Ue===s.DEPTH_COMPONENT&&(Ue=s.DEPTH_STENCIL,x.type!==Ys&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=Ys,Ee=r.convert(x.type))),Xt&&(Te?t.texStorage2D(s.TEXTURE_2D,1,Ue,Ce.width,Ce.height):t.texImage2D(s.TEXTURE_2D,0,Ue,Ce.width,Ce.height,0,Mt,Ee,null));else if(x.isDataTexture)if(lt.length>0&&Ht){Te&&Xt&&t.texStorage2D(s.TEXTURE_2D,Ye,Ue,lt[0].width,lt[0].height);for(let Be=0,U=lt.length;Be<U;Be++)Pe=lt[Be],Te?t.texSubImage2D(s.TEXTURE_2D,Be,0,0,Pe.width,Pe.height,Mt,Ee,Pe.data):t.texImage2D(s.TEXTURE_2D,Be,Ue,Pe.width,Pe.height,0,Mt,Ee,Pe.data);x.generateMipmaps=!1}else Te?(Xt&&t.texStorage2D(s.TEXTURE_2D,Ye,Ue,Ce.width,Ce.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ce.width,Ce.height,Mt,Ee,Ce.data)):t.texImage2D(s.TEXTURE_2D,0,Ue,Ce.width,Ce.height,0,Mt,Ee,Ce.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Te&&Xt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ye,Ue,lt[0].width,lt[0].height,Ce.depth);for(let Be=0,U=lt.length;Be<U;Be++)Pe=lt[Be],x.format!==Cn?Mt!==null?Te?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Be,0,0,0,Pe.width,Pe.height,Ce.depth,Mt,Pe.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Be,Ue,Pe.width,Pe.height,Ce.depth,0,Pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Te?t.texSubImage3D(s.TEXTURE_2D_ARRAY,Be,0,0,0,Pe.width,Pe.height,Ce.depth,Mt,Ee,Pe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Be,Ue,Pe.width,Pe.height,Ce.depth,0,Mt,Ee,Pe.data)}else{Te&&Xt&&t.texStorage2D(s.TEXTURE_2D,Ye,Ue,lt[0].width,lt[0].height);for(let Be=0,U=lt.length;Be<U;Be++)Pe=lt[Be],x.format!==Cn?Mt!==null?Te?t.compressedTexSubImage2D(s.TEXTURE_2D,Be,0,0,Pe.width,Pe.height,Mt,Pe.data):t.compressedTexImage2D(s.TEXTURE_2D,Be,Ue,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Te?t.texSubImage2D(s.TEXTURE_2D,Be,0,0,Pe.width,Pe.height,Mt,Ee,Pe.data):t.texImage2D(s.TEXTURE_2D,Be,Ue,Pe.width,Pe.height,0,Mt,Ee,Pe.data)}else if(x.isDataArrayTexture)Te?(Xt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ye,Ue,Ce.width,Ce.height,Ce.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Ce.width,Ce.height,Ce.depth,Mt,Ee,Ce.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ue,Ce.width,Ce.height,Ce.depth,0,Mt,Ee,Ce.data);else if(x.isData3DTexture)Te?(Xt&&t.texStorage3D(s.TEXTURE_3D,Ye,Ue,Ce.width,Ce.height,Ce.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Ce.width,Ce.height,Ce.depth,Mt,Ee,Ce.data)):t.texImage3D(s.TEXTURE_3D,0,Ue,Ce.width,Ce.height,Ce.depth,0,Mt,Ee,Ce.data);else if(x.isFramebufferTexture){if(Xt)if(Te)t.texStorage2D(s.TEXTURE_2D,Ye,Ue,Ce.width,Ce.height);else{let Be=Ce.width,U=Ce.height;for(let Qe=0;Qe<Ye;Qe++)t.texImage2D(s.TEXTURE_2D,Qe,Ue,Be,U,0,Mt,Ee,null),Be>>=1,U>>=1}}else if(lt.length>0&&Ht){Te&&Xt&&t.texStorage2D(s.TEXTURE_2D,Ye,Ue,lt[0].width,lt[0].height);for(let Be=0,U=lt.length;Be<U;Be++)Pe=lt[Be],Te?t.texSubImage2D(s.TEXTURE_2D,Be,0,0,Mt,Ee,Pe):t.texImage2D(s.TEXTURE_2D,Be,Ue,Mt,Ee,Pe);x.generateMipmaps=!1}else Te?(Xt&&t.texStorage2D(s.TEXTURE_2D,Ye,Ue,Ce.width,Ce.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Mt,Ee,Ce)):t.texImage2D(s.TEXTURE_2D,0,Ue,Mt,Ee,Ce);M(x,Ht)&&y(de),Ne.__version=xe.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function nt(w,x,K){if(x.image.length!==6)return;let de=ve(w,x),me=x.source;t.bindTexture(s.TEXTURE_CUBE_MAP,w.__webglTexture,s.TEXTURE0+K);let xe=n.get(me);if(me.version!==xe.__version||de===!0){t.activeTexture(s.TEXTURE0+K);let Ne=jt.getPrimaries(jt.workingColorSpace),Re=x.colorSpace===Hn?null:jt.getPrimaries(x.colorSpace),Oe=x.colorSpace===Hn||Ne===Re?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);let je=x.isCompressedTexture||x.image[0].isCompressedTexture,Et=x.image[0]&&x.image[0].isDataTexture,Ce=[];for(let Be=0;Be<6;Be++)!je&&!Et?Ce[Be]=b(x.image[Be],!1,!0,i.maxCubemapSize):Ce[Be]=Et?x.image[Be].image:x.image[Be],Ce[Be]=ie(x,Ce[Be]);let Ht=Ce[0],Mt=p(Ht)||o,Ee=r.convert(x.format,x.colorSpace),Ue=r.convert(x.type),Pe=B(x.internalFormat,Ee,Ue,x.colorSpace),lt=o&&x.isVideoTexture!==!0,Te=xe.__version===void 0||de===!0,Xt=O(x,Ht,Mt);ce(s.TEXTURE_CUBE_MAP,x,Mt);let Ye;if(je){lt&&Te&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Xt,Pe,Ht.width,Ht.height);for(let Be=0;Be<6;Be++){Ye=Ce[Be].mipmaps;for(let U=0;U<Ye.length;U++){let Qe=Ye[U];x.format!==Cn?Ee!==null?lt?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,U,0,0,Qe.width,Qe.height,Ee,Qe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,U,Pe,Qe.width,Qe.height,0,Qe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):lt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,U,0,0,Qe.width,Qe.height,Ee,Ue,Qe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,U,Pe,Qe.width,Qe.height,0,Ee,Ue,Qe.data)}}}else{Ye=x.mipmaps,lt&&Te&&(Ye.length>0&&Xt++,t.texStorage2D(s.TEXTURE_CUBE_MAP,Xt,Pe,Ce[0].width,Ce[0].height));for(let Be=0;Be<6;Be++)if(Et){lt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,Ce[Be].width,Ce[Be].height,Ee,Ue,Ce[Be].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,Pe,Ce[Be].width,Ce[Be].height,0,Ee,Ue,Ce[Be].data);for(let U=0;U<Ye.length;U++){let Ge=Ye[U].image[Be].image;lt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,U+1,0,0,Ge.width,Ge.height,Ee,Ue,Ge.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,U+1,Pe,Ge.width,Ge.height,0,Ee,Ue,Ge.data)}}else{lt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,Ee,Ue,Ce[Be]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,Pe,Ee,Ue,Ce[Be]);for(let U=0;U<Ye.length;U++){let Qe=Ye[U];lt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,U+1,0,0,Ee,Ue,Qe.image[Be]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Be,U+1,Pe,Ee,Ue,Qe.image[Be])}}}M(x,Mt)&&y(s.TEXTURE_CUBE_MAP),xe.__version=me.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function qe(w,x,K,de,me,xe){let Ne=r.convert(K.format,K.colorSpace),Re=r.convert(K.type),Oe=B(K.internalFormat,Ne,Re,K.colorSpace);if(!n.get(x).__hasExternalTextures){let Et=Math.max(1,x.width>>xe),Ce=Math.max(1,x.height>>xe);me===s.TEXTURE_3D||me===s.TEXTURE_2D_ARRAY?t.texImage3D(me,xe,Oe,Et,Ce,x.depth,0,Ne,Re,null):t.texImage2D(me,xe,Oe,Et,Ce,0,Ne,Re,null)}t.bindFramebuffer(s.FRAMEBUFFER,w),V(x)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,de,me,n.get(K).__webglTexture,0,q(x)):(me===s.TEXTURE_2D||me>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&me<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,de,me,n.get(K).__webglTexture,xe),t.bindFramebuffer(s.FRAMEBUFFER,null)}function dt(w,x,K){if(s.bindRenderbuffer(s.RENDERBUFFER,w),x.depthBuffer&&!x.stencilBuffer){let de=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(K||V(x)){let me=x.depthTexture;me&&me.isDepthTexture&&(me.type===zn?de=s.DEPTH_COMPONENT32F:me.type===xs&&(de=s.DEPTH_COMPONENT24));let xe=q(x);V(x)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,xe,de,x.width,x.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,xe,de,x.width,x.height)}else s.renderbufferStorage(s.RENDERBUFFER,de,x.width,x.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,w)}else if(x.depthBuffer&&x.stencilBuffer){let de=q(x);K&&V(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,de,s.DEPTH24_STENCIL8,x.width,x.height):V(x)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,de,s.DEPTH24_STENCIL8,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,w)}else{let de=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let me=0;me<de.length;me++){let xe=de[me],Ne=r.convert(xe.format,xe.colorSpace),Re=r.convert(xe.type),Oe=B(xe.internalFormat,Ne,Re,xe.colorSpace),je=q(x);K&&V(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,je,Oe,x.width,x.height):V(x)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,je,Oe,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,Oe,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function vt(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),$(x.depthTexture,0);let de=n.get(x.depthTexture).__webglTexture,me=q(x);if(x.depthTexture.format===Js)V(x)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,de,0,me):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,de,0);else if(x.depthTexture.format===Wr)V(x)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,de,0,me):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,de,0);else throw new Error("Unknown depthTexture format")}function at(w){let x=n.get(w),K=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");vt(x.__webglFramebuffer,w)}else if(K){x.__webglDepthbuffer=[];for(let de=0;de<6;de++)t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[de]),x.__webglDepthbuffer[de]=s.createRenderbuffer(),dt(x.__webglDepthbuffer[de],w,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=s.createRenderbuffer(),dt(x.__webglDepthbuffer,w,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Dt(w,x,K){let de=n.get(w);x!==void 0&&qe(de.__webglFramebuffer,w,w.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),K!==void 0&&at(w)}function ee(w){let x=w.texture,K=n.get(w),de=n.get(x);w.addEventListener("dispose",H),w.isWebGLMultipleRenderTargets!==!0&&(de.__webglTexture===void 0&&(de.__webglTexture=s.createTexture()),de.__version=x.version,a.memory.textures++);let me=w.isWebGLCubeRenderTarget===!0,xe=w.isWebGLMultipleRenderTargets===!0,Ne=p(w)||o;if(me){K.__webglFramebuffer=[];for(let Re=0;Re<6;Re++)if(o&&x.mipmaps&&x.mipmaps.length>0){K.__webglFramebuffer[Re]=[];for(let Oe=0;Oe<x.mipmaps.length;Oe++)K.__webglFramebuffer[Re][Oe]=s.createFramebuffer()}else K.__webglFramebuffer[Re]=s.createFramebuffer()}else{if(o&&x.mipmaps&&x.mipmaps.length>0){K.__webglFramebuffer=[];for(let Re=0;Re<x.mipmaps.length;Re++)K.__webglFramebuffer[Re]=s.createFramebuffer()}else K.__webglFramebuffer=s.createFramebuffer();if(xe)if(i.drawBuffers){let Re=w.texture;for(let Oe=0,je=Re.length;Oe<je;Oe++){let Et=n.get(Re[Oe]);Et.__webglTexture===void 0&&(Et.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&w.samples>0&&V(w)===!1){let Re=xe?x:[x];K.__webglMultisampledFramebuffer=s.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let Oe=0;Oe<Re.length;Oe++){let je=Re[Oe];K.__webglColorRenderbuffer[Oe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,K.__webglColorRenderbuffer[Oe]);let Et=r.convert(je.format,je.colorSpace),Ce=r.convert(je.type),Ht=B(je.internalFormat,Et,Ce,je.colorSpace,w.isXRRenderTarget===!0),Mt=q(w);s.renderbufferStorageMultisample(s.RENDERBUFFER,Mt,Ht,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Oe,s.RENDERBUFFER,K.__webglColorRenderbuffer[Oe])}s.bindRenderbuffer(s.RENDERBUFFER,null),w.depthBuffer&&(K.__webglDepthRenderbuffer=s.createRenderbuffer(),dt(K.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(me){t.bindTexture(s.TEXTURE_CUBE_MAP,de.__webglTexture),ce(s.TEXTURE_CUBE_MAP,x,Ne);for(let Re=0;Re<6;Re++)if(o&&x.mipmaps&&x.mipmaps.length>0)for(let Oe=0;Oe<x.mipmaps.length;Oe++)qe(K.__webglFramebuffer[Re][Oe],w,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Oe);else qe(K.__webglFramebuffer[Re],w,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0);M(x,Ne)&&y(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){let Re=w.texture;for(let Oe=0,je=Re.length;Oe<je;Oe++){let Et=Re[Oe],Ce=n.get(Et);t.bindTexture(s.TEXTURE_2D,Ce.__webglTexture),ce(s.TEXTURE_2D,Et,Ne),qe(K.__webglFramebuffer,w,Et,s.COLOR_ATTACHMENT0+Oe,s.TEXTURE_2D,0),M(Et,Ne)&&y(s.TEXTURE_2D)}t.unbindTexture()}else{let Re=s.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(o?Re=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Re,de.__webglTexture),ce(Re,x,Ne),o&&x.mipmaps&&x.mipmaps.length>0)for(let Oe=0;Oe<x.mipmaps.length;Oe++)qe(K.__webglFramebuffer[Oe],w,x,s.COLOR_ATTACHMENT0,Re,Oe);else qe(K.__webglFramebuffer,w,x,s.COLOR_ATTACHMENT0,Re,0);M(x,Ne)&&y(Re),t.unbindTexture()}w.depthBuffer&&at(w)}function R(w){let x=p(w)||o,K=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let de=0,me=K.length;de<me;de++){let xe=K[de];if(M(xe,x)){let Ne=w.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Re=n.get(xe).__webglTexture;t.bindTexture(Ne,Re),y(Ne),t.unbindTexture()}}}function Q(w){if(o&&w.samples>0&&V(w)===!1){let x=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],K=w.width,de=w.height,me=s.COLOR_BUFFER_BIT,xe=[],Ne=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Re=n.get(w),Oe=w.isWebGLMultipleRenderTargets===!0;if(Oe)for(let je=0;je<x.length;je++)t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+je,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+je,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let je=0;je<x.length;je++){xe.push(s.COLOR_ATTACHMENT0+je),w.depthBuffer&&xe.push(Ne);let Et=Re.__ignoreDepthValues!==void 0?Re.__ignoreDepthValues:!1;if(Et===!1&&(w.depthBuffer&&(me|=s.DEPTH_BUFFER_BIT),w.stencilBuffer&&(me|=s.STENCIL_BUFFER_BIT)),Oe&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Re.__webglColorRenderbuffer[je]),Et===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Ne]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Ne])),Oe){let Ce=n.get(x[je]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ce,0)}s.blitFramebuffer(0,0,K,de,0,0,K,de,me,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,xe)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Oe)for(let je=0;je<x.length;je++){t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+je,s.RENDERBUFFER,Re.__webglColorRenderbuffer[je]);let Et=n.get(x[je]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+je,s.TEXTURE_2D,Et,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}}function q(w){return Math.min(i.maxSamples,w.samples)}function V(w){let x=n.get(w);return o&&w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function le(w){let x=a.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function ie(w,x){let K=w.colorSpace,de=w.format,me=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===Il||K!==bn&&K!==Hn&&(jt.getTransfer(K)===mn?o===!1?e.has("EXT_sRGB")===!0&&de===Cn?(w.format=Il,w.minFilter=qt,w.generateMipmaps=!1):x=rc.sRGBToLinear(x):(de!==Cn||me!==Bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),x}this.allocateTextureUnit=k,this.resetTextureUnits=ue,this.setTexture2D=$,this.setTexture2DArray=fe,this.setTexture3D=Ae,this.setTextureCube=pe,this.rebindTextures=Dt,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=qe,this.useMultisampledRTT=V}function Eb(s,e,t){let n=t.isWebGL2;function i(r,a=Hn){let o,c=jt.getTransfer(a);if(r===Bn)return s.UNSIGNED_BYTE;if(r===Yf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Jf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===JA)return s.BYTE;if(r===jA)return s.SHORT;if(r===ah)return s.UNSIGNED_SHORT;if(r===Xf)return s.INT;if(r===xs)return s.UNSIGNED_INT;if(r===zn)return s.FLOAT;if(r===oi)return n?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===ZA)return s.ALPHA;if(r===Cn)return s.RGBA;if(r===$A)return s.LUMINANCE;if(r===ep)return s.LUMINANCE_ALPHA;if(r===Js)return s.DEPTH_COMPONENT;if(r===Wr)return s.DEPTH_STENCIL;if(r===Il)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===rr)return s.RED;if(r===jf)return s.RED_INTEGER;if(r===ar)return s.RG;if(r===Zf)return s.RG_INTEGER;if(r===$f)return s.RGBA_INTEGER;if(r===Pa||r===qc||r===Xc||r===Fa)if(c===mn)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Pa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===qc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Xc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Fa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Pa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===qc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Xc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Fa)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Xo||r===Eu||r===Yo||r===xu)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Xo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Eu)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Yo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===xu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ic)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Jo||r===jo)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Jo)return c===mn?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===jo)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Zo||r===yu||r===vu||r===Mu||r===za||r===Su||r===Cu||r===wu||r===Iu||r===Tu||r===Ru||r===Bu||r===Du||r===Lu)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Zo)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===yu)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===vu)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Mu)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===za)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Su)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Cu)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===wu)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Iu)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Tu)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Ru)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Bu)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Du)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Lu)return c===mn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Na||r===Pu||r===Fu)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Na)return c===mn?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Pu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Fu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===tp||r===Nu||r===Uu||r===Ou)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Na)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Nu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Uu)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ou)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ys?n?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}var Gl=class extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Pn=class extends ln{constructor(){super(),this.isGroup=!0,this.type="Group"}},xb={type:"move"},Qa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let b of e.hand.values()){let p=t.getJointPose(b,n),d=this._getHandJoint(l,b);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),A=.02,m=.005;l.inputState.pinching&&f>A+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=A-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(xb)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Pn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Hl=class extends cs{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,A=null,m=null,b=t.getContextAttributes(),p=null,d=null,M=[],y=[],B=new Ze,O=null,P=new _n;P.layers.enable(1),P.viewport=new Rt;let N=new _n;N.layers.enable(2),N.viewport=new Rt;let H=[P,N],v=new Gl;v.layers.enable(1),v.layers.enable(2);let D=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ce){let ve=M[ce];return ve===void 0&&(ve=new Qa,M[ce]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(ce){let ve=M[ce];return ve===void 0&&(ve=new Qa,M[ce]=ve),ve.getGripSpace()},this.getHand=function(ce){let ve=M[ce];return ve===void 0&&(ve=new Qa,M[ce]=ve),ve.getHandSpace()};function Z(ce){let ve=y.indexOf(ce.inputSource);if(ve===-1)return;let Ve=M[ve];Ve!==void 0&&(Ve.update(ce.inputSource,ce.frame,l||a),Ve.dispatchEvent({type:ce.type,data:ce.inputSource}))}function ue(){i.removeEventListener("select",Z),i.removeEventListener("selectstart",Z),i.removeEventListener("selectend",Z),i.removeEventListener("squeeze",Z),i.removeEventListener("squeezestart",Z),i.removeEventListener("squeezeend",Z),i.removeEventListener("end",ue),i.removeEventListener("inputsourceschange",k);for(let ce=0;ce<M.length;ce++){let ve=y[ce];ve!==null&&(y[ce]=null,M[ce].disconnect(ve))}D=null,J=null,e.setRenderTarget(p),A=null,f=null,u=null,i=null,d=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(B.width,B.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ce){r=ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ce){o=ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ce){l=ce},this.getBaseLayer=function(){return f!==null?f:A},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(ce){if(i=ce,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",Z),i.addEventListener("selectstart",Z),i.addEventListener("selectend",Z),i.addEventListener("squeeze",Z),i.addEventListener("squeezestart",Z),i.addEventListener("squeezeend",Z),i.addEventListener("end",ue),i.addEventListener("inputsourceschange",k),b.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(B),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let ve={antialias:i.renderState.layers===void 0?b.antialias:!0,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};A=new XRWebGLLayer(i,t,ve),i.updateRenderState({baseLayer:A}),e.setPixelRatio(1),e.setSize(A.framebufferWidth,A.framebufferHeight,!1),d=new Ai(A.framebufferWidth,A.framebufferHeight,{format:Cn,type:Bn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil})}else{let ve=null,Ve=null,nt=null;b.depth&&(nt=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=b.stencil?Wr:Js,Ve=b.stencil?Ys:xs);let qe={colorFormat:t.RGBA8,depthFormat:nt,scaleFactor:r};u=new XRWebGLBinding(i,t),f=u.createProjectionLayer(qe),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),d=new Ai(f.textureWidth,f.textureHeight,{format:Cn,type:Bn,depthTexture:new fc(f.textureWidth,f.textureHeight,Ve,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0});let dt=e.properties.get(d);dt.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Le.setContext(i),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function k(ce){for(let ve=0;ve<ce.removed.length;ve++){let Ve=ce.removed[ve],nt=y.indexOf(Ve);nt>=0&&(y[nt]=null,M[nt].disconnect(Ve))}for(let ve=0;ve<ce.added.length;ve++){let Ve=ce.added[ve],nt=y.indexOf(Ve);if(nt===-1){for(let dt=0;dt<M.length;dt++)if(dt>=y.length){y.push(Ve),nt=dt;break}else if(y[dt]===null){y[dt]=Ve,nt=dt;break}if(nt===-1)break}let qe=M[nt];qe&&qe.connect(Ve)}}let Y=new G,$=new G;function fe(ce,ve,Ve){Y.setFromMatrixPosition(ve.matrixWorld),$.setFromMatrixPosition(Ve.matrixWorld);let nt=Y.distanceTo($),qe=ve.projectionMatrix.elements,dt=Ve.projectionMatrix.elements,vt=qe[14]/(qe[10]-1),at=qe[14]/(qe[10]+1),Dt=(qe[9]+1)/qe[5],ee=(qe[9]-1)/qe[5],R=(qe[8]-1)/qe[0],Q=(dt[8]+1)/dt[0],q=vt*R,V=vt*Q,le=nt/(-R+Q),ie=le*-R;ve.matrixWorld.decompose(ce.position,ce.quaternion,ce.scale),ce.translateX(ie),ce.translateZ(le),ce.matrixWorld.compose(ce.position,ce.quaternion,ce.scale),ce.matrixWorldInverse.copy(ce.matrixWorld).invert();let w=vt+le,x=at+le,K=q-ie,de=V+(nt-ie),me=Dt*at/x*w,xe=ee*at/x*w;ce.projectionMatrix.makePerspective(K,de,me,xe,w,x),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert()}function Ae(ce,ve){ve===null?ce.matrixWorld.copy(ce.matrix):ce.matrixWorld.multiplyMatrices(ve.matrixWorld,ce.matrix),ce.matrixWorldInverse.copy(ce.matrixWorld).invert()}this.updateCamera=function(ce){if(i===null)return;v.near=N.near=P.near=ce.near,v.far=N.far=P.far=ce.far,(D!==v.near||J!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),D=v.near,J=v.far);let ve=ce.parent,Ve=v.cameras;Ae(v,ve);for(let nt=0;nt<Ve.length;nt++)Ae(Ve[nt],ve);Ve.length===2?fe(v,P,N):v.projectionMatrix.copy(P.projectionMatrix),pe(ce,v,ve)};function pe(ce,ve,Ve){Ve===null?ce.matrix.copy(ve.matrixWorld):(ce.matrix.copy(Ve.matrixWorld),ce.matrix.invert(),ce.matrix.multiply(ve.matrixWorld)),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.updateMatrixWorld(!0),ce.projectionMatrix.copy(ve.projectionMatrix),ce.projectionMatrixInverse.copy(ve.projectionMatrixInverse),ce.isPerspectiveCamera&&(ce.fov=qr*2*Math.atan(1/ce.projectionMatrix.elements[5]),ce.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&A===null))return c},this.setFoveation=function(ce){c=ce,f!==null&&(f.fixedFoveation=ce),A!==null&&A.fixedFoveation!==void 0&&(A.fixedFoveation=ce)};let be=null;function Me(ce,ve){if(h=ve.getViewerPose(l||a),m=ve,h!==null){let Ve=h.views;A!==null&&(e.setRenderTargetFramebuffer(d,A.framebuffer),e.setRenderTarget(d));let nt=!1;Ve.length!==v.cameras.length&&(v.cameras.length=0,nt=!0);for(let qe=0;qe<Ve.length;qe++){let dt=Ve[qe],vt=null;if(A!==null)vt=A.getViewport(dt);else{let Dt=u.getViewSubImage(f,dt);vt=Dt.viewport,qe===0&&(e.setRenderTargetTextures(d,Dt.colorTexture,f.ignoreDepthValues?void 0:Dt.depthStencilTexture),e.setRenderTarget(d))}let at=H[qe];at===void 0&&(at=new _n,at.layers.enable(qe),at.viewport=new Rt,H[qe]=at),at.matrix.fromArray(dt.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(dt.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(vt.x,vt.y,vt.width,vt.height),qe===0&&(v.matrix.copy(at.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),nt===!0&&v.cameras.push(at)}}for(let Ve=0;Ve<M.length;Ve++){let nt=y[Ve],qe=M[Ve];nt!==null&&qe!==void 0&&qe.update(nt,ve,l||a)}be&&be(ce,ve),ve.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ve}),m=null}let Le=new od;Le.setAnimationLoop(Me),this.setAnimationLoop=function(ce){be=ce},this.dispose=function(){}}};function yb(s,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,ad(s)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function i(p,d,M,y,B){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&A(p,d,B)):d.isMeshMatcapMaterial?(r(p,d),m(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),b(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?c(p,d,M,y):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Fn&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Fn&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let M=e.get(d).envMap;if(M&&(p.envMap.value=M,p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;let y=s._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*y,t(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,M,y){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*M,p.scale.value=y*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),e.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function A(p,d,M){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Fn&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,d){d.matcap&&(p.matcap.value=d.matcap)}function b(p,d){let M=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function vb(s,e,t,n){let i={},r={},a=[],o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(M,y){let B=y.program;n.uniformBlockBinding(M,B)}function l(M,y){let B=i[M.id];B===void 0&&(m(M),B=h(M),i[M.id]=B,M.addEventListener("dispose",p));let O=y.program;n.updateUBOMapping(M,O);let P=e.render.frame;r[M.id]!==P&&(f(M),r[M.id]=P)}function h(M){let y=u();M.__bindingPointIndex=y;let B=s.createBuffer(),O=M.__size,P=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,B),s.bufferData(s.UNIFORM_BUFFER,O,P),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,B),B}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){let y=i[M.id],B=M.uniforms,O=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let P=0,N=B.length;P<N;P++){let H=Array.isArray(B[P])?B[P]:[B[P]];for(let v=0,D=H.length;v<D;v++){let J=H[v];if(A(J,P,v,O)===!0){let Z=J.__offset,ue=Array.isArray(J.value)?J.value:[J.value],k=0;for(let Y=0;Y<ue.length;Y++){let $=ue[Y],fe=b($);typeof $=="number"||typeof $=="boolean"?(J.__data[0]=$,s.bufferSubData(s.UNIFORM_BUFFER,Z+k,J.__data)):$.isMatrix3?(J.__data[0]=$.elements[0],J.__data[1]=$.elements[1],J.__data[2]=$.elements[2],J.__data[3]=0,J.__data[4]=$.elements[3],J.__data[5]=$.elements[4],J.__data[6]=$.elements[5],J.__data[7]=0,J.__data[8]=$.elements[6],J.__data[9]=$.elements[7],J.__data[10]=$.elements[8],J.__data[11]=0):($.toArray(J.__data,k),k+=fe.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,Z,J.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function A(M,y,B,O){let P=M.value,N=y+"_"+B;if(O[N]===void 0)return typeof P=="number"||typeof P=="boolean"?O[N]=P:O[N]=P.clone(),!0;{let H=O[N];if(typeof P=="number"||typeof P=="boolean"){if(H!==P)return O[N]=P,!0}else if(H.equals(P)===!1)return H.copy(P),!0}return!1}function m(M){let y=M.uniforms,B=0,O=16;for(let N=0,H=y.length;N<H;N++){let v=Array.isArray(y[N])?y[N]:[y[N]];for(let D=0,J=v.length;D<J;D++){let Z=v[D],ue=Array.isArray(Z.value)?Z.value:[Z.value];for(let k=0,Y=ue.length;k<Y;k++){let $=ue[k],fe=b($),Ae=B%O;Ae!==0&&O-Ae<fe.boundary&&(B+=O-Ae),Z.__data=new Float32Array(fe.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=B,B+=fe.storage}}}let P=B%O;return P>0&&(B+=O-P),M.__size=B,M.__cache={},this}function b(M){let y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function p(M){let y=M.target;y.removeEventListener("dispose",p);let B=a.indexOf(y.__bindingPointIndex);a.splice(B,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function d(){for(let M in i)s.deleteBuffer(i[M]);a=[],i={},r={}}return{bind:c,update:l,dispose:d}}var Zr=class{constructor(e={}){let{canvas:t=Tp(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;let A=new Uint32Array(4),m=new Int32Array(4),b=null,p=null,d=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pt,this._useLegacyLights=!1,this.toneMapping=Ms,this.toneMappingExposure=1;let y=this,B=!1,O=0,P=0,N=null,H=-1,v=null,D=new Rt,J=new Rt,Z=null,ue=new We(0),k=0,Y=t.width,$=t.height,fe=1,Ae=null,pe=null,be=new Rt(0,0,Y,$),Me=new Rt(0,0,Y,$),Le=!1,ce=new Ka,ve=!1,Ve=!1,nt=null,qe=new ct,dt=new Ze,vt=new G,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Dt(){return N===null?fe:1}let ee=n;function R(L,j){for(let oe=0;oe<L.length;oe++){let he=L[oe],se=t.getContext(he,j);if(se!==null)return se}return null}try{let L={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ih}`),t.addEventListener("webglcontextlost",Be,!1),t.addEventListener("webglcontextrestored",U,!1),t.addEventListener("webglcontextcreationerror",Qe,!1),ee===null){let j=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&j.shift(),ee=R(j,L),ee===null)throw R(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&ee instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),ee.getShaderPrecisionFormat===void 0&&(ee.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let Q,q,V,le,ie,w,x,K,de,me,xe,Ne,Re,Oe,je,Et,Ce,Ht,Mt,Ee,Ue,Pe,lt,Te;function Xt(){Q=new H0(ee),q=new N0(ee,Q,e),Q.init(q),Pe=new Eb(ee,Q,q),V=new _b(ee,Q,q),le=new W0(ee),ie=new ab,w=new bb(ee,Q,V,ie,q,Pe,le),x=new O0(y),K=new G0(y),de=new $p(ee,q),lt=new P0(ee,Q,de,q),me=new z0(ee,de,le,lt),xe=new Y0(ee,me,de,le),Mt=new X0(ee,q,w),Et=new U0(ie),Ne=new rb(y,x,K,Q,q,lt,Et),Re=new yb(y,ie),Oe=new cb,je=new Ab(Q,q),Ht=new L0(y,x,K,V,xe,f,c),Ce=new gb(y,xe,q),Te=new vb(ee,le,q,V),Ee=new F0(ee,Q,le,q),Ue=new V0(ee,Q,le,q),le.programs=Ne.programs,y.capabilities=q,y.extensions=Q,y.properties=ie,y.renderLists=Oe,y.shadowMap=Ce,y.state=V,y.info=le}Xt();let Ye=new Hl(y,ee);this.xr=Ye,this.getContext=function(){return ee},this.getContextAttributes=function(){return ee.getContextAttributes()},this.forceContextLoss=function(){let L=Q.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){let L=Q.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return fe},this.setPixelRatio=function(L){L!==void 0&&(fe=L,this.setSize(Y,$,!1))},this.getSize=function(L){return L.set(Y,$)},this.setSize=function(L,j,oe=!0){if(Ye.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=L,$=j,t.width=Math.floor(L*fe),t.height=Math.floor(j*fe),oe===!0&&(t.style.width=L+"px",t.style.height=j+"px"),this.setViewport(0,0,L,j)},this.getDrawingBufferSize=function(L){return L.set(Y*fe,$*fe).floor()},this.setDrawingBufferSize=function(L,j,oe){Y=L,$=j,fe=oe,t.width=Math.floor(L*oe),t.height=Math.floor(j*oe),this.setViewport(0,0,L,j)},this.getCurrentViewport=function(L){return L.copy(D)},this.getViewport=function(L){return L.copy(be)},this.setViewport=function(L,j,oe,he){L.isVector4?be.set(L.x,L.y,L.z,L.w):be.set(L,j,oe,he),V.viewport(D.copy(be).multiplyScalar(fe).floor())},this.getScissor=function(L){return L.copy(Me)},this.setScissor=function(L,j,oe,he){L.isVector4?Me.set(L.x,L.y,L.z,L.w):Me.set(L,j,oe,he),V.scissor(J.copy(Me).multiplyScalar(fe).floor())},this.getScissorTest=function(){return Le},this.setScissorTest=function(L){V.setScissorTest(Le=L)},this.setOpaqueSort=function(L){Ae=L},this.setTransparentSort=function(L){pe=L},this.getClearColor=function(L){return L.copy(Ht.getClearColor())},this.setClearColor=function(){Ht.setClearColor.apply(Ht,arguments)},this.getClearAlpha=function(){return Ht.getClearAlpha()},this.setClearAlpha=function(){Ht.setClearAlpha.apply(Ht,arguments)},this.clear=function(L=!0,j=!0,oe=!0){let he=0;if(L){let se=!1;if(N!==null){let Fe=N.texture.format;se=Fe===$f||Fe===Zf||Fe===jf}if(se){let Fe=N.texture.type,te=Fe===Bn||Fe===xs||Fe===ah||Fe===Ys||Fe===Yf||Fe===Jf,ht=Ht.getClearColor(),gt=Ht.getClearAlpha(),_t=ht.r,St=ht.g,Ct=ht.b;te?(A[0]=_t,A[1]=St,A[2]=Ct,A[3]=gt,ee.clearBufferuiv(ee.COLOR,0,A)):(m[0]=_t,m[1]=St,m[2]=Ct,m[3]=gt,ee.clearBufferiv(ee.COLOR,0,m))}else he|=ee.COLOR_BUFFER_BIT}j&&(he|=ee.DEPTH_BUFFER_BIT),oe&&(he|=ee.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee.clear(he)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Be,!1),t.removeEventListener("webglcontextrestored",U,!1),t.removeEventListener("webglcontextcreationerror",Qe,!1),Oe.dispose(),je.dispose(),ie.dispose(),x.dispose(),K.dispose(),xe.dispose(),lt.dispose(),Te.dispose(),Ne.dispose(),Ye.dispose(),Ye.removeEventListener("sessionstart",Kn),Ye.removeEventListener("sessionend",Qt),nt&&(nt.dispose(),nt=null),Dn.stop()};function Be(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),B=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),B=!1;let L=le.autoReset,j=Ce.enabled,oe=Ce.autoUpdate,he=Ce.needsUpdate,se=Ce.type;Xt(),le.autoReset=L,Ce.enabled=j,Ce.autoUpdate=oe,Ce.needsUpdate=he,Ce.type=se}function Qe(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Ge(L){let j=L.target;j.removeEventListener("dispose",Ge),ot(j)}function ot(L){it(L),ie.remove(L)}function it(L){let j=ie.get(L).programs;j!==void 0&&(j.forEach(function(oe){Ne.releaseProgram(oe)}),L.isShaderMaterial&&Ne.releaseShaderCache(L))}this.renderBufferDirect=function(L,j,oe,he,se,Fe){j===null&&(j=at);let te=se.isMesh&&se.matrixWorld.determinant()<0,ht=fa(L,j,oe,he,se);V.setMaterial(he,te);let gt=oe.index,_t=1;if(he.wireframe===!0){if(gt=me.getWireframeAttribute(oe),gt===void 0)return;_t=2}let St=oe.drawRange,Ct=oe.attributes.position,hn=St.start*_t,Xn=(St.start+St.count)*_t;Fe!==null&&(hn=Math.max(hn,Fe.start*_t),Xn=Math.min(Xn,(Fe.start+Fe.count)*_t)),gt!==null?(hn=Math.max(hn,0),Xn=Math.min(Xn,gt.count)):Ct!=null&&(hn=Math.max(hn,0),Xn=Math.min(Xn,Ct.count));let wn=Xn-hn;if(wn<0||wn===1/0)return;lt.setup(se,he,ht,oe,gt);let Pi,fn=Ee;if(gt!==null&&(Pi=de.get(gt),fn=Ue,fn.setIndex(Pi)),se.isMesh)he.wireframe===!0?(V.setLineWidth(he.wireframeLinewidth*Dt()),fn.setMode(ee.LINES)):fn.setMode(ee.TRIANGLES);else if(se.isLine){let xt=he.linewidth;xt===void 0&&(xt=1),V.setLineWidth(xt*Dt()),se.isLineSegments?fn.setMode(ee.LINES):se.isLineLoop?fn.setMode(ee.LINE_LOOP):fn.setMode(ee.LINE_STRIP)}else se.isPoints?fn.setMode(ee.POINTS):se.isSprite&&fn.setMode(ee.TRIANGLES);if(se.isBatchedMesh)fn.renderMultiDraw(se._multiDrawStarts,se._multiDrawCounts,se._multiDrawCount);else if(se.isInstancedMesh)fn.renderInstances(hn,wn,se.count);else if(oe.isInstancedBufferGeometry){let xt=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,Fi=Math.min(oe.instanceCount,xt);fn.renderInstances(hn,wn,Fi)}else fn.render(hn,wn)};function Vt(L,j,oe){L.transparent===!0&&L.side===Sn&&L.forceSinglePass===!1?(L.side=Fn,L.needsUpdate=!0,mi(L,j,oe),L.side=qi,L.needsUpdate=!0,mi(L,j,oe),L.side=Sn):mi(L,j,oe)}this.compile=function(L,j,oe=null){oe===null&&(oe=L),p=je.get(oe),p.init(),M.push(p),oe.traverseVisible(function(se){se.isLight&&se.layers.test(j.layers)&&(p.pushLight(se),se.castShadow&&p.pushShadow(se))}),L!==oe&&L.traverseVisible(function(se){se.isLight&&se.layers.test(j.layers)&&(p.pushLight(se),se.castShadow&&p.pushShadow(se))}),p.setupLights(y._useLegacyLights);let he=new Set;return L.traverse(function(se){let Fe=se.material;if(Fe)if(Array.isArray(Fe))for(let te=0;te<Fe.length;te++){let ht=Fe[te];Vt(ht,oe,se),he.add(ht)}else Vt(Fe,oe,se),he.add(Fe)}),M.pop(),p=null,he},this.compileAsync=function(L,j,oe=null){let he=this.compile(L,j,oe);return new Promise(se=>{function Fe(){if(he.forEach(function(te){ie.get(te).currentProgram.isReady()&&he.delete(te)}),he.size===0){se(L);return}setTimeout(Fe,10)}Q.get("KHR_parallel_shader_compile")!==null?Fe():setTimeout(Fe,10)})};let Wt=null;function Yt(L){Wt&&Wt(L)}function Kn(){Dn.stop()}function Qt(){Dn.start()}let Dn=new od;Dn.setAnimationLoop(Yt),typeof self!="undefined"&&Dn.setContext(self),this.setAnimationLoop=function(L){Wt=L,Ye.setAnimationLoop(L),L===null?Dn.stop():Dn.start()},Ye.addEventListener("sessionstart",Kn),Ye.addEventListener("sessionend",Qt),this.render=function(L,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Ye.enabled===!0&&Ye.isPresenting===!0&&(Ye.cameraAutoUpdate===!0&&Ye.updateCamera(j),j=Ye.getCamera()),L.isScene===!0&&L.onBeforeRender(y,L,j,N),p=je.get(L,M.length),p.init(),M.push(p),qe.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),ce.setFromProjectionMatrix(qe),Ve=this.localClippingEnabled,ve=Et.init(this.clippingPlanes,Ve),b=Oe.get(L,d.length),b.init(),d.push(b),ui(L,j,0,y.sortObjects),b.finish(),y.sortObjects===!0&&b.sort(Ae,pe),this.info.render.frame++,ve===!0&&Et.beginShadows();let oe=p.state.shadowsArray;if(Ce.render(oe,L,j),ve===!0&&Et.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ht.render(b,L),p.setupLights(y._useLegacyLights),j.isArrayCamera){let he=j.cameras;for(let se=0,Fe=he.length;se<Fe;se++){let te=he[se];As(b,L,te,te.viewport)}}else As(b,L,j);N!==null&&(w.updateMultisampleRenderTarget(N),w.updateRenderTargetMipmap(N)),L.isScene===!0&&L.onAfterRender(y,L,j),lt.resetDefaultState(),H=-1,v=null,M.pop(),M.length>0?p=M[M.length-1]:p=null,d.pop(),d.length>0?b=d[d.length-1]:b=null};function ui(L,j,oe,he){if(L.visible===!1)return;if(L.layers.test(j.layers)){if(L.isGroup)oe=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(j);else if(L.isLight)p.pushLight(L),L.castShadow&&p.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||ce.intersectsSprite(L)){he&&vt.setFromMatrixPosition(L.matrixWorld).applyMatrix4(qe);let te=xe.update(L),ht=L.material;ht.visible&&b.push(L,te,ht,oe,vt.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||ce.intersectsObject(L))){let te=xe.update(L),ht=L.material;if(he&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),vt.copy(L.boundingSphere.center)):(te.boundingSphere===null&&te.computeBoundingSphere(),vt.copy(te.boundingSphere.center)),vt.applyMatrix4(L.matrixWorld).applyMatrix4(qe)),Array.isArray(ht)){let gt=te.groups;for(let _t=0,St=gt.length;_t<St;_t++){let Ct=gt[_t],hn=ht[Ct.materialIndex];hn&&hn.visible&&b.push(L,te,hn,oe,vt.z,Ct)}}else ht.visible&&b.push(L,te,ht,oe,vt.z,null)}}let Fe=L.children;for(let te=0,ht=Fe.length;te<ht;te++)ui(Fe[te],j,oe,he)}function As(L,j,oe,he){let se=L.opaque,Fe=L.transmissive,te=L.transparent;p.setupLightsView(oe),ve===!0&&Et.setGlobalState(y.clippingPlanes,oe),Fe.length>0&&fi(se,Fe,j,oe),he&&V.viewport(D.copy(he)),se.length>0&&ps(se,j,oe),Fe.length>0&&ps(Fe,j,oe),te.length>0&&ps(te,j,oe),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function fi(L,j,oe,he){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;let Fe=q.isWebGL2;nt===null&&(nt=new Ai(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")?oi:Bn,minFilter:Zn,samples:Fe?4:0})),y.getDrawingBufferSize(dt),Fe?nt.setSize(dt.x,dt.y):nt.setSize(sc(dt.x),sc(dt.y));let te=y.getRenderTarget();y.setRenderTarget(nt),y.getClearColor(ue),k=y.getClearAlpha(),k<1&&y.setClearColor(16777215,.5),y.clear();let ht=y.toneMapping;y.toneMapping=Ms,ps(L,oe,he),w.updateMultisampleRenderTarget(nt),w.updateRenderTargetMipmap(nt);let gt=!1;for(let _t=0,St=j.length;_t<St;_t++){let Ct=j[_t],hn=Ct.object,Xn=Ct.geometry,wn=Ct.material,Pi=Ct.group;if(wn.side===Sn&&hn.layers.test(he.layers)){let fn=wn.side;wn.side=Fn,wn.needsUpdate=!0,Si(hn,oe,he,Xn,wn,Pi),wn.side=fn,wn.needsUpdate=!0,gt=!0}}gt===!0&&(w.updateMultisampleRenderTarget(nt),w.updateRenderTargetMipmap(nt)),y.setRenderTarget(te),y.setClearColor(ue,k),y.toneMapping=ht}function ps(L,j,oe){let he=j.isScene===!0?j.overrideMaterial:null;for(let se=0,Fe=L.length;se<Fe;se++){let te=L[se],ht=te.object,gt=te.geometry,_t=he===null?te.material:he,St=te.group;ht.layers.test(oe.layers)&&Si(ht,j,oe,gt,_t,St)}}function Si(L,j,oe,he,se,Fe){L.onBeforeRender(y,j,oe,he,se,Fe),L.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),se.onBeforeRender(y,j,oe,he,L,Fe),se.transparent===!0&&se.side===Sn&&se.forceSinglePass===!1?(se.side=Fn,se.needsUpdate=!0,y.renderBufferDirect(oe,j,he,se,L,Fe),se.side=qi,se.needsUpdate=!0,y.renderBufferDirect(oe,j,he,se,L,Fe),se.side=Sn):y.renderBufferDirect(oe,j,he,se,L,Fe),L.onAfterRender(y,j,oe,he,se,Fe)}function mi(L,j,oe){j.isScene!==!0&&(j=at);let he=ie.get(L),se=p.state.lights,Fe=p.state.shadowsArray,te=se.state.version,ht=Ne.getParameters(L,se.state,Fe,j,oe),gt=Ne.getProgramCacheKey(ht),_t=he.programs;he.environment=L.isMeshStandardMaterial?j.environment:null,he.fog=j.fog,he.envMap=(L.isMeshStandardMaterial?K:x).get(L.envMap||he.environment),_t===void 0&&(L.addEventListener("dispose",Ge),_t=new Map,he.programs=_t);let St=_t.get(gt);if(St!==void 0){if(he.currentProgram===St&&he.lightsStateVersion===te)return ua(L,ht),St}else ht.uniforms=Ne.getUniforms(L),L.onBuild(oe,ht,y),L.onBeforeCompile(ht,y),St=Ne.acquireProgram(ht,gt),_t.set(gt,St),he.uniforms=ht.uniforms;let Ct=he.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Ct.clippingPlanes=Et.uniform),ua(L,ht),he.needsLights=Hc(L),he.lightsStateVersion=te,he.needsLights&&(Ct.ambientLightColor.value=se.state.ambient,Ct.lightProbe.value=se.state.probe,Ct.directionalLights.value=se.state.directional,Ct.directionalLightShadows.value=se.state.directionalShadow,Ct.spotLights.value=se.state.spot,Ct.spotLightShadows.value=se.state.spotShadow,Ct.rectAreaLights.value=se.state.rectArea,Ct.ltc_1.value=se.state.rectAreaLTC1,Ct.ltc_2.value=se.state.rectAreaLTC2,Ct.pointLights.value=se.state.point,Ct.pointLightShadows.value=se.state.pointShadow,Ct.hemisphereLights.value=se.state.hemi,Ct.directionalShadowMap.value=se.state.directionalShadowMap,Ct.directionalShadowMatrix.value=se.state.directionalShadowMatrix,Ct.spotShadowMap.value=se.state.spotShadowMap,Ct.spotLightMatrix.value=se.state.spotLightMatrix,Ct.spotLightMap.value=se.state.spotLightMap,Ct.pointShadowMap.value=se.state.pointShadowMap,Ct.pointShadowMatrix.value=se.state.pointShadowMatrix),he.currentProgram=St,he.uniformsList=null,St}function lr(L){if(L.uniformsList===null){let j=L.currentProgram.getUniforms();L.uniformsList=zr.seqWithValue(j.seq,L.uniforms)}return L.uniformsList}function ua(L,j){let oe=ie.get(L);oe.outputColorSpace=j.outputColorSpace,oe.batching=j.batching,oe.instancing=j.instancing,oe.instancingColor=j.instancingColor,oe.skinning=j.skinning,oe.morphTargets=j.morphTargets,oe.morphNormals=j.morphNormals,oe.morphColors=j.morphColors,oe.morphTargetsCount=j.morphTargetsCount,oe.numClippingPlanes=j.numClippingPlanes,oe.numIntersection=j.numClipIntersection,oe.vertexAlphas=j.vertexAlphas,oe.vertexTangents=j.vertexTangents,oe.toneMapping=j.toneMapping}function fa(L,j,oe,he,se){j.isScene!==!0&&(j=at),w.resetTextureUnits();let Fe=j.fog,te=he.isMeshStandardMaterial?j.environment:null,ht=N===null?y.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:bn,gt=(he.isMeshStandardMaterial?K:x).get(he.envMap||te),_t=he.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,St=!!oe.attributes.tangent&&(!!he.normalMap||he.anisotropy>0),Ct=!!oe.morphAttributes.position,hn=!!oe.morphAttributes.normal,Xn=!!oe.morphAttributes.color,wn=Ms;he.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(wn=y.toneMapping);let Pi=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,fn=Pi!==void 0?Pi.length:0,xt=ie.get(he),Fi=p.state.lights;if(ve===!0&&(Ve===!0||L!==v)){let ti=L===v&&he.id===H;Et.setState(he,L,ti)}let Zt=!1;he.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==Fi.state.version||xt.outputColorSpace!==ht||se.isBatchedMesh&&xt.batching===!1||!se.isBatchedMesh&&xt.batching===!0||se.isInstancedMesh&&xt.instancing===!1||!se.isInstancedMesh&&xt.instancing===!0||se.isSkinnedMesh&&xt.skinning===!1||!se.isSkinnedMesh&&xt.skinning===!0||se.isInstancedMesh&&xt.instancingColor===!0&&se.instanceColor===null||se.isInstancedMesh&&xt.instancingColor===!1&&se.instanceColor!==null||xt.envMap!==gt||he.fog===!0&&xt.fog!==Fe||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==Et.numPlanes||xt.numIntersection!==Et.numIntersection)||xt.vertexAlphas!==_t||xt.vertexTangents!==St||xt.morphTargets!==Ct||xt.morphNormals!==hn||xt.morphColors!==Xn||xt.toneMapping!==wn||q.isWebGL2===!0&&xt.morphTargetsCount!==fn)&&(Zt=!0):(Zt=!0,xt.__version=he.version);let Ni=xt.currentProgram;Zt===!0&&(Ni=mi(he,j,se));let co=!1,Os=!1,da=!1,On=Ni.getUniforms(),qn=xt.uniforms;if(V.useProgram(Ni.program)&&(co=!0,Os=!0,da=!0),he.id!==H&&(H=he.id,Os=!0),co||v!==L){On.setValue(ee,"projectionMatrix",L.projectionMatrix),On.setValue(ee,"viewMatrix",L.matrixWorldInverse);let ti=On.map.cameraPosition;ti!==void 0&&ti.setValue(ee,vt.setFromMatrixPosition(L.matrixWorld)),q.logarithmicDepthBuffer&&On.setValue(ee,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(he.isMeshPhongMaterial||he.isMeshToonMaterial||he.isMeshLambertMaterial||he.isMeshBasicMaterial||he.isMeshStandardMaterial||he.isShaderMaterial)&&On.setValue(ee,"isOrthographic",L.isOrthographicCamera===!0),v!==L&&(v=L,Os=!0,da=!0)}if(se.isSkinnedMesh){On.setOptional(ee,se,"bindMatrix"),On.setOptional(ee,se,"bindMatrixInverse");let ti=se.skeleton;ti&&(q.floatVertexTextures?(ti.boneTexture===null&&ti.computeBoneTexture(),On.setValue(ee,"boneTexture",ti.boneTexture,w)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}se.isBatchedMesh&&(On.setOptional(ee,se,"batchingTexture"),On.setValue(ee,"batchingTexture",se._matricesTexture,w));let hr=oe.morphAttributes;if((hr.position!==void 0||hr.normal!==void 0||hr.color!==void 0&&q.isWebGL2===!0)&&Mt.update(se,oe,Ni),(Os||xt.receiveShadow!==se.receiveShadow)&&(xt.receiveShadow=se.receiveShadow,On.setValue(ee,"receiveShadow",se.receiveShadow)),he.isMeshGouraudMaterial&&he.envMap!==null&&(qn.envMap.value=gt,qn.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),Os&&(On.setValue(ee,"toneMappingExposure",y.toneMappingExposure),xt.needsLights&&Gc(qn,da),Fe&&he.fog===!0&&Re.refreshFogUniforms(qn,Fe),Re.refreshMaterialUniforms(qn,he,fe,$,nt),zr.upload(ee,lr(xt),qn,w)),he.isShaderMaterial&&he.uniformsNeedUpdate===!0&&(zr.upload(ee,lr(xt),qn,w),he.uniformsNeedUpdate=!1),he.isSpriteMaterial&&On.setValue(ee,"center",se.center),On.setValue(ee,"modelViewMatrix",se.modelViewMatrix),On.setValue(ee,"normalMatrix",se.normalMatrix),On.setValue(ee,"modelMatrix",se.matrixWorld),he.isShaderMaterial||he.isRawShaderMaterial){let ti=he.uniformsGroups;for(let Aa=0,pa=ti.length;Aa<pa;Aa++)if(q.isWebGL2){let ma=ti[Aa];Te.update(ma,Ni),Te.bind(ma,Ni)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ni}function Gc(L,j){L.ambientLightColor.needsUpdate=j,L.lightProbe.needsUpdate=j,L.directionalLights.needsUpdate=j,L.directionalLightShadows.needsUpdate=j,L.pointLights.needsUpdate=j,L.pointLightShadows.needsUpdate=j,L.spotLights.needsUpdate=j,L.spotLightShadows.needsUpdate=j,L.rectAreaLights.needsUpdate=j,L.hemisphereLights.needsUpdate=j}function Hc(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(L,j,oe){ie.get(L.texture).__webglTexture=j,ie.get(L.depthTexture).__webglTexture=oe;let he=ie.get(L);he.__hasExternalTextures=!0,he.__hasExternalTextures&&(he.__autoAllocateDepthBuffer=oe===void 0,he.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),he.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(L,j){let oe=ie.get(L);oe.__webglFramebuffer=j,oe.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(L,j=0,oe=0){N=L,O=j,P=oe;let he=!0,se=null,Fe=!1,te=!1;if(L){let gt=ie.get(L);gt.__useDefaultFramebuffer!==void 0?(V.bindFramebuffer(ee.FRAMEBUFFER,null),he=!1):gt.__webglFramebuffer===void 0?w.setupRenderTarget(L):gt.__hasExternalTextures&&w.rebindTextures(L,ie.get(L.texture).__webglTexture,ie.get(L.depthTexture).__webglTexture);let _t=L.texture;(_t.isData3DTexture||_t.isDataArrayTexture||_t.isCompressedArrayTexture)&&(te=!0);let St=ie.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(St[j])?se=St[j][oe]:se=St[j],Fe=!0):q.isWebGL2&&L.samples>0&&w.useMultisampledRTT(L)===!1?se=ie.get(L).__webglMultisampledFramebuffer:Array.isArray(St)?se=St[oe]:se=St,D.copy(L.viewport),J.copy(L.scissor),Z=L.scissorTest}else D.copy(be).multiplyScalar(fe).floor(),J.copy(Me).multiplyScalar(fe).floor(),Z=Le;if(V.bindFramebuffer(ee.FRAMEBUFFER,se)&&q.drawBuffers&&he&&V.drawBuffers(L,se),V.viewport(D),V.scissor(J),V.setScissorTest(Z),Fe){let gt=ie.get(L.texture);ee.framebufferTexture2D(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt.__webglTexture,oe)}else if(te){let gt=ie.get(L.texture),_t=j||0;ee.framebufferTextureLayer(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,gt.__webglTexture,oe||0,_t)}H=-1},this.readRenderTargetPixels=function(L,j,oe,he,se,Fe,te){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ht=ie.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&te!==void 0&&(ht=ht[te]),ht){V.bindFramebuffer(ee.FRAMEBUFFER,ht);try{let gt=L.texture,_t=gt.format,St=gt.type;if(_t!==Cn&&Pe.convert(_t)!==ee.getParameter(ee.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ct=St===oi&&(Q.has("EXT_color_buffer_half_float")||q.isWebGL2&&Q.has("EXT_color_buffer_float"));if(St!==Bn&&Pe.convert(St)!==ee.getParameter(ee.IMPLEMENTATION_COLOR_READ_TYPE)&&!(St===zn&&(q.isWebGL2||Q.has("OES_texture_float")||Q.has("WEBGL_color_buffer_float")))&&!Ct){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=L.width-he&&oe>=0&&oe<=L.height-se&&ee.readPixels(j,oe,he,se,Pe.convert(_t),Pe.convert(St),Fe)}finally{let gt=N!==null?ie.get(N).__webglFramebuffer:null;V.bindFramebuffer(ee.FRAMEBUFFER,gt)}}},this.copyFramebufferToTexture=function(L,j,oe=0){let he=Math.pow(2,-oe),se=Math.floor(j.image.width*he),Fe=Math.floor(j.image.height*he);w.setTexture2D(j,0),ee.copyTexSubImage2D(ee.TEXTURE_2D,oe,0,0,L.x,L.y,se,Fe),V.unbindTexture()},this.copyTextureToTexture=function(L,j,oe,he=0){let se=j.image.width,Fe=j.image.height,te=Pe.convert(oe.format),ht=Pe.convert(oe.type);w.setTexture2D(oe,0),ee.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL,oe.flipY),ee.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL,oe.premultiplyAlpha),ee.pixelStorei(ee.UNPACK_ALIGNMENT,oe.unpackAlignment),j.isDataTexture?ee.texSubImage2D(ee.TEXTURE_2D,he,L.x,L.y,se,Fe,te,ht,j.image.data):j.isCompressedTexture?ee.compressedTexSubImage2D(ee.TEXTURE_2D,he,L.x,L.y,j.mipmaps[0].width,j.mipmaps[0].height,te,j.mipmaps[0].data):ee.texSubImage2D(ee.TEXTURE_2D,he,L.x,L.y,te,ht,j.image),he===0&&oe.generateMipmaps&&ee.generateMipmap(ee.TEXTURE_2D),V.unbindTexture()},this.copyTextureToTexture3D=function(L,j,oe,he,se=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Fe=L.max.x-L.min.x+1,te=L.max.y-L.min.y+1,ht=L.max.z-L.min.z+1,gt=Pe.convert(he.format),_t=Pe.convert(he.type),St;if(he.isData3DTexture)w.setTexture3D(he,0),St=ee.TEXTURE_3D;else if(he.isDataArrayTexture||he.isCompressedArrayTexture)w.setTexture2DArray(he,0),St=ee.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}ee.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL,he.flipY),ee.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL,he.premultiplyAlpha),ee.pixelStorei(ee.UNPACK_ALIGNMENT,he.unpackAlignment);let Ct=ee.getParameter(ee.UNPACK_ROW_LENGTH),hn=ee.getParameter(ee.UNPACK_IMAGE_HEIGHT),Xn=ee.getParameter(ee.UNPACK_SKIP_PIXELS),wn=ee.getParameter(ee.UNPACK_SKIP_ROWS),Pi=ee.getParameter(ee.UNPACK_SKIP_IMAGES),fn=oe.isCompressedTexture?oe.mipmaps[se]:oe.image;ee.pixelStorei(ee.UNPACK_ROW_LENGTH,fn.width),ee.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,fn.height),ee.pixelStorei(ee.UNPACK_SKIP_PIXELS,L.min.x),ee.pixelStorei(ee.UNPACK_SKIP_ROWS,L.min.y),ee.pixelStorei(ee.UNPACK_SKIP_IMAGES,L.min.z),oe.isDataTexture||oe.isData3DTexture?ee.texSubImage3D(St,se,j.x,j.y,j.z,Fe,te,ht,gt,_t,fn.data):oe.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),ee.compressedTexSubImage3D(St,se,j.x,j.y,j.z,Fe,te,ht,gt,fn.data)):ee.texSubImage3D(St,se,j.x,j.y,j.z,Fe,te,ht,gt,_t,fn),ee.pixelStorei(ee.UNPACK_ROW_LENGTH,Ct),ee.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,hn),ee.pixelStorei(ee.UNPACK_SKIP_PIXELS,Xn),ee.pixelStorei(ee.UNPACK_SKIP_ROWS,wn),ee.pixelStorei(ee.UNPACK_SKIP_IMAGES,Pi),se===0&&he.generateMipmaps&&ee.generateMipmap(St),V.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?w.setTextureCube(L,0):L.isData3DTexture?w.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?w.setTexture2DArray(L,0):w.setTexture2D(L,0),V.unbindTexture()},this.resetState=function(){O=0,P=0,N=null,V.reset(),lt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return os}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===no?"display-p3":"srgb",t.unpackColorSpace=jt.workingColorSpace===aa?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Pt?js:td}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===js?Pt:bn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},zl=class extends Zr{};zl.prototype.isWebGL1Renderer=!0;var dc=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new We(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var ws=class extends ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},$r=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=wl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Gi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},si=new G,er=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)si.fromBufferAttribute(this,t),si.applyMatrix4(e),this.setXYZ(t,si.x,si.y,si.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)si.fromBufferAttribute(this,t),si.applyNormalMatrix(e),this.setXYZ(t,si.x,si.y,si.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)si.fromBufferAttribute(this,t),si.transformDirection(e),this.setXYZ(t,si.x,si.y,si.z);return this}setX(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ki(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ki(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ki(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ki(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),i=sn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),i=sn(i,this.array),r=sn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},qa=class extends ci{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Dr,wa=new G,Lr=new G,Pr=new G,Fr=new Ze,Ia=new Ze,dd=new ct,No=new G,Ta=new G,Uo=new G,Cf=new Ze,_l=new Ze,wf=new Ze,Ac=class extends ln{constructor(e=new qa){if(super(),this.isSprite=!0,this.type="Sprite",Dr===void 0){Dr=new an;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new $r(t,5);Dr.setIndex([0,1,2,0,2,3]),Dr.setAttribute("position",new er(n,3,0,!1)),Dr.setAttribute("uv",new er(n,2,3,!1))}this.geometry=Dr,this.material=e,this.center=new Ze(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Lr.setFromMatrixScale(this.matrixWorld),dd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Pr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Lr.multiplyScalar(-Pr.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;Oo(No.set(-.5,-.5,0),Pr,a,Lr,i,r),Oo(Ta.set(.5,-.5,0),Pr,a,Lr,i,r),Oo(Uo.set(.5,.5,0),Pr,a,Lr,i,r),Cf.set(0,0),_l.set(1,0),wf.set(1,1);let o=e.ray.intersectTriangle(No,Ta,Uo,!1,wa);if(o===null&&(Oo(Ta.set(-.5,.5,0),Pr,a,Lr,i,r),_l.set(0,1),o=e.ray.intersectTriangle(No,Uo,Ta,!1,wa),o===null))return;let c=e.ray.origin.distanceTo(wa);c<e.near||c>e.far||t.push({distance:c,point:wa.clone(),uv:Xs.getInterpolation(wa,No,Ta,Uo,Cf,_l,wf,new Ze),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Oo(s,e,t,n,i,r){Fr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Ia.x=r*Fr.x-i*Fr.y,Ia.y=i*Fr.x+r*Fr.y):Ia.copy(Fr),s.copy(e),s.x+=Ia.x,s.y+=Ia.y,s.applyMatrix4(dd)}var If=new G,Tf=new Rt,Rf=new Rt,Mb=new G,Bf=new ct,ko=new G,bl=new yn,Df=new ct,El=new Xr,Xi=class extends ze{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=bu,this.bindMatrix=new ct,this.bindMatrixInverse=new ct,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ii),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ko),this.boundingBox.expandByPoint(ko)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ko),this.boundingSphere.expandByPoint(ko)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bl.copy(this.boundingSphere),bl.applyMatrix4(i),e.ray.intersectsSphere(bl)!==!1&&(Df.copy(i).invert(),El.copy(e.ray).applyMatrix4(Df),!(this.boundingBox!==null&&El.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,El)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Rt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===bu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===YA?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Tf.fromBufferAttribute(i.attributes.skinIndex,e),Rf.fromBufferAttribute(i.attributes.skinWeight,e),If.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=Rf.getComponent(r);if(a!==0){let o=Tf.getComponent(r);Bf.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Mb.copy(If).applyMatrix4(Bf),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Xa=class extends ln{constructor(){super(),this.isBone=!0,this.type="Bone"}},Is=class extends Wn{constructor(e=null,t=1,n=1,i,r,a,o,c,l=Ln,h=Ln,u,f){super(null,a,o,c,l,h,i,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Lf=new ct,Sb=new ct,tr=class s{constructor(e=[],t=[]){this.uuid=Gi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ct)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ct;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Sb;Lf.multiplyMatrices(o,t[r]),Lf.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Is(t,e,e,Cn,zn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Xa),this.bones.push(a),this.boneInverses.push(new ct().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Ti=class extends Ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Nr=new ct,Pf=new ct,Qo=[],Ff=new Ii,Cb=new ct,Ra=new ze,Ba=new yn,vi=class extends ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ti(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Cb)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ii),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Nr),Ff.copy(e.boundingBox).applyMatrix4(Nr),this.boundingBox.union(Ff)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Nr),Ba.copy(e.boundingSphere).applyMatrix4(Nr),this.boundingSphere.union(Ba)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Ra.geometry=this.geometry,Ra.material=this.material,Ra.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ba.copy(this.boundingSphere),Ba.applyMatrix4(n),e.ray.intersectsSphere(Ba)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Nr),Pf.multiplyMatrices(n,Nr),Ra.matrixWorld=Pf,Ra.raycast(e,Qo);for(let a=0,o=Qo.length;a<o;a++){let c=Qo[a];c.instanceId=r,c.object=this,t.push(c)}Qo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ti(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Ya=class extends ci{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Nf=new G,Uf=new G,Of=new ct,xl=new Xr,Go=new yn,ea=class extends ln{constructor(e=new an,t=new Ya){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Nf.fromBufferAttribute(t,i-1),Uf.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Nf.distanceTo(Uf);e.setAttribute("lineDistance",new Ut(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Go.copy(n.boundingSphere),Go.applyMatrix4(i),Go.radius+=r,e.ray.intersectsSphere(Go)===!1)return;Of.copy(i).invert(),xl.copy(e.ray).applyMatrix4(Of);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new G,h=new G,u=new G,f=new G,A=this.isLineSegments?2:1,m=n.index,p=n.attributes.position;if(m!==null){let d=Math.max(0,a.start),M=Math.min(m.count,a.start+a.count);for(let y=d,B=M-1;y<B;y+=A){let O=m.getX(y),P=m.getX(y+1);if(l.fromBufferAttribute(p,O),h.fromBufferAttribute(p,P),xl.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let H=e.ray.origin.distanceTo(f);H<e.near||H>e.far||t.push({distance:H,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{let d=Math.max(0,a.start),M=Math.min(p.count,a.start+a.count);for(let y=d,B=M-1;y<B;y+=A){if(l.fromBufferAttribute(p,y),h.fromBufferAttribute(p,y+1),xl.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let P=e.ray.origin.distanceTo(f);P<e.near||P>e.far||t.push({distance:P,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}},kf=new G,Qf=new G,ta=class extends ea{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)kf.fromBufferAttribute(t,i),Qf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+kf.distanceTo(Qf);e.setAttribute("lineDistance",new Ut(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},pc=class extends ea{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Ja=class extends ci{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Gf=new ct,Vl=new Xr,Ho=new yn,zo=new G,Ts=class extends ln{constructor(e=new an,t=new Ja){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ho.copy(n.boundingSphere),Ho.applyMatrix4(i),Ho.radius+=r,e.ray.intersectsSphere(Ho)===!1)return;Gf.copy(i).invert(),Vl.copy(e.ray).applyMatrix4(Gf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),A=Math.min(l.count,a.start+a.count);for(let m=f,b=A;m<b;m++){let p=l.getX(m);zo.fromBufferAttribute(u,p),Hf(zo,p,c,i,e,t,this)}}else{let f=Math.max(0,a.start),A=Math.min(u.count,a.start+a.count);for(let m=f,b=A;m<b;m++)zo.fromBufferAttribute(u,m),Hf(zo,m,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Hf(s,e,t,n,i,r,a){let o=Vl.distanceSqToPoint(s);if(o<t){let c=new G;Vl.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}var nr=class extends Wn{constructor(e,t,n,i,r,a,o,c,l,h,u,f){super(null,a,o,c,l,h,i,r,u,f),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},mc=class extends nr{constructor(e,t,n,i,r,a){super(e,t,n,r,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Gn}},gc=class extends nr{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Zs),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},ls=class extends Wn{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var _c=class s extends an{constructor(e=[new Ze(0,-.5),new Ze(.5,0),new Ze(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Qn(i,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],h=1/t,u=new G,f=new Ze,A=new G,m=new G,b=new G,p=0,d=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:p=e[M+1].x-e[M].x,d=e[M+1].y-e[M].y,A.x=d*1,A.y=-p,A.z=d*0,b.copy(A),A.normalize(),c.push(A.x,A.y,A.z);break;case e.length-1:c.push(b.x,b.y,b.z);break;default:p=e[M+1].x-e[M].x,d=e[M+1].y-e[M].y,A.x=d*1,A.y=-p,A.z=d*0,m.copy(A),A.x+=b.x,A.y+=b.y,A.z+=b.z,A.normalize(),c.push(A.x,A.y,A.z),b.copy(m)}for(let M=0;M<=t;M++){let y=n+M*h*i,B=Math.sin(y),O=Math.cos(y);for(let P=0;P<=e.length-1;P++){u.x=e[P].x*B,u.y=e[P].y,u.z=e[P].x*O,a.push(u.x,u.y,u.z),f.x=M/t,f.y=P/(e.length-1),o.push(f.x,f.y);let N=c[3*P+0]*B,H=c[3*P+1],v=c[3*P+0]*O;l.push(N,H,v)}}for(let M=0;M<t;M++)for(let y=0;y<e.length-1;y++){let B=y+M*e.length,O=B,P=B+e.length,N=B+e.length+1,H=B+1;r.push(O,P,H),r.push(N,H,P)}this.setIndex(r),this.setAttribute("position",new Ut(a,3)),this.setAttribute("uv",new Ut(o,2)),this.setAttribute("normal",new Ut(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}};var ja=class s extends an{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new G,h=new Ze;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let A=n+u/t*i;l.x=e*Math.cos(A),l.y=e*Math.sin(A),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ut(a,3)),this.setAttribute("normal",new Ut(o,3)),this.setAttribute("uv",new Ut(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},li=class s extends an{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],f=[],A=[],m=0,b=[],p=n/2,d=0;M(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Ut(u,3)),this.setAttribute("normal",new Ut(f,3)),this.setAttribute("uv",new Ut(A,2));function M(){let B=new G,O=new G,P=0,N=(t-e)/n;for(let H=0;H<=r;H++){let v=[],D=H/r,J=D*(t-e)+e;for(let Z=0;Z<=i;Z++){let ue=Z/i,k=ue*c+o,Y=Math.sin(k),$=Math.cos(k);O.x=J*Y,O.y=-D*n+p,O.z=J*$,u.push(O.x,O.y,O.z),B.set(Y,N,$).normalize(),f.push(B.x,B.y,B.z),A.push(ue,1-D),v.push(m++)}b.push(v)}for(let H=0;H<i;H++)for(let v=0;v<r;v++){let D=b[v][H],J=b[v+1][H],Z=b[v+1][H+1],ue=b[v][H+1];h.push(D,J,ue),h.push(J,Z,ue),P+=6}l.addGroup(d,P,0),d+=P}function y(B){let O=m,P=new Ze,N=new G,H=0,v=B===!0?e:t,D=B===!0?1:-1;for(let Z=1;Z<=i;Z++)u.push(0,p*D,0),f.push(0,D,0),A.push(.5,.5),m++;let J=m;for(let Z=0;Z<=i;Z++){let k=Z/i*c+o,Y=Math.cos(k),$=Math.sin(k);N.x=v*$,N.y=p*D,N.z=v*Y,u.push(N.x,N.y,N.z),f.push(0,D,0),P.x=Y*.5+.5,P.y=$*.5*D+.5,A.push(P.x,P.y),m++}for(let Z=0;Z<i;Z++){let ue=O+Z,k=J+Z;B===!0?h.push(k,k+1,ue):h.push(k+1,k,ue),H+=3}l.addGroup(d,H,B===!0?1:2),d+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Za=class s extends li{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Rs=class s extends an{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new G,f=new G,A=[],m=[],b=[],p=[];for(let d=0;d<=n;d++){let M=[],y=d/n,B=0;d===0&&a===0?B=.5/t:d===n&&c===Math.PI&&(B=-.5/t);for(let O=0;O<=t;O++){let P=O/t;u.x=-e*Math.cos(i+P*r)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(i+P*r)*Math.sin(a+y*o),m.push(u.x,u.y,u.z),f.copy(u).normalize(),b.push(f.x,f.y,f.z),p.push(P+B,1-y),M.push(l++)}h.push(M)}for(let d=0;d<n;d++)for(let M=0;M<t;M++){let y=h[d][M+1],B=h[d][M],O=h[d+1][M],P=h[d+1][M+1];(d!==0||a>0)&&A.push(y,B,P),(d!==n-1||c<Math.PI)&&A.push(B,O,P)}this.setIndex(A),this.setAttribute("position",new Ut(m,3)),this.setAttribute("normal",new Ut(b,3)),this.setAttribute("uv",new Ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var na=class s extends an{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new G,u=new G,f=new G;for(let A=0;A<=n;A++)for(let m=0;m<=i;m++){let b=m/i*r,p=A/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(b),u.y=(e+t*Math.cos(p))*Math.sin(b),u.z=t*Math.sin(p),o.push(u.x,u.y,u.z),h.x=e*Math.cos(b),h.y=e*Math.sin(b),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(m/i),l.push(A/n)}for(let A=1;A<=n;A++)for(let m=1;m<=i;m++){let b=(i+1)*A+m-1,p=(i+1)*(A-1)+m-1,d=(i+1)*(A-1)+m,M=(i+1)*A+m;a.push(b,p,M),a.push(p,d,M)}this.setIndex(a),this.setAttribute("position",new Ut(o,3)),this.setAttribute("normal",new Ut(c,3)),this.setAttribute("uv",new Ut(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Ot=class extends ci{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ch,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ri=class extends Ot{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ze(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new We(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new We(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new We(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Mi=class extends ci{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ch,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=sh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Vo(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function wb(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ib(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function zf(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function Ad(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var Bs=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Wl=class extends Bs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ur,endingEnd:Ur}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Or:r=e,o=2*t-n;break;case $o:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Or:a=e,c=2*n-t;break;case $o:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,A=this._weightNext,m=(n-t)/(i-t),b=m*m,p=b*m,d=-f*p+2*f*b-f*m,M=(1+f)*p+(-1.5-2*f)*b+(-.5+f)*m+1,y=(-1-A)*p+(1.5+A)*b+.5*m,B=A*p-A*b;for(let O=0;O!==o;++O)r[O]=d*a[h+O]+M*a[l+O]+y*a[c+O]+B*a[u+O];return r}},bc=class extends Bs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},Kl=class extends Bs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Bi=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Vo(t,this.TimeBufferType),this.values=Vo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Vo(e.times,Array),values:Vo(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Kl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new bc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Kr:t=this.InterpolantFactoryMethodDiscrete;break;case $s:t=this.InterpolantFactoryMethodLinear;break;case Yc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Kr;case this.InterpolantFactoryMethodLinear:return $s;case this.InterpolantFactoryMethodSmooth:return Yc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&wb(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Yc,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{let u=o*n,f=u-n,A=u+n;for(let m=0;m!==n;++m){let b=t[u+m];if(b!==t[f+m]||b!==t[A+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,f=a*n;for(let A=0;A!==n;++A)t[f+A]=t[u+A]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Bi.prototype.TimeBufferType=Float32Array;Bi.prototype.ValueBufferType=Float32Array;Bi.prototype.DefaultInterpolation=$s;var Ds=class extends Bi{};Ds.prototype.ValueTypeName="bool";Ds.prototype.ValueBufferType=Array;Ds.prototype.DefaultInterpolation=Kr;Ds.prototype.InterpolantFactoryMethodLinear=void 0;Ds.prototype.InterpolantFactoryMethodSmooth=void 0;var Ec=class extends Bi{};Ec.prototype.ValueTypeName="color";var hs=class extends Bi{};hs.prototype.ValueTypeName="number";var ql=class extends Bs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Vn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Yi=class extends Bi{InterpolantFactoryMethodLinear(e){return new ql(this.times,this.values,this.getValueSize(),e)}};Yi.prototype.ValueTypeName="quaternion";Yi.prototype.DefaultInterpolation=$s;Yi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ls=class extends Bi{};Ls.prototype.ValueTypeName="string";Ls.prototype.ValueBufferType=Array;Ls.prototype.DefaultInterpolation=Kr;Ls.prototype.InterpolantFactoryMethodLinear=void 0;Ls.prototype.InterpolantFactoryMethodSmooth=void 0;var us=class extends Bi{};us.prototype.ValueTypeName="vector";var ia=class{constructor(e,t=-1,n,i=oh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Gi(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Rb(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Bi.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=Ib(c);c=zf(c,1,h),l=zf(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new hs(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=i[u];f||(i[u]=f=[]),f.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,A,m,b){if(A.length!==0){let p=[],d=[];Ad(A,p,d,m),p.length!==0&&b.push(new u(f,p,d))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let A={},m;for(m=0;m<f.length;m++)if(f[m].morphTargets)for(let b=0;b<f[m].morphTargets.length;b++)A[f[m].morphTargets[b]]=-1;for(let b in A){let p=[],d=[];for(let M=0;M!==f[m].morphTargets.length;++M){let y=f[m];p.push(y.time),d.push(y.morphTarget===b?1:0)}i.push(new hs(".morphTargetInfluence["+b+"]",p,d))}c=A.length*a}else{let A=".bones["+t[u].name+"]";n(us,A+".position",f,"pos",i),n(Yi,A+".quaternion",f,"rot",i),n(us,A+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Tb(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return hs;case"vector":case"vector2":case"vector3":case"vector4":return us;case"color":return Ec;case"quaternion":return Yi;case"bool":case"boolean":return Ds;case"string":return Ls}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Rb(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Tb(s.type);if(s.times===void 0){let t=[],n=[];Ad(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var ys={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},Xl=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let A=l[u],m=l[u+1];if(A.global&&(A.lastIndex=0),A.test(h))return m}return null}}},Bb=new Xl,Di=class{constructor(e){this.manager=e!==void 0?e:Bb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Di.DEFAULT_MATERIAL_NAME="__DEFAULT";var is={},Yl=class extends Error{constructor(e,t){super(e),this.response=t}},Ji=class extends Di{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ys.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(is[e]!==void 0){is[e].push({onLoad:t,onProgress:n,onError:i});return}is[e]=[],is[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||l.body===void 0||l.body.getReader===void 0)return l;let h=is[e],u=l.body.getReader(),f=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),A=f?parseInt(f):0,m=A!==0,b=0,p=new ReadableStream({start(d){M();function M(){u.read().then(({done:y,value:B})=>{if(y)d.close();else{b+=B.byteLength;let O=new ProgressEvent("progress",{lengthComputable:m,loaded:b,total:A});for(let P=0,N=h.length;P<N;P++){let H=h[P];H.onProgress&&H.onProgress(O)}d.enqueue(B),M()}})}}});return new Response(p)}else throw new Yl(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),f=u&&u[1]?u[1].toLowerCase():void 0,A=new TextDecoder(f);return l.arrayBuffer().then(m=>A.decode(m))}}}).then(l=>{ys.add(e,l);let h=is[e];delete is[e];for(let u=0,f=h.length;u<f;u++){let A=h[u];A.onLoad&&A.onLoad(l)}}).catch(l=>{let h=is[e];if(h===void 0)throw this.manager.itemError(e),l;delete is[e];for(let u=0,f=h.length;u<f;u++){let A=h[u];A.onError&&A.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Jl=class extends Di{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ys.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;let o=Va("img");function c(){h(),ys.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}};var xc=class extends Di{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new Is,o=new Ji(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}l.image!==void 0?a.image=l.image:l.data!==void 0&&(a.image.width=l.width,a.image.height=l.height,a.image.data=l.data),a.wrapS=l.wrapS!==void 0?l.wrapS:Gn,a.wrapT=l.wrapT!==void 0?l.wrapT:Gn,a.magFilter=l.magFilter!==void 0?l.magFilter:qt,a.minFilter=l.minFilter!==void 0?l.minFilter:qt,a.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0?a.colorSpace=l.colorSpace:l.encoding!==void 0&&(a.encoding=l.encoding),l.flipY!==void 0&&(a.flipY=l.flipY),l.format!==void 0&&(a.format=l.format),l.type!==void 0&&(a.type=l.type),l.mipmaps!==void 0&&(a.mipmaps=l.mipmaps,a.minFilter=Zn),l.mipmapCount===1&&(a.minFilter=qt),l.generateMipmaps!==void 0&&(a.generateMipmaps=l.generateMipmaps),a.needsUpdate=!0,t&&t(a,l)},n,i),a}},ir=class extends Di{constructor(e){super(e)}load(e,t,n,i){let r=new Wn,a=new Jl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},sr=class extends ln{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},$a=class extends sr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},yl=new ct,Vf=new G,Wf=new G,eo=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ka,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Vf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Vf),Wf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wf),t.updateMatrixWorld(),yl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(yl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},jl=class extends eo{constructor(){super(new _n(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=qr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},yc=class extends sr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.target=new ln,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new jl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Kf=new ct,Da=new G,vl=new G,Zl=class extends eo{constructor(){super(new _n(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ze(4,2),this._viewportCount=6,this._viewports=[new Rt(2,1,1,1),new Rt(0,1,1,1),new Rt(3,1,1,1),new Rt(1,1,1,1),new Rt(3,0,1,1),new Rt(1,0,1,1)],this._cubeDirections=[new G(1,0,0),new G(-1,0,0),new G(0,0,1),new G(0,0,-1),new G(0,1,0),new G(0,-1,0)],this._cubeUps=[new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,0,1),new G(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Da.setFromMatrixPosition(e.matrixWorld),n.position.copy(Da),vl.copy(n.position),vl.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(vl),n.updateMatrixWorld(),i.makeTranslation(-Da.x,-Da.y,-Da.z),Kf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kf)}},sa=class extends sr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Zl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},$l=class extends eo{constructor(){super(new Ss(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hi=class extends sr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.target=new ln,this.shadow=new $l}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},vc=class extends sr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ps=class{static decodeText(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Mc=class extends Di{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ys.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ys.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),ys.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ys.add(e,c),r.manager.itemStart(e)}};var eh=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){Vn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let a=this._workIndex*r;Vn.multiplyQuaternionsFlat(e,a,e,t,e,n),Vn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){let a=1-i;for(let o=0;o!==r;++o){let c=t+o;e[c]=e[c]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*i}}},uh="\\[\\]\\.:\\/",Db=new RegExp("["+uh+"]","g"),fh="[^"+uh+"]",Lb="[^"+uh.replace("\\.","")+"]",Pb=/((?:WC+[\/:])*)/.source.replace("WC",fh),Fb=/(WCOD+)?/.source.replace("WCOD",Lb),Nb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fh),Ub=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fh),Ob=new RegExp("^"+Pb+Fb+Nb+Ub+"$"),kb=["material","materials","bones","map"],th=class{constructor(e,t,n){let i=n||cn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},cn=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Db,"")}static parseTrackName(e){let t=Ob.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);kb.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};cn.Composite=th;cn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};cn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};cn.prototype.GetterByBindingType=[cn.prototype._getValue_direct,cn.prototype._getValue_array,cn.prototype._getValue_arrayElement,cn.prototype._getValue_toArray];cn.prototype.SetterByBindingTypeAndVersioning=[[cn.prototype._setValue_direct,cn.prototype._setValue_direct_setNeedsUpdate,cn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[cn.prototype._setValue_array,cn.prototype._setValue_array_setNeedsUpdate,cn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[cn.prototype._setValue_arrayElement,cn.prototype._setValue_arrayElement_setNeedsUpdate,cn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[cn.prototype._setValue_fromArray,cn.prototype._setValue_fromArray_setNeedsUpdate,cn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var nh=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,a=r.length,o=new Array(a),c={endingStart:Ur,endingEnd:Ur};for(let l=0;l!==a;++l){let h=r[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=np,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case sp:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case oh:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,a=n===ip;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===Tc){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){let o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=Or,i.endingEnd=Or):(e?i.endingStart=this.zeroSlopeAtStart?Or:Ur:i.endingStart=$o,t?i.endingEnd=this.zeroSlopeAtEnd?Or:Ur:i.endingEnd=$o)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}},Qb=new Float32Array(1),ra=class extends cs{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let f=i[u],A=f.name,m=h[A];if(m!==void 0)++m.referenceCount,a[u]=m;else{if(m=a[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,A));continue}let b=t&&t._propertyBindings[u].binding.parsedPath;m=new eh(cn.create(n,A,b),f.ValueTypeName,f.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,A),a[u]=m}o[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new bc(new Float32Array(2),new Float32Array(2),1,Qb),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,a=typeof e=="string"?ia.findByName(i,e):e,o=a!==null?a.uuid:e,c=this._actionsByClip[o],l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=oh),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;let h=new nh(this,a,t,n);return this._bindAction(h,l),this._addInactiveAction(h,o,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?ia.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,r,a);let o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){let l=a[o];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ih}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ih);function so(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new an,l=0;for(let h=0;h<s.length;++h){let u=s[h],f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let A in u.attributes){if(!n.has(A))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+A+'" attribute exists among all geometries, or in none of them.'),null;r[A]===void 0&&(r[A]=[]),r[A].push(u.attributes[A]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let A in u.morphAttributes){if(!i.has(A))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[A]===void 0&&(a[A]=[]),a[A].push(u.morphAttributes[A])}if(e){let A;if(t)A=u.index.count;else if(u.attributes.position!==void 0)A=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,A,h),l+=A}}if(t){let h=0,u=[];for(let f=0;f<s.length;++f){let A=s[f].index;for(let m=0;m<A.count;++m)u.push(A.getX(m)+h);h+=s[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=pd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let A=[];for(let b=0;b<a[h].length;++b)A.push(a[h][b][f]);let m=pd(A);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}return c}function pd(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){let h=s[l];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}let a=new e(r),o=0;for(let l=0;l<s.length;++l)a.set(s[l].array,o),o+=s[l].array.length;let c=new Ft(a,t,n);return i!==void 0&&(c.gpuType=i),c}function Ah(s,e){if(e===ed)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===to||e===Rc){let t=s.getIndex();if(t===null){let a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===to)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var la=class extends Di{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new xh(t)}),this.register(function(t){return new Rh(t)}),this.register(function(t){return new Bh(t)}),this.register(function(t){return new Dh(t)}),this.register(function(t){return new vh(t)}),this.register(function(t){return new Mh(t)}),this.register(function(t){return new Sh(t)}),this.register(function(t){return new Ch(t)}),this.register(function(t){return new Eh(t)}),this.register(function(t){return new wh(t)}),this.register(function(t){return new yh(t)}),this.register(function(t){return new Th(t)}),this.register(function(t){return new Ih(t)}),this.register(function(t){return new _h(t)}),this.register(function(t){return new Lh(t)}),this.register(function(t){return new Ph(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Ps.extractUrlBase(e);a=Ps.resolveURL(l,this.path)}else a=Ps.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Ji(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Ed){try{a[kt.KHR_BINARY_GLTF]=new Fh(e)}catch(u){i&&i(u);return}r=JSON.parse(a[kt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Hh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case kt.KHR_MATERIALS_UNLIT:a[u]=new bh;break;case kt.KHR_DRACO_MESH_COMPRESSION:a[u]=new Nh(r,this.dracoLoader);break;case kt.KHR_TEXTURE_TRANSFORM:a[u]=new Uh;break;case kt.KHR_MESH_QUANTIZATION:a[u]=new Oh;break;default:f.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function Gb(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var kt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},_h=class{constructor(e){this.parser=e,this.name=kt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new We(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],bn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Hi(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new sa(h),l.distance=u;break;case"spot":l=new yc(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Ns(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},bh=class{constructor(){this.name=kt.KHR_MATERIALS_UNLIT}getMaterialType(){return rn}extendParams(e,t,n){let i=[];e.color=new We(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],bn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Pt))}return Promise.all(i)}},Eh=class{constructor(e){this.parser=e,this.name=kt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},xh=class{constructor(e){this.parser=e,this.name=kt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ri}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ze(o,o)}return Promise.all(r)}},yh=class{constructor(e){this.parser=e,this.name=kt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ri}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},vh=class{constructor(e){this.parser=e,this.name=kt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ri}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new We(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],bn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Pt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},Mh=class{constructor(e){this.parser=e,this.name=kt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ri}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},Sh=class{constructor(e){this.parser=e,this.name=kt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ri}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new We().setRGB(o[0],o[1],o[2],bn),Promise.all(r)}},Ch=class{constructor(e){this.parser=e,this.name=kt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ri}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},wh=class{constructor(e){this.parser=e,this.name=kt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ri}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new We().setRGB(o[0],o[1],o[2],bn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Pt)),Promise.all(r)}},Ih=class{constructor(e){this.parser=e,this.name=kt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ri}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},Th=class{constructor(e){this.parser=e,this.name=kt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ri}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},Rh=class{constructor(e){this.parser=e,this.name=kt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Bh=class{constructor(e){this.parser=e,this.name=kt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Dh=class{constructor(e){this.parser=e,this.name=kt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Lh=class{constructor(e){this.name=kt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,f,i.mode,i.filter).then(function(A){return A.buffer}):a.ready.then(function(){let A=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(A),h,u,f,i.mode,i.filter),A})})}else return null}},Ph=class{constructor(e){this.name=kt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==Li.TRIANGLES&&l.mode!==Li.TRIANGLE_STRIP&&l.mode!==Li.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,A=[];for(let m of u){let b=new ct,p=new G,d=new Vn,M=new G(1,1,1),y=new vi(m.geometry,m.material,f);for(let B=0;B<f;B++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,B),c.ROTATION&&d.fromBufferAttribute(c.ROTATION,B),c.SCALE&&M.fromBufferAttribute(c.SCALE,B),y.setMatrixAt(B,b.compose(p,d,M));for(let B in c)if(B==="_COLOR_0"){let O=c[B];y.instanceColor=new Ti(O.array,O.itemSize,O.normalized)}else B!=="TRANSLATION"&&B!=="ROTATION"&&B!=="SCALE"&&m.geometry.setAttribute(B,c[B]);ln.prototype.copy.call(y,m),this.parser.assignFinalMaterial(y),A.push(y)}return h.isGroup?(h.clear(),h.add(...A),h):A[0]}))}},Ed="glTF",ro=12,md={JSON:1313821514,BIN:5130562},Fh=class{constructor(e){this.name=kt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ro),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ed)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-ro,r=new DataView(e,ro),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===md.JSON){let l=new Uint8Array(e,ro+a,o);this.content=n.decode(l)}else if(c===md.BIN){let l=ro+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Nh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=kt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=Qh[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=Qh[h]||h.toLowerCase();if(a[h]!==void 0){let f=n.accessors[e.attributes[h]],A=ca[f.componentType];l[u]=A.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){i.decodeDracoFile(h,function(A){for(let m in A.attributes){let b=A.attributes[m],p=c[m];p!==void 0&&(b.normalized=p)}u(A)},o,l,bn,f)})})}},Uh=class{constructor(){this.name=kt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Oh=class{constructor(){this.name=kt.KHR_MESH_QUANTIZATION}},Dc=class extends Bs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,f=u*u,A=f*u,m=e*l,b=m-l,p=-2*A+3*f,d=A-f,M=1-p,y=d-f+u;for(let B=0;B!==o;B++){let O=a[b+B+o],P=a[b+B+c]*h,N=a[m+B+o],H=a[m+B]*h;r[B]=M*O+y*P+p*N+d*H}return r}},Hb=new Vn,kh=class extends Dc{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return Hb.fromArray(r).normalize().toArray(r),r}},Li={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ca={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},gd={9728:Ln,9729:qt,9984:qo,9985:rh,9986:La,9987:Zn},_d={33071:Gn,33648:Ha,10497:ai},ph={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Qh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Fs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},zb={CUBICSPLINE:void 0,LINEAR:$s,STEP:Kr},mh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Vb(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ot({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qi})),s.DefaultMaterial}function or(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ns(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Wb(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(f)}if(i){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function Kb(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function qb(s){let e,t=s.extensions&&s.extensions[kt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+gh(t.attributes):e=s.indices+":"+gh(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+gh(s.targets[n]);return e}function gh(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Gh(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Xb(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var Yb=new ct,Hh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Gb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator!="undefined"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap=="undefined"||n||i&&r<98?this.textureLoader=new ir(this.options.manager):this.textureLoader=new Mc(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ji(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return or(r,o,i),Ns(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[kt.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(Ps.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=ph[i.type],o=ca[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Ft(l,a,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=ph[i.type],l=ca[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=i.byteOffset||0,A=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,b,p;if(A&&A!==u){let d=Math.floor(f/A),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+d+":"+i.count,y=t.cache.get(M);y||(b=new l(o,d*A,i.count*A/h),y=new $r(b,A/h),t.cache.add(M,y)),p=new er(y,c,f%A/h,m)}else o===null?b=new l(i.count*c):b=new l(o,f,i.count*c),p=new Ft(b,c,m);if(i.sparse!==void 0){let d=ph.SCALAR,M=ca[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,B=i.sparse.values.byteOffset||0,O=new M(a[1],y,i.sparse.count*d),P=new l(a[2],B,i.sparse.count*c);o!==null&&(p=new Ft(p.array.slice(),p.itemSize,p.normalized));for(let N=0,H=O.length;N<H;N++){let v=O[N];if(p.setX(v,P[N*c]),c>=2&&p.setY(v,P[N*c+1]),c>=3&&p.setZ(v,P[N*c+2]),c>=4&&p.setW(v,P[N*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return h.magFilter=gd[f.magFilter]||qt,h.minFilter=gd[f.minFilter]||Zn,h.wrapS=_d[f.wrapS]||ai,h.wrapT=_d[f.wrapT]||ai,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,A){let m=f;t.isImageBitmapLoader===!0&&(m=function(b){let p=new Wn(b);p.needsUpdate=!0,f(p)}),t.load(Ps.resolveURL(u,r.path),m,void 0,A)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),u.userData.mimeType=a.mimeType||Xb(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[kt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[kt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[kt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Ja,ci.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Ya,ci.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Ot}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[kt.KHR_MATERIALS_UNLIT]){let u=i[kt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new We(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],bn),o.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,Pt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Sn);let h=r.alphaMode||mh.OPAQUE;if(h===mh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===mh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==rn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ze(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==rn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==rn){let u=r.emissiveFactor;o.emissive=new We().setRGB(u[0],u[1],u[2],bn)}return r.emissiveTexture!==void 0&&a!==rn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Pt)),Promise.all(l).then(function(){let u=new a(o);return r.name&&(u.name=r.name),Ns(u,r),t.associations.set(u,{materials:e}),r.extensions&&or(i,u,r),u})}createUniqueName(e){let t=cn.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[kt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return bd(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=qb(l),u=i[h];if(u)a.push(u.promise);else{let f;l.extensions&&l.extensions[kt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=bd(new an,l,t),i[h]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?Vb(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let A=0,m=h.length;A<m;A++){let b=h[A],p=a[A],d,M=l[A];if(p.mode===Li.TRIANGLES||p.mode===Li.TRIANGLE_STRIP||p.mode===Li.TRIANGLE_FAN||p.mode===void 0)d=r.isSkinnedMesh===!0?new Xi(b,M):new ze(b,M),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),p.mode===Li.TRIANGLE_STRIP?d.geometry=Ah(d.geometry,Rc):p.mode===Li.TRIANGLE_FAN&&(d.geometry=Ah(d.geometry,to));else if(p.mode===Li.LINES)d=new ta(b,M);else if(p.mode===Li.LINE_STRIP)d=new ea(b,M);else if(p.mode===Li.LINE_LOOP)d=new pc(b,M);else if(p.mode===Li.POINTS)d=new Ts(b,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(d.geometry.morphAttributes).length>0&&Kb(d,r),d.name=t.createUniqueName(r.name||"mesh_"+e),Ns(d,r),p.extensions&&or(i,d,p),t.assignFinalMaterial(d),u.push(d)}for(let A=0,m=u.length;A<m;A++)t.associations.set(u[A],{meshes:e,primitives:A});if(u.length===1)return r.extensions&&or(i,u[0],r),u[0];let f=new Pn;r.extensions&&or(i,f,r),t.associations.set(f,{meshes:e});for(let A=0,m=u.length;A<m;A++)f.add(u[A]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new _n(id.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ss(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ns(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let f=new ct;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new tr(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,f=i.channels.length;u<f;u++){let A=i.channels[u],m=i.samplers[A.sampler],b=A.target,p=b.node,d=i.parameters!==void 0?i.parameters[m.input]:m.input,M=i.parameters!==void 0?i.parameters[m.output]:m.output;b.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",d)),c.push(this.getDependency("accessor",M)),l.push(m),h.push(b))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],A=u[1],m=u[2],b=u[3],p=u[4],d=[];for(let M=0,y=f.length;M<y;M++){let B=f[M],O=A[M],P=m[M],N=b[M],H=p[M];if(B===void 0)continue;B.updateMatrix&&B.updateMatrix();let v=n._createAnimationTracks(B,O,P,N,H);if(v)for(let D=0;D<v.length;D++)d.push(v[D])}return new ia(r,void 0,d)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(A){A.isSkinnedMesh&&A.bind(f,Yb)});for(let A=0,m=u.length;A<m;A++)h.add(u[A]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Xa:l.length>1?h=new Pn:l.length===1?h=l[0]:h=new ln,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Ns(h,r),r.extensions&&or(n,h,r),r.matrix!==void 0){let u=new ct;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Pn;n.name&&(r.name=i.createUniqueName(n.name)),Ns(r,n),n.extensions&&or(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,A]of i.associations)(f instanceof ci||f instanceof Wn)&&u.set(f,A);return h.traverse(f=>{let A=i.associations.get(f);A!=null&&u.set(f,A)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,c=[];Fs[r.path]===Fs.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(o);let l;switch(Fs[r.path]){case Fs.weights:l=hs;break;case Fs.rotation:l=Yi;break;case Fs.position:case Fs.scale:l=us;break;default:switch(n.itemSize){case 1:l=hs;break;case 2:case 3:default:l=us;break}break}let h=i.interpolation!==void 0?zb[i.interpolation]:$s,u=this._getArrayFromAccessor(n);for(let f=0,A=c.length;f<A;f++){let m=new l(c[f]+"."+Fs[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Gh(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Yi?kh:Dc;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Jb(s,e,t){let n=e.attributes,i=new Ii;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new G(c[0],c[1],c[2]),new G(l[0],l[1],l[2])),o.normalized){let h=Gh(ca[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new G,c=new G;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],A=f.min,m=f.max;if(A!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(A[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(A[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(A[2]),Math.abs(m[2]))),f.normalized){let b=Gh(ca[f.componentType]);c.multiplyScalar(b)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new yn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function bd(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(let a in n){let o=Qh[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return jt.workingColorSpace!==bn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${jt.workingColorSpace}" not supported.`),Ns(s,e),Jb(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Wb(s,e.targets,t):s})}var Lc=function(){"use strict";var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:s,r,a=WebAssembly.instantiate(o(i),{}).then(function(d){r=d.instance,r.exports.__wasm_call_ctors()});function o(d){for(var M=new Uint8Array(d.length),y=0;y<d.length;++y){var B=d.charCodeAt(y);M[y]=B>96?B-97:B>64?B-39:B+4}for(var O=0,y=0;y<d.length;++y)M[O++]=M[y]<60?n[M[y]]:(M[y]-60)*64+M[++y];return M.buffer.slice(0,O)}function c(d,M,y,B,O,P){var N=r.exports.sbrk,H=y+3&-4,v=N(H*B),D=N(O.length),J=new Uint8Array(r.exports.memory.buffer);J.set(O,D);var Z=d(v,y,B,D,O.length);if(Z==0&&P&&P(v,H,B),M.set(J.subarray(v,v+y*B)),N(v-N(0)),Z!=0)throw new Error("Malformed buffer data: "+Z)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],f=0;function A(d){var M={object:new Worker(d),pending:0,requests:{}};return M.object.onmessage=function(y){var B=y.data;M.pending-=B.count,M.requests[B.id][B.action](B.value),delete M.requests[B.id]},M}function m(d){for(var M="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+p.toString(),y=new Blob([M],{type:"text/javascript"}),B=URL.createObjectURL(y),O=0;O<d;++O)u[O]=A(B);URL.revokeObjectURL(B)}function b(d,M,y,B,O){for(var P=u[0],N=1;N<u.length;++N)u[N].pending<P.pending&&(P=u[N]);return new Promise(function(H,v){var D=new Uint8Array(y),J=f++;P.pending+=d,P.requests[J]={resolve:H,reject:v},P.object.postMessage({id:J,count:d,size:M,source:D,mode:B,filter:O},[D.buffer])})}function p(d){a.then(function(){var M=d.data;try{var y=new Uint8Array(M.count*M.size);c(r.exports[M.mode],y,M.count,M.size,M.source,r.exports[M.filter]),self.postMessage({id:M.id,count:M.count,action:"resolve",value:y},[y.buffer])}catch(B){self.postMessage({id:M.id,count:M.count,action:"reject",value:B})}})}return{ready:a,supported:!0,useWorkers:function(d){m(d)},decodeVertexBuffer:function(d,M,y,B,O){c(r.exports.meshopt_decodeVertexBuffer,d,M,y,B,r.exports[l[O]])},decodeIndexBuffer:function(d,M,y,B){c(r.exports.meshopt_decodeIndexBuffer,d,M,y,B)},decodeIndexSequence:function(d,M,y,B){c(r.exports.meshopt_decodeIndexSequence,d,M,y,B)},decodeGltfBuffer:function(d,M,y,B,O,P){c(r.exports[h[O]],d,M,y,B,r.exports[l[P]])},decodeGltfBufferAsync:function(d,M,y,B,O){return u.length>0?b(d,M,y,h[B],l[O]):a.then(function(){var P=new Uint8Array(d*M);return c(r.exports[h[B]],P,d,M,y,r.exports[l[O]]),P})}}}();function xd(s){let e=new Map,t=new Map,n=s.clone();return yd(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function yd(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)yd(s.children[n],e.children[n],t)}var ao=class extends ws{constructor(e=null){super();let t=new un;t.deleteAttribute("uv");let n=new Ot({side:Fn}),i=new Ot,r=5;e!==null&&e._useLegacyLights===!1&&(r=900);let a=new sa(16777215,r,28,2);a.position.set(.418,16.199,.3),this.add(a);let o=new ze(t,n);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);let c=new ze(t,i);c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),this.add(c);let l=new ze(t,i);l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),this.add(l);let h=new ze(t,i);h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),this.add(h);let u=new ze(t,i);u.position.set(-2.017,.018,6.124),u.rotation.set(0,.333,0),u.scale.set(2.002,4.566,2.064),this.add(u);let f=new ze(t,i);f.position.set(2.291,-.756,-2.621),f.rotation.set(0,-.286,0),f.scale.set(1.546,1.552,1.496),this.add(f);let A=new ze(t,i);A.position.set(-2.193,-.369,-5.547),A.rotation.set(0,.516,0),A.scale.set(3.875,3.487,2.986),this.add(A);let m=new ze(t,ha(50));m.position.set(-16.116,14.37,8.208),m.scale.set(.1,2.428,2.739),this.add(m);let b=new ze(t,ha(50));b.position.set(-16.109,18.021,-8.207),b.scale.set(.1,2.425,2.751),this.add(b);let p=new ze(t,ha(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);let d=new ze(t,ha(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let M=new ze(t,ha(20));M.position.set(3.235,11.486,-12.541),M.scale.set(2.5,2,.1),this.add(M);let y=new ze(t,ha(100));y.position.set(0,20,0),y.scale.set(1,.1,1),this.add(y)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function ha(s){let e=new rn;return e.color.setScalar(s),e}var Pc=class extends xc{constructor(e){super(e),this.type=oi}parse(e){let a=function(H,v){switch(H){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(v||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(v||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(v||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(v||""))}},h=`
`,u=function(H,v,D){v=v||1024;let Z=H.pos,ue=-1,k=0,Y="",$=String.fromCharCode.apply(null,new Uint16Array(H.subarray(Z,Z+128)));for(;0>(ue=$.indexOf(h))&&k<v&&Z<H.byteLength;)Y+=$,k+=$.length,Z+=128,$+=String.fromCharCode.apply(null,new Uint16Array(H.subarray(Z,Z+128)));return-1<ue?(D!==!1&&(H.pos+=k+ue+1),Y+$.slice(0,ue)):!1},f=function(H){let v=/^#\?(\S+)/,D=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,J=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,Z=/^\s*FORMAT=(\S+)\s*$/,ue=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,k={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},Y,$;for((H.pos>=H.byteLength||!(Y=u(H)))&&a(1,"no header found"),($=Y.match(v))||a(3,"bad initial token"),k.valid|=1,k.programtype=$[1],k.string+=Y+`
`;Y=u(H),Y!==!1;){if(k.string+=Y+`
`,Y.charAt(0)==="#"){k.comments+=Y+`
`;continue}if(($=Y.match(D))&&(k.gamma=parseFloat($[1])),($=Y.match(J))&&(k.exposure=parseFloat($[1])),($=Y.match(Z))&&(k.valid|=2,k.format=$[1]),($=Y.match(ue))&&(k.valid|=4,k.height=parseInt($[1],10),k.width=parseInt($[2],10)),k.valid&2&&k.valid&4)break}return k.valid&2||a(3,"missing format specifier"),k.valid&4||a(3,"missing image size specifier"),k},A=function(H,v,D){let J=v;if(J<8||J>32767||H[0]!==2||H[1]!==2||H[2]&128)return new Uint8Array(H);J!==(H[2]<<8|H[3])&&a(3,"wrong scanline width");let Z=new Uint8Array(4*v*D);Z.length||a(4,"unable to allocate buffer space");let ue=0,k=0,Y=4*J,$=new Uint8Array(4),fe=new Uint8Array(Y),Ae=D;for(;Ae>0&&k<H.byteLength;){k+4>H.byteLength&&a(1),$[0]=H[k++],$[1]=H[k++],$[2]=H[k++],$[3]=H[k++],($[0]!=2||$[1]!=2||($[2]<<8|$[3])!=J)&&a(3,"bad rgbe scanline format");let pe=0,be;for(;pe<Y&&k<H.byteLength;){be=H[k++];let Le=be>128;if(Le&&(be-=128),(be===0||pe+be>Y)&&a(3,"bad scanline data"),Le){let ce=H[k++];for(let ve=0;ve<be;ve++)fe[pe++]=ce}else fe.set(H.subarray(k,k+be),pe),pe+=be,k+=be}let Me=J;for(let Le=0;Le<Me;Le++){let ce=0;Z[ue]=fe[Le+ce],ce+=J,Z[ue+1]=fe[Le+ce],ce+=J,Z[ue+2]=fe[Le+ce],ce+=J,Z[ue+3]=fe[Le+ce],ue+=4}Ae--}return Z},m=function(H,v,D,J){let Z=H[v+3],ue=Math.pow(2,Z-128)/255;D[J+0]=H[v+0]*ue,D[J+1]=H[v+1]*ue,D[J+2]=H[v+2]*ue,D[J+3]=1},b=function(H,v,D,J){let Z=H[v+3],ue=Math.pow(2,Z-128)/255;D[J+0]=io.toHalfFloat(Math.min(H[v+0]*ue,65504)),D[J+1]=io.toHalfFloat(Math.min(H[v+1]*ue,65504)),D[J+2]=io.toHalfFloat(Math.min(H[v+2]*ue,65504)),D[J+3]=io.toHalfFloat(1)},p=new Uint8Array(e);p.pos=0;let d=f(p),M=d.width,y=d.height,B=A(p.subarray(p.pos),M,y),O,P,N;switch(this.type){case zn:N=B.length/4;let H=new Float32Array(N*4);for(let D=0;D<N;D++)m(B,D*4,H,D*4);O=H,P=zn;break;case oi:N=B.length/4;let v=new Uint16Array(N*4);for(let D=0;D<N;D++)b(B,D*4,v,D*4);O=v,P=oi;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:M,height:y,data:O,header:d.string,gamma:d.gamma,exposure:d.exposure,type:P}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(a,o){switch(a.type){case zn:case oi:a.colorSpace=bn,a.minFilter=qt,a.magFilter=qt,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,r,n,i)}};var Fc=class{constructor(e=4){this.pool=e,this.queue=[],this.workers=[],this.workersResolve=[],this.workerStatus=0}_initWorker(e){if(!this.workers[e]){let t=this.workerCreator();t.addEventListener("message",this._onMessage.bind(this,e)),this.workers[e]=t}}_getIdleWorker(){for(let e=0;e<this.pool;e++)if(!(this.workerStatus&1<<e))return e;return-1}_onMessage(e,t){let n=this.workersResolve[e];if(n&&n(t),this.queue.length){let{resolve:i,msg:r,transfer:a}=this.queue.shift();this.workersResolve[e]=i,this.workers[e].postMessage(r,a)}else this.workerStatus^=1<<e}setWorkerCreator(e){this.workerCreator=e}setWorkerLimit(e){this.pool=e}postMessage(e,t){return new Promise(n=>{let i=this._getIdleWorker();i!==-1?(this._initWorker(i),this.workerStatus|=1<<i,this.workersResolve[i]=n,this.workers[i].postMessage(e,t)):this.queue.push({resolve:n,msg:e,transfer:t})})}dispose(){this.workers.forEach(e=>e.terminate()),this.workersResolve.length=0,this.workers.length=0,this.queue.length=0,this.workerStatus=0}};var zh=class{constructor(){this.vkFormat=0,this.typeSize=1,this.pixelWidth=0,this.pixelHeight=0,this.pixelDepth=0,this.layerCount=0,this.faceCount=1,this.supercompressionScheme=0,this.levels=[],this.dataFormatDescriptor=[{vendorId:0,descriptorType:0,descriptorBlockSize:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],this.keyValue={},this.globalData=null}},cr=class{constructor(e,t,n,i){this._dataView=new DataView(e.buffer,e.byteOffset+t,n),this._littleEndian=i,this._offset=0}_nextUint8(){let e=this._dataView.getUint8(this._offset);return this._offset+=1,e}_nextUint16(){let e=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,e}_nextUint32(){let e=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint64(){let e=this._dataView.getUint32(this._offset,this._littleEndian)+4294967296*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,e}_nextInt32(){let e=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,e}_skip(e){return this._offset+=e,this}_scan(e,t=0){let n=this._offset,i=0;for(;this._dataView.getUint8(this._offset)!==t&&i<e;)i++,this._offset++;return i<e&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+n,i)}},DE=new Uint8Array([0]),hi=[171,75,84,88,32,50,48,187,13,10,26,10];function vd(s){return typeof TextDecoder!="undefined"?new TextDecoder().decode(s):Buffer.from(s).toString("utf8")}function Md(s){let e=new Uint8Array(s.buffer,s.byteOffset,hi.length);if(e[0]!==hi[0]||e[1]!==hi[1]||e[2]!==hi[2]||e[3]!==hi[3]||e[4]!==hi[4]||e[5]!==hi[5]||e[6]!==hi[6]||e[7]!==hi[7]||e[8]!==hi[8]||e[9]!==hi[9]||e[10]!==hi[10]||e[11]!==hi[11])throw new Error("Missing KTX 2.0 identifier.");let t=new zh,n=17*Uint32Array.BYTES_PER_ELEMENT,i=new cr(s,hi.length,n,!0);t.vkFormat=i._nextUint32(),t.typeSize=i._nextUint32(),t.pixelWidth=i._nextUint32(),t.pixelHeight=i._nextUint32(),t.pixelDepth=i._nextUint32(),t.layerCount=i._nextUint32(),t.faceCount=i._nextUint32();let r=i._nextUint32();t.supercompressionScheme=i._nextUint32();let a=i._nextUint32(),o=i._nextUint32(),c=i._nextUint32(),l=i._nextUint32(),h=i._nextUint64(),u=i._nextUint64(),f=new cr(s,hi.length+n,3*r*8,!0);for(let fe=0;fe<r;fe++)t.levels.push({levelData:new Uint8Array(s.buffer,s.byteOffset+f._nextUint64(),f._nextUint64()),uncompressedByteLength:f._nextUint64()});let A=new cr(s,a,o,!0),m={vendorId:A._skip(4)._nextUint16(),descriptorType:A._nextUint16(),versionNumber:A._nextUint16(),descriptorBlockSize:A._nextUint16(),colorModel:A._nextUint8(),colorPrimaries:A._nextUint8(),transferFunction:A._nextUint8(),flags:A._nextUint8(),texelBlockDimension:[A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8()],bytesPlane:[A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8()],samples:[]},b=(m.descriptorBlockSize/4-6)/4;for(let fe=0;fe<b;fe++){let Ae={bitOffset:A._nextUint16(),bitLength:A._nextUint8(),channelType:A._nextUint8(),samplePosition:[A._nextUint8(),A._nextUint8(),A._nextUint8(),A._nextUint8()],sampleLower:-1/0,sampleUpper:1/0};64&Ae.channelType?(Ae.sampleLower=A._nextInt32(),Ae.sampleUpper=A._nextInt32()):(Ae.sampleLower=A._nextUint32(),Ae.sampleUpper=A._nextUint32()),m.samples[fe]=Ae}t.dataFormatDescriptor.length=0,t.dataFormatDescriptor.push(m);let p=new cr(s,c,l,!0);for(;p._offset<l;){let fe=p._nextUint32(),Ae=p._scan(fe),pe=vd(Ae),be=p._scan(fe-Ae.byteLength);t.keyValue[pe]=pe.match(/^ktx/i)?vd(be):be,p._offset%4&&p._skip(4-p._offset%4)}if(u<=0)return t;let d=new cr(s,h,u,!0),M=d._nextUint16(),y=d._nextUint16(),B=d._nextUint32(),O=d._nextUint32(),P=d._nextUint32(),N=d._nextUint32(),H=[];for(let fe=0;fe<r;fe++)H.push({imageFlags:d._nextUint32(),rgbSliceByteOffset:d._nextUint32(),rgbSliceByteLength:d._nextUint32(),alphaSliceByteOffset:d._nextUint32(),alphaSliceByteLength:d._nextUint32()});let v=h+d._offset,D=v+B,J=D+O,Z=J+P,ue=new Uint8Array(s.buffer,s.byteOffset+v,B),k=new Uint8Array(s.buffer,s.byteOffset+D,O),Y=new Uint8Array(s.buffer,s.byteOffset+J,P),$=new Uint8Array(s.buffer,s.byteOffset+Z,N);return t.globalData={endpointCount:M,selectorCount:y,imageDescs:H,endpointsData:ue,selectorsData:k,tablesData:Y,extendedData:$},t}var Vh,fs,Kh,Wh={env:{emscripten_notify_memory_growth:function(s){Kh=new Uint8Array(fs.exports.memory.buffer)}}},Nc=class{init(){return Vh||(Vh=typeof fetch!="undefined"?fetch("data:application/wasm;base64,"+Sd).then(e=>e.arrayBuffer()).then(e=>WebAssembly.instantiate(e,Wh)).then(this._init):WebAssembly.instantiate(Buffer.from(Sd,"base64"),Wh).then(this._init),Vh)}_init(e){fs=e.instance,Wh.env.emscripten_notify_memory_growth(0)}decode(e,t=0){if(!fs)throw new Error("ZSTDDecoder: Await .init() before decoding.");let n=e.byteLength,i=fs.exports.malloc(n);Kh.set(e,i),t=t||Number(fs.exports.ZSTD_findDecompressedSize(i,n));let r=fs.exports.malloc(t),a=fs.exports.ZSTD_decompress(r,t,i,n),o=Kh.slice(r,r+a);return fs.exports.free(i),fs.exports.free(r),o}},Sd="AGFzbQEAAAABpQEVYAF/AX9gAn9/AGADf39/AX9gBX9/f39/AX9gAX8AYAJ/fwF/YAR/f39/AX9gA39/fwBgBn9/f39/fwF/YAd/f39/f39/AX9gAn9/AX5gAn5+AX5gAABgBX9/f39/AGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAABf2AIf39/f39/f38Bf2ANf39/f39/f39/f39/fwF/YAF/AX4CJwEDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgABANpaAEFAAAFAgEFCwACAQABAgIFBQcAAwABDgsBAQcAEhMHAAUBDAQEAAANBwQCAgYCBAgDAwMDBgEACQkHBgICAAYGAgQUBwYGAwIGAAMCAQgBBwUGCgoEEQAEBAEIAwgDBQgDEA8IAAcABAUBcAECAgUEAQCAAgYJAX8BQaCgwAILB2AHBm1lbW9yeQIABm1hbGxvYwAoBGZyZWUAJgxaU1REX2lzRXJyb3IAaBlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplAFQPWlNURF9kZWNvbXByZXNzAEoGX3N0YXJ0ACQJBwEAQQELASQKussBaA8AIAAgACgCBCABajYCBAsZACAAKAIAIAAoAgRBH3F0QQAgAWtBH3F2CwgAIABBiH9LC34BBH9BAyEBIAAoAgQiA0EgTQRAIAAoAggiASAAKAIQTwRAIAAQDQ8LIAAoAgwiAiABRgRAQQFBAiADQSBJGw8LIAAgASABIAJrIANBA3YiBCABIARrIAJJIgEbIgJrIgQ2AgggACADIAJBA3RrNgIEIAAgBCgAADYCAAsgAQsUAQF/IAAgARACIQIgACABEAEgAgv3AQECfyACRQRAIABCADcCACAAQQA2AhAgAEIANwIIQbh/DwsgACABNgIMIAAgAUEEajYCECACQQRPBEAgACABIAJqIgFBfGoiAzYCCCAAIAMoAAA2AgAgAUF/ai0AACIBBEAgAEEIIAEQFGs2AgQgAg8LIABBADYCBEF/DwsgACABNgIIIAAgAS0AACIDNgIAIAJBfmoiBEEBTQRAIARBAWtFBEAgACABLQACQRB0IANyIgM2AgALIAAgAS0AAUEIdCADajYCAAsgASACakF/ai0AACIBRQRAIABBADYCBEFsDwsgAEEoIAEQFCACQQN0ams2AgQgAgsWACAAIAEpAAA3AAAgACABKQAINwAICy8BAX8gAUECdEGgHWooAgAgACgCAEEgIAEgACgCBGprQR9xdnEhAiAAIAEQASACCyEAIAFCz9bTvtLHq9lCfiAAfEIfiUKHla+vmLbem55/fgsdAQF/IAAoAgggACgCDEYEfyAAKAIEQSBGBUEACwuCBAEDfyACQYDAAE8EQCAAIAEgAhBnIAAPCyAAIAJqIQMCQCAAIAFzQQNxRQRAAkAgAkEBSARAIAAhAgwBCyAAQQNxRQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADTw0BIAJBA3ENAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgA0F8aiIEIABJBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAsMACAAIAEpAAA3AAALQQECfyAAKAIIIgEgACgCEEkEQEEDDwsgACAAKAIEIgJBB3E2AgQgACABIAJBA3ZrIgE2AgggACABKAAANgIAQQALDAAgACABKAIANgAAC/cCAQJ/AkAgACABRg0AAkAgASACaiAASwRAIAAgAmoiBCABSw0BCyAAIAEgAhALDwsgACABc0EDcSEDAkACQCAAIAFJBEAgAwRAIAAhAwwDCyAAQQNxRQRAIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcQ0ACwwBCwJAIAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQhBSAGQQR2IQRBICAAdCIAQQFyIQkgASgCACEPQQAhAiADIQYCQANAIAlBAkggAiAPS3JFBEAgAiEHAkAgCARAA0AgBEH//wNxQf//A0YEQCAHQRhqIQcgBiAQSQR/IAZBAmoiBigAACAFdgUgBUEQaiEFIARBEHYLIQQMAQsLA0AgBEEDcSIIQQNGBEAgBUECaiEFIARBAnYhBCAHQQNqIQcMAQsLIAcgCGoiByAPSw0EIAVBAmohBQNAIAIgB0kEQCANIAJBAXRqQQA7AQAgAkEBaiECDAELCyAGIA5LQQAgBiAFQQN1aiIHIAxLG0UEQCAHKAAAIAVBB3EiBXYhBAwCCyAEQQJ2IQQLIAYhBwsCfyALQX9qIAQgAEF/anEiBiAAQQF0QX9qIgggCWsiEUkNABogBCAIcSIEQQAgESAEIABIG2shBiALCyEIIA0gAkEBdGogBkF/aiIEOwEAIAlBASAGayAEIAZBAUgbayEJA0AgCSAASARAIABBAXUhACALQX9qIQsMAQsLAn8gByAOS0EAIAcgBSAIaiIFQQN1aiIGIAxLG0UEQCAFQQdxDAELIAUgDCIGIAdrQQN0awshBSACQQFqIQIgBEUhCCAGKAAAIAVBH3F2IQQMAQsLQWwgCUEBRyAFQSBKcg0BGiABIAJBf2o2AgAgBiAFQQdqQQN1aiADawwBC0FQCyEAIApBEGokACAACwkAQQFBBSAAGwsMACAAIAEoAAA2AAALqgMBCn8jAEHwAGsiCiQAIAJBAWohDiAAQQhqIQtBgIAEIAVBf2p0QRB1IQxBACECQQEhBkEBIAV0IglBf2oiDyEIA0AgAiAORkUEQAJAIAEgAkEBdCINai8BACIHQf//A0YEQCALIAhBA3RqIAI2AgQgCEF/aiEIQQEhBwwBCyAGQQAgDCAHQRB0QRB1ShshBgsgCiANaiAHOwEAIAJBAWohAgwBCwsgACAFNgIEIAAgBjYCACAJQQN2IAlBAXZqQQNqIQxBACEAQQAhBkEAIQIDQCAGIA5GBEADQAJAIAAgCUYNACAKIAsgAEEDdGoiASgCBCIGQQF0aiICIAIvAQAiAkEBajsBACABIAUgAhAUayIIOgADIAEgAiAIQf8BcXQgCWs7AQAgASAEIAZBAnQiAmooAgA6AAIgASACIANqKAIANgIEIABBAWohAAwBCwsFIAEgBkEBdGouAQAhDUEAIQcDQCAHIA1ORQRAIAsgAkEDdGogBjYCBANAIAIgDGogD3EiAiAISw0ACyAHQQFqIQcMAQsLIAZBAWohBgwBCwsgCkHwAGokAAsjAEIAIAEQCSAAhUKHla+vmLbem55/fkLj3MqV/M7y9YV/fAsQACAAQn43AwggACABNgIACyQBAX8gAARAIAEoAgQiAgRAIAEoAgggACACEQEADwsgABAmCwsfACAAIAEgAi8BABAINgIAIAEQBBogACACQQRqNgIEC0oBAX9BoCAoAgAiASAAaiIAQX9MBEBBiCBBMDYCAEF/DwsCQCAAPwBBEHRNDQAgABBmDQBBiCBBMDYCAEF/DwtBoCAgADYCACABC9cBAQh/Qbp/IQoCQCACKAIEIgggAigCACIJaiIOIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQ0gACABQWBqIg8gCyAJQQAQKSADIAkgC2o2AgACQAJAIAwgBCAFa00EQCANIQUMAQsgDCAEIAZrSw0CIAcgDSAFayIAaiIBIAhqIAdNBEAgBCABIAgQDxoMAgsgBCABQQAgAGsQDyEBIAIgACAIaiIINgIEIAEgAGshBAsgBCAPIAUgCEEBECkLIA4hCgsgCgubAgEBfyMAQYABayINJAAgDSADNgJ8AkAgAkEDSwRAQX8hCQwBCwJAAkACQAJAIAJBAWsOAwADAgELIAZFBEBBuH8hCQwEC0FsIQkgBS0AACICIANLDQMgACAHIAJBAnQiAmooAgAgAiAIaigCABA7IAEgADYCAEEBIQkMAwsgASAJNgIAQQAhCQwCCyAKRQRAQWwhCQwCC0EAIQkgC0UgDEEZSHINAUEIIAR0QQhqIQBBACECA0AgAiAATw0CIAJBQGshAgwAAAsAC0FsIQkgDSANQfwAaiANQfgAaiAFIAYQFSICEAMNACANKAJ4IgMgBEsNACAAIA0gDSgCfCAHIAggAxAYIAEgADYCACACIQkLIA1BgAFqJAAgCQsLACAAIAEgAhALGgsQACAALwAAIAAtAAJBEHRyCy8AAn9BuH8gAUEISQ0AGkFyIAAoAAQiAEF3Sw0AGkG4fyAAQQhqIgAgACABSxsLCwkAIAAgATsAAAsDAAELigYBBX8gACAAKAIAIgVBfnE2AgBBACAAIAVBAXZqQYQgKAIAIgQgAEYbIQECQAJAIAAoAgQiAkUNACACKAIAIgNBAXENACACQQhqIgUgA0EBdkF4aiIDQQggA0EISxtnQR9zQQJ0QYAfaiIDKAIARgRAIAMgAigCDDYCAAsgAigCCCIDBEAgAyACKAIMNgIECyACKAIMIgMEQCADIAIoAgg2AgALIAIgAigCACAAKAIAQX5xajYCAEGEICEAAkACQCABRQ0AIAEgAjYCBCABKAIAIgNBAXENASADQQF2QXhqIgNBCCADQQhLG2dBH3NBAnRBgB9qIgMoAgAgAUEIakYEQCADIAEoAgw2AgALIAEoAggiAwRAIAMgASgCDDYCBAsgASgCDCIDBEAgAyABKAIINgIAQYQgKAIAIQQLIAIgAigCACABKAIAQX5xajYCACABIARGDQAgASABKAIAQQF2akEEaiEACyAAIAI2AgALIAIoAgBBAXZBeGoiAEEIIABBCEsbZ0Efc0ECdEGAH2oiASgCACEAIAEgBTYCACACIAA2AgwgAkEANgIIIABFDQEgACAFNgIADwsCQCABRQ0AIAEoAgAiAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAigCACABQQhqRgRAIAIgASgCDDYCAAsgASgCCCICBEAgAiABKAIMNgIECyABKAIMIgIEQCACIAEoAgg2AgBBhCAoAgAhBAsgACAAKAIAIAEoAgBBfnFqIgI2AgACQCABIARHBEAgASABKAIAQQF2aiAANgIEIAAoAgAhAgwBC0GEICAANgIACyACQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgIoAgAhASACIABBCGoiAjYCACAAIAE2AgwgAEEANgIIIAFFDQEgASACNgIADwsgBUEBdkF4aiIBQQggAUEISxtnQR9zQQJ0QYAfaiICKAIAIQEgAiAAQQhqIgI2AgAgACABNgIMIABBADYCCCABRQ0AIAEgAjYCAAsLDgAgAARAIABBeGoQJQsLgAIBA38CQCAAQQ9qQXhxQYQgKAIAKAIAQQF2ayICEB1Bf0YNAAJAQYQgKAIAIgAoAgAiAUEBcQ0AIAFBAXZBeGoiAUEIIAFBCEsbZ0Efc0ECdEGAH2oiASgCACAAQQhqRgRAIAEgACgCDDYCAAsgACgCCCIBBEAgASAAKAIMNgIECyAAKAIMIgFFDQAgASAAKAIINgIAC0EBIQEgACAAKAIAIAJBAXRqIgI2AgAgAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAygCACECIAMgAEEIaiIDNgIAIAAgAjYCDCAAQQA2AgggAkUNACACIAM2AgALIAELtwIBA38CQAJAIABBASAAGyICEDgiAA0AAkACQEGEICgCACIARQ0AIAAoAgAiA0EBcQ0AIAAgA0EBcjYCACADQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgAgAEEIakYEQCABIAAoAgw2AgALIAAoAggiAQRAIAEgACgCDDYCBAsgACgCDCIBBEAgASAAKAIINgIACyACECchAkEAIQFBhCAoAgAhACACDQEgACAAKAIAQX5xNgIAQQAPCyACQQ9qQXhxIgMQHSICQX9GDQIgAkEHakF4cSIAIAJHBEAgACACaxAdQX9GDQMLAkBBhCAoAgAiAUUEQEGAICAANgIADAELIAAgATYCBAtBhCAgADYCACAAIANBAXRBAXI2AgAMAQsgAEUNAQsgAEEIaiEBCyABC7kDAQJ/IAAgA2ohBQJAIANBB0wEQANAIAAgBU8NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwAAAsACyAEQQFGBEACQCAAIAJrIgZBB00EQCAAIAItAAA6AAAgACACLQABOgABIAAgAi0AAjoAAiAAIAItAAM6AAMgAEEEaiACIAZBAnQiBkHAHmooAgBqIgIQFyACIAZB4B5qKAIAayECDAELIAAgAhAMCyACQQhqIQIgAEEIaiEACwJAAkACQAJAIAUgAU0EQCAAIANqIQEgBEEBRyAAIAJrQQ9Kcg0BA0AgACACEAwgAkEIaiECIABBCGoiACABSQ0ACwwFCyAAIAFLBEAgACEBDAQLIARBAUcgACACa0EPSnINASAAIQMgAiEEA0AgAyAEEAwgBEEIaiEEIANBCGoiAyABSQ0ACwwCCwNAIAAgAhAHIAJBEGohAiAAQRBqIgAgAUkNAAsMAwsgACEDIAIhBANAIAMgBBAHIARBEGohBCADQRBqIgMgAUkNAAsLIAIgASAAa2ohAgsDQCABIAVPDQEgASACLQAAOgAAIAFBAWohASACQQFqIQIMAAALAAsLQQECfyAAIAAoArjgASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigCACACaiAAQQZ2IgFBAnRBsB5qKAIAaiAAQSBxIgBFaiABRSAAQQV2cWoFQbh/CwsdACAAKAKQ4gEQWiAAQQA2AqDiASAAQgA3A5DiAQu1AwEFfyMAQZACayIKJABBuH8hBgJAIAVFDQAgBCwAACIIQf8BcSEHAkAgCEF/TARAIAdBgn9qQQF2IgggBU8NAkFsIQYgB0GBf2oiBUGAAk8NAiAEQQFqIQdBACEGA0AgBiAFTwRAIAUhBiAIIQcMAwUgACAGaiAHIAZBAXZqIgQtAABBBHY6AAAgACAGQQFyaiAELQAAQQ9xOgAAIAZBAmohBgwBCwAACwALIAcgBU8NASAAIARBAWogByAKEFMiBhADDQELIAYhBEEAIQYgAUEAQTQQECEJQQAhBQNAIAQgBkcEQCAAIAZqIggtAAAiAUELSwRAQWwhBgwDBSAJIAFBAnRqIgEgASgCAEEBajYCACAGQQFqIQZBASAILQAAdEEBdSAFaiEFDAILAAsLQWwhBiAFRQ0AIAUQFEEBaiIBQQxLDQAgAyABNgIAQQFBASABdCAFayIDEBQiAXQgA0cNACAAIARqIAFBAWoiADoAACAJIABBAnRqIgAgACgCAEEBajYCACAJKAIEIgBBAkkgAEEBcXINACACIARBAWo2AgAgB0EBaiEGCyAKQZACaiQAIAYLxhEBDH8jAEHwAGsiBSQAQWwhCwJAIANBCkkNACACLwAAIQogAi8AAiEJIAIvAAQhByAFQQhqIAQQDgJAIAMgByAJIApqakEGaiIMSQ0AIAUtAAohCCAFQdgAaiACQQZqIgIgChAGIgsQAw0BIAVBQGsgAiAKaiICIAkQBiILEAMNASAFQShqIAIgCWoiAiAHEAYiCxADDQEgBUEQaiACIAdqIAMgDGsQBiILEAMNASAAIAFqIg9BfWohECAEQQRqIQZBASELIAAgAUEDakECdiIDaiIMIANqIgIgA2oiDiEDIAIhBCAMIQcDQCALIAMgEElxBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgCS0AAyELIAcgBiAFQUBrIAgQAkECdGoiCS8BADsAACAFQUBrIAktAAIQASAJLQADIQogBCAGIAVBKGogCBACQQJ0aiIJLwEAOwAAIAVBKGogCS0AAhABIAktAAMhCSADIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgDS0AAyENIAAgC2oiCyAGIAVB2ABqIAgQAkECdGoiAC8BADsAACAFQdgAaiAALQACEAEgAC0AAyEAIAcgCmoiCiAGIAVBQGsgCBACQQJ0aiIHLwEAOwAAIAVBQGsgBy0AAhABIActAAMhByAEIAlqIgkgBiAFQShqIAgQAkECdGoiBC8BADsAACAFQShqIAQtAAIQASAELQADIQQgAyANaiIDIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgACALaiEAIAcgCmohByAEIAlqIQQgAyANLQADaiEDIAVB2ABqEA0gBUFAaxANciAFQShqEA1yIAVBEGoQDXJFIQsMAQsLIAQgDksgByACS3INAEFsIQsgACAMSw0BIAxBfWohCQNAQQAgACAJSSAFQdgAahAEGwRAIAAgBiAFQdgAaiAIEAJBAnRqIgovAQA7AAAgBUHYAGogCi0AAhABIAAgCi0AA2oiACAGIAVB2ABqIAgQAkECdGoiCi8BADsAACAFQdgAaiAKLQACEAEgACAKLQADaiEADAEFIAxBfmohCgNAIAVB2ABqEAQgACAKS3JFBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgACAJLQADaiEADAELCwNAIAAgCk0EQCAAIAYgBUHYAGogCBACQQJ0aiIJLwEAOwAAIAVB2ABqIAktAAIQASAAIAktAANqIQAMAQsLAkAgACAMTw0AIAAgBiAFQdgAaiAIEAIiAEECdGoiDC0AADoAACAMLQADQQFGBEAgBUHYAGogDC0AAhABDAELIAUoAlxBH0sNACAFQdgAaiAGIABBAnRqLQACEAEgBSgCXEEhSQ0AIAVBIDYCXAsgAkF9aiEMA0BBACAHIAxJIAVBQGsQBBsEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiIAIAYgBUFAayAIEAJBAnRqIgcvAQA7AAAgBUFAayAHLQACEAEgACAHLQADaiEHDAEFIAJBfmohDANAIAVBQGsQBCAHIAxLckUEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwNAIAcgDE0EQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwJAIAcgAk8NACAHIAYgBUFAayAIEAIiAEECdGoiAi0AADoAACACLQADQQFGBEAgBUFAayACLQACEAEMAQsgBSgCREEfSw0AIAVBQGsgBiAAQQJ0ai0AAhABIAUoAkRBIUkNACAFQSA2AkQLIA5BfWohAgNAQQAgBCACSSAFQShqEAQbBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2oiACAGIAVBKGogCBACQQJ0aiIELwEAOwAAIAVBKGogBC0AAhABIAAgBC0AA2ohBAwBBSAOQX5qIQIDQCAFQShqEAQgBCACS3JFBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsDQCAEIAJNBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsCQCAEIA5PDQAgBCAGIAVBKGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBKGogAi0AAhABDAELIAUoAixBH0sNACAFQShqIAYgAEECdGotAAIQASAFKAIsQSFJDQAgBUEgNgIsCwNAQQAgAyAQSSAFQRBqEAQbBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2oiACAGIAVBEGogCBACQQJ0aiICLwEAOwAAIAVBEGogAi0AAhABIAAgAi0AA2ohAwwBBSAPQX5qIQIDQCAFQRBqEAQgAyACS3JFBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsDQCADIAJNBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsCQCADIA9PDQAgAyAGIAVBEGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBEGogAi0AAhABDAELIAUoAhRBH0sNACAFQRBqIAYgAEECdGotAAIQASAFKAIUQSFJDQAgBUEgNgIUCyABQWwgBUHYAGoQCiAFQUBrEApxIAVBKGoQCnEgBUEQahAKcRshCwwJCwAACwALAAALAAsAAAsACwAACwALQWwhCwsgBUHwAGokACALC7UEAQ5/IwBBEGsiBiQAIAZBBGogABAOQVQhBQJAIARB3AtJDQAgBi0ABCEHIANB8ARqQQBB7AAQECEIIAdBDEsNACADQdwJaiIJIAggBkEIaiAGQQxqIAEgAhAxIhAQA0UEQCAGKAIMIgQgB0sNASADQdwFaiEPIANBpAVqIREgAEEEaiESIANBqAVqIQEgBCEFA0AgBSICQX9qIQUgCCACQQJ0aigCAEUNAAsgAkEBaiEOQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgASALaiAKNgIAIAVBAWohBSAKIAxqIQoMAQsLIAEgCjYCAEEAIQUgBigCCCELA0AgBSALRkUEQCABIAUgCWotAAAiDEECdGoiDSANKAIAIg1BAWo2AgAgDyANQQF0aiINIAw6AAEgDSAFOgAAIAVBAWohBQwBCwtBACEBIANBADYCqAUgBEF/cyAHaiEJQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgAyALaiABNgIAIAwgBSAJanQgAWohASAFQQFqIQUMAQsLIAcgBEEBaiIBIAJrIgRrQQFqIQgDQEEBIQUgBCAIT0UEQANAIAUgDk9FBEAgBUECdCIJIAMgBEE0bGpqIAMgCWooAgAgBHY2AgAgBUEBaiEFDAELCyAEQQFqIQQMAQsLIBIgByAPIAogESADIAIgARBkIAZBAToABSAGIAc6AAYgACAGKAIENgIACyAQIQULIAZBEGokACAFC8ENAQt/IwBB8ABrIgUkAEFsIQkCQCADQQpJDQAgAi8AACEKIAIvAAIhDCACLwAEIQYgBUEIaiAEEA4CQCADIAYgCiAMampBBmoiDUkNACAFLQAKIQcgBUHYAGogAkEGaiICIAoQBiIJEAMNASAFQUBrIAIgCmoiAiAMEAYiCRADDQEgBUEoaiACIAxqIgIgBhAGIgkQAw0BIAVBEGogAiAGaiADIA1rEAYiCRADDQEgACABaiIOQX1qIQ8gBEEEaiEGQQEhCSAAIAFBA2pBAnYiAmoiCiACaiIMIAJqIg0hAyAMIQQgCiECA0AgCSADIA9JcQRAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAACAGIAVBQGsgBxACQQF0aiIILQAAIQsgBUFAayAILQABEAEgAiALOgAAIAYgBUEoaiAHEAJBAXRqIggtAAAhCyAFQShqIAgtAAEQASAEIAs6AAAgBiAFQRBqIAcQAkEBdGoiCC0AACELIAVBEGogCC0AARABIAMgCzoAACAGIAVB2ABqIAcQAkEBdGoiCC0AACELIAVB2ABqIAgtAAEQASAAIAs6AAEgBiAFQUBrIAcQAkEBdGoiCC0AACELIAVBQGsgCC0AARABIAIgCzoAASAGIAVBKGogBxACQQF0aiIILQAAIQsgBUEoaiAILQABEAEgBCALOgABIAYgBUEQaiAHEAJBAXRqIggtAAAhCyAFQRBqIAgtAAEQASADIAs6AAEgA0ECaiEDIARBAmohBCACQQJqIQIgAEECaiEAIAkgBUHYAGoQDUVxIAVBQGsQDUVxIAVBKGoQDUVxIAVBEGoQDUVxIQkMAQsLIAQgDUsgAiAMS3INAEFsIQkgACAKSw0BIApBfWohCQNAIAVB2ABqEAQgACAJT3JFBEAgBiAFQdgAaiAHEAJBAXRqIggtAAAhCyAFQdgAaiAILQABEAEgACALOgAAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAASAAQQJqIQAMAQsLA0AgBUHYAGoQBCAAIApPckUEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCwNAIAAgCkkEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCyAMQX1qIQADQCAFQUBrEAQgAiAAT3JFBEAgBiAFQUBrIAcQAkEBdGoiCi0AACEJIAVBQGsgCi0AARABIAIgCToAACAGIAVBQGsgBxACQQF0aiIKLQAAIQkgBUFAayAKLQABEAEgAiAJOgABIAJBAmohAgwBCwsDQCAFQUBrEAQgAiAMT3JFBEAgBiAFQUBrIAcQAkEBdGoiAC0AACEKIAVBQGsgAC0AARABIAIgCjoAACACQQFqIQIMAQsLA0AgAiAMSQRAIAYgBUFAayAHEAJBAXRqIgAtAAAhCiAFQUBrIAAtAAEQASACIAo6AAAgAkEBaiECDAELCyANQX1qIQADQCAFQShqEAQgBCAAT3JFBEAgBiAFQShqIAcQAkEBdGoiAi0AACEKIAVBKGogAi0AARABIAQgCjoAACAGIAVBKGogBxACQQF0aiICLQAAIQogBUEoaiACLQABEAEgBCAKOgABIARBAmohBAwBCwsDQCAFQShqEAQgBCANT3JFBEAgBiAFQShqIAcQAkEBdGoiAC0AACECIAVBKGogAC0AARABIAQgAjoAACAEQQFqIQQMAQsLA0AgBCANSQRAIAYgBUEoaiAHEAJBAXRqIgAtAAAhAiAFQShqIAAtAAEQASAEIAI6AAAgBEEBaiEEDAELCwNAIAVBEGoQBCADIA9PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIAYgBUEQaiAHEAJBAXRqIgAtAAAhAiAFQRBqIAAtAAEQASADIAI6AAEgA0ECaiEDDAELCwNAIAVBEGoQBCADIA5PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIANBAWohAwwBCwsDQCADIA5JBEAgBiAFQRBqIAcQAkEBdGoiAC0AACECIAVBEGogAC0AARABIAMgAjoAACADQQFqIQMMAQsLIAFBbCAFQdgAahAKIAVBQGsQCnEgBUEoahAKcSAFQRBqEApxGyEJDAELQWwhCQsgBUHwAGokACAJC8oCAQR/IwBBIGsiBSQAIAUgBBAOIAUtAAIhByAFQQhqIAIgAxAGIgIQA0UEQCAEQQRqIQIgACABaiIDQX1qIQQDQCAFQQhqEAQgACAET3JFBEAgAiAFQQhqIAcQAkEBdGoiBi0AACEIIAVBCGogBi0AARABIAAgCDoAACACIAVBCGogBxACQQF0aiIGLQAAIQggBUEIaiAGLQABEAEgACAIOgABIABBAmohAAwBCwsDQCAFQQhqEAQgACADT3JFBEAgAiAFQQhqIAcQAkEBdGoiBC0AACEGIAVBCGogBC0AARABIAAgBjoAACAAQQFqIQAMAQsLA0AgACADT0UEQCACIAVBCGogBxACQQF0aiIELQAAIQYgBUEIaiAELQABEAEgACAGOgAAIABBAWohAAwBCwsgAUFsIAVBCGoQChshAgsgBUEgaiQAIAILtgMBCX8jAEEQayIGJAAgBkEANgIMIAZBADYCCEFUIQQCQAJAIANBQGsiDCADIAZBCGogBkEMaiABIAIQMSICEAMNACAGQQRqIAAQDiAGKAIMIgcgBi0ABEEBaksNASAAQQRqIQogBkEAOgAFIAYgBzoABiAAIAYoAgQ2AgAgB0EBaiEJQQEhBANAIAQgCUkEQCADIARBAnRqIgEoAgAhACABIAU2AgAgACAEQX9qdCAFaiEFIARBAWohBAwBCwsgB0EBaiEHQQAhBSAGKAIIIQkDQCAFIAlGDQEgAyAFIAxqLQAAIgRBAnRqIgBBASAEdEEBdSILIAAoAgAiAWoiADYCACAHIARrIQhBACEEAkAgC0EDTQRAA0AgBCALRg0CIAogASAEakEBdGoiACAIOgABIAAgBToAACAEQQFqIQQMAAALAAsDQCABIABPDQEgCiABQQF0aiIEIAg6AAEgBCAFOgAAIAQgCDoAAyAEIAU6AAIgBCAIOgAFIAQgBToABCAEIAg6AAcgBCAFOgAGIAFBBGohAQwAAAsACyAFQQFqIQUMAAALAAsgAiEECyAGQRBqJAAgBAutAQECfwJAQYQgKAIAIABHIAAoAgBBAXYiAyABa0F4aiICQXhxQQhHcgR/IAIFIAMQJ0UNASACQQhqC0EQSQ0AIAAgACgCACICQQFxIAAgAWpBD2pBeHEiASAAa0EBdHI2AgAgASAANgIEIAEgASgCAEEBcSAAIAJBAXZqIAFrIgJBAXRyNgIAQYQgIAEgAkH/////B3FqQQRqQYQgKAIAIABGGyABNgIAIAEQJQsLygIBBX8CQAJAAkAgAEEIIABBCEsbZ0EfcyAAaUEBR2oiAUEESSAAIAF2cg0AIAFBAnRB/B5qKAIAIgJFDQADQCACQXhqIgMoAgBBAXZBeGoiBSAATwRAIAIgBUEIIAVBCEsbZ0Efc0ECdEGAH2oiASgCAEYEQCABIAIoAgQ2AgALDAMLIARBHksNASAEQQFqIQQgAigCBCICDQALC0EAIQMgAUEgTw0BA0AgAUECdEGAH2ooAgAiAkUEQCABQR5LIQIgAUEBaiEBIAJFDQEMAwsLIAIgAkF4aiIDKAIAQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgBGBEAgASACKAIENgIACwsgAigCACIBBEAgASACKAIENgIECyACKAIEIgEEQCABIAIoAgA2AgALIAMgAygCAEEBcjYCACADIAAQNwsgAwvhCwINfwV+IwBB8ABrIgckACAHIAAoAvDhASIINgJcIAEgAmohDSAIIAAoAoDiAWohDwJAAkAgBUUEQCABIQQMAQsgACgCxOABIRAgACgCwOABIREgACgCvOABIQ4gAEEBNgKM4QFBACEIA0AgCEEDRwRAIAcgCEECdCICaiAAIAJqQazQAWooAgA2AkQgCEEBaiEIDAELC0FsIQwgB0EYaiADIAQQBhADDQEgB0EsaiAHQRhqIAAoAgAQEyAHQTRqIAdBGGogACgCCBATIAdBPGogB0EYaiAAKAIEEBMgDUFgaiESIAEhBEEAIQwDQCAHKAIwIAcoAixBA3RqKQIAIhRCEIinQf8BcSEIIAcoAkAgBygCPEEDdGopAgAiFUIQiKdB/wFxIQsgBygCOCAHKAI0QQN0aikCACIWQiCIpyEJIBVCIIghFyAUQiCIpyECAkAgFkIQiKdB/wFxIgNBAk8EQAJAIAZFIANBGUlyRQRAIAkgB0EYaiADQSAgBygCHGsiCiAKIANLGyIKEAUgAyAKayIDdGohCSAHQRhqEAQaIANFDQEgB0EYaiADEAUgCWohCQwBCyAHQRhqIAMQBSAJaiEJIAdBGGoQBBoLIAcpAkQhGCAHIAk2AkQgByAYNwNIDAELAkAgA0UEQCACBEAgBygCRCEJDAMLIAcoAkghCQwBCwJAAkAgB0EYakEBEAUgCSACRWpqIgNBA0YEQCAHKAJEQX9qIgMgA0VqIQkMAQsgA0ECdCAHaigCRCIJIAlFaiEJIANBAUYNAQsgByAHKAJINgJMCwsgByAHKAJENgJIIAcgCTYCRAsgF6chAyALBEAgB0EYaiALEAUgA2ohAwsgCCALakEUTwRAIAdBGGoQBBoLIAgEQCAHQRhqIAgQBSACaiECCyAHQRhqEAQaIAcgB0EYaiAUQhiIp0H/AXEQCCAUp0H//wNxajYCLCAHIAdBGGogFUIYiKdB/wFxEAggFadB//8DcWo2AjwgB0EYahAEGiAHIAdBGGogFkIYiKdB/wFxEAggFqdB//8DcWo2AjQgByACNgJgIAcoAlwhCiAHIAk2AmggByADNgJkAkACQAJAIAQgAiADaiILaiASSw0AIAIgCmoiEyAPSw0AIA0gBGsgC0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdBKGogACgCBBATQQAhBCAHQeAAaiEMIAdB5ABqIQoDQCAHQShqEARBAksgBCAXTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEJIAcoAkggBygCREEDdGopAgAiH0IgiKchCCAeQiCIISAgHUIgiKchAgJAIB9CEIinQf8BcSIDQQJPBEACQCAGRSADQRlJckUEQCAIIAdBKGogA0EgIAcoAixrIg0gDSADSxsiDRAFIAMgDWsiA3RqIQggB0EoahAEGiADRQ0BIAdBKGogAxAFIAhqIQgMAQsgB0EoaiADEAUgCGohCCAHQShqEAQaCyAHKQJUISEgByAINgJUIAcgITcDWAwBCwJAIANFBEAgAgRAIAcoAlQhCAwDCyAHKAJYIQgMAQsCQAJAIAdBKGpBARAFIAggAkVqaiIDQQNGBEAgBygCVEF/aiIDIANFaiEIDAELIANBAnQgB2ooAlQiCCAIRWohCCADQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAg2AlQLICCnIQMgCQRAIAdBKGogCRAFIANqIQMLIAkgC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgAmohAgsgB0EoahAEGiAHIAcoAmggAmoiCSADajYCaCAKIAwgCCAJSxsoAgAhDSAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogB0EoaiAfQhiIp0H/AXEQCCEOIAdB8ABqIARBBHRqIgsgCSANaiAIazYCDCALIAg2AgggCyADNgIEIAsgAjYCACAHIA4gH6dB//8DcWo2AkQgBEEBaiEEDAELCyAEIBdIDQEgEkFgaiEYIAdB4ABqIRogB0HkAGohGyABIQMDQCAHQShqEARBAksgBCAFTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEIIAcoAkggBygCREEDdGopAgAiH0IgiKchCSAeQiCIISAgHUIgiKchDAJAIB9CEIinQf8BcSICQQJPBEACQCAGRSACQRlJckUEQCAJIAdBKGogAkEgIAcoAixrIgogCiACSxsiChAFIAIgCmsiAnRqIQkgB0EoahAEGiACRQ0BIAdBKGogAhAFIAlqIQkMAQsgB0EoaiACEAUgCWohCSAHQShqEAQaCyAHKQJUISEgByAJNgJUIAcgITcDWAwBCwJAIAJFBEAgDARAIAcoAlQhCQwDCyAHKAJYIQkMAQsCQAJAIAdBKGpBARAFIAkgDEVqaiICQQNGBEAgBygCVEF/aiICIAJFaiEJDAELIAJBAnQgB2ooAlQiCSAJRWohCSACQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAk2AlQLICCnIRQgCARAIAdBKGogCBAFIBRqIRQLIAggC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgDGohDAsgB0EoahAEGiAHIAcoAmggDGoiGSAUajYCaCAbIBogCSAZSxsoAgAhHCAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogByAHQShqIB9CGIinQf8BcRAIIB+nQf//A3FqNgJEIAcgB0HwAGogBEEDcUEEdGoiDSkDCCIdNwPIASAHIA0pAwAiHjcDwAECQAJAAkAgBygCvAEiDiAepyICaiIWIBNLDQAgAyAHKALEASIKIAJqIgtqIBhLDQAgEiADayALQSBqTw0BCyAHIAcpA8gBNwMQIAcgBykDwAE3AwggAyASIAdBCGogB0G8AWogEyAPIBUgERAeIQsMAQsgAiADaiEIIAMgDhAHIAJBEU8EQCADQRBqIQIDQCACIA5BEGoiDhAHIAJBEGoiAiAISQ0ACwsgCCAdpyIOayECIAcgFjYCvAEgDiAIIA9rSwRAIA4gCCAVa0sEQEFsIQsMAgsgESACIA9rIgJqIhYgCmogEU0EQCAIIBYgChAPGgwCCyAIIBZBACACaxAPIQggByACIApqIgo2AsQBIAggAmshCCAPIQILIA5BEE8EQCAIIApqIQoDQCAIIAIQByACQRBqIQIgCEEQaiIIIApJDQALDAELAkAgDkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgDkECdCIKQcAeaigCAGoiAhAXIAIgCkHgHmooAgBrIQIgBygCxAEhCgwBCyAIIAIQDAsgCkEJSQ0AIAggCmohCiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAKSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAKSQ0ACwsgCxADBEAgCyEQDAQFIA0gDDYCACANIBkgHGogCWs2AgwgDSAJNgIIIA0gFDYCBCAEQQFqIQQgAyALaiEDDAILAAsLIAQgBUgNASAEIBdrIQtBACEEA0AgCyAFSARAIAcgB0HwAGogC0EDcUEEdGoiAikDCCIdNwPIASAHIAIpAwAiHjcDwAECQAJAAkAgBygCvAEiDCAepyICaiIKIBNLDQAgAyAHKALEASIJIAJqIhBqIBhLDQAgEiADayAQQSBqTw0BCyAHIAcpA8gBNwMgIAcgBykDwAE3AxggAyASIAdBGGogB0G8AWogEyAPIBUgERAeIRAMAQsgAiADaiEIIAMgDBAHIAJBEU8EQCADQRBqIQIDQCACIAxBEGoiDBAHIAJBEGoiAiAISQ0ACwsgCCAdpyIGayECIAcgCjYCvAEgBiAIIA9rSwRAIAYgCCAVa0sEQEFsIRAMAgsgESACIA9rIgJqIgwgCWogEU0EQCAIIAwgCRAPGgwCCyAIIAxBACACaxAPIQggByACIAlqIgk2AsQBIAggAmshCCAPIQILIAZBEE8EQCAIIAlqIQYDQCAIIAIQByACQRBqIQIgCEEQaiIIIAZJDQALDAELAkAgBkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgBkECdCIGQcAeaigCAGoiAhAXIAIgBkHgHmooAgBrIQIgBygCxAEhCQwBCyAIIAIQDAsgCUEJSQ0AIAggCWohBiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAGSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAGSQ0ACwsgEBADDQMgC0EBaiELIAMgEGohAwwBCwsDQCAEQQNHBEAgACAEQQJ0IgJqQazQAWogAiAHaigCVDYCACAEQQFqIQQMAQsLIAcoArwBIQgLQbp/IRAgEyAIayIAIBIgA2tLDQAgAwR/IAMgCCAAEAsgAGoFQQALIAFrIRALIAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY0AAQMyIFEAMiBg0AIANBHzYCfCADIANB/ABqIANB+ABqIAQgBCAFaiAGGyIEIAEgAmoiAiAEaxAVIgUQAw0AIAMoAnwiBkEfSw0AIAMoAngiB0EJTw0AIABBiCBqIAMgBkGAC0GADCAHEBggA0E0NgJ8IAMgA0H8AGogA0H4AGogBCAFaiIEIAIgBGsQFSIFEAMNACADKAJ8IgZBNEsNACADKAJ4IgdBCk8NACAAQZAwaiADIAZBgA1B4A4gBxAYIANBIzYCfCADIANB/ABqIANB+ABqIAQgBWoiBCACIARrEBUiBRADDQAgAygCfCIGQSNLDQAgAygCeCIHQQpPDQAgACADIAZBwBBB0BEgBxAYIAQgBWoiBEEMaiIFIAJLDQAgAiAFayEFQQAhAgNAIAJBA0cEQCAEKAAAIgZBf2ogBU8NAiAAIAJBAnRqQZzQAWogBjYCACACQQFqIQIgBEEEaiEEDAELCyAEIAFrIQgLIANBgAFqJAAgCAtGAQN/IABBCGohAyAAKAIEIQJBACEAA0AgACACdkUEQCABIAMgAEEDdGotAAJBFktqIQEgAEEBaiEADAELCyABQQggAmt0C4YDAQV/Qbh/IQcCQCADRQ0AIAItAAAiBEUEQCABQQA2AgBBAUG4fyADQQFGGw8LAn8gAkEBaiIFIARBGHRBGHUiBkF/Sg0AGiAGQX9GBEAgA0EDSA0CIAUvAABBgP4BaiEEIAJBA2oMAQsgA0ECSA0BIAItAAEgBEEIdHJBgIB+aiEEIAJBAmoLIQUgASAENgIAIAVBAWoiASACIANqIgNLDQBBbCEHIABBEGogACAFLQAAIgVBBnZBI0EJIAEgAyABa0HAEEHQEUHwEiAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBmCBqIABBCGogBUEEdkEDcUEfQQggASABIAZqIAgbIgEgAyABa0GAC0GADEGAFyAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBoDBqIABBBGogBUECdkEDcUE0QQkgASABIAZqIAgbIgEgAyABa0GADUHgDkGQGSAAKAKM4QEgACgCnOIBIAQQHyIAEAMNACAAIAFqIAJrIQcLIAcLrQMBCn8jAEGABGsiCCQAAn9BUiACQf8BSw0AGkFUIANBDEsNABogAkEBaiELIABBBGohCUGAgAQgA0F/anRBEHUhCkEAIQJBASEEQQEgA3QiB0F/aiIMIQUDQCACIAtGRQRAAkAgASACQQF0Ig1qLwEAIgZB//8DRgRAIAkgBUECdGogAjoAAiAFQX9qIQVBASEGDAELIARBACAKIAZBEHRBEHVKGyEECyAIIA1qIAY7AQAgAkEBaiECDAELCyAAIAQ7AQIgACADOwEAIAdBA3YgB0EBdmpBA2ohBkEAIQRBACECA0AgBCALRkUEQCABIARBAXRqLgEAIQpBACEAA0AgACAKTkUEQCAJIAJBAnRqIAQ6AAIDQCACIAZqIAxxIgIgBUsNAAsgAEEBaiEADAELCyAEQQFqIQQMAQsLQX8gAg0AGkEAIQIDfyACIAdGBH9BAAUgCCAJIAJBAnRqIgAtAAJBAXRqIgEgAS8BACIBQQFqOwEAIAAgAyABEBRrIgU6AAMgACABIAVB/wFxdCAHazsBACACQQFqIQIMAQsLCyEFIAhBgARqJAAgBQvjBgEIf0FsIQcCQCACQQNJDQACQAJAAkACQCABLQAAIgNBA3EiCUEBaw4DAwEAAgsgACgCiOEBDQBBYg8LIAJBBUkNAkEDIQYgASgAACEFAn8CQAJAIANBAnZBA3EiCEF+aiIEQQFNBEAgBEEBaw0BDAILIAVBDnZB/wdxIQQgBUEEdkH/B3EhAyAIRQwCCyAFQRJ2IQRBBCEGIAVBBHZB//8AcSEDQQAMAQsgBUEEdkH//w9xIgNBgIAISw0DIAEtAARBCnQgBUEWdnIhBEEFIQZBAAshBSAEIAZqIgogAksNAgJAIANBgQZJDQAgACgCnOIBRQ0AQQAhAgNAIAJBg4ABSw0BIAJBQGshAgwAAAsACwJ/IAlBA0YEQCABIAZqIQEgAEHw4gFqIQIgACgCDCEGIAUEQCACIAMgASAEIAYQXwwCCyACIAMgASAEIAYQXQwBCyAAQbjQAWohAiABIAZqIQEgAEHw4gFqIQYgAEGo0ABqIQggBQRAIAggBiADIAEgBCACEF4MAQsgCCAGIAMgASAEIAIQXAsQAw0CIAAgAzYCgOIBIABBATYCiOEBIAAgAEHw4gFqNgLw4QEgCUECRgRAIAAgAEGo0ABqNgIMCyAAIANqIgBBiOMBakIANwAAIABBgOMBakIANwAAIABB+OIBakIANwAAIABB8OIBakIANwAAIAoPCwJ/AkACQAJAIANBAnZBA3FBf2oiBEECSw0AIARBAWsOAgACAQtBASEEIANBA3YMAgtBAiEEIAEvAABBBHYMAQtBAyEEIAEQIUEEdgsiAyAEaiIFQSBqIAJLBEAgBSACSw0CIABB8OIBaiABIARqIAMQCyEBIAAgAzYCgOIBIAAgATYC8OEBIAEgA2oiAEIANwAYIABCADcAECAAQgA3AAggAEIANwAAIAUPCyAAIAM2AoDiASAAIAEgBGo2AvDhASAFDwsCfwJAAkACQCADQQJ2QQNxQX9qIgRBAksNACAEQQFrDgIAAgELQQEhByADQQN2DAILQQIhByABLwAAQQR2DAELIAJBBEkgARAhIgJBj4CAAUtyDQFBAyEHIAJBBHYLIQIgAEHw4gFqIAEgB2otAAAgAkEgahAQIQEgACACNgKA4gEgACABNgLw4QEgB0EBaiEHCyAHC0sAIABC+erQ0OfJoeThADcDICAAQgA3AxggAELP1tO+0ser2UI3AxAgAELW64Lu6v2J9eAANwMIIABCADcDACAAQShqQQBBKBAQGgviAgICfwV+IABBKGoiASAAKAJIaiECAn4gACkDACIDQiBaBEAgACkDECIEQgeJIAApAwgiBUIBiXwgACkDGCIGQgyJfCAAKQMgIgdCEol8IAUQGSAEEBkgBhAZIAcQGQwBCyAAKQMYQsXP2bLx5brqJ3wLIAN8IQMDQCABQQhqIgAgAk0EQEIAIAEpAAAQCSADhUIbiUKHla+vmLbem55/fkLj3MqV/M7y9YV/fCEDIAAhAQwBCwsCQCABQQRqIgAgAksEQCABIQAMAQsgASgAAK1Ch5Wvr5i23puef34gA4VCF4lCz9bTvtLHq9lCfkL5893xmfaZqxZ8IQMLA0AgACACSQRAIAAxAABCxc/ZsvHluuonfiADhUILiUKHla+vmLbem55/fiEDIABBAWohAAwBCwsgA0IhiCADhULP1tO+0ser2UJ+IgNCHYggA4VC+fPd8Zn2masWfiIDQiCIIAOFC+8CAgJ/BH4gACAAKQMAIAKtfDcDAAJAAkAgACgCSCIDIAJqIgRBH00EQCABRQ0BIAAgA2pBKGogASACECAgACgCSCACaiEEDAELIAEgAmohAgJ/IAMEQCAAQShqIgQgA2ogAUEgIANrECAgACAAKQMIIAQpAAAQCTcDCCAAIAApAxAgACkAMBAJNwMQIAAgACkDGCAAKQA4EAk3AxggACAAKQMgIABBQGspAAAQCTcDICAAKAJIIQMgAEEANgJIIAEgA2tBIGohAQsgAUEgaiACTQsEQCACQWBqIQMgACkDICEFIAApAxghBiAAKQMQIQcgACkDCCEIA0AgCCABKQAAEAkhCCAHIAEpAAgQCSEHIAYgASkAEBAJIQYgBSABKQAYEAkhBSABQSBqIgEgA00NAAsgACAFNwMgIAAgBjcDGCAAIAc3AxAgACAINwMICyABIAJPDQEgAEEoaiABIAIgAWsiBBAgCyAAIAQ2AkgLCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQEBogAwVBun8LCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQCxogAwVBun8LC6gCAQZ/IwBBEGsiByQAIABB2OABaikDAEKAgIAQViEIQbh/IQUCQCAEQf//B0sNACAAIAMgBBBCIgUQAyIGDQAgACgCnOIBIQkgACAHQQxqIAMgAyAFaiAGGyIKIARBACAFIAYbayIGEEAiAxADBEAgAyEFDAELIAcoAgwhBCABRQRAQbp/IQUgBEEASg0BCyAGIANrIQUgAyAKaiEDAkAgCQRAIABBADYCnOIBDAELAkACQAJAIARBBUgNACAAQdjgAWopAwBCgICACFgNAAwBCyAAQQA2ApziAQwBCyAAKAIIED8hBiAAQQA2ApziASAGQRRPDQELIAAgASACIAMgBSAEIAgQOSEFDAELIAAgASACIAMgBSAEIAgQOiEFCyAHQRBqJAAgBQtnACAAQdDgAWogASACIAAoAuzhARAuIgEQAwRAIAEPC0G4fyECAkAgAQ0AIABB7OABaigCACIBBEBBYCECIAAoApjiASABRw0BC0EAIQIgAEHw4AFqKAIARQ0AIABBkOEBahBDCyACCycBAX8QVyIERQRAQUAPCyAEIAAgASACIAMgBBBLEE8hACAEEFYgAAs/AQF/AkACQAJAIAAoAqDiAUEBaiIBQQJLDQAgAUEBaw4CAAECCyAAEDBBAA8LIABBADYCoOIBCyAAKAKU4gELvAMCB38BfiMAQRBrIgkkAEG4fyEGAkAgBCgCACIIQQVBCSAAKALs4QEiBRtJDQAgAygCACIHQQFBBSAFGyAFEC8iBRADBEAgBSEGDAELIAggBUEDakkNACAAIAcgBRBJIgYQAw0AIAEgAmohCiAAQZDhAWohCyAIIAVrIQIgBSAHaiEHIAEhBQNAIAcgAiAJECwiBhADDQEgAkF9aiICIAZJBEBBuH8hBgwCCyAJKAIAIghBAksEQEFsIQYMAgsgB0EDaiEHAn8CQAJAAkAgCEEBaw4CAgABCyAAIAUgCiAFayAHIAYQSAwCCyAFIAogBWsgByAGEEcMAQsgBSAKIAVrIActAAAgCSgCCBBGCyIIEAMEQCAIIQYMAgsgACgC8OABBEAgCyAFIAgQRQsgAiAGayECIAYgB2ohByAFIAhqIQUgCSgCBEUNAAsgACkD0OABIgxCf1IEQEFsIQYgDCAFIAFrrFINAQsgACgC8OABBEBBaiEGIAJBBEkNASALEEQhDCAHKAAAIAynRw0BIAdBBGohByACQXxqIQILIAMgBzYCACAEIAI2AgAgBSABayEGCyAJQRBqJAAgBgsuACAAECsCf0EAQQAQAw0AGiABRSACRXJFBEBBYiAAIAEgAhA9EAMNARoLQQALCzcAIAEEQCAAIAAoAsTgASABKAIEIAEoAghqRzYCnOIBCyAAECtBABADIAFFckUEQCAAIAEQWwsL0QIBB38jAEEQayIGJAAgBiAENgIIIAYgAzYCDCAFBEAgBSgCBCEKIAUoAgghCQsgASEIAkACQANAIAAoAuzhARAWIQsCQANAIAQgC0kNASADKAAAQXBxQdDUtMIBRgRAIAMgBBAiIgcQAw0EIAQgB2shBCADIAdqIQMMAQsLIAYgAzYCDCAGIAQ2AggCQCAFBEAgACAFEE5BACEHQQAQA0UNAQwFCyAAIAogCRBNIgcQAw0ECyAAIAgQUCAMQQFHQQAgACAIIAIgBkEMaiAGQQhqEEwiByIDa0EAIAMQAxtBCkdyRQRAQbh/IQcMBAsgBxADDQMgAiAHayECIAcgCGohCEEBIQwgBigCDCEDIAYoAgghBAwBCwsgBiADNgIMIAYgBDYCCEG4fyEHIAQNASAIIAFrIQcMAQsgBiADNgIMIAYgBDYCCAsgBkEQaiQAIAcLRgECfyABIAAoArjgASICRwRAIAAgAjYCxOABIAAgATYCuOABIAAoArzgASEDIAAgATYCvOABIAAgASADIAJrajYCwOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEEdCAAbiECCyAAQQh2IgEgAkEYbCIAQYwIaigCAGwgAEGICGooAgBqIgJBA3YgAmogAEGACGooAgAgAEGECGooAgAgAWxqSQs3ACAAIAMgBCAFQYAQEDMiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQMgVBuH8LC78DAQN/IwBBIGsiBSQAIAVBCGogAiADEAYiAhADRQRAIAAgAWoiB0F9aiEGIAUgBBAOIARBBGohAiAFLQACIQMDQEEAIAAgBkkgBUEIahAEGwRAIAAgAiAFQQhqIAMQAkECdGoiBC8BADsAACAFQQhqIAQtAAIQASAAIAQtAANqIgQgAiAFQQhqIAMQAkECdGoiAC8BADsAACAFQQhqIAAtAAIQASAEIAAtAANqIQAMAQUgB0F+aiEEA0AgBUEIahAEIAAgBEtyRQRAIAAgAiAFQQhqIAMQAkECdGoiBi8BADsAACAFQQhqIAYtAAIQASAAIAYtAANqIQAMAQsLA0AgACAES0UEQCAAIAIgBUEIaiADEAJBAnRqIgYvAQA7AAAgBUEIaiAGLQACEAEgACAGLQADaiEADAELCwJAIAAgB08NACAAIAIgBUEIaiADEAIiA0ECdGoiAC0AADoAACAALQADQQFGBEAgBUEIaiAALQACEAEMAQsgBSgCDEEfSw0AIAVBCGogAiADQQJ0ai0AAhABIAUoAgxBIUkNACAFQSA2AgwLIAFBbCAFQQhqEAobIQILCwsgBUEgaiQAIAILkgIBBH8jAEFAaiIJJAAgCSADQTQQCyEDAkAgBEECSA0AIAMgBEECdGooAgAhCSADQTxqIAgQIyADQQE6AD8gAyACOgA+QQAhBCADKAI8IQoDQCAEIAlGDQEgACAEQQJ0aiAKNgEAIARBAWohBAwAAAsAC0EAIQkDQCAGIAlGRQRAIAMgBSAJQQF0aiIKLQABIgtBAnRqIgwoAgAhBCADQTxqIAotAABBCHQgCGpB//8DcRAjIANBAjoAPyADIAcgC2siCiACajoAPiAEQQEgASAKa3RqIQogAygCPCELA0AgACAEQQJ0aiALNgEAIARBAWoiBCAKSQ0ACyAMIAo2AgAgCUEBaiEJDAELCyADQUBrJAALowIBCX8jAEHQAGsiCSQAIAlBEGogBUE0EAsaIAcgBmshDyAHIAFrIRADQAJAIAMgCkcEQEEBIAEgByACIApBAXRqIgYtAAEiDGsiCGsiC3QhDSAGLQAAIQ4gCUEQaiAMQQJ0aiIMKAIAIQYgCyAPTwRAIAAgBkECdGogCyAIIAUgCEE0bGogCCAQaiIIQQEgCEEBShsiCCACIAQgCEECdGooAgAiCEEBdGogAyAIayAHIA4QYyAGIA1qIQgMAgsgCUEMaiAOECMgCUEBOgAPIAkgCDoADiAGIA1qIQggCSgCDCELA0AgBiAITw0CIAAgBkECdGogCzYBACAGQQFqIQYMAAALAAsgCUHQAGokAA8LIAwgCDYCACAKQQFqIQoMAAALAAs0ACAAIAMgBCAFEDYiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQNAVBuH8LCyMAIAA/AEEQdGtB//8DakEQdkAAQX9GBEBBAA8LQQAQAEEBCzsBAX8gAgRAA0AgACABIAJBgCAgAkGAIEkbIgMQCyEAIAFBgCBqIQEgAEGAIGohACACIANrIgINAAsLCwYAIAAQAwsLqBUJAEGICAsNAQAAAAEAAAACAAAAAgBBoAgLswYBAAAAAQAAAAIAAAACAAAAJgAAAIIAAAAhBQAASgAAAGcIAAAmAAAAwAEAAIAAAABJBQAASgAAAL4IAAApAAAALAIAAIAAAABJBQAASgAAAL4IAAAvAAAAygIAAIAAAACKBQAASgAAAIQJAAA1AAAAcwMAAIAAAACdBQAASgAAAKAJAAA9AAAAgQMAAIAAAADrBQAASwAAAD4KAABEAAAAngMAAIAAAABNBgAASwAAAKoKAABLAAAAswMAAIAAAADBBgAATQAAAB8NAABNAAAAUwQAAIAAAAAjCAAAUQAAAKYPAABUAAAAmQQAAIAAAABLCQAAVwAAALESAABYAAAA2gQAAIAAAABvCQAAXQAAACMUAABUAAAARQUAAIAAAABUCgAAagAAAIwUAABqAAAArwUAAIAAAAB2CQAAfAAAAE4QAAB8AAAA0gIAAIAAAABjBwAAkQAAAJAHAACSAAAAAAAAAAEAAAABAAAABQAAAA0AAAAdAAAAPQAAAH0AAAD9AAAA/QEAAP0DAAD9BwAA/Q8AAP0fAAD9PwAA/X8AAP3/AAD9/wEA/f8DAP3/BwD9/w8A/f8fAP3/PwD9/38A/f//AP3//wH9//8D/f//B/3//w/9//8f/f//P/3//38AAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACUAAAAnAAAAKQAAACsAAAAvAAAAMwAAADsAAABDAAAAUwAAAGMAAACDAAAAAwEAAAMCAAADBAAAAwgAAAMQAAADIAAAA0AAAAOAAAADAAEAQeAPC1EBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAQcQQC4sBAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABIAAAAUAAAAFgAAABgAAAAcAAAAIAAAACgAAAAwAAAAQAAAAIAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAgAAAAQAAAAIAAAAAAAQBBkBIL5gQBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAAAEAAAAEAAAACAAAAAAAAAABAAEBBgAAAAAAAAQAAAAAEAAABAAAAAAgAAAFAQAAAAAAAAUDAAAAAAAABQQAAAAAAAAFBgAAAAAAAAUHAAAAAAAABQkAAAAAAAAFCgAAAAAAAAUMAAAAAAAABg4AAAAAAAEFEAAAAAAAAQUUAAAAAAABBRYAAAAAAAIFHAAAAAAAAwUgAAAAAAAEBTAAAAAgAAYFQAAAAAAABwWAAAAAAAAIBgABAAAAAAoGAAQAAAAADAYAEAAAIAAABAAAAAAAAAAEAQAAAAAAAAUCAAAAIAAABQQAAAAAAAAFBQAAACAAAAUHAAAAAAAABQgAAAAgAAAFCgAAAAAAAAULAAAAAAAABg0AAAAgAAEFEAAAAAAAAQUSAAAAIAABBRYAAAAAAAIFGAAAACAAAwUgAAAAAAADBSgAAAAAAAYEQAAAABAABgRAAAAAIAAHBYAAAAAAAAkGAAIAAAAACwYACAAAMAAABAAAAAAQAAAEAQAAACAAAAUCAAAAIAAABQMAAAAgAAAFBQAAACAAAAUGAAAAIAAABQgAAAAgAAAFCQAAACAAAAULAAAAIAAABQwAAAAAAAAGDwAAACAAAQUSAAAAIAABBRQAAAAgAAIFGAAAACAAAgUcAAAAIAADBSgAAAAgAAQFMAAAAAAAEAYAAAEAAAAPBgCAAAAAAA4GAEAAAAAADQYAIABBgBcLhwIBAAEBBQAAAAAAAAUAAAAAAAAGBD0AAAAAAAkF/QEAAAAADwX9fwAAAAAVBf3/HwAAAAMFBQAAAAAABwR9AAAAAAAMBf0PAAAAABIF/f8DAAAAFwX9/38AAAAFBR0AAAAAAAgE/QAAAAAADgX9PwAAAAAUBf3/DwAAAAIFAQAAABAABwR9AAAAAAALBf0HAAAAABEF/f8BAAAAFgX9/z8AAAAEBQ0AAAAQAAgE/QAAAAAADQX9HwAAAAATBf3/BwAAAAEFAQAAABAABgQ9AAAAAAAKBf0DAAAAABAF/f8AAAAAHAX9//8PAAAbBf3//wcAABoF/f//AwAAGQX9//8BAAAYBf3//wBBkBkLhgQBAAEBBgAAAAAAAAYDAAAAAAAABAQAAAAgAAAFBQAAAAAAAAUGAAAAAAAABQgAAAAAAAAFCQAAAAAAAAULAAAAAAAABg0AAAAAAAAGEAAAAAAAAAYTAAAAAAAABhYAAAAAAAAGGQAAAAAAAAYcAAAAAAAABh8AAAAAAAAGIgAAAAAAAQYlAAAAAAABBikAAAAAAAIGLwAAAAAAAwY7AAAAAAAEBlMAAAAAAAcGgwAAAAAACQYDAgAAEAAABAQAAAAAAAAEBQAAACAAAAUGAAAAAAAABQcAAAAgAAAFCQAAAAAAAAUKAAAAAAAABgwAAAAAAAAGDwAAAAAAAAYSAAAAAAAABhUAAAAAAAAGGAAAAAAAAAYbAAAAAAAABh4AAAAAAAAGIQAAAAAAAQYjAAAAAAABBicAAAAAAAIGKwAAAAAAAwYzAAAAAAAEBkMAAAAAAAUGYwAAAAAACAYDAQAAIAAABAQAAAAwAAAEBAAAABAAAAQFAAAAIAAABQcAAAAgAAAFCAAAACAAAAUKAAAAIAAABQsAAAAAAAAGDgAAAAAAAAYRAAAAAAAABhQAAAAAAAAGFwAAAAAAAAYaAAAAAAAABh0AAAAAAAAGIAAAAAAAEAYDAAEAAAAPBgOAAAAAAA4GA0AAAAAADQYDIAAAAAAMBgMQAAAAAAsGAwgAAAAACgYDBABBpB0L2QEBAAAAAwAAAAcAAAAPAAAAHwAAAD8AAAB/AAAA/wAAAP8BAAD/AwAA/wcAAP8PAAD/HwAA/z8AAP9/AAD//wAA//8BAP//AwD//wcA//8PAP//HwD//z8A//9/AP///wD///8B////A////wf///8P////H////z////9/AAAAAAEAAAACAAAABAAAAAAAAAACAAAABAAAAAgAAAAAAAAAAQAAAAIAAAABAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAcAAAAIAAAACQAAAAoAAAALAEGgIAsDwBBQ";var qh=new WeakMap,Xh=0,Yh,Us=class s extends Di{constructor(e){super(e),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerPool=new Fc,this.workerSourceURL="",this.workerConfig=null,typeof MSC_TRANSCODER!="undefined"&&console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.')}setTranscoderPath(e){return this.transcoderPath=e,this}setWorkerLimit(e){return this.workerPool.setWorkerLimit(e),this}detectSupport(e){return e.isWebGPURenderer===!0?this.workerConfig={astcSupported:e.hasFeature("texture-compression-astc"),etc1Supported:!1,etc2Supported:e.hasFeature("texture-compression-etc2"),dxtSupported:e.hasFeature("texture-compression-bc"),bptcSupported:!1,pvrtcSupported:!1}:(this.workerConfig={astcSupported:e.extensions.has("WEBGL_compressed_texture_astc"),etc1Supported:e.extensions.has("WEBGL_compressed_texture_etc1"),etc2Supported:e.extensions.has("WEBGL_compressed_texture_etc"),dxtSupported:e.extensions.has("WEBGL_compressed_texture_s3tc"),bptcSupported:e.extensions.has("EXT_texture_compression_bptc"),pvrtcSupported:e.extensions.has("WEBGL_compressed_texture_pvrtc")||e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")},e.capabilities.isWebGL2&&(this.workerConfig.etc1Supported=!1)),this}init(){if(!this.transcoderPending){let e=new Ji(this.manager);e.setPath(this.transcoderPath),e.setWithCredentials(this.withCredentials);let t=e.loadAsync("basis_transcoder.js"),n=new Ji(this.manager);n.setPath(this.transcoderPath),n.setResponseType("arraybuffer"),n.setWithCredentials(this.withCredentials);let i=n.loadAsync("basis_transcoder.wasm");this.transcoderPending=Promise.all([t,i]).then(([r,a])=>{let o=s.BasisWorker.toString(),c=["/* constants */","let _EngineFormat = "+JSON.stringify(s.EngineFormat),"let _TranscoderFormat = "+JSON.stringify(s.TranscoderFormat),"let _BasisFormat = "+JSON.stringify(s.BasisFormat),"/* basis_transcoder.js */",r,"/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([c])),this.transcoderBinary=a,this.workerPool.setWorkerCreator(()=>{let l=new Worker(this.workerSourceURL),h=this.transcoderBinary.slice(0);return l.postMessage({type:"init",config:this.workerConfig,transcoderBinary:h},[h]),l})}),Xh>0&&console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."),Xh++}return this.transcoderPending}load(e,t,n,i){if(this.workerConfig===null)throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");let r=new Ji(this.manager);r.setResponseType("arraybuffer"),r.setWithCredentials(this.withCredentials),r.load(e,a=>{if(qh.has(a))return qh.get(a).promise.then(t).catch(i);this._createTexture(a).then(o=>t?t(o):null).catch(i)},n,i)}_createTextureFrom(e,t){let{faces:n,width:i,height:r,format:a,type:o,error:c,dfdFlags:l}=e;if(o==="error")return Promise.reject(c);let h;if(t.faceCount===6)h=new gc(n,a,Bn);else{let u=n[0].mipmaps;h=t.layerCount>1?new mc(u,i,r,t.layerCount,a,Bn):new nr(u,i,r,a,Bn)}return h.minFilter=n[0].mipmaps.length===1?qt:Zn,h.magFilter=qt,h.generateMipmaps=!1,h.needsUpdate=!0,h.colorSpace=Hd(t),h.premultiplyAlpha=!!(l&1),h}async _createTexture(e,t={}){let n=Md(new Uint8Array(e));if(n.vkFormat!==0)return rE(n);let i=t,r=this.init().then(()=>this.workerPool.postMessage({type:"transcode",buffer:e,taskConfig:i},[e])).then(a=>this._createTextureFrom(a.data,n));return qh.set(e,{promise:r}),r}dispose(){return this.workerPool.dispose(),this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),Xh--,this}};Us.BasisFormat={ETC1S:0,UASTC_4x4:1};Us.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16};Us.EngineFormat={RGBAFormat:Cn,RGBA_ASTC_4x4_Format:Zo,RGBA_BPTC_Format:Na,RGBA_ETC2_EAC_Format:jo,RGBA_PVRTC_4BPPV1_Format:Yo,RGBA_S3TC_DXT5_Format:Fa,RGB_ETC1_Format:Ic,RGB_ETC2_Format:Jo,RGB_PVRTC_4BPPV1_Format:Xo,RGB_S3TC_DXT1_Format:Pa};Us.BasisWorker=function(){let s,e,t,n=_EngineFormat,i=_TranscoderFormat,r=_BasisFormat;self.addEventListener("message",function(m){let b=m.data;switch(b.type){case"init":s=b.config,a(b.transcoderBinary);break;case"transcode":e.then(()=>{try{let{faces:p,buffers:d,width:M,height:y,hasAlpha:B,format:O,dfdFlags:P}=o(b.buffer);self.postMessage({type:"transcode",id:b.id,faces:p,width:M,height:y,hasAlpha:B,format:O,dfdFlags:P},d)}catch(p){console.error(p),self.postMessage({type:"error",id:b.id,error:p.message})}});break}});function a(m){e=new Promise(b=>{t={wasmBinary:m,onRuntimeInitialized:b},BASIS(t)}).then(()=>{t.initializeBasis(),t.KTX2File===void 0&&console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.")})}function o(m){let b=new t.KTX2File(new Uint8Array(m));function p(){b.close(),b.delete()}if(!b.isValid())throw p(),new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");let d=b.isUASTC()?r.UASTC_4x4:r.ETC1S,M=b.getWidth(),y=b.getHeight(),B=b.getLayers()||1,O=b.getLevels(),P=b.getFaces(),N=b.getHasAlpha(),H=b.getDFDFlags(),{transcoderFormat:v,engineFormat:D}=u(d,M,y,N);if(!M||!y||!O)throw p(),new Error("THREE.KTX2Loader:	Invalid texture");if(!b.startTranscoding())throw p(),new Error("THREE.KTX2Loader: .startTranscoding failed");let J=[],Z=[];for(let ue=0;ue<P;ue++){let k=[];for(let Y=0;Y<O;Y++){let $=[],fe,Ae;for(let be=0;be<B;be++){let Me=b.getImageLevelInfo(Y,be,ue);ue===0&&Y===0&&be===0&&(Me.origWidth%4!==0||Me.origHeight%4!==0)&&console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."),O>1?(fe=Me.origWidth,Ae=Me.origHeight):(fe=Me.width,Ae=Me.height);let Le=new Uint8Array(b.getImageTranscodedSizeInBytes(Y,be,0,v));if(!b.transcodeImage(Le,Y,be,ue,v,0,-1,-1))throw p(),new Error("THREE.KTX2Loader: .transcodeImage failed.");$.push(Le)}let pe=A($);k.push({data:pe,width:fe,height:Ae}),Z.push(pe.buffer)}J.push({mipmaps:k,width:M,height:y,format:D})}return p(),{faces:J,buffers:Z,width:M,height:y,hasAlpha:N,format:D,dfdFlags:H}}let c=[{if:"astcSupported",basisFormat:[r.UASTC_4x4],transcoderFormat:[i.ASTC_4x4,i.ASTC_4x4],engineFormat:[n.RGBA_ASTC_4x4_Format,n.RGBA_ASTC_4x4_Format],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:"bptcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.BC7_M5,i.BC7_M5],engineFormat:[n.RGBA_BPTC_Format,n.RGBA_BPTC_Format],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:"dxtSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.BC1,i.BC3],engineFormat:[n.RGB_S3TC_DXT1_Format,n.RGBA_S3TC_DXT5_Format],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:"etc2Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.ETC1,i.ETC2],engineFormat:[n.RGB_ETC2_Format,n.RGBA_ETC2_EAC_Format],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:"etc1Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.ETC1],engineFormat:[n.RGB_ETC1_Format],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:"pvrtcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.PVRTC1_4_RGB,i.PVRTC1_4_RGBA],engineFormat:[n.RGB_PVRTC_4BPPV1_Format,n.RGBA_PVRTC_4BPPV1_Format],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0}],l=c.sort(function(m,b){return m.priorityETC1S-b.priorityETC1S}),h=c.sort(function(m,b){return m.priorityUASTC-b.priorityUASTC});function u(m,b,p,d){let M,y,B=m===r.ETC1S?l:h;for(let O=0;O<B.length;O++){let P=B[O];if(s[P.if]&&P.basisFormat.includes(m)&&!(d&&P.transcoderFormat.length<2)&&!(P.needsPowerOfTwo&&!(f(b)&&f(p))))return M=P.transcoderFormat[d?1:0],y=P.engineFormat[d?1:0],{transcoderFormat:M,engineFormat:y}}return console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."),M=i.RGBA32,y=n.RGBAFormat,{transcoderFormat:M,engineFormat:y}}function f(m){return m<=2?!0:(m&m-1)===0&&m!==0}function A(m){if(m.length===1)return m[0];let b=0;for(let M=0;M<m.length;M++){let y=m[M];b+=y.byteLength}let p=new Uint8Array(b),d=0;for(let M=0;M<m.length;M++){let y=m[M];p.set(y,d),d+=y.byteLength}return p}};var sE=new Set([Cn,ar,rr]),Jh={[109]:Cn,[97]:Cn,[37]:Cn,[43]:Cn,[103]:ar,[83]:ar,[16]:ar,[22]:ar,[100]:rr,[76]:rr,[15]:rr,[9]:rr,[166]:za,[165]:za},jh={[109]:zn,[97]:oi,[37]:Bn,[43]:Bn,[103]:zn,[83]:oi,[16]:Bn,[22]:Bn,[100]:zn,[76]:oi,[15]:Bn,[9]:Bn,[166]:Bn,[165]:Bn};async function rE(s){let{vkFormat:e}=s;if(Jh[e]===void 0)throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");let t;s.supercompressionScheme===2&&(Yh||(Yh=new Promise(async r=>{let a=new Nc;await a.init(),r(a)})),t=await Yh);let n=[];for(let r=0;r<s.levels.length;r++){let a=Math.max(1,s.pixelWidth>>r),o=Math.max(1,s.pixelHeight>>r),c=s.pixelDepth?Math.max(1,s.pixelDepth>>r):0,l=s.levels[r],h;if(s.supercompressionScheme===0)h=l.levelData;else if(s.supercompressionScheme===2)h=t.decode(l.levelData,l.uncompressedByteLength);else throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");let u;jh[e]===zn?u=new Float32Array(h.buffer,h.byteOffset,h.byteLength/Float32Array.BYTES_PER_ELEMENT):jh[e]===oi?u=new Uint16Array(h.buffer,h.byteOffset,h.byteLength/Uint16Array.BYTES_PER_ELEMENT):u=h,n.push({data:u,width:a,height:o,depth:c})}let i;if(sE.has(Jh[e]))i=s.pixelDepth===0?new Is(n[0].data,s.pixelWidth,s.pixelHeight):new Wa(n[0].data,s.pixelWidth,s.pixelHeight,s.pixelDepth);else{if(s.pixelDepth>0)throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");i=new nr(n,s.pixelWidth,s.pixelHeight)}return i.mipmaps=n,i.type=jh[e],i.format=Jh[e],i.colorSpace=Hd(s),i.needsUpdate=!0,Promise.resolve(i)}function Hd(s){let e=s.dataFormatDescriptor[0];return e.colorPrimaries===1?e.transferFunction===2?Pt:bn:e.colorPrimaries===10?e.transferFunction===2?no:aa:e.colorPrimaries===0?Hn:(console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${e.colorPrimaries}"`),Hn)}var pi=G,Zh=Vn,ds=(s,e,t)=>s<e?e:s>t?t:s,Uc=(s,e,t)=>{let n=ds((t-s)/(e-s),0,1);return n*n*(3-2*n)},aE=1.9405,Oc={Pass:{dur:.6,contact:.18},Shoot:{dur:.85,contact:.22},Tackle:{dur:1.3,contact:.3},Celebrate_KneeSlide:{dur:2,hold:1,fade:.22},Celebrate_Jump:{dur:1.1,fade:.18,out:.22},Trophy_Lift:{dur:2,hold:1,fade:.25}},zd={jump:"Celebrate_Jump",slide:"Celebrate_KneeSlide",trophy:"Trophy_Lift"},oE={af:[90.6,58.4,42],ca:[223.7,168.5,136.8],as:[199.2,155.4,129.5]},cE={plain:0,stripes:1,hoops:2,halves:3,sash:4,pinstripes:5,chevron:6,gradient:7,checker:8,centre:9},lE=(()=>{let s={s0:-.2,s1:.2,z0:1.15,z1:1.55,u0:0,u1:.5,v0:0,v1:.4},e=(s.u1-s.u0)/(s.s1-s.s0)/1e3,t=s.u0-s.s0/(s.s1-s.s0)*(s.u1-s.u0),n=(s.v1-s.v0)/(s.z1-s.z0),i=n/1e3,r=1-s.v0+s.z0*n,a=c=>e*c+t,o=c=>i*c+r;return new Rt(a(49),o(-1460),a(121),o(-1380))})(),kc=["as","ca","lean","stocky","f_nose_w","f_nose_l","f_nose_hump","f_chin","f_chin_w","f_jaw","f_cheek","f_lips","f_head_sq","f_head_ov","f_brow"],hE={shaved:["",0],buzz:["",.9],fade:["crop",1],crew:["crop",1],afro:["afro",1],top:["afro",1],twist:["afro",1],dread:["afro",1],locks:["afro",1],locksL:["afro",1],bleach:["afro",1],corn:["crop",1],hawk:["crop",1],under:["crop",1],curl:["afro",1]},uE={shaved:["",0],buzz:["",.85],crew:["short",1],fade:["short",1],short:["short",1],part:["slick",1],quiff:["messy",1],slick:["slick",1],curl:["wavy",1],bun:["wavy",1],pony:["wavy",1],long:["wavy",1],hawk:["messy",1],under:["messy",1],bleach:["short",1]},fE=`attribute float _part; attribute vec2 aPrint; attribute vec2 aPat; attribute vec4 aZone; attribute vec4 _cloth; attribute vec4 _skin2; attribute vec4 _w2;
uniform vec4 uClothF; varying float vPart; varying vec2 vPrint; varying vec2 vPat; varying vec4 vZone; varying vec2 vUvA; varying vec3 vRest;
`,dE=`uniform vec3 uTint, uHairC, uIris, uP1, uP2, uTrim, uSlv, uSho, uSoc, uSocT, uBoot, uBoot2, uGlove; uniform float uPat, uPatW, uSlvOn, uScalp, uErase, uGK, uBeard;
uniform sampler2D uPrint, uData, uKnit, uCrest; uniform vec4 uCrestR; uniform float uCrestOn; varying float vPart; varying vec2 vPrint; varying vec2 vPat; varying vec4 vZone; varying vec2 vUvA; varying vec3 vRest;
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
`;function Vd(s){let{scene:e,tier:t,ctx:n,F:i,url:r,used:a,SC:o,getR:c,cvs:l,blobTex:h,SKINS:u}=s,f={ok:!1,chars:[],byId:new Map,heroOk:!1},A=new la;A.setMeshoptDecoder(Lc);let m=null,b=R=>!/^fan/.test(String(R));f.isPlayer=b,f.glassAnchor=function(R){if(f._ga)return f._ga;let Q=R.lod.match,q=Q.geometry,V=q.attributes.position,le=q.attributes._part,ie=new pi,w=new pi,x=0,K=-9;for(let je=0;je<V.count;je++)Math.round(le.getX(je))===1&&(ie.fromBufferAttribute(V,je),w.add(ie),x++,K=Math.max(K,ie.z));w.multiplyScalar(1/Math.max(1,x)),w.z=K;let de=new pi(0,1,0).applyMatrix4(Q.bindMatrix),me=new pi(0,-.986,0).applyMatrix4(Q.bindMatrix),xe=(de.y-me.y)/1.8,Ne=w.applyMatrix4(Q.bindMatrix);Ne.z+=.012*xe;let Re=Q.skeleton.bones.indexOf(R.bones.Head),Oe=new ct().copy(Q.skeleton.boneInverses[Re]).multiply(new ct().compose(Ne,new Zh,new pi(xe,xe,xe)));return f._ga=Oe},f.makeLoose=function(){let R=Z();e.remove(R.root),f.chars.splice(f.chars.indexOf(R),1);let Q=s.chars.indexOf(R);return Q>=0&&s.chars.splice(Q,1),R.port=!0,R};let p={bones:null,lod:{},cards:{},skins:{},clips:{},knit:null},d=R=>{let Q=R.geometry;for(let[q,V]of[["uv1","aPrint"],["uv2","aPat"],["color","aZone"]])Q.attributes[q]&&(Q.setAttribute(V,Q.attributes[q]),Q.deleteAttribute(q));return Q.boundingSphere=new yn(new pi(0,0,0),4),{geo:Q,inv:R.skeleton.boneInverses,bind:R.bindMatrix.clone(),names:R.skeleton.bones.map(q=>q.name),mat:R.material,dict:R.morphTargetDictionary}},M=R=>{let Q=R.geometry,q=R.skeleton.bones.findIndex(V=>V.name==="Head");return Q.boundingSphere=new yn(new pi(0,0,0),4),{geo:Q,m:new ct().multiplyMatrices(R.skeleton.boneInverses[q],R.bindMatrix),map:R.material.map}};function y(){if(p.knit)return p.knit;let R=128,Q=new Float32Array(R*R),q=8,V=R/q;for(let w=0;w<R;w++)for(let x=0;x<R;x++){let K=Math.floor(w/V),de=K%2*V/2,me=(x+de)%V-V/2,xe=w%V-V/2,Ne=Math.hypot(me*.9,xe)/(V*.5);Q[w*R+x]=-Math.exp(-Math.pow(Ne/.42,2))*.9+(.5+.5*Math.cos(x/R*q*4*Math.PI+w/R*2*Math.PI*q))*.25}let le=new Uint8Array(R*R*4);for(let w=0;w<R;w++)for(let x=0;x<R;x++){let K=(Re,Oe)=>Q[(Oe+R)%R*R+(Re+R)%R],de=(K(x+1,w)-K(x-1,w))*1.1,me=(K(x,w-1)-K(x,w+1))*1.1,xe=Math.hypot(de,me,1),Ne=(w*R+x)*4;le[Ne]=(-de/xe*.5+.5)*255,le[Ne+1]=(-me/xe*.5+.5)*255,le[Ne+2]=(1/xe*.5+.5)*255,le[Ne+3]=255}let ie=new Is(le,R,R,Cn);return ie.wrapS=ie.wrapT=ai,ie.generateMipmaps=!0,ie.minFilter=Zn,ie.magFilter=qt,ie.anisotropy=N,ie.needsUpdate=!0,p.knit=ie}p.mx={};function B(R){let Q=R.asset&&R.asset.extras&&R.asset.extras.mx||{};for(let V of R.animations){p.clips[V.name]=V;let le=p.mx[V.name]=Q[V.name]||{};Oc[V.name]||(Oc[V.name]={dur:V.duration,contact:le.contact,hold:le.hold})}let q={walk:"MX_Walk",jog:"MX_Jog",sprint:"MX_Sprint"};if(!f.loco&&Object.values(q).every(V=>p.clips[V]&&p.mx[V].v)){f.loco={sd:{},p0:{}};for(let V in q){let le=q[V];f.loco.sd[V]=p.mx[le].v*p.clips[le].duration,f.loco.p0[V]=p.mx[le].p0||0}}f.mx=!0}let O=(R,Q)=>{if(!f.mx)return null;let q=R.style&&R.style.left?"L":"R",V=Q.header?"MX_Header":(Q.kick||0)>.8?"MX_Kick_"+q:"MX_Pass_"+q;return p.clips[V]?V:null},P=R=>{if(!f.mx)return null;let Q="MX_Tackle_"+(R.style&&R.style.left?"L":"R");return p.clips[Q]?Q:null};f.mxClips=()=>Object.keys(p.mx),f.has=R=>!!p.clips[R];let N=1,H=R=>(R&&R.anisotropy!==N&&(R.anisotropy=N,R.needsUpdate=!0),R);f.ready=(async()=>{let R=c();if(!R)throw new Error("no renderer");N=Math.min(R.capabilities.getMaxAnisotropy?R.capabilities.getMaxAnisotropy():1,t==="high"?8:t==="mid"?4:2),m=new Us().setTranscoderPath(n.base).detectSupport(R),A.setKTX2Loader(m);let[Q,q,V]=await Promise.all([A.loadAsync(r("w3d-mh.glb")),A.loadAsync(r("w3d-mh-anims.glb")),A.loadAsync(r("w3d-mx-anims.glb")).catch(le=>(console.warn("3D mx anims",le),null))]);Q.scene.updateMatrixWorld(!0),Q.scene.traverse(le=>{le.isSkinnedMesh&&/^P_/.test(le.name)?p.lod[le.name.slice(2)]=d(le):le.isSkinnedMesh&&/^C_/.test(le.name)?p.cards[le.name.slice(2)]=M(le):le.isMesh&&/^tex_/.test(le.name)&&(p.skins[le.name.slice(9)]=le.material.map),le.isBone&&le.name==="root"&&!p.bones&&(p.bones=le.parent&&!le.parent.isBone?le.parent:le)}),p.skins.af=p.lod.match.mat.map,p.normal=p.lod.match.mat.normalMap,p.data=p.lod.match.mat.aoMap;for(let le of[p.skins.af,p.skins.ca,p.skins.as,p.normal,p.data,...Object.values(p.cards).map(ie=>ie.map)])H(le);{let le=p.lod.match.geo.attributes._cloth,ie=0;if(le){for(let w=0;w<le.count;w++)if(le.getZ(w)>.5){ie=1;break}}f.clothFix=!!ie}for(let le of q.animations)p.clips[le.name]=le;if(V&&B(V),!p.lod.match||!p.lod.far||!p.clips.Idle_Loop)throw new Error("mh files incomplete");f.ok=!0;try{let le=new _n(40,1,.1,100);le.position.set(0,1,4),le.lookAt(0,1,0);let ie=new Ai(8,8);R.setRenderTarget(ie),R.render(Q.scene,le),R.setRenderTarget(null),ie.dispose();let w=Z();for(let x in w.lod)w.lod[x].visible=!0;w.hair.visible=!0,w.root.visible=!0,R.compile(e,le);for(let x in w.lod)w.lod[x].visible=!1;w.hair.visible=!1}catch(le){console.warn("3D mh warm",le)}return f.mx&&setTimeout(()=>A.loadAsync(r("w3d-mx-extra.glb")).then(B).catch(le=>console.warn("3D mx extra",le)),4e3),t==="high"&&A.loadAsync(r("w3d-mh-hero.glb")).then(le=>{le.scene.updateMatrixWorld(!0);let ie={};le.scene.traverse(w=>{w.isSkinnedMesh&&w.name==="P_hero"?p.lod.hero=d(w):w.isSkinnedMesh&&/^H_/.test(w.name)?ie[w.name.slice(2)]=M(w):w.isMesh&&/^tex_/.test(w.name)&&(p["h_"+w.name.slice(9)]=w.material.map)}),p.hcards=ie,p.hskins={af:p.lod.hero.mat.map,ca:p.h_ca,as:p.h_as},p.hnormal=p.lod.hero.mat.normalMap;for(let w of[p.hskins.af,p.hskins.ca,p.hskins.as,p.hnormal,...Object.values(ie).map(x=>x.map)])H(w);try{let w=new _n(40,1,.1,100);w.position.set(0,1,4),w.lookAt(0,1,0);let x=new Ai(8,8);R.setRenderTarget(x),R.render(le.scene,w),R.setRenderTarget(null),x.dispose()}catch{}f.heroOk=!!p.lod.hero}).catch(le=>console.warn("3D hero",le)),f})();function v(R){let Q=p.lod[R].mat,q=new Ot({map:Q.map,normalMap:Q.normalMap,normalScale:new Ze(.6,.6),roughness:.6,metalness:0,envMapIntensity:.45}),V=()=>({value:new We}),le=q.userData.u={uTint:V(),uHairC:V(),uIris:V(),uP1:V(),uP2:V(),uTrim:V(),uSlv:V(),uSho:V(),uSoc:V(),uSocT:V(),uBoot:V(),uBoot2:V(),uGlove:V(),uBeard:{value:0},uPat:{value:0},uPatW:{value:.07},uSlvOn:{value:0},uScalp:{value:0},uErase:{value:0},uGK:{value:0},uMgr:{value:new Ze},uTrou:V(),uPrint:{value:null},uCrest:{value:null},uCrestR:{value:lE},uCrestOn:{value:0},uData:{value:Q.aoMap},uKnit:{value:y()},uClothF:{value:new Rt}};return q.onBeforeCompile=ie=>{Object.assign(ie.uniforms,le),ie.vertexShader=fE+ie.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vPart = _part; vPrint = aPrint; vPat = aPat; vZone = aZone; vUvA = uv; vRest = position;`).replace("#include <skinning_vertex>",`vec3 mhPre = transformed;
#include <skinning_vertex>
#ifdef USE_SKINNING
{ float cf = _cloth.z > 0.5 ? (_cloth.x < 1.5 ? (_cloth.y > 0.0 ? uClothF.x : uClothF.y) : (_cloth.y > 0.0 ? uClothF.z : uClothF.w)) : 0.0;
  if (cf > 0.001) { vec4 sv = bindMatrix * vec4(mhPre, 1.0); vec4 s2 = getBoneMatrix(_skin2.x) * sv * _w2.x + getBoneMatrix(_skin2.y) * sv * _w2.y + getBoneMatrix(_skin2.z) * sv * _w2.z;
    transformed = mix(transformed, (bindMatrixInverse * s2).xyz, cf); } }
#endif`),ie.fragmentShader=dE+ie.fragmentShader.replace("#include <map_fragment>",`float mhRough = 0.6;
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
    if (vPart < 3.5 && vPrint.x >= 0.0 && vPrint.x <= 1.0 && vPrint.y >= 0.0 && vPrint.y <= 1.0) { vec4 pr = texture2D(uPrint, vPrint); col = mix(col, pr.rgb / max(pr.a, 1e-3), pr.a);
      vec2 cu = (vPrint - uCrestR.xy) / (uCrestR.zw - uCrestR.xy);
      if (uCrestOn > 0.5 && cu.x >= 0.0 && cu.x <= 1.0 && cu.y >= 0.0 && cu.y <= 1.0) { vec4 cr = texture2D(uCrest, cu); col = mix(col, cr.rgb / max(cr.a, 1e-3), cr.a); } }
    col *= mix(1.0, vZone.g, 0.75);
  }
  diffuseColor.rgb = col; }`).replace("#include <roughnessmap_fragment>","float roughnessFactor = mhRough;").replace("#include <normal_fragment_maps>",`#ifdef USE_NORMALMAP_TANGENTSPACE
{ vec3 mapN = vec3(0.0, 0.0, 1.0);
  if (vPart < 0.5) { mapN = texture2D(normalMap, vNormalMapUv).xyz * 2.0 - 1.0; mapN.xy *= normalScale; }
  else if (vPart > 1.5 && vPart < 4.5) { mapN = texture2D(uKnit, vUvA * (vPart < 2.5 ? 90.0 : 70.0)).xyz * 2.0 - 1.0; mapN.xy *= 0.35; }
  normal = normalize(tbn * mapN); }
#endif`).replace("#include <aomap_fragment>","")},q.customProgramCacheKey=()=>"w3dmh6",q}function D(){let R=new Ot({color:1709072,roughness:.62,metalness:0,alphaTest:.3,side:Sn,envMapIntensity:.3});return t!=="low"&&(R.alphaToCoverage=!0),R}let J=30;function Z(){let R=new Pn,Q=p.bones.clone(!0);R.add(Q);let q={};Q.traverse(w=>{w.isBone&&(q[w.name]=w)});let V={mh:!0,root:R,bones:q,mixer:new ra(R),act:{},w:{},id:null,lastN:-9,mod:new Map,ph:0,look:0,lookP:0,lean:0,lod:{},mats:{},FU:{uExpr:{value:new Rt}},pivots:[],ex:new Rt,cf:new Rt},le=w=>{let x=p.lod[w],K=V.mats[w]=v(w),de=new Xi(x.geo,K);return de.bind(new tr(x.names.map(me=>q[me]),x.inv),x.bind),de.castShadow=w!=="far"&&t!=="low",de.receiveShadow=!1,de.visible=!1,de.frustumCulled=!0,de.morphTargetInfluences=new Array(kc.length).fill(0),de.morphTargetDictionary=x.dict,de.boundingSphere=new yn(new pi(0,.95,0),1.6),R.add(de),V.lod[w]=de,de};le("match"),le("far"),V.hair=new ze(p.cards.none.geo,D()),V.hair.matrixAutoUpdate=!1,V.hair.morphTargetInfluences=new Array(kc.length).fill(0),V.hair.castShadow=t==="high",q.Head.add(V.hair);let ie={idle:"Idle_Loop",walk:"Walk_Loop",jog:"Jog_Fwd_Loop",sprint:"Sprint_Loop",dance:"Dance_Loop",air:"Jump_Loop",crouch:"Crouch_Idle_Loop",talk:"Idle_Talking_Loop"};f.loco&&Object.assign(ie,{idle:"MX_Idle",walk:"MX_Walk",jog:"MX_Jog",sprint:"MX_Sprint"}),p.clips.MX_GK_Idle&&(ie.crouch="MX_GK_Idle");for(let w in ie){let x=p.clips[ie[w]];if(!x)continue;let K=V.mixer.clipAction(x);K.play(),K.setEffectiveWeight(0),V.act[w]=K,V.w[w]=0}V.one={};for(let w of["Pass","Shoot","Tackle","Celebrate_KneeSlide","Celebrate_Jump","Trophy_Lift","MX_Pass_R","MX_Pass_L","MX_Kick_R","MX_Kick_L","MX_Header","MX_Tackle_R","MX_Tackle_L"]){let x=p.clips[w];if(!x)continue;let K=V.mixer.clipAction(x);K.setLoop(Tc,1),K.clampWhenFinished=!0,K.play(),K.setEffectiveWeight(0),V.one[w]=K}V.mixer.update(0);for(let w of Object.values(V.one))w.stop();return V.w.idle=1,V.shot=null,V.shotW=0,e.add(R),f.chars.push(V),s.chars.push(V),V}function ue(R){if(R.lod.hero||!f.heroOk)return R.lod.hero;let Q=p.lod.hero,q=R.mats.hero=v("hero"),V=new Xi(Q.geo,q);return q.map=R.mats.match.map===p.skins.af?p.hskins.af:R.mats.match.map===p.skins.ca?p.hskins.ca:p.hskins.as,q.normalMap=p.hnormal,V.bind(new tr(Q.names.map(le=>R.bones[le]),Q.inv),Q.bind),V.castShadow=!0,V.visible=!1,V.morphTargetInfluences=R.lod.match.morphTargetInfluences.slice(),V.morphTargetDictionary=Q.dict,V.boundingSphere=new yn(new pi(0,.95,0),1.6),R.root.add(V),R.lod.hero=V,R.hairH=new ze(p.hcards.none.geo,D()),R.hairH.matrixAutoUpdate=!1,R.hairH.morphTargetInfluences=R.hair.morphTargetInfluences,R.hairH.visible=!1,R.bones.Head.add(R.hairH),R.dk=null,V}f.getChar=function(R){let Q=f.byId.get(R);if(Q)return Q;Q=f.chars.filter(q=>q.lastN<i.n-1&&!q.port).sort((q,V)=>q.lastN-V.lastN)[0],!Q&&f.chars.length<J&&(Q=Z()),Q||(Q=f.chars.filter(q=>!q.port).sort((q,V)=>q.lastN-V.lastN)[0]),Q.id!=null&&f.byId.delete(Q.id),Q.id=R,f.byId.set(R,Q),Q.dk=null,Q.lastN=-9,Q.shot=null,Q.shotW=0,Q.celGap=0,Q.celOut=!1;for(let q of Object.values(Q.one))q.stop();return Q};function k(R){let Q=R>>>0||1;return()=>(Q^=Q<<13,Q>>>=0,Q^=Q>>>17,Q^=Q<<5,Q>>>=0,Q/4294967296)}function Y(R,Q){let q=k(n.hash("mh4:"+R)),V=()=>q()*2-1,le=Q.grp,ie=0,w=0,x="ca";le==="af"||le==="af2"?(x="af",ie=q()*.15,w=le==="af2"?q()*.35:q()*.15):le==="ea"?(x="as",ie=.75+q()*.25,w=q()*.15):le==="eu"?(x="ca",w=.8+q()*.2,ie=q()*.08):le==="mix"?(x=Q.si<6?"af":"ca",w=.3+q()*.5,ie=q()*.2):(x=Q.si<6?"af":"ca",w=.55+q()*.35,ie=q()*.25);let K={as:ie,ca:w,lean:Q.arch==="lean"?.6+q()*.4:0,stocky:Q.arch==="stocky"?.4+q()*.6:0};for(let me of kc.slice(4))K[me]=V()*(me==="f_brow"?.25:.7);let de=(x==="af"?hE:uE)[Q.st]||(x==="af"?["crop",1]:["short",1]);return{w:K,base:x,hair:de[0],scalp:de[1]}}f.lookOf=(R,Q)=>Y(String(R),Q);let $=t==="high"?512:t==="mid"?384:256,fe=1024,Ae=new Map;function pe(R){if(!R)return null;let Q=Ae.get(R);if(Q)return Q;let q=t==="low"?128:t==="mid"?256:512,V=l(q,q,()=>{}),le=V.getContext("2d");le.clearRect(0,0,q,q);try{let ie=R.naturalWidth||R.width||q,w=R.naturalHeight||R.height||q,x=Math.min(q/ie,q/w)*.94;le.drawImage(R,(q-ie*x)/2,(q-w*x)/2,ie*x,w*x)}catch{return null}return Q=new ls(V),Q.colorSpace=Pt,Q.flipY=!1,Q.premultiplyAlpha=!0,Q.anisotropy=N,Q.generateMipmaps=!0,Q.minFilter=Zn,Q.wrapS=Q.wrapT=Gn,Ae.set(R,Q),Q}let be={back:{s0:-.2,s1:.2,z0:1.08,z1:1.62,u0:0,u1:1,v0:.4,v1:1},front:{s0:-.2,s1:.2,z0:1.15,z1:1.55,u0:0,u1:.5,v0:0,v1:.4},shorts:{s0:.03,s1:.23,z0:.74,z1:.94,u0:.5,u1:1,v0:0,v1:.4}},Me=(R,Q,q,V)=>{let le=(Q.u1-Q.u0)/(Q.s1-Q.s0)/1e3*q,ie=(Q.u0-Q.s0/(Q.s1-Q.s0)*(Q.u1-Q.u0))*q,w=(Q.v1-Q.v0)/(Q.z1-Q.z0);R.setTransform(le,0,0,w/1e3*V,ie,(1-Q.v0+Q.z0*w)*V)},Le=(R,Q,q,V,le,ie)=>{R.font=`800 ${le*1.25}px "Arial Narrow", Arial, Helvetica, sans-serif`,R.textAlign="center",R.textBaseline="middle",R.lineJoin="round",R.lineWidth=Math.max(5,le*(le<100?.16:.08)),R.strokeStyle="#0b0f24",R.strokeText(Q,q,-V),R.fillStyle="#ffffff",R.fillText(Q,q,-V)};function ce(R,Q,q,V){let le=R.width,ie=R.height,w=R.getContext("2d");if(w.setTransform(1,0,0,1,0,0),w.clearRect(0,0,le,ie),Me(w,be.back,le,ie),Q){w.font='800 78px "Arial Narrow", Arial, sans-serif';let x=w.measureText(Q).width;w.save(),w.scale(Math.min(1,330/Math.max(1,x))*(x<200?1.1:1),1),Le(w,Q,0,1530,62),w.restore()}q!==""&&(w.save(),w.scale(.82,1),Le(w,q,0,1300,250),w.restore()),Me(w,be.shorts,le,ie),q!==""&&Le(w,q,125,815,70),w.setTransform(1,0,0,1,0,0)}let ve=3;f.frameStart=()=>{ve=3},f.dress=function(R,Q,q,V,le,ie,w){let x=Q.K,K=Q.key+(q?"g":"o")+V+":"+le+":"+w+":"+(Q.crestImg?1:0)+":"+(R.lod.hero?1:0);if(R.dk===K&&!R.printWait)return;let de=R.dk!==K;if(R.dk=K,de){let me=R.mh4&&R.mhId===V?R.mh4:(R.mhId=V,R.mh4=Y(V,ie)),xe=Ye=>new We(Ye),Ne=new We(u[Math.min(u.length-1,ie.si)]),Re=oE[me.base],Oe=new We().setRGB(ds(Ne.r*255/Re[0]*1.05,.4,2.2),ds(Ne.g*255/Re[1]*1.05,.4,2.2),ds(Ne.b*255/Re[2]*1.05,.4,2.2)),je=Ye=>Math.pow(Ye,2.2),Et=u[Math.min(u.length-1,ie.si)],Ce=[1,3,5].map(Ye=>parseInt(Et.slice(Ye,Ye+2),16)/255),Ht=[0,1,2].map(Ye=>.45*Re[Ye]/255+.55*Ce[Ye]),Mt=me.base==="af"?1.12:1;Oe.setRGB(ds(je(Ht[0])/je(Re[0]/255)*Mt,.45,1.8),ds(je(Ht[1])/je(Re[1]/255)*Mt,.45,1.8),ds(je(Ht[2])/je(Re[2]/255)*Mt,.45,1.8));let Ee=.07,Ue=2*Math.PI*.16,Pe=x.pat==="stripes"||x.pat==="pinstripes";for(let Ye of Object.keys(R.mats)){let Be=R.mats[Ye],U=Be.userData.u;Be.map=Ye==="hero"?p.hskins[me.base]:p.skins[me.base],U.uTint.value.copy(Oe),U.uHairC.value.set(ie.st==="bleach"?ie.tip:ie.hair),U.uBeard.value=ie.beard||0,U.uIris.value.set(ie.iris),U.uScalp.value=me.scalp,U.uErase.value=me.base==="af"&&!me.hair?1:0,U.uGK.value=q?1:0,U.uGlove.value.set("#f1f5f9");{let Qe=/^off4/.test(V),Ge=ie.mgr?[ie.sleeves?1:0,ie.trou?1:0]:Qe?[1,1]:R.fanWear||[0,0];U.uMgr.value.set(Ge[0],Ge[1]),U.uTrou.value.set(ie.mgr||Qe?x.sho:R.fanTrou||"#1e293b")}q?(U.uP1.value.set(Q.g),U.uP2.value.set(Q.g),U.uTrim.value.set("#111827"),U.uSlv.value.set(Q.g),U.uSlvOn.value=0,U.uPat.value=0,U.uSho.value.set("#111827"),U.uSoc.value.set(Q.g),U.uSocT.value.set("#111827")):(U.uP1.value.set(x.c1),U.uP2.value.set(x.c2),U.uTrim.value.set(x.col),U.uSlv.value.set(x.slv),U.uSlvOn.value=x.slv&&x.slv.toLowerCase()!==String(x.c1).toLowerCase()?1:0,U.uPat.value=cE[x.pat]||0,U.uPatW.value=Pe?Ue/Math.max(2,Math.round(Ue/Ee)):Ee,U.uSho.value.set(x.sho),U.uSoc.value.set(x.soc),U.uSocT.value.set(x.c2===x.soc?x.c1:x.c2)),U.uBoot.value.set(ie.boot),U.uBoot2.value.set(ie.boot2===ie.boot?"#f8fafc":ie.boot2)}let lt=R.lod.match.morphTargetInfluences;kc.forEach((Ye,Be)=>{lt[Be]=me.w[Ye]||0});for(let Ye of["far","hero"])if(R.lod[Ye]){let Be=R.lod[Ye].morphTargetInfluences;for(let U=0;U<Be.length;U++)Be[U]=Ye==="far"&&U>=4?0:lt[U]}let Te=R.hair.morphTargetInfluences;for(let Ye=0;Ye<Te.length;Ye++)Te[Ye]=lt[Ye];let Xt=p.cards[me.hair||"none"]||p.cards.none;if(R.hair.geometry=Xt.geo,R.hair.matrix.copy(Xt.m),R.hair.material.map=Xt.map,R.hair.material.color.set(ie.st==="bleach"?ie.tip:ie.hair),R.hair.material.needsUpdate=!0,R.hairH){let Ye=p.hcards[me.hair||"none"]||p.hcards.none;R.hairH.geometry=Ye.geo,R.hairH.matrix.copy(Ye.m),R.hairH.material.map=Ye.map,R.hairH.material.color.set(ie.st==="bleach"?ie.tip:ie.hair),R.hairH.material.needsUpdate=!0}R.hgt=Math.min(1.92,ie.h+(q?.04:0))/aE,R.style=ie,R.hstyle=me.hair||ie.st,R.printWait=!0}if(R.printWait&&ve>0){ve--,R.printWait=!1,R.pcv||(R.pcv=l($,$,()=>{}),R.ptex=new ls(R.pcv),R.ptex.colorSpace=Pt,R.ptex.flipY=!1,R.ptex.premultiplyAlpha=!0,R.ptex.anisotropy=N);let me=le==null||le===""?"":String(Math.max(0,Math.min(99,Math.floor(+le)||0)));ce(R.pcv,w,me),R.ptex.needsUpdate=!0,R.lod.hero&&t==="high"&&(R.pcvH||(R.pcvH=l(fe,fe,()=>{}),R.ptexH=new ls(R.pcvH),R.ptexH.colorSpace=Pt,R.ptexH.flipY=!1,R.ptexH.premultiplyAlpha=!0,R.ptexH.anisotropy=N),ce(R.pcvH,w,me),R.ptexH.needsUpdate=!0);let xe=q?null:pe(Q.crestImg);for(let[Ne,Re]of Object.entries(R.mats)){let Oe=Re.userData.u;Oe.uPrint.value=Ne==="hero"&&R.ptexH?R.ptexH:R.ptex,Oe.uCrest.value=xe,Oe.uCrestOn.value=xe?1:0}}},f.pre=function(R,Q,q,V,le){if(R.noCloth=!!Q.noCloth,Q.mhClip&&!p.clips[Q.mhClip.name]&&(Q.mhClip=null),!Q.mhClip&&R.shot&&R.shot.timeScale===0&&(R.shot.stop(),R.shot.timeScale=1,R.shot=null),Q.mhClip){if((!R.shot||R.shotName!==Q.mhClip.name)&&f.play(R,Q.mhClip.name),!R.shot)return;R.shot.timeScale=0,R.shot.time=Q.mhClip.loop?Q.mhClip.t%Math.max(.1,R.shot.getClip().duration):Q.mhClip.t,R.shotAge=1,R.shot.setEffectiveWeight(1),R.shotW=1;for(let de in R.act)R.act[de].setEffectiveWeight(0);return}V&&f.play(R,O(R,Q)||((Q.kick||0)>.8?"Shoot":"Pass")),le&&f.play(R,P(R)||"Tackle");let ie=Q._cel,w=ie&&(Q._csp||0)<2.2?zd[ie]:null;w&&!V&&!le&&(R.shot?R.shotName!==w&&Ve.has(R.shotName)&&(R.celOut=!0):(R.celGap=(R.celGap||0)-q,R.celGap<=0&&(f.play(R,w),R.celGap=.2+(n.hash(String(R.id))>>>3)%9*.07))),R.shot&&Ve.has(R.shotName)&&!w&&(R.celOut=!0);let x=0,K=R.shot;if(K){let de=Oc[R.shotName]||{},me=de.dur||K.getClip().duration;R.shotT=K.time,R.shotAge+=q;let xe=de.fade?Math.min(1,R.shotAge/de.fade):Math.min(1,R.shotAge/.06+.35),Ne=de.hold&&!R.celOut?1:ds((me-K.time)/(de.out||.16),0,1);R.celOut&&(R.celOutW=Math.max(0,(R.celOutW==null?1:R.celOutW)-q/.3),Ne=Math.min(Ne,R.celOutW)),x=Math.min(xe,Ne),!de.hold&&K.time>=me-.001||x<=.001?(K.stop(),R.shot=null,x=0,R.celOut=!1,R.celOutW=null):K.setEffectiveWeight(x)}if(R.shotW=x,x>0)for(let de in R.act)R.act[de].setEffectiveWeight(R.act[de].getEffectiveWeight()*(1-x))};let Ve=new Set(Object.values(zd));f.play=function(R,Q){let q=R.one[Q];if(!q&&p.clips[Q]&&(q=R.one[Q]=R.mixer.clipAction(p.clips[Q]),q.setLoop(Tc,1),q.clampWhenFinished=!0),!q)return;R.shot&&R.shot!==q&&R.shot.stop(),R.celOut=!1,R.celOutW=null;let V=Oc[Q]||{};q.reset(),q.timeScale=1,q.time=V.contact!=null?Math.max(0,V.contact-.02):0,q.setEffectiveWeight(1),q.play(),R.shot=q,R.shotName=Q,R.shotAge=0};let nt=new pi,qe=new pi,dt=new pi,vt=new Zh;f.post=function(R){if(f.clothFix===!1)return;if(R.cur==="far"||(R.dist||0)>26){if(R.cf.lengthSq()){R.cf.set(0,0,0,0);for(let V of Object.values(R.mats))V.userData.u.uClothF.value.set(0,0,0,0)}return}vt.copy(R.root.quaternion);let Q=dt.set(0,-1,0).applyQuaternion(vt),q=(V,le)=>(R.bones[le].updateWorldMatrix(!0,!1),qe.setFromMatrixPosition(R.bones[le].matrixWorld),nt.setFromMatrixPosition(R.bones[V].matrixWorld),Math.acos(ds(qe.sub(nt).normalize().dot(Q),-1,1)));R.cf.set(Uc(1.4,2.3,q("upperarm_l","lowerarm_l")),Uc(1.4,2.3,q("upperarm_r","lowerarm_r")),Uc(.45,1,q("thigh_l","calf_l")),Uc(.45,1,q("thigh_r","calf_r"))),R.noCloth&&R.cf.set(0,0,0,0);for(let V of Object.values(R.mats))V.userData.u.uClothF.value.copy(R.cf)};let at=-1,Dt=new Set;f.lod=function(R,Q){at!==i.n&&(at=i.n,Dt.clear(),f.chars.filter(ie=>a.has(ie.root)&&(ie.dist||0)<6.5).sort((ie,w)=>ie.dist-w.dist).slice(0,2).forEach(ie=>Dt.add(ie)));let q=R.dist||0,V=Q>=2,le=t==="low"||q>(V?16:t==="high"?40:24)?"far":"match";t==="high"&&!V&&q<6.5&&f.heroOk&&(Dt.has(R)||R.port)&&(ue(R),R.lod.hero&&(le="hero"));for(let ie in R.lod)R.lod[ie].visible=ie===le;R.hair.visible=le==="match"||le==="far"&&q<9,R.hairH&&(R.hairH.visible=le==="hero"),le==="hero"&&(R.hair.visible=!1),R.cur=le};let ee=null;return f.blobs=function(){if(t!=="low")return;ee||(ee=new vi(new ei(1,1).rotateX(-Math.PI/2),new rn({map:h(),transparent:!0,depthWrite:!1,opacity:.5,polygonOffset:!0,polygonOffsetFactor:-3}),J),ee.frustumCulled=!1,e.add(ee));let R=new ct,Q=new Zh,q=new pi,V=new pi,le=0;for(let ie of f.chars){if(!a.has(ie.root)||le>=J)continue;let w=.75*(ie.root.scale.x/o),x=ie.root.position.y;R.compose(V.set(ie.root.position.x,.015,ie.root.position.z),Q,q.set(w*(1+x*.3),1,w*(1+x*.3))),ee.setMatrixAt(le++,R)}ee.count=le,ee.instanceMatrix.needsUpdate=!0,le&&a.add(ee)},f.stats=()=>{let R=0,Q=0;for(let q of f.chars)if(a.has(q.root)){for(let V in q.lod)q.lod[V].visible&&(R++,Q+=q.lod[V].geometry.index.count/3);for(let V of[q.hair,q.hairH])V&&V.visible&&(R++,Q+=V.geometry.index.count/3)}return{players:f.chars.filter(q=>a.has(q.root)).length,draws:R,tris:Q,tier:t,hero:f.heroOk,lods:f.chars.filter(q=>a.has(q.root)).map(q=>q.cur)}},f}var $h=new Map;function AE(s,e,t="high",n=null){let i=s+"|"+t;if($h.has(i))return $h.get(i);let r=e&&e.capabilities.getMaxAnisotropy?e.capabilities.getMaxAnisotropy():1,a=t==="low"?Math.min(r,4):t==="mid"?Math.min(r,8):r,o={ready:0,need:t==="low"?2:3,aniso:a,listeners:[],fails:[],failed:!1},c=new ir,l=()=>{++o.ready===o.need&&o.listeners.splice(0).forEach(u=>u())},h=(u,f)=>{let A=c.load(n?n(u):s+u,l,void 0,m=>{console.warn("3D grass",u,m),o.failed||(o.failed=!0,o.fails.splice(0).forEach(b=>b()))});return A.wrapS=A.wrapT=ai,A.anisotropy=a,A.generateMipmaps=!0,A.minFilter=Zn,A.magFilter=qt,A.colorSpace=f?Pt:Hn,A};return o.c=h("w3d-grass-c.jpg",!0),o.orm=h("w3d-grass-orm.jpg",!1),o.n=t==="low"?null:h("w3d-grass-n.jpg",!1),o.onReady=u=>{o.ready>=o.need?u():o.listeners.push(u)},o.onFail=u=>{o.failed?u():o.fails.push(u)},$h.set(i,o),o}function Wd(s={}){let e=s.tier||"high",t=s.textures||AE(s.base||"./",s.renderer,e,s.url),n=new Ot({color:16777215,roughness:.94,metalness:0,envMapIntensity:.18}),i=n.userData.u={uGC:{value:t.c},uGN:{value:t.n},uGO:{value:t.orm},uReady:{value:t.ready>=t.need?1:0},uTile:{value:s.tile||1.45},uTint:{value:new We(s.tint||8828028)},uStripe:{value:s.stripe==null?.16:s.stripe},uStripeW:{value:7.5},uNrm:{value:s.normal==null?.9:s.normal},uAO:{value:.55},uWear:{value:s.wear==null?.35:s.wear},uLine:{value:new We(15922671)},uLineW:{value:.12},uHalf:{value:new Ze(52.5,34)},uSnow:{value:0},uSReady:{value:0},uSC:{value:null},uSM:{value:null}};return n.userData.loadSnow=()=>{if(n.userData._snow)return;n.userData._snow=1;let r=new ir,a=0,o=()=>{++a===2&&(i.uSReady.value=1)},c=(l,h)=>{let u=r.load(s.url?s.url(l):(s.base||"./")+l,o,void 0,()=>{});return u.wrapS=u.wrapT=ai,u.anisotropy=Math.min(t.aniso||1,8),u.colorSpace=h?Pt:Hn,u};i.uSC.value=c("w3d-snow-c.jpg",!0),i.uSM.value=c("w3d-snow-m.jpg",!1)},t.onReady(()=>{i.uReady.value=1,n.needsUpdate=!0}),t.onFail(()=>{n.onBeforeCompile=()=>{},n.customProgramCacheKey=()=>"w3dpitch_fallback",n.defines={};let r=typeof s.fallbackMap=="function"?s.fallbackMap():s.fallbackMap;r?n.map=r:n.color.set(2851897),n.needsUpdate=!0}),n.defines={PITCH_HQ:e==="low"?0:1},n.onBeforeCompile=r=>{Object.assign(r.uniforms,i),r.vertexShader=r.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vPW;`).replace("#include <fog_vertex>",`#include <fog_vertex>
  vPW = (modelMatrix * vec4(transformed, 1.0)).xyz;`),r.fragmentShader=r.fragmentShader.replace("#include <common>",`#include <common>
`+pE).replace("#include <map_fragment>",mE).replace("#include <roughnessmap_fragment>","float roughnessFactor = roughness * gRough;").replace("#include <normal_fragment_maps>",gE).replace("#include <aomap_fragment>",`#include <aomap_fragment>
  reflectedLight.indirectDiffuse *= gAO; reflectedLight.indirectSpecular *= mix(1.0, gAO, 0.5);`)},n.customProgramCacheKey=()=>"w3dpitch2_"+e,n}var pE=`
varying vec3 vPW;
uniform sampler2D uGC, uGN, uGO, uSC, uSM; uniform float uSnow, uSReady; uniform float uReady, uTile, uStripe, uStripeW, uNrm, uAO, uWear, uLineW; uniform vec3 uTint, uLine; uniform vec2 uHalf;
float pHash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float pNoise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(pHash(i), pHash(i + vec2(1, 0)), f.x), mix(pHash(i + vec2(0, 1)), pHash(i + vec2(1, 1)), f.x), f.y); }
/* Coverage of a line (half width hw) by this pixel: exact box filter over the pixel's footprint ACROSS the line.
   The footprint comes from the screen derivatives of the pitch position (smooth everywhere) projected on the line's
   normal n. (fwidth() of an abs() distance collapses right on the line and brings the aliasing back.) */
vec2 pDX, pDY;
float pLine(float d, float hw, vec2 n){
  float w = max((abs(dot(pDX, n)) + abs(dot(pDY, n))) * 1.25, 1e-5);
  float he = max(hw, 0.35 * w), k = sqrt(hw / he);   /* never thinner than ~0.7 px far away: dimmer, never broken */
  return clamp((min(d + 0.5 * w, he) - max(d - 0.5 * w, -he)) / w, 0.0, 1.0) * k; }
float pRect(vec2 p, vec2 c, vec2 h, float hw){ vec2 q = abs(p - c) - h; float d = abs(length(max(q, 0.0)) + min(max(q.x, q.y), 0.0));
  vec2 n = (q.x > 0.0 && q.y > 0.0) ? normalize(q) : (q.x > q.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0)); return pLine(d, hw, n); }
float pRing(vec2 p, vec2 c, float r, float hw){ vec2 v = p - c; float l = length(v); return pLine(abs(l - r), hw, v / max(l, 1e-4)); }
float pDot(vec2 p, vec2 c, float r){ vec2 v = p - c; float l = length(v); return pLine(l, r, v / max(l, 1e-4)); }
float pMarks(vec2 p){
  float hw = 0.5 * uLineW, c = 0.0; vec2 H = uHalf, a = vec2(abs(p.x), p.y);
  c = max(c, pRect(p, vec2(0.0), H, hw));                                            /* touch + goal lines */
  c = max(c, pLine(abs(p.x), hw, vec2(1.0, 0.0)) * step(abs(p.y), H.y));             /* halfway line */
  c = max(c, pRing(p, vec2(0.0), 9.15, hw));                                         /* centre circle */
  c = max(c, pDot(p, vec2(0.0), 0.11));                                              /* centre spot */
  c = max(c, pRect(a, vec2(H.x - 8.25, 0.0), vec2(8.25, 20.16), hw));                /* penalty areas */
  c = max(c, pRect(a, vec2(H.x - 2.75, 0.0), vec2(2.75, 9.16), hw));                 /* goal areas */
  c = max(c, pDot(a, vec2(H.x - 11.0, 0.0), 0.11));                                  /* penalty spots */
  c = max(c, pRing(a, vec2(H.x - 11.0, 0.0), 9.15, hw) * step(a.x, H.x - 16.5));     /* penalty arcs */
  vec2 k = H - abs(p); c = max(c, pRing(k, vec2(0.0), 1.0, hw) * step(0.0, k.x) * step(0.0, k.y)); /* corner arcs */
  /* technical areas in front of the dugouts (dashed, as on the old canvas pitch) */
  float ta = pRect(a, vec2(9.5, -36.3), vec2(5.0, 1.3), 0.04) * step(fract((p.x + p.y) / 0.9), 0.55) * 0.7;
  return max(c, ta);
}
`,mE=`
  vec2 gP = vPW.xz; float gW = max(fwidth(gP.x) + fwidth(gP.y), 1e-4) * 0.7;      /* pixel footprint in metres */
  vec2 gUA = gP / uTile, gUB = mat2(0.80, -0.60, 0.60, 0.80) * gP / (uTile * 2.37) + 0.37;
  vec3 gCol = texture2D(uGC, gUA).rgb; vec4 gO = texture2D(uGO, gUA);
  #if PITCH_HQ
    vec3 gCB = texture2D(uGC, gUB).rgb; vec4 gOB = texture2D(uGO, gUB); float gMix = 0.35 + 0.3 * pNoise(gP * 0.21);
    gCol = mix(gCol, gCB, gMix); gO = mix(gO, gOB, gMix);
  #endif
  /* big soft patches of slightly different grass + worn goalmouths / centre */
  float gN = pNoise(gP * 0.045) * 0.6 + pNoise(gP * 0.13) * 0.4;
  gCol *= uTint * (0.9 + 0.2 * gN);
  vec2 gA = vec2(abs(gP.x), gP.y);
  float gWear = uWear * (smoothstep(5.5, 0.5, length((gA - vec2(uHalf.x - 2.0, 0.0)) * vec2(1.0, 0.75))) + 0.5 * smoothstep(3.5, 0.0, length(gP))) * (0.55 + 0.45 * pNoise(gP * 1.7));
  gCol = mix(gCol, vec3(0.30, 0.25, 0.15) * (0.8 + 0.4 * gN), clamp(gWear, 0.0, 0.7));
  /* mowing stripes: bands along the length, a little brighter / darker with the view (blades lean opposite ways) */
  /* anti-aliased square wave, band edges on every multiple of 7.5 m (same bands as the old canvas pitch) */
  float gX = gP.x / (2.0 * uStripeW) + 0.25, gTri = abs(fract(gX) - 0.5) * 4.0 - 1.0;
  float gS = clamp(gTri / (4.0 * fwidth(gX) + 1e-4), -1.0, 1.0);
  vec3 gV = normalize(cameraPosition - vPW);
  gCol *= 1.0 + uStripe * gS * (0.65 + 0.35 * gV.z);
  /* G13 snow: patchy on the grass first, full cover when it's heavy; the groundsmen keep the lines clear */
  float gSn = 0.0;
  if (uSnow > 0.001) { float sm = uSReady > 0.5 ? texture2D(uSM, gP / 3.1).r : pNoise(gP * 1.3); float th = 1.0 - uSnow * 1.35;
    gSn = smoothstep(th - 0.12, th + 0.12, sm * 0.7 + gN * 0.3) * (1.0 - clamp(gWear, 0.0, 0.7) * 0.5);
    vec3 sC = uSReady > 0.5 ? texture2D(uSC, gP / 2.3).rgb * vec3(0.96, 0.98, 1.04) : vec3(0.86, 0.89, 0.93); gCol = mix(gCol, sC, gSn); }
  /* markings */
  pDX = dFdx(gP); pDY = dFdy(gP); float gL = pMarks(gP);
  vec3 gAlb = mix(gCol, uLine * (0.9 + 0.1 * gCol.g * 2.0), gL);
  float gRough = mix(mix(1.0, clamp(gO.g / 0.71, 0.6, 1.25), 0.7), 0.82, gSn) * mix(1.0, 0.92, gL);
  float gAO = mix(1.0, clamp(gO.r / 0.56, 0.0, 1.25), uAO * (1.0 - gL));
  gAlb = mix(vec3(0.16, 0.42, 0.13), gAlb, uReady); gRough = mix(1.0, gRough, uReady); gAO = mix(1.0, gAO, uReady);
  diffuseColor.rgb *= gAlb;
`,gE=`
  #if PITCH_HQ
  {
    /* world-space tiled grass normal (OpenGL convention), faded out where the pixel covers many texels (no sparkle) */
    vec3 nA = texture2D(uGN, gUA).xyz * 2.0 - 1.0, nB = texture2D(uGN, gUB).xyz * 2.0 - 1.0;
    vec3 nT = normalize(mix(nA, nB, gMix));
    float amt = uNrm * uReady * (1.0 - 0.6 * gL) * (1.0 - smoothstep(0.015, 0.09, gW));
    vec3 nW = normalize(vec3(nT.x * amt, 1.0, nT.y * amt));
    normal = normalize((viewMatrix * vec4(nW, 0.0)).xyz);
  }
  #endif
`;var $e=G,zi=Vn,vn=(s,e,t)=>s<e?e:s>t?t:s,ft=(s,e,t)=>{let n=vn((t-s)/(e-s),0,1);return n*n*(3-2*n)};var Qc=1.1,eu=.15,Kd={idle:"Idle_Loop",walk:"Walk_Loop",jog:"Jog_Fwd_Loop",sprint:"Sprint_Loop",dance:"Dance_Loop",air:"Jump_Loop",crouch:"Crouch_Idle_Loop",talk:"Idle_Talking_Loop"},oo=["#2f1b11","#3f2618","#4d2e1d","#5c3822","#70442a","#83512f","#966039","#a8724a","#b9835a","#c4916a","#cf9f7a","#d9ab86","#e0b590"],_E={dark:"#2a1a10",brown:"#5a3518",hazel:"#7a5a2a",green:"#4e7a45",blue:"#4f7fb3",grey:"#7d8b96"},bE=["#0a0a0c","#0a0a0c","#121010","#17110d","#24170f","#3a2414","#5a3a20","#7a5230","#a07a44","#c9a55a","#6b2f1a"];function EE(s){let e=s.tier||(s.weak?"low":"mid"),t=e==="low",n={high:{pr:1.75,sh:2048,crowd:5e3,near:36},mid:{pr:1.5,sh:1024,crowd:3e3,near:26},low:{pr:.9,sh:512,crowd:900,near:16}}[e]||{pr:1.5,sh:1024,crowd:3e3,near:26},i={},r=s.G3,a=null,o=null,c,l,h,u,f=null,A=!1,m=0,b=0,p=0,d={n:1,dt:.016,now:0},M=new Set,y=new la;y.setMeshoptDecoder(Lc);let B=E=>s.base+E+"?v="+s.v;function O(){if(a)return!A;o=document.createElement("canvas"),o.style.cssText="display:block;width:100%;height:100%;border-radius:0;box-shadow:none";try{a=new Zr({canvas:o,antialias:!t,alpha:!0,powerPreference:"high-performance"})}catch{return a=null,!1}a.outputColorSpace=Pt,a.toneMapping=Cc,a.toneMappingExposure=1.08,a.shadowMap.enabled=!0,a.shadowMap.type=Sc,c=new ws,c.fog=new dc(724260,.0026),l=new _n(40,1,.1,1e3);try{let C=new Cs(a);Ct=c.environment=C.fromScene(new ao,.04).texture,C.dispose()}catch{}h=new $a(13097215,2112034,.7),c.add(h),u=new Hi(16774114,2.6),u.castShadow=!0;let E=n.sh;u.shadow.mapSize.set(E,E),e==="low"&&(u.castShadow=!1),u.shadow.bias=-5e-4,u.shadow.normalBias=.03,u.shadow.camera.near=1,u.shadow.camera.far=220,c.add(u),c.add(u.target);let S=new Hi(10467327,.6);return S.position.set(-40,30,-30),c.add(S),o.addEventListener("webglcontextlost",C=>{C.preventDefault(),A=!0}),o.addEventListener("webglcontextrestored",()=>{A=!1}),!0}i.ok=()=>!!(P&&a&&!A&&m<3);let P=null,N={},H=null,v=null,D="";i.mh=()=>v&&v.ok?v:null,i.mhInfo=()=>({ok:!!(v&&v.ok),err:D,hero:!!(v&&v.heroOk)});let J=Promise.all([y.loadAsync(B("w3d-player.glb")),y.loadAsync(B("w3d-anims.glb"))]).then(async([E,S])=>{for(let _ of S.animations)N[_.name]=_;H=E.scene,H.updateMatrixWorld(!0),H.traverse(_=>{if(!_.isSkinnedMesh)return;let T=_.geometry,I=T.attributes.position,F=T.attributes.normal,g=I.count,X=new Float32Array(g*3),W=new Float32Array(g*3),re=new $e,we=new $e;for(let ge=0;ge<g;ge++)re.fromBufferAttribute(I,ge),we.fromBufferAttribute(F,ge).multiplyScalar(.01).add(re),_.applyBoneTransform(ge,re),_.applyBoneTransform(ge,we),we.sub(re).normalize(),X[ge*3]=re.x,X[ge*3+1]=re.y,X[ge*3+2]=re.z,W[ge*3]=we.x,W[ge*3+1]=we.y,W[ge*3+2]=we.z;{let ge=T.attributes._shift;if(ge)for(let z=0;z<g;z++)X[z*3]-=ge.getX(z),X[z*3+1]-=ge.getY(z),X[z*3+2]-=ge.getZ(z)}T.setAttribute("aB",new Ft(X,3)),T.setAttribute("aBN",new Ft(W,3));{let ge=new $e().fromBufferAttribute(I,0),z=new $e().fromBufferAttribute(I,g-1);T.userData.k=ge.distanceTo(z)/Math.max(1e-6,Math.hypot(X[0]-X[g*3-3],X[1]-X[g*3-2],X[2]-X[g*3-1]))}T.boundingSphere=new yn(new $e(0,.9,0),1.6),_.frustumCulled=!0});let C=null;if(H.traverse(_=>{_.isSkinnedMesh&&_.name!=="Body_LO"&&/Superhero/i.test(_.material.name||"")&&(C=_)}),C){let _=C.geometry,T=_.attributes.position,I=_.attributes.normal,F=_.attributes.aB,g=_.attributes.aBN,X=_.index,W=new $e().fromBufferAttribute(T,0),re=new $e().fromBufferAttribute(T,1),we=new $e().fromBufferAttribute(F,0),ge=new $e().fromBufferAttribute(F,1),z=W.distanceTo(re)/Math.max(1e-6,we.distanceTo(ge)),ne=Se=>{let _e=F.getY(Se),st=g.getZ(Se),Tt=Math.abs(F.getX(Se));if(_e<1.585)return!1;let Kt=1.745+(1.6-1.745)*ft(.25,-.6,st);return Tt>.07&&st>-.2&&(Kt=Math.max(Kt,1.735-(Tt-.07)*.6)),_e>Kt-.004},ye=Se=>{let _e=F.getY(Se),st=F.getZ(Se),Tt=Math.abs(F.getX(Se));return _e<1.555||_e>1.668||st<-.035||Tt>.088||Tt<.031&&Math.abs(_e-1.637)<.0095&&st>.07?!1:_e>1.648&&Tt<.045&&st>.09?_e<1.656&&Tt<.03:g.getY(Se)>-.92||_e>1.575},wt=Se=>{let _e=F.getY(Se);return _e>1.728&&_e<1.758&&g.getY(Se)<.75},Ke=Se=>{let _e=[];for(let st=0;st<X.count;st+=3){let Tt=X.getX(st),Kt=X.getX(st+1),Mn=X.getX(st+2);Se(Tt)&&Se(Kt)&&Se(Mn)&&_e.push(Tt,Kt,Mn)}return _e},rt={hair:Ke(ne),beard:Ke(Se=>ye(Se)&&g.getY(Se)>-.5),band:Ke(wt)},De=(Se,_e,st,Tt)=>{let Kt=rt[Tt||"hair"],Mn=new Map,In=[],dn=[],Ci=[],ae=[],Ie=[],Xe=[],Gt=[],en=new $e,on=new $e,An=st?Kt.filter(($t,nn)=>{let En=nn-nn%3;return[0,1,2].every(yt=>st(F.getX(Kt[En+yt]),F.getY(Kt[En+yt]),F.getZ(Kt[En+yt])))}):Kt;for(let $t of An){if(!Mn.has($t)){Mn.set($t,Mn.size),en.fromBufferAttribute(T,$t),on.fromBufferAttribute(I,$t).normalize();let nn=_e(F.getX($t),F.getY($t),F.getZ($t),g.getZ($t)),En=nn*z;In.push(en.x+on.x*En,en.y+on.y*En,en.z+on.z*En),dn.push(on.x,on.y,on.z),Gt.push(nn),Xe.push(F.getX($t)+g.getX($t)*nn,F.getY($t)+g.getY($t)*nn,F.getZ($t)+g.getZ($t)*nn);for(let yt=0;yt<4;yt++)Ci.push(_.attributes.skinIndex.getComponent($t,yt)),ae.push(_.attributes.skinWeight.getComponent($t,yt))}Ie.push(Mn.get($t))}let tn=new an;tn.setAttribute("position",new Ut(In,3)),tn.setAttribute("normal",new Ut(dn,3)),tn.setAttribute("skinIndex",new Jr(Ci,4)),tn.setAttribute("skinWeight",new Ut(ae,4)),tn.setAttribute("aB",new Ut(Xe,3));{let $t=Gt.slice().sort((En,yt)=>En-yt),nn=Math.max(1e-5,$t[Math.floor($t.length*.7)]||1e-5);tn.setAttribute("aE",new Ut(Gt.map(En=>Math.min(1,En/nn)),1))}tn.setIndex(Ie),tn.boundingSphere=new yn(new $e(0,.9,0),1.6),tn.userData.k=z;let di=new Xi(tn,new Ot({color:1118481,roughness:.95}));di.name=Se,di.castShadow=!0,di.visible=!1,C.parent.add(di),di.bind(C.skeleton,C.bindMatrix)},At=(Se,_e)=>{let st=Math.abs(Se),Tt=1.745+(1.6-1.745)*ft(.25,-.6,_e);return st>.07&&_e>-.2&&(Tt=Math.max(Tt,1.735-(st-.07)*.6)),Tt},It=(Se,_e)=>(st,Tt,Kt,Mn)=>Se(st,Tt,Kt,Mn)*(.35+.65*ft(0,_e||.03,Tt-At(st,Mn)));De("h_crew",()=>.007),De("h_short",It(()=>.011,.02)),De("h_afro",It((Se,_e,st)=>.03+.03*ft(1.62,1.75,_e),.05)),De("h_top",(Se,_e,st)=>.006+.034*ft(1.73,1.8,_e)*(1-ft(.06,.1,Math.abs(Se)))),De("h_corn",()=>.0055),De("h_hawk",(Se,_e)=>.004+.045*(1-ft(.008,.026,Math.abs(Se)))*ft(1.69,1.76,_e),Se=>Math.abs(Se)<.032),De("h_under",(Se,_e)=>.006+.014*ft(1.71,1.78,_e)*(1-ft(.03,.055,Math.abs(Se))),(Se,_e)=>Math.abs(Se)<.062||_e>1.79),De("h_curl",It((Se,_e)=>.016+.012*ft(1.7,1.79,_e))),De("h_quiff",It((Se,_e,st)=>.012+.032*ft(0,.07,st)*ft(1.735,1.78,_e),.02)),De("h_part",It((Se,_e)=>.014+.006*ft(1.75,1.8,_e),.02)),De("h_slick",(Se,_e,st)=>.009+.006*ft(.04,-.05,st)),De("h_twist",It((Se,_e)=>.024+.012*ft(1.72,1.79,_e),.04)),De("h_dread",It((Se,_e)=>.026+.01*ft(1.72,1.79,_e),.04));let Je=(Se,_e)=>ft(1.566,1.595,_e)*(1-ft(.072,.088,Math.abs(Se)))*(1-ft(1.648,1.665,_e)*ft(.04,.06,Math.abs(Se)));De("b_full",(Se,_e,st)=>(.004+.008*ft(1.63,1.59,_e)*(1-.6*ft(.04,.08,Math.abs(Se))))*Je(Se,_e),null,"beard"),De("b_short",(Se,_e)=>(.003+.003*ft(1.62,1.585,_e))*Je(Se,_e),null,"beard"),De("b_goat",(Se,_e,st)=>(.004+.009*ft(1.625,1.59,_e))*ft(1.562,1.58,_e)*(1-ft(.022,.032,Math.abs(Se))),(Se,_e,st)=>Math.abs(Se)<.034&&(_e<1.63||_e>1.64),"beard"),De("g_band0",()=>.004,null,"band"),De("g_band",()=>.017,null,"band"),De("g_bandX",()=>.064,null,"band");let mt=(Se,_e,st)=>{let Tt=Ke(_e),Kt=new Map,Mn=[];for(let yt of Tt)Kt.has(yt)||(Kt.set(yt,Mn.length),Mn.push(yt));let In=Mn.length,dn=new Float32Array(In*3),Ci=Array.from({length:In},()=>new Set),ae=new Map;for(let yt=0;yt<Tt.length;yt+=3){let bt=Kt.get(Tt[yt]),ut=Kt.get(Tt[yt+1]),xn=Kt.get(Tt[yt+2]);Ci[bt].add(ut).add(xn),Ci[ut].add(bt).add(xn),Ci[xn].add(bt).add(ut);for(let[gi,Tn]of[[bt,ut],[ut,xn],[xn,bt]]){let _i=gi<Tn?gi+":"+Tn:Tn+":"+gi;ae.set(_i,(ae.get(_i)||0)+1)}}let Ie=new Uint8Array(In);for(let[yt,bt]of ae)if(bt===1){let[ut,xn]=yt.split(":").map(Number);Ie[ut]=Ie[xn]=1}Mn.forEach((yt,bt)=>{let ut=F.getX(yt),xn=F.getY(yt),gi=F.getZ(yt),Tn=st(ut,xn,gi);dn[bt*3]=ut+g.getX(yt)*Tn,dn[bt*3+1]=xn+g.getY(yt)*Tn,dn[bt*3+2]=gi+g.getZ(yt)*Tn});let Xe=new Float32Array(In*3);for(let yt=0;yt<(Se==="k_shirt"?24:12);yt++){for(let bt=0;bt<In;bt++){let ut=0,xn=0,gi=0,Tn=0;for(let Ui of Ci[bt])ut+=dn[Ui*3],xn+=dn[Ui*3+1],gi+=dn[Ui*3+2],Tn++;let _i=Ie[bt]?0:.55;Xe[bt*3]=dn[bt*3]+(Tn?(ut/Tn-dn[bt*3])*_i:0),Xe[bt*3+1]=dn[bt*3+1]+(Tn?(xn/Tn-dn[bt*3+1])*_i*.6:0),Xe[bt*3+2]=dn[bt*3+2]+(Tn?(gi/Tn-dn[bt*3+2])*_i:0)}for(let bt=0;bt<In;bt++){let ut=Mn[bt],xn=Xe[bt*3]-F.getX(ut),gi=Xe[bt*3+1]-F.getY(ut),Tn=Xe[bt*3+2]-F.getZ(ut),_i=xn*g.getX(ut)+gi*g.getY(ut)+Tn*g.getZ(ut),Ui=st(F.getX(ut),F.getY(ut),F.getZ(ut))*.55;_i<Ui&&(Xe[bt*3]+=g.getX(ut)*(Ui-_i),Xe[bt*3+1]+=g.getY(ut)*(Ui-_i),Xe[bt*3+2]+=g.getZ(ut)*(Ui-_i))}dn.set(Xe)}let Gt=new Float32Array(In*3),en=new Float32Array(In*3),on=new Float32Array(In*3),An=new Float32Array(In*3),tn=new Uint16Array(In*4),di=new Float32Array(In*4),$t=new $e;Mn.forEach((yt,bt)=>{$t.fromBufferAttribute(T,yt);for(let ut=0;ut<3;ut++){let xn=dn[bt*3+ut]-F.getComponent(yt,ut);en[bt*3+ut]=xn*z,Gt[bt*3+ut]=$t.getComponent(ut)+xn*z,on[bt*3+ut]=F.getComponent(yt,ut),An[bt*3+ut]=g.getComponent(yt,ut)}for(let ut=0;ut<4;ut++)tn[bt*4+ut]=_.attributes.skinIndex.getComponent(yt,ut),di[bt*4+ut]=_.attributes.skinWeight.getComponent(yt,ut)});let nn=new an;nn.setAttribute("position",new Ft(Gt,3)),nn.setAttribute("aOff",new Ft(en,3)),nn.setAttribute("aB",new Ft(on,3)),nn.setAttribute("aBN",new Ft(An,3)),nn.setAttribute("skinIndex",new Ft(tn,4)),nn.setAttribute("skinWeight",new Ft(di,4)),nn.setIndex(Tt.map(yt=>Kt.get(yt))),nn.computeVertexNormals(),nn.boundingSphere=new yn(new $e(0,.9,0),1.6),nn.userData.k=z;let En=new Xi(nn,C.material);En.name=Se,En.castShadow=!0,En.receiveShadow=!1,C.parent.add(En),En.bind(C.skeleton,C.bindMatrix)},pt=Se=>Math.abs(F.getX(Se))>.232&&F.getY(Se)>1.2,Nt=Se=>1.5+ft(.075,.16,Se)*.1;mt("k_shirt",Se=>{let _e=F.getY(Se),st=Math.abs(F.getX(Se));return pt(Se)?st<.405:_e>.79&&_e<Nt(st)-.004&&!(st>.2&&_e<1.2&&g.getY(Se)<-.6)},(Se,_e,st)=>{let Tt=Math.abs(Se);return Tt>.232&&_e>1.2?.008+.015*ft(.27,.4,Tt):(.012+.013*ft(1,.82,_e)+.002*ft(1.2,1.4,_e)*ft(0,.08,st))*(1-.82*ft(1.4,1.5,_e)*(1-ft(.16,.22,Tt)))}),mt("k_shorts",Se=>{let _e=F.getY(Se);return!pt(Se)&&_e>.6&&_e<.9},(Se,_e)=>.016+.022*ft(.74,.62,_e)+.004*ft(.8,.88,_e)),mt("k_trou",Se=>{let _e=F.getY(Se);return!pt(Se)&&_e>.1&&_e<.95},(Se,_e)=>.013+.01*ft(.45,.15,_e)+.013*ft(.8,.92,_e))}{let _=H.getObjectByName("Head"),T=new ln;_.add(T),_.matrixWorld.clone().invert().decompose(T.position,T.quaternion,T.scale);let I=()=>new Ot({color:1118481,roughness:.9}),F=(W,re,we)=>{if(re.name=W,re.castShadow=!0,re.visible=!1,we){let ge=new ln;ge.name=W+"_pv",ge.position.set(0,we,-.06),re.position.y-=we,re.position.z+=.06,ge.add(re),T.add(ge)}else T.add(re);return re},g=F("h_bun",new ze(new Rs(.036,14,10),I()));g.position.set(0,1.79,-.085),g.scale.set(1,.9,1);{let W=new Pn,re=I(),we=new ze(new Rs(.03,12,8),re);we.position.set(0,1.735,-.112),W.add(we);let ge=new ze(new li(.022,.008,.16,8),re);ge.position.set(0,1.655,-.13),ge.rotation.x=-.25,W.add(ge),F("h_pony",W,1.74)}let X=W=>{let re=[];for(let we=0;we<17;we++){let ge=-2.25+we*4.5/16,z=.092,ne=new li(.011,.008,W*(.85+.3*(we*7%5)/4),6);ne.translate(0,-W/2,0),ne.rotateX(.18+.08*Math.cos(ge)),ne.rotateY(ge),ne.translate(Math.sin(ge)*-z*1,1.745,Math.cos(ge)*-z-.005),re.push(ne)}return so(re)};F("h_locksS",new ze(X(.11),I()),1.74),F("h_locksL",new ze(X(.21),I()),1.74);{let W=new li(.1,.118,.2,20,1,!0,Math.PI*.62,Math.PI*.76);W.translate(0,1.66,-.012);let re=new ze(W,I());re.material.side=Sn,F("h_long",re,1.76)}}{let _=new zi,T=new zi,I=new $e(0,0,1);for(let F of["l","r"])for(let g of["index","middle","ring","pinky","thumb"])for(let X=1;X<=3;X++){let W=H.getObjectByName(g+"_0"+X+"_"+F);if(!W)continue;let re=(g==="thumb"?[.15,.25,.2]:[.45,.6,.4])[X-1]*(F==="l"?-1:1)*(g==="pinky"?1.15:1);H.updateMatrixWorld(!0),_.setFromAxisAngle(I,re),W.parent.getWorldQuaternion(T),W.quaternion.premultiply(T.clone().invert().multiply(_).multiply(T))}H.updateMatrixWorld(!0)}if(!O())throw new Error("no WebGL");if(P=E,s.mh!==!1)try{v=Vd({scene:c,tier:e,ctx:s,F:d,url:B,used:M,SC:Qc,getR:()=>a,cvs:Z,blobTex:ti,SKINS:oo,chars:qe}),await v.ready}catch(_){console.warn("3D mh",_),v=null,D=String(_&&_.message||_).slice(0,120)}return i.ready=!0,i}),Z=(E,S,C)=>{let _=document.createElement("canvas");return _.width=E,_.height=S,C(_.getContext("2d"),E,S),_},ue=(E,S,C)=>{let _=new ls(E);return S!==!1&&(_.colorSpace=Pt),C&&(_.wrapS=_.wrapT=ai),_.anisotropy=t?1:4,_},k=null,Y=()=>k||(k=ue(Z(640,96,E=>{E.fillStyle="#000",E.fillRect(0,0,640,96),E.font="900 80px Arial, Helvetica, sans-serif",E.textAlign="center",E.textBaseline="middle",E.lineJoin="round",E.globalCompositeOperation="lighter";for(let S=0;S<10;S++)E.strokeStyle="#0000ff",E.lineWidth=10,E.strokeText(String(S),S*64+35,56),E.fillStyle="#0000ff",E.fillText(String(S),S*64+35,56);E.globalCompositeOperation="source-over";for(let S=0;S<10;S++)E.strokeStyle="#00ff00",E.lineWidth=9,E.strokeText(String(S),S*64+32,52),E.fillStyle="#ffffff",E.fillText(String(S),S*64+32,52)}),!1)),$=(E,S,C)=>Z(512,256,_=>{for(let T=0;T<2;T++){_.save(),_.translate(T*256,0),_.scale(4,4),_.beginPath(),_.rect(0,0,64,64),_.clip();let I=E.c2;_.fillStyle=S||E.c1,_.fillRect(0,0,64,64),_.fillStyle=I,S||({stripes:()=>{for(let g=4;g<64;g+=16)_.fillRect(g,0,7,64)},hoops:()=>{for(let g=10;g<64;g+=16)_.fillRect(0,g,64,7)},halves:()=>_.fillRect(32,0,32,64),sash:()=>{_.beginPath(),_.moveTo(0,10),_.lineTo(12,0),_.lineTo(64,52),_.lineTo(52,64),_.fill()},pinstripes:()=>{for(let g=3;g<64;g+=6)_.fillRect(g,0,1.2,64)},chevron:()=>{_.beginPath(),_.moveTo(0,6),_.lineTo(32,26),_.lineTo(64,6),_.lineTo(64,16),_.lineTo(32,36),_.lineTo(0,16),_.fill()},gradient:()=>{let g=_.createLinearGradient(0,0,0,64);g.addColorStop(0,E.c1),g.addColorStop(1,I),_.fillStyle=g,_.fillRect(0,0,64,64)},checker:()=>{for(let g=0;g<64;g+=12)for(let X=0;X<64;X+=12)(g+X)/12%2&&_.fillRect(g,X,12,12)},centre:()=>_.fillRect(26,0,12,64)}[E.pat]||(()=>{}))();let F=_.createLinearGradient(0,0,64,0);F.addColorStop(0,"rgba(0,0,0,.18)"),F.addColorStop(.5,"rgba(255,255,255,.05)"),F.addColorStop(1,"rgba(0,0,0,.18)"),_.fillStyle=F,_.fillRect(0,0,64,64),T||(_.fillStyle="rgba(255,255,255,.75)",_.fillRect(16,12,6,1.2),C&&_.drawImage(C,40,9,10,11.3)),_.restore()}}),fe=new Map;i.team=function(E,S,C,_){let T=s.kitN(E),I=s.hx(S,"#facc15"),F=JSON.stringify([T,I,C||null,_||""]),g=fe.get(F);if(g)return fe.delete(F),fe.set(F,g),g;let X=ue($(T)),W=ue($(T,I));if(g={_b3:1,key:F,K:T,g:I,tex:X,gtex:W},C)try{let re=s.crestSvg(C,_,46).replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" '),we=new Image;we.onload=()=>{g.dead||(g.crestImg=we,g.tex.image=$(T,null,we),g.tex.needsUpdate=!0,g.gtex.image=$(T,I,we),g.gtex.needsUpdate=!0)},we.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(re)}catch{}if(fe.set(F,g),fe.size>10){let[re,we]=fe.entries().next().value;fe.delete(re),we.dead=1,we.tex.dispose(),we.gtex.dispose()}return g},i.freeTeam=function(){};let Ae=E=>{let S=new We(E);return .3*S.r+.59*S.g+.11*S.b},pe=`uniform vec4 uFace; uniform vec4 uFace2; uniform vec4 uFace3; uniform vec4 uExpr; uniform float uK;
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
  }`,be=`uniform vec4 uBody;
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
  }`,Me=(E,S)=>{E.vertexShader=`attribute vec3 aB;
`+(S?`attribute vec3 aBN;
varying vec3 vB;
varying vec3 vBN;
`+be+`
`:"")+pe+`
`+E.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
`+(S?`vB = aB; vBN = aBN;
transformed += bodyDef(aB, aBN) * uK;
`:"")+"transformed += faceDef(aB) * uK;")},Le=()=>({uFace:{value:new Rt},uFace2:{value:new Rt},uFace3:{value:new Rt},uExpr:{value:new Rt}});function ce(E,S,C,_,T){let I=new Ot({map:E.map,roughness:.6,metalness:0,envMapIntensity:.45}),F=()=>({value:new We}),g=I.userData.u=Object.assign(_?Object.assign({},_):{uSkin:F(),uHair:F(),uSho:F(),uSoc:F(),uSlv:F(),uCol:F(),uBoot:F(),uBoot2:F(),uGlove:F(),uNumC:F(),uTape:F(),uShirt:{value:null},uDig:{value:Y()},uName:{value:null},uNum:{value:new Ze(-1,-1)},uGK:{value:0},uHairS:{value:1},uBeard:{value:0},uRed:{value:0},uBody:{value:new Rt(0,1,0,0)},uGear:{value:new Rt}},S,{uK:{value:C},uLayer:{value:T||0}});return _||(I.userData.base=g),T&&(I.side=Sn,I.roughness=.82),I.onBeforeCompile=X=>{Object.assign(X.uniforms,g),Me(X,!0),T===1&&(X.vertexShader=`attribute vec3 aOff;
uniform float uLayer;
`+X.vertexShader.replace("transformed += bodyDef(aB, aBN) * uK;","transformed += bodyDef(aB, aBN) * uK; transformed -= aOff * (1.0 - uBody.z) * (1.0 - smoothstep(0.83, 0.9, aB.y)) * 0.85;")),X.fragmentShader=`uniform float uLayer;
`+X.fragmentShader,X.fragmentShader=`uniform vec3 uSkin,uHair,uSho,uSoc,uSlv,uCol,uBoot,uBoot2,uGlove,uNumC,uTape;uniform sampler2D uShirt,uDig,uName;uniform vec2 uNum;uniform float uGK,uHairS,uBeard,uRed;uniform vec4 uExpr,uBody,uGear;varying vec3 vB;varying vec3 vBN;
float hz(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
`+X.fragmentShader.replace("#include <map_fragment>",`float wSkin = 0.0;
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
#include <opaque_fragment>`)},I.customProgramCacheKey=()=>"w3dbody6_"+(T||0),I}function ve(E,S,C,_){let T=E.clone(),I=Object.assign({},S,{uK:{value:C},uIris:{value:new We}});return T.userData.u=I,T.onBeforeCompile=F=>{Object.assign(F.uniforms,I),Me(F,!1),_||(F.vertexShader=F.vertexShader.replace("transformed += faceDef(aB) * uK;","transformed += faceDef(aB) * uK; transformed.y += (1.713 - aB.y) * 0.35 * uK; transformed.z -= 0.0015 * uK;")),_&&(F.fragmentShader=`uniform vec3 uIris;
`+F.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ vec3 c = diffuseColor.rgb; float mx = max(c.r, max(c.g, c.b)), mn = min(c.r, min(c.g, c.b)), L = dot(c, vec3(0.3, 0.59, 0.11)); float ir = smoothstep(0.03, 0.09, mx - mn) * (1.0 - smoothstep(0.3, 0.5, L)); diffuseColor.rgb = mix(c, uIris * clamp(L / 0.12, 0.5, 1.6), ir); }`))},T.customProgramCacheKey=()=>_?"w3deye2":"w3dbrow3",T}function Ve(E,S,C){let _=new Ot({color:1118481,roughness:.88,envMapIntensity:.35}),T=Object.assign({},E,{uK:{value:S||1},uStyle:{value:0},uTip:{value:new Rt(0,0,0,0)}});return _.userData.u=T,_.onBeforeCompile=I=>{Object.assign(I.uniforms,T),Me(I,!1),I.vertexShader=`attribute float aE;
varying vec3 vHB;
varying float vE;
`+I.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vHB = aB; vE = aE;`),I.fragmentShader=`uniform float uStyle;uniform vec4 uTip;varying vec3 vHB;varying float vE;
float hz2(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
`+I.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
        { vec3 p = vHB; if (vE < 0.2 + 0.45 * hz2(floor(p * 1100.0))) discard; float n = hz2(floor(p * vec3(700.0, 260.0, 700.0)));
          float g = 0.72 + 0.45 * n;
          if (uStyle > 0.5 && uStyle < 1.5) { float r = abs(sin(p.x / 0.0085 * 3.14159)); g *= mix(0.45, 1.15, smoothstep(0.15, 0.6, r)); }
          else if (uStyle > 1.5 && uStyle < 2.5) { float c = hz2(floor(p * 160.0)); g *= 0.65 + 0.55 * c; }
          else if (uStyle > 2.5 && uStyle < 3.5) { vec2 q = vec2(atan(p.x, p.z) * 9.0, p.y * 70.0); float c = length(fract(q) - 0.5); g *= mix(1.15, 0.5, smoothstep(0.25, 0.5, c)); }
          else if (uStyle > 3.5 && uStyle < 4.5) { if (abs(p.x - 0.032) < 0.0035 && p.z > -0.02 && p.y > 1.73) g *= 0.35; float c = hz2(floor(p * vec3(900.0, 900.0, 120.0))); g *= 0.8 + 0.3 * c; }
          else if (uStyle > 4.5) { float c = hz2(floor(p * vec3(500.0, 500.0, 60.0))); g *= 0.75 + 0.5 * c; }
          diffuseColor.rgb *= g;
          if (uTip.w > 0.5) diffuseColor.rgb = mix(diffuseColor.rgb, uTip.rgb * (0.8 + 0.3 * n), smoothstep(1.765, 1.79, p.y)); }`)},_.customProgramCacheKey=()=>"w3dhair4",_}function nt(E,S,C,_){let T=new Ot({map:E.map,normalMap:E.normalMap,normalScale:new Ze(.8,.8),roughness:_?.8:.62,metalness:0,envMapIntensity:.3}),I=Object.assign({},S,{uK:{value:C||1},uCut:{value:0}});return T.userData.u=I,T.onBeforeCompile=F=>{Object.assign(F.uniforms,I),Me(F,!1),F.vertexShader=`varying vec3 vHB;
`+F.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vHB = aB;`),F.fragmentShader=`uniform float uCut; varying vec3 vHB;
`+F.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ float ax = abs(vHB.x); if (uCut > 1.5 && ax > (vHB.y > 1.642 ? 0.046 : 0.033)) discard; if (uCut > 0.5 && uCut < 1.5 && vHB.y > 1.62 && ax > 0.055) discard; float g = dot(diffuseColor.rgb, vec3(0.333)); diffuseColor.rgb = vec3(clamp(0.35 + g * 1.05, 0.0, 1.4)) * diffuse; }`)},T.customProgramCacheKey=()=>"w3dmhair2",T}let qe=[],dt=new Map,vt=30;function at(){let E=xd(H),S={root:E,bones:{},mixer:new ra(E),act:{},w:{},id:null,lastN:-9,mod:new Map,ph:0,ex:new Rt,look:0,lookP:0,lean:0};E.traverse(_=>{_.isBone&&(S.bones[_.name]=_)});let C=S.FU=Le();S.mats=[],S.parts={},S.lockMat=new Ot({color:1118481,roughness:.9}),S.bandMat=new Ot({color:16777215,roughness:.7}),E.traverse(_=>{let T=_.geometry&&_.geometry.userData.k||1;_.isSkinnedMesh&&/^k_/.test(_.name)?((S.cloth=S.cloth||[]).push(_),_.userData.layer=_.name==="k_shirt"?1:_.name==="k_trou"?3:2):_.isSkinnedMesh&&_.material&&/Superhero/i.test(_.material.name||"")?(_.material=ce(_.material,C,T,S.bodyU),S.bodyU=S.bodyU||_.material.userData.u,S.mats.push(_.material),_.castShadow=!0,_.name==="Body_LO"?S.lo=_:(S.hi=_,S.mat=_.material)):_.isSkinnedMesh&&/^m_/.test(_.name)?(_.material=nt(_.material,C,T,_.name==="m_beard"),_.name==="m_beard"?S.mBeard=_.material:(S.mHair=S.mHair||[]).push(_.material),S.parts[_.name]=_,_.castShadow=!0,_.visible=!1):_.isSkinnedMesh&&/Hair/i.test(_.material.name||"")?(_.material=ve(_.material,C,T,!1),S.browMat=_.material):_.isSkinnedMesh&&/Eye/i.test(_.material.name||"")?(_.material=ve(_.material,C,T,!0),S.eyeMat=_.material):/^h_(bun|pony|locks|long)/.test(_.name)?(_.traverse(I=>{I.isMesh&&(I.material=S.lockMat)}),S.parts[_.name]=_):_.isSkinnedMesh&&/^h_/.test(_.name)?(_.material=S.hairMat||(S.hairMat=Ve(C,T)),S.parts[_.name]=_):_.isSkinnedMesh&&/^b_/.test(_.name)?(_.material=S.beardMat||(S.beardMat=Ve(C,T)),S.parts[_.name]=_):_.isSkinnedMesh&&/^g_/.test(_.name)&&(_.material=S.bandMat,S.parts[_.name]=_)});for(let _ of S.cloth||[])_.material=ce(S.mat||_.material,C,_.geometry.userData.k||1,S.bodyU,_.userData.layer);S.hairMat=S.hairMat||Ve(C,1),S.beardMat=S.beardMat||Ve(C,1),S.pivots=Object.values(S.parts).map(_=>_.parent).filter(_=>_&&/_pv$/.test(_.name)),S.sw={x:0,z:0,vx:0,vz:0,px:0,pz:0};for(let _ in Kd){let T=N[Kd[_]];if(!T)continue;let I=S.mixer.clipAction(T);I.play(),I.setEffectiveWeight(0),S.act[_]=I,S.w[_]=0}return S.w.idle=1,c.add(E),qe.push(S),S}function Dt(E){let S=dt.get(E);if(S)return S;let C=qe.filter(_=>!_.mh);return S=C.filter(_=>_.lastN<d.n-1).sort((_,T)=>_.lastN-T.lastN)[0],!S&&C.length<vt&&(S=at()),S||(S=C.sort((_,T)=>_.lastN-T.lastN)[0]),S.id!=null&&dt.delete(S.id),S.id=E,dt.set(E,S),S.dk=null,S.lastN=-9,S}let ee={gh:"af",ng:"af",ea:"af",za:"af2",ca:"af",fr:"mix",ar:"na",in:"sa",la:"lat",pt:"mix",es:"eu",it:"eu",tr:"na",cn:"ea",jp:"ea",kr:"ea",en:"eu",de:"eu",nl:"eu",ee:"eu"},R={af:[0,5],af2:[0,9],mix:[0,12],na:[5,10],sa:[3,9],lat:[4,11],eu:[8,13],ea:[8,12]},Q={af:["shaved","buzz","buzz","fade","fade","afro","top","twist","dread","locks","locksL","corn","corn","hawk","curl","crew","under","bleach"],straight:["shaved","buzz","crew","fade","short","short","part","quiff","slick","curl","bun","pony","long","hawk","under"],ea:["buzz","crew","short","part","quiff","slick","fade","under","bleach","short"]},q={crew:"m_buzz",short:"m_buzz",afro:"h_afro",top:"h_top",corn:"h_corn",hawk:"h_hawk",under:"h_under",curl:"h_curl",quiff:"h_quiff",part:"m_part",slick:"m_part",twist:"h_twist",dread:"h_dread",locks:"h_dread",locksL:"h_dread",bun:"m_buzz",pony:"h_slick",long:"m_long",bleach:"h_top"},V={afro:1,top:1,twist:1,dread:1,locks:1,locksL:1,bleach:1},le={lean:{h:[1.78,1.9],b:[-.6,-.25]},balanced:{h:[1.74,1.88],b:[-.2,.25]},stocky:{h:[1.72,1.84],b:[.3,.7]}},ie={face:[[-.16,.16],[-.006,.01],[-.22,.32],[-.0035,.004]],face2:[[-.005,.007],[-.05,.05],[-.004,.004],[-.007,.006]],face3:[[-.008,.008],[0,.004],[-.003,.003],[-.0055,.003]],h:[1.72,1.9],build:[-.6,.7]},w=E=>{for(let S of["face","face2","face3"])E[S]=E[S].map((C,_)=>vn(C,ie[S][_][0],ie[S][_][1]));return E.h=vn(E.h,ie.h[0],ie.h[1]),E.build=vn(E.build,ie.build[0],ie.build[1]),E};i.SAFE=ie,i.lookOf=E=>x(String(E));function x(E){return w(K(E))}function K(E){let S=fi(s.hash("look4:"+E)>>>0),C=Ke=>Ke[Math.floor(S()*Ke.length)],_=()=>S()*2-1,T=null;try{let Ke=s.lookOf&&s.lookOf(E);T=Ke&&Ke.cult}catch{}let I=ee[T]||C(["af","eu","lat","mix","na","ea"]),F=R[I],g=F[0]+Math.floor(S()*(F[1]-F[0]+1)),X=g<6,W=g>9,re=I==="eu"&&S()<.22?C(["#a07a44","#c9a55a","#6b2f1a","#7a5230"]):C(X||I==="ea"?["#0a0a0c","#0a0a0c","#121010","#17110d"]:bE.slice(0,8)),we=C(X||I==="af2"&&g<6?Q.af:I==="ea"?Q.ea:Q.straight),ge=_E[C(X?["dark","dark","dark","brown"]:W&&I!=="ea"?["brown","hazel","green","blue","blue","grey"]:["dark","brown","brown","hazel",I==="ea"?"dark":"green"])],z=I==="na"||I==="sa"?.75:I==="ea"?.35:.6,ne=S()<z?C([1,1,2,2,3,4,5,6]):0,ye=I==="af"||I==="af2"?.1:0,wt=I==="ea"?1:0;return{si:g,dark:X,light:W,grp:I,hair:re,st:we,iris:ge,beard:ne,red:W?.4+S()*.6:S()*.3,face:[_()*.16,_()*.008+.002,_()*.22+ye,_()*.003+.001-wt*.0015],face2:[_()*.005+wt*.002,_()*.05,_()*.004,_()*.004+ye*.02-wt*.003],face3:[_()*.008,S()*.0028+ye*.012,_()*.003,_()*.003-wt*.0025],...(()=>{let Ke=S(),rt=Ke<.3?"lean":Ke<.75?"balanced":"stocky",De=le[rt];return{arch:rt,h:De.h[0]+S()*(De.h[1]-De.h[0]),build:De.b[0]+S()*(De.b[1]-De.b[0])}})(),sock:C([0,0,0,1,1,1,2,3]),band:S()<.12,wrist:S()<.28?S()<.5?1:2:0,sleeves:S()<.1,untuck:S()<.72,tape:C(["#f8fafc","#f8fafc","#e2e8f0","#0b0f24"]),bandC:C(["#f8fafc","#0b0f24","#f8fafc",null]),boot:C(["#0b0f24","#0b0f24","#f8fafc","#22d3ee","#ff2d95","#facc15","#a3e635","#f97316","#a855f7"]),boot2:C(["#f8fafc","#0b0f24","#22d3ee","#ff2d95","#facc15"]),tip:C(["#e8d39a","#f2e6c4","#d9b26a"]),dance:S()<.3,left:S()<.25,sad:Math.floor(S()*3),cel:Math.floor(S()*4)}}let de=E=>Wc.get(E)||x(E),me=E=>Z(512,64,S=>{if(S.fillStyle="#000",S.fillRect(0,0,512,64),!E)return;S.fillStyle="#fff",S.textAlign="center",S.textBaseline="middle",S.font="900 54px Arial Narrow, Arial, Helvetica, sans-serif",S.lineJoin="round";let C=S.measureText(E).width,_=Math.min(1.25,470/Math.max(1,C));S.save(),S.translate(258,37),S.scale(_,1),S.globalCompositeOperation="lighter",S.strokeStyle="#0000ff",S.lineWidth=9,S.strokeText(E,0,0),S.restore(),S.save(),S.translate(256,34),S.scale(_,1),S.strokeStyle="#00ff00",S.lineWidth=10,S.strokeText(E,0,0),S.fillStyle="#ffffff",S.fillText(E,0,0),S.restore()});function xe(E,S,C,_,T){let I="";if(s.nameOf&&!/^(mgr|off4|ref|fan)/.test(String(_))){if(E.nmId!==_){E.nmId=_;try{E.nm=String(s.nameOf(_)||"").toUpperCase().slice(0,16)}catch{E.nm=""}}I=E.nm}let F=S.key+(C?"g":"o")+_+":"+T+":"+I;if(E.dk===F)return;E.dk=F;let g=E.bodyU,X=S.K,W=E.lk&&E.lkId===_?E.lk:(E.lkId=_,E.lk=de(_)),re=(ye,wt)=>g[ye].value.set(wt);re("uSkin",oo[Math.min(oo.length-1,W.si)]),re("uHair",W.hair),g.uRed.value=W.red,g.uGK.value=C?1:0,g.uShirt.value=C?S.gtex:S.tex,re("uSho",C?"#111827":X.sho),re("uSoc",C?S.g:X.soc),re("uSlv",C?S.g:X.slv),re("uCol",C?"#111827":X.col),re("uBoot",W.boot),re("uBoot2",W.boot2===W.boot?"#f8fafc":W.boot2),re("uGlove","#f8fafc"),re("uTape",W.tape===X.soc?"#f8fafc":W.tape),re("uNumC","#ffffff");let we=Math.max(0,Math.min(99,Math.floor(+T)||0)),ge=T==null||T==="";g.uNum.value.set(ge?-1:we>=10?Math.floor(we/10):-1,ge?-1:we%10),E.nameTex||(E.nameTex=ue(me(""),!1),g.uName.value=E.nameTex),E.nameTxt!==I&&(E.nameTxt=I,E.nameTex.image=me(I),E.nameTex.needsUpdate=!0),g.uBody.value.set(W.build,1,!C&&W.untuck?1:0,!C&&W.sleeves?1:0),g.uGear.value.set(W.sock,W.trou||0,C?0:W.wrist,I?1:0),E.hgt=Math.min(1.92,W.h+(C?.04:0))/1.81,E.FU.uFace.value.fromArray(W.face),E.FU.uFace2.value.fromArray(W.face2),E.FU.uFace3.value.fromArray(W.face3),E.eyeMat&&E.eyeMat.userData.u.uIris.value.set(W.iris);let z=E.hstyle=W.st;g.uHairS.value=z==="shaved"?0:z==="fade"?2:z==="hawk"||z==="under"?3:z==="buzz"?4:1;for(let ye in E.parts)E.parts[ye].visible=!1;let ne=ye=>{E.parts[ye]&&(E.parts[ye].visible=!0)};ne(q[z]),z==="bun"&&ne("h_bun"),z==="pony"&&ne("h_pony"),z==="locks"&&ne("h_locksS"),z==="locksL"&&ne("h_locksL"),E.hairMat.userData.u.uStyle.value=z==="corn"?1:z==="afro"||z==="curl"?2:z==="twist"||z==="dread"||z==="locks"||z==="locksL"?3:z==="part"?4:z==="slick"||z==="long"||z==="pony"?5:0,E.hairMat.userData.u.uTip.value.set(...new We(W.tip).toArray(),z==="bleach"?1:0);for(let ye of E.mHair||[])ye.color.set(W.hair);E.mBeard&&E.mBeard.color.set(W.hair).multiplyScalar(.9),E.hairMat.color.set(W.hair),E.lockMat.color.set(W.hair),E.beardMat.color.set(W.hair).multiplyScalar(.95),E.browMat&&E.browMat.color.set(W.hair).lerp(new We(oo[Math.min(oo.length-1,W.si)]),.25),g.uBeard.value=W.beard,E.beardMat.userData.u.uStyle.value=2,(W.beard===5||W.beard===2||W.beard===3||W.beard===6)&&(ne("m_beard"),E.mBeard&&(E.mBeard.userData.u.uCut.value=W.beard===5?0:W.beard===2?1:2)),W.band&&!C&&(ne(V[z]?"g_bandX":q[z]?"g_band":"g_band0"),E.bandMat.color.set(W.bandC||X.c1)),E.style=W}let Ne=new $e,Re=new $e,Oe=new $e,je=new zi,Et=new zi,Ce=new zi,Ht=new zi,Mt=(E,S)=>{E.mod.has(S)||E.mod.set(S,S.quaternion.clone())};function Ee(E,S,C,_,T){let I=E.bones[S],F=E.bones[C];!I||!F||T<=.001||(Mt(E,I),I.updateWorldMatrix(!0,!1),F.updateWorldMatrix(!1,!1),Ne.setFromMatrixPosition(I.matrixWorld),Re.setFromMatrixPosition(F.matrixWorld).sub(Ne).normalize(),Oe.copy(_).normalize().applyQuaternion(E.root.quaternion),je.setFromUnitVectors(Re,Oe),T<1&&je.copy(Ht.identity().slerp(je,T)),I.parent.getWorldQuaternion(Ce),Et.copy(Ce).invert().multiply(je).multiply(Ce),I.quaternion.premultiply(Et))}function Ue(E,S,C,_){let T=E.bones[S];!T||!_||(Mt(E,T),T.updateWorldMatrix(!0,!1),Oe.copy(C).applyQuaternion(E.root.quaternion),je.setFromAxisAngle(Oe,_),T.parent.getWorldQuaternion(Ce),Et.copy(Ce).invert().multiply(je).multiply(Ce),T.quaternion.premultiply(Et))}let Pe=new $e(1,0,0),lt=new $e(0,1,0),Te=(E,S,C)=>new $e(E,S,C),Xt={wind:[Te(0,-.8,-.6),Te(0,-.15,-1)],hit:[Te(0,-.4,.92),Te(0,-.3,1)]};i.fig=function(E,S,C,_,T,I){if(!E||!E._b3||!P)return;I=I||{},C=String(C);let F=v&&v.ok&&v.isPlayer(C),g=F?v.getChar(C):Dt(C),X=g.lastN<d.n-1;g.lastN=d.n,M.add(g.root);let W=I.num;if(W==null){if(g.numId!==C){g.numId=C;try{g.num=s.numOf(C)}catch{g.num=null}}W=g.num}if(F){let ae="";if(s.nameOf&&!/^(ref|off4|mgr)/.test(C)){if(g.nmId!==C){g.nmId=C;try{g.nm=String(s.nameOf(C)||"").toUpperCase().slice(0,16)}catch{g.nm=""}}ae=g.nm}g.lkId!==C&&(g.lkId=C,g.lk=de(C)),v.dress(g,E,S,C,W,g.lk,ae)}else xe(g,E,S,C,W);g.gls&&(g.gls.visible=!!(g.style&&g.style.mgr&&g.style.gl));let re=d.dt;if(X){g.px=_,g.pz=T,g.spd=0,g.kickT=-1,g.pk=0;for(let ae in g.w)g.w[ae]=0;g.w.idle=1}{let ae=_-g.px,Ie=T-g.pz;!X&&ae*ae+Ie*Ie>6.25&&(g.px=_,g.pz=T,g.spd=0)}let we=_-g.px,ge=T-g.pz,z=re>0?Math.sqrt(we*we+ge*ge)/re:0;g.px=_,g.pz=T,g.spd+=(Math.min(z,11)-g.spd)*Math.min(1,re*6);let ne=I.dive||0,ye=Math.min(g.spd,(I.run==null?1:I.run)*6.5+.35),wt=I.kick||0;if(g.mh&&v&&v.has&&!I.mhClip&&!ne&&ye<.35&&/^(ref|off4|mgr)/.test(C)&&!I.cel&&!I.arms&&v.has("Idle_Loop")&&(I.mhClip={name:"Idle_Loop",t:d.now/1e3+s.hash(C)%7,loop:1}),ne&&g.mh&&v&&v.has&&!I.mhClip){let ae="MX_GK_Dive"+(g.lk&&g.lk.h>1.86?"2":"")+"_"+(ne>0?"R":"L"),Ie=v.has(ae)?ae:"MX_GK_Dive_"+(ne>0?"R":"L");v.has(Ie)&&(I.mhClip={name:Ie,t:.12+Math.min(1,Math.abs(ne))*.95},I._mxDive=1,ne=0)}let Ke=ne||I.header?null:I.cel||(I.jump>.001?"jump":I.arms==="up"?"arms":null),rt=I.header&&I.jump||0,De=!!Ke,At=!De&&!ne&&!I.hands&&(I.lean||0)>.2,It=0,Je=0,mt=0;if(De&&!g.mh&&Ke!=="arms"&&ye<2.2){g.hopP==null&&(g.hopP=.95+s.hash(C)%5*.09,g.hopT=s.hash(C)%7*.13),g.hopT+=re;let ae=g.hopT%g.hopP;if(ae<.14)It=-.07*Math.sin(ae/.14*Math.PI/2),mt=ae/.14;else if(ae<.66){let Ie=(ae-.14)/.52;It=1.32*Ie*(1-Ie),Je=1}else if(ae<.78){let Ie=(ae-.66)/.12;It=-.08*Math.sin(Ie*Math.PI),mt=1-Ie}}let pt=wt>0&&g.pk<=0,Nt=!!I.slide&&!g.psl;g.psl=!!I.slide,wt>0&&g.pk<=0&&(g.kickT=0),g.pk=wt,g.kickT>=0&&(g.kickT+=re,g.kickT>.6&&(g.kickT=-1));let Se={idle:0,walk:0,jog:0,sprint:0,dance:0,air:0,crouch:0,talk:0};if(ne)Se.air=1;else if(De&&Ke==="jump"&&g.style.dance&&ye<1.5)Se.dance=1;else if(Je||mt)Se.air=Je,Se.crouch=mt*.6,Se.idle=1-Je-mt*.6;else{let ae=1-ft(.25,1,ye);Se.walk=ft(.25,1,ye)*(1-ft(1.8,3,ye)),Se.jog=ft(1.8,3,ye)*(1-ft(4.8,6.2,ye)),Se.sprint=ft(4.8,6.2,ye),S&&!De&&!At&&Qt&&Dn>=d.n-1?(Se.crouch=ae*.6,Se.idle=ae*.4):Se.idle=ae}let _e=0,st=Math.min(1,re*(Je||mt?16:7));for(let ae in g.act)g.w[ae]+=((Se[ae]||0)-g.w[ae])*st,g.w[ae]<.002&&(g.w[ae]=0),_e+=g.w[ae];_e<.01&&(g.w.idle=1,_e=1);for(let ae in g.act)g.act[ae].setEffectiveWeight(g.w[ae]/_e);{let ae=g.mh&&v&&v.loco,Ie=ae?ae.sd:{walk:2,jog:3.4,sprint:4.4},Xe=g.w.walk+g.w.jog+g.w.sprint,Gt=Xe>.01?(g.w.walk*Ie.walk+g.w.jog*Ie.jog+g.w.sprint*Ie.sprint)/Xe:Ie.walk,en=vn(Math.max(ye,.9)/Gt,.55,1.75);g.ph=(g.ph+re*en)%1;let on=ae?ae.p0:{walk:0,jog:0,sprint:.05};for(let An of["walk","jog","sprint"]){let tn=g.act[An];tn&&(tn.timeScale=0,tn.time=(g.ph+on[An])%1*tn.getClip().duration)}}g.mh&&(I._cel=De&&!(Ke==="jump"&&g.style.dance)?Ke:null,I._csp=ye,v.pre(g,I,re,pt&&!ne,Nt));for(let[ae,Ie]of g.mod)ae.quaternion.copy(Ie);g.mod.clear(),g.mixer.update(re);let Tt=I.yaw==null?g.yaw||0:I.yaw;(X||g.yaw==null)&&(g.yaw=Tt);let Kt=Tt-g.yaw;for(;Kt>Math.PI;)Kt-=2*Math.PI;for(;Kt<-Math.PI;)Kt+=2*Math.PI;let Mn=1-Math.exp(-re*(ne||g.kickT>=0?18:11)),In=Kt*Mn;g.yaw+=In;let dn=g.yaw,Ci=re>0?In/re:0;if(g.lean+=(vn(-Ci*ye*.035,-.22,.22)-g.lean)*Math.min(1,re*6),g.root.position.set(_,(I.header?rt*.95:0)+It+Math.abs(ne)*.45+(I.y||0),T),g.root.rotation.set(ft(4.5,7,ye)*.05,dn,ne*1.25+(ne?0:g.lean),"YXZ"),g.root.scale.setScalar(Qc*(g.hgt||1)),g.root.updateMatrixWorld(!0),g.kickT>=0&&!ne&&!g.mh){let ae=g.kickT,Ie=g.style.left,Xe=Ie?"_l":"_r",Gt=Ie?"_r":"_l",en=ae<.3?1:1-(ae-.3)/.3,on=ft(.14,.28,ae),An=Xt.wind[0].clone().lerp(Xt.hit[0],on),tn=Xt.wind[1].clone().lerp(Xt.hit[1],on);Ue(g,"spine_01",Pe,-.18*en),Ee(g,"thigh"+Xe,"calf"+Xe,An,en),Ee(g,"calf"+Xe,"foot"+Xe,tn,en),Ee(g,"thigh"+Gt,"calf"+Gt,Te(0,-1,.12),en*.6),Ee(g,"upperarm"+Gt,"lowerarm"+Gt,Te(Ie?-1:1,-.15,.35),en*.8),Ee(g,"upperarm"+Xe,"lowerarm"+Xe,Te(Ie?1:-1,-.4,-.3),en*.6)}if(ne){let ae=Math.min(1,Math.abs(ne)*1.6);Ee(g,"upperarm_l","lowerarm_l",Te(.25,1,.2),ae),Ee(g,"lowerarm_l","hand_l",Te(.15,1,.25),ae),Ee(g,"upperarm_r","lowerarm_r",Te(-.25,1,.2),ae),Ee(g,"lowerarm_r","hand_r",Te(-.15,1,.25),ae),Ee(g,"thigh_l","calf_l",Te(.15,-1,0),ae),Ee(g,"thigh_r","calf_r",Te(-.15,-1,0),ae),Ee(g,"calf_l","foot_l",Te(.15,-1,0),ae),Ee(g,"calf_r","foot_r",Te(-.15,-1,0),ae)}{let ae=De&&!ne&&!(Ke==="jump"&&g.style.dance&&ye<1.5)?1-(g.mh&&g.shotW||0):0;g.armW=(g.armW||0)+(ae-(g.armW||0))*Math.min(1,re*7),X&&(g.armW=ae);let Ie=!De&&!ne&&(At||I.hands)?1:0;Ie&&(g.sadV=I.hands?1:g.style.sad||0),g.sadW=(g.sadW||0)+(Ie-(g.sadW||0))*Math.min(1,re*5),X&&(g.sadW=Ie)}if(!ne&&g.armW>.01){let ae=Math.sin(d.now/210+s.hash(C)%7),Ie=g.armW,Xe=Ke==="arms"?Math.max(0,Math.sin(d.now/160+s.hash(C)%5))*.35:0;Ee(g,"upperarm_l","lowerarm_l",Te(.5,1,.1+ae*.1),Ie),Ee(g,"lowerarm_l","hand_l",Te(.3,1-Xe,.1+Xe),Ie),Ee(g,"upperarm_r","lowerarm_r",Te(-.5,1,.1-ae*.1),Ie),Ee(g,"lowerarm_r","hand_r",Te(-.3,1-Xe,.1+Xe),Ie),Ue(g,"Head",Pe,-.25*Ie)}else if(!ne&&g.sadW>.01){let ae=g.sadV||0,Ie=g.sadW;if(ae===1){let Xe=Ie*(I.hands?Math.min(1,I.hands*2):1);Ee(g,"upperarm_l","lowerarm_l",Te(.75,.75,.15),Xe),Ee(g,"lowerarm_l","hand_l",Te(-.9,.35,-.1),Xe),Ee(g,"upperarm_r","lowerarm_r",Te(-.75,.75,.15),Xe),Ee(g,"lowerarm_r","hand_r",Te(.9,.35,-.1),Xe),Ue(g,"Head",Pe,(I.hands?-.15:.3)*Ie),Ue(g,"spine_03",Pe,(I.hands?-.08:.1)*Ie)}else ae===2?(Ee(g,"upperarm_l","lowerarm_l",Te(.6,-.65,-.45),Ie),Ee(g,"lowerarm_l","hand_l",Te(-.45,-.6,.25),Ie),Ee(g,"upperarm_r","lowerarm_r",Te(-.6,-.65,-.45),Ie),Ee(g,"lowerarm_r","hand_r",Te(.45,-.6,.25),Ie),Ue(g,"Head",Pe,.35*Ie),Ue(g,"spine_02",Pe,.12*Ie)):(Ue(g,"spine_02",Pe,.22*Ie),Ue(g,"spine_03",Pe,.12*Ie),Ue(g,"Head",Pe,.45*Ie))}if(I.yell&&!ne&&!De){let ae=Math.sin(d.now/140+s.hash(C)%5),Ie=g.style.left?1:-1,Xe=Ie>0?"_l":"_r",Gt=Ie>0?"_r":"_l";Ee(g,"upperarm"+Xe,"lowerarm"+Xe,Te(Ie*.35,.35+ae*.2,1),1),Ee(g,"lowerarm"+Xe,"hand"+Xe,Te(Ie*.2,.25+ae*.3,1),1),Ee(g,"upperarm"+Gt,"lowerarm"+Gt,Te(-Ie*.8,-.35,.35),.8),Ue(g,"Head",Pe,-.12)}if(I.throwIn!=null&&I.throwIn!==!1&&I.throwIn!==void 0){let ae=I.throwIn>.05?1-I.throwIn:0;for(let[Ie,Xe]of[["_l",1],["_r",-1]])Ee(g,"upperarm"+Ie,"lowerarm"+Ie,Te(Xe*.15,1,-.35+ae*1.3),1),Ee(g,"lowerarm"+Ie,"hand"+Ie,Te(Xe*.05,.6-ae*.4,-1+ae*2),1);Ue(g,"spine_01",Pe,-.25+ae*.45)}if(I.wall){for(let[ae,Ie]of[["_l",1],["_r",-1]])Ee(g,"upperarm"+ae,"lowerarm"+ae,Te(Ie*.2,-1,.35),1),Ee(g,"lowerarm"+ae,"hand"+ae,Te(-Ie*.7,-.4,.6),1);Ue(g,"Head",Pe,-.1)}if(I.slide&&!g.mh){g.root.position.y-=.58,g.root.updateMatrixWorld(!0),Ue(g,"spine_01",Pe,-.85);let ae=g.style.left?"_l":"_r",Ie=g.style.left?"_r":"_l";Ee(g,"thigh"+ae,"calf"+ae,Te(0,-.12,1),1),Ee(g,"calf"+ae,"foot"+ae,Te(0,-.1,1),1),Ee(g,"thigh"+Ie,"calf"+Ie,Te(0,-.35,.9),1),Ee(g,"calf"+Ie,"foot"+Ie,Te(0,-1,-.2),1),Ee(g,"upperarm_l","lowerarm_l",Te(.7,-.6,-.4),1),Ee(g,"upperarm_r","lowerarm_r",Te(-.7,-.6,-.4),1)}if(I.header&&(Ue(g,"spine_02",Pe,.18),Ue(g,"Head",Pe,.35),Ee(g,"upperarm_l","lowerarm_l",Te(.9,.2,.2),1),Ee(g,"upperarm_r","lowerarm_r",Te(-.9,.2,.2),1)),I.catch){Ue(g,"spine_01",Pe,.25);for(let[ae,Ie]of[["_l",1],["_r",-1]])Ee(g,"upperarm"+ae,"lowerarm"+ae,Te(Ie*.25,-.15,1),1),Ee(g,"lowerarm"+ae,"hand"+ae,Te(-Ie*.25,.25,1),1)}if(I.card&&!ne&&(Ee(g,"upperarm_r","lowerarm_r",Te(-.18,1,.12),1),Ee(g,"lowerarm_r","hand_r",Te(-.08,1,.1),1),Ee(g,"upperarm_l","lowerarm_l",Te(.35,-.9,.2),.7),Ue(g,"Head",Pe,-.08)),I.flag){let ae=I.flag.up||0,Ie=I.flag.side||-1,Xe=Ie>0?"_l":"_r";Ee(g,"upperarm"+Xe,"lowerarm"+Xe,Te(Ie*(1-ae*.8),.15+ae*.9,.25),1),Ee(g,"lowerarm"+Xe,"hand"+Xe,Te(Ie*(1-ae*.8),.2+ae*.9,.25),1)}if(I.point&&!ne&&(Ee(g,"upperarm_r","lowerarm_r",Te(-.25,.1,1),1),Ee(g,"lowerarm_r","hand_r",Te(-.2,.05,1),1)),I.shake&&!ne&&(Ee(g,"upperarm_r","lowerarm_r",Te(-.15,-.55,.85),1),Ee(g,"lowerarm_r","hand_r",Te(-.25,.05+Math.sin(d.now/90)*.08,1),1)),I.clap&&!ne){let ae=Math.abs(Math.sin(d.now/115+s.hash(C)%5));for(let[Ie,Xe]of[["_l",1],["_r",-1]])Ee(g,"upperarm"+Ie,"lowerarm"+Ie,Te(Xe*.2,-.45,.85),1),Ee(g,"lowerarm"+Ie,"hand"+Ie,Te(-Xe*(.25+ae*.55),.35,.8),1)}if(I.wave&&!ne){let ae=Math.sin(d.now/160+s.hash(C)%5);Ee(g,"upperarm_r","lowerarm_r",Te(-.55,.85,.15),1),Ee(g,"lowerarm_r","hand_r",Te(-.25+ae*.35,1,.1),1)}for(let ae of["_l","_r"]){let Ie=g.bones["thigh"+ae],Xe=g.bones["calf"+ae],Gt=g.bones["foot"+ae];if(!Ie||!Xe||!Gt)continue;Ie.updateWorldMatrix(!0,!0),Ne.setFromMatrixPosition(Ie.matrixWorld),Re.setFromMatrixPosition(Xe.matrixWorld),Oe.setFromMatrixPosition(Gt.matrixWorld);let en=Re.clone().sub(Ne).normalize(),on=Oe.clone().sub(Re).normalize(),An=Math.acos(vn(en.dot(on),-1,1)),tn=new $e().crossVectors(en,on).dot(new $e(1,0,0).applyQuaternion(g.root.quaternion));tn<0&&An>.1?Ue(g,"calf"+ae,Pe,An-.1):An>2.6&&Ue(g,"calf"+ae,Pe,-(An-2.6)*Math.sign(tn||1))}{let ae=0,Ie=0;if(Qt&&Dn>=d.n-1&&!ne&&!De&&g.kickT<0){let Gt=Qt.x-_,en=Qt.z-T,on=Math.sqrt(Gt*Gt+en*en);if(on>.3&&on<45){let An=Math.atan2(Gt,en)-dn;for(;An>Math.PI;)An-=2*Math.PI;for(;An<-Math.PI;)An+=2*Math.PI;ae=vn(An,-1.1,1.1),Ie=vn(Math.atan2(1.7-Qt.y,on)*.6,-.2,.55)}}let Xe=Math.min(1,re*5);g.look+=(ae-g.look)*Xe,g.lookP+=(Ie-g.lookP)*Xe,Ue(g,"neck_01",lt,g.look*.35),Ue(g,"Head",lt,g.look*.55),Ue(g,"Head",Pe,g.lookP*(At?0:1))}{let ae=g.ex,Ie=I.fierce||I.wall||I.slide||I.header,Xe=I.yell?[.8,0,1,0]:I.hands?[0,0,.55,.9]:At?[.2,0,0,1]:De?g.w.dance>.5?[0,1,.15,0]:[.1,.45,.95,0]:Ie?[1,0,.45,0]:ne||g.kickT>=0?[1,0,.35,0]:ye>4.5?[.8,0,.1,0]:[.3,.06,0,0],Gt=Math.min(1,re*4);ae.set(ae.x+(Xe[0]-ae.x)*Gt,ae.y+(Xe[1]-ae.y)*Gt,ae.z+(Xe[2]-ae.z)*Gt,ae.w+(Xe[3]-ae.w)*Gt),g.FU.uExpr.value.copy(ae)}if(e==="high"&&g.pivots.length&&re>0){let ae=g.sw,Ie=(_-ae.px)/re,Xe=(T-ae.pz)/re;ae.px=_,ae.pz=T;let Gt=Math.cos(g.yaw),en=Math.sin(g.yaw),on=vn(Ie*en+Xe*Gt,-9,9),An=vn(Ie*Gt-Xe*en,-9,9),tn=vn(on*.07+(Je||rt?-.25:0),-.6,.6),di=vn(-An*.06+g.lean*.8,-.5,.5);ae.vx+=((tn-ae.x)*40-ae.vx*7)*re,ae.vz+=((di-ae.z)*40-ae.vz*7)*re,ae.x+=ae.vx*re,ae.z+=ae.vz*re,X&&(ae.x=ae.z=ae.vx=ae.vz=0);for(let $t of g.pivots)$t.rotation.x=ae.x,$t.rotation.z=ae.z}g.mh&&v.post(g),(I.card||I.flag)&&Ge(g,I),g.dist=l.position.distanceTo(g.root.position)};let Ye={},Be=new $e,U=new zi;function Qe(E){if(Ye[E])return Ye[E];let S;if(E==="y"||E==="r")S=new ze(new un(.095,.13,.005),new Ot({color:E==="y"?16436245:15672124,roughness:.35,emissive:E==="y"?3813120:3801096}));else{S=new Pn;let C=new ze(new li(.008,.008,.5,6),new Ot({color:1120295}));C.position.y=.2,S.add(C);let _=new ze(new ei(.34,.26),new Ot({map:ue(Z(64,48,T=>{for(let I=0;I<4;I++)for(let F=0;F<3;F++)T.fillStyle=(I+F)%2?"#facc15":"#ef233c",T.fillRect(I*16,F*16,16,16)})),side:Sn,roughness:.8}));_.position.set(.17,.32,0),S.add(_)}return c.add(S),Ye[E]=S}function Ge(E,S){let C=E.bones&&(E.bones.hand_r||E.bones.hand_l);if(!C)return;let _=S.card?S.card==="r"?"r":"y":"f",T=Qe(_);M.add(T);let I=S.flag&&(S.flag.side||-1)>0&&E.bones.hand_l||C;I.updateWorldMatrix(!0,!1),I.getWorldPosition(Be),I.getWorldQuaternion(U),T.position.copy(Be),_==="f"?(T.quaternion.copy(U),T.position.y+=.02):(T.position.y+=.15,T.rotation.set(0,E.yaw||0,0))}let ot=null;i.coin=function(E,S,C,_){P&&(ot||(ot=new ze(new li(.06,.06,.008,24),new Ot({color:15254618,metalness:.9,roughness:.25})),c.add(ot)),M.add(ot),ot.position.set(E,S,C),ot.rotation.set(_,0,0))};let it=null,Vt=null,Wt=null,Yt=null,Kn=()=>it||(it=(()=>{let E=ue(Z(256,128,C=>{C.fillStyle="#f8fafc",C.fillRect(0,0,256,128),C.fillStyle="#0b0f24",[[32,20],[96,20],[160,20],[224,20],[0,64],[64,64],[128,64],[192,64],[256,64],[32,108],[96,108],[160,108],[224,108]].forEach(([_,T])=>{C.beginPath();for(let I=0;I<5;I++){let F=-Math.PI/2+I*1.2566;C.lineTo(_+Math.cos(F)*14,T+Math.sin(F)*12)}C.fill()}),C.strokeStyle="rgba(15,23,42,.35)",C.lineWidth=1.2;for(let _=0;_<256;_+=32)C.beginPath(),C.moveTo(_,0),C.lineTo(_+16,128),C.stroke()})),S=new ze(new Rs(eu,24,16),new Ot({map:E,roughness:.38,envMapIntensity:.8}));return S.castShadow=!0,c.add(S),S})()),Qt=null,Dn=-9;i.ball=function(E,S,C,_){if(!P)return;let T=Kn();Xd(),M.add(T),Dn=d.n,Qt=Qt||new $e,Qt.set(E,eu+(C||0)*1.6,S),T.position.set(E,eu+(C||0)*1.6,S),T.rotation.set((_||0)*1.3,_||0,0)},i.trophy=function(E,S,C,_,T){if(!Vt){let I=new Pn,F=new Ot({color:16106818,metalness:1,roughness:.2,envMapIntensity:1.6}),g=[[0,0],[.32,0],[.32,.08],[.12,.14],[.08,.42],[.14,.5],[.34,.62],[.42,.95],[.4,1.02],[0,1.02]].map(([re,we])=>new Ze(re,we)),X=new ze(new _c(g,40),F);X.material.side=Sn,I.add(X),[-1,1].forEach(re=>{let we=new ze(new na(.17,.035,8,20,Math.PI*1.15),F);we.position.set(re*.42,.78,0),we.rotation.z=re>0?-Math.PI*.55:Math.PI*1.55,I.add(we)});let W=new ze(new li(.36,.4,.22,24),new Ot({color:724772,roughness:.4}));W.position.y=-.11,I.add(W),I.traverse(re=>{re.isMesh&&(re.castShadow=!0)}),Vt=I,c.add(I)}M.add(Vt),Vt.position.set(E,S*.86,C),Vt.rotation.set(0,_||0,0),Vt.scale.setScalar(T||1)},i.floor=function(){Wt||(Wt=new ze(new li(1.15,1.2,.1,48),new Ot({color:1976635,roughness:.55,metalness:.2})),Wt.position.y=-.05,Wt.receiveShadow=!0,c.add(Wt)),M.add(Wt)};let ui=600;i.particles=function(E,S){Yt||(Yt=new vi(new un(1,1,1),new rn({toneMapped:!1}),ui),Yt.frustumCulled=!1,Yt.setColorAt(0,new We),c.add(Yt));let C=[],_=new ct,T=new zi,I=new Yr,F=new $e,g=new $e,X=new We;for(let W of E)if(W.vy-=9.8*S*(W.g==null?.25:W.g),W.x+=W.vx*S,W.y+=W.vy*S,W.z+=W.vz*S,W.life-=S,W.rot=(W.rot||0)+S*6,W.life>0&&W.y>0){C.push(W);let re=C.length-1;if(re>=ui)continue;let we=W.s||.25;_.compose(g.set(W.x,W.y,W.z),T.setFromEuler(I.set(W.rot*.7,W.rot,0)),F.set(we,.02+we*.1,we*.6)),Yt.setMatrixAt(re,_);let ge=W.c;X.setRGB(ge[0],ge[1],ge[2],Pt),Yt.setColorAt(re,X)}return Yt.count=Math.min(ui,C.length),Yt.instanceMatrix.needsUpdate=!0,Yt.instanceColor&&(Yt.instanceColor.needsUpdate=!0),M.add(Yt),C};function As(){let E=[],S=[],C=[],_=new We,T=(I,F,g,X,W,re)=>{[I,F,g,I,g,X].forEach(we=>{E.push(we[0],we[1],we[2]),S.push(W[0],W[1],W[2]),C.push(re.r,re.g,re.b)})};return{box(I,F,g,X,W,re,we){_.set(X);let ge=I/2,z=F/2,ne=g/2,ye=(wt,Ke,rt)=>[W+wt,re+Ke,we+rt];T(ye(-ge,-z,ne),ye(ge,-z,ne),ye(ge,z,ne),ye(-ge,z,ne),[0,0,1],_),T(ye(ge,-z,-ne),ye(-ge,-z,-ne),ye(-ge,z,-ne),ye(ge,z,-ne),[0,0,-1],_),T(ye(ge,-z,ne),ye(ge,-z,-ne),ye(ge,z,-ne),ye(ge,z,ne),[1,0,0],_),T(ye(-ge,-z,-ne),ye(-ge,-z,ne),ye(-ge,z,ne),ye(-ge,z,-ne),[-1,0,0],_),T(ye(-ge,z,ne),ye(ge,z,ne),ye(ge,z,-ne),ye(-ge,z,-ne),[0,1,0],_),T(ye(-ge,-z,-ne),ye(ge,-z,-ne),ye(ge,-z,ne),ye(-ge,-z,ne),[0,-1,0],_)},geo(){let I=new an;return I.setAttribute("position",new Ut(E,3)),I.setAttribute("normal",new Ut(S,3)),I.setAttribute("color",new Ut(C,3)),I}}}let fi=E=>{let S=E>>>0||1;return()=>(S^=S<<13,S>>>=0,S^=S>>>17,S^=S<<5,S>>>=0,S/4294967296)},ps=null,Si=null,mi=null,lr=null,ua=()=>ps||(ps=(()=>{let S=ue(Z(1920,1344,C=>{for(let F=-1;F<16;F++)C.fillStyle=F%2?"#2f8a3d":"#287d36",C.fillRect((7.5+F*7.5)*16,0,120,1344);let _=fi(7);for(let F=0;F<26e3;F++){let g=_();C.fillStyle=g<.5?"rgba(0,0,0,.06)":"rgba(255,255,255,.05)",C.fillRect(_()*1920,_()*1344,2+_()*3,1+_()*2)}let T=F=>(F+60)*16,I=F=>(F+42)*16;C.strokeStyle="rgba(255,255,255,.92)",C.lineWidth=2.6,C.strokeRect(T(-52.5),I(-34),1680,1088),C.beginPath(),C.moveTo(T(0),I(-34)),C.lineTo(T(0),I(34)),C.stroke(),C.beginPath(),C.arc(T(0),I(0),146.4,0,7),C.stroke(),[-1,1].forEach(F=>{let g=F*52.5;C.strokeRect(Math.min(T(g),T(g-F*16.5)),I(-20.16),264,645.12),C.strokeRect(Math.min(T(g),T(g-F*5.5)),I(-9.16),88,293.12),C.beginPath(),C.arc(T(g-F*11),I(0),146.4,F>0?Math.PI-.93:-.93,F>0?Math.PI+.93:.93),C.stroke(),C.fillStyle="#fff",C.beginPath(),C.arc(T(g-F*11),I(0),3,0,7),C.fill(),[-34,34].forEach(X=>{C.beginPath(),C.arc(T(g),I(X),16,0,7),C.stroke()})}),C.fillStyle="#fff",C.beginPath(),C.arc(T(0),I(0),3.2,0,7),C.fill(),C.setLineDash([10,8]),C.lineWidth=2,C.strokeStyle="rgba(255,255,255,.7)",[-1,1].forEach(F=>{C.strokeRect(Math.min(T(F*4.5),T(F*14.5)),I(-37.6),160,41.6)}),C.setLineDash([])}));return S.anisotropy=t?2:8,S})()),fa=(E,S)=>ue(Z(1024,64,C=>{let _=C.createLinearGradient(0,0,1024,0);_.addColorStop(0,"#22d3ee"),_.addColorStop(.5,"#a855f7"),_.addColorStop(1,"#ff2d95"),C.fillStyle="#070b18",C.fillRect(0,0,1024,64),C.fillStyle=_,C.fillRect(0,0,1024,5),C.fillRect(0,59,1024,5),C.font="900 36px Arial, Helvetica, sans-serif",C.textBaseline="middle",["SINLESS GG","11 WONDERS","SINLESS GG","11 WONDERS"].forEach((T,I)=>{C.fillStyle=[E,"#ffffff",S,"#22d3ee"][I],C.fillText(T,20+I*256,34)})}),!0,!0),Gc=()=>ue(Z(64,64,E=>{E.clearRect(0,0,64,64),E.strokeStyle="rgba(255,255,255,.9)",E.lineWidth=3,E.strokeRect(0,0,64,64)}),!0,!0),Hc=()=>ue(Z(64,64,E=>{let S=E.createRadialGradient(32,32,0,32,32,32);S.addColorStop(0,"rgba(255,250,230,1)"),S.addColorStop(.25,"rgba(255,240,200,.55)"),S.addColorStop(1,"rgba(255,240,200,0)"),E.fillStyle=S,E.fillRect(0,0,64,64)})),L=()=>Si||(Si=(()=>{let E=(C,_,T)=>({value:new We(C,_,T)}),S=new ze(new Rs(460,32,16),new $n({side:Fn,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new $e(.012,.016,.05)},uMid:{value:new $e(.06,.03,.16)},uHor:{value:new $e(.24,.1,.32)},uStars:{value:1},uCloud:{value:0},uSun:{value:new $e(0,1,0)},uSunC:E(0,0,0),uT:{value:0},uFlash:{value:0}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform vec3 uTop, uMid, uHor, uSun, uSunC; uniform float uStars, uCloud, uT, uFlash; varying vec3 vD; float h(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(mix(h(i), h(i + vec3(1,0,0)), f.x), mix(h(i + vec3(0,1,0)), h(i + vec3(1,1,0)), f.x), f.y), mix(mix(h(i + vec3(0,0,1)), h(i + vec3(1,0,1)), f.x), mix(h(i + vec3(0,1,1)), h(i + vec3(1,1,1)), f.x), f.y), f.z); }void main(){ float y = vD.y; vec3 c = mix(uHor, uMid, smoothstep(0.0, 0.18, y)); c = mix(c, uTop, smoothstep(0.18, 0.7, y)); vec3 q = floor(vD * 260.0); float s = step(0.9975, h(q)) * smoothstep(0.08, 0.4, y); c += vec3(s * 0.9 * uStars);float sd = max(dot(vD, normalize(uSun)), 0.0); c += uSunC * (pow(sd, 380.0) * 3.0 + pow(sd, 10.0) * 0.3) * (1.0 - uCloud * 0.85);if (uCloud > 0.01) { vec3 p = vD * 3.2 + vec3(uT * 0.012, 0.0, uT * 0.007); float cl = n3(p) * 0.6 + n3(p * 2.1) * 0.3 + n3(p * 4.3) * 0.1; float cov = smoothstep(1.0 - uCloud, 1.08 - uCloud * 0.5, cl) * smoothstep(-0.02, 0.16, y);vec3 cc = mix(uHor, vec3(dot(uMid, vec3(0.333))) * 1.25 + uSunC * 0.06, 0.6); c = mix(c, cc, cov * 0.9); } c += vec3(uFlash); gl_FragColor = vec4(c, 1.0); }"}));return S.frustumCulled=!1,S.renderOrder=-1,S})()),j=null,oe=null;function he(){let E=new Pn;E.userData.keep=1;let S=ue(Z(256,256,Je=>{Je.fillStyle="#3d5a2e",Je.fillRect(0,0,256,256);let mt=fi(4242);for(let pt=0;pt<2600;pt++){let Nt=mt();Je.fillStyle=Nt<.5?"rgba(84,118,58,.45)":Nt<.8?"rgba(44,66,32,.45)":"rgba(110,128,70,.35)",Je.fillRect(mt()*256,mt()*256,2+mt()*5,2+mt()*5)}}),!0,!0);S.repeat.set(70,70);let C=new ze(new ja(900,48),new Mi({map:S,color:12108968}));C.rotation.x=-Math.PI/2,C.position.y=-.06,E.add(C);let _=ue(Z(128,128,Je=>{Je.fillStyle="#7b8190",Je.fillRect(0,0,128,128);let mt=fi(77);for(let pt=0;pt<900;pt++)Je.fillStyle=mt()<.5?"rgba(255,255,255,.06)":"rgba(0,0,0,.08)",Je.fillRect(mt()*128,mt()*128,2,2);Je.strokeStyle="rgba(30,35,45,.35)",Je.lineWidth=2;for(let pt=0;pt<=128;pt+=32)Je.beginPath(),Je.moveTo(pt,0),Je.lineTo(pt,128),Je.moveTo(0,pt),Je.lineTo(128,pt),Je.stroke()}),!0,!0);_.repeat.set(36,28);let T=new ze(new ei(250,200),new Mi({map:_}));T.rotation.x=-Math.PI/2,T.position.y=-.045,T.receiveShadow=!0,E.add(T);let I=As();I.box(.5,2.2,.5,"#4a3424",0,1.1,0);let F=new an().copy(I.geo()),g=new Za(2.6,5.5,7).translate(0,4.6,0),X=new Za(1.9,4.2,7).translate(0,7,0),W=(Je,mt)=>{let pt=new We(mt),Nt=Je.attributes.position.count,Se=new Float32Array(Nt*3);for(let _e=0;_e<Nt;_e++)Se.set([pt.r,pt.g,pt.b],_e*3);return Je.setAttribute("color",new Ft(Se,3)),Je.toNonIndexed?Je.toNonIndexed():Je},re=[F.index?F.toNonIndexed():F,W(g.toNonIndexed(),"#2f5a2a"),W(X.toNonIndexed(),"#3b6b31")].map(Je=>(Je.deleteAttribute("uv"),Je)),we=so(re),ge=fi(9001),z=e==="low"?140:320;oe=new vi(we,new Mi({vertexColors:!0}),z);let ne=new ct,ye=new zi,wt=new $e,Ke=new $e;for(let Je=0;Je<z;Je++){let mt=ge()*Math.PI*2,pt=150+Math.pow(ge(),.7)*260,Nt=.8+ge()*.9;Ke.set(Math.cos(mt)*pt*1.15,0,Math.sin(mt)*pt),ye.setFromAxisAngle(new $e(0,1,0),ge()*6.3),wt.set(Nt,Nt*(.85+ge()*.4),Nt),ne.compose(Ke,ye,wt),oe.setMatrixAt(Je,ne)}oe.frustumCulled=!1,E.add(oe);let rt=2048,De=160,At=Z(rt,De,Je=>{Je.clearRect(0,0,rt,De);let mt=fi(31337);Je.globalCompositeOperation="lighter",Je.fillStyle="rgb(255,0,0)",Je.beginPath(),Je.moveTo(0,De);for(let pt=0;pt<=rt;pt+=8){let Nt=pt/rt*Math.PI*2,Se=46+Math.sin(Nt*3)*16+Math.sin(Nt*7+1)*10+Math.sin(Nt*17+2)*4;Je.lineTo(pt,De-Se)}Je.lineTo(rt,De),Je.fill();for(let pt=0;pt<rt;){let Nt=10+mt()*34,Se=Math.sin(pt/rt*Math.PI*4)>-.2,_e=Se?16+Math.pow(mt(),2.2)*92:6+mt()*14;if(Je.fillStyle="rgb(0,255,0)",Je.fillRect(pt,De-_e,Nt,_e),Se&&_e>22){Je.fillStyle="rgb(0,0,255)";for(let st=De-_e+5;st<De-6;st+=6)for(let Tt=pt+3;Tt<pt+Nt-3;Tt+=5)mt()<.33&&Je.fillRect(Tt,st,2,3)}pt+=Nt+(mt()<.3?mt()*20:1)}}),It=new ls(At);return It.wrapS=ai,It.minFilter=qt,It.generateMipmaps=!1,j=new ze(new li(560,560,120,64,1,!0).translate(0,58,0),new $n({side:Fn,transparent:!0,depthWrite:!1,fog:!1,uniforms:{uMap:{value:It},uHill:{value:new $e(.5,.56,.62)},uCity:{value:new $e(.36,.4,.48)},uHor:{value:new $e(.7,.75,.8)},uNight:{value:0}},vertexShader:"varying vec2 vU; varying float vY; void main(){ vU = uv; vY = position.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform sampler2D uMap; uniform vec3 uHill, uCity, uHor; uniform float uNight; varying vec2 vU; varying float vY; void main(){ vec4 t = texture2D(uMap, vec2(vU.x * 2.0, vU.y)); float a = max(t.r, t.g); if (a < 0.02) discard;vec3 c = mix(uHill, uCity, t.g); float haze = smoothstep(60.0, -2.0, vY); c = mix(c, uHor, 0.35 + 0.3 * haze); c += vec3(1.0, 0.82, 0.5) * t.b * uNight * 0.9; gl_FragColor = vec4(c, a); }"})),j.renderOrder=-1,j.frustumCulled=!1,E.add(j),E}let se=new Map;i.world=function(E,S,C){E=vn(Math.floor(E)||1,1,5);let _=E+S+C,T=se.get(_);if(T)return T;let I=new Pn,F=As(),g=fi(s.hash("std:"+_)>>>0),X=[],W=[];I.add(L()),mi||(mi=he()),I.add(mi);let re=s.pitch!==!1?Wd({renderer:a,tier:e,url:B,fallbackMap:ua}):new Ot({map:ua(),roughness:.94,metalness:0,envMapIntensity:.18}),we=new ze(new ei(120,84),re);we.rotation.x=-Math.PI/2,we.receiveShadow=!0,I.add(we);let ge=[1,1,2,2,3][E-1],z=!0,ne=!0,ye=7,wt=["#26334d","#33415f"],Ke=(He,et,tt,zt,Jt)=>{for(let pn=0;pn<ge;pn++){for(let pr=0;pr<ye;pr++){let ya=tt+pn*(ye*.95+2.5)+pr*.95,ho=.6+pn*(ye*.55+2.2)+pr*.55,uo=He+ya*.4;et==="x"?F.box(uo,.55,.95,wt[pr%2],0,ho-.27,Jt*ya):F.box(.95,.55,uo,wt[pr%2],zt*ya,ho-.27,0);for(let fo=-uo/2+.5;fo<uo/2-.4;fo+=.72)X.push(et==="x"?[fo,ho+.05,Jt*ya]:[zt*ya,ho+.05,fo])}let Yn=tt+pn*(ye*.95+2.5),bi=pn*(ye*.55+2.2),lo=He+Yn*.4,dr=bi+.6;et==="x"?F.box(lo,dr,.4,"#2a3550",0,dr/2,Jt*(Yn-.65)):F.box(.4,dr,lo,"#2a3550",zt*(Yn-.65),dr/2,0);let ji=Yn+ye*.95+.4,Ei=bi+.6+ye*.55+(pn<ge-1?2.2:1.6),Ar=He+ji*.4;pn===ge-1?et==="x"?(F.box(Ar,Ei,.8,"#3a4662",0,Ei/2,Jt*ji),F.box(Ar,.5,.9,Jt>0?"#22d3ee":"#a855f7",0,Ei-.4,Jt*(ji-.05))):(F.box(.8,Ei,Ar,"#3a4662",zt*ji,Ei/2,0),F.box(.9,.5,Ar,"#ff2d95",zt*(ji-.05),Ei-.4,0)):et==="x"?F.box(Ar,.5,2.5,"#2a3550",0,Ei-1.9,Jt*(ji+.6)):F.box(2.5,.5,Ar,"#2a3550",zt*(ji+.6),Ei-1.9,0)}};Ke(112,"x",42,0,1),Ke(112,"x",42,0,-1),z&&(Ke(80,"z",61,1,0),Ke(80,"z",61,-1,0));let rt=ge*(ye*.55+2.2)+1.5,De=42+ge*(ye*.95+2.5);ne&&[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([He,et])=>{for(let tt=0;tt<ge*3;tt++)F.box(9,rt*(tt+1)/(ge*3),9,tt%2?"#323e5a":"#2a3550",He*(60+tt*2.4),rt*(tt+1)/(ge*6),et*(42+tt*2.4))});let At=[],It=(He,et,tt)=>{let zt=As();He(zt);let Jt=new ze(zt.geo(),new Mi({vertexColors:!0}));Jt.userData.side=et,Jt.userData.axis=tt,I.add(Jt),At.push(Jt)};E>=3&&[-1,1].forEach(He=>It(et=>{let tt=De-40+2,zt=rt+3.2;et.box(140,.5,tt,"#0b1122",0,zt,He*(40+tt/2)),et.box(140,.25,.5,He>0?"#22d3ee":"#ff2d95",0,zt-.35,He*41);for(let Jt=-3;Jt<=3;Jt++)et.box(.6,zt,.6,"#334155",Jt*20,zt/2,He*(De+1.2))},He,"z")),E>=5&&[-1,1].forEach(He=>It(et=>{let tt=De-58+2,zt=rt+3.2;et.box(tt,.5,100,"#0b1122",He*(58+tt/2),zt,0)},He,"x"));let Je=E>=3?34:22;[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([He,et])=>{F.box(.8,Je,.8,"#475569",He*64,Je/2,et*(De+2)),W.push([He*64,Je+1.5,et*(De+2)])});let mt=new ze(F.geo(),new Mi({vertexColors:!0}));mt.receiveShadow=!1,I.add(mt),mt.userData.st=1;let pt=new rn({color:16776168,toneMapped:!1}),Nt=new qa({map:Hc(),blending:Wo,depthWrite:!1,fog:!1,transparent:!0}),Se=[];for(let He of W){let et=new ze(new un(5,3,.6),pt);et.position.set(He[0],He[1],He[2]),et.lookAt(0,0,0),I.add(et);let tt=new Ac(Nt.clone());tt.position.set(He[0],He[1],He[2]),tt.scale.set(26,26,1),I.add(tt),Se.push(tt)}if(E>=4){let He=new ze(new un(18,8,.5),new rn({map:fa(S,C),toneMapped:!1}));He.position.set(0,rt+6,-De-1),I.add(He)}let _e=[.35,.5,.65,.8,.95][E-1],st=Math.min(X.length*_e,n.crowd),Tt=st/Math.max(1,X.length),Kt=He=>z?He[0]>58:He[2]<-40&&He[0]>24,Mn=X.filter(He=>He[2]<-40&&!Kt(He)).length,In=Math.max(Tt,Math.min(.85,st*.55/Math.max(1,Mn))),dn=X.filter(He=>g()<(He[2]<-40&&!Kt(He)?In:Tt)),Ci=jd(),ae=Ci.userData.u,Ie=Math.max(1,dn.length),Xe=new vi(Yd(),Ci,Ie),Gt=new ct,en=new We,on=["#facc15","#22d3ee","#a855f7","#ff2d95","#0f172a","#f97316","#e2e8f0"],An=new Float32Array(Ie),tn=new Float32Array(Ie),di=new Float32Array(Ie*2),$t=new Float32Array(Ie*3),nn=1e9,En=-1e9,yt=1e9,bt=-1e9;dn.forEach(He=>{He[2]<-40&&!Kt(He)&&(nn=Math.min(nn,He[0]),En=Math.max(En,He[0]),yt=Math.min(yt,He[1]),bt=Math.max(bt,He[1]))}),dn.forEach((He,et)=>{Gt.makeRotationY(He[2]>40?Math.PI:He[2]<-40?0:He[0]>0?-Math.PI/2:Math.PI/2),Gt.setPosition(He[0],He[1],He[2]),Xe.setMatrixAt(et,Gt);let tt=Kt(He),zt=g();en.set(tt?zt<.68?C:zt<.82?"#ffffff":on[Math.floor(g()*7)]:zt<.5?S:zt<.64?"#ffffff":zt<.76?"#1e293b":on[Math.floor(g()*7)]),Xe.setColorAt(et,en),An[et]=g(),tn[et]=tt?1:0;let Jt=new We(tt?C:g()<.6?S:"#ffffff");$t.set([Jt.r,Jt.g,Jt.b],et*3),He[2]<-40&&!tt&&En>nn?di.set([(He[0]-nn)/(En-nn),(He[1]-yt)/Math.max(.1,bt-yt)],et*2):di.set([-1,-1],et*2)});let ut=Xe.geometry=Xe.geometry.clone();ut.setAttribute("aSeed",new Ti(An,1)),ut.setAttribute("aSide",new Ti(tn,1)),ut.setAttribute("aUV",new Ti(di,2)),ut.setAttribute("aCol2",new Ti($t,3)),Xe.count=dn.length,Xe.frustumCulled=!1,I.add(Xe);let xn=$d(Xe,ae,S,C);xn&&(I.add(xn),I.userData.fanRT=xn.userData.rt);let gi=cA(I),Tn=fa(S,C);Tn.repeat.set(6,1);let _i=new rn({map:Tn,toneMapped:!1});[[112,.9,.2,0,38.5],[53.5,.9,.2,-29.25,-40.4],[53.5,.9,.2,29.25,-40.4]].forEach(([He,et,tt,zt,Jt])=>{let pn=new ze(new un(He,et,tt),_i);if(Math.abs(zt)>1){let Yn=pn.geometry.attributes.uv;for(let bi=0;bi<Yn.count;bi++)Yn.setX(bi,Yn.getX(bi)*53.5/112+(zt>0?58.5/112:0))}pn.position.set(zt,et/2,Jt),I.add(pn)});let Ui=fa(C,S);Ui.repeat.set(4,1);let dA=new rn({map:Ui,toneMapped:!1});[-57,57].forEach(He=>[-1,1].forEach(et=>{let tt=new ze(new un(.2,.9,30),dA);tt.position.set(He,.45,et*19),I.add(tt)}));let uu=[],fu=[],du=new Ot({color:16317180,roughness:.35,envMapIntensity:.6}),AA=Gc(),pA=new rn({map:AA,transparent:!0,opacity:.55,side:Sn,depthWrite:!1,alphaTest:.05}),Kc=(He,et,tt)=>{let zt=new ei(He,et),Jt=zt.attributes.uv;for(let pn=0;pn<Jt.count;pn++)Jt.setXY(pn,Jt.getX(pn)*He/.14,Jt.getY(pn)*et/.14);return new ze(zt,pA)};if([-1,1].forEach(He=>{let et=He*52.5,tt=(pn,Yn,bi,lo,dr,ji)=>{let Ei=new ze(new li(.06,.06,pn,10),du);Ei.position.set(Yn,bi,lo),Ei.rotation.set(dr||0,0,ji||0),Ei.castShadow=!0,I.add(Ei)};tt(2.44,et,1.22,3.66),tt(2.44,et,1.22,-3.66),tt(7.44,et,2.44,0,Math.PI/2),tt(2.44,et+He*2.2,1.22,3.66),tt(2.44,et+He*2.2,1.22,-3.66),tt(7.44,et+He*2.2,2.44,0,Math.PI/2),tt(2.2,et+He*1.1,2.44,3.66,0,Math.PI/2),tt(2.2,et+He*1.1,2.44,-3.66,0,Math.PI/2);let zt=Kc(7.32,2.44);zt.rotation.y=Math.PI/2,zt.position.set(et+He*2.2,1.22,0),I.add(zt),uu.push([zt,et+He*2.2,He]);let Jt=Kc(2.2,7.32);Jt.rotation.x=-Math.PI/2,Jt.position.set(et+He*1.1,2.44,0),I.add(Jt),[-1,1].forEach(pn=>{let Yn=Kc(2.2,2.44);Yn.position.set(et+He*1.1,1.22,pn*3.66),I.add(Yn)}),[-34,34].forEach(pn=>{let Yn=new ze(new li(.03,.03,1.5,6),du);Yn.position.set(et,.75,pn),I.add(Yn);let bi=new ze(new ei(.4,.28).translate(.2,0,0),new rn({color:16723349,side:Sn}));bi.position.set(et,1.36,pn),I.add(bi),fu.push(bi)})}),T={_b3:1,grp:I,crowd:Xe,cu:ae,lv:E,top:rt,far:De,key:_,roofs:At,lights:W,glows:Se,pitchM:re,nets:uu,flags:fu,dug:gi,stM:mt},I.visible=!1,c.add(I),se.set(_,T),se.size>2){let[He,et]=se.entries().next().value;se.delete(He),c.remove(et.grp),et.grp.userData.fanRT&&et.grp.userData.fanRT.dispose(),et.grp.traverse(tt=>{tt===Si||tt===mi||tt===we||tt===et.crowd||tt.parent&&tt.parent.userData&&tt.parent.userData.keep||(tt.geometry&&tt!==Si&&tt!==mi&&tt.geometry.dispose(),tt.material&&tt.material.map&&tt.material.map!==ps&&tt.material.map.dispose())})}return T},i.drawWorld=function(E,S){if(!E||!E._b3)return;M.add(E.grp);for(let I of E.roofs){let F=I.userData.axis==="z"?l.position.z:l.position.x;I.visible=!(F*I.userData.side>30&&l.position.y>6)}Si&&Si.parent!==E.grp&&E.grp.add(Si),mi&&mi.parent!==E.grp&&E.grp.add(mi),i._world=E,eA(E,S);let C=Fe,_=d.now/1e3,T=te.wind;if(E.flags.forEach((I,F)=>{I.rotation.y=(C&&C.wx&&C.wx.dx<0?Math.PI:0)+Math.sin(_*(4+T*6)+F)*(.15+T*.5),I.scale.y=1-T*.25*Math.abs(Math.sin(_*9+F))}),E.nets.forEach(([I,F,g],X)=>{I.position.x=F+g*T*.12*(.6+.4*Math.sin(_*2.4+X))}),C&&C.mg&&oA(E),C&&C.smoke&&e!=="low"){let I=tA(),F=(Date.now()-C.smoke.t)/1e3;F<10&&(M.add(I),I.material.uniforms.uT.value=F,I.material.uniforms.uEnd.value=C.smoke.end)}C&&C.plinth&&(i._pl||(i._pl=new ze(new li(.3,.42,1,24),new Ot({color:724772,roughness:.3,metalness:.5})),i._pl.position.set(0,.5,0),i._pl.castShadow=!0,c.add(i._pl)),M.add(i._pl),i.ball(0,0,1/1.6,_*.6))};let Fe=null,te={up:0,gold:0,ov:0,wet:0,snow:0,fog:0,wind:0,flash:0,nf:6,init:0,dir:new $e(.35,1,.45).normalize(),exp:1.08,hemi:.75,fogK:1,glow:1,t:0},ht={clear:0,cloudy:.55,rain:.78,storm:.95,fog:.72,snow:.7},gt=()=>{try{return s.atmo?s.atmo():null}catch{return null}},_t=(E,S,C)=>[E[0]+(S[0]-E[0])*C,E[1]+(S[1]-E[1])*C,E[2]+(S[2]-E[2])*C],St={night:[[.012,.016,.05],[.06,.03,.16],[.24,.1,.32]],day:[[.17,.4,.8],[.42,.63,.9],[.8,.87,.95]],gold:[[.2,.25,.52],[.8,.46,.42],[1,.6,.3]],ovD:[[.46,.5,.55],[.56,.6,.64],[.68,.71,.74]],ovN:[[.025,.028,.04],[.05,.052,.07],[.11,.11,.14]]},Ct=null,hn="",Xn={},wn={clear:"clear",partly:"partly",cloudy:"cloudy",rain:"rain",storm:"rain",fog:"cloudy",snow:"snow"};function Pi(E,S){let C=S?wn[E]||"partly":"";if(C===hn)return;let _=C&&Xn[C];if(!C){hn=C,c.environment=Ct;return}if(_&&_.tex){hn=C,c.environment=_.tex;return}if(_)return;let T=Xn[C]={tex:null};try{new Pc().load((s.base||"./")+"w3d-sky-"+C+".hdr?v="+(s.v||1),I=>{try{let F=new Cs(a);I.mapping=Ga,T.tex=F.fromEquirectangular(I).texture,F.dispose(),I.dispose()}catch{}},void 0,()=>{T.fail=1})}catch{T.fail=1}}i.envKey=()=>hn;function fn(E,S){let C=Fe,_=C&&C.tod!=null?(C.tod%24+24)%24:21,T=C&&C.wx,I=T?T.k:"clear",F=ft(5.8,7.4,_)*(1-ft(18,19.6,_)),g=F*Math.max(ft(15.6,17.8,_),1-ft(6.8,8.6,_)),X={up:F,gold:g,ov:ht[I]||0,wet:I==="rain"?1:I==="storm"?2:0,snow:I==="snow"?1:0,fog:I==="fog"?1:0,wind:T?vn((T.w-3)/9,0,1):0},W=C&&C.key||"";W!==te.key&&(te.key=W,te.init=0);let re=te.init?Math.min(1,E*1.2):1;te.init=1;for(let At in X)te[At]+=(X[At]-te[At])*re;te.t+=E;let we=vn((_-6)/13,0,1)*Math.PI,ge=new $e(-Math.cos(we)*.9,.14+.95*Math.max(0,Math.sin(we)),.55).normalize(),z=new $e(.35,1,.45).normalize();te.dir.copy(z).lerp(ge,te.up).normalize(),s.hdr!==!1&&Pi(I==="clear"&&s.hash(String(W))&1?"partly":I,F>.35);let ne=_t(_t([1,.96,.9],[1,.97,.92],te.up),[1,.66,.4],te.gold);u.color.setRGB(ne[0],ne[1],ne[2]),u.intensity=(2.45+.6*te.up-.3*te.gold)*(1-.55*te.ov*te.up)*(1-.15*te.ov*(1-te.up)),I==="storm"&&S&&(te.nf-=E,te.nf<=0&&(te.flash=1,te.nf=6+Math.random()*10)),te.flash=Math.max(0,te.flash-E*5),te.hemi=.75+.3*te.up+.25*te.ov*te.up+te.flash*2.2,h.color.setRGB(.78+.1*te.up,.85+.05*te.up,1),h.groundColor.setRGB(.13,.23+.06*te.up,.14),te.exp=1.08-.06*te.up+.05*te.ov*te.up,te.fogK=1+3.6*te.fog+.7*Math.min(1,te.wet)+.5*Math.max(0,te.wet-1)+.9*te.snow,te.glow=vn(1-te.up+te.gold*.7+te.ov*.45,0,1);let ye=St,wt=[0,1,2].map(At=>_t(_t(ye.night[At],ye.day[At],te.up),ye.gold[At],te.gold*(1-te.ov*.7))),Ke=[0,1,2].map(At=>_t(ye.ovN[At],ye.ovD[At],te.up)),rt=[0,1,2].map(At=>_t(wt[At],Ke[At],te.ov*.85));te.snow>.01&&(rt[2]=_t(rt[2],[.85,.87,.9],te.snow*te.up*.4));let De=Si&&Si.material.uniforms;De&&(De.uTop.value.fromArray(rt[0]),De.uMid.value.fromArray(rt[1]),De.uHor.value.fromArray(rt[2]),De.uStars.value=(1-te.up)*(1-te.ov),De.uCloud.value=vn(te.ov+.12*te.up*(1-te.ov),0,1),De.uSun.value.copy(ge),De.uSunC.value.setRGB(ne[0]*te.up,ne[1]*te.up,ne[2]*te.up),De.uT.value=te.t,De.uFlash.value=te.flash*.35);{let At=.62+.3*te.up;c.fog.color.setRGB(rt[2][0]*At,rt[2][1]*At,rt[2][2]*At)}if(j){let At=j.material.uniforms,It=.35+.5*te.up;At.uHor.value.set(rt[2][0],rt[2][1],rt[2][2]),At.uHill.value.set(rt[2][0]*.62*It+.03,rt[2][1]*.7*It+.04,rt[2][2]*.72*It+.05),At.uCity.value.set(rt[1][0]*.4*It+.03,rt[1][1]*.42*It+.03,rt[1][2]*.5*It+.05),At.uNight.value=(1-te.up)*(1-te.fog*.7)}if(i._world){let At=i._world;for(let It of At.glows||[])It.material.opacity=te.glow;if(At.pitchM){let It=Math.min(1,te.wet),Je=At.pitchM;Je.roughness=.94-.55*It-.1*te.snow,Je.envMapIntensity=.18+.6*It;let mt=te.snow,pt=Je.userData&&Je.userData.u;pt&&pt.uSnow&&(mt>.01&&Je.userData.loadSnow&&Je.userData.loadSnow(),pt.uSnow.value=mt*.66);let Nt=pt&&pt.uSnow?.25:1;Je.color.setRGB(1-.18*It+.3*mt*Nt,1-.18*It+.3*mt*Nt,1-.16*It+.38*mt*Nt),Je.emissive.setRGB(.42*mt*Nt,.45*mt*Nt,.5*mt*Nt)}if(At.stM){let It=1+1.1*te.up*(1-.45*te.ov);At.stM.material.color.setRGB(It,It,It*1.04)}}}let xt=null,Fi=null,Zt=null,Ni={high:[5200,2600,700],mid:[3e3,1600,420],low:[1100,700,160]}[e]||[3e3,1600,420];function co(){if(xt)return xt;let E=Ni[0],S=new Float32Array(E*6),C=new Float32Array(E*2),_=fi(991);for(let F=0;F<E;F++){let g=_()*46-23,X=_()*26,W=_()*46-23;S.set([g,X,W,g,X,W],F*6),C[F*2]=0,C[F*2+1]=1}let T=new an;T.setAttribute("position",new Ft(S,3)),T.setAttribute("aEnd",new Ft(C,1));let I=new $n({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new $e},uW:{value:new $e},uT:{value:0},uA:{value:.3},uL:{value:.7}},vertexShader:"attribute float aEnd; uniform vec3 uC, uW; uniform float uT, uL; void main(){ vec3 p = position; float sp = 12.0 + fract(p.x * 7.13 + p.z * 3.1) * 5.0; p.y = mod(p.y - uT * sp, 26.0); p.x = mod(p.x + uW.x * uT + 23.0, 46.0) - 23.0; p.z = mod(p.z + uW.z * uT + 23.0, 46.0) - 23.0; vec3 w = vec3(p.x + uC.x, p.y, p.z + uC.z); w -= normalize(vec3(-uW.x, sp, -uW.z)) * uL * aEnd; gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0); }",fragmentShader:"uniform float uA; void main(){ gl_FragColor = vec4(0.78, 0.83, 0.9, uA); }"});return xt=new ta(T,I),xt.frustumCulled=!1,xt.renderOrder=5,c.add(xt),xt}function Os(){if(Fi)return Fi;let E=Ni[1],S=new Float32Array(E*3),C=fi(773);for(let I=0;I<E;I++)S.set([C()*46-23,C()*26,C()*46-23],I*3);let _=new an;_.setAttribute("position",new Ft(S,3));let T=new $n({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new $e},uW:{value:new $e},uT:{value:0},uS:{value:1}},vertexShader:"uniform vec3 uC, uW; uniform float uT, uS; varying float vA; void main(){ vec3 p = position; float f = fract(p.x * 3.7 + p.z * 1.3); p.y = mod(p.y - uT * (0.9 + f * 0.7), 26.0); p.x = mod(p.x + uW.x * uT * 0.6 + sin(uT * 1.1 + f * 30.0) * 0.7 + 23.0, 46.0) - 23.0; p.z = mod(p.z + uW.z * uT * 0.6 + cos(uT * 0.9 + f * 20.0) * 0.6 + 23.0, 46.0) - 23.0; vec4 mv = viewMatrix * vec4(p.x + uC.x, p.y, p.z + uC.z, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = min(9.0, uS * (2.0 + f * 2.5) * 26.0 / max(1.0, -mv.z)); vA = 0.9; }",fragmentShader:"varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.15, length(d)); gl_FragColor = vec4(1.0, 1.0, 1.0, a * vA); }"});return Fi=new Ts(_,T),Fi.frustumCulled=!1,Fi.renderOrder=5,c.add(Fi),Fi}function da(){if(Zt)return Zt;let E=Ni[2],S=new Float32Array(E*3),C=fi(551);for(let I=0;I<E;I++)S.set([C()*40-20,.03,C()*40-20],I*3);let _=new an;_.setAttribute("position",new Ft(S,3));let T=new $n({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uC:{value:new $e},uT:{value:0},uA:{value:.6}},vertexShader:"uniform vec3 uC; uniform float uT; varying float vL; void main(){ vec3 p = position; float f = fract(p.x * 5.1 + p.z * 2.3); float ph = fract(uT * 1.6 + f); vL = ph; vec4 mv = viewMatrix * vec4(p.x + uC.x, 0.03, p.z + uC.z, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = (1.5 + ph * 7.0) * 30.0 / max(1.0, -mv.z); }",fragmentShader:"uniform float uA; varying float vL; void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d); float a = smoothstep(0.5, 0.38, r) * smoothstep(0.2, 0.36, r) * (1.0 - vL) * step(vL, 0.35) * 2.8; gl_FragColor = vec4(0.85, 0.9, 0.95, a * uA); }"});return Zt=new Ts(_,T),Zt.frustumCulled=!1,Zt.renderOrder=5,c.add(Zt),Zt}function On(E){if(!E)return;let S=Fe&&Fe.wx;if(!S)return;let C=new $e;l.getWorldDirection(C),C.y=0,C.lengthSq()<1e-4&&C.set(0,0,-1),C.normalize();let _=l.position.x+C.x*14,T=l.position.z+C.z*14,I=new $e((S.dx||0)*(S.w||0)*.55,0,(S.dy||0)*(S.w||0)*.55);if(te.wet>.05){let F=co(),g=F.material.uniforms;M.add(F),g.uC.value.set(_,0,T),g.uW.value.copy(I),g.uT.value=te.t,g.uA.value=.18+.16*Math.min(2,te.wet),g.uL.value=.55+.25*Math.min(2,te.wet);let X=da(),W=X.material.uniforms;M.add(X),W.uC.value.set(_,0,T),W.uT.value=te.t,W.uA.value=.35*Math.min(2,te.wet)}if(te.snow>.05){let F=Os(),g=F.material.uniforms;M.add(F),g.uC.value.set(_,0,T),g.uW.value.copy(I),g.uT.value=te.t,g.uS.value=1}}let qn=null,hr=30*4,ti=()=>ue(Z(64,64,E=>{let S=E.createRadialGradient(32,32,0,32,32,32);S.addColorStop(0,"rgba(0,0,0,0.9)"),S.addColorStop(1,"rgba(0,0,0,0)"),E.fillStyle=S,E.fillRect(0,0,64,64)}));function Aa(E){if(!E||e==="low"||te.glow<.35||!i._world||!i._world.lights)return;if(!qn){let g=new rn({map:ti(),transparent:!0,depthWrite:!1,opacity:.2,polygonOffset:!0,polygonOffsetFactor:-2});qn=new vi(new ei(1,1).rotateX(-Math.PI/2),g,hr),qn.frustumCulled=!1,c.add(qn)}let S=i._world.lights,C=new ct,_=new zi,T=new $e,I=new $e,F=0;for(let g of qe){if(!M.has(g.root)||F+S.length>hr)continue;let X=g.root.position.x,W=g.root.position.z;for(let re of S){let we=X-re[0],ge=W-re[2],z=Math.sqrt(we*we+ge*ge)||1;we/=z,ge/=z;let ne=vn(55/z,.9,2.6);C.compose(I.set(X+we*ne*.55,.02,W+ge*ne*.55),_.setFromAxisAngle(lt,Math.atan2(we,ge)),T.set(.55,1,ne)),qn.setMatrixAt(F++,C)}}qn.count=F,qn.instanceMatrix.needsUpdate=!0,qn.material.opacity=.2*te.glow,M.add(qn)}let pa=new Map,ma={lg:[["#22d3ee","#a855f7"],["#ff2d95","#22d3ee"],["#a855f7","#facc15"],["#14b8a6","#ff2d95"]],oc:[["#facc15","#ff2d95"],["#f97316","#a855f7"],["#22d3ee","#facc15"],["#ff2d95","#14b8a6"]],cl:[["#0b1f4d","#c0c0c0"],["#1e1b4b","#facc15"],["#0f172a","#22d3ee"],["#312e81","#e2e8f0"]],fr:[["#0b0f24","#0b0f24"],["#0b0f24","#22d3ee"],["#0b0f24","#ff2d95"],["#0b0f24","#a855f7"]],final:[["#d4af37","#0b0f24"],["#d4af37","#ffffff"],["#d4af37","#a855f7"],["#d4af37","#22d3ee"]]};function qd(E,S,C){let _=E+S+(C?"s":"");if(pa.has(_))return pa.get(_);let T=(ma[E]||ma.fr)[S%4],I=C?"#f97316":E==="cl"?T[0]:E==="final"?"#d4af37":"#f8fafc",F=ue(Z(512,256,g=>{if(g.fillStyle=I,g.fillRect(0,0,512,256),E==="fr"||C)g.fillStyle=C?"#1e1b4b":T[0],[[64,40],[192,40],[320,40],[448,40],[0,128],[128,128],[256,128],[384,128],[512,128],[64,216],[192,216],[320,216],[448,216]].forEach(([X,W])=>{g.beginPath();for(let re=0;re<5;re++){let we=-Math.PI/2+re*1.2566;g.lineTo(X+Math.cos(we)*28,W+Math.sin(we)*24)}g.fill()}),T[1]!==T[0]&&!C&&(g.fillStyle=T[1],g.fillRect(0,122,512,12));else if(E==="cl"){g.fillStyle=T[1];for(let X=0;X<9;X++){let W=X%3*170+85+Math.floor(X/3)%2*40,re=Math.floor(X/3)*85+42;g.beginPath();for(let we=0;we<10;we++){let ge=we%2?12:30,z=-Math.PI/2+we*Math.PI/5;g.lineTo(W+Math.cos(z)*ge,re+Math.sin(z)*ge)}g.fill()}}else{let X=g.createLinearGradient(0,0,512,0);X.addColorStop(0,T[0]),X.addColorStop(1,T[1]),g.fillStyle=X;for(let W=0;W<6;W++){g.beginPath();let re=W*86+S%2*40;g.moveTo(re,0),g.quadraticCurveTo(re+70,128,re+10,256),g.lineTo(re+34,256),g.quadraticCurveTo(re+100,128,re+26,0),g.fill()}if(E==="final"){g.strokeStyle=T[1],g.lineWidth=4;for(let W=0;W<512;W+=64)g.beginPath(),g.moveTo(W,0),g.lineTo(W+32,256),g.stroke()}}g.strokeStyle="rgba(15,23,42,.35)",g.lineWidth=2;for(let X=0;X<512;X+=64)g.beginPath(),g.moveTo(X,0),g.lineTo(X+32,256),g.stroke()}));return pa.set(_,F),F}let zc="";function Xd(){if(!it)return;let E=Fe&&Fe.ball,S=E?E.kind:"fr",C=E&&E.d||0,_=!!(Fe&&Fe.wx&&Fe.wx.k==="snow"),T=S+C+_;T!==zc&&(zc=T,it.material.map=qd(S,C,_),it.material.metalness=S==="final"&&!_?.55:0,it.material.roughness=S==="final"&&!_?.25:.38,it.material.needsUpdate=!0)}let tu=null,Yd=()=>tu||(tu=(()=>{let E=[],S=(C,_)=>{let T=(C.toNonIndexed,C),I=T.attributes.position.count;T.setAttribute("aPart",new Ft(new Float32Array(I).fill(_),1)),T.deleteAttribute("uv"),E.push(T)};return S(new un(.34,.5,.26).translate(0,.25,.04),0),S(new un(.42,.52,.25).translate(0,.76,0),1),S(new Rs(.12,6,4).translate(0,1.16,.01),2),S(new un(.11,.48,.12).translate(-.27,.74,0),3),S(new un(.11,.48,.12).translate(.27,.74,0),4),S(new un(.62,.17,.03).translate(0,1.5,.05),5),so(E)})()),Jd=`
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
    #endif`;function jd(){let E=new Mi,S={uT:{value:0},uB:{value:0},uSt:{value:new Ze},uAr:{value:new Ze},uJp:{value:new Ze},uHd:{value:new Ze},uSc:{value:new Ze},uWave:{value:new Ze},uTifo:{value:0},uTifoTex:{value:null},uCards:{value:0}};return E.userData.u=S,E.onBeforeCompile=C=>{Object.assign(C.uniforms,S),C.vertexShader=`uniform float uT, uB, uTifo, uCards; uniform vec2 uSt, uAr, uJp, uHd, uSc, uWave; uniform sampler2D uTifoTex; attribute float aPart, aSeed, aSide; attribute vec2 aUV; attribute vec3 aCol2;
`+C.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
#ifdef USE_INSTANCING
`+Jd+`
#endif`)},E.customProgramCacheKey=()=>"w3dcrowd7",E}let ga=null;function Zd(E,S){let C=t?8:16,_=t?4:8,T=C+_,I=t?48:e==="high"?80:64,F=I*2,g=4,X=new Ai(T*I,g*F,{samples:t?0:4});X.texture.generateMipmaps=!1,X.texture.minFilter=qt;let W=new ws;W.add(new vc(16777215,1.1));let re=new Hi(16774374,1.9);re.position.set(.5,1.2,2),W.add(re),W.environment=c.environment;let we=new Ss(-.5625,.5625,2.45,.2,-5,5);we.position.set(0,0,2);let ge=!!(v&&v.ok);ge?lr||(lr=v.makeLoose()):ga||(ga=at(),c.remove(ga.root),qe.splice(qe.indexOf(ga),1));let z=ge?lr:ga;W.add(z.root);let ne=fi(s.hash("fans:"+E+S)>>>0),ye=De=>De[Math.floor(ne()*De.length)],wt=[],Ke=["#1e293b","#334155","#f8fafc","#0b0f24","#475569","#a3a3a3","#1d4ed8","#15803d","#78350f"],rt={cc:a.getClearColor(new We),ca:a.getClearAlpha(),rt:a.getRenderTarget()};a.setClearColor(0,0);for(let De=0;De<T;De++){let At=De>=C,It=At?S:E,Je=At?E:S,mt=ne()<.7,pt=s.kitN(mt?{c1:It,c2:ne()<.5?"#f8fafc":Je,pat:ye(["plain","plain","stripes","hoops","halves","sash"]),col:Je,slv:It,sho:ye(Ke),soc:ye(Ke)}:(()=>{let _e=ye(Ke);return{c1:_e,c2:_e,pat:"plain",col:_e,slv:ne()<.5?_e:ye(Ke),sho:ye(Ke),soc:ye(Ke)}})()),Nt={_b3:1,key:"fan"+De+JSON.stringify(pt),K:pt,g:"#facc15",tex:ue($(pt))};Nt.gtex=Nt.tex,wt.push(Nt.tex);let Se="fan"+s.hash(E+S)%997+"x"+De;if(ge){z.fanWear=[ne()<.35?1:0,1],z.fanTrou=ye(["#1e3a5f","#1e293b","#334155","#0b0f24","#3f3f46","#57534e"]),z.dk=null,v.dress(z,Nt,!1,Se,"",de(Se),"");for(let _e in z.lod)z.lod[_e].visible=_e==="match";z.hair.visible=!0,z.hairH&&(z.hairH.visible=!1),z.root.visible=!0}else{xe(z,Nt,!1,Se,""),z.lo&&(z.lo.visible=!1),z.hi&&(z.hi.visible=!0),z.bodyU.uGear.value.y=1;for(let _e of z.cloth||[])_e.visible=_e.userData.layer!==2}for(let _e=0;_e<g;_e++){for(let[st,Tt]of z.mod)st.quaternion.copy(Tt);z.mod.clear();for(let st in z.act)z.act[st].setEffectiveWeight(st==="idle"?1:0);if(z.mixer.setTime(.4+De*.37),z.root.position.set(0,0,0),z.root.rotation.set(0,(ne()-.5)*.35,0),z.root.scale.setScalar(Qc*(z.hgt||1)),z.root.updateMatrixWorld(!0),z.FU.uExpr.value.set(_e===0?.3:0,_e===1||_e===3?1:0,_e===1?.6:0,_e===2?1:0),_e===1){let st=(ne()-.5)*.3;Ee(z,"upperarm_l","lowerarm_l",Te(.45,1,.1+st),1),Ee(z,"lowerarm_l","hand_l",Te(.25,1,.15),1),Ee(z,"upperarm_r","lowerarm_r",Te(-.45,1,.1-st),1),Ee(z,"lowerarm_r","hand_r",Te(-.25,1,.15),1)}_e===2&&(Ee(z,"upperarm_l","lowerarm_l",Te(.75,.75,.15),1),Ee(z,"lowerarm_l","hand_l",Te(-.9,.35,-.1),1),Ee(z,"upperarm_r","lowerarm_r",Te(-.75,.75,.15),1),Ee(z,"lowerarm_r","hand_r",Te(.9,.35,-.1),1),Ue(z,"Head",Pe,-.12)),_e===3&&(Ee(z,"upperarm_l","lowerarm_l",Te(.2,-.55,.8),1),Ee(z,"lowerarm_l","hand_l",Te(-.75,.35,.55),1),Ee(z,"upperarm_r","lowerarm_r",Te(-.2,-.55,.8),1),Ee(z,"lowerarm_r","hand_r",Te(.75,.35,.55),1)),z.root.updateMatrixWorld(!0),X.viewport.set(De*I,_e*F,I,F),X.scissor.set(De*I,_e*F,I,F),X.scissorTest=!0,a.setRenderTarget(X),a.clear(),a.render(W,we)}}a.setRenderTarget(rt.rt),a.setClearColor(rt.cc,rt.ca),X.scissorTest=!1,W.remove(z.root);for(let[De,At]of z.mod)De.quaternion.copy(At);return z.mod.clear(),z.FU.uExpr.value.set(0,0,0,0),wt.forEach(De=>De.dispose()),z.dk=null,{tex:X.texture,rt:X,nH:C,nA:_,N:T}}function $d(E,S,C,_){let T;try{T=Zd(C,_)}catch(W){return console.warn("3D fans",W),null}let I=new ei(.985,1.97).translate(0,.175+.985,0),F=new Mi({side:Sn,alphaTest:.5}),g=F.userData.u=Object.assign({},S,{uFan:{value:T.tex},uFanN:{value:new G(T.nH,T.nA,T.N)}});F.onBeforeCompile=W=>{Object.assign(W.uniforms,g),W.vertexShader=`uniform float uT, uB, uTifo; uniform vec2 uSt, uAr, uJp, uHd, uSc, uWave; uniform vec3 uFanN; attribute float aSeed, aSide; attribute vec2 aUV; varying vec2 vFan;
`+W.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
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
        #endif`),W.fragmentShader=`uniform sampler2D uFan; varying vec2 vFan;
`+W.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
{ vec4 t = texture2D(uFan, vFan); if (t.a < 0.5) discard; diffuseColor.rgb = t.rgb / max(t.a, 0.5); }`)},F.customProgramCacheKey=()=>"w3dfans1";let X=new vi(I,F,E.count);X.instanceMatrix.copy(E.instanceMatrix),X.count=E.count,X.frustumCulled=!1;for(let W of["aSeed","aSide","aUV"])I.setAttribute(W,E.geometry.attributes[W]);return S.uCards.value=1,X.userData.rt=T.rt,X}let nu=E=>{let S=Z(256,64,_=>{let T=_.createLinearGradient(0,0,256,64);T.addColorStop(0,E.c1),T.addColorStop(.5,E.c1),T.addColorStop(.5,E.c2),T.addColorStop(1,E.c2),_.fillStyle=T,_.fillRect(0,0,256,64),_.fillStyle="#ffffff";for(let I=0;I<12;I++)_.fillRect(I*22,0,6,6);_.font="900 40px Arial, Helvetica, sans-serif",_.textAlign="center",_.textBaseline="middle",_.lineWidth=6,_.strokeStyle="#0b0f24",_.strokeText(String(E.sh||"").slice(0,10),128,36),_.fillText(String(E.sh||"").slice(0,10),128,36)}),C=ue(S);return C.minFilter=qt,C.generateMipmaps=!1,C},gn={st:[0,0],ar:[0,0],jp:[0,0],hd:[0,0],sc:[0,0],wave:0,wph:0,tifo:0,tkey:"",smoke:null};function eA(E,S){let C=E.cu,_=Fe&&Fe.crowd||null,T=d.dt,I=Math.min(1,T*4.5);for(let F of["st","ar","jp","hd","sc"])for(let g=0;g<2;g++){let X=_&&_[F]?_[F][g]||0:F==="jp"?(S||0)*2:F==="st"?S>.05?1:.08:0;gn[F][g]+=(X-gn[F][g])*I}if(gn.wave+=((_&&_.wave||0)-gn.wave)*Math.min(1,T*1.5),gn.wph=(gn.wph+T*1.15)%(Math.PI*2),gn.tifo+=((_&&_.tifo?1:0)-gn.tifo)*Math.min(1,T*2.5),C.uSt.value.fromArray(gn.st),C.uAr.value.fromArray(gn.ar),C.uJp.value.fromArray(gn.jp),C.uHd.value.fromArray(gn.hd),C.uSc.value.fromArray(gn.sc),C.uWave.value.set(gn.wave,gn.wph),C.uTifo.value=gn.tifo>.5?1:0,C.uT.value=d.now/1e3,C.uB.value=0,_&&_.tifo){let F=JSON.stringify(_.tifo);F!==gn.tkey&&(gn.tkey=F,C.uTifoTex.value&&C.uTifoTex.value.dispose(),C.uTifoTex.value=nu(_.tifo))}C.uTifoTex.value||(C.uTifoTex.value=nu({c1:"#22d3ee",c2:"#a855f7",sh:""}))}let ur=null;function tA(){if(ur)return ur;let E=e==="high"?260:160,S=new Float32Array(E*3),C=new Float32Array(E*3),_=fi(4242),T=[[.13,.83,.93],[.66,.33,.97],[1,.18,.58]];for(let g=0;g<E;g++){let X=_()<.5?-1:1;S.set([X*(60+_()*4),1+_()*3,(_()-.5)*50],g*3),C.set(T[g%3],g*3)}let I=new an;I.setAttribute("position",new Ft(S,3)),I.setAttribute("color",new Ft(C,3));let F=new $n({transparent:!0,depthWrite:!1,uniforms:{uT:{value:0},uEnd:{value:0}},vertexShader:"attribute vec3 color; uniform float uT, uEnd; varying vec3 vC; varying float vA; void main(){ vec3 p = position; float f = fract(p.z * 0.37 + p.y * 1.7); float e = sign(p.x); float on = uEnd > 1.5 ? 1.0 : step(0.0, e * (uEnd - 0.5)); float life = clamp(uT / 9.0, 0.0, 1.0); float a = clamp(uT - f * 2.0, 0.0, 9.0);p.y += a * (1.3 + f); p.x -= e * a * 0.6; p.z += sin(a * 0.7 + f * 9.0) * 1.5; vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = (3.0 + a * 1.8) * 120.0 / max(1.0, -mv.z); vC = color; vA = on * smoothstep(0.0, 0.6, a) * (1.0 - life) * 0.45; }",fragmentShader:"varying vec3 vC; varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(vC, a * vA); }"});return ur=new Ts(I,F),ur.frustumCulled=!1,c.add(ur),ur}let _a=new Map,iu=new Map,nA=["shaved","buzz","crew","short","part","slick","quiff","curl","afro","dread","fade","top"],iA=["#0a0a0c","#24170f","#5a3a20","#a07a44","#c9a55a","#6b2f1a","#8a8f96","#d8dadd"];function su(E,S){let C=E+JSON.stringify(S),_=_a.get(C);return _||(_={...x("mgrface:"+(S.seed||E)),si:[0,2,4,5,7,9,11,12][S.sk||0],hair:iA[S.hc||0],st:nA[S.hr||0],beard:[0,1,2,3,5][S.bd||0],build:[-.35,.1,.55][S.bu||0],h:1.8+((S.bu||0)===0?.02:0),arch:"balanced",sock:0,band:!1,wrist:0,sleeves:(S.fit|0)!==3,untuck:(S.fit|0)!==3,dance:!1,sad:1,cel:0,mgr:1,trou:(S.fit|0)===2?2:1,gl:S.gl||0,boot:(S.fit|0)===1?"#f8fafc":"#0b0f24",boot2:(S.fit|0)===1?"#94a3b8":"#111827",red:(S.ag||0)*.2},_a.set(C,_),_a.size>40&&_a.delete(_a.keys().next().value),_)}let sA=(E,S,C,_)=>Z(512,256,T=>{let I=(F,g)=>T.fillRect(F,0,g,256);if(T.fillStyle=E===1||E===3?C:S,I(0,512),E===0||E===2){if(T.fillStyle="#f8fafc",T.beginPath(),T.moveTo(100,0),T.lineTo(156,0),T.lineTo(128,120),T.fill(),E===0)T.fillStyle=C,T.beginPath(),T.moveTo(122,8),T.lineTo(134,8),T.lineTo(138,104),T.lineTo(128,116),T.lineTo(118,104),T.fill();else{T.fillStyle=C,T.fillRect(104,0,20,150),T.fillStyle=_;for(let F=0;F<150;F+=18)T.fillRect(104,F,20,6)}T.strokeStyle="rgba(0,0,0,.35)",T.lineWidth=5,T.beginPath(),T.moveTo(92,0),T.lineTo(124,130),T.moveTo(164,0),T.lineTo(132,130),T.stroke(),T.fillStyle="rgba(0,0,0,.45)",[150,190].forEach(F=>{T.beginPath(),T.arc(136,F,5,0,7),T.fill()}),T.fillStyle="rgba(0,0,0,.25)",T.fillRect(383,0,3,256)}else E===1?(T.fillStyle=_,T.fillRect(30,0,14,256),T.fillRect(212,0,14,256),T.fillRect(286,0,14,256),T.fillRect(468,0,14,256),T.fillStyle="#e2e8f0",T.fillRect(126,0,4,256)):(T.fillStyle=_,T.fillRect(118,0,20,70),T.fillStyle="#f8fafc",[20,42,62].forEach(F=>{T.beginPath(),T.arc(128,F,3,0,7),T.fill()}))});function ru(E){let S=E.fit|0,C=E.c||"#0b1f4d",_=E.c1||"#22d3ee",T=E.c2||"#ffffff",I=[S,C,_,T].join(),F=iu.get(I);if(F)return F;let g=S===1||S===3?_:C,X={c1:g,c2:T,pat:"plain",col:S===0?"#f8fafc":S===2?_:T,slv:g,sho:S===1&&_===C?"#0b0f24":C,soc:"#0b0f24"},W=ue(sA(S,C,_,T));return F={_b3:1,key:"mgr"+I,K:X,g,tex:W,gtex:W},iu.set(I,F),F}let ba=null;function au(E,S){if(!ba){let C=(()=>{let g=null;return H.traverse(X=>{X.isBone&&X.name==="Head"&&(g=X)}),g})();if(!C)return null;H.updateMatrixWorld(!0);let _=new ct().copy(C.matrixWorld).invert(),T=new $e(0,1.692,.104).applyMatrix4(_),I=new zi;C.getWorldQuaternion(I);let F=new $e;C.getWorldScale(F),ba={pos:T,q:I.invert(),s:1/(F.x||1)}}if(!E.gls){let C=new Pn,_=new Ot({color:724772,roughness:.35,metalness:.4}),T=new Ot({color:1120295,roughness:.1,metalness:.6,transparent:!0,opacity:.85});[-1,1].forEach(F=>{let g=new ze(new na(.019,.0035,6,14),_);g.position.set(F*.031,0,0),C.add(g);let X=new ze(new ja(.018,12),T);X.position.set(F*.031,0,.001),X.userData.lens=1,C.add(X);let W=new ze(new un(.003,.003,.085),_);W.position.set(F*.05,.002,-.044),C.add(W)});let I=new ze(new un(.024,.003,.003),_);I.position.set(0,.004,0),C.add(I),E.mh&&v?(C.matrixAutoUpdate=!1,C.matrix.copy(v.glassAnchor(E))):(C.position.copy(ba.pos),C.quaternion.copy(ba.q),C.scale.setScalar(ba.s)),E.bones.Head.add(C),E.gls=C}return E.gls.visible=S>0,E.gls.children.forEach(C=>{C.userData.lens&&(C.visible=S===2)}),E.gls}let Vi=null,ou="";function rA(E,S){let C=E+":"+S;return Vi||(Vi=new ze(new un(.62,.36,.05),new rn({toneMapped:!1})),c.add(Vi)),C!==ou&&(ou=C,Vi.material.map&&Vi.material.map.dispose(),Vi.material.map=ue(Z(256,150,_=>{_.fillStyle="#05060f",_.fillRect(0,0,256,150),_.font="900 70px Arial, Helvetica, sans-serif",_.textAlign="center",_.textBaseline="middle",_.fillStyle="#ff2d95",_.fillText(String(E),66,80),_.fillStyle="#22d3ee",_.fillText(String(S),190,80),_.font="900 18px Arial",_.fillStyle="#e2e8f0",_.fillText("OUT",66,22),_.fillText("IN",190,22)})),Vi.material.needsUpdate=!0),Vi}let fr=null;function aA(){if(fr)return fr;let E=so([new un(.44,.08,.42).translate(0,.44,.12),new un(.44,.5,.06).translate(0,.7,-.08)].map(S=>(S.deleteAttribute("uv"),S)));return fr=new vi(E,new Mi,12),fr.frustumCulled=!1,c.add(fr),fr}let Vc=-36.4,cu=-38.9,lu=-3.6;i.TUNNEL={x:0,z0:-46.5,z1:cu};function oA(E){let S=Fe;if(!S||!S.mg||!E.dug)return;let C=d.now/1e3,_=new We,T=new ct,I=aA(),F=0;for(let re=0;re<2;re++){let we=S.mc&&S.mc[re]&&S.mc[re].c1||(re?"#ff2d95":"#22d3ee");for(let ge=0;ge<6;ge++)T.makeRotationY(0),T.setPosition((re?1:-1)*(10.6+(ge-2.5)*.95),0,-38.05),I.setMatrixAt(F,T),_.set(we),I.setColorAt(F++,_)}I.count=F,I.instanceMatrix.needsUpdate=!0,I.instanceColor&&(I.instanceColor.needsUpdate=!0),M.add(I);for(let re=0;re<2;re++){let we=S.mg[re];if(!we)continue;let ge=ru(we),z="mgr"+re+":"+s.hash(JSON.stringify(we)),ne=S.ma&&S.ma[re]||{};Wc.set(z,su(z,we));let ye=(re?1:-1)*7.6,wt=ne.k&&ne.k!=="idle",Ke=ye+Math.sin(C*.33+re*2.1)*1.7;wt&&(Ke=ne.x!=null?ne.x:Ke),ne.x=Ke;let rt=Math.cos(C*.33+re*2.1)*1.7*.33,De={num:"",run:wt?0:.25,yaw:wt?0:Math.abs(rt)>.28?rt>0?Math.PI/2:-Math.PI/2:0};ne.k==="shout"?De.yell=1:ne.k==="cheer"?De.cel="jump":ne.k==="despair"?De.hands=1:ne.k==="argue"?(De.yell=1,De.yaw=re?-Math.PI/2:Math.PI/2):ne.k==="clap"&&(De.arms="up"),i.fig(ge,!1,z,Ke,Vc,De);let At=dt.get(z);At&&At.bones.Head&&au(At,we.gl||0)}let g=S.rc||"#111827",X=i.team({c1:g,c2:"#0b0f24",pat:"plain",col:"#0b0f24",slv:g,sho:"#0b0f24",soc:"#0b0f24"},g),W=S.sub;if(i.fig(X,!1,"off4",lu,Vc-.3,{num:"",run:0,yaw:0,arms:W?"up":""}),W){let re=rA(W.out,W.inn);M.add(re),re.position.set(lu,2.42,Vc-.18),re.rotation.set(0,0,0)}}let Wc=new Map;i.mgrFig=function(E,S,C,_){if(!P||!E)return;let T="mgrp:"+s.hash(JSON.stringify(E));Wc.set(T,su(T,E)),i.fig(ru(E),!1,T,S,C,Object.assign({num:"",run:0},_||{}));let I=dt.get(T);I&&I.bones.Head&&au(I,E.gl||0)};function cA(E){let S=As();[-1,1].forEach(T=>{let I=T*10.6;S.box(6.8,1.75,.12,"#0f172a",I,.88,-38.75),S.box(.1,1.75,1.1,"#0f172a",I-3.4,.88,-38.2),S.box(.1,1.75,1.1,"#0f172a",I+3.4,.88,-38.2),S.box(6.4,.42,.5,"#334155",I,.21,-38.4)});let C=new ze(S.geo(),new Mi({vertexColors:!0}));E.add(C);let _=new Ot({color:10467273,transparent:!0,opacity:.3,roughness:.1,metalness:.2,depthWrite:!1});[-1,1].forEach(T=>{let I=new ze(new un(6.9,.06,1.25),_);I.position.set(T*10.6,1.78,-38.2),E.add(I)});{let I=cu,F=I- -46.5,g=(-46.5+I)/2,X=As();X.box(.18,2.7,F,"#0f172a",-2.1,1.35,g),X.box(.18,2.7,F,"#0f172a",2.1,1.35,g),X.box(4.4,.16,F,"#111827",0,2.75,g),X.box(4,.02,F,"#1f2937",0,.011,g);for(let ne=0;ne<5;ne++){let ye=-46.5+F*(ne+.5)/5;X.box(4.5,.12,.14,"#1e293b",0,2.86,ye)}E.add(new ze(X.geo(),new Mi({vertexColors:!0})));let W=new rn({color:2282478,toneMapped:!1}),re=new rn({color:16723349,toneMapped:!1}),we=new ze(new na(2.25,.07,6,28,Math.PI),W);we.position.set(0,.6,I+.05),E.add(we),[-2.25,2.25].forEach(ne=>{let ye=new ze(new un(.14,.62,.14),re);ye.position.set(ne,.31,I+.05),E.add(ye)});let ge=new ze(new ei(4,2.7),new rn({color:131848}));ge.position.set(0,1.35,-46.5+.05),E.add(ge);let z=new ze(new ei(3.6,.08),new rn({color:14742270,toneMapped:!1}));z.rotation.x=Math.PI/2,z.position.set(0,2.66,g),E.add(z)}return!0}let ni=0,Ea=0,ks=0,lA=ni,hu=E=>{u.shadow.mapSize.set(E,E),u.shadow.map&&(u.shadow.map.dispose(),u.shadow.map=null)},Qs=!1,hA=E=>{E>.022&&!Qs?(Ea++,ks=0):(Ea=Math.max(0,Ea-1),E<.019||Qs?ks++:ks=Math.max(0,ks-3)),Ea>=90?(Ea=0,ks=0,ni<4?(ni++,ni===2&&hu(512),ni>=3&&(u.castShadow=!1)):Qs=!0):ks>=720&&(ks=0,Qs?Qs=!1:ni>lA&&(ni===3?u.castShadow=e!=="low":ni===2&&hu(n.sh),ni--))};i.cap30=()=>Qs,i.tier=e,i.q=()=>ni;let ii={e:null,a:null,f:40,v:null},uA=new Ze;function fA(E,S){let C=Math.min(.1,(S-b)/1e3);b=S,d.dt=C,d.now=S,d.n++,d.n>30&&hA(C);let _=E.step(C,S);if(!_)return;let T=o.clientWidth||300,I=o.clientHeight||200,F=Math.min(window.devicePixelRatio||1,ni>=4?.75:ni?Math.min(1,n.pr):n.pr);a.getPixelRatio()!==F&&a.setPixelRatio(F);let g=a.getSize(uA);(g.x!==T||g.y!==I)&&a.setSize(T,I,!1);{let ne=new $e(_.eye[0],_.eye[1],_.eye[2]),ye=new $e(_.at[0],_.at[1],_.at[2]),wt=!ii.e||E!==ii.v||ii.e.distanceTo(ne)>9||ii.a.distanceTo(ye)>12,Ke=wt?1:1-Math.exp(-C*14);wt?(ii.e=ne.clone(),ii.a=ye.clone(),ii.f=_.fov||40,ii.v=E):(ii.e.lerp(ne,Ke),ii.a.lerp(ye,Ke),ii.f+=((_.fov||40)-ii.f)*Ke),l.fov=ii.f,l.aspect=T/I,l.near=.1,l.position.copy(ii.e),l.lookAt(ii.a),l.updateProjectionMatrix()}M.clear(),i._world=null,Fe=gt(),v&&v.frameStart(),E.draw(),v&&v.ok&&v.blobs();let X=!!i._world;fn(C,X),On(X),Aa(X);for(let ne of c.children)ne!==h&&ne!==u&&ne!==u.target&&!ne.isLight&&(ne.visible=M.has(ne));c.fog.density=X?(_.fog==null?.0026:_.fog*.75)*te.fogK:0,a.toneMappingExposure=X?te.exp:1.08,X||(u.color.setRGB(1,.95,.89),u.intensity=2.6),X?a.setClearColor(329231,1):_.bg?a.setClearColor(new We().setRGB(_.bg[0],_.bg[1],_.bg[2],Pt),0):a.setClearColor(461592,0),h.intensity=X?te.hemi:1;let W=new $e(_.at[0],0,_.at[2]),re=l.position.distanceTo(W),we=vn(re*.75,5,48);X?u.position.copy(W).addScaledVector(te.dir,70):u.position.set(W.x+26,60,W.z+34),u.target.position.copy(W);let ge=u.shadow.camera;ge.left=-we,ge.right=we,ge.top=we,ge.bottom=-we,ge.updateProjectionMatrix();let z=ni>=2?16:n.near;for(let ne of qe){if(!M.has(ne.root))continue;if(ne.mh){v.lod(ne,ni);continue}let ye=(ne.dist||0)>z;if(ne.hi&&(ne.hi.visible=!ye),ne.lo&&(ne.lo.visible=ye),ne.cloth){let wt=!!(ne.style&&ne.style.mgr);for(let Ke of ne.cloth)Ke.visible=!ye&&(Ke.userData.layer===3?wt:!(wt&&Ke.userData.layer===2))}}a.render(c,l)}i.run=function(E,S){if(!P||!E||!O()||A)return!1;if(S._err=0,o.parentNode!==E&&E.appendChild(o),!f){b=performance.now();let C=()=>{if(r.be!=="b3"){f=null;return}let _=performance.now(),T=r.view;if(!T||!document.body.contains(o)||T.alive&&!T.alive()){f=null,T&&T.end&&T.end(),r.view===T&&(r.view=null);return}if(Qs&&_-p<31){f=requestAnimationFrame(C);return}p=_;try{fA(T,_)}catch(I){(i._errs=i._errs||[]).push(String(I&&I.stack||I).slice(0,300)),T._err++||console.warn("3D",I),T._err>5&&(r.view=null,m++)}f=requestAnimationFrame(C)};f=requestAnimationFrame(C)}return!0},i.stop=function(){o&&o.parentNode&&o.parentNode.removeChild(o)};let xa=null;return i.portrait=function(E,S,C,_,T,I){if(!P||!E||!E._b3)return null;T=T||720,I=I||900;let F=document.createElement("canvas");F.width=T,F.height=I;let g;try{g=new Zr({canvas:F,antialias:!0,alpha:!0,preserveDrawingBuffer:!0})}catch{return null}try{g.outputColorSpace=Pt,g.toneMapping=Cc,g.toneMappingExposure=1.05,g.setClearColor(0,0);let X=new ws;try{let Ke=new Cs(g);X.environment=Ke.fromScene(new ao,.04).texture,Ke.dispose()}catch{}let W=new Hi(16773600,2.6);W.position.set(-1.2,2.6,2.2),X.add(W);let re=new Hi(10475775,2.2);re.position.set(1.6,2.2,-1.8),X.add(re);let we=new Hi(14202110,1.1);we.position.set(-1.8,1.6,-1.5),X.add(we),X.add(new $a(13358591,1777459,.55));let ge=v&&v.ok&&v.isPlayer(String(C));ge?v.port||(v.port=v.getChar("__port"),v.port.port=!0,v.byId.delete("__port")):xa||(xa=at(),c.remove(xa.root),qe.splice(qe.indexOf(xa),1));let z=ge?v.port:xa;if(X.add(z.root),z.dk=null,ge){z.root.visible=!0;let Ke="";try{Ke=String(s.nameOf(String(C))||"").toUpperCase().slice(0,16)}catch{}z.lk=de(String(C)),z.lkId=String(C),v.frameStart(),v.dist=0,z.dist=0,v.lod(z,0),v.dress(z,E,S,String(C),_,z.lk,Ke),v.frameStart(),v.dress(z,E,S,String(C),_,z.lk,Ke)}else xe(z,E,S,String(C),_);z.lo&&(z.lo.visible=!1),z.hi&&(z.hi.visible=!0);for(let Ke of z.cloth||[])Ke.visible=Ke.userData.layer!==3;for(let[Ke,rt]of z.mod)Ke.quaternion.copy(rt);z.mod.clear();for(let Ke in z.act)z.act[Ke].setEffectiveWeight(Ke==="idle"?1:0);z.mixer.setTime(.9),z.root.position.set(0,0,0),z.root.rotation.set(0,-.32,0),z.root.scale.setScalar(Qc*(z.hgt||1)),z.root.updateMatrixWorld(!0),Ue(z,"Head",lt,.18),Ue(z,"neck_01",lt,.08),z.FU.uExpr.value.set(.35,.15,0,0),z.root.updateMatrixWorld(!0);let ne=new $e;z.bones.Head.getWorldPosition(ne);let ye=new _n(24,T/I,.05,20);ye.position.set(ne.x-.05,ne.y+.26,ne.z+1.75),ye.lookAt(ne.x+.02,ne.y-.06,ne.z),g.render(X,ye),g.render(X,ye);let wt=F.toDataURL("image/png");X.remove(z.root),ge&&c.add(z.root);for(let[Ke,rt]of z.mod)Ke.quaternion.copy(rt);return z.mod.clear(),z.FU.uExpr.value.set(0,0,0,0),z.dk=null,wt}catch(X){return console.warn("3D portrait",X),null}finally{try{g.dispose(),g.forceContextLoss()}catch{}}},i.shoulders=()=>{let E=new $e,S=new $e,C=new $e,_=H;_.updateMatrixWorld(!0),_.getObjectByName("upperarm_l").getWorldPosition(E),_.getObjectByName("upperarm_r").getWorldPosition(S),_.getObjectByName("Head").getWorldPosition(C);let T=_.getObjectByName("root")||_,I=new $e;return T.getWorldPosition(I),{w:E.distanceTo(S),ratio:E.distanceTo(S)/(C.y-I.y)}},i.poseCheck=function(){let E=[],S=(C,_)=>{let T=new $e;return C.bones[_].getWorldPosition(T),T};for(let C of qe){if(C.lastN<d.n-1||!C.bones.Head)continue;let _=new $e(1,0,0).applyQuaternion(C.root.quaternion);for(let T of["l","r"]){let I=S(C,"upperarm_"+T),F=S(C,"lowerarm_"+T),g=S(C,"hand_"+T),X=S(C,"thigh_"+T),W=S(C,"calf_"+T),re=S(C,"foot_"+T),we=F.clone().sub(I).normalize(),ge=g.clone().sub(F).normalize(),z=Math.acos(vn(we.dot(ge),-1,1))*57.3,ne=W.clone().sub(X).normalize(),ye=re.clone().sub(W).normalize(),wt=Math.acos(vn(ne.dot(ye),-1,1))*57.3,Ke=new $e().crossVectors(ne,ye).dot(_);z>160&&E.push([C.id,"elbow_"+T,Math.round(z)]),wt>150&&E.push([C.id,"knee_"+T,Math.round(wt)]),Ke<0&&wt>12&&E.push([C.id,"knee_back_"+T,Math.round(wt)])}}return E},i.dbg=()=>({looks:qe.filter(E=>E.lastN>=d.n-1).map(E=>E.mh?[E.id,E.hstyle,"#"+E.hair.material.color.getHexString(),"mh",E.cur]:[E.id,E.hstyle,"#"+E.hairMat.color.getHexString(),E.bodyU.uHairS.value,E.bodyU.uBeard.value]),mh:v&&v.ok?v.stats():null,q:ni,cam:l.position.toArray().map(E=>+E.toFixed(1)),p0:qe.filter(E=>E.lastN>=d.n-1).slice(0,3).map(E=>[E.id,E.root.position.toArray().map(S=>+S.toFixed(1)),E.root.visible,E.mh?E.cur:E.hi&&E.hi.visible,E.lo&&E.lo.visible,+(E.dist||0).toFixed(1)]),chars:qe.length,used:qe.filter(E=>E.lastN>=d.n-1).length,n:d.n,world:!!i._world,errs:i._errs||[]}),i.info=()=>a?{calls:a.info.render.calls,tris:a.info.render.triangles,geos:a.info.memory.geometries,tex:a.info.memory.textures,progs:(a.info.programs||[]).length}:null,i.at=()=>({up:te.up,gold:te.gold,ov:te.ov,wet:te.wet,snow:te.snow,fog:te.fog,wind:te.wind,glow:te.glow,crowd:{st:gn.st.slice(),jp:gn.jp.slice(),ar:gn.ar.slice(),wave:gn.wave,tifo:gn.tifo},ball:zc,mgr:qe.filter(E=>E.lastN>=d.n-1&&/^mgr/.test(E.id)).length,board:!!(Vi&&M.has(Vi)),atm:!!Fe}),i.ready=!1,J}window.W3D={load:EE,version:5};
