# Foxampy Lab - Portfolio Gallery

Полная копия страницы галереи из Foxampy Lab с интерактивным WebGL фоном Liquid Mercury.

## Особенности

- **Интерактивный WebGL фон** - эффект жидкой ртути с шейдерами Three.js
- **CSS Fallback** - автоматический fallback для устройств без WebGL
- **Анимированные эффекты** - noise, scanlines, vignette
- **i18n** - переключение языков (RU/EN)
- **Адаптивный дизайн** - работает на всех устройствах
- **Плавные анимации** - Framer Motion

## Структура проекта

```
Foxampy-Portfolio/
├── app/
│   ├── globals.css          # Глобальные стили
│   ├── layout.tsx           # Корневой layout с фоном
│   └── page.tsx             # Главная страница галереи
├── components/
│   ├── backgrounds/
│   │   ├── GlobalBackground.tsx   # Главный компонент фона
│   │   └── LiquidMercury.tsx      # WebGL шейдер фон
│   ├── layout/
│   │   └── Header.tsx             # Шапка сайта
│   └── visuals/
│       └── OilCSSBackground.tsx   # CSS fallback фон
├── lib/
│   └── i18n/
│       ├── context.tsx      # React контекст для переводов
│       └── translations.ts  # Переводы RU/EN
├── public/                  # Статические файлы
│   ├── gallery/            # Изображения для галереи моды
│   ├── architecture/       # Изображения архитектуры
│   └── media/              # Видео файлы
├── next.config.js          # Конфигурация Next.js
├── tailwind.config.js      # Конфигурация Tailwind
└── package.json
```

## Установка и запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Разработка

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### 3. Сборка для деплоя

```bash
npm run build
```

Статические файлы будут созданы в папке `dist/`.

## Деплой

### Vercel (рекомендуется)

1. Загрузите проект на GitHub
2. Импортируйте в [Vercel](https://vercel.com)
3. Настройки сборки уже настроены в `next.config.js`

### Netlify

1. Загрузите проект на GitHub
2. Импортируйте в [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

1. Включите GitHub Pages в настройках репозитория
2. Укажите ветку `gh-pages` или папку `dist` из ветки main

### Статический хостинг

Просто загрузите содержимое папки `dist/` на любой статический хостинг.

## Включенные файлы

В проект уже скопированы все медиафайлы из оригинальной галереи:

### 1. Галерея моды (15 фото)
`public/gallery/`:
- photo_2026-01-30_12-26-56.jpg
- photo_2026-01-30_12-27-09.jpg
- photo_2026-01-30_12-27-19.jpg
- photo_2026-01-30_12-27-28.jpg
- photo_2026-01-30_12-27-32.jpg
- photo_2026-01-30_12-27-35.jpg
- photo_2026-01-30_12-27-39.jpg
- photo_2026-01-30_12-27-43.jpg
- photo_2026-01-30_12-27-46.jpg
- photo_2026-01-30_12-27-50.jpg
- photo_2026-01-30_12-27-54.jpg
- photo_2026-01-30_12-27-58.jpg
- photo_2026-01-30_12-28-02.jpg
- photo_2026-01-30_12-28-05.jpg
- photo_2026-01-30_12-28-08.jpg

### 2. Архитектура (5 фото)
`public/architecture/`:
- image_2024-08-21_21-32-32.png
- image_2024-08-21_21-32-39.png
- image_2024-08-21_21-32-44.png
- image_2024-08-21_21-32-49.png
- image_2024-08-21_21-32-54.png

### 3. Видео (2 файла)
`public/media/`:
- need-for-speed-underground-2-remaster-2022.mp4
- ryabov.mp4

## Добавление новых изображений

Если хотите добавить свои файлы:

1. **Галерея моды**: добавьте в `public/gallery/` и обновите массив `fashionImages` в `app/page.tsx`
2. **Архитектура**: добавьте в `public/architecture/` и обновите `architectureImages`
3. **Видео**: добавьте в `public/media/` и обновите `videoShowcase`

## Настройка цветов

Цвета настраиваются в `tailwind.config.js`:

```javascript
colors: {
  ink: {
    deep: '#030303',      // Основной фон
    oil: '#0a0a0a',
    chrome: '#121215',
  },
  // ...
}
```

## Технологии

- [Next.js 14](https://nextjs.org/) - React фреймворк
- [TypeScript](https://www.typescriptlang.org/) - Типизация
- [Tailwind CSS](https://tailwindcss.com/) - Стилизация
- [Framer Motion](https://www.framer.com/motion/) - Анимации
- [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) - WebGL фон
- [Lucide React](https://lucide.dev/) - Иконки

## Кастомизация

### Изменение текста

Все тексты находятся в `lib/i18n/translations.ts` для обоих языков.

### Изменение проектов

Структура проектов находится в `app/page.tsx` в переменной `gallerySections`.

### Настройка WebGL фона

Настройки шейдера в `components/backgrounds/LiquidMercury.tsx`:

```typescript
const defaultConfig = {
    color1: '#000000',    // Цвет 1
    color2: '#0a0a0a',    // Цвет 2
    color3: '#505050',    // Акцентный цвет
    speed: 0.05,          // Скорость анимации
    viscosity: 1.0,       // Вязкость
    metallic: 0.6,        // Металличность
    interactionStrength: 0.1  // Сила взаимодействия с мышью
};
```

## Лицензия

© 2025 Foxampy Lab. Все права защищены.

---

Created by Timur Cadik
