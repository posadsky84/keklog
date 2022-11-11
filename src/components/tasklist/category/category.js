import './category.css';
import {
  useCallback, useEffect, useState, useRef,
} from 'react';

const Category = ({
  taskId, categoryId, categories, setCategory,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const dropDownRef = useRef(null);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropDownRef && !dropDownRef?.current?.contains(event.target)) {
        cancelEditing();
      }
    };
    if (isEditing) {
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      };
    }
  }, [isEditing, cancelEditing]);

  const onCategoryClick = () => {
    setIsEditing(true);
  };

  const onSelectCat = id => {
    setCategory(taskId, id);
    setIsEditing(false);
  };

  const cat = categories.find(item => item.id === categoryId);

  return (
    <div className="category-editor-wrapper" ref={dropDownRef}>
      <div
        className={categoryId ? `category-label` : `category-label add-category-label`}
        onClick={onCategoryClick}
        style={{ backgroundColor: cat?.color }}
      >
        {cat?.name || `+ кат`}
      </div>
      {isEditing && (
        <div>
          <div className="category-editor">
            {categories.map(item => (
              <div
                className="category-label"
                key={item.id}
                onClick={() => { onSelectCat(item.id); }}
                style={{ backgroundColor: item.color }}
              >
                {item.name}
              </div>
            ))}
            <div className="borderline" />
            <div
              className="category-label"
              key="0"
              onClick={() => { onSelectCat(null); }}
              style={{ backgroundColor: `#DFE1E6` }}
            >
              нет
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
