import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './index.css';
import hero from './assets/hero.png';
// Datasets
const techWords = ["AI-powered", "Blockchain-based", "Cloud-native", "Serverless", "Quantum", "Decentralized", "Web3"];
const featureWords = ["Real-time", "Automated", "Predictive", "Omnichannel", "Scalable", "Social", "Sustainable"];
const industryWords = ["FinTech", "HealthTech", "EdTech", "PropTech", "SaaS", "Cybersecurity", "E-commerce"];
const personalities = ["Disruptive", "Aggressive", "Visionary", "Pragmatic", "Chaotic Good"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateTagline = (personality, industry) => {
  const taglines = {
    "Disruptive": `Breaking all the rules in ${industry} so you don't have to.`,
    "Aggressive": `Dominating the ${industry} space block by block.`,
    "Visionary": `We saw the future of ${industry}. And it's expensive.`,
    "Pragmatic": `A sensible, boring, but highly profitable take on ${industry}.`,
    "Chaotic Good": `Making ${industry} weird again. (And monetizing it).`
  };
  return taglines[personality] || `Redefining ${industry} from the ground up.`;
};

function App() {
  const [step, setStep] = useState(0); // 0 = Landing, 1 = Config, 2 = Idea, 3 = Market, 4 = Pitch, 5 = Outcome
  const [config, setConfig] = useState({ name: 'My Next Decacorn', budget: 50, risk: 'Medium' });
  const [simData, setSimData] = useState({
    idea: '', techTag: '', industryTag: '', personality: '', tagline: '',
    marketDemand: 0, competition: 0, growth: 0,
    investorReaction: '', funding: 0, outcome: '',
    stats: { months: 0, coffee: 0, pivots: 0 }
  });

  const launchConfetti = () => {
    const duration = 4000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 65, origin: { x: 0 }, colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#fff'] });
      confetti({ particleCount: 6, angle: 120, spread: 65, origin: { x: 1 }, colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#fff'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  useEffect(() => {
    if (step === 5 && simData.outcome === 'Unicorn') launchConfetti();
  }, [step, simData.outcome]);

  const generateData = () => {
    const word1 = getRandom(techWords);
    const word2 = getRandom(featureWords);
    const word3 = getRandom(industryWords);
    const personality = getRandom(personalities);
    const tagline = generateTagline(personality, word3);
    
    let demand = Math.floor(Math.random() * 40) + 30; 
    let comp = Math.floor(Math.random() * 50) + 20; 
    let gwth = Math.floor(Math.random() * 30) + 20; 
    
    if (config.risk === 'High') {
      demand += Math.floor(Math.random() * 30);
      comp += 20;
      gwth += Math.floor(Math.random() * 50);
    } else if (config.risk === 'Low') {
      demand += 10; comp -= 10; gwth += 10;
    }

    if (config.budget > 70) { gwth += 10; comp -= 5; }

    demand = Math.min(100, Math.max(0, demand));
    comp = Math.min(100, Math.max(0, comp));
    gwth = Math.min(100, Math.max(0, gwth));

    const score = (demand * 2 + gwth * 2 - comp) + (config.budget / 2);
    let reaction = ''; let fund = 0;
    
    if (score > 200) {
      reaction = "Take my money! 🚀";
      fund = Math.floor(Math.random() * 10) + 5;
    } else if (score > 120) {
      reaction = "Needs improvement, but we're in. 🤔";
      fund = Math.floor(Math.random() * 4) + 1;
    } else {
      reaction = "Too risky! ❌";
    }

    let outcomeStr = '';
    if (fund >= 5 && gwth > 70 && score > 220) outcomeStr = 'Unicorn';
    else if (fund > 0 || score > 150) outcomeStr = 'Stable';
    else outcomeStr = 'Failed';

    let months = outcomeStr === 'Failed' ? Math.floor(Math.random() * 15) + 2 : (outcomeStr === 'Unicorn' ? 84 : 48);
    let coffee = Math.floor((months * 30 * 4) + Math.random() * 1000);
    let pivots = outcomeStr === 'Failed' ? Math.floor(Math.random() * 6) + 2 : (outcomeStr === 'Unicorn' ? 1 : Math.floor(Math.random() * 3));

    setSimData({
      idea: `${word1} ${word2} platform for ${word3}`,
      techTag: word1.split('-')[0],
      industryTag: word3,
      personality: personality,
      tagline: tagline,
      marketDemand: demand,
      competition: comp,
      growth: gwth,
      investorReaction: reaction,
      funding: fund,
      outcome: outcomeStr,
      stats: { months, coffee, pivots }
    });
  };

  const startJourney = () => setStep(1);
  const handleStart = (e) => { e.preventDefault(); generateData(); setStep(2); };
  const handleNext = () => setStep(step + 1);
  const resetApp = () => setStep(0);
  const regenerateIdea = () => generateData();

  return (
    <>
      <div className={`background-orbs ${step === 5 && simData.outcome === 'Failed' ? 'bg-failed' : ''}`}>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      
      {/* Ambient layer added requested by user */}
      <div className="ambient-glow"></div>

      {/* Floating Left Panel */}
      {step >= 0 && (
        <div className="side-panel side-panel-left fade-in">
          <h4><span>🧠</span> AI Market Insights</h4>
          <div className="side-insight stagger-1">
            {/* <div className="insight-icon">🔥</div> */}
            
            <div className="insight-text">
              <strong>Trending Sectors</strong>
              <span>AI, FinTech, SaaS</span>
            </div>
          </div>
          <div className="side-insight stagger-2">
            <div className="insight-icon">📈</div>
            <div className="insight-text">
              <strong>Growth Index</strong>
              <span style={{color: '#10b981'}}>High Velocity</span>
            </div>
          </div>
          <div className="side-insight stagger-3">
            <div className="insight-icon">🚀</div>
            <div className="insight-text">
              <strong>Global Demand</strong>
              <span>Rising Sharply</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Right Panel */}
      {step >= 0 && (
        <div className="side-panel side-panel-right fade-in" style={{animationDelay: '0.2s'}}>
          <h4><span>💡</span> Startup Intelligence</h4>
          <div className="side-insight stagger-1">
            <div className="insight-icon">{config.risk === 'High' ? '⚠️' : '🛡️'}</div>
            <div className="insight-text">
              <strong>Risk Profile</strong>
              <span style={{color: config.risk === 'High' ? '#ef4444' : config.risk === 'Medium' ? '#f59e0b' : '#10b981'}}>
                {config.risk} Exposure
              </span>
            </div>
          </div>
          <div className="side-insight stagger-2">
            <div className="insight-icon">📊</div>
            <div className="insight-text">
              <strong>Opportunity</strong>
              <span style={{color: '#4ade80'}}>Strong Potential</span>
            </div>
          </div>
          <div className="side-insight stagger-3">
            <div className="insight-icon">💰</div>
            <div className="insight-text">
              <strong>Capital Status</strong>
              <span style={{color: config.budget > 60 ? '#10b981' : '#cbd5e1'}}>
                {config.budget > 60 ? 'Well Funded' : 'Bootstrapping'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Central Interactive Block */}
      {step > 0 && (
         <div className="journey-bar fade-in">
           {[1, 2, 3, 4, 5].map((node) => (
             <div key={node} className={`journey-node ${step === node ? 'active' : step > node ? 'completed' : ''}`}>
               {step > node ? '✓' : node}
             </div>
           ))}
         </div>
      )}

      <div className="fade-in" style={{width: '100%', zIndex: 1, position: 'relative'}}>
        
        {step === 0 && (
          <div className="glass-card glass-card-landing fade-in">
            {/* <h1 className="hero-title stagger-1">Startup Simulator <span style={{display: 'inline-block'}}>🚀</span></h1> */}
            <img src={hero} alt="hero" style={{ width: '120px', marginBottom: '20px' }} />

<h1 className="hero-title stagger-1">
  Startup Simulator
</h1>
            <p className="hero-subtitle stagger-2">Build, Simulate, and Scale Your Dream Startup</p>
            <button onClick={startJourney} className="btn btn-large stagger-3">Start Your Journey</button>
          </div>
        )}

        {step === 1 && (
          <div className="glass-card fade-in">
            <h2 className="stagger-1 text-center" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Founder Setup</h2>
            <p className="subtitle stagger-2">Configure your initial parameters.</p>
            <form onSubmit={handleStart} className="stagger-3" style={{marginTop: '2rem'}}>
              <div className="form-group">
                <label>Startup Name</label>
                <input 
                  type="text" 
                  value={config.name} 
                  onChange={(e) => setConfig({...config, name: e.target.value})} 
                  required
                />
              </div>
              <div className="form-group">
                <label>Initial Budget ($10K - $1M)</label>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={config.budget} 
                  onChange={(e) => setConfig({...config, budget: parseInt(e.target.value)})}
                />
                <div className="value-display">
                  ${config.budget}0,000
                </div>
              </div>
              <div className="form-group">
                <label>Risk Level</label>
                <select value={config.risk} onChange={(e) => setConfig({...config, risk: e.target.value})}>
                  <option>Low (Safe play)</option>
                  <option>Medium (Balanced)</option>
                  <option>High (All or nothing)</option>
                </select>
              </div>
              <button type="submit" className="btn stagger-4">Initialize Simulation</button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="glass-card fade-in step-content">
            <div className="step-badge stagger-1">⚡ Phase 1: Idea Generation</div>
            
            <div className="personality-badge stagger-2">
              DNA: <strong>{simData.personality}</strong>
            </div>

            <div className="tags stagger-3">
              <span className="tag tag-tech">{simData.techTag}</span>
              <span className="tag tag-industry">{simData.industryTag}</span>
            </div>
            
            <div className="stagger-4" style={{width:'100%'}}>
               <Typewriter text={simData.idea} />
               <div className="tagline">"{simData.tagline}"</div>
            </div>

            <div className="stagger-5 flex-buttons" style={{marginTop: '2.5rem', width: '100%'}}>
              <button onClick={handleNext} className="btn">Deploy & Analyze Market</button>
              <button onClick={regenerateIdea} className="btn btn-secondary">Pivot Idea</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="glass-card fade-in step-content">
            <div className="step-badge stagger-1">📊 Phase 2: Market Simulation</div>
            <p className="subtitle stagger-2">Let's see if anyone actually wants this...</p>
            
            <div className="metrics stagger-3">
              <MetricBar label="Market Demand" value={simData.marketDemand} color="linear-gradient(90deg, #ec4899, #f43f5e)" />
              <MetricBar label="Competition Level" value={simData.competition} color="linear-gradient(90deg, #f59e0b, #fbbf24)" />
              <MetricBar label="Growth Potential" value={simData.growth} color="linear-gradient(90deg, #10b981, #34d399)" />
            </div>

            <button onClick={handleNext} className="btn stagger-4" style={{marginTop: '3.5rem'}}>Pitch to Investors</button>
          </div>
        )}

        {step === 4 && (
          <div className="glass-card fade-in step-content">
            <div className="step-badge stagger-1">💼 Phase 3: Investor Pitch</div>
            <p className="subtitle stagger-2">You stand before the VCs in Silicon Valley. Sweaty palms.</p>
            
            <div style={{margin: '2rem 0'}} className="stagger-3">
              <span className="emoji-bounce">
                {simData.investorReaction.includes('🚀') ? '🤑' : simData.investorReaction.includes('❌') ? '🥶' : '🤨'}
              </span>
              <h3 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>"{simData.investorReaction}"</h3>
              
              {simData.funding > 0 ? (
                <div className="fund-amount stagger-4">
                  Secured ${simData.funding}M Funding!
                </div>
              ) : (
                <div className="shake fund-amount stagger-4" style={{color: '#ef4444', textShadow: '0 0 30px rgba(239, 68, 68, 0.4)'}}>
                  Bootstrapping it is...
                </div>
              )}
            </div>

            <button onClick={handleNext} className="btn stagger-5" style={{marginTop: '3rem'}}>Fast Forward to Exit</button>
          </div>
        )}

        {step === 5 && (
          <div className={`glass-card fade-in step-content ${simData.outcome === 'Unicorn' ? 'result-unicorn' : simData.outcome === 'Failed' ? 'glitch-card' : ''}`}>
             <div className="step-badge stagger-1">🏁 Final Outcome</div>
             
             {simData.outcome === 'Unicorn' && (
               <>
                 <span className="emoji-bounce stagger-2" style={{fontSize: '6rem'}}>🦄</span>
                 <h1 className="stagger-3 gradient-text-huge" style={{fontSize: '5.5rem', background: 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>UNICORN!</h1>
                 <p className="subtitle stagger-4" style={{marginTop: '1rem', fontSize: '1.6rem'}}>You went public! Time to buy a private island.</p>
               </>
             )}
             {simData.outcome === 'Stable' && (
               <>
                 <span className="emoji-bounce stagger-2" style={{fontSize: '6rem'}}>📈</span>
                 <h1 className="stagger-3" style={{fontSize: '4.5rem', color: '#38bdf8', textShadow: '0 0 20px rgba(56, 189, 248, 0.4)'}}>Stable Business</h1>
                 <p className="subtitle stagger-4" style={{marginTop: '1rem', fontSize: '1.6rem'}}>A solid $50M exit. You're rich, and you kept your soul.</p>
               </>
             )}
             {simData.outcome === 'Failed' && (
               <>
                 <span className="emoji-bounce stagger-2" style={{filter: 'hue-rotate(90deg)', fontSize:'6rem'}}>💀</span>
                 <h1 className="stagger-3" style={{fontSize: '5.5rem', color: '#ff0000', textShadow: '0 0 40px rgba(255, 0, 0, 0.8)'}}>BANKRUPT</h1>
                 <p className="subtitle stagger-4" style={{marginTop: '1rem', fontSize: '1.6rem', color: '#ffb3b3'}}>Back to your parents' basement to code the next one...</p>
               </>
             )}

             <div className="stats-box stagger-5">
               <div className="stat-item">
                 <span className="stat-value">{simData.stats.months}</span>
                 <span className="stat-label">Months Survived</span>
               </div>
               <div className="stat-item">
                 <span className="stat-value">{simData.stats.coffee.toLocaleString()}</span>
                 <span className="stat-label">Coffees Consumed</span>
               </div>
               <div className="stat-item">
                 <span className="stat-value">{simData.stats.pivots}</span>
                 <span className="stat-label">Product Pivots</span>
               </div>
             </div>
             
             <button onClick={resetApp} className="btn stagger-5" style={{marginTop: '4rem'}}>Start New Company</button>
          </div>
        )}
      </div>
    </>
  );
}

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => { setDisplayedText(''); setIndex(0); }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <div className="typewriter-text gradient-text">{displayedText}</div>;
};

const MetricBar = ({ label, value, color }) => {
  const [width, setWidth] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 300);
    let start = 0; const duration = 1500; const incrementTime = 30;
    const steps = duration / incrementTime; const increment = value / steps;
    
    const numTimer = setInterval(() => {
      start += increment;
      if (start >= value) { setDisplayValue(value); clearInterval(numTimer); } 
      else { setDisplayValue(Math.floor(start)); }
    }, incrementTime);

    return () => { clearTimeout(timer); clearInterval(numTimer); };
  }, [value]);

  return (
    <div className="metric-item">
      <div className="metric-label">
        <span>{label}</span>
        <span>{displayValue}%</span>
      </div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${width}%`, background: color }} />
      </div>
    </div>
  );
};

export default App;
