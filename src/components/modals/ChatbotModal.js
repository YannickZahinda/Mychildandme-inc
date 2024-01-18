import React, { Fragment, useEffect, useRef, useState } from 'react'
import 'src/public/css/chatbot/chatBot.css'
import 'src/public/css/chatbot/main.css'
import 'src/public/css/chatbot/timeline.css'
import 'src/public/css/chatbot/select2.min.css'
import { publicApi } from 'src/api/services'
import { FaMinus } from 'react-icons/fa'

const ChatbotModal = () => {
  const chatBodyRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [userMessage, setUserMessage] = useState('')
  const [chatbotState, setChatbotState] = useState(false)
  const [loadingState, setLoadingState] = useState(false)

  const handleUserInputChange = (e) => {
    setUserMessage(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEnterPress()
    }
  }

  const handleEnterPress = () => {
    handleUserSendMessage()
  }

  const handleUserSendMessage = () => {
    if (userMessage) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: 1,
          message: userMessage,
        },
      ])
      getResponse(userMessage)
      setUserMessage('')
    }
  }

  const getResponse = async (message) => {
    setLoadingState(true)
    try {
      const params = {
        message: message,
      }
      const response = await publicApi.getChatbotResponse({ params })
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: 2,
          message: response.result,
        },
      ])
      setLoadingState(false)
    } catch (err) {
      console.log(err)
      setLoadingState(false)
    }
  }

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages])

  return (
    <>
      <div className={chatbotState ? 'chat-screen' : 'chat-screen hide'}>
        <div className="chat-header">
          <div className="chat-header-title">Chat hỗ trợ</div>
          <div className="chat-header-option">
            <button className="p-0 bg-transparent border-0" onClick={() => setChatbotState(false)}>
              <FaMinus className="text-white" />
            </button>
          </div>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          <div className="chat-bubble you">Tôi có thể giúp gì cho bạn?</div>
          {messages && (
            <>
              {messages.map((mess, index) => (
                <Fragment key={index}>
                  {mess.type === 1 ? (
                    <>
                      <div className="chat-bubble me">
                        <div
                          id="textmt"
                          dangerouslySetInnerHTML={{
                            __html: mess.message,
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="chat-bubble you">
                        <div
                          id="textmt"
                          dangerouslySetInnerHTML={{
                            __html: mess.message,
                          }}
                        />
                      </div>
                    </>
                  )}
                </Fragment>
              ))}
            </>
          )}
          {loadingState && (
            <div class="chat-bubble you">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xlinkHref="http://www.w3.org/1999/xlink"
                style={{
                  margin: 'auto',
                  display: 'block',
                  shapeRendering: 'auto',
                  width: '43px',
                  height: '20px',
                }}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle cx="0" cy="44.1678" r="15" fill="#ffffff">
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                    repeatCount="indefinite"
                    values="57.5;42.5;57.5;57.5"
                    keyTimes="0;0.3;0.6;1"
                    dur="1s"
                    begin="-0.6s"
                  ></animate>
                </circle>{' '}
                <circle cx="45" cy="43.0965" r="15" fill="#ffffff">
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                    repeatCount="indefinite"
                    values="57.5;42.5;57.5;57.5"
                    keyTimes="0;0.3;0.6;1"
                    dur="1s"
                    begin="-0.39999999999999997s"
                  ></animate>
                </circle>{' '}
                <circle cx="90" cy="52.0442" r="15" fill="#ffffff">
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                    repeatCount="indefinite"
                    values="57.5;42.5;57.5;57.5"
                    keyTimes="0;0.3;0.6;1"
                    dur="1s"
                    begin="-0.19999999999999998s"
                  ></animate>
                </circle>
              </svg>
            </div>
          )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={userMessage}
            onChange={handleUserInputChange}
            onKeyDown={handleKeyPress}
            readOnly={loadingState}
          />
          <div className="input-action-icon">
            <a>
              <button
                onClick={handleUserSendMessage}
                className="border-0 bg-transparent"
                disabled={!userMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-send"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="chat-bot-icon" onClick={() => setChatbotState(!chatbotState)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-message-square animate"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-x "
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </>
  )
}

export default ChatbotModal
