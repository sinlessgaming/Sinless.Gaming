#!/bin/bash
# Builds app.js from src/ (base + modules, in this exact order). Output: dist/app.js (comment lines removed).
# Rule: never put a // comment after code on the same line (the slim step only drops whole // lines) — use /* */.
cd "$(dirname "$0")"; mkdir -p dist; cp src/base.src.js dist/app.src.js
for f in a_nav a_fix b_chat b_squad c_tourn d_games e_content f_safety g_growth h_final i_v55 j_v551 k_news l_v57 m_simple n_v58 o_v59 p_v60 q_v61 r_w11; do cat src/$f.js >> dist/app.src.js; done
cp dist/app.src.js dist/chk.mjs && node --check dist/chk.mjs || exit 1
python3 -c "src=open('dist/app.src.js').read().split('\n'); open('dist/app.js','w').write('\n'.join(l.strip() for l in src if not l.strip().startswith('//')))"
# 11 Wonders: the shared core (src/w11core.js) goes into BOTH w11.js and worker.js, so phones and the worker always agree
python3 -c "c=open('src/w11core.js').read(); g=open('src/w11g4.js').read(); w=open('src/w11.js').read(); e=open('src/w11eng.js').read(); g5=open('src/w11g5.js').read(); assert '/*@@CORE@@*/' in w and '/*@@G4@@*/' in w and '/*@@ENG@@*/' in w and '/*@@G5@@*/' in w; open('dist/w11.js','w').write(w.replace('/*@@CORE@@*/', c).replace('/*@@ENG@@*/', e).replace('/*@@G4@@*/', g).replace('/*@@G5@@*/', g5))"
cat worker/worker.js src/w11core.js worker/w11worker.js worker/w11g3.js worker/w11g3b.js worker/w11g4.js worker/w11g5.js > dist/worker.js
cp dist/w11.js dist/chk11.js && node --check dist/chk11.js || exit 1
cp dist/worker.js dist/chkw.mjs && node --check dist/chkw.mjs || exit 1
rm -f dist/chk11.js dist/chkw.mjs dist/chk.mjs
# G4b real 3D: bundle src3d/w3d.js + Three.js into dist/w3d.js (needs: cd tools3d && npm i). The .glb files come from tools3d/make_assets.mjs.
if [ -d tools3d/node_modules ]; then node tools3d/build_w3d.mjs || exit 1; cp assets3d/w3d-player.glb assets3d/w3d-anims.glb dist/ 2>/dev/null; fi
echo built
