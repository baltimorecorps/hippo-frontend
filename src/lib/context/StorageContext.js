import React from 'react';

class StorageContext extends React.Component {
  state = this.props.value;
  storageKey = `baltimoreCorps.${this.props.storageKey}`;

  componentWillMount() {
    this.loadStateFromStorage();
  }

  loadStateFromStorage = () => {
    const value = JSON.parse(window.localStorage.getItem(this.storageKey));
    // this.setState(value);
  };

  saveStateToStorage = (state) => {
    window.localStorage.setItem(this.storageKey, JSON.stringify(state));
  };

  render() {
    const { children, context: Context, setterName } = this.props;
    const value = this.state;

    if (setterName) {
      value[setterName] = (state) => {
        this.saveStateToStorage(state);
        this.setState(state);
      };
    }

    return (
      <Context.Provider value={value}>
        {typeof children === 'function' ? children(value) : children}
      </Context.Provider>
    );
  }
}

export default StorageContext;
