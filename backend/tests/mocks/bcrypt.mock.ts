export function compare(val: string, hash: string) {
  if (val == hash) {
    return true;
  }

  return false;
}

export function hash(_val: string) {
  return "hashed";
}
