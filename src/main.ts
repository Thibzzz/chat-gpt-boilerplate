import OpenAI from "./data-access/open-ai/client.js";




const main = async () => {
  const sdk = new OpenAI();
  
  // INFO : Query somethinhg to GPT-3
  // const response = await sdk.askSomething({
  //   model: "text-davinci-003",
  //   temperature: 0.5
  // })
  // console.group(`Open AI query ${response.status} ${response.statusText}`);
  // console.table(response.data.usage);
  // process.stdout.write(`IA answer status (stop is good) : ${response.data.choices[0].finish_reason} \n` || "undefined")
  // process.stdout.write(`${response.data.choices[0].text}\n`);
  // console.groupEnd();

  // INFO : Query an image to GPT-3
  const image :any = await sdk.createImage({size : "medium"})
  console.group(`Open AI Image generation ${image.status} ${image.statusText}`);
  await sdk.saveImageToPath("image-gpt3", "./output", image.data.data[0].b64_json)
};
await main();
export {};
