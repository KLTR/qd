export type ISystemInfo = Partial<SystemInfo>;

export class SystemInfo {
  rejects: string[];
  alerts: number;
  interceptor: {
    indicator: {
      state: string;
      tip: string;
    }
    info:{
      diagnostic: string;
      mode: string;
      name: string
    }
    interceptors:[
      {
        interceptor:{
          connected: boolean;
          diagnostics: string;
          id: string;
          name: string;
          mode: string;
      }
      }
    ]
  };
  internet: {
    indicator:{
      state: string;
    },
   tip: string;
  };
  storage: {
    indicator:{
      state: string;
    },
    tip: string;
  };
  operational: boolean;
  battery: {
    level: number;
  };
  tooltips: {
    battery: string;
    storage: string;
    internet: string;
    interceptor: string;
  };
goat: {
 indicator: {
   state: string;
 },
 tip: string;
};
alice: {
  indicator:{
    state: string;
  },
  tip: string;
};
cloudx: {
  indicator:{
    state: string;
  },
  tip: string;
};
pioneer: {
  indicator:{
    state: string;
  },
  pioneers:[
    {
      created_at: string,
      updated_at: string,
      name: string,
      state: string
    }
  ]
};
user :{
  name? : string;
  tip: string;
}
  constructor(options: ISystemInfo) {
    this.rejects = options.rejects || undefined;
    this.alerts = options.alerts || undefined;
    this.interceptor = options.interceptor || undefined;
    this.internet = options.internet || undefined;
    this.storage = options.storage || undefined;
    this.operational = options.operational || undefined;
    this.battery = options.battery || undefined;
    this.tooltips = options.tooltips || undefined;
    this.goat = options.goat || undefined;
    this.pioneer = options.pioneer || undefined;
    this.cloudx = options.cloudx || undefined;
    this.alice = options.alice || undefined;
    this.user = options.user || undefined;
  }
}
