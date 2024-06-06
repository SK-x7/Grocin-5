function SiteFeatures() {
    const features=[
        {
        source:"https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg",
        Heading_text:"Best prices & offers",
        text:"Orders $ 50 or more"
    },
        {
        source:"https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg",
        Heading_text:"Best prices & offers",
        text:"Orders $ 50 or more"
    },
        {
        source:"https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg",
        Heading_text:"Best prices & offers",
        text:"Orders $ 50 or more"
    },
        {
        source:"https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg",
        Heading_text:"Best prices & offers",
        text:"Orders $ 50 or more"
    },
        {
        source:"https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg",
        Heading_text:"Best prices & offers",
        text:"Orders $ 50 or more"
    },
    
        
]
    // console.log(features);
    return (
        <div className="lg:w-full   lg:h-32 lg:grid lg:grid-cols-5 lg:grid-rows-1 lg:gap-4 lg:px-4 lg:my-16 lg:bg-blue-100  md:grid md:grid-cols-2 md:gap-5 md:px-11 md:w-1/2 md:justify-center items-center mx-auto md:my-16
        
        ">
            {
                features.map((feature)=>(

                     <div key={feature.text} className="bg-red-100 grid grid-cols-2 grid-rows-1 p-4 rounded-xl md:justify-center">
                <div className="h-full  flex justify-center items-center">
                    <img src={feature.source} className=""/>
                </div>
                <div className="flex flex-1 flex-col justify-center items-start h-full gap-1">
                    <span>{feature.Heading_text}</span>
                    <span className="text-xs">{feature.text}</span>
                </div>
            </div> 
                ))
            }
        </div>
            //  <div className="bg-red-100 grid grid-cols-2 grid-rows-1 p-4 rounded-xl ">
            //     <div className="h-full  flex justify-center items-center">
            //         <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg" className=""/>
            //     </div>
            //     <div className="flex flex-1 flex-col justify-center items-start h-full gap-1">
            //         <span>Best prices & offers</span>
            //         <span className="text-xs">Orders $ 50 or more</span>
            //     </div>
            // </div> 
            //  <div className="bg-blue-100"></div>
            // <div className="bg-red-100"></div>
            // <div className="bg-blue-100"></div>
            // <div className="bg-red-100"></div>
            // <div className="bg-blue-100"></div> 
    )
}

export default SiteFeatures
