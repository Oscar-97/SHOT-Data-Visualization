const jq = require('jquery');
const DataTables = require('datatables.net-bs5');
const Buttons = require('datatables.net-buttons-bs5');
// const ButtonsColVis = require('datatables.net-buttons/js/buttons.colVis.js');
// const ColReorder = require('datatables.net-colreorder-bs5');
const RowReorder = require('datatables.net-rowreorder-bs5');
const Select = require('datatables.net-select-bs5');

import { GetCheckedSolvers, GetComparisonArray } from "../Solvers/UsedSolvers";
import { TableData } from "./TableData";

import { SelectAllButton, FilterSelectionButton } from '../Elements/Elements';

export function TableDisplay(Instance: string, Solvers: string[], InstanceLabels: string | any[], DataLabels: any[], ProblemList: string | any[], ResultsData: any[]) {
    let CheckedSolvers = GetCheckedSolvers();
    let ComparisonArray = GetComparisonArray(CheckedSolvers, Solvers);

    /**
     * @param TableDisplayData Display the data in the div with the id "dataTable" when clicking on the view selection button.
     * @param TableSearch Create the input search element after generating the table.
     * @param TableDownloadCSV Create a save CSV button after generating the table.
     */
    TableData(Instance, CheckedSolvers, InstanceLabels, DataLabels, ProblemList, ResultsData, ComparisonArray);
    SelectAllButton.disabled = false;
    FilterSelectionButton.disabled = false;

    // @ts-ignore
    jq("#dataTableGenerated").DataTable(
        {
            // colReorder: true,
            rowReorder: true,
            buttons: ['copy', 'csv'],
            // columnDefs: [ {
            //     orderable: false,
            //     className: 'select-checkbox',
            //     targets: 0
            //     } ],
            select: {
                style: 'os',
                blurable: true,
                className: 'row-selected-problems'
            }
        }
    );
    // Enable the selection button after displaying.
    FilterSelectionButton.disabled = false;
}