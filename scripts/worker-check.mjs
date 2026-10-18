// Runs ruff, mypy and pytest for the Python worker, using apps/worker/.venv when present.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const workerDir = join(process.cwd(), "apps", "worker");
const venvPython =
  process.platform === "win32"
    ? join(workerDir, ".venv", "Scripts", "python.exe")
    : join(workerDir, ".venv", "bin", "python");
const python = existsSync(venvPython) ? venvPython : process.platform === "win32" ? "python" : "python3";

const pytest = ["-m", "pytest", "-q"];
// "test" runs only pytest; no argument also runs ruff and mypy.
const steps =
  process.argv[2] === "test"
    ? [pytest]
    : [["-m", "ruff", "check", "."], ["-m", "mypy", "nasdaq_worker", "tests"], pytest];

for (const args of steps) {
  console.log(`> python ${args.join(" ")}`);
  const result = spawnSync(python, args, { cwd: workerDir, stdio: "inherit" });
  if (result.status !== 0) {
    console.error("Worker check failed. Did you run the worker setup from README.md?");
    process.exit(result.status ?? 1);
  }
}
