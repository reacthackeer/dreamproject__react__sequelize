const controllerUtils = {};
controllerUtils.bufferDataConverter = (data) => {
    return JSON.parse(Buffer.from(JSON.parse(data)).toString());
}

controllerUtils.multipleDataValueConverter = (allSearchProductResult) => {
    let allProducts = [];
    allSearchProductResult.forEach((info)=>{
        let newInfo = {...info.dataValues};
            newInfo.infos = JSON.parse(newInfo.infos);
            allProducts.push(newInfo);
    });
    return allProducts;
}
controllerUtils.getSortAndHighAndLowPrice = (allProducts) => {
    let shortedProduct = allProducts?.sort((a,b)=> a?.infos?.current__price - b?.infos?.current__price);
    let lowPrice = shortedProduct[0]?.infos?.current__price;
    let highPrice = shortedProduct[shortedProduct.length - 1]?.infos?.current__price;
    return {shortedProduct, lowPrice, highPrice}
}
controllerUtils.brandFilter = (result) => { 
    let product = []; 
    let brandCollection = [];
    let brandIdCollection = []; 
    let typeCollection = [];
    let typeIdCollection = [];
    let filter__navbar = [];

    result.forEach((newInfo) => {
        let info =  newInfo; 
            product.push(info);  
            if(brandCollection.indexOf(info.brand) === -1){
                brandCollection.push(info.brand);
                brandIdCollection.push([info.product__id]);
            }else{
                let brandIndex = brandCollection.indexOf(info.brand);
                    brandIdCollection[brandIndex].push(info.product__id)
            }
            if(typeCollection.indexOf(info.parent) === -1){
                typeCollection.push(info.parent);
                typeIdCollection.push([info.product__id]);
            }else{
                let typeIndex = typeCollection.indexOf(info.parent);
                typeIdCollection[typeIndex].push(info.product__id)
            }

    }) 
    let brandDataset = [];
    brandCollection.forEach((info, index) => {
        brandDataset.push([info, brandIdCollection[index]])
    })
        brandDataset = brandDataset.length ? brandDataset : []
    let typeDataset = [];

    typeCollection.forEach((info, index) => {
        typeDataset.push([info, typeIdCollection[index]])
    })  
    
    typeDataset = typeDataset.length ? typeDataset : []
    filter__navbar.push({name: 'brand', dataset: brandDataset})
    filter__navbar.push({name: 'category', dataset: typeDataset})  
    
    return {product, filterNavbar: filter__navbar};
}

controllerUtils.allBrandFilter = (result) => {
    let brandCollection = [];
    let brandIdCollection = []; 
    let allProducts = result;

    allProducts.forEach(info => { 
        info = info;
        if(brandCollection.indexOf(info.brand) === -1){
            brandCollection.push(info.brand);
            brandIdCollection.push([info.product__id]);
        }else{
            let brandIndex = brandCollection.indexOf(info.brand);
                brandIdCollection[brandIndex].push(info.product__id)
        }
    })
    let brandDataset = [];
    brandCollection.forEach((info, index) => {
        brandDataset.push([info, brandIdCollection[index]])
    })   
    return {brandDataset}
}


controllerUtils.getAllCategoryCollection = (result) => {
    let brandCollection = [];
    let brandIdCollection = []; 
    let allProducts = result;

    allProducts.forEach(info => { 
        info = info;
        if(brandCollection.indexOf(info.parent) === -1){
            brandCollection.push(info.parent);
            brandIdCollection.push([info.product__id]);
        }else{
            let brandIndex = brandCollection.indexOf(info.parent);
                brandIdCollection[brandIndex].push(info.product__id)
        }
    })
    let brandDataset = [];
    brandCollection.forEach((info, index) => {
        brandDataset.push([info, brandIdCollection[index]])
    })  

    return {brandDataset};
}

