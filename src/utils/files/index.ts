import { promisify } from "util"
import { writeFile } from "fs";
import path from "path";

const writeFileAsync = promisify(writeFile);

const writeFileToPath = async (filename:string, filePath: string, data: any) => {
  await writeFileAsync(path.resolve(filePath, filename), data, "base64"); 
}

export { writeFileToPath }