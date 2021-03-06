// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
export interface PrintableAxeResultNode {
    selector: string[];
    failureSummary: string;
}

export interface PrintableAxeResult {
    id: string;
    nodes: PrintableAxeResultNode[];
}

export function prettyPrintAxeViolations(axeResults: AxeResult): PrintableAxeResult[] {
    const violations = axeResults.violations;
    const printableViolations: PrintableAxeResult[] = violations.map(result => {
        const nodeResults: PrintableAxeResultNode[] = result.nodes.map(node => {
            return {
                selector: node.target,
                failureSummary: node.failureSummary,
            } as PrintableAxeResultNode;
        });
        return {
            id: result.id,
            nodes: nodeResults,
        };
    });
    return printableViolations;
}
