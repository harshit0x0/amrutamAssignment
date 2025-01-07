export interface ApiType {
    _id?: string,
    url: string,
    method: string,
    headers: [{
        key: string,
        value: string
    }],
    body: string,
    successApiID: ApiType | null,
    failureApiID: ApiType | null,
    parentApiID: ApiType | null
    pos: {
        x: number,
        y: number
    }
}
export interface TriggerType {
    _id?: string;
    webhook: {
        url: string,
        samplePayload: object,
    },
    webhookType: {
        typeId: string,
        payloadValue: string,
    },
    linkedApiID: ApiType | null,
    pos: {
        x: number,
        y: number
    }
}


export interface LogType {
    _id?: string;
    log: {
        url: string,
        payload: string,
        status: string,
        response: object,
        apiID: string,
        message: string,
        timeStamp: Date,
    }
}

export interface JourneyType {
    _id?: string;
    name: string;
    triggerID: TriggerType;
    logs: [{
        records: LogType[],
        message: string
    }],
    response: object
}

export interface CilentApiType extends ApiType {
    succPos?: {x: number, y: number};
    failPos?: {x: number, y: number};
    parPos?: {x: number, y: number};
    successApiID: CilentApiType | null;
    failureApiID: CilentApiType | null;
    parentApiID: CilentApiType | null;
}