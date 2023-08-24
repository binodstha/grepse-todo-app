import { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { TodoFilterDropdown, TodoFilterItem } from "src/shared/interface";
import './todo.styles.scss';

export const FilterDropdown: React.FC<TodoFilterDropdown> = ({
  label,
  filters,
  onSelectDropdown,
}) => {
  const handleDropdownSelect = (value: string | null) => {
    if (value) {
      onSelectDropdown(value);
    }
  };
  const activeValue = filters.find(item => item.isChecked)

  return (
    <Fragment>
      <label className="text-secondary my-2 pr-2 view-opt-label">{label}</label>
      <Dropdown onSelect={handleDropdownSelect} >
        <Dropdown.Toggle variant="custom-select-sm btn my-2" id="sort-dropdown" className="filter-dropdown">
          {activeValue?.label}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {filters.map((item: TodoFilterItem) => (
            <Dropdown.Item  active={item.isChecked} key={item.value} eventKey={item.value}>
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );
};
