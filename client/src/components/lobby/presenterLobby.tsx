import type { Participant } from "@/module_bindings/types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useReducer } from "spacetimedb/react";
import { reducers } from "@/module_bindings";
import { QRCodeSVG } from "qrcode.react";

type PresenterLobbyProps = {
  participants: readonly Participant[];
  joinUrl: string;
};

export function PresenterLobby({ joinUrl }: PresenterLobbyProps) {
  const startPresentation = useReducer(reducers.startPresentation);

  async function onStartPresentation() {
    await startPresentation();
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-5xl overflow-hidden p-0">
        <CardContent className="grid p-0 md:min-h-128 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-8 p-8 md:p-12">
            <div className="flex flex-col items-center gap-3 text-center">
              <h1 className="text-3xl font-bold md:text-4xl">Join the Presentation</h1>
              <p className="text-balance text-lg text-muted-foreground">
                Use the link or the QR code to join on your device.
              </p>
            </div>
            <Button type="button" size="lg" onClick={onStartPresentation}>
              Start Presentation
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 bg-muted p-8 md:p-12">
            <div className="w-full max-w-xs rounded-xl bg-white p-4">
              <QRCodeSVG value={joinUrl} size={320} className="h-auto w-full" />
            </div>
            <a
              href={joinUrl}
              target="_blank"
              rel="noreferrer"
              className="break-all text-center text-lg font-medium underline underline-offset-4"
            >
              {joinUrl}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
