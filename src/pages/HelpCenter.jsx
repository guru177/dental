import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  CreditCard, 
  Users, 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  X,
  Send,
  LifeBuoy
} from 'lucide-react';
import './HelpCenter.css';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Mock FAQ Data
  const faqs = [
    {
      id: 1,
      question: "How do I reset the daily opening cash balance?",
      answer: "Go to the Transactions module and click on the 'Cash Day Book' tab. In the top right action bar, you will see a 'Reset Opening Balance' button. Enter the new amount and save."
    },
    {
      id: 2,
      question: "Can I hide the financial numbers from the Doctor Dashboard?",
      answer: "Yes. On the Dr Dashboard, click the small 'Eye' icon located on the Billings and Payments summary cards to mask the sensitive financial data."
    },
    {
      id: 3,
      question: "How do I switch the active doctor context?",
      answer: "At the top of the Dr Dashboard, use the dropdown menu next to the greeting 'Hi Dr. [Name]' to select the active doctor. This will instantly filter the queue and financial numbers for that specific doctor."
    },
    {
      id: 4,
      question: "What is the difference between an Expense and a Drawing?",
      answer: "An Expense is a business expenditure (like clinic supplies or salaries). A Drawing is when money is transferred from the business account/cash register for personal use. Drawings do not affect your Net Revenue calculations."
    },
    {
      id: 5,
      question: "How do I filter transactions by a specific bank account?",
      answer: "Navigate to the Bank Deposits tab in the Transactions module. Click the 'Filter' button. You will see a dropdown to select specific bank names (e.g., HDFC, SBI) along with amount range filters."
    }
  ];

  // Quick Guides Data
  const guides = [
    { icon: <Calendar size={24} />, title: "Appointments", desc: "Manage scheduling, check-ins, and tokens.", color: "green" },
    { icon: <CreditCard size={24} />, title: "Billing & Accounts", desc: "Invoicing, cash books, and bank deposits.", color: "purple" },
    { icon: <Users size={24} />, title: "Patient Records", desc: "Charting, histories, and consent forms.", color: "orange" },
    { icon: <Settings size={24} />, title: "Clinic Setup", desc: "Doctor profiles, taxes, and configurations.", color: "blue" }
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return faqs;
    const lowerQ = searchQuery.toLowerCase();
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(lowerQ) || 
      faq.answer.toLowerCase().includes(lowerQ)
    );
  }, [searchQuery, faqs]);

  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  return (
    <div className="help-center-page">
      {/* ─── Hero Section ─── */}
      <div className="hc-hero">
        <div className="hc-hero-content">
          <h1>How can we help you today?</h1>
          <p>Search for guides, FAQs, or contact our support team.</p>
          
          <div className="hc-search-bar">
            <Search size={20} className="hc-search-icon" />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="hc-hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
      </div>

      <div className="hc-main-content">
        {/* ─── Quick Guides Grid ─── */}
        {!searchQuery && (
          <div className="hc-section">
            <h2 className="hc-section-title">Browse Topics</h2>
            <div className="hc-guides-grid">
              {guides.map((guide, idx) => (
                <div key={idx} className="hc-guide-card">
                  <div className={`hc-guide-icon hc-bg-${guide.color}`}>
                    {guide.icon}
                  </div>
                  <h3>{guide.title}</h3>
                  <p>{guide.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── FAQs Section ─── */}
        <div className="hc-section">
          <h2 className="hc-section-title">
            {searchQuery ? `Search Results (${filteredFaqs.length})` : 'Frequently Asked Questions'}
          </h2>
          
          <div className="hc-faq-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map(faq => (
                <div 
                  key={faq.id} 
                  className={`hc-faq-item ${expandedFaq === faq.id ? 'expanded' : ''}`}
                >
                  <button className="hc-faq-question" onClick={() => toggleFaq(faq.id)}>
                    <span>{faq.question}</span>
                    {expandedFaq === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <div className="hc-faq-answer">
                    <div className="hc-faq-answer-inner">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="hc-no-results">
                <LifeBuoy size={48} className="no-res-icon" />
                <p>No results found for "{searchQuery}". Try adjusting your search or contact support.</p>
              </div>
            )}
          </div>
        </div>

        {/* ─── Contact Support CTA ─── */}
        {!searchQuery && (
          <div className="hc-support-cta">
            <div className="cta-icon-wrapper">
              <MessageSquare size={32} />
            </div>
            <div className="cta-content">
              <h3>Still need help?</h3>
              <p>Our technical support team is ready to assist you with any software issues.</p>
            </div>
            <button className="btn-contact-support" onClick={() => setShowSupportModal(true)}>
              Contact Support
            </button>
          </div>
        )}
      </div>

      {/* ─── Support Modal ─── */}
      {showSupportModal && (
        <div className="hc-modal-overlay">
          <div className="hc-modal">
            <div className="hc-modal-header">
              <h2>Submit a Support Request</h2>
              <button className="btn-close-modal" onClick={() => setShowSupportModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="hc-modal-body">
              <p className="hc-modal-desc">Please describe your issue in detail. Our team will get back to you shortly.</p>
              
              <div className="hc-form-group">
                <label>Issue Category</label>
                <div className="select-wrapper">
                  <select>
                    <option value="">Select a category</option>
                    <option value="bug">Software Bug / Error</option>
                    <option value="billing">Billing & Financials</option>
                    <option value="feature">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="sel-icon" size={16} />
                </div>
              </div>
              
              <div className="hc-form-group">
                <label>Description</label>
                <textarea 
                  placeholder="How can we help you?" 
                  rows="5"
                ></textarea>
              </div>
            </div>
            
            <div className="hc-modal-footer">
              <button className="btn-cancel" onClick={() => setShowSupportModal(false)}>Cancel</button>
              <button className="btn-send">
                <Send size={16} />
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;
