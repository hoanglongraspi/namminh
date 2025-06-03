import React from 'react';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ProductsPage from './pages/ProductsPage';
import MedicalEquipmentPage from './pages/MedicalEquipmentPage';
import ConsumablesPage from './pages/ConsumablesPage';
import LaboratoryEquipmentPage from './pages/LaboratoryEquipmentPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';

function App() {
  // Simple routing based on hash
  const [currentPage, setCurrentPage] = React.useState('home');

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutUsPage />;
      case 'products':
        return <ProductsPage />;
      case 'medical-equipment':
        return <MedicalEquipmentPage />;
      case 'consumables':
        return <ConsumablesPage />;
      case 'laboratory-equipment':
        return <LaboratoryEquipmentPage />;
      case 'news':
        return <NewsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

export default App;