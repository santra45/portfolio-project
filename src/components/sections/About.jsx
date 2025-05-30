import { motion } from 'framer-motion';
import { CodeBracketIcon, CpuChipIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

const skills = [
  { name: 'Web Development', icon: CodeBracketIcon, percentage: 90 },
  { name: 'UI/UX Design', icon: CpuChipIcon, percentage: 85 },
  { name: 'Mobile Development', icon: DevicePhoneMobileIcon, percentage: 80 },
];

const experience = [
  {
    role: 'Senior Frontend Developer',
    company: 'Tech Corp',
    period: '2020 - Present',
    description: 'Leading the frontend development team and implementing modern web technologies.'
  },
  {
    role: 'Frontend Developer',
    company: 'Web Solutions Inc',
    period: '2018 - 2020',
    description: 'Developed responsive web applications using React and modern JavaScript.'
  },
  {
    role: 'Junior Developer',
    company: 'Digital Creations',
    period: '2016 - 2018',
    description: 'Worked on various web projects and honed my development skills.'
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80" 
                alt="Profile" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 rounded-full -z-10 opacity-20" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500 rounded-full -z-10 opacity-20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Who am I?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I'm a passionate Full Stack Developer with over 5 years of experience in creating
              beautiful, functional, and user-friendly web applications. I specialize in modern
              JavaScript frameworks and have a keen eye for design and user experience.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to
              open-source projects, or enjoying outdoor activities. I believe in continuous learning
              and always strive to improve my skills.
            </p>
            
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-sm font-medium text-gray-500">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <motion.div 
                      className="bg-gradient-to-r from-primary-500 to-primary-700 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-12">My Experience</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2" />
            
            {experience.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  className={`relative mb-12 flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 ${isEven ? 'md:mr-6' : 'md:ml-6'}`}>
                      <span className="text-sm text-primary-500 font-medium">{item.period}</span>
                      <h4 className="text-xl font-bold mt-1">{item.role}</h4>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{item.company}</p>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 border-4 border-white dark:border-gray-900 z-10">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                  </div>
                  
                  {/* Empty div for spacing on the other side */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
