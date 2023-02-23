/**
 * Utility function for checking where functions are being run locally via serverless offline
 * or if they're running on infrastructure. Helpful for detecting which connection string to use.
 *
 * @returns boolean are we running locally or on infra?
 */
export const isOffline = (): boolean => process.env.IS_OFFLINE === 'true';
