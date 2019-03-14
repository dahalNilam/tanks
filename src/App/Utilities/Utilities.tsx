let uniqueId = 0;

export function getUniqueId(prefix = "id") {
  uniqueId++;
  return `${prefix}${uniqueId}`;
}
