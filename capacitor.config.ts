
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7d732c83f050448fa2aaa5fa0c55aa5a',
  appName: 'kid-tb-score-guide',
  webDir: 'dist',
  server: {
    url: 'https://7d732c83-f050-448f-a2aa-a5fa0c55aa5a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3B82F6',
      showSpinner: false
    }
  }
};

export default config;
