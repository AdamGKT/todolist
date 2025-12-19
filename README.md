## How to run the app

1. Clone the repository:

```bash
git clone https://github.com/AdamGKT/todolist.git
cd todolist
```

2. Install dependencies:

```bash
yarn install
```

3. Start the Expo development server:

```bash
yarn start
```

4. Open the app on your device:

- Use the Expo Go app on your iOS or Android device and scan the QR code
- Or run on an emulator:

```bash
yarn android
yarn ios
```

# Technical Choices

This project is a Todo list application built with React Native, Expo, and TypeScript as part of a technical test for GeoRide.

I made the following library choices to focus on code quality, scalability, and developer experience:

## React Query

I chose React Query to handle server state and asynchronous logic in a clean and predictable way.  
It simplifies data fetching, caching, synchronization, and error handling, while keeping components focused on UI rather than networking logic.

## React Native Paper

React Native Paper provides a consistent, accessible, and Material Design–based UI out of the box.  
It allows rapid development with well-designed components while keeping the UI clean and professional without spending time on custom styling.

## ESLint & Prettier

I used ESLint and Prettier together to enforce consistent code style and best practices.  
This ensures readable, maintainable code.

---

## Notes on API Adaptation

Since the API provided for this test is a fake API, a few adaptations were necessary to make the app work correctly:

- **Optimistic updates** are used to reflect changes immediately in the UI even when the server does not persist them.
- **404 handling** is implemented for deletion and update operations to allow manipulation of locally added todos that do not exist on the server.
- These adaptations ensure that the app behaves predictably and smoothly from the user’s perspective while still using the provided API endpoints.
