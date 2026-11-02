"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  FileCode,
  List,
  ListOrdered,
  Quote,
  Minus,
  Eraser,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  ChevronDown,
  Upload,
} from "lucide-react";
import { useState, useRef } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Write your detailed technical audit content, engineering analysis, calculations, and statutory recommendations here...",
}: RichTextEditorProps) {
  // Modal states
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageTab, setImageTab] = useState<"file" | "url">("file");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const inlineFileInputRef = useRef<HTMLInputElement>(null);

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        link: {
          openOnClick: false,
          HTMLAttributes: {
            class: "text-emerald-700 underline font-semibold hover:text-emerald-800",
            rel: "noopener noreferrer",
            target: "_blank",
          },
        },
        underline: {},
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-xl border border-slate-200 shadow-sm my-4 max-w-full h-auto",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap min-h-[420px] p-5 sm:p-6 focus:outline-none text-slate-800",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[420px] rounded-2xl border border-slate-200 bg-slate-50/50 p-6 animate-pulse flex items-center justify-center text-xs text-slate-400">
        Initializing Rich Text Editor...
      </div>
    );
  }

  // Determine current active block type
  const getCurrentBlockType = (): string => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    if (editor.isActive("heading", { level: 4 })) return "h4";
    if (editor.isActive("heading", { level: 5 })) return "h5";
    if (editor.isActive("heading", { level: 6 })) return "h6";
    if (editor.isActive("paragraph")) return "p";
    return "p";
  };

  const setBlockType = (type: string) => {
    if (type === "p") {
      editor.chain().focus().setParagraph().run();
    } else if (type.startsWith("h")) {
      const level = parseInt(type.replace("h", ""), 10) as HeadingLevel;
      if (level >= 1 && level <= 6) {
        editor.chain().focus().toggleHeading({ level }).run();
      }
    }
  };

  const handleInlineFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setUploadedPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImage = () => {
    const src = imageTab === "file" ? uploadedPreview : imageUrl.trim();
    if (src) {
      editor
        .chain()
        .focus()
        .setImage({
          src,
          alt: imageAlt.trim() || "Technical audit illustration",
        })
        .run();
      setImageUrl("");
      setImageAlt("");
      setUploadedPreview(null);
      setShowImageModal(false);
    }
  };

  const setLink = () => {
    if (linkUrl.trim()) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl.trim() }).run();
      setLinkUrl("");
      setShowLinkModal(false);
    } else {
      editor.chain().focus().unsetLink().run();
      setShowLinkModal(false);
    }
  };

  const clearFormatting = () => {
    editor.chain().focus().unsetAllMarks().clearNodes().run();
  };

  const currentBlock = getCurrentBlockType();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
      {/* ── Toolbar Header ── */}
      <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-slate-50/90 border-b border-slate-200 text-slate-700">

        {/* ── 1. Block Format Dropdown (P + H1-H6) ── */}
        <div className="relative inline-flex items-center">
          <select
            value={currentBlock}
            onChange={(e) => setBlockType(e.target.value)}
            className="appearance-none h-8.5 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 cursor-pointer"
            aria-label="Format Block Style"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1 (H1)</option>
            <option value="h2">Heading 2 (H2)</option>
            <option value="h3">Heading 3 (H3)</option>
            <option value="h4">Heading 4 (H4)</option>
            <option value="h5">Heading 5 (H5)</option>
            <option value="h6">Heading 6 (H6)</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-slate-400" />
        </div>

        <span className="h-5 w-px bg-slate-200 mx-1" />

        {/* ── 2. Inline Formatting: Bold, Italic, Underline, Strike, Code ── */}
        <div className="flex items-center rounded-xl border border-slate-200/90 bg-white p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
              editor.isActive("bold")
                ? "bg-[#053824] text-white shadow-2xs"
                : "hover:bg-slate-100 text-slate-700"
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
              editor.isActive("italic")
                ? "bg-[#053824] text-white shadow-2xs"
                : "hover:bg-slate-100 text-slate-700"
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
              editor.isActive("underline")
                ? "bg-[#053824] text-white shadow-2xs"
                : "hover:bg-slate-100 text-slate-700"
            }`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
              editor.isActive("strike")
                ? "bg-[#053824] text-white shadow-2xs"
                : "hover:bg-slate-100 text-slate-700"
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
              editor.isActive("code")
                ? "bg-[#053824] text-white shadow-2xs"
                : "hover:bg-slate-100 text-slate-700"
            }`}
            title="Inline Code"
          >
            <Code className="h-3.5 w-3.5" />
          </button>
        </div>

        <span className="h-5 w-px bg-slate-200 mx-0.5" />

        {/* ── 4. Lists & Quotes & Dividers ── */}
        <div className="flex items-center rounded-xl border border-slate-200/90 bg-white p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
              editor.isActive("bulletList")
                ? "bg-[#053824] text-white shadow-2xs"
                : "hover:bg-slate-100 text-slate-700"
            }`}
            title="Bullet List"
          >
            <List className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
              editor.isActive("orderedList")
                ? "bg-[#053824] text-white shadow-2xs"
                : "hover:bg-slate-100 text-slate-700"
            }`}
            title="Numbered List"
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
              editor.isActive("blockquote")
                ? "bg-[#053824] text-white shadow-2xs"
                : "hover:bg-slate-100 text-slate-700"
            }`}
            title="Quote Block"
          >
            <Quote className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
              editor.isActive("codeBlock")
                ? "bg-[#053824] text-white shadow-2xs"
                : "hover:bg-slate-100 text-slate-700"
            }`}
            title="Code Block (Multi-line)"
          >
            <FileCode className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="flex h-7.5 w-7.5 items-center justify-center rounded-lg text-xs hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            title="Horizontal Divider"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
        </div>

        <span className="h-5 w-px bg-slate-200 mx-0.5" />

        {/* ── 5. Clear Formatting ── */}
        <button
          type="button"
          onClick={clearFormatting}
          className="flex h-8.5 px-2.5 items-center gap-1 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-2xs transition-colors cursor-pointer"
          title="Clear all formatting from selection"
        >
          <Eraser className="h-3.5 w-3.5 text-slate-500" />
          <span className="hidden xl:inline text-[11px]">Clear</span>
        </button>

        {/* ── 6. Links & Media ── */}
        <div className="flex items-center gap-1 ml-1">
          <button
            type="button"
            onClick={() => {
              const previousUrl = editor.getAttributes("link").href || "";
              setLinkUrl(previousUrl);
              setShowLinkModal(true);
            }}
            className={`flex h-8.5 items-center gap-1.5 px-2.5 rounded-xl border text-xs font-semibold shadow-2xs transition-colors cursor-pointer ${
              editor.isActive("link")
                ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
            }`}
            title="Insert or Edit Link"
          >
            <LinkIcon className="h-3.5 w-3.5 text-emerald-700" />
            <span className="text-[11px]">Link</span>
          </button>

          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            className="flex h-8.5 items-center gap-1.5 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            title="Insert Image (Local File or URL)"
          >
            <ImageIcon className="h-3.5 w-3.5 text-emerald-700" />
            <span className="text-[11px]">Image</span>
          </button>
        </div>

        {/* ── 7. History (Undo / Redo) ── */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white shadow-2xs transition-colors cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white shadow-2xs transition-colors cursor-pointer"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── Editor Canvas ── */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* ── Insert Image Modal (File Upload + URL with SEO Alt Text) ── */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Insert Image into Article
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add a diagram, thermal scan, or chart with descriptive alt-text for search indexing.
            </p>

            {/* Mode Tabs: File Upload vs URL */}
            <div className="flex rounded-xl bg-slate-100 p-1 mb-4">
              <button
                type="button"
                onClick={() => setImageTab("file")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  imageTab === "file"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setImageTab("url")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  imageTab === "url"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Image URL
              </button>
            </div>

            <div className="space-y-3.5">
              {imageTab === "file" ? (
                <div>
                  <input
                    ref={inlineFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleInlineFileSelect}
                    className="hidden"
                  />
                  {uploadedPreview ? (
                    <div className="rounded-xl border border-slate-200 p-2 flex items-center gap-3 bg-slate-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={uploadedPreview}
                        alt="Preview"
                        className="h-16 w-24 object-cover rounded-lg border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">Image loaded</p>
                        <button
                          type="button"
                          onClick={() => inlineFileInputRef.current?.click()}
                          className="text-[11px] font-semibold text-emerald-700 hover:underline cursor-pointer"
                        >
                          Change file
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => inlineFileInputRef.current?.click()}
                      className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-5 hover:bg-emerald-50/30 hover:border-emerald-300 transition-colors cursor-pointer"
                    >
                      <Upload className="h-6 w-6 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">
                        Click to select image from computer
                      </span>
                      <span className="text-[10.5px] text-slate-400">
                        PNG, JPG, WEBP, or SVG
                      </span>
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Image Web URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/audit-diagram.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  SEO Alt Text (Recommended)
                </label>
                <input
                  type="text"
                  placeholder="e.g. FLIR Thermography Scan of HT Switchgear at 11 kV"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={insertImage}
                  disabled={imageTab === "file" ? !uploadedPreview : !imageUrl.trim()}
                  className="rounded-xl bg-[#053824] hover:bg-emerald-900 disabled:opacity-40 px-4 py-1.5 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
                >
                  Insert Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Insert Link Modal ── */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-1">Insert Link</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter target URL (e.g. https://beeindia.gov.in or /services).
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Hyperlink URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={setLink}
                  className="rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-1.5 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
                >
                  Apply Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
