
  
  export interface Metadata {
    code: number;
    reason: string;
    retry: boolean;
  }
  
  export class Device {
    id: string;
    state: string;
    name: string;
    identifier: string;
    lastSeen: string;
    stateMetadata: Metadata;
    type: string;
    vectorType: string; //pioneer, x-caliber ...

    constructor(options: Device) {
      this.id = options.id || undefined;
      this.name = options.name || undefined;
      this.state = options.state || undefined;
      this.identifier = options.identifier || undefined;
      this.lastSeen = options.lastSeen || undefined;
      this.stateMetadata = options.stateMetadata || undefined;
      this.type = options.type || undefined;
      this.vectorType = options.type || undefined;
    }
  }
  