Запустить сборку тестового проекта:
```
npm run enb
```

При обходе блоков порядок не гарантируется!


## Технологии

### dev-declaration

Генерирует декларацию бандла (bemdecl.js), содержащю заданный список БЭМ-сущностей.

#### Опции

- `String` **[target]** — Результирующий таргет. По умолчанию `?.bemdecl.js`.
- `String[]` **[entities]** — Список имен сущностей (в соответствии с правилами именования БЭМ).

#### Пример

```js
 var techs = require('direct-dev').techs;

 nodeConfig.addTech(techs.devDeclaration, {
     target: '?.bemdecl.js',
     entities: ['block1', 'block1__elem2']
 });
```

### dev-page-bemjson

Генерирует bemjson для отладочной страницы. В результате получается файл bemjson.js, содержащий блок `dev-page` с заданными параметрами.

Используя полученный bemjson, можно сгенерировать HTML-разметку отладочной страницы с помощью технологии **bemjson-to-html** из пакета [enb-bemxjst](https://github.com/enb/enb-bemxjst/blob/master/api.ru.md#bemjson-to-html).

#### Опции

- `String` **[target]** — Результирующий таргет. По умолчанию `?.bemjson.js`.
- `String` **[block]** — Название корневого блока. По умолчанию `dev-page`.
- `String` **[type]** — Значение модификатора `type`.
- `String` **[js]** — js-таргет для подключения к странице.
- `String` **[devJs]** — js-таргет для подключения к странице вспомогательного кода (например, тестов).
- `String` **[css]** — css-таргет для подключения к странице.

Если указаны значения параметров **css**, **js**, **devJs**,  то перед сборкой bemjson отлалочной страницы будут собраны указанные таргеты. 

#### Пример

```javascript
 var techs = require('direct-dev').techs;
 
 nodeConfig.addTech(techs.devPageBemjson, {
     target: '?.bemjson.js',
     type: 'test',
     js: '?.js',
     devJs: '?.test.js',
     css: '?.css'
 });
```
 
## Блоки

...

## Утилиты

...
