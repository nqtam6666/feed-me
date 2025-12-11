import React, { useState } from 'react';
import { UserProfile, DEFAULT_PROFILE } from '../types';
import { encodeProfileData } from '../utils';
import { ViewProfile } from './ViewProfile';
import { ProfileEditor } from '../components/ProfileEditor';
import { Wand2, X } from 'lucide-react';

export const CreateProfile: React.FC = () => {
  const [formData, setFormData] = useState<UserProfile>(DEFAULT_PROFILE);
  const [shareLink, setShareLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateLink = () => {
    const encoded = encodeProfileData(formData);
    const url = `${window.location.origin}${window.location.pathname}#/view?data=${encoded}`;
    setShareLink(url);
    setIsCopied(false);
  };

  const copyLink = () => {
    if(!shareLink) return;
    navigator.clipboard.writeText(shareLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  const previewInNewTab = () => {
     if(shareLink) {
         window.open(shareLink, '_blank');
     } else {
        const encoded = encodeProfileData(formData);
        const url = `${window.location.origin}${window.location.pathname}#/view?data=${encoded}`;
        window.open(url, '_blank');
     }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto items-start relative">
      
      {/* Desktop Editor - Sidebar (Hidden on mobile) */}
      <div className="hidden lg:block w-1/3 glass-panel p-6 rounded-2xl sticky top-8 max-h-[90vh] overflow-y-auto">
        <ProfileEditor 
            formData={formData} 
            onChange={handleInputChange} 
            onGenerate={handleGenerateLink}
            shareLink={shareLink}
            isCopied={isCopied}
            onCopy={copyLink}
            onPreview={previewInNewTab}
        />
      </div>

      {/* Mobile FAB (Visible only on mobile) */}
      <button 
        onClick={() => setIsMobileModalOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-accent text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-bounce"
        aria-label="Chỉnh sửa thông tin"
        style={{ animationDuration: '2s' }}
      >
        <Wand2 size={28} />
      </button>

      {/* Mobile Modal */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white/95 backdrop-blur-md w-full h-[85vh] sm:h-auto sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-[slideUp_0.3s_ease-out]">
             
             {/* Modal Header */}
             <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/50">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Wand2 size={18} className="text-primary"/> Chỉnh sửa thông tin
                </h3>
                <button 
                    onClick={() => setIsMobileModalOpen(false)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
                >
                    <X size={20} />
                </button>
             </div>

             {/* Modal Content */}
             <div className="p-6 overflow-y-auto flex-1 pb-20 sm:pb-6">
                <ProfileEditor 
                    formData={formData} 
                    onChange={handleInputChange} 
                    onGenerate={handleGenerateLink}
                    shareLink={shareLink}
                    isCopied={isCopied}
                    onCopy={copyLink}
                    onPreview={previewInNewTab}
                />
             </div>
          </div>
        </div>
      )}

      {/* Preview Column */}
      <div className="w-full lg:w-2/3 mx-auto">
         {/* Mobile view now has full width preview */}
         <div className="opacity-100 transition-opacity duration-500 pb-24 lg:pb-0">
            <ViewProfile data={formData} isPreview={true} />
         </div>
      </div>

      {/* Inline styles for custom animations if not in Tailwind config */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};