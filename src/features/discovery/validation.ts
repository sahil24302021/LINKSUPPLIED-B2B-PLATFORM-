import type { BuyerRequirementForm } from "@/types";

export interface ValidationErrors {
  [key: string]: string | undefined;
}

export function validateStep(step: number, data: BuyerRequirementForm): ValidationErrors {
  const errors: ValidationErrors = {};

  if (step === 1) {
    if (!data.partName?.trim()) {
      errors.partName = "Enter the component or part name, for example Precision Valve Shaft";
    } else if (data.partName.trim().length < 3) {
      errors.partName = "Part name should be at least 3 characters";
    }

    if (!data.category?.trim()) {
      errors.category = "Select the primary manufacturing category";
    }

    if (!data.description?.trim()) {
      errors.description = "Describe the component, geometry, or intended application";
    } else if (data.description.trim().length < 10) {
      errors.description = "Provide a bit more engineering detail (at least 10 characters)";
    }
  }

  if (step === 2) {
    if (!data.material?.trim()) {
      errors.material = "Specify the raw material or alloy grade, for example EN8 Steel or AL 6061-T6";
    }

    if (!data.process?.trim()) {
      errors.process = "Select the primary manufacturing process required";
    }

    if (!data.tolerance?.trim()) {
      errors.tolerance = "Specify the required dimensional tolerance, for example ISO h9 or ±0.030 mm";
    }
  }

  if (step === 3) {
    if (!data.quantity?.trim()) {
      errors.quantity = "Enter the required batch or recurring monthly quantity";
    } else {
      const numericVal = parseFloat(data.quantity.replace(/,/g, ""));
      if (isNaN(numericVal) || numericVal <= 0) {
        errors.quantity = "Enter a valid positive quantity number";
      }
    }

    if (!data.unit?.trim()) {
      errors.unit = "Select a unit of measurement (units, kg, tons, meters)";
    }

    if (!data.targetLeadTimeDays?.trim()) {
      errors.targetLeadTimeDays = "Indicate target lead time, for example 30 calendar days";
    }
  }

  if (step === 4) {
    if (!data.deliveryCity?.trim()) {
      errors.deliveryCity = "Enter the delivery city or factory destination";
    }

    if (!data.deliveryCountry?.trim()) {
      errors.deliveryCountry = "Enter the destination country";
    }

    if (!data.incoterm?.trim()) {
      errors.incoterm = "Select an Incoterm (e.g. FOB, CIF, DAP, Ex-Works)";
    }
  }

  if (step === 5) {
    // Documents are optional, but if any document is in error state, notify
    const hasErrorDoc = data.documents.some((d) => d.status === "error");
    if (hasErrorDoc) {
      errors.documents = "One or more documents failed to upload. Please remove or retry them.";
    }
  }

  if (step === 6) {
    if (!data.contact.contactName?.trim()) {
      errors.contactName = "Enter your full name";
    }

    if (!data.contact.workEmail?.trim()) {
      errors.workEmail = "Enter a valid work email, for example name@company.com";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.contact.workEmail.trim())) {
        errors.workEmail = "Enter a valid work email, for example name@company.com";
      }
    }

    if (!data.contact.companyName?.trim()) {
      errors.companyName = "Enter your company or organization name";
    }
  }

  return errors;
}

export function isStepValid(step: number, data: BuyerRequirementForm): boolean {
  const errors = validateStep(step, data);
  return Object.keys(errors).length === 0;
}
