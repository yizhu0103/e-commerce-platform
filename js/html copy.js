document.addEventListener("DOMContentLoaded", () => {
    // 執行
    const carousel = new transformCarousel({
        container: document.getElementById('contianer'),
        images: [
            'https://images.unsplash.com/photo-1677414455821-b2409b641629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1464&q=80',
            'https://images.unsplash.com/photo-1677414456254-60a547cca6af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80',
            'https://images.unsplash.com/photo-1677160353677-2f82845e64ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80',
            'https://images.unsplash.com/photo-1677414456254-60a547cca6af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80',
            'https://images.unsplash.com/photo-1677160353677-2f82845e64ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80'
        ]
    });
    var swiper = new Swiper(".swiper", {
        autoplay: true,
        on: {
            slideChange: (event) => {
                carousel.next(event.realIndex);
            }
        }
    });
});
const dispUrl = 'https://i.imgur.com/MPNBV6a.jpeg';
const vertex = 'varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}';
const fragment = `
    uniform float time;
    uniform float progress;
    uniform float intensity;
    uniform float width;
    uniform float scaleX;
    uniform float scaleY;
    uniform float transition;
    uniform float radius;
    uniform float swipe;
    uniform sampler2D texture1;
    uniform sampler2D texture2;
    uniform sampler2D displacement;
    uniform vec4 resolution;
    varying vec2 vUv;
    mat2 getRotM(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
    }
    const float PI = 3.1415;
    const float angle1 = PI *0.25;
    const float angle2 = -PI *0.75;
    void main()	{
        vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

        vec4 disp = texture2D(displacement, newUV);
        vec2 dispVec = vec2(disp.r, disp.g);

        vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
        vec4 t1 = texture2D(texture1, distortedPosition1);

        vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
        vec4 t2 = texture2D(texture2, distortedPosition2);

        gl_FragColor = mix(t1, t2, progress);
    }
`;
export class transformCarousel {
    constructor(
    // 外部功能設定
    DATA) {
        this.DATA = DATA;
        this.slideTextures = [];
        // 初始數值
        this.totalImgslength = this.DATA.images.length;
        this.currentIdx = 0;
        this.uniforms = { value: 1, type: 'f', min: 0.0, max: 3 };
        this.width = this.DATA.container.offsetWidth;
        this.height = this.DATA.container.offsetHeight;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0x000000, 1);
        THREE.Cache.enabled = true; // https://threejs.org/docs/#api/zh/loaders/Cache
        this.DATA.container.appendChild(this.renderer.domElement);
        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.001, 1000);
        this.camera.position.set(0, 0, 2);
        this.init();
    }
    resize() {
        this.width = this.DATA.container.offsetWidth;
        this.height = this.DATA.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        // 這裡的寬高不是隨便都拿得到的喔
        let imageAspect = this.slideTextures[0].image.height / this.slideTextures[0].image.width;
        let a1, a2;
        if (this.height / this.width > imageAspect) {
            a1 = (this.width / this.height) * imageAspect;
            a2 = 1;
        }
        else {
            a1 = 1;
            a2 = this.height / this.width / imageAspect;
        }
        this.material.uniforms.resolution.value.x = this.width;
        this.material.uniforms.resolution.value.y = this.height;
        this.material.uniforms.resolution.value.z = a1;
        this.material.uniforms.resolution.value.w = a2;
        this.camera.fov = 2 * (180 / Math.PI) * Math.atan(1 / (2 * this.camera.position.z));
        this.plane.scale.x = this.camera.aspect;
        this.plane.scale.y = 1;
        this.camera.updateProjectionMatrix();
    }
    init() {
        // 圖片讀取
        const manager = new THREE.LoadingManager();
        this.DATA.images.forEach((url, idx) => {
            const imgLoader = new THREE.TextureLoader(manager);
            this.slideTextures[idx] = imgLoader.load(url);
        });
        manager.onLoad = () => {
            this.createPlane();
            this.resize();
            this.render();
            // listeners
            window.addEventListener('resize', this.resize.bind(this));
        };
    }
    next(idx) {
        if (idx !== this.currentIdx) {
            this.currentIdx = idx;
            this.changeSlide(this.currentIdx);
        }
    }
    createPlane() {
        this.material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable'
            },
            side: THREE.DoubleSide,
            uniforms: {
                time: { type: 'f', value: 0 },
                progress: { type: 'f', value: 0 },
                border: { type: 'f', value: 0 },
                intensity: { type: 'f', value: 1 },
                scaleX: { type: 'f', value: 40 },
                scaleY: { type: 'f', value: 40 },
                transition: { type: 'f', value: 40 },
                swipe: { type: 'f', value: 0 },
                width: { type: 'f', value: 0 },
                radius: { type: 'f', value: 0 },
                texture1: { type: 'f', value: this.slideTextures[0] },
                texture2: { type: 'f', value: this.slideTextures[1] },
                displacement: {
                    type: 'f',
                    value: new THREE.TextureLoader().load(dispUrl)
                },
                resolution: { type: 'v4', value: new THREE.Vector4() }
            },
            vertexShader: vertex,
            fragmentShader: fragment
        });
        const geometry = new THREE.PlaneGeometry(1, 1, 2, 2);
        this.plane = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.plane);
    }
    changeSlide(idx) {
        const gsapTimeline = gsap.timeline();
        const nextTexture = this.slideTextures[idx];
        this.material.uniforms.texture2.value = nextTexture;
        gsapTimeline.to(this.material.uniforms.progress, 1, // duration
        {
            value: 1,
            ease: 'power2.out',
            onComplete: () => {
                this.material.uniforms.texture1.value = nextTexture;
                this.material.uniforms.progress.value = 0;
            }
        });
    }
    render() {
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
