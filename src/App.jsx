import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import prompts from './data/prompts.json';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 390);
  const [isTOCOpen, setIsTOCOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 390) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentSlide(prev => prev === 0 ? prompts.slides.length - 1 : prev - 1);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentSlide(prev => prev === prompts.slides.length - 1 ? 0 : prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTOC = () => {
    setIsTOCOpen(!isTOCOpen);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Create popup
      const popup = document.createElement('div');
      popup.innerHTML = `
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        <span style="font-size: 1.5rem;">복사됨!</span>
      `;
      popup.className = 'copy-popup';
      document.body.appendChild(popup);

      // Remove popup after animation
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
        <div className="sidebar-content">
          <div className="sidebar-controls">
            <button className="toggle-btn" onClick={toggleSidebar}>
              <Menu />
            </button>
            
            <div onClick={toggleTOC} className="toggle-toc">
              <span>목차</span>
              <span>{isTOCOpen ? '▲' : '▼'}</span>
            </div>

            <div className="fixed-links">
              <a href="https://canva.com" target="_blank" rel="noopener noreferrer">Canva</a>
              <a href="https://napkin.ai" target="_blank" rel="noopener noreferrer">Napkin AI</a>
              <a href="https://gamma.app" target="_blank" rel="noopener noreferrer">Gamma</a>
              <a href="https://suno.ai" target="_blank" rel="noopener noreferrer">Suno AI</a>
              <a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer">Perplexity</a>
              <a href="https://ideogram.ai" target="_blank" rel="noopener noreferrer">Ideogram</a>
            </div>
          </div>

          <ul className={`slide-list ${!isTOCOpen ? 'hidden' : ''}`}>
            {prompts.slides.map((slide, index) => (
              <li
                key={index}
                className={`slide-item ${currentSlide === index ? 'current-slide' : ''}`}
                onClick={() => setCurrentSlide(index)}
              >
                <span className="slide-number">{index}</span>
                <span className="slide-title">{slide.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="slide-nav">
          {prompts.slides.map((slide, index) => (
            <button
              key={index}
              className={`slide-nav-button ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            >
              {index}
            </button>
          ))}
        </div>
        
        {currentSlide === 0 ? (
          <div className="cover-page">
            <h1 className="cover-title">{prompts.slides[0].title}</h1>
            <h2 className="cover-subtitle">{prompts.slides[0].content}</h2>
          </div>
        ) : (
          <>
            <h1 className="slide-title-main">
              {`${currentSlide}. `}{prompts.slides[currentSlide]?.title}
            </h1>
            <div className="space-y-6">
              {prompts.slides[currentSlide]?.prompts.map((prompt, index) => (
                <div key={index} className="prompt-card">
                  <div className="flex">
                    <div className="prompt-content-wrapper">
                      <div className="prompt-number">{index + 1}</div>
                      <div className="prompt-content">{prompt.text}</div>
                    </div>
                    <button
                      className="copy-button"
                      onClick={() => copyToClipboard(prompt.text)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      복사하기
                    </button>
                  </div>
                </div>
              ))}

              {prompts.slides[currentSlide]?.attachments && (
                <div className="attachments">
                  <strong>첨부 파일:</strong><br />
                  {prompts.slides[currentSlide].attachments.map((attachment, index) => (
                    <div key={index}>
                      {typeof attachment === 'string' ? (
                        // Legacy string attachments
                        attachment
                      ) : attachment.type === 'url' ? (
                        // URL type attachments
                        <div>
                          {attachment.text}{' '}
                          <a 
                            href={attachment.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 underline"
                          >
                            바로가기
                          </a>
                        </div>
                      ) : (
                        // Default case for other types
                        attachment.text || JSON.stringify(attachment)
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App; 