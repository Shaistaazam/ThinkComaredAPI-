export const environment = {
  production: false,
  apiUrl: 'https://api.thinkcompared.com',
  // Backup API URLs in case main server is down
  backupApiUrls: [
    'https://backup-api.thinkcompared.com',
    'https://api-v2.thinkcompared.com'
  ],
  // Local development API (if you have one)
  localApiUrl: 'http://localhost:3000/api',
  // Enable fallback to local data when all APIs fail
  enableLocalFallback: true
};