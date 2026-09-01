import React from 'react';
import { motion } from "framer-motion";

const FeatureCard = ({ image, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="rounded-2xl shadow-lg p-6 bg-white/90 backdrop-blur border border-gray-100"
  >
    <div className="flex items-center gap-3 mb-3">
      {image && (
        <img
          src={image}
          alt={title}
          className="h-12 w-12 rounded-lg"
          style={{ objectFit: 'contain' }}
        />
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-700 leading-relaxed">{children}</p>
  </motion.div>
);

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 text-gray-900">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: '#1E90D2' }}
            >
              SLAM
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-700 max-w-xl leading-relaxed mb-6"
            >
              SLAM (Supporting Literacy And Math) provides Kindergarten through Second Grade families with tools and resources to make learning at home fun.
            </motion.p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <div className="flex flex-wrap gap-3">
                <a href="/reading" className="px-4 py-2 rounded-xl shadow text-white hover:opacity-90 transition-opacity" style={{backgroundColor: '#1E90D2'}}>
                  Reading Resources
                </a>
                <a href="/math" className="px-4 py-2 rounded-xl shadow text-white hover:opacity-90 transition-opacity" style={{backgroundColor: '#1E90D2'}}>
                  Math Resources
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/videos" className="px-4 py-2 rounded-xl shadow text-white hover:opacity-90 transition-opacity" style={{backgroundColor: '#F9281B'}}>
                  Explore SLAM Videos
                </a>
                <a href="/podcast" className="px-4 py-2 rounded-xl shadow text-white hover:opacity-90 transition-opacity" style={{backgroundColor: '#0EA5E9'}}>
                  Listen to the Podcast
                </a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <img
              src="/images/SLAM%20Home%20Page%20Photo.with%20Stuffed%20Animalsjpeg.jpeg"
              alt="Children's learning space with books and stuffed animals"
              className="w-full h-[420px] object-cover object-top rounded-3xl shadow-xl border border-gray-200"
            />
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="bg-white/70 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p className="text-center mb-8 max-w-2xl mx-auto text-2xl font-semibold" style={{ color: '#1E90D2' }}>
            At the heart of everything we do at SLAM, we follow three guiding principles which shape the way we support families.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Playful"
              image="/images/kite.svg"
            >
              Children thrive when learning feels like fun rather than work. That's why we have activities and games that spark curiosity, laughter, and joy. When kids are engaged in play, they're more open to practicing skills.
            </FeatureCard>
            <FeatureCard
              title="Research-Based"
              image="/images/science.svg"
            >
              Our ideas are built on years of experience in education, a deep understanding of child development, and practical knowledge of how schools teach reading and math. Everything we share is grounded in trusted, research-based approaches so you can feel reassured that your child is getting meaningful support.
            </FeatureCard>
            <FeatureCard
              title="Accessible"
              image="/images/open_door.svg"
            >
              Parents play the most important role in a child's learning journey. We give you the tools, knowledge, and encouragement you need to feel confident guiding your child. This is why it’s important to us that families will always have access to our programs and materials at no cost. 
            </FeatureCard>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-8">
        © {new Date().getFullYear()} SLAM • Supporting Literacy And Math Learning at Home
      </footer>
    </div>
  );
}

export default Home;
