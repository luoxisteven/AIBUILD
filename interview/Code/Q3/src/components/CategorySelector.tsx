import React, { useState } from 'react';
import { TreeSelect, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../store/categorySlice';
import { RootState } from '../store/Store';
import { CategoryNode } from '../types/Types';

const useFetchCategories = () => {
    const dispatch = useDispatch();
    
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/categories');
            const categoriesData = await response.json();
            dispatch(setCategories(categoriesData));
            console.log(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    return fetchCategories;
};

// Convert CategoryNode to TreeSelect
const transformCategoryToTreeData = (categories: CategoryNode[] | CategoryNode | null): any[] => {
  if (!categories) return [];
  
  const categoriesArray = Array.isArray(categories) ? categories : [categories];
  
  return categoriesArray.map(category => ({
      value: category.categoryId,
      title: category.name,
      children: category.children && category.children.length > 0 
          ? transformCategoryToTreeData(category.children) 
          : undefined
  }));
};

const CategorySelector: React.FC = () => {
    const categories = useSelector((state: RootState) => state.category.data);
    const fetchCategories = useFetchCategories();
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleChange = (value: string | null) => {
        setSelectedValue(value);
        alert(`Selected Category ID: ${value}`);
    };

    // Fetch when first render
    // useEffect(() => {
    //     fetchCategories();
    // }, []);
    
    // Convert CategoryNode to TreeSelect
    const treeData = transformCategoryToTreeData(categories);
    
    return (
        <div>
            <Button onClick={fetchCategories}>Fetch Categories</Button>
            <TreeSelect
                style={{ width: '100%', marginTop: 10 }}
                value={selectedValue}
                treeData={treeData}
                placeholder="Please select a category"
                treeDefaultExpandAll
                onChange={handleChange}
            />
        </div>
    );
};

export default CategorySelector;