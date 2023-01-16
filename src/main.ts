import OpenAI from "./data-access/open-ai/client.js";

/**
 * NOTE : Ask your question to GPT-3 from here.
 */
const main = async () => {
  const sdk = new OpenAI();

  /**
   * Example : Query somethinhg to GPT-3
   * INFO : https://beta.openai.com/docs/guides/completion/introduction
   */
  const textResponse = await sdk.askSomething({
    model: "text-davinci-003",
    temperature: 0.5,
  });
  console.group(`Open AI query ${textResponse.status} ${textResponse.statusText}`);
  console.table(textResponse.data.usage);
  process.stdout.write(
    `IA answer status (stop is good) : ${textResponse.data.choices[0].finish_reason} \n` ||
      "undefined"
  );
  process.stdout.write(`${textResponse.data.choices[0].text}\n`);
  console.groupEnd();

  /**
   * Exemple : Generate a code complete from GPT-3
   * INFO : https://beta.openai.com/docs/guides/code/best-practices
   * NOTE : this is heavily reliant on the prompt you give to GPT-3, it will try to complete the code you give it.
   * However it will not work if the prompt is not formatted correctly or if you mix up languages.
   * I highly recommand that you use comments anytime you want to give a prompt to GPT-3.
   * Please also consider using a code snippet in your prompt. see example below.
   */
  // const codeReponse = await sdk.createCode({
  //   max_tokens: 1000,
  //   temperature: 0, // NOTE : 0 is the best temperature for code completion. Period.
  //   prompt: `
  //   // Write me a unit test for this function
  //   import { promisify } from "util"
  //   import { writeFile } from "fs";
  //   import path from "path";

  //   const writeFileAsync = promisify(writeFile);

  //   const writeFileToPath = async (filename:string, filePath: string, data: any) => {
  //     await writeFileAsync(path.resolve(filePath, filename), data, "base64"); 
  //   }
  //   `
  // });
  // console.group(`Open AI query ${codeReponse.status} ${codeReponse.statusText}`);
  // console.table(codeReponse.data.usage);
  // process.stdout.write(
  //   `IA answer status (stop is good) : ${codeReponse.data.choices[0].finish_reason} \n` ||
  //     "undefined"
  // );
  // process.stdout.write(`${codeReponse.data.choices[0].text}\n`);
  // console.groupEnd();

  /**
   * Example : Query an image to GPT-3
   * INFO : https://beta.openai.com/docs/guides/images/introduction
   */
  // const image :any = await sdk.createImage({size : "medium"})
  // console.group(`Open AI Image generation ${image.status} ${image.statusText}`);
  // await sdk.saveImageToPath("image-gpt3", "./output", image.data.data[0].b64_json)
};
await main();
export {};
