// utils/driverConfig.js
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';


export const createBoardTour = (boardId) => {
  const driverInstance = driver({
    popoverClass: 'driverjs-theme',
    // showProgress: true,
    // progressText: '{{current}} of {{total}}',
    nextBtnText: 'Next →',
    prevBtnText: '← Previous',
    doneBtnText: 'Finish',
    showButtons: ['next', 'previous'],
    steps: [
      {
        element: '[data-tour="board-title"]',
        popover: {
          title: 'Welcome to your new board! 🎉',
          description: 'This is your board title. Click here to edit it anytime.',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="board-menu"]',
        popover: {
          title: 'Board Menu',
          description: 'Access board settings, change background, and manage board options here.',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="add-column"]',
        popover: {
          title: 'Add Your First Column',
          description: 'Start organizing by adding columns like "To Do", "In Progress", "Done".',
          side: 'left',
          align: 'start'
        }
      },
      {
        element: '[data-tour="column-header"]',
        popover: {
          title: 'Column Management',
          description: 'Click on column titles to edit them. Drag columns to reorder.',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="add-card"]',
        popover: {
          title: 'Add Cards',
          description: 'Add tasks and ideas as cards. You can drag them between columns.',
          side: 'top',
          align: 'center'
        }
      }
    ],
    onDestroyStarted: () => {
      // `this` refers to the driver instance
      if (!driverInstance.hasNextStep() || confirm("Are you sure you want to exit the tour?")) {
        driverInstance.destroy();
      }
    },
    onDestroyed: () => {
      // Mark tour as completed
      localStorage.setItem(`board-tour-${boardId}`, 'true');
    }
  });
  return driverInstance;
};