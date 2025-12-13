import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Layers, Zap, Code, Terminal, Cpu, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const apps = [
  {
    title: "AI Chat Assistant",
    description: "A smart conversational agent powered by advanced LLMs.",
    icon: <Terminal className="h-6 w-6 text-primary" />,
    tags: ["AI", "React", "Node.js"],
    link: "#"
  },
  {
    title: "Project Nexus",
    description: "Collaborative project management tool for remote teams.",
    icon: <Layers className="h-6 w-6 text-blue-400" />,
    tags: ["Productivity", "SaaS", "Real-time"],
    link: "#"
  },
  {
    title: "DevDash",
    description: "All-in-one dashboard for monitoring server health and metrics.",
    icon: <Cpu className="h-6 w-6 text-green-400" />,
    tags: ["DevOps", "Dashboard", "Monitoring"],
    link: "#"
  },
  {
    title: "CodeSnippet",
    description: "Share and discover beautiful code snippets instantly.",
    icon: <Code className="h-6 w-6 text-purple-400" />,
    tags: ["Social", "Developer", "Utility"],
    link: "#"
  },
  {
    title: "CryptoWatch",
    description: "Real-time cryptocurrency tracker and portfolio manager.",
    icon: <Zap className="h-6 w-6 text-yellow-400" />,
    tags: ["Finance", "API", "Charts"],
    link: "#"
  },
  {
    title: "Global Atlas",
    description: "Interactive 3D globe with demographic data visualization.",
    icon: <Globe className="h-6 w-6 text-cyan-400" />,
    tags: ["Visualization", "3D", "Education"],
    link: "#"
  }
];

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
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">About</Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">Contact</Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/50 text-primary bg-primary/10">
              v2.0 Now Available
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/80 to-white/60 pb-2">
              Build. Ship. Scale.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              A collection of cutting-edge applications and experiments. 
              Exploring the boundaries of modern web development and design.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base">
                Explore Apps
              </Button>
              <Button size="lg" variant="secondary" className="h-12 px-8 text-base">
                View Source
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* Apps Grid */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Applications</h2>
              <p className="text-muted-foreground">Projects that I've been working on recently.</p>
            </div>
            <Button variant="ghost" className="gap-2">
              View All <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {apps.map((app, index) => (
              <motion.div key={index} variants={item}>
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-3 rounded-xl bg-background border border-border/50 group-hover:scale-110 transition-transform duration-300">
                        {app.icon}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-xl">{app.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {app.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-background/50">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 JoshHub. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
