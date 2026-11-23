import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Point = readonly [number, number];

// One loop of the animation. `ms` is how long each step stays on screen.
const STEPS = [
  {
    id: "subscribe",
    ms: 3500,
    term: "Subscription",
    text: "clients subscribe to a table and keep a live copy of its rows",
  },
  { id: "call", ms: 2800, term: "Reducer", text: "a client calls a reducer to change data" },
  {
    id: "run",
    ms: 2800,
    term: "Reducer",
    text: "it runs inside the module as a single transaction",
  },
  { id: "write", ms: 2500, term: "Table", text: "the row changes where your data lives" },
  {
    id: "push",
    ms: 2800,
    term: "Subscription",
    text: "the change is pushed to every subscribed client",
  },
  {
    id: "synced",
    ms: 3500,
    term: "In sync",
    text: "every client is up to date, and nobody wrote an API for it",
  },
] as const;

type StepId = (typeof STEPS)[number]["id"];
const indexOf = (id: StepId) => STEPS.findIndex((s) => s.id === id);

// Geometry, in SVG units (viewBox is 800 x 520).
const CLIENTS = [
  { name: "Client A", x: 40 },
  { name: "Client B", x: 310 },
  { name: "Client C", x: 580 },
];
const CALL = { from: [120, 130], to: [120, 325] } as const;
const WRITE = { from: [320, 390], to: [440, 390] } as const;
const PUSH = [
  { from: [500, 325], to: [190, 130] },
  { from: [570, 325], to: [400, 130] },
  { from: [640, 325], to: [670, 130] },
] as const;

const css = `
@keyframes kc-travel {
  0% { transform: translate(var(--fx), var(--fy)); opacity: 0; }
  12%, 88% { opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
}
@keyframes kc-pop {
  0% { transform: scale(1.6); }
  100% { transform: scale(1); }
}
@keyframes kc-fade {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: none; }
}
.kc-packet { animation: kc-travel 1.6s ease-in-out 0.3s both; }
.kc-pop { transform-box: fill-box; transform-origin: center; animation: kc-pop 0.5s ease-out; }
.kc-fade { animation: kc-fade 0.4s ease-out; }
`;

const box = (active: boolean) =>
  cn(
    "transition-colors duration-300",
    active ? "fill-primary/10 stroke-primary" : "fill-card stroke-border",
  );

const wire = (active: boolean) =>
  cn("transition-colors duration-300", active ? "stroke-primary" : "stroke-border");

