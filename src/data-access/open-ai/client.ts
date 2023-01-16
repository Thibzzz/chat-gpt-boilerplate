import { Configuration, CreateImageRequest, OpenAIApi } from "openai";
import { writeFileToPath } from "./../../utils/files/index.js";
import dotenv from "dotenv";
import inquirer from "inquirer";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

interface createCodeCompletionRequest {
  model?: string;
  prompt?: string;
  temperature?: number;
  n?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stop?: string | string[];
}

interface createCompletionRequest {
  prompt?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

interface directImageRequest {
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
  private prompt: string | undefined;
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

  /**
   * Creates a text from a prompt : https://beta.openai.com/docs/guides/completion
   * NOTE : you can swap the model to use a different one, you could use a code completion model for example.
   * Just be aware that the prompt will need to be formatted correctly and the answer will be formatted as well (it might break your code)
   * @param params
   * @returns
   */
  public async askSomething(params: createCompletionRequest) {
    this.resetPrompt();
    let prompt: any = params.prompt;

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

  /**
   * Creates an image from a prompt : https://beta.openai.com/docs/guides/images/introduction
   * @param params
   * @returns
   */
  public async createImage(params: directImageRequest) {
    this.resetPrompt();
    let prompt: any = params.prompt || false;

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
    return response;
  }

  /**
   * Creates a code snippet from a prompt : https://beta.openai.com/docs/guides/code-completion/introduction
   * @param params
   * @returns
   */
  /**
  model="code-davinci-002",
  prompt="You: How do I combine arrays?\nJavaScript chatbot: You can use the concat() method.\nYou: How do you make an alert appear after 10 seconds?\nJavaScript chatbot",
  temperature=0,
  max_tokens=60,
  top_p=1.0,
  frequency_penalty=0.5,
  presence_penalty=0.0,
  stop=["You:"]
    */
  public async createCode(params: createCodeCompletionRequest) {
    this.resetPrompt();
    let prompt: any = params.prompt || false;
    if (!prompt) {
      await this.__createPrompt();
      prompt = this.prompt;
      process.stdout.write(String(`==> Ask ? ${this.prompt} \n`));
    }
    const queryModel = {
      model: params.model ? params.model : "code-davinci-002",
      prompt: `/* ${prompt} */`,
      temperature: params.temperature ? params.temperature : 0,
      max_tokens: params.max_tokens ? params.max_tokens : 1000,
      stop: params.stop ? params.stop : ["/* Command:"],
    };
    const response = await this.openai.createCompletion(queryModel);
    return response;
  }

  /**
   * Save a base64 encoded image to a file, needs to be a response from openai.createImage (we'll call it createImageReponseObject)
   * @param fileName - name of the file, default : "image-gpt3"
   * @param pathstring - path to save the image to, default : "./output"
   * @param data  - base64 encoded image, default : createImageReponseObject.data.data[0].b64_json
   */
  public async saveImageToPath(
    fileName: string,
    pathstring: string,
    data: any
  ) {
    let nameString = fileName || "image-gpt3";
    let pathString = pathstring || "./output";
    const timestampedName = `${nameString}-${Date.now()}.png`;
    const fullPath = `${pathString}/${timestampedName}`;
    await writeFileToPath(timestampedName, pathString, data);
    process.stdout.write(`Image saved to : ${fullPath} \n`);
    return fullPath;
  }
}

export default OpenAI;
