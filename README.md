# Focus Flow

A beautiful productivity app that combines a Pomodoro timer with ambient sound mixing capabilities. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Pomodoro Timer**
  - 25/10 minute focus/break intervals
  - Configurable timer durations
  - Multiple timer modes (Clock, Pomodoro, Count Up, Goal Timer)
  - Sound notifications and browser notifications
  - Auto-start options

- **Sound Mixer**
  - High-quality ambient sounds
  - Mix multiple sounds together
  - Individual volume control for each sound
  - Save and load custom mixes
  - Beautiful sound visualizations

- **Todo List**
  - Add, complete, and delete tasks
  - Set current focus task
  - Track completed tasks
  - Clean and intuitive interface

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- Next.js 13 with App Router
- TypeScript
- Tailwind CSS
- Zustand for state management
- Howler.js for audio
- Radix UI for accessible components
- Heroicons

## Project Structure

```
focus-flow/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Timer.tsx
│   ├── TodoList.tsx
│   └── SoundPlayer.tsx
├── stores/
│   ├── timerStore.ts
│   ├── soundStore.ts
│   ├── todoStore.ts
│   └── uiStore.ts
├── types/
│   └── index.ts
└── constants/
    └── index.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 