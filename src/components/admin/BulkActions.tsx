import React, { useState } from 'react';
import { Trash2, Eye, EyeOff, CheckSquare, Square, MoreHorizontal, AlertTriangle } from 'lucide-react';

interface BulkActionsProps {
  selectedItems: string[];
  totalItems: number;
  onSelectAll: (selected: boolean) => void;
  onBulkDelete: (ids: string[]) => Promise<void>;
  onBulkToggleStatus?: (ids: string[], activate: boolean) => Promise<void>;
  onBulkTogglePublish?: (ids: string[], publish: boolean) => Promise<void>;
  itemType: 'products' | 'news';
  className?: string;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedItems,
  totalItems,
  onSelectAll,
  onBulkDelete,
  onBulkToggleStatus,
  onBulkTogglePublish,
  itemType,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'delete' | 'activate' | 'deactivate' | 'publish' | 'unpublish';
    message: string;
    action: () => Promise<void>;
  } | null>(null);

  const hasSelection = selectedItems.length > 0;
  const isAllSelected = selectedItems.length === totalItems && totalItems > 0;
  const isPartialSelection = selectedItems.length > 0 && selectedItems.length < totalItems;

  const handleSelectAll = () => {
    onSelectAll(!isAllSelected);
  };

  const handleBulkAction = async (
    type: 'delete' | 'activate' | 'deactivate' | 'publish' | 'unpublish',
    action: () => Promise<void>,
    message: string
  ) => {
    setPendingAction({ type, action, message });
    setShowConfirmDialog(true);
  };

  const executePendingAction = async () => {
    if (!pendingAction) return;

    setIsLoading(true);
    setShowConfirmDialog(false);

    try {
      await pendingAction.action();
    } catch (error) {
      console.error('Bulk action error:', error);
    } finally {
      setIsLoading(false);
      setPendingAction(null);
    }
  };

  const getBulkActions = () => {
    const actions = [];

    // Delete action
    actions.push({
      key: 'delete',
      label: `Delete ${selectedItems.length} ${itemType}`,
      icon: Trash2,
      onClick: () => handleBulkAction(
        'delete',
        () => onBulkDelete(selectedItems),
        `Are you sure you want to delete ${selectedItems.length} ${itemType}? This action cannot be undone.`
      ),
      className: 'text-red-600 hover:bg-red-50',
      dangerous: true
    });

    // Status toggle actions
    if (onBulkToggleStatus) {
      actions.push({
        key: 'activate',
        label: `Activate ${selectedItems.length} ${itemType}`,
        icon: Eye,
        onClick: () => handleBulkAction(
          'activate',
          () => onBulkToggleStatus(selectedItems, true),
          `Activate ${selectedItems.length} ${itemType}?`
        ),
        className: 'text-green-600 hover:bg-green-50'
      });

      actions.push({
        key: 'deactivate',
        label: `Deactivate ${selectedItems.length} ${itemType}`,
        icon: EyeOff,
        onClick: () => handleBulkAction(
          'deactivate',
          () => onBulkToggleStatus(selectedItems, false),
          `Deactivate ${selectedItems.length} ${itemType}?`
        ),
        className: 'text-orange-600 hover:bg-orange-50'
      });
    }

    // Publish toggle actions (for news)
    if (onBulkTogglePublish && itemType === 'news') {
      actions.push({
        key: 'publish',
        label: `Publish ${selectedItems.length} articles`,
        icon: Eye,
        onClick: () => handleBulkAction(
          'publish',
          () => onBulkTogglePublish(selectedItems, true),
          `Publish ${selectedItems.length} articles?`
        ),
        className: 'text-blue-600 hover:bg-blue-50'
      });

      actions.push({
        key: 'unpublish',
        label: `Unpublish ${selectedItems.length} articles`,
        icon: EyeOff,
        onClick: () => handleBulkAction(
          'unpublish',
          () => onBulkTogglePublish(selectedItems, false),
          `Unpublish ${selectedItems.length} articles?`
        ),
        className: 'text-gray-600 hover:bg-gray-50'
      });
    }

    return actions;
  };

  if (!hasSelection && totalItems === 0) {
    return null;
  }

  return (
    <>
      <div className={`flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm ${className}`}>
        {/* Selection Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSelectAll}
            className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            {isAllSelected ? (
              <CheckSquare className="h-5 w-5 text-blue-600" />
            ) : isPartialSelection ? (
              <div className="h-5 w-5 bg-blue-600 rounded border-2 border-blue-600 flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-sm" />
              </div>
            ) : (
              <Square className="h-5 w-5 text-gray-400" />
            )}
            <span>
              {isAllSelected ? 'Deselect All' : `Select All (${totalItems})`}
            </span>
          </button>

          {hasSelection && (
            <div className="text-sm text-gray-600">
              {selectedItems.length} of {totalItems} selected
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {hasSelection && (
          <div className="flex items-center space-x-2">
            {getBulkActions().slice(0, 2).map((action) => (
              <button
                key={action.key}
                onClick={action.onClick}
                disabled={isLoading}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium border border-gray-300 rounded-lg transition-colors ${action.className} ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'
                }`}
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.label}
              </button>
            ))}

            {getBulkActions().length > 2 && (
              <div className="relative">
                <button
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  onClick={() => {/* Implement dropdown menu */}}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && pendingAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-2 rounded-full ${
                  pendingAction.type === 'delete' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <AlertTriangle className={`h-6 w-6 ${
                    pendingAction.type === 'delete' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Confirm Action
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {pendingAction.message}
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowConfirmDialog(false)}
                      className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={executePendingAction}
                      disabled={isLoading}
                      className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                        pendingAction.type === 'delete'
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Processing...' : 'Confirm'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions; 