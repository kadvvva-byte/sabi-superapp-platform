import type { CreateSabiCallSignalCommand, SabiCallSignalDto } from "../../contracts";
import type { SabiCallService } from "../../application";
export function createSabiCallSignal(command: CreateSabiCallSignalCommand): CreateSabiCallSignalCommand { return command; }
export class SabiCallSignalingRelay { constructor(private readonly service: SabiCallService) {} async relay(command: CreateSabiCallSignalCommand): Promise<SabiCallSignalDto> { return this.service.createSignal(command); } }
