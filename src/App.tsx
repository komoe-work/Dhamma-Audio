import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppScreen, Meditation } from './types';

// Mock Data
const MOCK_MEDITATIONS: Meditation[] = [
  {
    id: '1',
    day: 45,
    title: 'Inner Stillness',
    duration: '12 min',
    category: 'Mindfulness',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-KWVKpCBEgFTNl8Qw3Aq7e3T-dus_DE0hyoJD8QHo62AiEinWOTHBCHNPkaPDA_82Yb65slohTvL0Fmzpj9nB1mlGQN8MvigL6oQU7VV4yA_YW_4BTIYj5P7q98by4L8CS7Z4VU6Q5JS54-BWJqyfwHzMycCjoD7xdfgvrFPbop9xIdVb-b5gBKXRtz0FDZlnSLiGgg7h94JwCkwvRb1fF9Yyugevv_UYcY0rGxv1fYxBfDMQVBODh8yi2E_ku2HTboVlWlQbzTba',
    audioUrl: '',
    completed: false
  },
  {
    id: '2',
    day: 44,
    title: 'Morning Dew',
    duration: '10 min',
    category: 'Focus',
    coverUrl: '',
    audioUrl: '',
    completed: true
  },
  {
    id: '3',
    day: 43,
    title: 'Rooted Earth',
    duration: '15 min',
    category: 'Zen',
    coverUrl: '',
    audioUrl: '',
    completed: true
  },
  {
    id: '4',
    day: 42,
    title: 'Cloud Walking',
    duration: '8 min',
    category: 'Ease',
    coverUrl: '',
    audioUrl: '',
    completed: true
  },
  {
    id: '5',
    day: 41,
    title: 'Ocean Breath',
    duration: '12 min',
    category: 'Flow',
    coverUrl: '',
    audioUrl: '',
    completed: true
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [activeMeditation, setActiveMeditation] = useState<Meditation | null>(MOCK_MEDITATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // PocketBase Mock State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handlePlayMeditation = (meditation: Meditation) => {
    setActiveMeditation(meditation);
    setCurrentScreen('player');
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Home 
              onOpenPlayer={() => setCurrentScreen('player')} 
              onOpenAdmin={() => setCurrentScreen('admin-login')}
              onPlayMeditation={handlePlayMeditation}
              activeMeditation={activeMeditation}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </motion.div>
        )}

        {currentScreen === 'player' && (
          <motion.div
            key="player"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50"
          >
            <Player 
              onClose={() => setCurrentScreen('home')} 
              meditation={activeMeditation}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </motion.div>
        )}

        {currentScreen === 'admin-login' && (
          <motion.div
            key="admin-login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <AdminLogin 
              onSuccess={() => setCurrentScreen('admin-portal')} 
              onCancel={() => setCurrentScreen('home')}
            />
          </motion.div>
        )}

        {currentScreen === 'admin-portal' && (
          <motion.div
            key="admin-portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AdminPortal onLogout={() => setCurrentScreen('home')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function Home({ onOpenPlayer, onOpenAdmin, onPlayMeditation, activeMeditation, isPlaying, setIsPlaying }: any) {
  return (
    <div className="pb-40">
      <header className="sticky top-0 w-full z-50 bg-stone-50/60 dark:bg-stone-900/60 backdrop-blur-xl flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Serenity Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 tracking-tighter font-headline">Serenity</span>
        </div>
        <button 
          onClick={onOpenAdmin}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-700/50 transition-colors active:scale-95 duration-200"
        >
          <span className="material-symbols-outlined text-emerald-900 dark:text-emerald-50">settings</span>
        </button>
      </header>

      <main className="px-6 pt-8 max-w-md mx-auto">
        <section className="mb-12">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary mb-6">Good morning, Alex</h1>
          <div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden group">
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="font-label text-secondary font-semibold uppercase tracking-widest text-[11px] mb-1">Current Journey</p>
                <h2 className="font-headline text-2xl font-bold text-primary">Mindful Year</h2>
                <p className="text-on-surface-variant text-sm mt-1">Consistency is the key to peace.</p>
              </div>
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-surface-container-highest" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="6"></circle>
                  <circle className="text-secondary" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="220" strokeWidth="6"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-headline font-bold text-lg text-primary leading-none">45</span>
                  <span className="text-[10px] text-on-surface-variant font-medium">OF 365</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-secondary-container/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        <section className="mb-16 flex flex-col items-center">
          <div className="w-48 h-48 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-2 border-primary-fixed-dim opacity-20 animate-ping"></div>
            <div className="w-32 h-32 rounded-full bg-primary-container shadow-xl flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-4xl">air</span>
            </div>
          </div>
          <p className="mt-6 font-headline text-lg font-medium text-primary">Take a deep breath</p>
        </section>

        <section className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-headline text-2xl font-bold text-primary">Your Progress</h3>
            <span className="font-label text-xs font-semibold text-secondary uppercase tracking-widest">View All</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {MOCK_MEDITATIONS.map((med, idx) => (
              <div 
                key={med.id}
                onClick={() => onPlayMeditation(med)}
                className={`${idx === 0 ? 'col-span-2 bg-primary-container text-on-primary' : 'bg-surface-container-low'} p-6 rounded-xl flex ${idx === 0 ? 'items-center justify-between' : 'flex-col justify-between h-40'} cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${idx === 0 ? 'bg-primary-fixed-dim/20' : 'bg-stone-100'} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined text-2xl ${idx === 0 ? 'text-on-primary' : 'text-stone-300'}`}>
                      {idx === 0 ? 'play_arrow' : med.day}
                    </span>
                  </div>
                  <div>
                    {idx === 0 && <p className="text-[10px] font-bold uppercase tracking-tighter opacity-80">Up Next</p>}
                    <h4 className={`font-headline ${idx === 0 ? 'text-lg' : 'text-base'} font-bold text-primary ${idx === 0 ? 'text-on-primary' : ''}`}>
                      {idx === 0 ? `Day ${med.day}: ${med.title}` : med.title}
                    </h4>
                    {idx !== 0 && <p className="text-xs text-on-surface-variant mt-1">{med.duration} • {med.category}</p>}
                  </div>
                </div>
                {idx === 0 ? (
                  <span className="text-xs font-medium opacity-70">{med.duration}</span>
                ) : (
                  <span className="material-symbols-outlined text-secondary">check_circle</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Mini Player */}
      {activeMeditation && (
        <div 
          onClick={onOpenPlayer}
          className="fixed bottom-24 left-4 right-4 z-40 bg-white/70 dark:bg-stone-900/70 backdrop-blur-2xl rounded-2xl p-4 shadow-xl border border-white/20 cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-stone-200">
              <img src={activeMeditation.coverUrl || "https://picsum.photos/seed/meditation/200"} alt="Meditation Cover" className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow overflow-hidden">
              <h6 className="font-headline font-bold text-primary truncate">{activeMeditation.title}</h6>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">04:22 / {activeMeditation.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-primary">replay_10</span>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-lg active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined">{isPlaying ? 'pause' : 'play_arrow'}</span>
              </button>
            </div>
          </div>
          <div className="mt-4 w-full h-1 bg-surface-variant rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-1/3 rounded-full"></div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center pb-8 pt-4 px-6 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-2xl rounded-t-[2rem] z-50 shadow-[0_-8px_32px_rgba(0,0,0,0.04)]">
        <a className="flex flex-col items-center justify-center bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 rounded-full px-5 py-2 active:scale-90 transition-transform" href="#">
          <span className="material-symbols-outlined">home</span>
          <span className="font-body text-[11px] font-semibold uppercase tracking-widest mt-1">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 px-5 py-2 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors" href="#">
          <span className="material-symbols-outlined">subscriptions</span>
          <span className="font-body text-[11px] font-semibold uppercase tracking-widest mt-1">Library</span>
        </a>
        <a className="flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 px-5 py-2 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors" href="#">
          <span className="material-symbols-outlined">leaderboard</span>
          <span className="font-body text-[11px] font-semibold uppercase tracking-widest mt-1">Stats</span>
        </a>
      </nav>
    </div>
  );
}

function Player({ onClose, meditation, isPlaying, setIsPlaying }: any) {
  return (
    <main className="relative h-screen w-full flex flex-col bg-gradient-to-b from-surface via-surface-container-low to-surface-container-high overflow-hidden">
      <header className="flex justify-between items-center px-8 py-8 z-50">
        <div className="flex flex-col">
          <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-outline">Currently Playing</span>
          <span className="font-headline font-bold text-primary tracking-tighter">Serenity</span>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-highest/40 backdrop-blur-md text-on-surface active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      <section className="flex-grow flex flex-col items-center justify-center px-8 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[120%] h-[60%] bg-primary-fixed-dim/20 rounded-[100%] blur-[120px]"></div>
        </div>
        
        <div className="relative flex items-center justify-center mb-16">
          <div className="absolute w-72 h-72 rounded-full border border-primary-fixed-dim/30 animate-pulse"></div>
          <div className="absolute w-64 h-64 rounded-full bg-primary-fixed-dim/10 backdrop-blur-sm breath-ring"></div>
          <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center shadow-2xl overflow-hidden relative group">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM7PugbRGf4-KNyYL0nx68yylzR6O59tr0bsAh49cuqEIuKIZgmvOZFQYwRISVspriSNpiYqPBFAHMf_X55mwFh1CP_WTq_IeEms8auuQTNmQokO-n9-zp7TCkgdEQOnm5WQTqIUO_XaQGN2v0nIUTuiZcfxFXaBocaqW4enSVu7XhtzVAgBI5aSHqJyb5jB1jJHH3vLNvKv_QuU9KGd8j-WvlMPkW5WoOU73QS91FbJ2YDzkNCAI_HlPL0pBjd3kGzSQapZfbpopX" 
              alt="Background"
            />
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              <span className="material-symbols-outlined text-surface-container-lowest text-4xl mb-2">spa</span>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 mb-20 relative z-10">
          <h1 className="font-headline text-4xl font-bold text-on-surface tracking-tight">{meditation?.title || 'Inner Peace'}</h1>
          <p className="font-body text-outline text-lg font-medium opacity-80">{meditation?.category || 'Mindfulness Meditation'} • {meditation?.duration || '15 min'}</p>
        </div>

        <div className="w-full max-w-md px-4 space-y-4 mb-12 relative z-10">
          <div className="relative w-full h-1 bg-surface-variant rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[65%] bg-primary rounded-full"></div>
          </div>
          <div className="flex justify-between items-center text-[11px] font-label font-semibold text-outline tracking-widest uppercase">
            <span>09:42</span>
            <span>{meditation?.duration || '15:00'}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-10 relative z-10 mb-8">
          <button className="text-primary hover:text-primary-container active:scale-90 transition-all p-2">
            <span className="material-symbols-outlined text-4xl">replay_5</span>
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container text-surface shadow-[0_8px_32px_rgba(23,51,39,0.25)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-5xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
          </button>
          <button className="text-primary hover:text-primary-container active:scale-90 transition-all p-2">
            <span className="material-symbols-outlined text-4xl">forward_5</span>
          </button>
        </div>
      </section>

      <footer className="px-8 pb-12 pt-4 flex flex-col items-center gap-6 relative z-10">
        <div className="flex items-center justify-center gap-12 text-on-surface-variant">
          <button className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">favorite</span>
            <span className="text-[10px] font-label font-bold uppercase tracking-widest">Save</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">speed</span>
            <span className="text-[10px] font-label font-bold uppercase tracking-widest">1.0x</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">equalizer</span>
            <span className="text-[10px] font-label font-bold uppercase tracking-widest">Audio</span>
          </button>
        </div>
        <div className="w-12 h-1.5 bg-surface-container-highest rounded-full"></div>
      </footer>
    </main>
  );
}

function AdminLogin({ onSuccess, onCancel }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for PocketBase auth
    console.log('Logging in with:', email, password);
    onSuccess();
  };

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-fixed/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-fixed/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <main className="w-full max-w-[440px] px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 bg-surface-container-highest flex items-center justify-center rounded-2xl mb-6 editorial-shadow">
            <span className="material-symbols-outlined text-primary text-3xl">lock</span>
          </div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface mb-2">Admin Portal</h1>
          <p className="font-body text-on-surface-variant text-sm tracking-tight opacity-70">Sign in to manage serenity content</p>
        </div>

        <div className="bg-surface/60 backdrop-blur-2xl border border-white/20 rounded-xl p-8 editorial-shadow space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-label text-xs font-semibold uppercase tracking-widest text-secondary pl-1" htmlFor="email">Admin Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px] group-focus-within:text-primary transition-colors">mail</span>
                </div>
                <input 
                  className="w-full bg-surface-container-low border-transparent focus:border-primary/20 focus:ring-0 rounded-lg pl-12 pr-4 py-4 font-body text-sm text-on-surface placeholder:text-outline/50 transition-all" 
                  id="email" 
                  type="email" 
                  placeholder="admin@serenity.app" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label text-xs font-semibold uppercase tracking-widest text-secondary pl-1" htmlFor="password">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px] group-focus-within:text-primary transition-colors">lock_open</span>
                </div>
                <input 
                  className="w-full bg-surface-container-low border-transparent focus:border-primary/20 focus:ring-0 rounded-lg pl-12 pr-12 py-4 font-body text-sm text-on-surface placeholder:text-outline/50 transition-all" 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-primary transition-colors" type="button">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>
            <button className="w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-base rounded-lg editorial-shadow transform active:scale-[0.98] transition-all hover:brightness-110" type="submit">
              Secure Login
            </button>
          </form>
          <div className="text-center">
            <button onClick={onCancel} className="font-label text-[12px] text-on-surface-variant hover:text-primary transition-colors tracking-tight">Back to App</button>
          </div>
        </div>
      </main>

      <footer className="mt-20 flex flex-col items-center justify-center space-y-4 w-full py-12">
        <div className="flex items-center space-x-2 text-stone-400">
          <span className="material-symbols-outlined text-[16px]">verified_user</span>
          <p className="font-body text-[12px] tracking-wide uppercase opacity-80">Secured by Pocketbase</p>
        </div>
        <div className="flex space-x-6">
          <a className="font-body text-[12px] tracking-wide uppercase text-stone-400 hover:text-emerald-600 transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
          <a className="font-body text-[12px] tracking-wide uppercase text-stone-400 hover:text-emerald-600 transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

function AdminPortal({ onLogout }: any) {
  const [title, setTitle] = useState('');
  const [day, setDay] = useState('');
  const [category, setCategory] = useState('Meditation');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Placeholder for PocketBase upload
    setTimeout(() => {
      console.log('Uploaded:', { title, day, category });
      setIsUploading(false);
      alert('Upload successful!');
    }, 2000);
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex overflow-hidden">
      <aside className="hidden md:flex flex-col h-full w-72 bg-stone-50 dark:bg-stone-950 rounded-r-3xl shadow-2xl z-40 transition-all duration-300">
        <div className="flex flex-col h-full py-8">
          <div className="px-8 mb-10 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-highest">
              <img alt="Admin Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjL9gGsWpi0sSN9PQEQlR9bd901KEBzy0G-uKZjufjwPwlGQo0rUpPIu5DJxYdp-ysUoUr2AnOK0vB8s2CLIytV30dFKUCYW4Rq6yI0dRIhbEQOSnnssdOTK8_F3uV_r2y3w-Qk3yJItV94nV8qL8P0Pa0ogx3HNmNzTuhxOr4Cjm1NXaVg5ZlR72EhYY6dm3-cd1tUgHnhSrwqTtV4to5E1rZLrVIKQlHny7n5HT3NQxKgQETzRDsUjJDtwE8QpLWYw4YV-o1yTpi" />
            </div>
            <div>
              <h2 className="font-headline text-xl font-black text-emerald-950 dark:text-emerald-50 tracking-tighter">Admin Portal</h2>
              <p className="text-sm text-stone-500 font-medium">Content Management</p>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            <a className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100 font-bold rounded-xl m-2 px-4 py-3 flex items-center space-x-3 transition-all duration-300" href="#">
              <span className="material-symbols-outlined">cloud_upload</span>
              <span className="font-headline text-base">Upload</span>
            </a>
            <a className="text-stone-600 dark:text-stone-400 m-2 px-4 py-3 flex items-center space-x-3 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-all duration-300" href="#">
              <span className="material-symbols-outlined">history</span>
              <span className="font-headline text-base">History</span>
            </a>
            <a className="text-stone-600 dark:text-stone-400 m-2 px-4 py-3 flex items-center space-x-3 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-all duration-300" href="#">
              <span className="material-symbols-outlined">leaderboard</span>
              <span className="font-headline text-base">Stats</span>
            </a>
            <a className="text-stone-600 dark:text-stone-400 m-2 px-4 py-3 flex items-center space-x-3 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-all duration-300" href="#">
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span className="font-headline text-base">Settings</span>
            </a>
          </nav>
          <div className="px-8 mt-auto pt-8 border-t border-stone-100 dark:border-stone-800">
            <button onClick={onLogout} className="flex items-center space-x-2 text-stone-400 hover:text-error transition-colors">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label text-sm font-semibold uppercase tracking-widest">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto no-scrollbar relative">
        <header className="sticky top-0 w-full z-30 bg-stone-50/60 dark:bg-stone-900/60 backdrop-blur-xl flex justify-between items-center px-10 py-6">
          <h1 className="font-headline text-2xl font-bold text-emerald-900 dark:text-emerald-100 tracking-tighter">Serenity</h1>
          <div className="flex items-center space-x-6">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-700/50 transition-colors">
              <span className="material-symbols-outlined text-stone-500">notifications</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-700/50 transition-colors">
              <span className="material-symbols-outlined text-stone-500">settings</span>
            </button>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-10 pt-12 pb-24">
          <div className="mb-16">
            <h2 className="font-headline text-5xl font-extrabold text-primary tracking-tight mb-4">Audio Upload</h2>
            <p className="text-stone-500 max-w-lg text-lg leading-relaxed">Expand the Serenity library. Upload high-fidelity guided meditations and soundscapes for our community.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-12 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant hover:border-primary-fixed-dim transition-colors group cursor-pointer relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-primary text-4xl">upload_file</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">Drag & Drop Audio File Here</h3>
                <p className="text-stone-500 font-medium">MP3, WAV, or FLAC (Max 100MB)</p>
                <button className="mt-8 px-8 py-3 bg-surface-container-highest text-on-surface font-headline font-bold rounded-xl hover:bg-surface-container-high transition-colors">
                  Browse Files
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col justify-between h-full">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="font-label text-xs font-bold uppercase tracking-widest text-secondary">Audio Title</label>
                    <input 
                      className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary transition-all placeholder:text-stone-400 font-body text-on-surface" 
                      placeholder="e.g. Morning Forest Rain" 
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-xs font-bold uppercase tracking-widest text-secondary">Library Placement (Day)</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary transition-all appearance-none font-body text-on-surface cursor-pointer"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                      >
                        <option disabled value="">Select Day (1-365)</option>
                        <option value="1">Day 001 - Awakening</option>
                        <option value="2">Day 002 - Soft Focus</option>
                        <option value="3">Day 003 - Inner River</option>
                        <option value="45">Day 045 - Inner Stillness</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">keyboard_arrow_down</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-xs font-bold uppercase tracking-widest text-secondary">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {['Meditation', 'Nature', 'Sleep'].map(cat => (
                        <button 
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`px-4 py-2 ${category === cat ? 'bg-primary-fixed text-primary' : 'bg-stone-100 text-stone-500'} font-bold text-xs rounded-full transition-colors`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full mt-10 py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline text-lg font-bold rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">{isUploading ? 'sync' : 'database'}</span>
                  <span>{isUploading ? 'Uploading...' : 'Upload to Database'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-3xl font-bold text-emerald-900 tracking-tight">Recent Uploads</h3>
              <button className="text-secondary font-label text-xs font-bold uppercase tracking-widest flex items-center space-x-2">
                <span>View History</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="bg-surface-container-low rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-highest/50">
                    <th className="px-8 py-4 font-label text-xs font-bold uppercase tracking-widest text-stone-500">Title</th>
                    <th className="px-8 py-4 font-label text-xs font-bold uppercase tracking-widest text-stone-500">Day</th>
                    <th className="px-8 py-4 font-label text-xs font-bold uppercase tracking-widest text-stone-500">Status</th>
                    <th className="px-8 py-4 font-label text-xs font-bold uppercase tracking-widest text-stone-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  <tr className="hover:bg-surface-container-highest/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-emerald-800">music_note</span>
                        </div>
                        <span className="font-headline font-bold text-on-surface">Evening Ember Glow</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-stone-500 font-medium">Day 042</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2 text-emerald-700 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                        <span className="text-xs font-bold uppercase tracking-widest">Completed</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-stone-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="h-32"></div>
        </section>
      </main>
    </div>
  );
}
