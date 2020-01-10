const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe.only(`Shopping List service object`, function() {
    let db 
    let testItems = [
        {
            id: 1,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            name: 'First test item!',
            price: 10.00,
            checked: false,
            category: 'Main'
        },
        {
            id: 2,
            date_added: new Date('2100-05-22T16:28:32.615Z'),
            name: 'Second test item!',
            price: 5.00,
            checked: false,
            category: 'Lunch'
        },
        {
            id: 3,
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            name: 'Third test item!',
            price: 1.00,
            checked: false,
            category: 'Breakfast'
        }
    ]

    before( () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    })
    before( () => db('shopping_list').truncate())
    afterEach(() => db('shopping_list').truncate())

    after( () => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach( () => {
            return db
                .into('shopping_list')
                .insert(testItems)
        })

        it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
            //test that ShoppingListService.getAllItems gets data from table
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems)
                })
        })

        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const idToGet = 3
            const thirdTestItem = testItems[idToGet - 1]
            return ShoppingListService.getById(db, idToGet)
                .then(actual => {
                    expect(actual).to.eql({
                        id: idToGet,
                        name: thirdTestItem.name,
                        price: thirdTestItem.price,
                        date_added: thirdTestItem.date_added,
                        checked: thirdTestItem.checked,
                        category: thirdTestItem.category
                    })
                })
        })

        it(`deleteArticle() removes an article by id from 'shopping_list' table`, () => {
            const itemId = 3
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems => {
                    //copy the test items array without the deleted item
                    const expected = testItems.filter(item => item.id !== itemId)
                    expect(allItems).to.eql(expected)
                })
        })

        it(`updateItem() updates an item from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 3
            const newItemData = {
                name: 'updated item',
                price: 0.99,
                date_added: new Date(),
                checked: true,
            }

            const originalItem = testItems[idOfItemToUpdate - 1]
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(article => {
                    expect(article).to.eql({
                        id: idOfItemToUpdate,
                        ...originalItem,
                        ...newItemData
                    })
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllArticles() resolves an empty array`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
            const newItem = {
                name: 'Test New Item',
                price: 100.00,
                date_added: new Date('2020-01-01T00:00:00.000Z'),
                checked: false,
                category: 'Main'
            }

            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        date_added: newItem.date_added,
                        checked: newItem.checked,
                        category: newItem.category
                    })
                })
        })
    })
})