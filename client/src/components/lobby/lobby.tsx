import { reducers } from "@/module_bindings";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useReducer } from "spacetimedb/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

export function Lobby() {

    const [username, setUsername] = useState<string>("");
    const joinDeck = useReducer(reducers.joinDeck);



    async function onJoinDeck() {
        await joinDeck({ username: username });
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Join this presentation</CardTitle>
                    <CardDescription>
                        Fill out your username and become a viewer of this presentation
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Join</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Max"
                                    required
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={onJoinDeck}>
                        Join
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}