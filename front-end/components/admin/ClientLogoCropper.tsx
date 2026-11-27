"use client";

import { useState, useRef, useEffect } from "react";
import { Maximize2, Minimize2, RotateCcw, Move, Info } from "lucide-react";

export const TARGET_LOGO_WIDTH = 600;
export const TARGET_LOGO_HEIGHT = 240;
const PADDING_RATIO = 0.86; // Leaves 7% safe margin on each side in "fit" mode

export type LogoFitMode = "fit" | "cover";
export type LogoBgMode = "transparent" | "white";

export interface LogoCropSettings {
  fitMode: LogoFitMode;
  bgMode: LogoBgMode;
  zoom: number;
  offsetX: number; // Normalized -1..1 relative to frame width
  offsetY: number; // Normalized -1..1 relative to frame height
}

export const DEFAULT_CROP_SETTINGS: LogoCropSettings = {
  fitMode: "fit",
  bgMode: "transparent",
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
};

interface ClientLogoCropperProps {
  file: File;
  previewUrl: string;
  settings: LogoCropSettings;
  onChange: (next: LogoCropSettings) => void;
  onRemove: () => void;
}

/**
 * Computes draw rectangle inside a target canvas for either "fit" (contain with margin)
 * or "cover" (fill frame), plus zoom and normalized pan offsets.
 */
function computeDrawRect(
  imgWidth: number,
  imgHeight: number,
  canvasWidth: number,
  canvasHeight: number,
  settings: LogoCropSettings
) {
  const safeImgW = Math.max(1, imgWidth);
  const safeImgH = Math.max(1, imgHeight);

  const scaleX = canvasWidth / safeImgW;
  const scaleY = canvasHeight / safeImgH;
  const baseScale =
    settings.fitMode === "fit"
      ? Math.min(scaleX, scaleY) * PADDING_RATIO
      : Math.max(scaleX, scaleY);

  const finalScale = baseScale * settings.zoom;
  const drawW = safeImgW * finalScale;
  const drawH = safeImgH * finalScale;

  const x = (canvasWidth - drawW) / 2 + settings.offsetX * (canvasWidth * 0.5);
  const y = (canvasHeight - drawH) / 2 + settings.offsetY * (canvasHeight * 0.5);

  return { x, y, width: drawW, height: drawH };
}

/**
 * Renders the user-adjusted logo onto an exact 600x240 WebP (or PNG fallback) File.
 * SVG files are returned untouched so vector crispness is preserved.
 */
export async function renderCroppedLogoFile(
  file: File,
  previewUrl: string,
  settings: LogoCropSettings,
  clientName: string
): Promise<File> {
  if (file.type === "image/svg+xml") {
    return file;
  }

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new window.Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Could not read selected image file."));
    el.src = previewUrl;
  });

  const canvas = document.createElement("canvas");
  canvas.width = TARGET_LOGO_WIDTH;
  canvas.height = TARGET_LOGO_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context unavailable in this browser.");
  }

  if (settings.bgMode === "white") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, TARGET_LOGO_WIDTH, TARGET_LOGO_HEIGHT);
  } else {
    ctx.clearRect(0, 0, TARGET_LOGO_WIDTH, TARGET_LOGO_HEIGHT);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const rect = computeDrawRect(
    img.naturalWidth,
    img.naturalHeight,
    TARGET_LOGO_WIDTH,
    TARGET_LOGO_HEIGHT,
    settings
  );

  ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);

  const slug = (clientName || "client-logo")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "client-logo";

  const webpBlob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/webp", 0.9)
  );

  if (webpBlob && webpBlob.type === "image/webp") {
    return new File([webpBlob], `${slug}.webp`, { type: "image/webp" });
  }

  const pngBlob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png")
  );
  if (!pngBlob) {
    throw new Error("Failed to export cropped logo image.");
  }
  return new File([pngBlob], `${slug}.png`, { type: "image/png" });
}

/**
 * Interactive 5:2 (600x240) logo cropper and live homepage marquee card preview.
 */
