import { motion } from 'framer-motion';
import Counter from '../ui/Counter';

const stats = [
  { label: 'Years Experience', value: 5 },
  { label: 'Projects Completed', value: 40 },
  { label: 'Happy Clients', value: 20 },
  { label: 'Tech Stack', value: 15 },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {stats.map((item, i) => (
            <motion.div
              key={item.label}
              className="p-6 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <Counter
                value={item.value}
                className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400"
              />
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
