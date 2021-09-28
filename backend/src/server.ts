import "dotenv-safe";
import "reflect-metadata";
import * as _ from "lodash";

import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`🔥 Server started at http://localhost:${port}`));
