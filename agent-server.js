// server.js
const express = require('express');
const cors = require('cors');
const { summarize, classifyText, sentimentAnalysis } = require('./summarizer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// helper for JSON-RPC error formatting
function makeJsonRpcError(id, code, message, data) {
  const err = { jsonrpc: '2.0', error: { code, message } };
  if (data !== undefined) err.error.data = data;
  if (id !== undefined) err.id = id; else err.id = null;
  return err;
}

// main A2A endpoint
app.post('/a2a', (req, res) => {
  const body = req.body;

  // validate structure
  if (!body || body.jsonrpc !== '2.0' || !('method' in body)) {
    return res.status(400).json(makeJsonRpcError(null, -32600, 'Invalid Request'));
  }

  const id = ('id' in body) ? body.id : null;
  const method = body.method;
  const params = body.params || {};

  res.setHeader('X-Mastra-Protocol', 'A2A/1.0');


  try {
    if (method === 'summarize_text') {
      const text = params.text || '';
      const maxSentences = params.max_sentences || 3;
      const result = summarize(text, maxSentences);
      return res.json({ jsonrpc: '2.0', result, id });
    }

    if (method === 'classify_text') {
      const text = params.text || '';
      const result = classifyText(text);
      return res.json({ jsonrpc: '2.0', result, id });
    }

    if (method === 'sentiment_analysis') {
      const text = params.text || '';
      const result = sentimentAnalysis(text);
      return res.json({ jsonrpc: '2.0', result, id });
    }

    // unknown method
    return res.status(404).json(makeJsonRpcError(id, -32601, 'Method not found'));

  } catch (e) {
    // generic error handling
    return res.status(500).json(makeJsonRpcError(id, -32000, 'Server error', e.message));
  }
});

// start server
const PORT = process.env.PORT || 3333;

app.get('/a2a', (req, res) => {
  res.send(`
    <html>
      <head><title>Nova Agent A2A Endpoint</title></head>
      <body style="font-family:Arial; text-align:center; margin-top:100px;">
        <h1>✅ Nova Agent is Live</h1>
        <p>Welcome to the Nova A2A endpoint.</p>
        <p>Use <code>POST /a2a</code> for JSON-RPC requests.</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ A2A Knowledge Agent running at http://localhost:${PORT}/a2a`);
  console.log('Available methods: summarize_text, classify_text, sentiment_analysis');
});
