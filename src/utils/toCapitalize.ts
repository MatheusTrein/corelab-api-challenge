export function toCapitalize(string: string): string {
  const splitedString = string.split(" ");

  const stringsCapitalized = splitedString.map((string) => {
    return string[0].toUpperCase() + string.substring(1);
  });

  const stringCapitalized = stringsCapitalized.join(" ");

  return stringCapitalized;
}
