import React, { useState, useEffect, useRef } from 'react';
import { Menu, Wrench, ExternalLink, HelpCircle, Edit, Trash2, Upload, Download, Hash, Home, FileText, Settings, Info } from 'lucide-react';
import Joyride, { STATUS } from 'react-joyride';
import initialPrompts from './data/prompts.json';
import './App.css';

// Key for localStorage
const LOCAL_STORAGE_KEY = 'promptAppData';

// Function to load data: try localStorage first, then initialPrompts
const loadInitialData = () => {
  try {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      // Basic validation: Check if it has a slides array
      const parsedData = JSON.parse(savedData);
      if (parsedData && Array.isArray(parsedData.slides)) {
         console.log("Loaded data from localStorage");
         return parsedData;
      }
    }
  } catch (error) {
    console.error("Error reading data from localStorage:", error);
    // Clear potentially corrupted data
    localStorage.removeItem(LOCAL_STORAGE_KEY); 
  }
  console.log("Loaded initial data from JSON");
  return initialPrompts; // Fallback to default data
};

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
  const [tutorialCompleted, setTutorialCompleted] = useState(true);
  const [showAuthCenter, setShowAuthCenter] = useState(false);
  const [promptData, setPromptData] = useState(loadInitialData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAllSlides, setShowAllSlides] = useState(false); // New state to track if all slides should be shown
  const [editingPrompts, setEditingPrompts] = useState({}); // Track which prompts are being edited
  const [isEditingTitle, setIsEditingTitle] = useState(false); // Track if title is being edited
  const [editedTitle, setEditedTitle] = useState(""); // Store the edited title text
  const [editingAttachments, setEditingAttachments] = useState({}); // Track which attachments are being edited
  const [editedAttachmentText, setEditedAttachmentText] = useState(""); // Store the edited attachment text
  const [isEditingTools, setIsEditingTools] = useState(false); // Track if tools are being edited
  const [selectedTools, setSelectedTools] = useState([]); // Store the selected tools
  const [confirmingDelete, setConfirmingDelete] = useState({}); // Track which items are showing delete confirmation
  // --- Unified Modal State ---
  const [isItemEditModalOpen, setIsItemEditModalOpen] = useState(false);
  const [editingItemInfo, setEditingItemInfo] = useState(null); // { type: 'prompt' | 'attachment' | 'slide' | 'slidePosition' }
  const [editedItemText, setEditedItemText] = useState(""); // Title or Text
  const [editedItemGroup, setEditedItemGroup] = useState(""); // Group for new slide
  const [editedItemUrl, setEditedItemUrl] = useState(""); // URL for attachment
  const [editedItemPosition, setEditedItemPosition] = useState(""); // Target position for slide move
  const fileInputRef = useRef(null); // Ref for hidden file input

  // --- Save data to localStorage whenever promptData changes ---
  useEffect(() => {
    try {
      // Only save if promptData seems valid (at least has slides array)
      if (promptData && Array.isArray(promptData.slides)) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(promptData));
          // console.log("Saved data to localStorage");
      }
    } catch (error) {
       console.error("Error saving data to localStorage:", error);
    }
  }, [promptData]); // Run this effect when promptData changes

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
        setCurrentSlide(prev => prev === 0 ? promptData.slides.length - 1 : prev - 1);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentSlide(prev => prev === promptData.slides.length - 1 ? 0 : prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [promptData.slides.length]);

  const toolLinks = {
    'ChatGPT': 'https://chat.openai.com',
    'Gamma': 'https://gamma.app',
    'Napkin AI': 'https://napkin.ai',
    'Canva': 'https://canva.com',
    'Suno AI': 'https://suno.ai',
    'Perplexity': 'https://www.perplexity.ai',
    'Claude': 'https://claude.ai',
    'ChatPDF': 'https://chatpdf.com',
    'NoteBookLM': 'https://notebooklm.google.com/',
    'Youtube Summarizer': 'https://chromewebstore.google.com/detail/youtube-summary-with-chat/nmmicjeknamkfloonkhhcjmomieiodli?hl=ko',
    'Ideogram': 'https://ideogram.ai',
  };

  const getToolButtonsForSlide = (slide) => {
    return slide.tools || [];
  };

  // 튜토리얼 종료 처리
  const handleTutorialComplete = (data) => {
    const { status } = data;
    
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem('tutorialCompleted', 'true');
      setTutorialCompleted(true);
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

  const renderToolsSection = (slide, slideIndex) => {
    if (!slide) return null; // Add check for valid slide
    if (!slide.tools && !isEditMode) return null;
    
    const availableTools = Object.keys(toolLinks);
    const isCurrentlyEditingTools = isEditingTools === slideIndex; // Check if *this* slide's tools are being edited
    
    return (
      <div className="tools-section">
        <h3>
          <Wrench className="tool-icon" />
          사용 도구
          {isEditMode && !isCurrentlyEditingTools && (
            <button 
              className="edit-tools-btn" 
              onClick={() => {
                setSelectedTools(slide.tools || []);
                setIsEditingTools(slideIndex); // Set editing state to this slide's index
              }}
              title="도구 수정"
            >
              <Edit size={16} />
              <span className="edit-tools-text">수정</span>
            </button>
          )}
        </h3>
        {isEditMode && isCurrentlyEditingTools ? (
          <div className="tools-edit-container">
            <div className="tools-checkbox-list">
              {availableTools.map((tool) => (
                <div key={tool} className="tool-checkbox-item">
                  <label className="tool-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedTools.includes(tool)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTools(prev => [...prev, tool]);
                        } else {
                          setSelectedTools(prev => prev.filter(t => t !== tool));
                        }
                      }}
                    />
                    <span className="tool-checkbox-text">{tool}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="tools-edit-actions">
              <button 
                className="save-tools-btn"
                onClick={() => {
                  // Save the selected tools for the specific slideIndex
                  setPromptData(currentData => {
                    const newData = JSON.parse(JSON.stringify(currentData));
                    if (newData.slides[slideIndex]) { // Ensure slide exists
                      newData.slides[slideIndex].tools = [...selectedTools];
                    }
                    return newData;
                  });
                  setIsEditingTools(false); // Reset editing state
                }}
              >
                저장
              </button>
              <button 
                className="cancel-tools-btn"
                onClick={() => setIsEditingTools(false)} // Reset editing state
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className="tools-list">
            {(slide.tools || []).map((tool) => (
              <a
                key={tool}
                href={toolLinks[tool]}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-tag"
                onClick={(e) => {
                  if (isEditMode) {
                    e.preventDefault(); // Prevent opening the link in edit mode
                  }
                }}
              >
                {tool}
                <ExternalLink size={14} />
              </a>
            ))}
            {isEditMode && (!slide.tools || slide.tools.length === 0) && (
              <div className="no-tools-message" onClick={() => {
                setSelectedTools([]);
                setIsEditingTools(slideIndex); // Set editing state to this slide's index
              }}>
                <button className="add-tools-btn">+ 도구 추가하기</button>
              </div>
            )}
          </div>
        )}
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
    if (!promptData.slides[currentSlide]?.attachments) return;

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

  // Add restart tutorial function
  const restartTutorial = () => {
    localStorage.removeItem('tutorialCompleted');
    setTutorialCompleted(false);
    setCurrentSlide(0);
    setTimeout(() => {
      setRunTutorial(true);
    }, 500);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setShowAllSlides(!isEditMode); // When entering edit mode, show all slides
  };

  const handleAddPrompt = (slideIndex) => {
    // Add a new empty prompt directly to the data
    setPromptData(currentData => {
      const newData = JSON.parse(JSON.stringify(currentData));
      if (!newData.slides[slideIndex].prompts) {
        newData.slides[slideIndex].prompts = [];
      }
      // Add new empty prompt
      const newPromptIndex = newData.slides[slideIndex].prompts.length;
      newData.slides[slideIndex].prompts.push({ text: "" });
      
      return newData;
    });
    
    // Delay setting the editing state to ensure the new prompt is rendered
    setTimeout(() => {
      const newPromptIndex = promptData.slides[slideIndex].prompts.length;
      setEditingPrompts(prev => ({
        ...prev,
        [`${slideIndex}-${newPromptIndex}`]: true
      }));
    }, 50);
  };

  const handleEditPrompt = (slideIndex, promptIndex) => {
    // Open the modal for prompt editing
    const currentPrompt = promptData.slides[slideIndex].prompts[promptIndex];
    setEditingItemInfo({ type: 'prompt', slideIndex, itemIndex: promptIndex, actionType: 'edit' }); // Add actionType
    setEditedItemText(currentPrompt.text);
    setEditedItemUrl(""); // Clear URL field for prompts
    setIsItemEditModalOpen(true);
  };

  const handleDeletePrompt = (slideIndex, promptIndex) => {
    // No more window.confirm - just delete directly
    setPromptData(currentData => {
      const newSlides = currentData.slides.map((slide, index) => {
        if (index === slideIndex) {
          const newPrompts = slide.prompts.filter((prompt, pIndex) => pIndex !== promptIndex);
          return { ...slide, prompts: newPrompts };
        }
        return slide;
      });
      return { ...currentData, slides: newSlides };
    });
    
    // Clear any confirming state
    setConfirmingDelete(prev => {
      const newState = {...prev};
      delete newState[`${slideIndex}-${promptIndex}`];
      return newState;
    });
  };

  // --- Attachment CRUD Functions ---
  const handleAddAttachment = (slideIndex) => {
    // Open the modal for adding a new attachment
    setEditingItemInfo({ type: 'attachment', slideIndex, actionType: 'add' });
    setEditedItemText(""); // Start with empty fields
    setEditedItemUrl("");
    setIsItemEditModalOpen(true);
  };

  const handleEditAttachment = (slideIndex, attachmentIndex) => {
    // Open the modal for attachment editing
    const currentAttachment = promptData.slides[slideIndex].attachments[attachmentIndex];
    setEditingItemInfo({ type: 'attachment', slideIndex, itemIndex: attachmentIndex, actionType: 'edit' }); // Add actionType

    if (typeof currentAttachment === 'string') {
      setEditedItemText(currentAttachment);
      setEditedItemUrl("");
    } else if (currentAttachment.type === 'url') {
      setEditedItemText(currentAttachment.text);
      setEditedItemUrl(currentAttachment.url || "");
    } else {
      // Simple text object or other types
      setEditedItemText(currentAttachment.text || "");
      setEditedItemUrl("");
    }
    setIsItemEditModalOpen(true);
  };

  const handleDeleteAttachment = (slideIndex, attachmentIndex) => {
    // No more window.confirm
    setPromptData(currentData => {
      const newSlides = currentData.slides.map((slide, index) => {
        if (index === slideIndex) {
          const newAttachments = slide.attachments.filter((att, idx) => idx !== attachmentIndex);
          return { ...slide, attachments: newAttachments };
        }
        return slide;
      });
      return { ...currentData, slides: newSlides };
    });
    
    // Clear any confirming state
    setConfirmingDelete(prev => {
      const newState = {...prev};
      delete newState[`attachment-${slideIndex}-${attachmentIndex}`];
      return newState;
    });
  };

  // --- New: Slide Edit Function --- 
  const handleEditSlideTitle = (slideIndex) => {
      const currentSlide = promptData.slides[slideIndex];
      setEditingItemInfo({ type: 'slide', slideIndex, actionType: 'edit' });
      setEditedItemText(currentSlide.title); // Use text state for title
      setEditedItemUrl(""); // Not needed for slide title
      setIsItemEditModalOpen(true);
  };

  // --- New: Slide Add/Delete Functions --- 
  const handleAddSlide = () => {
      setEditingItemInfo({ type: 'slide', actionType: 'add' });
      setEditedItemText(""); // For new title
      setEditedItemGroup(""); // For new group
      setEditedItemUrl("");
      setIsItemEditModalOpen(true);
  };

  const handleDeleteSlide = (slideIndexToDelete) => {
    // No more window.confirm
    setPromptData(currentData => {
        const newSlides = currentData.slides.filter((slide, index) => index !== slideIndexToDelete);
        return { ...currentData, slides: newSlides };
    });

    // Adjust currentSlide index if necessary
    if (currentSlide === slideIndexToDelete) {
        // If deleting the current slide, move to the previous one or 0 if it was the first
        setCurrentSlide(Math.max(0, slideIndexToDelete - 1));
    } else if (currentSlide > slideIndexToDelete) {
        // If deleting a slide before the current one, decrement currentSlide index
        setCurrentSlide(prev => prev - 1);
    }
    
    // Clear any confirming state
    setConfirmingDelete(prev => {
      const newState = {...prev};
      delete newState[`slide-${slideIndexToDelete}`];
      return newState;
    });
  };

  // --- New: Slide Position Setting Function --- 
  const handleSetSlidePositionClick = (slideIndex) => {
      // Calculate current 1-based position (excluding cover)
      const currentPosition = slideIndex; // Since index 0 is cover, index 1 is position 1, etc.
      setEditingItemInfo({ type: 'slidePosition', slideIndex: slideIndex, actionType: 'edit' });
      setEditedItemPosition(currentPosition.toString()); // Initialize input with current position
      setEditedItemText(""); // Clear other fields
      setEditedItemGroup("");
      setEditedItemUrl("");
      setIsItemEditModalOpen(true);
  };

  // Generalized save function (needs modification for slide add)
  const handleSaveEdit = () => {
    if (!editingItemInfo) return;

    const { type, slideIndex, itemIndex, actionType } = editingItemInfo;

    // --- Validations --- 
    let isValid = true;
    let validationMessage = "";

    if (type === 'prompt') {
        if (editedItemText.trim() === "") { isValid = false; validationMessage = "프롬프트 내용이 비어있습니다."; }
    } else if (type === 'attachment') {
        if (editedItemText.trim() === "") { isValid = false; validationMessage = "첨부 파일 텍스트가 비어있습니다."; }
        const finalUrl = editedItemUrl.trim();
        if (finalUrl !== "") {
            try { new URL(finalUrl); } catch (e) { isValid = false; validationMessage = "유효하지 않은 URL 형식입니다."; }
        }
    } else if (type === 'slide') {
        if (editedItemText.trim() === "") { isValid = false; validationMessage = "슬라이드 제목이 비어있습니다."; }
        if (actionType === 'add' && editedItemGroup.trim() === "") {
             isValid = false; validationMessage = "그룹명이 비어있습니다.";
        }
    } else if (type === 'slidePosition') {
        const numSlides = promptData.slides.length;
        const targetPosition = parseInt(editedItemPosition, 10);
        if (isNaN(targetPosition) || targetPosition < 1 || targetPosition > numSlides - 1) { // Validate 1-based index range
             isValid = false; validationMessage = `유효하지 않은 위치입니다. 1부터 ${numSlides - 1} 사이의 숫자를 입력하세요.`;
        }
        if (isValid && targetPosition === slideIndex) { // No change needed, treat as valid but do nothing
            setIsItemEditModalOpen(false); 
            setEditingItemInfo(null);
            setEditedItemPosition("");
            return; 
        }
    }

    if (!isValid) {
        alert(validationMessage);
        return;
    }

    // --- State Update --- 
    let slideWasMoved = false;
    let originalIndex = -1;
    let targetIndexForSplice = -1; // Use 0-based index for splice operations
    let updatedDataForNavigation = null; // To get the latest length for navigation

    setPromptData(currentData => {
      const newData = JSON.parse(JSON.stringify(currentData)); 
      
      if (actionType === 'add') {
        if (type === 'prompt') {
            const targetSlide = newData.slides[slideIndex];
            if (!targetSlide.prompts) targetSlide.prompts = [];
            targetSlide.prompts.push({ text: editedItemText });
        } else if (type === 'attachment') {
             const targetSlide = newData.slides[slideIndex];
             if (!targetSlide.attachments) targetSlide.attachments = [];
             const finalUrl = editedItemUrl.trim();
             let newAttachment;
             if (finalUrl) { newAttachment = { type: 'url', text: editedItemText, url: finalUrl }; }
             else { newAttachment = { text: editedItemText }; }
             targetSlide.attachments.push(newAttachment);
        } else if (type === 'slide') {
             const newSlide = {
                 group: editedItemGroup.trim(),
                 title: editedItemText.trim(),
                 prompts: [],
                 attachments: []
             };
             newData.slides.push(newSlide);
        }
      } else if (actionType === 'edit') {
         if (type === 'slidePosition') {
             originalIndex = slideIndex; 
             targetIndexForSplice = parseInt(editedItemPosition, 10); 
             const slideToMove = newData.slides[originalIndex];
             
             if (slideToMove) {
                newData.slides.splice(originalIndex, 1); 
                newData.slides.splice(targetIndexForSplice, 0, slideToMove); 
                slideWasMoved = true;
             }
         } else { 
            const targetSlide = newData.slides[slideIndex];
            if (!targetSlide) return newData; 

            if (type === 'prompt') {
                 if (targetSlide.prompts?.[itemIndex]) {
                    targetSlide.prompts[itemIndex].text = editedItemText;
                 }
            } else if (type === 'attachment') {
                 if (targetSlide.attachments?.[itemIndex]) {
                     const originalAtt = targetSlide.attachments[itemIndex];
                     const finalUrl = editedItemUrl.trim();
                     if (typeof originalAtt === 'string') {
                         targetSlide.attachments[itemIndex] = editedItemText;
                     } else if (originalAtt.type === 'url') {
                         if (finalUrl) {
                            targetSlide.attachments[itemIndex] = { ...originalAtt, text: editedItemText, url: finalUrl };
                         } else {
                            targetSlide.attachments[itemIndex] = { text: editedItemText }; 
                         }
                     } else {
                         targetSlide.attachments[itemIndex] = { ...originalAtt, text: editedItemText };
                         if (targetSlide.attachments[itemIndex].url) delete targetSlide.attachments[itemIndex].url;
                     }
                 }
            } else if (type === 'slide') {
                targetSlide.title = editedItemText;
            }
         } 
      }
      updatedDataForNavigation = newData; // Capture the latest data reference
      return newData;
    });

    // --- Post State Update (now inside the function scope) --- 
    if (slideWasMoved) {
        setCurrentSlide(prevCurrentSlide => {
            let newCurrentSlideIndex = prevCurrentSlide;
            if (prevCurrentSlide === originalIndex) {
                newCurrentSlideIndex = targetIndexForSplice;
            } else {
                if (originalIndex < prevCurrentSlide && targetIndexForSplice >= prevCurrentSlide) {
                    newCurrentSlideIndex--;
                } else if (originalIndex > prevCurrentSlide && targetIndexForSplice <= prevCurrentSlide) {
                    newCurrentSlideIndex++;
                }
            }
            return newCurrentSlideIndex;
        });
    }

    // Close modal and reset state
    setIsItemEditModalOpen(false);
    setEditingItemInfo(null);
    setEditedItemText("");
    setEditedItemGroup("");
    setEditedItemUrl("");
    setEditedItemPosition(""); 

    // Navigate to newly added slide (use captured data for length)
    if (actionType === 'add' && type === 'slide' && updatedDataForNavigation) {
       setCurrentSlide(updatedDataForNavigation.slides.length - 1);
    }
  };

  const renderSlideList = () => {
    const groups = {};
    // We need the original index mapping preserved for moving, so use map with index
    const slidesWithOriginalIndex = promptData.slides.map((slide, index) => ({ ...slide, originalIndex: index }));

    slidesWithOriginalIndex.forEach((slide) => {
      if (!groups[slide.group]) { groups[slide.group] = []; }
      groups[slide.group].push(slide);
    });

    return (
      <>
        {Object.entries(groups).map(([groupName, slidesInGroup]) => {
          let slideCounter = 1;
          return (
            <div key={groupName} className="slide-group">
              <div className="group-header">{groupName}</div>
              {slidesInGroup.map((slide) => {
                const { originalIndex } = slide; // Get the index from the mapped object
                const canEditOrDelete = isEditMode && originalIndex !== 0;

                return (
                  <div
                    key={originalIndex} // Use original index for key
                    className={`slide-item ${currentSlide === originalIndex ? 'current-slide' : ''} ${isEditMode ? 'edit-mode' : ''}`}
                    onClick={(e) => {
                      if (isEditMode && e.target.closest('.slide-actions button')) return;
                      setCurrentSlide(originalIndex);
                      setShowAuthCenter(false);
                    }}
                  >
                    <span className="slide-number">{groupName === "표지" ? "" : slideCounter++}</span>
                    <span className="slide-title">{slide.title}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* Add Slide Button */}
        {isEditMode && (
          <div style={{ padding: '15px' }}> 
            <button className="add-slide-btn" onClick={handleAddSlide}>
                + 새 슬라이드 추가
            </button>
          </div>
        )}
      </>
    );
  };

  // --- New: Data Import/Export Functions ---
  const handleExportData = () => {
    try {
      const jsonString = JSON.stringify(promptData, null, 2); // Pretty print JSON
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Suggest a filename (e.g., prompts-backup-YYYY-MM-DD.json)
      const date = new Date();
      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      link.download = `prompts-backup-${dateString}.json`;
      document.body.appendChild(link); // Required for Firefox
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("데이터 내보내기 중 오류가 발생했습니다.");
    }
  };

  const handleImportClick = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  const handleImportFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error("File content is not text");
        
        const importedData = JSON.parse(text);

        // Basic Validation
        if (!importedData || !Array.isArray(importedData.slides)) {
           throw new Error("Invalid data format: Missing 'slides' array.");
        }

        // Confirmation
        if (window.confirm("현재 데이터를 가져온 데이터로 덮어쓰시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
            // Further validation could be added here (e.g., check structure of each slide)
            setPromptData(importedData);
            setCurrentSlide(0); // Reset to first slide after import
            alert("데이터를 성공적으로 가져왔습니다.");
        }
      } catch (error) {
        console.error("Error importing data:", error);
        alert(`데이터 가져오기 중 오류가 발생했습니다: ${error.message}`);
      } finally {
         // Reset file input value to allow importing the same file again
         if (fileInputRef.current) {
            fileInputRef.current.value = "";
         }
      }
    };
    reader.onerror = (e) => {
        console.error("Error reading file:", e);
        alert("파일을 읽는 중 오류가 발생했습니다.");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    reader.readAsText(file);
  };

  // Function to calculate appropriate textarea rows based on content length
  const calculateTextareaRows = (text) => {
    if (!text) return 4; // Default minimum rows
    
    // Count line breaks
    const lineBreaks = (text.match(/\n/g) || []).length;
    
    // Estimate rows based on text length and line breaks
    // Assume approximately 80 chars per line
    const estimatedRows = Math.max(
      4, // Minimum 4 rows
      lineBreaks + 1, // At least one row per line break plus one
      Math.ceil(text.length / 80) // Estimate based on character count
    );
    
    // Cap at a reasonable maximum
    return Math.min(estimatedRows, 20);
  };

  // Top bar navigation handler
  const handleTopNavigation = (destination) => {
    if (destination === 'home') {
      setCurrentSlide(0);
      setShowAuthCenter(false);
    } else if (destination === 'edit') {
      toggleEditMode();
    } else if (destination === 'import') {
      handleImportClick();
    } else if (destination === 'export') {
      handleExportData();
    } else if (destination === 'help') {
      restartTutorial();
    }
  };

  return (
    <div className="app">
      {/* Hidden file input for import */}
      <input 
         type="file" 
         ref={fileInputRef} 
         style={{ display: 'none' }} 
         accept=".json,application/json" 
         onChange={handleImportFileChange} 
      />

      {/* Top Navigation Bar */}
      <div className="top-navbar">
        <div className="top-navbar-left">
          <button 
            className="top-nav-btn" 
            onClick={() => handleTopNavigation('home')}
            title="홈으로"
          >
            <Home size={20} />
          </button>
          <h1 className="top-nav-title">프롬프트 관리자</h1>
        </div>
        <div className="top-navbar-right">
          <button 
            className={`top-nav-btn ${isEditMode ? 'active' : ''}`}
            onClick={() => handleTopNavigation('edit')}
            title={isEditMode ? "편집 모드 끄기" : "편집 모드 켜기"}
          >
            <Edit size={20} />
          </button>
          <button 
            className="top-nav-btn" 
            onClick={() => handleTopNavigation('import')}
            title="데이터 가져오기"
          >
            <Upload size={20} />
          </button>
          <button 
            className="top-nav-btn" 
            onClick={() => handleTopNavigation('export')}
            title="데이터 내보내기"
          >
            <Download size={20} />
          </button>
          <button 
            className="top-nav-btn" 
            onClick={() => handleTopNavigation('help')}
            title="도움말"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </div>

      {currentSlide === 1 && !tutorialCompleted && (
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
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude</a>
            </div>
          </div>

          <ul className={`slide-list ${!isTOCOpen ? 'hidden' : ''}`}>
            
            <div className="auth-center">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setShowAuthCenter(true);
              }}>
                ChatGPT 인증번호 확인
              </a>
            </div>

            <div className="auth-center">
              <a href="https://drive.google.com/file/d/1IxU-pu26aZxmdTfPNLaGd8YwdhftxW0m/view?usp=sharing" 
                 target="_blank" 
                 rel="noopener noreferrer">
                실습파일 다운로드
              </a>
            </div>

            {renderSlideList()} {/* This now returns the list AND the add button */}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'with-sidebar' : 'no-sidebar'}`}>
        {showAuthCenter ? (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              padding: '12px', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#242842',
              borderRadius: '12px 12px 0 0',
              marginBottom: '1px'
            }}>
              <h2 style={{ margin: 0, color: 'white', fontSize: '1.2rem' }}>ChatGPT 인증번호 확인</h2>
              <button 
                onClick={() => setShowAuthCenter(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                돌아가기
              </button>
            </div>
            <iframe 
              src="https://aikey.app.whouse.kr/" 
              title="ChatGPT 인증센터"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '0 0 12px 12px',
                flex: 1
              }}
            />
          </div>
        ) : (
          <>
            <div className="slide-nav">
              <div className="tab-list">
                {Object.values(promptData.slides.reduce((groups, slide, index) => {
                  const originalIndex = index; // Use index directly as it's the original index here
                  if (!groups[slide.group]) {
                    groups[slide.group] = { group: slide.group, slides: [] };
                  }
                  groups[slide.group].slides.push({ slide, index: originalIndex });
                  return groups;
                }, {})).map(({ group, slides }) => {
                   const getShortGroupName = (name) => {
                      if (name === "표지") return "표지";
                      if (name === "기본 기능 실습") return "기본";
                      if (name === "프롬프트 실습") return "프롬프트";
                      if (name === "다양한 모델 활용 실습") return "모델활용";
                      if (name === "분야별 전문 생성AI") return "전문AI";
                      if (name === "GPT 맞춤 챗봇 제작") return "챗봇";
                      if (name.startsWith("부록")) return name;
                      return name;
                    };
                  const isActive = slides.some(({ index }) => index === currentSlide);
                  return (
                    <button
                      key={group}
                      className={`tab-button ${isActive ? 'active' : ''}`}
                      onClick={() => { setCurrentSlide(slides[0].index); setShowAuthCenter(false); }}
                    >
                      {getShortGroupName(group)}
                    </button>
                  );
                })}
              </div>
              <div className="slide-buttons">
                {Object.values(promptData.slides.reduce((groups, slide, index) => {
                   const originalIndex = index;
                   if (!groups[slide.group]) {
                     groups[slide.group] = { group: slide.group, slides: [] };
                   }
                   groups[slide.group].slides.push({ slide, index: originalIndex });
                   return groups;
                 }, {})).map(({ group, slides }, groupIndex) => { // Use groupIndex for numbering
                   const isActive = slides.some(({ index }) => index === currentSlide);
                   if (!isActive) return null;
                   const groupStartIndex = promptData.slides.findIndex(s => s.group === group); // Find start index of the group in original data
                   const groupNumber = promptData.slides.reduce((acc, s, idx) => { // Calculate group number based on unique groups before it
                        if (idx <= groupStartIndex && !acc.groups.includes(s.group)) {
                            acc.groups.push(s.group);
                            acc.count++;
                        }
                        return acc;
                    }, { count: 0, groups: [] }).count;


                   return (
                     <div key={group} className="button-group">
                       {slides.map(({ slide, index }) => ( // index is original index
                         <button
                           key={index}
                           className={`slide-nav-button ${currentSlide === index ? 'active' : ''}`}
                           onClick={() => { setCurrentSlide(index); setShowAuthCenter(false); }}
                         >
                           {group === "표지" ? "" : `${groupNumber}-${slides.findIndex(s => s.index === index) + 1}`}
                         </button>
                       ))}
                     </div>
                   );
                 })}
              </div>
              
              {isEditMode && (
                <div className="edit-mode-controls">
                  <button
                    className={`view-toggle-btn ${showAllSlides ? 'active' : ''}`}
                    onClick={() => setShowAllSlides(!showAllSlides)}
                  >
                    {showAllSlides ? '단일 슬라이드 보기' : '모든 슬라이드 보기'}
                  </button>
                </div>
              )}
            </div>
            
            {currentSlide === 0 ? (
              <div className="cover-page">
                <h1 className="cover-title">{promptData.slides[0].title}</h1>
                <h2 className="cover-subtitle">{promptData.slides[0].content}</h2>
                <button 
                  className="start-button"
                  onClick={startTutorial}
                >
                  시작하기
                </button>
              </div>
            ) : isEditMode && showAllSlides ? (
              <div className="all-slides-view">
                {promptData.slides.filter((_, index) => index > 0).map((slide, idx) => {
                  const slideIndex = idx + 1; // Because we're filtering out the cover slide (index 0)
                  
                  return (
                    <div key={slideIndex} className="slide-edit-container" id={`slide-${slideIndex}`}>
                      <div className="slide-edit-header">
                        <h2 className="slide-edit-title">
                          {`${slideIndex}. ${slide.title}`}
                          <div className="slide-edit-actions">
                            <button 
                              className="edit-btn small-btn"
                              onClick={() => handleEditSlideTitle(slideIndex)}
                              title="제목 수정"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              className="set-pos-btn small-btn" 
                              onClick={() => handleSetSlidePositionClick(slideIndex)} 
                              title="위치 지정"
                            >
                              <Hash size={16} />
                            </button>
                            <button 
                              className="delete-btn small-btn" 
                              onClick={() => {
                                setConfirmingDelete(prev => ({
                                  ...prev,
                                  [`slide-${slideIndex}`]: true
                                }));
                              }}
                              title="슬라이드 삭제"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </h2>
                        {confirmingDelete[`slide-${slideIndex}`] && (
                          <div className="delete-confirmation small">
                            <span className="confirm-message">슬라이드를 삭제하시겠습니까?</span>
                            <div className="confirm-buttons">
                              <button className="confirm-yes" onClick={() => handleDeleteSlide(slideIndex)}>
                                네
                              </button>
                              <button 
                                className="confirm-no"
                                onClick={() => {
                                  setConfirmingDelete(prev => {
                                    const newState = {...prev};
                                    delete newState[`slide-${slideIndex}`];
                                    return newState;
                                  });
                                }}
                              >
                                아니오
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="slide-edit-content">
                        {/* Tools Section */}
                        {renderToolsSection(slide, slideIndex)}

                        {/* Prompts Section */}
                        {slide.prompts && (
                          <div className="prompts-section">
                            {slide.prompts.map((prompt, promptIndex) => (
                              <div key={promptIndex} className="prompt-card edit-mode">
                                <div className="flex">
                                  <div className="prompt-content-wrapper">
                                    <div className="prompt-number">{promptIndex + 1}</div>
                                    {editingPrompts[`${slideIndex}-${promptIndex}`] ? (
                                      <textarea
                                        className="prompt-content editable"
                                        value={prompt.text}
                                        onChange={(e) => {
                                          setPromptData(currentData => {
                                            const newData = JSON.parse(JSON.stringify(currentData));
                                            newData.slides[slideIndex].prompts[promptIndex].text = e.target.value;
                                            return newData;
                                          });
                                        }}
                                        onBlur={() => {
                                          setEditingPrompts(prev => {
                                            const newState = {...prev};
                                            delete newState[`${slideIndex}-${promptIndex}`];
                                            return newState;
                                          });
                                        }}
                                        autoFocus
                                        rows={calculateTextareaRows(prompt.text)}
                                      />
                                    ) : (
                                      <div 
                                        className="prompt-content"
                                        onClick={() => {
                                          setEditingPrompts(prev => ({
                                            ...prev,
                                            [`${slideIndex}-${promptIndex}`]: true
                                          }));
                                        }}
                                      >
                                        {prompt.text}
                                      </div>
                                    )}
                                  </div>
                                  <div className="prompt-edit-buttons">
                                    {confirmingDelete[`${slideIndex}-${promptIndex}`] ? (
                                      <div className="delete-confirmation">
                                        <span className="confirm-message">삭제하시겠습니까?</span>
                                        <div className="confirm-buttons">
                                          <button 
                                            className="confirm-yes"
                                            onClick={() => handleDeletePrompt(slideIndex, promptIndex)}
                                          >
                                            네
                                          </button>
                                          <button 
                                            className="confirm-no"
                                            onClick={() => {
                                              setConfirmingDelete(prev => {
                                                const newState = {...prev};
                                                delete newState[`${slideIndex}-${promptIndex}`];
                                                return newState;
                                              });
                                            }}
                                          >
                                            아니오
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <button 
                                        className="delete-btn" 
                                        onClick={() => {
                                          setConfirmingDelete(prev => ({
                                            ...prev,
                                            [`${slideIndex}-${promptIndex}`]: true
                                          }));
                                        }}
                                      >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        삭제하기
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                            {/* Add Prompt Button */}
                            <button className="add-prompt-btn" onClick={() => handleAddPrompt(slideIndex)}>
                              + 프롬프트 추가
                            </button>
                          </div>
                        )}

                        {/* Attachments Section */}
                        {slide.attachments && (
                          <div className="attachments edit-mode">
                            <div>
                              <strong>첨부 파일:</strong>
                              <div className="attachment-edit-buttons">
                                <button className="edit-btn" onClick={() => handleAddAttachment(slideIndex)}>+ 추가</button>
                              </div>
                            </div>
                            {slide.attachments.map((attachment, attachmentIndex) => (
                              <div key={attachmentIndex} className="attachment-item">
                                <div className="attachment-content">
                                  {editingAttachments[`${slideIndex}-${attachmentIndex}`] ? (
                                    <div className="attachment-inline-edit">
                                      <textarea 
                                        value={editedAttachmentText}
                                        onChange={(e) => setEditedAttachmentText(e.target.value)}
                                        rows={3}
                                        className="attachment-edit-textarea"
                                        autoFocus
                                        onBlur={() => {
                                          if (editedAttachmentText.trim() !== "") {
                                            // Save the edited attachment text
                                            setPromptData(currentData => {
                                              const newData = JSON.parse(JSON.stringify(currentData));
                                              const targetAttachment = newData.slides[slideIndex].attachments[attachmentIndex];
                                              
                                              if (typeof targetAttachment === 'string') {
                                                newData.slides[slideIndex].attachments[attachmentIndex] = editedAttachmentText;
                                              } else if (targetAttachment.type === 'url') {
                                                targetAttachment.text = editedAttachmentText;
                                              } else {
                                                targetAttachment.text = editedAttachmentText;
                                              }
                                              
                                              return newData;
                                            });
                                          }
                                          
                                          // Exit edit mode for this attachment
                                          setEditingAttachments(prev => {
                                            const newState = {...prev};
                                            delete newState[`${slideIndex}-${attachmentIndex}`];
                                            return newState;
                                          });
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Escape') {
                                            // Cancel editing
                                            setEditingAttachments(prev => {
                                              const newState = {...prev};
                                              delete newState[`${slideIndex}-${attachmentIndex}`];
                                              return newState;
                                            });
                                          }
                                        }}
                                      />
                                      {typeof attachment !== 'string' && attachment.type === 'url' && (
                                        <div className="url-field">
                                          <input 
                                            type="url"
                                            placeholder="URL"
                                            value={attachment.url || ""}
                                            onChange={(e) => {
                                              setPromptData(currentData => {
                                                const newData = JSON.parse(JSON.stringify(currentData));
                                                newData.slides[slideIndex].attachments[attachmentIndex].url = e.target.value;
                                                return newData;
                                              });
                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div 
                                      onClick={() => {
                                        // Prepare text for editing
                                        let textToEdit = "";
                                        if (typeof attachment === 'string') {
                                          textToEdit = attachment;
                                        } else if (attachment.type === 'url' || attachment.text) {
                                          textToEdit = attachment.text || "";
                                        } else {
                                          textToEdit = JSON.stringify(attachment);
                                        }
                                        
                                        setEditedAttachmentText(textToEdit);
                                        
                                        // Enter edit mode for this attachment
                                        setEditingAttachments(prev => ({
                                          ...prev,
                                          [`${slideIndex}-${attachmentIndex}`]: true
                                        }));
                                      }}
                                    >
                                      {typeof attachment === 'string' ? (
                                        attachment
                                      ) : attachment.type === 'url' ? (
                                        <div>
                                          {attachment.text}{' '}
                                          <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">
                                            바로가기
                                          </a>
                                        </div>
                                      ) : (
                                        attachment.text || JSON.stringify(attachment)
                                      )}
                                    </div>
                                  )}
                                </div>
                                {!editingAttachments[`${slideIndex}-${attachmentIndex}`] && (
                                  <div className="attachment-item-edit-buttons">
                                    {confirmingDelete[`attachment-${slideIndex}-${attachmentIndex}`] ? (
                                      <div className="delete-confirmation small">
                                        <span className="confirm-message">삭제하시겠습니까?</span>
                                        <div className="confirm-buttons">
                                          <button 
                                            className="confirm-yes"
                                            onClick={() => handleDeleteAttachment(slideIndex, attachmentIndex)}
                                          >
                                            네
                                          </button>
                                          <button 
                                            className="confirm-no"
                                            onClick={() => {
                                              setConfirmingDelete(prev => {
                                                const newState = {...prev};
                                                delete newState[`attachment-${slideIndex}-${attachmentIndex}`];
                                                return newState;
                                              });
                                            }}
                                          >
                                            아니오
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <button 
                                        className="delete-btn small-btn" 
                                        onClick={() => {
                                          setConfirmingDelete(prev => ({
                                            ...prev,
                                            [`attachment-${slideIndex}-${attachmentIndex}`]: true
                                          }));
                                        }}
                                      >
                                        삭제
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="slide-edit-separator"></div>
                    </div>
                  );
                })}
                
                <div className="slide-add-container">
                  <button className="add-slide-btn-large" onClick={handleAddSlide}>
                    + 새 슬라이드 추가
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 
                  className={`slide-title-main ${isEditMode && currentSlide !== 0 ? 'editable-title' : ''}`}
                >
                  {isEditMode && currentSlide !== 0 && isEditingTitle ? (
                    <input
                      type="text"
                      className="title-edit-input"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      onBlur={() => {
                        if (editedTitle.trim() !== "") {
                          // Save the edited title
                          setPromptData(currentData => {
                            const newData = JSON.parse(JSON.stringify(currentData));
                            newData.slides[currentSlide].title = editedTitle;
                            return newData;
                          });
                        }
                        setIsEditingTitle(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.target.blur(); // Trigger the blur event to save
                        } else if (e.key === 'Escape') {
                          setIsEditingTitle(false); // Cancel editing
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <span
                      className="title-text"
                      onClick={() => {
                        if (isEditMode && currentSlide !== 0) {
                          setEditedTitle(promptData.slides[currentSlide].title);
                          setIsEditingTitle(true);
                        }
                      }}
                    >
                      {`${currentSlide}. `}{promptData.slides[currentSlide]?.title}
                    </span>
                  )}
                  
                  {isEditMode && currentSlide !== 0 && (
                    <div className="slide-main-actions">
                      <button 
                        className="set-pos-btn small-btn" 
                        onClick={() => handleSetSlidePositionClick(currentSlide)} 
                        title="위치 지정"
                      >
                        <Hash size={18} />
                      </button>
                      {confirmingDelete[`slide-${currentSlide}`] ? (
                        <div className="delete-confirmation small">
                          <span className="confirm-message">슬라이드를 삭제하시겠습니까?</span>
                          <div className="confirm-buttons">
                            <button 
                              className="confirm-yes"
                              onClick={() => handleDeleteSlide(currentSlide)}
                            >
                              네
                            </button>
                            <button 
                              className="confirm-no"
                              onClick={() => {
                                setConfirmingDelete(prev => {
                                  const newState = {...prev};
                                  delete newState[`slide-${currentSlide}`];
                                  return newState;
                                });
                              }}
                            >
                              아니오
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          className="delete-btn small-btn delete-slide-btn" 
                          onClick={() => {
                            setConfirmingDelete(prev => ({
                              ...prev,
                              [`slide-${currentSlide}`]: true
                            }));
                          }}
                          title="슬라이드 삭제"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  )}
                </h1>
                <div className="space-y-6">
                  {/* Tools Section */}
                  {currentSlide > 0 && renderToolsSection(promptData.slides[currentSlide], currentSlide)}

                  {/* Prompts Section */}
                  {promptData.slides[currentSlide]?.prompts.map((prompt, promptIndex) => (
                    <div key={promptIndex} className={`prompt-card ${isEditMode ? 'edit-mode' : ''}`}>
                      <div className="flex">
                        <div className="prompt-content-wrapper">
                          <div className="prompt-number">{promptIndex + 1}</div>
                          {isEditMode && editingPrompts[`${currentSlide}-${promptIndex}`] ? (
                            <textarea
                              className="prompt-content editable"
                              value={prompt.text}
                              onChange={(e) => {
                                setPromptData(currentData => {
                                  const newData = JSON.parse(JSON.stringify(currentData));
                                  newData.slides[currentSlide].prompts[promptIndex].text = e.target.value;
                                  return newData;
                                });
                              }}
                              onBlur={() => {
                                // Exit edit mode for this prompt when lost focus
                                setEditingPrompts(prev => {
                                  const newState = {...prev};
                                  delete newState[`${currentSlide}-${promptIndex}`];
                                  return newState;
                                });
                              }}
                              autoFocus
                              rows={calculateTextareaRows(prompt.text)}
                            />
                          ) : (
                            <div 
                              className="prompt-content"
                              onClick={() => {
                                if (isEditMode) {
                                  // Enter edit mode for this prompt
                                  setEditingPrompts(prev => ({
                                    ...prev,
                                    [`${currentSlide}-${promptIndex}`]: true
                                  }));
                                }
                              }}
                            >
                              {prompt.text}
                            </div>
                          )}
                        </div>
                        {isEditMode ? (
                          <div className="prompt-edit-buttons">
                            {confirmingDelete[`${currentSlide}-${promptIndex}`] ? (
                              <div className="delete-confirmation">
                                <span className="confirm-message">삭제하시겠습니까?</span>
                                <div className="confirm-buttons">
                                  <button 
                                    className="confirm-yes"
                                    onClick={() => handleDeletePrompt(currentSlide, promptIndex)}
                                  >
                                    네
                                  </button>
                                  <button 
                                    className="confirm-no"
                                    onClick={() => {
                                      setConfirmingDelete(prev => {
                                        const newState = {...prev};
                                        delete newState[`${currentSlide}-${promptIndex}`];
                                        return newState;
                                      });
                                    }}
                                  >
                                    아니오
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button 
                                className="delete-btn" 
                                onClick={() => {
                                  setConfirmingDelete(prev => ({
                                    ...prev,
                                    [`${currentSlide}-${promptIndex}`]: true
                                  }));
                                }}
                              >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                삭제하기
                              </button>
                            )}
                          </div>
                        ) : (
                          <button className="copy-button" onClick={() => copyToClipboard(prompt.text)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            복사하기
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Prompt Button (Edit Mode Only) */}
                  {isEditMode && currentSlide > 0 && (
                    <button className="add-prompt-btn" onClick={() => handleAddPrompt(currentSlide)}>
                      + 프롬프트 추가
                    </button>
                  )}

                  {/* Attachments Section */}
                  {promptData.slides[currentSlide]?.attachments && (
                    <div className={`attachments ${isEditMode ? 'edit-mode' : ''}`}>
                      <div>
                          <strong>첨부 파일:</strong>
                          {isEditMode && (
                            <div className="attachment-edit-buttons">
                              {/* Connect Add Attachment button */}
                              <button className="edit-btn" onClick={() => handleAddAttachment(currentSlide)}>+ 추가</button>
                            </div>
                          )}
                      </div>
                      {promptData.slides[currentSlide].attachments.map((attachment, attachmentIndex) => (
                        <div key={attachmentIndex} className="attachment-item">
                          <div className="attachment-content">
                              {isEditMode && editingAttachments[`${currentSlide}-${attachmentIndex}`] ? (
                                <div className="attachment-inline-edit">
                                  <textarea 
                                    value={editedAttachmentText}
                                    onChange={(e) => setEditedAttachmentText(e.target.value)}
                                    rows={3}
                                    className="attachment-edit-textarea"
                                    autoFocus
                                    onBlur={() => {
                                      if (editedAttachmentText.trim() !== "") {
                                        // Save the edited attachment text
                                        setPromptData(currentData => {
                                          const newData = JSON.parse(JSON.stringify(currentData));
                                          const targetAttachment = newData.slides[currentSlide].attachments[attachmentIndex];
                                          
                                          if (typeof targetAttachment === 'string') {
                                            newData.slides[currentSlide].attachments[attachmentIndex] = editedAttachmentText;
                                          } else if (targetAttachment.type === 'url') {
                                            targetAttachment.text = editedAttachmentText;
                                          } else {
                                            targetAttachment.text = editedAttachmentText;
                                          }
                                          
                                          return newData;
                                        });
                                      }
                                      
                                      // Exit edit mode for this attachment
                                      setEditingAttachments(prev => {
                                        const newState = {...prev};
                                        delete newState[`${currentSlide}-${attachmentIndex}`];
                                        return newState;
                                      });
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Escape') {
                                        // Cancel editing
                                        setEditingAttachments(prev => {
                                          const newState = {...prev};
                                          delete newState[`${currentSlide}-${attachmentIndex}`];
                                          return newState;
                                        });
                                      }
                                    }}
                                  />
                                  {typeof attachment !== 'string' && attachment.type === 'url' && (
                                    <div className="url-field">
                                      <input 
                                        type="url"
                                        placeholder="URL"
                                        value={attachment.url || ""}
                                        onChange={(e) => {
                                          setPromptData(currentData => {
                                            const newData = JSON.parse(JSON.stringify(currentData));
                                            newData.slides[currentSlide].attachments[attachmentIndex].url = e.target.value;
                                            return newData;
                                          });
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div 
                                  onClick={() => {
                                    // Prepare text for editing
                                    let textToEdit = "";
                                    if (typeof attachment === 'string') {
                                      textToEdit = attachment;
                                    } else if (attachment.type === 'url' || attachment.text) {
                                      textToEdit = attachment.text || "";
                                    } else {
                                      textToEdit = JSON.stringify(attachment);
                                    }
                                    
                                    setEditedAttachmentText(textToEdit);
                                    
                                    // Enter edit mode for this attachment
                                    setEditingAttachments(prev => ({
                                      ...prev,
                                      [`${currentSlide}-${attachmentIndex}`]: true
                                    }));
                                  }}
                                >
                                  {typeof attachment === 'string' ? (
                                    attachment
                                  ) : attachment.type === 'url' ? (
                                    <div>
                                      {attachment.text}{' '}
                                      <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">
                                        바로가기
                                      </a>
                                    </div>
                                  ) : (
                                    attachment.text || JSON.stringify(attachment)
                                  )}
                                </div>
                              )}
                          </div>
                          {isEditMode && !editingAttachments[`${currentSlide}-${attachmentIndex}`] && (
                            <div className="attachment-item-edit-buttons">
                              {/* Delete button with confirmation */}
                              {confirmingDelete[`attachment-${currentSlide}-${attachmentIndex}`] ? (
                                <div className="delete-confirmation small">
                                  <span className="confirm-message">삭제하시겠습니까?</span>
                                  <div className="confirm-buttons">
                                    <button 
                                      className="confirm-yes"
                                      onClick={() => handleDeleteAttachment(currentSlide, attachmentIndex)}
                                    >
                                      네
                                    </button>
                                    <button 
                                      className="confirm-no"
                                      onClick={() => {
                                        setConfirmingDelete(prev => {
                                          const newState = {...prev};
                                          delete newState[`attachment-${currentSlide}-${attachmentIndex}`];
                                          return newState;
                                        });
                                      }}
                                    >
                                      아니오
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button 
                                  className="delete-btn small-btn" 
                                  onClick={() => {
                                    setConfirmingDelete(prev => ({
                                      ...prev,
                                      [`attachment-${currentSlide}-${attachmentIndex}`]: true
                                    }));
                                  }}
                                >
                                  삭제
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Attachment Indicator */}
                  {!isAttachmentVisible && promptData.slides[currentSlide]?.attachments && !isEditMode && (
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
          </>
        )}
      </div>

      {/* Unified Edit/Add Modal */}
      {isItemEditModalOpen && editingItemInfo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              {/* Adjust title for slide editing */}
              {editingItemInfo.type === 'prompt' ? '프롬프트' : 
               editingItemInfo.type === 'attachment' ? '첨부 파일' : '슬라이드'} 
              {editingItemInfo.actionType === 'add' ? ' 추가' : ' 수정'}
            </h2>
            
            {/* Conditional fields based on type and action */}
            {(editingItemInfo.type === 'prompt') ? (
              // Use Textarea for Prompt Edit
              <textarea
                value={editedItemText}
                onChange={(e) => setEditedItemText(e.target.value)}
                rows={10}
                style={{ width: '100%', minHeight: '150px', marginBottom: '1rem' }}
                placeholder="프롬프트 내용"
                autoFocus
              />
            ) : (editingItemInfo.type === 'attachment') ? (
              <>
                 <label style={{ marginBottom: '0.5rem', fontWeight: '500' }}>텍스트:</label>
                 <textarea
                   value={editedItemText}
                   onChange={(e) => setEditedItemText(e.target.value)}
                   rows={4}
                   style={{ width: '100%', minHeight: '80px', marginBottom: '1rem' }}
                   placeholder="표시될 텍스트"
                   autoFocus
                 />
                 {(editingItemInfo.actionType === 'add' || 
                  (editingItemInfo.actionType === 'edit' && 
                   promptData.slides[editingItemInfo.slideIndex]?.attachments[editingItemInfo.itemIndex]?.type === 'url')) && (
                    <>
                       <label style={{ marginBottom: '0.5rem', fontWeight: '500' }}>URL (선택 사항):</label>
                       <input
                         type="url" 
                         value={editedItemUrl}
                         onChange={(e) => setEditedItemUrl(e.target.value)}
                         style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '1rem' }}
                         placeholder="https://example.com (입력 시 링크 첨부파일로 저장)"
                       />
                    </>
                 )}
              </>
            ) : (editingItemInfo.type === 'slide') ? (
              <>
                {/* Group Name (only for Add) */} 
                {editingItemInfo.actionType === 'add' && (
                   <>
                       <label style={{ marginBottom: '0.5rem', fontWeight: '500' }}>그룹명:</label>
                       <input
                         type="text"
                         value={editedItemGroup}
                         onChange={(e) => setEditedItemGroup(e.target.value)}
                         style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '1rem' }}
                         placeholder="슬라이드가 속할 그룹 (예: 기본 기능)"
                         autoFocus
                       />
                   </>
                )}
                {/* Title (for Add and Edit) */} 
                <label style={{ marginBottom: '0.5rem', fontWeight: '500' }}>제목:</label>
                <textarea
                  value={editedItemText}
                  onChange={(e) => setEditedItemText(e.target.value)}
                  rows={2}
                  style={{ width: '100%', minHeight: '50px', marginBottom: '1rem' }}
                  placeholder="슬라이드 제목"
                  autoFocus={editingItemInfo.actionType === 'edit'} // Autofocus title on edit
                />
              </>
            ) : (editingItemInfo.type === 'slidePosition') ? (
              <>
                <label style={{ marginBottom: '0.5rem', fontWeight: '500' }}>
                    새 위치 (1 ~ {promptData.slides.length - 1}):
                </label>
                <input
                   type="number"
                   value={editedItemPosition}
                   onChange={(e) => setEditedItemPosition(e.target.value)}
                   min="1"
                   max={promptData.slides.length - 1}
                   step="1"
                   style={{ width: '100px', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '1rem' }}
                   autoFocus
                />
                <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '-0.5rem', marginBottom: '1rem' }}>
                    현재 슬라이드: '{promptData.slides[editingItemInfo.slideIndex]?.title}'
                </p>
              </>
            ) : null /* Should not happen */}

            <div className="modal-actions">
              <button onClick={handleSaveEdit} className="btn-primary"> 저장 </button>
              <button onClick={() => { setIsItemEditModalOpen(false); setEditingItemInfo(null); setEditedItemText(""); setEditedItemGroup(""); setEditedItemUrl(""); setEditedItemPosition(""); }} className="btn-secondary"> 취소 </button>
            </div>
          </div>
        </div>
      )}

      {false && tutorialCompleted && currentSlide > 0 && (
        <button className="restart-tutorial" onClick={restartTutorial}>
          <HelpCircle size={20} />
          튜토리얼 다시보기
        </button>
      )}
    </div>
  );
}

export default App; 