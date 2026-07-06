export type SabiCallDeviceState = { microphoneAvailable: boolean; cameraAvailable: boolean; speakerAvailable: boolean };
export function createDefaultSabiCallDeviceState(): SabiCallDeviceState { return { microphoneAvailable: true, cameraAvailable: true, speakerAvailable: true }; }