controllerUtils.getSingleCategory = (result) => {
    let product = []; 
    let brandCollection = [];
    let brandIdCollection = []; 
    let typeCollection = [];
    let typeIdCollection = [];
    let filter__navbar = [];

    result.forEach((newInfo) => {
            let info = newInfo;
            product.push(info); 

            if(brandCollection.indexOf(info.brand) === -1){
                brandCollection.push(info.brand);
                brandIdCollection.push([info.product__id]);
            }else{
                let brandIndex = brandCollection.indexOf(info.brand);
                    brandIdCollection[brandIndex].push(info.product__id)
            }
            if(typeCollection.indexOf(info.child) === -1){
                typeCollection.push(info.child);
                typeIdCollection.push([info.product__id]);
            }else{
                let typeIndex = typeCollection.indexOf(info.child);
                typeIdCollection[typeIndex].push(info.product__id)
            }

    }) 
    let brandDataset = [];
    brandCollection.forEach((info, index) => {
        brandDataset.push([info, brandIdCollection[index]])
    })
        brandDataset = brandDataset.length ? brandDataset : []
    let typeDataset = [];

    typeCollection.forEach((info, index) => {
        typeDataset.push([info, typeIdCollection[index]])
    })
    typeDataset = typeDataset.length ? typeDataset : []
    filter__navbar.push({name: 'brand', dataset: brandDataset})
    filter__navbar.push({name: 'category', dataset: typeDataset}) 
    // res.status(200).send({ products: product, filterNavbar: filter__navbar ,status__code: 200});
    return {product, filter__navbar};
}

controllerUtils.FilterNavbarConverter = (data) => {
    let collections = [];
    data.forEach((infoTop) => {   
        infoTop.data.forEach((info) => { 
            if(collections.indexOf(info) === -1){
                collections.push(info.toLowerCase());
            } 
        }) 
    })
    return collections;
}

controllerUtils.specificationsStringConverter = (str) => {
    let regex1 = /sss__sss___sss/g
    let regex2  = /sss==sss===sss/g 
    let regex3  = /sss@@sss@@@sss/g  
    let regex4  = /sss##sss###sss/g  
    let regex5 = /sssttsssttsssttsssttsssttsss/g
    let regex6 = /sssccsssccsssccsssccsssccsss/g
    let regex7 = /sssnnsssnnsssnnsssnnsssnnsss/g 
    let result = str.replace(regex1, "'");
        result = result.replace(regex2, '"');
        result = result.replace(regex3, ',');
        result = result.replace(regex4, '`');
        result = result.replace(regex5, '\t');
        result = result.replace(regex6, ':');
        result = result.replace(regex7, '\n');
    return result;
}

controllerUtils.filterNavbarAndSpecificationDataProducer = (specifications, keys) => {
    let categoryData = [];
    let productHeaders = [] 
    specifications.forEach((singleData) => {
        var {info, product__id} = singleData;
        
        info.forEach((specifications) => {
            var {title, infos} = specifications;
            infos.forEach((tr) => {
                var {title:header , info:dataInfoTd} = tr;
                let data__part = controllerUtils.specificationsStringConverter(dataInfoTd).split(' '); 
                if(keys.indexOf(header.toLowerCase()) !== -1 || header.toLowerCase() === 'brand'){ 
                    let currentInsertProductHeaderIndex = productHeaders.indexOf(controllerUtils.specificationsStringConverter(header).toLowerCase())
                    let thisData = categoryData[currentInsertProductHeaderIndex]; 

                    if( currentInsertProductHeaderIndex !== -1){

                        let workingData = categoryData[currentInsertProductHeaderIndex]; 
                        let workingDataKeys = workingData[workingData.length - 1];
                        let prevData = workingData.slice(0, workingData.length - 1);
                        let workingDataIndex = workingDataKeys.indexOf(controllerUtils.specificationsStringConverter(dataInfoTd).toLowerCase());
                        let newData = [...prevData];
                        let newKeys= [...workingDataKeys]
                        
                        if(workingDataIndex === -1){ 
                            newData.push([controllerUtils.specificationsStringConverter(dataInfoTd).toLowerCase(), [product__id]]);
                            newKeys.push(controllerUtils.specificationsStringConverter(dataInfoTd).toLowerCase());
                            newData.push(newKeys); 
                            categoryData[currentInsertProductHeaderIndex] = newData;  
                        } else {   
                            let currentWorkingProduct = workingData[workingDataIndex]
                            let name = currentWorkingProduct[0];
                            let ides = [...currentWorkingProduct[1]];
                            ides.push(product__id) 
                            workingData[workingDataIndex] = [name, ides];
                            categoryData[currentInsertProductHeaderIndex] = workingData 
                        } 
                    }else{
                        // todo Completed task
                        productHeaders.push(controllerUtils.specificationsStringConverter(header).toLowerCase());
                        categoryData.push([[ controllerUtils.specificationsStringConverter(dataInfoTd).toLowerCase() , [ product__id ]] , [controllerUtils.specificationsStringConverter(dataInfoTd).toLowerCase()]])
                      // todo Completed task
                    }
                } 
            } )
        })
    }) 

    const finalFilteredArray = []; 

    productHeaders.forEach((info, index) => {
            let currentData =  categoryData[index];
            if(currentData.length){ 
                let pureData = [];
                categoryData[index].forEach((info)=>{ 
                    if(typeof(info[1]) === 'object'){
                        pureData.push([info[0],info[1]]);
                    }
                });
                finalFilteredArray.push({name: info, dataset: pureData})
            }
        
    })

    return finalFilteredArray;
}

