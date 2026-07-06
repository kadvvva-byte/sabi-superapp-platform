export type SabiAiStreamStaticSmokeResult252R = Readonly<{
  smokeId: '252r-static-candidate-code-smoke';
  sourceReportPath: string;
  sourcePassed: boolean;
  candidateTsPath: string;
  staticSmokePassed: boolean;
  findings: readonly string[];
  requiredMarkersChecked: number;
  forbiddenMarkerLabelsChecked: number;
  rawForbiddenMarkersWrittenToOutputNow: false;
  serverStartedNow: false;
  realHttpRequestNow: false;
  routeMountedNow: false;
  handlerMountedNow: false;
  dbReadNow: false;
  dbMutationNow: false;
  providerCallNow: false;
  networkCallNow: false;
  schedulerNow: false;
  notificationSendNow: false;
  generationNow: false;
  postNow: false;
  liveBroadcastNow: false;
  paymentNow: false;
}>;

export type SabiAiStreamSafetyLocks252R = Readonly<Record<string, boolean>>;
