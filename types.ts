
export enum FindingSeverity {
  Compliant = 'Compliant',
  Warning = 'Warning',
  Critical = 'Critical',
}

export interface Finding {
  clause: string;
  risk_summary: string;
  severity: FindingSeverity;
  recommendation: string;
}

export interface AnalysisResult {
  document_type: string;
  overall_summary: string;
  key_findings: Finding[];
}
