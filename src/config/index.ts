import dev from "./development";
import staging from "./staging";
import production from "./production";
let env = process.env.NODE_ENV;

debugger;
let config = dev;
if (env === "test") {
  config = staging;
} else if (env === "production") {
  config = production;
}

export default config;
