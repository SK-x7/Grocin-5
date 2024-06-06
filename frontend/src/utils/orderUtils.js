export function formatDateOfOrders(dateString) {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
  
    const date = new Date(dateString);
  
    // Separate date and time parts
    const [datePart, timePart] = date.toLocaleString('en-GB', options).split(', ');
  
    return `${datePart.replace(/\//g, '/')} at ${timePart}`;
  }
  
  
  
export function extractProductNames(products){
    if (!Array.isArray(products)) return [];
    console.log(products);
    const productNames=products.flatMap(product => 
        product?.productId?.name)
    
    // console.log(productNames,"╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯")
    return productNames.join(', ');
    // return products.flatMap(product => 
    //     product?.productId.map((product)=>product?.name)
    // );  
}