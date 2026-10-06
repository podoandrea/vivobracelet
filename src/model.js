// VIVO 3D viewer. Classic script: three.js is imported from the CDN (see the import map in index.html),
// model and Draco decoder come from src/model-data.js so the page works from file:// too.
(() => {
let THREE, GLTFLoader, DRACOLoader, RoomEnvironment;
const fallbackImage = 'img/componenti.jpg';
const words = {
  it: ['Cassa e cinturino','Bobina wireless','Ricevitore wireless','Sensori ottici','Batteria Li-Po','Scheda ESP32-S3','Display LCD','Vetro protettivo'],
  en: ['Case & strap','Wireless coil','Wireless receiver','Optical sensors','Li-Po battery','ESP32-S3 board','LCD display','Protective glass']
};
const getLang=()=>document.documentElement.lang==='en'?'en':'it';
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
let modelPromise;
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.onload = resolve; s.onerror = () => reject(new Error('Cannot load ' + src));
    document.head.append(s);
  });
}
function toBuffer(base64) {
  const bin = atob(base64), out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}
function loadModel() {
  if (!modelPromise) {
    modelPromise = (async () => {
      if (!window.VIVO_MODEL_DATA) await loadScript('src/model-data.js');
      const data = window.VIVO_MODEL_DATA;
      const wasm = toBuffer(data.dracoWasm);
      const draco = new DRACOLoader().setWorkerLimit(2);
      // Serve the decoder from the embedded data instead of the network.
      draco._loadLibrary = url => Promise.resolve(url.endsWith('.wasm') ? wasm : data.dracoWrapper);
      try { return await new GLTFLoader().setDRACOLoader(draco).parseAsync(toBuffer(data.glb), ''); }
      finally { draco.dispose(); }
    })();
  }
  return modelPromise;
}

