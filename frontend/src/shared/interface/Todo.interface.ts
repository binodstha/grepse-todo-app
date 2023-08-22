export interface TodoFilterItem {
    value: string;
    label: string;
    isChecked: boolean;
  }

  export interface TodoFilterDropdown {
    label: string;
    filters: Array<TodoFilterItem>
    onSelectDropdown: any
  }

  export interface TodoFormValues {
    userId: string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
  }

  export interface TodoPaginationProps {
    currentPage: number; 
    totalPages: number;
    setCurrentPage: any; 

}
  