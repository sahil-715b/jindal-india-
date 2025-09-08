import { useState, useRef } from "react";
import { ChevronLeft, Upload, FileText, Clock, CheckCircle, X } from "lucide-react";

function AddInvoice() {
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const fileInputRef = useRef(null);

  // Sample parsed invoice data
  const sampleInvoice = {
    orderID: "ORD-2024-101",
    customerName: "Future Retail Pvt Ltd",
    customerAddress: "Plot No. 45, Sector 18, Gurugram, Haryana 122015",
    items: 10,
    grandTotal: 95000,
    subtotal: 85000,
    tax: 10000,
    status: "approved",
    date: "2024-09-06",
    dueDate: "2024-10-06",
    invoiceNumber: "INV-2024-0856"
  };

  const statusConfig = {
    draft: { color: "bg-gray-100 text-gray-800", icon: FileText, label: "Draft" },
    created: { color: "bg-blue-100 text-blue-800", icon: Clock, label: "Created" },
    approved: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Approved" },
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, JPG, or PNG file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }

    setUploadedFileName(file.name);
    setLoading(true);
    setInvoice(null);

    // Simulate cloud processing
    setTimeout(() => {
      setInvoice(sampleInvoice);
      setLoading(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setInvoice(null);
    setLoading(false);
    setUploadedFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    // Here you would integrate with your backend API
    alert('Invoice saved successfully!');
    handleReset();
  };

  const StatusIcon = statusConfig[invoice?.status]?.icon || CheckCircle;

  return (
    <div className=" flex justify-around min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center py-8 px-8">
      {/* Header */}
      <div className=" w-full max-w-4xl flex items-center gap-3 ">
        <button
          className="p-2 rounded-full hover:bg-orange-100 transition-colors duration-200 group"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-6 h-6 text-orange-600 group-hover:text-orange-700" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Upload Invoice
        </h1>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 space-y-8">
        {/* Upload Area */}
        {!invoice && !loading && (
          <div className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${dragActive
                  ? "border-orange-400 bg-orange-100/70 scale-[1.02]"
                  : "border-orange-300 bg-orange-50 hover:bg-orange-100/50"
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleInputChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl transition-colors duration-300 ${dragActive ? "bg-orange-500/20" : "bg-orange-500/10"
                  }`}>
                  <Upload className={`w-8 h-8 transition-colors duration-300 ${dragActive ? "text-orange-700" : "text-orange-600"
                    }`} />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-orange-700">
                    {dragActive ? "Drop your invoice here" : "Click to upload or drag & drop"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Supported formats: PDF, JPG, PNG (Max 10MB)
                  </p>
                </div>
              </label>
            </div>

            {uploadedFileName && (
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">{uploadedFileName}</span>
                </div>
                <button
                  onClick={handleReset}
                  className="p-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <X className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-6">



            {/* Shimmer placeholders */}
            {/* Scanner Effect Placeholder */}
            <div className="relative overflow-hidden rounded-xl p-6 bg-gray-100">
              <div className="h-32 bg-gray-200 rounded-lg relative overflow-hidden">
                {/* Scanning light */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/40 to-transparent -skew-x-12 
      [animation:scan_2s_linear_infinite]"
                ></div>
              </div>
            </div>

          </div>
        )}

        {/* Processed Invoice Data */}
        {invoice && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Invoice processed successfully!</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{invoice.customerName}</h4>
                  <p className="text-sm text-gray-600 mt-1">{invoice.customerAddress}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon className="w-4 h-4" />
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[invoice.status]?.color
                      }`}
                  >
                    {statusConfig[invoice.status]?.label}
                  </span>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Invoice Number:</span>
                    <span className="text-sm font-semibold text-gray-800">{invoice.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Order ID:</span>
                    <span className="text-sm font-semibold text-gray-800">{invoice.orderID}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Invoice Date:</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {new Date(invoice.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Due Date:</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Items:</span>
                    <span className="text-sm font-semibold text-gray-800">{invoice.items}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Subtotal:</span>
                    <span className="text-sm font-semibold text-gray-800">₹{invoice.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Tax:</span>
                    <span className="text-sm font-semibold text-gray-800">₹{invoice.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="text-base font-bold text-gray-800">Grand Total:</span>
                    <span className="text-base font-bold text-orange-600">₹{invoice.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className=" w-full max-w-4xl flex flex-col sm:flex-row gap-4 mb-8">
        <button
          className="flex-1 border border-gray-300 rounded-xl py-3 px-6 text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 font-medium"
          onClick={handleReset}
        >
          Upload Another
        </button>
        <button
          className={`flex-1 rounded-xl py-3 px-6 font-medium shadow-md transition-all duration-200 ${invoice
              ? "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          disabled={!invoice}
          onClick={handleSave}
        >
          {invoice ? "Save Invoice" : "Waiting for upload..."}
        </button>
      </div>
    </div>
  );
}

export default AddInvoice;