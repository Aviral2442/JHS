import React, { useState, useEffect, useRef } from 'react';
import {
  BrainCircuit,
  Wallet,
  Users,
  Zap,
  Shield,
  Activity,
  Globe,
  Cpu,
  Network,
  Sparkles,
  Lock,
  QrCode,
  Share2,
  TrendingUp,
  Palette,
  Orbit,
  Satellite,
  Brain,
  CircuitBoard,
  Binary,
  Crystals,
  Waves,
  Nebula,
  Atom,
  Infinity,
  Matrix,
  Radar,
  SatelliteDish,
  Cloud
} from 'lucide-react';

// Particle animation for background
const NeuralParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      connections: number[];
    }> = [];
    
    const colors = [
      'rgba(0, 247, 255, 0.8)',
      'rgba(168, 85, 247, 0.8)',
      'rgba(255, 0, 234, 0.8)',
      'rgba(0, 255, 157, 0.8)'
    ];
    
    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: []
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      particles.forEach((p1, i) => {
        particles.forEach((p2, j) => {
          if (i !== j) {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, 247, 255, ${0.2 * (1 - distance/150)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      });
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.3 }}
    />
  );
};

// Holographic Card Component
const HolographicCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}> = ({ children, className = '', glowColor = 'rgba(0, 247, 255, 0.3)' }) => {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
            rgba(0, 0, 0, 0.8) 0%,
            rgba(20, 20, 40, 0.9) 50%,
            rgba(0, 0, 0, 0.8) 100%)`,
          border: '1px solid rgba(0, 247, 255, 0.2)',
          boxShadow: `0 0 40px ${glowColor}`,
        }}
      />
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
};

// Animated Progress Ring
const ProgressRing: React.FC<{
  progress: number;
  size?: number;
  strokeWidth?: number;
  colors?: [string, string];
}> = ({ progress, size = 80, strokeWidth = 8, colors = ['#00f7ff', '#a855f7'] }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#gradient-${colors.join('-')})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id={`gradient-${colors.join('-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold" style={{ color: colors[0] }}>
          {progress}%
        </span>
      </div>
    </div>
  );
};

