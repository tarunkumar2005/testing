import React, { useState } from 'react';
import styles from './AddNewService.module.css';
import NewServiceAddedPopUp from './NewServiceAddedPopUp';

const AddNewService = ({ onBack, onContinue }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [categories, setCategories] = useState({ men: false, women: false });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleCancel = () => {
    setServiceName('');
    setServiceDescription('');
    setServicePrice('');
    setCategories({ men: false, women: false });
    setImage(null);
    setImagePreview('');
    setUploadProgress(0);
  };

  const handleSubmit = () => {
    if (!serviceName || !serviceDescription || !servicePrice || !image) {
      alert('Please fill in all the fields and upload an image.');
      return;
    }
    setShowPopup(true);
  };

  const handleCheckboxChange = (category) => {
    setCategories({ ...categories, [category]: !categories[category] });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      simulateUploadProgress(file);
    } else {
      alert('Please upload a valid image file (jpg or png).');
      e.target.value = null;
    }
  };

  const simulateUploadProgress = (file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress = progress + 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      simulateUploadProgress(file);
    } else {
      alert('Please upload a valid image file (jpg or png).');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.addNewServiceWrapper}>
      <div className={styles.header}>
        <img src="../assets/backIcon.png" alt="Back" onClick={onBack} className={styles.backIcon} />
        <h2 className={styles.title}>Services</h2>
      </div>
      <div className={styles.FormWrapper}>
        <div className={styles.form}>
          <div className={styles.information}>
            <h3 className={styles.formTitle}>Information</h3>
            <div className={styles.inputGroup}>
              <label>Service Name</label>
              <input
                type="text"
                placeholder="Enter Service name"
                className={styles.input}
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Service Description</label>
              <textarea
                style={{ width: '100%', height: '120px' }}
                placeholder="Enter Service description"
                className={styles.textarea}
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
              ></textarea>
            </div>
            <hr />
            <div className={styles.inputGroup}>
              <h3 className={styles.formTitle}>Image</h3>
              <div
                className={styles.imageUpload}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <button
                  className={styles.uploadButton}
                  onClick={() => document.querySelector(`.${styles.fileInput}`).click()}
                >
                  Add File
                </button>
                <p>Or drag and drop files</p>
                {image && (
                  <div className={styles.imagePreview}>
                    <p>{image.name}</p>
                    {uploadProgress > 0 && (
                      <div className={styles.uploadProgress}>
                        <div
                          className={styles.uploadProgressBar}
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageUpload}
                className={styles.fileInput}
              />
            </div>
            <hr />
            <div className={styles.inputGroup}>
              <h3 className={styles.formTitle}>Price</h3>
              <label>Service Price</label>
              <input
                type="text"
                placeholder="Enter Service Price"
                className={styles.input}
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.formCategories}>
          <div className={styles.categories}>
            <div className={styles.firstPart}>
              <h3>Categories</h3>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={categories.men}
                  onChange={() => handleCheckboxChange('men')}
                />
                Men
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={categories.women}
                  onChange={() => handleCheckboxChange('women')}
                />
                Women
              </label>
            </div>
            <button className={styles.addMoreButton}>Add more</button>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
        <button className={styles.saveButton} onClick={handleSubmit}>Save</button>
      </div>
      {showPopup && <NewServiceAddedPopUp onContinue={onContinue} />}
    </div>
  );
};

export default AddNewService;