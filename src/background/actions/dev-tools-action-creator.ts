// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Messages } from '../../common/messages';
import * as TelemetryEvents from '../../common/telemetry-events';
import { TelemetryEventHandler } from '../telemetry/telemetry-event-handler';
import { IInspectElementPayload, IInspectFrameUrlPayload, IOnDevToolOpenPayload } from './action-payloads';
import { DevToolActions } from './dev-tools-actions';

export class DevToolsActionCreator {
    private devtoolActions: DevToolActions;
    private telemetryEventHandler: TelemetryEventHandler;
    private registerTypeToPayloadCallback: IRegisterTypeToPayloadCallback;

    constructor(devToolsAction: DevToolActions,
        telemetryEventHandler: TelemetryEventHandler,
        registerTypeToPayloadCallback: IRegisterTypeToPayloadCallback,
    ) {
        this.devtoolActions = devToolsAction;
        this.telemetryEventHandler = telemetryEventHandler;
        this.registerTypeToPayloadCallback = registerTypeToPayloadCallback;
    }

    public registerCallbacks(): void {
        this.registerTypeToPayloadCallback(
            Messages.DevTools.DevtoolStatus, payload => this.onDevToolOpened(payload));

        this.registerTypeToPayloadCallback(
            Messages.DevTools.InspectElement, (payload, tabId) => this.onDevToolInspectElement(payload, tabId));

        this.registerTypeToPayloadCallback(
            Messages.DevTools.InspectFrameUrl, payload => this.onDevToolInspectFrameUrl(payload));

        this.registerTypeToPayloadCallback(
            Messages.DevTools.Get, () => this.onDevToolGetCurrentState());
    }

    private onDevToolOpened(payload: IOnDevToolOpenPayload): void {
        this.devtoolActions.setDevToolState.invoke(payload.status);
    }

    private onDevToolInspectElement(payload: IInspectElementPayload, tabId): void {
        this.devtoolActions.setInspectElement.invoke(payload.target);
        this.telemetryEventHandler.publishTelemetry(TelemetryEvents.INSPECT_OPEN, payload, tabId);
    }

    private onDevToolInspectFrameUrl(payload: IInspectFrameUrlPayload): void {
        this.devtoolActions.setFrameUrl.invoke(payload.frameUrl);
    }

    private onDevToolGetCurrentState() {
        this.devtoolActions.getCurrentState.invoke(null);
    }
}