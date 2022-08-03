import axios from "axios";

const ServiceAPI = (imageName, page) => {

    return axios.get('https://pixabay.com/api/', {
        params: {
            q: imageName,
            page,
            key: '27699103-8055a76317b5f85044be84666',
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
        }
    });
};

export default ServiceAPI;
