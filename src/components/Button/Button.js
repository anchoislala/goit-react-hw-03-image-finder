import PropTypes from 'prop-types';
import './Button.styled.css'

const Button = ({onLoad}) => {
    return (
        <button className='Button' onClick={onLoad}>Load more</button>
    );
};

Button.propTypes = {
    onLoad: PropTypes.func.isRequired,
}

export default Button;