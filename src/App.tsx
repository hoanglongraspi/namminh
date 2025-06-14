import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import MedicalEquipmentPage from './pages/MedicalEquipmentPage';
import ConsumablesPage from './pages/ConsumablesPage';
import LaboratoryEquipmentPage from './pages/LaboratoryEquipmentPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ContactPage from './pages/ContactPage';
import PartnersPage from './pages/PartnersPage';
import TrainingPage from './pages/TrainingPage';
import RecruitmentPage from './pages/RecruitmentPage';
import ColorPalettePage from './pages/ColorPalettePage';
import LogoDemoPage from './pages/LogoDemoPage';

// Admin imports
import { AuthProvider } from './contexts/AuthContext';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import ProductForm from './pages/admin/ProductForm';
import AdminNews from './pages/admin/News';
import NewsForm from './pages/admin/NewsForm';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Check if current route is admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      {isAdminRoute ? (
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ProductForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/:id/edit"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ProductForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminNews />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news/new"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <NewsForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news/:id/edit"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <NewsForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/medical-equipment" element={<MedicalEquipmentPage />} />
            <Route path="/consumables" element={<ConsumablesPage />} />
            <Route path="/laboratory-equipment" element={<LaboratoryEquipmentPage />} />
            <Route path="/partnership" element={<PartnersPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/recruitment" element={<RecruitmentPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/colors" element={<ColorPalettePage />} />
            <Route path="/logo-demo" element={<LogoDemoPage />} />
          </Routes>
        </Layout>
      )}
    </AuthProvider>
  );
}

export default App;