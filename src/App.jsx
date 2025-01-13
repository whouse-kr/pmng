import React, { useState, useEffect } from 'react';
import { Menu, Wrench, ExternalLink, HelpCircle } from 'lucide-react';
import Joyride, { STATUS } from 'react-joyride';
import prompts from './data/prompts.json';
import './App.css';

const CustomTooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
  size,
  skipProps
}) => (
  <div {...tooltipProps} style={{ ...step.styles?.tooltip }}>
    <div dangerouslySetInnerHTML={{ __html: step.content }} />
    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
      {index > 0 && (
        <button {...backProps} style={{ ...step.styles?.buttonBack }}>
          이전
        </button>
      )}
      {continuous ? (
        <button {...primaryProps} style={{ ...step.styles?.buttonNext }}>
          {index === size - 1 ? '시작' : '다음'}
        </button>
      ) : (
        <button {...closeProps} style={{ ...step.styles?.buttonNext }}>
          닫기
        </button>
      )}
    </div>
  </div>
);

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 390);
  const [isTOCOpen, setIsTOCOpen] = useState(true);
  const [runTutorial, setRunTutorial] = useState(false);
  const [isAttachmentVisible, setIsAttachmentVisible] = useState(true);

  // 튜토리얼 단계 정의
  const tutorialSteps = [
    {
      target: 'body',
      content: '환영합니다 ✨',
      placement: 'center',
      disableBeacon: true,
      styles: {
        tooltip: {
          fontSize: '1.5rem',
          padding: '32px',
          textAlign: 'center',
          fontWeight: '600'
        }
      }
    },
    {
      target: '.prompt-card',
      content: '이 사이트는 <mark>프롬프트 복사</mark>를 편리하게 하기 위해 설계되었습니다.<br/><br/>간단한 사용방법을 안내드리겠습니다.',
      placement: 'center',
      styles: {
        tooltip: {
          fontSize: '1.2rem',
          padding: '32px',
          textAlign: 'center',
          fontWeight: '500',
          maxWidth: '400px',
          lineHeight: '1.6'
        },
        spotlight: {
          borderRadius: '16px',
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'transparent',
        }
      }
    },
    {
      target: '.tools-section',
      content: '이 영역에서 <mark>실습에 사용되는 도구</mark>를 확인할 수 있습니다.<br/><mark>버튼을 누르면 사이트가 실행</mark>됩니다.',
      placement: 'bottom',
      spotlightClicks: true,
      styles: {
        tooltip: {
          fontSize: '1.2rem',
          padding: '24px',
          textAlign: 'center',
          fontWeight: '500',
          maxWidth: '400px',
          lineHeight: '1.6'
        },
        spotlight: {
          borderRadius: '12px',
          boxShadow: '0 0 0 4px rgba(80, 91, 205, 0.15), 0 0 0 9999px rgba(0, 0, 0, 0.2)',
        }
      }
    },
    {
      target: '.copy-button',
      content: '이 버튼을 통해 <mark>프롬프트를 간편하게 복사</mark>할 수 있습니다.<br/><mark>한번 복사해보세요!</mark>',
      placement: 'left',
      spotlightClicks: true,
      styles: {
        tooltip: {
          fontSize: '1.2rem',
          padding: '24px',
          textAlign: 'center',
          fontWeight: '500',
          maxWidth: '400px',
          lineHeight: '1.6'
        },
        spotlight: {
          borderRadius: '8px',
          boxShadow: '0 0 0 4px rgba(80, 91, 205, 0.15), 0 0 0 9999px rgba(0, 0, 0, 0.2)',
        }
      }
    },
    {
      target: '.attachments',
      content: '각 실습마다 <mark>첨부해야하는 파일</mark>이 있습니다.<br/>이 영역에서 <mark>필요한 파일명</mark>을 안내해드릴게요!',
      placement: 'top',
      spotlightClicks: true,
      styles: {
        tooltip: {
          fontSize: '1.2rem',
          padding: '24px',
          textAlign: 'center',
          fontWeight: '500',
          maxWidth: '400px',
          lineHeight: '1.6'
        },
        spotlight: {
          borderRadius: '12px',
          boxShadow: '0 0 0 4px rgba(80, 91, 205, 0.15), 0 0 0 9999px rgba(0, 0, 0, 0.2)',
        }
      }
    }
  ];

  // 컴포넌트 마운트 시 튜토리얼 시작
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

  const toolLinks = {
    'ChatGPT': 'https://chat.openai.com',
    'Gamma': 'https://gamma.app',
    'Napkin AI': 'https://napkin.ai',
    'Canva': 'https://canva.com',
    'Suno AI': 'https://suno.ai',
    'Perplexity': 'https://www.perplexity.ai',
    'Ideogram': 'https://ideogram.ai'
  };

  const getToolButtonsForSlide = (slide) => {
    return slide.tools || [];
  };

  // 튜토리얼 종료 처리
  const handleTutorialComplete = (data) => {
    const { status } = data;
    
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem('hasSeenTutorial', 'true');
      setRunTutorial(false);
    }
  };

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

  const renderToolsSection = (slide) => {
    if (!slide.tools || slide.tools.length === 0) return null;
    
    return (
      <div className="tools-section">
        <h3>
          <Wrench className="tool-icon" />
          사용 도구
        </h3>
        <div className="tools-list">
          {slide.tools.map((tool) => (
            <a
              key={tool}
              href={toolLinks[tool]}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-tag"
            >
              {tool}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </div>
    );
  };

  const startTutorial = () => {
    setCurrentSlide(1);
    setTimeout(() => {
      setRunTutorial(true);
    }, 500);
  };

  useEffect(() => {
    if (!prompts.slides[currentSlide]?.attachments) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAttachmentVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const attachmentElement = document.querySelector('.attachments');
    if (attachmentElement) {
      observer.observe(attachmentElement);
    }

    return () => {
      if (attachmentElement) {
        observer.unobserve(attachmentElement);
      }
    };
  }, [currentSlide]);

  const scrollToAttachments = () => {
    document.querySelector('.attachments')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      {currentSlide === 1 && (
        <Joyride
          steps={tutorialSteps}
          run={runTutorial}
          continuous
          showProgress
          showSkipButton
          disableOverlayClose
          disableCloseOnEsc
          hideCloseButton
          disableHtmlFontSize
          tooltipComponent={CustomTooltip}
          callback={handleTutorialComplete}
          styles={{
            options: {
              primaryColor: '#505BCD',
              textColor: '#2A2F56',
              zIndex: 1000,
              overlayColor: 'rgba(0, 0, 0, 0.2)',
              arrowColor: '#fff',
            },
            tooltipContainer: {
              textAlign: 'center',
            },
            buttonNext: {
              backgroundColor: '#505BCD',
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              transition: 'all 0.2s ease',
            },
            buttonBack: {
              marginRight: 12,
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '8px',
              color: '#505BCD',
              backgroundColor: 'rgba(80, 91, 205, 0.1)',
              border: 'none',
              transition: 'all 0.2s ease',
            },
            spotlight: {
              borderRadius: '12px',
              boxShadow: '0 0 0 4px rgba(80, 91, 205, 0.15), 0 0 0 9999px rgba(0, 0, 0, 0.2)',
            },
            tooltip: {
              padding: '24px',
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            },
            tooltipTitle: {
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '8px',
            },
            tooltipContent: {
              fontSize: '1rem',
              lineHeight: '1.6',
            }
          }}
          floaterProps={{
            hideArrow: true,
            offset: 16,
          }}
          locale={{
            back: '이전',
            close: '닫기',
            last: '시작',
            next: '다음',
            skip: '건너뛰기',
          }}
        />
      )}

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
            <button 
              className="start-button"
              onClick={startTutorial}
            >
              시작하기
            </button>
          </div>
        ) : (
          <>
            <h1 className="slide-title-main">
              {`${currentSlide}. `}{prompts.slides[currentSlide]?.title}
            </h1>
            <div className="space-y-6">
              {/* Tools Section */}
              {currentSlide > 0 && renderToolsSection(prompts.slides[currentSlide])}

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

              {!isAttachmentVisible && prompts.slides[currentSlide]?.attachments && (
                <div className="attachment-indicator" onClick={scrollToAttachments}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                  첨부파일 확인하기
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