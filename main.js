!function() {
    "use strict";
    let e, t, n, o, a, r, s, i, E, d, l, h, c = 1, w = "";
    const m = 1, R = new THREE.Layers();
    R.set(m);
    const T = {
        exposure: 2,
        bloomStrength: 2,
        bloomThreshold: 0,
        bloomRadius: 0
    }, H = new THREE.MeshBasicMaterial({
        color: "black"
    }), u = {}, p = new THREE.Vector3(), M = new THREE.Matrix4();
    let g = new THREE.Vector3();
    const f = new THREE.Euler();
    let b = new THREE.Quaternion();
    const y = new THREE.Vector3(1, 1, 1), S = new THREE.Vector3(0, 0, 0);
    new THREE.Matrix4(), new THREE.Vector3(0, 1, 0);
    function x(e, n, o) {
        let a = n.length, r = new THREE.InstancedMesh(i.geometry, i.material, a);
        r.castShadow = !0, b.set(0, 0, 0, 0);
        for (let t = 0; t < a; t++) {
            let a;
            p.set(n[t][0], n[t][1], n[t][2]), g = p, "ico" != o && "green" != o || (f.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI), 
            b.setFromEuler(f)), 1 != e && y.set(e, e, e), M.compose(g, b, y), a = "green" == o ? new THREE.Color().setHSL(THREE.MathUtils.randFloat(.25, .4), 1, .3) : new THREE.Color(16777215 * Math.random()), 
            r.setMatrixAt(t, M), r.setColorAt(t, a);
        }
        if ("bloom" == o) {
            setInterval(function() {
                r.layers.toggle(m), z();
            }, 1e3);
        }
        t.add(r);
    }
    function v() {
        const t = window.innerWidth, o = window.innerHeight;
        e.aspect = t / o, e.updateProjectionMatrix(), n.setSize(t, o), l.setSize(t, o), 
        h.setSize(t, o), z();
    }
    function P(e) {
        (e.isMesh || e.isInstancedMesh) && !1 === R.test(e.layers) && (u[e.uuid] = e.material, 
        e.material = H);
    }
    function C(e) {
        u[e.uuid] && (e.material = u[e.uuid], delete u[e.uuid]);
    }
    function I() {
        requestAnimationFrame(I), o.update(), d && d.moveAlongCurve(.002), z();
    }
    function z() {
        t.traverse(P), l.render(), t.traverse(C), h.render();
    }
    !function() {
        const m = document.createElement("div");
        document.body.appendChild(m), (t = new THREE.Scene()).background = 0, (n = new THREE.WebGLRenderer({
            antialias: !0
        })).setPixelRatio(window.devicePixelRatio), n.setSize(window.innerWidth, window.innerHeight), 
        n.outputEncoding = THREE.sRGBEncoding, n.shadowMap.enabled = !0, m.appendChild(n.domElement), 
        new THREE.TextureLoader().load("https://happy358.github.io/Images/HDR/leadenhall_market_1k_s.jpg", function(e) {
            e.mapping = THREE.EquirectangularReflectionMapping, t.environment = e;
        }), (e = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .01, 500)).position.set(0, .8, 20), 
        e.lookAt(0, 0, 0);
        const R = new THREE.RenderPass(t, e), H = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, .4, .85);
        H.threshold = T.bloomThreshold, H.strength = T.bloomStrength, H.radius = T.bloomRadius, 
        (l = new THREE.EffectComposer(n)).renderToScreen = !1, l.addPass(R), l.addPass(H);
        const u = new THREE.ShaderPass(new THREE.ShaderMaterial({
            uniforms: {
                baseTexture: {
                    value: null
                },
                bloomTexture: {
                    value: l.renderTarget2.texture
                }
            },
            vertexShader: document.getElementById("vertexshader").textContent,
            fragmentShader: document.getElementById("fragmentshader").textContent,
            defines: {}
        }), "baseTexture");
        u.needsSwap = !0, (h = new THREE.EffectComposer(n)).addPass(R), h.addPass(u);
        const M = new THREE.AmbientLight('rgba(199, 21, 133, 1)', .2);
        t.add(M);
        const g = [], f = [ {
            x: 2.8,
            y: -2.8,
            z: -2.8
        }, {
            x: 2.8,
            y: -2.8,
            z: 2.8
        }, {
            x: -2.8,
            y: -2.8,
            z: 2.8
        }, {
            x: -2.8,
            y: -2.8,
            z: -2.8
        } ];
        for (const e of f) {
            const t = new THREE.Object3D();
            t.position.copy(e), g.push(t);
        }
        const b = new THREE.CatmullRomCurve3(g.map(e => e.position));
        b.curveType = "catmullrom", b.tension = .8, b.closed = !0, new THREE.FontLoader().load("https://cdn.jsdelivr.net/npm/three@0.145.0/examples/fonts/helvetiker_bold.typeface.json", function(e) {
            (a = new THREE.TextGeometry("Feliz Natal", {
                font: e,
                size: 1,
                height: .1,
                curveSegments: 12
            })).rotateX(Math.PI), a.rotateY(-Math.PI), r = new THREE.MeshStandardMaterial({
                color: 'rgba(255, 0, 0, 0.5)'
            });
            const n = new THREE.Mesh(a, r);
            (d = new THREE.Flow(n)).updateCurve(0, b), t.add(d.object3D);
        }), a = new THREE.CylinderGeometry(0, 4, 10, 6, 1, !0);
        new THREE.Mesh(a, new THREE.MeshStandardMaterial({
            color: 16777215,
            metalness: .8,
            roughness: 0,
            wireframe: !0
        }));
        let y = [];
        r = new THREE.MeshBasicMaterial(), s = new THREE.Mesh(a, r);
        const P = new THREE.MeshSurfaceSampler(s).build();
        for (let e = 0; e < 730; e++) P.sample(p, S), y.push([ p.x, p.y, p.z ]);
        let C = 600, z = [ ...Array(C) ].map(() => y.splice(Math.floor(Math.random() * y.length), 1)[0]);
        C = 70;
        let A = [ ...Array(C) ].map(() => y.splice(Math.floor(Math.random() * y.length), 1)[0]);
        C = 20;
        let G = [ ...Array(C) ].map(() => y.splice(Math.floor(Math.random() * y.length), 1)[0]);
        r = new THREE.MeshStandardMaterial({
            metalness: .8,
            roughness: 0
        }), E = .2, a = new THREE.SphereGeometry(E, 20, 20), i = new THREE.Mesh(a, r), x(c = 1, y, "spere"), 
        E = .15, a = new THREE.IcosahedronGeometry(E, 0), i = new THREE.Mesh(a, r), x(c = 1, G, "ico"), 
        E = .1, a = new THREE.IcosahedronGeometry(E, 0), i = new THREE.Mesh(a, r), x(c = 1, z, "green"), 
        E = .08, a = new THREE.SphereGeometry(E, 10, 10), i = new THREE.Mesh(a, new THREE.MeshBasicMaterial()), 
        x(c = 1, A, "bloom");
        const B = [];
        for (let e = 0; e < 10; e++) {
            const t = e % 2 == 1 ? 1 : 2, n = e / 5 * Math.PI;
            B.push(new THREE.Vector2(Math.cos(n) * t, Math.sin(n) * t));
        }
        const k = new THREE.Shape(B);
        a = new THREE.ExtrudeGeometry(k, {
            depth: 0,
            steps: 1,
            bevelEnabled: !0,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: -.9,
            bevelSegments: 1
        }), (r = r.clone()).color.set("yellow"), r.side = THREE.DoubleSide;
        const L = new THREE.Mesh(a, r);
        L.position.y = 5.3, L.rotation.z = Math.PI / 5 / 2, c = .35, L.scale.set(c, c, c), 
        L.castShadow = !0, t.add(L);
        w = 16777215;
        const D = new THREE.PointLight(w, 1, 40, 3.8);
        D.castShadow = !0, D.shadow.bias = -.005, t.add(D), a = new THREE.BoxGeometry(50, 50, 50), 
        r = new THREE.MeshPhongMaterial({
            color: 16758465,
            shininess: 10,
            specular: 1118481,
            side: THREE.BackSide
        }), (s = new THREE.Mesh(a, r)).position.y = 19.2, s.receiveShadow = !0, t.add(s), 
        (o = new THREE.OrbitControls(e, n.domElement)).autoRotate = !0, o.autoRotateSpeed = 2, 
        o.enableDamping = !0, o.enablePan = !1, o.minDistance = 3, o.maxDistance = 28, o.minPolarAngle = 0, 
        o.maxPolarAngle = Math.PI / 2, o.target.set(0, 0, 0), o.update(), I(), window.addEventListener("resize", v);
    }();
}();