export function KeyConceptsSlide() {
  const [tick, setTick] = useState(0);
  const step = tick % STEPS.length;
  const round = Math.floor(tick / STEPS.length);
  const { id, ms, term, text } = STEPS[step];

  useEffect(() => {
    const timer = setTimeout(() => setTick((t) => t + 1), ms);
    return () => clearTimeout(timer);
  }, [tick, ms]);

  // The table changes first; the clients catch up once the update arrives.
  const tableValue = round + (step >= indexOf("write") ? 1 : 0);
  const clientValue = round + (step >= indexOf("synced") ? 1 : 0);

  return (
    <article className="mx-auto flex min-h-full max-w-5xl flex-col justify-center gap-4">
      <style>{css}</style>

      <svg
        viewBox="0 0 800 520"
        role="img"
        aria-label="A client calls a reducer, the reducer updates a table, and the change is pushed to all subscribed clients."
        className="mx-auto max-h-[65dvh] w-full"
      >
        {/* Host */}
        <rect
          x={40}
          y={230}
          width={720}
          height={270}
          rx={20}
          strokeWidth={2}
          className="fill-muted/40 stroke-border"
        />
        <InlineLabel x={60} y={258} name="Host" hint="a server that runs your modules" />

        {/* Module */}
        <rect
          x={70}
          y={275}
          width={660}
          height={205}
          rx={16}
          strokeWidth={2}
          strokeDasharray="6 6"
          className="fill-background stroke-border"
        />
        <InlineLabel x={88} y={302} name="Module" hint="tables, subscriptions and reducers" />

        {/* Connections */}
        <line
          x1={CALL.from[0]}
          y1={CALL.from[1]}
          x2={CALL.to[0]}
          y2={CALL.to[1]}
          strokeWidth={3}
          className={wire(id === "call")}
        />
        <line
          x1={WRITE.from[0]}
          y1={WRITE.from[1]}
          x2={WRITE.to[0]}
          y2={WRITE.to[1]}
          strokeWidth={3}
          className={wire(id === "run")}
        />
        {PUSH.map((path, i) => (
          <line
            key={i}
            x1={path.from[0]}
            y1={path.from[1]}
            x2={path.to[0]}
            y2={path.to[1]}
            strokeWidth={3}
            strokeDasharray="8 6"
            className={wire(id === "subscribe" || id === "push")}
          />
        ))}
        <text x={132} y={190} fontSize={14} className="fill-muted-foreground">
          call
        </text>
        <text x={555} y={195} fontSize={14} textAnchor="middle" className="fill-muted-foreground">
          subscriptions
        </text>

        {/* Reducer */}
        <rect
          x={100}
          y={325}
          width={220}
          height={130}
          rx={12}
          strokeWidth={2}
          className={box(id === "run")}
        />
        <text x={120} y={356} fontSize={18} className="fill-foreground font-semibold">
          Reducer
        </text>
        <text x={120} y={378} fontSize={14} className="fill-muted-foreground">
          how you modify your data
        </text>
        <text x={120} y={428} fontSize={20} className="fill-foreground font-mono">
          increment()
        </text>

        {/* Table */}
        <rect
          x={440}
          y={325}
          width={260}
          height={130}
          rx={12}
          strokeWidth={2}
          className={box(id === "write")}
        />
        <text x={460} y={356} fontSize={18} className="fill-foreground font-semibold">
          Table
        </text>
        <text x={460} y={378} fontSize={14} className="fill-muted-foreground">
          where your data lives
        </text>
        <rect
          x={460}
          y={394}
          width={220}
          height={42}
          rx={8}
          className="fill-background stroke-border"
        />
        <text x={476} y={422} fontSize={18} className="fill-muted-foreground font-mono">
          count
        </text>
        <text
          key={tableValue}
          x={664}
          y={423}
          textAnchor="end"
          fontSize={22}
          className="kc-pop fill-foreground font-mono font-bold"
        >
          {tableValue}
        </text>

        {/* Clients */}
        {CLIENTS.map((client, i) => (
          <g key={client.name}>
            <rect
              x={client.x}
              y={20}
              width={180}
              height={110}
              rx={14}
              strokeWidth={2}
              className={box(id === "synced" || (i === 0 && id === "call"))}
            />
            <text
              x={client.x + 90}
              y={48}
              textAnchor="middle"
              fontSize={15}
              className="fill-muted-foreground"
            >
              {client.name}
            </text>
            <text
              key={clientValue}
              x={client.x + 90}
              y={104}
              textAnchor="middle"
              fontSize={44}
              className="kc-pop fill-foreground font-bold tabular-nums"
            >
              {clientValue}
            </text>
          </g>
        ))}

        {/* Packets: mounted per step, so the travel animation restarts each time */}
        {id === "call" && <Packet from={CALL.from} to={CALL.to} label="increment()" />}
        {id === "run" && <Packet from={WRITE.from} to={WRITE.to} label="+1" />}
        {id === "push" &&
          PUSH.map((path, i) => (
            <Packet key={i} from={path.from} to={path.to} label={String(tableValue)} />
          ))}
      </svg>

      <p key={step} className="kc-fade min-h-14 text-center text-lg text-balance lg:text-2xl">
        <span className="font-semibold text-primary">{term}</span>
        <span className="text-muted-foreground"> · {text}</span>
      </p>
    </article>
  );
}

function InlineLabel({ x, y, name, hint }: { x: number; y: number; name: string; hint: string }) {
  return (
    <text x={x} y={y} fontSize={15}>
      <tspan className="fill-foreground font-semibold">{name}</tspan>
      <tspan dx={8} className="fill-muted-foreground">
        {hint}
      </tspan>
    </text>
  );
}

function Packet({ from, to, label }: { from: Point; to: Point; label: string }) {
  const style = {
    "--fx": `${from[0]}px`,
    "--fy": `${from[1]}px`,
    "--tx": `${to[0]}px`,
    "--ty": `${to[1]}px`,
  } as CSSProperties;

  return (
    <g className="kc-packet" style={style}>
      <circle r={9} className="fill-primary" />
      <text
        y={-16}
        textAnchor="middle"
        fontSize={15}
        className="fill-primary font-mono font-semibold"
      >
        {label}
      </text>
    </g>
  );
}
