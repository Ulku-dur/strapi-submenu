# Submenu Component with React and Context API

This project demonstrates how to create a dynamic submenu component using React and Context API. The submenu opens when the user hovers over a menu item and closes when the mouse leaves the submenu area. The layout of the submenu adapts dynamically based on the number of links it contains.

## Features

- **Dynamic Submenu**: The submenu opens and closes based on user interaction.
- **Responsive Layout**: The submenu layout adjusts dynamically (single or double column) based on the number of links.
- **Context API**: Global state management is handled using React's Context API.
- **Event Handling**: Mouse events are used to control the visibility of the submenu.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Context API**: For global state management.
- **CSS Grid**: For creating flexible and responsive layouts.
- **React Hooks**: `useRef` for DOM manipulation and `useContext` for accessing context values.

## How It Works

### 1. Context API Setup

The project uses React's Context API to manage the state of the submenu. Here's how it works:

#### a) **Create Context**
```javascript
import { createContext, useState, useContext } from 'react';

const AppContext = createContext();
```

- `createContext()` is used to create a new context.

#### b) **Provider Component**
```javascript
export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageId, setPageId] = useState(null);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppContext.Provider
      value={{ isSidebarOpen, openSidebar, closeSidebar, pageId, setPageId }}
    >
      {children}
    </AppContext.Provider>
  );
};
```

- `AppProvider` is a component that provides the state and functions to all child components.
- `useState` is used to manage the state of the sidebar and the active page ID.
- The `value` prop of `AppContext.Provider` makes the state and functions available to all components wrapped inside it.

#### c) **Custom Hook**
```javascript
export const useGlobalContext = () => {
  return useContext(AppContext);
};
```

- `useGlobalContext` is a custom hook that allows components to access the context values.

### 2. Submenu Component

The `Submenu` component is responsible for displaying the submenu and handling user interactions.

#### a) **Accessing Context Values**
```javascript
const { pageId, setPageId } = useGlobalContext();
```

- `pageId` is used to determine which submenu to display.
- `setPageId` is used to update the active page ID.

#### b) **Finding the Current Page**
```javascript
const currentPage = sublinks.find((item) => item.pageId === pageId);
```

- `sublinks` is an array of menu items, each containing a `pageId` and `links`.
- `currentPage` is the active menu item whose submenu is currently open.

#### c) **Handling Mouse Leave Event**
```javascript
const handleMouseLeave = (event) => {
  const submenu = submenuContainer.current;
  const { left, right, bottom } = submenu.getBoundingClientRect();
  const { clientX, clientY } = event;

  if (clientX < left + 1 || clientX > right - 1 || clientY > bottom - 1) {
    setPageId(null);
  }
};
```

- `handleMouseLeave` is triggered when the mouse leaves the submenu area.
- `getBoundingClientRect()` is used to get the position and size of the submenu.
- If the mouse is outside the submenu boundaries, `setPageId(null)` is called to close the submenu.

#### d) **Dynamic Layout with CSS Grid**
```javascript
<div
  className='submenu-links'
  style={{
    gridTemplateColumns:
      currentPage?.links?.length > 3 ? '1fr 1fr' : '1fr',
  }}
>
  {currentPage?.links?.map((link) => {
    const { id, url, label, icon } = link;
    return (
      <a key={id} href={url}>
        {icon}
        {label}
      </a>
    );
  })}
</div>
```

- `gridTemplateColumns` is set dynamically based on the number of links.
- If there are more than 3 links, a two-column layout (`'1fr 1fr'`) is used.
- If there are 3 or fewer links, a single-column layout (`'1fr'`) is used.

### 3. Key React Concepts Used

- **Context API**: For global state management.
- **useRef**: For accessing and manipulating DOM elements.
- **Event Handling**: For responding to user interactions (e.g., mouse events).
- **Conditional Rendering**: For dynamically showing/hiding the submenu.
- **Dynamic Styling**: For adjusting the layout based on the number of links.
- **Array Mapping**: For rendering a list of links.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/responsive-submenu.git
   ```
2. Navigate to the project directory:
   ```bash
   cd responsive-submenu
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Live Demo

You can view a live demo of this project [here](#) (add your live demo link).

## Screenshots

### Submenu with Two Columns
![Submenu with Two Columns](./screenshots/submenu-two-columns.png)

### Submenu with One Column
![Submenu with One Column](./screenshots/submenu-one-column.png)

## Key Takeaways

- **Context API**: Learn how to manage global state in a React application.
- **Dynamic Styling**: Understand how to apply styles dynamically based on state.
- **Event Handling**: See how to handle user interactions like mouse events.
- **CSS Grid**: Explore how to create flexible and responsive layouts.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

Feel free to contribute to this project by opening issues or submitting pull requests. Happy coding! 🚀

