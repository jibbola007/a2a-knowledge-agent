# A2A Knowledge Workflow Agent (v1.1)


Now supports three JSON-RPC methods:
1. `summarize_text` → extractive summary of text.
2. `classify_text` → rule-based topic classification.
3. `sentiment_analysis` → basic positive/negative/neutral detection.


## Quick start
1. `npm install`
2. `npm start`
3. Test with curl or Postman.


### Examples
#### Summarize
```bash
curl -X POST http://localhost:3333/a2a -H 'Content-Type: application/json' -d '{
"jsonrpc": "2.0", "method": "summarize_text", "params": {"text": "AI and workflow automation are changing industries."}, "id": 1
}'
```
#### Classify
```bash
curl -X POST http://localhost:3333/a2a -H 'Content-Type: application/json' -d '{
"jsonrpc": "2.0", "method": "classify_text", "params": {"text": "Banks are adopting AI for fraud detection."}, "id": 2
}'
```
#### Sentiment
```bash
curl -X POST http://localhost:3333/a2a -H 'Content-Type: application/json' -d '{
"jsonrpc": "2.0", "method": "sentiment_analysis", "params": {"text": "I love using AI for workflow automation!"}, "id": 3
}'
```
/* End of document */