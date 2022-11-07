import "./category.css";
import {useEffect, useState, useRef} from "react";

const Category = ({taskId, categoryId, categories, setCategory}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(categoryId);
  const dropDownRef = useRef(null);

  const cancelEditing = () => {
    setIsEditing(false);
    setValue(categoryId);
  }




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef && !dropDownRef?.current?.contains(event.target)) {
        cancelEditing();
      }
    }
    if (isEditing) {
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      }
    }
  }, [isEditing]);


  const onCategoryClick = () => {
    setIsEditing(true);
  }


  const onSelectCat = (id) => {
    setCategory(taskId, id);
    setValue(id);
    setIsEditing(false);
  }

  let cat = categories.find(item => item.id === categoryId);

  return (
    <>
    <div className="category-editor-wrapper" ref={dropDownRef}>
      <div className={categoryId ? "category-label" : "category-label add-category-label"} style={{backgroundColor: cat?.color}} onClick={onCategoryClick}>
        {cat?.name || "+ кат"}
      </div>
      {isEditing && (
        <div>
          <div className="category-editor">
            {categories.map((item) => (
              <div key={item.id} className="category-label" style={{backgroundColor: item.color}} onClick={() => {onSelectCat(item.id)}}>
                {item.name}
              </div>
            ))}
            <div className="borderline"/>
            <div key="0" className="category-label" style={{backgroundColor: "#DFE1E6"}} onClick={() => {onSelectCat(null)}}>
              нет
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )


}


export default Category;