export function blurEmail(email: string): string {
  const [localPart, domain] = email.split('@');

  if (!(localPart && domain)) {
    return email;
  }

  const blurredLocal =
    localPart.length > 2
      ? localPart[0] + '*'.repeat(Math.min(localPart.length - 1, 3))
      : `${localPart[0]}*`;

  const domainParts = domain.split('.');
  const blurredDomain =
    domainParts.length > 1
      ? `${
          domainParts[0][0] + '*'.repeat(Math.min(domainParts[0].length - 1, 3))
        }.${domainParts.slice(1).join('.')}`
      : domain[0] + '*'.repeat(Math.min(domain.length - 1, 3));

  return `${blurredLocal}@${blurredDomain}`;
}
