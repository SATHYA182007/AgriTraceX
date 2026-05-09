# 🌾🤖 AGRITRACE X — FULL RAG AI CHATBOT SYSTEM PROMPT

Build a FULLY WORKING AI CHATBOT SYSTEM for AgriTrace X using a SIMPLE and EASY RAG (Retrieval-Augmented Generation) architecture.

⚠ IMPORTANT:
- The chatbot MUST work inside the AgriTrace X website.
- The chatbot should answer:
  1. Questions about the AgriTrace X platform
  2. Questions about farming and agriculture
  3. Questions about crop health
  4. Questions about soil conditions
  5. Questions about NDVI/GIS analytics
  6. Questions about insurance workflows
  7. Questions about government subsidy workflows
  8. Questions about realtime alerts
  9. Questions about zone intelligence
  10. Questions based on uploaded documents/data

The chatbot MUST:
- Be EASY to build
- Be FAST
- Be production-ready
- Use SIMPLE RAG architecture
- Work with Supabase
- Work inside Next.js
- Support realtime chat
- Have streaming AI responses
- Look premium with AquaSmart-inspired UI

==================================================
🎯 GOAL
==================================================

The chatbot should feel like:

“A realtime AI agricultural intelligence assistant.”

It should:
- Understand AgriTrace X platform workflows
- Answer farming questions
- Explain sensor data
- Explain GIS insights
- Explain alerts
- Explain certifications
- Explain insurance claims
- Explain subsidies
- Give farming recommendations

==================================================
🧠 CHATBOT CAPABILITIES
==================================================

The chatbot should answer:

--------------------------------------------------
🌾 FARMING QUESTIONS
--------------------------------------------------

Examples:
- Why is my soil dry?
- When should I irrigate?
- What does low NDVI mean?
- How to improve soil moisture?
- Best crops for humid climate?
- What causes crop stress?
- How to reduce flood damage?

--------------------------------------------------
🛰 GIS + NDVI QUESTIONS
--------------------------------------------------

Examples:
- What is NDVI?
- Why is Zone C marked red?
- Explain flood risk score
- Why is this zone critical?
- Explain satellite monitoring

--------------------------------------------------
🏛 GOVERNMENT QUESTIONS
--------------------------------------------------

Examples:
- How does subsidy verification work?
- How is crop loss calculated?
- How does land verification happen?

--------------------------------------------------
💰 INSURANCE QUESTIONS
--------------------------------------------------

Examples:
- How are claims verified?
- What evidence is needed?
- How is payout calculated?

--------------------------------------------------
📜 CERTIFICATION QUESTIONS
--------------------------------------------------

Examples:
- What is land certification?
- How does analyst verification work?
- How is certification used for loans?

==================================================
🏗 SYSTEM ARCHITECTURE
==================================================

Build this SIMPLE RAG ARCHITECTURE:

USER QUESTION
      ↓
CHAT UI
      ↓
API ROUTE
      ↓
EMBEDDING SEARCH
      ↓
VECTOR DATABASE
      ↓
RELEVANT CONTEXT RETRIEVAL
      ↓
LLM RESPONSE GENERATION
      ↓
STREAM RESPONSE TO UI

==================================================
🛠 TECH STACK
==================================================

Frontend:
- Next.js App Router
- React
- Tailwind CSS
- Framer Motion

Backend:
- Next.js API routes
OR
- Edge Functions

AI:
- OpenAI API
OR
- Gemini API

RAG:
- LangChain

Embeddings:
- OpenAI Embeddings
OR
- Gemini Embeddings

Vector Database:
- Supabase pgvector

Streaming:
- Vercel AI SDK
OR
- OpenAI streaming

==================================================
📦 DATABASE SETUP
==================================================

Create a VECTOR TABLE in Supabase.

Table:
documents

Columns:
- id
- content
- embedding
- category
- created_at

Enable:
- pgvector extension

==================================================
📄 KNOWLEDGE BASE
==================================================

The chatbot should learn from:

--------------------------------------------------
1. AGRITRACE X SYSTEM DATA
--------------------------------------------------

Include:
- Platform workflows
- GIS intelligence
- NDVI explanations
- Zone intelligence
- Insurance workflows
- Verification systems
- Certification workflows
- Government actions
- Sensor logic

--------------------------------------------------
2. FARMING KNOWLEDGE
--------------------------------------------------

