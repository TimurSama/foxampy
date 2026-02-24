# AGENTS.md — Инструкции для AI-ассистентов

## Общие правила

### После выполнения ЛЮБОГО задания — ОБЯЗАТЕЛЬНО:

1. **Сборка проекта**
   ```bash
   npm run build
   ```
   Убедиться, что нет ошибок компиляции.

2. **Git коммит**
   ```bash
   git add .
   git commit -m "описание изменений"
   ```

3. **Git push (деплой)**
   ```bash
   git push
   ```

> ⚠️ **ВАЖНО**: НЕ ЗАВЕРШАТЬ сессию без коммита и пуша! Пользователь ожидает, что изменения сразу уйдут на деплой.

---

## Структура проекта

```
Foxampy-Portfolio/
├── app/                    # Next.js App Router
│   ├── api/contact/        # API endpoint для формы
│   ├── gallery/            # Страница галереи
│   ├── globals.css         # Глобальные стили
│   ├── layout.tsx          # Корневой layout
│   └── page.tsx            # Главная страница
├── components/
│   ├── backgrounds/        # Фоновые компоненты
│   │   ├── GlobalBackground.tsx
│   │   └── OilWaveBackground.tsx    # ← анимированные волны
│   ├── layout/
│   │   └── Header.tsx
│   ├── modals/
│   │   └── ContactModal.tsx
│   ├── sections/
│   │   ├── AboutSection.tsx         # ← 2 фото на главной
│   │   ├── ContactForm.tsx
│   │   ├── ProcessRoadmap.tsx       # ← карточки "полный цикл"
│   │   └── ProjectCards.tsx
│   └── FloatingContactButton.tsx
├── lib/
│   └── i18n/               # Интернационализация
├── project-cards/          # Данные карточек проектов
├── public/
│   ├── gallery/            # Фото для галереи
│   ├── architecture/       # Фото архитектуры
│   ├── photo/              # Фото для AboutSection (слева.png, справа.png)
│   └── media/              # Видео
└── dist/                   # Сборка (output: export)
```

---

## Ключевые компоненты

### Фон (OilWaveBackground)
- **Расположение**: `components/backgrounds/OilWaveBackground.tsx`
- **Стили**: Монохромные серебристо-белые волны
- **Особенности**: CSS анимации, SVG градиенты, плавающие орбы
- **Цвета**: Только оттенки серого/белого (монохромный стиль)

### AboutSection (2 фото)
- **Мобильная версия**: Фото видны как горизонтальные полосы сверху и снизу
- **Десктоп**: Фото по бокам (`lg:col-span-2`)
- **Файлы**: `/photo/слева.png`, `/photo/справа.png`

### ProcessRoadmap (карточки "полный цикл")
- **Поведение**: Expand/collapse при клике (НЕ 3D flip — вызывает проблемы)
- **Анимация**: `AnimatePresence` + `motion.div` с `height: 'auto'`
- **Структура**: 6 карточек, 2 ряда по 3

---

## Технический стек

- **Framework**: Next.js 14 (App Router)
- **Output**: Static Export (`output: 'export'`)
- **Стили**: Tailwind CSS + CSS Modules
- **Анимации**: Framer Motion
- **Иконки**: Lucide React
- **Шрифты**: JetBrains Mono, Inter (Google Fonts)

---

## Важные замечания

1. **Монохромный стиль**: Никаких цветных акцентов! Только чёрный, белый, оттенки серого.

2. **Мобильная адаптация**: Всегда проверять на маленьких экранах:
   - Фото должны быть видны
   - Текст читаем
   - Кнопки кликабельны (min 44px)

3. **Анимации карточек**: Использовать expand/collapse вместо 3D flip для стабильности.

4. **Билд**: Проект собирается в `dist/` и деплоится как статика.

---

## Чеклист перед коммитом

- [ ] `npm run build` прошёл без ошибок
- [ ] Проверены мобильные стили (если менялись)
- [ ] Анимации работают плавно
- [ ] Git add + commit + push выполнены
