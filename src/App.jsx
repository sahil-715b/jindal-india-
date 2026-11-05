import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
// Pages
import Index from "./pages/Index";
import Features from "./pages/Features";
import Loyalty from "./pages/Loyalty Points";
import Invoices from "./pages/Invoices";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import AddInvoice from "./pages/AddInvoice";
import Profile from "./pages/Profile";
import InvoiceDetails from "./pages/InvoiceDetails";
// Role-based dashboards
import IndividualDashboard from "./pages/Individual/Dashboard.jsx";
import OwnerDashboard from "./pages/Owner/Dashboard.jsx";
// Context
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
const queryClient = new QueryClient();
// 🔒 Private Route Component
const PrivateRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    if (!user)
        return <Navigate to="/"/>; // redirect if not logged in
    if (!allowedRoles.includes(user.role))
        return <Navigate to="/unauthorized"/>;
    return children;
};
const App = () => (<TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />}/>
              <Route path="/features" element={<Features />}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="*" element={<NotFound />}/>

              {/* Individual routes */}
              <Route path="/dashboard" element={<PrivateRoute allowedRoles={["INDIVIDUAL"]}>
                    <IndividualDashboard />
                  </PrivateRoute>}/>
              <Route path="/loyalty" element={<PrivateRoute allowedRoles={["INDIVIDUAL"]}>
                    <Loyalty />
                  </PrivateRoute>}/>
              <Route path="/invoices" element={<PrivateRoute allowedRoles={["INDIVIDUAL"]}>
                    <Invoices />
                  </PrivateRoute>}/>
              <Route path="/add-invoice" element={<PrivateRoute allowedRoles={["INDIVIDUAL"]}>
                    <AddInvoice />
                  </PrivateRoute>}/>
              <Route path="/invoice-details/:orderID" element={<PrivateRoute allowedRoles={["INDIVIDUAL"]}>
                    <InvoiceDetails />
                  </PrivateRoute>}/>
              <Route path="/products" element={<PrivateRoute allowedRoles={["INDIVIDUAL"]}>
                    <Product />
                  </PrivateRoute>}/>

              {/* Owner routes */}
              <Route path="/owner/dashboard" element={<PrivateRoute allowedRoles={["OWNER"]}>
                    <OwnerDashboard />
                  </PrivateRoute>}/>
              {/* add more OWNER-only routes here */}

              {/* Unauthorized page */}
              <Route path="/unauthorized" element={<h1>🚫 Not Allowed</h1>}/>
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>);
export default App;
