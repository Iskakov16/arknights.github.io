// класс для хранения данных о мире игры  (здания)
class WorldData {
    //  конструктор инициализирует массив зданий
    constructor() {
        this.buildings = []
    }
    // Добавляет здание в мир на указанные координаты с ориентацией и типом минерала
    addBuilding(building, x, y, orientation = 0, mineralType = null) {
        const buildingAtPosition = this.buildings.find(b => b.x === x && b.y === y)
        if (buildingAtPosition) {
            return false
        }
        this.buildings.push({ type: building, x, y, orientation, mineralType })
        return true
    }
}

// класс для управления инвентарем игрока
class Inventory {
    // конструктор инициализирует объект предметов
    constructor() {
        this.items = {}
    }
    // Обновляет пользовательский интерфейс инвентаря, отображая все предметы
    updateUI() {
        const inventoryItems = document.getElementById('inventoryItems')
        const items = this.getAllItems()
        inventoryItems.innerHTML = items.map(([type, count]) =>
            `<div class="inventoryItem" data-type="${type}">
                <p class="count">${count}</p>
                <div class="inventoryItemIcon ${type}"></div>
                <p>${this.getBuildingName(type)}</p>
            </div>`
        ).join('')

        inventoryItems.querySelectorAll('.inventoryItem').forEach(item => {
            item.addEventListener('click', () => selectInventoryItem(item.dataset.type))
        })
        if (selectedInventoryItem) {
            const selectedEl = inventoryItems.querySelector(
                `.inventoryItem[data-type="${selectedInventoryItem}"]`
            )
            if (selectedEl) {
                selectedEl.classList.add('selected')
            }
        }

    }
    // Добавляет предмет в инвентарь и обновляет UI
    addItem(type) {
        if (!this.items[type]) {
            this.items[type] = 0
        }
        this.items[type]++
        this.updateUI()
    }

    // Удаляет предмет из инвентаря и обновляет UI
    removeItem(type) {
        if (!this.items[type]) {
            return false
        }
        this.items[type]--
        if (this.items[type] == 0) {
            delete this.items[type]
        }
        this.updateUI()
        return true
    }

    // Возвращает количество предметов данного типа
    getCount(type) {
        if (this.items[type]) {
            return this.items[type]
        }
        else {
            return 0
        }
    }

    // Возвращает массив всех предметов с их количеством
    getAllItems() {
        const result = []
        for (let key in this.items) {
            const count = this.items[key]
            if (count > 0) {
                result.push([key, count])
            }
        }
        return result
    }
    // Возвращает русское название здания по типу
    getBuildingName(type) {
        const names = {
            'factory1': 'Завод 1-го ур',
            'factory2': 'Завод 2-го ур',
            'base': 'База',
            'upgrader': 'Улучшатель',
            'conveyors': 'Конвейер',
            'merger': 'Объединитель'
        }
        return names[type] || type
    }
    // Устанавливает количество предметов данного типа и обновляет UI
    setItem(type, count) {
        this.items[type] = count
        this.updateUI()
    }
}

// класс для управления магазином, где игрок покупает здания
class Shop {
    // Конструктор инициализирует магазин с инвентарем и ценами, запускает обработчики событий
    constructor(inventory) {
        this.inventory = inventory
        this.prices = {
            'factory1': 10,
            'factory2': 25,
            'base': 100,
            'upgrader': 50,
            'conveyors': 1,
            'merger': 50
        }
        this.start()
    }
    // Добавляет обработчики кликов на товары в магазине
    start() {
        const shopItems = document.querySelectorAll('.shopItem')
        shopItems.forEach(item => {
            item.addEventListener('click', () => {
                const type = item.dataset.type
                const price = parseInt(item.dataset.price)
                this.buyItem(type, price)
            })
        })
    }
    // Обновляет UI магазина, делая товары доступными или недоступными в зависимости от очков
    updateShopUI() {
        const shopItems = document.querySelectorAll('.shopItem')
        shopItems.forEach(item => {
            const price = parseInt(item.dataset.price)
            if (score < price) {
                item.classList.add('disabled')
            }
            else {
                item.classList.remove('disabled')
            }
        })
    }
    // Покупает товар, если хватает очков, добавляет в инвентарь и сохраняет игру
    buyItem(type, price) {
        if (score >= price) {
            score -= price
            pointsLabel.textContent = `Очки: ${score}`
            this.inventory.addItem(type)
            saveGame()
            this.updateShopUI()
        }
        else {
            alert('Недостаточно очков!')
        }
    }


}
let score = 1000
let selectedInventoryItem = null
let selectedBuilding = null
let placementOrientation = 0
let selectedRadio = null
const hasSave = localStorage.getItem('gameData')
//Создаю инвернтарь
const inventory = new Inventory()
if (!hasSave) {
    inventory.setItem('conveyors', 20)
    inventory.setItem('factory1', 1)
    inventory.setItem('factory2', 1)
    inventory.setItem('base', 1)
}
const shop = new Shop(inventory)
const pointsLabel = document.querySelector('.points')

