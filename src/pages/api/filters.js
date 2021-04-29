import WetFood from '@models/WetFood';
import dbConnect from '@utils/dbConnect';

const handler = async (req, res) => {


    const { texture, brand, include, exclude, offset, limit } = req.query;
    
    
    const queryArr = [];

     if (typeof brand !== 'undefined') {
        if (Array.isArray(brand)) {
            queryArr.push({$or: brand.map(item => ( {brand: item} ) )}) 
         } else {
            queryArr.push( {brand: brand} ) 
         }
    }
    if (typeof texture !== 'undefined') {
        if (Array.isArray(texture)) {
            queryArr.push({$or: texture.map(item => ( { "texture": item} ) )})
        } else {
            queryArr.push( {texture: texture} ) 
        } 
    }

    if (typeof include !== 'undefined') {
        if (Array.isArray(include)) {
            queryArr.push({$and: include.map(item => ( {[item] : "Yes"} ) )})
        } else {
            queryArr.push( {[include]: "Yes"} ) 
        }  
    }

    if (typeof exclude !== 'undefined') {
        if (Array.isArray(exclude)) {
        queryArr.push({$and: exclude.map(item => ( {[item]: "No"} ) )}) 
        } else {
            queryArr.push( {[exclude]: "No"} ) 
        }
    }

 

    //console.log("query Arr: " , queryArr);

    //add error handling if DB does not connect
    try {
        await dbConnect();
        const results = await WetFood.find().and(queryArr).select('brand product_line flavor texture -_id').skip(Number(offset)).limit(Number(limit)).lean();
       const count = await WetFood.find().and(queryArr).select('brand product_line flavor texture -_id').countDocuments();
       
        res.status(200).json({results, count})
    } catch(error) {
        res.status(500).json(error)
    }
    


    /* 
    
        mongoose query should look something like this 

         .and([
          { $or: [{brand: brand[0]}, {brand: brand[1]}] },
          { $or: [{texture: texture[0]}, {texture: texture[1]}] },
          { $and: [{include[0]: "Yes"}, {include[1]: "Yes"}] },
          { $and: [{exclude[0]: "No"}, {exclude[1]: "No"}] },
        ])
    
    */
    
    
}

export default handler;