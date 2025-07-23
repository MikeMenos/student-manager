/* eslint-disable @typescript-eslint/no-explicit-any */
export function updateFormField<T>(form: T, path: string, value: any): T {
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  const updated = { ...form };
  let current: any = updated;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = Array.isArray(current[key])
      ? [...current[key]]
      : { ...current[key] };
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;

  return updated;
}

export function capitalizeFirstLetter(str: string) {
  return str
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
