type ClassName = string | undefined;

export function cn(...classNames: ClassName[]) {
  return classNames.filter(Boolean).join(" ");
}
