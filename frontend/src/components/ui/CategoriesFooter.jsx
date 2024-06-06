import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getCategories } from "../../apis/categoryApi"

function CategoriesFooter() {
    const{data}=useQuery({
        queryKey:["getCategory"],
        queryFn:getCategories,
    })
    
    const dummycategories=[
        { "name": "Fruits & Vegetables" },
        { "name": "Atta, Rice, Oil & Dals" },
        { "name": "Masala & Dry Fruits" },
        { "name": "Sweet Cravings" },
        { "name": "Frozen Food & Ice Creams" },
        { "name": "Baby Food" },
        { "name": "Dairy, Bread & Eggs" },
        { "name": "Cold Drinks & Juices" },
        { "name": "Munchies" },
        { "name": "Meats, Fish & Eggs" },
        { "name": "Breakfast & Sauces" },
        { "name": "Tea, Coffee & More" },
        { "name": "Biscuits" },
        { "name": "Makeup & Beauty" },
        { "name": "Bath & Body" },
        { "name": "Cleaning Essentials" },
        { "name": "Home Needs" },
        { "name": "Electricals & Accessories" },
        { "name": "Hygiene & Grooming" },
        { "name": "Health & Baby Care" },
        { "name": "Homegrown Brands" },
        { "name": "Paan Corner" }
    ]
    // console.log(data);
    const categories=data?.data?.data?.categories||dummycategories;
    // const activeSubcategory=categories[0].subcategories[0];
    // console.log(activeSubcategory,"..............................🔽🔽🔽🔽🔽🔽🔽🔽🔽..................................................")

    
    console.log(typeof categories);
    console.log(categories);
    return (
        <div className="mx-auto xl:min-w-96  w-full sm:block pt-4 sm:pt-0 ">
            <h3 className=" text-lg font-semibold pb-2">Categories</h3>
            <div className="">
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {/* cn/:categoryName/cid/:categoryId */}
                    {
                        categories.map((category)=>(
                            <Link key={category?.name} to={`/cn/${category?.name}/${category?.subcategories?.[0]?.name}/cid/${category?._id}/scid/${category?.subcategories?.[0]?._id}`.replace(/\s+/g, '-').replace(/\s+|and/gi, '-').replace(/\s+|and|&|,/gi, '-').replace(/-+/g, '-').toLowerCase()}>
                            <li className="my-2.5 text-sm xl:text-base font-medium" key={category.name} >{category.name}</li>
                        </Link>
                            ))
                        }
                    
                </ul>
            </div>
        </div>
    )
}

export default CategoriesFooter


// Fruits & Vegetables

// Atta, Rice, Oil & Dals

// Masala & Dry Fruits

// Sweet Cravings

// Frozen Food & Ice Creams

// Baby Food

// Dairy, Bread & Eggs

// Cold Drinks & Juices

// Munchies

// Meats, Fish & Eggs

// Breakfast & Sauces

// Tea, Coffee & More

// Biscuits

// Makeup & Beauty

// Bath & Body

// Cleaning Essentials

// Home Needs

// Electricals & Accessories

// Hygiene & Grooming

// Health & Baby Care

// Homegrown Brands

// Paan Corner