import { motion } from 'framer-motion';
import { EnvelopeIcon, CodeBracketIcon, HeartIcon } from '@heroicons/react/24/outline';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/santra45', icon: CodeBracketIcon },
  { name: 'Email', href: 'mailto:your.email@example.com', icon: EnvelopeIcon },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <motion.div
            className="flex items-center space-x-2 mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gray-600 dark:text-gray-400">
              © {currentYear} All Rights Reserved
            </span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span>Made with</span>
            <HeartIcon className="h-5 w-5 text-red-500" />
            <span>by Santra</span>
          </motion.div>
          
          <motion.div 
            className="flex space-x-4 mt-6 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                aria-label={item.name}
              >
                <item.icon className="h-6 w-6" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
