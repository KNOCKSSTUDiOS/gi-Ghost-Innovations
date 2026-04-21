export function search(list = [], query = "", fields = []) {
  if (!query) return list;

  const q = query.toLowerCase();

  return list.filter(item => {
    return fields.some(field => {
      const value = String(item[field] ?? "").toLowerCase();
      return value.includes(q);
    });
  });
}

