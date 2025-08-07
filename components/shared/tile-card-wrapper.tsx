import { ReactNode } from "react";
import { Card } from "../ui/card";

export default function TileCardWrapper({ children }: { children: ReactNode }) {
  return (
    <Card className="overflow-hidden shadow-lg rounded-xl border-0">
      {children}
    </Card>
  );
}
