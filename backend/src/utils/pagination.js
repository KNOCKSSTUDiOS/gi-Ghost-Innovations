export function getPage(query = {}) {
  const p = parseInt(query.page, 10);
  return isNaN(p) || p < 1 ? 1 : p;
}

export function getLimit(query = {}, defaultLimit = 20) {
  const l = parseInt(query.limit, 10);
  return isNaN(l) || l < 1 ? defaultLimit : l;
}

export function getOffset(page = 1, limit = 20) {
  return (page - 1) * limit;
}

