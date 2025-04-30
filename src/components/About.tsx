
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Adept AI</h2>
            <p className="text-lg mb-4 text-muted-foreground">
              Founded in 2021, Adept AI is a pioneering technology company at the forefront of artificial intelligence innovation. 
              Our mission is to make advanced AI technology accessible and practical for businesses of all sizes.
            </p>
            <p className="text-lg mb-6 text-muted-foreground">
              With a team of world-class AI researchers and engineers from leading technology companies and academic institutions,
              we're building the next generation of intelligent systems that augment human capabilities rather than replace them.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <p className="text-sm text-muted-foreground mt-1">AI Experts</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">100+</div>
                <p className="text-sm text-muted-foreground mt-1">Enterprise Clients</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">15+</div>
                <p className="text-sm text-muted-foreground mt-1">Countries Served</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">$30M+</div>
                <p className="text-sm text-muted-foreground mt-1">in Funding</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden shadow-lg">
              <div className="absolute inset-6 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <span className="text-2xl font-bold gradient-text">Adept AI</span>
              </div>
              <div className="absolute top-4 right-4 h-24 w-24 rounded-full bg-accent/30 blur-2xl"></div>
              <div className="absolute bottom-4 left-4 h-32 w-32 rounded-full bg-primary/30 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
