// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { IMock, It, Mock } from 'typemoq';

import {
    IInspectElementPayload,
    IInspectFrameUrlPayload,
    IOnDevToolOpenPayload,
} from '../../../../background/actions/action-payloads';
import { Messages } from '../../../../common/messages';
import { DevToolActionMessageCreator } from '../../../../common/message-creators/dev-tool-action-message-creator';
import { TelemetryDataFactory } from '../../../../common/telemetry-data-factory';
import { EventStubFactory } from '../../../Common/event-stub-factory';

describe('DevToolActionMessageCreatorTest', () => {
    let eventStubFactory: EventStubFactory;
    let testSubject: DevToolActionMessageCreator;
    const tabId: number = 10;
    let postMessageMock: IMock<(msg: any) => void>;

    beforeEach(() => {
        eventStubFactory = new EventStubFactory();
        postMessageMock = Mock.ofInstance(message => { });
        testSubject = new DevToolActionMessageCreator(postMessageMock.object, tabId, new TelemetryDataFactory());
    });

    test('setDevToolStatus', () => {
        const status = true;
        const expectedMessage = {
            type: Messages.DevTools.DevtoolStatus,
            tabId: tabId,
            payload: {
                status: status,
            } as IOnDevToolOpenPayload,
        };

        postMessageMock
            .setup(post => post(It.isObjectWith(expectedMessage)))
            .verifiable();

        testSubject.setDevToolStatus(status);

        postMessageMock.verifyAll();
    });

    test('setInspectElement', () => {
        const event = eventStubFactory.createKeypressEvent() as any;
        const target = ['$iframe1', 'div1'];
        const telemetryFactory = new TelemetryDataFactory();
        const telemetry = telemetryFactory.forInspectElement(event, target);
        const expectedMessage = {
            type: Messages.DevTools.InspectElement,
            tabId: tabId,
            payload: {
                target: target,
                telemetry: telemetry,
            } as IInspectElementPayload,
        };

        postMessageMock
            .setup(post => post(It.isObjectWith(expectedMessage)))
            .verifiable();

        testSubject.setInspectElement(event, target);

        postMessageMock.verifyAll();
    });

    test('setInspectFrameUrl', () => {
        const frameUrl = 'frame url';
        const expectedMessage = {
            type: Messages.DevTools.InspectFrameUrl,
            tabId: tabId,
            payload: {
                frameUrl: frameUrl,
            } as IInspectFrameUrlPayload,
        };

        postMessageMock
            .setup(post => post(It.isObjectWith(expectedMessage)))
            .verifiable();

        testSubject.setInspectFrameUrl(frameUrl);

        postMessageMock.verifyAll();
    });
});