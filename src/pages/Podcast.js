import React from 'react';
import { motion } from 'framer-motion';

const platforms = [
  { name: 'Spotify', detail: 'Listen on Spotify', url: 'https://open.spotify.com/show/0347598USjVejZUHlzQ8Tv' },
  { name: 'YouTube', detail: 'Watch the video podcast', url: 'https://www.youtube.com/@SLAMhomelearning/podcasts' },
  { name: 'Apple Podcasts', detail: 'Listen on Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/from-classroom-to-home/id6801576297' }
];

const episodes = [
  {
    number: '01',
    title: 'Welcome to From Classroom to Home',
    description: 'In this short introductory episode, I share a little about my background, why I created From Classroom to Home, and what listeners can expect from the podcast.'
  },
  {
    number: '02',
    title: "Understanding Your Child's Reading Progress",
    description: "How can you tell whether your child is on track with reading? I talk with Alexandra Needle, a Reading Specialist and Curriculum Designer with McGraw Hill Publishing, about how reading typically develops from kindergarten through second grade.",
    points: [
      'The reading skills children typically develop by the end of each grade',
      'Signs that may prompt a teacher to have concerns about a child\'s progress',
      'Simple activities you can do at home to support reading'
    ]
  }
];

function Podcast() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-gray-900">
      <section className="relative overflow-hidden border-b border-gray-200 bg-white/75">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-sky-600">A SLAM podcast</p>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-6xl">
              From <span className="text-red-600">Classroom</span> to <span className="text-sky-600">Home</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-sky-700 sm:text-xl">
              Learn more about your child&apos;s learning and school experience through conversations with experts.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="flex justify-center md:justify-end">
            <img src="/images/Podcast%20Backpack%20Image.png" alt="Backpack with books and snacks for learning at home" className="h-auto w-full max-w-sm object-contain" />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-12">
          <h2 className="mb-5 text-3xl font-bold text-sky-700">From Classroom to Home</h2>
          <p className="text-lg leading-relaxed text-gray-700">From Classroom to Home is a SLAM podcast for parents of children in kindergarten through second grade.</p>
          <p className="mt-5 text-lg leading-relaxed text-gray-700">In each episode, I talk with an expert guest about an important part of your child&apos;s school experience. Together, we&apos;ll explore what is happening in the classroom and share practical ideas for supporting learning at home.</p>
        </motion.div>

        <div className="mb-12 border-y border-gray-200 py-8">
          <div className="mb-6">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-sky-600">Listen now</p>
            <h2 className="text-3xl font-bold text-gray-900">Find the podcast</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {platforms.map((platform) => (
              <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-sky-300 transition-all cursor-pointer">
                <div><p className="font-bold text-gray-900">{platform.name}</p><p className="text-sm text-gray-600">{platform.detail}</p></div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-sky-600">Episodes</p>
          <h2 className="mb-7 text-3xl font-bold text-gray-900">Conversations to support learning at home</h2>
          <div className="space-y-5">
            {episodes.map((episode) => (
              <motion.article key={episode.number} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }} className="border border-gray-200 bg-white p-6 shadow-md sm:p-8">
                <div className="flex gap-5"><span className="text-3xl font-bold text-sky-600">{episode.number}</span><div><h3 className="mb-3 text-xl font-bold text-gray-900">{episode.title}</h3><p className="leading-relaxed text-gray-700">{episode.description}</p>{episode.points && <ul className="mt-5 space-y-3 text-gray-700">{episode.points.map((point) => <li key={point} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />{point}</li>)}</ul>}</div></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Podcast;