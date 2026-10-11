/** Money stays in integer minor units (paisa) for calculations. */
export function calculateCommission(grossPaisa, commissionBasisPoints) {
    if (!Number.isSafeInteger(grossPaisa) || grossPaisa < 0)
        throw new Error("grossPaisa must be a non-negative safe integer.");
    if (!Number.isSafeInteger(commissionBasisPoints) || commissionBasisPoints < 0 || commissionBasisPoints > 10_000)
        throw new Error("commissionBasisPoints must be between 0 and 10000.");
    const commissionPaisa = Math.round((grossPaisa * commissionBasisPoints) / 10_000);
    return { grossPaisa, commissionPaisa, providerNetPaisa: grossPaisa - commissionPaisa };
}
export const FREIGHT_STATES = ["draft", "posted", "quotes_open", "awaiting_payment", "confirmed", "pickup_in_progress", "in_transit", "delivered_pending_confirmation", "completed_settlement_pending", "paid_out", "closed", "cancelled", "disputed", "failed"];
const allowedTransitions = {
    draft: ["posted", "cancelled"], posted: ["quotes_open", "cancelled"], quotes_open: ["awaiting_payment", "cancelled"], awaiting_payment: ["confirmed", "failed", "cancelled"], confirmed: ["pickup_in_progress", "cancelled", "disputed"], pickup_in_progress: ["in_transit", "disputed"], in_transit: ["delivered_pending_confirmation", "disputed", "failed"], delivered_pending_confirmation: ["completed_settlement_pending", "disputed"], completed_settlement_pending: ["paid_out", "disputed", "failed"], paid_out: ["closed"], closed: [], cancelled: [], disputed: ["completed_settlement_pending", "cancelled", "failed"], failed: ["awaiting_payment", "cancelled"]
};
export function canTransitionFreight(from, to) { return allowedTransitions[from]?.includes(to) ?? false; }
