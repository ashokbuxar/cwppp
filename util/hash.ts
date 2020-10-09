// import {hash, compare} from "../deps.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
export default {
  async encrypt(stringToHash: string) {
    const hash = await bcrypt.hash(stringToHash);
    return hash;
  },
  async verify(test: string, hash: string) {
    const result = await bcrypt.compare(test, hash);
    console.log(`result: ${result}`);
    return result;
  },
};
