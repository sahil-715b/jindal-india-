import { useState ,useRef} from "react";
import { Button } from "@/components/ui/button";
import { Upload, Cloud, HardDrive, Search, Plus, Filter, QrCode, Eye, Edit, X, Calendar, User, Package, DollarSign, FileText, Download, Share2, MoreVertical, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Uploading from '../components/ui/Uploading'
// Enhanced Modal Components
import { Modal, StatusChangeModal, InvoiceDetailsModal , InvoiceCard} from "@/components/ui/InvoiceModals";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";




// Enhanced InvoiceCard Component
// Main Component
const Invoices = () => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [invoices, setInvoices] = useState([
    {
      orderID: "ORD-2024-001",
      customerName: "Tech Solutions Ltd",
      items: 15,
      grandTotal: 125000,
      status: "approved",
      date: "2024-01-15",
      
    },
    {
      orderID: "ORD-2024-002",
      customerName: "Global Distributors",
      items: 8,
      grandTotal: 75000,
      status: "created",
      date: "2024-01-16",
      
    },
    {
      orderID: "ORD-2024-003",
      customerName: "Metro Electronics",
      items: 22,
      grandTotal: 198000,
      status: "draft",
      date: "2024-01-17",
      
    },
    {
      orderID: "ORD-2024-004",
      customerName: "Retail Plus Inc",
      items: 12,
      grandTotal: 89000,
      status: "approved",
      date: "2024-01-18",
      
    },
    {
      orderID: "ORD-2024-005",
      customerName: "Smart Store Chain",
      items: 30,
      grandTotal: 245000,
      status: "created",
      date: "2024-01-19",
      
    },
    {
      orderID: "ORD-2024-006",
      customerName: "Digital World",
      items: 6,
      grandTotal: 42000,
      status: "draft",
      date: "2024-01-20",
      
    }
  ]);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderID.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || invoice.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (invoice) => {
    setSelectedInvoice(invoice);
    setShowStatusModal(true);
  };

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailsModal(true);
  };

  const updateInvoiceStatus = (orderID, newStatus, note) => {
    setInvoices(prevInvoices =>
      prevInvoices.map(invoice =>
        invoice.orderID === orderID
          ? { ...invoice, status: newStatus }
          : invoice
      )
    );
  };

  const statusOptions = ["All", "Draft", "Created", "Approved"];

  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.grandTotal, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-5xl text-[#ec5b0d] font-bold bg-gradient-to-r from-dark-500 to-orange-600 bg-clip-text  mb-2">
              Invoice Management
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Track and manage your sales orders efficiently</p>
          </div>
          {/* navigation to upload invoice screen  */}


                {/* Upload Menu */}
                <div className="relative inline-flex flex-col items-start gap-2">
                  
          
                  {/* Upload Invoice Button (replaces QR) */}
                  <Button
                    onClick={() => navigate('/add-invoice')}
                    className="mt-4 sm:mt-0 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl shadow-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Upload Invoice
                  </Button>
                </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search invoices by customer or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex gap-1">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-5  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-900 dark:text-white"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-2xl shadow-sm border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-3xl font-bold text-blue-600">{invoices.length}</p>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Total Invoices</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-2xl shadow-sm border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-3xl font-bold text-green-600">{invoices.filter(i => i.status === 'approved').length}</p>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">Approved</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-2xl shadow-sm border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-3xl font-bold text-yellow-600">{invoices.filter(i => i.status === 'created').length}</p>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">Created</p>
          </div>

          
        </div>

        {/* Invoices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices.map((invoice, index) => (
            <InvoiceCard
              key={invoice.orderID}
              invoice={invoice}
              onStatusChange={handleStatusChange}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">No invoices found</p>
            <p className="text-gray-500 dark:text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>


      {/* Modals */}
      <StatusChangeModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        invoice={selectedInvoice}
        onStatusChange={updateInvoiceStatus}
      />

      {/* <InvoiceDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        invoice={selectedInvoice}
      /> */}
    </div>
  );
};

export default Invoices;