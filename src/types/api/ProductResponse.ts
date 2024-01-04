import {FlatListItem} from 'roqay-react-native-common-components';

interface Product extends FlatListItem {
  id?: number;
  price?: number;
  old_price?: number;
  discount?: number;
  image?: string;
  name?: string;
  description?: string;
  images?: string[];
  in_favorites?: boolean;
  in_cart?: boolean;
}

export default Product;
