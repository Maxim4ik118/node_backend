import { join } from "path";
import moduleAlias from "module-alias";

const alias = (path?: string) => join(process.cwd(), `./dist${path}`);

moduleAlias.addAliases({
  "@": alias(""),
});

moduleAlias();
