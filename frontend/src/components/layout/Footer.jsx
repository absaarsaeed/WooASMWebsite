import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Youtube, MessageCircle } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Products: [
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Changelog', to: '/changelog' },
      { label: 'Roadmap', to: '/roadmap' }
    ],
    Resources: [
      { label: 'Documentation', to: '/docs' },
      { label: 'Blog', to: '/blog' },
      { label: 'Help Center', to: '/docs' },
      { label: 'API Docs', to: '/docs' }
    ],
    Company: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Careers', to: '/about' },
      { label: 'Press Kit', to: '/about' }
    ],
    Legal: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookies' },
      { label: 'GDPR', to: '/gdpr' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: MessageCircle, href: '#', label: 'Discord' }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">WooASM</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              AI Store Manager for WooCommerce
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 WooASM. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              Made with <span className="text-purple-600">💜</span> for WooCommerce store owners
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
