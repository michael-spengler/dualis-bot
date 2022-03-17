export function compare(val: string, hash: string) {
  if (val == hash) {
    return true;
  }

  return false;
}

export function hash(val: string) {
    return "hashed";
}