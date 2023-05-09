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
    temperature: 0.8,
  });
  console.group(
    `Open AI query ${textResponse.status} ${textResponse.statusText}`
  );
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
   * NOTE :
   * 1. this is heavily reliant on the prompt you give to GPT-3, it will try to complete the code you give it.
   * 2. Don't mix up languages
   * 3. Don't use a prompt that is too long, it will break the code completion.
   * 4. Use one liners in comments, multi line comments will break the code completion.
   * 5. Use a code snippet in your prompt, it will help GPT-3 to understand what you are asking for.
   * 6. Use a temperature of 0, it will give you the best results.
   * 7. Use a max_tokens of 2000, it will give you the best results.
   * 8. Use a model of "code-davinci-002" or "text-davinci-003" it will give you the best results (16/1/2022).
   * 9. Use a stop sequence of "/* Command:" to give an opinionated answer on the code complexion (useful to target a particular language / environment).
   * Please also consider using a code snippet in your prompt. see example below.
   * In the end, testing proves you're better off asking a question to GPT-3 that set contrains specific to your use case and your question right away.
   * So for example, "Create a javascript program written for chrome that clears the page first ..... (your question here)" will create then openai javascript sandbox (https://beta.openai.com/codex-javascript-sandbox).
   * Then you can ask it to do whatever you want. It super opinionated to give you the best results. It's like pocket sand + AI but it's not "raw" AI yet.
   * It's not magic *yet* but it's getting there.
   * Honestly, I'm not sure if it's worth it to use this API for code generation. It's not that good yet. Just build super oriented prompts with text-davinci-003 and you'll be fine.
   * Caveats: this codex is actively used to produce malware, so while it's not easy to get a hold of, it's not impossible. It seems super strong once you're good at it 
   * Source : https://arstechnica.com/information-technology/2023/01/chatgpt-is-enabling-script-kiddies-to-write-functional-malware/
   */
  // const codeReponse = await sdk.createCode({
  //   max_tokens: 2000,
  //   temperature: 0, // NOTE : 0 is the best temperature for code completion. Period.
  //   prompt: ``,
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
