// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { shallow } from 'enzyme';
import * as React from 'react';
import { Mock } from 'typemoq';

import { ExternalLink } from '../../../../../common/components/external-link';
import { toolName } from '../../../../../content/strings/application';
import {
    ILaunchPadProps,
    LaunchPad,
    LaunchPadDeps,
    LaunchPadRowConfiguration,
} from '../../../../../popup/scripts/components/launch-pad';
import { LaunchPadItemRow } from '../../../../../popup/scripts/components/launch-pad-item-row';

describe('LaunchPad', () => {

    const rowConfigs: LaunchPadRowConfiguration[] = [
        {
            iconName: 'Rocket',
            title: 'Title 1',
            description: 'Description 1',
            onClickTitle: null,
        },
        {
            iconName: 'testBeaker',
            title: 'Title 2',
            description: 'Description 2',
            onClickTitle: null,
        },
        {
            iconName: 'Medical',
            title: 'Title 3',
            description: 'Description 3',
            onClickTitle: null,
        },
    ];


    test('render LaunchPad', () => {

        const deps = Mock.ofType<LaunchPadDeps>().object;

        const props: ILaunchPadProps = {
            deps: deps,
            productName: toolName,
            rowConfigs: rowConfigs,
            version: 'ver.si.on',
        };


        const testObject = new LaunchPad(props);

        const expected = (
            <div className="ms-Grid main-section">
                <main>
                    <div
                        role="heading"
                        aria-level={1}
                        className="launch-pad-title ms-fontWeight-semibold"
                    >
                        Launch pad
                            </div>
                    <hr className="ms-fontColor-neutralTertiaryAlt launch-pad-hr" />
                    <div className="launch-pad-main-section">
                        <div key="row-item-1">
                            <LaunchPadItemRow
                                iconName={'Rocket'}
                                description="Description 1"
                                title="Title 1"
                                onClickTitle={null}
                            />
                            <hr className="ms-fontColor-neutralTertiaryAlt launch-pad-hr" />
                        </div>

                        <div key="row-item-2">
                            <LaunchPadItemRow
                                iconName={'testBeaker'}
                                description="Description 2"
                                title="Title 2"
                                onClickTitle={null}
                            />
                            <hr className="ms-fontColor-neutralTertiaryAlt launch-pad-hr" />
                        </div>

                        <div key="row-item-3">
                            <LaunchPadItemRow
                                iconName={'Medical'}
                                description="Description 3"
                                title="Title 3"
                                onClickTitle={null}
                            />
                            <hr className="ms-fontColor-neutralTertiaryAlt launch-pad-hr" />
                        </div>
                    </div>
                </main>
                <div role="complementary" className="launch-pad-footer">
                    <div>
                        {'Version \nver.si.on\n  \n|\n  \nPowered by '}
                        <ExternalLink deps={deps}
                            title="Navigate to axe-core npm page"
                            href="https://www.npmjs.com/package/axe-core">axe-core</ExternalLink>
                    </div>
                </div>
            </div>
        );

        expect(shallow(testObject.render()).debug())
            .toEqual(shallow(expected).debug());
    });
});