// Main Component
const NeuroFinanceDashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'neural' | 'quantum' | 'hologram'>('neural');
  const [balance, setBalance] = useState(12542.75);
  const [neuralActivity, setNeuralActivity] = useState(72);
  const [securityScore, setSecurityScore] = useState(98);
  const [referralBoost, setReferralBoost] = useState(3.2);
  const [isTransferring, setIsTransferring] = useState(false);
  
  const modules = [
    {
      id: 'neural',
      name: 'Neural Network',
      icon: BrainCircuit,
      color: '#00f7ff',
      description: 'AI-powered financial insights'
    },
    {
      id: 'quantum',
      name: 'Quantum Wallet',
      icon: Cpu,
      color: '#a855f7',
      description: 'Quantum-secure transactions'
    },
    {
      id: 'hologram',
      name: 'Hologram Interface',
      icon: Globe,
      color: '#ff00ea',
      description: '3D visualization engine'
    }
  ];
  
  const transactions = [
    { id: 1, type: 'credit', amount: 2500, description: 'AI Trading Profit', time: '2 mins ago', icon: Sparkles },
    { id: 2, type: 'debit', amount: 899, description: 'Quantum Hardware', time: '1 hour ago', icon: Cpu },
    { id: 3, type: 'credit', amount: 500, description: 'Referral Bonus', time: '3 hours ago', icon: Users },
    { id: 4, type: 'credit', amount: 1250, description: 'Neural Network Reward', time: '5 hours ago', icon: BrainCircuit },
    { id: 5, type: 'debit', amount: 299, description: 'Cloud Processing', time: '1 day ago', icon: Cloud },
  ];
  
  const referralStats = [
    { label: 'Active Nodes', value: '247', change: '+12%', icon: Network },
    { label: 'Network Power', value: '3.2kW', change: '+5%', icon: Zap },
    { label: 'Data Streams', value: '1.2TB/s', change: '+8%', icon: Waves },
    { label: 'Quantum Links', value: '48', change: '+15%', icon: CircuitBoard },
  ];
  
  const simulateTransfer = () => {
    setIsTransferring(true);
    setTimeout(() => {
      setBalance(prev => prev + 1000);
      setIsTransferring(false);
    }, 1500);
  };
  
  const increaseNeuralActivity = () => {
    setNeuralActivity(prev => Math.min(prev + 5, 100));
  };
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900" />
        <NeuralParticles />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,247,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                  NeuroFinance Matrix
                </h1>
                <p className="text-gray-400">Quantum-Enhanced Consumer Profile</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm">Security Level: Quantum</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-cyan-500" />
                <span className="text-sm">Neural Sync: {neuralActivity}%</span>
              </div>
            </div>
          </div>
          
          {/* Module Selector */}
          <div className="flex space-x-4">
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id as any)}
                className={`relative px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                  activeModule === module.id
                    ? 'border border-cyan-500/50 bg-cyan-500/10'
                    : 'border border-gray-800 bg-black/20 hover:bg-gray-900/50'
                }`}
                style={{
                  boxShadow: activeModule === module.id
                    ? `0 0 20px ${module.color}40`
                    : 'none'
                }}
              >
                <div className="flex items-center space-x-2">
                  <module.icon className="w-5 h-5" style={{ color: module.color }} />
                  <span>{module.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quantum Balance Card */}
          <div className="lg:col-span-2">
            <HolographicCard glowColor="rgba(0, 247, 255, 0.4)">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-2 flex items-center">
                    <Wallet className="w-6 h-6 mr-2 text-cyan-400" />
                    Quantum Balance
                  </h2>
                  <p className="text-gray-400">Real-time multi-dimensional asset tracking</p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <button
                    onClick={simulateTransfer}
                    disabled={isTransferring}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 transition-all duration-300 flex items-center"
                  >
                    {isTransferring ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Quantum Transfer
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="flex items-center text-green-500">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>+12.4% this month</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-black/30 border border-gray-800">
                  <div className="text-sm text-gray-400 mb-1">Active Chains</div>
                  <div className="text-xl font-bold text-cyan-400">12</div>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-gray-800">
                  <div className="text-sm text-gray-400 mb-1">Quantum Yield</div>
                  <div className="text-xl font-bold text-purple-400">8.42%</div>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-gray-800">
                  <div className="text-sm text-gray-400 mb-1">AI Rewards</div>
                  <div className="text-xl font-bold text-green-400">$342</div>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-gray-800">
                  <div className="text-sm text-gray-400 mb-1">Risk Score</div>
                  <div className="text-xl font-bold text-yellow-400">A+</div>
                </div>
              </div>
            </HolographicCard>
          </div>
          
          {/* Neural Activity Card */}
          <div>
            <HolographicCard glowColor="rgba(168, 85, 247, 0.4)">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <BrainCircuit className="w-6 h-6 mr-2 text-purple-400" />
                Neural Activity
              </h2>
              
              <div className="flex flex-col items-center mb-6">
                <ProgressRing progress={neuralActivity} colors={['#a855f7', '#ec4899']} />
                <button
                  onClick={increaseNeuralActivity}
                  className="mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Boost Neural Sync
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Processing Power</span>
                  <span className="text-cyan-400">82%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '82%' }} />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Memory Allocation</span>
                  <span className="text-purple-400">64%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '64%' }} />
                </div>
              </div>
            </HolographicCard>
          </div>
        </div>
        
        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions */}
          <div className="lg:col-span-2">
            <HolographicCard>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Binary className="w-6 h-6 mr-2 text-green-400" />
                  Quantum Transactions
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-800 rounded-lg">
                    <QrCode className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded-lg">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {transactions.map(tx => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        tx.type === 'credit'
                          ? 'bg-green-500/10 border border-green-500/30'
                          : 'bg-red-500/10 border border-red-500/30'
                      }`}>
                        <tx.icon className={`w-6 h-6 ${
                          tx.type === 'credit' ? 'text-green-400' : 'text-red-400'
                        }`} />
                      </div>
                      <div>
                        <div className="font-medium">{tx.description}</div>
                        <div className="text-sm text-gray-400">{tx.time}</div>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${
                      tx.type === 'credit' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </HolographicCard>
          </div>
          
          {/* Referral Network */}
          <div>
            <HolographicCard glowColor="rgba(255, 0, 234, 0.4)">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <SatelliteDish className="w-6 h-6 mr-2 text-pink-400" />
                Neural Network
              </h2>
              
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-pink-500/30">
                <div className="text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                  {referralBoost.toFixed(1)}x
                </div>
                <div className="text-center text-gray-300">Network Boost Multiplier</div>
              </div>
              
              <div className="space-y-4">
                {referralStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10">
                        <stat.icon className="w-4 h-4 text-pink-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                        <div className="font-bold">{stat.value}</div>
                      </div>
                    </div>
                    <div className="text-green-400 text-sm">{stat.change}</div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center">
                <Network className="w-5 h-5 mr-2" />
                Expand Neural Network
              </button>
            </HolographicCard>
          </div>
        </div>
        
        {/* Security & Status Bar */}
        <div className="mt-8">
          <HolographicCard>
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="relative">
                  <Lock className="w-8 h-8 text-green-400" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="font-bold">Quantum Encryption Active</div>
                  <div className="text-sm text-gray-400">Security Score: {securityScore}/100</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">24/7</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">0ms</div>
                  <div className="text-sm text-gray-400">Latency</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">∞</div>
                  <div className="text-sm text-gray-400">Scalability</div>
                </div>
              </div>
            </div>
          </HolographicCard>
        </div>
        
        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
          <button className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
            <Sparkles className="w-6 h-6" />
          </button>
          <button className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
            <Orbit className="w-6 h-6" />
          </button>
          <button className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg hover:shadow-green-500/30 transition-all duration-300">
            <Matrix className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Ambient Glow Effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    </div>
  );
};

// Export the main component
export default NeuroFinanceDashboard;