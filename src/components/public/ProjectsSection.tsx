import React, { useState } from 'react';
import { SHOWCASE_PROJECTS } from '../../data/mockData';
import { ProjectShowcase } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Camera, 
  Upload, 
  RotateCcw,
  Check
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { openQuoteForService, showcaseProjects, updateProjectCover } = useApp();
  const [activeProject, setActiveProject] = useState<ProjectShowcase | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [uploadSuccessId, setUploadSuccessId] = useState<string | null>(null);

  const categories = ['Tous', 'Application web & mobile', 'Site e-commerce', 'Site institutionnel', 'Site vitrine'];

  const filteredProjects = selectedCategory === 'Tous'
    ? showcaseProjects
    : showcaseProjects.filter(p => p.category === selectedCategory);

  const handleImageUpload = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateProjectCover(projectId, result);
        setUploadSuccessId(projectId);
        setTimeout(() => setUploadSuccessId(null), 3000);

        if (activeProject && activeProject.id === projectId) {
          setActiveProject(prev => prev ? { ...prev, image: result } : null);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = (projectId: string) => {
    const defaultProj = SHOWCASE_PROJECTS.find(p => p.id === projectId);
    if (defaultProj) {
      updateProjectCover(projectId, defaultProj.image);
      if (activeProject && activeProject.id === projectId) {
        setActiveProject(prev => prev ? { ...prev, image: defaultProj.image } : null);
      }
    }
  };

  return (
    <section id="realisations" className="py-16 sm:py-20 bg-[#0B0F0E] border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#00A651]" />
              <span>PROJETS CONCRETS & CLIENTS SATISFAITS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Nos réalisations sur mesure au Sénégal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Découvrez les solutions numériques concrètes développées pour nos clients : gestion agricole, FinTech de paiement fractionné, portail de daayira, événementiel et boutique e-commerce.
            </p>
          </div>

          <button
            onClick={() => openQuoteForService()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-[#00A651] text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <span>Commander un projet similaire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => {
            const count = cat === 'Tous' 
              ? showcaseProjects.length 
              : showcaseProjects.filter(p => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-[#00A651] text-white shadow-md shadow-emerald-500/20'
                    : 'bg-[#121916] text-slate-400 hover:text-white hover:bg-[#182622] border border-emerald-950/80'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-emerald-950/60 text-emerald-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const isCustomPhoto = proj.image.startsWith('data:');

            return (
              <div
                key={proj.id}
                className="bg-[#121916] border border-emerald-950/80 hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,166,81,0.15)] flex flex-col group relative"
              >
                {/* Image preview with full photo visibility (uncropped) */}
                <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-[#070c09] border-b border-emerald-950/60 flex items-center justify-center p-2">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/85 backdrop-blur-md text-emerald-400 border border-emerald-500/40 shadow-xs">
                      {proj.category}
                    </span>
                  </div>

                  {/* Photo Customization Action Button */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <label 
                      title="Mettre votre photo exacte sans retouche"
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/85 hover:bg-[#00A651] text-white border border-emerald-500/40 cursor-pointer flex items-center gap-1 shadow-md transition-all backdrop-blur-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {uploadSuccessId === proj.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-300" />
                          <span>Photo appliquée !</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-3 h-3 text-emerald-400" />
                          <span>{isCustomPhoto ? 'Photo active' : 'Mettre ma photo'}</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(proj.id, e)}
                      />
                    </label>

                    {isCustomPhoto && (
                      <button
                        title="Rétablir l'image par défaut"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetImage(proj.id);
                        }}
                        className="p-1 rounded-full bg-black/80 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-700 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Tagline overlay on bottom */}
                  {proj.tagline && (
                    <div className="absolute bottom-2 left-3 right-3 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-emerald-950/80">
                      <p className="text-[10px] sm:text-[11px] font-bold text-emerald-300 truncate">
                        {proj.tagline}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                        {proj.title}
                      </h3>
                    </div>

                    <p className="text-[11px] text-emerald-500 font-semibold mb-2">
                      Client : {proj.client}
                    </p>

                    {/* Metrics Badge */}
                    {proj.metrics && (
                      <div className="p-2 rounded-xl bg-[#0b1411] border border-emerald-900/40 text-[11px] text-slate-300 font-medium mb-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A651] shrink-0" />
                        <span className="truncate">{proj.metrics}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Tech Pills & Button */}
                  <div className="pt-3 border-t border-emerald-950/60 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#0a110e] border border-emerald-950 text-slate-400">
                          {t}
                        </span>
                      ))}
                      {proj.technologies.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md text-emerald-500 font-bold">
                          +{proj.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setActiveProject(proj)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#172520] hover:bg-[#00A651] text-emerald-400 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Voir la fiche complète & maquette</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#121c18] border border-emerald-800/60 rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl relative my-6 text-white max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Media Banner with 100% full photo visibility */}
            <div className="rounded-2xl overflow-hidden mb-4 border border-emerald-900/60 bg-[#060a08] flex flex-col">
              <div className="w-full max-h-80 sm:max-h-96 flex items-center justify-center p-3 bg-black">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="max-h-76 sm:max-h-88 max-w-full object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-[#0d1613] border-t border-emerald-950/80">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00A651] text-white">
                    {activeProject.category}
                  </span>
                  <span className="text-[11px] text-slate-400">Photo originale complète</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                  {activeProject.title}
                </h3>
                {activeProject.tagline && (
                  <p className="text-xs text-emerald-300 font-bold mt-0.5">
                    {activeProject.tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Photo Uploader Banner in Modal */}
            <div className="mb-5 p-3 sm:p-3.5 rounded-2xl bg-[#09110e] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-[#00A651] shrink-0">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Photo de couverture originale</p>
                  <p className="text-[10px] text-slate-400">Mettez directement votre photo sans aucune retouche ni compression</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white text-xs font-bold cursor-pointer transition-all shadow-xs shrink-0">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Choisir ma photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload(activeProject.id, e)}
                  />
                </label>

                {activeProject.image.startsWith('data:') && (
                  <button
                    onClick={() => handleResetImage(activeProject.id)}
                    className="px-2.5 py-1.5 rounded-xl bg-[#172520] hover:bg-red-950 text-slate-300 hover:text-red-300 text-xs font-bold border border-emerald-900/40 cursor-pointer transition-colors"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            </div>

            {/* Client & Key Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#09110e] border border-emerald-900/40 mb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Client / Bénéficiaire</p>
                <p className="text-xs font-bold text-white mt-0.5">{activeProject.client}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Impact & Chiffres clés</p>
                <p className="text-xs font-bold text-emerald-400 mt-0.5">{activeProject.metrics || 'Projet en exploitation active'}</p>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                Présentation du projet
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Highlights List if available */}
            {activeProject.highlights && activeProject.highlights.length > 0 && (
              <div className="mb-5 p-4 rounded-2xl bg-[#0e1714] border border-emerald-950">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A651]" />
                  <span>Fonctionnalités clés intégrées (Cahier des charges)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-[#00A651] font-bold shrink-0 mt-0.5">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-6">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Technologies & Architecture :</p>
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#0e1613] border border-emerald-900/60 text-slate-300 text-xs font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-emerald-950">
              <button
                onClick={() => setActiveProject(null)}
                className="py-3 px-5 rounded-xl bg-[#172520] hover:bg-[#20332c] text-slate-300 hover:text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Fermer
              </button>
              
              <button
                onClick={() => {
                  setActiveProject(null);
                  openQuoteForService(activeProject.title);
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Commander un projet similaire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
