# HOWTO GPT

## Basics : Read the documentation

There are in my opinion 3 documents that everyone must see / read : 
* general prompt guide : [guide](https://beta.openai.com/docs/guides/completion/introduction)
* general code handling guide : [guide](https://platform.openai.com/docs/guides/code)
* create a game with gpt [video](https://www.youtube.com/watch?v=Zm9B-DvwOgw&list=PLOXw6I10VTv_FhQbbvYh1FvbiaPf43Ve2&index=2)
  * this example is actually from a pitch deck that openAI CTO showed to investors to win investment money.

! There is a caveat, model are evolving constantly, however new models are easier to learn from if you begin here.

## Recreate a basic example to learn how to prompt it

=> Use the [playground](https://platform.openai.com/playground) ! 
* Step 1 : Make it solve a basic concept that is not related to work
  * Don't code ask gpt to do it for you
    * example : refactor this snippet to be indempotent
    * example : rename this function to ....
    * example : use a ?? operator and a ?. operator instead of a switch in this function.
  * Play with ``temperature``flag to set the algorithm to your preferred settings
  * Make it test your code.
* Step 2 : do some front end with chat GPT
  * It's a visual confirmation that you're prompting it right
  * Prompts are much harder to build in frontend that backend
* Step 3 : Start using this knowledge with github copilot
  * Make it explain code and document everything to gain confidence
  * Make it refactor from input
  * Make it write test from fixtures
  * Use the suggestion sample tab.

## Best pratice :

* Make it summarize your prompt you'll know if you've missed your point.
* Re-use your prompt as bias to get more relevant answers
* GPT is designed to learn from attention to context, however it will lose context over time
  * "Save" good prompt and re-use them
  * look for good prompts online
  * build up prompts sequentially don't do big upfront designed prompts
* Know how to use DAN (do anything now).

## Going further :

* Overview software ideation with chatgpt (malware) : https://arstechnica.com/information-technology/2023/01/chatgpt-is-enabling-script-kiddies-to-write-functional-malware/
* Software creation with chatgpt (malware RAT with a zero day from prompt) : https://www.forcepoint.com/blog/x-labs/zero-day-exfiltration-using-chatgpt-prompts
* Replacing a SQL analyst with SQL Gpt prompts and a pythen shell (crunchbot) : https://www.patterns.app/blog/2023/01/18/crunchbot-sql-analyst-gpt/

## Final warning

* If you're gonna build a crunch bot, you're building a "free agent" that has control over code. Don't release it on a direct production access.
* ChatGPT tend to write unsafe code.
* Models and APIs are changing a lot. Lookout for competition (LLVMs). 

# HOW TO Github Copilot

We have github enterprise with Github Copilot included. You just need to connect to your github account managed by Seyna or get credentials from Seyna.

## Read the docs 

* First steps are described [here](https://docs.github.com/en/copilot/getting-started-with-github-copilot) for every IDE.
* Disable telemetry ? "There's no free lunch."
* Keep in mind that it trains on your code too. Nothing is private.

# Best for

* Convert prompt to code
* Document code
* Create unit tests (depends heavily on your test **framework**)

## Best pratice

* make it autocomplete the prompt
* make it answer the prompt
* use the suggestions tab when in doubt
* the more you build towards [PURE functions](https://en.wikipedia.org/wiki/Pure_function) the better.

## Going further : 

* Beta extentensions :
  * [Labs](https://githubnext.com/projects/copilot-labs/)
  * [Copilot Nightly](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-nightly)