// Fetch function
async function fetchCategoryTree() {
  try {
    const response = await fetch('http://localhost:8080/api/categories');
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const categoriesData = await response.json();
    console.log(categoriesData)
    
    return categoriesData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

fetchCategoryTree();