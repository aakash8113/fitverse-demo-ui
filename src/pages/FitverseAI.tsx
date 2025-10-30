import styled from 'styled-components';
import { useState, useRef } from 'react';
import { BsPlus, BsTrash, BsMagic, BsThreeDots } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import resultImage from '../assets/result.jpg';

const AIContainer = styled(motion.div)`
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #ecf0f3 100%);
  padding: 2rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 1000px;
    height: 1000px;
    background: radial-gradient(circle, rgba(0,201,255,0.1) 0%, rgba(146,254,157,0.05) 100%);
    border-radius: 50%;
    top: -500px;
    left: -300px;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(146,254,157,0.1) 0%, rgba(0,201,255,0.05) 100%);
    border-radius: 50%;
    bottom: -400px;
    right: -200px;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const PreviewSection = styled(motion.div)`
display: flex;
  justify-content: center;
  align-items: center;
  height: 78vh;
  width: 35vw;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 24px -1px rgba(0, 0, 0, 0.1),
    0 2px 8px -1px rgba(0, 0, 0, 0.06),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 8px 32px -1px rgba(0, 0, 0, 0.12),
      0 4px 16px -1px rgba(0, 0, 0, 0.07),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;

const ResultWindow = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  
  .grid-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(130, 130, 130, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(130, 130, 130, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 1;
  }

  img {
    height: 95%;
    width: 95%;
    object-fit: contain;
    z-index: 1;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }

  .placeholder {
    color: #888;
    font-size: 1.2rem;
    text-align: center;
    padding: 2rem;
    z-index: 1;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    gap: 1rem;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #00C9FF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    color: #666;
    font-size: 1rem;
    font-weight: 500;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ControlsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const SelectionBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  height: 70vh;
  width: 26vw;
  border-radius: 16px;
  box-shadow: 
    0 4px 24px -1px rgba(0, 0, 0, 0.1),
    0 2px 8px -1px rgba(0, 0, 0, 0.06),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 32px -1px rgba(0, 0, 0, 0.12),
      0 4px 16px -1px rgba(0, 0, 0, 0.07),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;

const SelectionHeader = styled.div`
  background: #000;
  color: white;
  padding: 0.8rem 1rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectionContent = styled.div`
  padding: 1rem;
`;

const UploadArea = styled.div<{ hasImage?: boolean }>`
  min-height: 200px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  border: 2px dashed ${props => props.hasImage ? '#000' : '#ccc'};
  background: ${props => props.hasImage ? '#f8f9fa' : 'white'};

  &:hover {
    border-color: #000;
    background: ${props => props.hasImage ? '#f0f0f0' : '#f8f9fa'};
    transform: translateY(-2px);
  }

  .upload-icon {
    font-size: 2rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .upload-text {
    color: #666;
    font-size: 0.9rem;
  }

  .remove-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: all 0.3s ease;

    &:hover {
      background: #ff4444;
      color: white;
    }
  }
`;



const GenerateButton = styled(motion.button)`
  background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
  position: relative;
  left: 300px;
  bottom: 24px;
  color: white;
  border: none;
  padding: 1.2rem;
  width: 100%;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 15px rgba(0,201,255,0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    background: linear-gradient(90deg, #00b8e6 0%, #83e589 100%);
    transform: translateY(-2px);
    box-shadow: 
      0 8px 25px rgba(0,201,255,0.3),
      inset 0 0 0 1px rgba(255, 255, 255, 0.2);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background: #e0e0e0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.7;

    &::before {
      display: none;
    }
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const FitverseAI = () => {
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [topImage, setTopImage] = useState<string | null>(null);
  const [bottomImage, setBottomImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const modelInputRef = useRef<HTMLInputElement>(null);
  const topInputRef = useRef<HTMLInputElement>(null);
  const bottomInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: (value: string | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (!modelImage || !topImage) return;

    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setGeneratedImage(resultImage); // In a real app, this would be the AI-generated image
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <AIContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >


      <ControlsSection>
        <motion.div variants={itemVariants}>
          <SelectionBox
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <SelectionHeader>
              <span>Select Model</span>
            </SelectionHeader>
            <SelectionContent>
              <UploadArea
                hasImage={!!modelImage}
                onClick={() => modelInputRef.current?.click()}
              >
                {modelImage ? (
                  <>
                    <img src={modelImage} alt="Selected model" />
                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModelImage(null);
                      }}
                    >
                      <BsTrash />
                    </button>
                  </>
                ) : (
                  <>
                    <FaUserCircle className="upload-icon" />
                    <div className="upload-text">Upload your photo</div>
                  </>
                )}
                <input
                  type="file"
                  ref={modelInputRef}
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setModelImage)}
                />
              </UploadArea>
            </SelectionContent>
          </SelectionBox>
        </motion.div>

        <motion.div variants={itemVariants}>
          <SelectionBox
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <SelectionHeader>
              <span>Top & Bottom</span>
            </SelectionHeader>
            <SelectionContent>
              <div style={{ marginBottom: '1rem' }}>
                <UploadArea
                  hasImage={!!topImage}
                  onClick={() => topInputRef.current?.click()}
                >
                  {topImage ? (
                    <>
                      <img src={topImage} alt="Selected top" />
                      <button
                        className="remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTopImage(null);
                        }}
                      >
                        <BsTrash />
                      </button>
                    </>
                  ) : (
                    <>
                      <BsPlus className="upload-icon" />
                      <div className="upload-text">Add Top</div>
                    </>
                  )}
                  <input
                    type="file"
                    ref={topInputRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setTopImage)}
                  />
                </UploadArea>
              </div>

              <UploadArea
                hasImage={!!bottomImage}
                onClick={() => bottomInputRef.current?.click()}
              >
                {bottomImage ? (
                  <>
                    <img src={bottomImage} alt="Selected bottom" />
                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBottomImage(null);
                      }}
                    >
                      <BsTrash />
                    </button>
                  </>
                ) : (
                  <>
                    <BsPlus className="upload-icon" />
                    <div className="upload-text">Add Bottom</div>
                  </>
                )}
                <input
                  type="file"
                  ref={bottomInputRef}
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setBottomImage)}
                />
              </UploadArea>
            </SelectionContent>
          </SelectionBox>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GenerateButton
            onClick={handleGenerate}
            disabled={!modelImage || !topImage || isGenerating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <BsThreeDots style={{ fontSize: '1.5rem' }} />
                  <span>Generating your look...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="generate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <BsMagic style={{ fontSize: '1.2rem' }} />
                  <span>Generate Try-on</span>
                </motion.div>
              )}
            </AnimatePresence>
          </GenerateButton>
        </motion.div>
      </ControlsSection>

      <PreviewSection variants={itemVariants}>
        <ResultWindow
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid-bg" />
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                className="loading-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="loading-spinner" />
                <div className="loading-text">Generating your virtual try-on...</div>
              </motion.div>
            ) : generatedImage ? (
              <motion.img
                src={generatedImage}
                alt="Generated Preview"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            ) : (
              <motion.div
                className="placeholder"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Virtual try-on result will appear here
              </motion.div>
            )}
          </AnimatePresence>
        </ResultWindow>
      </PreviewSection>

    </AIContainer>
  );
};

export default FitverseAI;
