
import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  company: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, position, company }) => (
  <div className="bg-background p-6 rounded-lg border border-border/50 shadow-sm">
    <div className="mb-4">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-500">★</span>
      ))}
    </div>
    <blockquote className="mb-4">
      <p className="text-foreground italic">"{quote}"</p>
    </blockquote>
    <div>
      <p className="font-semibold">{author}</p>
      <p className="text-sm text-muted-foreground">{position}, {company}</p>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "AdeptAI's talent acquisition team delivered outstanding results for our engineering department. They found specialized developers in record time, allowing us to accelerate our product roadmap significantly.",
      author: "Sarah Johnson",
      position: "CTO",
      company: "TechNova Solutions"
    },
    {
      quote: "The quality of candidates provided by AdeptAI has been consistently excellent. Their thorough vetting process saved our HR team countless hours and resulted in hires who make immediate contributions.",
      author: "Michael Chen",
      position: "VP of Engineering",
      company: "DataSphere Inc."
    },
    {
      quote: "When we needed to scale our development team quickly for a major project, AdeptAI came through with qualified professionals who integrated seamlessly with our existing team. Their service was truly exceptional.",
      author: "Jessica Rodriguez",
      position: "Director of IT",
      company: "GlobalFinTech"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
          <p className="text-lg text-muted-foreground">
            Hear what our clients have to say about our IT staffing and talent acquisition services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              company={testimonial.company}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
