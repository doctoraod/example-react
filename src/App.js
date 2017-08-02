import React, { Component } from 'react'
import FixedDataTable from 'fixed-data-table'
import 'fixed-data-table/dist/fixed-data-table.min.css'

import ExampleData from './constant/ExampleData'
// import FakeObjectDataListStore from './lib/FakeObjectDataListStore'
import ConvertObjectDataListStore from './lib/ConvertObjectDataListStore'
import TextCell from './components/TextCell'
import SortHeaderCell from './components/SortHeaderCell'
import SortTypes from './constant/SortTypes'

const { Table, Column } = FixedDataTable;

class DataListWrapper {
  constructor(indexMap, data) {
    this.indexMap = indexMap;
    this.data = data;
  }

  getSize() {
    return this.indexMap.length;
  }

  getObjectAt(index) {
    return this.data.getObjectAt(
      this.indexMap[index],
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    // this.dataList = new FakeObjectDataListStore(2000);
    this.dataList = new ConvertObjectDataListStore(ExampleData);

    this.defaultSortIndexes = [];
    const size = this.dataList.getSize();
    for (let index = 0; index < size; index += 1) {
      this.defaultSortIndexes.push(index);
    }

    this.state = {
      sortedDataList: this.dataList,
      colSortDirs: {},
    };

    this.onSortChange = this.onSortChange.bind(this);
  }
  onSortChange(columnKey, sortDir) {
    const sortIndexes = this.defaultSortIndexes.slice();
    sortIndexes.sort((indexA, indexB) => {
      const valueA = this.dataList.getObjectAt(indexA)[columnKey];
      const valueB = this.dataList.getObjectAt(indexB)[columnKey];
      let sortVal = 0;
      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === SortTypes.ASC) {
        sortVal *= -1;
      }

      return sortVal;
    });

    this.setState({
      sortedDataList: new DataListWrapper(sortIndexes, this.dataList),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
  }
  render() {
    const { sortedDataList, colSortDirs } = this.state;
    return (
      <Table
        rowHeight={50}
        rowsCount={sortedDataList.getSize()}
        headerHeight={50}
        width={1000}
        height={500}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <SortHeaderCell
              onSortChange={this.onSortChange}
              sortDir={colSortDirs.id}>
              id
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={200}
        />
        <Column
          columnKey="product_name"
          header={
            <SortHeaderCell
              onSortChange={this.onSortChange}
              sortDir={colSortDirs.product_name}>
              Product Name
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={200}
        />
        <Column
          columnKey="supplier"
          header={
            <SortHeaderCell
              onSortChange={this.onSortChange}
              sortDir={colSortDirs.supplier}>
              Supplier
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={200}
        />
        <Column
          columnKey="quantity"
          header={
            <SortHeaderCell
              onSortChange={this.onSortChange}
              sortDir={colSortDirs.quantity}>
              Quantity
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={200}
        />
        <Column
          columnKey="unit_cost"
          header={
            <SortHeaderCell
              onSortChange={this.onSortChange}
              sortDir={colSortDirs.unit_cost}>
              Unit Cost
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={200}
        />
      </Table>
    );
  }
}


export default App;
