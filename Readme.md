# Get started

- [ ] install node.js
- [ ] install yarn globally

```bash
npm i -g yarn
```

- [ ] Create an account on [openai](https://beta.openai.com/)
- [ ] Create an api key [openai api key page](https://beta.openai.com/account/api-keys)
- [ ] Copy that secret key somewhere temporarily
- [ ] Copy .env-default to .env
- [ ] Change the value inside .env to your secret key 
- [ ] Install dependencies

```bash
yarn
```

-  [ ] Run a prompt

```bash
yarn start
```

## About code completion 

If you want to do code completion, a serious reminder from Open AI documents, blog posts and so on.

> OpenAI Codex is a descendant of GPT-3; its training data contains both natural language and billions of lines of source code from publicly available sources, including code in public GitHub repositories. OpenAI Codex is most capable in Python, but it is also proficient in over a dozen languages including JavaScript, Go, Perl, PHP, Ruby, Swift and TypeScript, and even Shell. It has a memory of 14KB for Python code, compared to GPT-3 which has only 4KB—so it can take into account over 3x as much contextual information while performing any task. 

> GPT-3’s main skill is generating natural language in response to a natural language prompt, meaning the only way it affects the world is through the mind of the reader. OpenAI Codex has much of the natural language understanding of GPT-3, but it produces working code—meaning you can issue commands in English to any piece of software with an API. OpenAI Codex empowers computers to better understand people’s intent, which can empower everyone to do more with computers.

>Once a programmer knows what to build, the act of writing code can be thought of as (1) breaking a problem down into simpler problems, and (2) mapping those simple problems to existing code (libraries, APIs, or functions) that already exist. The latter activity is probably the least fun part of programming (and the highest barrier to entry), and it’s where OpenAI Codex excels most.

1. You can generate code, however, results are heavily influenced on which language you work with.
2. It's also influenced by **your** overall cognitive ability to break down a problem in smaller bits with "one liners" since the overall memory at your disposal is 14Kb.

You'll be fine if you treat your AI just like you would treat a super junior developper that has mad learning skills and the whole of stack overflow inside his head.
It will do deduction in a way you can't compete with but it won't outsmart you, because it can't do it. 
If you don't anchor your prompt in a contextualized problem, it won't guess (and you couldn't either). 
It all boils down to how good is your briefing, just like in real life with real people.

Overall I think it's a pretty good tool for a PM / PO / Scrum master / Project manager to train himself in writing concise User stories.
Set a pre-defined outcome and try to reach only via OpenAI queries, your ability to break down a problem clearly will be thoroughly tested.

So AI won't replace you as a coder 'yet' because It can't tell you (or "a customer") that you/he suck(s) at explaining things, in a gentle fashion, and groom you/him into giving out a good brief / User story that can be implemented into a software solution.

## Possible next step from boilerplate.

* It could easily become opinionated and do a better job at target a coding environment. Exemple : answer this in a python context, make this program for nodejs, make a function that runs in a browser environment...
* It could start multiple "User story quality" games that evaluates a player's ability to write prompt intelligible to AI. It's like training humans to use AI instead of training AIs to understand humans in a way.
* It must simplify mangement of layered queries that depend up on each other to build a solution. If a solution is a set of commands, then the state management of this set must be solved by this boilerplate. You must be able to do CRUD operations on each sucessive commands without breaking the house of cards.
* We could build a UI in the browser (nodemon / docker ?).
* We could build a native UI (Electron ? / Flutter ? / Deno ?)
