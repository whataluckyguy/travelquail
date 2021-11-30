/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React from 'react';
import { Card, CardBody, CardTitle, Button,Input,FormGroup,Label } from 'reactstrap';
import { useTable, usePagination, useSortBy,useFilters,useGlobalFilter } from 'react-table';
import {matchSorter} from 'match-sorter';
import classnames from 'classnames';

import IntlMessages from '../../helpers/IntlMessages';
import DatatablePagination from '../../components/DatatablePagination';

import products from '../../data/products';

// function DefaultColumnFilter({
//   column: { filterValue, preFilteredRows, setFilter }
// }) {
//   return (
//     <Input
//       type="text"
//       value={filterValue || ""}
//       onChange={(e) => {
//         setFilter(e.target.value || undefined);
//       }}
//       placeholder="Search..."
//       style={{
//         fontSize: "10px"
//       }}
//     />
//   );
// }

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val; 

function CustomTable({ columns, data, divided = false, defaultPageSize = 6 }) {
  
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  // const defaultColumn = React.useMemo(
  //   () => ({
  //     Filter: DefaultColumnFilter
  //   }),
  //   []
  // );

  const {
    getTableProps,
    getTableBodyProps,
    setGlobalFilter,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize,globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
      filterTypes
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
    <div className="d-flex justify-content-end" >
    <input
        type="text"
        value={globalFilter || ""}
        onChange={e => setGlobalFilter(e.target.value)}
        
      />
      </div>
      <table
        {...getTableProps()}
        className={`r-table table table-responsive ${classnames({ 'table-divided': divided })}`}
      >
        <thead >
          {headerGroups.map((headerGroup) => (
            <>
            <tr  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}

            </tr>
            {/* <tr style={{ backgroundColor: "aliceBlue" }}>
                  {headerGroup.headers.map((column, index) => (
                    <th className="tfilter">
                      {column.canFilter ? (
                        <FormGroup className="mb-1">
                          <Label className="divFilter mb-0">
                            Filter {column.render("Header")} :
                          </Label>
                          {column.render("Filter")}
                        </FormGroup>
                      ) : null}
                    </th>
                  ))}
                </tr> */}
                </>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (

              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (

                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>


                ))}
                {/*  <td>
                    <Button>Edit</Button>
                  </td>
                  <td>
                    <Button>Delete</Button>
                  </td> */}
              </tr>


            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

export const ReactTableWithPaginationCard = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'title',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Sales',
        accessor: 'sales',
        cellClass: 'text-muted w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Stock',
        accessor: 'stock',
        cellClass: 'text-muted w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Category',
        accessor: 'category',
        cellClass: 'text-muted w-40',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );

  return (

    <div className="mb-4">
      <CustomTable columns={cols} data={products} />
    </div>
  );
};

export const ReactTableDivided = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'title',
        cellClass: 'list-item-heading w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Sales',
        accessor: 'sales',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Stock',
        accessor: 'stock',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Category',
        accessor: 'category',
        cellClass: 'text-muted  w-20',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );
  return (
    <div className="mb-4">
      <CardTitle>
        {/*  <IntlMessages id="table.divided" /> */}
      </CardTitle>
      <div className="mb-4">
        <CustomTable columns={cols} data={products} divided />
      </div>
    </div>
  );
};

export default CustomTable;
