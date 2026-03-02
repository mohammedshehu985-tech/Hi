import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Clock, Users, Shield, Settings, LogOut, ChevronRight, Wallet, History } from 'lucide-react';

interface InvestmentPlan {
  id: number;
  name: string;
  price: number;
  dailyIncome: number;
  duration: number;
  image: string;
}

const plans: InvestmentPlan[] = [
  {
    id: 1,
    name: 'VIP 1',
    price: 100,
    dailyIncome: 20,
    duration: 30,
    image: 'https://picsum.photos/seed/agri1/400/300'
  },
  {
    id: 2,
    name: 'VIP 2',
    price: 250,
    dailyIncome: 50,
    duration: 30,
    image: 'https://picsum.photos/seed/agri2/400/300'
  },
  {
    id: 3,
    name: 'VIP 3',
    price: 500,
    dailyIncome: 100,
    duration: 30,
    image: 'https://picsum.photos/seed/agri3/400/300'
  }
];

type Tab = 'home' | 'invest' | 'team' | 'mine';
type MineSubPage = 'main' | 'withdrawal' | 'history' | 'security' | 'settings';

interface ActiveInvestment extends InvestmentPlan {
  startDate: Date;
}

interface Transaction {
  id: string;
  type: 'investment' | 'withdrawal' | 'bonus';
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  label: string;
}

