import OpenAI from "./data-access/open-ai/client.js";
import { promisify } from "util"
import { writeFile } from "fs";
import path from "path";

const writeFileAsync = promisify(writeFile);
const writeFileToPath = async (filename:string, filePath: string, data: any) => {
  await writeFileAsync(path.resolve(filePath, `${filename}.jpg`), data, "base64"); 
}

const main = async () => {
  const sdk = new OpenAI();
  
  // INFO : Query somethinhg to GPT-3
  const response = await sdk.askSomething({
    model: "text-davinci-003",
    temperature: 0.5
  })
  console.group(`Open AI query ${response.status} ${response.statusText}`);
  console.table(response.data.usage);
  process.stdout.write(`IA answer status (stop is good) : ${response.data.choices[0].finish_reason} \n` || "undefined")
  process.stdout.write(`${response.data.choices[0].text}\n`);
  console.groupEnd();

  // INFO : Query an image to GPT-3
  // const image :any = await sdk.createImage({size : "medium"})
  // console.group(`Open AI Image generation ${image.status} ${image.statusText}`);
  // const fileName = `image-gpt3-${Date.now()}.png`
  // const fullPath = `./output/${fileName}`
  // await writeFileToPath(fileName, "./output", image.data.data[0].b64_json)
  // process.stdout.write(`Image saved to : ${fullPath} \n`)
};
await main();
export {};
