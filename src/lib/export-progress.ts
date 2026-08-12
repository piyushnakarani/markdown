export type ExportProgressStage =
  | 'preparing'
  | 'buildingDiagrams'
  | 'generatingPdf'
  | 'generatingHtml'
  | 'generatingDocx'
  | 'preparingDownload'
  | 'finalizing';

export type ExportProgressCallback = (stage: ExportProgressStage) => void;

export { markdownHasMermaidContent as markdownHasMermaid } from './mermaid-normalize';

export function getPdfExportStages(hasMermaid: boolean): ExportProgressStage[] {
  if (hasMermaid) {
    return ['preparing', 'buildingDiagrams', 'generatingPdf', 'finalizing'];
  }
  return ['preparing', 'generatingPdf', 'finalizing'];
}

export function getHtmlExportStages(hasMermaid: boolean): ExportProgressStage[] {
  if (hasMermaid) {
    return ['preparing', 'buildingDiagrams', 'generatingHtml', 'finalizing'];
  }
  return ['preparing', 'generatingHtml', 'finalizing'];
}

export function getTxtExportStages(): ExportProgressStage[] {
  return ['preparing', 'preparingDownload', 'finalizing'];
}

export function getDocxExportStages(hasMermaid: boolean): ExportProgressStage[] {
  if (hasMermaid) {
    return ['preparing', 'buildingDiagrams', 'generatingDocx', 'finalizing'];
  }
  return ['preparing', 'generatingDocx', 'finalizing'];
}

export type ExportStageLabels = Record<ExportProgressStage, string>;

export function stageIndex(stages: ExportProgressStage[], stage: ExportProgressStage): number {
  const index = stages.indexOf(stage);
  return index === -1 ? 0 : index;
}

const STAGE_MESSAGE_KEYS: Record<ExportProgressStage, string> = {
  preparing: 'exportPreparing',
  buildingDiagrams: 'exportBuildingDiagrams',
  generatingPdf: 'exportGeneratingPdf',
  generatingHtml: 'exportGeneratingHtml',
  generatingDocx: 'exportGeneratingDocx',
  preparingDownload: 'exportPreparingDownload',
  finalizing: 'exportFinalizing',
};

export function getExportOverlayProps(
  t: (key: string) => string,
  stages: ExportProgressStage[],
  activeStage: ExportProgressStage,
) {
  return {
    message: t(STAGE_MESSAGE_KEYS[activeStage]),
    steps: stages.map((stage) => t(STAGE_MESSAGE_KEYS[stage])),
    activeStep: stageIndex(stages, activeStage),
    hint: t('exportHint'),
  };
}
