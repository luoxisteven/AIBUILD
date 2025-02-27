const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Allow cross origin
app.use(cors());

// Convert to tree
function convertToTree(categories) {
  const categoryObj = {};
  
  const rootCategory = {
    categoryId: "root",
    name: "Root Category",
    parent: null,
    children: []
  };
  
  categoryObj["root"] = rootCategory;
  
  // Give a empty children list for each categoy
  categories.forEach(category => {
    categoryObj[category.categoryId] = {
      ...category,
      children: []
    };
  });
  
  // Connect parents and children
  categories.forEach(category => {
    const parent = categoryObj[category.parent];
    const currentCategory = categoryObj[category.categoryId];
    // Find its parent
    if (parent) {
      parent.children.push(currentCategory);
    }
  });
  
  // Root
  return rootCategory;
}

// Endpoint
app.get('/api/categories', (req, res) => {
  try {
    const categoriesData = fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf8');
    
    const categories = JSON.parse(categoriesData);
    
    // Convert tto a tree structure
    const categoryTree = convertToTree(categories);
    
    res.json(categoryTree);
  } catch (error) {
    console.error("error", error);
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});