Include:
- Soil moisture basics
- Crop stress
- Irrigation
- Farming practices
- Temperature impact
- Humidity impact
- Fertilizers
- Crop health

--------------------------------------------------
3. CUSTOM DOCUMENTS
--------------------------------------------------

Allow admin to upload:
- PDFs
- TXT files
- DOC files

The chatbot should:
- Read them
- Chunk them
- Embed them
- Store embeddings in Supabase

==================================================
📚 DOCUMENT INGESTION SYSTEM
==================================================

Build a SIMPLE document ingestion pipeline.

FLOW:
Upload Document
      ↓
Extract Text
      ↓
Chunk Text
      ↓
Generate Embeddings
      ↓
Store in Supabase pgvector

Use:
- LangChain text splitter
- PDF parser
- Embedding API

==================================================
🔍 RAG SEARCH FLOW
==================================================

When user asks question:

1. Convert question → embedding
2. Search similar vectors
3. Retrieve top matching chunks
4. Send chunks + user question to LLM
5. Generate grounded response
6. Stream response back

==================================================
🧠 SYSTEM PROMPT
==================================================

Use this AI system prompt:

“You are AgriTrace AI, an intelligent agricultural assistant for the AgriTrace X platform.

You help farmers, analysts, insurance managers, field officers, government authorities, and administrators understand agricultural intelligence, crop monitoring, GIS analytics, NDVI monitoring, sensor values, certifications, claims, and subsidies.

Always provide:
- Clear explanations
- Simple farming guidance
- Accurate platform workflow explanations
- Professional agricultural insights

If the question relates to:
- farming → provide agricultural guidance
- NDVI/GIS → explain spatial intelligence
- insurance → explain claims workflows
- government → explain verification/subsidy workflows
- certification → explain land certification logic

Keep answers concise, intelligent, and user-friendly.”

==================================================
💬 CHATBOT UI DESIGN
==================================================

The chatbot MUST look premium.

Style:
- AquaSmart-inspired
- Floating AI assistant
- White glassmorphism panel
- Green gradient header
- Rounded 24px
- Smooth animations

Features:
- Streaming responses
- Typing indicator
- Suggested prompts
- Markdown rendering
- Realtime animations
- Auto-scroll
- Chat history

==================================================
💡 SUGGESTED PROMPTS
==================================================

Show:
- Explain NDVI
- Why is my soil dry?
- Show irrigation advice
- How do insurance claims work?
- Explain crop stress
- Explain flood risk
- Explain certification process

==================================================
🎙 OPTIONAL FEATURES
==================================================

If possible add:
- Voice input
- Voice output
- Local language support
- Speech-to-text

==================================================
⚡ PERFORMANCE REQUIREMENTS
==================================================

The chatbot should:
- Respond fast
- Stream responses realtime
- Support multiple users
- Cache embeddings
- Use optimized vector search

==================================================
🔐 SECURITY
==================================================

Implement:
- Role-based access
- API protection
- Rate limiting
- Secure environment variables

==================================================
📁 REQUIRED FILE STRUCTURE
==================================================

Create:

/app/api/chat/route.ts
/app/api/upload/route.ts
/lib/rag.ts
/lib/vector.ts
/lib/embeddings.ts
/components/chatbot/
/components/chatbot/ChatWindow.tsx
/components/chatbot/MessageBubble.tsx
/components/chatbot/TypingIndicator.tsx

==================================================
🧩 REQUIRED FEATURES
==================================================

The chatbot MUST:
- Actually work
- Use REAL RAG retrieval
- Use vector search
- Use Supabase pgvector
- Support uploaded documents
- Stream AI responses
- Answer platform-specific questions
- Answer farming questions

==================================================
🎨 DESIGN REQUIREMENTS
==================================================

Maintain:
- White + light green AquaSmart theme
- Premium SaaS UI
- Framer Motion animations
- Soft shadows
- Rounded UI
- Enterprise-grade appearance

Typography:
- Manrope
- Inter
- JetBrains Mono

==================================================
🏆 FINAL RESULT
==================================================

The final chatbot should feel like:

“A realtime AI-powered agricultural intelligence assistant built specifically for AgriTrace X.”

It must:
- Actually function
- Use RAG properly
- Answer intelligently
- Look premium
- Work inside the website
- Support realtime streaming
- Support uploaded agricultural knowledge
- Be easy to maintain and scale