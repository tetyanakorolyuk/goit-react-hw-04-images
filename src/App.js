import { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import Loader from './components/Loader';
import ImageGallery from 'components/ImageGallery';
import Modal from './components/Modal';
import imagesAPI from './services/images-api';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';

const perPage = 12;

function App() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageModal, setImageModal] = useState('');
  const [total, setTotal] = useState(0);

useEffect(() => {
  if(!name || !page) {
    return;
  }

  setLoading(true);

  imagesAPI
  .fetchImages(name, page)
  .then(images => {
    setImages(prevImages => [...prevImages, ...images]);
    setLoading(true);
    setTotal(images.length);

    if (images.length === 0) {
      setLoading(false);
      toast.error(`No image with this '${name}'`);
      }
  })
  .catch(error => setError(error))
  .finally(() => setLoading(false));
  }, [name, page]);

const handleFormSubmit = name => {
  setName(name.trim());
  setPage(1);
  setImages([]);
  setError(null);
};

const toggleModal = () => {
  setShowModal(false);
};

const openModal = largeImageURL => {
  setImageModal(largeImageURL);
  setShowModal(true);
};

const loadPageMore = () => {
  setPage(page + 1);
 };

return (
<>
  <Searchbar onSubmit={handleFormSubmit}/>

  {images.length > 0 && (<ImageGallery images={images} onImageClick={openModal}/>)}

  {total >= perPage && <Button onClickButton={loadPageMore} /> }

  {loading && <Loader />}

  {showModal && (
    <Modal onClose={toggleModal}>
      <img className="imageLarge" src={imageModal} alt="" />
    </Modal>
  )}

  <ToastContainer autoClose={ 4000 } />
  </>
);
}

export default App;
