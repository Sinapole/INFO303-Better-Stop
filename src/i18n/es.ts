import type { PartialMessages } from './types';

/**
 * Spanish is intentionally kept as a placeholder only.
 *
 * The visible ES language button is disabled in `i18n/index.ts`; if any code asks
 * for `es` directly, the i18n getters route unavailable languages back to English.
 */
export const es = {} satisfies PartialMessages;
