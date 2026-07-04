import * as React from "react";
import {
  Download,
  Expand,
  FileText,
  FileWarning,
  Minus,
  Plus,
  Printer,
  RotateCw,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type MetadataType = string | number | Date | null;

export interface DocumentViewerFile {
  url: string;
  name?: string;
  type?: string;
  metadata?: Record<string, MetadataType>;
}

export interface DocumentViewerProps {
  file?: DocumentViewerFile | null;

  /**
   * Controls resetting zoom/rotation when opened
   */
  open?: boolean;

  /**
   * Optional custom className
   */
  className?: string;

  /**
   * Enable/disable toolbar
   */
  showToolbar?: boolean;

  /**
   * Enable/disable metadata sidebar
   */
  showSidebar?: boolean;

  /**
   * Min zoom level
   */
  minZoom?: number;

  /**
   * Max zoom level
   */
  maxZoom?: number;

  /**
   * Zoom step
   */
  zoomStep?: number;

  /**
   * Callback when download is clicked
   */
  onDownload?: (file: DocumentViewerFile) => void;

  /**
   * Custom empty state
   */
  emptyState?: React.ReactNode;
}

const DEFAULT_MIN_ZOOM = 0.5;
const DEFAULT_MAX_ZOOM = 2.5;
const DEFAULT_ZOOM_STEP = 0.1;

export function DocumentViewer({
  file,
  open,
  className,
  showToolbar = true,
  showSidebar = true,
  minZoom = DEFAULT_MIN_ZOOM,
  maxZoom = DEFAULT_MAX_ZOOM,
  zoomStep = DEFAULT_ZOOM_STEP,
  onDownload,
  emptyState,
}: DocumentViewerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);

  /**
   * Normalize file URL
   */
  const fileUrl = React.useMemo(() => {
    if (!file?.url) return "";

    const url =
      file.url.startsWith("http") ||
      file.url.startsWith("blob:") ||
      file.url.startsWith("/")
        ? file.url
        : `${
            import.meta.env.VITE_API_BASE_URL ||
            import.meta.env.VITE_API_URL ||
            ""
          }${file.url}`;

    return url || "";
  }, [file?.url]);

  /**
   * File extension
   */
  const fileExtension = React.useMemo(() => {
    if (!file) return "";

    // 1. BEST: use MIME type if available
    if (file.type) {
      if (file.type.includes("image")) return "image";
      if (file.type.includes("pdf")) return "pdf";
      if (file.type.includes("word")) return "docx";
    }

    // 2. fallback: use filename
    if (file.name) {
      return file.name.split(".").pop()?.toLowerCase() ?? "";
    }

    return "";
  }, [file]);

 
  // console.log(fileUrl);
  // const fileExtension = React.useMemo(() => {
  //   return fileUrl.split(".").pop()?.toLowerCase() ?? "";
  // }, [fileUrl]);

  /**
   * File type helpers
   */
  const isWordDocument = ["doc", "docx"].includes(fileExtension);

  const isImage = /\.(png|jpg|jpeg|gif|webp|bmp|svg)$/i.test(fileUrl);

  const isPreviewable = Boolean(fileUrl);

  /**
   * Office viewer (for DOC/DOCX)
   */
  const officeViewerUrl = React.useMemo(() => {
    if (!fileUrl) return "";
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
      fileUrl
    )}`;
  }, [fileUrl]);

  /**
   * Reset transforms when opened
   */
  React.useEffect(() => {
    if (open) {
      setZoom(1);
      setRotation(0);
    }
  }, [open]);

  /**
   * Zoom handlers
   */
  const handleZoomIn = React.useCallback(() => {
    setZoom((prev) => Math.min(prev + zoomStep, maxZoom));
  }, [maxZoom, zoomStep]);

  const handleZoomOut = React.useCallback(() => {
    setZoom((prev) => Math.max(prev - zoomStep, minZoom));
  }, [minZoom, zoomStep]);

  /**
   * Rotate
   */
  const handleRotate = React.useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  /**
   * Print
   */
  const handlePrint = React.useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.print();
      return;
    }

    if (fileUrl) {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    }
  }, [fileUrl]);


  /**
   * Fullscreen
   */
  const handleFullscreen = React.useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  }, []);

  /**
   * Download
   */
  const handleDownload = React.useCallback(() => {
    if (!file) return;

    if (onDownload) {
      onDownload(file);
      return;
    }

    if (fileUrl) {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    }
  }, [file, fileUrl, onDownload]);

  /**
   * Empty state
   */
  if (!file) {
    return (
      <>
        {emptyState ?? (
          <Card className={cn("border-dashed", className)}>
            <CardContent className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <FileWarning className="h-8 w-8 text-muted-foreground" />
              </div>

              <h3 className="text-lg font-semibold">
                No document selected
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Select a document to preview.
              </p>
            </CardContent>
          </Card>
        )}
      </>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        showSidebar && "lg:grid-cols-[320px_1fr]",
        className
      )}
    >
      {/* Sidebar */}
      {showSidebar && (
        <aside className="hidden lg:block">
          <div className="flex h-full flex-col gap-4">
            {/* Metadata */}
            {file.metadata && Object.keys(file.metadata).length > 0 && (
              <div className="flex-1 space-y-6 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Document Information
                    </p>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(file.metadata)
                      .filter(([, value]) => {
                        return (
                          value !== null &&
                          value !== undefined &&
                          value !== ""
                        );
                      })
                      .map(([key, value]) => (
                      <div
                        key={key}
                        className="rounded-xl border bg-background/80 p-4 shadow-sm"
                      >
                        <div className="space-y-1">
                          <span className="text-xs capitalize text-muted-foreground">
                            {key.replace(/([A-Z])/g, " $1")}
                          </span>

                          <p className="text-sm font-medium text-foreground">
                            {value instanceof Date
                              ? value.toLocaleDateString()
                              : value != null && value !== ""
                                ? String(value)
                                : "N/A"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Download */}
            <Card className="mt-auto border-dashed">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-7 w-7 text-primary" />
                </div>

                <h3 className="line-clamp-2 text-sm font-semibold">
                  {file.name ?? "Document"}
                </h3>

                <Badge variant="secondary" className="mt-2">
                  Ready to download
                </Badge>

                <Button
                  className="mt-5 w-full gap-2"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>
      )}

      {/* Viewer */}
      <Card
        ref={containerRef}
        className="overflow-hidden"
      >
        {/* Toolbar */}
        {showToolbar && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-background px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Zoom Controls */}
              <div className="flex items-center rounded-lg border bg-muted/30">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-r-none"
                  onClick={handleZoomOut}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <div className="flex min-w-[70px] items-center justify-center text-sm font-medium">
                  {Math.round(zoom * 100)}%
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-l-none"
                  onClick={handleZoomIn}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Separator
                orientation="vertical"
                className="h-6"
              />

              <div className="hidden sm:block">
                <p className="text-sm font-medium">
                  Document Preview
                </p>

                <p className="text-xs text-muted-foreground">
                  Review uploaded document
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={handleRotate}
              >
                <RotateCw className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={handleFullscreen}
              >
                <Expand className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Preview */}
        <div className="flex min-h-[700px] justify-center overflow-auto bg-muted/20 p-4">
          <div
            className="w-full overflow-hidden rounded-xl bg-background shadow-lg"
            style={{
              maxWidth: "900px",
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease-in-out",
            }}
          >
            {isImage ? (
              <div className="flex h-[700px] items-center justify-center">
                <img
                  src={fileUrl}
                  alt={file.name ?? "Image"}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : isWordDocument ? (
              /* 📄 DOC / DOCX */
              <iframe
                src={officeViewerUrl}
                className="h-[700px] w-full border-0"
                title="DOC Preview"
              />
            ) : isPreviewable ? (
              /* 📑 PDF */
              <iframe
                ref={iframeRef}
                src={fileUrl}
                className="h-[700px] w-full border-0"
                title="Document Preview"
              />
            ) : (
              <div className="flex h-[700px] flex-col items-center justify-center px-6 text-center">
                <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-dashed bg-primary/5">
                  <FileText className="h-14 w-14 text-primary" />
                </div>

                <h2 className="text-2xl font-bold">
                  Preview unavailable
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                  This document format cannot be previewed
                  directly in the browser. Download the file
                  to open it with a compatible application.
                </p>

                <Button
                  size="lg"
                  className="mt-6 gap-2"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                  Download Document
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}