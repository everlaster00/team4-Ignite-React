import React from 'react';
const IgniteFont = ({ children }) => <span className="text-amber-400">{children}</span>;

export default function IgFooter() {
  return (
    <footer className="z-index-50 w-full bg-gray-900 text-gray-300 border-t-4 border-amber-600 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-3">
        
        <p className="text-sm font-light tracking-wide">
          &copy; COPYRIGHT 2025 
          <IgniteFont>
            <span className='font-extrabold text-amber-400 ml-2'>
              TEAM IGNITE
            </span>
          </IgniteFont>
        </p>

        <p className="text-xs text-gray-500 font-medium">
          Background Images Credit:
          <span className="text-gray-400 ml-2">
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
    </footer>
  );
}