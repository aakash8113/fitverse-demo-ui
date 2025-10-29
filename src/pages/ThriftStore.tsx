import styled from 'styled-components';
import { useState } from 'react';
import { BsHeart, BsHeartFill, BsImages } from 'react-icons/bs';
import { MdLocalOffer } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';
import { convertToRupees, formatPrice } from '../utils/currency';

const ThriftContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 0.8rem 2.5rem;
  font-size: 1.1rem;
  border: none;
  background: ${props => props.active ? 'black' : 'transparent'};
  color: ${props => props.active ? 'white' : 'black'};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    background: ${props => props.active ? 'black' : '#f0f0f0'};
  }
`;

const Content = styled.div`
  min-height: 500px;
`;

// Buy Section Styles
const FiltersBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    border-color: black;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
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
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
  }

  .details {
    padding: 1rem;

    .brand {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
    }

    .name {
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .size-condition {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: #666;
    }

    .price {
      font-size: 1.2rem;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .original {
        text-decoration: line-through;
        color: #666;
        font-size: 0.9rem;
        font-weight: normal;
      }
    }
  }
`;

// Sell Section Styles
const SellSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
`;

const SellHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const UploadSection = styled.div`
  border: 2px dashed #ddd;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: black;
    background: #f8f9fa;
  }

  .upload-icon {
    font-size: 3rem;
    color: #666;
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
  }
`;

const ItemForm = styled.form`
  display: grid;
  gap: 1.5rem;

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-weight: 500;
    }

    input, select, textarea {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: black;
      }
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }
  }
`;

const SubmitButton = styled.button`
  background: black;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ThriftStore = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      brand: 'Vintage Levi\'s',
      name: 'Classic Denim Jacket',
      image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800',
      price: 45.99,
      originalPrice: 120.00,
      size: 'M',
      condition: 'Excellent'
    },
    {
      id: 2,
      brand: 'Nike',
      name: 'Retro Sport Sweater',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800',
      price: 38.99,
      originalPrice: 89.99,
      size: 'L',
      condition: 'Good'
    },
    {
      id: 3,
      brand: 'Gucci',
      name: 'Vintage Silk Blouse',
      image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800',
      price: 89.99,
      originalPrice: 450.00,
      size: 'S',
      condition: 'Like New'
    },
    {
      id: 4,
      brand: 'Zara',
      name: 'Modern Blazer',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800',
      price: 42.99,
      originalPrice: 99.99,
      size: 'M',
      condition: 'Excellent'
    },
    {
      id: 5,
      brand: 'Tommy Hilfiger',
      name: 'Classic Polo Shirt',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800',
      price: 29.99,
      originalPrice: 65.00,
      size: 'L',
      condition: 'Good'
    },
    {
      id: 6,
      brand: 'Adidas',
      name: 'Vintage Track Jacket',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800',
      price: 35.99,
      originalPrice: 79.99,
      size: 'XL',
      condition: 'Excellent'
    }
  ];

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <ThriftContainer>
      <TabsContainer>
        <Tab 
          active={activeTab === 'buy'} 
          onClick={() => setActiveTab('buy')}
        >
          Buy
        </Tab>
        <Tab 
          active={activeTab === 'sell'} 
          onClick={() => setActiveTab('sell')}
        >
          Sell
        </Tab>
      </TabsContainer>

      <Content>
        {activeTab === 'buy' ? (
          <>
            <FiltersBar>
              <FilterGroup>
                <FilterButton>
                  Category
                </FilterButton>
                <FilterButton>
                  Size
                </FilterButton>
                <FilterButton>
                  Brand
                </FilterButton>
                <FilterButton>
                  Price Range
                </FilterButton>
                <FilterButton>
                  Condition
                </FilterButton>
              </FilterGroup>
              <FilterButton>
                Sort By: Featured
              </FilterButton>
            </FiltersBar>

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
                    <div className="brand">{product.brand}</div>
                    <div className="name">{product.name}</div>
                    <div className="size-condition">
                      <span>Size {product.size}</span>
                      <span>{product.condition}</span>
                    </div>
                    <div className="price">
                      <div>
                        <FaRupeeSign style={{ marginRight: '2px' }} />
                        {formatPrice(convertToRupees(product.price))}
                        <span className="original">
                          <FaRupeeSign style={{ marginRight: '2px' }} />
                          {formatPrice(convertToRupees(product.originalPrice))}
                        </span>
                      </div>
                      <MdLocalOffer />
                    </div>
                  </div>
                </ProductCard>
              ))}
            </ProductGrid>
          </>
        ) : (
          <SellSection>
            <SellHeader>
              <h2>Sell Your Fashion Items</h2>
              <p>Turn your closet into cash - list your items in minutes</p>
            </SellHeader>

            <UploadSection>
              <BsImages className="upload-icon" />
              <h3>Upload Photos</h3>
              <p>Add up to 8 photos of your item</p>
            </UploadSection>

            <ItemForm>
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="e.g., Vintage Levi's Denim Jacket" />
              </div>

              <div className="form-group">
                <label>Brand</label>
                <input type="text" placeholder="Enter brand name" />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select>
                  <option value="">Select category</option>
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="dresses">Dresses</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div className="form-group">
                <label>Size</label>
                <select>
                  <option value="">Select size</option>
                  <option value="xs">XS</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                </select>
              </div>

              <div className="form-group">
                <label>Condition</label>
                <select>
                  <option value="">Select condition</option>
                  <option value="new">New with tags</option>
                  <option value="like-new">Like new</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price</label>
                <input type="number" placeholder="Enter price in INR" />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Describe your item (condition, size fit, measurements, etc.)" />
              </div>

              <SubmitButton type="submit">List Item</SubmitButton>
            </ItemForm>
          </SellSection>
        )}
      </Content>
    </ThriftContainer>
  );
};

export default ThriftStore;
