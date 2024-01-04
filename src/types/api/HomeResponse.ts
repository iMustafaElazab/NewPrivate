import Banner from './BannersResponse';
import Product from './ProductResponse';

interface HomeResponse {
  banners?: Banner[];
  products?: Product[];
  ad?: string;
}

export default HomeResponse;
