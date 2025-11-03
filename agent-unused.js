// agent.js
import { AgentServer} from "@mastra/core";
import { summarize, classifyText, sentimentAnalysis } from "./summarizer.js";

const agent = new AgentServer({
  name: "KnowledgeWorkflowAgent",
  description: "A zero-auth Knowledge Workflow Agent providing summarization, classification, and sentiment analysis.",
  version: "1.1.0",

  methods: {
    summarize_text: async ({ text, max_sentences }) => {
      return summarize(text, max_sentences || 3);
    },

    classify_text: async ({ text }) => {
      return classifyText(text);
    },

    sentiment_analysis: async ({ text }) => {
      return sentimentAnalysis(text);
    }
  }
});

const PORT = process.env.PORT || 3333;
agent.listen(PORT).then(() => {
  console.log(`✅ Mastra agent running at http://localhost:${PORT}/a2a`);
});
