import object from 'lodash/object';
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
        
        const ingredientsData = await WetFood.find()
            .and(queryArr)
            .select('-brand -product_line -flavor -texture')
            .lean();


        //return an object of arrays; each array contains ingredients whose values in the above object were 'Yes'
        //TODO: try to accomplish this in the query itself...
        const ingredients = ingredientsData.reduce( (acc, currentVal) => {
            const currentId = currentVal['_id'];
            const pickedIngredents = object.pickBy(currentVal, (value, key) => {
                return typeof value === 'string' && value.toLowerCase() === "yes"
                });
    
            const ingredientList = Object.keys(pickedIngredents);


            if (!acc[currentId]) acc[currentId] = [];
            acc[currentId].push(...ingredientList);
            return acc;
        }, {}) 

     

        const results = await WetFood.find()
            .and(queryArr).select('brand product_line flavor texture')
            .skip(Number(offset))
            .limit(Number(limit)).lean();

       const count = await WetFood.find()
                        .and(queryArr)
                        .select('brand product_line flavor texture -_id')
                        .countDocuments();
       
        res.status(200).json({results, count, ingredients})
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