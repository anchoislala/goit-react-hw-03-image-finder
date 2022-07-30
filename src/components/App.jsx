import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal'
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import './App.styled.css'

export default class App extends Component {

  state = {
    showModal: false,
    imageName: '',
    page: 1,
    items: [],
    imageId: null,
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  searchSubmitHandler = imageName => {
    this.setState({
      imageName,
      page: 1,
      items: [],
    });
  };

  handleItems = image => {

    if (!image.hits.length) {
      toast.error('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    this.setState(state => ({
      items: [...state.items, ...image.hits]
    }));
  };

  handleId = () => {
    return this.state.items.find(img => img.id === this.state.imageId);
  };

  clickOnImage = id => {
    this.setState({ imageId: id });
    this.toggleModal();
  };

  render() {
    const { imageName, showModal, page, items } = this.state;

    return (
      <div className='App'>

        <Searchbar onSubmit={this.searchSubmitHandler} />

        <ImageGallery
          imageName={imageName}
          page={page}
          handleItems={this.handleItems}
          onClick={this.clickOnImage}
          imageList={items} />

        {showModal && (<Modal onClose={this.toggleModal}>
          <img src={this.handleId().largeImageURL} alt={this.handleId().tags} />
        </Modal>)}

        {imageName && <Button onLoad={this.loadMore} />}
          
        <ToastContainer autoClose={3000} />

      </div>
    );
  };
};
