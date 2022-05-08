import { extname, join, dirname } from 'path';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { logVerbose } from './loggin';
import { getParserFromExtname, formatCode } from './prettier';
import { throwError } from 'rxjs';

/**
 * Ensures the file exists before reading it
 */
export function readFile(path: string, fail: boolean = false): string {
  const errorStr = `${path} does not exist.`;
  if (existsSync(path)) {
    return readFileSync(path, 'utf-8');
  } else {
    if (fail) {
      throw new Error(errorStr);
    }
    logVerbose(errorStr);
  }

  return '';
}

/**
 * Ensures the folder exists before writing it
 */
export function writeFile(filePath: string, data: string) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    logVerbose(`Created dir ${dir} to save ${filePath}`);
    mkdirSync(dir);
  }

  const ext = filePath.split('.').pop() || '';
  const formattedData = formatCode(data, getParserFromExtname(ext));
  // @TODO implement a check that saves the file only if the content is different => git noise
  return writeFileSync(filePath, formattedData);
}


export function resolveAnyFile<T>(path: string): { exports: T, path: string } {
  // start path from cwd
  path = join(process.cwd(), path);
  let file;

  // 🔥 Live compilation of TypeScript files
  if (path.endsWith('.ts')) {
    // Register TS compiler lazily
    // tsNode needs the compilerOptions.module resolution to be 'commonjs',
    // so that imports in the `*.uf.ts` files work.
    require('ts-node').register({
      'compilerOptions': {
        'module': 'commonjs'
      }
    });
  }
  file = require(path);

  // If the user provides a configuration in TS file
  // then there are 2 cases for exporing an object. The first one is:
  // `module.exports = { ... }`. And the second one is:
  // `export default { ... }`. The ESM format is compiled into:
  // `{ default: { ... } }`
  const exports = file.default || file;
  return { exports, path };
}


/**
 * Upper or camelCase to lowercase hyphenated
 */
export function toFileName(s: string): string {
  return s
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase()
    .replace(/[ _]/g, '-')
    .replace(/[/\\]/g, '-');
}