export function Dashboard({ balance, setBalance, onLogout }: { balance: number, setBalance: React.Dispatch<React.SetStateAction<number>>, onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeSubPage, setActiveSubPage] = useState<MineSubPage>('main');
  const [activeInvestments, setActiveInvestments] = useState<ActiveInvestment[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'bonus', amount: 10, date: new Date(), status: 'completed', label: 'Sign-up Bonus' }
  ]);
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [isInvesting, setIsInvesting] = useState(false);
  
  // Withdrawal State
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('MTN Mobile Money');
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleInvest = () => {
    if (!selectedPlan) return;
    if (balance < selectedPlan.price) {
      alert('Insufficient balance. Please top up.');
      setSelectedPlan(null);
      return;
    }

    setIsInvesting(true);
    // Simulate processing
    setTimeout(() => {
      setBalance(prev => prev - selectedPlan.price);
      setActiveInvestments(prev => [...prev, { ...selectedPlan, startDate: new Date() }]);
      setTransactions(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        type: 'investment',
        amount: selectedPlan.price,
        date: new Date(),
        status: 'completed',
        label: `Invested in ${selectedPlan.name}`
      }, ...prev]);
      setIsInvesting(false);
      setSelectedPlan(null);
      setActiveTab('invest');
    }, 1000);
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (amount < 20) {
      alert('Minimum withdrawal is GHS 20.00.');
      return;
    }
    if (amount > balance) {
      alert('Insufficient balance.');
      return;
    }

    setIsWithdrawing(true);
    // Simulate processing
    setTimeout(() => {
      setBalance(prev => prev - amount);
      setTransactions(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        type: 'withdrawal',
        amount: amount,
        date: new Date(),
        status: 'completed',
        label: `Withdrawal via ${withdrawMethod}`
      }, ...prev]);
      setIsWithdrawing(false);
      setWithdrawAmount('');
      alert('Withdrawal request submitted successfully!');
      setActiveSubPage('main');
    }, 1500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-bold text-zinc-800">Investment Plans</h3>
              <span className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                <Clock size={12} /> Live Updates
              </span>
            </div>

            <div className="space-y-4">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: plan.id * 0.1 }}
                  className="bg-blue-50 rounded-3xl overflow-hidden border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-4 border-b border-blue-50 flex justify-between items-center">
                    <h4 className="font-bold text-zinc-900">{plan.name}</h4>
                    <span className="text-blue-600 font-bold text-sm">{plan.duration} Days</span>
                  </div>
                  
                  <div className="p-4 flex gap-4">
                    <div className="w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-inner">
                      <img 
                        src={plan.image} 
                        alt={plan.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Name:</span>
                        <span className="text-blue-600 font-bold">{plan.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Price:</span>
                        <span className="text-blue-600 font-bold">GHS {plan.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Daily:</span>
                        <span className="text-blue-600 font-bold">GHS {plan.dailyIncome}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Total:</span>
                        <span className="text-blue-600 font-bold">GHS {plan.dailyIncome * plan.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button 
                      onClick={() => setSelectedPlan(plan)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-2xl transition-colors active:scale-[0.98]"
                    >
                      Invest Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case 'invest':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-800 mb-4">Active Investments</h3>
              {activeInvestments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <TrendingUp size={32} />
                  </div>
                  <div>
                    <p className="text-zinc-900 font-semibold">No active investments</p>
                    <p className="text-zinc-500 text-sm mt-1">Start your journey by choosing a plan.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('home')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm"
                  >
                    View Plans
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeInvestments.map((inv, idx) => (
                    <div key={idx} className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl overflow-hidden flex-shrink-0">
                        <img src={inv.image} alt={inv.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-zinc-900">{inv.name}</h4>
                          <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase font-bold">Active</span>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-zinc-500">Daily: GHS {inv.dailyIncome}</span>
                          <span className="text-blue-600 font-bold">GHS {inv.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      case 'team':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-2">Refer & Earn</h3>
              <p className="text-blue-100 text-sm mb-6">Invite your friends and earn up to 15% commission on their investments.</p>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <p className="text-[10px] uppercase font-bold text-blue-200 mb-1">Your Referral Link</p>
                <div className="flex gap-2">
                  <input 
                    readOnly 
                    value="https://authflow.inc/ref/USER123" 
                    className="bg-transparent flex-1 text-sm font-mono focus:outline-none"
                  />
                  <button className="text-xs font-bold uppercase bg-white text-blue-600 px-3 py-1 rounded-lg">Copy</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <TeamStat label="Level 1" value="0" sub="10%" />
              <TeamStat label="Level 2" value="0" sub="3%" />
              <TeamStat label="Level 3" value="0" sub="2%" />
            </div>

            <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-800 mb-4">Team Members</h3>
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                <Users size={40} className="text-zinc-200" />
                <p className="text-zinc-400 text-sm">You don't have any team members yet.</p>
              </div>
            </div>
          </motion.div>
        );
      case 'mine':
        if (activeSubPage === 'withdrawal') {
          return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <button onClick={() => setActiveSubPage('main')} className="p-2 bg-white rounded-xl shadow-sm text-zinc-600">
                  <ChevronRight size={20} className="rotate-180" />
                </button>
                <h3 className="text-xl font-bold text-zinc-900">Withdrawal</h3>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm space-y-6">
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Available Balance</p>
                  <p className="text-2xl font-bold text-blue-600">GHS {balance.toFixed(2)}</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase">Amount (GHS)</label>
                    <input 
                      type="number" 
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Enter amount" 
                      className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase">Payment Method</label>
                    <select 
                      value={withdrawMethod}
                      onChange={(e) => setWithdrawMethod(e.target.value)}
                      className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600"
                    >
                      <option>MTN Mobile Money</option>
                      <option>Vodafone Cash</option>
                      <option>AirtelTigo Money</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleWithdraw}
                    disabled={isWithdrawing}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isWithdrawing ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Withdraw Now'
                    )}
                  </button>
                  <p className="text-[10px] text-zinc-400 text-center leading-relaxed">
                    Withdrawals are processed within 24 hours. Minimum withdrawal is GHS 20.00.
                  </p>
                </div>
              </div>
            </motion.div>
          );
        }
        if (activeSubPage === 'history') {
          return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <button onClick={() => setActiveSubPage('main')} className="p-2 bg-white rounded-xl shadow-sm text-zinc-600">
                  <ChevronRight size={20} className="rotate-180" />
                </button>
                <h3 className="text-xl font-bold text-zinc-900">Transaction History</h3>
              </div>
              <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm divide-y divide-zinc-50">
                {transactions.length === 0 ? (
                  <div className="p-12 text-center text-zinc-400">No transactions yet.</div>
                ) : (
                  transactions.map((tx) => (
                    <div key={tx.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          tx.type === 'investment' ? 'bg-blue-50 text-blue-600' : 
                          tx.type === 'bonus' ? 'bg-emerald-50 text-emerald-600' : 
                          'bg-red-50 text-red-600'
                        }`}>
                          {tx.type === 'investment' ? <TrendingUp size={20} /> : 
                           tx.type === 'bonus' ? <Shield size={20} /> : 
                           <Wallet size={20} />}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 text-sm">{tx.label}</p>
                          <p className="text-[10px] text-zinc-400">{tx.date.toLocaleDateString()} {tx.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-sm ${tx.type === 'withdrawal' || tx.type === 'investment' ? 'text-zinc-900' : 'text-emerald-600'}`}>
                          {tx.type === 'withdrawal' || tx.type === 'investment' ? '-' : '+'}GHS {tx.amount.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">{tx.status}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          );
        }
        if (activeSubPage === 'security') {
          return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <button onClick={() => setActiveSubPage('main')} className="p-2 bg-white rounded-xl shadow-sm text-zinc-600">
                  <ChevronRight size={20} className="rotate-180" />
                </button>
                <h3 className="text-xl font-bold text-zinc-900">Account Security</h3>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600" />
                  </div>
                  <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </motion.div>
          );
        }
        if (activeSubPage === 'settings') {
          return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <button onClick={() => setActiveSubPage('main')} className="p-2 bg-white rounded-xl shadow-sm text-zinc-600">
                  <ChevronRight size={20} className="rotate-180" />
                </button>
                <h3 className="text-xl font-bold text-zinc-900">Settings</h3>
              </div>
              <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm divide-y divide-zinc-50">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400">
                      <Shield size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900 text-sm">Push Notifications</p>
                      <p className="text-[10px] text-zinc-400">Get alerts about your investments</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900 text-sm">Language</p>
                      <p className="text-[10px] text-zinc-400">Current: English</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-300" />
                </div>
              </div>
            </motion.div>
          );
        }
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-2xl">
                JD
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900">John Doe</h3>
                <p className="text-zinc-500 text-sm">ID: 842910</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm divide-y divide-zinc-50">
              <MineItem onClick={() => setActiveSubPage('withdrawal')} icon={<Wallet size={20} />} label="Withdrawal" />
              <MineItem onClick={() => setActiveSubPage('history')} icon={<History size={20} />} label="Transaction History" />
              <MineItem onClick={() => setActiveSubPage('security')} icon={<Shield size={20} />} label="Account Security" />
              <MineItem onClick={() => setActiveSubPage('settings')} icon={<Settings size={20} />} label="Settings" />
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-between p-4 hover:bg-red-50 text-red-500 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogOut size={20} />
                  <span className="font-semibold">Logout</span>
                </div>
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-24 font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 rounded-b-[2rem] shadow-lg sticky top-0 z-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-blue-100 text-xs uppercase tracking-wider font-semibold">Total Balance</p>
            <h2 className="text-3xl font-bold mt-1">GHS {balance.toFixed(2)}</h2>
          </div>
          <button 
            onClick={() => {
              setActiveTab('mine');
              setActiveSubPage('main');
            }}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <TrendingUp size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
            <p className="text-blue-100 text-[10px] uppercase font-bold">Today's Income</p>
            <p className="text-lg font-semibold">GHS 0.00</p>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
            <p className="text-blue-100 text-[10px] uppercase font-bold">Total Assets</p>
            <p className="text-lg font-semibold">GHS {balance.toFixed(2)}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 mt-4">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-6 py-3 flex justify-between items-center z-20">
        <NavItem 
          active={activeTab === 'home'} 
          onClick={() => {
            setActiveTab('home');
            setActiveSubPage('main');
          }}
          icon={<HomeIcon />} 
          label="Home" 
        />
        <NavItem 
          active={activeTab === 'invest'} 
          onClick={() => {
            setActiveTab('invest');
            setActiveSubPage('main');
          }}
          icon={<InvestIcon />} 
          label="Invest" 
        />
        <NavItem 
          active={activeTab === 'team'} 
          onClick={() => {
            setActiveTab('team');
            setActiveSubPage('main');
          }}
          icon={<TeamIcon />} 
          label="Team" 
        />
        <NavItem 
          active={activeTab === 'mine'} 
          onClick={() => {
            setActiveTab('mine');
            setActiveSubPage('main');
          }}
          icon={<UserIcon />} 
          label="Mine" 
        />
      </nav>

      {/* Investment Confirmation Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isInvesting && setSelectedPlan(null)}
              className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 flex items-center justify-center p-6 z-[70] pointer-events-none"
            >
              <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl pointer-events-auto text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <TrendingUp size={40} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Confirm Investment</h3>
                <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                  You are about to invest in <span className="font-bold text-blue-600">{selectedPlan.name}</span> for <span className="font-bold text-zinc-900">GHS {selectedPlan.price}</span>.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={handleInvest}
                    disabled={isInvesting}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isInvesting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Confirm & Pay'
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    disabled={isInvesting}
                    className="w-full bg-zinc-100 text-zinc-600 font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function TeamStat({ label, value, sub }: { label: string, value: string, sub: string }) {
  return (
    <div className="bg-white rounded-2xl p-3 border border-zinc-100 shadow-sm text-center">
      <p className="text-[10px] uppercase font-bold text-zinc-400">{label}</p>
      <p className="text-lg font-bold text-zinc-900 my-1">{value}</p>
      <p className="text-[10px] font-bold text-blue-600">{sub}</p>
    </div>
  );
}

function MineItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors text-zinc-700"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>
      <ChevronRight size={18} className="text-zinc-300" />
    </button>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-blue-600' : 'text-zinc-400'}`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
  );
}

// Simple SVG icons for nav
const HomeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const InvestIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const TeamIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const UserIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
