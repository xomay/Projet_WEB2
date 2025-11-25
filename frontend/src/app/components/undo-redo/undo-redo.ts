import { Component } from '@angular/core';

@Component({
  selector: 'app-undo-redo',
  imports: [],
  templateUrl: './undo-redo.html',
  styleUrl: './undo-redo.css'
})
export class UndoRedo {
  undo() {
    console.log('Undo action triggered');
  }

  redo() {
    console.log('Redo action triggered');
  }

  canUndo(): boolean {
    // Placeholder logic for enabling/disabling undo button
    return true;
  }

  canRedo(): boolean {
    // Placeholder logic for enabling/disabling redo button
    return true;
  }

  endGame() {
    console.log('End game action triggered');
  }
}
