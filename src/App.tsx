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

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/medical-equipment" element={<MedicalEquipmentPage />} />
        <Route path="/consumables" element={<ConsumablesPage />} />
        <Route path="/laboratory-equipment" element={<LaboratoryEquipmentPage />} />
        <Route path="/partnership" element={<PartnersPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:newsId" element={<NewsDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/colors" element={<ColorPalettePage />} />
        <Route path="/logo-demo" element={<LogoDemoPage />} />
      </Routes>
    </Layout>
  );
}

export default App;