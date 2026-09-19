"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { BuyerRequirementForm, RequirementSubmission } from "@/types";
import { Button } from "@/components/ui/Button";
import { DURATION, EASE } from "@/lib/animation";
import { DEFAULT_FORM_DATA, ENGINEERING_PRESETS } from "./constants";
import { validateStep, isStepValid, type ValidationErrors } from "./validation";
import { RequirementStepper } from "./RequirementStepper";
import { Step1General } from "./Step1General";
import { Step2Technical } from "./Step2Technical";
import { Step3Commercial } from "./Step3Commercial";
import { Step4Delivery } from "./Step4Delivery";
import { Step5Documents } from "./Step5Documents";
import { Step6Review } from "./Step6Review";
import { RequirementSuccess } from "./RequirementSuccess";
import { useDemoMode } from "@/hooks/use-demo-mode";
import {
  ArrowRight,
  ArrowLeft,
  PaperPlaneTilt,
  Sparkle,
} from "@phosphor-icons/react";

const DRAFT_STORAGE_KEY = "linksupplied_requirement_draft_v2";

interface RequirementWizardProps {
  onRequirementSubmitted?: (sub: RequirementSubmission) => void;
  onExploreBenchmarks?: () => void;
}

export function RequirementWizard({
  onRequirementSubmitted,
  onExploreBenchmarks,
}: RequirementWizardProps) {
  const { isDemo } = useDemoMode();
  const reduce = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [data, setData] = useState<BuyerRequirementForm>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [submission, setSubmission] = useState<RequirementSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── 1. Restore local draft on mount ────────────────────────── */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data) {
          setData(parsed.data);
          if (parsed.savedAt) setLastSavedAt(parsed.savedAt);
          if (parsed.step) setCurrentStep(parsed.step);
        }
      }
    } catch {
      // Storage unavailable or invalid JSON
    }
  }, []);

  /* ── 2. Autosave local draft on change ──────────────────────── */
  const saveDraft = useCallback((currentData: BuyerRequirementForm, step: number) => {
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({
          data: currentData,
          savedAt: timeStr,
          step,
        })
      );
      setLastSavedAt(timeStr);
    } catch {
      // Ignore quota exceeded
    }
  }, []);

  const handleDataChange = (updates: Partial<BuyerRequirementForm>) => {
    setData((prev) => {
      const next = { ...prev, ...updates };
      saveDraft(next, currentStep);
      return next;
    });

    // Clear active errors on fields that are updated
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
  };

  /* ── 3. Quick-load presets ──────────────────────────────────── */
  const handleLoadPreset = (presetId: string) => {
    const preset = ENGINEERING_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      const cloned = JSON.parse(JSON.stringify(preset.data));
      setData(cloned);
      setErrors({});
      saveDraft(cloned, currentStep);
    }
  };

  /* ── 4. Navigation & Step Transitions ───────────────────────── */
  const handleNext = () => {
    const stepErrors = validateStep(currentStep, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      // Scroll smoothly to top of wizard on error
      window.scrollTo({ top: 220, behavior: "smooth" });
      return;
    }

    setErrors({});
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }

    if (currentStep < 6) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveDraft(data, nextStep);
      window.scrollTo({ top: 220, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      saveDraft(data, prevStep);
      window.scrollTo({ top: 220, behavior: "smooth" });
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId === currentStep) return;
    // Allow jumping if target is earlier or current step is valid
    if (stepId < currentStep || isStepValid(currentStep, data)) {
      setErrors({});
      setCurrentStep(stepId);
      saveDraft(data, stepId);
      window.scrollTo({ top: 220, behavior: "smooth" });
    } else {
      setErrors(validateStep(currentStep, data));
    }
  };

  /* ── 5. Requirement Submission ──────────────────────────────── */
  const handleSubmit = () => {
    const stepErrors = validateStep(6, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      window.scrollTo({ top: 220, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const sub: RequirementSubmission = {
        referenceId: `REQ-2026-${randomDigits}`,
        requirement: data,
        status: "under_review",
        submittedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        estimatedReviewHours: 24,
        timeline: [
          {
            step: 1,
            title: "Requirement Received",
            description: "Requirement logged in verification queue",
            status: "completed",
          },
          {
            step: 2,
            title: "Engineering Review",
            description: "Evaluating material tolerances & machine capacity",
            status: "current",
          },
          {
            step: 3,
            title: "Supplier Matching",
            description: "Identifying qualified production facilities",
            status: "upcoming",
          },
          {
            step: 4,
            title: "Dossiers Prepared",
            description: "Delivering matching reports & RFQ pathways",
            status: "upcoming",
          },
        ],
      };

      // Remove local storage draft after successful submission
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {}

      setIsSubmitting(false);
      setSubmission(sub);
      if (onRequirementSubmitted) onRequirementSubmitted(sub);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }, 550);
  };

  /* ── 6. Reset Wizard ────────────────────────────────────────── */
  const handleReset = () => {
    if (confirm("Reset and clear all entered requirement specifications?")) {
      setData(DEFAULT_FORM_DATA);
      setCurrentStep(1);
      setCompletedSteps([]);
      setErrors({});
      setSubmission(null);
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {}
      setLastSavedAt(null);
    }
  };

  /* ── 7. Render Success State if Submitted ───────────────────── */
  if (submission) {
    return (
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.normal, ease: EASE.out }}
      >
        <RequirementSuccess
          submission={submission}
          onEdit={() => {
            setSubmission(null);
            setCurrentStep(6);
          }}
          onNew={() => {
            setData(DEFAULT_FORM_DATA);
            setCompletedSteps([]);
            setErrors({});
            setSubmission(null);
            setCurrentStep(1);
          }}
          onExploreBenchmarks={onExploreBenchmarks}
        />
      </motion.div>
    );
  }

  /* ── 8. Render Multi-Step Intake Wizard ─────────────────────── */
  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] shadow-sm overflow-hidden">
      {/* Quick-Load Engineering Preset Bar (Demo Mode Only) */}
      {isDemo && (
        <div className="bg-copper/[0.04] border-b border-copper/20 p-3.5 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Sparkle size={15} className="text-copper" />
              <span className="text-xs font-mono uppercase tracking-wider text-copper font-bold">
                Demo Evaluation Mode · Sample Industrial Briefs:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {ENGINEERING_PRESETS.map((preset) => {
                const isSelected = data.partName === preset.data.partName;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleLoadPreset(preset.id)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-all duration-150 font-medium ${
                      isSelected
                        ? "bg-copper text-white shadow-xs"
                        : "bg-surface border border-ink/[0.08] text-slate hover:text-ink hover:border-ink/[0.2]"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Progress Stepper */}
      <RequirementStepper
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
        lastSavedAt={lastSavedAt}
        onReset={handleReset}
      />

      {/* Form Content Area */}
      <div className="p-5 sm:p-7 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={reduce ? undefined : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -8 }}
            transition={{ duration: DURATION.fast, ease: EASE.out }}
          >
            {currentStep === 1 && (
              <Step1General
                data={data}
                onChange={handleDataChange}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <Step2Technical
                data={data}
                onChange={handleDataChange}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <Step3Commercial
                data={data}
                onChange={handleDataChange}
                errors={errors}
              />
            )}
            {currentStep === 4 && (
              <Step4Delivery
                data={data}
                onChange={handleDataChange}
                errors={errors}
              />
            )}
            {currentStep === 5 && (
              <Step5Documents
                documents={data.documents}
                onChange={(docs) => handleDataChange({ documents: docs })}
                errors={errors}
              />
            )}
            {currentStep === 6 && (
              <Step6Review
                data={data}
                onChange={handleDataChange}
                onJumpToStep={handleStepClick}
                errors={errors}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Wizard Controls Footer */}
        <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-ink/[0.06]">
          {currentStep > 1 ? (
            <Button
              type="button"
              onClick={handleBack}
              variant="secondary"
              size="md"
              iconLeading={<ArrowLeft size={14} />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <Button
              type="button"
              onClick={handleNext}
              variant="dark"
              size="md"
              iconTrailing={<ArrowRight size={14} />}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              variant="primary"
              size="lg"
              iconLeading={<PaperPlaneTilt size={16} weight="bold" />}
            >
              Submit Requirement
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
