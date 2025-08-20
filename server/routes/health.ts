import { Router } from "express";
import { checkDatabaseHealth } from "../config/database";

const router = Router();

router.get("/healthz", async (req, res) => {
  const dbHealthy = await checkDatabaseHealth();
  
  if (dbHealthy) {
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: "healthy",
        api: "healthy"
      }
    });
  } else {
    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      services: {
        database: "unhealthy",
        api: "healthy"
      }
    });
  }
});

router.get("/readyz", async (req, res) => {
  // More comprehensive readiness check
  const dbHealthy = await checkDatabaseHealth();
  
  const ready = dbHealthy;
  
  if (ready) {
    res.status(200).json({
      status: "ready",
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(503).json({
      status: "not ready",
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
