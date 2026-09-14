let _getTokenFn = null;

export function setGetToken(fn) {
  _getTokenFn = fn;
}

export async function getToken() {
  if (!_getTokenFn) return null;
  return _getTokenFn();
}
