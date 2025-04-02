import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

export function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Info className="h-4 w-4" />
          <span>About</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>About StumpVizz</DialogTitle>
          <DialogDescription>
            A modern cricket streaming platform
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <h4 className="font-medium">About the Developer</h4>
            <p className="text-sm text-muted-foreground">
              StumpVizz is developed with passion by a cricket enthusiast who wanted
              to create a modern platform for cricket lovers to watch and follow their
              favorite sport.
            </p>
            <p className="text-sm text-muted-foreground">
              The platform is built using modern web technologies including React,
              TypeScript, and Tailwind CSS.
            </p>
            <p className="text-sm text-muted-foreground">
            Code, commits, and cricket. Find it all on{" "}
              <a
                href="https://github.com/swgtds"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}