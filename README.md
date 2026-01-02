# 🦸‍♂️🦸‍♀️ Superhéroes DC vs Marvel (Astro + Tailwind)

¡Bienvenido al proyecto **Superhéroes DC vs Marvel**! 🎉  
Ahora migrado a **Astro** con **TailwindCSS**, ofreciendo una experiencia interactiva más moderna, rápida y responsiva.  
Explora, compara y enfrenta a tus héroes favoritos de **DC Comics** y **Marvel** de manera dinámica. 💥

🌐 **Versión en línea:**  
👉 [https://superheroversus.netlify.app/](https://superheroversus.netlify.app/)

---

## ✨ Novedades y Mejoras (Migración a Astro)

- ⚡ **Migración a Astro**  
  - Todo el proyecto ahora es un **sitio Astro**, con componentes reutilizables para héroes, battle arena y modales.  

- 🎨 **Estilos con TailwindCSS**  
  - Reemplazamos CSS básico por **Tailwind**, haciendo la interfaz más moderna y fácil de mantener.  
  - Gradientes animados, sombras y transiciones suaves en botones y cartas de héroes.  

- 📱 **Diseño Responsivo Mejorado**  
  - Layout optimizado para **móviles, tablets y desktop**.  
  - Hero de bienvenida y battle arena adaptativos según tamaño de pantalla.  
  - Grid dinámico para mostrar los héroes, con paginación y scrollable en móviles.  


- 💻 **Componentización**  
  - Header, HeroCard, BattleArena, HeroModal y Footer como **componentes independientes**.  
  - Cada componente maneja su propia lógica y estilo, manteniendo el proyecto limpio y modular.  

- 🔍 **Funcionalidades Mejoradas**  
  - Mostrar héroes por universo (Marvel/DC) al hacer clic.  
  - Comparación 1 vs 1 aleatoria con animaciones y VS dinámico.  
  - Modal interactivo con información completa de cada héroe.  
  - Búsqueda global y paginación adaptativa.  

---

## 🚀 ¿Cómo Usar?

1. **Mostrar Personajes**  
   - Haz clic en **"Ver héroes Marvel"** o **"Ver héroes DC"** para cargar los personajes del universo correspondiente.  

2. **Comparar Superhéroes**  
   - Haz clic en **"1 vs 1 Aleatorio"** para enfrentar dos héroes seleccionados al azar y ver quién gana según sus atributos.  

3. **Ver Detalles**  
   - Haz clic sobre cualquier carta para abrir un **modal** con información completa del personaje.  

---

## 🖼️ Capturas de Pantalla

| Hero de bienvenida                                                                                   | Contenedor de héroes                                                                                        | Battle Arena                                                                                               |
|---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| <img src="https://i.imgur.com/your-hero-screenshot.png" width="300"/>                              | <img src="https://i.imgur.com/your-heroes-grid.png" width="300"/>                                        | <img src="https://i.imgur.com/your-battle-arena.png" width="300"/>                                       |

---

## 📁 Estructura del Proyecto (Astro + Tailwind)

````yaml
superheroes-dc-vs-marvel/
├── src/
│ ├── components/
│ │ ├── Header.astro
│ │ ├── HeroCard.astro
│ │ ├── HeroModal.astro
│ │ └── BattleArena.astro
│ ├── layouts/
│ │ └── Layout.astro
│ ├── pages/
│ │ └── index.astro
│ └── scripts/
│ ├── dataManager.js
│ ├── displayHeroes.js
│ ├── battleSystem.js
│ ├── searchSystem.js
│ └── modalSystem.js
├── public/
│ └── assets/ 
├── package.json
├── tailwind.config.cjs
├── astro.config.mjs
└── README.md
````

---

## 🧰 Tecnologías Utilizadas

- **Astro**  
- **TailwindCSS**  
- **HTML5** & **JS (ES6+)**  
- **Fetch API** para obtener datos de la Superhero API  
- **Módulos JS** para separar la lógica: héroes, modales, batallas, búsqueda y paginación  

---

## ✅ Requisitos

- Node.js ≥ 18  
- Navegador moderno (Chrome, Firefox, Safari, Edge, etc.)  

---

## 🙌 Contribuciones

¿Tienes ideas o sugerencias?  
¡Haz un fork del proyecto, crea una rama y envía un pull request!  
Toda contribución es bienvenida. 🛠️  

---

## 📬 Contacto

¿Tienes dudas o sugerencias?  
Puedes dejar un comentario o contactarme directamente.  
¡Gracias por visitar este proyecto y que disfrutes explorando a tus superhéroes favoritos! 🚀  