function makeViewer(host, interactive, gltf) {
  const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=.95;
  host.append(renderer.domElement);
  const scene=new THREE.Scene();
  const pmrem=new THREE.PMREMGenerator(renderer);
  const room=new RoomEnvironment();
  const environment=pmrem.fromScene(room,.04);
  scene.environment=environment.texture;
  scene.environmentIntensity=.65;
  room.dispose(); pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff,0x777768,.9));
  const key=new THREE.DirectionalLight(0xfff5e6,2);key.position.set(5,15,10);scene.add(key);
  const fill=new THREE.DirectionalLight(0xffffff,1);fill.position.set(-10,5,-5);scene.add(fill);
  const model=gltf.scene.clone(true);
  model.scale.setScalar(100);
  // Shared geometry is retained; materials are cloned so glass can be tuned safely.
  model.traverse(object => {
    if(!object.isMesh) return;
    const tune=source => {
      const material=source.clone();
      if(/vetro|glass/i.test(material.name)) { material.transparent=true;material.opacity=.12;material.depthWrite=false;material.transmission=0; }
      if(/silicone/i.test(material.name)) material.roughness=.72;
      if(/Red_Inlay|Display_Red_Ring|ECG_/.test(object.name)) { material.color.set('#cf453b');material.roughness=.5; }
      if(/ECG_|Heart_Rate_Arc/.test(object.name)) { material.emissive.set('#cf453b');material.emissiveIntensity=.35; }
      return material;
    };
    object.material=Array.isArray(object.material)?object.material.map(tune):tune(object.material);
  });
  scene.add(model);
  const camera=new THREE.OrthographicCamera(-12,12,12,-12,.1,150);
  const layers=[];
  model.traverse(object => { if(/^component_[0-7]$/.test(object.name)) layers[Number(object.name.at(-1))]={object,base:object.position.clone()}; });
  if(layers.filter(Boolean).length!==8) throw new Error('The bracelet must contain eight component groups.');
  let visible=false, frame=0,lastTime=0,amount=0,target=0,hover=false,pinned=false,suppressHover=false,width=1,height=1;
  // Hero: entrance spin, idle sway and a gentle tilt towards the pointer.
  let intro=motion.matches?1:0,px=0,py=0,tx=0,ty=0;
  if(!interactive && matchMedia('(hover: hover)').matches) {
    addEventListener('pointermove',e=>{tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1;},{passive:true});
  }
  const stage=interactive ? host.closest('.model-stage') : null;
  const button=document.querySelector('#explodeBtn');
  const state=document.querySelector('#modelState');
  const labels=[];
  const lines=[];
  const centers=layers.map(({object})=> {
    model.updateMatrixWorld(true);
    return object.worldToLocal(new THREE.Box3().setFromObject(object).getCenter(new THREE.Vector3()));
  });
  // The base's centre follows the watch face, not the long lower strap.
  centers[0].set(0,.006,0);
  const point=new THREE.Vector3();
  // Keep an assembled silhouette for hit testing while the visible pieces move away.
  // Neither the canvas rectangle nor the annotation area can start the animation.
  const hitModel=interactive ? model.clone(true) : null;
  const hitCamera=interactive ? camera.clone() : null;
  if(interactive) {
    hitModel.rotation.y=-.3;
    hitModel.updateMatrixWorld(true);
    hitCamera.position.set(12,19,32);
    hitCamera.lookAt(0,1.8,0);
    hitCamera.updateMatrixWorld();
  }
  if(interactive) {
    const labelHost=stage.querySelector('.model-labels');
    const svg=stage.querySelector('.model-connectors');
    layers.forEach((_,i)=> {
      const label=document.createElement('div');label.className='model-label';
      label.innerHTML=`<i>0${8-i}</i><span></span>`;label.style.setProperty('--i',String(7-i));labelHost.append(label);labels.push(label);
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');dot.setAttribute('r','2');
      svg.append(path,dot);lines.push({path,dot});
    });
    button.disabled=false;
    stage.querySelector('.model-loading').hidden=true;
    const syncText=()=> {
      const en=getLang()==='en';
      labels.forEach((label,i)=>label.querySelector('span').textContent=words[getLang()][i]);
      button.querySelector('span').textContent=target ? (en?'Reassemble':'Ricomponi') : (en?'Explode view':'Scomponi');
      state.textContent=target ? (en?'Components revealed':'Componenti in vista') : (en?'Assembled':'Assemblato');
    };
    const setTarget=()=> {
      target=Number(pinned || (hover&&!suppressHover));
      stage.classList.toggle('is-exploded',Boolean(target));
      if(target) stage.classList.add('was-opened');
      stage.dataset.state=target?'exploded':'assembled';
      button.setAttribute('aria-pressed',String(Boolean(target)));
      host.setAttribute('aria-pressed',String(Boolean(target)));
      syncText();wake();
    };
    const raycaster=new THREE.Raycaster();
    const pointer=new THREE.Vector2();
    const hits=[];
    host.addEventListener('pointermove',e=> {
      if(e.pointerType!=='mouse' || !matchMedia('(hover: hover)').matches)return;
      const rect=host.getBoundingClientRect();
      pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
      hits.length=0;
      raycaster.setFromCamera(pointer,hitCamera);
      raycaster.intersectObject(hitModel,true,hits);
      if(!hits.length && target) {
        raycaster.setFromCamera(pointer,camera);
        raycaster.intersectObject(model,true,hits);
      }
      const nextHover=hits.length>0;
      host.style.cursor=nextHover?'pointer':'default';
      if(nextHover!==hover) {
        hover=nextHover;
        if(!hover)suppressHover=false;
        setTarget();
      }
    });
    host.addEventListener('pointerleave',()=> { hover=false;suppressHover=false;host.style.cursor='default';setTarget(); });
    const toggle=()=> { pinned=!target;suppressHover=!pinned;setTarget(); };
    button.addEventListener('click',toggle);
    // Touch screens: tapping the bracelet opens and closes it too.
    host.addEventListener('click',()=> { if(!matchMedia('(hover: hover)').matches) toggle(); });
    host.addEventListener('keydown',e=> {
      if((e.key==='Enter'||e.key===' ')&&!e.repeat) { e.preventDefault();toggle(); }
    });
    stage.addEventListener('keydown',e=> { if(e.key==='Escape') { pinned=false;suppressHover=true;setTarget(); } });
    document.addEventListener('vivo:language',()=> {syncText();wake();});
    setTarget();
  }
  function resize() {
    width=host.clientWidth;height=host.clientHeight;
    if(!width || !height) return;
    renderer.setSize(width,height,false);
    const aspect=width/height;
    const viewHeight=interactive ? (width<440?Math.max(38,12540/width):width<620?31:22) : Math.max(23,23/aspect);
    // An off-centre frustum leaves a dedicated column to the right for all eight names.
    const horizontalOffset=interactive ? viewHeight*aspect*.23 : 0;
    camera.left=-viewHeight*aspect/2+horizontalOffset;camera.right=viewHeight*aspect/2+horizontalOffset;
    camera.top=viewHeight/2;camera.bottom=-viewHeight/2;camera.updateProjectionMatrix();
    if(hitCamera) {
      hitCamera.left=camera.left;hitCamera.right=camera.right;
      hitCamera.top=camera.top;hitCamera.bottom=camera.bottom;
      hitCamera.updateProjectionMatrix();
    }
    wake();
  }
  function placeLabels() {
    if(!interactive || amount<.01)return;
    const top=host.offsetTop;
    const labelTop=92, labelRange=stage.clientHeight-212;
    layers.forEach(({object},i)=> {
      point.copy(centers[i]);object.localToWorld(point);point.project(camera);
      const x=(point.x*.5+.5)*width,y=(-point.y*.5+.5)*height+top;
      const label=labels[i];
      const ly=labelTop+(7-i)/7*labelRange;
      const lx=Math.round(width*(width<440?.54:.58));
      label.style.top=`${ly}px`;label.style.left=`${lx}px`;label.style.right='auto';
      const endY=ly+label.offsetHeight/2;
      lines[i].path.setAttribute('d',`M${x.toFixed(1)},${y.toFixed(1)} L${lx-16},${endY} H${lx}`);
      lines[i].dot.setAttribute('cx',String(x));lines[i].dot.setAttribute('cy',String(y));
    });
  }
  function draw(now) {
    frame=0;
    if(!visible || document.hidden)return;
    const dt=THREE.MathUtils.clamp((now-lastTime)/1000,0,.05);lastTime=now;
    amount=motion.matches ? target : THREE.MathUtils.damp(amount,target,5.5,dt);
    if(Math.abs(amount-target)<.001) amount=target;
    layers.forEach(({object,base},i)=> {object.position.copy(base);object.position.y+=i*.017*amount;});
    if(interactive) {
      model.rotation.y=-.3;model.rotation.z=0;
      camera.position.set(12,19-amount*5,32);camera.lookAt(0,1.8+amount*4.6,0);
    } else {
      const still=motion.matches;
      intro=still?1:THREE.MathUtils.damp(intro,1,2.2,dt);
      px=THREE.MathUtils.damp(px,tx,2.6,dt);py=THREE.MathUtils.damp(py,ty,2.6,dt);
      const ease=1-Math.pow(1-intro,3);
      model.rotation.y=-.45+(still?0:Math.sin(now*.00042)*.16)+px*.3-(1-ease)*1.4;
      model.rotation.z=-.13+py*.05;
      model.rotation.x=py*.06;
      model.scale.setScalar(100*(.84+.16*ease));
      camera.position.set(10,28,20);camera.lookAt(0,1,0);
      model.position.y=still?0:Math.sin(now*.0007)*.2;
    }
    model.updateMatrixWorld(true);camera.updateMatrixWorld();
    renderer.render(scene,camera);placeLabels();
    stage?.setAttribute('data-progress',amount.toFixed(3));
    if((!interactive&&!motion.matches) || amount!==target) frame=requestAnimationFrame(draw);
  }
  function wake() {if(visible&&!frame&&!document.hidden){lastTime=performance.now();frame=requestAnimationFrame(draw);}}
  const observer=new IntersectionObserver(entries=> {visible=entries[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'80px'});
  observer.observe(host);new ResizeObserver(resize).observe(host);resize();
  document.addEventListener('visibilitychange',wake);
  motion.addEventListener('change',wake);
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(frame);frame=0;});
  renderer.domElement.addEventListener('webglcontextrestored',wake);
  host.dataset.loaded='true';
}

async function initModels() {
  const libs = await Promise.all([
    import('three'),
    import('three/addons/loaders/GLTFLoader.js'),
    import('three/addons/loaders/DRACOLoader.js'),
    import('three/addons/environments/RoomEnvironment.js')
  ]);
  THREE = libs[0]; GLTFLoader = libs[1].GLTFLoader; DRACOLoader = libs[2].DRACOLoader; RoomEnvironment = libs[3].RoomEnvironment;
  const gltf=await loadModel();
  const hero=document.querySelector('#heroModel');
  const anatomy=document.querySelector('#anatomyModel');
  // Initialise independently, so one canvas cannot prevent the other from working.
  for(const [host,interactive] of [[hero,false],[anatomy,true]]) {
    try { makeViewer(host,interactive,gltf); }
    catch(error) {
      console.error('VIVO model:',error);
      if(interactive) { document.querySelector('.model-loading').textContent=getLang()==='en'?'3D unavailable. Read the component list alongside.':'3D non disponibile. Consulta i componenti nell’elenco accanto.'; }
      else {host.innerHTML=`<img src="${fallbackImage}" alt="VIVO Bracelet" style="height:100%;width:100%;object-fit:contain;mix-blend-mode:multiply">`;}
    }
  }
}
window.VIVO_initModels = initModels;
})();