pointsLabel.textContent = `Очки: ${score}`

shop.updateShopUI()

// Выбирает предмет в инвентаре для размещения
function selectInventoryItem(type) {
    document.querySelectorAll('.inventoryItem').forEach(item => { item.classList.remove('selected') })
    document.getElementById('deleteBtn').classList.remove('active')

    if (inventory.getCount(type) > 0) {
        selectedInventoryItem = type
        selectedBuilding = null
        const itemElement = document.querySelector(`.inventoryItem[data-type="${type}"]`)
        if (itemElement) {
            itemElement.classList.add('selected')
        }
    }
}
// Сохраняет текущее состояние игры в localStorage
function saveGame() {
    const minerals = []
    for (let i = 0; i < 625; i++) {
        const cell = gameBoard.children[i]
        minerals.push(cell.dataset.mineral || null)
    }
    const data = {
        score: score,
        inventory: inventory.items,
        buildings: worldData.buildings,
        minerals: minerals
    }
    localStorage.setItem('gameData', JSON.stringify(data))
}
// Загружает сохраненное состояние игры из localStorage
function loadGame() {
    const data = localStorage.getItem('gameData')
    if (!data) return
    const parsed = JSON.parse(data)

    // Сохранение всех данных
    score = parsed.score || 0
    pointsLabel.textContent = `Очки: ${score}`
    shop.updateShopUI()
    inventory.items = parsed.inventory || {}
    inventory.updateUI()

    const minerals = parsed.minerals
    if (minerals && minerals.length === 625) {
        for (let i = 0; i < minerals.length; i++) {
            const cell = gameBoard.children[i]
            const mineral = minerals[i]

            cell.classList.remove('mineralLead', 'mineralCopper')
            delete cell.dataset.mineral

            if (mineral === '1') {
                cell.classList.add('mineralLead')
                cell.dataset.mineral = '1'
            } else if (mineral === '2') {
                cell.classList.add('mineralCopper')
                cell.dataset.mineral = '2'
            }
        }
    }

    // Загрузка зданий
    worldData.buildings = parsed.buildings || []
    worldData.buildings.forEach(b => {
        const index = b.y * 25 + b.x
        const cell = gameBoard.children[index]

        if (!cell) return

        cell.classList.add(b.type)

        if (b.type === 'conveyors') {
            cell.style.transform = `rotate(${b.orientation}deg)`
        }

        if (b.type === 'factory1') {
            startFactoryProduction(cell, 'copper')
        }

        if (b.type === 'factory2') {
            startFactoryProduction(cell, 'lead')
        }
    })
}

