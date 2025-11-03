const STOPWORDS = new Set([
    'a','about','above','after','again','against','all','am','an','and','any','are','as','at',
    'be','because','been','before','being','below','between','both','but','by',
    'could','did','do','does','doing','down','during',
    'each','few','for','from','further',
    'had','has','have','having','he','her','here','hers','herself','him','himself','his','how',
    'i','if','in','into','is','it','its','itself',
    'me','more','most','my','myself',
    'no','nor','not','of','off','on','once','only','or','other','our','ours','ourselves','out','over','own',
    'same','she','should','so','some','such',
    'than','that','the','their','theirs','them','themselves','then','there','these','they','this','those','through','to','too',
    'under','until','up','very','was','we','were','what','when','where','which','while','who','whom','why','will','with','you','your','yours','yourself','yourselves'
    ]);
    
    
    function splitIntoSentences(text) {
    const raw = text.replace(/\r/g, ' ').replace(/\n+/g, '. ');
    const parts = raw.match(/[^.!?]+[.!?]?/g) || [raw];
    return parts.map(s => s.trim()).filter(Boolean);
    }
    
    
    function tokenizeWords(text) {
    return text
    .toLowerCase()
    .replace(/["'“”()\[\]_{}<>]/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
    }
    
    
    function buildFrequencyMap(words) {
    const freq = Object.create(null);
    for (const w of words) {
    if (STOPWORDS.has(w)) continue;
    freq[w] = (freq[w] || 0) + 1;
    }
    return freq;
    }
    
    
    function scoreSentences(sentences, freqMap) {
    return sentences.map((s, idx) => {
    const words = tokenizeWords(s);
    let score = 0;
    for (const w of words) {
    if (freqMap[w]) score += freqMap[w];
    }
    const len = words.length || 1;
    score = score / Math.log(len + 1);
    return { idx, score, text: s };
    });
    }
    
    
    function summarize(text, maxSentences = 3) {
    if (!text || typeof text !== 'string') return '';
    const sentences = splitIntoSentences(text);
    if (sentences.length <= maxSentences) return sentences.join(' ');
    
    
    const words = tokenizeWords(text);
    const freqMap = buildFrequencyMap(words);
    const scored = scoreSentences(sentences, freqMap);
    
    
    const top = scored
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .sort((a, b) => a.idx - b.idx)
    .map(s => s.text);
    
    
    return top.join(' ');
    }

    function classifyText(text) {
        const lower = text.toLowerCase();
        const categories = {
          technology: [/ai|machine learning|data|software|cloud|api|developer|tech/],
          finance: [/bank|finance|loan|credit|investment|money|crypto/],
          logistics: [/delivery|transport|shipment|courier|package|route/],
          health: [/health|medicine|doctor|hospital|vaccine|disease/],
          education: [/school|university|teacher|student|course|learning/]
        };
      
        for (const [label, patterns] of Object.entries(categories)) {
          if (patterns.some(r => r.test(lower))) return label;
        }
        return 'general';
      }
      
      function sentimentAnalysis(text) {
        const positiveWords = ['good','great','excellent','happy','love','wonderful','positive','amazing','fantastic','enjoy'];
        const negativeWords = ['bad','sad','terrible','hate','awful','negative','poor','angry','horrible','problem'];
      
        const words = text.toLowerCase().split(/\\s+/);
        let score = 0;
      
        for (const w of words) {
          if (positiveWords.includes(w)) score++;
          if (negativeWords.includes(w)) score--;
        }
      
        if (score >= 1) return 'positive';
        if (score <= -1) return 'negative';
        return 'neutral';
      }
      
      export { summarize, classifyText, sentimentAnalysis };

    