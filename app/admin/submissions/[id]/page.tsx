'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { 
  ArrowLeft,
  FileText,
  Download,
  Mail,
  MessageSquare,
  Clock,
  User,
  Phone,
  Calendar,
  Paperclip,
  Send,
  AlertCircle,
  CheckCircle,
  X,
  ChevronDown,
  History,
  Edit2,
  Flag,
  Forward,
  Eye
} from 'lucide-react';
import { mockSubmissions } from '@/lib/admin-mock-data';
import { statusOptions, priorityOptions, typeOptions, departments } from '@/lib/admin-types';

interface PageProps {
  params: { id: string };
}

export default function SubmissionDetailPage({ params }: PageProps) {
  const router = useRouter();
  const submission = mockSubmissions.find(s => s.id === params.id);
  
  const [activeTab, setActiveTab] = useState<'details' | 'notes' | 'responses' | 'history'>('details');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);

  // Form states
  const [newStatus, setNewStatus] = useState(submission?.status || '');
  const [newPriority, setNewPriority] = useState(submission?.priority || '');
  const [forwardData, setForwardData] = useState({
    department: '',
    email: '',
    cc: '',
    message: '',
    includeAttachments: true
  });
  const [noteContent, setNoteContent] = useState('');
  const [notePrivate, setNotePrivate] = useState(false);
  const [responseData, setResponseData] = useState({
    type: 'holding' as 'holding' | 'detailed' | 'final',
    content: '',
    sendVia: 'both' as 'email' | 'portal' | 'both'
  });

  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-stone-800">Submission Not Found</h2>
          <p className="text-stone-500 mt-2">The submission you're looking for doesn't exist.</p>
          <Link href="/admin/submissions" className="mt-4 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="w-4 h-4" />
            Back to Submissions
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => statusOptions.find(s => s.value === status)?.color || 'bg-stone-100 text-stone-800';
  const getPriorityColor = (priority: string) => priorityOptions.find(p => p.value === priority)?.color || 'bg-stone-100 text-stone-800';
  const getTypeLabel = (type: string) => typeOptions.find(t => t.value === type)?.label || type;

  const handleStatusChange = () => { console.log('Status changed to:', newStatus); setShowStatusModal(false); };
  const handlePriorityChange = () => { console.log('Priority changed to:', newPriority); setShowPriorityModal(false); };
  const handleForward = () => { console.log('Forwarding to:', forwardData); setShowForwardModal(false); setForwardData({ department: '', email: '', cc: '', message: '', includeAttachments: true }); };
  const handleAddNote = () => { console.log('Adding note:', noteContent, 'Private:', notePrivate); setShowNoteModal(false); setNoteContent(''); setNotePrivate(false); };
  const handleSendResponse = () => { console.log('Sending response:', responseData); setShowResponseModal(false); setResponseData({ type: 'holding', content: '', sendVia: 'both' }); };

  return (
    <div className="min-h-screen pb-8">
      <AdminHeader title={submission.trackingId} subtitle={submission.subject} />

      <div className="p-6">
        <Link href="/admin/submissions" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Submissions
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4">
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setShowStatusModal(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium">
                  <Edit2 className="w-4 h-4" /> Change Status
                </button>
                <button onClick={() => setShowPriorityModal(true)} className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium">
                  <Flag className="w-4 h-4" /> Set Priority
                </button>
                <button onClick={() => setShowForwardModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  <Forward className="w-4 h-4" /> Forward to Department
                </button>
                <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                  <MessageSquare className="w-4 h-4" /> Add Note
                </button>
                <button onClick={() => setShowResponseModal(true)} className="flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 rounded-lg hover:bg-cyan-100 transition-colors text-sm font-medium">
                  <Send className="w-4 h-4" /> Send Response
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-stone-200">
                {[
                  { id: 'details', label: 'Details', icon: FileText },
                  { id: 'notes', label: 'Internal Notes', icon: MessageSquare, count: submission.internalNotes.length },
                  { id: 'responses', label: 'Responses', icon: Send, count: submission.responses.length },
                  { id: 'history', label: 'Activity Log', icon: History, count: submission.activityLog.length }
                ].map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-emerald-700 border-b-2 border-emerald-700 bg-emerald-50/50' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'}`}>
                    <tab.icon className="w-4 h-4" /> {tab.label}
                    {tab.count !== undefined && tab.count > 0 && <span className="ml-1 px-2 py-0.5 bg-stone-200 text-stone-600 text-xs rounded-full">{tab.count}</span>}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Details Tab */}
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">Submission Content</h3>
                      <div className="prose prose-stone max-w-none">
                        <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">{submission.description}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">Attachments ({submission.attachments.length})</h3>
                      <div className="grid gap-3">
                        {submission.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-lg border border-stone-200 flex items-center justify-center">
                                <Paperclip className="w-5 h-5 text-stone-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-stone-800">{attachment.name}</p>
                                <p className="text-xs text-stone-500">{attachment.size}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-stone-400 hover:text-stone-600 hover:bg-white rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-stone-400 hover:text-emerald-600 hover:bg-white rounded-lg transition-colors">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes Tab */}
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    {submission.internalNotes.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                        <p className="text-stone-500">No internal notes yet</p>
                        <button onClick={() => setShowNoteModal(true)} className="mt-3 text-emerald-600 hover:text-emerald-700 text-sm font-medium">Add the first note</button>
                      </div>
                    ) : (
                      submission.internalNotes.map((note) => (
                        <div key={note.id} className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold text-emerald-700">{note.authorName.split(' ').map(n => n[0]).join('')}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-stone-800">{note.authorName}</p>
                                <p className="text-xs text-stone-500">{new Date(note.createdAt).toLocaleString()}</p>
                              </div>
                            </div>
                            {note.isPrivate && <span className="text-xs bg-stone-200 text-stone-600 px-2 py-0.5 rounded">Private</span>}
                          </div>
                          <p className="text-stone-700 text-sm">{note.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Responses Tab */}
                {activeTab === 'responses' && (
                  <div className="space-y-4">
                    {submission.responses.length === 0 ? (
                      <div className="text-center py-8">
                        <Send className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                        <p className="text-stone-500">No responses sent yet</p>
                        <button onClick={() => setShowResponseModal(true)} className="mt-3 text-emerald-600 hover:text-emerald-700 text-sm font-medium">Send a response</button>
                      </div>
                    ) : (
                      submission.responses.map((response) => (
                        <div key={response.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${response.type === 'holding' ? 'bg-amber-100 text-amber-700' : response.type === 'detailed' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {response.type.charAt(0).toUpperCase() + response.type.slice(1)} Response
                              </span>
                              <span className="text-xs text-stone-500">via {response.sentVia}</span>
                            </div>
                            <p className="text-xs text-stone-500">{new Date(response.sentAt).toLocaleString()}</p>
                          </div>
                          <p className="text-stone-700 text-sm whitespace-pre-wrap">{response.content}</p>
                          <p className="text-xs text-stone-500 mt-2">— {response.authorName}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <div className="space-y-0">
                    {submission.activityLog.map((log, index) => (
                      <div key={log.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${log.action === 'created' ? 'bg-blue-500' : log.action === 'status_changed' ? 'bg-emerald-500' : log.action === 'forwarded' ? 'bg-cyan-500' : log.action === 'priority_changed' ? 'bg-orange-500' : log.action === 'response_sent' ? 'bg-purple-500' : 'bg-stone-400'}`} />
                          {index < submission.activityLog.length - 1 && <div className="w-0.5 h-full bg-stone-200 my-1" />}
                        </div>
                        <div className="pb-6 flex-1">
                          <p className="text-sm text-stone-800">{log.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-stone-500">{log.userName}</span>
                            <span className="text-stone-300">•</span>
                            <span className="text-xs text-stone-400">{new Date(log.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Priority Card */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-stone-800 mb-4">Status & Priority</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-stone-500 mb-1">Current Status</p>
                  <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(submission.status)}`}>
                    {statusOptions.find(s => s.value === submission.status)?.label}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-1">Priority</p>
                  <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium border ${getPriorityColor(submission.priority)}`}>
                    {submission.priority.charAt(0).toUpperCase() + submission.priority.slice(1)}
                  </span>
                </div>
                {submission.assignedDepartment && (
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Assigned To</p>
                    <p className="text-sm font-medium text-stone-800">{submission.assignedDepartment}</p>
                    {submission.assignedTo && <p className="text-xs text-stone-500">{submission.assignedTo}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Submitter Info */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-stone-800 mb-4">Submitter Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-stone-400" />
                  <span className="text-sm text-stone-700">{submission.submitterName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-stone-400" />
                  <a href={`mailto:${submission.submitterEmail}`} className="text-sm text-emerald-600 hover:underline">{submission.submitterEmail}</a>
                </div>
                {submission.submitterPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-stone-400" />
                    <span className="text-sm text-stone-700">{submission.submitterPhone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Change Status</h3>
            <select className="w-full border border-stone-300 rounded-lg p-2 mb-4" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300" onClick={() => setShowStatusModal(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700" onClick={handleStatusChange}>Save</button>
            </div>
          </div>
        </div>
      )}

      {showPriorityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Set Priority</h3>
            <select className="w-full border border-stone-300 rounded-lg p-2 mb-4" value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
              {priorityOptions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300" onClick={() => setShowPriorityModal(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700" onClick={handlePriorityChange}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Forward Modal */}
      {showForwardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Forward to Department</h3>
            <select className="w-full border border-stone-300 rounded-lg p-2 mb-2" value={forwardData.department} onChange={(e) => setForwardData({...forwardData, department: e.target.value})}>
              <option value="">Select Department</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <input type="email" placeholder="Email" className="w-full border border-stone-300 rounded-lg p-2 mb-2" value={forwardData.email} onChange={(e) => setForwardData({...forwardData, email: e.target.value})} />
            <input type="email" placeholder="CC" className="w-full border border-stone-300 rounded-lg p-2 mb-2" value={forwardData.cc} onChange={(e) => setForwardData({...forwardData, cc: e.target.value})} />
            <textarea placeholder="Message" className="w-full border border-stone-300 rounded-lg p-2 mb-2" value={forwardData.message} onChange={(e) => setForwardData({...forwardData, message: e.target.value})} />
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" checked={forwardData.includeAttachments} onChange={(e) => setForwardData({...forwardData, includeAttachments: e.target.checked})} />
              <label className="text-sm text-stone-700">Include Attachments</label>
            </div>
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300" onClick={() => setShowForwardModal(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700" onClick={handleForward}>Forward</button>
            </div>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Add Note</h3>
            <textarea className="w-full border border-stone-300 rounded-lg p-2 mb-2" placeholder="Write note..." value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" checked={notePrivate} onChange={(e) => setNotePrivate(e.target.checked)} />
              <label className="text-sm text-stone-700">Private Note</label>
            </div>
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300" onClick={() => setShowNoteModal(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700" onClick={handleAddNote}>Add Note</button>
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showResponseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Send Response</h3>
            <select className="w-full border border-stone-300 rounded-lg p-2 mb-2" value={responseData.type} onChange={(e) => setResponseData({...responseData, type: e.target.value as 'holding' | 'detailed' | 'final'})}>
              <option value="holding">Holding Response</option>
              <option value="detailed">Detailed Response</option>
              <option value="final">Final Response</option>
            </select>
            <textarea className="w-full border border-stone-300 rounded-lg p-2 mb-2" placeholder="Write response..." value={responseData.content} onChange={(e) => setResponseData({...responseData, content: e.target.value})} />
            <select className="w-full border border-stone-300 rounded-lg p-2 mb-4" value={responseData.sendVia} onChange={(e) => setResponseData({...responseData, sendVia: e.target.value as 'email' | 'portal' | 'both'})}>
              <option value="both">Send via Email & Portal</option>
              <option value="email">Email Only</option>
              <option value="portal">Portal Only</option>
            </select>
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300" onClick={() => setShowResponseModal(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700" onClick={handleSendResponse}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
