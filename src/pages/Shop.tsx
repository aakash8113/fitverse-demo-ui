import styled from 'styled-components';
import { BsHeart, BsHeartFill, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { convertToRupees, formatPrice } from '../utils/currency';
import { useState } from 'react';

const ShopContainer = styled.div`
  padding: 2rem;
`;

const HeroSection = styled.div`
  margin-bottom: 3rem;
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3));
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    color: white;

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      max-width: 500px;
    }
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
`;

const CategoryTab = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  background: ${props => props.active ? 'black' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  border: 1px solid black;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
  }

  .image-container {
    position: relative;
    padding-top: 125%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .wishlist {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: white;
      border-radius: 50%;
      padding: 0.5rem;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
  }

  .details {
    padding: 1rem;

    h3 {
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .rating {
      color: #ffc107;
      margin-bottom: 0.5rem;
      display: flex;
      gap: 0.2rem;
    }

    .price {
      font-weight: bold;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${props => props.primary ? 'black' : 'white'};
  color: ${props => props.primary ? 'white' : 'black'};
  border: 1px solid black;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('Featured');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: 'Classic Denim Jacket',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
      price: 89.99,
      rating: 4.5
    },
    {
      id: 2,
      name: 'White Minimal Sneakers',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
      price: 79.99,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Urban Streetwear Hoodie',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
      price: 59.99,
      rating: 4.3
    },
    {
      id: 4,
      name: 'Premium Cotton T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
      price: 29.99,
      rating: 4.6
    },
    {
      id: 5,
      name: 'Designer Sunglasses',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
      price: 129.99,
      rating: 4.7
    },
    {
      id: 6,
      name: 'Leather Crossbody Bag',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
      price: 149.99,
      rating: 4.9
    },
    {
      id: 7,
      name: 'Minimalist Watch',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
      price: 199.99,
      rating: 4.8
    },
    {
      id: 8,
      name: 'Premium Joggers',
      image: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
      price: 69.99,
      rating: 4.4
    }
  ];

  const categories = ['Featured', 'New Arrivals', 'Best Sellers', 'Sale'];

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} />);
    }
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" />);
    }

    return stars;
  };

  return (
    <ShopContainer>
      <HeroSection>
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350" alt="Fashion Hero" />
        <div className="overlay">
          <h1>Summer Collection 2025</h1>
          <p>Discover the latest trends in fashion and explore your personal style with our new summer collection.</p>
        </div>
      </HeroSection>

      <CategoryTabs>
        {categories.map(category => (
          <CategoryTab
            key={category}
            active={category === activeCategory}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </CategoryTab>
        ))}
      </CategoryTabs>

      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <div className="image-container">
              <img src={product.image} alt={product.name} />
              <div 
                className="wishlist"
                onClick={() => toggleWishlist(product.id)}
              >
                {wishlist.includes(product.id) ? (
                  <BsHeartFill size={20} color="red" />
                ) : (
                  <BsHeart size={20} />
                )}
              </div>
            </div>
            <div className="details">
              <h3>{product.name}</h3>
              <div className="rating">
                {renderRating(product.rating)}
              </div>
              <div className="price">{formatPrice(convertToRupees(product.price))}</div>
              <ActionButtons>
                <Button>
                  <AiOutlineShoppingCart size={20} />
                  Add to Cart
                </Button>
                <Button primary>
                  Buy Now
                </Button>
              </ActionButtons>
            </div>
          </ProductCard>
        ))}
      </ProductGrid>
    </ShopContainer>
  );
};

export default Shop;
