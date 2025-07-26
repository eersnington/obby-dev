/**
 * Generate a UUID v4 using native crypto.randomUUID()
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Generate multiple UUIDs at once
 */
export function generateUUIDs(count: number): string[] {
  return Array.from({ length: count }, () => generateUUID());
}

/**
 * Validate if a string is a valid UUID v4 format
 */
const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; // Explicit use of top level regex

export function isValidUUID(uuid: string): boolean {
  return uuidRegex.test(uuid);
}

/**
 * Generate a UUID with a custom prefix
 */
export function generatePrefixedUUID(prefix: string): string {
  return `${prefix}_${generateUUID()}`;
}

/**
 * experimental_generateMessageId in streamText takes in a function by reference
 * this is used to pass within streamText to gen a prefixed UUID
 */
export function generateMessageUUID(): string {
  return `message_${generateUUID()}`;
}

/**
 * Generate a UUID and remove hyphens for compact representation
 */
export function generateCompactUUID(): string {
  return generateUUID().replace(/-/g, '');
}

/**
 * Parse UUID into its component parts
 */
export function parseUUID(uuid: string) {
  if (!isValidUUID(uuid)) {
    throw new Error('Invalid UUID format');
  }

  const clean = uuid.replace(/-/g, '');
  return {
    timeLow: clean.slice(0, 8),
    timeMid: clean.slice(8, 12),
    timeHiAndVersion: clean.slice(12, 16),
    clockSeqHiAndReserved: clean.slice(16, 18),
    clockSeqLow: clean.slice(18, 20),
    node: clean.slice(20, 32),
    version: Number.parseInt(clean.charAt(12), 16),
    variant: Number.parseInt(clean.charAt(16), 16) >> 2,
  };
}

/**
 * Generate a timestamped UUID with current timestamp prefix
 * Useful for time-ordered identifiers
 */
export function generateTimestampedUUID(): string {
  const timestamp = Date.now().toString(36);
  const uuid = generateUUID().replace(/-/g, '').slice(0, 20);
  return `${timestamp}-${uuid}`;
}

/**
 * Utility to create a UUID namespace for consistent prefixing
 */
export function createUUIDNamespace(namespace: string) {
  return {
    generate: () => generatePrefixedUUID(namespace),
    generateMany: (count: number) =>
      generateUUIDs(count).map((id) => `${namespace}_${id}`),
    isFromNamespace: (uuid: string) => uuid.startsWith(`${namespace}_`),
    extractUUID: (namespacedUuid: string) => {
      const prefix = `${namespace}_`;
      if (!namespacedUuid.startsWith(prefix)) {
        throw new Error(`UUID does not belong to namespace: ${namespace}`);
      }
      return namespacedUuid.slice(prefix.length);
    },
  };
}
