import { REPORT_FORMAT_OPTIONS } from '../constants';

export const DEFAULT_PERSIST_FORMAT = ['html'];
export const PROMPT_PERSIST_FORMAT = 'What is the format of user-flow reports? (use ⬇/⬆ to navigate, and SPACE key to select)';
export const ERROR_PERSIST_FORMAT_REQUIRED = 'format is required. Either through the console as `--format` or in the `.user-flow.json`';
export const ERROR_PERSIST_FORMAT_WRONG = `Wrong format. Format has to be one of: ${REPORT_FORMAT_OPTIONS.map(f => f.value).join(', ')}`;

