import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Video, Wand2, Loader2, Upload, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useStore } from '../store/useStore';
import { showToast } from '../js/interactions';

export const AIGeneration: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useStore();
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<'image' | 'video'>('image');
  const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ data: string, mimeType: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setUploadedImage({ data: base64String, mimeType: file.type });
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt && !uploadedImage) return;
    if (!user) {
      showToast("Please login to use AI generation", "error");
      return;
    }

    setStatus('generating');
    setResultUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      if (mode === 'image') {
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image-preview',
          contents: { parts: [{ text: prompt }] },
          config: {
            imageConfig: { aspectRatio: "16:9", imageSize: "1K" }
          }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            setResultUrl(`data:image/png;base64,${base64EncodeString}`);
            setStatus('success');
            return;
          }
        }
        throw new Error("No image generated");
      } else {
        const videoConfig: any = {
          model: 'veo-3.1-fast-generate-preview',
          prompt: prompt,
          config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9'
          }
        };

        if (uploadedImage) {
          videoConfig.image = {
            imageBytes: uploadedImage.data,
            mimeType: uploadedImage.mimeType
          };
        }

        let operation = await ai.models.generateVideos(videoConfig);

        while (!operation.done) {
          await new Promise(resolve => setTimeout(resolve, 10000));
          operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
          const response = await fetch(downloadLink, {
            method: 'GET',
            headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY || '' },
          });
          const blob = await response.blob();
          setResultUrl(URL.createObjectURL(blob));
          setStatus('success');
        } else {
          throw new Error("No video generated");
        }
      }
    } catch (error) {
      console.error("AI Generation error:", error);
      setStatus('error');
      showToast("AI Generation failed. Please try again.", "error");
    }
  };

  return (
    <section className="relative w-full py-32 bg-bg-dark overflow-hidden" id="ai-lab">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-gold-secondary tracking-[0.3em] uppercase mb-6 block border border-gold-primary/20 py-2 px-6 rounded-full inline-block bg-gold-primary/5 backdrop-blur-sm">Experimental Lab</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-6">
            {t('aiGeneration')}
          </h2>
          <p className="text-text-secondary-dark max-w-2xl mx-auto font-light text-lg leading-relaxed">
            Experience the future of creativity. Generate custom images and videos using Google's latest AI models (Nano Banana 2 & Veo).
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto glass-panel rounded-[3rem] p-8 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)] border border-gold-primary/20 relative overflow-hidden backdrop-blur-xl">
          {/* Decorative Corner Gradients */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gold-primary/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Mode Selector */}
          <div className="flex justify-center gap-6 mb-12 relative z-10">
            <button 
              onClick={() => setMode('image')}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-500 uppercase tracking-widest text-sm relative overflow-hidden group btn-ripple ${
                mode === 'image' 
                  ? 'text-bg-dark shadow-[0_0_30px_rgba(201,168,76,0.3)] scale-105' 
                  : 'bg-black/20 text-text-secondary-dark hover:text-gold-primary border border-white/10 hover:border-gold-primary/30'
              }`}
            >
              {mode === 'image' && (
                <div className="absolute inset-0 bg-gradient-to-r from-gold-primary to-gold-secondary transition-transform duration-500" />
              )}
              <div className="relative z-10 flex items-center gap-3">
                <ImageIcon size={20} /> {t('generateImage')}
              </div>
            </button>
            <button 
              onClick={() => setMode('video')}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-500 uppercase tracking-widest text-sm relative overflow-hidden group btn-ripple ${
                mode === 'video' 
                  ? 'text-bg-dark shadow-[0_0_30px_rgba(201,168,76,0.3)] scale-105' 
                  : 'bg-black/20 text-text-secondary-dark hover:text-gold-primary border border-white/10 hover:border-gold-primary/30'
              }`}
            >
              {mode === 'video' && (
                <div className="absolute inset-0 bg-gradient-to-r from-gold-primary to-gold-secondary transition-transform duration-500" />
              )}
              <div className="relative z-10 flex items-center gap-3">
                <Video size={20} /> {t('generateVideo')}
              </div>
            </button>
          </div>

          {/* Input Area */}
          <div className="relative mb-12 z-10">
            {mode === 'video' && (
              <div className="mb-6 flex justify-center">
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 px-6 py-3 bg-black/30 rounded-full border border-white/10 text-text-secondary-dark hover:text-gold-primary hover:border-gold-primary/50 transition-all duration-300 text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] btn-ripple"
                >
                  <Upload size={18} />
                  {uploadedImage ? 'Image Uploaded - Click to Change' : 'Upload Starting Image (Optional)'}
                </button>
              </div>
            )}
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-primary/20 to-gold-secondary/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Describe the ${mode} you want to create...`}
                className="relative w-full bg-black/40 border border-white/10 rounded-3xl p-8 text-white focus:outline-none focus:border-gold-primary transition-all duration-300 resize-none min-h-[160px] font-light text-lg placeholder:text-white/20 focus:shadow-[0_0_30px_rgba(201,168,76,0.1)]"
              />
              <button 
                onClick={handleGenerate}
                disabled={status === 'generating' || (!prompt && !uploadedImage)}
                className="absolute bottom-6 right-6 p-4 bg-gradient-to-r from-gold-primary to-gold-secondary text-bg-dark rounded-2xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_10px_30px_rgba(201,168,76,0.4)] hover:-translate-y-1 btn-ripple"
              >
                {status === 'generating' ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                Generate
              </button>
            </div>
          </div>

          {/* Result Area */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {status === 'generating' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col items-center justify-center py-16 border-t border-white/10"
                >
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-4 border-gold-primary/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-gold-primary border-t-transparent rounded-full animate-spin" />
                    <Wand2 className="absolute inset-0 m-auto text-gold-primary animate-pulse" size={32} />
                  </div>
                  <p className="text-gold-secondary font-mono tracking-[0.2em] uppercase text-sm">
                    {mode === 'video' ? 'Generating Video (This may take a few minutes)...' : 'Generating Image...'}
                  </p>
                </motion.div>
              )}

              {status === 'success' && resultUrl && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="rounded-[2rem] overflow-hidden border border-gold-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {mode === 'image' ? (
                    <img src={resultUrl} alt="Generated AI" className="w-full h-auto object-cover" />
                  ) : (
                    <video src={resultUrl} controls autoPlay loop className="w-full h-auto object-cover" />
                  )}
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-center font-light tracking-wide"
                >
                  An error occurred during generation. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
