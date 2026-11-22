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
- Quizes
- Games

You will be able to earn points and the top 3 will be able to win a small prize`,
    },
  },
  {
    title: "Introduction / Prizes",
    kind: {
      tag: "image",
      value: "./link-to-prizes",
    },
  },
  {
    title: "Overiew / What is Spacetime",
    kind: {
      tag: "text",
      value: `Spacetime is the reactive backend platform. It has build-in:
  - Database
  - Server Logic
  - Authentication
  - Deployment Mangement
  - Real-Time Sync`,
    },
  },
  {
    title: "Overiew / What makes Spacetime different",
    kind: {
      tag: "text",
      value: `
  - Your code runs **inside** the database
  - Everything is **reactive** by default
  - Everything is **persistant** by default
  - Everything is **code first** by default`,
    },
  },
  {
    title: "Overiew / The origin of Spacetime",
    kind: {
      tag: "image",
      value: "./link-to-BitCraft",
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
    title: "Overiew / Key Concepts",
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
    title: "Overview / Language Support",
    kind: {
      tag: "text",
      value: `These languages are officially supported, both on server and client
- C#
- C++
- Rust
- Typescript`,
    },
  },
  {
    title: "Performance of Languages",
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
- free sever and client models based on the table definition
- data is stored in memory by default
- visibility can be configured to control read-access
- can only be modifed  through a reducer`,
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
    title: "Tables / Views Definition",
    kind: {
      tag: "text",
      value: `Views are
- read only functions
- they appear as tables to the client
- they can be used to restrict access to tables or build more complex types for clients
- views can be anyonmus or user specific`,
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
    console.error("an exception occured", exception);
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
    title: "Lets do a performance test",
    kind: {
      tag: "tugOfWar",
      value: 0,
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
      value: `function goToSlide(slideNumber: number) {
  userQuery.throwIfNotPresenter(ctx.sender);
  const slideExists = ctx.db.slide.slideNumber.find(slideNumber) !== null;
  if (!slideExists) {
    throw new SenderError("slide not available");
  }

  const deck = deckQuery.getDeckOrThrow();

  ctx.db.deck.id.update({ ...deck, currentSlide: slideNumber });
}`,
    },
  },
  {
    title: "Modules / Definition",
    kind: {
      tag: "text",
      value: "",
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
    title: "Host / Self-Hosted",
    kind: {
      tag: "quiz",
      value: 1,
    },
  },
  {
    title: "and another one",
    kind: {
      tag: "tugOfWar",
      value: 1,
    },
  },
];
