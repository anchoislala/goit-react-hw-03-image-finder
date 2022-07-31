import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
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
    error: null,
    status: 'idle',
    total: 0,
  }

  componentDidUpdate(_, prevState) {
        if (prevState.imageName !== this.state.imageName ||
            prevState.page !== this.state.page) {

          this.setState({
            status: 'pending',
          });

          fetch(`https://pixabay.com/api/?q=${this.state.imageName}&page=${this.state.page}&key=27699103-8055a76317b5f85044be84666&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              return Promise.reject(
                new Error(`There is no picture ${this.state.imageName}`)
              )
            })
            .then(image => {
              this.setState({ status: 'resolved' });
              this.handleItems(image);
            })
            .catch(error => this.setState({ error, status: 'rejected' }));
        };
    };

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
    const { hits, totalHits } = image;
    
    if (!hits.length) {
      toast.error('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    this.setState(prevState => ({
      items: [...prevState.items, ...hits],
      total: totalHits,
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
    const { showModal, page, items, status, error, total } = this.state;

    return (
      <div className='App'>  

        <Searchbar onSubmit={this.searchSubmitHandler} />

        {status === 'pending' && <Loader/>}
        
        {status === 'rejected' && toast.error(`${error.message}`)}

        {status === 'resolved' && <ImageGallery onClick={this.clickOnImage} imageList={items} /> }

        {page < Math.ceil(total / 12) && items.length > 0 && <Button onLoad={this.loadMore} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
          <img src={this.handleId().largeImageURL} alt={this.handleId().tags} />
          </Modal>
        )}
          
        <ToastContainer autoClose={3000} />

      </div>
    );
  };
};
