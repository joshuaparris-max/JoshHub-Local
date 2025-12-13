import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Layers, Zap, Code, Terminal, Cpu, Globe, Menu, AlertTriangle, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { App } from "@shared/schema";
import { getCachedApps, setCachedApps, isCacheStale, getCacheAgeString } from "@/lib/cache";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal,
  Layers,
  Cpu,
  Code,
  Zap,
  Globe,
};

const iconColors: Record<string, string> = {
  Terminal: "text-primary",
  Layers: "text-blue-400",
  Cpu: "text-green-400",
  Code: "text-purple-400",
  Zap: "text-yellow-400",
  Globe: "text-cyan-400",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [usingCache, setUsingCache] = useState(false);
  const [cacheAge, setCacheAge] = useState<string | null>(null);

  const { data: apps = [], isLoading, error, refetch } = useQuery<App[]>({
    queryKey: ["apps"],
    queryFn: async () => {
      const response = await fetch("/api/apps");
      if (!response.ok) {
        throw new Error("Failed to fetch apps");
      }
      const data = await response.json();
      setCachedApps(data);
      setUsingCache(false);
      return data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (error) {
      const cached = getCachedApps();
      if (cached && cached.length > 0) {
        setUsingCache(true);
        setCacheAge(getCacheAgeString());
      }
    }
  }, [error]);

  const displayApps = usingCache ? getCachedApps() || [] : apps;
  const activeApps = displayApps.filter(app => app.status === "active");
  const needsAttentionApps = displayApps.filter(app => app.status !== "active");

  return (
    <div className="min-h-screen font-sans text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Code className="h-5 w-5" />
            </div>
            <span>JoshHub</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" size="sm" data-testid="button-about">About</Button>
            <Button variant="ghost" size="sm" data-testid="button-contact">Contact</Button>
            <Button size="sm" variant="outline" className="gap-2" data-testid="button-github">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-2">
                     <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                      <Code className="h-5 w-5" />
                    </div>
                    JoshHub
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <Button variant="ghost" className="justify-start text-lg" onClick={() => setIsOpen(false)} data-testid="button-home-mobile">
                    Home
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg" onClick={() => setIsOpen(false)} data-testid="button-about-mobile">
                    About
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg" onClick={() => setIsOpen(false)} data-testid="button-contact-mobile">
                    Contact
                  </Button>
                  <div className="h-px bg-border/50 my-2" />
                  <Button variant="outline" className="justify-start gap-2" onClick={() => setIsOpen(false)} data-testid="button-github-mobile">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Status Banners */}
      {usingCache && (
        <div className="bg-yellow-500/20 border-b border-yellow-500/50 px-6 py-3">
          <div className="container mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-yellow-200">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Data currently unavailable. Showing cached data from {cacheAge}.</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => refetch()} className="text-yellow-200">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      )}

      {isCacheStale() && !usingCache && (
        <div className="bg-blue-500/20 border-b border-blue-500/50 px-6 py-2">
          <div className="container mx-auto text-center text-blue-200 text-sm">
            Data may be stale. Last updated {getCacheAgeString()}.
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/50 text-primary bg-primary/10" data-testid="badge-version">
              v2.0 Now Available
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/80 to-white/60 pb-2 leading-tight" data-testid="text-hero-title">
              Build. Ship. Scale.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto px-4" data-testid="text-hero-description">
              A collection of cutting-edge applications and experiments. 
              Exploring the boundaries of modern web development.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button size="lg" className="h-12 px-8 text-base w-full sm:w-auto" data-testid="button-explore">
                Explore Apps
              </Button>
              <Button size="lg" variant="secondary" className="h-12 px-8 text-base w-full sm:w-auto" data-testid="button-source">
                View Source
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[400px] bg-primary/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* Needs Attention Section */}
      {needsAttentionApps.length > 0 && (
        <section className="py-8 bg-destructive/10 border-y border-destructive/30">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h2 className="text-xl font-bold text-destructive" data-testid="text-needs-attention-title">Needs Attention</h2>
              <Badge variant="destructive" className="ml-2">{needsAttentionApps.length}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {needsAttentionApps.map((app) => {
                const IconComponent = iconMap[app.icon] || Code;
                return (
                  <Card key={app.id} className="border-destructive/30 bg-destructive/5" data-testid={`card-attention-${app.id}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-destructive/20">
                          <IconComponent className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{app.title}</CardTitle>
                          <Badge variant="destructive" className="mt-1 text-xs">{app.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    {app.notes && (
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">{app.notes}</p>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Apps Grid */}
      <section className="py-16 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2" data-testid="text-section-title">Featured Applications</h2>
              <p className="text-muted-foreground text-sm md:text-base" data-testid="text-section-subtitle">Projects that I've been working on recently.</p>
            </div>
            <Button variant="ghost" className="gap-2 self-start sm:self-auto pl-0 sm:pl-4" data-testid="button-view-all">
              View All <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          {isLoading && !usingCache && (
            <div className="text-center py-12" data-testid="text-loading">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading apps...</p>
            </div>
          )}

          {error && !usingCache && getCachedApps()?.length === 0 && (
            <div className="text-center py-12" data-testid="text-error">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <p className="text-destructive mb-4">Failed to load apps. Please try again later.</p>
              <Button onClick={() => refetch()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          )}

          {((!isLoading && !error) || usingCache) && activeApps.length > 0 && (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeApps.map((app) => {
                const IconComponent = iconMap[app.icon] || Code;
                return (
                  <motion.div key={app.id} variants={item}>
                    <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group active:scale-[0.98] md:active:scale-100" data-testid={`card-app-${app.id}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <div className="p-3 rounded-xl bg-background border border-border/50 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className={`h-6 w-6 ${iconColors[app.icon] || 'text-primary'}`} />
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" data-testid={`button-link-${app.id}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardTitle className="text-xl" data-testid={`text-title-${app.id}`}>{app.title}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-2" data-testid={`text-description-${app.id}`}>{app.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {app.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs font-normal" data-testid={`badge-tag-${tag.toLowerCase()}`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {((!isLoading && !error) || usingCache) && displayApps.length === 0 && (
            <div className="text-center py-12" data-testid="text-empty">
              <p className="text-muted-foreground">No apps found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-background/50">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p data-testid="text-copyright">© 2024 JoshHub. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-4 text-sm">
            <a href="#" className="hover:text-primary transition-colors py-2 sm:py-0" data-testid="link-privacy">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors py-2 sm:py-0" data-testid="link-terms">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors py-2 sm:py-0" data-testid="link-twitter">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
