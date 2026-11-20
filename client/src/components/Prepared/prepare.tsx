import { useReducer } from "spacetimedb/react";
import { Button } from "../ui/button";
import { reducers } from "@/module_bindings";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export function Prepare() {

    const claimPersentation = useReducer(reducers.claimDeck);

    async function onClaimDeck() {
        await claimPersentation();
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Become the presenter</CardTitle>
                    <CardDescription>
                        This deck has no presenter yet, claim the role and lead the presentation
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Claim</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={onClaimDeck}>
                        Claim
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
