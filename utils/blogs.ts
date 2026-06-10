export interface Blog {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    readTime: string;
    tags: string[];
    headerImage: string;
    headerGradient: string;
    headerEmoji: string;
    sections: {
        heading?: string;
        body: string;
    }[];
}

export const BLOGS: Blog[] = [
    {
        id: "why-i-stopped-following-tutorials",
        headerImage: "/projects/webiste-build.png",
        title: "Why I stopped following tutorials and started building broken things",
        subtitle: "The moment I closed the course tab and opened a blank repo — and why that changed everything.",
        date: "June 2025",
        readTime: "5 min read",
        tags: ["Learning", "Mindset", "Fresher"],
        headerGradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        headerEmoji: "🔨",
        sections: [
            {
                body: `There's a specific kind of comfort in following a tutorial. Someone has already solved the problem. The code works. The app looks good at the end. You feel productive. You feel like you're learning.

I finished two complete web development courses, built maybe fifteen tutorial projects, and felt genuinely confident. Then I opened a blank Next.js repo to build something of my own and froze completely. Nothing worked the way it did in the videos. I didn't know where to start. I didn't even know what questions to ask.

That gap — between tutorial confidence and real-project paralysis — is the thing nobody warns you about.`,
            },
            {
                heading: "The illusion of following along",
                body: `Tutorials are optimized to feel good, not to teach you how to think. Every bug is already anticipated. Every decision is already made. You're not building — you're transcribing. And when you close the tab, you haven't internalized the process. You've memorized a sequence.

The first time I tried to build Finovex, my personal finance app, I realized I didn't actually know how authentication worked. I knew how to copy the auth code from a tutorial. There's a significant difference. I had to go back, read documentation, break things repeatedly, and slowly understand what was actually happening underneath.

That process was slower, more frustrating, and infinitely more valuable.`,
            },
            {
                heading: "What breaking things actually teaches you",
                body: `When I started building Skribbbly — a multiplayer drawing and guessing game — I had no reference tutorial to follow. Nobody had made exactly this thing. I had to figure out how Socket.io rooms worked, how to sync canvas state across clients in real time, how to handle players disconnecting mid-game without the whole session collapsing.

Everything broke. Constantly. Players would draw on different coordinate systems because I hadn't accounted for canvas scaling. The scoring logic awarded points to the wrong person. The game would freeze when the last player left a room.

But here's what happened: every time something broke, I had to understand it deeply enough to fix it. I couldn't skip ahead to the answer. I had to read the Socket.io docs properly. I had to think about state. I had to reason about timing. By the time Skribbbly actually worked, I genuinely understood the concepts — not just the syntax.`,
            },
            {
                heading: "The projects that embarrassed me taught me the most",
                body: `HAQMS, a hospital queue management system I built during my internship, started as something I thought was clean and well-structured. A senior developer reviewed it and pointed out SQL injection vulnerabilities, N+1 query problems, race conditions in the check-in logic, and JWT tokens stored in a completely insecure way.

It was humbling. But fixing each of those issues gave me a mental model of security and performance that no tutorial ever built in me. I stopped thinking about code as something that runs and started thinking about code as something that has to survive contact with the real world.

That shift only happens when you build things that break in ways you didn't expect.`,
            },
            {
                heading: "What I'd tell myself at the start",
                body: `Finish one good course. Get the foundational vocabulary. Then close it and build something you actually care about — even if you're not ready. Especially if you're not ready.

Pick something specific enough that you can finish it and ambitious enough that it scares you a little. Accept that the first version will be embarrassing. Ship it anyway. Then go back, read the code you wrote three months ago, and fix everything that makes you wince.

That cycle — build, break, understand, rebuild — is the actual curriculum. The tutorials are just the introduction.`,
            },
        ],
    },
    {
        id: "building-multiplayer-game-socketio",
        headerImage: "/projects/scribbbly.jpeg",
        title: "How I built a multiplayer game with Socket.io — and what broke along the way",
        subtitle: "A post-mortem on Skribbbly: real-time sync, canvas bugs, broken scoring, and shipping something actually playable.",
        date: "May 2025",
        readTime: "7 min read",
        tags: ["Socket.io", "Next.js", "Real-time", "Post-mortem"],
        headerGradient: "linear-gradient(135deg, #0d1117 0%, #1a1a2e 40%, #2d1b4e 100%)",
        headerEmoji: "🎮",
        sections: [
            {
                body: `I wanted to build something that felt alive. Something where two people could open a browser, end up in the same space, and interact in real time. Skribbbly — a multiplayer drawing and guessing game — seemed like the right scope. One person draws a word, everyone else guesses. Simple rules, complex implementation.

What followed was one of the most instructive experiences I've had as a developer. Not because everything went smoothly. Because almost nothing did.`,
            },
            {
                heading: "Choosing the stack",
                body: `I chose Next.js for the frontend and a separate Node.js server for the WebSocket layer using Socket.io. Keeping them separate meant I could deploy the client on Vercel and the server on Render — a decision that caused its own headaches later, but was ultimately the right call for understanding how real-time systems actually work.

TypeScript across the whole stack was a deliberate choice. In a real-time app where events pass between client and server constantly, type safety isn't optional — it's what keeps you sane when you're debugging at midnight trying to figure out why the wrong player is getting points.`,
            },
            {
                heading: "The canvas problem nobody mentions",
                body: `The drawing canvas seemed straightforward. Capture mouse positions, emit them over the socket, draw them on every connected client. In practice, this broke immediately.

The issue was coordinate normalization. A player drawing on a large monitor would emit absolute pixel coordinates. A player viewing on a smaller screen or a different zoom level would draw those coordinates at completely wrong positions. Lines would appear in different places on different screens. The canvas was desynced before a single word was guessed.

The fix was to normalize all coordinates as percentages of the canvas dimensions before emitting, then denormalize on the receiving end. Simple in retrospect, completely non-obvious until you've seen the bug in action.`,
            },
            {
                heading: "Scoring logic and race conditions",
                body: `The scoring system broke in a specific and embarrassing way: the drawer was receiving points for correct guesses. This was a logic bug — when a player guessed correctly, the event handler was checking socket ID against the wrong reference, and in some cases awarding the drawer instead of the guesser.

There was also a subtler problem. If two players guessed the correct answer within milliseconds of each other, both would receive full points because the server hadn't finished processing the first guess before the second arrived. This is a classic race condition, and solving it meant thinking carefully about server-side state management — making sure the round was marked as solved before processing any further guesses.`,
            },
            {
                heading: "Room management and disconnections",
                body: `Players disconnect. Browsers crash. People close tabs without warning. A multiplayer game has to handle all of this gracefully, and Skribbbly did not — at first.

When the current drawer disconnected, the game would freeze. No new round would start. The remaining players would sit in a broken state with no way out. Fixing this meant tracking the drawer's socket ID server-side and triggering a round rotation on disconnect events, which in turn meant thinking carefully about what constituted a valid game state at every point in the flow.

Managing game phases — lobby, active round, scoring, end screen — required a proper state machine on the server. Each phase had specific rules about what events were valid. Emitting a guess event during the lobby phase shouldn't do anything. The server had to be explicit about ignoring invalid events rather than processing them and producing corrupted state.`,
            },
            {
                heading: "Deployment across two platforms",
                body: `Vercel handles the Next.js client cleanly. Render hosts the Node.js WebSocket server. Getting them to talk to each other required careful CORS configuration — Render's free tier also spins down after inactivity, which means the first connection after idle time has a cold start delay.

The bigger lesson was that deployment is part of the product. A game that works locally but has a 30-second connection delay in production is not a working game. Testing against the real deployment environment, not just localhost, revealed a whole category of issues that never appeared locally.`,
            },
            {
                heading: "What I'd do differently",
                body: `I'd design the server state machine first before writing a single socket event handler. The game phase logic was retrofitted after the fact, which made it messier than it needed to be. Starting from a clear model of what states exist and what transitions are valid would have prevented a lot of the bugs I had to debug reactively.

I'd also write the coordinate normalization logic on day one. It's one of those problems that seems trivial until it isn't, and it affects every drawing interaction in the entire app.

Skribbbly is playable now. It has rooms, real-time drawing sync, chat, scoring, and timers. Getting there required breaking it in almost every possible way first — which, looking back, was exactly the education I needed.`,
            },
        ],
    },
    {
        id: "building-ai-portfolio",
        headerImage: "/projects/Portfolio.jpg",
        title: "Building an AI portfolio that talks back — my stack and decisions",
        subtitle: "Why I built a conversational portfolio instead of a standard one, and how I made it work with Next.js, TypeScript, and the OpenAI API.",
        date: "June 2025",
        readTime: "6 min read",
        tags: ["AI", "Next.js", "OpenAI", "Portfolio"],
        headerGradient: "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #2d0a4e 100%)",
        headerEmoji: "🤖",
        sections: [
            {
                body: `Most developer portfolios follow the same structure. A hero section with a tagline. A skills list. A projects section with screenshots. A contact form. They're functional, predictable, and completely forgettable.

I wanted mine to do something different. Not different for the sake of novelty — different because it would actually be more useful for the person visiting it. A recruiter spending three minutes on my portfolio can't ask a static page a follow-up question. They can't dig into something that interests them. They read what I chose to show them, in the order I chose to show it.

An AI that knows everything about me and can answer any question a recruiter might have — that changes the dynamic entirely.`,
            },
            {
                heading: "The core idea",
                body: `The concept is straightforward. A visitor lands on the portfolio, sees a chat interface, and can ask anything. What's your tech stack? Tell me about Skribbbly. Are you comfortable with backend work? What's your availability?

The AI answers in first person, using a detailed system prompt that contains all the real information about my background, projects, skills, and experience. It doesn't invent things. It only uses facts I've given it. The conversation feels natural because the AI is genuinely trying to be helpful to the person asking — not performing.

I called it AskManoj.`,
            },
            {
                heading: "Stack decisions",
                body: `Next.js with TypeScript was the obvious choice — it's what I know best and it handles both the frontend and the API routes cleanly. Tailwind CSS for styling. The OpenAI API for the language model, using GPT-4o for response quality.

The system prompt is the heart of the whole thing. It contains my full background: education, projects with real technical details, skills, certifications, what kind of roles I'm looking for. The prompt explicitly instructs the model to speak in first person, be warm and conversational, and never invent information it hasn't been given. Getting this right took several iterations — the first version was too formal, too listy, not enough like how I actually talk.`,
            },
            {
                heading: "Intent classification",
                body: `Not every question needs to hit the OpenAI API. Some queries are predictable enough that they can be handled with pre-built responses or dedicated UI components. Asking for my resume should surface a download button, not a paragraph of text.

I built an intent classification layer that routes incoming queries before they reach the API. Queries about the resume trigger a component. Queries about specific projects pull from structured data. Only open-ended conversational queries go to the model. This keeps costs down and makes the experience feel faster and more purposeful.

The classification logic itself is simple — keyword matching and pattern detection rather than a second model call. It doesn't need to be smart. It just needs to catch the common cases.`,
            },
            {
                heading: "Conversation state",
                body: `The chat needs memory. A recruiter who asks about Skribbbly and then asks a follow-up question shouldn't have to re-explain what they were talking about. The full conversation history gets passed with every API request, so the model has context for everything said in the session.

Managing this state cleanly was one of the more interesting design problems. I built a conversation context using React context and a reducer — a single source of truth for all messages, loading states, and conversation metadata. Any component in the tree can dispatch a message or read the current state without prop drilling.

The context also handles the streaming response. Rather than waiting for the full API response before displaying anything, the message appears word by word as the model generates it — which makes the interaction feel genuinely conversational rather than like a search result.`,
            },
            {
                heading: "What makes it actually useful",
                body: `The technical implementation is only part of it. What makes the portfolio work is the quality of the information in the system prompt. A vague prompt produces vague answers. I spent time writing detailed, specific descriptions of every project — what problem it solved, what the real technical challenges were, what I learned. The AI is only as useful as what I gave it to work with.

The suggested prompts on the home screen matter too. Most visitors won't know what to ask first. Giving them four specific, useful questions — about my stack, about a specific project, about my background — removes the blank page problem and immediately demonstrates what the AI can do.

The portfolio is live. It's the most honest representation of my work I've built, because it can answer questions I haven't anticipated and dig into details a static page would never surface.`,
            },
        ],
    },
];

export function getBlogById(id: string): Blog | undefined {
    return BLOGS.find((blog) => blog.id === id);
}