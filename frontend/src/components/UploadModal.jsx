import { useState, useRef, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const CATEGORIES = ['painting', 'photography', 'digital', 'sculpture', 'cinema', 'mixed', 'other'];

export default function UploadModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: '', title: '', category: '', year: '', medium: '', description: '', url: '',
  });
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: false }));
  }

  function handleFileDrop(e) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) { setFile(dropped); setErrors((er) => ({ ...er, media: false })); }
  }

  function handleFileChange(e) {
    const picked = e.target.files[0];
    if (picked) { setFile(picked); setErrors((er) => ({ ...er, media: false })); }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.title.trim()) errs.title = true;
    if (!form.category) errs.category = true;
    if (!file && !form.url.trim()) errs.media = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
      if (file) fd.append('file', file);
      await api.createArtwork(fd);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="bg-[#F5F4EF] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#111]/50 hover:text-[#111] text-2xl leading-none transition-colors z-10"
        >
          &times;
        </button>

        <div className="p-8 md:p-10">
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#888]">Submit</span>
          <h2
            id="modalTitle"
            className="font-serif text-3xl font-light text-[#111] mt-1 mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Share Your Work
          </h2>
          <p className="text-sm text-[#888] mb-7">
            Your art deserves to be seen. Submit it to the ARTHAUS community.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Field label="Your Name" error={errors.name}>
                <input
                  type="text"
                  placeholder="Full name or artist alias"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={inputCls(errors.name)}
                  required
                />
              </Field>
              <Field label="Title of Work" error={errors.title}>
                <input
                  type="text"
                  placeholder="Untitled"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  className={inputCls(errors.title)}
                  required
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Field label="Category" error={errors.category}>
                <select
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  className={inputCls(errors.category)}
                  required
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1).replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Year Created">
                <input
                  type="number"
                  placeholder="2024"
                  min="1900"
                  max="2099"
                  value={form.year}
                  onChange={(e) => set('year', e.target.value)}
                  className={inputCls(false)}
                />
              </Field>
            </div>

            <div className="mb-4">
              <Field label="Medium">
                <input
                  type="text"
                  placeholder="e.g. Oil on canvas, Digital photography, 4K film"
                  value={form.medium}
                  onChange={(e) => set('medium', e.target.value)}
                  className={inputCls(false)}
                />
              </Field>
            </div>

            {/* File upload */}
            <div className="mb-4">
              <label className="block text-xs font-medium tracking-wide text-[#111] mb-1.5">
                Upload File or Image URL
              </label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border rounded-sm p-6 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                  dragging
                    ? 'border-[#111] bg-[#111]/5'
                    : errors.media
                    ? 'border-red-500 bg-red-50'
                    : 'border-[#111]/20 hover:border-[#111]/50'
                }`}
              >
                <span className="text-2xl text-[#888]">+</span>
                <span className="text-sm text-[#888]">Click to upload or drag &amp; drop</span>
                <span className="text-xs text-[#888]/60">JPG, PNG, GIF, MP4, MOV — up to 200 MB</span>
                {file && (
                  <span className="text-xs text-[#111] mt-1 font-medium">{file.name}</span>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex items-center gap-3 my-3">
                <div className="flex-1 h-px bg-[#111]/10" />
                <span className="text-xs text-[#888]">or</span>
                <div className="flex-1 h-px bg-[#111]/10" />
              </div>

              <input
                type="url"
                placeholder="Paste a direct URL to your work"
                value={form.url}
                onChange={(e) => { set('url', e.target.value); setErrors((er) => ({ ...er, media: false })); }}
                className={inputCls(errors.media)}
              />
            </div>

            <div className="mb-6">
              <Field label="Description" optional>
                <textarea
                  rows={3}
                  placeholder="Tell us about your work — inspiration, process, materials..."
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  className={`${inputCls(false)} resize-none`}
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#111] text-[#F5F4EF] text-sm font-medium tracking-wide rounded-sm hover:bg-[#333] disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Submitting…' : 'Submit Work →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function inputCls(hasError) {
  return `w-full px-3 py-2.5 bg-white border rounded-sm text-sm text-[#111] placeholder-[#888] focus:outline-none focus:border-[#111] transition-colors ${
    hasError ? 'border-red-500' : 'border-[#111]/20'
  }`;
}

function Field({ label, children, error, optional }) {
  return (
    <div>
      <label className="block text-xs font-medium tracking-wide text-[#111] mb-1.5">
        {label}
        {optional && <span className="text-[#888] font-normal ml-1">(optional)</span>}
        {error && <span className="text-red-500 font-normal ml-1">Required</span>}
      </label>
      {children}
    </div>
  );
}
