'use client';
import {useEffect,useRef,useState} from "react";
import {Heart,Home,ListMusic,Pause,Play,Search,SkipBack,SkipForward,Sparkles,Volume2} from "lucide-react";

const tracks=[
 {title:"Midnight City",artist:"M83",emoji:"🌃",url:"https://audio.com/"},
 {title:"After Dark",artist:"Mr.Kitty",emoji:"🌙",url:"https://audio.com/"},
 {title:"The Less I Know The Better",artist:"Tame Impala",emoji:"🪩",url:"https://audio.com/"},
 {title:"505",artist:"Arctic Monkeys",emoji:"🚬",url:"https://audio.com/"}
];

export default function HomePage(){
 const audio=useRef<HTMLAudioElement>(null);
 const [index,setIndex]=useState(0),[playing,setPlaying]=useState(false),[query,setQuery]=useState(""),[answer,setAnswer]=useState(""),[loading,setLoading]=useState(false),[progress,setProgress]=useState(0),[volume,setVolume]=useState(1);
 const current=tracks[index];
 useEffect(()=>{if(audio.current)audio.current.volume=volume},[volume]);
 function toggle(){const el=audio.current;if(!el)return;if(playing)el.pause();else el.play().catch(()=>{});setPlaying(!playing)}
 function next(){setIndex(i=>(i+1)%tracks.length);setPlaying(false)}
 function prev(){setIndex(i=>(i-1+tracks.length)%tracks.length);setPlaying(false)}
 async function ask(e:React.FormEvent){e.preventDefault();if(!query.trim())return;setLoading(true);setAnswer("");try{const r=await fetch("/api/agent",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:query})});const d=await r.json();setAnswer(d.text||d.error||"No answer.")}catch{setAnswer("The agent face-planted. Check the server.")}finally{setLoading(false)}}
 return <div className="shell"><audio ref={audio} src={current.url} onTimeUpdate={e=>setProgress(e.currentTarget.duration?e.currentTarget.currentTime/e.currentTarget.duration*100:0)} onEnded={next}/>
  <div className="main"><aside className="side"><div className="brand">stupid<span>.fm</span></div><nav className="nav"><button className="active"><Home size={16}/> Home</button><button><Search size={16}/> Search</button><button><ListMusic size={16}/> Queue</button><button><Heart size={16}/> Liked</button></nav><div style={{marginTop:"auto",color:"#555",fontSize:11}} className="mono">NO ADS. NO FUSS.<br/>JUST PLAY.</div></aside>
  <main className="content"><div className="hero"><div className="eyebrow">AI-NATIVE RADIO</div><h1>Tell it what<br/>you want to hear.</h1><form className="search" onSubmit={ask}><Search size={20} color="#777"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder='Try “something dreamy for a 2am drive”'/><button>{loading?"THINKING":"ASK AI"}</button></form>{answer&&<div style={{background:"#121212",border:"1px solid #292929",borderRadius:14,padding:18,marginTop:-34,marginBottom:34,color:"#ccc"}}><Sparkles size={15} color="#d7ff3f"/> <span style={{marginLeft:8}}>{answer}</span></div>}</div>
  <section className="section"><h2>Start somewhere</h2><div className="cards">{tracks.map((t,i)=><button className="card" key={t.title} onClick={()=>{setIndex(i);setPlaying(true);setTimeout(()=>audio.current?.play().catch(()=>{}),0)}}><div className="art">{t.emoji}</div><b>{t.title}</b><small>{t.artist}</small></button>)}</div></section></main></div>
  <footer className="player"><div className="now"><div className="thumb">{current.emoji}</div><div><b>{current.title}</b><small style={{display:"block",color:"#777"}}>{current.artist}</small></div></div><div className="controls"><button onClick={prev}><SkipBack size={18}/></button><button className="play" onClick={toggle}>{playing?<Pause size={18}/>:<Play size={18} fill="currentColor"/>}</button><button onClick={next}><SkipForward size={18}/></button></div><div className="right"><Volume2 size={16}/><input aria-label="volume" type="range" min="0" max="1" step=".01" value={volume} onChange={e=>setVolume(+e.target.value)}/></div><div className="progress"><i style={{width:progress+"%"}}/></div></footer>
 </div>
}