import { useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Calendar,
    Package,
    DollarSign,
    User,
    Edit2,
    Trash2,
    Eye,
    FileText,
    Clock,
    CheckCircle,
} from "lucide-react";

function InvoiceDetails() {
    const navigate = useNavigate();
    const { orderID } = useParams();

    const [invoices] = useState([
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
        },
    ]);

    const invoice = invoices.find((inv) => inv.orderID === orderID);

    const statusConfig = {
        draft: { color: "bg-gray-100 text-gray-800", icon: FileText },
        created: { color: "bg-blue-100 text-blue-800", icon: Clock },
        approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    };

    if (!invoice) {
        return (
            <div className="p-6 text-center text-gray-600">
                Invoice with ID <span className="font-semibold">{orderID}</span> not
                found.
            </div>
        );
    }

    const StatusIcon = statusConfig[invoice.status]?.icon || FileText;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4">
            {/* Header */}
            <div className="w-full max-w-3xl flex items-center gap-3 mb-6">
                <button className="p-2 rounded-full hover:bg-orange-100 transition" onClick={() => navigate(-1)}>
                    <ChevronLeft className="w-6 h-6 text-orange-600" />
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                    Invoice Details
                </h1>

            </div>

            {/* Form Container */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 space-y-6">
                {/* Sales Order */}
                

                {/* Sales Person */}
                

                {/* Items Section */}
                <div>
                    {/* <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-gray-800">Items</h2>
                        <button className="px-4 py-2 text-sm font-medium text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition">
                            + Add Item
                        </button>
                    </div> */}


                    <div
                        key={invoice.orderID}
                        className="border rounded-xl p-4 flex flex-col space-y-2 mb-3 bg-gray-50"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">{invoice.customerName}</span>
                            
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>Order ID: {invoice.orderID}</p>
                            <p>Date: {new Date(invoice.date).toLocaleDateString()}</p>
                            <p>Items: {invoice.items}</p>
                            <p>Grand Total: ₹{invoice.grandTotal.toLocaleString()}</p>
                            <p>Status: {invoice.status}</p>
                        </div>
                    </div>


                </div>


            </div>

            {/* Footer Buttons */}
            <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-3 mt-4">
                <button className="flex-1 border rounded-lg py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 transition" onClick={() => navigate(-1)}>
                    Go back
                </button>
                <button className="flex-1 rounded-lg py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-md transition">
                    Saved
                </button>
            </div>
        </div>
    );
}

export default InvoiceDetails;
