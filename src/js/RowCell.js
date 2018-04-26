import '../css/row-cell.css';
import React, { Component, PropTypes } from 'react';
import RowIndent from './RowIndent';
import dateFormat from 'dateformat';

class RowCell extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'RowCell';
  }
  render() {
    const {
      Elem,
      reactKey,
      indent,
      useIndent,
      data,
      type,
      format,
      formatter,
      className,
      showExpandCollapse,
      isExpanded,
      onExpandToggle
    } = this.props;

    // indentation dummies
    let rowIndent = null;
    if (useIndent) {
      rowIndent = <RowIndent indent={indent} reactKey={reactKey}></RowIndent>;
    }

    // expand or collapse icon
    let expandToggleIcon = null;
    if (showExpandCollapse && !isExpanded) {
      expandToggleIcon = <span className='i-expand' onClick={onExpandToggle}></span>;
    } else if (showExpandCollapse && isExpanded) {
      expandToggleIcon = <span className='i-collapse' onClick={onExpandToggle}></span>;
    } else if (!showExpandCollapse) {
      expandToggleIcon = <span className='i-dummy'></span>;
    }

    let displayText = data;
    if (type === 'date' && typeof data !== 'undefined') {
      displayText = dateFormat(data, format);
    }

    if (typeof formatter === 'function') {
      displayText = formatter(data);
    }

    return (
      <td className='tgrid-data-cell'>
        {rowIndent}
        {Elem ? <Elem/> : null}
        {expandToggleIcon}
        <span className={className}>{displayText}</span>
      </td>
    );
  }
}

RowCell.propTypes = {
  reactKey: PropTypes.string.isRequired,
  indent: PropTypes.number,
  useIndent: PropTypes.bool,
  data: PropTypes.any,
  type: PropTypes.string,
  format: PropTypes.string,
  formatter: PropTypes.func,
  Elem: PropTypes.func,
  className: PropTypes.string,
  showExpandCollapse: PropTypes.bool,
  isExpanded: PropTypes.bool,
  onExpandToggle: PropTypes.func
};

RowCell.defaultProps = {
  format: 'mm/dd/yyyy'
};

export default RowCell;
