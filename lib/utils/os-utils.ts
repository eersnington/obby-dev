export const getOSFromUA = (userAgent: string | null): string | null => {
  if (!userAgent) return null;

  const ua = userAgent.toLowerCase();

  if (ua.includes('win')) return 'Windows';
  if (ua.includes('mac')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('like mac') || ua.includes('ios')) return 'ios';

  return null;
};
