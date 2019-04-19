import React, { Component } from 'react';

export default class InterestSkillList extends Component {
  renderList = (list, styleName) => {
    let listItems = [];
    for (let i = 0; i < list.length; i++) {
      const listItem = list[i];
      if (i < 5) {
        listItems.push(
          <li key={listItem} className={styleName}>
            {listItem}
          </li>
        );
      } else {
        listItems.push(<li>{`+ ${list.length - i} More`}</li>);
        break;
      }
    }
    return listItems;
  };
  render() {
    const { list, customStyle } = this.props;
    return list.length > 0 ? (
      <ul className="skill-interest-list">
        {this.renderList(list, customStyle)}
      </ul>
    ) : null;
  }
}
