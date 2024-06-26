// src/components/settings/ManageLogo.jsx
import React, { useState, useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext.jsx';
import Modal from '../common/Modal.jsx';

const ManageLogo = () => {
  const { setLogo } = useContext(SettingsContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleFileChange = (e) => setLogoFile(e.target.files[0]);

  const handleSave = () => {
    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(logoFile);
    }
    handleCloseModal();
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Administrar Logo</h2>
      <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4">
        Cambiar Logo
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">
              Guardar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManageLogo;
