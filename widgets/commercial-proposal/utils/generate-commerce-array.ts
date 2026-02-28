import { CommercialProposalLineProps } from "../types/commercial-proposal-line.props";

export const generateCommerceArray = (
    rows: string[],
    data: string[],
): CommercialProposalLineProps[] => {
    return rows.map((row, index) => ({
        title: row,
        value: data[index],
    }));
};
