/**
 * Returns a single string for the user's name
 * @param firstName The users first name
 * @param lastName The users last name
 * @returns The users fill name
 */
export function getUserFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

/**
 * Returns a two letter string, the users initials
 * @param firstName The users first name
 * @param lastName The users last name
 * @returns The users initials
 */
export function getUserAvatarFallback(
  firstName: string,
  lastName: string
): string {
  return `${firstName[0]}${lastName[0]}`;
}
