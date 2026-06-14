import React, { useEffect } from 'react'

export default function GoogleTranslateWidget() {
  useEffect(() => {
    const existingScript = document.getElementById('google-translate-script');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        const element = document.getElementById('google_translate_element');
        if (element && element.innerHTML === '') {
          new window.google.translate.TranslateElement(
            { 
              pageLanguage: 'en',
              autoDisplay: false 
            },
            'google_translate_element'
          );
        }
      };
    } else if (window.google && window.google.translate) {
      const element = document.getElementById('google_translate_element');
      if (element && element.innerHTML === '') {
        new window.google.translate.TranslateElement(
          { 
            pageLanguage: 'en',
            autoDisplay: false 
          },
          'google_translate_element'
        );
      }
    }
  }, []);

  return (
    <div className="translate-wrapper flex items-center h-full">
      <div id="google_translate_element" className="h-10 flex items-center"></div>
      <style>{`
        /* Hide Google Translate branding */
        .goog-te-banner-frame.skiptranslate, .goog-te-gadget span, .goog-logo-link {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0px !important;
          color: transparent !important;
        }
        .goog-te-gadget .goog-te-combo {
          margin: 0 !important;
          padding: 4px 8px !important;
          border-radius: 8px !important;
          border: 1px solid #e2e8f0 !important;
          background-color: #f8fafc !important;
          font-size: 14px !important;
          color: #475569 !important;
          outline: none !important;
          cursor: pointer !important;
          transition: all 0.2s !important;
        }
        .goog-te-gadget .goog-te-combo:hover {
          border-color: #22c55e !important;
          background-color: #f0fdf4 !important;
        }
        
        /* THE FIX: Constraint the pop-up menu iframe */
        iframe.goog-te-menu-frame {
          max-height: 400px !important;
          overflow-y: auto !important;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
        }

        /* Hide potential double rendering */
        #google_translate_element font {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}
