'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Send, MessageSquare, BarChart3, Upload, ArrowRight, Phone } from 'lucide-react';
import { submissionSchema } from '@/lib/validation';
import { ZodError, z } from 'zod';

type FormData = z.infer<typeof submissionSchema> & { phone: string };

interface SubmissionType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SubmissionForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    type: '' as any,
    email: '',
    phone: '',
    subject: '',
    description: '',
    attachments: [],
  });

  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const submissionTypes: SubmissionType[] = [
    { id: 'proposal', label: 'Project Proposal', icon: FileText },
    { id: 'report', label: 'Progress Report', icon: BarChart3 },
    { id: 'request', label: 'Formal Request', icon: Send },
    { id: 'complaint', label: 'Complaint/Feedback', icon: MessageSquare },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // reset errors

    try {
      submissionSchema.parse(formData); // validate
      sessionStorage.setItem('submissionData', JSON.stringify(formData));
      router.push('/verify');
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        const flattened = err.flatten().fieldErrors;
        if (flattened && typeof flattened === 'object') {
          Object.entries(flattened).forEach(([key, msgs]) => {
            if (Array.isArray(msgs) && msgs.length > 0) {
              fieldErrors[key as keyof FormData] = msgs[0];
            }
          });
        }
        setErrors(fieldErrors);
      }
    }
  };

  // Single file upload handler
  const handleFileChange = (file: File | null) => {
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only PDF, DOCX, JPEG, PNG allowed.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      alert('File too large. Max size is 25MB.');
      return;
    }

    setFormData(prev => ({
      ...prev,
      attachments: [file], // single file
    }));
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      attachments: [],
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-stone-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 px-5 py-4">
        <h2 className="font-display text-lg font-semibold text-white">New Submission</h2>
        <p className="text-emerald-200 text-sm">Fill in the details to start</p>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        {/* Submission Type */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">
            Submission Type <span className="text-orange-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {submissionTypes.map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() =>
                  setFormData(prev => ({
                    ...prev,
                    type: prev.type === type.id ? '' : (type.id as any), // toggle
                  }))
                }
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-left ${
                  formData.type === type.id
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-stone-200 hover:border-stone-300 text-stone-600'
                }`}
              >
                <type.icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium">{type.label}</span>
              </button>
            ))}
          </div>
          {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-1">
            Contact Email <span className="text-orange-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-stone-800 placeholder-stone-400 text-sm"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-stone-700 mb-1">
            Phone Number <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full pl-10 px-3 py-2 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-stone-800 placeholder-stone-400 text-sm"
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-stone-700 mb-1">
            Subject <span className="text-orange-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Brief title for your submission"
            value={formData.subject}
            onChange={e => setFormData({ ...formData, subject: e.target.value })}
            required
            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-stone-800 placeholder-stone-400 text-sm"
          />
          {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-stone-700 mb-1">
            Description <span className="text-orange-500">*</span>
          </label>
          <textarea
            id="description"
            placeholder="Provide details about your submission (max 5000 characters)"
            maxLength={5000}
            rows={4}
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-stone-800 placeholder-stone-400 resize-none text-sm"
          />
          {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1">Attachment</label>
          <div
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files.length > 0) handleFileChange(e.dataTransfer.files[0]);
            }}
            className={`border-2 border-dashed rounded-lg p-3 text-center transition-all cursor-pointer ${
              dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-stone-300 hover:border-stone-400'
            }`}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <Upload className="w-5 h-5 text-stone-400 mx-auto mb-1" />
            <p className="text-xs text-stone-600">
              <span className="text-emerald-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-stone-400">PDF, DOCX, JPEG, PNG up to 25MB</p>
          </div>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={e => e.target.files && handleFileChange(e.target.files[0])}
            accept=".pdf,.docx,.jpeg,.jpg,.png"
          />

          {formData.attachments && formData.attachments.length > 0 && (
            <div className="mt-2 flex items-center justify-between bg-stone-100 px-3 py-1 rounded">
              <span className="text-sm text-stone-700 truncate">{formData.attachments[0].name}</span>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-500 font-bold ml-2 hover:text-red-700"
              >
                X
              </button>
            </div>
          )}
          {errors.attachments && <p className="text-xs text-red-500 mt-1">{errors.attachments}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 text-sm"
        >
          Submit to NDDC
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-xs text-center text-stone-500">
          By submitting, you agree to our{' '}
          <a href="#" className="text-emerald-600 hover:underline">Terms</a>
          {' '}&{' '}
          <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>
        </p>
      </form>
    </div>
  );
};

export default SubmissionForm;