export default function ClientLogoCropper({
  file,
  previewUrl,
  settings,
  onChange,
  onRemove,
}: ClientLogoCropperProps) {
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const dragStateRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    initOffsetX: number;
    initOffsetY: number;
  } | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const isSvg = file.type === "image/svg+xml";

  useEffect(() => {
    let active = true;
    const img = new window.Image();
    img.onload = () => {
      if (active) {
        setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
      }
    };
    img.src = previewUrl;
    return () => {
      active = false;
    };
  }, [previewUrl]);

  const ratioMismatch =
    naturalSize && !isSvg
      ? Math.abs(naturalSize.w / Math.max(1, naturalSize.h) - 2.5) > 0.6
      : false;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSvg) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStateRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      initOffsetX: settings.offsetX,
      initOffsetY: settings.offsetY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    const frame = frameRef.current;
    if (!drag?.active || !frame) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const halfW = Math.max(1, frame.clientWidth * 0.5);
    const halfH = Math.max(1, frame.clientHeight * 0.5);

    onChange({
      ...settings,
      offsetX: Math.max(-1.2, Math.min(1.2, drag.initOffsetX + dx / halfW)),
      offsetY: Math.max(-1.2, Math.min(1.2, drag.initOffsetY + dy / halfH)),
    });
  };

  const handlePointerUp = () => {
    dragStateRef.current = null;
  };

  // Compute CSS preview geometry matching canvas output exactly
  const previewStyle = (() => {
    if (isSvg || !naturalSize) {
      return undefined;
    }
    const rect = computeDrawRect(
      naturalSize.w,
      naturalSize.h,
      TARGET_LOGO_WIDTH,
      TARGET_LOGO_HEIGHT,
      settings
    );
    return {
      left: `${(rect.x / TARGET_LOGO_WIDTH) * 100}%`,
      top: `${(rect.y / TARGET_LOGO_HEIGHT) * 100}%`,
      width: `${(rect.width / TARGET_LOGO_WIDTH) * 100}%`,
      height: `${(rect.height / TARGET_LOGO_HEIGHT) * 100}%`,
    };
  })();

  return (
    <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/30 p-3.5 sm:p-4">
      {/* Dimensions & Aspect Ratio Notice */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
          <span>Homepage Card Preview</span>
          <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
            600 × 240 WebP
          </span>
        </div>
        {naturalSize && (
          <span className="text-[10.5px] text-slate-500">
            Original: {naturalSize.w} × {naturalSize.h} px
          </span>
        )}
      </div>

      {ratioMismatch && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600" />
          <span>
            Different aspect ratio detected. Use <strong>Fit</strong> (keeps whole logo) or{" "}
            <strong>Crop/Fill</strong> + drag &amp; zoom below to align cleanly.
          </span>
        </div>
      )}

      {/* Exact 5:2 Marquee Card Preview / Drag Frame */}
      <div className="flex justify-center py-1">
        <div
          ref={frameRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          title={isSvg ? "SVG logo preview" : "Drag to reposition logo inside card"}
          className={`relative w-full max-w-[300px] aspect-[5/2] overflow-hidden rounded-2xl border border-slate-200 shadow-xs select-none ${
            settings.bgMode === "white"
              ? "bg-white"
              : "bg-[linear-gradient(45deg,#f1f5f9_25%,transparent_25%),linear-gradient(-45deg,#f1f5f9_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f1f5f9_75%),linear-gradient(-45deg,transparent_75%,#f1f5f9_75%)] bg-[length:14px_14px] bg-[position:0_0,0_7px,7px_-7px,-7px_0] bg-white"
          } ${isSvg ? "" : "cursor-grab active:cursor-grabbing touch-none"}`}
        >
          {isSvg ? (
            <div className="flex h-full w-full items-center justify-center p-3">
              <img
                src={previewUrl}
                alt="Logo preview"
                className="max-h-full max-w-full object-contain pointer-events-none"
              />
            </div>
          ) : (
            <img
              src={previewUrl}
              alt="Logo preview"
              draggable={false}
              style={previewStyle}
              className="absolute max-w-none pointer-events-none"
            />
          )}

          {!isSvg && (
            <div className="pointer-events-none absolute bottom-1.5 right-2 inline-flex items-center gap-1 rounded-full bg-slate-900/65 px-2 py-0.5 text-[9.5px] font-medium text-white backdrop-blur-xs">
              <Move className="h-2.5 w-2.5" />
              <span>Drag</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Crop / Zoom / Background Controls (Raster images) */}
      {!isSvg && (
        <div className="space-y-2.5 rounded-xl border border-slate-200/80 bg-white p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Fit vs Fill toggle */}
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() =>
                  onChange({ ...settings, fitMode: "fit", zoom: 1, offsetX: 0, offsetY: 0 })
                }
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                  settings.fitMode === "fit"
                    ? "bg-white text-emerald-800 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Minimize2 className="h-3 w-3" />
                <span>Fit Whole</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  onChange({ ...settings, fitMode: "cover", zoom: 1, offsetX: 0, offsetY: 0 })
                }
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                  settings.fitMode === "cover"
                    ? "bg-white text-emerald-800 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Maximize2 className="h-3 w-3" />
                <span>Fill &amp; Crop</span>
              </button>
            </div>

            {/* Background mode toggle */}
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => onChange({ ...settings, bgMode: "transparent" })}
                className={`rounded-md px-2 py-1 transition-colors cursor-pointer ${
                  settings.bgMode === "transparent"
                    ? "bg-white text-emerald-800 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Transparent
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...settings, bgMode: "white" })}
                className={`rounded-md px-2 py-1 transition-colors cursor-pointer ${
                  settings.bgMode === "white"
                    ? "bg-white text-emerald-800 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                White BG
              </button>
            </div>
          </div>

          {/* Zoom slider + Reset */}
          <div className="flex items-center gap-3">
            <label className="text-[11px] font-semibold text-slate-600 shrink-0">
              Zoom {Math.round(settings.zoom * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.05"
              value={settings.zoom}
              onChange={(e) =>
                onChange({ ...settings, zoom: parseFloat(e.target.value) })
              }
              className="h-1.5 flex-1 accent-emerald-600 cursor-pointer"
            />
            <button
              type="button"
              onClick={() => onChange(DEFAULT_CROP_SETTINGS)}
              title="Reset crop & zoom"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-[10.5px] font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}

      {/* File info & Remove */}
      <div className="flex items-center justify-between gap-2 pt-0.5 text-[11px]">
        <span className="text-slate-500 truncate">
          {file.name} ({(file.size / 1024).toFixed(1)} KB)
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="font-semibold text-red-600 hover:text-red-700 shrink-0 cursor-pointer"
        >
          Change file
        </button>
      </div>
    </div>
  );
}

