require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

// 1. Get all items that contain text
function searchItem(searchTerm){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log('SEARCHITEM')
            console.log(result)
        })
}

searchItem('steak')

//2. Get all items paginated
function paginateItems(pageNumber){
    const itemsPerPage = 6
    const offset = itemsPerPage * (pageNumber-1)
    knexInstance
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .limit(itemsPerPage)
        .offset(offset)
        .then(result => {
            console.log('PAGINATE')
            console.log(result)
        })
}

paginateItems(2)

//3. Get all items added after date
function itemsAddedAfterDate(daysAgo){
    knexInstance
        .select('id', 'name', 'date_added')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log('ITEMS ADDED DAYS AGO')
            console.log(result)
        })
}

itemsAddedAfterDate(5)

//4. Get total cost for each category
function totalCostPerCategory(){
    knexInstance
        .select('category')
        .from('shopping_list')
        .sum('')
        .then(result => {
            console.log('COST PER CATEGORy')
            console.log(result)
        })
}

totalCostPerCategory()