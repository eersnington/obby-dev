/**
 * Array utilities for generating unique keys without external dependencies
 * Optimized for performance and browser compatibility
 */

/**
 * Generates a unique key for array items using index + random characters
 * Fast, lightweight, and works in all browsers and devices
 *
 * @param index - The array index
 * @param length - Number of random characters to append (default: 3)
 * @returns Unique key like "0_a4f", "1_b2g", "2_c8x"
 *
 * @example
 * // Basic usage
 * const key = generateArrayKey(0); // "0_a4f"
 *
 * @example
 * // In React components
 * {items.map((item, index) => (
 *   <div key={generateArrayKey(index)}>{item}</div>
 * ))}
 *
 * @example
 * // Custom length
 * const longKey = generateArrayKey(5, 5); // "5_a4f2x"
 */
export function generateArrayKey(index: number, length = 3): string {
  let randomSuffix = '';
  for (let i = 0; i < length; i++) {
    // Generate random number and convert to base36 (0-9, a-z)
    randomSuffix += Math.floor(Math.random() * 36).toString(36);
  }
  return `${index}_${randomSuffix}`;
}

/**
 * Generates an array of unique keys for a given array length
 * Useful for pre-generating keys or batch operations
 *
 * @param arrayLength - Length of the array to generate keys for
 * @param keyLength - Number of random characters per key (default: 3)
 * @returns Array of unique keys
 *
 * @example
 * const keys = generateArrayKeys(3); // ["0_a4f", "1_b2g", "2_c8x"]
 */
export function generateArrayKeys(
  arrayLength: number,
  keyLength = 3,
): string[] {
  const keys: string[] = [];
  for (let i = 0; i < arrayLength; i++) {
    keys.push(generateArrayKey(i, keyLength));
  }
  return keys;
}

/**
 * Maps an array to include unique keys for each item
 * Adds a 'key' property to each array item
 *
 * @param array - Array to add keys to
 * @param keyLength - Number of random characters per key (default: 3)
 * @returns Array with key property added to each item
 *
 * @example
 * const items = [{name: 'John'}, {name: 'Jane'}];
 * const withKeys = mapArrayWithKeys(items);
 * // [{name: 'John', key: '0_a4f'}, {name: 'Jane', key: '1_b2g'}]
 */
export function mapArrayWithKeys<T>(
  array: T[],
  keyLength = 3,
): Array<T & { key: string }> {
  return array.map((item, index) => ({
    ...item,
    key: generateArrayKey(index, keyLength),
  }));
}

/**
 * Creates a key generator function with consistent settings
 * Useful for maintaining state in components or modules
 *
 * @param keyLength - Number of random characters per key (default: 3)
 * @returns Function that generates keys based on index
 *
 * @example
 * const genKey = createKeyGenerator();
 * const key1 = genKey(0); // "0_a4f"
 * const key2 = genKey(1); // "1_b2g"
 */
export function createKeyGenerator(keyLength = 3): (index: number) => string {
  return (index: number) => generateArrayKey(index, keyLength);
}
