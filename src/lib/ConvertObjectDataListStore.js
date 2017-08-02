class ConvertObjectDataListStore {
  constructor(data) {
    this.data = data || []
    this.size = data.length || 0
  }

  getObjectAt(index) {
    return this.data[index]
  }

  getAll() {
    if (this.data.length < this.size) {
      for (let i = 0; i < this.size; i += 1) {
        this.getObjectAt(i);
      }
    }
    return this.data.slice();
  }

  getSize() {
    return this.size;
  }
}

export default ConvertObjectDataListStore
