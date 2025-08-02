// components/QuestionDetail.js
'use client';
import { useState, useEffect } from 'react';
import { Bell, ThumbsUp, ThumbsDown, MessageCircle, Share2, Eye, User, Clock, Tag } from 'lucide-react';

const QuestionDetail = ({ questionId, user, userRole = 'End User', onNavigate }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock question data
  const question = {
    id: questionId || 1,
    title: "Is it good things to use AI for hackathon?",
    description: "I am participating in odoo IN hackathon - 2025. I'm wondering if using AI tools and assistance would be considered fair or if there are any restrictions. What are the best practices when it comes to using AI in competitive programming events?",
    author: "Mitchell Admin",
    authorRole: "Admin",
    timeAgo: "1 second ago",
    tags: ["Technical", "AI"],
    category: "Development",
    status: "Open",
    votes: 5,
    replies: 21,
    views: 156,
    isBookmarked: false
  };

  // Mock replies data
  const replies = [
    {
      id: 1,
      content: "Using AI for hackathons depends on the specific rules of the event. Many modern hackathons actually encourage the use of AI tools as they're becoming part of the standard development workflow. However, you should always check the competition guidelines first.",
      author: "Sarah Developer",
      authorRole: "Support Agent",
      timeAgo: "30 minutes ago",
      votes: 8,
      isAccepted: false
    },
    {
      id: 2,
      content: "I've participated in several hackathons where AI tools were not only allowed but encouraged. The key is to use AI as a tool to enhance your creativity and productivity, not to replace your thinking. Focus on the problem-solving aspect and use AI to implement solutions faster.",
      author: "John Smith",
      authorRole: "End User",
      timeAgo: "1 hour ago",
      votes: 3,
      isAccepted: true
    }
  ];

  const [questionVotes, setQuestionVotes] = useState(question.votes);
  const [replyVotes, setReplyVotes] = useState(
    replies.reduce((acc, reply) => {
      acc[reply.id] = reply.votes;
      return acc;
    }, {})
  );

const handleVote = (type, targetType, targetId = null) => {
  if (targetType === 'question') {
    setQuestionVotes(prev => type === 'up' ? prev + 1 : Math.max(prev - 1, 0));
  } else if (targetType === 'reply' && targetId) {
    setReplyVotes(prev => ({
      ...prev,
      [targetId]: type === 'up'
        ? prev[targetId] + 1
        : Math.max((prev[targetId] || 0) - 1, 0)
    }));
  }
};


  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Reply submitted:', replyText);
      setReplyText('');
      setShowReplyForm(false);
      setIsSubmitting(false);
      alert('Reply posted successfully!');
    }, 1500);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/question/${question.id}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const canCloseQuestion = userRole === 'Admin' || userRole === 'Support Agent' || user === question.author;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              ← Back to Questions
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <Bell size={20} />
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
        {/* Question Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          {/* Question Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                question.status === 'Open' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {question.status}
              </span>
              <span className="text-blue-400 text-sm">{question.category}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Share question"
              >
                <Share2 size={20} />
              </button>
              
              {canCloseQuestion && question.status === 'Open' && (
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
                  Close Question
                </button>
              )}
            </div>
          </div>

          {/* Question Title */}
          <h1 className="text-2xl font-bold text-white mb-4">{question.title}</h1>

          {/* Question Meta */}
          <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{question.author}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                question.authorRole === 'Admin' 
                  ? 'bg-red-100 text-red-800'
                  : question.authorRole === 'Support Agent'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {question.authorRole}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{question.timeAgo}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{question.views} views</span>
            </div>
          </div>

          {/* Question Content */}
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-gray-300 leading-relaxed">{question.description}</p>
          </div>

          {/* Question Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-blue-100 text-sm rounded-full"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          {/* Question Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote('up', 'question')}
                  className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                >
                  <ThumbsUp size={20} />
                </button>
                <span className="text-white font-medium">{questionVotes}</span>
                <button
                  onClick={() => handleVote('down', 'question')}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <ThumbsDown size={20} />
                </button>
              </div>
              
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
                <span>{replies.length} {replies.length === 1 ? 'answer' : 'answers'}</span>
              </button>

            </div>
            
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              {showReplyForm ? 'Cancel' : 'Answer'}
            </button>
          </div>
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Your Answer</h3>
            <form onSubmit={handleReplySubmit}>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={6}
                placeholder="Write your answer here..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-vertical"
                required
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !replyText.trim()}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-500 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Posting...' : 'Post Answer'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Answers Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {replies.length} Answer{replies.length !== 1 ? 's' : ''}
            </h2>
            <div className="text-sm text-gray-400">
              {replies.some(r => r.isAccepted) && (
                <span className="text-green-400">✓ Accepted answer available</span>
              )}
            </div>
          </div>

          {replies.length === 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-blue-800 mb-2">There are no answers yet</p>
              <p className="text-blue-600 text-sm">Be the first to answer this question</p>
            </div>
          ) : (
            replies.map((reply) => (
              <div
                key={reply.id}
                className={`bg-gray-800 border rounded-lg p-6 ${
                  reply.isAccepted ? 'border-green-500 bg-green-900/10' : 'border-gray-700'
                }`}
              >
                {reply.isAccepted && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-green-400 text-sm font-medium">✓ Accepted Answer</span>
                  </div>
                )}

                {/* Reply Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{reply.author}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      reply.authorRole === 'Admin' 
                        ? 'bg-red-100 text-red-800'
                        : reply.authorRole === 'Support Agent'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {reply.authorRole}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{reply.timeAgo}</span>
                  </div>
                </div>

                {/* Reply Content */}
                <div className="prose prose-invert max-w-none mb-4">
                  <p className="text-gray-300 leading-relaxed">{reply.content}</p>
                </div>

                {/* Reply Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVote('up', 'reply', reply.id)}
                      className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                    >
                      <ThumbsUp size={18} />
                    </button>
                    <span className="text-white">{replyVotes[reply.id]}</span>
                    <button
                      onClick={() => handleVote('down', 'reply', reply.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <ThumbsDown size={18} />
                    </button>
                  </div>

                  {(canCloseQuestion || user === question.author) && !reply.isAccepted && (
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
                      Accept Answer
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;