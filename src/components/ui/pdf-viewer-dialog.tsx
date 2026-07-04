import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DocumentViewer } from "../document-viewer";

type MetadataType = string | number | Date | null;

type PDFViewerProps = {
  open: boolean;
  title?: string;
  description?: string;
  url: string;
  metadata?: Record<string, MetadataType>;
  onOpenChange: (open: boolean) => void;
};

export default function PDFViewerDialog({
  open,
  title,
  description,
  url,
  metadata,
  onOpenChange,
}: PDFViewerProps) {
  const file = React.useMemo(
    () =>
      url
        ? {
            url,
            name: title,
            metadata: metadata
          }
        : null,
    [url, title, metadata]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl">
        
        {/* HEADER */}
        <div className="shrink-0 border-b bg-background px-6 py-4">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-base font-semibold">
              {title ?? "Document Preview"}
            </DialogTitle>

            {description && (
              <DialogDescription className="text-sm text-muted-foreground">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>

        {/* BODY */}
        <div className='max-h-[75vh] overflow-y-auto pr-2'>
          
          {/* Viewer */}
          <div className="flex-1 overflow-auto bg-muted/20 p-4">
            {file ? (
              <DocumentViewer
                open={open}
                className="h-full w-full"
                showSidebar={true}
                file={{
                  url: file.url,
                  name: file.name,
                  metadata: metadata,
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No document available
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}