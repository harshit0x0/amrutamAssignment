export interface ApiType {
    id: string;
    url: string;
    method: string;
    headers: {
        key: string;
        value: string;
    }[];
    body: string;
    response: {
        status: number;
        body: string;
    }
    successAPI: ApiType | null;
    failureAPI: ApiType | null;
}
export interface TriggerType {
    id: string;
    webhook: {
        url: string;
        samplePayload: string;
    }
    webhookType: {
        typeId: string;
        payloadValue: string;
    }
    linkedAPI: ApiType | null;
}

export interface JourneyType {
    id: string;
    trigger?: TriggerType;
    // api: ApiType;
    response: string;
}

