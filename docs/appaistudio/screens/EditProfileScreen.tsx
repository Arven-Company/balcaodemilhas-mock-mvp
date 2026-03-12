import React from 'react';
import Header from '../components/Header';
import { UserIcon } from '../components/icons/Icons';

interface EditProfileScreenProps {
  onBack: () => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Editar Perfil" onBack={onBack} />
      <div className="p-4 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center flex-grow">
        <UserIcon className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-600"/>
        <h2 className="text-xl font-semibold mb-2">Edição de Perfil</h2>
        <p>Funcionalidade a ser implementada.</p>
      </div>
    </div>
  );
};

export default EditProfileScreen;
