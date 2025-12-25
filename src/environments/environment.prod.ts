export const environment = {
  production: true,
  apiUrl: 'https://api.thinkcompared.com',
  // Backup API URLs in case main server is down
  backupApiUrls: [
    'https://backup-api.thinkcompared.com',
    'https://api-v2.thinkcompared.com'
  ],
  // Local development API (disabled in production)
  localApiUrl: '',
  // Enable fallback to local data when all APIs fail
  enableLocalFallback: true
};