const TEMPLATES: Record<string, string> = {
  landing: `function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">LaunchPad</div>
        <div className="hidden md:flex gap-6 text-sm text-gray-300">
          <a href="#" className="hover:text-white">Features</a>
          <a href="#" className="hover:text-white">Pricing</a>
          <a href="#" className="hover:text-white">About</a>
          <button className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg font-medium">Get Started</button>
        </div>
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </nav>
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-32 max-w-4xl mx-auto">
        <div className="inline-block bg-violet-500/20 text-violet-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">🚀 Now in Public Beta</div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">Build faster.<br/>Ship smarter.</h1>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl">The all-in-one platform that helps teams ship products 10x faster. No config, no hassle, just results.</p>
        <div className="flex gap-4">
          <button className="bg-violet-600 hover:bg-violet-500 px-8 py-3 rounded-xl font-semibold text-lg transition">Start Free</button>
          <button className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-xl font-semibold text-lg transition">Watch Demo</button>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20 max-w-6xl mx-auto">
        {[{icon:"⚡",title:"Lightning Fast",desc:"Sub-second builds with intelligent caching and parallel processing."},
          {icon:"🎨",title:"Beautiful Defaults",desc:"Stunning UI out of the box. Customize everything when you need to."},
          {icon:"🔒",title:"Enterprise Security",desc:"SOC2 compliant. Your data is encrypted at rest and in transit."}
        ].map(f => (
          <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 transition">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}`,

  dashboard: `function App() {
  const [active, setActive] = useState("Overview");
  const nav = ["Overview","Analytics","Projects","Settings"];
  const stats = [{l:"Revenue",v:"$48,295",c:"+12.5%",g:true},{l:"Users",v:"2,847",c:"+8.2%",g:true},{l:"Orders",v:"1,234",c:"-3.1%",g:false},{l:"Conversion",v:"3.24%",c:"+1.8%",g:true}];
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <aside className="w-56 bg-gray-900 border-r border-gray-800 p-4 flex flex-col">
        <div className="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-8">Dashboard</div>
        {nav.map(n => <button key={n} onClick={() => setActive(n)} className={"text-left px-3 py-2 rounded-lg mb-1 text-sm " + (active===n?"bg-violet-600 text-white":"text-gray-400 hover:text-white hover:bg-gray-800")}>{n}</button>)}
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Welcome back, Coach 👋</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.l} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="text-gray-400 text-sm mb-1">{s.l}</div>
              <div className="text-2xl font-bold">{s.v}</div>
              <div className={"text-sm mt-1 "+(s.g?"text-green-400":"text-red-400")}>{s.c}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="font-semibold mb-4">Recent Activity</h2>
          {[{a:"New user registered",t:"2 min ago"},{a:"Payment received $1,200",t:"15 min ago"},{a:"Project deployed",t:"1 hr ago"},{a:"Team member added",t:"3 hrs ago"}].map((r,i) => (
            <div key={i} className="flex justify-between py-3 border-b border-gray-800 last:border-0">
              <span className="text-gray-300">{r.a}</span><span className="text-gray-500 text-sm">{r.t}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}`,

  todo: `function App() {
  const [todos, setTodos] = useState([{id:1,text:"Build the landing page",done:false},{id:2,text:"Set up CI/CD pipeline",done:true},{id:3,text:"Design mobile mockups",done:false}]);
  const [input, setInput] = useState("");
  const add = () => { if(!input.trim()) return; setTodos([...todos,{id:Date.now(),text:input,done:false}]); setInput(""); };
  const toggle = (id) => setTodos(todos.map(t => t.id===id?{...t,done:!t.done}:t));
  const del = (id) => setTodos(todos.filter(t => t.id!==id));
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">✅ Todo App</h1>
        <div className="flex gap-2 mb-6">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Add a task..." className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"/>
          <button onClick={add} className="bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-medium">Add</button>
        </div>
        <div className="space-y-2">
          {todos.map(t => (
            <div key={t.id} className={"flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 "+(t.done?"opacity-50":"")}>
              <button onClick={()=>toggle(t.id)} className={"w-5 h-5 rounded-full border-2 flex items-center justify-center "+(t.done?"bg-violet-600 border-violet-600":"border-gray-600")}>{t.done&&"✓"}</button>
              <span className={"flex-1 "+(t.done?"line-through text-gray-500":"")}>{t.text}</span>
              <button onClick={()=>del(t.id)} className="text-gray-500 hover:text-red-400">✕</button>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-gray-500 text-sm">{todos.filter(t=>!t.done).length} tasks remaining</div>
      </div>
    </div>
  );
}`,

  ecommerce: `function App() {
  const [cart, setCart] = useState([]);
  const products = [{id:1,name:"Wireless Headphones",price:99,image:"🎧",rating:4.8},{id:2,name:"Smart Watch",price:249,image:"⌚",rating:4.6},{id:3,name:"Bluetooth Speaker",price:79,image:"🔊",rating:4.7},{id:4,name:"Laptop Stand",price:49,image:"💻",rating:4.5},{id:5,name:"USB-C Hub",price:39,image:"🔌",rating:4.4},{id:6,name:"Mechanical Keyboard",price:129,image:"⌨️",rating:4.9}];
  const addCart = (p) => setCart([...cart, p]);
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="text-xl font-bold">ShopVibe</div>
        <div className="relative">🛒 {cart.length>0&&<span className="absolute -top-2 -right-2 bg-violet-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">{cart.length}</span>}</div>
      </nav>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Featured Products</h1>
        <p className="text-gray-400 mb-8">Handpicked tech essentials</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/50 transition">
              <div className="text-5xl text-center mb-4">{p.image}</div>
              <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
              <div className="text-yellow-400 text-sm mb-3">{"★".repeat(Math.floor(p.rating))} {p.rating}</div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{'$'+p.price}</span>
                <button onClick={()=>addCart(p)} className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg text-sm font-medium">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,

  chat: `function App() {
  const [msgs, setMsgs] = useState([{from:"bot",text:"Hey! I'm Vibe ⚡ How can I help you today?"}]);
  const [input, setInput] = useState("");
  const send = () => { if(!input.trim()) return; setMsgs([...msgs,{from:"user",text:input}]); setInput(""); setTimeout(()=>setMsgs(m=>[...m,{from:"bot",text:"That's a great question! Let me think about that... 🤔"}]),800); };
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg h-[600px] flex flex-col bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-sm">⚡</div>
          <div><div className="font-semibold text-sm">Vibe Assistant</div><div className="text-xs text-green-400">Online</div></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {msgs.map((m,i) => (
            <div key={i} className={"flex "+(m.from==="user"?"justify-end":"justify-start")}>
              <div className={"max-w-[75%] px-4 py-2 rounded-2xl text-sm "+(m.from==="user"?"bg-violet-600 text-white":"bg-gray-800 text-gray-200")}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-800 flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type a message..." className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"/>
          <button onClick={send} className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-xl text-sm font-medium">Send</button>
        </div>
      </div>
    </div>
  );
}`,

  login: `function App() {
  const [mode, setMode] = useState("login");
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">⚡</div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to continue</p>
        </div>
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
          <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
            <button onClick={()=>setMode("login")} className={"flex-1 py-2 rounded-lg text-sm font-medium "+(mode==="login"?"bg-violet-600 text-white":"text-gray-400")}>Sign In</button>
            <button onClick={()=>setMode("signup")} className={"flex-1 py-2 rounded-lg text-sm font-medium "+(mode==="signup"?"bg-violet-600 text-white":"text-gray-400")}>Sign Up</button>
          </div>
          <div className="space-y-4">
            {mode==="signup"&&<input placeholder="Full Name" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"/>}
            <input placeholder="Email address" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"/>
            <input placeholder="Password" type="password" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"/>
            <button className="w-full bg-violet-600 hover:bg-violet-500 py-3 rounded-xl font-semibold text-lg">{mode==="login"?"Sign In":"Create Account"}</button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">or continue with</div>
          <div className="flex gap-3 mt-3">
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-2.5 rounded-xl text-sm">Google</button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-2.5 rounded-xl text-sm">GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}`,

  form: `function App() {
  const [form, setForm] = useState({name:"",email:"",subject:"",message:""});
  const [sent, setSent] = useState(false);
  const set = (k,v) => setForm({...form,[k]:v});
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-2 text-center">Get in Touch</h1>
        <p className="text-gray-400 mb-8 text-center">We'd love to hear from you</p>
        {sent ? (
          <div className="bg-green-900/30 border border-green-700 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
            <p className="text-gray-400">We'll get back to you soon.</p>
            <button onClick={()=>{setSent(false);setForm({name:"",email:"",subject:"",message:""});}} className="mt-4 text-violet-400 hover:text-violet-300 text-sm">Send another</button>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Name" value={form.name} onChange={e=>set("name",e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"/>
              <input placeholder="Email" value={form.email} onChange={e=>set("email",e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"/>
            </div>
            <input placeholder="Subject" value={form.subject} onChange={e=>set("subject",e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"/>
            <textarea placeholder="Your message..." rows={5} value={form.message} onChange={e=>set("message",e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 resize-none"/>
            <button onClick={()=>setSent(true)} className="w-full bg-violet-600 hover:bg-violet-500 py-3 rounded-xl font-semibold text-lg">Send Message</button>
          </div>
        )}
      </div>
    </div>
  );
}`,

  pricing: `function App() {
  const [annual, setAnnual] = useState(true);
  const plans = [{name:"Starter",price:annual?0:0,period:"Free forever",features:["5 projects","1GB storage","Community support"],cta:"Get Started",pop:false},{name:"Pro",price:annual?24:29,period:annual?"/mo billed yearly":"/mo",features:["Unlimited projects","50GB storage","Priority support","Custom domains","Analytics"],cta:"Start Free Trial",pop:true},{name:"Enterprise",price:annual?79:99,period:annual?"/mo billed yearly":"/mo",features:["Everything in Pro","Unlimited storage","24/7 phone support","SSO & SAML","Custom contracts"],cta:"Contact Sales",pop:false}];
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Simple Pricing</h1>
        <p className="text-gray-400 mb-8">No hidden fees. Cancel anytime.</p>
        <div className="inline-flex bg-gray-800 rounded-xl p-1 mb-12">
          <button onClick={()=>setAnnual(false)} className={"px-6 py-2 rounded-lg text-sm font-medium "+(!annual?"bg-violet-600":"text-gray-400")}>Monthly</button>
          <button onClick={()=>setAnnual(true)} className={"px-6 py-2 rounded-lg text-sm font-medium "+(annual?"bg-violet-600":"text-white")}>Annual <span className="text-green-400 text-xs">Save 20%</span></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div key={p.name} className={"rounded-2xl p-8 text-left "+(p.pop?"bg-violet-600 border-2 border-violet-400":"bg-gray-900 border border-gray-800")}>
              {p.pop&&<div className="text-xs font-bold bg-white/20 inline-block px-3 py-1 rounded-full mb-4">MOST POPULAR</div>}
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <div className="mb-6"><span className="text-4xl font-extrabold">{'$'+p.price}</span><span className="text-gray-300">{p.period}</span></div>
              <ul className="space-y-3 mb-8">{p.features.map(f=><li key={f} className="flex items-center gap-2 text-sm"><span className="text-green-400">✓</span>{f}</li>)}</ul>
              <button className={"w-full py-3 rounded-xl font-semibold "+(p.pop?"bg-white text-violet-600 hover:bg-gray-100":"bg-gray-800 hover:bg-gray-700")}>{p.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,

  portfolio: `function App() {
  const projects = [{title:"E-Commerce Platform",tag:"Web App",desc:"Full-stack marketplace with real-time inventory"},{title:"Fitness Tracker",tag:"Mobile App",desc:"AI-powered workout recommendations"},{title:"Brand Identity",tag:"Design",desc:"Complete visual system for tech startup"},{title:"Analytics Dashboard",tag:"Web App",desc:"Real-time data visualization platform"},{title:"Social Network",tag:"Mobile App",desc:"Community platform for creators"},{title:"SaaS Landing Page",tag:"Design",desc:"High-converting marketing website"}];
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="text-xl font-bold">Alex.dev</div>
        <div className="flex gap-6 text-sm text-gray-400"><a href="#" className="hover:text-white">Work</a><a href="#" className="hover:text-white">About</a><a href="#" className="hover:text-white">Contact</a></div>
      </nav>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">Creative<br/>Developer</h1>
        <p className="text-gray-400 text-lg max-w-lg mb-12">I build beautiful, performant digital experiences that make an impact.</p>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p,i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-violet-500/50 transition group">
              <div className="text-xs text-violet-400 font-medium mb-2">{p.tag}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition">{p.title}</h3>
              <p className="text-gray-400 text-sm">{p.desc}</p>
              <div className="mt-4 text-violet-400 text-sm font-medium">View Project →</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}`,

  counter: `function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">Simple Counter</h1>
        <div className="text-8xl font-extrabold mb-8 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">{count}</div>
        <div className="flex gap-4 justify-center">
          <button onClick={()=>setCount(count-1)} className="w-16 h-16 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-2xl text-2xl font-bold transition">-</button>
          <button onClick={()=>setCount(0)} className="px-6 h-16 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-2xl text-sm font-medium transition">Reset</button>
          <button onClick={()=>setCount(count+1)} className="w-16 h-16 bg-violet-600 hover:bg-violet-500 rounded-2xl text-2xl font-bold transition">+</button>
        </div>
      </div>
    </div>
  );
}`,

  weather: `function App() {
  const [unit, setUnit] = useState("C");
  const days = [{d:"Mon",icon:"☀️",hi:32,lo:24},{d:"Tue",icon:"⛅",hi:30,lo:22},{d:"Wed",icon:"🌧️",hi:28,lo:20},{d:"Thu",icon:"⛈️",hi:26,lo:19},{d:"Fri",icon:"☀️",hi:31,lo:23},{d:"Sat",icon:"🌤️",hi:33,lo:25},{d:"Sun",icon:"☀️",hi:34,lo:26}];
  const c = v => unit==="C"?v:Math.round(v*9/5+32);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-6">
        <div className="flex justify-between items-start mb-6">
          <div><div className="text-sm text-gray-300">Kuala Lumpur</div><div className="text-5xl font-light mt-1">{c(32)}°{unit}</div><div className="text-gray-300 mt-1">Sunny</div></div>
          <div className="text-6xl">☀️</div>
        </div>
        <div className="flex gap-2 mb-6">
          <button onClick={()=>setUnit("C")} className={"px-3 py-1 rounded-lg text-sm "+(unit==="C"?"bg-white/20":"text-gray-400")}>°C</button>
          <button onClick={()=>setUnit("F")} className={"px-3 py-1 rounded-lg text-sm "+(unit==="F"?"bg-white/20":"text-gray-400")}>°F</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map(d => (
            <div key={d.d} className="bg-white/5 rounded-xl py-3">
              <div className="text-xs text-gray-400">{d.d}</div>
              <div className="text-lg my-1">{d.icon}</div>
              <div className="text-sm font-medium">{c(d.hi)}°</div>
              <div className="text-xs text-gray-400">{c(d.lo)}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,

  blog: `function App() {
  const posts = [{title:"The Future of AI in 2026",excerpt:"Exploring how artificial intelligence is reshaping every industry and what it means for developers.",date:"Apr 24, 2026",tag:"AI",read:"5 min"},{title:"Building Scalable Apps with Next.js",excerpt:"A deep dive into server components, streaming, and the new patterns that make Next.js 15 powerful.",date:"Apr 20, 2026",tag:"Tutorial",read:"8 min"},{title:"Design Systems That Scale",excerpt:"How to create and maintain a design system that grows with your team and product.",date:"Apr 15, 2026",tag:"Design",read:"6 min"}];
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto">
        <div className="text-xl font-bold">The Blog</div>
        <div className="flex gap-4 text-sm text-gray-400"><a href="#" className="hover:text-white">Home</a><a href="#" className="hover:text-white">Archive</a><a href="#" className="hover:text-white">RSS</a></div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Latest Posts</h1>
        <p className="text-gray-400 mb-10">Thoughts on tech, design, and building products.</p>
        <div className="space-y-6">
          {posts.map((p,i) => (
            <article key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/50 transition cursor-pointer">
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-3"><span className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full text-xs">{p.tag}</span><span>{p.date}</span><span>· {p.read} read</span></div>
              <h2 className="text-xl font-bold mb-2">{p.title}</h2>
              <p className="text-gray-400">{p.excerpt}</p>
              <div className="mt-4 text-violet-400 text-sm font-medium">Read more →</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}`
};

const KEYWORDS: Record<string, string[]> = {
  landing: ["landing","hero","homepage","startpage","launch","startup","saas"],
  dashboard: ["dashboard","admin","analytics","panel","overview","metrics","stats"],
  todo: ["todo","task","checklist","to-do","list","reminder"],
  ecommerce: ["ecommerce","shop","store","product","cart","marketplace","catalog"],
  chat: ["chat","messenger","message","conversation","bot","chatbot"],
  login: ["login","signin","sign-in","auth","register","signup","sign-up","account"],
  form: ["form","contact","feedback","survey","input","submission"],
  pricing: ["pricing","plan","subscription","tier","package","billing"],
  portfolio: ["portfolio","personal","resume","cv","showcase","about"],
  counter: ["counter","number","increment","count","clicker"],
  weather: ["weather","forecast","temperature","climate"],
  blog: ["blog","article","post","news","content","writing"]
};

function matchTemplate(prompt: string): string {
  const lower = prompt.toLowerCase();
  for (const [template, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) {
      return TEMPLATES[template];
    }
  }
  return TEMPLATES.landing;
}

function applyEdits(code: string, prompt: string): string {
  const lower = prompt.toLowerCase();
  let result = code;

  // Color changes
  const colorMap: Record<string, [string, string]> = {
    "blue": ["violet","blue"], "red": ["violet","red"], "green": ["violet","green"],
    "orange": ["violet","orange"], "pink": ["violet","pink"], "cyan": ["violet","cyan"],
    "teal": ["violet","teal"], "indigo": ["violet","indigo"], "emerald": ["violet","emerald"],
    "amber": ["violet","amber"], "rose": ["violet","rose"], "sky": ["violet","sky"]
  };
  for (const [name, [from, to]] of Object.entries(colorMap)) {
    if (lower.includes(name)) {
      result = result.replace(new RegExp(from, "gi"), to);
    }
  }

  // Dark mode
  if (lower.includes("dark mode") || lower.includes("dark theme")) {
    result = result.replace(/bg-white/g, "bg-gray-900");
    result = result.replace(/bg-gray-50/g, "bg-gray-950");
    result = result.replace(/text-gray-900/g, "text-white");
    result = result.replace(/text-black/g, "text-white");
  }
  // Light mode
  if (lower.includes("light mode") || lower.includes("light theme") || lower.includes("white background")) {
    result = result.replace(/bg-gray-950/g, "bg-gray-50");
    result = result.replace(/bg-gray-900/g, "bg-white");
    result = result.replace(/text-white/g, "text-gray-900");
  }
  // Add gradient
  if (lower.includes("gradient")) {
    result = result.replace(/bg-gray-950/, 'bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950');
  }
  // Add shadow
  if (lower.includes("shadow")) {
    result = result.replace(/rounded-2xl/g, "rounded-2xl shadow-2xl shadow-violet-500/10");
  }

  return result;
}

export function generateCode(prompt: string, existingCode?: string): string {
  const lower = prompt.toLowerCase();

  // If there's existing code, try to edit it
  if (existingCode && existingCode.trim()) {
    const editKeywords = ["change","make","add","remove","replace","turn","switch","set","use","color","dark","light","gradient","shadow","blue","red","green","orange","pink","cyan","bigger","smaller","larger","font","bold","center"];
    if (editKeywords.some(k => lower.includes(k))) {
      return applyEdits(existingCode, prompt);
    }
  }

  return matchTemplate(prompt);
}
