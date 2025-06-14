import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  Package, 
  Newspaper, 
  Eye, 
  FileText, 
  Plus,
  ArrowUpRight,
  TrendingUp,
  Calendar,
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BarChart3,
  Users,
  Zap
} from 'lucide-react';

interface Stats {
  products: {
    total: number;
    active: number;
    inactive: number;
  };
  news: {
    total: number;
    published: number;
    drafts: number;
  };
}

interface RecentActivity {
  id: string;
  title: string;
  type: 'product' | 'news';
  action: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    products: { total: 0, active: 0, inactive: 0 },
    news: { total: 0, published: 0, drafts: 0 }
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch products data
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, name, is_active, created_at');

      if (productsError) throw productsError;

      // Fetch news data
      const { data: news, error: newsError } = await supabase
        .from('news')
        .select('id, title, is_published, created_at');

      if (newsError) throw newsError;

      // Calculate stats
      const productStats = {
        total: products?.length || 0,
        active: products?.filter(p => p.is_active).length || 0,
        inactive: products?.filter(p => !p.is_active).length || 0
      };

      const newsStats = {
        total: news?.length || 0,
        published: news?.filter(n => n.is_published).length || 0,
        drafts: news?.filter(n => !n.is_published).length || 0
      };

      setStats({
        products: productStats,
        news: newsStats
      });

      // Create recent activity from both products and news
      const activities: RecentActivity[] = [];
      
      // Add recent products
      products?.slice(0, 3).forEach(product => {
        activities.push({
          id: product.id,
          title: product.name,
          type: 'product',
          action: product.is_active ? 'Product activated' : 'Product created',
          timestamp: product.created_at,
          status: product.is_active ? 'success' : 'info'
        });
      });

      // Add recent news
      news?.slice(0, 3).forEach(article => {
        activities.push({
          id: article.id,
          title: article.title,
          type: 'news',
          action: article.is_published ? 'Article published' : 'Article drafted',
          timestamp: article.created_at,
          status: article.is_published ? 'success' : 'warning'
        });
      });

      // Sort by timestamp and take latest 5
      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecentActivity(activities.slice(0, 5));

    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: string, status: string) => {
    if (type === 'product') {
      return <Package className="h-4 w-4" />;
    }
    return <Newspaper className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-full bg-gray-50/50">
        <div className="p-6 sm:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8">
              {/* Header skeleton */}
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded-lg w-64"></div>
                <div className="h-5 bg-gray-200 rounded w-96"></div>
              </div>
              
              {/* Stats skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
                      <div className="h-8 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Content skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="h-64 bg-gray-200 rounded-xl"></div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="h-48 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-gray-50/50">
        <div className="p-6 sm:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Error</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
                <button
                  onClick={loadDashboardData}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50/50">
      <div className="p-6 sm:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section - Simplified */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Welcome back! 👋
                </h1>
                <p className="text-gray-600">
                  Here's what's happening with your content today.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Products */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-blue-100 transition-colors">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{stats.products.total}</div>
                  <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-1">
                    Total
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-lg">Products</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-green-600">{stats.products.active} active</span>
                  {stats.products.inactive > 0 && (
                    <span className="text-gray-400"> • {stats.products.inactive} inactive</span>
                  )}
                </p>
              </div>
            </div>

            {/* Active Products */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-200">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-green-50 p-4 rounded-xl group-hover:bg-green-100 transition-colors">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{stats.products.active}</div>
                  <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full mt-1">
                    {stats.products.total > 0 ? Math.round((stats.products.active / stats.products.total) * 100) : 0}%
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-lg">Active</h3>
                <p className="text-sm text-gray-600">
                  Products currently visible to users
                </p>
              </div>
            </div>

            {/* Total Articles */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all duration-200">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-purple-50 p-4 rounded-xl group-hover:bg-purple-100 transition-colors">
                  <Newspaper className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{stats.news.total}</div>
                  <div className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full mt-1">
                    Total
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-lg">Articles</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-green-600">{stats.news.published} published</span>
                  {stats.news.drafts > 0 && (
                    <span className="text-gray-400"> • {stats.news.drafts} drafts</span>
                  )}
                </p>
              </div>
            </div>

            {/* Published Articles */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all duration-200">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-orange-50 p-4 rounded-xl group-hover:bg-orange-100 transition-colors">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{stats.news.published}</div>
                  <div className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full mt-1">
                    {stats.news.total > 0 ? Math.round((stats.news.published / stats.news.total) * 100) : 0}%
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-lg">Published</h3>
                <p className="text-sm text-gray-600">
                  Articles live on your website
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
                    <p className="text-gray-600">Common tasks to manage your content</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to="/admin/products/new"
                    className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200 shadow-lg">
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">Add Product</h3>
                        <p className="text-sm text-gray-600">Create a new product listing</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>

                  <Link
                    to="/admin/news/new"
                    className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200 shadow-lg">
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">Write Article</h3>
                        <p className="text-sm text-gray-600">Create a new news article</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </Link>

                  <Link
                    to="/admin/products"
                    className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:from-green-100 hover:to-green-200 hover:border-green-300 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200 shadow-lg">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">Manage Products</h3>
                        <p className="text-sm text-gray-600">View and edit all products</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                  </Link>

                  <Link
                    to="/admin/news"
                    className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 hover:from-orange-100 hover:to-orange-200 hover:border-orange-300 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-orange-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200 shadow-lg">
                        <Newspaper className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">Manage News</h3>
                        <p className="text-sm text-gray-600">View and edit all articles</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <p className="text-sm text-gray-600">Latest updates</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <Activity className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                        <div className={`p-2 rounded-lg border ${getStatusColor(activity.status)}`}>
                          {getActivityIcon(activity.type, activity.status)}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-gray-700">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-600">{activity.action}</p>
                          <p className="text-xs text-gray-400">{formatDate(activity.timestamp)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-gray-50 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                        <Clock className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">No recent activity</p>
                      <p className="text-xs text-gray-500">Activity will appear here as you use the system</p>
                    </div>
                  )}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                    <p className="text-sm text-gray-600">All systems operational</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 px-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">Database</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">Connected</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 px-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">API Status</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">Healthy</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">Last Updated</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 