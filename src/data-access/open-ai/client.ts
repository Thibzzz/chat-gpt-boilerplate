import { Configuration, CreateImageRequest, OpenAIApi } from "openai";
import dotenv from "dotenv";
import inquirer from "inquirer";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

interface createCompletionRequest {
  prompt?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

interface directImageRequest  {
  prompt?: string;
  n?: number;
  size?: string;
  response_format?: string;
}

/**
 * @class OpenAI
 * @description This class is a wrapper around the OpenAI SDK | https://www.npmjs.com/package/openai
 * @method askSomething - This method is used to ask GPT-3 a question
 * @method createImage - This method is used to create an image from a prompt
 */
class OpenAI {
  private openai: OpenAIApi;
  private imageSizes: any;
  private prompt : string | undefined;
  constructor() {
    this.openai = new OpenAIApi(configuration);
    this.prompt = undefined;
    this.imageSizes = {
      small: "256x256",
      medium: "512x512",
      large: "1024x1024",
    };
  }
  private resetPrompt() {
    this.prompt = undefined;
  }
  private async __createPrompt() {
    await inquirer
      .prompt({
        type: "input",
        name: "userInput",
        message: "Ask Away ! (chat gpt will handle it)",
        default: "What's the purpose of life ?",
      })
      .then((answers: any) => {
        const { userInput } = answers || "Sorry, somethin went wrong";
        console.log(userInput);
        this.prompt = userInput;
        return userInput;
      })
      .catch((error: any) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.error(
            `** Prompt couldn't be rendered in the current environment **`
          );
          console.error(error);
          throw Error(error);
        } else {
          // Something else went wrong
          console.error(error);
          process.exit(1);
        }
      });
  }
  public async askSomething(params: createCompletionRequest) {
    this.resetPrompt()
    let prompt : any = params.prompt;

    // NOTE : this is a simple prompt to ask the user for a question to ask GPT-3 | https://www.npmjs.com/package/inquirer
    if (typeof prompt !== "string") {
      await this.__createPrompt();
      prompt = this.prompt;
      process.stdout.write(String(`==> Ask ? ${this.prompt} \n`));
    }

    // NOTE : this is where you define the prompt to send to GPT-3 | https://beta.openai.com/docs/api-reference/completions/create
    const query = {
      model: params.model ? params.model : "text-davinci-003",
      prompt: prompt,
      temperature: params.temperature ? params.temperature : 0,
      max_tokens: params.max_tokens ? params.max_tokens : 1000,
    };
    const response = await this.openai.createCompletion(query);
    return response;
  }

  public async createImage(params: directImageRequest) {
    this.resetPrompt()
    let prompt : any = params.prompt || false;

    // NOTE : this is a simple prompt to ask the user for a question to ask GPT-3 | https://www.npmjs.com/package/inquirer
    if (!prompt) {
      await this.__createPrompt();
      prompt = this.prompt;
      process.stdout.write(String(`==> Ask ? ${this.prompt} \n`));
    }
    const queryModel: CreateImageRequest = {
      prompt: prompt,
      n: params.n ? params.n : 1,
      response_format: "b64_json", // NOTE : I don't want to work with base64 encoded images right now.
      size: params.size ? this.imageSizes[params.size] : "256x256",
    };

    const response = await this.openai.createImage(queryModel);
    return response
  }
}

export default OpenAI;
