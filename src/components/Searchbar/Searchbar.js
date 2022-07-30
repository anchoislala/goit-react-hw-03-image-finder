import { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from "react-icons/bs";
import PropTypes from 'prop-types';
import './Searchbar.styled.css';

export default class Searchbar extends Component {

    state = {
        imageName: '',
    };

    handleInputChange = event => {
        const searchImage = event.currentTarget.value;

        this.setState({ imageName: searchImage });
    };

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.imageName.trim() === '') {
            toast.error('Enter the name of image');
            return;
        };

        this.props.onSubmit(this.state.imageName);
        this.reset();
    };

    reset = () => {
        this.setState({ imageName: '' });
    };

    render() {

        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <BsSearch />
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="imageName"
                        value={this.state.imageName}
                        onChange={this.handleInputChange}
                    />
                </form>
            </header>
        );
    };
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};