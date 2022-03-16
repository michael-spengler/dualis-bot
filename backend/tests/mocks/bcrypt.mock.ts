export function compare(val: string, hash: string) {
  if (val == hash) {
    return true;
  }

  throw new Error("passwords do not match");
}

export function hash(val: string) {
    return "hashed";
}