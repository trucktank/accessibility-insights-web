// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { autobind } from '@uifabric/utilities';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import * as classNames from 'classnames';
import { VisualizationType } from '../../common/types/visualization-type';

export interface IAssessmentInstanceSelectedButtonProps {
    test: VisualizationType;
    step: string;
    selector: string;
    isVisualizationEnabled: boolean;
    isVisible: boolean;
    onSelected: (selected, test, step, selector) => void;
}

export class AssessmentInstanceSelectedButton extends React.Component<IAssessmentInstanceSelectedButtonProps> {
    public render(): JSX.Element {
        const iconStyling = classNames({
            'instance-visibility-button': true,
            'test-instance-selected-hidden-button': !this.props.isVisible,
        });

        const iconPropsStyling = classNames({
            'test-instance-selected': this.props.isVisualizationEnabled,
            'test-instance-selected-hidden': !this.props.isVisible && this.props.isVisualizationEnabled,
            'test-instance-selected-visible': this.props.isVisible && this.props.isVisualizationEnabled,
        });

        return (
            <IconButton
                className={iconStyling}
                iconProps={
                    {
                        className: iconPropsStyling,
                        iconName: this.props.isVisible ? this.props.isVisualizationEnabled ? 'view' : 'checkBox' : 'hide2'
                    }
                }
                disabled={!this.props.isVisible}
                onClick={this.onButtonClicked}
                ariaLabel={`Visualization of the instance ${this.props.isVisualizationEnabled}`}
            />
        );
    }

    @autobind
    private onButtonClicked(event: React.MouseEvent<any>): void {
        if (this.props.isVisible) {
            const checked = !this.props.isVisualizationEnabled;
            this.props.onSelected(checked, this.props.test, this.props.step, this.props.selector);
        }
    }
}