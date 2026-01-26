import { Dog } from "lucide-react";

const Index = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/50 px-6">
      <div className="max-w-3xl text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
          <Dog className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
          Dog Walking <span className="text-primary">News</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Votre source d'actualités et de conseils pour les promenades canines. 
          Restez informé, gardez votre compagnon heureux.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:opacity-90 transition-opacity shadow-lg">
            Découvrir
          </button>
          <button className="px-8 py-4 bg-card text-foreground border border-border rounded-lg font-medium text-lg hover:bg-secondary transition-colors">
            En savoir plus
          </button>
        </div>
      </div>
    </section>
  );
};

export default Index;
