"use client";

import { useState, useRef } from "react";
import type { AttachedDocument } from "@/types";
import type { ValidationErrors } from "./validation";
import {
  UploadSimple,
  FileText,
  FileCode,
  FileXls,
  Image as ImageIcon,
  Trash,
  ArrowsClockwise,
  ShieldCheck,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

interface Step5DocumentsProps {
  documents: AttachedDocument[];
  onChange: (docs: AttachedDocument[]) => void;
  errors: ValidationErrors;
}

const ACCEPTED_EXTENSIONS = [
  ".pdf",
  ".step",
  ".stp",
  ".iges",
  ".dxf",
  ".dwg",
  ".xlsx",
  ".csv",
  ".png",
  ".jpg",
];

export function Step5Documents({ documents, onChange, errors }: Step5DocumentsProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string, name: string) => {
    const ext = name.split(".").pop()?.toLowerCase() || "";
    if (ext === "step" || ext === "stp" || ext === "iges" || ext === "dxf" || ext === "dwg") {
      return <FileCode size={20} className="text-copper" />;
    }
    if (ext === "xlsx" || ext === "csv") {
      return <FileXls size={20} className="text-emerald-600" />;
    }
    if (ext === "png" || ext === "jpg" || ext === "jpeg") {
      return <ImageIcon size={20} className="text-indigo-600" />;
    }
    return <FileText size={20} className="text-copper" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newDocs: AttachedDocument[] = [];

    Array.from(files).forEach((file) => {
      // Check file size (max 25MB)
      const isTooLarge = file.size > 25 * 1024 * 1024;
      const docId = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

      if (isTooLarge) {
        newDocs.push({
          id: docId,
          name: file.name,
          sizeBytes: file.size,
          type: file.type || "application/octet-stream",
          uploadedAt: "Just now",
          status: "error",
          errorMessage: "File exceeds 25MB limit. Please compress CAD files.",
        });
      } else {
        newDocs.push({
          id: docId,
          name: file.name,
          sizeBytes: file.size,
          type: file.type || "application/octet-stream",
          uploadedAt: "Just now",
          status: "uploading",
          progress: 15,
        });

        // Simulate client-side upload progression (frontend state machine)
        setTimeout(() => {
          onChange(
            newDocs.map((d) => (d.id === docId ? { ...d, progress: 65 } : d))
          );
        }, 300);

        setTimeout(() => {
          onChange(
            newDocs.map((d) =>
              d.id === docId ? { ...d, status: "uploaded", progress: 100 } : d
            )
          );
        }, 700);
      }
    });

    onChange([...documents, ...newDocs]);
  };

  const removeDoc = (id: string) => {
    onChange(documents.filter((d) => d.id !== id));
  };

  const retryDoc = (id: string) => {
    const updated = documents.map((d) =>
      d.id === id
        ? { ...d, status: "uploading" as const, progress: 20, errorMessage: undefined }
        : d
    );
    onChange(updated);

    setTimeout(() => {
      onChange(
        updated.map((d) =>
          d.id === id ? { ...d, status: "uploaded" as const, progress: 100 } : d
        )
      );
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
            STEP 05 · SPECIFICATIONS & DRAWINGS
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink">
          Attach Engineering Drawings & Files
        </h2>
        <p className="text-xs sm:text-sm text-slate mt-1 max-w-[68ch] leading-relaxed">
          Upload 2D/3D CAD models, Bill of Materials (BOM), or quality acceptance criteria. Files are protected under NDA and shared only with qualified suppliers.
        </p>
      </div>

      <div className="space-y-5">
        {/* Upload dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
            isDragOver
              ? "border-copper bg-copper/[0.04] scale-[1.005]"
              : "border-ink/[0.12] bg-paper/60 hover:border-copper/60 hover:bg-paper"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ACCEPTED_EXTENSIONS.join(",")}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="w-12 h-12 rounded-2xl bg-copper/10 flex items-center justify-center text-copper mx-auto mb-3">
            <UploadSimple size={24} weight="bold" />
          </div>

          <p className="text-sm font-semibold text-ink">
            Drag & drop technical files here, or{" "}
            <span className="text-copper underline underline-offset-2">browse computer</span>
          </p>

          <p className="text-xs text-slate/70 mt-1 max-w-[48ch] mx-auto">
            Supported formats: 3D CAD (.step, .stp, .iges), 2D Drawings (.dxf, .dwg, .pdf), Spreadsheets (.xlsx, .csv), Images (.png, .jpg). Max 25MB per file.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
            {["STEP / STP", "DXF / DWG", "PDF Drawings", "Excel BOM", "Max 25MB"].map((badge) => (
              <span
                key={badge}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-ink/[0.04] text-slate font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Global error if any */}
        {errors.documents && (
          <p className="text-xs text-red-600 font-medium">
            {errors.documents}
          </p>
        )}

        {/* Uploaded File Cards */}
        {documents.length > 0 && (
          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink">
              Attached Documents ({documents.length})
            </p>

            <div className="space-y-2">
              {documents.map((doc) => {
                const isUploading = doc.status === "uploading";
                const isError = doc.status === "error";
                const isSuccess = doc.status === "uploaded";

                return (
                  <div
                    key={doc.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      isError
                        ? "bg-red-50/50 border-red-200 text-ink"
                        : "bg-surface border-ink/[0.08]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-3">
                      <div className="w-10 h-10 rounded-lg bg-ink/[0.03] flex items-center justify-center shrink-0">
                        {getFileIcon(doc.type, doc.name)}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-ink truncate">
                          {doc.name}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-slate/70">
                          <span>{formatFileSize(doc.sizeBytes)}</span>
                          <span>·</span>
                          {isUploading && (
                            <span className="text-copper font-medium">
                              Uploading... {doc.progress || 0}%
                            </span>
                          )}
                          {isSuccess && (
                            <span className="text-emerald-700 font-medium flex items-center gap-1">
                              <CheckCircle size={12} weight="fill" />
                              Ready
                            </span>
                          )}
                          {isError && (
                            <span className="text-red-600 font-medium flex items-center gap-1">
                              <WarningCircle size={12} weight="fill" />
                              {doc.errorMessage || "Upload failed"}
                            </span>
                          )}
                        </div>

                        {isUploading && (
                          <div className="w-40 sm:w-60 h-1 rounded-full bg-ink/[0.08] mt-1.5 overflow-hidden">
                            <div
                              className="h-full bg-copper transition-all duration-300 rounded-full"
                              style={{ width: `${doc.progress || 10}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isError && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => retryDoc(doc.id)}
                          aria-label={`Retry uploading ${doc.name}`}
                          iconLeading={<ArrowsClockwise size={15} />}
                          className="h-8 px-2 text-slate hover:text-copper"
                        >
                          Retry
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDoc(doc.id)}
                        aria-label={`Remove ${doc.name}`}
                        iconLeading={<Trash size={15} />}
                        className="h-8 w-8 p-0 text-slate/60 hover:text-red-600"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Security & Confidentiality Assurance */}
        <div className="bg-copper/[0.06] border border-copper/15 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate">
          <ShieldCheck size={18} className="text-copper shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-ink font-semibold">NDA & Proprietary Data Protection:</strong> All engineering drawings and technical files are encrypted. Files are disclosed strictly to vetted supplier engineering leads after reciprocal mutual non-disclosure execution.
          </p>
        </div>
      </div>
    </div>
  );
}
