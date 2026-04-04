import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LockKey, EnvelopeSimple, User as UserIcon } from '@phosphor-icons/react';
import { useAppContext } from '../../context/AppContext';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, login, user, logout } = useAppContext();
  
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [step, setStep] = useState('credentials'); // 'credentials' | 'verifying' | 'code' | 'loading_login'
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!authModalOpen) return null;

  const handleAction = () => {
    if (step === 'credentials') {
      if (!email || !password || (tab === 'register' && !name)) {
        setError('Пожалуйста, заполните все поля');
        return;
      }
      if (email === 'admin') {
        setStep('loading_login');
        setTimeout(() => {
          login('admin', 'admin123');
          setAuthModalOpen(false);
          setStep('credentials');
        }, 800);
        return;
      }
      
      setError('');
      setStep('verifying');
      setTimeout(() => {
        setStep('code');
      }, 800);

    } else if (step === 'code') {
      if (code.length !== 4) {
        setError('Код подтверждения состоит из 4 цифр');
        return;
      }
      
      setError('');
      setStep('loading_login');
      setTimeout(() => {
        login(email, password);
        setAuthModalOpen(false);
        setStep('credentials');
        setTab('login');
        setName('');
        setEmail('');
        setPassword('');
        setCode('');
      }, 800);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div 
          key="modal"
          initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#0a0a0a] border border-white/10 p-10 w-full max-w-md relative shadow-2xl flex flex-col"
        >
          <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
          
          {user ? (
            <div className="text-center py-8">
              <h2 className="text-xl font-bold mb-2">Авторизировано</h2>
              <div className="text-white mb-8 tracking-widest text-sm font-mono mt-4 border border-white/10 p-4 bg-[#111]">
                {user.email} <br/><span className="text-[10px] text-gray-500 mt-2 block">Разрешения: {user.role.toUpperCase()}</span>
              </div>
              <button 
                onClick={() => { logout(); setAuthModalOpen(false); setStep('credentials'); setTab('login'); }}
                className="w-full bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-4 uppercase text-xs tracking-[0.2em] font-bold hover:bg-red-500/20 transition-colors"
              >
                Выйти из аккаунта
              </button>
            </div>
          ) : (
            <>
              {step === 'credentials' && (
                <div className="flex border-b border-white/10 mb-8 mt-2">
                  <button 
                    onClick={() => { setTab('login'); setError(''); }} 
                    className={`flex-1 pb-4 uppercase text-xs font-bold tracking-[0.1em] transition-colors ${tab === 'login' ? 'border-b-2 border-white text-white' : 'text-gray-600 hover:text-gray-400'}`}
                  >
                    Вход
                  </button>
                  <button 
                    onClick={() => { setTab('register'); setError(''); }} 
                    className={`flex-1 pb-4 uppercase text-xs font-bold tracking-[0.1em] transition-colors ${tab === 'register' ? 'border-b-2 border-white text-white' : 'text-gray-600 hover:text-gray-400'}`}
                  >
                    Регистрация
                  </button>
                </div>
              )}

              {step !== 'credentials' && (
                <div className="mb-8 mt-2 text-center">
                  <h2 className="text-2xl font-bold tracking-tighter uppercase mb-2">Подтверждение</h2>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">
                    {step === 'verifying' ? 'Отправка кода...' : step === 'loading_login' ? 'Авторизация...' : 'Введите код из Email'}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {error && <div className="text-red-500 text-xs font-bold tracking-widest mb-4 bg-red-500/10 p-4 border border-red-500/20">{error}</div>}
                
                {step === 'credentials' ? (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    
                    {tab === 'register' && (
                      <div className="relative">
                        <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input 
                          type="text" placeholder="Ваше Имя"
                          value={name} onChange={e => setName(e.target.value)}
                          className="w-full bg-[#111] border border-white/5 p-4 pl-12 text-sm focus:border-white outline-none text-white transition-colors"
                        />
                      </div>
                    )}

                    <div className="relative">
                      <EnvelopeSimple size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input 
                        type="email" placeholder="Email"
                        value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full bg-[#111] border border-white/5 p-4 pl-12 text-sm focus:border-white outline-none text-white transition-colors"
                      />
                    </div>
                    
                    <div className="relative">
                      <LockKey size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input 
                        type="password" placeholder="Пароль"
                        value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full bg-[#111] border border-white/5 p-4 pl-12 text-sm focus:border-white outline-none text-white transition-colors"
                        onKeyDown={e => e.key === 'Enter' && handleAction()}
                      />
                    </div>
                  </motion.div>
                ) : step === 'verifying' || step === 'loading_login' ? (
                  <div className="py-12 flex justify-center items-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-8 h-8 flex items-center justify-center relative">
                       <div className="w-8 h-8 rounded-full border-t-2 border-l-2 border-white absolute"></div>
                       <div className="w-4 h-4 rounded-full border-b-2 border-r-2 border-gray-500 absolute"></div>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                    <div className="bg-[#111] border border-white/5 p-4 text-xs text-gray-400 leading-relaxed mb-6 text-center">
                      Код отправлен на <br/><span className="text-white mt-1 block">{email}</span>
                    </div>
                    <input 
                      type="text" placeholder="####" maxLength={4}
                      value={code} onChange={e => setCode(e.target.value)}
                      className="w-full bg-[#111] border border-white/5 p-4 text-sm focus:border-white outline-none text-white transition-colors text-center tracking-[1em] font-mono text-xl"
                      onKeyDown={e => e.key === 'Enter' && handleAction()}
                    />
                  </motion.div>
                )}
                
                {(step === 'credentials' || step === 'code') && (
                  <button 
                    onClick={handleAction}
                    className="w-full bg-white text-black py-4 uppercase text-xs tracking-[0.2em] font-bold hover:bg-gray-200 transition-colors mt-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    {step === 'credentials' ? (tab === 'login' ? 'Войти' : 'Создать аккаунт') : 'Подтвердить код'}
                  </button>
                )}
                
                {step === 'code' && (
                  <button 
                    onClick={() => { setStep('credentials'); setError(''); setCode(''); }}
                    className="w-full bg-transparent text-gray-500 py-3 uppercase text-[10px] tracking-[0.2em] font-bold hover:text-white transition-colors mt-2"
                  >
                    Назад
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
