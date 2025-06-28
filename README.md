# Project - Jira { Jirafe }

Quickstarted with : [Simple Template](https://github.com/Geoffdl/Angular-Quickstart-Template)


## Overview

Jirafe is a modern, responsive Kanban-style project management application built with Angular. It provides an intuitive interface for organizing tasks across boards and lists, similar to popular tools like Jira or Trello.

### Key Features

**Board Management**
- Create, edit, and delete project boards
- Board overview with quick statistics (boards, lists, tasks count)
- Full-width board detail view for focused work

**List & Task Organization**
- Create multiple lists within each board
- Add, edit, and delete tasks within lists
- Drag-and-drop functionality for task management
- Empty state handling with helpful prompts

**Modern UI/UX**
- Clean, responsive design using DaisyUI components
- Theme selector for personalized experience
- Smooth animations and transitions
- Mobile-friendly interface

**State Management**
- Robust state management with NgRx
- Persistent data storage using local storage
- Real-time updates across components

**Navigation & Routing**
- Seamless navigation between boards
- Board dropdown selector for quick switching
- Reactive routing with proper parameter handling

### Tech Stack

- **Frontend**: Angular 19
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: NgRx with Signal Store integration
- **Testing**: Jasmine + Karma with comprehensive test coverage

### Architecture

The app follows Angular best practices with:
- Standalone components
- Signal-based reactivity
- Feature-based folder structure
- Shared components and services
- Type-safe development with TypeScript

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Run tests
npm test

# Build for production
ng build
```

Visit `http://localhost:4200` to start managing your projects with Jirafe!
