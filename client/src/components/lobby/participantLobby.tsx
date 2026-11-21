import type { Deck, Participant } from "@/module_bindings/types";

import { reducers } from "@/module_bindings";
import { AnimatePresence, motion } from "motion/react";
import { useState, type SubmitEvent } from "react";
import { useReducer } from "spacetimedb/react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useParticipant } from "@/hooks/useParticipant";

type ParticipantLobbyProps = {
  participants: readonly Participant[];
  deck: Deck;
};

export function ParticipantLobby(props: ParticipantLobbyProps) {
  const [username, setUsername] = useState("");
  const { hasJoined } = useParticipant(props.deck, props.participants);
  const joinButtonText = hasJoined ? "Updated Username" : "Join";

  const joinDeck = useReducer(reducers.joinDeck);

  async function onJoinDeck(e: SubmitEvent) {
    e.preventDefault();
    await joinDeck({ username });
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Join this presentation</CardTitle>
            <CardDescription>Fill out your username and become a participant</CardDescription>
            <CardAction className="text-sm text-muted-foreground">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={props.participants.length}
                  className="inline-block font-medium text-foreground"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  {props.participants.length}
                </motion.span>
              </AnimatePresence>{" "}
              online
            </CardAction>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <form id="join-form" onSubmit={onJoinDeck}>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Max"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </form>

            <div className="grid gap-2">
              <Label>In the lobby</Label>
              <ul className="relative flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {props.participants.map((participant) => (
                    <motion.li
                      key={participant.identity.toHexString()}
                      layout
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="rounded-full border bg-secondary px-3 py-1 text-sm"
                    >
                      {participant.name}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </CardContent>

          <CardFooter>
            <motion.div className="w-full" whileTap={{ scale: 0.97 }}>
              <Button type="submit" form="join-form" className="w-full">
                {joinButtonText}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
