import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Upload, Brain, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-background">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/10" />

      <main className="container relative z-10 flex max-w-4xl flex-col items-center justify-center gap-10 px-4 py-16 text-center md:py-24">
        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
          <Brain size={12} />
          <span>AI Agent for Medical Analysis</span>
        </div>

        <div className="space-y-8">
          <h1 className="font-serif text-4xl font-light tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Dish{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Agent
            </span>
          </h1>
          <p className="mx-auto max-w-lg text-lg text-muted-foreground md:text-xl">
            AI-powered medical image analysis with intelligent agents. Upload, analyze, and get insights instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm">
            <Upload className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Upload Images</h3>
            <p className="text-sm text-muted-foreground">Securely upload medical images for analysis</p>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm">
            <Brain className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">Advanced ML models process your images</p>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm">
            <Shield className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Secure Results</h3>
            <p className="text-sm text-muted-foreground">Get detailed insights and recommendations</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="group">
            <span>Start Analysis</span>
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button variant="outline" size="lg" className="backdrop-blur-sm">
            View Sandbox
          </Button>
        </div>
      </main>
    </div>
  );
}
