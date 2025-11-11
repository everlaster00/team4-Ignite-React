import React from 'react';
const IgniteFont = ({ children }) => <span className="text-amber-400">{children}</span>;

export default function IgFooter() {
  const footerLinks = [
    { title: 'Everlaster', href: '/products/Everlaster' },
    { title: 'LogicNotFound404', href: '/products/LogicNotFound404' },
    { title: 'ajea', href: '/products/ajea' },
    { title: 'luke', href: '/products/luke' },
    { title: 'nicecoco', href: '/products/nicecoco' },
  ];

  return (
    <footer className="z-index-50 w-full bg-gray-900 text-gray-300 border-t-4 border-amber-600 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-start">
          
          <div className="flex flex-col items-center sm:items-start space-y-2">
              
            <p className="flex items-center text-base font-light tracking-wide text-gray-400">
              <image 
                src="https://raw.githubusercontent.com/everlaster00/team-4-landing/main/images/LogoIcon.webp" 
                alt="Team Ignite Logo" 
                className="max-w-[30px] h-auto mr-2"
              />
              &copy; 2025 
              <IgniteFont>
                <span className='font-extrabold text-amber-400 ml-1'>
                  TEAM IGNITE
                </span>
              </IgniteFont>
            </p>

            <p className="text-base text-gray-500 font-medium">
              Background Images Credit:
              <span className="text-gray-400 ml-1">
                Designed by 
                <a 
                  href="http://www.freepik.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-amber-500 hover:text-amber-400 underline transition duration-200 ml-1"
                  title="Freepik 웹사이트로 이동"
                >
                  Freepik
                </a>
              </span>
            </p>
          </div>

          <nav className="mt-4 sm:mt-0">
            <ul className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-3 text-lg">
              {footerLinks.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-amber-500 transition duration-200 font-medium"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
