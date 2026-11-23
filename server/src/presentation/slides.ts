import type { SlideValues } from "../domain/tables/slide";

export const slides: SlideValues[] = [
  {
    title: "Introduction / Welcome",
    kind: {
      tag: "text",
      value: `This is **SlidetimeDB** a presentation about **Spacetime** in **Spacetime**`,
    },
  },
  {
    title: "Introduction / Format",
    kind: {
      tag: "text",
      value: `This talk will be a mix of
- Slide
- Quizzes
- Games

You will be able to earn points and the top 3 will be able to win a small prize`,
    },
  },
  {
    title: "Introduction / Prizes",
    kind: {
      tag: "text",
      value: `the prizes are Spacetime merch from their merch store:
- coffee mug
- notebook
- cap

I will award the prizes in the coming weeks, since not everything has been delivered, sorry :)`,
    },
  },
  {
    title: "Overview / What is Spacetime",
    kind: {
      tag: "text",
      value: `Spacetime is the reactive backend platform. It has built-in:
  - Database
  - Server Logic
  - Authentication
  - Deployment Management`,
    },
  },
  {
    title: "Overview / What makes Spacetime different",
    kind: {
      tag: "text",
      value: `
  - Your code runs **inside** the database
  - Everything is **real-time** by default
  - Everything is **persistent** by default`,
    },
  },
  {
    title: "Overview / What do people build with Spacetime",
    kind: {
      tag: "text",
      value: `
- Multiplayer Games
- Collaborative Software
- Video Conferences
- Spacetime Table Viewers
- A Live Presentation Website :)`,
    },
  },
  {
    title: "Overview / The origin of Spacetime",
    kind: {
      tag: "quiz",
      value: 2,
    },
  },
  {
    title: "Overview / Key Concepts",
    kind: {
      tag: "text",
      value: `
- **Table**: where your data lives
- **Subscription**: how you read your data
- **Reducer**: how you modify your data
- **Module**: a collection of tables, subscriptions and reducers
- **Host**: a server that runs your modules
`,
    },
  },
  {
    title: "Overview / Key Concepts Diagram",
    kind: {
      tag: "keyConcepts",
    },
  },
  {
    title: "Overview / Language Support",
    kind: {
      tag: "text",
      value: `These languages are officially supported, both on server and client. They run in an isolated sandbox
- C# runs as WebAssembly
- C++ runs as WebAssembly
- Rust runs as WebAssembly
- TypeScript as JavaScript`,
    },
  },
  {
    title: "Language Performance",
    kind: {
      tag: "quiz",
      value: 0,
    },
  },
  {
    title: "Tables / Definition",
    kind: {
      tag: "text",
      value: `
- defined in Code
- free server and client models based on the table definition
- data is stored in memory by default
- visibility can be configured to control read-access
- can only be modified through a reducer`,
    },
  },
  {
    title: "Tables / Code Example",
    kind: {
      tag: "code",
      value: `const slideKind = t.enum("slideKind", {
        chapter: t.unit(),
        text: t.string(),
        image: t.string(),
        quiz: t.u32(),
        tugOfWar: t.u32(),
        code: t.string(),
      });

      export const slide = table(
        {
          name: "slide",
          public: true,
          cachePolicy: "required_in_memory",
        },
        {
          slideNumber: t.u32().primaryKey(),
          deckId: t.u32(),
          title: t.string(),
          kind: slideKind,
        },
      );`,
    },
  },
  {
    title: "Tables / Event Tables",
    kind: {
      tag: "text",
      value: `
- doesn't persist any data
- used for messaging clients
- comparable with message queuing systems like Kafka or RabbitMQ
- this is how the live reactions are implemented 🤯`,
    },
  },
  {
    title: "Tables / Views Definition",
    kind: {
      tag: "text",
      value: `Views are
- read only functions
- they appear as tables to the client
- they can be used to restrict access to tables or build more complex types for clients
- views can be anonymous or user specific`,
    },
  },
  {
    title: "Tables / Views Registration",
    kind: {
      tag: "code",
      value: `export const quizView = spacetimedb.anonymousView(
{
  public: true,
},
quizResult,
(ctx) => {
  const quizQuery = useQuizQuery(ctx.db);
  try {
    return quizQuery.getQuizObject();
  } catch (exception) {
    console.error("an exception occurred", exception);
    return undefined;
  }
});`,
    },
  },
  {
    title: "Tables / Views Logic",
    kind: {
      tag: "code",
      value: `function getQuizObject(): QuizObject {
  const quiz = getCurrent();
  const revealAnswer = quiz.state.tag === "reveal";
  const responses = quizResponseQuery.getByQuizId(quiz.id);
  const options: DisplayOption[] = quizOptionQuery
    .getByQuizId(quiz.id)
    .map((option) => ({ ...option, isRight: revealAnswer ? option.isRight : undefined }));
  return {
    quiz,
    responses,
    options,
  };
}`,
    },
  },
  {
    title: "That was a lot of theory have some free points",
    kind: {
      tag: "freePoints",
      value: 20,
    },
  },
  {
    title: "Reducers / Definition",
    kind: {
      tag: "text",
      value: `Reducers are:
- the only way to change the state
- transactional
- have parameters
- never have return values`,
    },
  },
  {
    title: "Reducers / Registration",
    kind: {
      tag: "code",
      value: `export const goToSlide = spacetimedb.reducer({ slideNumber: t.u32() }, (ctx, { slideNumber }) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.goToSlide(slideNumber);
});`,
    },
  },
  {
    title: "Reducers / Logic",
    kind: {
      tag: "code",
      value: `function claimFreePoints() {
const deck = deckQuery.getDeckOrThrow();
const currentSlide = slideQuery.getBySlidenumberOrThrow(deck.currentSlide);
if (currentSlide.kind.tag !== "freePoints") {
  throw new SenderError("can't claim free points on this type of slide");

const participant = participantQuery.getByIdentityOrThrow(ctx.sender);
ctx.db.participant.identity.update({ ...participant, score: participant.score + 1
const pointsleft = currentSlide.kind.value - 1;
if (pointsleft < 0) {
  throw new SenderError("no points left");

ctx.db.slide.slideNumber.update({
  ...currentSlide,
  kind: {
    tag: "freePoints",
    value: pointsleft,
  },
});
}`,
    },
  },
  {
    title: "Reducers / How do I escape the transaction?",
    kind: {
      tag: "text",
      value: `there is a special type of reducer called a procedure
- procedures can open and close transaction for long running tasks
- they can interact have access to http requests
- they have input parameters and return values
- they can be called by a scheduler`,
    },
  },
  {
    title: "More free points",
    kind: {
      tag: "freePoints",
      value: 25,
    },
  },
  {
    title: "Modules / Definition",
    kind: {
      tag: "text",
      value: `A module is the collection of the schema and business logic. There are currently two ways modules can interact with each other:
- Submodules: are reusable modules that run in the same process as their parent module. Think of them as libraries
- Inter Module Communication: are async calls between two modules running on the same host. Useful for Sharding`,
    },
  },
  {
    title: "Host / Hosting",
    kind: {
      tag: "text",
      value: `Broadly speaking there are two ways to run Spacetime:
- Maincloud
- Self-Hosted`,
    },
  },
  {
    title: "Host / Maincloud",
    kind: {
      tag: "text",
      value: `The maincloud offers:
- Analytics
- Table Viewer
- is serverless
- pricing is usage based`,
    },
  },
  {
    title: "Host / SLAs",
    kind: {
      tag: "text",
      value: `
official uptime requirement: 99.5%  in a given calendar month
quote from founder:
> I’m just going to cut off a random employee's finger for every minute of downtime we have`,
    },
  },
  {
    title: "Host / Self hosting",
    kind: {
      tag: "text",
      value: `Broadly speaking there are two ways to run Spacetime:
- Maincloud
- Self-Hosted`,
    },
  },
  {
    title: "Host / Self-Hosted",
    kind: {
      tag: "quiz",
      value: 1,
    },
  },
  {
    title: "Let's do a performance test",
    kind: {
      tag: "tugOfWar",
      value: 0,
    },
  },
  {
    title: "Scaling / How to Scale a database",
    kind: {
      tag: "text",
      value: `there are 3 directions to scale a database
- Compute
- Storage
- Networking`,
    },
  },
  {
    title: "Scaling / How does Spacetime scale",
    kind: {
      tag: "text",
      value: `
- Compute => Sharding
- Storage => Tiered Storage
- Networking => Read Replicas (coming in the future)
`,
    },
  },
  {
    title: "Scaling / Parallelism",
    kind: {
      tag: "text",
      value: `
  ![SpacetimeDB architecture](https://spacetimedb.com/images/blog/how-does-spacetime-scale/single-core-bell-curve-meme.png)
  `,
    },
  },
  {
    title: "End / Last Game",
    kind: {
      tag: "tugOfWar",
      value: 1,
    },
  },
  {
    title: "End / Thank you All",
    kind: {
      tag: "text",
      value: `Please give Spacetime a try
and let's have a great Sharing is Caring Extreme`,
    },
  },
];
