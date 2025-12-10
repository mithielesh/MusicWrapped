import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const Steps = () => {
  return (
    <div className="border-t border-neutral-800 pt-8">
      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6">
        Instructions
      </h3>
      
      <ul className="space-y-6">
        
        {/* Step 1 */}
        <li className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center text-xs font-mono">1</span>
          <div className="space-y-1">
            <p className="text-neutral-300 font-medium">Request Data from Google</p>
            <a 
              href="https://takeout.google.com/settings/takeout" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400 transition-colors"
            >
              Open Google Takeout <ExternalLink size={12} />
            </a>
          </div>
        </li>

        {/* Step 2 */}
        <li className="flex items-start gap-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center text-xs font-mono">2</span>
            <div className="space-y-1">
                <p className="text-neutral-300 font-medium">Select "YouTube"</p>
                <p className="text-sm text-neutral-500">
                Google bundles Music history inside standard YouTube data.
                <br />
                </p>
            </div>
        </li>

        {/* Step 3 */}
        <li className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center text-xs font-mono">3</span>
          <div className="space-y-1">
            <p className="text-neutral-300 font-medium">Select JSON Format</p>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <span>Click "Multiple Formats"</span>
              <ArrowRight size={12} />
              <span className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-xs">History: JSON</span>
            </div>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default Steps;