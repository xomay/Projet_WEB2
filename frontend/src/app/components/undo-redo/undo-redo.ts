import {Component, inject} from '@angular/core';
import {RedoBinderDirective, UndoBinderDirective} from "interacto-angular";
import {GameService} from '../../service/game-service';

@Component({
  selector: 'app-undo-redo',
    imports: [
        RedoBinderDirective,
        UndoBinderDirective
    ],
  templateUrl: './undo-redo.html',
  styleUrl: './undo-redo.css'
})
export class UndoRedo {
  private GameService = inject(GameService)
  endGame() {
    this.GameService.endGame();
  }
}