controllerUtils.childProductAndSpecification = (result, resultFilter) => {
    
    let product = result;
    let specifications = [];

    product.forEach((info) => {

        let newInfo = info 
        let newSpecificationInfo = {} 
            newSpecificationInfo.info = newInfo.infos.specifications
            newSpecificationInfo.product__id = newInfo.infos.product__id;
            specifications.push(newSpecificationInfo)

    })
    

    collectionFilter = controllerUtils.FilterNavbarConverter(resultFilter);
    let filterNavbar = controllerUtils.filterNavbarAndSpecificationDataProducer(specifications, collectionFilter);
    
    return {product, filterNavbar};
}


controllerUtils.bufferDataConverter = (data) => {
    return JSON.parse(Buffer.from(JSON.parse(data)).toString());
}

controllerUtils.bufferDataMaker = (data)  => {
    let bufferData = Buffer.from(JSON.stringify(data));
    return JSON.stringify(bufferData);
}

controllerUtils.navbarMaker = (data) => {
    let {child, parent, parent__father, up} = data;
    let navbarInfos = [];
    let upJustHeader = [];
    up.forEach((upInfo)=>{
        navbarInfos.push({link__name: upInfo.name, img__src: upInfo.src, links: []});
        upJustHeader.push(upInfo.name);
    })
    let parentFatherJustHeader = [];
    parent__father.forEach((info)=>{
        
        let upIndex = upJustHeader.indexOf(info.up);
            navbarInfos[upIndex].links.push({link__name: info.name, img__src: info.src, links: []});
            parentFatherJustHeader.push(`${info.up}__${info.name}`);
    });
    let parentJustHeader = [];

    parent.forEach((info, index)=>{
        
        let upIndex = upJustHeader.indexOf(info.up);
        let parentFatherIndex = parentFatherJustHeader.indexOf(`${info.up}__${info.parent__father}`) 
            navbarInfos[upIndex].links[parentFatherIndex].links.push({link__name: info.name, links: [], img__src: info.src});
            parentJustHeader.push({upIndex, parentFatherIndex, name: `${info.name}__${info.up}`})
    });
    

    child.forEach((childInfo)=> {
        let {upIndex, parentFatherIndex} = parentJustHeader.filter((info)=> info.name === `${childInfo.parent}__${childInfo.up}`)[0];
            let items = navbarInfos[upIndex].links[parentFatherIndex].links;
            let parentItem = items.filter((info)=> info.link__name === childInfo.parent)[0];
            parentItem.links.push({link__name: childInfo.name, img__src: childInfo.src});
    }) 
    return navbarInfos;
}

module.exports = controllerUtils;