import React, { useState } from 'react';
import { SupportFileType, FileSwitchRelation } from '../entity.d';

interface FileTypeConfigProps {
  fileTypes: SupportFileType[];
  relations: FileSwitchRelation[];
  onAddFileType: (fileType: Omit<SupportFileType, 'id'>) => void;
  onUpdateFileType: (fileType: SupportFileType) => void;
  onDeleteFileType: (id: number) => void;
  onAddRelation: (relation: Omit<FileSwitchRelation, 'id' | 'toFileType' | 'fromFileType'>) => void;
  onDeleteRelation: (id: number) => void;
}

const FileTypeConfig: React.FC<FileTypeConfigProps> = ({
  fileTypes,
  relations,
  onAddFileType,
  onUpdateFileType,
  onDeleteFileType,
  onAddRelation,
  onDeleteRelation,
}) => {
  const [activeTab, setActiveTab] = useState<'fileTypes' | 'relations'>('fileTypes');
  const [showAddFileTypeModal, setShowAddFileTypeModal] = useState(false);
  const [showAddRelationModal, setShowAddRelationModal] = useState(false);
  const [editingFileType, setEditingFileType] = useState<SupportFileType | null>(null);

  const [newFileType, setNewFileType] = useState({
    type: '',
    displayName: '',
    description: '',
    relationSupportFileTypes: [] as SupportFileType[],
  });

  const [newRelation, setNewRelation] = useState({
    toFileTypeId: 0,
    fromFileTypeId: 0,
  });

  const handleAddFileType = () => {
    if (newFileType.type && newFileType.displayName) {
      onAddFileType(newFileType);
      setNewFileType({
        type: '',
        displayName: '',
        description: '',
        relationSupportFileTypes: [],
      });
      setShowAddFileTypeModal(false);
    }
  };

  const handleAddRelation = () => {
    if (newRelation.toFileTypeId && newRelation.fromFileTypeId) {
      onAddRelation(newRelation);
      setNewRelation({ toFileTypeId: 0, fromFileTypeId: 0 });
      setShowAddRelationModal(false);
    }
  };

  const handleEditFileType = (fileType: SupportFileType) => {
    setEditingFileType(fileType);
    setNewFileType({
      type: fileType.type,
      displayName: fileType.displayName,
      description: fileType.description || '',
      relationSupportFileTypes: fileType.relationSupportFileTypes,
    });
    setShowAddFileTypeModal(true);
  };

  const handleUpdateFileType = () => {
    if (editingFileType && newFileType.type && newFileType.displayName) {
      onUpdateFileType({
        ...editingFileType,
        ...newFileType,
      });
      setEditingFileType(null);
      setShowAddFileTypeModal(false);
      setNewFileType({
        type: '',
        displayName: '',
        description: '',
        relationSupportFileTypes: [],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            文件格式配置
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            管理支持的文件类型和转换关系
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('fileTypes')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'fileTypes'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              文件类型
            </button>
            <button
              onClick={() => setActiveTab('relations')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'relations'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              转换关系
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-8">
          {activeTab === 'fileTypes' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-slate-800">
                  支持的文件类型
                </h2>
                <button
                  onClick={() => setShowAddFileTypeModal(true)}
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    添加类型
                  </span>
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {fileTypes.map((fileType) => (
                  <div key={fileType.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">{fileType.displayName}</h3>
                        <p className="text-sm text-slate-500 mt-1">.{fileType.type}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditFileType(fileType)}
                          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteFileType(fileType.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{fileType.description || '无描述'}</p>
                    {fileType.relationSupportFileTypes.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {fileType.relationSupportFileTypes.map((ft) => (
                          <span key={ft.id} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                            {ft.displayName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'relations' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-slate-800">
                  转换关系
                </h2>
                <button
                  onClick={() => setShowAddRelationModal(true)}
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    添加关系
                  </span>
                </button>
              </div>

              <div className="grid gap-4">
                {relations.map((relation) => (
                  <div key={relation.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="bg-slate-100 rounded-xl px-4 py-2">
                            <p className="text-sm font-medium text-slate-800">{relation.fromFileType.displayName}</p>
                            <p className="text-xs text-slate-500">.{relation.fromFileType.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <div className="bg-slate-100 rounded-xl px-4 py-2">
                            <p className="text-sm font-medium text-slate-800">{relation.toFileType.displayName}</p>
                            <p className="text-xs text-slate-500">.{relation.toFileType.type}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteRelation(relation.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddFileTypeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">
              {editingFileType ? '编辑文件类型' : '添加文件类型'}
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">类型</label>
                <input
                  type="text"
                  value={newFileType.type}
                  onChange={(e) => setNewFileType({ ...newFileType, type: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="例如: pdf"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">显示名称</label>
                <input
                  type="text"
                  value={newFileType.displayName}
                  onChange={(e) => setNewFileType({ ...newFileType, displayName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="例如: PDF文档"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">描述</label>
                <textarea
                  value={newFileType.description}
                  onChange={(e) => setNewFileType({ ...newFileType, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  rows={3}
                  placeholder="可选描述"
                />
              </div>
            </div>
            <div className="mt-8 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddFileTypeModal(false);
                  setEditingFileType(null);
                  setNewFileType({
                    type: '',
                    displayName: '',
                    description: '',
                    relationSupportFileTypes: [],
                  });
                }}
                className="px-5 py-2.5 text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={editingFileType ? handleUpdateFileType : handleAddFileType}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                {editingFileType ? '更新' : '添加'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddRelationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">添加转换关系</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">从类型</label>
                <select
                  value={newRelation.fromFileTypeId}
                  onChange={(e) => setNewRelation({ ...newRelation, fromFileTypeId: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                >
                  <option value={0}>选择文件类型</option>
                  {fileTypes.map((ft) => (
                    <option key={ft.id} value={ft.id}>
                      {ft.displayName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">到类型</label>
                <select
                  value={newRelation.toFileTypeId}
                  onChange={(e) => setNewRelation({ ...newRelation, toFileTypeId: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                >
                  <option value={0}>选择文件类型</option>
                  {fileTypes.map((ft) => (
                    <option key={ft.id} value={ft.id}>
                      {ft.displayName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-8 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddRelationModal(false);
                  setNewRelation({ toFileTypeId: 0, fromFileTypeId: 0 });
                }}
                className="px-5 py-2.5 text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddRelation}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileTypeConfig;