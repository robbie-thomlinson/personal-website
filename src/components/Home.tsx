import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect } from "react";
import { GitHubInsights } from "./GitHubInsights";
import { Section } from "./Section";
import { Button } from "./ui/button";

export function Home() {
  useEffect(() => {
    document.title = "Robbie Thomlinson - Software Engineer";
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Hi, I'm Robbie Thomlinson
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          I'm a software engineer with a passion for creating high quality,
          efficient applications.
        </p>
        <Section title="Connect">
          <div className="flex justify-center gap-4">
            <Button variant="ghost" asChild>
              <a href="mailto:rthomlinson03@gmail.com" aria-label="Email me">
                <Mail className="size-5" />
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a
                href="http://www.linkedin.com/in/robbie-thomlinson-264610260"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a
                href="https://github.com/robbie-thomlinson"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub"
              >
                <Github className="size-5" />
              </a>
            </Button>
          </div>
        </Section>
        <Section title="GitHub">
          <GitHubInsights />
        </Section>
      </div>
    </main>
  );
}
