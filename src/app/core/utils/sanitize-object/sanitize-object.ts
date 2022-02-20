export function sanitizeObject(object): any {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === 'object') {
      sanitizeObject(v);
    }
    if ((v && typeof v === 'object' && !Object.keys(v).length) || v === null || v === undefined) {
      if (Array.isArray(object)) {
        object.splice(Number(k), 1);
      } else {
        delete object[k];
      }
    }
  });
  return object;
}
