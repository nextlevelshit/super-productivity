import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { TaskService } from '../tasks/task.service';
import { delay, map, withLatestFrom } from 'rxjs/operators';
import { ProjectService } from '../project/project.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningModeService {
  private _iPlanningModeEndedUser$ = new BehaviorSubject<boolean>(false);
  private _manualTriggerCheck$ = new BehaviorSubject(null);
  private _triggerCheck$ = merge(
    this._manualTriggerCheck$,
    // TODO fix hacky way of waiting for data to be loaded
    this._projectService.onProjectChange$.pipe(delay(100))
  );

  isPlanningMode$: Observable<boolean> = this._triggerCheck$.pipe(
    withLatestFrom(
      this._taskService.isHasTasksToWorkOn$,
      this._iPlanningModeEndedUser$,
    ),
    map(([t, isHasTasksToWorkOn, isPlanningEndedByUser]) => !isHasTasksToWorkOn && !isPlanningEndedByUser),
  );

  constructor(
    private _taskService: TaskService,
    private _projectService: ProjectService,
  ) {
    this.isPlanningMode$.subscribe((v) => console.log('isPlanningMode$', v));
    this._projectService.onProjectChange$.subscribe((v) => console.log('_projectService.onProjectChange$', v));
    this.reCheckPlanningMode();
  }

  leavePlanningMode() {
    this._iPlanningModeEndedUser$.next(true);
    this.reCheckPlanningMode();
  }

  enterPlanningMode() {
    this._iPlanningModeEndedUser$.next(false);
    this.reCheckPlanningMode();
  }

  reCheckPlanningMode() {
    this._manualTriggerCheck$.next(true);
  }
}
