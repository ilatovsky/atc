import { Atc } from "./Atc";
import { formatResult } from "./utils/formatResult";
import { parseProcessArgs } from "./utils/parseArgs";

const result = Atc.change(...parseProcessArgs());

console.log(formatResult(result));
