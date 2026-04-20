const characters_data = [
    {
        name: "Эндминистратор",
        fraction: "Компания Endfield",
        race: "Неизвестно",
        rarity: 6,
        element: "images/ele-physic.jpg",
        character_img: "images/endministrator1.png",
        VA: "Andrea Gatchalian",
    },
    {
        name: "Эндминистратор",
        fraction: "Компания Endfield",
        race: "Неизвестно",
        rarity: 6,
        element: "images/ele-physic.jpg",
        character_img: "images/endministrator2.png",
        VA: "Hyoie O'Grady",
    },
    {
        name: "Перлика",
        fraction: "Компания Endfield",
        race: "Либери",
        rarity: 5,
        element: "images/ele-electric.jpg",
        character_img: "images/perlica.png",
        VA: "Jane Jackson",
    },
    {
        name: "Чэн Цяньуй",
        fraction: "Компания Endfield",
        race: "Лун",
        rarity: 5,
        element: "images/ele-physic.jpg",
        character_img: "images/chen.png",
        VA: "Rebecca Hanssen",
    },
    {
        name: "Лэватэйн",
        fraction: "Родос Айленд",
        race: "Сарказ",
        rarity: 6,
        element: "images/ele-fire.jpg",
        character_img: "images/laevatain.png",
        VA: "Kira Buckland",
    },
    {
        name: "Ивонна",
        fraction: "Компания Endfield",
        race: "Вуивра",
        rarity: 6,
        element: "images/ele-ice.jpg",
        character_img: "images/yvonne.png",
        VA: "Clare Louise Connoly",
    },
    {
        name: "Гилберта",
        fraction: "Родос Айленд",
        race: "Вульпо",
        rarity: 6,
        element: "images/ele-nature.jpg",
        character_img: "images/gilberta.png",
        VA: "Anna Devlin",
    },
    {
        name: "Арделия",
        fraction: "Родос Айленд",
        race: "Капринэ",
        rarity: 6,
        element: "images/ele-nature.jpg",
        character_img: "images/ardelia.png",
        VA: "Lindsay Sheppard",
    },
    {
        name: "Росси",
        fraction: "Компания Endfield",
        race: "Люпо",
        rarity: 6,
        element: "images/ele-physic.jpg",
        character_img: "images/rossi.png",
        VA: "Giada Sabellico",
    },
    {
        name: "Эмбер",
        fraction: "Орден Стальной Клятвы",
        race: "Санкта",
        rarity: 6,
        element: "images/ele-fire.jpg",
        character_img: "images/ember.png",
        VA: "Rhiannon Mouchal",
    },
    {
        name: "Панихида",
        fraction: "Сеш'ка",
        race: "Сарказ",
        rarity: 6,
        element: "images/ele-ice.jpg",
        character_img: "images/panihida",
        VA: "Amber Hood",
    },
    {
        name: "Лифен",
        fraction: "Академия Наук Хуншаня",
        race: "Анаса",
        rarity: 6,
        element: "images/ele-physic.jpg",
        character_img: "images/lifeng.png",
        VA: "Yung-I Chang",
    },
    {
        name: "Пограничник",
        fraction: "Родос Айленд",
        race: "Либери",
        rarity: 6,
        element: "images/ele-physic.jpg",
        character_img: "images/pogranichnik.png",
        VA: "Sergey Ponomaryov",
    },
    {
        name: "Алеш",
        fraction: "Синдикаты Объедененных рабочих Талоса II",
        race: "Анати",
        rarity: 5,
        element: "images/ele-ice.jpg",
        character_img: "images/alesh.png",
        VA: "Heitor Assali",
    },
    {
        name: "Арклайт",
        fraction: "Братство Ханнабит",
        race: "Куранта",
        rarity: 5,
        element: "images/ele-electric.jpg",
        character_img: "images/arclight.png",
        VA: "Andrea Gatchalian",
    },
    {
        name: "Авивенна",
        fraction: "Генеральная торговая талата Талоса II",
        race: "Каут",
        rarity: 5,
        element: "images/ele-electric.jpg",
        character_img: "images/avywenna.png",
        VA: "Sheena May",
    },
    {
        name: "Да Пан",
        fraction: "Академия Наук Хуншаня",
        race: "урсин",
        rarity: 5,
        element: "images/ele-physic.jpg",
        character_img: "images/dapan.png",
        VA: "Jon Hu",
    },
    {
        name: "Светоснежка",
        fraction: "Родос Айленд",
        race: "Урсин",
        rarity: 5,
        element: "images/ele-ice.jpg",
        character_img: "images/snowshine.png",
        VA: "Stephanie Southerland",
    },
    {
        name: "Вулфгард",
        fraction: "Компания Endfield",
        race: "Люпо",
        rarity: 5,
        element: "images/ele-fire.jpg",
        character_img: "images/wulfgard.png",
        VA: "Jacopo Calatroni",
    },
    {
        name: "Сайхи",
        fraction: "Секта умиротворения",
        race: "Саарказ",
        rarity: 5,
        element: "images/ele-ice.jpg",
        character_img: "images/xaihi.png",
        VA: "Elsie Lovelock",
    },
    {
        name: "Антал",
        fraction: "Компания Endfield",
        race: "Савра",
        rarity: 4,
        element: "images/ele-electric.jpg",
        character_img: "images/antal.png",
        VA: "Jacob Craner",
    },
    {
        name: "Кэтчер",
        fraction: "Компания Endfield",
        race: "Перро",
        rarity: 4,
        element: "images/ele-physic.jpg",
        character_img: "images/catcher.png",
        VA: "Kevin Andrew Rivera",
    },
    {
        name: "Эстелла",
        fraction: "Компания Endfield",
        race: "Фелин",
        rarity: 4,
        element: "images/ele-ice.jpg",
        character_img: "images/estella.png",
        VA: "Risa Mei",
    },
    {
        name: "Флюорит",
        fraction: "Компания Endfield",
        race: "Фидиа",
        rarity: 4,
        element: "images/ele-nature.jpg",
        character_img: "images/fluorite.png",
        VA: "Katiana Sarkissian",
    }
]

