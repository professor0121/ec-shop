import express from 'express';
import mediaRoutes from './api/media.routes.js';
import cors from 'cors';
const app = express();

app.use(cors());
app.use("/api/v1/media", mediaRoutes);
app.get("/health", (_, res) => res.json({ service: "media", status: "ok" }));

export default app;