import { useNavigate } from "react-router";
import { getMealsCategories } from "../../services/mealsApi";
import { useQuery } from "@tanstack/react-query";

export default function CategoryCard() {
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getMealsCategories,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log("our data", data);
  return (
    <div className="category-card" onClick={() => navigate("/meal/category")}>
      {data.categories.map((category) => (
        <div key={category.idCategory}>
          <img src={category.strCategoryThumb} />
          <h1>{category.strCategory}</h1>
          <p className="description">{category.strCategoryDescription}</p>
        </div>
      ))}
    </div>
  );
}
