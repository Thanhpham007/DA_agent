import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  BarChart2, 
  Tv, 
  ArrowUp, 
  Globe, 
  Code, 
  Video, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  Presentation, 
  ChevronDown, 
  Check, 
  Sparkles, 
  Terminal, 
  Bookmark, 
  Download, 
  RefreshCw,
  Eye,
  FileText
} from 'lucide-react';
import { ChatMessage, UploadedFile, ArtifactItem } from '@da-agent/shared';

interface WorkspaceViewProps {
  onOpenUpgrade: () => void;
  onSaveToLibrary: (artifact: ArtifactItem) => void;
  files: UploadedFile[];
  onUploadFile: (file: File) => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  onOpenUpgrade,
  onSaveToLibrary,
  files,
  onUploadFile,
}) => {
  const [promptText, setPromptText] = useState('');
  const [isReasoningActive, setIsReasoningActive] = useState(true);
  const [selectedModel, setSelectedModel] = useState('Julius 1.2 Lite');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [activeLayout, setActiveLayout] = useState<'default' | 'split'>('default');
  const [isProcessing, setIsProcessing] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Chat conversation history for current task
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const modelOptions = [
    { id: 'julius-1.2-lite', name: 'Julius 1.2 Lite', description: 'Fastest for data & reasoning (Default)', speed: 'Fast' },
    { id: 'claude-3-5', name: 'Claude 3.5 Sonnet', description: 'Best for long-context deep analysis', speed: 'Moderate' },
    { id: 'gpt-4o', name: 'GPT-4o Omnimodal', description: 'Multi-modal analysis & synthesis', speed: 'Moderate' },
    { id: 'deepseek-r1', name: 'DeepSeek R1', description: 'Advanced mathematical reasoning', speed: 'Detailed' },
  ];

  const handleSendPrompt = (overrideText?: string) => {
    const textToSend = overrideText || promptText;
    if (!textToSend.trim() && attachedFiles.length === 0) return;

    const userMsgId = `user-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      timestamp: 'Just now',
      text: textToSend,
      attachments: [...attachedFiles],
    };

    setMessages((prev) => [...prev, newMsg]);
    setPromptText('');
    setAttachedFiles([]);
    setIsProcessing(true);

    // Simulate intelligent data analysis / code execution response
    setTimeout(() => {
      const isChartRequested = 
        textToSend.toLowerCase().includes('chart') || 
        textToSend.toLowerCase().includes('visual') ||
        textToSend.toLowerCase().includes('report') ||
        textToSend.toLowerCase().includes('analysis') ||
        textToSend.toLowerCase().includes('revenue');

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        text: `I've analyzed your prompt regarding **${textToSend.slice(0, 45)}...**\n\nI inspected the data structure, performed outlier detection, and generated an interactive visualization summary.`,
        reasoning: isReasoningActive 
          ? `1. Parsed user request and evaluated schema compatibility.\n2. Ingested active dataframe (dimensions: 48,200 rows x 8 columns).\n3. Calculated grouped aggregations and month-over-month trend slopes.\n4. Formatted clean output representation with confidence intervals.`
          : undefined,
        isReasoningExpanded: true,
        code: `import pandas as pd
import numpy as np

# Load transaction data & aggregate monthly cohorts
df = pd.read_csv("ecommerce_orders_2024.csv")
df['created_at'] = pd.to_datetime(df['created_at'])
monthly = df.groupby(df['created_at'].dt.to_period('M'))['revenue'].agg(['sum', 'count', 'mean'])
print(monthly.head())`,
        codeOutput: `             sum  count        mean
2024-01  412,850   3200  129.015625
2024-02  489,120   3650  134.005479
2024-03  532,400   3910  136.163683
2024-04  614,200   4320  142.175926`,
        artifact: isChartRequested ? {
          type: 'chart',
          title: 'Monthly Revenue Growth & Customer Retention Curve',
        } : undefined,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsProcessing(false);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  const handleFileUploadTrigger = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onUploadFile(file);
      setAttachedFiles((prev) => [...prev, file.name]);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isProcessing]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto relative bg-[#fdfdfd]">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUploadTrigger}
        className="hidden"
        accept=".csv,.xlsx,.xls,.json,.parquet,.pdf,.txt"
      />

      {/* Main Container */}
      {messages.length === 0 ? (
        /* Empty State / Initial Prompt Workspace (Matches Image 3 perfectly) */
        <div className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-4xl mx-auto -mt-6">
          {/* Upgrade / Plan Notification Capsule */}
          <div className="mb-5 inline-flex items-center px-3.5 py-1 rounded-full border border-gray-200 bg-white shadow-2xs text-xs">
            <span className="text-gray-600 font-medium">Free plan</span>
            <span className="mx-2 text-gray-300">|</span>
            <button
              onClick={onOpenUpgrade}
              className="text-[#2563eb] hover:underline font-medium cursor-pointer"
            >
              Upgrade to get full powers
            </button>
          </div>

          {/* Main Heading Question */}
          <h1 className="text-3xl sm:text-[34px] font-semibold tracking-tight text-gray-900 mb-8 text-center">
            What can I do for you today?
          </h1>

          {/* Main Input Box Container */}
          <div 
            className="w-full bg-white border border-[#e2e8f0] rounded-2xl shadow-sm hover:border-gray-300 transition focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-400 p-3.5 pb-2.5 flex flex-col justify-between min-h-[140px]"
            data-purpose="chat-input-card"
          >
            {/* Attached file badges if any */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {attachedFiles.map((fn, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    <FileText className="w-3 h-3" />
                    <span>{fn}</span>
                    <button
                      onClick={() => setAttachedFiles(attachedFiles.filter((_, i) => i !== idx))}
                      className="text-blue-500 hover:text-blue-800 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Text Area Input */}
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full resize-none border-0 focus:ring-0 p-1 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none"
              placeholder="Research and build a report..."
              rows={2}
            />

            {/* Input Box Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-transparent">
              <div className="flex items-center space-x-1.5">
                {/* Add Attachment Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Add attachment"
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition cursor-pointer"
                  title="Attach CSV, Excel, or PDF"
                >
                  <Plus className="w-4 h-4 text-gray-600 stroke-[2.2]" />
                </button>

                {/* Reasoning Mode Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsReasoningActive(!isReasoningActive)}
                  className={`flex items-center space-x-1.5 px-2 py-1 text-xs rounded-md transition font-medium cursor-pointer ${
                    isReasoningActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Toggle step-by-step reasoning logs"
                >
                  <BarChart2 className={`w-3.5 h-3.5 ${isReasoningActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span>Reasoning</span>
                </button>

                {/* Computer / Canvas View Option */}
                <button
                  type="button"
                  onClick={() => setActiveLayout(activeLayout === 'default' ? 'split' : 'default')}
                  aria-label="Toggle layout"
                  className={`p-1.5 rounded-md transition cursor-pointer ${
                    activeLayout === 'split' ? 'bg-gray-200 text-gray-900' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title="Toggle layout view"
                >
                  <Tv className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                {/* Model Switcher Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                    className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition font-normal cursor-pointer"
                  >
                    <span>{selectedModel}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {isModelDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setIsModelDropdownOpen(false)} />
                      <div className="absolute right-0 bottom-full mb-1.5 w-64 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 z-40 text-xs">
                        <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                          Select AI Engine
                        </div>
                        {modelOptions.map((model) => (
                          <button
                            key={model.id}
                            onClick={() => {
                              setSelectedModel(model.name);
                              setIsModelDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-start justify-between transition-colors"
                          >
                            <div>
                              <div className="font-medium text-gray-800 flex items-center gap-1.5">
                                {model.name}
                                {selectedModel === model.name && <Check className="w-3 h-3 text-blue-600" />}
                              </div>
                              <div className="text-[11px] text-gray-500">{model.description}</div>
                            </div>
                            <span className="text-[10px] bg-gray-100 text-gray-600 px-1 rounded">
                              {model.speed}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Send Prompt Button */}
                <button
                  type="button"
                  onClick={() => handleSendPrompt()}
                  disabled={!promptText.trim() && attachedFiles.length === 0}
                  aria-label="Send message"
                  className={`w-7 h-7 flex items-center justify-center rounded-full transition shadow-xs cursor-pointer ${
                    promptText.trim() || attachedFiles.length > 0
                      ? 'bg-[#2563eb] hover:bg-blue-700 text-white'
                      : 'bg-[#8fa9f4] text-white opacity-90 cursor-not-allowed'
                  }`}
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Agent Pills / Shortcuts (Matches screenshot pills) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2" data-purpose="quick-actions">
            {/* Browser Agent Pill */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => handleSendPrompt("Run browser agent to research competitor pricing and summarize key findings.")}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-gray-50 shadow-2xs transition cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span className="font-medium">Browser Agent</span>
              </button>
              <span className="absolute -top-1.5 left-2 bg-[#2563eb] text-white text-[8px] font-bold px-1 rounded uppercase tracking-wider">
                New
              </span>
            </div>

            {/* Build Website Pill */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => handleSendPrompt("Build a responsive data dashboard website for marketing conversion rates.")}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-gray-50 shadow-2xs transition cursor-pointer"
              >
                <Code className="w-3.5 h-3.5 text-gray-500" />
                <span className="font-medium">Build Website</span>
              </button>
              <span className="absolute -top-1.5 left-2 bg-[#2563eb] text-white text-[8px] font-bold px-1 rounded uppercase tracking-wider">
                New
              </span>
            </div>

            {/* Video Pill */}
            <button
              type="button"
              onClick={() => handleSendPrompt("Analyze and summarize key takeaways from the video transcript.")}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-gray-50 shadow-2xs transition cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-medium">Video</span>
            </button>

            {/* Image Pill */}
            <button
              type="button"
              onClick={() => handleSendPrompt("Generate visual charts and high-resolution diagrams for our Q3 metrics.")}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-gray-50 shadow-2xs transition cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-medium">Image</span>
            </button>

            {/* Excel Pill */}
            <button
              type="button"
              onClick={() => handleSendPrompt("Process the Excel financial workbook and create pivot summaries.")}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-gray-50 shadow-2xs transition cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-medium">Excel</span>
            </button>

            {/* Slides Pill */}
            <button
              type="button"
              onClick={() => handleSendPrompt("Create a 5-slide executive presentation summarizing quarterly KPI performance.")}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-gray-50 shadow-2xs transition cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-medium">Slides</span>
            </button>

            {/* More Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-gray-50 shadow-2xs transition font-medium cursor-pointer"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {isMoreMenuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsMoreMenuOpen(false)} />
                  <div className="absolute left-0 bottom-full mb-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-40 text-xs">
                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        handleSendPrompt("Execute advanced Python statistical regression and correlation matrix.");
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                    >
                      Python Code Interpreter
                    </button>
                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        handleSendPrompt("Extract structured tables from attached PDF and export to CSV.");
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                    >
                      PDF & OCR Extractor
                    </button>
                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        handleSendPrompt("Draft SQL queries with index optimization for Postgres database.");
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                    >
                      SQL Query Generator
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Active Conversation Flow with Data Analysis and Artifacts */
        <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 sm:p-6 pb-36">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-800">Task Active</span>
              <span>•</span>
              <span>Model: {selectedModel}</span>
              <span>•</span>
              <span>Reasoning: {isReasoningActive ? 'On' : 'Off'}</span>
            </div>
            <button
              onClick={() => setMessages([])}
              className="text-xs text-gray-500 hover:text-gray-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset task</span>
            </button>
          </div>

          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-3">
                {/* User Message */}
                {msg.sender === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-[#f0f4fe] border border-blue-100 text-gray-900 rounded-2xl rounded-tr-xs px-4 py-3 max-w-2xl text-sm shadow-2xs">
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {msg.attachments.map((att, i) => (
                            <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-white text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                              <FileText className="w-3 h-3" />
                              {att}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Assistant Message */
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-[#175cd3] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      J
                    </div>
                    <div className="flex-1 space-y-4 text-sm text-gray-800">
                      {/* Reasoning Collapsible Block */}
                      {msg.reasoning && (
                        <details className="bg-gray-50/80 border border-gray-200/80 rounded-xl p-3 text-xs" open={msg.isReasoningExpanded}>
                          <summary className="font-medium text-gray-600 cursor-pointer flex items-center gap-2 select-none">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            <span>Thinking Process & Logic Trace</span>
                          </summary>
                          <div className="mt-2 text-gray-600 whitespace-pre-wrap font-mono text-[11px] bg-white p-2.5 rounded border border-gray-200/60">
                            {msg.reasoning}
                          </div>
                        </details>
                      )}

                      {/* Code Execution Block */}
                      {msg.code && (
                        <div className="rounded-xl border border-gray-200 bg-gray-950 text-gray-100 overflow-hidden text-xs">
                          <div className="flex items-center justify-between px-3 py-1.5 bg-gray-900 text-gray-400 font-mono text-[11px]">
                            <div className="flex items-center gap-1.5">
                              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                              <span>python_sandbox.py</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-medium">Executed in 0.18s</span>
                          </div>
                          <pre className="p-3 font-mono overflow-x-auto text-[11px] leading-relaxed text-blue-200">
                            {msg.code}
                          </pre>
                          {msg.codeOutput && (
                            <div className="border-t border-gray-800 bg-gray-900/90 p-2.5 font-mono text-[11px] text-gray-300">
                              <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Standard Output:</div>
                              <pre className="whitespace-pre">{msg.codeOutput}</pre>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Text content */}
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                      {/* Interactive Visual Artifact */}
                      {msg.artifact && (
                        <div className="border border-gray-200 rounded-2xl bg-white p-4 shadow-xs space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BarChart2 className="w-4 h-4 text-blue-600" />
                              <h4 className="font-semibold text-xs text-gray-900">{msg.artifact.title}</h4>
                            </div>
                            <button
                              onClick={() => onSaveToLibrary({
                                id: `art-${Date.now()}`,
                                title: msg.artifact!.title,
                                type: 'chart',
                                createdAt: 'Just now',
                                sourceTaskTitle: 'Interactive Workspace Analysis',
                                dataSummary: 'Monthly growth metrics and customer retention projections.'
                              })}
                              className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 font-medium cursor-pointer"
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>Save to Library</span>
                            </button>
                          </div>

                          {/* Rendered Chart Visual Mockup */}
                          <div className="h-44 w-full bg-linear-to-b from-blue-50/30 to-white rounded-xl border border-gray-100 p-3 flex flex-col justify-end">
                            <div className="grid grid-cols-6 gap-3 items-end h-28 px-4">
                              <div className="flex flex-col items-center gap-1 h-full justify-end">
                                <div className="w-full bg-blue-400 rounded-t h-[40%] transition-all hover:bg-blue-600"></div>
                                <span className="text-[10px] text-gray-500">Jan</span>
                              </div>
                              <div className="flex flex-col items-center gap-1 h-full justify-end">
                                <div className="w-full bg-blue-400 rounded-t h-[52%] transition-all hover:bg-blue-600"></div>
                                <span className="text-[10px] text-gray-500">Feb</span>
                              </div>
                              <div className="flex flex-col items-center gap-1 h-full justify-end">
                                <div className="w-full bg-blue-500 rounded-t h-[65%] transition-all hover:bg-blue-600"></div>
                                <span className="text-[10px] text-gray-500">Mar</span>
                              </div>
                              <div className="flex flex-col items-center gap-1 h-full justify-end">
                                <div className="w-full bg-blue-500 rounded-t h-[78%] transition-all hover:bg-blue-600"></div>
                                <span className="text-[10px] text-gray-500">Apr</span>
                              </div>
                              <div className="flex flex-col items-center gap-1 h-full justify-end">
                                <div className="w-full bg-blue-600 rounded-t h-[88%] transition-all hover:bg-blue-700"></div>
                                <span className="text-[10px] text-gray-500">May</span>
                              </div>
                              <div className="flex flex-col items-center gap-1 h-full justify-end">
                                <div className="w-full bg-[#175cd3] rounded-t h-[96%] transition-all hover:bg-blue-800"></div>
                                <span className="text-[10px] text-gray-700 font-semibold">Jun</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-gray-400 pt-2 border-t border-gray-100">
                              <span>Metric: Monthly Gross Revenue ($ thousands)</span>
                              <span className="text-emerald-600 font-medium">+28.4% MoM Acceleration</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isProcessing && (
              <div className="flex gap-3 items-center text-xs text-gray-500 animate-pulse">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  J
                </div>
                <span>Julius is analyzing data and computing statistics...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Floating Chat Input in Active Conversation */}
          <div className="fixed bottom-4 left-[260px] right-6 max-w-3xl mx-auto bg-white border border-gray-300 rounded-2xl shadow-lg p-2 z-20">
            <div className="flex items-center gap-2 px-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                title="Attach file"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
                placeholder="Ask a follow-up question or request new chart..."
                className="flex-1 border-0 focus:ring-0 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={() => handleSendPrompt()}
                disabled={!promptText.trim()}
                className={`p-1.5 rounded-full text-white ${
                  promptText.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
                }`}
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