const slides_сontainer = document.querySelector('.slides')

// Функция для создания слайда
function createSlide(character) {
    const slide = document.createElement('div')
    slide.classList.add('slide')

    // Создаем контент для слайда
    const slideContent = document.createElement('div')
    slideContent.classList.add('slide-content')

    const slideContentUp = document.createElement('div')
    slideContentUp.classList.add('slideContentUp')
    const slideContentUp_left = document.createElement('div')
    const slideContentUpRarity = document.createElement('div')
    slideContentUpRarity.classList.add('slideContentUpRarity')

    for (let i = 0; i < character.rarity; i++) {
        const star_img = document.createElement('img')
        star_img.src = "images/star.c078a0a7.png"
        star_img.alt = "star"
        slideContentUpRarity.appendChild(star_img)
    }

    const name_element = document.createElement('p')
    name_element.textContent = character.name

    slideContentUp_left.appendChild(name_element)
    slideContentUp.appendChild(slideContentUp_left)
    slideContentUp.appendChild(slideContentUpRarity)

    const slideContentDown = document.createElement('div')
    slideContentDown.classList.add('slideContentDown')

    const slideContentDownName = document.createElement('div')
    slideContentDownName.classList.add('slideContentDownName')

    const element_img = document.createElement('img')
    element_img.src = character.element
    element_img.alt = "element image"

    const h1 = document.createElement('h1')
    h1.textContent = `[ ${character.name} ]`

    slideContentDownName.appendChild(element_img)
    slideContentDownName.appendChild(h1)

    const slideContentDownInfo = document.createElement('div')
    slideContentDownInfo.classList.add('slideContentDownInfo')

    const fraction_div = document.createElement('div')
    fraction_div.innerHTML = `<p>Фракция</p><span>${character.fraction}</span>`
    const race_div = document.createElement('div')
    race_div.innerHTML = `<p>Раса</p><span>${character.race}</span>`

    slideContentDownInfo.appendChild(fraction_div)
    slideContentDownInfo.appendChild(race_div)

    const slideContentDownVa = document.createElement('div')
    slideContentDownVa.classList.add('slideContentDownVa')

    const VA_img = document.createElement('img')
    VA_img.src = "images/recorder.png"
    VA_img.alt = "VA image"

    const VAName = document.createElement('p')
    VAName.textContent = character.VA

    slideContentDownVa.appendChild(VA_img)
    slideContentDownVa.appendChild(VAName)

    slideContentDown.appendChild(slideContentDownName)
    slideContentDown.appendChild(slideContentDownInfo)
    slideContentDown.appendChild(slideContentDownVa)

    slideContent.appendChild(slideContentUp)
    slideContent.appendChild(slideContentDown)

    const slideCharacterImg = document.createElement('div')
    slideCharacterImg.classList.add('slideCharacterImg')
    const character_img = document.createElement('img')
    character_img.src = character.character_img
    character_img.alt = `${character.name} image`

    slideCharacterImg.appendChild(character_img)

    slide.appendChild(slideContent)
    slide.appendChild(slideCharacterImg)

    return slide
}

