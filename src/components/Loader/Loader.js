import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='Loader'>
            <RotatingLines
                strokeColor="#3f51b5"
                strokeWidth="5"
                animationDuration="0.75"
                width="150"
                visible={true}
            />
        </div>
    );
};

export default Loader;