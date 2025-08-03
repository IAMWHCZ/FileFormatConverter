import React, { useState } from 'react';
import FileTypeConfig from './components/FileTypeConfig';
import { SupportFileType, FileSwitchRelation } from './entity.d';

const App: React.FC = () => {
  const [fileTypes, setFileTypes] = useState<SupportFileType[]>([
    {
      id: 1,
      type: 'pdf',
      displayName: 'PDF文档',
      description: 'Adobe PDF格式',
      relationSupportFileTypes: [],
    },
    {
      id: 2,
      type: 'docx',
      displayName: 'Word文档',
      description: 'Microsoft Word格式',
      relationSupportFileTypes: [],
    },
    {
      id: 3,
      type: 'txt',
      displayName: '文本文件',
      description: '纯文本格式',
      relationSupportFileTypes: [],
    },
    {
      id: 4,
      type: 'jpg',
      displayName: 'JPEG图片',
      description: 'JPEG图像格式',
      relationSupportFileTypes: [],
    },
  ]);

  const [relations, setRelations] = useState<FileSwitchRelation[]>([
    {
      id: 1,
      toFileTypeId: 1,
      fromFileTypeId: 2,
      toFileType: {
        id: 1,
        type: 'pdf',
        displayName: 'PDF文档',
        description: 'Adobe PDF格式',
        relationSupportFileTypes: [],
      },
      fromFileType: {
        id: 2,
        type: 'docx',
        displayName: 'Word文档',
        description: 'Microsoft Word格式',
        relationSupportFileTypes: [],
      },
    },
  ]);

  const handleAddFileType = (newFileType: Omit<SupportFileType, 'id'>) => {
    const newId = Math.max(...fileTypes.map(ft => ft.id), 0) + 1;
    const fileType: SupportFileType = {
      ...newFileType,
      id: newId,
    };
    setFileTypes([...fileTypes, fileType]);
  };

  const handleUpdateFileType = (updatedFileType: SupportFileType) => {
    setFileTypes(fileTypes.map(ft => 
      ft.id === updatedFileType.id ? updatedFileType : ft
    ));
  };

  const handleDeleteFileType = (id: number) => {
    setFileTypes(fileTypes.filter(ft => ft.id !== id));
    setRelations(relations.filter(r => r.fromFileTypeId !== id && r.toFileTypeId !== id));
  };

  const handleAddRelation = (newRelation: Omit<FileSwitchRelation, 'id' | 'toFileType' | 'fromFileType'>) => {
    const newId = Math.max(...relations.map(r => r.id), 0) + 1;
    const toFileType = fileTypes.find(ft => ft.id === newRelation.toFileTypeId);
    const fromFileType = fileTypes.find(ft => ft.id === newRelation.fromFileTypeId);
    
    if (toFileType && fromFileType) {
      const relation: FileSwitchRelation = {
        ...newRelation,
        id: newId,
        toFileType,
        fromFileType,
      };
      setRelations([...relations, relation]);
    }
  };

  const handleDeleteRelation = (id: number) => {
    setRelations(relations.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FileTypeConfig
        fileTypes={fileTypes}
        relations={relations}
        onAddFileType={handleAddFileType}
        onUpdateFileType={handleUpdateFileType}
        onDeleteFileType={handleDeleteFileType}
        onAddRelation={handleAddRelation}
        onDeleteRelation={handleDeleteRelation}
      />
    </div>
  );
};

export default App;