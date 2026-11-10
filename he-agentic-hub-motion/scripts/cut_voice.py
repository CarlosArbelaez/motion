# Corta las frases de la locución desde las tomas en assets/audio/voice/source_takes (ejecutar desde esa carpeta).
# Los cortes y fundidos caen siempre dentro de silencios: inicio = voz - 0,08 s; fin = voz + 0,15 s.
import subprocess, numpy as np, json, sys
SR=48000
def load(f):
    raw=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar',str(SR),'-f','f32le','-'],capture_output=True).stdout
    return np.frombuffer(raw,dtype='<f4').astype(np.float64)
# (nombre, toma, ventana aproximada [ini, fin] en s)
LINES=[('vo1','v3A.mp3',0.0,7.9),('vo2','v4A.mp3',0.0,5.68),('vo3','v2A.mp3',12.2,17.35),('vo4','v3B.mp3',7.75,18.56),
       ('vo5','v2A.mp3',27.7,34.1),('vo6','v2A.mp3',34.1,38.8),('vo7','v2A.mp3',38.8,43.1),('vo8','v2A.mp3',43.1,45.12)]
cache={}; out={}
for name,src,a,b in LINES:
    x=cache.setdefault(src,load(src)); n=len(x)
    seg=x[int(a*SR):min(n,int(b*SR))]
    w=int(0.01*SR)
    rms=np.array([np.sqrt(np.mean(seg[i:i+w]**2)) for i in range(0,len(seg)-w,w)])
    db=20*np.log10(rms+1e-9)
    act=np.where(db>-50)[0]
    s=a+act[0]*0.01; e=a+(act[-1]+1)*0.01
    cs=max(0,s-0.08); ce=min(n/SR,e+0.15)
    # comprueba que el margen previo/posterior es silencio
    pre=x[int(cs*SR):int(s*SR)]; post=x[int(e*SR):int(ce*SR)]
    pk=lambda y: 20*np.log10(np.max(np.abs(y))+1e-9) if len(y) else -120
    out[name]=dict(src=src,speech=[round(s,3),round(e,3)],cut=[round(cs,3),round(ce,3)],pre_peak=round(pk(pre),1),post_peak=round(pk(post),1))
    d=ce-cs; fo=max(0,d-0.1)
    subprocess.run(['ffmpeg','-v','error','-y','-ss',str(cs),'-t',str(round(d,3)),'-i',src,'-af',f'asetpts=PTS-STARTPTS,afade=t=in:d=0.04,afade=t=out:st={fo:.3f}:d=0.1','-ar','48000','-ac','1',f'{name}_raw.wav'],check=True)
print(json.dumps(out,indent=1))
