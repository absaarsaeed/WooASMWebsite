import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Loader2,
  Eye,
  Send,
  X,
  User,
  Calendar,
  FileText
} from 'lucide-react';
import api from '../../services/api';

// Email template labels
const templateLabels = {
  welcome: 'Welcome',
  email_verification: 'Email Verification',
  password_reset: 'Password Reset',
  license_activated: 'License Activated',
  license_deactivated: 'License Deactivated',
  license_regenerated: 'License Regenerated',
  license_expiry_warning: 'Expiry Warning',
  license_expired: 'License Expired',
  site_limit_warning: 'Site Limit Warning',
  subscription_confirmed: 'Subscription Confirmed',
  subscription_cancelled: 'Subscription Cancelled',
  payment_receipt: 'Payment Receipt',
  payment_failed: 'Payment Failed',
  usage_warning: 'Usage Warning',
  usage_limit_reached: 'Limit Reached',
  admin_notification: 'Admin Notification'
};

// Status icons and colors
const statusConfig = {
  sent: { icon: CheckCircle, color: 'text-emerald-400', bgColor: 'bg-emerald-900/20', label: 'Sent' },
  pending: { icon: Clock, color: 'text-amber-400', bgColor: 'bg-amber-900/20', label: 'Pending' },
  failed: { icon: XCircle, color: 'text-red-400', bgColor: 'bg-red-900/20', label: 'Failed' },
  queued: { icon: Clock, color: 'text-blue-400', bgColor: 'bg-blue-900/20', label: 'Queued' }
};

// Template category colors
const templateColors = {
  welcome: 'bg-purple-500',
  email_verification: 'bg-blue-500',
  password_reset: 'bg-amber-500',
  license_activated: 'bg-emerald-500',
  license_deactivated: 'bg-gray-500',
  license_regenerated: 'bg-cyan-500',
  license_expiry_warning: 'bg-orange-500',
  license_expired: 'bg-red-500',
  site_limit_warning: 'bg-yellow-500',
  subscription_confirmed: 'bg-green-500',
  subscription_cancelled: 'bg-rose-500',
  payment_receipt: 'bg-emerald-600',
  payment_failed: 'bg-red-600',
  usage_warning: 'bg-orange-400',
  usage_limit_reached: 'bg-red-400',
  admin_notification: 'bg-indigo-500'
};

const AdminEmails = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [resending, setResending] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    sent: 0,
    failed: 0,
    pending: 0
  });

  useEffect(() => {
    fetchEmails();
  }, [statusFilter, templateFilter]);

  const fetchEmails = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { limit: 100 };
      if (statusFilter !== 'all') params.status = statusFilter;
      if (templateFilter !== 'all') params.template = templateFilter;
      
      const response = await api.getAdminEmails(params);
      
      if (response.success && response.data) {
        setEmails(response.data);
        // Calculate stats
        const allEmails = response.data;
        setStats({
          total: allEmails.length,
          sent: allEmails.filter(e => e.status === 'sent').length,
          failed: allEmails.filter(e => e.status === 'failed').length,
          pending: allEmails.filter(e => e.status === 'pending' || e.status === 'queued').length
        });
      } else {
        // Use empty array if no data
        setEmails([]);
      }
    } catch (err) {
      setError('Failed to load emails');
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (emailId) => {
    setResending(emailId);
    setError('');
    
    try {
      const response = await api.resendAdminEmail(emailId);
      
      if (response.success) {
        setSuccessMessage('Email resent successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchEmails();
      } else {
        setError(response.message || 'Failed to resend email');
      }
    } catch (err) {
      setError('Failed to resend email');
    } finally {
      setResending(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter emails by search term
  const filteredEmails = emails.filter(email => {
    const matchesSearch = 
      email.to?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get unique templates from emails
  const availableTemplates = [...new Set(emails.map(e => e.template))].filter(Boolean);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Email Logs</h1>
          <p className="text-gray-400 mt-1">Monitor sent emails and delivery status</p>
        </div>
        <button
          onClick={fetchEmails}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Total Emails</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.sent}</p>
              <p className="text-sm text-gray-400">Sent</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.failed}</p>
              <p className="text-sm text-gray-400">Failed</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
              <p className="text-sm text-gray-400">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-400 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-900/20 border border-emerald-800 rounded-xl text-emerald-400 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          {successMessage}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by email or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="sent">Sent</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={templateFilter}
          onChange={(e) => setTemplateFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">All Templates</option>
          {availableTemplates.map(template => (
            <option key={template} value={template}>
              {templateLabels[template] || template}
            </option>
          ))}
        </select>
      </div>

      {/* Email Table */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Recipient</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Subject</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Template</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Sent At</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredEmails.map((email) => {
              const status = statusConfig[email.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              
              return (
                <tr key={email.id || email._id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-white">{email.to}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 truncate max-w-xs block">{email.subject}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs text-white ${templateColors[email.template] || 'bg-gray-600'}`}>
                      {templateLabels[email.template] || email.template}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${status.bgColor}`}>
                      <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
                      <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">{formatDate(email.sentAt || email.createdAt)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedEmail(email)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                      {email.status === 'failed' && (
                        <button
                          onClick={() => handleResend(email.id || email._id)}
                          disabled={resending === (email.id || email._id)}
                          className="p-2 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
                          title="Resend"
                        >
                          {resending === (email.id || email._id) ? (
                            <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4 text-purple-400 hover:text-purple-300" />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredEmails.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No emails found</p>
            <p className="text-sm mt-1">Emails will appear here when sent</p>
          </div>
        )}
      </div>

      {/* Email Detail Modal */}
      {selectedEmail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEmail(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Email Details</h2>
              <button
                onClick={() => setSelectedEmail(null)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">To</label>
                  <p className="text-white">{selectedEmail.to}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Status</label>
                  <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${statusConfig[selectedEmail.status]?.bgColor || 'bg-gray-700'}`}>
                    {React.createElement(statusConfig[selectedEmail.status]?.icon || Clock, {
                      className: `w-3.5 h-3.5 ${statusConfig[selectedEmail.status]?.color || 'text-gray-400'}`
                    })}
                    <span className={`text-xs font-medium ${statusConfig[selectedEmail.status]?.color || 'text-gray-400'}`}>
                      {statusConfig[selectedEmail.status]?.label || selectedEmail.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Subject</label>
                <p className="text-white">{selectedEmail.subject}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Template</label>
                  <span className={`px-2 py-1 rounded text-xs text-white ${templateColors[selectedEmail.template] || 'bg-gray-600'}`}>
                    {templateLabels[selectedEmail.template] || selectedEmail.template}
                  </span>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Sent At</label>
                  <p className="text-white">{formatDate(selectedEmail.sentAt || selectedEmail.createdAt)}</p>
                </div>
              </div>

              {selectedEmail.error && (
                <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                  <label className="block text-sm text-red-400 mb-1">Error</label>
                  <p className="text-red-300 text-sm">{selectedEmail.error}</p>
                </div>
              )}

              {selectedEmail.metadata && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Metadata</label>
                  <pre className="text-sm text-gray-300 bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    {JSON.stringify(selectedEmail.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-700">
              {selectedEmail.status === 'failed' && (
                <button
                  onClick={() => {
                    handleResend(selectedEmail.id || selectedEmail._id);
                    setSelectedEmail(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Resend Email
                </button>
              )}
              <button
                onClick={() => setSelectedEmail(null)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminEmails;
