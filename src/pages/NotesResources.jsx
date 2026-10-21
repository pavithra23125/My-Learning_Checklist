import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Tag,
  Link as LinkIcon,
  HelpCircle,
  AlertOctagon,
  FileText,
  CheckCircle
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { EmptyState } from '../components/EmptyState';
import { ROADMAP_STAGES } from '../data/roadmapData';

export function NotesResources({ store }) {
  const {
    notes,
    addNote,
    updateNote,
    deleteNote,
    resources,
    addResource,
    updateResource,
    deleteResource,
    projects
  } = store;

  // Active view tab: 'notes' or 'resources'
  const [activeTab, setActiveTab] = useState('notes');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'Notes', 'Interview Questions', 'Mistakes & Learnings'
  const [resourceStatusFilter, setResourceStatusFilter] = useState('all'); // 'all', 'To Learn', 'Learning', 'Completed'

  // Modal states
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [editingResource, setEditingResource] = useState(null);

  // Form states
  const [noteForm, setNoteForm] = useState({
    title: '',
    content: '',
    category: 'Notes',
    linkedTopicId: '',
    linkedProjectId: '',
    tagsString: ''
  });

  const [resourceForm, setResourceForm] = useState({
    title: '',
    url: '',
    description: '',
    status: 'To Learn',
    linkedTopicId: ''
  });

  // Note actions
  const handleOpenCreateNote = () => {
    setEditingNote(null);
    setNoteForm({
      title: '',
      content: '',
      category: 'Notes',
      linkedTopicId: '',
      linkedProjectId: '',
      tagsString: ''
    });
    setIsNoteModalOpen(true);
  };

  const handleOpenEditNote = (note) => {
    setEditingNote(note);
    setNoteForm({
      title: note.title,
      content: note.content,
      category: note.category || 'Notes',
      linkedTopicId: note.linkedTopicId || '',
      linkedProjectId: note.linkedProjectId || '',
      tagsString: (note.tags || []).join(', ')
    });
    setIsNoteModalOpen(true);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!noteForm.title.trim() || !noteForm.content.trim()) return;
    const tags = noteForm.tagsString
      ? noteForm.tagsString.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    if (editingNote) {
      updateNote(editingNote.id, {
        title: noteForm.title.trim(),
        content: noteForm.content.trim(),
        category: noteForm.category,
        linkedTopicId: noteForm.linkedTopicId,
        linkedProjectId: noteForm.linkedProjectId,
        tags
      });
    } else {
      addNote({
        title: noteForm.title.trim(),
        content: noteForm.content.trim(),
        category: noteForm.category,
        linkedTopicId: noteForm.linkedTopicId,
        linkedProjectId: noteForm.linkedProjectId,
        tags
      });
    }
    setIsNoteModalOpen(false);
  };

  // Resource actions
  const handleOpenCreateResource = () => {
    setEditingResource(null);
    setResourceForm({
      title: '',
      url: '',
      description: '',
      status: 'To Learn',
      linkedTopicId: ''
    });
    setIsResourceModalOpen(true);
  };

  const handleOpenEditResource = (res) => {
    setEditingResource(res);
    setResourceForm({
      title: res.title,
      url: res.url,
      description: res.description || '',
      status: res.status || 'To Learn',
      linkedTopicId: res.linkedTopicId || ''
    });
    setIsResourceModalOpen(true);
  };

  const handleSaveResource = (e) => {
    e.preventDefault();
    if (!resourceForm.title.trim() || !resourceForm.url.trim()) return;

    if (editingResource) {
      updateResource(editingResource.id, {
        title: resourceForm.title.trim(),
        url: resourceForm.url.trim(),
        description: resourceForm.description,
        status: resourceForm.status,
        linkedTopicId: resourceForm.linkedTopicId
      });
    } else {
      addResource({
        title: resourceForm.title.trim(),
        url: resourceForm.url.trim(),
        description: resourceForm.description,
        status: resourceForm.status,
        linkedTopicId: resourceForm.linkedTopicId
      });
    }
    setIsResourceModalOpen(false);
  };

  // Filter notes
  const filteredNotes = useMemo(() => {
    return notes.filter(n => {
      if (categoryFilter !== 'all' && n.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = n.title.toLowerCase().includes(q);
        const matchContent = n.content.toLowerCase().includes(q);
        const matchTags = (n.tags || []).some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchContent && !matchTags) return false;
      }
      return true;
    });
  }, [notes, categoryFilter, searchQuery]);

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter(r => {
      if (resourceStatusFilter !== 'all' && r.status !== resourceStatusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = r.title.toLowerCase().includes(q);
        const matchDesc = (r.description || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc) return false;
      }
      return true;
    });
  }, [resources, resourceStatusFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-charcoal-900 dark:text-warm-50 tracking-tight">
            Notes & Curated Resources
          </h1>
          <p className="text-xs md:text-sm text-charcoal-500 dark:text-charcoal-400 mt-0.5">
            Capture study concepts, tricky interview questions, mistakes learned, and essential learning links.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {activeTab === 'notes' ? (
            <button
              onClick={handleOpenCreateNote}
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white bg-forest-800 hover:bg-forest-900 dark:bg-forest-700 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Note</span>
            </button>
          ) : (
            <button
              onClick={handleOpenCreateResource}
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white bg-forest-800 hover:bg-forest-900 dark:bg-forest-700 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Resource</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Switcher: Notes vs Resources */}
      <div className="flex items-center justify-between border-b border-warm-200 dark:border-charcoal-800 pb-2">
        <div className="flex space-x-3">
          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-2 text-xs font-bold transition-colors border-b-2 -mb-2.5 flex items-center space-x-1.5 ${
              activeTab === 'notes'
                ? 'border-forest-700 text-forest-800 dark:border-forest-500 dark:text-forest-300'
                : 'border-transparent text-charcoal-500 hover:text-charcoal-800 dark:hover:text-warm-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Study Notes & Q&A ({notes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`pb-2 text-xs font-bold transition-colors border-b-2 -mb-2.5 flex items-center space-x-1.5 ${
              activeTab === 'resources'
                ? 'border-forest-700 text-forest-800 dark:border-forest-500 dark:text-forest-300'
                : 'border-transparent text-charcoal-500 hover:text-charcoal-800 dark:hover:text-warm-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Reference Resources ({resources.length})</span>
          </button>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'notes' ? "Search notes, code snippets, tags..." : "Search resources, URLs, descriptions..."}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
          />
        </div>

        {activeTab === 'notes' ? (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 font-medium focus:outline-none w-full sm:w-auto"
          >
            <option value="all">All Note Categories</option>
            <option value="Notes">General Notes</option>
            <option value="Interview Questions">Interview Questions</option>
            <option value="Mistakes & Learnings">Mistakes & Learnings</option>
          </select>
        ) : (
          <select
            value={resourceStatusFilter}
            onChange={(e) => setResourceStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 font-medium focus:outline-none w-full sm:w-auto"
          >
            <option value="all">All Statuses</option>
            <option value="To Learn">To Learn</option>
            <option value="Learning">Learning</option>
            <option value="Completed">Completed</option>
          </select>
        )}
      </div>

      {/* Tab 1: Notes List */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.length === 0 ? (
            <div className="col-span-full">
              <EmptyState
                icon={FileText}
                title="No notes found"
                description="Save key programming takeaways, interview questions, or common mistakes."
                actionLabel="Create Your First Note"
                onAction={handleOpenCreateNote}
              />
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant={note.category === 'Interview Questions' ? 'purple' : note.category === 'Mistakes & Learnings' ? 'warning' : 'Roadmap'} size="xs">
                      {note.category}
                    </Badge>
                    <span className="text-[10px] font-mono text-charcoal-400">
                      {note.createdAt ? note.createdAt.split('T')[0] : ''}
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-extrabold text-charcoal-900 dark:text-warm-50 mb-2">
                    {note.title}
                  </h3>

                  <p className="text-xs text-charcoal-600 dark:text-charcoal-300 whitespace-pre-wrap leading-relaxed font-sans bg-warm-50/70 dark:bg-charcoal-850 p-3.5 rounded-xl border border-warm-200/60 dark:border-charcoal-750">
                    {note.content}
                  </p>

                  {/* Tags */}
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {note.tags.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] rounded-md font-mono bg-warm-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-warm-300"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Meta & Actions */}
                <div className="flex items-center justify-between pt-3 mt-4 border-t border-warm-200/60 dark:border-charcoal-800 text-xs">
                  <div className="flex items-center space-x-2 text-charcoal-500">
                    {note.linkedTopicId && (
                      <span className="font-mono text-[10px] bg-warm-100 dark:bg-charcoal-800 px-1.5 py-0.5 rounded">
                        Topic: {note.linkedTopicId}
                      </span>
                    )}
                    {note.linkedProjectId && (
                      <span className="font-mono text-[10px] bg-warm-100 dark:bg-charcoal-800 px-1.5 py-0.5 rounded">
                        Project: {note.linkedProjectId}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEditNote(note)}
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-700 dark:hover:text-warm-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Resources List */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.length === 0 ? (
            <div className="col-span-full">
              <EmptyState
                icon={BookOpen}
                title="No reference resources found"
                description="Save links to official docs, research papers, and curated tutorials."
                actionLabel="Add Reference Resource"
                onAction={handleOpenCreateResource}
              />
            </div>
          ) : (
            filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant={res.status === 'Completed' ? 'success' : res.status === 'Learning' ? 'warning' : 'default'} size="xs">
                      {res.status}
                    </Badge>
                    <span className="text-[10px] font-mono text-charcoal-400">
                      {res.createdAt ? res.createdAt.split('T')[0] : ''}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-charcoal-900 dark:text-warm-50 mb-1">
                    {res.title}
                  </h3>

                  {res.description && (
                    <p className="text-xs text-charcoal-600 dark:text-charcoal-400 mb-3 leading-relaxed">
                      {res.description}
                    </p>
                  )}

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-forest-700 dark:text-forest-400 font-mono font-semibold hover:underline truncate max-w-full"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{res.url}</span>
                  </a>
                </div>

                <div className="flex items-center justify-between pt-3 mt-4 border-t border-warm-200/60 dark:border-charcoal-800">
                  {res.linkedTopicId ? (
                    <span className="font-mono text-[10px] text-charcoal-500">
                      Linked: {res.linkedTopicId}
                    </span>
                  ) : <span />}

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEditResource(res)}
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-700 dark:hover:text-warm-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteResource(res.id)}
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Note Modal */}
      <Modal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        title={editingNote ? "Edit Note" : "Create Study Note"}
      >
        <form onSubmit={handleSaveNote} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={noteForm.title}
              onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
              placeholder="e.g. PyTorch autograd requires_grad mechanics"
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Category
              </label>
              <select
                value={noteForm.category}
                onChange={(e) => setNoteForm({ ...noteForm, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              >
                <option value="Notes">General Notes</option>
                <option value="Interview Questions">Interview Questions</option>
                <option value="Mistakes & Learnings">Mistakes & Learnings</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={noteForm.tagsString}
                onChange={(e) => setNoteForm({ ...noteForm, tagsString: e.target.value })}
                placeholder="pytorch, autograd, tensors"
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Note Content *
            </label>
            <textarea
              rows={4}
              required
              value={noteForm.content}
              onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
              placeholder="Detailed explanation, code syntax, or interview response..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium font-mono"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
            <button
              type="button"
              onClick={() => setIsNoteModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-forest-800 text-white hover:bg-forest-900 dark:bg-forest-700"
            >
              {editingNote ? "Save Changes" : "Create Note"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Resource Modal */}
      <Modal
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
        title={editingResource ? "Edit Resource" : "Add Reference Resource"}
      >
        <form onSubmit={handleSaveResource} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Resource Title *
            </label>
            <input
              type="text"
              required
              value={resourceForm.title}
              onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
              placeholder="e.g. Scikit-learn Pipelines Documentation"
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Resource URL *
            </label>
            <input
              type="url"
              required
              value={resourceForm.url}
              onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })}
              placeholder="https://scikit-learn.org/stable/modules/compose.html"
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Learning Status
              </label>
              <select
                value={resourceForm.status}
                onChange={(e) => setResourceForm({ ...resourceForm, status: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              >
                <option value="To Learn">To Learn</option>
                <option value="Learning">Learning</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Linked Topic ID (Optional)
              </label>
              <input
                type="text"
                value={resourceForm.linkedTopicId}
                onChange={(e) => setResourceForm({ ...resourceForm, linkedTopicId: e.target.value })}
                placeholder="e.g. s6-t16"
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              value={resourceForm.description}
              onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
              placeholder="Why this resource is valuable..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
            <button
              type="button"
              onClick={() => setIsResourceModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-forest-800 text-white hover:bg-forest-900 dark:bg-forest-700"
            >
              {editingResource ? "Save Changes" : "Add Resource"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
