import { Router } from "express";
import { checkSummary, checkSummarybyID, healthCheck } from "../controller/healthCheck.controller.js";

const router = Router();

router.post('/:id/new-health-check', healthCheck);

router.get('/health-checks/sum', checkSummary );

router.get('/:id/health-checks/sum', checkSummarybyID );

export default router;