import React, { useState, useRef } from 'react';
import { 
  Fingerprint, Sparkles, Cat, PiggyBank, Heart, 
  Search, Utensils, Banana, Cloud, Moon, Crown, 
  Coffee, BatteryWarning, Ghost, Armchair, Layers, Snowflake, 
  Drumstick, Meh, User, Zap, Dumbbell, Glasses, Music, 
  Wifi, Leaf, FileQuestion, Diamond, Trophy, ShieldCheck, Stars,
  Briefcase, Shovel, Eye, Lock, Github
} from 'lucide-react';

interface Outcome {
  id: string;
  category: 'super_rare' | 'rare' | 'human' | 'pig' | 'cat' | 'special';
  title: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
}

type AppStatus = 'idle' | 'scanning' | 'result';

export default function App() {
  const [status, setStatus] = useState<AppStatus>('idle'); 
  const [progress, setProgress] = useState<number>(0);
  const [result, setResult] = useState<Outcome | null>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // --- v1.1.3 终极结果大百科 ---
  const outcomes: Outcome[] = [
    // ================= 🏆 超级稀有区 (1个) =================
    {
      id: 'super_chimera',
      category: 'super_rare',
      title: "天选混沌体 🌌",
      desc: "【UR级·千分之一掉率】系统过载！你同时拥有人类的智慧、猪猪的快乐和猫咪的妩媚。你是超越物种界限的究极生命体！",
      color: "from-indigo-600 via-purple-600 to-pink-600",
      icon: <Stars className="w-20 h-20 text-yellow-300 animate-spin-slow" />
    },

    // ================= 💎 稀有区 (4个) =================
    {
      id: 'rare_diamond',
      category: 'rare',
      title: "钻石猪猪 💎",
      desc: "【SSR】身价过亿。你不仅是一只猪，还是一只镶钻的、坚不可摧的、闪闪发光的精致猪猪。",
      color: "from-cyan-400 to-blue-500",
      icon: <Diamond className="w-16 h-16 text-white" />
    },
    {
      id: 'rare_super',
      category: 'rare',
      title: "超级猪猪 🦸",
      desc: "【SSR】内裤外穿的不一定是超人，也可能是超级猪猪。你拥有拯救世界（主要是拯救剩饭）的超能力。",
      color: "from-red-600 to-yellow-500",
      icon: <ShieldCheck className="w-16 h-16 text-white" />
    },
    {
      id: 'rare_gold_cat',
      category: 'rare',
      title: "金渐层猪咪 🏆",
      desc: "【SSR】招财进宝。你圆润的脸庞写满了“富贵”二字，是一只行走的招财猫（猪）。",
      color: "from-yellow-400 to-amber-600",
      icon: <Trophy className="w-16 h-16 text-white" />
    },
    {
      id: 'rare_silver_cat',
      category: 'rare',
      title: "银渐层猪咪 🪙",
      desc: "【SSR】优雅永不过时。虽然体重超标，但你灰白相间的皮毛让你看起来像个贵族绅士。",
      color: "from-slate-300 to-gray-500",
      icon: <Sparkles className="w-16 h-16 text-white" />
    },

    // ================= 🧍‍♂️ 人类阵营 (5个) =================
    {
      id: 'human_normal',
      category: 'human',
      title: "纯正人类 🧍‍♂️",
      desc: "【碳基生物】经过反复核对，你目前各项指标均属于人类范畴。没有猪耳朵，也没有猫尾巴。请继续保持！",
      color: "from-blue-500 to-indigo-600",
      icon: <User className="w-16 h-16 text-white" />
    },
    {
      id: 'human_worker',
      category: 'human',
      title: "天选打工人 💼",
      desc: "【职场生物】检测显示你不是猪，也不是猫，但你的基因里写满了“早八”和“加班”。虽然不是猪，但干着牛马的活。",
      color: "from-slate-500 to-slate-700",
      icon: <Briefcase className="w-16 h-16 text-white" />
    },
    {
      id: 'human_scooper',
      category: 'human',
      title: "卑微铲屎官 🧹",
      desc: "【服务型人类】你的手不是用来拿猪蹄的，是用来开罐头和铲猫砂的。你在食物链的地位低于猪和猫。",
      color: "from-amber-600 to-orange-700",
      icon: <Shovel className="w-16 h-16 text-white" />
    },
    {
      id: 'human_royal',
      category: 'human',
      title: "在逃贵族 👑",
      desc: "【高贵人类】系统提示：您的气质过于高贵，无法匹配猪猪数据库。请问您的皇冠掉在哪里了？",
      color: "from-rose-400 to-pink-500",
      icon: <Crown className="w-16 h-16 text-white" />
    },
    {
      id: 'human_watcher',
      category: 'human',
      title: "吃瓜群众 🍉",
      desc: "【围观人类】你不是来测自己是不是猪的，你只是来看看别人是不是猪的。看热闹不嫌事大。",
      color: "from-green-500 to-emerald-600",
      icon: <Eye className="w-16 h-16 text-white" />
    },


    // ================= 🐷 猪猪阵营 (7个) =================
    {
      id: 'pig_classic',
      category: 'pig',
      title: "原生猪猪 🐷",
      desc: "【返璞归真】在这个浮躁的世界里，没有花里胡哨的修饰，你就是最纯粹、最快乐、最原汁原味的猪猪本猪！",
      color: "from-pink-500 to-rose-600",
      icon: <PiggyBank className="w-16 h-16 text-white" />
    },
    {
      id: 'pig_cute',
      category: 'pig',
      title: "绝世可爱猪 🌸",
      desc: "你是吃可爱多长大的吗？虽然不仅吃得多还睡得多，但因为实在太可爱了，全世界都原谅了你的懒惰。",
      color: "from-pink-300 to-pink-400",
      icon: <Heart className="w-16 h-16 text-white" />
    },
    {
      id: 'pig_bailan',
      category: 'pig',
      title: "摆烂猪 🫠",
      desc: "“算了吧”、“没必要”、“随便吧”。你的猪生信条是：只要我放弃得够快，困难就困不住我。",
      color: "from-slate-400 to-gray-500",
      icon: <Ghost className="w-16 h-16 text-white" />
    },
    {
      id: 'pig_tangping',
      category: 'pig',
      title: "咸鱼躺平猪 🛋️",
      desc: "能坐着绝不站着，能躺着绝不坐着。你已掌握了名为“地心引力顺从术”的各种姿势。",
      color: "from-teal-400 to-emerald-500",
      icon: <Armchair className="w-16 h-16 text-white" />
    },
    {
      id: 'pig_sleep',
      category: 'pig',
      title: "呼呼大睡猪 💤",
      desc: "特长是随时随地关机重启。别人是在生活，你是在休眠模式中偶尔醒来吃个饭。",
      color: "from-indigo-400 to-violet-500",
      icon: <Moon className="w-16 h-16 text-white" />
    },
    {
      id: 'pig_eat',
      category: 'pig',
      title: "暴风吸入猪 🍚",
      desc: "你的胃里住着一个黑洞。听到“开饭了”三个字时，你的奔跑速度能超越猎豹。",
      color: "from-orange-400 to-red-500",
      icon: <Utensils className="w-16 h-16 text-white" />
    },
    {
      id: 'pig_work',
      category: 'pig',
      title: "努力猪猪 💪",
      desc: "虽然身体是猪，但志气很高！每天勤勤恳恳，为了赚那几棵白菜操碎了心。加油啊猪猪！",
      color: "from-blue-600 to-blue-800",
      icon: <BatteryWarning className="w-16 h-16 text-white" />
    },

    // ================= 🐱 猪咪阵营 (7个) =================
    {
      id: 'cat_classic',
      category: 'cat',
      title: "标准猪咪 🐱",
      desc: "【混血王子】猫的傲娇 + 猪的食量。在猫猫界你是最能吃的，在猪猪界你是最灵活的！",
      color: "from-orange-400 to-amber-500",
      icon: <Cat className="w-16 h-16 text-white" />
    },
    {
      id: 'cat_orange',
      category: 'cat',
      title: "大橘为重 🍊",
      desc: "十个橘猫九个胖，还有一个...压塌炕。你不仅拥有橘猫的高贵血统，还完美继承了猪猪的体重。",
      color: "from-orange-500 to-red-600",
      icon: <Crown className="w-16 h-16 text-white" />
    },
    {
      id: 'cat_liquid',
      category: 'cat',
      title: "液体猪咪 💧",
      desc: "你是一摊既有重量又有流动性的生物。虽然胖，但是只要头能过去，身子（大概）也能挤过去。",
      color: "from-sky-300 to-blue-400",
      icon: <Cloud className="w-16 h-16 text-white" />
    },
    {
      id: 'cat_lazy',
      category: 'cat',
      title: "大爷猪咪 🍵",
      desc: "眼神三分薄凉三分讥笑四分漫不经心。你不是懒，你只是在思考如何更舒服地指挥铲屎官。",
      color: "from-stone-400 to-stone-600",
      icon: <Coffee className="w-16 h-16 text-white" />
    },
    {
      id: 'cat_kungfu',
      category: 'cat',
      title: "功夫猪咪 🥋",
      desc: "虽然肚子圆圆，但身手矫健。每天凌晨三点在家里跑酷、飞檐走壁的就是你吧？",
      color: "from-red-500 to-orange-500",
      icon: <Dumbbell className="w-16 h-16 text-white" />
    },
    {
      id: 'cat_scholar',
      category: 'cat',
      title: "深沉猪咪 👓",
      desc: "你看上去很有文化，总是盯着窗外思考猫生哲学。其实你只是在想：晚饭吃罐头还是吃冻干？",
      color: "from-emerald-600 to-teal-700",
      icon: <Glasses className="w-16 h-16 text-white" />
    },
    {
      id: 'cat_disco',
      category: 'cat',
      title: "迪斯科猪咪 🕺",
      desc: "白天睡得像昏迷，晚上精神像蹦迪。你是夜行动物界的派对之王，嗨起来！",
      color: "from-fuchsia-500 to-purple-600",
      icon: <Music className="w-16 h-16 text-white" />
    },

    // ================= 🤡 特殊搞怪类 (10个) =================
    {
      id: 'special_joke',
      category: 'special',
      title: "冷笑话发射器 🥶",
      desc: "系统检测到一股寒气... 问：一只猪晕车了怎么办？... 答：'朱茵'（猪晕）。哈...哈...哈...",
      color: "from-cyan-500 to-blue-600",
      icon: <Snowflake className="w-16 h-16 text-white" />
    },
    {
      id: 'special_food',
      category: 'special',
      title: "高端的食材 🥓",
      desc: "检测结果有些尴尬...比起物种，你更像是一道菜。高端的食材往往只需要最朴素的烹饪方式...",
      color: "from-red-700 to-rose-900",
      icon: <Drumstick className="w-16 h-16 text-white" />
    },
    {
      id: 'special_recursion',
      category: 'special',
      title: "禁止套娃 🪆",
      desc: "检测结果：【你是一只正在测自己是不是猪的猪】。请不要在猪里面找猪，系统要死机了。",
      color: "from-violet-600 to-purple-800",
      icon: <Layers className="w-16 h-16 text-white" />
    },
    {
      id: 'special_monkey',
      category: 'special',
      title: "是吗喽 🐒",
      desc: "咦？基因序列乱码？检测结果显示你是一只每天喊着“收到”、“好的”的打工吗喽。",
      color: "from-yellow-600 to-amber-700",
      icon: <Banana className="w-16 h-16 text-white" />
    },
    {
      id: 'special_lazy',
      category: 'special',
      title: "无法显示 😑",
      desc: "系统累了，不想编了。你自己照照镜子，觉得自己是啥就是啥吧。爱咋咋地。",
      color: "from-gray-500 to-gray-700",
      icon: <Meh className="w-16 h-16 text-white" />
    },
    {
      id: 'special_alien',
      category: 'special',
      title: "伪装失败 👽",
      desc: "警报！检测到非地球生物反应！你的猪猪伪装服拉链开了，触角露出来了喵！",
      color: "from-green-500 to-emerald-700",
      icon: <Zap className="w-16 h-16 text-white" />
    },
    {
      id: 'special_troll',
      category: 'special',
      title: "网络杠精 🗯️",
      desc: "检测显示你的抬杠能力满级。系统说你是猪，你肯定要反驳：“你怎么知道？你见过？”",
      color: "from-red-500 to-orange-600",
      icon: <User className="w-16 h-16 text-white rotate-180" />
    },
    {
      id: 'special_wifi',
      category: 'special',
      title: "路由器 📶",
      desc: "你的生物磁场很奇怪，好像能发射Wi-Fi信号？...等等，怎么只有一格信号？太弱了吧。",
      color: "from-sky-500 to-blue-600",
      icon: <Wifi className="w-16 h-16 text-white" />
    },
    {
      id: 'special_cabbage',
      category: 'special',
      title: "大白菜 🥬",
      desc: "好消息：你不是猪。坏消息：你是等着被猪拱的大白菜。水灵灵的，看着挺好吃的。",
      color: "from-green-400 to-emerald-500",
      icon: <Leaf className="w-16 h-16 text-white" />
    },
    {
      id: 'special_404',
      category: 'special',
      title: "404 Not Found 🚫",
      desc: "错误：未找到对象。系统扫描了半天，发现你不仅不是猪，好像还没有对象（恋人）。扎心了。",
      color: "from-zinc-600 to-zinc-800",
      icon: <FileQuestion className="w-16 h-16 text-white" />
    }
  ];

  const startScan = (e: React.MouseEvent | React.TouchEvent) => {
    // Check if cancelable for touch events to avoid console warnings
    if (e.cancelable) e.preventDefault();
    if (status === 'result') return;

    setStatus('scanning');
    setProgress(0);
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const duration = 2000;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress < 100) {
        timerRef.current = requestAnimationFrame(animate);
      } else {
        finishScan();
      }
    };

    timerRef.current = requestAnimationFrame(animate);
  };

  const cancelScan = () => {
    if (status === 'scanning' && progress < 100) {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      setStatus('idle');
      setProgress(0);
    }
  };

  const finishScan = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    
    // --- 逻辑: 检查是否已有当天结果 ---
    const today = new Date().toDateString();
    let finalResult: Outcome;
    let savedRecord = null;
    
    try {
       savedRecord = localStorage.getItem('pig_test_record_v1');
    } catch(e) {
       console.error("Local storage error", e);
    }

    if (savedRecord) {
      const { date, resultId } = JSON.parse(savedRecord);
      // 如果今天是同一天，且有有效ID，则直接使用旧结果
      if (date === today && resultId) {
         const found = outcomes.find(o => o.id === resultId);
         if (found) {
            finalResult = found;
            setResult(finalResult);
            setStatus('result');
            return; // 直接返回，不再计算新结果
         }
      }
    }

    // --- 概率算法 ---
    // 概率累加 (Cumulative Probability)
    const rand = Math.random();
    let category = '';

    // 1. 超级稀有: 0 ~ 0.001 (0.1%)
    if (rand < 0.001) {
      category = 'super_rare';
    }
    // 2. 稀有: 0.001 ~ 0.011 (总1% -> 4个项，每项0.25%)
    else if (rand < 0.011) {
      category = 'rare';
    }
    // 3. 特殊: 0.011 ~ 0.111 (总10% -> 10个项，每项1%)
    else if (rand < 0.111) {
      category = 'special';
    }
    // 4. 人类: 0.111 ~ 0.236 (总12.5% -> 5个项，每项2.5%)
    else if (rand < 0.236) {
      category = 'human';
    }
    // 5. 猪咪: 0.236 ~ 0.586 (总35% -> 7个项，每项5%)
    else if (rand < 0.586) {
      category = 'cat';
    }
    // 6. 猪猪: 0.586 ~ 1.0 (剩余所有 ≈ 41.4%)
    else {
      category = 'pig';
    }

    // 从选定分类中随机抽取
    const candidates = outcomes.filter(item => item.category === category);
    finalResult = candidates.length > 0 
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : outcomes.find(o => o.id === 'pig_classic') || outcomes[0];

    // --- 保存新结果到本地存储 ---
    try {
      localStorage.setItem('pig_test_record_v1', JSON.stringify({
        date: today,
        resultId: finalResult.id
      }));
    } catch (e) {
      console.error("Save error", e);
    }

    setResult(finalResult);
    setStatus('result');
  };

  const resetTest = () => {
    setStatus('idle');
    setResult(null);
    setProgress(0);
  };

  // 根据稀有度决定背景光效
  const getGlowColor = () => {
    if (result?.category === 'super_rare') return 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 animate-pulse';
    if (result?.category === 'rare') return 'bg-yellow-300';
    if (status === 'scanning') return 'bg-pink-300';
    return 'bg-pink-200';
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 select-none touch-none relative overflow-hidden" style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}>
      
      {/* 标题区域 */}
      <div className="text-center mb-8 relative z-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl font-black text-pink-600 tracking-wider drop-shadow-sm">
          测测你是不是猪
        </h1>
      </div>

      {/* 主互动区域 */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* 背景光晕 - 动态变化 */}
        <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${status === 'scanning' ? 'scale-125 opacity-60 animate-pulse' : 'scale-90 opacity-20'} ${getGlowColor()}`}></div>

        {/* 扫描进度圈 (SVG) */}
        <svg className="absolute w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#fbcfe8" // pink-200
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#ec4899" // pink-500
            strokeWidth="6"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-75 ease-linear"
          />
        </svg>

        {/* 指纹按钮 */}
        <div
          className={`relative z-20 bg-white w-48 h-48 rounded-full shadow-[0_10px_50px_-10px_rgba(236,72,153,0.4)] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${status === 'scanning' ? 'scale-95 shadow-inner' : 'scale-100 hover:scale-[1.02] active:scale-95'}`}
          onMouseDown={startScan}
          onMouseUp={cancelScan}
          onMouseLeave={cancelScan}
          onTouchStart={startScan}
          onTouchEnd={cancelScan}
          onContextMenu={(e) => e.preventDefault()}
        >
          {status === 'idle' && (
            <Fingerprint className="w-24 h-24 text-pink-400 animate-[pulse_3s_infinite]" strokeWidth={1.5} />
          )}
          {status === 'scanning' && (
            <div className="flex flex-col items-center">
              <Search className="w-16 h-16 text-pink-500 animate-[bounce_0.5s_infinite]" />
              <span className="mt-2 text-pink-500 font-black text-2xl font-mono tabular-nums">{Math.floor(progress)}%</span>
            </div>
          )}
          {status === 'result' && (
             <div className="text-pink-400 font-bold animate-pulse">松手查看</div>
          )}
        </div>
      </div>

      {/* 状态提示文字 */}
      <div className="h-12 mt-8 flex flex-col items-center justify-center">
        {status === 'idle' && (
           <p className="font-bold text-pink-400 text-lg animate-bounce">👇 长按指纹，寻找真实的自己</p>
        )}
        {status === 'scanning' && (
          <p className="font-bold text-pink-500 text-lg">正在解析灵魂序列...</p>
        )}
        {status === 'result' && (
          <p className="font-bold text-pink-500 text-lg">检测报告已生成</p>
        )}
      </div>

      {/* 结果弹窗 (Modal) */}
      {status === 'result' && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl transform transition-all animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 border-4 border-white">
            
            {/* 结果头部颜色 */}
            <div className={`h-40 bg-gradient-to-br ${result.color} flex flex-col items-center justify-center relative overflow-hidden`}>
              {/* 稀有结果的特殊光效 */}
              {(result.category === 'rare' || result.category === 'super_rare') && (
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 animate-pulse"></div>
              )}
              {result.category === 'special' && (
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
              )}

              <div className="relative z-10 scale-150 drop-shadow-lg mb-2 transition-transform hover:scale-[1.7] duration-500">
                {result.icon}
              </div>
              
              <div className={`relative z-10 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-md mt-2 shadow-sm
                ${result.category === 'super_rare' ? 'bg-yellow-400/80 text-yellow-900 border border-yellow-200' : 
                  result.category === 'rare' ? 'bg-blue-400/50 text-white border border-blue-200' : 
                  'bg-black/10 text-white/90'}
              `}>
                {result.category === 'super_rare' ? '★★★ UR 究极稀有 ★★★' : 
                 result.category === 'rare' ? '★ SSR 稀有 ★' : 
                 result.category === 'special' ? '特殊事件' : 
                 result.category === 'human' ? '人类阵营' :
                 result.category === 'pig' ? '猪猪认证' : '猪咪认证'}
              </div>
            </div>

            {/* 结果内容 */}
            <div className="p-8 text-center relative">
               {/* 404 彩蛋背景字 */}
               {result.id === 'special_404' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-black text-gray-100 -z-10 rotate-12">?</div>}

              <h2 className="text-3xl font-black text-gray-800 mb-2 leading-tight">{result.title}</h2>
              <div className="w-12 h-1 bg-gray-100 mx-auto rounded-full mb-6"></div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
                {result.desc}
              </p>

              {/* 锁定状态提示 */}
              <div className="w-full py-4 rounded-2xl bg-gray-100 border border-gray-200 text-gray-400 font-bold text-sm flex items-center justify-center gap-2 select-none">
                 <Lock size={16} />
                 刷新不会改变哦，明天再试吧
              </div>

            </div>
          </div>
        </div>
      )}
      
      {/* 底部申明 */}
      <div className="fixed bottom-4 left-0 right-0 text-center text-pink-300/60 text-[10px] tracking-widest">
         ✦ Powered by Gemini
      </div>

      {/* 左下角 GitHub 链接 (大图标) */}
      <a 
        href="https://github.com/MiaowCham/am-i-a-pig" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-2 left-2 text-pink-300/40 hover:text-pink-500 transition-colors z-50"
        aria-label="View on GitHub"
      >
        <Github size={20} />
      </a>

      {/* 版本号 */}
      <div className="fixed bottom-2 right-2 text-[10px] text-pink-300/40 font-mono z-50">
        v1.1.3
      </div>
    </div>
  );
}