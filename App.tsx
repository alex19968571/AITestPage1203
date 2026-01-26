
import React, { useState, useEffect, useRef } from 'react';
import { 
  Home as HomeIcon, 
  Calendar, 
  MapPin, 
  BedDouble, 
  ArrowRightLeft, 
  Plane, 
  Utensils, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  MessageSquare,
  Plus,
  Trash2,
  ChevronRight,
  ExternalLink,
  Info,
  Clock,
  Car,
  Ticket,
  MoreHorizontal,
  Download,
  Book,
  Users,
  Camera,
  Search,
  Receipt,
  Delete,
  X,
  Navigation,
  BookOpen,
  MoveRight,
  Coffee,
  Droplets,
  ShowerHead
} from 'lucide-react';
import { 
  TRIP_DETAILS, 
  ACCOMMODATIONS, 
  ITINERARY, 
  SPOTS, 
  CHECKLIST,
  TDAC_STEPS,
  APP_CATEGORIES
} from './constants';
// Fixed: Added Accommodation to the imported types from './types' to resolve name error
import { Expense, CategoryInfo, Accommodation } from './types';
import { askGemini } from './services/geminiService';
import { marked } from 'marked';

const CATEGORIES: CategoryInfo[] = [
  { id: 'food', name: '餐飲', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { id: 'transport', name: '交通', icon: Car, color: 'bg-blue-100 text-blue-600' },
  { id: 'shopping', name: '購物', icon: ShoppingBag, color: 'bg-pink-100 text-pink-600' },
  { id: 'entertainment', name: '娛樂', icon: Ticket, color: 'bg-purple-100 text-purple-600' },
  { id: 'other', name: '其他', icon: MoreHorizontal, color: 'bg-gray-100 text-gray-600' },
];

const QUICK_TAGS: Record<string, string[]> = {
  food: ['早餐', '午餐', '晚餐', '咖啡', '零食', '芒果糯米飯', '泰奶', '路邊攤'],
  transport: ['Grab', 'Bolt', 'BTS', 'MRT', '嘟嘟車', '摩托車'],
  shopping: ['7-11', 'Big C', '香氛', 'Monchhichi', '衣服', '伴手禮'],
  entertainment: ['按摩', '泰服', '門票', '小費', '夜店', '酒吧'],
  other: ['網卡', '雜支', '住宿']
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  
  // Expenses Logic
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('bk2026_expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [thbAmount, setThbAmount] = useState('');
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [expenseNote, setExpenseNote] = useState('');
  const [expenseCat, setExpenseCat] = useState('food');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const RATE = 0.94;

  // AI Logic
  const [aiInput, setAiInput] = useState('');
  const [aiHistory, setAiHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const aiEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('bk2026_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    aiEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiHistory]);

  const handleAddExpense = () => {
    if (!thbAmount || isNaN(parseFloat(thbAmount))) return;
    const newExpense: Expense = {
      id: Date.now(),
      amount: parseFloat(thbAmount),
      note: expenseNote || '一般消費',
      category: expenseCat,
      paymentMethod,
      date: new Date().toLocaleString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    setExpenses([newExpense, ...expenses]);
    setThbAmount('');
    setExpenseNote('');
    setIsAddingExpense(false);
  };

  const deleteExpense = (id: number) => {
    if (confirm('確定要刪除這筆紀錄嗎？')) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const handleAiAsk = async () => {
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAiInput('');
    setAiHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setAiLoading(true);
    const response = await askGemini(userMsg);
    setAiHistory(prev => [...prev, { role: 'ai', text: response }]);
    setAiLoading(false);
  };

  const handleNumPress = (num: string) => {
    if (thbAmount.length < 8) setThbAmount(prev => prev + num);
  };

  const totalThb = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const renderHome = () => (
    <div className="space-y-6 animate-fadeIn pb-24">
      <header className="pt-4 px-2">
        <h1 className="text-3xl font-black text-[#5D5550] tracking-tight">{TRIP_DETAILS.title}</h1>
        <p className="text-sm text-[#9A928C] mt-1 flex items-center gap-2">
          <span>{TRIP_DETAILS.dates}</span>
          <span className="w-1 h-1 rounded-full bg-[#D4C3B2]"></span>
          <span>{TRIP_DETAILS.subtitle}</span>
        </p>
      </header>

      <div className="space-y-4 px-2">
        <FlightCard data={TRIP_DETAILS.flight.outbound} label="去程 OUTBOUND" />
        <FlightCard data={TRIP_DETAILS.flight.inbound} label="回程 INBOUND" />
      </div>

      <div className="grid grid-cols-2 gap-3 px-2">
        <QuickButton icon="🛏️" label="住宿資訊" sub="Accommodation" onClick={() => setActiveTab('hotel')} />
        <QuickButton icon="🛂" label="入境教學" sub="TDAC Guide" onClick={() => setActiveTab('tdac')} />
        <QuickButton icon="🎒" label="準備清單" sub="Checklist" onClick={() => setActiveTab('checklist')} />
        <QuickButton icon="📱" label="必備 App" sub="Essential Apps" onClick={() => setActiveTab('apps')} />
      </div>

      <div className="bg-[#8D7B68] p-5 rounded-3xl text-white shadow-lg relative overflow-hidden mx-2">
        <div className="absolute -right-8 -bottom-8 opacity-20"><Sparkles size={120} /></div>
        <h3 className="font-bold mb-2 flex items-center gap-2"><Sparkles size={16}/> 當前開銷預算</h3>
        <div className="flex justify-between items-end">
          <div className="text-3xl font-black">{totalThb.toLocaleString()} <span className="text-lg">THB</span></div>
          <div className="text-sm opacity-80">≈ NT$ {parseInt((totalThb * RATE).toString()).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );

  const renderConverter = () => (
    <div className="space-y-6 animate-fadeIn pb-24 h-full flex flex-col pt-4 px-2">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F5F2ED]">
        <div className="flex justify-between items-center mb-6">
          <div className="text-left">
            <span className="text-xs text-[#9A928C] block mb-1">THB 泰銖</span>
            <div className="text-4xl font-bold text-[#5D5550] h-10">{thbAmount || '0'}</div>
          </div>
          <ArrowRightLeft className="text-[#D4C3B2]" />
          <div className="text-right">
            <span className="text-xs text-[#9A928C] block mb-1">TWD 台幣</span>
            <div className="text-4xl font-bold text-[#8D7B68] h-10">{(parseFloat(thbAmount || '0') * RATE).toFixed(0)}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map(n => (
            <button key={n} onClick={() => handleNumPress(n.toString())} className="h-12 rounded-2xl bg-[#F5F2ED] text-lg font-bold text-[#5D5550] active:scale-95 shadow-sm">{n}</button>
          ))}
          <button onClick={() => setThbAmount(prev => prev.slice(0, -1))} className="h-12 rounded-2xl bg-[#EAE5DD] text-[#8D7B68] flex items-center justify-center active:scale-95 shadow-sm"><Delete size={20}/></button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setThbAmount('')} className="py-3 bg-[#D4C3B2] text-white rounded-xl font-bold active:scale-95 transition-transform">清除 Clear</button>
          <button onClick={() => thbAmount && setIsAddingExpense(true)} className="py-3 bg-[#5D5550] text-white rounded-xl font-bold shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <Receipt size={18}/> 記帳 Save
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-[#F5F2ED] overflow-hidden flex flex-col flex-1">
        <div className="p-4 bg-[#8D7B68] text-white">
          <div className="flex justify-between items-center mb-1">
            <div className="text-xs opacity-80 flex items-center gap-1"><BookOpen size={12}/> 我的記帳本</div>
            <div className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{expenses.length} 筆紀錄</div>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold">{totalThb.toLocaleString()} THB</span>
            <span className="text-sm">≈ {parseInt((totalThb * RATE).toString()).toLocaleString()} TWD</span>
          </div>
        </div>
        <div className="p-2 overflow-y-auto flex-1 no-scrollbar space-y-2">
          {expenses.length === 0 ? (
            <div className="text-center py-20 text-[#C5B4A1]">
              <Receipt size={40} className="mx-auto opacity-20 mb-2" />
              <p className="text-xs">還沒有記帳紀錄喔！</p>
            </div>
          ) : (
            expenses.map(exp => {
              const cat = CATEGORIES.find(c => c.id === exp.category) || CATEGORIES[4];
              return (
                <div key={exp.id} className="bg-[#FAF9F6] p-4 rounded-2xl flex items-center justify-between border border-[#F5F2ED] shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${cat.color} bg-opacity-20`}>
                      <cat.icon size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-[#5D5550] text-sm">{exp.note}</div>
                      <div className="text-[10px] text-[#9A928C]">{exp.date} • {exp.paymentMethod === 'cash' ? '💵' : '💳'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-[#8D7B68]">{exp.amount} B</span>
                    <button onClick={() => deleteExpense(exp.id)} className="text-[#C5B4A1] hover:text-red-400 p-1">
                        <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-[#FAF9F6] min-h-screen relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#EFE9E1] to-transparent pointer-events-none"></div>
      
      <main className="flex-1 pt-4 relative z-10 overflow-hidden px-4">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'converter' && renderConverter()}
        {activeTab === 'itinerary' && (
          <div className="space-y-6 animate-fadeIn pb-24 h-full flex flex-col">
            <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar shrink-0 px-4 snap-x">
              {ITINERARY.map((day, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedDayIdx(idx)} 
                  className={`flex-shrink-0 px-4 py-2 rounded-xl border transition-all flex flex-col items-center min-w-[80px] snap-center ${selectedDayIdx === idx ? 'bg-[#5D5550] text-white border-[#5D5550] shadow-md scale-105' : 'bg-white text-[#9A928C] border-[#F5F2ED]'}`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{day.day}</div>
                  <div className="text-sm font-bold">{day.date.split(' ')[0]}</div>
                </button>
              ))}
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F5F2ED] flex-1 overflow-y-auto no-scrollbar mx-1">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-[#5D5550] mb-3">{ITINERARY[selectedDayIdx].date}</h3>
                <span className="text-[11px] text-[#8D7B68] font-black bg-white px-5 py-2 rounded-full border border-[#F5F2ED] shadow-[0_4px_15px_-5px_rgba(141,123,104,0.15)] inline-block uppercase tracking-widest">{ITINERARY[selectedDayIdx].title}</span>
              </div>
              <div className="space-y-2 relative">
                {ITINERARY[selectedDayIdx].events.map((event, i) => (
                   <TimelineItem key={i} event={event} isLast={i === ITINERARY[selectedDayIdx].events.length - 1} />
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'ai' && (
          <div className="flex flex-col h-full animate-fadeIn pb-24 pt-4 px-1">
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar mb-4">
              {aiHistory.length === 0 && (
                <div className="text-center py-20 text-[#C5B4A1]">
                  <Sparkles size={40} className="mx-auto opacity-20 mb-4" />
                  <h3 className="font-bold text-[#5D5550]">Bangkok AI 助手</h3>
                  <p className="text-xs mt-2 px-10">我可以幫你查詢曼谷的天氣、景點細節或泰語翻譯。</p>
                </div>
              )}
              {aiHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm prose ${msg.role === 'user' ? 'bg-[#5D5550] text-white rounded-tr-none' : 'bg-white border border-[#F5F2ED] text-[#5D5550] rounded-tl-none shadow-sm'}`}
                    dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                  />
                </div>
              ))}
              {aiLoading && <div className="flex justify-start"><div className="bg-white border border-[#F5F2ED] p-3 rounded-2xl text-[#C5B4A1] text-xs animate-pulse">Thinking...</div></div>}
              <div ref={aiEndRef} />
            </div>
            <div className="flex gap-2">
              <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAiAsk()} placeholder="問問曼谷旅遊資訊..." className="flex-1 p-3 rounded-xl bg-white border border-[#F5F2ED] shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#8D7B68]" />
              <button onClick={handleAiAsk} disabled={aiLoading} className="bg-[#5D5550] text-white p-3 rounded-xl shadow-md active:scale-95 transition-transform"><MessageSquare size={20} /></button>
            </div>
          </div>
        )}
        {activeTab === 'hotel' && (
          <div className="space-y-6 animate-fadeIn pb-24 pt-4 h-full overflow-y-auto no-scrollbar px-1">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#5D5550]">Accommodation 住宿 🧸</h2>
              <p className="text-xs text-[#9A928C] mt-2 bg-white inline-block px-3 py-1 rounded-full border border-[#EAE5DD]">
                {TRIP_DETAILS.roomsConfig}
              </p>
            </div>
            {ACCOMMODATIONS.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
        {activeTab === 'spots' && (
          <div className="space-y-6 animate-fadeIn pb-24 pt-4 h-full overflow-y-auto no-scrollbar px-1">
            <div className="text-center mb-2">
                <h2 className="text-xl font-bold text-[#5D5550]">Must Go 口袋名單 ✨</h2>
                <p className="text-xs text-[#9A928C]">點擊導航開啟地圖</p>
            </div>
            {SPOTS.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 shadow-sm border border-[#F5F2ED]">
                <h3 className="font-bold text-[#5D5550] mb-3 flex items-center gap-2 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#D4C3B2]"></span>{cat.category}</h3>
                {cat.note && <div className="bg-[#FFF8F0] p-3 rounded-xl mb-3 text-xs text-[#8D7B68] flex gap-2"><Sparkles size={16} className="shrink-0 mt-0.5"/>{cat.note}</div>}
                <div className="space-y-1">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-2 hover:bg-[#FAF9F6] rounded-xl transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-semibold text-[#5D5550]">{item.name}</div>
                          {item.area && <span className="text-[9px] bg-[#EAE5DD] text-[#8D7B68] px-1.5 py-0.5 rounded-full font-bold">📍{item.area}</span>}
                        </div>
                        <div className="text-[10px] text-[#9A928C] mt-0.5">{item.desc}</div>
                      </div>
                      <a href={item.url} target="_blank" className="ml-2 text-[#C5B4A1] hover:text-[#8D7B68] p-1.5 bg-[#FAF9F6] rounded-lg active:scale-90 transition-all"><Navigation size={16}/></a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'tdac' && (
          <div className="space-y-5 animate-fadeIn pb-24 pt-4 px-1">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-[#5D5550]">TDAC Guide 入境教學 🛂</h2>
              <p className="text-xs text-[#9A928C]">泰國入境資訊參考</p>
            </div>
            <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F5F2ED] flex gap-3">
              <Info size={20} className="text-[#D4C3B2] shrink-0" />
              <p className="text-xs text-[#8D7B68] leading-relaxed">目前泰國空路入境已大多取消紙本 TM6 入境卡，但若遇到需填寫電子簽證或新式系統，請參考以下資訊備用。</p>
            </div>
            {TDAC_STEPS.map(step => (
              <div key={step.step} className="bg-white p-5 rounded-3xl border border-[#F5F2ED] relative overflow-hidden shadow-sm">
                <div className="absolute -right-3 -top-3 text-6xl font-black text-[#FAF9F6]">{step.step}</div>
                <div className="flex gap-4 relative z-10">
                   <div className="p-3 bg-[#F5F2ED] rounded-2xl text-[#8D7B68] h-fit"><StepIcon name={step.icon}/></div>
                   <div><h4 className="font-bold text-[#5D5550] text-sm mb-1">Step {step.step}: {step.title}</h4><p className="text-[11px] text-[#9A928C] leading-relaxed">{step.content}</p></div>
                </div>
              </div>
            ))}
            <div className="text-center pt-2">
                <a href="https://www.immigration.go.th/" target="_blank" className="inline-flex items-center gap-2 bg-[#5D5550] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-[#5D5550]/20 active:scale-95 transition-transform">
                    官方網站 Official Website
                </a>
            </div>
          </div>
        )}
        {activeTab === 'apps' && (
          <div className="space-y-6 animate-fadeIn pb-24 pt-4 h-full overflow-y-auto no-scrollbar px-1">
            <div className="text-center mb-2">
                <h2 className="text-xl font-bold text-[#5D5550]">Essential Apps 必備 App 📱</h2>
                <p className="text-xs text-[#9A928C]">泰國旅遊實用工具</p>
            </div>
            {APP_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-[#F5F2ED] shadow-sm">
                <h3 className="font-bold text-[#5D5550] text-sm mb-5 flex items-center gap-2 border-b border-[#FAF9F6] pb-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D4C3B2]"></span>{cat.title}</h3>
                <div className="space-y-6">
                  {cat.apps.map((app, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <img src={app.image} className="w-14 h-14 rounded-2xl border border-[#EAE5DD] shadow-sm object-cover" />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-[#5D5550] mb-0.5">{app.name}</div>
                        <p className="text-[10px] text-[#8D7B68] leading-relaxed mb-2">{app.desc}</p>
                        <a href={app.url} target="_blank" className="inline-flex items-center gap-1.5 text-[10px] bg-[#FAF9F6] border border-[#EAE5DD] px-3 py-1.5 rounded-lg text-[#9A928C] active:scale-95 transition-transform"><Download size={12}/> 下載 APP</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'checklist' && (
          <div className="space-y-4 animate-fadeIn pb-24 pt-4 px-1">
            <div className="text-center mb-2">
                <h2 className="text-xl font-bold text-[#5D5550]">Checklist 準備清單 📝</h2>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F5F2ED]">
              {CHECKLIST.map((item, i) => (
                <label key={i} className="flex items-center gap-3 p-3 border-b border-[#F5F2ED] last:border-0 cursor-pointer group active:bg-[#FAF9F6] transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded border-[#D4C3B2] text-[#8D7B68] focus:ring-[#8D7B68] transition-all cursor-pointer" />
                  <span className="text-sm text-[#5D5550] group-hover:text-[#8D7B68] transition-all">{item}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button for quick expense adding */}
      <button 
        onClick={() => setIsAddingExpense(true)}
        className="fixed bottom-20 right-6 w-14 h-14 bg-[#5D5550] text-white rounded-full flex items-center justify-center shadow-2xl z-[80] active:scale-90 transition-all border-4 border-white"
      >
        <Plus size={28} />
      </button>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-[#F0EBE5] max-w-md mx-auto z-[90] px-6 pb-safe flex justify-between items-center h-16">
        <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<HomeIcon size={20}/>} label="首頁" />
        <NavButton active={activeTab === 'itinerary'} onClick={() => setActiveTab('itinerary')} icon={<Calendar size={20}/>} label="每日行程" />
        <div className="relative -top-6 text-center">
          <button onClick={() => setActiveTab('converter')} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${activeTab === 'converter' ? 'bg-[#5D5550] scale-110 ring-4 ring-[#EAE5DD]' : 'bg-[#8D7B68]'}`}>
            <ArrowRightLeft size={24} className="text-white" />
          </button>
          <div className={`text-[9px] mt-1 font-bold ${activeTab === 'converter' ? 'text-[#8D7B68]' : 'text-[#C5B4A1]'}`}>匯率換算</div>
        </div>
        <NavButton active={activeTab === 'hotel'} onClick={() => setActiveTab('hotel')} icon={<BedDouble size={20}/>} label="住宿資訊" />
        <NavButton active={activeTab === 'spots'} onClick={() => setActiveTab('spots')} icon={<MapPin size={20}/>} label="口袋名單" />
      </nav>

      {/* Improved Adding Expense Modal */}
      {isAddingExpense && (
        <div className="fixed inset-0 bg-black/60 z-[150] flex items-end justify-center backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-t-[2.5rem] p-8 animate-slideUp shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#5D5550]">快速記帳</h3>
                <p className="text-xs text-[#9A928C]">輸入金額與消費明細</p>
              </div>
              <button onClick={() => { setIsAddingExpense(false); setThbAmount(''); }} className="p-2 bg-[#FAF9F6] rounded-full text-[#9A928C]"><X size={20}/></button>
            </div>
            <div className="space-y-6">
              {/* Amount Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D7B68] font-bold">฿</div>
                <input 
                  type="number" 
                  pattern="\d*"
                  placeholder="輸入泰銖金額" 
                  value={thbAmount} 
                  onChange={(e) => setThbAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE5DD] focus:ring-2 focus:ring-[#8D7B68] focus:border-transparent outline-none text-2xl font-bold text-[#5D5550] placeholder:text-[#C5B4A1]"
                />
              </div>

              {/* Category Selector */}
              <div className="grid grid-cols-5 gap-2">
                {CATEGORIES.map(c => (
                  <button key={c.id} onClick={() => setExpenseCat(c.id)} className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${expenseCat === c.id ? 'bg-[#5D5550] text-white border-[#5D5550] shadow-md' : 'bg-[#FAF9F6] border-[#F5F2ED] text-[#9A928C]'}`}>
                    <c.icon size={20}/><span className="text-[10px] mt-1.5 font-bold">{c.name}</span>
                  </button>
                ))}
              </div>

              {/* Quick Tags */}
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto no-scrollbar py-1">
                {(QUICK_TAGS[expenseCat] || []).map(tag => (
                  <button key={tag} onClick={() => setExpenseNote(tag)} className={`px-4 py-2 rounded-full text-xs border transition-all font-medium ${expenseNote === tag ? 'bg-[#8D7B68] text-white' : 'bg-white border-[#F5F2ED] text-[#8D7B68] hover:bg-[#FAF9F6]'}`}>{tag}</button>
                ))}
              </div>

              {/* Note Input */}
              <input 
                type="text" 
                placeholder="寫點什麼備註嗎？" 
                value={expenseNote} 
                onChange={(e) => setExpenseNote(e.target.value)} 
                className="w-full p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE5DD] focus:ring-2 focus:ring-[#8D7B68] outline-none text-sm text-[#5D5550] text-center" 
              />

              {/* Payment Method */}
              <div className="flex gap-2 bg-[#FAF9F6] p-1.5 rounded-2xl">
                <button onClick={() => setPaymentMethod('cash')} className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${paymentMethod === 'cash' ? 'bg-white shadow-md text-[#5D5550]' : 'text-[#9A928C]'}`}>💵 現金 Cash</button>
                <button onClick={() => setPaymentMethod('card')} className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${paymentMethod === 'card' ? 'bg-white shadow-md text-[#5D5550]' : 'text-[#9A928C]'}`}>💳 刷卡 Card</button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={() => { setIsAddingExpense(false); setThbAmount(''); }} className="py-4 bg-[#EAE5DD] text-[#8D7B68] rounded-2xl font-bold text-sm active:scale-95 transition-all">取消</button>
                <button onClick={handleAddExpense} className="py-4 bg-[#5D5550] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#5D5550]/20 active:scale-95 transition-all">確認儲存</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const QuickButton: React.FC<{ icon: string, label: string, sub: string, onClick: () => void }> = ({ icon, label, sub, onClick }) => (
  <button onClick={onClick} className="bg-white p-4 rounded-2xl shadow-sm border border-[#F5F2ED] text-left active:scale-95 transition-all hover:bg-[#FDFBF9]">
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-xs font-bold text-[#5D5550]">{label}</div>
    <div className="text-[10px] text-[#9A928C] whitespace-nowrap">{sub}</div>
  </button>
);

const NavButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center w-20 transition-all ${active ? 'text-[#8D7B68]' : 'text-[#C5B4A1]'}`}>
    <div className={`p-1.5 rounded-full ${active ? 'bg-[#F5F2ED]' : ''}`}>{icon}</div>
    <span className="text-[10px] mt-0.5 font-bold tracking-tighter text-center leading-tight">{label}</span>
  </button>
);

const FlightCard: React.FC<{ data: any, label: string }> = ({ data, label }) => (
  <div className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-[#F0EBE5] relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4C3B2]"></div>
    <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] tracking-widest uppercase text-[#9A928C] font-bold border border-[#EAE5DD] px-2 py-0.5 rounded-full bg-[#FAF9F6]">
                {label}
            </span>
            <span className="text-[10px] text-[#5D5550] font-bold flex items-center gap-1">
                <Plane size={10} className="text-[#8D7B68]" />
                {data.flightNo}
            </span>
        </div>
        <span className="text-xs text-[#8D7B68] font-medium">{data.date}</span>
    </div>
    <div className="flex justify-between items-center">
      <div className="text-center shrink-0">
        <div className="text-2xl font-black text-[#5D5550]">{data.from}</div>
        <div className="text-[11px] font-bold text-[#9A928C] mt-1">{data.dep}</div>
      </div>
      <div className="flex-1 px-4 flex flex-col items-center">
        <div className="flex items-center gap-2 w-full">
          <div className="h-[1px] flex-1 bg-[#EAE5DD]"></div>
          <Plane size={14} className="text-[#C5B4A1] rotate-90" />
          <div className="h-[1px] flex-1 bg-[#EAE5DD]"></div>
        </div>
        <span className="text-[9px] text-[#C5B4A1] font-bold tracking-widest mt-1 uppercase">Direct</span>
      </div>
      <div className="text-center shrink-0">
        <div className="text-2xl font-black text-[#5D5550]">{data.to}</div>
        <div className="text-[11px] font-bold text-[#9A928C] mt-1">{data.arr}</div>
      </div>
    </div>
  </div>
);

const HotelCard: React.FC<{ hotel: Accommodation }> = ({ hotel }) => (
    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_-10px_rgba(197,180,161,0.15)] border border-[#F0EBE5] relative mb-5">
        <div className={`absolute top-4 right-4 text-[10px] px-3 py-1 rounded-full font-medium ${hotel.status.includes('Confirmed') ? 'bg-[#EBF5EA] text-[#4F7A4D]' : 'bg-[#F5F5F5] text-[#9CA3AF]'}`}>
            {hotel.status}
        </div>
        <div className="mb-5">
            <h3 className="text-xl font-bold text-[#5D5550]">{hotel.name}</h3>
            <p className="text-xs text-[#9A928C] font-medium mt-1">{hotel.engName}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-[#FAF9F6] p-3 rounded-2xl border border-[#F5F2ED]">
                <div className="flex items-center gap-1.5 text-[#C5B4A1] mb-1">
                    <Calendar size={14} />
                    <span className="text-[10px] font-bold uppercase">Date</span>
                </div>
                <div className="text-sm font-semibold text-[#5D5550]">{hotel.nights}</div>
            </div>
            <div className="bg-[#FAF9F6] p-3 rounded-2xl border border-[#F5F2ED]">
                <div className="flex items-center gap-1.5 text-[#C5B4A1] mb-1">
                    <Users size={14} />
                    <span className="text-[10px] font-bold uppercase">Rooms</span>
                </div>
                <div className="text-sm font-semibold text-[#5D5550]">{hotel.roomConfig}</div>
            </div>
        </div>
        <div className="flex items-center gap-6 mb-5 px-1">
            <div className="flex flex-col">
                <span className="text-[10px] text-[#9A928C] mb-0.5">Check-in</span>
                <div className="flex items-center gap-1.5 text-[#5D5550] font-bold"><Clock size={16} className="text-[#D4C3B2]" /> {hotel.checkInTime}</div>
            </div>
            <div className="w-px h-8 bg-[#EAE5DD]"></div>
            <div className="flex flex-col">
                <span className="text-[10px] text-[#9A928C] mb-0.5">Check-out</span>
                <div className="flex items-center gap-1.5 text-[#5D5550] font-bold"><Clock size={16} className="text-[#D4C3B2]" /> {hotel.checkOutTime}</div>
            </div>
        </div>
        <div className="flex gap-2 mb-4">
            {hotel.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-[#F5F2ED] text-[#8D7B68] px-2 py-1 rounded-lg">#{tag}</span>
            ))}
        </div>
        <div className="pt-4 border-t border-[#F5F2ED]">
            <div className="flex items-start gap-2 mb-3">
                <MapPin size={14} className="text-[#C5B4A1] mt-0.5 shrink-0" />
                <span className="text-xs text-[#8D7B68] leading-relaxed">{hotel.address}</span>
            </div>
            {hotel.note && (
                <div className="bg-[#FFF8F0] text-[#B08D79] text-xs p-3 rounded-xl mb-3 flex gap-2">
                    <Info size={14} className="shrink-0 mt-0.5" />
                    {hotel.note}
                </div>
            )}
            <a href={hotel.url} target="_blank" className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#5D5550] text-white text-xs font-bold rounded-xl active:scale-95 transition-transform">
                開啟地圖 Open Map
            </a>
        </div>
    </div>
);

const TimelineItem: React.FC<{ event: any, isLast: boolean }> = ({ event, isLast }) => (
    <div className="flex gap-4">
        <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-[#D4C3B2] ring-4 ring-[#FAF9F6] z-10"></div>
            {!isLast && <div className="w-0.5 flex-1 bg-[#EAE5DD] my-1"></div>}
        </div>
        <div className="flex-1 pb-8">
            <div className={`p-4 rounded-2xl border border-[#F5F2ED] shadow-sm active:scale-[0.98] transition-transform relative group bg-white`}>
                {event.url && (
                    <a href={event.url} target="_blank" className="absolute top-3 right-3 text-[#C5B4A1] opacity-50 group-hover:opacity-100">
                        <ExternalLink size={14} />
                    </a>
                )}
                {event.travelTime && (
                    <div className="mb-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FAF9F6] text-[10px] text-[#8D7B68] font-medium border border-[#EAE5DD]">
                        <MoveRight size={10} />
                        {event.travelTime}
                    </div>
                )}
                <div className="flex justify-between items-start mb-1 pr-4">
                    <h4 className="font-bold text-[#5D5550] text-sm">{event.title}</h4>
                    <span className="text-[10px] font-mono text-[#9A928C] bg-[#F5F2ED] px-1.5 py-0.5 rounded">{event.time}</span>
                </div>
                {event.thai && <div className="text-xs text-[#8D7B68] font-medium mb-1 font-thai">{event.thai}</div>}
                {event.sub && <div className="text-xs text-[#C5B4A1] font-medium mb-1.5">{event.sub}</div>}
                <p className="text-xs text-[#8D7B68] leading-relaxed flex items-start gap-1.5 whitespace-pre-line">
                    <span className="mt-0.5 opacity-60">
                        <StepIcon name={event.icon}/>
                    </span>
                    {event.desc}
                </p>
            </div>
        </div>
    </div>
);

const StepIcon: React.FC<{ name: string }> = ({ name }) => {
  if (name === 'Book') return <Book size={16}/>;
  if (name === 'Users') return <Users size={16}/>;
  if (name === 'Plane') return <Plane size={16}/>;
  if (name === 'Camera') return <Camera size={16}/>;
  if (name === 'Home') return <HomeIcon size={16}/>;
  if (name === 'MapPin') return <MapPin size={16}/>;
  if (name === 'ShoppingBag') return <ShoppingBag size={16}/>;
  if (name === 'Utensils') return <Utensils size={16}/>;
  if (name === 'Sparkles') return <Sparkles size={16}/>;
  if (name === 'Droplets') return <Droplets size={16}/>;
  if (name === 'Trees') return <MoreHorizontal size={16}/>;
  if (name === 'Moon') return <Sparkles size={16}/>;
  if (name === 'Music') return <Ticket size={16}/>;
  if (name === 'Coffee') return <Coffee size={16}/>;
  if (name === 'Zap') return <Smartphone size={16}/>;
  if (name === 'ShowerHead') return <ShowerHead size={16}/>;
  return <Info size={16}/>;
};

export default App;