// Динамически добавляем слайды
characters_data.forEach(character => {
    const slide = createSlide(character)
    slides_сontainer.appendChild(slide)
})

const images = [
    "images/endministrator1.3efd4769.png",
    "images/endministrator2.f0bbf4fa.png",
    "images/perlica.871dcf57.png",
    "images/chen.5c7b5e46.png",
    "images/laevatain.20075757.png",
    "images/yvonne.c93412e1.png",
    "images/gilberta.07ff3560.png",
    "images/ardelia.b46cd31c.png",
    "images/rossi.4431f348.png",
    "images/ember.235ca9f1.png",
    "images/lastrite.8560c002.png",
    "images/lifeng.41ae5d06.png",
    "images/pogranichnik.73f7bcf6.png",
    "images/alesh.ca99268b.png",
    "images/arclight.0b402b3e.png",
    "images/avywenna.36c72367.png",
    "images/dapan.7b5afdec.png",
    "images/snowshine.844ed0a4.png",
    "images/wulfgard.b9d580b2.png",
    "images/xaihi.9c949014.png",
    "images/antal.78d45318.png",
    "images/catcher.68b395f9.png",
    "images/estella.b761d517.png",
    "images/fluorite.b83d45cf.png"
]
// Цикл для создания кнопок в слайдере
const container = document.querySelector('.sliderBtnCharacters')
images.forEach(imageSrc => {
    const button = document.createElement('button')
    const img = document.createElement('img')
    img.src = imageSrc
    img.alt = 'slider-button-characters'
    button.appendChild(img)
    container.appendChild(button)
})


// Кнопки в слайдере (вперед/назад)
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const sliderBtnCharacters = document.querySelector('.sliderBtnCharacters')
const buttonSlides = document.querySelectorAll('.sliderBtnCharacters button')

let current_slide = 0
const slide_count = Math.ceil(buttonSlides.length / 4)

function goToSlide(index) {
    current_slide = (index + slide_count) % slide_count
    const offset = current_slide * 4
    sliderBtnCharacters.style.transform = `translateY(-${offset * 11}vh)`
}

function handleNextSlide() {
    goToSlide(current_slide - 1)
}

function handlePrevSlide() {
    goToSlide(current_slide + 1)
}

next.addEventListener('click', handleNextSlide)
prev.addEventListener('click', handlePrevSlide)



// Получаем все кнопки слайдера
const slides = document.querySelectorAll('.slide') // Получаем все слайды

// Функция для переключения слайда
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active')
        if (i === index) {
            slide.classList.add('active')
        }
    })
}

// Добавляем обработчики событий на кнопки
buttonSlides.forEach((button, index) => {
    button.addEventListener('click', () => {
        showSlide(index)
    })
})
showSlide(current_slide)

