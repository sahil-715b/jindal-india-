import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter, QrCode, Eye, Edit, X, Calendar, User, Package, DollarSign, FileText, Download, Share2, MoreVertical, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";




const InvoiceCard = ({ invoice, onStatusChange, onViewDetails }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const getStatusConfig = (status) => {
    switch (status) {
      case "draft":
        return {
          class: "bg-gray-100 text-gray-800",
          icon: FileText,
          bgGradient: "from-gray-50 to-gray-100"
        };
      case "created":
        return {
          class: "bg-blue-100 text-blue-800",
          icon: Clock,
          bgGradient: "from-blue-50 to-blue-100"
        };
      case "approved":
        return {
          class: "bg-green-100 text-green-800",
          icon: CheckCircle,
          bgGradient: "from-green-50 to-green-100"
        };
      default:
        return {
          class: "bg-gray-100 text-gray-800",
          icon: FileText,
          bgGradient: "from-gray-50 to-gray-100"
        };
    }
  };

  const statusConfig = getStatusConfig(invoice.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      {/* Status Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${statusConfig.bgGradient} opacity-5 rounded-2xl`}></div>

      <div className="relative p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {invoice.customerName}
              </h3>
              
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{invoice.orderID}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-between items-center mb-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.class}`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{invoice.grandTotal.toLocaleString()}</p>
          </div>
        </div>

        {/* Items Count */}
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Package className="w-4 h-4 mr-2" />
          <span>{invoice.items} items</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
            onClick={() => onStatusChange(invoice)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Change Status
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white rounded-xl"
            onClick={() => navigate('/invoice-details/' + invoice.orderID)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
};


// another model 

const StatusChangeModal = ({ isOpen, onClose, invoice, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState(invoice?.status || 'draft');
  const [note, setNote] = useState('');

  const statusOptions = [
    { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: FileText },
    { value: 'created', label: 'Created', color: 'bg-blue-100 text-blue-800', icon: Clock },
    { value: 'approved', label: 'Approved', color: 'bg-green-100 text-green-800', icon: CheckCircle }
  ];

  const handleSubmit = () => {
    onStatusChange(invoice.orderID, selectedStatus, note);
    setNote('');
    onClose();
  };

  if (!invoice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Invoice Status">
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Invoice Details</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Order ID: {invoice.orderID}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Customer: {invoice.customerName}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Select New Status
          </label>
          <div className="grid grid-cols-1 gap-3">
            {statusOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={option.value}
                  onClick={() => setSelectedStatus(option.value)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
    ${selectedStatus === option.value
                      ? 'border-green-700 ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-green-400 hover:ring-2 hover:ring-green-200'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${option.color}`}>
                      {option.label}
                    </span>
                  </div>
                </div>


              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Add Note (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows={3}
            placeholder="Enter any additional notes..."
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white rounded-xl"
          >
            Update Status
          </Button>
        </div>
      </div>
    </Modal>
  );
};


// const InvoiceDetailsModal = ({ isOpen, onClose, invoice }) => {
//   if (!invoice) return null;

//   const statusConfig = {
//     draft: { color: 'bg-gray-100 text-gray-800', icon: FileText },
//     created: { color: 'bg-blue-100 text-blue-800', icon: Clock },
//     approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle }
//   };

//   const StatusIcon = statusConfig[invoice.status]?.icon || FileText;

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Invoice Details">
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 rounded-2xl">
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{invoice.orderID}</h3>
//             <p className="text-gray-600 dark:text-gray-300">{invoice.customerName}</p>
//           </div>
//           <div className="text-right">
//             <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[invoice.status]?.color}`}>
//               <StatusIcon className="w-4 h-4 mr-2" />
//               {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
//             </div>
//           </div>
//         </div>

//         {/* Details Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
//               <Calendar className="w-5 h-5 text-blue-600" />
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
//                 <p className="font-semibold text-gray-900 dark:text-white">{new Date(invoice.date).toLocaleDateString()}</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
//               <User className="w-5 h-5 text-green-600" />
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Customer</p>
//                 <p className="font-semibold text-gray-900 dark:text-white">{invoice.customerName}</p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
//               <Package className="w-5 h-5 text-orange-600" />
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Items</p>
//                 <p className="font-semibold text-gray-900 dark:text-white">{invoice.items} items</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
//               <DollarSign className="w-5 h-5 text-orange-600" />
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
//                 <p className="font-semibold text-gray-900 dark:text-white text-xl">₹{invoice.grandTotal.toLocaleString()}</p>
//               </div>
//             </div>
//           </div>
//         </div>


//       </div>
//     </Modal>
//   );
// };

const InvoiceDetailsModal = ({ isOpen, onClose, invoice }) => {
  if (!invoice) return null;

  const statusConfig = {
    draft: { color: "bg-gray-100 text-gray-800", icon: FileText },
    created: { color: "bg-blue-100 text-blue-800", icon: Clock },
    approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  };

  const StatusIcon = statusConfig[invoice.status]?.icon || FileText;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invoice Details">
      <div className="w-full max-w-3xl bg-white rounded-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{invoice.orderID}</h3>
            <p className="text-gray-600">{invoice.customerName}</p>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[invoice.status]?.color}`}
          >
            <StatusIcon className="w-4 h-4 mr-2" />
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Date */}
          <div className="flex flex-col border rounded-lg p-4 bg-gray-50">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
              <Calendar className="w-4 h-4 text-orange-500" />
              Date
            </label>
            <span className="text-gray-800 font-semibold">
              {new Date(invoice.date).toLocaleDateString()}
            </span>
          </div>

          {/* Customer */}
          <div className="flex flex-col border rounded-lg p-4 bg-gray-50">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
              <User className="w-4 h-4 text-orange-500" />
              Customer
            </label>
            <span className="text-gray-800 font-semibold">{invoice.customerName}</span>
          </div>

          {/* Items */}
          <div className="flex flex-col border rounded-lg p-4 bg-gray-50">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
              <Package className="w-4 h-4 text-orange-500" />
              Items
            </label>
            <span className="text-gray-800 font-semibold">{invoice.items} items</span>
          </div>

          {/* Amount */}
          <div className="flex flex-col border rounded-lg p-4 bg-gray-50">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
              <DollarSign className="w-4 h-4 text-orange-500" />
              Total Amount
            </label>
            <span className="text-gray-900 font-bold text-lg">
              ₹{invoice.grandTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};



export { Modal, StatusChangeModal, InvoiceDetailsModal, InvoiceCard };


