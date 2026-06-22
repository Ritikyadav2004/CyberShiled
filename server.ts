import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Readable } from "stream";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Needed for large image uploads (base64)
  app.use(express.json({ limit: '50mb' }));

  // ========== API ROUTES ==========
  
  // 1. Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // 2. Chatbot Mock
  app.post("/api/chat", async (req, res) => {
    try {
      setTimeout(() => {
        res.json({ text: "**System Notice:** Live AI integration is currently offline. This is a mocked response to demonstrate the chat interface capability." });
      }, 1000);
    } catch (error: any) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 3. Veo Video Generation API Mock
  app.post("/api/generate-video", async (req, res) => {
    try {
      setTimeout(() => {
        res.json({ operationName: "mock-video-operation" });
      }, 1500);
    } catch (error: any) {
      console.error("Video Generation Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/video-status", async (req, res) => {
    try {
      // Instantly mark as done for demonstration or simulate a failure to show the lack of API
      setTimeout(() => {
        res.json({ done: true, hasError: true, errorDetails: "Live video generation is currently offline." });
      }, 1000);
    } catch (error: any) {
      console.error("Video Status Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/video-download", async (req, res) => {
    try {
      res.status(404).json({ error: "Video generation unavailable in offline mode." });
    } catch (error: any) {
      console.error("Video Download Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // ========== VITE / STATIC ROUTING ==========
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
