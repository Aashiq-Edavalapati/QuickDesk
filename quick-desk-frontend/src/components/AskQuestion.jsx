// components/AskQuestion.js
'use client';
import { useState } from 'react';
import { Bell, X, Plus } from 'lucide-react';

const AskQuestion = ({ user, onNavigate }) => {
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    tags: []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suggestedTags = ['Technical', 'AI', 'Development', 'React', 'Next.js', 'JavaScript', 'Python', 'Web Development', 'Database', 'API'];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput.trim());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Question submitted:', formData);
      alert('Question posted successfully!');
      setIsSubmitting(false);
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Ask Your Question</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Dashboard
            </button>
            
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-green-600 rounded-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question Field */}
            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                Question *
              </label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Enter your question title..."
                className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-300 transition-colors"
                required
              />
              <p className="text-green-100 text-sm mt-2">
                Be specific and clear about what you're asking
              </p>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={8}
                placeholder="Provide detailed information about your question..."
                className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-300 transition-colors resize-vertical"
                required
              />
              <p className="text-green-100 text-sm mt-2">
                Include all relevant details, code examples, and what you've tried
              </p>
            </div>

            {/* Tags Field */}
            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                Tags
              </label>
              
              {/* Selected Tags */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-white text-green-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              {/* Tag Input */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  placeholder="Add a tag..."
                  className="flex-1 px-4 py-2 bg-white border-2 border-transparent rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-300 transition-colors"
                  maxLength={20}
                />
                <button
                  type="button"
                  onClick={() => addTag(tagInput.trim())}
                  disabled={!tagInput.trim() || formData.tags.length >= 5}
                  className="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              {/* Suggested Tags */}
              <div>
                <p className="text-green-100 text-sm mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags
                    .filter(tag => !formData.tags.includes(tag))
                    .slice(0, 8)
                    .map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        disabled={formData.tags.length >= 5}
                        className="px-3 py-1 bg-green-500 hover:bg-green-400 text-white rounded-full text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {tag}
                      </button>
                    ))}
                </div>
              </div>
              
              <p className="text-green-100 text-sm mt-2">
                Add up to 5 tags to help others find your question ({formData.tags.length}/5)
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !formData.question.trim() || !formData.description.trim()}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Posting...' : 'Post Question'}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Tips for asking a great question:</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Be specific and clear in your question title</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Provide context and background information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Include relevant code examples or error messages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Mention what you've already tried</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Use appropriate tags to categorize your question</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;