// Преобразует угол ориентации в направление движения (dx, dy)
function orientationToDirection(orientation) {
    switch (orientation % 360) {
        case 0: return { dx: 1, dy: 0 }
        case 90: return { dx: 0, dy: 1 }
        case 180: return { dx: -1, dy: 0 }
        case 270: return { dx: 0, dy: -1 }
    }
    return { dx: 0, dy: 0 }
}
// Вычисляет путь конвейера от завода до базы или другого здания
function getConveyorPathFromFactory(startX, startY) {
    const path = []
    const factory = worldData.buildings.find(b => b.x === startX && b.y === startY)
    let direction = orientationToDirection(factory?.orientation || 0)
    let x = startX + direction.dx
    let y = startY + direction.dy

    while (x >= 0 && x < 25 && y >= 0 && y < 25) {
        const building = worldData.buildings
            .find(b => b.x === x && b.y === y)
        if (!building) break
        path.push({ x, y })
        if (building.type === 'base') {
            break
        }
        if (building.type === 'conveyors') {
            direction = orientationToDirection(building.orientation)
        }
        x += direction.dx
        y += direction.dy
    }
    return path
}
const cellSize = 25
const mineralChance = 0.02
// Двигает предмет вдоль пути конвейера, обрабатывая взаимодействия с зданиями
function moveAlongPath(item, path = []) {
    if (!Array.isArray(path) || path.length === 0) {
        item.remove()
        return
    }

    let idx = 0
    const velocity = 30// px per sec
    let lastTime = null
    let pos = {
        x: parseFloat(item.style.left) || 0,
        y: parseFloat(item.style.top) || 0
    }

    function tick(t) {
        if (lastTime === null) lastTime = t
        const dt = (t - lastTime) / 1000
        lastTime = t

        const dest = {
            x: path[idx].x * cellSize,
            y: path[idx].y * cellSize
        }
        const dx = dest.x - pos.x
        const dy = dest.y - pos.y
        const dist = Math.hypot(dx, dy)

        if (dist <= velocity * dt) {
            pos.x = dest.x
            pos.y = dest.y
            item.style.left = pos.x + 'px'
            item.style.top = pos.y + 'px'

            const cell = path[idx]
            const building = worldData.buildings.find(b => b.x === cell.x && b.y === cell.y)
            if (building) {
                //логика для улучшателя
                if (building.type === 'upgrader') {
                    const oreType = item.dataset.oreType
                    if (oreType === 'copper') {
                        item.classList.add('upgradedCopper')
                        item.classList.remove('oreCopper')
                        item.dataset.oreType = 'upgradedCopper'
                    }
                    else if (oreType === 'lead') {
                        item.classList.add('upgradedLead')
                        item.classList.remove('oreLead')
                        item.dataset.oreType = 'upgradedLead'
                    }
                    else if (oreType === 'graphite') {
                        item.classList.add('upgradedGraphite')
                        item.classList.remove('graphite')
                        item.dataset.oreType = 'upgradedGraphite'
                    }
                }
                // логика для базы 
                if (building.type === 'base') {
                    let gain = 0
                    const oreType = item.dataset.oreType

                    if (oreType === 'copper') {
                        gain = 1
                    }
                    else if (oreType === 'lead') {
                        gain = 4
                    }
                    else if (oreType === 'upgradedCopper') {
                        gain = 2
                    }
                    else if (oreType === 'upgradedLead') {
                        gain = 6
                    }
                    else if (oreType === 'graphite') {
                        gain = 10
                    }
                    else if (oreType === 'upgradedGraphite') {
                        gain = 15
                    }

                    score += gain
                    saveGame()
                    pointsLabel.textContent = `Очки: ${score}`
                    shop.updateShopUI()
                    item.remove()
                    return
                }
                // логика для объединителя
                if (building.type === 'merger') {
                    if (!building.storage) {
                        building.storage = {
                            lead: 0,
                            copper: 0
                        }
                    }
                    const oreType = item.dataset.oreType

                    if (oreType === 'lead') {
                        building.storage.lead++
                    }
                    else if (oreType === 'copper') {
                        building.storage.copper++
                    }
                    item.remove()
                    let newOreType = null
                    if (building.storage.lead >= 1 && building.storage.copper >= 1) {
                        building.storage.lead -= 1
                        building.storage.copper -= 1
                        newOreType = 'graphite'
                    }
                    if (newOreType) {
                        const newItem = document.createElement('div')
                        newItem.classList.add('moving-item')
                        newItem.classList.add('graphite')
                        newItem.dataset.oreType = newOreType

                        newItem.style.left = `${cell.x * cellSize}px`
                        newItem.style.top = `${cell.y * cellSize}px`

                        gameBoard.appendChild(newItem)

                        const newPath = getConveyorPathFromFactory(cell.x, cell.y)
                        moveAlongPath(newItem, newPath)
                    }

                    return
                }

            }

            idx++
            if (idx >= path.length) {
                item.remove()
                return
            }
        }
        else {
            const k = (velocity * dt) / dist
            pos.x += dx * k
            pos.y += dy * k
            item.style.left = pos.x + 'px'
            item.style.top = pos.y + 'px'
        }
        requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
}

// Создает предмет (руду) на заводе и начинает его движение по конвейеру
function createItemFromFactory(factoryCell, mineralType) {
    const item = document.createElement('div')
    item.classList.add('moving-item')

    if (mineralType === 'lead') {
        item.classList.add('oreLead')
        item.dataset.oreType = 'lead'
    }
    else if (mineralType === 'copper') {
        item.classList.add('oreCopper')
        item.dataset.oreType = 'copper'
    }

    const index = Array.prototype.indexOf.call(gameBoard.children, factoryCell)
    const startX = index % 25
    const startY = Math.floor(index / 25)

    item.style.left = `${startX * cellSize}px`
    item.style.top = `${startY * cellSize}px`
    gameBoard.appendChild(item)

    const path = getConveyorPathFromFactory(startX, startY)
    if (path.length === 0) {
        item.remove()
    }
    else {
        moveAlongPath(item, path)
    }
}

// Запускает производство на заводе, создавая предметы каждые 3 секунды
function startFactoryProduction(factoryCell, mineralType) {
    if (factoryCell.dataset.intervalId) {
        clearInterval(Number(factoryCell.dataset.intervalId))
    }
    const intervalId = setInterval(() => {
        createItemFromFactory(factoryCell, mineralType)
    }, 3000)

    factoryCell.dataset.intervalId = intervalId
}


const gameBoard = document.querySelector('#gameBoard')
const worldData = new WorldData()
const rotateBtn = document.getElementById('rotateBtn')

rotateBtn.addEventListener('click', () => {
    placementOrientation = (placementOrientation + 90) % 360
    switch (placementOrientation) {
        case 0:
            rotateBtn.textContent = 'Поворот: вправо'
            break
        case 90:
            rotateBtn.textContent = 'Поворот: вниз'
            break
        case 180:
            rotateBtn.textContent = 'Поворот: влево'
            break
        case 270:
            rotateBtn.textContent = 'Поворот: вверх'
            break
    }

})

//создание поля
//создание поля
for (let i = 0; i < 625; i++) {
    const cell = document.createElement('div')
    cell.className = 'cell'
    if (!hasSave) {
        const rand = Math.random()
        if (rand < mineralChance) {
            cell.classList.add('mineralLead')
            cell.dataset.mineral = '1'
        }
        else if (rand < mineralChance * 2) {
            cell.classList.add('mineralCopper')
            cell.dataset.mineral = '2'
        }
    }
    gameBoard.appendChild(cell)
}

if (!hasSave) {
    saveGame()
}

const deleteBtn = document.getElementById('deleteBtn')

deleteBtn.addEventListener('click', () => {
    selectedInventoryItem = null
    selectedBuilding = 'delete'
    document.querySelectorAll('.inventoryItem').forEach(item => {
        item.classList.remove('selected')
    })
    deleteBtn.classList.add('active')
})
gameBoard.addEventListener('click', (event) => {
    if (!event.target.classList.contains('cell')) { return }

    if (selectedBuilding !== 'delete') {
        selectedBuilding = selectedInventoryItem || getSelectedBuilding()
    }

    const index = Array.prototype.indexOf.call(gameBoard.children, event.target)
    const x = index % 25
    const y = Math.floor(index / 25)

    if (selectedBuilding === 'delete') {
        const idx = worldData.buildings.findIndex(b => b.x === x && b.y === y)
        if (idx === -1) return
        const cell = event.target
        if (cell.dataset.intervalId) {
            clearInterval(Number(cell.dataset.intervalId))
            delete cell.dataset.intervalId
        }
        worldData.buildings.splice(idx, 1)
        saveGame()
        cell.classList.remove('upgrader', 'conveyors', 'factory', 'factory1', 'factory2', 'base', 'merger')
        cell.style.transform = ''
        delete cell.dataset.mineralType
        return
    }
    let mineralType = null

    if (selectedBuilding === 'factory1') {
        if (!event.target.classList.contains('mineralCopper')) {
            alert('Можно поставить только на медь')
            return
        }
    }

    if (selectedBuilding === 'factory2') {
        if (!event.target.classList.contains('mineralLead')) {
            alert('Можно поставить только на свинец')
            return
        }
    }
    if (selectedBuilding === 'factory1') {
        mineralType = 'copper'
    }
    else if (selectedBuilding === 'factory2') {
        mineralType = 'lead'
    }

    if (!worldData.addBuilding(selectedBuilding, x, y, placementOrientation, mineralType)) {
        alert('На этой клетке уже есть здание')
        return
    }
    saveGame()
    // удаление здания из инвентаря
    if (selectedInventoryItem) {
        inventory.removeItem(selectedInventoryItem)

        if (inventory.getCount(selectedInventoryItem) === 0) {
            selectedInventoryItem = null

            document.querySelectorAll('.inventoryItem').forEach(item => {
                item.classList.remove('selected')
            })
        }
    }

    // ставим здание
    switch (selectedBuilding) {
        case 'factory1':
            event.target.classList.add('factory1')
            event.target.dataset.mineralType = 'copper'
            startFactoryProduction(event.target, 'copper')
            break
        case 'factory2':
            event.target.classList.add('factory2')
            event.target.dataset.mineralType = 'lead'
            startFactoryProduction(event.target, 'lead')
            break
        case 'base':
            event.target.classList.add('base')
            break
        case 'upgrader':
            event.target.classList.add('upgrader')
            break
        case 'merger':
            event.target.classList.add('merger')
            break
        case 'conveyors':
            event.target.classList.add('conveyors')
            event.target.style.transform = `rotate(${placementOrientation}deg)`
            break
    }
})


// Возвращает тип выбранного здания из радио-кнопок
function getSelectedBuilding() {
    if (selectedRadio) {
        return selectedRadio.value
    }
    return null
}
shop.updateShopUI()
loadGame()
localStorage.removeItem('gameData')

