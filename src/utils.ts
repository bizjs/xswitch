import { stripJsonComments } from "./strip-json-comments";
import { REG, EMPTY_STRING } from "./constants";

export function JSONC2JSON(jsonc: string): string {
  return stripJsonComments(jsonc)
    .replace(REG.WHITESPACE, EMPTY_STRING)
    .replace(REG.TRIM_JSON, ($0, $1, $2) => $2);
}

export function JSON_Parse(
  json: string,
  cb: (error: object | boolean, json?: object) => void
): void {
  try {
    cb(false, JSON.parse(json));
  } catch (e) {
    cb(e);
  }
}

/**
 * 安全的 Parse JSON 不报错
 * @param jsonStr
 * @returns
 */
export function safeJSONParse<T = any>(
  jsonStr: string
): { success: true; value: T } | { success: false; error: any } {
  try {
    const value = JSON.parse(jsonStr);
    return { success: true, value };
  } catch (e) {
    return { success: false, error: e };
  }
}
