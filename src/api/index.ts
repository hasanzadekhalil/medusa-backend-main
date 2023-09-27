import { Router } from "express"
import { setRates } from "./routes/currency"
import { getShippingRates } from "./routes/shipping"
import { saveProductJson } from "./routes/product"

export default (rootDirectory: string): Router | Router[] => {
  // add your custom routes here
  return [setRates("", ""), getShippingRates("", ""), saveProductJson("", "")]
}
